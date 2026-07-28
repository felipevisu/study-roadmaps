---
roadmap: aws
week: 1
title: "IAM, conta e guardrails"
phase: "Fundamentos (semanas 1-4)"
status: todo
pocs: []
---

**Construir:** conta root travada com MFA e nunca mais usada. Um usuário IAM admin. Um segundo usuário com política customizada que só lê um bucket S3 específico. Uma role assumida por uma instância EC2 que lê esse bucket sem nenhuma credencial no código. Habilitar CloudTrail e achar seus próprios eventos.

**Conceitos de prova:** identity policy vs resource policy; role vs user vs group; instance profile; princípio do menor privilégio; a diferença entre `Deny` explícito e ausência de `Allow`; IAM é global, não regional.

**Pegadinha clássica:** a prova adora perguntar "qual a forma mais segura de dar acesso da EC2 ao S3?". A resposta é **sempre** role, nunca access key em variável de ambiente. Faça o exercício de tentar dos dois jeitos para sentir a diferença.

**Custo:** ~zero.

## Diário

_Sem anotações ainda._
