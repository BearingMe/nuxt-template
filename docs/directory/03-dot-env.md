# `.env`

O arquivo `.env` especifica suas variáveis de ambiente para o tempo de build/desenvolvimento.

> [!WARNING] AVISO
> Em produção, você deve definir explicitamente as variáveis de ambiente usando as ferramentas e métodos fornecidos pelo seu ambiente de hospedagem. O arquivo `.env` não é lido durante o processo de build.

## Tempo de Desenvolvimento, Build e Geração

A CLI do Nuxt tem suporte integrado ao [dotenv](https://github.com/motdotla/dotenv) no modo de desenvolvimento e ao rodar os comandos [`nuxi build`](https://nuxt.com/docs/api/commands/build) e [`nuxi generate`](https://nuxt.com/docs/api/commands/generate).

Além de quaisquer variáveis de ambiente do processo, se você tiver um arquivo `.env` no diretório raiz do seu projeto, ele será carregado automaticamente **no momento do desenvolvimento, build e geração**. Quaisquer variáveis de ambiente definidas lá serão acessíveis dentro do seu arquivo `nuxt.config` e módulos.

```bash [.env]
MY_ENV_VARIABLE=hello
```

> [!NOTE] NOTA  
> Observe que remover uma variável do `.env` ou remover o arquivo `.env` por completo não desativa os valores que já foram definidos.

## Arquivo Personalizado

Se você quiser usar um arquivo diferente - por exemplo, `.env.local` ou `.env.production` - você pode fazer isso passando a flag `--dotenv` ao usar `nuxi`.

```bash [Terminal]
npx nuxi dev --dotenv .env.local
```

Ao atualizar o `.env` no modo de desenvolvimento, a instância do Nuxt é reiniciada automaticamente para aplicar os novos valores ao `process.env`.

> [!IMPORTANT] IMPORTANTE  
> No código da sua aplicação, você deve usar o [Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config) em vez de variáveis de ambiente simples.

## Produção

**Após o servidor ser construído**, você é responsável por definir as variáveis de ambiente quando executar o servidor.

Seus arquivos `.env` não serão lidos neste ponto. A forma como você faz isso varia para cada ambiente.

Essa decisão de design foi feita para garantir a compatibilidade com vários ambientes de implantação, alguns dos quais podem não ter um sistema de arquivos tradicional disponível, como plataformas serverless ou redes de borda como Cloudflare Workers.

Como os arquivos `.env` não são usados em produção, você deve definir explicitamente as variáveis de ambiente usando as ferramentas e métodos fornecidos pelo seu ambiente de hospedagem. Aqui estão algumas abordagens comuns:

- Você pode passar as variáveis de ambiente como argumentos usando o terminal:

  `$ DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs`

- Você pode definir variáveis de ambiente em arquivos de configuração do shell, como `.bashrc` ou `.profile`.

- Muitos provedores de serviços em nuvem, como Vercel, Netlify e AWS, oferecem interfaces para definir variáveis de ambiente por meio de seus dashboards, ferramentas CLI ou arquivos de configuração.

## Pré-visualização de Produção

Para fins de pré-visualização local de produção, recomendamos o uso do comando [`nuxi preview`](https://nuxt.com/docs/api/commands/preview), pois ao usar esse comando, o arquivo `.env` será carregado no `process.env` para conveniência. Observe que este comando requer que as dependências estejam instaladas no diretório do pacote.

Ou você pode passar as variáveis de ambiente como argumentos usando o terminal. Por exemplo, no Linux ou macOS:

```bash [Terminal]
DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs
```

Observe que, para um site puramente estático, não é possível definir a configuração em tempo de execução após o projeto ser pré-renderizado.

> [!TIP] DICA  
> Saiba mais sobre a configuração em tempo de execução em [`runtimeConfig`](https://nuxt.com/docs/guide/going-further/runtime-config).

> [!NOTE] NOTA  
> Se você quiser usar variáveis de ambiente definidas no momento da build, mas não se importa em atualizá-las posteriormente (ou só precisa atualizá-las reativamente _dentro_ da sua aplicação), então `appConfig` pode ser uma escolha melhor. Você pode definir `appConfig` tanto dentro do seu `nuxt.config` (usando variáveis de ambiente) quanto em um arquivo `~/app.config.ts` no seu projeto. Saiba mais [aqui](https://nuxt.com/docs/guide/directory-structure/app-config).
