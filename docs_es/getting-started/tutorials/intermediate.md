---
icon: lucide/trending-up
description: "Tutoriales de subsistemas conectados de SF32: sensores I2C, una pantalla básica con LVGL, un servicio periférico BLE, reproducción de audio local, almacenamiento en sistema de archivos y pruebas de coexistencia."
tags:
    - Tutoriales
---

# Integración de subsistemas { #intermediate-tutorials }

Estos tutoriales presuponen que ya conoce [Primeros pasos con los periféricos](beginner.md): GPIO, el shell, los fundamentos de ADC/PWM y el patrón de controlador `rt_device_find()`. Aquí pasará de periféricos individuales a middleware y flujos de trabajo combinados: sensores I2C, interfaz gráfica, servicios BLE, reproducción de audio, almacenamiento persistente y pruebas básicas de coexistencia.

La meta no es limitarse a ejecutar cada subsistema una vez, sino aprender cómo se suele ensamblar el firmware de SF32: partir de un ejemplo del SDK adecuado, verificar la ruta de hardware, conectarla a la capa de dispositivo de RT-Thread o al middleware y probarla junto con el resto del producto.

Utilice esta serie cuando los periféricos individuales ya funcionen y empiecen a importar los riesgos de integración: memoria compartida, temporización, consumo, cableado específico de la placa e interacciones entre componentes de middleware. El resultado de cada ejercicio debe ser un subsistema bien delimitado que pueda probar por separado, no solo una demostración visual.

## Antes de empezar { #before-you-start }

Los ejemplos de C son fragmentos, no archivos fuente completos. Añada los encabezados, las declaraciones, el manejo de errores y la liberación de recursos que requieran su proyecto y la versión del SDK.

Las rutas de los ejemplos y las placas compatibles pueden variar según la versión del SDK. Antes de compilar, consulte la lista «Supported Platforms» y los requisitos de hardware y configuración de cada ejemplo; que una placa admita un ejercicio no significa que admita los demás.

<div align="center"><em>Tabla: Antes de empezar</em></div>

<div align="center" markdown>

| Requisito | Por qué importa |
|:------------|:---------------|
| Shell operativo | Necesita `list_thread`, `list_device`, los registros y herramientas de inspección rápida. |
| E/S GPIO verificada | Muchas demostraciones de middleware siguen necesitando botones, LED o interrupciones. |
| Esquemático de la placa | Los pines I2C y de pantalla, la ruta de audio y la disposición del almacenamiento dependen de la placa. |
| Configuración de referencia validada | Conserve una compilación que sepa que funciona antes de combinar funciones. |
| Posibilidad de medir corriente | Al integrar subsistemas, puede cambiar el consumo en reposo, aunque todo parezca funcionar correctamente. |

</div>

## Lea un sensor por I2C { #read-a-sensor-over-i2c }

**Objetivo:** hablar con un periférico I2C real en lugar de con un único pin GPIO.

**Tiempo:** 30-45 minutos

