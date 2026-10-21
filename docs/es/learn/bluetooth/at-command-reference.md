---
icon: lucide/list
description: "Referencia de comandos AT del módulo Bluetooth de modo dual SF32LB57 (SIFLI_AT): formato, emparejamiento, conexiones, datos, GATT personalizado, URC y comandos PDU."
tags:
  - Bluetooth
---

# Conjunto de comandos AT { #at-command-reference }

<div align="center"><em>Tabla: Información del documento</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Versión | V1.2.1 |
| Fecha | 2026-07-28 |
| Módulo aplicable | Módulo Bluetooth de modo dual SF32LB57 (SIFLI_AT) |

</div>

Esta referencia documenta la interfaz externa de comandos AT de la versión V1.2.1 del módulo Bluetooth de modo dual SF32LB57 (SIFLI_AT). Los comandos y las cadenas de respuesta se muestran en monoespaciado; `\r` denota un retorno de carro (0x0D) y `\n` denota un salto de línea (0x0A). Los comandos AT se transmiten como texto ASCII, mientras que los campos binarios en las tramas PDU usan orden de bytes little-endian.

Esta es la especificación completa de la interfaz AT referenciada por la página del Módulo de comandos AT Bluetooth.

<div align="center"><em>Tabla: Historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Cambios | Fecha |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: se añadió `AT+CFGRESET`; se actualizó la sincronización del nombre Bluetooth clásico al arrancar y la documentación de `CLEARLINKKEY`, el identificador de conexión y PDU; se habilitó la configuración de compilación BQB. | 2026-07-28 |

</div>

## Resumen { #overview }

El módulo Bluetooth de modo dual SF32LB57 ofrece al host una interfaz de comandos AT basada en UART para BLE y Bluetooth clásico (BR/EDR). El host puede usar estos comandos para configurar el dispositivo, gestionar conexiones, enviar y recibir datos, y recibir notificaciones de estado no solicitadas del módulo.

### Ajustes predeterminados { #default-settings }

<div align="center"><em>Tabla: Ajustes predeterminados</em></div>

<div align="center" markdown>

| Elemento | Valor predeterminado |
|:-----|:----------------|
| Nombre del dispositivo | `SIFLI_AT` |
| Velocidad en baudios del puerto serie | 460800 bps |
| Modo de comando/transparente | Modo transparente |
| Modo de operación Bluetooth | Modo dual (BLE+BT) |
| Notificaciones de eventos | Notificación normal |
| Sufijo MAC en el nombre del dispositivo | Desactivado |
| Clase de Dispositivo (COD) | `000000` |
| MTU BLE máxima | 247 |
| Multiconexión global | Activada (1) |
| Tiempo de desconexión por inactividad en modo transparente | 0 (desactivado) |
| Carga automática de GATT al encender | Activada |
| Dirección aleatoria BLE | Desactivada (usa dirección pública) |
| Dirección Bluetooth | Generada automáticamente a partir del UID del chip |

</div>

## Formato de comandos { #command-format }

### Definición de sintaxis { #syntax-definition }

Los comandos AT se transmiten como texto ASCII y terminan con un retorno de carro `\r` (0x0D). El prefijo es `AT+` para los comandos en formato AT o `AT>` para los comandos en formato PDU. En el SF32LB57, el puerto AT es USART1 y usa el formato 8N1, sin control de flujo por hardware, a una velocidad predeterminada de 460800 baudios. Cada trama AT puede ocupar como máximo 512 bytes.

### Comandos en formato AT { #at-format-commands }

<div align="center"><em>Tabla: Formas de comando en formato AT</em></div>

<div align="center" markdown>

| Forma | Comando | Descripción |
|:-----|:--------|:-------------|
| Consulta | `AT+<CMD>?\r` | Leer un parámetro o estado |
| Configuración | `AT+<CMD>=<param>[,<param>...]\r` | Escribir un parámetro |
| Ejecución | `AT+<CMD>\r` | Ejecutar una acción |

</div>

<div align="center"><em>Tabla: Respuestas en formato AT</em></div>

<div align="center" markdown>

| Resultado | Cadena de respuesta |
|:-------|:------------------|
| Éxito | `\r\nOK\r\n` |
| Fallo | `\r\nERROR\r\n` o `\r\nFALSE\r\n` |
| Valor devuelto por una consulta | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### Estructura de las tramas PDU { #pdu-format-command-framing }

Los comandos PDU transfieren cargas útiles binarias mientras el módulo está en modo de comando. A menos que se indique lo contrario, los campos numéricos dentro de una trama son little-endian, y `data` son datos binarios sin procesar.

**Comando (host → módulo)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>Tabla: Estructura de la trama de comando PDU</em></div>

<div align="center" markdown>

| Elemento | Descripción |
|:--------|:-------------|
| `AT>` | Prefijo de comando, ASCII de 3 bytes |
| Opcode | Código de operación little-endian de 2 bytes. `0x0101`, `0x0102` |
| Total Length | Recuento total de bytes de Body, little-endian de 2 bytes |
| Body | Carga útil; la estructura depende del Opcode |
| `\r` | Terminador de comando de 1 byte |

</div>

**Informe (módulo → host)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## Comandos y respuestas { #commands-and-responses }

Los comandos siguientes se agrupan por función, con las mismas categorías que la tabla de referencia de la página Módulo de comandos AT Bluetooth.

### Sistema y dispositivo { #system-and-device }

#### Obtener versión de firmware { #get-firmware-version }

<div align="center"><em>Tabla: Obtener versión de firmware</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GFWVER?\r` |
| Respuesta | Éxito: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`; cualquier comando de configuración devuelve `\r\nERROR\r\n`. |
| Parámetros | Ninguno |
| Notas | Solo consulta. El valor de retorno siempre comienza con `SIFLI_AT_`, seguido del número de versión y la fecha de compilación. |

</div>

#### Consultar nombre del dispositivo { #query-device-name }

<div align="center"><em>Tabla: Consultar nombre del dispositivo</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+NAME?\r` |
| Respuesta | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| Parámetros | Ninguno |
| Notas | Devuelve el nombre configurado actualmente, sin el sufijo MAC. El sufijo solo afecta al nombre anunciado. |

</div>

#### Establecer nombre del dispositivo { #set-device-name }

<div align="center"><em>Tabla: Establecer nombre del dispositivo</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+NAME=<device name>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | Nombre del dispositivo: una cadena de 1 a 29 bytes de longitud; vacía o mayor de 29 bytes devuelve `ERROR`. Predeterminado `SIFLI_AT`. |
| Notas | Actualiza el nombre del dispositivo y lo sincroniza con el nombre local y el incluido en la respuesta de escaneo BLE. `MACNAME` controla el nombre que finalmente se anuncia. |

</div>

#### Consultar la opción de añadir el sufijo MAC al nombre { #query-mac-name-suffix-switch }

<div align="center"><em>Tabla: Lectura del estado del sufijo MAC del nombre</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+MACNAME?\r` |
| Respuesta | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| Parámetros | Ninguno |
| Notas | Devuelve el estado de la opción de sufijo: 0 = desactivada, 1 = activada. |

