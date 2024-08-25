# Introdução

[Nuxt.js](https://github.com/nuxt/nuxt) é um framework poderoso para construir aplicações [Vue.js](https://vuejs.org). Ele oferece muitas funcionalidades prontas para uso, como roteamento automático, renderização no lado do servidor e geração de sites estáticos. Neste documento, exploraremos por que escolhemos o Nuxt.js, por que desativamos a renderização no lado do servidor (SSR) e como o Nuxt.js pode beneficiar nosso projeto.

> [!TIP] Dica
> Se você quiser experimentar o Nuxt em seu navegador, você pode [testá-lo online](https://nuxt.com/docs/getting-started/installation#play-online).

## Por que Nuxt?

A princípio, nosso objetivo principal era simplesmente construir uma aplicação Vue.js. Ela deveria ser simples, fácil de manter e escalável.

Embora o Vue.js seja um ótimo framework para construir interfaces de usuário, e forneça muitas orientações sobre como estruturar sua aplicação, ele carece de alguma disciplina quando se trata de organização de arquivos e roteamento. Por isso, passamos algum tempo avaliando diferentes regras e convenções a seguir.

Após alguns dias, chegamos a duas abordagens:

1. **A estrutura padrão**: Componentes, visualizações e módulos de store são organizados em pastas separadas, sem uma clara separação de preocupações. Esta é a estrutura padrão fornecida pelo Vue.js.
2. **Estrutura baseada em funcionalidades**: Cada funcionalidade tem sua própria pasta com componentes, visualizações e módulos de store, com uma única funcionalidade global chamada "compartilhada". Como descrito [neste artigo](https://fadamakis.com/a-front-end-application-folder-structure-that-makes-sense-ecc0b690968b), isso proporciona uma clara separação de preocupações e facilita a navegação na base de código.

Embora a abordagem baseada em funcionalidades seja mais organizada, ela também pode ser mais difícil de manter e escalar à medida que o projeto cresce, principalmente devido à falta de disciplina. Requer uma melhor coordenação da equipe e uma adesão estrita para funcionar. Além disso, leva tempo para dar retorno e só veremos os benefícios dessa abordagem após alguns meses, no caso de equipes realmente pequenas.

A estrutura padrão, por outro lado, é mais fácil de configurar, mas pode se tornar uma bagunça à medida que o projeto cresce. Apesar de ser bem conhecida e amplamente utilizada, as pessoas tendem a negligenciar a importância de organizar o código adequadamente quando estão com pressa.

Mesmo assim, no final, tivemos que fazer uma escolha, então decidimos torná-la simples, mas colocar alguma disciplina em prática. Escolhemos o Nuxt.js.

## Automação e Convenções

Nuxt usa convenções e uma estrutura de diretórios opinativa para automatizar tarefas repetitivas e permitir que os desenvolvedores se concentrem em adicionar funcionalidades. O arquivo de configuração ainda pode personalizar e sobrescrever seus comportamentos padrão.

- **Roteamento baseado em arquivos:** defina rotas com base na estrutura do seu [diretório `pages/`](/dir/pages.html). Isso pode facilitar a organização de sua aplicação e evitar a necessidade de configuração manual de rotas.
- **Divisão de código:** o Nuxt divide automaticamente seu código em pedaços menores, o que pode ajudar a reduzir o tempo de carregamento inicial de sua aplicação.
- **Importações automáticas:** escreva composables e componentes Vue em seus respectivos diretórios e use-os sem precisar importá-los, com os benefícios de tree-shaking e pacotes JS otimizados.
- **Suporte TypeScript sem configuração:** escreva código tipado sem precisar aprender TypeScript, com nossos tipos gerados automaticamente e `tsconfig.json`.
- **Ferramentas de build configuradas:** usamos [Vite](https://vitejs.dev) por padrão para suportar substituição de módulo a quente (HMR) no desenvolvimento e empacotar seu código para produção com as melhores práticas incorporadas.

O Nuxt cuida de tudo isso e fornece funcionalidades tanto de frontend quanto de backend, para que você possa se concentrar no que importa: **criar sua aplicação web**.

## Renderização no Lado do Servidor

O Nuxt vem com funcionalidades integradas de renderização no lado do servidor (SSR) por padrão, sem precisar configurar um servidor você mesmo, o que traz muitos benefícios para aplicações web:

- **Tempo de carregamento inicial mais rápido:** o Nuxt envia uma página HTML totalmente renderizada para o navegador, que pode ser exibida imediatamente. Isso pode proporcionar um tempo de carregamento percebido mais rápido e uma melhor experiência do usuário (UX), especialmente em redes ou dispositivos mais lentos.
- **SEO aprimorado:** os motores de busca podem indexar melhor as páginas SSR porque o conteúdo HTML está disponível imediatamente, em vez de exigir JavaScript para renderizar o conteúdo no lado do cliente.
- **Melhor desempenho em dispositivos com pouca potência:** reduz a quantidade de JavaScript que precisa ser baixado e executado no lado do cliente, o que pode ser benéfico para dispositivos com pouca potência que podem ter dificuldade em processar aplicações JavaScript pesadas.
- **Melhor acessibilidade:** o conteúdo está disponível imediatamente no carregamento inicial da página, melhorando a acessibilidade para usuários que dependem de leitores de tela ou outras tecnologias assistivas.
- **Cache mais fácil:** as páginas podem ser armazenadas em cache no lado do servidor, o que pode melhorar ainda mais o desempenho, reduzindo o tempo necessário para gerar e enviar o conteúdo ao cliente.

No geral, a renderização no lado do servidor pode proporcionar uma experiência do usuário mais rápida e eficiente, além de melhorar a otimização para mecanismos de busca e a acessibilidade.

Como o Nuxt é um framework versátil, ele oferece a possibilidade de renderizar toda sua aplicação de forma estática com `nuxt generate`, desativar o SSR globalmente com a opção `ssr: false` ou aproveitar a renderização híbrida configurando a opção `routeRules`.

> [!TIP] Dica
> Se você deseja saber mais sobre como o Nuxt lida com a renderização no lado do servidor, você pode ler mais sobre [como o Nuxt funciona](https://nuxt.com/docs/guide/concepts/rendering).

## Por que desativar o SSR?

Embora o Nuxt.js ofereça renderização no lado do servidor (SSR) por padrão, decidimos desativá-la para nosso projeto. O SSR pode ser benéfico para SEO e desempenho, mas também adiciona complexidade ao projeto e requer recursos adicionais do servidor. Nossa intenção era manter as coisas simples e focar em construir uma aplicação cliente rápida e responsiva, por isso levamos esses fatores em consideração ao tomar nossa decisão:

- **Simplicidade**: Desativar o SSR simplifica a configuração do projeto e reduz a necessidade de código no lado do servidor. Você pode se concentrar em construir uma aplicação cliente sem se preocupar com a renderização no lado do servidor. Isso aproxima a DX da fornecida pelo Vue.js.
- **Redução de Custos**: O SSR requer recursos adicionais do servidor e pode aumentar os custos de hospedagem. Ao desativar o SSR, você pode reduzir o custo de hospedagem de sua aplicação.

1. **SEO**: Embora o SSR possa melhorar o SEO, uma aplicação cliente bem estruturada também pode alcançar bons rankings nos motores de busca. Seguindo as melhores práticas para aplicações no lado do cliente, você pode garantir que seu site seja indexado corretamente pelos motores de busca.

## Pronto para produção

Uma aplicação Nuxt pode ser implantada em um servidor Node ou Deno, pré-renderizada para ser hospedada em ambientes estáticos, ou implantada em provedores serverless e de edge.

> [!TIP] Dica
> Se você deseja saber mais sobre como implantar uma aplicação Nuxt em produção, você pode ler mais sobre [como implantar uma aplicação Nuxt](https://nuxt.com/docs/getting-started/deployment).
