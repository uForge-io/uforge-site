---
icon: lucide/code-2
title: "Visão geral do desenvolvimento"
description: "Um guia orientado a tarefas para desenvolver produtos SF32 com o SiFli-SDK: fluxo de trabalho diário, notas de aplicação, exemplos, ferramentas, tópicos de firmware e alternativas da comunidade."
tags:
    - Desenvolvimento
    - Software
---

# Visão geral do desenvolvimento { #develop }

A seção Desenvolvimento ajuda você a transformar uma placa SF32 funcional em firmware de produto fácil de manter. Depois de executar `hello_world` com sucesso pela primeira vez, use este conteúdo para selecionar a configuração da placa, compilar e gravar o firmware de forma reproduzível, adaptar um exemplo próximo do seu caso, integrar os recursos do produto, diagnosticar falhas e planejar atualizações e recuperação.

Consulte [Primeiros passos](../getting-started/index.md) para a primeira execução da placa; [Produtos SF32](../sf32-products/index.md) para escolher o dispositivo e a placa de desenvolvimento; [Hardware](../hardware/index.md) para esquemáticos e hardware de produção; e [Aprender](../learn/index.md) para entender os fundamentos da arquitetura. Use esta seção quando precisar de um fluxo de engenharia e de orientações de implementação para tarefas específicas.

