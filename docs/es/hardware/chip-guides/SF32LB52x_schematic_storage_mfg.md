---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de esquemático de la MCU SF32LB52x para almacenamiento, conectividad y fabricación: arranque, sensores, interfaz de depuración/descarga y grabación de producción."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB52x — Almacenamiento y fabricación { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página cubre las secciones 5.6-5.7 de las directrices de diseño esquemático: almacenamiento y conectividad, y fabricación. Vuelva a [RF e interfaces de usuario](SF32LB52x_schematic_rf_interfaces.md) o consulte la [Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) para revisar cada punto.

### 5.6. Almacenamiento y conectividad { #56-storage-and-connectivity }

#### 5.6.1. Almacenamiento { #561-storage }

**Resumen rápido**

- Las opciones de arranque externo incluyen SPI NOR, SPI NAND y SD NAND; eMMC está disponible en las variantes compatibles con alimentación externa regulada.
- Los pines bootstrap `PA13` y `PA17` seleccionan el medio de arranque.
- Las notas de aplicación y la guía de diseño de esquemáticos asignan `PA21` a la conmutación de la alimentación del almacenamiento de arranque, mientras que la lista de comprobación oficial asigna `PA11` a la Flash externa de las variantes alimentadas por batería. Confirme con SiFli qué pin de control corresponde al diseño concreto. Como requisito independiente, la Flash NOR de 32 MB o más conectada mediante MPI debe apagarse y volver a encenderse mediante PA21 para que la ROM pueda reconocerla tras un reinicio o al entrar en Hibernate. En las variantes con memoria integrada en el encapsulado, VDD_SIP debe apagarse durante Hibernate para evitar fugas en las E/S de esa memoria.

**Objetivo de diseño**

Elija el medio de arranque y la arquitectura de alimentación del almacenamiento en función del tamaño del firmware, la estrategia de actualización y los estados de bajo consumo. El diseño también debe permitir que la ROM arranque de forma fiable tras un reinicio o tras entrar en Hibernate.

##### 5.6.1.1. Descripción de la interfaz de almacenamiento { #5611-storage-interface-description }

El chip admite SPI NOR Flash, SPI NAND Flash y SD NAND Flash externos. **eMMC solo es compatible con las variantes 52B/D/E/G/J de alimentación regular (regular-powered).**

<div align="center"><em>Tabla 5.6-1: Conexiones de señales SPI NOR/NAND Flash</em></div>

<div align="center" markdown>

| Señal Flash | Pin de E/S | Descripción |
|:---|:---|:---|
| CS# | PA12 | Selección de chip, activa en nivel bajo |
| SO | PA13 | E/S de datos 1 |
| WP# | PA14 | E/S de datos 2 / protección contra escritura |
| SI | PA15 | E/S de datos 0 |
| SCLK | PA16 | Reloj serie |
| Hold# | PA17 | E/S de datos 3 / retención |

</div>

<div align="center"><em>Tabla 5.6-2: Conexiones de señales SD NAND Flash y eMMC</em></div>

<div align="center" markdown>

| Señal SD NAND/eMMC | Pin de E/S | Descripción |
|:---|:---|:---|
| SD2_CMD | PA15 | Comando |
| SD2_D1 | PA17 | Dato 1 |
| SD2_D0 | PA16 | Dato 0 |
| SD2_CLK | PA14 | Reloj |
| SD2_D2 | PA12 | Dato 2 |
| SD2_D3 | PA13 | Dato 3 |

</div>

!!! note "Dominios de alimentación de eMMC (solo variantes de alimentación regular)"
    Los dispositivos eMMC tienen dos dominios de alimentación: VCC y VCCQ. Opción 1: conmutar ambos; reduce la corriente en estado apagado, pero la recuperación de eMMC desde el modo de bajo consumo es más lenta y aumenta el consumo medio de CPU. Opción 2: conmutar solo VCC y mantener VCCQ siempre activo; la corriente en estado apagado es mayor que en la opción 1, pero eMMC se recupera más rápido y el consumo medio de CPU es menor.

