---
icon: lucide/rss
description: "The first μForge.io blog post: our mission, what we've built over the past month, and what's coming next for SF32 documentation."
---

# The First Blog Post [2026-07-31] { #the-first-blog-2026-07-31 }

This is the first post on this blog, so it's a good place to say plainly what μForge.io is for.

Engineers evaluating a new microcontroller shouldn't have to piece together the full picture from a datasheet, a wiki page, and a forum thread scattered across the web. μForge.io brings together information on SiFli's SF32 family of ultra-low-power microcontrollers. These Bluetooth-connected, graphics-capable devices target AIoT products such as wearables, smart displays, and other battery-powered connected products. We organize reference material that's normally scattered across datasheets, wikis, and PDFs around the actual product-development path: choose a part, prove it works, integrate it into the design, and ship. See [About](../../about/index.md) for the longer version.

### Why SF32, right now { #why-sf32-right-now }

Two things made SF32 worth building a whole documentation platform around.

The first is the architectural range. SF32 is not just a faster CPU with more flash. The family spans single-core devices, heterogeneous dual-core designs, and tri-core multimedia platforms. Graphics acceleration and hardware decompression complement these processors, with the exact mix varying by family. This gives product teams different ways to balance application performance, always-on work, and integration cost.

Second, the ecosystem is unusually open. SDK source, hardware application notes, and design guides are publicly available through OpenSiFli's GitHub organization and SiFli's own wiki and documentation, at a level of access many microcontroller vendors don't match. Compared with ecosystems like ESP32 or STM32, SF32 is still little known outside the teams already using it: the materials are genuinely open, but the platform is not yet widely recognized. That's why organizing this documentation is useful now, rather than waiting for the ecosystem to catch up on its own.

### What's happened over the past month { #whats-happened-over-the-past-month }

We went from an initial concept to a working documentation site built with [Zensical](https://zensical.org/). We thank the Zensical team for the static site generator that made this possible. Before writing individual pages, we repeatedly refined the site structure to reflect how engineers approach a project, rather than an org chart or a vendor's existing documentation. Once the structure held up, we built out coverage for the SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x, and SF32LB58x chip families: introductions, comparison data, and hardware design guides, plus information about their modules and development boards. We also shipped an interactive product selector that filters chips and modules by power, memory, display, and interface requirements, avoiding the need to cross-reference five datasheets by hand. The site now includes a Getting Started and Tutorials path, architecture deep dives in Learn (STAR-MC1, PSRAM and memory types, PTM), and production-readiness guidance for taking a design from schematic to shipped hardware.

### What's next { #whats-next }

The immediate focus is coverage and accuracy: expanding hardware design guides and checklists, and continuing to verify content against SiFli's own official documentation as it's updated. Past that, expect more reference designs, more worked examples in Develop and Tutorials, and continued refinement of the product selector as real-world sourcing questions come in.

If you spot something wrong or missing, [tell us](../../about/contact.md) — that feedback is exactly what keeps this useful.
