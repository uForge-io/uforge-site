---
icon: lucide/cpu
description: "Présentation du processeur STAR-MC1 d'Arm China, basé sur Armv8-M Mainline, de son modèle logiciel par rapport à Cortex-M33 et de ses implications pour le firmware SF32."
tags:
    - Architecture
---
# STAR-MC1 { #star-mc1 }

## Introduction { #introduction }

**STAR-MC1** est une IP de processeur conçue par Arm China et basée sur **Armv8-M Mainline**, le même profil d'architecture que celui utilisé par Cortex-M33. Le modèle logiciel Armv8-M reste donc familier, mais cela ne garantit pas la réutilisation sans modification d'un firmware pour Cortex-M33. Les extensions architecturales optionnelles, la configuration du cœur, les périphériques du SoC, la configuration de démarrage et de l'éditeur de liens, ainsi que la prise en charge par le SDK peuvent différer. Considérez les logiciels destinés à Cortex-M33 comme un point de départ pour le portage et validez-les avec le composant et le SDK cibles.

Sur les composants SF32 qui intègrent STAR-MC1, la documentation SiFli peut désigner le processeur applicatif par **Arm Cortex-M33**, **Cortex-M33 STAR-MC1** ou simplement **STAR-MC1**, selon le contexte et le niveau de détail. Ces appellations ne permettent pas, à elles seules, de confirmer les fonctions optionnelles du cœur ni la configuration exacte du SoC ; pour choisir un composant, vérifiez la documentation de chaque référence envisagée.

Consultez cette page si vous connaissez la famille Arm Cortex-M et souhaitez situer correctement STAR-MC1 pour le développement logiciel, les performances ou le choix d'un composant. Elle explique ce qui reste familier, ce qui peut varier selon l'implémentation du SoC et pourquoi STAR-MC1 ne doit pas être considéré comme un remplacement direct du Cortex-M7.

La compatibilité désigne ici le modèle logiciel architectural commun d'Armv8-M, pas une image de firmware directement interchangeable. Avant de réutiliser un firmware, vérifiez les fonctions du cœur, les options du compilateur, le code de démarrage, le placement mémoire défini par l'éditeur de liens, l'affectation des interruptions, les pilotes de périphériques et la configuration de sécurité du SoC et du SDK cibles.

## Positionnement pour les développeurs { #positioning-for-developers }

Il est plus juste de ne **pas** considérer STAR-MC1 comme « un processeur fixe situé entre Cortex-M33 et Cortex-M7 ». STAR-MC1 est une IP de processeur **Armv8-M Mainline** configurable et compatible avec Cortex-M33. Elle permet d'associer le modèle logiciel familier des MCU à des fonctions optionnelles de mémoire et d'accélération — cache, mémoire étroitement couplée (TCM), instructions DSP, interface de coprocesseur et TrustZone — si le SoC final les intègre.

<div align="center"><em>Tableau : Où se situe STAR-MC1 dans le paysage Cortex-M</em></div>

<div align="center" markdown>

| Si vous connaissez | Ce qui reste familier avec STAR-MC1 | La différence pratique | Ne supposez pas que |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | Le développement sans OS (bare metal) ou avec RTOS, les interruptions, le DMA et le développement des pilotes de périphériques. | STAR-MC1 utilise le modèle logiciel Armv8-M, plus récent, et peut offrir de meilleures options mémoire et d'accélération. | Les binaires Cortex-M4, les hypothèses Armv7E-M et les fonctions de débogage ou de sécurité sont directement transposables. |
| Cortex-M33 | Le modèle Armv8-M de programmation, d'exceptions et de chaîne d'outils. | Selon l'implémentation du SoC, le sous-système mémoire peut offrir une meilleure marge de performance pour les charges qui sollicitent fortement la Flash ou la PSRAM, l'interface utilisateur, l'audio ou la connectivité. | Chaque composant basé sur STAR-MC1 active le cache, la TCM, le DSP, le FPU, le CDE ou TrustZone. |
| Cortex-M7 | La nécessité de gérer le placement mémoire, le comportement du cache, la cohérence avec le DMA et les contraintes de latence temps réel. | STAR-MC1 conserve une base Armv8-M de classe MCU et vise les conceptions IoT flexibles et économes en énergie. | STAR-MC1 est un remplacement direct du Cortex-M7, ou offre le même débit, le même système mémoire et le même écosystème logiciel. |

