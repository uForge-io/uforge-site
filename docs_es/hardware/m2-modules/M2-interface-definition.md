---
icon: lucide/plug
description: "Asignaciones preliminares de contactos M2 y M2xM, además de resúmenes M2xN y M2xA no verificados y notas sobre señales multiplexadas."
tags:
  - Hardware
  - Módulo
  - Interfaz
---

# Definición de la interfaz M2 { #m2-interface-definition }

!!! warning "Borrador de definición de interfaz"
    Esta página conserva una propuesta M2 preliminar. Un libro de cálculo local de la propuesta contiene hojas M2 y M2xM, pero cita otro archivo, `M2E接口定义_0714.xlsx`, que no está disponible; tampoco se pudieron establecer su aprobación ni el origen de su versión. No se encontró documentación primaria de SiFli que confirme las asignaciones o cantidades. El libro de cálculo no incluye hojas M2xN ni M2xA, por lo que los resúmenes correspondientes de esta página no están verificados. Esto no es una norma de interfaz publicada por μForge.io. Trate todas las asignaciones como provisionales y, antes de cerrar el diseño para producción, verifique el módulo, la placa portadora, el conector, los límites eléctricos y la multiplexación de pines.

## Alcance { #scope }

Las hojas M2 y M2xM del libro de cálculo local de la propuesta numeran las posiciones del 1 al 75, pero omiten las posiciones 24–31 del mapa de contactos. Por tanto, cada hoja muestra 67 contactos numerados. Ambas identifican la asignación como la de un conector M.2 Key-E. La hoja M2xM añade que el mismo módulo debe incorporar también la interfaz base M2. Estas indicaciones no demuestran la conformidad con la [especificación M.2 de PCI-SIG](https://pcisig.com/specification-overview/pci-express-m2) ni que un módulo y una placa portadora sean intercambiables. Tampoco permiten determinar cuántos conectores físicos hay ni cómo se disponen. Esta página también incluye resúmenes M2xN y M2xA, pero no se encontraron los planos de contactos originales de esas interfaces.

- **M2**: pantalla conectada, audio, almacenamiento, depuración y E/S generales para sistemas embebidos.
- **M2xM**: propuesta de asignación multimedia para pantalla, cámara y PDM. El resumen también menciona I2S/PCM, pero la hoja M2xM disponible no asigna contactos para ello.
- **M2xN**: señales de redes, USB, CAN y UART.
- **M2xA**: control de motores, adquisición analógica, encoder y temporizador.

En el borrador actual, `M2xH` y `M2xP` son nombres reservados sin contactos asignados.

!!! info "Relación entre conectores no definida"
    El libro de cálculo local de la propuesta indica que el módulo M2xM también debe incluir la interfaz base M2, pero no aclara si ambos mapas corresponden a conectores físicos separados o compartidos. Por ello, no se puede inferir el número ni la disposición de los conectores. El libro de cálculo no incluye mapas de contactos M2xN ni M2xA.

## Convención del conector { #connector-convention }

En la hoja M2 del libro de cálculo local de la propuesta, los contactos impares aparecen en la cara superior y los pares en la inferior, vistos desde el borde de la tarjeta. Las posiciones 24–31 no figuran en el mapa y se señalan como la zona prevista para la muesca de codificación. Este dibujo no demuestra la conformidad mecánica con la especificación M.2 E-key.

<div align="center"><em>Tabla: resumen del conector M2 y sus extensiones</em></div>

<div align="center" markdown>

| Elemento | Definición |
| --- | --- |
| Formato del conector | Mapa preliminar de borde de tarjeta numerado del 1 al 75; muestra 67 contactos. Conformidad con M.2 E-key no verificada |
| Posiciones omitidas en la propuesta | 24–31 (indicadas como zona prevista para la muesca de codificación) |
| Asignación base | M2 |
| Asignación multimedia | M2xM |
| Contenido de extensión de este borrador | Mapa de contactos M2xM; resúmenes M2xN y M2xA únicamente, no verificados |
| Ejemplo de declaración | `M2 + M2xM` |

</div>

## Perfil base M2 { #m2-base-profile }

M2 es el perfil base para productos conectados compactos. Su distribución está pensada para cubrir una pantalla QSPI y un panel táctil capacitivo, Wi-Fi SDIO, SDIO para tarjeta TF de 1 bit, audio analógico, depuración, USB, CAN y buses generales. Varios contactos están multiplexados de forma deliberada para que cada módulo pueda seleccionar la función adecuada a su SoC y configuración de producto.

<div align="center"><em>Tabla: asignación funcional de M2</em></div>

<div align="center" markdown>

| Función | Señales asignadas | Propósito de diseño |
| --- | --- | --- |
| Alimentación | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT` y GND | Etiquetas del mapa propuesto; aquí no se especifican tensión, corriente ni secuencia de alimentación. |
| Pantalla QSPI | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | Panel de pantalla QSPI, retroiluminación y selección de chip secundaria opcional. |
| Táctil capacitivo | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Control e interrupción táctiles capacitivos. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | Interfaz SDIO de 4 bits para el módulo Wi-Fi complementario. |
| Tarjeta TF | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | Interfaz de tarjeta TF de 1 bit y detección de tarjeta. |
| Audio analógico | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Dos pares de entrada analógica, polarización de micrófono, dos pares DAC y habilitación de PA. |
| Depuración y recuperación | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | UART de depuración, SWD y selección de arranque/recuperación. |
| Buses serie generales | SPI1/SPI2, I2C2–I2C4, UART2/UART3 y líneas GPIO/bus generales (`G0–G17`/`BUS0–BUS17`) | Buses específicos del producto seleccionados mediante el multiplexor de pines del módulo; I2C1 se asigna al controlador táctil. Algunas posiciones SPI2/I2C3/I2C4/UART3 también pueden llevar señales de micrófono digital `PDM1`/`PDM2`. |
| Otros controles | `CAN_TX/RX`, señales USB/host USB, `PWR_KEY` | Bus de campo, control del rol USB y entrada del botón de encendido. |

</div>

## Pinout M2 por colores { #color-coded-m2-pinout-guide }

<div align="center"><em>Figura: leyenda de colores de los grupos de señales M2</em></div>

<div class="m2-visual-guide" role="img" aria-label="Leyenda de colores de la tabla de pines M2 de dos caras">
<div class="m2-category-band">
<div class="m2-category m2-audio">Audio</div>
<div class="m2-category m2-display">Pantalla</div>
<div class="m2-category m2-touch">Táctil</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Alimentación</div>
<div class="m2-category m2-debug">Dedicado</div>
</div>
</div>

La barra de colores sirve de leyenda. La tabla de contactos de ambas caras que aparece a continuación presenta la asignación de pines de referencia para esta propuesta M2, incluidas las funciones alternativas y la multiplexación; no constituye una especificación de interfaz publicada.

### Asignación de contactos M2 { #m2-contact-assignment }

Esta tabla distingue las columnas Pin inferior / Pin superior / CN1. Cuando el libro de cálculo asigna una función multiplexada adicional, se indica en la columna `Alt` («Alternativa»). Cada celda de función usa el color de su categoría de la leyenda anterior.

<div align="center"><em>Tabla: asignación de contactos base M2</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alternativa</th><th>Función</th><th>Pin inf.</th><th>CN1</th><th>Pin sup.</th><th>Función</th><th>Alternativa</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Posiciones 24–31 omitidas (zona prevista para la muesca de codificación)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Posiciones 24–31 omitidas (zona prevista para la muesca de codificación)</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### Descripción de pines M2 { #m2-pin-descriptions }

Los grupos y colores coinciden con la tabla de contactos anterior. El libro de cálculo no define las direcciones de E/S, por lo que esta columna es una guía provisional para la integración, vista desde el módulo: I indica entrada, O salida e I/O funcionamiento bidireccional. Las direcciones separadas por comas siguen el orden de las señales. Las filas de SPI y PDM suponen que el módulo suministra el reloj, y las de SWD suponen que se conecta un depurador externo. Confirme cada dirección y requisito eléctrico en la documentación del módulo y del SoC seleccionados.

En I2C, I/O describe las líneas bidireccionales SDA/SCL; no garantiza todos los modos de controlador o dispositivo destino ni la compatibilidad con clock stretching. Confirme la configuración de pines y las resistencias de pull-up del módulo. Consulte la [especificación I2C de NXP](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). La suposición de salida de reloj y entrada de datos PDM sigue la conexión entre micrófono y host de la [nota de aplicación PDM de ST](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf); no demuestra que un módulo concreto admita esa función.

<div align="center"><em>Tabla: señales M2 y direcciones provisionales</em></div>

<div align="center" markdown>

| Grupo de señales | Señal | E/S | Descripción |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Alimentación</span> | `VBAT/VBATS` | I | Raíl de entrada de batería. |
| <span class="m2-chip m2-power">Alimentación</span> | `3.3V` | I | Raíl de alimentación de 3,3 V. |
| <span class="m2-chip m2-power">Alimentación</span> | `CHG_INT` | O | Salida de estado/interrupción del cargador. |
| <span class="m2-chip m2-power">Alimentación</span> | `USB_VIN` | I | Entrada USB / raíl de la ruta de carga. |
| <span class="m2-chip m2-power">Alimentación</span> | `USB_DET` | I | Señal de detección USB. |
| <span class="m2-chip m2-power">Alimentación</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | Par de datos del modo host USB, separado del puerto USB principal. |
| <span class="m2-chip m2-power">Alimentación</span> | `USB_OTG` | I/O | Etiqueta de señal del libro de cálculo de la propuesta; la hoja indica «No compatible en la plataforma actual». No deduzca compatibilidad a partir de la etiqueta del contacto. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | Selección de chip principal y secundaria opcional de la pantalla QSPI. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCDC1_SPI_CLK` | O | Reloj de pantalla QSPI. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | Líneas de datos de la pantalla QSPI. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCDC1_SPI_TE` | I | Entrada de sincronización del efecto tearing desde el panel. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCDC1_SPI_RSTB` | O | Reset del panel de pantalla, activo en bajo. |
| <span class="m2-chip m2-display">Pantalla</span> | `LCD_BL_PWM` | O | Control PWM de retroiluminación. |
| <span class="m2-chip m2-touch">Táctil</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Bus I²C del controlador táctil capacitivo. |
| <span class="m2-chip m2-touch">Táctil</span> | `CTP_INT` | I | Interrupción del controlador táctil. |
| <span class="m2-chip m2-touch">Táctil</span> | `CTP_REST` | O | Reinicio del controlador táctil. El libro de cálculo denomina esta señal `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Reloj y comando SDIO del módulo Wi-Fi complementario. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Líneas de datos SDIO del módulo Wi-Fi complementario (4 bits). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Control de apagado del módulo Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Interrupción Wi-Fi. Comparte el pin 65 con `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Señal de activación Wi-Fi. Comparte el pin 67 con `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | Comando, reloj y datos SDIO para tarjeta TF de 1 bit. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | Detección de presencia de tarjeta TF. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Alias genéricos del controlador para las mismas líneas físicas de la tarjeta TF (SDIO1) y del bus SDIO de Wi-Fi (SDIO2). Utilice los nombres específicos de cada función indicados arriba, salvo que el módulo necesite SDIO de 4 bits en ambos buses. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Interfaz lógica del transceptor CAN, multiplexada en los pines 65 y 67 junto con `WiFi_INT`/`WiFi_WAKE`. La placa portadora necesita un transceptor CAN y la protección adecuada para el bus del producto. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | En este mapa, los contactos Wi-Fi SDIO 74, 72, 70, 68, 66 y 64, junto con el contacto 60 de `PWR_KEY`, tienen funciones alternativas de ADC. |
| <span class="m2-chip m2-audio">Audio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Dos pares de entrada analógica diferencial para micrófonos. |
| <span class="m2-chip m2-audio">Audio</span> | `MIC_BIAS` | O | Alimentación de polarización del micrófono. |
| <span class="m2-chip m2-audio">Audio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Dos pares de salida de audio diferencial. |
| <span class="m2-chip m2-audio">Audio</span> | `AU_PA_EN` | O | Habilitación del amplificador de potencia de audio. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, multiplexado con la ruta de la tarjeta TF. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, multiplexado con I2C3 y UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 usa SDA en el contacto 35 y SCL en el 34. Este mapa no confirma el uso compartido con `MPI/SD` mencionado anteriormente. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, multiplexado con SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, multiplexado con SPI2 y UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 tiene posiciones alternativas en los grupos de tarjeta TF y SPI2, y en los contactos 39/37. El uso compartido con `MPI/SD` mencionado anteriormente no está confirmado; compruebe la selección real del multiplexor del módulo. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 tiene posiciones alternativas en el grupo SPI2/I2C4 y en los contactos 38/36. El uso compartido con `MPI/SD` mencionado anteriormente no está confirmado; compruebe la selección real del multiplexor del módulo. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Contactos GPIO/bus genéricos, multiplexados con SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2` o SWD según la posición. |
| <span class="m2-chip m2-audio">Audio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | En cada par de señales de micrófono digital, CLK es una salida del módulo y DATA una entrada. Comparten los contactos 58, 56, 54 y 52 con SPI2/I2C3/I2C4/UART3. |
| <span class="m2-chip m2-debug">Dedicado</span> | `DBG_UART1_TXD/RXD` | O/I | UART de depuración, multiplexado con SWD. |
| <span class="m2-chip m2-debug">Dedicado</span> | `SWDIO`, `SWCLK` | I/O, I | Puerto de depuración SWD. Tiene dos opciones de uso compartido: posiciones de UART de depuración (pines 43/41) o posiciones de interrupción/reset táctil (pines 51/49). Cada módulo solo debe implementar una opción. |
| <span class="m2-chip m2-debug">Dedicado</span> | `SWD_SW` | I | Etiqueta de señal del libro de cálculo de la propuesta; no se especifica cómo controla o selecciona el encaminamiento. |
| <span class="m2-chip m2-debug">Dedicado</span> | `BOOT_MODE` | I | Selección del modo de arranque/recuperación. |
| <span class="m2-chip m2-debug">Dedicado</span> | `PWR_KEY` | I | Señal del botón de encendido. |
| <span class="m2-chip m2-gnd">Tierra</span> | `GND` | — | Retornos digitales y analógicos distribuidos por el conector. |

</div>

!!! info "Corrección de la etiqueta de datos Wi-Fi SDIO"
    El libro de cálculo local de la propuesta asigna el contacto 64 a `WiFi_SD2_D1` y señala que una versión anterior repetía allí la etiqueta D3. Esto solo documenta una corrección dentro del borrador; no confirma el pinout de SiFli. Ambos buses SDIO también incluyen alias genéricos de controlador en la columna «Alternativa»: `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` para el bus Wi-Fi y `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` para la tarjeta TF, además de sus nombres según la función.

### Reglas de uso compartido de M2 { #m2-sharing-rules }

- El libro de cálculo marca SWD como un recurso multiplexado con dos opciones de trazado alternativas: las posiciones del UART de depuración (`SWDIO` en el pin 43 y `SWCLK` en el 41) o las posiciones de interrupción/reset táctil (`SWDIO` en el pin 51 y `SWCLK` en el 49). Implemente solo una opción por módulo y prevea una estrategia de recuperación antes de reutilizar cualquiera de esos contactos.
- SPI1 comparte la ruta de la tarjeta TF de 1 bit. Ambos se exponen también como bus de controlador genérico `SDIO1_D0–D3`/`CMD`/`CLK`, y los pines 65/67 incluyen además `CAN_TX`/`CAN_RX`.
- Las líneas de datos Wi-Fi SDIO2 también se exponen como bus de controlador genérico `SDIO2_D0–D3`/`CMD`/`CLK`; varios de esos contactos sirven además como entradas analógicas `GPADC`.
- SPI2 e I2C3/I2C4 (contactos 58, 56, 54 y 52) pueden transportar alternativamente señales de micrófono digital `PDM1`/`PDM2` y los alias GPIO genéricos `G0–G3`/`BUS0–BUS3`.
- En el grupo de seis posiciones `G11–G16`/`BUS11–BUS16`, UART3 usa los contactos 38/36, UART2 los 39/37 e I2C2 SDA/SCL los 35/34. Son pares distintos, no tres buses que comparten los mismos pines. Cada par comparte contactos con sus alias GPIO; confirme el funcionamiento simultáneo en el módulo seleccionado.
- Los grupos de pantalla QSPI y de táctil capacitivo son independientes en cuanto a señales, pero la alimentación, el reset y la activación deben revisarse como un único subsistema de pantalla.
- `CAN_TX` y `CAN_RX` son señales de nivel lógico multiplexadas en los pines 65/67, no contactos asignados por separado. La placa portadora necesita, además, un transceptor CAN y protección adecuados para el bus del producto.

## Perfil multimedia M2xM { #m2xm-multimedia-profile }

M2xM es una propuesta de asignación multimedia. El libro de cálculo local de la propuesta marca DPI y DVP como grupos principales y MIPI DSI y CSI como alternativos, pero no define el control de multiplexación ni las condiciones de uso simultáneo. Estas etiquetas no confirman la compatibilidad con un módulo μForge o encapsulado SoC concreto; antes de implementarlas, compruebe las capacidades y los requisitos de trazado en la documentación del módulo seleccionado.

<div align="center"><em>Tabla: asignación funcional M2xM</em></div>

<div align="center" markdown>

| Función | Etiquetas del libro de cálculo de la propuesta | Evidencia y límites |
| --- | --- | --- |
| Pantalla RGB / DPI | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC` y etiquetas de control de pantalla compartidas | DPI figura como principal. El libro de cálculo no incluye asignaciones 8080 ni EPD. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, reset, PWM de retroiluminación y etiquetas I2C | DSI figura como alternativa; el mapa identifica seis contactos como masa de blindaje (GND). El libro de cálculo no asigna ninguna señal TE. |
| Control táctil | Etiquetas genéricas `I2C_SCL`, `I2C_SDA` y `RESET` | La hoja M2xM no identifica una asignación específica de interrupción/reset táctil; no se confirma la compatibilidad con un controlador táctil. |
| Cámara DVP de 12 bits | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, reset y etiquetas I2C | Se muestran 20 contactos, pero el libro de cálculo no identifica el número del controlador I2C. |
| MIPI CSI | Carriles diferenciales D0/D1, par de reloj, PWDN, reset y etiquetas I2C | CSI figura como alternativa; el mapa identifica cuatro contactos como masa de blindaje (GND). No se especifican multiplexación ni uso simultáneo. |
| Micrófonos digitales | `PDM1_CLK/DATA` y `PDM2_CLK/DATA` | Se muestran cuatro señales PDM. |
| I2S / PCM | La hoja M2xM disponible no contiene señales ni asignaciones de contactos I2S/PCM. | La asignación no está verificada; no considere I2S/PCM parte de este mapa sin una fuente aprobada. |

</div>


## Perfil de redes M2xN { #m2xn-networking-profile }

M2xN es un resumen de perfil de red no verificado en este documento, no un mapa de contactos respaldado por una fuente. El libro de cálculo de la propuesta disponible no tiene hoja M2xN y no se encontró documentación primaria de SiFli para estas asignaciones. La lista de señales y los contactos reservados de abajo no deben considerarse verificados.

<div align="center"><em>Tabla: asignación funcional M2xN</em></div>

<div align="center" markdown>

| Función | Resumen del borrador (no verificado) |
| --- | --- |
| Ethernet | El texto del borrador contiene etiquetas contradictorias: Gigabit Ethernet / RGMII y señales `RMII_*`. Aquí no se dispone de un mapa original de contactos M2xN ni de documentación primaria de SiFli que permita resolverlas. El tipo de interfaz y la velocidad no están verificados; no los atribuya a un producto hasta confirmarlos en una fuente aprobada. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` a `CAN4_TX/RX`, además de los controles `CAN1/2_STB` y `CAN1/2_ERR_N` donde estén asignados |
| UART | `UART1_TX/RX/CTS/RTS` y `UART2_TX/RX/CTS/RTS` |
| Reservado | 15 contactos GPIO y 12 contactos GND |

</div>

## Perfil analógico y de control de movimiento M2xA { #m2xa-analog-and-motion-control-profile }

M2xA es un resumen de control de motores y adquisición no verificado en este documento, no un mapa de contactos respaldado por una fuente. El libro de cálculo de la propuesta disponible no tiene hoja M2xA y no se encontró documentación primaria de SiFli para estas asignaciones. Los nombres, cantidades y asignaciones físicas de abajo no deben considerarse verificados.

<div align="center"><em>Tabla: asignación funcional M2xA</em></div>

<div align="center" markdown>

| Función | Resumen del borrador (no verificado) |
| --- | --- |
| Control BLDC | El borrador enumera `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN` y `DRV_NFAULT`. Para las entradas analógicas aparecen dos etiquetas incompatibles de cinco canales (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` y `ADC_IN1–ADC_IN5`); otro resumen M2xA enumera `ADC0–ADC2`. No hay un mapa original de contactos M2xA ni documentación primaria de SiFli que permita comprobar los nombres, la cantidad o la asignación. Trátelos como no resueltos hasta disponer de una fuente de interfaz aprobada. |
| Realimentación de posición | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| Temporización general | `TIM_CH1–TIM_CH6` |
| Reservado | 27 contactos GPIO y 13 contactos GND |

</div>

## Declaración del módulo y lista de comprobación de implementación { #module-declaration-and-implementation-checklist }

La declaración del módulo debe identificar su asignación base y cada mapa de extensión admitido, por ejemplo, `M2`, `M2 + M2xM` o `M2 + M2xN + M2xA`. También debe indicar cuántos conectores con formato M2 implementa, su categoría, las funciones opcionales implementadas y los modos mutuamente excluyentes.

Antes de adoptar este borrador, verifique:

- Si la huella propuesta, el contorno de la tarjeta, los elementos de retención y la orientación de inserción cumplen los requisitos M.2 aplicables.
- El número, la ubicación y la categoría de los conectores formato M2 del módulo y de la placa portadora.
- Todas las funciones multiplexadas seleccionadas por el módulo, incluido cualquier encaminamiento compartido de SDIO1/SDIO2, PDM, SWD (UART de depuración o interrupción/reset táctil) o CAN.
- Los requisitos específicos del módulo para tensión y corriente de E/S, reset, arranque y secuencia de alimentación.
- Si las funciones MIPI, RGB, DVP, PDM o I2S declaradas para M2xM pueden funcionar simultáneamente o solo como modos alternativos.
- Los requisitos de la placa portadora para transceptores CAN, protección USB, alimentación/detección de tarjeta TF, alimentación de pantalla, amplificación de audio y PHY externos.
