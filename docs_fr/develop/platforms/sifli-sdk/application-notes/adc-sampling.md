---
icon: lucide/chart-no-axes-column
title: "Échantillonnage avec le GPADC"
description: "Utiliser l'ADC à usage général (GPADC) sur SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x et SF32LB58x : limites électriques, cartographie des broches, accès au périphérique et étalonnage."
tags: [Développement, SiFli-SDK, Notes d’application, ADC]
---

# Échantillonnage avec le GPADC { #sample-with-gpadc }

Cette note consolide les guides ADC pour SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x et SF32LB58x. Le flux logiciel est commun, mais les limites d'entrée, les affectations de broches et les points d'étalonnage sont spécifiques à chaque famille. Sélectionnez la famille cible dans les tableaux avant de configurer le matériel ou le firmware.

Le GPADC est l'ADC à usage général de SiFli, destiné notamment à mesurer les sorties de capteurs et la tension de batterie. Il est distinct de l'ADC audio disponible sur SF32LB52x, SF32LB56x, SF32LB57x et SF32LB58x, ainsi que de l'ADC sigma-delta disponible sur SF32LB55x et SF32LB58x. Cette note couvre uniquement le GPADC ; pour les autres convertisseurs, consultez la documentation audio ou sigma-delta de la famille cible.

## Portée de l'ADC et modèle de canaux { #adc-scope-and-channel-model }

Les notes d'application du SDK pour SF32LB52x, SF32LB55x, SF32LB56x et SF32LB58x utilisent huit canaux ADC, `GPADC_CH0` à `GPADC_CH7`, pour des sources analogiques telles que les sorties de capteurs et la tension de batterie. La table des canaux ADC du SDK pour SF32LB57x définit douze canaux : `PA28`–`PA38` correspondent à `GPADC_CH0`–`GPADC_CH10`, et le canal de détection de batterie est `GPADC_CH11` (nommé `BAT` dans la table du SDK). Le guide de conception matérielle SF32LB57x nomme le signal correspondant du boîtier `VBAT` ou `VBATS` selon la variante d'alimentation. Une mesure correcte dépend du canal choisi, du réseau d'entrée et de l'étalonnage logiciel adapté au composant cible.

SF32LB52x possède un circuit dédié de mesure de batterie sur `GPADC_CH7` (`BAT`) : selon l'exemple du SDK, ce canal est relié à VBAT via un diviseur interne, et le facteur de conversion `vbat_factor` du SDK est appliqué pour obtenir la tension de batterie. En revanche, `GPADC_CH7` correspond au pad externe `PB32` sur SF32LB56x et `PB39` sur SF32LB58x. Le canal de mesure de batterie du SF32LB57x est `GPADC_CH11` ; utilisez le signal `VBAT` ou `VBATS` correspondant à la variante d'alimentation et respectez les limites propres à ce domaine. Ne déduisez pas qu'un canal relié à la batterie sur la carte est un canal batterie dédié dans la puce.

## Caractéristiques de l'ADC et réseau d'entrée { #adc-characteristics-and-input-network }

<div align="center"><em>Tableau : Caractéristiques des entrées GPADC normales par famille SF32</em></div>

<div align="center" markdown>

| Famille | Canaux GPADC | Résolution | Précision typique | Tension maximale sur une entrée GPADC normale |
|:-------|:--------------|:-----------|:-----------------|:--------------------------------------------|
| SF32LB55x | 8 | 10 bits | 3–4 mV | 1,1 V (X1) ; 3,3 V (X3) |
| SF32LB52x | 8 | 12 bits | 1–2 mV | 3,3 V |
| SF32LB56x / 58x | 8 | 12 bits | 1–2 mV | 3,3 V |
| SF32LB57x | 12 | 12 bits | 1–2 mV | 3,3 V |

</div>

Les tensions maximales indiquées ci-dessus s'appliquent aux entrées GPADC normales ; les canaux dédiés à la batterie ont leur propre circuit et leurs propres limites. L'exemple SF32LB55x utilise un diviseur de 1 MΩ / 220 kΩ avec un temps d'établissement RC de 157 ms. Le guide récapitulatif SF32LB56x indique 470 kΩ / 1000 kΩ et 200 ms pour SF32LB52x, SF32LB56x et SF32LB58x ; il ne formule pas cette recommandation pour SF32LB57x. Pour le 57x, suivez le circuit de détection de batterie et les limites documentés pour la référence exacte, sans extrapoler ces valeurs de résistance ni ce temps d'établissement. Ces recommandations concernent les réseaux diviseurs externes. En particulier, le canal dédié `GPADC_CH7` du SF32LB52x comporte déjà un diviseur interne. N'ajoutez pas de diviseur externe, sauf si le schéma de la carte cible le prévoit expressément. La tolérance des résistances influe sur la précision ; étalonnez séparément le diviseur externe en production lorsque la conception en utilise un.

