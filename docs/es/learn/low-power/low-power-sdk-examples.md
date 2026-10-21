---
icon: lucide/battery-charging
title: "Ejemplos de bajo consumo del SDK"
description: "Elija el ejemplo de gestión de energía de SiFli-SDK adecuado para suspensión, fuentes de activación, GPIO, CPU, Bluetooth, pantallas, UI y escenarios de wearables."
tags:
  - Bajo consumo
  - Ejemplos
---

# Ejemplos de bajo consumo del SDK { #low-power-sdk-examples }

Los ejemplos de gestión de energía de SiFli-SDK sirven como referencia para las mediciones y la integración; no son especificaciones de corriente universales. Cada uno corresponde a una familia de chips, una placa, una ruta de alimentación, unos periféricos habilitados, una configuración de firmware y una carga de trabajo concretos. Use el ejemplo para reproducir un estado o escenario en el hardware de destino y, después, mida la corriente y la tensión de su propio producto en las mismas condiciones.

Esta página organiza los proyectos del [índice de ejemplos de PM de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) según la pregunta de ingeniería que resuelven. Para confirmar las placas compatibles, las conexiones de alimentación, los puentes, la configuración del SDK, los comandos y el comportamiento esperado, consulte la página oficial de cada ejemplo.

## Elija el ejemplo de gestión de energía adecuado { #start-with-the-right-power-example }

<div align="center"><em>Tabla: Ejemplos de PM de SiFli-SDK por tarea de ingeniería</em></div>

<div align="center" markdown>

