---
icon: lucide/layers-3
description: "Cómo el motor gráfico ePicasso 2D/2.5D de SiFli acelera el renderizado de interfaces embebidas en SF32 y se integra con LVGL, la memoria y el controlador de pantalla."
tags:
  - Gráficos
---
# Motor gráfico ePicasso 2D/2.5D { #epicasso-2d-25d-graphics-engine }

## Introducción { #introduction }

**ePicasso** es el motor de aceleración gráfica 2D/2.5D de SiFli para la familia de microcontroladores SF32. Libera a la CPU de la aplicación de las operaciones de píxeles repetitivas que admite el hardware, para que la interfaz ofrezca animaciones fluidas, responda con rapidez y actualice la pantalla con eficiencia dentro del presupuesto energético de una MCU.

En el flujo gráfico de SF32, ePicasso actúa después de que el renderizador dispone de los recursos y antes de que el mapa de bits final llegue al controlador de pantalla. Acelera operaciones como copiar imágenes, mezclar píxeles, escalar, rotar y componer capas. eZip se encarga de descomprimir los recursos y puede enviar la imagen ya descomprimida a ePicasso; el controlador de pantalla transfiere los píxeles preparados al panel. Consulte el [resumen de gráficos](overview.md#sf32-graphics-flow) para ver el recorrido completo desde los recursos hasta el panel.

Por lo general, las aplicaciones no programan directamente cada operación de ePicasso. En su lugar, un framework gráfico como **LVGL** o una biblioteca del proveedor genera comandos para las tareas habituales de la interfaz. El controlador gráfico de SF32 envía a ePicasso las operaciones compatibles y recurre al renderizado por CPU cuando una operación no está admitida.

Consulte esta página cuando el análisis de rendimiento de la interfaz muestre que las operaciones de copia, relleno, mezcla alfa, escalado, rotación o composición limitan la capacidad de respuesta o elevan el consumo de energía. Ayuda a los ingenieros de firmware a decidir qué operaciones pueden acelerarse y en cuáles debe mantenerse una ruta de respaldo correcta mediante la CPU.

## Por qué importa la aceleración gráfica por hardware { #why-hardware-graphics-acceleration-matters }

En las interfaces embebidas, el rendimiento suele estar limitado más por el movimiento de datos en memoria que por la capacidad de cálculo de la CPU. Incluso un icono semitransparente sencillo puede requerir, por cada píxel afectado, leer los datos de origen y el framebuffer, mezclar los píxeles y escribir el resultado en el framebuffer.

ePicasso mejora esta situación acelerando las operaciones de píxeles repetitivas que aparecen en toda una interfaz de usuario:

- Copiar bloques de imagen y regiones de framebuffer.
- Rellenar rectángulos y fondos de UI.
- Aplicar mezcla alfa a iconos, máscaras de texto, sombras y superposiciones.
- Escalar mapas de bits para diseños adaptables y animaciones.
- Rotar o transformar regiones de imagen.
- Componer múltiples capas en un búfer de pantalla final.
- Convertir entre formatos de píxel habituales cuando lo admiten el dispositivo y el controlador.

El beneficio no se limita a la frecuencia de fotogramas: la aceleración por hardware puede reducir el uso de CPU, mejorar la respuesta táctil y facilitar que el sistema entre en estados de menor consumo entre actualizaciones de pantalla.

Descargar trabajo de la CPU no garantiza un menor consumo energético total. Los relojes del acelerador, el tráfico de memoria, la sincronización y la sobrecarga del controlador pueden compensar el ahorro de la CPU. Compare la energía necesaria para completar una actualización de pantalla en el hardware real, incluyendo la pantalla y el intervalo inactivo; no evalúe la eficiencia solo por el uso de CPU.

## Conceptos básicos de renderizado { #core-rendering-concepts }

### Superficies y framebuffers { #surfaces-and-framebuffers }

Una **superficie** es un área rectangular de memoria de píxeles. Puede representar un framebuffer de pantalla completa, un búfer de dibujo parcial, un recurso de imagen, un lienzo o una capa intermedia. Las operaciones de ePicasso generalmente leen píxeles de una o más superficies de origen y escriben píxeles en una superficie de destino.

Ubique cada superficie en una memoria adecuada para su patrón de acceso:

- Los búferes de dibujo actualizados con frecuencia a menudo se benefician de SRAM interna rápida cuando hay suficiente espacio disponible.
- Las imágenes grandes, las fuentes y los recursos de la interfaz pueden almacenarse en Flash o PSRAM.
- Los framebuffers de pantalla completa para pantallas de mayor resolución pueden requerir PSRAM.
- Los búferes visibles para DMA deben seguir las reglas de memoria y coherencia de caché del SDK.

### Mezcla { #blending }

La mezcla combina los píxeles de origen con los de destino. Es esencial para elementos modernos de la interfaz, como tarjetas translúcidas, sombras suaves, glifos suavizados, superposiciones y animaciones de fundido.

Los casos de mezcla comunes incluyen:

- Mezcla de alfa constante para desvanecer una capa entera.
- Mezcla de alfa por píxel para imágenes tipo PNG e iconos suavizados.
- Mezcla basada en máscaras para texto, formas o recursos monocromáticos.

Cuando ePicasso maneja la mezcla en hardware, la CPU evita ejecutar la misma aritmética para cada píxel en la región afectada.

### Escalado y rotación { #scaling-and-rotation }

El escalado y la rotación son habituales en interfaces animadas y diseños adaptables. El escalado por hardware sirve para efectos de zoom, miniaturas de vista previa, iconos de distintos tamaños y recursos destinados a diferentes densidades de pantalla. La rotación resulta útil al cambiar la orientación de la pantalla, para indicadores giratorios y elementos de esferas de reloj, y en ciertos efectos de transición.

Estas operaciones requieren ancho de banda. El beneficio depende de los formatos de origen y destino, de la ubicación en memoria y de que el controlador gráfico pueda asignar la operación a una función compatible del hardware.

### Composición de capas { #layer-composition }

Muchas pantallas se componen de varias capas visuales: fondo, recursos gráficos, texto, indicadores de estado, ventanas emergentes y elementos superpuestos de animación. La composición combina esas capas para producir la imagen final.

ePicasso está diseñado para acelerar este tipo de composición 2D. En lugar de redibujar toda la pantalla por software, un framework de interfaz puede actualizar solo las zonas que necesitan redibujarse y usar el acelerador para componer los píxeles modificados con eficiencia.

## Gráficos 2D y 2.5D { #2d-and-25d-graphics }

El término **gráficos 2D** generalmente se refiere a operaciones realizadas sobre imágenes rectangulares planas: copiar, rellenar, mezclar, escalar, rotar y componer.

El término **gráficos 2.5D** describe efectos que se dibujan en un framebuffer 2D, pero incorporan transformaciones o cierta perspectiva. En una interfaz embebida pueden incluir regiones de imagen transformadas, transiciones más elaboradas o efectos de profundidad visual, sin necesidad de una canalización completa de renderizado 3D.

En la documentación de SF32, ePicasso debe entenderse principalmente como un **acelerador de interfaz 2D/2.5D**, no como una GPU 3D programable de nivel de escritorio. Su objetivo es mejorar la fluidez y la eficiencia energética de las interfaces embebidas, especialmente en dispositivos portátiles, controles inteligentes, equipos de mano y paneles compactos.

## Comparación de implementaciones de ePicasso { #epicasso-generation-comparison }

Compare la implementación de cada familia, no solo el nombre del motor. La resolución, el número de capas, los formatos admitidos, las funciones de eZip, el ancho de banda de memoria externa y el soporte del controlador también dependen del dispositivo SF32, el encapsulado, el SDK y el diseño de la placa. El [resumen de producto SF32LB52x de SiFli](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf) denomina al motor ePicasso 2.0. La [hoja de datos del SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) especifica cuatro capas de primer plano, una capa de máscara dedicada y una capa de fondo monocroma; describe TurboPixel por separado como una función de compresión del framebuffer del controlador LCD. La [hoja de datos SF32LB58x](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf) documenta ePicasso 2.0 y un motor vectorial independiente Vivante GCNanoUltraV.

<div align="center"><em>Comparación de implementaciones de ePicasso</em></div>

<div align="center" markdown>

| Motor documentado | Familia SF32 representativa | Funciones gráficas | Características documentadas | Aplicación adecuada |
|:---|:---|:---|:---|:---|
| **ePicasso** | SF32LB55x | Aceleración de interfaz 2.5D | Rotación, escalado, reflejo horizontal y mezcla alfa por hardware; no admite reflejo vertical. Flujo de recursos eZip sin pérdida | Dispositivos vestibles con BLE y HMI compactas que necesitan una interfaz más rica que la de un diseño básico |
| **ePicasso 2.0** | SF32LB52x | Aceleración de interfaz 2D/2.5D | Descompresión de recursos eZip 2.0 en una configuración gráfica con optimización de costos | Dispositivos vestibles de gama de entrada, productos Bluetooth, papel electrónico y HMI compactas |
| **ePicasso 2.0** | SF32LB56x | Aceleración de interfaz 2D/2.5D | Cuatro capas de primer plano con mezcla alfa, una capa de máscara dedicada y una capa de fondo monocroma; rotación, escalado y reflejo horizontal por hardware (no admite reflejo vertical), conversión de formato, eZip 2.0 y compresión TurboPixel del framebuffer independiente | Pantallas de mayor resolución e interfaces LVGL más completas; verifique las operaciones admitidas por el dispositivo y el SDK |
| **ePicasso 2.0** | SF32LB58x | Aceleración de interfaz 2D/2.5D | Incluye ePicasso 2.0 y un motor independiente de gráficos vectoriales Vivante GCNanoUltraV; verifique por separado las funciones admitidas por cada motor | Productos gráficos de alta resolución; confirme qué funciones admite cada motor en el SDK objetivo |
| **ePicasso (EPIC)** | SF32LB57x | Aceleración de interfaz 2D/2.5D | Rotación, escalado, transformaciones matriciales, reflejo horizontal y vertical, mezcla alfa y composición multicapa; EZIP envía a EPIC los recursos eZip/eZip-A descomprimidos. EPIC admite JPEG como formato de entrada en SF32LB57x; el SDK también ofrece un decodificador HAL JPEGD independiente, que es una ruta distinta | Productos conectados con gráficos avanzados, cámara y funciones multimedia |

</div>

Esta tabla no es una clasificación de rendimiento. Para diseñar un producto, compruebe los formatos de píxel admitidos por el chip concreto, los límites de capas y resolución, las funciones de eZip, la memoria disponible para el framebuffer, el ancho de banda de la interfaz de pantalla y el soporte del controlador en el SDK.

La tabla de capacidades EPIC del SDK documenta el reflejo horizontal en todas las familias enumeradas, pero el reflejo vertical solo en SF32LB52x y SF32LB57x. No interprete una mención genérica al «reflejo» como compatibilidad con ambas direcciones. La misma tabla excluye las entradas EZIP, JPEG y YUV de las operaciones de rotación y transformación matricial.

La salida directa de EZIP a EPIC evita almacenar toda la imagen descomprimida en un framebuffer intermedio; aun así, se necesita memoria de trabajo para el decodificador y el búfer final de renderizado. La decodificación JPEG no es una función de EZIP. El SDK incluye JPEG entre los formatos de entrada de EPIC en SF32LB57x y, por separado, ofrece un [ejemplo HAL de JPEGD](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/hal/jpegd/README.html) que muestra cómo decodificar una imagen JPEG mediante HAL_JPEGD. La documentación presenta estas rutas por separado; confirme cuál utiliza realmente la aplicación.

Este ejemplo de decodificación de una imagen JPEG estática no demuestra que JPEGD decodifique flujos MJPEG. El SDK documenta MJPEG por separado en su [guía del middleware de vídeo FFmpeg](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/video.html), cuya nota de configuración indica que la decodificación por hardware de MJPEG solo está disponible en SF32LB58x.

Compruebe también las restricciones específicas de cada formato y las diferencias entre familias antes de elegir una ruta acelerada. Utilice la [tabla de capacidades de EPIC del repositorio original](https://github.com/OpenSiFli/SiFli-SDK/blob/main/docs/source/zh_CN/hal/epic.md) y la [interfaz JPEGD](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h).

## ePicasso en toda la familia SF32 { #epicasso-across-the-sf32-family }

Los distintos dispositivos SF32 integran configuraciones diferentes de ePicasso. Considere la hoja de datos y el manual de referencia del chip seleccionado como la referencia definitiva del conjunto final de funciones.

<div align="center"><em>Tabla: ePicasso en toda la familia SF32</em></div>

<div align="center" markdown>

| Familia de dispositivo | Acelerador gráfico | Posicionamiento típico |
|:--------------|:---------------------|:--------------------|
| **SF32LB52x** | Acelerador ePicasso 2.0 2D/2.5D | Dispositivos vestibles, productos Bluetooth y HMI compactas con diseño optimizado en costos. |
| **SF32LB55x** | Acelerador ePicasso 2.5D | Dispositivos vestibles con BLE y dispositivos con numerosos sensores que también necesitan pantalla. |
| **SF32LB56x** | Acelerador ePicasso 2.0 2D/2.5D | Productos de pantalla de mayor resolución e interfaces más ricas de estilo LVGL. |
| **SF32LB57x** | Acelerador ePicasso (EPIC) 2D/2.5D | Productos conectados con gráficos avanzados, compatibles con cámara y orientados a multimedia. |
| **SF32LB58x** | ePicasso 2.0 y el motor vectorial independiente Vivante GCNanoUltraV | Gráficos de gama alta, interfaz de usuario de alta resolución y aplicaciones visuales avanzadas. |

</div>

Esta progresión permite a los desarrolladores conservar un modelo de software gráfico similar en toda la línea SF32 y, a la vez, elegir el dispositivo que se ajuste a la resolución de pantalla, la memoria, la complejidad gráfica, el número de GPIO y el presupuesto energético requeridos.

## Integración con LVGL y frameworks de interfaz { #integration-with-lvgl-and-ui-frameworks }

**LVGL** es una opción habitual para interfaces gráficas embebidas en SF32. La aplicación compone las pantallas con widgets, estilos, imágenes, fuentes y animaciones. LVGL identifica las zonas que deben redibujarse; su renderizador por software o backend de renderizado por hardware genera los píxeles. La ruta de flush del controlador de pantalla transfiere esos píxeles al panel y notifica la finalización. Distinga la finalización del renderizado de la finalización de la transferencia a pantalla.

ePicasso puede mejorar el rendimiento de LVGL cuando la adaptación de LVGL para SF32 deriva al hardware las operaciones de dibujo admitidas. Las operaciones que más suelen beneficiarse son:

- Transferencias de bloques de imagen (blits).
- Rellenos de color.
- Mezcla alfa.
- Escalado de imagen.
- Rotación o transformación de regiones de imagen soportadas.
- Composición en un búfer de dibujo o framebuffer.

Una integración robusta de LVGL conserva rutas alternativas por CPU. No todas las funciones, formatos de píxel, efectos de estilo o disposiciones de imagen de LVGL se pueden asignar directamente a una operación de hardware. Acelere las operaciones habituales que procesan grandes volúmenes y deje los casos poco frecuentes o complejos al software.

## Consideraciones de memoria y ancho de banda { #memory-and-bandwidth-considerations }

La aceleración gráfica no elimina la necesidad de un diseño de memoria cuidadoso. En muchos sistemas de pantalla embebidos, el bus de memoria es el recurso limitante: ePicasso, la CPU, el controlador de pantalla, los motores DMA, la Flash, la PSRAM, el audio y los subsistemas inalámbricos compiten por el acceso.

El buen rendimiento gráfico depende de varias decisiones de diseño:

- Use resoluciones de pantalla y profundidades de color que coincidan con el requisito del producto.
- Mantenga los recursos de interfaz más utilizados en memorias con una latencia de acceso adecuada.
- Use renderizado parcial o actualizaciones de región modificada (dirty-region) cuando el refresco de pantalla completa sea innecesario.
- Evite conversiones de formato innecesarias en la ruta crítica.
- Alinee los búferes de dibujo y los framebuffers según las recomendaciones del SDK.
- Mantenga claras las reglas de DMA y coherencia de caché cuando los búferes se comparten entre la CPU, ePicasso y el controlador de pantalla.

Para los búferes cacheables compartidos por la CPU y ePicasso, siga las reglas del SDK sobre mantenimiento de caché y propiedad. Ejecute clean sobre los datos de origen escritos por la CPU antes de que los lea el hardware. Antes de que el hardware escriba en un búfer de destino, siga las reglas de caché del SDK para que las líneas sucias de la caché de la CPU no sobrescriban después el resultado; tras finalizar el hardware, invalide las líneas obsoletas antes de leerlo con la CPU. Respete la alineación y los datos vecinos; no modifique búferes bajo control del hardware. Consulte el flujo de búferes compartidos en el [resumen de gráficos](overview.md#memory-placement-strategy).

La división de funciones descrita en el [resumen de gráficos](overview.md#sf32-graphics-flow) es clave para diagnosticar el rendimiento de la interfaz. Una actualización lenta puede deberse al tiempo de renderizado, al ancho de banda de memoria, a la velocidad de transferencia al panel, a la configuración de la interfaz de pantalla o a la sincronización. ePicasso aporta más cuando el renderizado es el cuello de botella; si lo limita la transferencia al panel, pueden ser más eficaces el refresco parcial, una menor profundidad de color, otra estrategia de búfer o una interfaz más rápida.

## Casos de uso típicos { #typical-use-cases }

ePicasso es más útil en productos donde la interfaz contiene muchos elementos visuales pero el sistema aún necesita mantenerse dentro de un presupuesto de energía a nivel de microcontrolador.

Los casos de uso típicos incluyen:

- Esferas y pantallas de aplicaciones para relojes inteligentes.
- Rastreadores de actividad física y dispositivos portátiles con pantalla para el seguimiento de la salud.
- Interfaces de usuario de audio Bluetooth.
- Paneles de bicicletas eléctricas (e-bikes), patinetes eléctricos (e-scooters) y vehículos compactos.
- Controles de hogar inteligente y paneles táctiles pequeños.
- Instrumentos médicos o industriales portátiles.
- Impresoras de etiquetas, insignias inteligentes y etiquetas electrónicas para estanterías.
- HMI basadas en LVGL con iconos, transparencia y animaciones.

## Guía práctica de diseño { #practical-design-guidance }

Defina primero los requisitos de pantalla y experiencia de usuario; a partir de ellos, determine la arquitectura gráfica necesaria.

Las preguntas importantes incluyen:

- ¿Cuál es la resolución de pantalla y la profundidad de color?
- ¿El panel se actualiza mediante SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD o JDI?
- ¿El producto necesita animación de pantalla completa o principalmente actualizaciones parciales?
- ¿Los recursos de interfaz se almacenan en SRAM interna, Flash o PSRAM?
- ¿Cuánta memoria hay disponible para búferes de dibujo o framebuffers?
- ¿Qué operaciones puede acelerar el controlador gráfico mediante ePicasso?
- ¿Son coherentes en caché los búferes de la CPU, ePicasso y el controlador de pantalla?

En muchos productos, los mejores resultados se obtienen combinando varias técnicas: dibujo acelerado por hardware, refresco parcial, recursos comprimidos u optimizados, ubicación cuidadosa de los búferes y un diseño de interfaz que evite redibujar toda la pantalla sin necesidad.

## Conclusiones clave { #key-takeaways }

- ePicasso es el acelerador gráfico 2D/2.5D de SiFli para microcontroladores SF32.
- Libera a la CPU de operaciones habituales con píxeles, como rellenar, copiar, mezclar, escalar, rotar y componer capas.
- Trabaja junto al controlador de pantalla; ePicasso prepara los datos de píxeles, mientras que el controlador de pantalla los envía al panel.
- Es especialmente útil en productos con interfaces gráficas complejas, donde el movimiento de datos en memoria, la mezcla y el procesamiento repetido de píxeles consumirían mucho tiempo de CPU.
- LVGL y otros frameworks de interfaz pueden beneficiarse de ePicasso cuando el controlador gráfico de SF32 asigna al hardware las operaciones de dibujo que admite.
- El rendimiento real depende de la resolución, la ubicación de los datos en memoria, los formatos de píxel, la estrategia de búfer, la gestión de caché y el ancho de banda de la interfaz del panel.
