/**
 * Parser do português estruturado (sprint.md S1, tarefas 1.2–1.4).
 *
 * - Descida recursiva; expressões por níveis de precedência (do menor para o maior):
 *   `ou` < `e` < `nao` < relacionais (= <> < <= > >=) < `+ -` < `* / div mod` < `-` unário.
 *   `nao a > b` é `nao (a > b)`.
 * - Ids pelo caminho estrutural (fixtures/README.md): `main/3`, `main/3/cond`, `f0/1/corpo/0`…
 * - Recuperação por comando: um comando com erro vira um nó `erro` e o resto continua.
 * - Mensagens em português, com linha e coluna.
 */
import type {
  Atribuicao,
  Chamada,
  Comando,
  Declaracao,
  Escreva,
  Expressao,
  Funcao,
  Indice,
  ItemEscrita,
  OperadorBinario,
  Parametro,
  Programa,
  Span,
  Tipo,
  TipoVetor,
  Variavel,
} from "./ast";
import { lexer, type Token } from "./lexer";

export interface ErroSintaxe {
  codigo: string;
  mensagem: string;
  span: Span;
}

export interface ResultadoParse {
  /** `null` só quando a estrutura do programa (algoritmo/inicio/fimalgoritmo) não pôde ser lida. */
  programa: Programa | null;
  erros: ErroSintaxe[];
  comentarios: { texto: string; linha: number; col: number }[];
}

class ErroParse extends Error {
  constructor(
    readonly codigo: string,
    mensagem: string,
    readonly token: Token,
  ) {
    super(mensagem);
  }
}

const TIPOS_BASE = new Set(["inteiro", "real", "caractere", "logico"]);
const INICIA_COMANDO = new Set(["escreva", "escreval", "leia", "se", "enquanto", "para", "retorne"]);
const FECHA_BLOCO = new Set([
  "senao",
  "fimse",
  "fimpara",
  "fimenquanto",
  "fimfuncao",
  "fimprocedimento",
  "fimalgoritmo",
  "inicio",
  "funcao",
  "procedimento",
]);

/** Como o token aparece numa mensagem de erro. */
function descrever(t: Token): string {
  switch (t.tipo) {
    case "eof":
      return "o fim do programa";
    case "texto":
      return `o texto ${t.texto}`;
    case "num":
      return `o número ${t.texto}`;
    default:
      return `\`${t.texto}\``;
  }
}

/** Expressão com a posição "de fora" (inclui parênteses), usada para o span do nó pai. */
interface Ex {
  no: Expressao;
  ini: [number, number];
  fim: [number, number];
}

const spanDe = (ini: [number, number], fim: [number, number]): Span => ({
  linhaInicio: ini[0],
  colInicio: ini[1],
  linhaFim: fim[0],
  colFim: fim[1],
});
const inicioDe = (t: Token): [number, number] => [t.linha, t.col];
const fimDe = (t: Token): [number, number] => [t.linhaFim, t.colFim];

class Parser {
  private i = 0;
  readonly erros: ErroSintaxe[] = [];

  constructor(private readonly toks: Token[]) {}

