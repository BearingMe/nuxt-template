# `app.config.ts`

Exponha configurações reativas dentro da sua aplicação com o arquivo de configuração `App Config`.

O Nuxt fornece um arquivo de configuração `app.config` para expor configurações reativas dentro da sua aplicação, com a capacidade de atualizá-las em tempo de execução durante o ciclo de vida ou usando um plugin do Nuxt e editá-las com HMR (hot-module-replacement).

Você pode facilmente fornecer configurações de aplicativo em tempo de execução usando o arquivo `app.config.ts`. Ele pode ter as extensões `.ts`, `.js` ou `.mjs`.

```ts twoslash [app.config.ts]
export default defineAppConfig({
  foo: "bar",
});
```

> [!CAUTION] CUIDADO  
> Não coloque valores secretos dentro do arquivo `app.config`, pois ele é exposto ao cliente.

## Uso

Para expor configurações e variáveis de ambiente para o restante da sua aplicação, você precisará definir a configuração no arquivo `app.config`.

```ts twoslash [app.config.ts]
export default defineAppConfig({
  theme: {
    primaryColor: "#ababab",
  },
});
```

Ao adicionar `theme` ao `app.config`, o Nuxt usa Vite ou webpack para empacotar o código. Podemos acessar `theme` de forma universal tanto ao renderizar a página no servidor quanto no navegador usando o composable [`useAppConfig`](https://nuxt.com/docs/api/composables/use-app-config).

```vue [pages/index.vue]
<script setup lang="ts">
const appConfig = useAppConfig();

console.log(appConfig.theme);
</script>
```

Ao configurar um [`srcDir`](https://nuxt.com/docs/api/nuxt-config#srcdir) personalizado, certifique-se de colocar o arquivo `app.config` na raiz do novo caminho `srcDir`.

## Tipagem da Configuração do App

O Nuxt tenta gerar automaticamente uma interface TypeScript a partir da configuração do aplicativo fornecida, para que você não precise tipá-la manualmente.

No entanto, há casos em que você pode querer tipá-la manualmente. Existem duas coisas que você pode querer tipar.

### Entrada da Configuração do App

`AppConfigInput` pode ser usado por autores de módulos que estão declarando quais são as opções válidas de _entrada_ ao definir a configuração do aplicativo. Isso não afetará o tipo de `useAppConfig()`.

```ts
// index.d.ts
declare module "nuxt/schema" {
  interface AppConfigInput {
    /** Configuração do tema */
    theme?: {
      /** Cor primária do aplicativo */
      primaryColor?: string;
    };
  }
}

// É sempre importante garantir que você importe/exports algo ao aumentar um tipo
export {};
```

### Saída da Configuração do App

Se você quiser tipar o resultado de chamar [`useAppConfig()`](https://nuxt.com/docs/api/composables/use-app-config), então você desejará estender `AppConfig`.

> [!WARNING] AVISO  
> Tenha cuidado ao tipar `AppConfig`, pois você substituirá os tipos que o Nuxt infere da configuração do aplicativo realmente definida.

```ts
// index.d.ts
declare module "nuxt/schema" {
  interface AppConfig {
    // Isso substituirá completamente a propriedade `theme` inferida existente
    theme: {
      // Você pode querer tipar esse valor para adicionar tipos mais específicos do que o Nuxt pode inferir,
      // como tipos literais de string
      primaryColor?: "red" | "blue";
    };
  }
}

// É sempre importante garantir que você importe/exports algo ao aumentar um tipo
export {};
```

## Estratégia de Mesclagem

O Nuxt usa uma estratégia de mesclagem personalizada para o `AppConfig` dentro [das camadas](https://nuxt.com/docs/getting-started/layers) da sua aplicação.

Essa estratégia é implementada usando um [Function Merger](https://github.com/unjs/defu#function-merger), que permite definir uma estratégia de mesclagem personalizada para cada chave no `app.config` que tem um array como valor.

> [!NOTE] NOTA  
> O function merger só pode ser usado nas camadas estendidas e não no `app.config` principal do projeto.

Aqui está um exemplo de como você pode usar:

```ts
// layer/app.config.ts
export default defineAppConfig({
  // Valor padrão do array
  array: ["hello"],
});
```

```ts
// app.config.ts
export default defineAppConfig({
  // Substituir o valor padrão do array usando uma função de mesclagem
  array: () => ["bonjour"],
});
```
