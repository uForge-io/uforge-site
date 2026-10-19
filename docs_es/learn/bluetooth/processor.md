---
icon: lucide/radio-tower
description: "Cómo el procesador Bluetooth dedicado de SF32 evita que la CPU de aplicaciones tenga que encargarse de la temporización de radio y del control del enlace, lo que permite crear productos conectados de bajo consumo."
tags:
  - Bluetooth
---
# Procesador Bluetooth { #bluetooth-processor }

## Introducción { #introduction }

El **procesador Bluetooth** es el subsistema dedicado al control inalámbrico de los dispositivos SF32LB. Se encarga de las funciones Bluetooth sujetas a estrictos requisitos de temporización, como la planificación de radio, el control del enlace, el mantenimiento de conexiones en modo de bajo consumo y la coordinación con el procesador de aplicaciones principal.

Esta arquitectura resulta útil en productos conectados alimentados por batería. En lugar de activar la CPU de aplicaciones para cada evento inalámbrico, los dispositivos SF32 usan una arquitectura multinúcleo heterogénea: el procesador de aplicaciones gestiona la lógica del producto y las funciones orientadas al usuario, mientras que un procesador Bluetooth de bajo consumo o un procesador siempre activo mantiene el enlace inalámbrico.

El alcance de las tareas de aplicación que puede ejecutar el procesador de bajo consumo varía entre familias. Consulte la comparación siguiente y confirme en el SDK la asignación de tareas de la referencia concreta.

Consulte esta página para saber dónde se ejecutan las tareas de temporización de Bluetooth y el firmware del controlador, si la familia elegida permite programar el núcleo de bajo consumo y cómo mantener en reposo la CPU de aplicación sin interrumpir la conexión. Para diseñar servicios e integrar Bluetooth en el producto, consulte el [Resumen de Bluetooth](overview.md).

## Por qué importa un procesador Bluetooth dedicado { #why-a-dedicated-bluetooth-processor-matters }

Bluetooth no es solo un protocolo de software que se ejecuta ocasionalmente en segundo plano. Un dispositivo conectado debe cumplir requisitos estrictos de temporización de radio para los anuncios (advertising), el escaneo, los eventos de conexión, el intercambio de paquetes, el transporte de audio, el cifrado y la coexistencia con otras actividades del sistema.

Al separar esas funciones inalámbricas sensibles a la temporización de la carga de trabajo principal de la aplicación, un subsistema Bluetooth dedicado ofrece varias ventajas prácticas:

- Menor consumo medio durante la espera conectada.
- Temporización de radio más fiable cuando la interfaz de usuario, los gráficos, el audio o la IA someten el sistema a una carga elevada.
- El controlador puede atender eventos de radio sin activar la CPU de aplicación en cada evento.
- Una separación más clara entre el firmware de aplicación y el firmware de control de protocolo.
- Mayor capacidad para mantener conectados los productos mientras la CPU principal está en reposo.

En productos vestibles y portátiles, esta separación resulta especialmente útil. El dispositivo puede permanecer conectado en un estado de bajo consumo la mayor parte del tiempo y activarse solo ante una interacción del usuario, un evento de sensor, una actualización de pantalla, actividad de audio o una sincronización con el teléfono.

Son posibilidades de diseño, no cifras garantizadas de consumo o reactivación. La ubicación del host, las interrupciones, la puesta en marcha del reloj, la política de reposo y el tráfico de la aplicación determinan el resultado medido. Mida la corriente y el tiempo de respuesta con el firmware y la carga previstos.

## Posición en el sistema SF32 { #position-in-the-sf32-system }

Una arquitectura inalámbrica simplificada de SF32 se representa así:

<div align="center"><em>Figura: Arquitectura inalámbrica simplificada de SF32</em></div>

```text
Procesador de aplicación
  - firmware de producto
  - interfaz de usuario y gráficos
  - lógica de aplicación de audio
  - servicios de usuario
        │
        ▼
Host Bluetooth / servicios del sistema
        │
        ▼
Procesador Bluetooth / firmware del controlador
  - temporización de capa de enlace
  - planificación de radio
  - eventos de conexión de bajo consumo
  - procesamiento de protocolo en el controlador
        │
        ▼
Radio Bluetooth y etapa frontal de RF
```

La división exacta entre el firmware del host, el controlador y la aplicación depende del SDK, de la configuración de la pila y de los requisitos del producto. En cualquier caso, el procesador de aplicaciones no debe tratarse como la única CPU que participa en el funcionamiento de Bluetooth: el subsistema Bluetooth tiene su propio contexto de ejecución y está diseñado para ofrecer un comportamiento inalámbrico determinista y eficiente en consumo.

