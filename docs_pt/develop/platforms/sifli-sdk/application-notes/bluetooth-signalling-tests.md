---
icon: lucide/bluetooth
title: "Executar testes de sinalização Bluetooth"
description: "Conecte dispositivos SF32 sob teste a um testador Bluetooth e realize medições de sinalização BLE ou Bluetooth clássico."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Bluetooth]
---

# Executar testes de sinalização Bluetooth { #run-bluetooth-signaling-tests }

O modo de sinalização estabelece um enlace Bluetooth real entre o dispositivo sob teste (DUT) e um testador de comunicações. No SDK, esse é o procedimento para validar TX/RX em conformidade com o protocolo e apoiar as atividades BQB/QDID. Ele é diferente dos testes proprietários sem sinalização e dos testes de RF de parâmetros individuais.

## Preparação do teste { #test-setup }

Prepare o DUT, um testador de comunicações Bluetooth (o guia de referência usa o CMW500), um PC com Windows, um cabo USB-UART e um cabo coaxial de RF. Deixe acessíveis no DUT `VBAT`, `GND` e TX/RX da UART1. Os pinos padrão da UART1 variam conforme o encapsulamento:

<div align="center" markdown>

<em>Tabela: Pinos padrão da UART1 por dispositivo/encapsulamento</em>

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
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — confirme `04 0E 04 XX 03 0C 00` antes de transferir a conexão UART.</em></div>

### Bluetooth clássico { #classic-bluetooth }

1. Inicialize o DUT e mantenha a tela ligada e a CPU ativa.
2. Conecte a UART1 ao PC e envie `bt_cm dut`.
3. Confirme a resposta `Write scan enable success` e conecte o cabo coaxial de RF ao testador. Reinicie o DUT antes de entrar em outro modo de teste.

## Estabelecer a conexão de sinalização { #establish-the-signaling-connection }

No aplicativo `Bluetooth Signaling` do testador, habilite a sinalização. Para BLE, em `EUT Control`, selecione `USB-to-RS232 adapter`, a velocidade de 1 000 000 baud e `Low Energy burst type`. Conecte a UART1 do DUT ao testador e o cabo coaxial de RF à entrada RF do testador; execute `Connection Check` e aguarde `LE comm test passed`. Para Bluetooth clássico, defina `HW Interface` como `None (EUT Control off)`, procure o endereço do DUT com `Inquire` e selecione `Connect Test Mode`.

![Configurações EUT Control do testador para BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — configurações de EUT Control, baud rate e Low Energy para BLE.</em></div>

![Configurações do testador para Bluetooth clássico](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — sinalização de Bluetooth clássico com EUT Control definido como `None (EUT Control off)`.</em></div>

## Executar medições TX { #run-tx-measurements }

Abra `Bluetooth 1 Multi Eval.` e habilite a medição. Selecione o tipo de rajada BLE 1M/2M ou Bluetooth clássico BR/EDR, o canal, o tipo de pacote e o tamanho da carga útil desejados. A mesma tela TX do testador é usada após estabelecer a conexão de sinalização BLE ou Bluetooth clássico.

## Medir a sensibilidade RX { #run-rx-sensitivity-measurements }

Desabilite TX antes de voltar à tela de sinalização e abra `Bluetooth 1 RX Meas.`. Selecione BER para Bluetooth clássico ou PER para BLE, configure o canal e o tipo de pacote e habilite Rx Quality. Reduza `Tx Level (CMW)` do testador em pequenos passos; o último nível em que o indicador BER/PER permanece válido é a sensibilidade medida. Registre se o ensaio foi conduzido ou radiado e inclua a perda do cabo.

## Registrar e reproduzir os resultados { #record-and-reproduce }

Anexe os seguintes dados ao resultado: chip/encapsulamento, mapeamento dos pinos UART, revisão do SDK, identificação do firmware, modelo e configuração do testador, conexão RF, canal, PHY, parâmetros do pacote, nível TX, BER/PER e revisão da placa. Consulte as páginas oficiais por família: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