**Ejemplo de partida:** `example/hal/i2c/master` o `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

El nombre `i2c1` es ilustrativo. Utilice el nombre de dispositivo I2C registrado por su placa y confirme que `rt_device_find()` devuelve un dispositivo válido antes de usar el bus.

1. Confirme en la hoja de datos la dirección I2C del sensor, el mapa de registros, la tensión de alimentación y las resistencias pull-up necesarias.
2. Confirme qué bus `i2cX` y qué pines usa su placa.
3. Adapte el ejemplo de EEPROM o maestro I2C para comunicarse con el sensor. Si tiene un registro de identificación, léalo primero; si no, empiece por un registro cuyo comportamiento esperado conozca.
4. Decodifique una medida real e imprímala a través del shell.
5. Si el sensor tiene una salida de interrupción o de datos listos, conéctela a una GPIO y aplique el patrón de interrupción del ejercicio 2 de Primeros periféricos.
6. Siempre que sea posible, sustituya el sondeo periódico por lecturas activadas por eventos.

**Criterios de éxito:** el firmware lee correctamente un registro conocido (el de identificación del dispositivo, si está disponible), decodifica un valor de sensor plausible y no bloquea el sistema si el dispositivo está ausente.

**Solución de problemas:** si las lecturas devuelven siempre `0xff` o `0x00`, o se agota el tiempo de espera, compruebe el formato de dirección (7 u 8 bits), las resistencias pull-up, la secuencia de alimentación y si otro periférico ocupa los mismos pines.

**Lo que ha aprendido:** transacciones I2C multibyte y cómo combinar un pin GPIO dirigido por interrupción con un periférico de bus.

## Construya una pantalla básica con LVGL { #build-a-basic-lvgl-screen }

**Objetivo:** obtener un elemento de interfaz real en la pantalla en lugar de escrituras directas al framebuffer.

**Tiempo:** 45-60 minutos

**Ejemplo de partida:** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. Ponga en marcha el controlador de pantalla y confirme los rellenos de color sólido antes de depurar los widgets de LVGL.
2. Cree una etiqueta y un botón.
3. Configure la función de retorno (callback) del botón para cambiar el texto de la etiqueta.
4. Añada una pequeña animación y observe el uso de CPU o la temporización de fotogramas mediante las herramientas del shell.
5. Lea las secciones del [Resumen de gráficos](../../learn/graphics/overview.md) sobre estrategia de buffer, refresco parcial y ePicasso antes de escalar.

**Criterios de éxito:** la pantalla se inicializa de forma consistente tras el reinicio; la entrada táctil o de un botón, si está disponible y configurada, cambia el estado de la interfaz; y una animación simple no bloquea la actividad del shell ni de Bluetooth.

**Solución de problemas:** separe los problemas del panel de los problemas de LVGL. Si los rellenos sólidos fallan, compruebe la alimentación, el reinicio, la secuencia de inicialización, el formato de píxel y el orden de bytes antes de tocar el código de LVGL.

**Lo que ha aprendido:** el modelo de objetos/eventos de LVGL y la secuencia de puesta en marcha de pantalla de la que parte todo proyecto centrado en gráficos.

## Anuncie y conecte como periférico BLE { #advertise-and-connect-as-a-ble-peripheral }

**Objetivo:** establecer la comunicación entre un teléfono o un dispositivo central BLE y la placa mediante un servicio GATT funcional.

**Tiempo:** 45-60 minutos

**Ejemplo de partida:** `example/ble/peripheral`

1. Empiece con el ejemplo de periférico básico y compruebe que la placa emite anuncios en una aplicación de escaneo BLE.
2. Conéctese desde el teléfono y confirme que el dispositivo permanece estable durante varios minutos.
3. Para enviar datos de sensores, configure en el servicio GATT del ejemplo una característica adecuada y actualícela con una medición real, como la lectura del ADC del ejercicio 4 de Primeros periféricos o la lectura del sensor I2C del ejercicio 1 de este bloque.
4. Configure las propiedades necesarias de la característica. Si utiliza notificaciones, habilítelas y confirme que el teléfono recibe los cambios.
5. Pruebe la desconexión y reconexión, así como el reinicio del dispositivo durante una conexión.
6. Lea el [Resumen de Bluetooth](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework) antes de diseñar un servicio personalizado.

**Criterios de éxito:** el dispositivo emite anuncios, establece la conexión, expone el servicio GATT configurado, intercambia datos según las propiedades elegidas para la característica y vuelve a un estado limpio tras desconectar/reconectar.

**Solución de problemas:** pruebe estos casos: datos de vinculación persistente obsoletos, olvidar el dispositivo desde el teléfono, reiniciar el dispositivo durante una conexión y cambiar los parámetros de conexión. Muchos fallos de BLE no aparecen hasta después de la primera conexión correcta.

**Lo que ha aprendido:** el flujo de emisión de anuncios -> conexión -> notificación GATT que utilizan la mayoría de los productos BLE.

## Reproduzca audio local desde el almacenamiento { #play-local-audio-from-storage }

**Objetivo:** reproducir un archivo de audio en lugar de un tono sintetizado.

**Tiempo:** 45-60 minutos

**Ejemplo de partida:** `example/multimedia/audio/local_music`

La documentación actual indica `sf32lb52-lchspi-ulp` como plataforma compatible con `example/multimedia/audio/mp3_sd_player`. No dé por hecho que funciona en su placa: antes de usarlo, consulte la lista de [plataformas compatibles y requisitos de hardware](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html).

1. Cargue un archivo WAV o MP3 pequeño en el medio de almacenamiento esperado por el ejemplo.
2. Compile y grabe el ejemplo.
3. Confirme que la reproducción se inicia, que el audio es limpio y que la placa no se reinicia cuando empiece la reproducción.
4. Integre la lógica de inicio y parada de la reproducción en el manejador del botón del ejercicio 2 de Primeros periféricos.
5. Vigile las interrupciones por falta de datos en el búfer (underruns) mientras estén activos los registros del shell o las actualizaciones de pantalla.
6. Lea el [Resumen del audio local](../../learn/audio/overview.md#playback-and-recording-basics) antes de cambiar la frecuencia de muestreo, el formato o el tamaño del buffer.

**Criterios de éxito:** puede iniciar, detener y reanudar la reproducción repetidamente sin chasquidos ni underruns; al detenerla, no queda activo innecesariamente ningún estado de alto consumo.

**Solución de problemas:** si el sonido se distorsiona, compruebe la frecuencia de muestreo, la profundidad de bits, la ruta de salida, la configuración del códec, el formato del archivo y el tamaño del búfer. Compruebe también si las lecturas del almacenamiento suministran datos al decodificador con suficiente rapidez.

**Lo que ha aprendido:** cómo se combinan el middleware de audio del SDK, la reproducción con búfer y la decodificación de archivos.

## Almacene y recupere datos persistentes { #store-and-retrieve-data-with-a-filesystem }

**Objetivo:** conservar datos entre reinicios en lugar de perderlos en cada reset.

**Tiempo:** 30-45 minutos

**Ejemplo de partida:** `example/storage/littlefs` o `example/storage/flashdb`

Utilice LittleFS para datos organizados en archivos. FlashDB es una base de datos embebida con modos de clave-valor (KVDB) y de series temporales (TSDB); el backend de almacenamiento y las placas compatibles dependen de la configuración del ejemplo. Consulte la documentación oficial de los ejemplos de [LittleFS NOR](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html) y [FlashDB](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html) antes de elegir el objetivo.

Las llamadas POSIX siguientes muestran el acceso a un sistema de archivos montado; no son llamadas a la API de FlashDB.

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. Elija un sistema de archivos como LittleFS para registros organizados en archivos. Para ajustes estructurados o registros con marcas de tiempo, evalúe los modos KVDB o TSDB de FlashDB y seleccione el backend adecuado para su placa y dispositivo de memoria.
2. Confirme la partición y la ruta de montaje que usa el ejemplo.
3. Escriba una pequeña entrada de registro o ajuste.
4. Haga un ciclo de apagado/encendido de la placa y confirme que los datos siguen presentes.
5. Registre periódicamente las lecturas de sensor del Tutorial 1.
6. Añada una política sencilla de retención, por ejemplo, para borrar registros antiguos y evitar que crezcan indefinidamente.

**Criterios de éxito:** los datos sobreviven al reinicio y el firmware gestiona con elegancia el almacenamiento ausente, lleno o recién formateado.

**Solución de problemas:** compruebe la disposición de las particiones, la ruta de montaje, los errores de borrado o escritura de la flash y el cierre de los archivos. Compruebe también si la frecuencia de escritura es excesiva para la vida útil prevista del almacenamiento.

**Lo que ha aprendido:** cuándo conviene usar un sistema de archivos o una base de datos embebida, y cómo conservar el estado del producto tras un reinicio.

## Combine dos subsistemas a propósito { #combine-two-subsystems-on-purpose }

**Objetivo:** ejecutar dos subsistemas a la vez y aprender cómo se afectan mutuamente.

**Tiempo:** 1 hora

**Ejemplo de partida:** los dos tutoriales, entre el 1 y el 5, más relevantes para su producto

1. Elija dos subsistemas que su producto vaya a necesitar realmente juntos, como BLE más un sensor I2C, o LVGL más reproducción de audio.
2. Verifique primero cada uno por separado.
3. Combínalos con los mínimos cambios posibles.
4. Sométalos a carga simultánea: envíe una notificación BLE durante una lectura I2C, anime la interfaz mientras se reproduce audio o escriba en el almacenamiento mientras se actualiza un sensor.
5. Vigile el uso de CPU, los registros, la memoria y el comportamiento visible para el usuario.
6. Compare lo que observa con el [Resumen de Bluetooth](../../learn/bluetooth/overview.md#coexistence-with-other-workloads), el [Resumen de gráficos](../../learn/graphics/overview.md#graphics-validation-matrix) y el [Resumen del diseño de bajo consumo](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product).

**Criterios de éxito:** ambos subsistemas siguen funcionando bajo actividad simultánea, y la corriente en reposo vuelve al nivel esperado cuando termina la prueba.

**Solución de problemas:** busque llamadas que bloqueen durante mucho tiempo, un exceso de registros, ráfagas de temporizadores, escrituras en rutas sensibles a la latencia y errores de coherencia o gestión de caché en búferes compartidos.

**Lo que ha aprendido:** dos subsistemas que funcionan por separado aún pueden interferir entre sí cuando comparten tiempo de CPU, ancho de banda de memoria, interrupciones y política de energía.

## Lista de comprobación para integrar subsistemas { #intermediate-integration-checklist }

- [ ] Cada tutorial parte de un ejemplo del SDK cuya funcionalidad ya se ha comprobado.
- [ ] Primero se verifica cada ruta de hardware: lectura de un registro o valor conocido del sensor, pantalla de color sólido, anuncio BLE, salida de audio o montaje del almacenamiento.
- [ ] La función sobrevive al reinicio y a la desconexión/reconexión cuando corresponde.
- [ ] Se prueban las rutas de error: sensor ausente, archivo ausente, teléfono desconectado, almacenamiento lleno.
- [ ] Se ha ejecutado al menos una prueba de carga combinada.
- [ ] Se ha comprobado el comportamiento en reposo después de que cada función se detenga.

## A dónde ir después { #where-to-go-next }

[Validación de producto](advanced.md) aborda el ajuste del consumo, las actualizaciones OTA, la puesta en marcha de pantallas y controladores personalizados, el Bluetooth con varias conexiones y la depuración en producción. Ese itinerario le ayudará a convertir demostraciones funcionales en firmware apto para un producto.
