---
icon: lucide/rss
description: "A primeira publicação do blog da μForge.io: nosso propósito, o que construímos no último mês e os próximos passos da documentação do SF32."
---

# A primeira publicação do blog [2026-07-31] { #the-first-blog-2026-07-31 }

Esta é a primeira publicação do blog. É uma boa oportunidade para explicar, de forma direta, para que serve a μForge.io.

Quem avalia um novo microcontrolador não deveria precisar juntar informações espalhadas por um datasheet, uma página wiki e uma discussão em fórum para entender o panorama completo. A μForge.io reúne informações sobre a família SF32 de microcontroladores de ultrabaixo consumo da SiFli. São chips com conectividade Bluetooth, recursos gráficos e foco em AIoT, voltados a wearables, telas inteligentes e outros produtos conectados alimentados por bateria. Reunimos em um só lugar as referências que costumam ficar espalhadas por datasheets, wikis e PDFs, organizando-as conforme as etapas reais de desenvolvimento: escolher o componente, comprovar que funciona, integrá-lo ao projeto e entregar o produto. Para conhecer melhor a proposta, veja [Sobre](../../about/index.md).

### Por que SF32, e por que agora? { #why-sf32-right-now }

Dois fatores justificaram a criação de uma plataforma documental inteira em torno da SF32.

O primeiro é a diversidade arquitetural. A SF32 não é simplesmente uma CPU mais rápida com mais memória Flash. A família abrange dispositivos de núcleo único, projetos heterogêneos de dois núcleos e plataformas multimídia de três núcleos. A aceleração gráfica e a descompressão por hardware complementam esses processadores, em combinações que variam conforme a família. Assim, as equipes de produto podem equilibrar o desempenho das aplicações, as tarefas sempre ativas e o custo de integração.

O segundo motivo é que o ecossistema é particularmente aberto. O código-fonte do SDK, as notas de aplicação de hardware e os guias de projeto estão disponíveis publicamente na organização OpenSiFli no GitHub e no wiki e na documentação da própria SiFli, com um nível de acesso que muitos fabricantes de microcontroladores não oferecem. Ainda assim, em comparação com ecossistemas como ESP32 e STM32, a SF32 continua pouco conhecida fora das equipes que já a utilizam, apesar do acesso público aos materiais. É por isso que organizar essa documentação agora é importante, sem esperar que o ecossistema amadureça por conta própria.

### O que fizemos no último mês { #whats-happened-over-the-past-month }

Partimos de uma ideia inicial e chegamos a um site de documentação funcional, construído com [Zensical](https://zensical.org/). Agradecemos à equipe da Zensical pelo gerador de sites estáticos que tornou isso possível. Antes de escrever cada página, revisamos várias vezes a estrutura geral para organizá-la segundo a forma como um engenheiro pensa e conduz um projeto, em vez de seguir um organograma ou a estrutura documental de um fabricante. Com essa estrutura definida, cobrimos as famílias SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x e SF32LB58x com introduções, dados comparativos e guias de projeto de hardware, além de informações sobre seus módulos e placas de desenvolvimento. Publicamos um seletor interativo de produtos para filtrar chips e módulos por alimentação, memória, display e interfaces, sem precisar comparar cinco datasheets manualmente. Também criamos o percurso de Primeiros passos e Tutoriais, análises aprofundadas de arquitetura na seção Aprender (STAR-MC1, PSRAM e tipos de memória, PTM) e orientações para preparar o projeto para produção, do esquemático à entrega do hardware.

### Próximos passos { #whats-next }

Nosso foco imediato é ampliar a cobertura e assegurar a precisão: expandir os guias de projeto de hardware e as listas de verificação, e continuar conferindo o conteúdo com a documentação oficial da SiFli à medida que ela é atualizada. Depois, virão mais projetos de referência, exemplos práticos nas seções Desenvolvimento e Tutoriais e melhorias contínuas no seletor de produtos, guiadas pelas dúvidas reais de aquisição que forem surgindo.

Se notar algum erro ou informação faltando, [conte para nós](../../about/contact.md). Esse retorno é o que mantém o conteúdo útil.
