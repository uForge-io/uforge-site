---
icon: lucide/workflow
description: "PTM (Parallel Task Machine), documentado para SF32LB57x: un motor programable que ejecuta tareas de periféricos con temporización precisa y protocolos personalizados, y puede reducir la intervención del Cortex-M33."
tags:
    - Arquitectura
    - PTM
    - SF32LB57
---

# PTM (Parallel Task Machine) { #ptm-parallel-task-machine }

## Introducción { #introduction }

**PTM**, sigla de **Parallel Task Machine**, es un bloque de hardware documentado para SF32LB57x. Es un motor programable para tareas que requieren más precisión temporal de la que ofrece un bucle de firmware convencional, no encajan en los periféricos de función fija y no justifican mantener ocupado al Cortex-M33 principal.

En un producto, el firmware puede delegar en PTM operaciones de periféricos con comportamiento determinista: secuencias de E/S con temporización precisa, protocolos personalizados, adquisición de datos de sensores, generación de formas de onda similares a PWM, respuesta rápida a eventos y operaciones sencillas sobre registros o memoria activadas por señales externas.

El reparto de funciones es sencillo: la CPU configura y supervisa la tarea; PTM ejecuta la parte repetitiva y sensible a la temporización, con acceso a E/S, FIFO/DMA, eventos y al bus AHB. Por eso, PTM no es solo un generador de formas de onda GPIO, sino un motor programable que automatiza tareas de periféricos.

Esta página le resultará útil cuando un periférico estándar no permita implementar la temporización o el protocolo requerido y recurrir al sondeo en la CPU principal implique más latencia, consumo energético o complejidad de firmware. Está dirigida a quienes diseñan la interacción entre hardware y firmware, no a quienes solo necesitan usar GPIO o temporizadores de forma habitual.

## Por qué se necesita PTM { #why-ptm-exists }

En un microcontrolador, las necesidades de temporización de los periféricos no siempre encajan con el procesamiento de la aplicación. Aunque la CPU principal tenga rendimiento suficiente para el producto, algunas tareas de bajo nivel pueden complicar innecesariamente el firmware:

- secuencias de E/S bit a bit o con requisitos estrictos por ciclo;
- protocolos serie personalizados que no se adaptan bien a UART, SPI, I2C o CAN;
- sondeo o muestreo de sensores que requiere responder rápidamente a un disparador;
- patrones de control similares a PWM que exceden los modos de salida habituales de un temporizador;
- transferencias breves de datos o control de registros vinculados a eventos de periféricos;
- coordinación entre varios periféricos sin despertar la CPU de la aplicación en cada paso.

Resolver estas tareas mediante interrupciones puede aumentar la latencia y la carga de servicio. Los bucles de espera activa consumen tiempo de CPU y energía; añadir lógica externa, por su parte, complica el diseño de la placa. PTM ofrece una alternativa intermedia: ejecutar tareas de periféricos compactas y deterministas bajo el control del firmware.

## PTM en la arquitectura SF32LB57x { #ptm-in-the-sf32lb57x-architecture }

PTM es un motor programable conectado a la infraestructura de E/S, eventos, FIFO/DMA y bus AHB del SoC SF32LB57x. Es una capacidad documentada para SF32LB57x; antes de dar por hecho que está disponible en otra familia SF32, consulte la documentación del dispositivo correspondiente.

<div align="center"><em>Figura: Flujo de ejecución de una tarea PTM</em></div>

```text
Aplicación / firmware
        │
        ▼
La CPU configura la tarea PTM
        │
        ▼
PTM ejecuta una secuencia determinista de tareas periféricas
        │
        ├── Lectura/escritura de E/S
        ├── Transferencia de datos mediante FIFO / DMA
        ├── Acceso a memoria o registros AHB
        ├── Espera de evento / retardo fijo
        └── Interrupción de CPU o notificación de evento interno
```

La clave es que PTM ejecuta secuencias compactas de instrucciones personalizadas y puede hacer más que controlar pines. Puede leer y escribir E/S, esperar eventos, usar rutas FIFO/DMA, acceder a memoria AHB y a registros de periféricos, y avisar a la CPU solo cuando se requiere una intervención del firmware de nivel superior.

