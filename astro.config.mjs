import { defineConfig } from 'astro/config'

export default defineConfig({
  markdown: {
    // dual themes so code blocks follow the page's light/dark mode
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
    },
  },
})
