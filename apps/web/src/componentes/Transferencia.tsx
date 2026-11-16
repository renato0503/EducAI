import { useState } from "react";

/**
 * Tarefa de transferência do think-aloud (docs/fase0-roteiros.md §2.2, passo 4).
 * O aluno vê um trecho numa linguagem que não estudou, sem a ferramenta, e responde.
 */
const TRECHOS = {
  java: {
    nome: "Java",
    linhas: [
      "int soma = 0;",
      "for (int i = 1; i <= 3; i++) {",
      "    soma = soma + i * 2;",
      '    System.out.println("parcial: " + soma);',
      "}",
      "if (soma > 10) {",
      '    System.out.println("grande");',
      "} else {",
      '    System.out.println("pequeno");',
      "}",
    ],
    linhaPara: 2,
  },
  c: {
    nome: "C",
    linhas: [
      "int soma = 0;",
      "int i;",
      "for (i = 1; i <= 3; i++) {",
      "    soma = soma + i * 2;",
      '    printf("parcial: %d\\n", soma);',
      "}",
      "if (soma > 10) {",
      '    printf("grande\\n");',
      "} else {",
      '    printf("pequeno\\n");',
      "}",
    ],
    linhaPara: 3,
  },
} as const;

const SAIDA_CORRETA = "parcial: 2\nparcial: 6\nparcial: 12\ngrande";

export function Transferencia({ cliques, onVoltar }: { cliques: Record<string, number>; onVoltar: () => void }) {
  const [ling, setLing] = useState<keyof typeof TRECHOS>("java");
  const [saida, setSaida] = useState("");
  const [linha, setLinha] = useState<number | null>(null);
  const [participante, setParticipante] = useState("");
  const [concluido, setConcluido] = useState(false);
  const [gabarito, setGabarito] = useState(false);
  const trecho = TRECHOS[ling];

  const resumo = [
    `Participante: ${participante || "(sem código)"}`,
    `Linguagem do trecho: ${trecho.nome}`,
    `Saída prevista:\n${saida.trim() || "(vazia)"}`,
    `Saída correta? ${saida.trim().replace(/\s+\n/g, "\n") === SAIDA_CORRETA ? "sim" : "não (conferir manualmente)"}`,
    `Linha escolhida para "para i de 1 ate 3": ${linha ?? "(nenhuma)"} — correta: ${trecho.linhaPara}`,
    `Cliques por painel na sessão: ${
      Object.entries(cliques)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ") || "(nenhum)"
    }`,
  ].join("\n");

  return (
    <main className="transferencia">
      <header className="transf-topo">
        <h1>Atividade</h1>
        <button className="link" onClick={onVoltar}>
          Voltar para a ferramenta
        </button>
      </header>

      {!concluido ? (
        <>
          <p>
            Este trecho está em <strong>{trecho.nome}</strong>. Responda sem usar a ferramenta.
          </p>
          <div className="transf-ling">
            Trecho em:{" "}
            {(Object.keys(TRECHOS) as (keyof typeof TRECHOS)[]).map((k) => (
              <button key={k} className={`chip${k === ling ? " ativo" : ""}`} onClick={() => { setLing(k); setLinha(null); }}>
                {TRECHOS[k].nome}
              </button>
            ))}
          </div>
          <pre className="codigo transf-codigo">
            {trecho.linhas.map((texto, i) => (
              <div
                key={i}
                className={`linha clicavel${linha === i + 1 ? " escolhida" : ""}`}
                onClick={() => setLinha(i + 1)}
              >
                <span className="num">{i + 1}</span>
                <span className="conteudo">{texto}</span>
              </div>
            ))}
          </pre>

          <ol className="transf-perguntas">
            <li>
              <label htmlFor="saida">O que este programa mostra na tela?</label>
              <textarea id="saida" rows={5} value={saida} onChange={(e) => setSaida(e.target.value)} />
            </li>
            <li>
              Clique na linha que faz o mesmo que <code>para i de 1 ate 3 faca</code>.{" "}
              {linha ? <strong>Linha {linha}</strong> : <em>nenhuma escolhida</em>}
            </li>
          </ol>

          <div className="transf-fim">
            <label>
              Código do participante (facilitador):{" "}
              <input value={participante} onChange={(e) => setParticipante(e.target.value)} placeholder="A1" />
            </label>
            <button className="primario" onClick={() => setConcluido(true)}>
              Concluir
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Obrigado! Respostas registradas para o facilitador.</p>
          <pre className="transf-resumo">{resumo}</pre>
          <button className="link" onClick={() => navigator.clipboard?.writeText(resumo)}>
            Copiar resumo
          </button>{" "}
          <button className="link" onClick={() => setGabarito((g) => !g)}>
            {gabarito ? "Esconder" : "Mostrar"} gabarito
          </button>
          {gabarito && <pre className="transf-resumo">{SAIDA_CORRETA}</pre>}
          <p>
            <button
              className="link"
              onClick={() => {
                setSaida("");
                setLinha(null);
                setParticipante("");
                setConcluido(false);
                setGabarito(false);
              }}
            >
              Novo participante
            </button>
          </p>
        </>
      )}
    </main>
  );
}
