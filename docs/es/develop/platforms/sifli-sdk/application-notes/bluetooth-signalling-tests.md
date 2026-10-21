---
icon: lucide/bluetooth
title: "Realizar pruebas de señalización Bluetooth"
description: "Conecte un dispositivo SF32 bajo prueba (DUT) a un equipo de prueba Bluetooth y realice mediciones de señalización BLE o Bluetooth clásico."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Bluetooth]
---

# Realizar pruebas de señalización Bluetooth { #run-bluetooth-signaling-tests }

El modo de señalización establece un enlace Bluetooth real entre el dispositivo bajo prueba (DUT) y un equipo de prueba de comunicaciones. El SDK lo utiliza para validar TX/RX conforme al protocolo y realizar tareas BQB/QDID; se diferencia de las pruebas del fabricante sin señalización y de las pruebas RF individuales.

## Preparación de la prueba { #test-setup }

Prepare el DUT, un equipo de prueba de comunicaciones Bluetooth (la guía de SiFli utiliza un CMW500), un PC con Windows, un cable USB-UART y un cable coaxial de RF. Deje accesibles las señales `VBAT`, `GND` y TX/RX de UART1 del DUT. Los pines predeterminados de UART1 varían según el encapsulado:

<div align="center" markdown>
<em>Tabla: Pines UART1 predeterminados por dispositivo y encapsulado</em>

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
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: confirme `04 0E 04 XX 03 0C 00` antes de cambiar la conexión UART.</em></div>

### Bluetooth clásico { #classic-bluetooth }

1. Arranque el DUT y mantenga la pantalla encendida y la CPU despierta.
2. Conecte UART1 al PC y envíe `bt_cm dut`.
3. Confirme la respuesta `Write scan enable success` y después conecte el cable coaxial de RF al probador. Reinicie el DUT antes de pasar a otro modo de prueba.

## Establecer la conexión de señalización { #establish-the-signaling-connection }

En la aplicación `Bluetooth Signaling` del equipo de prueba, active la señalización. Para BLE, en `EUT Control` seleccione `USB-to-RS232 adapter`, 1 000 000 baudios y `Low Energy burst type`. Conecte UART1 del DUT al equipo de prueba y su cable coaxial de RF a la entrada RF del equipo; después, ejecute `Connection Check` y espere a que aparezca `LE comm test passed`. Para Bluetooth clásico, establezca `HW Interface` en `None (EUT Control off)`, busque la dirección del DUT con `Inquire` y seleccione `Connect Test Mode`.

![Configuración EUT Control del probador para BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: configuración de EUT Control, velocidad en baudios y Low Energy para BLE.</em></div>

![Configuración del probador para Bluetooth clásico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo del SF32LB52x incluido en la guía de SiFli: señalización de Bluetooth clásico con EUT Control en `None (EUT Control off)`.</em></div>

## Realizar mediciones TX { #run-tx-measurements }

Abra `Bluetooth 1 Multi Eval.` y habilite la medición. Seleccione el tipo de ráfaga BLE 1M/2M o Bluetooth clásico BR/EDR, el canal, el tipo de paquete y la longitud de la carga útil requeridos. Tras establecer la conexión de señalización, se utiliza la misma pantalla TX del probador tanto para BLE como para Bluetooth clásico.

## Medir la sensibilidad RX { #run-rx-sensitivity-measurements }

Deshabilite TX antes de volver a la pantalla de señalización y abra `Bluetooth 1 RX Meas.`. Seleccione BER para Bluetooth clásico o PER para BLE, configure el canal y el tipo de paquete, y habilite Rx Quality. Reduzca `Tx Level (CMW)` del probador en pasos pequeños; el último nivel antes de que el indicador BER/PER deje de ser válido corresponde a la sensibilidad medida. Registre si la medición fue conducida o radiada e incluya la pérdida del cable.

## Registrar y reproducir los resultados { #record-and-reproduce }

Guarde junto con cada resultado el chip/encapsulado, la asignación de pines UART, la revisión del SDK, la identificación del firmware, el modelo y la configuración del probador, la conexión RF, el canal, la PHY, los ajustes de paquetes, el nivel TX, BER/PER y la revisión de la placa. Consulte las páginas oficiales: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
