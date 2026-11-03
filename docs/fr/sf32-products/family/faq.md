---
icon: lucide/circle-help
description: "FAQ produits SF32 : choix de puces, modules et cartes, mémoire et interfaces, Bluetooth, GPIO, marquages, disponibilité et personnalisation."
tags:
    - Matériel
    - FAQ
---

# FAQ SF32 { #sf32-faq }

## 1. Choisir un produit { #choosing-a-product }

### 1.1. Quelle famille SF32 choisir ? { #choosing-a-family }

Commencez par ces critères de sélection essentiels :

- **Résolution d’affichage :** nombre de pixels, interface, rafraîchissement et mémoire de framebuffer nécessaires.
- **Mode Bluetooth :** BLE uniquement ou Bluetooth bimode (BLE et Bluetooth classique).
- **Nombre de GPIO disponibles :** broches restantes après affectation des interfaces et de la mémoire.
- **Dimensions du boîtier :** emprise, pas des broches et exigences d’assemblage du PCB.
- **Alimentation :** batterie ou alimentation régulée, plage de tension de fonctionnement et niveaux d’E/S.
- **Fonctions audio :** besoins en ADC/DAC, I2S et PDM, y compris les canaux de microphone.

Comparez des références précises plutôt que de vous fier au seul numéro de famille : un numéro supérieur n’est pas forcément mieux adapté. Chacun de ces critères figure dans le [Sélecteur de produits](../product-selector.md) ; utilisez-les pour présélectionner des références précises.

[Comparaison des familles](SF32_family.md) · [Sélecteur de produits](../product-selector.md)

### 1.2. Faut-il utiliser une puce, un module ou une carte de développement ? { #chip-or-modules }

Utilisez une carte de développement pour évaluer la plateforme et valider le firmware. Un module réduit le travail lié à la RF, aux quartz et au routage mémoire sur la carte porteuse ; il peut aussi diminuer le coût global de développement. Pour les produits en petites séries, il simplifie l’approvisionnement des composants qu’il intègre, et sa certification RF peut être utile dans certaines régions. Choisissez une conception à puce lorsque le coût, les dimensions ou la flexibilité justifient de prendre en charge vous-même le schéma, le routage et la RF. Quelle que soit la solution retenue, le produit final doit être validé. D’autres modules seront ajoutés au fur et à mesure de leur disponibilité.

[Planifier un produit](product-planning.md)

### 1.3. Avec quelle carte de développement commencer ? { #choosing-a-board }

Commencez par la carte LCD de votre famille, conçue pour l’évaluation de l’affichage : [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) (variante mémoire N32R16) ou [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) (variante N16R32N1). Pour le SF32LB52x, des cartes plus compactes sont également disponibles : [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) et [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) (évaluation basse consommation pour les appareils portables). Vérifiez que la variante mémoire de la carte correspond à la référence cible ; le guide officiel des modèles de cartes SiFli les répertorie toutes.

