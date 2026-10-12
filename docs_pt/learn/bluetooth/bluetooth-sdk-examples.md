---
icon: lucide/bluetooth-connected
title: "Exemplos do SDK Bluetooth"
description: "Escolha o exemplo Bluetooth do SiFli-SDK mais adequado para serviços BLE, perfis Bluetooth clássicos, integração com telefone, OTA, transferência de dados ou difusão LE Audio."
tags:
  - Bluetooth
  - Exemplos
---

# Exemplos do SDK Bluetooth { #bluetooth-sdk-examples }

Os exemplos Bluetooth do SiFli-SDK são pontos de partida para validar um perfil, papel ou fluxo de rádio específico; não constituem firmware pronto para integração direta em um produto. Comece pelo projeto que cobre o requisito técnico mais exigente do produto, faça o exemplo sem modificações funcionar na placa-alvo e, em seguida, acrescente um requisito de produto por vez.

Esta página organiza por tarefa de engenharia os exemplos de [Bluetooth clássico](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html) e [difusão LE Audio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) listados na documentação do SF32LB58x. O caminho `sf32lb58x` indica a seção da documentação, não garante que cada exemplo funcione em todas as placas SF32LB58x ou em outras famílias SF32. A URL `latest` é atualizada continuamente. Para a versão ou o commit do SDK que pretende usar, consulte a seção **Supported Platforms** da página de cada projeto e siga somente os nomes de placas e as instruções de compilação ali indicados. Se não houver confirmação explícita para a placa e a revisão do SDK escolhidas, marque a compatibilidade como **não verificada**; não a deduza pela URL, por outro exemplo ou por uma placa com nome parecido. Mesmo que a página indique “all platforms”, valide o exemplo com a revisão real do SDK e a configuração da placa antes de iniciar o trabalho no produto. A página do projeto também é a referência para as configurações de `menuconfig`, os equipamentos de teste e as limitações.

## Escolha o caminho Bluetooth adequado { #start-with-the-right-bluetooth-path }

<div align="center"><em>Tabela: Seleção de exemplos Bluetooth do SDK</em></div>

<div align="center" markdown>

