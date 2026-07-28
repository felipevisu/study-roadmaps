# study-plan

Site de roadmaps de estudo. Uma página por semana, progresso calculado no build
a partir do frontmatter dos arquivos markdown. Sem banco, sem backend, sem admin.

```bash
npm run dev      # http://localhost:4321
npm run build    # gera ./dist — HTML estático puro
npm run preview  # serve o ./dist
```

## Estrutura

```
src/content/
  roadmaps/<id>.md        # título, subtítulo, cor, + regras/apêndices do plano
  weeks/<id>/NN-slug.md   # uma semana: frontmatter de progresso + plano + diário
```

`roads/AWS.md` e `roads/RAG.md` são os originais. O site não os lê — foram
divididos em `src/content/weeks/`. Servem como referência.

## Rotina semanal

Abra o arquivo da semana, edite três coisas:

```yaml
---
roadmap: aws
week: 2
title: "VPC do zero"
phase: "Fundamentos (semanas 1-4)"
status: done            # todo | doing | done | skipped
done_at: 2026-08-03     # opcional, aparece na lista e na página
pocs:                   # opcional, url também é opcional
  - label: "VPC + NAT + SSM, tudo em Terraform"
    url: "https://github.com/voce/saa-poc-02"
  - label: "Caderno de erros — semana 2"
---
```

E escreva embaixo de `## Diário`, no corpo do arquivo. Markdown normal:
texto, listas, tabelas, blocos de código (com syntax highlight), links, imagens.

O plano original da semana fica acima do diário. Edite à vontade — não tem nada
de sagrado nele.

### O mapa

A página de cada roadmap abre com **O caminho**: as semanas dispostas em
serpentina, 5 por linha, ligadas por linhas e setas. A direção alterna a cada
linha (→ depois ←), então o caminho nunca "pula" de um lado ao outro. Blocos
concluídos ficam chapados no accent e propagam a cor para o conector de saída,
então dá pra ver até onde a trilha avançou.

Nada a configurar — o mapa lê as mesmas semanas da lista. Roadmap com número de
semanas que não fecha múltiplo de 5 encosta a última linha na borda certa
sozinho.

### Como o progresso é calculado

A barra tem **uma célula por semana**, não uma porcentagem esticada:

- célula preenchida com o accent = `done`
- célula listrada = `doing`
- célula vazia = `todo`
- célula cortada na diagonal = `skipped`

O `%` do topo é `done / (total − skipped)` — semanas puladas saem do
denominador, então a barra ainda chega a 100%.

## Adicionar um roadmap novo

1. `src/content/roadmaps/<id>.md` — copie o frontmatter de um existente
   (`title`, `subtitle`, `accent`, `order`). O corpo é livre: regras, leituras,
   o que for. `<id>` vira a URL.
2. `src/content/weeks/<id>/01-primeira-semana.md`, etc. `roadmap:` no
   frontmatter precisa bater com o `<id>`.

Nenhum código muda. As rotas, a home e as barras aparecem sozinhas no próximo build.

O `accent` colore aquele roadmap inteiro (células da barra, bolinhas de status,
bordas, links). **Escolha um tom médio a escuro** — o accent é usado como
*texto* sobre fundo claro, então cor muito clara não tem contraste. O modo
escuro clareia sozinho (ver [Estilo](#estilo)).

## Estilo

Claro e leve: hairlines em vez de réguas grossas, espaço em branco em vez de
peso tipográfico, accent como sinal (bolinhas, preenchimentos finos) e não como
superfície. Segue `prefers-color-scheme`. Tudo em `src/styles/global.css`, sem
framework de CSS.

O accent de cada roadmap entra como `--accent` no `<body>`; o CSS deriva `--ac`
a partir dele e clareia no modo escuro, então a mesma cor funciona nos dois
modos como texto. Por isso `--ac` é declarado no `body` e não no `:root` — só
assim ele enxerga o valor inline.

## Deploy

`npm run build` cospe `./dist`, HTML estático sem JS. Sobe em qualquer lugar —
GitHub Pages, Cloudflare Pages, Netlify, um bucket S3 (apropriado, dado o
roadmap). Nada configurado ainda.
