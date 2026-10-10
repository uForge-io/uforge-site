---
icon: lucide/palette
title: "Resumen de gráficos"
description: "Guía para crear interfaces gráficas en SF32: selección de pantalla, estrategia de framebuffer, integración de LVGL, aceleración ePicasso y distribución de memoria."
tags:
  - Gráficos
---

# Resumen { #graphics-overview }

## Planifique la arquitectura gráfica { #overview }

Esta guía explica cómo crear interfaces gráficas ágiles en dispositivos SF32. Se centra en decisiones prácticas que afectan al producto: selección de pantalla, estrategia de framebuffer, integración de LVGL, aceleración por hardware ePicasso, distribución de memoria y actualización de la pantalla.

Los dispositivos SF32 están diseñados para productos AIoT compactos y wearables, donde la interfaz debe responder con fluidez sin superar los límites estrictos de consumo energético, memoria y superficie de PCB. El flujo gráfico separa la gestión de recursos, la composición de píxeles, la compresión opcional del framebuffer y la salida al panel. Entender la función de cada etapa ayuda a elegir la optimización adecuada.

Consulte esta página al tomar decisiones de arquitectura de UI que después resultan costosas de cambiar: panel e interfaz, estrategia de framebuffer, profundidad de color, transparencia, ubicación de recursos y política de actualización. Los artículos enlazados sobre gráficos explican cómo implementar cada etapa.

## Flujo gráfico de SF32 { #sf32-graphics-flow }

La ruta típica de recursos de pantalla es:

<div align="center"><em>Diagrama: flujo de recursos gráficos y visualización</em></div>

```text
Imágenes, fuentes y animaciones de origen
        │
        ▼
GraphicsTool convierte los recursos soportados a eZip o eZip-A
        │
        ▼
Recursos comprimidos en Flash NOR, PSRAM, NAND o almacenamiento de archivos
        │
        ▼
El decodificador hardware eZip descomprime un recurso cuando se necesita
        │
        ▼
LVGL u otro framework de UI + driver gráfico/de pantalla
        │
        ├── Renderizado de respaldo por CPU
        │
        └── Aceleración de píxeles por ePicasso
        │
        ▼
Mapa de bits final renderizado en un búfer de dibujo o framebuffer
        │
        ├── Ruta de pantalla sin comprimir
        │
        └── Opcional: extDMA lo comprime en TurboPixel
                    │
                    ▼
             Framebuffer TurboPixel en PSRAM
        │
        ▼
El controlador de pantalla transfiere los píxeles al panel
        │
        ▼
Panel SPI / QSPI / 8080 / RGB / MIPI DSI / EPD / JDI
```

