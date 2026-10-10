---
icon: lucide/boxes
description: "Como transformar exemplos do SiFli-SDK em componentes reutilizáveis e pacotes `sf-pkg`: critérios de qualidade, informações a documentar e armadilhas comuns de empacotamento."
tags:
    - Desenvolvimento
    - SiFli-SDK
---

# Componentes e `sf-pkg` { #components-and-sf_pkg }

Projetos SiFli costumam depender de middleware, drivers e componentes reutilizáveis. Quando um projeto vai além da simples cópia de um exemplo, o ecossistema de pacotes e componentes da SiFli permite publicar e manter esses blocos reutilizáveis de firmware.

## Quando criar um componente { #how-to-think-about-components }

Use componentes para o código que deve ser compartilhado entre produtos ou exemplos:

- Drivers de periféricos.
- Suporte a painéis de display.
- Serviços Bluetooth.
- Widgets de GUI.
- Adaptadores de sensores.
- Utilitários de armazenamento.
- Middleware do produto.

Mantenha no projeto da aplicação a lógica específica daquela aplicação até que ela tenha uma interface estável e possa ser usada por mais de um usuário.

## Fluxo de trabalho prático { #practical-workflow }

1. Comece por um exemplo funcional do SDK.
2. Identifique a parte que deve ser reutilizada.
3. Exponha essa funcionalidade por meio de uma API enxuta e bem delimitada.
4. Adicione a configuração pelo mecanismo habitual de build/configuração do SDK.
5. Documente as dependências, o uso de memória e os periféricos necessários.
6. Só então empacote o código como componente reutilizável.

## Distribuir componentes com `sf-pkg` { #use-sf-pkg-to-distribute-components }

Um componente é uma unidade de engenharia reutilizável. O registro de componentes da SiFli é baseado no Conan; o subcomando atual na linha de comando do SDK é `sf-pkg`.

Para consumir um pacote, execute `sdk.py sf-pkg init` no diretório `project` do projeto SDK; o comando cria o arquivo `conanfile.py`. Adicione as referências ao campo `requires` no formato `package/version@<username>`, em que `<username>` é o nome de usuário do registro de pacotes. Em seguida, execute `sdk.py sf-pkg install` nesse mesmo diretório. Os pacotes instalados ficam em `project/sf-pkgs`; os arquivos Kconfig deles são integrados ao `menuconfig`, em `SiFli External Components`.

Para publicar um componente, execute `sdk.py sf-pkg new --name <package_name>` no diretório do componente e revise o `conanfile.py` gerado. É possível acrescentar `--support-sdk-version <sdk_version_range>` para definir a faixa compatível durante a criação. Com ou sem essa opção, confira se a receita declara em `support_sdk_version` a faixa de versões do SDK pretendida e ajuste-a se necessário. Adote uma versão semântica para o pacote e complete os metadados e as dependências. Depois de se autenticar no registro, compile e envie o pacote:

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

O fluxo exato pode variar conforme a versão do SDK. Consulte os guias da SiFli sobre [integração de pacotes (em chinês)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), [criação e publicação (em inglês)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html) e [a versão em chinês](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html) para ver a configuração, a autenticação e os comandos específicos de cada versão.

## Critérios de qualidade { #component-quality-bar }

Um componente está pronto para ser compartilhado quando:

- Compila a partir de um checkout limpo, com o ambiente e as dependências documentados.
- Inclui um exemplo mínimo.
- Documenta as configurações necessárias.
- Não depende de suposições implícitas sobre a placa.
- Informa os erros com clareza.
- Documenta todo uso de recursos globais, incluindo as regras de propriedade e liberação.
- Declara as regras de propriedade de threads, callbacks e memória.

## O que documentar { #what-to-record }

Cada componente reutilizável deve documentar:

- Chips e placas compatíveis.
- Versão necessária do SDK.
- Periféricos e pinos necessários.
- Configuração necessária de RTOS/middleware.
- Comportamento de threads e callbacks.
- Requisitos de RAM, Flash e stack.
- Caminho do projeto de exemplo.

## Armadilhas a evitar { #avoid-these-traps }

<div align="center"><em>Tabela: Armadilhas a evitar</em></div>

<div align="center" markdown>

| Armadilha | Abordagem recomendada |
|:-----|:----------------|
| Copiar um exemplo inteiro para cada produto. | Extraia apenas a camada reutilizável e estável. |
| Ocultar os nomes dos pinos no código do componente. | Passe os recursos da placa pela configuração. |
| Pressupor que existe apenas um caminho de display/áudio. | Documente os caminhos de hardware compatíveis. |
| Ignorar o uso de memória. | Registre os requisitos de stack, heap, DMA e buffers. |
| Distribuir sem um exemplo. | Inclua um exemplo mínimo de integração. |

</div>
