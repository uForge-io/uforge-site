---
icon: lucide/list-checks
description: "Shortlist SF32 chips and modules from product constraints, then verify the implementation path on supported hardware."
tags:
    - Hardware
    - Selection
hide:
    - toc
---

# SF32 Product Selector { #sf32-product-selector }

Shortlist SF32 chips and modules before committing to a schematic. Set the constraints that are expensive to change later—power architecture, package, display, audio, memory, GPIO, connectivity, and the software-validation path—then compare the candidates that remain.

Use the interactive selector for a first pass. It lists chips and modules only, filtering by integration level, PSRAM and GPIO capacity, package, main supply, display interface and target resolution, SDIO count, audio-interface counts, and specialist hardware capabilities. Each result links to its product introduction. Development boards are separate validation platforms, not selector entries.

## Product Selector { #product-selector }

!!! info "Terminology and audio-interface counts"
    See the [glossary](../about/glossary.md) for abbreviations and interface definitions. One PDM interface can connect up to two digital microphones, so the PDM-interface count is not the microphone count. The number of usable microphone inputs and their pin routing depend on the device; check the exact part's documentation.

Filters are conjunctive: a result must satisfy every active criterion. Integration level, package, supply, and display are single-choice controls. PSRAM and GPIO values represent the application's requirement, so candidates must meet or exceed them. Here, “maximum needed” means the application's maximum requirement, not an upper limit on the part. Target resolution, SDIO, and each audio-interface count are also minimum thresholds. Feature checkboxes add required capabilities (external Wi-Fi over SDIO, a DCMI camera interface, an AI/ML accelerator, FreeIO, or PTM). The SDIO-count filter is distinct from the external-Wi-Fi checkbox.

<div id="uf-product-selector"></div>

<noscript>
This tool needs JavaScript to filter and render the part table. With JavaScript disabled, use the [SF32 Family comparison table](family/SF32_family.md) instead.
</noscript>

The results table shows exact part numbers and packages, memory capacities, maximum GPIO count, supply and I/O-voltage information, display capabilities, audio-interface counts (DAC/ADC/PDM/I2S), digital-peripheral interface/channel counts (UART/I2C/SPI/CAN/GPADC), USB speed, and catalog feature flags. A count or value shown as `n/a` is not documented at the catalog's stated level of detail; it does not mean zero or prove that the part lacks the feature. A dash in a feature column means the catalog record does not mark that capability, so verify it in the target part's documentation. Display-interface lists are selection data, not a complete pin-multiplexing inventory.

## Selection Factors { #selection-factors }

Treat the selector as a way to apply hard gates, not as an automatic recommendation. Start with the first constraint that would force a board or schematic redesign if discovered late, then use the remaining factors to separate the viable candidates.

### Integration Level { #integration-level }

Choose the integration level before comparing detailed specifications when your schedule, RF work, or board ownership is already fixed. A chip gives maximum control but makes you responsible for the complete power, RF, clock, layout, and production path. A module reduces module-level design and integration work, but you still need to design the carrier board. A development board is the quickest way to prove firmware, peripheral behavior, and system assumptions; it is not automatically the right production hardware.

### Power Supply and Package { #power-supply-and-package }

Select the supply arrangement and package early. The selector distinguishes a direct Li-ion rail (3.2–4.7 V), an externally regulated 3.3 V supply where that option is documented, and parts whose main supply supports operation down to about 1.8 V (some specifications set the lower limit at 1.71 V). These filters describe main-supply options, not GPIO I/O voltage; the results show I/O voltage separately as nominal levels, not as guaranteed operating limits. Check the exact part's electrical specifications. Package choice is equally structural: it sets board area, escape-routing difficulty, thermal path, and the usable pin budget. The package filter uses broad categories; check the exact package designation in the results. A package with a larger published GPIO maximum is not necessarily enough after reserving pins for power, clocks, debug, display, memory, and mandatory peripherals.

### Memory and GPIO Headroom { #memory-and-gpio-headroom }

