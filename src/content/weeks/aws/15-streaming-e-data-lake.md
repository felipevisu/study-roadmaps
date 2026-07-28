---
roadmap: aws
week: 15
title: "Streaming e data lake"
phase: "Serverless e desacoplamento (semanas 11-15)"
status: todo
pocs: []
---

**Construir:** Kinesis Data Streams recebendo eventos de um script. Firehose entregando para S3 particionado por data. Glue Crawler catalogando. Athena consultando com SQL. Compare tudo isso mentalmente com "por que não SQS?".

**Conceitos de prova:** Kinesis Data Streams (shards, retenção 1-365 dias, múltiplos consumidores lendo o mesmo dado, ordem por shard) vs SQS (mensagem some após consumo, um consumidor lógico); Firehose (near real-time, zero gestão, destino S3/Redshift/OpenSearch); Athena (serverless, cobra por TB escaneado — daí a importância de Parquet e particionamento); Redshift vs Athena vs EMR.

**Pegadinha clássica:** "múltiplas aplicações precisam consumir o mesmo stream" → Kinesis, não SQS. "Análise ad-hoc sobre dados no S3 sem infra" → Athena.

**Custo:** shard do Kinesis ~US$0,36/dia. Destrua.

## Diário

_Sem anotações ainda._
