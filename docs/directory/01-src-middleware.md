# `middleware`

O Nuxt fornece um framework de **middleware de rota** personalizável que você pode usar em toda a sua aplicação, ideal para extrair código que você deseja executar antes de navegar para uma rota específica.

Existem três tipos de middleware de rota:

1. Middleware de rota anônimo (ou inline) é definido diretamente na página.
2. Middleware de rota nomeado, colocado na pasta `middleware/` e carregado automaticamente via importação assíncrona quando usado em uma página.
3. Middleware de rota global, colocado na pasta `middleware/` com o sufixo `.global` e executado em cada mudança de rota.

Os dois primeiros tipos de middleware de rota podem ser definidos em [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta).

> [!NOTE] NOTA  
> Os nomes dos middleware são normalizados para kebab-case: `myMiddleware` se torna `my-middleware`.

> [!NOTE] NOTA  
> Middleware de rota são executados dentro da parte Vue da sua aplicação Nuxt. Apesar do nome semelhante, eles são completamente diferentes do [middleware de servidor](https://nuxt.com/docs/guide/directory-structure/server#server-middleware), que são executados na parte do servidor Nitro da sua aplicação.

## Uso

Middleware de rota são guardiões de navegação que recebem a rota atual e a próxima rota como argumentos.

```ts twoslash [middleware/my-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === "1") {
    return abortNavigation();
  }
  // Em uma aplicação real, você provavelmente não redirecionaria todas as rotas para `/`
  // no entanto, é importante verificar `to.path` antes de redirecionar, ou você
  // pode acabar em um loop de redirecionamento infinito
  if (to.path !== "/") {
    return navigateTo("/");
  }
});
```

O Nuxt fornece dois helpers disponíveis globalmente que podem ser retornados diretamente do middleware.

1. [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to) - Redireciona para a rota fornecida.
2. [`abortNavigation`](https://nuxt.com/docs/api/utils/abort-navigation) - Aborta a navegação, com uma mensagem de erro opcional.

Ao contrário dos [guardiões de navegação](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) do `vue-router`, um terceiro argumento `next()` não é passado, e **o redirecionamento ou cancelamento da rota é tratado retornando um valor do middleware**.

Os possíveis valores de retorno são:

- nada (um simples `return` ou nenhum retorno) - não bloqueia a navegação e irá para a próxima função de middleware, se houver, ou completará a navegação da rota.
- `return navigateTo('/')` - redireciona para o caminho fornecido e definirá o código de redirecionamento como [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) se o redirecionamento ocorrer no lado do servidor.
- `return navigateTo('/', { redirectCode: 301 })` - redireciona para o caminho fornecido e definirá o código de redirecionamento como [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) se o redirecionamento ocorrer no lado do servidor.
- `return abortNavigation()` - interrompe a navegação atual.
- `return abortNavigation(error)` - rejeita a navegação atual com um erro.

> [!TIP] DICA  
> Para mais informações sobre `navigateTo`, acesse [aqui](https://nuxt.com/docs/api/utils/navigate-to) e sobre `abortNavigation` [aqui](https://nuxt.com/docs/api/utils/abort-navigation).

> [!IMPORTANT] IMPORTANTE  
> Recomendamos o uso das funções helper acima para realizar redirecionamentos ou parar a navegação. Outros valores de retorno possíveis, descritos na [documentação do vue-router](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards), podem funcionar, mas podem haver mudanças incompatíveis no futuro.

## Ordem dos Middleware

O middleware é executado na seguinte ordem:

1. Middleware Global
2. Ordem do middleware definido na página (se houver múltiplos middlewares declarados com a sintaxe de array)

Por exemplo, assumindo que você tenha o seguinte middleware e componente:

```text [diretório middleware/]
middleware/
--| analytics.global.ts
--| setup.global.ts
--| auth.ts
```

```vue twoslash [pages/profile.vue]
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Middleware inline personalizado
    },
    "auth",
  ],
});
</script>
```

Você pode esperar que o middleware seja executado na seguinte ordem:

1. `analytics.global.ts`
2. `setup.global.ts`
3. Middleware inline personalizado
4. `auth.ts`

### Ordenando Middleware Global

Por padrão, o middleware global é executado em ordem alfabética com base no nome do arquivo.

No entanto, pode haver momentos em que você deseja definir uma ordem específica. Por exemplo, no cenário anterior, `setup.global.ts` pode precisar ser executado antes de `analytics.global.ts`. Nesse caso, recomendamos prefixar o middleware global com numeração 'alfabética'.

```text [Estrutura de Diretórios]
middleware/
--| 01.setup.global.ts
--| 02.analytics.global.ts
--| auth.ts
```

> [!NOTE] NOTA  
> Caso você seja novo na numeração 'alfabética', lembre-se de que os nomes dos arquivos são ordenados como strings, não como valores numéricos. Por exemplo, `10.new.global.ts` viria antes de `2.new.global.ts`. É por isso que o exemplo prefixa números de um dígito com `0`.

## Quando o Middleware é Executado

Se o seu site for renderizado no servidor ou gerado, o middleware para a página inicial será executado tanto quando a página for renderizada quanto novamente no cliente. Isso pode ser necessário se o seu middleware precisar de um ambiente de navegador, como se você tiver um site gerado, respostas cacheadas de forma agressiva ou quiser ler um valor do armazenamento local.

No entanto, se você quiser evitar esse comportamento, pode fazer isso:

```ts twoslash [middleware/example.ts]
export default defineNuxtRouteMiddleware((to) => {
  // pular middleware no servidor
  if (import.meta.server) return;
  // pular middleware no lado do cliente completamente
  if (import.meta.client) return;
  // ou pular middleware apenas no carregamento inicial do cliente
  const nuxtApp = useNuxtApp();
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;
});
```

> [!NOTE] NOTA  
> Renderizar uma página de erro é um carregamento de página totalmente separado, o que significa que qualquer middleware registrado será executado novamente. Você pode usar [`useError`](https://nuxt.com/docs/getting-started/error-handling#useerror) no middleware para verificar se um erro está sendo tratado.

## Adicionando Middleware Dinamicamente

É possível adicionar middleware global ou nomeado manualmente usando a função helper [`addRouteMiddleware()`](https://nuxt.com/docs/api/utils/add-route-middleware), como a partir de um plugin.

```ts twoslash
export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "global-test",
    () => {
      console.log("este middleware global foi adicionado em um plugin e será executado em cada mudança de rota");
    },
    { global: true },
  );

  addRouteMiddleware("named-test", () => {
    console.log(
      "este middleware nomeado foi adicionado em um plugin e substituiria qualquer middleware existente com o mesmo nome",
    );
  });
});
```

## Exemplo

```bash [Estrutura de Diretórios]
-| middleware/
---| auth.ts
```

No arquivo da sua página, você pode referenciar este middleware de rota:

```vue twoslash
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // ou middleware: 'auth'
});
</script>
```

Agora, antes que a navegação para essa página possa ser concluída, o middleware de rota `auth` será executado.

> [!TIP] DICA  
> Veja um exemplo de middleware [aqui](https://nuxt.com/docs/examples/routing/middleware).

## Definindo Middleware no Momento da Build

Em vez de usar `definePageMeta` em cada página, você pode adicionar middleware de rota nomeado dentro do hook `pages:extend`.

```ts twoslash [nuxt.config.ts]
import type { NuxtPage } from "nuxt/schema";

export default defineNuxtConfig({
  hooks: {
    "pages:extend"(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* alguma condição */ true) {
            page.meta ||= {};
            // Note que isso substituirá qualquer middleware definido em `definePageMeta` na página
            page.meta.middleware = ["named"];
          }
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    },
  },
});
```
