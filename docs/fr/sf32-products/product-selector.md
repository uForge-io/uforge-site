---
icon: lucide/list-checks
description: "Présélectionnez des puces et modules SF32 selon les contraintes du produit, puis validez le parcours d'intégration sur du matériel pris en charge."
tags:
    - Matériel
    - Sélection
hide:
    - toc
---

# Sélecteur de produits SF32 { #sf32-product-selector }

Présélectionnez des puces et modules SF32 avant de figer le schéma. Définissez d'abord les contraintes qu'il serait coûteux de modifier par la suite : alimentation, boîtier, affichage, audio, mémoire, GPIO, connectivité et validation logicielle. Comparez ensuite les candidats restants.

Commencez par le sélecteur interactif. Il répertorie uniquement les puces et les modules et permet de filtrer selon le niveau d'intégration, la capacité PSRAM et GPIO, le boîtier, l'alimentation principale, l'interface d'affichage et la résolution cible, le nombre d'interfaces SDIO, le nombre d'interfaces audio et les fonctions matérielles spécialisées. Chaque résultat renvoie vers la présentation du produit correspondant. Les cartes de développement sont des plateformes de validation distinctes ; elles ne figurent pas dans le sélecteur.

## Sélecteur de produits { #product-selector }

!!! info "Glossaire et nombre d'interfaces audio"
    Consultez le [glossaire](../about/glossary.md) pour les abréviations et les définitions d'interfaces. Une interface PDM peut connecter jusqu'à deux microphones numériques : le nombre d'interfaces PDM ne correspond donc pas au nombre de microphones. Le nombre d'entrées utilisables et leur affectation aux broches dépendent du composant ; vérifiez ces éléments dans sa documentation.

Tous les filtres actifs se combinent : un résultat doit satisfaire chaque critère sélectionné. Le niveau d'intégration, le boîtier, l'alimentation et l'interface d'affichage sont à choix unique. Les valeurs PSRAM et GPIO représentent le besoin de l'application : un composant candidat doit les atteindre ou les dépasser. La mention du « maximum nécessaire » décrit le besoin de l'application ; elle ne fixe pas de limite supérieure à la capacité du composant. La résolution cible, le nombre d'interfaces SDIO et le nombre minimal de chaque type d'interface audio sont également des seuils minimaux. Les cases à cocher ajoutent des fonctions requises (Wi-Fi externe via SDIO, interface caméra DCMI, accélérateur IA/ML, FreeIO ou PTM). Le filtre portant sur le nombre d'interfaces SDIO est distinct de la case Wi-Fi externe.

<div id="uf-product-selector"></div>

<noscript>
Cet outil nécessite JavaScript pour filtrer et afficher le tableau des composants. Si JavaScript est désactivé, consultez plutôt le [tableau comparatif de la famille SF32](family/SF32_family.md).
</noscript>

Le tableau des résultats indique la référence et le boîtier exacts, les capacités mémoire, le nombre maximal de GPIO, les informations d'alimentation et de tension d'E/S, les capacités d'affichage, le nombre d'interfaces audio (DAC/ADC/PDM/I2S), le nombre d'interfaces/canaux périphériques numériques (UART/I2C/SPI/CAN/GPADC), la vitesse USB et les fonctions répertoriées dans le catalogue. Si un nombre ou une valeur est indiqué par `n/a`, cela signifie qu'il n'est pas documenté à ce niveau de détail dans le catalogue ; cela ne correspond ni à zéro ni à une absence de prise en charge. Un tiret dans une colonne de fonctions indique que cette capacité n'est pas signalée dans la fiche du catalogue ; vérifiez-la dans la documentation du composant. La liste des interfaces d'affichage sert à la présélection et ne constitue pas un inventaire complet du multiplexage des broches.

## Critères de sélection { #selection-factors }

