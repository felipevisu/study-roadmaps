---
roadmap: aws
week: 10
title: "CloudFront, ACM e WAF"
phase: "Performance e edge (semanas 9-10)"
status: todo
pocs: []
---

**Construir:** distribuição CloudFront na frente do site estático S3 da semana 4, usando Origin Access Control (bucket 100% privado). Certificado ACM gratuito. Meça o TTFB de uma edge location distante vs origem direta. Adicione uma regra WAF bloqueando um IP ou rate limit.

**Conceitos de prova:** CloudFront (cache de conteúdo, TTL, invalidação, OAC, signed URLs/cookies) vs Global Accelerator (não cacheia, IP anycast, TCP/UDP, failover rápido); ACM precisa estar em **us-east-1** para CloudFront; WAF vs Shield Standard vs Shield Advanced.

**Pegadinha clássica:** "acelerar aplicação global não-HTTP / precisa de IP fixo" → Global Accelerator. "Distribuir conteúdo estático globalmente" → CloudFront.

**Custo:** free tier generoso.

## Diário

_Sem anotações ainda._
