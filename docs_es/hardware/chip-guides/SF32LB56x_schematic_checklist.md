---
icon: lucide/list-checks
description: "Lista de comprobación para revisar, punto por punto, el esquemático de la MCU SF32LB56x: alimentación, reloj, RF, almacenamiento, pantalla y fabricación."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
hide:
    - navigation
---

# Guía de diseño de hardware de SF32LB56x — Lista de comprobación del esquemático { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "Parte de la guía de diseño de hardware de SF32LB56x"
    Esta página cubre la sección 5.8, la lista de comprobación del esquemático punto por punto. Vuelva a [Diseño del esquemático](SF32LB56x_schematic_design.md).

## 5.8. Lista de comprobación del esquemático { #58-schematic-checklist }

Cada tabla cubre un bloque funcional del esquemático. Cuando aparezca la columna «Aplicable a», aplique cada punto únicamente a las variantes indicadas.

### 5.8.1. Encapsulado { #581-package }

<div align="center"><em>Tabla 5.8.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El encapsulado de la referencia seleccionada es correcto, incluidos los nombres y números de los pines | Todos los chips | Obligatorio |

</div>

### 5.8.2. Alimentación { #582-power-supply }

<div align="center"><em>Tabla 5.8.2-1: Lista de comprobación de la alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La tensión de alimentación PVDD es de 1,8 V–3,3 V; se recomiendan 1,8 V para SF32LB56xU/SF32LB56xV y 3,3 V para SS6700A | Todos los chips | Obligatorio |
| 2 | Las conexiones BUCK_LX y BUCK_FB son correctas | Todos los chips | Obligatorio |
| 3 | La salida LDO_VOUT1 tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todos los chips | Obligatorio |
| 4 | La salida LDO_VOUT2 tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todos los chips | Obligatorio |
| 5 | La salida VDD_RET tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todos los chips | Obligatorio |
| 6 | La salida VDD_RTC tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todos los chips | Obligatorio |
| 7 | La tensión de VDDIO1 es de 1,8 V–3,3 V; SF32LB56xU usa 1,8 V y SS6700A usa 3,3 V. VDDIO1 puede conmutarse junto con la memoria Flash externa bajo el control de PBR0. Si PBR0 no controla VDDIO1, asegúrese de que reciba alimentación durante la descarga del programa. Si se controla mediante GPIO, se recomienda PB22 y la herramienta de descarga debe habilitar esta línea | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 8 | Cuando SF30147 suministra VDDIO1, se recomienda LVSW1; la herramienta de descarga debe habilitar esta línea | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 9 | La tensión de VDDIO2 es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa (se recomienda 1,8 V para SF32LB56xU y 3,3 V para SS6700A) | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 10 | La tensión de VDDIO3 es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa (se recomienda 1,8 V para SF32LB56xU y 3,3 V para SS6700A) | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 11 | La tensión de VDDIO4 es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa (se recomienda 1,8 V para SF32LB56xU; SS6700A no dispone de esta línea de alimentación) | SF32LB560/561/563/56W | Obligatorio |
| 12 | La tensión de VDDIOA es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | SF32LB565/567 | Obligatorio |
| 13 | La tensión de VDDIOA2 es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | SF32LB565/567 | Obligatorio |
| 14 | La tensión de VDDIOB es de 1,8 V–3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | SF32LB565/567 | Obligatorio |
| 15 | La tensión de VDDIOSA es de 1,8 V y se incluye un interruptor de carga para controlar la alimentación | SF32LB565/567 | Obligatorio |
| 16 | La tensión de VDDIOSB es de 1,8 V y se incluye un interruptor de carga para controlar la alimentación | SF32LB565/567 | Obligatorio |
| 17 | La tensión de VDDIOSC es de 1,8 V y VDDIOSC debe permanecer siempre alimentado | SF32LB565/567 | Obligatorio |
| 18 | La tensión de alimentación AVDD33_ANA es de 3,3 V | Todos los chips | Obligatorio |
| 19 | La tensión de alimentación AVDD33_AUD es de 3,3 V | Todos los chips | Obligatorio |
| 20 | Se recomienda usar un circuito integrado de carga con gestión de la ruta de alimentación, para que el sistema pueda encenderse desde la entrada del cargador cuando la tensión de la batería esté por debajo del umbral de encendido | Todos los chips | Obligatorio |
| 21 | Si se usa un circuito integrado de carga sin gestión de la ruta de alimentación, la corriente de carga de mantenimiento debe ser de al menos 40 mA | Todos los chips | Obligatorio |
| 22 | Cuando corresponda, el diseño de alimentación debería ser compatible a nivel de hardware entre SF32LB56xU y SS6700 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 23 | Cuando SF30147 suministra alimentación, utilice la interfaz TWI dedicada del SF32LB56x para controlar los registros | Todos los chips | Obligatorio |
| 24 | Si el bus TWI de SF30147 comparte el bus I2C del sensor G, la alimentación pull-up de I2C del sensor G debe permanecer siempre activa para que TWI funcione correctamente | Todos los chips | Obligatorio |
| 25 | Cuando SF30147 suministra alimentación, se pueden usar interruptores de carga y LDO controlados por EN. El dominio de alimentación de EN debe ser PVDD o AVDD; no controle el interruptor desde una GPIO de la MCU a 1,8 V o 3,3 V. Como alternativa, conecte EN a tierra y controle mediante registros la salida de la línea de alimentación correspondiente | Todos los chips | Obligatorio |
| 26 | Cuando SF30147 suministra alimentación, BUCK y LDO1 solo se pueden controlar mediante sus respectivas señales de habilitación EN_BUCK y EN_LDO1; no admiten control mediante registros internos | Todos los chips | Obligatorio |
| 27 | PVDD del 56x debe coincidir con VDDIO3 en SF32LB56xU o VDDIOB en SF32LB56xV. Si PVDD es inferior —por ejemplo, si la línea de E/S es de 3,3 V y PVDD es de 1,8 V—, la línea de E/S presenta una fuga de aproximadamente 15 µA en modos Standby e Hibernate | Todos los chips | Obligatorio |

