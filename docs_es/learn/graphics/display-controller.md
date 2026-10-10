---
icon: lucide/monitor
description: "Cómo el controlador de pantalla SF32 transfiere los píxeles al panel: selección de interfaz, ruta de transferencia, refresco parcial y puesta en marcha."
tags:
  - Gráficos
---

# Controlador de pantalla { #display-controller }

## Resumen { #overview }

El **controlador de pantalla** (LCDC) envía los píxeles ya preparados al panel mediante la interfaz seleccionada. En los dispositivos y configuraciones compatibles, también descomprime el framebuffer TurboPixel durante la salida. LCDC admite una mezcla alfa limitada de sus capas de salida sobre un fondo de color uniforme; la documentación incluye las capas 0 y 1, pero SF32LB52x no admite la capa 1. Esta función no sustituye al renderizado general de la UI ni a la composición de ePicasso. La decodificación de recursos eZip sigue siendo una operación independiente.

Referencia primaria: [documentación de LCDC HAL de SiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/lcdc.md).

El enlace anterior está fijado a un commit concreto de SiFli-SDK. Documenta el comportamiento de HAL en esa revisión, pero no demuestra que todas las interfaces, capas o funciones estén disponibles en todos los dispositivos o encapsulados SF32 ni en otras versiones del SDK. Verifique la combinación exacta de dispositivo, encapsulado y versión del SDK del proyecto.

