---
icon: lucide/battery-charging
description: "Meça e ajuste o consumo de energia do SF32 considerando a configuração dos clocks, os modos de suspensão, o display, os intervalos de conexão Bluetooth e a atividade dos sensores para transformar um protótipo em um produto pronto para operar com bateria."
tags:
    - Desenvolvimento
    - Energia
---

# Gerenciamento de energia { #power-management }

O gerenciamento de energia transforma um protótipo funcional em um produto adequado para uso em dispositivos vestíveis. No SF32, a otimização do consumo envolve a configuração dos clocks, os modos de suspensão, o comportamento do display, os intervalos de conexão Bluetooth, as interrupções dos sensores e a arquitetura da aplicação.

Não otimize o consumo com base em trechos de código isolados. Meça cenários do produto: inicialização, repouso, repouso com conexão ativa, display ligado, áudio ativo, despertar por sensor, OTA e desligamento.

## Fluxo prático { #practical-workflow }

1. Meça um exemplo do SDK sem modificações.
2. Ative um subsistema por vez.
3. Nas medições iniciais, mantenha separadas a atividade do display, do Bluetooth, do áudio, do armazenamento e dos sensores.
4. Use interrupções para despertar o sistema em vez de recorrer à consulta periódica (polling).
5. Registre a corrente consumida em cada modo e cenário do produto.

## Pontos de partida úteis { #useful-starting-points }

- Exemplos de gerenciamento de energia do SDK.
- Perfilamento do uso da CPU.
- Inspeção pelo shell do RT-Thread.
- Medição de corrente na placa.

## Informações a registrar nas medições { #measurement-notes }

Registre cada medição com estas informações:

- Placa e revisão.
- Fonte de alimentação e ponto de medição.
- Branch do firmware e identificação da compilação.
- Estado do display.
- Estado do Bluetooth.
- Estado dos sensores.
- Nível de log.
- Corrente média, corrente de pico e intervalo de medição.

## Problemas comuns de consumo de energia { #common-power-problems }

<div align="center"><em>Tabela: Problemas comuns de consumo de energia</em></div>

<div align="center" markdown>

| Sintoma | Causa provável |
|:--------|:-------------|
| Corrente em repouso alta demais | Loop de consulta periódica (polling), geração de logs, alimentação do display ou clock do periférico mantido ativo. |
| Falha ao entrar em suspensão | Timer ativo, dispositivo ainda aberto, tarefa pendente ou fonte de despertar não tratada. |
| Picos de corrente no Bluetooth | Intervalo de conexão, janela de varredura, caminho de áudio ou retransmissões. |
| O display domina o consumo de energia | Consumo da retroiluminação LCD, conteúdo exibido em AMOLED, política de atualização do display ou estratégia de atualização parcial. |
| Grande variação entre medições | Alterações no arranjo de teste, no estado da bateria, no caminho de alimentação USB ou no volume de logs. |

</div>
