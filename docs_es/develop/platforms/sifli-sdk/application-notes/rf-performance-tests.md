---
icon: lucide/radio-tower
title: "Realizar pruebas RF con SiFli SDK"
description: "Cómo elegir el modo de prueba RF Bluetooth, la ruta de control y el equipo de medición adecuados."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, RF]
---

# Realizar pruebas RF con SiFli SDK { #run-sifli-sdk-rf-tests }

El SDK separa la validación RF de Bluetooth en pruebas de señalización, sin señalización y pruebas RF individuales. Elija el procedimiento según el objetivo antes de cargar firmware de prueba.

<div align="center" markdown>
<em>Tabla: Alcance del contenido de pruebas RF por familia</em>

| Contenido | Alcance por familia |
|---|---|
| Comparación de modos de prueba y secuencia de medición | Flujo consolidado para SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x y SF32LB58x. |
| Disponibilidad de pruebas Bluetooth clásico | Requiere un chip compatible con Bluetooth clásico. SF32LB55x solo admite BLE y no admite procedimientos de prueba Bluetooth clásico; en esta familia, use las pruebas BLE. |
| Compatibilidad de herramientas con SF32LB57x | La [guía de pruebas RF](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) incluye los pines UART de SF32LB57x, pero el selector de plataforma del [manual de SiFli_RfTool](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) no incluye 57x. Use esa guía solo como referencia de pines y confirme qué ruta de prueba admite la versión del SDK de destino. |
| Capturas de topología y matriz de comandos HCI | Ejemplos del SF32LB52x incluidos en la guía de SiFli; para la implementación, use los comandos y la documentación de pines de la familia de destino. |
| Configuración `CONFIG_BT_RF_TEST` | Se aplica a la ruta documentada que no es 55x; `bt_rftest` de SF32LB55x no utiliza este símbolo. |
| Pines UART, valores de paquetes y sintaxis de comandos | Dependen de la familia de destino y de la versión del SDK; verifique la configuración del proyecto y `bt_rftest help`. |

</div>

