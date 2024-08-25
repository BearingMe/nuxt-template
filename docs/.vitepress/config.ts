import { defineConfig } from "vitepress";

const documentationItems = [
  {
    text: "Introdução",
    link: "/docs/introduction.html",
  },
  {
    text: "Instalação",
    link: "/docs/instalation.html",
  },
  {
    text: "Arquitetura",
    link: "/docs/_.html",
  },
  {
    text: "Dependências",
    link: "/docs/_.html",
  },
];

const directoryItems = [
  {
    text: ".nuxt",
    link: "/directory/00-dot-nuxt.html",
  },
  {
    text: ".output",
    link: "/directory/00-dot-output.html",
  },
  {
    text: "src/assets",
    link: "/directory/01-src-assets.html",
  },
  {
    text: "src/components",
    link: "/directory/01-src-components.html",
  },
  {
    text: "src/composables",
    link: "/directory/01-src-composables.html",
  },
  {
    text: "src/layouts",
    link: "/directory/01-src-layouts.html",
  },
  {
    text: "src/lib",
    link: "/directory/01-src-lib.html",
  },
  {
    text: "src/middleware",
    link: "/directory/01-src-middleware.html",
  },
  {
    text: "src/pages",
    link: "/directory/01-src-pages.html",
  },
  {
    text: "src/public",
    link: "/directory/01-src-public.html",
  },
  {
    text: "src/utils",
    link: "/directory/01-src-utils.html",
  },
  {
    text: "src/app.vue",
    link: "/directory/02-app-vue.html",
  },
  {
    text: "src/error.vue",
    link: "/directory/02-error-vue.html",
  },
  {
    text: "app.config.ts",
    link: "/directory/02-app-config-ts.html",
  },
  {
    text: "nuxt.config.ts",
    link: "/directory/02-nuxt-config-ts.html",
  },
  {
    text: ".env",
    link: "/directory/03-dot-env.html",
  },
];

const styleGuideItems = [
  {
    text: "Visão geral",
    link: "/style-guide/",
  },
  {
    text: "A - Essencial",
    link: "/style-guide/rules-essential",
  },
  {
    text: "B - Altamente Recomendado",
    link: "/style-guide/rules-strongly-recommended",
  },
  {
    text: "C - Recomendado",
    link: "/style-guide/rules-recommended",
  },
  {
    text: "D - Use com Cautela",
    link: "/style-guide/rules-use-with-caution",
  },
];

const referencesItems = [
  {
    text: "Nuxt",
    link: "https://nuxtjs.org",
  },
  {
    text: "Vue",
    link: "https://vuejs.org",
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt Extended Template",
  description: "A highly opinionated nuxt template",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Docs",
        items: [
          { text: "Documentação", link: "/docs/introduction.html" },
          { text: "Estrutura de arquivos", link: "/directory/.nuxt.html" },
          { text: "Guia de Estilo", link: "/style-guide/" },
        ],
      },
      { text: "Referências", items: referencesItems },
    ],

    sidebar: [
      {
        text: "Documentação",
        items: documentationItems,
      },
      {
        text: "Estrutura de arquivos",
        items: directoryItems,
      },
      {
        text: "Guia de Estilo",
        items: styleGuideItems,
      },
      {
        text: "Referências",
        items: referencesItems,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
