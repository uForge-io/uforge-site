---
icon: lucide/rss
description: "Der erste μForge.io-Blogbeitrag: unsere Mission, was wir im vergangenen Monat aufgebaut haben und was als Nächstes für die SF32-Dokumentation ansteht."
---

# Der erste Blogbeitrag [2026-07-31] { #the-first-blog-2026-07-31 }

Als erster Beitrag in diesem Blog bietet sich dieser Text an, um klar zu sagen, wofür μForge.io steht.

Wer einen neuen Mikrocontroller bewertet, sollte sich das Gesamtbild nicht mühsam aus einem Datenblatt, einer Wiki-Seite und einem Forenthread zusammensuchen müssen, die über das Web verstreut sind. μForge.io bündelt Informationen zur SF32-Familie von SiFli, einer Familie von Mikrocontrollern mit sehr niedrigem Stromverbrauch. Die Bluetooth-fähigen Mikrocontroller mit Grafikfunktionen richten sich an AIoT-Produkte wie Wearables, Smart Displays und andere vernetzte, batteriebetriebene Produkte. Referenzmaterial, das sonst über Datenblätter, Wikis und PDFs verstreut ist, ordnen wir entlang des tatsächlichen Produktentwicklungswegs: Bauteil auswählen, Funktion nachweisen, ins Design integrieren und das Produkt ausliefern. Mehr dazu erfahren Sie unter [Über μForge.io](../../about/index.md).

### Warum SF32, und warum jetzt { #why-sf32-right-now }

Zwei Gründe sprachen dafür, eine vollständige Dokumentationsplattform rund um SF32 aufzubauen.

Der erste Grund ist die architektonische Bandbreite. SF32 ist nicht einfach eine schnellere CPU mit mehr Flash: Die Familie reicht von Einkernbausteinen über heterogene Zweikerndesigns bis hin zu Multimedia-Plattformen mit drei Kernen. Grafikbeschleunigung und Hardware-Dekompression ergänzen die Prozessoren; die genaue Ausstattung variiert je nach Familie. So können Produktteams Anwendungsleistung, Always-on-Aufgaben und Integrationsaufwand gegeneinander abwägen.

Der zweite Grund ist das ungewöhnlich offene Ökosystem. SDK-Quellcode, Hardware-Anwendungshinweise und Designleitfäden sind über die GitHub-Organisation von OpenSiFli sowie über das SiFli-Wiki und die SiFli-Dokumentation öffentlich zugänglich. Diese Offenheit bieten viele Mikrocontroller-Hersteller nicht in vergleichbarem Umfang. Während Ökosysteme wie ESP32 oder STM32 weithin bekannt sind, kennen außerhalb der bestehenden Anwenderteams noch wenige SF32. Gerade deshalb lohnt es sich, die bereits offenen Materialien jetzt übersichtlich aufzubereiten, statt darauf zu warten, dass das Ökosystem von selbst bekannter wird.

### Was im vergangenen Monat passiert ist { #whats-happened-over-the-past-month }

Aus einem ersten Konzept ist eine funktionsfähige Dokumentationswebsite auf Basis von [Zensical](https://zensical.org/) geworden. Dem Zensical-Team danken wir für den Generator für statische Websites, der das ermöglicht hat. Bevor wir einzelne Seiten schrieben, haben wir die Informationsarchitektur mehrfach überarbeitet. Sie sollte zeigen, wie Ingenieure ein Projekt angehen – nicht ein Organigramm oder die bestehende Dokumentationsstruktur eines Herstellers abbilden. Nachdem diese Struktur stand, haben wir Inhalte zu den Chipfamilien SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x und SF32LB58x ergänzt: Einführungen, Vergleichsdaten, Hardware-Design-Leitfäden sowie Informationen zu den zugehörigen Modulen und Entwicklungsboards. Hinzu kam ein interaktiver Produktselektor, der Chips und Module nach Anforderungen an Energiebedarf, Speicher, Display und Schnittstellen filtert. So müssen Entwickler nicht mehr fünf Datenblätter von Hand abgleichen. Außerdem bietet die Website einen Bereich „Erste Schritte“ mit Tutorials, technische Vertiefungen unter „Lernen“ (STAR-MC1, PSRAM und Speichertypen, PTM) und Leitfäden, die den Weg vom Schaltplan bis zur ausgelieferten Hardware begleiten.

### Wie es weitergeht { #whats-next }

Unser unmittelbarer Fokus liegt auf einer breiteren und genaueren Abdeckung: Wir erweitern die Hardware-Design-Leitfäden und Checklisten und gleichen die Inhalte weiterhin mit der offiziellen SiFli-Dokumentation ab, sobald sie aktualisiert wird. Danach folgen weitere Referenzdesigns, durchgearbeitete Beispiele unter „Entwicklung“ und in den Tutorials sowie Verbesserungen am Produktselektor, sobald weitere Fragen aus der Praxis hinzukommen.

Wenn Ihnen etwas falsch oder lückenhaft erscheint, [sagen Sie uns Bescheid](../../about/contact.md) — genau dieses Feedback hält die Seite nützlich.
