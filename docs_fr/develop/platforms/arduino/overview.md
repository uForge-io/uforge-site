---
icon: lucide/infinity
description: "ArduinoCore-zephyr pour SF32LB52 DevKit LCD : adéquation de la plateforme, identité de carte, choix de loader et de mode de compilation, limites d'intégration et voies d'escalade."
tags:
    - Développement
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) est un cœur Arduino basé sur Zephyr pour SF32. Cette solution convient aux sketches, aux essais de périphériques, aux démonstrations et aux premiers prototypes sur le **SiFli SF32LB52 DevKit LCD**.

!!! warning "Cœur bêta"
    OpenSiFli qualifie ce cœur de **BETA**. Les fonctionnalités, les API, le contenu des packages, le comportement du loader et les versions peuvent changer. Vérifiez le comportement actuel dans le README du projet et les Releases avant de choisir cette solution pour un produit.

Pour l'installation initiale de l'IDE, la sélection de la carte et du port, l'installation du bootloader et la vérification de Blink, consultez la page [Arduino](../../../getting-started/arduino/getting-started-arduino.md). Cette page vous aide à déterminer si Arduino convient et à maintenir un projet Arduino après sa première mise en route.

## Où Arduino trouve sa place { #where-arduino-fits }

Choisissez Arduino lorsque l'itération rapide et le modèle de sketch familier importent plus que l'accès complet aux capacités spécifiques à SF32. C'est un bon choix pour les preuves de concept, la validation simple de périphériques, les projets pédagogiques ou de démonstration, et les équipes disposant déjà d'une base de code Arduino.

Passez à [SiFli-SDK](../sifli-sdk/overview.md) lorsque le produit dépend d'une base de firmware destinée à la production, d'un réglage fin de la pile Bluetooth, d'applications riches en graphismes, d'une optimisation de la basse consommation, de la mise en service de la carte ou de middleware fournisseur. Utilisez [Zephyr](../zephyr/overview.md) lorsque vous avez besoin de contrôler directement le devicetree, Kconfig et la structure native des applications Zephyr.

<div align="center"><em>Tableau : Adéquation de la plateforme Arduino</em></div>

<div align="center" markdown>

| Choisir Arduino pour | Préférer une autre voie pour |
|:-------------------|:------------------------|
| Des sketches courts et des expérimentations rapides de périphériques. | Un produit exigeant un large éventail de fonctionnalités SF32 validées. |
| Des équipes déjà productives avec l'IDE Arduino ou Arduino CLI. | La mise en service de cartes personnalisées ou un contrôle approfondi de la Flash, de l'alimentation et du middleware. |
| Des démonstrations et des prototypes précoces destinés à valider la faisabilité. | Une configuration, des pilotes et une structure RTOS natifs Zephyr. |

</div>

## Identité de la carte { #board-identity }

Le package public actuel cible le SF32LB52 DevKit LCD. Conservez ces valeurs dans l'enregistrement du projet et dans les rapports de problème : elles déterminent la façon dont le sketch est compilé, chargé et associé à la carte.

<div align="center"><em>Tableau : Identité de la carte Arduino</em></div>

<div align="center" markdown>

| Élément | Valeur |
|:-----|:------|
| Titre dans le Boards Manager | **SiFli Serial Boards** |
| Plateforme Arduino | `sifli:sf32lb52` |
| Carte | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Cible Zephyr | `sf32lb52_devkit_lcd` |
| Variante | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Outil de téléversement | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

Un identifiant de carte SiFli ou Zephyr au nom similaire n'est pas interchangeable avec ce FQBN. Le choix de la carte détermine les paramètres de compilation et de téléversement.

## Modèle de compilation et de loader { #build-and-loader-model }

ArduinoCore-zephyr combine une API Arduino orientée sketch avec un loader Zephyr et une configuration spécifique à la carte. Les deux menus d'options affectent le comportement au démarrage et à l'édition de liens, pas seulement les options du compilateur.

<div align="center"><em>Tableau : Choix de compilation et de loader</em></div>

<div align="center" markdown>

