---
roadmap: rag
week: 6
title: "Busca híbrida e fusão de rankings"
phase: "Melhorando a recuperação (semanas 6–10)"
status: todo
pocs: []
---

**Construir:** combinação de BM25 + denso. Implemente duas estratégias de fusão: normalização de score com peso `alpha` e **Reciprocal Rank Fusion (RRF)**.

**Medir:** varra o `alpha` de 0 a 1 em passos de 0.1 e plote. Compare com RRF (que não tem hiperparâmetro de peso — essa é a graça dele).

**Entregável:** curva de `alpha` + decisão entre fusão por score ou por rank, com justificativa.

**Armadilha:** normalizar scores de forma ingênua. Similaridade de cosseno e score BM25 vivem em escalas totalmente diferentes; min-max por query é o mínimo aceitável. RRF existe justamente para evitar esse problema.

## Diário

_Sem anotações ainda._