Consulte el [resumen de gráficos](overview.md#sf32-graphics-flow) para ver el recorrido completo desde los recursos hasta el panel. Este artículo se centra en el controlador de pantalla, la conexión del panel y la integración del driver.

Consulte esta página al elegir la interfaz del panel, definir cómo LVGL transfiere los píxeles al panel o poner en marcha un panel nuevo. Distingue la salida del controlador de la decodificación de recursos y la composición de píxeles para ayudar a localizar cada problema en la capa adecuada.

## Seleccionar la interfaz de pantalla { #select-the-display-interface }

EPD y Memory-in-Pixel describen tecnologías de panel o formas de actualizar los píxeles, no buses intercambiables. Un módulo EPD puede conectarse por SPI a un controlador externo; también está documentado un modo de accionamiento directo de EPD mediante LCDC en SF32LB57x. JDI ofrece modos de interfaz serie y paralelo con señales distintas. Compruebe la interfaz eléctrica y los requisitos de mantenimiento del panel, no solo su categoría.

La elección del panel afecta al ancho de banda, la estrategia de búfer, el uso de pines, el consumo, la complejidad de inicialización y el riesgo del diseño de la PCB. Confirme qué interfaces admite exactamente el dispositivo y encapsulado seleccionados.

<div align="center"><em>Opciones de interfaz de pantalla y tecnología de panel</em></div>

<div align="center" markdown>

| Interfaz o tipo de panel | Uso típico | Notas de diseño |
|:---|:---|:---|
| **SPI de 3 o 4 líneas** | Paneles TFT o AMOLED pequeños, HMI simples | Bajo número de pines y enrutado simple, pero ancho de banda limitado para animación de pantalla completa. |
| **Dual-SPI / Quad-SPI** | AMOLED de dispositivos portátiles y pantallas compactas | Mejor ancho de banda que el SPI básico manteniendo un número de pines moderado. |
| **Interfaz MCU 8080** | Paneles con interfaz paralela | Mayor ancho de banda que SPI serial, pero usa más pines. |
| **RGB / DPI** | Pantallas grandes o con alta frecuencia de refresco | Flujo continuo de píxeles, mayor ancho de banda y número de pines, y requisitos de temporización más estrictos. |
| **MIPI DSI** | AMOLED de alta densidad o paneles avanzados | Alto ancho de banda con pocos pines, pero inicialización más compleja e integridad de señal. |
| **Tecnología de panel EPD** | Papel electrónico y pantallas de muy baja frecuencia de refresco | La interfaz del lado anfitrión depende del módulo y del controlador. Una imagen estática puede mantenerse con bajo consumo del panel; las actualizaciones son lentas y requieren control específico de la forma de onda y la alimentación. |
| **JDI (serie o paralelo)** | Paneles reflectivos de bajo consumo | Los modos JDI usan señales distintas; confirme la interfaz eléctrica y los requisitos de mantenimiento del panel elegido. |
| **Panel con tecnología Memory-in-Pixel** | Pantallas reflectivas de bajo consumo, incluidas las UI siempre activas o legibles bajo la luz solar | La memoria de píxeles está integrada en el panel; el refresco difiere del de TFT/AMOLED. Siga la hoja de datos del panel. |

</div>

Por ejemplo, un panel SPI/QSPI pequeño puede aprovechar las actualizaciones parciales, mientras que uno RGB/DPI requiere un presupuesto para el barrido continuo (scanout). No elija la interfaz basándose solo en el caudal teórico: tenga en cuenta el formato de píxel, la resolución, el patrón de refresco, la GRAM del panel y el tráfico de otros usuarios de PSRAM.

## Matriz de interfaces por dispositivo { #per-device-interface-matrix }

La siguiente matriz sirve para seleccionar una familia; no es una tabla de asignación de pines. Resume las interfaces de pantalla documentadas para cada familia SF32 o variante de silicio. Un guion indica que esa interfaz no está documentada para la fila correspondiente; no excluye el uso de un controlador externo gestionado por GPIO ni una implementación específica de la placa. Antes de cerrar el esquema, confirme el código exacto del dispositivo, el encapsulado, la multiplexación de pines, la versión del SDK y el controlador del panel.

<div align="center"><em>Matriz de interfaces de pantalla SF32</em></div>

<div align="center" markdown>

| Familia o variante SF32 | Interfaces de LCD/panel documentadas | Restricción de encapsulado o variante | Criterio práctico de selección |
|:---|:---|:---|:---|
| **SF32LB52x** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), JDI serie/paralelo; EPD mediante controlador SPI; la guía de hardware de 52B/D/E/G/J también documenta la interfaz de señales EPD paralela de 8 bits | Los modelos 52x enumerados usan QFN68L. La guía de hardware de 52B/D/E/G/J especifica señales y control del PMIC TPS, pero esto no demuestra que exista soporte del modo EPD de accionamiento directo mediante LCDC. Verifique el controlador y la variante exacta. | Diseños compactos SPI/QSPI, 8080 y JDI; para EPD paralelo, confirme la implementación de GPIO, temporización y control de alimentación TPS de la variante elegida. |
| **SF32LB55x** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI serie/paralelo, MIPI DSI en modo comando | La interfaz MIPI DSI documentada, con dos líneas de datos, está disponible en encapsulados BGA145/169; JDI y el funcionamiento con dos pantallas mediante MIPI DSI + SPI/DSPI solo se documentan para 557VD3A6. El modo comando requiere un controlador de panel con SRAM/GRAM interna. | Dispositivos vestibles y otros dispositivos conectados con pantalla, con encapsulado BGA compatible y panel MIPI en modo comando. |
| **SF32LB56xU** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, JDI serie | Las variantes U listadas usan QFN68L; confirme el código exacto y la multiplexación de pines. | Diseños compactos con panel serie que priorizan el ancho de banda QSPI y un menor número de pines. |
| **SF32LB56xV** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, JDI serie/paralelo | Las variantes V listadas usan WBBGA175 (BGA175 en la guía de modelos); confirme los pines necesarios y el enrutado para el código exacto. | Diseños de alta resolución o frecuencia de refresco que necesitan 8080, DPI/RGB o JDI paralelo. |
| **SF32LB57x** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, 8080/DBI de 8/16 bits, DPI/RGB, JDI y EPD con accionamiento directo | Las opciones de encapsulado incluyen QFN68L, QFN80L y BGA112; confirme el código exacto, los pines disponibles y la ruta de control del panel. | Diseños con uso intensivo de gráficos que requieren una interfaz paralela o serie, JDI o EPD. |
| **SF32LB58x** | SPI de 3/4 hilos, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI serie/paralelo, MIPI DSI de dos líneas de datos, en modo comando y en modo de vídeo | Los códigos de pedido enumerados usan BGA256. El modo comando usa un controlador de panel con SRAM/GRAM interna; el modo de vídeo también admite controladores de panel sin RAM. La guía de modelos también enumera pantallas duales mediante MIPI DSI + SPI/DSPI/QSPI. Confirme el controlador LCD y la multiplexación de pines para el diseño exacto. | Diseños de UI de alta resolución y exigentes en ancho de banda, incluidos los de doble pantalla y los paneles MIPI DSI con o sin RAM en el controlador. |

