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

### Semana 1 — IAM, conta e guardrails

**Construir:** conta root travada com MFA e nunca mais usada. Um usuário IAM admin. Um segundo usuário com política customizada que só lê um bucket S3 específico. Uma role assumida por uma instância EC2 que lê esse bucket sem nenhuma credencial no código. Habilitar CloudTrail e achar seus próprios eventos.

**Conceitos de prova:** identity policy vs resource policy; role vs user vs group; instance profile; princípio do menor privilégio; a diferença entre `Deny` explícito e ausência de `Allow`; IAM é global, não regional.

**Pegadinha clássica:** a prova adora perguntar "qual a forma mais segura de dar acesso da EC2 ao S3?". A resposta é **sempre** role, nunca access key em variável de ambiente. Faça o exercício de tentar dos dois jeitos para sentir a diferença.

**Custo:** ~zero.

---

### Semana 2 — VPC do zero

**Construir:** VPC 10.0.0.0/16 com 2 subnets públicas e 2 privadas em AZs diferentes. Internet Gateway, NAT Gateway, route tables corretas. Uma EC2 na subnet privada que consegue fazer `yum update` mas não recebe conexão de fora. Acesse ela via SSM Session Manager (sem bastion, sem chave SSH).

**Conceitos de prova:** o que torna uma subnet "pública" (rota 0.0.0.0/0 → IGW, e nada mais); Security Group (stateful, só allow) vs NACL (stateless, allow e deny, precisa de regra de retorno); NAT Gateway vs NAT Instance; por que NAT fica na subnet pública.

**Pegadinha clássica:** questão descreve tráfego de saída funcionando e retorno bloqueado → é NACL sem regra de porta efêmera (1024-65535). Force esse erro de propósito para ver acontecer.

**Custo:** NAT Gateway. **Destrua no mesmo dia.**

---

### Semana 3 — EC2, EBS e opções de compra

**Construir:** suba uma instância com user data que instala e inicia um servidor web. Anexe um volume EBS gp3, formate, monte, escreva um arquivo. Tire snapshot, delete o volume, restaure do snapshot em outra AZ. Crie uma AMI customizada e suba uma instância dela. Suba uma Spot Instance e veja o preço.

**Conceitos de prova:** famílias de instância (t/m = general, c = compute, r/x = memory, i/d = storage); gp3 vs io2 vs st1 vs sc1 e quando cada um; EBS é AZ-locked, snapshot é regional; instance store é efêmero; On-Demand vs Reserved vs Savings Plans vs Spot vs Dedicated Host — e qual cada cenário pede.

**Pegadinha clássica:** "workload batch tolerante a interrupção, menor custo" → Spot. "Licença por socket físico, compliance" → Dedicated Host. "Precisa de IOPS altíssimo e sustentado" → io2 Block Express.

**Custo:** t3.micro no free tier. Destrua a Spot.

---

### Semana 4 — S3 a fundo

**Construir:** bucket com versionamento. Suba, sobrescreva e restaure um objeto de versão anterior. Configure lifecycle: Standard → IA em 30 dias → Glacier em 90. Hospede um site estático. Gere uma presigned URL com expiração de 5 min e teste o que acontece depois. Configure bucket policy que só permite acesso de um IP.

**Conceitos de prova:** todas as storage classes e seus trade-offs (Standard, IA, One Zone-IA, Intelligent-Tiering, Glacier Instant/Flexible/Deep Archive) — isso cai muito; consistência forte; bucket policy vs IAM policy vs ACL; Block Public Access; presigned URL como resposta para "compartilhar objeto privado temporariamente".

**Pegadinha clássica:** "dados acessados raramente mas que precisam estar disponíveis em milissegundos" → Glacier Instant Retrieval, não Flexible. "Dado reproduzível, acesso raro, menor custo" → One Zone-IA.

**Custo:** centavos.

---

## Fase 2 — Elasticidade e alta disponibilidade (semanas 5-8)

Domínio: Resilient Architectures (26%). **A partir daqui, tudo em IaC.**

### Semana 5 — ALB + Auto Scaling Group

**Construir:** launch template com user data que serve uma página mostrando o ID da instância. ASG com min 2, max 4, spread em 2 AZs. ALB na frente com health check. Mate uma instância manualmente e veja o ASG recriar. Gere carga (`stress` ou `ab`) e veja o target tracking escalar.

**Conceitos de prova:** ALB (L7, path/host routing) vs NLB (L4, IP estático, altíssima performance) vs GWLB; target tracking vs step scaling vs scheduled; health check do ELB vs do EC2; cooldown; por que o ASG deve usar health check do ELB.

**Pegadinha clássica:** "precisa de IP estático / suporte a milhões de req/s / protocolo TCP não-HTTP" → NLB. "Roteamento por caminho de URL para microserviços" → ALB.

