---
icon: lucide/usb
description: "Uso del hardware USB de SF32 con CherryUSB: CDC, HID, MSC, audio y MTP; lista de comprobación de descriptores y pruebas de enumeración en distintos sistemas operativos."
tags:
    - Desarrollo
    - USB
---

# USB y CherryUSB { #usb-and-cherryusb }

En los dispositivos SF32 y las placas con hardware USB compatible, la documentación y los ejemplos de SiFli-SDK muestran la integración con CherryUSB. Confirme qué roles y clases USB admite la combinación concreta de chip, placa y versión del SDK, y trate USB como una pila de software completa, no solo como una función del hardware.

El desarrollo USB abarca el firmware, los descriptores, los sistemas operativos del host, la alimentación y las herramientas de producción. Que el dispositivo se enumere una vez en el portátil de desarrollo no significa que el trabajo esté terminado.

## Casos de uso { #use-cases }

- Puerto serie USB CDC.
- Dispositivos HID.
- Almacenamiento MSC.
- Micrófono/altavoz de audio USB.
- MTP.
- Compatibilidad con host USB para periféricos CDC, HID, MSC, UVC y UAC, cuando la admitan el SDK y la placa.

## Flujo de trabajo práctico { #practical-workflow }

1. Confirme que la placa dispone del conector USB y de la ruta de alimentación necesarios.
2. Parta del ejemplo USB del SDK más próximo al caso de uso.
3. Pruebe la enumeración en Windows, macOS y Linux.
4. Verifique la suspensión y reanudación, así como el comportamiento al volver a conectar el cable.
5. Registre el VID/PID, los descriptores y los requisitos del controlador.

## Qué probar { #what-to-test }

- Conectar el dispositivo antes de encenderlo; conectarlo y desconectarlo mientras está en funcionamiento.
- Reinicio con el dispositivo conectado.
- Suspensión/reactivación del host.
- Desconexión del cable durante una transferencia.
- Enumeración en Windows, macOS y Linux.
- Comportamiento del dispositivo compuesto cuando se habilitan varias clases.
- Informar a los usuarios de que los cables USB de solo carga no admiten comunicación de datos.

## Lista de comprobación de descriptores { #descriptor-checklist }

- Está claro quién es titular del VID/PID.
- La cadena de producto es definitiva o está versionada.
- Está definido el comportamiento del número de serie.
- Los valores de clase/subclase/protocolo corresponden al controlador host previsto.
- Las interfaces compuestas se mantienen estables entre versiones del firmware.

## Ejemplos del SDK { #sdk-examples }

El [índice oficial de ejemplos CherryUSB de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) separa los ejemplos de dispositivo USB y de host USB. Empiece por el ejemplo que corresponda al rol y a la clase USB previstos, y aplique a la implementación del producto las comprobaciones de descriptores, alimentación y compatibilidad con el host de ese ejemplo.

<div align="center"><em>Tabla: Ejemplos CherryUSB de SiFli-SDK para SF32LB58x</em></div>

<div align="center" markdown>

| Rol USB | Ejemplo | Punto de partida |
| --- | --- | --- |
| Dispositivo | [Micrófono USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | Micrófono USB Audio Class 1 |
| Dispositivo | [Micrófono y altavoz USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | Audio bidireccional USB Audio Class 1 |
| Dispositivo | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | Dispositivo de comunicaciones USB |
| Dispositivo | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | Puente USB-UART |
| Dispositivo | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Dispositivo USB compuesto |
| Dispositivo | [Ratón HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | Dispositivo apuntador USB HID |
| Dispositivo | [MSC con memoria NOR Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Almacenamiento masivo respaldado por NOR Flash |
| Dispositivo | [MSC con disco RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Almacenamiento masivo respaldado por RAM |
| Dispositivo | [MSC con dos discos RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Dos unidades lógicas respaldadas por RAM |
| Dispositivo | [MSC con SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Almacenamiento masivo respaldado por tarjeta SD o eMMC |
| Dispositivo | [MTP con DFS y disco RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Dispositivo Media Transfer Protocol |
| Host | [Host CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Comunicación con un periférico CDC ACM |
| Host | [Host HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | Conexión y lectura de un periférico HID |
| Host | [Host MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | Conexión de un periférico de almacenamiento masivo USB |
| Host | [Host UVC + UAC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | Periféricos USB de vídeo y audio |

</div>