</div>

En **SF32LB56x**, no considere intercambiables las variantes U y V. Para **SF32LB55x** y **SF32LB58x**, no asigne MIPI DSI en el esquema hasta confirmar el encapsulado exacto, los pines DSI disponibles y el número de líneas de datos y el modo de funcionamiento que requiere el panel. En particular, SF32LB55x solo admite el modo comando, por lo que no es compatible con un panel sin RAM que funcione en modo de vídeo. Los diseños EPD también requieren planificar la temporización, la forma de onda y la alimentación específicas del panel; conocer la interfaz no basta para completar el diseño.

Las dos guías de hardware de SF32LB52x no coinciden en JDI: el resumen menciona JDI serie, mientras que las secciones detalladas muestran asignaciones de señales paralelas. Por eso la matriz conserva ambas capacidades documentadas, pero no garantiza la disponibilidad de pines para un código concreto. Antes de cerrar el diseño, confirme el mapeo LCDC, el SDK/driver y las señales del panel de la variante exacta.

La guía de modelos de chips de SiFli incluye DPI/RGB entre las interfaces de la familia SF32LB55x, pero su tabla por código de pedido no asigna DPI a los SKU enumerados. Considérelo únicamente como evidencia a nivel de familia y confirme la compatibilidad DPI y la disponibilidad de pines para el código exacto antes de depender de ella. La distinción U/V de SF32LB56x se basa en sus guías de hardware separadas, no en la tabla HAL de toda la familia.

En SF32LB52x, distinga la interfaz de señales EPD paralela de 8 bits documentada del modo de accionamiento directo EPD mediante LCDC. La guía de hardware de 52B/D/E/G/J incluye las señales EPD paralelas y el control del PMIC TPS; por separado, las notas de versión de SiFli-SDK v2.5.1 documentan el soporte del accionamiento directo EPD mediante LCDC en SF32LB57x. No dé por hecho que un diseño 52x puede utilizar la ruta de accionamiento directo LCDC de 57x; compruebe el controlador y la implementación de temporización para la variante concreta.

Fuentes de las interfaces: [guía de modelos de chips de SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), [guía de hardware SF32LB52x con batería](https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html), [guía de hardware 52B/D/E/G/J](https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html), [SF32LB55x](https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html), [SF32LB56xU](https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html), [SF32LB56xV](https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html), [SF32LB58x](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html) y [notas de soporte SF32LB57x en el SDK](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1).

## Controlador, búferes y transferencia a pantalla { #controller-buffers-and-flush-paths }

El diagrama de referencia de LCDC distingue el área visible del panel, la ventana de actualización y la región del búfer de origen. Aplique de forma coherente los desplazamientos de columna y fila. La ventana puede solaparse solo parcialmente con la región del búfer de origen; los píxeles de la ventana sin datos de origen muestran el color de fondo. Compruebe conjuntamente las coordenadas, el origen del búfer y el stride, sin asumir que el búfer y la ventana coinciden.

El framework de UI produce los píxeles modificados; el driver y el controlador de pantalla los envían al panel. La ruta apropiada depende del panel:

