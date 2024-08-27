# `app.vue`

O arquivo `app.vue` é o componente principal da sua aplicação Nuxt.

## Uso Mínimo

Com o Nuxt 3, o diretório [`pages/`](/directory/01-src-pages.html) é opcional. Se não estiver presente, o Nuxt não incluirá a dependência do [vue-router](https://router.vuejs.org). Isso é útil ao trabalhar em SPA ou em uma aplicação que não precisa de roteamento.

```vue
<!-- app.vue -->
<template>
  <h1>Hello World!</h1>
</template>
```

> [!TIP] DICA  
> Veja um exemplo simples de "Hello World" [aqui](https://nuxt.com/docs/examples/hello-world).

## Uso com Páginas

Se você tiver um diretório [`pages/`](/directory/01-src-pages.html), para exibir a página atual, use o componente [`<NuxtPage>`](https://nuxt.com/docs/api/components/nuxt-page):

```vue
<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

> [!WARNING] AVISO  
> Como o [`<NuxtPage>`](https://nuxt.com/docs/api/components/nuxt-page) usa internamente o componente [`<Suspense>`](https://vuejs.org/guide/built-ins/suspense.html#suspense) do Vue, ele não pode ser definido como um elemento raiz.

> [!NOTE] NOTA  
> Lembre-se de que `app.vue` atua como o componente principal da sua aplicação Nuxt. Qualquer coisa que você adicionar a ele (JS e CSS) será global e incluída em todas as páginas.

> [!TIP] DICA  
> Se você quiser ter a possibilidade de personalizar a estrutura ao redor da página entre diferentes páginas, confira o diretório [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts).
