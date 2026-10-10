---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Lista de comprobación para la revisión del diseño, documentos y referencias, apéndices e historial de revisiones de la guía de diseño de hardware SF32LB55x."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB55x: lista de comprobación para la revisión del diseño y referencias { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. Lista de comprobación para la revisión del diseño { #7-design-review-checklist }

- [ ] Se han confirmado el encapsulado exacto, la asignación de pines, el patrón de pads y el proceso de fabricación de la PCB.
- [ ] Todas las líneas de alimentación del PMU y las auxiliares cumplen los límites de tensión y corriente especificados en la hoja de datos.
- [ ] Los condensadores de desacoplo necesarios están colocados cerca de los pines.
- [ ] Se han verificado la temporización de POR/BOR/reset y el modo de arranque.
- [ ] Los cristales de 48 MHz y 32,768 kHz cumplen los requisitos de CL, ppm, ESR, colocación y trazado.
- [ ] Se han revisado la adaptación de RF, la antena y la zona de exclusión de masa.
- [ ] Los grupos de pines de memoria externa y pantalla corresponden al encapsulado elegido.
- [ ] Los circuitos de activación, GPADC, sensores, audio, táctil, retroiluminación y motor cumplen los requisitos de bajo consumo.
- [ ] Se han reservado accesos para depuración, descarga, programación en producción, pruebas de RF y calibración del cristal.

## 8. Documentos y referencias relacionados { #8-related-documents-and-references }

Consulte la documentación oficial más reciente para verificar los límites eléctricos, los datos del encapsulado, la multiplexación de pines, la configuración del software, la cualificación de componentes y las restricciones de fabricación.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB55x]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice de guías de diseño de hardware de chips SiFli (Wiki)]__

</div>

La [lista de comprobación del esquema](SF32LB55x_schematic_checklist.md) (sección 5.8) y la sección 6.4 de las [directrices de diseño de PCB](SF32LB55x_pcb_layout.md) reproducen punto por punto la misma *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto con las pautas de diseño del esquema y de la PCB que verifica.

