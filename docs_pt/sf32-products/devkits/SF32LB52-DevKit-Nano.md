---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano: placa de desenvolvimento SF32LB52x compacta, com furos semicirculares metalizados nas bordas, para protótipos próximos ao produto final, bring-up de pequenos displays e avaliação com a placa soldada."
tags:
    - Hardware
    - Placa de desenvolvimento
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## Visão geral { #overview }

A SF32LB52-DevKit-Nano é uma placa de desenvolvimento SF32LB52x compacta, indicada para protótipos pequenos e avaliação de sistemas embarcados. As bordas têm furos semicirculares metalizados (castellated holes), permitindo usar a placa de forma independente ou soldá-la a uma placa portadora nos primeiros protótipos do produto.

A placa mede 51 mm × 20,32 mm e disponibiliza os principais recursos do SF32LB52x para desenvolvimento com GPIO, UART, I2C, SPI, LCD, I2S, GPADC, PWM, USB e áudio analógico.

![Vista frontal da SF32LB52-DevKit-Nano](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — vista frontal</em></div>

![Vista traseira da SF32LB52-DevKit-Nano](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — vista traseira</em></div>

## Variantes da placa { #board-variants }

<div align="center"><em>Variantes da SF32LB52-DevKit-Nano</em></div>

<div align="center" markdown>

| Variante | MCU | Memória integrada ao encapsulamento | Flash externa |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB SPI NOR Flash | Nenhuma |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB QSPI-NOR Flash |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 128 MB QSPI-NAND Flash |

</div>

A variante N4 é adequada para controle compacto, Bluetooth e interfaces de usuário simples. A N16R16 combina 16 MB de OPI-PSRAM com 16 MB de QSPI-NOR; a A128R16 combina 16 MB de OPI-PSRAM com 128 MB de QSPI-NAND. Ambas atendem a aplicações que precisam de recursos gráficos maiores, sistemas de arquivos externos ou buffers de quadro e memória de trabalho na PSRAM.

**Divergência entre fontes — confirme antes de selecionar:** O [guia detalhado da placa Nano](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html) chama sua configuração com 16 MB de OPI-PSRAM e 16 MB de NOR de `R16N16 V1.0.0`. O [guia atual de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) identifica essa mesma configuração como `N16R16` e lista separadamente a `A128R16`, com 16 MB de OPI-PSRAM e 128 MB de QSPI-NAND. O guia detalhado não descreve a A128R16; para esse SKU, use as informações do guia de modelos e não extrapole outras características da N16R16. Antes de escolher o firmware ou o layout de armazenamento, confira a identificação da placa e o esquemático/BOM atual.

As fontes da SiFli também apresentam uma pequena diferença nas dimensões da placa Nano: o guia detalhado informa 21 × 51 mm, enquanto o guia de modelos especifica 51 × 20,32 mm. O lado de 51 mm coincide, mas a medida do lado menor difere em 0,68 mm. Esta página usa o valor mais preciso do guia de modelos; antes de projetar um gabinete ou uma placa portadora, confira o desenho mecânico da revisão correspondente.

## Destaques da placa { #board-highlights }

- Placa compacta de 51 mm × 20,32 mm
- Furos semicirculares metalizados nas bordas para soldar a placa a um protótipo
- Alimentação USB Type-C e gravação/depuração via USB-UART por meio do CH340N
- Pinos GPIO, UART, I2C, SPI, GPADC, PWM, I2S, PDM e com capacidade de despertar o sistema
- Suporte a LCD QSPI por FPC de 16 pinos, normalmente com cabo adaptador de 22 para 16 pinos
- Suporte a painel de toque I2C
- Entrada para microfone analógico e saídas de áudio diferenciais
- Sinais USB 2.0 FS disponíveis nos pinos de borda
- Dois LEDs de usuário
- Botão de alimentação e botão de função

## Quando usar esta placa { #when-to-use-this-board }

Escolha a SF32LB52-DevKit-Nano quando o protótipo precisar manter dimensões e montagem próximas às do produto final.

- Desenvolver protótipos compactos com Bluetooth e display
- Soldar a placa em uma PCB portadora
- Testar uma distribuição de pinos próxima à do produto antes de projetar uma placa personalizada
- Comparar a variante com apenas Flash NOR às variantes com PSRAM e Flash QSPI-NOR ou QSPI-NAND
- Fazer o bring-up de LCD, áudio, sensores e USB em uma placa compacta

Para facilitar as conexões na bancada e ter acesso a mais sinais, use a [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md). Para uma placa com mais recursos de display, carregador, cartão TF, microfone e amplificador de alto-falante, use a [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentação { #power }

A placa oferece três opções de alimentação:

- USB Type-C, recomendado durante o desenvolvimento
- Entrada de 3,3 V pelos pads de 3,3 V e GND nas bordas semicirculares metalizadas quando o USB não estiver conectado
- Entrada de 5 V pelos pads de 5 V e GND nas bordas semicirculares metalizadas quando o USB não estiver conectado

Com o USB Type-C conectado, alguns pinos de 3,3 V e 5 V podem ser usados como saídas. Confirme a direção da alimentação antes de conectar circuitos externos.

A placa inclui uma chave de alimentação controlada pelo sinal RTS# do CH340N, permitindo que as ferramentas controlem o comportamento de reset.

## Gravação e depuração { #download-and-debug }

Use a interface UART USB Type-C para gravar o firmware e consultar os logs seriais.

- **Modo de gravação**: habilite BOOT na ferramenta de gravação e, em seguida, ligue ou reinicie a placa.
- **Modo de depuração/log**: desabilite BOOT e, em seguida, ligue ou reinicie a placa.
- **Reset via RTS**: se a placa reiniciar ou desligar inesperadamente ao abrir a porta serial, desative o controle de fluxo por modem ou por hardware nas configurações da porta serial do computador.

![Desativar o controle de fluxo por sinais de modem nas configurações avançadas da porta serial](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Desativação do controle de fluxo por sinais de modem nas configurações da porta serial</em></div>

## Controles do usuário { #user-controls }

<div align="center"><em>Sinais de controle do usuário</em></div>

<div align="center" markdown>

| Função | GPIO | Comportamento |
| :--- | :--- | :--- |
| LED1 | PA31 | Ativo em nível baixo |
| LED2 | PA32 | Ativo em nível baixo |
| KEY1 | PA34 | Ativo em nível alto; suporta reset após pressionamento longo de 10 s |
| KEY2 | PA33 | Ativo em nível alto |

</div>

## Resumo dos pinos com furos semicirculares metalizados { #castellated-pin-summary }

A Nano expõe dois grupos de pinos nas bordas. O primeiro reúne áudio, SPI1, UART de depuração, alimentação próxima ao USB e pinos compatíveis com GPADC. O segundo reúne SPI2, USB FS, GPIOs com capacidade de despertar o sistema e alimentação.

### Sinais de borda do lado frontal { #front-side-edge-signals }

<div align="center"><em>Mapa dos sinais de borda do lado frontal</em></div>

<div align="center" markdown>

| Pino | Sinal | Função principal |
| :--- | :--- | :--- |
| 1 | GND | Terra |
| 2 | DACP | Saída de áudio analógica |
| 3 | DACN | Saída de áudio analógica |
| 4 | MIC_ADC | Entrada de microfone analógico |
| 5 | MIC_BIAS | Polarização do microfone |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | Terra |
| 8 | PA19 | UART0_TXD / SWCLK / depuração |
| 9 | PA18 | UART0_RXD / SWDIO / depuração |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | Entrada/saída de 3,3 V |
| 14 | GND | Terra |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | Entrada/saída de 5 V |

</div>

### Sinais de borda do lado traseiro { #back-side-edge-signals }

<div align="center"><em>Mapa dos sinais de borda do lado traseiro</em></div>

<div align="center" markdown>

| Pino | Sinal | Função principal |
| :--- | :--- | :--- |
| 1 | GND | Terra |
| 2 | 3.3V | Entrada/saída de 3,3 V |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | Terra |
| 10 | 3.3V | Entrada/saída de 3,3 V |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | Entrada/saída de 5 V |
| 16 | GND | Terra |

</div>

## Interface LCD { #lcd-interface }

A placa suporta displays LCD QSPI por meio de um conjunto de sinais FPC de 16 pinos. A nota original da placa descreve a conexão com o display AMOLED de 1,85 polegadas do Huangshan Pi usando um cabo FPC adaptador de 22 para 16 pinos.

![Cabo adaptador FPC de 22 para 16 pinos](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>Cabo adaptador FPC de 22 para 16 pinos</em></div>

<div align="center"><em>Mapa dos sinais do FPC LCD de 16 pinos</em></div>

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
| 11 | 3.3V | Saída de alimentação do display |
| 12 | GND | Terra |
| 13 | PA09 | Interrupção do toque |
| 14 | PA11 | I2C SDA do toque |
| 15 | PA20 | I2C SCL do toque |
| 16 | PA10 | Reset do toque |

</div>

## Pinos de Flash externa e SDIO { #external-flash-and-sdio-pins }

A variante N16R16 inclui 16 MB de Flash QSPI-NOR externa. O grupo de pinos de armazenamento é:

<div align="center"><em>Grupo de pinos de Flash externa e SDIO</em></div>

<div align="center" markdown>

| GPIO do MCU | Função compartilhada de Flash / SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Dependendo da variante, esses pinos podem estar ocupados pela Flash montada na placa. Confirme a montagem exata antes de usá-los como pinos de expansão.

## Expansão de áudio { #audio-expansion }

A Nano disponibiliza entrada para microfone analógico, polarização do microfone e saída de áudio analógico diferencial. Acrescente um circuito externo de microfone e um amplificador de potência de áudio conforme os requisitos do produto final.

## Alvos de compilação do SDK { #sdk-build-targets }

Ao compilar com o SiFli-SDK, use `scons --board=<board_name>` com um destes nomes exatos de alvo:

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

Esses nomes identificam alvos de compilação do SDK e não necessariamente correspondem ao nome do produto impresso na placa ou no módulo. O índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e o [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) do SDK podem listar conjuntos diferentes; confirme o alvo para a revisão do SDK em uso.

## Documentos relacionados { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Apresentação do chip SF32LB52x][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware SF32LB52x][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[Artigo original da Wiki da SiFli][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Pacote de projeto][Design Package]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__

</div>
