# `nuxt.config.ts`

O arquivo `nuxt.config` pode ter a extensão `.js`, `.ts` ou `.mjs`.

```ts twoslash [nuxt.config.ts]
export default defineNuxtConfig({
  // Minha configuração do Nuxt
});
```

> [!TIP] DICA  
> O helper `defineNuxtConfig` está disponível globalmente sem a necessidade de importação.

Você pode importar explicitamente `defineNuxtConfig` de `nuxt/config` se preferir:

```ts twoslash [nuxt.config.ts]
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Minha configuração do Nuxt
});
```

> [!TIP] DICA  
> Descubra todas as opções disponíveis na documentação de **configuração do Nuxt** [aqui](https://nuxt.com/docs/api/configuration/nuxt-config).

Para garantir que sua configuração esteja atualizada, o Nuxt fará uma reinicialização completa ao detectar alterações no arquivo de configuração principal, nos arquivos `.env` e [`.nuxtignore`](https://nuxt.com/docs/guide/directory-structure/nuxtignore).
