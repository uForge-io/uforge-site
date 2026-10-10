---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Lista de comprobación de revisión del diseño, documentos y referencias relacionados, apéndices de esquemáticos/PCB/mecánica/alimentación e historial de revisiones de la guía de diseño de hardware SF32LB52x."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB52x — Lista de revisión del diseño y referencias { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página abarca las secciones 7–10: lista de revisión del diseño, documentos y referencias relacionados, apéndices e historial de revisiones. Vuelva a las [Pautas de diseño de PCB](SF32LB52x_pcb_layout.md).

## 7. Lista de revisión del diseño { #7-design-review-checklist }

- [ ] La revisión del sistema mínimo está completa: se han documentado la variante exacta, el encapsulado, el árbol de alimentación, el medio de arranque, los pines de configuración de arranque, el acceso de depuración y descarga, los relojes y la estrategia de reactivación
- [ ] Se han confirmado el modelo exacto del chip y la variante de alimentación; no se han mezclado los esquemáticos de alimentación de ambas variantes
- [ ] Los pines de alimentación del procesador (VBUS/VBAT/VCC o PVDD/VDDIOA/VDD_SIP) están dentro del rango de tensión de la hoja de datos
- [ ] El inductor BUCK cumple 4,7 uH ±20 %, DCR ≤0,4 Ω e Isat ≥450 mA
- [ ] Variante alimentada por batería: se han verificado la ruta de carga, el rango de tensión del dispositivo OVP y la capacitancia de salida del LDO integrado
- [ ] Los cristales de 48 MHz y 32,768 kHz cumplen las especificaciones recomendadas, y el trazado y las zonas de exclusión también satisfacen los requisitos
- [ ] La pista RF tiene una impedancia de 50 Ω y la red de adaptación está situada cerca del chip
- [ ] La configuración de arranque desde almacenamiento (incluida la opción eMMC de la variante alimentada mediante un regulador externo) coincide con los ajustes de los pines Bootstrap
- [ ] Se ha verificado que el pin de control del interruptor de alimentación del almacenamiento corresponde a la variante exacta; la discrepancia PA11/PA21 entre la lista de comprobación oficial y las notas de aplicación debe resolverse antes de publicar el diseño
- [ ] USB DP/DN se trazan como par diferencial con una impedancia diferencial de 90 Ω
- [ ] Las señales SDIO se trazan juntas, con una longitud total ≤50 mm, una diferencia de longitud dentro del grupo ≤6 mm y apantallamiento de masa
- [ ] Se han reservado los pines multiplexados DBG_UART/SWD y los puntos de prueba de producción
- [ ] Los números de pieza de los componentes clave se han contrastado con la [Lista de proveedores aprobados por SiFli][Lista de proveedores aprobados por SiFli (AVL)] más reciente

## 8. Documentos y referencias relacionados { #8-related-documents-and-references }

