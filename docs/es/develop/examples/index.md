---
icon: lucide/list-tree
description: "Cómo elegir y adaptar un ejemplo de SiFli-SDK o Zephyr según la placa, el framework y el periférico más complejo, en lugar de crear desde cero el firmware SF32."
tags:
    - Desarrollo
    - Ejemplos
---

# Ejemplos { #examples }

Empiece por los ejemplos. Normalmente, el firmware SF32 se desarrolla más rápido adaptando un ejemplo funcional para una placa que creando todos los subsistemas desde cero.

El mejor ejemplo no siempre es el más pequeño. Elija uno que ya incluya la parte más compleja del producto: perfil Bluetooth, pantalla, ruta de audio, sistema de archivos, OTA, USB, modo de bajo consumo o acelerador de IA.

## Áreas con ejemplos { #example-areas }

<div align="center"><em>Tabla: Áreas y puntos de partida para los ejemplos</em></div>

<div align="center" markdown>

| Área | Empezar por |
|:-----|:-----------|
| Primera ejecución | `example/get-started/hello_world/rtt/project` |
| Parpadeo / GPIO | `example/get-started/blink/rtt` o ejemplos de GPIO para HAL y RT-Device. |
| Bluetooth | Ejemplos BLE, Bluetooth clásico, LE Audio, rendimiento, balizas, OTA y perfiles. Empiece por el mapa de tareas de [Ejemplos de SDK de Bluetooth](../../learn/bluetooth/bluetooth-sdk-examples.md). |
| Gráficos | Demos LVGL, integración con herramientas de diseño, widgets, recursos comprimidos, animación/multimedia y ejemplos específicos de pantalla. Empiece por el mapa de tareas de [Ejemplos LVGL del SDK](../../learn/graphics/lvgl-sdk-examples.md). |
| Audio | Reproducción, grabación, captura PDM, códec, Opus, MP3, mezcla y audio USB cuando esté admitido. Empiece por el mapa de tareas de [Ejemplos de audio del SDK](../../learn/audio/audio-sdk-examples.md). |
| Bajo consumo | Estados de PM, GPIO, procesador, Bluetooth, pantalla, interfaz de usuario y escenarios de dispositivos vestibles. Empiece por el mapa de tareas de [Ejemplos de bajo consumo del SDK](../../learn/low-power/low-power-sdk-examples.md). |
| Almacenamiento | Ejemplos de sistema de archivos, Flash, SD y particiones. |
| USB | Ejemplos de dispositivo y host CherryUSB. |
| IA | Ejemplos de NNACC HAL y RT-Device. |

</div>

## Puntos de partida representativos del SDK { #representative-sdk-starting-points }

Use esta tabla después de elegir el área correspondiente. Las rutas son orientativas y pueden cambiar entre versiones del SDK; antes de compilar, verifique el SDK, la placa de destino y la configuración seleccionados.

<div align="center"><em>Tabla: Puntos de partida representativos para ejemplos SF32 del SDK</em></div>

<div align="center" markdown>

