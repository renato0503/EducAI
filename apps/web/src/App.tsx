import { LINGUAGENS_MVP, NOME_EXIBICAO } from "@educai/compiler";

/**
 * Casca inicial. Na Sprint 1 vira: editor PT-BR + 5 abas Monaco + highlight cruzado sobre as
 * fixtures da Fase 0 (sprint.md 1.5–1.7).
 */
export function App() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>EducAI</h1>
      <p>Escreva em português estruturado e veja cada elemento nas principais linguagens.</p>
      <ul>
        {LINGUAGENS_MVP.map((l) => (
          <li key={l}>{NOME_EXIBICAO[l]}</li>
        ))}
      </ul>
    </main>
  );
}
