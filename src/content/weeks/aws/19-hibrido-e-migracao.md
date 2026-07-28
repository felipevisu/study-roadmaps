---
roadmap: aws
week: 19
title: "Híbrido e migração"
phase: "Migração, DR e custo (semanas 19-20)"
status: todo
pocs: []
---

**Construir:** duas VPCs com peering, testando conectividade. Suba um Transit Gateway conectando três VPCs e compare a complexidade de rotas com o peering. DataSync copiando de EFS para S3. Storage Gateway (File Gateway) em modo teste. DMS não precisa provisionar — leia a documentação de source/target suportados.

**Conceitos de prova:** VPC Peering (não é transitivo — cai muito) vs Transit Gateway (hub-and-spoke, transitivo); Site-to-Site VPN (rápido de subir, internet pública, ~1.25 Gbps) vs Direct Connect (dedicado, semanas para provisionar, latência consistente) vs DX + VPN como backup; Snowball vs Snowmobile vs DataSync — a regra prática é o tempo de transferência pela rede; DMS + SCT para mudança de engine.

**Pegadinha clássica:** "VPC A fala com B, B fala com C, A precisa falar com C" → peering não resolve, precisa de TGW. "500 TB para migrar com link ruim" → Snowball.

**Custo:** TGW cobra por anexo. Sessão curta.

## Diário

_Sem anotações ainda._
