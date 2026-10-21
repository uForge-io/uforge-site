---
icon: lucide/cable
description: "μForge M2 module-interface conventions: use the naming rules for stable terminology, and validate the draft pin-level definition before committing a carrier board."
tags:
    - Hardware
    - Module
    - Interface
---

# Module Interface Standards { #module-interface-standards }

This section introduces the conventions used to describe μForge module interfaces. Start here before committing to a carrier-board connector, pin map, or compatibility claim. It links to two different kinds of documents: naming rules that establish common terminology, and a pin-level proposal that can inform planning but must be validated for the selected module and product.

## Use the Documents in the Right Order { #use-the-documents-in-the-right-order }

<div align="center"><em>Table: Module Interface Documents</em></div>

<div align="center" markdown>

| Document | Status and purpose | Use it when |
|:---------|:-------------------|:------------|
| [M2 Interface Naming Rules](M2%20Interface%20Naming%20Rules.md) | Naming convention for M2 interface families and profiles. | Naming a module, connector, carrier board, or interface profile in documentation and design files. |
| [M2 Interface Definition](M2-interface-definition.md) | Draft pin-level definition and signal-allocation proposal. | Exploring a proposed M2 carrier interface or reviewing signal sharing before committing to a connector. |

</div>

## Naming Versus Electrical Compatibility { #what-is-stable-and-what-must-be-verified }

Use the naming rules consistently in module descriptions, schematics, BOM notes, and product documentation. They describe the intended interface profile, not a finalized electrical or mechanical specification. Neither a profile name nor a matching connector form establishes interchangeability between a module and a carrier board.

The pin-level definition is not a promise that every μForge module or SF32 package supports every assigned signal, interface, or simultaneous-use combination. Before a design commitment, verify all of the following against the exact selected module, chip, package, and hardware design guide:

- connector mechanical drawing, keying, pin numbering, and assembly constraints;
- power rails, voltage domains, current capability, and sequencing;
- interface availability, pin multiplexing, and any mutually exclusive functions;
- signal integrity, impedance, length matching, ESD, and RF keep-out requirements;
- debug, boot, recovery, and production-test access; and
- the carrier board's display, camera, audio, storage, and wireless companion requirements.

## Carrier-Board Decision Path { #carrier-board-decision-path }

1. Pick the module and read its introduction and hardware design guide.
2. Use the [M2 Interface Naming Rules](M2%20Interface%20Naming%20Rules.md) to make the intended profile unambiguous.
3. Use the [M2 Interface Definition](M2-interface-definition.md) to identify candidate signals and sharing conflicts.
4. Confirm every used contact in the module-specific documentation and the applicable SiFli source documentation.
5. Record the document versions, module and carrier-board revisions, confirmed exceptions, and unresolved items in the schematic review before layout starts.

For a complete carrier-board review, continue with [Design for Production](../design-for-production.md). For module-specific implementation requirements, use the matching module guide in the **Hardware Design Guides** group.
