---
icon: lucide/bluetooth
title: "Realizar pruebas de señalización Bluetooth"
description: "Conecte un dispositivo SF32 bajo prueba (DUT) a un equipo de prueba Bluetooth y realice mediciones de señalización BLE o Bluetooth clásico."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Bluetooth]
---

# Realizar pruebas de señalización Bluetooth { #run-bluetooth-signaling-tests }

El modo de señalización establece un enlace Bluetooth real entre el DUT y un equipo de prueba de comunicaciones para realizar pruebas TX/RX conformes al protocolo. La guía de SiFli contempla tanto las pruebas manuales como las automatizadas mediante software que controla el equipo, por ejemplo R&S® CMWrun para controlar un CMW. Este modo se distingue de las pruebas sin señalización propias del fabricante y de las pruebas RF de parámetros individuales.

!!! note "Alcance de las pruebas de cualificación"
    Para cualificación, siga el flujo correspondiente al tipo de prueba. La guía de pruebas RF de SiFli indica que la señalización BT se usa para pruebas QDID/conformes al protocolo, y que las pruebas RF BQB de BR/EDR usan señalización BT, mientras que las pruebas RF BQB de BLE usan SIG DTM (BLE sin señalización). No trate los pasos de señalización BLE de esta página como un flujo de pruebas RF BQB para BLE.

## Preparación de la prueba { #test-setup }

Prepare el DUT, un equipo de prueba de comunicaciones Bluetooth (la guía de SiFli utiliza un CMW500), un PC con Windows, un cable USB-UART y un cable coaxial de RF. Deje accesibles las señales `VBAT`, `GND` y TX/RX de UART1 del DUT. Los pines predeterminados de UART1 varían según el encapsulado:

<div align="center" markdown>
<em>Tabla: Pines UART1 predeterminados según la guía de señalización Bluetooth de SiFli</em>

| Dispositivo/encapsulado | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "Conflicto en la dirección de UART1 para SF32LB58x"
    La guía de señalización Bluetooth de SiFli y la tabla de puertos de depuración de la [guía de diseño de hardware SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) asignan TX/RX de UART1 a PA32/PA31. Sin embargo, la tabla de pines de [SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) identifica PA31 como UART1_TXD y PA32 como UART1_RXD, y la [guía de pruebas RF de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) también indica TX=PA31/RX=PA32. Las referencias oficiales se contradicen. Antes de cablear, compruebe el esquema de la placa y la configuración de pines del proyecto; no se base únicamente en esta tabla consolidada.

Si el proyecto utiliza una asignación distinta, compruebe la configuración real de sus pines. La señalización BLE necesita una conexión serie de control EUT entre el DUT y el probador; en Bluetooth clásico, el probador puede controlar el DUT por radio una vez que este entra en modo de prueba.

La diferencia principal está en la topología de control: en BLE, la ruta UART/HCI se conecta al probador; en Bluetooth clásico, el probador detecta y conecta con el DUT por radio. Los diagramas siguientes muestran ejemplos del SF32LB52x incluidos en la guía de SiFli; para otras familias, use la tabla de pines del proyecto correspondiente.

!!! note "Ámbito por familia"
    La tabla de pines UART reúne los valores predeterminados de varias familias y encapsulados. Los diagramas de topología y las capturas del probador que aparecen a continuación son ejemplos del SF32LB52x incluidos en la guía de SiFli. Ayudan a entender la ruta de señal, pero no deben tomarse como referencia de pines o menús para cualquier encapsulado.

