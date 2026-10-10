---
icon: lucide/list-checks
description: "Lista de comprobación para revisar los esquemas del MCU SF32LB58x, incluidos alimentación, reloj, RF, almacenamiento, pantalla y fabricación."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
hide:
    - navigation
---

# Guía de diseño de hardware SF32LB58x — Lista de comprobación del esquemático { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "Parte de la guía de diseño de hardware SF32LB58x"
    Esta página cubre la lista de comprobación detallada del esquemático de la sección 5.8. Vuelva a las [Directrices de diseño esquemático](SF32LB58x_schematic_design.md).

## 5.8. Lista de comprobación del esquema { #58-schematic-checklist }

Cada tabla corresponde a un bloque funcional del esquemático. Determine cuándo se aplica cada punto según las condiciones que indique: revise los puntos obligatorios cuando se cumplan esas condiciones y los opcionales cuando se utilice la función o la opción de diseño correspondiente.

### 5.8.1. Encapsulado { #581-package }

<div align="center"><em>Tabla 5.8.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | El encapsulado del número de pieza seleccionado es correcto, incluidos los nombres y números de los pines | Obligatorio |

</div>

### 5.8.2. Alimentación { #582-power-supply }

<div align="center"><em>Tabla 5.8.2-1: Lista de comprobación de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La tensión de alimentación de PVDD1 es de 1,8 V-3,3 V | Obligatorio |
| 2 | La tensión de alimentación de PVDD2 es de 1,8 V-3,3 V | Obligatorio |
| 3 | Las conexiones de BUCK1_LX y BUCK1_FB son correctas | Obligatorio |
| 4 | Las conexiones de BUCK2_LX y BUCK2_FB son correctas | Obligatorio |
| 5 | La salida LDO_VOUT1 tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Obligatorio |
| 6 | La salida VDD_RET tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Obligatorio |
| 7 | La salida VDD_RTC tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Obligatorio |
| 8 | La tensión de alimentación de VDDIOA es de 1,8 V-3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | Obligatorio |
| 9 | La tensión de alimentación de VDDIOA2 es de 1,8 V-3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | Obligatorio |
| 10 | La tensión de alimentación de VDDIOB es de 1,8 V-3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | Obligatorio |
| 11 | La tensión de alimentación de VDDIOSA es de 1,8 V e incluye un interruptor de carga para poder desconectarla | Obligatorio |
| 12 | La tensión de alimentación de VDDIOSB es de 1,8 V e incluye un interruptor de carga para poder desconectarla | Obligatorio |
| 13 | La tensión de alimentación de VDDIOSC es de 1,8 V y debe permanecer siempre activa | Obligatorio |
| 14 | La tensión de alimentación de AVDD33_USB es de 3,3 V | Obligatorio |
| 15 | La tensión de alimentación de AVDD33_ANA es de 3,3 V | Obligatorio |
| 16 | La tensión de alimentación de AVDD_BRF es de 1,8 V-3,3 V y debe coincidir con la de VDD1 | Obligatorio |
| 17 | La tensión de alimentación de AVDD33_AUD es de 3,3 V | Obligatorio |
| 18 | La tensión de alimentación de AVDD18_DSI es de 1,8 V | Obligatorio |
| 19 | Cuando SF30147C suministre alimentación, la interfaz de control TWI debe usar pines PB del MCU y estos deben ser pines PD | Obligatorio |
| 20 | El circuito de carga debe incluir gestión de la ruta de alimentación para que el sistema pueda alimentarse desde la entrada de 5 V del cargador cuando la tensión de la batería sea demasiado baja | Obligatorio |
| 21 | Cuando SF30147C suministre alimentación, utilice la interfaz TWI de control dedicada del chip | Obligatorio |
| 22 | Cuando SF30147C suministre alimentación, los raíles controlados mediante EN deben usar PVDD o AVDD como dominio de alimentación de la señal EN; no controle EN desde una GPIO del MCU. Como alternativa, conecte EN a tierra y controle mediante registros la salida del raíl correspondiente | Obligatorio |
| 23 | Cuando SF30147C suministre alimentación, <span class="flag-red">BUCK y LDO1</span> solo se pueden controlar mediante sus señales de habilitación respectivas, EN_BUCK y EN_LDO1; no se ofrece control interno por registros | Obligatorio |
| 24 | En 58x, las alimentaciones PVDD y VDDIOB deben coincidir. Si PVDD es inferior a VDDIOB, por ejemplo VDDIOB = 3,3 V y PVDD = 1,8 V, VDDIOB presenta una fuga de aproximadamente 15 µA en Standby y Hibernate | Obligatorio |
| 25 | En 58x, el pin B4 es VDD_EXT1 y el pin B5 es VDD_EXT2; se pueden dejar sin conectar en el diseño | Obligatorio |

