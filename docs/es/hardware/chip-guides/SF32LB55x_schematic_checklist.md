---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de comprobación para revisar los esquemáticos de la MCU SF32LB55x, incluidos alimentación, reloj, RF, almacenamiento, pantalla y fabricación."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware SF32LB55x — Lista de comprobación del esquemático { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. Lista de comprobación del esquemático { #58-schematic-checklist }

Cada tabla corresponde a un bloque funcional del esquemático. Cuando exista la columna «Aplicable a», aplique cada fila únicamente a las variantes indicadas.

El texto rojo y el fondo amarillo conservan el énfasis de revisión de la hoja de cálculo fuente. Esta no explica el motivo de cada marca; considérelas señales adicionales para la revisión, sin que cambien la categoría «Obligatorio/Opcional» del punto.

### 5.8.1. Encapsulado { #581-package }

<div align="center"><em>Tabla 5.8.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El encapsulado del número de pieza seleccionado es correcto, incluidos los nombres y números de los pines | Todas las variantes | Obligatorio |

</div>

### 5.8.2. Alimentación { #582-power-supply }

<div align="center"><em>Tabla 5.8.2-1: Lista de comprobación de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La tensión de alimentación de VDD1 es de 1,8 V a 3,3 V | Solo 551/555/557 | Obligatorio |
| 2 | <span class="flag-red">La tensión de alimentación de VDD1 es de 3,3 V</span> | <span class="flag-red">Solo SS6600A8</span> | <span class="flag-red">Obligatorio</span> |
| 3 | La tensión de alimentación de VDD2 es de 1,8 V a 3,3 V | Solo 555/557 | Obligatorio |
| 4 | Las conexiones de BUCK1_VSW y BUCK1_VOUT son correctas | Todas las variantes | Obligatorio |
| 5 | Las conexiones de BUCK2_VSW y BUCK2_VOUT son correctas | Solo 555/557 | Obligatorio |
| 6 | La conexión de LDOVCC2_VOUT es correcta | Solo 555/557 | Obligatorio |
| 7 | La tensión de alimentación de AVDD_DSI es de 1,8 V | Solo 555/557 | Obligatorio |
| 8 | La salida LDO_VOUT1 tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Todas las variantes | Obligatorio |
| 9 | La salida LDO_VOUT2 tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Todas las variantes | Obligatorio |
| 10 | La salida VDD_RET tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Todas las variantes | Obligatorio |
| 11 | La salida VDD_RTC tiene un punto de prueba o un condensador de filtro que facilite la medición de tensión | Todas las variantes | Obligatorio |
| 12 | La tensión de alimentación de VDD_SIP es de 1,8 V e incluye un interruptor de carga para poder desconectarla | Solo 551/555/557 | Obligatorio |
| 13 | <span class="flag-red">La tensión de alimentación de VDD_SIP es de 3,3 V e incluye un interruptor de carga para poder desconectarla</span> | <span class="flag-red">Solo SS6600A8</span> | <span class="flag-red">Obligatorio</span> |
| 14 | La tensión de alimentación de AVDD33 es de 3,3 V | Todas las variantes | Obligatorio |
| 15 | La tensión de alimentación de AVDD_BRF es de 1,8 V a 3,3 V y debe coincidir con la de VDD1 | Solo 551/555/557 | Obligatorio |
| 16 | <span class="flag-red">La tensión de alimentación de AVDD_BRF es de 3,3 V</span> | <span class="flag-red">Solo SS6600A8</span> | <span class="flag-red">Obligatorio</span> |
| 17 | La tensión de alimentación de VDDIOA es de 1,8 V a 3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | Solo 551/555/557 | Obligatorio |
| 18 | La tensión de alimentación de VDDIOB es de 1,8 V a 3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa | Solo 551/555/557 | Obligatorio |
| 19 | <span class="flag-red">La tensión de alimentación de VDDIOA es de 3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa</span> | <span class="flag-red">Solo SS6600A8</span> | <span class="flag-red">Obligatorio</span> |
| 20 | <span class="flag-red">La tensión de alimentación de VDDIOA es de 3,3 V; reserve una resistencia en serie de 0 Ω en la primera revisión de la placa</span> | <span class="flag-red">Solo SS6600A8</span> | <span class="flag-red">Obligatorio</span> |
| 21 | Cuando el SF30147C alimente el sistema, la interfaz de control TWI debe usar pines PB de la MCU, que deben ser pines PD | Solo 551/555/557 | Obligatorio |
| 22 | Cuando SF30147C suministre alimentación, los raíles controlados mediante EN deben usar PVDD o AVDD como dominio de alimentación de EN; no controle EN desde una GPIO de la MCU. Como alternativa, conecte EN a tierra y controle mediante registros la salida del raíl correspondiente | Solo 551/555/557 | Obligatorio |
| 23 | Cuando SF30147C suministre alimentación, BUCK y LDO1 solo se pueden controlar mediante sus señales de habilitación respectivas, EN_BUCK y EN_LDO1; no se ofrece control interno por registros | Solo 551/555/557 | Obligatorio |
| 24 | El circuito de carga debe incluir gestión de la ruta de alimentación para que el sistema pueda alimentarse desde la entrada de 5 V del cargador cuando la tensión de la batería sea demasiado baja | Todas las variantes | Obligatorio |

