---
icon: lucide/layout-dashboard
title: "Ejemplos de LVGL del SDK"
description: "Elija el ejemplo LVGL de SiFli-SDK adecuado para arrancar la interfaz, widgets, herramientas de diseño, recursos comprimidos, animación, medios y wearables."
tags:
  - Gráficos
  - LVGL
  - Ejemplos
---

# Ejemplos LVGL del SDK { #lvgl-sdk-examples }

Los ejemplos LVGL de SiFli-SDK sirven como punto de partida para probar la pantalla y la UI, no como plantillas de producto intercambiables. Primero confirme el funcionamiento básico del panel y la entrada con una demo de la versión adecuada. Después elija el ejemplo que cubra el principal riesgo de integración del producto, ejecútelo sin cambios con una configuración de placa documentada y sustituya una capa cada vez. Consulte el estado de verificación y las restricciones de cada README antes de considerarlo una referencia funcional.

Esta guía organiza los ejemplos del [índice LVGL de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) según el objetivo de ingeniería. Consulte la página oficial para conocer las placas compatibles actualmente, la configuración del SDK, la ruta del código fuente, los recursos, el comando de compilación y las restricciones de cada versión.

El índice es un catálogo, no una matriz de compatibilidad de placas. El soporte depende de cada ejemplo, y el nombre de una familia en la URL de documentación no demuestra que esa familia sea compatible. Consulte la sección **Supported Boards** de cada ejemplo. Un comando de compilación genérico o la presencia de una placa en la matriz de compilación del repositorio no demuestran por sí solos que se haya validado su funcionamiento. Si las fuentes difieren, mantenga explícita la distinción y compruebe la revisión exacta del SDK y la placa.

## Empiece con una configuración de referencia adecuada para LVGL { #start-with-the-right-lvgl-baseline }

<div align="center"><em>Tabla: Ejemplos LVGL de SiFli-SDK por tarea de ingeniería</em></div>

<div align="center" markdown>

