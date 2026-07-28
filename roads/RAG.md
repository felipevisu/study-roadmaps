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

## Semana 1 — RAG mínimo, honesto e feio

**Construir:** pipeline end-to-end sem nenhum framework. Carregar documentos → chunking fixo (500 tokens, overlap 50) → embeddings → índice em memória (numpy + similaridade de cosseno, sem banco vetorial) → top-k → prompt → resposta.

**Medir:** nada automatizado ainda. Faça 20 perguntas manualmente e classifique cada resposta em: correta / parcialmente correta / errada / alucinada.

**Entregável:** pipeline rodando + planilha com as 20 perguntas anotadas + lista dos modos de falha que você observou.

**Armadilha:** querer usar Qdrant/Pinecone já na semana 1. Com 2000 chunks, `numpy` resolve e você entende o que está acontecendo. Banco vetorial é problema da semana 12.

---

## Semana 2 — Golden dataset e métricas de recuperação

**Construir:** o harness de avaliação. Dataset de 50–100 pares `(pergunta, chunk_ids_relevantes)`. Anotação manual — é chato e é o investimento mais valioso das 20 semanas. Implemente **na mão**: `recall@k`, `precision@k`, `MRR`, `nDCG@k`, `hit rate`.

**Medir:** rode o baseline da semana 1 e registre a primeira linha do leaderboard.

**Entregável:** `eval/retrieval.py` que recebe um retriever e devolve o dict de métricas. Esse arquivo vai ser usado nas 18 semanas seguintes.

**Armadilha:** implementar nDCG errado (é comum). Valide contra um exemplo calculado à mão no papel.

**Conceitos:** por que recall importa mais que precision em RAG (o LLM tolera ruído, mas não consegue inventar o que não recebeu); diferença entre relevância binária e graduada.

---

## Semana 3 — BM25 e o baseline que te humilha

**Construir:** busca léxica (BM25 via `rank_bm25` ou Elasticsearch/OpenSearch). Compare contra o denso da semana 1 no mesmo dataset.

**Medir:** as duas curvas lado a lado. E o mais importante: **análise qualitativa das divergências** — separe as queries onde BM25 ganha e onde o denso ganha, e escreva por quê.

**Entregável:** tabela comparativa + um parágrafo caracterizando cada família de erro (siglas, nomes próprios, números de versão → léxico ganha; paráfrase, sinônimo, pergunta conceitual → denso ganha).

**Armadilha:** ficar decepcionado se o BM25 ganhar. Ele ganha em muito caso real. Isso é a descoberta, não o fracasso.

---

## Semana 4 — Laboratório de chunking

**Construir:** varredura sistemática. Eixos: tamanho (256/512/1024/2048), overlap (0/10%/25%), estratégia (fixo por token, por parágrafo, por seção via headers markdown, semântico por quebra de similaridade). Mínimo de 12 combinações.

**Medir:** o harness da semana 2, todas as combinações. Gere um gráfico de `recall@5` × `chunk_size` por estratégia.

**Entregável:** grid de resultados + recomendação justificada para o *seu* corpus.

**Armadilha:** achar que existe um chunk size universal. Não existe — depende da densidade de informação do seu documento. O ponto da semana é ter o método pra descobrir, não decorar o número.

---

## Semana 5 — Métricas de geração e calibração do juiz

**Construir:** avaliação da resposta, não só da recuperação. Implemente **faithfulness** (a resposta é sustentada pelos chunks recuperados?), **answer relevance** e **context precision** usando LLM-as-judge com prompts seus.

