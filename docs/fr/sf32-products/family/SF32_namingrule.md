---
icon: lucide/tags
description: "Décoder une référence SF32LB5xyZxYx6 : niveau de produit, variante PSRAM, type de boîtier, capacité Flash/PSRAM intégrée et classe de température, avec exemples."
tags:
  - Matériel
  - Puce
---

# Convention de nommage SF32 { #sf32-naming-convention }

## Nommage des puces { #chip-naming }

### Référence : ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "Note de syntaxe"
    * Le ***x*** minuscule désigne un chiffre.
    * Le ***Y*** ou ***Z*** majuscule désigne un caractère alphabétique.

### Préfixe : *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — Série de microcontrôleurs 32 bits de SiFli
- **LB** — Identifiant de gamme de produits
    - **LB** : série de MCU Bluetooth basse consommation
- **5** — Famille de processeur
    - **5** : composants basés sur un processeur Arm Cortex-M33 STAR-MC1 de 32 bits, ou sur un processeur RISC-V de performances comparables
- **x** — Niveau de produit
    - **8 / 7** : configurations avec deux processeurs applicatifs et un processeur basse consommation ; le positionnement varie selon la famille.
    - **6 / 5** : milieu de gamme (un processeur applicatif et un processeur basse consommation)
    - **2** : optimisé pour réduire les coûts (un processeur applicatif et un contrôleur Bluetooth basse consommation dédié)
- **y** — Variante du composant
    - Sa valeur reflète généralement la capacité de PSRAM intégrée au boîtier ; la correspondance exacte dépend de la sous-famille du produit.

### Suffixe : *ZxYx6* { #suffix-zxyx6 }

- **Z** — Type de boîtier
    - **U** : QFN68
    - **V** : BGA
    - **Y** : QFN80
- **xYx** — Configuration de mémoire intégrée (Flash QSPI-NOR et PSRAM)
  *(Remarque : la correspondance exacte entre les codes et les configurations dépend du boîtier et de la famille de composants.)*

`ZxYx6` est un schéma général de la famille, et non un modèle d'analyse à longueur fixe. Le nombre et l'ordre des codes mémoire varient selon la famille du composant et le boîtier : le code numérique de la Flash peut être omis et le code alphabétique de la PSRAM peut être répété lorsque plusieurs composants sont intégrés. Pour décoder une référence précise, consultez le tableau des variantes de sa famille.
<div align="center"><em>Définition des champs du suffixe de la référence</em></div>

<div align="center" markdown>

| Champ | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| **x** | Numérique | **1** à **6** | Correspondance générique des capacités de Flash QSPI-NOR :<br>• **1** : 2 Mb<br>• **2** : 4 Mb<br>• **3** : 8 Mb<br>• **4** : 16 Mb<br>• **5** : 32 Mb<br>• **6** : 64 Mb<br>SF32LB57x utilise aussi les codes **7** et **8** ; voir sa correspondance spécifique ci-dessous. |
| **Y** | Alphabétique | **A** à **E** | Capacité et interface de PSRAM intégrée :<br>• **A** : 16 Mb QPI-PSRAM<br>• **B** : 32 Mb OPI-PSRAM<br>• **C** : 64 Mb OPI-PSRAM<br>• **D** : 128 Mb OPI/HPI-PSRAM<br>• **E** : 256 Mb HPI-PSRAM |

</div>

- **6** — Classe de température de fonctionnement
    - **5** : −20 °C à +70 °C (plage commerciale)
    - **6** : −40 °C à +85 °C (plage industrielle)

### Codes mémoire propres au SF32LB57x { #sf32lb57x-memory-codes }