</div>

#### Configurar la opción de añadir el sufijo MAC al nombre { #set-mac-name-suffix-switch }

<div align="center"><em>Tabla: Configuración de la opción de sufijo MAC en el nombre</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+MACNAME=<value>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | Valor: 0 = se muestra el nombre del dispositivo sin cambios; 1 = añade el sufijo `-XXXX` al nombre (XXXX son los últimos dos bytes de la BD_ADDR local, expresados en hexadecimal y en mayúsculas). Rango: 0–1. Valor predeterminado: 0. |
| Notas | Actualiza la configuración. Si está activada y el nombre más el sufijo supera el límite de 29 bytes, se trunca el nombre del dispositivo para dejar espacio al sufijo de 5 bytes. |

</div>

#### Consultar ID de dispositivo IEEE 1284 { #query-ieee-1284-device-id }

<div align="center"><em>Tabla: Consultar ID de dispositivo IEEE 1284</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+1284ID?\r` |
| Respuesta | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| Parámetros | Ninguno |
| Notas | Devuelve la cadena de ID de dispositivo IEEE 1284 actualmente configurada; vacía si no está configurada. |

</div>

#### Establecer ID de dispositivo IEEE 1284 { #set-ieee-1284-device-id }

<div align="center"><em>Tabla: Establecer ID de dispositivo IEEE 1284</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+1284ID=<ID string>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | Cadena de ID: la cadena de ID de dispositivo IEEE 1284; la longitud debe estar por debajo de la capacidad del búfer de almacenamiento, una longitud excesiva devuelve `ERROR`. El valor predeterminado es una cadena vacía. |
| Notas | Actualiza la configuración. |

</div>

#### Reiniciar dispositivo { #reset-device }

<div align="center"><em>Tabla: Reiniciar dispositivo</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+RESET\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta (`AT+RESET?\r`): `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Al recibir este comando, el módulo guarda la configuración AT actual, responde `OK`, detiene la publicidad, desconecta las conexiones y ejecuta un reinicio por software. El comando no modifica la configuración por sí mismo. |

</div>

#### Restablecimiento de fábrica { #factory-reset }

<div align="center"><em>Tabla: Restablecimiento de fábrica</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+FACTORYRESET\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta (`AT+FACTORYRESET?\r`): `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Restaura la configuración AT a los valores predeterminados, borra la configuración de servicio GATT personalizado, las vinculaciones BLE, las vinculaciones de emparejamiento Bluetooth clásico (BR/EDR), y la dirección aleatoria estática BLE, luego responde `OK` y se reinicia. El host debe esperar `IM_READY` después del reinicio. |

</div>

#### Restablecimiento de configuración { #configuration-reset }

<div align="center"><em>Tabla: Restablecimiento de configuración</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+CFGRESET\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta (`AT+CFGRESET?\r`): `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Restaura la configuración AT y la configuración GATT personalizada guardada, luego responde `OK` y se reinicia; los registros de emparejamiento y la dirección BLE actual se conservan. |

</div>

#### Entrar en modo de actualización OTA { #enter-ota-upgrade-mode }

<div align="center"><em>Tabla: Entrar en modo de actualización OTA</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+OTA\r` |
| Respuesta | Éxito: `\r\nOK\r\n` (luego entra en modo DFU y se reinicia; sin más respuesta); forma de consulta (`AT+OTA?\r`): `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Primero guarda la configuración AT actual y responde `OK`, luego escribe una bandera DFU y se reinicia en modo de actualización DFU por UART. |

</div>

#### Consultar calibración de desviación de frecuencia { #query-frequency-offset-calibration }

<div align="center"><em>Tabla: Consultar calibración de desviación de frecuencia</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+TRIM?\r` |
| Respuesta | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| Parámetros | `freq_off`: el valor de calibración de desviación de frecuencia actualmente registrado, en Hz. |
| Notas | Devuelve el valor de referencia guardado en la configuración AT; el valor que se aplica realmente se almacena en la partición `FACTORY_CFG_ID_CRYSTAL`. |

</div>

#### Establecer calibración de desviación de frecuencia { #set-frequency-offset-calibration }

<div align="center"><em>Tabla: Establecer calibración de desviación de frecuencia</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+TRIM=<freq_off>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; valor fuera de rango o fallo de la interfaz de calibración: `\r\nERROR\r\n` |
| Parámetros | `freq_off`: valor de calibración de la desviación de frecuencia, en Hz. Rango: -120000 a 120000. Valor predeterminado: 0. El valor 0 restablece la calibración y recupera el valor original de fábrica del hardware; cualquier valor distinto de cero se aplica directamente. |
| Notas | Al establecer el valor, se actualiza el registro del banco de condensadores HXT y se escribe el resultado en la partición `FACTORY_CFG_ID_CRYSTAL`. Si la calibración se completa correctamente, se actualiza el valor guardado en la configuración AT y se marca para su almacenamiento. |

</div>

#### Entrar en modo de prueba DUT { #enter-dut-test-mode }

<div align="center"><em>Tabla: Entrar en modo de prueba DUT</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+DUT\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta (`AT+DUT?\r`): `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Activa el bit DUT de BR/EDR Bluetooth clásico y responde `OK`. Después, espera a que el equipo de prueba transmita `LMP_test_control` por radio para iniciar la prueba de señalización. El UART AT (USART1) permanece disponible. El modo DUT es irreversible y solo se puede abandonar reiniciando el dispositivo. |

</div>

### Dirección e identidad { #address-and-identity }

#### Consultar dirección Bluetooth { #query-bluetooth-address }

