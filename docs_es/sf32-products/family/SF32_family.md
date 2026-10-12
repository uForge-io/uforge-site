---
icon: lucide/cpu
description: "Panorama de la familia SF32LB5xx y sus núcleos Cortex-M33 heterogéneos, Bluetooth, gráficos ePicasso e IA de borde, con una tabla comparativa y una guía rápida de selección de chips."
tags:
  - Hardware
  - Chip
---

# Familia SF32 { #sf32-family }

## Introducción { #introduction }

La familia **SF32**, en particular la serie **SF32LB5xx**, reúne microcontroladores de 32 bits altamente integrados y de consumo ultrabajo, desarrollados por SiFli Technologies para productos AIoT y dispositivos portátiles alimentados por batería.

Los dispositivos **SF32** están diseñados para cubrir el vacío entre los microcontroladores tradicionales y los procesadores de aplicaciones. En una arquitectura compacta System-in-Package (SiP), combinan procesamiento de sensores de bajo consumo, conectividad inalámbrica, aceleración gráfica, procesamiento multimedia y una amplia memoria integrada. La familia está pensada para productos como relojes inteligentes, pulseras de actividad, pantallas inteligentes, dispositivos médicos portátiles y accesorios conectados con capacidad de procesamiento en el borde.

La serie **LB** (Low-Power Bluetooth) es la primera línea de productos SF32. Está previsto incorporar otras series orientadas a aplicaciones específicas.

