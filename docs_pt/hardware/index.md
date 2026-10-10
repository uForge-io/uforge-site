---
icon: lucide/cpu
title: Hardware
description: Reaproveite uma referência de projeto SF32 ou desenvolva com o dispositivo escolhido e prepare o projeto para a produção.
---

# Hardware { #hardware }

Depois de escolher um dispositivo SF32 e validar uma configuração básica em uma placa de desenvolvimento, use esta seção para projetar a placa ou a placa portadora do módulo e preparar o produto para produção. Reaproveite um projeto de referência se ele for adequado, siga o guia do dispositivo escolhido e reúna as evidências e a documentação necessárias à revisão de prontidão para produção.

## Escolha por onde começar { #choose-a-starting-point }

<div align="center"><em>Caminhos de hardware</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Sua tarefa | Comece por aqui | Resultado |
|:-----------|:----------------|:----------|
| Reaproveitar uma configuração validada de hardware e software | [Projetos de referência](reference-designs/reference-designs.md) | Um ponto de partida reproduzível, os aspectos de validação e os limites de reaproveitamento. |
| Projetar uma placa com o chip montado diretamente ou uma placa portadora para um módulo | [Encontre o guia adequado](#find-a-guide) | Orientações de implementação para o chip ou módulo escolhido e a lista de verificação disponível. |
| Planejar uma interface de módulo conforme a proposta M2 | [Módulos M2](m2-modules/interface-standards-overview.md) | As regras de nomenclatura M2 e a proposta preliminar de pinagem a verificar para o módulo escolhido. |
| Preparar arquivos CAD e BOM | [CAD e componentes](cad-components/components-and-cad-libraries.md) | Bibliotecas EDA oficiais, recursos de AVL e verificações necessárias para o componente escolhido. |
| Liberar um pacote de projeto | [Projeto para produção](design-for-production.md) | Revisão de prontidão para produção, evidências a manter e transferência para fabricação. |

</div>

## Encontre um guia { #find-a-guide }

Escolha o chip ou módulo principal do projeto e consulte o material de implementação correspondente. Se ainda precisar confirmar o encapsulamento, a alimentação, a configuração de memória ou a forma de integração, comece pela apresentação do produto.

### Guias e listas de verificação para chips { #chip-guides-and-checklists }

<div align="center"><em>Tabela: Guias e listas de verificação para chips</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Família de chips | Guia de projeto de hardware | Lista de verificação | Comece por aqui para |
|:-----------------|:----------------------------|:--------------------|:---------------------|
| SF32LB52x | [Guia](chip-guides/SF32LB52x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Projetar uma placa com o SF32LB52x montado diretamente. |
| SF32LB55x | [Guia](chip-guides/SF32LB55x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Projetar uma placa com o SF32LB55x montado diretamente. |
| SF32LB56x | [Guia](chip-guides/SF32LB56x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Projetar uma placa com o SF32LB56x montado diretamente. |
| SF32LB57x | Guia | Esquemático / Layout da PCB | Projetar uma placa com o SF32LB57x montado diretamente. |
| SF32LB58x | [Guia](chip-guides/SF32LB58x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Projetar uma placa com o SF32LB58x montado diretamente. |

</div>

### Guias de módulos { #module-guides }

<div align="center"><em>Tabela: Guias de integração de módulos</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Módulo escolhido | Guia do módulo | Use para |
|:-----------------|:---------------|:---------|
| SF32LB52-MOD-1 | [Guia do módulo](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Alimentação da placa portadora, planejamento dos pinos, área livre ao redor da antena e cuidados de manuseio durante a fabricação. |
| SF32LB56-MOD | [Guia do módulo](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Integração na placa portadora, alimentação, layout dos circuitos de RF, interfaces e validação. |
| SF32LB58-MOD | [Guia do módulo](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Alimentação da placa portadora, planejamento dos pinos, área livre ao redor da antena e cuidados de manuseio durante a fabricação. |

</div>

## Siga o fluxo de projeto de hardware { #follow-the-hardware-path }

1. **Reaproveite um projeto de referência quando ele for adequado.** Antes de adaptá-lo, reproduza a configuração de hardware e software especificada. Se não houver uma referência compatível, comece pelo guia do dispositivo escolhido.
2. **Implemente e revise.** Consulte o guia correspondente antes de desenhar o esquemático e use a lista de verificação ao revisar o esquemático e o layout da placa. Antes de fechar o hardware, valide o software e os periféricos previstos na [placa de desenvolvimento](../sf32-products/index.md) mais próxima da sua configuração. Os testes na placa de desenvolvimento não substituem a validação da alimentação, das funções dos pinos e da RF na placa final.
3. **Consulte os materiais M2 se a placa portadora for adotar a proposta M2.** Aplique as [regras de nomenclatura M2](m2-modules/M2%20Interface%20Naming%20Rules.md) e confirme a [definição da interface](m2-modules/M2-interface-definition.md) para o módulo exato antes de fechar sua interface; a definição dos pinos ainda é preliminar.
4. **Verifique os arquivos CAD e a seleção de componentes.** Em [CAD e componentes](cad-components/components-and-cad-libraries.md), confira, para o código exato da peça, o símbolo, o footprint, o desenho do encapsulamento, a AVL e as premissas sobre componentes críticos.
5. **Conclua a revisão de prontidão para produção.** Avance para [Projeto para produção](design-for-production.md) com as evidências do projeto, os desvios aprovados, os riscos pendentes e as premissas dos testes de fabricação.

## Continue o desenvolvimento { #stay-connected-to-the-platform-path }

Se ainda não decidiu qual dispositivo, módulo ou placa de desenvolvimento usar, volte a [Produtos SF32](../sf32-products/index.md). Para estabelecer uma configuração reproduzível de toolchain, gravação de firmware e logs seriais, consulte [Primeiros passos](../getting-started/index.md). A seção [Desenvolvimento](../develop/index.md) apresenta orientações de implementação de software que também devem ser validadas com o hardware.
