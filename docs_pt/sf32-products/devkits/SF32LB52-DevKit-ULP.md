---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: placa SF32LB52x para prototipagem de dispositivos vestíveis, com AMOLED, touch, sensores, áudio, carregamento de bateria e medição de corrente para avaliação do consumo do sistema."
tags:
    - Hardware
    - Placa de desenvolvimento
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## Visão geral { #overview }

A SF32LB52-DevKit-ULP também é conhecida como **立创黄山派**, **LCKFB-HSPI-SF32LB52-ULP** e **SF32LB52-ULP**. É uma placa compacta de desenvolvimento para dispositivos vestíveis de consumo ultrabaixo, baseada na família SF32LB52x e voltada à prototipagem de relógios inteligentes e pulseiras de atividade, não apenas à exposição dos pinos do MCU.

Em comparação com as placas LCD, Nano e Core-3p3, esta placa se aproxima mais de um produto final: reúne um módulo SF32LB52, display AMOLED sensível ao toque, microfone, amplificador de áudio, LED RGB, acionamento de motor vibratório, sensores de movimento, magnético e de luz ambiente, circuito de carga da bateria e jumpers para medição de corrente. Assim, ela é especialmente útil quando a questão não é apenas “o MCU funciona?”, mas também “como o sistema vestível completo se comporta quando alimentado por bateria?”.

O [guia da placa ULP][Artigo original da Wiki da SiFli] continua sendo uma página provisória. A fonte primária para a configuração detalhada é o [guia oficial chinês da placa Huangshan Pi][Guia SiFli Huangshan Pi], que documenta a versão V1.0.0 e serve aqui como referência para essa revisão. A [wiki de hardware da LCKFB][Wiki de hardware da LCKFB] não identifica a revisão e apresenta vários códigos de componentes diferentes. Trate essas diferenças como uma possível divergência de revisão ou de fonte, não como componentes intercambiáveis, e confira as marcações, o esquemático e a BOM da placa antes do trabalho de projeto.

**Nota sobre o status de publicação:** O guia SiFli V1.0.0 informa que a placa documentada era então destinada a testes internos e seria modificada antes da publicação externa. Essa afirmação se limita à revisão dessa fonte; não estabelece o status nem a BOM de placas posteriores. Confira a revisão exata da placa e sua BOM.

A [página de placas do SDK SiFli][Página SiFli SDK da placa ULP] identifica o alvo de compilação desta placa como `sf32lb52-lchspi-ulp`. Essa página e a seção de conteúdo do kit no guia chinês Huangshan Pi usam `SF32LB52X-MOD-1-N16R8`; o [guia SiFli de modelos de módulos][Guia SiFli de modelos de módulos] e o título da tabela GPIO usam `SF32LB52-MOD-1-N16R8`. As fontes não explicam a diferença do `X`. O alvo do SDK está confirmado; confira a identificação impressa no módulo instalado e a BOM, sem concluir que as duas grafias indicam hardwares diferentes.

