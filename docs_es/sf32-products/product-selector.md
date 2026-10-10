---
icon: lucide/list-checks
description: "Preseleccione chips y módulos SF32 según las restricciones del producto y valide después la ruta de implementación en hardware compatible."
tags:
    - Hardware
    - Selección
hide:
    - toc
---

# Selector de productos SF32 { #sf32-product-selector }

Preseleccione chips y módulos SF32 antes de comprometerse con un esquemático. Defina primero las restricciones cuyo cambio posterior sería costoso —la arquitectura de alimentación, el encapsulado, la pantalla, el audio, la memoria, los GPIO, la conectividad y la ruta de validación de software— y compare después los candidatos restantes.

Use el selector interactivo como primer filtro. Solo incluye chips y módulos, que puede filtrar por nivel de integración, capacidad de PSRAM y GPIO, encapsulado, alimentación principal, interfaz de pantalla y resolución objetivo, número de interfaces SDIO, cantidad de interfaces de audio y funciones de hardware especializadas. Cada resultado enlaza con la introducción del producto correspondiente. Las placas de desarrollo son plataformas de validación independientes y no figuran en el selector.

## Selector de productos { #product-selector }

!!! info "Terminología y número de interfaces de audio"
    Consulte el [glosario](../about/glossary.md) para ver abreviaturas y definiciones de interfaces. Cada interfaz PDM puede conectar hasta dos micrófonos digitales; por tanto, el número de interfaces PDM no equivale al número de micrófonos. La cantidad de entradas de micrófono utilizables y su asignación de pines dependen del dispositivo; confírmelas en la documentación del componente exacto.

Los filtros se combinan: cada resultado debe cumplir todos los criterios activos. El nivel de integración, el encapsulado, la alimentación y la interfaz de pantalla son opciones únicas. Los valores de PSRAM y GPIO representan los requisitos de la aplicación, por lo que el componente candidato debe igualarlos o superarlos; cualquier referencia al «máximo necesario» alude a la demanda máxima de la aplicación, no a un límite superior del componente. La resolución objetivo, el número de interfaces SDIO y el número mínimo exigido para cada tipo de interfaz de audio también se aplican como umbrales mínimos. Las casillas añaden capacidades requeridas (Wi-Fi externo mediante SDIO, interfaz de cámara DCMI, acelerador de IA/ML, FreeIO o PTM). El filtro del número de interfaces SDIO es independiente de la casilla de Wi-Fi externo.

<div id="uf-product-selector"></div>

<noscript>
Esta herramienta necesita JavaScript para filtrar y mostrar la tabla de componentes. Si JavaScript está deshabilitado, consulte la [tabla comparativa de la familia SF32](family/SF32_family.md).
</noscript>

La tabla de resultados muestra los números de pieza y los encapsulados exactos, las capacidades de memoria, el número máximo de GPIO, la alimentación y la tensión de E/S, las capacidades de pantalla, el número de interfaces de audio (DAC/ADC/PDM/I2S), el número de interfaces/canales periféricos digitales (UART/I2C/SPI/CAN/GPADC), la velocidad USB y las funciones indicadas en el catálogo. Si un recuento o valor aparece como `n/a`, significa que el catálogo no lo documenta con ese nivel de detalle; no equivale a cero ni demuestra que el componente no admita la función. Un guion en una columna de funciones indica que esa capacidad no está marcada en el registro del catálogo; confírmela en la documentación del componente objetivo. Las interfaces de pantalla listadas sirven para preseleccionar y no constituyen un inventario completo de multiplexación de pines.

## Factores de selección { #selection-factors }

Use el selector para aplicar restricciones estrictas, no como un sistema de recomendación automática. Empiece por la restricción que obligaría a rediseñar la placa o el esquemático si se descubriera tarde; después, compare los candidatos viables con los demás factores.

### Nivel de integración { #integration-level }

Elija el nivel de integración antes de comparar especificaciones detalladas si ya están definidos el calendario, el alcance del trabajo de RF o quién diseñará la placa. Un chip ofrece el máximo control, pero también le hace responsable de todo el recorrido de alimentación, RF, relojes, diseño de la placa y preparación para producción. Un módulo reduce el trabajo de diseño e integración a nivel del módulo, aunque todavía tendrá que diseñar la placa portadora. Una placa de desarrollo permite comprobar rápidamente el firmware, los periféricos y los supuestos de diseño del sistema, pero no es necesariamente adecuada para producción.

### Suministro de alimentación y encapsulado { #power-supply-and-package }

Seleccione la alimentación y el encapsulado desde el principio. El selector distingue entre alimentación directa desde una batería Li-ion (raíl de 3,2–4,7 V), componentes con una opción documentada de alimentación de 3,3 V mediante regulación externa y componentes que admiten una tensión de alimentación principal tan baja como aproximadamente 1,8 V (algunas especificaciones fijan el límite inferior en 1,71 V). Estos filtros describen la alimentación principal, no la tensión de E/S de los GPIO. La tabla muestra la tensión de E/S por separado como nivel nominal, no como límites de funcionamiento garantizados; compruebe las especificaciones eléctricas del componente exacto. El encapsulado también es una decisión estructural: determina el área ocupada en la placa, la complejidad del fan-out, la ruta térmica y el presupuesto de pines utilizables. El filtro usa categorías generales; consulte en los resultados la designación exacta del encapsulado. Un encapsulado con un máximo de GPIO publicado mayor puede quedarse corto después de reservar pines para alimentación, relojes, depuración, pantalla, memoria y periféricos obligatorios.

