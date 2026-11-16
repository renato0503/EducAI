import { extrairMarcadores } from "@educai/compiler";
import { describe, expect, it } from "vitest";
import { ancestrais, filtrarPorPassos, passoDe, passosDoPrograma, segmentar } from "./segmentos";

const C = extrairMarcadores(
  [
    "⟦syn:c.inc⟧#include <stdio.h>⟦/⟧",
    "",
    "⟦prog:inicio⟧int main(void) {⟦/⟧",
    '    ⟦main/0⟧printf("⟦main/0/0⟧%d⟦/⟧\\n", ⟦main/0/0⟧n⟦/⟧);⟦/⟧',
    "    ⟦main/1⟧n = 1;⟦/⟧",
    "⟦prog:inicio⟧}⟦/⟧",
  ].join("\n"),
);

const texto = (linhas: ReturnType<typeof segmentar>) =>
  linhas.map((l) => l.segmentos.map((s) => s.texto).join("")).join("\n");

describe("segmentar", () => {
  const linhas = segmentar(C.codigo, C.mapa);

  it("mantém as linhas e o texto original", () => {
    expect(linhas).toHaveLength(6);
    expect(texto(linhas)).toBe(C.codigo);
  });

  it("não cria linha vazia depois do \\n final", () => {
    expect(segmentar("a\nb\n", {})).toHaveLength(2);
  });

  it("ordena os nós do mais interno para o mais externo", () => {
    const seg = linhas[3]!.segmentos.find((s) => s.texto === "%d")!;
    expect(seg.nos).toEqual(["main/0/0", "main/0"]);
    expect(seg.passo).toBe("main/0");
  });

  it("um nó com dois ranges aparece em dois segmentos", () => {
    const comNo = linhas[3]!.segmentos.filter((s) => s.nos[0] === "main/0/0");
    expect(comNo.map((s) => s.texto)).toEqual(["%d", "n"]);
  });
});

describe("modo construção", () => {
  const P = extrairMarcadores(
    [
      "⟦var/0|declaracao⟧n: inteiro⟦/⟧",
      "⟦f0|funcao⟧⟦f0:assinatura|assinatura⟧funcao f()⟦/⟧ fimfuncao⟦/⟧",
      "⟦main/0|escreva⟧escreval(n)⟦/⟧",
    ].join("\n"),
  );

  it("passoDe encontra o comando de nível mais alto", () => {
    expect(passoDe("main/2/corpo/0/4")).toBe("main/2");
    expect(passoDe("f0:assinatura")).toBe("f0");
    expect(passoDe("f0/1/ate")).toBe("f0");
    expect(passoDe("prog:inicio")).toBeNull();
    expect(passoDe("syn:c.return0")).toBeNull();
  });

  it("lista os passos na ordem do PT-BR", () => {
    expect(passosDoPrograma(P.mapa)).toEqual(["var/0", "f0", "main/0"]);
  });

  it("esconde passos não revelados, mas mantém a estrutura", () => {
    const visivel = texto(filtrarPorPassos(segmentar(C.codigo, C.mapa), new Set(["main/0"])));
    expect(visivel).toContain("printf");
    expect(visivel).not.toContain("n = 1");
    expect(visivel).toContain("#include");
    expect(visivel.trim().endsWith("}")).toBe(true);
  });

  it("sem filtro, mostra tudo", () => {
    const linhas = segmentar(C.codigo, C.mapa);
    expect(filtrarPorPassos(linhas, null)).toBe(linhas);
  });
});

describe("ancestrais", () => {
  it("sobe pelo caminho e ignora níveis que não são nós", () => {
    const existe = (id: string) => ["main/2", "main/2/corpo/0", "f0"].includes(id);
    expect(ancestrais("main/2/corpo/0/4", existe)).toEqual(["main/2", "main/2/corpo/0"]);
    expect(ancestrais("f0:assinatura", existe)).toEqual(["f0"]);
  });
});