</div>

Pour un projet SF32, choisissez le composant en fonction de ses caractéristiques mémoire, de ses périphériques et de la prise en charge par le SDK, et non sur la seule mention STAR-MC1. La documentation publique de STAR-MC1 décrit Armv8-M et présente le cache, la TCM, le DSP, les interfaces de coprocesseur ainsi que TrustZone comme des fonctions possibles. La documentation du SoC doit confirmer celles qui sont implémentées et activées dans le produit choisi.

## Pourquoi STAR-MC1 compte { #why-star-mc1-matters }

Les MCU Cortex-M33 traditionnels excellent dans le contrôle embarqué sécurisé et basse consommation. Toutefois, les produits connectés modernes ont souvent besoin de davantage que de la logique de contrôle. Les objets connectés portés, les écrans intelligents, les produits audio Bluetooth et les appareils d'IA en périphérie peuvent également exiger une interface utilisateur réactive, plus de mémoire externe, du traitement du signal et des transferts fréquents de données graphiques ou audio.

STAR-MC1 peut répondre à ces charges grâce aux caches, à la TCM et aux instructions personnalisées optionnels, lorsque le SoC les implémente et que le logiciel les exploite efficacement. Ces fonctions peuvent réduire les attentes mémoire ou accélérer certaines opérations tout en conservant le modèle de développement des MCU. Vérifiez les gains de performance et d'énergie sur l'appareil final avec des charges représentatives ; le nom du cœur ne garantit aucun de ces gains.

## Comparaison de la famille Cortex-M { #cortex-m-family-comparison }

Le tableau suivant résume où se situe STAR-MC1 parmi les processeurs Cortex-M courants. Les capacités exactes dépendent de l'implémentation finale du SoC, mais le positionnement est utile lors du choix d'une architecture pour un produit.

Par souci de concision, le tableau utilise `CM3`, `CM4`, `CM33`, `CM55` et `CM7` pour désigner les processeurs Cortex-M correspondants.

<div align="center"><em>Tableau : Comparaison de la famille Cortex-M</em></div>

<div align="center" markdown>