<div align="center"><em>Tableau : Chemins de détection de la tension de batterie par famille SF32</em></div>

<div align="center" markdown>

| Famille | Chemin de mesure de batterie | Note de conception |
|:-------|:-----------------------------|:-------------------|
| SF32LB55x | Diviseur externe relié à une entrée GPADC sélectionnée ; le circuit de référence utilise `PB10` / `GPADC_CH1`. | Maintenez la sortie du diviseur sous la limite d'entrée du mode X1/X3 sélectionné. |
| SF32LB52x | Canal dédié `GPADC_CH7` / `BAT` ; l'exemple SDK indique que VBAT est reliée via un diviseur interne. | Utilisez `vbat_factor` du SDK pour convertir la mesure de ce canal dédié en tension de batterie. |
| SF32LB56x / 58x | Un diviseur externe de la carte alimente un pad GPADC sélectionné ; la référence SDK associe `GPADC_CH7` à `PB32` / `PB39`, respectivement. | Vérifiez le chemin réel du diviseur batterie dans le schéma de la carte cible. Ce sont des pads GPADC normaux, et non des canaux batterie dédiés dans la puce. |
| SF32LB57x | Canal dédié `GPADC_CH11` ; la table SDK le nomme `BAT`, tandis que le guide matériel emploie `VBAT` ou `VBATS` selon la variante d'alimentation. | Consultez la limite de mesure du canal batterie du composant exact. Pour les variantes alimentées en 3,3 V, le guide spécifie une plage de mesure GPADC `VBATS` de 0 à 4,5 V ; ne la remplacez pas par la limite de 4,7 V de la broche. |

</div>

Pour mesurer la batterie via une entrée externe du SF32LB55x, la FAQ d'OpenSiFli propose un diviseur de 1 MΩ / 220 kΩ avec des résistances à 1 %. Ces valeurs élevées réduisent le courant de fuite permanent du diviseur ; la tolérance de 1 % limite l'erreur du rapport de division et contribue à la précision de mesure. La sortie du diviseur est le point de mesure de l'ADC, et non la tension de la batterie. Pour adapter cette référence, tenez compte du schéma et des limites électriques de la cible.

