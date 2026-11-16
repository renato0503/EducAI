/**
 * Gera as fixtures da Fase 0 a partir dos arquivos marcados em fixtures/<programa>/.
 *
 *   pnpm fixtures              gera fixtures/<p>/fixture.json e spike/programas/fx-<p>/
 *   pnpm fixtures --verificar  falha se algo gerado estiver desatualizado (usado no CI)
 *
 * Entrada por programa (todos com marcadores ⟦id⟧…⟦/⟧, ver src/fixtures/marcadores.ts):
 *   meta.json                         { "titulo", "descricao", "ordem" }
 *   programa.por                      PT-BR; cada nó declara o tipo: ⟦main/0|escreva⟧
 *   main.py Main.java main.c main.cpp main.php
 *   entradas/*.txt, esperado/*.txt    para o spike de equivalência
 *   notas.json (opcional)             { "<nó>": { "geral"?, "python"?, "java"?, ... } } — explicações
 *                                     específicas deste programa, que complementam o catálogo
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  caracteresDescobertos,
  extrairMarcadores,
  textoDoRange,
  type ResultadoMarcadores,
} from "../src/fixtures/marcadores.ts";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const FIXTURES = join(RAIZ, "fixtures");
const SPIKE = join(RAIZ, "spike", "programas");
const VERIFICAR = process.argv.includes("--verificar");

const ARQUIVOS: Record<string, string> = {
  python: "main.py",
  java: "Main.java",
  c: "main.c",
  cpp: "main.cpp",
  php: "main.php",
};

interface NoFixture {
  tipo: string;
  rotulo: string;
  linguagem?: string;
}

const erros: string[] = [];
const desatualizados: string[] = [];

function gravar(caminho: string, conteudo: string) {
  const atual = existsSync(caminho) ? readFileSync(caminho, "utf8") : null;
  if (atual === conteudo) return;
  if (VERIFICAR) {
    desatualizados.push(caminho.slice(RAIZ.length + 1));
    return;
  }
  mkdirSync(dirname(caminho), { recursive: true });
  writeFileSync(caminho, conteudo);
}

function rotulo(r: ResultadoMarcadores, id: string): string {
  const range = r.mapa[id]?.[0];
  if (!range) return id;
  const texto = textoDoRange(r.codigo, range).split("\n")[0]!.trim();
  return texto.length > 60 ? texto.slice(0, 57) + "..." : texto;
}

function verificarCobertura(nome: string, r: ResultadoMarcadores) {
  const faltando = caracteresDescobertos(r.codigo, r.mapa);
  if (faltando.length > 0) {
    const exemplos = faltando
      .slice(0, 5)
      .map((f) => `${f.linha}:${f.col} "${f.caractere}"`)
      .join(", ");
    erros.push(`${nome}: ${faltando.length} caractere(s) fora de qualquer nó — ${exemplos}`);
  }
}

const programas = existsSync(FIXTURES)
  ? readdirSync(FIXTURES, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
  : [];

const indice: { id: string; titulo: string; ordem: number }[] = [];

for (const id of programas) {
  const dir = join(FIXTURES, id);
  const ler = (arq: string) => readFileSync(join(dir, arq), "utf8");
  const meta = JSON.parse(ler("meta.json")) as { titulo: string; descricao: string; ordem: number };

  const ptbr = extrairMarcadores(ler("programa.por"));
  verificarCobertura(`${id}/programa.por`, ptbr);

  const nos: Record<string, NoFixture> = {};
  for (const noId of Object.keys(ptbr.mapa)) {
    const tipo = ptbr.tipos[noId];
    if (!tipo) erros.push(`${id}/programa.por: nó "${noId}" sem tipo (use ⟦${noId}|tipo⟧)`);
    nos[noId] = { tipo: tipo ?? "?", rotulo: rotulo(ptbr, noId) };
  }

  const linguagens: Record<string, { codigo: string; mapa: ResultadoMarcadores["mapa"] }> = {};
  const semEquivalente: Record<string, string[]> = {};

  for (const [ling, arquivo] of Object.entries(ARQUIVOS)) {
    const r = extrairMarcadores(ler(arquivo));
    verificarCobertura(`${id}/${arquivo}`, r);
    for (const noId of Object.keys(r.mapa)) {
      if (noId.startsWith("syn:")) {
        if (!noId.startsWith(`syn:${ling}.`)) {
          erros.push(`${id}/${arquivo}: nó sintético "${noId}" deveria começar com "syn:${ling}."`);
        }
        nos[noId] = { tipo: "sintetico", linguagem: ling, rotulo: rotulo(r, noId) };
      } else if (!ptbr.mapa[noId]) {
        erros.push(`${id}/${arquivo}: nó "${noId}" não existe no PT-BR`);
      }
    }
    semEquivalente[ling] = Object.keys(ptbr.mapa).filter((n) => !r.mapa[n]);
    linguagens[ling] = { codigo: r.codigo, mapa: r.mapa };

    // Versão limpa para o spike de equivalência
    gravar(join(SPIKE, `fx-${id}`, arquivo), r.codigo);
  }

  // Notas específicas do programa
  let notas: Record<string, Record<string, string>> = {};
  if (existsSync(join(dir, "notas.json"))) {
    notas = JSON.parse(ler("notas.json")) as typeof notas;
    for (const [noId, porChave] of Object.entries(notas)) {
      if (!nos[noId]) erros.push(`${id}/notas.json: nó "${noId}" não existe`);
      for (const chave of Object.keys(porChave)) {
        if (chave !== "geral" && !(chave in ARQUIVOS)) {
          erros.push(`${id}/notas.json: chave "${chave}" inválida em "${noId}"`);
        }
      }
    }
  }

  const fixture = {
    id,
    titulo: meta.titulo,
    descricao: meta.descricao,
    ordem: meta.ordem,
    ptbr: { codigo: ptbr.codigo, mapa: ptbr.mapa },
    linguagens,
    nos,
    semEquivalente,
    notas,
  };
  gravar(join(dir, "fixture.json"), JSON.stringify(fixture, null, 2) + "\n");
  indice.push({ id, titulo: meta.titulo, ordem: meta.ordem });

  // Spike: programa limpo, entradas, saídas esperadas e meta
  const destino = join(SPIKE, `fx-${id}`);
  gravar(join(destino, "programa.por"), ptbr.codigo);
  gravar(
    join(destino, "meta.json"),
    JSON.stringify(
      {
        titulo: `Fixture didática: ${meta.titulo}`,
        objetivo: "Gerado por `pnpm fixtures` a partir de fixtures/" + id + "; não editar aqui.",
        divergenciasEsperadas: [],
      },
      null,
      2,
    ) + "\n",
  );
  for (const pasta of ["entradas", "esperado"]) {
    for (const arq of readdirSync(join(dir, pasta))) {
      gravar(join(destino, pasta, arq), readFileSync(join(dir, pasta, arq), "utf8"));
    }
  }
}

indice.sort((a, b) => a.ordem - b.ordem);
gravar(join(FIXTURES, "indice.json"), JSON.stringify(indice, null, 2) + "\n");

// Remove do spike fixtures que não existem mais
if (existsSync(SPIKE) && !VERIFICAR) {
  for (const d of readdirSync(SPIKE)) {
    if (d.startsWith("fx-") && !programas.includes(d.slice(3))) {
      rmSync(join(SPIKE, d), { recursive: true });
    }
  }
}

if (erros.length > 0) {
  console.error("Erros nas fixtures:\n- " + erros.join("\n- "));
  process.exit(1);
}
if (desatualizados.length > 0) {
  console.error("Arquivos gerados desatualizados (rode `pnpm fixtures`):\n- " + desatualizados.join("\n- "));
  process.exit(1);
}
console.log(`${programas.length} fixture(s) ${VERIFICAR ? "verificadas" : "geradas"}: ${programas.join(", ")}`);
