---
icon: lucide/layers
hide:
    - navigation
description: "Pautas de diseño de PCB para el MCU SF32LB52x: huella, apilado, fanout, trazado de reloj/RF/audio/USB/SDIO, alimentación y DC-DC, EMI/ESD y otros aspectos del diseño."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB52x — Pautas de diseño de PCB { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página cubre la sección 6, Pautas de diseño de PCB. Vuelva a las [Pautas de diseño del esquemático](SF32LB52x_schematic_design.md) (la primera de sus tres páginas), continúe con la [Lista de comprobación del diseño de PCB](SF32LB52x_pcb_layout_checklist.md) o vaya directamente a la [Lista de revisión del diseño y referencias](SF32LB52x_review_and_reference.md).

## 6. Pautas de diseño de PCB { #6-pcb-layout-guidelines }

Utilice este capítulo para revisar el diseño de PCB junto con la sección 5. Antes de iniciar la colocación final, el esquemático debe definir la variante, el árbol de alimentación, los componentes de reloj, el espacio reservado para RF, los pines de pantalla y almacenamiento y el acceso a los puntos de prueba.

**Objetivo de diseño**

Trasladar el esquemático a una PCB PTH de 4 capas apta para fabricación y proteger las rutas sensibles de RF, cristal, audio, alimentación, USB y SDIO frente a problemas de impedancia, ruido y corriente de retorno.

**Flujo de revisión de PCB**

1. Confirme la huella del encapsulado y el patrón de pasta y de pads.
2. Confirme con el proveedor de PCB el apilado, las reglas de ancho/separación, los taladros y la impedancia.
3. Coloque el chip, los cristales, la ruta RF, DC/DC, el cargador, los conectores de pantalla/almacenamiento y los componentes de audio.
4. Revise el fanout y el trazado de las señales sensibles antes de completar las rutas GPIO de menor prioridad.
5. Guarde capturas de pantalla que documenten el trazado de RF, cristales, USB, SDIO, audio, DC/DC, el cargador y las líneas de alimentación.

### 6.1. Diseño de la huella de PCB { #61-pcb-footprint-design }

El encapsulado QFN68L del SF32LB52x mide 7 mm x 7 mm x 0,85 mm, tiene 68 pines y un paso de 0,35 mm.

El dibujo del encapsulado especifica una altura total nominal de 0,85 mm, con un intervalo de 0,8–0,9 mm. La separación respecto a la placa es de 0,02 mm nominales y 0,05 mm como máximo. Compruebe las holguras de montaje y de la carcasa con el dibujo detallado, no solo con el resumen dimensional.

![Figura 6.1-1: Dimensiones del encapsulado QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-1: Dimensiones del encapsulado QFN68L</em></div>

![Figura 6.1-2: Forma del encapsulado QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-2: Forma del encapsulado QFN68L</em></div>

![Figura 6.1-3: Referencia del patrón de pads QFN68L para PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-3: Referencia del patrón de pads QFN68L para PCB</em></div>

La figura 6.1-3 especifica pads periféricos de 0,2 mm x 0,55 mm, paso de 0,35 mm, aperturas de máscara de soldadura de 0,3 mm x 0,65 mm y aperturas de pasta de 0,2 mm x 0,55 mm. Son dimensiones de referencia; compruebe los requisitos del proceso de montaje antes de aprobar la huella.

El dibujo del encapsulado indica un pad expuesto nominal de 5,49 mm x 5,49 mm. El ejemplo de fanout conecta el pad central a GND; no lo trate como una pieza mecánica que pueda quedar sin conectar.

### 6.2. Apilado de PCB { #62-pcb-stack-up }

El diseño de referencia admite montaje por una o ambas caras. Los componentes pueden ir en una sola cara o, por ejemplo, los condensadores y otros pasivos pueden colocarse en la cara inferior, debajo del chip. Se recomienda un apilado de 4 capas con vías pasantes (PTH).

![Figura 6.2-1: Estructura de apilado de referencia](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.2-1: Estructura de apilado de referencia</em></div>

La figura 6.2-1 muestra un apilado de referencia de 0,8 mm ±10%, incluidos el metalizado y la máscara de soldadura. Su espesor total calculado es de 0,79553 mm. Confirme el espesor acabado y la estructura dieléctrica con el fabricante; este ejemplo no es un apilado universal.

<div align="center"><em>Tabla 6.2-1: Valores del apilado de referencia</em></div>

<div align="center" markdown>

| Capa | Material | Espesor (mil) | Espesor (mm) | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| Máscara superior | Máscara de soldadura | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | Cobre + metalizado | 1.81 | 0.045974 | — | — |
| Dieléctrico L1–L2 | Prepreg 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | Cobre + metalizado | 1.4 | 0.03556 | — | — |
| Dieléctrico L2–L3 | Núcleo | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | Cobre + metalizado | 1.4 | 0.03556 | — | — |
| Dieléctrico L3–L4 | Prepreg 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | Cobre + metalizado | 1.81 | 0.045974 | — | — |
| Máscara inferior | Máscara de soldadura | 1 | 0.0254 | 3.5 | 0.8 |

</div>

Las filas de prepreg suponen un área de cobre del 70%. Dk y Df se reproducen de la imagen, incluido el Df de 0,8 de la máscara; no son propiedades universales verificadas. Confirme los datos del material real con el fabricante para calcular impedancia y pérdidas.

### 6.3. Reglas generales de diseño de PCB { #63-general-pcb-design-rules }

Siga las reglas generales de diseño de PCB PTH del diseño de referencia.

![Figura 6.3-1: Reglas generales de diseño de PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-1: Reglas generales de diseño de PCB</em></div>

Las reglas de la figura 6.3-1 indican un ancho mínimo y recomendado de pista de 0,1 mm y un máximo de 2,54 mm. Distinguen las separaciones de 0,1 mm entre pistas, vías y pads de las reglas para cobre de 0,127 mm (0,15 mm entre regiones de cobre), y fijan una separación al borde de 0,25 mm. Son reglas CAD de referencia: verifique por separado los límites de fabricación y el trazado con impedancia controlada.

Las reglas adicionales de la figura 6.3-1 fijan separaciones de 0,1 mm entre taladros y entre cuerpos de componentes. Algunas entradas de la misma red son cero; no eliminan las separaciones entre redes distintas ni las reglas de borde y cobre.

### 6.4. Fanout de pistas de PCB { #64-pcb-trace-fanout }

Realice el fanout de todas las señales del encapsulado QFN por la capa superior.

![Figura 6.4-1: Referencia de fanout en la capa superior](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-1: Referencia de fanout en la capa superior</em></div>

### 6.5. Trazado de la interfaz de reloj { #65-clock-interface-routing }

Aplique estas reglas de trazado del reloj a ambos grupos de diseño:

- Coloque los cristales dentro de la caja de blindaje y a más de 1 mm del borde de la PCB. Aléjelos tanto como sea posible de los componentes que generan calor (PA, cargador y circuitos PMU), idealmente más de 5 mm, para evitar que se altere la deriva de frecuencia del cristal.
- Mantenga una zona de exclusión de más de 0,25 mm alrededor del cristal, sin otros metales ni componentes.
- Trace las pistas del cristal de 48 MHz por la capa superior, con una longitud de 3–10 mm y un ancho de 0,1 mm, y apantállelas completamente con tierra. Aléjelas de VBAT/VCC, DC/DC y las señales de alta velocidad; no coloque otras pistas en la capa superior ni en la capa adyacente debajo del cristal.
- Trace las pistas del cristal de 32,768 kHz por la capa superior, con una longitud ≤10 mm y un ancho de 0,1 mm. Mantenga una separación ≥0,15 mm entre las pistas paralelas 32K_XI/32K_XO y apantállelas con tierra. No pase otras pistas por la capa superior ni por la adyacente bajo este circuito.

![Figura 6.5-1: Colocación del cristal](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-1: Colocación del cristal</em></div>

![Figura 6.5-2: Esquemático del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-2: Esquemático del cristal de 48 MHz</em></div>

![Figura 6.5-3: Modelo de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-3: Modelo de trazado del cristal de 48 MHz</em></div>

![Figura 6.5-4: Referencia de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-4: Referencia de trazado del cristal de 48 MHz</em></div>

![Figura 6.5-5: Esquemático del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-5: Esquemático del cristal de 32,768 kHz</em></div>

![Figura 6.5-6: Modelo de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-6: Modelo de trazado del cristal de 32,768 kHz</em></div>

![Figura 6.5-7: Referencia de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-7: Referencia de trazado del cristal de 32,768 kHz</em></div>

Las figuras 6.5-3 y 6.5-6 muestran una separación ≥0,15 mm entre las pistas paralelas XI/XO de ambos cristales. La figura 6.5-2 usa un cristal de 48 MHz con capacitancia de carga de 8,8 pF y marca los condensadores externos como NF (no montados). La figura 6.5-5 usa un cristal de 32,768 kHz y 7 pF en PA22/PA23, pines compartidos con PDM_CLK/PDM_DATA.

!!! important "Discrepancia entre fuentes sobre el cobre bajo el cristal"
    La nota de aplicación de las variantes con batería se contradice sobre el cobre bajo el cristal: su sección de reloj pide retirar el plano GND de L2 justo debajo, mientras que su sección de trazado de PCB prohíbe los huecos en planos y los recortes de cobre en la capa superior y las adyacentes, y muestra GND continuo en L2. La guía independiente de diseño de PCB repite la instrucción de no crear huecos. No deduzca una regla universal para L2 ni decida solo por el número de capas; confirme con SiFli el tratamiento específico del apilado antes de liberar el diseño. La zona de exclusión y las distancias a componentes siguen siendo comprobaciones independientes.

### 6.6. Trazado de la interfaz RF { #66-rf-interface-routing }

Aplique estas reglas de trazado RF a ambos grupos de diseño:

- Coloque el circuito de adaptación RF cerca del chip, no de la antena.
- Coloque el condensador de filtro AVDD_BRF cerca del pin del chip y conecte directamente a la tierra principal las vías asociadas a su terminal de tierra.
- Trace RF por la capa superior siempre que sea posible y evite las vías que degraden el rendimiento. La fuente recomienda un ancho superior a 10 mil; compruebe que el apilado real permita obtener 50 Ω. Apantalle con tierra y evite giros agudos o en ángulo recto.
- Controle la impedancia de las pistas RF a 50 Ω y coloque vías de tierra de apantallamiento densas a ambos lados.

![Figura 6.6-1: Esquemático de la red π y del circuito de alimentación](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-1: Esquemático de la red π y del circuito de alimentación</em></div>

![Figura 6.6-2: Diseño de PCB de la red π y del circuito de alimentación](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-2: Diseño de PCB de la red π y del circuito de alimentación</em></div>

![Figura 6.6-3: Esquemático del circuito de señal RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-3: Esquemático del circuito de señal RF</em></div>

![Figura 6.6-4: Trazado de señal RF en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-4: Trazado de señal RF en PCB</em></div>

Los ejemplos RF usan un condensador serie de 15 pF/50 V (C0333), dejan C0318/C0319 como NF y muestran un filtro de 0,47 uF en AVDD_BRF. Son valores de montaje de ejemplo, no una receta universal de adaptación de antena.

### 6.7. Trazado de la interfaz de audio { #67-audio-interface-routing }

Aplique estas reglas de trazado de audio a ambos grupos de diseño:

- Coloque los condensadores de filtro de AVDD33_AUD, MIC_BIAS y AUD_VREF cerca de sus respectivos pines y conecte sus terminales de tierra firmemente a la tierra principal.
- Coloque cerca del pin del chip los componentes de entrada analógica ADCP; mantenga las pistas cortas, con apantallamiento completo de tierra y alejadas de otras fuentes de interferencia intensa.
- Coloque los componentes de salida analógica DACP/DACN cerca del pin del chip. Trace las señales como un par diferencial, con pistas cortas, capacitancia parásita inferior a 10 pF y apantallamiento completo de tierra.

![Figura 6.7-1: Esquemático del filtrado de alimentación de audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-1: Esquemático del filtrado de alimentación de audio</em></div>

![Figura 6.7-2: Referencia de trazado en PCB del filtrado de alimentación de audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-2: Referencia de trazado en PCB del filtrado de alimentación de audio</em></div>

![Figura 6.7-3: Esquemático de entrada de audio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-3: Esquemático de entrada de audio analógico</em></div>

![Figura 6.7-4: Diseño de PCB de entrada de audio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-4: Diseño de PCB de entrada de audio analógico</em></div>

![Figura 6.7-5: Esquemático de salida de audio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-5: Esquemático de salida de audio analógico</em></div>

![Figura 6.7-6: Diseño de PCB de salida de audio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-6: Diseño de PCB de salida de audio analógico</em></div>

La figura 6.7-1 muestra condensadores de filtro de referencia de 1 uF/6,3 V para MIC_BIAS, 2,2 uF/10 V para AVDD33_AUD y 1 uF/6,3 V para AUD_VREF. Estos valores explican el circuito ilustrado; confirme los necesarios para el diseño real. Además del trazado diferencial, mantenga DACP/DACN alejados de fuentes de interferencia intensa.

Las pautas del esquemático de la fuente también limitan a menos de 2 cm las pistas de salida DAC.

### 6.8. Trazado de la interfaz USB { #68-usb-interface-routing }

Haga pasar primero USB DP (PA35) / DN (PA36) por los pines del dispositivo ESD y luego llévelos al chip. Asegúrese de que la tierra del dispositivo ESD esté bien conectada a la tierra principal. Trace el par con impedancia diferencial controlada a 90 Ω y apantallamiento completo de tierra.

![Figura 6.8-1: Esquemático de señal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-1: Esquemático de señal USB</em></div>

![Figura 6.8-2: Diseño de PCB de señal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-2: Diseño de PCB de señal USB</em></div>

![Figura 6.8-3: Referencia de colocación de componentes de señal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-3: Referencia de colocación de componentes de señal USB</em></div>

![Figura 6.8-4: Modelo de trazado de señal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-4: Modelo de trazado de señal USB</em></div>

La figura 6.8-3 compara el trazado a través de los pads de protección con ramales sin proteger: no cree un ramal que llegue al chip sin pasar por la conexión de protección.

### 6.9. Trazado de la interfaz SDIO { #69-sdio-interface-routing }

Trace las señales SDIO agrupadas; limite la longitud total a ≤50 mm y la diferencia de longitud dentro del grupo a ≤6 mm. Apantalle por completo la señal de reloj con tierra y proteja también las señales DATA y CMD.

![Figura 6.9-1: Esquemático del circuito de interfaz SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: Esquemático del circuito de interfaz SDIO</em></div>

![Figura 6.9-2: Modelo de trazado SDIO en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: Modelo de trazado SDIO en PCB</em></div>

La figura 6.9-2 también muestra una separación ≥0,15 mm entre CMD y el apantallamiento de tierra adyacente.

El esquemático SDIO etiqueta PA11 como MPI2_VDD_EN/SD_VDD_EN. Las guías de aplicación y de diseño de esquemáticos de OpenSiFli, de mayor prioridad, asignan PA21 al interruptor de alimentación del almacenamiento de arranque; úselo como criterio respaldado por las fuentes. La entrada PA11 del libro de comprobación para la Flash externa de variantes con batería no aclara si se trata de otro control. No sustituya PA21 por PA11 sin confirmación. Confirme con SiFli la red y la variante concretas; consulte [Almacenamiento y fabricación](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control).

### 6.10. Trazado del circuito DC/DC { #610-dcdc-circuit-routing }

Coloque el inductor de alimentación y los condensadores de filtro cerca de los pines del chip. Mantenga corta y ancha la pista BUCK_LX y dé al trazado de realimentación BUCK_FB un ancho superior a 0,25 mm. Conecte a la tierra principal los pines de tierra de todos los condensadores de filtro de salida DC/DC mediante varias vías. No vierta cobre en la capa superior bajo el inductor y mantenga la capa adyacente como una referencia de tierra continua.

![Figura 6.10-1: Esquemático de los componentes clave DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-1: Esquemático de los componentes clave DC/DC</em></div>

![Figura 6.10-2: Diseño de PCB de los componentes clave DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-2: Diseño de PCB de los componentes clave DC/DC</em></div>

La figura 6.10-1 usa un inductor de 4,7 uH y un condensador de salida de 4,7 uF/10 V. Sus etiquetas PMU_BUCK_VSW y PMU_BUCK_VOUT corresponden a los nodos de conmutación y salida/realimentación denominados BUCK_LX y BUCK_FB en la tabla de pines de la fuente. No pase otras pistas por la zona del inductor.

### 6.11. Trazado de alimentación { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (alimentado por batería)"

    VCC es el pin de entrada del módulo PMU interno del chip. Coloque su condensador cerca del pin y use un ancho de pista no inferior a 0,4 mm. Sitúe los condensadores de filtro de VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD y AVDD_BRF cerca de sus respectivos pines, y dimensione el ancho de las pistas según la corriente de entrada requerida.

    ![Figura 6.11-1: Trazado de alimentación VCC (esquemático)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-1: Trazado de alimentación VCC (esquemático)</em></div>

    ![Figura 6.11-2: Trazado de alimentación VCC (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-2: Trazado de alimentación VCC (PCB)</em></div>

    **Trazado del circuito de carga**

    VBUS y VBAT son los pines de entrada/salida del módulo de carga interno del chip; coloque sus condensadores de filtro cerca de los pines. Como el lazo de carga transporta una corriente relativamente alta, use pistas de al menos 16 mil (aprox. 0,41 mm) y evite trazarlas en paralelo con señales sensibles. Use una distribución en estrella para que la ruta de carga no comparta trazado con circuitos sensibles. La nota de aplicación redondea este mínimo a 0,4 mm.

    ![Figura 6.11-3: Trazado de alimentación VBUS y VBAT (esquemático)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-3: Trazado de alimentación VBUS y VBAT (esquemático)</em></div>

    ![Figura 6.11-4: Trazado de alimentación VBUS y VBAT (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-4: Trazado de alimentación VBUS y VBAT (PCB)</em></div>

    !!! note "Esquemático de carga de referencia"
        La figura 6.11-3 muestra 10 uF/10 V en VBUS y 4,7 uF/10 V en VBAT. El rango impreso de VBUS es 4,3–5,5 V; Electrical Specification-A3 indica 4,5–5,5 V, y la nota de aplicación para variantes con batería especifica 4,6–5,5 V para el cargador integrado y exige al menos 4,6 V en el pin VBUS con la corriente máxima de carga. La figura es una referencia de colocación, no valida 4,3 V como límite inferior de funcionamiento. Consulte la nota de discrepancia de fuentes de la sección 5.2.

=== "52B/D/E/G/J (alimentación con regulador externo)"

    PVDD es el pin de entrada del módulo PMU interno del chip. Coloque su condensador cerca del pin y use un ancho de pista no inferior a 0,4 mm. Sitúe los condensadores de filtro de AVDD33, VDDIOA, VDD_SIP, AVDD33_AUD y AVDD_BRF cerca de sus respectivos pines. Dimensione el ancho según la corriente requerida y mantenga las pistas tan cortas y anchas como sea posible para reducir el rizado de alimentación y mejorar la estabilidad del sistema.

    ![Figura 6.11-5: Trazado de alimentación PVDD](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-5: Trazado de alimentación PVDD</em></div>

    !!! info "No aplica"
        Esta variante no incorpora circuitos de gestión de carga, por lo que no requiere trazado de carga.

### 6.12. Trazado de otras interfaces { #612-other-interface-routing }

Apantalle con tierra las pistas de entrada GPADC y manténgalas alejadas de otros circuitos que puedan causar interferencias, incluidos los de medición del nivel de batería y detección de temperatura.

### 6.13. EMI y ESD { #613-emi-esd }

Aplique estas reglas de EMI y ESD a ambos grupos de diseño:

- No trace por la capa superior las líneas largas de reloj y alimentación que generen interferencias fuera de la caja de blindaje; llévelas por capas internas.
- Coloque los dispositivos de protección ESD cerca de los pines del conector y haga pasar primero las señales por ellos.
- Conecte los pines de tierra de los dispositivos ESD a la tierra principal mediante vías. Mantenga cortas y anchas las pistas de sus pads de tierra para reducir la impedancia y mejorar la protección ESD.

### 6.14. Otras consideraciones { #614-other-considerations }

Coloque los puntos de prueba de la línea de carga USB del lado del conector, antes del punto de protección TVS. Sitúe el TVS de la batería en la entrada a la placa, antes de que la línea se ramifique hacia el MCU y otras cargas. Pase la pista por el punto de conexión del TVS antes de llegar al chip; el TVS se conecta en derivación a tierra, no en serie. Mantenga corta su conexión a tierra.

![Figura 6.14-1: Referencia de colocación del TVS de alimentación](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-1: Referencia de colocación del TVS de alimentación</em></div>

![Figura 6.14-2: Referencia de trazado TVS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-2: Referencia de trazado TVS</em></div>
