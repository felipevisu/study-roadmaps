---
roadmap: rag
week: 4
title: "Laboratório de chunking"
phase: "Fundamentos e a régua (semanas 1–5)"
status: todo
pocs: []
---

**Construir:** varredura sistemática. Eixos: tamanho (256/512/1024/2048), overlap (0/10%/25%), estratégia (fixo por token, por parágrafo, por seção via headers markdown, semântico por quebra de similaridade). Mínimo de 12 combinações.

**Medir:** o harness da semana 2, todas as combinações. Gere um gráfico de `recall@5` × `chunk_size` por estratégia.

**Entregável:** grid de resultados + recomendação justificada para o *seu* corpus.

**Armadilha:** achar que existe um chunk size universal. Não existe — depende da densidade de informação do seu documento. O ponto da semana é ter o método pra descobrir, não decorar o número.

## Diário

_Sem anotações ainda._
