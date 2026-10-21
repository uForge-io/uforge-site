---
icon: lucide/braces
description: "MicroPython n'est pas encore une prise en main SF32 validée : utilisez SiFli-SDK pour un premier démarrage reproductible et suivez la page d'état MicroPython."
tags:
    - Prise en main
    - MicroPython
---

# MicroPython { #micropython }

Aucune procédure de prise en main de MicroPython pour SF32 n'a encore été validée. Les sources SiFli et OpenSiFli consultées ne décrivent actuellement ni image officielle du firmware pour une carte précise, ni procédure de flashage, ni configuration du REPL.

Suivez les étapes de [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) pour vérifier la carte et son câble, identifier le port série et flasher le firmware, afin de disposer d'une configuration de référence reproductible. Ne suivez pas les instructions d'installation MicroPython génériques et n'utilisez pas une image destinée à un autre microcontrôleur ou à une autre carte.

La page [État de MicroPython](../../develop/platforms/micropython/status.md) recense les artefacts publics et critères d'acceptation nécessaires pour faire de cette page un tutoriel.

!!! warning "Aucun tutoriel MicroPython vérifié pour le moment"
    Un guide MicroPython utilisable pour SF32 nécessite une image de firmware compatible avec la carte et sa configuration mémoire, des commandes de flashage et de récupération, le port et le débit en bauds du REPL, le comportement du système de fichiers et une matrice de prise en charge des périphériques qui reflète fidèlement les capacités réelles. Tant que ces informations ne sont pas publiées, cette page ne fournit volontairement aucune étape d'installation.

## Conditions pour un tutoriel vérifié { #what-sifli-should-publish }

Avant de suivre un futur tutoriel MicroPython pour SF32, vérifiez qu'il indique une image de firmware compatible avec la carte, des commandes de flashage et de récupération testées, le port et le débit en bauds du REPL, le comportement du système de fichiers et une matrice actualisée des périphériques pris en charge. Tant que ces informations ne figurent pas sur la [page d'état](../../develop/platforms/micropython/status.md), utilisez la procédure SiFli-SDK décrite ci-dessus pour la première mise en route.