## Flujos de diseño de hardware { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Planificar un producto**

    Siga un único recorrido desde la definición de requisitos y la selección del dispositivo hasta la validación de la placa y la preparación para producción.

    [Planificar un producto :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **Selector de productos SF32**

    Compare las familias SF32, elija un chip o módulo e identifique la placa de desarrollo adecuada para la validación inicial.

    [Construir una preselección :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Diseño para producción**

    Pase del componente elegido al esquemático, el diseño de la placa, la BOM, los archivos CAD, la lista de comprobación y las evidencias de puesta en marcha.

    [Preparar el trabajo de producción :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## Características clave { #key-features }

1. **Arquitectura multinúcleo heterogénea**

    Los microcontroladores SF32LB utilizan una arquitectura multinúcleo heterogénea basada en Arm Cortex-M33 STAR-MC1. Esta equilibra el procesamiento de aplicaciones de alto rendimiento con el funcionamiento en segundo plano de consumo ultrabajo. Según el dispositivo, puede incluir uno o más núcleos de aplicación y procesadores de bajo consumo dedicados a Bluetooth, al procesamiento de sensores y a las funciones del sistema siempre activas.

    !!! info "Procesador STAR-MC1"
        STAR-MC1 es un bloque IP de procesador configurable de Arm China, basado en Armv8-M Mainline y utilizado como núcleo de aplicación de clase Cortex-M33 en los dispositivos SF32 compatibles. El firmware, el middleware, las adaptaciones de RTOS y las herramientas para Cortex-M33 siguen siendo aplicables, aunque cada dispositivo requiere la integración específica habitual. Las configuraciones CU, SP y SE se diferencian principalmente en caché, TCM, XIPU y compatibilidad con TrustZone. Las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son opcionales. Según el contexto, la documentación de SiFli lo denomina ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33***.

        Para obtener orientación específica sobre la configuración del dispositivo, TCM, cachés, CDE, coprocesadores y mediciones representativas del rendimiento, consulte el [análisis detallado de la arquitectura STAR-MC1](../../learn/architecture/star-mc1.md).


2. **Conectividad inalámbrica de consumo ultrabajo**

    La serie SF32LB integra conectividad Bluetooth Low Energy (BLE) o Bluetooth de modo dual (BT/BLE) directamente en el chip.

    Los modos Bluetooth y el rendimiento de RF dependen del dispositivo. Para el número de pieza exacto, consulte la hoja de datos y el diseño de referencia validado para conocer los modos disponibles, los ajustes de potencia de transmisión, la sensibilidad de recepción y el consumo de corriente. El posicionamiento a nivel de familia no sustituye esas cifras.

3. **Motor gráfico y de pantalla con aceleración por hardware**

    Todos los microcontroladores SF32LB integran ePicasso, el motor gráfico 2,5D desarrollado por SiFli, además de un controlador de pantalla independiente.

    La aceleración por hardware reduce significativamente la carga de la CPU para tareas gráficas comunes como:

    * Mezcla alfa
    * Escalado de imagen
    * Rotación y transformación
    * Composición de capas
    * Renderizado de interfaz de usuario

    En la familia SF32LB se utilizan las siguientes interfaces y tecnologías de pantalla. La compatibilidad varía según el dispositivo; consulte el SKU exacto y no dé por hecho que todos admiten todos los elementos de la lista.

    * SPI / DSPI / QSPI
    * Interfaz MCU 8080
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (para pantallas Memory-in-Pixel)

    En los modelos que admiten las interfaces de pantalla correspondientes, la aceleración por hardware puede combinarse con frameworks gráficos como LVGL para crear interfaces fluidas y con buena respuesta en pantallas TFT, AMOLED, de papel electrónico (EPD) y Memory-in-Pixel (MiP).

4. **IA de borde y aceleración de redes neuronales**

    Algunos dispositivos SF32 incorporan aceleradores de hardware específicos para aprendizaje automático, procesamiento multimedia y fusión de sensores.

    Las capacidades pueden incluir:

    * Aceleración de redes neuronales
    * Procesamiento de audio
    * Reconocimiento de voz
    * Interfaces de cámara (DVP y SPI)
    * Fusión de sensores y algoritmos biométricos

    Estas funciones permiten ejecutar inferencias de IA con baja latencia en el propio dispositivo y reducir tanto el consumo energético como la dependencia de la nube.

5. **Memoria System-in-Package (SiP) de alta densidad**

    Para aplicaciones con uso intensivo de gráficos o IA, los dispositivos SF32 integran cachés de instrucciones y de datos optimizadas para una ejecución de alto rendimiento desde memoria externa.

    Las opciones de memoria integrada en el encapsulado pueden incluir:

    * Hasta 256 Mb de Flash NOR
    * Hasta 512 Mb de PSRAM

    Solo algunos números de pieza incluyen Flash NOR o PSRAM en el mismo encapsulado. Una configuración SiP puede reducir el número de memorias montadas por separado y el cableado asociado, pero el tipo, la capacidad y la interfaz de memoria, el consumo y los pines accesibles desde el exterior dependen del SKU exacto. Antes de cerrar la placa, consulte su hoja de datos y el mapa de pines del encapsulado.

## Comparación de microcontroladores SF32 { #sf32-microcontroller-comparison }

<div align="center"><em>Comparación de microcontroladores SF32</em></div>

La tabla resume capacidades de cada familia; no garantiza que todos los SKU incluyan todos los recursos indicados. Las interfaces y sus cantidades pueden variar según el número de pieza, el encapsulado o la configuración; compruebe la hoja de datos de la referencia elegida.

<div align="center" markdown>

| Característica | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Posicionamiento | Gama básica | Gama generalista, solo BLE | Avanzado | Mayor capacidad de procesamiento | Gama alta |
| CPU de aplicación | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz |
| CPU de bajo consumo | Cortex-M33 @ 24/48 MHz, controlador Bluetooth dedicado | Cortex-M33 @ 48 MHz, programable por el usuario | Cortex-M33 @ 48/96 MHz, programable por el usuario | Cortex-M33 @ 24 MHz, controlador Bluetooth dedicado | Cortex-M33 @ 48/96 MHz, programable por el usuario |
| SRAM interna | 576 KB | 1312 KB | 960 KB | 592 KB | 3,7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Acelerador gráfico | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + gráficos vectoriales<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Compatibilidad de pantalla | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| ADC de audio | 1x | No disponible | 1x | 2x | 2x |
| DAC de audio | 1x | No disponible | 1x | 1x | 2x |
| Interfaces de audio PDM | 1x | 1–2x* | 2x | 2x | 2x |
| Interfaces de audio I²S | 1x | 1–2x* | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | No disponible | No disponible | 1x | 2x | 2x |
| PSRAM integrada en el encapsulado | Hasta 16 MB | Hasta 16 MB + 2 MB | Hasta 16 MB | Hasta 32 MB | Hasta 32 MB + 32 MB |
| Flash NOR integrada en el encapsulado | Hasta 4 MB | Hasta 8 MB | Hasta 1 MB | Hasta 32 MB | Hasta 8 MB |
| N.º de GPIO | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58; hasta 6 E/S adicionales en BGA112* | 154 |
| Opciones de encapsulado | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Dimensiones del encapsulado (largo × ancho) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6,5 × 6,1 mm | QFN68: 7 × 7 mm<br>QFN80: 8 × 8 mm<br>BGA: 5,4 × 4,4 mm | 8,5 × 6,5 mm |
| Alimentación | 3,2–4,7 V (520/3/5/7)<br>2,97–3,63 V (52B/E/G/J)<br>1,8 V (52D) | 1,71–3,63 V | 1,71–3,63 V | 3,2–4,7 V<br>2,97–3,63 V | 1,71–3,63 V |

</div>

**Nota sobre las variantes de SF32LB55x:** el número de interfaces de audio depende de la referencia: las variantes SF32LB551/553/555 tienen una interfaz PDM y una I²S; SF32LB557VD3A6 tiene dos de cada una. El resumen de encapsulados de la [hoja de datos SF32LB55x más reciente (V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) indica 119 GPIO para BGA169 (71 HCPU + 48 LCPU), pero la tabla detallada de productos de esa misma hoja de datos asigna al SF32LB557 71 HCPU + 42 LCPU = 113. La [guía de modelos de chips de SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) también indica 71 + 42 = 113 para SF32LB557VD3A6. SiFli no explica la discrepancia dentro de la hoja de datos; esta tabla utiliza el valor específico de 113 GPIO. Antes de asignar pines, confirme la referencia exacta en su hoja de datos y tabla de pines. Cada interfaz PDM puede conectar hasta dos micrófonos digitales; el número de interfaces no equivale al número de micrófonos.

**Nota sobre la NOR integrada en el encapsulado de SF32LB55x:** El máximo de 8 MB de esta tabla incluye la configuración SS6600A8, que SiFli documenta por separado: dos memorias QSPI-NOR de 4 MB configuradas como una sola OSPI-NOR de 8 MB. Las referencias con prefijo SF32 incluidas para SF32LB55x tienen hasta 4 MB de Flash NOR integrada en el encapsulado; compruebe el modelo exacto.

**Nota sobre BGA112 para SF32LB57x:** Esta nota solo se aplica a BGA112. El chip SF32LB57x tiene MPI1, MPI2 y MPI3 internos; la posición de MPI* en la referencia se explica en la [convención de nomenclatura SF32](SF32_namingrule.md). En cualquiera de estas configuraciones de memoria integrada, los pines MPI2 y MPI3 no están accesibles desde el exterior del encapsulado, por lo que quedan 58 GPIO fijos: (1) una PSRAM integrada en cada una de MPI1 y MPI2; (2) una PSRAM de 256 Mb integrada en MPI2; o (3) una Flash NOR integrada en MPI3. `SF32LB57GVD776` corresponde al caso (3): el segundo `7` del código final `776` indica que un dispositivo interno usa MPI3, por lo que solo dispone de 58 GPIO. En las demás configuraciones BGA112, las seis E/S adicionales pueden usarse para MPI3 o como salidas estáticas GP configuradas mediante pull-up o pull-down; no son GPIO de asignación libre. Por ejemplo, `58 + 6` en `SF32LB57ZVN7N6` significa 58 GPIO disponibles más seis pines que pueden usarse para MPI3 o como salidas estáticas. QFN68 y QFN80 no están sujetos a esta limitación de BGA112: ofrecen únicamente el número de GPIO indicado y no tienen opciones adicionales para MPI3 ni para salidas estáticas. Consulte la página del SF32LB57x y su hoja de datos para la referencia exacta.

**Aclaración sobre el número de GPIO del SF32LB58x:** La [hoja de datos DS5801 V1.8.3](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf) y la comparación de la familia de SiFli especifican 154 GPIO en total (HPSYS: 94; LPSYS: 60). La [guía de modelos de chip](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), por separado, indica HCPU: 94 y LCPU: 66, lo que suma 160 y contradice el total de la hoja de datos. Esta comparación sigue la hoja de datos; antes de asignar pines, verifique los disponibles en la tabla de pines del encapsulado del SKU exacto.

## Elegir el SF32 adecuado { #choosing-the-right-sf32 }

La familia SF32LB5xx abarca dispositivos conectados alimentados por batería, desde productos Bluetooth optimizados en coste hasta sistemas con gráficos avanzados y funciones de IA. Sus miembros comparten una base de SDK, pero pueden diferir en la configuración de los procesadores, los periféricos, el mapa de memoria, el encapsulado y la asignación de pines. La migración puede requerir adaptar el código de arranque, los controladores, el script del enlazador o la configuración de particiones, la multiplexación de pines y las opciones del SDK; valide el resultado en el dispositivo de destino.

Al seleccionar un dispositivo, tenga en cuenta estos requisitos:

* Conectividad Bluetooth (BLE o BT/BLE de modo dual)
* Interfaz y resolución de pantalla
* Capacidades de audio y multimedia
* Capacidad de memoria
* Número de GPIO necesarios
* Rendimiento gráfico
* Necesidades de IA y procesamiento de sensores
* Objetivos de consumo energético

<div align="center"><em>Guía rápida de selección</em></div>

<div align="center" markdown>

| Elija ... | Si su aplicación requiere ... | Aplicaciones típicas |
| : ---      | : ---  | : --- |
| SF32LB52x  | • Bluetooth de modo dual (BT/BLE)<br> • ADC y DAC de audio integrados<br> • Carga de batería Li-ion integrada<br> • Hasta 45 GPIO<br> • Resoluciones de pantalla de hasta 512 × 512<br> • Solución compacta y económica<br> | • Relojes inteligentes y pulseras de actividad de gama básica<br> • Módulos Bluetooth y adaptadores inalámbricos<br> • Accesorios de audio Bluetooth<br> • Sensores inteligentes y dispositivos vestibles<br> • Etiquetas electrónicas para estanterías y credenciales inteligentes<br> • Impresoras de etiquetas portátiles<br> • Pantallas para bicicletas y scooters eléctricos<br> • Dispositivos HMI básicos basados en LVGL |
| SF32LB55x  | • Bluetooth Low Energy (BLE)<br> • Pantallas MIPI DSI en modo comando<br> • Gran capacidad de SRAM para algoritmos de procesamiento de sensores<br> • Más de 45 GPIO<br> • Capacidad ampliada de procesamiento de bajo consumo | • Pulseras de actividad y rastreadores deportivos<br> • Computadoras para deporte y ciclismo<br> • Dispositivos portátiles con numerosos sensores<br> • Dispositivos de supervisión de la salud<br> • Periféricos BLE alimentados por batería |
| SF32LB56x  | • Bluetooth de modo dual (BT/BLE)<br> • Interfaces de pantalla RGB/DPI<br> • ADC y DAC de audio integrados<br> • Resoluciones de pantalla de hasta 1024 × 600<br> • Conectividad Wi-Fi externa mediante SDIO<br> • Mayor capacidad de GPIO | • Relojes inteligentes con interfaces de usuario avanzadas<br> • Sistemas HMI conectados<br> • Dispositivos médicos y sanitarios<br> • Equipos portátiles de uso industrial<br> • Instrumentos portátiles<br> • Pantallas avanzadas para bicicletas y scooters eléctricos |
| SF32LB57x | • Bluetooth de modo dual (BT/BLE), BLE Audio y LE Long Range<br> • Gráficos ePicasso 3.0/eZip 3.0 con interfaces de pantalla RGB<br> • Entrada de cámara DCMI y ADC/DAC de audio de alta fidelidad integrados<br> • Resoluciones de pantalla de hasta 1024 × 600<br> • Delegación de tareas a PTM para obtener E/S determinista o temporización personalizada de periféricos<br> • Hasta 58 GPIO de uso general; BGA112 añade hasta 6 E/S para MPI3 o salidas estáticas GP con pull-up/pull-down, cuando la configuración SiP lo permite<br> • Interfaces de almacenamiento SD/SDIO/eMMC | • Relojes inteligentes avanzados y compactos<br> • Sistemas HMI con pantallas avanzadas y dispositivos de papel electrónico<br> • Productos Bluetooth con cámara<br> • Dispositivos portátiles de audio y grabación<br> • Paneles de control para el hogar inteligente |
| SF32LB58x  | • Bluetooth de modo dual (BT/BLE)<br> • Renderizado gráfico avanzado, incluidos gráficos vectoriales<br> • Pantallas MIPI DSI en modo comando o vídeo<br> • Resoluciones de pantalla de hasta 1280 × 800<br> • Configuraciones de memoria de gran capacidad<br> • Alta densidad y cantidad de GPIO<br> • Conectividad Wi-Fi externa mediante SDIO<br> • Cargas de trabajo de IA en el borde y aprendizaje automático | • Relojes inteligentes prémium<br> • Dispositivos portátiles para deporte y actividades al aire libre<br> • Computadoras avanzadas para ciclismo<br> • Pantallas inteligentes y tableros conectados<br> • Dispositivos portátiles con IA<br> • Sistemas de IA de borde y fusión de sensores |

</div>

## Compatibilidad de software entre los miembros de la familia { #software-compatibility-across-the-family }

La plataforma SF32 comparte una base de software y SDK. Sin embargo, la configuración de los procesadores, los periféricos, el mapa de memoria, el encapsulado y la asignación de pines pueden variar. La migración puede exigir adaptar el arranque, los controladores, el enlazado o las particiones, la multiplexación de pines y la configuración del SDK, además de validar el resultado en el hardware de destino.

Evalúe la reutilización del software y el esfuerzo de migración junto con los requisitos de rendimiento, memoria, pantalla y conectividad. No dé por hecho que los dispositivos de una misma familia son compatibles pin a pin ni que el firmware funcionará sin cambios.

## Enlaces de referencia { #reference-links }

- [Sitio web oficial de SiFli](https://www.sifli.com/)
- [Wiki de SiFli](https://wiki.sifli.com/)
- [Documentación de software de SiFli](https://docs.sifli.com/)
- [OpenSiFli en GitHub](https://github.com/OpenSiFli/)
- [Tienda oficial de SiFli en Taobao](https://sifli.taobao.com/)
