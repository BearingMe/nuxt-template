# `error.vue`

O arquivo `error.vue` é a página de erro na sua aplicação Nuxt.

Durante o ciclo de vida da sua aplicação, alguns erros podem aparecer inesperadamente em tempo de execução. Nesse caso, podemos usar o arquivo `error.vue` para substituir as páginas de erro padrão e exibir o erro de forma mais amigável.

```vue [error.vue]
<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Voltar para a página inicial</NuxtLink>
  </div>
</template>
```

> [!NOTE] NOTA  
> Embora seja chamada de 'página de erro', ela não é uma rota e não deve ser colocada no diretório `~/pages`. Pelo mesmo motivo, você não deve usar `definePageMeta` dentro desta página. Dito isso, você ainda pode usar layouts no arquivo de erro, utilizando o componente [`NuxtLayout`](https://nuxt.com/docs/api/components/nuxt-layout) e especificando o nome do layout.

A página de erro tem uma única prop - `error`, que contém um erro para você manipular.

O objeto `error` fornece os seguintes campos:

```ts
{
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: unknown
  cause?: unknown
}
```

Se você tiver um erro com campos personalizados, eles serão perdidos; você deve atribuí-los a `data` em vez disso:

```ts
throw createError({
  statusCode: 404,
  statusMessage: "Página Não Encontrada",
  data: {
    myCustomField: true,
  },
});
```
