---
icon: lucide/audio-lines
title: "Executar testes individuais de RF para Bluetooth"
description: "Use o SiFli_RfTool para testar uma operação de RF por vez em BLE ou Bluetooth clássico, durante o ajuste da placa e avaliações preliminares de conformidade."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Bluetooth]
---

# Executar testes individuais de RF para Bluetooth { #run-bluetooth-single-item-rf-tests }

Os testes individuais de RF são o recurso de baixo nível do SDK para ajustar a placa, realizar avaliações preliminares de conformidade FCC/CE e investigar a frequência de uma portadora ou uma configuração de modulação por vez. Esse recurso não faz parte do produto nem substitui os testes de sinalização BQB.

## Preparar o DUT e a ferramenta { #prepare-the-dut-and-tool }

Prepare o dispositivo sob teste (DUT), um PC, um cabo USB de dados (não apenas para carregamento), um cabo coaxial de RF e um testador de comunicações ou analisador de espectro. Deixe acessíveis `VBAT`, `GND` e TX/RX da UART1 para os testes BLE/BT modulados. Para testes de portadora única (CW) no SF32LB55x, disponibilize também TX/RX da UART3. O mapeamento padrão é:

<div align="center" markdown>

<em>Tabela: Mapeamento padrão das UARTs para testes modulados e de portadora única</em>

| Dispositivo/encapsulamento | UART1 TX/RX para testes modulados | UART de controle de portadora única (CW) |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

Os pinos UART1 do SF32LB55x variam conforme o número da peça. Para testes modulados BLE/BT, conecte a UART1 ao PC a 1 000 000 baud. Nos testes de portadora única do SF32LB55x, use a UART3 (PB45/PB46); as demais famílias listadas usam a UART1. Se o projeto tiver outra configuração, siga o mapeamento real de pinos. Conecte a porta RF ao instrumento por meio do cabo coaxial, considere a perda do cabo e identifique se a medição é conduzida ou radiada.

!!! note "Escopo por família"
    A tabela UART consolida os mapeamentos padrão de várias famílias e encapsulamentos. A topologia e as capturas de tela do `SiFli_RfTool` a seguir são exemplos do guia do SF32LB52x. Selecione a família real do chip na ferramenta e confirme o mapeamento UART do projeto de destino.

!!! warning "Guias oficiais divergem sobre o mapeamento UART do SF32LB58x"
    O [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indica UART1 TX/RX como PA32/PA31, enquanto o [guia geral de testes de RF](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indica PA31/PA32 para a UART de depuração RF. Antes de conectar, confirme o caminho de teste do firmware e o pinmux da placa. Não presuma que esses mapeamentos específicos de cada guia sejam intercambiáveis.

![Topologia dos testes individuais de RF para Bluetooth](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — o PC controla o DUT por UART/HCI, enquanto a porta RF se conecta ao testador ou analisador de espectro por meio do cabo coaxial.</em></div>

## Entrar no modo de teste de RF { #enter-rf-test-mode }

1. Inicialize o DUT e mantenha-o ativo.
2. Envie o comando FinSH `bt_cm uart_dut` pelo SiFli_Trace.
3. Confirme a resposta hexadecimal `04 0E 04 XX 03 0C 00`.
4. Desconecte o terminal; o SiFli_RfTool usará a mesma UART para o controle HCI.

## Transmitir um sinal BLE ou Bluetooth clássico { #transmit-a-ble-or-classic-bt-signal }

1. Abra `SiFli_RfTool.exe`, selecione a família do chip, escolha `BLE non-signaling` (BLE sem sinalização) ou `BT non-signaling` (BT sem sinalização), selecione a porta COM da UART1 e conecte a 1 000 000 baud.
2. Para BLE, configure `Frequency` (frequência), `Data Length` (comprimento dos dados), `payload` (carga útil) e `PHY` (camada física) e selecione `Start TX` (iniciar TX). Pare a transmissão antes de alterar o canal ou a PHY.
3. Para Bluetooth clássico, configure `Frequency` (frequência), `Data Length` (comprimento dos dados) e `Packet Type` (tipo de pacote) e selecione `Start TX` (iniciar TX). Pare a transmissão antes de alterar os parâmetros do pacote.
4. No testador, use o mesmo canal, tipo de pacote, payload e PHY. Se não houver um testador de comunicações disponível, use um analisador de espectro para observar a forma de onda.

O código-fonte do SDK inclui níveis TX de referência para o LB52x HDK, mas esses valores são específicos dessa placa. Use-os apenas como referência de depuração e meça a placa real do produto.

![Controles principais do SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — controles da família do chip, modo, UART, taxa de baud e TX/RX; confirme essas opções antes de aplicar um vetor de teste.</em></div>

![Configurações de TX BLE no SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — selecione o chip, o modo, o canal, o payload, a PHY, o tamanho dos dados e a potência antes de iniciar TX.</em></div>

## Receber e calcular a sensibilidade { #receive-and-calculate-sensitivity }

Pare TX antes de entrar em RX. Defina o canal e pressione Start RX; pare RX antes de alterá-lo. Para RX BLE, configure o testador em Direct Test Mode, selecione a PHY e o canal, envie 1.500 pacotes e calcule:

```text
PER = (1500 - received_packets) / 1500 × 100%
```

Registre também o RSSI. Para RX de Bluetooth clássico, use uma forma de onda do CMW500 GPRF Generator, como DH1/2-DH1/3-DH1, e registre pacotes recebidos, pacotes com erro, quantidade de bits, BER e RSSI. BLE e Bluetooth clássico compartilham o hardware de RF; não execute os dois testes em paralelo.

![Configurações de RX BLE no SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — pare TX antes de RX e registre o canal, a modulação, a PHY e o resultado da recepção.</em></div>

## Configuração de portadora única e dos instrumentos { #single-carrier-and-instrument-setup }

Pare a operação atual antes de iniciar um teste de portadora única (CW). No SF32LB55x, transfira a conexão entre o DUT e o PC da UART1 para a UART3 (PB45/PB46), selecione a porta COM correspondente no SiFli_RfTool e use 1 000 000 baud. Para as demais famílias listadas, use a UART1. Defina a frequência da portadora e a potência TX, inicie a transmissão e observe a saída em um analisador de espectro ou medidor de potência.

Para medir a transmissão TX modulada de BLE/BT com um testador, selecione StandAlone (Non Signaling) como modo de recepção e use o mesmo canal, tipo de pacote, payload e PHY configurados no SiFli_RfTool. Para medir RX do DUT, configure o testador como fonte do sinal: BLE usa parâmetros DTM, enquanto Bluetooth clássico usa uma forma de onda GPRF.

Se a ferramenta ou a conexão serial parar de responder, feche o SiFli_RfTool, desligue e religue o DUT, aguarde a inicialização e reconecte. Guarde a versão da ferramenta, a identificação do firmware, o chip/encapsulamento, os pinos UART, a revisão da placa, o canal, a PHY/tipo de pacote, a potência, a perda do cabo, a configuração do instrumento e os resultados brutos junto com o registro do teste.

![Configuração de recepção não sinalizada no testador](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — selecione StandAlone (Non Signaling) e use o mesmo canal e os mesmos parâmetros de pacote do DUT.</em></div>

Fontes oficiais por família: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
