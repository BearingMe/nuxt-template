# `composables`

Use a pasta `composables/` para auto-importar seus composables Vue na sua aplicação.

Composable são funções reutilizáveis que podem ser usadas em vários componentes Vue. Semelhante aos hooks do React, os composables Vue são uma maneira de compartilhar lógica entre componentes sem a necessidade de herança de componentes ou mixins.

## Uso

**Método 1:** Usando exportação nomeada

```js [composables/useFoo.ts]
export const useFoo = () => {
  return useState("foo", () => "bar");
};
```

**Método 2:** Usando exportação padrão

```js [composables/use-foo.ts ou composables/useFoo.ts]
// Estará disponível como useFoo() (camelCase do nome do arquivo sem a extensão)
export default function () {
  return useState("foo", () => "bar");
}
```

**Uso:** Agora você pode usar o composable auto-importado em arquivos `.js`, `.ts` e `.vue`

```vue [app.vue]
<script setup lang="ts">
const foo = useFoo();
</script>

<template>
  <div>
    {{ foo }}
  </div>
</template>
```

> [!INFO] INFORMAÇÃO  
> O diretório `composables/` no Nuxt não fornece nenhuma capacidade adicional de reatividade ao seu código. Em vez disso, qualquer reatividade dentro dos composables é alcançada usando os mecanismos da Composition API do Vue, como `ref` e `reactive`. Note que o código reativo também não está limitado aos limites do diretório `composables/`. Você é livre para empregar recursos de reatividade onde for necessário na sua aplicação.

> [!TIP] DICA  
> Saiba mais sobre auto-importação de composables [aqui](https://nuxt.com/docs/guide/concepts/auto-imports).

## Tipos

Nos bastidores, o Nuxt gera automaticamente o arquivo `.nuxt/imports.d.ts` para declarar os tipos.

Esteja ciente de que você precisa executar [`nuxi prepare`](https://nuxt.com/docs/api/commands/prepare), [`nuxi dev`](https://nuxt.com/docs/api/commands/dev) ou [`nuxi build`](https://nuxt.com/docs/api/commands/build) para que o Nuxt gere os tipos.

> [!NOTE] NOTA  
> Se você criar um composable sem ter o servidor de desenvolvimento rodando, o TypeScript gerará um erro, como `Cannot find name 'useBar'.`

## Exemplos

### Composables Aninhados

Você pode usar um composable dentro de outro composable usando auto-importações:

```js [composables/test.ts]
export const useFoo = () => {
  const nuxtApp = useNuxtApp();
  const bar = useBar();
};
```

### Acessar injeções de plugins

Você pode acessar [injeções de plugins](https://nuxt.com/docs/guide/directory-structure/plugins#automatically-providing-helpers) a partir dos composables:

```js [composables/test.ts]
export const useHello = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$hello;
};
```

## Como os Arquivos São Escaneados

O Nuxt só escaneia arquivos no nível superior do [diretório `composables/`](https://nuxt.com/docs/guide/directory-structure/composables), por exemplo:

```bash [Estrutura de Diretórios]
| composables/
---| index.ts     // escaneado
---| useFoo.ts    // escaneado
-----| nested/
-------| utils.ts // não escaneado
```

Somente `composables/index.ts` e `composables/useFoo.ts` seriam pesquisados para importações.

Para que as auto-importações funcionem para módulos aninhados, você pode re-exportá-los (recomendado) ou configurar o scanner para incluir diretórios aninhados:

**Exemplo:** Re-exporte os composables que você precisa no arquivo `composables/index.ts`:

```ts [composables/index.ts]
// Habilita auto-importação para esta exportação
export { utils } from "./nested/utils.ts";
```

**Exemplo:** Escaneie diretórios aninhados dentro da pasta `composables/`:

```ts twoslash [nuxt.config.ts]
export default defineNuxtConfig({
  imports: {
    dirs: [
      // Escaneia os módulos de nível superior
      "composables",
      // ... ou escaneie módulos aninhados um nível abaixo com um nome específico e extensão de arquivo
      "composables/*/index.{ts,js,mjs,mts}",
      // ... ou escaneie todos os módulos dentro de um diretório específico
      "composables/**",
    ],
  },
});
```