</div>

Ambigüedad de la fuente: los puntos 19 y 20 del libro de trabajo V1.0 original son idénticos; ambos especifican 3,3 V en VDDIOA para SS6600A8. La [guía de aplicación de hardware](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) identifica VDDIOA como la alimentación de E/S de PA y VDDIOB como la de PB, pero no aclara si el punto 20 debía referirse a VDDIOB. La lista conserva literalmente el contenido del libro de trabajo. Confirme con SiFli qué línea debe comprobarse antes de usar el punto 20 como criterio de aprobación del diseño.

### 5.8.3. Condensadores e inductores de alimentación { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabla 5.8.3-1: Lista de comprobación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El condensador principal de VDD1 es de al menos 10 µF | Todas las variantes | Obligatorio |
| 2 | El condensador de VDD2 es de al menos 10 µF | Solo 555/557 | Obligatorio |
| 3 | El condensador de BUCK1_VOUT es de 4,7 µF | Todas las variantes | Obligatorio |
| 4 | El condensador de BUCK2_VOUT es de 4,7 µF | Solo 555/557 | Obligatorio |
| 5 | <span class="flag-red">El condensador de AVDD_DSI es de al menos 10 µF</span> | Solo 555/557 | Obligatorio |
| 6 | El condensador de LDO_VOUT1 es de 4,7 µF | Todas las variantes | Obligatorio |
| 7 | El condensador de LDO_VOUT2 es de 4,7 µF | Todas las variantes | Obligatorio |
| 8 | El condensador de VDD_RET es de 0,47 µF | Todas las variantes | Obligatorio |
| 9 | El condensador de VDD_RTC es de 1 µF | Todas las variantes | Obligatorio |
| 10 | El condensador de VDD_SIP es de al menos 1 µF | Todas las variantes | Obligatorio |
| 11 | El condensador de AVDD33 es de al menos 1 µF | Todas las variantes | Obligatorio |
| 12 | El condensador de AVDD_BRF es de al menos 1 µF | Todas las variantes | Obligatorio |
| 13 | El condensador de VDDIOA es de al menos 1 µF | Todas las variantes | Obligatorio |
| 14 | El condensador de VDDIOB es de al menos 1 µF | Todas las variantes | Obligatorio |
| 15 | VDD1, VDD2 (solo 555), AVDD_BRF y la alimentación pull-up de RESET deben proceder de la misma fuente | Todas las variantes | Obligatorio |
| 16 | El inductor de BUCK1 es una referencia recomendada por SiFli | Solo 551/555/557 | Obligatorio |
| 17 | El inductor de BUCK2 es una referencia recomendada por SiFli | Solo 555/557 | Obligatorio |
| 18 | Si el inductor BUCK no es una referencia recomendada por SiFli, debe cumplir L = 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 450 mA | Todas las variantes | Obligatorio |
| 19 | Si se incluyen GPS u otros periféricos sensibles a interferencias, reserve una huella para un condensador en derivación a tierra en BUCK_LX; el valor depende de las pruebas reales | Todas las variantes | Obligatorio |
| 20 | <span class="flag-red">Al convertir VBAT a 1,8 V para VDD1 y VDD2 (solo 555), use un convertidor DCDC; no use un LDO</span> | Solo 551/555/557 | Obligatorio |
| 21 | <span class="flag-red">Registre la corriente quiescente del DCDC seleccionado y confirme que cumple los requisitos del proyecto</span> | Todas las variantes | Obligatorio |
| 22 | <span class="flag-red">Registre la corriente quiescente del LDO seleccionado y confirme que cumple los requisitos del proyecto</span> | Todas las variantes | Obligatorio |