<div align="center"><em>Tabla: Consultar dirección Bluetooth</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+LBDADDR?\r` |
| Respuesta | Éxito: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `addr`: devuelve la dirección Bluetooth pública actual, 12 caracteres hexadecimales (mayúsculas, sin separadores), byte más significativo primero, p. ej. `001583112233`. |
| Notas | Devuelve la dirección pública leída del firmware; devuelve `ERROR` en caso de fallo de lectura. |

</div>

#### Establecer dirección Bluetooth { #set-bluetooth-address }

<div align="center"><em>Tabla: Establecer dirección Bluetooth</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+LBDADDR=<addr>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `addr`: dirección Bluetooth que se va a establecer, con exactamente 12 caracteres hexadecimales sin separadores y el byte más significativo primero, por ejemplo `001583112233`. |
| Notas | La dirección se escribe en la configuración y se guarda. Surte efecto después de un reinicio. El valor predeterminado de fábrica es todo ceros, lo que significa que la dirección se genera automáticamente a partir del UID del chip. |

</div>

#### Consultar dirección BLE { #query-ble-address }

<div align="center"><em>Tabla: Consultar dirección BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BLEADDR?\r` |
| Respuesta | Éxito: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `addr`: devuelve la dirección actualmente usada por BLE, 12 caracteres hexadecimales (mayúsculas, sin separadores), byte más significativo primero. |
| Notas | Si se ha generado una dirección aleatoria estática específica de BLE mediante `AT+RANDOMADDR=1`, se devuelve esa dirección aleatoria estática; de lo contrario se devuelve la misma dirección pública que la dirección Bluetooth. Devuelve `ERROR` en caso de fallo de lectura. |

</div>

#### Establecer dirección BLE { #set-ble-address }

<div align="center"><em>Tabla: Establecer dirección BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BLEADDR=<addr>\r` |
| Respuesta | `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Este comando no acepta establecer directamente la dirección BLE; llamarlo siempre devuelve `ERROR`. Una dirección aleatoria estática BLE se genera mediante `AT+RANDOMADDR=1`. |

</div>

#### Consultar el uso de una dirección aleatoria BLE { #query-ble-random-address-switch }

<div align="center"><em>Tabla: Lectura de la configuración de dirección aleatoria BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+RANDOMADDR?\r` |
| Respuesta | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| Parámetros | `n`: configuración actual; 0 = BLE usa la dirección pública, 1 = BLE usa una dirección aleatoria estática. |
| Notas | Ninguna |

</div>

#### Configurar el uso de una dirección aleatoria BLE { #set-ble-random-address-switch }

<div align="center"><em>Tabla: Configuración del uso de una dirección aleatoria BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+RANDOMADDR=<n>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `n`: 0 o 1. 1 = habilita una dirección aleatoria estática BLE, derivada de la dirección pública (estableciendo los dos bits superiores del byte más significativo de la dirección pública en 1; p. ej. la dirección pública `001583112233` deriva en BLE `C01583112233`); 0 = BLE vuelve a la dirección pública. Otros valores o caracteres adicionales devuelven `ERROR`. Predeterminado 0. |
| Notas | El ajuste actualiza la configuración. Si se establece en 1 y falla la lectura de la dirección pública, el valor vuelve a 0 y se devuelve `ERROR`. La nueva dirección se guarda en NVDS y surte efecto tras reiniciar. Volver a ejecutar `AT+RANDOMADDR=1` genera la misma dirección aleatoria a partir de la dirección pública, sin cambios. |

</div>

#### Consultar clase de dispositivo { #query-class-of-device }

<div align="center"><em>Tabla: Consultar clase de dispositivo</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+CLASS?\r` |
| Respuesta | Éxito: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n` (`<cod>` son 6 dígitos hexadecimales en mayúsculas) |
| Parámetros | `cod`: la Clase de Dispositivo actual, siempre emitida como 6 dígitos hexadecimales (24 bits inferiores, formato `%06X`, rellenado con ceros) |
| Notas | Devuelve el valor actual de la Clase de Dispositivo. |

</div>

#### Establecer clase de dispositivo { #set-class-of-device }

<div align="center"><em>Tabla: Establecer clase de dispositivo</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+CLASS=<cod>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `cod`: Clase de Dispositivo, una cadena hexadecimal (analizada con `%X`). Rango 0–FFFFFF (24 bits). Predeterminado `000000`. |
| Notas | Establece la Clase de Dispositivo y actualiza la configuración; solo se conservan los 24 bits inferiores al analizar. |

</div>

### Modo de operación y visibilidad { #operating-mode-and-visibility }

#### Consultar el estado de visibilidad { #query-discoverable-state }

<div align="center"><em>Tabla: Consultar estado visible</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+DISCOVERABLE?\r` |
| Respuesta | Éxito: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| Parámetros | `state`: estado de visibilidad actual. 0 = no visible, 1 = visible, 2 = visibilidad parcial (estado mixto). Su significado depende del modo de operación: en modo BLE (`BTMODE=1`), refleja si el advertising BLE está activado (1) o desactivado (0); en modo BT (`BTMODE=2`), refleja Inquiry Scan y Page Scan: 1 cuando ambos están activos, 0 cuando ambos están desactivados y 2 en cualquier otro caso; en modo dual (`BTMODE=0`), vale 1 cuando están activos el advertising BLE, Inquiry Scan y Page Scan; 0 cuando los tres están desactivados y 2 en cualquier otro caso. |
| Notas | Solo consulta el estado visible actual; no cambia el estado del dispositivo. |

</div>

#### Establecer el estado de visibilidad { #set-discoverable-state }

<div align="center"><em>Tabla: Establecer estado visible</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+DISCOVERABLE=<mode>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `mode`: 0 = desactivar la visibilidad, 1 = activar la visibilidad. |
| Notas | El efecto depende del modo de operación: en modo BLE (`BTMODE=1`), activa o desactiva el advertising BLE; en modo BT (`BTMODE=2`), activa o desactiva Inquiry Scan y Page Scan; en modo dual (`BTMODE=0`), controla conjuntamente el advertising BLE, Inquiry Scan y Page Scan. |

</div>

#### Consultar el estado de advertising GATT { #query-gatt-advertising-state }

<div align="center"><em>Tabla: Consultar el estado de advertising GATT</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTDISCOVER?\r` |
| Respuesta | Éxito: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `state`: estado real del advertising BLE transmitido por radio. 0 = inactivo, 1 = activo. |
| Notas | Devuelve el estado real del advertising BLE transmitido por radio. No está disponible en el modo solo BT (`BTMODE=2`); devuelve `ERROR`. |

</div>

#### Establecer advertising GATT { #set-gatt-advertising }

<div align="center"><em>Tabla: Establecer advertising GATT</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTDISCOVER=<value>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `value`: 0 = detener el advertising BLE; 1 = iniciarlo. |
| Notas | Inicia o detiene directamente el advertising BLE. No está disponible en el modo solo BT (`BTMODE=2`). |

</div>

#### Consultar estado visible de SPP { #query-spp-discoverable-state }

<div align="center"><em>Tabla: Consultar estado visible de SPP</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+SPPDISCOVER?\r` |
| Respuesta | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| Parámetros | `<state>`: estado actual del Inquiry Scan, que controla la visibilidad. 0 = desactivado, 1 = activado. |
| Notas | Devuelve `ERROR` cuando `AT+BTMODE` es 1 (solo BLE). |