| Necessidade do produto | Comece por | Valide antes da integração ao produto |
|:-----------------------|:-----------|:--------------------------------------|
| Serviço BLE próprio ou conexão com um aplicativo complementar | [Periférico BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Anúncios, conexão, interface e comportamento do serviço, reconexão e validação no telefone |
| O dispositivo precisa funcionar como periférico do telefone e como central conectada a um sensor | [Central e periférico BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Papéis GAP simultâneos e responsabilidades de cliente/servidor GATT |
| Transferência confiável de dados por BLE | [Taxa de transferência BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) ou [Transferência de arquivos BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | Fluxo de dados necessário, parâmetros de conexão e recuperação de falhas |
| Atualização de firmware por Bluetooth | [Periférico com OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) ou [Central e periférico com OTA Pingpong](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Papéis na atualização, recuperação após a interrupção da atualização, partições e plano de reversão |
| Comunicação serial ou acesso à rede pelo telefone via Bluetooth clássico | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) ou [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | O perfil serial ou o caminho de rede fornecido pelo telefone, a compatibilidade com o dispositivo remoto e o comportamento de reconexão |
| Transporte HCI por UART entre host e controlador BT/BLE | [HCI via UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | Limite entre host e controlador, transporte UART e configuração do controlador e da placa de destino |
| Áudio ou chamadas por Bluetooth clássico | [Receptor de música](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Transmissor de música](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) ou [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Rota de áudio, configuração do clock, buffers, interoperabilidade com o telefone e orçamento de energia |
| Difusão LE Audio | [Transmissor de difusão BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) ou [Receptor de difusão BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Papel na difusão, cadeia de processamento de áudio, receptor ou transmissor de teste e margem de temporização |

</div>

## Valide o exemplo antes de adaptá-lo { #bring-up-an-example-as-evidence }

Antes de alterar o projeto, registre a versão exata do SDK, o nome da placa, a configuração, o dispositivo ou aplicativo remoto, os parâmetros de rádio e o log esperado. Em seguida, siga esta sequência:

1. Compile e grave o exemplo sem modificações usando o nome exato da placa e as instruções indicadas para a versão correspondente do SDK. Se a relação entre a documentação e a revisão do SDK, ou o suporte à placa, não estiver estabelecida, trate a compatibilidade como não verificada antes de adaptar o exemplo.
2. Comprove o comportamento essencial via rádio: descoberta, conexão, transferência, streaming ou recepção, conforme o caso.
3. Repita o teste após reinicialização, desconexão, reconexão e ciclo de alimentação.
4. Acrescente um serviço, fluxo de uso, rota de áudio ou política de energia específico do produto por vez.
5. Teste novamente com a carga combinada do produto, incluindo display, sensores, armazenamento, áudio e transições para modos de baixo consumo, quando aplicável.

Um exemplo funcional demonstra apenas o fluxo que cobre. Ele não comprova que a política de segurança, o alcance de rádio, a latência, o consumo de energia ou a interoperabilidade do produto estejam prontos para lançamento.

## Exemplos BLE { #ble-examples }

Use os exemplos BLE para conexões com aplicativos complementares, serviços GATT interoperáveis, beacons, transferência de dados e OTA por BLE. Comece por um exemplo orientado ao papel e só então adicione um exemplo de perfil, se o produto precisar desse serviço padronizado.

<div align="center"><em>Tabela: Exemplos do SDK BLE por tarefa de engenharia</em></div>

<div align="center" markdown>

| Tarefa de engenharia | Exemplos oficiais | O que validar com esses projetos |
|:---------------------|:------------------|:---------------------------------|
| Papéis básicos e acesso a serviços | [Periférico](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central e periférico](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Múltiplas conexões](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Anúncios, varredura, gerenciamento de conexões e divisão correta entre central e periférico |
| Integração com telefone | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [ANCS em dois núcleos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Integração com mídia ou notificações Apple e fluxo de pareamento necessário no telefone |
| Perfis GATT padronizados | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | Papel do serviço, definição das características GATT e interoperabilidade do perfil com o dispositivo remoto |
| Interface de entrada e comunicação por voz | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [Intercomunicador BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | Modelo de interação antes de adicionar a interface ou o comportamento de voz do produto |
| Pareamento e reconexão | [Pareamento BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Vínculo (bonding), gerenciamento de identidade e procedimento de novo pareamento do produto |
| Anúncios e descoberta | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Anúncios periódicos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Sincronização de anúncios periódicos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | Comportamento de difusão ou sincronização necessário, sem pressupor uma conexão GATT |
| Transferência de dados e OTA | [Transferência de arquivos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Taxa de transferência](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Periférico com OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central e periférico com OTA Pingpong](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Carga útil, parâmetros do enlace, papéis na atualização, recuperação de interrupções e validação ponta a ponta |

</div>

Não trate o throughput medido como a taxa de dados do produto. O resultado depende da PHY selecionada, dos parâmetros de conexão, do comportamento do dispositivo remoto, do ambiente de RF, da atividade do host e do padrão dos dados transmitidos. Da mesma forma, um exemplo ANCS ou AMS é uma base para integração com o telefone, não uma garantia para todas as versões do iOS ou configurações de permissão do usuário.

## Exemplos de Bluetooth clássico { #classic-bluetooth-examples }

Os projetos de Bluetooth clássico são indicados para produtos que precisam de perfis BR/EDR, áudio, transporte serial ou acesso à rede IP por meio de um telefone. Uma demonstração bem-sucedida na placa de desenvolvimento é apenas o ponto de partida; valide a interoperabilidade com os dispositivos remotos e as cargas de trabalho reais do produto.

<div align="center"><em>Tabela: Exemplos do SDK Bluetooth clássico por tarefa de engenharia</em></div>

<div align="center" markdown>

| Tarefa de engenharia | Exemplos oficiais | O que validar com esses projetos |
|:---------------------|:------------------|:---------------------------------|
| Transporte entre host/controlador ou perfil serial de Bluetooth clássico | [HCI via UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | Limite entre host e controlador e transporte UART do HCI, ou comportamento do perfil serial SPP |
| Streaming de áudio e controle de mídia | [Múltiplas conexões A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [Compartilhamento A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [Capa de álbum AVRCP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Receptor de música](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Receptor de música com retransmissão](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Transmissor de música](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | Topologia pretendida entre fonte e receptor, rota de áudio, caminho de controle de mídia e orçamento de recursos |
| Chamadas e enlaces de voz | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [Retransmissão HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Topologia da chamada, latência de áudio, caminho do microfone/alto-falante e comportamento do telefone |
| Rede fornecida pelo telefone e OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Compartilhamento de rede pelo telefone, tráfego IP, reconexão e caminho de entrega da OTA |

</div>

Para o modelo de rede PAN e a configuração no telefone, consulte [Bluetooth PAN](pan.md). Para roteamento de áudio, gerenciamento de buffers e validação sob carga do sistema, consulte [Visão geral de áudio](../audio/overview.md) e [Audio Server e bufferização](../audio/audio-server-buffering.md).

## Exemplos de difusão LE Audio { #le-audio-broadcast-examples }

A rota de documentação `sf32lb58x` não comprova, por si só, a compatibilidade com uma placa; consulte **Supported Platforms** para a revisão exata do SDK e a placa de destino. No exemplo que conecta Bluetooth clássico e BAP, o título do README indica um transmissor, mas o caminho e a visão geral descrevem um receptor. A [implementação na revisão do SDK analisada](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) trata A2DP clássico e inicia um transmissor de difusão BAP. Essa constatação se aplica somente ao commit vinculado, não automaticamente a todas as versões publicadas como `latest`. Antes de compilar, confira o README, o código-fonte e a configuração da placa na versão ou no commit exato do SDK que será usado. Não deduza o papel nem a compatibilidade da placa a partir da descrição copiada do receptor.

Os projetos `zbt` fornecem exemplos de fonte e receptor para difusão LE Audio baseados no [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Teste a fonte e o receptor como um sistema integrado: a configuração da difusão, a fonte de áudio, o receptor, a temporização dos clocks e as condições de RF influenciam o resultado observado.

<div align="center"><em>Tabela: Exemplos do SDK para difusão LE Audio</em></div>

<div align="center" markdown>

| Objetivo do produto | Exemplo oficial | O que validar primeiro |
|:--------------------|:----------------|:----------------------|
| Receber um fluxo de áudio em difusão | [Receptor de difusão BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Comportamento do receptor, caminho de saída de áudio e configuração de difusão usada no teste |
| Transmitir um fluxo de áudio em difusão | [Transmissor de difusão BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Pipeline de áudio da fonte, configuração da difusão e receptor comprovadamente funcional |
| Integrar Bluetooth clássico e difusão LE Audio | [Transmissor de difusão BAP com Bluetooth clássico](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | As duas cadeias de processamento de áudio, o ponto de transferência entre elas e a margem combinada de temporização e recursos |

</div>

## Validação do produto além do exemplo { #product-validation-beyond-the-example }

<div align="center"><em>Tabela: Verificações para adaptar exemplos Bluetooth ao produto</em></div>

<div align="center" markdown>

| Aspecto | Preserve do exemplo original | Valide novamente no produto |
|:--------|:-----------------------------|:---------------------------|
| Comportamento de rádio | A placa compatível e o papel ou perfil previsto no exemplo | Antena, gabinete, alcance, coexistência de RF, dispositivos remotos e plano de ensaios de conformidade regulatória |
| Política de conexão | Fluxo básico de anúncios, varredura ou conexão | Latência do produto, meta de consumo de energia, estratégia de reconexão e transições de estado |
| Segurança | Configuração de pareamento ou vínculo (bonding) do exemplo | Requisitos de autenticação, armazenamento de chaves, privacidade, restauração de fábrica e recuperação para o usuário |
| Dados e áudio | Fluxo de pacotes ou streaming demonstrado | Formato e regras de troca de dados, recuperação de erros, latência, buffering, configuração de codec e margem de memória |
| Evidências | Configurações de compilação, logs e comportamento esperado | Matriz reproduzível de telefones/acessórios, registro temporal do consumo, recuperação após desconexão e teste de regressão |

</div>

## Recursos relacionados { #related-resources }

- [Visão geral do Bluetooth](overview.md) para decisões de produto sobre papéis, perfis, segurança, parâmetros de conexão e coexistência.
- [Processador Bluetooth](processor.md) para os limites entre host e controlador e o comportamento de energia.
- [Bluetooth PAN](pan.md) para rede IP compartilhada pelo telefone e OTA via PAN.
- [Exemplos de áudio do SDK](../audio/audio-sdk-examples.md) para exemplos complementares de captura local, codecs e reprodução.
- [Exemplos](../../develop/examples/index.md) para o catálogo de exemplos do SDK em diferentes áreas.
