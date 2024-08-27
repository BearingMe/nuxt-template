# `components`

A pasta `components/` é onde você coloca todos os seus componentes Vue.

O Nuxt importa automaticamente qualquer componente neste diretório (junto com componentes que são registrados por qualquer módulo que você esteja utilizando).

```bash [Estrutura de Diretórios]
| components/
--| AppHeader.vue
--| AppFooter.vue
```

```html [app.vue]
<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
```

## Nomes dos Componentes

Se você tiver um componente em diretórios aninhados, como:

```bash [Estrutura de Diretórios]
| components/
--| base/
----| foo/
------| Button.vue
```

Então o nome do componente será baseado no seu próprio caminho de diretório e nome de arquivo, com segmentos duplicados sendo removidos. Portanto, o nome do componente será:

```html [app.vue]
<BaseFooButton />
```

> [!NOTE] NOTA
> Para maior clareza, recomendamos que o nome do arquivo do componente corresponda ao seu nome. Então, no exemplo acima, você poderia renomear Button.vue para BaseFooButton.vue.

Se você quiser importar componentes automaticamente apenas com base no nome, e não no caminho, então você precisa definir a opção `pathPrefix` como `false` usando a forma estendida do objeto de configuração:

```ts twoslash [nuxt.config.ts]
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false, // [!code ++]
    },
  ],
});
```

Você também pode registrar seletivamente alguns componentes globalmente colocando-os em um `diretório ~/components/global` ou utilizando o sufixo `.global.vue` no nome do arquivo. Como mencionado acima, cada componente global é renderizado em um chunk separado, então tome cuidado para não abusar dessa funcionalidade.

> [!NOTE] NOTA
> A opção global também pode ser configurada por diretório de componentes.

## Importações Dinâmicas

Para importar dinamicamente um componente (também conhecido como lazy-loading de um componente), tudo o que você precisa fazer é adicionar o prefixo Lazy ao nome do componente. Isso é particularmente útil se o componente não for sempre necessário.

Ao usar o prefixo Lazy, você pode adiar o carregamento do código do componente até o momento certo, o que pode ser útil para otimizar o tamanho do bundle de JavaScript.

```vue [pages/index.vue]
<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

## Importações Explícitas

Você também pode importar explicitamente componentes de `#components` se quiser ou precisar contornar a funcionalidade de auto-importação do Nuxt.

```vue [pages/index.vue]
<script setup lang="ts">
import { NuxtLink, LazyMountainsList } from "#components";

const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>
```

## Diretórios Adicionais

Por padrão, apenas o diretório `~/components` é escaneado. Se você quiser adicionar outros diretórios, ou alterar como os componentes são escaneados dentro de uma subpasta deste diretório, você pode adicionar diretórios adicionais à configuração:

```ts twoslash [nuxt.config.ts]
export default defineNuxtConfig({
  components: [
    // ~/calendar-module/components/event/Update.vue => <EventUpdate />
    { path: "~/calendar-module/components" },

    // ~/user-module/components/account/UserDeleteDialog.vue => <UserDeleteDialog />
    { path: "~/user-module/components", pathPrefix: false },

    // ~/components/special-components/Btn.vue => <SpecialBtn />
    { path: "~/components/special-components", prefix: "Special" },

    // É importante que este venha por último se você tiver substituições que deseja aplicar
    // a subdiretórios de `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    "~/components",
  ],
});
```

## Componentes de Pacotes NPM

Se você quiser auto-importar componentes de um pacote npm, você pode usar `addComponent` em um módulo local para registrá-los.

```ts twoslash [~/modules/register-component.ts]
import { addComponent, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup() {
    // import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
    addComponent({
      name: "MyAutoImportedComponent",
      export: "MyComponent",
      filePath: "my-npm-package",
    });
  },
});
```

```vue [app.vue]
<template>
  <div>
    <!--  o componente usa o nome que especificamos e é auto-importado  -->
    <MyAutoImportedComponent />
  </div>
</template>
```

> [!NOTE] NOTA
> Qualquer diretório aninhado precisa ser adicionado primeiro, pois são escaneados em ordem.