</div>

#### Establecer estado visible de SPP { #set-spp-discoverable-state }

<div align="center"><em>Tabla: Establecer estado visible de SPP</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+SPPDISCOVER=<state>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `<state>`: ajuste de Inquiry Scan, que controla la visibilidad. 0 = desactivado, 1 = activado. |
| Notas | Devuelve `ERROR` cuando `AT+BTMODE` es 1 (solo BLE). Solo cambia el bit de Inquiry Scan y deja el bit de Page Scan sin cambios. |

</div>

#### Consultar estado conectable de SPP { #query-spp-connectable-state }

<div align="center"><em>Tabla: Consultar estado conectable de SPP</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+SPPCONNECT?\r` |
| Respuesta | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| Parámetros | `<state>`: estado actual del Page Scan, que controla la conectabilidad. 0 = desactivado, 1 = activado. |
| Notas | Devuelve `ERROR` cuando `AT+BTMODE` es 1 (solo BLE). |

</div>

#### Establecer estado conectable de SPP { #set-spp-connectable-state }

<div align="center"><em>Tabla: Establecer estado conectable de SPP</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+SPPCONNECT=<state>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `<state>`: ajuste de Page Scan, que controla la posibilidad de conexión. 0 = desactivado, 1 = activado. |
| Notas | Devuelve `ERROR` cuando `AT+BTMODE` es 1 (solo BLE). Solo cambia el bit de Page Scan y deja el bit de Inquiry Scan sin cambios. |

</div>

#### Consultar modo de operación Bluetooth { #query-bluetooth-operating-mode }

<div align="center"><em>Tabla: Consultar modo de operación Bluetooth</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BTMODE?\r` |
| Respuesta | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| Parámetros | `mode`: modo de operación Bluetooth actual. 0 = modo dual (BLE+BT), 1 = solo BLE, 2 = solo BT. |
| Notas | Ninguna |

</div>

#### Establecer modo de operación Bluetooth { #set-bluetooth-operating-mode }

<div align="center"><em>Tabla: Establecer modo de operación Bluetooth</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BTMODE=<mode>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `mode`: modo de operación Bluetooth. 0 = modo dual (BLE+BT), 1 = solo BLE, 2 = solo BT; rango 0–2. Predeterminado 0 (modo dual). |
| Notas | El ajuste actualiza la configuración y surte efecto después de un reinicio. |

</div>

#### Consultar modo de comando { #query-command-mode }

<div align="center"><em>Tabla: Consultar modo de comando</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+COMMAND?\r` |
| Respuesta | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| Parámetros | `mode`: modo de operación actual. 0 = modo transparente, 1 = modo de comando. |
| Notas | Ninguna |

</div>

#### Establecer modo de comando { #set-command-mode }

<div align="center"><em>Tabla: Establecer modo de comando</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+COMMAND=<mode>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `mode`: modo de operación. 0 = modo transparente, 1 = modo de comando. El módulo arranca en modo transparente al encenderlo. |
| Notas | El cambio se aplica de inmediato, pero no se guarda: al reiniciar, el módulo vuelve al modo transparente. En este modo, los datos recibidos por el puerto serie se reenvían sin modificar al dispositivo conectado; en modo de comando, se interpretan como comandos AT. |

</div>

### Emparejamiento y seguridad { #pairing-and-security }

#### Borrar información de emparejamiento { #clear-pairing-information }

<div align="center"><em>Tabla: Borrar información de emparejamiento</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+CLEARLINKKEY\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta `AT+CLEARLINKKEY?\r`: `\r\nERROR\r\n` |
| Parámetros | Sin parámetros. |
| Notas | Borra la información de vinculación BLE y la clave de enlace Bluetooth clásico. Si la operación se completa, el dispositivo se reinicia; la configuración AT (nombre del dispositivo, velocidad en baudios y COD) se conserva. El host debe esperar `IM_READY` después del reinicio. No se admite la forma de consulta. |

</div>

### Puerto serie y eventos { #serial-port-and-events }

#### Consultar tasa de baudios serial { #query-serial-baud-rate }

<div align="center"><em>Tabla: Consultar tasa de baudios serial</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BAUD?\r` |
| Respuesta | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| Parámetros | `baud_rate`: la tasa de baudios actualmente configurada, en bps. |
| Notas | Después de establecer la tasa de baudios el dispositivo se reinicia; la nueva tasa de baudios surte efecto después del reinicio. |

</div>

#### Establecer tasa de baudios serial { #set-serial-baud-rate }

<div align="center"><em>Tabla: Establecer tasa de baudios serial</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BAUD=<baud_rate>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `baud_rate`: tasa de baudios serial, en bps. Valores soportados: 38400, 57600, 115200, 230400, 460800, 921600, 1000000. Predeterminado 460800. |
| Notas | El ajuste actualiza la configuración. |

</div>

#### Consultar la configuración de notificaciones de eventos { #query-event-reporting-switch }

<div align="center"><em>Tabla: Lectura de la configuración de notificaciones de eventos</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+EVT?\r` |
| Respuesta | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| Parámetros | `evt_silent`: estado de las notificaciones de eventos. 0 = notificaciones normales, 1 = modo silencioso (sin notificaciones). |
| Notas | Ninguna |

</div>

#### Configurar las notificaciones de eventos { #set-event-reporting-switch }

<div align="center"><em>Tabla: Configuración de las notificaciones de eventos</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+EVT=<evt_silent>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `evt_silent`: controla las notificaciones de eventos. 0 = emitir normalmente `IM_CONN`/`IM_DISCONN`/`IM_READY` y los demás eventos; 1 = suprimirlos todos. Valor predeterminado: 0 (notificaciones habilitadas). |
| Notas | El ajuste actualiza la configuración. Con el valor 1, las notificaciones de conexión, desconexión y disponibilidad no se envían por el puerto serie. |

</div>

#### Consultar tiempo de desconexión por inactividad en modo transparente { #query-pass-through-idle-disconnect-time }

<div align="center"><em>Tabla: Consultar tiempo de desconexión por inactividad en modo transparente</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+IDLE?\r` |
| Respuesta | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| Parámetros | `idle_ms`: el tiempo de espera de desconexión por inactividad actual, en milisegundos. |
| Notas | Ninguna |

</div>

#### Establecer tiempo de desconexión por inactividad en modo transparente { #set-pass-through-idle-disconnect-time }