</div>

Las fuentes discrepan: la tabla 3-3 de la [guía de aplicación de hardware en chino de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) y el punto 9 de la [lista de comprobación esquemática V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) especifican 1 µF para VDD_RTC, mientras que [C0313 en el esquemático de referencia](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) indica 0,1 µF. Las fuentes no explican cuándo se aplica cada valor. Antes de cerrar el diseño, confirme con SiFli el valor requerido para el dispositivo concreto; no resuelva la discrepancia por suposición.

### 5.8.4. Reloj { #584-clock }

<div align="center"><em>Tabla 5.8.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El cristal principal de 48 MHz figura en la AVL | Todas las variantes | Obligatorio |
| 2 | Si el cristal de 48 MHz no figura en la AVL, cumple 7 pF ≤ CL ≤ 12 pF (se recomiendan 8,8 pF), tolerancia de frecuencia ≤ ±10 ppm y ESR ≤ 30 Ω (se recomiendan 22 Ω) | Todas las variantes | Obligatorio |
| 3 | El cristal RTC de 32,768 kHz figura en la AVL | Todas las variantes | Obligatorio |
| 4 | Si el cristal de 32,768 kHz no figura en la AVL, cumple CL ≤ 12,5 pF (se recomiendan 7 pF), tolerancia de frecuencia ≤ ±20 ppm y ESR ≤ 80 kΩ (se recomiendan 38 kΩ) | Todas las variantes | Obligatorio |
| 5 | <span class="flag-yellow">Si se omite el cristal de 32,768 kHz, el pad XI debe conectarse a tierra</span> | <span class="flag-yellow">Todas las variantes</span> | <span class="flag-yellow">Obligatorio</span> |

</div>

### 5.8.5. Reinicio { #585-reset }

<div align="center"><em>Tabla 5.8.5-1: Lista de comprobación del reinicio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | RSTN tiene pull-up a la misma alimentación que VDD1 | Todas las variantes | Obligatorio |
| 2 | RSTN tiene reservado un condensador de 0,1 µF a tierra | Todas las variantes | Obligatorio |
| 3 | RSTN tiene protección ESD | Todas las variantes | Obligatorio |

</div>

### 5.8.6. Señales de tierra { #586-ground-signals }

<div align="center"><em>Tabla 5.8.6-1: Lista de comprobación de señales de tierra</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Todas las señales AVSS están conectadas a GND | Solo 555/557 | Obligatorio |
| 2 | Todas las señales VSS están conectadas a GND | Solo 555/557 | Obligatorio |
| 3 | La señal EPAD está conectada a GND | <span class="flag-red">Solo 551/SS6600A8</span> | Obligatorio |

</div>

### 5.8.7. Modo de arranque { #587-boot-mode }

<div align="center"><em>Tabla 5.8.7-1: Lista de comprobación del modo de arranque</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE tiene por defecto un pull-down de 10 kΩ a tierra y se conecta a VDDIOA mediante pull-up durante la grabación/descarga</span> | Todas las variantes | Obligatorio |
| 2 | <span class="flag-red">Reserve un punto de prueba para MODE</span> | Todas las variantes | Obligatorio |
| 3 | Si hay espacio en la PCB, reserve un conector de 3 pines para seleccionar pull-up o pull-down con un puente | Todas las variantes | Obligatorio |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabla 5.8.8-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La señal ANT está anotada con el requisito de impedancia característica de 50 Ω en configuración no balanceada | Todas las variantes | Obligatorio |
| 2 | Hay una red de adaptación tipo pi reservada en ANT: un condensador en paralelo NC (sin montar) y un condensador en serie de 15 pF | Todas las variantes | Obligatorio |
| 3 | Si se requiere filtrar las emisiones espurias, reserve una red pi con un inductor en serie de 3,0 nH y un condensador en derivación de 1,5 pF | Todas las variantes |    |
| 4 | <span class="flag-red">Si es necesario controlar un PA o LNA externo, conecte PB05 a RX_EN y PB25 a TX_EN</span> | Todas las variantes | Opcional |

</div>

La hoja fuente deja vacía la categoría del punto 3 de RF; por eso se mantiene vacía aquí. No la clasifique como obligatoria u opcional sin confirmación de SiFli.

### 5.8.9. Asignación de recursos de E/S { #589-io-resource-allocation }

