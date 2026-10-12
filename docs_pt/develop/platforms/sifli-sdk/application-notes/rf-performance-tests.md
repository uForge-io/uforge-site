---
icon: lucide/radio-tower
title: "Executar testes de RF com o SiFli SDK"
description: "Escolha o modo de teste RF, o caminho de controle e os instrumentos de medição adequados para Bluetooth."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, RF]
---

# Executar testes de RF com o SiFli SDK { #run-sifli-sdk-rf-tests }

O SDK divide a validação de RF Bluetooth em testes com sinalização, sem sinalização e testes individuais de RF. Antes de carregar um firmware de teste, escolha o procedimento de acordo com o objetivo da medição.

<div align="center" markdown>
<em>Tabela: Escopo do conteúdo de teste RF por família</em>

| Conteúdo | Escopo por família |
|---|---|
| Comparação dos modos de teste e sequência de medição | Fluxo consolidado para SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x e SF32LB58x. |
| Disponibilidade de testes Bluetooth Classic | Requer um chip compatível com Bluetooth Classic. O SF32LB55x oferece apenas BLE e não suporta procedimentos de teste Bluetooth Classic; nessa família, use os testes BLE. |
| Suporte de ferramentas ao SF32LB57x | O [guia de teste de RF](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) lista os pinos UART do SF32LB57x, mas o seletor de plataforma do [manual do SiFli_RfTool](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) não inclui o 57x. Use essa informação apenas como referência de pinagem e confirme qual caminho de teste é compatível com a versão do SDK de destino. |
| Diagramas de topologia e matriz de comandos HCI | Exemplos do guia do SF32LB52x; para implementar, consulte os comandos e a documentação de pinos da família de destino. |
| Configuração de `CONFIG_BT_RF_TEST` | Aplicável ao procedimento documentado para famílias diferentes de 55x; o `bt_rftest` do SF32LB55x não usa esse símbolo. |
| Pinos UART, valores de pacotes e sintaxe dos comandos | Dependem da família e da versão do SDK; confira a configuração do projeto e a saída de `bt_rftest help`. |

</div>

