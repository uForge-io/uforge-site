---
icon: lucide/footprints
description: "Tutoriels pratiques sur les périphériques SF32 après hello_world : GPIO, FinSH, ADC, PWM, RTC et un petit projet avec une carte de développement."
tags:
    - Tutoriels
---

# Premiers pas avec les périphériques { #beginner-tutorials }

Ces tutoriels font suite à la [prise en main](../index.md). Vous devriez déjà avoir installé la chaîne d'outils SiFli-SDK, flashé `hello_world` au moins une fois et savoir ouvrir la console série. Chaque tutoriel reste volontairement court : un concept, un périphérique et un critère de réussite clair.

Les exemples prennent pour référence une carte de la gamme SF32LB52-DevKit-LCD, telle que `sf32lb52-lcd_n16r8`. Si vous utilisez une autre carte, remplacez son nom dans la commande de compilation et vérifiez les broches, les instances de périphériques et la disposition mémoire à partir de ses fichiers de support.

Cette série vous aide à acquérir de bonnes habitudes : valider un comportement sur la carte, définir un critère de réussite clair et conserver une configuration de référence fonctionnelle avant de passer au périphérique suivant. Elle est conçue pour les personnes qui découvrent le SDK SF32, même si elles connaissent déjà le C embarqué.

## Avant de commencer { #before-you-start }

Utilisez la même boucle de base pour chaque tutoriel :

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

Laissez un terminal série ouvert. Vous résoudrez plus facilement la plupart des problèmes de débutant si vous pouvez voir la sortie de `rt_kprintf()` et l'invite `msh>` de FinSH.

Les exemples C sont des extraits, pas des fichiers source complets. Ajoutez les en-têtes, déclarations, initialisations propres à la carte, vérifications des valeurs de retour et libérations de ressources nécessaires à votre projet et à votre version du SDK.

<div align="center"><em>Tableau : Avant de commencer</em></div>

<div align="center" markdown>

| Élément | Vérification |
|:-----|:------|
| Nom de carte | Correspond à l'une des configurations de carte prises en charge. |
| Port série | S'ouvre proprement et affiche la sortie de démarrage. |
| Outil de flashage | Permet de reprogrammer la carte plusieurs fois sans changer de câble. |
| Schéma ou fichiers de la carte | Disponibles avant de choisir les ressources GPIO, ADC, PWM ou RTC. |
| Un changement à la fois | Compilez, flashez et vérifiez après chaque petite modification. |

</div>

## Faire clignoter une LED avec GPIO { #blink-an-led-with-gpio }

**Objectif :** piloter une broche GPIO depuis le firmware — l'équivalent embarqué d'une première compilation réussie.

**Durée :** 15 minutes

**Exemple de départ :** `example/hal/gpio` ou `example/rt_device/gpio`

