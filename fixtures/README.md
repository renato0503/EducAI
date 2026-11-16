# Fixtures da Fase 0 (tarefa 0.2)

Cinco programas didáticos escritos à mão em PT-BR e nas 5 linguagens, com o **mapa nó → ranges**
embutido por marcadores. Alimentam o protótipo (0.1) e, a partir da Sprint 1, servem de corpus
e de referência para o parser e os geradores.

| Ordem | Programa | Conceitos |
|---|---|---|
| 1 | `media-notas` | variáveis, `leia`, conta com parênteses, `se`/`senao`, real com 2 casas |
| 2 | `tabuada` | `para`, conta dentro do `escreva` |
| 3 | `contagem-regressiva` | `enquanto`, atualização da variável |
| 4 | `maior-do-vetor` | vetor, índice, dois laços, `se` sem `senao` |
| 5 | `fatorial-funcao` | função com parâmetro e retorno, protótipo em C |

## Como editar

1. Edite os arquivos **marcados** em `fixtures/<programa>/` (`programa.por`, `main.py`,
   `Main.java`, `main.c`, `main.cpp`, `main.php`), as `entradas/` e o `esperado/`.
2. Rode `pnpm fixtures`. Isso gera `fixture.json`, `indice.json` e as versões limpas em
   `spike/programas/fx-<programa>/` (não edite essas).
3. Rode o spike (`docker run --rm educai-runtimes` depois de reconstruir a imagem) para conferir a
   saída nas 5 linguagens.

O CI roda `pnpm fixtures --verificar`, que falha se algo gerado estiver desatualizado ou se algum
caractere de qualquer código ficar fora de um nó.

## Marcadores

```
⟦id⟧ ... ⟦/⟧         trecho do nó "id" (pode aninhar; o mesmo id pode repetir = vários ranges)
⟦id|tipo⟧ ... ⟦/⟧    só no PT-BR: declara o tipo do nó
```

Colunas 1-indexadas em unidades UTF-16 (como o Monaco), fim exclusivo. Implementação e testes em
`packages/compiler/src/fixtures/marcadores.ts`.

## Convenção de ids (vale também para o parser da Sprint 1)

| Id | Significado |
|---|---|
| `prog:cabecalho`, `prog:var` | `algoritmo "..."` e a palavra `var` — sem equivalente nas linguagens |
| `prog:inicio` | `inicio` + `fimalgoritmo` ↔ `main` em C/C++/Java (2 ranges); sem equivalente em Python/PHP |
| `var/N` | N-ésima linha de declaração do programa |
| `main/N` | N-ésimo comando do bloco principal |
| `main/N/cond`, `/alvo`, `/valor`, `/var`, `/de`, `/ate`, `/esq` | partes do comando |
| `main/N/corpo/M`, `/entao/M`, `/senao/M` | comandos aninhados |
| `main/N/K` | K-ésimo item de um `escreva` (literal, variável, conta) |
| `fN`, `fN:assinatura`, `fN/param/K`, `fN/var/K`, `fN/M` | N-ésima função e suas partes |
| `syn:<ling>.<nome>` | nó sintético: código que só existe naquela linguagem |

Nós sintéticos usados: `syn:c.include_stdio`, `syn:c.buffer_linha`, `syn:c.return0`,
`syn:cpp.includes`, `syn:cpp.buffer_linha`, `syn:cpp.return0`, `syn:java.imports`,
`syn:java.class_main`, `syn:java.scanner`, `syn:php.open_tag`, `syn:python.conversao_input`.

Exemplos do que o mapa mostra:
- `escreval("Media: ", media)` → em C, o `media` aparece em **dois** lugares: `%.2f` e o argumento.
- `para i de 1 ate 10` → em Python, o `10` vira `11` no `range` (o `ate` é inclusivo).
- `funcao fatorial(...)` → em C, a assinatura aparece no **protótipo** e na definição.
- `n1, n2, n3, n4, media: real` → em Python, 5 linhas `n1 = 0.0` (Python não declara tipo).

## Formato de `fixture.json`

```jsonc
{
  "id": "media-notas", "titulo": "...", "descricao": "...", "ordem": 1,
  "ptbr":       { "codigo": "...", "mapa": { "main/0": [[5, 4, 5, 37]], ... } },
  "linguagens": { "python": { "codigo": "...", "mapa": { ... } }, "java": ..., "c": ..., "cpp": ..., "php": ... },
  "nos":        { "main/0": { "tipo": "escreva", "rotulo": "escreval(\"Digite as 4 notas:\")" },
                  "syn:c.return0": { "tipo": "sintetico", "linguagem": "c", "rotulo": "return 0;" } },
  "semEquivalente": { "python": ["prog:cabecalho", "prog:var", "prog:inicio"], ... }
}
```

Os cartões de explicação ainda não existem: são a próxima parte, junto com o protótipo (0.1).