!!! info "SiFli-Solution"
    SiFli-Solution é outro pacote de software da SiFli que a μForge.io ainda não documenta. O conteúdo desta seção se limita ao SiFli-SDK e às alternativas da comunidade listadas abaixo. Se o produto precisar de uma solução mais completa para dispositivos com display, consulte a [documentação oficial do SiFli Solution](https://docs.sifli.com/projects/solution/index.html) e entre em contato diretamente com a SiFli. Um produto complexo que siga esse caminho pode exigir envolvimento direto e aprofundado da SiFli.

## Estabeleça uma base de referência com o SiFli-SDK { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) é o pacote oficial da SiFli baseado em RT-Thread e o caminho de desenvolvimento de referência para o firmware SF32. Comece por ele, a menos que exista um motivo concreto para avaliar outro ecossistema: é a base com a documentação mais abrangente para suporte a placas, Bluetooth, gráficos, áudio, armazenamento, gerenciamento de energia e desenvolvimento para produção.

Antes de implementar os recursos do produto, estabeleça e registre uma base reproduzível:

1. Selecione a configuração exata da placa do SDK em [Configuração da placa](platforms/sifli-sdk/board-configuration.md).
2. Execute com sucesso o fluxo de [Compilar, gravar e monitorar a saída serial](platforms/sifli-sdk/build-flash-monitor.md).
3. Registre a versão ou o commit do SDK, o nome da placa, os comandos de compilação e gravação, as configurações da porta serial e um log de inicialização.
4. Comece pelo [exemplo](examples/index.md) mais próximo, de preferência um que já exercite o subsistema mais complexo do produto.

Esse registro servirá de referência para futuras alterações na aplicação, adaptações para outras placas, análise de falhas em testes e recuperação em campo.

## Encontre orientações por tarefa { #find-guidance-by-task }

<div align="center"><em>Tabela: tarefas de desenvolvimento SF32</em></div>

<div align="center" markdown>

| Tarefa | Comece por aqui | Em seguida, consulte |
|:----------------|:-----------|:---------|
| Compilar e gravar o firmware; verificar a saída serial | [Compilar, gravar e monitorar a saída serial](platforms/sifli-sdk/build-flash-monitor.md) | [Ferramentas](tools/index.md) para gravação automatizada, rastreamento e utilitários de análise de falhas. |
| Adaptar o firmware a uma placa de desenvolvimento, módulo ou hardware próprio | [Configuração da placa](platforms/sifli-sdk/board-configuration.md) | O guia de hardware correspondente e o exemplo mais próximo para essa placa. |
| Reutilizar um driver ou uma camada de middleware em vários projetos | [Componentes e `sf_pkg`](platforms/sifli-sdk/components.md) | Um exemplo mínimo e os limites de configuração documentados. |
| Implementar um periférico ou subsistema específico | [Notas de aplicação do SDK](platforms/sifli-sdk/sdk-application-notes.md) | O guia oficial do SDK vinculado, que especifica as APIs, os símbolos de configuração e os comandos. |
| Começar o desenvolvimento do produto com código que já funciona | [Exemplos](examples/index.md) | A configuração correspondente da placa e testes após cada alteração. |
| Diagnosticar uma falha ou coletar evidências do produto | [Depuração e diagnóstico](platforms/sifli-sdk/debugging-diagnostics.md) | [Logs e análise de falhas](firmware-topics/logging-crash-analysis.md). |
| Alterar o layout de boot, o armazenamento, as atualizações, o USB ou o comportamento de energia | [Tópicos de firmware](firmware-topics/index.md) | O tópico correspondente sobre partições, atualizações, USB, energia ou logs antes de alterar o código. |

</div>

## Notas de aplicação do SiFli-SDK { #sifli-sdk-application-notes }

As notas de aplicação são organizadas por tarefa de integração, não pela ordem do catálogo do SDK. Comece pelo subsistema de interesse. Antes de reutilizar uma configuração ou um comando, confira o escopo de famílias de chips, a configuração da placa, a versão do SDK e os pré-requisitos de hardware indicados.

<div align="center"><em>Tabela: caminhos para as notas de aplicação do SiFli-SDK</em></div>

<div align="center" markdown>

| Área de engenharia | Ponto de partida nas notas de aplicação |
|:-----------------|:--------------------------------|
| Analógico e sensores | [Amostragem com GPADC](platforms/sifli-sdk/application-notes/adc-sampling.md) · [Integrar e ler sensores](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| Armazenamento e recursos gráficos | [Uso de Flash externa](platforms/sifli-sdk/application-notes/external-flash.md) · [Comprimir recursos gráficos com EZIP](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| Confiabilidade, energia e depuração | [Configurar o watchdog](platforms/sifli-sdk/application-notes/watchdog.md) · [Configurar e medir o baixo consumo](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [Capturar logs e analisar falhas](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| Validação de RF e Bluetooth | [Executar testes de RF com o SiFli-SDK](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Executar testes de sinalização Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Executar testes individuais de RF para Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## Navegue pela seção Desenvolvimento { #navigate-the-develop-section }

<div align="center"><em>Tabela: mapa da seção Desenvolvimento</em></div>

<div align="center" markdown>

| Área | Finalidade |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Estabelecer o fluxo de referência com suporte: configuração, compilação, gravação, componentes reutilizáveis e diagnóstico. |
| [Notas de aplicação do SDK](platforms/sifli-sdk/sdk-application-notes.md) | Aplicar o SDK a uma tarefa específica, como ADC, sensores, Flash externa, baixo consumo, diagnóstico ou testes de RF e Bluetooth. |
| [Exemplos](examples/index.md) | Selecionar e adaptar uma implementação funcional para a placa exata e o subsistema mais complexo do produto. |
| [Ferramentas](tools/index.md) | Escolher ferramentas de download, monitoramento, rastreamento, análise de falhas, recursos e produção. |
| [Tópicos de firmware](firmware-topics/index.md) | Tomar decisões transversais sobre partições, OTA/DFU, USB, gerenciamento de energia e evidências de diagnóstico. |
| [Experimental / comunidade](platforms/zephyr/overview.md) | Avaliar Zephyr, Arduino, MicroPython ou Rust considerando o escopo e o nível de maturidade indicados em cada página. |

</div>

## Avalie com critério as alternativas da comunidade { #evaluate-community-paths-deliberately }

O grupo [Experimental / comunidade](platforms/zephyr/overview.md) é destinado a equipes que têm um motivo para ir além do caminho de referência do SDK. Isso não significa que essas alternativas tenham o mesmo nível de suporte para produção.

<div align="center"><em>Tabela: adequação das alternativas da comunidade</em></div>

<div align="center" markdown>

| Caminho | Considere quando | Entenda como |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Você precisa das APIs do Zephyr, de devicetree, Kconfig ou de trabalho downstream com placas. | Um caminho de avaliação downstream, específico para cada placa. |
| [Arduino](platforms/arduino/overview.md) | Você precisa de sketches ou de um protótipo rápido de periférico em uma placa compatível. | Um caminho beta limitado à placa compatível. |
| [MicroPython](platforms/micropython/status.md) | Você está avaliando o suporte futuro a scripts. | Uma página de status até existir um port público e reproduzível. |
| [Rust](platforms/rust/overview.md) | Você pode avaliar o trabalho de HAL/PAC e contribuir com correções upstream. | Um caminho da comunidade ainda em desenvolvimento. |

</div>

Antes de adotar um desses caminhos para um produto, valide na placa exata todos os periféricos necessários, o layout da Flash, o método de depuração e o procedimento de recuperação. Registre a revisão testada, a configuração, os comandos e os resultados junto ao código-fonte do produto.

## Evidências de prontidão do firmware para o produto { #product-ready-development-evidence }

Antes de considerar um caminho de firmware pronto para ser incorporado ao produto, confirme que você consegue responder:

- Qual chip, revisão da placa ou do hardware próprio e configuração foram testados?
- Qual SDK, pacote, branch ou commit gerou o firmware?
- Quais comandos de compilação, gravação, monitoramento e recuperação completa funcionam?
- Qual exemplo ou teste comprova cada periférico e subsistema necessário do produto?
- Qual layout de partições, comportamento de atualização, meta de consumo de energia e caminho de decodificação de falhas foram validados?

Se faltar alguma resposta, o trabalho ainda pode ser um protótipo útil, mas não constitui uma base de firmware reproduzível para o produto.
