import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt Extended Template",
  description: "A highly opinionated nuxt template",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/introduction" },
    ],

    sidebar: [
      {
        text: "Introdução",
        link: "/introduction.html",
      },
      {
        text: "Instalação",
        link: "/instalation.html",
      },
      {
        text: "Arquitetura",
        link: "/_.html",
      },
      {
        text: "Dependências",
        link: "/_.html",
      },
      {
        text: "Guia de Estilo",
        link: "/_.html",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