- Un driver SPI/QSPI o 8080 generalmente establece una ventana de panel y transfiere solo la región cambiada.
- Un controlador que escanea un framebuffer consume datos de píxeles de la memoria según la temporización de pantalla.
- Una ruta capaz de TurboPixel lee el mapa de bits final comprimido y lo descomprime en la etapa del controlador de pantalla.

En LVGL, el callback de actualización de pantalla (flush) marca el límite entre el renderizado y la salida. Debe tener en cuenta la región que se actualiza, iniciar la operación adecuada de DMA o del controlador y señalar que ha terminado solo cuando el framework pueda reutilizar el búfer de dibujo sin riesgo. Mantenga explícitas las reglas de limpieza (clean) e invalidación (invalidate) de caché siempre que la CPU y el hardware compartan búferes.

El momento de reutilizar un búfer depende de la ruta de transferencia. Al transferir a la memoria del panel, libere el búfer de dibujo solo cuando el hardware haya terminado de leerlo. En el barrido continuo, una interrupción de cuadro no basta para liberar el framebuffer activo: espere a que se confirme el cambio de búfer y el controlador deje de leer el anterior. La finalización de la transferencia y el refresco visible son eventos distintos; use la señal TE o la temporización de cuadro del panel cuando sea necesario para evitar tearing.

Si la memoria compartida admite caché, limpie la caché de los datos de origen escritos por la CPU antes de que el hardware los lea. Antes de una escritura de hardware, prepare el destino según las reglas de mantenimiento de caché de la plataforma, para que una escritura posterior de líneas modificadas no sobrescriba el resultado. Cuando termine la operación de hardware, invalide el destino antes de que la CPU lo lea. Respete la alineación y la propiedad de las líneas de caché, incluidos los datos vecinos que compartan una misma línea.

<div align="center"><em>Decisiones sobre la ruta de pantalla</em></div>

<div align="center" markdown>

| Decisión | Qué validar |
|:---|:---|
| Región transferida | Transferir solo las zonas modificadas cuando el panel y el controlador lo permitan. |
| Búferes | Elegir entre búfer parcial, de cuadro completo, simple o doble según la latencia y la memoria disponibles. |
| Sincronización | Libere o reutilice el búfer solo cuando el hardware deje de leerlo; confirme el cambio de búfer en la lectura continua. |
| Formato de píxel | Hacer coincidir el panel, el driver, el renderizador y cualquier ruta de aceleración para evitar conversiones en la ruta crítica. |
| Caché | Limpiar (clean) los búferes escritos por la CPU antes de que el hardware los lea; invalidar (invalidate) los búferes escritos por hardware antes de que la CPU los lea. |

</div>

## Refresco parcial y regiones modificadas { #partial-refresh-and-dirty-regions }

El renderizado parcial y la transferencia parcial al panel son optimizaciones distintas. Un flujo continuo RGB/DPI o DSI en modo de vídeo puede seguir enviando el cuadro completo aunque solo cambie una pequeña región de memoria. En EPD, compruebe las formas de onda admitidas, la dependencia de la temperatura, las imágenes residuales y los intervalos de refresco completo; una región más pequeña no garantiza una actualización válida.

La mayoría de las interfaces de usuario embebidas no necesitan redibujar toda la pantalla en cada fotograma. LVGL sigue las zonas invalidadas y el controlador puede transferir solo las áreas modificadas. Esto resulta especialmente útil con paneles SPI/QSPI, dispositivos portátiles a batería, páginas estáticas con pequeños valores cambiantes y pantallas EPD o JDI.

El refresco de pantalla completa es apropiado para pantallas con mucha animación, transiciones o paneles que escanean de forma natural desde un framebuffer completo. La elección depende del ancho de banda de la interfaz de pantalla, del comportamiento del panel y del presupuesto de memoria, no solo del ajuste del framework de UI.

## Secuencia de puesta en marcha del panel { #panel-bring-up-sequence }

Ponga en marcha el panel en etapas antes de depurar widgets o el comportamiento de la aplicación:

