---
roadmap: rag
week: 19
title: "Observabilidade e avaliação online"
phase: "Arquiteturas avançadas e produção (semanas 16–20)"
status: todo
pocs: []
---

**Construir:** a ponte para produção. Tracing distribuído de cada query (LangSmith, Langfuse, Phoenix ou OpenTelemetry na mão), captura de feedback implícito (reformulação da pergunta, abandono) e explícito (👍/👎), e uma **suíte de regressão rodando em CI** que bloqueia merge se qualquer métrica cair além do limiar.

**Medir:** desenhe e implemente um teste A/B: definir métrica primária, calcular tamanho de amostra necessário, decidir critério de parada. Mesmo que rode com tráfego simulado, o exercício de desenho é o valor.

**Entregável:** dashboard + pipeline de CI com gate de qualidade + documento de desenho do A/B.

**Conceito-chave:** a diferença entre **eval offline** (dataset fixo, rápido, barato, enviesado) e **eval online** (tráfego real, lento, caro, verdadeiro). Você precisa dos dois, e precisa entender por que eles discordam.

## Diário

_Sem anotações ainda._