<div align="center"><em>Tabla 5.8.9-1: Lista de comprobación de la asignación de recursos de E/S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se proporciona una tabla de asignación de recursos GPIO que coincide con el esquemático | Todas las variantes | Obligatorio |
| 2 | La asignación GPIO de la tabla de recursos coincide con el esquemático | Todas las variantes | Obligatorio |
| 3 | La asignación GPIO real sigue las recomendaciones de SiFli; consulte el archivo de configuración de E/S de la EVB | Todas las variantes | Obligatorio |

</div>

### 5.8.10. Activación por hardware { #5810-hardware-wake-up }

<div align="center"><em>Tabla 5.8.10-1: Lista de comprobación de activación por hardware</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Las fuentes de interrupción de activación de HCPU son correctas: PA77, PA78, PA79 y PA80; no las use para la activación mediante la tecla de encendido</span> | Todas las variantes | Obligatorio |
| 2 | <span class="flag-red">Las fuentes de interrupción de activación de LCPU son correctas: PB43, PB44, PB45, PB46, PB47 y PB48, seis pines en total; se pueden usar para la activación mediante la tecla de encendido</span> | Todas las variantes | Obligatorio |
| 3 | <span class="flag-red">Las señales de interrupción y control de los periféricos de LCPU, como el sensor G y el sensor de frecuencia cardíaca, deben conectarse a GPIO PB</span> | Todas las variantes | Obligatorio |
| 4 | <span class="flag-red">La fuente de interrupción de LCPU correspondiente a UART3 se utiliza correctamente; se recomienda usarla solo para activar mediante botones</span> | Todas las variantes | Obligatorio |

</div>

### 5.8.11. Almacenamiento { #5811-storage }

<div align="center"><em>Tabla 5.8.11-1: Lista de comprobación del almacenamiento</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | QSPI2 se diseña con el orden de prioridad PSRAM > NOR > NAND | Todas las variantes | Obligatorio |
| 2 | Si el código se ejecuta desde la memoria NOR SiP integrada, PA58 controla el interruptor de alimentación de VDD_SIP | Todas las variantes | Obligatorio |
| 3 | Si el código se ejecuta desde memoria NOR externa en QSPI2, PA58 controla el interruptor de alimentación de QSPI2 | Todas las variantes | Obligatorio |
| 4 | Si en producción hay que grabar la memoria Flash externa de QSPI2, PA58 debe controlar su interruptor de alimentación | Todas las variantes | Obligatorio |
| 5 | <span class="flag-red">El interruptor de tensión controlado por PA58 se activa en alto y se desactiva en bajo</span> | Todas las variantes | Obligatorio |
| 6 | <span class="flag-red">Se recomiendan resistencias en serie de 33 Ω en las líneas CLK y de datos de la memoria Flash</span> | Todas las variantes | Obligatorio |
| 7 | QSPI3 se conecta según lo previsto a memoria NAND o eMMC | Solo 555/557 | Opcional |
| 8 | PA41 controla el interruptor de alimentación de QSPI3; <span class="flag-red">la alimentación de QSPI3 está desactivada por defecto y un interruptor activo en alto debe usar el pull-down interno predeterminado</span> | Solo 555/557 | Opcional |
| 9 | <span class="flag-red">Si PA41 no controla el interruptor de alimentación de QSPI3, confirme con el equipo de software qué E/S alternativa se utilizará</span> | Solo 555/557 | Opcional |
| 10 | Si en producción hay que grabar la memoria Flash externa de QSPI3, PA58 debe controlar su interruptor de alimentación | Solo 555/557 | Obligatorio |
| 11 | PA70 controla el interruptor de alimentación de la PSRAM OPI; <span class="flag-red">la alimentación de PSRAM está activada por defecto y un interruptor activo en alto debe usar el pull-up interno predeterminado</span> | Solo 555/557 | Opcional |
| 12 | <span class="flag-red">La PSRAM OPI es un modelo compatible y figura como validada en la guía de selección de componentes clave</span> | Solo 555/557 | Opcional |
| 13 | Las señales de la PSRAM OPI están conectadas correctamente | Solo 555/557 | Opcional |
| 14 | Las señales de QSPI2 están conectadas correctamente | Todas las variantes | Opcional |
| 15 | Las señales de QSPI3 están conectadas correctamente | Todas las variantes | Opcional |
| 16 | <span class="flag-yellow">Al usar SF32LB555 o <span class="flag-red">SF32LB557, confirme la memoria que requiere el algoritmo de medición de la frecuencia cardíaca; si la memoria disponible en LCPU es insuficiente, añada 1 MB de Flash externa en QSPI4</span></span> | Solo 555/557 | Obligatorio |
| 17 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |
| 18 | <span class="flag-red">La memoria NOR figura como validada en la guía de selección de componentes clave</span> | Todas las variantes | Obligatorio |
| 19 | <span class="flag-red">La memoria NAND figura como validada en la guía de selección de componentes clave</span> | Todas las variantes | Obligatorio |

