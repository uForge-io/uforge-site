---
icon: lucide/network
description: "Bluetooth PAN en SF32: transporte BNEP, roles NAP/GN/PANU, ventajas y límites de la conexión compartida del teléfono, configuración de SiFli-SDK y validación OTA."
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## Resumen { #overview }

**Bluetooth PAN** (Personal Area Networking, red de área personal) permite que un dispositivo SF32 acceda a una red IP mediante un enlace Bluetooth clásico; para acceder a Internet, normalmente usa el servicio de conexión compartida del teléfono. Así puede evitarse una radio Wi-Fi dedicada. PAN es uno de los perfiles de Bluetooth clásico descritos en el [Resumen de Bluetooth](overview.md#classic-bluetooth-profiles) y una de las opciones de transporte OTA explicadas en [OTA y DFU](../../develop/firmware-topics/ota-dfu.md).

Considere PAN para tráfico IP intermitente o moderado, como consultas del tiempo, sincronización horaria, llamadas a API en la nube, tráfico de un asistente de voz y descargas de firmware. PAN puede evitar un subsistema Wi-Fi dedicado cuando el coste, el espacio en la placa, el esfuerzo de integración y el consumo de este superan su valor para el caso de uso. Evalúe los requisitos de conformidad RF aplicables al hardware elegido y al producto final.

## Cómo funciona Bluetooth PAN { #how-bluetooth-pan-works }

El Bluetooth SIG define PAN como un perfil de Bluetooth clásico (BR/EDR). PAN transporta paquetes con formato Ethernet por un enlace ACL de Bluetooth mediante **BNEP** (Bluetooth Network Encapsulation Protocol), que funciona sobre L2CAP, no sobre RFCOMM. PAN requiere BR/EDR y una implementación PAN compatible, pero no exige compatibilidad con BLE. Por tanto, también puede implementarse en hardware que solo admita Bluetooth clásico.

PAN no funciona sobre BLE. Sin embargo, el perfil independiente [Internet Protocol Support Profile (IPSP)](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/) permite transmitir IPv6 por BLE. Esta capacidad del protocolo no demuestra que SiFli-SDK o el servicio de punto de acceso de un teléfono implementen IPSP. La comparación de BLE que aparece a continuación se refiere a una app que retransmite datos GATT, no a IPSP.

El perfil define tres roles:

<div align="center"><em>Tabla: Roles de Bluetooth PAN</em></div>

<div align="center" markdown>

| Rol | Función |
|:-----|:---------|
| **NAP** (Network Access Point, punto de acceso a la red) | El NAP conecta los dispositivos Bluetooth a una red externa y reenvía paquetes entre la piconet Bluetooth y esa red. Normalmente, el teléfono desempeña este papel cuando comparte su conexión o activa el punto de acceso personal. |
| **PANU** (PAN User, usuario PAN) | Rol de cliente. Se conecta a un dispositivo NAP (o GN) y utiliza su acceso a la red. Los dispositivos SF32 usan este rol. |
| **GN** (Group Ad-hoc Network, red ad hoc de grupo) | Reenvía paquetes entre los dispositivos PANU conectados, pero no proporciona acceso a redes externas. Se usa para crear redes ad hoc entre dispositivos, no para acceder a Internet. |

</div>

El PANU puede descubrir dispositivos cercanos mediante Inquiry y consultar por SDP su servicio PAN y su rol. La indicación Networking de Class of Device es una pista para el descubrimiento, no una prueba de que exista un servicio NAP utilizable. Tras establecer ACL y BNEP sobre L2CAP, el NAP reenvía el tráfico a la red externa mediante el puente o el enrutamiento de su implementación. Puede ser un teléfono o una pasarela LAN, como describe la [especificación PAN](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/). Cualquier extremo puede terminar la conexión; en el diseño con conexión compartida del teléfono que se describe aquí, cambiar el estado de esa función puede exigir una reconexión.

## Por qué usar PAN en lugar de Wi-Fi { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>Tabla: PAN, Wi-Fi y BLE para acceder a la red</em></div>

<div align="center" markdown>

| Enfoque | Cuándo conviene | Consideraciones |
|:---------|:---------------|:---------|
| Bluetooth PAN | El producto ya utiliza Bluetooth de modo dual, necesita tráfico IP intermitente o moderado y suele tener cerca el teléfono emparejado. | La tasa de transferencia y el alcance dependen de BR/EDR y de la conexión ascendente del NAP. Un diseño que use la conexión compartida del teléfono depende de ese teléfono; otras arquitecturas pueden usar una pasarela NAP independiente. |
| Radio Wi-Fi dedicada | El producto necesita una tasa de transferencia alta y sostenida o conectividad independiente del teléfono. | Añade radio, antena, trabajo de integración y presupuesto de consumo. Evalúe los requisitos de conformidad RF aplicables a la radio o módulo elegido y al producto final. |
| BLE GATT → app complementaria → Internet | El producto intercambia pocos datos y la app puede reenviarlos a la nube. | Esta retransmisión personalizada no proporciona una conexión IP directa al dispositivo. BLE IPSP es otra opción, cuya compatibilidad debe comprobarse tanto en la pila del dispositivo como en la pasarela; no es PAN. |

</div>

Si el producto ya incorpora Bluetooth de modo dual para audio, servicios GATT o perfiles de Bluetooth clásico, PAN suele ser una forma de añadir acceso a Internet con un coste incremental bajo, sin incorporar un segundo subsistema de radio. Esto solo conviene si el caso de uso admite depender de un teléfono cercano que pueda compartir su conexión.

## Transporte de datos en iOS: retransmisión BLE, Bluetooth clásico y PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

Conviene distinguir tres diseños de conectividad para iPhone. Afirmar sin matices que «Bluetooth clásico requiere MFi» es demasiado general: iOS admite perfiles Bluetooth estándar y el Punto de Acceso Personal también puede usar Bluetooth. La restricción se aplica cuando una app de iOS necesita un **canal de datos personalizado** con un accesorio Bluetooth clásico mediante la ruta External Accessory/iAP de Apple. Apple documenta que External Accessory se comunica por Bluetooth con accesorios MFi; en su [pregunta técnica](https://developer.apple.com/library/archive/qa/qa1657/_index.html), aclara que los accesorios BLE usan Core Bluetooth y no necesitan cumplir los requisitos de MFi.

<div align="center"><em>Tabla: Opciones de conectividad a Internet entre accesorios e iOS</em></div>

<div align="center" markdown>

| Diseño | Ruta del dispositivo al teléfono | Implicaciones para el producto en iOS | Caudal de Internet y consideraciones técnicas |
|:-------|:---------------------|:------------------------|:--------------------------------------------|
| BLE → app → Internet | Protocolo GATT personalizado; la app de iOS recibe los datos del dispositivo y los reenvía a la nube. | BLE puede usar Core Bluetooth sin la ruta MFi de External Accessory. La app debe gestionar el emparejamiento, el formato de las tramas, los reintentos, el funcionamiento en segundo plano y la retransmisión a la nube. | La capacidad de carga útil de BLE y la planificación de las comunicaciones dependen de los parámetros de conexión y del comportamiento de iOS y de la app. Esta ruta suele servir para pocos datos enviados de forma intermitente, pero no es una conexión IP general y puede convertirse en un cuello de botella si el tráfico es continuo o abundante. |
| Bluetooth clásico personalizado → aplicación | Canal de datos personalizado entre un accesorio Bluetooth clásico y una app de iOS. | El [framework External Accessory](https://developer.apple.com/documentation/externalaccessory) está destinado a accesorios MFi; Apple indica que solo funciona con hardware MFi. Los perfiles estándar compatibles son un caso distinto. | Esta ruta requiere un accesorio MFi y su protocolo de accesorio compatible, además de integrar la app y validar el producto. Por sí sola, no proporciona conectividad IP directa al dispositivo. |
| Bluetooth PAN → punto de acceso del teléfono → Internet | Conexión PANU-NAP estándar; SF32 usa el servicio de Punto de Acceso Personal o de conexión compartida por Bluetooth del teléfono. | El dispositivo utiliza la conexión compartida del teléfono, no un canal personalizado entre la app y el accesorio. El producto también debe validar el teléfono, el operador y el funcionamiento de la conexión compartida. | SF32 ejecuta su propio cliente IP sin una app intermediaria. Esto no demuestra una ventaja de velocidad ni de consumo energético frente a BLE. Compare el caudal útil, el tiempo de actualización y la energía consumida en los teléfonos previstos, con los mismos datos y servidor. Los resultados dependen del enlace Bluetooth, las políticas del teléfono, la red de salida y el servidor de destino. |

</div>

Para asistentes de voz, clientes OTA y otros productos que necesitan transmisión continua o comunicación directa mediante HTTP/WebSocket, PAN puede ser una alternativa a la retransmisión mediante una app BLE una vez validados el iPhone y la configuración del SDK de destino. El ejemplo de SiFli v2.5.1 también habilita A2DP para sortear el problema documentado de conectar PAN por sí solo en iOS; A2DP no es un requisito del protocolo PAN. PAN **no** sustituye la app necesaria para configurar el producto, autenticar usuarios, enviar notificaciones o proporcionar controles locales; solo evita que el plano de datos de la aplicación quede limitado por esa retransmisión. El [asistente de voz SF32 Xiaozhi](../../projects/sf32-xiaozhi.md) muestra esta arquitectura en funcionamiento.

## Compatibilidad de dispositivos SF32 { #device-support-on-sf32 }

Para SF32, elija una familia compatible con Bluetooth clásico y compruebe la pila PAN, la versión del SDK y la configuración de la placa. Las familias compatibles con PAN de la tabla usan Bluetooth de modo dual; es una característica de esos dispositivos SF32, no un requisito del protocolo PAN.

<div align="center"><em>Tabla: Compatibilidad con PAN por familia SF32</em></div>

<div align="center" markdown>

| Familia | Capacidad Bluetooth | Soporte de PAN |
|:-------|:----------------------|:-------------|
| SF32LB52x | Bluetooth de modo dual | Sí |
| SF32LB55x | Solo BLE | No: PAN requiere Bluetooth clásico |
| SF32LB56x | Bluetooth de modo dual | Sí |
| SF32LB57x | Bluetooth de modo dual | Verifique la pila PAN y la placa de destino; no figura en el ejemplo PAN de la versión de referencia v2.5.1 |
| SF32LB58x | Bluetooth de modo dual | Sí |

</div>

Consulte el [Resumen de Bluetooth](overview.md#choose-ble-classic-or-dual-mode) para obtener más criterios de selección entre BLE y Bluetooth de modo dual.

## Ejemplo PAN de SiFli-SDK { #sifli-sdks-pan-example }

SiFli-SDK incluye una implementación PANU funcional en `example/bt/pan`, compatible con las series de placas `eh-lb52x`, `eh-lb56x`, `eh-lb58x` y `sf32lb52/56/58-lcd`. El ejemplo se conecta al servicio PAN (NAP) de un teléfono y demuestra operaciones de red mediante comandos de la consola Finsh. Por ejemplo, `weather` consulta las condiciones meteorológicas actuales a través del enlace PAN establecido. La captura del README muestra campos de la respuesta del servicio meteorológico: `id`, `name`, `country`, `path`, `timezone`, `timezone_offset`, `txt`, `code`, `temperature` y `last_update`. El ejemplo muestra Chongqing (CN), Asia/Shanghai (+08:00), `多云` («nublado», código `4`), temperatura `10` y actualización `2025-01-13T15:54:09+08:00`. Son datos de aplicación, no campos de PAN/BNEP, y sus valores pueden variar.

Al iniciarse, el ejemplo activa Inquiry y Page Scan de Bluetooth para que el teléfono pueda detectar y emparejarse con el dispositivo, cuyo nombre Bluetooth predeterminado es `sifli_pan`.

Para HTTPS, configure los certificados según el [README de PAN de v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md). Los certificados CA predeterminados están en `external/mbedtls_228/certs/default`; coloque los certificados CA adicionales que necesite en `external/mbedtls_228/certs`. Deben tener formato PEM, no DER: compruebe que el contenido incluye `-----BEGIN CERTIFICATE-----`, sin fiarse solo de la extensión. Al habilitar `PKG_USING_MBEDTLS_USER_CERTS` en `proj.conf`, la compilación combina los archivos de ese directorio en `ports/src/tls_certificate.c`. Revise las anclas de confianza para el servidor real. Una conexión PAN correcta no demuestra que se haya validado el certificado TLS; compruebe la identidad del servidor y la hora del dispositivo cuando la validación del periodo de vigencia dependa de ella.

El README escribe el directorio como `mbedtls_288`, pero sus capturas y el [código de generación de certificados de v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript) usan `mbedtls_228`. Las rutas anteriores siguen la implementación. El script solo acepta certificados cuya primera línea empiece por `-----BEGIN CERTIFICATE`; conserve ese formato y revise las advertencias de compilación por si se han omitido archivos.

<div align="center"><em>Tabla: Comandos Finsh del ejemplo PAN</em></div>

<div align="center" markdown>

| Comando | Efecto |
|:--------|:-------|
| `pan_cmd conn_pan` | Conectar a PAN después de que se habilite el uso compartido de red del teléfono. |
| `pan_cmd ota_pan` | Descargar e instalar la imagen de firmware especificada en `main.c` a través del enlace PAN. |
| `pan_cmd set_retry_flag 1` / `0` | Habilitar o deshabilitar la reconexión automática de PAN. |
| `pan_cmd set_retry_time N` | Establecer el número máximo de intentos de reconexión automática. |
| `pan_cmd autoconnect` | Disparar manualmente un intento de reconexión después de que el teléfono desconecte y vuelva a habilitar el uso compartido. |

</div>

Antes de ejecutar el ejemplo, compruebe estos ajustes con el README de la versión indicada y la plataforma de destino:

- Habilite `CONFIG_BLUETOOTH`, `CONFIG_BT_PROFILE_CUSTOMIZE`, `CONFIG_CFG_PAN` y `CONFIG_BSP_BT_CONNECTION_MANAGER`. El ejemplo también habilita A2DP para evitar el problema documentado de iOS al conectar solo PAN; A2DP no es un requisito del protocolo PAN.
- `CONFIG_BT_FINSH` habilita los comandos opcionales de control Bluetooth. Mantenga las funciones de consola necesarias para los comandos que vaya a probar.
- Configure `CONFIG_BSP_BLE_NVDS_SYNC` según dónde se ejecute Bluetooth: el README lo habilita para HCPU y lo deshabilita para LCPU. No copie sin cambios una configuración con otra distribución entre procesadores.
- Para reconectar al último dispositivo, compruebe `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE` y `CONFIG_PKG_USING_FLASHDB`. Valide que la configuración se conserve tras reiniciar y limite los intentos mediante los controles de reintento de la tabla anterior, en vez de reintentar indefinidamente.

## Compatibilidad de los sistemas operativos móviles y validación { #mobile-phone-os-support-and-qualification }

El teléfono actúa como **NAP** y forma parte de la ruta de red del producto; no es solo una herramienta de configuración. Considere su sistema operativo, modelo, tarifa del operador y política de conexión compartida como parte de la configuración admitida del producto. El emparejamiento Bluetooth no basta: el teléfono debe ofrecer el servicio PAN mediante Bluetooth y encaminar el tráfico una vez conectado el PANU.

<div align="center"><em>Tabla: Compatibilidad con Bluetooth PAN según el sistema operativo móvil</em></div>

<div align="center" markdown>

| Sistema operativo móvil | Información documentada por la plataforma | Pasos iniciales con SF32 | Aspectos que debe validar el producto |
|:----------|:----------------------------|:-----------------------|:-------------------------------|
| **iOS / iPadOS con servicio móvil** | La [documentación de Apple sobre el Punto de Acceso Personal](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27) incluye Bluetooth entre los métodos de conexión e indica que esta función comparte la conexión a Internet móvil del teléfono. | Siga los [pasos de SiFli Xiaozhi para iOS](https://docs.sifli.com/projects/xiaozhi/get-started/): use un teléfono con servicio móvil activo, active el Punto de Acceso Personal antes del emparejamiento, mantenga Bluetooth encendido y empareje/conecte el dispositivo SF32. Si no aparece `sifli-pan`, la guía de SiFli indica que reiniciar el teléfono puede ayudar. | La disponibilidad del Punto de Acceso Personal, los límites de datos y el número de dispositivos conectados dependen del operador y del modelo de iPhone. Pruebe cada versión compatible de iOS/iPadOS, categoría de teléfono y tarifa; no dé por hecho que Bluetooth PAN funciona solo porque funcione el punto de acceso Wi-Fi. |
| **Android** | La [Ayuda de Android](https://support.google.com/android/answer/9059108) indica que la mayoría de los teléfonos Android pueden compartir datos móviles por Bluetooth: primero hay que emparejarlos, configurar la conexión de red Bluetooth del otro dispositivo y, después, activar el **anclaje Bluetooth**. | Active el anclaje Bluetooth antes de ejecutar `pan_cmd conn_pan`. Los nombres de los ajustes y su ubicación varían según el fabricante, la versión de Android y las políticas empresariales; registre la ruta exacta en cada teléfono validado. | Google indica que esta función está disponible en la *mayoría*, no en todos, los teléfonos Android. Los operadores pueden limitar o cobrar por el anclaje, y los fabricantes pueden ocultar o modificar el control. Pruebe las combinaciones de teléfono, sistema operativo y operador que se comercializarán; no se base solo en la versión de Android. |
| **HarmonyOS y otros sistemas móviles derivados de Android** | Esta guía no afirma que PAN sea compatible en toda la plataforma. Aunque sus implementaciones de Bluetooth y conexión compartida puedan derivar de Android, pueden variar según el modelo, el mercado, la versión, la configuración del operador o las políticas de gestión del dispositivo. | Busque el ajuste para compartir la conexión por Bluetooth, empareje el teléfono con el dispositivo SF32 y compruebe que el ejemplo PAN puede transmitir tráfico IP real. | Considere **pendiente de validación** cada combinación concreta de teléfono, versión del sistema, región y operador hasta que supere las mismas pruebas que Android. No anuncie compatibilidad basándose solo en la marca o en que el emparejamiento Bluetooth funcione. |

</div>

### Configuración en el teléfono { #phone-side-setup }

<div align="center"><em>Figura: Ubicación orientativa de los ajustes de Punto de Acceso Personal en iOS y conexión compartida por Bluetooth en Android</em></div>

![Ajustes ilustrativos del Punto de Acceso Personal de iOS y la conexión compartida por Bluetooth de Android](assets/mobile-hotspot-switches-illustrative.png)

La imagen ilustra dónde encontrar estos ajustes; no es una captura literal del sistema operativo. El nombre y la ubicación del menú varían según la versión de iOS/iPadOS, el fabricante de Android y las políticas de gestión del teléfono. Busque **Permitir que otros se unan** en iOS/iPadOS o **Anclaje Bluetooth** en Android. La [captura iOS de SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md) también muestra activado **Maximize Compatibility**. Es un ajuste de ejemplo, no un requisito de PAN; verifique en cada teléfono objetivo si resulta necesario.

Siga estos pasos con cada teléfono que vaya a probar:

1. Verifique la conexión de salida del teléfono. El Punto de Acceso Personal de Apple comparte datos móviles; confirme que el operador permite compartirlos. Algunos teléfonos Android también pueden compartir una conexión Wi-Fi, pero debe comprobarlo en el modelo y la compilación del sistema operativo concretos.
2. Active la conexión compartida por Bluetooth o el Punto de Acceso Personal del teléfono **antes** de solicitar PAN desde el dispositivo SF32.
3. Empareje el teléfono y el dispositivo, manteniendo el teléfono visible cuando el SO lo requiera.
4. Ejecute `pan_cmd conn_pan` y compruebe una comunicación IP real, por ejemplo con el comando `weather`. No basta con confirmar la conexión Bluetooth.
5. Desactive la conexión compartida, ponga el teléfono en reposo y reactívelo, y aléjelo del dispositivo hasta perder el alcance. Compruebe que la reconexión se comporte como espera el producto.

Si el uso compartido se habilita solo después de que la conexión Bluetooth ya está establecida, reconecte PAN explícitamente con `pan_cmd conn_pan`.

### Defina la matriz de teléfonos compatibles con el producto { #define-a-shipping-phone-support-matrix }

Para un producto de consumo, publique las combinaciones compatibles de **modelo de teléfono + versión del sistema operativo + operador/región**, no una declaración genérica como «iOS» o «Android». Para cada modelo candidato, registre como mínimo: modelo de teléfono, versión del sistema, operador, servicio móvil activo y estado de SIM/eSIM, nombre del ajuste para compartir la conexión, tiempo de conexión inicial, reconexión tras bloquear la pantalla o perder el enlace de radio, resultado con tráfico sostenido y acciones necesarias para restablecer el servicio. Repita estas pruebas cuando cambien la app, el firmware PAN, el sistema operativo del teléfono o el perfil del operador.

## Actualizaciones OTA por PAN { #pan-based-ota-delivery }

OTA está habilitado de forma predeterminada en el ejemplo PAN. El comando `pan_cmd ota_pan` descarga e instala una imagen de firmware por el mismo enlace Bluetooth PAN que ya se utiliza para la red, mediante la ruta OTA DFU_PAN descrita junto con el servicio de actualización de firmware de SiFli-SDK. Es una opción adecuada para productos que ya usan PAN para transferir datos y no necesitan otro transporte OTA. Consulte [OTA y DFU](../../develop/firmware-topics/ota-dfu.md) para comparar PAN con BLE y otros medios de actualización; planifique la recuperación y la reversión con independencia del transporte elegido.

El README también describe un fallo de compilación cuando el destino elegido no dispone de un `ptab.json` adecuado para OTA. Sus capturas muestran cómo deshabilitar el subproyecto DFU y el soporte de actualización del middleware para probar el ejemplo sin OTA. Esta medida de diagnóstico elimina OTA; no sirve para comercializar un producto que deba admitir actualizaciones. Antes de habilitar la ruta OTA, proporcione y valide el mapa de particiones y la configuración de actualización correctos.

PAN proporciona transporte, no una garantía de autenticidad del firmware ni de recuperación. Para el lanzamiento, valide la autenticación del servidor, la autenticidad e integridad de la imagen, la compatibilidad de destino y versión y la recuperación tras interrupciones. Pruebe tanto la pérdida de conexión como los cortes de alimentación y verifique la recuperación o reversión real del bootloader; no dé por hecho que el comando de descarga las incorpora.

## Ejemplo de producto SF32 que utiliza PAN { #a-real-sf32-product-using-pan }

El [asistente de voz SF32 Xiaozhi](../../projects/sf32-xiaozhi.md) es un ejemplo funcional de PAN en SF32: accede a Internet mediante un teléfono emparejado y transmite la interacción de voz a un servicio en la nube por esa conexión. El proyecto muestra cómo integrar en un producto la conectividad PAN, el tráfico de aplicación WebSocket/HTTP y la dependencia de la conexión compartida del teléfono.

## Solución de problemas { #troubleshooting }

El README también recomienda revisar la asignación de direcciones Bluetooth. Consulte la dirección con `nvds get_mac`. Use solo un OUI asignado a su organización o autorizado para el producto y asigne direcciones únicas; no copie el OUI de otro fabricante de un ejemplo. En `nvds update addr 6 xxxxxxYYYYYY`, `YYYYYY` es el OUI con el orden de bytes invertido y `xxxxxx` representa los otros tres bytes. Respete el orden de bytes del comando, en vez de pegar sin cambios una dirección MAC tal como se muestra en pantalla.

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS` puede sobrescribir un cambio manual. Si una dirección de prueba autorizada no se conserva, el README recomienda deshabilitar esa opción, recompilar y volver a grabar el firmware, y después establecer de nuevo la dirección. Es una medida de diagnóstico, no una política de asignación para producción: valide tras reiniciar la política automática o de programación en fábrica que vaya a utilizar.

<div align="center"><em>Tabla: Solución de problemas de Bluetooth PAN</em></div>

<div align="center" markdown>

| Síntoma | Comprobaciones y acciones |
|:--------|:--------------|
| PAN se conecta, pero fallan los comandos de red (por ejemplo, `weather`) | Compruebe el establecimiento de BNEP, la dirección IP asignada, la ruta, DNS, la disponibilidad del servidor y los errores TLS cuando corresponda. El README también recomienda revisar el OUI de la dirección MAC Bluetooth con `nvds get_mac`; modifíquelo con `nvds update addr 6 ...` solo conforme a una política de asignación autorizada. Un OUI no válido no es la única causa posible. |
| El teléfono no detecta el dispositivo o no se conecta | Confirme que la conexión compartida del teléfono está activada *antes* de conectar y que el dispositivo puede detectarse (Inquiry/Page Scan activos). |
| El teléfono se empareja, pero falla `weather` u otra operación IP | El emparejamiento no demuestra que exista un servicio NAP de PAN. Compruebe la conexión compartida por Bluetooth o el Punto de Acceso Personal y la conexión de salida. Para datos móviles, confirme el permiso del operador; para compartir Wi-Fi en Android, verifique el modelo y el sistema concretos. Contraste la combinación probada con la matriz de compatibilidad. |
| PAN se desconecta tras un cambio en el estado de red del teléfono | Puede ocurrir; valide el comportamiento en cada teléfono compatible. Reconecte con `pan_cmd conn_pan` o active `pan_cmd set_retry_flag 1`, usando el límite de reintentos anterior para acotar los intentos automáticos. |
| La OTA por PAN falla durante la transferencia | Proceda como con cualquier otro transporte OTA: compruebe la URL de la imagen, el diseño de particiones y el comportamiento de recuperación descrito en [OTA y DFU](../../develop/firmware-topics/ota-dfu.md), sin atribuir automáticamente el fallo a PAN. |

</div>

## Lista de comprobación de puesta en marcha { #bring-up-checklist }

- [ ] Verifique el hardware Bluetooth clásico y la pila/configuración PAN para el SDK y la placa concretos. El ejemplo de referencia incluye SF32LB52x/56x/58x; valide SF32LB57x por separado. SF32LB55x solo admite BLE.
- [ ] Determine si depender de la conexión compartida del teléfono mediante PAN encaja con el modelo de conectividad del producto o si hace falta una radio Wi-Fi dedicada.
- [ ] Ejecute `example/bt/pan` en la placa objetivo y compruebe la configuración de conexión compartida del teléfono (Punto de Acceso Personal en iOS/iPadOS o conexión compartida por Bluetooth en Android).
- [ ] Valide una conexión PAN real y al menos una operación de red (por ejemplo, el comando `weather` del ejemplo) de extremo a extremo.
- [ ] Pruebe cada modelo de teléfono, versión del sistema, combinación de región y operador, y ruta de ajustes prevista. No comercialice el producto con una afirmación genérica de «compatible con iOS/Android».
- [ ] Compruebe que el OUI de la dirección MAC Bluetooth del dispositivo sea válido antes de depender de la conexión de red.
- [ ] Si usa PAN para OTA, pruebe toda la ruta `pan_cmd ota_pan`, incluido el comportamiento de recuperación, antes de comercializar el producto.
- [ ] Diseñe la reconexión y la conexión automática (`set_retry_flag`, `set_retry_time`) según la frecuencia con que se espera que el teléfono esté al alcance.

## Puntos clave { #key-takeaways }

- Bluetooth PAN transporta tráfico IP o de tipo Ethernet por BR/EDR mediante BNEP sobre L2CAP. No exige compatibilidad con BLE. IPv6 sobre BLE utiliza el perfil independiente IPSP, no PAN, y requiere comprobar la compatibilidad de la pila y de la pasarela.
- Los dispositivos SF32 usan el rol de cliente **PANU** y suelen conectarse a un teléfono que actúa como **NAP** mediante la función de conexión compartida o el Punto de Acceso Personal.
- En iOS, los accesorios BLE pueden usar Core Bluetooth sin MFi, pero un canal de datos personalizado entre una app y un accesorio Bluetooth clásico mediante External Accessory/iAP requiere la ruta MFi. PAN utiliza la conexión compartida del teléfono y permite que el SF32 use su propio cliente IP en lugar de depender de una retransmisión BLE desde la app.
- El ejemplo PAN de referencia lista destinos SF32LB52x/56x/58x. SF32LB57x tiene hardware de modo dual, pero requiere validar por separado la pila PAN y la placa; SF32LB55x solo admite BLE y no puede ejecutar PAN.
- `example/bt/pan` de SiFli-SDK es una implementación funcional de referencia. Incluye comandos Finsh para conectar, reconectar y realizar una actualización OTA por PAN.
- PAN mediante la conexión compartida del teléfono conviene para tráfico IP intermitente o moderado cuando suele haber un teléfono cerca. Para una tasa alta y sostenida o un funcionamiento independiente del teléfono, evalúe Wi-Fi dedicado u otra ruta de red independiente; también es posible usar una pasarela NAP que no sea un teléfono.
