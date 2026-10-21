---
icon: lucide/audio-lines
title: "Ejemplos de audio del SDK"
description: "Elija el ejemplo de SiFli-SDK que mejor se ajuste a la captura PDM, la grabación, la reproducción, los códecs, el almacenamiento y la mezcla de audio."
tags:
  - Audio
  - Ejemplos
---

# Ejemplos de audio del SDK { #audio-sdk-examples }

Los ejemplos de audio de SiFli-SDK son puntos de partida prácticos para validar una ruta de señal completa; no son firmware listo para integrar en un producto. Elija el que demuestre la parte más compleja de su diseño —captura con micrófono, salida por altavoz, almacenamiento, un códec o varios flujos simultáneos— y ejecútelo sin modificar en la placa objetivo antes de adaptar un subsistema cada vez.

Esta página agrupa una selección de ejemplos de audio de SiFli-SDK por tarea de ingeniería. El [índice oficial de audio](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) sirve como punto de partida. Las placas indicadas en la tabla son las que las páginas oficiales de SiFli enumeran expresamente en el momento de esta revisión; el nombre de una serie no implica compatibilidad con todas sus placas ni con todas las versiones del SDK. Antes de compilar, compruebe la página de la versión concreta y la configuración de la placa objetivo.

## Elija el ejemplo adecuado { #start-with-the-right-example }

<div align="center"><em>Tabla: Ejemplos de audio de SiFli-SDK organizados por tarea</em></div>

<div align="center" markdown>

