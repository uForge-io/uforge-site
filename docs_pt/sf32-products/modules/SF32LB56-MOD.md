---
icon: lucide/card-sim
description: "SF32LB56-MOD: família de módulos MCU Bluetooth 5.3 de baixo consumo e uso geral baseada no SF32LB56xV, com 4 MB + 8 MB de OPI-PSRAM no mesmo encapsulamento e Flash conforme o SKU."
tags:
  - Hardware
  - Módulo
---

# SF32LB56-MOD { #sf32lb56-mod }

## Visão geral { #overview }

A família SF32LB56-MOD reúne módulos MCU Bluetooth de baixo consumo e uso geral, baseados na plataforma SF32LB56xV da SiFli. A configuração padrão usa o SF32LB566VCB36, com 4 MB + 8 MB de OPI-PSRAM no mesmo encapsulamento e 1 MB de QSPI-NOR. Em formato compacto, o módulo combina processamento MCU de dois núcleos, Bluetooth 5.3 com suporte a BLE Audio, aceleração gráfica, interfaces de áudio, variantes de Flash por SKU e um caminho de RF integrado.

O módulo integra o caminho de RF, o cristal e a memória de alta velocidade; oferece uma antena PCB integrada ou uma antena externa conectada por um conector compatível com IPEX. O produto final ainda precisa passar por validação de RF, e o layout da placa portadora deve considerar a opção escolhida. As interfaces e variantes de memória atendem a produtos com requisitos de display, áudio, sensores e processamento local.

A família oferece várias configurações de memória, todas com dimensões de 18,0 × 32,9 × 3,1 mm e temperatura de operação de -40 °C a +85 °C. O [guia de projeto de hardware do SF32LB56-MOD](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md), baseado na DS5602 V0.3, traz mais detalhes sobre a antena e o layout. O guia de modelos de módulos da SiFli lista as configurações de memória, mas não informa qual opção de antena corresponde a cada SKU. Antes de concluir o layout da placa portadora, confirme com a SiFli a configuração de antena do módulo escolhido.

!!! info
    Os recursos de processamento, gráficos e áudio a seguir descrevem a plataforma SF32LB56xV integrada ao módulo; a disponibilidade externa depende do pinout do módulo e da multiplexação dos pinos. Para conhecer a arquitetura e o conjunto completo de periféricos do chip, consulte [SF32LB56x](../chips/SF32LB56x.md). Esta página se concentra na integração do módulo, na memória por SKU, nas linhas de alimentação e na adequação do módulo ao produto.

## Aplicações { #applications }

Segundo a SiFli, as áreas de aplicação do SF32LB56-MOD incluem:

- Dispositivos vestíveis: relógios inteligentes de gama alta, pulseiras inteligentes, dispositivos médicos vestíveis e equipamentos de fitness
- Indústria: soluções de display econômicas, interfaces HMI gráficas, centrais de controle para sensores industriais, monitoramento de equipamentos e instrumentos
- Automotivo: unidades centrais de controle de veículos elétricos, chaves automotivas e dispositivos vestíveis para controlar veículos remotamente
- Automação residencial: eletrodomésticos inteligentes de pequeno e médio porte e fechaduras inteligentes
- Uso geral: hubs de sensores de baixo consumo e Bluetooth Mesh
- Exemplos de AIoT: reconhecimento de comandos de voz, casa inteligente, chaves inteligentes e painéis de controle inteligentes

Considere o SF32LB56-MOD quando o projeto precisar de um ou mais destes recursos:

- Caminho de RF, opção de antena, cristal e memória de alta velocidade integrados ao módulo
- Diferentes configurações de memória conforme os SKUs listados
- Interfaces para display, áudio, sensores e processamento local
- Dimensões compactas para produtos com espaço limitado

## Recursos de desenvolvimento { #development-resources }

[Ficha técnica do módulo]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Introdução ao chip]: ../chips/SF32LB56x.md
[Guia de projeto de hardware]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[Guia de projeto de hardware SF32LB56x]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Comprar amostras]: https://sifli.taobao.com/
[Comprar kits de desenvolvimento]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha técnica do módulo]__
- :fontawesome-solid-microchip: __[Introdução ao chip]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware SF32LB56x]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento]__

</div>

---

## Recursos e especificações { #features-and-specifications }

### Processamento e memória { #compute-and-memory }

