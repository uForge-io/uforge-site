---
icon: lucide/memory-stick
description: "La PSRAM dans les systèmes embarqués : comment la RAM pseudo-statique étend la SRAM, en quoi elle diffère de la DRAM, de la RRAM et de la MRAM, et comment répartir les données dans la hiérarchie mémoire SF32."
tags:
    - Architecture
    - Mémoire
    - Apprentissage
---

# Comparer la PSRAM aux autres types de mémoire pour systèmes embarqués { #psram-vs-other-embedded-memory-types }

Dans de nombreux produits embarqués, la PSRAM — **RAM pseudo-statique** (pseudo-static RAM) — constitue le niveau de capacité pratique entre la SRAM sur puce, rare, et le stockage non volatil. Utilisez-la pour des framebuffers, de grandes ressources graphiques, des tampons audio, des données de modèles ou un ensemble de travail applicatif qui ne tient pas en SRAM interne. Dans certains produits basse consommation, comme les wearables, elle peut réduire la consommation du système par rapport à un sous-système DRAM discret ; le résultat dépend des mémoires, du contrôleur, des états de fonctionnement et de la charge de travail. Elle reste toutefois une mémoire volatile : elle ne remplace pas la Flash et ne convient pas nécessairement aux données soumises à de fortes exigences de latence.

Ce guide aide à déterminer quelles données placer en SRAM, en PSRAM ou dans un stockage persistant. Pour vérifier les mémoires réellement présentes dans une référence précise, consultez la [Famille SF32](../../sf32-products/family/SF32_family.md) et la documentation de la puce, du module ou de la carte concernés.

!!! tip "Le modèle en une phrase"
    La PSRAM utilise en interne des cellules dynamiques similaires à celles de la DRAM et gère le rafraîchissement dans le composant mémoire ; l'hôte peut ainsi y accéder comme à de la SRAM.

La règle pratique est simple : utilisez la PSRAM pour augmenter la capacité, réservez la SRAM aux tâches déterministes à faible latence et considérez l'interface mémoire externe comme un budget partagé de performances et de consommation énergétique.

## Statique vs. dynamique : d'où vient le « pseudo » { #static-vs-dynamic-where-pseudo-comes-from }

Dans ce contexte, **statique** et **dynamique** décrivent la façon dont une cellule RAM conserve un bit tant qu'elle est alimentée. Ces termes n'indiquent **pas** si les données survivent à une coupure d'alimentation : la SRAM et la DRAM sont toutes deux volatiles.

- Un bit de **SRAM** est maintenu dans un circuit bistable. Une fois écrit, il reste valide sans rafraîchissement périodique tant que le composant est alimenté et fonctionne dans les spécifications. Le compromis est une cellule mémoire plus grande, ce qui limite la capacité et augmente la surface de silicium et le coût par bit.
- Un bit de **DRAM** est maintenu sous forme de charge sur un condensateur. Cette charge fuit avec le temps, donc le bit doit être lu et restauré périodiquement — une opération de **rafraîchissement** — avant que la charge ne descende trop bas. La cellule plus petite donne à la DRAM un avantage de densité, mais nécessite normalement un contrôleur prenant en charge la DRAM pour planifier le rafraîchissement et respecter ses contraintes temporelles.

La PSRAM utilise généralement en interne un **réseau de cellules dynamique de type DRAM**. Le composant PSRAM effectue le rafraîchissement et masque une grande partie du comportement de contrôle spécifique à la DRAM à l'intérieur du boîtier. Son modèle côté hôte est donc plus proche de la SRAM : l'hôte lit et écrit un espace mémoire adressable sans avoir à planifier lui-même le rafraîchissement périodique. Cela ne signifie pas que toute PSRAM partage l'interface électrique ou les contraintes temporelles de la SRAM. Elle est **pseudo-statique** parce que la RAM dynamique *imite le comportement externe de la RAM statique*, pas parce que la cellule de stockage elle-même est devenue statique.

La simplification se situe au niveau de l'interface, pas dans la suppression des compromis physiques. La PSRAM conserve toujours une latence de commande spécifique au composant, un comportement en rafale (burst), des limites d'horloge, des modes de veille, des restrictions d'accès et une consommation propres. Consultez la fiche technique de la PSRAM choisie plutôt que de traiter toutes les puces PSRAM comme interchangeables.