</div>

### 5.8.12. Pantalla { #5812-display }

<div align="center"><em>Tabla 5.8.12-1: Lista de comprobación de la pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La pantalla del SF32LB555xxxx está conectada según lo previsto mediante DSI + LCDC2 | Solo 555/557 | Obligatorio |
| 2 | <span class="flag-red">La pantalla del SF32LB551xxxx está conectada según lo previsto mediante LCDC1</span> | <span class="flag-red">Solo 551/SS6600A8</span> | Obligatorio |
| 3 | Las señales QSPI de LCDC1 están conectadas correctamente; <span class="flag-red">se recomiendan resistencias en serie de 100 Ω en las líneas CLK y de datos</span> | Todas las variantes | Obligatorio |
| 4 | Las señales MCU8080 de LCDC1 están conectadas correctamente | Todas las variantes | Obligatorio |
| 5 | Las señales DSI están conectadas correctamente | Solo 555/557 | Obligatorio |
| 6 | La señal QSPI de LCDC2 está conectada correctamente | Solo 555/557 | Obligatorio |
| 7 | DSI_REXT se conecta a GND mediante una resistencia de 10 kΩ | Solo 555/557 | Obligatorio |
| 8 | La señal RSTB de LCDC está conectada correctamente | Todas las variantes | Obligatorio |
| 9 | La señal TE de LCDC está conectada correctamente (a la señal TE o Fmark del panel) | Todas las variantes | Obligatorio |
| 10 | <span class="flag-red">LCD SPI de 3 hilos: CS a GPIO22, PA31 o PB33; CLK a GPIO23, PA20 o PB32; DATA a GPIO21, PA34 o PB35.<br>Modo de 4 hilos: las mismas opciones de CS, CLK y DATA, y DC a GPIO20, PA36 o PB36</span> | Todas las variantes | Obligatorio |
| 11 | Las señales TP siguen la asignación de pines recomendada (consulte el archivo de configuración de E/S de la EVB) | Todas las variantes | Obligatorio |
| 12 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |
| 13 | Si el diseño debe admitir una pantalla siempre activa con la pantalla apagada, conecte la interfaz QSPI LCD a pines PA de la MCU; se recomiendan GPIO PB para señales de control como LCD_EN y LCD_RST | <span class="flag-red">Solo 551/SS6600A8</span> | Obligatorio |
| 14 | Si el diseño debe admitir una pantalla siempre activa con la pantalla apagada, conecte la interfaz QSPI LCD a pines PA de la MCU o conecte la interfaz MIPI LCD a la MCU; se recomiendan GPIO PB para señales de control como LCD_EN y LCD_RST | Solo 555/557 | Obligatorio |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabla 5.8.13-1: Lista de comprobación de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La entrada GPADC está conectada al pin correspondiente | Todas las variantes | Opcional |
| 2 | El rango de entrada GPADC es correcto; la tensión máxima de entrada no debe superar 1,0 V | Todas las variantes | Opcional |
| 3 | Divisor de tensión de batería recomendado: resistencia de 1 MΩ y 1 % en el lado de alimentación, resistencia de 220 kΩ y 1 % a tierra y condensador de filtro de 100 nF | Todas las variantes | Obligatorio |
| 4 | Para cada señal con divisor resistivo medida por GPADC, use resistencias divisoras con tolerancia del 1 %; <span class="flag-red">cada canal GPADC debe tener un condensador de filtro de 100 nF colocado cerca del pin del chip</span> | Todas las variantes | Obligatorio |

</div>

