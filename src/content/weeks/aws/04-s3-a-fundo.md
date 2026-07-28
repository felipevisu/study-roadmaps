---
roadmap: aws
week: 4
title: "S3 a fundo"
phase: "Fundamentos (semanas 1-4)"
status: todo
pocs: []
---

**Construir:** bucket com versionamento. Suba, sobrescreva e restaure um objeto de versão anterior. Configure lifecycle: Standard → IA em 30 dias → Glacier em 90. Hospede um site estático. Gere uma presigned URL com expiração de 5 min e teste o que acontece depois. Configure bucket policy que só permite acesso de um IP.

**Conceitos de prova:** todas as storage classes e seus trade-offs (Standard, IA, One Zone-IA, Intelligent-Tiering, Glacier Instant/Flexible/Deep Archive) — isso cai muito; consistência forte; bucket policy vs IAM policy vs ACL; Block Public Access; presigned URL como resposta para "compartilhar objeto privado temporariamente".

**Pegadinha clássica:** "dados acessados raramente mas que precisam estar disponíveis em milissegundos" → Glacier Instant Retrieval, não Flexible. "Dado reproduzível, acesso raro, menor custo" → One Zone-IA.

**Custo:** centavos.

## Diário

_Sem anotações ainda._
