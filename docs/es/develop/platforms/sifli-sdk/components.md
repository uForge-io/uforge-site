---
icon: lucide/boxes
description: "Convierta ejemplos de SiFli-SDK en componentes reutilizables y paquetes `sf-pkg`: criterios de calidad, contenido que documentar y errores habituales al empaquetar."
tags:
    - Desarrollo
    - SiFli-SDK
---

# Componentes y `sf-pkg` { #components-and-sf_pkg }

Los proyectos de SiFli suelen depender de middleware, controladores y componentes reutilizables. Cuando un proyecto supera la etapa de copiar un ejemplo, utilice el ecosistema de paquetes y componentes de SiFli para publicar y mantener bloques de firmware reutilizables.

## Cómo plantear los componentes { #how-to-think-about-components }

Use componentes para el código que deba compartirse entre varios productos o ejemplos:

- Controladores de periféricos.
- Soporte para paneles de visualización.
- Servicios Bluetooth.
- Widgets de GUI.
- Adaptadores para sensores.
- Funciones auxiliares de almacenamiento.
- Middleware del producto.

Mantenga en el proyecto de aplicación la lógica específica de esa aplicación hasta que tenga una interfaz estable y varios usuarios.

## Flujo práctico { #practical-workflow }

1. Empiece con un ejemplo funcional del SDK.
2. Identifique la parte que debería reutilizarse.
3. Expóngala mediante una API pequeña y de alcance bien definido.
4. Añada la configuración mediante el mecanismo habitual de compilación/configuración del SDK.
5. Documente las dependencias, el uso de memoria y los periféricos necesarios.
6. Solo entonces empaquétela como componente reutilizable.

## Distribuir componentes con `sf-pkg` { #use-sf-pkg-to-distribute-components }

Un componente es una unidad de ingeniería reutilizable. SiFli utiliza Conan como registro de paquetes; el subcomando actual del SDK es `sf-pkg`.

Para consumir un paquete, ejecute `sdk.py sf-pkg init` desde el directorio `project` del proyecto SDK; se generará `conanfile.py`. Añada las referencias en el campo `requires` con el formato `package/version@<username>`, donde `<username>` es el nombre de usuario del registro de paquetes. Después, ejecute `sdk.py sf-pkg install` desde el mismo directorio. Los paquetes instalados se guardan en `project/sf-pkgs`; sus archivos Kconfig se integran en `menuconfig`, dentro de `SiFli External Components`.

Para publicar un componente, ejecute `sdk.py sf-pkg new --name <package_name>` desde su directorio y revise el `conanfile.py` generado. Puede añadir `--support-sdk-version <sdk_version_range>` para definir el rango compatible durante la creación. Tanto si usa esa opción como si no, compruebe que la receta declare el rango de SDK previsto en `support_sdk_version` y ajústelo si hace falta. Use una versión semántica para el paquete y complete sus metadatos y dependencias. Tras autenticarse en el registro, compile y suba el paquete:

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

El flujo exacto puede variar según la versión del SDK. Consulte las guías de SiFli sobre [integración de paquetes (en chino)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), [creación y publicación de paquetes (en inglés)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html) y [la versión en chino](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html) para ver la configuración, la autenticación y los comandos específicos de cada versión.

## Criterios de calidad de un componente { #component-quality-bar }

Un componente está listo para compartirse cuando cumple estos criterios:

- Se compila desde una copia limpia del repositorio, con los requisitos de entorno y dependencias documentados.
- Incluye un ejemplo mínimo.
- Documenta la configuración necesaria.
- No depende de supuestos ocultos sobre la placa.
- Informa de los errores con claridad.
- Documenta cualquier uso de recursos globales, incluidas las reglas de propiedad y liberación.
- Define las reglas de propiedad de hilos, callbacks y memoria.

## Qué documentar { #what-to-record }

Cada componente reutilizable debería documentar:

- Chips y placas compatibles.
- Versión requerida del SDK.
- Periféricos y pines necesarios.
- Configuración obligatoria del RTOS/middleware.
- Comportamiento de hilos y callbacks.
- Requisitos de RAM, Flash y pila.
- Ruta del proyecto de ejemplo.

## Errores que conviene evitar { #avoid-these-traps }

<div align="center"><em>Tabla: Errores que conviene evitar</em></div>

<div align="center" markdown>

| Error | Enfoque recomendado |
|:------|:--------------------|
| Copiar un ejemplo entero en cada producto. | Extraer solo la capa reutilizable que sea estable. |
| Ocultar los nombres de los pines en el código del componente. | Pasar los recursos de la placa mediante la configuración. |
| Suponer que solo hay una ruta de pantalla/audio. | Documentar las rutas de hardware compatibles. |
| Ignorar el uso de memoria. | Registrar los requisitos de pila, heap, DMA y búferes. |
| Publicar sin un ejemplo. | Incluir un ejemplo mínimo de integración. |

</div>
