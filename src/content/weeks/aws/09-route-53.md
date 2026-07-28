---
roadmap: aws
week: 9
title: "Route 53"
phase: "Performance e edge (semanas 9-10)"
status: todo
pocs: []
---

**Construir:** registre um domínio barato (~US$3/ano em `.click` ou `.link`) ou use uma hosted zone privada. Configure e teste na prática: simple, weighted (70/30), failover com health check, latency-based. Derrube o endpoint primário e veja o failover acontecer.

**Conceitos de prova:** todas as políticas de roteamento e o cenário de cada uma; alias record vs CNAME (alias funciona no apex do domínio e é grátis); health checks; TTL e seu impacto no failover.

**Pegadinha clássica:** "apontar `exemplo.com` (sem www) para um ALB" → alias record, porque CNAME não funciona no zone apex. Cai com frequência.

**Custo:** US$0,50/mês por hosted zone.

## Diário

_Sem anotações ainda._
