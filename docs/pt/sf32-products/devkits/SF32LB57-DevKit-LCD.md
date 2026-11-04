---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD: placa de avaliação baseada em módulo para displays RGB, câmeras DVP, dois microfones PDM, alto-falante, Wi-Fi SDIO e USB."
tags:
    - Hardware
    - Placa de desenvolvimento
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## Visão geral { #overview }

A SF32LB57-DevKit-LCD é uma placa de avaliação multimídia baseada no **SF32LB57-MOD-WD**. O nome parece indicar que a SiFli prevê o módulo como produto. **WD** pode significar **Wi-Fi Dual-band** (Wi-Fi de banda dupla), mas essa interpretação não foi confirmada oficialmente. A placa reúne o MCU SF32LB57x, Wi-Fi SDIO, Flash de inicialização e conexões para periféricos. Ela permite desenvolver HMIs inteligentes, terminais com câmera, interfones e displays conectados, além de validar gráficos, captura, áudio e conectividade antes do projeto de uma placa portadora.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — Vista frontal" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vista frontal</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — Vista traseira" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vista traseira</figcaption></figure>
</div>

## Recursos da placa { #board-resources }

A documentação descreve dois núcleos STAR-MC1 de alto desempenho a 240 MHz, com pontuação combinada de 1968 CoreMark, além de 592 KB de SRAM com retenção (512 KB HPSYS + 80 KB LPSYS). Consulte [SF32LB57x](../chips/SF32LB57x.md) para ver a arquitetura multinúcleo completa. O módulo inclui Flash QSPI-NOR de inicialização, OPI-PSRAM conforme a variante e cristais de 48 MHz para o MCU e de 40 MHz para o Wi-Fi. Confira a marcação do módulo antes de escolher a configuração de memória.

A documentação especifica uma variante SF32LB57x alimentada por 3,3 V, com pads castelados para montagem do módulo em uma placa portadora. A OPI-PSRAM é opcional e depende do código exato do módulo; nem todas as configurações a incluem.

<div align="center"><em>Recursos da placa</em></div>

<div align="center" markdown>

| Componente / Conector | Implementação |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM (opcional); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0,5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0,5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2,54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

A SiFli identifica o dispositivo Wi-Fi como AIC8800D40LS-N e, em alguns trechos, descreve-o como um combo Wi-Fi/Bluetooth. Não o confunda com o Bluetooth do próprio MCU SF32. Confira o componente instalado, o chaveamento RF e os drivers do SDK; não presuma que exista um segundo caminho Bluetooth utilizável. A placa oferece um conector de antena IPEX-1 e controles de alimentação, despertar e seleção da antena Wi-Fi.

