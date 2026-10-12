---
icon: lucide/card-sim
description: "SF32LB58-MOD: módulo Bluetooth de baixo consumo baseado no MCU SF32LB586VDD36; configuração padrão com 16 + 16 MB de HPI-PSRAM e 1 MB de QSPI-NOR, além de variantes NOR, NAND ou eMMC."
tags:
  - Hardware
  - Módulo
---

# SF32LB58-MOD { #sf32lb58-mod }

## Visão geral { #overview }

SF32LB58-MOD é um módulo Bluetooth de baixo consumo da SiFli, baseado no MCU SF32LB586VDD36. A configuração padrão inclui 16 + 16 MB de HPI-PSRAM e 1 MB de QSPI-NOR. O módulo de 24 × 24 × 3,1 mm reúne a plataforma de três núcleos, o circuito de RF, o cristal e várias opções de memória. Suas interfaces expostas permitem integrar funções de display, áudio, armazenamento e controle.

O módulo integra o componente BGA256, o circuito de RF, o cristal e a memória de alta velocidade, reduzindo o roteamento correspondente na placa portadora do produto. O produto final ainda precisa passar por validação de RF e atender aos requisitos regulatórios aplicáveis. Antes de concluir o layout da placa portadora, confirme a opção de antena e a configuração de memória do SKU escolhido.

Conforme o SKU escolhido, a plataforma pode combinar HPI-PSRAM com QSPI-NOR, QSPI-NAND ou eMMC. As interfaces do módulo atendem a produtos que precisam de recursos de display, áudio, armazenamento e conectividade, mantendo uma plataforma da classe MCU.

O documento DS5802 V0.1 descreve uma antena PCB integrada ao módulo e opções para conectar uma antena externa. A antena externa pode ser conectada por pads castellados ou pelo conector externo de primeira geração, compatível com conectores Hirose U.FL, I-PEX MHFI e Amphenol AMC. O documento não informa qual configuração corresponde a cada SKU; confirme com a SiFli a implementação da antena do módulo escolhido antes de finalizar o layout da placa portadora.

!!! info
    Para conhecer a família de chips, sua arquitetura e seus periféricos, consulte [SF32LB58x](../chips/SF32LB58x.md). Esta página se concentra na integração do módulo, nas variantes de memória, nas linhas de alimentação e nos critérios de escolha do produto.

## Aplicações { #applications }

Segundo a SiFli, as áreas de aplicação do SF32LB58-MOD incluem:

- Dispositivos vestíveis: relógios inteligentes de gama alta, pulseiras inteligentes, dispositivos médicos vestíveis e equipamentos de fitness
- Indústria: soluções de display econômicas, HMI gráfica, centrais de controle de sensores industriais, monitoramento de equipamentos e instrumentos
- Automotivo: unidades centrais de controle de veículos elétricos, chaves automotivas e dispositivos vestíveis que funcionam como controles remotos de veículos
- Automação residencial: eletrodomésticos inteligentes de pequeno e médio porte e fechaduras inteligentes
- Uso geral: hubs de sensores de baixo consumo e Bluetooth Mesh
- Exemplos de AIoT: reconhecimento de comandos de voz, casa inteligente, chaves inteligentes e painéis de controle inteligentes

Considere o SF32LB58-MOD quando o projeto precisar de um ou mais destes recursos:

- Componente BGA256, caminho de RF, cristal e memória de alta velocidade integrados ao módulo
- Antena PCB integrada ou antena externa conectada por pads castellados ou por um conector compatível com Hirose U.FL, I-PEX MHFI e Amphenol AMC; confirme a configuração do SKU
- Opções de memória QSPI-NOR, QSPI-NAND ou eMMC conforme o SKU
- Interfaces externas para display, áudio, armazenamento e controle

