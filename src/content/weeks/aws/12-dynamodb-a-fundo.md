---
roadmap: aws
week: 12
title: "DynamoDB a fundo"
phase: "Serverless e desacoplamento (semanas 11-15)"
status: todo
pocs: []
---

**Construir:** tabela com partition key + sort key. Crie um GSI e faça uma query que só funciona por ele. Compare `Query` vs `Scan` em 10 mil itens (o tempo vai te ensinar mais que qualquer texto). Ative TTL, Streams, e ligue um Lambda no stream. Teste on-demand vs provisioned.

**Conceitos de prova:** escolha de partition key e hot partition; GSI (chave diferente, capacidade própria, eventual) vs LSI (mesma partition key, criado junto com a tabela); RCU/WCU e cálculo; eventually vs strongly consistent read; DAX (cache em microssegundos, só DynamoDB); Global Tables para multi-região ativo-ativo.

**Pegadinha clássica:** "Scan está lento e caro" → refatorar para Query com GSI, sempre.

**Custo:** free tier.

## Diário

_Sem anotações ainda._
