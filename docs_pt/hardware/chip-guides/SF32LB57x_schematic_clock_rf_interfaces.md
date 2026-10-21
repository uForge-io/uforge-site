---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de esquemático do SF32LB57x para clock, RF e interfaces: cristais de 48 MHz/32,768 kHz, casamento de RF, display, toque, áudio, câmera e motor."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB57x — Clock, RF e interfaces de usuário { #sf32lb57x-hardware-design-guide-clock-rf-user-interfaces }

!!! note "Parte do guia de projeto de hardware do SF32LB57x"
    Esta página cobre as seções 5.3 a 5.5 das diretrizes de projeto do esquemático: geração de clock, RF e interfaces de usuário. Volte para [Sistema mínimo e alimentação](SF32LB57x_schematic_system_power.md) ou avance para [Armazenamento e fabricação](SF32LB57x_schematic_storage_mfg.md).

### 5.3. Geração de clock { #53-clock-generation }

A geração de clock abrange o cristal principal de 48 MHz, o cristal RTC de 32,768 kHz e as condições de calibração que afetam a RF, o Bluetooth, a precisão do RTC e o comportamento em baixo consumo. Considere a seleção dos cristais e as restrições de layout durante a revisão do esquemático e o posicionamento na PCB.

#### 5.3.1. Cristal principal de 48 MHz { #531-48-mhz-main-crystal }

Parâmetros recomendados:

<div align="center"><em>Tabela 5.3-1: Parâmetros recomendados para o cristal principal de 48 MHz</em></div>

<div align="center" markdown>

| Parâmetro | Recomendação |
|:----------|:---------------|
| Capacitância de carga CL | 7 pF a 12 pF; recomenda-se cerca de 8,8 pF |
| Tolerância de frequência | <= ±10 ppm |
| ESR | <= 30 Ω; recomenda-se cerca de 22 Ω |

</div>

Segundo o guia-fonte, a potência dissipada pelo cristal diminui quando `CL` e ESR são menores. Reserve, ao lado do cristal de 48 MHz, uma área para um capacitor de ajuste em paralelo. Para cristais com `CL` abaixo de 12 pF, a fonte informa que esse capacitor não precisa ser instalado.

Requisitos de layout:

- Aproxime o cristal dos pinos do chip e, de preferência, posicione-o dentro da área da blindagem.
- Mantenha-o afastado do PA, do carregador, do PMU, dos conversores DC/DC, da bateria e de trilhas digitais de alta velocidade.
- Quando viável, faça o roteamento na camada superior, com largura de trilha de 0,1 mm e comprimento de 3 mm a 10 mm. Mantenha pelo menos 0,15 mm entre as trilhas `48M_XI` e `48M_XO`, conforme a figura de layout da fonte.
- Respeite a área de exclusão do cristal na camada superior indicada no projeto de referência e não passe sinais sob o cristal. A fonte traz orientações conflitantes sobre o cobre de terra na camada adjacente; consulte a nota a seguir.
- Use blindagem tridimensional de terra, mas não aproxime o terra excessivamente das trilhas de oscilação.

A faixa especificada de capacitância de carga do cristal de 48 MHz é de 7 pF a 12 pF, com cerca de 8,8 pF recomendados. Valide o cristal escolhido com o circuito oscilador no hardware do produto e confirme o erro de frequência. Inclua a calibração do cristal no bring-up de produção; não presuma que a configuração padrão do software seja adequada para todos os cristais.

#### 5.3.2. Cristal RTC de 32,768 kHz { #532-32768-khz-rtc-crystal }

Parâmetros recomendados:

<div align="center"><em>Tabela 5.3-2: Parâmetros recomendados para o cristal RTC de 32,768 kHz</em></div>

<div align="center" markdown>

| Parâmetro | Recomendação |
|:----------|:---------------|
| Capacitância de carga CL | 7 pF ou 11,5 pF (o padrão do chip é 11,5 pF; para 7 pF, é necessário alterar um registrador); 7 pF é recomendado para obter o menor consumo |
| Tolerância de frequência | <= ±20 ppm |
| ESR | <= 80 kΩ; recomenda-se cerca de 38 kΩ |

</div>

Segundo a fonte, valores menores de `CL` e ESR reduzem a potência dissipada pelo cristal. As opções de 7 pF e 11,5 pF não exigem capacitor externo de ajuste. Para outros valores de capacitância de carga, meça o circuito para determinar o ajuste necessário.

Requisitos de layout:

- Aproxime o cristal do chip e mantenha as trilhas curtas.
- Mantenha a largura das trilhas em 0,1 mm e o comprimento em, no máximo, 10 mm. Mantenha pelo menos 0,15 mm entre `32K_XI` e `32K_XO`, conforme a figura de layout da fonte, e adicione blindagem tridimensional de terra.
- Respeite a área de exclusão do cristal na camada superior indicada no projeto de referência e não passe sinais sob o cristal. A fonte traz orientações conflitantes sobre o cobre de terra na camada adjacente; consulte a nota a seguir.
- Afaste a área do cristal de fontes de ruído, como alimentação, RF, USB, SDIO, clock do display e circuito de carga.

<div align="center"><em>Tabela 5.3-3: Cristais recomendados</em></div>

<div align="center" markdown>

| Cristal | Número de peça | Fabricante | Parâmetros principais |
|:--------|:------------|:-------|:---------------|
| 48 MHz | E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 a +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR de -30 a 85 °C, encapsulamento 2016. |
| 32,768 kHz | ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR de -40 a 85 °C, encapsulamento 3215. |
| 48 MHz | SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 a +10 ppm, CL = 8,8 pF, ESR <= 40 Ω, TOPR de -20 a 75 °C, encapsulamento 2016; ESR mais alto aumenta ligeiramente o consumo estático. |
| 32,768 kHz | SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR de -40 a 85 °C, encapsulamento 3215. |
| 32,768 kHz | SF32WK32768D71T005 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR de -40 a 85 °C, encapsulamento 3215. |
| 48 MHz | CN4048M000885C822000 | JWT | F0 = 48,000000 MHz, ΔF/F0 = -8 a +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR de -30 a 85 °C, encapsulamento 2016. |
| 32,768 kHz | DH2032K76807T2719002 | JWT | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR de -40 a 85 °C, encapsulamento 3215. |