  // ------------------------------------------------------------- utilitários
  private get atual(): Token {
    return this.toks[this.i]!;
  }
  private get anterior(): Token {
    return this.toks[Math.max(0, this.i - 1)]!;
  }
  private espiar(k = 1): Token {
    return this.toks[Math.min(this.i + k, this.toks.length - 1)]!;
  }
  private avancar(): Token {
    const t = this.atual;
    if (t.tipo !== "eof") this.i++;
    return t;
  }
  private eKw(...kws: string[]): boolean {
    return this.atual.tipo === "kw" && kws.includes(this.atual.valor);
  }
  private eOp(...ops: string[]): boolean {
    return this.atual.tipo === "op" && ops.includes(this.atual.valor);
  }
  private esperarKw(kw: string, contexto: string): Token {
    if (this.eKw(kw)) return this.avancar();
    throw new ErroParse("S001", `Esperava \`${kw}\` ${contexto}, mas encontrei ${descrever(this.atual)}.`, this.atual);
  }
  private esperarOp(op: string, contexto: string): Token {
    if (this.eOp(op)) return this.avancar();
    throw new ErroParse("S002", `Esperava \`${op}\` ${contexto}, mas encontrei ${descrever(this.atual)}.`, this.atual);
  }
  private esperarId(contexto: string): Token {
    if (this.atual.tipo === "id") return this.avancar();
    const extra =
      this.atual.tipo === "kw" ? ` (\`${this.atual.texto}\` é uma palavra reservada e não pode ser nome)` : "";
    throw new ErroParse("S003", `Esperava um nome ${contexto}, mas encontrei ${descrever(this.atual)}${extra}.`, this.atual);
  }
  /** Fecha um bloco; se não achar, aponta para onde o bloco abriu. */
  private fecharBloco(kw: string, abertura: Token): Token {
    if (this.eKw(kw)) return this.avancar();
    throw new ErroParse(
      "S004",
      `O \`${abertura.texto}\` da linha ${abertura.linha} não foi fechado: esperava \`${kw}\`, mas encontrei ${descrever(this.atual)}.`,
      this.atual,
    );
  }
  private registrar(e: ErroParse) {
    const t = e.token;
    this.erros.push({ codigo: e.codigo, mensagem: e.message, span: spanDe(inicioDe(t), fimDe(t)) });
  }

  // ------------------------------------------------------------- programa
  programa(): Programa {
    const kwAlg = this.esperarKw("algoritmo", "no começo do programa");
    const nome = this.atual.tipo === "texto" ? this.avancar() : null;
    if (!nome) throw new ErroParse("S005", 'Depois de `algoritmo`, escreva o nome entre aspas: algoritmo "media".', this.atual);
    const cabecalho = spanDe(inicioDe(kwAlg), fimDe(nome));

    let varSpan: Span | undefined;
    const variaveis: Declaracao[] = [];
    if (this.eKw("var")) {
      const t = this.avancar();
      varSpan = spanDe(inicioDe(t), fimDe(t));
      while (this.haDeclaracao()) variaveis.push(this.declaracao(`var/${variaveis.length}`));
    }

    const funcoes: Funcao[] = [];
    while (this.eKw("funcao", "procedimento")) funcoes.push(this.funcao(`f${funcoes.length}`));

    const kwInicio = this.esperarKw("inicio", "antes dos comandos do programa");
    const corpo = this.comandos("main", ["fimalgoritmo"]);
    const kwFim = this.fecharBloco("fimalgoritmo", kwInicio);
    if (this.atual.tipo !== "eof") {
      this.registrar(new ErroParse("S006", "Há texto depois de `fimalgoritmo`; ele será ignorado.", this.atual));
    }

    return {
      id: "prog",
      tipo: "programa",
      nome: nome.valor,
      variaveis,
      funcoes,
      corpo,
      span: spanDe(inicioDe(kwAlg), fimDe(kwFim)),
      estrutura: {
        cabecalho,
        ...(varSpan ? { var: varSpan } : {}),
        inicio: spanDe(inicioDe(kwInicio), fimDe(kwInicio)),
        fim: spanDe(inicioDe(kwFim), fimDe(kwFim)),
      },
    };
  }