![Diagrama de blocos](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>Diagrama de blocos</em></div>

O diagrama original apresenta uma visão funcional, não uma referência de ligação. Ele mostra as linhas TF D0–D3 e associa WS2812B ao expansor de E/S, enquanto o texto especifica SDIO TF de 1 bit e controle direto pelo MCU em PA_11/PA_08, conforme a revisão da placa. Confirme essas conexões no esquemático correspondente e na configuração de pinos do SDK.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — Componentes da frente" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Componentes da frente</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — Componentes de trás" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Componentes de trás</figcaption></figure>
</div>

## Primeira inicialização { #getting-started }

Para avaliar o display, tenha em mãos a placa, um painel DPI-RGB compatível de 40 pinos / 0,5 mm, um cabo USB com suporte a dados e um computador com Windows, Linux ou macOS. Antena IPEX-1, câmera DVP, cartão MicroSD/TF, alto-falante de 8 Ω e depurador J-Link ou DAP-Link são opcionais. Para usar simultaneamente os logs UART e testar o USB nativo, são necessários dois cabos de dados.

1. Com a placa desligada, confira a orientação do pino 1 e dos contatos do FPC, além da tensão do painel; em seguida, conecte-o ao FPC1. Instale a antena antes dos testes de rádio.
2. Conecte a porta Type-C USB-to-UART, não a USB nativa, e selecione sua porta COM no SifliTrace ou Impeller.
3. Para gravar, coloque o jumper BOOT MODE J1 antes de alimentar ou reiniciar. Remova J1 e reinicie para executar normalmente e obter logs seriais.
4. Primeiro valide um hello-world pela serial; depois, teste uma imagem de cor uniforme e o toque, se disponível. Acrescente câmera, áudio, armazenamento e rádio um de cada vez, antes de testar a coexistência.

Uma placa programada de fábrica pode exibir sua interface padrão ao ser ligada, dependendo do firmware instalado e do painel. Uma tela preta, por si só, não comprova uma falha de gravação. Consulte [Primeiros passos com SiFli-SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) para obter informações sobre as ferramentas, o ambiente e a gravação.

## Configuração do SDK { #sdk-build-targets }

O guia da placa da SiFli instrui a instalar o SiFli SDK e selecionar o pacote de suporte da placa `SF32LB57-DevKit-LCD`. O arquivo upstream `build_config_gcc.yaml` atualmente vinculado não lista nenhum alvo de compilação SF32LB57. Antes de compilar, confirme o pacote de suporte e o identificador exato de build no checkout do SDK que será usado; não substitua o alvo por um de outra placa. Um hello-world bem-sucedido via UART verifica apenas a inicialização serial básica, não os drivers de display, câmera ou Wi-Fi.

## Alimentação e depuração { #power-and-debug }

Qualquer uma das portas USB Type-C pode alimentar a placa com 5 V. U4 (ETA3425D2G) gera o trilho `VDD_3V3`; U7 (ETA3425D2G) gera `WF_3V3`, habilitado de forma independente por `IOEX_WF_PWREN`. A ponte USB-to-UART é CH343P; a outra porta expõe USB 2.0 FS em `PA35`/`PA36`. Para SWD, use `PA_43` (SWCLK), `PA_44` (SWDIO), a referência de tensão de 3,3 V do alvo e GND comum. Não conecte a saída de 5 V do depurador a um pino de 3,3 V.

No diagrama SWD, os pinos 17, 18, 19 e 20 de J3 correspondem, respectivamente, a 3,3 V, SWCLK, SWDIO e GND. Esses números se referem ao conector da placa, não ao adaptador do depurador; faça as conexões entre os lados pelos nomes dos sinais.

![Conexão SWD](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>Conexão SWD</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptador J-Link" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptador J-Link</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptador SWD" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptador SWD</figcaption></figure>
</div>

## Display e câmera { #display-and-camera }

FPC1 é um conector `FPC-05FB-40PH20` de 40 pinos / 0,5 mm, com a ordem RGB da ALIENTEK. RGB888 é o padrão; RGB565/RGB666 podem liberar pinos quando o painel e o firmware permitem. O FreeIO também possibilita testar QSPI, MCU8080, EPD e JDI com um adaptador para esse conector. Essas interfaces exigem o adaptador, a alimentação e o firmware corretos; não são conexões DSI nativas.

A documentação exige um módulo baseado em QFN80 ou BGA112 para RGB888 completo de 24 bits e descreve o ePicasso 3.0 como acelerador gráfico 2D/2.5D. O pino 1 do FPC1 fornece 5 V para a retroiluminação ou para o circuito elevador do driver do display; não é um GPIO de 3,3 V. Os pinos 3 e 5 de J3 compartilham o barramento I2C de configuração da câmera e do toque em PA_23/PA_22.

!!! warning
    A documentação informa um limite de processamento do ePicasso 3.0 de 2048 × 2048 e também menciona atualização em tela cheia a 60 fps; mais adiante, condiciona a resolução e a frequência ao painel. Isso não garante a exibição em 2048 × 2048 a 60 fps: confira a temporização do LCDC, a interface, os buffers de imagem, a largura de banda e a carga medida. Os pinos 37–40 do FPC1 permanecem indefinidos: há cinco sinais propostos para quatro contatos. Confira `57x LCD-DevKit ioconfig-08192026.xlsx` e o esquemático correspondente antes de conectar o painel.

![Conexão do painel RGB](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Conexão do painel RGB</em></div>

FPC4 é um conector DCMI DVP de 24 pinos / 0,5 mm. A documentação lista GC032A, OV2640, OV5640 e OV3660, com OV2640/OV5640 como configuração padrão. Outros módulos podem exigir alterações na alimentação, conforme as notas do esquemático. Os trilhos incluem `DVDD_1V5`, `DVDD_2V8` e `AVDD_2V8`: atenda aos requisitos do sensor, não apenas aos do conector. As linhas DVP usam pinos selecionados por jumpers e compartilhados com o Wi-Fi SDIO ou o SDIO do cartão TF. A configuração padrão não permite o uso simultâneo das funções conflitantes.

As três linhas de alimentação da câmera usam LDOs independentes. A imagem anotada da face frontal indica 22P, mas o texto e a tabela do FPC4 especificam 24 pinos. Use a tabela de 24 pinos como referência documental e confira o conector real e o esquemático antes de conectar a câmera. A atribuição de reset ao pino 6 do FPC4 (IOEX_DVP_PDN/RESET) também é ambígua; confirme a ligação sem presumir que reset e desligamento têm controles independentes.

![Conexão da câmera](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Conexão da câmera</em></div>

## Pinos compartilhados e revisões { #shared-pins-and-revisions }

- `PA35`/`PA36` aparecem no FPC1 e também são usados pelo USB FS nativo: não use simultaneamente as conexões de painel conflitantes e a função de dispositivo USB.
- SWD em `PA_43`/`PA_44` compartilha pinos com display/câmera. Preserve um caminho de recuperação por depuração.
- WS2812B usa `PA_11` na V1.0 e `PA_08` na V1.1. A fonte também atribui `PA_11` a `BL_PWM`; resolva o conflito antes de controlar LED ou iluminação de fundo.
- J3 segue as posições de alimentação/GND do conector Raspberry Pi de 40 pinos, mas isso não implica compatibilidade com o ambiente de software Raspberry Pi nem compatibilidade universal com HATs. Confira a tensão, o pinmux e os sinais compartilhados antes de conectar placas de expansão.

## Áudio, botões e expansão de E/S { #audio-controls-and-io-expansion }

A documentação descreve um caminho de reprodução pelo DAC de 24 bits e pelo amplificador mono Class-D U8 (NS4150B), até J7 (`MX1.25-2P`), com alto-falante padrão de 8 Ω. Os microfones PDM são MSM261DGT007 ou LMD4020T261-AC23, compatível pino a pino. `PA_56` fornece o clock PDM e `PA_55`, os dados; `IOEX_PDM_PWREN` controla a alimentação e `IOEX_AU_PA_EN` habilita o amplificador. Confira o formato real, o ganho e os limites do alto-falante antes de usar o circuito em um produto.

S1–S3 compartilham `PA_34` / `GPADC_CH6`; a documentação indica tensões nominais de tecla de 2,97 V, 2,58 V e 2,19 V. S4 é `KEY_RSTN`, ativo em nível baixo. U11 (AW9523BTOR) oferece 16 E/S via I2C em `PA_22` (SCL) e `PA_23` (SDA). A tabela preserva os estados iniciais indicados na documentação; verifique o comportamento de reset e a inicialização do firmware na placa real. P0_2/P0_3 não são especificados na tabela original.

<div align="center"><em>Estados iniciais do expansor de E/S</em></div>

<div align="center" markdown>

| Porta | Sinal / Identificação | Estado inicial | Direção | Função |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3,3 V | Saída | Seleção de antena de 2,4 GHz |
| P1_1 | IOEX_LED_R | 3,3 V | Saída | LED vermelho |
| P1_2 | IOEX_LED_G | 3,3 V | Saída | LED verde |
| P1_3 | IOEX_LED_B | 3,3 V | Saída | LED azul |
| P1_4 | IOEX_WF_PWRKEY | 0 V | Saída | Tecla de alimentação do módulo Wi-Fi |
| P1_5 | IOEX_WF_PWREN | 0 V | Saída | Habilitação do conversor redutor Wi-Fi de 3,3 V |
| P1_6 | IOEX_CTP_RST | 0 V | Saída | Reset do controlador de toque |
| P1_7 | IOEX_LCD_RESET | 0 V | Saída | Reset do LCD |
| P0_0 | IOEX_USB_DET | Hi-Z | Entrada | Detecção de conexão USB |
| P0_1 | IOEX_TF_DET | Hi-Z | Entrada | Detecção de inserção de cartão TF |
| P0_4 | IOEX_PDM_PWREN | 0 V | Saída | Habilitação da alimentação dos microfones PDM |
| P0_5 | IOEX_AU_PA_EN | 0 V | Saída | Habilitação do amplificador de áudio |
| P0_6 | IOEX_DVP_PDN | 0 V | Saída | Desligamento da câmera |
| P0_7 | IOEX_HST_WAK_WF | 0 V | Saída | Despertar do Wi-Fi pelo host |

</div>

## Referência dos conectores { #connector-reference }

!!! warning
    Estas tabelas transcrevem as conexões descritas na documentação e não substituem o esquemático. O resumo do módulo está incompleto (`58~?`) e identifica `PA_00`/`PA_01` como USB_DP/USB_DM, em conflito com o mapeamento explícito do USB nativo em `PA35`/`PA36`. Algumas linhas da fonte agrupam faixas de pads do módulo, faixas de GPIO e funções alternativas sem indicar a função de cada pad; esta página mantém esses agrupamentos e não infere atribuições individuais. Diferencie o número do pad do módulo do GPIO do MCU. Não use as linhas indefinidas para projetar uma PCB.

<div align="center"><em>Pads do módulo: entradas indefinidas preservadas</em></div>

<div align="center" markdown>

| Pino | Sinal / Identificação | Função |
|:---|:---|:---|
| 1 | GND | GND |
| 2 | VDD_3V3 · 3,3 V | Entrada de alimentação de 3,3 V |
| 3 | VDD_1V8 · 1,8 V LDO | Saída de 1,8 V do LDO interno |
| 4 | RSTN | Reset; conectado ao botão de reset |
| 5~22 | PA_41 ~ PA_24 | Multiplexação GPIO / LCDC / SPI / SD / depuração |
| 23~36 | PA_23 ~ PA_10 | Multiplexação GPIO / I2C / SD / USB / áudio / depuração |
| 37 | DAC1P | Saída diferencial DAC P |
| 38 | DAC1N | Saída diferencial DAC N |
| 39 | MICBIAS_PA56 / PDM_CLK | Polarização de microfone / clock PDM |
| 40 | ADC1P_PA55 / PDM_DAT | Entrada P do ADC de áudio / dados PDM |
| 41 | GND | GND |
| 42 | PA_00 / USB_DP | GPIO / USB_DP (conflito na fonte; veja o aviso) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM (conflito na fonte; veja o aviso) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / toque / detecção USB |
| 54 | GND | GND |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | Dados superiores DPI-RGB / PDM / despertar Wi-Fi; disponibilidade conforme o encapsulamento do módulo |

</div>

<div align="center"><em>J3: conector de expansão de 40 pinos</em></div>

<div align="center" markdown>

| Pino | Sinal / Identificação | Conexão / Função |
|:---|:---|:---|
| 1 | 3V3 | 3,3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3,3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1: conector do display RGB</em></div>

<div align="center" markdown>

| Pino | Sinal / Identificação |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | Controles: conferir atribuição: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4: conector de câmera DVP</em></div>

<div align="center" markdown>

| Pino | Sinal / Identificação |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2,8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2,8 V |
| 23 | NC |
| 24 | GND |

</div>

## Fontes e próximos passos { #related-documents }

Para projetar uma placa própria, consulte o [guia de hardware SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) e [Projeto para produção](../../hardware/design-for-production.md). Em seguida, consulte [Gráficos](../../learn/graphics/overview.md), [Áudio](../../learn/audio/overview.md) e [Bluetooth](../../learn/bluetooth/overview.md) para desenvolver esses subsistemas.

- [Documentação de produto SiFli SF32LB57x](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [Downloads de manuais do usuário SiFli](https://downloads.sifli.com/user%20manual/)
- [Guia original de hardware SF32LB57x](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

A documentação da placa indica que o manual do usuário SF32LB57x ainda está pendente de publicação; confira a disponibilidade atual no diretório de downloads.

- [Guia chinês original da placa](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Fonte Markdown](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [Configuração de compilação do SDK](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [Ferramentas de display](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Gravação com Impeller](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [Loja SiFli](https://sifli.taobao.com/)

A SiFli direciona pedidos de amostras e pequenas quantidades à loja e consultas sobre grandes volumes para sales@sifli.com. A documentação também menciona solicitações de amostras para projetos de código aberto e o grupo QQ 674699679; confirme as condições e a disponibilidade atuais com a SiFli. Para discutir projetos, [entre em contato com a μForge.io](../../about/contact.md).
