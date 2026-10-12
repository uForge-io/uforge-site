---
icon: lucide/file-archive
description: "Cómo eZip y eZip-A de SiFli reducen el espacio de los recursos de UI, el tráfico de memoria y el trabajo de decodificación de CPU en dispositivos SF32 compatibles."
tags:
  - Gráficos
---

# Compresión sin pérdida y decodificación por hardware con eZip { #ezip-lossless-compression-and-hardware-decoding }

## Introducción { #introduction }

**eZip** es el formato propietario sin pérdida de SiFli para recursos gráficos. En los dispositivos SF32 que admiten estas funciones, el bloque de hardware EZIP decodifica recursos gráficos eZip; también ofrece modos GZIP y LZ4 independientes para datos generales, cuya salida descomprimida se escribe en memoria mediante AHB, no directamente en EPIC. En lugar de guardar cada recurso como un mapa de bits sin comprimir en NOR Flash, PSRAM o un sistema de archivos, el producto puede almacenar el resultado comprimido en eZip y decodificarlo cuando la interfaz lo necesite.

**eZip-A** es el formato correspondiente para recursos animados. Los archivos de origen se convierten durante la compilación o la preparación de recursos; eZip no es un decodificador de imágenes genérico que acepte archivos arbitrarios en tiempo de ejecución.

