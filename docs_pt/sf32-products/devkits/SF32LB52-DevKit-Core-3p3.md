---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: placa compacta de avaliação do SF32LB52x, alimentação do MCU de 1,8 V ou 3,3 V por jumper e acesso direto a GPIO, display, áudio e USB."
tags:
    - Hardware
    - Placa de desenvolvimento
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## Visão geral { #overview }

A SF32LB52-DevKit-Core-3p3 é uma placa compacta para avaliação direta dos chips SF32LB52x. Um jumper na placa permite selecionar a alimentação do MCU entre 1,8 V e 3,3 V. Os principais sinais do MCU ficam disponíveis nos conectores de borda; os furos semicirculares metalizados permitem inserir pinos de conexão sem soldagem. É indicada para engenheiros que precisam de acesso direto a GPIO, barramentos seriais, sinais de display, áudio, ADC, PWM e linhas de alimentação.

Com 30,88 × 68 mm, a placa é compacta para protótipos de bancada e ainda oferece um conjunto prático de interfaces para o bring-up de hardware e firmware do SF32LB52x.

![Vista frontal da SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — vista frontal</em></div>

![Vista traseira da SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — vista traseira</em></div>

## Variantes da placa { #board-variants }

<div align="center"><em>Variantes da SF32LB52-DevKit-Core-3p3</em></div>

<div align="center" markdown>

| Variante | MCU | Memória no encapsulamento | Memória na placa |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB de Flash SPI NOR | Nenhuma |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB de Flash SPI NOR | Nenhuma |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |

</div>

As variantes somente com NOR são adequadas a produtos compactos com Bluetooth, aplicações de controle e interfaces homem-máquina (HMI) simples. Prefira uma variante com PSRAM e NOR externa quando a aplicação precisar de recursos gráficos maiores, buffers de quadro, sistemas de arquivos ou mais espaço para armazenamento da aplicação.

**Divergência na documentação — confira a identificação antes de selecionar:** O [guia detalhado do Core-3p3](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html) da SiFli chama a configuração SF32LB52JUD6 de `R16N16 V1.0.0` (atual), enquanto o [guia de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) lista a mesma configuração JUD6 / 16 MB de PSRAM / 16 MB de NOR como `N16R16`. A linha de revisão do guia detalhado informa 8 MB de PSRAM integrada para EUB6, mas a lista de características e a tabela de variantes informam 4 MB. A [visão geral do SF32LB52](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md) da SiFli também especifica 4 MB para EUB6; por isso, este artigo adota 4 MB. Para confirmar o sufixo exato da placa, confira a identificação impressa e o esquemático/BOM correspondente.

## Destaques da placa { #board-highlights }

- Variantes de MCU SF32LB52x com configuração somente NOR ou PSRAM + NOR
- Cristal principal de 48 MHz e cristal RTC de 32,768 kHz
- Alimentação por USB Type-C e interface USB-UART via CH340N para gravação e depuração
- Antena PCBA integrada e conector de antena I-PEX
- Alimentação do MCU selecionável por jumper entre 1,8 V e 3,3 V
- Sinais USB 2.0 FS disponíveis no conector de borda
- A placa expõe 37 GPIOs; o MCU oferece 3 UARTs, 4 interfaces I2C, 2 GPTIMs, 2 interfaces SPI e 6 canais GPADC
- Todos os GPIOs podem ser configurados como UART, I2C ou GPTIM; a multiplexação também inclui SPI, PWM, I2S, PDM e entradas de despertar
- Conector FPC de 16 pinos com passo de 0,5 mm; as interfaces de display incluem SPI, DSPI e Quad-SPI, com suporte a QSPI em modo DDR
- Sinais I2C para o painel de toque
- Pinos para microfone analógico e saída de áudio diferencial
- Um LED de usuário
- Botão de alimentação e botão de função
- Pontos de teste para medir a corrente de uma linha individual; a SiFli também documenta testes de consumo do MCU, do sistema mínimo e da placa inteira

## Quando usar esta placa { #when-to-use-this-board }

Escolha a SF32LB52-DevKit-Core-3p3 quando precisar acessar diretamente os sinais do SF32LB52x.

- Fazer o bring-up de placas-filhas ou placas de sensores personalizadas
- Avaliar as variantes de memória do SF32LB52x
- Prototipar funções de LCD, áudio, USB e GPIO
- Medir a corrente em linhas de alimentação individuais
- Validar o firmware antes de projetar uma PCB compacta para o produto

Para uma placa menor, em formato de módulo e com furos semicirculares metalizados, use a [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para uma placa de display pronta para uso, com amplificador de áudio, slot para cartão TF e carregador de bateria, use a [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentação { #power }

A placa oferece três entradas de alimentação:

- Alimentação por USB Type-C, recomendada para o desenvolvimento e a depuração do dia a dia
- Entrada de 5 V pelos pinos de 5 V e GND do conector de borda quando o USB estiver desconectado
- Entrada de 3,3 V pelos pinos de 3,3 V e GND do conector de borda quando o USB estiver desconectado; pode ser usada uma fonte de bancada externa

Um jumper separado seleciona a alimentação do MCU entre 1,8 V e 3,3 V. Essa configuração é independente dos pinos externos de alimentação de 1,8 V e 3,3 V no conector de borda. Antes de mudar o jumper ou alimentar circuitos externos, confira o pinout e o esquemático da revisão correspondente da placa.

Para medir a corrente de uma única linha de alimentação, conecte um amperímetro em série com essa linha, nos pontos de medição da placa.

Quando o USB Type-C está conectado, alguns pinos do conector também podem fornecer saídas de 3,3 V, 1,8 V e 5 V. Confirme a direção necessária antes de conectar circuitos externos.

A placa inclui uma chave de alimentação. O sinal RTS# do CH340N pode controlar a habilitação da placa, permitindo que a ferramenta host reinicie o MCU durante a gravação ou a depuração.

## Gravação e depuração { #download-and-debug }

Use a porta UART via USB Type-C para gravar o firmware e depurar o software.

- **Modo de gravação**: habilite BOOT na ferramenta de gravação e, em seguida, ligue ou reinicie a placa.
- **Modo de depuração e logs**: desabilite BOOT e, em seguida, ligue ou reinicie a placa.
- **Reset**: use o botão de reset/alimentação da placa ou o reset por RTS controlado pela ferramenta.

## Controles do usuário { #user-controls }

<div align="center"><em>Sinais dos controles do usuário</em></div>

<div align="center" markdown>

| Função | GPIO | Comportamento |
| :--- | :--- | :--- |
| LED | PA32 | Ativo em nível alto |
| KEY1 | PA34 | Ativo em nível alto; permite reset após pressionamento longo de 10 s |
| KEY2 | PA33 | Ativo em nível alto |

</div>

## Interface de display { #display-interface }

A placa aceita interfaces LCD por SPI, DSPI e Quad-SPI, incluindo QSPI em modo DDR, por meio de um conector FPC vertical de 16 pinos com passo de 0,5 mm, trava flip-up e contatos inferiores. O conector fornece sinais de reset do LCD, PWM da retroiluminação, TE, seleção de chip, clock, quatro linhas de dados e sinais I2C do painel de toque.

![Cabo adaptador FPC](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>Cabo adaptador FPC</em></div>

### Mapa de sinais do FPC LCD de 16 pinos { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>Mapa de sinais do FPC LCD de 16 pinos</em></div>

<div align="center" markdown>

| Pino | Sinal | Função |
| :--- | :--- | :--- |
| 1 | GND | Terra |
| 2 | PA00 | Reset do LCD |
| 3 | PA01 | PWM da retroiluminação |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3,3 V | Saída de alimentação do display |
| 12 | GND | Terra |
| 13 | PA09 | Interrupção do toque |
| 14 | PA11 | SDA do I2C do toque |
| 15 | PA20 | SCL do I2C do toque |
| 16 | PA10 | Reset do toque |

</div>

O guia chinês da placa publicado pela SiFli informa que o módulo AMOLED de 1,85 polegada se conecta diretamente por um cabo FPC de 16 pinos. Já o guia em inglês especifica um cabo FPC-22p, e o arquivo da ilustração se chama `FPC-22P`. O conector da placa tem 16 pinos. As fontes não esclarecem a divergência; antes de conectar, confira a quantidade de pinos e o mapeamento do cabo e do módulo de display.

## Resumo dos sinais dos conectores { #header-signal-summary }

A placa disponibiliza dois conectores de borda com 24 pinos cada. Um lado reúne principalmente GPIOs gerais, SPI2, USB, GPADC e alimentação. O outro reúne sinais de LCD, painel de toque, UART de depuração, áudio e alimentação.

![Pinagem da SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>Pinagem da SF32LB52-DevKit-Core-3p3</em></div>

### Conector de E/S geral { #general-io-header }

<div align="center"><em>Distribuição dos pinos do conector de E/S geral</em></div>

<div align="center" markdown>

| Faixa de pinos | Sinais | Funções principais |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, entradas de despertar |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3,3 V | Entrada ou saída de 3,3 V, conforme a alimentação USB |
| 18-21 | PA27..PA24 | Entradas de despertar, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

### Conector de LCD, áudio e depuração { #lcd-audio-and-debug-header }

<div align="center"><em>Distribuição dos pinos do conector de LCD, áudio e depuração</em></div>

<div align="center" markdown>

| Faixa de pinos | Sinais | Funções principais |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, painel de toque, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | Microfone analógico e saída de áudio |
| 17 | 1,8 V | Entrada ou saída de 1,8 V, conforme a alimentação USB |
| 18-20 | PA10, PA11, PA20 | PA10: CTP_RST; PA11: CTP_SDA; PA20: CTP_SCL; os três aceitam UART, I2C e GPTIM |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, gravação/depuração |
| 24 | 5 V | Entrada ou saída de 5 V, conforme a alimentação USB |

</div>

## Pinos de Flash externa e SDIO { #external-flash-and-sdio-pins }

Algumas variantes incluem uma Flash QSPI-NOR externa de 16 MB. O grupo de pinos compartilhado entre armazenamento e SDIO é:

<div align="center"><em>Grupo de pinos da Flash externa e do SDIO</em></div>

<div align="center" markdown>

| GPIO do MCU | Função compartilhada de Flash/SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Antes de usar esses pinos para SDIO ou outras funções de expansão, verifique se eles já estão ocupados pela Flash montada na placa.

## Expansão de áudio { #audio-expansion }

A placa disponibiliza a polarização e a entrada para microfone analógico, além de uma saída DAC diferencial. O microfone e um amplificador Class-AB/D para acionar um alto-falante são externos; selecione-os de acordo com o caminho de áudio pretendido.

## Alvos de compilação do SDK { #sdk-build-targets }

Ao compilar com o SiFli-SDK, use `scons --board=<board_name>` com um destes nomes exatos de alvo:

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

Esses nomes identificam alvos de compilação do SDK e não necessariamente correspondem ao nome do produto impresso na placa ou no módulo. O índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e o [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) do SDK podem listar conjuntos diferentes; confirme o alvo para a revisão do SDK em uso.

## Documentos relacionados { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Apresentação do chip SF32LB52x][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware SF32LB52x][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[Artigo original da Wiki da SiFli][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Pacote de projeto][Design Package]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__

</div>