Utilisez le sélecteur pour appliquer des critères éliminatoires, pas pour obtenir une recommandation automatique. Commencez par la contrainte qui, découverte trop tard, imposerait de revoir la carte ou le schéma, puis servez-vous des autres critères pour départager les candidats viables.

### Niveau d'intégration { #integration-level }

Déterminez le niveau d'intégration avant de comparer les spécifications détaillées si le calendrier, les travaux RF ou la responsabilité de la carte sont déjà définis. Une puce offre le plus de liberté, mais vous devez alors prendre en charge toute la chaîne : alimentation, RF, horloges, routage et préparation à la production. Un module réduit les travaux de conception et d'intégration au niveau du module, mais la carte porteuse reste à concevoir. Une carte de développement permet de valider rapidement le firmware, le comportement des périphériques et les hypothèses relatives au système ; elle ne constitue pas forcément le matériel adapté à la production.

### Alimentation et boîtier { #power-supply-and-package }

Choisissez tôt l'architecture d'alimentation et le boîtier. Le sélecteur distingue l'alimentation directe par batterie Li-ion (rail de 3,2 à 4,7 V), les composants dont l'alimentation 3,3 V régulée en externe est documentée, et ceux dont l'alimentation principale peut descendre à environ 1,8 V (certaines spécifications fixent la limite basse à 1,71 V). Ces filtres portent sur l'alimentation principale, et non sur la tension d'E/S des GPIO. Les résultats affichent séparément la tension d'E/S nominale, qui n'est pas une plage de fonctionnement garantie ; vérifiez les limites électriques du composant exact. Le boîtier influe aussi sur la surface de la carte, la difficulté du fan-out des broches, le chemin thermique et le nombre de broches réellement disponibles. Le filtre de boîtier utilise des catégories générales ; vérifiez la désignation exacte dans les résultats. Le nombre maximal de GPIO annoncé peut s'avérer insuffisant après réservation des broches pour l'alimentation, les horloges, le débogage, l'affichage, la mémoire et les périphériques indispensables.

### Marge mémoire et GPIO { #memory-and-gpio-headroom }

Utilisez les filtres PSRAM et GPIO comme seuils minimaux, puis examinez l'organisation mémoire et l'affectation des broches de chaque variante retenue. La capacité PSRAM influe sur les tampons graphiques et audio, les modèles d'apprentissage automatique et l'espace de travail de l'application ; sa capacité totale ne garantit toutefois pas un espace mémoire contigu. Prévoyez aussi des GPIO pour les tests de production, le débogage, les interruptions, les futurs capteurs et les signaux de commande de la carte, au-delà des interfaces du premier prototype.

### Affichage et graphismes { #display-and-graphics }

Filtrez d'abord les composants selon l'interface réellement requise par l'écran, puis utilisez la résolution cible comme premier indicateur de capacité. Les valeurs largeur × hauteur définissent des seuils de nombre total de pixels ; elles ne vérifient pas précisément le rapport largeur/hauteur ni les temporisations de la dalle. Les valeurs de résolution affichées sont des repères de présélection du catalogue : elles ne garantissent pas un mode d'affichage donné et ne constituent pas nécessairement les maxima officiels de chaque référence. Vérifiez le composant et les exigences de l'écran dans la documentation SiFli. Le sélecteur utilise RGB, appellation courante en conception de cartes, pour l'interface d'affichage parallèle ; son nom officiel est DPI (Display Pixel Interface). La liste affichée ne constitue pas un inventaire complet du multiplexage des broches. Vérifiez dans la documentation du composant le mode d'interface exact, le budget mémoire, le routage des broches, la séquence d'alimentation de l'écran et la prise en charge de l'écran par le pilote logiciel.

### Interfaces audio { #audio-interfaces }

Le sélecteur propose des filtres indépendants de nombre minimal pour les DAC audio, les ADC, les interfaces PDM et les interfaces I2S. Chaque valeur est un seuil minimal, et non un profil audio combiné. Vérifiez ensuite le partage des ressources avec les autres périphériques et la conception analogique de la carte.

