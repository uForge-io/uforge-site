---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directrices de diseño de esquemáticos para la MCU SF32LB52x: diseño del sistema mínimo, sistema de alimentación y generación de reloj."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware de SF32LB52x — Directrices de diseño de esquemáticos { #sf32lb52x-hardware-design-guide-schematic-design-guidelines }

!!! note "Parte de la guía de diseño de hardware de SF32LB52x"
    Las directrices de diseño de esquemáticos se dividen ahora en tres páginas: esta página (secciones 5.1-5.3: sistema mínimo, alimentación y reloj), [RF e interfaces de usuario](SF32LB52x_schematic_rf_interfaces.md) (secciones 5.4-5.5) y [almacenamiento y fabricación](SF32LB52x_schematic_storage_mfg.md) (secciones 5.6-5.7). Consulte primero la [descripción general de la guía de diseño de hardware de SF32LB52x](SF32LB52x_hardware_design_guide.md) para elegir el dispositivo y conocer el flujo de diseño completo, o use la [lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) para revisar cada punto.

## 5. Directrices de diseño de esquemáticos { #5-schematic-design-guidelines }

Este capítulo sigue el flujo de diseño del esquemático a lo largo de tres páginas. Primero complete la revisión del sistema mínimo; después, revise en esta página la alimentación y la generación de reloj, en la siguiente la RF y las interfaces de usuario, y en la última el almacenamiento, el acceso para fabricación y las decisiones que dependen de la PCB. Para cada bloque, confirme el objetivo de diseño y las variantes aplicables antes de comprobar los requisitos del circuito, la asignación de pines, los errores frecuentes y los criterios de aprobación.

<div align="center"><em>Tabla 5-1: Navegación del capítulo de esquemáticos</em></div>

<div align="center" markdown>

| Bloque | Decisión principal | Evidencias para aprobar el diseño |
|:---|:---|:---|
| Diseño del sistema mínimo | Variante y encapsulado exactos, almacenamiento de arranque, pines de configuración, acceso de depuración/descarga y ruta mínima de puesta en marcha | Revisión del sistema mínimo, tabla de configuración, puntos de prueba de depuración y plan de arranque y recuperación |
| Sistema de alimentación | Árbol de alimentación por variante, ruta del cargador, BUCK, LDO, alimentación del almacenamiento de arranque, modos de funcionamiento y fuentes de activación | Revisión del árbol de alimentación, componentes de la AVL, ajustes del cargador/OVP y plan de bajo consumo y activación |
| Generación de reloj | Selección de cristales de 48 MHz y 32,768 kHz, carga e hipótesis de calibración | Verificación de CL/ESR, capturas de colocación y enrutamiento, plan de calibración |
| RF | Adaptación de RF, ruta de antena y acceso para ajuste | Plan de impedancia de RF, captura de ubicación de la red de adaptación y plan de ajuste de antena |
| Interfaces de usuario | Pantalla, audio, botones y motor de vibración | Revisión del esquemático de interfaces, pines de temporización/control, secuencia de alimentación y revisión analógica |
| Almacenamiento y conectividad | Medio de arranque, pines de configuración, interruptor de alimentación del almacenamiento, sensores, UART/I2C y GPTIM | Tabla de configuración, discrepancia PA11/PA21 en las fuentes, asignación de buses y revisión de la alimentación del almacenamiento |
| Fabricación | DBG_UART/SWD, puntos de prueba, grabación de producción, acceso para calibración y listas de liberación | Plano de puntos de prueba, plan del útil de producción y evidencias de liberación completas |

</div>

### 5.1. Diseño del sistema mínimo { #51-minimum-system-design }

El diseño del sistema mínimo es la primera etapa de revisión que debe superar el esquemático de una placa SF32LB52x. Abarca las decisiones que deben ser correctas antes de añadir los periféricos del producto: variante y encapsulado exactos, árbol de alimentación, medio de arranque, resistencias de configuración, control de alimentación del almacenamiento, acceso de depuración/descarga, fuentes de reloj y comportamiento de activación. A menudo se pueden admitir cambios tardíos en el cableado de la pantalla o los sensores; en cambio, una configuración incorrecta de los pines de arranque del almacenamiento, la falta de acceso de depuración, una alimentación inestable o una hipótesis errónea sobre los estados de alimentación pueden impedir el funcionamiento normal de la placa.

