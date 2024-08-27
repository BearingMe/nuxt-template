# `layouts`

O Nuxt fornece uma estrutura de layouts para extrair padrões comuns de UI em layouts reutilizáveis.

> [!TIP] DICA  
> Para melhor desempenho, os componentes colocados neste diretório serão automaticamente carregados via importação assíncrona quando utilizados.

> [!NOTE] NOTA
> Nesse template o layout padrão já está configurado em `app.vue`. Você pode remover o arquivo `default.vue` se não precisar dele.

## Ativar Layouts

Os layouts são ativados adicionando [`<NuxtLayout>`](https://nuxt.com/docs/api/components/nuxt-layout) ao seu [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app):

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

Para usar um layout:

- Defina uma propriedade `layout` em sua página com [definePageMeta](https://nuxt.com/docs/api/utils/define-page-meta).
- Defina a prop `name` do `<NuxtLayout>`.

> [!NOTE] NOTA  
> O nome do layout é normalizado para kebab-case, então `someLayout` se torna `some-layout`.

> [!NOTE] NOTA  
> Se nenhum layout for especificado, `layouts/default.vue` será utilizado.

> [!IMPORTANT] IMPORTANTE  
> Se você tiver apenas um layout em sua aplicação, recomendamos usar [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app) em vez disso.

> [!IMPORTANT] IMPORTANTE  
> Ao contrário de outros componentes, seus layouts devem ter um único elemento raiz para permitir que o Nuxt aplique transições entre mudanças de layout - e esse elemento raiz não pode ser um `<slot />`.

## Layout Padrão

Adicione um `~/layouts/default.vue`:

```vue [layouts/default.vue]
<template>
  <div>
    <p>Algum conteúdo de layout padrão compartilhado entre todas as páginas</p>
    <slot />
  </div>
</template>
```

Em um arquivo de layout, o conteúdo da página será exibido no componente `<slot />`.

## Layout Nomeado

```bash [Estrutura de Diretórios]
-| layouts/
---| default.vue
---| custom.vue
```

Então você pode usar o layout `custom` em sua página:

```vue twoslash [pages/about.vue]
<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
```

> [!TIP] DICA  
> Saiba mais sobre `definePageMeta` [aqui](https://nuxt.com/docs/guide/directory-structure/pages#page-metadata).

Você pode substituir diretamente o layout padrão para todas as páginas usando a propriedade `name` de [`<NuxtLayout>`](https://nuxt.com/docs/api/components/nuxt-layout):

```vue [app.vue]
<script setup lang="ts">
// Você pode escolher isso com base em uma chamada de API ou no status de login
const layout = "custom";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
```

Se você tiver um layout em diretórios aninhados, o nome do layout será baseado em seu próprio caminho de diretório e nome de arquivo, com segmentos duplicados sendo removidos.

| Arquivo                           | Nome do Layout    |
| --------------------------------- | ----------------- |
| `~/layouts/desktop/default.vue`   | `desktop-default` |
| `~/layouts/desktop-base/base.vue` | `desktop-base`    |
| `~/layouts/desktop/index.vue`     | `desktop`         |

Para maior clareza, recomendamos que o nome do arquivo do layout corresponda ao seu nome:

| Arquivo                                  | Nome do Layout    |
| ---------------------------------------- | ----------------- |
| `~/layouts/desktop/DesktopDefault.vue`   | `desktop-default` |
| `~/layouts/desktop-base/DesktopBase.vue` | `desktop-base`    |
| `~/layouts/desktop/Desktop.vue`          | `desktop`         |

> [!TIP] DICA  
> Veja um exemplo sobre layouts [aqui](https://nuxt.com/docs/examples/features/layouts).

## Alterando o Layout Dinamicamente

Você também pode usar o helper [`setPageLayout`](https://nuxt.com/docs/api/utils/set-page-layout) para alterar o layout dinamicamente:

```vue twoslash
<script setup lang="ts">
function enableCustomLayout() {
  setPageLayout("custom");
}
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <button @click="enableCustomLayout">Atualizar layout</button>
  </div>
</template>
```

## Substituindo o Layout base da Página

Se você estiver usando [`pages`](/directory/01-src-pages.html), você pode ter controle total definindo `layout: false` e depois usando o componente `<NuxtLayout>` dentro da página.

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Algum conteúdo de template de cabeçalho. </template>

      O restante da página
    </NuxtLayout>
  </div>
</template>
```

```vue
<!-- layouts/custom.vue -->
<template>
  <div>
    <header>
      <slot name="header"> Conteúdo padrão do cabeçalho </slot>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
```

> [!IMPORTANT] IMPORTANTE  
> Se você usar `<NuxtLayout>` dentro de suas páginas, certifique-se de que não seja o elemento raiz (ou [desative as transições de layout/página](https://nuxt.com/docs/getting-started/transitions#disable-transitions)).