</div>

!!! note "Aclaración sobre la fuente"
    El punto 19 de la lista de comprobación de alimentación de la hoja de cálculo indica que la interfaz de control TWI debe usar pines PB del MCU y que esos pines deben ser «PD». El punto 21 pide, por separado, utilizar la interfaz TWI dedicada del chip. La hoja no define «PD» ni explica cómo se relacionan ambos requisitos. La nota de aplicación de hardware de OpenSiFli indica que el SF32LB58x emula las señales TWI con dos GPIO para controlar el SF30147C. Antes de cerrar el esquemático, confirme con SiFli qué interfaz y qué pines deben utilizarse.

### 5.8.3. Condensadores e inductores de alimentación { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabla 5.8.3-1: Lista de comprobación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | El condensador principal de PVDD1 es de al menos 10 µF | Obligatorio |
| 2 | El condensador de PVDD2 es de al menos 10 µF | Obligatorio |
| 3 | El condensador de BUCK1_FB es de 4,7 µF | Obligatorio |
| 4 | El condensador de BUCK2_FB es de 4,7 µF | Obligatorio |
| 5 | El condensador de LDO_VOUT1 es de 4,7 µF | Obligatorio |
| 6 | El condensador de VDD_RET es de 0,47 µF | Obligatorio |
| 7 | El condensador de VDD_RTC es de 1 µF | Obligatorio |
| 8 | El condensador de VDDIOA es de al menos 1 µF | Obligatorio |
| 9 | El condensador de VDDIOA2 es de al menos 1 µF | Obligatorio |
| 10 | El condensador de VDDIOB es de al menos 1 µF | Obligatorio |
| 11 | El condensador de VDDIOSA es de al menos 1 µF | Obligatorio |
| 12 | El condensador de VDDIOSB es de al menos 1 µF | Obligatorio |
| 13 | El condensador de VDDIOSC es de al menos 1 µF | Obligatorio |
| 14 | El condensador de AVDD33_USB es de al menos 1 µF | Obligatorio |
| 15 | El condensador de AVDD33_ANA es de al menos 4,7 µF | Obligatorio |
| 16 | El condensador de AVDD_BRF es de al menos 4,7 µF | Obligatorio |
| 17 | El condensador de AVDD33_AUD es de al menos 4,7 µF | Obligatorio |
| 18 | El condensador de AUD_VREF es de 1 µF | Obligatorio |
| 19 | El condensador de AVDD18_DSI es de al menos 4,7 µF | Obligatorio |
| 20 | El condensador de MIC_BIAS es de 1 µF | Obligatorio |
| 21 | El condensador de GPADC VREFP es de 4,7 µF | Obligatorio |
| 22 | <span class="flag-red">PVDD1, PVDD2, AVDD_BRF y la alimentación pull-up de RSTN deben proceder de la misma fuente</span> | Obligatorio |
| 23 | Las referencias de los inductores BUCK1 y BUCK2 son las recomendadas por SiFli | Obligatorio |
| 24 | Si la referencia del inductor BUCK no es una de las recomendadas por SiFli, cumple L = 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 450 mA | Obligatorio |
| 25 | <span class="flag-red">Si PVDD1 y PVDD2 reciben 1,8 V desde VBAT, use un convertidor DCDC para generar 1,8 V; no use un LDO</span> | Obligatorio |
| 26 | <span class="flag-red">Registre la corriente quiescente del DCDC seleccionado y confirme que cumple los requisitos del proyecto</span> | Obligatorio |
| 27 | <span class="flag-red">Registre la corriente quiescente del LDO seleccionado y confirme que cumple los requisitos del proyecto</span> | Obligatorio |

</div>

