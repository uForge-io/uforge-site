---
icon: lucide/timer-reset
title: "Configurer le watchdog"
description: "Activer, réarmer et valider les chemins watchdog HCPU et LCPU du SF32 avec SiFli-SDK."
tags: [Développement, SiFli-SDK, Notes d'application, Watchdog]
---

# Configurer le watchdog { #configure-the-watchdog }

La documentation SiFli-SDK décrit le watchdog à deux niveaux : le matériel accessible par la HAL et le pilote RT-Thread utilisé par les applications. Les noms d'instances, la portée de la réinitialisation et les options d'horloge varient selon la famille ; consultez le comparatif ci-dessous et vérifiez la configuration du SDK cible avant de vous appuyer sur un comportement particulier.

<div align="center" markdown>

<em>Tableau : Comportement du watchdog documenté par famille</em>

| Famille | Comportement du watchdog selon la HAL | Horloge indiquée dans le guide HAL |
|---|---|
| SF32LB52x | Le guide HAL décrit des watchdogs dédiés au HCPU et au LCPU, capables de générer une interruption ou de réinitialiser leur propre sous-système, ainsi qu'un IWDT système qui réinitialise toute la puce. | La description du compteur utilise une horloge 32K ; le guide ne précise pas d'option de sélection d'horloge propre au 52x. |
| SF32LB55x | WDT1 pour le HCPU et WDT2 pour le LCPU peuvent générer des interruptions ; leur réinitialisation matérielle est limitée au sous-système correspondant. L'IWDT système ne génère pas d'interruption, mais peut réinitialiser toute la puce. | Sélection entre RC10K et 32K LXT. |
| SF32LB56x / SF32LB58x | Le guide HAL indique que WDT1/WDT2 peuvent également réinitialiser toute la puce. | RC10K ; l'horloge ne provient plus de l'horloge basse consommation 32K. |

</div>

!!! warning "Portée du guide watchdog RT-Thread"
    Le [guide d'utilisation du watchdog](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html) est publié sous le chemin `sf32lb52x`, mais son texte mentionne explicitement SF32LB55X. Le délai par défaut de 30 secondes, le réarmement depuis le thread IDLE, le comportement en veille et la séquence de réinitialisation applicative décrits ci-dessous concernent la configuration 55x documentée dans ce guide ; ils ne constituent pas une garantie commune à toute la famille SF32. Vérifiez ces points dans les sources et la configuration générée pour la famille cible.

## Activer et configurer le watchdog { #enable-and-configure-the-watchdog }

Exécutez `sdk.py menuconfig` dans le répertoire du projet et activez l'option watchdog dans la configuration des pilotes de périphériques RT-Thread. Le libellé exact du menu peut varier selon la version du SDK ; consultez la page source de la famille cible et vérifiez le `rtconfig.h` généré avant de compiler.

Le guide d'utilisation du watchdog référencé présente deux paramètres distincts :

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer` active le temporisateur watchdog matériel de la puce.
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers` active le pilote RT-Thread.

Pour la configuration 55x décrite dans le guide référencé, le délai par défaut indiqué est de 30 secondes. Dans le menu du pilote, `(30) Watch Dog timeout (NEW)` permet de choisir une autre valeur. Vérifiez le délai par défaut de la famille cible dans `menuconfig` et conservez la configuration générée avec l'image du firmware.

Les figures ci-dessous montrent l'emplacement du menu et le champ de délai dans le guide référencé. Le chemin de l'URL et la famille citée dans le texte ne concordant pas, elles servent uniquement d'illustration ; vérifiez le chemin réel du menu et la valeur par défaut dans la sortie `menuconfig` du projet.

![Option du pilote watchdog dans menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>Figure : Menu du pilote watchdog présenté dans le guide d'utilisation du watchdog référencé.</em></div>

![Option du temporisateur watchdog dans menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>Figure : Configuration du temporisateur watchdog présentée dans le guide d'utilisation du watchdog référencé.</em></div>

## Stratégie de réarmement { #feeding-policy }

Le thread `IDLE` de RT-Thread réarme le watchdog. Tant qu'aucun thread applicatif ne s'exécute sans interruption au-delà du délai configuré, aucun code applicatif supplémentaire n'est nécessaire.

Si un thread de priorité élevée doit s'exécuter en continu plus longtemps que le délai, réarmez le watchdog depuis ce thread à l'aide de :

```c
rt_hw_watchdog_pet();
```

N'ajoutez pas de boucle de réarmement inconditionnelle qui masquerait un blocage de l'ordonnanceur ou un interblocage. Le point de réarmement doit témoigner de la progression normale du travail supervisé.

## Comportement en veille et en réinitialisation { #sleep-and-reset-behavior }

- L'entrée en `Standby` ou en `Hibernate` désactive le watchdog ; il est réactivé après le réveil.
- Dans les autres modes de veille, le watchdog continue de fonctionner ; le système doit donc se réveiller et le réarmer avant l'expiration du délai.
- Le HCPU utilise le watchdog système. Une expiration redémarre l'intégralité de la puce.
- Le LCPU utilise le watchdog du sous-système LCPU. Une expiration génère d'abord une interruption ; le gestionnaire d'interruption déclenche ensuite un redémarrage logiciel de l'intégralité de la puce.

## Séquence de validation { #validation-sequence }

1. Consignez la famille de puce, la révision du SDK, le délai d'expiration, le responsable du réarmement du watchdog et le mode de veille.
2. Vérifiez qu'une charge de travail normale atteint le point de réarmement prévu.
3. Interrompez délibérément le mécanisme de réarmement, puis vérifiez la portée de la réinitialisation et le comportement au démarrage attendus.
4. Répétez depuis chaque mode de veille pris en charge, en particulier `Standby` et `Hibernate`.
5. Conservez les observations de la réinitialisation et les données de diagnostic au démarrage avec le compte rendu du test de récupération du produit.

## Sources officielles { #official-sources }

- [Guide d'utilisation du watchdog (anglais ; publié sous le chemin SF32LB52x, le texte désigne SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [Guide d'utilisation du watchdog (chinois ; même chemin SF32LB52x, le texte désigne SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [Guide HAL WDT SF32LB52x (anglais)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [Guide HAL WDT SF32LB55x (chinois ; avec les différences 56x/58x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

Les chemins suivants de notes d'application watchdog propres à chaque famille n'ont pas pu être vérifiés : `sf32lb55x/app_note/watchdog.html`, `sf32lb56x/app_note/watchdog.html` et `sf32lb58x/app_note/watchdog.html`. Les recherches et les tentatives d'accès direct n'ont pas permis de conclure ; cela ne prouve pas que ces chemins renvoient une erreur 404.
