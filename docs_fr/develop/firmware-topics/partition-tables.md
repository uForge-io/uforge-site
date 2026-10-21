---
icon: lucide/table-properties
description: "Décrire les dispositions mémoire SF32 avec les tables de partitions SiFli-SDK : JSON v1/v2 hérité, YAML v3 recommandé, overlays, fichiers générés et validation."
tags:
    - Développement
    - Partitions
---

# Tables de partitions { #partition-tables }

L'outil de compilation `partition_table` de SiFli-SDK lit la description de partition d'une carte et génère `ptab.h`, qui fournit les macros de partition utilisées par une application. Une table de partitions décrit la disposition d'adresses de l'ensemble de la mémoire pertinente, y compris la Flash NOR, la Flash NAND, l'eMMC, les cartes SD, la PSRAM et la SRAM interne.

Chaque carte possède une disposition par défaut, et chaque application compilée pour cette carte la suit. Un projet peut aussi fournir sa propre configuration de table de partitions pour remplacer la valeur par défaut de la carte.

## Activer les tables de partitions { #enable-partition-tables }

Dans la configuration du middleware, activez l'option **Use partition table to manage all memory layout** (« Utiliser la table de partition pour gérer toute la disposition mémoire »). Les projets nécessitent également le réglage suivant dans `Kconfig.proj` ; les exemples SiFli-SDK l'incluent déjà.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## Choisir un format { #choose-a-format }

SiFli-SDK prend en charge trois formats de table de partitions. Utilisez v3 pour tout nouveau travail, sauf si une carte ou un produit existant doit conserver sa configuration v1/v2.

<div align="center"><em>Tableau : Formats de table de partitions SiFli-SDK</em></div>
<div align="center" markdown>

| Format | Fichier de description | Modèle de données | Utiliser pour de nouveaux projets ? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | Liste de mémoires au format JSON, avec tags et métadonnées optionnelles `ftab`, `img` et `exec` | Non ; ne maintenir que les projets hérités. |
| v2 | `ptab.json` | Liste de mémoires au format JSON avec partitions d'image et d'exécution nommées et typées | Non ; à conserver lorsqu'une carte existante en dépend. |
| v3 | `ptab.yaml` | Partitions YAML avec `type`, `subtype`, `region`, `exec`, macros générées et overlays de projet | Oui. |

</div>

Le système de compilation recherche d'abord `ptab.yaml` (v3), puis se rabat sur `ptab.json` (v1/v2). Son ordre de recherche est le répertoire de la carte, le répertoire de la puce, la racine BSP et `customer/boards/<board>/`.

## v1 : tags JSON et métadonnées d'image { #v1-json-tags-and-image-metadata }

v1 utilise un tableau JSON dans `ptab.json`. Il n'a pas de champ de version dédié, mais il peut optionnellement commencer par un élément d'en-tête contenant `"version": "1"`.

Chaque entrée de mémoire définit :

- `mem` : nom de la mémoire, tel que `flash2` ou `psram1`.
- `base` : adresse de base hexadécimale de la mémoire ; vérifiez-la à l'aide du plan d'adressage mémoire de la cible.
- `regions` : liste des partitions au sein de cette mémoire.

Chaque région utilise `offset` et `max_size` en octets. Sa liste `tags` génère des macros de partition. Par exemple, `FLASH_BOOT_LOADER` produit `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET` et `FLASH_BOOT_LOADER_SIZE` ; l'adresse de départ est la `base` de la mémoire plus l'`offset` de la région.

<div align="center"><em>Tableau : Métadonnées de région optionnelles v1</em></div>
<div align="center" markdown>

| Champ | Objet |
| --- | --- |
| `ftab` | Décrit une entrée de Flash Table. |
| `img` | Nomme l'image dans la partition pour les scripts de programmation générés. Si un projet émet plusieurs binaires, utilisez `proj_name:binary_name`. |
| `exec` | Nomme le programme exécutable afin que les scripts partagés de l'éditeur de liens puissent sélectionner son adresse de code. |
| `custom` | Ajoute des macros personnalisées à valeur entière au `ptab.h` généré. |

