---
icon: lucide/bluetooth
title: "Executar testes de sinalização Bluetooth"
description: "Conecte dispositivos SF32 sob teste a um testador Bluetooth e realize medições de sinalização BLE ou Bluetooth clássico."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Bluetooth]
---

# Executar testes de sinalização Bluetooth { #run-bluetooth-signaling-tests }

O modo de sinalização estabelece um enlace Bluetooth real entre o DUT e um testador de comunicações para testes TX/RX em conformidade com o protocolo. O guia da SiFli abrange tanto a operação manual quanto testes automatizados controlados por software, por exemplo, o R&S® CMWrun controlando um testador CMW. Esse modo difere dos testes proprietários sem sinalização e dos testes de RF de parâmetros individuais.

!!! note "Escopo dos testes de qualificação"
    Para qualificação, siga o fluxo correspondente ao tipo de teste. O guia de testes de RF da SiFli indica a sinalização BT para testes QDID/de conformidade com o protocolo e informa que testes RF BQB de BR/EDR usam sinalização BT, enquanto testes RF BQB de BLE usam SIG DTM (BLE sem sinalização). Portanto, não trate as etapas de sinalização BLE desta página como um fluxo de teste RF BQB para BLE.

## Preparação do teste { #test-setup }

Prepare o DUT, um testador de comunicações Bluetooth (o guia de referência usa o CMW500), um PC com Windows, um cabo USB-UART e um cabo coaxial de RF. Deixe acessíveis no DUT `VBAT`, `GND` e TX/RX da UART1. Os pinos padrão da UART1 variam conforme o encapsulamento:

<div align="center" markdown>

<em>Tabela: Pinos padrão da UART1 indicados no guia de sinalização Bluetooth da SiFli</em>

| Dispositivo/encapsulamento | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "Divergência na direção da UART1 do SF32LB58x"
    O guia de sinalização Bluetooth da SiFli e a tabela da porta de depuração do [guia de projeto de hardware do SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) associam TX/RX da UART1 do chip a PA32/PA31. Porém, a tabela de pinos do [SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) identifica PA31 como UART1_TXD e PA32 como UART1_RXD, e o [guia de testes de RF da SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) também indica TX=PA31/RX=PA32. As referências oficiais são conflitantes. Antes de fazer a ligação, confira o esquema da placa de destino e a configuração de pinos do projeto; não use apenas esta tabela consolidada.

Se a configuração do projeto for diferente, use o mapeamento real dos pinos. A sinalização BLE exige uma conexão serial de controle EUT com o testador; na sinalização de Bluetooth clássico, o testador pode controlar o DUT por RF depois que ele entra no modo de teste.

A principal diferença está na topologia de controle: no BLE, o caminho de controle UART/HCI é conectado ao testador; no Bluetooth clássico, o testador localiza e conecta-se ao DUT por RF. Abaixo estão os diagramas de exemplo do guia do SF32LB52x; para outras famílias, consulte a tabela de pinos do projeto de destino.

!!! note "Escopo por família"
    A tabela de pinos UART reúne as configurações padrão de várias famílias e encapsulamentos. Os diagramas de topologia e as capturas do testador a seguir são exemplos do guia do SF32LB52x: ajudam a entender o caminho do sinal, mas não devem ser usados como referência de pinos ou menus válida para todos os encapsulamentos.

