---
icon: lucide/minimize-2
description: "Cómo TurboPixel usa compresión de framebuffer con pérdidas y un factor fijo para reducir el almacenamiento del framebuffer y el tráfico de lectura de pantalla en dispositivos SF32 compatibles."
tags:
  - Gráficos
---

# Compresión de framebuffer TurboPixel { #turbopixel-framebuffer-compression }

## Descripción general { #overview }

**TurboPixel** es un formato de compresión con pérdidas y relación fija para el mapa de bits final, una vez renderizado, en los dispositivos SF32 compatibles. Forma parte de la ruta de visualización: **extDMA** comprime el mapa de bits y el controlador de pantalla descomprime TurboPixel mientras transfiere los píxeles al panel.

TurboPixel no es un formato para almacenar recursos ni sustituye a [eZip](ezip.md). eZip comprime sin pérdidas los recursos de origen antes de leerlos del almacenamiento; TurboPixel comprime el mapa de bits final para reducir la capacidad de PSRAM necesaria y el ancho de banda consumido por el tráfico del framebuffer.

Para conocer el flujo gráfico completo y la relación de TurboPixel con eZip, ePicasso y el controlador de pantalla, consulte el [Resumen de gráficos](overview.md#sf32-graphics-flow). Esta página se centra en el funcionamiento de la compresión, las decisiones de integración y la disponibilidad de TurboPixel.

Consulte esta página si, en un diseño basado en SF32LB55x, SF32LB56x o SF32LB58x, el tamaño del framebuffer o el tráfico de lectura de la pantalla se convierte en un cuello de botella. Ayuda a los equipos de producto y firmware a valorar el ahorro predecible de PSRAM frente a la pérdida de calidad de imagen; no sustituye a la compresión de recursos con eZip.

## Factor de compresión fijo y compresión con pérdidas { #fixed-ratio-and-lossy-by-design }

TurboPixel tiene dos propiedades definitorias:

- **Factor de compresión fijo para cada configuración.** El formato de píxel de entrada y el nivel de compresión determinan el factor nominal; no cambia con el detalle de la imagen. La asignación también depende de la alineación de las filas y la división en bloques. Use las reglas de tamaño del chip y SDK elegidos, no un factor copiado de otra configuración.
- **Compresión con pérdidas.** No se garantiza que un mapa de bits descomprimido por TurboPixel reproduzca cada valor de píxel original. El formato sacrifica algo de fidelidad de imagen a cambio de reducciones predecibles en el uso de PSRAM y el tráfico de PSRAM.

La compresión con pérdidas suele ser una opción razonable en un sistema de pantalla embebido con recursos limitados, pero debe decidirse según el producto. Evalúe pantallas reales con la resolución y profundidad de color del panel objetivo, a la distancia de visualización prevista y con el patrón de refresco esperado; no juzgue la calidad solo a partir de una imagen de prueba genérica.

## Plantilla de medición del framebuffer { #framebuffer-compression-comparison-placeholder }

Use esta sección para registrar los resultados medidos de TurboPixel para una resolución de pantalla representativa y una configuración de SDK. A diferencia de la comparación de tamaño de archivo de eZip, esta es una comparación de **asignación de framebuffer y tráfico de PSRAM**: TurboPixel opera después del renderizado, no sobre el archivo del recurso de origen.

Incluya pantallas opacas y otras con mezcla alfa. Esta mezcla suele ocurrir antes de TurboPixel, cuando el renderizador combina los píxeles de primer plano y de fondo en el framebuffer final. Una pantalla con iconos translúcidos, texto, sombras o capas aún puede generar un framebuffer RGB565 opaco; registre esta diferencia y no confunda el alfa de los recursos de origen con un canal alfa en el framebuffer comprimido.

<div align="center"><em>Plantilla de medición de framebuffer TurboPixel</em></div>

<div align="center" markdown>

| Escenario | Alfa de origen/capa | Formato y estado alfa del framebuffer final | Asignación/tráfico sin comprimir | Asignación/tráfico con TurboPixel | Respecto al framebuffer sin comprimir | Configuración de prueba/resultado visual |
|:---|:---|:---|---:|---:|---:|:---|
| UI opaca | Ninguna | Por determinar; framebuffer opaco | Por determinar | Por determinar | Por determinar | Resolución: por determinar; política de refresco: por determinar; factor/configuración de TurboPixel: por determinar |
| UI con mezcla alfa, compuesta antes de la salida | Alfa por píxel y/o global en las capas de origen | Por determinar, normalmente opaco después de la composición | Por determinar | Por determinar | Por determinar | Registrar el contenido mezclado: por determinar; verificar artefactos en bordes, sombras, degradados y texto |
| Ruta de salida que preserva alfa, si está admitida | Alfa retenido hasta el búfer final | Por determinar | Por determinar | Por determinar | Por determinar | Confirmar el chip, SDK, formato y ruta de pantalla exactos antes de probar |

</div>

Para cada ruta válida de TurboPixel, calcule el porcentaje **Respecto al framebuffer sin comprimir** con la fórmula `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`. La asignación prevista sigue el factor fijo aplicable, pero el factor exacto, los formatos compatibles, la alineación, la política de refresco y el tráfico de PSRAM medido deben confirmarse en la documentación del chip, el SDK y las pruebas con el hardware objetivo. Registre por separado la aceptación visual: un factor fijo de asignación no garantiza los mismos artefactos en contenido opaco, con mucho texto, con degradados o con mezcla alfa.

## Por qué usar TurboPixel { #why-use-turbopixel }

### Reducir el almacenamiento del framebuffer { #reduce-psram-capacity }

Un framebuffer completo puede ocupar mucha PSRAM con resoluciones altas o varios búferes de dibujo. TurboPixel reduce la asignación para el mapa de bits final comprimido, lo que puede dejar más memoria para recursos de UI, audio, datos de la aplicación u otras superficies.

Calcule el máximo de memoria ocupada simultáneamente, no solo ese mapa de bits. Pueden coexistir un búfer de renderizado sin comprimir, otro de visualización comprimido, memoria de trabajo de compresión y copias para doble búfer. Sus tamaños y tiempos de vida determinan si el diseño completo necesita menos PSRAM.

### Reducir las lecturas de pantalla { #reduce-psram-bandwidth }

El controlador de pantalla lee menos bytes de un framebuffer comprimido antes de descomprimirlo. Esto reduce las lecturas para visualización y la contención con la CPU, ePicasso, DMA, audio y actividad inalámbrica.

Ese no es el ahorro total de tráfico de memoria. El renderizado sigue escribiendo píxeles, y la compresión lee su entrada y escribe su salida. Mida esas transferencias y su solapamiento con las lecturas de pantalla. En pantallas que se redibujan con frecuencia, la sobrecarga puede compensar el ahorro; el equilibrio cambia si se muestra repetidamente el mismo fotograma. Mida también la energía del sistema.

### Hacer predecible el presupuesto { #make-budgeting-predictable }

Con el mismo formato de píxel y nivel de compresión, los cambios de contenido no alteran el factor nominal. Use el cálculo de filas comprimidas y las reglas de alineación del SDK para asignar búferes; incluya todas las lecturas y escrituras de renderizado, compresión y pantalla en el presupuesto de ancho de banda. Cuente aparte los bytes enviados al panel: TurboPixel se descomprime antes de esa salida y no reduce automáticamente su volumen.

## Compromisos de calidad e integración { #quality-and-integration-trade-offs }

TurboPixel debe validarse como parte del diseño de pantalla completo:

- Pruebe texto, líneas finas, degradados, iconos, fotografías, animaciones y elementos de interfaz de alto contraste para detectar artefactos visibles.
- Confirme que el dispositivo y el SDK elegidos admitan el formato de color, la alineación del búfer, la ruta extDMA y la configuración del controlador de pantalla.
- Mida el tiempo de fotograma, el ancho de banda de PSRAM, la latencia de la interfaz y el consumo bajo cargas combinadas de pantalla, Bluetooth, audio e IA.
- Mantenga disponible una ruta sin comprimir durante la puesta en marcha para aislar problemas de calidad de imagen y del controlador.
- No presente TurboPixel como una compresión sin pérdidas, aunque no se aprecien artefactos en una interfaz concreta.

## Comprobaciones de integración con el SDK { #sdk-integration-checks }

La guía extDMA citada enumera diez niveles nominales, mientras que la implementación de cálculo de tamaño del SDK citado admite los niveles 1, 2 y 3. No presuponga que su compilación acepta todos los niveles documentados. Valide el nivel elegido y el cálculo correspondiente de tamaño por fila; un valor no admitido puede activar otro ajuste en una función auxiliar.

La guía extDMA incluye entradas RGB565, RGB888 y ARGB8888. Admitir una entrada no garantiza una ruta de pantalla comprimida que conserve el canal alfa. La rama LCDC sin el registro dedicado de descompresión de la capa 0 acepta RGB565/RGB888 para capas comprimidas; compruebe qué rama usa el chip. En el controlador LCDC citado, `HAL_LCDC_LayerSetCmpr` activa la compresión en la capa 0.

El encabezado LCDC actual de OpenSiFli define la macro de soporte para capas comprimidas solo cuando está habilitado `HAL_EXTDMA_MODULE_ENABLED`; la condición de familia excluye SF32LB52x y SF32LB57x. El encabezado establece anchos máximos de 512 píxeles para SF32LB55x/SF32LB56x y 1024 píxeles para SF32LB58x. Son límites de integración de la capa comprimida, no límites universales de resolución del panel. Un comentario del código también indica que la ruta LCPU aún no está habilitada.

SF32LB55x requiere una salvedad de integración. El encabezado LCDC actual de OpenSiFli define la macro de capas comprimidas cuando está habilitado `HAL_EXTDMA_MODULE_ENABLED`, pero su comentario indica que la ruta LCPU aún no está habilitada. La tabla publicada de funciones LCDC del SDK marca como no compatible la descompresión de capas comprimidas en 55x, mientras que la hoja de datos del SF32LB55x describe TurboPixel y la descompresión por el controlador LCD. La presencia de una macro de compilación no demuestra que se haya validado la ruta de visualización completa. Trate el soporte de 55x como condicional y compruebe la revisión del SDK, el núcleo, la configuración de compilación y el hardware objetivo; no deduzca que funciona en tiempo de ejecución solo por la macro.

Separe la propiedad de los búferes entre el renderizador, extDMA y el controlador de pantalla. Espere a que termine el renderizado para comprimir, a que termine la compresión para mostrar y a que termine el uso por la pantalla para reutilizar el búfer. En memoria compartida con caché, ejecute clean sobre los datos de entrada escritos por la CPU antes de que los lea el hardware. Prepare las líneas de caché de destino para impedir que líneas sucias vuelvan a sobrescribir el resultado del hardware; una vez completada la operación, invalide las líneas obsoletas antes de que la CPU lea el resultado. Respete los límites de las líneas de caché y los datos vecinos. El final de la compresión no es el final de la transferencia al panel.

La dirección de origen, la de destino y la longitud de transferencia extDMA deben estar alineadas a 4 bytes. Respete las reglas del SDK para el stride, los bloques y el tamaño del búfer; no basta con dividir los bytes de un fotograma sin comprimir por la relación nominal.

## Disponibilidad en la familia SF32 { #availability-in-the-sf32-family }

TurboPixel está documentado para las siguientes familias SF32:

<div align="center"><em>Disponibilidad documentada de TurboPixel</em></div>

<div align="center" markdown>

| Familia SF32 | Estado de TurboPixel | Contexto de integración |
|:---|:---|:---|
| **SF32LB52x** | No disponible | Use un framebuffer sin comprimir u otra estrategia de memoria/ancho de banda admitida. |
| **SF32LB55x** | Condicional en el código actual; no validado de extremo a extremo | El encabezado LCDC actual define la capacidad de capas comprimidas con extDMA, pero indica que la ruta LCPU no está habilitada; la tabla publicada marca 55x como no compatible. Verifique el núcleo, la configuración del SDK y el hardware objetivo. |
| **SF32LB56x** | Documentado | extDMA comprime el framebuffer final con pérdidas y un factor fijo; el controlador de pantalla lo descomprime. |
| **SF32LB57x** | No disponible | Use un framebuffer sin comprimir u otra estrategia de memoria/ancho de banda admitida. |
| **SF32LB58x** | Documentado | extDMA comprime el framebuffer final con pérdidas y un factor fijo; el controlador de pantalla lo descomprime. |
| **Otras familias SF32** | Confirmar por dispositivo | No infiera el soporte de TurboPixel a partir de eZip, ePicasso o la presencia de PSRAM. Verifique la hoja de datos exacta del chip, el manual de referencia, la versión del SDK y el controlador de pantalla. |

</div>

Esta tabla registra la disponibilidad documentada a nivel de familia, no una promesa para cada encapsulado, interfaz de panel, formato de píxel, versión del SDK o configuración de placa. Confirme el objetivo exacto antes de comprometerse con una configuración de memoria o ancho de banda.

## Conclusiones clave { #key-takeaways }

- TurboPixel es un formato de compresión de framebuffer final **con pérdidas y factor fijo**.
- extDMA produce TurboPixel a partir del mapa de bits renderizado; el controlador de pantalla lo descomprime en la ruta hacia el panel.
- Su propósito principal es reducir el **almacenamiento del framebuffer** y el **tráfico de lectura de pantalla**; confirme el ahorro en el conjunto de búferes y transferencias.
- La documentación de SiFli menciona TurboPixel para SF32LB55x, SF32LB56x y SF32LB58x. En 55x, el encabezado actual define la macro de capas comprimidas con extDMA, pero señala que la ruta LCPU no está habilitada, y la tabla publicada del SDK marca 55x como no compatible. Trátelo como condicional y valide la ruta de visualización completa. El código actual excluye SF32LB52x y SF32LB57x; compruebe por separado cualquier otro dispositivo.
- TurboPixel complementa a eZip: eZip es compresión de recursos sin pérdidas, mientras que TurboPixel es compresión con pérdidas para el mapa de bits final.

## Referencias primarias { #primary-references }

- [Guía extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [Implementación del cálculo de tamaño](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [API extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [Condiciones de soporte LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [Condición actual de capas comprimidas en el encabezado LCDC de OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [Tabla generada de funciones LCDC del SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [Implementación de capas LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- Resúmenes de producto: [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
