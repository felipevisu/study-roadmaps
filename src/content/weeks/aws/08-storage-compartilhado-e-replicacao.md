---
roadmap: aws
week: 8
title: "Storage compartilhado e replicação"
phase: "Elasticidade e alta disponibilidade (semanas 5-8)"
status: todo
pocs: []
---

**Construir:** EFS montado simultaneamente em duas EC2 em AZs diferentes — escreva de uma, leia da outra. Configure S3 Cross-Region Replication entre dois buckets e observe o delay. Olhe (sem provisionar) os tipos de FSx no console.

**Conceitos de prova:** EBS (1 instância, 1 AZ, bloco) vs EFS (NFS, multi-AZ, Linux, elástico) vs FSx for Windows (SMB/Active Directory) vs FSx for Lustre (HPC, integra com S3) vs S3 (objeto); EFS Standard vs One Zone; requisitos de CRR (versionamento nos dois lados).

**Pegadinha clássica:** "vários servidores Linux precisam do mesmo file system" → EFS. "Aplicação Windows precisa de compartilhamento SMB" → FSx for Windows. "Processamento HPC lendo de S3" → FSx for Lustre.

**Custo:** baixo, mas desmonte o EFS.

## Diário

_Sem anotações ainda._
