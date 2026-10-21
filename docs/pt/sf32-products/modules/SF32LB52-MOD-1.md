---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: família de módulos MCU Bluetooth 5.3 de baixo consumo para SF32LB52x, com circuito de RF e cristal de 48 MHz integrados e opções de antena conforme o SKU."
tags:
  - Hardware
  - Módulo
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## Visão geral { #overview }

SF32LB52-MOD-1 é uma família de módulos MCU com Bluetooth e baixo consumo, baseada na plataforma SF32LB52x. A variante padrão N16R8 usa o SF32LB525UC6. O módulo de 27,9 × 18,0 × 3,1 mm reúne a plataforma Arm Cortex-M33 STAR-MC1 de dois núcleos, o circuito de RF, um cristal de 48 MHz e a conexão da antena. O tipo de antena depende do código do produto: pode ser uma antena PCB integrada ao módulo ou uma antena externa conectada por um conector IPEX.

O DS5203 V0.3 documenta uma antena PCB integrada ao módulo e informa que outro modelo aceita uma antena externa conectada por IPEX, mas não associa as opções de antena aos SKUs de memória publicados. Antes de concluir o layout da placa portadora, confirme com a SiFli a configuração exata da antena. O produto final ainda precisa passar por validação de RF e pela certificação aplicável no nível do produto. As interfaces expostas permitem implementar produtos conectados compactos com os recursos Bluetooth, gráficos e de áudio da plataforma.

Dependendo do SKU selecionado, o chip montado no módulo pode incluir OPI-PSRAM no encapsulamento. A interface do módulo dá acesso às principais funções do chip, incluindo GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS e áudio analógico.

!!! info
    Para conhecer a família de chips, sua arquitetura e seus periféricos, consulte [SF32LB52x](../chips/SF32LB52x.md). Esta página se concentra na integração no nível do módulo, na alimentação, no encapsulamento e na escolha da variante.

## Aplicações { #applications }

**SF32LB52-MOD-1 é indicado para** produtos que precisam de Bluetooth, gráficos e áudio com menor risco de RF e de layout, incluindo:

- Relógios inteligentes, pulseiras de atividade e dispositivos médicos vestíveis
- Hubs de sensores Bluetooth e acessórios conectados
- Fechaduras inteligentes, dispositivos para casas inteligentes e eletrodomésticos compactos
- Pequenas HMIs gráficas
- Chaveiros automotivos e controles remotos vestíveis
- Dispositivos conectados com display e custo controlado

Considere o SF32LB52-MOD-1 quando o produto precisar de um ou mais destes recursos:

- Integração de RF no nível do módulo, com opções de antena PCB e de antena externa
- Interfaces do módulo para acessar os recursos Bluetooth, gráficos e de áudio da plataforma SF32LB52x
- Reutilização do software e dos recursos periféricos da plataforma SF32LB52x
- Formato compacto para wearables e produtos HMI com espaço limitado

