---
icon: lucide/rss
description: "μForge.io compte désormais sept langues de plus, traduites avec des outils LLM au fil de nombreuses itérations."
---

# Traduction multilingue, itération après itération [2026-10-07] { #multi-language-translation-2026-10-07 }

Les ingénieurs en systèmes embarqués lisent la documentation dans la langue dans laquelle ils pensent. μForge.io propose donc désormais, en plus de l'original en anglais, des traductions en chinois, japonais, espagnol, allemand, français, portugais et russe.

### Avec des outils LLM et de nombreuses itérations { #built-with-llm-tools }

Rien de tout cela n'aurait été réalisable sans les outils LLM, et nous leur en sommes reconnaissants. Ce n'était toutefois pas une exécution unique : il a fallu de nombreuses itérations, pour deux raisons. La première est la limite du forfait d'utilisation : une longue tâche de traduction atteignait souvent cette limite avant que toutes les pages soient terminées et devait attendre une réinitialisation ou se poursuivre ailleurs. Les multiples réinitialisations gratuites de ChatGPT nous ont beaucoup aidés ; nous lui en sommes reconnaissants. La seconde est que traduire ainsi est lent et peu efficace : les pages techniques sont longues et remplies de tableaux, de code, de noms de broches et de liens croisés, si bien que chaque passage produisait un résultat à vérifier, corriger et relancer.

### Garder des traductions cohérentes { #keeping-translations-consistent }

Pour que les itérations convergent, nous tenons un glossaire des termes qui doivent rester non traduits (références de composants, unités, noms de protocoles) ou suivre une traduction validée, ainsi qu'une liste de contrôle qualité couvrant l'exhaustivité technique, l'exactitude des liens et des ancres, et l'intégrité du Markdown et du code. Chaque langue conserve la même structure de pages que l'original anglais, et les compilations sont vérifiées en mode strict : un lien cassé ou une page manquante fait explicitement échouer la compilation, au lieu de passer inaperçu jusqu'à la publication.

### Une réserve et une demande { #caveat-and-request }

Ces traductions sont assistées par machine et les pages en anglais restent la référence. Comme aucune de ces langues n'est notre langue maternelle, certaines pages peuvent ne pas sembler naturelles aux locuteurs natifs. Lorsqu'un détail technique compte pour votre conception, vérifiez-le sur la page en anglais et dans la documentation officielle de SiFli. Si vous repérez une erreur de traduction ou un terme maladroit, ou si vous pensez qu'une page peut être améliorée, [dites-le-nous](../../about/contact.md) ; ces retours alimentent directement le glossaire afin que la même erreur ne revienne pas.

### La suite { #next }

Nous continuerons à affiner la terminologie, à solliciter des relectures de lecteurs natifs lorsque c'est possible, et à maintenir les traductions à jour quand les pages anglaises évoluent.