El flujo es configurable: un producto puede prescindir de eZip, ePicasso, TurboPixel o de un framebuffer completo. La disponibilidad y las conexiones dependen del dispositivo, el SDK, la interfaz de pantalla, el panel y la configuración del controlador. El encabezado LCDC actual de OpenSiFli define `LCDC_SUPPORTED_COMPRESSED_LAYER` solo cuando está habilitado `HAL_EXTDMA_MODULE_ENABLED` y la condición de familia lo permite; SF32LB52x y SF32LB57x quedan excluidos. Un comentario del código también indica que la ruta LCPU aún no está habilitada. La tabla publicada de funciones LCDC del SDK marca como no compatible la descompresión de capas comprimidas en SF32LB55x; por eso, en 55x debe considerarse una capacidad condicional, no una ruta de ejecución validada de extremo a extremo. Compruebe la revisión exacta del SDK, el núcleo, la configuración de compilación y el hardware objetivo; consulte [TurboPixel](turbopixel.md#availability-in-the-sf32-family).

<div align="center"><em>Funciones de cada etapa del flujo gráfico de SF32</em></div>

<div align="center" markdown>

| Bloque | Etapa del flujo | Función principal | No sustituye a |
|:---|:---|:---|:---|
| **eZip / eZip-A** | Antes del renderizado, al leer recursos almacenados | Descomprime sin pérdida recursos gráficos eZip compatibles, incluidas imágenes estáticas y animaciones. | El motor de renderizado, el framebuffer final o el controlador de pantalla. |
| **ePicasso** | Durante el renderizado y la composición | Acelera las operaciones compatibles de copia, relleno, mezcla, transformación y composición de píxeles en memoria. | La compresión de recursos o la transferencia al panel. |
| **TurboPixel** | Después del renderizado y antes de la salida al panel, en dispositivos compatibles | Usa extDMA para comprimir con pérdida el mapa de bits final a una relación fija, lo que reduce la capacidad de PSRAM necesaria y el tráfico de lectura de pantalla. El encabezado actual habilita la capacidad de capas comprimidas para SF32LB55x, SF32LB56x y SF32LB58x cuando se activa extDMA, y excluye SF32LB52x y SF32LB57x; el comentario del código señala que la ruta LCPU no está habilitada. La tabla publicada marca 55x como no compatible, por lo que hay que verificar el núcleo, la configuración del SDK y la ruta en el hardware objetivo. | La compresión sin pérdida de recursos o el renderizado de píxeles. |
| **Controlador de pantalla** | Etapa final de salida | Descomprime TurboPixel si se activa esa ruta y transfiere los píxeles preparados al panel. | La descompresión de recursos eZip o la composición gráfica. |

</div>

El código de la aplicación define el estado y el comportamiento de la interfaz. El framework gestiona los widgets, las áreas que deben redibujarse y el dibujo. El controlador gráfico/de pantalla decide si ejecuta las operaciones en la CPU o en ePicasso y coordina los búferes; el controlador de pantalla se encarga de transferir los datos al panel. Para conocer los detalles de cada función, consulte [ePicasso](epicasso-gpu.md), [eZip](ezip.md) y [TurboPixel](turbopixel.md).

## Elija primero la pantalla { #choose-the-display-first }

La elección de pantalla afecta a casi todas las decisiones gráficas. Antes de optimizar el código, defina claramente los requisitos del panel:

- Resolución.
- Profundidad de color.
- Tasa de refresco.
- Tipo de interfaz.
- Requisitos del controlador táctil.
- Alimentación de la retroiluminación o del panel.
- Si se soporta el refresco parcial.
- Si el panel tiene GRAM interna.
- Si se requiere comportamiento de pantalla siempre activa de bajo consumo.

Una pantalla AMOLED pequeña con interfaz SPI o QSPI se comporta de forma muy distinta de los paneles RGB, MIPI DSI y EPD, así como de las pantallas de memoria JDI. Un mismo framework de UI puede funcionar con distintos tipos de pantalla, pero la estrategia de búfer y la política de actualización adecuadas variarán.

Para elegir la interfaz, diseñar la ruta de flush y poner en marcha el panel, consulte [Controlador de pantalla](display-controller.md).

## Empiece con un ejemplo de LVGL verificado { #start-from-a-verified-lvgl-example }

Antes de diseñar las pantallas, elija un ejemplo del SDK que ya valide el aspecto gráfico de mayor riesgo del producto. [Ejemplos de LVGL del SDK](lvgl-sdk-examples.md) agrupa los ejemplos oficiales —base, herramienta de diseño, widgets, recursos comprimidos, animación y multimedia, brújula, juegos e interfaz de reloj— según la tarea de ingeniería que resuelven. También señala qué supuestos sobre la placa, la versión, la pantalla, la memoria y el rendimiento hay que volver a validar al adaptar el ejemplo al producto.

## Elija el dispositivo SF32 adecuado { #pick-the-right-sf32-device }

Elija el chip según la carga de trabajo de pantalla y UI, no solo la frecuencia de la CPU.

<div align="center"><em>Tabla: Selección del dispositivo SF32</em></div>

<div align="center" markdown>

| Requisito | Familia de dispositivos adecuada |
|:------------|:-------------------------|
| Producto Bluetooth básico con UI pequeña | SF32LB52x |
| Reloj inteligente básico, distintivo, etiqueta o HMI sencilla | SF32LB52x |
| Wearable BLE con una interfaz que muestra abundante información de sensores | SF32LB55x |
| Pantalla RGB o interfaz LVGL más rica | SF32LB56x |
| Cargas de audio/gráficos adecuadas para delegarse en la ACPU | SF32LB57x; verifique la compatibilidad del SDK y la asignación de tareas |
| Pantalla de alta resolución o gráficos avanzados | SF32LB56x o SF32LB58x |
| Pantalla MIPI DSI | SF32LB55x o SF32LB58x, según el panel y la clase de producto |
| Interfaz de gama alta con gráficos, audio, IA y mucha memoria | SF32LB58x |

</div>

Las restricciones más importantes son la interfaz de pantalla, la resolución, la capacidad de memoria, la generación del acelerador gráfico, los pines disponibles y el presupuesto de energía.

## Cálculo de framebuffer y ancho de banda { #framebuffer-and-bandwidth-calculator }

Estime el costo de memoria y transferencia antes de elegir un panel o estilo de animación:

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Ejemplos:

<div align="center"><em>Tabla: Memoria de framebuffer y tráfico de pantalla</em></div>

<div align="center" markdown>

| Panel | Formato | Un búfer completo | Tráfico de imagen completa a 30 fps |
|:------|:-------|----------------:|--------------------------:|
| 240 x 240 | RGB565 | ~113 KiB | ~3,46 MB/s |
| 390 x 390 | RGB565 | ~297 KiB | ~9,13 MB/s |
| 454 x 454 | RGB565 | ~403 KiB | ~12,37 MB/s |
| 480 x 480 | RGB888 | ~675 KiB | ~20,74 MB/s |

</div>

El tamaño de los búferes se expresa en KiB (1.024 bytes) y el ancho de banda, en MB/s decimales (1.000.000 bytes/s). Son cifras de datos de píxeles sin procesar: no incluyen la sobrecarga de comandos, la alineación, el mantenimiento de caché, la lectura de recursos, la composición ni otros flujos de datos del sistema. Si el producto también utiliza audio Bluetooth, IA o PSRAM externa, reserve margen adicional.

## Entienda los búferes { #understand-your-buffers }

Al final, una interfaz gráfica se representa mediante píxeles en memoria. Estos son los principales tipos de búfer:

<div align="center"><em>Tabla: Tipos de búfer gráficos</em></div>

<div align="center" markdown>

| Tipo de búfer | Uso |
|:------------|:--------|
| **Búfer de dibujo** | Espacio temporal que LVGL o el controlador gráfico usa para dibujar las zonas modificadas. |
| **Framebuffer** | Memoria que almacena los píxeles de toda la pantalla y sirve como fuente para la salida de imagen. |
| **Framebuffer parcial** | Búfer de una zona más pequeña, útil cuando resulta demasiado costoso reservar la pantalla completa. |
| **Búfer de recursos** | Datos de imágenes, fuentes, iconos o recursos ya decodificados. |
| **Capa intermedia** | Superficie temporal para composición, animación o mezcla. |

</div>

Un framebuffer de pantalla completa es cómodo, pero en paneles grandes puede consumir demasiada SRAM. Un búfer RGB565 de 454 × 454 contiene 412.232 bytes (unos 412 kB o 403 KiB); dos búferes requieren el doble de capacidad. La memoria necesaria aumenta rápidamente con la profundidad de color y la resolución.

Si la memoria es limitada, use búferes parciales y actualice solo las zonas modificadas. Si la animación es importante y hay memoria suficiente, un framebuffer completo o el doble búfer pueden dar más fluidez a la interfaz.

## Elija bien la profundidad de color { #choose-color-depth-carefully }

La profundidad de color afecta a la calidad de imagen, el uso de memoria y el ancho de banda del bus.

<div align="center"><em>Tabla: Formatos y profundidad de color</em></div>

<div align="center" markdown>

| Formato | Bytes por píxel | Notas |
|:-------|----------------:|:------|
| **RGB565** | 2 | Formato habitual para interfaces embebidas; ofrece un buen equilibrio entre calidad, memoria y ancho de banda. |
| **RGB666** | 3 o empaquetado | Mayor precisión de color, con más consumo de ancho de banda. |
| **RGB888** | 3 | Más calidad de imagen, a costa de más memoria y tráfico. |
| **RGB111 / formatos monocromos** | Depende del dispositivo | Útiles en pantallas sencillas o de muy bajo consumo, como las aplicaciones EPD/JDI. |

</div>

En la mayoría de los wearables y HMI compactas, RGB565 es una buena opción inicial, salvo que el panel, la calidad de imagen deseada o los requisitos del producto exijan más.

## Transparencia, alfa y composición de capas { #transparency-alpha-and-layer-composition }

La transparencia se representa mediante un factor **alfa**, que indica cuánto contribuye el píxel en primer plano al dibujarse sobre el fondo. El alfa es independiente de los canales de color RGB. Un píxel opaco tiene un alfa de 1 (o 255 en un canal alfa de 8 bits); uno totalmente transparente tiene un alfa de 0.

En la composición source-over sobre un **fondo opaco**, con colores de primer plano **sin premultiplicar por alfa** y alfa normalizado entre 0 y 1, cada canal RGB de salida se calcula así. Esta fórmula simplificada no calcula el alfa de salida de un destino transparente:

```text
output = foreground × alpha + background × (1 − alpha)
```

Por ejemplo, un píxel de un icono con un alfa del 50 % aporta la mitad de su color y deja ver la mitad del fondo. Al repetir esta operación se compone la interfaz por capas: fondo, imágenes, texto, controles translúcidos, sombras y animaciones. El mapa de bits resultante pasa después por las etapas de framebuffer y controlador de pantalla descritas arriba.

<div align="center"><em>Tabla: Modos alfa y usos habituales</em></div>

<div align="center" markdown>

| Modo alfa | Significado | Uso habitual | Consideración de integración |
|:-----------|:--------|:------------|:--------------------------|
| **Alfa por píxel** | Cada píxel tiene su propio valor alfa. | Iconos y texto suavizados, bordes difuminados, sombras y recursos PNG. | Conserva la transparencia detallada, pero aumenta el tamaño de los datos y el trabajo de composición. |
| **Alfa global** | Un mismo valor alfa se aplica a todo un objeto o capa. | Fundir una pantalla, un diálogo o una imagen. | Es eficiente para fundidos uniformes, pero no permite suavizar los bordes dentro del objeto. |
| **Alfa binario** | Cada píxel es totalmente visible o totalmente transparente. | Máscaras y glifos sencillos. | Es menos complejo, pero sin suavizado los bordes pueden verse dentados. |

</div>

RGB565 no tiene canal alfa, por lo que suele usarse para superficies de dibujo opacas y framebuffers finales. Los recursos de origen o las capas intermedias que requieren transparencia suelen usar un formato con canal alfa, como ARGB8888, o una imagen en color acompañada de una máscara alfa independiente. El controlador debe usar formatos compatibles con el SDK, la ruta de pantalla y el acelerador elegido.

Hay dos representaciones habituales del alfa. En **alfa directo (straight alpha)**, RGB contiene el color original y el alfa se aplica durante la composición. En **alfa premultiplicado**, los valores RGB ya se han multiplicado por el alfa y la ecuación "source-over" queda así: `output = premultiplied_foreground + background × (1 − alpha)`. No mezcle ambas representaciones: interpretar datos de alfa directo como premultiplicados o viceversa produce halos claros u oscuros en los bordes.

La composición alfa lee los píxeles del primer plano y del destino y escribe el resultado, por lo que genera más tráfico de memoria que una copia o un relleno opacos. Use ePicasso si el controlador admite la operación de composición y los formatos de píxel elegidos; de lo contrario, mantenga una alternativa por CPU. Si el ancho de banda de PSRAM o el presupuesto de consumo energético son limitados, limite las capas translúcidas de pantalla completa, actualice solo las zonas que hayan cambiado y evite superficies intermedias innecesarias.

## Integración de LVGL { #integrating-lvgl }

LVGL es un framework práctico para las interfaces de dispositivos SF32: ofrece widgets, estilos, gestión de entradas, animaciones, control de las zonas que deben redibujarse e interfaces para los controladores de pantalla.

Una integración típica de LVGL necesita:

- Una función de callback flush del controlador de pantalla.
- Uno o más búferes de dibujo.
- Una fuente de tick para la temporización de LVGL.
- Controladores de entrada para pantalla táctil, botones, encoders o gestos.
- Gestión de recursos gráficos, como imágenes y fuentes.
- Ganchos opcionales de aceleración por hardware para ePicasso.

El callback flush marca el límite entre el renderizado y la salida a pantalla. El funcionamiento del controlador y del DMA se explica en [Controlador de pantalla](display-controller.md#controller-buffers-and-flush-paths).

## Decisiones para portar LVGL { #lvgl-porting-decisions }

Fije estos detalles de integración de LVGL antes de pulir las pantallas:

<div align="center"><em>Tabla: Decisiones de integración de LVGL</em></div>

<div align="center" markdown>

| Decisión | Recomendación |
|:---------|:--------------------|
| Fuente de tick | Use un tick de sistema estable que siga funcionando correctamente al suspender y reactivar el sistema. |
| Callback flush | Use una ruta de transferencia por regiones y reciba la notificación de finalización del DMA o del controlador de pantalla. |
| Número de búferes de dibujo | Elija uno o dos según los requisitos de latencia y el presupuesto de memoria. |
| Política de actualización de zonas | Fusione zonas pequeñas solo si eso reduce el costo total de transferencia. |
| Dispositivos de entrada | Integre la pantalla táctil, los botones y el encoder mediante los controladores de entrada de LVGL, no con bucles de consulta de la aplicación. |
| Aceleración por hardware | Active solo las operaciones compatibles con el SDK y el controlador, y conserve la alternativa por CPU. |
| Gestión de caché | Ejecute clean o invalidate, según corresponda, sobre la caché de los búferes compartidos en la interfaz entre el framework y el controlador. |

</div>

Una buena integración de LVGL permite que el código de las pantallas describa la interfaz, mientras el controlador se ocupa de las transferencias, la sincronización, la aceleración y la caché.

## Uso de la aceleración ePicasso { #using-epicasso-acceleration }

ePicasso resulta útil cuando la interfaz necesita realizar repetidamente muchas operaciones sobre píxeles. Entre los casos habituales están:

- Rellenos de rectángulo.
- Copia y blit de imágenes.
- Mezcla alfa.
- Escalado de imagen.
- Rotación o transformación de zonas de imagen compatibles.
- Composición de capas.
- Conversión de formato de píxel cuando sea compatible con el controlador.

Una buena integración acelera las operaciones frecuentes y de gran volumen, pero conserva alternativas por CPU para los casos no compatibles. No dé por hecho que todos los estilos y widgets de LVGL se ejecutan en el hardware. Mida las pantallas que realmente se usarán en el producto.

### Cuándo resulta más útil la aceleración { #when-acceleration-helps-most }

ePicasso generalmente ayuda más cuando:

- Se rellenan, copian, mezclan, escalan o transforman regiones grandes.
- La UI usa iconos transparentes, máscaras de texto, sombras, superposiciones o transiciones animadas.
- Sin aceleración, la CPU dedicaría gran parte del tiempo de cada fotograma a procesar píxeles en bucles.
- La ubicación de memoria y los formatos de píxel coinciden con lo que el acelerador puede manejar eficientemente.

### Cuándo puede aportar poco la aceleración { #when-acceleration-may-not-help-much }

La aceleración por hardware puede proporcionar un beneficio limitado cuando:

- La región actualizada es muy pequeña.
- El cuello de botella es el ancho de banda de transferencia al panel, no el renderizado.
- Los recursos usan formatos no compatibles o requieren conversiones costosas.
- Los búferes se colocan en memoria lenta sin suficiente ancho de banda.
- La sobrecarga de mantenimiento de caché domina la operación.

## Estrategia de distribución de memoria { #memory-placement-strategy }

El rendimiento gráfico suele estar limitado por el movimiento de datos. Distribuya los búferes según su uso:

- Si es posible, coloque en SRAM rápida los búferes de dibujo de acceso frecuente.
- Mantenga los framebuffers grandes en PSRAM solo cuando la SRAM sea insuficiente.
- Almacene imágenes y fuentes grandes en Flash o PSRAM, teniendo en cuenta la latencia de acceso.
- Evite convertir recursos repetidamente durante la ejecución.
- Mantenga los búferes accedidos por DMA alineados según la guía del SDK.
- Use recursos comprimidos o indexados si reducen el ancho de banda total y el costo de decodificación.

Cuando la CPU y el hardware gráfico o de pantalla compartan búferes, siga las reglas del SDK sobre caché y propiedad de los búferes. Antes de que el hardware lea datos escritos por la CPU, ejecute clean sobre las líneas de caché correspondientes y complete la sincronización necesaria. Antes de que el hardware escriba en un búfer, prepárelo para que ninguna línea sucia de la CPU pueda sobrescribir después el resultado. Espere a que termine la transferencia e invalide las líneas obsoletas antes de que la CPU lea el resultado. Respete la alineación de las líneas de caché y los datos vecinos; no modifique un búfer mientras lo controle el hardware. Use las rutinas admitidas por el SDK: clean e invalidate no son intercambiables.

Para el refresco parcial, el comportamiento específico de cada panel y la secuencia de puesta en marcha por etapas, consulte [Controlador de pantalla](display-controller.md).

## Preparación de recursos gráficos { #asset-preparation }

Una buena preparación de los recursos puede agilizar la interfaz antes de optimizar el código.

Siga estas pautas:

- Haga coincidir las dimensiones de la imagen con el tamaño real en pantalla.
- Evite escalar imágenes grandes en cada cuadro.
- Prerrenderice sombras complejas, gradientes o fondos cuando sea posible.
- Use alfa solo donde se necesite transparencia.
- Prefiera conjuntos de iconos compartidos y subconjuntos de fuentes.
- Elimine los glifos no usados de las fuentes.
- Guarde los recursos de uso frecuente en formatos que la ruta gráfica procese de forma eficiente.

En productos multilingües, las fuentes pueden ocupar gran parte de la memoria disponible para la interfaz. Planifique desde el principio la sustitución de fuentes, los subconjuntos de glifos y la composición del texto.

## Estrategia de animación { #animation-strategy }

La fluidez de la animación depende del tiempo disponible por fotograma, el ancho de banda del panel, el costo de renderizado y el consumo energético.

Un enfoque práctico:

- Anime solo lo que los usuarios notan.
- Mantenga pequeñas las regiones animadas.
- Prefiera transformaciones o cambios de opacidad que se adapten bien a la aceleración.
- Evite efectos costosos de desenfoque, sombra o transparencia de pantalla completa en cada cuadro.
- Reduzca la tasa de cuadros para efectos no críticos.
- Detenga las animaciones cuando la pantalla esté atenuada, cubierta o inactiva.

Una interfaz para un wearable no necesita animaciones al estilo de escritorio en todas partes. Unas pocas transiciones breves y claras suelen ofrecer una mejor experiencia que muchos efectos que consumen energía o provocan caídas de fotogramas.

## Matriz de validación gráfica { #graphics-validation-matrix }

Use pantallas de prueba reproducibles en lugar de confiar en una valoración subjetiva de si algo se ve «lo bastante fluido»:

<div align="center"><em>Tabla: Matriz de validación gráfica</em></div>

<div align="center" markdown>

| Pantalla de prueba | Qué pone a prueba |
|:------------|:-----------------|
| Relleno uniforme y barras de color | Formato de píxel, orden de bytes y ruta de flush. |
| Pantalla con mucho texto | Memoria de fuentes, caché de glifos y actualización parcial. |
| Cuadrícula de iconos con alfa | Composición, ancho de banda de recursos y ruta de ePicasso. |
| Lista con desplazamiento | Zonas por redibujar, ancho de banda de transferencia y latencia de entrada. |
| Transición a pantalla completa | Tiempo por fotograma, doble búfer y ancho de banda del panel. |
| Pantalla atenuada o inactiva | Política para detener animaciones, retroiluminación y solicitudes de gestión de energía (PM vote). |
| Coexistencia en el peor caso | Bluetooth, audio o IA activos mientras se actualiza la interfaz. |

</div>

Registre para cada pantalla el tiempo de renderizado, el tiempo de flush, la carga de CPU y el consumo energético. Si solo mide el tiempo total del fotograma, será difícil determinar si el cuello de botella está en LVGL, ePicasso, la memoria o la interfaz del panel.

## Diagnóstico del rendimiento gráfico { #debugging-graphics-performance }

Cuando la UI es lenta, identifique el cuello de botella antes de cambiar el diseño.

<div align="center"><em>Tabla: Síntomas y posibles causas</em></div>

<div align="center" markdown>

| Síntoma | Posible causa |
|:--------|:---------------------|
| Mucha carga de CPU al dibujar | Falta de aceleración por hardware, demasiadas operaciones de píxeles por software o widgets complejos. |
| El renderizado termina, pero la pantalla tarda en actualizarse | Ancho de banda de la interfaz del panel, cantidad de datos por flush o ruta de transferencia del controlador. |
| Desgarro o parpadeo | Estrategia de búferes, sincronización o temporización de las actualizaciones parciales. |
| Artefactos aleatorios | Coherencia de caché, ciclo de vida del búfer o discrepancia en el stride/formato de píxel. |
| Las pantallas sencillas van bien, pero las animaciones no | Redibujados a pantalla completa, mezclas alfa extensas, escalado de recursos o ancho de banda del panel. |
| Consumo energético elevado con la interfaz inactiva | Redibujados innecesarios, temporizadores, animaciones o política de pantalla y retroiluminación. |

</div>

Mida por separado:

- Tiempo de renderizado de LVGL.
- Tiempo de operación de ePicasso.
- Tiempo de flush de pantalla.
- Carga de CPU.
- Presión de ancho de banda de memoria.
- Consumo de energía durante los estados activo, inactivo y de suspensión.

## Errores comunes { #common-mistakes }

Evite estos desde el principio; son costosos de corregir tarde:

- Elegir una interfaz de panel antes de estimar el ancho de banda.
- Usar redibujados de pantalla completa para pequeños cambios de UI.
- Almacenar todos los recursos gráficos en memoria lenta sin medir el rendimiento.
- Usar RGB888 cuando RGB565 es suficiente.
- Escalar imágenes grandes en cada cuadro.
- Olvidar el mantenimiento de caché para búferes compartidos con hardware.
- Asumir que ePicasso acelera automáticamente cada operación de UI.
- Usar demasiados temporizadores o animaciones que mantienen la CPU despierta.
- Ignorar la latencia táctil mientras se optimiza solo la tasa de cuadros.
- Esperar hasta la puesta en marcha de la PCB para validar la inicialización del panel.

## Lista de comprobación para la puesta en marcha { #bring-up-checklist }

Para iniciar un nuevo proyecto gráfico con SF32, siga esta lista:

- [ ] Confirme la resolución, la profundidad de color, la interfaz de pantalla y el circuito integrado controlador del panel.
- [ ] Confirme que el dispositivo SF32 seleccionado soporta la interfaz de pantalla requerida.
- [ ] Estime los requisitos de memoria de framebuffer y búfer de dibujo.
- [ ] Decida si usará un framebuffer completo o parcial y uno o dos búferes.
- [ ] Verifique el reinicio del panel, las líneas de alimentación, la retroiluminación y la secuencia de inicialización.
- [ ] Implemente el tick de LVGL, el callback flush de pantalla y los controladores de entrada.
- [ ] Verifique el comportamiento básico de relleno, imagen, texto y táctil.
- [ ] Habilite la aceleración de ePicasso cuando sea compatible con el SDK y el controlador.
- [ ] Valide la limpieza e invalidación de caché de los búferes compartidos.
- [ ] Mida el tiempo de renderizado y de flush, la carga de CPU y el consumo energético.
- [ ] Pruebe las pantallas del peor caso, las animaciones, la actividad Bluetooth y las rutas de suspensión/activación.

## Ideas clave { #key-takeaways }

- Comience el diseño gráfico a partir de la interfaz de pantalla, la resolución, la profundidad de color y los requisitos de refresco.
- Use LVGL o un framework similar para gestionar widgets, zonas por redibujar, dibujo y entradas.
- Use ePicasso para acelerar operaciones de píxeles comunes, pero mantenga rutas de respaldo de CPU.
- Optimice la ubicación de memoria y la estrategia de búfer con tanto cuidado como el código de renderizado.
- Prefiera el refresco parcial para paneles limitados en ancho de banda y pantallas estáticas de dispositivos portátiles.
- Considere el rendimiento de la interfaz como un problema de sistema que abarca la CPU, ePicasso, la memoria, el controlador de pantalla, la interfaz del panel, la pantalla táctil y la gestión energética.
