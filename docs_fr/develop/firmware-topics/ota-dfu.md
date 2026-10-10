---
icon: lucide/upload-cloud
description: "Utiliser le middleware DFU v2 de SiFli-SDK pour les mises à jour de firmware via USB-CDC, BLE et Bluetooth PAN, avec les paires application/chargeur documentées."
tags:
    - Développement
    - OTA
    - DFU
---

# OTA et DFU { #ota-and-dfu }

DFU v2 est le middleware de mise à jour du firmware de SiFli-SDK, destiné aux opérations DFU et OTA. Il propose trois canaux de transport : USB-CDC, BLE et Bluetooth PAN. Chacun dispose d'une application utilisateur et d'un sous-projet de chargeur correspondant.

Choisissez d'abord le mode de transfert adapté au processus de mise à jour du produit, puis partez de l'exemple d'application correspondant. Le chargeur associé est intégré automatiquement à la compilation.

## Structure de DFU v2 { #dfu-v2-structure }

<div align="center"><em>Figure : Structure de l'exemple DFU v2</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

L'application de chaque canal est conçue pour fonctionner avec le chargeur correspondant. Lors de la compilation de l'application, le SDK ajoute automatiquement ce chargeur comme sous-projet au moyen de la logique `AddDFU_*` de `building.py` ; il n'est donc pas nécessaire de le compiler séparément. Dans l'exemple BLE, l'application en cours d'exécution peut mettre à jour les images de firmware autres que celles du HCPU ; la mise à jour du HCPU nécessite de passer par le chargeur.

## Compatibilité et configuration { #compatibility-and-configuration }

DFU v2 est désactivé par défaut ; activez explicitement `USING_DFU_V2` dans la configuration du middleware. Il est disponible uniquement sur le HCPU (`BF0_HCPU`) et ne peut pas être activé avec les anciennes options DFU `BSP_USING_DFU` ou `USING_DFU_PAN`. L'activation de DFU v2 sélectionne FlashDB (`PKG_USING_FLASHDB`) pour permettre la reprise des transferts interrompus.

USB CDC et BLE sont des transports en mode push mutuellement exclusifs : choisissez `DFU_V2_USE_CDC_TRANSPORT` ou `DFU_V2_USE_BLE_TRANSPORT`. Bluetooth PAN utilise un transport en mode pull ; activez `DFU_V2_USE_PAN_TRANSPORT` avec le mode initié par l'appareil (`DFU_V2_USE_DEVICE_MODE`) et WebClient. Avant de définir l'architecture de mise à jour du produit, vérifiez les options disponibles dans la version du SDK cible.

## Choisir un canal de mise à jour { #choose-an-update-channel }

<div align="center"><em>Tableau : Sélection du transport DFU v2</em></div>

<div align="center" markdown>

| Canal | Chemin de mise à jour documenté | Cas d'usage type |
| --- | --- | --- |
| USB-CDC | Un PC met à jour l'appareil via un port série virtuel USB. | Production, laboratoire et maintenance filaire. |
| BLE | Une application BLE en mode périphérique reçoit une mise à jour. | Une application mobile met à jour un produit connecté. |
| Bluetooth PAN | L'appareil utilise le réseau Bluetooth PAN pour télécharger une mise à jour depuis un serveur HTTP. | Produits connectés qui téléchargent eux-mêmes leur image de mise à jour. |

</div>

## Vérifier le plan de mise à jour du produit { #product-update-review }

- [ ] Le transport sélectionné correspond au chemin de connexion disponible du produit.
- [ ] L'application et le chargeur correspondant sont compilés et testés dans le cadre d'un même parcours de mise à jour.
- [ ] La prise en charge de la carte cible est confirmée dans le README de l'exemple.
- [ ] Le comportement en cas d'interruption, les mécanismes de récupération et la procédure d'intervention en usine sont définis pour le produit.
- [ ] L'authenticité et l'intégrité de l'image de firmware, la politique de gestion des versions et la capacité des partitions sont vérifiées pour la version du produit.
- [ ] Les journaux d'échec de mise à jour restent récupérables même si l'application ne fonctionne plus.

## Compiler un exemple DFU v2 { #build-a-dfu-v2-example }

Depuis le répertoire `project/` d'un exemple, lancez la compilation suivante :

```bash
scons --board=<board-name> -j8
```

La liste des cartes prises en charge figure dans le README de chaque exemple. La configuration du middleware DFU v2 se trouve dans `middleware/dfu_v2` du SiFli-SDK.

## Exemples SDK DFU v2 { #dfu-v2-sdk-examples }

<div align="center"><em>Tableau : Exemples officiels SiFli-SDK DFU v2 pour SF32LB58x</em></div>

<div align="center" markdown>

| Canal | Application utilisateur | Sous-projet du chargeur |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

Pour l'index source complet et la navigation SDK actuelle, voir les [exemples DFU v2 dans SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
