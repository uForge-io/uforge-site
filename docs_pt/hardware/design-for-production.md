---
icon: lucide/clipboard-check
description: "Ponto de partida para o projeto de hardware SF32 para produção: guias de projeto de chips e módulos, checklists, definições de interface, componentes aprovados e bibliotecas EDA."
tags:
    - Hardware
    - Produção
---

# Projeto para produção { #design-for-production }

Use este fluxo depois de selecionar um chip ou módulo e antes de liberar o esquemático, o layout da PCB, a BOM ou o pacote de fabricação. Ele reúne referências de implementação que ajudam a reduzir os riscos durante o bring-up (ativação inicial) e a qualificação da primeira versão: guias de projeto de hardware específicos de cada dispositivo, checklists, definições de interface dos módulos, componentes aprovados e bibliotecas EDA.

## Fluxo recomendado para produção { #recommended-production-sequence }

Use este fluxo como um processo iterativo de revisão, não como uma transição única. Confira os símbolos e footprints antes de fabricar o protótipo. Libere os arquivos CAD e o pacote de fabricação para produção somente após revisar o projeto e validar o hardware previsto para produção. Repita as verificações afetadas sempre que houver mudanças na placa, no firmware ou na BOM.

<div align="center"><em>Tabela: Sequência de projeto para produção</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Etapa | Aplicação | Evidências a registrar |
|:------|:----|:-------------------|
| Arquitetura | Apresentação do produto e requisitos de interface | Componente, encapsulamento, memória, display, áudio e armazenamento selecionados; premissas de alimentação definidas. |
| Esquemático e layout | Guia de projeto de hardware do chip ou módulo | Implementação revisada de alimentação, clock, reset, RF, armazenamento, display e interfaces. |
| BOM | Lista de fornecedores aprovados (AVL) e datasheets dos componentes | Alternativas qualificadas ou validadas especificamente para cada item crítico. |
| Revisão do projeto | Checklist de projeto de hardware | Decisão documentada para cada item aplicável da lista e cada exceção. |
| Bring-up | Referências de placas de desenvolvimento, exemplos do SDK e testes com medições | Resultados reproduzíveis de boot, gravação, periféricos, comunicação sem fio, consumo de energia e recuperação. |
| Liberação do CAD para produção | Bibliotecas EDA oficiais e desenhos do encapsulamento | Símbolo, footprint, pinagem, padrão de pads e arquivos de fabricação verificados. |

</div>

## Use a referência adequada ao produto selecionado { #use-the-right-reference-for-the-chosen-product }

Use estas referências como ponto de partida para cada etapa da implementação:

- **[Guias de projeto de hardware](index.md#find-a-guide)** fornecem orientações específicas para cada chip sobre esquemático, layout, alimentação, interfaces e bring-up. Para módulos, incluem orientações de integração na placa portadora. Quando disponível, use o checklist correspondente; no caso de um módulo, consulte primeiro sua apresentação para confirmar se ele atende à arquitetura do produto.
- **[Módulos M2](m2-modules/interface-standards-overview.md)** apresentam as regras de nomenclatura M2 da μForge e uma proposta de definição de interface em nível de pino. Essa definição ainda é uma proposta; valide-a antes de assumir um compromisso de produção.
- **[CAD e componentes](cad-components/components-and-cad-libraries.md)** incluem a [AVL da SiFli](cad-components/sifli-approved-vendor-list.md) e as [bibliotecas EDA oficiais](cad-components/eda-tool-libraries.md). Nenhum desses recursos substitui a verificação final do componente exato, do desenho do encapsulamento e do guia de projeto selecionado.

## Uma referência de produção não substitui a validação { #a-production-reference-is-not-a-substitute-for-validation }

Guias de projeto e listas de componentes qualificados reduzem os riscos, mas não comprovam, por si só, que o produto está pronto. Valide a revisão final da PCB, a imagem de firmware, o gabinete, a bateria, o display, o dispositivo de armazenamento, o comportamento de RF, o ambiente de operação e o fluxo de testes de fabricação. Registre desvios em relação a um guia ou checklist como decisões explícitas de engenharia, não como exceções sem documentação.
