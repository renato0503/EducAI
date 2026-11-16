/** Linguagens-alvo do MVP, na ordem em que os geradores serão construídos (sprint.md §6). */
export const LINGUAGENS_MVP = ["python", "java", "c", "cpp", "php"] as const;

/** Linguagens previstas para a v1.1 (sprint.md §11). */
export const LINGUAGENS_V11 = ["javascript", "csharp", "go"] as const;

export type LinguagemMvp = (typeof LINGUAGENS_MVP)[number];
export type Linguagem = LinguagemMvp | (typeof LINGUAGENS_V11)[number];

export const NOME_EXIBICAO: Record<Linguagem, string> = {
  python: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
  php: "PHP",
  javascript: "JavaScript",
  csharp: "C#",
  go: "Go",
};
