---
icon: lucide/route
description: "Fluxo completo de planejamento de um produto SF32: selecione o dispositivo e o nível de integração, valide o software em uma placa e prepare o projeto para produção."
tags:
    - Hardware
    - Planejamento de produto
---

# Planejar um produto { #plan-a-product }

Este guia organiza as decisões necessárias para levar um conceito baseado em SF32 dos requisitos iniciais, passando pela validação, até um plano de projeto pronto para produção. Siga as etapas na ordem enquanto o chip, o módulo, a placa de desenvolvimento, a plataforma de software e a abordagem de fabricação ainda não estiverem definidos.

## Roteiro de planejamento do produto { #product-planning-path }

<div align="center"><em>Tabela: Roteiro de planejamento de um produto SF32</em></div>

<div align="center" markdown>

| Etapa | Decisão principal | Comece por aqui | Critério de conclusão |
|:------|:-------------|:-----------|:---------------|
| 1. Defina os requisitos | Papel do dispositivo na comunicação sem fio, tela, áudio, IA, armazenamento, alimentação e orçamento de consumo de energia, área ocupada pelo encapsulamento e vida útil prevista do produto. | [Família SF32](SF32_family.md) | Uma lista priorizada de opções, com as interfaces obrigatórias e as restrições claramente definidas. |
| 2. Escolha o nível de integração | PCB personalizada com o chip montado diretamente, módulo com placa portadora ou placa de desenvolvimento para a validação inicial. | [Seletor de produtos SF32](../product-selector.md) | Dispositivo e abordagem de integração preferenciais, além da placa ou do módulo disponível mais próximo dos requisitos. |
| 3. Valide a base de software | Cadeia de ferramentas, fluxo de gravação, saída serial e um exemplo validado como funcional na placa selecionada ou na mais próxima. | [Primeiros passos](../../getting-started/index.md) | Processo reproduzível de compilação e gravação, com o log do console salvo. |
| 4. Valide os riscos do produto | Comportamento específico do produto em relação à tela, ao Bluetooth, ao áudio, à IA e ao armazenamento, além do caminho de alimentação e do perfil de consumo de energia. | [Tutoriais](../../getting-started/tutorials/overview.md), [Aprendizado](../../learn/index.md) e [Desenvolvimento](../../develop/index.md) | Medições documentadas dos subsistemas que determinam os riscos de custo, consumo de energia ou cronograma. |
| 5. Feche o plano de implementação | Esquemático, layout, plano de memória e partições, BOM, estratégia de testes, comportamento de atualização e recuperação e premissas de fabricação. | [Projeto para produção](../../hardware/design-for-production.md) | Pacote de projeto revisado e lista explícita dos itens que ainda precisam ser validados. |

</div>

## Não pule o ciclo de validação na placa { #do-not-skip-the-board-validation-loop }

Comparar a família de produtos e obter uma compilação bem-sucedida não basta para selecionar o dispositivo de produção. Antes de fechar o projeto de hardware, valide a placa mais próxima dos requisitos do produto e registre o nome da placa, a versão do SDK, o exemplo utilizado, os resultados medidos e as diferenças em relação ao produto pretendido. Se o produto final usar uma tela, um componente de armazenamento, um caminho de alimentação por bateria, uma antena ou uma placa portadora de módulo diferentes, valide cada item separadamente.

Depois de estabelecer a configuração inicial de hardware e software, consulte o [Projeto de referência](../../hardware/reference-designs/reference-designs.md) mais próximo para acompanhar um fluxo completo com um exemplo concreto.

## Lista de verificação para a transferência do projeto { #handoff-checklist }

- [ ] O chip ou módulo selecionado atende às restrições do produto quanto a interfaces, memória, encapsulamento, alimentação e consumo de energia.
- [ ] Há uma placa compatível ou um plano explícito de validação do hardware personalizado.
- [ ] A equipe de produto aprovou o fluxo de software e seu nível de maturidade.
- [ ] Os requisitos de recuperação, OTA/DFU, geração de logs e programação em fábrica estão definidos antes de fechar as decisões sobre partições e BOM.
- [ ] Foram identificados o guia de projeto de hardware, a lista de verificação, o AVL e a biblioteca EDA adequados.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi compilada e redigida sem um documento-fonte específico. Verifique as afirmações técnicas na documentação oficial da SiFli antes de confiar nelas.