</div>

### 5.8.3. Condensadores e inductores de alimentación { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabla 5.8.3-1: Lista de comprobación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El condensador de reserva de PVDD es de al menos 10 µF | Todos los chips | Obligatorio |
| 2 | Condensador de BUCK_FB = 4,7 µF | Todos los chips | Obligatorio |
| 3 | Condensador de LDO_VOUT1 = 4,7 µF | Todos los chips | Obligatorio |
| 4 | Condensador de LDO_VOUT2 = 4,7 µF | Todos los chips | Obligatorio |
| 5 | Condensador de VDD_RET = 0,47 µF | Todos los chips | Obligatorio |
| 6 | Condensador de VDD_RTC = 1 µF | Todos los chips | Obligatorio |
| 7 | El condensador de VDDIO1 es de al menos 1 µF | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 8 | El condensador de VDDIO2 es de al menos 1 µF | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 9 | El condensador de VDDIO3 es de al menos 1 µF | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 10 | El condensador de VDDIO4 es de al menos 1 µF | SF32LB560/561/563/56W | Obligatorio |
| 11 | El condensador de VDDIOA es de al menos 1 µF | SF32LB565/567 | Obligatorio |
| 12 | El condensador de VDDIOA2 es de al menos 1 µF | SF32LB565/567 | Obligatorio |
| 13 | El condensador de VDDIOB es de al menos 1 µF | SF32LB565/567 | Obligatorio |
| 14 | El condensador de VDDIOSA es de al menos 0,1 µF | SF32LB565/567 | Obligatorio |
| 15 | El condensador de VDDIOSB es de al menos 0,1 µF | SF32LB565/567 | Obligatorio |
| 16 | El condensador de VDDIOSC es de al menos 0,1 µF | SF32LB565/567 | Obligatorio |
| 17 | Condensador de MIC_BIAS = 1 µF | Todos los chips | Obligatorio |
| 18 | El condensador de AVDD33_ANA es de al menos 4,7 µF | Todos los chips | Obligatorio |
| 19 | El condensador de AVDD33_AUD es de al menos 4,7 µF | Todos los chips | Obligatorio |
| 20 | El condensador de AVDD33_BRF es de al menos 4,7 µF | SF32LB565/567 | Obligatorio |
| 21 | Condensador de AUD_VREF = 1 µF | Todos los chips | Obligatorio |
| 22 | Condensador de GPADC VREFP = 4,7 µF | Todos los chips | Obligatorio |
| 23 | La referencia del inductor BUCK figura en la [lista de proveedores aprobados de SiFli][SiFli Approved Vendor List] (AVL) | Todos los chips | Obligatorio |
| 24 | Si el inductor BUCK no está recomendado por SiFli, cumple L = 4,7 µH, DCR &lt;= 0,4 Ω e Isat &gt;= 450 mA | Todos los chips | Obligatorio |
| 25 | La alimentación PVDD es de 1,8 V; se recomienda usar un convertidor DCDC de VBAT a 1,8 V | Todos los chips | Obligatorio |
| 26 | Si hay GPS u otros periféricos sensibles a interferencias, se reserva una huella para un condensador en derivación a tierra en BUCK_LX; el valor se determina mediante pruebas reales | Todos los chips | Obligatorio |
| 27 | Se registra la corriente en reposo del DCDC seleccionado y se confirma que cumple los requisitos del proyecto | Todos los chips | Obligatorio |
| 28 | Se registra la corriente en reposo del LDO seleccionado y se confirma que cumple los requisitos del proyecto | Todos los chips | Obligatorio |