**Custo:** ALB ~US$0,50/dia. Destrua.

---

### Semana 6 — RDS: Multi-AZ e réplicas de leitura

**Construir:** RDS MySQL Multi-AZ na subnet privada. Conecte pela EC2. Force um failover pelo console e cronometre a indisponibilidade. Crie uma read replica e aponte uma query nela. Teste a promoção da réplica a instância independente.

**Conceitos de prova:** **Multi-AZ = disponibilidade (síncrono, standby não serve tráfego, failover automático via DNS)** vs **Read Replica = escala de leitura (assíncrono, serve tráfego, promoção manual)**. Essa distinção é uma das mais cobradas da prova inteira. Também: backup automático vs snapshot manual, retenção, cross-region replica, RDS Proxy.

**Pegadinha clássica:** questão diz "melhorar performance de leitura" → réplica. Diz "sobreviver à falha de uma AZ" → Multi-AZ. Se disser as duas coisas, a resposta usa as duas.

**Custo:** db.t3.micro tem free tier, mas **Multi-AZ não tem**. Ligue, teste o failover, destrua no mesmo dia.

---

### Semana 7 — Aurora e ElastiCache

**Construir:** cluster Aurora Serverless v2 mínimo, veja os endpoints (writer/reader) separados. Depois: ElastiCache Redis na frente de um banco, com uma aplicaçãozinha implementando cache-aside — mede o tempo com e sem cache.

**Conceitos de prova:** Aurora (storage compartilhado em 6 cópias/3 AZs, até 15 réplicas, failover em ~30s, Global Database para DR cross-region); Redis (persistência, réplicas, pub/sub, sorted sets) vs Memcached (multi-thread, sem persistência, puro cache); cache-aside vs write-through; onde entra o DAX (só DynamoDB).

**Pegadinha clássica:** "sessão de usuário compartilhada entre instâncias" → ElastiCache Redis (ou DynamoDB). "Precisa de failover e persistência no cache" → Redis, nunca Memcached.

**Custo:** os dois cobram por hora. Sessão curta e destrua.

---

### Semana 8 — Storage compartilhado e replicação

**Construir:** EFS montado simultaneamente em duas EC2 em AZs diferentes — escreva de uma, leia da outra. Configure S3 Cross-Region Replication entre dois buckets e observe o delay. Olhe (sem provisionar) os tipos de FSx no console.

**Conceitos de prova:** EBS (1 instância, 1 AZ, bloco) vs EFS (NFS, multi-AZ, Linux, elástico) vs FSx for Windows (SMB/Active Directory) vs FSx for Lustre (HPC, integra com S3) vs S3 (objeto); EFS Standard vs One Zone; requisitos de CRR (versionamento nos dois lados).

**Pegadinha clássica:** "vários servidores Linux precisam do mesmo file system" → EFS. "Aplicação Windows precisa de compartilhamento SMB" → FSx for Windows. "Processamento HPC lendo de S3" → FSx for Lustre.

**Custo:** baixo, mas desmonte o EFS.

---

## Fase 3 — Performance e edge (semanas 9-10)

Domínio: High-Performing Architectures (24%).

### Semana 9 — Route 53

**Construir:** registre um domínio barato (~US$3/ano em `.click` ou `.link`) ou use uma hosted zone privada. Configure e teste na prática: simple, weighted (70/30), failover com health check, latency-based. Derrube o endpoint primário e veja o failover acontecer.

**Conceitos de prova:** todas as políticas de roteamento e o cenário de cada uma; alias record vs CNAME (alias funciona no apex do domínio e é grátis); health checks; TTL e seu impacto no failover.

**Pegadinha clássica:** "apontar `exemplo.com` (sem www) para um ALB" → alias record, porque CNAME não funciona no zone apex. Cai com frequência.

**Custo:** US$0,50/mês por hosted zone.

---

### Semana 10 — CloudFront, ACM e WAF

**Construir:** distribuição CloudFront na frente do site estático S3 da semana 4, usando Origin Access Control (bucket 100% privado). Certificado ACM gratuito. Meça o TTFB de uma edge location distante vs origem direta. Adicione uma regra WAF bloqueando um IP ou rate limit.

**Conceitos de prova:** CloudFront (cache de conteúdo, TTL, invalidação, OAC, signed URLs/cookies) vs Global Accelerator (não cacheia, IP anycast, TCP/UDP, failover rápido); ACM precisa estar em **us-east-1** para CloudFront; WAF vs Shield Standard vs Shield Advanced.

**Pegadinha clássica:** "acelerar aplicação global não-HTTP / precisa de IP fixo" → Global Accelerator. "Distribuir conteúdo estático globalmente" → CloudFront.

