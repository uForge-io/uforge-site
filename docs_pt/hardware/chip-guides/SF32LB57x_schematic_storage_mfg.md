---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de esquemático do SF32LB57x: armazenamento, conectividade e fabricação, mídias de boot, UART/I2C/SPI/SDIO/USB/CAN/GPADC, gravação em produção e gabaritos."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB57x — armazenamento e fabricação { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "Parte do guia de projeto de hardware do SF32LB57x"
    Esta página aborda as seções 5.6 e 5.7 das diretrizes de projeto de esquemático: armazenamento e conectividade, e fabricação. Volte para [Clock, RF e interfaces de usuário](SF32LB57x_schematic_clock_rf_interfaces.md) ou avance para [Diretrizes de layout de PCB](SF32LB57x_pcb_layout.md).

### 5.6. Armazenamento e conectividade { #56-storage-and-connectivity }

#### 5.6.1. Armazenamento e boot { #561-storage-and-boot }

As decisões de armazenamento e boot devem ser avaliadas em conjunto. A mídia de boot escolhida determina os resistores de configuração, o estado padrão de alimentação do armazenamento, a alocação dos barramentos e o acesso de recuperação em produção.

Variantes com Flash SPI NOR integrada ao encapsulamento inicializam por ela por padrão. As variantes sem essa Flash devem inicializar a partir de armazenamento externo. A mídia externa é selecionada por `PA13` (`Bootstrap[1]`) e `PA17` (`Bootstrap[0]`). O esquemático da SiFli mostra um jumper e um footprint reservado para um resistor de pull-up de 7,5 kΩ em cada sinal, conectado a `VDD33_VOUT1/VDDIOA`.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="Jumpers de seleção de boot e pull-ups de PA13 e PA17" /></div>
<div align="center"><em>Figura 5.6-1: Circuito de seleção de boot por PA13 e PA17</em></div>

<div align="center"><em>Tabela 5.6-1: Seleção da mídia externa de boot</em></div>

<div align="center" markdown>

