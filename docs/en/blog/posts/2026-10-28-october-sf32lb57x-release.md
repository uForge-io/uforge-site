---
icon: lucide/rss
description: "SF32LB57x is now documented: about twice the application CPU compute of SF32LB56x, ePicasso 3.0 graphics, and a competitive cost structure."
---

# October: Introducing SF32LB57x [2026-10-28] { #october-sf32lb57x-2026-10-28 }

This month, μForge.io added the SF32LB57x family. It is the enhanced step up from SF32LB52x and SF32LB56x, with considerably more CPU computing power and graphics capability, while keeping a very competitive cost structure.

### More CPU computing power { #more-cpu-power }

SF32LB52x and SF32LB56x each pair one 240 MHz Cortex-M33 application core with a low-power core. SF32LB57x uses two 240 MHz Cortex-M33 STAR-MC1 performance cores plus a 24 MHz low-power core that serves as the dedicated Bluetooth controller. The two performance cores are rated together at 1968 CoreMark / 740 DMIPS, about twice the 984 CoreMark / 370 DMIPS of the SF32LB56x application core. That headroom lets UI rendering, application logic, and audio or multimedia processing run on separate cores instead of competing for one, while Bluetooth and sensor work stay on the low-power path.

### More graphics capability { #more-graphics-capability }

Graphics moves up to ePicasso 3.0 with eZip 3.0 hardware decompression, compared with ePicasso 2.0 Lite on SF32LB52x and ePicasso 2.0 on SF32LB56x. ePicasso 3.0 accelerates real-time rotation, scaling, projection, mirroring, and alpha blending, and eZip 3.0 decompresses eZip, JPEG, and MJPEG assets without a CPU-heavy decode path. Around the cores, the family adds DCMI camera input, up to 48 MB of in-package PSRAM and 32 MB of in-package NOR Flash on selected parts, two audio ADCs, two CAN interfaces, and PTM, a parallel task machine that offloads timing-sensitive peripheral work.

### A competitive cost structure { #competitive-cost-structure }

The step up does not move SF32LB57x into a different cost class. In our view, it keeps a very competitive cost structure for the compute and graphics it provides, and the compact QFN68 (7 × 7 mm), QFN80 (8 × 8 mm), and BGA112 (5.4 × 4.4 mm) packages help keep board size and complexity in check. That makes it a natural candidate for products that have outgrown SF32LB52x or SF32LB56x, such as richer smartwatch interfaces, camera-enabled handhelds, and display-centric compact terminals, without moving to a flagship-class platform.

### Documentation and where to start { #documentation-and-where-to-start }

The [SF32LB57x chip page](../../sf32-products/chips/SF32LB57x.md) has the full overview, and the part records are in the [product selector](../../sf32-products/product-selector.md). The [hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) follows the same schematic, PCB layout, checklist, and review structure as the other families. Choose the exact orderable part before reusing a schematic, since the package and power baseline determine details such as how many GPIOs are usable, and confirm final numbers against SiFli's datasheets.

### Also this month { #also-this-month }

Korean joined as the ninth language, and the translations described in the [previous post](2026-10-07-multi-language-translation.md) are now published. They remain machine-assisted and may not read naturally to native speakers; if a page needs improvement, [please tell us](../../about/contact.md).
