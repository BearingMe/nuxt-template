# Arquitetura

Essa seção é dedicada a descrever alguns pontos importantes sobre a arquitetura do projeto. Aqui serão abordados tópicos como estrutura de pastas, stores e outras decisões arquiteturais. Para mais informações consulte as seções específicas.

## Estrutura de Pastas

A organização de pastas segue o padrão do Nuxt.js, com algumas adições e modificações para facilitar o desenvolvimento. A principal diferença é a inclusão da pasta `src` que contém todo o código fonte da aplicação.

> [!TIP] DICA
> Para mais informações sobre as pastas, consulte a seção [Estrutura de Arquivos](/directory/00-dot-nuxt.html)

- `src/assets` - Arquivos estáticos como imagens, fontes e estilos globais
- `src/components` - Componentes Vue reutilizáveis
- `src/composables` - Composables para compartilhar lógica entre componentes
- `src/layouts` - Layouts globais da aplicação
- `src/middleware` - Middlewares para controlar o acesso às rotas
- `src/pages` - Páginas da aplicação
- `src/plugins` - Plugins Nuxt.js e de terceiros
- `src/utils` - Funções utilitárias e constantes

Outras pastas são ou seram inclusas conforme a necessidade do projeto.

- `src/queries` - Queries para comunicação com APIs
- `src/lib` - Bibliotecas e funções utilitárias
- `src/schemas` - Esquemas de validação de dados

Conteúdos como `lib` e `utils` podem causar confusão, por terem propósitos similares. A diferença é que `lib` contém facades, wrappers e funções utilitárias que dependem de bibliotecas específicas, enquanto `utils` contém funções utilitárias genéricas.

Exemplos:

```ts
// lib/http.ts
import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.example.com",
});

http.interceptors.request.use((config) => {
  // Adiciona token de autenticação
  return config;
});
```

```ts
// utils/date.ts
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}
```

Há outras pastas que geram ambiguidades, como `api`, `services` e `queries`. A escolha do que usar depende do seguinte entendimento:

- `api`: Funções que encapsulam a comunicação com APIs externas. Geralmente fazem uso de `lib/http.ts` para realizar as requisições.
- `services`: Semelhante a `api`, porém com escopo maior. Pode conter funções que não necessariamente fazem requisições HTTP, como manipulação de arquivos, envio de e-mails, etc.
- `queries`: No contexto desse projeto se trata de queries e mutations relacionadas à `@tanstack/vue-query`. Assim como `api` e `services`, fazem requisições HTTP, mas com uma abordagem diferente.

> [!IMPORTANT] IMPORTANTE
> A recomendação é **não** utilizar `api` ou `services` e optar por `lib` e `queries` para manter a consistência.

## Stores

O Nuxt.js possui um composite capaz de gerenciar estados simples, chamado de `useState`. Ele é capaz de persistir estados entre recarregamentos de página, mas não é recomendado para estados complexos ou que necessitem de reatividade.

> [!IMPORTANT] IMPORTANTE
> Para manter a aplicação consistente não é recomendável usar o `useState` nesse projeto.

Para casos mais complexos é recomendado o `Pinia`. Pinia é uma store reativa, inspirada no Vuex, porém mais simples e eficiente. Ela é capaz de persistir estados entre recarregamentos de página, além de possuir uma API mais simples e intuitiva. O `vuex` não é mais mantido.

> [!WARNING] AVISO
> Não é recomendado utilizar o `Pinia` seguindo o padrão do Vuex. A API de Setup API é mais simples e intuitiva.

```ts
// store/counter.js
import { useRef } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const state = useRef(0);

  const increment = () => state.value++;
  const decrement = () => state.value--;

  return { state, increment, decrement };
});
```

## API

Para a comunicação com APIs externas, é recomendado o uso do `@tanstack/vue-query`. Esta biblioteca facilita a interação com APIs e oferece diversas funcionalidades, como cache, refetch, paginação, entre outras.

> [!WARNING] AVISO
> Não é necessário utilizar stores para gerenciar estados de queries. O `@tanstack/vue-query` já provê uma série de funcionalidades para isso.

Exemplo utilizando apenas `Vuex`:

```ts
// store/posts.js
import { createStore } from "vuex";

export const store = createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await response.json();
      commit("setPosts", posts);
    },
  },
});
```

```vue
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const posts = computed(() => store.state.posts);

onMounted(() => {
  store.dispatch("fetchPosts");
});
</script>
```

Examplo utilizando `Pinia` com Setup API:

```ts
// store/posts.js
import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);

  async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await response.json();
  }

  return { posts, fetchPosts };
});
```

```vue
<script setup>
import { onMounted } from "vue";
import { usePostsStore } from "./stores/usePostsStore";

const postsStore = usePostsStore();
const posts = postsStore.posts;

onMounted(() => {
  postsStore.fetchPosts();
});
</script>
```

Exemplo utilizando `@tanstack/vue-query`:

```ts
// queries/usePosts.ts
import { useQuery } from "@tanstack/vue-query";

export function usePosts() {
  return useQuery("posts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  });
}
```

```vue
<script setup>
import { usePosts } from "./queries/usePosts";
const { data, isLoading, isError, refetch } = usePosts();
</script>
```

O `@tanstack/vue-query` possui várias vantagens em relação ao método comum de chamar apis dentro das stores, sendo o principal a separação de responsabilidades. Dessa forma, as stores ficam responsáveis apenas por gerenciar estados locais, enquanto as queries cuidam da comunicação com APIs externas.