**Medir:** aqui vem a parte que quase todo mundo pula — **calibre o juiz**. Rotule 50 respostas você mesmo, rode o juiz nas mesmas 50, e calcule a concordância (Cohen's kappa ou acurácia simples). Se a concordância for baixa, o problema é o prompt do juiz, e você precisa iterar nele.

**Entregável:** `eval/generation.py` + relatório de concordância humano-vs-juiz. Só a partir daqui você tem o direito de confiar em números automáticos.

**Armadilha:** confiar cegamente em LLM-as-judge. Ele tem viés de posição, viés de verbosidade (resposta longa parece melhor) e viés de auto-preferência (favorece texto gerado pelo mesmo modelo). Teste explicitamente pelo menos o de verbosidade.

**Comparativo:** rode o RAGAS ou DeepEval no mesmo conjunto e veja se concorda com o seu juiz caseiro. Se divergir, entenda por quê.

---

# BLOCO 2 — Melhorando a recuperação (semanas 6–10)

## Semana 6 — Busca híbrida e fusão de rankings

**Construir:** combinação de BM25 + denso. Implemente duas estratégias de fusão: normalização de score com peso `alpha` e **Reciprocal Rank Fusion (RRF)**.

**Medir:** varra o `alpha` de 0 a 1 em passos de 0.1 e plote. Compare com RRF (que não tem hiperparâmetro de peso — essa é a graça dele).

**Entregável:** curva de `alpha` + decisão entre fusão por score ou por rank, com justificativa.

**Armadilha:** normalizar scores de forma ingênua. Similaridade de cosseno e score BM25 vivem em escalas totalmente diferentes; min-max por query é o mínimo aceitável. RRF existe justamente para evitar esse problema.

---

## Semana 7 — Reranking

**Construir:** segundo estágio com cross-encoder. Recupere top-50, reordene para top-5. Teste ao menos um cross-encoder open source (`bge-reranker`, `mxbai-rerank`) e um LLM como reranker.

**Medir:** ganho em `nDCG@5` **versus** custo em latência. Varra o `k` do primeiro estágio (20/50/100) — a partir de certo ponto o ganho satura e você só paga latência.

**Entregável:** curva ganho×latência e a recomendação do ponto de operação.

**Armadilha:** esquecer que o reranker não conserta recall. Se o documento certo não estava no top-50, nenhum reranker vai fazer mágica. Meça o **recall do primeiro estágio** como teto teórico.

---

## Semana 8 — Transformação de query

**Construir:** três técnicas, avaliadas separadamente: (a) reescrita da query pelo LLM, (b) multi-query (gerar 3–5 variações e unir os resultados), (c) HyDE (gerar uma resposta hipotética e buscar por ela).

**Medir:** cada técnica isolada e depois combinada. Inclua **custo e latência adicionais** na tabela — essas técnicas multiplicam chamadas de LLM e de busca.

**Entregável:** análise de quando cada técnica compensa. Sugestão forte: segmente o dataset por tipo de pergunta (factual curta, conceitual, comparativa) e veja o ganho por segmento.

**Armadilha:** aplicar HyDE em tudo. Em pergunta factual curta ele frequentemente **piora**, porque a resposta hipotética alucina detalhes que poluem a busca.

---

## Semana 9 — Metadados, filtros e roteamento

**Construir:** extração de metadados na ingestão (data, autor, seção, tipo de documento, versão), filtragem na busca e um **roteador** que decide entre fontes ou decide se precisa buscar. Implemente pre-filtering e post-filtering e compare.

**Medir:** crie um subconjunto de queries com restrição temporal ou de fonte ("na versão 2.0...", "segundo a política de RH..."). Meça acurácia do roteador e o efeito do filtro no recall.

**Entregável:** roteador funcionando + análise do trade-off pre vs post-filtering (post-filtering pode esvaziar seu top-k; pre-filtering pode degradar o índice ANN).

**Armadilha:** ignorar o caso "nenhuma busca é necessária". Saudações e perguntas meta não deveriam disparar retrieval — e isso é mensurável.

---

## Semana 10 — Contextual retrieval e geração sintética de dataset

**Construir:** duas coisas que se reforçam. (a) **Contextual retrieval**: antes de indexar, pedir ao LLM um resumo curto de onde aquele chunk se encaixa no documento e prefixar isso ao chunk. (b) **Geração sintética de queries**: para cada chunk, gerar perguntas que ele responde, criando um dataset de avaliação 10× maior.

**Medir:** o ganho do contextual retrieval no harness. E valide o dataset sintético: amostre 50 pares gerados e revise manualmente — qual a taxa de perguntas ruins ou não respondíveis?

**Entregável:** dataset `v2` (sintético + filtrado + os manuais originais) e a comparação de resultados no dataset manual vs sintético. Se as conclusões divergirem, confie no manual e investigue.

**Armadilha:** dataset sintético tem viés de facilidade — a pergunta gerada a partir do chunk usa as palavras do chunk, então favorece busca léxica e infla o recall. Saiba disso ao ler seus números.

---

# BLOCO 3 — Agentes, robustez e escala (semanas 11–15)

## Semana 11 — Embeddings: escolha e fine-tuning

**Construir:** benchmark de 4–5 modelos de embedding no seu corpus (não confie cegamente no ranking do MTEB — ele não conhece seu domínio). Depois, fine-tune de um modelo pequeno com aprendizado contrastivo usando **hard negatives** minerados do seu próprio índice.

**Medir:** ganho do fine-tuning versus o custo (tempo de treino, risco de overfitting, esforço de manutenção). Avalie em um split de teste que **não** foi usado na mineração de negativos.

**Entregável:** tabela de modelos + modelo fine-tunado + veredito honesto sobre se valeu a pena.

**Armadilha:** vazamento de dados. Se os hard negatives vieram do mesmo conjunto que você usa para avaliar, seu ganho é ilusório.

---

## Semana 12 — ANN e escala real

**Construir:** migrar para um banco vetorial de verdade (Qdrant, Weaviate, pgvector ou FAISS puro). Infle o corpus para ≥1M de chunks (duplique com variações ou traga um dump público). Configure HNSW (`M`, `efConstruction`, `efSearch`) e IVF, e teste quantização escalar/binária.

**Medir:** a curva que importa: **recall do ANN versus busca exata**, contra latência e memória. Não é o recall do RAG — é quanto o índice aproximado está perdendo em relação ao brute force.

**Entregável:** gráfico recall×latência×memória e o ponto de operação escolhido.

**Armadilha:** medir latência sem warm-up, sem concorrência e com cache quente. Meça p95 sob carga, não uma query isolada no notebook.

---

## Semana 13 — RAG agêntico e avaliação de trajetória

**Construir:** o salto conceitual da série. Um agente com ferramentas (`buscar`, `buscar_com_filtro`, `responder`) que decide sozinho quantas buscas fazer e quando parar. Loop com limite de passos.

**Medir:** aqui as métricas mudam de natureza. Além da qualidade final: **tool call accuracy** (chamou a ferramenta certa com os argumentos certos?), **número de passos até a resposta**, **taxa de loop infinito**, **custo por query**, e avaliação da **trajetória** (o caminho fazia sentido, independente de o resultado final ter dado certo?).

**Entregável:** `eval/trajectory.py` + comparação agente vs pipeline fixo da semana 10. Registre também a **variância**: rode a mesma query 5 vezes e veja o desvio. Agente é não-determinístico e isso é um problema de avaliação por si só.

**Armadilha:** avaliar agente só pelo resultado final. Um agente que acerta por sorte depois de 9 buscas erradas é caro e frágil, e a métrica de resultado final não mostra isso.

---

## Semana 14 — Multi-hop e decomposição

**Construir:** perguntas que exigem combinar 2–3 documentos ("compare a política X da versão 2 com a da versão 3 e diga o que mudou no prazo"). Implemente decomposição em sub-perguntas e recuperação iterativa. Compare com o agente da semana 13 resolvendo o mesmo conjunto.

**Medir:** crie um subconjunto multi-hop no golden dataset (20–30 perguntas, anotadas com **todos** os chunks necessários). Métrica-chave: **recall completo** — recuperou todos os documentos necessários, não apenas um deles.

**Entregável:** dataset multi-hop + comparação decomposição explícita vs agente livre.

**Armadilha:** propagação de erro. Se a primeira sub-pergunta falha, todas as seguintes ficam contaminadas. Meça a taxa de falha por hop, não só no final.

---

## Semana 15 — Abstenção, groundedness e adversarial

**Construir:** a semana que separa demo de produto. Faça o sistema saber dizer "não sei". Implemente detecção de contexto insuficiente, atribuição de fontes por afirmação (citação em nível de sentença) e limiar de confiança.

**Medir:** monte um **dataset adversarial**: (a) perguntas cuja resposta não está no corpus, (b) perguntas com premissa falsa, (c) perguntas ambíguas, (d) perguntas com informação contraditória entre documentos, (e) tentativas de prompt injection vindas de dentro dos documentos recuperados. Métricas: taxa de abstenção correta, taxa de abstenção indevida (recusar quando sabia), taxa de alucinação sob pressão.

**Entregável:** dataset adversarial + matriz de confusão de abstenção. Essa é provavelmente a PoC mais valiosa da série para um contexto corporativo.

**Armadilha:** calibrar a abstenção só pela taxa de alucinação. É fácil zerar alucinação recusando tudo — por isso as duas métricas precisam ser lidas juntas.

---

# BLOCO 4 — Arquiteturas avançadas e produção (semanas 16–20)

## Semana 16 — RAPTOR e sumarização hierárquica

**Construir:** clusterizar chunks, gerar resumos por cluster, clusterizar os resumos, e indexar todos os níveis da árvore. Permite responder tanto pergunta pontual quanto pergunta panorâmica ("qual o tema geral desses documentos?").

**Medir:** adicione ao dataset perguntas de **escopo amplo** — é onde o RAG comum falha catastroficamente, e onde a hierarquia deveria brilhar. Meça também o custo de ingestão (é alto) e o custo de reindexação quando um documento muda.

**Entregável:** comparação RAG plano vs hierárquico, segmentado por tipo de pergunta (pontual vs panorâmica).

---

## Semana 17 — GraphRAG

**Construir:** extração de entidades e relações dos documentos, construção de grafo, detecção de comunidades e recuperação por caminhos no grafo. Pode ser leve — Neo4j ou até NetworkX em memória.

**Medir:** perguntas relacionais ("quais projetos envolvem a pessoa X e a tecnologia Y?") — o caso em que busca vetorial é estruturalmente ruim. Meça também a **qualidade da extração de entidades**, que é o gargalo real: amostre e revise manualmente.

**Entregável:** comparação em perguntas relacionais + análise franca de custo-benefício. GraphRAG é caro de construir e manter; a PoC deve responder se o seu caso justifica.

---

## Semana 18 — Multimodal

**Construir:** recuperação sobre tabelas, imagens e PDFs com layout complexo. Duas abordagens em paralelo: (a) parsing para texto + indexação normal, (b) modelo de visão sobre a página renderizada (linha do ColPali).

**Medir:** perguntas cuja resposta está numa tabela ou num gráfico. Compare fidelidade das duas abordagens e o custo de cada uma.

**Armadilha:** parsing de tabela silenciosamente errado. Uma tabela mal extraída produz resposta confiante e falsa — inspecione o texto extraído, não só a resposta final.

---

## Semana 19 — Observabilidade e avaliação online

**Construir:** a ponte para produção. Tracing distribuído de cada query (LangSmith, Langfuse, Phoenix ou OpenTelemetry na mão), captura de feedback implícito (reformulação da pergunta, abandono) e explícito (👍/👎), e uma **suíte de regressão rodando em CI** que bloqueia merge se qualquer métrica cair além do limiar.

**Medir:** desenhe e implemente um teste A/B: definir métrica primária, calcular tamanho de amostra necessário, decidir critério de parada. Mesmo que rode com tráfego simulado, o exercício de desenho é o valor.

**Entregável:** dashboard + pipeline de CI com gate de qualidade + documento de desenho do A/B.

**Conceito-chave:** a diferença entre **eval offline** (dataset fixo, rápido, barato, enviesado) e **eval online** (tráfego real, lento, caro, verdadeiro). Você precisa dos dois, e precisa entender por que eles discordam.

---

## Semana 20 — Capstone

**Construir:** o sistema final, integrando o que provou valor nas 19 semanas anteriores — e só isso. Inclua os requisitos que ninguém coloca em tutorial: **controle de permissão por usuário na recuperação** (o usuário só pode recuperar o que pode ver — e isso quebra cache e complica o índice), **ingestão incremental** (documento muda, índice atualiza sem reindexar tudo) e **cache semântico**.

**Medir:** rodada final do leaderboard com todas as variantes principais. Relatório com: melhor configuração por métrica, fronteira de Pareto qualidade×custo×latência, e o que você faria diferente.

**Entregável:** `RETROSPECTIVA.md` — as 5 lições que mais te surpreenderam nas 20 semanas. Esse documento vale mais no seu portfólio do que o código.

---

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