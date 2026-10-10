---
icon: lucide/battery-charging
description: "Mesurer et optimiser la consommation du SF32 liée à la configuration des horloges, aux modes de veille, à l'affichage, aux intervalles de connexion Bluetooth et aux capteurs pour faire d'un prototype un produit portable conçu pour fonctionner sur batterie."
tags:
    - Développement
    - Énergie
---

# Gestion de l'énergie { #power-management }

Une bonne gestion de l'énergie fait d'un prototype fonctionnel un produit adapté aux appareils portables. Sur SF32, l'optimisation énergétique couvre la configuration des horloges, des modes de veille, du fonctionnement de l'affichage, des intervalles de connexion Bluetooth, des interruptions des capteurs et de l'architecture applicative.

N'optimisez pas la consommation à partir d'extraits de code isolés. Mesurez des scénarios représentatifs du produit : démarrage, inactivité, inactivité avec connexion maintenue, affichage actif, audio actif, réveil par interruption d'un capteur, OTA et arrêt.

## Flux de travail pratique { #practical-workflow }

1. Mesurez l'exemple du SDK sans le modifier.
2. Activez un seul sous-système à la fois.
3. Lors des premières mesures, mesurez séparément l'affichage, le Bluetooth, l'audio, le stockage et l'activité des capteurs.
4. Privilégiez le réveil par interruption à la scrutation.
5. Consignez le courant consommé pour chaque mode et chaque scénario produit.

## Points de départ utiles { #useful-starting-points }

- Exemples de gestion de l'énergie du SDK.
- Profilage de l'utilisation du CPU.
- Inspection du shell RT-Thread.
- Mesure du courant au niveau de la carte.

## Notes de mesure { #measurement-notes }

Consignez chaque mesure avec :

- La carte et sa révision.
- La source d'alimentation et le point de mesure.
- La branche du firmware et la compilation.
- L'état de l'affichage.
- L'état du Bluetooth.
- L'état des capteurs.
- Le niveau de journalisation.
- Le courant moyen, le courant de crête et la durée de mesure.

## Problèmes courants de gestion de l'énergie { #common-power-problems }

<div align="center"><em>Tableau : Problèmes courants de gestion de l'énergie</em></div>

<div align="center" markdown>

| Symptôme | Cause probable |
|:--------|:-------------|
| Courant au repos trop élevé | Boucle de scrutation, journalisation, alimentation de l'affichage ou horloge d'un périphérique restée active. |
| Impossible d'entrer en veille | Minuterie active, périphérique encore ouvert, tâche en attente ou source de réveil non traitée. |
| Pics de courant Bluetooth | Intervalle de connexion, fenêtre de scan, chaîne audio ou retransmissions. |
| L'affichage domine la consommation | Rétroéclairage de l'écran LCD, contenu affiché sur AMOLED, politique de rafraîchissement ou mises à jour partielles. |
| Les mesures varient fortement | Modification du montage d'essai, de l'état de la batterie, du chemin d'alimentation USB ou de la charge de journalisation. |

</div>
