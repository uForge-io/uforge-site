---
icon: lucide/terminal-square
description: "État actuel de MicroPython sur SF32 : aucun portage officiel trouvé pour l'instant, ainsi que les conditions à remplir avant d'en faire une voie de développement prise en charge."
tags:
    - Développement
    - MicroPython
---

# État de MicroPython { #micropython-status }

Les recherches dans la documentation SiFli et les dépôts OpenSiFli vérifiés n'ont révélé ni portage officiel de MicroPython pour SF32, ni image de firmware, ni procédure de flashage propre à une carte.

Cette vérification a porté sur les [dépôts publics d'OpenSiFli sur GitHub](https://github.com/OpenSiFli/) et le [portail documentaire de SiFli](https://docs.sifli.com/).

Cela ne prouve pas qu'aucune expérimentation privée ou communautaire n'existe. Cela signifie que ce site ne devrait pas présenter MicroPython comme une voie de développement SF32 vérifiée avant qu'une image publique du firmware ou un arbre public du code source puisse être référencé.

## Recommandation actuelle { #current-recommendation }

Ne présentez pas encore MicroPython aux utilisateurs finaux comme une voie de développement SF32 prise en charge. Gardez cette page comme page d'état et feuille de route jusqu'à ce qu'un développeur puisse flasher un livrable public et en reproduire le fonctionnement.

## Ce qu'une page complète doit contenir { #what-a-real-page-needs }

Avant d'en faire un tutoriel standard, SiFli devrait publier :

- Des images de firmware par carte et par configuration mémoire.
- Un dépôt source et des instructions de compilation.
- Une commande de flashage et une commande de récupération.
- L'UART REPL et le débit en bauds.
- Le message de démarrage attendu de MicroPython.
- Les API `machine` prises en charge.
- Le comportement du système de fichiers ainsi que des modes sans échec et de récupération.
- Les limitations connues pour l'affichage, le Bluetooth, le stockage, l'USB et la basse consommation.

## Premier test rapide suggéré { #suggested-first-smoke-test }

Une fois le firmware disponible, le premier test devrait se limiter au port série :

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Ne testez le GPIO qu'une fois les noms de broches documentés.

## Critères d'acceptation minimaux { #minimum-acceptance-criteria }

MicroPython peut passer d'une page de suivi à une page de prise en main lorsque tous les éléments suivants sont disponibles :

- Un dépôt public ou une page des versions.
- Un binaire spécifique à une carte pour au moins un kit de développement SF32.
- Une commande de flashage documentée.
- Un port REPL et un débit en bauds documentés.
- Une voie de récupération vers le firmware SiFli-SDK.
- Une liste des API `machine` prises en charge.
- Au moins un exemple GPIO testé sur du matériel réel.

## Pourquoi c'est important { #why-this-matters }

Une instruction vague du type « télécharger une image MicroPython » n'est pas exploitable. Les utilisateurs ont besoin d'une image exacte, d'une carte compatible, d'un outil de flashage, d'un réglage REPL et d'une voie de récupération. Sans cela, une page MicroPython crée une charge de support au lieu d'aider.