!!! warning "Los mapas UART1 de SF32LB58x difieren entre las guías oficiales"
    La [guía general de pruebas RF](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indica PA31/PA32 para UART1 TX/RX, mientras que la [guía de pruebas RF individuales de Bluetooth](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indica PA32/PA31. Antes de cablear, confirme la ruta de prueba del firmware y el pinmux de la placa; las asignaciones de ambas guías entran en conflicto.

## Seleccionar el modo de prueba { #select-the-test-mode }

<div align="center" markdown>
<em>Tabla: Selección de modos de prueba Bluetooth y RF</em>

| Modo | Uso | Entrada del SDK | Ruta de control |
|---|---|---|---|
| Señalización BT | Cualificación BQB/QDID y rendimiento conforme al protocolo | `bt_cm dut`, `gap_enb_dut_mode_req()` | Interfaz inalámbrica del probador y control de prueba LMP |
| BT sin señalización | Ajuste RF durante el desarrollo y cribado en producción | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | HCI local del fabricante |
| BLE sin señalización (SIG DTM) | Cribado RF BLE y pruebas SIG DTM | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | HCI local o HCI estándar reenviado por `bt_cm uart_dut` |
| Pruebas RF individuales | Ajuste RF de placa y preconformidad FCC/CE | `bt_cm uart_dut` + `SiFli_RfTool` | La herramienta del PC envía una operación de bajo nivel cada vez |

</div>

La señalización establece un enlace Bluetooth real y se usa para cualificación. Las pruebas sin señalización mantienen la radio en un canal y a una potencia fijos, en estado de transmisión o recepción; son la ruta habitual en desarrollo y producción. Las pruebas RF individuales emplean la herramienta del PC para controlar con precisión la portadora o la modulación y medir con un analizador o medidor de potencia. Las pruebas BT sin señalización y las pruebas RF individuales son procedimientos propios de SiFli, no pruebas BQB.

Las figuras de topología siguientes proceden de la guía de pruebas RF SF32LB52x. Muestran las distintas rutas entre PC, DUT, probador y UART/HCI/RF; para los valores UART y el mapa de pines predeterminados, use la tabla de la familia de destino.

![Topología de la prueba de señalización BT](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: en señalización BT, el PC configura el probador y el DUT establece el enlace RF con este.</em></div>

![Topología de la prueba BT sin señalización](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: en BT sin señalización, el PC controla directamente el estado RF del DUT mediante comandos serie/HCI.</em></div>

![Topología de la prueba de señalización BLE](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: en BLE DTM, tanto la ruta de control UART/HCI como la ruta de medición RF se conectan al probador.</em></div>

## Elegir el firmware y configurar el proyecto { #choose-firmware-and-configure-the-project }

`rf_test.bin` es una compilación interna de pruebas RF de SiFli y no se distribuye como un artefacto normal del SDK. `User.bin` es cualquier firmware de aplicación compilado con el SDK; las funciones RF se integran en la pila de protocolos y se activan con comandos FinSH como `bt_cm dut`, `bt_cm uart_dut` y `bt_rftest`.

En una compilación de usuario, habilite las opciones necesarias:

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

La ruta `bt_rftest` de SF32LB55x no utiliza `CONFIG_BT_RF_TEST`. `CONFIG_BT_FINSH` sirve para trazas y no es necesaria para los comandos de prueba. Si la ruta de control usa la UART IPC propia del SDK, configure `CONFIG_IPC_USE_OWN_DEVICE=y` y `CONFIG_IPC_OWN_DEVICE_NAME="uart2"` según corresponda a la placa. Los ejemplos `example/bt/spp/` y `example/bt/HCI_over_uart/` del SDK sirven como punto de partida.

## Prueba de señalización BT { #bt-signaling-test }

1. Exponga `VBAT`, `GND` y TX/RX de UART1 en el DUT. Los pines UART1 predeterminados varían según el encapsulado; use la configuración del proyecto.
2. Para señalización BLE, conecte UART1 al PC y envíe `bt_cm uart_dut`. Compruebe `04 0E 04 XX 03 0C 00` y después conecte UART al probador.
3. Para señalización BT, mantenga despierto el DUT, envíe `bt_cm dut`, compruebe `Write scan enable success` y conecte el coaxial RF al probador.
4. En Bluetooth Signaling, BLE usa control EUT USB-to-RS232 a 1 000 000 baudios; BT usa `None (EUT Control off)` y detecta el DUT por radio.
5. Ejecute TX en `Bluetooth 1 Multi Eval.` y RX en `Bluetooth 1 RX Meas.`. Use BER para Bluetooth clásico y PER para BLE; reduzca el nivel TX del probador para determinar la sensibilidad.

## Comandos BT/BLE sin señalización { #btble-non-signaling-commands }

Use la shell FinSH después de habilitar la ruta de pruebas RF:

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

El orden exacto de los argumentos y los valores de paquetes aceptados dependen de la versión; copie la sintaxis que muestra `bt_rftest help` en el SDK de destino. Las estadísticas de paquetes RX son útiles; el recuento TX no mide los paquetes recibidos. BLE DTM usa `bt_rftest bletx`/`blerx` o los comandos HCI estándar `LE_Transmitter_Test`, `LE_Receiver_Test v2` y `LE_Test_End`. Los canales BLE van de 0 a 39 y sus valores PHY son 1M/2M/Coded; los canales Bluetooth clásico van de 0 a 78. En los chips de modo dual compatibles con ambos, BT y BLE comparten el hardware RF y deben probarse por separado.

## Pruebas RF individuales con SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Conecte UART1 del DUT al PC a 1 000 000 baudios. Conecte el puerto RF, mediante un cable coaxial, a un equipo de prueba, analizador de espectro o medidor de potencia.

Envíe `bt_cm uart_dut` y compruebe la respuesta `04 0E 04 XX 03 0C 00`. En `SiFli_RfTool.exe`, seleccione la familia, el modo BLE o BT sin señalización y el puerto COM.

Detenga TX/RX antes de cambiar el canal, PHY, tipo de paquete o potencia. Para RX BLE, el equipo de prueba puede enviar 1 500 paquetes; calcule `PER = (1500 - received) / 1500 × 100%` y registre RSSI.

Para RX Bluetooth clásico, use una forma de onda GPRF de CMW500 y registre RSSI, errores de paquete/bit y BER/PER. Compense la pérdida del cable e indique si cada resultado es conducido o radiado.

## Registrar los resultados { #record-the-result }

La guía de SiFli también contiene una matriz completa de comandos HCI y valores de retorno. Consúltela si se envía un comando pero el DUT no entra en el estado esperado; no considere todos los vectores de esa tabla como API válidas para cualquier plataforma. Adapte los comandos al SDK y a la familia del chip de destino.

<div align="center"><em>Tabla: canales RX y frecuencias centrales de ejemplo de la matriz SF32LB52x</em></div>

<div align="center" markdown>

| Modo de prueba | Canales | Frecuencias centrales |
|:---------------|:--------|:----------------------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

La matriz de origen indica que se envíe `HCI_Reset` (`01,03,0C,00`) antes de reintentar una prueba RX fallida. Estos comandos y canales son ejemplos de la documentación SF32LB52x; verifique la secuencia para el SDK y la familia de destino.

![Matriz de comandos HCI para pruebas RF de SF32LB52x](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: matriz de comandos HCI, valores de retorno y elementos de prueba RF.</em></div>

Conserve con cada resultado la familia, revisión del SDK, identificación del firmware, pines UART, ruta RF, pérdida del cable, modelo/configuración del instrumento, canal, PHY/tipo de paquete, potencia, recuentos RX, RSSI, BER/PER y revisión de la placa. Consulte las guías oficiales detalladas de [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (la tabla UART también incluye SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) y [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
