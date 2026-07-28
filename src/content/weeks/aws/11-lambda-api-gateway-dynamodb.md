---
roadmap: aws
week: 11
title: "Lambda + API Gateway + DynamoDB"
phase: "Serverless e desacoplamento (semanas 11-15)"
status: todo
pocs: []
---

**Construir:** API CRUD completa serverless. Lambda em VPC (e sinta a dor do cold start e da necessidade de VPC endpoint). Configure timeout, memória, variáveis de ambiente. Teste o throttling do API Gateway.

**Conceitos de prova:** limites da Lambda (15 min, 10GB RAM, 512MB-10GB de `/tmp`); concorrência reservada vs provisionada; por que Lambda em VPC não tem internet sem NAT; REST API vs HTTP API vs WebSocket no API Gateway; usage plans e API keys.

**Pegadinha clássica:** "processamento que leva 30 minutos" → não é Lambda, é Fargate/Batch/Step Functions.

**Custo:** free tier cobre tudo.

## Diário

_Sem anotações ainda._