<div align="center"><em>Tabla: Establecer tiempo de desconexión por inactividad en modo transparente</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+IDLE=<idle_ms>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `idle_ms`: tiempo de espera de desconexión por inactividad en modo transparente, en milisegundos, rango 0–65535; más de 65535 devuelve `ERROR`. 0 deshabilita la función de desconexión por inactividad. Predeterminado 0 (desactivado). |
| Notas | El ajuste actualiza la configuración y solo surte efecto en modo transparente: si transcurren más de `idle_ms` milisegundos desde el último dato recibido por el puerto serie, se desconectan todas las conexiones existentes. Con `idle_ms` = 0, la desconexión por inactividad queda desactivada. |

</div>

### Gestión de conexiones { #connection-management }

#### Consultar el ajuste global de multiconexión { #query-multi-connection-switch }

<div align="center"><em>Tabla: Lectura del ajuste global de multiconexión</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+MULTICONN?\r` |
| Respuesta | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| Parámetros | `<n>`: estado de la multiconexión global. 0 = desactivada (una sola conexión en todo el sistema); 1 = activada (permite conexiones simultáneas hasta el límite de cada transporte). |
| Notas | Ninguna |

</div>

#### Configurar la multiconexión global { #set-multi-connection-switch }

<div align="center"><em>Tabla: Configuración de la multiconexión global</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+MULTICONN=<n>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `<n>`: 0 = deshabilitar multiconexión; 1 = habilitar multiconexión. El valor es 0 o 1. Predeterminado 1. |
| Notas | El ajuste actualiza la configuración. Cuando la multiconexión está desactivada, la capacidad de conexión concurrente está restringida; cuando está activada, opera según los ajustes `AT+BLEMULTICONN` y `AT+BTMULTICONN`. |

</div>

#### Consultar el número máximo de conexiones concurrentes BLE { #query-maximum-ble-concurrent-connections }

<div align="center"><em>Tabla: Consultar el número máximo de conexiones concurrentes BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BLEMULTICONN?\r` |
| Respuesta | Éxito: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`; cuando la multiconexión está desactivada: `\r\nERROR\r\n` |
| Parámetros | `<n>`: el número máximo de conexiones concurrentes BLE actualmente configurado, decimal. |
| Notas | Solo se puede consultar cuando está activada la multiconexión (`AT+MULTICONN=1`); si está desactivada, devuelve `ERROR`. |

</div>

#### Establecer el número máximo de conexiones concurrentes BLE { #set-maximum-ble-concurrent-connections }

<div align="center"><em>Tabla: Establecer el número máximo de conexiones concurrentes BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BLEMULTICONN=<n>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `<n>`: número máximo de conexiones concurrentes BLE, decimal, rango 1–6. Predeterminado 3. |
| Notas | Solo puede configurarse si la multiconexión global está habilitada (`AT+MULTICONN=1`). El ajuste actualiza la configuración. Al alcanzar el límite de conexiones, se detiene el advertising (el dispositivo deja de aceptar nuevas conexiones) y se reanuda automáticamente cuando el número de conexiones vuelve a estar por debajo del límite. |

</div>

#### Consultar el número máximo de conexiones concurrentes Bluetooth clásico { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabla: Consultar el número máximo de conexiones concurrentes Bluetooth clásico</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BTMULTICONN?\r` |
| Respuesta | Éxito: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`; cuando la multiconexión está desactivada: `\r\nERROR\r\n` |
| Parámetros | `<n>`: el número máximo de conexiones concurrentes Bluetooth clásico (BR/EDR) actualmente configurado, decimal. |
| Notas | Solo se puede consultar cuando está activada la multiconexión (`AT+MULTICONN=1`); si está desactivada, devuelve `ERROR`. |

</div>

#### Establecer el número máximo de conexiones concurrentes Bluetooth clásico { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabla: Establecer el número máximo de conexiones concurrentes Bluetooth clásico</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+BTMULTICONN=<n>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `<n>`: número máximo de conexiones concurrentes Bluetooth clásico, decimal, rango 1–7. Predeterminado 7. |
| Notas | Solo se puede establecer cuando está activada la multiconexión (`AT+MULTICONN=1`). El ajuste actualiza la configuración. Cuando se alcanza el límite de conexiones, el módulo detiene Page Scan y lo reanuda automáticamente cuando el número de conexiones vuelve a quedar por debajo del límite. |

</div>

#### Desconectar { #disconnect }

<div align="center"><em>Tabla: Desconectar</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Desconectar una: `AT+DISCONN=<conn_hdl>\r`; desconectar todas: `AT+DISCONN\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo o no encontrado: `\r\nERROR\r\n` |
| Parámetros | `<conn_hdl>`: identificador de conexión en hexadecimal. Para BLE se usa un identificador externo numerado desde 1 (como el que devuelve `AT+CONNLIST`); las conexiones BT usan su identificador ACL. `<conn_hdl>` = 0 no es válido y devuelve `ERROR`. |
| Notas | Sin parámetro (o con un parámetro vacío), se desconectan todos los enlaces activos (BLE y BR/EDR) y se devuelve `OK`. Si se proporciona un identificador, primero se compara con el identificador BLE externo (identificador interno = `<conn_hdl>` - 1). Si no hay coincidencia, se compara con el identificador de conexión ACL de BT sin procesar. Si tampoco se encuentra una conexión, se devuelve `ERROR`. La forma de consulta `AT+DISCONN?` devuelve `ERROR`. |

</div>

#### Consultar lista de conexiones { #query-connection-list }

<div align="center"><em>Tabla: Consultar lista de conexiones</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+CONNLIST?\r` o `AT+CONNLIST\r` |
| Respuesta | Cada conexión activa se emite como una línea: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`; seguido de `\r\nOK\r\n` después de todas las líneas; solo `\r\nOK\r\n` si no hay conexiones activas; un parámetro no vacío: `\r\nERROR\r\n` |
| Parámetros | Campos de salida: `<conn_hdl>`: identificador de conexión de 4 dígitos hexadecimales; para BLE es un identificador externo numerado desde 1. `<type>`: tipo de conexión, BLE o BT. `<addr>`: dirección Bluetooth del par, 12 dígitos hexadecimales (primero el byte más significativo). `<extra>`: MTU actual de las conexiones BLE o canal de servicio de las conexiones BT, en decimal. |
| Notas | La forma de ajuste devuelve `ERROR` cuando se proporciona un parámetro no vacío. El módulo verifica cada ranura de conexión y emite cada conexión activa. |

</div>

### Transferencia de datos { #data-transfer }

#### Consultar MTU BLE { #query-ble-mtu }

