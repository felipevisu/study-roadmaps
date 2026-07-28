---
roadmap: rag
week: 2
title: "Golden dataset e métricas de recuperação"
phase: "Fundamentos e a régua (semanas 1–5)"
status: todo
pocs: []
---

**Construir:** o harness de avaliação. Dataset de 50–100 pares `(pergunta, chunk_ids_relevantes)`. Anotação manual — é chato e é o investimento mais valioso das 20 semanas. Implemente **na mão**: `recall@k`, `precision@k`, `MRR`, `nDCG@k`, `hit rate`.

**Medir:** rode o baseline da semana 1 e registre a primeira linha do leaderboard.

**Entregável:** `eval/retrieval.py` que recebe um retriever e devolve o dict de métricas. Esse arquivo vai ser usado nas 18 semanas seguintes.

**Armadilha:** implementar nDCG errado (é comum). Valide contra um exemplo calculado à mão no papel.

**Conceitos:** por que recall importa mais que precision em RAG (o LLM tolera ruído, mas não consegue inventar o que não recebeu); diferença entre relevância binária e graduada.

## Diário

_Sem anotações ainda._
