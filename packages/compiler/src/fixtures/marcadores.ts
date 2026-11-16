import type { MapaTokens, Range } from "../ast";

/**
 * Marcadores para escrever código com o mapa nó → ranges embutido (docs/PROGRESSO.md §6.3).
 *
 *   ⟦main/1⟧while (⟦main/1/cond⟧i < 10⟦/⟧) {⟦/⟧
 *
 * - `⟦id⟧` abre um trecho do nó `id`; `⟦/⟧` fecha o trecho aberto mais recente (aninhamento livre).
 * - O mesmo id pode aparecer várias vezes: cada trecho vira um range a mais (ex.: `{` e `}`).
 * - No PT-BR, a abertura pode trazer o tipo do nó: `⟦main/1|enquanto⟧`.
 *
 * Colunas são 1-indexadas e contadas em unidades UTF-16 (como no Monaco); o fim é exclusivo.
 */

export const ABRE = "⟦";
export const FECHA = "⟧";

export interface ResultadoMarcadores {
  codigo: string;
  mapa: MapaTokens;
  /** Tipos declarados com `⟦id|tipo⟧`. */
  tipos: Record<string, string>;
}

export class ErroMarcador extends Error {
  constructor(mensagem: string, linha: number, coluna: number) {
    super(`${mensagem} (linha ${linha}, coluna ${coluna} do texto marcado)`);
    this.name = "ErroMarcador";
  }
}

export function extrairMarcadores(marcado: string): ResultadoMarcadores {
  const texto = marcado.replace(/\r\n/g, "\n");
  const mapa: MapaTokens = {};
  const tipos: Record<string, string> = {};
  const pilha: { id: string; linha: number; col: number }[] = [];
  let codigo = "";
  let linha = 1;
  let col = 1;
  // Posição no texto marcado, só para mensagens de erro.
  let mLinha = 1;
  let mCol = 1;

  let i = 0;
  while (i < texto.length) {
    const ch = texto[i]!;
    if (ch === ABRE) {
      const fim = texto.indexOf(FECHA, i);
      if (fim < 0) throw new ErroMarcador(`"${ABRE}" sem "${FECHA}"`, mLinha, mCol);
      const conteudo = texto.slice(i + 1, fim);
      if (conteudo === "/") {
        const aberto = pilha.pop();
        if (!aberto) throw new ErroMarcador("fechamento sem abertura", mLinha, mCol);
        const range: Range = [aberto.linha, aberto.col, linha, col];
        (mapa[aberto.id] ??= []).push(range);
      } else {
        const [id, tipo] = conteudo.split("|");
        if (!id) throw new ErroMarcador("marcador sem id", mLinha, mCol);
        if (tipo) {
          if (tipos[id] && tipos[id] !== tipo) {
            throw new ErroMarcador(`nó "${id}" com tipos diferentes`, mLinha, mCol);
          }
          tipos[id] = tipo;
        }
        pilha.push({ id, linha, col });
      }
      mCol += fim - i + 1;
      i = fim + 1;
      continue;
    }
    if (ch === FECHA) throw new ErroMarcador(`"${FECHA}" sem "${ABRE}"`, mLinha, mCol);

    codigo += ch;
    if (ch === "\n") {
      linha++;
      col = 1;
      mLinha++;
      mCol = 1;
    } else {
      col++;
      mCol++;
    }
    i++;
  }

  if (pilha.length > 0) {
    const aberto = pilha[pilha.length - 1]!;
    throw new ErroMarcador(`nó "${aberto.id}" aberto e não fechado`, aberto.linha, aberto.col);
  }
  return { codigo, mapa, tipos };
}

export interface CaractereDescoberto {
  linha: number;
  col: number;
  caractere: string;
}

/** Caracteres não brancos que não pertencem a nenhum range do mapa (teste de cobertura). */
export function caracteresDescobertos(codigo: string, mapa: MapaTokens): CaractereDescoberto[] {
  const ranges = Object.values(mapa).flat();
  const dentro = (l: number, c: number) =>
    ranges.some(([l0, c0, l1, c1]) => {
      const depoisDoInicio = l > l0 || (l === l0 && c >= c0);
      const antesDoFim = l < l1 || (l === l1 && c < c1);
      return depoisDoInicio && antesDoFim;
    });

  const faltando: CaractereDescoberto[] = [];
  codigo.split("\n").forEach((textoLinha, idx) => {
    for (let j = 0; j < textoLinha.length; j++) {
      const caractere = textoLinha[j]!;
      if (/\s/.test(caractere)) continue;
      if (!dentro(idx + 1, j + 1)) faltando.push({ linha: idx + 1, col: j + 1, caractere });
    }
  });
  return faltando;
}

/** Texto de um range, para rótulos e depuração. */
export function textoDoRange(codigo: string, [l0, c0, l1, c1]: Range): string {
  const linhas = codigo.split("\n");
  if (l0 === l1) return linhas[l0 - 1]!.slice(c0 - 1, c1 - 1);
  const partes = [linhas[l0 - 1]!.slice(c0 - 1)];
  for (let l = l0 + 1; l < l1; l++) partes.push(linhas[l - 1]!);
  partes.push(linhas[l1 - 1]!.slice(0, c1 - 1));
  return partes.join("\n");
}