- HCPU: Arm Cortex-M33 STAR-MC1, até 240 MHz, até 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1, até 96 MHz, até 148 DMIPS / 394 EEMBC CoreMark
- Sistema de memória do HCPU: cache de instruções de 32 KB, cache de dados de 16 KB e 800 KB de SRAM, incluindo 128 KB de SRAM de retenção
- Sistema de memória do LCPU: cache de instruções de 16 KB, cache de dados de 8 KB e 160 KB de SRAM de retenção
- FPU de precisão simples e MPU em ambos os núcleos
- Acelerador matricial para redes neurais e aceleradores de processamento de sinais para cargas de trabalho locais mais exigentes

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth 5.3 de modo duplo, com suporte a BLE Audio
- Sensibilidade: -100 dBm em BLE a 1 Mbps, -96,3 dBm em BR, -95,5 dBm em EDR2 e -88,5 dBm em EDR3
- Potência máxima de transmissão: 19 dBm em BR/BLE e 13 dBm em EDR2/EDR3
- Corrente de recepção de pico em BR: 2,2 mA a 3,3 V

### Gráficos e display { #graphics-and-display }

- Motor gráfico ePicasso 2.0 2D/2.5D
- Rotação, escala, espelhamento e mesclagem alfa por hardware
- Cargas de trabalho gráficas de até 1024 × 1024
- Descompressão gráfica sem perdas com eZip 2.0 e suporte a animações eZip-A
- Suporte a LCD por 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB e JDI
- TurboPixel: o extDMA comprime o framebuffer final com perda e taxa fixa, e o controlador de display descomprime os dados. Isso reduz a largura de banda da PSRAM e a capacidade de framebuffer exigidas por determinada carga de trabalho.

### Áudio { #audio }

- 1 DAC de áudio de 24 bits
- 1 ADC de áudio Sigma-Delta de 24 bits
- 2 interfaces PDM (PDM1/PDM2), cada uma com canais esquerdo e direito
- 1 interface I2S
- Conversão da taxa de amostragem de áudio e aceleração do equalizador (EQ)

A cada interface PDM podem ser conectados até dois microfones digitais; juntas, as duas interfaces podem atender até quatro microfones no total. O número de interfaces PDM não corresponde ao número de microfones. A conectividade efetiva depende da multiplexação dos pinos e do roteamento da placa portadora.

### Memória e variantes do módulo { #memory-and-module-variants }

<div align="center"><em>Configurações de memória do SF32LB56-MOD</em></div>

<div align="center" markdown>

| Código do módulo | Flash por SKU | PSRAM | Flash padrão | Temperatura | Dimensões |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

O [guia de modelos de módulos da SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lista essas três configurações e informa que outras podem ser personalizadas. Confirme com a SiFli a disponibilidade atual dos SKUs e a configuração de memória.

A SiFli identifica como configuração padrão a combinação do SF32LB566VCB36 com 4 MB + 8 MB de OPI-PSRAM no encapsulamento e 1 MB de QSPI-NOR; essa configuração de memória corresponde ao N16R12N1. O guia não atribui um código de chip específico aos modelos A128R12N1 e D128R12N1. Confirme com a SiFli o código exato do chip para qualquer um desses SKUs.

### Alimentação e I/O { #power-and-io }

- Faixa de operação recomendada para VDD_3V3: 2,97–3,6 V
- Faixa de operação recomendada para VDD_1V8: 1,7–1,95 V
- Faixa de operação recomendada para VDDIO: 1,7–3,6 V
- VDD_3V3, VDD_1V8 e VDDIO devem ser ligados simultaneamente
- O nível da interface PA00–PA11 é fixo em 3,3 V e não acompanha VDDIO
- Interface do módulo com 89 pinos
- Temperatura de operação: −40 °C a +85 °C

## Produtos relacionados { #related-products }

### Chip { #chip }

Baseado em [SF32LB56x](../chips/SF32LB56x.md), mais especificamente na família de plataformas SF32LB56xV. Consulte a página do chip para conhecer a arquitetura, o display, o áudio e o contexto de encapsulamento mais amplos do módulo.

### Kits de desenvolvimento { #development-kits }

A [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) permite validar display, áudio, armazenamento e drivers de periféricos. A documentação da placa lista as configurações N16R12N1 e A128R12N1. Antes de usar a memória instalada como referência de projeto, confira a identificação do módulo e a revisão da placa.

### Produtos de referência { #reference-products }

As áreas de aplicação documentadas pela SiFli incluem dispositivos vestíveis, equipamentos industriais de display e HMI, produtos de controle automotivo, dispositivos para casas inteligentes, hubs de sensores de baixo consumo e produtos Bluetooth Mesh.
