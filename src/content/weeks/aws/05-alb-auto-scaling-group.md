---
roadmap: aws
week: 5
title: "ALB + Auto Scaling Group"
phase: "Elasticidade e alta disponibilidade (semanas 5-8)"
status: todo
pocs: []
---

**Construir:** launch template com user data que serve uma página mostrando o ID da instância. ASG com min 2, max 4, spread em 2 AZs. ALB na frente com health check. Mate uma instância manualmente e veja o ASG recriar. Gere carga (`stress` ou `ab`) e veja o target tracking escalar.

**Conceitos de prova:** ALB (L7, path/host routing) vs NLB (L4, IP estático, altíssima performance) vs GWLB; target tracking vs step scaling vs scheduled; health check do ELB vs do EC2; cooldown; por que o ASG deve usar health check do ELB.

**Pegadinha clássica:** "precisa de IP estático / suporte a milhões de req/s / protocolo TCP não-HTTP" → NLB. "Roteamento por caminho de URL para microserviços" → ALB.

**Custo:** ALB ~US$0,50/dia. Destrua.

## Diário

_Sem anotações ainda._
