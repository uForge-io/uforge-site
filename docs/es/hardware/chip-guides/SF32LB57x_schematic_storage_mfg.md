---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de esquemático de almacenamiento, conectividad y fabricación de SF32LB57x: medios de arranque, UART/I2C/SPI/SDIO/USB/CAN/GPADC, grabación de producción y utillaje."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware de SF32LB57x — Almacenamiento y fabricación { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "Parte de la guía de diseño de hardware de SF32LB57x"
    Esta página abarca las secciones 5.6 y 5.7 de las directrices de diseño de esquemáticos: almacenamiento y conectividad, y fabricación. Vuelva a [Reloj, RF e interfaces de usuario](SF32LB57x_schematic_clock_rf_interfaces.md) o continúe con las [Directrices de diseño de PCB](SF32LB57x_pcb_layout.md).

### 5.6. Almacenamiento y conectividad { #56-storage-and-connectivity }

#### 5.6.1. Almacenamiento y arranque { #561-storage-and-boot }

Las decisiones sobre almacenamiento y arranque deben revisarse conjuntamente. El medio de arranque elegido determina las resistencias de configuración, el estado de alimentación predeterminado del almacenamiento, la asignación de buses y el acceso de recuperación durante la producción.

Las variantes con memoria Flash SPI NOR integrada en el encapsulado arrancan desde ella de forma predeterminada. Las variantes sin esa memoria deben arrancar desde un almacenamiento externo. El medio externo se selecciona con `PA13` (`Bootstrap[1]`) y `PA17` (`Bootstrap[0]`). El esquemático de origen muestra un puente y una posición para una resistencia pull-up de 7,5 kΩ en cada señal, conectados a `VDD33_VOUT1/VDDIOA`.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="Puentes de selección de arranque y resistencias pull-up de PA13 y PA17" /></div>
<div align="center"><em>Figura 5.6-1: Circuito de selección de arranque por PA13 y PA17</em></div>

<div align="center"><em>Tabla 5.6-1: Selección del medio de arranque externo</em></div>

<div align="center" markdown>