[Hoja de datos SF32LB52x (PDF oficial)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[Manual de usuario SF32LB52x (PDF oficial)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[Paquete de diseño de referencia de hardware SF32LB52]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[Nota de aplicación de hardware SF32LB520/3/5/7 (fuente)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[Nota de aplicación de hardware 52B/D/E/G/J (fuente)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Lista local de proveedores aprobados por SiFli]: ../cad-components/sifli-approved-vendor-list.md
[Lista de comprobación de esquemático y PCB SF32LB52 de SiFli (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[Índice de guías de diseño de hardware de chips de SiFli (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB52x (PDF oficial)]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB52x (PDF oficial)]__
- :fontawesome-solid-file-zipper: __[Paquete de diseño de referencia de hardware SF32LB52]__
- :fontawesome-brands-github: __[Nota de aplicación de hardware SF32LB520/3/5/7 (fuente)]__
- :fontawesome-brands-github: __[Nota de aplicación de hardware 52B/D/E/G/J (fuente)]__
- :fontawesome-solid-file-excel: __[Lista local de proveedores aprobados por SiFli]__
- :fontawesome-solid-file-excel: __[Lista de comprobación de esquemático y PCB SF32LB52 de SiFli (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[Índice de guías de diseño de hardware de chips de SiFli (Wiki)]__

</div>

Referencias adicionales:

- [Resumen de producto SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [Hoja de datos SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [Manual de referencia SF32LB52x](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [Nota de aplicación de hardware SF32LB520/3/5/7](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [Nota de aplicación de hardware 52B/D/E/G/J](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

La [lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) (sección 5.8) y la [lista de comprobación del diseño de PCB](SF32LB52x_pcb_layout_checklist.md) (sección 6.15) reproducen, punto por punto, la misma *Lista de comprobación de esquemático y PCB SF32LB52* (V1.0, 2026-01-21), junto con las pautas de esquemático y diseño de PCB que deben verificar.

## 9. Apéndices { #9-appendices }

Las notas de aplicación originales de SiFli incluyen las siguientes figuras de referencia de esquemáticos, diseño de PCB, mecánica y alimentación. Estos apéndices conservan las figuras de origen como evidencias de revisión; las secciones 5 y 6 siguen siendo las pautas principales de diseño.

!!! note "Cómo usar estas figuras"
    Considere estas figuras como ejemplos de circuitos y trazado de las notas de aplicación originales. Confirme la implementación final para el dispositivo y el producto exactos mediante el texto de los requisitos, las tablas, la hoja de datos, el manual de referencia, el paquete de diseño de referencia más reciente y la AVL.

<div align="center"><em>Tabla 9-1: índice de apéndices</em></div>

<div align="center" markdown>

| Necesidad | Punto de partida |
|:---|:---|
| Ejemplos de diagramas de bloques de relojes inteligentes para ambos grupos de diseño SF32LB52x | Apéndice A: ejemplo de aplicación de un reloj inteligente |
| Ejemplos de esquemas para RF, almacenamiento y arranque, botones, motor, audio, reloj, USB y DC/DC | Apéndice B: esquemáticos de referencia |
| Ejemplos de colocación y trazado de PCB para RF, almacenamiento, audio, apilado, fanout, reloj, USB y DC/DC | Apéndice C: diseños de referencia de PCB |
| Planos del contorno, la forma y el patrón de pads del encapsulado | Apéndice D: mecánica |
| Esquemas y diseños de referencia para carga, OVP, arquitectura de alimentación y PMU | Apéndice E: alimentación |

</div>

### 9.1. Apéndice A. Ejemplo de aplicación de un reloj inteligente { #appendix-a-a-typical-smart-watch-application }

Un diseño habitual de reloj inteligente basado en SF32LB52x incluye el MCU, pantalla, controlador táctil, almacenamiento, sensores, motor de vibración, entrada/salida de audio, antena Bluetooth, fuentes de reloj, gestión de alimentación e interfaces de depuración y de prueba en producción. El diseño alimentado por batería incluye además la gestión de carga.
Las figuras 9.1-1 y 9.1-2 muestran una pantalla QSPI, acelerómetro/giroscopio por SPI, módulo de frecuencia cardíaca por I2C, micrófono analógico y ruta DAC-amplificador, motor de vibración controlado por PWM, reloj de 48 MHz, ruta RF Bluetooth y acceso SWD/UART. QSPI NAND, SD NAND y NOR Flash son ejemplos de almacenamiento, no una lista exhaustiva de medios de arranque. Ambos diagramas muestran un cargador externo y una ruta Buck/LDO; elija la arquitectura de alimentación según el apartado 5.2, sin interpretar el diagrama como un circuito obligatorio.


![Figura 9.1-1: Diagrama de aplicación de reloj inteligente SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Figura 9.1-1: Diagrama de aplicación de reloj inteligente SF32LB520/3/5/7</em></div>

![Figura 9.1-2: Diagrama de aplicación de reloj inteligente 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Figura 9.1-2: Diagrama de aplicación de reloj inteligente 52B/D/E/G/J</em></div>

### 9.2. Apéndice B. Esquemáticos de referencia { #appendix-b-reference-schematics }

**RF**

![Figura 9.2-1: Diagrama de bloques del front-end de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-1: Diagrama de bloques del front-end de RF</em></div>

![Figura 9.2-2: Esquemático de referencia RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-2: Esquemático de referencia RF</em></div>

![Figura 9.2-3: Referencia de conexión del circuito RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-3: Referencia de conexión del circuito RF</em></div>

**Almacenamiento y arranque**

![Figura 9.2-4: Referencia de bootstrap SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-4: Referencia de bootstrap SF32LB520/3/5/7</em></div>

![Figura 9.2-5: Referencia de bootstrap 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-5: Referencia de bootstrap 52B/D/E/G/J</em></div>

![Figura 9.2-6: Esquemático de referencia SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-6: Esquemático de referencia SDIO</em></div>

**Botones, motor y audio**

![Figura 9.2-7: Referencia del motor de vibración SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-7: Referencia del motor de vibración SF32LB520/3/5/7</em></div>

![Figura 9.2-8: Referencia del motor de vibración 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-8: Referencia del motor de vibración 52B/D/E/G/J</em></div>

![Figura 9.2-9: Referencia del botón de encendido](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-9: Referencia del botón de encendido</em></div>

![Figura 9.2-10: Referencia del botón del codificador rotatorio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-10: Referencia del botón del codificador rotatorio</em></div>

![Figura 9.2-11: Referencia de micrófono MEMS analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-11: Referencia de micrófono MEMS analógico</em></div>

![Figura 9.2-12: Referencia de micrófono ECM analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-12: Referencia de micrófono ECM analógico</em></div>

![Figura 9.2-13: Referencia de DAC analógico a PA](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-13: Referencia de DAC analógico a PA</em></div>

![Figura 9.2-14: Esquemático de referencia de alimentación de audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-14: Esquemático de referencia de alimentación de audio</em></div>

![Figura 9.2-15: Esquemático de referencia de ADC de audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-15: Esquemático de referencia de ADC de audio</em></div>

![Figura 9.2-16: Esquemático de referencia de DAC de audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-16: Esquemático de referencia de DAC de audio</em></div>

**Reloj**

![Figura 9.2-17: Esquemático del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-17: Esquemático del cristal de 48 MHz</em></div>

![Figura 9.2-18: Esquemático del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-18: Esquemático del cristal de 32,768 kHz</em></div>

**USB**

![Figura 9.2-19: Esquemático de referencia USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-19: Esquemático de referencia USB</em></div>

**DC/DC**

![Figura 9.2-20: Esquemático de referencia DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-20: Esquemático de referencia DC/DC</em></div>

### 9.3. Apéndice C. Diseños de referencia de PCB { #appendix-c-reference-pcb-layouts }

**RF**

![Figura 9.3-1: Referencia de adaptación RF en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-1: Referencia de adaptación RF en PCB</em></div>

![Figura 9.3-2: Referencia de trazado RF en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-2: Referencia de trazado RF en PCB</em></div>

**Almacenamiento**

![Figura 9.3-3: Referencia de PCB SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-3: Referencia de PCB SDIO</em></div>

**Audio**

![Figura 9.3-4: Referencia de alimentación de audio en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-4: Referencia de alimentación de audio en PCB</em></div>

![Figura 9.3-5: Referencia de ADC de audio en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-5: Referencia de ADC de audio en PCB</em></div>

![Figura 9.3-6: Referencia de DAC de audio en PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-6: Referencia de DAC de audio en PCB</em></div>

**Estructura de PCB**

![Figura 9.3-7: Referencia de apilado de PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-7: Referencia de apilado de PCB</em></div>

![Figura 9.3-8: Referencia de reglas de diseño de PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-8: Referencia de reglas de diseño de PCB</em></div>

![Figura 9.3-9: Referencia de fanout QFN](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-9: Referencia de fanout QFN</em></div>

![Figura 9.3-10: Referencia de colocación del cristal](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-10: Referencia de colocación del cristal</em></div>

**Trazado de reloj**

![Figura 9.3-11: Modelo de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-11: Modelo de trazado del cristal de 48 MHz</em></div>

![Figura 9.3-12: Referencia de trazado del cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-12: Referencia de trazado del cristal de 48 MHz</em></div>

![Figura 9.3-13: Modelo de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-13: Modelo de trazado del cristal de 32,768 kHz</em></div>

![Figura 9.3-14: Referencia de trazado del cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-14: Referencia de trazado del cristal de 32,768 kHz</em></div>

**USB**

![Figura 9.3-15: Referencia de PCB USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-15: Referencia de PCB USB</em></div>

![Figura 9.3-16: Referencia de diseño USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-16: Referencia de diseño USB</em></div>

![Figura 9.3-17: Referencia de trazado USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-17: Referencia de trazado USB</em></div>

**DC/DC**

![Figura 9.3-18: Referencia de PCB DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-18: Referencia de PCB DC/DC</em></div>

### 9.4. Apéndice D. Mecánica { #appendix-d-mechanical }

![Figura 9.4-1: Diseño del encapsulado SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-1: Diseño del encapsulado SF32LB520/3/5/7</em></div>

![Figura 9.4-2: Diseño del encapsulado 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-2: Diseño del encapsulado 52B/D/E/G/J</em></div>

![Figura 9.4-3: Dimensiones del encapsulado QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-3: Dimensiones del encapsulado QFN68L</em></div>

![Figura 9.4-4: Forma del encapsulado QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-4: Forma del encapsulado QFN68L</em></div>

![Figura 9.4-5: Patrón de pads recomendado para QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-5: Patrón de pads recomendado para QFN68L</em></div>

### 9.5. Apéndice E. Alimentación { #appendix-e-power }

**SF32LB520/3/5/7 (alimentado por batería)**

Las figuras siguientes muestran circuitos de carga externos con y sin gestión de la ruta de alimentación (PPM), seguidos del circuito de carga integrado.

![Figura 9.5-1: Circuito de carga externo sin PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-1: Circuito de carga externo sin gestión de la ruta de alimentación (PPM)</em></div>

![Figura 9.5-2: Circuito de carga externo con PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-2: Circuito de carga externo con gestión de la ruta de alimentación (PPM)</em></div>

![Figura 9.5-3: Circuito de carga integrado](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-3: Circuito de carga integrado</em></div>

![Figura 9.5-4: Configuración del umbral OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-4: Configuración del umbral OVP</em></div>

![Figura 9.5-5: Aplicación OVP con OVLO ajustable](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-5: Aplicación OVP con OVLO ajustable</em></div>

![Figura 9.5-6: Aplicación OVP con salida regulada](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-6: Aplicación OVP con salida regulada</em></div>

![Figura 9.5-7: Estructura de alimentación SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-7: Estructura de alimentación SF32LB520/3/5/7</em></div>

![Figura 9.5-8: Esquemático de referencia VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-8: Esquemático de referencia VCC</em></div>

![Figura 9.5-9: Referencia de PCB VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-9: Referencia de PCB VCC</em></div>

![Figura 9.5-10: Esquemático de referencia de carga](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-10: Esquemático de referencia de carga</em></div>

![Figura 9.5-11: Referencia de PCB de carga](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-11: Referencia de PCB de carga</em></div>

![Figura 9.5-12: Referencia de TVS de PMU](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-12: Referencia de TVS de PMU</em></div>

![Figura 9.5-13: Referencia de EOS de PMU](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-13: Referencia de EOS de PMU</em></div>

**52B/D/E/G/J (alimentación con regulador externo)**

![Figura 9.5-14: Referencia de PCB de PMU 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-14: Referencia de PCB de PMU 52B/D/E/G/J</em></div>

## 10. Historial de revisiones { #10-revision-history }

<div align="center"><em>Tabla 10-1: historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Nota |
|:---|:---|:---|
| 1.1 | 2026-07 | El sistema de alimentación pasó a ser una sección independiente, al mismo nivel que las demás secciones del diseño del esquemático; la generación de reloj y RF se separaron en secciones distintas y se renumeraron las secciones esquemáticas posteriores. |
| 1.0 | Este documento | Se combinaron las dos notas oficiales de aplicación de hardware en una sola guía, con pestañas para separar el contenido de las variantes alimentadas por batería y mediante un regulador externo |
| 0.0.1 | 10/2024 | Publicación inicial de `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Publicación inicial de `SF32LB52B-E-G-J-HW-Application` |

</div>

### 10.1. Historial de revisiones de la lista de comprobación { #101-checklist-revision-history }

Las listas detalladas de comprobación del [esquemático](SF32LB52x_schematic_checklist.md) y del [diseño de PCB](SF32LB52x_pcb_layout_checklist.md) tienen su propio historial de versiones, independiente del de la guía. Siguen las versiones de la hoja de cálculo *Lista de comprobación de esquemático y PCB SF32LB52* de SiFli.

<div align="center"><em>Tabla 10.1-1: historial de revisiones de la lista de comprobación</em></div>

<div align="center" markdown>

| Versión | Fecha | Nota |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Publicación inicial basada en la *Lista de comprobación de esquemático y PCB SF32LB52* V1.0 de SiFli |

</div>

[Lista de proveedores aprobados por SiFli]: ../cad-components/sifli-approved-vendor-list.md
[Lista de proveedores aprobados por SiFli (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
