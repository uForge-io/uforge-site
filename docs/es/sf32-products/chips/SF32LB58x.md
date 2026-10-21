---
icon: lucide/microchip
description: "SF32LB58x: familia de MCU AIoT de gama alta de la serie SF32LB5x para productos conectados con grandes necesidades de gráficos, pantalla, memoria y periféricos."
tags:
    - Hardware
    - Chip
---

# SF32LB58x { #sf32lb58x }

## Visión general { #overview }

La serie SF32LB58x se sitúa en la gama más alta de la familia SF32LB5x. Está pensada para productos AIoT alimentados por batería que requieren gráficos avanzados, mucha memoria, Bluetooth de modo dual, una amplia variedad de interfaces de audio y pantalla y un elevado número de GPIO, sin necesidad de migrar a una plataforma más grande con procesador de aplicaciones.

SF32LB58x integra tres núcleos Arm Cortex-M33 STAR-MC1[^1] en una arquitectura heterogénea. HCPU y ACPU son los núcleos de alto rendimiento y funcionan hasta 240 MHz; LCPU alcanza 96 MHz y está orientado a tareas sensibles al consumo. HCPU gestiona el sistema, la interfaz de usuario y el procesamiento general de aplicaciones; ACPU puede encargarse de tareas de DSP de audio; LCPU es adecuado para Bluetooth LE, adquisición de datos de sensores y otras tareas de bajo consumo. Una asignación adecuada puede permitir apagar HCPU en ciertos escenarios, aunque el ahorro real depende de la carga de trabajo y de la implementación del firmware.

SiFli documenta 3 744 KB de SRAM en el chip y distintas combinaciones de Flash NOR, OPI-PSRAM y HPI-PSRAM integradas en el encapsulado, según el SKU. La familia también ofrece interfaces de pantalla como MIPI DSI, aceleración de gráficos vectoriales, USB 2.0 High-Speed y encapsulado BGA con un elevado número de E/S. Conviene evaluar SF32LB58x en diseños que necesitan una interfaz gráfica de alta resolución, abundantes recursos gráficos, Wi-Fi externo por SDIO o recursos de cómputo y memoria para tareas de IA en el borde o de fusión de sensores.

[^1]: STAR-MC1 es una IP configurable de CPU embebida Armv8-M Mainline de Arm China. En los dispositivos SF32 compatibles, SiFli lo documenta como un procesador de aplicación Arm Cortex-M33 STAR-MC1. Su modelo de software de clase Cortex-M33 ayuda a que el firmware, middleware, adaptaciones de RTOS y herramientas Cortex-M33 existentes se puedan reutilizar, sujeto al trabajo normal de integración específico del dispositivo. Sus configuraciones CU, SP y SE varían principalmente en capacidad de caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para el componente SF32 exacto. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

## Aplicaciones { #applications }

**SF32LB58x se recomienda para** productos conectados de gama alta que necesitan búferes de imagen de mayor tamaño, pantallas más completas, más memoria y una mayor densidad de E/S de alta velocidad, por ejemplo:

- Relojes inteligentes y deportivos de gama alta
- Interfaces HMI portátiles de alta resolución
- Ciclocomputadores y paneles inteligentes
- Terminales médicos e industriales portátiles
- Accesorios con Bluetooth y Wi-Fi externo
- Sistemas de IA en el borde y fusión de sensores
- Controladores conectados cuya interfaz principal es la pantalla

Elija SF32LB58x si el diseño requiere una o más de estas capacidades:

- Resolución de pantalla de 1024 × 600 o superior
- Soporte de pantalla MIPI DSI en modo comando o modo vídeo
- Gráficos vectoriales, animación más rica o recursos de UI más grandes
- Wi-Fi externo a través de SDIO
- Memoria amplia para búferes de imagen, audio, gráficos o modelos de IA
- Muchos GPIO o múltiples interfaces externas de alta velocidad

## Recursos de desarrollo { #development-resources }