</div>

A capacitância `CL` do cristal de 32,768 kHz deve corresponder à configuração do registrador: para 7 pF, use `PMUC->LXT_CR->CAP_SEL = 0`; para 11,5 pF, use `PMUC->LXT_CR->CAP_SEL = 1`. Confirme essa configuração no firmware antes do EVT, pois a maioria dos cristais recomendados é de 7 pF, enquanto alguns padrões do firmware podem usar outra opção de capacitância de carga.

!!! warning "Orientações conflitantes da fonte sobre o cobre de terra sob os cristais"
    A fonte é inconsistente quanto ao cobre sob os cristais: uma nota na seção de clock pede a remoção de pelo menos o cobre de terra da segunda camada; o texto de roteamento dos cristais especifica uma área de exclusão na camada adjacente; as vistas em corte mostram cobre de terra na L2 sob as trilhas; e a seção de empilhamento exige um plano de terra contínuo na L2. Não deduza uma regra única dessas indicações. Antes de liberar a PCB, confirme o layout com a versão mais recente do projeto de referência SF32LB57x aprovado.

#### 5.3.3. Saídas de clock de baixo consumo { #533-low-power-clock-outputs }

Nos modos Sleep, DeepSleep, Standby e Hibernate, os pinos `PA24` a `PA27` podem fornecer o clock RC10K ou um clock de 32,768 kHz.

Nos modos Sleep, DeepSleep e Standby, `PA24` a `PA27` também podem fornecer um clock PWM gerado pelo LPTIM2, com frequência de até 16 kHz.

### 5.4. RF { #54-rf }

#### 5.4.1. Esquemático de RF { #541-rf-schematic }

Principais requisitos do esquemático de RF:

- Reserve uma rede de casamento π no caminho da antena para filtrar emissões espúrias e ajustar a antena.
- O esquemático de referência mostra posições NC para os capacitores em derivação e um capacitor série de 15 pF / 50 V. A fonte também informa que uma antena já adaptada em impedância não precisa de componentes adicionais de casamento. Confirme quais posições devem ser montadas com base no projeto da antena e nas medições de RF; a montagem ilustrada não é universal.
- Posicione a rede de casamento perto do pino de RF do chip, não junto à antena.
- Posicione o capacitor de filtro de `AVDD_BRF` perto do chip e conecte o terra diretamente ao terra principal por vias próximas.
- Planeje a antena, a rede de casamento, a proteção ESD de RF e o conector como um único caminho de sinal.