!!! note "Ce que la PSRAM n'est pas"
    La PSRAM n'est pas un stockage non volatil et ne garantit à elle seule ni une latence comparable à celle de la SRAM interne ni une bande passante système suffisante. Elle résout un problème de capacité ; le composant et la charge de travail choisis déterminent le coût en latence, en consommation et en bande passante.

## Comparaison des types de mémoire { #memory-type-comparison }

<div align="center"><em>Tableau : Comparaison des types de mémoire embarquée</em></div>

<div align="center" markdown>

| Type de mémoire | Conserve les données sans alimentation ? | Caractéristique principale | Point fort typique | Compromis de conception principal | Rôle embarqué typique |
|:------------|:----------------------------|:--------------------|:-----------------|:----------------------|:----------------------|
| **SRAM** | Non | Circuit bistable ; pas de rafraîchissement | La SRAM interne offre généralement une latence faible et prévisible ; la latence réelle dépend du chemin mémoire du SoC et des accès concurrents | Peu économe en surface de silicium, donc capacité sur puce limitée ; les courants de fuite comptent dans les conceptions toujours actives | Piles, code et données fréquemment utilisés, descripteurs DMA, tampons nécessaires au traitement rapide des interruptions, mémoires étroitement couplées |
| **DRAM** | Non | Stockage à base de condensateurs, avec rafraîchissement géré en externe et contrôleur DRAM | Haute densité et faible coût par bit à grande capacité | Rafraîchissement, complexité du contrôleur, contraintes temporelles des lignes et banques, et gestion de l'alimentation | Mémoire principale des systèmes à processeur applicatif et des systèmes embarqués à haute capacité |
| **PSRAM** | Non | Stockage de type DRAM dont le rafraîchissement et le contrôle sont gérés dans le composant mémoire ; modèle d'accès côté hôte similaire à celui de la SRAM | Étend la capacité de travail au-delà de la SRAM interne ; peut simplifier l'intégration et réduire la consommation globale par rapport à un sous-système DRAM discret dans certains systèmes à bande passante faible ou modérée | Latence plus élevée et moins prévisible que celle de la SRAM interne ; bande passante d'interface limitée et partagée avec d'autres clients | Framebuffers, grands tampons UI/audio/IA, ressources décompressées et ensembles de travail applicatifs |
| **RRAM / ReRAM** | Oui | La résistance d'une cellule est modifiée pour représenter les données | Mémoire embarquée non volatile potentiellement compacte et basse consommation en veille | Le comportement en écriture, l'endurance, la rétention, la variabilité et la disponibilité dépendent fortement du procédé et du produit | Configuration non volatile, stockage de code/données ou usages mémoire embarqués spécialisés lorsqu'une technologie prise en charge est disponible |
| **MRAM** | Oui | L'état magnétique représente les données | Accès non volatile rapide, endurance élevée et absence de rafraîchissement | Le coût, la densité, l'énergie d'écriture et la capacité disponible varient selon la génération et le produit MRAM | État persistant, stockage de code/données ou données de travail non volatiles rapides sur les composants pris en charge |

</div>

Le tableau est qualitatif. « Plus rapide », « plus dense » et « consommation plus basse » donnent des orientations générales, mais ne suffisent pas à sélectionner un composant. Le nœud de procédé, l'interface, la température, le profil d'accès, le mode veille, le boîtier et la configuration du contrôleur peuvent inverser une comparaison apparemment évidente.

### Pourquoi la PSRAM convient aux produits basse consommation { #why-psram-fits-low-power-products }

La PSRAM vise souvent un autre point de fonctionnement que la DRAM discrète classique : capacité et bande passante modérées, interface plus simple, moindre surcharge du contrôleur et modes basse consommation propres au composant. Dans certains wearables, produits portables et systèmes alimentés par batterie qui n'ont pas besoin d'une bande passante comparable à celle de la DRAM, cette combinaison peut réduire la consommation globale. Ce n'est pas une garantie générale : comparez les mémoires, le contrôleur, les états de fonctionnement et une charge représentative sur le système cible.

Ce n'est pas une promesse universelle par octet ou par accès. Une interface PSRAM cadencée à une fréquence élevée, un framebuffer lu en continu ou un trafic écran/audio/IA important peuvent toujours dominer le budget de consommation mémoire. Comparez les courants en activité, en veille, en rétention et au réveil des composants choisis, avec l'horloge, la tension, la température et le profil d'accès réels ; utilisez des modes tels que Half-Sleep lorsqu'ils sont pris en charge et bénéfiques.