| Fonctionnalité | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Architecture Arm | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| Pipeline | 3 étages, exécution dans l'ordre | 3 étages, exécution dans l'ordre | 3 étages, exécution dans l'ordre | Exécution dans l'ordre ; nombre d'étages non précisé dans le TRM public | 4 étages, exécution dans l'ordre ; 5 étages avec Helium | 6 étages, superscalaire |
| Interface principale du bus système | 3 × AMBA AHB-Lite (Harvard) | 3 × AMBA AHB-Lite (Harvard) | 2 interfaces AMBA 5 AHB5 : C-AHB + S-AHB | 2 interfaces AMBA 5 AHB5 : C-AHB + S-AHB | AMBA 5 AXI5 64 bits ; interface périphérique AHB 32 bits ; interface esclave AHB 64 bits pour la TCM | AMBA 4 AXI 64 bits ; interface périphérique AHB 32 bits ; interface esclave AHB 32 bits pour la TCM |
| Prise en charge de TrustZone | Non | Non | Optionnelle ; dépend du SoC | Optionnelle ; dépend du SoC | Optionnelle ; dépend du SoC | Non |
| Instructions DSP | Pas d'extension DSP dédiée | Extension DSP native | Extension DSP optionnelle | Extension DSP optionnelle | Extension DSP native ; Helium (MVE) optionnel | Extension DSP native |
| Arm Helium (MVE) | Non pris en charge | Non pris en charge | Non pris en charge | Non pris en charge | Optionnel ; MVE entier ou virgule flottante, selon configuration | Non pris en charge |
| Unité à virgule flottante | Pas de fonction native dans l'IP | Simple précision optionnelle | Simple précision optionnelle | Simple précision optionnelle | FP16/FP32/FP64 scalaire optionnel ; FP16/FP32 vectoriel optionnel | Simple/double précision optionnelle |
| I-cache / D-cache | Non inclus dans l'IP du processeur ; un cache peut être ajouté au niveau du SoC | Non inclus dans l'IP du processeur ; un cache peut être ajouté au niveau du SoC | Non inclus dans l'IP du processeur ; un cache peut être ajouté au niveau du SoC | En option dans l'IP ; présence et configuration selon l'implémentation | En option dans l'IP ; présence et configuration selon l'implémentation | En option dans l'IP ; présence et configuration selon l'implémentation |
| Instructions personnalisées Arm / CDE | Pas de fonction native dans l'IP | Pas de fonction native dans l'IP | Arm définit l'encodage CDE ; le SoC définit les opérations et chemins de données personnalisés ; CDE entier optionnel, CDE flottant selon la FPU/configuration | Le TRM STAR-MC1 décrit les modules GPR CDE et FPCDE ; implémentation et disponibilité dans le produit selon la configuration du SoC | Arm définit l'encodage CDE ; le SoC définit les opérations et chemins de données personnalisés ; en option à partir de r1, indisponible en r0 | Pas de fonction native dans l'IP |
| Compatibilité logicielle | Base | Compatible CM3 | Modèle logiciel Armv8-M ; nécessite des outils Armv8-M | Compatible CM33 | Compatible CM33 ; Helium nécessite un support de chaîne d'outils Armv8.1-M | Compatible CM4 (même famille Armv7E-M) |
| Valeurs de référence CoreMark/MHz* | 3,34 | 3,42 | 4,02 | 4,02† | 4,20 | 5,01 |
| Demande de puissance relative (qualitative)‡ | Très faible | Faible | Faible | Faible | Moyenne | Élevée |
| Profil de calcul (qualitatif) | Contrôle scalaire basse consommation | DSP scalaire temps réel | MCU scalaire sécurisé et configurable | CPU scalaire compatible CM33 ; le cache, la TCM et les instructions personnalisées implémentés par le SoC peuvent améliorer la performance au niveau système | DSP/ML vectoriel lorsque Helium est activé | Débit scalaire élevé et bande passante mémoire élevée |
| Applications typiques suggérées | Commande peu complexe et nœuds de capteurs simples | Commande de moteurs, DSP audio et traitement de capteurs | Terminaux connectés sécurisés et commande IoT | Objets connectés portables dotés d'une interface utilisateur riche, audio Bluetooth et produits IoT utilisant Flash/PSRAM | Fusion de capteurs par ML, voix/audio, vision et DSP | IHM réactive, commande à haut débit et mise en réseau |

</div>

