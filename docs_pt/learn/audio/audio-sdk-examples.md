---
icon: lucide/audio-lines
title: "Exemplos de áudio do SDK"
description: "Escolha o exemplo de áudio do SiFli-SDK mais adequado para captura de microfones PDM, gravação, reprodução, codecs, armazenamento e mixagem."
tags:
  - Áudio
  - Exemplos
---

# Exemplos de áudio do SDK { #audio-sdk-examples }

Os exemplos de áudio do SiFli-SDK são pontos de partida práticos para validar um caminho de sinal completo, não firmware pronto para integrar a um produto. Escolha o exemplo que já demonstra a parte mais complexa do seu projeto: captura por microfone, saída para alto-falante, armazenamento, codec ou execução simultânea de vários fluxos. Primeiro faça o exemplo funcionar sem modificações na placa de destino; depois altere um subsistema por vez.

Esta página agrupa uma seleção de exemplos de áudio do SiFli-SDK por tarefa de engenharia. O [índice oficial de áudio](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) é um ponto de partida. A tabela informa as placas explicitamente listadas nas páginas oficiais da SiFli no momento desta revisão; o nome de uma série não significa que todas as placas ou versões do SDK dessa série sejam compatíveis. Antes de compilar, confira a página da versão usada e a configuração da placa de destino.

## Comece pelo exemplo adequado { #start-with-the-right-example }

<div align="center"><em>Tabela: exemplos de áudio do SiFli-SDK por tarefa de engenharia</em></div>

<div align="center" markdown>