<div align="center"><em>Tabla: Consultar MTU BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GMTU?\r` |
| Respuesta | Éxito: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| Parámetros | `mtu`: límite máximo de MTU BLE configurado actualmente, en decimal. |
| Notas | Ninguna |

</div>

#### Establecer MTU BLE { #set-ble-mtu }

<div align="center"><em>Tabla: Establecer MTU BLE</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GMTU=<mtu>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nFALSE\r\n` |
| Parámetros | `mtu`: límite máximo de MTU BLE, en decimal, rango 23–1024. Un valor fuera de rango devuelve `FALSE`. Valor predeterminado: 247. |
| Notas | Este valor establece el límite máximo usado durante la negociación de MTU. |

</div>

#### Enviar datos SPP { #send-spp-data }

<div align="center"><em>Tabla: Enviar datos SPP</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+SPPSEND=<conn_hdl>,<data>\r` o `AT+SPPSEND=,<data>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `conn_hdl`: identificador de conexión BT objetivo, hexadecimal. Puede omitirse o establecerse en 0, en cuyo caso se usa la primera conexión BT activa actual. `data`: los datos a enviar, una cadena hexadecimal, cada dos caracteres representan un byte; no puede estar vacía y el recuento de caracteres debe ser par. La longitud real de los datos transportados en una trama AT ASCII también está limitada por el límite de una sola trama AT. |
| Notas | `conn_hdl` y `data` se separan con una coma. La coma debe incluirse incluso si se omite `conn_hdl`. No se admite la forma de consulta. |

</div>

### GATT personalizado { #custom-gatt }

#### Consultar lista de servicios GATT personalizados { #query-custom-gatt-service-list }

<div align="center"><em>Tabla: Consultar lista de servicios GATT personalizados</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSRV?\r` |
| Respuesta | Para cada servicio configurado, devuelve una línea `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`, seguida de `\r\nOK\r\n`. Si no hay servicios configurados, solo se devuelve `\r\nOK\r\n` |
| Parámetros | `idx`: número de ranura de servicio, 0–5. `char_count`: el número de características configuradas para ese servicio. `state`: `REG` significa registrado con la pila de protocolo, `CFG` significa configurado solo en RAM y aún no registrado |
| Notas | Solo lista las ranuras de servicio actualmente en uso |

</div>

#### Crear servicio GATT personalizado { #create-custom-gatt-service }

<div align="center"><em>Tabla: Crear servicio GATT personalizado</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSRV=<idx>,<uuid>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `idx`: número de ranura de servicio, 0–5. `uuid`: el UUID del servicio, ingresado como una cadena hexadecimal con el MSB primero: 4 caracteres para un UUID de 16 bits, 32 caracteres para un UUID de 128 bits |
| Notas | `idx` debe ser un solo dígito seguido inmediatamente por una coma. La longitud del UUID debe ser exactamente 4 o 32 caracteres; cualquier otra longitud devuelve `ERROR`. Si la ranura ya está registrada con la pila de protocolo no se puede reconfigurar, y la creación devuelve `ERROR`. Crear un servicio borra cualquier configuración anterior en esa ranura |

</div>

#### Eliminar servicio GATT personalizado { #delete-custom-gatt-service }

<div align="center"><em>Tabla: Eliminar servicio GATT personalizado</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSRV=<idx>,DEL\r` |
| Respuesta | `\r\nOK\r\n` |
| Parámetros | `idx`: número de ranura de servicio, 0–5 |
| Notas | Borra la configuración de esa ranura en RAM. Un servicio ya registrado con la pila de protocolo no se puede revocar en tiempo de ejecución; este comando solo borra la configuración en RAM |

</div>

#### Consultar lista de características GATT personalizadas { #query-custom-gatt-characteristic-list }

<div align="center"><em>Tabla: Consultar lista de características GATT personalizadas</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTCHAR?<svc>\r` |
| Respuesta | Para cada característica de ese servicio, devuelve una línea `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`, seguida de `\r\nOK\r\n`; si el servicio no existe: `\r\nERROR\r\n` |
| Parámetros | `svc`: número de ranura de servicio, 0–5. `chr`: índice de característica. `prop`: los bits de propiedad de la característica, en hexadecimal. `max_len`: longitud máxima del valor de la característica |
| Notas | Ninguna |

</div>

#### Añadir característica GATT personalizada { #add-custom-gatt-characteristic }

<div align="center"><em>Tabla: Añadir característica GATT personalizada</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `svc`: número de ranura de servicio, 0–5. `chr`: índice de característica, 0–7. `uuid`: UUID de la característica, MSB primero, 4 caracteres para 16 bits, 32 caracteres para 128 bits. `prop`: una cadena de propiedades compuesta por los caracteres R (leer), W (escribir con respuesta), w (escribir sin respuesta), N (notificar), I (indicar). `len`: longitud máxima del valor de la característica, 1–512 |
| Notas | Los cinco parámetros son obligatorios; omitir cualquiera devuelve `ERROR`. La longitud del UUID debe ser exactamente 4 o 32 caracteres. `prop` debe contener al menos un carácter de propiedad reconocido; si no se reconoce ninguno, devuelve `ERROR`; los caracteres no reconocidos dentro de `prop` simplemente se ignoran. `len` de 0 o superior a 512 devuelve `ERROR`. El servicio padre ya debe estar creado y aún no registrado con la pila de protocolo |

</div>

#### Iniciar (registrar) servicios GATT personalizados { #start-register-custom-gatt-services }

<div align="center"><em>Tabla: Iniciar (registrar) servicios GATT personalizados</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSTART\r` |
| Respuesta | `\r\n+GATTSTART:<count>\r\n` seguido de `\r\nOK\r\n`; forma de consulta `AT+GATTSTART?\r`: `\r\nERROR\r\n` |
| Parámetros | `count`: el número de servicios registrados exitosamente con la pila de protocolo en esta llamada |
| Notas | Registra en la pila de protocolos cada servicio que esté en uso, aún no se haya registrado y contenga al menos una característica. Una vez registrado, el servicio ya no puede retirarse ni reconfigurarse durante la ejecución. No se admite la forma de consulta. |

</div>

#### Enviar datos de característica GATT (notificar/indicar) { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>Tabla: Enviar datos de característica GATT (notificar/indicar)</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`; omitiendo el identificador de conexión: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n`; forma de consulta `AT+GATTSEND?\r`: `\r\nERROR\r\n` |
| Parámetros | `svc`: número de ranura de servicio. `chr`: índice de característica. `conn_hdl`: identificador de conexión BLE en hexadecimal, numerado desde 1; puede omitirse. `hex`: datos que se van a enviar, expresados como una cadena hexadecimal con un número par de caracteres. La longitud efectiva también está limitada por el tamaño máximo de una trama AT ASCII. |
| Notas | Cuando se omite `conn_hdl`, se usa la primera conexión BLE actual. El servicio objetivo ya debe estar registrado y el índice de característica debe ser válido; si las propiedades de la característica incluyen Indicar (I), se usa una indicación, de lo contrario una notificación. |

