---
roadmap: aws
week: 20
title: "DR, custo e revisão final"
phase: "Migração, DR e custo (semanas 19-20)"
status: todo
pocs: []
---

**Construir:** monte um **pilot light** — AMI + snapshot RDS + template CloudFormation em outra região, e cronometre quanto leva para subir tudo. Configure AWS Backup com plano automatizado. Abra Cost Explorer, Trusted Advisor e Compute Optimizer e leia o que eles dizem sobre a sua própria conta destes 20 semanas.

**Conceitos de prova:** as quatro estratégias de DR e seus RTO/RPO — Backup & Restore (horas, mais barato), Pilot Light (dezenas de min), Warm Standby (minutos), Multi-Site Active-Active (~zero, mais caro). A prova dá RTO/RPO e pede a estratégia mais barata que atende; Savings Plans vs Reserved Instances; S3 Intelligent-Tiering para padrão de acesso desconhecido.

**Fechamento:** releia seu caderno de erros inteiro. Faça um simulado completo cronometrado. Destrua **tudo** e confirme fatura zerada.

## Diário

_Sem anotações ainda._
