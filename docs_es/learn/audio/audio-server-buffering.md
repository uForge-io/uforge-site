---
icon: lucide/audio-lines
description: "Guía práctica sobre Audio Server y la gestión de búferes DMA en SF32 para evitar cortes en reproducción y grabación y convivir con Bluetooth y las tareas de procesamiento gráfico."
tags:
    - Audio
---

# Audio Server y gestión de búferes { #audio-server-and-buffering }

Consulte esta página después de elegir la interfaz de audio y definir su uso en el producto a partir de la [descripción general del audio](overview.md). Explica cómo se reparten en tiempo de ejecución las responsabilidades entre el código de la aplicación, las sesiones de Audio Server, los búferes DMA y la ruta de audio del hardware.

**Ámbito de los comportamientos específicos del SDK:** Los detalles de API siguientes están documentados para SF32LB52x en la versión actual del SDK de SiFli. Confírmelos en `audio_server.h`, en la implementación y en la configuración de la familia de chips y la versión del SDK elegidas. Las recomendaciones sobre tamaños de búfer, planificación y caché son pautas de ingeniería; Audio Server no garantiza el mismo comportamiento ni la misma propiedad de los búferes en todos los destinos.

## Responsabilidades de la sesión { #session-ownership }

Separe la lógica de control de la aplicación del mecanismo de transmisión. La aplicación decide cuándo iniciar o detener la reproducción o la grabación y cómo gestionar sus cambios de estado; Audio Server coordina la sesión, DMA transfiere los bloques de muestras y el controlador configura el hardware. Mientras haya un flujo de audio activo, la interfaz de usuario, las rutinas de callback de Bluetooth y las lecturas del sistema de archivos no deben manipular directamente los registros del códec.

<div align="center"><em>Tabla: Propiedad de los búferes</em></div>

<div align="center" markdown>

| Límite de responsabilidad | Responsable | Pregunta de revisión |
|:---------|:------|:----------------|
| Datos de origen | Aplicación, decodificador o tarea de almacenamiento | ¿Puede mantener alimentada la cola de reproducción antes de que se vacíe? |
| Caché de escritura de Audio Server, si está configurada | Audio Server; tamaño configurado por la aplicación | ¿Es válido `write_cache_size` para este SDK? ¿La aplicación gestiona todos los resultados de `audio_write()`? |
| Búfer en transferencia | DMA/controlador de audio | ¿Permanece estable y coherente con la caché durante toda la transferencia? |
| Búfer ya transferido | Aplicación o tarea de procesamiento | ¿Se repone el audio de reproducción o se procesa el capturado antes de que DMA reutilice esa región? |
| Estado de la sesión | Audio Server más política de la aplicación | ¿Las solicitudes repetidas de inicio, detención, error y cierre evitan cerrar o liberar recursos dos veces? |

</div>

## Elija una estrategia de búfer { #choose-a-buffer-strategy }

El doble búfer es un buen punto de partida si el controlador lo admite: DMA transfiere una región mientras el software prepara el audio de reproducción o procesa el audio capturado en otra. Distinga la cola PCM de la aplicación del búfer DMA del controlador; escribir en Audio Server no implica por sí solo una transferencia DMA sin copia.

