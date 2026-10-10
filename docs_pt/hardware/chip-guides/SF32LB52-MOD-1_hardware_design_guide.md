---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do módulo Bluetooth baseado no MCU SF32LB52-MOD-1: alimentação, interfaces e integração à PCB."
tags:
    - Hardware
    - Módulo
---

# Guia de projeto de hardware do SF32LB52-MOD-1 { #sf32lb52-mod-1-hardware-design-guide }

## 1. Visão geral { #1-overview }

O **SF32LB52-MOD-1** é um módulo Bluetooth de baixo consumo e uso geral, certificado, baseado no chip SF32LB525UC6 da SiFli (Arm Cortex-M33 STAR-MC1 de núcleo duplo, até 240 MHz). Integra um cristal de 48 MHz, um cristal opcional de 32,768 kHz e, opcionalmente, uma pastilha de OPI-PSRAM de 64 Mb no encapsulamento. O conjunto forma um módulo de montagem em superfície com 68 pinos e dimensões de 27,9 × 18,0 × 3,1 mm.

Este guia trata da integração de hardware no nível do módulo: definição de pinos, interfaces de periféricos, características elétricas, requisitos de alimentação, esquemas de referência, lista de verificação do esquema elétrico, dimensões mecânicas e footprint da PCB, além dos requisitos de manuseio do produto. O conteúdo baseia-se no datasheet da SiFli **DS5203-SF32LB52-MOD-1 V0.3**.