**Custo:** free tier generoso.

---

## Fase 4 — Serverless e desacoplamento (semanas 11-15)

### Semana 11 — Lambda + API Gateway + DynamoDB

**Construir:** API CRUD completa serverless. Lambda em VPC (e sinta a dor do cold start e da necessidade de VPC endpoint). Configure timeout, memória, variáveis de ambiente. Teste o throttling do API Gateway.

**Conceitos de prova:** limites da Lambda (15 min, 10GB RAM, 512MB-10GB de `/tmp`); concorrência reservada vs provisionada; por que Lambda em VPC não tem internet sem NAT; REST API vs HTTP API vs WebSocket no API Gateway; usage plans e API keys.

**Pegadinha clássica:** "processamento que leva 30 minutos" → não é Lambda, é Fargate/Batch/Step Functions.

**Custo:** free tier cobre tudo.

---

### Semana 12 — DynamoDB a fundo

**Construir:** tabela com partition key + sort key. Crie um GSI e faça uma query que só funciona por ele. Compare `Query` vs `Scan` em 10 mil itens (o tempo vai te ensinar mais que qualquer texto). Ative TTL, Streams, e ligue um Lambda no stream. Teste on-demand vs provisioned.

**Conceitos de prova:** escolha de partition key e hot partition; GSI (chave diferente, capacidade própria, eventual) vs LSI (mesma partition key, criado junto com a tabela); RCU/WCU e cálculo; eventually vs strongly consistent read; DAX (cache em microssegundos, só DynamoDB); Global Tables para multi-região ativo-ativo.

**Pegadinha clássica:** "Scan está lento e caro" → refatorar para Query com GSI, sempre.

**Custo:** free tier.

---

### Semana 13 — SQS e SNS: desacoplamento

**Construir:** produtor → SQS → consumidor Lambda. Force uma falha e veja a mensagem voltar após o visibility timeout, e depois cair na DLQ. Monte um fanout SNS → 3 SQS. Compare Standard vs FIFO na prática (ordem e duplicação).

**Conceitos de prova:** visibility timeout (deve ser ≥ timeout da Lambda); long polling vs short polling; DLQ e maxReceiveCount; FIFO (300 msg/s, ordem garantida, exactly-once) vs Standard (ilimitado, at-least-once, ordem best-effort); SNS fanout; retenção máxima de 14 dias.

**Pegadinha clássica:** "mensagens sendo processadas em duplicidade" → visibility timeout curto demais. "Precisa de ordem estrita" → FIFO. "Um evento, múltiplos destinos" → SNS fanout.

**Custo:** free tier.

---

### Semana 14 — EventBridge e Step Functions

**Construir:** regra EventBridge que dispara com evento de EC2 mudando de estado. Uma regra agendada (cron) chamando Lambda. Depois: uma Step Function com escolha condicional, retry, catch e execução paralela — por exemplo, um pipeline de aprovação de pedido.

**Conceitos de prova:** EventBridge (event bus, schema registry, integra com SaaS, filtro por padrão) vs SNS (pub/sub simples) vs SQS (fila); Standard vs Express workflow no Step Functions; orquestração vs coreografia.

**Pegadinha clássica:** "reagir a mudanças de estado de serviços AWS" → EventBridge. "Substituir cron server" → EventBridge Scheduler. "Coordenar múltiplos passos com estado e retry" → Step Functions.

**Custo:** free tier.

---

### Semana 15 — Streaming e data lake

**Construir:** Kinesis Data Streams recebendo eventos de um script. Firehose entregando para S3 particionado por data. Glue Crawler catalogando. Athena consultando com SQL. Compare tudo isso mentalmente com "por que não SQS?".

**Conceitos de prova:** Kinesis Data Streams (shards, retenção 1-365 dias, múltiplos consumidores lendo o mesmo dado, ordem por shard) vs SQS (mensagem some após consumo, um consumidor lógico); Firehose (near real-time, zero gestão, destino S3/Redshift/OpenSearch); Athena (serverless, cobra por TB escaneado — daí a importância de Parquet e particionamento); Redshift vs Athena vs EMR.

**Pegadinha clássica:** "múltiplas aplicações precisam consumir o mesmo stream" → Kinesis, não SQS. "Análise ad-hoc sobre dados no S3 sem infra" → Athena.

**Custo:** shard do Kinesis ~US$0,36/dia. Destrua.

---

## Fase 5 — Containers, operação e segurança (semanas 16-18)

### Semana 16 — ECS Fargate e ECR

**Construir:** dockerize uma app simples, push no ECR, task definition com task role (não execution role — entenda a diferença), service no Fargate atrás do ALB, com autoscaling. Faça um deploy de nova versão e observe o rolling update.