Siga esta secuencia durante la primera revisión del esquemático:

1. Seleccione el dispositivo y el encapsulado exactos según las secciones 3.2 y 3.3.
2. Elija la ruta de alimentación adecuada: `SF32LB520/3/5/7` para productos con batería recargable o `52B/D/E/G/J` para productos alimentados por una fuente regulada externa.
3. Defina las decisiones de alimentación de la sección 5.2: `VBUS`/`VBAT`/`VCC` o `PVDD`/`VDDIOA`/`VDD_SIP`, BUCK, desacoplamiento de los LDO internos, líneas de alimentación de RF/audio y todos los interruptores de carga de bajo consumo.
4. Seleccione el medio de arranque e implemente las opciones de resistencias pull de configuración en `PA13`/`PA17` según la tabla de arranque de la sección 5.6.1.
5. Confirme el pin de control de los interruptores de alimentación del almacenamiento de arranque antes de cerrar el diseño. Las notas de aplicación y la guía del esquemático indican `PA21`, pero la lista de comprobación oficial indica `PA11` para la Flash externa en las variantes con batería.
6. Reserve `PA18`/`PA19`, tierra y una referencia de alimentación válida para el acceso DBG_UART/SWD antes de cerrar el diseño de la carcasa y del útil de producción.
7. Seleccione los cristales de 48 MHz y 32,768 kHz indicados en la sección 5.3.1 y tenga presentes sus restricciones de ubicación durante la revisión del esquemático.
8. Asigne los pines de activación, el comportamiento del botón de encendido, los eventos del cargador y los estados de apagado del almacenamiento/sensores antes de cerrar la política de bajo consumo del firmware.

Al terminar este punto de control, el esquemático debe permitir encender la placa, arrancar desde el medio seleccionado, disponer de una ruta de recuperación, calibrar el reloj y entrar en el estado de bajo consumo previsto sin depender de periféricos opcionales del producto.

### 5.2. Sistema de alimentación { #52-power-system }

El diseño del sistema de alimentación define las líneas, los interruptores de carga, la ruta del cargador, OVP, el uso de los LDO internos, el comportamiento de activación y los estados de bajo consumo que garantizan la fiabilidad del sistema mínimo. Complete esta sección antes de ubicar los componentes en la PCB, ya que las decisiones posteriores sobre pantalla, almacenamiento, RF, audio y sensores dependen de estas condiciones de alimentación.

#### 5.2.1. Fuente de alimentación { #521-power-supply }

**Resumen**

- Los dispositivos con batería utilizan la ruta `SF32LB520/3/5/7`, con decisiones de diseño para `VBUS`, `VBAT`, `VCC`, la carga y OVP.
- Los dispositivos con alimentación externa regulada usan la ruta `52B/D/E/G/J`, con `PVDD` y `VDDIOA` regulados externamente. Configure `VDD_SIP` según el modelo exacto: puede usar una fuente externa o el LDO interno. No hay circuito de carga interno.
- Antes de ubicar componentes en la PCB, defina el inductor BUCK, el desacoplamiento de los LDO internos, las líneas de alimentación de RF/audio y los interruptores de carga en espera.

**Objetivo de diseño**

Diseñe un árbol de alimentación estable y con baja corriente de fuga que admita la variante seleccionada, evite sobrecargar las salidas de los LDO internos, mantenga limpias las líneas de alimentación de RF y audio y permita desconectar las cargas no utilizadas y el almacenamiento de arranque en los modos de bajo consumo.

##### 5.2.1.1. Requisitos de alimentación del procesador { #5211-processor-power-supply-requirements }

