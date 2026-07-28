---
roadmap: aws
week: 3
title: "EC2, EBS e opções de compra"
phase: "Fundamentos (semanas 1-4)"
status: todo
pocs: []
---

**Construir:** suba uma instância com user data que instala e inicia um servidor web. Anexe um volume EBS gp3, formate, monte, escreva um arquivo. Tire snapshot, delete o volume, restaure do snapshot em outra AZ. Crie uma AMI customizada e suba uma instância dela. Suba uma Spot Instance e veja o preço.

**Conceitos de prova:** famílias de instância (t/m = general, c = compute, r/x = memory, i/d = storage); gp3 vs io2 vs st1 vs sc1 e quando cada um; EBS é AZ-locked, snapshot é regional; instance store é efêmero; On-Demand vs Reserved vs Savings Plans vs Spot vs Dedicated Host — e qual cada cenário pede.

**Pegadinha clássica:** "workload batch tolerante a interrupção, menor custo" → Spot. "Licença por socket físico, compliance" → Dedicated Host. "Precisa de IOPS altíssimo e sustentado" → io2 Block Express.

**Custo:** t3.micro no free tier. Destrua a Spot.

## Diário

_Sem anotações ainda._
