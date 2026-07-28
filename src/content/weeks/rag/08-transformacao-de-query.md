---
roadmap: rag
week: 8
title: "Transformação de query"
phase: "Melhorando a recuperação (semanas 6–10)"
status: todo
pocs: []
---

**Construir:** três técnicas, avaliadas separadamente: (a) reescrita da query pelo LLM, (b) multi-query (gerar 3–5 variações e unir os resultados), (c) HyDE (gerar uma resposta hipotética e buscar por ela).

**Medir:** cada técnica isolada e depois combinada. Inclua **custo e latência adicionais** na tabela — essas técnicas multiplicam chamadas de LLM e de busca.

**Entregável:** análise de quando cada técnica compensa. Sugestão forte: segmente o dataset por tipo de pergunta (factual curta, conceitual, comparativa) e veja o ganho por segmento.

**Armadilha:** aplicar HyDE em tudo. Em pergunta factual curta ele frequentemente **piora**, porque a resposta hipotética alucina detalhes que poluem a busca.

## Diário

_Sem anotações ainda._