| Option | Comportement | Implication d'ingénierie |
|:-------|:---------|:------------------------|
| Mode de compilation `Standard` | Démarre le sketch une fois chargé. | À utiliser pour le fonctionnement normal du sketch. |
| Mode de compilation `Debug` | Laisse le shell Zephyr en attente de `sketch`. | Utile uniquement lorsque le shell fait partie du flux de débogage. |
| Mode de liaison `Dynamic` | Empaquette le sketch pour le flux normal basé sur le loader. | Inclut le loader dans le budget d'exécution et de mémoire. |
| Mode de liaison `Static` | Utilise une image liée statiquement. | À utiliser pour l'investigation liée au loader ou lorsque ses compromis sont explicitement compris. |

</div>

Commencez avec **Standard** et **Dynamic**. En mode Debug, un sketch téléversé ne démarre pas tant que `sketch` n'est pas exécuté depuis le shell Zephyr ; c'est une cause fréquente d'un téléversement apparemment réussi, suivi d'une application qui ne démarre pas.

Le loader est un artefact distinct propre à la carte. Burn Bootloader est normalement une opération de première utilisation, de mise à jour ou de récupération, et non une étape systématique de chaque téléversement de sketch. Consignez ensemble la version du package Arduino et toute mise à jour du loader ; des hypothèses incompatibles sont difficiles à diagnostiquer par la suite.

## Limites d'intégration { #integration-boundaries }

Considérez le cœur Arduino comme une couche d'intégration plutôt qu'un remplacement de la plateforme Zephyr sous-jacente. Un sketch peut nécessiter des symboles ou sous-systèmes Zephyr que le loader n'expose pas ou n'active pas. Les symptômes typiques sont un symbole Zephyr non défini, un sous-système manquant, ou une pression mémoire due au chargement dynamique et au shell.

Avant d'ajouter une bibliothèque ou une fonctionnalité à un prototype de produit, vérifiez tous les points suivants :

- La version exacte du package, le FQBN, le mode de compilation et le mode de liaison.
- La révision de carte cible et sa procédure de téléchargement série/récupération.
- Un exemple testé pour le périphérique ou la bibliothèque requis.
- Un budget RAM et Flash mesurable avec la configuration de loader prévue.
- Une voie de récupération utilisant le loader Arduino ou le firmware SiFli-SDK.

Ne déduisez pas la prise en charge d'une bibliothèque uniquement parce qu'une API Arduino ou un pilote Zephyr au nom similaire existe. Validez sur le matériel cible la combinaison complète du sketch, du loader, de la carte et du package.

## Diagnostiquer et escalader { #diagnose-and-escalate }

Commencez par le guide de première mise en route si la carte n'est pas détectée, ne peut pas être flashée ou n'exécute pas Blink. Une fois cette configuration de référence validée, servez-vous du tableau suivant pour circonscrire le problème.

<div align="center"><em>Tableau : Répartition des problèmes Arduino</em></div>

<div align="center" markdown>

| Symptôme après validation de la configuration de référence | Première investigation |
|:-------------------------------------------|:--------------------|
| Le sketch ne démarre qu'après `sketch` | Confirmez que le mode Debug a été sélectionné intentionnellement. |
| Fonction ou sous-système Zephyr manquant | Vérifiez le README du cœur, les symboles exportés et la configuration du loader. |
| Échec mémoire ou instabilité | Mesurez le budget du sketch ; tenez compte du chargement dynamique et du shell Zephyr ; n'évaluez Static qu'avec un plan de récupération. |
| La bibliothèque compile mais le matériel ne fonctionne pas | Confirmez les hypothèses de broches de la carte et testez avec un exemple minimal spécifique à la carte. |
| Le téléversement ou la récupération échoue | Rétablissez la base de référence Arduino documentée, puis utilisez la voie de récupération SiFli-SDK de la carte si nécessaire. |

</div>

Pour un rapport de problème utile, incluez la version du package, la version de l'IDE ou de la CLI, le système d'exploitation, le FQBN, le mode de compilation, le mode de liaison, la révision de carte, la sortie complète du téléversement et le journal série.

## Pages liées { #related-pages }

- [Arduino](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