## Rôle des différents types de mémoire dans le système { #where-each-memory-fits-in-a-system }

Raisonnez en termes de durée de vie des données et d'urgence d'accès :

1. Placez dans la SRAM interne ou une autre mémoire documentée à faible latence le code ou les données **sensibles aux interruptions, fréquemment utilisés et critiques en latence**.
2. Placez les **grands ensembles de travail actifs** en PSRAM lorsque l'avantage de capacité dépasse le coût en latence et en bande passante.
3. Placez les **données qui doivent survivre à une coupure d'alimentation** dans une technologie non volatile : couramment NOR Flash, NAND Flash, eMMC, ou — dans les systèmes qui l'offrent — RRAM ou MRAM.
4. Conservez les **ressources peu utilisées** dans un stockage non volatil et ne déplacez ou décodez que la portion nécessaire à l'opération en cours.

Une disposition embarquée courante est donc :

<div align="center"><em>Schéma : répartition type de la mémoire dans un système embarqué</em></div>

```text
Image du firmware, ressources et paramètres à conserver -> Stockage non volatil
Grands tampons actifs et framebuffers        -> PSRAM
Piles fréquemment utilisées, état de contrôle et données DMA -> SRAM interne
```

Il s'agit d'une politique de placement, pas d'une règle que chaque tampon doit suivre. Une petite image fréquemment réutilisée peut être mieux placée en SRAM ; un grand modèle peut rester en Flash ou en PSRAM ; un système d'affichage peut avoir besoin de PSRAM simplement parce qu'un framebuffer complet ne tiendra pas en interne.

## La bande passante de l'interface limite les performances de la PSRAM { #psram-performance-is-an-interface-budget }

Une capacité PSRAM suffisante ne garantit pas une bande passante suffisante. L'hôte y accède via une interface telle que OPI ou HPI sur les configurations SF32 prises en charge, et ce chemin peut être partagé par les accès CPU, les caches, le DMA, les graphismes, le balayage de l'affichage, l'audio, le sans-fil et l'activité de stockage. Un produit peut disposer d'une capacité PSRAM suffisante tout en saccadant ou en subissant un underrun (manque de données dans le tampon) lorsque plusieurs clients sollicitent l'interface en même temps.

### Largeur d'interface et débit de transfert { #interface-width-and-transfer-rate }

Le débit brut de charge utile est déterminé par la largeur des lignes de données, les transferts par cycle d'horloge, et l'horloge d'interface choisie :

`payload rate (MB/s) = data lines × transfers per clock × interface clock (MHz) ÷ 8`

Les lignes DTR/DDR ci-dessous supposent deux transferts par cycle ; les lignes à deux canaux supposent que les deux canaux fonctionnent simultanément à la fréquence indiquée. Ce sont des hypothèses de calcul, pas la confirmation que chaque puce, boîtier, composant mémoire ou configuration SDK prend en charge le mode ou la fréquence indiqués.

<div align="center"><em>Tableau : Débit théorique de charge utile de mémoire série</em></div>

<div align="center" markdown>

| Interface et mode de transfert | Lignes de données de charge utile | Transferts par cycle | Taux de charge utile par MHz | Horloge représentative pour comparaison | Taux de charge utile théorique |
|:----------------------------|:------------------:|:--------------------:|:-------------------:|:-----------------------------------:|:------------------------:|
| QSPI / STR | 4 | 1 | 0,5 MB/s | 72 MHz | 36 MB/s |
| QSPI / DTR | 4 | 2 | 1 MB/s | 72 MHz | 72 MB/s |
| OPI / DDR | 8 | 2 | 2 MB/s | 144 MHz | 288 MB/s |
| OPI / DDR à deux canaux | 2 × 8 = 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR | 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR à deux canaux | 2 × 16 = 32 | 2 | 8 MB/s | 144 MHz | 1 152 MB/s |

</div>

