#!/usr/bin/env node
// Spike de equivalência (sprint.md, tarefa 0.5).
//
// Para cada programa em spike/programas/<id>/ e cada entrada em entradas/*.txt:
//   compila e executa main.py, Main.java, main.c, main.cpp e main.php com os runtimes reais
//   e compara a saída (normalizando \r\n) com esperado/<entrada>.txt.
// Linhas listadas em meta.json → divergenciasEsperadas são excluídas da comparação e relatadas
// à parte com o valor de cada linguagem.
//
// Uso:
//   node spike/run.mjs                 roda o que estiver instalado; pula linguagens ausentes
//   node spike/run.mjs --estrito       falha se faltar alguma linguagem (usado no CI/Docker)
//   node spike/run.mjs --markdown      imprime o relatório em Markdown
//   node spike/run.mjs --so p3-divisoes --linguagens python,java

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const PROGRAMAS = join(AQUI, "programas");
const WINDOWS = process.platform === "win32";
const TIMEOUT_MS = 15000;

const args = process.argv.slice(2);
const opcao = (nome) => {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : undefined;
};
const ESTRITO = args.includes("--estrito");
const MARKDOWN = args.includes("--markdown");
const SO = opcao("--so");
const FILTRO_LINGUAGENS = opcao("--linguagens")?.split(",");

const PY = process.env.PYTHON ?? (WINDOWS ? "python" : "python3");
const EXE = WINDOWS ? ".exe" : "";

/** @type {Record<string, {nome: string, arquivo: string, versao: string[], build: string[][], run: string[]}>} */
const LINGUAGENS = {
  python: {
    nome: "Python",
    arquivo: "main.py",
    versao: [PY, "--version"],
    build: [[PY, "-m", "py_compile", "main.py"]],
    run: [PY, "-I", "main.py"],
  },
  java: {
    nome: "Java",
    arquivo: "Main.java",
    versao: ["javac", "-version"],
    build: [["javac", "-Xlint:all", "-Werror", "-d", "out", "Main.java"]],
    // Locale pt-BR de propósito: prova que a formatação de real não depende do locale.
    run: ["java", "-Duser.language=pt", "-Duser.country=BR", "-cp", "out", "Main"],
  },
  c: {
    nome: "C",
    arquivo: "main.c",
    versao: ["gcc", "--version"],
    build: [["gcc", "-std=c11", "-O2", "-Wall", "-Wextra", "-Werror", "-o", "main" + EXE, "main.c", "-lm"]],
    run: ["./main" + EXE],
  },
  cpp: {
    nome: "C++",
    arquivo: "main.cpp",
    versao: ["g++", "--version"],
    build: [["g++", "-std=c++17", "-O2", "-Wall", "-Wextra", "-Werror", "-o", "main" + EXE, "main.cpp"]],
    run: ["./main" + EXE],
  },
  php: {
    nome: "PHP",
    arquivo: "main.php",
    versao: ["php", "--version"],
    build: [["php", "-l", "main.php"]],
    run: ["php", "main.php"],
  },
};

function executar(cmd, cwd, entrada) {
  const [bin, ...resto] = cmd;
  const binario = bin.startsWith("./") ? join(cwd, bin.slice(2)) : bin;
  const r = spawnSync(binario, resto, {
    cwd,
    input: entrada,
    encoding: "utf8",
    timeout: TIMEOUT_MS,
    windowsHide: true,
  });
  return {
    ok: !r.error && r.status === 0,
    status: r.status,
    stdout: (r.stdout ?? "").replace(/\r\n/g, "\n"),
    stderr: (r.stderr ?? "") + (r.error ? String(r.error) : ""),
  };
}

function versaoDe(ling) {
  const r = executar(ling.versao, AQUI, "");
  if (!r.ok) return null;
  return (r.stdout + r.stderr).split("\n").find((l) => l.trim())?.trim() ?? "?";
}

const normalizar = (s) => s.replace(/\r\n/g, "\n");
const semLinhas = (texto, prefixos) =>
  texto
    .split("\n")
    .filter((l) => !prefixos.some((p) => l.startsWith(p)))
    .join("\n");

function primeiraDiferenca(esperado, obtido) {
  const a = esperado.split("\n");
  const b = obtido.split("\n");
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      return `linha ${i + 1}: esperado ${JSON.stringify(a[i] ?? "<fim>")}, obtido ${JSON.stringify(b[i] ?? "<fim>")}`;
    }
  }
  return "";
}

// 1. Linguagens disponíveis
const ativas = [];
const versoes = {};
for (const [id, ling] of Object.entries(LINGUAGENS)) {
  if (FILTRO_LINGUAGENS && !FILTRO_LINGUAGENS.includes(id)) continue;
  const v = versaoDe(ling);
  if (v) {
    ativas.push(id);
    versoes[id] = v;
  } else if (ESTRITO) {
    console.error(`ERRO: ${ling.nome} não encontrado e --estrito está ativo.`);
    process.exit(2);
  } else {
    versoes[id] = "não instalado (pulado)";
  }
}

// 2. Programas
const programas = readdirSync(PROGRAMAS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && (!SO || d.name === SO))
  .map((d) => d.name)
  .sort();

let falhas = 0;
const linhasTabela = [];
const divergencias = [];
const problemas = [];

