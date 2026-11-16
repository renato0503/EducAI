/**
 * Mapa id → ranges e id → tipo do código PT-BR, a partir da AST.
 * É o que o editor usa para o highlight do painel em português, no mesmo formato das fixtures.
 */
import type { Comando, Expressao, MapaTokens, Programa, Range, Span } from "./ast";

const range = (s: Span): Range => [s.linhaInicio, s.colInicio, s.linhaFim, s.colFim];

export interface MapaPtbr {
  mapa: MapaTokens;
  /** Tipo de cada nó, com os mesmos nomes do catálogo (catalogo/tipos.json). */
  tipos: Record<string, string>;
}

export function mapaPtbr(programa: Programa): MapaPtbr {
  const mapa: MapaTokens = {};
  const tipos: Record<string, string> = {};
  const add = (id: string, tipo: string, ...spans: Span[]) => {
    mapa[id] = [...(mapa[id] ?? []), ...spans.map(range)];
    tipos[id] = tipo;
  };

  const expr = (e: Expressao) => {
    add(e.id, e.tipo, e.span);
    switch (e.tipo) {
      case "operacao":
        expr(e.esq);
        expr(e.dir);
        break;
      case "unaria":
        expr(e.operando);
        break;
      case "chamada":
        e.argumentos.forEach(expr);
        break;
      case "indice":
        add(e.vetor.id, "variavel", e.vetor.span);
        expr(e.posicao);
        break;
    }
  };

  const comando = (c: Comando) => {
    add(c.id, c.tipo, c.span);
    switch (c.tipo) {
      case "escreva":
        c.itens.forEach((it) => expr(it.expr));
        break;
      case "leia":
        expr(c.alvo);
        break;
      case "atribuicao":
        expr(c.alvo);
        expr(c.valor);
        break;
      case "se":
        expr(c.condicao);
        c.entao.forEach(comando);
        c.senao?.forEach(comando);
        break;
      case "enquanto":
        expr(c.condicao);
        c.corpo.forEach(comando);
        break;
      case "para":
        expr(c.variavel);
        expr(c.de);
        expr(c.ate);
        c.corpo.forEach(comando);
        break;
      case "retorno":
        expr(c.valor);
        break;
      case "chamadaComando":
        expr(c.chamada);
        break;
    }
  };

  const e = programa.estrutura;
  add("prog:cabecalho", "cabecalho", e.cabecalho);
  if (e.var) add("prog:var", "secao_var", e.var);
  add("prog:inicio", "bloco_principal", e.inicio, e.fim);
  programa.variaveis.forEach((d) => add(d.id, "declaracao", d.span));
  for (const f of programa.funcoes) {
    add(f.id, f.retorno ? "funcao" : "procedimento", f.span);
    add(`${f.id}:assinatura`, "assinatura", f.estrutura.assinatura);
    if (f.estrutura.var) add(`${f.id}:var`, "secao_var", f.estrutura.var);
    add(`${f.id}:inicio`, "bloco_funcao", f.estrutura.inicio);
    f.parametros.forEach((p) => add(p.id, "parametro", p.span));
    f.variaveis.forEach((d) => add(d.id, "declaracao", d.span));
    f.corpo.forEach(comando);
  }
  programa.corpo.forEach(comando);
  return { mapa, tipos };
}