1. Compruebe las líneas de alimentación, la temporización del reinicio, los pines de retroiluminación y habilitación, y el consumo de corriente de referencia.
2. Envíe la secuencia de inicialización del proveedor del panel exactamente como se proporciona.
3. Muestre colores sólidos para detectar errores en el orden de bytes, el formato de píxel o el cableado de la interfaz.
4. Dibuje patrones geométricos simples para verificar el paso (stride), el direccionamiento de ventana y las coordenadas.
5. Añada imágenes y texto para comprobar la conversión de color, las fuentes y la ubicación de los recursos.
6. Habilite el refresco parcial, DMA, TurboPixel y la aceleración gráfica de uno en uno.
7. Pruebe las rutas de suspensión, apagado de pantalla, activación y reinicialización.

Primero valide colores sólidos y patrones con una configuración mínima de la interfaz prevista. Después de añadir DMA, compresión o aceleración, repita las pruebas por cada ruta nueva antes de probar la UI completa de LVGL.

## Diagnosticar fallos en la ruta de visualización { #isolate-display-path-failures }

Trate cada etapa como un límite independiente. Cambiar a la vez los comandos del panel, el código LVGL, la ubicación de los búferes y los ajustes de DMA dificulta reproducir y localizar un fallo.

<div align="center"><em>Matriz de diagnóstico de la ruta de pantalla</em></div>

<div align="center" markdown>

| Síntoma | Primer límite que debe comprobarse | Prueba específica | Causa probable |
|:---|:---|:---|:---|
| El panel no muestra ninguna imagen | Alimentación, reinicio e inicialización del panel | Mida las líneas de alimentación y el reinicio; ejecute la secuencia de inicialización del fabricante y muestre un color sólido. | Secuencia de alimentación, polaridad del reinicio, comandos de inicialización o conexión física de la interfaz. |
| Se muestran colores sólidos, pero los colores son incorrectos | Formato de píxel entre el renderizador y el panel | Muestre barras de prueba rojas, verdes, azules, negras y blancas. | Orden RGB/BGR, orden de bytes, profundidad de color o conversión de formato. |
| La imagen está desplazada, recortada o presenta desgarro (tearing) | Direccionamiento y sincronización | Dibuje una cuadrícula y después pruebe repetidamente una región de actualización fija. | Coordenadas de ventana, stride, temporización del panel, reutilización de búfer o sincronización de DMA incompleta. |
| La interfaz de usuario estática funciona, pero la animación da tirones | Etapas de renderizado, transferencia y memoria | Mida por separado el tiempo de renderizado y el tiempo hasta completar la transferencia. | Área de redibujado excesiva, contención de PSRAM, interfaz lenta o estrategia de búfer inadecuada. |
| Los artefactos aparecen solo después de suspensión/activación | Transición de estado de energía | Vuelva a ejecutar la prueba de relleno/cuadrícula después de cada ruta soportada de apagado y activación de pantalla. | Estado de panel perdido, omisión de reinicio/inicialización, secuenciación de rieles, o estado obsoleto de caché/búfer. |
| Una función falla solo cuando está habilitada | Ruta opcional específica | Habilite DMA, refresco parcial, ePicasso o TurboPixel de uno en uno. | Configuración no admitida, problema de alineación o caché, o error de integración del driver. |

</div>

## Guía específica por tipo de panel { #panel-specific-guidance }

### AMOLED/TFT SPI y QSPI { #spi-and-qspi-amoledtft }

Priorice el refresco parcial, use RGB565 cuando sea adecuado y limite las zonas animadas. Para cambios pequeños, evite redibujar toda la pantalla; renderice y componga los píxeles antes de transferir la zona modificada.

### Paneles RGB / DPI { #rgb-dpi-panels }

Presupueste el ancho de banda de lectura continua junto con el tráfico de CPU, ePicasso, DMA y otros usuarios de memoria. Elija una estrategia de framebuffer adecuada para la frecuencia de refresco requerida, valore el doble búfer si la memoria lo permite y tenga en cuenta la temporización y la integridad de señal al diseñar la PCB.

