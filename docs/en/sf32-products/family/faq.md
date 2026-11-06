---
icon: lucide/circle-help
description: "SF32 product FAQ: choosing chips, modules and boards; memory and interface requirements; Bluetooth, GPIOs, module markings, availability and customization."
tags:
    - Hardware
    - FAQ
---

# SF32 FAQ { #sf32-faq }

## Choosing a Product { #choosing-a-product }

### Which SF32 family should I choose? { #choosing-a-family }

Start with these critical selection factors:

- **Display resolution:** Required pixel count, display interface, refresh rate and framebuffer memory.
- **Bluetooth mode:** BLE-only or dual-mode BLE and Classic Bluetooth.
- **GPIO count:** Usable pins after accounting for interface and memory assignments.
- **Package size:** Footprint, pin pitch and PCB assembly requirements.
- **Power supply:** Battery or regulated supply, operating voltage range and I/O levels.
- **Audio functions:** ADC/DAC, I2S and PDM requirements, including microphone channels.

Compare exact parts rather than choosing by family number alone: a higher number is not automatically the best fit. The [Product selector](../product-selector.md) provides filters for package, power, display, GPIO, audio, and other criteria, but not for Bluetooth mode. Use the available filters to shortlist candidates, then confirm BLE/Classic support on the exact part page.

[Family comparison](SF32_family.md) · [Product selector](../product-selector.md)

### Should I use a chip, module, or development board? { #chip-or-modules }

Use a development board to evaluate the platform and prove the firmware. Use a module to reduce RF, crystal and memory-routing work on a product carrier board. It can also lower overall development cost. For lower-volume products, a module outsources the supply chain of the components inside it, and its RF certification can prove very useful in some parts of the world. Choose chip-down when cost, size or hardware flexibility justifies owning the schematic, layout and RF work. Neither route removes finished-product validation. More modules will be listed as they become available.

[Plan a Product](product-planning.md)

### Which development board should I start with? { #choosing-a-board }

Start with the display-focused LCD board for your chip family: [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) (N32R16 memory variant) or [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) (N16R32N1 variant). For SF32LB52x there are also compact boards: [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) and [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) (wearable low-power evaluation). Check that the board's memory variant matches your target part; SiFli's official board-model guide lists all boards.