=== "SF32LB520/3/5/7 (alimentación por batería)"

    <div align="center"><em>Tabla 5.2-1: Requisitos de alimentación (variante con batería)</em></div>

    <div align="center" markdown>

    | Pin | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
    |:---|:---|:---|:---|:---|:---|
    | VBUS | 4.5 | 5.0 | 5.5 | 500 | Entrada de alimentación VBUS; consulte la nota de discrepancia de fuentes |
    | VBAT | 3.2 | - | 4.7 | 500 | Salida de alimentación VBAT |
    | VCC | 3.2 | - | 4.7 | 500 | Entrada de alimentación del sistema (1) |
    | VSYS | - | 3.3 | - | 500 | Salida de alimentación VSYS (2) |
    | BUCK_LX | - | 1.25 | - | 50 | Salida BUCK; se conecta al inductor |
    | BUCK_FB | - | 1.25 | - | 50 | Entrada de realimentación BUCK/alimentación interna; se conecta al otro extremo del inductor y a un condensador externo |
    | VDD_VOUT1 | - | 1.1 | - | 50 | LDO interno, condensador externo; no alimenta periféricos |
    | VDD_VOUT2 | - | 0.9 | - | 20 | LDO interno, condensador externo; no alimenta periféricos |
    | VDD_RET | - | 0.9 | - | 1 | LDO interno, condensador externo; no alimenta periféricos |
    | VDD_RTC | - | 1.1 | - | 1 | LDO interno, condensador externo; no alimenta periféricos |
    | VDD18_VOUT | - | 1.8 | - | 30 | Alimentación SIP (3), interna; no alimenta periféricos. Se puede alimentar externamente al deshabilitar el LDO |
    | VDD33_VOUT1 | - | 3.3 | - | 150 | Salida 1 del LDO de 3,3 V (4); está desactivada de forma predeterminada y requiere configuración por software |
    | VDD33_VOUT2 | - | 3.3 | - | 150 | Salida 2 del LDO de 3,3 V; está desactivada de forma predeterminada y requiere configuración por software |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | Entrada de alimentación de audio de 3,3 V |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentación de RF |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Salida de alimentación del micrófono |

    </div>

    (1) Con batería de litio en la entrada VCC, el umbral predeterminado de batería baja del software es 3,48 V. Con una fuente de tensión constante, el rango admitido es de 3,6 a 4,7 V; se recomiendan 3,8 V.
    (2) VSYS alimenta AVDD_BRF.
    (3) VDD18_VOUT: SF32LB520U36 requiere una fuente externa de 3,3 V; SF32LB523/5/7Ux6 utiliza el LDO interno y no necesita alimentación externa. Configure por software el LDO VDD18 interno según el modelo del chip y no lo habilite cuando la alimentación sea externa.
    (4) VDD33_VOUT1: en SF32LB520U36 solo alimenta VDD18_VOUT, la memoria Flash externa y AVDD33_AUD; en SF32LB523/5/7Ux6 solo alimenta la memoria Flash externa y AVDD33_AUD.