| Objetivo de ingeniería | Comience con | Qué ayuda a establecer | Qué debe volver a comprobar en el producto |
|:-----------------|:-----------|:------------------------|:-------------------------|
| Verificar la entrada en estados básicos de gestión de energía y el comportamiento de reactivación | [Ejemplo PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | La configuración básica de gestión de energía del SDK y el flujo de suspensión y activación | Las fuentes reales de activación, las dependencias del reloj, los estados retenidos y las solicitudes de estado PM de cada controlador |
| Caracterizar la actividad de GPIO en bajo consumo | [Prueba de consumo de GPIO](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | El despertar periódico mediante temporizador, el acceso a GPIO y cómo se diferencian el consumo en suspensión, el del despertar y el de la actividad de E/S | Las resistencias externas de pull-up/pull-down, los periféricos apagados, la multiplexación de pines, las líneas de alimentación y las rutas de fuga no deseadas |
| Distinguir la carga de CPU activa del comportamiento durante el apagado | [Prueba de consumo del procesador](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | Las cargas de CPU basadas en benchmarks o bucles, el apagado y la activación por RTC o por pin | La frecuencia del núcleo, la carga de trabajo, la polaridad del pin de activación, el mapeo específico de la placa y la tensión de alimentación |
| Medir escenarios de Bluetooth | [Prueba de consumo de BLE: publicidad y conexión](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) o [Prueba de consumo de BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | La publicidad BLE, las conexiones y la actividad Bluetooth como escenarios medibles | Las condiciones de RF, la potencia de transmisión, los intervalos de publicidad y de conexión, el comportamiento del dispositivo par, la antena y los callbacks de la aplicación |
| Comparar las políticas de pantalla apagada y siempre activa en AMOLED | [Prueba de consumo de AMOLED](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | La actualización de pantalla, la suspensión con la pantalla apagada y el funcionamiento con pantalla siempre activa | El panel utilizado, el brillo, la política de actualización, las líneas de alimentación de la pantalla y el ciclo de trabajo previsto |
| Medir una ruta de pantalla JDI | [Prueba de consumo de JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | El comportamiento de bajo consumo propio de la configuración JDI documentada | La variante del panel, la región de actualización, la configuración del controlador, las líneas de alimentación y la frecuencia de actualización |
| Integrar una interfaz gráfica de bajo consumo | [Guía del ejemplo de bajo consumo GUI_PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | La interacción entre el comportamiento de la interfaz, el estado de la pantalla y la política de PM | El ciclo de vida de la pantalla del producto, las animaciones, las fuentes de activación táctil o del controlador y la estrategia de actualización de las zonas modificadas |
| Caracterizar la carga de actualización de la pantalla | [Ejemplo de consumo: escenario de actualización de pantalla](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | La contribución de las actualizaciones de pantalla a la carga de trabajo del producto | La resolución, el formato de píxel, la zona modificada, la velocidad de la interfaz, la estrategia de búfer y la frecuencia con que cambia el contenido |
| Diseñar una interacción para un dispositivo vestible activada por sensor | [Encender la pantalla al levantar la muñeca (Raise Wrist to Light Up Screen)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | La activación mediante el sensor, el trabajo con la pantalla encendida y el retorno a la suspensión | La selección del sensor, el algoritmo de detección del gesto, el intervalo de muestreo, el tiempo de espera de la pantalla, el modelo de batería y el uso diario medido |

</div>

### Compruebe el alcance por placa { #verify-the-board-scope }

Las listas siguientes distinguen las placas que cada guía oficial menciona expresamente de los destinos incluidos en la configuración GCC actual de SiFli-SDK. Que una placa figure en la matriz de compilación solo significa que el proyecto está configurado como destino de compilación; no implica que las cifras de consumo publicadas se hayan medido en ella. Los enlaces de configuración corresponden a la rama `main` actual; si se usa otra revisión del SDK, consulte el `build_config_gcc.yaml` de esa copia antes de elegir un destino `scons --board`. Para reproducir una medición, respete el montaje de hardware indicado en la guía. El nombre de una familia en la URL tampoco demuestra que todos sus chips o placas sean compatibles.

- **PM Example** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)): la guía enumera `sf32lb56-devkit-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8` y `sf32lb58-lcd_n16r64n4`. La entrada actual del proyecto en la configuración GCC usa `sf32lb56-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4` y `sf32lb52-core_n16r16`. El primer identificador difiere del `sf32lb56-devkit-lcd_n16r12n1` de la guía; compruebe la correspondencia de placas en lugar de asumir que los identificadores con nombres distintos son intercambiables.
- **GPIO Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)): tanto la guía como la configuración GCC actual enumeran `sf32lb52-core_n16r16`.
- **Processor Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)): la guía enumera `eh-lb551`, `eh-lb555`, `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` y `eh-lb523`. La configuración GCC actual asigna el conjunto `default_boards` al proyecto; sus identificadores actuales de destino aparecen en la [configuración](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml). Los nombres de placa de la guía y los destinos de `default_boards` no corresponden uno a uno: compruebe la correspondencia en la revisión del SDK que use y no la deduzca por el nombre. Que una placa figure como destino tampoco significa que la guía incluya mediciones de consumo para todas las placas del conjunto.
- **BLE Broadcast and Connection Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)): la guía enumera las placas `eh-lb551` y `eh-lb555`; los destinos GCC actuales son `eh-lb551_hcpu` y `eh-lb555_hcpu`.
- **BLE/BT Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)): la guía enumera `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` y `eh-lb523`. La configuración GCC actual usa el conjunto `bt_boards`; sus identificadores exactos de destino se indican en la [configuración](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml), y algunos incluyen el sufijo `_hcpu`. Una entrada separada del proyecto también incluye `sf32lb56-wlan-core_a128r12n1` y `sf32lb56-wlan-core_n16r12n1`. No intercambie los nombres de placa de la guía y los identificadores de destino sin confirmar su correspondencia.
- **AMOLED Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)): tanto la guía como la configuración GCC actual enumeran `sf32lb52-core_n16r16`.
- **JDI Power Consumption Test** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)): tanto la guía como la configuración GCC actual enumeran `sf32lb52-core_n16r16`.
- **GUI_PM Low-Power Example Guide** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)): tanto la guía como la configuración GCC actual enumeran `sf32lb52-lchspi-ulp`.
- **Power Consumption Test Example — Screen Refresh Scenario** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)): la guía da `sf32lb52-core_n16r16` como ejemplo de compilación. Este proyecto no aparece en la matriz GCC actual; esa omisión no elimina la guía publicada ni el ejemplo de código fuente.
- **Raise Wrist to Light Up Screen** ([código fuente del SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)): tanto la guía como la configuración GCC actual enumeran `sf32lb52-lchspi-ulp`.

