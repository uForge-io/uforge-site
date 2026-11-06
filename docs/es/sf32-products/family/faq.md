---
icon: lucide/circle-help
description: "Preguntas frecuentes sobre productos SF32: elección de chips, módulos y placas; memoria e interfaces; Bluetooth, GPIO, marcado, disponibilidad y personalización."
tags:
    - Hardware
    - Preguntas frecuentes
---

# Preguntas frecuentes de SF32 { #sf32-faq }

## Elegir un producto { #choosing-a-product }

### ¿Qué familia SF32 debería elegir? { #choosing-a-family }

Evalúe primero estos criterios de selección:

- **Resolución de pantalla:** Número de píxeles, interfaz, frecuencia de refresco y memoria de framebuffer necesarios.
- **Modo Bluetooth:** Solo BLE o modo dual con BLE y Bluetooth Classic.
- **Número de GPIO:** Pines utilizables tras descontar los asignados a interfaces y memoria.
- **Tamaño del encapsulado:** Superficie ocupada, paso de pines y requisitos de montaje de la PCB.
- **Alimentación:** Batería o fuente regulada, rango de tensión de funcionamiento y niveles de E/S.
- **Funciones de audio:** Requisitos de ADC/DAC, I2S y PDM, incluidos los canales de micrófono.

Compare referencias concretas, no solo números de familia: un número mayor no implica una mejor elección. El [Selector de productos](../product-selector.md) permite filtrar por encapsulado, alimentación, pantalla, GPIO, audio y otros criterios, pero no ofrece un filtro para el modo Bluetooth. Use los filtros disponibles para acotar las opciones y confirme la compatibilidad con BLE/Classic Bluetooth en la página del modelo exacto.

[Comparación de familias](SF32_family.md) · [Selector de productos](../product-selector.md)

### ¿Debería usar un chip, un módulo o una placa de desarrollo? { #chip-or-modules }

Use una placa para evaluar la plataforma y validar el firmware. Un módulo reduce el trabajo de diseño de RF, cristal y conexión de memoria en la placa portadora, y puede reducir el coste global de desarrollo. En productos de bajo volumen, también permite delegar la cadena de suministro de los componentes del módulo; su certificación de RF puede ser útil según la región. Elija un diseño con chip cuando el coste, el tamaño o la flexibilidad justifiquen asumir el diseño del esquemático, la PCB y la RF. Ninguna opción elimina la validación del producto final. Se irán incorporando más módulos a medida que estén disponibles.

[Planificar un producto](product-planning.md)

### ¿Con qué placa de desarrollo debería empezar? { #choosing-a-board }

Empiece con la placa DevKit-LCD de su familia de chips: [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) (variante de memoria N32R16) o [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) (variante N16R32N1). Para SF32LB52x también hay placas compactas: [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) y [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md), esta última para evaluar diseños de bajo consumo en dispositivos vestibles. Compruebe que la variante de memoria de la placa coincida con la referencia objetivo; la guía oficial de modelos de placa de SiFli enumera todas las placas.

[Selector de productos](../product-selector.md) · [Guía oficial de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html)

### ¿Cómo se interpretan las referencias de chips y módulos? { #reading-part-numbers }

Lea el código de pedido completo, no solo el prefijo de familia. Los códigos de chip distinguen dispositivo, encapsulado y memoria; los sufijos del módulo describen el almacenamiento y la memoria instalados. Consulte ejemplos y excepciones heredadas en la guía y confirme con el proveedor la configuración que puede pedir.

[Nomenclatura SF32](SF32_namingrule.md)

## Memoria y especificaciones { #memory-and-specifications }

### ¿Qué diferencia hay entre SRAM, PSRAM y Flash? { #memory-types }

SRAM y PSRAM guardan datos de ejecución y los pierden cuando se corta la alimentación; los modos de retención dependen del dispositivo. La SRAM interna y la PSRAM externa o integrada en el encapsulado difieren en acceso, ancho de banda y consumo. La Flash guarda firmware y recursos de forma no volátil. Más Flash no compensa la falta de RAM de trabajo.

[Tipos de memoria](../../learn/architecture/psram-and-memory-types.md)

### ¿Cuánta memoria necesita mi aplicación? { #sizing-memory }

Presupueste RAM para el sistema operativo, pilas, heap, búferes gráficos, audio y tareas simultáneas. Un framebuffer básico necesita ancho × alto × bytes por píxel × número de búferes; añada alineación del paso de línea y búferes de renderizado adicionales. Calcule aparte el almacenamiento no volátil para firmware, fuentes, imágenes, audio, archivos e imágenes OTA. Mida el uso máximo con la carga prevista.

[Introducción a gráficos](../../learn/graphics/overview.md) · [Planificar un producto](product-planning.md)

### ¿Cuándo conviene elegir NOR, NAND o eMMC? { #choosing-storage }

Decida según la ruta de arranque, la capacidad, el patrón de acceso y el soporte de software, no solo por la capacidad. NOR suele servir para código y lecturas aleatorias; NAND necesita gestión de bloques de borrado, ECC y bloques defectuosos; eMMC incluye un controlador de almacenamiento gestionado. En estas descripciones, SPI-NAND y QSPI-NAND designan la misma opción, no una discrepancia de producto. Confirme el soporte del cargador de arranque, controlador y sistema de archivos del dispositivo exacto.

