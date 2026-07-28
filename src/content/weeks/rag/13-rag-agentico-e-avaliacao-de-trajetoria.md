---
roadmap: rag
week: 13
title: "RAG agêntico e avaliação de trajetória"
phase: "Agentes, robustez e escala (semanas 11–15)"
status: todo
pocs: []
---

**Construir:** o salto conceitual da série. Um agente com ferramentas (`buscar`, `buscar_com_filtro`, `responder`) que decide sozinho quantas buscas fazer e quando parar. Loop com limite de passos.

**Medir:** aqui as métricas mudam de natureza. Além da qualidade final: **tool call accuracy** (chamou a ferramenta certa com os argumentos certos?), **número de passos até a resposta**, **taxa de loop infinito**, **custo por query**, e avaliação da **trajetória** (o caminho fazia sentido, independente de o resultado final ter dado certo?).

**Entregável:** `eval/trajectory.py` + comparação agente vs pipeline fixo da semana 10. Registre também a **variância**: rode a mesma query 5 vezes e veja o desvio. Agente é não-determinístico e isso é um problema de avaliação por si só.

**Armadilha:** avaliar agente só pelo resultado final. Um agente que acerta por sorte depois de 9 buscas erradas é caro e frágil, e a métrica de resultado final não mostra isso.

## Diário

_Sem anotações ainda._
