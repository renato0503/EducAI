import { NOME_EXIBICAO } from "@educai/compiler";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PainelCodigo } from "./componentes/PainelCodigo";
import { PainelExplicacao } from "./componentes/PainelExplicacao";
import { TextoRico } from "./componentes/TextoRico";
import { Transferencia } from "./componentes/Transferencia";
import { CARTOES_TIPO, FIXTURES } from "./dados";
import { filtrarPorPassos, passosDoPrograma, segmentar } from "./segmentos";
import { LINGS, type Fixture, type Ling } from "./tipos";

type Modo = "grade" | "foco";

function lerCliques(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem("educai.cliques") ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

function aviso(fixture: Fixture, painel: Ling | "ptbr", selecionado: string | null): string | null {
  if (!selecionado) return null;
  const no = fixture.nos[selecionado];
  if (!no) return null;
  if (no.tipo === "sintetico") {
    if (painel === no.linguagem) return null;
    return `só existe em ${NOME_EXIBICAO[no.linguagem!]}`;
  }
  const mapa = painel === "ptbr" ? fixture.ptbr.mapa : fixture.linguagens[painel].mapa;
  return mapa[selecionado] ? null : "sem equivalente aqui";
}

/**
 * Estado inicial pela URL, para o facilitador abrir a tela já no ponto certo:
 * ?programa=tabuada&sel=main/2&modo=foco&foco=python,java&aprofundar=1&passos=3
 */
function parametros() {
  const p = new URLSearchParams(location.search);
  const programa = FIXTURES.find((f) => f.id === p.get("programa")) ?? FIXTURES[0]!;
  const foco = (p.get("foco")?.split(",") ?? []).filter((l): l is Ling => (LINGS as readonly string[]).includes(l));
  const passos = p.get("passos");
  return {
    programa: programa.id,
    sel: p.get("sel"),
    modo: (p.get("modo") === "foco" ? "foco" : "grade") as Modo,
    foco: foco.length > 0 ? foco.slice(0, 2) : (["python", "c"] as Ling[]),
    aprofundar: p.get("aprofundar") === "1",
    passos: passos === null ? null : Number(passos) || 0,
  };
}

export function App() {
  const inicial = useMemo(parametros, []);
  const [tela, setTela] = useState(() => (location.hash === "#atividade" ? "atividade" : "ide"));
  const [fixtureId, setFixtureId] = useState(inicial.programa);
  const [modo, setModo] = useState<Modo>(inicial.modo);
  const [foco, setFoco] = useState<Ling[]>(inicial.foco);
  const [selecionado, setSelecionado] = useState<string | null>(inicial.sel);
  const [hover, setHover] = useState<string | null>(null);
  const [aprofundar, setAprofundar] = useState(inicial.aprofundar);
  const [revelados, setRevelados] = useState<number | null>(inicial.passos);
  const [novo, setNovo] = useState<string | null>(null);
  const [cliques, setCliques] = useState<Record<string, number>>(lerCliques);
  const timer = useRef<number | undefined>(undefined);

  const fixture = FIXTURES.find((f) => f.id === fixtureId)!;
  const passos = useMemo(() => passosDoPrograma(fixture.ptbr.mapa), [fixture]);
  const linhasBase = useMemo(
    () => ({
      ptbr: segmentar(fixture.ptbr.codigo, fixture.ptbr.mapa),
      ...Object.fromEntries(
        LINGS.map((l) => [l, segmentar(fixture.linguagens[l].codigo, fixture.linguagens[l].mapa)]),
      ),
    }),
    [fixture],
  ) as Record<Ling | "ptbr", ReturnType<typeof segmentar>>;
  const reveladosSet = useMemo(
    () => (revelados === null ? null : new Set(passos.slice(0, revelados))),
    [passos, revelados],
  );

  useEffect(() => {
    const aoMudar = () => setTela(location.hash === "#atividade" ? "atividade" : "ide");
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  const registrarClique = useCallback((painel: string) => {
    setCliques((c) => {
      const novoValor = { ...c, [painel]: (c[painel] ?? 0) + 1 };
      try {
        sessionStorage.setItem("educai.cliques", JSON.stringify(novoValor));
      } catch {
        // sem armazenamento: só não guarda a contagem
      }
      return novoValor;
    });
  }, []);

  const trocarPrograma = (id: string) => {
    setFixtureId(id);
    setSelecionado(null);
    setRevelados(null);
    setNovo(null);
  };

  const proximoPasso = useCallback(() => {
    const k = revelados ?? 0;
    if (k >= passos.length) return;
    const passo = passos[k]!;
    setRevelados(k + 1);
    setNovo(passo);
    setSelecionado(passo);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNovo(null), 2200);
  }, [passos, revelados]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (tela !== "ide" || (e.target as HTMLElement).tagName === "TEXTAREA" || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "Escape") setSelecionado(null);
      if (e.key === "ArrowRight" && revelados !== null) proximoPasso();
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [tela, revelados, proximoPasso]);

  if (tela === "atividade") {
    return <Transferencia cliques={cliques} onVoltar={() => (location.hash = "")} />;
  }

  const lingsVisiveis = modo === "grade" ? [...LINGS] : LINGS.filter((l) => foco.includes(l));
  const alternarFoco = (l: Ling) =>
    setFoco((f) => (f.includes(l) ? (f.length > 1 ? f.filter((x) => x !== l) : f) : [...f, l].slice(-2)));

  const painel = (p: Ling | "ptbr", grande = false) => (
    <PainelCodigo
      key={p}
      titulo={p === "ptbr" ? "Português estruturado" : NOME_EXIBICAO[p]}
      ling={p}
      linhas={filtrarPorPassos(linhasBase[p], reveladosSet)}
      selecionado={selecionado}
      hover={hover}
      novo={novo}
      aviso={aviso(fixture, p, selecionado)}
      grande={grande}
      onSelecionar={(id) => {
        setSelecionado(id);
        registrarClique(p);
      }}
      onHover={setHover}
    />
  );

  const emConstrucao = revelados !== null;

  return (
    <div className="app">
      <header className="barra">
        <div className="marca">
          EducAI <span>protótipo</span>
        </div>
        <label className="campo">
          Programa
          <select value={fixtureId} onChange={(e) => trocarPrograma(e.target.value)}>
            {FIXTURES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.ordem}. {f.titulo}
              </option>
            ))}
          </select>
        </label>
        <div className="grupo" role="group" aria-label="Modo de exibição">
          <button className={`chip${modo === "grade" ? " ativo" : ""}`} onClick={() => setModo("grade")}>
            Todas as linguagens
          </button>
          <button className={`chip${modo === "foco" ? " ativo" : ""}`} onClick={() => setModo("foco")}>
            Foco
          </button>
        </div>
        {modo === "foco" && (
          <div className="grupo" role="group" aria-label="Linguagens em foco (até 2)">
            {LINGS.map((l) => (
              <button
                key={l}
                className={`chip ling${foco.includes(l) ? " ativo" : ""}`}
                data-ling={l}
                onClick={() => alternarFoco(l)}
              >
                {NOME_EXIBICAO[l]}
              </button>
            ))}
          </div>
        )}
        <div className="grupo construcao">
          {!emConstrucao ? (
            <button
              className="primario"
              onClick={() => {
                setSelecionado(null);
                setRevelados(0);
              }}
            >
              Construir passo a passo
            </button>
          ) : (
            <>
              <button className="primario" onClick={proximoPasso} disabled={revelados >= passos.length}>
                Próximo passo →
              </button>
              <span className="contador">
                {revelados}/{passos.length}
              </span>
              <button className="chip" onClick={() => setRevelados(null)}>
                Mostrar tudo
              </button>
            </>
          )}
        </div>
        <a className="link atividade" href="#atividade">
          Atividade
        </a>
      </header>

      <p className="descricao">
        <TextoRico texto={fixture.descricao} />
      </p>

      {emConstrucao && (
        <nav className="fio" aria-label="Elementos já construídos">
          {revelados === 0 && <span className="fio-vazio">Clique em “Próximo passo” para começar.</span>}
          {passos.slice(0, revelados).map((p, i) => {
            const no = fixture.nos[p]!;
            return (
              <button
                key={p}
                className={`fio-item${p === selecionado ? " ativo" : ""}${p === novo ? " novo" : ""}`}
                onClick={() => setSelecionado(p)}
              >
                <span className="fio-n">{i + 1}</span>
                {CARTOES_TIPO[no.tipo]?.nome ?? no.tipo}
              </button>
            );
          })}
        </nav>
      )}

      <main className="area">
        <div className="coluna-esq">
          {painel("ptbr")}
          <PainelExplicacao
            fixture={fixture}
            id={selecionado}
            aprofundar={aprofundar}
            onAprofundar={setAprofundar}
            onSelecionar={setSelecionado}
          />
        </div>
        <div className={`coluna-dir ${modo}`}>{lingsVisiveis.map((l) => painel(l, modo === "foco"))}</div>
      </main>
    </div>
  );
}
