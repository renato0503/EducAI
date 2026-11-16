import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { MapaTokens } from "./ast";
import { lexer } from "./lexer";
import { mapaPtbr } from "./mapa-ptbr";
import { parse } from "./parser";

const RAIZ = join(__dirname, "..", "..", "..");

interface FixtureJson {
  ptbr: { codigo: string; mapa: MapaTokens };
  nos: Record<string, { tipo: string }>;
}

describe("lexer", () => {
  it("palavras-chave ignoram maiúsculas e acentos", () => {
    const { tokens } = lexer("Se x Então ESCREVAL(\"oi\") Senão fimse");
    expect(tokens.filter((t) => t.tipo === "kw").map((t) => t.valor)).toEqual(["se", "entao", "escreval", "senao", "fimse"]);
  });

  it("separa 0..4 em número, `..` e número", () => {
    const { tokens } = lexer("vetor[0..4]");
    expect(tokens.map((t) => t.texto)).toEqual(["vetor", "[", "0", "..", "4", "]", ""]);
  });

  it("guarda posições 1-indexadas com fim exclusivo", () => {
    const { tokens } = lexer("  media <- 7.5");
    expect(tokens[0]).toMatchObject({ tipo: "id", texto: "media", linha: 1, col: 3, colFim: 8 });
    expect(tokens[2]).toMatchObject({ tipo: "num", valor: "7.5", col: 12, colFim: 15 });
  });

  it("tira comentários do fluxo de tokens", () => {
    const r = lexer("x <- 1 // conta\ny <- 2");
    expect(r.tokens.map((t) => t.texto).filter(Boolean)).toEqual(["x", "<-", "1", "y", "<-", "2"]);
    expect(r.comentarios).toEqual([{ texto: "conta", linha: 1, col: 8 }]);
  });

  it("acusa texto sem aspas de fechamento e caractere estranho", () => {
    expect(lexer('escreval("oi)').erros[0]?.codigo).toBe("L002");
    expect(lexer("x <- 1 @").erros[0]).toMatchObject({ codigo: "L001", col: 8 });
  });
});

describe("parser: fixtures", () => {
  const dirs = readdirSync(join(RAIZ, "fixtures"), { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const d of dirs) {
    it(`${d.name}: reproduz ids, posições e tipos marcados à mão`, () => {
      const f = JSON.parse(readFileSync(join(RAIZ, "fixtures", d.name, "fixture.json"), "utf8")) as FixtureJson;
      const r = parse(f.ptbr.codigo);
      expect(r.erros).toEqual([]);
      const { mapa, tipos } = mapaPtbr(r.programa!);
      for (const [id, ranges] of Object.entries(f.ptbr.mapa)) {
        expect(mapa[id], `nó ${id}`).toEqual(ranges);
        expect(tipos[id], `tipo de ${id}`).toBe(f.nos[id]!.tipo);
      }
    });
  }
});

describe("parser: programas do spike", () => {
  const dirs = readdirSync(join(RAIZ, "spike", "programas"), { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const d of dirs) {
    it(`${d.name}/programa.por sem erros`, () => {
      const r = parse(readFileSync(join(RAIZ, "spike", "programas", d.name, "programa.por"), "utf8"));
      expect(r.erros).toEqual([]);
      expect(r.programa).not.toBeNull();
    });
  }
});

const programa = (corpo: string, vars = "x, y: inteiro") => `algoritmo "t"\nvar\n   ${vars}\ninicio\n${corpo}\nfimalgoritmo\n`;

describe("parser: estrutura", () => {
  it("lê precedência: * antes de +, relacional antes de e, nao antes da comparação", () => {
    const r = parse(programa("   x <- 1 + 2 * 3\n   y <- 0\n   se nao x > 1 e y = 0 entao\n   fimse"));
    const [a, , se] = r.programa!.corpo;
    expect(a).toMatchObject({ valor: { op: "+", dir: { op: "*" } } });
    expect(se).toMatchObject({ condicao: { op: "e", esq: { tipo: "unaria", op: "nao", operando: { op: ">" } } } });
  });

  it("o span de uma conta inclui os parênteses do operando, o do operando não", () => {
    const r = parse(programa("   x <- (1 + 2) / 3"));
    const { mapa } = mapaPtbr(r.programa!);
    expect(mapa["main/0/valor"]).toEqual([[5, 9, 5, 20]]);
    expect(mapa["main/0/valor/esq"]).toEqual([[5, 10, 5, 15]]);
  });

  it("lê para com passo negativo, formato de real e escreval vazio", () => {
    const r = parse(programa('   para x de 4 ate 0 passo -1 faca\n      escreva(x:0:2, " ")\n   fimpara\n   escreval()'));
    expect(r.erros).toEqual([]);
    expect(r.programa!.corpo[0]).toMatchObject({ tipo: "para", passo: -1, corpo: [{ itens: [{ casas: 2 }, {}] }] });
    expect(r.programa!.corpo[1]).toMatchObject({ tipo: "escreva", itens: [], novaLinha: true });
  });

  it("lê vetor com limites", () => {
    const r = parse(programa("   v[0] <- 1", "v: vetor[0..4] de real"));
    expect(r.programa!.variaveis[0]!.tipoDeclarado).toEqual({ elemento: "real", tamanho: 5, limiteInferior: 0 });
  });
});

describe("parser: erros e recuperação", () => {
  it("um comando quebrado não derruba os outros", () => {
    const r = parse(programa('   escreval("a")\n   x <- \n   escreval("c")'));
    expect(r.erros).toHaveLength(1);
    expect(r.programa!.corpo.map((c) => c.tipo)).toEqual(["escreva", "erro", "escreva"]);
  });

  it("explica `=` no lugar de `<-`", () => {
    const r = parse(programa("   x = 1"));
    expect(r.erros[0]).toMatchObject({ codigo: "S013" });
    expect(r.erros[0]!.mensagem).toContain("<-");
  });

  it("aponta o bloco que não foi fechado", () => {
    const r = parse(programa("   se x > 1 entao\n      x <- 2"));
    expect(r.erros.some((e) => e.mensagem.includes("O `se` da linha 5 não foi fechado"))).toBe(true);
  });

  it("aponta palavra reservada usada como nome", () => {
    const r = parse(programa("   x <- 1", "para: inteiro"));
    expect(r.erros[0]!.mensagem).toContain("palavra reservada");
  });

  it("acusa fim de bloco solto", () => {
    const r = parse(programa("   fimpara\n   x <- 1"));
    expect(r.erros[0]!.mensagem).toContain("não fecha nenhum bloco");
    expect(r.programa!.corpo.map((c) => c.tipo)).toEqual(["erro", "atribuicao"]);
  });

  it("estrutura ausente devolve programa nulo com mensagem", () => {
    const r = parse('escreval("oi")');
    expect(r.programa).toBeNull();
    expect(r.erros[0]!.mensagem).toContain("algoritmo");
  });
});
