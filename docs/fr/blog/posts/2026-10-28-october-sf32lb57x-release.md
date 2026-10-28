---
icon: lucide/rss
description: "SF32LB57x est désormais documenté : environ deux fois la puissance CPU applicative de SF32LB56x, graphismes ePicasso 3.0 et une structure de coûts compétitive."
---

# Octobre : présentation de SF32LB57x [2026-10-28] { #october-sf32lb57x-2026-10-28 }

Ce mois-ci, μForge.io a ajouté la famille SF32LB57x. Elle est l'évolution renforcée de SF32LB52x et SF32LB56x, avec nettement plus de puissance de calcul CPU et de capacités graphiques, tout en conservant une structure de coûts très compétitive.

### Plus de puissance de calcul CPU { #more-cpu-power }

SF32LB52x et SF32LB56x associent chacun un cœur applicatif Cortex-M33 à 240 MHz et un cœur basse consommation. SF32LB57x utilise deux cœurs hautes performances Cortex-M33 STAR-MC1 à 240 MHz, plus un cœur basse consommation à 24 MHz qui sert de contrôleur Bluetooth dédié. Les deux cœurs hautes performances totalisent 1968 CoreMark / 740 DMIPS, soit environ le double des 984 CoreMark / 370 DMIPS du cœur applicatif de SF32LB56x. Cette marge permet d'exécuter le rendu de l'interface, la logique applicative et le traitement audio ou multimédia sur des cœurs distincts plutôt que de se disputer un seul cœur, tandis que Bluetooth et les capteurs restent sur la voie basse consommation.

### Plus de capacités graphiques { #more-graphics-capability }

Les graphismes passent à ePicasso 3.0 avec décompression matérielle eZip 3.0, contre ePicasso 2.0 Lite sur SF32LB52x et ePicasso 2.0 sur SF32LB56x. ePicasso 3.0 accélère en temps réel la rotation, la mise à l'échelle, la projection, la symétrie et le mélange alpha, et eZip 3.0 décompresse les ressources eZip, JPEG et MJPEG sans décodage gourmand en CPU. Autour des cœurs, la famille ajoute une entrée caméra DCMI, jusqu'à 48 Mo de PSRAM et 32 Mo de NOR Flash intégrés au boîtier sur certaines références, deux ADC audio, deux interfaces CAN et PTM, une machine de tâches parallèles qui prend en charge les tâches de périphériques sensibles au timing.

### Une structure de coûts compétitive { #competitive-cost-structure }

Ce saut ne fait pas passer SF32LB57x dans une autre catégorie de coût. À notre avis, il conserve une structure de coûts très compétitive pour la puissance de calcul et les capacités graphiques offertes, et les boîtiers compacts QFN68 (7 × 7 mm), QFN80 (8 × 8 mm) et BGA112 (5,4 × 4,4 mm) aident à maîtriser la taille et la complexité de la carte. C'est un candidat naturel pour les produits qui dépassent SF32LB52x ou SF32LB56x, comme des interfaces de montre connectée plus riches, des appareils portables avec caméra et des terminaux compacts centrés sur l'affichage, sans passer à une plateforme haut de gamme.

### Documentation et par où commencer { #documentation-and-where-to-start }

La [page de la puce SF32LB57x](../../sf32-products/chips/SF32LB57x.md) donne la présentation complète et les références figurent dans le [sélecteur de produits](../../sf32-products/product-selector.md). Le [guide de conception matérielle](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) suit la même structure schéma, routage PCB, liste de contrôle et revue que les autres familles. Choisissez la référence commandable exacte avant de réutiliser un schéma, car le boîtier et la base d'alimentation déterminent des détails comme le nombre de GPIO utilisables, et confirmez les valeurs finales dans les fiches techniques de SiFli.

### Aussi ce mois-ci { #also-this-month }

Le coréen devient la neuvième langue, et les traductions décrites dans l'[article précédent](2026-10-07-multi-language-translation.md) sont désormais publiées. Elles restent assistées par machine et peuvent ne pas sembler naturelles aux locuteurs natifs ; si une page mérite d'être améliorée, [dites-le-nous](../../about/contact.md).
