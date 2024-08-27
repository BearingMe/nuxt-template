# Contribuição

## Antes de começar

Novas ideias sobre organização, bibliotecas e arquiteturas são sempre bem-vindas!

Este projeto está aberto a todo tipo de contribuição. No entanto, é importante que todas as mudanças significativas sejam discutidas previamente. Caso queira compartilhar uma ideia, abra uma `issue` com a tag apropriada para que possamos discutir isso no futuro.

## Sumário

As regras descritas neste documento estão organizadas em quatro seções, que implementam total ou parcialmente workflows amplamente reconhecidos e utilizados na comunidade:

- [GitHub Flow](#github-flow) - Como gerenciar `projetos`, `forks` e `pull requests`.
- [Git Flow](#git-flow) - Orientações para organizar `branches` por `features`.
- [Versionamento Semântico](#versionamento-semântico) - Como lidar com `versões` e `lançamentos`.
- [Conventional Commits](#conventional-commits) - Práticas recomendadas para fazer bons `commits`.

## GitHub Flow

Antes de tudo, é importante destacar que `GitHub Flow` e `Git Flow` **não** são a mesma coisa.

O `GitHub Flow`, como descrito na documentação oficial [Fluxo do GitHub](https://docs.github.com/pt/get-started/using-github/github-flow), é um "fluxo de trabalho leve e baseado em branches". Embora essa descrição possa parecer vaga, na prática, a maioria já utilizou esse fluxo: criar uma branch, fazer alterações, e abrir um pull request.

Por outro lado, o `Git Flow` é um processo focado na organização das branches. Ele dita como nomear, organizar, mesclar, corrigir, além de outras práticas. Enquanto o `GitHub Flow` é leve e ágil, o `Git Flow` adiciona estrutura e formalidade ao processo de desenvolvimento.

Dito isso, podemos resumir o fluxo do GitHub da seguinte forma:

1. **Branch**: Crie sua própria branch. A menos que haja um motivo muito específico, evite fazer commits diretamente na `dev`, e ainda menos na `main`.
2. **Commit**: Um dia você precisará encontrar o que causou um problema, e nesse dia, será útil ter commits com nomes claros e descritivos.
3. **Pull Request**: Lembre-se de que alguém, possivelmente eu, irá revisar seu pull request. Por favor, tenha misericórdia e evite enviar alterações em 120 arquivos de uma só vez.
4. **Revisão**: Esta é uma etapa delicada onde os revisores devem deixar perguntas, comentários e sugestões. Embora nem sempre seja realizada, quando for, é importante ser construtivo e respeitoso com os colegas.
5. **Merge**: Após a revisão e aprovação do pull request, o merge é feito, e o código passa a fazer parte das branches principais.
6. **Deletar a Branch**: Geralmente, a branch é deletada automaticamente durante o merge, mas é importante também removê-la localmente.

Embora o `GitHub Flow` seja simples, ele apresenta alguns pontos sensíveis entre o pull request e o merge.

Imagine que você esteja trabalhando em um projeto com várias outras pessoas. Após clonar o repositório, criar sua branch e realizar as modificações, você decide, no seu repositório local, fazer o merge diretamente na `dev` e, em seguida, sincronizar com o GitHub. Como isso é diferente de alterar a `dev` diretamente?

A verdade é que, para quem faz a revisão ou gerencia o repositório, essa diferença é inexistente. Ao adotar essa prática, você perde a oportunidade de ter seu código revisado, pode causar problemas com o CI/CD, prejudica o histórico de commits, se obriga a resolver conflitos de código sozinho, reduz a transparência, e, em alguns casos, pode simplesmente ter seu push bloqueado.

Outro ponto importante é a revisão. Embora seja comum que não haja nenhuma revisão, quando ela ocorre, especialmente em times que não estão familiarizados com o processo, é normal surgirem conflitos. Esses conflitos podem ser causados por diversas razões, como regras rígidas, demora na revisão ou falta de disponibilidade para resolver problemas. Nesse contexto, dois pontos são importantes:

- O pull request é atualizado automaticamente sempre que você modifica sua branch. Isso significa que, caso seu código não passe na revisão, basta fazer as alterações necessárias e o pull request será atualizado, sem a necessidade de reenvio.
- O revisor não é responsável por corrigir o código, mas sim por impedir que código problemático seja introduzido. Às vezes, o erro é simples, como um arquivo fora de lugar ou um nome mal escrito, e pode ser tentador fazer o merge e corrigir com outro commit. No entanto, isso não deve ser feito, pois incentiva maus hábitos e polui o histórico do código.

Finalmente, o merge. Embora o `GitHub Flow` não especifique onde o merge deve ser feito, geralmente ele é direcionado para as branches `dev` ou `main`. Isso significa que o pull request aceito contém o código mais recente e mais próximo da produção. Tenha isso em mente ao realizar merges.

## Git Flow

A ideia do Git Flow é organizar as branches, e suas regras não são exatamente complicadas. No entanto, como todo padrão, é importante saber quando evitar excessos.

Nesse fluxo de trabalho, temos dois tipos de branches: as padrões e as temporárias. Branches padrões são os suspeitos usuais: main e dev, enquanto as branches temporárias recebem nomes de acordo com a situação.

**Branches padrões:**

- **Master ou Main**: Onde fica o código em produção. Eventualmente, tudo vem parar aqui.
- **Development ou Dev**: Aqui fica o código em desenvolvimento, que será o próximo a entrar em produção. É a branch mais atualizada e a com maior atividade.

As branches temporárias seguem a nomenclatura `<branch_subtype>/<name>`. O subtipo pode ser `feature`, `bugfix`, `hotfix` ou `release`. O nome varia de acordo com a implementação e necessidade.

- **Feature**: São as branches com novas implementações. Elas são sempre criadas a partir da `dev`. Alguns exemplos são "feature/buttons" ou "feat/home-page".
- **Bugfix**: Parecidas com as features, também são criadas a partir da `dev`, porém com a intenção de corrigir bugs e problemas específicos. Por exemplo, "bugfix/login-issue".
- **Hotfix**: Essas são usadas para resolver bugs críticos que precisam ser corrigidos imediatamente no código de produção. Elas são criadas a partir da ramificação `main` e mescladas de volta na `master` e na `development`. Por exemplo, "hotfix/security-patch".
- **Release**: Serve para manter o histórico de lançamento. Segue o versionamento semântico como parte do nome.

No geral, o `Git Flow` é uma faca de dois gumes. Enquanto `features` e `fixes` são relativamente compreensíveis, `release` pode pecar pelo excesso.

Pense em um time Scrum, com sprints entre uma semana e um mês. Ao final de cada sprint, sempre haverá um "entregável", ou seja, a cada semana haverá uma nova versão do produto. Isso significa que, em um ano, facilmente haverá 50 branches só de release. Tenha em mente que alguns projetos podem durar décadas.

Nesse sentido, não é recomendado o uso de branches de release em times ágeis. Também pode não ser apropriado dedicar mais esforço ao nome das branches do que aos comentários em si. Sendo assim, eu recomendo a seguinte abordagem:

- **feat**: Equivalente a features, mas com um nome mais simples. Essa escolha será discutida mais adiante, mas se resume ao fato de que a maioria dos seus commits terá essa palavra incluída.
- **fix**: Seja bugfix ou hotfix, ambos servem ao mesmo propósito: corrigir bugs. Bugfix tende a ser menos urgente, portanto, é incluído apenas na branch dev, enquanto hotfix é incluído tanto em dev quanto em main. No final do dia, tudo o que você precisa lembrar é de enviar qualquer branch para dev; o resto é detalhe.
- **release**: Enquanto não faz sentido criar releases toda semana, alguns são mais relevantes que outros. A primeira versão de produção, a primeira `1.0.0`. Não é necessário salvar cada nova versão, apenas as mais importantes. Isso você quem define.

Por fim, é fácil compreender como isso complementa o GitHub Flow de forma eficiente. Boa parte do nosso trabalho é feita em branches, e algo tão vago quanto "crie sua própria branch" não tem muito significado. Um bom nome de branch, assim como bons commits, ajudam a encontrar alterações no futuro e entender como o sistema se desenvolve ao longo do tempo. No início, isso não parece ter importância, mas com o passar dos anos, é um esforço que se paga.

## Versionamento Semântico

O versionamento semântico é utilizado para manter o registro das versões do software ao longo do tempo. Ele é empregado diretamente em branches de release (por exemplo, `release/0.1.0`) para armazenar cópias do trabalho, mas também desempenha um papel crucial em informar a equipe de desenvolvimento sobre o impacto das mudanças realizadas em cada atualização do software.

Para fornecer informações claras e relevantes, o versionamento semântico é estruturado em três níveis de versões, expressos no formato MAJOR.MINOR.PATCH. Esses números indicam a gravidade e a natureza das modificações realizadas no software:

- **MAJOR (1.x.x)**: É o caso mais drástico, onde novas funcionalidades são introduzidas (`feat`), mas trazem uma quebra de compatibilidade com o código existente. Isso significa que a versão anterior não pode mais ser usada ou precisará ser mantida separadamente.
- **MINOR (x.1.x)**: Trata-se de novas funcionalidades (`feat`) mantendo a compatibilidade com o código existente. Para a maioria dos sistemas, esse é o caso mais comum de alteração.
- **PATCH (x.x.1)**: Se refere a correções significativas que justifiquem uma branch própria (`fix`). Ajustes menores, como correções de erros de digitação na documentação, geralmente não requerem a atualização da versão PATCH, a menos que impactem diretamente o uso ou a compreensão do software.

Outro detalhe importante é que a contagem de PATCH é reiniciada a cada nova versão MINOR, assim como a contagem de MINOR é reiniciada a cada nova versão MAJOR. Isso significa que, se houver uma mudança que quebre a compatibilidade, o software não passará da versão `1.1.2` para `2.1.2`, mas sim para `2.0.0`.

No entanto, para o primeiro lançamento de um software, não é incomum que a versão inicial seja `0.1.0`. Isso ocorre especialmente em equipes ágeis, que valorizam uma entrega contínua. A versão `1.0.0` que marca a primeira versão estável e bem documentada só pode ser atingida depois do cumprimento de certos critérios:

1. **Ter documentação pública:** Documentação abrangente deve estar disponível para usuários e desenvolvedores, detalhando os recursos, uso e API do software.
2. **Conduzir testes completos:** Procedimentos de teste rigorosos devem ser implementados para validar a estabilidade e confiabilidade do software.
3. **Reunir feedback dos usuários:** O feedback dos usuários deve ser coletado e integrado para identificar e resolver problemas potenciais.

> A versão mínima recomendada pelo versionamento semântico inicia em `0.1.0`.

Devido a essas exigências, geralmente leva tempo para atingir a primeira versão estável. Como resultado, até mesmo produtos em produção podem estar longe desse estado inicialmente.

Até chegarmos na primeira versão estável, trabalhamos incrementando o número PATCH conforme necessário, normalmente a cada nova versão. Também podemos aumentar o número MINOR após adições significativas de recursos, mas nunca aumentamos o número MAJOR até que todas as regras acima sejam atendidas.

**Exemplo de progressão de versão:**

- Lançamento inicial: `0.1.0`
- Primeira correção de bug: `0.1.1`
- Recurso secundário adicionado: `0.1.2`
- Recurso principal adicionado: `0.2.0`

Além dessas versões, as versões de pré-lançamento podem incluir identificadores adicionais para indicar que ainda estão em desenvolvimento. Exemplos comuns são `0.1.4-alpha` e `0.1.4-beta`. Também é possível adicionar metadados que garantem a compatibilidade da build, como em `0.1.4-alpha+001` ou `0.1.4+20130313144700`. Esses valores são especialmente úteis quando há mudanças que afetam a compatibilidade da aplicação sem alterar o código-fonte, como a atualização de dependências externas, ajustes na configuração do ambiente ou modificações em chaves de API.

Para finalizar, é importante considerar o momento adequado para incrementar os valores de versão. A situação ideal é durante o merge na branch de desenvolvimento. Contudo, em equipes com múltiplos desenvolvedores, isso pode gerar conflitos. Portanto, o uso de ferramentas de automação para realizar o incremento de versão com base em commits é recomendado. Para que isso funcione de forma eficaz, é fundamental que os commits sigam padrões consistentes, como o uso de mensagens claras e padronizadas, que indiquem corretamente o tipo de mudança realizada (por exemplo, `feat`, `fix` e `chore`). Isso reduz o risco de erros e garante que a versão do software seja sempre um reflexo preciso do seu estado atual.

## Conventional Commits

O conventional commits fornece um conjunto fácil de regras para criar um histórico de commit explícito; o que torna mais fácil escrever ferramentas automatizadas em cima. Esta convenção se encaixa com o Versionamento Semântico, descrevendo os recursos, correções e mudanças significativas feitas nas mensagens de commit.

```sh
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

O commit contém os seguintes elementos estruturais, para comunicar a intenção aos consumidores da sua biblioteca:

1. `fix`: Equivalente ao PATCH
2. `feat`: Equivalente ao MINOR
3. `feat!`: Equivalente ao MAJOR

> Adicionar ! após o tipo indica uma quebra de compatibilidade com a versão antiga, também conhecida como BREAKING CHANGE

Por padrão existem apenas `feat`, `fix` e `BREAKING CHANGE`, porém outros padrões incluem tipos adicionais para melhor legibilidade dos commits. Esses grupos extras não possuem influencia no versionamento semântico, por tanto não são mandatórios.

Incluindo uma lista maior de tipos, podemos dividir em dois grandes grupos.

Alterações que modificam o código da aplicação:

- `feat`: Um novo recurso
- `fix`: Uma correção de bug
- `refactor`: Uma alteração de código mantém a funcionalidade e muda apenas a organização
- `revert`: Reverte alterações de commits antigos. Usado com `git revert`

Alterações que modificam outros arquivos:

- `docs`: Alterações na documentação
- `test`: Alterações em testes
- `ci`: Alterações no CI/CD
- `chore`: Tarefas gerais que não envolvem código ou sem classificação especifica

Exemplo:

```sh
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Não há imposição sobre maiúsculas e minúsculas no tipo, corpo ou qualquer outra parte do comentário. No entanto, é importante ser consistente, caso contrário, as ferramentas automatizadas podem não ser capazes de lidar com seu commit.

## Referências

- [GitHub Flow - Docs](https://docs.github.com/en/get-started/using-github/github-flow)
- [Git Flow: entenda o que é, como e quando utilizar](https://www.alura.com.br/artigos/git-flow-o-que-e-como-quando-utilizar)
- [Semantic Versioning 2.0.0 - Docs](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
- [angular/CONTRIBUTING](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
