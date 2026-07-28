---
roadmap: aws
week: 17
title: "Observabilidade e operação"
phase: "Containers, operação e segurança (semanas 16-18)"
status: todo
pocs: []
---

**Construir:** métrica customizada no CloudWatch a partir da app. Log group com Metric Filter que conta erros e dispara alarme → SNS → seu e-mail. Dashboard. X-Ray tracing na API da semana 11. AWS Config com uma regra (ex: "bucket S3 não pode ser público") e veja a detecção. SSM Parameter Store guardando config.

**Conceitos de prova:** CloudWatch (métricas, logs, alarmes, EventBridge) vs CloudTrail (auditoria de chamadas de API) vs Config (conformidade de configuração ao longo do tempo) — a prova testa exatamente essa distinção; métricas básicas (5 min) vs detalhadas (1 min); memória e disco da EC2 exigem o CloudWatch Agent, não vêm por padrão.

**Pegadinha clássica:** "quem deletou esse bucket?" → CloudTrail. "esse recurso está fora do padrão de compliance?" → Config. "a CPU passou de 80%?" → CloudWatch.

**Custo:** baixo.

## Diário

_Sem anotações ainda._