  private tipo(contexto: string): Tipo | TipoVetor {
    if (this.atual.tipo === "kw" && TIPOS_BASE.has(this.atual.valor)) return this.avancar().valor as Tipo;
    if (this.eKw("vetor")) {
      this.avancar();
      this.esperarOp("[", "depois de `vetor`");
      const ini = this.numeroInteiro("como limite inicial do vetor");
      this.esperarOp("..", "entre os limites do vetor, como em vetor[0..4]");
      const fim = this.numeroInteiro("como limite final do vetor");
      this.esperarOp("]", "depois dos limites do vetor");
      this.esperarKw("de", "depois de vetor[...], como em vetor[0..4] de inteiro");
      if (!(this.atual.tipo === "kw" && TIPOS_BASE.has(this.atual.valor))) {
        throw new ErroParse("S007", `Esperava o tipo dos elementos do vetor (inteiro, real, caractere ou logico), mas encontrei ${descrever(this.atual)}.`, this.atual);
      }
      const elemento = this.avancar().valor as Tipo;
      return { elemento, tamanho: fim - ini + 1, limiteInferior: ini };
    }
    throw new ErroParse("S007", `Esperava um tipo (inteiro, real, caractere, logico ou vetor) ${contexto}, mas encontrei ${descrever(this.atual)}.`, this.atual);
  }

  /**
   * Há outra declaração pela frente? Inclui o caso de uma palavra reservada usada como nome
   * (`para: inteiro`), para dar a mensagem certa em vez de "esperava inicio".
   */
  private haDeclaracao(): boolean {
    if (this.atual.tipo === "id") return true;
    const prox = this.espiar();
    return this.atual.tipo === "kw" && prox.tipo === "op" && (prox.valor === ":" || prox.valor === ",");
  }

  private numeroInteiro(contexto: string): number {
    if (this.atual.tipo === "num" && !this.atual.valor.includes(".")) return Number(this.avancar().valor);
    throw new ErroParse("S008", `Esperava um número inteiro ${contexto}, mas encontrei ${descrever(this.atual)}.`, this.atual);
  }

  private declaracao(id: string): Declaracao {
    const primeiro = this.esperarId("de variável");
    const nomes = [primeiro.texto];
    while (this.eOp(",")) {
      this.avancar();
      nomes.push(this.esperarId("de variável depois da vírgula").texto);
    }
    this.esperarOp(":", "entre os nomes e o tipo, como em `n1, n2: real`");
    const tipoDeclarado = this.tipo("depois de `:`");
    return { id, tipo: "declaracao", nomes, tipoDeclarado, span: spanDe(inicioDe(primeiro), fimDe(this.anterior)) };
  }

  private funcao(id: string): Funcao {
    const kw = this.avancar();
    const ehFuncao = kw.valor === "funcao";
    const nome = this.esperarId(`da ${ehFuncao ? "função" : "rotina"}`);
    const parametros: Parametro[] = [];
    if (this.eOp("(")) {
      this.avancar();
      while (!this.eOp(")")) {
        const nomeP = this.esperarId("de parâmetro");
        this.esperarOp(":", "entre o nome do parâmetro e o tipo");
        const tipoDeclarado = this.tipo("do parâmetro");
        parametros.push({
          id: `${id}/param/${parametros.length}`,
          tipo: "parametro",
          nome: nomeP.texto,
          tipoDeclarado,
          span: spanDe(inicioDe(nomeP), fimDe(this.anterior)),
        });
        if (this.eOp(",")) this.avancar();
        else if (!this.eOp(")")) this.esperarOp(")", "para fechar a lista de parâmetros");
      }
      this.avancar();
    }
    let retorno: Tipo | undefined;
    if (ehFuncao) {
      this.esperarOp(":", "e o tipo do resultado depois dos parâmetros, como em `funcao dobro(x: inteiro): inteiro`");
      const t = this.tipo("como tipo do resultado");
      if (typeof t !== "string") throw new ErroParse("S009", "No v1, uma função não pode devolver um vetor.", this.anterior);
      retorno = t;
    }
    const assinatura = spanDe(inicioDe(kw), fimDe(this.anterior));

    let varSpan: Span | undefined;
    const variaveis: Declaracao[] = [];
    if (this.eKw("var")) {
      const t = this.avancar();
      varSpan = spanDe(inicioDe(t), fimDe(t));
      while (this.haDeclaracao()) variaveis.push(this.declaracao(`${id}/var/${variaveis.length}`));
    }
    const kwInicio = this.esperarKw("inicio", `antes dos comandos da ${ehFuncao ? "função" : "rotina"}`);
    const fimKw = ehFuncao ? "fimfuncao" : "fimprocedimento";
    const corpo = this.comandos(id, [fimKw]);
    const kwFim = this.fecharBloco(fimKw, kw);

    return {
      id,
      tipo: "funcao",
      nome: nome.texto,
      parametros,
      ...(retorno ? { retorno } : {}),
      variaveis,
      corpo,
      span: spanDe(inicioDe(kw), fimDe(kwFim)),
      estrutura: {
        assinatura,
        ...(varSpan ? { var: varSpan } : {}),
        inicio: spanDe(inicioDe(kwInicio), fimDe(kwInicio)),
        fim: spanDe(inicioDe(kwFim), fimDe(kwFim)),
      },
    };
  }

