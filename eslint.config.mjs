import prettierConfig from "eslint-config-prettier";
import tanstackConfig from "@tanstack/eslint-plugin-query";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(prettierConfig, tanstackConfig.configs["flat/recommended"]);