| Objetivo de ingeniería | Ejemplo recomendado | Qué permite validar | Placas y límites documentados oficialmente |
|:-----------------|:-----------|:---------------|:----------------------------|
| Capturar audio con dos o cuatro micrófonos digitales | [Ejemplo PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | Captura PDM; grabación WAV y reproducción en los modos que las admiten | La página actual solo enumera `sf32lb56-lcd_a128r12n1`. Compruebe el cableado PDM y la multiplexación de pines. La descripción de la configuración de pines contiene un error en el nombre de la placa: `f32lb56-lcd_a128r12n1` (falta la `s` inicial). El comando de compilación usa el nombre correcto. |
| Capturar audio con dos micrófonos analógicos | [Ejemplo de música local para altavoz estéreo (Local Music Example for stereo speaker, ADC/DAC dual)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Captura simultánea en archivos PCM separados; permite seleccionar un micrófono para monitorizarlo por el altavoz | Requiere una placa SF32LB58x personalizada; no funciona en placas de módulos SiFli. Necesita dos micrófonos y dos altavoces analógicos. |
| Validar la ruta básica de micrófono a altavoz | [Ejemplo de grabación](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Captura de cinco segundos del micrófono en un búfer PCM en memoria y reproducción automática | `eh-lb525`, las series `sf32lb52-lcd`, `sf32lb56-lcd` o `sf32lb58-lcd`; requiere un altavoz. |
| Reproducir audio preconfigurado desde el sistema de archivos raíz | [Ejemplo de música local](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | Reproducción del archivo preconfigurado `16k.wav` desde la partición raíz FAT montada; también admite MP3 si cabe en la capacidad configurada | `eh-lb525`, las series `sf32lb52-lcd`, `sf32lb56-lcd` o `sf32lb58-lcd`; requiere la partición raíz FAT y un altavoz. |
| Reproducir música desde una tarjeta SD | [Reproductor local de MP3](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | Reproducción de MP3 o WAV desde `music` en la tarjeta SD y control del volumen desde el shell | La página actual solo enumera `sf32lb52-lchspi-ulp`; requiere SPI1, FAT/MSD y un altavoz. Para detectar pulsaciones largas también hace falta una batería externa. |
| Grabar, comprimir, decodificar y reproducir audio sin pérdidas | [Ejemplo FLAC](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | Grabación PCM, codificación FLAC, decodificación y reproducción | Las series `sf32lb52-lcd`, `sf32lb56-lcd` y `sf32lb58-lcd`; requiere FAT, `libFLAC` y componentes de audio. |
| Grabar, comprimir, decodificar y reproducir audio para aplicaciones de voz | [Ejemplo Opus](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | Captura con micrófono a 16 kHz, codificación y decodificación Opus, y reproducción por altavoz | La página actual solo enumera `eh-lb525`; requiere FAT y componentes de audio. Siga las indicaciones de pila específicas de este ejemplo que se explican más abajo. |
| Mezclar varias pistas locales | [Reproductor mezclador de tres canales (página oficial en chino)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Decodificación independiente de tres archivos locales, remuestreo cuando es necesario y salida mezclada | La página actual enumera como placas probadas `sf32lb52-lcd_n16r8` y `sf32lb56-lcd_n16r12n1`; use la imagen del sistema de archivos y los archivos indicados para el ejemplo. |

</div>

## Requisitos comunes { #shared-starting-point }

La mayoría de los ejemplos comparten estos requisitos: la placa debe contar con el hardware de audio necesario y tenerlo conectado correctamente; su configuración debe habilitar los bloques de audio requeridos, y el ejemplo elegido debe ser compatible con ella. Los ejemplos que leen o escriben archivos también necesitan un sistema de archivos montado. No copie el nombre de una placa, una asignación de pines ni un ajuste de `menuconfig` de otro ejemplo sin comprobar la página de origen y los archivos de configuración de la placa objetivo.

!!! warning "Proteja los datos existentes del sistema de archivos"
    El ejemplo Opus de v2.5.1 llama a `dfs_mkfs()` si falla el montaje del sistema de archivos raíz ([código fuente](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). No incorpore esta recuperación mediante formato automático al producto sin una política explícita de conservación de datos. Un fallo de montaje no autoriza a borrar los datos del usuario.

Para todos los ejemplos, limite deliberadamente la primera validación:

1. Compile y grabe en una placa compatible el proyecto sin modificar.
2. Compruebe la captura o reproducción esperada con hardware de audio y archivos de referencia validados.
3. Anote la revisión del SDK, el nombre de la placa, la configuración, la asignación de pines y el registro de consola serie.
4. Modifique un solo elemento específico del producto y repita la misma prueba.

La [descripción general del audio](overview.md) explica las decisiones de interfaz y arquitectura que subyacen a estos ejemplos. Para la gestión de búferes, el cierre de sesiones y la coexistencia con la pantalla o Bluetooth, consulte [Audio Server y gestión de búferes](audio-server-buffering.md).

## Captura con micrófonos digitales: PDM { #digital-microphone-capture-pdm }

Use el ejemplo PDM cuando el producto necesite captar audio con micrófonos digitales en lugar de una entrada analógica. El ejemplo oficial admite dos o cuatro micrófonos PDM, pero la creación del archivo de grabación y su reproducción dependen del modo de procesamiento. La topología documentada utiliza los canales izquierdo y derecho de `PDM1` para dos micrófonos y añade `PDM2` para llegar a cuatro. Una interfaz PDM puede admitir hasta dos micrófonos digitales; por tanto, el número de interfaces no equivale al número de micrófonos. Confirme la configuración admitida consultando el mapeo de interfaces y canales del SoC de destino.

La página de origen actual indica `sf32lb56-lcd_a128r12n1` como placa compatible. El modo `pdm open pdm12 4 raw` solo genera registros; no crea un archivo de grabación. Los modos de procesamiento Anyka producen salida mono, incluso con cuatro micrófonos: cuatro entradas no implican un archivo de cuatro canales. Compruebe las dependencias del algoritmo y el formato de salida antes de usarlo como referencia para una matriz de micrófonos.

Antes de adaptarlo, compruebe estos cuatro aspectos:

- El chip y la placa elegidos exponen las señales PDM necesarias.
- Las señales de reloj y datos, la alimentación y la conexión a tierra de cada micrófono se ajustan a su hoja de datos.
- La configuración de multiplexación de pines de la placa asigna las funciones PDM antes de iniciar el controlador.
- El producto necesita los servicios de grabación y reproducción que habilita el ejemplo; no hacen falta para limitarse a capturar datos PDM.

La página de origen de PDM documenta una configuración de placa compatible y un ejemplo de asignación de pines. Úselos como referencia validada, pero sustitúyalos por el cableado real de la placa objetivo; no dé por hecho que se pueden trasladar sin cambios. Consulte el [ejemplo PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html).

## Captura analógica y grabación/reproducción básica { #analog-capture-and-basic-recordplayback }

El **ejemplo de grabación** es la forma más sencilla de validar la captura del micrófono seguida de reproducción local: graba durante cinco segundos en un búfer PCM en memoria y después lo reproduce automáticamente por el altavoz. La página oficial enumera `eh-lb525` y las series `sf32lb52-lcd`, `sf32lb56-lcd` y `sf32lb58-lcd`. Es un buen punto de partida antes de añadir un sistema de archivos, compresión, transporte Bluetooth o varios micrófonos.

El **Local Music Example for stereo speaker** (ejemplo ADC/DAC dual) es una referencia especializada para una placa SF32LB58x personalizada. La página oficial indica que no funciona en placas de módulos SiFli y que requiere dos micrófonos analógicos y dos altavoces analógicos. El comando `mic2file` graba ambos micrófonos a la vez en archivos PCM separados; `mic2speaker 0` o `mic2speaker 1` selecciona uno para monitorizarlo por el altavoz. Úselo solo si esta topología analógica coincide con el producto; de lo contrario, empiece con el ejemplo de grabación, más sencillo.

En ambos casos, compruebe el nivel de ruido de fondo sin señal, la ganancia, la saturación y el comportamiento al iniciar y detener antes de investigar funciones de software. Una ruta estable de captura y reproducción PCM es la base para integrar códecs, archivos y Bluetooth.

## Reproducción local y almacenamiento { #local-playback-and-storage }

El **ejemplo de música local** es la referencia más sencilla para reproducir archivos. La página oficial enumera `eh-lb525` y las series `sf32lb52-lcd`, `sf32lb56-lcd` y `sf32lb58-lcd`. Monta la partición raíz FAT y reproduce el archivo preconfigurado `16k.wav`. También puede reproducir un MP3 preconfigurado, colocado en el directorio `disk/` del ejemplo, siempre que quepa en la capacidad configurada del sistema de archivos. Úselo para validar pronto la salida local por altavoz y reproducir tonos de notificación o mensajes incluidos en el producto.

El **reproductor local de MP3** añade almacenamiento extraíble: reproduce MP3 o WAV desde el directorio `music` de una tarjeta SD y controla el volumen desde el shell. Ambos ejemplos de reproducción local necesitan un sistema de archivos; este usa además SPI1 y el controlador SPI MSD. En la placa documentada `sf32lb52-lchspi-ulp`, conecte una batería; de lo contrario, no se detectarán las pulsaciones largas. Elija este ejemplo cuando el producto utilice una tarjeta SD.

Ambos ejemplos validan la reproducción, pero no implementan una arquitectura general de reproductor multimedia. Antes de convertir uno en una función de producto, diseñe por separado la indexación de archivos, el manejo de archivos dañados, las interrupciones, la recuperación tras cambios de estado de energía y el comportamiento de la interfaz.

## Cadenas de procesamiento con FLAC y Opus { #flac-and-opus-codec-pipelines }

El **ejemplo FLAC** cubre el flujo completo sin pérdidas: grabar PCM con el micrófono, codificarlo en FLAC, decodificarlo y reproducirlo. La página oficial enumera las series `sf32lb52-lcd`, `sf32lb56-lcd` y `sf32lb58-lcd`; requiere FAT, `libFLAC` y los componentes de audio. Sirve para probar una ruta de captura basada en archivos o comparar el espacio de almacenamiento con el PCM sin comprimir.

El **ejemplo Opus** cubre una ruta de compresión diseñada para aplicaciones de voz. La página de origen actual solo enumera `eh-lb525`. El ejemplo captura a 16 kHz, procesa tramas de 10 ms a aproximadamente 16 kbps y después decodifica y reproduce el flujo resultante. La documentación también especifica que el tamaño de pila requerido depende del modo de codificación elegido. Respete ese requisito al adaptar el ejemplo; no suponga que la pila predeterminada de la tarea bastará al añadir lógica de aplicación.

El README oficial de SiFli-SDK indica configuraciones de pila específicas para este ejemplo: usar `OPUS_STACK_SIZE` de 20k cuando `opus_test()` llama a `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))`; si no se fuerza ese modo, recomienda 200k. No son requisitos universales de Opus. Antes de adaptarlas, compruebe la revisión del SDK y la ruta de codificación que va a compilar, y mida el uso máximo de pila con la carga de trabajo del producto para dimensionar la tarea.

Ninguno de estos ejemplos implementa una llamada Bluetooth completa ni un producto de transmisión de extremo a extremo. Primero valide con ellos la codificación y decodificación locales; después integre el transporte, la gestión de búferes y la política de sesiones, y mida los márgenes de latencia y memoria.

## Mezcla de tres canales { #three-channel-mixing }

La página oficial actual del **reproductor mezclador de audio de tres canales** enumera como placas probadas `sf32lb52-lcd_n16r8` y `sf32lb56-lcd_n16r12n1`. El ejemplo lee tres archivos locales, decodifica cada flujo, remuestrea las entradas que no están a 48 kHz cuando hace falta, combina los flujos PCM mono y reproduce el resultado. El conjunto documentado contiene dos MP3 y un WAV; use la imagen del sistema de archivos y los nombres indicados, sin asumir que incluye cualquier archivo de audio.

El mezclador revisado suma las tres muestras mono y divide por tres, en lugar de sumarlas a ganancia completa. Su ejecución documentada dura unos 50 segundos. Distinga esa política de ganancia y la duración limitada de la demostración de los requisitos de mezcla del producto.

Es una buena referencia para combinar avisos, efectos y música, cuando el producto necesita decidir qué sonidos pueden superponerse. No proporciona una política de audio lista para el producto: defina la prioridad de los flujos, el control de volumen, la respuesta ante la saturación, el presupuesto de memoria y qué hacer si un archivo de entrada o un decodificador no cumple su plazo. Consulte [Audio Server y gestión de búferes](audio-server-buffering.md) para concretar estas condiciones de ejecución.

## Adapte el ejemplo sin perder la evidencia { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabla: Qué conservar y volver a validar al adaptar ejemplos de audio</em></div>

<div align="center" markdown>

| Aspecto | Conserve del ejemplo | Vuelva a validar en el producto |
|:---------|:----------------------|:----------------------------|
| Hardware | Enrutamiento validado de la placa y ruta de periféricos compatible | Modelo de micrófono o altavoz, ganancia, alimentaciones, multiplexación de pines, diseño y acceso a pruebas de producción |
| Configuración | Componentes mínimos del SDK habilitados | Memoria, sistema de archivos, códecs, Audio Manager y opciones que realmente necesita el producto |
| Datos de audio | Formato de muestra y archivos de referencia validados | Frecuencia de muestreo, canales, tamaño de los búferes, latencia objetivo y gestión de errores |
| Comportamiento en ejecución | Secuencia básica de captura o reproducción | Interfaz de usuario, Bluetooth y almacenamiento concurrentes; cambios de estado de bajo consumo, recuperación y cierre |
| Evidencia | Comportamiento esperado según la fuente oficial | Registro serie, archivos de captura/reproducción, corriente medida y prueba de regresión repetible |

</div>

## Recursos relacionados { #related-resources }

- [Descripción general del audio](overview.md) para consultar las interfaces, los tipos de sesión, el consumo energético y la validación.
- [Audio Server y gestión de búferes](audio-server-buffering.md) para la gestión de flujos, los búferes DMA y las pruebas con cargas de producto.
- [Ejemplos](../../develop/examples/index.md) para consultar el catálogo de ejemplos del SDK de distintos ámbitos.
- [Índice de ejemplos de audio de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) para ver la lista oficial vigente y las instrucciones de configuración de cada ejemplo.