  // ------------------------------------------------------------- comandos
  private comandos(prefixo: string, terminadores: string[]): Comando[] {
    const lista: Comando[] = [];
    while (this.atual.tipo !== "eof" && !this.eKw(...terminadores)) {
      const id = `${prefixo}/${lista.length}`;
      const inicio = this.i;
      try {
        lista.push(this.comando(id));
      } catch (e) {
        if (!(e instanceof ErroParse)) throw e;
        this.registrar(e);
        lista.push(this.recuperar(id, inicio, terminadores));
      }
    }
    return lista;
  }

  /**
   * Pula até um ponto seguro: um comando que começa numa linha depois do início do comando com
   * erro, ou o fim de um bloco.
   */
  private recuperar(id: string, inicio: number, terminadores: string[]): Comando {
    const linhaInicio = this.toks[inicio]!.linha;
    while (this.atual.tipo !== "eof") {
      const t = this.atual;
      if (t.tipo === "kw" && (terminadores.includes(t.valor) || FECHA_BLOCO.has(t.valor)) && this.i > inicio) break;
      if (t.linha > linhaInicio && ((t.tipo === "kw" && INICIA_COMANDO.has(t.valor)) || t.tipo === "id")) break;
      if (t.tipo === "kw" && terminadores.includes(t.valor)) break;
      this.avancar();
    }
    if (this.i === inicio) this.avancar(); // garante progresso
    const primeiro = this.toks[inicio]!;
    const ultimo = this.toks[Math.max(inicio, this.i - 1)]!;
    return { id, tipo: "erro", mensagem: "comando com erro", span: spanDe(inicioDe(primeiro), fimDe(ultimo)) };
  }

  private comando(id: string): Comando {
    const t = this.atual;
    if (t.tipo === "kw") {
      switch (t.valor) {
        case "escreva":
        case "escreval":
          return this.escreva(id);
        case "leia":
          return this.leia(id);
        case "se":
          return this.se(id);
        case "enquanto":
          return this.enquanto(id);
        case "para":
          return this.para(id);
        case "retorne": {
          this.avancar();
          const valor = this.expressao(`${id}/valor`);
          return { id, tipo: "retorno", valor: valor.no, span: spanDe(inicioDe(t), valor.fim) };
        }
      }
      if (FECHA_BLOCO.has(t.valor)) {
        throw new ErroParse("S010", `\`${t.texto}\` não fecha nenhum bloco aberto aqui.`, t);
      }
      throw new ErroParse("S011", `${descrever(t)} não pode começar um comando.`, t);
    }
    if (t.tipo === "id") {
      if (this.espiar().tipo === "op" && this.espiar().valor === "(") {
        const ch = this.chamada(`${id}/chamada`);
        return { id, tipo: "chamadaComando", chamada: ch.no as Chamada, span: spanDe(ch.ini, ch.fim) };
      }
      return this.atribuicao(id);
    }
    throw new ErroParse("S011", `Esperava um comando, mas encontrei ${descrever(t)}.`, t);
  }