Amplíe la capacidad de la cola solo cuando lo exijan la latencia del almacenamiento, el tiempo de decodificación, la fluctuación del transporte Bluetooth o la variabilidad de la planificación. La capacidad consume memoria; la cantidad de audio realmente encolado determina su tiempo de espera. Reservar más búferes no aumenta automáticamente la latencia. Use los cálculos por tramas de la [descripción general del audio](overview.md#buffer-and-latency-budget), teniendo en cuenta el número de canales y los bytes almacenados por muestra.

Mida la duración del bloque, el tiempo máximo de preparación o procesamiento y la latencia de extremo a extremo aceptable. Determine cada plazo a partir de las notificaciones del controlador de destino sobre la reposición del búfer y la finalización de la transferencia, junto con la secuencia de reutilización. Si ofrece callbacks de media transferencia y transferencia completa, programe el trabajo en torno a esas transiciones; no considere el final de la transferencia actual como el único plazo. Los datos de reproducción deben estar listos antes de que DMA los necesite; los datos grabados deben procesarse o copiarse antes de que DMA los sobrescriba. Reserve margen para la planificación e investigue incluso los subdesbordamientos de reproducción (underruns) y los desbordamientos de grabación (overruns), aunque sean ocasionales.

Para la memoria que la aplicación o el controlador expone directamente a DMA, siga las reglas de caché y propiedad del destino: limpie las líneas de caché que contienen datos de reproducción escritos por la CPU antes de que DMA los lea, prepare los búferes de recepción según corresponda e invalide la caché de los datos capturados antes del acceso de la CPU cuando el destino lo requiera. Estas operaciones dependen del SoC, la región de memoria y la API del controlador. No realice mantenimiento manual de la caché de los búferes que pertenecen a Audio Server o al controlador, salvo que la API lo exija. No modifique, libere ni reutilice una región mientras DMA sea su propietario.

La [documentación de Audio Server para SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/multimedia.html) indica que los callbacks se ejecutan en el hilo de Audio Server y que el callback de `audio_open()` no debe llamar a `audio_close()`, porque podría provocar un interbloqueo. Mantenga los callbacks breves y delegue en un hilo de trabajo las operaciones de almacenamiento o procesamiento que puedan bloquear. El callback de captura recibe un puntero y la longitud de una trama de audio; la documentación citada no especifica cuánto tiempo sigue siendo válido el puntero después del callback. Cópielo antes de regresar, salvo que el SDK del destino garantice expresamente una vida útil mayor.

La misma documentación de SF32LB52x define estos resultados de `audio_write()`:

<div align="center"><em>Tabla: Resultados documentados de audio_write() (SF32LB52x)</em></div>

<div align="center" markdown>

| Valor de retorno | Significado documentado |
|:-----------------|:------------------------|
| `> 0` | El valor equivale a `data_len`; los datos se aceptaron en la caché de escritura. |
| `0` | La caché de escritura está llena. También se rechaza con `0` una solicitud mayor que la capacidad configurada. |
| `-1` | El cliente está pausado o suspendido; se descartan los datos enviados. |
| `-2` | Parámetro no válido. |

</div>

En esa API, `write_cache_size` tiene un límite de `0x7FFF` bytes y la guía recomienda una capacidad de al menos el doble de los datos de una llamada a `audio_write()` para su patrón de escritura ping-pong. Se trata de la caché de software de Audio Server, no de una garantía sobre la disposición física de los búferes DMA del controlador. Compruebe el SDK del destino antes de aplicar estos límites. La prioridad de los clientes, la mezcla y las rutas de audio disponibles también dependen de la configuración; abrir una sesión no garantiza que Audio Server exponga todas las interfaces del chip.

## Valide con la carga real del producto { #validate-under-product-load }

Pruebe la sesión junto con las cargas simultáneas del producto: actualización de pantalla, notificaciones o audio por Bluetooth, lecturas y escrituras de almacenamiento, registro de eventos y transiciones a modos de bajo consumo. Registre los subdesbordamientos de reproducción, los desbordamientos de grabación, la ocupación de la cola, el tiempo entre el callback y la ejecución del hilo de trabajo, los cortes, las reconexiones y las transiciones de suspensión y reactivación. Pruebe las interrupciones por prioridad, la suspensión y reanudación, los fallos de inicio y las solicitudes repetidas de detención; verifique la política de recuperación prevista sin perder datos de forma silenciosa.

Al cerrar, asegúrese de que el controlador haya detenido las transferencias y de que los callbacks pendientes ya no puedan acceder a búferes liberados. Compruebe que se liberen las solicitudes de gestión de energía del audio y se desactiven los componentes externos según la secuencia del hardware. Consulte el [Resumen del diseño de bajo consumo](../low-power/overview.md) para validar el consumo del sistema y el [Resumen de Bluetooth](../bluetooth/overview.md) para la coexistencia inalámbrica.
