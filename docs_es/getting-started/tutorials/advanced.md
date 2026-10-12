---
icon: lucide/rocket
description: "Tutoriales de validación de producto en SF32: ajuste de bajo consumo medido, OTA recuperable por BLE, puesta en marcha de pantallas personalizadas, análisis de fallos/coredump, Bluetooth con múltiples conexiones y controladores personalizados."
tags:
    - Tutoriales
---

# Validación de producto { #advanced-tutorials }

Estos tutoriales presuponen que ya domina la [integración de subsistemas](intermediate.md). Ya sabe poner en marcha un periférico, conectarlo al middleware y ha observado al menos un problema de coexistencia. Aquí se aborda el trabajo que convierte una demostración funcional en un producto listo para comercializar: medición del consumo, OTA recuperable, puesta en marcha de hardware personalizado, análisis de fallos, Bluetooth con varias conexiones y controladores reutilizables.

La validación de producto no consiste tanto en copiar un ejemplo como en reunir evidencias. En cada tutorial, anote la revisión de la placa, la versión del SDK, el ejemplo de partida, la configuración de la prueba, el resultado esperado y el resultado observado, además de los cambios realizados.

Utilice esta serie cuando su responsabilidad vaya más allá de hacer funcionar una función una sola vez: necesita medir el consumo, poder recuperar el dispositivo tras una actualización fallida, repetir de forma fiable la puesta en marcha del hardware personalizado y reunir pruebas de los fallos que aparecen fuera del funcionamiento normal.

Las rutas de los ejemplos y las placas compatibles pueden variar según la versión del SDK. Antes de compilar, consulte la lista «Supported Platforms» y los requisitos de hardware y configuración de cada ejemplo; que una placa admita un ejercicio no significa que admita los demás ni todas las combinaciones de funciones.

## Ajuste los modos de bajo consumo y las fuentes de activación { #tune-low-power-modes-and-wake-sources }

**Objetivo:** obtener mediciones reales de la duración de la batería, en vez de dar por hecho que el firmware consume poco solo porque llama a una función de suspensión.

**Tiempo:** más de 2 horas, más la configuración de medición

**Ejemplos de partida:** `example/pm/classical`, `example/pm/raise_wrist`