La colonne des lignes de données compte les signaux de charge utile, pas l'horloge, la sélection de puce ou les autres broches de contrôle. Ces fréquences sont des exemples documentés, pas des limites applicables à toute la famille. Le [guide de la SF32LB52-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md) indique une PSRAM OPI à 144 MHz et une QSPI-NOR à 72 MHz en mode STR ; le [guide de la SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb58x/SF32LB58-DevKit-LCD.md) indique une PSRAM HPI à 144 MHz ainsi que des variantes de carte avec une Flash externe à 72 MHz. La ligne QSPI/DTR utilise une horloge de 72 MHz uniquement pour isoler l'effet du transfert à double débit de données. Les lignes à deux canaux supposent que les deux canaux peuvent être utilisés simultanément ; elles montrent la largeur de bus agrégée sans garantir qu'un flux de données du CPU obtienne deux fois le débit effectif. Il s'agit de **plafonds de charge utile du bus**, pas d'un débit applicatif mesuré. Les cycles de commande/adresse, les cycles d'attente (dummy cycles), le rafraîchissement, les changements de sens lecture/écriture, les limites du contrôleur, les défauts de cache, l'arbitrage DMA, l'intégrité du signal sur le PCB et les accès concurrents réduisent le débit utilisable. La puce, le boîtier, le composant mémoire et la configuration SDK choisis déterminent ce qui est valide.

Le [guide des références de puces SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) donne plusieurs exemples de configurations à deux canaux : **SF32LB566VCB36** intègre 8 MB de PSRAM OPI sur MPI1 et 4 MB sur MPI2 ; **SF32LB586VDD36** intègre 16 MB de PSRAM HPI sur chaque interface ; **SF32LB587VEE56** en intègre 32 MB sur chacune. Ces références illustrent la topologie mémoire ; elles ne garantissent pas qu'un client unique atteigne le débit utile agrégé du tableau. Avant de dimensionner une conception exigeante en bande passante, vérifiez la référence complète et la carte mémoire du SDK ; un autre boîtier ou SKU de la même famille peut avoir une organisation différente.

### Pourquoi deux canaux mémoire comptent { #why-two-memory-channels-matter }

L'avantage principal d'une configuration à deux canaux ne se limite pas à un débit agrégé plus élevé. Lorsque le mappage mémoire SF32 retenu et la configuration de l'affichage et de son contrôleur permettent un placement indépendant, un canal peut être réservé au client le plus exigeant en bande passante et l'autre aux accès du reste du système.

Un affichage RGB/DPI en est un exemple courant. Son contrôleur doit lire le framebuffer en continu au rythme de l'horloge pixel ; une lecture retardée peut provoquer un underrun (manque de données dans le tampon), des artefacts visuels ou un rafraîchissement instable. Placer ce framebuffer dans la mémoire desservie par un canal PSRAM, et les ressources UI, tampons audio et autres données de travail utilisées par le CPU, ePicasso ou le DMA dans la mémoire de l'autre canal, peut réduire les conflits d'accès évitables sur le chemin de lecture de l'affichage.

Utilisez ceci comme une stratégie d'allocation de bande passante, pas comme une promesse automatique. Vérifiez que le composant choisi expose le mappage de canaux requis, que l'adresse de base du framebuffer se trouve sur le canal prévu et que le contrôleur d'affichage ainsi que les autres maîtres de bus peuvent utiliser les canaux indépendamment. Mesurez la stabilité du balayage d'affichage, le temps de trame et la charge concurrente audio/Bluetooth/CPU ; l'entrelacement, une interconnexion partagée ou une disposition de tampons inadaptée peuvent réduire l'avantage attendu.

### Caches et exécution en mémoire externe { #caches-and-external-memory-execution }

Lorsque le code ou les données résident en DRAM/PSRAM externe, le **cache d'instructions (I-cache)** et le **cache de données (D-cache)** peuvent réduire substantiellement les accès lents répétés sur les composants SF32 qui prennent ces caches en charge, à condition qu'ils soient activés et que les régions concernées soient mappées comme cacheables :

- Le **cache d'instructions** garde les lignes d'instructions récemment récupérées près du CPU. Le code avec localité — comme les boucles, les fonctions réutilisées, les chemins RTOS, ou le code UI — peut éviter des récupérations répétées en PSRAM ou NOR après un remplissage de cache.
- Le **cache de données** garde les lignes de données récemment lues près du CPU. Il aide les lectures CPU répétées de tables, de ressources et de données de travail, mais ne supprime pas la bande passante utilisée par un flux à passage unique.
- **Un DMA non cohérent exige de gérer la propriété du tampon et la maintenance du cache.** Pour un tampon cacheable dont le matériel ne garantit pas la cohérence, nettoyez les données écrites par le CPU avant leur lecture par le DMA ou un périphérique. Avant une écriture du DMA, suivez la procédure de préparation du tampon de réception prévue par la plateforme afin qu'une écriture différée de lignes modifiées ne puisse pas écraser les données reçues. Après la fin du transfert, invalidez les lignes obsolètes avant que le CPU lise le résultat. Le CPU ne doit pas accéder au tampon tant que le DMA en a la propriété.

