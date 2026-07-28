---
roadmap: aws
week: 6
title: "RDS: Multi-AZ e réplicas de leitura"
phase: "Elasticidade e alta disponibilidade (semanas 5-8)"
status: todo
pocs: []
---

**Construir:** RDS MySQL Multi-AZ na subnet privada. Conecte pela EC2. Force um failover pelo console e cronometre a indisponibilidade. Crie uma read replica e aponte uma query nela. Teste a promoção da réplica a instância independente.

**Conceitos de prova:** **Multi-AZ = disponibilidade (síncrono, standby não serve tráfego, failover automático via DNS)** vs **Read Replica = escala de leitura (assíncrono, serve tráfego, promoção manual)**. Essa distinção é uma das mais cobradas da prova inteira. Também: backup automático vs snapshot manual, retenção, cross-region replica, RDS Proxy.

**Pegadinha clássica:** questão diz "melhorar performance de leitura" → réplica. Diz "sobreviver à falha de uma AZ" → Multi-AZ. Se disser as duas coisas, a resposta usa as duas.

**Custo:** db.t3.micro tem free tier, mas **Multi-AZ não tem**. Ligue, teste o failover, destrua no mesmo dia.

## Diário

_Sem anotações ainda._