</div>

#### Guardar configuración GATT personalizada en flash { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>Tabla: Guardar configuración GATT personalizada en flash</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTSTORE\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n`; forma de consulta `AT+GATTSTORE?\r`: `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Guarda en flash la configuración actual de todos los servicios y características. Solo se conservan los datos de configuración; no se guarda información de ejecución, como el estado de registro. Devuelve `ERROR` si KVDB no está listo o falla la escritura. No se admite la forma de consulta. |

</div>

#### Borrar configuración GATT personalizada en flash { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>Tabla: Borrar configuración GATT personalizada en flash</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTCLEAR\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; forma de consulta `AT+GATTCLEAR?\r`: `\r\nERROR\r\n` |
| Parámetros | Ninguno |
| Notas | Elimina la configuración GATT guardada en flash. No afecta la configuración actual en RAM. No se admite la forma de consulta. |

</div>

#### Consultar la carga automática de GATT al encender { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabla: Lectura del ajuste de carga automática de GATT al encender</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTAUTOSTART?\r` |
| Respuesta | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| Parámetros | `v`: valor actual; 0 = desactivado, 1 = activado. Valor predeterminado: 1. |
| Notas | Ninguna |

</div>

#### Configurar la carga automática de GATT al encender { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabla: Configuración de la carga automática de GATT al encender</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+GATTAUTOSTART=<v>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `v`: 0 = desactivado, 1 = activado. Valor predeterminado: 1. |
| Notas | El ajuste actualiza la configuración. Cuando está habilitado, el dispositivo carga automáticamente la configuración de servicio GATT guardada al encender. |

</div>

## Eventos no solicitados (URC) { #unsolicited-events-urc }

Las siguientes son notificaciones de estado que el módulo emite por iniciativa propia; el host no necesita enviar un comando para recibirlas. Su emisión se controla con `AT+EVT`; en modo silencioso no se envían.

### Notificación de disponibilidad IM_READY { #im_ready-ready-indication }

<div align="center"><em>Tabla: Notificación de disponibilidad IM_READY</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Ninguno (notificación emitida automáticamente por el firmware; no la envía el usuario) |
| Respuesta | Cadena de notificación: `\r\nIM_READY\r\n` |
| Parámetros | Ninguno |
| Notas | Se emite una vez cuando el módulo termina la inicialización y queda disponible. También se vuelve a emitir cuando se han desconectado todos los enlaces y el número de conexiones activas vuelve a cero. La emisión se controla con `AT+EVT`; el ajuste `AT+EVT=1` suprime estas notificaciones. |

</div>

### Notificación de conexión IM_CONN { #im_conn-connection-indication }

