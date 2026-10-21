---
icon: lucide/layers
hide:
    - navigation
description: "Pautas de diseño de PCB para la MCU SF32LB58x: huella del encapsulado, apilado de capas, fanout y trazado de reloj, RF, audio, USB, SDIO, DSI y alimentación."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB58x — Pautas de diseño de PCB { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte de la guía de diseño de hardware SF32LB58x"
    Esta página cubre la sección 6, Pautas de diseño de PCB. Vuelva a las [Directrices de diseño esquemático](SF32LB58x_schematic_design.md), continúe con la [Lista de comprobación del diseño de PCB](SF32LB58x_pcb_layout_checklist.md) o vaya directamente a la [Lista de comprobación para la revisión de diseño y referencias](SF32LB58x_review_and_reference.md).

## 6. Pautas de diseño de PCB { #6-pcb-layout-guidelines }

### 6.1. Diseño de la huella del encapsulado { #61-package-footprint-design }

La serie SF32LB58x usa un encapsulado BGA256 de 8,5 mm × 6,5 mm × 0,94 mm, con paso de 0,4 mm y diámetro nominal de bola de 0,25 mm. Consulte la hoja de datos oficial para ver todos los datos de cualificación del encapsulado.

!!! warning "Las fuentes discrepan sobre la altura del encapsulado"
    El texto de la guía de SiFli indica una altura de 0,94 mm, mientras que el dibujo del BGA256 da para la dimensión A un valor nominal de 0,91 mm y un intervalo de 0,84–1,04 mm. Son valores contradictorios en la fuente. Si la altura afecta a las holguras mecánicas o al ajuste de la carcasa, no elija uno sin confirmarlo con SiFli; utilice la especificación de encapsulado confirmada.

![Figura 6.1-1: Dimensiones del encapsulado BGA256](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-1: Dimensiones del encapsulado BGA256</em></div>

![Figura 6.1-2: Forma de la huella del encapsulado](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-2: Forma de la huella del encapsulado</em></div>

![Figura 6.1-3: Referencia del patrón de pads de PCB](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-3: Referencia del patrón de pads de PCB</em></div>

![Figura 6.1-4: Mapa de bolas del encapsulado](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-4: Mapa de bolas del encapsulado</em></div>

![Figura 6.1-5: Información de las bolas del sustrato del encapsulado](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-5: Información de las bolas del sustrato del encapsulado</em></div>

### 6.2. Apilado de capas de PCB { #62-pcb-stack-up }

El diseño de la serie SF32LB58x admite ensamblaje por una o ambas caras. La PCB debe ser HDI; no se admite PTH. Se recomienda un apilado 6HDI-2. La estructura de referencia de la figura especifica un espesor final de 0,8 mm ±10 % (unos 32 mil nominales).

![Figura 6.2-1: Estructura de apilado de referencia](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.2-1: Estructura de apilado de referencia</em></div>

### 6.3. Reglas generales de diseño de PCB { #63-general-pcb-design-rules }

Consulte la figura de reglas generales de diseño de PCB de la hoja de datos oficial; las dimensiones están en mm. Las reglas de referencia indican un ancho de pista mínimo y recomendado de 0,075 mm y un máximo de 2 mm; una separación mínima de 0,075 mm entre pistas, vías, pads, componentes SMD, texto y cobre; 0,25 mm de separación respecto al borde de la placa; y 0,1 mm entre perforaciones y entre cuerpos de componentes. Confirme las reglas definitivas con el fabricante de PCB.

![Figura 6.3-1: Reglas generales de diseño de PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-1: Reglas generales de diseño de PCB</em></div>

#### 6.3.1. Diseño de vías ciegas { #631-blind-via-design }

Consulte las figuras de diseño de vías ciegas entre las capas 1-2 y 1-3 de la hoja de datos oficial; las dimensiones están en mm. Las vías ciegas metalizadas de referencia tienen 0,23 mm de diámetro y un taladro de 0,10 mm.

![Figura 6.3-2: Diseño de vía ciega entre las capas 1-2](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-2: Diseño de vía ciega entre las capas 1-2</em></div>

![Figura 6.3-3: Diseño de vía ciega entre las capas 1-3](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-3: Diseño de vía ciega entre las capas 1-3</em></div>

#### 6.3.2. Diseño de vías enterradas { #632-buried-via-design }

Consulte la figura de diseño de vías enterradas entre las capas 2-5 de la hoja de datos oficial; las dimensiones están en mm. La vía enterrada metalizada de referencia tiene 0,40 mm de diámetro y un taladro de 0,20 mm.

![Figura 6.3-4: Diseño de vía enterrada entre las capas 2-5](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-4: Diseño de vía enterrada entre las capas 2-5</em></div>

### 6.4. Fanout de pistas { #64-trace-fanout }

Las pistas de las dos primeras filas de bolas BGA salen por la capa superior; las de las filas restantes se enrutan hacia las capas internas mediante vías.

![Figura 6.4-1: Referencia de fanout en la capa superior](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-1: Referencia de fanout en la capa superior</em></div>

![Figura 6.4-2: Referencia de fanout en capas internas](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-2: Referencia de fanout en capas internas</em></div>

### 6.5. Trazado de la interfaz de reloj { #65-clock-interface-routing }

Coloque el cristal dentro de una cubierta de apantallamiento, a más de 1 mm del borde de la PCB y lo más lejos posible de los componentes que generan calor —como el PA, el circuito de carga y la PMU—, idealmente a más de 5 mm, para evitar que afecten al desplazamiento de frecuencia del cristal. Mantenga una distancia superior a 0,25 mm entre la zona de exclusión del cristal y otros metales o componentes.

Trace el cristal de 48 MHz en la capa superior, con una longitud de 3–10 mm y un ancho de pista de 0,075 mm, y aplíquele apantallamiento 3D completo. Aléjelo de VBAT, DC/DC y las líneas de señal de alta velocidad. No trace otras señales por la capa superior ni por la capa adyacente bajo la zona del cristal de 48 MHz.

Trace el cristal de 32,768 kHz en la capa superior, con una longitud ≤10 mm, un ancho de pista de 0,075 mm y una separación entre las pistas paralelas 32K_XI/32K_XO ≥0,15 mm; aplique apantallamiento 3D completo. Mantenga libres de otras pistas la capa superior y la capa adyacente bajo la zona del cristal.

!!! warning "Confirme con SiFli las capas de exclusión de cobre del cristal"
    La guía de PCB indica que se dejen libres de cobre la capa superior y la capa adyacente bajo cada zona de cristal. El libro de trabajo de la lista de comprobación especifica las capas 1, 2 y 3 para una PCB de cuatro capas. Las fuentes difieren sobre si debe incluirse la capa 3. No deduzca el requisito definitivo de esa capa; confírmelo con SiFli.

![Figura 6.5-1: Colocación del cristal](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-1: Colocación del cristal</em></div>

![Figura 6.5-2: Esquemático del cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-2: Esquemático del cristal de 48 MHz</em></div>

![Figura 6.5-3: Modelo de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-3: Modelo de trazado del cristal de 48 MHz</em></div>

![Figura 6.5-4: Referencia de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-4: Referencia de trazado del cristal de 48 MHz</em></div>

![Figura 6.5-5: Esquemático del cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-5: Esquemático del cristal de 32,768 kHz</em></div>

![Figura 6.5-6: Modelo de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-6: Modelo de trazado del cristal de 32,768 kHz</em></div>

![Figura 6.5-7: Referencia de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-7: Referencia de trazado del cristal de 32,768 kHz</em></div>

### 6.6. Trazado de la interfaz RF { #66-rf-interface-routing }

Coloque el circuito de adaptación RF lo más cerca posible del chip, no junto a la antena. Sitúe el condensador de desacoplo de alimentación RF AVDD_BRF lo más cerca posible del pin del chip y conecte sus vías de tierra directamente al plano GND principal.

Cuando sea posible, trace las pistas RF en la capa superior para evitar vías que degraden el rendimiento; se recomienda un ancho de pista superior a 10 mil. Aplique apantallamiento 3D completo y evite ángulos agudos o rectos. Añada vías de tierra de apantallamiento a ambos lados de la pista RF y controle su impedancia a 50 Ω. Mantenga DC-DC, VBAT y las señales digitales de alta velocidad —como el cristal, los relojes de alta frecuencia y las señales de interfaz I2C/SPI/SDIO/I2S/UART— fuera de la zona de trazado RF. AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO y AVSS_BB son pines de tierra del circuito RF y deben conectarse correctamente a tierra; coloque vías ciegas directamente en sus pads para conectarlos a la tierra principal.

![Figura 6.6-1: Esquemático de la red π y del circuito de alimentación](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-1: Esquemático de la red π y del circuito de alimentación</em></div>

![Figura 6.6-2: Diseño de PCB de la red π y del circuito de alimentación](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-2: Diseño de PCB de la red π y del circuito de alimentación</em></div>

![Figura 6.6-3: Esquemático del circuito de señal RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-3: Esquemático del circuito de señal RF</em></div>

![Figura 6.6-4: Trazado de señal RF en la PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-4: Trazado de señal RF en la PCB</em></div>

![Figura 6.6-5: Esquemático de tierra del circuito RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-5: Esquemático de tierra del circuito RF</em></div>

![Figura 6.6-6: Tierra del circuito RF en la PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-6: Tierra del circuito RF en la PCB</em></div>

### 6.7. Trazado de la interfaz de audio { #67-audio-interface-routing }

Coloque el condensador de desacoplo de la alimentación de audio AVDD33_AUD cerca de su pin y conecte bien su pin de tierra a la tierra principal. Coloque también el condensador de desacoplo de alimentación del micrófono MIC_BIAS cerca de su pin y con una conexión adecuada a tierra. Sitúe el condensador de desacoplo de AUD_VREF junto a su pin.

AU_ADC1P/AU_ADC1N y AU_ADC2P/AU_ADC2N son los dos pares de entrada analógica. Coloque los componentes asociados lo más cerca posible de sus pines, trace cada par P/N como una línea diferencial lo más corta posible, aplique apantallamiento 3D al par y mantenga alejadas otras señales con interferencia intensa.

AU_DAC1P/AU_DAC1N y AU_DAC2P/AU_DAC2N son los dos pares de salida analógica. Coloque los componentes asociados lo más cerca posible de sus pines, trace cada par P/N como una línea diferencial lo más corta posible y de menos de 2 mm, con una capacitancia parásita de pista inferior a 10 pF y un ancho de pista diferencial de 0,075 mm. Apantalle el par diferencial en 3D y mantenga alejadas otras señales con interferencia intensa.

!!! warning "Las fuentes discrepan sobre la longitud máxima de las pistas DAC"
    La guía de PCB limita la longitud de las pistas DAC a menos de 2 mm, mientras que el libro de trabajo de la lista de comprobación indica menos de 2 cm (20 mm). Los límites difieren por un factor de diez. No elija ni sustituya un límite sin confirmarlo con SiFli.

![Figura 6.7-1: Esquemático de alimentación de audio](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-1: Esquemático de alimentación de audio</em></div>

![Figura 6.7-2: Diseño de PCB del filtrado de alimentación de audio](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-2: Diseño de PCB del filtrado de alimentación de audio</em></div>

![Figura 6.7-3: Esquemático de entrada de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-3: Esquemático de entrada de audio analógico</em></div>

![Figura 6.7-4: Diseño de PCB de entrada de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-4: Diseño de PCB de entrada de audio analógico</em></div>

![Figura 6.7-5: Esquemático de salida de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-5: Esquemático de salida de audio analógico</em></div>

![Figura 6.7-6: Diseño de PCB de salida de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-6: Diseño de PCB de salida de audio analógico</em></div>

### 6.8. Trazado de la interfaz USB { #68-usb-interface-routing }

Coloque el condensador de desacoplo AVDD33_USB y la resistencia de calibración USB2_REXT cerca de sus respectivos pines. Las pistas USB deben pasar por los pines del componente de protección ESD antes de llegar al chip, y el pin de tierra de dicho componente debe conectarse bien a la tierra principal. Trace USB DP/DN como un par diferencial con impedancia diferencial controlada a 90 Ω y apantallamiento 3D.

![Figura 6.8-1: Esquemático de señal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-1: Esquemático de señal USB</em></div>

![Figura 6.8-2: Diseño de PCB de señal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-2: Diseño de PCB de señal USB</em></div>

![Figura 6.8-3: Referencia de colocación de componentes de señal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-3: Referencia de colocación de componentes de señal USB</em></div>

![Figura 6.8-4: Modelo de trazado de señal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-4: Modelo de trazado de señal USB</em></div>

### 6.9. Trazado de la interfaz SDIO { #69-sdio-interface-routing }

SF32LB58x ofrece dos interfaces SDIO, SDIO1 y SDIO2. Trace juntas todas las señales de cada interfaz SDIO, sin dividirlas. La longitud total de las pistas debe ser ≤50 mm y la diferencia de longitud dentro del grupo, ≤6 mm. Apantalle en 3D la señal de reloj SDIO y proteja también las señales DATA y CMD.

![Figura 6.9-1: Circuito de la interfaz SDIO1](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: Circuito de la interfaz SDIO1</em></div>

![Figura 6.9-2: Modelo de trazado de PCB para SDIO1](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: Modelo de trazado de PCB para SDIO1</em></div>

### 6.10. Trazado de la interfaz DSI { #610-dsi-interface-routing }

Coloque el condensador de desacoplo AVDD18_DSI y la resistencia de calibración DSI_REXT cerca de sus respectivos pines. Trace las señales DSI como pares diferenciales con impedancia diferencial controlada a 100 Ω, igualando las longitudes del reloj y los datos: el desfase dentro de cada par debe ser ≤0,5 mm y entre pares, ≤2 mm. Aplique apantallamiento 3D a cada par diferencial.

!!! warning "Las fuentes discrepan sobre el límite entre pares diferenciales DSI"
    La guía de PCB limita el desfase entre pares a ≤2 mm y el desfase dentro de cada par a ≤0,5 mm. En cambio, el libro de trabajo de la lista de comprobación exige que los pares diferenciales de datos DSI coincidan con el par diferencial de reloj dentro de 200 mil (5,08 mm). Los límites entre pares son contradictorios. Mantenga separado el límite intra-par y confirme con SiFli cuál límite entre pares se debe aplicar antes de cerrar el diseño.

![Figura 6.10-1: Circuito de señal DSI](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-1: Circuito de señal DSI</em></div>

![Figura 6.10-2: Trazado de señal DSI en la PCB](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-2: Trazado de señal DSI en la PCB</em></div>

### 6.11. Trazado del circuito DC-DC { #611-dc-dc-circuit-routing }

Coloque el inductor de alimentación DC-DC y los condensadores de desacoplo cerca de los pines del chip. Mantenga las pistas BUCK_LX lo más cortas y anchas posible para reducir al mínimo la inductancia del lazo DC-DC. Añada vías de tierra adicionales en los pines de tierra de todos los condensadores de desacoplo de salida DC-DC y conéctelas al plano GND principal. La pista de realimentación BUCK_FB no debe ser demasiado fina: su ancho debe superar 0,25 mm. No vierta cobre en la capa superior bajo el inductor de alimentación; mantenga la capa adyacente como un plano de referencia GND completo y evite pasar otras pistas por la zona del inductor.

![Figura 6.11-1: Circuito de componentes clave DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.11-1: Circuito de componentes clave DC-DC</em></div>

![Figura 6.11-2: Diseño de PCB del circuito DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.11-2: Diseño de PCB del circuito DC-DC</em></div>

### 6.12. Trazado de la alimentación { #612-power-supply-routing }

PVDD1 y PVDD2 son las entradas de alimentación del módulo PMU integrado. Coloque sus condensadores de desacoplo cerca de los pines y use pistas lo más anchas posible; nunca menos de 0,5 mm. PVSS1 y PVSS2 son pines de tierra del módulo PMU y deben conectarse a la tierra principal mediante vías. No los deje flotantes, ya que afectaría al rendimiento general de la PMU.

![Figura 6.12-1: Diagrama del circuito DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.12-1: Diagrama del circuito DC-DC</em></div>

![Figura 6.12-2: Trazado de PCB del circuito DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.12-2: Trazado de PCB del circuito DC-DC</em></div>

### 6.13. Trazado de entradas de alimentación LDO y E/S { #613-ldo-and-io-power-input-routing }

Coloque los condensadores de desacoplo de todas las salidas LDO y entradas de alimentación de E/S cerca de sus respectivos pines. El ancho de las pistas debe cumplir el requisito de corriente de entrada. Manténgalas lo más cortas y anchas posible para reducir el rizado de los raíles de alimentación y mejorar la estabilidad del sistema.

![Figura 6.13-1: Referencia de trazado de alimentación para entradas LDO y E/S](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.13-1: Referencia de trazado de alimentación para entradas LDO y E/S</em></div>

### 6.14. Trazado de otras interfaces { #614-other-interface-routing }

Las señales de los pines GPADC requieren apantallamiento 3D completo y deben mantenerse alejadas de otras fuentes de interferencia, como los circuitos de medición del nivel de batería y de temperatura.

![Figura 6.14-1: Circuito GPADC](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-1: Circuito GPADC</em></div>

Las señales de los pines de entrada y salida de reloj, como la salida de 32 kHz, también requieren apantallamiento 3D completo y deben mantenerse alejadas de otras fuentes de interferencia.

![Figura 6.14-2: Circuito de salida de reloj de 32 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-2: Circuito de salida de reloj de 32 kHz</em></div>

### 6.15. Trazado de tierra del chip { #615-chip-ground-routing }

La red de tierra bajo la zona central del SF32LB58x debe quedar completamente interconectada mediante pistas y formar un plano GND suficiente, conectado al plano principal mediante vías ciegas o enterradas.

![Figura 6.15-1: Señal GND en la capa superior bajo el chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-1: Señal GND en la capa superior bajo el chip</em></div>

![Figura 6.15-2: Señal GND en la segunda capa bajo el chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-2: Señal GND en la segunda capa bajo el chip</em></div>

![Figura 6.15-3: Señal GND en la tercera capa bajo el chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-3: Señal GND en la tercera capa bajo el chip</em></div>

![Figura 6.15-4: Señal GND en la cuarta capa bajo el chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-4: Señal GND en la cuarta capa bajo el chip</em></div>

### 6.16. EMI y ESD { #616-emi-esd }

Fuera de la cubierta de apantallamiento, evite las pistas largas en la capa superior. Las señales de reloj, alimentación y otras que puedan generar interferencias deben ir por capas internas, no por la superior. Coloque los dispositivos de protección ESD cerca de los pines del conector y haga que las señales pasen primero por ellos para evitar ramificaciones de la señal. Conecte los pines de tierra de los dispositivos ESD a la tierra principal mediante vías; mantenga cortas y anchas las pistas de tierra de sus pads para reducir la impedancia y mejorar la protección ESD.

### 6.17. Otras consideraciones { #617-other-considerations }

Coloque los puntos de prueba de las líneas de carga USB antes del diodo TVS y sitúe el diodo TVS del portabaterías antes de la conexión a la plataforma. Trace las señales para que siempre pasen por el TVS antes de llegar al chip. Mantenga lo más cortas posible las pistas de los pines de tierra TVS.

!!! note "La fuente no define la referencia de colocación del TVS"
    La fuente china indica que el TVS del conector de batería debe colocarse «antes de la plataforma» (平台), pero no aclara qué nodo o punto de conexión designa «plataforma». Confirme con SiFli la referencia de colocación en vez de deducirla. La fuente también exige que la señal pase por el TVS antes de llegar al chip y que la pista de tierra del TVS sea corta.

![Figura 6.17-1: Referencia de colocación del TVS de alimentación](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-1: Referencia de colocación del TVS de alimentación</em></div>

![Figura 6.17-2: Referencia de trazado del TVS](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-2: Referencia de trazado del TVS</em></div>

Para evitar que la máscara de soldadura cubra los pads y preservar la fiabilidad de las uniones, las vías de los pads BGA deben quedar centradas en la bola; no las desplace. Para mejorar el rendimiento de fabricación, consulte las figuras de referencia de conexión de bolas BGA.

![Figura 6.17-3: Referencia de colocación de vías BGA](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-3: Referencia de colocación de vías BGA</em></div>

![Figura 6.17-4: Referencia de conexión de bolas BGA 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-4: Referencia de conexión de bolas BGA 1</em></div>

![Figura 6.17-5: Referencia de conexión de bolas BGA 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-5: Referencia de conexión de bolas BGA 2</em></div>
