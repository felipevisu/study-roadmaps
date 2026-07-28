---
roadmap: aws
week: 2
title: "VPC do zero"
phase: "Fundamentos (semanas 1-4)"
status: todo
pocs: []
---

**Construir:** VPC 10.0.0.0/16 com 2 subnets públicas e 2 privadas em AZs diferentes. Internet Gateway, NAT Gateway, route tables corretas. Uma EC2 na subnet privada que consegue fazer `yum update` mas não recebe conexão de fora. Acesse ela via SSM Session Manager (sem bastion, sem chave SSH).

**Conceitos de prova:** o que torna uma subnet "pública" (rota 0.0.0.0/0 → IGW, e nada mais); Security Group (stateful, só allow) vs NACL (stateless, allow e deny, precisa de regra de retorno); NAT Gateway vs NAT Instance; por que NAT fica na subnet pública.

**Pegadinha clássica:** questão descreve tráfego de saída funcionando e retorno bloqueado → é NACL sem regra de porta efêmera (1024-65535). Force esse erro de propósito para ver acontecer.

**Custo:** NAT Gateway. **Destrua no mesmo dia.**

## Diário

_Sem anotações ainda._
