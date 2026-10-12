---
icon: lucide/waypoints
description: "Compare os roteiros de projetos de referência da μForge: avalie fluxos reproduzíveis de validação de hardware e software e siga o mais próximo do seu produto."
tags:
    - Hardware
    - Projeto de referência
---

# Projetos de referência { #reference-designs }

Os projetos de referência conectam o planejamento do produto à implementação. Uma base reutilizável de hardware e software deve identificar o hardware inicial, a versão de software, os arquivos de projeto disponíveis, as evidências de bring-up (ativação inicial) e os limites de reutilização. Os roteiros desta seção ajudam a estabelecer e validar essa base; sua inclusão não comprova a publicação de um esquemático, uma BOM ou um pacote de qualificação para produção.

Use [Planejar um produto](../../sf32-products/family/product-planning.md) para formar uma lista inicial de opções. Em seguida, escolha abaixo o roteiro mais próximo do seu produto para organizar a validação da placa e reduzir os riscos do projeto.

## Projetos de referência e projetos de produto { #reference-designs-and-projects }

Use um projeto de referência para responder: **“De qual base técnica reutilizável posso partir?”** Use um [projeto de produto](../../projects/index.md) para responder: **“Como levo um produto específico dessa base até as decisões de integração e lançamento?”**

<div align="center"><em>Tabela: Diferença entre projeto de referência e projeto de produto</em></div>

<div align="center" markdown>

| Item | Projeto de referência | Projeto de produto |
|:-----|:-----------------|:--------|
| Função principal | Uma base técnica reutilizável. | Um roteiro específico do produto para integração e decisões de lançamento. |
| Evidências principais | Base de hardware e software, arquivos de projeto ou sua disponibilidade, resultados de bring-up e limites de reutilização. | Decisões de produto, dependências, etapas de adaptação, pontos de controle de validação e evidências de lançamento. |
| Expectativa de reutilização | O leitor pode adotar e adaptar a base para vários produtos. | O leitor acompanha o desenvolvimento de um produto específico e controla as alterações próprias desse produto. |
| Relação | Inclui links para os projetos que adotam a base. | Quando aplicável, inclui um link para o projeto de referência que serviu de ponto de partida. |

</div>

## Roteiros disponíveis { #available-journeys }

O roteiro atual de dispositivo vestível conectado é um fluxo de validação, não um pacote publicado de uma placa de referência. Ele ainda não publica uma combinação fixa de revisões de placa e SDK, uma versão dos arquivos de projeto nem um registro de qualificação baseado em medições. Defina e registre essas bases para o seu produto antes de considerar os resultados reproduzíveis.

<div align="center"><em>Tabela: Roteiros de projetos de referência</em></div>

<div align="center" markdown>

| Roteiro | Foco do produto | Base de hardware | Base de software | Ênfase da validação |
|:--------|:--------------|:------------------|:------------------|:--------------------|
| [Dispositivo vestível conectado](connected-wearable-journey.md) | Produto compacto alimentado por bateria, com display, BLE e entrada de sensores. | SF32LB52-DevKit-LCD ou uma placa alternativa adequada, seguida de uma placa personalizada com o chip ou módulo selecionado. | `hello_world` do SiFli-SDK e exemplos relevantes para o produto. | Display, Bluetooth, comportamento dos sensores, suspensão/retomada, recuperação e evidências do projeto para produção. |

</div>

## Como usar um roteiro { #how-to-use-a-journey }

1. Confirme se o foco do produto e o hardware selecionado para o roteiro atendem às restrições do seu projeto.
2. Reproduza a base de software na placa indicada antes de adaptá-la.
3. Anote no registro do projeto o nome exato da placa, a versão do SDK, o exemplo, o comando de compilação e gravação e o log serial.
4. Inclua uma validação específica para cada alteração de display, dispositivo de memória, alimentação por bateria, projeto de RF, gabinete ou interface.
5. Use os resultados como insumos para [Projeto para produção](../design-for-production.md), incluindo o guia e o checklist selecionados, as decisões sobre a AVL, o procedimento de recuperação e os riscos restantes.

## Como adicionar um roteiro { #adding-a-new-journey }

Antes de apresentar um roteiro como uma base de referência reproduzível, documente o produto e o público-alvo, as versões de hardware e software compatíveis, os pré-requisitos, o repositório de origem, os marcos, os critérios de validação, as medições e como os resultados serão usados na adaptação do produto. Se ainda for um fluxo de planejamento, indique esse estado e as evidências pendentes, sem sugerir que a base já foi qualificada.

Para desenvolvimentos de ponta a ponta focados em um produto e que vão além de uma base reutilizável, consulte [Projetos](../../projects/index.md). Recomenda-se que cada projeto mantenha um link para o projeto de referência pertinente, sem duplicar sua base de hardware, seus arquivos de projeto ou seus materiais de produção.
