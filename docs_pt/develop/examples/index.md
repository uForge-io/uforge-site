---
icon: lucide/list-tree
description: "Como escolher e adaptar exemplos do SiFli-SDK ou do Zephyr de acordo com a placa, o framework e o periférico mais complexo, em vez de criar o firmware SF32 do zero."
tags:
    - Desenvolvimento
    - Exemplos
---

# Exemplos { #examples }

Comece pelos exemplos. Em geral, o firmware SF32 fica pronto mais rápido quando você adapta um exemplo funcional para a placa usada, em vez de criar cada subsistema do zero.

O melhor exemplo nem sempre é o menor. Escolha um que já inclua a parte mais complexa do produto: perfil Bluetooth, painel de display, rota de áudio, sistema de arquivos, OTA, USB, modo de baixo consumo ou acelerador de IA.

## Áreas com exemplos { #example-areas }

<div align="center"><em>Tabela: áreas com exemplos</em></div>

<div align="center" markdown>

| Área | Comece por |
|:-----|:-----------|
| Primeira execução | `example/get-started/hello_world/rtt/project` |
| LED / GPIO | `example/get-started/blink/rtt` ou exemplos de GPIO para HAL e RT-Device. |
| Bluetooth | Exemplos de BLE, Bluetooth clássico, LE Audio, taxa de transferência de dados, beacon, OTA e perfis. Comece pelo mapa de tarefas dos [exemplos do SDK Bluetooth](../../learn/bluetooth/bluetooth-sdk-examples.md). |
| Gráficos | Demos LVGL, integração com ferramentas de design, widgets, recursos comprimidos, animação/mídia e exemplos específicos para cada display. Comece pelo mapa de tarefas dos [exemplos de LVGL do SDK](../../learn/graphics/lvgl-sdk-examples.md). |
| Áudio | Reprodução, gravação, captura PDM, codec, Opus, MP3, mixagem e áudio USB quando houver suporte. Comece pelo mapa de tarefas dos [exemplos de áudio do SDK](../../learn/audio/audio-sdk-examples.md). |
| Energia | Estados de gerenciamento de energia (PM), GPIO, processador, Bluetooth, display, interface do usuário e cenários de dispositivos vestíveis. Comece pelo mapa de tarefas dos [exemplos de baixo consumo do SDK](../../learn/low-power/low-power-sdk-examples.md). |
| Armazenamento | Exemplos de sistema de arquivos, Flash, SD e partições. |
| USB | Exemplos CherryUSB de dispositivo e host. |
| IA | Exemplos de HAL NNACC e RT-Device. |

</div>

## Pontos de partida representativos do SDK { #representative-sdk-starting-points }

Use esta tabela depois de escolher a área pertinente. Os caminhos são representativos e podem mudar entre versões do SDK; antes de compilar, confirme o SDK, a placa de destino e a configuração selecionados.

<div align="center"><em>Tabela: pontos de partida representativos para exemplos SF32 do SDK</em></div>

<div align="center" markdown>

