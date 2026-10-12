---
icon: lucide/microchip
description: "SF32LB55x: familia de MCU de gama media y consumo ultrabajo para dispositivos vestibles y productos HMI que necesitan mejores prestaciones gráficas, más SRAM y más opciones de encapsulado que las MCU Bluetooth de gama básica."
tags:
    - Hardware
    - Chip
---

# SF32LB55x { #sf32lb55x }

## Visión general { #overview }

La serie SF32LB55x es una familia de microcontroladores AIoT de gama media y consumo ultrabajo para productos conectados por BLE que necesitan mejores capacidades de visualización, más capacidad de memoria y más opciones de encapsulado que las MCU Bluetooth de entrada.

La familia utiliza una arquitectura big.LITTLE de doble núcleo basada en dos procesadores Arm Cortex-M33 STAR-MC1[^1]: un núcleo de aplicación de alto rendimiento, con una frecuencia de hasta 240 MHz, y un núcleo de consumo ultrabajo, de hasta 48 MHz. Esta distribución permite ejecutar las tareas exigentes de la interfaz de usuario en el núcleo de aplicación y dejar en manos del núcleo de bajo consumo el procesamiento de sensores, la gestión del modo de espera y las tareas BLE que deben permanecer activas.

Según el resumen de producto y la hoja de datos oficiales de SiFli, la familia integra BLE 5.2, el motor gráfico ePicasso 2.5D, dos controladores LCD y un acelerador matricial de redes neuronales para TinyML. Dispone de 1 312 KB de SRAM en el chip (1 088 KB en HCPU + 224 KB en LCPU) y admite memorias externas NOR, NAND, eMMC y PSRAM. Por esta combinación, SF32LB55x es una opción práctica para dispositivos vestibles, productos con numerosos sensores e HMI compactas que necesitan más recursos que SF32LB52x, pero no las prestaciones de los dispositivos de las familias superiores 56/58.

La guía de modelos de chips de SiFli indica que SF32LB55x se definió antes que las familias 52/56/58; por ello, sus sufijos no siguen por completo la convención de nomenclatura más reciente. Para seleccionar el componente, consulte el código de pedido completo y las tablas de prestaciones de cada encapsulado; no deduzca todas sus capacidades únicamente a partir del sufijo.

[^1]: STAR-MC1 es una IP configurable de CPU embebida de Arm China, basada en Armv8-M Mainline. En los dispositivos SF32 compatibles, SiFli documenta su integración como procesador de aplicación Arm Cortex-M33 STAR-MC1. El modelo de software de clase Cortex-M33 facilita reutilizar el firmware, middleware, adaptaciones de RTOS y herramientas existentes para Cortex-M33, aunque siguen siendo necesarias las tareas habituales de integración específicas de cada dispositivo. Sus configuraciones CU, SP y SE varían principalmente en capacidad de caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para la variante SF32 concreta. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

## Aplicaciones { #applications }

**SF32LB55x se recomienda para** productos centrados en BLE que necesitan una interfaz de usuario más avanzada, más memoria de trabajo o mayor flexibilidad de encapsulado que las MCU de entrada para dispositivos vestibles. Algunos ejemplos:

- Relojes inteligentes y pulseras de actividad
- Dispositivos portátiles de supervisión de la salud
- Cerraduras inteligentes y controladores de hogar inteligente
- Accesorios conectados con numerosos sensores
- Productos HMI gráficos compactos
- Lápices digitales inteligentes y accesorios para equipos con entrada mediante lápiz
- Terminales portátiles y controladores manuales

Elija SF32LB55x si el diseño requiere una o varias de estas capacidades:

- Conectividad BLE 5.2 con una corriente de recepción muy baja
- Pantallas MIPI DSI en modo comando
- Más SRAM para LVGL, recursos gráficos, adquisición de sensores o cargas de trabajo TinyML
- Un procesador de bajo consumo programable por el usuario
- Más GPIO u opciones de encapsulado con mayor densidad de E/S que SF32LB52x
- Compatibilidad con memorias externas NOR, NAND, eMMC, QSPI-PSRAM y OPI-PSRAM

## Recursos de desarrollo { #development-resources }