!!! note "Discrepancia en la corriente de saturación del inductor BUCK"
    El punto 24 de la lista de comprobación de condensadores e inductores de alimentación del libro especifica Isat ≥ 450 mA para un inductor que no figure en la AVL. La nota de aplicación de hardware de OpenSiFli especifica Isat ≥ 500 mA para un inductor BUCK con L = 4,7 µH y DCR ≤ 0,4 Ω. La tabla conserva el valor de 450 mA del libro; la [guía de selección de inductores BUCK del diseño esquemático](SF32LB58x_schematic_design.md#5114-buck-inductor-selection) aplica 500 mA. Hasta que SiFli aclare la discrepancia, utilice un inductor con Isat de al menos 500 mA.

### 5.8.4. Reloj { #584-clock }

<div align="center"><em>Tabla 5.8.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | El cristal principal de 48 MHz figura en la AVL | Obligatorio |
| 2 | Si el cristal de 48 MHz no figura en la AVL, cumple 7 pF ≤ CL ≤ 12 pF (se recomiendan 8,8 pF), tolerancia de frecuencia ≤±10 ppm y ESR ≤30 Ω (se recomiendan 22 Ω) | Obligatorio |
| 3 | El cristal RTC de 32,768 kHz figura en la AVL | Obligatorio |
| 4 | Si el cristal de 32,768 kHz no figura en la AVL, cumple CL ≤12,5 pF (se recomiendan 7 pF), tolerancia de frecuencia ≤±20 ppm y ESR ≤80 kΩ (se recomiendan 38 kΩ) | Obligatorio |

</div>

### 5.8.5. Restablecimiento { #585-reset }

<div align="center"><em>Tabla 5.8.5-1: Lista de comprobación del restablecimiento</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | RSTN tiene pull-up a la misma alimentación que PVDD1 | Obligatorio |
| 2 | Reserve un condensador de 0,1 µF entre RSTN y tierra | Obligatorio |
| 3 | RSTN tiene protección ESD | Obligatorio |

</div>

### 5.8.6. Señales de tierra { #586-ground-signals }

<div align="center"><em>Tabla 5.8.6-1: Lista de comprobación de señales de tierra</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Todas las señales AVSS_*** están conectadas a GND | Obligatorio |
| 2 | Todas las señales VSS están conectadas a GND | Obligatorio |

</div>

### 5.8.7. Modo de arranque { #587-boot-mode }

<div align="center"><em>Tabla 5.8.7-1: Lista de comprobación del modo de arranque</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | MODE tiene un pull-down interno; reserve un pull-up de 10 kΩ a VDDIOA y ponga MODE a nivel alto durante la descarga del programa | Obligatorio |
| 2 | <span class="flag-red">La señal MODE tiene un punto de prueba reservado y debe llevarse hasta el útil de programación de producción</span> | Obligatorio |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabla 5.8.8-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Anote en la señal ANT el requisito de impedancia característica single-ended de 50 Ω | Obligatorio |
| 2 | Reserve una red de adaptación tipo pi en ANT: un condensador paralelo NC (sin montar) y un condensador en serie de 15 pF | Obligatorio |
| 3 | Si se requiere filtrado de emisiones espurias, reserve una red de adaptación tipo pi con un inductor en serie de 2,7 nH y un condensador paralelo de 2 pF | Opcional |
| 4 | Si un PA RF externo requiere que el MCU controle RXEN y TXEN, use exclusivamente PB39 para PA RXEN y PB40 para PA TXEN | Opcional |
| 5 | <span class="flag-red">Si el chip Wi-Fi admite arbitraje de coexistencia de antena:<br>(1) Se recomienda el modo de 3 hilos: el chip Wi-Fi controla el conmutador RF de la antena Bluetooth/Wi-Fi y realiza el arbitraje. Emplea BT_ACTIVE y BT_PRIORITY de Bluetooth para decidir si concede el uso de la antena a Bluetooth; WLAN_ACTIVE puede deshabilitar la transmisión/recepción Bluetooth durante la actividad Wi-Fi.<br>(2) BT_ACTIVE debe usar PB08 o PB45; WLAN_ACTIVE, PB09 o PB41; BT_PRIORITY puede usar cualquier GPIO PB.</span> | Opcional |
| 6 | Si el chip Wi-Fi no admite arbitraje de coexistencia de antena:<br>(1) Se recomienda el modo de 1 hilo: Bluetooth controla el conmutador RF de la antena Bluetooth/Wi-Fi, arbitra mediante BT_ACTIVE y notifica al chip Wi-Fi.<br>(2) Si Wi-Fi puede emitir una señal de estado operativo, este esquema se puede ampliar al modo de 2 hilos: conecte la salida Wi-Fi a WLAN_ACTIVE para que Bluetooth pueda bloquear transmisiones/recepciones Bluetooth de baja prioridad mientras Wi-Fi está activo, sin afectar Bluetooth cuando Wi-Fi está inactivo.<br>(3) BT_ACTIVE debe usar PB08 o PB45; WLAN_ACTIVE debe usar PB09 o PB41 | Opcional |

</div>

### 5.8.9. Asignación de recursos de E/S { #589-io-resource-allocation }

<div align="center"><em>Tabla 5.8.9-1: Lista de comprobación de la asignación de recursos de E/S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Se proporciona una tabla de asignación de recursos GPIO que coincide con el esquema | Obligatorio |
| 2 | La asignación GPIO de la tabla de recursos coincide con el esquema | Obligatorio |
| 3 | La asignación GPIO real sigue las recomendaciones de SiFli; consulte el archivo de configuración de E/S de la EVB | Obligatorio |

</div>

### 5.8.10. Activación por hardware { #5810-hardware-wake-up }

<div align="center"><em>Tabla 5.8.10-1: Lista de comprobación de activación por hardware</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | <span class="flag-red">Las fuentes de interrupción de activación de HCPU son correctas: PA64, PA65, PA66, PA67, PA68 y PA69, seis pines en total</span> | Obligatorio |
| 2 | <span class="flag-red">Las fuentes de interrupción de activación de LCPU son correctas: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2 y PBR3, diez pines en total. Después de que el MCU despierte, PBR0-PBR3 no pueden recibir señales de interrupción</span> | Obligatorio |
| 3 | <span class="flag-red">Las señales de interrupción y control de los periféricos de LCPU, como el sensor G y el sensor de frecuencia cardíaca, deben conectarse a GPIO PB</span> | Obligatorio |

</div>

### 5.8.11. Almacenamiento { #5811-storage }

<div align="center"><em>Tabla 5.8.11-1: Lista de comprobación del almacenamiento</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | MPI3 se conecta a memoria NOR o SPI NAND según lo previsto | Obligatorio |
| 2 | VDDIOSC permanece siempre alimentada | Obligatorio |
| 3 | PBR0 habilita las alimentaciones VDDIOSA y VDDIOSB | Obligatorio |
| 4 | MPI3 o MPI4 se pueden usar para memoria NOR o SPI NAND externa | Obligatorio |
| 5 | El pin HOLD# de la memoria SPI NAND tiene un pull-up de 10 kΩ a la alimentación de dicha memoria | Obligatorio |
| 6 | Si en producción hay que programar memoria Flash externa en MPI3 o MPI4, la herramienta de descarga pone PA43 a nivel alto para habilitar la alimentación de MPI3 | Obligatorio |
| 7 | Si en producción hay que programar eMMC o SD NAND en SDIO1, la herramienta de descarga habilita la alimentación correspondiente | Obligatorio |
| 8 | <span class="flag-red">Los interruptores de tensión controlados por PBR0/PA43 se activan en alto y se desactivan en bajo. En Hibernate, PBR0 controla VDDIOSA/VDDIOSB, VDDIOSC permanece siempre alimentada y PA43 controla la alimentación de la Flash externa</span> | Obligatorio |
| 9 | Si la interfaz SD1 se conecta a eMMC o SD NAND, las señales están conectadas correctamente | Obligatorio |
| 10 | El nivel de la interfaz de E/S de eMMC o SD NAND coincide con VDDIOA2 | Obligatorio |
| 11 | Las señales MPI3 o MPI4 están conectadas correctamente | Obligatorio |
| 12 | El nivel lógico de E/S del periférico coincide con el del chip principal | Obligatorio |
| 13 | <span class="flag-red">La memoria NOR está cualificada en la guía de selección de componentes clave</span> | Obligatorio |
| 14 | <span class="flag-red">La memoria SPI/SD NAND está cualificada en la guía de selección de componentes clave</span> | Obligatorio |
| 15 | <span class="flag-red">La memoria eMMC está cualificada en la guía de selección de componentes clave</span> | Obligatorio |

</div>

<div align="center"><em>Tabla 5.8.11-2: Conexiones de referencia MPI4 para SPI NAND en la EVB de SiFli</em></div>

<div align="center" markdown>

| Señal SPI NAND | Pin del SF32LB58x | Nota de referencia |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | Selección del chip, activa en nivel bajo |
| SO | PA04 (SD1_D1) | Datos de entrada al chip (IO1) |
| WP# | PA01 (SD1_D2) | Señal de protección contra escritura (IO2) |
| SI | PA05 (SD1_D0) | Datos de salida del chip (IO0) |
| SCLK | PA09 (SD1_CLK) | Reloj serie |
| HOLD# | PA06 (SD1_D3) | Línea IO3; pull-up a VDD18_MPI4 mediante una resistencia de 10 kΩ |

</div>

En el esquema de referencia de la EVB, VCC de la SPI NAND Flash se conecta a VDD18_MPI4; esta alimentación también lleva condensadores de 0,1 µF y 1 µF (6,3 V). Estas asignaciones de pines y valores de componentes corresponden únicamente a la referencia de la EVB. Antes de aplicarlos, compruébelos con el encapsulado del chip seleccionado, la hoja de datos de la Flash y la configuración de multiplexación de pines de la placa.

La alimentación de E/S de SD1, VDDIOA2, admite 1,8 V o 3,3 V y debe ajustarse al nivel de E/S del periférico. SiFli recomienda una interfaz de 1,8 V para SPI NAND Flash y eMMC. Los dispositivos SD NAND solo admiten 3,3 V; por tanto, al utilizar SD NAND, VDDIOA2 debe configurarse a 3,3 V.

### 5.8.12. Pantalla { #5812-display }

<div align="center"><em>Tabla 5.8.12-1: Lista de comprobación de la pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La pantalla de SF32LB58x se conecta según lo previsto mediante DSI + LCDC2 | Obligatorio |
| 2 | Las señales DSI están conectadas correctamente | Obligatorio |
| 3 | <span class="flag-red">Si la LCD utiliza únicamente QSPI, se recomienda la interfaz QSPI LCDC1 de HCPU para evitar problemas de frecuencia de cuadro y RAM</span> | Obligatorio |
| 4 | DSI_REXT se conecta a GND mediante una resistencia de 10 kΩ | Obligatorio |
| 5 | La señal RSTB de LCDC está conectada correctamente | Obligatorio |
| 6 | La señal TE de LCDC está conectada correctamente (a la señal TE o Fmark del panel) | Obligatorio |
| 7 | Las señales TP siguen la asignación de pines recomendada (consulte el archivo de configuración de E/S de la EVB) | Obligatorio |
| 8 | La interfaz LCD admite MIPI-DSI, SPI de 3/4 hilos, SPI de datos duales/cuádruples, DBI 8080, DPI e interfaces JDI paralelas/serie | Obligatorio |
| 9 | <span class="flag-red">LCD SPI, modo de 3 hilos: CS a PA44 o PB08, CLK a PA46 o PB10, DATA a PA50 o PB09.<br>Modo de 4 hilos: CS a PA44 o PB08, CLK a PA46 o PB10, DATA a PA50 o PB09 y DC a PA48 o PB03</span> | Obligatorio |
| 10 | Confirme si la LCD debe admitir AOD; si es así, un panel QSPI debe conectarse a HCPU, mientras que un panel JDI puede conectarse a LCPU | Obligatorio |
| 11 | El nivel lógico de E/S del periférico coincide con el del chip principal | Obligatorio |
| 12 | En las LCD DSI, conecte las señales de datos y reloj DSI. Los paneles en modo de vídeo DSI se comportan como paneles RGB y no tienen señal TE; los paneles en modo de comandos DSI sí tienen TE, y DSI17801 requiere TE. Se recomiendan tanto TE como RST; el uso final depende de la LCD seleccionada | Obligatorio |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabla 5.8.13-1: Lista de comprobación de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La entrada GPADC está conectada al pin correspondiente | Opcional |
| 2 | El rango de entrada GPADC es correcto; la tensión máxima de entrada no debe superar AVDD33_ANA | Opcional |
| 3 | Divisor de tensión de batería recomendado: resistencia de 470 kΩ y 1 % en el lado de alimentación, resistencia de 1 MΩ y 1 % a tierra y condensador de filtro de 100 nF | Obligatorio |
| 4 | <span class="flag-red">Para cada señal con divisor resistivo medida por GPADC, use resistencias divisoras con tolerancia del 1 %; cada canal GPADC debe tener un condensador de filtro de 100 nF colocado cerca del pin del chip</span> | Obligatorio |
| 5 | <span class="flag-red">El ADC puede detectar varios botones y ahorrar pines; por ejemplo, si PB32 se usa como botón ADC, no use la batería como alimentación pull-up</span> | Obligatorio |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabla 5.8.14-1: Lista de comprobación de SDMADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La entrada SDMADC está conectada al pin correspondiente | Opcional |
| 2 | El rango de entrada SDMADC es correcto; se recomienda que la tensión máxima de entrada no supere AVDD33_ANA | Opcional |
| 3 | Las conexiones SDMADC_VREF y SDMADC_VSS_VREF son correctas | Obligatorio |

</div>

### 5.8.15. Botones { #5815-buttons }

<div align="center"><em>Tabla 5.8.15-1: Lista de comprobación de botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Confirme con el cliente si el botón requiere capacidad de activación | Obligatorio |
| 2 | La conexión de los botones normales es correcta (pull-up presente, valor de resistencia correcto y dominio de tensión del pull-up adecuado) | Obligatorio |
| 3 | <span class="flag-red">El botón de encendido debe usar PB54 y ser activo en alto. Una pulsación de 10 segundos provoca el reinicio; la resistencia pull-down de 10 kΩ debe estar en la placa principal</span> | Obligatorio |
| 4 | Todas las señales de los botones tienen protección ESD | Obligatorio |

</div>

### 5.8.16. Protección EOS y ESD { #5816-eos-and-esd-protection }

<div align="center"><em>Tabla 5.8.16-1: Lista de comprobación de protección EOS y ESD</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La interfaz de carga incluye protección EOS, ESD y OVP | Obligatorio |
| 2 | La señal de detección de conexión del cargador tiene un dispositivo de protección ESD | Obligatorio |
| 3 | La interfaz de batería tiene un dispositivo de protección ESD | Obligatorio |
| 4 | La interfaz de antena tiene un dispositivo de protección ESD | Obligatorio |
| 5 | Las interfaces de alimentación de la LCD y del TP tienen dispositivos de protección ESD | Obligatorio |
| 6 | Las líneas I2C, RST e INT del TP tienen dispositivos de protección ESD | Obligatorio |
| 7 | La interfaz de alimentación y las líneas de señal del sensor de frecuencia cardíaca tienen dispositivos de protección ESD | Obligatorio |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabla 5.8.17-1: Lista de comprobación de I2C</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La asignación de I2C tiene en cuenta la distribución entre HCPU y LCPU y si el dispositivo debe funcionar en modo de bajo consumo | Obligatorio |
| 2 | Los pull-ups de I2C tienen el valor de resistencia adecuado; para funcionar a 400 kHz se recomiendan pull-ups de 2,2 kΩ. Use el dominio de tensión del periférico y desconecta la alimentación de los pull-ups junto con el periférico durante el apagado | Obligatorio |
| 3 | Cuando sea necesario, la señal de interrupción de I2C permite la activación por hardware | Obligatorio |
| 4 | Si varios dispositivos comparten un bus I2C, sus direcciones son distintas | Obligatorio |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabla 5.8.18-1: Lista de comprobación de I2S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 solo admite entrada y funciona únicamente en modo maestro; el micrófono está conectado a I2S1 según lo previsto</span> | Opcional |
| 2 | <span class="flag-red">I2S2 admite entrada y salida únicamente en modo maestro y puede conectarse a dispositivos DAC/ADC de un códec externo</span> | Opcional |
| 3 | <span class="flag-red">I2S3 admite entrada y salida únicamente en modo maestro; es adecuado para casos de bajo consumo en los que HCPU duerme y LCPU recibe/procesa audio mediante I2S3</span> | Opcional |
| 4 | Las señales I2S están conectadas correctamente | Opcional |
| 5 | <span class="flag-red">La conexión del micrófono digital a la interfaz I2S1 es correcta</span> | Opcional |
| 6 | El nivel lógico de E/S del periférico coincide con el del chip principal | Opcional |

</div>

### 5.8.19. PDM y audio analógico { #5819-pdm-and-analog-audio }

<div align="center"><em>Tabla 5.8.19-1: Lista de comprobación de PDM y audio analógico</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La conexión de los dos micrófonos PDM es correcta | Opcional |
| 2 | El micrófono PDM se alimenta desde una fuente digital | Opcional |
| 3 | El nivel lógico de E/S del periférico coincide con el del chip principal | Opcional |
| 4 | La conexión de los dos micrófonos analógicos es correcta | Opcional |
| 5 | El micrófono analógico se alimenta desde la salida MIC_BIAS | Opcional |
| 6 | Cada una de las dos entradas ADC de audio debe incluir un condensador de bloqueo de CC de al menos 2,2 µF | Opcional |
| 7 | Cada ruta P y N de salida DAC tiene una resistencia en serie de 1 kΩ y un condensador de 1,5 nF entre ambas | Opcional |
| 8 | AW8155 es el amplificador de audio recomendado; si se utiliza, configúrelo por software en el modo 4 / Clase AB | Opcional |
| 9 | <span class="flag-red">Si la salida PA de audio se realimenta a la entrada ADC del MCU, añada un divisor y un filtro RC o filtrado digital adicional. La tensión dividida debe permanecer dentro del rango de entrada del ADC y la frecuencia de corte del filtro RC debe ser de 20 kHz</span> | Opcional |
| 10 | <span class="flag-red">Si no se utiliza la ruta ADC de audio analógico integrada en el chip, se recomienda conectar ADC1P/ADC1N y ADC2P/ADC2N a tierra, cada par mediante resistencias en serie de 0 Ω</span> | Opcional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabla 5.8.20-1: Lista de comprobación de SPI</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La conexión SPI es correcta; SDO y SDI están cruzados correctamente entre el MCU y el periférico | Opcional |
| 2 | Se han confirmado y se cumplen los requisitos de temporización del periférico SPI | Opcional |
| 3 | El nivel lógico de E/S del periférico coincide con el del chip principal | Opcional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabla 5.8.21-1: Lista de comprobación de USART</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Diseñe USART4 como interfaz de descarga y registro | Obligatorio |
| 2 | <span class="flag-red">Añada puntos de prueba a USART4; se recomiendan resistencias en serie de 100 Ω para TXD y RXD</span> | Obligatorio |
| 3 | <span class="flag-red">Añada un punto de prueba a USART1</span> | Obligatorio |
| 4 | Conecte a USART2 o USART3 los dispositivos que deban funcionar en HCPU | Opcional |
| 5 | Conecte a USART5 o USART6 los dispositivos que deban funcionar en LCPU | Opcional |
| 6 | Al conectar un periférico, cruce correctamente RXD y TXD | Obligatorio |
| 7 | El nivel lógico de E/S del periférico coincide con el del chip principal | Obligatorio |
| 8 | Reserve puntos de prueba USART no utilizados para posibles usos futuros | Opcional |
| 9 | <span class="flag-red">Se recomienda usar la interfaz HCPU para el UART conectado a periféricos, para evitar que el software HCPU utilice una interfaz UART de LCPU</span> | Obligatorio |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabla 5.8.22-1: Lista de comprobación de PWM</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La asignación de pines PWM para la retroiluminación es correcta; use un GPTIMx distinto del PWM del motor, preferentemente en la interfaz PB, para evitar que una reducción de frecuencia de HCPU afecte a la retroiluminación | Obligatorio |
| 2 | La asignación de pines PWM del motor es correcta; use un GPTIMx distinto del PWM de la retroiluminación, preferentemente en la interfaz PB, para evitar que una reducción de frecuencia de HCPU afecte a la vibración | Obligatorio |
| 3 | Para controlar el motor mediante PWM, seleccione una GPIO deshabilitada por defecto a fin de evitar comportamientos anómalos durante la programación del firmware cuando se utiliza un motor SMT | Obligatorio |
| 4 | Las señales que requieran salida PWM deben usar la interfaz PB; compruebe también que no haya comportamientos anómalos durante el arranque en frío | Obligatorio |

</div>

### 5.8.23. Depuración { #5823-debug }

<div align="center"><em>Tabla 5.8.23-1: Lista de comprobación de depuración</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Las señales SWD están conectadas correctamente | Obligatorio |
| 2 | Reserve correctamente la referencia de alimentación de E/S en el conector J-Link o en los puntos de prueba | Obligatorio |
| 3 | <span class="flag-yellow">Durante la descarga del programa, deben estar alimentados PVDD, VDDIO, VDDSC y los raíles similares; AVDD18_DSI (alimentación de CAU2) también debe estar alimentada</span> | Obligatorio |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabla 5.8.24-1: Lista de comprobación de USB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La conexión de la interfaz USB es correcta | Opcional |
| 2 | La interfaz USB tiene protección ESD | Opcional |
| 3 | Durante el funcionamiento normal, mientras USB permanezca habilitado, el lado del PC/dispositivo puede detectar la conexión y desconexión.<br>Si se deben detectar conexiones y desconexiones mientras el MCU está en suspensión, añada un divisor resistivo en VBUS; su salida debe ser un nivel alto que coincida con la tensión de E/S y conectarse a un pin de activación del MCU. Se recomienda compartir el pin de activación de detección de conexión del cargador | Opcional |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>Tabla 5.8.25-1: Lista de comprobación de PBR</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Durante el encendido, PBR0 cambia de 0 a 1 y puede controlar algunos interruptores de carga externos; PBR1-PBR5 tienen salida baja por defecto | Obligatorio |
| 2 | PBR0-PBR5 pueden utilizarse como salidas tanto en Standby como en Hibernate | Opcional |
| 3 | PBR0-PBR5 pueden emitir señales LPTIM | Opcional |
| 4 | <span class="flag-red">Para el SF32LB567 se recomienda LPTIM3: LPTIM3_OUT y LPTIM3_OUT_BAR emiten desde los pines PBR señales de 21-25 kHz con ciclos de trabajo distintos y polaridad opuesta</span> | Opcional |
| 5 | <span class="flag-red">Las señales de 21-25 kHz con polaridad opuesta y ciclos de trabajo distintos también pueden salir desde HCPU ATIM. Seleccione señales ATIMx_CHx y ATIMx_CHxN adecuadas junto con Pin_Config y tenga en cuenta el efecto de reducir la frecuencia de HCPU</span> | Opcional |
| 6 | PBR0-PBR5 pueden emitir una señal de reloj de 32 kHz | Opcional |
| 7 | <span class="flag-red">PBR0-PBR3 se pueden configurar como entradas de activación; sin embargo, después de que el MCU despierte, PBR0-PBRx no puede recibir interrupciones y solo puede detectar niveles 0/1. Úselo con precaución</span> | Opcional |

</div>

!!! note "Alcance de la fuente y verificación técnica"
    El punto 4 de la lista PBR de la [hoja de cálculo original](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) menciona SF32LB567. Sin embargo, la hoja no confirma que los puntos 4 y 5 de la lista PBR sean recomendaciones para SF32LB58x; consulte a SiFli antes de aplicarlos.

    El punto 6 de la lista de comprobación de almacenamiento de la hoja de cálculo indica que, durante la programación en producción, se debe poner PA43 a nivel alto para habilitar la «alimentación de MPI3». En cambio, la [nota oficial de aplicación de hardware de SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md) describe PA43 como el control de alimentación de la Flash externa y especifica que debe ponerse a nivel alto para alimentarla. La fila de la lista conserva el texto de la hoja. Antes de cerrar el procedimiento de programación en producción, confirme con SiFli qué línea de alimentación y qué interfaces controla realmente PA43.

### 5.8.26. Consumo de energía { #5826-power-consumption }

<div align="center"><em>Tabla 5.8.26-1: Lista de comprobación del consumo de energía</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Para los pines de habilitación activos en alto de todos los MOSFET, LDO y DCDC usados para conmutar la alimentación, reserve un pull-down de 1 MΩ a tierra | Obligatorio |
| 2 | Registre el requisito de corriente de referencia en modo Hibernate | Obligatorio |
| 3 | <span class="flag-red">Registre la suma de las corrientes de referencia de los periféricos seleccionados en Hibernate y confirme que cumple los requisitos del proyecto</span> | Obligatorio |
| 4 | Registre el requisito de corriente de referencia en modo Standby | Obligatorio |
| 5 | <span class="flag-red">Registre la suma de las corrientes de referencia de los periféricos seleccionados en Standby y confirme que cumple los requisitos del proyecto</span> | Obligatorio |

</div>

### 5.8.27. Descarga y calibración del cristal { #5827-download-and-crystal-calibration }

<div align="center"><em>Tabla 5.8.27-1: Lista de comprobación de descarga y calibración del cristal</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Reserve puntos de prueba SWD para VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA y VDDIOB | Obligatorio |
| 2 | Si se necesita una placa de descarga fuera de línea para programar el firmware, reserve puntos de prueba para VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN y VDDIOA | Opcional |
| 3 | Si se requiere calibración del cristal, reserve un punto de prueba para ella; se recomienda PB45 | Opcional |

</div>
