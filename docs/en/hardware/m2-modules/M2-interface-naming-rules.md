---
icon: lucide/plug
description: "Naming rules for μForge's M2 module interface and its M2xM/M2xA/M2xN/M2xH/M2xP extension specifications, including declaration examples and design principles."
tags:
  - Hardware
  - Module
  - Interface
---

# μForge M2 Interface Naming Rules { #forge-m2-interface-naming-rules }

## Base specification { #base-specification }

This document defines the names used in the proposed μForge module-interface system. It is a naming convention, not a released electrical or mechanical standard.

Within this convention, **M2** identifies the mandatory common base interface for modules adopting the system. This requirement does not establish that every existing μForge or SiFli module implements M2. The M2 pinout and electrical and mechanical requirements are still under development and are not specified here.

Before M2 is described as compatible with M.2 E-key, a released M2 definition would need to specify the mechanical interface, pinout, electrical limits, required and optional signals, carrier requirements, and conformance rules. The current [M2 Interface Definition](M2-interface-definition.md) is a draft; the M2 name alone does not establish M.2 electrical compatibility or module-to-carrier interchangeability.

## Extension specifications { #extension-specifications }

Optional capabilities are grouped under **M2xY** extension specifications. The names identify functional categories; they do not guarantee that a particular module implements every function in a category.

**Naming format:**

> **M2xY**

Where:

- **M2** = base interface specification
- **x** = extension separator
- **Y** = extension category

## Extension categories { #extension-categories }

<div align="center"><em>M2 Extension Categories</em></div>

<div align="center" markdown>

| Specification | Description |
| --- | --- |
| **M2xM** | Multimedia: future support for RGB displays, DVP cameras, digital microphones, and advanced audio. |
| **M2xA** | Analog: future precision analog I/O and data-acquisition capabilities. |
| **M2xN** | Networking: future Ethernet, CAN, and industrial-networking capabilities. |
| **M2xH** | High-speed: future high-bandwidth interfaces. |
| **M2xP** | Power: future power-management and high-current I/O capabilities. |

</div>

These descriptions state the intended scope of each category, not finalized electrical requirements.
**Evidence status:**
- **M2 / M2xM:** The linked draft reports contact maps in a local proposal workbook, but the workbook is not included in this repository or linked here; treat the maps as proposal-only.
- **M2xN / M2xA:** The draft summarizes these extensions, but no original contact-map data was found to verify the summaries; treat them as unverified.
- **M2xH / M2xP:** Reserved names with no contacts assigned.

## Module declaration { #module-declaration }

A module adopting this convention declares **M2** as its base interface and may list one or more implemented extensions. Its documentation must also identify the actual connectors, optional functions, and any mutually exclusive modes.

Declaration examples, not a list of released module configurations:

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Design principles { #design-principles }

- **M2** is intended to remain stable and backward compatible as the system evolves; compatibility must be verified against the applicable specification revisions and actual implementation.
- Each **M2xY** extension has its own functional scope. Separate names do not imply that all functions can operate simultaneously or that their pin assignments are independent.
- Extensions complement the base interface without modifying or replacing it.
- Modules advertise supported capabilities by listing their implemented M2xY specifications.

Before selecting a connector or claiming compatibility, follow the verification process in [Module Interface Standards](interface-standards-overview.md).
