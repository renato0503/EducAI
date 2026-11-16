/**
 * Esquema da AST/IR única (context.md §6.3). Rascunho da Fase 0: usado pelas fixtures escritas à
 * mão e, a partir da Sprint 1, produzido pelo parser.
 */

/** Posição no texto, 1-indexada, com fim exclusivo na coluna. */
export interface Span {
  linhaInicio: number;
  colInicio: number;
  linhaFim: number;
  colFim: number;
}

/** ID por caminho estrutural, ex.: "main/2/cond/esq". Determinístico para o mesmo texto. */
export type NodeId = string;

/** ID de nó sintético (código que só existe na linguagem-alvo), ex.: "syn:java.class_main". */
export type SyntheticId = `syn:${string}`;

export type Tipo = "inteiro" | "real" | "caractere" | "logico";

export interface TipoVetor {
  elemento: Tipo;
  tamanho: number;
}

interface Base<K extends string> {
  id: NodeId;
  tipo: K;
  span: Span;
}

// Expressões

export interface Literal extends Base<"literal"> {
  tipoValor: Tipo;
  valor: number | string | boolean;
}

export interface Variavel extends Base<"variavel"> {
  nome: string;
}

export interface Indice extends Base<"indice"> {
  vetor: Variavel;
  posicao: Expressao;
}

export type OperadorBinario =
  | "+" | "-" | "*" | "/" | "div" | "mod"
  | "=" | "<>" | "<" | "<=" | ">" | ">="
  | "e" | "ou";

export interface Operacao extends Base<"operacao"> {
  op: OperadorBinario;
  esq: Expressao;
  dir: Expressao;
}

export interface Unaria extends Base<"unaria"> {
  op: "-" | "nao";
  operando: Expressao;
}

export interface Chamada extends Base<"chamada"> {
  nome: string;
  argumentos: Expressao[];
}

export type Expressao = Literal | Variavel | Indice | Operacao | Unaria | Chamada;

// Comandos

export interface Declaracao extends Base<"declaracao"> {
  nomes: string[];
  tipoDeclarado: Tipo | TipoVetor;
}

export interface Atribuicao extends Base<"atribuicao"> {
  alvo: Variavel | Indice;
  valor: Expressao;
}

/** Item de `escreva`; `casas` vem do formato `x:0:n`. */
export interface ItemEscrita {
  expr: Expressao;
  casas?: number;
}

export interface Escreva extends Base<"escreva"> {
  itens: ItemEscrita[];
  novaLinha: boolean;
}

export interface Leia extends Base<"leia"> {
  alvo: Variavel | Indice;
}

export interface Se extends Base<"se"> {
  condicao: Expressao;
  entao: Comando[];
  senao?: Comando[];
}

export interface Enquanto extends Base<"enquanto"> {
  condicao: Expressao;
  corpo: Comando[];
}

export interface Para extends Base<"para"> {
  variavel: Variavel;
  de: Expressao;
  ate: Expressao;
  /** Literal inteiro não nulo (docs/semantica.md §6). */
  passo: number;
  corpo: Comando[];
}

export interface ChamadaComando extends Base<"chamadaComando"> {
  chamada: Chamada;
}

export interface Retorno extends Base<"retorno"> {
  valor: Expressao;
}

export interface Comentario extends Base<"comentario"> {
  texto: string;
}

/** Comando que não parseou; o resto do programa continua válido (sprint.md 1.3). */
export interface Erro extends Base<"erro"> {
  mensagem: string;
}

export type Comando =
  | Atribuicao
  | Escreva
  | Leia
  | Se
  | Enquanto
  | Para
  | ChamadaComando
  | Retorno
  | Comentario
  | Erro;

// Estrutura

export interface Parametro extends Base<"parametro"> {
  nome: string;
  tipoDeclarado: Tipo | TipoVetor;
}

export interface Funcao extends Base<"funcao"> {
  nome: string;
  parametros: Parametro[];
  /** Ausente em procedimentos. */
  retorno?: Tipo;
  variaveis: Declaracao[];
  corpo: Comando[];
}

export interface Programa extends Base<"programa"> {
  nome: string;
  variaveis: Declaracao[];
  funcoes: Funcao[];
  corpo: Comando[];
}

export type No =
  | Programa
  | Funcao
  | Parametro
  | Declaracao
  | Comando
  | Expressao;

// Saída dos geradores

/** Range no código gerado: [linhaInicio, colInicio, linhaFim, colFim], 1-indexado. */
export type Range = [number, number, number, number];

/** Mapa nó → ranges. Um nó pode aparecer em vários pedaços; lista vazia = sem equivalente. */
export type MapaTokens = Record<NodeId | SyntheticId, Range[]>;

export interface CodigoGerado {
  linguagem: string;
  codigo: string;
  mapa: MapaTokens;
}
