---
icon: lucide/bluetooth
title: "Resumen de Bluetooth"
description: "Bluetooth en SF32: elección entre BLE y modo dual, diseño de servicios GATT, ajuste de parámetros de conexión, emparejamiento y seguridad, LE Audio y coexistencia."
tags:
  - Bluetooth
---

# Resumen de Bluetooth { #bluetooth-overview }

## Resumen { #overview }

Esta guía explica cómo planificar e implementar la conectividad Bluetooth en productos SF32. Se centra en las decisiones prácticas de diseño: elegir entre BLE y Bluetooth de modo dual, diseñar servicios GATT, seleccionar perfiles, ajustar los parámetros de conexión, definir el emparejamiento y la seguridad, evaluar LE Audio y gestionar la coexistencia con gráficos, audio y sensores.

SF32 separa el procesamiento de la aplicación de las tareas del controlador Bluetooth con requisitos estrictos de temporización. El procesador de aplicación suele ejecutar la lógica del producto y la interfaz de usuario; un procesador Bluetooth o de bajo consumo gestiona la temporización de la capa de enlace y la planificación de radio. La ubicación de la pila host y de los servicios GATT depende del dispositivo y de la configuración del SDK. No presuponga que todos los servicios se ejecutan en el procesador de aplicación: compruebe los núcleos utilizados y la comunicación entre ellos en el ejemplo elegido.

Para una explicación más profunda del subsistema subyacente, véase [Procesador Bluetooth](processor.md).

Consulte esta guía al definir el comportamiento inalámbrico del producto: qué roles y perfiles necesita, qué capacidad de respuesta y autonomía esperan los usuarios, y cómo deben repartirse las responsabilidades entre el teléfono, la radio y el firmware de aplicación. Es una guía de diseño, no sustituye las pruebas de interoperabilidad con los teléfonos y accesorios previstos.

## Defina los requisitos de conectividad del producto { #define-the-products-connectivity-requirements }

Antes de escribir cualquier código GATT, precise lo que el producto realmente necesita:

- ¿Solo BLE, o Bluetooth de modo dual (Bluetooth clásico + BLE)?
- ¿Audio Bluetooth: Bluetooth clásico (A2DP/AVRCP/HFP) o LE Audio?
- ¿Qué intervalo de conexión, latencia y caudal de datos necesita el producto?
- ¿Con qué frecuencia debe despertarse el procesador de aplicación y cuánto tiempo puede permanecer en reposo?
- ¿Debe interoperar con servicios existentes del teléfono (notificaciones, control multimedia y llamadas) o solo necesita una aplicación complementaria propia?
- ¿Qué alcance se espera? ¿Qué restricciones imponen la antena y la carcasa, y cuáles son los objetivos de certificación de RF?
- ¿Se distribuirán las actualizaciones de firmware por Bluetooth?

Estas respuestas orientan la elección del dispositivo, los ejemplos del SDK con los que empezar y cuánto tiempo puede mantenerse en reposo la CPU principal.

## Elija BLE, Bluetooth clásico o modo dual { #choose-ble-classic-or-dual-mode }

### Bluetooth de baja energía (BLE) { #bluetooth-low-energy-ble }

BLE suele ser la opción inicial más adecuada para la mayoría de los dispositivos portátiles y sensores conectados: el tráfico es intermitente y se activa por eventos, el consumo medio es bajo y cuenta con amplia compatibilidad con los sistemas operativos de teléfonos. Entre los productos centrados en BLE se incluyen pulseras de actividad, sensores de salud, balizas y enlaces de configuración o control con una aplicación complementaria.

### Bluetooth clásico y modo dual { #classic-bluetooth-and-dual-mode }

Añada Bluetooth clásico si el producto necesita transmisión de audio (A2DP/AVRCP), llamadas manos libres (HFP), enlaces de datos serie (SPP) o compatibilidad con perfiles Bluetooth clásicos existentes. El modo dual exige más planificación de radio y pruebas de coexistencia que BLE por sí solo. Precisamente para aislar esa carga del resto del sistema se utiliza el procesador Bluetooth dedicado.

