# Catálogo de erros do compilador

> Fonte única dos códigos de erro que o aluno vê. Todo código novo, ou mudança de texto, entra
> aqui **no mesmo commit** que muda o código (decisão 015).
>
> Última atualização: 16/11/2026 (lexer e parser da Sprint 1).

## Convenções

| Prefixo | Fase | Onde | Estado |
|---|---|---|---|
| `L` | Léxica (caracteres, textos) | `packages/compiler/src/lexer.ts` | ✅ L001–L002 |
| `S` | Sintática (estrutura do programa) | `packages/compiler/src/parser.ts` | ✅ S001–S014 |
| `T` | Semântica (nomes, tipos, escopos) | análise semântica (S2/S3) | a criar |
| `E` | Execução (interpretador de referência, inclui pegadinhas) | interpretador (S4) | a criar |

Regras de escrita das mensagens:

- Português simples, sem jargão de compilador ("token", "EOF", "identificador" não aparecem).
- Dizer **o que era esperado** e **o que foi encontrado**, com o texto exato entre crases.
- Quando houver um erro típico de iniciante por trás, a mensagem explica o conceito
  (ex.: S013, `=` no lugar de `<-`).
- O código é estável; o texto pode melhorar sem mudar o código.
- Posição: linha e coluna 1-indexadas. O parser registra **no máximo um erro por comando** e
  continua no próximo (recuperação por comando: o comando quebrado vira um nó `erro` na AST e os
  outros continuam sendo gerados nas 5 linguagens).

`encontrei …` é preenchido assim: palavra reservada → `` `se` ``; nome → `` o nome `x` ``;
número → `` o número `3` ``; texto → `um texto`; fim do arquivo → `o fim do programa`.

## Léxicos

| Código | Quando | Mensagem | Exemplo |
|---|---|---|---|
| L001 | Caractere que não faz parte da linguagem | Caractere inesperado: `` `@` ``. | `x <- 1 @` |
| L002 | Texto sem a aspa de fechamento na mesma linha | Texto sem aspas de fechamento: todo texto precisa começar e terminar com " na mesma linha. | `escreval("oi)` |

Observações:
- `←` (seta do VisualG) é aceito como `<-`; não é erro.
- Palavras-chave aceitam maiúsculas e acentos (`Então` = `entao`). Nomes diferenciam
  maiúsculas (D9 pendente).

## Sintáticos

| Código | Quando | Mensagem (modelo) | Exemplo |
|---|---|---|---|
| S001 | Faltou uma palavra-chave obrigatória | Esperava `` `entao` `` depois da condição do `se`, mas encontrei … | `se x > 1` sem `entao` |
| S002 | Faltou um símbolo (`(`, `)`, `]`, `:`, `..`, `<-`) | Esperava `` `)` `` …, mas encontrei … | `escreval("a"` |
| S003 | Faltou um nome; se veio palavra reservada, explica | Esperava um nome …, mas encontrei `` `para` `` (`para` é uma palavra reservada e não pode ser nome). | `var para: inteiro` |
| S004 | Bloco aberto e não fechado | O `` `se` `` da linha 5 não foi fechado: esperava `` `fimse` ``, mas encontrei … | `se … entao` sem `fimse` |
| S005 | `algoritmo` sem o nome entre aspas | Depois de `algoritmo`, escreva o nome entre aspas: algoritmo "media". | `algoritmo media` |
| S006 | Texto depois de `fimalgoritmo` | Há texto depois de `fimalgoritmo`; ele será ignorado. | comando após o fim |
| S007 | Tipo inválido na declaração ou no vetor | Esperava um tipo (inteiro, real, caractere, logico ou vetor) …, mas encontrei … | `x: numero` |
| S008 | Limite de vetor que não é número inteiro | Esperava um número inteiro …, mas encontrei … | `vetor[0..n]` |
| S009 | Função que devolve vetor (fora do v1) | No v1, uma função não pode devolver um vetor. | `funcao f(): vetor[…]` |
| S010 | Fim de bloco sem bloco aberto | `` `fimpara` `` não fecha nenhum bloco aberto aqui. | `fimpara` solto |
| S011 | Algo que não pode começar um comando | … não pode começar um comando. / Esperava um comando, mas encontrei … | `) x <- 1` |
| S012 | `passo 0` no `para` | O `passo` não pode ser 0: o laço nunca terminaria. | `para i de 1 ate 5 passo 0 faca` |
| S013 | `=` usado como atribuição | Para guardar um valor use `<-` ("recebe"), não `=`. O `=` compara valores. | `x = 1` |
| S014 | Faltou um valor numa expressão | Esperava um valor, uma variável ou uma conta, mas encontrei … | `x <- ` |

Estrutura do programa: arquivo sem `algoritmo` devolve programa nulo com S001 apontando a palavra
que falta; sem `fimalgoritmo` vira S004 ("O `inicio` da linha N não foi fechado").

Limitação conhecida da recuperação: `se x > 1` sem `entao` gera S001 e, em seguida, um S010 para
o `fimse` (o `se` quebrado não abriu bloco). Melhorar na S1/S2: quando faltar `entao`/`faca`,
seguir lendo o bloco como se estivesse lá.

## A criar (planejado)

Semânticos (`T`), S2/S3: variável não declarada; declarada duas vezes; tipo incompatível na
atribuição ou na conta; condição que não é `logico`; `retorne` fora de função ou função sem
`retorne`; chamada com número ou tipo de argumentos errado; índice de vetor constante fora dos
limites; texto com acento ou caractere fora do ASCII (decisão 012); aviso de nomes que só diferem
em maiúsculas (D9).

Execução (`E`), S4 — as pegadinhas de `docs/semantica.md`: divisão por zero; overflow de 32 bits;
`div`/`mod` com negativo (aviso, não erro); índice fora dos limites; recursão acima de 500;
entrada com vírgula ou inválida no `leia`; uso da variável do `para` depois do laço; zero negativo
na formatação de real.

Testes: `packages/compiler/src/parser.test.ts` cobre L001, L002, S003, S004, S010, S013 e a
recuperação. Ao criar ou mudar um código, adicionar um teste com a mensagem.
