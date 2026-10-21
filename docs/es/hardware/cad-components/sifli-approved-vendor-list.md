---
icon: lucide/component
description: "Lista de proveedores aprobados (AVL) de SiFli para SF32: cristales, inductores, Flash NOR/NAND y controladores LCD, con requisitos de selección y revisión de la BOM."
tags:
    - Hardware
    - Componentes
    - AVL
---

# Lista de proveedores aprobados para SF32 { #sf32-approved-vendor-list }

## Propósito de esta lista { #what-this-list-is-for }

La **Lista de proveedores aprobados (AVL)** documenta las cualificaciones de componentes realizadas por SiFli para diseños SF32. V0.3 incluye cristales pasivos, inductores para convertidores reductores, Flash NOR/NAND, SD-NAND y un controlador LCD; la hoja de controladores táctiles no contiene entradas. Úsela para seleccionar candidatos y segundas fuentes, y valide la referencia exacta en su PCB, firmware, carcasa, proceso de producción y cadena de suministro. La inclusión no sustituye la validación del producto.

Esta página se basa directamente en la hoja de cálculo oficial de la AVL de SiFli, **`SIFLI-MCU-AVL-认证表`, versión V0.3 (2026-01-21)**. La AVL puede cambiar a medida que se cualifican nuevos componentes; esta página refleja la versión V0.3, fechada el 2026-01-21, y no se actualiza en tiempo real. Esta revisión solo confirma el contenido de V0.3; no determina si algún componente sigue aprobado en revisiones posteriores de la AVL. Consulte el archivo fuente vigente antes de cerrar la BOM:

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli (AVL): descargar V0.3 .xlsx](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[Wiki de SiFli: guías de diseño de hardware y descargas](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "Cómo utilizar esta lista"
    La fuente ofrece requisitos generales para cristales e inductores de convertidores reductores; las demás tablas registran principalmente datos de cada referencia. Úselos para evaluar candidatos, sin suponer que todos los componentes listados cumplen cada límite general: las discrepancias de la fuente se señalan más abajo. Se omiten las columnas vacías en todas las filas, como el soporte de herramientas de descarga de Flash; su omisión no confirma dicho soporte. En las tablas detalladas, el guion (—) suele indicar que V0.3 no proporciona un valor para ese campo. En las celdas de reloj DTR de NOR Flash, en cambio, representa la indicación explícita de la fuente «no soportado»; consulte la nota de NOR Flash.

Evalúe los componentes de la BOM en tres etapas, en lugar de elegir un número de pieza sin más:

1. **Preseleccione según los requisitos.** Compruebe que la capacidad, el riel de tensión, el encapsulado y los requisitos específicos de cada clase (capacitancia de carga para cristales, DCR/Isat para inductores y reloj SDR/DTR para Flash) concuerden con el esquemático y el presupuesto de consumo.
2. **Revise las limitaciones que no se resumen en el valor principal de la hoja de datos.** Confirme que el rango de temperatura cubra las condiciones de uso y almacenamiento del producto, que el firmware espere el identificador de fabricante/JEDEC exacto de esa pieza y que la compatibilidad con OTA, el sistema de archivos o las herramientas de descarga se haya probado con esa pieza concreta, no solo con otra de la misma familia.
3. **Valide el hardware real antes de comprometer la producción.** Mida en su propia placa la corriente en reposo y durante el funcionamiento, vuelva a comprobar la calibración RF del cristal en la PCB y la carcasa finales, e identifique al menos una segunda fuente para cada línea de la BOM con un solo proveedor.

## Resumen de cobertura { #coverage-at-a-glance }

<div align="center"><em>Tabla: resumen de cobertura</em></div>

<div align="center" markdown>

| Categoría | Componentes cualificados | Criterios principales de selección |
|:---|---:|:---|
| Cristales de 48 MHz | 10 | Capacitancia de carga, tolerancia de frecuencia, ESR, tiempo de arranque, calibración CBANK y desviación de frecuencia Bluetooth |
| Cristales de 32,768 kHz | 5 | Capacitancia de carga, tolerancia de frecuencia, ESR, encapsulado, temperatura de funcionamiento |
| Inductores reductores | 8 | Valor de 4,7 µH, DCR, corriente de saturación (Isat), corriente nominal (Irms), SRF y compatibilidad con tamaño 2016 |
| Flash NOR | 44 | Capacidad, riel de tensión, reloj SDR/DTR, ID indicado y corriente en espera/Deep Power-Down |
| Flash SPI-NAND | 18 | Capacidad, modo ECC, geometría de páginas/bloques, Golden Block y corrientes en espera/lectura/programación |
| Flash SD-NAND | 5 | Compatibilidad con SD 2.0, operación a 50 MHz, corriente en espera y rango de temperatura de funcionamiento |
| Controladores LCD | 1 | Una referencia incluida; confirme temporización del panel, soporte del controlador y modo de interfaz antes de la liberación |
| Controladores de panel táctil | 0 | Sin entradas en V0.3; confirme por separado la cualificación y el soporte del controlador |

</div>

Use el resumen para conocer la cobertura de V0.3. La selección de pantalla y control táctil requiere especial atención: esta versión incluye un único controlador LCD y ningún controlador táctil. Confirme la referencia con SiFli y valídela en el producto; su inclusión en una revisión posterior no elimina esa necesidad.

## Historial de revisiones { #revision-history }

<div align="center"><em>Tabla: historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Autor | Cambio |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Versión inicial. |
| V0.2 | 2025-07-16 | yzli | Se añadieron cristales de 48 MHz de Huilun y JWT (晶威特). |
| V0.3 | 2026-01-21 | yzli | Se añadió Flash NOR de UCUN: UC25WQ80IB, UC25IQ32A, UC25IQ64A y UC25IQ128A. |

</div>

---

## Cristales { #crystal-oscillators }

La AVL incluye cristales de sistema de 48 MHz y cristales de RTC de 32,768 kHz. Consulte los requisitos de las fuentes de reloj en la guía de diseño del dispositivo SF32 exacto y seleccione según capacitancia de carga, tolerancia de frecuencia, ESR, comportamiento de arranque y presupuesto de consumo. Las tablas de cualificación no establecen una única configuración de reloj obligatoria para todos los productos SF32.

### Cristal de sistema de 48 MHz { #48-mhz-system-crystal }

!!! info "Requisitos"
    Capacitancia de carga CL ≤ 12 pF (7 pF recomendado) · Desviación de frecuencia ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω recomendado)

<div align="center"><em>Componentes cualificados: cristales de sistema de 48 MHz</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | CL | ΔF/F0 | ESR | Temperatura de funcionamiento | Encapsulado | Tiempo de arranque | Corriente adicional | CBANK_SEL óptimo | Desviación de frecuencia TX Ch39 (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8.8 pF | −10 a +9 ppm | ≤22 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | 0 µA | 0x1C9 | −32 a −1 kHz / ±20 kHz / +33 a +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −20°C a +75°C | 2016 (métrico) | <800 µs | <30 µA | 0x1DC | −52 a −15 kHz / ±22 kHz / +50 a +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −40°C a +85°C | 2016 (métrico) | <800 µs | <30 µA | 0x1F7 | −53 a +13 kHz / ±30 kHz / +44 a +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | 0 µA | 0x195 | −40 a +1 kHz / −25 a +14 kHz / +12 a +45 kHz |
| HS48000013 | 汇隆电子 | 8.8 pF | ±10 ppm | ≤22 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | <12 µA | 0x1F3 | −27 a +8 kHz / −25 a +10 kHz / −1.2 a +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | <10 µA | 0x1F4 | −41 a +7 kHz / −30 a +20 kHz / +5 a +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30°C a +85°C | 2016 (métrico) | <750 µs | <50 µA | 0x196 | −38 a 0 kHz / −28 a 0 kHz / −4 a +45 kHz |
| 8Y48090002 | TXC (晶技) | 8.8 pF | −6 a +8 ppm | ≤22 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | <30 µA | 0x1D0 | −34 a −9.6 kHz / — / +27.9 a +46.1 kHz |
| 9S48000051 | 惠伦晶体 | 8.8 pF | −6 a +8 ppm | ≤20 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8.8 pF | ±8 ppm | ≤22 Ω | −30°C a +85°C | 2016 (métrico) | <700 µs | <10 µA | 0x1D0 | −34 a −9.6 kHz / −25 a +10 kHz / +27.9 a +46.1 kHz |

</div>

!!! tip "Significado de las columnas de calibración RF"
    **CBANK_SEL** es el ajuste registrado en los datos de cualificación de SiFli. **TX Ch39 Freq Offset** conserva la etiqueta de prueba original y los resultados en tres temperaturas. La hoja no identifica el modo Bluetooth ni la frecuencia de prueba; no suponga que se refiere al canal de publicidad BLE 39 o a un canal concreto de banda media. Confirme la configuración de prueba y el procedimiento de calibración antes de comparar resultados o aplicar los ajustes a su placa. Tres referencias de TKD indican ESR ≤40 Ω pese al requisito general de ≤30 Ω; esta discrepancia también requiere confirmación.

Las cifras de corriente adicional de la tabla de cristales no tienen una referencia de comparación ni una configuración de ensayo completa documentadas. No son corrientes de alimentación del cristal por sí solo; confirme la definición de la medida antes de comparar candidatos o incorporarlas al presupuesto de consumo del sistema.

### Cristal de RTC de 32,768 kHz { #32768-khz-rtc-crystal }

!!! info "Requisitos"
    Capacitancia de carga CL ≤ 12,5 pF (7 pF recomendado) · Desviación de frecuencia ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ recomendado)

<div align="center"><em>Componentes cualificados: cristales de RTC de 32,768 kHz</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | CL | ΔF/F0 | ESR | Temperatura de funcionamiento | Encapsulado | Porcentajes de la fuente; significado sin confirmar (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C a +85°C | 3215 (métrico) | 32% a 55% / 43% a 54% / 38% a 45% |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C a +85°C | 3215 (métrico) | 33% a 54% / 42% a 56% / 35% a 44% |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40°C a +85°C | 1610 (métrico) | 35% a 61% / 42% a 58% / 36% a 48% |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C a +85°C | 3215 (métrico) | 43% a 60% / 45% a 59% / 37% a 48% |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C a +85°C | 3215 (métrico) | 34% a 55% / 41% a 54% / 36% a 46% |

</div>

La hoja registra 32,76 kHz para cada componente en tres temperaturas de prueba concretas: −35 °C, 25 °C y 105 °C. Esa precisión de presentación no demuestra una exactitud de nivel ppm ni el comportamiento en todo el intervalo térmico. Los porcentajes de la tabla aparecen en columnas cuyo encabezado original es `TX_CH39_Freq_offset(KHz)`, aunque su formato sugiere medidas del ciclo de trabajo. Confirme su significado con SiFli antes de utilizarlos como límites del ciclo de trabajo. La prueba a 105 °C tampoco amplía el intervalo de funcionamiento indicado, de −40 °C a +85 °C. El límite de ESR de 90 kΩ del componente Epson supera el requisito general de 80 kΩ; se conserva esa discrepancia del original y debe confirmarse su aceptación para el diseño.

---

## Inductores para convertidores reductores { #buck-inductors }

!!! info "Requisitos"
    Inductancia L = 4,7 µH ±20 % · Resistencia en corriente continua (DCR) ≤ 0,4 Ω · Corriente de saturación (Isat) ≥ 450 mA

<div align="center"><em>Componentes cualificados: inductores para convertidores reductores</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Tipo | Tolerancia | SRF | DCR | Isat | Irms | Encapsulado |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Bobinado | ±20% | 21 MHz | ≤288 mΩ | 1.3 A | 1.45 A | 0806 (métrica 2016) |
| WPN201610H4R7MT | Sunlord | Bobinado | ±20% | 25 MHz | ≤425 mΩ | 1.2 A | 1.0 A | 0806 (métrica 2016) |
| HTTX20161T-4R7MDR | Cyntec | Bobinado | ±20% | — | ≤250 mΩ | 1.7 A | 1.5 A | 0806 (métrica 2016) |
| VLS201612CX-4R7M-1 | TDK | Bobinado | ±20% | 51 MHz | ≤252 mΩ | 0.88 A | 1.32 A | 0806 (métrica 2016) |
| CIGW201610GL4R7MLE | Samsung | Bobinado | ±20% | — | ≤240 mΩ | 1.4 A | 1.4 A | 0806 (métrica 2016) |
| DFE201612E-4R7M=P2 | Murata | Bobinado | ±20% | — | ≤252 mΩ | 1.8 A | 1.2 A | 0806 (métrica 2016) |
| SWAI201610H4R7M | 三体微 | Bobinado | ±20% | — | ≤390 mΩ | 1.3 A | 1.05 A | 0806 (métrica 2016) |
| FSHJ201610-4R7M | 方磁 | Bobinado | ±20% | — | ≤425 mΩ | 1.1 A | 0.9 A | 0806 (métrica 2016) |

</div>

La inclusión en esta tabla no hace que los ocho inductores sean eléctricamente intercambiables. WPN201610H4R7MT y FSHJ201610-4R7M tienen una DCR máxima indicada de 425 mΩ, superior al requisito general de 0,4 Ω. La hoja no explica esta discrepancia; confirme su aceptación con SiFli en lugar de asumir que cumplen ese límite. Para cada candidato, compruebe las pérdidas por DCR, Isat, Irms, SRF, patrón de pads, altura y aumento de temperatura según la corriente real del inductor y las condiciones del convertidor, no según la corriente media del producto completo.

---

## Flash NOR { #nor-flash }

V0.3 incluye 44 referencias de Flash NOR de 4 Mb a 256 Mb, agrupadas por capacidad. Las frecuencias indicadas corresponden a las memorias y no garantizan esas velocidades en cualquier dispositivo SF32 o placa. Compruebe los comandos de lectura, los límites del controlador, la temporización y la identificación del dispositivo por el controlador de software en su diseño exacto. La fuente denomina «Manufacture ID» a los valores hexadecimales, pero estos también incluyen campos de identificación del dispositivo: compare la respuesta completa prevista, no solo el byte del fabricante. Calcule el consumo activo y en espera con corrientes cuyas condiciones de funcionamiento estén documentadas.

### 4 Mb–16 Mb { #4-mb-16-mb }

Ninguno de los seis componentes de este rango de capacidad admite el modo DTR; por ello, solo se muestra el reloj SDR.

<div align="center"><em>Componentes cualificados: Flash NOR de 4 Mb a 16 Mb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Capacidad | Tensión | Rango de temperatura | Reloj SDR máx. | ID indicado | Corriente en espera | Corriente en Deep Power-Down | Corriente de lectura activa |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1.65–3.6 V | −40°C a +85°C | 85 MHz @1.8 V / 104 MHz @3.3 V | 0x856013 | 10 µA | 0.1 µA @1.8 V / 0.6 µA @3.3 V | 3.5 mA @85 MHz (1.8 V) / 5 mA @85 MHz (3.3 V) / EDH: no soportado |
| P25Q80LE | PUYA | 8 Mb | 1.65–2.0 V | −40°C a +85°C | 104 MHz | 0x856014 | 9 µA | 0.1 µA | 1.5 mA @85 MHz / EDH: no soportado |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz | 0xC86014 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: no soportado |
| UC25WQ80IB | UCUN | 8 Mb | 1.65–3.6 V | −40°C a +85°C | 104 MHz | 0xB36014 | 1.5 µA | 0.5 µA | 6 mA @85 MHz / EDH: no indicado |
| P25Q16LE | PUYA | 16 Mb | 1.65–2.0 V | −40°C a +85°C | 104 MHz | 0x856015 | 18 µA | 0.1 µA | 3 mA @85 MHz / EDH: no soportado |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz | 0xC86015 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: no soportado |

</div>

### 32 Mb–64 Mb { #32-mb-64-mb }

<div align="center"><em>Componentes cualificados: Flash NOR de 32 Mb a 64 Mb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Capacidad | Tensión | Rango de temperatura | Reloj máx. (SDR / DTR) | ID indicado | Corriente en espera | Corriente en Deep Power-Down | Corriente de lectura activa |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1.65–2.0 V | −40°C a +85°C | 120 MHz / — | 0x856016 | 9 µA | 0.2 µA | 2 mA @85 MHz / EDH: no soportado |
| SK25LE032 | SK | 32 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz / — | 0xC86016 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: no soportado |
| UC25IQ32A | UCUN | 32 Mb | 2.7–3.6 V | −40°C a +85°C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: no indicado |
| P25Q64LE | PUYA | 64 Mb | 1.65–2.0 V | −40°C a +85°C | 104 MHz / — | 0x856017 | 18 µA | 0.3 µA | 2 mA @85 MHz / EDH: no soportado |
| P25Q64H | PUYA | 64 Mb | 2.3–3.6 V | −40°C a +85°C | 120 MHz / — | 0x856017 | 18 µA | 0.6 µA | 4 mA @85 MHz / EDH: no soportado |
| P25Q64SH | PUYA | 64 Mb | 2.3–3.6 V | −40°C a +85°C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0.3 µA | 6.8 mA @85 MHz (SDR) / 9.45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz / — | 0xC86017 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: no soportado |
| ZB25LQ64A | ZBIT | 64 Mb | 1.65–2.0 V | −40°C a +85°C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: no indicado |
| BY25Q64ES | BOYA | 64 Mb | 2.7–3.6 V | −40°C a +85°C | 120 MHz / — | 0x684017 | 9 µA | 0.4 µA | 6 mA @80 MHz / EDH: no soportado |
| UC25IQ64A | UCUN | 64 Mb | 2.7–3.6 V | −40°C a +85°C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz / EDH: no indicado |

</div>

### 128 Mb { #128-mb }

<div align="center"><em>Componentes cualificados: Flash NOR de 128 Mb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Tensión | Rango de temperatura | Reloj máx. (SDR / DTR) | ID indicado | Corriente en espera | Corriente en Deep Power-Down | Corriente de lectura activa |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1.65–2.0 V | −40°C a +85°C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0.5 µA | 4.5 mA @85 MHz / EDH: no indicado |
| PY25Q128HA | PUYA | 2.7–3.6 V | −40°C a +85°C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz (SDR) / 9 mA @66 MHz (DTR) |
| SK25LP128 | SK | 1.65–2.0 V | −40°C a +85°C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1.65–2.0 V | −40°C a +85°C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz / EDH: no soportado |
| GD25Q128E | GD (GigaDevice) | 2.7–3.6 V | −40°C a +85°C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz / EDH: no soportado |
| GD25F128F | GD (GigaDevice) | 2.7–3.6 V | −40°C a +85°C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: no indicado |
| W25Q128JW | Winbond | 1.7–1.95 V | −40°C a +85°C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — / EDH: no soportado |
| W25Q128JV | Winbond | 2.7–3.6 V | −40°C a +85°C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: no soportado |
| XT25F128F | XTX | 2.7–3.6 V | −40°C a +85°C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: no indicado |
| XT25Q128DW | XTX | 1.7–2.0 V | −40°C a +85°C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0.4 µA | 9 mA @80 MHz / EDH: no indicado |
| FM25W128 | FM | 1.65–3.6 V | −40°C a +85°C | 50 MHz @1.8 V / 100 MHz @3.3 V (solo SDR, sin soporte para DTR) | 0xA12818 | 5 µA | 1 µA @3.3 V | — / EDH: no soportado |
| XM25QU128C | XMC | 1.65–1.95 V | −40°C a +85°C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz / EDH: no soportado |
| ZB25VQ128D | ZBIT | 2.3–3.6 V | −40°C a +85°C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: no soportado |
| ZB25LQ128B | ZBIT | 1.65–2.0 V | −40°C a +85°C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz / EDH: no soportado |
| BY25Q128ES | BOYA | 2.7–3.6 V | −40°C a +85°C | 108 MHz / — | 0x684018 | 14 µA | 0.2 µA | 6 mA @80 MHz / EDH: no soportado |
| UC25IQ128A | UCUN | 2.7–3.6 V | −40°C a +85°C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz / EDH: no indicado |

</div>

### 256 Mb { #256-mb }

<div align="center"><em>Componentes cualificados: Flash NOR de 256 Mb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Tensión | Rango de temperatura | Reloj máx. (SDR / DTR) | ID indicado | Corriente en espera | Corriente en Deep Power-Down | Corriente de lectura activa |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1.7–1.95 V | −40°C a +85°C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz / EDH: no soportado |
| W25Q256JV | Winbond | 2.7–3.6 V | −40°C a +85°C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: no soportado |
| PY25Q256HB | PUYA | 2.7–3.6 V | −40°C a +85°C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11.5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1.65–2.0 V | −40°C a +85°C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz / EDH: no soportado |
| GD25Q256E | GD (GigaDevice) | 2.7–3.6 V | −40°C a +85°C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: no soportado |
| XM25QU256C | XMC | 1.65–1.95 V | −40°C a +85°C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz / EDH: no soportado |
| XM25QH256C | XMC | 2.3–3.6 V | −40°C a +85°C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz / EDH: no soportado |
| XT25F256BW | XTX | 2.7–3.6 V | −40°C a +85°C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0.5 µA | 8 mA @80 MHz / EDH: no indicado |
| DS25M4BA | Dosilicon | 1.65–1.95 V | −40°C a +85°C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz / EDH: no indicado |
| BY25Q256FS | BOYA | 2.7–3.6 V | −40°C a +85°C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz / EDH: no indicado |
| MX25U25643G | MXIC (Macronix) | 1.65–2.0 V | −40°C a +85°C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0.8 µA | 7 mA @84 MHz / EDH: no indicado |

</div>

!!! warning "Las corrientes y los límites de modo requieren sus condiciones originales"
    Son valores registrados en la AVL, no mediciones independientes de este sitio. Salvo indicación expresa, no suponga que un valor es típico o máximo, ni que las condiciones de tensión, temperatura y reloj no especificadas coinciden con otra fila. Verifique la hoja de datos del componente y mida su placa. Las corrientes de lectura proceden de las columnas `EBH` y `EDH` de la fuente. «—» en una celda de corriente significa que falta el valor; en la columna de reloj DTR representa una entrada de modo no compatible. La fuente denomina `TDR` a su segunda columna de reloj; esta página utiliza `DTR`, pero debe comprobar el modo de lectura y el comando para cada dispositivo.

    Las etiquetas EDH conservan la distinción de la fuente entre datos ausentes y funcionamiento no soportado; no se deducen de la columna de reloj. P25Q128L presenta una incoherencia: su frecuencia SDR máxima figura como 70 MHz, pero la corriente de lectura se especifica a 85 MHz. Se conservan ambos valores; confirme las condiciones válidas antes de utilizarlos.

---

## Flash SPI-NAND { #spi-nand-flash }

V0.3 incluye 18 referencias SPI-NAND de 512 Mb y 1 Gb. Con un controlador y una pila de software compatibles pueden almacenar archivos o datos; FatFS, FlashDB y LittleFS son ejemplos, pero debe validarse la compatibilidad con la referencia elegida. El acceso por páginas, ECC y la gestión de bloques defectuosos de NAND difieren del acceso XIP directo en NOR. La hoja de cálculo indica **Golden Block** como `block0` para todas las referencias, sin especificar las condiciones de garantía ni qué rutinas de firmware dependen de él. Confirme estos supuestos en la documentación del dispositivo y del SDK.

Para GD5F1GM7RE y GD5F1GM7UE, la fuente indica `2048+64` bytes por página y `128K+8K` bytes por bloque. Los tamaños del área de reserva no concuerdan con un cálculo directo de páginas por bloque. La tabla conserva ambos valores; confirme la geometría de páginas, bloques y áreas de reserva en la hoja de datos de la referencia exacta antes de configurar el controlador de software.

### 512 Mb { #512-mb }

<div align="center"><em>Componentes cualificados: Flash SPI-NAND de 512 Mb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Tensión | Rango de temperatura | ID indicado | Tamaño de página/bloque | Velocidad máx. | ECC | Golden Block | Corriente en espera | Lectura de página | Programación/borrado |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2.7–3.6 V | −40°C a +85°C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1.7–1.95 V | −40°C a +85°C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1.7–1.95 V | −40°C a +85°C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2.7–3.6 V | −40°C a +85°C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb { #1-gb }

<div align="center"><em>Tabla: componentes cualificados de Flash SPI-NAND de 1 Gb</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Tensión | Rango de temperatura | ID indicado | Tamaño de página/bloque | Velocidad máx. | ECC | Golden Block | Corriente en espera | Lectura de página | Programación/borrado |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1.7–1.95 V | −40°C a +85°C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2.7–3.6 V | −40°C a +85°C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1.7–2.0 V | −40°C a +85°C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2.7–3.6 V | −40°C a +85°C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW 8-bit | `block0` | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2.7–3.6 V | −40°C a +85°C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1.7–1.98 V | −40°C a +85°C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW 4-bit | `block0` | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2.7–3.6 V | −40°C a +85°C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW 4-bit | `block0` | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1.7–1.95 V | −40°C a +85°C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW 8-bit | `block0` | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2.7–3.6 V | −40°C a +85°C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1.7–1.95 V | −40°C a +85°C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2.7–3.6 V | −40°C a +85°C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2.7–3.6 V | −40°C a +85°C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1.75–1.95 V | −40°C a +85°C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW 1-bit | `block0` | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1.7–1.95 V | −40°C a +85°C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW 8-bit | `block0` | 30 µA | 17 mA | 26 mA |

</div>

Antes de escribir el código de detección de Flash, consulte en cada hoja de datos la secuencia para leer el ID JEDEC/del fabricante. El número de bytes devueltos tras el opcode `0x9F` varía según el proveedor: algunos devuelven un ID de dispositivo de dos bytes (`DID1` y `DID2`), mientras que otros devuelven un solo byte. Estas diferencias pueden provocar errores de «Flash no reconocido» al poner en marcha una pieza de una segunda fuente nueva.

---

### Secuencias de lectura de ID de la fuente { #read-jedec-id-sequences }

La hoja registra los tres formatos de lectura de ID siguientes. `MID` identifica al fabricante; `DID`, `DID1` y `DID2` son campos de identificación del dispositivo. Son cadenas de la fuente, no transacciones ejecutables. Antes de implementar el controlador, confirme el opcode, la fase dummy o de dirección, el número de bytes devueltos y la temporización de selección de chip en la hoja de datos de la pieza exacta. Los ID hexadecimales de las tablas no representan siempre un único byte de ID de fabricante.

<div align="center"><em>Secuencias de lectura de ID SPI-NAND registradas en V0.3</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Componentes | Secuencia de la fuente |
|:---|:---|
| F35SQA512M, F35UQA512M, W25N01GW, W25N01GV, F35SQA001G, TC58CYG0S3HRAIJ | `9F+dummy(8bit)+MID+DID1+DID2` |
| DS35M12B, DS35Q12B, GD5F1GM7RE, GD5F1GM7UE, DS35M1GB, DS35Q1GB, FM25SL01 | `9F+dummy(8bit)+MID+DID` |
| HYF1GQ4IDACAE, HYF1GQ4UDACAE, XT26Q01D, XT26G01C, ZB35Q01A | `9F+00+MID+DID` |

</div>

---

## Flash SD-NAND { #sd-nand-flash }

V0.3 incluye cinco referencias SD-NAND cualificadas de 1 Gb con interfaz SD 2.0. Son candidatas para almacenamiento fijo al que se accede por una interfaz SD, sin una ranura física para tarjetas. Antes de seleccionarlas, confirme que el controlador SD del sistema y el controlador de software correspondiente sean compatibles con la referencia exacta y el diseño del producto.

<div align="center"><em>Componentes cualificados: Flash SD-NAND</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Rango de temperatura | Tensión | Interfaz | Reloj máx. | Corriente en espera | Corriente de funcionamiento |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30°C a +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 150 µA (typ) | 15 mA @50 MHz (typ) |
| XTSD01GLGEAG | XTX | −30°C a +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 200 µA (max) | 30 mA @50 MHz (max) |
| XSSD01GGAI | XSS | 0°C a +70°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 300 µA (max) | 45 mA @50 MHz (max) |
| MKDV1GCL-AB | MK | −25°C a +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 50 µA (max) | 28 mA @50 MHz (max) |
| XS26D01GACW | Icthink | −25°C a +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 250 µA (max) | 100 mA @50 MHz (max) |

</div>

XSSD01GGAI figura para 0°C a +70°C. Las otras cuatro referencias tienen límites inferiores de −25°C o −30°C y un límite superior de +85°C. Use los límites reales de cada fila, sin asumir un mismo grado de temperatura, y compruebe el margen necesario para el entorno del producto.

---

## Controlador LCD { #lcd-driver }

!!! warning "Controladores de pantalla incluidos en V0.3"
    V0.3 incluye un controlador LCD. El [libro de cálculo V0.3](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) es una versión fija, no un enlace a revisiones futuras. La ausencia de una referencia no implica falta de soporte; confírmela con SiFli antes de seleccionarla para producción. MIPI y QSPI son interfaces del controlador de pantalla, no necesariamente de todos los dispositivos SF32. Compruebe las interfaces y el soporte del controlador de software del chip elegido; consulte la [descripción general de gráficos](../../learn/graphics/overview.md) y la [arquitectura de la GPU ePicasso](../../learn/graphics/epicasso-gpu.md). La fuente indica `?MHz` para SDR, sin un valor concreto, y marca DDR como no soportado.

<div align="center"><em>Componentes cualificados: controladores LCD</em></div>

<div align="center" markdown>

| N.º de pieza cualificado | Proveedor | Resolución | Tipo | Tensión IO | Interfaz | GRAM | Profundidad de color | Velocidad máxima (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1.65–3.3 V | MIPI, QSPI | Sí | 16,7 M colores | Sin especificar / no soportado |

</div>

---

## Controlador de panel táctil { #touch-panel-controller }

V0.3 no contiene entradas de controladores táctiles. Esto no determina su estado de cualificación en revisiones posteriores ni significa que un dispositivo no esté soportado. Para una referencia propuesta, consulte al equipo FAE o comercial de SiFli sobre su cualificación y el soporte del controlador, e indique el código de pedido exacto y los requisitos del producto. Consulte la [información de contacto](../../about/index.md).

---

## Lista de comprobación para la revisión del diseño { #design-review-checklist }

Antes de cerrar el esquemático o la BOM, contraste cada componente AVL seleccionado con el diseño real del producto:

- [ ] El número de pieza, encapsulado, grado de temperatura y sufijo de pedido exactos coinciden con la fila aprobada o cuentan con una vía explícita de aprobación de ingeniería.
- [ ] El rango de tensión coincide con la línea de alimentación de E/S del SF32 o con las líneas de Flash, pantalla o convertidor de potencia utilizadas en la placa.
- [ ] El encapsulado, patrón de pads, altura y restricciones de montaje son compatibles con la biblioteca de PCB y el proceso de fabricación.
- [ ] Cuando corresponda, el firmware identifica correctamente el componente mediante el ID JEDEC/del fabricante o una comprobación equivalente en tiempo de ejecución.
- [ ] El arranque, la descarga, OTA, el sistema de archivos, la pantalla o el controlador táctil se han verificado con el componente exacto.
- [ ] La corriente de bajo consumo se ha medido en hardware real; no se ha copiado directamente de la AVL o de la hoja de datos.
- [ ] El desplazamiento de frecuencia del cristal, el comportamiento de CBANK_SEL y la calibración RF se han validado con la PCB, antena y carcasa finales.
- [ ] Los tiempos de borrado, programación y lectura de Flash se han probado en el rango previsto de tensión y temperatura del producto.
- [ ] Se ha identificado al menos un candidato de segunda fuente para cada componente crítico de la BOM, como cristales, inductores, Flash y paneles de pantalla.

Esta lista establece un nivel de exigencia superior a «el componente aparece en la AVL». La AVL reduce el abanico de opciones, pero la liberación del producto sigue requiriendo evidencias de validación en la placa.

## Lista de comprobación de abastecimiento { #sourcing-checklist }

- [ ] Compare el número de pieza y el sufijo de revisión con la AVL descargable vigente; las instantáneas de la hoja, incluida esta página, quedan desactualizadas al cualificarse nuevos lotes.
- [ ] En componentes Flash, confirme que el identificador de fabricante/JEDEC esperado por el código de puesta en marcha corresponde a la pieza exacta pedida, no solo a la familia. Algunas familias comparten nombre comercial, pero devuelven bytes de ID distintos.
- [ ] En NAND, SD-NAND y componentes que almacenen un sistema de archivos, verifique en hardware real el arranque, la herramienta de descarga, el flujo OTA y el comportamiento de FatFS/FlashDB/LittleFS. Que una pieza se lea correctamente durante la puesta en marcha no significa que OTA esté validado.
- [ ] Valide CBANK_SEL y el desplazamiento de frecuencia TX Ch39 indicado en su placa. La hoja de cálculo no especifica el diseño de referencia ni la configuración completa de medida; confirme el modo y las condiciones de ensayo antes de comparar resultados.
- [ ] Mida las corrientes en espera, en deep-power-down y durante la lectura en su placa. La AVL no establece la procedencia ni todas las condiciones de cada valor; compruebe la hoja de datos y las condiciones de medida.
- [ ] Confirme que el encapsulado y la huella coinciden con la biblioteca de PCB y las capacidades de montaje, además de cumplir las especificaciones eléctricas.
- [ ] Antes de incluir en la BOM una pieza aún no listada, cualifíquela según los requisitos de su clase de componente y considere compartir los datos de cualificación con SiFli.
- [ ] Busque una segunda fuente para cada componente con un único proveedor. V0.3 incluye un controlador LCD y ningún controlador táctil; confirme la disponibilidad y el soporte actuales sin considerar esta instantánea como el estado más reciente.
- [ ] Vuelva a revisar la lista antes de cada cierre importante de la BOM: es una instantánea, no una base de datos en tiempo real.

## Páginas relacionadas { #related-pages }

- [Guía de diseño de hardware del SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md): recomendaciones de esquemático y diseño que hacen referencia directa a varios componentes de esta lista.
- [Guía de diseño de hardware del SF32LB57x](../chip-guides/SF32LB57x_hardware_design_guide.md)
- [Descripción general de la familia SF32](../../sf32-products/family/SF32_family.md)