## Mida en el límite eléctrico adecuado { #measure-at-the-right-electrical-boundary }

No compare una medición del producto con un ejemplo del SDK hasta que ambas mediciones usen el mismo límite eléctrico. Por ejemplo, los ejemplos de GPIO y de activación al levantar la muñeca documentan conexiones de alimentación y cambios de puentes específicos de cada placa para medir el bajo consumo. Una placa alimentada por USB, un depurador, un adaptador UART, un circuito de carga o un módulo de pantalla pueden alterar significativamente el resultado.

Para cada ejecución, registre:

1. El punto donde se aplica la alimentación y todas las líneas de alimentación activas.
2. La tensión de alimentación, el modo de muestreo y el rango del instrumento de medida de corriente.
3. Los dispositivos externos, las resistencias de pull, los cables y las interfaces de depuración que permanecen conectados.
4. La revisión del firmware, el nombre de la placa, la configuración de `menuconfig` y el ajuste de depuración de PM.
5. La transición de estado o la carga de trabajo exacta que representa cada tramo de la medición.

Mida la tensión junto con la corriente para registrar también la potencia y la energía. El artículo [Medición y validación del consumo energético](measurement-and-validation.md) describe cómo validar componentes, escenarios y el perfil diario.

## Pruebas iniciales de PM, GPIO y procesador { #baseline-pm-gpio-and-processor-tests }

Use el [Ejemplo PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) para comprobar que el modo de suspensión y las fuentes de activación previstos funcionan antes de añadir una carga de trabajo del producto. Registre el estado de PM solicitado y compruebe el estado al que realmente entra el sistema. Si el sistema no entra en el estado profundo solicitado, revise primero la configuración y quién gestiona las solicitudes de estado PM. No intente ajustar parámetros hasta resolver ese problema.

La **Prueba de consumo de GPIO** es un buen punto de partida cuando una interfaz aparentemente inactiva eleva la corriente en reposo. En el escenario documentado, el sistema se activa periódicamente para leer GPIO; así se puede separar la corriente de suspensión de la asociada al despertar y a la actividad de E/S. Para el producto, revise además las resistencias de pull internas y externas, los estados de alta impedancia, las conexiones entre dominios de alimentación, los pines conectados a periféricos apagados, los valores predeterminados tras un reinicio y las rutas de fuga por ESD o alimentación inversa. Incluso una señal con un nivel lógico válido puede provocar corriente de fuga.

La **Prueba de consumo del procesador** distingue varias situaciones fundamentalmente distintas: cálculo activo en la CPU, un bucle sencillo, apagado, activación por temporizador y activación por pin. Sirve para caracterizar el coste del cálculo y el comportamiento de reactivación, pero no predice el consumo de una aplicación. Antes de incorporar sus mediciones al presupuesto energético, sustituya el benchmark o el bucle por una carga de firmware representativa del producto.

## Escenarios de Bluetooth y pantalla { #bluetooth-and-display-scenarios }

Use los proyectos [Publicidad y conexión BLE](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) y [Prueba de consumo BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) para establecer escenarios de radio repetibles antes de optimizar los parámetros de conexión de la aplicación. Mida después el producto final con sus propios parámetros de publicidad y conexión, dispositivo par, entorno de RF, antena y callbacks. Si la aplicación despierta la CPU principal en cada evento de radio, puede anular un buen resultado medido a nivel de enlace.

Los proyectos orientados a pantalla aíslan un conjunto diferente de decisiones:

