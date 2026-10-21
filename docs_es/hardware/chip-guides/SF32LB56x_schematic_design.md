---
icon: lucide/circuit-board
description: "Guía de esquemático de la MCU SF32LB56x: alimentación, modos y fuentes de activación, relojes, RF, pantalla/táctil/retroiluminación, audio, almacenamiento y fabricación."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guía de diseño de hardware de SF32LB56x — Diseño del esquemático { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "Parte de la guía de diseño de hardware de SF32LB56x"
    Esta página cubre la sección 5, «Directrices de diseño del esquemático». Consulte primero la [descripción general de la guía de diseño de hardware de SF32LB56x](SF32LB56x_hardware_design_guide.md) para elegir el dispositivo y conocer el flujo de diseño completo. Después, continúe con la [lista de comprobación del esquemático](SF32LB56x_schematic_checklist.md) o vaya directamente a las [Directrices de diseño de PCB](SF32LB56x_pcb_layout.md).

## 5. Directrices de diseño del esquemático { #5-schematic-design-guidelines }

### 5.1. Sistema de alimentación { #51-power-system }

Revise conjuntamente los raíles de alimentación del procesador, los condensadores locales necesarios, la asignación de salidas del PMIC, la temporización del reinicio y el cableado del circuito de carga. Las variantes U y V comparten el método de diseño de alimentación, pero difieren en los nombres de los pines de alimentación y en la asignación de cargas.

<div align="center"><em>Tabla 5.1-1: Raíles de alimentación del procesador SF32LB56xU</em></div>

<div align="center" markdown>

| Pin de alimentación PMU | Tensión mínima (V) | Tensión típica (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,7 | 1,8 | 3,6 | 100 | Entrada de alimentación PVDD |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | La salida BUCK_LX se conecta al inductor; la entrada de alimentación interna se conecta al otro extremo del inductor y a un condensador externo. |
| LDO1_VOUT | - | 1,1 | - | 50 | Salida LDO1 con condensador externo |
| LDO2_VOUT | - | 0,9 | - | 20 | Salida LDO2 con condensador externo |
| VDD_RET | - | 0,9 | - | 1 | Salida LDO RET con condensador externo |
| VDD_RTC | - | 1,1 | - | 1 | Salida LDO RTC con condensador externo |
| MIC_BIAS | 1,4 | - | 2,8 | - | Salida de alimentación del micrófono |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentación analógica y de RFPA |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentación de audio analógico |
| VDDIO1 | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación del dispositivo de almacenamiento integrado en el encapsulado del núcleo grande |
| VDDIO2 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de las GPIO PA, excepto PA5~11 |
| VDDIO3 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de PA5~11 |
| VDDIO4 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de las GPIO PB y la Flash integrada del núcleo pequeño |
| GPADC_VREF | - | - | - | - | Entrada de referencia de tensión de GPADC; conecte solo un condensador externo, no se requiere fuente externa. |
| AUD_VREF | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador externo, no se requiere fuente externa. |

</div>

<div align="center"><em>Tabla 5.1-2: Raíles de alimentación del procesador SF32LB56xV</em></div>

<div align="center" markdown>

| Pin de alimentación PMU | Tensión mínima (V) | Tensión típica (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,71 | 1,8 | 3,6 | 100 | Entrada de alimentación PVDD |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | La salida BUCK_LX se conecta al inductor; la entrada de alimentación interna se conecta al otro extremo del inductor y a un condensador externo. |
| LDO1_VOUT | - | 1,1 | - | 50 | Salida LDO1 conectada a un condensador externo |
| LDO2_VOUT | - | 0,9 | - | 20 | Salida LDO2 conectada a un condensador externo |
| VDD_RET | - | 0,9 | - | 1 | Salida LDO RET conectada a un condensador externo |
| VDD_RTC | - | 1,1 | - | 1 | Salida LDO RTC conectada a un condensador externo |
| MIC_BIAS | 1,4 | - | 2,8 | - | Salida de alimentación del micrófono |
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | Entrada de alimentación RF |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentación analógica y de RFPA |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentación de audio analógico |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S PA12-PA78 |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S PA0-PA11 |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S PB |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación SIPA |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación SIPB |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación SIPC |
| GPADC_VREF | - | - | - | - | Entrada de referencia de tensión de GPADC; conecte solo un condensador externo, no se requiere fuente externa. |
| AUD_VREF | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador externo, no se requiere fuente externa. |

</div>

<div align="center"><em>Tabla 5.1-3: Condensadores de alimentación requeridos para SF32LB56xU</em></div>

<div align="center" markdown>

| Pin de alimentación | Condensador | Descripción detallada |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Coloque cerca del pin al menos dos condensadores: uno de 10 µF y otro de 0,1 µF. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Coloque cerca del pin al menos dos condensadores: uno de 4,7 µF y otro de 0,1 µF. |
| LDO1_VOUT | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| LDO2_VOUT | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| VDD_RET | 0,47 µF | Coloque al menos un condensador de 0,47 µF cerca del pin. |
| VDD_RTC | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| AVDD33_ANA | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| GPADC_VREF | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| AVDD33_AUD | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| AUD_VREF | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| MIC_BIAS | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIO1 | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIO2 | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIO3 | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIO4 | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |

</div>

<div align="center"><em>Tabla 5.1-4: Condensadores de alimentación requeridos para SF32LB56xV</em></div>

<div align="center" markdown>

| Pin de alimentación | Condensador | Descripción detallada |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Coloque cerca del pin al menos dos condensadores: uno de 10 µF y otro de 0,1 µF. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Coloque cerca del pin al menos dos condensadores: uno de 4,7 µF y otro de 0,1 µF. |
| LDO1_VOUT | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| LDO2_VOUT | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| VDD_RET | 0,47 µF | Coloque al menos un condensador de 0,47 µF cerca del pin. |
| VDD_RTC | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| AVDD_BRF | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| AVDD33_ANA | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| GPADC_VREFP | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| AVDD33_AUD | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin. |
| AUD_VREF | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| MIC_BIAS | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIOA | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIOA2 | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIOB | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin. |
| VDDIOSA | 0,1 µF | Coloque al menos un condensador de 0,1 µF cerca del pin. |
| VDDIOSB | 0,1 µF | Coloque al menos un condensador de 0,1 µF cerca del pin. |
| VDDIOSC | 0,1 µF | Coloque al menos un condensador de 0,1 µF cerca del pin. |

</div>

<div align="center"><em>Tabla 5.1-5: Valores nominales de salida del PMIC SF30147C (ejemplo de la variante U)</em></div>

<div align="center" markdown>

| Pin de alimentación SF30147C | Tensión mínima (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Salida de 1,8 V; no deduzca de esta fila la asignación de alimentación de los pines del chip en la variante U |
| LVSW1 | 1,8 | 1,8 | 100 | Salida de alimentación de 1,8 V |
| LVSW2 | 1,8 | 1,8 | 100 | Entrada de alimentación de 1,8 V del G-SENSOR |
| LVSW3 | 1,8 | 1,8 | 150 | Entrada de alimentación de 1,8 V del sensor de frecuencia cardíaca |
| LVSW4 | 1,8 | 1,8 | 150 | Entrada de alimentación de 1,8 V de la LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Salida de alimentación de 1,8 V |
| LDO1 | 2,8 | 3,3 | 100 | Salida de 2,8 a 3,3 V; no deduzca de esta fila la asignación de alimentación de los pines del chip en la variante U |
| LDO2 | 2,8 | 3,3 | 100 | Entrada de alimentación del motor |
| LDO3 | 2,8 | 3,3 | 100 | Entrada de alimentación de 3,3 V de la LCD |
| LDO4 | 2,8 | 3,3 | 100 | Entrada de alimentación de 3,3 V del sensor de frecuencia cardíaca |
| HVSW1 | 2,8 | 5 | 150 | Entrada de alimentación del amplificador de potencia analógico Class-K |
| HVSW2 | 2,8 | 5 | 150 | Entrada de alimentación del GPS |

</div>

!!! warning "Verifique la asignación de los raíles del PMIC para la variante U"
    La tabla original de distribución de alimentación de la variante U de SiFli enumera VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C y AVDD_BRF, pero estos nombres no coinciden con la tabla de alimentación del procesador U del mismo documento. La tabla anterior conserva los límites de tensión y corriente de salida del PMIC. No la use para deducir las conexiones a los pines del chip U; confirme la asignación con la revisión correspondiente del esquemático y la hoja de datos del SF30147C antes de liberar el diseño.

<div align="center"><em>Tabla 5.1-6: Ejemplo de distribución de alimentación del PMIC SF30147C para V</em></div>

<div align="center" markdown>

| Pin de alimentación SF30147C | Tensión mínima (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Entradas de alimentación de 1,8 V de SF32LB56xV, como PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC y AVDD_BRF |
| LVSW1 | 1,8 | 1,8 | 100 | Entrada de alimentación lógica del amplificador Class-K de I2S |
| LVSW2 | 1,8 | 1,8 | 100 | Entrada de alimentación de 1,8 V del G-SENSOR |
| LVSW3 | 1,8 | 1,8 | 150 | Entrada de alimentación de 1,8 V del sensor de frecuencia cardíaca |
| LVSW4 | 1,8 | 1,8 | 150 | Entrada de alimentación de 1,8 V de la LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Entrada de alimentación del núcleo eMMC |
| LDO1 | 2,8 | 3,3 | 100 | Entradas de alimentación de 3,3 V de SF32LB56xV, como AVDD33_ANA, AVDD33_AUD y VDDIOA2 |
| LDO2 | 2,8 | 3,3 | 100 | Entrada de alimentación de eMMC o SD NAND |
| LDO3 | 2,8 | 3,3 | 100 | Entrada de alimentación de 3,3 V de la LCD |
| LDO4 | 2,8 | 3,3 | 100 | Entrada de alimentación de 3,3 V del sensor de frecuencia cardíaca |
| HVSW1 | 2,8 | 5 | 150 | Entrada de alimentación del amplificador de potencia analógico Class-K |
| HVSW2 | 2,8 | 5 | 150 | Entrada de alimentación del GPS |

</div>

![Figura 5.1-1: Temporización POR/BOR de SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Temporización POR/BOR de SF32LB56xU</em></div>

![Figura 5.1-2: Temporización POR/BOR de SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Temporización POR/BOR de SF32LB56xV</em></div>

![Figura 5.1-3: Circuito de referencia BUCK de SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Circuito de referencia BUCK de SF32LB56xU</em></div>

![Figura 5.1-4: Circuito de referencia BUCK de SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Circuito de referencia BUCK de SF32LB56xV</em></div>

![Figura 5.1-5: Circuito de referencia LDO de SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Circuito de referencia LDO de SF32LB56xU</em></div>

![Figura 5.1-6: Circuito de referencia LDO de SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-6: Circuito de referencia LDO de SF32LB56xV</em></div>

![Figura 5.1-7: Circuito de referencia de carga de SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-7: Circuito de referencia de carga de SF32LB56xU</em></div>

![Figura 5.1-8: Circuito de referencia de carga de SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-8: Circuito de referencia de carga de SF32LB56xV</em></div>

Sin gestión de ruta de alimentación, el sistema se conecta directamente a VBAT junto con la batería. Es una solución de menor coste, pero los circuitos posteriores no pueden desconectarse por completo de la batería: aumenta la corriente de fuga y no se alcanza el objetivo de bajo consumo de Shipping Mode. Cuando la batería está sobredescargada, la corriente de carga de mantenimiento del cargador debe superar la suma de la carga del sistema y la corriente de fuga (i1+i2 en el diagrama). Con el sistema en funcionamiento, la corriente de carga constante también debe superar i1+i2; de lo contrario, la carga del sistema consume parte de la corriente de carga y es posible que la batería no se cargue por completo. Un cargador con gestión de ruta separa la alimentación del sistema por VSYS de la carga de la batería por VBAT, admite Shipping Mode y puede alimentar el sistema desde VSYS aunque la batería esté sobredescargada.

La variante U ofrece tres topologías de alimentación para elegir según la tensión de E/S de los periféricos y el objetivo de consumo del sistema. En las tres, AVDD33_ANA y AVDD33_AUD se alimentan a 3,3 V. La topología de menor consumo alimenta PVDD y VDDIO1–VDDIO4 a 1,8 V y utiliza periféricos con E/S de 1,8 V. La topología intermedia mantiene PVDD y VDDIO1 a 1,8 V, y alimenta VDDIO2–VDDIO4 y las E/S de los periféricos a 3,3 V. La de mayor consumo mantiene únicamente a 1,8 V VDDIO1, que alimenta la PSRAM integrada; PVDD, VDDIO2–VDDIO4 y las E/S de los periféricos usan 3,3 V. Utilice interruptores de carga para gestionar dinámicamente la alimentación de los módulos externos y manténgalos apagados por defecto cuando no se utilicen. Para los módulos que deban permanecer encendidos, elija componentes con baja corriente de reposo. El nivel predeterminado de hardware de la GPIO de control debe coincidir con la polaridad de habilitación del interruptor para mantenerlo apagado al arrancar. SiFli recomienda una resistencia pull-up o pull-down de 1 MΩ en la entrada de habilitación.

La PMU de la variante U completa el reinicio de encendido cuando PVDD alcanza 1,5 V. Si PVDD cae, se genera un reinicio por brownout al alcanzar el umbral BOR configurado, ajustable entre 1,5 V y 2,5 V.

### 5.2. Modos de funcionamiento y fuentes de activación { #52-operating-modes-and-wake-sources }

Revise conjuntamente el modo de funcionamiento, la fuente de activación, la alimentación de las resistencias pull-up y las decisiones sobre corriente de fuga. Utilice pines con capacidad de activación para botones, panel táctil, interrupciones de sensores, eventos del cargador y otras señales de activación de bajo consumo.

<div align="center"><em>Tabla 5.2-1: Modos de funcionamiento de SF32LB56xU</em></div>

<div align="center" markdown>

| Modo de funcionamiento | CPU | Periférico | SRAM | E/S | LPTIM | Fuente de activación | Tiempo de reactivación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Activo | En marcha | En marcha | Accesible | Conmutable | En marcha |  |  |
| WFI/WFE | Detenido | En marcha | Accesible | Conmutable | En marcha | Cualquier interrupción | < 0,5 µs |
| DEEPWFI | Detenido | En marcha | Accesible | Conmutable | En marcha | Cualquier interrupción | < 5 µs |
| Light Sleep | Detenido | Detenido | No accesible, totalmente retenida | Nivel mantenido | En marcha | RTC, GPIO, LPTIM, entre sistemas, Bluetooth, comparador | < 100 µs |
| Deep Sleep | Detenido | Detenido | No accesible, totalmente retenida | Nivel mantenido | En marcha |  | < 300 µs |
| Standby | Reinicio | Reinicio | No accesible; LP totalmente retenida y HP conserva solo 160 KB | Nivel mantenido | En marcha | RTC, botones, LPTIM, entre sistemas, Bluetooth | 1,5 ms + recuperación |
| Hibernate rtc | Reinicio | Reinicio | Datos no retenidos | High-Z | Reinicio | RTC, botones | > 2 ms |
| Hibernate pin | Reinicio | Reinicio | Datos no retenidos | High-Z | Reinicio | Botones | > 2 ms |

</div>

<div align="center"><em>Tabla 5.2-2: Modos de funcionamiento de SF32LB56xV</em></div>

<div align="center" markdown>

| Modo de funcionamiento | CPU | Periférico | SRAM | E/S | LPTIM | Fuente de activación | Tiempo de reactivación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Activo | En marcha | En marcha | Accesible | Conmutable | En marcha |  |  |
| WFI/WFE | Detenido | En marcha | Accesible | Conmutable | En marcha | Cualquier interrupción | < 0,5 µs |
| DEEPWFI | Detenido | En marcha | Accesible | Conmutable | En marcha | Cualquier interrupción | < 5 µs |
| Light Sleep | Detenido | Detenido | No accesible, totalmente retenida | Nivel mantenido | En marcha | RTC, GPIO, LPTIM, LPCOMP, interrupción entre sistemas, Bluetooth | < 100 µs |
| Deep Sleep | Detenido | Detenido | No accesible, totalmente retenida | Nivel mantenido | En marcha | RTC, GPIO, LPTIM, LPCOMP, interrupción entre sistemas, Bluetooth | < 300 µs |
| Standby | Reinicio | Reinicio | No accesible; LP totalmente retenida y HP conserva solo 160 KB | Nivel mantenido | En marcha | RTC, botones, LPTIM, interrupción entre sistemas, Bluetooth | 1,5 ms + recuperación |
| Hibernate rtc | Reinicio | Reinicio | Datos no retenidos | High-Z | Reinicio | RTC, botones | > 2 ms |
| Hibernate pin | Reinicio | Reinicio | Datos no retenidos | High-Z | Reinicio | Botones | > 2 ms |

</div>

<div align="center"><em>Tabla 5.2-3: Fuentes de interrupción de activación de SF32LB56xU</em></div>

<div align="center" markdown>

| Fuente de interrupción | Pin | Descripción detallada |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Señal de interrupción 0 |
| WKUP_PIN1 | PB33 | Señal de interrupción 1 |
| WKUP_PIN2 | PB34 | Señal de interrupción 2 |
| WKUP_PIN5 | PA50 | Señal de interrupción 5 |
| WKUP_PIN6 | PA51 | Señal de interrupción 6 |
| WKUP_PIN10 | PBR0 | Señal de interrupción 10 |
| WKUP_PIN11 | PBR1 | Señal de interrupción 11 |
| WKUP_PIN12 | PBR2 | Señal de interrupción 12 |

</div>

<div align="center"><em>Tabla 5.2-4: Fuentes de interrupción de activación de SF32LB56xV</em></div>

<div align="center" markdown>

| Fuente de interrupción | Pin | Descripción detallada |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Señal de interrupción 0 |
| WKUP_PIN1 | PB33 | Señal de interrupción 1 |
| WKUP_PIN2 | PB34 | Señal de interrupción 2 |
| WKUP_PIN3 | PB35 | Señal de interrupción 3 |
| WKUP_PIN4 | PB36 | Señal de interrupción 4 |
| WKUP_PIN5 | PA50 | Señal de interrupción 5 |
| WKUP_PIN6 | PA51 | Señal de interrupción 6 |
| WKUP_PIN7 | PA52 | Señal de interrupción 7 |
| WKUP_PIN8 | PA53 | Señal de interrupción 8 |
| WKUP_PIN9 | PA54 | Señal de interrupción 9 |
| WKUP_PIN10 | PBR0 | Señal de interrupción 10 |
| WKUP_PIN11 | PBR1 | Señal de interrupción 11 |
| WKUP_PIN12 | PBR2 | Señal de interrupción 12 |
| WKUP_PIN13 | PBR3 | Señal de interrupción 13 |

</div>

BOOT_MODE selecciona el arranque: nivel alto entra en el modo de descarga; con nivel bajo, la ROM busca un programa de usuario, lo ejecuta si existe y, en caso contrario, entra en el modo de descarga. El pin Mode de la variante U tiene un pull-down interno, puede dejarse flotante si no se utiliza y pertenece al dominio VDDIO2. El pin Mode de la variante V pertenece al dominio VDDIOA y debe mantenerse estable con un pull-up o pull-down de 10 kΩ; no lo deje flotante ni permita que el ruido cambie su nivel. Reserve un punto de prueba de Mode en placas de producción; en las placas de desarrollo resulta útil un jumper de recuperación.

Incluya la alimentación de E/S de memoria en el análisis de apagado de bajo consumo. En Standby de la variante U se conservan los niveles GPIO y VDDIO1 puede permanecer alimentado; configure en modo de bajo consumo el almacenamiento conectado a MPI1/MPI2. En Hibernate no se conservan los niveles GPIO, por lo que debe apagarse VDDIO1 para evitar fugas a través de la E/S de la memoria integrada. En la variante V, mantenga alimentada la E/S de la memoria integrada durante Standby. Antes de Hibernate, apague VDDIOSA y VDDIOSB mediante PBR0 y ponga la Flash NOR en Deep Power-Down. VDDIOSC debe permanecer alimentado.

### 5.3. Generación del reloj { #53-clock-generation }

<div align="center"><em>Tabla 5.3-1: Requisitos de los cristales</em></div>

<div align="center" markdown>

| Cristal | Requisitos de especificación | Descripción detallada |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (valor recomendado: 8,8 pF); △F/F0 ≤ ±10 ppm; ESR ≤ 30 Ω (valor recomendado: 22 Ω) | El consumo del oscilador de cristal depende de CL y ESR. Cuanto menores sean ambos valores, menor será el consumo. Para optimizarlo, elija componentes con CL y ESR relativamente bajos dentro del rango especificado. Reserve junto al cristal espacio para condensadores de ajuste en paralelo. Si CL < 12 pF, no es necesario montar condensadores. |
| 32,768 kHz | CL ≤ 12,5 pF (valor recomendado: 7 pF); △F/F0 ≤ ±20 ppm; ESR ≤ 80 kΩ (valor recomendado: 38 kΩ) | El consumo del cristal depende de CL y ESR. Cuanto menores sean ambos valores, menor será el consumo. Para optimizarlo, elija componentes con CL y ESR relativamente bajos dentro del rango especificado. Reserve junto al cristal espacio para condensadores de ajuste en paralelo. Si CL < 12,5 pF, no es necesario montar condensadores. |

</div>

<div align="center"><em>Tabla 5.3-2: Modelos de cristal recomendados</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Parámetros |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz; △F/F0 = −6 a +8 ppm; CL = 8,8 pF; ESR máx. = 22 Ω; TOPR = −30 a +85 °C; encapsulado métrico: 2016 |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz; △F/F0 = −20 a +20 ppm; CL = 7 pF; ESR máx. = 70 kΩ; TOPR = −40 a +85 °C; encapsulado métrico: 3215 |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz; △F/F0 = −10 a +10 ppm; CL = 8,8 pF; ESR máx. = 40 Ω; TOPR = −20 a +75 °C; encapsulado métrico: 2016 |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz; △F/F0 = −20 a +20 ppm; CL = 7 pF; ESR máx. = 70 kΩ; TOPR = −40 a +85 °C; encapsulado métrico: 3215 |

</div>

Coloque los cristales de 48 MHz y 32,768 kHz cerca del chip, reserve espacio para los condensadores de ajuste y proteja sus pistas del ruido de BUCK, RF, pantalla, motor y cargador.

### 5.4. RF { #54-rf }

En los diseños con SF32LB56xU y SF32LB56xV, enrute la señal RF mediante una pista de impedancia controlada de 50 Ω. Si la antena elegida ya está adaptada, normalmente no se necesitan más componentes RF, pero conviene reservar espacio para una red de adaptación en π que permita filtrar emisiones no deseadas y ajustar la antena durante la puesta a punto final.

Coloque la red de adaptación RF cerca del chip, no de la antena. Sitúe el filtro AVDD_BRF junto al pin del chip y conecte directamente a tierra principal los terminales de tierra de los condensadores. Siempre que sea posible, enrute RF por la capa superficial; evite las vías y los ángulos agudos, añada vías de blindaje a tierra con espaciado reducido (densas) a ambos lados de la pista RF y mantenga fuera de esta zona las señales DC-DC, VBAT, cristal, reloj de alta velocidad, I2C, SPI, SDIO, I2S y UART.

### 5.5. Interfaces de pantalla, táctil y retroiluminación { #55-display-touch-and-backlight-interfaces }

La elección de la interfaz de pantalla debe hacerse al seleccionar el encapsulado. Para la variante U se documentan las opciones SPI/QSPI y JDI; la variante V también documenta las opciones MCU8080 y DPI. Asigne las señales de interrupción y reinicio del panel táctil y el control de retroiluminación teniendo en cuenta la activación del sistema y el acceso durante la producción.

<div align="center"><em>Tabla 5.5-1: Ejemplos de controladores de pantalla</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Resolución | Tipo | Interfaz |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | SPI de 3 líneas, SPI de 4 líneas, SPI de datos duales, SPI de datos cuádruples, MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | SPI de 3 líneas, SPI de 4 líneas, SPI de datos duales, SPI de datos cuádruples, MCU serie 8080 de 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | SPI de datos cuádruples, MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | SPI de 3 líneas, SPI de 4 líneas, SPI de datos duales, SPI de datos cuádruples, MCU serie 8080 de 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | SPI de datos cuádruples |
| GC9C01 | Galaxycore | 360*360 | TFT | SPI de datos cuádruples |
| ST77903 | Sitronix | 400*400 | TFT | SPI de datos cuádruples |

</div>

<div align="center"><em>Tabla 5.5-2: Interfaz de pantalla SPI/QSPI de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal SPI | Pin SF32LB56xU | Pin SS6700A | Descripción detallada |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | Señal de habilitación |
| WRX_SCL | PA37 | PA37 | Señal de reloj |
| DCX | PA39 | PA39 | Señal de datos/comando en modo SPI de 4 hilos; dato 1 en modo Quad-SPI |
| SDI_RDX | PA38 | PA38 | Entrada de datos en modo SPI de 3/4 hilos; dato 0 en modo Quad-SPI |
| SDO | PA38 | PA38 | Salida de datos en modo SPI de 3/4 hilos; debe conectarse en corto con SDI_RDX |
| D0 | PA40 | PA40 | Dato 2 en modo Quad-SPI |
| D1 | PA41 | PA41 | Dato 3 en modo Quad-SPI |
| REST | PA05 | PB04 | Señal de reinicio del panel de pantalla |
| TE | PA33 | PA33 | Señal Tearing Effect para la sincronización de fotogramas de la MCU |

</div>

<div align="center"><em>Tabla 5.5-3: Interfaz de pantalla JDI de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal JDI | Pin | Descripción detallada |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Señal de selección de chip |
| JDI_SCLK | PA41 | Reloj serie |
| JDI_SO | PA40 | Salida de datos serie |
| JDI_DISP | PA36 | Señal de conmutación de pantalla ON/OFF |
| JDI_EXTCOMIN | PA38 | Entrada de polaridad de inversión COM |

</div>

<div align="center"><em>Tabla 5.5-4: Interfaces táctil y de retroiluminación de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal táctil o de retroiluminación | Pin | Descripción detallada |
| :--- | :--- | :--- |
| Interrupción | PA50 | Interrupción de estado táctil (admite activación) |
| I2C1_SCL | PA48 | Reloj I2C de la pantalla táctil |
| I2C1_SDA | PA49 | Datos I2C de la pantalla táctil |
| BL_PWM | PA31 | Control PWM de retroiluminación |
| Reinicio | PB18 | Reinicio del panel táctil |

</div>

<div align="center"><em>Tabla 5.5-5: Interfaz de pantalla SPI/QSPI de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal SPI | E/S | Descripción detallada |
| :--- | :--- | :--- |
| CSX | PA36 | Señal de habilitación |
| WRX_SCL | PA37 | Señal de reloj |
| DCX | PA39 | Señal de datos/comando en modo SPI de 4 hilos; dato 1 en modo Quad-SPI |
| SDI_RDX | PA38 | Entrada de datos en modo SPI de 3/4 hilos; dato 0 en modo Quad-SPI |
| SDO | PA38 | Salida de datos en modo SPI de 3/4 hilos; conectar en corto con SDI_RDX |
| D[0] | PA40 | Dato 2 en modo Quad-SPI |
| D[1] | PA41 | Dato 3 en modo Quad-SPI |
| REST | PA43 | Señal de reinicio de pantalla |
| TE | PA33 | Señal Tearing Effect para la sincronización de fotogramas de la MCU |

</div>

<div align="center"><em>Tabla 5.5-6: Interfaz de pantalla MCU8080 de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal MCU8080 | E/S | Descripción detallada |
| :--- | :--- | :--- |
| CSX | PA36 | Selección de chip |
| WRX | PA37 | Señal de habilitación de escritura de datos |
| DCX | PA39 | Selección de datos o comandos de pantalla |
| RDX | PA38 | Señal de lectura de datos |
| D[0] | PA40 | Dato 0 |
| D[1] | PA41 | Dato 1 |
| D[2] | PA28 | Dato 2 |
| D[3] | PA29 | Dato 3 |
| D[4] | PA30 | Dato 4 |
| D[5] | PA31 | Dato 5 |
| D[6] | PA32 | Dato 6 |
| D[7] | PA34 | Dato 7 |
| REST | PA43 | Reinicio |
| TE | PA33 | Señal Tearing Effect para la sincronización de fotogramas de la MCU |

</div>

<div align="center"><em>Tabla 5.5-7: Interfaz de pantalla DPI de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal DPI | E/S | Descripción detallada |
| :--- | :--- | :--- |
| CLK | PA45 | Señal de reloj |
| DE | PA47 | Señal de habilitación de datos |
| HSYNC | PA44 | Sincronización horizontal |
| VSYNC | PA42 | Sincronización vertical |
| SD | PA50 | Controla el apagado de la pantalla |
| CM | PA51 | Alterna entre el modo de color normal y el modo de color reducido |
| R0 | PA14 | Señal de píxel |
| R1 | PA13 | Señal de píxel |
| R2 | PA16 | Señal de píxel |
| R3 | PA24 | Señal de píxel |
| R4 | PA19 | Señal de píxel |
| R5 | PA21 | Señal de píxel |
| R6 | PA23 | Señal de píxel |
| R7 | PA25 | Señal de píxel |
| G0 | PA28 | Señal de píxel |
| G1 | PA30 | Señal de píxel |
| G2 | PA32 | Señal de píxel |
| G3 | PA33 | Señal de píxel |
| G4 | PA34 | Señal de píxel |
| G5 | PA29 | Señal de píxel |
| G6 | PA31 | Señal de píxel |
| G7 | PA35 | Señal de píxel |
| B0 | PA36 | Señal de píxel |
| B1 | PA37 | Señal de píxel |
| B2 | PA38 | Señal de píxel |
| B3 | PA43 | Señal de píxel |
| B4 | PA41 | Señal de píxel |
| B5 | PA39 | Señal de píxel |
| B6 | PA40 | Señal de píxel |
| B7 | PA46 | Señal de píxel |

</div>

<div align="center"><em>Tabla 5.5-8: Interfaz de pantalla paralela JDI de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal JDI | E/S | Descripción detallada |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | Reloj de desplazamiento del controlador vertical |
| JDI_VST | PA40 | Señal de inicio del controlador vertical |
| JDI_XRST | PA39 | Señal de reinicio de los controladores horizontal y vertical |
| JDI_HCK | PA36 | Reloj de desplazamiento del controlador horizontal |
| JDI_HST | PA38 | Señal de inicio del controlador horizontal |
| JDI_ENB | PA43 | Habilitación de escritura de la memoria de píxeles |
| JDI_R1 | PA29 | Datos de imagen roja (píxeles impares) |
| JDI_R2 | PA31 | Datos de imagen roja (píxeles pares) |
| JDI_G1 | PA34 | Datos de imagen verde (píxeles impares) |
| JDI_G2 | PA32 | Datos de imagen verde (píxeles pares) |
| JDI_B1 | PA30 | Datos de imagen azul (píxeles impares) |
| JDI_B2 | PA28 | Datos de imagen azul (píxeles pares) |
| JDI_XFRP | PBR1 | Señal de excitación del cristal líquido (píxel «encendido») |
| JDI_VCOM/FRP | PBR2 | Señal del electrodo común / señal de excitación del cristal líquido (píxel «apagado») |

</div>

<div align="center"><em>Tabla 5.5-9: Interfaz de pantalla serie JDI de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal JDI | Pin | Descripción detallada |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Señal de selección de chip |
| JDI_SCLK | PA41 | Reloj serie |
| JDI_SO | PA40 | Salida de datos serie |
| JDI_DISP | PA36 | Señal de conmutación de pantalla ON/OFF |
| JDI_EXTCOMIN | PA38 | Entrada de polaridad de inversión COM |

</div>

<div align="center"><em>Tabla 5.5-10: Interfaces táctil y de retroiluminación de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal táctil o de retroiluminación | Pin | Descripción detallada |
| :--- | :--- | :--- |
| Interrupción | PA50 | Interrupción de estado táctil (admite activación) |
| I2C1_SCL | PA48 | Reloj I2C de la pantalla táctil |
| I2C1_SDA | PA49 | Datos I2C de la pantalla táctil |
| BL_PWM | PA35 | Control PWM de retroiluminación |
| Reinicio | PA44 | Reinicio del panel táctil |

</div>

### 5.6. Almacenamiento, sensores, audio y conectividad { #56-storage-sensors-audio-and-connectivity }

No asigne por separado los buses de almacenamiento y pantalla: ambos utilizan grupos de GPIO importantes y pueden condicionar el apilado de capas de la PCB. Antes de cerrar el esquemático, confirme el tipo de almacenamiento de arranque, las resistencias pull-up, el dominio de tensión, el funcionamiento de los interruptores de alimentación y el acceso desde el utillaje de prueba.

<div align="center"><em>Tabla 5.6-1: Interfaz Flash QSPI de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal Flash | Señal de E/S | Descripción detallada |
| :--- | :--- | :--- |
| CS# | PA06 | Selección de chip, activo en bajo. |
| SO | PA07 | Entrada de datos (E/S de datos 1) |
| WP# | PA08 | Salida de protección contra escritura (E/S de datos 2) |
| SI | PA09 | Salida de datos (E/S de datos 0) |
| SCLK | PA10 | Salida de reloj serie |
| Hold# | PA11 | Salida de datos (E/S de datos 3) |

</div>

<div align="center"><em>Tabla 5.6-2: Interfaz Flash SDIO de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal Flash | Señal de E/S | Descripción detallada |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Señal de comando |
| SD2_D1 | PA11 | Dato 1 |
| SD2_D0 | PA10 | Dato 0 |
| SD2_CLK | PA08 | Señal de reloj |
| SD2_D2 | PA06 | Dato 2 |
| SD2_D3 | PA07 | Dato 3 |

</div>

<div align="center"><em>Tabla 5.6-3: Interfaz Flash QSPI de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal Flash | Señal de E/S | Descripción detallada |
| :--- | :--- | :--- |
| CS# | PA06 | Selección de chip, activo en bajo. |
| SO | PA07 | Entrada de datos (E/S de datos 1) |
| WP# | PA08 | Salida de protección contra escritura (E/S de datos 2) |
| SI | PA09 | Salida de datos (E/S de datos 0) |
| SCLK | PA10 | Salida de reloj serie |
| Hold# | PA11 | Salida de datos (E/S de datos 3) |

</div>

<div align="center"><em>Tabla 5.6-4: Interfaz Flash SDIO de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal Flash | Señal de E/S | Descripción detallada |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Señal de comando |
| SD2_D1 | PA11 | Dato 1 |
| SD2_D0 | PA10 | Dato 0 |
| SD2_CLK | PA08 | Señal de reloj |
| SD2_D2 | PA06 | Dato 2 |
| SD2_D3 | PA07 | Dato 3 |

</div>

<div align="center"><em>Tabla 5.6-5: Interfaz eMMC de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal eMMC | Señal de E/S | Descripción detallada |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | Señal de comando |
| SD1_CLK | PA26 | Señal de reloj |
| SD1_D0 | PA22 | Dato 0 |
| SD1_D1 | PA15 | Dato 1 |
| SD1_D2 | PA12 | Dato 6 |
| SD1_D3 | PA20 | Dato 3 |
| SD1_D4 | PA21 | Dato 4 |
| SD1_D5 | PA19 | Dato 5 |
| SD1_D6 | PA13 | Dato 6 |
| SD1_D7 | PA14 | Dato 7 |

</div>

!!! warning "Verifique la asignación de las líneas de datos SD1 del SF32LB56xV"
    La fuente de SiFli identifica PA12 como SD1_D2, pero lo describe como `Data 6`; además, asigna `Data 6` a SD1_D6 y no incluye una fila `Data 2`. Antes de enrutar, confirme la asignación correcta en la documentación de pin-mux publicada. La tabla conserva las entradas publicadas por SiFli.

<div align="center"><em>Tabla 5.6-6: Interfaz I2C de sensores</em></div>

<div align="center" markdown>

| Señal I2C | E/S | Descripción detallada |
| :--- | :--- | :--- |
| SDA | PA18 | Señal de datos I2C de los sensores de seguimiento de luz |
| SCL | PA17 | Señal de reloj I2C de los sensores de seguimiento de luz |

</div>

Adapte la alimentación de E/S del almacenamiento al nivel lógico de la memoria conectada: la variante U usa VDDIO3 y la variante V usa VDDIOA2. Conecte el pin Hold# de la Flash SPI NAND a su alimentación mediante una resistencia pull-up de 10 kΩ. SD1/eMMC solo está disponible en la variante V; no aplique a la U la tabla de pines SD1/eMMC de la V, ya que la U usa la interfaz de almacenamiento SD2.

<div align="center"><em>Tabla 5.6-7: Interfaz de audio de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal de audio | E/S | Descripción detallada |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrada P diferencial o entrada no diferencial de MIC analógico |
| AU_ADC1N | ADCN | Entrada N diferencial de MIC analógico o GND |
| AU_DAC1P | DACP | Salida analógica diferencial P |
| AU_DAC1N | DACN | Salida analógica diferencial N |

</div>

<div align="center"><em>Tabla 5.6-8: Interfaz de audio de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal de audio | E/S | Descripción detallada |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrada P diferencial o entrada no diferencial de MIC analógico |
| AU_ADC1N | ADCN | Entrada N diferencial de MIC analógico o GND |
| AU_DAC1P | DACP | Salida analógica diferencial P |
| AU_DAC1N | DACN | Salida analógica diferencial N |
| I2S1_LRCK | PA71 | Reloj de trama I2S2 |
| I2S1_SDI | PA69 | Entrada de datos I2S2 |
| I2S1_SDO | PA64 | Salida de datos I2S2 |
| I2S1_BCK | PA73 | Reloj de bits I2S2 |

</div>

!!! warning "Verifique la instancia I2S de la variante V"
    La tabla de pines y los nombres de red del esquemático de SiFli identifican estos pines como I2S1_LRCK/SDI/SDO/BCK, pero las descripciones de la tabla los presentan como señales I2S2. La instancia periférica no queda clara; confírmela en la documentación de pin-mux publicada antes de asignar los pines.

Para un micrófono analógico diferencial externo, coloque condensadores de bloqueo de CC de al menos 2,2 µF en las entradas ADC y alimente el micrófono desde MIC_BIAS. El circuito de referencia de micrófono MEMS U conecta MIC_BIAS mediante 1 kΩ y añade un condensador de bypass de 4,7 µF; la salida del micrófono también muestra un condensador de acoplamiento de 0,01 µF. El circuito de referencia de PA analógico U usa condensadores de acoplamiento de entrada de 33 nF y sitúa el filtro paso bajo diferencial cerca del chip. Enrute las salidas DAC analógicas como un par diferencial protegido por masa; mantenga la capacitancia parásita por debajo de 10 pF y la longitud por debajo de 2 cm. La variante V también ofrece I2S; su amplificador I2S de referencia se configura mediante I2C3. Coloque los condensadores de alimentación y referencia de audio cerca de sus pines y aleje el audio analógico de los convertidores conmutados y las señales digitales de alta velocidad.

Ambas variantes ofrecen PWM para motores de vibración. El motor puede alimentarse directamente desde VBAT si su corriente de arranque no desestabiliza el sistema. Además, si se define `BSP_PM_FREQ_SCALING` como `1`, el escalado de frecuencia de la HCPU también modifica la frecuencia PWM en los pines PA. En ese caso, use un pin PB. PB32 es una entrada de alimentación/reinicio activa en nivel alto; una pulsación de al menos 10 s activa el reinicio. El circuito U de referencia conecta la tecla mediante 1 kΩ desde VDDIOB y añade un pull-down de 10 kΩ y un condensador de 0,1 µF a GND. El circuito V de referencia usa una resistencia serie de 1 kΩ desde VDD_1V8 y un pull-down de 10 kΩ. Los demás botones y encoders rotatorios requieren pull-ups; si un encoder mecánico no vuelve al estado apagado tras girarlo, la alimentación del pull-up debe poder desconectarse durante Standby para evitar fugas.

La variante U dispone de PBR0–PBR2 y la V de PBR0–PBR3. Durante el arranque, PBR0 pasa de nivel bajo a alto y puede controlar un interruptor de carga externo; los demás pines PBR arrancan en nivel bajo. Los pines PBR pueden funcionar como salidas en Standby y Hibernate y transportar LPTIM; todos salvo PBR0 pueden emitir un reloj de 32 kHz. También se pueden configurar como entradas de activación, pero la MCU no recibe una interrupción de esa entrada después de despertarse. Priorice los pines PB de la LCPU para I2C, SPI, control y señales de interrupción/activación de sensores. La alimentación de los sensores puede conmutarse según sea necesario desde una salida LVSW o LDO del SF30147C.

Todos los pines PA de U/V pueden multiplexarse como UART, I2C o GPTIM. En U, las excepciones son PB32/PB33/PB34 y PBR0/PBR1/PBR2; en V, PB32–PB36 y PBR0–PBR3. Revise estas restricciones junto con la activación, los botones y la asignación de PBR.

### 5.7. Fabricación { #57-manufacturing }

Reserve acceso para depuración y grabación, modo de grabación de producción, calibración del cristal, puntos de medición de alimentación, pruebas RF y supervisión del control del PMIC. Compruebe que el utillaje pueda alimentar la placa, forzar el modo de arranque/descarga, comunicarse con el chip y recopilar datos de calibración.

Como mínimo, reserve puntos de prueba de producción para VBAT, GND, VDDIO2 en la variante U (VDDIOB en la V), Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD y uno de los pines PB20/PB21/PB25. Al conectar J-Link, configure la alimentación del depurador como entrada externa para que la placa objetivo lo alimente. Asegúrese de que el utillaje de descarga de producción y calibración del cristal pueda acceder a estos puntos.

<div align="center"><em>Tabla 5.7-1: Interfaz de depuración y grabación de SF32LB56xU</em></div>

<div align="center" markdown>

| Señal | Pin | Descripción detallada |
| :--- | :--- | :--- |
| SWCLK | PB15 | Reloj J-Link, interfaz de depuración |
| SWDIO | PB13 | Datos J-Link, interfaz de depuración |
| UART4_RXD | PB16 | Recepción UART, interfaz de descarga y salida de registros |
| UART4_TXD | PB17 | Transmisión UART, interfaz de descarga y salida de registros |

</div>

<div align="center"><em>Tabla 5.7-2: Interfaz de depuración y grabación de SF32LB56xV</em></div>

<div align="center" markdown>

| Señal | Pin | Descripción detallada |
| :--- | :--- | :--- |
| SWCLK | PB15 | Reloj J-Link, interfaz de depuración |
| SWDIO | PB13 | Datos J-Link, interfaz de depuración |
| UART4_RXD | PB16 | Recepción UART, interfaz de descarga y salida de registros |
| UART4_TXD | PB17 | Transmisión UART, interfaz de descarga y salida de registros |

</div>