Así, el sistema puede reservar los periféricos estándar para sus funciones habituales y usar PTM para implementar de forma determinista los requisitos de temporización específicos que surgen en diseños reales.

## Capacidades principales { #core-capabilities }

La guía de diseño de hardware SF32LB57x documenta **un bloque PTM con 16 canales**, y su tabla de multiplexación de pines enumera PTM1_CH0 a PTM1_CH15. Junto con las definiciones del SDK, las capacidades documentadas incluyen:

- recursos de ejecución PTM controlados de forma independiente;
- un conjunto de instrucciones personalizado y compacto;
- ejecución de instrucciones desde TCM interna o desde el bus del sistema;
- lectura y escritura de direcciones de bus;
- operaciones de datos;
- saltos condicionales y bucles;
- lecturas y escrituras de E/S;
- espera de un disparador;
- retardo fijo;
- control de temporización a nivel de ciclo cuando se ejecuta desde TCM de PTM;
- 16 canales de E/S en el bloque PTM;
- FIFO con interfaz DMA;
- acceso a bus AHB para operaciones de memoria y registros de periféricos;
- generación de interrupciones de CPU;
- eventos internos para enlazar flujos de tareas;
- controles del SDK para reiniciar, iniciar, pausar y depurar paso a paso recursos PTM indexados.

En conjunto, estas características convierten a PTM en un bloque de automatización de periféricos determinista, no solo en un secuenciador de pines.

**Configuración de recursos:** Las [definiciones de registros del SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/cmsis/sf32lb57x/ptm.h) incluyen grupos de control y registros con índices 0–7, y las [definiciones de instrucciones](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h) usan índices correspondientes para los recursos TCM. Las fuentes disponibles no establecen cómo se relacionan los índices del SDK con los núcleos físicos, así que no deduzca la cantidad de núcleos a partir de ese rango. Consulte la documentación del dispositivo y la implementación del SDK para confirmar qué recursos están disponibles.

## Modelo de ejecución { #execution-model }

PTM ejecuta instrucciones de formato propio. El conjunto es deliberadamente compacto, pero incluye las operaciones necesarias para crear secuencias de tareas para periféricos:

- **Flujo de control**: comprobación de condiciones, saltos, bucles, esperas y retardos.
- **Control de E/S**: lectura y escritura de canales de E/S asignados.
- **Operaciones con datos**: operaciones aritméticas y lógicas básicas.
- **Acceso al bus**: lectura y escritura de memoria y registros de periféricos a través del bus AHB.
- **Sincronización**: espera de disparadores, generación de interrupciones y coordinación mediante eventos internos.

Cuando una tarea se ejecuta desde la TCM de PTM, la temporización puede controlarse con precisión de ciclo. Esto es importante para protocolos personalizados y secuencias de E/S: la CPU no tiene que reaccionar a cada flanco, intervalo o fase breve del periférico.

Las tareas más adecuadas para PTM suelen ser pequeñas, explícitas y deterministas. Si la lógica pasa a ser de alto nivel, contiene muchos saltos condicionales o depende de decisiones propias de la aplicación, probablemente deba ejecutarse en la CPU.

## E/S, FIFO y DMA { #io-fifo-and-dma }

El bloque PTM de SF32LB57x dispone de 16 canales de E/S. Estos permiten controlar la temporización de interfaces personalizadas, supervisar varios pines o generar secuencias coordinadas con múltiples señales.

PTM también admite una FIFO con interfaz DMA. Esto es importante porque los protocolos personalizados no suelen limitarse a conmutar pines: a menudo deben transferir datos entre la memoria y la lógica de E/S sin que la CPU intervenga en cada byte o palabra.

En la práctica, PTM permite implementar tareas como:

- transferir datos mediante una interfaz personalizada;
- capturar o generar patrones de E/S repetitivos;
- coordinar las transferencias de datos con eventos de periféricos;
- almacenar temporalmente pequeñas transacciones de protocolo;
- permitir que el DMA alimente la tarea o recoja sus datos mientras la CPU queda fuera de la ruta crítica.

## Eventos e interrupciones { #events-interrupts-and-multicore-coordination }