Las fuentes discrepan: la [guía de aplicación de hardware OpenSiFli, de mayor prioridad](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) describe un GPADC de 10 bits y cinco canales, con un rango de entrada de 0–0,9 V. El punto 2 de la [hoja de cálculo original V1.0 de la lista de comprobación](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) fija un máximo de 1,0 V, pero no especifica el número de canales. La [hoja de datos SF32LB55x V1.7.2, sección 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) especifica ocho entradas no diferenciales o cuatro pares diferenciales, con rangos de 0–1,1 V y −0,7 a 0,7 V, respectivamente; su tabla de pines enumera GPADC_CH0–CH7. La [guía ADC actual del SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) también asigna ocho canales (0–7) e indica 1,1 V como tensión máxima de muestreo. SiFli no ha explicado las diferencias en el número de canales ni en los límites de tensión. La fila 2 de la lista conserva el valor de 1,0 V de la hoja de cálculo; hasta que SiFli lo aclare por escrito, diseñe conforme al rango de 0–0,9 V de la guía de mayor prioridad y mantenga VADC en un máximo de 0,9 V. No trate 1,0 V ni 1,1 V como límites de diseño aprobados y confirme la disponibilidad de canales para el dispositivo y el encapsulado seleccionados.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabla 5.8.14-1: Lista de comprobación de SDMADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La entrada SDMADC está conectada al pin correspondiente | Solo 555/557 | Opcional |
| 2 | El rango de entrada SDMADC es correcto; la tensión máxima de entrada no debería superar 1,2 V | Solo 555/557 | Opcional |
| 3 | Las conexiones SDMADC_VREF y SDMADC_VSS_VREF son correctas | Solo 555/557 | Obligatorio |

</div>

### 5.8.15. Botones { #5815-buttons }

<div align="center"><em>Tabla 5.8.15-1: Lista de comprobación de botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Confirme con el cliente si el botón requiere capacidad de activación | Todas las variantes | Obligatorio |
| 2 | La conexión del botón es correcta: pull-up presente, valor de resistencia correcto y dominio de tensión del pull-up adecuado | Todas las variantes | Obligatorio |
| 3 | <span class="flag-red">El botón de encendido debe usar PB43, PB44, PB45, PB46, PB47 o PB48</span> | Todas las variantes | Obligatorio |
| 4 | Todas las señales de los botones tienen protección ESD | Todas las variantes | Obligatorio |

</div>

### 5.8.16. Protección EOS y ESD { #5816-eos-and-esd-protection }

