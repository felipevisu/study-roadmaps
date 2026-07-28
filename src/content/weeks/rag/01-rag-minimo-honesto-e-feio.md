---
roadmap: rag
week: 1
title: "RAG mínimo, honesto e feio"
phase: "Fundamentos e a régua (semanas 1–5)"
status: todo
pocs: []
---

**Construir:** pipeline end-to-end sem nenhum framework. Carregar documentos → chunking fixo (500 tokens, overlap 50) → embeddings → índice em memória (numpy + similaridade de cosseno, sem banco vetorial) → top-k → prompt → resposta.

**Medir:** nada automatizado ainda. Faça 20 perguntas manualmente e classifique cada resposta em: correta / parcialmente correta / errada / alucinada.

**Entregável:** pipeline rodando + planilha com as 20 perguntas anotadas + lista dos modos de falha que você observou.

**Armadilha:** querer usar Qdrant/Pinecone já na semana 1. Com 2000 chunks, `numpy` resolve e você entende o que está acontecendo. Banco vetorial é problema da semana 12.

## Diário

_Sem anotações ainda._