!!! warning "Mapeamentos UART1 do SF32LB58x divergem entre os guias oficiais"
    O [guia geral de testes de RF](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indica PA31/PA32 para TX/RX da UART1, enquanto o [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indica PA32/PA31. Antes de conectar os fios, confirme o fluxo de teste do firmware e o pinmux da placa; os mapeamentos dos dois guias são conflitantes.

## Selecionar o modo de teste { #select-the-test-mode }

<div align="center" markdown>
<em>Tabela: Seleção do modo de teste Bluetooth/RF</em>

| Modo | Aplicação | Entrada do SDK | Caminho de controle |
|---|---|---|---|
| Sinalização BT | Qualificação BQB/QDID e avaliação de desempenho em conformidade com o protocolo | `bt_cm dut`, `gap_enb_dut_mode_req()` | Interface de rádio do testador e controle de teste LMP |
| BT sem sinalização | Ajuste de RF durante o desenvolvimento e triagem na produção | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | HCI local específico do fabricante |
| BLE sem sinalização (SIG DTM) | Triagem de RF BLE e itens SIG DTM | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | HCI local ou HCI padrão encaminhado por `bt_cm uart_dut` |
| Teste individual de RF | Ajuste de RF na placa e pré-avaliação FCC/CE | `bt_cm uart_dut` + `SiFli_RfTool` | A ferramenta no PC envia uma operação de baixo nível por vez |

</div>

A sinalização estabelece uma conexão Bluetooth real e é o procedimento de qualificação. No modo sem sinalização, o circuito de RF permanece em um canal e nível de potência fixos, transmitindo ou recebendo; esse é o caminho normalmente usado no desenvolvimento e na triagem de produção. Os testes individuais de RF usam a ferramenta no PC para controlar com precisão a portadora ou a modulação, com medição em analisador de espectro ou medidor de potência. Os testes BT sem sinalização e os testes individuais de RF são procedimentos específicos da SiFli, não testes BQB.

Os diagramas de topologia a seguir vêm do guia de testes RF do SF32LB52x. Eles destacam as diferenças entre o PC, o DUT, o testador e os caminhos UART/HCI/RF. Para a pinagem UART padrão real, consulte a tabela da família de destino.

![Topologia do teste de sinalização BT](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — sinalização BT: o PC configura o testador enquanto o DUT e o testador estabelecem o enlace RF.</em></div>

![Topologia do teste BT sem sinalização](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — BT sem sinalização: o PC controla diretamente o estado de RF do DUT por comandos seriais/HCI.</em></div>

![Topologia do teste de sinalização BLE](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — BLE DTM: os caminhos de controle UART/HCI e de medição RF se conectam ao testador.</em></div>

## Escolher o firmware e configurar o projeto { #choose-firmware-and-configure-the-project }

`rf_test.bin` é uma compilação interna da SiFli para testes RF e não é distribuída como um artefato normal do SDK. `User.bin` é qualquer firmware de aplicação compilado com o SDK; as funções de RF estão integradas à pilha de protocolos e são acessadas por comandos FinSH, como `bt_cm dut`, `bt_cm uart_dut` e `bt_rftest`.

Em uma compilação do usuário, habilite as opções pertinentes:

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

O caminho `bt_rftest` do SF32LB55x não usa `CONFIG_BT_RF_TEST`. `CONFIG_BT_FINSH` serve para rastreamento e não é necessário para os comandos de teste. Quando o caminho de controle usar a UART IPC própria do SDK, defina `CONFIG_IPC_USE_OWN_DEVICE=y` e `CONFIG_IPC_OWN_DEVICE_NAME="uart2"` conforme a placa. Os exemplos do SDK `example/bt/spp/` e `example/bt/HCI_over_uart/` oferecem pontos de partida.

## Teste de sinalização BT { #bt-signaling-test }

1. Disponibilize `VBAT`, `GND` e TX/RX da UART1 no DUT. Os pinos padrão da UART1 variam conforme o encapsulamento; use a configuração de pinos do projeto.
2. Para sinalização BLE, conecte a UART1 a um PC e envie `bt_cm uart_dut`. Confirme `04 0E 04 XX 03 0C 00` e, em seguida, transfira a UART para o testador.
3. Para sinalização BT, mantenha o DUT ativo, envie `bt_cm dut`, confirme a resposta `Write scan enable success` e conecte o cabo coaxial de RF ao testador.
4. Em Bluetooth Signaling, o BLE usa controle EUT por USB-to-RS232 a 1 000 000 baud; o BT usa `None (EUT Control off)` e localiza o DUT pelo enlace de rádio.
5. Execute TX em `Bluetooth 1 Multi Eval.` e RX em `Bluetooth 1 RX Meas.`. Use BER para Bluetooth clássico e PER para BLE; reduza o nível TX do testador para determinar a sensibilidade.

## Comandos BT/BLE sem sinalização { #btble-non-signaling-commands }

Depois de habilitar o caminho de teste RF, use o shell FinSH:

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

A ordem exata dos argumentos e os valores de pacote aceitos dependem da versão do SDK; use a sintaxe exibida por `bt_rftest help` no SDK de destino. As estatísticas de pacotes RX são significativas; a contagem de pacotes TX não mede quantos pacotes foram recebidos. Para BLE DTM, use `bt_rftest bletx`/`blerx` ou os comandos HCI padrão `LE_Transmitter_Test`, `LE_Receiver_Test v2` e `LE_Test_End`. Os canais BLE vão de 0 a 39 e os valores de PHY são 1M/2M/Coded; os canais de Bluetooth clássico vão de 0 a 78. Em chips de modo dual compatíveis com ambos, BT e BLE compartilham o hardware de RF e devem ser testados separadamente.

## Testes individuais de RF com SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Conecte a UART1 do DUT ao PC a 1 000 000 baud. Conecte a porta RF, por cabo coaxial, a um testador, analisador de espectro ou medidor de potência.

Envie `bt_cm uart_dut` e confirme a resposta `04 0E 04 XX 03 0C 00`. Em seguida, selecione a família, o modo `BLE non-signaling` (BLE sem sinalização) ou `BT non-signaling` (BT sem sinalização) e a porta COM em `SiFli_RfTool.exe`.

Pare TX/RX antes de alterar o canal, a PHY, o tipo de pacote ou a potência. Para RX BLE, o testador pode enviar 1 500 pacotes; calcule `PER = (1500 - received) / 1500 × 100%` e registre o RSSI.

Para RX de Bluetooth clássico, use uma forma de onda CMW500 GPRF e registre o RSSI, as contagens de erros de pacote/bit e BER/PER. Compense a perda do cabo e indique se cada resultado é conduzido ou radiado.

## Registrar o resultado { #record-the-result }

O guia de origem também inclui uma matriz completa de comandos HCI e respectivos valores de retorno. Consulte-a quando um comando for enviado, mas o DUT não entrar no estado esperado; não trate todos os vetores dessa tabela como uma API portável. Use os comandos correspondentes à família do chip e à versão do SDK de destino.

<div align="center"><em>Tabela: canais RX e frequências centrais de exemplo da matriz SF32LB52x</em></div>

<div align="center" markdown>

| Modo de teste | Canais | Frequências centrais |
|:--------------|:-------|:---------------------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

A matriz de origem indica o envio de `HCI_Reset` (`01,03,0C,00`) antes de tentar novamente um teste RX que falhou. Trate esses comandos e canais como exemplos do guia do SF32LB52x; confirme a sequência para o SDK e a família de destino.

![Matriz de comandos HCI de teste RF do SF32LB52x](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — matriz de comandos HCI, valores de retorno e itens de teste RF.</em></div>

Registre, junto a cada resultado, a família, a revisão do SDK, a identificação do firmware, os pinos UART, o caminho RF, a perda do cabo, o modelo e a configuração do instrumento, o canal, a PHY/tipo de pacote, a potência, as contagens RX, o RSSI, BER/PER e a revisão da placa. Consulte os guias oficiais detalhados para [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (a tabela UART também inclui SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
