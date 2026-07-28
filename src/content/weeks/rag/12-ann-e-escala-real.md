---
roadmap: rag
week: 12
title: "ANN e escala real"
phase: "Agentes, robustez e escala (semanas 11–15)"
status: todo
pocs: []
---

**Construir:** migrar para um banco vetorial de verdade (Qdrant, Weaviate, pgvector ou FAISS puro). Infle o corpus para ≥1M de chunks (duplique com variações ou traga um dump público). Configure HNSW (`M`, `efConstruction`, `efSearch`) e IVF, e teste quantização escalar/binária.

**Medir:** a curva que importa: **recall do ANN versus busca exata**, contra latência e memória. Não é o recall do RAG — é quanto o índice aproximado está perdendo em relação ao brute force.

**Entregável:** gráfico recall×latência×memória e o ponto de operação escolhido.

**Armadilha:** medir latência sem warm-up, sem concorrência e com cache quente. Meça p95 sob carga, não uma query isolada no notebook.

## Diário

_Sem anotações ainda._
