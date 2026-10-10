---
icon: lucide/audio-lines
title: "Realizar pruebas RF individuales de Bluetooth"
description: "Use SiFli_RfTool para realizar pruebas RF de BLE o Bluetooth clásico de forma individual, en tareas de ajuste de placa y evaluaciones preliminares de conformidad."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Bluetooth]
---

# Realizar pruebas RF individuales de Bluetooth { #run-bluetooth-single-item-rf-tests }

Las pruebas RF individuales son la función de bajo nivel del SDK para ajustar la placa, realizar evaluaciones preliminares de conformidad FCC/CE y analizar una portadora o un ajuste de modulación cada vez. No son una función del producto ni sustituyen las pruebas de señalización BQB.

## Preparar el DUT y la herramienta { #prepare-the-dut-and-tool }

Prepare el dispositivo bajo prueba (DUT), un PC, un cable USB de datos (no solo de carga), un cable coaxial de RF y un equipo de prueba de comunicaciones o un analizador de espectro. Deje accesibles `VBAT`, `GND` y TX/RX de UART1 para las pruebas BLE/BT moduladas. Para una prueba de portadora continua (CW) en SF32LB55x, exponga también TX/RX de UART3. Las asignaciones predeterminadas son:

<div align="center" markdown>
<em>Tabla: Asignaciones UART predeterminadas para pruebas moduladas y de portadora continua</em>

| Dispositivo/encapsulado | UART1 TX/RX para pruebas moduladas | UART de control para portadora continua (CW) |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

En SF32LB55x, los pines de UART1 varían según el modelo. Para las pruebas BLE/BT moduladas, conecte UART1 al PC a 1 000 000 baudios. Para pruebas de portadora continua (CW) en SF32LB55x, use UART3 (PB45/PB46); las demás familias indicadas usan UART1. Si el proyecto tiene otra asignación, siga su configuración de pines. Conecte el puerto RF al instrumento mediante el coaxial, tenga en cuenta la pérdida del cable y distinga entre mediciones conducidas y radiadas.

!!! note "Ámbito por familia"
    La tabla UART consolida la comparación entre familias y encapsulados. La topología y las capturas de `SiFli_RfTool` que aparecen a continuación son ejemplos de la guía SF32LB52x; en la herramienta, seleccione la familia real del chip y verifique la asignación UART del proyecto de destino.

!!! warning "Asignación UART de SF32LB58x contradictoria entre guías oficiales"
    La [guía de pruebas RF individuales de Bluetooth](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indica UART1 TX/RX como PA32/PA31, mientras que la [guía general de pruebas RF](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indica PA31/PA32 para la UART de depuración RF. Antes de cablear, confirme la ruta de prueba del firmware y el pinmux de la placa. No dé por hecho que estas asignaciones, específicas de cada guía, son intercambiables.

![Topología de la prueba RF individual de Bluetooth](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: el PC controla el DUT mediante UART/HCI, mientras que el puerto RF se conecta por coaxial al equipo de prueba o al analizador de espectro.</em></div>

## Entrar en el modo de prueba RF { #enter-rf-test-mode }

1. Arranque el DUT y evite que entre en reposo.
2. Envíe el comando FinSH `bt_cm uart_dut` mediante SiFli_Trace.
3. Compruebe la respuesta hexadecimal `04 0E 04 XX 03 0C 00`.
4. Desconecte el terminal; SiFli_RfTool utilizará el mismo UART para el control HCI.

## Transmitir una señal BLE o Bluetooth clásico { #transmit-a-ble-or-classic-bt-signal }

1. Abra `SiFli_RfTool.exe`, seleccione la familia del chip, BLE non-signaling o BT non-signaling y el puerto COM de UART1; conecte a 1 000 000 baudios.
2. Para BLE, ajuste Frequency, Data Length, payload y PHY; después seleccione Start TX. Detenga TX antes de cambiar el canal o PHY.
3. Para Bluetooth clásico, ajuste Frequency, Data Length y Packet Type; después seleccione Start TX. Detenga TX antes de cambiar los parámetros del paquete.
4. Configure el equipo de prueba con el mismo canal, tipo de paquete, carga útil y PHY. Si no dispone de un equipo de prueba de comunicaciones, puede observar la forma de onda con un analizador de espectro.

El código fuente del SDK incluye niveles TX de referencia para la placa LB52x HDK, pero esos valores son específicos de esa placa. Úselos solo como referencia para depuración y mida la placa real del producto.

![Controles principales de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: selección de familia, modo, UART, baudios y controles TX/RX. Verifique las opciones antes de aplicar un vector de prueba.</em></div>

![Configuración TX BLE de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: seleccione el chip, modo, canal, carga útil, PHY, longitud de datos y potencia antes de iniciar TX.</em></div>

## Recepción y cálculo de sensibilidad { #receive-and-calculate-sensitivity }

Detenga TX antes de entrar en RX. Configure el canal y pulse Start RX; detenga RX antes de cambiarlo. Para RX BLE, configure el probador en Direct Test Mode, seleccione el PHY y el canal, envíe 1 500 paquetes y calcule:

```text
PER = (1500 - received_packets) / 1500 × 100%
```

Registre también el RSSI. Para RX de Bluetooth clásico, use una forma de onda del generador GPRF del CMW500, como DH1/2-DH1/3-DH1, y registre el número de paquetes recibidos y erróneos, el número de bits, el BER y el RSSI. BLE y Bluetooth clásico comparten la ruta RF de hardware; no los ejecute en paralelo.

![Configuración RX BLE de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: detenga TX antes de RX y registre el canal, la modulación, PHY y el resultado de recepción.</em></div>

## Portadora continua y configuración del instrumento { #single-carrier-and-instrument-setup }

Detenga la operación actual antes de pasar a una prueba de portadora continua (CW). En SF32LB55x, cambie la conexión DUT-PC de UART1 a UART3 (PB45/PB46), seleccione el puerto COM correspondiente en SiFli_RfTool y configure 1 000 000 baudios. Las demás familias indicadas siguen usando UART1. Configure la frecuencia de portadora y la potencia TX, inicie la transmisión y compruebe la salida con un analizador de espectro o medidor de potencia.

Para medir la transmisión modulada BLE/BT con un equipo de prueba, seleccione StandAlone (Non Signaling) como modo de recepción y haga coincidir el canal, el tipo de paquete, la carga útil y la PHY con la configuración de SiFli_RfTool. Para medir la recepción del DUT, configure el equipo de prueba como fuente de señal: BLE utiliza parámetros DTM, mientras que Bluetooth clásico utiliza una forma de onda GPRF.

Si la herramienta o la conexión serie deja de responder, cierre SiFli_RfTool, apague y vuelva a encender el DUT, espere a que arranque y vuelva a conectarse. En el registro de pruebas conserve la versión de la herramienta, la identificación del firmware, el chip/encapsulado, los pines UART, la revisión de la placa, el canal, el PHY/tipo de paquete, la potencia, la pérdida del cable, la configuración del instrumento y los resultados sin procesar.

![Configuración de recepción non-signaling del probador](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: seleccione StandAlone (Non Signaling) y haga coincidir el canal y los parámetros de paquete del DUT.</em></div>

Fuentes oficiales por familia: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) y [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