</div>

Pour la PSRAM, la source distingue les espaces d'adressage CBUS et SBUS. Placez `exec` sur la partition CBUS pour que le code utilise l'adresse d'exécution ; placez une adresse `ftab` `xip` sur la partition SBUS lorsque cette adresse sert à copier le code.

## v2 : partitions JSON nommées et typées { #v2-named-and-typed-json-partitions }

v2 utilise également `ptab.json`, mais son en-tête doit déclarer `"version": "2"`. Les champs mémoire restent `mem`, `base` et `regions`. Une région conserve `offset` et `max_size`, et peut utiliser `tags` et `custom` ; v2 attribue en plus à la région un `name`, un `type` et, pour une partition d'exécution, un `core` optionnel.

<div align="center"><em>Tableau : Champs et types de région v2</em></div>
<div align="center" markdown>

| Champ ou type | Signification |
| --- | --- |
| `name` | Nom de partition. Les noms d'image de programme doivent correspondre au programme correspondant ou au nom `AddCustomImg`. Un programme multi-fichiers peut utiliser `proj_name:1`, `proj_name:2`, etc. |
| `core` | Cœur qui exécute une partition `app_exec` : `hcpu`, `lcpu` ou `acpu`. |
| `app_img` | Partition principale qui stocke une image de programme et est programmée par l'outil de flashage. |
| `app_img2` | Partition d'image de programme de secours, normalement associée à une partition principale pour les mises à jour. |
| `app_exec` | Espace d'adressage depuis lequel le programme s'exécute. |

</div>

`bootloader`, `main`, `dfu` et `ftab` sont des noms réservés. D'autres noms de programme sont disponibles pour les images définies par l'utilisateur, telles que `acpu`. Lorsque la table ne définit pas de partitions `ftab` et `bootloader`, l'outil génère une configuration par défaut ; examinez le `ptab.h` généré avant de vous y fier.

## v3 : partitions YAML et overlays { #v3-yaml-partitions-and-overlays }

v3 utilise `ptab.yaml` et est le format recommandé. Il remplace l'ancien modèle `tags` par des champs explicites `type` et `subtype`, découple une partition de la topologie physique via des noms de `region` logiques, et génère `ptab.h`, `ftab.bin` et des fragments de scripts de l'éditeur de liens dans le cadre de la compilation.

<div align="center"><em>Tableau : Champs de niveau supérieur et de partition v3</em></div>
<div align="center" markdown>

| Portée | Champ | Obligatoire | Signification |
| --- | --- | --- | --- |
| Niveau supérieur | `version` | Oui | Doit être `3`. |
| Niveau supérieur | `chip` | Oui | Référence de la puce, telle que `SF32LB525UC6`. |
| Niveau supérieur | `memory` | Non | Définitions de stockage externe. |
| Niveau supérieur | `partitions` | Oui | Liste des partitions. |
| Partition | `name`, `type`, `region`, `offset`, `size` | Oui | Nom, type, région de stockage logique et emplacement. `offset` et `size` acceptent un préfixe `0x` ou un suffixe `KB`/`MB`. |
| Partition | `subtype`, `exec`, `core`, `attrs` | Non | Sous-type, emplacement d'exécution du code lorsqu'il n'est pas exécuté en XiP, cœur cible et attributs personnalisés. |

</div>

Chaque définition de `memory` externe indique une interface `mpi` ou `sdmmc`, un `type` (`nand`, `nor` ou `sd`) et une taille. `region` peut référencer ces mémoires externes, `hpsys_ram` ou `lpsys_ram`.

Chaque `region` correspond à une adresse de stockage SBUS et à une adresse CBUS utilisée pour l'exécution par le CPU ou le XiP. Le SDK charge cette correspondance depuis les données SiliconSchema de la puce. Dans `FAL_PART_TABLE`, le nom du périphérique dépend de la `region` de stockage de la partition, et non de `exec` : `mpi1` à `mpi5` correspondent à `NOR_FLASH1_DEV_NAME` à `NOR_FLASH5_DEV_NAME`, tandis que `sdmmc1` et `sdmmc2` correspondent respectivement à `SDMMC1_DEV_NAME` et `SDMMC2_DEV_NAME`.

