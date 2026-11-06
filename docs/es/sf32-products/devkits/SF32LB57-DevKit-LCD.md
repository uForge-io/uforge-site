---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD: placa modular para evaluar pantallas RGB, cámaras DVP, dos micrófonos PDM, altavoz, Wi-Fi SDIO y USB."
tags:
    - Hardware
    - Placa de desarrollo
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## Descripción general { #overview }

SF32LB57-DevKit-LCD es una placa de evaluación multimedia basada en **SF32LB57-MOD-WD**. El nombre parece indicar que SiFli lo contempla como un producto de módulo. **WD** podría significar **Wi-Fi Dual-band** (Wi-Fi de doble banda), pero esta interpretación no está confirmada oficialmente. La placa combina la MCU SF32LB57x con Wi-Fi por SDIO, Flash de arranque y conexiones para periféricos. Permite desarrollar HMI inteligentes, terminales con cámara, intercomunicadores y pantallas conectadas, y validar gráficos, captura, audio y conectividad antes de diseñar una placa portadora.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — Vista frontal" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vista frontal</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — Vista posterior" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vista posterior</figcaption></figure>
</div>

## Recursos de la placa { #board-resources }

La fuente describe dos núcleos STAR-MC1 de alto rendimiento a 240 MHz, con un rendimiento conjunto de 1968 CoreMark, y 592 KB de SRAM con retención (512 KB HPSYS + 80 KB LPSYS). Consulte [SF32LB57x](../chips/SF32LB57x.md) para conocer la arquitectura multinúcleo completa. El módulo incorpora Flash QSPI-NOR de arranque, OPI-PSRAM según la variante, un cristal de 48 MHz para la MCU y otro de 40 MHz para Wi-Fi. Compruebe el marcado del módulo antes de elegir la configuración de memoria.

La fuente especifica una variante SF32LB57x de 3,3 V y semiorificios metalizados para montar el módulo en una placa portadora. La OPI-PSRAM es opcional y depende de la referencia exacta del módulo; no se instala en todas las configuraciones.

<div align="center"><em>Recursos de la placa</em></div>

<div align="center" markdown>

| Componente / Conector | Implementación |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM (opcional); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0,5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0,5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2,54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFli identifica el dispositivo Wi-Fi como AIC8800D40LS-N y en algunos puntos lo describe como un módulo combinado de Wi-Fi y Bluetooth. Distíngalo del Bluetooth propio de la MCU SF32; verifique el componente instalado, el conmutador RF y los controladores del SDK, sin suponer que haya una segunda ruta Bluetooth utilizable. La placa dispone de un conector de antena IPEX-1 y de controles de alimentación, activación y conmutación de la antena Wi-Fi.