=== "52B/D/E/G/J (alimentación externa regulada)"

    <div align="center"><em>Tabla 5.2-2: Requisitos de alimentación (variante con alimentación externa regulada)</em></div>

    <div align="center" markdown>

    | Pin | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
    |:---|:---|:---|:---|:---|:---|
    | PVDD | 2.97 | 3.3 | 3.63 | 150 | Entrada de alimentación del sistema PVDD, condensador de 10 µF |
    | BUCK_LX | - | 1.25 | - | 50 | Salida BUCK; se conecta a un inductor de 4,7 µH |
    | BUCK_FB | - | 1.25 | - | 50 | Entrada de realimentación BUCK/alimentación interna; se conecta al otro extremo del inductor y a un condensador de 4,7 µF |
    | VDD_VOUT1 | - | 1.1 | - | 50 | LDO interno, condensador de 4,7 µF; no alimenta periféricos |
    | VDD_VOUT2 | - | 0.9 | - | 20 | LDO interno, condensador de 4,7 µF; no alimenta periféricos |
    | VDD_RET | - | 0.9 | - | 1 | LDO interno, condensador de 0,47 µF; no alimenta periféricos |
    | VDD_RTC | - | 1.1 | - | 1 | LDO interno, condensador de 1 µF; no alimenta periféricos |
    | VDDIOA | 1.71 | 1.8/3.3 | 3.63 | - | Entrada de alimentación de GPIO, condensador de 1 µF |
    | AVDD33 | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentación analógica de 3,3 V, condensador de 4,7 µF |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | Entrada de alimentación de audio de 3,3 V, condensador de 2,2 µF |
    | VDD_SIP | 1.71 | 1.8/3.3 | 3.63 | 30 | LDO interno o fuente externa (1), condensador de 1 µF |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentación analógica, condensador de 4,7 µF |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Salida de alimentación del micrófono, condensador de 1 µF |

    </div>

    (1) VDD_SIP: SF32LB52BU36 requiere una fuente externa de 1,8 V o 3,3 V; SF32LB52BU56 requiere una fuente externa de 3,3 V; SF32LB52DUB6 requiere una fuente externa de 1,8 V; SF32LB52E/G/JUx6 se alimenta directamente desde el LDO interno y no necesita una fuente externa.

    !!! important "Nota sobre el modo Hibernate"
        Al entrar el sistema en modo Hibernate, apague VDD_SIP; de lo contrario, puede producirse una corriente de fuga a través de las E/S de la memoria integrada en el mismo encapsulado. Use el pin dedicado PA21 para controlar el interruptor de alimentación de VDD_SIP.

##### 5.2.1.2. Selección del inductor BUCK { #5212-buck-inductor-selection }

Ambos grupos de diseño utilizan la misma especificación de inductor.

!!! important "Parámetros principales del inductor de alimentación"
    L (inductancia) = 4,7 µH ± 20 %, DCR (resistencia de CC) ≤ 0,4 Ω, Isat (corriente de saturación) ≥ 450 mA.

##### 5.2.1.3. Control de batería y carga { #5213-battery-and-charging-control }

