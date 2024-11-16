# NxT - Nuxt Template

NxT é um template para projetos Nuxt.js com configurações pré-definidas para facilitar o desenvolvimento de aplicações web. Para mais informações consulte nossa [documentação](https://bearingme.github.io/nuxt-template/).

## Instalação

### Pré-requisitos

- **Node.js** - [`v18.0.0`](https://nodejs.org/en) ou mais recente
- **pnpm** - [`v6.0.0`](https://pnpm.io/) ou mais recente
- **Editor de texto** - Recomendamos o [Visual Studio Code](https://code.visualstudio.com/) com a [extensão oficial Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (anteriormente conhecida como Volar)
- **Terminal** - Para executar comandos Nuxt

### Download do Projeto

Abra um terminal (se você estiver usando o [Visual Studio Code](https://code.visualstudio.com), você pode abrir um [terminal integrado](https://code.visualstudio.com/docs/editor/integrated-terminal)) e use o seguinte comando para copiar o projeto:

```bash
# clonar o repositório
git clone https://github.com/BearingMe/nuxt-template
cd nuxt-template

# remover o histórico de commits
rm -r .git
git init
git branch -m main # (recomendado) para garantir compatibilidade com futuras pipelines
git add .
git commit -m "initial commit"
git switch -c dev # (recomendado) começar o trabalho à partir da dev

# baixar pacotes e adicionar os hooks do husky
pnpm i
```

### Instalação de Dependências

Após copiar o projeto, instale as dependências. Você pode usar qualquer gerenciador de pacotes, porém recomendamos o `pnpm`:

```bash
pnpm install
```

Para iniciar o servidor de desenvolvimento, use o seguinte comando:

```bash
pnpm run dev
```

Abra o navegador em `http://localhost:3000` para ver o projeto em execução. Você pode começar a editar o projeto em `src`.

## Dependências

Você pode encontrar a [lista completa de dependências](https://bearingme.github.io/nuxt-template/docs/dependencies.html) e suas descrições na documentação. Os links abaixo redirecionam para a documentação oficial de cada dependência:

- [`axios`](https://axios-http.com/)
- [`zod`](https://zod.dev/)
- [`@nuxt/icon`](https://nuxt.com/modules/icon)
- [`@nuxtjs/google-fonts`](https://google-fonts.nuxtjs.org/)
- [`@pinia/nuxt`](https://pinia.vuejs.org/)
- [`@pinia-plugin-persistedstate/nuxt`](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [`@tanstack/vue-query`](https://tanstack.com/query/latest/docs/framework/react/overview)
- [`@vueuse/nuxt`](https://vueuse.org/guide/)
- [`@nuxtjs/tailwindcss`](https://tailwindcss.nuxtjs.org/)
- [`@nuxt/vee-validate`](https://nuxt.com/modules/vee-validate)
- [`@nuxt/prime-vue`](https://www.primefaces.org/)
- [`@vee-validate/zod`](https://vee-validate.logaretm.com/v4/guide/integrations/zod.html)

## Estrutura de Pastas

A estrutura de pastas segue o padrão do Nuxt.js, com algumas adições e modificações para facilitar o desenvolvimento. A seguir, uma breve descrição de cada pasta:

> [!TIP]
> Para mais informações sobre a estrutura de pastas, consulte a documentação do [Nuxt](https://nuxt.com/docs/guide/directory-structure/nuxt).

- `src/assets` - Arquivos estáticos como imagens, fontes e estilos globais
- `src/components` - Componentes Vue reutilizáveis
- `src/composables` - Composables para compartilhar lógica entre componentes
- `src/layouts` - Layouts globais da aplicação
- `src/middleware` - Middlewares para controlar o acesso às rotas
- `src/pages` - Páginas da aplicação
- `src/plugins` - Plugins Nuxt.js e de terceiros
- `src/utils` - Funções utilitárias e constantes

Outras pastas são ou seram inclusas conforme a necessidade do projeto.

- `src/api` - Serviços para comunicação com APIs
- `src/queries` - Queries para comunicação com APIs
- `src/lib` - Bibliotecas e funções utilitárias
- `src/schemas` - Esquemas de validação de dados

## Contribuição

Se você deseja contribuir com o projeto, por favor leia o nosso [guia de contribuição](https://github.com/BearingMe/nuxt-template/blob/main/CONTRIBUTING.md) para mais informações.
