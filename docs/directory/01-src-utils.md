# `utils`

Use a pasta `utils/` para auto-importar suas funções utilitárias em toda a sua aplicação.

O principal objetivo da pasta [`utils/`](https://nuxt.com/docs/guide/directory-structure/utils) é permitir uma distinção semântica entre seus composables Vue e outras funções utilitárias auto-importadas.

## Uso

**Método 1:** Usando exportação nomeada

```ts twoslash [utils/index.ts]
export const { format: formatNumber } = Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 1,
});
```

**Método 2:** Usando exportação padrão

```ts twoslash [utils/random-entry.ts ou utils/randomEntry.ts]
// Estará disponível como randomEntry() (camelCase do nome do arquivo sem a extensão)
export default function (arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

Agora você pode usar as funções utilitárias auto-importadas em arquivos `.js`, `.ts` e `.vue`

```vue [app.vue]
<template>
  <p>{{ formatNumber(1234) }}</p>
</template>
```

> [!TIP] DICA  
> Saiba mais sobre auto-importações [aqui](https://nuxt.com/docs/guide/concepts/auto-imports). Veja também um exemplo prático [aqui](https://nuxt.com/docs/examples/features/auto-imports).

> [!TIP] DICA  
> A forma como as auto-importações de `utils/` funcionam e são escaneadas é idêntica à pasta [`composables/`](/directory/01-src-composables.html).
