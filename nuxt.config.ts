// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  srcDir: "src/",

  googleFonts: {
    families: {
      Inter: true,
      Roboto: true,
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage",
    storageKey: "nuxt-color-mode",
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@hebilicious/vue-query-nuxt",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
});