<div align="center"><em>Tableau : Types et sous-types de partition v3</em></div>
<div align="center" markdown>

| Type | Sous-type ou usage | Signification |
| --- | --- | --- |
| `ftab` | — | Partition Flash Table. |
| `bootloader` | — | Partition bootloader. |
| `app` | `factory` | Application principale d'usine ; génère `CODE_START_ADDR` et `CODE_SIZE`. |
| `app` | `dfu` | Application DFU indépendante. |
| `app` | `ex` | Partition de ressources. La compilation crée des sorties d'image de ressources spécifiques à la chaîne d'outils. |
| `data` | `flashdb_kv` | Base de données KV FlashDB ; génère les macros `KVDB_*` et participe à `FAL_PART_TABLE`. |
| `data` | `filesystem`, `littlefs`, `fat` ou `fatfs` | La documentation indique que `filesystem` génère les macros `FS_REGION_*` et participe à `FAL_PART_TABLE`. Ailleurs, elle cite aussi `littlefs`, `fat` et `fatfs` parmi les sous-types qui génèrent ces macros, tout en précisant qu'ils n'ont actuellement aucun effet ; vérifiez leur comportement dans la version du SDK cible. Cette même section sur les macros emploie aussi le sous-type `flashdb`, tandis que le tableau des sous-types et les règles FAL utilisent `flashdb_kv` ; ne considérez pas ces noms comme des alias sans vérification dans le SDK cible. |
| `data` | `ram`, `calibration`, `raw` ou `int_res` | Données en RAM, de calibration, brutes gérées par l'application, ou données de ressources internes liées dans l'ELF et réparties par nom de section. |

</div>

La `FAL_PART_TABLE` générée en v3 inclut uniquement `data/flashdb_kv`, `data/filesystem` et les partitions `app` dont le sous-type n'est pas `ex`. Elle exclut `ftab`, `bootloader`, `app/ex` et les autres sous-types de `data`, notamment `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration` et `int_res`. Les entrées générées utilisent le `name` de chaque partition ; les alias des anciennes configurations, tels que `main`, `dfu_code` et `fs_root`, ne sont pas convertis en noms de partition. Lors d'une migration vers v3, ne définissez pas `FAL_PART_TABLE` manuellement ; supprimez tout `custom_mem_map.h` présent au niveau de la carte pour éviter un avertissement de redéfinition.

Pour chaque partition, `ptab.h` génère les macros `<NAME>_START_ADDR`, `<NAME>_SIZE` et `<NAME>_OFFSET`, où `<NAME>` est le nom de la partition en majuscules. Si le type de mémoire de la région est reconnu, la macro `<NAME>_MEM_TYPE` est également générée. Pour une partition `app/factory`, `CODE_START_ADDR` utilise l'adresse de `exec` lorsqu'elle est définie ; sinon, il utilise l'adresse CBUS de la partition.

Utilisez `exec: {region, offset}` lorsque le code ne peut pas s'exécuter en place, par exemple une application stockée en Flash NAND et copiée en PSRAM. Sans `exec`, l'adresse de départ de code générée utilise l'adresse de stockage CBUS de la partition. `attrs` ajoute des macros personnalisées à `ptab.h`.

### Valeurs par défaut et overlays de projet { #defaults-and-project-overlays }

v3 déduit des valeurs par défaut système lorsque les partitions correspondantes sont absentes. Pour SF32LB52, `flash_table` et `bootloader` peuvent être déduits de la région de stockage de l'application d'usine du HCPU ; si le démarrage s'effectue depuis une mémoire NAND ou SDMMC, les partitions de données par défaut documentées sont également ajoutées. Pour SF32LB56 et SF32LB58, `flash_table` et `bootloader` sur `mpi5` interne peuvent être omis. Les fenêtres PSRAM SiP par défaut et les partitions RAM standard peuvent également être omises, sauf si le projet modifie la disposition RAM.

