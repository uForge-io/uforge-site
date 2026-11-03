---
icon: lucide/circle-help
description: "Perguntas frequentes sobre produtos SF32: escolha de chips, módulos e placas, memória e interfaces, Bluetooth, GPIOs, marcações, disponibilidade e personalização."
tags:
    - Hardware
    - FAQ
---

# Perguntas frequentes sobre SF32 { #sf32-faq }

## 1. Escolha do produto { #choosing-a-product }

### 1.1. Qual família SF32 devo escolher? { #choosing-a-family }

Comece por estes fatores essenciais de seleção:

- **Resolução do display:** resolução em pixels, interface, taxa de atualização e memória de framebuffer necessárias.
- **Modo Bluetooth:** apenas BLE ou modo duplo com BLE e Bluetooth Classic.
- **Número de GPIOs:** pinos utilizáveis após considerar as atribuições de interfaces e memória.
- **Tamanho do encapsulamento:** área ocupada, passo dos pinos e requisitos de montagem da PCB.
- **Alimentação:** bateria ou fonte regulada, faixa de tensão de operação e níveis de E/S.
- **Funções de áudio:** requisitos de ADC/DAC, I2S e PDM, incluindo canais de microfone.

Compare componentes exatos, não apenas números de família: um número maior não significa automaticamente uma opção mais adequada. Cada um desses fatores é um filtro do [Seletor de produtos](../product-selector.md): defina-os lá para pré-selecionar componentes exatos.

[Comparação de famílias](SF32_family.md) · [Seletor de produtos](../product-selector.md)

### 1.2. Devo usar um chip, um módulo ou uma placa de desenvolvimento? { #chip-or-modules }

Use uma placa de desenvolvimento para avaliar a plataforma e validar o firmware. Um módulo reduz o trabalho de projeto de RF, do circuito do cristal e de roteamento da memória na placa portadora, além de poder diminuir o custo total de desenvolvimento. Em produtos de menor volume, ele também transfere ao fornecedor a gestão da cadeia de suprimentos dos componentes internos; em algumas regiões, a certificação de RF do módulo pode ser especialmente útil. Opte pelo projeto com chip diretamente quando o custo, o tamanho ou a flexibilidade justificarem assumir o trabalho de esquemático, layout e RF. Nenhuma das opções elimina a necessidade de validar o produto final. Mais módulos serão listados à medida que estiverem disponíveis.

[Planejar um produto](product-planning.md)

### 1.3. Com qual placa de desenvolvimento devo começar? { #choosing-a-board }

Comece pela placa de desenvolvimento com LCD da família do chip escolhido: [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) (variante de memória N32R16) ou [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) (variante N16R32N1). Para o SF32LB52x, também há placas compactas: [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) e [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) (para avaliação de baixo consumo em wearables). Confirme se a variante de memória da placa corresponde ao código-alvo; o guia oficial de modelos de placas da SiFli lista todas elas.

[Seletor de produtos](../product-selector.md) · [Guia oficial de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html)

### 1.4. Como interpretar os códigos de chips e módulos? { #reading-part-numbers }

Leia o código de pedido completo, não apenas o prefixo da família. Os códigos dos chips distinguem dispositivo, encapsulamento e memória; os sufixos dos módulos descrevem o armazenamento e a memória instalados. Consulte exemplos e exceções históricas do guia e confirme com o fornecedor a configuração disponível para pedido.

[Nomenclatura SF32](SF32_namingrule.md)

## 2. Memória e especificações { #memory-and-specifications }

### 2.1. Qual é a diferença entre SRAM, PSRAM e Flash? { #memory-types }

SRAM e PSRAM guardam dados de execução, que se perdem quando a alimentação é removida; os modos de retenção dependem do dispositivo. SRAM interna e PSRAM externa ou integrada ao encapsulamento diferem em acesso, largura de banda e consumo. Flash é armazenamento não volátil para firmware e recursos. Mais Flash não substitui RAM de trabalho insuficiente.

[Tipos de memória](../../learn/architecture/psram-and-memory-types.md)

### 2.2. De quanta memória minha aplicação precisa? { #sizing-memory }

Reserve RAM para o sistema operacional, pilhas, heap, buffers gráficos, áudio e tarefas simultâneas. Um framebuffer básico exige largura × altura × bytes por pixel × quantidade de buffers; considere alinhamento do passo de linha e buffers extras de renderização. Calcule separadamente armazenamento não volátil para firmware, fontes, imagens, áudio, arquivos e imagens OTA. Meça o pico de uso com a carga pretendida.

[Visão geral de gráficos](../../learn/graphics/overview.md) · [Planejar um produto](product-planning.md)

### 2.3. Quando escolher NOR, NAND ou eMMC? { #choosing-storage }

Escolha conforme o caminho de inicialização, a capacidade, o padrão de acesso e o suporte de software, não apenas a capacidade. NOR é comum para código e leituras aleatórias; NAND exige gerenciamento adequado de blocos de apagamento, ECC e blocos defeituosos; eMMC inclui um controlador de armazenamento gerenciado. Nestas descrições, SPI-NAND e QSPI-NAND são a mesma opção, não uma divergência entre produtos. Confirme o suporte do bootloader, do driver e do sistema de arquivos para o dispositivo exato.