  private escreva(id: string): Escreva {
    const kw = this.avancar();
    const itens: ItemEscrita[] = [];
    this.esperarOp("(", `depois de \`${kw.texto}\``);
    while (!this.eOp(")")) {
      const e = this.expressao(`${id}/${itens.length}`);
      const item: ItemEscrita = { expr: e.no };
      if (this.eOp(":")) {
        // formato do VisualG: x:largura ou x:largura:casas
        this.avancar();
        this.numeroInteiro("como largura no formato x:largura:casas");
        if (this.eOp(":")) {
          this.avancar();
          item.casas = this.numeroInteiro("como número de casas decimais");
        }
      }
      itens.push(item);
      if (this.eOp(",")) this.avancar();
      else if (!this.eOp(")")) this.esperarOp(")", `para fechar o \`${kw.texto}\` (ou \`,\` entre os itens)`);
    }
    const fecha = this.avancar();
    return { id, tipo: "escreva", itens, novaLinha: kw.valor === "escreval", span: spanDe(inicioDe(kw), fimDe(fecha)) };
  }

  private leia(id: string): Comando {
    const kw = this.avancar();
    this.esperarOp("(", "depois de `leia`");
    const alvo = this.alvo(`${id}/alvo`);
    const fecha = this.esperarOp(")", "depois da variável do `leia` (no v1, um `leia` lê uma variável)");
    return { id, tipo: "leia", alvo, span: spanDe(inicioDe(kw), fimDe(fecha)) };
  }

  private se(id: string): Comando {
    const kw = this.avancar();
    const condicao = this.expressao(`${id}/cond`);
    this.esperarKw("entao", "depois da condição do `se`");
    const entao = this.comandos(`${id}/entao`, ["senao", "fimse"]);
    let senao: Comando[] | undefined;
    if (this.eKw("senao")) {
      this.avancar();
      senao = this.comandos(`${id}/senao`, ["fimse"]);
    }
    const fim = this.fecharBloco("fimse", kw);
    return {
      id,
      tipo: "se",
      condicao: condicao.no,
      entao,
      ...(senao ? { senao } : {}),
      span: spanDe(inicioDe(kw), fimDe(fim)),
    };
  }

  private enquanto(id: string): Comando {
    const kw = this.avancar();
    const condicao = this.expressao(`${id}/cond`);
    this.esperarKw("faca", "depois da condição do `enquanto`");
    const corpo = this.comandos(`${id}/corpo`, ["fimenquanto"]);
    const fim = this.fecharBloco("fimenquanto", kw);
    return { id, tipo: "enquanto", condicao: condicao.no, corpo, span: spanDe(inicioDe(kw), fimDe(fim)) };
  }

  private para(id: string): Comando {
    const kw = this.avancar();
    const nome = this.esperarId("da variável de controle do `para`");
    const variavel: Variavel = { id: `${id}/var`, tipo: "variavel", nome: nome.texto, span: spanDe(inicioDe(nome), fimDe(nome)) };
    this.esperarKw("de", "depois da variável do `para`, como em `para i de 1 ate 10 faca`");
    const de = this.expressao(`${id}/de`);
    this.esperarKw("ate", "depois do valor inicial do `para`");
    const ate = this.expressao(`${id}/ate`);
    let passo = 1;
    if (this.eKw("passo")) {
      this.avancar();
      const negativo = this.eOp("-") ? (this.avancar(), true) : false;
      const n = this.numeroInteiro("no `passo` (o passo é sempre um número fixo, como `passo -1`)");
      passo = negativo ? -n : n;
      if (passo === 0) throw new ErroParse("S012", "O `passo` não pode ser 0: o laço nunca terminaria.", this.anterior);
    }
    this.esperarKw("faca", "no fim da linha do `para`");
    const corpo = this.comandos(`${id}/corpo`, ["fimpara"]);
    const fim = this.fecharBloco("fimpara", kw);
    return {
      id,
      tipo: "para",
      variavel,
      de: de.no,
      ate: ate.no,
      passo,
      corpo,
      span: spanDe(inicioDe(kw), fimDe(fim)),
    };
  }