<div align="center"><em>Tabla 5.8.16-1: Lista de comprobación de protección EOS y ESD</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La interfaz de carga incluye protección EOS, ESD y OVP | Todas las variantes | Obligatorio |
| 2 | La señal de detección de conexión del cargador tiene un dispositivo de protección ESD | Todas las variantes | Obligatorio |
| 3 | La interfaz de batería tiene un dispositivo de protección ESD | Todas las variantes | Obligatorio |
| 4 | La interfaz de antena tiene un dispositivo de protección ESD | Todas las variantes | Obligatorio |
| 5 | Las interfaces de alimentación de la LCD y del TP tienen dispositivos de protección ESD | Todas las variantes | Obligatorio |
| 6 | Las líneas I2C, RST e INT del TP tienen dispositivos de protección ESD | Todas las variantes | Obligatorio |
| 7 | La interfaz de alimentación y las líneas de señal del sensor de frecuencia cardíaca tienen dispositivos de protección ESD | Todas las variantes | Obligatorio |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabla 5.8.17-1: Lista de comprobación de I2C</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La asignación de I2C tiene en cuenta la distribución entre HCPU y LCPU y si el dispositivo debe funcionar en modo de bajo consumo | Todas las variantes | Obligatorio |
| 2 | Los pull-ups de I2C tienen el valor de resistencia adecuado; para funcionar a 400 kHz se recomiendan pull-ups de 2,2 kΩ. Use el dominio de tensión del periférico y desconecte la alimentación de los pull-ups junto con el periférico durante el apagado | Todas las variantes | Obligatorio |
| 3 | Cuando sea necesario, la señal de interrupción de I2C permite la activación por hardware | Todas las variantes | Obligatorio |
| 4 | Si varios dispositivos comparten un bus I2C, sus direcciones son distintas | Todas las variantes | Obligatorio |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabla 5.8.18-1: Lista de comprobación de I2S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | I2S1 solo admite entrada; conecte el micrófono a I2S1 según lo previsto | Todas las variantes | Opcional |
| 2 | I2S2 admite entrada y salida; conecte el decodificador de audio o códec a I2S2 según lo previsto | Todas las variantes | Opcional |
| 3 | Las señales I2S están conectadas correctamente | Todas las variantes | Opcional |
| 4 | La conexión del micrófono doble I2S es correcta | Todas las variantes | Opcional |
| 5 | Se han confirmado las especificaciones del micrófono y el chip es compatible con él | Todas las variantes | Opcional |
| 6 | Si se requiere MCLK, se ha confirmado que su conexión es correcta | Todas las variantes | Opcional |
| 7 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Opcional |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>Tabla 5.8.19-1: Lista de comprobación de PDM</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión PDM es correcta | Solo 555/557 | Opcional |
| 2 | La conexión de dos micrófonos digitales mediante PDM es correcta | Solo 555/557 | Opcional |
| 3 | Se han confirmado las especificaciones del micrófono y el chip es compatible con él | Solo 555/557 | Opcional |
| 4 | El nivel lógico de E/S del periférico coincide con el del chip principal | Solo 555/557 | Opcional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabla 5.8.20-1: Lista de comprobación de SPI</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión SPI es correcta: <span class="flag-red">SDO de la MCU se conecta a SDI del periférico y SDI de la MCU a SDO del periférico</span> | Todas las variantes | Opcional |
| 2 | Se han confirmado y se cumplen los requisitos de temporización del periférico SPI | Todas las variantes | Opcional |
| 3 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Opcional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabla 5.8.21-1: Lista de comprobación de USART</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Diseñe USART3 como interfaz de descarga y registro | Todas las variantes | Obligatorio |
| 2 | <span class="flag-red">Añada puntos de prueba a USART3 y, si es necesario, una resistencia pull-up; se recomienda una resistencia en serie de 100 Ω, ajustable según el diseño real</span> | Todas las variantes | Obligatorio |
| 3 | Conecte a USART1 o USART2 los dispositivos que deban funcionar en HCPU | Todas las variantes | Opcional |
| 4 | Conecte a USART4 o USART5 los dispositivos que deban funcionar en LCPU | Todas las variantes | Opcional |
| 5 | <span class="flag-red">Al conectar un periférico, conecte RXD de la MCU a TXD del periférico y TXD de la MCU a RXD del periférico</span> | Todas las variantes | Obligatorio |
| 6 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |
| 7 | Los puntos de prueba USART no utilizados se reservan como respaldo | Todas las variantes | Opcional |
| 8 | <span class="flag-red">Si UART1 se conecta a un dispositivo, reserve puntos de prueba</span> | Todas las variantes | Obligatorio |
| 9 | <span class="flag-red">Si UART se conecta a un chip UART-USB, RX y TX deben poder desconectarse</span> | Todas las variantes | Obligatorio |
| 10 | <span class="flag-red">Se recomienda usar la interfaz HCPU para el UART conectado a periféricos, para evitar que el software HCPU utilice una interfaz UART de LCPU</span> | Todas las variantes | Obligatorio |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabla 5.8.22-1: Lista de comprobación de PWM</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La asignación de pines PWM para la retroiluminación es correcta; use un GPTIMx distinto del del motor, preferentemente en la interfaz PB, para evitar que la reducción de frecuencia de HCPU afecte a la retroiluminación | Todas las variantes | Opcional |
| 2 | La asignación de pines PWM del motor es correcta; use un GPTIMx distinto del de la retroiluminación, preferentemente en la interfaz PB, para evitar que la reducción de frecuencia de HCPU afecte a la vibración | Todas las variantes | Opcional |
| 3 | Se recomienda asignar el pin PWM del motor a la interfaz PB, preferentemente PB24 o PB25, para evitar comportamientos anómalos durante la grabación al utilizar un motor SMT | Todas las variantes | Opcional |
| 4 | Las señales que requieran salida PWM deben usar la interfaz PB; compruebe también que no haya comportamientos anómalos durante el arranque en frío | Todas las variantes | Opcional |

</div>

### 5.8.23. Depuración { #5823-debug }

