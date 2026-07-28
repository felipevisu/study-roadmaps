---
roadmap: aws
week: 14
title: "EventBridge e Step Functions"
phase: "Serverless e desacoplamento (semanas 11-15)"
status: todo
pocs: []
---

**Construir:** regra EventBridge que dispara com evento de EC2 mudando de estado. Uma regra agendada (cron) chamando Lambda. Depois: uma Step Function com escolha condicional, retry, catch e execução paralela — por exemplo, um pipeline de aprovação de pedido.

**Conceitos de prova:** EventBridge (event bus, schema registry, integra com SaaS, filtro por padrão) vs SNS (pub/sub simples) vs SQS (fila); Standard vs Express workflow no Step Functions; orquestração vs coreografia.

**Pegadinha clássica:** "reagir a mudanças de estado de serviços AWS" → EventBridge. "Substituir cron server" → EventBridge Scheduler. "Coordenar múltiplos passos com estado e retry" → Step Functions.

**Custo:** free tier.

## Diário

_Sem anotações ainda._