## Recursos de desenvolvimento { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB52x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Original Design Guide (wiki.sifli.com, EPD variant)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Datasheet do módulo][Module Datasheet]__
- :fontawesome-solid-microchip: __[Introdução ao chip][Chip Introduction]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware][Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[Guia de projeto original (wiki.sifli.com, variante EPD)][Original Design Guide (wiki.sifli.com, EPD variant)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Recursos e especificações { #features-and-specifications }

### Processamento e memória { #compute-and-memory }

- Núcleo de aplicação Arm Cortex-M33 STAR-MC1 (HCPU), até 240 MHz, até 370 DMIPS / 984 EEMBC CoreMark
- Cache de instruções de 32 KB e cache de dados de 16 KB
- 512 KB de SRAM de retenção
- Núcleo Arm Cortex-M33 STAR-MC1 dedicado a baixo consumo (LCPU), até 24 MHz, com 64 KB de SRAM de retenção
- FPU de precisão simples e MPU nos dois núcleos
- OPI-PSRAM opcional no encapsulamento, conforme o SKU do módulo

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth 5.3 de modo duplo, com suporte a BLE Audio
- Sensibilidade: -100 dBm (BLE/1 Mbps), -96,3 dBm (BR), -95,5 dBm (EDR2)
- Potência máxima de transmissão: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- Corrente de recepção de pico em BR: 2,4 mA a 3,8 V

### Gráficos e display { #graphics-and-display }

- Motor gráfico ePicasso 2.0 2D/2.5D
- Acelerador de descompressão gráfica sem perdas eZip 2.0
- Controlador LCD com suporte a interfaces 8080, SPI, Dual-SPI e Quad-SPI
- Adequado a displays compactos de relógios e a pequenos produtos HMI

### Áudio { #audio }

- 1 DAC de áudio de 24 bits
- 1 ADC de áudio Sigma-Delta de 24 bits
- 1 interface I2S
- 1 interface PDM
- Suporte a entrada/saída de áudio analógico pela interface do módulo

Cada interface PDM pode conectar até dois microfones digitais; portanto, o número de interfaces PDM não corresponde ao número de microfones. A conectividade efetiva depende da multiplexação dos pinos e do roteamento da placa portadora. Neste módulo, PA22/PA23 não ficam acessíveis externamente quando o cristal opcional de 32,768 kHz está montado; o guia de hardware documenta outra atribuição de pinos para PDM.

### Interfaces de armazenamento { #storage-interfaces }

- OPI-PSRAM opcional no encapsulamento, conforme o SKU do módulo
- 1 MPI (QSPI) para Flash SPI NOR ou SPI NAND externa
- 1 interface SD/SDIO compatível com SD 3.0, SDIO 3.0 e eMMC

### Segurança { #security }

- Aceleradores de hardware AES, HASH e CRC
- Gerador de números verdadeiramente aleatórios (TRNG)
- PSA Certified Level 1

### Alimentação, encapsulamento e I/O { #power-package-and-io }

- Encapsulamento do módulo: 27,9 × 18,0 × 3,1 mm
- Temperatura de operação: −40 °C a +85 °C
- VSYS: 3,2–4,7 V com conexão direta a uma bateria de íons de lítio ou 3,7–4,7 V com alimentação regulada; recomenda-se 3,8 V.
- Tensão de I/O: 3,3 V
- VBATS: entrada de detecção da bateria, de 0 a 4,7 V, que também pode ser usada para medição pelo ADC. Conecte diretamente a tensão a ser medida; não use um divisor resistivo externo.
- VDD33_VOUT2: saída LDO de 3,3 V integrada ao módulo para periféricos externos. Fica desativada por padrão e deve ser habilitada por software; a corrente máxima de saída é de 150 mA, e a capacitância total na linha não deve exceder 7,4 µF.
- Interface de módulo com 68 pinos; os pinos de sinal oferecem funções multiplexadas, incluindo GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS e áudio digital e analógico

## Variantes do módulo { #module-variants }

<div align="center"><em>Variantes do módulo SF32LB52-MOD-1</em></div>

<div align="center" markdown>

| Código do módulo | Chip | Flash | PSRAM | Temperatura | Dimensões |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C a +85 °C | 27,9 × 18,0 × 3,1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C a +85 °C | 27,9 × 18,0 × 3,1 mm |

</div>

O [guia de modelos de módulos da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) e o guia de aplicação EPD também listam A128R16, mas a ficha DS5203 V0.3 vinculada aqui apresenta apenas N16R8. Antes de escolher A128R16, confirme com a SiFli a disponibilidade atual e a configuração de memória.

As fontes oficiais usam denominações diferentes para a memória Flash do A128R16: o [guia de modelos de módulos da OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) identifica 128 MB de SPI-NAND, enquanto o [guia de modelos de placas da SiFli](https://wiki.sifli.com/board/devkit_guide.html) indica 128 MB de QSPI-NAND para o SKU DevKit correspondente. As fontes não esclarecem se a diferença se refere ao componente instalado ou à denominação da interface. Antes de usar a configuração da placa como referência do módulo, confirme o componente Flash e o modo de barramento no esquemático e na BOM da revisão exata da placa.

## Produtos relacionados { #related-products }

### Chip { #chip }

A página do [SF32LB52x](../chips/SF32LB52x.md) descreve a arquitetura e os periféricos da família; consulte a tabela de variantes acima para ver a correspondência entre cada SKU do módulo, o chip e a memória.

### Kits de desenvolvimento { #development-kits }

As placas [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) e [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) são pontos de partida práticos para validar o firmware antes de avançar para o projeto de uma placa portadora personalizada para o módulo.

### Produtos de referência { #reference-products }

Entre os produtos finais típicos estão relógios inteligentes de entrada ou intermediários, pulseiras de atividade, hubs de sensores Bluetooth, fechaduras inteligentes e dispositivos HMI gráficos compactos.
