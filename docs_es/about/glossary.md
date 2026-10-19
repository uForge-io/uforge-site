---
icon: lucide/book-a
description: "Glosario de referencia rápida de términos y siglas de sistemas embebidos, inalámbricos, gráficos y específicos de SiFli utilizados en la documentación de μForge.io para SF32."
tags:
    - Acerca de
---
# Glosario { #glossary }

Referencia rápida de siglas y términos utilizados en todo el sitio μForge.io — tanto terminología general de sistemas embebidos/inalámbricos como nombres específicos de SiFli para la plataforma SF32. Las entradas enlazan a la página donde el término se explica en profundidad; esta página es una ayuda de consulta, no un sustituto de ese contexto.

## Arquitectura y procesamiento { #architecture-and-processing }

* **MCU** — **Microcontroller Unit (unidad de microcontrolador).** Circuito integrado que combina un núcleo de CPU, memoria y periféricos programables de entrada/salida. Está optimizado para ejecutar firmware específico con poca sobrecarga, no un sistema operativo de propósito general.
* **SoC** — **System on Chip (sistema en un chip).** Circuito integrado que reúne en un mismo chip los circuitos y componentes electrónicos necesarios para un sistema informático. En este sitio, los productos SF32 se clasifican como MCU porque se orientan a firmware de clase microcontrolador, no a ofrecer el entorno completo de sistema operativo de un procesador de aplicaciones.
* **Arm Cortex-M33** — Arquitectura de procesador Armv8-M Mainline de 32 bits usada en los núcleos de aplicación y Bluetooth de SF32. Armv8-M Mainline admite una extensión de seguridad TrustZone opcional (que aísla por hardware el código y los datos confiables de los no confiables), a diferencia de los núcleos Cortex-M3/M4 anteriores. Sin embargo, TrustZone depende de la configuración de cada implementación de silicio: no está garantizado en todos los Cortex-M33 y no está configurado en las variantes actuales comprendidas entre SF32LB52x y SF32LB58x. Consulte también la entrada STAR-MC1 y la [página del chip SF32LB52x](../sf32-products/chips/SF32LB52x.md).
* **STAR-MC1** — IP de CPU embebida Armv8-M Mainline configurable de Arm China, utilizada como procesador de aplicación de clase Cortex-M33 en los dispositivos SF32 compatibles. Las configuraciones CU, SP y SE varían en caché, TCM, XIPU y TrustZone; el conjunto de funciones disponible depende de cada componente SF32. La documentación de SiFli puede usar «Arm Cortex-M33 STAR-MC1» o «Arm Cortex-M33» según el contexto. Consulte la [página de arquitectura STAR-MC1](../learn/architecture/star-mc1.md).
* **CDE** — **Custom Datapath Extension (extensión de ruta de datos personalizada).** Un mecanismo de instrucción personalizada de Arm para aceleración selectiva. El material de Arm China sobre STAR-MC1 usa CRC32 como ejemplo de CDE; la disponibilidad real en SF32 y el soporte de software deben verificarse por dispositivo.
* **DSP** — **Digital Signal Processor / digital signal processing (procesador de señal digital / procesamiento de señal digital).** Extensiones integradas en el núcleo Cortex-M33, utilizadas para cargas de trabajo intensivas en matemáticas como audio y fusión de sensores.
* **MPU** — **Memory Protection Unit (unidad de protección de memoria).** Hardware que restringe a qué regiones de memoria puede acceder el código, utilizado para aislamiento de fallos y seguridad.
* **HAL** — **Hardware Abstraction Layer (capa de abstracción de hardware).** La capa del SDK que expone los periféricos mediante una API coherente, independiente de la variante exacta del chip.
* **Acelerador de IA / ML** — Hardware que acelera cargas de trabajo de inteligencia artificial o aprendizaje automático, como la inferencia de un modelo neuronal compacto. La disponibilidad depende del dispositivo; utilice el selector de productos y la hoja de datos correspondiente para confirmar las prestaciones del componente elegido.

## Conectividad inalámbrica { #wireless-connectivity }

