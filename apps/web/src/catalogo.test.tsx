import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PainelExplicacao } from "./componentes/PainelExplicacao";
import { CARTOES_SINTETICOS, CARTOES_TIPO, FIXTURES } from "./dados";
import { LINGS } from "./tipos";

describe("catálogo de explicações", () => {
  it("carrega as 5 fixtures", () => {
    expect(FIXTURES.map((f) => f.id)).toEqual([
      "media-notas",
      "tabuada",
      "contagem-regressiva",
      "maior-do-vetor",
      "fatorial-funcao",
    ]);
  });

  for (const f of FIXTURES) {
    describe(f.id, () => {
      it("todo tipo de nó e todo sintético tem cartão", () => {
        for (const [id, no] of Object.entries(f.nos)) {
          if (no.tipo === "sintetico") expect(CARTOES_SINTETICOS[id], id).toBeDefined();
          else expect(CARTOES_TIPO[no.tipo], `${id} (${no.tipo})`).toBeDefined();
        }
      });

      it("toda linguagem tem explicação: 'como' quando o nó existe, texto quando não existe", () => {
        for (const [id, no] of Object.entries(f.nos)) {
          if (no.tipo === "sintetico") continue;
          const cartao = CARTOES_TIPO[no.tipo]!;
          for (const l of LINGS) {
            const existe = Boolean(f.linguagens[l].mapa[id]);
            if (existe) {
              expect(cartao.linguagens[l]?.como, `${id} em ${l}: falta "como"`).toBeTruthy();
            } else {
              // nós internos sem equivalente (ex.: o 0 omitido em range(5)) precisam de nota;
              // nós de estrutura usam o semEquivalente do cartão
              const texto = cartao.semEquivalente?.[l] ?? f.notas[id]?.[l];
              expect(texto, `${id} sem equivalente em ${l}: falta explicação`).toBeTruthy();
            }
          }
        }
      });

      it("o painel de explicação renderiza todos os nós", () => {
        for (const id of Object.keys(f.nos)) {
          const html = renderToStaticMarkup(
            <PainelExplicacao fixture={f} id={id} aprofundar onAprofundar={() => {}} onSelecionar={() => {}} />,
          );
          expect(html).not.toContain("Cartão ainda não escrito");
        }
      });
    });
  }
});