Para conhecer em mais detalhe a arquitetura do chip (núcleos, gráficos, subsistema de memória e periféricos), consulte [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) e o [guia de projeto de hardware do SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Fonte e tratamento das figuras"
    Para os dados técnicos específicos do módulo, este guia segue o **DS5203-SF32LB52-MOD-1 V0.3**. Alguns desenhos de pinagem, esquemas e dimensões mecânicas do datasheet são imagens rasterizadas; eles são referenciados aqui, não redesenhados. A numeração das figuras e tabelas segue a deste guia, enquanto as legendas dos diagramas não reproduzidos indicam o número correspondente no datasheet oficial.

## 2. Resumo de projeto { #2-quick-design-summary }

### 2.1 Variante do módulo { #21-module-variant }

<div align="center"><em>Tabela 2.1-1: variante do módulo</em></div>

<div align="center" markdown>

| Código do módulo | Flash | PSRAM | Temperatura | Dimensões (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16MB QSPI-NOR | 8MB OPI-PSRAM | -40~85°C | 27.9 × 18.0 × 3.1 |

</div>

### 2.2 Especificações principais { #22-key-specifications }

<div align="center"><em>Tabela 2.2-1: especificações principais</em></div>

<div align="center" markdown>

| Item | Especificação |
| :--- | :--- |
| Núcleo de aplicação (HCPU) | Arm Cortex-M33 STAR-MC1, até 240 MHz, 512 KB SRAM |
| Núcleo de baixo consumo (LCPU) | Arm Cortex-M33 STAR-MC1, até 24 MHz, 64 KB SRAM |
| Conectividade sem fio | Bluetooth 5.3 de modo duplo com BLE Audio |
| Gráficos | Mecanismo 2D/2.5D ePicasso 2.0, até 512×512, descompressão sem perdas eZip 2.0 |
| Áudio | 1 DAC de áudio de 24 bits e 1 ADC Sigma-Delta de áudio de 24 bits |
| Armazenamento | OPI-PSRAM opcional no encapsulamento (144 MHz); 1 MPI externo (QSPI); 1 SD/SDIO/eMMC |
| Encapsulamento | 68 pinos, 27,9 × 18,0 × 3,1 mm |
| Alimentação | VSYS de 3,2–4,7 V (Li-ion) ou 3,7–4,7 V (DCDC/LDO; 3,8 V recomendado) |
| Antena | Antena integrada à PCB ou externa por conector IPEX (conforme o código do produto) |
| Temperatura de operação | -40 a 85 °C |

</div>

## 3. Diagrama de blocos funcionais { #3-functional-block-diagram }

O módulo integra o chip SF32LB525UC6, um cristal de 48 MHz, um cristal opcional de 32,768 kHz e, nesta SKU, uma pastilha de OPI-PSRAM de 64 Mb no encapsulamento, além da rede de casamento de RF e da linha de alimentação de RF da antena.

!!! info "Figura 3-1: diagrama de blocos funcionais"
    Consulte a Figura 2-1 do datasheet oficial. O diagrama não é reproduzido neste guia.

## 4. Definição dos pinos { #4-pin-definition }

### 4.1 Diagrama de pinagem { #41-pinout-diagram }

O módulo disponibiliza 68 pinos ao longo do perímetro. O pino 1 está marcado no canto próximo à zona da antena; a numeração dos pinos segue no sentido anti-horário ao redor do encapsulamento.

!!! info "Figura 4.1-1: diagrama de pinagem, vista superior"
    Consulte a Figura 3-1 do datasheet oficial. O diagrama não é reproduzido neste guia.

### 4.2 Tabela de definição dos pinos { #42-pin-definition-table }

O módulo tem 68 pinos ao todo, descritos na tabela a seguir.

<div align="center"><em>Tabela 4.2-1: definição dos pinos</em></div>

<div align="center" markdown>

| Nome | Nº | Tipo | MUX padrão | I/O padrão | Função |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Ground | P | Terra |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *se o módulo tiver um cristal interno de 32 kHz, PA23 não ficará disponível externamente* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *se o módulo tiver um cristal interno de 32 kHz, PA22 não ficará disponível externamente* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | Saída de alimentação de 3,3 V |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | Ground | P | Terra |
| VSYS | 27 | P | VSYS | P | Entrada principal de alimentação. Faixa com bateria Li-ion: 3,2–4,7 V; com DCDC/LDO (sem Li-ion): 3,7–4,7 V, com 3,8 V recomendado |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Saída diferencial positiva do DAC de áudio |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Saída diferencial negativa do DAC de áudio |
| GND | 35 | P | Ground | P | Terra |
| MIC_BIAS | 36 | P | MIC_BIAS | P | Tensão de polarização do microfone |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | Entrada de áudio analógica |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | Ground | P | Terra (13 pinos) |
| VBATS | 61 | P | VBAT | P | Entrada de detecção da tensão da bateria |
| NC | 62 | — | NC | — | Não conectado |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Legenda: P = alimentação; I = entrada; O = saída; T = pode ser configurado em alta impedância; AO = saída de áudio; AI = entrada de áudio.*

!!! note
    Os pinos 29 (DBG_UART_TXD) e 30 (DBG_UART_RXD) formam a porta padrão para logs, depuração do programa e gravação do programa.

### 4.3 Descrição física dos pinos { #43-physical-pin-description }

Na figura de descrição física dos pinos do datasheet, os pinos são agrupados por função — SDIO, SPI, I2C, UART, GPTIM, interface LCD, GPADC, MPI, áudio analógico, oscilador externo de 32 kHz, wake-up externo e SWD/UART de depuração — sobre o contorno do die SF32LB525UC6. Consulte-a junto com a tabela de definição dos pinos ao organizar os grupos de sinais na PCB hospedeira.

!!! info "Figura 4.3-1: descrição física dos pinos"
    Consulte a Figura 3-2 do datasheet oficial. O diagrama não é reproduzido neste guia.

## 5. Periféricos { #5-peripherals }

### 5.1 Interfaces de comunicação { #51-communication-interfaces }

Qualquer pino marcado como `PAxx_I2C_UART` na tabela acima pode ser configurado como I2C ou UART. O datasheet informa um máximo configurável de 4 interfaces I2C e 3 UART.

!!! important "Divergência na contagem de periféricos do datasheet"
    Mais adiante, o mesmo datasheet enumera I2C1–I2C7 e UART1–UART6, em conflito com os máximos informados. Confirme com a SiFli quantas interfaces estão realmente disponíveis na configuração específica do módulo/SoC; não conclua que todos os controladores listados podem ser usados simultaneamente.

**UART** — Full-duplex, taxa de transmissão de até 6 Mbps, formato de dados configurável, controle de fluxo por hardware (CTS/RTS) e TX/RX multipacote por DMA. UART1–3 ficam em HPSYS; UART4–6, em LPSYS.

**I2C** — Opera como Master ou Slave, com FIFO de 8 bytes e suporte a DMA. Modos standard (100 kbps), fast (400 kbps), fast-mode-plus (1 Mbps) e high-speed (3,4 Mbps); endereçamento de 7 ou 10 bits no modo Master; filtro digital de glitches configurável. I2C1–4 ficam em HPSYS; I2C5–7, em LPSYS.

**SPI** — Suporta os formatos SSP/SPI (full-duplex, Master ou Slave) e Microwire (half-duplex, somente Master). Largura de dados de 4–32 bits, polaridade/fase do clock configurável (SPO/SPH), polaridade de chip-select configurável, FIFO de 16 entradas × 32 bits, suporte a DMA e clock de até 48 MHz.

**USB 2.0 FS** — Uma porta full-speed Host/Device, com endpoints configuráveis, suspend/resume, dimensionamento dinâmico de FIFO, suporte a Session Request e ao Host Negotiation Protocol, além de PHY USB 2.0 FS integrado.

**MPI (Memory Peripheral Interface)** — Suporta Flash SPI NOR (1/2/4 linhas) e SPI NAND (1/2/4 linhas), com acesso em modo de registradores e em modo mapeado em memória, alternados automaticamente pelo hardware. A interface MPI2 do módulo pode conectar Flash SPI NOR/NAND externa. Se houver Flash já montada no módulo, os seis sinais externos da MPI2 (PA12, PA13, PA14, PA15, PA16 e PA17) não ficam disponíveis.

**SD/SDIO/eMMC** — Compatível com SD 3.0, SDIO 3.0 e eMMC 4.5.1; suporta cartões SDSC/SDHC/SDXC/SDHS, SDR12/25/50, modos SDR de uma e quatro linhas, FIFO de 2 KB, transferência de dados por DMA e clock de até 48 MHz (sem DDR). A interface SDIO compartilha os pinos de I/O com a MPI2; as duas interfaces não podem ser usadas simultaneamente.

**I2S** — Master/Slave, full-duplex, formatos left-justified/right-justified/standard, mono ou estéreo de 8 ou 16 bits e largura PCM de até 24 bits.

**Interface LCD** — Modo SPI serial DBI (3/4 linhas, duas/quatro linhas de dados) e modo paralelo 8080 (barramento de 8/16/24 bits). Conforme o modo, suporta os formatos de cor RGB332/RGB444/RGB565/RGB666/RGB888.

### 5.2 Processamento de sinais analógicos { #52-analog-signal-processing }

**GPADC de 12 bits** — ADC SAR, taxa de amostragem máxima de 4 MS/s, faixa de entrada de 0–3,3 V single-ended ou ±2,1 V diferencial, 7 canais single-ended e 1 canal de tensão da bateria (ou 3 pares diferenciais), modos de medição única ou contínua, 4 intervalos de tempo configuráveis por medição, disparo por software ou hardware e suporte a DMA.

**Sensor de temperatura** — Resolução de 0,2 °C, faixa de -40 °C a 125 °C, precisão de ±3 °C e leitura por polling ou interrupção.

**DAC de áudio** — Um canal de saída DAC de 24 bits, taxas de amostragem de 8–48 kHz e saída diferencial.

**PLL de áudio** — Geração de clock Fractional-N com resolução de 48 MHz/2^18; suporta as seguintes taxas de amostragem derivadas: 48 MHz, 32,768 kHz e 44,1 kHz.

**ADC de áudio** — Um canal de entrada ADC Sigma-Delta de 24 bits, com taxas de amostragem de 8–48 kHz.

## 6. Características elétricas { #6-electrical-characteristics }

### 6.1 Limites máximos absolutos { #61-absolute-maximum-ratings }

Ultrapassar os valores da tabela abaixo pode danificar permanentemente o módulo. Esses valores são limites de estresse; não implicam operação funcional fora das condições recomendadas na seção 6.2. A exposição prolongada aos limites máximos absolutos pode reduzir a confiabilidade do módulo.

<div align="center"><em>Tabela 6.1-1: limites máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | Tensão do pino de alimentação | -0.3 | 4.7 | V |
| Tstore | Temperatura de armazenamento | -40 | 125 | °C |

</div>

### 6.2 Condições de operação recomendadas { #62-recommended-operating-conditions }

<div align="center"><em>Tabela 6.2-1: condições de operação recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Alimentação por bateria Li-ion | 3.2 | - | 4.7 | V |
| VSYS | Alimentação sem Li-ion via DCDC/LDO | 3.7 | 3.8 | 4.7 | V |
| TA | Temperatura de operação | -40 | - | 85 | °C |

</div>

### 6.3 Características elétricas CC (3,3 V, 25 °C) { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>Tabela 6.3-1: características elétricas CC (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitância do pino | 2.5 | 3 | 3.5 | pF |
| VIH | Tensão de entrada em nível alto | 0.7×VDD | - | VDD | V |
| VIL | Tensão de entrada em nível baixo | VSS | - | 0.3×VDD | V |
| IIH | Corrente de entrada em nível alto | - | 10 | 40 | nA |
| IIL | Corrente de entrada em nível baixo | - | 10 | 40 | nA |
| VOH | Tensão de saída em nível alto (carga de alta impedância) | 0.8×VDD | - | VDD | V |
| VOL | Tensão de saída em nível baixo (carga de alta impedância) | VSS | - | 0.2×VDD | V |
| IOH | Corrente de acionamento de saída em nível alto | 24 | 30 | 38 | mA |
| IOL | Corrente de acionamento de saída em nível baixo | 24 | 30 | 38 | mA |
| RPU | Pull-up interno (Vpad=0.8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Pull-down interno (Vpad=0.2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tensão de liberação do reset | 0.7×VDD | - | VDD | V |
| VIL_nRST | Tensão de acionamento do reset | VSS | - | 0.3×VDD | V |

</div>

VDD é o trilho de alimentação de I/O; VOH/VOL são medidos com carga de alta impedância.

### 6.4 Consumo de energia { #64-power-consumption }

<div align="center"><em>Tabela 6.4-1: corrente média de Bluetooth e BLE (alimentação de 3,8 V)</em></div>

<div align="center" markdown>

| Modo | Intervalo | @0dBm | @4dBm | @10dBm | Unidade |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 129.5 | 135.6 | 160.9 | µA |
| BT Sniff (attempt=1) | 1s | 6.0 | 6.3 | 7.6 | µA |
| BLE ADV | 50ms | 171.6 | 217.6 | 298.3 | µA |
| BLE ADV | 1s | 8.9 | 9.5 | 17.0 | µA |
| BLE Connection | 50ms | 95.0 | 105.0 | 118.7 | µA |
| BLE Connection | 1s | 4.1 | 4.6 | 9.1 | µA |
| Varredura (Inquiry ou Page) | — | 33.4 | — | — | µA |
| Varredura simultânea | — | 67.3 | — | — | µA |
| Sleep | — | 20.0 | — | — | µA |

</div>

<div align="center"><em>Tabela 6.4-2: consumo de energia do processador (alimentação de 3,8 V)</em></div>

<div align="center" markdown>

| Clock | Corrente (µA) | Incremento (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 Desempenho de RF do Bluetooth de modo duplo { #65-dual-mode-bluetooth-rf-performance }

Compatível com Bluetooth 5.3 e retrocompatível com 4.2/4.1/4.0. Frequência central dos canais de operação: 2402–2480 MHz.

**Transmissor BLE (1 Mbps)**: potência máxima de 19 dBm, faixa de controle de potência de -20 a 19 dBm, Δf1avg = 250 kHz típico e Δf2max = 210 kHz típico. São valores de desvio de frequência (o datasheet identifica os campos como modulação máxima/mínima), não um índice de modulação adimensional. A tolerância inicial típica da frequência da portadora é de ±20 kHz.

**Receptor BLE (1 Mbps)**: sensibilidade de -100 dBm (dirty off) / -99,3 dBm (dirty on) com PER de 30,8%; C/I co-canal de 7 dB.

**Bluetooth clássico (Basic Data Rate)**: potência máxima de transmissão de 18 dBm; sensibilidade do receptor de -96,3 dBm (dirty off) / -94 dBm (dirty on), com BER de 0,1%.

**Bluetooth clássico (Enhanced Data Rate)**: potência máxima de transmissão de 13 dBm; sensibilidade do receptor de -95,5 dBm para π/4-DQPSK e de -88,5 dBm para 8DPSK.

As tabelas completas de valores mínimos/típicos/máximos para TX/RX BLE de 1/2 Mbps e TX/RX BR/EDR do Bluetooth clássico estão na seção 5.5 do datasheet oficial.

## 7. Alimentação do módulo { #7-module-power-supply }

O módulo tem uma única entrada principal de alimentação, **VSYS**, que pode ser conectada diretamente a uma bateria Li-ion/Li-Po (3,2–4,7 V) ou alimentada por um regulador DCDC/LDO (3,7–4,7 V; 3,8 V recomendado).

**VBATS** é o pino de leitura da tensão da bateria, amostrado internamente por um ADC na faixa de 0–4,7 V. Não use um divisor resistivo externo em VBATS; conecte diretamente ao pino o sinal cuja tensão será medida.

**VDD33_VOUT2** é a saída do LDO interno de 3,3 V do módulo e pode fornecer até 150 mA a periféricos externos; a capacitância total nesse trilho não deve exceder 7,4 µF.

## 8. Esquema de referência e atribuição de pinos { #8-reference-schematic-and-pin-assignment }

O datasheet fornece um esquema completo de referência para uma placa de desenvolvimento baseada no SF32LB52-MOD-1, incluindo alimentação, reset e circuitos JTAG/SWD, UART, SDIO, LCD e áudio.

!!! info "Figura 8-1: esquema de referência da placa de desenvolvimento"
    Consulte as Figuras 7-2–7-6 do datasheet oficial. O diagrama não é reproduzido neste guia.

O datasheet também apresenta uma tabela de atribuição de pinos recomendada para essa placa de referência.

!!! info "Figura 8-2: atribuição de pinos recomendada para a placa de referência"
    Consulte a Figura 7-7 do datasheet oficial. O diagrama não é reproduzido neste guia.

Use esses materiais como ponto de partida para o esquema do produto e adapte a seleção de pinos aos periféricos específicos da aplicação.

## 9. Lista de verificação do esquema elétrico { #9-schematic-design-checklist }

<div align="center"><em>Tabela 9-1: lista de verificação do esquema elétrico</em></div>

<div align="center" markdown>

| Nº | Item de verificação |
| :-: | :--- |
| 1 | VSYS pode ser conectado diretamente a uma bateria Li-ion; se alimentado por DCDC/LDO, recomenda-se 3,8 V. VBATS é a entrada de leitura da tensão da bateria (faixa de 0–4,7 V): não use divisor resistivo externo; conecte o sinal medido diretamente a VBATS. |
| 2 | Coloque um capacitor de 4,7 µF e outro de 0,1 µF próximo ao pino VSYS. |
| 3 | Coloque um capacitor de 0,1 µF próximo ao pino VBATS. |
| 4 | VDD33_VOUT2 é a saída do LDO de 3,3 V, com corrente máxima de 150 mA; não exceda esse limite com a carga externa. |
| 5 | A capacitância total em VDD33_VOUT2 deve ser ≤ 7,4 µF. |
| 6 | O nível da interface de I/O do módulo é 3,3 V; todo periférico conectado também deve usar níveis lógicos de 3,3 V. |
| 7 | Se o módulo vier com cristal interno de 32 kHz, PA22 e PA23 não estarão disponíveis externamente. |
| 8 | Se houver Flash já montada no módulo, os seis sinais MPI2 (PA12, PA13, PA14, PA15, PA16 e PA17) não estarão disponíveis externamente. |
| 9 | A interface SDIO compartilha os pinos de I/O com a MPI2 e não pode ser usada simultaneamente com ela. |
| 10 | Os pinos marcados como `#GPADC_CHx` na tabela de pinos aceitam entrada analógica na faixa de 0–3,3 V. |
| 11 | Os pinos marcados como `PAxx_TIM` na tabela de pinos aceitam saída PWM. |
| 12 | PA34 permite reset por pressão longa de 10 segundos, ativo em nível alto; inclua um resistor pull-down de 10 kΩ no projeto. |
| 13 | Reserve componentes de proteção ESD para as interfaces da bateria e do painel tátil (TP), além de outras interfaces expostas externamente quando necessário. |
| 14 | Recomenda-se colocar um resistor em série de 100 Ω em cada pino PA18/PA19 quando multiplexados como DBG_UART para gravação e depuração. |

</div>

## 10. Dimensões do módulo e footprint da PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensões do módulo { #101-module-dimensions }

O módulo mede 27,9 × 18,0 × 3,1 mm.

!!! info "Figura 10.1-1: dimensões do módulo — vistas superior, lateral e inferior"
    Consulte a Figura 8-1 do datasheet oficial. O diagrama não é reproduzido neste guia.

### 10.2 Footprint recomendado da PCB { #102-recommended-pcb-footprint }

!!! info "Figura 10.2-1: footprint recomendado da PCB"
    Consulte a Figura 8-2 do datasheet oficial. O diagrama não é reproduzido neste guia.

### 10.3 Conector de antena externa { #103-external-antenna-connector }

Nas SKUs compatíveis com antena externa, o módulo usa um footprint de conector de primeira geração compatível com:

- Série Hirose U.FL
- Conectores I-PEX MHFI
- Conectores Amphenol AMC

!!! info "Figura 10.3-1: dimensões do conector de antena externa"
    Consulte a Figura 8-3 do datasheet oficial. O diagrama não é reproduzido neste guia.

### 10.4 Posicionamento do módulo no projeto da PCB { #104-module-placement-in-pcb-design }

Se o produto final usar o módulo na própria placa, reserve uma área sem componentes ou metal sobre a zona da antena da PCB do módulo, para evitar reduzir a eficiência de radiação. Posicione o módulo na placa hospedeira de modo a minimizar o impacto no desempenho da antena.

Prática recomendada:

- Prolongue a área da antena do módulo além da borda da placa hospedeira e mantenha o ponto de alimentação próximo a essa borda.

!!! info "Figura 10.4-1: posicionamento recomendado do módulo"
    Consulte a Figura 8-4 do datasheet oficial. O diagrama não é reproduzido neste guia.

- Se a antena não puder ultrapassar a borda da placa, mantenha uma zona de exclusão de pelo menos 15 mm ao redor da antena da PCB, sem plano de cobre, trilhas ou componentes; quando possível, remova o material da placa hospedeira sob a antena.

!!! info "Figura 10.4-2: zona de exclusão da antena"
    Consulte a Figura 8-5 do datasheet oficial. O diagrama não é reproduzido neste guia.

- Mesmo no layout com zona de exclusão, mantenha o ponto de alimentação da antena próximo à borda da placa.
- No projeto do produto completo, avalie o efeito do gabinete sobre a antena e valide a RF, incluindo um teste final de alcance de comunicação no produto montado.

## 11. Manuseio do produto { #11-product-handling }

### 11.1 Condições de armazenamento { #111-storage-conditions }

- Armazene os produtos selados em uma embalagem barreira contra umidade (MBB), a <40 °C / 90% RH, sem condensação.
- Nível de sensibilidade à umidade (MSL) do módulo: 3.
- Após abrir a embalagem a vácuo, use o módulo em até 168 horas a 25±5 °C / 60% RH; se esse prazo for excedido, o módulo deve passar por secagem em estufa antes de retornar à linha de produção.

### 11.2 Descarga eletrostática (ESD) { #112-electrostatic-discharge-esd }

- Modelo do corpo humano (HBM): ±2000 V
- Modelo do dispositivo carregado (CDM): ±500 V

### 11.3 Perfil de reflow { #113-reflow-profile }

Recomenda-se submeter o módulo a apenas um ciclo de reflow.

!!! info "Figura 11.3-1: perfil recomendado de temperatura de reflow"
    Consulte a Figura 9-1 do datasheet oficial. O diagrama não é reproduzido neste guia.

### 11.4 Vibração ultrassônica { #114-ultrasonic-vibration }

Evite expor os módulos da SiFli à vibração de equipamentos de soldagem ou limpeza ultrassônica. Essa vibração pode entrar em ressonância com os osciladores de cristal internos do módulo, causando falha ou funcionamento incorreto dos cristais e tornando o módulo inoperante ou reduzindo seu desempenho.

## 12. Documentos relacionados { #12-related-documents }

- [Datasheet DS5203-SF32LB52-MOD-1 (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [Apresentação do chip SF32LB52x](../../sf32-products/chips/SF32LB52x.md)
- [Guia de projeto de hardware do SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. Histórico de revisões { #13-revision-history }

<div align="center"><em>Tabela 13-1: histórico de revisões</em></div>

<div align="center" markdown>

| Data | Versão | Notas |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | Figura 2-1 atualizada |
| 2025-03 | 0.2 | Descrições relacionadas à alimentação revisadas; Figuras 3-1 e 6-3 atualizadas |
| 2024-12 | 0.1 | Versão preliminar |

</div>

Este guia baseia-se no datasheet indicado acima; consulte o PDF oficial para obter a revisão mais atual e definitiva.