=== "SF32LB520/3/5/7 (alimentación por batería)"

    Hay dos opciones para el circuito de carga: usar un chip externo de gestión de carga o el módulo de gestión de carga integrado en el chip.

    **Chip externo de gestión de carga**

    Los chips de carga externos suelen ser de dos tipos: sin PPM (gestión de la ruta de alimentación) y con PPM. Sin PPM, la batería alimenta directamente los pines VBAT y VCC. Con PPM, VSYS del cargador alimenta VCC y VBAT del cargador se conecta tanto a la batería como al pin VBAT del chip. En ambos casos, la tensión de la batería se mide a través del pin VBAT, que incorpora un canal GPADC con una precisión de muestreo de ±30 mV.

    ![Figura 5.2-1: Circuito de carga externo sin PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-1: Circuito de carga externo sin PPM</em></div>

    ![Figura 5.2-2: Circuito de carga externo con PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-2: Circuito de carga externo con PPM</em></div>

    Con PPM, conecte la salida VSYS del cargador al pin VCC del chip y mantenga la tensión de salida predeterminada de VSYS del cargador en 4,7 V como máximo, que es la tensión máxima de entrada de VCC.

    **Módulo de gestión de carga integrado en el chip**

    Con el módulo de carga integrado, si la batería está baja y el dispositivo apagado, al conectar el cargador la batería debe alcanzar el umbral de encendido antes de que el sistema pueda arrancar y mostrar la pantalla de carga.

    ![Figura 5.2-3: Circuito de gestión de carga integrado](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-3: Circuito de gestión de carga integrado</em></div>

    **Selección del chip OVP (al usar el módulo de carga integrado)**

    El rango de entrada de VBUS es de 4,5 a 5,5 V. Elija uno de estos tipos de chip OVP:

    - Chip OVP con OVLO ajustable, por ejemplo, AW32905FCR: ajuste OVLO entre 5,2 y 5,5 V (tolerancia de VOVLO_TH ≤3 % y tolerancia de las resistencias ≤1 %).
    - Chip OVP con salida regulada, por ejemplo, SGM4064YDE8G o LP5305AQVF: la salida del regulador debe estar entre 4,5 y 5,4 V.

    !!! important "Límites de VBUS y OVP: discrepancia en la fuente"
        La nota de aplicación OpenSiFli para variantes con batería contiene valores de VBUS incompatibles: el apartado de selección de OVP indica 4,5–5,5 V para el pin VBUS del chip, mientras que la tabla de alimentación y las notas del cargador integrado indican 4,6–5,5 V y exigen al menos 4,6 V en el pin con la corriente máxima de carga. Electrical Specification-A3 da un rango general de 4,5–5,5 V y el esquemático de carga de referencia está rotulado 4,3–5,5 V. En diseños con cargador integrado, mantenga al menos 4,6 V en el pin bajo carga máxima hasta que SiFli aclare el mínimo aplicable; no considere los 4,3 V del esquemático un límite inferior aprobado.

        La misma guía establece `VIN_OVLO` entre 5,2 y 5,5 V para los dispositivos OVP con OVLO ajustable; la tolerancia de `VOVLO_TH` debe ser ≤3 % y la de R1/R2, ≤1 %. Para los dispositivos OVP con salida regulada, especifica una salida LDO de 4,5–5,4 V. Son ajustes propios de cada topología OVP, no rangos de funcionamiento de VBUS del chip que puedan intercambiarse. Tenga en cuenta las tolerancias de los componentes y confirme con SiFli el diseño aprobado.

    ![Figura 5.2-4: Fórmula del umbral OVLO](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-4: Fórmula del umbral OVLO</em></div>

    ![Figura 5.2-5: Circuito de aplicación OVP con OVLO ajustable](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-5: Circuito de aplicación OVP con OVLO ajustable</em></div>

    ![Figura 5.2-6: Circuito de aplicación OVP con salida regulada](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-6: Circuito de aplicación OVP con salida regulada</em></div>

    !!! important "Notas sobre el módulo de carga integrado"
        - Rango de entrada de VBUS: 4,6-5,5 V
        - Rango de entrada de VCC: 3,2-4,7 V
        - Corriente de precarga predeterminada: 56 mA; tensión de transición de precarga a corriente constante: 3,0 V
        - Corriente de carga constante predeterminada: 65 mA; ajustable entre 5 y 560 mA
        - Tensión de carga completa predeterminada: 4,2 V; ajustable hasta 4,45 V
        - Tensión de recarga: tensión de carga completa - 0,15 V
        - VBUS del cargador debe suministrar al menos 350 mA; la tensión del pin VBUS no debe caer por debajo de 4,6 V con la corriente máxima de carga.
        - En la carga inalámbrica, asegúrese de que la fuente pueda suministrar más que la corriente de carga constante.

    !!! important "Notas sobre los LDO integrados"
        - La capacitancia total en las salidas VDD33_VOUT1 y VDD33_VOUT2 no debe superar 9,6 µF.
        - AVDD33_AUD debe alimentarse desde VDD33_VOUT1, no desde VSYS.
        - No alimente la pantalla LCD desde el LDO interno; use un LDO externo.

=== "52B/D/E/G/J (alimentación externa regulada)"

    !!! info "No aplicable"
        La variante con alimentación externa regulada recibe energía directamente de una fuente estabilizada y **no incorpora un circuito de gestión de carga**. Esta sección no es aplicable. Si el producto necesita batería y carga, utilice la serie SF32LB520/3/5/7.

##### 5.2.1.4. Reducción del consumo en espera { #5214-reducing-standby-power }

=== "SF32LB520/3/5/7 (alimentación por batería)"

    Estructura de alimentación recomendada: **VDD33_VOUT2** alimenta el motor de vibración; **VDD33_VOUT1**, la memoria Flash externa y los sensores; y la pantalla LCD utiliza un LDO externo.

    ![Figura 5.2-7: Diagrama de alimentación del sistema SF32LB52x](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-7: Diagrama de alimentación del sistema SF32LB52x</em></div>

    Defina con cuidado el estado de hardware predeterminado de las GPIO que controlan los interruptores de alimentación y añada resistencias pull-up/pull-down del orden de megaohmios para que los interruptores de carga permanezcan apagados por defecto. Para los LDO e interruptores de carga, elija componentes con baja corriente en reposo (Iq) y baja corriente de apagado (Istb); preste especial atención a Iq en los dispositivos de alimentación siempre activos.

=== "52B/D/E/G/J (alimentación externa regulada)"

    Utilice interruptores de carga para gestionar dinámicamente la alimentación de cada bloque funcional; para los módulos o las líneas siempre activos, elija componentes con baja corriente en reposo.

    Defina con cuidado el estado de hardware predeterminado de las GPIO que controlan los interruptores de alimentación y añada resistencias pull-up/pull-down del orden de megaohmios para que los interruptores de carga permanezcan apagados por defecto. Para los LDO e interruptores de carga, elija componentes con baja corriente en reposo (Iq) y baja corriente de apagado (Istb); preste especial atención a Iq en los dispositivos de alimentación siempre activos.

##### 5.2.1.5. Lista de comprobación del diseño de alimentación { #5215-power-design-checklist }

- [ ] Se ha seleccionado la variante de alimentación correspondiente al modelo exacto del chip: por batería o con alimentación externa regulada.
- [ ] El inductor BUCK cumple 4,7 uH ±20 %, DCR ≤0,4 Ω e Isat ≥450 mA.
- [ ] Todos los condensadores de desacoplamiento de los LDO internos están colocados según los requisitos.
- [ ] La alimentación de la pantalla LCD está aislada y no procede directamente del LDO interno.
- [ ] Las líneas de alimentación de audio y RF están filtradas correctamente.
- [ ] Variante con batería: se han verificado la ruta de carga y los rangos de tensión del dispositivo OVP. Variante con alimentación externa regulada: VDD_SIP/VDDIOA está configurado según el modelo del chip.

**Errores frecuentes en la alimentación**

- Alimentar la pantalla LCD directamente desde un LDO interno en vez de usar un LDO externo.
- Mezclar en el mismo esquemático los requisitos de alimentación con batería y con alimentación externa regulada.
- Mantener `VDD_SIP` alimentado durante Hibernate en variantes donde existe riesgo de fuga en el almacenamiento.
- Elegir un cargador o dispositivo OVP sin comprobar la corriente y el rango de tensión de VBUS en las condiciones más desfavorables.

**Comprobaciones de puesta en marcha de la alimentación**

- Mida `VCC`/`PVDD`, la salida BUCK, las líneas de alimentación de RF/audio y la alimentación del almacenamiento antes de que el firmware habilite los periféricos.
- En diseños con batería, compruebe la conexión del cargador, la precarga, la carga a corriente constante y el comportamiento de recarga.
- Mida la corriente en espera y en Hibernate con apagados los interruptores de carga de la pantalla, los sensores, el almacenamiento y el motor.

#### 5.2.2. Modos de funcionamiento y fuentes de activación { #522-operating-modes-and-wake-sources }

**Resumen**

- Active y Sleep mantienen una respuesta rápida a las interrupciones; DeepSleep y Standby reducen la corriente a cambio de un mayor tiempo de activación.
- Hibernate es el estado de menor consumo, pero no conserva la SRAM y exige apagar algunas fuentes externas.
- La selección de GPIO capaces de activar el sistema afecta a los botones, la interrupción táctil, los eventos del cargador y la activación por sensores.

**Objetivo de diseño**

Seleccione las fuentes de activación y los estados predeterminados de los interruptores de alimentación externos para que el producto entre en el estado de bajo consumo previsto sin corrientes de fuga ni eventos de activación perdidos.

!!! note "Diseño común a la familia"
    Los modos de funcionamiento y el comportamiento de las fuentes de activación son comunes a la familia SF32LB52x, salvo que el árbol de alimentación específico del producto deshabilite intencionadamente una fuente externa.

<div align="center"><em>Tabla 5.2-3: Modos de CPU</em></div>

<div align="center" markdown>

| Modo | CPU | Periféricos | SRAM | E/S | LPTIM | Fuente de activación | Tiempo de activación |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Active | En ejecución | En ejecución | Accesible | Puede cambiar de estado | En ejecución | - | - |
| Sleep | Detenida | En ejecución | Accesible | Puede cambiar de estado | En ejecución | Cualquier interrupción | <0,5 us |
| DeepSleep | Detenida | Detenidos | Inaccesible, totalmente retenida | Nivel mantenido | En ejecución | RTC, E/S de activación, GPIO, LPTIM, Bluetooth | 250 us |
| Standby | Reiniciada | Reiniciados | Inaccesible, totalmente retenida | Nivel mantenido | En ejecución | RTC, E/S de activación, LPTIM, Bluetooth | 1 ms |
| Hibernate | Reiniciada | Reiniciados | Inaccesible, no retenida | High-Z | Reiniciado | RTC, E/S de activación | >2 ms |

</div>

Toda la familia admite 15 fuentes de interrupción capaces de activar el sistema en los modos Standby y Hibernate:

<div align="center"><em>Tabla 5.2-4: Fuentes de interrupción para activación</em></div>

<div align="center" markdown>

| Fuente de activación | Pin | Fuente de activación | Pin |
|:---|:---|:---|:---|
| LWKUP_PIN0 | PA24 | LWKUP_PIN12 | PA36 |
| LWKUP_PIN1 | PA25 | LWKUP_PIN13 | PA37 |
| LWKUP_PIN2 | PA26 | LWKUP_PIN14 | PA38 |
| LWKUP_PIN3 | PA27 | LWKUP_PIN15 | PA39 |
| LWKUP_PIN10 | PA34 | LWKUP_PIN16 | PA40 |
| LWKUP_PIN11 | PA35 | LWKUP_PIN17 | PA41 |
| — | — | LWKUP_PIN18 | PA42 |
| — | — | LWKUP_PIN19 | PA43 |
| — | — | LWKUP_PIN20 | PA44 |

</div>

**Lista de comprobación de los modos de funcionamiento**

- [ ] Los pines de activación necesarios se han asignado antes de fijar la configuración del multiplexor de pines.
- [ ] Los estados de las resistencias pull-up/pull-down de los pines de activación son compatibles con Standby y Hibernate.
- [ ] Durante Hibernate no hay corriente de fuga hacia el almacenamiento externo ni los sensores a través de los pines de E/S.
- [ ] Los equipos de firmware y hardware han acordado qué estado se usará durante el envío, el almacenaje y la espera normal.

### 5.3. Generación de reloj { #53-clock-generation }

#### 5.3.1. Selección de cristales { #531-crystal-selection }

**Resumen**

- Use un cristal principal de 48 MHz y un cristal RTC de 32,768 kHz.
- Priorice componentes de la AVL con CL y ESR bajos para reducir la corriente de arranque y en régimen estable.
- Mantenga cortas y protegidas las pistas de los cristales, alejadas de fuentes de calor y ruido de RF, cargador, PMU y DC/DC.

**Objetivo de diseño**

Proporcione fuentes de reloj estables y con bajo jitter, y minimice la corriente del oscilador, la deriva de frecuencia, las interferencias de RF y los riesgos durante la puesta en marcha.

El chip requiere dos fuentes de reloj externas: un cristal principal de 48 MHz y un cristal RTC de 32,768 kHz. Los requisitos son idénticos para ambas variantes.

!!! important "Requisitos de especificación de los cristales"
    <div align="center"><em>Tabla 5.3-1: Requisitos de especificación de los cristales</em></div>

    <div align="center" markdown>

    | Cristal | Requisito | Notas |
    |:---|:---|:---|
    | 48 MHz | 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω recomendado) | Un CL y un ESR menores reducen el consumo; normalmente no hacen falta condensadores de adaptación si CL < 12 pF. |
    | 32,768 kHz | CL ≤ 12,5 pF (7 pF recomendado), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ recomendado) | Un CL y un ESR menores reducen el consumo; normalmente no hacen falta condensadores de adaptación si CL < 12,5 pF. |

    </div>

Cristales recomendados:

<div align="center"><em>Tabla 5.3-2: Lista de cristales recomendados</em></div>

<div align="center" markdown>

| Número de pieza | Fabricante | Parámetros |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0=48 MHz, ΔF/F0=-6~8 ppm, CL=8.8 pF, ESR≤22 Ω, TOPR=-30~85°C, encapsulado métrico 2016 |
| SX20Y048000B31T-8.8 | TKD | F0=48 MHz, ΔF/F0=-10~10 ppm, CL=8.8 pF, ESR≤40 Ω, TOPR=-20~75°C, encapsulado métrico 2016 |
| ETST00327000LE | Hosonic | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, encapsulado métrico 3215 |
| SF32K32768D71T01 | TKD | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, encapsulado métrico 3215 |

</div>

!!! note "Notas adicionales"
    El TKD SX20Y048000B31T-8.8 tiene un ESR algo más alto, lo que aumenta ligeramente el consumo estático. Además, la nota de aplicación de esquemáticos de SiFli recomienda eliminar al menos el cobre GND de la segunda capa bajo el cristal de 48 MHz para reducir la capacitancia de carga parásita. Sin embargo, la guía de diseño de PCB prohíbe los vaciados de plano o recortes de cobre bajo la zona del cristal en las capas adyacentes. Las indicaciones se contradicen; consulte [Trazado de la interfaz de reloj](SF32LB52x_pcb_layout.md#65-clock-interface-routing). Confirme con SiFli el tratamiento de capas previsto antes de cerrar el diseño de PCB.

!!! important "Excepción de ESR del cristal en la fuente"
    La fuente incluye el TKD SX20Y048000B31T-8.8 con ESR ≤ 40 Ω, aunque el requisito general para 48 MHz es ESR ≤ 30 Ω. Debe verificarse la homologación de ese componente concreto; no significa que cualquier cristal de 40 Ω sea válido. Antes de liberar el diseño, confirme su aprobación en la AVL vigente y valide el arranque, la calibración de frecuencia y la corriente del oscilador.

!!! important "La recomendación del cristal de 32,768 kHz difiere dentro de la fuente"
    La tabla de parámetros de 32,768 kHz de la fuente recomienda CL = 7 pF y ESR = 38 kΩ, mientras que el texto recomienda CL ≤ 9 pF y ESR ≤ 40 kΩ. Ambas indicaciones aparecen en la fuente; confirme con SiFli el objetivo aplicable y la homologación AVL del cristal elegido antes de liberar el diseño.

Para consultar los datos de cualificación completos y actualizados continuamente, consulte la [lista de proveedores aprobados de SiFli][SiFli Approved Vendor List (AVL)].

**Errores frecuentes de diseño del reloj**

- Elegir un cristal solo por la frecuencia y el encapsulado, sin comprobar CL, ESR, tolerancia y rango de temperatura.
- Colocar el cristal cerca del PA, el cargador, la PMU, la red de adaptación de RF u otras fuentes de calor o ruido.
- Dejar cobre o pistas de alta velocidad bajo la zona de exclusión del cristal.
- Trazar pistas largas de 32 kHz en paralelo sin separación ni blindaje de tierra.

**Lista de comprobación del reloj**

- [ ] Los cristales de 48 MHz y 32,768 kHz cumplen los requisitos de la AVL y de la hoja de datos.
- [ ] Se han verificado la capacitancia de carga y el ESR del cristal respecto a los límites del oscilador.
- [ ] En la revisión de PCB se comprueban la zona de exclusión, la longitud y anchura de las pistas, la separación y el blindaje de tierra.
- [ ] El plan de puesta en marcha incluye medir 48 MHz y 32 kHz y comprobar la calibración de frecuencia de Bluetooth.

---

Continúe con [RF e interfaces de usuario](SF32LB52x_schematic_rf_interfaces.md).

[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
