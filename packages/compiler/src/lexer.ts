/**
 * Lexer do português estruturado (sprint.md S1, tarefa 1.1).
 *
 * - Palavras-chave não diferenciam maiúsculas nem acentos: `Entao`, `então` e `ENTAO` são a mesma.
 * - Identificadores diferenciam maiúsculas (decisão a confirmar; ver docs/semantica.md §9).
 * - Comentários `//` não entram no fluxo de tokens; ficam em `comentarios`.
 * - Posições: linha e coluna 1-indexadas, coluna em unidades UTF-16, fim exclusivo.
 */

export type TipoToken = "kw" | "id" | "num" | "texto" | "op" | "eof";

export interface Token {
  tipo: TipoToken;
  /** Palavra-chave normalizada (minúscula, sem acento), operador, número ou nome. */
  valor: string;
  /** Texto exatamente como está no código. */
  texto: string;
  linha: number;
  col: number;
  linhaFim: number;
  colFim: number;
}

export interface ErroLexico {
  codigo: string;
  mensagem: string;
  linha: number;
  col: number;
}

export const PALAVRAS_CHAVE = new Set([
  "algoritmo",
  "var",
  "inicio",
  "fimalgoritmo",
  "inteiro",
  "real",
  "caractere",
  "logico",
  "vetor",
  "de",
  "ate",
  "passo",
  "faca",
  "para",
  "fimpara",
  "enquanto",
  "fimenquanto",
  "se",
  "entao",
  "senao",
  "fimse",
  "escreva",
  "escreval",
  "leia",
  "funcao",
  "fimfuncao",
  "procedimento",
  "fimprocedimento",
  "retorne",
  "e",
  "ou",
  "nao",
  "div",
  "mod",
  "verdadeiro",
  "falso",
]);

/** Operadores e pontuação, do mais longo para o mais curto. */
const OPERADORES = ["<-", "<=", ">=", "<>", "..", "+", "-", "*", "/", "=", "<", ">", "(", ")", "[", "]", ",", ":"];

/** Remove acentos e passa para minúsculas: "Então" → "entao". */
export function normalizarPalavra(texto: string): string {
  return texto.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

const INICIO_ID = /[\p{L}_]/u;
const RESTO_ID = /[\p{L}\p{N}_]/u;

export interface ResultadoLexer {
  tokens: Token[];
  comentarios: { texto: string; linha: number; col: number }[];
  erros: ErroLexico[];
}

export function lexer(fonte: string): ResultadoLexer {
  const texto = fonte.replace(/\r\n/g, "\n");
  const tokens: Token[] = [];
  const comentarios: ResultadoLexer["comentarios"] = [];
  const erros: ErroLexico[] = [];
  let i = 0;
  let linha = 1;
  let col = 1;

  const emitir = (tipo: TipoToken, valor: string, bruto: string, l: number, c: number) => {
    tokens.push({ tipo, valor, texto: bruto, linha: l, col: c, linhaFim: linha, colFim: col });
  };
  const avancar = (n: number) => {
    for (let k = 0; k < n; k++) {
      if (texto[i] === "\n") {
        linha++;
        col = 1;
      } else {
        col++;
      }
      i++;
    }
  };

  while (i < texto.length) {
    const ch = texto[i]!;
    const l = linha;
    const c = col;

    if (ch === " " || ch === "\t" || ch === "\n") {
      avancar(1);
      continue;
    }

    // Comentário até o fim da linha
    if (texto.startsWith("//", i)) {
      const fim = texto.indexOf("\n", i);
      const ate = fim < 0 ? texto.length : fim;
      comentarios.push({ texto: texto.slice(i + 2, ate).trim(), linha: l, col: c });
      avancar(ate - i);
      continue;
    }

    // Texto entre aspas duplas (sem escapes no v1)
    if (ch === '"') {
      const fim = texto.indexOf('"', i + 1);
      const quebra = texto.indexOf("\n", i + 1);
      if (fim < 0 || (quebra >= 0 && quebra < fim)) {
        erros.push({
          codigo: "L002",
          mensagem: "Texto sem aspas de fechamento: todo texto precisa começar e terminar com \" na mesma linha.",
          linha: l,
          col: c,
        });
        const ate = quebra < 0 ? texto.length : quebra;
        avancar(ate - i);
        continue;
      }
      const bruto = texto.slice(i, fim + 1);
      avancar(bruto.length);
      emitir("texto", bruto.slice(1, -1), bruto, l, c);
      continue;
    }

    // Número: inteiro ou real com ponto ("0..4" vira 0, "..", 4)
    if (/[0-9]/.test(ch)) {
      const m = /^[0-9]+(?:\.[0-9]+)?/.exec(texto.slice(i))!;
      avancar(m[0].length);
      emitir("num", m[0], m[0], l, c);
      continue;
    }

    // Palavra-chave ou identificador
    if (INICIO_ID.test(ch)) {
      let j = i + 1;
      while (j < texto.length && RESTO_ID.test(texto[j]!)) j++;
      const bruto = texto.slice(i, j);
      avancar(bruto.length);
      const normal = normalizarPalavra(bruto);
      if (PALAVRAS_CHAVE.has(normal)) emitir("kw", normal, bruto, l, c);
      else emitir("id", bruto, bruto, l, c);
      continue;
    }

    const op = OPERADORES.find((o) => texto.startsWith(o, i));
    if (op) {
      avancar(op.length);
      emitir("op", op, op, l, c);
      continue;
    }

    // "←" do VisualG também vale como atribuição
    if (ch === "←") {
      avancar(1);
      emitir("op", "<-", ch, l, c);
      continue;
    }

    erros.push({ codigo: "L001", mensagem: `Caractere inesperado: \`${ch}\`.`, linha: l, col: c });
    avancar(1);
  }

  tokens.push({ tipo: "eof", valor: "", texto: "", linha, col, linhaFim: linha, colFim: col });
  return { tokens, comentarios, erros };
}