- **Prueba de consumo de AMOLED** compara la suspensión con la pantalla apagada y la política de pantalla siempre activa. Los cambios de modo y las estimaciones de autonomía del ejemplo corresponden a la placa, el panel, el brillo, la frecuencia de actualización y el modelo de uso documentados; no deben generalizarse a todos los productos AMOLED.
- [Prueba de consumo de JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) proporciona una referencia específica de la plataforma para una ruta de pantalla JDI.
- [Guía del ejemplo de bajo consumo GUI_PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) relaciona las decisiones sobre el ciclo de vida de la interfaz con el comportamiento de PM.
- [Escenario de actualización de pantalla](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) se centra en la carga que genera la actualización de la pantalla.

En conjunto, estos ejemplos ayudan a responder una pregunta de diseño: ¿qué eventos requieren realmente actualizar los píxeles y qué parte del panel debe refrescarse? Consulte el [resumen de gráficos](../graphics/overview.md) y el [controlador de pantalla](../graphics/display-controller.md) para definir a partir de ello una estrategia de búfer y de actualización parcial.

## Activar la pantalla al levantar la muñeca: un escenario completo { #raise-to-wake-as-a-complete-scenario }

El proyecto **Encender la pantalla al levantar la muñeca** resulta especialmente útil porque combina el muestreo del sensor, el reconocimiento del gesto, la activación de la pantalla, un periodo de interacción limitado y el retorno a la suspensión. Representa un escenario completo del producto, no un estado aislado.

La estimación de autonomía del ejemplo original depende de la capacidad de batería, el número de activaciones, el tiempo con la pantalla encendida, el sensor, el intervalo de muestreo, la placa y las corrientes medidas que allí se documentan. Al adaptar el método, conserve su estructura: mida el consumo con la pantalla encendida y apagada, indique cuántos eventos ocurren al día y calcule la energía diaria total. Después, sustituya las cifras del ejemplo por las de su propio producto.

Para ver un ejemplo completo del ciclo entre el modelo y las mediciones, consulte el [análisis del consumo energético de un reloj inteligente](smartwatch-power-profiling.md).

## Adapte un ejemplo de PM para obtener evidencia del producto { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>Tabla: Comprobaciones para adaptar ejemplos de PM al producto</em></div>

<div align="center" markdown>

| Paso | Evidencia a conservar | Por qué importa |
|:-----|:-----------------|:---------------|
| Establecer la referencia inicial | Placa, conexión de alimentación, puentes, revisión del SDK, configuración y comportamiento esperado | Distingue el comportamiento del ejemplo original de los cambios posteriores del producto |
| Identificar un único escenario | Estado PM, componentes activos, fuente de activación, duración y condición final | Impide registrar una corriente media sin significado técnico |
| Medir corriente y tensión | Marcadores en la traza, corriente, tensión, potencia y energía | Permite comparar resultados entre líneas de alimentación y revisiones del firmware |
| Incorporar el hardware del producto | Componentes externos, estados de los pines, líneas de alimentación y sensores actualizados | Revela fugas y consumos periféricos que no existen en la placa de desarrollo |
| Contrastar el modelo energético | Frecuencia y duración de cada escenario, además de su energía medida | Permite ajustar la estimación diaria de consumo para que se aproxime al comportamiento medido del producto |

</div>

## Recursos relacionados { #related-resources }

- [Resumen del diseño de bajo consumo](overview.md) para la responsabilidad sobre PM, los modos de energía, el diseño del sistema y los conceptos de análisis del consumo.
- [Medición y validación del consumo energético](measurement-and-validation.md) para validar componentes, escenarios y el perfil del producto.
- [Análisis del consumo energético de un reloj inteligente](smartwatch-power-profiling.md) para consultar un modelo detallado de uso diario.
- [Ejemplos](../../develop/examples/index.md) para consultar el catálogo de ejemplos del SDK de distintos ámbitos.
- [Índice de ejemplos de PM de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) para ver los proyectos oficiales y sus instrucciones de configuración actualizadas.
