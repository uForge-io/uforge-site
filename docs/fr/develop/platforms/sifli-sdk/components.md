---
icon: lucide/boxes
description: "Transformer le code d'exemple SiFli-SDK en composants réutilisables et paquets `sf-pkg` : critères de qualité, documentation attendue et pièges courants."
tags:
    - Développement
    - SiFli-SDK
---

# Composants et `sf-pkg` { #components-and-sf_pkg }

Les projets SiFli dépendent souvent de middlewares, de pilotes et de composants réutilisables. Lorsqu'un projet dépasse le stade de la simple copie d'un exemple, l'écosystème de paquets et de composants SiFli permet de publier et de maintenir ces briques firmware réutilisables.

## Quand utiliser des composants { #how-to-think-about-components }

Utilisez des composants pour le code destiné à être partagé entre plusieurs produits ou exemples :

- Pilotes de périphériques.
- Prise en charge des panneaux d'affichage.
- Services Bluetooth.
- Widgets d'interface graphique.
- Adaptateurs de capteurs.
- Utilitaires de stockage.
- Middleware propre au produit.

Conservez la logique propre à une seule application dans le projet applicatif jusqu'à ce qu'elle dispose d'une interface stable et soit utilisée par plusieurs utilisateurs.

## Flux de travail pratique { #practical-workflow }

1. Commencez par un exemple SDK fonctionnel.
2. Repérez la partie qui mérite d'être réutilisée.
3. Exposez-la par une API concise au périmètre clairement délimité.
4. Ajoutez la configuration au moyen du mécanisme habituel de compilation et de configuration du SDK.
5. Documentez les dépendances, l'utilisation mémoire et les périphériques requis.
6. Empaquetez-la ensuite seulement comme composant réutilisable.

## Distribuer des composants avec `sf-pkg` { #use-sf-pkg-to-distribute-components }

Un composant est une unité technique réutilisable. Le registre de composants de SiFli repose sur Conan ; la sous-commande actuelle du SDK est `sf-pkg`.

Pour utiliser un paquet, exécutez `sdk.py sf-pkg init` dans le répertoire `project` du projet SDK afin de créer `conanfile.py`. Ajoutez les références dans le champ `requires`, au format `package/version@<username>`, où `<username>` désigne le nom d'utilisateur du registre de paquets. Exécutez ensuite `sdk.py sf-pkg install` depuis ce même répertoire. Les paquets installés se trouvent dans `project/sf-pkgs` ; leurs fichiers Kconfig sont intégrés à `menuconfig`, sous `SiFli External Components`.

Pour publier un composant, exécutez `sdk.py sf-pkg new --name <package_name>` dans son répertoire et vérifiez le fichier `conanfile.py` généré. Vous pouvez ajouter `--support-sdk-version <sdk_version_range>` pour définir la plage compatible dès la création. Que vous utilisiez ou non cette option, vérifiez que la recette déclare la plage de versions du SDK visée dans `support_sdk_version` et ajustez-la si nécessaire. Choisissez une version de paquet conforme au versionnage sémantique et complétez les métadonnées et dépendances. Après vous être authentifié auprès du registre, compilez puis téléversez le paquet :

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

Le déroulement exact peut varier selon la version du SDK. Consultez les guides SiFli sur [l'intégration des paquets (en chinois)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), [la création et la publication (en anglais)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html) et [la version chinoise](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html) pour les étapes de configuration, d'authentification et les commandes propres à chaque version.

## Niveau de qualité d'un composant { #component-quality-bar }

Un composant peut être partagé lorsqu'il remplit les critères suivants :

- Il se compile à partir d'une copie propre du dépôt, avec la préparation de l'environnement et les dépendances documentées.
- Il possède un exemple minimal.
- Il documente la configuration requise.
- Il ne repose pas sur des hypothèses implicites liées à une carte particulière.
- Il signale les erreurs clairement.
- Il documente toute utilisation de ressources globales, ainsi que les règles de propriété et de libération.
- Il précise les règles relatives aux threads, aux callbacks et à la propriété de la mémoire.

## Ce qu'il faut consigner { #what-to-record }

Chaque composant réutilisable devrait documenter :

- Les puces et cartes prises en charge.
- La version SDK requise.
- Les périphériques et broches requis.
- La configuration RTOS/middleware requise.
- Le comportement des threads et des callbacks.
- Les besoins prévus en RAM, en Flash et en espace de pile.
- Le chemin du projet d'exemple.

## Pièges à éviter { #avoid-these-traps }

<div align="center"><em>Tableau : Pièges à éviter</em></div>

<div align="center" markdown>

| Piège | Meilleure approche |
|:-----|:----------------|
| Copier un exemple entier dans chaque produit. | Extraire uniquement la couche réutilisable stable. |
| Masquer les noms de broches dans le code du composant. | Fournir les ressources de la carte via la configuration. |
| Supposer qu'il n'existe qu'un seul chemin d'affichage/audio. | Documenter les chemins matériels pris en charge. |
| Ignorer l'utilisation mémoire. | Consigner les besoins prévus pour la pile, le tas, le DMA et les tampons. |
| Livrer sans exemple. | Inclure un exemple d'intégration minimal. |

</div>