<div align="center"><em>Tabla: Notificación de conexión IM_CONN</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Ninguno (notificación emitida automáticamente por el firmware al establecerse una conexión) |
| Respuesta | Modo de comando: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`; modo transparente: `\r\nIM_CONN\r\n` |
| Parámetros | `hdl`: identificador de conexión, exactamente 4 dígitos hexadecimales en mayúsculas, completado con ceros a la izquierda. En BLE se muestra un identificador numerado desde 1 (el identificador interno más 1); los demás tipos muestran el valor sin procesar. `addr`: dirección del dispositivo remoto, 12 dígitos hexadecimales, con el byte más significativo primero. `mtu`: MTU de la conexión actual, en decimal. |
| Notas | En modo de comando se emite una notificación por cada conexión establecida, con el identificador, la dirección del dispositivo remoto y la MTU. En modo transparente solo se notifica la primera conexión (cuando el número de conexiones es 1), sin parámetros. La emisión se controla con `AT+EVT`; el ajuste `AT+EVT=1` suprime estas notificaciones. |

</div>

### Notificación de desconexión IM_DISCONN { #im_disconn-disconnect-indication }

<div align="center"><em>Tabla: Notificación de desconexión IM_DISCONN</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Ninguno (notificación emitida automáticamente por el firmware al cerrarse una conexión) |
| Respuesta | Modo de comando: `\r\nIM_DISCONN:<hdl>\r\n` |
| Parámetros | `hdl`: identificador de la conexión desconectada, exactamente 4 dígitos hexadecimales en mayúsculas, completado con ceros a la izquierda. En BLE se muestra un identificador numerado desde 1 (el valor sin procesar más 1); los demás tipos muestran el valor sin procesar. |
| Notas | Solo contiene el identificador y se emite en modo de comando, no en modo transparente. En ambos modos, cuando se han cerrado todas las conexiones y el número de conexiones activas vuelve a cero, también se emite `\r\nIM_READY\r\n`. La emisión se controla con `AT+EVT`; el ajuste `AT+EVT=1` suprime estas notificaciones. |

</div>

## Comandos en formato PDU { #pdu-format-commands }

### Notificación de datos PDU (opcode 0x0101) { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>Tabla: Notificación de datos PDU (módulo → host, opcode 0x0101)</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Ninguno (notificación emitida automáticamente por el firmware en modo de comando) |
| Respuesta | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| Parámetros | `opcode` es fijo en `0x0101`; `body` = `conn_hdl` (2 bytes little-endian) + `data`. BLE usa el identificador externo numerado desde 1; SPP usa el identificador ACL sin procesar. |
| Notas | En modo de comando, cuando se escriben datos en una característica BLE personalizada o se reciben por Bluetooth clásico SPP, el módulo los reporta al host en el formato anterior; en modo transparente, los datos se emiten directamente. |

</div>

### Envío de datos en modo PDU (selección automática de característica de notificación, opcode 0x0101) { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>Tabla: Envío de datos en modo PDU (selección automática de característica de notificación, opcode 0x0101)</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Trama binaria (no es una línea AT de texto): `AT>` + opcode(2 bytes little-endian) + len(2 bytes little-endian) + body + `\r`. Aquí opcode = `0x0101` (secuencia de bytes 01 01); len es el recuento de bytes de body; body = `conn_hdl`(2 bytes little-endian) + `data`. `data` es la carga útil que se enviará. |
| Respuesta | Sin cadena de respuesta de texto. El firmware reenvía `data` al par según el tipo de conexión, sin responder `OK`/`ERROR`. |
| Parámetros | `opcode`: fijo `0x0101`. `len`: longitud de body, rango 2–508 (las tramas de menos de 2 o más de `AT_RX_BUF_SIZE`-4 se descartan; `AT_RX_BUF_SIZE` = 512). `conn_hdl`: identificador de conexión de destino; para BLE, el valor externo numerado desde 1; para SPP, el identificador ACL sin procesar. `data`: bytes de carga útil, longitud = len-2, puede ser 0. |
| Notas | `conn_hdl` se resuelve primero como identificador BLE numerado desde 1 (es decir, `conn_hdl`-1 corresponde a una ranura BLE); si no hay coincidencia, se busca el valor sin procesar en una ranura SPP. Si no se encuentra la conexión, se descarta la trama. Para BLE, el firmware recorre los servicios GATT personalizados y selecciona automáticamente la primera característica con propiedad Notify o Indicate; si no existe ninguna, no se envía nada. Para SPP (BR/EDR), `data` se envía por el canal SPP. La trama debe ir seguida inmediatamente de `\r`; si falta, se descarta la trama actual. Si no llegan bytes nuevos antes del umbral de timeout PDU entre tramas, se reinicia el estado de recepción PDU. |

</div>

### Envío de datos en modo PDU (especificar servicio y característica, opcode 0x0102) { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>Tabla: Envío de datos en modo PDU (especificar servicio y característica, opcode 0x0102)</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Una trama binaria (no una línea AT de texto): `AT>` + opcode(2 bytes little-endian) + len(2 bytes little-endian) + body + `\r`. Aquí opcode = `0x0102` (secuencia de bytes 02 01); len es el recuento de bytes de body; body = `conn_hdl`(2 bytes little-endian) + `svc_idx`(1 byte) + `char_idx`(1 byte) + `data`. |
| Respuesta | Sin cadena de respuesta de texto. El firmware envía `data` al par mediante el servicio/característica especificado, sin responder `OK`/`ERROR`. |
| Parámetros | `opcode`: fijo `0x0102`. `len`: longitud de body, rango 4–508 (el mínimo general de la capa de recepción es 2, pero este opcode requiere que body tenga al menos 4 bytes, incluidos `svc_idx` y `char_idx`); de lo contrario, se descarta. `conn_hdl`: identificador BLE de destino numerado desde 1 (valor externo mostrado). `svc_idx`: índice del servicio GATT personalizado. `char_idx`: índice de característica dentro de ese servicio. `data`: bytes de carga útil, longitud = len-4, puede ser 0. |
| Notas | Solo se admiten conexiones BLE; si la conexión resuelta es de tipo SPP, se descarta la trama. `svc_idx` debe corresponder a un servicio personalizado registrado y `char_idx` debe ser menor que el número de características de ese servicio; de lo contrario, se descarta la trama. La característica especificada debe tener la propiedad Notify o Indicate; si no, se descarta la trama. `conn_hdl` se resuelve con la misma regla que `0x0101` (primero el identificador BLE numerado desde 1 y luego el valor sin procesar). La trama debe ir seguida inmediatamente de `\r`. |

</div>

### Desconexión en modo PDU { #pdu-mode-disconnect }

<div align="center"><em>Tabla: Desconexión en modo PDU</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | `AT+DISCONN\r` (sin parámetro) o `AT+DISCONN=<conn_hdl>\r` |
| Respuesta | Éxito: `\r\nOK\r\n`; fallo: `\r\nERROR\r\n` |
| Parámetros | `conn_hdl`: el identificador de conexión a desconectar, hexadecimal. Las conexiones BLE están basadas en 1 (valor de visualización externo); el valor no debe ser 0 (0 se trata como entrada inválida y devuelve `ERROR`). Las conexiones SPP usan el identificador de conexión ACL sin procesar. |
| Notas | Sin parámetro, se desconectan todas las conexiones actuales y se devuelve `OK`. Con un parámetro, se busca primero el identificador BLE numerado desde 1 (`conn_hdl`-1 corresponde a una ranura BLE); si no hay coincidencia, se busca el valor sin procesar en una ranura SPP. Si no se encuentra la conexión, se devuelve `ERROR`. Para BLE, la desconexión se inicia con el código de razón `0x13`; para SPP, se inicia usando la dirección del par. La forma de consulta `AT+DISCONN?` devuelve `ERROR`. |

</div>

### Indicación de estado de conexión PDU (IM_CONN / IM_DISCONN) { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>Tabla: Indicación de estado de conexión PDU (IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| Elemento | Contenido |
|:-----|:--------|
| Comando | Notificación emitida automáticamente por el módulo; no requiere un comando del host. `IM_CONN` se emite al establecerse una conexión y `IM_DISCONN` al cerrarse una conexión. |
| Respuesta | Modo de comando, conexión establecida: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`, donde `<hdl>` es un identificador hexadecimal de 4 dígitos, `<mac>` es una dirección hexadecimal de 12 dígitos (byte más significativo primero), y `<mtu>` es un MTU decimal. Modo de comando, conexión caída: `\r\nIM_DISCONN:<hdl>\r\n` (`<hdl>` son 4 dígitos hexadecimales). El modo transparente reporta `\r\nIM_CONN\r\n` (sin parámetros) solo cuando se establece la primera conexión, y no reporta `IM_DISCONN` al desconectar. Ambos modos reportan `\r\nIM_READY\r\n` una vez que todas las conexiones han caído. |
| Parámetros | `<hdl>`: identificador de conexión; las conexiones BLE se muestran basadas en 1 (interno basado en 0 más 1), las conexiones SPP muestran el identificador sin procesar. `<mac>`: la dirección Bluetooth del par. `<mtu>`: el MTU negociado. |
| Notas | La emisión se controla con `AT+EVT`: con el valor 0 (predeterminado), las notificaciones se envían con normalidad; con el valor 1, se suprimen `IM_READY`, `IM_CONN` e `IM_DISCONN`. El formato y el contenido dependen del modo de operación actual (modo de comando o modo transparente), como se ha descrito arriba. |

</div>

## Apéndice { #appendix }

### Valores comunes de clase de dispositivo { #common-class-of-device-values }

<div align="center"><em>Tabla: Valores comunes de clase de dispositivo</em></div>

<div align="center" markdown>

| Tipo de Dispositivo | Valor Hexadecimal |
|:-------------|:-----------|
| Computadora | `0x000100` |
| Teléfono | `0x000200` |
| Punto de Acceso LAN/Red | `0x000300` |
| Audio/Video | `0x000400` |
| Periférico (teclado/ratón, etc.) | `0x000500` |
| Imagen (impresora/escáner, etc.) | `0x000600` |

</div>