</div>

### 5.8.4. Reloj { #584-clock }

<div align="center"><em>Tabla 5.8.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La referencia del cristal principal de 48 MHz figura en la AVL | Todos los chips | Obligatorio |
| 2 | Si el cristal de 48 MHz no figura en la AVL, cumple 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), tolerancia de frecuencia ≤ ±10 ppm y ESR ≤ 30 Ω (22 Ω recomendado) | Todos los chips | Obligatorio |
| 3 | La referencia del cristal RTC de 32,768 kHz figura en la AVL | Todos los chips | Obligatorio |
| 4 | Si el cristal de 32,768 kHz no figura en la AVL, cumple CL ≤ 12,5 pF (7 pF recomendado), tolerancia de frecuencia ≤ ±20 ppm y ESR ≤ 80 kΩ (38 kΩ recomendado) | Todos los chips | Obligatorio |

</div>

### 5.8.5. Señales de tierra { #585-ground-signals }

<div align="center"><em>Tabla 5.8.5-1: Lista de comprobación de las señales de tierra</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Todas las señales VSS están conectadas a GND | Todos los chips | Obligatorio |

</div>

### 5.8.6. Modo de arranque { #586-boot-mode }

<div align="center"><em>Tabla 5.8.6-1: Lista de comprobación del modo de arranque</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | MODE tiene un pull-down interno; reserve un pull-up de 10 kΩ a VDDIOA y ponga MODE a nivel alto durante la descarga del programa | Todos los chips | Obligatorio |
| 2 | Reserve un punto de prueba para la señal MODE y llévela hasta el útil de grabación de producción | Todos los chips | Obligatorio |

</div>

### 5.8.7. RF { #587-rf }

<div align="center"><em>Tabla 5.8.7-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La señal ANT especifica el requisito de impedancia característica de 50 Ω en configuración no balanceada | Todos los chips | Obligatorio |
| 2 | Se reserva una red de adaptación en π para ANT: un condensador paralelo NC (no montar) y un condensador en serie de 15 pF | Todos los chips | Obligatorio |

</div>

### 5.8.8. Asignación de recursos de E/S { #588-io-resource-allocation }

<div align="center"><em>Tabla 5.8.8-1: Lista de comprobación de la asignación de recursos de E/S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se proporciona una tabla de asignación de recursos GPIO que coincide con el esquemático | Todos los chips | Obligatorio |
| 2 | La asignación de GPIO de la tabla de recursos coincide con el esquemático | Todos los chips | Obligatorio |
| 3 | Al controlar las salidas GPIO, se considera el estado PU/PD predeterminado durante el arranque en frío y, si es necesario, se habilitan por adelantado los periféricos relacionados | Todos los chips | Obligatorio |
| 4 | La asignación real de GPIO sigue las recomendaciones de SiFli; consulte el archivo de configuración de E/S | Todos los chips | Obligatorio |

</div>

### 5.8.9. Activación por hardware { #589-hardware-wake-up }

