---
title: "RAG e Avaliação de Agentes"
subtitle: "20 PoCs — da régua à produção"
accent: "#7c5cff"
order: 2
source: "RAG.md"
---

# Cronograma de 20 PoCs — RAG e Avaliação de Agentes

**Ritmo:** 1 PoC por semana (~6–10h). 20 semanas ≈ 5 meses.

**Princípio que organiza tudo:** você constrói a régua antes de otimizar. Da semana 2 em diante, nenhuma mudança entra sem passar pelo harness de avaliação e virar uma linha no leaderboard. O objetivo final não é "ter um RAG bom", é **conseguir provar que ele é bom** — e detectar quando piorou.

---

## Regras do jogo (valem para as 20 semanas)

1. **Um único corpus.** Escolha um domínio na semana 1 e não troque. Ideal: 200–2000 documentos de algo que você conhece bem o suficiente para julgar respostas (documentação técnica, legislação, base de conhecimento da sua empresa, papers de uma área).
2. **Um único `leaderboard.csv`.** Toda PoC adiciona linhas: `data, id_experimento, config, recall@5, nDCG@10, faithfulness, answer_relevance, latência_p50, latência_p95, custo_por_query`.
3. **Versione a configuração, não só o código.** Um YAML por experimento (modelo de embedding, chunk size, top_k, prompt, reranker). Reproduzir um resultado de 3 meses atrás precisa ser trivial.
4. **Congele o dataset de teste.** Se você mudar as perguntas, os números de antes viram lixo. Cresça o dataset em versões (`v1`, `v2`), nunca editando no lugar.
5. **Escreva um `FINDINGS.md` por semana.** 10 linhas: o que testou, o que ganhou, o que surpreendeu, o que ficou pendente. É isso que vira seu conhecimento real, não o código.
6. **Sem framework nas 5 primeiras semanas.** Escreva na mão. Depois, se quiser adotar LlamaIndex/LangChain/Haystack, você vai saber exatamente o que eles estão escondendo.

---

# BLOCO 1 — Fundamentos e a régua (semanas 1–5)


# BLOCO 2 — Melhorando a recuperação (semanas 6–10)

# BLOCO 3 — Agentes, robustez e escala (semanas 11–15)

# BLOCO 4 — Arquiteturas avançadas e produção (semanas 16–20)

## Mapa das competências de avaliação

| Semana | O que você passa a saber medir |
|---|---|
| 2 | Qualidade de recuperação (recall, MRR, nDCG) |
| 5 | Qualidade de geração + confiabilidade do próprio juiz |
| 7 | Trade-off qualidade × latência |
| 10 | Geração e validação de dataset em escala |
| 12 | Degradação por aproximação (ANN) e performance sob carga |
| 13 | Comportamento de agente: trajetória, custo, variância |
| 14 | Falha composta em múltiplos passos |
| 15 | Robustez adversarial e calibração de abstenção |
| 19 | Regressão contínua e experimentação online |

---

## Se você precisar cortar

Numa versão de 10 semanas, mantenha: **1, 2, 3, 5, 6, 7, 13, 15, 19, 20**. Perde-se profundidade em arquitetura, mas preserva-se a espinha dorsal: régua → híbrido → reranker → agente → robustez → produção.

## Leituras por bloco

- **Bloco 1:** RAG (Lewis et al., 2020); DPR (Karpukhin et al., 2020); documentação do RAGAS.
- **Bloco 2:** ColBERT; HyDE; artigo da Anthropic sobre contextual retrieval.
- **Bloco 3:** Self-RAG; Corrective RAG; literatura de ANN benchmarks (ann-benchmarks.com).
- **Bloco 4:** RAPTOR; GraphRAG (Microsoft); ColPali.
