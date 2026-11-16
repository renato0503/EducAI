import type { MapaTokens } from "@educai/compiler";

/** Pedaço contínuo de código coberto pelo mesmo conjunto de nós. */
export interface Segmento {
  texto: string;
  /** Nós que cobrem o segmento, do mais interno (menor) para o mais externo. */
  nos: string[];
  /** Passo do modo construção a que o segmento pertence (ex.: "main/3", "f0"), se houver. */
  passo: string | null;
}

export interface Linha {
  numero: number;
  segmentos: Segmento[];
}

const RE_PASSO = /^(?:(?:var|main)\/\d+|f\d+)/;

/** Passo (comando de nível mais alto) de um id: "main/2/cond" → "main/2"; "f0:assinatura" → "f0". */
export function passoDe(id: string): string | null {
  return RE_PASSO.exec(id)?.[0] ?? null;
}

function inicioDasLinhas(codigo: string): number[] {
  const inicios = [0];
  for (let i = 0; i < codigo.length; i++) if (codigo[i] === "\n") inicios.push(i + 1);
  return inicios;
}

/** Converte [linha, coluna] 1-indexados em deslocamento no texto. */
function offset(inicios: number[], linha: number, col: number): number {
  return inicios[linha - 1]! + col - 1;
}

/** Divide o código em linhas de segmentos, cada um com os nós que o cobrem. */
export function segmentar(codigo: string, mapa: MapaTokens): Linha[] {
  const inicios = inicioDasLinhas(codigo);
  const ranges = Object.entries(mapa).flatMap(([id, lista]) =>
    lista.map(([l0, c0, l1, c1]) => {
      const ini = offset(inicios, l0, c0);
      const fim = offset(inicios, l1, c1);
      return { id, ini, fim, tam: fim - ini };
    }),
  );

  const cortes = new Set<number>([0, codigo.length]);
  for (const r of ranges) {
    cortes.add(r.ini);
    cortes.add(r.fim);
  }
  for (let i = 0; i < codigo.length; i++) {
    if (codigo[i] === "\n") {
      cortes.add(i);
      cortes.add(i + 1);
    }
  }
  const pontos = [...cortes].sort((a, b) => a - b);

  const linhas: Linha[] = [{ numero: 1, segmentos: [] }];
  for (let k = 0; k < pontos.length - 1; k++) {
    const a = pontos[k]!;
    const b = pontos[k + 1]!;
    const texto = codigo.slice(a, b);
    if (texto === "\n") {
      linhas.push({ numero: linhas.length + 1, segmentos: [] });
      continue;
    }
    const cobrem = ranges.filter((r) => r.ini <= a && r.fim >= b).sort((x, y) => x.tam - y.tam);
    const nos = [...new Set(cobrem.map((r) => r.id))];
    const passo = nos.map(passoDe).find((p) => p !== null) ?? null;
    linhas[linhas.length - 1]!.segmentos.push({ texto, nos, passo });
  }
  // O arquivo termina com "\n": não mostrar a linha vazia depois dele
  if (linhas.length > 1 && linhas[linhas.length - 1]!.segmentos.length === 0) linhas.pop();
  return linhas;
}

/** Passos do modo construção, na ordem em que aparecem no PT-BR. */
export function passosDoPrograma(mapaPtbr: MapaTokens): string[] {
  const primeiro = new Map<string, [number, number]>();
  for (const [id, lista] of Object.entries(mapaPtbr)) {
    if (passoDe(id) !== id) continue;
    const [l, c] = lista[0]!;
    primeiro.set(id, [l, c]);
  }
  return [...primeiro.entries()]
    .sort(([, a], [, b]) => a[0] - b[0] || a[1] - b[1])
    .map(([id]) => id);
}

const branca = (l: Linha) => l.segmentos.every((s) => s.texto.trim() === "");

/**
 * Linhas visíveis no modo construção: tira os segmentos de passos ainda não revelados, remove as
 * linhas que ficaram vazias por causa disso e junta linhas em branco consecutivas.
 * `revelados = null` mostra tudo.
 */
export function filtrarPorPassos(linhas: Linha[], revelados: ReadonlySet<string> | null): Linha[] {
  if (!revelados) return linhas;
  const resultado: Linha[] = [];
  for (const linha of linhas) {
    const visiveis = linha.segmentos.filter((s) => !s.passo || revelados.has(s.passo));
    const nova = { numero: linha.numero, segmentos: visiveis };
    const tinhaOculto = visiveis.length < linha.segmentos.length;
    if (tinhaOculto && branca(nova)) continue;
    if (branca(nova) && (resultado.length === 0 || branca(resultado[resultado.length - 1]!))) continue;
    resultado.push(nova);
  }
  while (resultado.length > 0 && branca(resultado[resultado.length - 1]!)) resultado.pop();
  return resultado;
}

/** Ancestrais de um nó que existem no programa, do mais externo para o mais interno. */
export function ancestrais(id: string, existe: (id: string) => boolean): string[] {
  const lista: string[] = [];
  let atual = id;
  for (;;) {
    const corte = Math.max(atual.lastIndexOf("/"), atual.lastIndexOf(":"));
    if (corte < 0) break;
    atual = atual.slice(0, corte);
    if (existe(atual)) lista.unshift(atual);
  }
  return lista;
}
