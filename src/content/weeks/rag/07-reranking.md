---
roadmap: rag
week: 7
title: "Reranking"
phase: "Melhorando a recuperação (semanas 6–10)"
status: todo
pocs: []
---

**Construir:** segundo estágio com cross-encoder. Recupere top-50, reordene para top-5. Teste ao menos um cross-encoder open source (`bge-reranker`, `mxbai-rerank`) e um LLM como reranker.

**Medir:** ganho em `nDCG@5` **versus** custo em latência. Varra o `k` do primeiro estágio (20/50/100) — a partir de certo ponto o ganho satura e você só paga latência.

**Entregável:** curva ganho×latência e a recomendação do ponto de operação.

**Armadilha:** esquecer que o reranker não conserta recall. Se o documento certo não estava no top-50, nenhum reranker vai fazer mágica. Meça o **recall do primeiro estágio** como teto teórico.

## Diário

_Sem anotações ainda._