### Connectivité et fonctions matérielles spécialisées { #connectivity-and-specialist-hardware }

N'utilisez les filtres Wi-Fi, caméra, accélérateur d'IA, FreeIO et PTM que si la fonction correspondante est requise par le produit. La case Wi-Fi externe signale une liaison SDIO documentée ; elle n'indique pas la présence d'un Wi-Fi intégré. Le filtre distinct vérifie le nombre d'interfaces SDIO documenté dans le catalogue. Le Wi-Fi externe exige également une alimentation, un routage et un support logiciel adaptés sur la carte. Pour une caméra ou de l'IA, évaluez l'ensemble de la chaîne : interface, bande passante mémoire, charge de calcul et pile logicielle. FreeIO et PTM sont utiles lorsque l'affectation flexible des signaux ou l'exécution déterministe des tâches périphériques est essentielle, mais ne doivent pas faire oublier les contraintes prioritaires d'alimentation, de mémoire et de boîtier.

### Éléments de validation { #validation-evidence }

Avant de vous engager, suivez le lien du résultat vers la présentation du produit et vérifiez la référence exacte du composant, le boîtier, les limites électriques, la conception de référence et les guides ou listes de contrôle disponibles. Validez si possible la procédure prévue pour le firmware sur la carte prise en charge dont la configuration matérielle se rapproche le plus de celle du composant retenu. Le sélecteur sert à établir une présélection ; la documentation SiFli du composant retenu reste la référence pour la conception.

## Choisir un niveau d'intégration { #choose-an-integration-level }

Le catalogue interactif ne contient que des puces et des modules. Les cartes de développement du tableau ci-dessous constituent un parcours distinct pour valider le logiciel et les hypothèses relatives au système.

<div align="center"><em>Point de départ matériel</em></div>

<div align="center" markdown>

| Point de départ | À choisir si… | Étape suivante |
|:---------------|:---------------|:----------|
| Puce | Vous avez besoin d'un PCB personnalisé et d'un contrôle direct des interfaces et de l'alimentation. | Choisissez une famille, puis consultez son guide de conception pour la production avant de commencer le schéma. |
| Module | Vous souhaitez réduire les travaux RF et d'intégration du module tout en conservant une carte porteuse personnalisée. | Consultez la présentation du module, la définition de ses interfaces et son guide de conception. |
| Carte de développement | Vous devez valider rapidement le logiciel, les périphériques ou un concept produit. | Commencez par la carte dont la configuration matérielle correspond le mieux au produit envisagé, exécutez un exemple vérifié et utilisez son schéma comme référence, pas comme conception de production. |

</div>

## Confirmer la présélection { #confirm-the-shortlist }

1. **Inspectez le composant exact.** Consultez la [présentation de la famille SF32](family/SF32_family.md), la page produit du résultat et les [règles de nomenclature](family/SF32_namingrule.md) pour confirmer la référence exacte à commander, le boîtier, l'architecture d'alimentation, l'organisation mémoire, l'affectation des interfaces et le matériel de référence. Ne choisissez pas un composant sur la base d'une seule caractéristique mise en avant : vérifiez que l'affichage, l'audio, le stockage, les capteurs, le Bluetooth et les fonctions basse consommation nécessaires peuvent coexister dans le boîtier et la carte retenus.
2. **Validez le parcours logiciel.** Avant de figer le matériel, suivez [Premiers pas](../getting-started/index.md), les [Tutoriels](../getting-started/tutorials/overview.md) et la section [Développement](../develop/index.md) sur la carte disponible dont la configuration matérielle se rapproche le plus de celle prévue.
3. **Vérifiez les contraintes de production.** Consultez [Conception pour la production](../hardware/design-for-production.md) avant de figer le schéma, le routage, la nomenclature ou les choix d'affichage et de stockage.