Le schéma de numérotation du [guide de conception matérielle SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md#33-packages) montre trois codes de position mémoire après le code du boîtier, dans l'ordre MPI1, MPI2 et MPI3 ; le code de température vient ensuite. Les codes propres à cette famille pour chaque position MPI sont les suivants :

<div align="center"><em>Tableau : codes mémoire SF32LB57x par position MPI</em></div>

<div align="center" markdown>

| Code | Signification à la position MPI correspondante du SF32LB57x |
|:-----|:------------------------------------------------------------|
| `N` | Aucune mémoire intégrée au boîtier |
| `B` | PSRAM de 32 Mb |
| `C` | PSRAM de 64 Mb |
| `D` | PSRAM de 128 Mb |
| `E` | PSRAM de 256 Mb |
| `2` | NOR Flash de 4 Mb |
| `3` | NOR Flash de 8 Mb |
| `4` | NOR Flash de 16 Mb |
| `5` | NOR Flash de 32 Mb |
| `6` | NOR Flash de 64 Mb |
| `7` | NOR Flash de 128 Mb |
| `8` | NOR Flash de 256 Mb |

</div>

Cette correspondance est propre au SF32LB57x. Vérifiez le code complet dans le tableau exact des variantes ; toutes les combinaisons possibles ne correspondent pas nécessairement à une référence disponible à la commande.

### Exemples de références { #part-number-examples }

#### Exemple 1 : SF32LB527UD6 { #example-1-sf32lb527ud6 }

Caractéristiques de la configuration MCU à coût optimisé de la **série SF32LB52** :

* **Configuration des processeurs :** un processeur applicatif et un processeur dédié au contrôle Bluetooth basse consommation (basé sur Arm Cortex-M33 STAR-MC1).
* **Type de boîtier :** boîtier QFN68 (**U**).
* **Configuration mémoire :** OPI-PSRAM intégrée de 128 Mb (**D**).
* **Température de fonctionnement :** −40 °C à +85 °C (**6**, plage de température industrielle).

#### Exemple 2 : SF32LB587VEE56 { #example-2-sf32lb587vee56 }

Caractéristiques de la configuration MCU phare de la **série SF32LB58** :

* **Configuration des processeurs :** deux processeurs applicatifs et un processeur basse consommation, basés sur Arm Cortex-M33 STAR-MC1.
* **Type de boîtier :** boîtier BGA256 (**V**).
* **Configuration mémoire :** deux HPI-PSRAM intégrées de 256 Mb chacune (**E**) et une Flash QSPI-NOR de 32 Mb (**5**).
* **Température de fonctionnement :** −40 °C à +85 °C (**6**, plage de température industrielle).

#### Exemple 3 : SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

Le tableau des variantes SF32LB57x indique que cette référence est en BGA112. Ses trois codes de position mémoire sont `D/7/7` : MPI1 contient une PSRAM de 128 Mb, et MPI2 et MPI3 contiennent chacun une NOR Flash de 128 Mb. Le `6` final indique la classe de température industrielle. Le deuxième `7` de `776` désigne donc la NOR Flash de MPI3. Consultez la [présentation de la famille SF32](SF32_family.md) pour l'interprétation GPIO de BGA112.

#### Exemple 4 : SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

Le tableau des variantes SF32LB57x indique également que cette référence est en BGA112. Ses codes de position mémoire sont `N/7/N` : aucune mémoire intégrée au boîtier sur MPI1, une NOR Flash de 128 Mb sur MPI2 et aucune mémoire intégrée au boîtier sur MPI3. Le `6` final indique la classe de température industrielle. La présentation de la famille explique pourquoi la notation `58 + 6` ne signifie pas 64 GPIO librement affectables.

### Exceptions de suffixe héritées de la série 55x { #legacy-55x-suffix-exceptions }

La famille SF32LB55x ayant été définie avant la convention de nommage actuelle, certaines références conservent un ancien format de suffixe. Les trois références suivantes ne peuvent pas être entièrement décodées selon le format `SF32LB5xyZxYx6` présenté ci-dessus : `SF32LB551U4O5`, `SF32LB555V4O6` et `SF32LB555V436`. Pour connaître leur boîtier et leur configuration mémoire, consultez le tableau des variantes 55x et la fiche technique de la référence exacte ; ne déduisez pas les champs à partir du format générique. `SF32LB557VD3A6` suit la convention actuelle et ne constitue pas une exception héritée.

## Nommage des modules { #module-naming }

### Référence : ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "Note de syntaxe"
    * Dans le schéma de suffixe, `A`, `B` et `C` désignent les positions des trois champs mémoire ; ces lettres ne figurent pas nécessairement telles quelles dans chaque nom de module.
    * Le premier caractère de chaque champ renseigné identifie le type de stockage. Les chiffres suivants indiquent sa capacité ou sa configuration.
    * Le champ de sous-type `-y` est actuellement utilisé uniquement par la famille de modules SF32LB52. Les noms publiés SF32LB56-MOD et SF32LB58-MOD ne l'utilisent pas.

### Préfixe : *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — Famille de MCU du module
    - **SF32**, **LB** et **5** suivent les mêmes significations de série, de gamme de produits et de famille de processeur que la convention de nommage des puces ci-dessus.
    - **x** identifie le niveau de produit : **8 / 7** correspond à deux processeurs applicatifs et un processeur basse consommation ; le positionnement varie selon la famille. **6 / 5** désigne le milieu de gamme et **2** une configuration optimisée en coût.
- **MOD** — Produit module SiFli.
- **y** — Sous-type de module, lorsque la famille en définit un
    - **1** : alimentation directe par batterie Li-ion pour les composants SF32LB520/3/5/7. La plage d'alimentation de la puce est de 3,2 à 4,7 V ; la configuration standard utilise le SF32LB525UC6 avec 8 MB d'OPI-PSRAM.
    - **A** : fonctionnement standard en 3,3 V pour la famille SF32LB52B. L'alimentation directe par batterie Li-ion n'est pas prise en charge ; la plage d'alimentation de la puce est de 2,97 à 3,63 V. La configuration standard utilise le SF32LB52BU36 avec 1 MB de Flash QSPI-NOR intégrée.
    - **B** : fonctionnement standard en 3,3 V pour la famille 52E/52G/52J. L'alimentation directe par batterie Li-ion n'est pas prise en charge ; la plage d'alimentation de la puce est de 2,97 à 3,63 V. La configuration standard utilise le SF32LB52EUB6 avec 4 MB d'OPI-PSRAM intégrée.

Le module `-A` n'est pas équipé d'une Flash NOR externe. Il peut être relié à une Flash NOR externe ou à des périphériques SDIO, notamment le Wi-Fi, la SD-NAND et l'eMMC en mode 4 bits.

### Suffixe : *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>Définition des champs du suffixe de la référence de module</em></div>

<div align="center" markdown>

| Champ | Code de type de stockage | Capacité, configuration et suffixe |
| :--- | :--- | :--- |
| `Aaaa`<br>Flash variable | `N` : Flash QSPI-NOR<br>`A` : Flash NAND (interface selon la famille du module)<br>`D` : Flash SD-NAND<br>`E` : eMMC | `N16` : Flash QSPI-NOR 16 MB<br>`A128` : SPI-NAND 128 MB sur SF32LB52-MOD-1 ; QSPI-NAND 128 MB sur SF32LB56-MOD et SF32LB58-MOD<br>`D128` : SD-NAND 128 MB sur SF32LB56-MOD<br>`E4` : eMMC 4 GB sur SF32LB58-MOD |
| `Bbbb`<br>PSRAM | `R` : PSRAM | `R4` : OPI-PSRAM 4 MB<br>`R8` : OPI-PSRAM 8 MB<br>`R12` : OPI-PSRAM 4 MB + 8 MB<br>`R16` : OPI/HPI-PSRAM 16 MB<br>`R32` : HPI-PSRAM 16 MB + 16 MB<br>`R64` : HPI-PSRAM 32 MB + 32 MB |
| `Cccc`<br>Flash standard | `N` : Flash QSPI-NOR | `N1` : Flash QSPI-NOR 1 MB<br>`N4` : Flash QSPI-NOR 4 MB |

</div>

Les trois champs du suffixe sont concaténés sans séparateur : `Aaaa` désigne l'option de Flash variable, `Bbbb` la configuration PSRAM et `Cccc` la Flash standard. Le guide SiFli définit les combinaisons de types et de capacités présentées ; un code de type n'est pas nécessairement compatible avec tous les codes de capacité. Un champ n'apparaît que s'il est utilisé dans la configuration de module documentée.

### Exemples de références { #part-number-examples_1 }

#### Exemple 1 : SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**Configuration du module SF32LB52 pour batterie Li-ion :**

* **Sous-type du module :** `-1` prend en charge l'alimentation directe par batterie Li-ion, avec une alimentation de la puce de 3,2 à 4,7 V.
* **Flash variable :** `N16` indique une Flash QSPI-NOR de 16 MB.
* **PSRAM :** `R8` indique une OPI-PSRAM de 8 MB.

#### Exemple 2 : SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**Configuration de module haut de gamme SF32LB58 :**

* **Sous-type de module :** aucun sous-type `-y` n'est utilisé pour les noms publiés SF32LB58-MOD.
* **Flash variable :** pour cette configuration SF32LB58-MOD, `A128` indique une Flash QSPI-NAND de 128 MB.
* **PSRAM :** `R32` indique une HPI-PSRAM de 16 MB + 16 MB.
* **Flash standard :** `N1` indique une Flash QSPI-NOR de 1 MB.

Le schéma de nommage décrit une configuration ; il ne garantit pas que chaque combinaison de codes corresponde à une référence commercialisée. Le guide SiFli identifie le SF32LB566VCB36 et le SF32LB586VDD36 comme configurations MCU standard pour les familles SF32LB56-MOD et SF32LB58-MOD, respectivement ; d'autres configurations de module peuvent être personnalisées. Vérifiez la disponibilité, le MCU effectivement monté, le brochage et les spécifications électriques dans la documentation du module concerné.

[Guide des modèles de puces SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [Guide des modèles de modules SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