!!! important "Resistencias de pull-up de las interfaces de almacenamiento"
    La nota de aplicación de las variantes con alimentación externa regulada indica: NOR Flash no requiere pull-up externo; SPI NAND requiere uno en PA17 (Hold#); SD NAND requiere pull-ups en PA13 (D3) y PA15 (CMD); eMMC los requiere en PA17 (D1), PA13 (D3) y PA15 (CMD). Se recomiendan 7,5 kΩ. La nota de las variantes con batería solo menciona las huellas de bootstrap PA13/PA17 y no aclara si también se necesita el pull-up PA15/CMD. No extrapole ese requisito de las variantes con alimentación regulada a las de batería sin confirmación; compruebe con SiFli los pull-ups de la variante y el medio de arranque concretos.

##### 5.6.1.2. Configuración de arranque { #5612-boot-configuration }

=== "SF32LB520/3/5/7 (alimentación por batería)"

    El chip admite el arranque desde memoria SPI NOR Flash integrada en el encapsulado o desde memoria SPI NOR Flash, SPI NAND Flash o SD NAND Flash externa (**no admite el arranque desde eMMC**):

    - SF32LB520Ux6 integra Flash en el encapsulado y arranca desde ella de forma predeterminada.
    - SF32LB523/5/7Ux6 integran PSRAM en el encapsulado y deben arrancar desde almacenamiento externo.

    ![Figura 5.6-1: Circuito recomendado para los pines bootstrap (variante alimentada por batería)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.6-1: Circuito recomendado para los pines bootstrap (variante alimentada por batería)</em></div>

    <div align="center"><em>Tabla 5.6-3: Ajustes de arranque (variante alimentada por batería)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Medio de arranque |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |

    </div>

=== "52B/D/E/G/J (alimentación regular)"

    El chip admite el arranque desde SPI NOR Flash integrada en el encapsulado, SPI NOR Flash externa, SPI NAND Flash externa, SD NAND Flash externa o memoria **eMMC** externa:

    - El modelo con Flash integrada en el encapsulado (SF32LB52BU36) arranca desde ella de forma predeterminada.
    - Los modelos con PSRAM integrada en el encapsulado (SF32LB52DUB6/EUB6/GUC6/JUD6) deben arrancar desde almacenamiento externo.

    ![Figura 5.6-2: Circuito recomendado para los pines bootstrap (variante de alimentación regular)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.6-2: Circuito recomendado para los pines bootstrap (variante de alimentación regular)</em></div>

    <div align="center"><em>Tabla 5.6-4: Ajustes de arranque (variante de alimentación regular)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Medio de arranque |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |
    | H | H | eMMC |

    </div>

    !!! note "Nota sobre la nomenclatura del documento original de SiFli"
        En esta sección, el documento original de SiFli usa los sufijos "SF32LB52AUx6" y "SF32LB52D/F/HUx6", que no coinciden con la nomenclatura B/D/E/G/J utilizada al inicio del mismo documento. Esta guía vuelve a expresar la diferencia según el tipo real de memoria integrada en el encapsulado (Flash o PSRAM). Si tiene dudas, verifique el modelo exacto del chip y su hoja de datos.

!!! important "Confirme las entradas de arranque que se solapan"
    Las notas de aplicación indican H/X para SD NAND, mientras que la guía de diseño de esquemáticos SF32LB52x independiente indica H/L; además, la nota de aplicación de las variantes de alimentación regular indica H/H para eMMC. Como X suele significar cualquiera de los dos niveles lógicos, las entradas de las variantes de alimentación regular se solapan y las fuentes no explican la diferencia. No deduzca los niveles finales de configuración solo a partir de estas tablas; confirme con SiFli la variante exacta y el comportamiento de la ROM. Los circuitos de referencia usan pull-ups de 7,5 kΩ: la figura 5.6-1 los conecta a VDD33_VOUT1 de 3,3 V y la figura 5.6-2 a VDDIOA de 3,3 V.

##### 5.6.1.3. Control de alimentación del almacenamiento de arranque { #5613-boot-storage-power-control }

Las guías de aplicación y de diseño de esquemáticos de OpenSiFli, de mayor prioridad, asignan `PA21` al control del interruptor (nivel alto: encendido; nivel bajo: apagado); utilice `PA21` como base de diseño respaldada por las fuentes. En cambio, el libro de Excel de comprobación enlazado desde la wiki de SiFli asigna `PA11` a la Flash externa de las variantes con batería. No utilice `PA11` basándose únicamente en ese libro de Excel. Este no aclara si `PA11` es otra señal de habilitación de la placa o una discrepancia de asignación; confirme con SiFli la red y la variante exactas antes de liberar el diseño.

=== "SF32LB520/3/5/7 (alimentación por batería)"

    - SF32LB520Ux6 integra Flash en el encapsulado: alimente VDD18_VOUT desde VDD33_VOUT1 y deshabilite el LDO interno VDD18_VOUT.
    - SF32LB523/5/7Ux6 integran PSRAM en el encapsulado: use el LDO interno; también es posible suministrar VDD18_VOUT externamente.
    - Alimente la NOR Flash externa desde VDD33_VOUT1; no hace falta añadir otro interruptor de alimentación.
    - Alimente SPI NAND o SD NAND externas desde VDD33_VOUT1 y añada un interruptor de alimentación.
    - El diseño de referencia reserva huellas para resistencias pull-up en PA13 y PA17; móntelas según el tipo de almacenamiento. Se recomiendan 7,5 kΩ.

=== "52B/D/E/G/J (alimentación regular)"

    - Para el modelo con Flash integrada en el encapsulado (SF32LB52BU36), añada un interruptor de alimentación en VDD_SIP.
    - Para los modelos con PSRAM integrada en el encapsulado (SF32LB52DUB6/EUB6/GUC6/JUD6), el interruptor de VDD_SIP es opcional si PVDD = 3,3 V y VDD_SIP usa el LDO interno; es obligatorio si PVDD = 1,8 V.
    - La alimentación del almacenamiento externo es independiente de VDD_SIP; añada un interruptor de alimentación separado.
    - Consulte la sección 5.6.1.1 para conocer las alternativas de los dominios VCC/VCCQ de eMMC.
    - La nota de aplicación asigna **PA21** a los interruptores de alimentación del almacenamiento relacionados con el arranque; la discrepancia entre las fuentes sobre la Flash externa de las variantes alimentadas por batería se señala más arriba.
    - Las memorias NOR Flash de 32 MB o más conectadas mediante MPI (Memory Peripheral Interface, interfaz de periféricos de memoria para SPI-NOR/SPI-NAND) deben poder desconectarse mediante PA21. Así, salen del modo de 4 bytes al reiniciar la MCU o entrar en Hibernate; de lo contrario, la ROM no reconocerá la Flash. Las NOR Flash de 16 MB o menos pueden permanecer siempre alimentadas.
    - El diseño de referencia reserva huellas para resistencias pull-up en PA13 y PA17; móntelas según el tipo de almacenamiento. Se recomiendan 7,5 kΩ.

**Errores frecuentes en el diseño del almacenamiento**

- Omitir las resistencias bootstrap o montarlas para un medio de arranque incorrecto.
- Dejar sin conectar el control del interruptor de alimentación del almacenamiento de arranque confirmado por la fuente.
- Suponer que eMMC está disponible en todas las variantes.
- Mantener siempre alimentada una NOR Flash grande cuando el modo de 4 bytes puede impedir que la ROM la reconozca tras un reinicio.

**Lista de comprobación del almacenamiento**

- [ ] El medio de arranque se ha seleccionado y documentado antes del diseño de la PCB.
- [ ] Las opciones de polarización bootstrap de `PA13`/`PA17` coinciden con la tabla de arranque.
- [ ] Los interruptores de alimentación necesarios para el almacenamiento de arranque se controlan mediante el pin confirmado por la fuente para la variante; la discrepancia PA11/PA21 se ha resuelto con SiFli.
- [ ] Se han evaluado las alternativas de VCC/VCCQ de eMMC para los diseños con alimentación regular.
- [ ] El plan de puesta en marcha incluye la selección del modo de arranque, la temporización de la alimentación del almacenamiento, la lectura del ID y la descarga del firmware.

#### 5.6.2. Sensores { #562-sensors }

**Resumen rápido**

- Los sensores suelen conectarse mediante I2C o SPI. Desconecte la alimentación de los sensores no utilizados para reducir la corriente en espera; mantenga los necesarios para despertar el sistema en el modo de funcionamiento requerido.
- Asigne las interrupciones de sensores que se usarán para activar el sistema antes de cerrar la asignación de pines.

**Objetivo de diseño**

Garantice la alimentación, las interrupciones y el bus de los sensores, y permita que los sensores no utilizados se apaguen correctamente en los modos de bajo consumo.

SF32LB52x puede conectarse a sensores de frecuencia cardíaca, acelerómetros, sensores geomagnéticos y otros similares. Para conmutar su alimentación, elija un interruptor de carga con Iq bajo.

**Lista de comprobación de sensores**

- [ ] Se han asignado los pines de bus, interrupción, reinicio y habilitación de alimentación de los sensores.
- [ ] La corriente de reposo (Iq) y la corriente de apagado del interruptor de carga de los sensores cumplen el objetivo de espera.
- [ ] Las resistencias pull-up están conectadas a la línea de tensión de E/S correcta del sensor.
- [ ] El plan de puesta en marcha incluye el escaneo del bus, la activación por interrupción y el ciclo de alimentación del sensor.

#### 5.6.3. Asignación de pines UART e I2C { #563-uart-and-i2c-pin-assignment }

**Resumen rápido**

- Las funciones UART e I2C pueden asignarse a cualquier pin PA.
- Aun así, la elección de pines debe tener en cuenta las restricciones de arranque, activación, depuración, pruebas de producción y trazado de la placa.

**Objetivo de diseño**

Aproveche la asignación flexible de pines para simplificar el trazado sin ocupar los pines necesarios para bootstrap, activación, acceso de depuración o el utillaje de producción.

SF32LB52x permite asignar las funciones UART e I2C a cualquier pin PA.

**Lista de comprobación UART/I2C**

- [ ] Las resistencias pull-up, los dominios de tensión y la capacitancia son adecuados en cada bus I2C.
- [ ] Se puede acceder a los pines UART necesarios para registros, descarga o módulos externos.
- [ ] La multiplexación de pines no entra en conflicto con las funciones bootstrap, activación, pantalla, almacenamiento o depuración.

#### 5.6.4. Asignación de pines GPTIM { #564-gptim-pin-assignment }

**Resumen rápido**

- Las funciones GPTIM pueden asignarse a cualquier pin PA.
- Las funciones del temporizador permiten salidas PWM, captura de entrada, control de motor, control de retroiluminación y temporización específica del producto.

**Objetivo de diseño**

Planifique con tiempo las funciones que requieren temporizador para evitar que, al final del diseño, PWM, captura o temporización deban asignarse a pines difíciles de trazar o incompatibles con la activación.

SF32LB52x permite asignar las funciones GPTIM a cualquier pin PA.

**Lista de comprobación GPTIM**

- [ ] Los canales de temporizador necesarios para PWM, captura o bucles de control figuran en la tabla de pines.
- [ ] Los pines GPTIM no entran en conflicto con los requisitos de retroiluminación, motor, depuración o almacenamiento.
- [ ] El plan de puesta en marcha incluye la comprobación de la frecuencia PWM, el rango del ciclo de trabajo y la polaridad del pin.

### 5.7. Fabricación { #57-manufacturing }

#### 5.7.1. Interfaz de depuración y descarga { #571-debug-and-download-interface }

**Resumen rápido**

- Tras el encendido, `PA18` y `PA19` están configurados de forma predeterminada como DBG_UART y se multiplexan con SWD.
- Reserve acceso físico a los pines de depuración/descarga en todas las placas de prototipo y producción.

**Objetivo de diseño**

Garantice el acceso para cargar firmware, consultar registros de depuración, depurar paso a paso y recuperar el sistema tras un fallo, incluso después de definir la carcasa y el utillaje de producción.

SF32LB52x admite la interfaz DBG_UART para descarga y depuración, conectada a un PC mediante un adaptador UART-USB de 3,3 V. SWD y DBG_UART se multiplexan en PA18 y PA19; la configuración predeterminada tras el encendido es DBG_UART, que permite tanto la depuración paso a paso como la salida de registros.

Para la depuración paso a paso y la salida de registros mediante DBG_UART, consulte los manuales de SFtool e Impeller.

<div align="center"><em>Tabla 5.7-1: Conexiones del puerto de depuración</em></div>

<div align="center" markdown>

| Señal de depuración | Pin | Descripción |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | Recepción UART de depuración |
| DBG_UART_TXD | PA19 | Transmisión UART de depuración |

</div>

**Lista de comprobación de depuración**

- [ ] `PA18`/`PA19`, masa y la referencia de alimentación necesaria están disponibles en pads de prueba o pines de conector.
- [ ] El acceso de depuración sigue disponible después de montar la carcasa, la batería y la pantalla.
- [ ] El nivel de tensión UART de 3,3 V es compatible con el adaptador o utillaje seleccionado.
- [ ] Se ha documentado el procedimiento de recuperación de una placa que no puede arrancar el firmware de aplicación.

#### 5.7.2. Grabación de producción y calibración del cristal { #572-production-flashing-and-crystal-calibration }

**Resumen rápido**

- La grabación de producción y la calibración del cristal requieren una alimentación estable, acceso a DBG_UART, PA01 y los puntos de prueba necesarios de alimentación y masa.
- Diseñe el acceso del utillaje antes de cerrar el contorno mecánico de la PCB y la carcasa.

**Objetivo de diseño**

Permita grabar, calibrar y recuperar todas las placas de producción sin soldaduras manuales ni desmontar el producto.

SiFli proporciona una herramienta de descarga sin conexión para grabar el firmware de producción y calibrar el cristal. Reserve en el diseño de hardware, como mínimo, estos puntos de prueba: PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD y PA01. Consulte el documento «Offline Downloader User Guide», incluido en el paquete de desarrollo, para conocer el procedimiento detallado de grabación y calibración.

**Lista de comprobación de producción**

- [ ] Se han reservado puntos de prueba para PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD y PA01.
- [ ] El utillaje previsto puede acceder a los pads de prueba después del montaje mecánico.
- [ ] Se han definido con fabricación el flujo de calibración del cristal y los límites de aceptación/rechazo.
- [ ] Los registros de grabación, calibración y pruebas funcionales se pueden asociar a la revisión de la placa.

#### 5.7.3. Listas de comprobación de esquemático y PCB { #573-schematic-and-pcb-drawing-checklists }

Use la [lista oficial de comprobación de esquemático y PCB][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] publicada en la wiki de SiFli como criterio formal de liberación. Consulte la [Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) para ver la versión completa, punto por punto. Las listas de esta guía ayudan a detectar problemas de ingeniería habituales antes de la revisión formal.

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**Lista de comprobación de liberación**

- [ ] Se han completado la lista de comprobación del esquemático, la de PCB, la revisión AVL y los informes DRC y de impedancia.
- [ ] Se han archivado capturas de pantalla como evidencia de alimentación, reloj, RF, pantalla, almacenamiento, audio, USB, SDIO, DC/DC y acceso para pruebas de producción.
- [ ] Las hipótesis específicas de cada variante están documentadas en las notas de revisión.
- [ ] Se ha asignado un responsable a cada riesgo de hardware pendiente antes de la liberación.