![Topologia do teste de sinalização BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — na sinalização BLE, o PC coloca o DUT em modo de teste e, em seguida, o caminho de controle UART/HCI é conectado ao testador.</em></div>

![Topologia do teste de sinalização de Bluetooth clássico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — na sinalização de Bluetooth clássico, o testador localiza e conecta-se ao DUT por RF.</em></div>

## Colocar o DUT em modo de teste { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Inicialize o DUT e mantenha o firmware de DFU/aplicação ativo, sem entrar em suspensão.
2. Conecte a UART1 ao PC e envie o comando FinSH `bt_cm uart_dut` usando o SiFli_Trace ou outra ferramenta serial.
3. Configure o terminal para exibir valores hexadecimais e confirme `04 0E 04 XX 03 0C 00`.
4. Desconecte o PC e conecte a mesma UART1 à porta USB-to-RS232 de controle EUT do testador.

![Resposta serial do modo de teste BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — confirme `04 0E 04 XX 03 0C 00` antes de transferir a conexão UART; a captura de exemplo mostra a resposta `04 0E 04 06 03 0C 00`.</em></div>

### Bluetooth clássico { #classic-bluetooth }

1. Inicialize o DUT e mantenha a tela ligada e a CPU ativa.
2. Conecte a UART1 ao PC e envie `bt_cm dut`.
3. Confirme a resposta `Write scan enable success` e conecte o cabo coaxial de RF ao testador. Reinicie o DUT antes de entrar em outro modo de teste.

## Estabelecer a conexão de sinalização { #establish-the-signaling-connection }

No aplicativo `Bluetooth Signaling` do testador, habilite a sinalização. Para BLE, em `EUT Control`, defina `HW Interface`=`USB to RS232 adapter`, `EUT Comm Protocol`=`HCI` e `Baud Rate`=`1000000`; em General Setup, escolha `Burst Type: Low Energy`. O exemplo de medição mostrado usa `PHY=LE1M`. Antes de conectar o cabo serial, `Virtual COM Port` aparece como `None` e fica desabilitado. Conecte a UART1 do DUT ao testador e o cabo coaxial de RF à entrada RF; depois, desligue e ligue novamente Bluetooth Signaling para que o testador detecte a porta serial. Execute `Connection Check`; `LE comm test passed` deve aparecer após cerca de 3 segundos. Para Bluetooth clássico, defina `HW Interface` como `None (EUT Control off)`, procure o endereço do DUT com `Inquire` e selecione `Connect Test Mode`.

![Configurações EUT Control do testador para BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — configurações de EUT Control, baud rate e Low Energy para BLE.</em></div>

![Configurações do testador para Bluetooth clássico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — sinalização de Bluetooth clássico com EUT Control definido como `None (EUT Control off)`.</em></div>

!!! note "Valores de exemplo mostrados nas capturas do testador"
    A captura BLE também mostra `Stop Bits=1`, `Parity=None`, `Protocol=None` na porta serial, `Autoreset EUT` ativado e `Use BR/EDR Settings` desativado. Os campos de medição do exemplo são `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` e `Dirty Tx` desativados, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)` e `Pattern Type=PRBS9`. A captura Classic BT mostra `Operating Mode=RF Test`, `Burst Type=Basic Rate`, `Test Mode=Loopback Test` na interface, valores RX/TX de `Channel` 10/39 e de `Frequency` 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)` e `Pattern Type=10101010`; Hopping, Auto Ranging, Dirty Tx e Whitening estão desativados. Esses são parâmetros de exemplo das capturas, não configurações universais. O campo `Loopback Test` na captura não altera a etapa de conexão acima, que seleciona `Connect Test Mode` depois de `Inquire`.

## Executar medições TX { #run-tx-measurements }

Abra `Bluetooth 1 Multi Eval.`; a tela de medição vem desativada, então pressione `ON/OFF` para habilitá-la. Para alterar os parâmetros, selecione `Input Signal` à direita e escolha `Burst Type` na parte inferior da tela. Para BLE, escolha 1M/2M; para Classic BT, BR/EDR. Configure o canal, o tipo de pacote e o tamanho da carga útil na tela Bluetooth Signaling ou em `Input Signal`. A mesma tela TX do testador é usada após estabelecer a conexão de sinalização BLE ou BT.

## Medir a sensibilidade RX { #run-rx-sensitivity-measurements }

Desabilite TX, volte à tela de conexão por meio de `Bluetooth Signaling` à direita e abra `Bluetooth 1 RX Meas.`. Selecione BER para Bluetooth clássico ou PER para BLE, configure o canal, o tipo de pacote e o tamanho da carga útil e habilite Rx Quality. Reduza `Tx Level (CMW)` em passos de 0,01 ou 0,1. Quando o indicador BER/PER ficar vermelho, o nível anterior corresponde à sensibilidade de recepção daquele canal. Registre se o ensaio foi conduzido ou radiado e inclua a perda do cabo.

## Registrar e reproduzir os resultados { #record-and-reproduce }

Anexe os seguintes dados ao resultado: chip/encapsulamento, mapeamento dos pinos UART, revisão do SDK, identificação do firmware, modelo e configuração do testador, conexão RF, canal, PHY, parâmetros do pacote, nível TX, BER/PER e revisão da placa. Consulte as páginas oficiais por família: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