![Configuração de referência do SF32LB52-ULP para um dispositivo vestível](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — configuração de referência para um dispositivo vestível</em></div>

![Diagrama de blocos da Huangshan Pi SF32LB52](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>Huangshan Pi SF32LB52 — diagrama de blocos</em></div>

## Nomenclatura { #naming }

<div align="center"><em>Nomes alternativos da placa</em></div>

<div align="center" markdown>

| Nome | Uso |
| :--- | :--- |
| SF32LB52-DevKit-ULP | Nome da família de placas SiFli/OpenSiFli |
| SF32LB52-ULP | Nome curto de hardware/produto |
| LCKFB-HSPI-SF32LB52-ULP | Nome de projeto/pedido da LCKFB |
| 立创黄山派 / 立创・黄山派 SF32LB52 | Nome do produto e da documentação em chinês |

</div>

Use esses nomes como aliases da mesma família ao procurar documentação de hardware, exemplos, páginas de compra ou informações da comunidade. Antes de trabalhar com esquemáticos, pinagem ou BOM, confirme a revisão exata da placa e a documentação correspondente do fornecedor.

## Destaques da placa { #board-highlights }

- Módulo SF32LB52-MOD-1-N16R8 baseado em SF32LB52x
- Configuração padrão do módulo SF32LB525UC6
- OPI-PSRAM de 8 MB, interface de 144 MHz
- Flash QSPI-NOR de 128 Mb, modo STR a 72 MHz
- Cristal principal de 48 MHz e cristal RTC de 32,768 kHz
- Antena PCBA integrada à placa
- Display AMOLED de 1,85 polegadas, resolução de 390 × 450
- Interface de display Quad-SPI com suporte a touch
- Microfone MEMS integrado
- Saída de áudio analógico com amplificador de alto-falante classe D
- Conector para alto-falantes externos de 3 W / 4 Ω ou 2 W / 8 Ω
- Interface UART USB Type-C via CH340N para gravação, depuração e alimentação
- Sinais USB 2.0 FS disponíveis no conector de expansão de 30 pinos
- Slot para cartão MicroSD via SPI
- Um botão de função e um botão de alimentação/reset
- LED RGB SK6812MINI-HS (guia SiFli V1.0.0; a página da LCKFB, sem revisão identificada, informa WS2812B-2020)
- Circuito de acionamento do motor vibratório com pads de solda para conexão de um motor externo
- IMU de 6 eixos LSM6DS3TR-C
- Sensor magnético de 3 eixos MMC5603NJ
- Sensor de luz ambiente LTR-303ALS-01
- Carregador de bateria e componentes de gerenciamento de energia para testes de consumo em dispositivos vestíveis
- Conector de expansão de 2 × 15 pinos, passo de 1,27 mm, com GPIO e suporte à medição de corrente

## Quando usar esta placa { #when-to-use-this-board }

Escolha a SF32LB52-DevKit-ULP / 立创黄山派 quando o objetivo for validar o sistema vestível completo.

- Desenvolver protótipos de relógios, pulseiras e dispositivos vestíveis com vários sensores
- Avaliar o comportamento da interface AMOLED na plataforma SF32LB52x
- Testar em conjunto touch, sensores de movimento, magnéticos e de luz ambiente, áudio, vibração e LED RGB
- Medir os caminhos de corrente da bateria, do sistema e de 3,3 V em repouso e durante a operação ativa
- Validar sequências de despertar acionadas por botões, sensores, touch ou temporizadores do firmware
- Comparar o consumo de um sistema próximo ao produto final com as estimativas iniciais feitas em placas DevKit mais simples

Para uma placa de avaliação geral com foco em display, use a [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md). Para protótipos compactos com módulo soldado à placa, use a [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para ter acesso direto ao maior número de pinos durante o bring-up inicial na bancada, use a [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuração de hardware { #hardware-configuration }

<div align="center"><em>Resumo da configuração de hardware</em></div>

<div align="center" markdown>

| Área | Configuração |
| :--- | :--- |
| Módulo principal | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | OPI-PSRAM de 8 MB, interface de 144 MHz |
| Flash | QSPI-NOR Flash de 128 Mb, modo STR a 72 MHz |
| Display | AMOLED de 1,85 polegadas (ZC-A1D85W-010), 390 × 450, brilho de 800 cd/m², Quad-SPI |
| Driver do display | CO5300AF-01 |
| CI de alimentação do display | BV6802W |
| Controlador touch | FT6146-M00 |
| Microfone | Microfone MEMS integrado |
| Saída de áudio | Amplificador classe D, conector externo GH-1,25 mm para alto-falante |
| Armazenamento | Cartão MicroSD via SPI |
| Sensor de movimento | IMU de 6 eixos LSM6DS3TR-C |
| Sensor magnético | Magnetômetro de 3 eixos MMC5603NJ |
| Sensor de luz ambiente | LTR-303ALS-01 |
| USB-UART | CH340N via USB Type-C |
| Bateria | Bateria Li-ion externa pelo conector GH1,25 mm |
| Carregador | SY6103, tensão máxima de carga de 4,5 V; corrente constante padrão de 450 mA; corrente máxima de carga de 500 mA |
| Proteção/energia | OVP SY5320, chave de carga LP5240HVF, LDO ETA5055V330DS2F |

</div>

**Os códigos dos componentes variam entre fontes ou revisões; confirme antes de projetar.** O guia SiFli V1.0.0 da [placa Huangshan Pi][Guia SiFli Huangshan Pi] identifica o carregador SY6103, o OVP SY5320 e o LED RGB SK6812MINI-HS. A [wiki de hardware da LCKFB][Wiki de hardware da LCKFB], sem revisão identificada, cita o OVP LP5305AQVF e o LED RGB WS2812B-2020; para o carregador, informa AW32001ECSR na lista de características e AW23001ECSR na seção sobre carga. As fontes não permitem determinar se as diferenças decorrem de outra revisão ou de documentação desatualizada. Use os valores SiFli V1.0.0 apenas para essa referência documentada; antes de usar especificações próprias de um componente, confira as marcações, o esquemático e a BOM da unidade.

## Conteúdo do kit { #package-contents }

A documentação do kit Huangshan Pi indica que ele inclui:

- Placa principal
- Placa do display
- Bateria
- Alto-falante

Antes de preparar o ambiente de testes, confirme o conteúdo do kit adquirido, pois os acessórios podem variar conforme o vendedor ou o lote de produção.

## Alimentação e bateria { #power-and-battery }

A placa oferece dois modos principais de alimentação:

- Alimentação via USB Type-C
- Alimentação independente por bateria

A entrada de bateria foi projetada para uma bateria Li-ion de uma célula, conectada por um conector GH de 1,25 mm com ordem de pinos direta. A configuração de carga documentada aceita corrente máxima de 500 mA, com corrente constante padrão de 450 mA.

Ao usar a placa sem bateria e alimentar VBAT por uma fonte de bancada, a faixa de entrada VBAT documentada é de 3,7 V a 4,7 V; para testes com tensão de alimentação normal, recomenda-se 3,8 V. Os limiares documentados do SF32LB52-MOD-1-N16R8 são 3,58 V para ligar e 3,48 V para desligar.

A documentação de hardware da LCKFB alerta que a função de pressionamento prolongado pode não funcionar quando a bateria está desconectada. Verifique esse comportamento na revisão específica da placa e na configuração de alimentação prevista.

## Jumpers de medição de corrente { #power-measurement-jumpers }

Há jumpers para medir a corrente nos principais caminhos de alimentação da placa.

<div align="center"><em>Atribuição dos jumpers de medição de corrente</em></div>

<div align="center" markdown>

| Pinos | Caminho | Finalidade |
| :--- | :--- | :--- |
| 5-6 | Caminho VBAT | Inserir um amperímetro entre a bateria/carregador e o restante do sistema |
| 7-8 | Caminho VSYS | Inserir um amperímetro no caminho VSYS |
| 11-12 | Caminho VCC_3V3 | Inserir um amperímetro no barramento principal de 3,3 V |

</div>

Para a operação normal, os pinos 5-6, 7-8 e 11-12 devem permanecer em curto por meio dos jumpers. Remova o jumper correspondente somente ao inserir um amperímetro ou analisador de potência.

## Gravação e depuração { #download-and-debug }

Durante o desenvolvimento, use a interface UART USB Type-C para gravar o firmware, consultar os logs seriais e alimentar a placa.

Hardware necessário para o bring-up inicial:

- Placa SF32LB52-DevKit-ULP / 立创黄山派
- Cabo USB 2.0 com suporte a dados
- Computador host com Windows, Linux ou macOS

Hardware opcional:

- Alto-falante externo
- Cartão TF
- Bateria Li-ion de 450 mAh ou maior
- Segundo cabo USB para usar a depuração UART e testar o USB nativo simultaneamente

Use um cabo USB que realmente suporte transferência de dados. Cabos apenas para carga podem alimentar a placa, mas não disponibilizam a interface serial de dados.

## Alvos de compilação do SDK { #sdk-build-targets }

O nome exato do alvo de placa no SiFli-SDK é `sf32lb52-lchspi-ulp`; use esse nome no comando `scons --board=<board_name>`. Ele é um identificador de alvo de compilação do SDK, não necessariamente o nome do produto impresso na placa ou no módulo. Confira o alvo para a revisão do SDK em uso no índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e no [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml).

## Atribuição dos sinais principais { #key-signal-assignments }

<div align="center"><em>Atribuição dos sinais principais</em></div>

<div align="center" markdown>

| Sinal | Função |
| :--- | :--- |
| PA44 | VBUS_DET, detecção da conexão do carregador |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | Interrupção do touch |
| PA40 / PA39 | SCL / SDA do sensor I2C1, conforme a tabela de atribuição GPIO; veja abaixo a divergência referente ao pino do conector |
| PA38 | Controle da chave de VSYS para VSYS_1 |
| PA37 / PA33 | SCL / SDA do I2C do touch |
| PA36 / PA35 | USB DM / DP |
| PA34 | Botão HOME e reset após pressionamento longo de 10 s |
| PA32 | Dados do LED RGB |
| PA31 | Interrupção do sensor 1 |
| PA30 | Controle da chave de VSYS_1 para HR3V3 |
| PA27 | Detecção do cartão SD |
| PA24, PA25, PA28, PA29 | Interface MicroSD SPI1 |
| PA20 | PWM do motor vibratório |
| PA19 / PA18 | UART de depuração TXD / RXD |
| PA11 / PA10 | SDA / SCL do carregador I2C0 |
| MIC_BIAS / MIC_ADC_IN | Polarização e entrada do microfone |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Saída de áudio analógico |
| PA08..PA03, PA02, PA01, PA00 | Display QSPI, TE, PWM da retroiluminação e reset |
| PA15..PA12, PA16, PA17 | Sinais MPI2 / SD1, usados internamente pela Flash do módulo N16R8 |

</div>

## Conector de expansão de 30 pinos { #30-pin-expansion-header }

O conector de 30 pinos disponibiliza sinais de alimentação, USB, sensores, display, armazenamento, vibração, depuração, botões e controle do carregador.

<div align="center"><em>Mapa de sinais do conector de expansão de 30 pinos</em></div>

<div align="center" markdown>

| Grupo de pinos | Sinais | Observações |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | 5 V da USB quando conectada; pode receber 5 V quando a USB não estiver conectada |
| 3-4 | GND | Terra |
| 5-6 | VBAT_S / VBAT | Em curto na operação normal; aberto para medir a corrente de VBAT |
| 7-8 | VSYS_S / VSYS | Em curto na operação normal; aberto para medir a corrente de VSYS |
| 9-10 | GND | Terra |
| 11-12 | VCC_3V3_S / VCC_3V3 | Em curto na operação normal; aberto para medir a corrente de 3,3 V |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | A tabela SiFli V1.0.0 do conector indica SDA / SCL do sensor I2C1; o pino 14 diverge da tabela GPIO (veja abaixo) |
| 17 | PA32 | Dados do LED RGB; também pode ser usado como GPIO |
| 18 | PA30 | Controle da alimentação dos sensores; o uso como GPIO pode afetar PA39/PA40 |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | Pinos relacionados à SPI1/cartão SD; o uso na expansão conflita com o cartão TF integrado |
| 24 | PA20 | PWM de vibração; o uso na expansão conflita com o acionamento do motor |
| 25 / 27 | PA19 / PA18 | UART de depuração TXD / RXD |
| 26 / 28 | PA34 / PA43 | Botões de alimentação/reset e de função |
| 29 / 30 | PA11 / PA10 | SDA / SCL do carregador I2C0 |

</div>

**Divergência na pinagem — confirme antes de conectar:** Na tabela GPIO SiFli V1.0.0, o SDA do sensor I2C1 corresponde a PA39; na tabela do conector de 30 pinos, o pino 14 aparece como PB39/I2C1_SDA e o pino 16 como PA40/I2C1_SCL. A documentação da LCKFB também apresenta a diferença entre PA39 e PB39, sem identificar a revisão da placa nem conciliar as entradas. O pad do MCU e a trilha ligados ao pino 14 não estão confirmados. Antes de conectar um periférico, consulte o esquemático/BOM da unidade e verifique a continuidade; não presuma que PA39 e PB39 sejam intercambiáveis.

## Interface de display e touch { #display-and-touch-interface }

A placa usa um display AMOLED e disponibiliza um conjunto de sinais QSPI em um FPC de 22 pinos. A tabela SiFli V1.0.0 marca os pinos 5-10 como NC; a tabela abaixo inclui as 22 posições e identifica explicitamente esses pinos sem conexão.

<div align="center"><em>Mapa dos sinais do FPC QSPI de 22 pinos para display e touch</em></div>

<div align="center" markdown>

| Pino | Sinal | Função |
| :--- | :--- | :--- |
| 1 | VBAT | Saída VBAT no lado do display |
| 2 | PA01 | PWM da retroiluminação para uso com tela TFT |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | Sem conexão |
| 6 | NC | Sem conexão |
| 7 | NC | Sem conexão |
| 8 | NC | Sem conexão |
| 9 | NC | Sem conexão |
| 10 | NC | Sem conexão |
| 11 | PA02 | TE do QSPI |
| 12 | PA00 | Reset do LCD |
| 13 | PA04 | Clock QSPI/SPI |
| 14 | PB05 (tabela FPC SiFli V1.0.0) | QSPI D0 / SPI SDI; a tabela GPIO separada indica PA05 |
| 15 | PA03 | Chip select QSPI/SPI |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Saída de 3,3 V |
| 18 | PA41 | Interrupção do touch |
| 19 | PA33 | SDA do I2C do touch |
| 20 | PA37 | SCL do I2C do touch |
| 21 | PA09 | Reset do touch |
| 22 | GND | Terra |

</div>

**Divergência no pinout — verifique antes de conectar o display:** A tabela FPC de 22 pinos da SiFli V1.0.0 atribui PB05 ao pino 14 para QSPI D0, enquanto a tabela GPIO separada informa PA05. A tabela FPC da LCKFB também indica PB05, enquanto a tabela GPIO indica PA05; nenhuma fonte explica a relação entre a identificação do pad do módulo e a do contato FPC. O roteamento elétrico continua sem confirmação: verifique o esquemático/BOM da revisão correspondente e meça a continuidade; não presuma que PA05 e PB05 sejam intercambiáveis.

## Orientações para medição de corrente { #power-measurement-guidance }

Para obter medições úteis de consumo ultrabaixo:

- Meça VBAT, VSYS e VCC_3V3 separadamente sempre que possível.
- Mantenha o jumper correspondente fechado em todo barramento que não estiver sendo medido.
- Antes de medir a corrente em repouso, desative as cargas evitáveis, como efeitos do LED RGB, logs de depuração, atualização do display e consultas periódicas aos sensores.
- Em cada medição, registre a revisão da placa, o commit do firmware, a tensão da bateria ou da fonte, a configuração dos jumpers e o estado dos sensores.
- Meça tanto a corrente estável em repouso quanto a corrente durante eventos de touch, interrupções de sensores, atividade Bluetooth, ativação do display e vibração.

## Documentos relacionados { #related-documents }

[Apresentação do chip SF32LB52x]: ../chips/SF32LB52x.md
[Guia de projeto de hardware SF32LB52x]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Artigo original da Wiki da SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[Guia SiFli Huangshan Pi]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[Página SiFli SDK da placa ULP]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[Guia SiFli de modelos de módulos]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Página do projeto LCKFB]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[Wiki de hardware da LCKFB]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[Comprar amostras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Apresentação do chip SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware SF32LB52x]__
- :fontawesome-brands-github: __[Artigo original da Wiki da SiFli]__
- :fontawesome-solid-up-right-from-square: __[Página do projeto LCKFB]__
- :fontawesome-solid-book: __[Wiki de hardware da LCKFB]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras]__

</div>