Pour une petite modification spécifique à un projet, utilisez `ptab.overlay.yaml` plutôt que de copier le `ptab.yaml` complet de la carte. Il peut ajouter une partition ou en remplacer une existante :

```yaml
partitions:
  - op: override
    name: fs_region
    size: 5MB

  - op: add
    name: log_region
    type: data
    subtype: raw
    region: mpi2
    offset: 0x00F00000
    size: 64KB
```

L'overlay spécifique à la carte a priorité sur l'overlay spécifique à la puce. Il ne peut modifier que les partitions : il ne peut changer `memory`, `chip` ou `version`, ni supprimer de partition. Il s'applique uniquement à un `ptab.yaml` v3 au niveau de la carte et ne peut pas être combiné avec un `ptab.yaml` ou `ptab.json` de projet complet. Si la carte utilise encore `ptab.json` (v1/v2) et qu'aucun `ptab.yaml` complet n'est sélectionné, la compilation ignore l'overlay, affiche un avertissement et poursuit avec le chemin sans overlay. Dans ce cas, il ne génère pas `ptab.effective.yaml`. Lorsqu'un overlay est appliqué, la compilation écrit le résultat dans `ptab.effective.yaml` pour inspection.

## Fichiers générés et validation { #generated-files-and-validation }

<div align="center"><em>Tableau : Sorties de compilation de la table de partitions</em></div>
<div align="center" markdown>

| Sortie | Objet |
| --- | --- |
| `ptab.h` | En-tête C généré contenant les macros de partition. |
| `ftab.bin` | Flash Table binaire utilisée par le bootloader. En v3, elle est générée directement par Python, sans sous-projet `ftab`. |
| `link_copy.lds` / `link_copy.sct` | Copies générées des scripts de l'éditeur de liens pour GCC ou Keil. v3 utilise des modèles Jinja2. |
| `ptab.effective.yaml` | Table v3 finale après traitement des overlays, lorsqu'un overlay est actif. |

</div>

Validez une table de carte v3 avant intégration :

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

Le validateur vérifie la syntaxe des noms de partition, les types et sous-types valides, les régions valides, les partitions qui se chevauchent et l'unicité du bootloader. Pour inspecter la configuration v3 effective utilisée par la compilation, exécutez :

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## Inspecter la Flash Table générée { #inspect-the-generated-flash-table }

Après une compilation, `ftab.bin` est placé dans le répertoire de compilation. Initialisez l'environnement SDK, puis inspectez le premier `build_*/ftab.bin` trouvé sous le projet actuel :

```bash
source ./export.sh
sdk.py ftab-dump
```

Sous Windows PowerShell, initialisez avec `./export.ps1`. Spécifiez un chemin lorsqu'un projet possède plusieurs répertoires de compilation de carte, et utilisez la sortie JSON lorsqu'un script consomme le résultat :

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

La vue tabulaire indique les entrées de partition, les descriptions d'image utilisées par les flux DFU et de démarrage, ainsi que les pointeurs vers les images en cours d'exécution du HCPU, du LCPU et du bootloader, et vers les images de démarrage.

## Revue du produit { #product-review }

- [ ] Le projet utilise intentionnellement la table de la carte ou une configuration de projet explicite.
- [ ] La syntaxe v1, v2 ou v3 sélectionnée correspond au fichier réellement trouvé par le système de compilation.
- [ ] Les emplacements de stockage et d'exécution des images sont corrects, en particulier pour le stockage non-XiP et la PSRAM.
- [ ] Les partitions d'application, de secours, de DFU, de système de fichiers, de calibration et de données gérées par l'application ont une capacité suffisante et ne se chevauchent pas.
- [ ] Les fichiers générés `ptab.h`, `ftab.bin` et, pour les overlays v3, `ptab.effective.yaml` ont été examinés.
- [ ] Une procédure de reprogrammation pour la récupération est consignée en dehors du parcours de mise à jour normal.

Pour les références source complètes, voir la documentation officielle de SiFli-SDK sur les [tables de partitions](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html) et [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html).