PTM funciona de forma orientada a eventos. Puede esperar un evento o un retardo fijo, y los eventos internos pueden enlazar flujos de tareas. La documentación disponible no establece cuántos núcleos PTM físicos existen ni cómo se asignan los índices de recursos del SDK a dichos núcleos. Algunas rutas de eventos también pueden generar una interrupción para la CPU, de modo que el firmware solo se active o responda cuando la secuencia alcance un punto significativo.

Esta es la principal ventaja de PTM a nivel de sistema: se ocupa de la temporización de bajo nivel y notifica al firmware en puntos de control definidos. En vez de sondear continuamente o atender cada intervalo con una interrupción, la CPU configura la tarea, deja que PTM la ejecute y procesa el resultado cuando corresponde.

## Usos habituales de PTM { #typical-ptm-use-cases }

En un diseño con SF32LB57x, PTM resulta más útil cuando el comportamiento del periférico es demasiado específico para los bloques de función fija y exige más precisión temporal que los bucles de firmware convencionales.

Los casos de uso típicos incluyen:

- protocolos de interfaz personalizados;
- control PWM personalizado o generación de pulsos;
- adquisición automática de datos de sensores;
- flujos de respuesta rápida a disparadores;
- coordinación de varios módulos;
- operaciones de memoria o registros por lotes;
- pequeños bucles de control deterministas alrededor de dispositivos externos;
- cubrir desfases de temporización entre un sensor, una pantalla, un actuador o un circuito integrado auxiliar y el firmware principal de la aplicación.

### Límites de uso { #usage-boundaries }

PTM no debe sustituir a un periférico estándar que ya resuelva la tarea. UART, SPI, I2C, CAN, SDIO, I2S, PDM, temporizadores y DMA siguen siendo la primera opción para las funciones habituales. PTM aporta valor cuando el producto requiere algo que queda fuera de las capacidades de esos bloques.

## PTM y el consumo energético de la CPU { #ptm-and-cpu-power }

PTM puede reducir los despertares de la CPU para atender tareas periféricas breves y deterministas. La CPU configura la tarea, interviene menos mientras PTM la ejecuta y vuelve a actuar cuando se alcanza un punto que requiere atención del firmware.

Esto es especialmente relevante en productos portátiles y AIoT donde el sistema puede necesitar:

- vigilar un sensor o patrón de GPIO;
- recolectar ráfagas cortas de datos;
- atender un componente externo personalizado;
- mantener la temporización mientras el núcleo de aplicación no está totalmente activo;
- reducir la frecuencia de interrupciones durante el trabajo repetitivo de periféricos.

El ahorro energético concreto depende de la configuración de reloj, la política de activación, la ubicación del código y los datos en memoria, el estado de los periféricos y la arquitectura del firmware. Aun así, PTM puede ejecutar pequeñas tareas periféricas sin despertar la CPU en cada paso.

## PTM, PIO de RP2040 y PPI/DPPI de Nordic { #ptm-rp2040-pio-and-nordic-ppidppi }

PTM, RP2040 PIO y Nordic PPI/DPPI pueden reducir la participación de la CPU en trabajo sensible al tiempo, pero operan en capas arquitectónicas diferentes y no son intercambiables.

- **PTM** es un motor programable de tareas para periféricos. Ejecuta instrucciones y puede trabajar con E/S, eventos, FIFO/DMA y acceso a memoria y registros AHB.
- **PIO** es una máquina de estados de E/S programable. Ejecuta un pequeño programa de instrucciones enfocado en la temporización GPIO y en protocolos serie personalizados.
- **PPI/DPPI** son mecanismos programables de interconexión entre periféricos. Enrutan eventos hacia tareas ya implementadas por los periféricos; no ejecutan instrucciones ni procesan datos.

