---
roadmap: rag
week: 11
title: "Embeddings: escolha e fine-tuning"
phase: "Agentes, robustez e escala (semanas 11–15)"
status: todo
pocs: []
---

**Construir:** benchmark de 4–5 modelos de embedding no seu corpus (não confie cegamente no ranking do MTEB — ele não conhece seu domínio). Depois, fine-tune de um modelo pequeno com aprendizado contrastivo usando **hard negatives** minerados do seu próprio índice.

**Medir:** ganho do fine-tuning versus o custo (tempo de treino, risco de overfitting, esforço de manutenção). Avalie em um split de teste que **não** foi usado na mineração de negativos.

**Entregável:** tabela de modelos + modelo fine-tunado + veredito honesto sobre se valeu a pena.

**Armadilha:** vazamento de dados. Se os hard negatives vieram do mesmo conjunto que você usa para avaliar, seu ganho é ilusório.

## Diário

_Sem anotações ainda._
