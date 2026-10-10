---
icon: lucide/plug
description: "Regras de nomenclatura da interface M2 dos módulos μForge e das especificações de extensão M2xM/M2xA/M2xN/M2xH/M2xP, com exemplos de declaração e princípios de projeto."
tags:
  - Hardware
  - Módulo
  - Interface
---

# Regras de nomenclatura da interface M2 da μForge { #forge-m2-interface-naming-rules }

## Especificação base { #base-specification }

Este documento define os nomes usados na proposta de sistema de interfaces de módulos da μForge. Trata-se de uma convenção de nomenclatura, não de uma norma elétrica ou mecânica publicada.

Nesta convenção, **M2** identifica a interface base comum obrigatória para os módulos que adotarem o sistema. Esse requisito não significa que todos os módulos atuais da μForge ou da SiFli implementem M2. A pinagem e os requisitos elétricos e mecânicos de M2 ainda estão em desenvolvimento e não são definidos aqui.

Antes de declarar M2 compatível com M.2 E-key, uma definição M2 publicada precisaria especificar a interface mecânica, a pinagem, os limites elétricos, os sinais obrigatórios e opcionais, os requisitos da placa portadora e as regras de conformidade. A [Definição da interface M2](M2-interface-definition.md) atual é um rascunho: o nome M2, por si só, não comprova compatibilidade elétrica com M.2 nem que um módulo possa ser utilizado de forma intercambiável com diferentes placas portadoras.

## Especificações de extensão { #extension-specifications }

Os recursos opcionais são agrupados em especificações de extensão **M2xY**. Os nomes identificam categorias funcionais, mas não garantem que um módulo específico implemente todas as funções de uma categoria.

**Formato de nomenclatura:**

> **M2xY**

Em que:

- **M2** = especificação da interface base
- **x** = separador de extensão
- **Y** = categoria da extensão

## Categorias de extensão { #extension-categories }

<div align="center"><em>Categorias de extensão M2</em></div>

<div align="center" markdown>

| Especificação | Descrição |
|:--------------|:----------|
| **M2xM** | Multimídia: recursos futuros para tela RGB, câmera DVP, microfone digital e áudio avançado. |
| **M2xA** | Analógica: recursos futuros de E/S analógica de precisão e aquisição de dados. |
| **M2xN** | Rede: recursos futuros para Ethernet, CAN e redes industriais. |
| **M2xH** | Alta velocidade: interfaces futuras de grande largura de banda. |
| **M2xP** | Alimentação: recursos futuros de gerenciamento de energia e E/S de alta corrente. |

</div>

Estas descrições indicam o escopo previsto de cada categoria, não requisitos elétricos definitivos. A planilha local da proposta contém mapas de atribuição de contatos para M2 e M2xM. O artigo de definição também resume M2xN e M2xA, mas não foram encontrados dados originais de mapeamento de contatos que permitam verificar esses resumos; portanto, eles devem ser considerados não verificados. M2xH e M2xP são nomes reservados, sem contatos atribuídos.

## Declaração do módulo { #module-declaration }

Um módulo que adote esta convenção declara **M2** como interface base e pode listar uma ou mais extensões implementadas. Sua documentação também deve identificar os conectores reais, as funções opcionais e os modos mutuamente exclusivos.

Exemplos de declaração, não uma lista de configurações de módulos já lançados:

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Princípios de projeto { #design-principles }

- **M2** tem como objetivo manter a estabilidade e a compatibilidade com versões anteriores à medida que o sistema evolui. A compatibilidade deve ser verificada com base nas revisões aplicáveis da especificação e na implementação real.
- Cada extensão **M2xY** tem seu próprio escopo funcional. Nomes distintos não significam que todas as funções possam operar simultaneamente nem que suas atribuições de pinos sejam independentes.
- As extensões complementam a interface base, sem modificá-la ou substituí-la.
- Os módulos declaram os recursos disponíveis listando as especificações M2xY que implementam.

Antes de escolher um conector ou declarar a compatibilidade, siga o processo de verificação em [Padrões de interface de módulos](interface-standards-overview.md).