* **BLE** — **Bluetooth Low Energy (Bluetooth de bajo consumo).** El modo de radio Bluetooth de bajo consumo en el que se basan la mayoría de los productos SF32 vestibles y de IoT.
* **Wi-Fi** — Tecnología de red de área local inalámbrica. Cuando la documentación de un producto SF32 indica compatibilidad con Wi-Fi externo, la conexión se realiza a través de la interfaz SDIO. Antes de cerrar el diseño, confirme la referencia exacta, el enrutamiento de la placa, la alimentación y el soporte de software.
* **Bluetooth de doble modo** — Compatibilidad con BLE y Bluetooth clásico (BR/EDR) en una misma radio. Se utiliza cuando un producto necesita ambos, por ejemplo, transmisión de audio (Bluetooth clásico o LE Audio) junto con un canal de control de bajo consumo. Disponible en SF32LB52x/56x/57x/58x; SF32LB55x solo admite BLE.
* **GAP** — **Generic Access Profile (perfil de acceso genérico).** La capa Bluetooth que rige los roles del dispositivo, la difusión (advertising) y el establecimiento de conexión — la base sobre la que se apoya toda aplicación BLE.
* **GATT** — **Generic Attribute Profile (perfil de atributos genérico).** Capa Bluetooth que define la estructura de los servicios y las características, así como la forma de intercambiar los datos que expone un dispositivo BLE.
* **Sibles** — Framework de servicios GATT de SiFli-SDK, construido sobre la capa GAP estándar. La mayoría de los productos Bluetooth SF32 parten de un ejemplo existente basado en Sibles, en lugar de crear una base de datos GATT desde cero. Consulte la [descripción general de Bluetooth](../learn/bluetooth/overview.md).
* **LE Audio** — Estándar reciente de audio Bluetooth Low Energy que incluye el códec LC3 y los modos de difusión de audio Auracast; se distingue de los perfiles de audio Bluetooth clásico. Disponible en SF32LB52x/56x/57x/58x, pero no en SF32LB55x. Consulte [Audio Bluetooth y LE Audio](../learn/bluetooth/processor.md).
* **OTA** — **Over-The-Air (por vía inalámbrica).** Actualización del firmware de un dispositivo mediante una conexión inalámbrica, normalmente BLE, en lugar de una conexión cableada.
* **DFU** — **Device Firmware Update (actualización del firmware del dispositivo).** Categoría general de mecanismos y protocolos de actualización del firmware; las actualizaciones OTA por Bluetooth suelen implementar un mecanismo DFU.

## Gráficos y pantalla { #graphics-and-display }

* **ePicasso** — El motor de aceleración gráfica 2D/2,5D propio de SiFli para la familia SF32, que descarga operaciones de píxeles como copia de imágenes, mezcla (blending), escalado, rotación y composición de capas de la CPU de aplicación. Consulte la [página de arquitectura de ePicasso](../learn/graphics/epicasso-gpu.md).
* **eZip** — Formato propio de SiFli para comprimir gráficos y datos de propósito general sin pérdida, con decodificación por hardware en los dispositivos SF32 compatibles. Para gráficos, SiFli indica una tasa de compresión ligeramente superior a la de PNG; para otros datos, el resultado depende del contenido de origen. Como los recursos comprimidos se transfieren por el bus antes de decodificarse, eZip puede reducir el ancho de banda de transferencia desde la PSRAM y la NOR Flash.
* **TurboPixel** — Formato con pérdida y razón de compresión fija para el framebuffer final en los componentes SF32 compatibles. extDMA comprime el mapa de bits renderizado a TurboPixel, y el controlador de pantalla lo descomprime para reducir el ancho de banda y la capacidad de PSRAM necesarios. Consulte la [página de compresión de framebuffer TurboPixel](../learn/graphics/turbopixel.md).
* **LVGL** — **Light and Versatile Graphics Library (biblioteca gráfica ligera y versátil).** Framework de interfaz gráfica embebida de código abierto que la mayoría de los productos SF32 utiliza para la interfaz de usuario de la aplicación, con renderizado acelerado por ePicasso.
* **HMI** — **Human-Machine Interface (interfaz persona-máquina).** Término que agrupa, como categoría de diseño, los elementos de interacción del dispositivo, como la pantalla, la pantalla táctil y los botones.
* **Interfaz de pantalla RGB / DPI** — Una interfaz de pantalla paralela que transporta los componentes de color de píxel directamente a un panel o controlador de pantalla compatible. Su nombre formal es **DPI (Display Pixel Interface)**; «interfaz RGB» es la abreviatura común en el diseño de placas. Normalmente utiliza un reloj de píxel, señales de sincronización horizontal y vertical, y múltiples líneas de datos de color en paralelo. Comparada con una interfaz de pantalla serial, DPI utiliza más GPIO y requiere un enrutamiento de pistas paralelas más cuidadoso, así que confirme el presupuesto de pines del encapsulado objetivo y los requisitos de temporización del panel.
* **Interfaz de pantalla MIPI** — Una interfaz de pantalla especificada por los estándares de MIPI Alliance, utilizada por paneles compatibles de mayor ancho de banda.
* **EPD** — **Electronic Paper Display (pantalla de papel electrónico).** Una tecnología de pantalla comúnmente utilizada para pantallas reflectivas de bajo consumo.
* **Interfaz de pantalla JDI** — Soporte para pantallas compatibles JDI / Sharp Memory-in-Pixel, donde esté documentado para el dispositivo SF32 seleccionado.

