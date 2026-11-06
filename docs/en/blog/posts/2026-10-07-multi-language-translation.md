---
icon: lucide/rss
description: "μForge.io now has translations in seven more languages, built with LLM tools over many iterations."
---

# Multi-Language Translation, One Iteration at a Time [2026-10-07] { #multi-language-translation-2026-10-07 }

Embedded engineers read documentation in the language they think in, so μForge.io now has translations in Chinese, Japanese, Spanish, German, French, Portuguese, and Russian, alongside the English original.

### Built with LLM tools, over many iterations { #built-with-llm-tools }

None of this would have been practical without LLM tools, and we are grateful for them. It was not a single run, though. It took many iterations, for two reasons. The first is the limited usage plan: a long translation job regularly hit its limit before the pages were done and had to wait for a reset or continue elsewhere. ChatGPT's repeated free usage-limit resets helped a great deal, and we are grateful for them. The second is that translating this way is slow and inefficient: technical pages are long and full of tables, code, pin names, and cross-links, so each pass produced something that needed checking, fixing, and re-running.

### Keeping translations consistent { #keeping-translations-consistent }

To make the iterations converge, we maintain a glossary of terms that must stay untranslated (part numbers, units, protocol names) or use an approved rendering, plus a QA checklist covering technical completeness, link and anchor correctness, and Markdown and code safety. Each locale keeps the same page structure as the English source. Strict-mode builds catch broken links and other build errors; a separate path-parity audit checks for missing or extra pages before release.

### A caveat and a request { #caveat-and-request }

These are machine-assisted translations, and the English pages remain the reference. Since none of these languages is native to us, some pages may not read naturally to native speakers. When a technical detail matters for your design, check it against the English page and SiFli's official documentation. If you find a mistranslation or an awkward term, or think a page could be improved, [tell us](../../about/contact.md); recurring terminology issues go into the glossary, while other suggestions are reviewed against the relevant page.

### Next { #next }

We will keep refining terminology, seek native-reader review where we can, and keep the translations in step as the English pages change.