<div align="center"><em>Tabla: PTM, RP2040 PIO y Nordic PPI/DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Área | SF32LB57x PTM | RP2040 PIO | Nordic PPI/DPPI |
|:-----|:--------------|:-----------|:-----------|
| Idea central | Motor programable de tareas para E/S determinista, protocolos personalizados, adquisición de datos de sensores y tareas de periféricos activadas por eventos. | Máquinas de estados de E/S programables para GPIO determinista y protocolos serie personalizados. | Interconexión de hardware entre eventos y tareas de periféricos, que permite coordinarlos sin la CPU cuando existen las conexiones necesarias. |
| Unidad de ejecución | Recursos de ejecución PTM indexados; confirme su disponibilidad en el dispositivo elegido. | Dos bloques PIO, cada uno con cuatro máquinas de estados: ocho en total. | Canales de eventos que propagan disparadores; no ejecutan programas. |
| Modelo subyacente | PTM ejecuta instrucciones de tarea personalizadas. | Las máquinas de estados ejecutan instrucciones PIO ciclo a ciclo. | PPI conecta los extremos de evento y tarea; DPPI usa periféricos publicadores y suscriptores en un canal compartido. |
| Modelo de temporización | Control con precisión de ciclo al ejecutar desde la TCM de PTM; admite esperas y retardos fijos. | Ejecución de máquinas de estados con precisión de ciclo, intervalos de retardo e instrucciones de espera. | Un evento activa una tarea existente del periférico; la temporización depende de los periféricos conectados y de la implementación de la interconexión. |
| Modelo de E/S | El bloque PTM de SF32LB57x dispone de 16 canales de E/S. | Las máquinas de estados dirigen instrucciones a pines GPIO seleccionados mediante la configuración de control de pines. | No genera formas de onda GPIO directamente; puede activar tareas de periféricos como GPIOTE y temporizadores. |
| Instrucciones y lógica | Instrucciones propias para E/S, lectura/escritura en el bus, operaciones con datos, saltos condicionales, esperas y retardos. | Conjunto reducido de instrucciones para E/S de pines, desplazamientos, esperas, saltos, operaciones push/pull de FIFO, IRQ y movimientos de datos. | No ejecuta instrucciones ni operaciones con datos, ni admite bucles o ramificaciones. |
| Acceso a memoria/registros | Accede a memoria AHB y a registros de periféricos. | Se centra en GPIO, FIFO y registros de desplazamiento; normalmente la CPU o el DMA suministran los datos y la configuración. | No accede a memoria ni a registros generales de periféricos; conecta únicamente los extremos de evento y tarea disponibles. |
| FIFO/DMA | Soporte de FIFO con interfaz DMA. | FIFOs TX/RX con uso común de DMA. | La interconexión no tiene una ruta de datos propia; puede activar tareas en periféricos con DMA. |
| Interacción con la CPU | Puede generar interrupciones y enlazar flujos de tareas mediante eventos internos. | Utiliza indicadores IRQ, FIFO e interacción con la CPU o el DMA. | La CPU configura los canales; durante la ejecución, los periféricos pueden activar tareas mediante eventos de forma autónoma. |
| Casos de uso típicos | Protocolos de interfaz personalizados, PWM personalizado, adquisición automática de datos de sensores, operaciones de memoria/registros por lotes y coordinación de varios módulos. | Interfaces personalizadas tipo UART/SPI/I2S, formas de onda tipo WS2812, protocolos serie a nivel de pin y temporización GPIO precisa. | Eventos de RTC o temporizador que inician conversiones ADC, conteo u otras tareas estándar expuestas por los periféricos. |

</div>

### Cómo funciona cada mecanismo { #under-the-hood-model }

Las rutas de ejecución de estos mecanismos se muestran a continuación:

<div align="center"><em>Figura: Rutas de ejecución de PPI, DPPI, PIO y PTM</em></div>

```text
PPI:  Origen del evento ──> Canal PPI ──> Destino de la tarea

DPPI: Periférico publicador ──> Canal DPPI ──> Tarea del periférico suscriptor

PIO: CPU/DMA ──> Instrucciones de máquina de estados PIO ──> Temporización GPIO y FIFOs

PTM: Configuración de CPU ──> Instrucciones de tarea PTM ──> E/S + eventos + FIFO/DMA + acceso AHB
```

PPI y DPPI conectan eventos sin ejecutar instrucciones, pero solo conectan eventos y tareas ya existentes; no permiten definir lógica de protocolo nueva. PIO permite crear comportamientos de pines mediante máquinas de estados, aunque se centra principalmente en GPIO y FIFO. PTM abarca tareas más amplias: puede combinar temporización de E/S, esperas de eventos, transferencias de datos, acceso a registros y coordinación de tareas en una secuencia ejecutable.

