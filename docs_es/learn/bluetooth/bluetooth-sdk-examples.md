---
icon: lucide/bluetooth-connected
title: "Ejemplos de SDK de Bluetooth"
description: "Elija el ejemplo de SiFli-SDK más adecuado para servicios BLE, perfiles de Bluetooth clásico, integración con teléfonos, OTA, transferencia de datos o difusión LE Audio."
tags:
  - Bluetooth
  - Ejemplos
---

# Ejemplos de SDK de Bluetooth { #bluetooth-sdk-examples }

Los ejemplos Bluetooth del SiFli-SDK son puntos de partida para validar un perfil, un rol o un flujo de radio concreto; no constituyen firmware listo para integrar en un producto. Empiece por el proyecto que cubra el requisito técnico más exigente del producto, consiga que el ejemplo sin modificar funcione en la placa de destino y, después, añada los requisitos del producto de uno en uno.

Esta página clasifica por tarea de ingeniería los ejemplos de [Bluetooth clásico](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html) y [difusión LE Audio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) incluidos en la documentación de SF32LB58x. La ruta `sf32lb58x` indica dónde se publica la documentación; no garantiza que todos los ejemplos sean compatibles con todas las placas SF32LB58x ni con otras familias SF32. La URL `latest` cambia con el tiempo. Para la versión o el commit del SDK que vaya a usar, consulte la sección **Supported Platforms** de cada proyecto y siga únicamente los nombres de placa y las instrucciones de compilación que allí se indiquen. Si no se establece explícitamente la compatibilidad con la placa y la revisión del SDK concretas, márquela como **no verificada**; no la deduzca de la URL, de otro ejemplo ni de una placa con nombre parecido. Incluso si la página indica «all platforms», compruebe el ejemplo con la revisión real del SDK y la configuración de la placa antes de integrarlo en el producto. Consulte también la página del proyecto para los ajustes de `menuconfig`, el equipo de prueba y las limitaciones.

## Elija el flujo de Bluetooth adecuado { #start-with-the-right-bluetooth-path }

<div align="center"><em>Tabla: selección de ejemplos del SDK de Bluetooth</em></div>

<div align="center" markdown>

