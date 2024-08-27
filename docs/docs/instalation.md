# Instalação

### Pré-requisitos

- **Node.js** - [`v18.0.0`](https://nodejs.org/en) ou mais recente
- **pnpm** - [`v6.0.0`](https://pnpm.io/) ou mais recente
- **Editor de texto** - Recomendamos o [Visual Studio Code](https://code.visualstudio.com/) com a [extensão oficial Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (anteriormente conhecida como Volar)
- **Terminal** - Para executar comandos Nuxt

### Download do Projeto

Abra um terminal (se você estiver usando o [Visual Studio Code](https://code.visualstudio.com), você pode abrir um [terminal integrado](https://code.visualstudio.com/docs/editor/integrated-terminal)) e use o seguinte comando para copiar o projeto:

```bash
npx degit https://github.com/BearingMe/nuxt-template
cd nuxt-template
```

Caso você não tenha o `degit` instalado, você pode clonar o repositório e remover a pasta `.git`:

```bash
git clone https://github.com/BearingMe/nuxt-template
cd nuxt-template
rm -rf .git
git init
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

### Próximos Passos

Agora que você criou seu projeto Nuxt, está pronto para começar a construir sua aplicação.