![Figura 5.4-1: Referência de esquemático de RF](../../sf32-products/chips/assets/57x/SF32LB57x-rf-diagram.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Referência de esquemático de RF</em></div>

#### 5.4.2. Layout de RF na PCB { #542-rf-pcb }

Requisitos de layout na PCB:

- Faça o roteamento da trilha de RF como uma linha single-ended de 50 Ω.
- Prefira o roteamento na camada superior, com o mínimo possível de vias e mudanças de camada.
- Evite ângulos agudos e curvas de 90 graus.
- Adicione cobre de terra e cercas de vias nos dois lados.
- Mantenha uma referência de terra contínua sob a trilha de RF.
- Afaste a RF dos conversores DC/DC, cristais, USB, SDIO, clocks do display, caminhos de alta corrente do carregador e outras regiões ruidosas.

#### 5.4.3. Bring-up e calibração de RF { #543-rf-bring-up-and-calibration }

Verifique o desempenho de RF por meio de medições; a conectividade correta no esquemático é apenas o ponto de partida.

Verificações recomendadas durante o bring-up de RF:

- Confirme o erro de frequência e a estabilidade de partida do cristal de 48 MHz.
- Use testes conduzidos para verificar a potência de transmissão, o erro de frequência, a sensibilidade do receptor e a qualidade da modulação.
- Ajuste a rede de casamento π com o gabinete, a bateria, a blindagem e o posicionamento final da antena.
- Verifique o desempenho de RF com o display ligado, durante a carga, com USB/SDIO/atualização do display em funcionamento, com o motor ativo e durante a operação de áudio.
- Garanta que o gabarito de teste de produção permita calibrar o cristal, realizar testes básicos de RF e gravar o firmware.

!!! note
    Conclua o casamento da antena em um hardware cuja estrutura seja próxima à do produto final. Os resultados obtidos em uma placa nua normalmente não representam o desempenho de RF do produto acabado.

### 5.5. Interfaces de usuário { #55-user-interfaces }

#### 5.5.1. Display, toque e retroiluminação { #551-display-touch-and-backlight }

Revise o display, o toque e a retroiluminação como um único grupo de interfaces, pois a temporização do painel, a sequência de alimentação, o roteamento do FPC, o despertar pelo toque, a proteção ESD e o ruído da retroiluminação costumam interagir durante o bring-up da placa.

#### 5.5.2. Seleção da interface de display { #552-display-interface-selection }

O LCDC do SF32LB57x aceita vários tipos de interface de display, dependendo do modelo específico.

<div align="center"><em>Tabela 5.5-1: Guia de seleção da interface de display</em></div>

<div align="center" markdown>

| Interface | Aplicação | Observações de hardware |
|:----------|:---------|:---------------|
| SPI / QSPI | Displays TFT/AMOLED compactos e displays para dispositivos vestíveis | Usa poucos pinos, mas tem largura de banda limitada; é adequado para atualização parcial. |
| 8080 MCU | Painéis com interface paralela | Oferece mais largura de banda que interfaces seriais, mas utiliza mais pinos. |
| RGB / DPI | Painéis de resolução média ou alta | Fluxo contínuo de pixels, com requisitos rigorosos de largura de banda e temporização. |
| MIPI DSI | AMOLED de alta densidade | Oferece alta largura de banda com poucos pinos, mas exige mais atenção à inicialização e à integridade de sinal. |
| EPD | Papel eletrônico | Tem baixa frequência de atualização e exige planejamento de VCOM, PMIC e formas de onda. |
| JDI | Displays de baixo consumo com Memory-in-Pixel | Adequado a produtos com display sempre ativo e legível sob luz solar. |

</div>

Observações e exemplos comuns de display:

- O controlador de display aceita SPI de 3 e 4 linhas, SPI com duas ou quatro linhas de dados, RGB de 16 bits, MCU 8080 de 16 bits, EPD de 16 bits e JDI serial/paralelo.
- As profundidades de cor incluem RGB888, RGB666, RGB565 e RGB111; a resolução máxima pode chegar a 1024 x 1024. Confirme os modos exatos aceitos pelo modelo escolhido.
- Em projetos de alta resolução, avalie desde o início a largura de banda da interface, a RAM do display, a largura de banda da PSRAM e a estratégia de atualização.
- Se o projeto não exigir uma pinagem personalizada, use como ponto de partida um grupo de IO adaptado no SDK ou em um projeto de referência para a interface do painel selecionado. O roteamento por matriz é flexível, mas um grupo de IO já suportado pelo software reduz os riscos de desenvolvimento do driver e de bring-up.
- A inicialização do painel, a sequência de alimentação e o modo de interface devem seguir o datasheet do fabricante do painel.

<div align="center"><em>Tabela 5.5-2: Pontos de partida para as IO do display</em></div>

<div align="center" markdown>

| Interface de display | Ponto de partida recomendado |
|:------------------|:---------------------------|
| SPI / QSPI | Prefira os pinos dedicados `LCDC1_SPI_*` da tabela de pinmux. Se usar sinais SPI do LCDC mapeados pela matriz, mantenha o clock do display em 50 MHz ou menos e verifique a capacidade de acionamento. |
| RGB / DPI | Para sinais acima de 30 MHz, use `PA22` a `PA50` para os sinais do LCDC mapeados pela matriz; `PA52` a `PA54` podem ser usados somente para `B1` a `B6`. Projetos de menor velocidade também podem usar o mapeamento matricial, após a análise da temporização. |
| 8080 MCU | Em projetos de alta velocidade, aplique a mesma regra de seleção de grupos de pinos usada para RGB/DPI; confira a largura do barramento, a temporização e a capacidade de acionamento com base no painel. |
| EPD | Se o barramento EPD operar acima de 30 MHz, aplique a mesma regra de seleção de grupos de pinos usada para RGB/DPI; avalie também VCOM e os pinos de controle do PMIC. |
| JDI | Siga a tabela de mapeamento dos sinais JDI do LCDC e prefira uma configuração de painel adaptada ao SDK, quando disponível. |
| MIPI DSI | Use a atribuição fixa dos sinais DSI definida para o componente selecionado e o projeto de referência; confirme com a equipe de software o roteamento das lanes e a inicialização do painel. |

</div>

<div align="center"><em>Tabela 5.5-3: Exemplos de controladores LCD</em></div>

<div align="center" markdown>

| Driver | Fabricante | Resolução | Tipo | Interfaces típicas |
|:-------|:-------|:-----------|:-----|:-------------------|
| RM69090 | Raydium | 368 x 448 | AMOLED | SPI, Quad SPI, MIPI-DSI |
| RM69330 | Raydium | 454 x 454 | AMOLED | SPI, Quad SPI, 8080 MCU de 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368 x 448 | AMOLED | Quad SPI, MIPI-DSI |
| SH8601A | Shenghe | 454 x 454 | AMOLED | SPI, Quad SPI, 8080 MCU de 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356 x 400 | TFT | Quad SPI |
| GC9C01 | Galaxycore | 360 x 360 | TFT | Quad SPI |
| GC9B71 | Galaxycore | 320 x 380 | TFT | Quad SPI |
| ST77903 | Sitronix | 400 x 400 | TFT | Quad SPI |
| ICNA3311 | Chipone | 454 x 454 | AMOLED | Quad SPI |
| FT2308 | FocalTech | 410 x 494 | AMOLED | Quad SPI |

</div>

As tabelas a seguir mostram o mapeamento exato entre sinais e pinos para cada tipo de interface de display. Use a tabela correspondente à interface do painel escolhido.

<div align="center"><em>Tabela 5.5-4: Conexões dos sinais do display SPI/QSPI</em></div>

<div align="center" markdown>

| Sinal do painel SPI | Sinal 57x | Descrição |
|:------------------|:-----------|:-------------|
| `CSx` | `LCDC1_SPI_CS` | Sinal de seleção do chip. |
| `WRx_SCL` | `LCDC1_SPI_CLK` | Sinal de clock. |
| `DCx` | `LCDC1_SPI_DIO1` | Seleção entre dados e comandos no modo SPI de 4 fios; `DATA1` no modo Quad-SPI. |
| `SDI_RDx` | `LCDC1_SPI_DIO0` | Entrada de dados nos modos SPI de 3/4 fios; `DATA0` no modo Quad-SPI. |
| `SDO` | `LCDC1_SPI_DIO0` | Saída de dados nos modos SPI de 3/4 fios; conecte este pino a `SDI_RDx` com uma trilha curta. |
| `D[0]` | `LCDC1_SPI_DIO2` | `DATA2` no modo Quad-SPI. |
| `D[1]` | `LCDC1_SPI_DIO3` | `DATA3` no modo Quad-SPI. |
| `RESET` | `LCDC1_SPI_RSTB` | Sinal de reset. |
| `TE` | `LCDC1_SPI_TE` | Sinal de efeito de tearing (TE) para o MCU. |

</div>

!!! note
    Prefira os pinos dedicados `LCDC1_SPI_*` da Função 1. Se usar sinais do modo SPI mapeados pela matriz (índices de função 121 a 150), limite o clock a, no máximo, 50 MHz e configure a capacidade de acionamento do GPIO como `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabela 5.5-5: Conexões dos sinais do display RGB</em></div>

<div align="center" markdown>

| Sinal do painel RGB888 | Sinal do painel RGB565 | Sinal 57x | Descrição |
|:---------------------|:----------------------|:-----------|:-------------|
| CLK | CLK | `LCDC_DPI_CLK` | Sinal de clock. |
| DE | DE | `LCDC_DPI_DE` | Sinal de habilitação de dados no modo DE. |
| HSYNC | HSYNC | `LCDC_DPI_HSYNC` | Sinal de sincronização horizontal. |
| VSYNC | VSYNC | `LCDC_DPI_VSYNC` | Sinal de sincronização vertical. |
| R0 | - | `LCDC_DPI_R0` | Dado vermelho 0. |
| R1 | - | `LCDC_DPI_R1` | Dado vermelho 1. |
| R2 | - | `LCDC_DPI_R2` | Dado vermelho 2. |
| R3 | R0 | `LCDC_DPI_R3` | Dado vermelho 3. |
| R4 | R1 | `LCDC_DPI_R4` | Dado vermelho 4. |
| R5 | R2 | `LCDC_DPI_R5` | Dado vermelho 5. |
| R6 | R3 | `LCDC_DPI_R6` | Dado vermelho 6. |
| R7 | R4 | `LCDC_DPI_R7` | Dado vermelho 7. |
| G0 | - | `LCDC_DPI_G0` | Dado verde 0. |
| G1 | - | `LCDC_DPI_G1` | Dado verde 1. |
| G2 | G0 | `LCDC_DPI_G2` | Dado verde 2. |
| G3 | G1 | `LCDC_DPI_G3` | Dado verde 3. |
| G4 | G2 | `LCDC_DPI_G4` | Dado verde 4. |
| G5 | G3 | `LCDC_DPI_G5` | Dado verde 5. |
| G6 | G4 | `LCDC_DPI_G6` | Dado verde 6. |
| G7 | G5 | `LCDC_DPI_G7` | Dado verde 7. |
| B0 | - | `LCDC_DPI_B0` | Dado azul 0. |
| B1 | - | `LCDC_DPI_B1` | Dado azul 1. |
| B2 | - | `LCDC_DPI_B2` | Dado azul 2. |
| B3 | B0 | `LCDC_DPI_B3` | Dado azul 3. |
| B4 | B1 | `LCDC_DPI_B4` | Dado azul 4. |
| B5 | B2 | `LCDC_DPI_B5` | Dado azul 5. |
| B6 | B3 | `LCDC_DPI_B6` | Dado azul 6. |
| B7 | B4 | `LCDC_DPI_B7` | Dado azul 7. |

</div>

<div align="center"><em>Tabela 5.5-6: Configuração dos modos RGB (atribuição dos bits LCDC_IFx por modo)</em></div>

<div align="center" markdown>

| Sinal LCDC | Modo 0 (RGB565 Config. 1) | Modo 1 (RGB565 Config. 2) | Modo 2 (RGB565 Config. 3) | Modo 3 (RGB666 Config. 1) | Modo 4 (RGB666 Config. 2) | Modo 5 (RGB888) | Modo 6 (RGB666 em barramento de 8 bits) | Modo 7 (RGB888 em barramento de 8 bits) |
|:------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------|:-----------------------------|:-----------------------------|
| `LCDC_IF0` | B0 | B0 | - | B0 | B0 | B0 | R0/G0/B0 | R0/G0/B0 |
| `LCDC_IF1` | B1 | B1 | B0 | B1 | B1 | B1 | R1/G1/B1 | R1/G1/B1 |
| `LCDC_IF2` | B2 | B2 | B1 | B2 | B2 | B2 | R2/G2/B2 | R2/G2/B2 |
| `LCDC_IF3` | B3 | B3 | B2 | B3 | B3 | B3 | R3/G3/B3 | R3/G3/B3 |
| `LCDC_IF4` | B4 | B4 | B3 | B4 | B4 | B4 | R4/G4/B4 | R4/G4/B4 |
| `LCDC_IF5` | G0 | - | B4 | B5 | B5 | B5 | R5/G5/B5 | R5/G5/B5 |
| `LCDC_IF6` | G1 | - | - | G0 | - | B6 | - | R6/G6/B6 |
| `LCDC_IF7` | G2 | - | - | G1 | - | B7 | - | R7/G7/B7 |
| `LCDC_IF8` | G3 | G0 | G0 | G2 | G0 | G0 | - | - |
| `LCDC_IF9` | G4 | G1 | G1 | G3 | G1 | G1 | - | - |
| `LCDC_IF10` | G5 | G2 | G2 | G4 | G2 | G2 | - | - |
| `LCDC_IF11` | R0 | G3 | G3 | G5 | G3 | G3 | - | - |
| `LCDC_IF12` | R1 | G4 | G4 | R0 | G4 | G4 | - | - |
| `LCDC_IF13` | R2 | G5 | G5 | R1 | G5 | G5 | - | - |
| `LCDC_IF14` | R3 | - | - | R2 | - | G6 | - | - |
| `LCDC_IF15` | R4 | - | - | R3 | - | G7 | - | - |
| `LCDC_IF16` | - | R0 | - | R4 | R0 | R0 | - | - |
| `LCDC_IF17` | - | R1 | R0 | R5 | R1 | R1 | - | - |
| `LCDC_IF18` | - | R2 | R1 | - | R2 | R2 | - | - |
| `LCDC_IF19` | - | R3 | R2 | - | R3 | R3 | - | - |
| `LCDC_IF20` | - | R4 | R3 | - | R4 | R4 | - | - |
| `LCDC_IF21` | - | - | R4 | - | R5 | R5 | - | - |
| `LCDC_IF22` | - | - | - | - | - | R6 | - | - |
| `LCDC_IF23` | - | - | - | - | - | R7 | - | - |

</div>

`LCDC_IF24` a `LCDC_IF29` não são usados em nenhum modo RGB.

<div align="center"><em>Tabela 5.5-7: Conexões dos sinais do display MCU8080</em></div>

<div align="center" markdown>

| Sinal do painel MCU8080 de 16 bits | Sinal do painel MCU8080 de 8 bits | Sinal 57x | Descrição |
|:------------------------------|:------------------------------|:------------|:-------------|
| `CSX` | `CSX` | `LCDC_8080_CS` | Seleção do chip. |
| `WR` | `WR` | `LCDC_8080_WR` | Pulso de escrita para gravar dados. |
| `DC` | `DC` | `LCDC_8080_DC` | Seleção entre dados e comandos do display. |
| `RD` | `RD` | `LCDC_8080_RD` | Pulso de leitura. |
| `D[0]` | `D[0]` | `LCDC_8080_DIO0` | Dado 0. |
| `D[1]` | `D[1]` | `LCDC_8080_DIO1` | Dado 1. |
| `D[2]` | `D[2]` | `LCDC_8080_DIO2` | Dado 2. |
| `D[3]` | `D[3]` | `LCDC_8080_DIO3` | Dado 3. |
| `D[4]` | `D[4]` | `LCDC_8080_DIO4` | Dado 4. |
| `D[5]` | `D[5]` | `LCDC_8080_DIO5` | Dado 5. |
| `D[6]` | `D[6]` | `LCDC_8080_DIO6` | Dado 6. |
| `D[7]` | `D[7]` | `LCDC_8080_DIO7` | Dado 7. |
| `D[8]` | - | `LCDC_8080_DIO8` | Dado 8 (somente no modo de 16 bits). |
| `D[9]` | - | `LCDC_8080_DIO9` | Dado 9 (somente no modo de 16 bits). |
| `D[10]` | - | `LCDC_8080_DIO10` | Dado 10 (somente no modo de 16 bits). |
| `D[11]` | - | `LCDC_8080_DIO11` | Dado 11 (somente no modo de 16 bits). |
| `D[12]` | - | `LCDC_8080_DIO12` | Dado 12 (somente no modo de 16 bits). |
| `D[13]` | - | `LCDC_8080_DIO13` | Dado 13 (somente no modo de 16 bits). |
| `D[14]` | - | `LCDC_8080_DIO14` | Dado 14 (somente no modo de 16 bits). |
| `D[15]` | - | `LCDC_8080_DIO15` | Dado 15 (somente no modo de 16 bits). |
| `RESET` | `RESET` | `LCDC_8080_RSTB` | Reset. |
| `TE` | `TE` | `LCDC_8080_TE` | Sinal de efeito de tearing (TE) para o MCU. |

</div>

<div align="center"><em>Tabela 5.5-8: Conexões dos sinais do display EPD</em></div>

<div align="center" markdown>

| Sinal do painel EPD de 16 bits | Sinal do painel EPD de 8 bits | Sinal 57x | Descrição |
|:--------------------------|:--------------------------|:------------|:-------------|
| `CLK` | `CLK` | `LCDC_TCON_SDCLK` | Clock do driver de fonte. |
| `CKV`/`CPV` | `CKV`/`CPV` | `LCDC_TCON_GDCLK` | Clock do driver de gate. |
| `SPH` | `SPH` | `LCDC_TCON_SDSTL` | Pulso de início do driver de fonte. |
| `SPV`/`STV` | `SPV`/`STV` | `LCDC_TCON_GDSP` | Pulso de início do driver de gate. |
| `LE` | `LE` | `LCDC_TCON_SDLE` | Habilitação do latch do driver de fonte. |
| `OE` | `OE` | `LCDC_TCON_SDOE` | Habilitação da saída do driver de fonte. |
| `D0` | `D0` | `LCDC_TCON_SDAT0` | Bit 0 do sinal de dados do driver de fonte. |
| `D1` | `D1` | `LCDC_TCON_SDAT1` | Bit 1 do sinal de dados do driver de fonte. |
| `D2` | `D2` | `LCDC_TCON_SDAT2` | Bit 2 do sinal de dados do driver de fonte. |
| `D3` | `D3` | `LCDC_TCON_SDAT3` | Bit 3 do sinal de dados do driver de fonte. |
| `D4` | `D4` | `LCDC_TCON_SDAT4` | Bit 4 do sinal de dados do driver de fonte. |
| `D5` | `D5` | `LCDC_TCON_SDAT5` | Bit 5 do sinal de dados do driver de fonte. |
| `D6` | `D6` | `LCDC_TCON_SDAT6` | Bit 6 do sinal de dados do driver de fonte. |
| `D7` | `D7` | `LCDC_TCON_SDAT7` | Bit 7 do sinal de dados do driver de fonte. |
| `D8` | `D8` | `LCDC_TCON_SDAT8` | Bit 8 do sinal de dados do driver de fonte. |
| `D9` | - | `LCDC_TCON_SDAT9` | Bit 9 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D10` | - | `LCDC_TCON_SDAT10` | Bit 10 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D11` | - | `LCDC_TCON_SDAT11` | Bit 11 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D12` | - | `LCDC_TCON_SDAT12` | Bit 12 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D13` | - | `LCDC_TCON_SDAT13` | Bit 13 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D14` | - | `LCDC_TCON_SDAT14` | Bit 14 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `D15` | - | `LCDC_TCON_SDAT15` | Bit 15 do sinal de dados do driver de fonte (somente no modo de 16 bits). |
| `GMODE` | `GMODE` | Qualquer GPIO | Seleção do modo de saída do driver de gate. |
| `VPOS` | `VPOS` | - | Sinal do PMIC do EPD; alimentação positiva do driver de fonte. |
| `VNEG` | `VNEG` | - | Sinal do PMIC do EPD; alimentação negativa do driver de fonte. |
| `VGH` | `VGH` | - | Sinal do PMIC do EPD; alimentação positiva do driver de gate. |
| `VGL` | `VGL` | - | Sinal do PMIC do EPD; alimentação negativa do driver de gate. |
| `VCOM` | `VCOM` | - | Sinal do PMIC do EPD; conexão do eletrodo comum. |
| `WAKEUP` | `WAKEUP` | Qualquer GPIO | Despertar do PMIC do EPD. |
| `PWRUP` | `PWRUP` | Qualquer GPIO | Ativação do PMIC do EPD. |
| `I2C_SDA` | `I2C_SDA` | Qualquer GPIO | Dados I2C do PMIC do EPD. |
| `I2C_SCL` | `I2C_SCL` | Qualquer GPIO | Clock I2C do PMIC do EPD. |
| `PWRCOM` | `PWRCOM` | Qualquer GPIO | `VCOM_CTRL` do PMIC do EPD; habilitação de VCOM. |
| `GOOD` | `GOOD` | Qualquer GPIO | Saída de indicação de alimentação correta do PMIC do EPD. |

</div>

<div align="center"><em>Tabela 5.5-9: Conexões dos sinais do display JDI paralelo</em></div>

<div align="center" markdown>

| Sinal do painel JDI paralelo | Sinal 57x | Descrição |
|:----------------------------|:------------|:-------------|
| `VST`/`GSP` | `LCDC_JDI_VST` | Sinal de início do driver vertical. |
| `ENB`/`GEN` | `LCDC_JDI_ENB` | Habilitação de escrita na memória de pixels. |
| `FRP`/`VA` | `#LPTIM2_OUTB` | Sinal de acionamento do cristal líquido para pixel desligado. |
| `HST`/`BSP` | `LCDC_JDI_HST` | Sinal de início do driver horizontal. |
| `R1` | `LCDC_JDI_R1` | Dados de imagem vermelhos dos pixels ímpares. |
| `G1` | `LCDC_JDI_G1` | Dados de imagem verdes dos pixels ímpares. |
| `B1` | `LCDC_JDI_B1` | Dados de imagem azuis dos pixels ímpares. |
| `VCOM` | `#LPTIM2_OUT` | Sinal de acionamento do eletrodo comum. |
| `B2` | `LCDC_JDI_B2` | Dados de imagem azuis dos pixels pares. |
| `G2` | `LCDC_JDI_G2` | Dados de imagem verdes dos pixels pares. |
| `R2` | `LCDC_JDI_R2` | Dados de imagem vermelhos dos pixels pares. |
| `HCK`/`BCK` | `LCDC_JDI_HCK` | Clock de deslocamento do driver horizontal. |
| `XFRP`/`VB` | `#LPTIM2_OUT` | Sinal de acionamento do cristal líquido para pixel ligado. |
| `XRST`/`INTB` | `LCDC_JDI_XRST` | Reset dos drivers horizontal e vertical. |
| `VCK`/`GCK` | `LCDC_JDI_VCK` | Clock de deslocamento do driver vertical. |

</div>

<div align="center"><em>Tabela 5.5-10: Conexões dos sinais do display JDI serial</em></div>

<div align="center" markdown>

| Sinal do painel JDI serial | Sinal 57x | Descrição |
|:--------------------------|:------------|:-------------|
| `SCLK` | `LCDC_JDI_SCLK` | Clock serial. |
| `SI` | `LCDC_JDI_SO` | Entrada de dados seriais. |
| `SCS` | `LCDC_JDI_SCS` | Seleção do chip. |
| `EXTCOMIN` | `LCDC_JDI_EXTCOMIN` | Entrada da polaridade de inversão de COM. |
| `DISP` | `LCDC_JDI_DISP` | Sinal de ligar/desligar o display. |

</div>

!!! note
    Seleção de GPIO para RGB, MCU8080 e EPD: abaixo de 30 MHz, qualquer pino pode ser configurado para o sinal LCDC correspondente. Acima de 30 MHz, os sinais LCDC roteados pela matriz devem usar `PA22` a `PA50`; `PA52` a `PA54` podem transportar apenas `B1` a `B6`. Em todos os casos, configure a capacidade de acionamento do GPIO como `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabela 5.5-11: Conexões dos sinais de toque e retroiluminação</em></div>

<div align="center" markdown>

| Sinal do painel CTP | Sinal 57x | Descrição |
|:--------------------|:------------|:-------------|
| Interrupção | Qualquer GPIO | Interrupção de estado do toque, compatível com despertar. |
| `I2C1_SCL` | Qualquer GPIO | Clock I2C do painel de toque. |
| `I2C1_SDA` | Qualquer GPIO | Dados I2C do painel de toque. |
| `BL_PWM` | Qualquer GPIO | Sinal PWM de controle da retroiluminação. |
| Reset | Qualquer GPIO | Sinal de reset. |

</div>

#### 5.5.3. Diretrizes para display e toque { #553-display-and-touch-guidelines }

- Controle a alimentação do display e da retroiluminação de forma independente; por padrão, mantenha ambas desligadas ao ligar o sistema, salvo quando o produto exigir outro comportamento.
- Para clocks de display de alta velocidade, reserve a posição de um resistor em série e, opcionalmente, de um capacitor NC em derivação para ajuste de EMI.
- Mantenha o FPC, o conector do display e as trilhas de toque afastados da área da antena de RF.
- Se o toque precisar despertar o sistema, conecte INT a um GPIO capaz de gerar o despertar.
- Compatibilize os domínios de tensão de IO do display, do controlador de toque e do MCU.
- Adicione proteção ESD às interfaces de display e toque expostas ao ambiente externo.
- Prefira grupos de pinos dedicados para os sinais de display SPI/QSPI. Para RGB, 8080, EPD e outras interfaces paralelas de alta velocidade, selecione grupos adequados à saída de alta velocidade e mantenha a temporização consistente no layout.
- Quando SPI/QSPI usar roteamento por matriz, mantenha o clock em 50 MHz ou menos e configure a capacidade de acionamento do GPIO como `DS1 = 0, DS0 = 1`.
- Para sinais RGB, MCU8080 e EPD acima de 30 MHz, prefira o roteamento por matriz em `PA22` a `PA50`; `PA52` a `PA54` podem transportar apenas `B1` a `B6`.

#### 5.5.4. Sequência de bring-up do display { #554-display-bring-up-sequence }

Faça o bring-up do display por etapas para evitar alterar muitas variáveis de uma só vez:

1. Verifique a alimentação, o reset, a retroiluminação/habilitação e a leitura do ID do painel.
2. Exiba cores sólidas na menor velocidade estável da interface; confirme a ordem RGB, a profundidade de cor e o sentido de varredura.
3. Verifique as janelas de atualização parcial, o sinal TE, a sincronização de quadros e o comportamento dos modos comando/vídeo.
4. Aumente a velocidade da interface gradualmente e, em seguida, adicione LVGL, ePicasso, DMA e o controle de brilho da retroiluminação.
5. Por fim, valide suspensão, despertar, display desligado/ligado, conexão e desconexão do carregador e operação com Bluetooth conectado.

Se houver ruído visual, tearing, cores incorretas ou falhas intermitentes de atualização, verifique primeiro a inicialização do painel, a temporização da interface, o formato de pixel, a janela de atualização, a coerência do cache e a integridade dos sinais no FPC.

#### 5.5.5. Áudio { #555-audio }

Avalie o áudio como um subsistema sensível a ruído: verifique em conjunto a polarização do microfone, as referências de áudio, as entradas analógicas, as saídas do DAC, os clocks de áudio digital, o controle do PA externo e a acústica do gabinete.

O SF32LB57x oferece duas entradas ADC analógicas, cada uma compatível com entrada single-ended ou diferencial; uma saída DAC analógica diferencial, que requer um PA externo para acionar alto-falante ou fone de ouvido; e duas interfaces PDM, que atendem até quatro microfones digitais no total.

#### 5.5.6. Entrada de áudio analógico { #556-analog-audio-input }

Diretrizes:

- Posicione os capacitores de desacoplamento de MIC_BIAS, AUD_VREF e AVDD33_AUD perto do chip.
- Adicione um capacitor de bloqueio de DC à entrada do microfone analógico; recomenda-se 2,2 µF ou mais.
- Posicione os componentes de entrada analógica perto dos pinos do chip.
- Mantenha ADCP e as demais trilhas analógicas curtas, protegidas e afastadas de fontes de ruído.
- Quando um GPIO multiplexado for usado como entrada analógica, configure o pino com alta impedância conforme necessário.

<div align="center"><em>Tabela 5.5-12: Conexões dos sinais de áudio</em></div>

<div align="center" markdown>

| Sinal de áudio | Sinal/pino 57x | Observações |
|:-------------|:-----------------|:------|
| `MIC_BIAS` | `PA56` | Alimentação de polarização do microfone. |
| `ADC1P` | `PA55` | Entrada de microfone single-ended ou entrada positiva diferencial. |
| `ADC1N` | `PA09` | Entrada negativa diferencial. |
| `ADC2P` | `PA10` | Entrada de microfone single-ended ou entrada positiva diferencial. |
| `ADC2N` | `PA11` | Entrada negativa diferencial. |
| `PDM1_CLK` / `PDM1_DATA` | Qualquer GPIO por roteamento matricial | Clock e dados da interface PDM 1. |
| `PDM2_CLK` / `PDM2_DATA` | Qualquer GPIO por roteamento matricial | Clock e dados da interface PDM 2. |
| `DAC1P` | `DACP` | Lado positivo da saída de áudio analógico diferencial. |
| `DAC1N` | `DACN` | Lado negativo da saída de áudio analógico diferencial. |

</div>

![Figura 5.5-1: Circuito de referência para entrada de microfone analógico single-ended](../../sf32-products/chips/assets/57x/SF32LB57x-Analog-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de referência para entrada de microfone analógico single-ended</em></div>

O circuito de referência mostra, para cada microfone, polarização por um resistor de 1 kΩ, desacoplamento da polarização de 4,7 µF, um capacitor série de entrada de 2,2 µF e um capacitor de 10 nF entre a entrada ADC e o terra. Esses valores pertencem ao circuito ilustrado; valide-os para o microfone e o projeto de entrada analógica escolhidos.

![Figura 5.5-2: Circuito de referência para entrada de microfone digital PDM](../../sf32-products/chips/assets/57x/SF32LB57x-PDM-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito de referência para entrada de microfone digital PDM</em></div>

O diagrama de referência conecta dois microfones a cada interface PDM, compartilhando os sinais de clock e dados dessa interface. Os pinos `SELECT` dos microfones são configurados de forma diferente para os canais esquerdo e direito, e cada microfone tem um capacitor local de 100 nF para desacoplamento da alimentação. O diagrama identifica os sinais de dados como `PDM1_DAT` e `PDM2_DAT`, enquanto a tabela usa `PDM1_DATA` e `PDM2_DATA`; confirme os nomes exatos dos pinos e da matriz para o dispositivo escolhido.

#### 5.5.7. Saída de áudio analógico { #557-analog-audio-output }

Diretrizes:

- Faça o roteamento de DACP/DACN como um par diferencial.
- Mantenha o par curto, com comprimentos casados e afastado de RF, DC/DC, USB, SDIO e clocks do display.
- Posicione as redes RC de adaptação da saída perto do chip.
- Mantenha a capacitância parasita dentro dos limites exigidos pelo áudio.
- Mantenha limpos e curtos os caminhos de alimentação e referência de áudio.

Siga o circuito recomendado na Figura 5.5-3. O filtro passa-baixa diferencial dentro da caixa tracejada deve ficar próximo aos pinos do chip para suprimir interferências de alta frequência e melhorar a relação sinal-ruído da saída de áudio.

![Figura 5.5-3: Circuito de referência da saída de áudio analógico para o PA](../../sf32-products/chips/assets/57x/SF32LB57x-DAC-PA.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito de referência da saída de áudio analógico para o PA</em></div>

O estágio NS4150B ilustrado usa alimentação de +5 V, capacitores de acoplamento DAC de 100 nF, resistores de entrada de 43,2 kΩ e PA51 para habilitar o amplificador, com pull-down de 5,1 MΩ. O desenho indica corrente estática de 3 mA para o amplificador, 0,1 µA em desligamento e 0,6 µA pelo pull-down. Esses valores são do circuito de exemplo, não especificações universais de PA; valide-os para o amplificador escolhido e os requisitos do sistema.

#### 5.5.8. Áudio digital { #558-digital-audio }

Para I2S e PDM:

- Compatibilize a tensão de IO do periférico.
- Verifique o comprimento das trilhas de clock, a diafonia e a continuidade do plano de referência de terra.
- Revise a sequência de alimentação dos microfones, do codec, do PA e do MCU.
- Garanta que os periféricos de áudio digital entrem em um estado seguro durante a suspensão.

#### 5.5.9. Validação de áudio { #559-audio-validation }

Problemas de áudio frequentemente envolvem ao mesmo tempo o hardware, o gabinete, o ganho configurado no software e o ruído da alimentação. Valide:

- O ruído em repouso, durante a gravação, durante a reprodução e durante a carga.
- A diafonia durante a atualização do display, a transmissão Bluetooth, a vibração do motor, a conexão USB e a atividade do SDIO.
- A tensão de polarização do microfone, a polaridade e a capacitância do capacitor de bloqueio de DC e a faixa de modo comum da entrada.
- O nível diferencial de saída de DACP/DACN, o casamento da carga e a faixa de entrada do PA externo.
- A frequência de clock, o mapeamento de canais e a configuração da taxa de amostragem de PDM/I2S.

#### 5.5.10. Câmera { #5510-camera }

A interface de câmera aceita DVP de até 16 bits, SPI com 2 linhas de dados e QSPI com 4 linhas de dados.

Diretrizes:

- Confirme a largura da interface, o clock, os sinais de sincronização, as linhas de dados e o pinmux.
- Permita que o MCU controle a alimentação, o reset, PWDN e o clock da câmera.
- Agrupe as trilhas de dados e clock da câmera por comprimento e mantenha-as afastadas de RF e sinais analógicos.
- Garanta uma referência de terra contínua para o roteamento de câmera em alta velocidade.
- Adicione proteção ESD ao conector ou FPC da câmera quando necessário.

Sequência recomendada de bring-up da câmera:

- Primeiro, confirme a alimentação, o reset, PWDN, MCLK e o caminho de controle I2C/SPI da câmera.
- Leia o ID do sensor e verifique a tabela de inicialização e o formato de saída.
- Use um modo de baixa resolução e baixa taxa de quadros para validar PCLK, VSYNC, HSYNC/HREF e o mapeamento das linhas de dados.
- Aumente a resolução e a taxa de quadros somente depois de estabilizar o caminho básico; em seguida, teste em conjunto com a atualização do display, gravações no armazenamento e conexão Bluetooth.

<div align="center"><em>Tabela 5.5-13: Conexões dos sinais de câmera por sensor de exemplo</em></div>

<div align="center" markdown>

| GC032A SPI4 | GC032A DVP8 | GC2145 DVP8 | OV2640 DVP10 | Sinal 57x | Descrição |
|:------------|:------------|:------------|:--------------|:-----------|:------------|
| `SBDA` | `SBDA` | `SIO-D` | `SIO-D` | Qualquer GPIO | Sinal de dados I2C. |
| `SBCL` | `SBCL` | `SIO-C` | `SIO-C` | Qualquer GPIO | Sinal de clock I2C. |
| `RESET` | `RESET` | `RESET` | `RESET` | Qualquer GPIO | Saída de reset. |
| NC | `VSYNC` | `VSYNC` | `VSYNC` | `DCMI_VSYNC` | Entrada de sincronização vertical. |
| `PWDN` | `PWDN` | `PWDN` | `PWDN` | Qualquer GPIO | Saída de desligamento (ativa em nível alto). |
| NC | `HSYNC` | `HREF` | `HREF` | `DCMI_HSYNC` | Entrada de sincronização horizontal. |
| NC | `D7` | `D7` | `Y9` | `DCMI_DI7` | Entrada do bit [7] da porta de vídeo YUV/RGB. |
| `MCLK` | `MCLK` | `MCLK` | `MCLK` | Qualquer GPIO (GPTIM) | Saída do clock do sistema. |
| NC | `D6` | `D6` | `Y8` | `DCMI_DI6` | Entrada do bit [6] da porta de vídeo YUV/RGB. |
| NC | `D5` | `D5` | `Y7` | `DCMI_DI5` | Entrada do bit [5] da porta de vídeo YUV/RGB. |
| `SCK` | `PCLK`/`SCK` | `PCLK` | `PCLK` | `DCMI_CLK` | Entrada do clock de pixel. |
| NC | `D4` | `D4` | `Y6` | `DCMI_DI4` | Entrada do bit [4] da porta de vídeo YUV/RGB. |
| `SD0` | `D0` | `D0` | `Y2` | `DCMI_DI0` | Entrada do bit [0] da porta de vídeo YUV/RGB. |
| `SD3` | `D3` | `D3` | `Y5` | `DCMI_DI3` | Entrada do bit [3] da porta de vídeo YUV/RGB. |
| `SD1` | `D1` | `D1` | `Y3` | `DCMI_DI1` | Entrada do bit [1] da porta de vídeo YUV/RGB. |
| `SD2` | `D2` | `D2` | `Y4` | `DCMI_DI2` | Entrada do bit [2] da porta de vídeo YUV/RGB. |
| NC | NC | NC | `Y1` | NC | Não conectado para este sensor. |
| NC | NC | NC | `Y0` | NC | Não conectado para este sensor. |

</div>

Para câmeras DVP de 10 bits, use conexão de 8 bits quando houver poucos GPIOs; conecte todos os bits de dados somente se o projeto tiver GPIOs disponíveis suficientes.

#### 5.5.11. Botões e motor { #5511-buttons-and-motor }

- O botão de ligar/reset deve usar `PA34` com nível ativo alto; o pino permanece em nível baixo por padrão e vai para nível alto quando pressionado. `PA34` aceita reset por hardware ao manter o botão pressionado por 10 segundos; o resistor pull-down de 10 kΩ deve ficar na placa principal.
- Em projetos de botões GPADC com divisor resistivo, diferencie os botões pela tensão do divisor e coloque um capacitor de filtro de 0,1 µF para terra perto do pino, para melhorar a precisão da amostragem.
- A escada resistiva ilustrada usa resistores de botão de 1,1 kΩ, 2,8 kΩ e 5,1 kΩ, além de um pull-down de 10 kΩ e um capacitor de filtro de 100 nF. Use esses valores como referência e valide os limiares do ADC considerando a tensão de alimentação e as tolerâncias dos resistores do projeto.
- Adicione proteção ESD aos botões externos.

![Figura 5.5-4: Circuito de referência para o botão de ligar e o botão GPADC](../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito de referência para o botão de ligar e o botão GPADC</em></div>

Ao implementar o feedback háptico, use o circuito de referência do motor vibratório do SF32LB57x. Em produtos de baixo consumo, recomenda-se que a alimentação do motor seja comutável; o pino PWM/de controle não deve conflitar com os requisitos de boot, display, armazenamento ou depuração.
