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
| Pinos UART, valores de pacotes e comportamento dos comandos | Dependem da família e da versão do SDK; confira a configuração do projeto e a implementação do SDK de destino. |

</div>

!!! warning "Mapeamentos UART1 do SF32LB58x divergem entre os guias oficiais"
    O [guia geral de testes de RF](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indica PA31/PA32 para TX/RX da UART1, enquanto o [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indica PA32/PA31. Antes de conectar os fios, confirme o fluxo de teste do firmware e o pinmux da placa; os mapeamentos dos dois guias são conflitantes.

## Selecionar o modo de teste { #select-the-test-mode }

<div align="center" markdown>
<em>Tabela: Seleção do modo de teste Bluetooth/RF</em>

| Modo | Aplicação | Entrada do SDK | Caminho de controle |
|---|---|---|---|
| Sinalização BT (BR/EDR) | Qualificação BQB/QDID e avaliação de desempenho em conformidade com o protocolo | `bt_cm dut`, `gap_enb_dut_mode_req()` | Interface de rádio do testador e controle de teste LMP |
| BT sem sinalização | Ajuste de RF durante o desenvolvimento e triagem na produção | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | HCI local específico do fabricante |
| BLE sem sinalização (SIG DTM) | Triagem de RF BLE e testes de qualificação SIG DTM | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | HCI local ou HCI padrão encaminhado por `bt_cm uart_dut` |
| Teste individual de RF | Ajuste de RF na placa e pré-avaliação FCC/CE | `bt_cm uart_dut` + `SiFli_RfTool` | A ferramenta no PC envia uma operação de baixo nível por vez |

</div>

Para BR/EDR, a sinalização estabelece uma conexão Bluetooth real e é o caminho de qualificação RF BQB. Os testes RF BQB de BLE usam SIG DTM, apresentado aqui como BLE sem sinalização. Os testes BT sem sinalização e os testes individuais de RF são procedimentos específicos da SiFli, não testes BQB. No modo sem sinalização, o rádio transmite ou recebe em um canal fixo e com potência definida; esse é o caminho normalmente usado no desenvolvimento e na triagem de produção. Os testes individuais de RF usam a ferramenta no PC para ajustar com precisão a portadora ou a modulação e medir com analisador de espectro ou medidor de potência.

Os diagramas de topologia a seguir vêm do guia de testes RF do SF32LB52x. Eles destacam as diferenças entre o PC, o DUT, o testador e os caminhos UART/HCI/RF. Consulte o guia de testes RF da família de destino para saber qual UART é usada por padrão e como seus pinos são mapeados.

![Topologia do teste de sinalização BT](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — sinalização BT: o PC configura o testador enquanto o DUT e o testador estabelecem o enlace RF.</em></div>

![Topologia do teste BT sem sinalização](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — BT sem sinalização: o PC controla diretamente o estado de RF do DUT por comandos seriais/HCI.</em></div>

![Topologia do teste BLE DTM](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
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

## Sinalização BR/EDR e configuração de BLE DTM { #bt-signaling-test }

1. Disponibilize `VBAT`, `GND` e TX/RX da UART1 no DUT. Os pinos padrão da UART1 variam conforme o encapsulamento; use a configuração de pinos do projeto.
2. Para BLE DTM, conecte a UART1 a um PC e envie `bt_cm uart_dut`. Confirme `04 0E 04 XX 03 0C 00` e, em seguida, transfira a UART para o testador.
3. Para sinalização BT, mantenha o DUT ativo, envie `bt_cm dut`, confirme a resposta `Write scan enable success` e conecte o cabo coaxial de RF ao testador.
4. Em Bluetooth Signaling, o BLE usa controle EUT por USB-to-RS232 a 1 000 000 baud; o BT usa `None (EUT Control off)` e localiza o DUT pelo enlace de rádio.
5. Execute TX em `Bluetooth 1 Multi Eval.` e RX em `Bluetooth 1 RX Meas.`. Use BER para Bluetooth clássico e PER para BLE; reduza o nível TX do testador para determinar a sensibilidade.

## Comandos BT/BLE sem sinalização { #btble-non-signaling-commands }

Depois de habilitar o caminho de teste RF, use o shell FinSH:

```text
bt_rftest enter
bt_rftest bttx
bt_rftest btrx
bt_rftest btstop
bt_rftest exit
```

No SDK documentado, `bt_rftest bttx` e `bt_rftest btrx` usam parâmetros de teste fixos e não recebem argumentos. Para alterá-los, consulte a implementação de `bt_rftest()` em `middleware/bluetooth/service/common/bf0_bt_common.c` da versão de destino e defina subcomandos parametrizados, se necessário. A implementação e os valores disponíveis podem variar conforme a versão.

As estatísticas RX são úteis, mas a contagem TX não indica quantos pacotes o DUT recebeu. Para BLE DTM, use `bt_rftest bletx`/`blerx` ou os comandos HCI padrão `LE_Transmitter_Test`, `LE_Receiver_Test v2` e `LE_Test_End`. Os canais BLE vão de 0 a 39 e os valores de PHY são 1M/2M/Coded; os canais de Bluetooth clássico vão de 0 a 78. Em chips de modo dual compatíveis com ambos, BT e BLE compartilham o hardware de RF e devem ser testados separadamente.

## Testes individuais de RF com SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Esta seção cobre apenas TX/RX sem sinalização. Para testes de portadora única (CW), siga o [procedimento separado de tom único Bluetooth](bluetooth-single-tone-tests.md).

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

As tabelas abaixo transcrevem todas as linhas do exemplo de origem do SF32LB52x em formato estruturado. Elas não são uma API portátil; use a documentação do SDK da família de destino na implementação. Os identificadores de comando, sequências de bytes, valores de teste, limites e observações operacionais foram mantidos conforme a fonte.

<div align="center" markdown>
<em>Tabela: Exemplo da fonte SF32LB52x — comandos de configuração e entrada</em>

| Descrição do teste | Nome do teste | Comando enviado | Valor de retorno | Valor de teste | Limite inferior | Limite superior | Observações |
|---|---|---|---|---|---|---|---|
| Entrar no modo sem sinal | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Configurar a tabela de perdas | `BT_SetMultiLossTable` | `/` | `/` | `/` | `/` | `/` |  |
| Entrar no modo de teste HCI | `HEX_Cmd_Enter_HCI_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Aguardar 3 s | `Delay_Millisecond` | `/` | `/` | `/` | `/` | `/` |  |
| Teste de calibração do desvio de frequência | `BT_BR_TX_Cal_Test_L` | 1. `01,71,FC,06,00,53,01,01,05,0A`<br>2. `08,FF,EE,06`<br>3. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `09,FF,EE,00,06,01,00`<br>3. `04,0E,06,06,72,FC,00,E7,02` | `1` | `0` | `1` |  |
| Enviar o comando HCI_Reset | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Desligar a fonte programável | `Simple_For_Updata_8IuOFF2` | `/` | `/` | `1` | `0` | `1` |  |
| Desativar a comunicação serial | `Serial_Port_Switch_Reset2` | `/` | `/` | `1` | `0` | `1` |  |
| Aguardar 2 s | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Ligar a fonte programável | `Simple_For_Updata_8IuON2` | `/` | `/` | `1` | `0` | `1` |  |
| Ativar a comunicação serial | `Serial_Port_Switch_COM` | `/` | `/` | `1` | `0` | `1` |  |
| Aguardar 3 s pela inicialização da placa principal | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Verificar a inicialização da placa principal | `AT_Cmd_Check_OS_Ready` | `AT_START` | `START=OK` | `1` | `0` | `1` |  |
| Entrar no modo sem sinal | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Enviar o comando de parada | `HEX_Cmd_Enter_BT_Mode` | `01,72,FC,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Verifique se a entrada no modo foi bem-sucedida. |
| Enviar o comando HCI_Reset | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tabela: Exemplo da fonte SF32LB52x — matriz de testes RX</em>

| Descrição do teste | Nome do teste | Comando enviado | Valor de retorno | Valor de teste | Limite inferior | Limite superior | Observações |
|---|---|---|---|---|---|---|---|
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH0` Teste RX | `BT_BR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH0` Teste RX | `BT_BR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH0` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH39` Teste RX | `BT_BR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH39` Teste RX | `BT_BR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH39` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH78` Teste RX | `BT_BR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH78` Teste RX | `BT_BR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH78` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Teste RX | `BT_EDR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Teste RX | `BT_EDR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Teste RX | `BT_EDR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Teste RX | `BT_EDR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Teste RX | `BT_EDR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Teste RX | `BT_EDR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Teste RX | `BT_BLE_RX_BER_2402` | 1. `01,1F,20,00`<br>2. `01,33,20,03,00,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Teste RX | `BT_BLE_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Teste RX | `BT_BLE_RX_BER_2440` | 1. `01,1F,20,00`<br>2. `01,33,20,03,13,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Teste RX | `BT_BLE_RX_RSSI_2440` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Teste RX | `BT_BLE_RX_BER_2480` | 1. `01,1F,20,00`<br>2. `01,33,20,03,27,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Teste RX | `BT_BLE_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Teste RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Se um teste RX falhar, envie o comando reset antes de tentar novamente. |

</div>

<div align="center" markdown>
<em>Tabela: Exemplo da fonte SF32LB52x — matriz de testes TX</em>

| Descrição do teste | Nome do teste | Comando enviado | Valor de retorno | Valor de teste | Limite inferior | Limite superior | Observações |
|---|---|---|---|---|---|---|---|
| `BT_BR CH0` Teste TX | `BT_BR_TX_DF1_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH0` Teste TX | `BT_BR_TX_DF2_2402` | 1. `01,71,FC,06,00,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH39` Teste TX | `BT_BR_TX_DF1_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH39` Teste TX | `BT_BR_TX_DF2_2441` | 1. `01,71,FC,06,27,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH78` Teste TX | `BT_BR_TX_DF1_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH78` Teste TX | `BT_BR_TX_DF2_2480` | 1. `01,71,FC,06,4E,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| Alternar de BR para EDR | `HEX_Cmd_Switch_To_EDR` | `08,FF,EE,02,0A` | `09,FF,EE,00,02,01,00` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Teste TX | `BT_EDR_TX_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Teste TX | `BT_EDR_TX_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Teste TX | `BT_EDR_TX_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Teste TX | `BT_BLE_TX_DF1_2402` | 1. `01,1F,20,00`<br>2. `01,34,20,04,00,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Teste TX | `BT_BLE_TX_DF2_2402` | 1. `01,34,20,04,00,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Teste TX | `BT_BLE_TX_DF1_2440` | 1. `01,1F,20,00`<br>2. `01,34,20,04,13,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Teste TX | `BT_BLE_TX_DF2_2440` | 1. `01,34,20,04,13,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Teste TX | `BT_BLE_TX_DF1_2480` | 1. `01,1F,20,00`<br>2. `01,34,20,04,27,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Teste TX | `BT_BLE_TX_DF2_2480` | 1. `01,34,20,04,27,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tabela: Exemplo da fonte SF32LB52x — saída e redefinição</em>

| Descrição do teste | Nome do teste | Comando enviado | Valor de retorno | Valor de teste | Limite inferior | Limite superior | Observações |
|---|---|---|---|---|---|---|---|
| Sair do modo sem sinal | `AT_Cmd_Exit_BT_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Gravar a flag RFT | `AT_Cmd_Write_RFT_Flag_Test` | `AT_SET_RFT_FLAG P` | `SET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| Ler a flag RFT | `AT_Cmd_Read_RFT_Flag_Test` | `AT_GET_RFT_FLAG` | `GET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| Aguardar | `Delay_Millisecond2s` | `/` | `/` | `1` | `0` | `1` |  |
| Redefinir a caixa de comunicação | `Serial_Port_Switch_Reset` | `/` | `/` | `1` | `0` | `1` |  |
| Redefinir a fonte programável | `Power_Supply_Off` | `/` | `/` | `1` | `0` | `1` |  |
| Redefinir a ferramenta | `Release_Test_Parameters` | `/` | `/` | `1` | `0` | `1` |  |

</div>

![Matriz de comandos HCI de teste RF do SF32LB52x](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Figura: Imagem original em chinês da matriz específica do SF32LB52x; apenas referência, não é uma API portátil.</em></div>

Para cada ensaio, registre a família, a revisão do SDK, a identificação do firmware, a revisão da placa, os pinos UART, o caminho RF e a perda do cabo. Registre também o modelo e a configuração do instrumento, o canal, a PHY/tipo de pacote, a potência, as contagens RX, o RSSI e BER/PER. Consulte os guias oficiais detalhados para [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (a tabela UART também inclui SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