### Margen de memoria y GPIO { #memory-and-gpio-headroom }

Use los filtros de PSRAM y GPIO como umbrales mínimos y, después, revise la organización de memoria y la asignación de pines de cada opción. La capacidad de PSRAM afecta a los búferes gráficos y de audio, los modelos de ML y el espacio de trabajo de la aplicación, pero la capacidad total por sí sola no garantiza que haya un bloque contiguo. Al calcular el margen de GPIO, incluya las pruebas de producción, la depuración, las interrupciones, los sensores futuros y las señales de control de la placa, no solo las interfaces del primer prototipo.

### Pantalla y gráficos { #display-and-graphics }

Filtre por la interfaz de pantalla que realmente requiere el panel y use la resolución objetivo como primera comprobación de capacidad. Los valores de ancho por alto son umbrales de píxeles totales; no comprueban la proporción ni la temporización exactas del panel. Los valores de resolución mostrados sirven como orientación para la preselección en el catálogo: no garantizan un modo de panel concreto ni representan necesariamente el máximo oficial de cada componente. Confirme el componente exacto y los requisitos del panel en la documentación de SiFli. El selector usa RGB, la denominación habitual en el diseño de placas, para la interfaz paralela de pantalla; su nombre formal es DPI (Display Pixel Interface). La lista de interfaces no es un inventario completo de la multiplexación de pines. Confirme en la documentación del componente objetivo el modo exacto de la interfaz, el presupuesto de memoria, el enrutamiento de pines, la secuencia de alimentación del panel y la compatibilidad del controlador de software.

### Interfaces de audio { #audio-interfaces }

El selector ofrece filtros independientes de cantidad mínima para DAC de audio, ADC, interfaces PDM e interfaces I2S. Cada valor es un umbral mínimo, no un perfil de audio combinado. Después, revise el uso compartido de recursos con otros periféricos y el diseño analógico de la placa.

### Conectividad y hardware especializado { #connectivity-and-specialist-hardware }

Aplique los filtros de Wi-Fi, cámara, acelerador de IA, FreeIO y PTM solo si la capacidad correspondiente es un requisito del producto. La casilla de Wi-Fi externo señala una ruta SDIO documentada; no indica que el chip tenga Wi-Fi integrado. El filtro independiente del número de interfaces SDIO comprueba cuántas interfaces SDIO documenta el catálogo. El Wi-Fi externo también requiere alimentación, enrutamiento y soporte de software en la placa. Para cámara e IA, evalúe de extremo a extremo la interfaz, el ancho de banda de memoria, la carga de procesamiento y la pila de software. FreeIO y PTM son útiles cuando la asignación flexible de señales o el manejo determinista de tareas de periféricos son centrales para el diseño; no deben pesar más que las restricciones básicas de alimentación, memoria y encapsulado.

### Evidencia de validación { #validation-evidence }

Antes de comprometerse, siga el enlace del resultado hasta la introducción del producto y compruebe el número de pieza exacto, el encapsulado, los límites eléctricos, el diseño de referencia y la guía de diseño o lista de comprobación disponible. Cuando sea posible, valide el flujo de firmware previsto en la placa compatible cuya configuración de hardware más se aproxime a la del componente objetivo. El selector sirve para crear una preselección; para diseñar, la referencia definitiva es la documentación de SiFli del componente elegido.

## Elija un nivel de integración { #choose-an-integration-level }

El catálogo interactivo solo incluye chips y módulos. Las placas de desarrollo de la tabla siguiente son una ruta aparte para validar el software y los supuestos del sistema.

<div align="center"><em>Punto de partida de hardware</em></div>

<div align="center" markdown>

| Punto de partida | Elíjalo cuando | Siguiente paso |
|:---------------|:---------------|:----------|
| Chip | Necesita una PCB personalizada y control directo sobre las interfaces y el diseño de alimentación. | Elija una familia y revise su guía de diseño para producción antes de elaborar el esquemático. |
| Módulo | Quiere reducir el trabajo de RF y de integración del módulo, manteniendo una placa portadora personalizada. | Consulte la introducción del módulo, la definición de interfaces y la guía de diseño del módulo. |
| Placa de desarrollo | Necesita validar rápidamente el software, los periféricos o un concepto de producto. | Empiece por la placa que mejor se ajuste al producto previsto, ejecute un ejemplo verificado y use su esquemático como referencia, no como diseño de producción. |

</div>

## Confirme la preselección { #confirm-the-shortlist }

1. **Inspeccione el componente exacto.** Use la [visión general de la familia SF32](family/SF32_family.md), la introducción del producto elegido y las [reglas de nomenclatura](family/SF32_namingrule.md) para confirmar el número de pieza para pedido, el encapsulado, la topología de alimentación, la organización de memoria, la asignación de interfaces y el hardware de referencia. No elija un componente por una sola característica destacada: compruebe que la pantalla, el audio, el almacenamiento, los sensores, el Bluetooth y las funciones de bajo consumo que necesita puedan coexistir en el encapsulado y el diseño de placa elegidos.
2. **Valide el flujo de software.** Antes de cerrar el hardware, utilice [Primeros pasos](../getting-started/index.md), [Tutoriales](../getting-started/tutorials/overview.md) y [Desarrollo](../develop/index.md) en la placa disponible cuya configuración de hardware mejor se ajuste al diseño previsto.
3. **Compruebe las restricciones de producción.** Consulte [Diseño para producción](../hardware/design-for-production.md) antes de congelar el esquemático, el diseño de placa, la BOM o las elecciones de pantalla y almacenamiento.
