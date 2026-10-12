---
icon: lucide/code
description: "Primera evaluación de sifli-rs de OpenSiFli en SF32LB52: instale el objetivo de Rust, compile el ejemplo Blinky sin modificar, configure sftool y conserve una ruta de recuperación con el SDK."
tags:
    - Primeros pasos
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) ofrece HAL y PAC en Rust y trabajo sobre tablas de flash para las MCU de SiFli. Sus mantenedores indican que el proyecto sigue en desarrollo y aún no está listo para producción. Por eso, esta guía establece un **punto de partida para la evaluación**, no un flujo de trabajo de firmware de producción.

Antes de empezar, complete [Primeros pasos con SiFli-SDK](../sifli/getting-started-sifli-sdk.md) en la misma placa. Así tendrá una conexión serie y una ruta de recuperación ya validadas si no puede grabar o depurar el proyecto en Rust.

## Qué necesita { #what-you-need }

- Un SF32LB52 DevKit LCD y un cable de datos USB tipo C conectado al puerto USB-to-UART de la placa.
- Familiaridad básica con Rust, el desarrollo embebido y la línea de comandos.
- `git` y una cadena de herramientas de Rust actual instalada con [rustup](https://rustup.rs/).
- La [guía de primeros pasos de sifli-rs](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) y la [Guía de grabación y depuración](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md) vigentes.

!!! warning "Ruta de exploración"
    No utilice esta guía como prueba de que un chip, periférico, configuración de placa o pila de aplicación está listo para producción. Antes de invertir tiempo en adaptarlo, compruebe en el repositorio el estado de soporte del objetivo y del periférico concretos.

## Prepare el objetivo de Rust { #prepare-the-rust-target }

La guía del repositorio usa objetivos de Rust Arm Cortex-M. Instale los objetivos que documenta:

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Clone el repositorio actual y luego trabaje desde su directorio de ejemplos para SF32LB52:

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

El directorio de ejemplos contiene la configuración de objetivos de Cargo, el mapa de memoria, el script de compilación y los binarios de ejemplo. No copie estos archivos sin cambios a un producto: incorporan supuestos sobre la placa y la memoria flash que debe validar para el hardware de destino.

## Configure el ejecutor de grabación { #configure-the-flash-runner }

El repositorio documenta `sftool` como el ejecutor de grabación habitual. En `examples/sf32lb52x/.cargo/config.toml`, configure el ejecutor con el puerto USB-to-UART de la placa, siguiendo la Guía de grabación y depuración vigente. Su patrón documentado es:

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

La primera grabación puede requerir una tabla de flash, un bootloader y una imagen de aplicación. Las imágenes y direcciones exactas dependen de la disposición de placa/flash documentada. Siga la guía del repositorio en lugar de sustituir direcciones o binarios de Arduino, Zephyr o SiFli-SDK.

## Compile y ejecute el ejemplo de referencia { #build-and-run-the-baseline }

Con el ejecutor configurado, compile y grabe el ejemplo Blinky sin modificar:

```bash
cargo run --bin blinky
```

Considere que una compilación correcta es solo la primera comprobación. Confirme que la placa muestra el comportamiento esperado y conserve toda la salida de `cargo` y `sftool`. Después, introduzca un solo cambio pequeño y reversible —por ejemplo, ajustar el intervalo de parpadeo— antes de probar otro periférico.

## Si falla el ejemplo de referencia { #if-the-baseline-fails }

Confirme primero que la configuración de referencia de SiFli-SDK sigue funcionando en la placa. Después recopile el objetivo de Rust, el commit, el ejemplo seleccionado, la configuración de Cargo, el comando y la salida de `sftool`, la revisión de la placa y el registro serie o de depuración. La guía upstream advierte que la depuración puede ser inestable en estados de reposo relacionados con WFI y que la tabla de flash debe tener capacidad suficiente para la imagen de la aplicación.

Para decisiones sobre arquitectura, alcance del soporte y adecuación al producto, consulte la [página de Rust en Develop](../../develop/platforms/rust/overview.md).

## Antes de reutilizar el ejemplo { #what-sifli-should-add }

Antes de adaptar el ejemplo, compruebe que el repositorio documente la compatibilidad con su placa y sus periféricos concretos, y revise el objetivo Rust, el bootloader, la disposición de la tabla de flash y el procedimiento de depuración correspondientes. Conserve como opción de recuperación la configuración conocida y funcional de SiFli-SDK.
