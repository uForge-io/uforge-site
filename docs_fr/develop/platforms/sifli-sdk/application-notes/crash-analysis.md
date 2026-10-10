---
icon: lucide/file-search-2
title: "Capturer les journaux et analyser les plantages"
description: "Capturer les journaux et les données mémoire associés, restaurer le contexte d'exécution au moment d'un plantage et analyser les assertions ou hard faults avec les outils SiFli-SDK."
tags: [Développement, SiFli-SDK, Notes d’application, Débogage]
---

# Capturer les journaux et analyser les plantages { #capture-logs-and-analyze-crashes }

Les guides `debug_logging` et `crash_analysis` du SDK sont complémentaires : les journaux indiquent ce que faisaient les deux cœurs, tandis qu'une image mémoire permet au débogueur de restaurer le contexte d'exécution au moment du plantage. Pour chaque capture, conservez l'ELF exact, les fichiers map/symboles, la révision du SDK, le modèle de puce, la configuration et la révision de la carte.

## Choisir une connexion de débogage { #choose-a-debug-connection }

<div align="center" markdown>

<em>Tableau : Connexions de débogage et de journalisation par famille SF32</em>

| Famille | Comportement de débogage et de journalisation |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | Le guide source documente la capture UART, `SifliUsartServer`/`AssertDumpUart` et la récupération avec J-Link/Trace32. Utilisez le transport qui reste disponible dans l'état de veille sélectionné. |
| SF32LB55x | La connexion SWD peut être commutée entre HCPU et LCPU avec `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` et `jlink_lcpu_a0.bat`. La console ROM du LCPU utilise l'UART3 à 1 000 000 bauds ; le HCPU peut utiliser l'UART1/2 ou SWD. Comme l'interface SWD utilise les E/S PB, maintenez le LPSYS actif ou en Light Sleep pendant la connexion. |

</div>

Lorsque le LPSYS quitte le mode Standby, l'interface SWD repasse sur le HCPU. Une réinitialisation J-Link ne change pas à elle seule le cœur sélectionné. Si la journalisation asynchrone est activée, un dump d'assertion peut être tronqué. Pour conserver toutes les informations en cas de défaillance, utilisez une capture synchrone ou une méthode qui conserve le dump complet.

## Capturer les données en direct ou après un plantage { #capture-a-live-or-post-mortem-package }

Pour les versions actuelles du SDK, effectuez la capture via UART ou J-Link avec `sdk.py` :

!!! note "Portée de l'exemple"
    La commande ci-dessous est un exemple SF32LB52/LB525. Conservez la structure de la commande, mais remplacez la puce/le modèle, le cœur, le transport et l'ELF par des valeurs prises en charge par la famille et la version du SDK ciblées.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Ajoutez `--include-psram --psram-size 8MB` lorsque la cible utilise la PSRAM. Une sonde J-Link peut utiliser `--transport jlink --jlink-ip 127.0.0.1:19025` ; sélectionnez le cœur concerné avec `--core hcpu` ou `--core lcpu`. Le répertoire de sortie doit contenir le binaire capturé, l'ELF/AXF du cœur, `log.txt`, `manifest.json` et `sdk_manifest.json`.

Pour les SDK plus anciens, utilisez la méthode spécifique à la famille décrite dans le guide source :