## Audio { #audio }

* **ADC / DAC** — **Analog-to-Digital / Digital-to-Analog Converter (convertidor analógico-digital / digital-analógico).** Rutas de entrada y salida de audio de los componentes SF32 con funciones de audio integradas. El ADC/DAC de audio dedicado está disponible en SF32LB52x/56x/57x/58x; SF32LB55x carece de ADC/DAC de audio dedicado.
* **PDM** — **Pulse-Density Modulation (modulación por densidad de pulsos).** Interfaz habitual para micrófonos digitales, compatible junto con I2S en los componentes SF32 con funciones de audio. Una interfaz PDM no equivale a un micrófono: normalmente, una interfaz puede conectar hasta dos micrófonos digitales que comparten el reloj; uno utiliza el flanco ascendente y el otro el descendente para identificar los canales izquierdo y derecho. Especifique y compare el número de interfaces PDM, no el número de micrófonos.
* **I2S** — **Inter-IC Sound (sonido entre circuitos integrados).** Una interfaz de audio digital estándar para conectar códecs, DAC u otros periféricos de audio.

## Alimentación y fiabilidad { #power-and-reliability }

* **PMU** — **Power Management Unit (unidad de gestión de energía).** El bloque integrado que gestiona la regulación de voltaje (salidas BUCK/LDO) dentro de los chips SF32; algunos diseños lo combinan con un PMIC externo de SiFli (p. ej., SF30147C) para rieles de alimentación adicionales.
* **PMIC** — **Power Management IC (circuito integrado de gestión de energía).** Chip externo dedicado que proporciona salidas de alimentación reguladas adicionales a las que suministra la PMU interna de la MCU.
* **LDO** — **Low-Dropout regulator (regulador lineal de baja caída de tensión).** Tipo de regulador lineal y una de las etapas de salida internas de la PMU en los componentes SF32.
* **BUCK** — Una topología de regulador de voltaje conmutado (no lineal), más eficiente que un LDO a mayor corriente, también integrada en la PMU de SF32.
* **TRNG** — **True Random Number Generator (generador de números aleatorios verdaderos).** Fuente de entropía de hardware basada en el ruido térmico físico, utilizada para generar claves criptográficas y habilitar funciones de seguridad.
* **PSA** — **Platform Security Architecture (arquitectura de seguridad de plataforma).** Marco de seguridad y esquema de certificación de Arm. Algunas páginas de chips SF32 indican **PSA Certified Level 1**; compruebe en la documentación oficial del modelo exacto si está certificado y qué nivel tiene, sin asumir que se aplica a toda la familia.

## Almacenamiento y memoria { #storage-and-memory }

* **SRAM** — **Static RAM (RAM estática).** La memoria de trabajo rápida en el chip, utilizada para ejecutar código de aplicación y datos.
* **PSRAM** — **Pseudo-Static RAM (RAM pseudoestática).** Memoria externa de mayor capacidad (a menudo System-in-Package en los módulos SF32) utilizada para ampliar la capacidad más allá de la SRAM integrada en el chip, para búferes gráficos y aplicaciones más grandes.
* **NOR / NAND Flash** — Dos tipos de memoria flash no volátil utilizados para el almacenamiento de firmware y recursos; NOR admite lecturas aleatorias rápidas y es común para la ejecución directa de código (XiP, Execute-in-Place), mientras que NAND/SD-NAND sacrifica velocidad de acceso aleatorio por una densidad mucho mayor, adecuada para el almacenamiento masivo de imágenes, fuentes y registros.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (o Serial Peripheral) Interface (interfaz periférica octal/cuádruple).** La clase de número de pines/ancho de banda de la interfaz de flash o PSRAM (Quad = 4 líneas de datos, Octal = 8), que afecta al ancho de banda de memoria alcanzable.
* **eMMC** — **Embedded MultiMediaCard (tarjeta multimedia embebida).** Interfaz de almacenamiento basada en memoria NAND gestionada, utilizada en diseños SF32 que requieren mayor capacidad.

## Periféricos e interfaces { #peripherals-and-interfaces }