<div align="center"><em>Tabla 5.8.9-1: Lista de comprobación de la activación por hardware</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Las fuentes de interrupción para reactivar desde Hibernate o Standby son correctas: PA50, PA51, PB32, PB33, PB34, PBR0, PBR1 y PBR2, ocho pines en total | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 2 | Las fuentes de interrupción para reactivar desde Hibernate o Standby son correctas: PA50–PA54, PB32–PB36 y PBR0–PBR3, catorce pines en total | SF32LB565/567 | Obligatorio |
| 3 | Los pines de activación pueden despertar HCPU o LCPU según la configuración del software | Todos los chips | Obligatorio |
| 4 | Las señales de interrupción y control de los periféricos de LCPU, como el sensor G y el sensor de frecuencia cardíaca, deben conectarse a GPIO PB | Todos los chips | Obligatorio |

</div>

### 5.8.10. Almacenamiento { #5810-storage }

<div align="center"><em>Tabla 5.8.10-1: Lista de comprobación del almacenamiento</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) se conecta a memoria SPI NAND o SD NAND; para la Flash externa de SF32LB56xU, compruebe que su tensión de alimentación coincida con VDDIO3 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 2 | MPI3 (SD2) se conecta a memoria SPI NAND o SD NAND y el nivel de E/S de la Flash coincide con VDDIOA2 | SF32LB565/567 | Obligatorio |
| 3 | El pin HOLD# de la memoria SPI NAND tiene un pull-up de 10 kΩ a la alimentación de dicha memoria | Todos los chips | Obligatorio |
| 4 | MPI3 se conecta a memoria NOR (la memoria externa de SS6700A debe ser NOR) | Todos los chips | Obligatorio |
| 5 | Si en producción es necesario grabar la FLASH de MPI3 (SD2), se habilita la alimentación de la Flash externa durante la descarga del programa | Todos los chips | Obligatorio |
| 6 | El interruptor de alimentación controlado por PBR0 u otra GPIO es activo en alto para encender y activo en bajo para apagar | Todos los chips | Obligatorio |
| 7 | Si la interfaz SD2 se conecta a una memoria SD NAND, las señales están conectadas correctamente | Todos los chips | Obligatorio |
| 8 | Se recomiendan resistencias en serie de 33 Ω en las líneas CLK y de datos de la memoria Flash | Todos los chips | Opcional |
| 9 | El nivel de E/S de SD NAND coincide con VDDIO2 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 10 | Las líneas CLK y de datos de la memoria Flash tienen resistencias en serie de 33 Ω | Todos los chips | Obligatorio |
| 11 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todos los chips | Obligatorio |
| 12 | La Flash NOR integrada en el encapsulado y conectada a la LCPU permanece siempre alimentada y, de forma predeterminada, PBR0 controla la alimentación de la Flash externa.<br>(1) Si hay pocos GPIO disponibles, PBR0 también puede controlar la alimentación de la PSRAM integrada en el encapsulado de 561/2/3/W (VDDIO1). Si la PSRAM contiene datos que deben conservarse durante la suspensión, no apague ni la PSRAM ni la Flash externa.<br>(2) Si hay GPIO disponibles, utilice PB22 para controlar el interruptor de alimentación de la PSRAM | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 13 | <span class="flag-yellow">Las alimentaciones VDDIOSA y VDDIOSB se controlan mediante PBR0, VDDIOSC permanece siempre alimentada y la alimentación de la Flash externa se controla mediante PA03</span> | SF32LB565/567 | Obligatorio |
| 14 | La memoria NOR está cualificada en la guía de selección de componentes clave | Todos los chips | Obligatorio |
| 15 | La memoria SPI/SD NAND está cualificada en la guía de selección de componentes clave | Todos los chips | Obligatorio |

</div>

### 5.8.11. Pantalla { #5811-display }