[Ficha de producto]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Hoja de datos]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Guía original de diseño (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Nota de aplicación de hardware (fuente en GitHub)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[Guía de modelos de chips de SiFli]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Guía de diseño de hardware (μForge.io)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Fuente de la lista de comprobación de diseño de hardware]: https://wiki.sifli.com/hardware/index.html
[Documentación del SDK]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[Referencia de la API]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha de producto]__
- :fontawesome-solid-file-pdf: __[Hoja de datos]__
- :fontawesome-solid-file-pdf: __[Manual de usuario]__
- :fontawesome-solid-file-lines: __[Guía original de diseño (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Nota de aplicación de hardware (fuente en GitHub)]__
- :fontawesome-solid-list: __[Guía de modelos de chips de SiFli]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (μForge.io)]__
- :fontawesome-solid-book: __[Documentación del SDK]__
- :fontawesome-solid-book-open: __[Referencia de la API]__
- :fontawesome-solid-list-check: __[Fuente de la lista de comprobación de diseño de hardware]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Cómputo y memoria { #compute-and-memory }

- Procesador de aplicación Arm Cortex-M33 STAR-MC1 de alto rendimiento, hasta 240 MHz
- Procesador Arm Cortex-M33 STAR-MC1 de consumo ultrabajo, hasta 48 MHz
- Hasta 360 DMIPS / 965 EEMBC CoreMark en el procesador de aplicación
- Hasta 72 DMIPS / 193 EEMBC CoreMark en el procesador de bajo consumo
- 1 088 KB de SRAM de aplicación, incluidas 64 KB de SRAM de retención
- 224 KB de SRAM de bajo consumo, toda ella de retención
- Interfaces de memoria externa para NOR, NAND, eMMC, QSPI-PSRAM y OPI-PSRAM

### Gráficos, pantalla e IA { #graphics-display-and-ai }

- Motor gráfico ePicasso 2.5D con rotación, escalado, reflejo y mezcla alfa por hardware
- eZip descomprime gráficos sin pérdidas y puede encadenarse con ePicasso
- La capa de transformación de ePicasso admite hasta 640 × 640; las capas genéricas y la salida de pantalla admiten hasta 1024 × 1024, con una frecuencia de salida de hasta 60 fps
- El controlador LCD admite 8080, SPI, Dual-SPI, Quad-SPI, DPI, MIPI DSI y las interfaces JDI de pantalla reflectante en las variantes compatibles; compruebe la disponibilidad para el modelo elegido
- La compresión de framebuffer TurboPixel permite que el controlador LCD lea los datos comprimidos y los descomprima para mostrarlos, reduciendo el espacio de framebuffer y el ancho de banda de lectura necesarios
- Dos controladores LCD; las interfaces para pantalla siempre activa y la capacidad de manejar dos pantallas dependen del modelo y el encapsulado
- Acelerador matricial de redes neuronales para TinyML, de hasta 1,92 GOPS y 5,73 TOPS/W

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- Modos BLE de 125 kbps, 500 kbps, 1 Mbps y 2 Mbps
- Sensibilidad de recepción de −100 dBm en el modo de 1 Mbps
- Potencia máxima de transmisión: 10 dBm
- Corriente pico de recepción: 2,0 mA a 3,3 V

### Seguridad { #security }

- Aceleradores de hardware AES y CRC
- Generador de números aleatorios verdaderos (TRNG)
- PSA Certified Level 1

### Periféricos y E/S { #peripherals-and-ios }

- Hasta 5 UART, 6 I2C y 4 SPI en la familia; el número disponible varía según el modelo, como se indica en la tabla siguiente
- El número de interfaces I2S y PDM también depende del modelo (consulte la tabla). Cada interfaz PDM admite hasta dos micrófonos digitales: el número de interfaces no equivale al número de micrófonos. Compruebe también la disponibilidad de pines del modelo elegido.

<div align="center"><em>Recuentos publicados de periféricos y ADC por modelo (SS6600A8 sin especificar)</em></div>

<div align="center" markdown>

| Modelo | UART | I2C | SPI | I2S | PDM | ADC sigma-delta de 16 bits |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | No especificado | No especificado | No especificado | No especificado | No especificado | No especificado |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | No disponible |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 canales |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 canales |

</div>

**Nota sobre las fuentes de SS6600A8:** La [guía actual de modelos de chips de SiFli][Guía de modelos de chips de SiFli] especifica el encapsulado, la memoria integrada, las GPIO y la interfaz de pantalla de este componente, pero no sus cantidades por modelo de UART, I2C, SPI, I2S, PDM o ADC sigma-delta. La tabla 0-1 de la [hoja de datos DS5501 V1.7.2][Hoja de datos] tampoco incluye una fila propia para SS6600A8. Por eso, la tabla indica esas cantidades como «No especificado»; no las deduzca a partir de SF32LB551U4O5 solo porque ambos usan QFN68L. Confirme la configuración con SiFli antes de asignar los pines.

- 1 interfaz USB 2.0 FS, configurable como host o dispositivo
- 1 GPADC (ADC SAR) de 10 bits: la hoja de datos especifica hasta 8 entradas de un solo terminal o 4 pares diferenciales, con un rango de 0–1,1 V para las entradas de un solo terminal
- **Discrepancia entre fuentes sobre el ADC:** La [hoja de datos DS5501 V1.7.2][Hoja de datos] especifica hasta 8 entradas de un solo terminal o 4 pares diferenciales y un rango de 0–1,1 V para las entradas de un solo terminal. La [nota de aplicación de hardware de SF32LB55x][Nota de aplicación de hardware (fuente en GitHub)] indica 5 canales y un rango de entrada de 0–0,9 V. Antes de diseñar la etapa analógica, confirme la asignación de canales y los límites para la variante exacta y la versión del SDK.
- ADC sigma-delta de 16 bits y 5 canales en los modelos BGA145 y BGA169 de la tabla; no está disponible en los modelos QFN68L
- Sensor de temperatura
- 2 comparadores de tensión de bajo consumo
- Controlador de tareas periféricas (PTC)
- El número de GPIO depende del encapsulado; consulte la tabla de encapsulados y la nota sobre discrepancias entre fuentes

### Alimentación y encapsulado { #power-supply-and-package }

- El rango de alimentación depende de la variante: 2,97–3,63 V para SS6600A8; 1,71–3,63 V para 551U4O5 y las variantes BGA seleccionadas
- La temperatura de funcionamiento depende de la variante: −20 °C a +70 °C para las variantes QFN documentadas; −40 °C a +85 °C para las variantes BGA seleccionadas
- Gestión de alimentación integrada con dos reguladores buck de alta eficiencia y un LDO de bajo consumo
- Corriente en modo de suspensión con activación por RTC: 600 nA
- Corriente en modo de suspensión con activación por pin: 280 nA
- Opciones de encapsulado: QFN68L, BGA145 y BGA169

## Variantes de familia { #family-variants }

SF32LB55x está disponible en encapsulados QFN y BGA. Conviene elegir el encapsulado desde el inicio: el número de GPIO, la memoria integrada, las interfaces de pantalla disponibles y los requisitos de fabricación de la PCB varían considerablemente según el encapsulado.

En este caso, elegir el encapsulado no es solo una decisión de diseño de la placa. La [guía de modelos de chips][Guía de modelos de chips de SiFli] de SiFli especifica que, según el encapsulado, la familia 55x ofrece todas o solo algunas de las interfaces de pantalla. Por tanto, fije el encapsulado antes de cerrar la planificación de pantalla, memoria y presupuesto de pines. Los componentes del mismo encapsulado son compatibles pin a pin; antes de elegir un reemplazo compatible, confirme la configuración exacta de memoria y las interfaces de pantalla de cada referencia.

<div align="center"><em>Opciones de E/S de SF32LB55x por encapsulado</em></div>

<div align="center" markdown>

| Encapsulado | GPIO de HCPU / LCPU | GPIO totales | Aplicación típica |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | Dispositivo vestible compacto o sensor BLE, con menores costes de fabricación de la PCB |
| BGA145 | 55 / 40 | 95 | Diseño con pantalla, memoria y sensores, y mayor margen para el trazado de pistas |
| BGA169 | 71 / 42 | 113 | Diseño SF32LB55x con más E/S y la mayor variedad de memoria integrada e interfaces de pantalla |

</div>

Los modelos actuales representativos que figuran en la guía de modelos de chips de SiFli ilustran el equilibrio entre el encapsulado y la memoria. Como esta familia se definió antes de la convención de nomenclatura actual de SiFli, utilice el código completo en lugar de deducir sus características únicamente a partir del sufijo.

<div align="center"><em>Variantes representativas de SF32LB55x</em></div>

<div align="center" markdown>

| Código de pedido | Encapsulado | Memoria integrada | Interfaces de pantalla indicadas en la guía del modelo | Criterios de selección |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | Dos memorias QSPI NOR de 4 MB configuradas como un único dispositivo OSPI NOR de 8 MB; sin PSRAM integrada en el encapsulado | QSPI, 8080 | 49 GPIO; 2,97–3,63 V; −20 °C a +70 °C; opción compacta sin PSRAM integrada en el encapsulado |
| SF32LB551U4O5 | QFN68L | Flash de arranque QSPI-NOR de 4 MB + OPI-PSRAM de 4 MB | QSPI, 8080 | 49 GPIO; 1,71–3,63 V; −20 °C a +70 °C; opción compacta con PSRAM integrada |
| SF32LB555V4O6 | BGA145 | Flash de arranque QSPI-NOR de 4 MB + OPI-PSRAM de 4 MB | MIPI DSI en modo comando, QSPI, 8080 | 95 GPIO; −40 °C a +85 °C; opción BGA145 equilibrada para pantallas que requieren 4 MB de PSRAM |
| SF32LB555V436 | BGA145 | Flash de arranque QSPI-NOR de 4 MB + OPI-PSRAM de 8 MB | MIPI DSI en modo comando, QSPI, 8080 | 95 GPIO; −40 °C a +85 °C; opción BGA145 si se necesita el doble de PSRAM integrada que en SF32LB555V4O6 |
| SF32LB557VD3A6 | BGA169 | Flash de arranque QSPI-NOR de 1 MB + OPI-PSRAM de 16 MB + QPI-PSRAM de 2 MB | MIPI DSI en modo comando, QSPI, 8080, JDI/Sharp MIP | 113 GPIO; −40 °C a +85 °C; admite dos pantallas simultáneas mediante MIPI DSI y SPI/DSPI, con contenido independiente en cada una |

</div>

Para SF32LB557VD3A6, la guía de modelos vigente de SiFli y la tabla 0-1 de la hoja de datos DS5501 V1.7.2 indican 71 GPIO de HCPU + 42 de LCPU, es decir, 113 en total. En cambio, el resumen de características y el resumen de encapsulados de esa misma hoja de datos, así como la ficha de producto PB0001 V1.3, indican 119 GPIO para BGA169 (71 de HCPU + 48 de LCPU). Por tanto, las fuentes oficiales discrepan, incluso dentro de la propia hoja de datos DS5501. Este artículo sigue la fila específica del modelo y la guía vigente (113). Antes de asignar pines o cerrar el diseño, compruebe las GPIO disponibles en el mapa de bolas del encapsulado y confirme con SiFli el componente realmente comercializado. Verifique también la alimentación y el rango de temperatura de la variante, el código completo y la memoria integrada en la [hoja de datos DS5501 V1.7.2][Hoja de datos], la [ficha de producto PB0001 V1.3][Ficha de producto] y la [guía de modelos de chips de SiFli][Guía de modelos de chips de SiFli]. Los encapsulados BGA145 y BGA169 miden 7 × 7 × 0,94 mm y tienen un paso de 0,5 mm.


## Ruta de integración { #integration-path }

Siga estos pasos para pasar de una preselección de SF32LB55x a un diseño validado:

1. **Valide la ruta de firmware.** Empiece por la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Después, siga el [flujo de trabajo del SDK](../../develop/platforms/sifli-sdk/overview.md) y pruebe los [ejemplos](../../develop/examples/index.md) para verificar la pantalla, Bluetooth y el comportamiento de bajo consumo que necesita el producto.
2. **Planifique la evaluación.** Actualmente, μForge no incluye un módulo ni una placa de desarrollo específicos para SF32LB55. Use el [selector de productos SF32](../product-selector.md) para encontrar la plataforma de evaluación disponible más cercana y compruebe que cubre el encapsulado y las interfaces necesarios antes de trasladar los resultados al diseño 55x.
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, consulte la [guía de diseño de hardware de μForge](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md) y sus listas de comprobación del [esquemático](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) y del diseño de PCB.
4. **Verifique la fuente de referencia.** Compruebe el código de pedido y el encapsulado exactos en la [hoja de datos][Hoja de datos], el [manual de usuario][Manual de usuario], la [guía de diseño original][Guía original de diseño (wiki.sifli.com)] y la [fuente de la nota de aplicación de hardware][Nota de aplicación de hardware (fuente en GitHub)].

## Productos relacionados { #related-products }

### Placas de desarrollo { #development-kits }

Use la nota de aplicación de hardware oficial, los esquemáticos de referencia y la lista de comprobación como punto de partida para elegir el encapsulado y la interfaz de pantalla, definir la alimentación, planificar la memoria y el diseño de RF, y preparar las pruebas de producción.

### Productos de referencia { #reference-products }

Entre los productos finales habituales basados en SF32LB55x se encuentran los relojes inteligentes, las pulseras de actividad, los dispositivos portátiles de supervisión de la salud, las cerraduras inteligentes, los accesorios conectados, los controladores para el hogar inteligente y las HMI gráficas compactas.

!!! note "Contenido autogenerado"
    Esta página se ha redactado sin un documento fuente específico. Verifique las afirmaciones técnicas en la documentación oficial de SiFli antes de basarse en ellas.