## Diferencias entre familias de dispositivos { #device-family-differences }

La familia SF32LB ofrece distintas configuraciones de procesador de bajo consumo según la clase de dispositivo. Consulte siempre la hoja de datos y la documentación del SDK de la referencia concreta.

<div align="center"><em>Tabla: Diferencias entre familias de dispositivos</em></div>

<div align="center" markdown>

| Familia de dispositivos | Capacidad Bluetooth | Función del procesador de bajo consumo | Aplicaciones habituales |
|:--------------|:---------------------|:-------------------------|:--------------------|
| **SF32LB52x** | Bluetooth de modo dual, Bluetooth clásico + BLE | La LCPU ejecuta la pila Bluetooth; no está disponible para el código de aplicación | Módulos Bluetooth de coste ajustado, accesorios de audio, dispositivos vestibles de gama básica e interfaces HMI compactas. |
| **SF32LB55x** | BLE | La LCPU puede ejecutar tareas de aplicación admitidas por el SDK | Dispositivos vestibles BLE y productos de bajo consumo con numerosos sensores. |
| **SF32LB56x** | Bluetooth de modo dual, Bluetooth clásico + BLE | La LCPU puede ejecutar tareas de aplicación admitidas por el SDK | Productos con pantallas más avanzadas, HMI conectadas y dispositivos vestibles. |
| **SF32LB57x** | Bluetooth de modo dual, Bluetooth clásico + BLE | La LCPU gestiona Bluetooth y otras tareas sujetas a restricciones de consumo energético; confirme cuáles admite el SDK | Productos que distribuyen gráficos y audio local entre HCPU y ACPU. |
| **SF32LB58x** | Bluetooth de modo dual, Bluetooth clásico + BLE | La LCPU puede ejecutar tareas de aplicación admitidas por el SDK | Productos de gama alta con gráficos, audio, IA y requisitos complejos de conectividad. |

</div>

