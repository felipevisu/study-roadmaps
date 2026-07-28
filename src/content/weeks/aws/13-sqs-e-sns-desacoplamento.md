---
roadmap: aws
week: 13
title: "SQS e SNS: desacoplamento"
phase: "Serverless e desacoplamento (semanas 11-15)"
status: todo
pocs: []
---

**Construir:** produtor → SQS → consumidor Lambda. Force uma falha e veja a mensagem voltar após o visibility timeout, e depois cair na DLQ. Monte um fanout SNS → 3 SQS. Compare Standard vs FIFO na prática (ordem e duplicação).

**Conceitos de prova:** visibility timeout (deve ser ≥ timeout da Lambda); long polling vs short polling; DLQ e maxReceiveCount; FIFO (300 msg/s, ordem garantida, exactly-once) vs Standard (ilimitado, at-least-once, ordem best-effort); SNS fanout; retenção máxima de 14 dias.

**Pegadinha clássica:** "mensagens sendo processadas em duplicidade" → visibility timeout curto demais. "Precisa de ordem estrita" → FIFO. "Um evento, múltiplos destinos" → SNS fanout.

**Custo:** free tier.

## Diário

_Sem anotações ainda._
