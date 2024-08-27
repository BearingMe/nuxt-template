# `pages`

O Nuxt fornece roteamento baseado em arquivos para criar rotas dentro da sua aplicação web.

> [!NOTE] NOTA  
> Para reduzir o tamanho do bundle da sua aplicação, este diretório é **opcional**, o que significa que o [`vue-router`](https://router.vuejs.org) não será incluído se você usar apenas o [`app.vue`](/directory/01-src-app-vue.html).

## Uso

Páginas são componentes Vue e podem ter qualquer [extensão válida](https://nuxt.com/docs/api/configuration/nuxt-config#extensions) que o Nuxt suporta (por padrão `.vue`, `.js`, `.jsx`, `.mjs`, `.ts` ou `.tsx`).

O Nuxt criará automaticamente uma rota para cada página no diretório `~/pages/`.

```vue
<!-- pages/index.vue -->
<template>
  <h1>Página inicial</h1>
</template>
```

```ts
// pages/index.ts
export default defineComponent({
  render() {
    return h("h1", "Página inicial");
  },
});
```

```tsx
// pages/index.tsx
export default defineComponent({
  render() {
    return <h1>Página inicial</h1>;
  },
});
```

O arquivo `pages/index.vue` será mapeado para a rota `/` da sua aplicação.

Se você estiver usando o [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app), certifique-se de usar o componente [`<NuxtPage/>`](https://nuxt.com/docs/api/components/nuxt-page) para exibir a página atual:

```vue [app.vue]
<template>
  <div>
    <!-- Markup compartilhado entre todas as páginas, ex: NavBar -->
    <NuxtPage />
  </div>
</template>
```

As páginas **devem ter um único elemento raiz** para permitir [transições de rota](https://nuxt.com/docs/getting-started/transitions) entre as páginas. Comentários HTML também são considerados elementos, logo não devem ser deixado na raiz do componente.

Aqui estão alguns exemplos para ilustrar como uma página com um único elemento raiz deve se parecer:

```vue [pages/working.vue]
<template>
  <div>
    <!-- Esta página tem corretamente apenas um único elemento raiz -->
    Conteúdo da página
  </div>
</template>
```

```vue [pages/bad-1.vue]
<template>
  <!-- Esta página não será renderizada quando a rota mudar durante a navegação no lado do cliente, por causa deste comentário -->
  <div>Conteúdo da página</div>
</template>
```

```vue [pages/bad-2.vue]
<template>
  <div>Esta página</div>
  <div>Tem mais de um elemento raiz</div>
  <div>E não será renderizada quando a rota mudar durante a navegação no lado do cliente</div>
</template>
```

## Rotas Dinâmicas

Se você colocar algo entre colchetes, ele será transformado em um parâmetro de [rota dinâmica](https://router.vuejs.org/guide/essentials/dynamic-matching.html). Você pode misturar e combinar vários parâmetros e até mesmo texto não dinâmico dentro de um nome de arquivo ou diretório.

Se você quiser que um parâmetro seja _opcional_, deve colocá-lo entre colchetes duplos - por exemplo, `~/pages/[[slug]]/index.vue` ou `~/pages/[[slug]].vue` corresponderá tanto a `/` quanto a `/test`.

```bash [Estrutura de Diretórios]
-| pages/
---| index.vue
---| users-[group]/
-----| [id].vue
```

Dado o exemplo acima, você pode acessar group/id dentro do seu componente via o objeto `$route`:

```vue [pages/users-[group\]/[id\].vue]
<template>
  <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
</template>
```

Navegar para `/users-admins/123` renderizaria:

```html
<p>admins - 123</p>
```

Se você quiser acessar a rota usando a Composition API, há uma função global [`useRoute`](https://nuxt.com/docs/api/composables/use-route) que permitirá que você acesse a rota da mesma forma que `this.$route` na Options API.

```vue twoslash
<script setup lang="ts">
const route = useRoute();

if (route.params.group === "admins" && !route.params.id) {
  console.log("Aviso! Certifique-se de que o usuário está autenticado!");
}
</script>
```

> [!NOTE] NOTA  
> Rotas pai nomeadas terão prioridade sobre rotas dinâmicas aninhadas. Para a rota `/foo/hello`, `~/pages/foo.vue` terá prioridade sobre `~/pages/foo/[slug].vue`.  
> Use `~/pages/foo/index.vue` e `~/pages/foo/[slug].vue` para corresponder a `/foo` e `/foo/hello` com páginas diferentes.

## Rota Catch-all

Se você precisar de uma rota catch-all, crie-a usando um arquivo nomeado como `[...slug].vue`. Isso corresponderá a _todas_ as rotas sob esse caminho.

```vue [pages/[...slug\].vue]
<template>
  <p>{{ $route.params.slug }}</p>
</template>
```

Navegar para `/hello/world` renderizaria:

```html
<p>["hello", "world"]</p>
```

## Grupos de Rotas

Em alguns casos, você pode querer agrupar um conjunto de rotas de uma maneira que não afete o roteamento baseado em arquivos. Para isso, você pode colocar arquivos em uma pasta envolvida por parênteses - `(` e `)`.

Por exemplo:

```bash [Estrutura de Diretórios]
-| pages/
---| index.vue
---| (marketing)/
-----| about.vue
-----| contact.vue
```

Isso produzirá as páginas `/`, `/about` e `/contact` na sua aplicação. O grupo `marketing` é ignorado para fins de estrutura de URL.

## Metadados da Página

Você pode querer definir metadados para cada rota na sua aplicação. Você pode fazer isso usando a macro `definePageMeta`, que funcionará tanto em `<script>` quanto em `<script setup>`:

```vue twoslash
<script setup lang="ts">
definePageMeta({
  title: 'Minha página inicial'
})
</script
```