Alignez l'adresse de départ et la taille allouée des tampons DMA sur des lignes de cache entières, sans partager ces lignes avec des données indépendantes. Invalider une ligne modifiée partagée peut perdre les modifications d'une autre variable ; la nettoyer après une écriture du DMA peut écraser les nouvelles données. Utilisez les API du SDK ou du RTOS choisi, en respectant la taille des lignes, les vérifications de fin de transfert et les barrières mémoire nécessaires. Ne reprenez pas sans vérification les API ou les valeurs d'alignement d'un autre processeur. Les tampons non cacheables ou cohérents matériellement suivent les règles de synchronisation propres à leur plateforme.

Le cache est donc une optimisation de localité, pas un substitut à un budget de bande passante. Un scanout de framebuffer en flux continu ou un transfert de tampon ponctuel peuvent toujours consommer l'interface PSRAM à près de son débit de données requis.

### Copie du code vers la PSRAM au démarrage (non-XIP) { #boot-copy-and-execute-in-place-from-psram }

Les guides de démarrage SiFli pour SF32LB52x et SF32LB58x documentent des configurations où l'application stockée dans une NAND Flash externe est copiée vers la PSRAM pour y être exécutée ; les deux guides décrivent aussi une option utilisant une Flash SD externe via SDIO. SiFli désigne ce mode comme **non-XIP** : le XIP exécute le code directement à une adresse de NOR Flash, donc les adresses de stockage et d'exécution sont identiques ; le non-XIP copie le code de la Flash vers la RAM, et ces adresses diffèrent. Consultez le [guide de démarrage SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_development/startup_flow.html) et le [guide de démarrage SF32LB58x (en chinois)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_development/startup_flow.html). Ce sont des configurations documentées, pas une garantie pour tous les SKU ou toutes les cartes. Vérifiez le média de démarrage pris en charge, le plan mémoire, la configuration de l'éditeur de liens et des partitions, ainsi que le SDK du composant ciblé. Exécuter certains codes depuis la PSRAM peut libérer la SRAM intégrée pour d'autres usages, mais ne garantit pas une exécution plus rapide ; mesurez des charges représentatives avec les paramètres de cache et la contention mémoire réels.

Dans des configurations SiFli représentatives, la NOR QSPI/STR à 72 MHz a un plafond de charge utile brute de 36 MB/s, tandis que la PSRAM OPI/DDR et HPI/DDR à 144 MHz atteignent respectivement 288 MB/s et 576 MB/s ; les variantes à deux canaux atteignent 576 MB/s et 1 152 MB/s au total. Ces valeurs correspondent aux plafonds de charge utile des interfaces, pas à des résultats de performance applicative. Dans une configuration prise en charge, un plafond d'interface PSRAM plus élevé peut offrir plus de bande passante de lecture d'instructions que la NOR QSPI, mais ne prouve pas à elle seule que l'exécution depuis la PSRAM sera plus rapide. Le résultat dépend de la latence du composant mémoire, de la localité du code, de la configuration du cache, de la contention PSRAM et du fait que l'application soit limitée par le CPU, le cache ou la bande passante. Mesurez le démarrage, les défauts de cache et des charges représentatives au lieu de déduire les performances applicatives du rapport des débits bruts.

Pour une conception fortement dépendante de la PSRAM, validez ces questions sur le matériel cible :

- Qu'est-ce qui lit et écrit dans la PSRAM simultanément pendant le scénario utilisateur de pointe ?
- Le tampon est-il lu séquentiellement, en rafales, aléatoirement, ou répétitivement par le CPU ?
- Le comportement du cache réduit-il les accès répétés, et les étapes de maintenance de cache sont-elles correctes autour du DMA ?
- Un framebuffer peut-il utiliser des mises à jour partielles, des tampons de dessin plus petits, ou la compression au lieu d'une allocation de framebuffer complet plus grande ?
- Que se passe-t-il lorsque le rafraîchissement de l'affichage, l'audio Bluetooth, et le travail applicatif se produisent ensemble ?
- Le comportement de veille ou de mise en veille de la PSRAM choisie respecte-t-il l'exigence de rétention et d'autonomie de la batterie ?