- UART : `SifliUsartServer` ou `AssertDumpUart` peuvent exporter un paquet d'assertion tant que la console reste disponible.
- J-Link/SWD : ajoutez J-Link au `PATH`, puis exécutez le script de la famille cible ; par exemple, pour SF32LB55x, utilisez `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. Le script correspondant sauvegarde la RAM, les registres EPIC et la PSRAM.
- Vérifiez que `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace` est activé lorsque des indices de fuite du tas sont nécessaires.

Pour une capture par script, choisissez le fichier `.jlink` adapté à la famille cible, à la configuration PSRAM et au mode de connexion. Utilisez le script IP avec `SifliUsartServer` et le script USB pour une connexion J-Link directe ; un décalage entre script et connexion peut faire échouer la capture.

![Option de trace mémoire SF32LB52x dans menuconfig](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — activez la trace mémoire avant de reproduire une défaillance si des informations sur le tas sont nécessaires.</em></div>

La capture UART nécessite normalement de faire correspondre l'utilitaire série, l'adresse du serveur et le cœur cible. Les captures d'écran du guide ci-dessous permettent de vérifier la connexion :

![Emplacement des outils SiFli_Trace et SifliUsartServer](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — répertoire des outils.</em></div>

![Paramètres de connexion SifliUsartServer pour SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — le port série, le débit en bauds, l'adresse du serveur et le cœur de débogage doivent correspondre à la cible capturée.</em></div>

![Script de sauvegarde RAM de l'analyseur de crash-dump](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — le répertoire contient des scripts propres à chaque famille et mode de connexion, comme `save_ram_55x.bat`, `save_ram_58x.bat` et `save_ram_uart_52x.bat`. Choisissez celui qui correspond à la cible et à la connexion.</em></div>

## Restaurer et analyser le contexte { #restore-and-analyze-the-context }

Convertissez les données capturées en un fichier core exploitable par le débogueur et analysez-le avec l'ELF correspondant :

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

L'ancien flux de travail Trace32 charge un paquet d'assertion HCPU avec le bouton d'assertion HCPU (HA) et `run_next_step` ; utilisez la configuration de récupération LCPU pour un dump LCPU. Si aucune pile d'exception ne s'affiche, vérifiez la sélection du cœur, l'ELF et les plages mémoire avant d'interpréter les registres.

![Exemple de sélection de script de capture Trace32](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — sélection du script de capture J-Link/Trace32.</em></div>

![Fenêtre d'assertion HCPU de Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — après récupération, inspectez ensemble la pile d'appels, la liste des threads, le tas et la cause de l'erreur.</em></div>

## Interrompre l'exécution au démarrage ou lors d'une condition de concurrence suspectée { #stop-early-during-boot-or-a-suspected-race }

Pour déboguer l'initialisation, décommentez la première instruction du `Reset_Handler` correspondant afin qu'elle devienne `B .` :

Les chemins des fichiers de démarrage ci-dessous correspondent au SF32LB55x ; utilisez les fichiers appropriés pour une autre famille.

- HCPU : `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU : `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Connectez J-Link et avancez le PC de deux octets pour continuer. En C, `_asm("B .");` crée le même arrêt intentionnel. Ne le remplacez pas par `while (1);` ; le compilateur pourrait optimiser et supprimer le code situé après la boucle.

## Interpréter les données de diagnostic { #read-the-evidence }

Un dump d'assertion inclut normalement la fonction et la ligne de l'assertion, la table des threads, l'état des boîtes aux lettres et des files de messages, les mutex, les sémaphores, l'utilisation du tas et les registres CPU. Associez l'adresse du PC au moment du plantage au fichier ELF exact, puis vérifiez l'espace de pile encore disponible, qui détient chaque ressource impliquée dans une attente bloquée, les entrées des files et la dernière ligne du journal avant la défaillance. Préservez le dump brut avant de le symboliser.

Pour l'inspection interactive, Ozone peut charger l'ELF HCPU/LCPU et le fichier SVD du Cortex-M33 avec FPU depuis `$SDK_ROOT/tools/svd_external`. Utilisez l'UART ou `SifliUsartServer` lorsque l'état du cœur empêche la connexion SWD. ULOG peut utiliser l'UART. Pour utiliser Segger RTT, activez son support puis sélectionnez `segger` comme périphérique de journalisation RT-Thread.

## Instrumenter les défaillances de bus et de mémoire { #instrument-bus-and-memory-failures }

Le moniteur de bus du SDK peut capturer les accès menant à un bus fault. Enregistrez un callback avec `dbg_busmon_reg_callback`, puis utilisez `dbg_busmon_read` et `dbg_busmon_write` de l'exemple du guide pour inspecter la plage d'adresses concernée. Associez cela au traçage du tas et au paquet de plantage ; un simple dump de registres sans symboles ni contexte mémoire est rarement suffisant.

![Exemple de pile d'appels du tas Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — pile d'appels du tas et fenêtres mémoire.</em></div>

Sources officielles par famille : [analyse de plantage SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html), et le [guide de débogage et de journalisation](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html) correspondant.