![Topología de la prueba de señalización BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: en señalización BLE, el PC pone el DUT en modo de prueba y, a continuación, la ruta UART/HCI de control se conecta al probador.</em></div>

![Topología de la prueba de señalización de Bluetooth clásico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: en la señalización de Bluetooth clásico, el probador detecta y conecta con el DUT por RF.</em></div>

## Poner el DUT en modo de prueba { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Arranque el DUT y manténgalo despierto mientras ejecuta el firmware de DFU/aplicación.
2. Conecte UART1 al PC y envíe el comando FinSH `bt_cm uart_dut` con SiFli_Trace u otra herramienta serie.
3. Cambie el terminal a visualización hexadecimal y confirme la respuesta `04 0E 04 XX 03 0C 00`.
4. Desconecte el PC y conecte ese mismo UART1 al puerto de control EUT USB-to-RS232 del probador.

![Respuesta serie al entrar en modo de prueba BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: confirme `04 0E 04 XX 03 0C 00` antes de cambiar la conexión UART; la captura muestra la respuesta `04 0E 04 06 03 0C 00`.</em></div>

### Bluetooth clásico { #classic-bluetooth }

1. Arranque el DUT y mantenga la pantalla encendida y la CPU despierta.
2. Conecte UART1 al PC y envíe `bt_cm dut`.
3. Confirme la respuesta `Write scan enable success` y después conecte el cable coaxial de RF al probador. Reinicie el DUT antes de pasar a otro modo de prueba.

## Establecer la conexión de señalización { #establish-the-signaling-connection }

En la aplicación `Bluetooth Signaling` del equipo de prueba, active la señalización. Para BLE, en `EUT Control` establezca `HW Interface` en `USB to RS232 adapter`, `EUT Comm Protocol` en `HCI` y `Baud Rate` en `1000000`; en General Setup, elija `Burst Type: Low Energy`. El ejemplo de medición mostrado usa `PHY=LE1M`. Antes de conectar el cable serie, `Virtual COM Port` aparece como `None` y está deshabilitado. Conecte UART1 del DUT al equipo y el coaxial de RF a su entrada RF; después, apague y vuelva a encender Bluetooth Signaling para que el equipo detecte el puerto serie. Ejecute `Connection Check`; `LE comm test passed` debería aparecer en unos 3 segundos. Para Bluetooth clásico, establezca `HW Interface` en `None (EUT Control off)`, busque la dirección del DUT con `Inquire` y seleccione `Connect Test Mode`.

![Configuración EUT Control del probador para BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: configuración de EUT Control, velocidad en baudios y Low Energy para BLE.</em></div>

![Configuración del probador para Bluetooth clásico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: señalización de Bluetooth clásico con EUT Control en `None (EUT Control off)`.</em></div>

!!! note "Parámetros de ejemplo en las capturas del probador"
    La captura BLE también muestra `Stop Bits=1`, `Parity=None`, `Protocol=None` en el puerto serie, `Autoreset EUT` activado y `Use BR/EDR Settings` desactivado. Los campos de medición del ejemplo son `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` y `Dirty Tx` desactivados, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)` y `Pattern Type=PRBS9`. La captura Classic BT muestra `Operating Mode=RF Test`, `Burst Type=Basic Rate`, `Test Mode=Loopback Test` en la interfaz, valores RX/TX de `Channel` 10/39 y de `Frequency` 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)` y `Pattern Type=10101010`; Hopping, Auto Ranging, Dirty Tx y Whitening están desactivados. Son parámetros de ejemplo de las capturas, no valores universales. El campo `Loopback Test` de la captura no modifica el paso de conexión anterior, que selecciona `Connect Test Mode` después de `Inquire`.

## Realizar mediciones TX { #run-tx-measurements }

Abra `Bluetooth 1 Multi Eval.`; la pantalla de medición está desactivada de forma predeterminada, así que pulse `ON/OFF` para habilitarla. Para cambiar los parámetros, seleccione `Input Signal` a la derecha y elija `Burst Type` en la parte inferior. Para BLE puede elegir 1M/2M y para Bluetooth clásico, BR/EDR. Configure el canal, el tipo de paquete y la longitud de carga útil en la pantalla Bluetooth Signaling o en `Input Signal`. Se utiliza la misma pantalla TX del probador tras establecer la conexión BLE o BT.

## Medir la sensibilidad RX { #run-rx-sensitivity-measurements }

Deshabilite TX, vuelva a la pantalla de conexión mediante `Bluetooth Signaling` a la derecha y abra `Bluetooth 1 RX Meas.`. Seleccione BER para Bluetooth clásico o PER para BLE, configure el canal, el tipo de paquete y la longitud de carga útil, y habilite Rx Quality. Reduzca `Tx Level (CMW)` en pasos de 0,01 o 0,1. Cuando el indicador BER/PER se ponga rojo, el nivel anterior corresponde a la sensibilidad de recepción de ese canal. Registre si la medición fue conducida o radiada e incluya la pérdida del cable.

## Registrar y reproducir los resultados { #record-and-reproduce }

Guarde junto con cada resultado el chip/encapsulado, la asignación de pines UART, la revisión del SDK, la identificación del firmware, el modelo y la configuración del probador, la conexión RF, el canal, la PHY, los ajustes de paquetes, el nivel TX, BER/PER y la revisión de la placa. Consulte las páginas oficiales: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
