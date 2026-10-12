---
icon: lucide/library
description: "Bibliotecas oficiales de símbolos esquemáticos y huellas de PCB de SiFli para chips y módulos SF32 — JLCEDA/LCEDA Pro, PADS, OrCAD y KiCad — con enlaces de descarga y una lista de comprobación de revisión."
tags:
    - Hardware
    - EDA
    - Bibliotecas
---

# Bibliotecas EDA para SF32 { #sf32-eda-tool-libraries }

## Objetivo { #purpose }

SiFli publica bibliotecas de símbolos esquemáticos y huellas de PCB para la familia de chips y módulos SF32. Use estos archivos como punto de partida para crear esquemáticos y diseños de PCB, en lugar de redibujar a mano los símbolos, la asignación de pines y los patrones de pads a partir de la hoja de datos.

Las bibliotecas reducen el riesgo en la puesta en marcha, pero no sustituyen la hoja de datos, el plano del encapsulado ni la guía de diseño de hardware específica del dispositivo. Antes de cerrar el diseño, compare siempre la pieza seleccionada de la biblioteca con el número de pieza exacto, el encapsulado, la asignación de pines, el patrón de pads y las pautas de diseño correspondientes.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[Biblioteca JLCEDA / LCEDA Pro - descargar proyecto `.epro2`](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[Biblioteca PADS - descargar `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[Biblioteca OrCAD - descargar `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[Biblioteca KiCad - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Fuente"
    Los enlaces directos proceden de la [lista de descargas de la wiki de SiFli](https://wiki.sifli.com/hardware/index.html). Si cambia un enlace, consulte esa página para encontrar el nuevo archivo.

## Resumen de formatos de biblioteca { #library-format-at-a-glance }

<div align="center"><em>Resumen de formatos de biblioteca</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Herramienta EDA | Archivo | Formato | Contenido | Distribución |
|:----------------|:--------|:--------|:----------|:-------------|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | Archivo de proyecto LCEDA Pro | Símbolos esquemáticos y huellas de PCB | Descarga directa |
| PADS | `PADS-SIFLI-IC.ZIP` | Archivo de biblioteca Mentor/Siemens PADS | Símbolos esquemáticos y huellas de PCB | Descarga directa |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Biblioteca Cadence OrCAD Capture | Símbolos esquemáticos | Descarga directa |
| KiCad | ZIP de versión o metadatos del paquete (`metadata.json`) | Biblioteca KiCad de símbolos, huellas y modelos 3D | Símbolos esquemáticos, huellas de PCB y modelos 3D | [Repositorio GitHub](https://github.com/OpenSiFli/kicad-libraries), versiones publicadas |

</div>

JLCEDA / LCEDA Pro y PADS se distribuyen en archivos comprimidos; OrCAD es un archivo de biblioteca `.OLB` independiente. El índice de la wiki no ofrece una tabla de cobertura por componente para estas descargas. Importe el archivo en la herramienta EDA que vaya a utilizar y compruebe que incluye la pieza seleccionada.

El repositorio KiCad enlazado ofrece código fuente público, versiones publicadas y una tabla de dispositivos compatibles. Esto facilita revisar la cobertura, pero no garantiza que incluya todas las variantes SF32.

## Detalles de la biblioteca KiCad { #kicad-library-detail }

El repositorio [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) ofrece la biblioteca oficial de SiFli de símbolos, huellas y modelos 3D para KiCad bajo licencia CC-BY-SA-4.0. Para esta revisión se comprobó la [versión `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0) el 2026-10-05. Consulte si hay versiones más recientes antes de iniciar un diseño.

<div align="center"><em>Compatibilidad de la biblioteca KiCad</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Número de pieza | Encapsulado | Símbolo | Huella | Modelo 3D |
|:----------------|:------------|:-------:|:------:|:---------:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| Módulo SF32LB52-MOD-1 | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

La tabla refleja el README del repositorio comprobado el 2026-10-05, no una verificación pin a pin de cada versión descargable. Los grupos de chips expresados con comodines no confirman la compatibilidad de todas las referencias de pedido: compruebe el símbolo, la huella y el encapsulado elegidos en el archivo que instale.

!!! note "Cómo interpretar las filas de números de pieza del README"
    El README de la biblioteca KiCad de OpenSiFli muestra las filas de chips como `SF32LB52XUx` y `SF32LB52xUx`. En la nomenclatura de SiFli, la `X` mayúscula es un comodín para las variantes alfabéticas alimentadas mediante una fuente externa, y la `x` minúscula lo es para las variantes numéricas alimentadas por batería. Esta página desarrolla esas filas en los grupos explícitos SF32LB52B/D/E/G/J y SF32LB520/3/5/7 usados en el resto de la documentación de μForge.

El README de [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) indica que aún no se admite la instalación desde el catálogo de Package and Content Manager. Para la instalación manual, describe cómo descargar un ZIP de versión y elegir **Install from file...** en el gestor. La página de la versión `1.0.0` también indica que se puede extraer su ZIP en el directorio de bibliotecas de KiCad o instalarla desde el gestor usando `metadata.json`. Siga las instrucciones incluidas con la versión que utilice; el README identifica las bibliotecas instaladas de símbolos y huellas como `PCM_SiFli`.

## Lista de comprobación de revisión { #review-checklist }

- [ ] Antes de publicar el esquemático, compruebe que el número de pieza y el sufijo de encapsulado de la biblioteca coinciden con la BOM.
- [ ] Compare los nombres y números de pin del símbolo con la hoja de datos del chip y la guía de diseño de hardware específica del dispositivo.
- [ ] Verifique el tamaño de los pads, el paso, el área de separación de la huella (courtyard), el tratamiento del pad expuesto y las holguras de montaje con el plano oficial del encapsulado.
- [ ] Use los modelos 3D únicamente para facilitar la colocación y comprobar el ajuste mecánico; no los use como dimensiones de fabricación o montaje.
- [ ] En JLCEDA / LCEDA Pro, PADS y OrCAD, confirme la cobertura por pieza tras la importación; el índice de descargas de la wiki no indica la compatibilidad de cada componente.
- [ ] Compruebe si hay bibliotecas actualizadas antes de iniciar un diseño. Conserve con el proyecto la versión del archivo o paquete revisado; SiFli puede actualizar los archivos a medida que valida nuevos dispositivos y módulos. Las actualizaciones pueden añadir o modificar componentes, así que vuelva a comprobar cualquier sustitución antes de adoptarla.

## Páginas relacionadas { #related-pages }

- [Resumen de la familia SF32](../../sf32-products/family/SF32_family.md)
- [Convención de nomenclatura SF32](../../sf32-products/family/SF32_namingrule.md)
- [Lista de proveedores aprobados para SF32](sifli-approved-vendor-list.md)