for (const id of programas) {
  const dir = join(PROGRAMAS, id);
  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"));
  const esperadas = meta.divergenciasEsperadas ?? [];
  const prefixos = esperadas.map((d) => d.linhaComeca);
  const entradas = readdirSync(join(dir, "entradas")).filter((f) => f.endsWith(".txt")).sort();

  // Compila uma vez por linguagem
  const builds = {};
  for (const lid of ativas) {
    const ling = LINGUAGENS[lid];
    const trabalho = mkdtempSync(join(tmpdir(), `educai-${id}-${lid}-`));
    copyFileSync(join(dir, ling.arquivo), join(trabalho, ling.arquivo));
    let erro = null;
    for (const cmd of ling.build) {
      const r = executar(cmd, trabalho, "");
      if (!r.ok) {
        erro = (r.stdout + r.stderr).trim();
        break;
      }
    }
    builds[lid] = { trabalho, erro };
  }

  for (const entrada of entradas) {
    const textoEntrada = normalizar(readFileSync(join(dir, "entradas", entrada), "utf8"));
    const caminhoEsperado = join(dir, "esperado", entrada);
    if (!existsSync(caminhoEsperado)) {
      problemas.push(`${id}/${entrada}: falta esperado/${entrada}`);
      falhas++;
      continue;
    }
    const esperado = normalizar(readFileSync(caminhoEsperado, "utf8"));
    const celulas = {};
    const saidas = {};

    for (const lid of ativas) {
      const { trabalho, erro } = builds[lid];
      if (erro) {
        celulas[lid] = "❌ compilação";
        problemas.push(`${id} [${LINGUAGENS[lid].nome}] erro de compilação:\n${erro}`);
        falhas++;
        continue;
      }
      const r = executar(LINGUAGENS[lid].run, trabalho, textoEntrada);
      saidas[lid] = r.stdout;
      if (!r.ok) {
        celulas[lid] = "❌ execução";
        problemas.push(`${id}/${entrada} [${LINGUAGENS[lid].nome}] status ${r.status}:\n${r.stderr.trim()}`);
        falhas++;
        continue;
      }
      const a = semLinhas(esperado, prefixos);
      const b = semLinhas(r.stdout, prefixos);
      if (a === b) {
        celulas[lid] = "✅";
      } else {
        celulas[lid] = "❌ saída";
        problemas.push(`${id}/${entrada} [${LINGUAGENS[lid].nome}] ${primeiraDiferenca(a, b)}`);
        falhas++;
      }
    }

    // Divergências esperadas: mostra o valor real de cada linguagem
    for (const d of esperadas) {
      const linhaDe = (texto) => texto.split("\n").find((l) => l.startsWith(d.linhaComeca));
      const valores = {};
      for (const lid of ativas) {
        if (saidas[lid] !== undefined) valores[lid] = linhaDe(saidas[lid]) ?? "<ausente>";
      }
      if (Object.keys(valores).length === 0 || Object.values(valores).every((v) => v === "<ausente>")) continue;
      const distintos = new Set(Object.values(valores)).size;
      divergencias.push({
        local: `${id}/${entrada}`,
        linha: d.linhaComeca,
        motivo: d.motivo,
        esperadoSpec: linhaDe(esperado) ?? "",
        valores,
        confirmou: distintos > 1,
      });
    }

    linhasTabela.push({ local: `${id}/${entrada}`, celulas });
  }

  for (const lid of ativas) rmSync(builds[lid].trabalho, { recursive: true, force: true });
}

// 3. Relatório
const out = [];
const nomes = ativas.map((l) => LINGUAGENS[l].nome);
out.push(MARKDOWN ? "## Spike de equivalência (0.5)\n" : "=== Spike de equivalência (0.5) ===\n");
out.push(MARKDOWN ? "### Runtimes\n" : "Runtimes:");
for (const [lid, v] of Object.entries(versoes)) out.push(`- ${LINGUAGENS[lid].nome}: ${v}`);
out.push("");
out.push(MARKDOWN ? "### Resultado por programa e entrada\n" : "Resultado:");
out.push(`| Programa/entrada | ${nomes.join(" | ")} |`);
out.push(`|---|${nomes.map(() => "---").join("|")}|`);
for (const l of linhasTabela) out.push(`| ${l.local} | ${ativas.map((a) => l.celulas[a] ?? "—").join(" | ")} |`);
out.push("");
if (divergencias.length) {
  out.push(MARKDOWN ? "### Divergências esperadas (ignoradas na comparação)\n" : "Divergências esperadas:");
  for (const d of divergencias) {
    out.push(`- **${d.local}** — \`${d.linha}\` ${d.confirmou ? "→ DIVERGIU (confirmada)" : "→ todas iguais (não confirmada)"}`);
    out.push(`  - motivo: ${d.motivo}`);
    out.push(`  - spec/esperado: \`${d.esperadoSpec}\``);
    for (const [lid, v] of Object.entries(d.valores)) out.push(`  - ${LINGUAGENS[lid].nome}: \`${v}\``);
  }
  out.push("");
}
if (problemas.length) {
  out.push(MARKDOWN ? "### Problemas\n" : "Problemas:");
  for (const p of problemas) out.push(MARKDOWN ? "```\n" + p + "\n```" : `- ${p}`);
  out.push("");
}
out.push(falhas === 0 ? "RESULTADO: OK — nenhuma divergência inesperada." : `RESULTADO: ${falhas} falha(s).`);
console.log(out.join("\n"));
process.exit(falhas === 0 ? 0 : 1);
