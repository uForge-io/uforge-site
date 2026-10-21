---
icon: lucide/lightbulb
title: "Visão geral da seção Aprendizado"
description: "Encontre orientações sobre a arquitetura SF32 e seus subsistemas: gráficos, Bluetooth, IA, áudio, baixo consumo de energia e arquitetura dos processadores."
tags:
    - Aprendizado
---

# Visão geral da seção Aprendizado { #learn-overview }

Use a seção **Aprendizado** para tomar decisões de arquitetura e de subsistemas enquanto ainda é fácil ajustá-las no firmware ou no hardware. Estas páginas explicam como os blocos do SF32 se integram e quando uma CPU de uso geral deve delegar tarefas a um mecanismo gráfico, controlador sem fio, acelerador de IA ou outro hardware dedicado. Elas também indicam o que validar quando gráficos, conectividade sem fio, áudio, IA e memória precisam coexistir em um produto sujeito a um orçamento de consumo de energia.

Consulte [Primeiros passos](../getting-started/index.md) para colocar a placa em funcionamento pela primeira vez, [Tutoriais](../getting-started/tutorials/overview.md) para seguir exercícios guiados, [Desenvolvimento](../develop/index.md) para conhecer fluxos de trabalho e exemplos de software e a [Família SF32](../sf32-products/family/SF32_family.md) para selecionar componentes e preparar o projeto para produção.

## Comece pela sua dúvida de projeto { #start-with-your-design-question }

<div align="center"><em>Tabela: Encontre o caminho de aprendizado adequado</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Se você precisa… | Comece por aqui | Em seguida, consulte |
|:----------------|:-----------|:-------------|
| Entender o processador, a memória e como o SF32 delega tarefas ao hardware dedicado | [Visão geral da arquitetura](architecture/overview.md) | [STAR-MC1](architecture/star-mc1.md), [PSRAM em comparação com outros tipos de memória para sistemas embarcados](architecture/psram-and-memory-types.md) e [PTM](architecture/ptm-parallel-task-machine.md), quando forem relevantes para o dispositivo selecionado. |
| Desenvolver uma interface gráfica ou definir a estratégia para recursos visuais e framebuffer | [Visão geral de gráficos](graphics/overview.md) | [Controlador de display](graphics/display-controller.md), [ePicasso](graphics/epicasso-gpu.md), [eZip](graphics/ezip.md) e [TurboPixel](graphics/turbopixel.md), conforme as decisões de display, renderização e compressão. |
| Conectar um telefone, acessório ou dispositivo de áudio | [Visão geral do Bluetooth](bluetooth/overview.md) | [Processador Bluetooth](bluetooth/processor.md) para entender a divisão entre controlador e aplicação; depois, [Bluetooth PAN](bluetooth/pan.md) se o produto precisar de transporte IP por meio do telefone. |
| Adicionar inferência no dispositivo | [Visão geral de IA](ai/overview.md) | [Acelerador de IA](ai/accelerator.md) e, em seguida, as verificações de memória, latência e consumo energético exigidas pelo modelo e pelo pipeline. |
| Capturar, reproduzir ou processar áudio | [Visão geral de áudio](audio/overview.md) | [Audio Server e bufferização](audio/audio-server-buffering.md), além das orientações de Bluetooth caso o produto transmita áudio ou faça chamadas sem fio. |
| Atingir a meta de autonomia da bateria | [Visão geral de baixo consumo](low-power/overview.md) | [Medição e validação do consumo de energia](low-power/measurement-and-validation.md) e, em seguida, as páginas de Bluetooth, gráficos, áudio e IA para entender o consumo de cada subsistema. |

</div>

## Use as páginas em conjunto { #use-the-pages-together }

A maioria dos produtos combina vários subsistemas. Em um dispositivo vestível com display, BLE e microfone, as decisões precisam considerar em conjunto a autonomia da bateria: a atualização do display afeta o tráfego de memória e o tempo ativo; o escalonamento do Bluetooth afeta a frequência de despertar; o áudio e a IA afetam os buffers e a latência. Cada decisão altera o orçamento de energia do produto.

Use estas páginas como parte de um ciclo de projeto:

1. Comece pelo principal requisito do produto e pelo dispositivo selecionado. Confirme se a documentação desse dispositivo especifica as capacidades necessárias de display, Bluetooth, IA, áudio, memória e baixo consumo.
2. Defina as responsabilidades dos processadores e a alocação de memória antes de integrar a aplicação. Planeje onde ficarão o conjunto de trabalho, os framebuffers, o modelo e os buffers de áudio; coloque o código e os dados necessários às tarefas sensíveis à latência em uma memória adequada de baixa latência; e use hardware dedicado somente quando seus recursos e requisitos de integração forem compatíveis com o produto.
3. Parta da visão geral do subsistema mais importante e avance para a página de implementação detalhada. Trate as referências a Bluetooth, memória e baixo consumo como dependências do projeto, não como leitura opcional.
4. Valide a combinação completa no hardware previsto. Use os fluxos de trabalho de [Desenvolvimento](../develop/index.md) e as medições indicadas nas páginas pertinentes de Aprendizado para testar em conjunto o funcionamento, a latência, a largura de banda, o comportamento de RF e o consumo de energia.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi compilada e redigida sem um documento-fonte existente dedicado ao seu conteúdo. Verifique as afirmações técnicas na documentação oficial da SiFli antes de se basear nelas.