PIO puede detenerse al esperar una condición o cuando una FIFO está llena o vacía; la temporización de las instrucciones no garantiza cuándo el DMA del sistema suministrará los datos. El enrutamiento de eventos también tiene una latencia dependiente de la implementación. Estas diferencias arquitectónicas no determinan qué solución consume menos energía en todos los casos. La transferencia DPPI entre dominios requiere puentes implementados en el dispositivo elegido; no está disponible en todos los sistemas DPPI.

### PPI y DPPI de Nordic { #nordic-ppi-and-dppi }

PPI es el mecanismo anterior de Nordic, presente en dispositivos como los de la familia nRF52. El software asigna a cada canal un punto de conexión de evento y otro de tarea. Un canal también puede incluir un punto de conexión adicional para una tarea (fork), pero el vínculo sigue definiéndose explícitamente entre los extremos.

DPPI es el mecanismo más reciente de Nordic. Un periférico publica un evento en un canal y uno o más periféricos suscriben sus tareas a ese canal. Este modelo desacopla publicadores y suscriptores y se adapta a las arquitecturas multidominio más recientes de Nordic. Si una señal debe cruzar dominios de alimentación, un puente PPI puede transportar los canales DPPI compatibles entre ellos.

<div align="center"><em>Tabla: Nordic PPI y DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Área | PPI | DPPI |
| :--- | :--- | :--- |
| Modelo de configuración | El software asigna un punto de conexión de evento y uno o más puntos de conexión de tarea a un canal. | Los publicadores de eventos de periféricos y los suscriptores de tareas seleccionan un canal común. |
| Estilo de conexión | Enrutamiento explícito de punto de conexión de evento a tarea. | Enrutamiento de publicación/suscripción. |
| Un evento, múltiples tareas | Use varios canales o un punto de conexión adicional de tarea (fork) en el canal. | Varias tareas suscriptoras pueden suscribirse al mismo canal publicado. |
| Contexto de plataforma típico | Dispositivos Nordic heredados compatibles con PPI, incluyendo muchos dispositivos nRF52. | Dispositivos Nordic más recientes que implementan el sistema de eventos distribuido. |
| Capacidad de ejecución | Sin ejecución de instrucciones ni procesamiento de datos. | Sin ejecución de instrucciones ni procesamiento de datos. |

</div>

### Uso como concentrador de sensores en relojes inteligentes { #smartwatch-sensor-hub-use-cases }

Para un concentrador de sensores convencional en un reloj inteligente, empiece con periféricos I2C/SPI estándar, DMA, temporizadores y mecanismos de activación de bajo consumo. Después, clasifique la necesidad:

- **Flujo de muestreo habitual:** Por ejemplo, cuando vence un RTC o temporizador, se inicia una tarea compatible de un periférico estándar y se notifica a la CPU al finalizar o al detectar un umbral. En dispositivos Nordic, este patrón de evento a tarea existente encaja con PPI en los modelos anteriores o con DPPI en los más recientes; no requiere un programa PIO ni PTM.
- **Protocolo eléctrico personalizado:** Si un sensor requiere una forma de onda, un ancho de palabra (número de bits) o una temporización no estándar que I2C/SPI no puedan ofrecer, PIO es más adecuado para implementar el protocolo directamente sobre los pines.
- **Secuencia personalizada del sensor:** Si una transacción debe esperar varios disparadores, controlar diversas señales de E/S, transferir pequeñas cantidades de datos, acceder a registros y coordinar varios pasos, PTM es más adecuado en SF32LB57x. Puede notificar a la CPU en puntos definidos.

Por tanto, PPI/DPPI, PIO y PTM no compiten para resolver el mismo problema. Operan en capas distintas: conexión de eventos, protocolos a nivel de pin y automatización de tareas de periféricos. En SF32LB57x, empiece por los periféricos estándar y recurra a PTM solo cuando estos no puedan cumplir los requisitos de temporización o de secuencia.