| Necesidad del producto | Ejemplo recomendado | Qué validar antes de integrarlo |
|:-------------|:-----------|:-------------------------------------|
| Un servicio BLE personalizado o la conexión con una aplicación complementaria | [Periférico BLE (BLE Peripheral)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Anuncios BLE, conexión, interfaz y comportamiento del servicio, reconexión y validación con el teléfono |
| El dispositivo debe actuar a la vez como periférico del teléfono y central del sensor | [Central y periférico BLE (BLE Central and Peripheral)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Funcionamiento simultáneo de los roles GAP y reparto de funciones entre cliente y servidor GATT |
| Transferencia de datos BLE confiable | [Rendimiento de transferencia BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) o [Transferencia de archivos BLE (BLE File Transfer)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | El flujo de carga útil requerido, los ajustes de conexión y el comportamiento de recuperación |
| Actualización de firmware por Bluetooth | [Periférico con OTA (Peripheral with OTA)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) o [Central y periférico con OTA Pingpong (Central and Peripheral with Pingpong OTA)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Roles de actualización, recuperación si la actualización se interrumpe, particiones y plan de reversión |
| Comunicación serie o conexión de red a través del teléfono con Bluetooth clásico | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) o [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | Si el perfil serie o la conexión de red del teléfono se ajustan al producto, además de la compatibilidad con el dispositivo par y la reconexión |
| Transporte HCI por UART entre el host y un controlador BT/BLE | [HCI sobre UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | La separación entre host y controlador, el transporte UART y la configuración del controlador y la placa de destino |
| Audio o llamadas mediante Bluetooth clásico | [Receptor de música (Music Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Fuente de música (Music Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) o [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Ruta de audio, sincronización de reloj, gestión de búferes, interoperabilidad con el teléfono y presupuesto de consumo |
| Difusión LE Audio | [Fuente de difusión BAP (BAP Broadcast Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) o [Receptor de difusión BAP (BAP Broadcast Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | El rol de difusión, la cadena de procesamiento de audio, un receptor o transmisor de prueba y el margen de temporización |

</div>

## Use el ejemplo como referencia de validación { #bring-up-an-example-as-evidence }

Antes de cambiar el proyecto, registre la versión exacta del SDK, el nombre de la placa, la configuración, el dispositivo par o la aplicación, los ajustes de radio y los mensajes de registro esperados. Luego siga esta secuencia:

1. Compile y grabe en la placa el ejemplo sin modificar, usando el nombre exacto de la placa y las instrucciones indicadas para la versión del SDK correspondiente. Si no se ha establecido la relación entre esa documentación y la revisión del SDK, o no consta que la placa sea compatible, trate la compatibilidad como no verificada antes de adaptar el ejemplo.
2. Compruebe el comportamiento inalámbrico principal: descubrimiento, conexión, transferencia, transmisión o recepción, según corresponda.
3. Repita la prueba después de reiniciar, desconectar, reconectar y apagar y volver a encender el dispositivo.
4. Añada de uno en uno los servicios, recorridos de usuario, rutas de audio o políticas de consumo específicos del producto.
5. Vuelva a probar con la carga combinada del producto, incluidos la pantalla, los sensores, el almacenamiento, el audio y las transiciones a estados de bajo consumo cuando corresponda.

Un ejemplo funcional solo demuestra el flujo que cubre. No acredita que la política de seguridad, el alcance de radio, la latencia, el consumo o la interoperabilidad del producto estén listos para su lanzamiento.

## Ejemplos BLE { #ble-examples }

Use los ejemplos BLE para enlaces de aplicación complementaria, servicios GATT interoperables, beacons, transferencia de datos y OTA basado en BLE. Seleccione primero un ejemplo orientado a roles y luego añada un ejemplo de perfil solo cuando el producto necesite ese servicio estandarizado.

<div align="center"><em>Tabla: ejemplos del SDK BLE por tarea de ingeniería</em></div>

<div align="center" markdown>

| Tarea de ingeniería | Ejemplos oficiales | Qué validar con estos proyectos |
|:-----------------|:------------------|:--------------------------------|
| Roles básicos y acceso a servicios | [Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central y periférico (Central and Peripheral)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Multi-Connection](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Anuncios BLE, escaneo, gestión de las conexiones y asignación correcta de los roles central y periférico |
| Integración con teléfono | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [ANCS en dos núcleos (Dual-Core ANCS)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Integración de medios o notificaciones de Apple y el flujo de emparejamiento requerido del lado del teléfono |
| Perfiles GATT estándar | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | Rol del servicio, especificación de las características GATT e interoperabilidad del perfil estándar con el dispositivo par |
| Dispositivos de entrada y comunicación por voz | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [Intercomunicador BLE (BLE Talkback)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | Modelo de interacción antes de añadir la interfaz de usuario o las funciones de voz del producto |
| Emparejamiento y reconexión | [Emparejamiento BLE (BLE Pair)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Vinculación, gestión de identidad y proceso de nuevo emparejamiento del producto |
| Anuncios y descubrimiento | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Anuncios periódicos (Periodic Advertising)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Sincronización de anuncios periódicos (Periodic Advertising Sync)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | El comportamiento de difusión o sincronización requerido sin asumir una conexión GATT |
| Transferencia de datos y OTA | [Transferencia de archivos (File Transfer)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Rendimiento de transferencia](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Periférico con OTA (Peripheral with OTA)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central y periférico con OTA Pingpong (Central and Peripheral with Pingpong OTA)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Carga útil, parámetros de enlace, roles de actualización, recuperación tras una interrupción de la transferencia y validación de extremo a extremo |

</div>

No interprete el resultado de una prueba de throughput como la tasa de datos que alcanzará el producto. Esta depende de la PHY seleccionada, los parámetros de conexión, el comportamiento del dispositivo par, el entorno de RF, la actividad del host y el patrón de carga útil. Del mismo modo, los ejemplos ANCS y AMS sirven como referencia para la integración con el teléfono, pero no garantizan el mismo comportamiento en todas las versiones de iOS ni con cualquier configuración de permisos.

## Ejemplos de Bluetooth clásico { #classic-bluetooth-examples }

Los proyectos de Bluetooth clásico son adecuados para productos que necesitan perfiles BR/EDR, audio, transporte serie o conexión IP a través de un teléfono. Una demostración satisfactoria en una placa de desarrollo es solo el punto de partida; valide la interoperabilidad con los dispositivos pares y las cargas de trabajo reales del producto.

<div align="center"><em>Tabla: Ejemplos de Bluetooth clásico del SDK por tarea</em></div>

<div align="center" markdown>

| Tarea de ingeniería | Ejemplos oficiales | Qué validar con estos proyectos |
|:-----------------|:------------------|:--------------------------------|
| Transporte host/controlador o perfil serie de Bluetooth clásico | [HCI sobre UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | La separación entre host y controlador y el transporte UART de HCI, o el comportamiento del perfil serie SPP |
| Transmisión de audio y control de medios | [Conexión múltiple A2DP (A2DP Multi-Connection)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [Audio compartido A2DP (A2DP Sharing)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [Carátula de álbum AVRCP (AVRCP Cover Art)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Receptor de música (Music Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Receptor de música con retransmisión (Music Sink with Relay)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Fuente de música (Music Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | La topología prevista de fuente y receptor, la ruta de audio, la ruta de control de medios y el presupuesto de recursos |
| Llamadas y enlaces de voz | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [Retransmisión HFP (HFP Relay)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Topología de llamada, latencia de audio, ruta de micrófono/altavoz y comportamiento del teléfono |
| Conectividad compartida por el teléfono y OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Uso compartido de la conexión del teléfono, tráfico IP, reconexión y ruta de actualización OTA |

</div>

Para el modelo de red PAN y la configuración del teléfono, consulte [Bluetooth PAN](pan.md). Para el enrutamiento de audio, la gestión de búferes y la validación bajo carga del sistema, consulte el [Resumen del audio local](../audio/overview.md) y el [Audio Server y gestión de búferes](../audio/audio-server-buffering.md).

## Ejemplos de difusión LE Audio { #le-audio-broadcast-examples }

La ruta de documentación `sf32lb58x` no demuestra por sí sola que una placa sea compatible; consulte **Supported Platforms** para la revisión exacta del SDK y la placa de destino. En el ejemplo que conecta Bluetooth clásico con BAP, el título del README identifica un emisor, pero la ruta y el resumen describen un receptor. La [implementación en la revisión del SDK examinada](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) gestiona Classic A2DP e inicia un emisor de difusión BAP; esta comprobación corresponde solo al commit enlazado y no se aplica automáticamente a todas las versiones publicadas como `latest`. Antes de compilar, revise el README, el código fuente y la configuración de la placa para la versión o el commit exactos del SDK que vaya a usar. No deduzca el rol ni la compatibilidad de la placa a partir de la descripción copiada del receptor.

Los proyectos `zbt` incluyen ejemplos de fuente y receptor de difusión LE Audio basados en el [perfil de audio básico (Basic Audio Profile, BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Trate la fuente y el receptor como una prueba de sistema conjunta: la configuración de difusión, la fuente de audio, el receptor, la sincronización de reloj y las condiciones de RF influyen en el resultado observado.

<div align="center"><em>Tabla: Ejemplos del SDK de difusión LE Audio</em></div>

<div align="center" markdown>

| Escenario de uso | Ejemplo oficial | Qué validar primero |
|:------------------|:-----------------|:------------------------|
| Recibir un flujo de audio de difusión | [Receptor de difusión BAP (BAP Broadcast Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Comportamiento del receptor, ruta de audio de salida y la configuración de difusión de prueba |
| Transmitir un flujo de audio de difusión | [Fuente de difusión BAP (BAP Broadcast Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Cadena de procesamiento de audio de la fuente, configuración de difusión y un receptor cuya compatibilidad ya esté verificada |
| Puente entre Bluetooth clásico y la difusión LE Audio | [Fuente de difusión BAP con Bluetooth clásico (BAP Broadcast Source with Classic Bluetooth)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | Los dos dominios de audio, su punto de transición y el margen combinado de temporización y recursos |

</div>

## Validar el producto más allá del ejemplo { #product-validation-beyond-the-example }

<div align="center"><em>Tabla: verificaciones para adaptar los ejemplos Bluetooth al producto</em></div>

<div align="center" markdown>

| Aspecto | Conserve del ejemplo de origen | Vuelva a validar para el producto |
|:---------|:---------------------------------|:----------------------------|
| Comportamiento de radio | La placa compatible y el rol o perfil previsto del ejemplo | Antena, carcasa, alcance, coexistencia de RF, dispositivos pares y plan de ensayos de conformidad normativa |
| Política de conexión | El flujo base de anuncios BLE, escaneo o conexión | Latencia objetivo, consumo objetivo, estrategia de reconexión y transiciones de estado |
| Seguridad | La configuración de emparejamiento o vinculación del ejemplo | Requisitos de autenticación, almacenamiento de claves, privacidad, restablecimiento de fábrica y recuperación orientada al usuario |
| Datos y audio | El flujo de paquetes o de transmisión demostrado | Formato y reglas de intercambio de datos, recuperación de errores, latencia, gestión de búferes, configuración del códec y margen de memoria |
| Evidencias de validación | Ajustes de compilación, registros y comportamiento esperado | Matriz reproducible de teléfonos y accesorios, registro temporal del consumo, recuperación tras una desconexión y pruebas de regresión |

</div>

## Recursos relacionados { #related-resources }

- [Resumen de Bluetooth](overview.md) para decisiones de rol, perfil, seguridad, parámetros de conexión y coexistencia a nivel de producto.
- [Procesador Bluetooth](processor.md) para los límites entre host y controlador y el comportamiento energético.
- [Bluetooth PAN](pan.md) para redes IP ancladas al teléfono y OTA basado en PAN.
- [Ejemplos de audio del SDK](../audio/audio-sdk-examples.md) para ejemplos de captura local, códec y reproducción que complementan el trabajo de audio Bluetooth.
- [Ejemplos](../../develop/examples/index.md) para el catálogo de ejemplos de SDK entre dominios.
