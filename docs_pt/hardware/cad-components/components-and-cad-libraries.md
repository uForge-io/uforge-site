---
icon: lucide/boxes
description: "Use registros de qualificação de componentes e dados CAD oficiais em um projeto de produção SF32; depois, revise a BOM e o layout na ordem adequada."
tags:
    - Hardware
    - Produção
    - CAD
---

# Componentes e bibliotecas CAD { #components-and-cad-libraries }

Use esta página quando um dispositivo ou módulo SF32 selecionado passar da definição da arquitetura para uma BOM controlada e um projeto de PCB. Os dois recursos abaixo têm finalidades diferentes: a **Lista de fornecedores aprovados (AVL)** ajuda a selecionar componentes cuja adequação foi verificada pela SiFli, enquanto as **Bibliotecas de ferramentas EDA** fornecem símbolos, footprints e dados de projetos de referência para implementar corretamente o hardware escolhido.

Nenhum desses recursos substitui o guia de projeto de hardware específico do dispositivo, o desenho do encapsulamento ou a validação final na placa que será usada na produção.

## Escolha o recurso adequado { #choose-the-right-resource }

<div align="center"><em>Tabela: Recursos de componentes e CAD</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Recurso | Use para | Não substitui |
|:---------|:-----------|:----------------------------------|
| [Lista de fornecedores aprovados para SF32](sifli-approved-vendor-list.md) | Pré-selecionar cristais, indutores, memórias Flash e outros componentes qualificados e compatíveis; verificar requisitos elétricos e restrições de identificação pelo firmware. | Aprovação final dos componentes, qualificação da cadeia de suprimentos ou validação elétrica no produto. |
| [Bibliotecas de ferramentas EDA](eda-tool-libraries.md) | Obter um ponto de partida para símbolos de esquemático, footprints de PCB, desenhos de encapsulamento e recursos de projetos de referência nas ferramentas EDA compatíveis. | Verificação do código exato de pedido, das definições de pad stack, do processo de montagem ou da documentação vigente do dispositivo. |

</div>

## Sequência de revisão da BOM ao CAD { #bom-to-cad-review-sequence }

1. **Defina a base de implementação.** Selecione o chip ou módulo exato, o encapsulamento, a configuração de memória, a interface de tela e a arquitetura de alimentação. Consulte o guia de projeto de hardware correspondente antes de escolher os componentes auxiliares.
2. **Pré-selecione os componentes críticos com base na AVL.** Verifique os requisitos elétricos especificados, não apenas a correspondência do número de peça. Dê atenção especial à capacitância de carga e ao ESR do cristal, aos limites de corrente do indutor do conversor buck, à tensão e ao modo de temporização da memória Flash, à faixa de temperatura e à compatibilidade com o firmware.
3. **Crie o esquemático usando as bibliotecas oficiais.** Use as bibliotecas EDA e os projetos de referência pertinentes como ponto de partida. Compare separadamente cada símbolo, footprint, número de pino, padrão de pads (land pattern) e regra de keep-out com o datasheet vigente e o desenho do encapsulamento do componente selecionado.
4. **Revise a BOM e o layout completos em conjunto.** Confirme que cada componente qualificado atende à tensão e à corrente reais dos trilhos de alimentação, à velocidade da interface, ao processo de montagem e às restrições do gabinete. Aplique os requisitos do guia de projeto do dispositivo ou módulo relativos à alimentação, RF, clocks, memória, tela e acesso para depuração.
5. **Valide o hardware destinado à produção.** Teste a inicialização, a programação, os periféricos, a comunicação sem fio e a recuperação e meça o consumo de energia na revisão final da placa. Registre as alternativas aprovadas e todo desvio deliberado em relação ao guia ou à AVL.

## Limites práticos { #practical-boundaries }

- A AVL retrata a qualificação em uma versão específica. Confirme novamente sua revisão e a disponibilidade dos componentes antes de liberar a BOM de produção.
- Uma biblioteca EDA é um ponto de partida para o projeto, não uma prova de que o layout final pode ser fabricado ou está eletricamente correto.
- Se um componente não constar na AVL, avalie sua conformidade com os requisitos pertinentes e valide-o no hardware de destino antes de usá-lo em produção em volume.
- Em um produto baseado em módulo, comece pelo guia de projeto do módulo; a BOM e o layout da placa portadora também exigem o mesmo rigor de revisão.

Consulte [Projeto para produção](../design-for-production.md) para ver o fluxo completo de revisão do projeto ou volte ao [Seletor de produtos SF32](../../sf32-products/product-selector.md) se ainda não tiver definido o chip, o módulo ou a placa que servirá de base ao projeto.