[Tipos de memória](../../learn/architecture/psram-and-memory-types.md) · [Códigos de sufixo dos módulos](SF32_namingrule.md#module-naming)

### 2.4. Todos os componentes têm todos os recursos da família? { #family-versus-sku }

Não. O resumo da família pode combinar capacidades de vários componentes. Memória, alimentação, pinos utilizáveis e interfaces expostas dependem do SKU, do encapsulamento e da multiplexação. Um periférico presente no chip pode não estar acessível no módulo ou na placa. Confira a tabela de variantes, o datasheet e a pinagem do componente, além do suporte à função no SDK.

[Comparação de famílias](SF32_family.md) · [Seletor de produtos](../product-selector.md)

## 3. Adequação à aplicação { #application-fit }

### 3.1. Como escolher um dispositivo para meu display? { #choosing-a-display }

Verifique primeiro a interface elétrica e a temporização do painel; em seguida, confira a resolução, o formato de pixel, a taxa de atualização, a memória de framebuffer e a largura de banda. A resolução máxima, por si só, não garante uma exibição fluida. Confirme o suporte à aceleração gráfica e ao driver do painel e teste telas e animações representativas com a configuração de memória prevista.

[Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [Controlador de display](../../learn/graphics/display-controller.md) · [Visão geral de gráficos](../../learn/graphics/overview.md)

### 3.2. Como verificar o suporte a áudio e microfones? { #audio-and-microphones }

Confira canais ADC e DAC para caminhos analógicos, I2S para dispositivos de áudio digital e PDM para microfones digitais. Uma interface PDM pode transportar até dois canais de microfone; número de interfaces não é número de microfones. Os canais utilizáveis dependem também dos pinos expostos, multiplexação, drivers e roteamento. Verifique a configuração pretendida, em vez de somar interfaces.

[Visão geral de áudio](../../learn/audio/overview.md) · [Glossário](../../about/glossary.md)

### 3.3. Quais produtos suportam BLE, Bluetooth Classic ou ambos? { #bluetooth-modes }

SF32LB55x oferece apenas BLE; SF32LB52x, SF32LB56x, SF32LB57x e SF32LB58x oferecem Bluetooth em modo duplo. A capacidade do rádio não garante todos os perfis, codecs e recursos em cada configuração do SDK. Confira o perfil necessário e o respectivo exemplo testado; o suporte a BLE, por si só, não comprova suporte a áudio Bluetooth Classic nem a BLE Audio.

[Comparação de famílias](SF32_family.md) · [Visão geral de Bluetooth](../../learn/bluetooth/overview.md)

### 3.4. Meu projeto precisa de um dispositivo Wi-Fi externo? { #wifi }

Os produtos SF32 deste catálogo não integram rádio Wi-Fi. A opção Wi-Fi do seletor indica um caminho externo via SDIO, não Wi-Fi integrado. O dispositivo externo exige alimentação, pinos, drivers e software de rede compatíveis; ter SDIO não comprova uma solução funcional.

[Seletor de produtos](../product-selector.md)

### 3.5. Quantos GPIOs estão realmente disponíveis? { #usable-gpios }

Parta do encapsulamento e da memória exatos e desconte pinos ocupados pelas interfaces e funções da placa. Um módulo expõe apenas parte dos pinos do chip. No SF32LB57x BGA112, os pinos adicionais MPI3/saída estática têm função restrita, não são GPIOs de atribuição livre. Não trate o total anunciado como orçamento garantido de GPIOs da aplicação.

[Notas de GPIO das famílias](SF32_family.md) · [Variantes SF32LB57x](../chips/SF32LB57x.md)

## 4. Disponibilidade e planejamento do produto { #availability-and-product-planning }

### 4.1. O que as marcações do módulo significam para meu produto? { #module-markings }

Use o resumo das etiquetas para identificar as variantes marcadas e solicite os documentos de aprovação e as condições de integração aplicáveis. Um identificador FCC ou marcação CE impressos não comprovam, por si só, que o produto final esteja coberto. Mudanças de antena, placa portadora ou gabinete exigem análise conforme as condições aplicáveis.

[Marcações do módulo 52](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [Marcações do módulo 56](../modules/SF32LB56-MOD.md#regulatory-markings) · [Marcações do módulo 58](../modules/SF32LB58-MOD.md#regulatory-markings)

### 4.2. Posso solicitar outra configuração de memória ou módulo? { #custom-configurations }

Informe à μForge.io qual chip ou módulo deseja, as capacidades de armazenamento e PSRAM, as interfaces e os requisitos de antena, além do volume e do cronograma previstos. Confirme a viabilidade, o suporte do SDK, a quantidade mínima de pedido e o prazo antes de fechar o projeto. Uma configuração listada em documentos antigos não garante disponibilidade atual; o SF32LB58-MOD-E4R32N1 não está mais disponível devido à escassez de chips de memória.

[Entrar em contato com a μForge.io](../../about/contact.md) · [Disponibilidade do módulo 58](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### 4.3. Como confirmar disponibilidade e obter amostras? { #samples-and-documentation }

Use os links de compra e documentação da página do produto e informe ao fornecedor o código completo e a revisão desejada. Confirme a disponibilidade atual, a configuração de memória, a opção de antena e o prazo. Sempre que possível, comece com uma placa de avaliação compatível e use a documentação oficial do componente exato, e não o resumo da família, como referência final de projeto.

[Entrar em contato com a μForge.io](../../about/contact.md) · [Seletor de produtos](../product-selector.md)
