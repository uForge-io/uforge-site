---
icon: lucide/map
description: "Um roteiro prático de tutoriais sobre SF32, organizado por objetivos de engenharia: periféricos, integração de subsistemas e validação de produto."
tags:
    - Tutoriais
---

# Visão geral dos tutoriais { #tutorials-overview }

Esta série transforma a primeira gravação de firmware bem-sucedida em habilidades práticas de desenvolvimento para SF32. A progressão acompanha o escopo da engenharia: primeiro, validar um periférico; depois, integrar subsistemas; por fim, reunir as evidências necessárias para um produto. Os tutoriais usam exemplos do SiFli-SDK como ponto de partida, mas as práticas de conferir o hardware, manter uma configuração de referência comprovadamente funcional e medir os resultados são úteis em qualquer ambiente de desenvolvimento de software para SF32.

Os tutoriais são a segunda etapa do guia [Primeiros passos](../index.md). Antes de começar, conclua os critérios de sucesso da primeira inicialização descritos nele. Se estiver escolhendo um chip, módulo ou placa de desenvolvimento, consulte primeiro a [família SF32](../../sf32-products/family/SF32_family.md).

## O que você precisa { #what-you-need }

Use uma placa de desenvolvimento SF32 com conexão USB funcional para transferência de dados e console serial. Por exemplo, `sf32lb52-lcd_n16r8` é o nome de placa usado no SiFli-SDK para a SF32LB52-DevKit-LCD_N16R8. A série não pressupõe que uma única placa seja compatível com todos os exercícios: consulte a lista de plataformas compatíveis de cada exemplo e confira pinos, periféricos, display, áudio e armazenamento nos esquemáticos e arquivos correspondentes da placa. Para consultar os identificadores de placa SF32LB52x do SDK, use a lista oficial de [placas compatíveis](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html).

<div align="center"><em>Tabela: Pré-requisitos dos tutoriais</em></div>

<div align="center" markdown>

| Item | Verificação mínima antes de começar |
|:-----|:------------------------|
| Ferramentas de desenvolvimento | O SiFli-SDK consegue compilar um exemplo conhecido para a sua placa. |
| Processo de gravação | Você consegue gravar firmware na placa repetidamente sem alterar a configuração. |
| Console serial | Você consegue consultar os logs de inicialização e acessar o prompt `msh>` do FinSH. |
| Informações da placa | Você tem o esquemático ou os arquivos de suporte da placa antes de atribuir pinos ou periféricos. |
| Ferramentas de medição | Use um multímetro ou analisador lógico quando necessário; em atividades de baixo consumo, use também uma configuração de medição de corrente. |

</div>

## Roteiro de aprendizado recomendado { #recommended-learning-path }

<div align="center"><em>Tabela: Roteiro dos tutoriais</em></div>

<div align="center" markdown>

| Trilha de objetivos | Comece quando | O que você vai praticar | Continue com |
|:------|:-----------|:------------------|:--------------|
| [Primeiros periféricos](beginner.md) | `hello_world` compila, a gravação funciona e há saída pela serial. | GPIO, FinSH, ADC, PWM, RTC e um pequeno projeto na placa. | Avance quando conseguir validar por conta própria uma entrada, uma saída e um periférico básico. |
| [Integração de subsistemas](intermediate.md) | Os periféricos funcionam de forma confiável quando usados individualmente. | Sensores I2C, LVGL, BLE, áudio, armazenamento e testes planejados de coexistência. | Avance quando dois subsistemas reais funcionarem juntos de forma estável. |
| [Validação de produto](advanced.md) | Você consegue integrar middleware e diagnosticar falhas comuns. | Consumo de energia medido, recuperação por OTA, displays personalizados, análise de falhas, BLE com múltiplas conexões e drivers reutilizáveis. | Consulte os artigos pertinentes de Desenvolvimento e Aprendizado como referências contínuas durante a implementação. |

</div>

A ordem é intencional. Não comece por um display, serviço BLE ou driver personalizado antes de validar a placa, o processo de gravação, o console serial e um teste simples de GPIO. Se um tutorial posterior falhar, volte à última etapa cujo critério de sucesso ainda consiga reproduzir.

## Como usar cada tutorial { #how-to-use-each-tutorial }

Cada exercício indica um exemplo adequado do SDK para servir de base, um objetivo, um critério de sucesso e verificações para as falhas mais prováveis. Comece pelo exemplo indicado, em vez de criar um projeto vazio; altere um comportamento de cada vez e mantenha uma versão comprovadamente funcional antes de combinar recursos. Para configurações que pretende reutilizar, registre a revisão da placa, a versão do SDK, o nome de placa e os resultados observados.

Os tutoriais não substituem a documentação de referência:

- Consulte [Desenvolvimento](../../develop/index.md) para fluxos de trabalho da plataforma, ferramentas, tópicos de firmware e o índice consolidado de exemplos do SDK.
- Consulte [Aprendizado](../../learn/graphics/overview.md) para decisões de arquitetura e de subsistemas, como o fluxo gráfico, o comportamento do Bluetooth e a estratégia de consumo de energia.
- Consulte a [família SF32](../../sf32-products/family/SF32_family.md) para selecionar dispositivos, obter informações sobre placas, consultar orientações de projeto de hardware e verificar os requisitos de produção.
