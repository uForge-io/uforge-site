---
icon: lucide/microchip
description: "SF32LB57x: familia de MCU AIoT multinúcleo de consumo ultrabajo con Bluetooth dual, núcleos de 240 MHz, gráficos ePicasso 3.0, eZip 3.0 y encapsulados QFN/BGA compactos."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Visión general { #overview }

La serie SF32LB57x es una familia mejorada de microcontroladores AIoT de consumo ultrabajo, dirigida a dispositivos vestibles, productos inteligentes portátiles, equipos para el hogar conectado y pantallas compactas. Está pensada para diseños que necesitan más capacidad gráfica, audio Bluetooth, entrada de cámara, almacenamiento externo y funcionamiento siempre activo de lo que ofrece una MCU Bluetooth básica, sin asumir los compromisos de consumo, coste e integración de una plataforma con procesador de aplicaciones. Como oferta de SiFli para 2026, SF32LB57x evoluciona respecto a SF32LB52x y SF32LB56x sin dejar de buscar un coste competitivo. Ofrece más potencia de CPU, mejor rendimiento gráfico, más GPIO en encapsulados QFN económicos y fáciles de manejar, y combinaciones más flexibles de memoria integrada en el encapsulado. En gráficos, admite resoluciones de hasta 1024 × 600 con color RGB888 (24 bits).

Emplea una arquitectura de tres núcleos Arm Cortex-M33 STAR-MC1[^1]: dos núcleos de alto rendimiento (HCPU y ACPU) de hasta 240 MHz, con un rendimiento conjunto de 1968 CoreMark / 740 DMIPS, y un núcleo LCPU de bajo consumo a 24 MHz. Según la [guía de uso de ACPU de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html), ACPU procesa audio y gráficos, mientras que LCPU se encarga de tareas BLE y de procesar datos de sensores con un consumo menor. La plataforma incorpora 592 KB de SRAM de retención, gráficos ePicasso 3.0, descompresión eZip 3.0, controladores LCD y de cámara DCMI, Bluetooth de modo dual, ADC/DAC de audio, interfaces para memoria SiP y externa, aceleración de seguridad y asignación flexible de pines mediante FreeIO. Su elemento diferenciador es PTM (Parallel Task Machine), un procesador paralelo compacto que descarga de las CPU principales las secuencias periféricas sensibles a ciclos, los protocolos de E/S personalizados, la adquisición de sensores, la temporización tipo PWM y la gestión de eventos.

Determine la referencia exacta antes de reutilizar esquemáticos o iniciar el diseño de la PCB. SF32LB57x se ofrece en QFN68, QFN80 y BGA112; según la familia de la pieza, hay variantes alimentadas por batería y otras por una fuente externa regulada de 3,3 V. Esta elección determina la arquitectura de alimentación, el número de GPIO, el fanout del encapsulado, el enrutamiento de pantalla y almacenamiento, el acceso de depuración y la estrategia de puesta en marcha.

[^1]: STAR-MC1 es una IP configurable de CPU embebida Armv8-M Mainline de Arm China. En los dispositivos SF32 compatibles, SiFli lo documenta como un procesador de aplicación Arm Cortex-M33 STAR-MC1. Su modelo de software de clase Cortex-M33 ayuda a que el firmware, middleware, adaptaciones de RTOS y herramientas Cortex-M33 existentes se puedan reutilizar, sujeto al trabajo normal de integración específico del dispositivo. Sus configuraciones CU, SP y SE varían principalmente en capacidad de caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para el componente SF32 exacto. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

[^2]: **Solo aplicable a BGA112.** SF32LB57x integra MPI1, MPI2 y MPI3. La [convención de nomenclatura de SF32](../family/SF32_namingrule.md) indica la posición de la memoria integrada asociada a cada interfaz. En cualquiera de estas dos configuraciones de memoria SiP, los pines MPI2 y MPI3 no son accesibles desde el exterior del encapsulado, por lo que solo quedan 58 GPIO: (1) una PSRAM integrada en MPI2, ya sea sola o junto con otra PSRAM en MPI1; o (2) una Flash NOR integrada en MPI3. `SF32LB57GVD776` corresponde al caso (2): el segundo `7` identifica el componente interno conectado a MPI3, por lo que solo dispone de 58 GPIO. En las demás configuraciones, las seis E/S BGA112 asociadas a MPI3 pueden utilizarse para MPI3 o configurarse como salidas estáticas de propósito general (GP) mediante pull-up o pull-down; no son GPIO asignables sin restricciones. Por tanto, `58 + 6` en `SF32LB57ZVN7N6` significa 58 GPIO utilizables más seis E/S para MPI3 o salidas estáticas, no 64 GPIO asignables libremente. Esta limitación no afecta a QFN68 ni QFN80: estos encapsulados ofrecen únicamente su número nominal de GPIO, sin pines adicionales para MPI3 o salidas estáticas.

[^3]: Las dimensiones y el grosor del encapsulado siguen las tablas de pedidos y los planos de encapsulado de las hojas de datos de SF32LB57x de SiFli (DS5701 y DS5702): QFN68 (7 × 7 mm, planos de 0,9 mm o 1,1 mm), QFN80 (8 × 8 mm, planos de 0,9 mm o 1,1 mm) y BGA112 (5,4 × 4,4 mm, 0,98 mm). Las referencias con tres dies de memoria (una PSRAM más QSPI-NOR de dos dies) usan la opción de encapsulado más gruesa: 1,1 mm para QFN68 y 1,03 mm para BGA112, según la guía de aplicación de hardware de SiFli. Las tablas de pedidos de las hojas de datos no incluyen SF32LB57ZVN7N6, por lo que su grosor BGA112 se toma del único plano BGA112 de las hojas de datos (0,98 mm). El diagrama de nomenclatura específico de SF32LB57x asigna U a QFN68, Y a QFN80 y V a BGA112; no suponga que la correspondencia Y se aplica a otras familias SF32. Confirme con SiFli el grosor y el plano del encapsulado de la referencia exacta.

[^4]: Para la serie alimentada por batería, la hoja de datos SF32LB57x de SiFli (DS5701) especifica VBAT y VCC de 3,0 a 4,7 V, con una tensión de encendido de 3,5 V ±10 %. La guía de diseño de hardware de SiFli indica una entrada más estrecha, de 3,45 a 4,7 V (QFN68, tabla 2-1-1; QFN80, tabla 2-1-3; BGA112, tabla 2-1-5); los dos documentos difieren, por lo que debe confirmar en la hoja de datos de la referencia exacta qué pin de entrada y límites corresponden.
[^5]: La fila de tensión de E/S resume los dominios admitidos; no significa que cada pin pueda usar indistintamente ambas tensiones. VDDIOA, cuando tiene alimentación separada, alimenta las GPIO. VDDIOSB, cuando está presente, es el raíl de E/S de la memoria SiP; la guía de SiFli especifica 1,8 V para PSRAM integrada y 3,3 V para Flash NOR. Para la serie QFN68 de 3,3 V, la tabla 2-1-2 especifica únicamente 3,3 V para VDDIOA. Verifique cada pin y dominio en la guía del encapsulado y en la hoja de datos de la referencia exacta.
[^6]: Dos dies: son dispositivos de memoria independientes, conectados a interfaces MPI distintas y accesibles por separado.

## Aplicaciones { #applications }

**SF32LB57x es una opción sólida para** productos conectados compactos que necesitan gráficos, audio Bluetooth, entrada de cámara, almacenamiento externo o supervisión continua de sensores en una plataforma basada en una MCU de bajo consumo, por ejemplo:

- Relojes inteligentes, pulseras de actividad física y dispositivos médicos vestibles
- Dispositivos HMI inteligentes, terminales con pantalla y paneles de control
- Dispositivos inteligentes con papel electrónico y marcos de fotos electrónicos
- Electrodomésticos conectados pequeños y medianos y cerraduras inteligentes
- Dispositivos portátiles de grabación y audio, además de walkie-talkies e intercomunicadores Bluetooth
- Dispositivos vestibles o de mano con cámara
- Equipos industriales de visualización, detección, supervisión e instrumentación
- Controladores de consola central del automóvil, llaves inalámbricas y mandos remotos para vehículos
- Redes de malla Bluetooth y concentradores de sensores de bajo consumo

Consulte [Características y especificaciones](#features-and-specs) para conocer las capacidades de gráficos, cámara, audio, almacenamiento y PTM en las que se basan estos usos. La cifra de Bluetooth 6.3 procede de las hojas de datos de SF32LB57x; las fichas de producto aún muestran una revisión anterior. Confirme las funciones opcionales en la documentación SiFli vigente del número de pieza exacto que se vaya a pedir.

## Recursos de desarrollo { #development-resources }

[Guía de diseño de hardware (μForge.io)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[Lista de proveedores aprobados de SiFli]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __Ficha de producto ([batería](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3,3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __Hoja de datos ([batería / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3,3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[Manual de usuario (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-solid-file-lines: __[Guía original de diseño (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[Guía de la placa de desarrollo (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (μForge.io)]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Cómputo y memoria { #compute-and-memory }

- Dos núcleos de alto rendimiento Arm Cortex-M33 STAR-MC1 de hasta 240 MHz, con FPU y MPU (1968 CoreMark / 740 DMIPS en conjunto)
- Núcleo de bajo consumo Arm Cortex-M33 STAR-MC1 a 24 MHz
- Caché de instrucciones de 32 KB + caché de datos de 16 KB (HCPU)
- 592 KB de SRAM de retención (512 KB HPSYS + 80 KB LPSYS), incluidos 128 KB de D-TCM sin ciclos de espera
- Memoria integrada en el encapsulado según la variante, hasta 48 MB de PSRAM y 32 MB de Flash NOR

### Máquina de tareas paralelas PTM { #ptm-peripheral-task-machine }

- PTM de cuatro núcleos para tareas periféricas personalizadas, con ejecución temporizada por hardware en lugar de atención continua de la CPU
- Temporización a nivel de ciclo para secuencias de E/S deterministas
- Hasta 16 canales de E/S por núcleo, compatibles con FIFO/DMA
- Acceso a la memoria AHB y a los registros de periféricos, interrupciones de la CPU y eventos entre núcleos

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth 6.3 de modo dual (Bluetooth Classic y BLE), con BLE Audio y LE Long Range
- Potencia de transmisión máxima:
    - 17 dBm para BLE/BR
    - 13 dBm para EDR2 y EDR3
- Sensibilidad: −100 dBm en BLE a 1 Mbps

### Gráficos, pantalla y cámara { #graphics-display-and-camera }

Resolución máxima e interfaces de panel: consulte [Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix).

- Acelerador gráfico 2D/2.5D ePicasso 3.0, de hasta 2048 × 2048
- Decodificador de hardware eZip 3.0 para eZip/eZip-A sin pérdidas, además de JPEG y MJPEG
- Controlador LCD dedicado compatible con 8080, SPI/DSPI/QSPI, DPI/RGB, JDI y EPD de 8/16 bits
- Controlador de cámara DCMI compatible con DVP y SPI/DSPI/QSPI

### Audio y analógico { #audio-and-analog }

- 1 DAC de audio de 24 bits, con una relación señal/ruido (SNR) de 109 dB
- 2 ADC de audio de 24 bits, con una relación señal/ruido (SNR) de 97 dB
- 1 ADC de propósito general de 12 bits (12 canales)
- Sensor de temperatura

### Almacenamiento y seguridad { #storage-and-security }

- 3 MPI (QSPI) para NOR, NAND y QPI-PSRAM, con XIP
- 2 SD 3.0/SDIO 3.0/eMMC
- Aceleradores de hardware AES/HASH/CRC
- TRNG
- Descifrado de Flash sobre la marcha y arquitectura de seguridad eShield
- PSA Certified Level 1

### Periféricos y E/S { #peripherals-and-ios }

- 3x UART
- 4x I2C
- 2x SPI
- 2x I2S
- 2 interfaces PDM (hasta dos micrófonos digitales cada una)
- 1 USB 2.0 FS
- 2x CAN
- RTC, watchdog y temporizadores de propósito general (GPTIM, BTIM, ATIM, LPTIM) con PWM
- Hasta 58 GPIO según el encapsulado y la referencia, con asignación flexible FreeIO

### Gestión de alimentación { #power-management }

- Convertidor reductor Buck y LDO de bajo consumo integrados; dos salidas externas de 3,3 V, de hasta 150 mA cada una
- Corriente en modo Hibernate: 2,8 µA a 3,8 V (configuración con batería) o 1 µA a 3,3 V (configuración con alimentación externa)
- Cargador de ion-litio de hasta 400 mA (de 4,2 a 4,45 V) en la configuración con batería
- Rango de entrada de batería/sistema[^4]: de 3,0 a 4,7 V
- Rango de VBUS: de 4,5 a 5,5 V
- Temperatura de funcionamiento: de −40 a +85 °C

## Variantes de familia { #family-variants }

La familia SF32LB57x incluye variantes para alimentación por batería y variantes que requieren una fuente externa regulada de 3,3 V. Elija la referencia exacta antes de la captura del esquemático, ya que los planos del encapsulado, los pines de alimentación, las GPIO disponibles, la memoria integrada y las restricciones de la placa varían según la versión.

Las referencias siguientes proceden de las tablas de pedidos de las hojas de datos de SF32LB57x de SiFli (DS5701 y DS5702, ambas en borrador preliminar), salvo `SF32LB57ZVN7N6`, que esas tablas no incluyen. Confirme en la documentación vigente de SiFli para la referencia exacta el código de pedido, la memoria integrada en el encapsulado, los límites eléctricos y el plano del encapsulado antes de integrar el diseño.

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
| Grosor[^3] | 0,9 mm | 1,1 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Paso | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| PSRAM integrada en el encapsulado | 4 MB de OPI-PSRAM | 4 MB de OPI-PSRAM | 4 MB de OPI-PSRAM | 8 MB de OPI-PSRAM | 16 MB de OPI-PSRAM | Ninguna |
| Flash NOR integrada en el encapsulado | 16 MB de QSPI-NOR | 16 MB + 8 MB de QSPI-NOR (dos dies)[^6] | 2 × 16 MB de QSPI-NOR (dos dies)[^6] | Ninguna | Ninguna | 1 MB de QSPI-NOR |
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
| Grosor[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 1,03 mm |
| Paso | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIO | 58 | 58 | 58 + 6 (MPI3 o salidas estáticas)[^2] | 58[^2] |
| PSRAM integrada en el encapsulado | 8 MB (2 × 4 MB, dos dies) de OPI-PSRAM[^6] | 16 MB de OPI-PSRAM | Ninguna | 16 MB de OPI-PSRAM |
| Flash NOR integrada en el encapsulado | Ninguna | 16 MB de QSPI-NOR | 16 MB de QSPI-NOR | 32 MB (2 × 16 MB, dos dies) de QSPI-NOR[^6] |
| Alimentación | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tensión de E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura de funcionamiento | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

En SF32LB57x, el encapsulado no se elige únicamente por el coste de la PCB. También determina las interfaces de pantalla disponibles, el enrutamiento de la memoria externa, el presupuesto de GPIO, la disponibilidad de los pines de depuración y descarga y la dificultad del fanout. Defina el encapsulado junto con la arquitectura de alimentación. Para la lista de materiales y el esquemático, use la referencia comercial completa, no solo el nombre del encapsulado: el sufijo de memoria determina la configuración SiP y puede cambiar los supuestos sobre el medio de arranque, la secuencia de alimentación y la memoria externa necesaria.

## Ruta de integración { #integration-path }

Siga estos pasos para convertir una preselección de SF32LB57x en un diseño validado:

1. **Valide la ruta de firmware.** Empiece con la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Después, use el [flujo de trabajo del SDK](../../develop/platforms/sifli-sdk/overview.md) y los [ejemplos](../../develop/examples/index.md) para probar las funciones de gráficos, audio, cámara, Bluetooth y almacenamiento que necesita el producto.
2. **Planifique el hardware de evaluación.** Use [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) para evaluar la pantalla, la cámara, el audio y la conectividad. Antes de tomarla como referencia para un producto 57x, confirme la configuración de memoria del módulo, la revisión de la placa y la configuración de los pines compartidos.
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, siga la [guía de diseño de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), incluida la [autoevaluación del diseño del cliente](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), y el proceso de revisión de [diseño para producción](../../hardware/design-for-production.md). Por ahora no hay una lista de comprobación de μForge específica para esta familia.
4. **Verifique la fuente de referencia.** Verifique la referencia comercial y el encapsulado exactos en la [hoja de datos][Hoja de datos], el [manual de usuario][Manual de usuario] y la [guía original de diseño][Guía original de diseño (wiki.sifli.com)] de SiFli. Para seleccionar componentes críticos de la lista de materiales, consulte también la [lista de proveedores aprobados de SiFli][Lista de proveedores aprobados de SiFli].

<!-- uf-faq:start -->
## Preguntas frecuentes { #frequently-asked-questions }

**¿Cuáles son las especificaciones principales del SF32LB57x?**
El SF32LB57x combina una CPU de aplicación (2× Cortex-M33 @240 MHz) con un núcleo de bajo consumo (Cortex-M33 @24 MHz, un controlador Bluetooth dedicado), 592 KB de SRAM interna y Bluetooth dual (BT clásico + BLE). Gráficos: ePicasso 3.0 + eZip 3.0. Encapsulado: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5,4 × 4,4 mm (BGA112)). USB 2.0 FS.

**¿Qué interfaces de pantalla admite el SF32LB57x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. ([Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**¿Cuál es la resolución de pantalla máxima del SF32LB57x?**
Hasta 1024 × 600 con color RGB888, mediante la interfaz DPI/RGB. ([Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**¿Cuánta memoria en el encapsulado ofrece el SF32LB57x?**
Hasta 48 MB de PSRAM y hasta 32 MB de Flash NOR en el encapsulado.

**¿Qué tensión de alimentación necesita el SF32LB57x?**
3,0–4,7 V o 2,97–3,63 V.

**¿Por dónde empezar un diseño de hardware con el SF32LB57x?**
Empiece con la [guía de diseño de hardware del SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) para esquemático, alimentación, reloj/RF y diseño de PCB, y use después las listas de verificación de esquemático y layout antes de liberar la placa.
<!-- uf-faq:end -->

## Productos relacionados { #related-products }

### Base de diseño de hardware { #hardware-design-baseline }

Use como referencia la [guía de diseño de hardware de μForge.io](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), la nota de aplicación de hardware oficial, la hoja de datos y la lista de proveedores aprobados. Antes de liberar el esquemático o la PCB, confirme la arquitectura de alimentación, el fanout del encapsulado y el plan de pantalla, almacenamiento, audio, cámara, RF, depuración y descarga.

### Placas de desarrollo { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) es la placa de evaluación para pantallas RGB, cámaras DVP, dos micrófonos PDM, salida de altavoz, Wi-Fi SDIO y USB. Se basa en la placa núcleo SF32LB57, que hace las veces de módulo 57 hasta que este disponga de la certificación de RF completa y esté disponible comercialmente.

Para planificar la alimentación, los relojes, la RF, la pantalla, el almacenamiento, el audio, la cámara y los accesos de producción, consulte los esquemáticos de referencia oficiales, la guía del sistema mínimo y el material de listas de comprobación.

### Productos de referencia { #reference-products }

Entre los productos basados en SF32LB57x se incluyen relojes y pulseras inteligentes, equipos HMI, dispositivos con pantalla de papel electrónico, electrodomésticos conectados pequeños y medianos, equipos portátiles de grabación o audio, paneles domóticos, terminales compactos con pantalla y productos Bluetooth con cámara.