![Diagrama de bloques](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>Diagrama de bloques</em></div>

El diagrama original resume funciones, no es una referencia de cableado. Muestra las líneas TF D0–D3 y sitúa WS2812B bajo el expansor de E/S, mientras que el texto especifica SDIO TF de 1 bit y control directo desde la MCU por PA_11/PA_08 según la revisión. Confirme estas conexiones en el esquemático y la configuración de pines del SDK correspondientes.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — Componentes del anverso" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Componentes del anverso</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — Componentes del reverso" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Componentes del reverso</figcaption></figure>
</div>

## Puesta en marcha inicial { #getting-started }

Para validar la pantalla, prepare la placa, un panel DPI-RGB compatible de 40 pines / 0,5 mm, un cable USB con capacidad de datos y un ordenador con Windows, Linux o macOS. Opcionalmente, puede usar una antena IPEX-1, una cámara DVP, una tarjeta MicroSD/TF, un altavoz de 8 Ω y J-Link o DAP-Link. Para obtener registros UART y probar simultáneamente el USB nativo, necesitará dos cables de datos.

1. Sin alimentación, compruebe el pin 1 del FPC, la orientación de los contactos y la tensión del panel; conéctelo a FPC1. Instale la antena antes de las pruebas inalámbricas.
2. Conecte el puerto Type-C USB-to-UART, no el USB nativo, y seleccione su puerto COM en SifliTrace o Impeller.
3. Para programar, coloque el puente BOOT MODE J1 antes de alimentar o reiniciar. Retire J1 y reinicie para arrancar normalmente y obtener registros serie.
4. Valide primero hello-world por serie; después, una pantalla con un color uniforme y el táctil, si está disponible. Añada la cámara, el audio, el almacenamiento y la radio de uno en uno antes de probar su coexistencia.

Una placa con firmware de fábrica puede mostrar su interfaz inicial al encenderse, según el firmware y el panel. Una pantalla en negro no demuestra por sí sola un fallo de programación. Consulte [Primeros pasos con SiFli-SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) para configurar las herramientas, el entorno y la programación.

## Configuración del SDK { #sdk-build-targets }

La guía de SiFli indica que se instale SiFli SDK y se seleccione el paquete de soporte de placa `SF32LB57-DevKit-LCD`. El archivo `build_config_gcc.yaml` del repositorio upstream, enlazado actualmente, no enumera ningún destino de compilación SF32LB57. Antes de compilar, confirme el paquete de soporte y el identificador exacto en la copia del SDK que vaya a utilizar; no sustituya el destino por el de otra placa. Un hello-world por UART solo verifica el arranque serie básico, no los controladores de pantalla, cámara o Wi-Fi.

## Alimentación y depuración { #power-and-debug }

Cualquiera de los conectores Type-C admite alimentación de 5 V. U4 (ETA3425D2G) genera `VDD_3V3`; U7 (ETA3425D2G) genera `WF_3V3`, habilitada de forma independiente mediante `IOEX_WF_PWREN`. El puente USB-to-UART es CH343P; el otro conector expone USB 2.0 FS en `PA35`/`PA36`. Para SWD, utilice `PA_43` (SWCLK), `PA_44` (SWDIO), referencia de tensión de destino de 3,3 V y GND común. No conecte una salida de 5 V del depurador a un pin de 3,3 V.

El diagrama SWD identifica los pines 17, 18, 19 y 20 de J3 como 3,3 V, SWCLK, SWDIO y GND, respectivamente. Son números del conector de la placa, no del adaptador del depurador; conecte ambos lados por nombre de señal.

![Conexión SWD](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>Conexión SWD</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptador J-Link" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptador J-Link</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptador SWD" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptador SWD</figcaption></figure>
</div>

## Pantalla y cámara { #display-and-camera }

FPC1 es un conector `FPC-05FB-40PH20` de 40 pines / 0,5 mm con el orden RGB de ALIENTEK. RGB888 es el modo predeterminado; RGB565/RGB666 pueden liberar pines si el panel y el firmware lo permiten. Con el adaptador, la alimentación y el firmware adecuados, FreeIO también permite asignar a este conector las interfaces QSPI, MCU8080, EPD y JDI. No son conexiones DSI nativas.

La fuente exige un módulo basado en QFN80 o BGA112 para RGB888 de 24 bits completos y describe ePicasso 3.0 como acelerador gráfico 2D/2.5D. El pin 1 de FPC1 lleva 5 V para la retroiluminación o el circuito elevador del controlador de pantalla; no es una GPIO de 3,3 V. Los pines 3 y 5 de J3 comparten el bus I2C de configuración de cámara/táctil en PA_23/PA_22.

!!! warning
    La fuente indica un límite de procesamiento ePicasso 3.0 de 2048 × 2048 y también afirma una actualización de 60 fps a pantalla completa; más adelante hace depender la resolución y la frecuencia de refresco del panel. No lo interprete como una garantía de 2048 × 2048 a 60 fps: verifique la temporización de LCDC, la interfaz del panel, los búferes de imagen, el ancho de banda de memoria y la carga medida. Los pines 37–40 de FPC1 siguen sin resolver: se proponen cinco señales de control para cuatro contactos. Consulte `57x LCD-DevKit ioconfig-08192026.xlsx` y el esquemático correspondiente antes de conectar un panel.

![Conexión del panel RGB](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Conexión del panel RGB</em></div>

FPC4 es un conector DCMI DVP de 24 pines / 0,5 mm. La fuente enumera GC032A, OV2640, OV5640 y OV3660; OV2640/OV5640 son la configuración predeterminada. Otros módulos pueden exigir cambios de alimentación según las notas del esquemático. Las fuentes de cámara incluyen `DVDD_1V5`, `DVDD_2V8` y `AVDD_2V8`: respete los requisitos del sensor, no solo el conector. Las líneas DVP comparten pines, seleccionados por puentes, con Wi-Fi SDIO o la tarjeta TF. La configuración predeterminada no permite utilizar simultáneamente las funciones en conflicto.

Las tres líneas de alimentación de la cámara utilizan LDO independientes. La imagen frontal anotada indica 22P, pero el texto y la tabla FPC4 especifican 24 pines. Utilice la tabla de 24 pines como referencia documental y compruebe el conector real y el esquemático antes de conectar la cámara. La asignación de reinicio del pin 6 de FPC4 (IOEX_DVP_PDN/RESET) también es ambigua; confirme el cableado sin suponer controles independientes de reinicio y apagado.

![Conexión de cámara](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Conexión de cámara</em></div>

## Pines compartidos y revisiones { #shared-pins-and-revisions }

- `PA35`/`PA36` aparecen en FPC1 y en USB FS nativo: no use a la vez las conexiones de pantalla en conflicto y la función USB de dispositivo.
- SWD en `PA_43`/`PA_44` comparte pines con pantalla/cámara. Conserve una ruta de recuperación de depuración.
- WS2812B utiliza `PA_11` en V1.0 y `PA_08` en V1.1. La fuente también asigna `PA_11` a `BL_PWM`; resuelva el conflicto antes de controlar el LED o la retroiluminación.
- J3 coincide con las posiciones de alimentación/GND de Raspberry Pi de 40 pines, pero no garantiza su entorno de software ni compatibilidad universal con HAT. Revise tensión, pinmux y señales compartidas antes de conectar expansiones.

## Audio, botones y expansión de E/S { #audio-controls-and-io-expansion }

La fuente describe reproducción mediante DAC de 24 bits y el amplificador mono Class-D U8 (NS4150B), conectado a J7 (`MX1.25-2P`), para un altavoz de 8 Ω. Los dos micrófonos PDM son MSM261DGT007 o el LMD4020T261-AC23, compatible en pines. `PA_56` es el reloj PDM y `PA_55`, los datos; `IOEX_PDM_PWREN` controla su alimentación e `IOEX_AU_PA_EN` habilita el amplificador. Compruebe el formato, la ganancia y los límites del altavoz antes de integrarlos en un producto.

S1–S3 comparten `PA_34` / `GPADC_CH6`, con tensiones nominales de tecla de 2,97 V, 2,58 V y 2,19 V en la fuente. S4 es `KEY_RSTN`, activo en bajo. U11 (AW9523BTOR) proporciona 16 E/S por I2C en `PA_22` (SCL) y `PA_23` (SDA). La tabla conserva los estados iniciales de la fuente; verifique el reinicio y la inicialización del firmware en su placa. La tabla original no especifica P0_2/P0_3.

<div align="center"><em>Estados iniciales del expansor de E/S</em></div>

<div align="center" markdown>

| Puerto | Señal / Etiqueta | Estado inicial | Dirección | Función |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3,3 V | Salida | Conmutación de antena de 2,4 GHz |
| P1_1 | IOEX_LED_R | 3,3 V | Salida | LED rojo |
| P1_2 | IOEX_LED_G | 3,3 V | Salida | LED verde |
| P1_3 | IOEX_LED_B | 3,3 V | Salida | LED azul |
| P1_4 | IOEX_WF_PWRKEY | 0 V | Salida | Tecla de alimentación del módulo Wi-Fi |
| P1_5 | IOEX_WF_PWREN | 0 V | Salida | Habilitación del convertidor reductor Wi-Fi de 3,3 V |
| P1_6 | IOEX_CTP_RST | 0 V | Salida | Reinicio del controlador táctil |
| P1_7 | IOEX_LCD_RESET | 0 V | Salida | Reinicio LCD |
| P0_0 | IOEX_USB_DET | Hi-Z | Entrada | Detección de conexión USB |
| P0_1 | IOEX_TF_DET | Hi-Z | Entrada | Detección de inserción de tarjeta TF |
| P0_4 | IOEX_PDM_PWREN | 0 V | Salida | Habilitación de alimentación de micrófonos PDM |
| P0_5 | IOEX_AU_PA_EN | 0 V | Salida | Habilitación del amplificador de audio |
| P0_6 | IOEX_DVP_PDN | 0 V | Salida | Apagado de la cámara |
| P0_7 | IOEX_HST_WAK_WF | 0 V | Salida | Activación de Wi-Fi desde el host |

</div>

## Referencia de conectores { #connector-reference }

!!! warning
    Estas tablas transcriben las asignaciones de la fuente y no sustituyen al esquemático. El resumen del módulo está incompleto (`58~?`) y presenta `PA_00`/`PA_01` como USB_DP/USB_DM, en conflicto con la asignación explícita de USB nativo en `PA35`/`PA36`. Algunas filas de la fuente agrupan rangos de pads del módulo, rangos de GPIO y funciones alternativas sin especificar la función de cada pad; esta página conserva esos grupos y no infiere asignaciones individuales. Distinga el número de pad del módulo del GPIO de la MCU. No use las filas pendientes de aclaración para diseñar una PCB.

<div align="center"><em>Pads del módulo: entradas pendientes conservadas</em></div>

<div align="center" markdown>

| Pin | Señal / Etiqueta | Función |
|:---|:---|:---|
| 1 | GND | Masa |
| 2 | VDD_3V3 · 3,3 V | Entrada de alimentación de 3,3 V |
| 3 | VDD_1V8 · 1,8 V LDO | Salida de 1,8 V del LDO interno |
| 4 | RSTN | Reinicio; conectado al pulsador de reinicio |
| 5~22 | PA_41 ~ PA_24 | Multiplexación GPIO / LCDC / SPI / SD / depuración |
| 23~36 | PA_23 ~ PA_10 | Multiplexación GPIO / I2C / SD / USB / audio / depuración |
| 37 | DAC1P | Salida diferencial DAC P |
| 38 | DAC1N | Salida diferencial DAC N |
| 39 | MICBIAS_PA56 / PDM_CLK | Polarización de micrófono / reloj PDM |
| 40 | ADC1P_PA55 / PDM_DAT | Entrada P del ADC de audio / datos PDM |
| 41 | GND | Masa |
| 42 | PA_00 / USB_DP | GPIO / USB_DP (conflicto en la fuente; véase la advertencia) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM (conflicto en la fuente; véase la advertencia) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / táctil / detección USB |
| 54 | GND | Masa |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | Datos superiores DPI-RGB / PDM / activación Wi-Fi; disponibilidad según el encapsulado del módulo |

</div>

<div align="center"><em>J3: conector de expansión de 40 pines</em></div>

<div align="center" markdown>

| Pin | Señal / Etiqueta | Conexión / Función |
|:---|:---|:---|
| 1 | 3V3 | 3,3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3,3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1: conector de pantalla RGB</em></div>

<div align="center" markdown>

| Pin | Señal / Etiqueta |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | Señales de control: verificar asignación: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4: conector de cámara DVP</em></div>

<div align="center" markdown>

| Pin | Señal / Etiqueta |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2,8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2,8 V |
| 23 | NC |
| 24 | GND |

</div>

## Fuentes y siguientes pasos { #related-documents }

Para una placa propia, consulte la [guía de diseño de SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) y [Diseño para producción](../../hardware/design-for-production.md). Continúe con [Gráficos](../../learn/graphics/overview.md), [Audio](../../learn/audio/overview.md) y [Bluetooth](../../learn/bluetooth/overview.md) para desarrollar subsistemas.

- [Documentación de producto SiFli SF32LB57x](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [Descargas de manuales de usuario SiFli](https://downloads.sifli.com/user%20manual/)
- [Guía original de diseño de hardware SF32LB57x](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

La fuente de la placa indica que el manual de usuario SF32LB57x está pendiente de publicación; consulte el directorio de descargas para comprobar su disponibilidad actual.

- [Guía original de la placa en chino](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Fuente Markdown](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [Configuración de compilación del SDK](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [Herramientas de pantalla](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Programación con Impeller](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [Tienda SiFli](https://sifli.taobao.com/)

SiFli remite a su tienda para muestras y pedidos pequeños, y a sales@sifli.com para consultas de ventas por volumen. También menciona solicitudes de muestras para proyectos de código abierto y el grupo QQ 674699679; confirme con SiFli las condiciones y la disponibilidad actuales. Para consultas sobre proyectos, [contacte con μForge.io](../../about/contact.md).