  private atribuicao(id: string): Atribuicao {
    const alvo = this.alvo(`${id}/alvo`);
    if (this.eOp("=")) {
      throw new ErroParse("S013", "Para guardar um valor use `<-` (\"recebe\"), não `=`. O `=` compara valores.", this.atual);
    }
    this.esperarOp("<-", `depois de \`${alvo.tipo === "variavel" ? alvo.nome : alvo.vetor.nome}\` para guardar um valor`);
    const valor = this.expressao(`${id}/valor`);
    return {
      id,
      tipo: "atribuicao",
      alvo,
      valor: valor.no,
      span: { ...alvo.span, linhaFim: valor.fim[0], colFim: valor.fim[1] },
    };
  }

  /** Variável ou posição de vetor que recebe um valor. */
  private alvo(id: string): Variavel | Indice {
    const nome = this.esperarId("da variável");
    if (this.eOp("[")) {
      this.avancar();
      const pos = this.expressao(`${id}/pos`);
      const fecha = this.esperarOp("]", "para fechar a posição do vetor");
      return {
        id,
        tipo: "indice",
        vetor: { id: `${id}/vetor`, tipo: "variavel", nome: nome.texto, span: spanDe(inicioDe(nome), fimDe(nome)) },
        posicao: pos.no,
        span: spanDe(inicioDe(nome), fimDe(fecha)),
      };
    }
    return { id, tipo: "variavel", nome: nome.texto, span: spanDe(inicioDe(nome), fimDe(nome)) };
  }

  // ------------------------------------------------------------- expressões
  /** Lê uma expressão e numera os nós a partir de `id`. */
  private expressao(id: string): Ex {
    const e = this.ou();
    numerar(e.no, id);
    return e;
  }

  private binaria(prox: () => Ex, ops: (t: Token) => OperadorBinario | null, umaVez = false): Ex {
    let esq = prox();
    for (;;) {
      const op = ops(this.atual);
      if (!op) return esq;
      this.avancar();
      const dir = prox();
      esq = {
        no: { id: "", tipo: "operacao", op, esq: esq.no, dir: dir.no, span: spanDe(esq.ini, dir.fim) },
        ini: esq.ini,
        fim: dir.fim,
      };
      if (umaVez) return esq;
    }
  }

  private ou = (): Ex => this.binaria(this.e, (t) => (t.tipo === "kw" && t.valor === "ou" ? "ou" : null));
  private e = (): Ex => this.binaria(this.nao, (t) => (t.tipo === "kw" && t.valor === "e" ? "e" : null));
  private nao = (): Ex => {
    if (this.eKw("nao")) {
      const kw = this.avancar();
      const op = this.nao();
      return { no: { id: "", tipo: "unaria", op: "nao", operando: op.no, span: spanDe(inicioDe(kw), op.fim) }, ini: inicioDe(kw), fim: op.fim };
    }
    return this.relacional();
  };
  private relacional = (): Ex =>
    this.binaria(
      this.soma,
      (t) => (t.tipo === "op" && ["=", "<>", "<", "<=", ">", ">="].includes(t.valor) ? (t.valor as OperadorBinario) : null),
      true,
    );
  private soma = (): Ex =>
    this.binaria(this.produto, (t) => (t.tipo === "op" && (t.valor === "+" || t.valor === "-") ? t.valor : null));
  private produto = (): Ex =>
    this.binaria(this.unario, (t) =>
      (t.tipo === "op" && (t.valor === "*" || t.valor === "/")) || (t.tipo === "kw" && (t.valor === "div" || t.valor === "mod"))
        ? (t.valor as OperadorBinario)
        : null,
    );
  private unario = (): Ex => {
    if (this.eOp("-")) {
      const t = this.avancar();
      const op = this.unario();
      return { no: { id: "", tipo: "unaria", op: "-", operando: op.no, span: spanDe(inicioDe(t), op.fim) }, ini: inicioDe(t), fim: op.fim };
    }
    return this.primario();
  };

