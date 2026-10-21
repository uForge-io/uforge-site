---
icon: lucide/layers
hide:
    - navigation
description: "Pautas de PCB para la MCU SF32LB57x: apilado de capas, restricciones críticas, trazado de alimentación/cristal/RF/analógico/audio/alta velocidad, EMI/ESD/EOS y figuras."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB57x — Directrices de diseño de PCB { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte de la guía de diseño de hardware SF32LB57x"
    Esta página corresponde a la sección 6, «Directrices de diseño de PCB». Vuelva a [Almacenamiento y fabricación](SF32LB57x_schematic_storage_mfg.md) o continúe con la [Lista de comprobación de revisión de diseño y referencias](SF32LB57x_review_and_reference.md).

## 6. Directrices de diseño de PCB { #6-pcb-layout-guidelines }

### 6.1. Apilado de capas { #61-stack-up }

SF32LB57x está disponible en encapsulados QFN68L (7 × 7 mm, 68 pines, paso de 0,35 mm) y QFN80L (8 × 8 mm, 80 pines, paso de 0,35 mm). Los diseños QFN normalmente pueden usar una PCB PTH de 4 capas y admiten componentes en una o ambas caras; algunos componentes, como los condensadores, pueden colocarse en la cara posterior de la PCB.<!-- BGA-ONLY --> El encapsulado BGA112 mide 5,4 × 4,4 mm, tiene 112 bolas y un paso de 0,4 mm. Los diseños BGA suelen requerir al menos 4 capas y, según la complejidad de la salida de pistas desde el encapsulado, pueden usar HDI de primer orden con vías ciegas/enterradas; también admiten componentes en una o ambas caras.<!-- /BGA-ONLY -->

Un buen apilado de capas proporciona:

- Acceso en la capa superior a los componentes críticos y recorridos cortos.
- Un plano de tierra interno continuo.
- Distribución de alimentación de baja impedancia.
- Una referencia de tierra continua para las señales de alta velocidad, RF, cristal, audio y analógicas.

Las figuras de apilado de referencia especifican los siguientes materiales y rangos de espesor total. Confirme con el fabricante de PCB el apilado final y la tolerancia del espesor terminado.

<div align="center"><em>Tabla 6.1-1: Materiales y espesores de referencia para QFN</em></div>

<div align="center" markdown>

| Apilado de referencia | Núcleo | Prepreg | Rango de espesor total |
|:-----|:-----|:-----|:-----|
| QFN, 1,6 mm | Núcleo de cobre H/HOZ de 1,1 mm | 7628 RC49 %, etiqueta del material 8,6 mil; columna de espesor 8,28 mil (0,2104 mm) | 1,43–1,74 mm |
| QFN, 0,8 mm | Núcleo H/HOZ de 0,25 mm, sin cobre | 7628 RC49 %, etiqueta del material 8,6 mil; columna de espesor 8,28 mil (0,2104 mm) | 0,67–0,87 mm |

</div>

!!! warning "Conflicto en la fuente: designación y espesor del prepreg QFN"
    Las figuras 3-1-2-1 y 3-1-2-2 de la guía PCB original, transcritas aquí en la tabla 6.1-1, identifican el prepreg QFN como `7628 RC49%, 8.6 mil`, mientras que la columna de espesor indica `8.28 mil (0.2104 mm)`. La fuente no explica la diferencia ni cuál debe controlar la fabricación. No elija un valor ni sustituya uno por otro en el apilado definitivo sin confirmarlo con SiFli.

<!-- BGA-ONLY -->
<div align="center"><em>Tabla 6.1-2: Materiales y espesores de referencia para BGA</em></div>

<div align="center" markdown>

| Apilado de referencia | Núcleo | Prepreg | Rango de espesor total |
|:-----|:-----|:-----|:-----|
| BGA, 1,6 mm | Núcleo de cobre H/HOZ de 1,3 mm | 1080 RC67 %, etiqueta del material 3,3 mil; columna de espesor 3,01 mil (0,0764 mm) | 1,37–1,67 mm |
| BGA, 0,8 mm | Núcleo H/H de 0,55 mm, sin cobre | 1080 RC67 %, etiqueta del material 3,3 mil; columna de espesor 3,01 mil (0,0764 mm) | 0,70–0,90 mm |

</div>

!!! warning "Conflicto en la fuente: designación y espesor del prepreg BGA"
    Las figuras 3-1-2-3 y 3-1-2-4 de la guía PCB original, transcritas aquí en la tabla 6.1-2, identifican el prepreg BGA como `1080 RC67%, 3.3 mil`, mientras que la columna de espesor indica `3.01 mil (0.0764 mm)`. La fuente no explica la diferencia ni cuál debe controlar la fabricación. No elija un valor ni sustituya uno por otro en el apilado definitivo sin confirmarlo con SiFli.
<!-- /BGA-ONLY -->

Los cuatro apilados de referencia usan cobre de 1 oz en L1/L4 (1,38 mil; 0,0350 mm) y cobre de 0,60 mil (0,0152 mm) en cada cara de L2/L3.

Para un diseño QFN de 4 capas, se recomienda esta asignación: capa 1 (superior), vertido de cobre conectado a tierra, colocación de componentes y trazado de señales; capa 2, plano de tierra sólido sin señales para mantener la continuidad de referencia; capa 3, plano de alimentación, que puede dividirse por dominios y también alojar señales; capa 4 (inferior), vertido de cobre conectado a tierra con trazado de señales.

### 6.2. Resumen de restricciones críticas de PCB { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>Tabla 6.2-1: resumen de restricciones críticas de PCB</em></div>

<div align="center" markdown>

| Elemento | Restricción / fuente | Notas |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | Ancho de pista >= 0,4 mm (aprox. 16 mil) | Las rutas del cargador y la batería transportan más corriente; manténgalas cortas y anchas, y alejadas de las señales sensibles. |
| `VCC` / `PVDD` | Valores fuente en conflicto: el apartado 3.2.1 de la guía PCB exige >=0,4 mm; el elemento 44 de la tabla de autocomprobación 4-2-1-1 (variantes con alimentación por batería) exige `VCC` >=12 mil, mientras que el elemento 47 (variantes de 3,3 V) titula `PVDD` pero verifica `VCC` >=12 mil. | Confirme con SiFli la línea prevista, el alcance y el ancho; no elija solo a partir de estas referencias. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | Ancho de pista >= 10 mil | Solo para variantes alimentadas por batería; compruebe el límite de corriente de arranque suave, la corriente de irrupción y la carga permitida. |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`: >= 10 mil; `BUCK_FB`: > 0,25 mm | Mantenga `BUCK_LX` corto y ancho; consulte la sección 6.3 para el posicionamiento y la zona sin cobre. |
| `AVDD_BRF` / `AVDD33_AUD` | Ancho de pista >= 8 mil | Las alimentaciones analógica, RF y de audio deben ser cortas, limpias y filtrarse por separado. |
| USB DP/DN | Diferencial de 90 Ω | Pase primero por la protección ESD, evite derivaciones y mantenga continua la referencia de tierra. |
| Pista de antena RF | 50 Ω en configuración no balanceada | Priorice la capa superior, minimice las vías y proporcione una referencia de tierra continua y apantallamiento con vías de tierra. |
| Ancho del cobre de tierra a ambos lados de la pista RF | >= 60 mil en cada lado | Conecte el cobre de ambos lados a la tierra principal mediante varias vías. |
| Pistas del cristal de 48 MHz | Aproximadamente de 3 mm a 10 mm | Priorice la capa superior, el apantallamiento de tierra y una zona sin cobre bajo el cristal. |
| Pistas del cristal de 32,768 kHz | <= 10 mm | Mantenga la separación entre pistas, añada apantallamiento y evite las fuentes de ruido. |
| Colocación del cristal | >= 1,5 mm del pin de reloj del chip; > 1 mm del borde de la placa; >= 5 mm de fuentes de calor de PA, carga y PMU | Se aplica a cristales de 48 MHz y 32,768 kHz. |
| Bus MPI | Longitud total <= 20 mm; diferencia de longitud entre señales <= 3 mm | Agrupe reloj, datos y comandos, con una referencia de tierra continua. |
| Bus SDIO | Longitud total <= 50 mm; diferencia de longitud entre señales <= 6 mm | Agrupe CLK, CMD y DATA sobre una referencia de tierra continua. |
| `VDDIOA` | Ancho de pista >= 10 mil | Solo para variantes con alimentación de 3,3 V. |

</div>

Las figuras de reglas PTH y HDI también muestran valores de fabricación de referencia: ancho de pista mínimo y recomendado de 0,10 mm para PTH y 0,075 mm para HDI, con un máximo de 2,54 mm en ambos casos. Los ejemplos de vías muestran un taladro de 0,25 mm con pad de 0,45 mm para PTH y un taladro de 0,10 mm con pad de 0,23 mm para microvías HDI (el ejemplo de vía pasante es de 0,25 mm/0,45 mm). Son construcciones de referencia; confirme la capacidad y las reglas reales del fabricante antes de liberar la placa.

### 6.3. Trazado de alimentación { #63-power-layout }

- Mantenga cortas y anchas las rutas de alimentación de alta corriente.
- Aleje las rutas de carga de las señales analógicas, RF y de cristal sensibles.
- Coloque los condensadores de filtrado de VCC, PVDD, VBUS y VBAT cerca de los pines del chip. La guía PCB, apartado 3.2.1, especifica al menos 0,4 mm para `VCC` / `PVDD`, mientras que la tabla de autocomprobación 4-2-1-1, elemento 47, da un valor conflictivo de 12 mil (título `PVDD`, detalle de comprobación `VCC`); no fije el ancho de pista de ninguna de las dos líneas hasta que SiFli confirme el requisito aplicable. Coloque también cerca de sus pines los condensadores de filtrado de otras salidas, como VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD y AVDD_BRF. Dimensione esas pistas según la corriente de entrada y manténgalas cortas y anchas para reducir el rizado de la alimentación y mejorar la estabilidad.
- Si PVDD, AVDD_BRF, AVDD33 o AVDD33_AUD comparten una alimentación, trace ramas en estrella independientes desde la fuente; no comparta un tramo de alimentación previo a las ramas.
- Trace VBUS y VBAT como ramas en estrella independientes, sin compartir recorridos con otras líneas. Evite que las señales sensibles discurran en paralelo con estas rutas de carga.
- Coloque el inductor BUCK y sus condensadores de filtrado cerca de los pines del chip. Mantenga BUCK_LX corto y ancho, y use un ancho superior a 0,25 mm para BUCK_FB. Conecte los terminales de tierra de los condensadores de salida DC/DC al plano de tierra principal con varias vías. No vierta cobre en la capa superior bajo el inductor, conserve un plano de referencia continuo en la capa adyacente y no trace otras señales por la zona del inductor.
- Conecte las tierras de los condensadores a la tierra principal con vías cercanas.
- En las variantes alimentadas a 3,3 V, use trazado en estrella para las líneas analógicas, RF e IO principales.

!!! warning "Conflictos de alimentación sin resolver en la fuente"
    - **Ancho de pista y etiqueta de la línea:** El apartado 3.2.1 de la guía PCB original exige al menos 0,4 mm (unos 15,7 mil) para `VCC` y `PVDD`. El elemento 44 de la tabla de autocomprobación 4-2-1-1, aplicable a variantes con alimentación por batería, exige al menos 12 mil para `VCC`; el elemento 47, aplicable a variantes de 3,3 V, lleva el título `PVDD`, pero su detalle de comprobación exige al menos 12 mil para `VCC`. La fuente no concilia estos anchos ni aclara si el título o el detalle del elemento 47 identifica la línea prevista. No infiera un valor corregido ni aplique una entrada a ambas variantes de alimentación: confirme con SiFli la línea, el alcance y el ancho aplicables antes de cerrar el diseño.
    - **Nombres de salida:** El apartado 3.2.1 de la guía PCB original usa `VDD_VOUT1` / `VDD_VOUT2`, mientras que los elementos 45/46 de la tabla de autocomprobación 4-2-1-1 y la tabla de resumen de la sección 6.2 de esta página usan `VDD33_VOUT1` / `VDD33_VOUT2`. El título del elemento 46 repite `VDD33_VOUT1`, pero su detalle indica `VDD33_VOUT2`. La fuente no aclara si los nombres son alias o redes distintas.
    Sin la confirmación de SiFli, no elija un ancho de pista, no asigne el elemento 47 a una línea ni trate como equivalentes las variantes de los nombres de salida al cerrar el diseño.

### 6.4. Trazado del cristal { #64-crystal-layout }

- Mantenga una referencia de tierra sólida y continua bajo el circuito RF y el chip principal; no divida ni ranure el plano de tierra. Para la zona del cristal, la fuente también exige una referencia de tierra continua y retirar cobre bajo el cristal. Consulte la advertencia siguiente y no cierre la geometría de cobre de esta zona hasta que SiFli confirme los límites para el apilado elegido.
- Coloque los cristales a no menos de 1,5 mm del pin de reloj del chip, a más de 1 mm del borde y a no menos de 5 mm de fuentes de calor como PA, carga y PMU, para limitar la deriva de frecuencia por temperatura. La fuente indica al menos 0,25 mm de separación del cobre TOP alrededor del encapsulado y remite al diseño de referencia para las capas adyacentes, pero no explica cómo se relaciona esa medida con la zona sin cobre bajo el encapsulado. Confirme los límites aplicables con SiFli antes de liberar el diseño. No trace señales digitales de alta frecuencia directamente bajo el cristal; evite cualquier trazado en esa zona si es posible. Aleje de los cristales los componentes magnéticos, como los inductores de potencia.
- Trace XI/XO solo en la capa superior, sin cambios de capa. Mantenga las pistas cortas y simétricas y apantállelas en tres dimensiones con vías de tierra próximas a ambos lados. Coloque los condensadores de carga a cada lado del cristal, cerca de los extremos de las pistas junto al cristal, y conecte cada pad de tierra cerca del pad de tierra del cristal. Aleje las vías de alimentación de las pistas del cristal.
- Para el cristal de 48 MHz, use pistas en la capa superior de 3 a 10 mm de longitud y 0,1 mm de ancho. Mantenga al menos 0,15 mm entre las pistas paralelas 48M_XI y 48M_XO y aplique apantallamiento tridimensional de tierra. Aléjelas de VBAT, DC/DC y las señales de alta velocidad, y despeje la zona del cristal en la capa superior y las adyacentes.
- Para el cristal de 32,768 kHz, use pistas en la capa superior de hasta 10 mm de longitud y 0,1 mm de ancho. El modelo de trazado especifica al menos 0,15 mm entre 32K_XI y 32K_XO en paralelo, mientras que la lista de autocomprobación exige más del doble del ancho de pista (>0,2 mm para 0,1 mm de ancho). No fije la separación final hasta que SiFli confirme qué requisito aplicar. Añada apantallamiento tridimensional de tierra y despeje la zona del cristal en la capa superior y las capas adyacentes.

!!! warning "Conflictos sin resolver en las instrucciones de diseño del cristal"
    - **Apantallamiento de tierra y zona sin cobre:** El apartado 3.3 de la guía PCB exige una referencia de tierra continua en la zona del cristal y una zona sin cobre en TOP alrededor del cristal. La figura 3-3-1 (reproducida aquí como figura 6.9-30) indica al menos 0,25 mm alrededor del encapsulado. El elemento 6 de la tabla original de autocomprobación 4-3-1 exige apantallamiento GND completo alrededor del cristal y las pistas del oscilador, mientras que el elemento 7 especifica que no debe haber cobre bajo el cristal en la capa TOP para una placa PTH de 4 capas, y en las capas TOP y 2 para una placa HDI de 6 capas. La fuente no delimita el área de blindaje frente a la zona sin cobre ni explica cómo aplicar la instrucción de tierra continua en esas capas excluidas según la configuración de apilado. Es un conflicto de alcance sin resolver; no deduzca el patrón de cobre o tierra de cada capa.
    - **Separación de las pistas de 32,768 kHz:** El apartado 3.3 de la guía PCB y el modelo de trazado de la figura 3-3-4 (reproducida aquí como figura 6.9-33) especifican al menos 0,15 mm entre las pistas paralelas `32K_XI` / `32K_XO`. El elemento 9 de la tabla original de autocomprobación 4-3-1 exige una separación superior al doble del ancho base de pista, es decir, más de 0,2 mm para la pista de 0,1 mm indicada en la guía. Son requisitos mínimos de separación en conflicto.
    - **Alcance de la separación alrededor del encapsulado:** La figura 3-3-1 (reproducida aquí como figura 6.9-30) especifica al menos 0,25 mm de separación del cobre de TOP alrededor del encapsulado. El elemento 7 de la tabla original 4-3-1 define por separado las capas sin cobre bajo el cristal para las dos configuraciones de apilado, pero la fuente no explica cómo se relacionan esa separación perimetral y las zonas bajo el encapsulado o las restricciones de trazado en capas adyacentes.
    Estos conflictos y vacíos de alcance siguen sin resolverse en la documentación fuente de SiFli. Antes de liberar el diseño, solicite confirmación para el encapsulado y el apilado reales; no elija entre los requisitos de separación ni deduzca los límites de tierra o de zona sin cobre por capa.

### 6.5. Diseño RF { #65-rf-layout }

- Coloque la red de adaptación RF cerca del chip y alejada de la antena. Sitúe el condensador de filtrado AVDD_BRF junto a su pin en el chip y conecte su terminal de tierra directamente al plano de tierra principal mediante una vía.
- Mantenga cortas las pistas RF y reduzca las vías al mínimo práctico.
- Priorice el trazado RF en la capa superior y evite los cambios de capa. Cuando corresponda, se recomienda un ancho de pista superior a 10 mil. Proporcione apantallamiento tridimensional de tierra, evite los ángulos agudos y rectos, controle la impedancia a 50 Ω según el apilado de la PCB y coloque vías de tierra densas a ambos lados para formar una barrera continua.
- Mantenga despejada la zona de antena según los requisitos del proveedor y las restricciones de diseño industrial del producto.
- La diferencia entre el ancho del pad de un componente de adaptación y el de la pista puede causar una discontinuidad de impedancia. Una zona de exclusión en el plano de referencia bajo los pads, ajustada a sus dimensiones, puede ayudar a mantener la continuidad de impedancia.
- Si usa un conector de antena IPEX, elimine el cobre de todas las capas de la PCB que queden debajo. Simule y ajuste las antenas PCB en la placa real; reserve una red de adaptación CLC y colóquela lo más cerca posible de la antena.
- Aleje RF de LCD FPC, USB, SDIO, DC/DC, cristales y rutas de carga.

### 6.6. Señales analógicas y audio { #66-analog-and-audio }

- Coloque los condensadores de filtrado de AVDD33_AUD, MIC_BIAS y AUD_VREF junto a sus pines del chip, y conecte de forma fiable cada tierra al plano principal de la PCB.
- Coloque cerca del chip los condensadores de desacoplo de la alimentación analógica.
- Mantenga emparejadas en longitud las pistas diferenciales de audio y coloque las redes RC cerca del chip.
- Coloque los componentes periféricos de la entrada ADCP cerca de los pines del chip. Mantenga cortas las pistas, apantállelas con tierra y aléjelas de fuentes de interferencia intensa.
- Coloque los componentes periféricos de la salida DACP/DACN cerca de los pines del chip. Trace cada par P/N como diferencial, manténgalo corto y limite la capacitancia parásita a menos de 10 pF. Apantalle las pistas en tres dimensiones y aléjelas de fuentes de interferencia intensa.
- Apantalle en tres dimensiones las pistas GPADC y aléjelas de circuitos que puedan interferir, como los de detección de batería y temperatura.
- Evite que las rutas de retorno de alta corriente atraviesen la zona de audio.

### 6.7. Interfaces de alta velocidad { #67-high-speed-interfaces }

- Trace USB DP/DN como un par diferencial de 90 Ω y haga que pase primero por la protección ESD.
- Agrupe de forma compacta las señales de almacenamiento MPI con longitud total ≤ 20 mm y diferencia de longitud dentro del grupo ≤ 3 mm. Apantalle en tres dimensiones reloj, datos y comandos con tierra y mantenga continua la referencia de tierra.
- Agrupe de forma compacta las señales SDIO con longitud total ≤ 50 mm y diferencia de longitud dentro del grupo ≤ 6 mm. Apantalle en tres dimensiones reloj, comandos y datos con tierra.
- Disponga los buses paralelos de pantalla, como RGB/DPI, 8080 y EPD, sobre un plano de referencia de tierra continuo.
- Conecte USB PA35 (USB_DP) y PA36 (USB_DN) al chip después de pasar por la protección ESD. Use trazado diferencial de 90 Ω con apantallamiento tridimensional de tierra y conecte de forma fiable la tierra del dispositivo ESD a la tierra principal.
- Reserve resistencias en serie para los relojes de alta velocidad si puede ser necesario ajustar las emisiones EMI.

### 6.8. EMI, ESD y EOS { #68-emi-esd-and-eos }

- Revise la protección ESD de todas las interfaces externas.
- Evite trazados largos en la capa externa para relojes, alimentación y otras señales ruidosas fuera de la cubierta metálica de apantallamiento; llévelas por capas internas.
- Coloque cada dispositivo de protección ESD junto al pin correspondiente del conector. La señal debe pasar por el dispositivo antes de llegar al circuito posterior, sin derivaciones antes de la protección. Conecte su pin de tierra directamente a la tierra principal mediante vías, con una conexión corta y ancha.
- USB, cargador, conector de batería, teclas, táctil, pantalla, sensor de frecuencia cardiaca y antena son puntos prioritarios de protección.
- Coloque el punto de prueba de la línea de carga USB antes del TVS. Sitúe el TVS del conector de batería antes del circuito del chip, de modo que la señal pase por el TVS antes de llegar al chip.
- La protección de la entrada del cargador debe considerar conjuntamente OVP, EOS y ESD.

### 6.9. Figuras de referencia de PCB { #69-pcb-reference-figures }

Las siguientes figuras del SF32LB57x muestran encapsulados, huellas de PCB, apilados, salida de pistas desde el encapsulado, trazado y protección, y sirven como referencias visuales principales para nuevos diseños.

La figura de pads QFN80L indica 5,90 mm para el pad central expuesto; el plano del encapsulado indica 5,50 mm nominales (5,40–5,60 mm). Describen el pad PCB y el pad del encapsulado, respectivamente; no los intercambie como si fueran la misma dimensión. Verifique la revisión del encapsulado y la huella recomendada por SiFli antes de crear la biblioteca. Las figuras de esténcil QFN68L/QFN80L usan un espesor de 0,125 mm y una cobertura de pasta declarada del 60 % en el pad expuesto; pida al fabricante del esténcil que compruebe las dimensiones de las aberturas frente a esa cobertura.

<!-- BGA-ONLY -->
La figura de esténcil BGA112 usa un espesor de 0,075 mm, 112 aberturas cuadradas de 0,18 mm y radios de esquina R0,05 mm.
<!-- /BGA-ONLY -->

![Figura 6.9-1: dimensiones del encapsulado QFN68L de 7 × 7 × 0,9 mm](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: dimensiones del encapsulado QFN68L de 7 × 7 × 0,9 mm</em></div>

![Figura 6.9-2: dimensiones del encapsulado QFN68L de 7 × 7 × 1,1 mm](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: dimensiones del encapsulado QFN68L de 7 × 7 × 1,1 mm</em></div>

![Figura 6.9-3: patrón de pads PCB para QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-3: patrón de pads PCB para QFN68L</em></div>

![Figura 6.9-4: aberturas del esténcil para QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-4: aberturas del esténcil para QFN68L</em></div>

![Figura 6.9-5: dimensiones del encapsulado QFN80L de 8 × 8 × 0,9 mm](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-5: dimensiones del encapsulado QFN80L de 8 × 8 × 0,9 mm</em></div>

![Figura 6.9-6: dimensiones del encapsulado QFN80L de 8 × 8 × 1,1 mm](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-6: dimensiones del encapsulado QFN80L de 8 × 8 × 1,1 mm</em></div>

![Figura 6.9-7: patrón de pads PCB para QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-7: patrón de pads PCB para QFN80L</em></div>

![Figura 6.9-8: aberturas del esténcil para QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-8: aberturas del esténcil para QFN80L</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-9: dimensiones del encapsulado BGA112 de 5,4 × 4,4 × 0,98 mm](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-9: dimensiones del encapsulado BGA112 de 5,4 × 4,4 × 0,98 mm</em></div>

![Figura 6.9-10: dimensiones del encapsulado BGA112 de 5,4 × 4,4 × 1,03 mm](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-10: dimensiones del encapsulado BGA112 de 5,4 × 4,4 × 1,03 mm</em></div>

![Figura 6.9-11: patrón de pads PCB para BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-11: patrón de pads PCB para BGA112</em></div>

![Figura 6.9-12: aberturas del esténcil para BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-12: aberturas del esténcil para BGA112</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-13: referencia de apilado de PCB QFN de 1,6 mm](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-13: referencia de apilado de PCB QFN de 1,6 mm</em></div>

![Figura 6.9-14: referencia de apilado de PCB QFN de 0,8 mm](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-14: referencia de apilado de PCB QFN de 0,8 mm</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-15: referencia de apilado de PCB BGA de 1,6 mm](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-15: referencia de apilado de PCB BGA de 1,6 mm</em></div>

![Figura 6.9-16: referencia de apilado de PCB BGA de 0,8 mm](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-16: referencia de apilado de PCB BGA de 0,8 mm</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-17: reglas de diseño de PCB PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-17: reglas de diseño de PCB PTH</em></div>

![Figura 6.9-18: reglas de diseño de vías PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-18: reglas de diseño de vías PTH</em></div>

![Figura 6.9-19: reglas de diseño de PCB HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-19: reglas de diseño de PCB HDI</em></div>

![Figura 6.9-20: reglas de diseño de vías HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-20: reglas de diseño de vías HDI</em></div>

![Figura 6.9-21: salida de pistas en la capa superior de QFN68](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-21: salida de pistas en la capa superior de QFN68</em></div>

![Figura 6.9-22: salida de pistas en la capa superior de QFN80](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-22: salida de pistas en la capa superior de QFN80</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-23: salida de pistas del encapsulado BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-23: salida de pistas del encapsulado BGA112</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-24: trazado de alimentación VCC en QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-24: trazado de alimentación VCC en QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-25: trazado de alimentación VCC en BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-25: trazado de alimentación VCC en BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-26: trazado de VBUS y VBAT en QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-26: trazado de VBUS y VBAT en QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-27: trazado de VBUS y VBAT en BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-27: trazado de VBUS y VBAT en BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-28: trazado DC/DC en QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-28: trazado DC/DC en QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-29: trazado DC/DC en BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-29: trazado DC/DC en BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-30: zona de exclusión para la colocación del cristal](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-30: zona de exclusión para la colocación del cristal</em></div>

![Figura 6.9-31: modelo de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-31: modelo de trazado del cristal de 48 MHz</em></div>

![Figura 6.9-32: referencia de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-32: referencia de trazado del cristal de 48 MHz</em></div>

![Figura 6.9-33: modelo de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-33: modelo de trazado del cristal de 32,768 kHz</em></div>

![Figura 6.9-34: referencia de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-34: referencia de trazado del cristal de 32,768 kHz</em></div>

![Figura 6.9-35: disposición de la red de adaptación RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-35: disposición de la red de adaptación RF</em></div>

![Figura 6.9-36: referencia de trazado de la señal RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-36: referencia de trazado de la señal RF</em></div>

![Figura 6.9-37: filtrado de la alimentación de audio](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-37: filtrado de la alimentación de audio</em></div>

![Figura 6.9-38: disposición de la entrada de audio analógico](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-38: disposición de la entrada de audio analógico</em></div>

![Figura 6.9-39: disposición de la salida de audio analógico](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-39: disposición de la salida de audio analógico</em></div>

![Figura 6.9-40: modelo de trazado SDIO](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-40: modelo de trazado SDIO</em></div>

![Figura 6.9-41: referencia de trazado PCB de SDIO](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-41: referencia de trazado PCB de SDIO</em></div>

![Figura 6.9-42: referencia de colocación de componentes USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-42: referencia de colocación de componentes USB</em></div>

![Figura 6.9-43: modelo de trazado USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-43: modelo de trazado USB</em></div>

![Figura 6.9-44: referencia de trazado PCB de USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-44: referencia de trazado PCB de USB</em></div>

![Figura 6.9-45: referencia de colocación de TVS en la alimentación](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-45: referencia de colocación de TVS en la alimentación</em></div>

![Figura 6.9-46: referencia de puesta a tierra de EOS/TVS](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-46: referencia de puesta a tierra de EOS/TVS</em></div>