### Paneles MIPI DSI { #mipi-dsi-panels }

Elija el modo del panel antes de cerrar la selección del componente. **SF32LB55x solo admite el modo comando MIPI DSI**, por lo que el controlador del panel debe incluir SRAM/GRAM interna para conservar la imagen actualizada. **SF32LB58x admite el modo comando y el modo de vídeo**: los paneles en modo comando necesitan RAM en el controlador; el modo de vídeo puede manejar un controlador de panel sin RAM mediante el flujo continuo de píxeles. Valide pronto la inicialización, pruebe los estados de bajo consumo y el tiempo de activación, y mantenga la tasa de datos necesaria por debajo del caudal útil de la interfaz, con margen para la sobrecarga del protocolo, las restricciones de temporización y el resto del tráfico de memoria.

### Pantallas EPD { #epd-displays }

Diseñe para actualizaciones poco frecuentes; use modos de actualización parcial solo cuando estén admitidos y el resultado visual sea aceptable. No dé por sentado que habrá animaciones y planifique los requisitos del PMIC de pantalla, VCOM y la forma de onda.

### Interfaces JDI y paneles Memory-in-Pixel { #jdi-memory-in-pixel-displays }

En este artículo, JDI se refiere a los modos de interfaz serie o paralelo del panel, mientras que Memory-in-Pixel es una tecnología de panel. Pueden combinarse en algunos diseños de bajo consumo, pero no son términos intercambiables. En un panel MIP, las actualizaciones pequeñas y un diseño de UI adecuado pueden aprovechar la retención de los píxeles mientras el panel está alimentado. Esto no implica almacenamiento no volátil de la imagen ni consumo cero del sistema en espera. Siga la hoja de datos del panel para la inversión COM y otras operaciones de mantenimiento; mida después el refresco, la legibilidad en exteriores y el consumo en las condiciones del producto.

## Lista de comprobación para la entrega a producción { #production-handoff-checklist }

Antes de tratar la ruta de pantalla como completa, registre las decisiones que otro ingeniero debe poder reproducir:

- Dispositivo SF32 exacto, encapsulado, versión del SDK, revisión de la placa, referencia del panel y revisión de su controlador.
- Modo de interfaz, asignación de pines, formato de píxel, orden de bytes y colores, comportamiento de refresco previsto y fuente de la secuencia de inicialización del panel.
- Ubicación, tamaño y alineación del búfer de dibujo y del framebuffer; responsable del mantenimiento de caché y señal de finalización de DMA/controlador.
- Política de refresco parcial, reglas de las ventanas del panel y regiones que deban refrescarse juntas para evitar artefactos.
- Tiempo de renderizado medido, tiempo de transferencia, tráfico de PSRAM pico/promedio donde sea relevante, y corriente para estados de UI representativos.
- Resultados de prueba de suspensión, apagado de pantalla, activación, y recuperación, incluyendo el comportamiento después de una transferencia fallida o interrumpida.

Este registro convierte el soporte de pantalla de un resultado de puesta en marcha único en una integración de producto repetible. Vuelva a validarlo siempre que cambien el panel, el SDK, el diseño de memoria, el formato de píxel o el driver de pantalla.

## Puntos clave { #key-takeaways }

- El controlador de pantalla se encarga de la salida al panel; es independiente de la composición de píxeles de ePicasso y de la descompresión de recursos de eZip.
- La elección de interfaz determina buena parte del ancho de banda, la estrategia de búfer, el consumo, el uso de pines y el diseño de la PCB.
- Trate la transferencia a pantalla, la sincronización, el mantenimiento de caché y la inicialización del panel como tareas centrales del firmware.
- Valide el panel con patrones simples antes de habilitar la interfaz de usuario de nivel superior, DMA, TurboPixel o las funciones de aceleración.
- Diagnostique los fallos en un límite de la ruta de pantalla cada vez y conserve la configuración y las mediciones validadas para la entrega a producción.