  private primario(): Ex {
    const t = this.atual;
    const simples = (no: Expressao): Ex => ({ no, ini: inicioDe(t), fim: fimDe(t) });
    const span = spanDe(inicioDe(t), fimDe(t));
    if (t.tipo === "num") {
      this.avancar();
      const real = t.valor.includes(".");
      return simples({ id: "", tipo: "literal", tipoValor: real ? "real" : "inteiro", valor: Number(t.valor), span });
    }
    if (t.tipo === "texto") {
      this.avancar();
      return simples({ id: "", tipo: "literal", tipoValor: "caractere", valor: t.valor, span });
    }
    if (t.tipo === "kw" && (t.valor === "verdadeiro" || t.valor === "falso")) {
      this.avancar();
      return simples({ id: "", tipo: "literal", tipoValor: "logico", valor: t.valor === "verdadeiro", span });
    }
    if (this.eOp("(")) {
      const abre = this.avancar();
      const dentro = this.ou();
      const fecha = this.esperarOp(")", "para fechar o parêntese");
      return { no: dentro.no, ini: inicioDe(abre), fim: fimDe(fecha) };
    }
    if (t.tipo === "id") {
      if (this.espiar().tipo === "op" && this.espiar().valor === "(") return this.chamada("");
      if (this.espiar().tipo === "op" && this.espiar().valor === "[") {
        const alvo = this.alvo("");
        return { no: alvo, ini: inicioDe(t), fim: [alvo.span.linhaFim, alvo.span.colFim] };
      }
      this.avancar();
      return simples({ id: "", tipo: "variavel", nome: t.texto, span });
    }
    throw new ErroParse("S014", `Esperava um valor, uma variável ou uma conta, mas encontrei ${descrever(t)}.`, t);
  }

  private chamada(id: string): Ex {
    const nome = this.avancar();
    this.avancar(); // (
    const argumentos: Expressao[] = [];
    while (!this.eOp(")")) {
      argumentos.push(this.ou().no);
      if (this.eOp(",")) this.avancar();
      else if (!this.eOp(")")) this.esperarOp(")", `para fechar a chamada de \`${nome.texto}\``);
    }
    const fecha = this.avancar();
    const no: Chamada = { id, tipo: "chamada", nome: nome.texto, argumentos, span: spanDe(inicioDe(nome), fimDe(fecha)) };
    if (id) numerar(no, id);
    return { no, ini: inicioDe(nome), fim: fimDe(fecha) };
  }
}

/** Dá ids pelo caminho estrutural aos nós de uma expressão. */
function numerar(no: Expressao, id: string): void {
  no.id = id;
  switch (no.tipo) {
    case "operacao":
      numerar(no.esq, `${id}/esq`);
      numerar(no.dir, `${id}/dir`);
      break;
    case "unaria":
      numerar(no.operando, `${id}/operando`);
      break;
    case "chamada":
      no.argumentos.forEach((a, k) => numerar(a, `${id}/arg/${k}`));
      break;
    case "indice":
      no.vetor.id = `${id}/vetor`;
      numerar(no.posicao, `${id}/pos`);
      break;
  }
}

export function parse(fonte: string): ResultadoParse {
  const lex = lexer(fonte);
  const erros: ErroSintaxe[] = lex.erros.map((e) => ({
    codigo: e.codigo,
    mensagem: e.mensagem,
    span: { linhaInicio: e.linha, colInicio: e.col, linhaFim: e.linha, colFim: e.col + 1 },
  }));
  const p = new Parser(lex.tokens);
  let programa: Programa | null = null;
  try {
    programa = p.programa();
  } catch (e) {
    if (!(e instanceof ErroParse)) throw e;
    const t = e.token;
    p.erros.push({ codigo: e.codigo, mensagem: e.message, span: spanDe(inicioDe(t), fimDe(t)) });
  }
  return { programa, erros: [...erros, ...p.erros], comentarios: lex.comentarios };
}
