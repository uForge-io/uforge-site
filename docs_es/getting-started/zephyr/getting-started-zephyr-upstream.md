---
icon: lucide/layers
description: "Compile y grabe el objetivo upstream de Zephyr para la SF32LB52 DevKit LCD; después, verifique la consola y las funciones documentadas."
tags:
    - Primeros pasos
    - Zephyr
---

# Zephyr upstream { #zephyr-upstream }

Desde la versión 4.3.0, el proyecto principal de Zephyr incluye soporte mantenido para la placa `sf32lb52_devkit_lcd`. Consulte las [notas de la versión v4.3.0](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html) y la [documentación de la placa SF32LB52 DevKit LCD](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html). Esta guía prepara un espacio de trabajo v4.3.0, compila un primer ejemplo y graba la placa. Si necesita una cobertura más amplia de las funciones oficiales de SF32, utilice [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! note "Compruebe las funciones de la placa"
    Que la placa esté definida en Zephyr upstream no implica que todos los periféricos o modos de funcionamiento estén habilitados ni validados para un producto. Consulte la tabla de funciones compatibles en la documentación de la placa y compruebe el comportamiento necesario en la revisión concreta de su placa.

## Requisitos { #what-youll-need }

**Hardware**

- SF32LB52 DevKit LCD, basada en el módulo SF32LB52x-MOD-N16R8 con SF32LB525UC6, 8 MB de OPI-PSRAM y 128 Mb de QSPI-NOR.
- Cable de datos USB Type-C conectado a la ruta USB-to-UART de la placa.

**Software**

- Un sistema anfitrión compatible con Zephyr v4.3.0, configurado según la [guía de primeros pasos](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html).
- Las dependencias de host de Zephyr y Zephyr SDK para el objetivo ARM Cortex-M, instalados según esa guía.
- Git, Python 3 y `pip`.

## Preparar las herramientas { #prepare-the-tooling }

Primero, complete la instalación de las dependencias del sistema anfitrión y Zephyr SDK siguiendo la [guía de primeros pasos de Zephyr v4.3.0](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html). Después, cree un entorno de Python e inicialice un espacio de trabajo con la etiqueta correspondiente de Zephyr:

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

Mantenga activo este entorno de Python durante los pasos de compilación y grabación.

## Confirmar la placa { #confirm-the-board }

Compruebe que el espacio de trabajo contiene el objetivo:

```bash
west boards
```

El nombre esperado es:

```text
sf32lb52_devkit_lcd
```

## Compilar Hello World { #build-hello-world }

Compile el ejemplo estándar Hello World de Zephyr:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

Si la compilación termina correctamente, el objetivo de la placa y la cadena de herramientas están disponibles en el espacio de trabajo. Esto no valida todos los periféricos de la placa.

## Grabar la placa { #flash-the-board }

La definición de la placa en Zephyr upstream establece `sftool` como herramienta de grabación predeterminada. Instale [OpenSiFli sftool](https://github.com/OpenSiFli/sftool), compruebe que esté en `PATH` y ponga la placa en modo de descarga serie siguiendo el procedimiento indicado en la documentación de la placa. A continuación, ejecute:

```bash
west flash
```

Si falla la grabación, compruebe el puerto serie seleccionado, el modo de descarga y las instrucciones de la herramienta en la [documentación de la placa](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html).

## Abrir la consola serie { #open-the-serial-console }

La configuración upstream de la placa dirige la consola de Zephyr a `usart1` a `1000000` baudios. Abra ese UART con un terminal serie y compruebe que aparece:

```text
Hello World! sf32lb52_devkit_lcd
```

## Elegir el siguiente ejemplo { #choose-a-next-sample }

Consulte la tabla de funciones compatibles de la documentación upstream de la placa y el [catálogo de ejemplos de Zephyr](https://docs.zephyrproject.org/4.3.0/samples/index.html) para decidir qué API o periférico evaluar a continuación. Antes de considerar que un ejemplo demuestra que una función está lista para producción, confirme que figure entre las compatibles con esta placa y que la configuración necesaria esté habilitada.

## Solución de problemas { #troubleshooting }

<div align="center"><em>Tabla: Solución de problemas</em></div>

<div align="center" markdown>

| Síntoma | Comprobación |
|:--------|:-------------|
| `west boards` no muestra el objetivo SF32 | Confirme que el espacio de trabajo se inicializó con Zephyr upstream v4.3.0 o posterior y que `west update` terminó. |
| La compilación falla antes de compilar el código | Confirme que el entorno de Python está activo, que Zephyr SDK para ARM Cortex-M está instalado y que se instalaron los requisitos de v4.3.0. |
| La placa compila, pero no se graba | Confirme que `sftool` esté instalado y en `PATH`, que el puerto serie seleccionado sea correcto y que la placa esté en modo de descarga serie. |
| No hay salida serie | Compruebe `usart1`, `1000000` baudios, la conexión USB-to-UART y si otro terminal está usando el puerto. |
| Falla un ejemplo de periférico | Revise la tabla de funciones compatibles y la configuración del ejemplo; el objetivo base de la placa no habilita necesariamente todos los periféricos. |

</div>

## Antes de integrar el producto { #before-product-integration }

- Revise la tabla de funciones compatibles de la placa upstream y la configuración del ejemplo previsto.
- Valide las interfaces, el rendimiento, el uso de memoria y el consumo necesarios en la placa objetivo con la configuración del producto. Una compilación correcta de Hello World solo es una prueba básica de la cadena de herramientas.
- Compare el alcance funcional del objetivo upstream con [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) si el diseño requiere una función que no figure o no esté validada para este objetivo Zephyr.
