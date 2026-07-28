---
roadmap: aws
week: 7
title: "Aurora e ElastiCache"
phase: "Elasticidade e alta disponibilidade (semanas 5-8)"
status: todo
pocs: []
---

**Construir:** cluster Aurora Serverless v2 mínimo, veja os endpoints (writer/reader) separados. Depois: ElastiCache Redis na frente de um banco, com uma aplicaçãozinha implementando cache-aside — mede o tempo com e sem cache.

**Conceitos de prova:** Aurora (storage compartilhado em 6 cópias/3 AZs, até 15 réplicas, failover em ~30s, Global Database para DR cross-region); Redis (persistência, réplicas, pub/sub, sorted sets) vs Memcached (multi-thread, sem persistência, puro cache); cache-aside vs write-through; onde entra o DAX (só DynamoDB).

**Pegadinha clássica:** "sessão de usuário compartilhada entre instâncias" → ElastiCache Redis (ou DynamoDB). "Precisa de failover e persistência no cache" → Redis, nunca Memcached.

**Custo:** os dois cobram por hora. Sessão curta e destrua.

## Diário

_Sem anotações ainda._