![Référence du diviseur résistif VBAT du guide SDK SF32LB56x](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figure : Référence du diviseur résistif VBAT et du point de test ADC dans le guide SDK SF32LB56x.</em></div>

![Référence de tension du diviseur 1 MΩ / 220 kΩ SF32LB55x](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>Figure : Valeurs de référence de sortie du diviseur SF32LB55x issues de la FAQ ADC d'OpenSiFli.</em></div>

<div align="center"><em>Tableau : Tension de sortie de référence du diviseur SF32LB55x de 1 MΩ / 220 kΩ</em></div>

<div align="center" markdown>

| Tension de batterie en entrée | Sortie de `PB10_BAT_DET_ADC` |
|:------------------------------|:-----------------------------------|
| 3,0 V | 0,540983607 V |
| 3,3 V | 0,595081967 V |
| 3,6 V | 0,649180328 V |
| 4,0 V | 0,721311475 V |
| 4,2 V | 0,757377049 V |
| 5,0 V | 0,901639344 V |

</div>

Dans le schéma de référence du SF32LB55x, VBAT est relié à `PB10_BAT_DET_ADC` via R125 (1 MΩ). R126 (220 kΩ) et C118 (0,1 µF) relient ce nœud à la masse en parallèle. Ces valeurs sont données à titre de référence ; vérifiez-les selon le schéma et les limites électriques de la cible.

![Schéma du diviseur de tension de batterie externe SF32LB55x](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>Figure : Chemin d'échantillonnage de tension de batterie externe SF32LB55x.</em></div>

## Alimentation analogique et référence { #analog-supply-and-reference }

La configuration de l'alimentation analogique et des broches de référence dépend de la famille. Référez-vous au schéma du composant cible au lieu de supposer une broche VREF identique pour tous les GPADC :

<div align="center"><em>Tableau : Connexions d'alimentation et de référence GPADC par famille SF32</em></div>

<div align="center" markdown>

| Famille | Connexions d'alimentation et de référence |
|:-------|:------------------------------------------|
| SF32LB52x / 56x | Alimentez `AVDD33_ANA` à partir d'une ligne stable de 3,3 V. Le schéma de référence montre `GPADC_VREF` découplée à la masse ; cette broche n'est pas une entrée d'alimentation. |
| SF32LB55x | Le schéma de référence montre `AVDD33_ANA` et `AVSS33_ANA` ; suivez le schéma cible pour leur raccordement et leur découplage. |
| SF32LB57x | Alimentez `AVDD33_ANA` en 3,3 V. `GPADC_VREF` est une broche de référence : raccordez uniquement le condensateur prescrit à la masse et ne l'alimentez pas de l'extérieur. |
| SF32LB58x | Le schéma de référence montre `AVDD33_ANA` / `AVSS33_ANA`, `GPADC_VREFP` avec son condensateur prescrit et `GPADC_VREFN` reliée à la masse. Aucune des deux broches de référence ne constitue une entrée d'alimentation. |

</div>

La paire `GPADC_VREFP` / `GPADC_VREFN` du SF32LB58x ne correspond pas à la broche unique `GPADC_VREF` nommée dans les autres familles. Le schéma SDK présente aussi des composants de filtrage propres à chaque famille ; utilisez le circuit de référence et les valeurs de composants du composant cible. N'appliquez jamais directement une alimentation à une broche de référence GPADC. `AVDD33_ANA` est l'alimentation analogique et `AVSS33_ANA` la masse analogique lorsqu'elle est présente.

![Câblage de l'alimentation analogique et de la référence GPADC du guide SDK SF32LB56x](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figure : Câblage propre à chaque famille pour l'alimentation analogique et la référence GPADC, illustré dans le guide SDK SF32LB56x.</em></div>

## Configurer la broche ADC { #configure-the-adc-pad }

Configurez la broche d'entrée sélectionnée en fonction analogique avant l'échantillonnage. Les exemples d'API génériques du guide sont :

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

Ces appels illustrent l'API de broche analogique, pas une sélection de broche spécifique à une famille cible. Sélectionnez l'entrée physique dans ce mappage des canaux :

<div align="center"><em>Tableau : Cartographie broche-canal GPADC par famille SF32</em></div>

<div align="center" markdown>

| Famille | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

Les sources de SiFli ne concordent pas sur le brochage ADC du SF32LB52x : la [note d'application ADC dédiée au SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) indique, pour la révision A0, la correspondance suivante entre les pads externes `PB08`, `PB10`, `PB12`, `PB13`, `PB16`, `PB17`, `PB18`, `PB19` et les canaux `GPADC_CH0` à `GPADC_CH7` ; le [tableau ADC récapitulatif du guide SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) indique plutôt `PA28` à `PA34` pour `GPADC_CH0` à `GPADC_CH6`, et `BAT` pour `GPADC_CH7`. La ligne SF32LB52x ci-dessus reprend le tableau récapitulatif et ne constitue pas un brochage universel pour toute la famille 52x. Avant de router ou de configurer le GPADC d'un composant 52x, vérifiez la référence et la révision exactes dans la configuration de multiplexage du SDK correspondant et le schéma de la carte ; ne fusionnez pas ces deux correspondances.

Le SF32LB57x possède quatre canaux ADC supplémentaires : `PA36` est `GPADC_CH8`, `PA37` est `GPADC_CH9`, `PA38` est `GPADC_CH10`, et le signal de détection batterie est `GPADC_CH11` (`BAT` dans la table SDK ; `VBAT` ou `VBATS` dans le guide matériel selon la variante d'alimentation). Ce canal appartient au domaine batterie et possède une plage de mesure différente de celle des entrées GPADC ordinaires. Pour les variantes alimentées en 3,3 V, respectez la plage de mesure GPADC `VBATS` de 0 à 4,5 V indiquée dans le guide, et non la tension nominale de broche de 4,7 V. Le mappage à 12 canaux et l'entrée batterie ne sont donc pas interchangeables avec les mappages à huit canaux ci-dessus.

Sur SF32LB55x, il est également possible d'affecter directement une broche à un canal GPADC, par exemple avec `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`. Ne reprenez pas cette affectation spécifique pour une autre famille.

![Configuration du mode broche d'entrée de batterie analogique SF32LB55x](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>Figure : Configuration de broche SF32LB55x montrant le mode d'entrée analogique du circuit de mesure de batterie par ADC.</em></div>

## Lire un canal ADC { #read-an-adc-channel }

Le SiFli-SDK enregistre l'ADC comme un périphérique de mesure de tension de batterie ; le guide utilise `bat1` comme nom de périphérique par défaut. Avec l'interface de périphérique RT-Thread, trouvez le périphérique, ouvrez-le en lecture seule, activez le canal souhaité et lisez sa valeur brute :

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

Au niveau HAL, lisez le résultat de conversion avec `HAL_ADC_GetValue(&hadc, slot)`. Transmettez le handle ADC initialisé et le numéro de slot configuré pour la conversion ; vérifiez que ce slot correspond au canal et à la broche PAD attendus.

## Étalonnage de l'ADC et conversion de tension { #adc-calibration-and-voltage-conversion }

Le guide modélise la conversion comme une relation linéaire :

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset` est la valeur brute de l'ADC lorsque l'entrée est à 0 V ; `Ratio` est l'incrément de tension pour une unité de valeur brute. L'étalonnage en usine compense les variations de fabrication. Le guide décrit également un étalonnage en deux points du circuit d'entrée assemblé :

1. Appliquez deux tensions précises et stables et lisez les valeurs ADC correspondantes.
2. Utilisez les deux tensions d'étalonnage de la famille cible plutôt que 0 V ou la tension d'entrée maximale.
3. Utilisez `sifli_adc_calibration` pour calculer et conserver le rapport et le décalage.
4. Convertissez les valeurs brutes suivantes avec les paramètres d'étalonnage enregistrés. Pour calculer la tension en amont du diviseur, tenez également compte de son rapport de division.

L'implémentation source définit `ADC_RATIO_ACCURATE` à 1000, avec des valeurs initiales `adc_vol_offset` et `adc_vol_ratio` de 200 et 3930 respectivement. Cette fonction d'assistance historique illustre le calcul linéaire, mais ne remplace pas le processus d'étalonnage de la version SDK cible. Si le SDK cible fournit une API d'étalonnage HAL ou du pilote de périphérique, utilisez cette interface.

### Plages d'étalonnage SF32LB55x { #sf32lb55x-calibration-ranges }

La FAQ OpenSiFli décrit plus en détail le processus d'étalonnage du SF32LB55x. Lors de l'exécution de `sifli_adc_init`, la configuration d'usine stockée en Flash et identifiée par `FACTORY_CFG_ID_ADC` fournit les mesures d'étalonnage enregistrées. `sifli_adc_calibration` en déduit l'`offset` et le `ratio` linéaires ; les échantillons suivants utilisent le calcul `sifli_adc_get_mv` correspondant à la plage sélectionnée.

Deux plages d'étalonnage sont documentées :

![Sélection du mode d'étalonnage et flux des valeurs d'usine SF32LB55x](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>Figure : Initialisation de l'étalonnage SF32LB55x, sélection de plage et calcul décalage/ratio.</em></div>

- **Plage X1 :** 0,3 V et 0,8 V. Les valeurs d'étalonnage stockées ont le bit 15 défini, l'implémentation sélectionne donc le chemin de petite plage. La précision est réduite près de 0 V et au-dessus de 1 V. Ce chemin désactive `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, donc le diviseur interne est désactivé et le point de test ADC ne doit pas dépasser 1,1 V.
- **Plage X3 :** 1,0 V et 2,5 V. C'est la méthode d'étalonnage antérieure. Elle active `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, qui active le diviseur interne avec une atténuation 3× ; l'entrée ne doit pas dépasser 3,3 V.

![Contrôle du diviseur interne X1/X3 SF32LB55x](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>Figure : Contrôle d'activation/désactivation du diviseur interne SF32LB55x pour la plage d'étalonnage sélectionnée.</em></div>

Ne choisissez jamais une plage d'étalonnage à partir du tableau seul : utilisez la configuration d'usine et l'implémentation SDK cible. Les comportements X1 et X3 sont propres aux documents SF32LB55x cités ici ; ils ne constituent pas une règle à appliquer à une autre famille.

<div align="center"><em>Tableau : Points d'étalonnage en deux points indiqués dans la note ADC consolidée</em></div>

<div align="center" markdown>

| Famille | Entrées d'étalonnage |
|:-------|:-------------------|
| SF32LB55x | 0,3 V et 0,8 V |
| SF32LB52x / 56x / 58x | 1,0 V et 2,5 V |
| SF32LB57x | 1,0 V et 2,5 V |

</div>

Pour le SF32LB52x, les sources diffèrent selon leur version : la note ADC consolidée donne 1,0 V et 2,5 V pour l'étalonnage en deux points, tandis que la référence API HAL actuelle identifie la plage d'étalonnage par défaut du SF32LB52X comme X1, avec des points de 0,3 V et 0,8 V. Ne considérez pas ces deux paires comme des valeurs par défaut interchangeables. Avant de choisir les points d'étalonnage ou la limite d'entrée autorisée, vérifiez, pour le composant cible, la version exacte du SDK, les données d'usine et la plage d'étalonnage à l'exécution.

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### Valider l'étalonnage après le démarrage et le réveil { #validate-calibration-after-startup-and-wake }

Pour le débogage de la mesure de tension de batterie du SF32LB55x, la FAQ d'OpenSiFli indique que les valeurs peuvent être inexactes pendant les quelque 300 premières millisecondes suivant le démarrage ou le réveil, en raison de la charge et de la décharge du réseau RC. La forme d'onde observée se stabilise au bout d'environ 350 ms. Ajoutez un délai d'échantillonnage adapté ou écartez les premières valeurs instables. Lors de la mesure du nœud du diviseur avec un multimètre ou un oscilloscope, tenez compte de l'impédance d'entrée de l'appareil, qui peut provoquer une chute d'environ 30 mV selon la FAQ.

![Forme d'onde d'établissement au démarrage de l'échantillonnage de batterie SF32LB55x](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>Figure : Forme d'onde de démarrage SF32LB55x montrant le comportement d'établissement d'environ 350 ms.</em></div>

### Vérifier la broche ADC du SF32LB55x après le mode Standby et le réveil { #check-sf32lb55x-pin-configuration-after-standby }

Pour l'entrée de mesure de batterie du SF32LB55x sur `PB10`, vérifiez la configuration de la broche avant le passage en mode Standby et après le réveil. Avant l'initialisation, `PB10` possède par défaut une résistance de tirage haut interne. Dans `pinmux.c`, configurez la broche avec `PIN_NOPULL` et `PIN_ANALOG_INPUT`. Sinon, cette résistance peut rester active et provoquer ponctuellement des mesures anormalement élevées.

![Forme d'onde du nœud de mesure de batterie SF32LB55x en mode Standby](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple de forme d'onde du nœud de mesure de batterie SF32LB55x lorsque l'appareil est en mode Standby.</em></div>

![Forme d'onde du nœud de mesure de batterie SF32LB55x après réveil](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple de forme d'onde du nœud de mesure de batterie SF32LB55x après la sortie du mode Standby.</em></div>

## Vérification de mise en service { #bring-up-check }

Avant d'ajouter une acquisition multi-canaux ou cyclique, vérifiez un canal avec une entrée stable mesurée indépendamment :

1. Confirmez sa cartographie de broche spécifique à la famille cible et sa configuration analogique.
2. Confirmez que la sortie du diviseur reste dans la limite d'entrée ADC de la famille cible.
3. Comparez les résultats bruts et étalonnés avec la tension appliquée.
4. Conservez les conditions de diviseur et d'étalonnage avec le journal de test de la carte.

Lors du raccordement de l'UART de journalisation du SF32LB56x à un PC externe, le niveau de référence de l'adaptateur série doit correspondre à la tension d'E/S du circuit. La FAQ ADC d'OpenSiFli avertit qu'un adaptateur référencé à 5 V sur des E/S à 3,3 V peut fortement sous-estimer les mesures de l'ADC ; une batterie de 4 V peut, par exemple, être lue à 3,3 V.

## Source officielle { #official-source }

- [Guide d'utilisation et de configuration de l'ADC SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [Guide d'utilisation et de configuration de l'ADC SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [Guide d'utilisation et de configuration de l'ADC SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [Guide d'utilisation et de configuration de l'ADC SF32LB57x](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [Guide d'utilisation et de configuration de l'ADC SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [Référence de l'API HAL ADC SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html) — définitions de la plage d'étalonnage par défaut.
- Guide de conception matérielle SF32LB57x — Stockage et fabrication — affectation des canaux et pads GPADC.
- Guide de conception matérielle SF32LB57x — Système minimal et alimentation — connexions analogiques d'alimentation/référence et limites de détection batterie par variante.
- [FAQ ADC OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md) — plages d'étalonnage d'usine et validation SF32LB55x au démarrage, en veille et après réveil, ainsi que recommandations sur le niveau de l'UART de journalisation SF32LB56x.