Mesurez le temps de trame, les underruns (manques de données dans le tampon), les blocages du CPU, le courant et le comportement de récupération. Ne déduisez pas les performances du système de la seule capacité ou largeur d'interface de la PSRAM.

## Half-Sleep sur les PSRAM AP Memory compatibles { #half-sleep-on-applicable-ap-memory-psram }

Certaines puces PSRAM d'AP Memory proposent le mode **Half-Sleep**, un état à très basse consommation qui conserve les données stockées. Il est utile lorsqu'un grand tampon doit rester valide pendant que les accès à la PSRAM sont suspendus et que le produit ne peut pas se permettre de le recharger depuis la Flash ou de le recalculer après chaque période d'inactivité.

Half-Sleep est un **mode à très basse consommation propre au composant**, pas une fonctionnalité PSRAM générique. La [fiche technique AP Memory APS6408L-OBMx DDR OPI Xccela PSRAM](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) décrit une implémentation de ce mode. Ses délais d'entrée et de sortie, l'encodage du registre de mode, le comportement d'horloge autorisé, le courant, les limites de température et les garanties de rétention **ne sont pas transposables** entre les familles ou révisions de PSRAM. Utilisez la fiche technique exacte et vérifiez le support SDK pour le composant monté.

### Économie d'énergie relative { #relative-power-saving }

Les comparaisons ci-dessous utilisent la fiche technique AP Memory Rev. 3.7, disponible sur le [site du fabricant](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf). Vérifiez la révision et le composant monté avant d'appliquer ses limites.

Pour la même référence APS6408L-OBMx avec **rétention de l'ensemble de la matrice mémoire**, AP Memory publie les valeurs moyennes typiques de courant suivantes en veille standard et en Half-Sleep. À la même tension d'alimentation, la réduction relative de courant correspond aussi à la réduction relative de consommation PSRAM.

<div align="center"><em>Tableau : Économie Half-Sleep de l'APS6408L-OBMx avec rétention de toute la matrice mémoire</em></div>

<div align="center" markdown>

| Température | Courant de veille standard | Courant Half-Sleep | Réduction relative |
|:------------|:------------------------:|:------------------:|:------------------:|
| 25 °C | 66 µA | 20 µA | environ 70 % |
| 85 °C | 190 µA | 120 µA | environ 37 % |

</div>

À 25 °C, Half-Sleep utilise donc approximativement **30 % du courant de veille standard de la puce de référence** tout en conservant toute la matrice mémoire. L'économie est plus faible à 85 °C car le courant de rétention augmente avec la température. Ces chiffres comparent deux états de veille/rétention, et non Half-Sleep au courant actif de lecture/écriture ; ce sont des valeurs typiques, pas des garanties de conception. Les réglages de rafraîchissement partiel de la matrice peuvent réduire davantage le courant, mais peuvent ne pas conserver chaque région mémoire ; utilisez-les uniquement lorsque la politique de rétention des données le permet.

### Règles de conception pour Half-Sleep { #design-rules-for-half-sleep }

Ne confondez pas les 150 ms nécessaires à la garantie du courant avec la durée minimale de Half-Sleep de 150 µs et le délai de sortie de 150 µs indiqués dans la Table 30 de cette révision. Un faible courant moyen peut masquer des pointes de rafraîchissement : vérifiez la réponse du régulateur et du découplage. Contrairement à Half-Sleep, Deep Power Down perd le contenu mémoire et rétablit les valeurs par défaut des registres de mode à la sortie.

Les notes des tableaux de courant de la fiche technique de référence précisent un composant de 64 Mb sans commutation de l'horloge ; les valeurs de rafraîchissement lent à 25 °C nécessitent l'activation de Slow Refresh Frequency. VDD et VDDQ sont spécifiés entre 1,62 et 1,98 V. Le courant Half-Sleep spécifié n'est garanti qu'après 150 ms dans ce mode, ce qui ne transforme pas les valeurs typiques du tableau en limites garanties. Pour des périodes d'inactivité plus courtes, mesurez toute la forme d'onde d'entrée, de rétention et de sortie, au lieu d'appliquer le courant stabilisé à l'ensemble de l'intervalle.