1. Configure la medición de corriente como se describe en el [Resumen del diseño de bajo consumo](../../learn/low-power/overview.md#measuring-power-in-practice).
2. Registre valores de referencia durante el arranque, el funcionamiento activo, el reposo con conexión, el reposo con la pantalla apagada y, si está disponible, Deep Sleep (suspensión profunda).
3. Empiece con el ejemplo de PM «classical» y localice dónde `rt_pm_request(PM_SLEEP_MODE_IDLE)` impide entrar en modos más profundos que IDLE, y dónde la llamada correspondiente a `rt_pm_release(PM_SLEEP_MODE_IDLE)` levanta esa restricción. Compruebe también si el framework de controladores bloquea automáticamente la suspensión mientras un periférico está activo.
4. Pase al ejemplo de activación al levantar la muñeca (raise-to-wake) y examine cómo muestrea el acelerómetro, reconoce el gesto, enciende la pantalla y vuelve al reposo. Compruebe la secuencia real de muestreo y activación del ejemplo; no dé por hecho que utiliza una interrupción.
5. Aplique el mismo criterio de ahorro a su producto. Cuando el hardware y los controladores lo permitan, utilice interrupciones o tareas activadas por eventos para evitar temporizadores y sondeos innecesarios.
6. Vuelva a medir después de cada cambio.
7. Si el consumo en Deep Sleep es mayor de lo esperado, utilice `list_thread`, `list_device`, los registros de PM y la instrumentación de las fuentes de activación para localizar el subsistema que sigue activo.

**Criterios de éxito:** el firmware alcanza el estado de bajo consumo previsto, las mediciones de corriente se repiten entre ejecuciones y las fuentes de activación son intencionadas, no accidentales.

**Solución de problemas:** si el consumo es bajo en una medición y alto en otra, compruebe las rutas de error y reconexión, la secuencia de apagado de la pantalla, el cierre de la sesión de audio y cualquier temporizador creado después del arranque.

**Lo que ha aprendido:** cómo pasar de «debería consumir poco» a un consumo medido y cómo localizar una solicitud de PM que no se ha liberado correctamente.

## Añada actualizaciones de firmware OTA por BLE { #add-ota-firmware-updates-over-ble }

**Objetivo:** actualizar el firmware sobre el terreno sin una conexión por cable.

**Tiempo:** 2 horas

**Ejemplo de partida:** `example/ble/peripheral_with_ota`

1. Compile y grabe el ejemplo de periférico con OTA habilitada.
2. Confirme que el comportamiento normal de periférico BLE sigue funcionando antes de intentar una actualización.
3. Active una actualización OTA y confirme que el dispositivo arranca la nueva imagen.
4. En una unidad de prueba con una ruta de recuperación documentada, provoque una sola interrupción cada vez, por ejemplo, desconectando durante la transferencia o saliendo del alcance. No corte la alimentación salvo que la documentación de la placa y el diseño de recuperación del producto confirmen que la prueba es segura.
5. Compruebe qué comportamiento implementa realmente el producto tras una actualización interrumpida o rechazada: por ejemplo, reintento, reanudación, modo de recuperación o rollback. Exija rollback solo si está implementado en el arranque y el diseño de particiones.
6. Pruebe la OTA cuando el dispositivo conserve datos de vinculación persistente obsoletos, después de eliminarlo del teléfono y tras reiniciarlo.
7. Si su producto ya usa PAN para datos, evalúe la ruta de OTA por PAN como una decisión de diseño independiente.

**Criterios de éxito:** tras una OTA correcta arranca la nueva imagen; una actualización interrumpida o rechazada sigue la política de recuperación documentada del producto, y el usuario puede identificar el estado del dispositivo. No dé por hecho que todas las OTA admiten rollback.

**Solución de problemas:** compruebe la disposición de las particiones, la firma de la imagen o las comprobaciones de integridad si se usan, la selección de la imagen de arranque y el comportamiento de recuperación, la compatibilidad con rollback si está implementada, los parámetros de conexión durante la transferencia y si los cambios en la vinculación o el almacenamiento se conservan tras la actualización.

**Lo que ha aprendido:** cómo determinan el comportamiento de una OTA el diseño de particiones, la validación de imágenes, la selección de arranque y la política de recuperación, y por qué una actualización correcta no demuestra por sí sola que sea posible recuperarse de una interrupción.

## Ponga en marcha un módulo de pantalla personalizado { #bring-up-a-custom-display-module }

**Objetivo:** adaptar una nueva pantalla LCD, AMOLED, EPD o de memoria, en lugar de limitarse a un panel de referencia ya compatible.

**Tiempo:** más de 3 horas

**Punto de partida:** el controlador existente del SDK más parecido a su panel

1. Reúna la hoja de datos del panel, la secuencia de inicialización, los parámetros de temporización, el tipo de interfaz, los requisitos de reset y la secuencia de alimentación.
2. Confirme que el dispositivo y el encapsulado de SF32 seleccionados admiten la interfaz y el pinout requeridos.
3. Copie el controlador de pantalla existente más cercano y sustituya la secuencia de inicialización y el mapa de registros específicos del panel.
4. Ponga en marcha primero los rellenos de color sólido. No depure los widgets de LVGL hasta que el panel pueda mostrar patrones sencillos.
5. Verifique el orden de color, el orden de bytes, la orientación, la ventana de direccionamiento y el comportamiento de actualización parcial.
6. Vuelva a añadir LVGL, como en el ejercicio 2 de Integración de subsistemas.
7. Solo si el chip, la ruta de pantalla, el controlador y el SDK seleccionados lo permiten, habilite de uno en uno el DMA, el refresco parcial y la aceleración ePicasso.
8. Pruebe las rutas de pantalla apagada, suspensión, activación y reinicialización.

**Criterios de éxito:** el panel se inicializa de forma fiable tras un arranque en frío y un reset, renderiza patrones conocidos correctamente, y sobrevive a la suspensión/activación sin corrupción.

**Solución de problemas:** si los rellenos no son correctos, compruebe el formato de píxel, los bits de MADCTL/orientación, el orden de bytes, el cableado de comando/datos, la temporización del reset y la secuencia de encendido de las líneas de alimentación antes de modificar el código de la interfaz.

**Lo que ha aprendido:** cómo separar la corrección eléctrica/de secuencia de la configuración del framework de interfaz.

## Perfile el uso de CPU y analice un fallo { #profile-cpu-usage-and-analyze-a-crash }

**Objetivo:** depurar problemas que no se reproducen fácilmente durante una sesión de depuración en directo.

**Tiempo:** 2 horas

**Ejemplos de partida:** `example/system/cpu_usage_profiler`, `example/system/coredump`

1. Ejecute el ejemplo de perfilado de uso de CPU con una de las cargas combinadas de Integración de subsistemas.
2. Identifique qué tarea está consumiendo tiempo de CPU y si coincide con lo esperado.
3. Añada un fallo controlado en una rama de práctica o en un ejemplo desechable y capture un volcado de núcleo (core dump).
4. Utilice las herramientas de análisis de volcados del SDK para localizar la función que falló y reconstruir la pila de llamadas.
5. Compare el contexto del fallo con `list_thread`, los registros y los eventos recientes.
6. Elimine el fallo deliberado y repita el flujo con un problema intermitente real si dispone de uno.

**Criterios de éxito:** puede explicar tanto un problema de rendimiento como un fallo usando evidencia capturada en lugar de conjeturas.

**Solución de problemas:** antes de interpretar la pila de llamadas, compruebe que los símbolos corresponden al binario grabado, que los registros incluyen la versión del firmware y que conoce el nivel de optimización usado.

**Lo que ha aprendido:** el perfilado proactivo para rutas lentas y el análisis post mortem de volcados para fallos difíciles de capturar en vivo.

## Construya un producto BLE con múltiples conexiones { #build-a-multi-connection-ble-product }

**Objetivo:** admitir más de un rol o conexión BLE simultáneos.

**Tiempo:** 2 horas

**Ejemplos de partida:** `example/ble/central_and_peripheral`, `example/ble/multi_connection`

1. Parta del comportamiento periférico que validó en el ejercicio 3 de Integración de subsistemas.
2. Añada el rol central: por ejemplo, el dispositivo puede actuar como periférico frente a un teléfono y como central frente a un accesorio con sensores.
3. Amplíe a varias conexiones concurrentes.
4. Registre para cada enlace el intervalo de conexión, la latencia del periférico, el tiempo de supervisión y la frecuencia de notificación.
5. Establezca primero una referencia de caudal de datos (throughput) con el ejemplo correspondiente del SDK, antes de atribuir el problema al código de la aplicación.
6. Pruebe la reconexión, el modo de reposo del teléfono, la pérdida del accesorio y las ráfagas simultáneas de notificaciones.

**Criterios de éxito:** todos los roles previstos se conectan, desconectan y reconectan de forma fiable, y los parámetros elegidos para cada conexión se mantienen estables bajo carga combinada.

**Solución de problemas:** busque solicitudes de parámetros incompatibles, un volumen excesivo de notificaciones, funciones de retorno (callbacks) de la aplicación que bloqueen la ejecución y una política de energía que despierte la CPU principal en cada evento de conexión.

**Lo que ha aprendido:** las configuraciones BLE compatibles del SiFli-SDK pueden combinar los roles periférico y central; algunas también admiten varias conexiones simultáneas. Confirme los roles y límites de conexión de su chip, configuración de la pila y ejemplo. Los compromisos entre parámetros se acumulan cuando varios enlaces comparten la planificación de la radio.

## Escriba un controlador de dispositivo personalizado para RT-Thread { #write-a-custom-rt-thread-device-driver }

**Objetivo:** integrar un periférico que no tiene un controlador existente en el SDK como un dispositivo propio de RT-Thread, en lugar de como un apaño de aplicación puntual.

**Tiempo:** más de 3 horas

**Punto de partida:** la guía de desarrollo de aplicaciones del SDK y el controlador existente más parecido

1. Revise cómo organiza el SDK las definiciones de placa, el multiplexado de pines, los relojes y los controladores de periféricos.
2. Parta del controlador existente cuya arquitectura más se parezca a la de su periférico.
3. Mantenga separados el acceso al bus, el registro de dispositivo, la configuración y la lógica de aplicación.
4. Registre el dispositivo y confirme que aparece en `list_device`.
5. Pruébelo del mismo modo que probó ADC, PWM, I2C y los dispositivos de almacenamiento en los tutoriales anteriores.
6. Añada gestión de errores para hardware ausente, argumentos no válidos, tiempos de espera agotados y suspensión/reanudación.
7. Si el controlador es reutilizable, empaquételo como un componente del SDK en lugar de copiarlo y pegarlo entre productos.

**Criterios de éxito:** el código de la aplicación encuentra y usa el controlador mediante el modelo de dispositivos habitual de RT-Thread, y este se comporta de forma predecible durante la inicialización, el uso, la gestión de errores y los ciclos de suspensión y reanudación.

**Solución de problemas:** si el controlador solo funciona desde un archivo de aplicación, probablemente esté evitando el modelo de dispositivos. Refactorícelo hasta que se use como los controladores integrados.

**Lo que ha aprendido:** cómo ampliar limpiamente el ecosistema del SDK sin crear una carga de mantenimiento innecesaria.

## Lista de comprobación de publicación de la validación de producto { #advanced-release-checklist }

- [ ] Las cifras de consumo están medidas, son repetibles y están vinculadas a escenarios de prueba con nombre.
- [ ] El éxito de las actualizaciones OTA, las comprobaciones de integridad y la recuperación tras interrupciones se han probado conforme a la política documentada del producto; el rollback solo se considera verificado si está implementado en el diseño.
- [ ] La puesta en marcha de pantalla personalizada se valida con patrones antes de la complejidad de LVGL.
- [ ] Los flujos de perfilado y coredump están documentados para el equipo.
- [ ] El Bluetooth con varias conexiones se prueba durante reconexiones y ante casos límite del teléfono o del accesorio.
- [ ] Los controladores personalizados usan el modelo de dispositivo de RT-Thread y gestionan la suspensión/activación.
- [ ] Las pruebas de carga combinada incluyen pantalla, Bluetooth, almacenamiento, audio, sensores e IA cuando corresponda.

## A dónde ir después { #where-to-go-next }

Llegados a este punto, dispone de las herramientas necesarias: integración de periféricos y middleware, gestión de la coexistencia y del consumo, OTA, puesta en marcha de hardware personalizado, análisis post mortem e integración de controladores. A partir de aquí, el catálogo de [Ejemplos](../../develop/examples/index.md) y el [Resumen de gráficos](../../learn/graphics/overview.md) le servirán como referencia. Consulte los temas que necesite para cada función, en lugar de recorrer el catálogo de principio a fin.
