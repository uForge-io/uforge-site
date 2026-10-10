---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: placa de desenvolvimento SF32LB58x para o bring-up de painéis MIPI DSI, RGB e QSPI, com áudio, SDIO, CAN e interfaces de expansão."
tags:
    - Hardware
    - Placa de desenvolvimento
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## Visão geral { #overview }

A SF32LB58-DevKit-LCD é uma placa de desenvolvimento baseada na família de módulos SF32LB58-MOD. É voltada a produtos com telas DSI, DPI/RGB ou QSPI e oferece uma plataforma prática para validar interfaces de usuário de alta resolução, áudio, armazenamento, USB e a integração de periféricos.

A placa reúne um módulo SF32LB58x, vários conectores de tela, entrada de microfone analógico, saída estéreo para alto-falantes, slot MicroSD, duas portas USB Type-C, conectores de expansão para os núcleos de alto desempenho e de baixo consumo, além de interfaces auxiliares como CAN e Wi-Fi via SDIO.

Antes de desenvolver uma placa própria, é possível usar esta placa para validar em conjunto tela, armazenamento, áudio, USB e periféricos externos.

![Vista frontal da SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — vista frontal</em></div>

![Vista traseira da SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — vista traseira</em></div>

![Diagrama de blocos da SF32LB58-DevKit-LCD](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — diagrama de blocos</em></div>

## Versões da placa e do módulo { #board-and-module-version-notes }

<div align="center"><em>Resumo das versões do módulo</em></div>

<div align="center" markdown>

| Versão do módulo | Base | Observações |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1 e SF32LB58-MOD-A128R32N1 com SF32LB586VDD36 | Versão atual; o controle de alimentação do eMMC foi ajustado: PA74 controla VCC e PA80 controla VCCQ; o resistor R0115 também foi acrescentado |
| V1.0.0 | SF32LB58-MOD-N16R32N1 com SF32LB586VDD36 | Versão inicial do módulo, conforme a seção de versões de módulo da fonte da SiFli |

</div>

<div align="center"><em>Resumo das versões da placa</em></div>

<div align="center" markdown>

| Versão da placa | Base | Observações |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 e SF32LB58-MOD-A128R32N1-V1.0.1 | Versão atual; adiciona detecção de conexão USB em PB24; altera o PTC para 2 A / 6 V para suportar a potência máxima dos dois canais de áudio; remove a adaptação de nível do LED RGB, cuja temporização era inadequada; substitui o conversor CC-CC para reduzir a ondulação na saída; remove o resistor pull-up de USB DP para corrigir o problema de interrupção no modo periférico USB |
| V1.0.0 | SF32LB58-MOD-N16R32N1-V1.0.0 com SF32LB587VEE56 | Versão pública inicial da placa |

</div>

A fonte da SiFli apresenta uma divergência para a versão V1.0.0: a seção de versões de módulo identifica o SF32LB586VDD36, enquanto a seção de versões da placa indica o SF32LB587VEE56 para uma placa com o módulo N16R32N1-V1.0.0. Confira as marcações do chip e do módulo no hardware real e consulte os arquivos de projeto correspondentes antes de escolher o alvo do firmware ou depender de uma configuração de armazenamento.

## Destaques da placa { #board-highlights }

- Módulo SF32LB58-MOD-N16R32N1 ou SF32LB58-MOD-A128R32N1, conforme a versão da placa
- A V1.0.1 usa o SF32LB586VDD36, com duas memórias HPI-PSRAM de 16 MB e uma QSPI-NOR de 1 MB no encapsulamento; o identificador do MCU da V1.0.0 é contraditório na fonte da SiFli (veja a nota de versão acima)
- Memória adicional de 16 MB em QSPI-NOR ou 128 MB em QSPI-NAND, conforme a variante do módulo
- Cristal principal de 48 MHz e cristal RTC de 32,768 kHz
- Conector de antena IPEX e rede de casamento de RF do módulo
- Suporte a telas MIPI DSI / RGB888 por conectores FPC dedicados
- Dois caminhos de tela QSPI / DSPI / SPI disponíveis nos conectores de expansão de 40 pinos
- Suporte a painel sensível ao toque I2C
- Entrada de microfone analógico integrada e saída de áudio estéreo Classe D
- Duas portas USB Type-C: uma para gravação e depuração via USB-UART, outra para USB 2.0 HS
- Slot MicroSD via SDIO
- Expansão GPIO dos núcleos de alto desempenho e de baixo consumo por dois conectores de expansão de 40 pinos
- Expansão para CAN e Wi-Fi via SDIO

## Quando usar esta placa { #when-to-use-this-board }

Escolha a SF32LB58-DevKit-LCD quando o projeto precisar de uma plataforma representativa para validar telas avançadas e periféricos, em vez de uma placa breakout mínima.

- Fazer o bring-up de telas MIPI DSI, RGB888 ou QSPI
- Validar em conjunto toque, áudio, armazenamento e USB
- Testar interfaces de usuário de alta resolução na plataforma SF32LB58x
- Avaliar a expansão CAN ou Wi-Fi via SDIO
- Comparar variantes de módulo com NOR e NAND
- Validar o firmware em uma placa de classe topo de linha antes de projetar uma PCB personalizada

Para planejar a integração no nível do módulo, consulte também [SF32LB58-MOD](../modules/SF32LB58-MOD.md). Para conhecer a arquitetura da família de chips e os recursos de tela e memória, consulte [SF32LB58x](../chips/SF32LB58x.md).

## Configuração de hardware { #hardware-configuration }

<div align="center"><em>Resumo da configuração de hardware</em></div>

<div align="center" markdown>

| Área | Configuração |
| :--- | :--- |
| Módulo principal | SF32LB58-MOD-N16R32N1 ou SF32LB58-MOD-A128R32N1 |
| MCU por revisão da placa | V1.0.1: SF32LB586VDD36; V1.0.0: divergência na fonte da SiFli (veja a nota de versão acima) |
| Memória no encapsulamento (V1.0.1) | 16 MB + 16 MB HPI-PSRAM e 1 MB QSPI-NOR |
| Armazenamento adicional | 16 MB QSPI-NOR ou 128 MB QSPI-NAND, conforme a variante do módulo |
| Tela | Suporte a painéis MIPI DSI, DPI/RGB888 e QSPI |
| Áudio | Caminho de microfone analógico integrado e saída estéreo para alto-falantes |
| USB | USB-UART Type-C e USB 2.0 HS Type-C |
| Canais USB-UART | O guia de modelos de placas da SiFli informa que o CH343K oferece dois canais de depuração USB-UART; o guia detalhado da placa não identifica qual canal corresponde a cada conector Type-C |
| Armazenamento | Slot MicroSD via SDIO |
| Antena | Caminho de RF do módulo com conector IPEX |
| Expansão | Dois conectores de expansão de 40 pinos para os núcleos de alto desempenho e de baixo consumo |
| Controles e pontos de teste | Dois botões de usuário (HOME/reset por pressão longa e função), botão RESET separado, jumper MODE e pontos de teste UART/USB/CAN |
| Conversão de alimentação | Conversores DC-DC na placa. O histórico SiFli da V1.0.1 registra a substituição de um conversor para reduzir a ondulação de saída, mas não informa o código do componente; confirme a revisão exata no esquemático/BOM. |
| Dimensões da placa / temperatura de operação | 65 × 50 mm / −40 a 85 °C |

</div>

## Primeiros passos { #getting-started }

### Hardware necessário { #required-hardware }

- Placa SF32LB58-DevKit-LCD
- Módulo de tela LCD com interface MIPI DSI, RGB888 ou QSPI, conforme a aplicação
- Cabo de dados USB 2.0, Type-A para Type-C ou equivalente
- Computador com Windows, Linux ou macOS

### Hardware opcional { #optional-hardware }

- Dois alto-falantes
- Cartão TF / MicroSD
- J-Link ou depurador SWD compatível
- Placa com transceptor CAN
- Módulo Wi-Fi SDIO

### Configuração básica { #basic-setup }

1. Conecte o painel de tela desejado ao conector LCD correspondente.
2. Conecte a porta USB-UART Type-C ao computador.
3. Abra a ferramenta de gravação da SiFli e selecione a porta COM correta.
4. Instale ou remova o jumper Mode conforme queira usar o modo de gravação ou o modo de execução normal.
5. Ligue a placa e grave ou execute o firmware desejado.
6. Depois do bring-up da tela, valide o toque, o áudio, o armazenamento e os periféricos de expansão necessários ao produto.

Use um cabo USB que suporte transferência de dados. Alguns cabos Type-C fornecem apenas alimentação e não disponibilizam os caminhos de dados UART ou USB.

## Alimentação { #power }

A SF32LB58-DevKit-LCD é alimentada por USB Type-C.

- As duas portas USB Type-C da placa podem alimentá-la.
- Para gravar o firmware e capturar logs UART, use a porta USB-UART Type-C.
- Ao validar funções USB nativas, planeje separadamente o uso da porta USB 2.0 HS Type-C.

## Gravação e depuração { #download-and-debug }

A principal interface para gravação de firmware e logs seriais é a porta USB-UART Type-C.

- **Modo de gravação**: instale o jumper Mode e ligue ou reinicie a placa.
- **Modo de depuração/log de software**: remova o jumper Mode e ligue ou reinicie a placa.

A placa também oferece depuração J-Link / SWD.

![Referência de ligação J-Link da SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — referência de ligação J-Link</em></div>

![Referência do adaptador J-Link](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>Referência do adaptador J-Link</em></div>

![Referência do adaptador SWD](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>Referência do adaptador SWD</em></div>

## Alvos de compilação do SDK { #sdk-build-targets }

A configuração de compilação do SiFli-SDK usa estes nomes exatos de alvo de placa. Use o nome correspondente com `scons --board=<board_name>`:

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

Esses nomes identificam alvos de compilação do SDK e não necessariamente correspondem ao nome do produto impresso na placa ou no módulo. O índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e o [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) do SDK podem listar conjuntos diferentes; confirme o alvo para a revisão do SDK em uso. Em particular, o índice e a configuração de compilação não descrevem todos os alvos da série 58 da mesma forma, e o atual [guia de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) não lista um SKU físico correspondente a `sf32lb58-lcd_n16r64n4`.

## Principais sinais do módulo e de expansão { #key-module-and-expansion-signals }

A placa disponibiliza sinais do módulo e dois conectores de expansão de 40 pinos. Para a pinagem completa, consulte o datasheet do módulo e o pacote de esquemáticos. A tabela abaixo resume os grupos de sinais mais relevantes para o projeto.

<div align="center"><em>Principais grupos de sinais funcionais</em></div>

<div align="center" markdown>

| Grupo de sinais | Pinos / sinais típicos | Uso principal |
| :--- | :--- | :--- |
| Gravação e depuração | PB36, PB37, SWDIO, SWCLK, Boot_Mode, RSTN | Gravação via UART, depuração de software e bring-up via SWD |
| MicroSD | PA75, PA76, PA77, PA70, PA81, PA79, PB58 | Interface de cartão SDIO e detecção do cartão |
| RGB LCDC1 | PA12–PA15, PA22–PA27, PA43–PA48, PA50, PA53–PA58, PA61–PA63, PA65, PA67 | Caminho de tela RGB888 |
| MIPI DSI LCDC1 | Pares diferenciais DSI_D0–DSI_D3 e DSI_CLK | Caminho de tela MIPI DSI; operação documentada com até duas vias de dados |
| QSPI LCDC1 | PA82, PA84, PA86, PA88, PA90, PA91, PA51, PA52 | Caminho de tela QSPI no lado do núcleo de alto desempenho |
| QSPI LCDC2 | PB02–PB04, PB06, PB08–PB10, PB23, PB27, PB30, PB31, PB34 | Caminho de tela QSPI no lado do núcleo de baixo consumo |
| Toque | PA16, PA17, PA59, PA60, PA92, PA93 | Reset, interrupção e sinais I2C do painel sensível ao toque |
| Áudio | AU_DAC1/2, AU_ADC1/2, MIC_BIAS, PB23 | Entrada/saída de áudio analógico e habilitação do amplificador de potência |
| CAN / expansão geral | PA02, PA11 e grupos GPIO dos conectores de expansão | Expansão CAN e de periféricos |

</div>

## Interfaces de tela { #display-interfaces }

A placa oferece três caminhos principais para telas:

- **MIPI DSI** por um conector FPC de 30 pinos com passo de 0,5 mm
- **RGB888** por um conector FPC de 40 pinos com passo de 0,5 mm, compatível com a pinagem RGB comum da ALIENTEK
- **QSPI / DSPI / SPI** pelos dois conectores de expansão de 40 pinos

De acordo com a documentação da SiFli, os limites de suporte para telas são:

- Painéis MIPI DSI com até 2 lanes e resolução de até 1280 × 800
- Painéis RGB888 com resolução de até 1280 × 800
- Painéis QSPI com resolução de até 512 × 512

!!! warning "Número de lanes MIPI DSI"
    A pinagem do conector de 30 pinos da placa lista D0–D3, mas o guia da placa e o SDK documentam operação com até duas vias de dados. Não conclua que há suporte a quatro vias apenas pelos nomes dos pinos do conector. Antes de usar, confirme a ligação das vias para o painel e a revisão exatos da placa.

![Referência de ligação de tela MIPI](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — referência de ligação de tela MIPI</em></div>

![Referência de ligação de tela QSPI LCDC1](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — ligação de tela QSPI LCDC1</em></div>

![Referência de ligação de tela QSPI LCDC2](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — ligação de tela QSPI LCDC2</em></div>

## Áudio { #audio }

A placa oferece:

- Um caminho de entrada para o microfone integrado
- Dois caminhos de entrada ADC de áudio; um deles compartilha o caminho com o microfone integrado, e a seleção entre esse microfone e a entrada do conector de 40 pinos é feita por resistores de configuração
- Duas saídas para alto-falantes
- Um caminho de sinal PDM multiplexado com os sinais RGB; portanto, ele não fica disponível enquanto a interface de tela RGB estiver ativa

A [documentação detalhada da placa](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html) da SiFli indica saída de áudio analógico estéreo de até 2,8 W/4 Ω, enquanto o [guia de modelos de placas de desenvolvimento](https://wiki.sifli.com/en/board/devkit_guide.html) informa 3 W/4 Ω para as duas saídas de alto-falante. Nenhuma das fontes esclarece se a potência se aplica a cada canal ou ao conjunto. Antes de escolher os alto-falantes, confira a revisão exata da placa, o esquemático e as condições de alimentação e carga do amplificador; não trate nenhum dos valores como potência garantida por canal.

![Referência de ligação de áudio](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — referência de ligação de áudio</em></div>

## Expansão CAN e Wi-Fi SDIO { #can-and-sdio-wi-fi-expansion }

O módulo SF32LB58 inclui um controlador CAN, e a placa disponibiliza a interface para uso com um transceptor CAN externo.

![Referência de ligação CAN](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — referência de ligação CAN</em></div>

![Placa de transceptor CAN de referência](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>Placa de transceptor CAN de referência</em></div>

A placa também oferece expansão Wi-Fi SDIO pelo conector de expansão.

![Módulo Wi-Fi SDIO de referência](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>Módulo Wi-Fi SDIO de referência</em></div>

![Referência de ligação Wi-Fi SDIO](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — referência de ligação Wi-Fi SDIO</em></div>

![Esquemático de referência Wi-Fi SDIO](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>Esquemático de referência Wi-Fi SDIO</em></div>

## Documentos relacionados { #related-documents }

[Apresentação do chip SF32LB58x]: ../chips/SF32LB58x.md
[Manual do usuário SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[Pacote de projeto SF32LB58-MOD]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[Pacote de projeto SF32LB58-DevKit-LCD]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[Projeto LCEDA SF32LB58-DevKit-LCD]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[Comprar amostras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Apresentação do chip SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manual do usuário SF32LB58x]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[Pacote de projeto SF32LB58-MOD]__
- :fontawesome-solid-download: __[Pacote de projeto SF32LB58-DevKit-LCD]__
- :fontawesome-solid-download: __[Projeto LCEDA SF32LB58-DevKit-LCD]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras]__

</div>
