---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD: placa de desenvolvimento SF32LB52x voltada a displays, para o bring-up rápido de produtos com displays SPI, QSPI e MCU/8080, com toque, áudio, armazenamento e suporte a bateria."
tags:
    - Hardware
    - Placa de desenvolvimento
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## Visão geral { #overview }

A SF32LB52-DevKit-LCD é uma placa de desenvolvimento para aplicações com display da família SF32LB52x. Baseada em um módulo SF32LB52x, ela permite desenvolver rapidamente produtos que usam interfaces de display SPI, DSPI, QSPI ou MCU/8080.

A placa reúne em uma única plataforma de avaliação o módulo MCU, conectores para display, interface de toque, entrada para microfone analógico, saída de áudio analógica, USB Type-C, depuração USB-UART, slot para cartão TF e conexão para bateria. É um ponto de partida prático para desenvolver interfaces homem-máquina (HMI) de relógios inteligentes, painéis compactos, periféricos com display e outras aplicações SF32LB52x que precisam de uma tela desde o início do desenvolvimento.

![Vista frontal da SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vista frontal</em></div>

![Vista traseira da SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vista traseira</em></div>

![Diagrama de blocos da SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — diagrama de blocos</em></div>

## Destaques da placa { #board-highlights }

- Plataforma de módulo SF32LB52x compatível com SF32LB52-MOD-1, SF32LB52-MOD-A e SF32LB52-MOD-B
- Suporte a LCD QSPI/SPI/DSPI por conector FPC de 22 pinos
- Suporte a LCD MCU/8080 de 8 bits pelo FPC e pelo conector de expansão de 40 pinos
- Suporte a painel de toque via I2C
- USB Type-C para gravação/depuração via USB-UART e alimentação da placa
- Interface USB Type-C separada para aplicações USB 2.0 FS
- Microfone MEMS integrado e amplificador de potência de áudio classe D
- Slot para cartão MicroSD via SPI
- Conector de bateria e carregador linear ETA9640P
- Conector de expansão de 40 pinos para sinais de display, GPIO, armazenamento, áudio e alimentação

## Quando usar esta placa { #when-to-use-this-board }

Escolha a SF32LB52-DevKit-LCD quando o projeto precisar de uma plataforma de display pronta para uso, em vez de uma placa de breakout mínima.

- Fazer o bring-up de painéis LCD QSPI, SPI, DSPI ou MCU/8080
- Validar a integração do painel de toque
- Testar o LVGL ou aplicações de interface gráfica personalizadas no SF32LB52x
- Avaliar a entrada do microfone e a saída para alto-falante
- Prototipar o armazenamento em cartão TF
- Comparar opções de módulo antes de definir uma PCB personalizada

Para uma placa menor com furos semicirculares metalizados nas bordas, use a [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para expor o maior número de pinos e acessar os sinais diretamente, use a [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuração de hardware { #hardware-configuration }

<div align="center"><em>Resumo da configuração de hardware</em></div>

<div align="center" markdown>

| Área | Configuração |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6; 16 MB QSPI-NOR + 8 MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6; 128 MB QSPI-NAND + 16 MB OPI-PSRAM |
| Fontes de clock | Cristal principal de 48 MHz e cristal RTC de 32,768 kHz no módulo |
| RF | Antena integrada à placa ou conector IPEX, selecionados por resistor de 0 Ω |
| Display | QSPI/SPI/DSPI e MCU/8080 de 8 bits |
| Toque | Interface de toque I2C |
| Áudio | Entrada de microfone MEMS e amplificador de alto-falante classe D |
| Armazenamento | Slot para cartão MicroSD via SPI |
| USB | USB-UART Type-C e USB 2.0 FS Type-C |
| Bateria | Conector para bateria Li-ion/Li-poly de uma célula |
| Carregador | Carregador linear ETA9640P, corrente de carga padrão de 450 mA |

</div>

Os códigos e as configurações de memória acima seguem o [guia de modelos de placas de desenvolvimento da SiFli](https://wiki.sifli.com/en/board/devkit_guide.html). Antes de usar uma placa como referência de projeto, confira a revisão pela identificação da placa e pelo pacote de projeto correspondente.

As fontes oficiais usam denominações diferentes para a memória Flash do A128R16: o [guia de modelos de módulos da OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) identifica o módulo como SPI-NAND de 128 MB, enquanto o guia de modelos de placas indica QSPI-NAND de 128 MB para o SKU DevKit correspondente. As fontes não esclarecem se a diferença se refere ao componente instalado ou à denominação da interface. Antes de confiar nessa configuração, confirme o componente Flash e o modo de barramento no esquemático e na BOM da revisão exata da placa.

## Notas de versão { #version-notes }

<div align="center"><em>Histórico de versões da placa</em></div>

<div align="center" markdown>

| Versão | Módulo de referência | Alterações |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | Detecção do cartão SD atualizada para PA26. O guia atual da SiFli lista as duas configurações MOD-1 mostradas acima. |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | Atualizações no circuito do carregador, comutação da alimentação, ganho do amplificador de áudio, comportamento do reset, circuito do LED RGB, compatibilidade dos pinos do módulo, filtragem da alimentação de RF, suporte a duas memórias Flash, detecção do cartão SD, Wi-Fi SDIO opcional, área de exclusão da antena e proteção de VBUS |
| V1.0.0 | Módulo SF32LB52 anterior | Primeira versão pública da placa |

</div>

Antes de usar o mapa de pinos no projeto de uma placa portadora ou de um dispositivo de teste para produção, confira a revisão exata da placa na serigrafia e no pacote de projeto.

![Vista frontal anotada da SF32LB52-DevKit-LCD](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vista frontal anotada</em></div>

![Vista traseira anotada da SF32LB52-DevKit-LCD](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vista traseira anotada</em></div>

## Primeiros passos { #getting-started }

### Hardware necessário { #required-hardware }

- Placa SF32LB52-DevKit-LCD
- Módulo LCD compatível com a interface escolhida
- Cabo USB 2.0 para dados, Type-A para Type-C ou equivalente
- Computador host com Windows, Linux ou macOS

### Hardware opcional { #optional-hardware }

- Alto-falante
- Cartão TF
- Bateria Li-ion/Li-poly de uma célula, normalmente de 450 mAh a 500 mAh
- Segundo cabo USB quando for necessário depurar via UART e testar o USB nativo ao mesmo tempo

### Configuração básica { #basic-setup }

1. Conecte o módulo LCD ao conector LCD apropriado.
2. Conecte a porta USB-UART Type-C ao computador host.
3. Abra o SifliTrace ou a ferramenta de gravação de firmware da SiFli.
4. Selecione a porta serial detectada.
5. Ligue a placa e grave ou execute o firmware de destino.
6. Quando o display acender, verifique as funções de toque, gráficos, armazenamento e áudio necessárias para a aplicação.

Use um cabo USB que realmente permita a transferência de dados. Um cabo apenas para carregamento pode alimentar a placa, mas não disponibiliza a interface serial nem a interface de dados USB.

## Alimentação { #power }

A SF32LB52-DevKit-LCD pode ser alimentada principalmente de duas formas:

- Pelo USB Type-C, conectado a qualquer uma das portas USB
- Por bateria, usando o conector integrado na placa

Para gravar o firmware e depurar durante o desenvolvimento, use a porta USB-UART Type-C. A alimentação por bateria é útil para testar o display, o áudio e o comportamento de baixo consumo sem manter a placa conectada por cabo.

A placa integra um carregador linear ETA9640P. A corrente máxima de carga suportada é de 1 A, e o ajuste padrão de corrente constante é de 450 mA. Use uma bateria Li-ion ou Li-poly de uma célula e confira a polaridade indicada na serigrafia antes de conectá-la.

## Gravação e depuração { #download-and-debug }

A porta USB-UART é a interface principal para gravar o firmware e acessar os logs.

- **Modo de gravação**: habilite a opção BOOT na ferramenta de gravação e, em seguida, ligue ou reinicie a placa.
- **Modo de depuração/log**: desabilite a opção BOOT e ligue ou reinicie a placa para iniciar a operação normal com logs pela serial.

Algumas placas SF32LB52x usam o sinal RTS do conversor USB-UART para reset. Se a placa reiniciar inesperadamente quando a porta serial for aberta pela primeira vez, desabilite o controle de fluxo por modem ou por hardware nas configurações da porta serial do computador host.

![Desabilitar o controle de fluxo por modem nas configurações avançadas da porta serial](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Desativação do controle de fluxo por modem nas configurações da porta serial</em></div>

## Interface de LCD e toque { #lcd-and-touch-interface }

A placa aceita painéis LCD QSPI por meio de um conector FPC vertical de 22 pinos, com passo de 0,5 mm e trava basculante. Se o painel tiver outra ordem de pinos, use uma placa adaptadora antes de conectá-lo.

Os recursos de LCD e toque incluem:

- Sinais LCD SPI, DSPI e QSPI
- Sinais LCD QSPI no modo DDR
- Sinais LCD MCU/8080 de 8 bits
- Reset do LCD, seleção de chip, clock, dados, TE e PWM da retroiluminação
- SDA/SCL I2C do painel de toque, interrupção e reset

A documentação original da placa da SiFli lista `TFT-H043A28WQISTKN22_V0-3` como um modelo de display compatível.

### Mapa de sinais do FPC QSPI de 22 pinos { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>Mapa de sinais do FPC QSPI de 22 pinos</em></div>

<div align="center" markdown>

| Pino | Sinal | Função |
| :--- | :--- | :--- |
| 1 | LEDK | Cátodo da retroiluminação do LCD |
| 2 | LEDA | Ânodo da retroiluminação do LCD |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | Reset do LCD |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Saída de 3,3 V |
| 18 | PA31 | Interrupção do toque |
| 19 | PA33 | SDA I2C do toque |
| 20 | PA30 | SCL I2C do toque |
| 21 | PA09 | Reset do toque |
| 22 | GND | Terra |

</div>

**Divergência no número de pinos — confirme antes de conectar o display:** A SiFli identifica o conector e a tabela de sinais como tendo 22 pinos, mas o desenho correspondente numera os contatos de 1 a 24 e marca GND nos pinos 22–24. A fonte não explica essa diferença. Antes de selecionar ou conectar um cabo flexível, confira o conector físico e o esquemático da revisão exata; não presuma que um cabo de 22 pinos seja compatível com um conector de 24 posições.

## Atribuição dos principais pinos do módulo { #key-module-pin-assignments }

![Definição do conector de 40 pinos da SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>Definição do conector de 40 pinos</em></div>

<div align="center"><em>Atribuição dos principais pinos do módulo</em></div>

<div align="center" markdown>

| Pino do módulo | Sinal | Função na placa |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | Detecção de conexão do carregador |
| PA43..PA37 | DB7..DB2 | Dados LCD MCU/8080 |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | Dados do LCD |
| PA06 | DC / QSPI D1 | Dados/comando do LCD |
| PA05 | RD / QSPI D0 | Dados do LCD |
| PA04 | WR / QSPI CLK | Clock do LCD |
| PA03 | CS / QSPI CS | Seleção de chip do LCD |
| PA02 | TE / QSPI TE | Sinal de sincronização TE (Tearing Effect) do LCD |
| PA01 | BL_PWM | Controle da retroiluminação |
| PA00 | RSTB | Reset do LCD |
| PA33 / PA30 | I2C SDA / SCL | Painel de toque |
| PA31 / PA09 | Toque INT / RST | Painel de toque |
| PA24, PA25, PA28, PA29 | SPI1 | Interface do cartão TF |
| PA26 | Detecção de cartão / LED | Função compartilhada |
| PA20 / PA27 | UART RX/TX | UART do usuário |
| PA18 / PA19 | UART de depuração RX/TX | Gravação e depuração de software |
| PA10 | AU_PA_EN | Habilitação do amplificador de áudio |
| MIC_ADC_IN / MIC_BIAS | Microfone analógico | Entrada do microfone |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Áudio analógico | Entrada do amplificador de alto-falante |

</div>

## Compatibilidade dos módulos { #module-compatibility-notes }

- No SF32LB52-MOD-1, o pino 17 é uma saída de 3,3 V desabilitada por padrão e precisa ser habilitada por software.
- Nos SF32LB52-MOD-A/B, o pino 17 é uma entrada de alimentação de 3,3 V.
- No SF32LB52-MOD-1, o pino 27 é uma entrada VBAT de 3,2 V a 4,7 V.
- Nos SF32LB52-MOD-A/B, o pino 27 é uma entrada de alimentação de 3,3 V.
- No SF32LB52-MOD-1, os limiares de ativação e desligamento da alimentação VBAT são 3,58 V e 3,48 V, respectivamente. Para testes sem bateria, recomenda-se fornecer 3,8 V a VBAT.
- PA21 no pino 62 do módulo só está disponível nos SF32LB52-MOD-A/B; esse pino não é conectado no SF32LB52-MOD-1.
- Os pinos 62 a 68 do módulo podem estar conectados internamente à Flash NOR por padrão. Para usar SDIO externamente, escolha uma variante de módulo sem Flash interna nesses pinos.

## Áudio { #audio }

A placa inclui um microfone MEMS e um amplificador de potência de áudio.

- Use o caminho do microfone integrado para validar a entrada de áudio analógico.
- Use o conector de alto-falante para testar a saída de áudio.
- Segundo a documentação original da placa, a saída para alto-falante externo suporta até 3 W em 4 Ω.

## Armazenamento { #storage }

O soquete MicroSD é conectado via SPI. Ele é adequado para validar sistemas de arquivos, recursos de imagem, logs e gravação de dados antes de migrar para uma placa própria.

## Alvos de compilação do SDK { #sdk-build-targets }

Ao compilar com o SiFli-SDK, use `scons --board=<board_name>` com um destes nomes exatos de alvo:

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

Esses nomes identificam alvos de compilação do SDK e não necessariamente correspondem ao nome do produto impresso na placa ou no módulo. O índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e o [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) do SDK podem listar conjuntos diferentes; confirme o alvo para a revisão do SDK em uso.

## Documentos relacionados { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Apresentação do chip SF32LB52x][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware SF32LB52x][SF32LB52x Hardware Design Guide]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[Artigo original da Wiki da SiFli][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Pacote de projeto][Design Package]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__

</div>
