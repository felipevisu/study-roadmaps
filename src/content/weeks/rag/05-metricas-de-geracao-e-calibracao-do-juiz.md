---
roadmap: rag
week: 5
title: "Métricas de geração e calibração do juiz"
phase: "Fundamentos e a régua (semanas 1–5)"
status: todo
pocs: []
---

**Construir:** avaliação da resposta, não só da recuperação. Implemente **faithfulness** (a resposta é sustentada pelos chunks recuperados?), **answer relevance** e **context precision** usando LLM-as-judge com prompts seus.

**Medir:** aqui vem a parte que quase todo mundo pula — **calibre o juiz**. Rotule 50 respostas você mesmo, rode o juiz nas mesmas 50, e calcule a concordância (Cohen's kappa ou acurácia simples). Se a concordância for baixa, o problema é o prompt do juiz, e você precisa iterar nele.

**Entregável:** `eval/generation.py` + relatório de concordância humano-vs-juiz. Só a partir daqui você tem o direito de confiar em números automáticos.

**Armadilha:** confiar cegamente em LLM-as-judge. Ele tem viés de posição, viés de verbosidade (resposta longa parece melhor) e viés de auto-preferência (favorece texto gerado pelo mesmo modelo). Teste explicitamente pelo menos o de verbosidade.

**Comparativo:** rode o RAGAS ou DeepEval no mesmo conjunto e veja se concorda com o seu juiz caseiro. Se divergir, entenda por quê.

## Diário

_Sem anotações ainda._