[Sélecteur de produits](../product-selector.md) · [Guide officiel des modèles de cartes](https://wiki.sifli.com/en/board/devkit_guide.html)

### 1.4. Comment lire les références des puces et modules ? { #reading-part-numbers }

Lisez le code de commande complet, pas seulement le préfixe de famille. Les codes des puces distinguent composant, boîtier et mémoire ; les suffixes des modules décrivent le stockage et la mémoire installés. Consultez les exemples et exceptions historiques du guide, puis confirmez la configuration commandable auprès du fournisseur.

[Nomenclature SF32](SF32_namingrule.md)

## 2. Mémoire et spécifications { #memory-and-specifications }

### 2.1. Quelle différence entre SRAM, PSRAM et Flash ? { #memory-types }

La SRAM et la PSRAM stockent les données d’exécution, qui sont perdues lorsque l’alimentation est coupée ; les modes de rétention dépendent du composant. La SRAM interne et la PSRAM externe ou intégrée au boîtier diffèrent par leur accès, leur bande passante et leur consommation. La Flash conserve le firmware et les ressources hors tension. Une capacité Flash supérieure ne compense pas un manque de RAM de travail.

[Types de mémoire](../../learn/architecture/psram-and-memory-types.md)

### 2.2. De combien de mémoire mon application a-t-elle besoin ? { #sizing-memory }

Prévoyez la RAM nécessaire au système, aux piles, au tas, aux tampons graphiques et audio, ainsi qu’aux tâches simultanées. Un framebuffer de base nécessite largeur × hauteur × octets par pixel × nombre de tampons ; ajoutez l’alignement du pas de ligne et les éventuels tampons de rendu supplémentaires. Dimensionnez séparément le stockage non volatil requis pour le firmware, les polices, les images, l’audio, les fichiers et les images OTA. Mesurez le pic d’utilisation avec la charge prévue.

[Présentation des graphismes](../../learn/graphics/overview.md) · [Planifier un produit](product-planning.md)

### 2.3. Quand choisir NOR, NAND ou eMMC ? { #choosing-storage }

Choisissez en fonction du chemin de démarrage, de la capacité, du mode d’accès et de la prise en charge logicielle, et pas seulement de la capacité. La NOR convient couramment au code et aux lectures aléatoires ; la NAND nécessite une gestion adaptée des blocs d’effacement, de l’ECC et des blocs défectueux ; l’eMMC intègre un contrôleur de stockage. Ici, SPI-NAND et QSPI-NAND désignent la même option de stockage, et non deux produits différents. Vérifiez la prise en charge du composant exact par le chargeur d’amorçage, le pilote et le système de fichiers.

[Types de mémoire](../../learn/architecture/psram-and-memory-types.md) · [Codes de suffixe des modules](SF32_namingrule.md#module-naming)

### 2.4. Chaque référence possède-t-elle toutes les fonctions de sa famille ? { #family-versus-sku }

Non. Un résumé de famille peut regrouper les capacités de plusieurs références. La mémoire, l’alimentation, les broches utilisables et les interfaces accessibles dépendent du SKU, du boîtier et du multiplexage. Un périphérique intégré à la puce peut ne pas être exposé par le module ou la carte de développement. Vérifiez le tableau des variantes, la fiche technique, le brochage et la prise en charge de la fonction par le SDK.

[Comparaison des familles](SF32_family.md) · [Sélecteur de produits](../product-selector.md)

## 3. Adéquation à l’application { #application-fit }

### 3.1. Comment choisir un composant pour mon écran ? { #choosing-a-display }

Vérifiez d’abord l’interface électrique et les temporisations de la dalle, puis sa résolution, le format des pixels, la fréquence de rafraîchissement visée, la mémoire du framebuffer et la bande passante. La résolution maximale ne garantit pas un affichage fluide. Confirmez l’accélération graphique et le pilote nécessaires, puis testez des écrans et des animations représentatifs avec la configuration mémoire prévue.

[Matrice des interfaces par famille et variante](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [Contrôleur d’affichage](../../learn/graphics/display-controller.md) · [Présentation des graphismes](../../learn/graphics/overview.md)

### 3.2. Comment vérifier la prise en charge audio et microphones ? { #audio-and-microphones }

Examinez les canaux ADC et DAC pour les signaux analogiques, I2S pour les appareils audio numériques et PDM pour les microphones numériques. Une interface PDM peut transporter jusqu’à deux canaux de microphone : le nombre d’interfaces et le nombre de microphones ne sont donc pas équivalents. Les canaux utilisables dépendent aussi des broches exposées, du multiplexage, des pilotes et du routage. Vérifiez la configuration visée au lieu d’additionner simplement les interfaces.

[Présentation de l’audio](../../learn/audio/overview.md) · [Glossaire](../../about/glossary.md)

### 3.3. Quels produits prennent en charge BLE, Bluetooth Classic ou les deux ? { #bluetooth-modes }

SF32LB55x ne prend en charge que le BLE ; SF32LB52x, SF32LB56x, SF32LB57x et SF32LB58x proposent le Bluetooth bimode. La présence d’une radio ne garantit pas la prise en charge de tous les profils, codecs ou fonctions dans chaque configuration du SDK. Vérifiez le profil requis et l’exemple testé correspondant ; la seule prise en charge du BLE ne prouve pas celle de l’audio Bluetooth classique ni de BLE Audio.

[Comparaison des familles](SF32_family.md) · [Présentation de Bluetooth](../../learn/bluetooth/overview.md)

### 3.4. Mon produit nécessite-t-il un composant Wi-Fi externe ? { #wifi }

Les produits SF32 répertoriés dans ce catalogue n’intègrent pas de radio Wi-Fi. L’option Wi-Fi du sélecteur désigne une solution externe via SDIO. Ce composant nécessite également une alimentation, des broches, des pilotes et un logiciel réseau compatibles ; la présence de SDIO ne suffit pas à garantir une solution fonctionnelle.

[Sélecteur de produits](../product-selector.md)

### 3.5. Combien de GPIO sont réellement disponibles ? { #usable-gpios }

Partez du boîtier et de la configuration mémoire exacts, puis déduisez les broches affectées aux interfaces requises et aux fonctions de la carte. Un module n’expose qu’une partie des broches de la puce. Sur SF32LB57x BGA112, les broches supplémentaires destinées à MPI3 ou aux sorties statiques ont un usage limité ; ce ne sont pas des GPIO librement affectables. Ne considérez pas le nombre annoncé comme un budget garanti pour l’application.

[Notes GPIO des familles](SF32_family.md) · [Variantes SF32LB57x](../chips/SF32LB57x.md)

## 4. Disponibilité et planification du produit { #availability-and-product-planning }

### 4.1. Que signifie le marquage du module pour mon produit ? { #module-markings }

Consultez le résumé des étiquettes pour identifier les variantes concernées et demandez les documents d’homologation ainsi que les conditions d’intégration applicables. Un identifiant FCC ou un marquage CE imprimé ne prouve pas à lui seul que votre produit final est couvert. Toute modification de l’antenne, de la carte porteuse ou du boîtier doit être examinée au regard des conditions applicables.

[Marquages du module 52](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [Marquages du module 56](../modules/SF32LB56-MOD.md#regulatory-markings) · [Marquages du module 58](../modules/SF32LB58-MOD.md#regulatory-markings)

### 4.2. Puis-je demander une autre configuration mémoire ou module ? { #custom-configurations }

Contactez μForge.io en précisant la puce ou le module visé, les capacités de stockage et de PSRAM, les interfaces, les contraintes d’antenne, le volume et le calendrier. Confirmez la faisabilité, la prise en charge par le SDK, la quantité minimale de commande et le délai avant de figer le produit. Une configuration mentionnée dans un ancien document n’est pas nécessairement toujours disponible ; SF32LB58-MOD-E4R32N1 n’est plus disponible en raison de la pénurie de puces mémoire.

[Contacter μForge.io](../../about/contact.md) · [Disponibilité du module 58](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### 4.3. Comment confirmer la disponibilité et obtenir des échantillons ? { #samples-and-documentation }

Utilisez les liens d’achat et de documentation de la page produit. Lorsque vous contactez le fournisseur, indiquez le code de commande complet et la révision souhaitée. Confirmez la disponibilité, la configuration mémoire, l’antenne et le délai. Commencez si possible par une carte d’évaluation prise en charge et utilisez la documentation officielle de la référence exacte, plutôt qu’un résumé de famille, comme référence finale de conception.

[Contacter μForge.io](../../about/contact.md) · [Sélecteur de produits](../product-selector.md)
