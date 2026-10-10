---
icon: lucide/notebook-tabs
title: "Notas de aplicação do SDK"
description: "Roteiro de consulta por tarefa, com links para as fontes, dos guias de uso do SiFli-SDK para desenvolvimento com SF32."
tags:
    - Desenvolvimento
    - SiFli-SDK
    - Notas de aplicação
---

# Notas de aplicação do SDK { #sdk-application-notes }

Esta página organiza os guias de uso do SiFli-SDK por tarefa de engenharia. Assim, você encontra rapidamente o fluxo de trabalho relevante e sabe quais registros de validação convém manter na documentação do produto.

Os artigos oferecem orientações práticas de integração, mas não substituem o manual do SDK. Antes de aplicar uma configuração, API, exemplo ou procedimento de teste, selecione a família de chips de destino e a versão do SDK no [guia oficial de uso do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html).

## Consulte por tarefa { #read-by-task }

<div align="center"><em>Tabela: Roteiros de consulta das notas de aplicação do SDK</em></div>

<div align="center" markdown>

| Tarefa | Consulte este artigo quando precisar | Tópico no guia oficial |
|:-----|:----------------------------|:--------------------------|
| [Amostragem com GPADC](application-notes/adc-sampling.md) | Estabelecer um fluxo de medição com ADC de uso geral. | Guia de uso do ADC (GPADC) |
| [Integrar e ler sensores](application-notes/sensor-integration.md) | Conectar e validar um sensor externo. | Guia de adição de sensores |
| [Uso de Flash externa](application-notes/external-flash.md) | Armazenar dados, recursos ou um sistema de arquivos na Flash. | Guia de uso da Flash |
| [Configurar o watchdog](application-notes/watchdog.md) | Validar um procedimento de recuperação com watchdog. | Guia de uso do watchdog |
| [Comprimir recursos gráficos com EZIP](application-notes/ezip-image-assets.md) | Converter e integrar recursos de imagem EZIP. | Uso da ferramenta de conversão de imagens EZIP |
| [Configurar e medir o baixo consumo](application-notes/low-power-measurement.md) | Configurar um estado de baixo consumo e comparar as medições. | Guia de desenvolvimento de baixo consumo |
| [Capturar logs e analisar falhas](application-notes/crash-analysis.md) | Preservar os logs correspondentes, o contexto da falha e os símbolos. | Guia de análise de falhas; depuração e logs |
| [Executar testes de RF com o SiFli SDK](application-notes/rf-performance-tests.md) | Escolher entre validação de RF com sinalização, sem sinalização ou de itens individuais. | Guia de testes de RF do SiFli SDK |
| [Executar testes de sinalização Bluetooth](application-notes/bluetooth-signalling-tests.md) | Realizar validação de Bluetooth baseada em protocolo. | Guia de testes de sinalização Bluetooth |
| [Executar testes individuais de RF para Bluetooth](application-notes/bluetooth-single-tone-tests.md) | Seguir o procedimento de teste individual de RF Bluetooth para o item selecionado. | Guia de teste individual de RF Bluetooth |

</div>

## Como usar estes artigos { #how-to-use-these-articles }

1. Comece pela página cujo título corresponde à tarefa de engenharia imediata.
2. Antes de adaptar um exemplo ou comando, confirme os pré-requisitos de projeto, placa, versão, configuração e hardware indicados.
3. Consulte a fonte do SDK vinculada para conferir os caminhos, símbolos de configuração, comandos, APIs e versões das ferramentas.
4. Registre como evidências do projeto a placa validada, a versão do SDK, os arquivos de configuração, os equipamentos de teste e os resultados observados.

Para decisões de arquitetura comuns a várias plataformas, consulte [Tópicos de firmware](../../firmware-topics/index.md). Para conhecer os exemplos compatíveis nos fluxos do SDK e da comunidade, consulte [Exemplos](../../examples/index.md).
