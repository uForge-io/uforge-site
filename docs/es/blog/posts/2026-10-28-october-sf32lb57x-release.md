---
icon: lucide/rss
description: "SF32LB57x ya está documentado: cerca del doble de potencia de CPU de aplicación que SF32LB56x, gráficos ePicasso 3.0 y una estructura de costes competitiva."
---

# Octubre: presentamos SF32LB57x [2026-10-28] { #october-sf32lb57x-2026-10-28 }

Este mes, μForge.io ha incorporado la familia SF32LB57x. Es el paso mejorado respecto a SF32LB52x y SF32LB56x, con bastante más potencia de CPU y capacidad gráfica, y manteniendo una estructura de costes muy competitiva.

### Más potencia de CPU { #more-cpu-power }

SF32LB52x y SF32LB56x combinan cada uno un núcleo de aplicación Cortex-M33 de 240 MHz con un núcleo de bajo consumo. SF32LB57x usa dos núcleos de alto rendimiento Cortex-M33 STAR-MC1 de 240 MHz más un núcleo de bajo consumo de 24 MHz que actúa como controlador Bluetooth dedicado. Los dos núcleos de alto rendimiento suman 1968 CoreMark / 740 DMIPS, aproximadamente el doble de los 984 CoreMark / 370 DMIPS del núcleo de aplicación de SF32LB56x. Ese margen permite que el renderizado de la interfaz, la lógica de la aplicación y el procesamiento de audio o multimedia se ejecuten en núcleos distintos en lugar de competir por uno solo, mientras Bluetooth y los sensores permanecen en la vía de bajo consumo.

### Más capacidad gráfica { #more-graphics-capability }

Los gráficos pasan a ePicasso 3.0 con descompresión por hardware eZip 3.0, frente a ePicasso 2.0 Lite en SF32LB52x y ePicasso 2.0 en SF32LB56x. ePicasso 3.0 acelera la rotación, el escalado, la proyección, el espejo y la mezcla alfa en tiempo real, y eZip 3.0 descomprime recursos eZip, JPEG y MJPEG sin una decodificación que sobrecargue la CPU. Además de los núcleos, la familia añade entrada de cámara DCMI, hasta 48 MB de PSRAM y 32 MB de NOR Flash en el encapsulado en ciertas referencias, dos ADC de audio, dos interfaces CAN y PTM, una máquina de tareas paralelas que descarga trabajo de periféricos sensible a la temporización.

### Una estructura de costes competitiva { #competitive-cost-structure }

Este salto no sitúa a SF32LB57x en otra categoría de coste. En nuestra opinión, mantiene una estructura de costes muy competitiva para la potencia de cálculo y los gráficos que ofrece, y los encapsulados compactos QFN68 (7 × 7 mm), QFN80 (8 × 8 mm) y BGA112 (5,4 × 4,4 mm) ayudan a contener el tamaño y la complejidad de la placa. Es un candidato natural para productos que se han quedado pequeños con SF32LB52x o SF32LB56x, como interfaces de smartwatch más ricas, dispositivos de mano con cámara y terminales compactos centrados en la pantalla, sin pasar a una plataforma de gama alta.

### Documentación y por dónde empezar { #documentation-and-where-to-start }

La [página del chip SF32LB57x](../../sf32-products/chips/SF32LB57x.md) ofrece la descripción completa y las referencias están en el [selector de productos](../../sf32-products/product-selector.md). La [guía de diseño de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) sigue la misma estructura de esquemático, diseño de PCB, listas de verificación y revisión que las demás familias. Elige la referencia exacta antes de reutilizar un esquemático, ya que el encapsulado y la base de alimentación determinan detalles como cuántos GPIO se pueden usar, y confirma las cifras finales en las hojas de datos de SiFli.

### Otras novedades del mes { #also-this-month }

El coreano se suma como noveno idioma y las traducciones descritas en la [entrada anterior](2026-10-07-multi-language-translation.md) ya están publicadas. Siguen siendo traducciones asistidas por máquina y pueden no sonar naturales a los hablantes nativos; si alguna página necesita mejoras, [cuéntanoslo](../../about/contact.md).