La [guía HAL de SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/index.html) de SiFli indica que la LCPU ejecuta la pila de protocolo Bluetooth y no está disponible para las aplicaciones. Las guías HAL de [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/index.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/index.html) y [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/hal/index.html) describen cómo ejecutar en la LCPU tareas de bajo consumo, como BLE y el procesamiento de sensores. Para **SF32LB57x**, la [guía ACPU del SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifica una arquitectura HCPU/ACPU/LCPU y asigna a la LCPU tareas como BLE y el procesamiento de sensores, pero no especifica si admite otras tareas de usuario ni en qué medida. No extrapole la programabilidad de la LCPU de una familia a otra. Para la referencia concreta, compruebe la configuración de núcleos en la hoja de datos y confirme que la versión del SDK y la configuración de la placa elegidas permiten ejecutar la tarea de aplicación prevista en la LCPU. Si esa combinación no está documentada, marque la asignación como no verificada; antes de adoptarla, compruebe también la memoria disponible y los límites de planificación.

La misma guía ACPU diferencia las funciones de los núcleos de aplicación: SF32LB57x usa ACPU para procesar audio y gráficos, mientras que SF32LB58x lo destina al procesamiento DSP de audio. Estas tareas son distintas de las funciones del controlador Bluetooth; confirme la asignación disponible para la placa y el SDK elegidos.

Las capacidades Bluetooth de la tabla resumen documentación de cada familia; no garantizan que todos los perfiles estén disponibles en cada referencia o compilación del SDK. Las hojas de datos de SiFli para [SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/DS0001-SF32LB55x-Datasheet%20V1p6.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) y [SF32LB58x](https://downloads.sifli.com/silicon/DS0058-SF32LB58x-Datasheet%20V1p6.pdf) especifican las capacidades BLE o de modo dual indicadas. La [guía de pruebas de señalización Bluetooth del SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/bt_signaling_test_guide.html) cubre pruebas BR/EDR y BLE e incluye SF32LB57x. Confirme la compatibilidad de perfiles, funciones y configuraciones para la referencia y la versión del SDK concretas.

### Programabilidad de la aplicación y firmware del controlador { #controller-firmware-programmability }

Que la LCPU admita tareas de aplicación no implica que se pueda acceder al código fuente del controlador Bluetooth o sustituir la pila de radio. Las actualizaciones de firmware, los mecanismos de parche, la memoria disponible y las restricciones de planificación dependen del dispositivo y del SDK.

- **Desarrollo de aplicaciones de bajo consumo.** Traslade a la LCPU la adquisición de sensores, el procesamiento ligero y la gestión del sistema cuando la configuración lo permita. Presupueste la memoria de la pila, el tiempo de ejecución y la comunicación con HCPU.
- **Mantenimiento y personalización del controlador.** Use las actualizaciones y los mecanismos de parche del fabricante para el dispositivo y SDK elegidos. Que el núcleo de aplicación sea programable no demuestra que se disponga del código fuente propietario del controlador o de una pila de radio alternativa. Confirme esas posibilidades por separado con SiFli.

Una configuración dedicada al controlador también puede recibir actualizaciones del fabricante; su imagen no es necesariamente inmutable. Valide los cambios respecto a la cualificación Bluetooth, la interoperabilidad, la compatibilidad entre host y controlador y la recuperación tras fallos de OTA. Distinga la reversión para recuperar el equipo de la política de seguridad que impide instalar versiones antiguas vulnerables.

## BLE y Bluetooth de modo dual { #ble-and-dual-mode-bluetooth }

Según el modelo de la familia, los dispositivos SF32 pueden admitir solo **Bluetooth de baja energía (BLE)** o **Bluetooth de modo dual**, que combina **Bluetooth clásico** y **BLE**.

### Bluetooth de baja energía { #bluetooth-low-energy }

BLE está optimizado para el intercambio de datos de bajo consumo. Se usa comúnmente para:

- Pulseras de fitness y relojes inteligentes.
- Sensores de salud y dispositivos vestibles.
- Notificaciones de teléfono y aplicaciones complementarias.
- Sincronización de sensores.
- Balizas y dispositivos de localización.
- Canales de control y configuración de bajo consumo.

Las conexiones BLE suelen ser intermitentes y se activan por eventos, por lo que resultan adecuadas para un procesador Bluetooth de bajo consumo.

### Bluetooth clásico y diseños de modo dual { #bluetooth-classic-and-dual-mode-designs }

El Bluetooth de modo dual añade compatibilidad con los casos de uso del Bluetooth clásico, además de BLE. Resulta útil en productos como:

- Accesorios de audio Bluetooth.
- Adaptadores y módulos inalámbricos.
- Dispositivos que deben ser compatibles con perfiles existentes de Bluetooth clásico.
- Productos que combinan el control por BLE con audio o intercambio de datos por Bluetooth clásico.

El modo dual puede exigir más que una implementación solo BLE, ya que el audio y los perfiles heredados pueden imponer requisitos más exigentes de tasa de transferencia, latencia o coexistencia. Un subsistema Bluetooth dedicado ayuda a aislar esas exigencias de los picos de carga de la CPU principal.

## Audio Bluetooth y LE Audio { #bluetooth-audio-and-le-audio }

Los productos de audio Bluetooth imponen requisitos adicionales a la arquitectura del sistema. Pueden necesitar gestionar a la vez la temporización de radio, los búferes, el procesamiento del códec, la sincronización del reloj y las actualizaciones de la interfaz de usuario.

En un sistema de audio Bluetooth bien diseñado para SF32, las responsabilidades suelen repartirse así:

- El procesador Bluetooth gestiona la radio y la temporización del enlace en el controlador.
- El procesador de aplicaciones se ocupa de la lógica del producto, la interfaz de usuario y las funciones de audio de nivel superior.
- Las interfaces de audio, como I2S, PDM, ADC y DAC, transportan las muestras hacia y desde el resto del sistema.
- El DMA y los búferes reducen la carga de la CPU durante la transmisión continua de audio.

En LE Audio y otros usos modernos del audio Bluetooth, el resultado también depende de la arquitectura del firmware, de las funciones que admita la pila, del códec elegido, del ancho de banda de memoria y de la estrategia de gestión energética. Las hojas de datos de SiFli para SF32LB56x y SF32LB58x indican explícitamente compatibilidad con BLE Audio; admitir BLE o Bluetooth de modo dual no implica por sí solo admitir LE Audio. La disponibilidad de perfiles, códecs y rutas de implementación en el SDK depende de la referencia y la versión concretas, así que hay que verificarla antes de adoptar LE Audio. El procesador Bluetooth aporta la base de temporización, pero el comportamiento final depende del SDK y del diseño de la aplicación.

## Funcionamiento de bajo consumo { #low-power-operation }

El subsistema Bluetooth resulta especialmente útil cuando el procesador de aplicaciones puede permanecer en reposo mientras el enlace inalámbrico sigue activo. Durante la espera conectada, quizá solo sea necesario reactivar ese procesador ante eventos importantes, como:

- Una notificación o comando recibido.
- Un cambio de estado de conexión.
- Una tarea de sincronización programada.
- Inicio o detención de un flujo de audio.
- Un evento de sensor o entrada de usuario.
- Una actualización de firmware u operación de aprovisionamiento.

Este modelo mantiene la CPU principal fuera del estado activo el mayor tiempo posible. El procesador Bluetooth y la radio se activan para atender los eventos de conexión programados y, una vez completadas las tareas de protocolo necesarias, permiten que el sistema vuelva a un estado de menor consumo.

El consumo real depende del intervalo de conexión, la potencia de transmisión, el comportamiento de los anuncios (advertising), el modo de suspensión, la configuración del cristal, el diseño de RF, la política del firmware y la frecuencia con que se activa el procesador de aplicaciones.

## Límites entre host, controlador y aplicación { #host-controller-and-application-boundaries }

El software Bluetooth a menudo se describe en dos capas principales:

<div align="center"><em>Tabla: Límites entre el host, el controlador y la aplicación</em></div>

<div align="center" markdown>

| Capa | Responsabilidad principal |
|:------|:--------------------|
| **Host** | Perfiles, servicios, políticas de emparejamiento, API para la aplicación y funciones de protocolo de nivel superior. |
| **Controlador** | Capa de enlace, planificación de radio, temporización de paquetes, cifrado y procedimientos Bluetooth de bajo nivel. |

</div>

En un sistema SF32, las funciones del controlador están estrechamente ligadas al procesador Bluetooth y al subsistema de radio. Las funciones del host pueden ejecutarse en el procesador de aplicación, en el firmware del sistema o mediante componentes del SDK, según la arquitectura de la pila.

Para quien desarrolla aplicaciones, lo importante es que Bluetooth abarca más de una CPU. La memoria compartida, la comunicación entre procesadores, los eventos y las API del SDK forman parte de la arquitectura del producto. Trate Bluetooth como un subsistema, no como una simple biblioteca vinculada a la aplicación principal.

## Interacción con el procesador de aplicaciones { #interaction-with-the-application-processor }

El procesador de aplicaciones suele controlar el comportamiento del producto:

- Iniciar y detener los anuncios (advertising).
- Crear o aceptar conexiones.
- Gestionar servicios y características GATT.
- Gestionar el emparejamiento, la vinculación y las políticas de seguridad.
- Intercambiar datos de la aplicación con un teléfono o una pasarela.
- Actualizar el estado de la interfaz de usuario cuando cambia el estado de Bluetooth.
- Coordinar los flujos de audio, los sensores y los modos de alimentación.

El procesador Bluetooth se ocupa de las funciones de bajo nivel necesarias para mantener la conexión. La comunicación entre ambos suele quedar abstraída mediante las API del SDK, eventos, colas o mecanismos de comunicación entre procesadores.

Un buen diseño de la aplicación evita activar la CPU principal para tareas innecesarias. Agrupe eventos cuando sea posible, elija parámetros de conexión adecuados y evite el sondeo (polling) de la aplicación a alta frecuencia si dispone de funciones de retorno basadas en eventos (callbacks).

## Consideraciones de RF y reloj { #rf-and-clock-considerations }

El procesador Bluetooth no garantiza por sí solo un buen rendimiento inalámbrico: también importa el hardware que lo rodea. El diseño de RF, la adaptación de la antena, la precisión del reloj, la integridad de la alimentación y la calibración en producción afectan el alcance, la sensibilidad, la potencia de transmisión y la estabilidad de la conexión.

Las consideraciones de hardware importantes incluyen:

- Use la red de adaptación de RF y el diseño de antena recomendados.
- Mantenga la pista de RF corta, con impedancia controlada y bien aislada de señales ruidosas.
- Siga los requisitos de cristal en la guía de diseño de hardware.
- Proporcione líneas de alimentación limpias y desacoplamiento local para los circuitos de RF y de reloj.
- Mantenga accesibles los puntos de prueba necesarios para la calibración de RF y la carga del firmware durante la producción.
- Evite enrutar señales rápidas de pantalla, almacenamiento o fuentes conmutadas cerca de las rutas de RF sensibles.

Los equipos de software y hardware deben tratar el rendimiento de Bluetooth como una propiedad del sistema. Los parámetros del firmware no pueden compensar por completo un diseño de RF deficiente ni relojes inestables.

## Coexistencia con otras tareas { #coexistence-with-other-workloads }

Los dispositivos SF32 suelen ejecutar Bluetooth junto con gráficos, audio, sensores, almacenamiento y, en algunos casos, Wi-Fi externo. Estos subsistemas comparten alimentación, relojes, ancho de banda de memoria, pines y recursos de CPU.

Al ejecutar estas tareas a la vez, revise especialmente lo siguiente:

- El refresco de pantalla y el tráfico de PSRAM pueden reducir el ancho de banda de memoria disponible.
- El DMA de audio y los búferes de audio Bluetooth necesitan una temporización estable.
- Las interrupciones de los sensores pueden despertar el procesador de aplicaciones con demasiada frecuencia.
- El Wi-Fi externo u otras fuentes de RF pueden afectar al rendimiento de Bluetooth.
- Las secciones críticas largas o la desactivación de interrupciones pueden retrasar el procesamiento de Bluetooth en el host.

El procesador Bluetooth reduce el riesgo de incumplir los plazos de temporización, pero no elimina todos los cuellos de botella de los recursos compartidos. Los productos con audio, una interfaz de usuario avanzada o conectividad inalámbrica externa deben probarse con cargas realistas y en condiciones desfavorables.

## Casos de uso típicos { #typical-use-cases }

El procesador Bluetooth ocupa un lugar central en muchas categorías de productos SF32:

- Módulos Bluetooth y adaptadores en serie.
- Relojes inteligentes y pulseras de actividad de gama básica.
- Sensores de salud BLE y dispositivos vestibles.
- Accesorios de audio Bluetooth.
- Insignias inteligentes y etiquetas electrónicas de estante.
- Paneles conectados al teléfono y dispositivos HMI.
- Controles de hogar inteligente y productos que se integran con una aplicación complementaria.
- Dispositivos de sincronización de sensores y registro de datos.

El dispositivo SF32 más adecuado depende de si el producto necesita solo BLE o Bluetooth de modo dual, así como de sus requisitos de audio, pantalla, memoria y procesamiento de bajo consumo programable por el usuario.

## Guía práctica de diseño { #practical-design-guidance }

Al diseñar firmware Bluetooth para SF32, comience por definir los requisitos de conectividad del producto:

- ¿El producto necesita solo BLE o Bluetooth de modo dual?
- ¿Se requiere audio Bluetooth?
- ¿Qué intervalo de conexión, latencia y tasa de transferencia se necesitan?
- ¿Con qué frecuencia debe activarse el procesador de aplicaciones principal?
- ¿Qué eventos deben reactivar el sistema desde Deep Sleep (suspensión profunda) o Standby (reposo)?
- ¿Las tareas de sensor o interfaz de usuario compiten con la temporización de Bluetooth?
- ¿Qué objetivos de alcance de RF y potencia de transmisión se requieren?
- ¿Cómo se grabará el firmware en los equipos y se calibrará la RF durante la producción?

Un diseño robusto suele combinar el procesador Bluetooth con parámetros de conexión bien elegidos, código de aplicación basado en eventos, una gestión planificada de los estados de bajo consumo y un diseño de RF adecuado.

## Conclusiones clave { #key-takeaways }

- Los dispositivos SF32LB usan un subsistema dedicado de procesamiento Bluetooth o de bajo consumo para mantener una temporización inalámbrica fiable y reducir el consumo.
- SF32LB52x dedica la LCPU al controlador Bluetooth. SF32LB55x, SF32LB56x y SF32LB58x admiten en la LCPU tareas de aplicación definidas por el SDK en configuraciones documentadas. SF32LB57x usa la LCPU para Bluetooth y tareas sensibles al consumo, pero verifique en el SDK y la placa de destino que se admite cada tarea de usuario prevista.
- Una LCPU programable admite tareas de aplicación dentro de los límites del SDK; el acceso al código del controlador y su personalización deben confirmarse por separado. Use actualizaciones del fabricante y valide los cambios.
- BLE está optimizado para productos conectados de bajo consumo; el Bluetooth de modo dual añade casos de uso del Bluetooth clásico, como el audio y la compatibilidad con perfiles heredados.
- El procesador Bluetooth permite que la CPU de aplicaciones principal permanezca en reposo mientras continúan las conexiones, los anuncios (advertising) y los eventos de radio programados.
- El rendimiento de Bluetooth depende tanto de la arquitectura del firmware como del hardware: diseño de RF, relojes, alimentación, adaptación de la antena y calibración.
- Trate Bluetooth como un subsistema con límites entre host y controlador, comunicación entre procesadores, decisiones de gestión energética y recursos compartidos.