Referencias: [definiciones de instrucciones PTM de SiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h), [hoja de datos del RP2040](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), [especificación PPI de Nordic](https://docs.nordicsemi.com/r/bundle/ps_nrf52811/page/ppi.html) y [sistema de eventos DPPI de Nordic](https://docs.nordicsemi.com/r/bundle/ps_nrf54lv10a/page/ppi.html).

## Guía de diseño { #design-guidance }

**Límites de temporización y consumo:** Controlar las instrucciones por ciclos no garantiza una duración fija para toda la transacción. Los accesos AHB, la espera de finalización del DMA y los eventos externos pueden introducir retardos variables. Mantenga activos los relojes y dominios de alimentación necesarios para PTM, memoria y periféricos. Que la CPU no ejecute tareas no significa que PTM funcione en todos los modos de suspensión del SoC. Mida la energía total, incluidos los relojes que permanecen activos y el coste del despertar, y compárela con una implementación basada en periféricos estándar.

**Asignación de recursos:** En el SDK v2.5.1, el [controlador de pantalla DPI sin memoria de cuadro (RAMless)](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_lcdc_aux.c) para SF32LB57x utiliza el recurso que el SDK identifica como «PTM core 0», su TCM, el evento 0, la interrupción asociada y un canal DMA asignado. Este identificador del SDK no permite deducir la cantidad de núcleos PTM físicos. Es un ejemplo real de acceso al bus y coordinación del DMA, no una asignación que pueda reutilizarse libremente. No sobrescriba recursos de un controlador activo. Defina quién puede acceder a cada búfer entre CPU y DMA y realice el mantenimiento de caché cuando corresponda.

Confirme primero que el objetivo es un dispositivo SF32LB57x con PTM documentado para el diseño previsto. Luego considere PTM cuando un flujo de trabajo tenga varias de estas características:

- se repite con la frecuencia suficiente como para que atenderlo mediante la CPU consuma energía innecesaria o reduzca el margen de temporización;
- necesita temporización determinista alrededor de flancos de E/S o respuesta a disparadores;
- utiliza una interfaz personalizada que los periféricos estándar no permiten implementar adecuadamente;
- se beneficia del movimiento de datos asistido por FIFO/DMA;
- puede expresarse como una máquina de estados compacta o una secuencia de tareas;
- debe notificar al firmware solo en puntos de finalización o control bien definidos.

Evite PTM cuando:

- un periférico estándar ya implementa el protocolo limpiamente;
- la tarea es lógica de aplicación de alto nivel con muchos saltos condicionales;
- los requisitos de temporización son lo bastante flexibles como para que las interrupciones normales o las tareas de RTOS sean más sencillas;
- el equipo de software todavía no dispone del soporte del SDK, los ejemplos o las herramientas necesarios para el programa PTM.

Para diseñar con PTM, separe las tareas deterministas de las decisiones de la aplicación. Asigne a PTM la temporización, las transferencias breves de datos y la respuesta a eventos. Mantenga en el firmware las decisiones propias del producto, la gestión de errores, los búferes grandes y la lógica que administra estados complejos.

## Puntos clave { #key-takeaways }

- La guía de hardware de SF32LB57x documenta un bloque PTM con 16 canales; para otras familias, consulte la documentación de cada dispositivo.
- Confirme los recursos PTM implementados en el dispositivo y el SDK elegidos.
- Puede ejecutar instrucciones personalizadas compactas desde la TCM de PTM o el bus del sistema.
- Admite control de E/S, acceso al bus y a registros, operaciones con datos, esperas, retardos, FIFO/DMA, interrupciones y eventos internos.
- Es útil para implementar comportamientos deterministas y personalizados de periféricos, entre el hardware de función fija y el firmware convencional.
- PTM comparte algunos conceptos con PIO de RP2040, pero abarca una integración de sistema y una variedad de tareas más amplias.
- En diseños SF32LB57x, PTM puede ser un elemento diferenciador de la arquitectura si la documentación del dispositivo seleccionado confirma los recursos PTM necesarios. Resulta especialmente útil para integrar sensores, pantallas y actuadores personalizados, adaptar protocolos y automatizar periféricos con poca intervención de la CPU.
