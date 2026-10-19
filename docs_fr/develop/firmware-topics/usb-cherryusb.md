---
icon: lucide/usb
description: "Utilisation du matériel USB SF32 avec CherryUSB : cas d'usage CDC, HID, MSC, audio et MTP, liste de contrôle des descripteurs et tests d'énumération sur plusieurs systèmes d'exploitation."
tags:
    - Développement
    - USB
---

# USB et CherryUSB { #usb-and-cherryusb }

Pour les appareils SF32 et les cartes dotés d'un matériel USB pris en charge, la documentation et les exemples du SiFli-SDK présentent l'intégration de CherryUSB. Vérifiez les rôles et classes USB pris en charge pour la puce, la carte et la version du SDK utilisées, et traitez l'USB comme une pile logicielle complète, pas comme une simple fonctionnalité matérielle.

La mise en œuvre USB implique le firmware, les descripteurs, les systèmes d'exploitation hôtes, la gestion de l'alimentation et les outils de production. Un appareil qui s'énumère une fois sur l'ordinateur portable d'un développeur n'est pas pour autant terminé.

## Cas d'usage { #use-cases }

- Port série USB CDC.
- Périphériques HID.
- Stockage MSC.
- Microphone/haut-parleur audio USB.
- MTP.
- Prise en charge, en mode hôte USB, des périphériques CDC, HID, MSC, UVC et UAC, selon les capacités du SDK et de la carte.

## Flux de travail pratique { #practical-workflow }

1. Vérifiez que la carte dispose du connecteur USB et du chemin d'alimentation requis.
2. Partez de l'exemple USB du SDK le plus proche du cas d'usage.
3. Testez l'énumération sous Windows, macOS et Linux.
4. Vérifiez la suspension et la reprise, ainsi que le comportement après reconnexion du câble.
5. Consignez le VID/PID, les descripteurs et les exigences des pilotes hôtes.

## Ce qu'il faut tester { #what-to-test }

- Connexion avant la mise sous tension, puis branchement et débranchement pendant le fonctionnement.
- Réinitialisation pendant la connexion.
- Mise en veille/réveil de l'hôte.
- Déconnexion du câble pendant un transfert.
- Énumération sous Windows, macOS et Linux.
- Comportement d'appareil composite si plusieurs classes sont activées.
- Informer les utilisateurs qu'un câble USB de charge uniquement ne permet pas la communication de données.

## Liste de contrôle des descripteurs { #descriptor-checklist }

- La propriété du VID/PID est claire.
- La chaîne de produit est définitive ou versionnée.
- Le comportement du numéro de série est défini.
- Les valeurs de classe/sous-classe/protocole correspondent au pilote hôte visé.
- Les interfaces composites restent stables à travers les mises à jour du firmware.

## Exemples SDK { #sdk-examples }

L'[index officiel des exemples CherryUSB de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) sépare les exemples USB-périphérique et USB-hôte. Commencez par celui qui correspond au rôle et à la classe USB visés, puis appliquez à l'implémentation du produit les vérifications des descripteurs, de l'alimentation et de la compatibilité avec l'hôte.

<div align="center"><em>Tableau : Exemples CherryUSB de SiFli-SDK pour SF32LB58x</em></div>
<div align="center" markdown>

| Rôle USB | Exemple | Point de départ |
| --- | --- | --- |
| Périphérique | [Microphone USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | Microphone USB Audio Class 1 |
| Périphérique | [Microphone et haut-parleur USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | Audio duplex USB Audio Class 1 |
| Périphérique | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | Appareil de communication USB |
| Périphérique | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | Pont USB-vers-UART |
| Périphérique | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Appareil USB composite |
| Périphérique | [Souris HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | Périphérique de pointage USB HID |
| Périphérique | [MSC avec Flash NOR](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Stockage de masse adossé à une Flash NOR |
| Périphérique | [MSC avec disque RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Stockage de masse adossé à la RAM |
| Périphérique | [MSC avec deux disques RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Deux unités logiques adossées à la RAM |
| Périphérique | [MSC avec SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Stockage de masse adossé à une carte SD ou à l'eMMC |
| Périphérique | [MTP avec DFS et disque RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Appareil Media Transfer Protocol |
| Hôte | [Hôte CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Communiquer avec un périphérique CDC ACM |
| Hôte | [Hôte HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | Connecter et lire un périphérique HID |
| Hôte | [Hôte MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | Connecter un périphérique de stockage de masse USB |
| Hôte | [Hôte UVC + UAC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | Périphériques USB de classe vidéo et audio |

</div>
