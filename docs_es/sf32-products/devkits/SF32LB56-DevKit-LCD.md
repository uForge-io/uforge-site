---
icon: lucide/circuit-board
description: "SF32LB56-DevKit-LCD: placa basada en el módulo SF32LB56xV para evaluar pantallas, audio, almacenamiento y periféricos."
tags:
    - Hardware
    - Placa de desarrollo
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD es una placa de desarrollo centrada en la pantalla, disponible con los módulos SF32LB56-MOD-N16R12N1 o SF32LB56-MOD-A128R12N1; ambos incorporan un dispositivo de la serie SF32LB56xV. Permite evaluar las interfaces de pantalla, el audio, el almacenamiento extraíble y los controladores de periféricos antes de diseñar una placa SF32LB56x propia.

## Aplicaciones principales { #what-it-is-best-for }

- Aplicaciones de pantalla usando interfaces MIPI-DPI (RGB), SPI, DSPI, QSPI o MCU/8080 de 8 bits.
- Integración de pantalla táctil a través de I2C.
- Evaluación de audio con entrada de micrófono analógico y salida analógica a través del amplificador de potencia Clase D integrado.
- Almacenamiento en tarjeta MicroSD (TF) mediante SDIO y desarrollo de controladores para otros periféricos.
- Evaluación de una arquitectura de producto basada en el módulo SF32LB56 antes de definir la placa portadora.

## Recursos de la placa { #board-resources }

<div align="center"><em>Tabla: recursos de SF32LB56-DevKit-LCD</em></div>

<div align="center" markdown>

| Recurso | Implementación en placa | Uso práctico |
|:---------|:---------------------|:--------------|
| Configuración N16R12N1 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR, 4 + 8 MB OPI-PSRAM y 1 MB QSPI-NOR; evaluación basada en el módulo y planificación de la placa portadora. |
| Configuración A128R12N1 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND, 4 + 8 MB OPI-PSRAM y 1 MB QSPI-NOR; evaluación basada en el módulo y planificación de la placa portadora. |
| Dimensiones y temperatura | 65 mm × 38 mm; temperatura de funcionamiento de -40 °C a 85 °C según la guía de modelos | Diseño mecánico y evaluación ambiental. |
| Pantalla | MIPI-DPI RGB de 24 bits mediante conector FPC de 40 pines y paso de 0,5 mm, con el pinout ALIENTEK; la cabecera 2 × 20 de 40 pines expone SPI/DSPI/QSPI y MCU/8080 de 8 bits | Puesta en marcha de paneles y desarrollo de controladores de pantalla. |
| Táctil | Compatibilidad con pantalla táctil I2C | Prototipos de pantallas interactivas. |
| Audio | Una entrada de micrófono MEMS analógica y un canal de PA Clase D integrado; salida para altavoz de hasta 3 W / 4 Ω según la guía de modelos | Pruebas de grabación y reproducción local; compruebe la carga del altavoz y la revisión de la placa. |
| Almacenamiento | Ranura MicroSD mediante SDIO | Pruebas de medios, registros, sistema de archivos y recursos gráficos. |
| USB y alimentación | Dos conectores USB Type-C: uno USB-UART (CH343K según la guía de modelos) y otro USB 2.0 FS; ambos pueden alimentar la placa | Registros serie, programación/depuración, evaluación USB y alimentación de banco. |
| Conversión de alimentación | CI de conversión de 3,3 V y 1,8 V en placa | Compruebe los requisitos de los rieles en el esquema antes de añadir cargas. |
| Depuración y arranque | Cabecera SWD de 4 pines, 2,54 mm y una fila; jumper Mode; un botón de encendido, uno de función y uno de reinicio | Programación, depuración SWD y selección del modo de arranque. |
| Indicadores | LED RGB, LED controlado por GPIO y LED de alimentación | Comprobación del firmware y del estado de alimentación. |
| RF | Antena integrada de forma predeterminada; selección de IPEX mediante una opción de 0 Ω | Evaluación de la antena y la carcasa con la configuración del módulo. |

</div>

