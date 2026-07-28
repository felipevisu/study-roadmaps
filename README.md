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

O `accent` colore aquele roadmap inteiro (células da barra, faixas de fase,
numeral gigante, hover). **Escolha uma cor viva e clara** — o texto sobre os
blocos de accent é sempre preto, então accent escuro fica ilegível.

## Estilo

Brutalista editorial: sem border-radius, réguas duras, numerais gigantes,
accent chapado. Segue `prefers-color-scheme` — papel/tinta no claro, invertido
no escuro. Tudo em `src/styles/global.css`, sem framework de CSS.

## Deploy

`npm run build` cospe `./dist`, HTML estático sem JS. Sobe em qualquer lugar —
GitHub Pages, Cloudflare Pages, Netlify, um bucket S3 (apropriado, dado o
roadmap). Nada configurado ainda.
