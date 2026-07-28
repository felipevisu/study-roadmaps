---
roadmap: aws
week: 18
title: "Segurança e governança"
phase: "Containers, operação e segurança (semanas 16-18)"
status: todo
pocs: []
---

**Construir:** chave KMS customer-managed, criptografe um objeto S3 e um volume EBS com ela; remova a permissão da chave e veja o acesso quebrar (isso ensina envelope encryption de verdade). Secrets Manager com rotação automática de senha do RDS. Cognito user pool protegendo a API da semana 11. Ative GuardDuty. Crie uma SCP em Organizations bloqueando uma região.

**Conceitos de prova:** SSE-S3 vs SSE-KMS vs SSE-C vs client-side; KMS é regional, chave não sai do serviço; Secrets Manager (rotação automática, custa) vs Parameter Store (grátis, sem rotação nativa); SCP limita permissão máxima mas **não concede** nada; GuardDuty (detecção de ameaça) vs Inspector (vulnerabilidade) vs Macie (dado sensível em S3).

**Pegadinha clássica:** "credencial de banco com rotação automática" → Secrets Manager. "config de app não-sensível, custo zero" → Parameter Store.

**Custo:** ~US$1/mês por chave KMS. GuardDuty tem 30 dias grátis.

## Diário

_Sem anotações ainda._