Para datos que no sean gráficos, como una imagen OTA, el producto debe definir y validar todo el proceso de actualización: almacenamiento, comprobación de integridad, compatibilidad y ruta de descompresión prevista. El [flujo gráfico](overview.md#sf32-graphics-flow) se aplica a los recursos de pantalla, no a ese proceso de actualización propio de la aplicación.

En un producto con interfaz gráfica, el objetivo es leer menos datos del almacenamiento y evitar que la CPU de la aplicación descomprima los mismos recursos una y otra vez. Esto puede reducir el espacio de almacenamiento y el tráfico hacia la memoria externa, además de liberar capacidad para la UI, Bluetooth, audio y otras tareas de la aplicación.

Para entender cómo se relaciona eZip con ePicasso, TurboPixel y el controlador de pantalla, consulte el [Resumen de gráficos](overview.md#sf32-graphics-flow). Esta página se centra en la preparación de recursos eZip, la compresión y la decodificación.

Consulte esta página si los recursos de UI ocupan demasiado espacio en Flash, consumen demasiado ancho de banda de memoria externa o cuando necesita un proceso de conversión reproducible. Aquí se distingue la compresión sin pérdida de los recursos de origen de la compresión del framebuffer final, que se explica en [TurboPixel](turbopixel.md).

## Capacidades y límites { #capabilities-and-boundaries }

eZip está pensado para integrarse en un proceso de producción de recursos, no para manipular archivos de forma puntual:

- **Compresión gráfica sin pérdida.** El formato conserva los datos de imagen y admite transparencia. SiFli describe cualitativamente la relación de compresión gráfica típica de eZip como *ligeramente mayor que la de PNG*; no publica una relación numérica fija.
- **Recursos estáticos y animados.** GraphicsTool puede convertir imágenes PNG, GIF y APNG en recursos estáticos eZip o animaciones eZip-A.
- **Decodificación asistida por hardware en dispositivos compatibles.** Puede reducir el trabajo de decodificación de la CPU de la aplicación, según el chip, el SDK, el formato de origen y la ruta del controlador.
- **Flujo de trabajo con herramientas gráficas.** GraphicsTool de SiFli procesa formatos de origen habituales, cambia el tamaño de las imágenes, las convierte por lotes y genera recursos eZip/eZip-A.
- **Integración con ePicasso en dispositivos compatibles.** La salida directa puede evitar un búfer para la imagen fuente completamente decodificada, reduciendo la capacidad de memoria necesaria y el tráfico.

«Sin pérdida» describe la compresión de los píxeles entregados al codificador, no todas las conversiones previas. Redimensionar, convertir RGB888 a RGB565 o eliminar el canal alfa puede perder información antes de comprimir. Compare los píxeles decodificados con la entrada del codificador del mismo tamaño y formato; conserve el canal alfa cuando sea necesario.

## Relación de compresión y uso general { #compression-ratio-and-general-purpose-use }

Para recursos gráficos, use PNG como referencia práctica: SiFli indica que la relación de compresión de eZip es ligeramente mayor que la de PNG, sin perder datos de imagen ni transparencia. La reducción real del archivo depende de las dimensiones, el formato de píxel, la transparencia, el uso de paleta y el nivel de detalle. Mida recursos representativos con el perfil de conversión aprobado; no dimensione el almacenamiento a partir de un único porcentaje.

La utilidad EZIP de SiFli también puede comprimir archivos de propósito general mediante GZIP o LZ4. Este proceso es distinto de convertir recursos gráficos al formato eZip. La compresión de datos generales depende del contenido de origen: los datos repetitivos o estructurados pueden comprimirse bien, mientras que los archivos ya comprimidos —como imágenes JPEG, vídeo MP4, archivos ZIP o datos cifrados— quizá apenas se reduzcan. Antes de usar esta ruta con datos no gráficos, valide el tamaño resultante y el modo de descompresión compatible con el dispositivo objetivo.

El HAL de EZIP distingue los modos de trabajo eZip gráfico, GZIP y LZ4. La descompresión general GZIP/LZ4 utiliza la salida a memoria por AHB, no la salida directa a EPIC. Un archivo OTA debe ajustarse al formato de trama admitido por el modo elegido y a sus restricciones de tamaño; un archivo gráfico `.ezip` no es intercambiable con cualquier paquete comprimido de actualización.

## Plantilla de medición del tamaño de imágenes representativas { #representative-image-size-comparison-placeholder }

Use esta sección para registrar mediciones comparables de imágenes de UI representativas **opacas** y **con canal alfa**. Sustituya los valores provisionales después de convertir cada imagen de origen con versiones y ajustes aprobados de las herramientas. Junto con los resultados, registre las dimensiones de origen, el formato de color, el tratamiento del canal alfa y la calidad JPEG. eZip y PNG conservan la transparencia de origen; JPEG no admite canal alfa. Por tanto, para comparar una imagen transparente en JPEG, use un fondo compuesto previamente y documente ese fondo. No presente el resultado como equivalente a conservar la transparencia.

<div align="center"><em>Plantilla de medición del tamaño de archivo de imágenes representativas</em></div>

<div align="center" markdown>

| Escenario | Formato | Codificación | Tamaño de archivo | Respecto a BMP | Configuración de prueba / notas |
|:---|:---|:---|---:|---:|:---|
| Imagen de UI opaca | BMP | Referencia sin comprimir | Por determinar | 100% | Imagen de origen: por determinar; dimensiones: por determinar; formato de píxel: por determinar |
| Imagen de UI opaca | eZip | Sin pérdida | Por determinar | Por determinar | Versión de GraphicsTool y perfil de conversión: por determinar |
| Imagen de UI opaca | PNG | Sin pérdida | Por determinar | Por determinar | Codificador y ajustes: por determinar |
| Imagen de UI opaca | JPEG | Con pérdida | Por determinar | Por determinar | Codificador y ajuste de calidad: por determinar |
| Imagen de UI con canal alfa por píxel | BMP | Referencia sin comprimir | Por determinar | 100% | Indique la variante BMP exacta o el tratamiento del canal alfa: por determinar |
| Imagen de UI con canal alfa por píxel | eZip | Sin pérdida con canal alfa | Por determinar | Por determinar | Versión de GraphicsTool y perfil de conversión; verifique los bordes transparentes: por determinar |
| Imagen de UI con canal alfa por píxel | PNG | Sin pérdida con canal alfa | Por determinar | Por determinar | Codificador y configuración: por determinar |
| Imagen de UI con canal alfa por píxel | JPEG | Con pérdida, sin canal alfa | Por determinar | Por determinar | Registre el fondo compuesto previamente y el ajuste de calidad; no es una comparación que conserve el canal alfa |

</div>

Calcule **Respecto a BMP** como `file size ÷ BMP file size × 100%` dentro de cada escenario. No compare directamente las filas opacas con las que tienen canal alfa ni use esta tabla como una afirmación general sobre la compresión. Es una plantilla de medición; los resultados dependen de las imágenes elegidas, la cobertura del canal alfa y los ajustes de conversión.

## Ventajas de eZip { #why-use-ezip }

### Reducir el espacio de almacenamiento { #reduce-asset-storage }

Los recursos comprimidos pueden ocupar menos espacio que los búferes de píxeles sin comprimir en NOR Flash, PSRAM, NAND o almacenamiento extraíble. Esto resulta especialmente útil para esferas de reloj, paquetes de fuentes multilingües, conjuntos de iconos, temas de UI e interfaces con muchas animaciones.

### Reducir el tráfico del bus de memoria { #reduce-memory-bus-traffic }

Cuando los recursos están en NOR Flash externa o PSRAM, los mapas de bits sin comprimir pueden consumir mucho ancho de banda del bus antes incluso de empezar a dibujar. Transferir el recurso comprimido y decodificarlo cerca de la ruta gráfica puede reducir ese tráfico. La mejora real depende de la relación de compresión, el formato de origen, el patrón de actualización de pantalla y la velocidad de la interfaz de almacenamiento.

### Liberar tiempo de CPU { #preserve-cpu-time }

Cuando se utiliza una ruta de decodificación por hardware compatible, la CPU de la aplicación no tiene que descomprimir cada recurso por software. La capacidad liberada puede mejorar la respuesta de la UI o destinarse a las tareas inalámbricas, de audio, de sensores y de gestión de bajo consumo.

### Hacer reproducible la entrega de recursos { #make-asset-delivery-repeatable }

El uso de una herramienta de conversión y de un formato de recursos controlado permite reproducir de forma consistente las entregas del producto: las imágenes de origen, los ajustes de conversión, los recursos generados y los perfiles de resolución objetivo pueden mantenerse juntos bajo control de versiones. Es más fiable que convertir archivos manualmente o depender de que cada desarrollador de UI vuelva a aplicar los mismos ajustes de imagen.

## Comparación de implementaciones de eZip { #ezip-version-comparison }

La tabla utiliza nombres respaldados por los resúmenes de producto y el SDK. Un número de versión no garantiza un conjunto universal de funciones: compruebe el chip, la versión del SDK, el formato de los recursos y la configuración de memoria de la placa.

<div align="center"><em>Implementaciones de eZip y soporte independiente de JPEG</em></div>

<div align="center" markdown>

| Implementación | Familias SF32 representativas | Funciones documentadas | Implicación práctica |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | Descompresión gráfica sin pérdidas y conexión directa con ePicasso; el SDK excluye esta familia del soporte nativo de eZip-A. | Utilice recursos eZip estáticos; no presuponga soporte nativo de animaciones eZip-A. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Descompresión gráfica sin pérdidas y soporte nativo de animaciones eZip-A. SF32LB58x también dispone de un códec JPEG independiente. | Valide los requisitos de animación y memoria; trate JPEG/MJPEG como una ruta de procesamiento multimedia independiente. |
| **EZIP** | SF32LB57x | Decodificación eZip/eZip-A y salida directa a EPIC. JPEGD es un decodificador JPEG independiente; no presuponga que comparte la ruta de salida directa de EZIP. | Genere recursos con una ventana de compresión de 2048 bytes. Estos datos no establecen una ruta completa de reproducción MJPEG; compruebe la compatibilidad del middleware y del decodificador para el dispositivo concreto. |

</div>

La salida directa a EPIC evita almacenar una imagen fuente completamente decodificada antes de dibujarla. No elimina la memoria de trabajo del decodificador ni el búfer final de renderizado, y no convierte la decodificación JPEG en una función de EZIP. Para la ruta independiente JPEGD, siga el flujo de controladores documentado para la familia de destino.

## Preparación de recursos { #preparing-assets }

Mantenga los recursos de origen editables bajo control de versiones y genere la salida eZip como artefacto de compilación:

1. Defina la resolución de pantalla, el formato de píxel y los requisitos de animación para el dispositivo seleccionado.
2. Prepare las imágenes o animaciones con las dimensiones previstas; no recurra al escalado en tiempo de ejecución para compensar recursos mal dimensionados.
3. Use SiFli GraphicsTool para convertir las imágenes, cambiar su tamaño y generar la salida eZip o eZip-A.
4. Registre junto con el proyecto la versión de la herramienta y el perfil de conversión; después, valide los recursos generados en el hardware objetivo.
5. Guarde la salida en la ubicación prevista y pruebe el arranque en frío, el uso repetido de la UI, el comportamiento con poca memoria y las actualizaciones de pantalla mientras también haya actividad Bluetooth o de audio.

GraphicsTool admite formatos de imagen habituales como PNG, JPEG, WebP y AVIF, y puede convertir GIF, PNG y APNG en recursos eZip/eZip-A. Un recurso convertido solo se puede usar si el dispositivo objetivo y el SDK admiten la ruta de decodificación configurada.

Para otros formatos de imágenes estáticas, el flujo documentado consiste en redimensionar y convertir primero a PNG, y después codificar eZip. Ajuste el formato de color, el tratamiento del canal alfa y la versión de LVGL al destino. El ejemplo de línea de comandos del SDK exige `-winsize 2048` para SF32LB57x; las otras familias de la tabla no necesitan esa opción. Use `sdk/tools/png2ezip/ezip.exe` y registre los argumentos exactos junto con los recursos generados.

## Herramientas de integración { #integration-tools }

Además del flujo de trabajo de escritorio con GraphicsTool, SiFli ofrece lo siguiente:

- **Herramientas de línea de comandos.** Permiten integrar la conversión eZip en procesos de recursos automatizados y reproducibles. Úselas en scripts de compilación locales o tareas de integración continua para mantener la trazabilidad entre las imágenes de origen versionadas y los archivos eZip generados.
- **SDK para Android e iOS.** Permiten integrar eZip en aplicaciones móviles. Resultan útiles si una aplicación complementaria debe preparar, gestionar, transferir o procesar recursos eZip como parte del flujo de trabajo con el dispositivo.

Mantenga bajo control de versiones los perfiles de conversión, las versiones de las herramientas o del SDK, las sumas de comprobación de los archivos generados y los requisitos de compatibilidad del dispositivo objetivo. Las integraciones móviles y de línea de comandos deben usar el mismo perfil de recursos aprobado que el producto embebido. No dé por hecho que un archivo generado para un chip o una configuración del SDK funcionará sin cambios en todos los dispositivos SF32.

## Guía de diseño y depuración { #design-and-debugging-guidance }

- **Use eZip para recursos.** Pueden almacenarse en NOR Flash, PSRAM, NAND o un sistema de archivos, pero el decodificador no interpreta rutas de archivo. El controlador de almacenamiento debe proporcionar o cargar los datos mediante una ruta accesible al hardware y compatible. El HAL exige una alineación de 4 bytes para los búferes de entrada y salida AHB. eZip no comprime el framebuffer final.
- **Presupueste el ancho de banda de transferencia.** eZip puede reducir el tráfico de los recursos, pero los píxeles decodificados aún deben recorrer la ruta de renderizado y visualización descrita en el [Resumen de gráficos](overview.md#sf32-graphics-flow).
- **Mantenga una ruta de respaldo por CPU.** No todos los tipos de recursos, formatos de píxel u operaciones de UI pueden utilizar la decodificación por hardware o la ruta gráfica.
- **Valide la ubicación en memoria.** Pruebe los recursos y los búferes de dibujo en SRAM interna, NOR Flash, PSRAM o almacenamiento extraíble; cada opción afecta a la latencia y a la contención del bus.
- **Pruebe la carga de trabajo real.** Mida el tiempo de carga en frío, la frecuencia de las animaciones, la latencia de la UI y el consumo mientras funcionan a la vez Bluetooth, el audio, los sensores y la pantalla.
- **Fije los ajustes de conversión antes de liberar la versión.** Los cambios de versión de la herramienta o de sus parámetros pueden afectar a la compatibilidad, la calidad, el espacio de almacenamiento y el rendimiento de decodificación.

## Conclusiones clave { #key-takeaways }

- eZip es el formato de SiFli para comprimir recursos de pantalla sin pérdida y ofrece una ruta de decodificación asistida por hardware en los dispositivos SF32 compatibles.
- Use eZip para recursos gráficos y los modos GZIP/LZ4 de la utilidad para datos generales; la compresión de estos depende del contenido de origen y debe medirse.
- eZip-A es el formato para recursos animados; GraphicsTool genera recursos eZip/eZip-A a partir de imágenes y animaciones de origen habituales.
- SiFli también ofrece herramientas de línea de comandos y SDK para Android/iOS que permiten integrar eZip en procesos automatizados y aplicaciones móviles complementarias.
- eZip puede reducir el espacio de los recursos, el tráfico hacia la memoria externa y la carga de decodificación de la CPU de la aplicación, pero no sustituye a ePicasso ni al controlador de pantalla.
- Elija la implementación y la ruta de salida documentadas, no una supuesta jerarquía de versiones. Distinga JPEGD de EZIP y use la ventana de compresión requerida para SF32LB57x.
- Un diseño eZip fiable requiere controlar todo el proceso de recursos: imágenes de origen, ajustes de conversión, ubicación de almacenamiento, integración gráfica y pruebas en el hardware objetivo.

## Referencias primarias { #primary-references }

- [GraphicsTool y preparación de recursos](https://wiki.sifli.com/tools/图形转换工具.html)
- [Modos, rutas de salida, alineación y animaciones en el HAL de EZIP](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [Documentación de la utilidad EZIP](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [Modos, alineación y animaciones en el HAL de EZIP](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [Ejemplo LVGL eZip y parámetros de conversión](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [Documentación del SDK móvil eZip](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- Resúmenes de producto: [SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [Interfaz independiente de JPEGD](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
