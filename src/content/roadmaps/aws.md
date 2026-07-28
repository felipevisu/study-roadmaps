---
title: "AWS Solutions Architect Associate"
subtitle: "SAA-C03 — 20 POCs, uma por semana"
accent: "#ff9900"
order: 1
source: "AWS.md"
---

# Cronograma de 20 POCs — AWS Solutions Architect Associate (SAA-C03)

Uma POC por semana, ~4-6h de mão na massa, em paralelo ao curso teórico.

---

## Regras do jogo (leia antes da semana 1)

**Orçamento.** Configure um AWS Budget de US$20/mês com alerta em 50% e 80% **na semana 1**, antes de qualquer outra coisa. O free tier cobre boa parte disso, mas não tudo.

**Os três vilões de custo** — sempre destrua no fim da semana:
- **NAT Gateway**: ~US$0,045/h + tráfego → ~US$33/mês se esquecer ligado. É o campeão de fatura surpresa.
- **ALB / NLB**: ~US$16/mês cada.
- **RDS Multi-AZ, ElastiCache, Global Accelerator, Transit Gateway**: todos cobram por hora, sem free tier relevante.

**Ritual de teardown.** Toda sexta: `Cost Explorer → últimos 7 dias` e destrua os recursos. A partir da semana 5, se a POC estiver em IaC, teardown é um comando só.

**Regra de IaC.** Semanas 1-4: faça tudo pelo console, para ver os campos e entender o que existe. **A partir da semana 5, escreva tudo em CloudFormation, CDK ou Terraform.** Isso resolve o teardown, permite refazer o lab em 5 minutos e cobre o CloudFormation que cai na prova.

**Caderno de erros.** Toda vez que algo não funcionar de primeira (e vai acontecer bastante), anote em uma linha: sintoma → causa. Esse arquivo vale mais que qualquer resumo pronto na semana da prova.

**Região.** Use `us-east-1` para tudo. Mais serviços, mais free tier, mais tutorial disponível.

---

## Fase 1 — Fundamentos (semanas 1-4)

Domínio de prova: Secure Architectures (30%) começa aqui.


## Fase 2 — Elasticidade e alta disponibilidade (semanas 5-8)

Domínio: Resilient Architectures (26%). **A partir daqui, tudo em IaC.**

## Fase 3 — Performance e edge (semanas 9-10)

Domínio: High-Performing Architectures (24%).

## Fase 4 — Serverless e desacoplamento (semanas 11-15)

## Fase 5 — Containers, operação e segurança (semanas 16-18)

## Fase 6 — Migração, DR e custo (semanas 19-20)

Domínio: Cost-Optimized Architectures (20%).

## Calendário de simulados

Não deixe para o fim. Intercale:

| Quando | O quê | Meta |
|---|---|---|
| Fim da semana 8 | Simulado 1 (diagnóstico) | Qualquer nota — serve para calibrar |
| Fim da semana 13 | Simulado 2 | ~65% |
| Fim da semana 17 | Simulado 3 | ~75% |
| Fim da semana 19 | Simulado 4 | 80%+ |
| Semana 20 | Simulado 5 (inédito, cronometrado) | 80%+ consistente |

**Marque a prova agora**, para a semana 21 ou 22. Dá para remarcar grátis até 24h antes. Sem data marcada, cronograma de 20 semanas vira cronograma de 40.

## Cobertura vs domínios do exame

| Domínio | Peso | Semanas |
|---|---|---|
| Design Secure Architectures | 30% | 1, 2, 10, 18 |
| Design Resilient Architectures | 26% | 5, 6, 7, 8, 9, 13, 19, 20 |
| Design High-Performing Architectures | 24% | 3, 4, 9, 10, 11, 12, 14, 15, 16 |
| Design Cost-Optimized Architectures | 20% | 3, 4, 8, 17, 20 |
