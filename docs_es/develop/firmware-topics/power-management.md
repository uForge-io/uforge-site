---
icon: lucide/battery-charging
description: "Mida y ajuste el consumo de SF32 según la configuración de reloj, los modos de suspensión, la pantalla, los intervalos de conexión Bluetooth y los sensores para convertir un prototipo en un producto preparado para funcionar con batería."
tags:
    - Desarrollo
    - Energía
---

# Gestión de energía { #power-management }

La gestión de energía convierte un prototipo funcional en un producto apto para dispositivos vestibles. En SF32, el trabajo sobre el consumo abarca la configuración de reloj, los modos de suspensión, el comportamiento de la pantalla, los intervalos de conexión Bluetooth, las interrupciones de los sensores y la arquitectura de la aplicación.

No optimice el consumo basándose en fragmentos de código aislados. Mida escenarios del producto: arranque, inactividad, inactividad con conexión, pantalla encendida, audio activo, despertar por sensor, OTA y apagado.

## Flujo práctico { #practical-workflow }

1. Mida el ejemplo del SDK sin modificar.
2. Active un subsistema cada vez.
3. En las primeras mediciones, mida por separado la actividad de la pantalla, Bluetooth, audio, almacenamiento y sensores.
4. Use despertares por interrupción en vez de sondeo.
5. Registre la corriente medida en cada modo y escenario del producto.

## Puntos de partida útiles { #useful-starting-points }

- Ejemplos de gestión de energía del SDK.
- Perfilado de uso de CPU.
- Inspección mediante el shell de RT-Thread.
- Medición de corriente a nivel de placa.

## Datos que registrar en las mediciones { #measurement-notes }

Registre cada medición con los siguientes datos:

- Placa y revisión.
- Fuente de alimentación y punto de medición.
- Rama y versión de compilación del firmware.
- Estado de la pantalla.
- Estado de Bluetooth.
- Estado de los sensores.
- Nivel de registro.
- Corriente media, corriente máxima e intervalo de medición.

## Problemas frecuentes de consumo { #common-power-problems }

<div align="center"><em>Tabla: Problemas frecuentes de consumo</em></div>

<div align="center" markdown>

| Síntoma | Causa probable |
|:--------|:---------------|
| Corriente en reposo demasiado alta | Bucle de sondeo, registro de mensajes, alimentación de la pantalla o reloj de un periférico que sigue activo. |
| No se entra en suspensión | Temporizador activo, dispositivo abierto, trabajo pendiente o fuente de activación sin gestionar. |
| Picos de corriente de Bluetooth | Intervalo de conexión, ventana de escaneo, ruta de audio o retransmisiones. |
| La pantalla domina el consumo energético | Consumo de la retroiluminación LCD, contenido mostrado en AMOLED, política de refresco o estrategia de actualización parcial. |
| Las mediciones varían mucho | Cambios en el montaje de prueba, el estado de la batería, la ruta de alimentación USB o la carga de registro. |

</div>