| Objetivo de desenvolvimento | Exemplo representativo do SDK | O que validar primeiro | Continue com |
|:---|:---|:---|:---|
| Entrada ou saída GPIO | `example/hal/gpio`, `example/rt_device/gpio` | Multiplexação do pino, polaridade e comportamento das interrupções na placa real. | [Primeiros passos com periféricos](../../getting-started/tutorials/beginner.md) |
| Console e inspeção do sistema | `example/system/finsh` | Console serial, logs e inspeção básica durante a execução. | [Primeiros passos com periféricos](../../getting-started/tutorials/beginner.md) |
| ADC, PWM ou RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | Configuração de pinos, clock e periféricos específica da placa. | [Primeiros passos com periféricos](../../getting-started/tutorials/beginner.md) |
| Sensor I2C | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | Conexões elétricas, endereçamento do barramento e confiabilidade de transferências repetidas. | [Integração de subsistemas](../../getting-started/tutorials/intermediate.md) |
| LVGL e display local | `example/multimedia/lvgl/lvgl_v8_examples` | Inicialização do painel, formato de pixel e um caminho de flush estável antes de criar telas complexas. | [Visão geral de gráficos](../../learn/graphics/overview.md), [Controlador de display](../../learn/graphics/display-controller.md) |
| Serviço periférico BLE | `example/ble/peripheral`, `example/ble/hrpc` | Anúncio BLE, conexão, uma característica GATT e comportamento de reconexão. | [Visão geral do Bluetooth](../../learn/bluetooth/overview.md) |
| Reprodução local de áudio | `example/multimedia/audio/local_music`, `mp3_sd_player` | Caminho de áudio do codec e da placa, estabilidade do buffer e liberação de recursos após a reprodução. | [Visão geral de áudio](../../learn/audio/overview.md) |
| Armazenamento em Flash | `example/storage/littlefs/nor`, `example/storage/flashdb` | Montagem, leitura e gravação, e recuperação após reset ou quando o armazenamento fica cheio. | [Integração de subsistemas](../../getting-started/tutorials/intermediate.md) |
| Comportamento de baixo consumo | `example/pm/classical`, `example/pm/raise_wrist` | Corrente medida em estados identificados e funcionamento correto das fontes de despertar. | [Visão geral do projeto de baixo consumo de energia](../../learn/low-power/overview.md) |
| OTA por BLE | `example/ble/peripheral_with_ota` | Recuperação após interrupção da atualização e reversão para a versão anterior no hardware de destino. | [Validação de produto](../../getting-started/tutorials/advanced.md) |
| Diagnóstico em tempo de execução | `example/system/cpu_usage_profiler`, `example/system/coredump` | Um rastreamento reproduzível de CPU ou um relatório de falha antes de iniciar a otimização. | [Validação de produto](../../getting-started/tutorials/advanced.md) |

</div>

## Como escolher um exemplo { #how-to-choose-an-example }

Siga esta ordem:

1. Escolha a placa correspondente.
2. Escolha o framework correspondente.
3. Escolha o exemplo que cobre o periférico mais complexo.
4. Escolha o middleware necessário.
5. Escolha o exemplo que atenda às restrições de energia ou de memória.

Por exemplo, um produto de áudio Bluetooth deve começar por um exemplo de áudio/Bluetooth próximo do caso de uso, e não por um `hello_world` simples, mesmo que este seja mais fácil de entender.

## Fluxo de adaptação { #adaptation-workflow }

1. Compile e grave o exemplo sem modificações.
2. Salve o comando de compilação que funcionou, o nome da placa, o comando de gravação, a porta serial e o log.
3. Faça uma alteração do produto por vez.
4. Compile novamente e teste.
5. Faça commit ou registre a alteração antes de adicionar outro subsistema.

Esse fluxo é mais lento na primeira hora e muito mais rápido depois da primeira falha difícil.

## Evidências a manter { #evidence-to-keep }

Para cada exemplo que se tornar a base de um produto, registre:

- Branch ou versão do pacote do SDK.
- Nome da placa ou FQBN.
- Opções de configuração necessárias.
- Pinos e periféricos necessários.
- Saída serial esperada.
- Limitações conhecidas.
- Consumo de memória, se disponível.
- Comando de recuperação.

## Critério para escolher exemplos { #example-selection-rule }

Escolha o exemplo que corresponda à parte mais restrita do produto:

- Para produtos Bluetooth, comece pelo perfil mais próximo.
- Para produtos com display, comece pelo fluxo de display e LVGL.
- Para produtos alimentados por bateria, comece por um exemplo de baixo consumo.
- Para produtos com OTA, comece pelo fluxo de atualização e pelo layout das partições.

Depois, adicione os outros subsistemas um de cada vez.

## Roteiro de aprendizado sugerido { #suggested-learning-path }

Se você está começando a usar o SDK, comece pelos [Primeiros passos com periféricos](../../getting-started/tutorials/beginner.md). Quando um periférico funcionar de forma estável, passe para a [Integração de subsistemas](../../getting-started/tutorials/intermediate.md). Use a [Validação de produto](../../getting-started/tutorials/advanced.md) para medir o consumo, trabalhar com OTA, inicializar um display personalizado, analisar falhas, lidar com várias conexões Bluetooth e desenvolver drivers próprios. As visões gerais dos tópicos explicam a arquitetura e os trade-offs envolvidos nesses exemplos.