<div align="center"><em>Tabla 5.8.23-1: Lista de comprobación de depuración</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Las señales SWD están conectadas correctamente | Todas las variantes | Opcional |
| 2 | Reserve correctamente la referencia de alimentación de E/S en el conector J-Link o en los puntos de prueba | Todas las variantes | Opcional |
| 3 | <span class="flag-yellow">Para grabar unidades de producción SF32LB555x XXXX, además de PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33 y AVDD_BRF, también debe alimentarse AVDD_DSI</span> | Solo 555/557 | Obligatorio |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabla 5.8.24-1: Lista de comprobación de USB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión de la interfaz USB es correcta | Todas las variantes | Opcional |
| 2 | La interfaz USB tiene protección ESD | Todas las variantes | Opcional |
| 3 | Durante el funcionamiento normal, mientras USB permanezca habilitado, el lado del PC/dispositivo puede detectar la conexión y desconexión.<br>Si se deben detectar conexiones y desconexiones mientras la MCU está en suspensión, añada un divisor resistivo en VBUS; su salida debe ser un nivel alto que coincida con la tensión de E/S y conectarse a un pin de activación de la MCU. Se recomienda compartir el pin de activación de detección de conexión del cargador | Todas las variantes | Opcional |

</div>

### 5.8.25. Consumo de energía { #5825-power-consumption }

<div align="center"><em>Tabla 5.8.25-1: Lista de comprobación del consumo de energía</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | No se recomienda usar GPIO27 de QFN ni PA01 de BGA como entradas, ya que el pull-down interno de 20 kΩ puede reducir la tensión del nivel alto con un pull-up de gran valor o causar fugas excesivas con uno de bajo valor | Todas las variantes | Obligatorio |
| 2 | Si GPIO27 de QFN o PA01 de BGA se usa como salida, confirme que el circuito controlado permanece inactivo cuando la E/S no está excitada. Priorice su uso para controlar cargas de alto consumo, porque una salida alta de 1,8 V produce una fuga de unos 90 µA | Todas las variantes | Obligatorio |
| 3 | Si PA01 y PA03 se usan como GPIO, mantenga sus niveles de E/S iguales durante la suspensión o configure al menos uno como alta impedancia, sin pull-up ni pull-down | Todas las variantes | Obligatorio |
| 4 | PA77, PA78, PA79, PA80 y PB43-PB48 son diez pines capaces de despertar el chip. En el estado de apagado del modo Hibernate quedan en alta impedancia y se deshabilitan los PU/PD internos; añada pull-up o pull-down externos si no se puede garantizar de otro modo un nivel fijo | Todas las variantes | Obligatorio |
| 5 | Si se usa un pin PB de activación para generar una forma de onda, reserve un pull-up o pull-down externo aunque no se utilice Hibernate | Todas las variantes | Obligatorio |
| 6 | Para todos los pines de habilitación de MOSFET, LDO y DCDC, asegúrese de mantener el estado de encendido/apagado requerido durante Hibernate mediante resistencias pull-up o pull-down que establezcan el estado predeterminado | Todas las variantes | Obligatorio |
| 7 | Para señales GPIO que controlen una carga con nivel alto, use un pull-down de 1 MΩ cuando no afecte al funcionamiento, a fin de reducir las fugas | Todas las variantes | Obligatorio |
| 8 | Si una salida GPIO PA debe permanecer alta durante la suspensión, seleccione un pin PU | Todas las variantes | Obligatorio |
| 9 | Si una salida GPIO PA debe permanecer baja durante la suspensión, seleccione un pin PD | Todas las variantes | Obligatorio |
| 10 | El requisito de corriente en reposo para el modo Hibernate está documentado | Todas las variantes | Obligatorio |
| 11 | <span class="flag-red">La suma de las corrientes en reposo de los periféricos seleccionados en Hibernate está documentada y cumple los requisitos del proyecto</span> | Todas las variantes | Obligatorio |
| 12 | El requisito de corriente en reposo para el modo Standby está documentado | Todas las variantes | Obligatorio |
| 13 | <span class="flag-red">La suma de las corrientes en reposo de los periféricos seleccionados en Standby está documentada y cumple los requisitos del proyecto</span> | Todas las variantes | Obligatorio |
| 14 | Si los pines de activación PB43-PB48 se usan como salidas, reserve un pull-up o pull-down externo, ya que los pulls internos están deshabilitados en Standby | Todas las variantes | Obligatorio |

</div>

### 5.8.26. Descarga sin conexión y calibración del cristal { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>Tabla 5.8.26-1: Lista de comprobación de descarga sin conexión y calibración del cristal</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Si se necesita una placa de descarga sin conexión para grabar el firmware, reserve puntos de prueba para VBAT, GND, UART3_TXD, UART3_RXD, MODE y RESET | Todas las variantes | Opcional |
| 2 | Si se requiere calibrar el cristal, reserve PB08. Si PB08 se conecta a un periférico, se recomienda usarlo como salida y no conectar condensadores externos | Todas las variantes | Opcional |

</div>