[Ficha de producto]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Hoja de datos]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Guía original de diseño (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Nota de aplicación de hardware (fuente en GitHub)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Guía de diseño de hardware (μForge.io)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha de producto]__
- :fontawesome-solid-file-pdf: __[Hoja de datos]__
- :fontawesome-solid-file-pdf: __[Manual de usuario]__
- :fontawesome-solid-file-lines: __[Guía original de diseño (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Nota de aplicación de hardware (fuente en GitHub)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (μForge.io)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Procesamiento y memoria { #compute-and-memory }

- 3 núcleos Arm Cortex-M33 STAR-MC1: HCPU y ACPU hasta 240 MHz, y LCPU hasta 96 MHz
- 3 744 KB de SRAM en el chip
- Flash NOR integrada en el encapsulado: de 1 MB a 8 MB en total, según el SKU
- Opciones de OPI-PSRAM o HPI-PSRAM integradas en el encapsulado; HPI-PSRAM de hasta 2 × 32 MB, según el SKU
- La Flash NOR externa o SPI NAND se conecta mediante MPI3/MPI4; SD NAND, eMMC, tarjetas SD o Wi-Fi externo se conectan mediante SDIO. Las combinaciones disponibles dependen de la selección de interfaces y de la asignación de pines.

### Gráficos, pantalla e IA { #graphics-display-and-ai }

- Acelerador gráfico 2D/2.5D ePicasso 2.0
- Motor de gráficos vectoriales Vivante GCNanoUltraV
- Acelerador de descompresión sin pérdida de gráficos eZip 2.0
- Codificación y decodificación JPEG/MJPEG por hardware, con recorte y escalado de imágenes
- Acelerador matricial de redes neuronales para cargas de trabajo TinyML
- Resoluciones de pantalla de hasta 1280 × 800
- Soporte de pantalla MIPI DSI en modo comando y modo vídeo
- Interfaces de pantalla SPI, DSPI, QSPI (incluida la conexión SPI para pantallas de tinta electrónica), MCU8080, JDI, RGB/DPI (RGB888 o RGB565) y MIPI DSI
- Admite dos pantallas con contenidos distintos mediante MIPI DSI junto con SPI, DSPI o QSPI
- Adecuado para cargas de trabajo locales de IA de borde, aprendizaje automático y fusión de sensores

### Audio y conectividad inalámbrica { #audio-and-wireless-connectivity }

- Bluetooth de modo dual 5.3
- Soporte para Bluetooth Classic y Bluetooth LE
- Conectividad Wi-Fi externa a través de SDIO
- 2 ADC de audio integrados
- 2 DAC de audio integrados
- 2 interfaces PDM, cada una compatible con hasta dos micrófonos digitales. El número de interfaces no equivale al número de micrófonos; las conexiones utilizables también dependen del multiplexado de pines y del trazado de la placa.
- 3 interfaces I2S: I2S1 solo admite entrada; I2S2 e I2S3 admiten entrada y salida. Las tres operan únicamente en modo maestro.
- USB 2.0 High-Speed en modos host y dispositivo

### Integración del sistema { #system-integration }

- PMU integrada con 2 salidas BUCK y 3 salidas LDO
- Compatibilidad opcional con el PMIC SF30147C para diseñar el árbol de alimentación de dispositivos vestibles
- El encapsulado BGA256 es adecuado para diseños de alta densidad basados en MCU que integran pantalla, almacenamiento, audio y conectividad
- La SRAM en el chip, las opciones de PSRAM integrada en el encapsulado y las interfaces de pantalla permiten atender diseños con grandes necesidades de gráficos y memoria

### Periféricos y E/S { #peripherals-and-ios }

**Nota sobre el recuento de GPIO:** La actual [guía de modelos de chips de SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) indica 94 GPIO HCPU y 66 GPIO LCPU, 160 en total, para los modelos SF32LB58x que incluye. Una hoja de datos anterior desglosa el total en 94 GPIO HPSYS y 60 GPIO LPSYS, más 6 salidas AON GPO (154 GPIO + 6 AON GPO). Como las fuentes clasifican esas seis salidas siempre activas de forma distinta, la diferencia de categorías no demuestra por sí sola que cambie el total de pines del encapsulado ni significa que los 160 sean GPIO de asignación libre. El [índice de productos de SiFli](https://wiki.sifli.com/silicon/index.html) enlaza la hoja de datos vigente V1.8.6. Antes de diseñar la placa, compruebe allí el recuento y la tabla de funciones de pines del modelo exacto. La [FAQ de GPIO de SiFli](https://wiki.sifli.com/en/faq/mcu/gpio.html) trata PBR como un banco independiente de E/S de bajo consumo; no lo sume al total HCPU/LCPU salvo que la fuente lo incluya expresamente.

- 160 GPIO (94 HCPU + 66 LCPU, según la guía actual de modelos de chips)
- 2 interfaces CAN
- 2 interfaces SDIO
- Interfaz de depuración SWD
- 6 interfaces UART que pueden seleccionarse para la salida de depuración
- RTC, watchdog, activación por GPIO, activación por PBR, PWM, I2C, SPI e interfaces analógicas de propósito general
- Encapsulado BGA256 para diseños de alta densidad

### Alimentación y encapsulado { #power-supply-and-package }

- Rango de alimentación: de 1,71 V a 3,63 V
- Encapsulado BGA256 de 6,5 × 8,5 × 0,94 mm y paso de 0,4 mm
- Se requiere una PCB HDI; para diseños de producción se recomienda la configuración de capas 6HDI-2

## Variantes de familia { #family-variants }

La guía actual de modelos de chips de SiFli enumera seis referencias SF32LB58x, todas en encapsulado BGA256, con las combinaciones de memoria integrada que se muestran a continuación. Confirme la referencia exacta en la hoja de datos vigente y en la lista de proveedores aprobados (AVL), ya que las configuraciones y la disponibilidad pueden cambiar.

<div align="center"><em>Referencias SF32LB58x y memoria integrada en el encapsulado</em></div>

<div align="center" markdown>

| Referencia | Encapsulado | Memoria integrada en el encapsulado |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 MB de Flash NOR de arranque; sin memoria integrada en MPI1 ni MPI2 |
| SF32LB581VCN36 | BGA256 | 1 MB de Flash NOR de arranque + 8 MB de OPI-PSRAM en MPI1 |
| SF32LB583VCC36 | BGA256 | 1 MB de Flash NOR de arranque + 2 × 8 MB de OPI-PSRAM en MPI1 y MPI2 |
| SF32LB585V5E56 | BGA256 | 4 MB de Flash NOR de arranque + 4 MB de Flash NOR en MPI1 + 32 MB de HPI-PSRAM en MPI2 |
| SF32LB586VDD36 | BGA256 | 1 MB de Flash NOR de arranque + 2 × 16 MB de HPI-PSRAM en MPI1 y MPI2 |
| SF32LB587VEE56 | BGA256 | 4 MB de Flash NOR de arranque + 2 × 32 MB de HPI-PSRAM en MPI1 y MPI2 |

</div>

Antes de elegir una variante, compruebe:

- Capacidad necesaria para los búferes de imagen, los recursos gráficos, el audio y los modelos
- Interfaz de pantalla y resolución objetivo
- Requisitos de interfaz de almacenamiento externo y Wi-Fi
- Capacidad de fabricación de PCB para el diseño HDI BGA256 con paso de 0,4 mm

## Ruta de integración { #integration-path }

Siga estos pasos para convertir una selección preliminar de SF32LB58x en un diseño validado:

1. **Valide la ruta de firmware.** Empiece por la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) y use después el [flujo de trabajo del SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) y los [ejemplos](../../develop/examples/index.md) para comprobar las configuraciones de pantalla, gráficos, audio, almacenamiento y Bluetooth.
2. **Elija el medio de integración.** Considere [SF32LB58-MOD](../modules/SF32LB58-MOD.md) para reducir los riesgos de RF, BGA y diseño de memoria; para las primeras pruebas a nivel de placa, use [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md).
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, consulte la [guía de diseño de hardware](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) y sus listas de comprobación de [esquemático](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) y [diseño de PCB](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md). Valide cuanto antes los supuestos de HDI para BGA256 y de enrutamiento de memoria.
4. **Verifique la fuente de referencia.** Confirme el número de pieza y el encapsulado disponibles para pedido en la [hoja de datos][Hoja de datos], el [manual de usuario][Manual de usuario], la [guía de diseño original][Guía original de diseño (wiki.sifli.com)] y la [fuente de la nota de aplicación de hardware][Nota de aplicación de hardware (fuente en GitHub)] de SiFli.

<!-- uf-faq:start -->
## Preguntas frecuentes { #frequently-asked-questions }

**¿Cuáles son las especificaciones principales del SF32LB58x?**
El SF32LB58x combina una CPU de aplicación (2× Cortex-M33 @240 MHz) con un núcleo de bajo consumo (Cortex-M33 @48/96 MHz, un núcleo programable por el usuario), 3.7 MB de SRAM interna y Bluetooth dual (BT clásico + BLE). Gráficos: ePicasso 2.0 + Vivante GCNanoUltraV (vector). Encapsulado: BGA256 (8.5 × 6.5 mm). USB 2.0 HS. Valores de la familia; verifique la hoja de datos del número de pieza exacto.

**¿Qué interfaces de pantalla admite el SF32LB58x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI. La disponibilidad varía según el número de pieza y el encapsulado.

**¿Cuánta memoria en el encapsulado ofrece el SF32LB58x?**
Hasta 32 MB + 32 MB de PSRAM y hasta 8 MB de Flash NOR en el encapsulado, según el número de pieza.

**¿Qué tensión de alimentación necesita el SF32LB58x?**
1.71–3.63 V, según la variante. Confirme el rango exacto en la hoja de datos.

**¿Por dónde empezar un diseño de hardware con el SF32LB58x?**
Empiece con la [guía de diseño de hardware del SF32LB58x](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) para esquemático, alimentación, reloj/RF y diseño de PCB, y use después las listas de verificación de esquemático y layout antes de liberar la placa.
<!-- uf-faq:end -->

## Productos relacionados { #related-products }

### Módulo { #module }

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) integra el chip SF32LB586VDD36, su red de adaptación de RF, la HPI-PSRAM integrada en el encapsulado y opciones de almacenamiento en un módulo listo para incorporar al diseño. Es adecuado para proyectos que necesitan las prestaciones de la serie 58 y quieren reducir desde el inicio los riesgos de RF, BGA y diseño de memoria.

### Placas de desarrollo { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) es el punto de partida para las decisiones de diseño relacionadas con el árbol de alimentación, la pantalla, el almacenamiento, el audio, RF, USB y SDIO.

### Productos de referencia { #reference-products }

Entre los productos finales que pueden utilizar SF32LB58x se encuentran los relojes inteligentes de gama alta, las interfaces HMI portátiles de alta resolución, los paneles inteligentes y los terminales conectados portátiles, así como dispositivos que integran Bluetooth, pantalla, audio, almacenamiento y procesamiento local de IA.