\* Ces valeurs de référence proviennent du [tableau comparatif Cortex-M d'Arm, version 2020](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431). Ce ne sont ni des scores actuels universels ni un classement direct des SoC complets : le compilateur, le système mémoire, les réglages du cache et la configuration du benchmark influencent le résultat.

† STAR-MC1 utilise ici le chiffre de référence CM33 car il est compatible CM33. Il s'agit d'une base de comparaison, pas d'un résultat STAR-MC1 publié par Arm ou mesuré.

‡ Il s'agit d'un repère de positionnement architectural, et non de mesures effectuées sur silicium. La consommation réelle dépend du procédé de fabrication, de la tension, de la fréquence, de l'architecture mémoire, des fonctions activées, des périphériques, du cycle d'activité du firmware et de l'implémentation finale du SoC.

Les lignes « Pipeline » et « Interface principale du bus système » résument le pipeline d'exécution principal et l'interface mémoire système de chaque IP. CM33 et STAR-MC1 partagent l'organisation de bus C-AHB/S-AHB. Le cache et les autres fonctions mémoire facultatives sont indépendants de cette interface ; leur disponibilité dépend de la configuration et de l'implémentation du SoC. Cela ne signifie pas que ces interfaces sont activées sur tous les SoC. Les ports de débogage, de trace, de coprocesseur et autres ports facultatifs ne sont pas répertoriés.

Références des IP processeur : documents Arm pour [CM3](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14), [CM4](https://support.arm.com/compute-ip/cortex-m4), [CM33](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954), [CM55](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5) et [CM7](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf), ainsi que le [manuel technique STAR-MC1](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).

## Améliorations architecturales { #architectural-enhancements }

STAR-MC1 s'appuie sur Cortex-M33 plutôt que de le remplacer. Les ajouts les plus importants sont des améliorations au niveau de l'implémentation qui aident le cœur à passer moins de temps à attendre la mémoire et plus de temps à exécuter du travail utile.

### Caches d'instructions et de données { #instruction-and-data-caches }

La disponibilité et la configuration du cache d'instructions (**I-cache**) et du cache de données (**D-cache**) dépendent de l'implémentation du SoC. Lorsqu'ils sont implémentés et activés, ces caches sont particulièrement utiles dans les systèmes qui exécutent du code depuis une Flash externe, accèdent à la PSRAM ou utilisent des piles logicielles d'interface utilisateur et de middleware plus volumineuses.

Les principaux avantages sont :

- Lecture plus rapide des instructions depuis une mémoire autre que la SRAM.
- Réduction de la latence moyenne d'accès aux données.
- Meilleures performances pour les graphismes, l'audio, les piles de protocoles et les frameworks d'interface utilisateur.
- Pression réduite sur le bus mémoire lorsque le même code ou les mêmes données sont réutilisés.

Pour les tampons cacheables dont le matériel ne garantit pas la cohérence, les pilotes qui partagent la mémoire avec le DMA, les contrôleurs d'affichage, les interfaces audio ou d'autres maîtres de bus doivent suivre les règles du SDK ou du RTOS. Nettoyez le cache pour écrire en mémoire les données modifiées par le CPU avant leur lecture par un périphérique. Préparez les tampons de réception avant les écritures DMA, puis invalidez les lignes obsolètes après la fin du transfert et avant la lecture par le CPU. Le CPU ne doit pas accéder au tampon tant que le DMA en a la propriété. Allouez des lignes de cache entières sans les partager avec des données indépendantes et respectez les vérifications de fin de transfert et les barrières mémoire de la plateforme. Les tampons non cacheables ou cohérents matériellement suivent également leurs propres règles de synchronisation. Voir [Comparer la PSRAM aux autres types de mémoire pour systèmes embarqués](psram-and-memory-types.md#caches-and-external-memory-execution) pour la gestion de la propriété des tampons et les risques liés aux lignes modifiées.

### Extension de chemin de données personnalisé Armv8-M { #armv8-m-custom-datapath-extension }

Au niveau de l'IP, Arm définit l'encodage des instructions CDE et le concepteur du SoC définit les opérations et chemins de données personnalisés. CM33 propose un CDE entier optionnel ; le CDE flottant dépend de la FPU et de la configuration. Le TRM STAR-MC1 décrit les modules GPR CDE et FPCDE, mais cette description de l'IP ne confirme pas la disponibilité de CDE dans un appareil SF32 ou un SDK donné. Les notes de version [SiFli-SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1) signalent la correction d'une activation accidentelle de CDE sur SF32LB57x ; vérifiez la prise en charge par l'appareil et le SDK exacts avant de vous y fier. CM55 propose CDE en option à partir de r1, mais pas en r0. CP0–CP7 sont des espaces d'encodage affectés à des coprocesseurs ou au CDE ; ils ne représentent ni huit instructions personnalisées ni huit accélérateurs supplémentaires. Vérifiez aussi la révision du cœur, les modules implémentés ainsi que la prise en charge par le compilateur et le SDK. Voir la [fiche technique CM33](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf), les [notes de révision CDE de CM55](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips) et les chapitres B7/B8 du TRM STAR-MC1.

Cela peut être utile pour des charges de travail telles que :

- Le traitement numérique du signal.
- La cryptographie.
- Les primitives de vision par ordinateur.
- Les noyaux de calcul pour l'apprentissage automatique.
- Les calculs liés à la fusion de capteurs.

Le CDE n'accélère pas automatiquement chaque application. Le logiciel doit s'appuyer sur la prise en charge du compilateur, des bibliothèques ou des composants du SDK du fournisseur qui émettent les instructions personnalisées pertinentes. Lorsqu'il est pris en charge par le SoC et la pile logicielle, le CDE permet d'accélérer certaines applications sans déplacer leur charge de calcul vers un processeur applicatif distinct.

### Optimisation du système mémoire { #memory-system-optimization }

De nombreuses applications modernes sur MCU sont limitées non seulement par la fréquence du CPU, mais aussi par la latence et la bande passante mémoire. La conception du système mémoire de STAR-MC1 et les fonctions de cache implémentées et activées par le SoC sont donc importantes pour les composants de classe SF32, dont les applications peuvent combiner SRAM interne, Flash intégrée au boîtier, PSRAM, tampons d'affichage et DMA périphérique.

Les gains les plus importants apparaissent généralement lorsque :

- Le code s'exécute depuis la Flash ou une mémoire externe plutôt que depuis la SRAM à couplage étroit.
- Les frameworks d'interface utilisateur accèdent de façon répétée aux images, aux polices ou aux données de mise en page.
- Les tâches audio, Bluetooth, graphiques et applicatives s'exécutent simultanément.
- L'ensemble de travail actif tient bien dans le cache.

Les boucles purement liées au CPU qui s'exécutent déjà depuis une SRAM rapide peuvent montrer une amélioration plus faible.

## Caractéristiques de performance { #performance-characteristics }

Il ne faut pas présenter STAR-MC1 comme un cœur qui améliore automatiquement les scores de petits benchmarks CPU synthétiques tels que **CoreMark/MHz** ou **DMIPS/MHz**. Ces benchmarks mesurent principalement des charges de calcul entier compactes, souvent assez petites pour tenir en mémoire locale rapide. Dans ce cas, les caches d'instructions et de données peuvent apporter peu ou pas de gain visible par rapport à une implémentation Cortex-M33 standard.

STAR-MC1 est un cœur compatible Cortex-M33 doté d'un sous-système mémoire configurable et de fonctions optionnelles d'accélération adaptées à certaines charges. Ces fonctions peuvent aider lorsque l'application est limitée par les accès mémoire, la latence de la Flash ou de la PSRAM externe, les ressources graphiques, les piles de protocoles ou les accès répétés à de grands ensembles de code et de données. Le gain dépend des fonctions implémentées et de leur exploitation par l'application.

<div align="center"><em>Tableau : Caractéristiques de performance</em></div>

<div align="center" markdown>

| Type de charge de travail | Avantage STAR-MC1 attendu | Pourquoi |
|:--------------|:--------------------------|:----|
| Petites boucles de type CoreMark/DMIPS | Généralement limité | L'ensemble de travail est réduit et peut déjà tenir en mémoire rapide. |
| Code exécuté depuis la Flash ou la PSRAM | Gain souvent attendu | Si le SoC implémente et active l'I-cache, celui-ci peut réduire les attentes liées à la lecture des instructions. |
| UI, graphismes et middleware intensifs en données | Gain souvent attendu | Si le SoC implémente et active le D-cache, celui-ci peut réduire la latence des accès répétés aux données. |
| Charges de travail périphériques fortement sollicitées par le DMA | Dépend de la conception logicielle | Les tampons cacheables sans cohérence matérielle exigent une maintenance du cache ; tous nécessitent une gestion de la propriété et une synchronisation. |
| Routines de calcul utilisant le CDE | Gain possible | Les instructions personnalisées peuvent accélérer certaines opérations. |

</div>

## Ce que cela signifie pour les développeurs SF32 { #what-this-means-for-sf32-developers }

Pour développer le firmware SF32, considérez STAR-MC1 comme un processeur applicatif compatible Cortex-M33. Évaluez les fonctions de mémoire et d'accélération implémentées au regard des besoins de l'application en code, données et temporisation.

En pratique :

- Considérez le firmware Cortex-M33 comme un point de départ pour le portage du code source, pas comme une image directement interchangeable ; vérifiez la configuration cible et la prise en charge du SDK avant de le réutiliser.
- Les concepts liés au RTOS, aux interruptions, aux niveaux de privilège, à TrustZone et au débogage restent familiers aux développeurs Cortex-M.
- Les applications sensibles à la performance doivent placer soigneusement le code et les données critiques et utiliser les API de cache et de mémoire du SDK.
- Les tampons DMA cacheables nécessitent une maintenance explicite du cache si le matériel ne garantit pas la cohérence ; tous les tampons DMA exigent une gestion sûre de la propriété et une synchronisation.
- Les charges de travail graphiques, audio, IA et connectivité en tirent le meilleur parti lorsque la pile logicielle exploite efficacement les accélérateurs matériels et la hiérarchie mémoire du SoC.

STAR-MC1 n'a pas vocation à remplacer le Cortex-M7 dans tous les cas d'usage. Si une application exige le débit monocœur maximal et peut accepter une consommation plus élevée, un composant de classe Cortex-M7 peut rester préférable. Pour les produits connectés sur batterie, STAR-MC1 offre un compromis intéressant entre compatibilité, performances et efficacité énergétique.

## Applications bien adaptées { #good-application-fits }

Les composants basés sur STAR-MC1 sont des candidats pour les produits qui doivent accélérer les accès mémoire ou certaines opérations tout en respectant les contraintes de consommation et d'intégration des MCU. Ils méritent notamment d'être évalués lorsque la latence mémoire compte davantage que le score d'un petit benchmark CoreMark/DMIPS. Choisissez le SoC selon ses fonctions implémentées et ses performances mesurées avec la charge visée, pas selon un avantage supposé sur tout Cortex-M33 classique.

Exemples d'applications adaptées :

- Les montres connectées et les bracelets d'activité.
- Les appareils audio Bluetooth.
- Les dispositifs médicaux portables et les produits de suivi de la santé.
- Les écrans intelligents et systèmes HMI compacts.
- Les appareils dotés de capteurs pour l'IA en périphérie.
- Les produits utilisant LVGL ou d'autres frameworks UI embarqués.
- Les composants qui exécutent du code depuis de grandes mémoires Flash ou PSRAM.

## Points clés à retenir { #key-takeaways }

- STAR-MC1 est compatible Cortex-M33, il préserve donc le modèle logiciel embarqué Armv8-M familier.
- Lorsque le SoC active les caches d'instructions et de données, ils peuvent améliorer la performance réelle, en particulier lorsque le code et les données résident hors de la SRAM interne rapide.
- Le CDE fournit un chemin pour l'accélération par instructions personnalisées lorsqu'il est pris en charge par le SoC et la pile logicielle.
- STAR-MC1 associe un modèle logiciel compatible CM33 à des fonctions configurables de mémoire et d'accélération ; comparez les SoC concrets et les charges mesurées, pas seulement les noms des cœurs.
- Sur les composants SF32 intégrant STAR-MC1, le cœur et les fonctions implémentées à ses côtés dans le SoC peuvent prendre en charge des applications plus ambitieuses en graphisme, en audio, en AIoT et dans les objets connectés portables, tout en conservant un modèle de développement de type MCU.

---

Voir aussi : [Famille SF32](../../sf32-products/family/SF32_family.md) pour comprendre comment STAR-MC1 s'intègre dans la gamme de puces SF32LB5x plus large.

Référence principale : [Manuel de référence technique STAR-MC1 d'Arm China](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).