| `PA13` (`Bootstrap[1]`) | `PA17` (`Bootstrap[0]`) | Medio de arranque externo |
|:-------------------|:-------------------|:--------------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. Interfaces de almacenamiento { #562-storage-interfaces }

SF32LB57x admite SPI NOR Flash, SPI NAND Flash, SD NAND Flash y eMMC externos. Solo MPI3 en `PA12` a `PA17` admite SPI NOR y SPI NAND; cualquiera de las dos interfaces SDIO puede conectar SD NAND o eMMC. En algunas variantes disponibles para pedido, la memoria integrada en el encapsulado ocupa MPI3.

Antes de cerrar el esquemático, confirme lo siguiente:

- Si la memoria Flash o PSRAM integrada en el encapsulado ocupa un canal MPI.
- Qué medio de arranque externo se utilizará: SPI NOR, SPI NAND, SD NAND o eMMC.
- Si la tensión de E/S es compatible con el dispositivo de almacenamiento.
- Si las resistencias pull-up, la señal de selección del dispositivo (CS), el reloj, las líneas de datos y el control de alimentación cumplen los requisitos de arranque.
- Si el medio de arranque externo tiene el estado de alimentación predeterminado correcto.

<div align="center"><em>Tabla 5.6-2: Conexiones recomendadas para almacenamiento MPI3</em></div>

<div align="center" markdown>

| Señal de almacenamiento | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. Arranque y control de alimentación { #563-boot-and-power-control }

La eMMC tiene dominios de alimentación separados `VCC` y `VCCQ`. Conmutar ambos reduce el consumo durante el apagado, pero ralentiza la salida del modo de suspensión y aumenta el consumo medio de la CPU. Conmutar solo `VCC` y mantener `VCCQ` alimentado aumenta el consumo durante el apagado, pero acelera la reanudación de la eMMC y reduce el consumo medio de la CPU.

<div align="center"><em>Tabla 5.6-3: Requisitos de pull-up para almacenamiento externo en MPI3</em></div>

<div align="center" markdown>

| Medio externo | `PA13` | `PA15` | `PA17` |
|:--------------|:-----|:-----|:-----|
| SPI NOR Flash | MPI `D1`: sin pull-up | No especificado en la fuente | MPI `D3`: sin pull-up |
| SPI NAND Flash | MPI `D1`: sin pull-up | No especificado en la fuente | MPI `D3`: pull-up de 7,5 kΩ |
| SD NAND Flash | SD `D3`: pull-up de 7,5 kΩ | SD `CMD`: pull-up de 7,5 kΩ | SD `D1`: sin pull-up |
| eMMC | SD `D3`: pull-up de 7,5 kΩ | SD `CMD`: pull-up de 7,5 kΩ | SD `D1`: pull-up de 7,5 kΩ |

</div>

«No especificado en la fuente» significa que la lista de comprobación de origen no establece un requisito para esa celda; no significa que el pull-up sea innecesario.

La selección del medio de arranque externo se muestra en la tabla 5.6-1 y la figura 5.6-1. La señal de habilitación del interruptor de alimentación del almacenamiento está fijada a `PA21` y es activa en nivel alto. Elija la alimentación del almacenamiento según la variante:

- Variantes alimentadas por batería: la SPI NOR Flash externa puede recibir alimentación continua de `VDD33_VOUT1`; la SPI NAND Flash debe alimentarse mediante un interruptor situado después de `VDD33_VOUT1`. La SD NAND Flash y la eMMC usan un LDO externo, preferiblemente habilitado por `PA21`. En encapsulados sin `PA21` puede usarse una GPIO cuyo estado predeterminado tras el reinicio sea pull-up.
- Variantes alimentadas a 3,3 V: use un LDO externo para todo almacenamiento de arranque externo; se recomienda `PA21` para habilitarlo.
- La SPI NOR Flash puede permanecer alimentada; la SPI NAND, la SD NAND y la eMMC requieren un interruptor de alimentación. Para arrancar desde medios externos, su alimentación debe estar habilitada por defecto durante el arranque.
- Reserve huellas de pull-up en `PA13` y `PA17` y móntelas según el medio de arranque; el valor recomendado es 7,5 kΩ. Consulte la tabla 5.6-3 para los requisitos por pin MPI3.
- Si la memoria integrada en el encapsulado ocupa MPI3, el uso externo de MPI3 se limita a SD NAND o eMMC; no conecte SPI NOR/SPI NAND externos a ese canal.
- Haga coincidir la tensión de E/S del almacenamiento con la alimentación de E/S de la MCU y elija un componente incluido en la lista de proveedores aprobados (AVL) del proyecto.

#### 5.6.4. GPIO y multiplexación de pines { #564-gpio-and-pin-multiplexing }

Planifique las GPIO antes de asignar por completo los periféricos del producto, ya que las señales de arranque, depuración, activación, USB, analógicas, de pantalla, almacenamiento y alta velocidad pueden limitar el enrutamiento flexible mediante la matriz.

#### 5.6.5. Planificación de pines { #565-pin-planning }

SF32LB57x permite una multiplexación flexible de pines, pero conviene definir cuanto antes las siguientes señales:

- Pines de RF, cristales, alimentación, USB, audio analógico, GPADC, arranque y depuración.
- Interfaces de pantalla de alta velocidad, SDIO, almacenamiento y DCMI que requieren grupos de pines específicos.
- GPIO de activación, configuración de arranque, conmutación SWD y pines de prueba de producción.

#### 5.6.6. Directrices para GPIO { #566-gpio-guidelines }

- Configure las GPIO sin uso en un estado definido.
- Haga coincidir la tensión de E/S de los periféricos con el dominio de alimentación de E/S correspondiente.
- Incluya en el presupuesto de consumo las fugas durante la suspensión causadas por las resistencias pull-up de las GPIO.
- Si reutiliza un pin como entrada analógica, USB, audio o función especial, configure las rutas de entrada/salida digital según el manual de usuario.
- El enrutamiento flexible mediante la matriz no elimina las restricciones de diseño de alta velocidad. Respete los requisitos de los grupos de pines y de la PCB.

Cada GPIO puede acceder a las funciones 0-15 mediante la tabla IO MUX siguiente. La columna Función 16-255 de la tabla IO MUX remite al enrutamiento por matriz; la tabla de matriz que sigue enumera los índices de función 16-175. Use ambas tablas para confirmar a qué pin físico puede asignarse una determinada señal periférica antes de cerrar el esquemático.

<div align="center"><em>Tabla 5.6-4: Tabla IO MUX</em></div>

<div align="center" markdown>

| PAD | PUPD | Función 0 | Función 1 | Función 2 | Función 3 | Función 4 | Función 5 | Función 6 | Función 15 | Función 16-255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | Tabla de matriz |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | Tabla de matriz |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | Tabla de matriz |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | Tabla de matriz |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | Tabla de matriz |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | Tabla de matriz |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | Tabla de matriz |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | Tabla de matriz |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | Tabla de matriz |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | Tabla de matriz |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | Tabla de matriz |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | Tabla de matriz |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | Tabla de matriz |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | Tabla de matriz |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | Tabla de matriz |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | Tabla de matriz |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | Tabla de matriz |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | Tabla de matriz |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | Tabla de matriz |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | Tabla de matriz |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | Tabla de matriz |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | Tabla de matriz |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | Tabla de matriz |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | Tabla de matriz |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabla de matriz |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | Tabla de matriz |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabla de matriz |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Tabla de matriz |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | Tabla de matriz |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | Tabla de matriz |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | Tabla de matriz |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | Tabla de matriz |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | Tabla de matriz |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | Tabla de matriz |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | Tabla de matriz |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | Tabla de matriz |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | Tabla de matriz |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | Tabla de matriz |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | Tabla de matriz |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | Tabla de matriz |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | Tabla de matriz |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | Tabla de matriz |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | Tabla de matriz |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | Tabla de matriz |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | Tabla de matriz |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | Tabla de matriz |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | Tabla de matriz |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | Tabla de matriz |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | Tabla de matriz |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | Tabla de matriz |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | Tabla de matriz |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | Tabla de matriz |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | Tabla de matriz |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | Tabla de matriz |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | Tabla de matriz |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | Tabla de matriz |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | Tabla de matriz |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | Tabla de matriz |

</div>

La negrita indica la función del pin tras el reinicio. `PUPD` señala el tipo de resistencia interna tras el reinicio (`PU`: pull-up, `PD`: pull-down, `-`: ninguna). `#` identifica una función analógica.

!!! note
    - Las funciones analógicas solo se pueden seleccionar mediante las funciones 0 a 15 de la tabla IO MUX anterior.
    - Solo `PA11` a `PA17` y `SB01` a `SB09` admiten la interfaz MPI.
    - En Sleep, DeepSleep y Standby, solo `PA24` a `PA27` pueden emitir señales; estos pines pueden generar la PWM de LPTIM2 hasta 16 kHz.
    - `PA18` y `PA19` son los pines de depuración dedicados y admiten `DBG-UART` y `SWD`.
    - `PA43` y `PA44` son pines de depuración de respaldo y solo admiten `SWD`.
    - `PA00` y `PA01` configuran el modo de descarga del dispositivo y la selección de la ubicación de los pines `SWD`; consulte la sección 5.7.1.
    - Las interrupciones externas de hardware para despertar están limitadas a las diez GPIO `PA33` a `PA42`.

<div align="center"><em>Tabla 5.6-5: Tabla de matriz (índices de función 16-175)</em></div>

<div align="center" markdown>

| Módulo | Ancho de bits | Índice | Subíndice | Función |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA` (en orden de índice). |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO` (en orden de índice). |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS` (en orden de índice). |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD` (en orden de índice). |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX` (en orden de índice). |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR` (en orden de índice). |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR` (en orden de índice). |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2` (en orden de índice). |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5` (en orden de índice). |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK` (en orden de índice). |
| PTM | 16 | 105-120 | 89-104 | Desde `PTM1_CH0` hasta `PTM1_CH15` (en orden de índice). |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0` a `LCDC_IF29` (en orden de índice). Consulte la tabla 5.6-6 para ver la asignación secundaria de cada modo de interfaz. |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2` (en orden de índice). |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, desde `DCMI_DI0` hasta `DCMI_DI15` (en orden de índice). |

</div>

Se puede asignar cualquier GPIO a cualquiera de las funciones anteriores mediante la matriz, siempre que se respeten las restricciones de enrutamiento y diseño indicadas en esta guía. Las columnas de índice y subíndice contienen los valores exactos de los campos de registro que se usan para configurar el enrutador de matriz en el firmware.

<div align="center"><em>Tabla 5.6-6: Tabla Sub-MUX de la matriz LCDC</em></div>

<div align="center" markdown>

| Señal de matriz | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
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

!!! warning "Valores de IF_SEL en la tabla del submultiplexor LCDC"
    La tabla original de SiFli asigna `IF_SEL=0` tanto al modo SPI como al JDI. Este artículo conserva los valores de la fuente, pero la asignación duplicada es ambigua. Antes de configurar una pantalla, verifique el valor en el controlador SDK y el diseño de referencia correspondientes; no deduzca el registro únicamente a partir de esta tabla.

#### 5.6.7. Interfaces generales { #567-general-interfaces }

Revise todas las interfaces de propósito general con los mismos criterios: conexión eléctrica, tensión de E/S, estado predeterminado durante el reinicio y la suspensión, alimentación de las resistencias pull-up, exposición a ESD y posibles conflictos con funciones de arranque, depuración, activación o alta velocidad.

`PA34` admite la tecla de encendido y el reinicio por pulsación prolongada. El reinicio es activo en nivel alto: coloque una resistencia pull-down de 10 kΩ en la placa; al pulsar la tecla, el pin sube a nivel alto y una pulsación de 10 segundos provoca un reinicio por hardware. El circuito de referencia de teclas por escalera resistiva GPADC emplea resistencias de 1,1 kΩ, 2,8 kΩ y 5,1 kΩ. Las etiquetas de los nodos indican, respectivamente, 2,97 V/1,62 V, 2,58 V/1,41 V y 2,19 V/1,19 V. El nodo `PA34` también lleva un pull-down de 10 kΩ y un condensador de 100 nF a tierra. Añada protección ESD cerca de cada tecla expuesta.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="Circuito de referencia de tecla de encendido PA34 y tecla GPADC con escalera resistiva" /></div>
<div align="center"><em>Figura 5.6-2: Circuito de referencia de tecla de encendido PA34 y tecla GPADC</em></div>

!!! warning "Etiquetas de tensión de las teclas GPADC"
    El esquemático de SiFli muestra dos valores de tensión separados por una barra para cada nodo de tecla, pero no explica las condiciones de cada valor. Confirme su correspondencia con la alimentación prevista y el diseño de referencia antes de utilizarlos como umbrales.

#### 5.6.8. Criterios de revisión de interfaces { #568-interface-review-principles }

Revise estos cuatro aspectos para cada interfaz periférica:

1. La conexión eléctrica: cruce de señales, resistencias pull-up/pull-down, protección ESD y terminación.
2. La compatibilidad entre dominios de tensión de E/S, incluido el riesgo de alimentación inversa cuando el periférico está apagado.
3. Los estados predeterminados seguros durante el reinicio y la suspensión.
4. Los conflictos con funciones multiplexadas de arranque, descarga, SWD, USB, activación o pantalla de alta velocidad.

#### 5.6.9. UART { #569-uart }

- SF32LB57x integra tres UART dúplex completos, con velocidades de hasta 6 Mbps y formatos de datos configurables. Las señales pueden usar pines de las funciones 0 a 15 o enrutarse por matriz a cualquier GPIO.
- Conecte el RXD de la MCU al TXD del periférico y el TXD de la MCU al RXD del periférico.
- Haga coincidir la tensión de E/S del periférico con el dominio de E/S de la MCU.
- Revise el comportamiento durante el reinicio de los pines UART multiplexados con funciones USB, arranque, descarga o depuración.
- `PA18` y `PA19` son los pines DBG-UART predeterminados. Para interfaces UART de prueba que se conectan y desconectan con frecuencia, la fuente recomienda `PA18`, `PA19`, `PA43` o `PA44`; este grupo GPIO admite hasta 5,5 V. En cables de prueba largos, añada una resistencia serie de 100 Ω para limitar el sobreimpulso.

#### 5.6.10. I2C { #5610-i2c }

- SDA y SCL requieren resistencias pull-up.
- SF32LB57x integra cuatro interfaces I2C, cada una con modos de host y dispositivo, y enrutables por matriz a cualquier GPIO.
- La fuente recomienda 4,7 kΩ para el modo estándar (100 kHz), de 2,2 kΩ a 3,3 kΩ para el modo rápido (400 kHz) y de 1 kΩ a 2,2 kΩ para el modo rápido plus (1 MHz). Para 400 kHz, 2,2 kΩ es un punto de partida; ajústelo según la capacitancia del bus.
- En un bus I2C compartido basta con un conjunto de pull-ups cerca del host; no añada un conjunto distinto en cada dispositivo. Alimente los pull-ups desde el raíl del periférico para que se desconecten con él y no causen fugas durante la suspensión.
- Asegúrese de que cada dispositivo del mismo bus tenga una dirección única.

#### 5.6.11. SPI { #5611-spi }

- SF32LB57x integra dos interfaces SPI con modos de host y dispositivo; pueden usar pines de las funciones 0 a 15 o enrutarse por matriz.
- Conecte el SDO de la MCU al SDI del periférico y el SDI de la MCU al SDO del periférico.
- Ajuste CLK, CS, modo, fase, polaridad y frecuencia máxima según la hoja de datos del periférico.
- Mantenga cortas las pistas SPI de alta velocidad y dispóngalas sobre un plano de referencia de tierra continuo. Añada resistencias serie de amortiguamiento si las pruebas de integridad de señal lo requieren.
- SPI por debajo de 30 MHz puede enrutarse mediante la matriz a cualquier GPIO; por encima de 30 MHz, dé preferencia a los pines dedicados de las funciones 0 a 15.
- Para SPI de alta velocidad, coloque una resistencia serie de 22 a 27 Ω cerca del controlador y reserve una huella sin montar para un condensador en derivación en la línea de reloj, a fin de ajustar la integridad de señal.

#### 5.6.12. SDIO { #5612-sdio }

- SF32LB57x integra dos controladores host SD/MMC; solo funcionan como host y admiten tarjetas SD, periféricos SDIO y eMMC. Las señales SDIO están fijadas a las GPIO definidas por el multiplexor de pines.
- Enrute las señales SDIO como un grupo.
- Siempre que sea posible, limite la longitud total a unos 50 mm y la diferencia de longitud entre las señales del grupo a unos 6 mm.
- Mantenga las pistas CLK, CMD y DATA sobre un plano de referencia de tierra continuo.
- Compruebe las resistencias pull-up, el control de alimentación y los dominios de tensión de SDIO/eMMC/SD NAND.
- A 24 MHz, las resistencias pull-up internas de GPIO pueden bastar para CMD y Data0 a Data3; a partir de 48 MHz, añada resistencias pull-up externas de 10 kΩ en CMD y Data0 a Data3.
- Añada resistencias serie de 27 a 33 Ω en las señales SDIO y reserve una huella sin montar para un condensador en derivación en la línea de reloj.
- En un zócalo TF externo, conecte DET a 3,3 V mediante un pull-up de 10 kΩ y configure el pin de la MCU como entrada con pull-up interno. Añada protección ESD a las señales SDIO y a la alimentación.

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>Tabla 5.6-7: Asignación de pines USB</em></div>

<div align="center" markdown>

| Señal USB | Pin GPIO |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- Enrute USB DP/DN como un par diferencial de 90 Ω.
- USB DP/DM suele usar las funciones multiplexadas de `PA35`/`PA36`. Al habilitar USB, compruebe que los circuitos externos no fuercen niveles inseguros durante el reinicio.
- Coloque la protección ESD cerca del conector y haga pasar las señales por ella antes de llegar al chip.
- Evite derivaciones y mantenga el ajuste entre señales del par y la continuidad del plano de referencia de tierra.
- Si se requiere activar el sistema al conectar USB durante la suspensión, conecte un divisor de VBUS a una GPIO compatible con la activación. Se recomienda compartir esa GPIO con la detección de inserción del cargador.
- `PA35` está asignado de forma fija a `USB_DP` y `PA36` a `USB_DM`; estas funciones no se pueden reasignar. USB 2.0 FS admite hasta 12 Mbps.
- Reserve resistencias serie de 22 o 33 Ω cerca del chip en DP/DM, además de huellas sin montar para condensadores en derivación que permitan ajustar la integridad de señal.
- USB utiliza señalización de extremo único (single-ended) de 3,3 V. El chip integra una resistencia de identificación y el software puede habilitar un pull-up de 1,5 kΩ en DP o DM para identificar dispositivos Full-Speed o Low-Speed. Al habilitar USB, configure `PA35` y `PA36` como entradas de alta impedancia para evitar conflictos del multiplexor.

#### 5.6.14. CAN { #5614-can }

- SF32LB57x integra dos interfaces CAN compatibles con CAN 2.0B, enrutables por matriz a cualquier GPIO.
- Haga coincidir la alimentación y la tensión de E/S del transceptor CAN con las de la MCU.
- Añada terminación, un choque de modo común y protección ESD según los requisitos del sistema.
- En entornos industriales o de automoción, evalúe las sobretensiones, EFT, ESD y las diferencias de potencial de tierra.

#### 5.6.15. GPADC { #5615-gpadc }

- Mantenga la tensión de entrada de GPADC dentro del rango nominal de 0 a 3,3 V.
- Solo `PA28` a `PA38` (11 pines) admiten GPADC mediante el multiplexor de pines; no asigne esta función a otros pines.
- Use resistencias del 1 % en las mediciones mediante divisor.
- Coloque un condensador de filtrado de 100 nF (0,1 µF) cerca del pin del chip en cada entrada GPADC.
- Mantenga las pistas GPADC alejadas de DC/DC, RF, USB, SDIO, relojes de pantalla y bucles de carga.

<div align="center"><em>Tabla 5.6-8: Asignación de pines GPADC</em></div>

<div align="center" markdown>

| Pin | Función GPADC |
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
| `VBAT` / `VBATS` | `GPADC_CH11`; pertenece al dominio de tensión de batería y tiene un rango de medida distinto al de los pines GPADC normales. |

</div>

!!! warning "Tensión del pin VBATS y rango de medida"
    Para las variantes alimentadas con 3,3 V, la tabla de pines de alimentación indica de 0 V a 4,7 V para `VBATS`, mientras que la lista de comprobación del esquemático limita la detección de tensión de batería a 0 V–4,5 V. Para las medidas con GPADC, respete el rango más estrecho de 0 V a 4,5 V; no considere el límite de 4,7 V de la tabla como rango válido de medida del ADC.

### 5.7. Fabricación { #57-manufacturing }

#### 5.7.1. Modos de arranque y descarga en producción { #571-production-boot-and-download-modes }

Mantenga accesibles para el utillaje de producción los pines predeterminados de depuración y descarga, y reserve las señales de control de arranque antes de asignar las E/S del producto. La lista de comprobación de origen exige puntos de prueba soldables en `PA43` / `PA44` y especifica pull-up y punto de prueba en `PA00`; la resistencia y el punto de prueba de `PA01` son opcionales.

<div align="center"><em>Tabla 5.7-1: Requisitos de puntos de prueba de depuración y control de arranque</em></div>

<div align="center" markdown>

| Señal | Pin | Requisito de producción |
|:------|:----|:------------------------|
| `DBG_UART_RXD` | `PA18` | Reservar el pin predeterminado de recepción de DBG-UART; proporcionar acceso al utillaje. |
| `DBG_UART_TXD` | `PA19` | Reservar el pin predeterminado de transmisión de DBG-UART; proporcionar acceso al utillaje. |
| `SWD_CLK` | `PA43` | Proporcionar un punto de prueba soldable. |
| `SWD_DIO` | `PA44` | Proporcionar un punto de prueba soldable. |
| Selección del modo de arranque | `PA00` | Proporcionar un pull-up y un punto de prueba. |
| Selección de ubicación de SWD | `PA01` | La resistencia y el punto de prueba son opcionales. |

</div>

<div align="center"><em>Tabla 5.7-2: Modos de arranque e interfaces de descarga</em></div>

<div align="center" markdown>

| `PA00` / registro de arranque | `PA01` | Interruptor de arranque del host | Rama de arranque e interfaces disponibles |
|:-----------------------|:-------|:-----------------|:------------------------------------------|
| L | H | Cualquiera | Arranque normal; `PA19` no emite registros de arranque; `PA18`/`PA19` pasan a SWD y SWD en `PA43`/`PA44` queda deshabilitado. |
| L | L | Desactivado | Arranque normal; `PA19` emite registros de arranque; `PA18`/`PA19` son DBG-UART y `PA43`/`PA44` son SWD. |
| L | L | Activado | Modo de arranque; admite grabación mediante DBG-UART, SWD, UART y USB. |
| `PA00` o registro de arranque = 1 | L | Cualquiera | Modo de arranque; admite grabación mediante DBG-UART, SWD, UART y USB. |
| `PA00` o registro de arranque = 1 | H | Cualquiera | Modo de arranque; `PA19` no emite registros de arranque; admite grabación SWD/USB y `PA18`/`PA19` pasan a SWD. |

</div>

!!! warning "Nombre de UART de depuración en la fuente"
    La sección 2.10 enumera dos veces `DB_UART_RXD` (sin la `G`). La tabla de pines de depuración y la lista de comprobación identifican `PA18` como `DBG_UART_RXD` y `PA19` como `DBG_UART_TXD`. Confirme los nombres de señal con el responsable del utillaje antes de liberar el producto; no reserve RXD dos veces.

<div align="center"><em>Tabla 5.7-3: Listas de puntos de prueba de producción en la fuente</em></div>

<div align="center" markdown>

| Lista de la fuente | Alcance indicado | Puntos de prueba enumerados |
|:------------------|:-----------------|:----------------------------|
| Sección 2.10, lista de grabación y calibración del cristal | No indicado | `VBAT`, `PVDD`, `GND`, `AVDD33`, `PA00`, `PA01` y `DB_UART_RXD` dos veces. |
| Lista de comprobación de hardware 4.8, elemento 1 | Variantes alimentadas por batería | `VBAT` o 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (ausente en variantes de 3,3 V) y `PA34`. |
| Lista de comprobación de hardware 4.8, elemento 3 | Todos los modelos | `VBAT` o 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` (ausente en la serie de 3,3 V), `PA00`, `PA01` y `PA34`; ajuste el tamaño, la separación y la orientación de las pads a las sondas del utillaje. |

</div>

#### 5.7.2. Grabación y calibración de producción { #572-production-programming-and-calibration }

La fuente indica que se debe utilizar un grabador sin conexión para grabar la Flash y calibrar el cristal. En esta sección no especifica calibración RF ni pruebas de corriente de alimentación. Al diseñar los pads de producción, siga los requisitos de la fuente sobre el tamaño, la separación y la orientación de las sondas, y confirme con el responsable del utillaje las diferencias entre las listas de puntos de prueba de la tabla 5.7-3.

Consulte la [documentación del grabador sin conexión de SiFli](https://wiki.sifli.com/tools/index.html).