Use PSRAM and GPIO filters as minimum thresholds, then inspect the selected tier's memory organization and pin allocation. PSRAM capacity affects graphics buffers, audio buffering, ML models, and application working space, but total capacity alone does not guarantee one contiguous memory pool. GPIO headroom should include production test, debug, interrupts, future sensors, and board-control signals, not just the interfaces in the first prototype.

### Display and Graphics { #display-and-graphics }

Filter by the display interface that your panel actually requires, then use the target-resolution setting as a first capacity check. Its width-by-height presets are total-pixel thresholds, not checks of exact aspect ratio or panel timing. Treat the displayed resolution values as catalog screening figures, not guaranteed panel modes or authoritative maxima for every SKU; verify the exact part and panel requirements in SiFli documentation. The selector uses RGB, the common board-design shorthand, for the parallel display interface; its formal name is DPI (Display Pixel Interface). The listed interfaces are not a complete pin-multiplexing inventory. Confirm the exact interface mode, memory budget, pin routing, panel power sequence, and software-driver path in the target part's documentation.

### Audio Interfaces { #audio-interfaces }

The selector has independent minimum-count filters for audio DACs, ADCs, PDM interfaces, and I2S interfaces. Each value is a lower bound, not a bundled audio profile. Then review resource sharing with other peripherals and the board-level analog design.

### Connectivity and Specialist Hardware { #connectivity-and-specialist-hardware }

Apply the Wi-Fi, camera, AI-accelerator, FreeIO, and PTM filters only when the corresponding capability is a product requirement. The external-Wi-Fi checkbox identifies a documented SDIO-based path; it does not indicate built-in Wi-Fi. The separate SDIO-count filter checks the documented number of SDIO interfaces. External Wi-Fi also requires suitable board-level power, routing, and software support. Camera and AI requirements need an end-to-end review of interface, memory bandwidth, processing load, and the software stack. FreeIO and PTM are valuable when flexible signal assignment or deterministic peripheral task handling is central to the design; they should not outweigh more basic power, memory, and package constraints.

### Validation Evidence { #validation-evidence }

Before committing, follow the result link to the product introduction and then verify the exact part number, package, electrical limits, reference design, and available design guide or checklist. Where possible, validate the intended firmware flow on a supported development board whose hardware is the closest match to the target part. The selector is a shortlist tool; the target part's SiFli documentation remains the design authority.

## Choose an Integration Level { #choose-an-integration-level }

The interactive catalog lists chips and modules only. Development boards are shown below as a separate route for validating software and system assumptions.

<div align="center"><em>Hardware Starting Point</em></div>

<div align="center" markdown>

| Starting point | Choose it when | Next step |
|:---------------|:---------------|:----------|
| Chip | You need a custom PCB and direct control over interfaces and power design. | Choose a family, then review its production design guide before schematic work. |
| Module | You want to reduce RF and module-integration work while retaining a custom carrier board. | Check the module introduction, interface definition, and module design guide. |
| Development board | You need to validate software, peripherals, or a product concept quickly. | Start with the board that best matches your intended product, run a verified example, then treat its schematic as a reference—not a production design. |

</div>

## Confirm the Shortlist { #confirm-the-shortlist }

1. **Inspect the exact part.** Use the [SF32 Family Overview](family/SF32_family.md), the result's product introduction, and the [naming rules](family/SF32_namingrule.md) to confirm the orderable part number, package, power topology, memory organization, interface assignment, and reference hardware. Do not choose a part from one headline feature alone: confirm that the required display, audio, storage, sensor, Bluetooth, and low-power features can coexist in the selected package and board design.
2. **Prove the software path.** Before finalizing hardware, use [Getting Started](../getting-started/index.md), [Tutorials](../getting-started/tutorials/overview.md), and [Develop](../develop/index.md) on the available board that best matches your intended hardware.
3. **Check production constraints.** Move to [Design for Production](../hardware/design-for-production.md) before freezing the schematic, layout, BOM, or display and storage choices.