No todos los dispositivos de la familia SF32 admiten Bluetooth de modo dual. Antes de elegir una referencia concreta, consulte la tabla de dispositivos de [Procesador Bluetooth](processor.md#device-family-differences).

## Elija el dispositivo SF32 adecuado { #pick-the-right-sf32-device }

Elija el dispositivo según el conjunto de funciones de conectividad que el producto necesita, no solo la velocidad de reloj.

<div align="center"><em>Tabla: Elija el dispositivo SF32 adecuado</em></div>

<div align="center" markdown>

| Requisito | Opción de dispositivo habitual |
|:------------|:-------------------------|
| Dispositivo portátil o sensor solo BLE | SF32LB55x |
| Solución Bluetooth de modo dual optimizada en costos (accesorio de audio, módulo) | SF32LB52x |
| Bluetooth de modo dual con pantalla e interfaz de usuario avanzadas | SF32LB56x |
| Bluetooth de modo dual con dos núcleos de aplicación para gráficos y audio local | SF32LB57x |
| Producto insignia que necesita Bluetooth + gráficos + IA + gran capacidad de memoria | SF32LB58x |
| Un núcleo de bajo consumo exclusivo para controlador Bluetooth es suficiente | SF32LB52x |
| Se necesitan tareas adicionales, siempre activas y programables por el usuario, en el núcleo de bajo consumo | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Contraste con los requisitos de pantalla, memoria e IA de las páginas [Resumen de Gráficos](../graphics/overview.md) y [Acelerador de IA](../ai/accelerator.md) si el producto necesita más que solo conectividad.

## Servicios GATT y el marco Sibles { #gatt-services-and-the-sibles-framework }

SiFli-SDK ofrece **Sibles** para registrar y utilizar servicios GATT. GATT define la jerarquía de servicios y características, así como el acceso a los atributos; GAP se ocupa de la publicidad, el descubrimiento de dispositivos, el establecimiento de conexiones y los roles correspondientes. Son responsabilidades complementarias: GATT no es una capa construida sobre GAP. Parta del ejemplo del SDK más cercano en lugar de crear una base de datos GATT desde cero.

El SDK incluye ejemplos de implementación de varios perfiles estándar y específicos del proveedor, como:

<div align="center"><em>Tabla: Servicios GATT y el marco Sibles</em></div>

<div align="center" markdown>

| Perfil / servicio | Uso habitual |
|:-------------------|:------------|
| **HRPC** (colector del perfil de frecuencia cardíaca) | Recibe mediciones de un sensor externo como cliente GATT; útil en productos de actividad física y seguimiento de la salud. |
| **DISS** (servicio de información del dispositivo) | Proporciona al teléfono el fabricante, el modelo y la versión del firmware. |
| **CTS** (servicio de hora actual) | Sincroniza la hora del teléfono con el dispositivo. |
| **BASC** / **CSCPC** / **CPPC** | Perfiles de cliente para batería, velocidad/cadencia de ciclismo y potencia ciclista, destinados a aplicaciones de actividad física. |
| **HID sobre GATT** | Emulación de teclados, controles remotos y otros dispositivos de entrada. |
| Cliente **ANCS** (Servicio de Centro de Notificaciones de Apple) | Lectura de notificaciones de iOS en el dispositivo. |
| Cliente **AMS** (Servicio de Medios de Apple) | Control de la reproducción de medios de iOS desde el dispositivo. |
| Perfil de transferencia serie | Transporte bidireccional de datos personalizado sobre BLE, similar al SPP en cuanto a función, pero basado en GATT. |

</div>

Reutilice el registro, la gestión de eventos y las comprobaciones de seguridad del ejemplo más cercano. Si implementa un perfil estándar, conserve sus UUID y comportamiento; si el modelo de datos del producto lo requiere, diseñe un servicio y UUID propios. El objetivo es reutilizar código de soporte probado, no encajar a la fuerza todos los protocolos de la aplicación en un perfil estándar.

## Perfiles de Bluetooth clásico { #classic-bluetooth-profiles }

Para productos de modo dual, el SDK incluye ejemplos de implementación para estos perfiles:

- **SPP**: datos seriales bidireccionales simples, útiles para aplicaciones complementarias heredadas o no basadas en GATT.
- **A2DP** (receptor y transmisor): transmisión de audio Bluetooth.
- **AVRCP**: control de reproducción (reproducir/pausar/pista/volumen) junto a un enlace A2DP.
- **HFP**: llamadas manos libres, con los roles HF (dispositivo manos libres) y AG (pasarela de audio). El [ejemplo HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) documentado implementa HF; compruebe por separado el soporte de AG en la configuración del SDK elegida.
- **PAN**: red sobre Bluetooth, incluyendo un ejemplo de entrega de OTA basado en PAN.

Los perfiles de audio y los perfiles heredados suelen exigir una temporización y un rendimiento más estrictos que los enlaces BLE sencillos. Reserve tiempo suficiente para las pruebas de coexistencia (véase [Coexistencia](#coexistence-with-other-workloads)).

## Audio Bluetooth y LE Audio { #bluetooth-audio-and-le-audio }

Existen dos rutas distintas dependiendo del enfoque de audio:

- **Audio Bluetooth clásico**: A2DP para transmisión, AVRCP para control de reproducción y HFP para llamadas. Es una tecnología madura y ampliamente compatible con teléfonos y auriculares existentes.
- **LE Audio**: el [perfil de audio básico (Basic Audio Profile, BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/) define los procedimientos para gestionar flujos LE Audio tanto unicast como de difusión. El SDK incluye ejemplos de fuente y receptor de difusión, además de un ejemplo que combina una fuente de difusión LE Audio con Bluetooth clásico para productos que necesitan admitir ambas tecnologías durante una transición.

Ambas rutas requieren temporización estable, gestión de búferes y transferencia fiable de muestras de audio, normalmente mediante DMA. Evalúe SF32LB52x/56x/58x según los roles de audio Bluetooth y las configuraciones del SDK que necesite el producto. SF32LB55x solo admite BLE y no ofrece audio Bluetooth clásico; esto no significa que carezca de funciones de audio local. Para DMA y búferes, consulte el [Resumen del audio local](../audio/overview.md) y [Procesador Bluetooth](processor.md#bluetooth-audio-and-le-audio).

## Patrón de implementación para servicios Sibles { #implementation-pattern-for-sibles-services }

Un servicio BLE mantenible generalmente sigue este patrón:

<div align="center"><em>Tabla: Patrón de implementación para servicios Sibles</em></div>

<div align="center" markdown>

| Paso | Responsabilidad del firmware | Punto de revisión |
|:-----|:------------------------|:-------------|
| Definir la interfaz del servicio | UUID, características, permisos, comportamiento de notificación. | Coincidir con los requisitos de la aplicación complementaria y de seguridad. |
| Registrar el servicio | Siga la vía de implementación Sibles/GATT del ejemplo de SDK más cercano. | Evite añadir código de registro de servicios específico para un único caso. |
| Limitar los anuncios BLE a lo necesario | Incluya solo los datos necesarios para el descubrimiento y la reconexión. | Mantenga pequeña y estable la carga útil de anuncios BLE. |
| Validar las escrituras | Compruebe la longitud, el estado, los permisos y la secuencia de comandos. | Evite que el tráfico de aplicación malformado desestabilice el firmware. |
| Notificar solo lo necesario | Envíe cambios o datos agrupados, no repita estados sin necesidad. | Ahorre tiempo de radio y energía en reposo. |
| Conservar el estado | Guarde de forma segura las claves de vinculación y los ajustes del producto. Mantenga las suscripciones CCCD por cliente: consérvelas entre conexiones para clientes vinculados y restablézcalas al valor predeterminado para los no vinculados. | Verifique la recuperación tras reinicios y OTA; gestione los cambios de la base de datos GATT sin restaurar a ciegas identificadores antiguos. |

</div>

Así se mantienen coherentes la definición del servicio, la interfaz con la aplicación móvil, la política de seguridad y el comportamiento energético.

## Parámetros de anuncios BLE y conexión { #advertising-and-connection-parameters }

Los parámetros de conexión y anuncios BLE son los principales ajustes para equilibrar la latencia, el caudal de datos y el consumo energético.

Estos parámetros describen enlaces BLE ACL, no todos los transportes de audio Bluetooth. El audio clásico utiliza la temporización de BR/EDR; LE Audio utiliza la temporización isócrona de CIS o BIS. No aplique directamente un intervalo de conexión GATT BLE a ninguna de esas rutas de audio. La [introducción a LE de Bluetooth SIG](https://www.bluetooth.com/bluetooth-le-primer/) explica la diferencia entre estos transportes.

<div align="center"><em>Tabla: Parámetros de anuncios BLE y conexión</em></div>

<div align="center" markdown>

| Parámetro | Efecto | Guía |
|:----------|:-------|:---------|
| Intervalo de anuncios BLE | Rapidez de descubrimiento frente al consumo de los anuncios | Use un intervalo corto durante una ventana limitada de descubrimiento rápido y después alárguelo mientras espera una conexión o reconexión. Una conexión establecida no exige por sí misma seguir emitiendo anuncios. |
| Intervalo de conexión | Tiempo de respuesta BLE ACL frente a consumo | Los intervalos más largos pueden reducir el consumo medio en enlaces con poco tráfico; los más cortos pueden mejorar la respuesta interactiva. Valide los parámetros negociados, la tasa de transferencia y la corriente con el teléfono de destino. |
| Latencia del periférico (slave latency en SDK anteriores) | Permite que el periférico omita eventos de conexión | Prolonga la autonomía en enlaces que suelen estar inactivos; ajústela a 0 cuando la baja latencia importe más que el consumo. |
| Tiempo de supervisión de la conexión | Tiempo máximo sin recibir un paquete de datos válido de la capa de enlace antes de declarar perdida la conexión | Un valor demasiado corto provoca desconexiones con una señal RF débil; uno demasiado largo retrasa la reconexión tras una pérdida real. |
| Potencia TX | Alcance frente a energía y coexistencia | Parta del ajuste más bajo que cumpla el alcance necesario. Mida la energía total, las retransmisiones y la coexistencia en la carcasa final: un ajuste menor puede no ser más eficiente si provoca retransmisiones frecuentes. |

</div>

Los productos tipo beacon (con anuncios compatibles con iBeacon) y los casos de anuncios periódicos —incluida la sincronización para difusiones a gran escala o unidireccionales— se cubren con ejemplos específicos del SDK y no requieren una conexión GATT completa.

El intervalo de conexión, la latencia del periférico y el tiempo de supervisión deben formar una combinación válida aceptada por el controlador y el otro dispositivo. Solicitar una actualización no demuestra que se haya aplicado: registre los valores negociados y pruebe el teléfono o accesorio real, incluidos el rechazo de solicitudes y el regreso a los ajustes de reposo.

## Preajustes de parámetros por fase del producto { #parameter-presets-by-product-phase }

Use diferentes parámetros de Bluetooth para diferentes fases en lugar de un único ajuste de compromiso:

<div align="center"><em>Tabla: Preajustes de parámetros por fase del producto</em></div>

<div align="center" markdown>

| Fase | Objetivo típico | Ajuste recomendado |
|:------|:-------------|:--------------------|
| Descubrimiento inicial | Detección rápida | Intervalo de anuncios BLE corto, identidad clara del dispositivo y duración limitada. |
| Reconexión | Menor consumo medio | Tras el tiempo de espera, alargue el intervalo de anuncios BLE; use un modo dirigido o filtrado cuando corresponda. |
| Control interactivo | Baja latencia | Intervalo de conexión más corto y latencia del periférico baja o igual a cero. |
| Conectado en reposo | Autonomía de la batería | Intervalo de conexión más largo, latencia del periférico distinta de cero y notificaciones mínimas. |
| Transferencia OTA por BLE | Caudal de datos y fiabilidad | Intervalo corto, latencia del periférico a cero y tiempo de espera de supervisión conservador. |
| Audio | Temporización estable | Parámetros elegidos en torno a la temporización de cuadro del códec y la profundidad del búfer. |

</div>

Documente las transiciones entre fases. Muchos problemas de consumo o latencia Bluetooth que parecen «aleatorios» se deben a que el producto permanece en la fase equivocada después de un cambio de estado.

## Emparejamiento, vinculación y seguridad { #pairing-bonding-and-security }

BLE puede establecer una conexión sin emparejamiento. El emparejamiento genera claves de seguridad; la vinculación las conserva para conexiones posteriores. Determine qué servicios requieren cifrado, autenticación y vínculos persistentes, en lugar de exigir vinculación para todos los productos:

- Decida desde el principio si necesita Just Works, introducción de un código de emparejamiento o comparación numérica. Just Works no protege frente a ataques de intermediario (MITM): una conexión cifrada no está necesariamente autenticada. Elija el método según las capacidades de E/S de ambos dispositivos y los requisitos de seguridad del producto; consulte los [requisitos de seguridad de Bluetooth GAP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-60/out/en/host/generic-access-profile.html).
- En [ANCS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html), la autorización del usuario en el teléfono es independiente del cifrado del enlace y de la vinculación; gestione su denegación o revocación. Tanto ANCS como [AMS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleMediaService_Reference/Specification/Specification.html) pueden aparecer o desaparecer durante una conexión. Supervise Service Changed y vuelva a descubrir el servicio: el emparejamiento no garantiza su disponibilidad permanente.
- Almacene los datos de vinculación según el enfoque de almacenamiento/partición recomendado por el SDK para conservarlos tras reinicios y actualizaciones OTA.
- Defina un proceso para volver a emparejar y olvidar el dispositivo, tanto en la interfaz del producto como en el teléfono.
- Trate la política de seguridad (requisitos de cifrado, capacidad de E/S, tamaño de clave) como una decisión de producto, no como un valor predeterminado sin examinar.

## Conexiones múltiples y roles { #multi-connection-and-roles }

El SDK incluye ejemplos de **operación simultánea como central y periférico** y de **varias conexiones concurrentes**. Un producto puede conectarse al teléfono como periférico BLE y a un sensor como central, o mantener varias conexiones con dispositivos complementarios. Verifique la combinación de roles y el límite de conexiones para el dispositivo, firmware del controlador, configuración del SDK, búferes y carga de radio conjunta elegidos; un ejemplo no garantiza la misma capacidad en toda la familia.

Si el producto debe acercarse al límite de caudal de datos del enlace, use el ejemplo de rendimiento del SDK como referencia antes de atribuir la limitación al código de la aplicación.

## Actualizaciones de firmware OTA sobre Bluetooth { #ota-firmware-updates-over-bluetooth }

Existen dos rutas de entrega comunes:

- **Actualizaciones tipo DFU sobre BLE**, integradas en una conexión periférica (el ejemplo `peripheral_with_ota` muestra cómo integrar la OTA en el rol GATT habitual de un periférico).
- **PAN OTA**, entregando firmware a través de un enlace de red Bluetooth PAN para productos de modo dual que ya usan PAN para datos.

En ambos casos, planifique y pruebe las particiones, la recuperación ante fallos y la reversión antes del lanzamiento. Para OTA por BLE, evalúe un intervalo de conexión más corto y una latencia del periférico de cero durante la transferencia; después, restablezca los ajustes normales de ahorro energético. PAN OTA utiliza Bluetooth clásico: ajuste su rendimiento y recuperación por separado, sin aplicar los parámetros de conexión de BLE.

## Coexistencia con otras cargas de trabajo { #coexistence-with-other-workloads }

Bluetooth rara vez funciona de forma aislada en SF32: comparte recursos con gráficos, audio, sensores y, en algunos productos, Wi-Fi externo. El procesador Bluetooth dedicado absorbe gran parte de la carga de temporización del enlace, pero también hay que gestionar la coexistencia en la aplicación:

- Las secciones críticas largas o las interrupciones deshabilitadas en el procesador de aplicación pueden retrasar el manejo de Bluetooth del lado del host.
- El tráfico de pantalla y PSRAM compite por el ancho de banda de memoria con los búferes de audio Bluetooth.
- Si las interrupciones de los sensores despiertan con demasiada frecuencia el procesador de aplicación, se pierde el ahorro de mantenerlo en reposo mientras el procesador Bluetooth gestiona el enlace.

Consulte [Coexistencia con otras cargas de trabajo](processor.md#coexistence-with-other-workloads) para conocer la perspectiva del sistema y pruebe combinaciones exigentes pero realistas —por ejemplo, pantalla y audio activos junto con un enlace BLE con mucho tráfico—, no cada subsistema por separado.

## Preparación para RF, interoperabilidad y certificación { #rf-interoperability-and-certification-readiness }

El firmware Bluetooth debe validarse con la misma disciplina que el hardware de RF:

- Pruebe con teléfonos de distintos fabricantes, varias versiones de SO y distintos escenarios de reconexión; no se limite a un único teléfono de desarrollo.
- Verifique el comportamiento cuando haya datos de vinculación obsoletos, al usar «Olvidar dispositivo» en el teléfono, después de restablecer el dispositivo de fábrica y tras una actualización OTA.
- Valide el alcance y la estabilidad de los paquetes con el producto dentro de su carcasa final, con la batería, la pantalla y el cargador instalados, y en las distintas posiciones en que el usuario lo llevará o sujetará.
- Mantenga disponibles los modos de prueba de RF, el acceso de calibración y los registros para soporte de producción y certificación.
- Para productos ricos en perfiles, reserve tiempo para pruebas de calificación/perfil; pasar una aplicación de demostración no es lo mismo que ser interoperable.

## Depuración de problemas de Bluetooth { #debugging-bluetooth-issues }

<div align="center"><em>Tabla: Depuración de problemas de Bluetooth</em></div>

<div align="center" markdown>

| Síntoma | Área probable que revisar |
|:--------|:----------------------|
| Descubrimiento lento o poco confiable | Intervalo/tipo de anuncios BLE, diseño de RF, adaptación de antena. |
| Desconexiones frecuentes pese a una buena calidad de RF | Tiempo de espera de supervisión demasiado corto, desajuste de intervalo de conexión, interferencia de coexistencia. |
| Alto consumo a pesar de una conexión «inactiva» | Latencia del periférico no configurada, procesador de aplicación despertado con demasiada frecuencia, tráfico GATT innecesario. |
| Cortes o interrupciones de audio | Agotamiento del búfer DMA (underrun), competencia por recursos con el tráfico de pantalla/PSRAM o problemas de temporización o configuración propios del transporte (BR/EDR para audio clásico; CIS/BIS para LE Audio). |
| El emparejamiento falla de forma intermitente | Problemas al almacenar los datos de vinculación, desajuste de capacidad de E/S o datos de vinculación obsoletos en uno de los dispositivos. |
| Buen alcance en banco de pruebas, pero deficiente en la carcasa | Desajuste de la antena causado por la carcasa, la batería o la PCB; ajuste de potencia TX y red de adaptación de RF. |

</div>

## Errores comunes { #common-mistakes }

- Elegir hardware solo BLE después de que el producto ya necesita audio Bluetooth clásico.
- Reimplementar innecesariamente el código de soporte de los servicios o forzar un modelo de datos propio en un perfil estándar inadecuado.
- Dejar en 0 la latencia del periférico en enlaces que pasan la mayor parte del tiempo inactivos.
- Ignorar las pruebas de coexistencia hasta la integración tardía, cuando pantalla/audio/Bluetooth se combinan por primera vez.
- Tratar el emparejamiento/vinculación como algo secundario en lugar de un flujo de UX diseñado.
- Omitir la validación de puesta en marcha de RF (antena, red de adaptación, precisión del cristal) hasta las revisiones finales de PCB.
- Asumir que el ajuste solo por firmware puede compensar un diseño de RF deficiente.

## Lista de comprobación de puesta en marcha { #bring-up-checklist }

- [ ] Confirme el requisito solo BLE frente a modo dual y seleccione el dispositivo SF32 correspondiente.
- [ ] Identifique los ejemplos de perfil/servicio de SDK más cercanos para el caso de uso del producto.
- [ ] Defina los objetivos de los parámetros de anuncios BLE y conexión para el descubrimiento, el uso activo y los estados inactivos.
- [ ] Diseñe la experiencia de emparejamiento, vinculación y olvido del dispositivo.
- [ ] Valide el diseño de RF, la adaptación de la antena y la precisión del cristal en hardware real.
- [ ] Pruebe los perfiles elegidos (servicios GATT, A2DP/AVRCP/HFP o difusión LE Audio) con un teléfono real o un host de referencia.
- [ ] Pruebe la coexistencia con cargas de pantalla, audio y sensores bajo una combinación de carga realista.
- [ ] Planifique y pruebe la ruta de entrega de OTA si las actualizaciones de firmware se distribuirán por Bluetooth.
- [ ] Mida el consumo en reposo con una conexión activa y confirme que el procesador de aplicación entra en reposo según lo previsto.

## Conclusiones clave { #key-takeaways }

- Decida primero si el producto necesita BLE o Bluetooth de modo dual: esta elección determina el dispositivo y gran parte del camino de desarrollo con el SDK.
- Parta de los servicios GATT y ejemplos existentes del SDK para perfiles de Bluetooth clásico (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP y PAN), en lugar de crear una implementación desde cero.
- El intervalo de conexión, la latencia del periférico, el tiempo de espera de supervisión y la potencia TX son los principales ajustes para equilibrar latencia, caudal de datos y consumo.
- Para audio Bluetooth, verifique el rol clásico o LE Audio requerido en el dispositivo y la configuración del SDK elegidos; después diseñe y pruebe los búferes y la coexistencia. Una afirmación sobre toda la familia no sustituye esta comprobación.
- Bluetooth es una cuestión de sistema: el diseño de RF, los relojes, la experiencia de emparejamiento y la coexistencia con gráficos, audio y sensores importan tanto como el propio código GATT.

Para un mapa orientado a tareas de los proyectos actuales del SDK para Bluetooth clásico, BLE y LE Audio, véase [Ejemplos de SDK de Bluetooth](bluetooth-sdk-examples.md).

Para un método práctico de medir y analizar el consumo de Bluetooth de un dispositivo, véase [Medición y análisis del consumo energético de Bluetooth](bluetooth-low-power-profiling.md).