<div align="center"><em>Tabla 5.8.11-1: Lista de comprobación de la pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | SF32LB56xU o SS6700A se conecta a un panel QSPI | Todos los chips | Obligatorio |
| 2 | SF32LB56xU o SS6700A se conecta a un panel JDI serie | Todos los chips | Obligatorio |
| 3 | Las señales QSPI de LCDC1 están conectadas correctamente; se recomiendan resistencias en serie de 100 Ω en las líneas CLK y de datos | Todos los chips | Obligatorio |
| 4 | Las señales JDI serie de LCDC1 están conectadas correctamente | Todos los chips | Obligatorio |
| 5 | La señal RSTB de LCDC está conectada correctamente | Todos los chips | Obligatorio |
| 6 | La señal TE de LCDC está conectada correctamente (a la señal TE o Fmark del panel) | Todos los chips | Obligatorio |
| 7 | Las señales TP siguen la asignación de pines recomendada (consulte el archivo de configuración de E/S de la EVB) | Todos los chips | Obligatorio |
| 8 | La interfaz LCD admite SPI de 3/4 hilos, SPI con datos en modo dual/cuádruple, JDI serie y modos similares | Todos los chips | Opcional |
| 9 | LCD SPI, modo de 3 hilos: CS a PA36, CLK a PA37 y DATA a PA38; modo de 4 hilos: CS a PA36, CLK a PA37, DATA a PA38 y DC a PA39 | Todos los chips | Opcional |
| 10 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todos los chips | Obligatorio |
| 11 | Si se requiere AOD en la LCD, tenga en cuenta que VDDIO3, la alimentación de LCD_RST (PA05), debe permanecer siempre alimentada. No conecte VDDIO3 a la alimentación de la Flash externa; de lo contrario, al apagar la Flash durante la suspensión también podría desconectarse VDDIO3 y LCD_RST, causando anomalías en AOD | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 12 | En LCD con DSI, conecte las señales de datos y reloj DSI. Los paneles en modo de vídeo DSI se comportan como paneles RGB y no tienen señal TE; los paneles en modo de comandos DSI sí tienen TE, y DSI17801 requiere TE. Se recomiendan tanto TE como RST; el uso final depende de la LCD seleccionada | SF32LB565/567 | Obligatorio |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>Tabla 5.8.12-1: Lista de comprobación de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La entrada GPADC se conecta al pin correspondiente | Todos los chips | Opcional |
| 2 | El rango de entrada GPADC es correcto; la tensión máxima de entrada no debe superar AVDD33_AVA (3,3 V) | Todos los chips | Opcional |
| 3 | Divisor de tensión de batería recomendado: resistencia de 470 kΩ y 1 % en el lado de alimentación, resistencia de 1 MΩ y 1 % a tierra y condensador de filtro de 100 nF | Todos los chips | Obligatorio |
| 4 | Para cada señal con divisor resistivo medida por GPADC, utilice resistencias divisoras con tolerancia del 1 %; cada canal GPADC debe tener un condensador de filtro de 100 nF colocado cerca del pin del chip | Todos los chips | Obligatorio |
| 5 | El ADC puede detectar varios botones y ahorrar pines; por ejemplo, si PB32 se usa como botón ADC, no utilice la batería como alimentación pull-up | Todos los chips | Obligatorio |

</div>

### 5.8.13. Botones { #5813-buttons }

<div align="center"><em>Tabla 5.8.13-1: Lista de comprobación de botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Confirme con el cliente si el botón debe tener capacidad de activación (wake-up) | Todos los chips | Obligatorio |
| 2 | La conexión de los botones normales es correcta (pull-up presente, valor de resistencia correcto y dominio de tensión del pull-up adecuado) | Todos los chips | Obligatorio |
| 3 | El botón de encendido debe usar PB32 y ser activo en alto. Una pulsación de 10 segundos provoca el reinicio; la resistencia pull-down de 10 kΩ debe estar en la placa principal | Todos los chips | Obligatorio |
| 4 | Todas las señales de los botones tienen protección ESD | Todos los chips | Obligatorio |

</div>

### 5.8.14. Protección EOS y ESD { #5814-eos-and-esd-protection }

