---
icon: lucide/cable
description: "Convenções de interface dos módulos M2 da μForge: use as regras de nomenclatura para terminologia estável e valide a definição de pinos antes de fechar a placa portadora."
tags:
    - Hardware
    - Módulos
    - Interface
---

# Padrões de interface de módulos { #module-interface-standards }

Esta seção apresenta as convenções usadas para descrever as interfaces dos módulos da μForge. Consulte-a antes de escolher o conector da placa portadora, definir o mapa de pinos ou declarar compatibilidade. Ela reúne dois tipos distintos de documento: regras de nomenclatura que estabelecem uma terminologia comum e uma proposta de interface em nível de pino, útil para o planejamento, mas que precisa ser validada para o módulo e o produto selecionados.

## Use os documentos na ordem correta { #use-the-documents-in-the-right-order }

<div align="center"><em>Tabela: Documentos de interface de módulos</em></div>

<div align="center" markdown>

| Documento | Status e finalidade | Quando usar |
|:---------|:-------------------|:------------|
| [Regras de nomenclatura da interface M2](M2%20Interface%20Naming%20Rules.md) | Convenção para nomear famílias e perfis de interface M2. | Para nomear um módulo, conector, placa portadora ou perfil de interface na documentação e nos arquivos de projeto. |
| [Definição da interface M2](M2-interface-definition.md) | Rascunho da definição em nível de pino e proposta de atribuição de sinais. | Para avaliar uma proposta de interface M2 para a placa portadora ou revisar o compartilhamento de sinais antes de escolher o conector. |

</div>

## Nomenclatura e compatibilidade elétrica { #what-is-stable-and-what-must-be-verified }

Aplique as regras de nomenclatura de modo consistente nas descrições dos módulos, nos esquemáticos, nas notas da BOM e na documentação do produto. Os nomes descrevem o perfil de interface pretendido, não uma especificação elétrica ou mecânica definitiva. Nem o nome do perfil nem o formato coincidente do conector comprovam que um módulo e uma placa portadora sejam intercambiáveis.

A definição em nível de pino não garante que todos os módulos da μForge ou encapsulamentos SF32 sejam compatíveis com todos os sinais e interfaces atribuídos, nem com todas as combinações de uso simultâneo. Antes de fechar o projeto, verifique os pontos a seguir com base no módulo, chip, encapsulamento e guia de projeto de hardware exatos que foram selecionados:

- desenho mecânico do conector, encaixe polarizado, numeração dos pinos e restrições de montagem;
- linhas de alimentação, domínios de tensão, capacidade de corrente e sequência de acionamento;
- disponibilidade das interfaces, multiplexação dos pinos e funções mutuamente exclusivas;
- integridade de sinal, impedância, casamento de comprimentos de trilha, ESD e requisitos das áreas de exclusão de RF;
- acesso à depuração, inicialização, recuperação e testes de produção; e
- requisitos da placa portadora para display, câmera, áudio, armazenamento e módulos complementares de conectividade sem fio.

## Fluxo de decisão para a placa portadora { #carrier-board-decision-path }

1. Escolha o módulo e leia a página de apresentação e o respectivo guia de projeto de hardware.
2. Use as [Regras de nomenclatura da interface M2](M2%20Interface%20Naming%20Rules.md) para definir sem ambiguidade o perfil pretendido.
3. Use a [Definição da interface M2](M2-interface-definition.md) para identificar sinais candidatos e conflitos de compartilhamento.
4. Confirme cada contato utilizado na documentação específica do módulo e nas fontes originais aplicáveis da SiFli.
5. Antes de iniciar o layout, registre na revisão do esquemático as versões dos documentos, as revisões do módulo e da placa portadora, as exceções confirmadas e os pontos pendentes.

Para uma revisão completa da placa portadora, continue em [Projeto para produção](../design-for-production.md). Para requisitos de implementação específicos do módulo, consulte o guia correspondente no grupo **Guias de projeto de hardware**.
