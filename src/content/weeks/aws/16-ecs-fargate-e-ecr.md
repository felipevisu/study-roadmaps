---
roadmap: aws
week: 16
title: "ECS Fargate e ECR"
phase: "Containers, operação e segurança (semanas 16-18)"
status: todo
pocs: []
---

**Construir:** dockerize uma app simples, push no ECR, task definition com task role (não execution role — entenda a diferença), service no Fargate atrás do ALB, com autoscaling. Faça um deploy de nova versão e observe o rolling update.

**Conceitos de prova:** ECS EC2 vs ECS Fargate vs EKS vs App Runner; task role (permissão da sua aplicação) vs task execution role (permissão do ECS para puxar imagem e escrever log); modos de rede; quando a resposta é "containers sem gerenciar servidor" → Fargate.

**Pegadinha clássica:** "quer Kubernetes, portabilidade multi-cloud" → EKS. "Só quer rodar container, menor overhead operacional" → Fargate.

**Custo:** Fargate cobra por segundo. Algumas horas = centavos.

## Diário

_Sem anotações ainda._