<div align="center"><em>Tabla 5.8.14-1: Lista de comprobación de protección EOS y ESD</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La interfaz de carga incluye protección EOS, ESD y OVP | Todos los chips | Obligatorio |
| 2 | La señal de detección de conexión del cargador tiene un dispositivo de protección ESD | Todos los chips | Obligatorio |
| 3 | La interfaz de batería tiene un dispositivo de protección ESD | Todos los chips | Obligatorio |
| 4 | La interfaz de antena tiene un dispositivo de protección ESD | Todos los chips | Obligatorio |
| 5 | Las interfaces de alimentación de la LCD y del TP tienen dispositivos de protección ESD | Todos los chips | Obligatorio |
| 6 | Las líneas I2C, RST e INT del TP tienen dispositivos de protección ESD | Todos los chips | Obligatorio |
| 7 | La interfaz de alimentación y las líneas de señal del sensor de frecuencia cardíaca tienen dispositivos de protección ESD | Todos los chips | Obligatorio |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>Tabla 5.8.15-1: Lista de comprobación de I2C</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La asignación de I2C tiene en cuenta la distribución entre HCPU y LCPU y si el dispositivo debe funcionar en modo de bajo consumo | Todos los chips | Obligatorio |
| 2 | Los pull-ups de I2C tienen el valor de resistencia adecuado; para funcionar a 400 kHz se recomiendan pull-ups de 2,2 kΩ. Utilice el dominio de tensión del periférico y desconecte la alimentación de los pull-ups junto con el periférico durante el apagado | Todos los chips | Obligatorio |
| 3 | Cuando sea necesario, la señal de interrupción de I2C permite la activación por hardware | Todos los chips | Obligatorio |
| 4 | Si varios dispositivos comparten un bus I2C, sus direcciones son distintas | Todos los chips | Obligatorio |
| 5 | La fila original de SiFli para el PMIC SF30147C dice: «I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C». La redacción no aclara la relación entre las señales ni el significado de «normal». Antes de liberar el diseño, confirme la asignación de PB23, la alimentación del pull-up y el funcionamiento de TWI DAT con el SF30147C en el esquemático y la documentación oficiales. | SF32LB560/561/563/56W y SS6700A | Obligatorio |

</div>

### 5.8.16. Audio analógico { #5816-analog-audio }

<div align="center"><em>Tabla 5.8.16-1: Lista de comprobación de audio analógico</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión del micrófono MEMS es correcta | Todos los chips | Obligatorio |
| 2 | El micrófono MEMS se alimenta desde MIC_BIAS | Todos los chips | Obligatorio |
| 3 | La conexión no balanceada del micrófono ECM analógico es correcta | Todos los chips | Obligatorio |
| 4 | El micrófono ECM analógico no balanceado se alimenta desde MIC_BIAS | Todos los chips | Obligatorio |
| 5 | La conexión diferencial del micrófono ECM analógico es correcta | Todos los chips | Obligatorio |
| 6 | El micrófono ECM analógico diferencial se alimenta desde MIC_BIAS | Todos los chips | Obligatorio |
| 7 | Todas las entradas ADC de audio tienen un condensador de bloqueo de CC de al menos 2,2 µF | Todos los chips | Obligatorio |
| 8 | Cada salida DAC de audio, DACP y DACN, tiene una resistencia en serie de 1 kΩ cerca del chip y un condensador de 1,5 nF conectado en paralelo entre DACP y DACN | Todos los chips | Obligatorio |
| 9 | AW8155 es el amplificador de audio recomendado; si se utiliza, configúrelo por software en el modo 4 / Clase AB | Todos los chips | Obligatorio |
| 10 | Si la salida PA de audio se realimenta a la entrada ADC de la MCU, añada un divisor y un filtro RC o filtrado digital adicional. La tensión dividida debe permanecer dentro del rango de entrada del ADC y la frecuencia de corte del filtro RC debe ser de 20 kHz | Todos los chips | Obligatorio |
| 11 | Si no se utiliza la ruta ADC de audio analógico integrada en el chip, se recomienda conectar ADCP y ADCN a tierra, cada uno mediante una resistencia en serie de 0 Ω | Todos los chips | Obligatorio |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>Tabla 5.8.17-1: Lista de comprobación de SPI</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión SPI es correcta; SDO y SDI están cruzados correctamente entre la MCU y el periférico | Todos los chips | Opcional |
| 2 | Se han confirmado y se cumplen los requisitos de temporización del periférico SPI | Todos los chips | Opcional |
| 3 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todos los chips | Opcional |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>Tabla 5.8.18-1: Lista de comprobación de USART</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | USART4 es la interfaz de descarga del programa y depuración; reserve puntos de prueba e incluya una resistencia en serie recomendada de 100 Ω, ajustable según el diseño real | Todos los chips | Obligatorio |
| 2 | <span class="flag-yellow">En SF32LB56xU, PA17/PA18 se multiplexan como USART1 para las pruebas de certificación RF; reserve puntos de prueba</span> | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 3 | <span class="flag-yellow">En SF32LB56xV, PA30/PA34 se multiplexan como USART1 para las pruebas de certificación RF; reserve puntos de prueba</span> | SF32LB565/567 | Obligatorio |
| 4 | Al conectar un periférico, conecte RXD de la MCU a TXD del periférico y TXD de la MCU a RXD del periférico | Todos los chips | Obligatorio |
| 5 | Si PA17/PA18 se multiplexan como UART para periféricos, durante el reinicio de la MCU los periféricos conectados deben estar apagados o el software debe llevar ambos pines a nivel bajo | Todos los chips | Obligatorio |
| 6 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todos los chips | Obligatorio |
| 7 | Los puntos de prueba USART no utilizados se reservan para uso de reserva | Todos los chips | Opcional |
| 8 | Se recomienda usar la interfaz HCPU para el UART conectado a periféricos, para evitar que el software HCPU utilice una interfaz UART de LCPU | Todas las variantes | Obligatorio |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>Tabla 5.8.19-1: Lista de comprobación de PWM</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La asignación de pines PWM para la retroiluminación es correcta; el control de la retroiluminación LCD debe usar GPIO PB con función PWM | Todos los chips | Opcional |
| 2 | La asignación de pines PWM del motor es correcta; el control de vibración debe usar GPIO PB con función PWM | Todos los chips | Opcional |
| 3 | Para controlar el motor mediante PWM, seleccione una GPIO deshabilitada por defecto a fin de evitar comportamientos anómalos durante la grabación del firmware cuando se utiliza un motor SMT | Todos los chips | Opcional |
| 4 | Las demás salidas PWM, además de la retroiluminación y el motor, también deben usar la interfaz PB; compruebe el comportamiento durante el arranque en frío | Todos los chips | Opcional |

