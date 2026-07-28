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

`AWS.md` e `RAG.md` na raiz são os originais. O site não os lê — foram
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

- Barra sólida: `done / (total − skipped)`
- Barra listrada logo depois: semanas em `doing`
- `skipped` sai do denominador, então a barra ainda chega a 100%
- Contador de POCs: soma de `pocs` de todas as semanas

## Adicionar um roadmap novo

1. `src/content/roadmaps/<id>.md` — copie o frontmatter de um existente
   (`title`, `subtitle`, `accent`, `order`). O corpo é livre: regras, leituras,
   o que for. `<id>` vira a URL.
2. `src/content/weeks/<id>/01-primeira-semana.md`, etc. `roadmap:` no
   frontmatter precisa bater com o `<id>`.

Nenhum código muda. As rotas, a home e as barras aparecem sozinhas no próximo build.

O `accent` colore aquele roadmap inteiro (barra, links, hover, favicon-dot).

## Deploy

`npm run build` cospe `./dist`, HTML estático sem JS. Sobe em qualquer lugar —
GitHub Pages, Cloudflare Pages, Netlify, um bucket S3 (apropriado, dado o
roadmap). Nada configurado ainda.
