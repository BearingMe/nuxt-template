# `lib`

A pasta `lib/` é utilizada exclusivamente para criar _facades_ (fachadas) de outras bibliotecas e APIs que você está utilizando em sua aplicação Nuxt. Essa abordagem permite encapsular e abstrair a complexidade das bibliotecas externas, oferecendo uma interface simplificada e consistente para o restante do seu código.

> [!TIP] DICA
> Para pequenas funcionalidades ou utilitários que não estão diretamente relacionados a uma biblioteca externa, considere colocá-los na pasta [`utils/`](/directory/01-src-utils.html) em vez de `lib/`.

## Uso

Dentro da pasta `lib/`, você pode criar arquivos que atuam como intermediários entre as bibliotecas externas e o seu código de aplicação. Isso ajuda a desacoplar a implementação interna da biblioteca do restante da sua aplicação.

Por exemplo, se você estiver usando a biblioteca `axios` para realizar requisições HTTP, você pode criar uma _facade_ para encapsular suas funcionalidades:

```js [lib/httpClient.js]
import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 1000,
});

export function get(url, config = {}) {
  return httpClient.get(url, config);
}

export function post(url, data, config = {}) {
  return httpClient.post(url, data, config);
}

// Outros métodos HTTP podem ser adicionados conforme necessário
```

Agora, em vez de usar `axios` diretamente em seus componentes, você usará os métodos definidos na _facade_ `httpClient`:

```vue [components/MyComponent.vue]
<script setup lang="ts">
import { get } from "~/lib/httpClient";

const data = await get("/data-endpoint");
</script>

<template>
  <div>
    <p>Dados: {{ data }}</p>
  </div>
</template>
```

> [!IMPORTANT] IMPORTANTE  
> O uso de _facades_ na pasta `lib/` permite que você altere a implementação da biblioteca externa (ou substitua a biblioteca por outra) sem impactar o restante da aplicação, desde que a interface da _facade_ permaneça a mesma.

## Estrutura de Diretórios

A estrutura da pasta `lib/` deve refletir as bibliotecas ou APIs que você está encapsulando. Por exemplo:

```bash [Estrutura de Diretórios]
| lib/
---| httpClient.js   // Facade para a biblioteca axios
```

Neste exemplo, `httpClient.js` encapsula a biblioteca `axios`, proporcionando uma interface simplificada para realizar requisições HTTP.

> [!TIP] DICA  
> Mantenha as _facades_ coesas e focadas em encapsular uma única biblioteca ou API para que a estrutura do código permaneça organizada e fácil de manter.

## Boas Práticas

- **Interface Consistente:** As _facades_ devem fornecer uma interface simples e consistente, independentemente da complexidade da biblioteca externa.
- **Encapsulamento Completo:** Evite expor detalhes internos da biblioteca externa. A _facade_ deve atuar como uma camada de proteção.
- **Facilidade de Substituição:** Use _facades_ para facilitar a substituição de uma biblioteca por outra, caso seja necessário no futuro.

> [!IMPORTANT] IMPORTANTE  
> Como as _facades_ na pasta `lib/` centralizam o acesso a bibliotecas externas, qualquer alteração nelas pode ter um impacto significativo na aplicação. Garanta que as mudanças sejam bem testadas.
