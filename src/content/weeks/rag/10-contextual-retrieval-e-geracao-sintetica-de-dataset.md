---
roadmap: rag
week: 10
title: "Contextual retrieval e geração sintética de dataset"
phase: "Melhorando a recuperação (semanas 6–10)"
status: todo
pocs: []
---

**Construir:** duas coisas que se reforçam. (a) **Contextual retrieval**: antes de indexar, pedir ao LLM um resumo curto de onde aquele chunk se encaixa no documento e prefixar isso ao chunk. (b) **Geração sintética de queries**: para cada chunk, gerar perguntas que ele responde, criando um dataset de avaliação 10× maior.

**Medir:** o ganho do contextual retrieval no harness. E valide o dataset sintético: amostre 50 pares gerados e revise manualmente — qual a taxa de perguntas ruins ou não respondíveis?

**Entregável:** dataset `v2` (sintético + filtrado + os manuais originais) e a comparação de resultados no dataset manual vs sintético. Se as conclusões divergirem, confie no manual e investigue.

**Armadilha:** dataset sintético tem viés de facilidade — a pergunta gerada a partir do chunk usa as palavras do chunk, então favorece busca léxica e infla o recall. Saiba disso ao ler seus números.

## Diário

_Sem anotações ainda._