**Nota sobre las fuentes; confirme la revisión de la placa:** La guía detallada de SiFli identifica la placa descrita como una unidad con el módulo `SF32LB56-MOD-A128R12N1`, 4 MB + 8 MB de OPI-PSRAM en el encapsulado y 1 Gb de QSPI-NAND; también advierte que estos datos de memoria podrían cambiar antes del lanzamiento oficial. La guía de modelos vigente enumera las configuraciones N16R12N1 y A128R12N1; ambas incluyen 4 + 8 MB de OPI-PSRAM y 1 MB de QSPI-NOR estándar. En A128R12N1, los 128 MB de QSPI-NAND de la guía de modelos equivalen en capacidad al 1 Gb de la guía detallada. Por tanto, las capacidades de OPI-PSRAM y de la NAND principal coinciden para A128R12N1. Sin embargo, la guía detallada no menciona la NOR estándar de 1 MB ni establece qué SKU monta cada unidad o revisión. La guía de modelos indica que el CH343K ofrece dos canales de depuración USB-UART, pero la guía detallada solo asigna a los conectores Type-C las funciones de USB-UART y USB 2.0 FS, sin especificar cómo se distribuyen esos canales entre los conectores. Consulte el esquema/BOM de la revisión correspondiente antes de depender de un canal UART concreto. Antes de usar una placa concreta como referencia de producto, compruebe el marcado del módulo y el esquema/BOM correspondiente.

**Diferencia en la identificación del puente USB-UART; compruebe el componente montado:** El diagrama de bloques de la guía detallada identifica el puente como CH342K, mientras que la guía de modelos lo identifica como CH343K. Compruebe el componente real en el esquema/BOM de la revisión correspondiente.

**Discrepancia entre la foto y el texto sobre el SKU; verifique el módulo instalado:** El texto de la guía detallada identifica la placa descrita con el módulo `SF32LB56-MOD-A128R12N1`, pero la foto frontal anotada etiqueta el módulo como `SF32LB56-MOD-N16R12N1`. SiFli no aclara si la foto corresponde a otra variante o revisión. Compruebe la marca del módulo y la BOM de la unidad; no deduzca su SKU solo a partir del texto o la foto.

## Programación y depuración { #programming-and-debug }

Para entrar en el modo de descarga, instale el jumper Mode antes de encender o reiniciar la placa; retírelo para iniciar la aplicación normalmente y obtener registros serie. Conecte el host al puerto USB-UART Type-C mediante un cable compatible con datos. El otro puerto USB 2.0 FS Type-C permite probar el USB nativo. La placa también incorpora una cabecera SWD de 4 pines, 2,54 mm y una fila para un depurador compatible. Ambos conectores Type-C pueden alimentar la placa; siga la guía y el esquema de la revisión concreta para la conexión de alimentación prevista.

## Objetivos de compilación del SDK { #sdk-build-targets }

Al compilar con SiFli-SDK, utilice `scons --board=<board_name>` con uno de estos nombres exactos de destino:

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

Son identificadores de destinos de compilación del SDK, no necesariamente los nombres de producto impresos en la placa o el módulo. El índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) de la rama principal pueden enumerar conjuntos distintos; confirme el destino para la revisión del SDK que utilice.

## Ruta de primera validación { #first-validation-path }

1. Conecte una pantalla MIPI-DPI de 24 bits compatible al FPC de 40 pines y conecte el puerto USB-UART mediante un cable USB que admita datos.
2. Siga [Primeros pasos](../../getting-started/index.md) para comprobar una configuración básica de compilación, programación y registro serie.
3. Verifique primero patrones de pantalla sencillos y, después, depure el framework de interfaz gráfica. Consulte [Visión general de gráficos](../../learn/graphics/overview.md).
4. Incorpore el táctil, el almacenamiento, el audio y la conectividad inalámbrica de uno en uno; luego compruebe su funcionamiento conjunto y el consumo.
5. Antes de diseñar una placa propia, consulte [SF32LB56-MOD](../modules/SF32LB56-MOD.md) y [Diseño para producción](../../hardware/design-for-production.md).

## Referencia { #reference }

La [guía de modelos de placas de desarrollo](https://wiki.sifli.com/en/board/devkit_guide.html) de SiFli enumera los códigos disponibles para las placas y sus módulos. La [Guía de usuario de la placa de desarrollo SF32LB56-DevKit-LCD](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html) detalla la asignación de GPIO, los conectores e interfaces, la alimentación y los procedimientos de programación y depuración.
