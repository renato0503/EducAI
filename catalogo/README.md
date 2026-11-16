# Catálogo de explicações

O conteúdo pedagógico do EducAI: o que aparece no painel quando o aluno clica num elemento.
Funciona **sem IA** (context.md §7). Versionado aqui e revisado em PR, como código.

| Arquivo | Conteúdo |
|---|---|
| `tipos.json` | Um cartão por **tipo de elemento** do PT-BR (`se`, `para`, `leia`, `declaracao`…) |
| `sinteticos.json` | Um cartão por **nó sintético** (código que só existe numa linguagem: `#include`, `class Main`…) |
| `fixtures/<programa>/notas.json` | Notas **específicas de um programa**, para o que o cartão genérico não cobre |

## Formato

```jsonc
// tipos.json
"para": {
  "nome": "Repetição com contador (para)",       // título do cartão
  "basico": "...",                               // sempre visível
  "aprofundar": "...",                           // visível com "Aprofundar"
  "linguagens": {
    "python": { "como": "...", "pegadinha": "..." }   // "como": sempre; "pegadinha": só com "Aprofundar"
  },
  "semEquivalente": { "python": "..." }          // quando o elemento não aparece no código daquela linguagem
}

// sinteticos.json
"syn:java.scanner": { "nome": "...", "basico": "...", "aprofundar": "..." }

// fixtures/<programa>/notas.json
"main/6/1": { "geral": "...", "java": "..." }    // a nota de uma linguagem substitui o "como" genérico
```

Trechos entre crases (`` `assim` ``) aparecem como código.

## Regras de escrita

1. **Português simples, frases curtas**, para quem está no primeiro semestre. Sem jargão sem
   explicação.
2. **"básico" responde "o que é".** No máximo 2 frases.
3. **"como" responde "como fica nesta linguagem"**, citando o código que o aluno está vendo.
4. **"pegadinha" é um erro real** que iniciantes cometem naquela linguagem, não curiosidade.
5. **Nada de afirmação que não foi conferida.** Se envolve comportamento de linguagem, deve haver
   um programa no spike que o demonstre (`spike/`).

## Checklist de revisão (Renato)

- [ ] O texto está correto para cada linguagem?
- [ ] Um aluno de primeiro semestre entende sem ajuda?
- [ ] O "como" bate com o código que aparece nas fixtures?
- [ ] As pegadinhas são as mais úteis para iniciantes?

Os testes de `apps/web/src/catalogo.test.tsx` garantem que todo elemento das fixtures tem cartão,
e que toda linguagem tem um "como" (quando o elemento existe nela) ou uma explicação de por que não
existe. Eles **não** verificam se o texto está certo: isso é a revisão humana.