* **GPIO** — **General-Purpose Input/Output (entrada/salida de propósito general).** Pines digitales configurables para señales sencillas, botones, LED e interfaces implementadas por software mediante bit-banging.
* **E/S (I/O)** — **Input/Output (entrada/salida).** Un término general para los pines y señales de periféricos a través de los cuales un dispositivo intercambia datos o señales de control con el resto de un sistema.
* **UART** — **Universal Asynchronous Receiver/Transmitter (transmisor-receptor asíncrono universal).** La interfaz serial estándar utilizada para salida de consola/depuración y comunicación simple punto a punto.
* **SPI** — **Serial Peripheral Interface (interfaz periférica serie).** Un bus serial síncrono utilizado para pantallas, memoria flash, sensores y otros periféricos de alta velocidad.
* **I2C** — **Inter-Integrated Circuit (circuito inter-integrado).** Un bus serial síncrono multipunto comúnmente utilizado para sensores y configuración de periféricos de baja velocidad.
* **SDIO** — **Secure Digital Input Output (entrada/salida Secure Digital).** Una interfaz de host utilizada por los diseños SF32 documentados para conectar un dispositivo Wi-Fi externo.
* **DCMI** — **Digital Camera Module Interface (interfaz de módulo de cámara digital).** Una interfaz de cámara paralela para conectar un sensor de imagen compatible.
* **FreeIO** — La capacidad flexible de asignación de GPIO de SiFli, que permite mapear las señales compatibles a las GPIO adecuadas dentro de las restricciones documentadas del dispositivo.
* **PTM** — **Peripheral Task Machine (máquina de tareas de periféricos).** Una función de hardware de SiFli para el manejo determinista de tareas de periféricos en los dispositivos compatibles.
* **RTC** — **Real-Time Clock (reloj de tiempo real).** Un periférico de mantenimiento de la hora que puede seguir funcionando (o despertar el sistema) independientemente de los dominios de reloj de la aplicación principal.

## Hardware y fabricación { #hardware-and-manufacturing }

* **QFN** — **Quad Flat No-lead package (encapsulado plano cuadrado sin terminales).** Tipo de encapsulado utilizado en los componentes SF32, identificado por el número de pines y las dimensiones del cuerpo (p. ej., QFN68).
* **BGA** — **Ball Grid Array package (encapsulado de matriz de bolas).** Un encapsulado con bolas de soldadura dispuestas debajo del dispositivo, que permite una huella compacta y un mayor número de pines, pero requiere enrutamiento de escape de PCB y ensamblaje compatibles con BGA.
* **BOM** — **Bill of Materials (lista de materiales).** Lista formal y detallada de componentes, elementos pasivos y piezas mecánicas necesarios para fabricar una placa de circuito impreso ensamblada (PCBA). Reducir la complejidad de la BOM es una razón importante para preferir los componentes y módulos recomendados por SiFli.
* **EDA** — **Electronic Design Automation (automatización del diseño electrónico).** Categoría de software de captura de esquemáticos, simulación SPICE y diseño de PCB. [Consulte la página de bibliotecas de herramientas EDA](../hardware/cad-components/eda-tool-libraries.md) para huellas y símbolos específicos de SF32.
* **AVL** — **Approved Vendor List (lista de proveedores aprobados).** La lista de componentes de segunda fuente calificados por SiFli (cristales, reguladores, memoria flash, etc.) verificados contra las tolerancias eléctricas de los diseños de hardware SF32. [Consulte la página de la lista de proveedores aprobados](../hardware/cad-components/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board (placa de evaluación).** Placa de referencia o desarrollo SF32 proporcionada por SiFli para iniciar y validar el diseño antes de disponer del hardware personalizado.
* **FAE** — **Field Application Engineer (ingeniero de aplicaciones de campo).** El contacto de soporte técnico de SiFli para preguntas de diseño de hardware que van más allá de lo que cubre la documentación pública.

## Software y herramientas { #software-and-tools }

* **SiFli-SDK** — Kit principal de desarrollo de firmware de SiFli para los componentes SF32; es el SDK de referencia del proveedor sobre el que se basa la mayoría del firmware de producción.
* **SiFli CodeKit** — Extensión de VS Code para desarrollar con SiFli-SDK. Guía la creación y configuración de proyectos, la compilación, la grabación y la supervisión (monitor), sin tener que utilizar directamente la cadena de herramientas de línea de comandos.
* **RTOS** — **Real-Time Operating System (sistema operativo de tiempo real).** Clase de sistema operativo con planificación determinista y baja sobrecarga, utilizada normalmente por el firmware SF32 mediante la integración RTOS de SiFli-SDK o Zephyr.
* **sftool** — Utilidad de línea de comandos de SiFli para grabar y recuperar placas SF32, incluidas las que han quedado bloqueadas y ya no arrancan.
