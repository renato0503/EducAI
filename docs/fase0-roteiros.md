# Fase 0 — Roteiros de validação (tarefas 0.3 e 0.4)

> Objetivo: decidir no G0 (06/12/2026) se a tese se sustenta, **antes** de construir o
> compilador. Ver sprint.md §4 e context.md §2.
>
> Pergunta central: **depois de ver um programa replicado e explicado em várias linguagens, o
> aluno consegue ler e prever código numa linguagem que não estudou?**

---

## 1. Entrevista com professores (tarefa 0.4)

**Quem:** 3–5 professores de lógica, algoritmos ou programação I/II.
**Duração:** 30–40 min, presencial ou vídeo. **Gravar só com autorização.**

### 1.1 Convite (modelo)

> Olá, professor(a) [nome]. Estou desenvolvendo, como projeto, uma ferramenta para ensino de
> algoritmos: o aluno escreve em português estruturado (estilo VisualG) e vê o mesmo programa em
> Python, Java, C, C++ e PHP, com cada elemento explicado. Antes de construir, quero ouvir quem
> ensina. Teria 30 minutos entre [datas] para uma conversa? Posso mostrar um protótipo.

### 1.2 Roteiro

**Contexto (10 min)**
1. Quais disciplinas e turmas você dá? Quantos alunos, de que curso e semestre?
2. Que ferramenta usa para algoritmos hoje (VisualG, Portugol Studio, outra)? Por quê?
3. Depois do pseudocódigo, para qual linguagem os alunos vão? Em que semestre?
4. Onde os alunos mais travam na passagem do pseudocódigo para a linguagem real?

**IA e cola (5 min)**
5. Como os alunos usam IA hoje nas suas disciplinas? Isso é um problema?
6. Se uma ferramenta tiver um copiloto que monta o programa passo a passo, o que você precisaria
   para aceitar o uso em sala? (Desligar? Ver o que o aluno pediu? Só em certas atividades?)

**Protótipo (10 min)** — mostrar o protótipo sem explicar muito; deixar o professor explorar.
7. O que você entendeu que a ferramenta faz?
8. Ver 5 linguagens ao mesmo tempo ajuda ou atrapalha um aluno de primeiro semestre?
   Começaria com quantas?
9. As explicações estão no nível certo? O que falta?

**Decisões que dependem dele (5 min)**
10. Seus alunos usam vetor começando em 0 ou em 1 (`vetor[1..10]`)? Mudar para 0 seria um
    problema? (decisão D2)
11. A sintaxe precisa ser idêntica à do VisualG, ou parecida basta?

**Piloto (5 min)**
12. Você usaria com uma turma em **maio/2027**, em 2 aulas com uma semana de intervalo?
13. Podemos dividir a turma em dois grupos (um vê 5 linguagens, outro vê PT-BR + Python) para
    comparar? Há algum impedimento da instituição (termo de consentimento, comitê de ética)?
14. Quem precisa autorizar na instituição?

**Fechamento:** pedir confirmação **por escrito** (e-mail ou mensagem) se topar o piloto.

### 1.3 Registro (preencher logo depois)

```markdown
### Professor [iniciais] — [data]
- Instituição / curso / disciplina:
- Ferramenta atual:
- Linguagem seguinte:
- Onde os alunos travam:
- Posição sobre IA/cola:
- Reação ao protótipo (frases literais entre aspas):
- 5 abas: ajuda / atrapalha / começaria com N
- Índice de vetor: 0 / 1 / tanto faz
- Sintaxe VisualG: obrigatória / parecida basta
- Piloto: sim / talvez / não — data:
- Pendências / quem autoriza:
```

---

## 2. Think-aloud com alunos (tarefa 0.3)

**Quem:** 6–10 alunos de Algoritmos I ou equivalente, que **não** estudaram Java nem C.
**Duração:** 30 min por aluno, individual.
**Grupos:** sortear metade para o **protótipo** e metade para o **baseline ChatGPT**.

### 2.1 Antes de começar

- Explicar que quem está sendo testado é a ferramenta, não o aluno.
- Pedir para **pensar em voz alta** o tempo todo.
- Pedir autorização para anotar (e gravar a tela, se for o caso). Sem nome real no registro: usar
  A1, A2…
- Se o aluno tiver menos de 18 anos, seguir a regra da instituição para consentimento.

### 2.2 Roteiro — grupo protótipo (30 min)

1. **Aquecimento (3 min):** "Você já programou em alguma linguagem? Qual?"
2. **Exploração livre (7 min):** abrir o programa `media-notas`. "Explore como quiser. O que você
   acha que essa tela mostra?" Não ajudar; anotar onde clica e o que diz.
3. **Tarefa guiada (10 min):**
   - "Clique no `se` do português. O que aconteceu nas outras abas?"
   - "Em C, o que você acha que é o `%d`?" (deixar consultar a ferramenta)
   - "Use o *construir passo a passo* no programa `tabuada` e me conte o que vê."
4. **Tarefa de transferência (7 min), sem a ferramenta:** mostrar um trecho **em Java** (ou C) que o
   aluno nunca viu e pedir:
   - "Qual é a saída deste programa?"
   - "Qual linha corresponde a `para i de 1 ate 3` do português?"

   Trecho sugerido (Java):

   ```java
   int soma = 0;
   for (int i = 1; i <= 3; i++) {
       soma = soma + i * 2;
       System.out.println("parcial: " + soma);
   }
   if (soma > 10) {
       System.out.println("grande");
   } else {
       System.out.println("pequeno");
   }
   ```

   Saída correta: `parcial: 2`, `parcial: 6`, `parcial: 12`, `grande`.
5. **Percepção (3 min):**
   - "De 1 a 5, quanto a tela com várias linguagens ajudou? E quanto confundiu?"
   - "O que você mudaria?"

### 2.3 Roteiro — grupo baseline ChatGPT (30 min)

Mesmo aquecimento e mesma tarefa de transferência. A diferença está nas etapas 2–3: o aluno recebe o
programa `media-notas` em português e usa o ChatGPT com o prompt:

> "Traduza este programa em Portugol para Python, Java, C, C++ e PHP e explique cada linha."

Dar o mesmo tempo (17 min) para explorar e fazer perguntas ao ChatGPT.

### 2.4 Registro (preencher logo depois)

```markdown
### A[n] — [data] — grupo: protótipo | chatgpt
- Experiência prévia:
- Exploração: o que entendeu sozinho? (frases literais)
- Clicou nas abas de outras linguagens? quantas vezes? quais?
- Sinais de sobrecarga (pausas longas, "muita coisa", desistiu):
- Tarefa guiada: acertou/errou cada pergunta
- Transferência — saída: certa / parcial / errada
- Transferência — linha equivalente: certa / errada
- Notas 1–5: ajudou __ / confundiu __
- Sugestões:
```

### 2.5 Como decidir no G0

| Sinal | Critério |
|---|---|
| Positivo | ≥ 60% do grupo protótipo acerta a saída da transferência **e** o grupo protótipo não fica atrás do ChatGPT |
| Ajustar a forma | Acertam, mas há sobrecarga clara com 5 abas → modo foco como padrão |
| Repensar | Não clicam nas outras abas ou ficam atrás do ChatGPT |

Com 6–10 alunos, isso é **sinal qualitativo**, não estatística. O piloto de maio (com grupo de
comparação) é que mede de verdade.

Consolidar tudo em `docs/validacao-f0.md` com: tabela por aluno, tabela por professor, frases
marcantes, decisão do G0 e o que muda no plano.
