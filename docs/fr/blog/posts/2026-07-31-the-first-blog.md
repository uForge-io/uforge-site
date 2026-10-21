---
icon: lucide/rss
description: "Le premier article du blog μForge.io : notre mission, ce que nous avons construit le mois dernier et ce qui vient ensuite pour la documentation SF32."
---

# Premier article du blog [2026-07-31] { #the-first-blog-2026-07-31 }

Ceci est le premier article de ce blog ; c'est donc le bon endroit pour dire clairement à quoi sert μForge.io.

Les ingénieurs qui évaluent un nouveau microcontrôleur ne devraient pas avoir à reconstituer le tableau complet à partir d'une fiche technique, d'une page de wiki et d'un fil de forum éparpillés sur le web. μForge.io rassemble des informations sur la famille SF32 de SiFli, des microcontrôleurs à très basse consommation. Ces composants dotés du Bluetooth et de capacités graphiques ciblent des produits AIoT tels que les objets connectés portés, les écrans intelligents et d'autres produits connectés alimentés par batterie. Nous organisons des documents de référence habituellement dispersés entre fiches techniques, wikis et PDF autour du véritable parcours de développement d'un produit : choisir un composant, prouver qu'il fonctionne, l'intégrer à la conception et livrer. Pour la version longue, consultez [À propos de ce site](../../about/index.md).

### Pourquoi SF32, et pourquoi maintenant { #why-sf32-right-now }

Deux éléments ont fait de SF32 un sujet digne d'une plateforme de documentation entière.

Le premier est l'étendue architecturale. SF32 n'est pas seulement un processeur plus rapide avec plus de mémoire Flash. La famille couvre des composants mono-cœur, des conceptions hétérogènes à deux cœurs et des plateformes multimédias à trois cœurs. L'accélération graphique et la décompression matérielle complètent ces processeurs, la combinaison exacte variant selon la famille. Les équipes produit disposent ainsi de plusieurs façons d'arbitrer entre performances applicatives, tâches permanentes et coût d'intégration.

Le second est que l'écosystème est exceptionnellement ouvert. Le code source du SDK, les notes d'application matérielles et les guides de conception sont publics via l'organisation GitHub d'OpenSiFli ainsi que le wiki et la documentation de SiFli, à un niveau d'accès que beaucoup de fabricants de microcontrôleurs n'égalent pas. Comparé à des écosystèmes comme ESP32 ou STM32, SF32 reste peu connu en dehors des équipes qui l'utilisent déjà : les ressources sont réellement ouvertes, mais la plateforme n'est pas encore largement reconnue. C'est pourquoi il est utile d'organiser cette documentation dès maintenant, plutôt que d'attendre que l'écosystème gagne en visibilité de lui-même.

### Ce qui s'est passé le mois dernier { #whats-happened-over-the-past-month }

Nous sommes passés d'un concept initial à un site de documentation fonctionnel construit avec [Zensical](https://zensical.org/). Nous remercions l'équipe de Zensical pour le générateur de sites statiques qui l'a rendu possible. Avant de rédiger les pages individuelles, nous avons affiné à plusieurs reprises la structure du site pour qu'elle reflète la façon dont les ingénieurs abordent un projet, plutôt qu'un organigramme ou la documentation existante d'un fabricant. Une fois la structure stabilisée, nous avons développé la couverture des familles de puces SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x et SF32LB58x : présentations, données comparatives et guides de conception matérielle, ainsi que des informations sur leurs modules et leurs cartes de développement. Nous avons aussi publié un sélecteur de produits interactif qui filtre les puces et les modules selon les exigences de consommation, de mémoire, d'affichage et d'interfaces, ce qui évite de recouper cinq fiches techniques à la main. Le site comprend désormais un parcours Démarrage et Tutoriels, des analyses d'architecture approfondies dans Apprendre (STAR-MC1, PSRAM et types de mémoire, PTM) et des conseils de préparation à la production pour mener une conception du schéma au matériel livré.

### La suite { #whats-next }

La priorité immédiate est la couverture et l'exactitude : étendre les guides de conception matérielle et les listes de contrôle, et continuer à vérifier le contenu par rapport à la documentation officielle de SiFli à mesure qu'elle est mise à jour. Ensuite, attendez-vous à davantage de conceptions de référence, à plus d'exemples détaillés dans Développement et Tutoriels, et à un affinement continu du sélecteur de produits à mesure que de vraies questions d'approvisionnement arrivent.

Si vous remarquez une erreur ou un manque, [dites-le-nous](../../about/contact.md) — ces retours sont précisément ce qui garde ce site utile.
