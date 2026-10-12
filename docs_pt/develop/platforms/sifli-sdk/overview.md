---
icon: lucide/package
description: "SiFli-SDK como caminho de referência para desenvolver com SF32: compilação com scons e configuração com sdk.py menuconfig, nomes de placas, estrutura de projetos e prontidão para produção."
tags:
    - Desenvolvimento
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

O SiFli-SDK é o SDK oficial da SiFli para desenvolvimento de firmware SF32. Ele oferece um ambiente baseado em RT-Thread e, para os alvos compatíveis, também inclui exemplos No-OS. Além disso, fornece suporte a placas e middleware mantidos pela SiFli para áreas como Bluetooth, gráficos, áudio, gerenciamento de energia, armazenamento e fluxos de produção. A disponibilidade depende do chip, da placa e da versão do SDK.

!!! info "SiFli-Solution"
    O SiFli-Solution é um pacote de software separado da SiFli e está fora do escopo desta página. Esta página e os materiais de desenvolvimento relacionados tratam apenas do SiFli-SDK. Para conhecer o escopo do SiFli-Solution, os dispositivos compatíveis e os requisitos de acesso, consulte a [documentação oficial do SiFli Solution](https://docs.sifli.com/projects/solution/index.html) e entre em contato diretamente com a SiFli.

Consulte [Primeiros passos com o SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) para instalar o SDK e executar `hello_world` pela primeira vez. Esta página explica como trabalhar com o SDK depois que a cadeia de ferramentas já estiver funcionando.

Referências principais:

- [Guia de instalação do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [Lista de placas SF32LB52x compatíveis com o SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## Quando usar o SiFli-SDK { #when-to-use-sifli-sdk }

Escolha o SiFli-SDK quando precisar de:

- Um caminho documentado, com suporte a placas e exemplos mantidos pela SiFli para o chip e a versão do SDK escolhidos.
- Exemplos e middleware para Bluetooth, display, áudio, energia, armazenamento, USB e OTA quando forem compatíveis com o alvo e a versão selecionados.
- Integração com RT-Thread e ferramentas de shell.
- Configuração da placa por nomes definidos no SDK, como `sf32lb52-lcd_n16r8`.
- Acesso a middleware, ferramentas, layouts de partição e fluxos de produção específicos da SiFli.

## Modelo de desenvolvimento { #development-model }

A página [Primeiros passos com o SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) estabelece a cadeia de ferramentas e uma base funcional com `hello_world`. Depois disso, registre em conjunto a revisão do SDK, a placa selecionada, o diretório do exemplo/projeto, a configuração e os artefatos correspondentes de compilação e gravação, para que a compilação possa ser reproduzida. Quando o nome da placa não especifica o núcleo, o diretório de saída HCPU costuma seguir o formato `build_<board_name>_hcpu/`; por exemplo, `sf32lb52-lcd_n16r8` gera `build_sf32lb52-lcd_n16r8_hcpu/`. Use o diretório realmente gerado para o alvo de placa/núcleo resolvido, em vez de montar o nome manualmente.

Para tornar o desenvolvimento reproduzível, fixe uma branch do SDK, registre o nome da placa, mantenha as alterações locais da placa separadas dos arquivos do fornecedor e faça mudanças de configuração em etapas pequenas e fáceis de revisar. O fluxo detalhado de compilação, gravação e monitoramento está em [Compilar, gravar e monitorar](build-flash-monitor.md).

## Nomes de placas { #board-names }

Os nomes de placas do SiFli-SDK são específicos do SDK e podem diferir dos nomes usados pelo Zephyr, dos FQBNs do Arduino ou dos nomes comerciais das placas. Copie sempre o nome exato da lista de placas compatíveis do SDK ou da documentação do exemplo.

Para as placas SF32LB52 DevKit LCD, um nome de placa usado com frequência nos exemplos de introdução é:

```text
sf32lb52-lcd_n16r8
```

## Estrutura do projeto { #project-structure }

A maioria dos exemplos do SDK segue este padrão:

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

Por exemplo:

```text
example/get-started/hello_world/rtt/project
```

Ao desenvolver o firmware de um produto, comece pelo exemplo funcional mais próximo e altere um subsistema por vez. Assim, você preserva a configuração da placa, as dependências de middleware, as premissas de particionamento e a configuração dos drivers.

## Configuração { #configuration }

No projeto de exemplo, use o comando `menuconfig` do SDK para alterar a configuração de recursos para uma placa selecionada:

```bash
sdk.py menuconfig --board=<board_name>
```

Motivos comuns para acessar a configuração:

- Ativar ou desativar middleware.
- Alterar funções ou perfis Bluetooth.
- Ajustar o suporte a display, sistema de arquivos ou áudio.
- Ajustar o gerenciamento de energia.
- Selecionar opções de log ou shell.

## Perguntas sobre prontidão para produção { #production-readiness-questions }

Antes de adotar o SiFli-SDK em uma branch de produto, responda:

- Qual branch de lançamento do SDK ficará congelada para o produto?
- Quais arquivos de suporte à placa são mantidos pela equipe do produto e quais pertencem ao fornecedor?
- Quais exemplos comprovam o funcionamento dos recursos críticos?
- Qual tabela de partições será usada na fabricação e nas atualizações OTA?
- Quais ferramentas foram aprovadas para gravação na fábrica?
- Quais logs serão habilitados nas compilações de lançamento?
- Qual imagem de recuperação será mantida para uso em laboratório?

## Próximas páginas úteis { #practical-next-pages }

- [Compilar, gravar e monitorar](build-flash-monitor.md)
- [Configuração da placa](board-configuration.md)
- [Componentes e `sf-pkg`](components.md)
- [Exemplos](../../examples/index.md) — escolha o exemplo funcional já validado mais próximo antes de adaptar um subsistema.
- [CodeKit](../../tools/codekit.md) — use o fluxo do VS Code quando for útil, mantendo coerentes com o restante do projeto o nome da placa do SDK e os registros de compilação.
- [Notas de aplicação do SDK](sdk-application-notes.md)
- [Tabelas de partição](../../firmware-topics/partition-tables.md)
- [Depuração e diagnóstico](debugging-diagnostics.md)
