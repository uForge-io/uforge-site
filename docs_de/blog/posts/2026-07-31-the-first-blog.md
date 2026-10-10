---
icon: lucide/rss
description: "Der erste μForge.io-Blogbeitrag: unsere Mission, was wir im vergangenen Monat aufgebaut haben und was als Nächstes für die SF32-Dokumentation ansteht."
---

# Der erste Blogbeitrag [2026-07-31] { #the-first-blog-2026-07-31 }

Dies ist der erste Beitrag in diesem Blog, daher ist er der richtige Ort, um klar zu sagen, wofür μForge.io da ist.

Wer einen neuen Mikrocontroller bewertet, sollte sich das Gesamtbild nicht aus einem Datenblatt, einer Wiki-Seite und einem Forenthread zusammensuchen müssen, die über das Web verstreut sind. μForge.io bündelt Informationen zur SF32-Familie von SiFli, einer Familie von Mikrocontrollern mit extrem niedrigem Energiebedarf. Diese Bluetooth-fähigen, grafikfähigen Bausteine zielen auf AIoT-Produkte wie Wearables, Smart Displays und andere batteriebetriebene vernetzte Produkte. Wir ordnen Referenzmaterial, das sonst über Datenblätter, Wikis und PDFs verteilt ist, entlang des tatsächlichen Wegs der Produktentwicklung: ein Bauteil auswählen, die Funktion nachweisen, es in das Design integrieren und ausliefern. Die ausführliche Fassung finden Sie unter [Über diese Website](../../about/index.md).

### Warum SF32, und warum jetzt { #why-sf32-right-now }

Zwei Gründe machen SF32 zu einer ganzen Dokumentationsplattform wert.

Der erste ist die architektonische Bandbreite. SF32 ist nicht nur eine schnellere CPU mit mehr Flash. Die Familie reicht von Einkernbausteinen über heterogene Zweikerndesigns bis zu Multimedia-Plattformen mit drei Kernen. Grafikbeschleunigung und Hardware-Dekompression ergänzen diese Prozessoren, wobei die genaue Ausstattung je nach Familie variiert. So haben Produktteams verschiedene Möglichkeiten, Anwendungsleistung, Always-on-Aufgaben und Integrationsaufwand auszubalancieren.

Zweitens ist das Ökosystem ungewöhnlich offen. SDK-Quellcode, Hardware-Anwendungshinweise und Designleitfäden sind über die GitHub-Organisation von OpenSiFli sowie das eigene Wiki und die Dokumentation von SiFli öffentlich zugänglich, in einem Umfang, den viele Mikrocontroller-Hersteller nicht erreichen. Verglichen mit Ökosystemen wie ESP32 oder STM32 ist SF32 außerhalb der Teams, die es bereits einsetzen, noch wenig bekannt: Die Materialien sind tatsächlich offen, die Plattform ist aber noch nicht weithin bekannt. Deshalb ist es sinnvoll, diese Dokumentation jetzt zu ordnen, statt zu warten, bis das Ökosystem von allein aufholt.

### Was im vergangenen Monat passiert ist { #whats-happened-over-the-past-month }

Wir sind von einem ersten Konzept zu einer funktionierenden Dokumentationsseite gekommen, die mit [Zensical](https://zensical.org/) gebaut wurde. Wir danken dem Zensical-Team für den Generator statischer Seiten, der das möglich gemacht hat. Bevor wir einzelne Seiten schrieben, haben wir die Struktur der Website mehrfach überarbeitet, damit sie widerspiegelt, wie Ingenieure ein Projekt angehen, und nicht ein Organigramm oder die bestehende Dokumentation eines Herstellers. Als die Struktur trug, haben wir die Abdeckung für die Chipfamilien SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x und SF32LB58x aufgebaut: Einführungen, Vergleichsdaten und Hardware-Designleitfäden sowie Informationen zu den zugehörigen Modulen und Entwicklungsboards. Außerdem haben wir einen interaktiven Produktselektor veröffentlicht, der Chips und Module nach Anforderungen an Energie, Speicher, Display und Schnittstellen filtert, sodass man fünf Datenblätter nicht mehr von Hand abgleichen muss. Die Website enthält inzwischen einen Pfad „Erste Schritte“ mit Tutorials, architektonische Vertiefungen unter „Lernen“ (STAR-MC1, PSRAM und Speichertypen, PTM) sowie Hinweise zur Produktionsreife, um ein Design vom Schaltplan bis zur ausgelieferten Hardware zu bringen.

### Wie es weitergeht { #whats-next }

Der unmittelbare Fokus liegt auf Abdeckung und Genauigkeit: Hardware-Designleitfäden und Checklisten erweitern und die Inhalte weiter anhand der offiziellen SiFli-Dokumentation prüfen, sobald diese aktualisiert wird. Danach können Sie weitere Referenzdesigns, mehr durchgearbeitete Beispiele unter „Entwicklung“ und in den Tutorials sowie eine fortlaufende Verfeinerung des Produktselektors erwarten, wenn praktische Beschaffungsfragen hinzukommen.

Wenn Ihnen etwas falsch oder lückenhaft erscheint, [sagen Sie uns Bescheid](../../about/contact.md) — genau dieses Feedback hält die Seite nützlich.
