---
icon: lucide/network
title: "Visão geral da arquitetura"
description: "Decisões de arquitetura SF32 sobre processadores, memória, Bluetooth e execução por hardware, com verificação das capacidades de cada dispositivo."
tags:
    - Arquitetura
    - Aprendizado
---

# Visão geral { #architecture-overview }

Os dispositivos SF32 variam quanto ao processador, à memória e ao hardware especializado. Conforme os blocos presentes no componente escolhido, o projeto pode delegar a um subsistema dedicado tarefas sensíveis à temporização ou que precisam permanecer ativas. Se houver um acelerador adequado, ele também poderá executar por hardware tarefas compatíveis, como o processamento gráfico. Esta seção organiza os temas de arquitetura em torno de cinco decisões de engenharia: onde o código da aplicação é executado; onde ficam o código e os buffers; quais tarefas cabem ao controlador sem fio; quando faz sentido usar um mecanismo programável de tarefas; e se o dispositivo escolhido oferece os blocos de arquitetura e as interfaces necessários.

## Comece pela carga de trabalho { #start-with-the-workload }

<div align="center"><em>Tabela: Escolha o conteúdo de arquitetura adequado à sua decisão</em></div>

<div align="center" markdown>

| Se você precisa decidir… | Comece por aqui | O que o artigo esclarece |
|:----------------------|:-----------|:-----------------|
| Como o firmware da aplicação é executado e interage com o sistema de memória | [STAR-MC1](star-mc1.md) | O modelo de processador de aplicação compatível com Cortex-M33, o comportamento do cache e as características de carga de trabalho nos dispositivos SF32 relevantes. |
| Onde armazenar código, recursos e buffers grandes ou que exigem baixa latência | [PSRAM em comparação com outros tipos de memória para sistemas embarcados](psram-and-memory-types.md) | As diferenças entre PSRAM, SRAM, DRAM, RRAM e MRAM em capacidade, latência, retenção de dados, largura de banda e consumo de energia. |
| Quais tarefas Bluetooth permanecem no controlador e quais cabem ao firmware do produto | [Processador Bluetooth](../bluetooth/processor.md) | A divisão entre temporização do controlador, responsabilidades do host e da aplicação, aspectos de RF e operação de baixo consumo. |
| Se uma sequência específica de operações em periféricos precisa de um mecanismo programável de tarefas | [PTM: máquina de tarefas paralelas](ptm-parallel-task-machine.md) | O guia de projeto de hardware do SF32LB57x documenta um bloco PTM com 16 canais para executar tarefas periféricas compactas e sensíveis à temporização, difíceis de implementar com periféricos de função fixa. |
| Se o dispositivo escolhido realmente oferece a arquitetura e as interfaces necessárias | [Família SF32](../../sf32-products/family/SF32_family.md) | A seleção depende do dispositivo completo, incluindo memória, interfaces, conectividade sem fio e aceleradores disponíveis. |

</div>

## Critérios práticos de decisão { #practical-decision-rule }

Analise as decisões de arquitetura nesta ordem:

1. Mantenha a lógica do produto, o comportamento da interface de usuário, as decisões da aplicação e os drivers comuns no firmware da aplicação. Use o conteúdo sobre STAR-MC1 para avaliar o processador e o cache de acordo com o dispositivo e a carga de trabalho escolhidos, em vez de se basear em expectativas genéricas de benchmarks.
2. Defina desde o início onde o código e os dados ficarão na memória. Posicione os que exigem baixa latência nos níveis adequados da hierarquia de memória. Antes de definir uma carga de trabalho de interface, áudio, IA ou conectividade, dimensione também a capacidade da memória externa, a largura de banda da interface e o orçamento de energia.
3. Separe os requisitos de temporização do controlador Bluetooth das regras de funcionamento do produto. O conteúdo sobre o processador Bluetooth ajuda a identificar as responsabilidades do controlador, do host e da aplicação, além dos aspectos de RF e baixo consumo que precisam ser projetados em conjunto.
4. Para tarefas personalizadas de periféricos, verifique primeiro se um timer, um caminho DMA ou um mecanismo existente de UART, SPI, I2C, áudio, display ou Bluetooth já atende ao requisito. No SF32LB57x, considere o PTM somente quando a tarefa realmente exigir controle preciso da temporização ou não puder ser implementada adequadamente com esses blocos padrão.

Para cada decisão, verifique as capacidades documentadas do dispositivo escolhido antes de presumir que determinado bloco de arquitetura está presente ou pode ser programado pelo usuário. O guia de projeto de hardware do SF32LB57x documenta um bloco PTM com 16 canais. Antes de basear um projeto no PTM, confirme o suporte na documentação do dispositivo de destino.