[Nota de aplicación de hardware SF32LB55x]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Lista de proveedores aprobados de SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Índice de guías de diseño de hardware de chips SiFli (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apéndices { #9-appendices }

### 9.1. Apéndice A. Producto típico SF32LB55x { #appendix-a-a-typical-sf32lb55x-product }

Un producto SF32LB55x típico incluye el MCU, el árbol de alimentación, los cristales, la red de adaptación de RF y la antena, la memoria externa, la pantalla y el controlador táctil, los sensores, las entradas GPADC, un motor de vibración, audio Bluetooth opcional y puntos de acceso para depuración y pruebas de producción. En los diseños alimentados por batería también deben revisarse las corrientes de fuga en modo de bajo consumo y planificarse el acceso de los útiles de prueba a la placa.

### 9.2. Preguntas de diseño { #91-design-qa }

1. **¿Por qué algunos GPIO presentan estados predeterminados distintos de los indicados en la especificación al arrancar con Mode = 1?** El modo de descarga cambia el estado de los GPIO relacionados con la memoria Flash externa en QSPI2 y QSPI3.
2. **¿Por qué puede vibrar inesperadamente un motor SMD durante la programación?** Puede activarse por error la alimentación o la señal PWM. Si el motor arranca con nivel alto, un GPIO con pull-up (PU) predeterminado puede alimentarlo; SiFli recomienda usar GPIO17 o GPIO39 con pull-down (PD) predeterminado para PWM.
3. **¿Por qué puede bloquearse el chip al soldar la batería y cómo evitarlo?** Una mala conexión a tierra del soldador puede provocar una sobretensión transitoria. Añada protección contra sobretensiones y ESD en la interfaz de batería y conecte correctamente a tierra el soldador.
4. **¿Por qué un botón de activación no despierta el MCU en Hibernate?** Solo las seis entradas de activación del LCPU, GPIO43–GPIO48, pueden despertar el MCU desde Hibernate; GPIO0–GPIO3 del HCPU no sirven para ello.
5. **¿Por qué un sensor G o de frecuencia cardíaca puede consumir demasiado o funcionar mal durante la depuración de bajo consumo?** Su firmware se ejecuta en el LCPU, por lo que las señales I2C, SPI, de control y de interrupción deben usar interfaces del LCPU. Asignarlas al HCPU puede aumentar el consumo o provocar fallos.
6. **¿Por qué sigue elevado el consumo del sensor aunque todas las señales estén conectadas a interfaces del LCPU?** Apagar solo la alimentación del sensor no basta si siguen activas las alimentaciones de pull-up de I2C o de interrupción. Apague también esas alimentaciones de pull-up.
7. **¿Por qué puede aumentar la corriente en modo de reposo si GPIO26 y GPIO27 controlan salidas?** En modo de reposo, mantenga ambos GPIO al mismo nivel o deje al menos uno en alta impedancia, sin pull-up ni pull-down.
8. **¿Cómo investigar un consumo elevado de SS6600 en Hibernate?** Mantenga estables en nivel alto o bajo las diez entradas de activación: GPIO0–GPIO3 del HCPU y GPIO43–GPIO48 del LCPU. Si las diez tienen pull-up, alimente los pull-up con una fuente de 3,3 V siempre activa.
9. **¿Puede la corriente quiescente de los componentes explicar un consumo excesivo en bajo consumo?** Sí. Los BUCK, LDO y load switches con Iq elevado aumentan el consumo; SiFli recomienda componentes con Iq inferior a 1 µA.
10. **¿Cómo evitar artefactos en la pantalla durante las pruebas ESD?** Añada protección ESD a VDD, SCL, SDA, RESET e INT del panel táctil, así como a la alimentación y RESET de la pantalla LCD.
11. **¿Cómo evitar fallos en la visualización siempre activa?** Esta función se usa principalmente con paneles AMOLED, que consumen menos energía que los paneles TFT. Se recomiendan GPIO PB para LCD_EN, LCD_RST y otras señales de control. Si un GPIO PA controla una habilitación activa en alto, debe tener pull-up (PU) predeterminado; con un GPIO PA con pull-down (PD), la pantalla puede quedar apagada anormalmente durante más de 10 ms tras reanudar.
12. **¿Cómo evitar fallos de encendido del audio Bluetooth externo al reanudar si debe seguir alimentado en modo de reposo?** Controle su alimentación con un GPIO del LCPU. Si el interruptor se activa en bajo, elija un GPIO del LCPU con pull-down (PD) predeterminado.
13. **¿Cómo garantizar la carga después de una sobredescarga de la batería?** Cuando la tensión de batería es muy baja, la gestión de ruta de alimentación debe permitir que la entrada del cargador alimente el sistema al conectarlo. Sin esa gestión, el cargador elegido debe proporcionar una corriente de precarga de al menos 40 mA.
14. **¿Por qué puede no iniciarse la carga al conectar el cargador?** La señal de detección de conexión debe ir a uno de los GPIO de activación del LCPU, GPIO43–GPIO48. Otro GPIO puede impedir que se inicie correctamente la secuencia de carga.
15. **¿Cómo evitar un consumo excesivo con MODE alto en modo de descarga?** Para periféricos de alto consumo, como un PA de audio con habilitación activa en alto, use un GPIO con pull-down (PD) predeterminado; no use uno con pull-up (PU). El modo de descarga podría activar el periférico y afectar la programación.
16. **¿Por qué puede fallar la programación con MODE alto y cómo tratar una interrupción de sensor en GPIO46?** En modo de descarga, GPIO46 pasa a ser UART3_RX y puede interferir con la programación. Cambie la interrupción del sensor a GPIO43, GPIO44, GPIO47 o GPIO48. Si hacen falta más entradas de activación del LCPU, conecte un botón externo a GPIO45 o GPIO46 mediante una resistencia de 0 Ω.
17. **¿Qué hacer si los algoritmos del sensor G y de frecuencia cardíaca superan la memoria disponible?** Compruebe si la memoria asignada al LCPU es suficiente. Si no lo es, añada Flash NOR externa en QSPI4.

## 10. Historial de revisiones { #10-revision-history }

<div align="center"><em>Tabla 10-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Notas |
|:---|:---|:---|
| 0.1 | 2026-07 | Primera edición de la guía de diseño de hardware SF32LB55x, basada en la nota oficial de aplicación de hardware publicada por SiFli en la wiki. |

</div>

### 10.1. Historial de revisiones de la lista de comprobación { #101-checklist-revision-history }

La lista punto por punto de la [lista de comprobación del esquema](SF32LB55x_schematic_checklist.md) y de la sección 6.4 de las [directrices de diseño de PCB](SF32LB55x_pcb_layout.md) se versiona por separado de la guía, de acuerdo con el libro de trabajo *SF32LB55x Schematic & PCB Checklist* publicado por SiFli.

<div align="center"><em>Tabla 10.1-1: Historial de revisiones de la lista de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de la versión |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primera publicación de la lista de comprobación del esquema y la PCB |

</div>