| Objetivo de ingeniería | Ejemplo recomendado | Qué permite validar | Pase al siguiente paso cuando |
|:-----------------|:-----------|:----------------------------|:-------------|
| Poner en marcha una aplicación LVGL estándar | **[Demos LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[Ejemplos oficiales LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[Demo LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)** o **[Ejemplos oficiales LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | La versión de LVGL elegida, el controlador de pantalla de la placa, el bucle de renderizado y los widgets básicos | La ruta de actualización de pantalla (flush) y el dispositivo de entrada funcionan de forma estable en el panel real |
| Evaluar un flujo de diseño de UI | Ejemplos de **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)** o **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** | Cómo integrar en el proyecto SDK el código de UI generado | El código generado compile sin errores y utilice la misma versión de LVGL que el proyecto |
| Prototipar un comportamiento concreto de UI | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)** o **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | Un patrón concreto de interacción, widget, disposición o animación | El producto necesita una pantalla compuesta en lugar de un elemento visual aislado |
| Validar recursos, animación o medios | **[Carga dinámica de eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Reproducción de vídeo local](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)** o **[Streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | La ruta de almacenamiento, decodificación, renderizado y actualización de pantalla para contenido más rico | Se hayan medido en el hardware objetivo el tamaño de los recursos, su ubicación en memoria, la tasa de actualización y el consumo energético, y se haya confirmado que cumplen los límites del producto |
| Construir una UI completa y representativa | **[Brújula electrónica](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Índice de juegos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([README de Buscaminas](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)) o **[Interfaz de reloj v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | El flujo de pantallas, la interacción y una carga gráfica con varias funciones | Los datos específicos del producto, el comportamiento durante su ciclo de vida y los límites reales de rendimiento estén definidos para sustituir el contenido de demostración |

</div>

Las listas de placas varían según el ejemplo. El README de v8 Demos enumera `eh-lb563` y las series LCD SF32LB52x, SF32LB56x y SF32LB58x. El README de v8 Official Examples enumera `sf32lb52-lchspi-ulp` y esas tres series LCD. El README de v9 Demo enumera las tres series LCD; sus instrucciones genéricas de compilación también muestran `eh-lb563`, que no aparece en la lista explícita **Supported Development Boards**. El README de v9 Official Examples enumera `sf32lb52-lchspi-ulp` y las tres series LCD. Tome la lista explícita de cada README como el alcance documentado; no añada una placa basándose solo en un ejemplo genérico de compilación.

## Confirme primero el límite de la integración { #confirm-the-integration-boundary-first }

Antes de adaptar un ejemplo LVGL, determine qué capas valida y cuáles todavía debe resolver el producto:

<div align="center"><em>Tabla: Alcance de integración de los ejemplos LVGL</em></div>

<div align="center" markdown>

| Área | Qué valida el ejemplo | Qué debe resolver el producto |
|:---------|:--------------------------|:--------------------------------|
| Placa y panel | Una configuración de placa SDK conocida y una ruta de visualización | El panel concreto, el controlador táctil, la secuencia de alimentación, la asignación de pines, los tiempos de reinicio y el proceso de prueba para producción |
| LVGL | La inicialización propia de la versión y el comportamiento de la UI de ejemplo | La arquitectura de pantallas del producto, la gestión de eventos, los límites de memoria y la política de actualización |
| Recursos | Una ruta compatible para cargar los recursos de ejemplo | El formato, el espacio de almacenamiento, el tiempo de carga, la política de caché, las licencias y el tratamiento de errores |
| Renderizado | Un ciclo completo de renderizado y actualización del panel (flush) | La estrategia para actualizar regiones modificadas, el número de búferes, el formato de color, el manejo de DMA y caché y la respuesta de la UI bajo carga |
| Aplicación | El comportamiento visible de la demostración | Los sensores, Bluetooth, el almacenamiento, la gestión del tiempo, las transiciones de bajo consumo, la recuperación ante fallos y los datos del usuario |

</div>

Empiece por verificar la pantalla física, su interfaz y el proceso básico de actualización. Consulte [Resumen de gráficos](overview.md) y [Controlador de pantalla](display-controller.md); una demo LVGL por sí sola no demuestra que la arquitectura gráfica final esté lista.

## Elija con cuidado la versión de LVGL { #choose-the-lvgl-version-deliberately }

El índice oficial incluye ejemplos tanto de LVGL v8 como de LVGL v9. Mantenga el proyecto de UI generado, el ejemplo de referencia y la configuración del SDK en la misma versión mayor de LVGL. No traslade a otra versión mayor una pantalla generada o un widget personalizado sin revisar las adaptaciones necesarias.

Para poner en marcha la placa por primera vez, use la demo o el ejemplo oficial que coincida con la versión de LVGL seleccionada en la configuración de la placa del SDK. Así podrá validar el panel, los búferes, la entrada y la planificación del sistema antes de empezar el desarrollo específico de la aplicación.

!!! warning "Haga una copia de seguridad antes de usar el ejemplo SJPG de LVGL v8"
    En el proyecto v8 Official Examples, la ruta opcional que carga SJPG desde una tarjeta TF llama a `dfs_mkfs()` en la región raíz si falla el montaje, lo que puede borrar datos. Haga una copia de seguridad antes de habilitar y ejecutar esa ruta, y revise el código de su revisión del SDK. No generalice esta advertencia a todos los ejemplos de LVGL v8 o v9: compruebe el comportamiento de montaje y formateo de cada proyecto.

## Generación de UI con gui_guider, SquareLine y EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

Use un ejemplo de una herramienta de diseño de UI cuando el equipo necesite un editor visual para crear la jerarquía de pantallas, los estilos y los recursos. El índice incluye ejemplos de **gui_guider**, **SquareLine** y **EEZ Studio**.

Antes de importar el resultado de un generador al producto, compruebe la versión del código generado, la resolución de pantalla, la profundidad de color, las rutas de recursos y la responsabilidad sobre los callbacks.

Los ejemplos fuente de gui_guider y EEZ Studio especifican LVGL v8. SquareLine también exige el tema predeterminado utilizado por el código generado. Incluya los subdirectorios generados en la compilación y siga los pasos documentados de conversión opcional con eZip; copiar archivos no basta.

El código generado acelera el desarrollo de la UI, pero no sustituye al controlador de pantalla, la estrategia de búferes, los controladores de entrada, la política de bajo consumo ni las pruebas de integración. Mantenga los archivos generados separados de la lógica escrita a mano para evitar que una nueva exportación sobrescriba cambios del producto sin advertirlo.

## Patrones de widgets e interacción { #widget-and-interaction-patterns }

Use los ejemplos específicos de LVGL v8 para investigar un comportamiento de UI. Su alcance varía: Multlist es una demo completa del framework de aplicaciones, no una prueba mínima de widget.

- **Basechart** representa series de datos; **Baselabel** vincula fuentes de datos con texto actualizado periódicamente.
- **Follow** muestra un menú de iconos guiado por la gravedad; **Select**, estados de selección; **Sector**, una porción angular de imagen determinada por un valor.
- **Imgarray** compone lecturas numéricas con glifos de imagen; **Imgbar** recorta una imagen de primer plano para indicar progreso.
- **Mulroller** es un selector de rueda personalizable mediante callbacks; **Multroller**, un selector más sencillo de opciones de texto.
- **Multlist** cubre listas, paginación, transiciones, caché de recursos y ciclo de vida de páginas; **Multslider** muestra un valor o una etiqueta breve en el mando deslizante.
- **Multanim** muestra efectos de transición, algunos sujetos al soporte de GPU/VGLite; **Timeline** coordina animaciones en un eje temporal común.

La compatibilidad con placas no es uniforme entre estos ejemplos. Por ejemplo, las listas explícitas **Supported Boards** de Multanim y Multlist incluyen `sf32lb52-lcd_n16r8` y `sf32lb52-lchspi-ulp`, mientras que instrucciones genéricas posteriores mencionan objetivos 52x/56x/58x más amplios y usan `eh-lb563` como ejemplo de compilación. Esas declaraciones no describen el mismo alcance. Consulte el README concreto y la configuración actual del proyecto; no infiera la compatibilidad de los demás widgets a partir del índice o de la URL.

Use uno de estos ejemplos cuando un control concreto represente un riesgo para el producto. Limite los cambios de la primera adaptación: ejecute el control original, use datos del producto y mida el coste de redibujado y el uso de memoria antes de incorporarlo a una pantalla más compleja. Incluso varios controles visualmente sencillos pueden exigir demasiado al framebuffer, al ancho de banda de lectura de los recursos o a la planificación de los eventos de entrada.

## Cargas de recursos, animación y medios { #asset-animation-and-media-workloads }

Los ejemplos Dynamic eZip están disponibles para LVGL v8 y LVGL v9. Use la versión que corresponda a la aplicación para validar la carga dinámica de recursos comprimidos antes de adoptarla de forma generalizada. El artículo [eZip](ezip.md) explica la función de la compresión de recursos en el flujo gráfico.

Para recursos GIF/APNG animados, SiFli también ofrece los ejemplos [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) y [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html), incluidos en **Multimedia > AGIF**. Ambos README enumeran `eh-lb525`; la [matriz de compilación GCC](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) actual también registra las dos rutas de proyecto en `devkit_lcd_boards`. El registro en la matriz indica un objetivo de compilación, no que se haya validado el funcionamiento en todas las placas de ese grupo. Confirme el objetivo exacto y la revisión del SDK antes de usar cualquiera de los ejemplos como base de producto.

Los ejemplos de eZip dinámico comparan el acceso por ruta de archivo con la precarga en SRAM o PSRAM. La precarga usa memoria adicional y puede reducir lecturas repetidas. Genere los recursos para la versión correspondiente de LVGL v8/v9; a diferencia de v8, la ruta documentada de v9 requiere un prefijo de unidad como `A:/`. Compruebe el almacenamiento real y la configuración de la letra de unidad. El README v9 enumera explícitamente `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi` y `sf32lb58-lcd_n16r32n1_qspi`; no traslade esta lista a v8 ni infiera compatibilidad con otras placas. Solo para SF32LB57, la documentación de eZip requiere la opción de conversión `-winsize 2048`.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [reproducción de vídeo local](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html) y [reproducción en streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html) prueban rutas de contenido distintas, no niveles de complejidad predeterminados. El README de Lottie marca el ejemplo como **no verificado**, enumera `eh-lb563` y las series SF32LB52x/SF32LB56x, y la matriz de compilación GCC actual deja comentada la entrada del proyecto. Trate esa lista de placas como información no verificada, no como un conjunto de objetivos validados. El README de vídeo local enumera explícitamente `eh-lb523` y `sf32lb52-lcd_n16r8`, pero también incluye instrucciones genéricas más amplias; la entrada del proyecto está comentada en la matriz de compilación GCC actual. Antes de confiar en esas instrucciones para otro objetivo, compruebe la versión exacta del SDK. El ejemplo reproduce vídeo H.264 en `disk/video_example.mp4`; si la tarjeta TF se monta correctamente, primero lee `video_example.mp4` desde la raíz de la tarjeta. El README de streaming solo enumera `sf32lb52-lchspi-ulp`; obtiene acceso a la red mediante la conexión compartida Bluetooth PAN de un teléfono y utiliza FFmpeg. No es un ejemplo de streaming de vídeo por BLE.

Evalúe cada ejemplo como una carga del sistema. Con Bluetooth, los sensores y la interfaz de pantalla del producto activos, mida el almacenamiento de recursos o del flujo, el tiempo de decodificación, la frecuencia de fotogramas, el uso de PSRAM/SRAM, el ancho de banda de pantalla y el consumo de corriente. El costo computacional real depende de la complejidad del contenido, la resolución, la configuración del decodificador y los búferes.

Una demo breve y fluida no demuestra que el sistema pueda mantener una animación prolongada. Valide el producto con contenido de duración representativa y con la política de refresco real del panel.

## Fuentes tipográficas y cambio de idioma en tiempo de ejecución { #fonts-and-runtime-language-switching }

El [ejemplo de FreeType](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html) carga fuentes TrueType desde el sistema de archivos y permite cambiar la fuente y el tamaño en ejecución. Su README indica que se ha verificado en `sf32lb52-lchspi-ulp`; otras placas necesitan una partición `FS_REGION` y suficiente heap del sistema, por lo que el ejemplo no las valida. Incluye una fuente integrada de respaldo si falla la carga, comprobaciones de memoria dinámica y liberación de la fuente anterior al cambiarla. Compruebe los caracteres disponibles y la memoria utilizada con los idiomas y tamaños reales; reduzca las fuentes CJK grandes a los caracteres necesarios. La ruta documentada requiere contornos TrueType, no fuentes OpenType basadas en CFF. No libere una fuente mientras un widget o estilo siga utilizándola; los cambios deben ejecutarse en el hilo de LVGL. Si modifica las fuentes incluidas, regenere y grabe la imagen del sistema de archivos `fs_root.bin`: actualizar solo la aplicación no actualiza esos archivos.

Los ejemplos multilingües para [LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html) y [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html) cubren idiomas integrados, instalación de paquetes externos, cambio en ejecución, exploración del directorio de instalación y persistencia de la selección mediante `share_prefs`. El README v8 enumera `sf32lb52-lchspi-ulp`; compruebe la lista de objetivos del README v9 por separado, en vez de atribuirle la misma placa por suposición. Las entradas JSON o XLSX generan recursos compilados para los idiomas integrados o paquetes binarios externos. Mantenga las mismas claves de traducción en todos los idiomas y compruebe la cobertura de las fuentes. Pruebe el cambio, la persistencia tras reiniciar, los recursos ausentes y la actualización del sistema de archivos. Siga las rutas y la configuración documentadas para cada versión; no suponga que son idénticas solo porque los ejemplos tienen el mismo propósito.

## Brújula, juegos e interfaces de reloj { #compass-games-and-watch-interfaces }

Los ejemplos de brújula electrónica e interfaz de reloj combinan visualización y funciones de aplicación. Úselos para estudiar la organización de las pantallas, la temporización de la entrada y de las animaciones, y los efectos de una carga de pantalla más exigente. El índice de juegos enlaza a un ejemplo de Buscaminas. Su README enumera `eh-lb563` y las series SF32LB52x/56x, pero no 58x; antes de usarlo en 58x, compruebe el soporte en la versión actual del SDK.

La referencia documentada de brújula utiliza un magnetómetro de tres ejes MMC56x3 por I2C en `sf32lb52-lchspi-ulp`. Verifique el controlador, el cableado y la calibración para el producto real; mostrar el rumbo no demuestra por sí solo su precisión.

Los ejemplos de juegos e interfaz de reloj sirven como punto de partida para diseñar la navegación entre pantallas, pero el producto todavía debe definir la gestión de datos, el comportamiento de bajo consumo, la política de activación de la pantalla, las notificaciones y la recuperación ante fallos.

El README del reloj v8 enumera las series LCD SF32LB52x, SF32LB56x y SF32LB58x, además de `sf32lb52-lchspi-ulp`; el README v9 enumera las tres series LCD. Ambos excluyen `520-hdk` e indican que la demo de rotación 3D no está disponible en SF32LB55x. Compruebe las particiones de recursos al añadir fuentes; el ejemplo v8 puede desbordar la región asignada.

## Adapte un ejemplo sin perder la evidencia que aporta { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabla: Comprobaciones para adaptar ejemplos LVGL al producto</em></div>

<div align="center" markdown>

| Paso | Datos que deben conservarse | Por qué importa |
|:-----|:-----------------|:---------------|
| Compilar el original | Revisión del SDK, nombre de la placa, configuración y registro de compilación | Conserva una referencia funcional conocida |
| Ejecutar en hardware | Foto o vídeo, registro serie y comportamiento del panel y la pantalla táctil | Confirmación de la ruta real de visualización y entrada |
| Añadir un elemento del producto | Registro de cambios y mediciones de la frecuencia de fotogramas y el comportamiento de actualización | Permite atribuir las regresiones a cambios concretos |
| Probar la carga del producto | Respuesta de la UI con Bluetooth, sensores, almacenamiento y transiciones de bajo consumo | Revela límites de integración que una demo aislada no muestra |
| Registrar los límites finales | Uso de búferes, ubicación de memoria, frecuencia de fotogramas, consumo y fallos conocidos | Convierte el ejemplo en evidencia de ingeniería mantenible |

</div>

## Recursos relacionados { #related-resources }

- [Resumen de gráficos](overview.md) para elegir la pantalla, planificar el framebuffer, integrar LVGL y evaluar las compensaciones del sistema.
- [Controlador de pantalla](display-controller.md) para el controlador, los búferes y la ruta de transferencia de los píxeles a la pantalla (flush).
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md) y [TurboPixel](turbopixel.md) para las funciones de aceleración gráfica y compresión de SF32.
- [Ejemplos](../../develop/examples/index.md) para el catálogo transversal de ejemplos del SDK.
- [Índice de ejemplos LVGL de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) para consultar la lista oficial y la configuración vigente.