## Recursos de desenvolvimento { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Chip Introduction]: ../chips/SF32LB58x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Datasheet do módulo][Module Datasheet]__
- :fontawesome-solid-microchip: __[Introdução ao chip][Chip Introduction]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware][Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Recursos e especificações { #features-and-specifications }

### Processamento e memória { #compute-and-memory }

- 2 núcleos de aplicação Arm Cortex-M33 STAR-MC1, até 240 MHz
- 1 núcleo de baixo consumo Arm Cortex-M33 STAR-MC1 programável pelo usuário, até 96 MHz
- Até 370 DMIPS / 984 EEMBC CoreMark por núcleo de aplicação
- Até 148 DMIPS / 394 EEMBC CoreMark no núcleo de baixo consumo
- 2176 KB de SRAM (HCPU) + 512 KB de SRAM (ACPU) + 1056 KB de SRAM de retenção (LCPU)
- FPU de precisão simples e MPU em todos os núcleos

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth 5.3 de modo duplo, com suporte a BLE Audio
- Sensibilidade de até -107,5 dBm para BLE Long Range a 125 kbps
- Potência máxima de transmissão: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- Corrente de recepção de pico em BR/EDR2/EDR3: 2,2 mA a 3,3 V

### Gráficos, display e multimídia { #graphics-display-and-multimedia }

- Motor gráfico ePicasso 2.0 2D/2.5D
- Motor gráfico vetorial Vivante GCNanoUltraV
- Codec JPEG por hardware
- Dois controladores LCD com suporte a 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI e JDI
- TurboPixel: o extDMA comprime o framebuffer final com perda e taxa fixa, e o controlador de display descomprime os dados. Isso reduz a largura de banda da PSRAM e a capacidade de framebuffer exigidas por determinada carga de trabalho.
- Os dois controladores LCD oferecem suporte ao modo de display sempre ativo (always-on display).

### Áudio { #audio }

- 2 DACs de áudio de 24 bits
- 2 ADCs de áudio Sigma-Delta de 24 bits
- 2 interfaces PDM (PDM1/PDM2)
- 3 interfaces I2S, todas em modo mestre; I2S1 aceita apenas entrada, enquanto I2S2 e I2S3 aceitam entrada e saída
- Suporte a entrada/saída de áudio analógico pela interface do módulo

O [guia de hardware SF32LB58x](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html) da SiFli lista duas entradas de microfone PDM (PDM1 e PDM2). Uma única interface PDM pode transportar dois canais de microfone: o [exemplo PDM do SDK da SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) mostra a captura de dois microfones pelos canais esquerdo e direito de uma interface PDM, além de uma configuração com quatro microfones usando PDM1 e PDM2. No entanto, SF32LB58-MOD não consta na lista de plataformas compatíveis com esse exemplo. Para este módulo, confirme no SDK de destino a configuração de microfones e canais compatível e verifique a multiplexação dos pinos e o roteamento da placa portadora. Não conclua que o módulo aceita quatro microfones apenas com base no número de interfaces PDM.

### Interfaces de armazenamento e variantes do módulo { #storage-interfaces-and-module-variants }

<div align="center"><em>Variantes do módulo SF32LB58-MOD</em></div>

<div align="center" markdown>

| Código do módulo | Armazenamento selecionável | PSRAM | Flash padrão | Temperatura | Dimensões |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |

</div>

O [guia de modelos de módulos da SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lista essas variantes, informa que a eMMC pode ser incluída como dispositivo interno e que outras configurações podem ser personalizadas. Escolha o SKU de acordo com o tipo de mídia e a capacidade necessários e confirme com a SiFli a disponibilidade atual e a configuração de memória. Verifique também se o SDK e o firmware de destino oferecem suporte ao dispositivo e ao caminho de inicialização e armazenamento escolhidos.

### Alimentação, encapsulamento e I/O { #power-package-and-io }

- Encapsulamento do módulo: 24 × 24 × 3,1 mm
- Temperatura de operação: −40 °C a +85 °C
- VDD_3V3: 2,97–3,6 V
- VDD_1V8: 1,7–1,95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1,7–3,6 V
- VDD_3V3 alimenta AVDD33_ANA, AVDD33_AUD e AVDD_USB; se o módulo incluir eMMC, também alimenta sua entrada VDD. A SiFli recomenda um LDO para esta linha de alimentação.
- VDD_1V8 alimenta PVDD1, PVDD2, AVDD_BRF e AVDD18_DSI, além da memória integrada ao encapsulamento.
- VDDIOA alimenta as I/Os PA, exceto PA00–PA11, a Flash externa e o VIO do eMMC, quando instalado. VDDIOA2 alimenta PA00–PA11; VDDIOB alimenta as I/Os PB.
- Interface de módulo com 138 pinos; os pinos multiplexados disponibilizam funções como GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS e áudio

## Produtos relacionados { #related-products }

### Chip { #chip }

Baseado em [SF32LB58x](../chips/SF32LB58x.md). Consulte a página do chip para conhecer a arquitetura de gráficos, memória e display que fundamenta o módulo.

### Kits de desenvolvimento { #development-kits }

A placa [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) é um ponto de partida prático para validar o firmware, fazer o bring-up do display e verificar os caminhos de áudio e armazenamento antes de projetar uma placa portadora personalizada para o módulo.

### Produtos de referência { #reference-products }

As áreas de aplicação documentadas pela SiFli incluem dispositivos vestíveis, equipamentos industriais de display e HMI, produtos de controle automotivo, dispositivos para casas inteligentes, hubs de sensores de baixo consumo e produtos Bluetooth Mesh.