- N'entrez en Half-Sleep qu'après que tous les clients CPU, DMA, écran, audio, sans-fil et stockage ont cessé d'accéder à la région PSRAM. Une transaction pendant l'entrée ou la veille peut corrompre le transfert ou réveiller le composant de manière inattendue.
- Traitez la sortie comme un coût de réveil planifié. Le firmware doit respecter le délai de sortie spécifié avant que le code, le DMA ou un contrôleur périphérique n'accède à nouveau à la PSRAM.
- Maintenez l'alimentation PSRAM et les signaux requis par le composant choisi dans sa spécification de rétention. Half-Sleep ne conserve les données que tant que ses conditions d'alimentation documentées sont respectées ; ce n'est pas un remplacement pour le stockage non volatil.
- Mesurez l'état complet du système, pas seulement le courant PSRAM. Les économies peuvent être perdues si le CPU, l'écran, l'horloge d'interface ou un autre sous-système reste actif.

Pour de courts intervalles d'inactivité, la surcharge d'entrée/sortie peut dépasser l'économie. Pour des pauses plus longues, conserver un framebuffer, une ressource décodée ou un tampon de modèle en Half-Sleep peut éviter un rechargement ou une reconstruction coûteux. Définissez la durée d'inactivité à partir de laquelle l'économie d'énergie devient nette à partir de l'énergie active, Half-Sleep et de réveil mesurée sur la carte cible.

## La PSRAM dans les conceptions SF32 { #psram-in-sf32-designs }

Les configurations mémoire SF32 dépendent de la référence, du boîtier et du module. La documentation des modules SiFli répertorie des options OPI-PSRAM et HPI-PSRAM dans la gamme de modules SF32LB5x ; elle montre aussi que la capacité et la topologie varient selon le code du module. Certaines configurations intègrent la PSRAM dans le même boîtier, tandis que d'autres produits exposent une interface mémoire externe. Ni la présence d'un nom de famille SF32 ni celle d'une interface mémoire externe ne prouve que chaque variante inclut de la PSRAM.

Utilisez la page produit exacte et le guide de conception pour confirmer la capacité, l'interface, les contraintes de boîtier, les exigences de routage, et les limitations de périphériques concurrents. Dans les applications, les principaux usages de la PSRAM sont les suivants :

- **Graphismes :** utilisez la PSRAM pour les grands framebuffers, tampons de dessin, images ou polices lorsque la SRAM est insuffisante. La [Vue d'ensemble graphique](../graphics/overview.md) explique le flux de rendu vers l'affichage et les conséquences en bande passante PSRAM.
- **Audio et Bluetooth :** utilisez-la pour des files d'attente ou ressources plus grandes uniquement après avoir testé le trafic concurrent ; les structures de contrôle sensibles à la latence doivent rester dans une mémoire à faible latence appropriée.
- **IA :** utilisez-la si nécessaire pour les poids ou les tenseurs de grands modèles. Placez les tampons fréquemment utilisés ou sensibles à la latence dans une région mémoire adaptée selon la documentation.
- **Compression :** [eZip](../graphics/ezip.md) peut réduire la taille des ressources stockées et le trafic avant décodage. Sur les composants SF32LB55x, SF32LB56x et SF32LB58x pris en charge, [TurboPixel](../graphics/turbopixel.md) réduit la capacité PSRAM nécessaire et la bande passante requise par le framebuffer final grâce à un taux de compression avec pertes fixe ; ce n'est pas un format de stockage de ressources.

## Règles de sélection pratiques { #practical-selection-rules }

Choisissez la PSRAM lorsque le problème est la capacité et que la charge de travail peut tolérer les limites de latence et de bande passante du chemin mémoire choisi. Préférez davantage de SRAM interne — ou repensez la mise en tampon — lorsque le problème est la latence déterministe, des accès aléatoires petits et fréquents, ou un chemin DMA/contrôle critique en temps. Choisissez une mémoire non volatile lorsque les données doivent survivre à une coupure d'alimentation ; choisissez RRAM ou MRAM uniquement lorsque le SoC exact ou le produit mémoire documente leur disponibilité et leurs limites de fonctionnement.

Une architecture robuste combine délibérément plusieurs niveaux : stockage non volatil pour conserver les données, PSRAM pour les grands ensembles de données actifs et SRAM pour les tâches qui doivent s'exécuter rapidement et de façon prévisible.