| Objetivo de engenharia | Exemplo recomendado | O que valida | Placas e limitações documentadas oficialmente |
|:-----------------|:-----------|:---------------|:----------------------------|
| Capturar áudio de dois ou quatro microfones digitais | [Exemplo PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | Captura PDM; gravação WAV e reprodução nos modos que oferecem esses recursos | A página atual lista apenas `sf32lb56-lcd_a128r12n1`. Confira a fiação PDM e a multiplexação de pinos. A descrição da configuração dos pinos contém um erro no nome da placa: `f32lb56-lcd_a128r12n1` (falta o `s` inicial). O comando de compilação usa o nome correto. |
| Capturar áudio de dois microfones analógicos | [Exemplo de música local para alto-falantes estéreo (Local Music Example for stereo speaker, ADC/DAC duplo)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Captura simultânea em arquivos PCM separados; seleção de um dos microfones para monitoramento no alto-falante | Requer uma placa personalizada SF32LB58x e não funciona em placas de módulo SiFli. São necessários dois microfones analógicos e dois alto-falantes analógicos. |
| Validar o caminho básico entre microfone e alto-falante | [Exemplo de gravação](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Gravação de cinco segundos em um buffer PCM na memória, seguida de reprodução automática | `eh-lb525` e as séries `sf32lb52-lcd`, `sf32lb56-lcd` ou `sf32lb58-lcd`; requer um alto-falante. |
| Reproduzir áudio predefinido do sistema de arquivos raiz | [Exemplo de música local](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | Reprodução do arquivo predefinido `16k.wav` pela partição raiz FAT montada; também aceita MP3 predefinido se couber na capacidade configurada | `eh-lb525` e as séries `sf32lb52-lcd`, `sf32lb56-lcd` ou `sf32lb58-lcd`; requer partição FAT raiz e alto-falante. |
| Reproduzir música de um cartão SD | [Reprodutor local de MP3](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | Reprodução de MP3 ou WAV do diretório `music` do cartão SD e controle de volume pelo shell | A página atual lista apenas `sf32lb52-lchspi-ulp`. Requer SPI1, FAT/MSD e alto-falante; para detectar pressionamentos longos, também é necessária uma bateria externa. |
| Gravar, comprimir, decodificar e reproduzir áudio sem perdas | [Exemplo FLAC](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | Gravação PCM, codificação e decodificação FLAC e reprodução | As séries `sf32lb52-lcd`, `sf32lb56-lcd` e `sf32lb58-lcd`; requer FAT, `libFLAC` e componentes de áudio. |
| Gravar, comprimir, decodificar e reproduzir áudio para aplicações de voz | [Exemplo Opus](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | Captura de microfone a 16 kHz, codificação/decodificação Opus e reprodução no alto-falante | A página atual lista apenas `eh-lb525`. Requer FAT e componentes de áudio; siga as recomendações de pilha específicas deste exemplo descritas abaixo. |
| Mixar várias faixas locais | [Reprodutor de mixagem de três canais (página oficial em chinês)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Decodificação independente de três arquivos locais, reamostragem quando necessária e saída mixada | A página atual lista `sf32lb52-lcd_n16r8` e `sf32lb56-lcd_n16r12n1` como placas testadas; use a imagem de sistema de arquivos e os arquivos fornecidos pelo exemplo. |

</div>

## Ponto de partida comum { #shared-starting-point }

A maioria dos exemplos depende dos mesmos requisitos básicos: o hardware de áudio precisa estar presente e conectado corretamente na placa; a configuração da placa deve habilitar os blocos de áudio necessários; e o exemplo escolhido precisa ser compatível com a placa de destino. Exemplos que leem ou gravam arquivos também exigem um sistema de arquivos montado. Não copie o nome da placa, a atribuição de pinos ou uma configuração de `menuconfig` de outro exemplo sem conferir a página oficial e os arquivos da placa de destino.

!!! warning "Proteja os dados existentes do sistema de arquivos"
    O exemplo Opus da v2.5.1 chama `dfs_mkfs()` quando a montagem do sistema de arquivos raiz falha ([código-fonte](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). Não leve essa recuperação por formatação automática para um produto sem uma política explícita de preservação dos dados. Uma falha de montagem não autoriza apagar os dados do usuário.

Para todos os exemplos, mantenha a primeira validação deliberadamente simples:

1. Compile e grave o projeto sem modificações em uma placa compatível.
2. Confirme o comportamento esperado de captura ou reprodução usando hardware de áudio e arquivos previamente validados.
3. Registre a revisão do SDK, o nome da placa, a configuração, a atribuição de pinos e o log serial.
4. Altere um único elemento específico do produto e repita o mesmo teste.

A [visão geral de áudio](overview.md) explica as escolhas de interface e de sistema por trás desses exemplos. Para informações sobre gerenciamento de buffers, encerramento de sessões e coexistência com atividades de display ou Bluetooth, consulte [Audio Server e bufferização](audio-server-buffering.md).

## Captura de microfone digital: PDM { #digital-microphone-capture-pdm }

Use o exemplo PDM quando o produto precisar capturar áudio de microfones digitais, em vez de usar uma entrada analógica. O exemplo oficial suporta dois ou quatro microfones PDM, mas a criação do arquivo de gravação e sua reprodução dependem do modo de processamento. A topologia documentada usa os canais esquerdo e direito de `PDM1` para dois microfones e acrescenta `PDM2` para chegar a quatro. Uma interface PDM pode atender até dois microfones digitais; portanto, a quantidade de interfaces não equivale à quantidade de microfones. Confirme a configuração suportada pelo mapeamento de interfaces e canais do SoC de destino.

A página upstream atual lista `sf32lb56-lcd_a128r12n1` como placa compatível. O modo `pdm open pdm12 4 raw` gera apenas logs, sem criar um arquivo de gravação. Os modos de processamento Anyka produzem saída mono, inclusive com quatro microfones: quatro entradas não significam um arquivo de quatro canais. Confira as dependências do algoritmo e o formato de saída antes de usar o exemplo como base para um arranjo de microfones.

Antes de adaptá-lo, confirme estes quatro pontos:

- O chip e a placa escolhidos disponibilizam os sinais PDM necessários.
- Clock, linhas de dados, alimentação e aterramento dos microfones estão de acordo com o datasheet de cada microfone.
- A configuração de multiplexação de pinos da placa atribui as funções PDM antes da inicialização do driver.
- O produto precisa dos serviços de gravação e reprodução habilitados pelo exemplo; eles não são necessários para fazer apenas a captura de dados PDM.

A página upstream do exemplo PDM documenta a configuração da placa e o mapeamento de pinos usados pelo próprio exemplo. Use-os como referência validada, mas substitua-os pela fiação real da placa de destino, sem presumir que podem ser transferidos sem alterações. Consulte o [exemplo PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html).

## Captura analógica e gravação/reprodução básica { #analog-capture-and-basic-recordplayback }

O **exemplo de gravação** permite validar rapidamente a captura do microfone seguida de reprodução local: grava por cinco segundos em um buffer PCM na memória e, em seguida, reproduz o buffer automaticamente pelo alto-falante. A página oficial lista `eh-lb525` e as séries `sf32lb52-lcd`, `sf32lb56-lcd` e `sf32lb58-lcd`. Comece por ele antes de adicionar sistema de arquivos, compressão, transporte Bluetooth ou suporte a vários microfones.

O **Local Music Example for stereo speaker** (exemplo ADC/DAC duplo) é uma referência especializada para uma placa personalizada SF32LB58x. A página oficial informa que ele não funciona em placas de módulo SiFli e requer dois microfones analógicos e dois alto-falantes analógicos. O comando `mic2file` grava os dois microfones simultaneamente em arquivos PCM separados; `mic2speaker 0` ou `mic2speaker 1` seleciona um deles para monitoramento pelo alto-falante. Use-o somente quando essa topologia analógica corresponder ao produto; caso contrário, comece pelo exemplo de gravação, mais simples.

Em ambos os caminhos, verifique o nível de ruído em silêncio, o ganho, o clipping e o comportamento de início/parada antes de investigar recursos de software. Um caminho estável de captura e reprodução PCM é a base para trabalhar com codecs, arquivos e Bluetooth.

## Reprodução local e armazenamento { #local-playback-and-storage }

O **exemplo de música local** é a referência mais simples para reprodução de arquivos. A página oficial lista `eh-lb525` e as séries `sf32lb52-lcd`, `sf32lb56-lcd` e `sf32lb58-lcd`. Ele monta a partição raiz FAT e reproduz o arquivo predefinido `16k.wav`. Também pode reproduzir um MP3 predefinido colocado no diretório `disk/` do exemplo, desde que o arquivo caiba na capacidade configurada do sistema de arquivos. Use-o para testar sons de notificação, avisos incluídos no produto e o caminho local para o alto-falante.

O **reprodutor local de MP3** acrescenta armazenamento removível: reproduz MP3 ou WAV do diretório `music` de um cartão SD e controla o volume pelo shell. Os dois exemplos de reprodução local precisam de um sistema de arquivos; este usa também SPI1 e o driver SPI MSD. Na placa documentada `sf32lb52-lchspi-ulp`, conecte uma bateria; sem ela, os pressionamentos longos dos botões não serão detectados. Escolha este exemplo quando o produto usar cartão SD.

Os dois exemplos validam a reprodução, mas não definem uma arquitetura genérica de reprodutor de mídia. Antes de transformar qualquer um deles em um reprodutor voltado ao usuário, projete separadamente a indexação de arquivos, o tratamento de mídia corrompida, as interrupções, a recuperação após mudanças de estado de energia e o comportamento da interface de usuário.

## Pipelines de codec FLAC e Opus { #flac-and-opus-codec-pipelines }

O **exemplo FLAC** cobre o fluxo completo sem perdas: grava PCM do microfone, codifica em FLAC, decodifica e reproduz o resultado. A página oficial lista as séries `sf32lb52-lcd`, `sf32lb56-lcd` e `sf32lb58-lcd`; são necessários FAT, `libFLAC` e componentes de áudio. É adequado para testar um pipeline de captura baseado em arquivos ou comparar o espaço de armazenamento com PCM sem compressão.

O **exemplo Opus** cobre um fluxo de compressão voltado a aplicações de voz. A página upstream atual lista apenas `eh-lb525`. O exemplo captura a 16 kHz, processa quadros de 10 ms a aproximadamente 16 kbps e depois decodifica e reproduz o fluxo. A documentação também destaca que o tamanho de pilha necessário varia conforme o modo de codificação selecionado. Mantenha essa restrição ao usar o exemplo como base; depois de acrescentar tarefas da aplicação, não presuma que a pilha padrão da tarefa ainda será suficiente.

O README oficial do SiFli-SDK indica configurações de pilha específicas para este exemplo: use `OPUS_STACK_SIZE` de 20k quando `opus_test()` chama `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))`; sem esse modo forçado, a recomendação é 200k. Esses valores não são requisitos universais do Opus. Antes de adotá-los, confirme a revisão do SDK e o caminho de codificação usados e meça o pico de uso da pilha com a carga de trabalho do produto para dimensionar a tarefa.

Nenhum dos dois exemplos implementa uma chamada Bluetooth completa ou um produto de streaming de ponta a ponta. Primeiro valide a codificação e decodificação locais; depois integre o transporte, a bufferização e a política de sessão, medindo as margens de latência e memória.

## Mixagem de três canais { #three-channel-mixing }

Atualmente, o **reprodutor de mixagem de três canais** consta como testado em `sf32lb52-lcd_n16r8` e `sf32lb56-lcd_n16r12n1`. O exemplo lê três arquivos de áudio locais, decodifica cada fluxo, reamostra as entradas que não estão em 48 kHz quando necessário, combina os fluxos PCM mono e reproduz a saída. O conjunto documentado contém dois MP3 e um WAV; use a imagem de sistema de arquivos e os nomes indicados, sem presumir que ela contém arquivos arbitrários.

O mixer verificado soma as três amostras mono e divide por três, em vez de somá-las com ganho total. A execução documentada dura cerca de 50 segundos. Diferencie essa política de ganho e a duração limitada da demonstração dos requisitos de mixagem do produto.

É uma boa referência para combinar avisos, efeitos sonoros e música quando o produto precisa decidir quais sons podem se sobrepor. Não é uma política de áudio pronta para o produto: defina prioridade dos fluxos, controle de volume, comportamento em clipping, orçamento de memória e o que fazer quando um arquivo de entrada ou decodificador não cumprir o prazo. Consulte [Audio Server e bufferização](audio-server-buffering.md) para definir claramente esses limites em tempo de execução.

## Adapte o exemplo sem perder as evidências de validação { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabela: itens a preservar e revalidar ao adaptar exemplos de áudio</em></div>

<div align="center" markdown>

| Aspecto | Preserve do exemplo | Revalide para o produto |
|:---------|:----------------------|:----------------------------|
| Hardware | Roteamento da placa validado e caminho de periférico compatível | Modelo do microfone ou alto-falante, ganho, alimentação, multiplexação de pinos, layout e acesso para teste de produção |
| Configuração | Componentes mínimos do SDK habilitados | Memória, sistema de arquivos, codecs, Audio Manager e opções realmente exigidos pelo produto |
| Dados de áudio | Formato das amostras e arquivos conhecidos e validados | Taxa de amostragem, número de canais, tamanho dos buffers, latência-alvo e tratamento de erros |
| Comportamento em execução | Sequência básica de captura ou reprodução | Concorrência com interface de usuário, Bluetooth e armazenamento; transições de baixo consumo, recuperação e encerramento |
| Evidências | Comportamento esperado descrito pelo upstream | Log serial, arquivos de captura/reprodução, corrente medida e teste de regressão reproduzível |

</div>

## Recursos relacionados { #related-resources }

- [Visão geral de áudio](overview.md) para interfaces, tipos de sessão, consumo de energia e validação.
- [Audio Server e bufferização](audio-server-buffering.md) para gerenciamento de fluxos, buffers DMA e testes com carga de produto.
- [Exemplos](../../develop/examples/index.md) para o catálogo de exemplos do SDK em várias áreas.
- [Índice de exemplos de áudio do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) para consultar a lista oficial atual e as instruções de configuração de cada exemplo.
