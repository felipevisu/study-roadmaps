---
roadmap: rag
week: 14
title: "Multi-hop e decomposição"
phase: "Agentes, robustez e escala (semanas 11–15)"
status: todo
pocs: []
---

**Construir:** perguntas que exigem combinar 2–3 documentos ("compare a política X da versão 2 com a da versão 3 e diga o que mudou no prazo"). Implemente decomposição em sub-perguntas e recuperação iterativa. Compare com o agente da semana 13 resolvendo o mesmo conjunto.

**Medir:** crie um subconjunto multi-hop no golden dataset (20–30 perguntas, anotadas com **todos** os chunks necessários). Métrica-chave: **recall completo** — recuperou todos os documentos necessários, não apenas um deles.

**Entregável:** dataset multi-hop + comparação decomposição explícita vs agente livre.

**Armadilha:** propagação de erro. Se a primeira sub-pergunta falha, todas as seguintes ficam contaminadas. Meça a taxa de falha por hop, não só no final.

## Diário

_Sem anotações ainda._