[Product selector](../product-selector.md) · [Official board-model guide](https://wiki.sifli.com/en/board/devkit_guide.html)

### How do I read chip and module part numbers? { #reading-part-numbers }

Read the complete order code, not just the family prefix. Chip codes distinguish device, package and memory configuration; module suffixes describe fitted storage and memory options. Use the naming guide's examples and legacy exceptions, then confirm the exact orderable configuration with its supplier.

[SF32 naming convention](SF32_namingrule.md)

## Memory and Specifications { #memory-and-specifications }

### What is the difference between SRAM, PSRAM, and Flash? { #memory-types }

SRAM and PSRAM hold runtime data and lose it when their supply is removed; supported retention modes are device-dependent. On-chip SRAM and external or co-packaged PSRAM differ in access path, bandwidth and power. Flash is nonvolatile storage for firmware and assets. More Flash does not replace a shortage of working RAM.

[Memory types](../../learn/architecture/psram-and-memory-types.md)

### How much memory does my application need? { #sizing-memory }

Budget working RAM for the OS, stacks, heap, graphics buffers, audio and other concurrent tasks. A basic framebuffer needs width × height × bytes per pixel × buffer count; allow for stride alignment and additional rendering buffers. Separately budget nonvolatile storage for firmware, fonts, images, audio, files and OTA images. Measure peak usage on the intended workload.

[Graphics overview](../../learn/graphics/overview.md) · [Plan a Product](product-planning.md)

### When should I choose NOR, NAND, or eMMC? { #choosing-storage }

Choose from the required boot path, capacity, access pattern and software support, not capacity alone. NOR commonly supports code and random reads; NAND needs suitable management for erase blocks, ECC and bad blocks; eMMC includes a managed storage controller. In these module descriptions, SPI-NAND and QSPI-NAND refer to the same storage option, not a discrepancy between products. Confirm bootloader, driver and filesystem support for the exact device.

[Memory types](../../learn/architecture/psram-and-memory-types.md) · [Module suffix codes](SF32_namingrule.md#module-naming)

### Does every part support all features listed for its family? { #family-versus-sku }

No. A family summary may combine capabilities from several parts. Memory, supply requirements, usable pins and exposed interfaces can depend on the exact SKU, package and multiplexing. A peripheral present in the chip may not be exposed by a module or development board. Check the part's variant table, datasheet and pinout, plus the SDK support for the required function.

[Family comparison](SF32_family.md) · [Product selector](../product-selector.md)

## Application Fit { #application-fit }

### How do I choose a device for my display? { #choosing-a-display }

Match the panel's electrical interface and timing first, then check resolution, pixel format, refresh target, framebuffer memory and bandwidth. A maximum-resolution figure alone does not guarantee smooth performance. Confirm the required graphics acceleration and panel driver, then test representative screens and animations on the intended memory configuration.

[Per-Device Interface Matrix](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [Display controller](../../learn/graphics/display-controller.md) · [Graphics overview](../../learn/graphics/overview.md)

### How do I check audio and microphone support? { #audio-and-microphones }

Check ADC and DAC channels for analog paths, I2S for digital audio devices, and PDM for digital microphones. One PDM interface can carry up to two microphone channels; interface count is not microphone count. Usable channels still depend on pin exposure, multiplexing, driver support and board routing. Confirm the intended configuration rather than adding interface counts together.

[Audio overview](../../learn/audio/overview.md) · [Glossary](../../about/glossary.md)

### Which products support BLE, Classic Bluetooth, or both? { #bluetooth-modes }

SF32LB55x is BLE-only; the SF32LB52x, SF32LB56x, SF32LB57x and SF32LB58x families offer dual-mode Bluetooth. Radio capability does not guarantee every profile, codec or feature in every SDK configuration. Check the required application profile and its tested example; BLE support alone does not establish support for Classic Bluetooth audio or BLE Audio.

[Family comparison](SF32_family.md) · [Bluetooth overview](../../learn/bluetooth/overview.md)

### Does my design need an external Wi-Fi device? { #wifi }

The SF32 products catalogued here do not provide an integrated Wi-Fi radio. The selector's Wi-Fi option identifies an external SDIO-based path, not built-in Wi-Fi. An external device also needs compatible power, pins, drivers and networking software; the presence of SDIO alone is not proof of a working solution.

[Product selector](../product-selector.md)

### How many GPIOs are actually available? { #usable-gpios }

Use the exact package and memory configuration, then subtract pins committed to your required interfaces and board functions. A module exposes only part of the chip's pin set. On SF32LB57x BGA112, any additional MPI3/static-output pins are restricted-function pins, not freely assignable GPIOs. Do not treat a headline pin count as a guaranteed application GPIO budget.

[Family GPIO notes](SF32_family.md) · [SF32LB57x variants](../chips/SF32LB57x.md)

## Availability and Product Planning { #availability-and-product-planning }

### What do module regulatory markings mean for my product? { #module-markings }

Use the module page's label summary to identify the marked variants and request the applicable approval documents and integration conditions. A printed FCC identifier or CE mark is not, by itself, evidence that your finished product is covered. Changes to the antenna, carrier or enclosure require review against the applicable conditions.

[52 module markings](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [56 module markings](../modules/SF32LB56-MOD.md#regulatory-markings) · [58 module markings](../modules/SF32LB58-MOD.md#regulatory-markings)

### Can I request another memory or module configuration? { #custom-configurations }

Contact μForge.io with the desired chip or module, storage and PSRAM capacities, interfaces, antenna requirements, expected volume and schedule. Confirm feasibility, SDK support, minimum order quantity and lead time before committing the design. A configuration shown in an older document is not a guarantee of current availability; SF32LB58-MOD-E4R32N1 is no longer available due to memory-chip supply shortages.

[Contact μForge.io](../../about/contact.md) · [58 module availability](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### How do I confirm availability and obtain samples? { #samples-and-documentation }

Use the selected product page's purchasing and documentation links, and specify the complete order code and required revision when contacting the supplier. Confirm current availability, memory configuration, antenna option and lead time. Start from a supported evaluation board where possible, and use the exact part's official documentation rather than a family summary as the final design reference.

[Contact μForge.io](../../about/contact.md) · [Product selector](../product-selector.md)