| Objetivo de desarrollo | Ejemplo representativo del SDK | Qué comprobar primero | Continuar con |
|:---|:---|:---|:---|
| Entrada o salida GPIO | `example/hal/gpio`, `example/rt_device/gpio` | Multiplexación del pin, polaridad y comportamiento de interrupción en la placa real. | [Tutoriales para principiantes](../../getting-started/tutorials/beginner.md) |
| Consola e inspección del sistema | `example/system/finsh` | Consola serie, registros e inspección básica durante la ejecución. | [Tutoriales para principiantes](../../getting-started/tutorials/beginner.md) |
| ADC, PWM o RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | Configuración específica de pines, reloj y periféricos de la placa. | [Tutoriales para principiantes](../../getting-started/tutorials/beginner.md) |
| Sensor I2C | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | Conexión eléctrica, dirección del bus y fiabilidad de transferencias repetidas. | [Tutoriales intermedios](../../getting-started/tutorials/intermediate.md) |
| LVGL y pantalla del dispositivo | `example/multimedia/lvgl/lvgl_v8_examples` | Inicialización del panel, formato de píxel y estabilidad de la ruta de actualización de pantalla (flush) antes de crear interfaces complejas. | [Introducción a gráficos](../../learn/graphics/overview.md), [Controlador de pantalla](../../learn/graphics/display-controller.md) |
| Servicio de periférico BLE | `example/ble/peripheral`, `example/ble/hrpc` | Anuncios (advertising), conexión, una característica GATT y comportamiento de reconexión. | [Resumen de Bluetooth](../../learn/bluetooth/overview.md) |
| Reproducción de audio local | `example/multimedia/audio/local_music`, `mp3_sd_player` | Ruta de códec/placa, estabilidad del búfer y limpieza tras la reproducción. | [Resumen del audio local](../../learn/audio/overview.md) |
| Almacenamiento en Flash | `example/storage/littlefs/nor`, `example/storage/flashdb` | Montaje, lectura/escritura y recuperación tras un reinicio o cuando se llena el almacenamiento. | [Tutoriales intermedios](../../getting-started/tutorials/intermediate.md) |
| Comportamiento de bajo consumo | `example/pm/classical`, `example/pm/raise_wrist` | Corriente medida en estados definidos y funcionamiento correcto de las fuentes de activación. | [Introducción al bajo consumo](../../learn/low-power/overview.md) |
| OTA por BLE | `example/ble/peripheral_with_ota` | Recuperación ante interrupciones de actualización y rollback en el hardware de destino. | [Tutoriales avanzados](../../getting-started/tutorials/advanced.md) |
| Diagnóstico en tiempo de ejecución | `example/system/cpu_usage_profiler`, `example/system/coredump` | Obtener una traza de CPU reproducible o capturar un fallo antes de optimizar. | [Tutoriales avanzados](../../getting-started/tutorials/advanced.md) |

</div>

## Cómo elegir un ejemplo { #how-to-choose-an-example }

Siga este orden:

1. Elija la placa correspondiente.
2. Elija el framework correspondiente.
3. Elija el periférico más complejo.
4. Elija el middleware correspondiente.
5. Tenga en cuenta las restricciones de alimentación o memoria.

Por ejemplo, un producto de audio Bluetooth debería partir de un ejemplo de audio/Bluetooth y no de un `hello_world` básico, aunque este último sea más fácil de entender.

## Flujo de adaptación { #adaptation-workflow }

1. Compile y grabe el ejemplo sin modificar.
2. Guarde el comando de compilación que funcionó, el nombre de la placa, el comando de grabación, el puerto serie y el registro.
3. Realice un único cambio para el producto.
4. Vuelva a compilar y a probar.
5. Haga un commit o registre el cambio antes de añadir otro subsistema.

Este flujo es más lento durante la primera hora y mucho más rápido después del primer fallo difícil.

## Evidencias que conviene conservar { #evidence-to-keep }

Para cada ejemplo que se convierta en la base del producto, registre:

- Rama o versión del paquete del SDK.
- Nombre de la placa o FQBN.
- Opciones de configuración necesarias.
- Pines y periféricos requeridos.
- Salida serie esperada.
- Limitaciones conocidas.
- Huella de memoria, si está disponible.
- Comando de recuperación.

## Criterio para elegir un ejemplo { #example-selection-rule }

Elija el ejemplo que coincida con la parte más restringida del producto:

- Para productos Bluetooth, parta del perfil más cercano.
- Para productos con pantalla, parta de la ruta de pantalla y LVGL.
- Para productos alimentados por batería, parta de un ejemplo de bajo consumo.
- Para productos OTA, parta del flujo de actualización y del diseño de particiones.

Después, añada los demás subsistemas uno a uno.

## Itinerario de aprendizaje sugerido { #suggested-learning-path }

Si es la primera vez que usa el SDK, empiece con los [tutoriales para principiantes](../../getting-started/tutorials/beginner.md). Cuando un periférico funcione de manera estable, continúe con los [tutoriales intermedios](../../getting-started/tutorials/intermediate.md). Use los [tutoriales avanzados](../../getting-started/tutorials/advanced.md) para medir el consumo, trabajar con OTA, poner en marcha pantallas personalizadas, analizar fallos, gestionar varias conexiones Bluetooth y desarrollar drivers propios. Las introducciones a cada tema explican la arquitectura y los compromisos de diseño que hay detrás de esos ejemplos.