</div>

### 5.8.20. Depuración { #5820-debug }

<div align="center"><em>Tabla 5.8.20-1: Lista de comprobación de depuración</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se recomienda UART4_TXD/UART4_RXD para depuración; reserve puntos de prueba y añada una resistencia en serie recomendada de 100 Ω | Todos los chips | Obligatorio |
| 2 | Las señales SWD están conectadas correctamente | Todos los chips | Obligatorio |
| 3 | Reserve correctamente la referencia de alimentación de E/S en el conector J-Link o en los puntos de prueba | Todos los chips | Obligatorio |
| 4 | Durante la descarga de producción, asegúrese de alimentar PVDD, VDDIO2 en SF32LB56xU o VDDIOA en SF32LB56xV, VDDIO3 en SF32LB56xU o VDDIOA2 en SF32LB56xV, y VDDIO4 en SF32LB56xU o VDDIOB en SF32LB56xV. También debe alimentarse VDDIO1 en 561/563/56W o VDDIOSB en 565/567 | Todos los chips | Obligatorio |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>Tabla 5.8.21-1: Lista de comprobación de USB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión de la interfaz USB es correcta | Todos los chips | Opcional |
| 2 | La interfaz USB tiene protección ESD | Todos los chips | Opcional |
| 3 | Durante el funcionamiento normal, mientras USB permanezca habilitado, el lado del PC/dispositivo puede detectar la conexión y desconexión.<br>Si se deben detectar conexiones y desconexiones mientras la MCU está en suspensión, añada un divisor resistivo en VBUS; su salida debe ser un nivel alto que coincida con la tensión de E/S y conectarse a un pin de activación de la MCU. Se recomienda compartir el pin de activación de detección de conexión del cargador | Todos los chips | Opcional |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>Tabla 5.8.22-1: Lista de comprobación de PBR</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Durante el encendido, PBR0 cambia de 0 a 1 y puede controlar algunos interruptores de carga externos; PBR1-PBR2 están configurados como salidas de nivel bajo por defecto | Todos los chips | Obligatorio |
| 2 | PBR0-PBRx pueden utilizarse como salidas tanto en Standby como en Hibernate | Todos los chips | Opcional |
| 3 | PBR0-PBRx pueden emitir señales LPTIM | Todos los chips | Opcional |
| 4 | Para 567 se recomienda LPTIM3: LPTIM3_OUT y LPTIM3_OUT_BAR emiten desde los pines PBR señales de 21-25 kHz con ciclos de trabajo distintos y polaridad opuesta | Todos los chips | Opcional |
| 5 | Las señales de 21-25 kHz con polaridad opuesta y ciclos de trabajo distintos también pueden salir desde HCPU ATIM. Seleccione señales ATIMx_CHx y ATIMx_CHxN adecuadas junto con Pin_Config y tenga en cuenta el efecto de reducir la frecuencia de HCPU | Todos los chips | Opcional |
| 6 | PBR1-PBRx pueden emitir una señal de reloj de 32 kHz | Todos los chips | Opcional |
| 7 | PBR0-PBRx se pueden configurar como entradas para señales de activación | Todos los chips | Opcional |
| 8 | Si PBR se utiliza como pin de activación, el software debe consultar su estado después de que la MCU despierte. Admite niveles que cambian lentamente, como los de botones y detección del cargador; para pulsos rápidos, como las interrupciones del sensor de frecuencia cardíaca, utilice una GPIO normal compatible con la activación, no PBR | Todos los chips | Opcional |

