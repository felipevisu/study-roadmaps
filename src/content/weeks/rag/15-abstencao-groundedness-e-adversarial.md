---
roadmap: rag
week: 15
title: "Abstenção, groundedness e adversarial"
phase: "Agentes, robustez e escala (semanas 11–15)"
status: todo
pocs: []
---

**Construir:** a semana que separa demo de produto. Faça o sistema saber dizer "não sei". Implemente detecção de contexto insuficiente, atribuição de fontes por afirmação (citação em nível de sentença) e limiar de confiança.

**Medir:** monte um **dataset adversarial**: (a) perguntas cuja resposta não está no corpus, (b) perguntas com premissa falsa, (c) perguntas ambíguas, (d) perguntas com informação contraditória entre documentos, (e) tentativas de prompt injection vindas de dentro dos documentos recuperados. Métricas: taxa de abstenção correta, taxa de abstenção indevida (recusar quando sabia), taxa de alucinação sob pressão.

**Entregável:** dataset adversarial + matriz de confusão de abstenção. Essa é provavelmente a PoC mais valiosa da série para um contexto corporativo.

**Armadilha:** calibrar a abstenção só pela taxa de alucinação. É fácil zerar alucinação recusando tudo — por isso as duas métricas precisam ser lidas juntas.

## Diário

_Sem anotações ainda._
