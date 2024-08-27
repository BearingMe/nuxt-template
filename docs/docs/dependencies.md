# Dependências

As seguintes dependências são inclusas nesse template para facilitar o desenvolvimento de aplicações Nuxt.js. Cada dependência é acompanhada de uma breve explicação, justificativa de uso, exemplo mínimo e link para a documentação oficial.

- [`axios`](#axios)
- [`zod`](#zod)
- [`@nuxt/icon`](#nuxt-icon)
- [`@nuxtjs/google-fonts`](#nuxtjs-google-fonts)
- [`@pinia/nuxt`](#pinia-nuxt)
- [`@pinia-plugin-persistedstate/nuxt`](#pinia-plugin-persistedstate-nuxt)
- [`@tanstack/vue-query`](#tanstack-vue-query)
- [`@vueuse/nuxt`](#vueuse-nuxt)
- [`@nuxtjs/tailwindcss`](#nuxtjs-tailwindcss)
- [`@nuxt/vee-validate`](#nuxt-vee-validate)
- [`@nuxt/prime-vue`](#nuxt-prime-vue)
- [`@vee-validate/zod`](#vee-validate-zod)

## `axios`

O `axios` é uma biblioteca para fazer requisições HTTP em navegadores e Node.js, baseada em promessas.

Facilita a comunicação com APIs externas, suportando funcionalidades como interceptores de requisições/respostas, tempo limite e cancelamento de requisições.

**Exemplo:**

```js
import axios from "axios";

axios.get("/api/data").then((response) => console.log(response.data));
```

**Documentação Oficial:** [Axios](https://axios-http.com/)

## `zod`

O `zod` é uma biblioteca de validação de esquemas TypeScript-first para validação de dados.

Permite validar dados de forma segura e tipada, garantindo que os dados recebidos de APIs ou formulários estejam no formato correto.

> [!TIP] DICA
> VeeValidate suporta a validação de esquemas Zod, permitindo a validação de formulários com tipagem estática. O pacote [`@vee-validate/zod`](/docs/dependencies.html#vee-validate-zod) é utilizado para essa integração.

**Exemplo:**

```js
// src/schemas/index.js
import { z } from "zod";

export const user = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
});

user.parse({ name: "John", age: 30 }); // Validação bem-sucedida
```

**Documentação Oficial:** [Zod](https://zod.dev/)

## `@nuxt/icon`

O pacote `@nuxt/icon` facilita a utilização de ícones em uma aplicação Nuxt, permitindo a inclusão de ícones SVG de maneira simples e otimizada.

Ele permite o uso de ícones de diversas bibliotecas populares diretamente em componentes Vue, melhorando a acessibilidade e a experiência visual da aplicação.

> [!TIP] DICA
> Você pode pesquisar os ícones disponíveis em [Icônes](https://icones.js.org/).

**Exemplo:**

```vue
<template>
  Tamanhos diferentes:
  <Icon name="uil:github" />
  <Icon name="uil:github" size="24" />
  <Icon name="uil:github" size="48" />
</template>
```

> [!WARNING] AVISO
> É altamente recomendado instalar os ícones localmente. O Nuxt irá sugerir o nome correto do pacote, instale usando `pnpm i -D @iconify-json/collection-name`

**Documentação Oficial:** [Nuxt Icon](https://nuxt.com/modules/icon)

## `@nuxtjs/google-fonts`

O pacote `@nuxtjs/google-fonts` integra facilmente as fontes do Google em sua aplicação Nuxt, permitindo a configuração e inclusão de fontes de forma automatizada.

Ele facilita a importação e o uso de fontes customizadas, melhorando a tipografia e a estética da aplicação sem a necessidade de incluir links manualmente.

**Exemplo:**

```js
export default defineNuxtConfig({
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": [300, 400, 700],
    },
  },
});
```

**Documentação Oficial:** [Nuxt Google Fonts](https://google-fonts.nuxtjs.org/)

## `@pinia/nuxt`

O `@pinia/nuxt` integra o Pinia, uma biblioteca de gerenciamento de estado para Vue, ao Nuxt. O Pinia é a alternativa recomendada ao Vuex.

Pinia oferece uma API simples e poderosa para gerenciar estados em aplicações Vue, com suporte a TypeScript e a Composition API.

**Exemplo:**

```js
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

**Documentação Oficial:** [Pinia para Nuxt](https://pinia.vuejs.org/)

## `@pinia-plugin-persistedstate/nuxt`

O `@pinia-plugin-persistedstate/nuxt` permite persistir o estado do Pinia entre sessões do navegador, utilizando armazenamento local como localStorage.

Útil para manter o estado da aplicação após o recarregamento da página ou ao fechar e reabrir o navegador, proporcionando uma melhor experiência ao usuário.

**Exemplo:**

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  piniaPersistedstate: {
    storage: "localStorage",
  },
});
```

> [!WARNING] AVISO
> Não é possivel persistir funções, referências circulares ou objetos complexos. Certifique-se de que o estado é serializável.

**Documentação Oficial:** [Pinia Plugin Persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)

## `@tanstack/vue-query`

O `@tanstack/vue-query` é uma biblioteca para gerenciar o estado de dados assíncronos em aplicações Vue, com foco em requisições HTTP e cache.

Simplifica o gerenciamento de dados vindos de APIs, com funcionalidades automáticas de cache, sincronização e atualizações em tempo real.

**Exemplo:**

```js
import { useQuery } from "@tanstack/vue-query";

const { data, error, isLoading } = useQuery(["todos"], fetchTodos);
```

**Documentação Oficial:** [Vue Query](https://tanstack.com/query/latest/docs/framework/react/overview)

## `@vueuse/nuxt`

O `@vueuse/nuxt` integra a biblioteca VueUse ao Nuxt, fornecendo um conjunto de composables reutilizáveis e utilitários para Vue 3.

Fornece uma coleção de funções reativas para acelerar o desenvolvimento, como controle de estado, eventos de navegador, manipulação de dom, entre outros.

**Exemplo:**

```js
import { useLocalStorage } from "@vueuse/core";

const user = useLocalStorage("user", {});
```

**Documentação Oficial:** [VueUse](https://vueuse.org/guide/)

## `@nuxtjs/tailwindcss`

O `@nuxtjs/tailwindcss` é um módulo que integra o framework Tailwind CSS ao Nuxt, permitindo a configuração e uso de Tailwind facilmente.

Permite criar rapidamente interfaces modernas e responsivas com classes utilitárias, sem a necessidade de escrever CSS personalizado.

**Exemplo:**

```js
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
});
```

```vue
<template>
  <div class="bg-blue-500 p-4 text-white">Hello, Tailwind CSS!</div>
</template>
```

**Documentação Oficial:** [Tailwind CSS Nuxt Module](https://tailwindcss.nuxtjs.org/)

## `@nuxt/vee-validate`

O `@nuxt/vee-validate` integra a biblioteca VeeValidate ao Nuxt, fornecendo validação de formulários baseada em Vue.

Facilita a implementação de validação de formulários com regras personalizadas e mensagens de erro, melhorando a experiência do usuário.

**Exemplo:**

```vue
<template>
  <Form>
    <Field name="email" rules="required|email" />
    <ErrorMessage name="email" />
  </Form>
</template>
```

**Documentação Oficial:** [VeeValidate para Nuxt](https://nuxt.com/modules/vee-validate)

## `@nuxt/prime-vue`

O `@nuxt/prime-vue` integra o PrimeVue ao Nuxt, oferecendo uma coleção de componentes de UI ricos e modernos.

Permite a criação de interfaces sofisticadas e responsivas com uma vasta gama de componentes prontos para uso, como tabelas, diálogos e gráficos.

**Exemplo:**

```vue
<template>
  <Button label="Click Me" icon="pi pi-check" />
</template>
```

> [!NOTE] NOTA
> A versão disponível no Nuxt Modules é antiga, esse template utiliza a versão mais recente do PrimeVue.

**Documentação Oficial:** [PrimeVue para Nuxt](https://www.primefaces.org/)

## `@vee-validate/zod`

O `@vee-validate/zod` é um pacote que integra a validação de esquemas Zod ao VeeValidate, permitindo a validação de formulários com tipagem estática.

Facilita a validação de formulários com esquemas Zod, garantindo que os dados inseridos estejam no formato correto e exibindo mensagens de erro personalizadas.

**Exemplo:**

```vue
<script setup>
import { user } from "~/schemas/index.js";
import { toTypedSchema } from "@vee-validate/zod";

const validationSchema = toTypedSchema(user);
</script>

<template>
  <Form :validation-schema="validationSchema">
    <Field name="username" />
    <ErrorMessage name="username" />

    <Field name="email" />
    <ErrorMessage name="email" />

    <button type="submit">Submit</button>
  </Form>
</template>
```

**Documentação Oficial:** [VeeValidate Zod](https://vee-validate.logaretm.com/v4/guide/integrations/zod.html)
