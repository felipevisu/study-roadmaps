---
roadmap: rag
week: 9
title: "Metadados, filtros e roteamento"
phase: "Melhorando a recuperação (semanas 6–10)"
status: todo
pocs: []
---

**Construir:** extração de metadados na ingestão (data, autor, seção, tipo de documento, versão), filtragem na busca e um **roteador** que decide entre fontes ou decide se precisa buscar. Implemente pre-filtering e post-filtering e compare.

**Medir:** crie um subconjunto de queries com restrição temporal ou de fonte ("na versão 2.0...", "segundo a política de RH..."). Meça acurácia do roteador e o efeito do filtro no recall.

**Entregável:** roteador funcionando + análise do trade-off pre vs post-filtering (post-filtering pode esvaziar seu top-k; pre-filtering pode degradar o índice ANN).

**Armadilha:** ignorar o caso "nenhuma busca é necessária". Saudações e perguntas meta não deveriam disparar retrieval — e isso é mensurável.

## Diário

_Sem anotações ainda._
