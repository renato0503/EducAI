import { NOME_EXIBICAO, textoDoRange } from "@educai/compiler";
import { CARTOES_SINTETICOS, CARTOES_TIPO } from "../dados";
import { ancestrais } from "../segmentos";
import { LINGS, type CodigoMapeado, type Fixture, type Ling } from "../tipos";
import { TextoRico } from "./TextoRico";

interface Props {
  fixture: Fixture;
  id: string | null;
  aprofundar: boolean;
  onAprofundar: (v: boolean) => void;
  onSelecionar: (id: string) => void;
}

/** Texto do nó numa linguagem: só a 1ª linha de cada pedaço (blocos como `para` ficariam enormes). */
function trecho(cm: CodigoMapeado, id: string): string | null {
  const ranges = cm.mapa[id];
  if (!ranges || ranges.length === 0) return null;
  const texto = ranges
    .map((r) => {
      const [primeira, ...resto] = textoDoRange(cm.codigo, r).split("\n");
      return primeira!.trim() + (resto.length > 0 ? " …" : "");
    })
    .join("  ·  ");
  return texto.length > 140 ? texto.slice(0, 137) + "…" : texto;
}

export function PainelExplicacao({ fixture, id, aprofundar, onAprofundar, onSelecionar }: Props) {
  if (!id || !fixture.nos[id]) {
    return (
      <div className="explicacao vazia">
        <p>
          <strong>Clique em qualquer parte do código</strong>, em qualquer linguagem, para ver o que ela
          é e como aparece nas outras.
        </p>
        <p>
          Ou use <strong>Construir passo a passo</strong> para ver o programa nascer comando por comando.
        </p>
      </div>
    );
  }

  const no = fixture.nos[id];
  const notas = fixture.notas[id] ?? {};
  const pais = ancestrais(id, (x) => Boolean(fixture.nos[x]));

  const migalhas = pais.length > 0 && (
    <nav className="migalhas" aria-label="Dentro de">
      Dentro de:{" "}
      {pais.map((p) => (
        <button key={p} className="migalha" onClick={() => onSelecionar(p)}>
          {CARTOES_TIPO[fixture.nos[p]!.tipo]?.nome ?? fixture.nos[p]!.tipo}
        </button>
      ))}
    </nav>
  );

  const nivel = (
    <label className="nivel">
      <input type="checkbox" checked={aprofundar} onChange={(e) => onAprofundar(e.target.checked)} />
      Aprofundar
    </label>
  );

  // Nó sintético: só existe numa linguagem
  if (no.tipo === "sintetico") {
    const cartao = CARTOES_SINTETICOS[id];
    const ling = no.linguagem!;
    return (
      <div className="explicacao">
        <header className="exp-topo">
          <div>
            <span className="exp-tipo">Só existe em {NOME_EXIBICAO[ling]}</span>
            <h2>{cartao?.nome ?? no.rotulo}</h2>
          </div>
          {nivel}
        </header>
        <p className="exp-basico">
          <TextoRico texto={cartao?.basico ?? "Cartão ainda não escrito."} />
        </p>
        {aprofundar && cartao && (
          <p className="exp-aprofundar">
            <TextoRico texto={cartao.aprofundar} />
          </p>
        )}
        <p className="exp-sem">
          Não existe no português estruturado: é um detalhe que {NOME_EXIBICAO[ling]} exige e as outras
          linguagens não.
        </p>
      </div>
    );
  }

  const cartao = CARTOES_TIPO[no.tipo];
  const linhaPtbr = trecho(fixture.ptbr, id);

  return (
    <div className="explicacao">
      <header className="exp-topo">
        <div>
          <span className="exp-tipo">{cartao?.nome ?? no.tipo}</span>
          <h2>
            <code>{linhaPtbr ?? no.rotulo}</code>
          </h2>
        </div>
        {nivel}
      </header>
      {migalhas}
      <p className="exp-basico">
        <TextoRico texto={cartao?.basico ?? "Cartão ainda não escrito."} />
      </p>
      {aprofundar && cartao && (
        <p className="exp-aprofundar">
          <TextoRico texto={cartao.aprofundar} />
        </p>
      )}
      {notas.geral && (
        <p className="exp-nota">
          <TextoRico texto={notas.geral} />
        </p>
      )}

      <ul className="exp-lings">
        {LINGS.map((l: Ling) => {
          const codigo = trecho(fixture.linguagens[l], id);
          const porLing = cartao?.linguagens[l];
          const sem = cartao?.semEquivalente?.[l];
          return (
            <li key={l} data-ling={l}>
              <div className="exp-ling-topo">
                <span className="exp-ling-nome">{NOME_EXIBICAO[l]}</span>
                {codigo ? <code className="exp-trecho">{codigo}</code> : <span className="exp-sem-tag">sem equivalente</span>}
              </div>
              {/* A nota específica do programa, quando existe, substitui o texto genérico do cartão */}
              {codigo && porLing && !notas[l] && (
                <p>
                  <TextoRico texto={porLing.como} />
                </p>
              )}
              {!codigo && (
                <p className="exp-sem">
                  <TextoRico texto={sem ?? `Não aparece no código em ${NOME_EXIBICAO[l]}.`} />
                </p>
              )}
              {notas[l] && (
                <p className="exp-nota">
                  <TextoRico texto={notas[l]!} />
                </p>
              )}
              {aprofundar && codigo && porLing?.pegadinha && (
                <p className="exp-pegadinha">
                  <span>Pegadinha:</span> <TextoRico texto={porLing.pegadinha} />
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