[Tipos de memoria](../../learn/architecture/psram-and-memory-types.md) · [Códigos de sufijo de módulos](SF32_namingrule.md#module-naming)

### ¿Todos los modelos tienen todas las funciones de su familia? { #family-versus-sku }

No. Un resumen de familia puede reunir capacidades de varios modelos. Memoria, alimentación, pines utilizables e interfaces accesibles dependen del SKU, encapsulado y multiplexación. Un periférico del chip puede no estar expuesto por el módulo o la placa. Consulte la tabla de variantes, la hoja de datos y la asignación de pines, además del soporte del SDK para la función requerida.

[Comparación de familias](SF32_family.md) · [Selector de productos](../product-selector.md)

## Adecuación a la aplicación { #application-fit }

### ¿Cómo elijo un dispositivo para mi pantalla? { #choosing-a-display }

Primero haga coincidir la interfaz eléctrica y la temporización del panel; después compruebe la resolución, el formato de píxel, la frecuencia de refresco objetivo, la memoria de framebuffer y el ancho de banda. La resolución máxima no garantiza fluidez. Confirme la aceleración gráfica y el controlador del panel y pruebe pantallas y animaciones representativas con la memoria prevista.

[Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [Controlador de pantalla](../../learn/graphics/display-controller.md) · [Introducción a gráficos](../../learn/graphics/overview.md)

### ¿Cómo compruebo el soporte de audio y micrófonos? { #audio-and-microphones }

Compruebe canales ADC y DAC para rutas analógicas, I2S para dispositivos de audio digital y PDM para micrófonos digitales. Una interfaz PDM puede transportar hasta dos canales de micrófono; contar interfaces no equivale a contar micrófonos. Los canales utilizables también dependen de los pines expuestos, multiplexación, controlador y conexiones de la placa. Verifique la configuración prevista, no sume interfaces sin más.

[Introducción al audio](../../learn/audio/overview.md) · [Glosario](../../about/glossary.md)

### ¿Qué productos admiten BLE, Bluetooth Classic o ambos? { #bluetooth-modes }

SF32LB55x solo admite BLE; SF32LB52x, SF32LB56x, SF32LB57x y SF32LB58x ofrecen Bluetooth de modo dual. La capacidad de radio no garantiza todos los perfiles, códecs o funciones en cada configuración del SDK. Compruebe el perfil requerido y su ejemplo probado; admitir BLE no demuestra soporte de audio Bluetooth Classic ni BLE Audio.

[Comparación de familias](SF32_family.md) · [Introducción a Bluetooth](../../learn/bluetooth/overview.md)

### ¿Necesito un dispositivo Wi-Fi externo? { #wifi }

Los productos SF32 de este catálogo no integran una radio Wi-Fi. La opción Wi-Fi del selector indica una conexión externa por SDIO, no Wi-Fi integrado. El dispositivo externo también necesita alimentación, pines, controladores y software de red compatibles; tener SDIO no demuestra que exista una solución funcional.

[Selector de productos](../product-selector.md)

### ¿Cuántos pines GPIO hay realmente disponibles? { #usable-gpios }

Parta del encapsulado y la memoria exactos y descuente los pines ocupados por interfaces y funciones de la placa. Un módulo solo expone parte de los pines del chip. En SF32LB57x BGA112, los pines adicionales MPI3/salida estática tienen funciones restringidas; no son GPIO asignables libremente. No use la cifra anunciada como presupuesto garantizado de pines GPIO para la aplicación.

[Notas sobre GPIO de la familia](SF32_family.md) · [Variantes SF32LB57x](../chips/SF32LB57x.md)

## Disponibilidad y planificación del producto { #availability-and-product-planning }

### ¿Qué significa el marcado del módulo para mi producto? { #module-markings }

Use el resumen de etiquetas para identificar las variantes marcadas y solicite los documentos de aprobación y las condiciones de integración aplicables. Un identificador FCC o marcado CE impreso no demuestra por sí solo que cubra su producto final. Los cambios de antena, placa portadora o carcasa deben revisarse frente a las condiciones aplicables.

[Marcado del módulo 52](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [Marcado del módulo 56](../modules/SF32LB56-MOD.md#regulatory-markings) · [Marcado del módulo 58](../modules/SF32LB58-MOD.md#regulatory-markings)

### ¿Puedo solicitar otra configuración de memoria o módulo? { #custom-configurations }

Contacte con μForge.io e indique el chip o módulo, las capacidades de almacenamiento y PSRAM, las interfaces, los requisitos de antena, el volumen y el calendario previstos. Confirme la viabilidad, el soporte del SDK, el pedido mínimo y el plazo antes de cerrar el diseño. Que una configuración se haya documentado anteriormente no garantiza que siga disponible; SF32LB58-MOD-E4R32N1 ya no está disponible debido a la escasez de chips de memoria.

[Contactar con μForge.io](../../about/contact.md) · [Disponibilidad del módulo 58](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### ¿Cómo confirmo la disponibilidad y consigo muestras? { #samples-and-documentation }

Use los enlaces de compra y documentación de la página del producto y especifique el código de pedido completo y la revisión requerida al contactar con el proveedor. Confirme disponibilidad, memoria, antena y plazo actuales. Empiece con una placa de evaluación compatible cuando sea posible y use la documentación oficial del modelo exacto, no el resumen de familia, como referencia final de diseño.

[Contactar con μForge.io](../../about/contact.md) · [Selector de productos](../product-selector.md)
