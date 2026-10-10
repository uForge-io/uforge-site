---
icon: lucide/library
description: "SiFli's official schematic-symbol and PCB-footprint libraries for SF32 chips and modules — JLCEDA/LCEDA Pro, PADS, OrCAD, and KiCad — with download links and a review checklist."
tags:
    - Hardware
    - EDA
    - Library
---

# SF32 EDA Tool Libraries { #sf32-eda-tool-libraries }

## Purpose { #purpose }

SiFli publishes schematic-symbol and PCB-footprint libraries for the SF32 chip and module family. Use these files as the starting point for schematic capture and PCB layout instead of redrawing symbols, pin maps, and land patterns from the datasheet by hand.

The libraries reduce bring-up risk, but they do not replace the datasheet, package drawing, or the device-specific hardware design guide. Before release, always cross-check the selected library part against the exact part number, package, pinout, land pattern, and layout guidance for your design.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro Library - download `.epro2` project](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS Library - download `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD Library - download `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad Library - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Source"
    The direct-download links come from the [resource downloads on SiFli Wiki](https://wiki.sifli.com/hardware/index.html). If a file link changes, use that page to find the replacement.

## Library Format at a Glance { #library-format-at-a-glance }

<div align="center"><em>Library format summary</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDA Tool | File | Format | Contents | Distribution |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Pro project archive | Schematic symbols and PCB footprints | Direct download |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADS library archive | Schematic symbols and PCB decals | Direct download |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Capture library | Schematic symbols | Direct download |
| KiCad | Release ZIP or package metadata (`metadata.json`) | KiCad symbol, footprint, and 3D-model library | Schematic symbols, PCB footprints, and 3D models | [GitHub repository](https://github.com/OpenSiFli/kicad-libraries), versioned releases |

</div>

JLCEDA / LCEDA Pro and PADS are downloadable archives; OrCAD is a standalone `.OLB` library file. The wiki index does not provide a per-part coverage table for these downloads. Import the file into the intended EDA tool and confirm that the selected part is present.

The linked KiCad repository provides public source, versioned releases, and a supported-device table. These make its coverage easier to inspect; they do not guarantee that every SF32 variant is included.

## KiCad Library Detail { #kicad-library-detail }

The [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) repository provides SiFli's official KiCad symbol, footprint, and 3D-model library under CC-BY-SA-4.0. [Release `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0) was checked for this review on 2026-10-05. Check the repository for newer releases before starting a design.

<div align="center"><em>KiCad library coverage</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Part Number | Package | Symbol | Footprint | 3D Model |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1 module | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

The table reflects the repository README checked on 2026-10-05, not a pin-by-pin audit of every downloadable release. The wildcard chip groups do not establish support for every exact order code: verify the selected symbol, footprint, and package in the file you install.

!!! note "Interpreting the upstream part-number rows"
    The OpenSiFli KiCad library README lists the chip rows as `SF32LB52XUx` and `SF32LB52xUx`. In SiFli naming, uppercase `X` is a wildcard for the alphabetic externally powered variants, and lowercase `x` is a wildcard for the numeric battery-powered variants. This page expands those rows into the explicit SF32LB52B/D/E/G/J and SF32LB520/3/5/7 groups used elsewhere in the μForge documentation.

The README in [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) says installation from the Package and Content Manager catalog is not yet supported. For manual installation, it describes downloading a release ZIP and choosing **Install from file...** in the manager. The `1.0.0` release page also documents extracting its ZIP into KiCad's library directory or installing through the manager with `metadata.json`. Follow the instructions supplied with the release you use; the README identifies the installed symbol and footprint libraries as `PCM_SiFli`.

## Review Checklist { #review-checklist }

- [ ] Match the library part number and package suffix against the BOM before schematic release.
- [ ] Cross-check symbol pin names and pin numbers against the chip datasheet and the device-specific hardware design guide.
- [ ] Verify footprint pad size, pitch, courtyard, exposed-pad treatment, and assembly clearance against the official package drawing.
- [ ] Treat 3D models as placement and mechanical-fit aids only; do not use them as fabrication or assembly dimensions.
- [ ] For JLCEDA / LCEDA Pro, PADS, and OrCAD, confirm per-part coverage after import; the wiki download index does not list support for each part.
- [ ] Check for updated libraries before starting a new design. Keep the reviewed archive or package version with the project; SiFli may update the files as new devices and modules are qualified. Updates may add or change parts, so recheck any replacement before adopting it.

## Related Pages { #related-pages }

- [SF32 Family Overview](../../sf32-products/family/SF32_family.md)
- [SF32 Naming Convention](../../sf32-products/family/SF32_namingrule.md)
- [SF32 Approved Vendor List](sifli-approved-vendor-list.md)