</div>

### 5.8.23. Consumo de energía { #5823-power-consumption }

<div align="center"><em>Tabla 5.8.23-1: Lista de comprobación del consumo de energía</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Para los pines de habilitación activos en alto de todos los MOSFET, LDO y DCDC usados para conmutar la alimentación, reserve un pull-down de 1 MΩ a tierra; ajuste el valor según los requisitos del proyecto | Todos los chips | Obligatorio |
| 2 | Alimente el PVDD de SF32LB56x a 1,8 V mediante un convertidor DCDC de bajo Iq y manténgalo siempre encendido | Todos los chips | Obligatorio |
| 3 | En SF32LB56xU y SS6700, VDDIO1 requiere el control de un interruptor de carga. Utilice PBR0 como señal de control; si hay GPIO disponibles, PB22 también puede controlar la alimentación. La herramienta de descarga debe habilitar la alimentación de VDDIO1 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 4 | En SF32LB56xU y SS6700, la alimentación de la Flash externa requiere un interruptor de carga controlado por PBR0 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 5 | <span class="flag-yellow">En los modos Hibernate-off o Standby-off, VDDIOSA y VDDIOSB de SF32LB56xV requieren interruptores de carga controlados por PBR0, mientras que VDDIOSC debe permanecer siempre alimentada</span> | SF32LB565/567 | Obligatorio |
| 6 | <span class="flag-yellow">La alimentación de la Flash MPI3 de SF32LB56xV requiere un interruptor de carga controlado por PA03; habilite la alimentación de Flash MPI3 durante la descarga</span> | SF32LB565/567 | Obligatorio |
| 7 | Registre el requisito de corriente base en Deep Sleep. Deep Sleep tiene una corriente superior a la de Standby y es adecuado para intervalos de activación inferiores a 200 ms; todos los pines PB admiten activación y la corriente base es de 90 µA | Todos los chips | Obligatorio |
| 8 | Registre la suma de las corrientes base de todos los periféricos seleccionados en Deep Sleep y confirme que cumple los requisitos del proyecto | Todos los chips | Obligatorio |
| 9 | Registre el requisito de corriente base en Standby. Este modo es adecuado para intervalos de activación superiores a 200 ms; solo PA50, PA51, PB33 y PB34 admiten activación, y la corriente base es de 4–5 µA | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 10 | Registre el requisito de corriente base en Standby. Este modo es adecuado para intervalos de activación superiores a 200 ms; solo PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35 y PB36 admiten activación, y la corriente base es de 4–5 µA | SF32LB565/567 | Obligatorio |
| 11 | Registre la corriente de los periféricos seleccionados en Standby y confirme que cumple los requisitos del proyecto | Todos los chips | Obligatorio |

</div>

### 5.8.24. Descarga { #5824-download }

<div align="center"><em>Tabla 5.8.24-1: Lista de comprobación de descarga</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | SF32LB56xU: reserve puntos de prueba de descarga para VBAT, GND, VDDIO2, VDDIO3 o VDDIO4, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD y uno de los pines PB20/PB21/PB25 | SF32LB560/561/563/56W y SS6700A | Obligatorio |
| 2 | SF32LB56xV: reserve puntos de prueba de descarga para VBAT, GND, VDDIOA, VDDIOB, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD y uno de los pines PB20/PB21/PB25 | SF32LB565/567 | Obligatorio |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
