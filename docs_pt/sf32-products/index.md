---
icon: lucide/cpu
title: "Produtos SF32"
description: "Explore o hardware SF32, planeje um produto, escolha um chip, módulo ou placa de desenvolvimento, reutilize projetos de referência e prepare o projeto para produção."
tags:
    - Hardware
    - Visão geral
---

# Produtos SF32 { #sf32-products }

A seção Produtos SF32 ajuda a transformar uma ideia de produto em um projeto SF32 implementável. Use-a para conhecer a família SF32, selecionar e validar o hardware, encontrar uma base técnica reutilizável e acessar os materiais necessários para preparar o projeto para produção.

## Escolha por onde começar { #choose-your-starting-point }

<div align="center"><em>Caminhos para escolher o hardware</em></div>

<div align="center" markdown>

| O que você precisa fazer | Comece por aqui | O que encontrará |
|:----------|:-----------|:--------------------|
| Conhecer a família SF32 | [Entenda o SF32](family/SF32_family.md) | Uma comparação das famílias e as regras de nomenclatura necessárias para interpretar o código de um dispositivo disponível para compra. |
| Transformar um conceito em plano | [Planeje um produto](family/product-planning.md) | Um fluxo por etapas, dos requisitos e da escolha do dispositivo à validação da placa e à preparação para produção. |
| Escolher um chip ou módulo | [Seletor de produtos SF32](product-selector.md) | Uma ferramenta interativa para filtrar chips e módulos, critérios de seleção e apresentações dos produtos. As placas de desenvolvimento são catalogadas separadamente para validação. |
| Reutilizar uma base técnica | [Projetos de referência](../hardware/reference-designs/reference-designs.md) | Bases reproduzíveis de hardware e software, o que foi validado e os limites de reutilização. |
| Preparar o projeto da placa para produção | [Projeto para produção](../hardware/design-for-production.md) | Guias de projeto, checklists, definições de interface, componentes aprovados e bibliotecas EDA oficiais. |

</div>

## Conteúdo desta seção { #what-this-section-covers }

Comece pela [Visão geral da família SF32](family/SF32_family.md) para conhecer as famílias disponíveis e as principais diferenças entre seus recursos. Depois de definir a família e o encapsulamento, consulte as [regras de nomenclatura](family/SF32_namingrule.md) para interpretar o código completo do componente.

Use o [Seletor de produtos SF32](product-selector.md) quando a escolha depender de requisitos como arquitetura de alimentação, encapsulamento, display, áudio, memória, GPIO, conectividade ou hardware especializado. O seletor ajuda a criar uma lista inicial; ainda é necessário confirmar o código exato do componente, o encapsulamento, os limites elétricos e o roteamento na placa com base na documentação correspondente da SiFli.

Depois de escolher uma direção, consulte os [projetos de referência](../hardware/reference-designs/reference-designs.md) e o [fluxo de projeto para produção](../hardware/design-for-production.md). Essas páginas conectam a seleção do dispositivo ao hardware de referência, às orientações de projeto, às bibliotecas CAD, às decisões sobre a BOM, aos checklists de revisão e às evidências de bring-up.

## Acesse diretamente o catálogo de hardware { #browse-hardware-directly }

Já sabe de que tipo de hardware precisa? Acesse diretamente o catálogo correspondente:

- [Chips](family/SF32_family.md) para consultar as famílias de dispositivos e selecionar um componente.
- [Módulos](modules/SF32LB52-MOD-1.md) para planejar uma placa portadora em torno de módulos com os circuitos de RF e os principais circuitos já integrados.
- [Placas de desenvolvimento](devkits/SF32LB52-DevKit-LCD.md) para encontrar hardware compatível e validar software e periféricos.

A documentação de hardware descreve o caminho de implementação física do produto. Para configurar o SDK, consultar exemplos e cadeias de ferramentas ou verificar o suporte às plataformas de software, acesse [Desenvolvimento](../develop/index.md).
