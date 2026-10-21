---
icon: lucide/microchip
description: "SF32LB57x: familia de MCU AIoT multinúcleo de consumo ultrabajo con Bluetooth dual, núcleos de 240 MHz, gráficos ePicasso 3.0, eZip 3.0 y encapsulados QFN/BGA compactos."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Visión general { #overview }

La serie SF32LB57x es una familia mejorada de microcontroladores AIoT altamente integrada y de consumo ultrabajo, pensada para dispositivos vestibles, dispositivos inteligentes portátiles, productos de hogar conectado y pantallas compactas. Está dirigida a diseños cuyas necesidades de gráficos, audio Bluetooth, entrada de cámara, almacenamiento externo y funcionamiento siempre activo superan lo que una MCU Bluetooth básica puede gestionar con holgura, pero que no requieren asumir los compromisos de consumo, coste e integración propios de una plataforma con procesador de aplicaciones.

SF32LB57x emplea una arquitectura de tres núcleos Arm Cortex-M33 STAR-MC1[^1]: dos núcleos de alto rendimiento de hasta 240 MHz y un núcleo de bajo consumo de hasta 24 MHz. La [guía de uso de ACPU de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifica los tres núcleos como HCPU, ACPU y LCPU: ACPU procesa audio y gráficos, mientras que LCPU se ocupa de tareas de bajo consumo, como BLE y el procesamiento de datos de sensores. Los dos núcleos de alto rendimiento suman 1968 CoreMark / 740 DMIPS. Esta distribución ofrece margen suficiente para la interfaz de usuario, las aplicaciones y las tareas multimedia, y permite que Bluetooth, el concentrador de sensores y otras funciones siempre activas sigan una ruta de menor consumo.

La plataforma reúne 592 KB de SRAM de retención en chip, aceleración gráfica 2D/2.5D ePicasso 3.0, motor de descompresión por hardware eZip 3.0, controlador LCD dedicado, controlador de cámara DCMI, Bluetooth de modo dual, recursos de audio ADC/DAC de alta fidelidad, interfaces para memoria SiP y externa, aceleradores de seguridad y asignación flexible de GPIO mediante FreeIO. Un elemento diferenciador clave de la serie 57x es PTM (Parallel Task Machine), un procesador paralelo compacto que descarga de las CPU principales las secuencias periféricas sensibles a ciclos, los protocolos E/S personalizados, la adquisición de sensores, la temporización tipo PWM y la coordinación por eventos.

Al planificar el hardware, defina pronto la combinación de alimentación y encapsulado. SF32LB57x se ofrece en QFN68, QFN80 y BGA112. Según la familia de la pieza, está preparado para alimentación por batería o para una fuente externa regulada de 3,3 V. La elección afecta a la arquitectura de alimentación, el número de GPIO disponibles, el fanout del encapsulado, el enrutamiento de pantalla y almacenamiento, el acceso de depuración y la estrategia de puesta en marcha. Determine la referencia exacta antes de reutilizar esquemáticos o iniciar el diseño de la PCB.

[^1]: STAR-MC1 es una IP configurable de CPU embebida Armv8-M Mainline de Arm China. En los dispositivos SF32 compatibles, SiFli lo documenta como un procesador de aplicación Arm Cortex-M33 STAR-MC1. Su modelo de software de clase Cortex-M33 ayuda a que el firmware, middleware, adaptaciones de RTOS y herramientas Cortex-M33 existentes se puedan reutilizar, sujeto al trabajo normal de integración específico del dispositivo. Sus configuraciones CU, SP y SE varían principalmente en capacidad de caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para el componente SF32 exacto. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

[^2]: **Solo aplicable a BGA112.** SF32LB57x integra MPI1, MPI2 y MPI3. La [convención de nomenclatura de SF32](../family/SF32_namingrule.md) indica la posición de la memoria integrada asociada a cada interfaz. En cualquiera de estas dos configuraciones de memoria SiP, los pines MPI2 y MPI3 no son accesibles desde el exterior del encapsulado, por lo que solo quedan 58 GPIO: (1) una PSRAM integrada en MPI2, ya sea sola o junto con otra PSRAM en MPI1; o (2) una Flash NOR integrada en MPI3. `SF32LB57GVD776` corresponde al caso (2): el segundo `7` identifica el componente interno conectado a MPI3, por lo que solo dispone de 58 GPIO. En las demás configuraciones, las seis E/S BGA112 asociadas a MPI3 pueden utilizarse para MPI3 o configurarse como salidas estáticas de propósito general (GP) mediante pull-up o pull-down; no son GPIO asignables sin restricciones. Por tanto, `58 + 6` en `SF32LB57ZVN7N6` significa 58 GPIO utilizables más seis E/S para MPI3 o salidas estáticas, no 64 GPIO asignables libremente. Esta limitación no afecta a QFN68 ni QFN80: estos encapsulados ofrecen únicamente su número nominal de GPIO, sin pines adicionales para MPI3 o salidas estáticas.

[^3]: Las dimensiones y el grosor del encapsulado siguen las tablas de pedidos y los planos de encapsulado de las hojas de datos de SF32LB57x de SiFli (DS5701 y DS5702, V0.2.1): QFN68 (7 × 7 mm, planos de 0,9 mm o 1,1 mm), QFN80 (8 × 8 mm, planos de 0,9 mm o 1,1 mm) y BGA112 (5,4 × 4,4 mm, 0,98 mm). Entre las referencias listadas, solo SF32LB573UB776 usa el QFN68 de 1,1 mm; las tablas de pedidos no incluyen SF32LB57ZVN7N6, por lo que su grosor BGA112 se toma del único plano BGA112. La guía de diseño de hardware de SiFli indica además una opción BGA112 de 1,03 mm que las hojas de datos no muestran. El diagrama de nomenclatura específico de SF32LB57x asigna U a QFN68, Y a QFN80 y V a BGA112; no suponga que la correspondencia Y se aplica a otras familias SF32. Confirme con SiFli el grosor y el plano del encapsulado de la referencia exacta.

[^4]: Para la serie alimentada por batería, la hoja de datos SF32LB57x de SiFli (DS5701) especifica VBAT y VCC de 3,0 a 4,7 V, con una tensión de encendido de 3,5 V ±10 %. La guía de diseño de hardware de SiFli indica una entrada más estrecha, de 3,45 a 4,7 V (QFN68, tabla 2-1-1; QFN80, tabla 2-1-3; BGA112, tabla 2-1-5); los dos documentos difieren, por lo que debe confirmar en la hoja de datos de la referencia exacta qué pin de entrada y límites corresponden.
[^5]: La fila de tensión de E/S resume los dominios admitidos; no significa que cada pin pueda usar indistintamente ambas tensiones. VDDIOA, cuando tiene alimentación separada, alimenta las GPIO. VDDIOSB, cuando está presente, es el raíl de E/S de la memoria SiP; la guía de SiFli especifica 1,8 V para PSRAM integrada y 3,3 V para Flash NOR. Para la serie QFN68 de 3,3 V, la tabla 2-1-2 especifica únicamente 3,3 V para VDDIOA. Verifique cada pin y dominio en la guía del encapsulado y en la hoja de datos de la referencia exacta.

## Aplicaciones { #applications }

**SF32LB57x es una opción sólida para** productos conectados compactos que necesitan gráficos, audio Bluetooth, entrada de cámara, almacenamiento externo o supervisión continua de sensores en una plataforma basada en una MCU de bajo consumo, por ejemplo:

- Relojes y pulseras inteligentes
- Dispositivos HMI inteligentes
- Dispositivos inteligentes con pantalla de papel electrónico
- Electrodomésticos conectados pequeños y medianos
- Productos portátiles de grabación y audio
- Dispositivos médicos vestibles y equipos de actividad física
- Equipos industriales de visualización, detección, supervisión e instrumentación
- Dispositivos vestibles o de mano con cámara
- Terminales compactos y paneles de control con pantalla
- Controladores de consola central del automóvil, llaves inalámbricas y mandos remotos vestibles para vehículos
- Cerraduras inteligentes
- Productos de walkie-talkie e intercomunicador Bluetooth
- Marcos de fotos electrónicos
- Redes de malla Bluetooth y concentradores de sensores de bajo consumo

Es especialmente adecuada cuando el diseño requiere una o varias de estas funciones:

- Dos núcleos de alto rendimiento a 240 MHz más un núcleo de eficiencia a 24 MHz para trabajo de UI/aplicación y tareas de fondo de bajo consumo
- Aceleración gráfica ePicasso 3.0 con rotación, escalado, proyección, reflejo y mezcla alfa en tiempo real
- Descompresión eZip 3.0 para imágenes y animaciones eZip/eZip-A, JPEG y MJPEG, reduciendo la carga de decodificación en la CPU
- Interfaces LCD a través de 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI y EPD de 8/16 bits
- Entrada de cámara DCMI a través de DVP o SPI/Dual-SPI/Quad-SPI
- Bluetooth 6.3 de modo dual (BR/EDR y BLE), incluyendo BLE Audio y LE Long Range
- Recursos de ADC/DAC de audio de 24 bits de alta fidelidad para reproducción, grabación y llamadas Bluetooth
- Opciones de almacenamiento SiP OPI-PSRAM / QSPI-NOR más QSPI-NOR/NAND externo, QPI-PSRAM, SD, SDIO o eMMC
- Ejecución de tareas periféricas en PTM para obtener temporización de E/S determinista, responder rápido a eventos y automatizar sensores o interfaces con poca carga para la CPU

La cifra de Bluetooth 6.3 procede de las hojas de datos de SF32LB57x (V0.2.1); las fichas de producto v0.4 aún muestran una revisión anterior. Confirme las funciones opcionales en la documentación SiFli vigente del número de pieza exacto que se vaya a pedir.

## Recursos de desarrollo { #development-resources }

[Ficha de producto]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Hoja de datos]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Guía original de diseño (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Guía de diseño de hardware (μForge.io)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[Lista de proveedores aprobados de SiFli]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha de producto]__
- :fontawesome-solid-file-pdf: __[Hoja de datos]__
- :fontawesome-solid-file-pdf: __[Manual de usuario]__
- :fontawesome-solid-file-lines: __[Guía original de diseño (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (μForge.io)]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Cómputo y memoria { #compute-and-memory }

- Sistema de alto rendimiento con dos núcleos Arm Cortex-M33 STAR-MC1, de hasta 240 MHz
- Sistema de bajo consumo con un núcleo de eficiencia Arm Cortex-M33 STAR-MC1, de hasta 24 MHz
- Rendimiento conjunto de los dos núcleos de alto rendimiento: 1968 CoreMark / 740 DMIPS
- Cachés HCPU: instrucciones de 32 KB y 2 vías, y datos de 16 KB y 4 vías
- Recursos de caché de instrucciones y datos de ACPU para XIP y aceleración de aplicaciones
- 512 KB de SRAM de retención HPSYS y 80 KB de SRAM de retención LPSYS: 592 KB de SRAM en chip en total
- D-TCM de 128 KB sin ciclos de espera, compartido con el espacio de direcciones de la SRAM HPSYS
- Compatibilidad con FPU de precisión simple y MPU
- GPDMA con modo de lista enlazada

### Máquina de tareas paralelas PTM { #ptm-peripheral-task-machine }

- PTM de cuatro núcleos para tareas periféricas personalizadas que se benefician de la ejecución temporizada por hardware, sin intervención continua de la CPU
- Conjunto compacto de instrucciones para leer y escribir en buses y E/S, operar con datos, realizar saltos condicionales, esperar eventos y aplicar retardos fijos
- Control temporal ciclo a ciclo al ejecutar desde la TCM PTM, adecuado para secuencias de E/S deterministas
- Cada núcleo PTM admite hasta 16 canales de E/S y FIFO/DMA para interfaces de comunicación personalizadas
- Los núcleos PTM acceden a la memoria del bus AHB y a los registros periféricos, pueden interrumpir la CPU y coordinarse mediante eventos internos
- Adecuada para protocolos de interfaz y PWM personalizados, operaciones agrupadas de memoria y datos, planificación de varios módulos y adquisición automática de sensores

### Conectividad inalámbrica { #wireless-connectivity }

- Radio Bluetooth de modo dual
- Soporte de BLE Audio y LE Long Range
- Sensibilidad de recepción: −100 dBm en BLE a 1 Mbps, −107,5 dBm en BLE a 125 kbps, −96 dBm en BR y −95 dBm en EDR2
- Potencia de transmisión máxima: 13 dBm para EDR2/EDR3 y 17 dBm para BR/BLE
- Corriente pico en recepción BR: puede bajar hasta 2,0 mA a 3,8 V

### Gráficos, pantalla y cámara { #graphics-display-and-camera }

- Motor gráfico 2D/2.5D ePicasso 3.0
- Aceleración por hardware de rotación, escalado, proyección, reflejo, mezcla alfa y composición multicapa
- Resolución gráfica máxima: 2048 × 2048
- Formatos RGB incluyendo RGB888, RGB565, aRGB8888 y aRGB8565
- Formatos adicionales incluyendo L8/L4, G8/G4/G2, A8/A4/A2 y YUV
- Motor eZip 3.0 para descomprimir sin pérdidas imágenes y animaciones eZip/eZip-A
- Descompresión de imágenes JPEG y animaciones MJPEG
- eZip y ePicasso pueden funcionar conjuntamente sin un framebuffer intermedio
- Controlador LCD dedicado compatible con 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI y EPD de 8/16 bits
- El subsistema de pantalla admite usos de pantalla siempre activa y bajo consumo
- Controlador de cámara DCMI compatible con interfaces DVP y SPI/Dual-SPI/Quad-SPI

### Audio y analógico { #audio-and-analog }

- 1 DAC de audio de 24 bits y alta fidelidad, con SNR de 109 dB
- 2 ADC de audio de 24 bits y alta fidelidad, con SNR de 97 dB
- Frecuencias de muestreo de audio de 8 a 96 kHz, incluidas las habituales en telefonía y música
- LDO Micbias con salida de 1,4 a 2,8 V y corriente de salida de hasta 2 mA
- Admite reproducción y grabación de audio, llamadas Bluetooth y reproducción MP3 con auriculares conectados
- 1 ADC SAR de propósito general, de 12 bits y 12 canales
- 1 sensor de temperatura integrado en el chip

### Almacenamiento y seguridad { #storage-and-security }

- OPI-PSRAM SiP compatible hasta 156 MHz
- Flash NOR SiP compatible hasta 104 MHz
- 3 interfaces MPI (QSPI) para NOR, NAND y QPI-PSRAM, con ejecución XIP en memoria mapeada
- 2 interfaces SD/SDIO compatibles con SD 3.0, SDIO 3.0 y eMMC
- Descifrado de Flash sobre la marcha
- Aceleradores AES, HASH y CRC
- Generador de números aleatorios verdaderos (TRNG)
- Arquitectura de seguridad eShield
- PSA Certified Level 1

### Periféricos y E/S { #peripherals-and-ios }

- Hasta 58 GPIO, según el encapsulado y la referencia comercial
- Asignación flexible de GPIO mediante FreeIO
- 3× UART
- 4× I2C
- 2× SPI
- 2× I2S
- 2 interfaces PDM (hasta dos micrófonos digitales por interfaz)
- 1× USB 2.0 Full-Speed
- 2× CAN
- Integración de eventos PTM para secuencias periféricas activadas por eventos y coordinación multinúcleo
- 2× GPTIM de 16 bits
- 4× BTIM de 32 bits
- 2× ATIM de 32 bits
- 2× LPTIM de 24 bits
- 1× PWM
- 1× RTC
- 2× WDT de 24 bits y 1× WDT independiente

### Gestión de alimentación { #power-management }

- Convertidor reductor Buck de alta eficiencia y LDO de bajo consumo integrados
- Dos salidas externas de alimentación de 3,3 V, de hasta 150 mA cada una
- Corriente en modo Hibernate: 2,8 µA a 3,8 V (configuración con batería) o 1 µA a 3,3 V (configuración con alimentación externa)
- Cargador lineal configurable de batería de ion-litio (corriente de carga de hasta 400 mA) integrado en la variante alimentada por batería
- Tensión de carga completa: de 4,2 a 4,45 V
- Rango de entrada de batería/sistema[^4]: de 3,0 a 4,7 V
- Rango de VBUS: de 4,5 a 5,5 V
- Temperatura de funcionamiento: de −40 a +85 °C

## Variantes de familia { #family-variants }

La familia SF32LB57x incluye variantes para alimentación por batería y variantes que requieren una fuente externa regulada de 3,3 V. Elija la referencia exacta antes de la captura del esquemático, ya que los planos del encapsulado, los pines de alimentación, las GPIO disponibles, la memoria integrada y las restricciones de la placa varían según la versión.

Las referencias siguientes proceden de las tablas de pedidos de las hojas de datos de SF32LB57x de SiFli (DS5701 y DS5702, V0.2.1, ambas en borrador preliminar), salvo `SF32LB57ZVN7N6`, que esas tablas no incluyen. Confirme en la documentación vigente de SiFli para la referencia exacta el código de pedido, la memoria integrada en el encapsulado, los límites eléctricos y el plano del encapsulado antes de integrar el diseño.

Para una primera selección, tenga en cuenta estos grupos:

- **`SF32LB57xU`**: QFN68, variantes para batería de ion-litio (nivel indicado con un dígito, por ejemplo, `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, variantes estándar para alimentación externa de 3,3 V (nivel indicado con una letra, por ejemplo, `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, variantes para alimentación externa de 3,3 V.

La hoja de datos de la serie alimentada por batería (DS5701) también incluye un QFN80 alimentado por batería (8 × 8 mm, 58 GPIO) y un BGA112 alimentado por batería (hasta 58 GPIO más 6 E/S GPO o de interfaz MPI). Sin embargo, su tabla de pedidos no contiene ninguna referencia de QFN80 ni de BGA112 alimentados por batería; confirme el SKU que puede pedirse con SiFli antes de diseñar en torno a cualquiera de ellos.

<div align="center"><em>Variantes SF32LB57x en QFN68 (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Encapsulado | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Dimensiones en planta[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Grosor[^3] | 0,9 mm | 0,9 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Paso | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| Memoria integrada en el encapsulado | 4 MB de OPI-PSRAM + 16 MB de QSPI-NOR | 4 MB de OPI-PSRAM + 16 MB + 8 MB de QSPI-NOR (dos dies) | 4 MB de OPI-PSRAM + 2 × 16 MB de QSPI-NOR (dos dies) | 8 MB de OPI-PSRAM, sin QSPI-NOR | 16 MB de OPI-PSRAM, sin QSPI-NOR | Sin PSRAM; solo 1 MB de QSPI-NOR |
| Alimentación[^4] | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | **3,3 V** |
| Tensión de E/S[^5] | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V |
| Temperatura de funcionamiento | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

<div align="center"><em>Variantes SF32LB57x en QFN80 y BGA112 (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Encapsulado | QFN80 | QFN80 | BGA112 | BGA112 |
| Dimensiones en planta[^3] | 8 × 8 mm | 8 × 8 mm | 5,4 × 4,4 mm | 5,4 × 4,4 mm |
| Grosor[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 0,98 mm |
| Paso | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIO | 58 | 58 | 58 + 6 (MPI3 o salidas estáticas)[^2] | 58[^2] |
| Memoria integrada en el encapsulado | 8 MB (2 × 4 MB, dos dies) de OPI-PSRAM, sin QSPI-NOR | 16 MB de OPI-PSRAM + 16 MB de QSPI-NOR | Sin PSRAM + 16 MB de QSPI-NOR | 16 MB de OPI-PSRAM + 32 MB (2 × 16 MB, dos dies) de QSPI-NOR |
| Alimentación | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tensión de E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura de funcionamiento | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

En SF32LB57x, el encapsulado no se elige únicamente por el coste de la PCB. También determina las interfaces de pantalla disponibles, el enrutamiento de la memoria externa, el presupuesto de GPIO, la disponibilidad de los pines de depuración y descarga y la dificultad del fanout. Defina el encapsulado junto con la arquitectura de alimentación. Para la lista de materiales y el esquemático, use la referencia comercial completa, no solo el nombre del encapsulado: el sufijo de memoria determina la configuración SiP y puede cambiar los supuestos sobre el medio de arranque, la secuencia de alimentación y la memoria externa necesaria.

## Ruta de integración { #integration-path }

Siga estos pasos para convertir una preselección de SF32LB57x en un diseño validado:

1. **Valide la ruta de firmware.** Empiece con la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Después, use el [flujo de trabajo del SDK](../../develop/platforms/sifli-sdk/overview.md) y los [ejemplos](../../develop/examples/index.md) para probar las funciones de gráficos, audio, cámara, Bluetooth y almacenamiento que necesita el producto.
2. **Planifique el hardware de evaluación.** μForge aún no ofrece un módulo ni una placa de desarrollo específicos para SF32LB57. Consulte el [selector de productos SF32](../product-selector.md) para encontrar la opción de evaluación más próxima. Antes de extrapolar los resultados a un diseño 57x, compruebe que coincidan el encapsulado, la alimentación, la memoria y las interfaces.
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, siga la [guía de diseño de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), incluida la [autoevaluación del diseño del cliente](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), y el proceso de revisión de [diseño para producción](../../hardware/design-for-production.md). Por ahora no hay una lista de comprobación de μForge específica para esta familia.
4. **Verifique la fuente de referencia.** Verifique la referencia comercial y el encapsulado exactos en la [hoja de datos][Hoja de datos], el [manual de usuario][Manual de usuario] y la [guía original de diseño][Guía original de diseño (wiki.sifli.com)] de SiFli. Para seleccionar componentes críticos de la lista de materiales, consulte también la [lista de proveedores aprobados de SiFli][Lista de proveedores aprobados de SiFli].

<!-- uf-faq:start -->
## Preguntas frecuentes { #frequently-asked-questions }

**¿Cuáles son las especificaciones principales del SF32LB57x?**
El SF32LB57x combina una CPU de aplicación (2× Cortex-M33 @240 MHz) con un núcleo de bajo consumo (Cortex-M33 @24 MHz, un controlador Bluetooth dedicado), 592 KB de SRAM interna y Bluetooth dual (BT clásico + BLE). Gráficos: ePicasso 3.0 + eZip 3.0. Encapsulado: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. Valores de la familia; verifique la hoja de datos del número de pieza exacto.

**¿Qué interfaces de pantalla admite el SF32LB57x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. La disponibilidad varía según el número de pieza y el encapsulado.

**¿Cuánta memoria en el encapsulado ofrece el SF32LB57x?**
Hasta 48 MB de PSRAM y hasta 32 MB de Flash NOR en el encapsulado, según el número de pieza.

**¿Qué tensión de alimentación necesita el SF32LB57x?**
3.0–4.7 V or 2.97–3.63 V, según la variante. Confirme el rango exacto en la hoja de datos.

**¿Por dónde empezar un diseño de hardware con el SF32LB57x?**
Empiece con la [guía de diseño de hardware del SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) para esquemático, alimentación, reloj/RF y diseño de PCB, y use después las listas de verificación de esquemático y layout antes de liberar la placa.
<!-- uf-faq:end -->

## Productos relacionados { #related-products }

### Base de diseño de hardware { #hardware-design-baseline }

Use como referencia la [guía de diseño de hardware de μForge.io](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), la nota de aplicación de hardware oficial, la hoja de datos y la lista de proveedores aprobados. Antes de liberar el esquemático o la PCB, confirme la arquitectura de alimentación, el fanout del encapsulado y el plan de pantalla, almacenamiento, audio, cámara, RF, depuración y descarga.

### Placas de desarrollo { #development-kits }

Para planificar la alimentación, los relojes, la RF, la pantalla, el almacenamiento, el audio, la cámara y los accesos de producción, consulte los esquemáticos de referencia oficiales, la guía del sistema mínimo y el material de listas de comprobación.

### Productos de referencia { #reference-products }

Entre los productos basados en SF32LB57x se incluyen relojes y pulseras inteligentes, equipos HMI, dispositivos con pantalla de papel electrónico, electrodomésticos conectados pequeños y medianos, equipos portátiles de grabación o audio, paneles domóticos, terminales compactos con pantalla y productos Bluetooth con cámara.