| `PA13` (`Bootstrap[1]`) | `PA17` (`Bootstrap[0]`) | Mídia externa de boot |
|:-------------------|:-------------------|:----------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. Interfaces de armazenamento { #562-storage-interfaces }

O SF32LB57x oferece suporte a Flash SPI NOR externa, Flash SPI NAND, Flash SD NAND e eMMC. Somente o MPI3 nos pinos `PA12` a `PA17` oferece suporte a SPI NOR e SPI NAND; qualquer uma das duas interfaces SDIO pode conectar SD NAND ou eMMC. Em algumas variantes disponíveis para pedido, a memória integrada ao encapsulamento ocupa o MPI3.

Antes de finalizar o esquemático, confirme:

- Se a Flash ou PSRAM integrada ao encapsulamento ocupa um canal MPI.
- Qual mídia externa de boot será usada: SPI NOR, SPI NAND, SD NAND ou eMMC.
- Se a tensão de IO é compatível com o dispositivo de armazenamento.
- Se os pull-ups, o sinal de seleção do dispositivo (CS), o clock, as linhas de dados e o controle de alimentação atendem aos requisitos de boot.
- Se o estado padrão de alimentação da mídia externa de boot está correto.

<div align="center"><em>Tabela 5.6-2: Conexões recomendadas de armazenamento no MPI3</em></div>

<div align="center" markdown>

| Sinal de armazenamento | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. Controle de boot e alimentação { #563-boot-and-power-control }

A eMMC tem domínios de alimentação separados para `VCC` e `VCCQ`. Comutar os dois juntos reduz o consumo durante o desligamento, mas torna mais lenta a saída do modo de suspensão e aumenta o consumo médio da CPU. Comutar apenas `VCC` e manter `VCCQ` sempre alimentado aumenta o consumo durante o desligamento, mas acelera a retomada da eMMC e reduz o consumo médio da CPU.

<div align="center"><em>Tabela 5.6-3: Requisitos de pull-up para armazenamento externo no MPI3</em></div>

<div align="center" markdown>

| Mídia externa | `PA13` | `PA15` | `PA17` |
|:--------------|:-----|:-----|:-----|
| SPI NOR Flash | MPI `D1`: sem pull-up | Não especificado na fonte | MPI `D3`: sem pull-up |
| SPI NAND Flash | MPI `D1`: sem pull-up | Não especificado na fonte | MPI `D3`: pull-up de 7,5 kΩ |
| SD NAND Flash | SD `D3`: pull-up de 7,5 kΩ | SD `CMD`: pull-up de 7,5 kΩ | SD `D1`: sem pull-up |
| eMMC | SD `D3`: pull-up de 7,5 kΩ | SD `CMD`: pull-up de 7,5 kΩ | SD `D1`: pull-up de 7,5 kΩ |

</div>

“Não especificado na fonte” significa que o checklist de origem não estabelece um requisito para essa célula; não significa que o pull-up seja desnecessário.

A seleção da mídia externa de boot é mostrada na Tabela 5.6-1 e na Figura 5.6-1. O sinal de habilitação da chave de alimentação do armazenamento é fixo em `PA21` e ativo em nível alto. Escolha a alimentação conforme a variante:

- Variantes alimentadas por bateria: a Flash SPI NOR externa pode ser alimentada continuamente por `VDD33_VOUT1`; a Flash SPI NAND deve ser alimentada por uma chave após `VDD33_VOUT1`. SD NAND e eMMC usam um LDO externo, preferencialmente habilitado por `PA21`. Em encapsulamentos sem `PA21`, pode-se usar um GPIO cujo padrão após o reset seja pull-up.
- Variantes alimentadas em 3,3 V: use um LDO externo para todo armazenamento externo de boot; `PA21` é recomendado para habilitá-lo.
- A Flash SPI NOR pode permanecer alimentada; SPI NAND, SD NAND e eMMC exigem uma chave de alimentação. Para inicializar por mídia externa, sua alimentação precisa estar ligada por padrão durante a inicialização.
- Reserve footprints para pull-ups em `PA13` e `PA17` e monte-os conforme a mídia de boot; o valor recomendado é 7,5 kΩ. Consulte a Tabela 5.6-3 para os requisitos de cada pino MPI3.
- Se a memória integrada ao encapsulamento ocupar o MPI3, o uso externo desse canal fica limitado a SD NAND ou eMMC; não conecte Flash SPI NOR/SPI NAND externa a ele.
- Compatibilize a tensão de IO do armazenamento com a alimentação de IO do MCU e escolha um componente listado na Lista de Fornecedores Aprovados (AVL) do projeto.

#### 5.6.4. GPIO e multiplexação de pinos { #564-gpio-and-pin-multiplexing }

Planeje os GPIOs antes de atribuir todos os periféricos do produto, pois sinais de boot, depuração, despertar, USB, analógicos, de display, de armazenamento e de alta velocidade podem limitar a flexibilidade da matriz de roteamento.

#### 5.6.5. Planejamento dos pinos { #565-pin-planning }

O SF32LB57x oferece multiplexação flexível de pinos, mas os seguintes sinais devem ser definidos desde o início:

- RF, cristais, alimentação, USB, áudio analógico, GPADC, boot e depuração.
- Interfaces de alta velocidade para display, SDIO, armazenamento e DCMI que exigem grupos específicos de pinos.
- GPIOs de despertar, configuração de boot, seleção de SWD e pinos de teste de produção.

#### 5.6.6. Diretrizes para GPIO { #566-gpio-guidelines }

- Configure os GPIOs não utilizados para um estado definido.
- Compatibilize a tensão de IO dos periféricos com o domínio de alimentação de IO correspondente.
- Inclua no orçamento de energia a corrente de fuga durante o sono causada por pull-ups de GPIO.
- Quando um pino for reutilizado como entrada analógica, USB, áudio ou função especial, configure os caminhos de entrada/saída digital conforme o manual do usuário.
- A flexibilidade da matriz de roteamento não elimina as restrições de layout para sinais de alta velocidade. Respeite os requisitos dos grupos de pinos e da PCB.

Cada GPIO pode selecionar as funções 0 a 15 por meio da tabela IO MUX abaixo. A coluna Function 16-255 indica o roteamento pela matriz; a tabela seguinte enumera os índices de função de 16 a 175. Consulte as duas tabelas em conjunto para confirmar em qual pino físico cada sinal periférico pode ser alocado antes de congelar o esquemático.

<div align="center"><em>Tabela 5.6-4: Tabela IO MUX</em></div>

<div align="center" markdown>

| PAD | PUPD | Função 0 | Função 1 | Função 2 | Função 3 | Função 4 | Função 5 | Função 6 | Função 15 | Funções 16–255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | Tabela da matriz |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | Tabela da matriz |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | Tabela da matriz |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | Tabela da matriz |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | Tabela da matriz |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | Tabela da matriz |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | Tabela da matriz |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | Tabela da matriz |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | Tabela da matriz |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | Tabela da matriz |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | Tabela da matriz |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | Tabela da matriz |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | Tabela da matriz |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | Tabela da matriz |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | Tabela da matriz |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | Tabela da matriz |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | Tabela da matriz |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | Tabela da matriz |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | Tabela da matriz |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | Tabela da matriz |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | Tabela da matriz |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | Tabela da matriz |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | Tabela da matriz |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | Tabela da matriz |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabela da matriz |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | Tabela da matriz |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabela da matriz |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabela da matriz |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | Tabela da matriz |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | Tabela da matriz |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | Tabela da matriz |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | Tabela da matriz |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | Tabela da matriz |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | Tabela da matriz |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | Tabela da matriz |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | Tabela da matriz |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | Tabela da matriz |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | Tabela da matriz |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | Tabela da matriz |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | Tabela da matriz |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | Tabela da matriz |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | Tabela da matriz |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | Tabela da matriz |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | Tabela da matriz |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | Tabela da matriz |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | Tabela da matriz |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | Tabela da matriz |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | Tabela da matriz |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | Tabela da matriz |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | Tabela da matriz |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | Tabela da matriz |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | Tabela da matriz |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | Tabela da matriz |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | Tabela da matriz |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | Tabela da matriz |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | Tabela da matriz |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | Tabela da matriz |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | Tabela da matriz |

</div>

O negrito indica a função do pino após o reset. `PUPD` indica a direção do pull interno após o reset (`PU`: pull-up; `PD`: pull-down; `-`: nenhum). `#` identifica uma função analógica.

!!! note
    - As funções analógicas só podem ser acessadas pelas Funções 0–15 da tabela IO MUX acima.
    - Somente `PA11` a `PA17` e `SB01` a `SB09` oferecem suporte à interface MPI.
    - Nos modos Sleep, DeepSleep e Standby, somente `PA24` a `PA27` podem continuar emitindo sinais; esses pinos podem gerar o clock PWM do LPTIM2 até 16 kHz.
    - `PA18` e `PA19` são os pinos dedicados à depuração e oferecem suporte a `DBG-UART` e `SWD`.
    - `PA43` e `PA44` são pinos de depuração alternativos e oferecem suporte apenas a `SWD`.
    - `PA00` e `PA01` configuram o modo de download do dispositivo e a seleção da localização dos pinos `SWD`; consulte a Seção 5.7.1.
    - As interrupções externas de hardware para despertar estão limitadas aos dez GPIOs `PA33` a `PA42`.

<div align="center"><em>Tabela 5.6-5: Tabela da matriz (índice de função 16–175)</em></div>

<div align="center" markdown>

| Módulo | Largura (bits) | Índice | Subíndice | Função |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA` (na ordem dos índices). |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO` (na ordem dos índices). |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS` (na ordem dos índices). |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD` (na ordem dos índices). |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX` (na ordem dos índices). |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR` (na ordem dos índices). |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR` (na ordem dos índices). |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2` (na ordem dos índices). |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5` (na ordem dos índices). |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK` (na ordem dos índices). |
| PTM | 16 | 105-120 | 89-104 | De `PTM1_CH0` a `PTM1_CH15` (na ordem dos índices). |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0` a `LCDC_IF29` (na ordem dos índices). Consulte a Tabela 5.6-6 para ver o submapeamento de cada modo de interface. |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2` (na ordem dos índices). |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, de `DCMI_DI0` a `DCMI_DI15` (na ordem dos índices). |

</div>

A matriz pode rotear qualquer GPIO para qualquer uma das funções acima, respeitando as restrições de roteamento e layout descritas neste guia. As colunas de índice e subíndice contêm os valores exatos dos campos de registro usados para configurar o roteador da matriz no firmware.

<div align="center"><em>Tabela 5.6-6: Subtabela de multiplexação da matriz LCDC</em></div>

<div align="center" markdown>

| Sinal da matriz | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "Valores de IF_SEL na tabela de submultiplexação LCDC"
    A tabela original da SiFli atribui `IF_SEL=0` tanto ao modo SPI quanto ao JDI. Este artigo mantém os valores da fonte, mas a atribuição duplicada é ambígua. Antes de configurar o painel, confirme o valor no driver SDK e no projeto de referência correspondentes; não deduza o valor do registro apenas com base nesta tabela.

#### 5.6.7. Interfaces gerais { #567-general-interfaces }

Use os mesmos critérios para revisar cada interface de uso geral: conexões elétricas, tensão de IO, estado padrão durante reset e suspensão, alimentação dos pull-ups, exposição a ESD e conflitos com boot, depuração, despertar ou funções de alta velocidade.

`PA34` oferece suporte à tecla de energia e à reinicialização por pressionamento prolongado. O reset é ativo em nível alto: instale um pull-down de 10 kΩ na placa. Ao pressionar a tecla, o pino vai para nível alto; mantê-la pressionada por 10 segundos aciona o reset por hardware. O circuito de referência de teclas por escada resistiva GPADC usa resistores de 1,1 kΩ, 2,8 kΩ e 5,1 kΩ. Os nós estão identificados, respectivamente, como 2,97 V/1,62 V, 2,58 V/1,41 V e 2,19 V/1,19 V. O nó `PA34` também tem pull-down de 10 kΩ e capacitor de 100 nF para GND. Instale proteção ESD perto de cada tecla exposta.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="Circuito de referência da tecla de energia PA34 e da tecla GPADC com escada resistiva" /></div>
<div align="center"><em>Figura 5.6-2: Circuito de referência das teclas PA34 e GPADC</em></div>

!!! warning "Identificação das tensões da tecla GPADC"
    O esquemático da SiFli mostra dois valores de tensão separados por barra em cada nó de tecla, mas não explica as condições correspondentes. Confirme o mapeamento com a configuração de alimentação prevista e o projeto de referência antes de usar esses valores como limiares.

#### 5.6.8. Princípios de revisão das interfaces { #568-interface-review-principles }

Revise quatro aspectos em cada interface periférica:

1. A conectividade elétrica, incluindo inversão de sinais, resistores pull-up/pull-down, ESD e terminação.
2. A compatibilidade entre domínios de tensão de IO, incluindo o risco de alimentação reversa quando o periférico estiver desligado.
3. Os estados padrão seguros durante reset e suspensão.
4. Conflitos com boot, download, SWD, USB, despertar ou funções multiplexadas de display de alta velocidade.

#### 5.6.9. UART { #569-uart }

- O SF32LB57x tem três UARTs full-duplex, com taxas de até 6 Mbps e formatos de dados configuráveis. Os sinais podem usar pinos das Funções 0-15 ou ser roteados pela matriz para qualquer GPIO.
- Conecte RXD do MCU a TXD do periférico e TXD do MCU a RXD do periférico.
- Compatibilize a tensão de IO do periférico com o domínio de IO do MCU.
- Revise o comportamento dos pinos UART durante o reset quando eles forem multiplexados com funções de USB, boot, download ou depuração.
- `PA18` e `PA19` são os pinos `DBG-UART` padrão. Para interfaces de teste UART conectadas e desconectadas com frequência, a SiFli recomenda `PA18`, `PA19`, `PA43` ou `PA44`; esse grupo de GPIOs suporta até 5,5 V. Em cabos de teste longos, adicione um resistor em série de 100 Ω para reduzir overshoot.

#### 5.6.10. I2C { #5610-i2c }

- SDA e SCL precisam de resistores pull-up.
- O SF32LB57x tem quatro interfaces I2C, cada uma com modos host e dispositivo, roteáveis pela matriz para qualquer GPIO.
- A fonte recomenda 4,7 kΩ no Standard-mode (100 kHz), 2,2 kΩ a 3,3 kΩ no Fast-mode (400 kHz) e 1 kΩ a 2,2 kΩ no Fast-mode Plus (1 MHz). Para 400 kHz, comece com 2,2 kΩ e ajuste conforme a capacitância do barramento.
- Em um barramento I2C compartilhado, basta um conjunto de pull-ups perto do host; não instale um conjunto em cada dispositivo. Alimente os pull-ups pelo trilho de alimentação do periférico, para desligá-los junto com ele e evitar fuga durante o sono.
- Garanta que cada dispositivo no mesmo barramento tenha um endereço exclusivo.

#### 5.6.11. SPI { #5611-spi }

- O SF32LB57x tem duas interfaces SPI, cada uma com modos host e dispositivo; podem usar pinos das Funções 0-15 ou roteamento pela matriz.
- Conecte SDO do MCU a SDI do periférico e SDI do MCU a SDO do periférico.
- Ajuste CLK, CS, modo, fase, polaridade e frequência máxima conforme o datasheet do periférico.
- Mantenha curtas as trilhas SPI de alta velocidade e preserve a continuidade do plano de referência de GND. Adicione amortecimento em série se os testes de integridade de sinal indicarem necessidade.
- A SPI abaixo de 30 MHz pode usar roteamento pela matriz para qualquer GPIO; acima de 30 MHz, prefira pinos dedicados das Funções 0 a 15.
- Para SPI de alta velocidade, coloque um resistor em série de 22 Ω a 27 Ω perto do driver e reserve uma posição para capacitor em derivação na linha de clock para ajuste da integridade de sinal.

#### 5.6.12. SDIO { #5612-sdio }

- O SF32LB57x tem dois controladores host SD/MMC, que operam somente em modo host e aceitam cartões SD, periféricos SDIO e eMMC. Os sinais SDIO ficam fixos nos GPIOs definidos pelo multiplexador de pinos.
- Roteie os sinais SDIO como um grupo.
- Sempre que possível, mantenha o comprimento total em até cerca de 50 mm e a diferença de comprimento entre os sinais do grupo em até aproximadamente 6 mm.
- Mantenha as trilhas CLK, CMD e DATA sobre um plano de referência de GND contínuo.
- Verifique os pull-ups, o controle de alimentação e os domínios de tensão de SDIO/eMMC/SD NAND.
- A 24 MHz, os pull-ups internos dos GPIOs podem ser suficientes para CMD e Data0 a Data3; a 48 MHz ou mais, adicione pull-ups externos de 10 kΩ em CMD e Data0 a Data3.
- Adicione resistores em série de 27 Ω a 33 Ω nos sinais SDIO e reserve uma posição para capacitor em derivação na linha de clock.
- Em um soquete TF externo, conecte `DET` a 3,3 V por um pull-up de 10 kΩ e configure o pino do MCU como entrada com pull-up interno. Adicione proteção ESD aos sinais SDIO e à alimentação.

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>Tabela 5.6-7: Atribuição dos pinos USB</em></div>

<div align="center" markdown>

| Sinal USB | Pino GPIO |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- Roteie USB DP/DN como um par diferencial de 90 Ω.
- USB DP/DM normalmente usam as funções multiplexadas de `PA35`/`PA36`. Com o USB habilitado, garanta que circuitos externos não imponham níveis inseguros durante o reset.
- Coloque a proteção ESD perto do conector e faça os sinais passarem por ela antes de chegarem ao chip.
- Evite derivações e mantenha o casamento do par e a continuidade da referência de GND.
- Se o sistema precisar despertar ao detectar a conexão USB durante a suspensão, adicione um divisor de VBUS a um GPIO capaz de despertar o sistema. Recomenda-se compartilhar esse GPIO com a detecção de inserção do carregador.
- `PA35` é fixo como `USB_DP` e `PA36` como `USB_DM`; essas funções não podem ser remapeadas. USB 2.0 FS suporta até 12 Mbps.
- Reserve posições para resistores em série de 22 Ω ou 33 Ω perto do chip nas linhas DP/DM e para capacitores em derivação não montados, usados no ajuste da integridade de sinal.
- O USB usa sinalização single-ended a 3,3 V. O chip integra um resistor de identificação; o software pode habilitar um pull-up de 1,5 kΩ em DP ou DM para identificar dispositivos Full-Speed ou Low-Speed. Com o USB habilitado, configure `PA35` e `PA36` como entradas de alta impedância para evitar conflitos no multiplexador.

#### 5.6.14. CAN { #5614-can }

- O SF32LB57x tem duas interfaces CAN compatíveis com CAN 2.0B, roteáveis pela matriz para qualquer GPIO.
- Compatibilize a alimentação e a tensão de IO do transceptor CAN com o MCU.
- Adicione terminação, choque de modo comum e proteção ESD conforme os requisitos do sistema.
- Em ambientes industriais ou automotivos, avalie surtos, EFT, ESD e diferenças de potencial entre terras.

#### 5.6.15. GPADC { #5615-gpadc }

- Mantenha a tensão de entrada GPADC dentro da faixa nominal de 0 V a 3,3 V.
- Somente `PA28` a `PA38` (11 pinos) oferecem suporte a GPADC pelo pinmux; não atribua essa função a outros pinos.
- Use resistores de 1% em medições com divisor resistivo.
- Coloque um capacitor de filtro de 100 nF (0,1 µF) perto do pino do chip em cada entrada GPADC.
- Mantenha as trilhas GPADC afastadas de DC/DC, RF, USB, SDIO, clocks do display e circuitos de carga.

<div align="center"><em>Tabela 5.6-8: Atribuição dos pinos GPADC</em></div>

<div align="center" markdown>

| Pino | Função GPADC |
|:----|:---------------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT` / `VBATS` | `GPADC_CH11`; esses sinais pertencem ao domínio de tensão da bateria e têm uma faixa de medição diferente da dos pinos GPADC comuns. |

</div>

!!! warning "Tensão do pino VBATS e faixa de medição"
    Para as variantes alimentadas com 3,3 V, a tabela de pinos de alimentação indica 0–4,7 V para `VBATS`, enquanto o checklist do esquemático limita a medição da tensão da bateria a 0–4,5 V. Para medições com GPADC, siga a faixa mais estreita de 0–4,5 V; não trate o limite de 4,7 V da tabela de pinos como uma faixa válida de medição do ADC.

### 5.7. Fabricação { #57-manufacturing }

#### 5.7.1. Modos de boot e download em produção { #571-production-boot-and-download-modes }

Mantenha os pinos padrão de depuração e download acessíveis ao gabarito de produção e reserve os controles de boot antes de atribuir os pinos de IO do produto. O checklist de origem exige pontos de teste soldáveis em `PA43`/`PA44` e pull-up mais ponto de teste em `PA00`; o resistor e o ponto de teste em `PA01` são opcionais.

<div align="center"><em>Tabela 5.7-1: Pontos de teste de depuração e controle de boot</em></div>

<div align="center" markdown>

| Sinal | Pino | Requisito de produção |
|:------|:-----|:----------------------|
| `DBG_UART_RXD` | `PA18` | Reserve o pino padrão de recepção da UART de depuração; forneça acesso ao gabarito. |
| `DBG_UART_TXD` | `PA19` | Reserve o pino padrão de transmissão da UART de depuração; forneça acesso ao gabarito. |
| `SWD_CLK` | `PA43` | Forneça um ponto de teste soldável. |
| `SWD_DIO` | `PA44` | Forneça um ponto de teste soldável. |
| Seleção do modo de boot | `PA00` | Forneça um pull-up e um ponto de teste. |
| Seleção da posição do SWD | `PA01` | Resistor e ponto de teste opcionais. |

</div>

<div align="center"><em>Tabela 5.7-2: Modos de boot e interfaces de download</em></div>

<div align="center" markdown>

| `PA00` / registro de boot | `PA01` | Chave de boot do host | Ramificação de boot e interfaces disponíveis |
|:-----------------------|:-------|:-----------------|:------------|
| L | H | Qualquer | Boot normal; `PA19` não emite logs de boot; `PA18`/`PA19` passam para SWD e o SWD em `PA43`/`PA44` é desabilitado. |
| L | L | Desligada | Boot normal; `PA19` emite logs de boot; `PA18`/`PA19` são DBG-UART e `PA43`/`PA44` são SWD. |
| L | L | Ligada | Modo de boot; são aceitos DBG-UART, SWD, UART e gravação via USB. |
| PA00 ou registro de boot = 1 | L | Qualquer | Modo de boot; são aceitos DBG-UART, SWD, UART e gravação via USB. |
| PA00 ou registro de boot = 1 | H | Qualquer | Modo de boot; `PA19` não emite logs de boot; são aceitos SWD e gravação via USB, e `PA18`/`PA19` passam para SWD. |

</div>

!!! warning "Nome da UART de depuração na fonte"
    A seção 2.10 lista `DB_UART_RXD` duas vezes (sem o `G`). A tabela de pinos de depuração e o checklist identificam `PA18` como `DBG_UART_RXD` e `PA19` como `DBG_UART_TXD`. Confirme os nomes dos sinais pretendidos com o gabarito de produção antes da liberação; não reserve RXD duas vezes.

<div align="center"><em>Tabela 5.7-3: Listas de pontos de teste de produção na fonte</em></div>

<div align="center" markdown>

| Lista da fonte | Escopo indicado | Pontos de teste listados |
|:---------------|:----------------|:-------------------------|
| Seção 2.10, lista de gravação em produção e calibração do cristal | Não indicado | `VBAT`, `PVDD`, `GND`, `AVDD33`, `PA00`, `PA01` e `DB_UART_RXD` duas vezes. |
| Checklist de hardware 4.8, item 1 | Variantes alimentadas por bateria | `VBAT` ou 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (ausente nas variantes de 3,3 V) e `PA34`. |
| Checklist de hardware 4.8, item 3 | Todos os modelos | `VBAT` ou 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` (ausente na série de 3,3 V), `PA00`, `PA01` e `PA34`; dimensione, espace e oriente os pads conforme as sondas do gabarito. |

</div>

#### 5.7.2. Gravação e calibração em produção { #572-production-programming-and-calibration }

A fonte pede o uso de um programador offline para gravar a Flash e calibrar o cristal. Esta seção não especifica calibração de RF nem medição da corrente de alimentação. Ao definir os pads de produção, siga os requisitos da fonte para o tamanho, o espaçamento e a orientação das sondas; confirme também com o responsável pelo gabarito as diferenças entre as listas de pontos de teste da Tabela 5.7-3.

Consulte a [documentação do programador offline da SiFli](https://wiki.sifli.com/tools/index.html).