Le SDK SF32 basé sur RT-Thread donne accès au GPIO via l'API standard **PIN device** de RT-Thread. Une boucle minimale pour faire clignoter une LED ressemble à ceci :

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(1, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. Copiez l'exemple GPIO le plus adapté dans votre répertoire de projet ou modifiez directement l'exemple pour vous familiariser avec le code.
2. Repérez la broche de la LED dans le schéma ou les fichiers de support de la carte. Ne devinez ni le port ni le numéro de broche.
3. Compilez et flashez avec le même nom de carte que celui utilisé pour `hello_world`.
4. Vérifiez que la LED clignote au rythme attendu.
5. Réglez le délai sur 100 ms, recompilez et vérifiez que le rythme visible change.

**Critères de réussite :** la LED s'allume et s'éteint de façon répétée, la console série continue d'afficher les messages de démarrage habituels et la modification du délai change le rythme de clignotement.

**Si cela ne fonctionne pas :** vérifiez la polarité active de la LED, la présence éventuelle d'un transistor, l'utilisation de la broche par une autre fonction et la correspondance entre le nom de carte choisi et la carte utilisée.

**Ce que vous avez appris :** l'abstraction PIN device, les définitions de broches propres à la carte et le cycle de base : modifier, compiler, flasher et vérifier.

## Lire un bouton avec une entrée GPIO { #read-a-button-with-gpio-input }

**Objectif :** lire une entrée numérique et réagir à un appui sur un bouton.

**Durée :** 20 minutes

**Exemple de départ :** `example/rt_device/gpio`

La lecture d'un bouton utilise la même API PIN en mode entrée. Commencez par une simple lecture pour confirmer le câblage et le niveau logique :

Dans le SDK SiFli, l'API PIN device de RT-Thread ne configure pas la résistance de pull-up ou de pull-down du pad via `rt_pin_mode()`. Pour un bouton actif à l'état bas, vérifiez que la carte comporte une résistance de pull-up ou configurez-la dans le pinmux propre à la carte avec `HAL_PIN_Set(...)`. Le pad, la fonction et le domaine CPU dépendent de la carte ; consultez les fichiers de support de la carte plutôt que de reprendre aveuglément une affectation de broche.

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

Pour une application qui dépasse le simple test, utilisez une interruption plutôt que d'interroger la broche en continu dans une boucle serrée. Le firmware peut ainsi réagir à un front d'entrée sans relire constamment la broche ; si la conception permet au CPU de dormir entre les événements, cela peut aussi réduire la consommation :

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. Identifiez un bouton ou une broche d'entrée disponible sur votre carte.
2. Commencez par une lecture par interrogation et affichez la valeur brute en appuyant et relâchant le bouton.
3. Confirmez si le bouton est actif à l'état haut ou actif à l'état bas.
4. Passez à un gestionnaire d'interruption une fois la lecture de base fonctionnelle.
5. Faites basculer la LED du Tutoriel 1 à chaque appui sur le bouton.
6. Ajoutez une stratégie d'anti-rebond simple, soit en ignorant les événements pendant un court intervalle, soit en validant le niveau après un court délai.

**Critères de réussite :** un appui physique provoque une seule action prévue du firmware, sans déclenchements répétés dus au rebond.

**Si cela ne fonctionne pas :** vérifiez que la résistance de pull-up ou de pull-down nécessaire est présente sur la carte ou configurée dans le pinmux. Contrôlez ensuite la polarité du bouton, le front d'interruption sélectionné et le partage éventuel de la broche avec le mode de démarrage, le débogage ou un autre périphérique.

**Ce que vous avez appris :** la configuration d'une entrée numérique, la distinction entre logique active à l'état haut et active à l'état bas, l'utilisation des interruptions et les raisons pour lesquelles les interrogations continues peuvent gaspiller de l'énergie. La [Vue d'ensemble de la basse consommation](../../learn/low-power/overview.md#sleep-aware-firmware-design) explique le mécanisme à l'échelle du système.

## Utiliser le shell et afficher une sortie de débogage { #use-the-shell-and-print-debug-output }

**Objectif :** vous familiariser avec la console FinSH et `rt_kprintf()` avant que le débogage ne devienne plus difficile.

**Durée :** 15 minutes

**Exemple de départ :** `example/system/finsh`

Le shell **FinSH** de RT-Thread fournit une invite interactive `msh>` sur le même UART que les messages de démarrage. Prenez tôt les habitudes suivantes :

- Utilisez `rt_kprintf()` pour des messages de débogage légers plutôt que d'écrire directement sur l'UART.
- Utilisez les commandes intégrées telles que `list_thread`, `list_device` et celles qui affichent l'état ou la mémoire pour inspecter le système en cours d'exécution.
- Gardez les journaux courts et significatifs ; une journalisation excessive peut modifier la temporisation et la consommation électrique.

1. Flashez l'un des exemples précédents et rouvrez votre terminal série.
2. Appuyez sur Entrée pour obtenir l'invite `msh>`.
3. Exécutez `list_thread` et `list_device`.
4. Ajoutez des appels `rt_kprintf()` au gestionnaire de bouton du Tutoriel 2.
5. Confirmez que les journaux apparaissent lorsque vous appuyez sur le bouton.

**Critères de réussite :** vous pouvez examiner les tâches et les périphériques depuis le shell et relier vos messages de journal aux événements physiques correspondants.

**Si cela ne fonctionne pas :** vérifiez le débit en bauds série, la sélection du port, si le composant shell est activé, et si un autre outil occupe le port série.

**Ce que vous avez appris :** comment examiner un système en fonctionnement sans débogueur et ajouter facilement des journaux utiles, plutôt que de modifier le firmware à l'aveugle pour diagnostiquer chaque problème.

## Lire un capteur analogique avec l'ADC { #read-an-analog-sensor-with-adc }

**Objectif :** mesurer une tension analogique fournie par un potentiomètre, un capteur simple ou une entrée de mesure de batterie.

**Durée :** 20 minutes

**Exemple de départ :** `example/rt_device/adc/channel`

Pour cet exemple RT-Thread, activez `BSP_USING_ADC`, `BSP_USING_ADC1` et `RT_USING_ADC` ; sinon, le SDK n'enregistrera pas `bat1`. Sur le SF32LB52, le canal 7 est relié en interne à VBAT : ce n'est donc pas une entrée générique pour capteur externe. Choisissez un canal ADC et un multiplexage de broche pris en charge par la puce et la carte concernées. Dans la configuration documentée pour le SF32LB52, le canal 0 utilise PA28. Dans l'exemple actuel du SDK SiFli, `rt_adc_read()` renvoie une tension mise à l'échelle en unités de 0,1 mV, et non des comptes ADC bruts. Vérifiez l'unité et la conversion pour la puce et la version du pilote utilisées.

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("bat1");
rt_adc_enable(adc, channel);
rt_uint32_t voltage_0p1mV = rt_adc_read(adc, channel);
```

1. Identifiez une broche et un canal compatibles ADC sur votre carte.
2. Confirmez la plage de tension d'entrée et s'il existe un diviseur ou un circuit d'entrée analogique.
3. Repérez le périphérique ADC enregistré, activez le canal et lisez sa valeur.
4. Appliquez la conversion documentée pour ce pilote. Dans l'exemple actuel du SF32LB52, divisez la valeur renvoyée par 10 pour obtenir des millivolts ; ne réappliquez pas une formule fondée sur les comptes bruts et la tension de référence. Si un diviseur externe est présent, tenez compte de son rapport pour retrouver la tension avant le diviseur.
5. Affichez le résultat via le shell du Tutoriel 3.
6. Faites varier lentement l'entrée et vérifiez que la valeur mesurée évolue progressivement.

**Critères de réussite :** la valeur mesurée évolue dans la direction attendue et correspond à une tension d'entrée plausible après application de l'échelle documentée et du rapport d'un éventuel diviseur sur la carte.

**Si cela ne fonctionne pas :** vérifiez le multiplexage de broches, le numéro de canal, l'échelle et l'étalonnage documentés du pilote, la plage d'entrée, si l'entrée est flottante, et si le capteur a besoin d'alimentation ou d'un temps de stabilisation avant l'échantillonnage.

**Ce que vous avez appris :** le motif `rt_device_find()` utilisé dans tous les pilotes de périphériques RT-Thread. Vous réutiliserez ce motif pour l'I2C, le SPI, le PWM, le stockage, et les pilotes personnalisés.

## Piloter une sortie PWM { #drive-a-pwm-output }

**Objectif :** générer un signal PWM pour faire varier l'intensité d'une LED ou piloter un buzzer simple.

**Durée :** 20 minutes

**Exemple de départ :** `example/rt_device/pwm`

Le nom du périphérique PWM dépend du pilote de timer activé pour la carte. Le SDK utilise des noms tels que `pwm3`, `pwmlp1` et `pwma1` ; `pwm3` dans l'exemple ci-dessous est indicatif et n'est pas universel. Vérifiez le nom du périphérique enregistré et le multiplexage de broches dans la configuration de la carte.

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm3");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. Choisissez un canal compatible PWM et confirmez le multiplexage de broches.
2. Choisissez une période adaptée au périphérique : suffisamment élevée pour éviter un scintillement visible de la LED, ou dans la plage audible pour un buzzer.
3. Balayez le rapport cyclique pour faire varier progressivement la luminosité d'une LED.
4. Essayez quelques tonalités fixes sur un buzzer en changeant la période.
5. Désactivez le PWM et confirmez que la sortie revient à un état de repos sûr.

**Critères de réussite :** changer le rapport cyclique change la luminosité ou changer la période change la tonalité, et désactiver le PWM laisse la sortie dans l'état attendu.

**Si cela ne fonctionne pas :** vérifiez si la broche est routée vers l'instance PWM, si le numéro de canal est correct, si la période et l'impulsion sont en nanosecondes, et si la charge externe a besoin d'un transistor de commande.

**Ce que vous avez appris :** la configuration période/rapport cyclique et le même motif de pilote de périphérique du Tutoriel 4 appliqué à une classe de périphérique différente.

## Lire et régler l'heure avec le RTC { #keep-time-with-the-rtc }

**Objectif :** lire et régler l'heure civile à l'aide du RTC intégré à la puce.

**Durée :** 15 minutes

**Exemple de départ :** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d\n",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. Réglez l'horloge RTC une fois au moyen d'une méthode prise en charge, par exemple une commande du shell.
2. Affichez l'heure actuelle périodiquement.
3. Éteignez puis rallumez la carte et vérifiez si l'heure est conservée.
4. Si elle ne l'est pas, vérifiez l'alimentation de secours de la carte avant de modifier le firmware.

Lors d'un test de rétention, ne réinitialisez pas systématiquement le RTC à chaque démarrage : cela masquerait la conservation éventuelle de l'heure précédente.

**Critères de réussite :** l'heure avance normalement lorsque la carte est alimentée et son comportement après une coupure correspond à la conception matérielle de la carte.

**Si cela ne fonctionne pas :** vérifiez que le composant RTC est activé, la source d'horloge, l'alimentation de secours et l'éventuelle réinitialisation du RTC au démarrage.

**Ce que vous avez appris :** l'API standard de gestion du temps en C utilisée avec le périphérique RTC de RT-Thread, ainsi qu'un premier exemple du lien entre le comportement du firmware et la conception matérielle.

## Mini-projet : enregistreur de capteur contrôlé par bouton { #mini-project-button-controlled-sensor-logger }

Après avoir terminé les six courts tutoriels, combinez-les en un petit projet :

1. Faites clignoter la LED au démarrage.
2. Utilisez le bouton pour démarrer ou arrêter l'échantillonnage.
3. Lisez une valeur ADC chaque seconde pendant que l'échantillonnage est actif.
4. Affichez des lectures horodatées via FinSH.
5. Utilisez la luminosité PWM ou une tonalité de buzzer pour indiquer si l'échantillonnage est actif.

**Critère de réussite :** le projet fonctionne plusieurs minutes sans déclenchements répétés du bouton, journaux incontrôlés ni réinitialisations inattendues.

## Liste de vérification pour la mise en service des premiers périphériques { #beginner-bring-up-checklist }

- [ ] Le nom de carte, le port série et la procédure de flashage ont été validés.
- [ ] La sortie GPIO fonctionne sur une vraie LED ou une broche mesurée.
- [ ] L'entrée GPIO fonctionne avec une polarité et un anti-rebond confirmés.
- [ ] Le shell FinSH est utilisable, et `list_thread` / `list_device` fonctionnent.
- [ ] Les valeurs ADC sont plausibles et converties en unités physiques.
- [ ] Les réglages de période/rapport cyclique PWM produisent la sortie physique attendue.
- [ ] Le comportement du RTC, y compris les limites de conservation de l'heure, est compris.

## Où aller ensuite { #where-to-go-next }

Une fois ces manipulations maîtrisées, passez à l'[intégration de sous-systèmes](intermediate.md). Cette étape combine les périphériques et le middleware : capteurs I2C, LVGL, BLE, lecture audio, stockage et tests de coexistence planifiés.