**Conceitos de prova:** ECS EC2 vs ECS Fargate vs EKS vs App Runner; task role (permissão da sua aplicação) vs task execution role (permissão do ECS para puxar imagem e escrever log); modos de rede; quando a resposta é "containers sem gerenciar servidor" → Fargate.

**Pegadinha clássica:** "quer Kubernetes, portabilidade multi-cloud" → EKS. "Só quer rodar container, menor overhead operacional" → Fargate.

**Custo:** Fargate cobra por segundo. Algumas horas = centavos.

---

### Semana 17 — Observabilidade e operação

**Construir:** métrica customizada no CloudWatch a partir da app. Log group com Metric Filter que conta erros e dispara alarme → SNS → seu e-mail. Dashboard. X-Ray tracing na API da semana 11. AWS Config com uma regra (ex: "bucket S3 não pode ser público") e veja a detecção. SSM Parameter Store guardando config.

**Conceitos de prova:** CloudWatch (métricas, logs, alarmes, EventBridge) vs CloudTrail (auditoria de chamadas de API) vs Config (conformidade de configuração ao longo do tempo) — a prova testa exatamente essa distinção; métricas básicas (5 min) vs detalhadas (1 min); memória e disco da EC2 exigem o CloudWatch Agent, não vêm por padrão.

**Pegadinha clássica:** "quem deletou esse bucket?" → CloudTrail. "esse recurso está fora do padrão de compliance?" → Config. "a CPU passou de 80%?" → CloudWatch.

**Custo:** baixo.

---

### Semana 18 — Segurança e governança

**Construir:** chave KMS customer-managed, criptografe um objeto S3 e um volume EBS com ela; remova a permissão da chave e veja o acesso quebrar (isso ensina envelope encryption de verdade). Secrets Manager com rotação automática de senha do RDS. Cognito user pool protegendo a API da semana 11. Ative GuardDuty. Crie uma SCP em Organizations bloqueando uma região.

**Conceitos de prova:** SSE-S3 vs SSE-KMS vs SSE-C vs client-side; KMS é regional, chave não sai do serviço; Secrets Manager (rotação automática, custa) vs Parameter Store (grátis, sem rotação nativa); SCP limita permissão máxima mas **não concede** nada; GuardDuty (detecção de ameaça) vs Inspector (vulnerabilidade) vs Macie (dado sensível em S3).

**Pegadinha clássica:** "credencial de banco com rotação automática" → Secrets Manager. "config de app não-sensível, custo zero" → Parameter Store.

**Custo:** ~US$1/mês por chave KMS. GuardDuty tem 30 dias grátis.

---

## Fase 6 — Migração, DR e custo (semanas 19-20)

Domínio: Cost-Optimized Architectures (20%).

### Semana 19 — Híbrido e migração

**Construir:** duas VPCs com peering, testando conectividade. Suba um Transit Gateway conectando três VPCs e compare a complexidade de rotas com o peering. DataSync copiando de EFS para S3. Storage Gateway (File Gateway) em modo teste. DMS não precisa provisionar — leia a documentação de source/target suportados.

**Conceitos de prova:** VPC Peering (não é transitivo — cai muito) vs Transit Gateway (hub-and-spoke, transitivo); Site-to-Site VPN (rápido de subir, internet pública, ~1.25 Gbps) vs Direct Connect (dedicado, semanas para provisionar, latência consistente) vs DX + VPN como backup; Snowball vs Snowmobile vs DataSync — a regra prática é o tempo de transferência pela rede; DMS + SCT para mudança de engine.

**Pegadinha clássica:** "VPC A fala com B, B fala com C, A precisa falar com C" → peering não resolve, precisa de TGW. "500 TB para migrar com link ruim" → Snowball.

**Custo:** TGW cobra por anexo. Sessão curta.

---

### Semana 20 — DR, custo e revisão final

**Construir:** monte um **pilot light** — AMI + snapshot RDS + template CloudFormation em outra região, e cronometre quanto leva para subir tudo. Configure AWS Backup com plano automatizado. Abra Cost Explorer, Trusted Advisor e Compute Optimizer e leia o que eles dizem sobre a sua própria conta destes 20 semanas.

**Conceitos de prova:** as quatro estratégias de DR e seus RTO/RPO — Backup & Restore (horas, mais barato), Pilot Light (dezenas de min), Warm Standby (minutos), Multi-Site Active-Active (~zero, mais caro). A prova dá RTO/RPO e pede a estratégia mais barata que atende; Savings Plans vs Reserved Instances; S3 Intelligent-Tiering para padrão de acesso desconhecido.

**Fechamento:** releia seu caderno de erros inteiro. Faça um simulado completo cronometrado. Destrua **tudo** e confirme fatura zerada.

---

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