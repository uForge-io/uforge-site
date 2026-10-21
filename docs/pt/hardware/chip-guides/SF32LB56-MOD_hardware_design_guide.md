---
icon: lucide/book-check
description: "Guia de projeto de hardware do módulo MCU Bluetooth SF32LB56-MOD: alimentação, interfaces e integração à PCB."
tags:
  - Hardware
  - Módulos
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56-MOD { #sf32lb56-mod-hardware-design-guide }

## 1. Introdução { #1-introduction }

**SF32LB56-MOD** é uma família de módulos MCU Bluetooth de baixo consumo e uso geral da SiFli, baseada na série SF32LB56xV.

Este guia usa o **datasheet DS5602-SF32LB56-MOD V0.3** como referência e reúne as informações específicas do módulo necessárias para projetar o esquemático, planejar o layout da PCB, validar o hardware e preparar a produção. O conteúdo inclui as variantes de memória, a interface de 89 pinos, três trilhos de alimentação, interfaces de display/áudio/armazenamento, o posicionamento da antena, requisitos de manuseio e o checklist do esquemático.

!!! note "Fonte e recomendações"
    Salvo indicação explícita de que se trata de orientação de integração ou recomendação de projeto, os valores técnicos abaixo seguem o **datasheet DS5602-SF32LB56-MOD V0.3**.

## 2. Visão geral do dispositivo { #2-device-overview }

### 2.1 Arquitetura { #21-architecture }

O SF32LB56-MOD usa uma plataforma de MCU com dois núcleos da série SF32LB56xV. O HCPU processa aplicações e gráficos, enquanto o LCPU executa tarefas sempre ativas com baixo consumo. O HCPU é um núcleo Arm Cortex-M33 STAR-MC1 de até 240 MHz; o LCPU é do mesmo tipo, de até 96 MHz. Ambos oferecem suporte a FPU e MPU.

O módulo oferece conectividade Bluetooth 5.3, aceleração gráfica, entrada e saída de áudio, interfaces de memória externa, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC e acesso para depuração e download de programas.

### 2.2 Variantes { #22-variants }

<div align="center"><em>Tabela 2.2-1: Variantes da série SF32LB56-MOD</em></div>

<div align="center" markdown>

| Código do módulo | Flash principal | PSRAM | Flash de backup | Temperatura de operação | Dimensões |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

### 2.3 Principais recursos de hardware { #23-major-hardware-features }

<div align="center"><em>Tabela 2.3-1: Principais recursos de hardware</em></div>

<div align="center" markdown>

| Área | Recursos |
| :--- | :--- |
| CPU | HCPU até 240 MHz, LCPU até 96 MHz; ambos Arm Cortex-M33 STAR-MC1 |
| Conectividade sem fio | Bluetooth 5.3 de modo duplo, com suporte a BLE Audio |
| Gráficos | ePicasso 2.0, eZip 2.0, TurboPixel; LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Áudio | DAC de 24 bits, ADC Sigma-Delta de 24 bits, 2 interfaces PDM (PDM1/PDM2), cada uma compatível com dois microfones, um em cada canal (esquerdo e direito), até 4 no total; 1 interface I2S |
| IA/DSP | Acelerador matricial de até 1,92 GOPS, FFT, FIR, CORDIC |
| Armazenamento | Opções de Flash/PSRAM no módulo; suporte a MPI3 e SD/SDIO/eMMC |
| Segurança | AES, HASH, CRC, TRNG, Secure Boot, eFuse de 1024 bits, certificação PSA nível 1 |
| Antena | Antena integrada à PCB ou antena externa por conector compatível com IPEX |

</div>

### 2.4 Aplicações típicas { #24-typical-applications }

Entre as aplicações típicas estão smartwatches avançados, pulseiras inteligentes, equipamentos médicos vestíveis, dispositivos de fitness, painéis de controle para bicicletas elétricas, chaves automotivas, controles remotos vestíveis para veículos, eletrodomésticos inteligentes, fechaduras inteligentes, dispositivos com interface HMI gráfica, hubs de sensores industriais, terminais de monitoramento industrial, hubs de sensores de baixo consumo e dispositivos Bluetooth Mesh.

## 3. Projeto em resumo { #3-design-at-a-glance }

### 3.1 Resumo de engenharia em uma página { #31-one-page-engineering-summary }

<div align="center"><em>Tabela 3.1-1: Resumo de engenharia</em></div>

<div align="center" markdown>

| Tema | Orientação de projeto |
| :--- | :--- |
| Trilhos de alimentação | Use VDD_3V3, VDD_1V8 e VDDIO. As três tensões devem subir simultaneamente. |
| Desacoplamento local | Coloque capacitores de 4,7 µF próximos aos pinos do módulo em VDD_3V3, VDD_1V8 e VDDIO. |
| Nível de E/S | VDDIO aceita 1,7–3,6 V, mas PA00–PA11 são fixos em 3,3 V. Verifique cada periférico conectado. |
| Depuração/download | UART4_TXD/UART4_RXD são os pinos UART padrão para logs, download e depuração; SWDIO/SWCLK permitem download por SWD. |
| Modo de inicialização | BOOT_MODE em nível alto seleciona o modo de download; em nível baixo, o modo de usuário. |
| Conflito com Flash interna | PA06–PA11 são conectados por padrão à Flash interna do módulo e não ficam disponíveis para uso externo. |
| Conflito SDIO/MPI3 | SDIO e MPI3 compartilham recursos de E/S e não podem ser usados simultaneamente. |
| Fontes de despertar | PA50, PA51, PB32 e PB35 podem receber interrupções enquanto o MCU está em suspensão. |
| PWRKEY | PB32 aciona o reset quando PWRKEY permanece em nível alto por 10 s; exige um resistor pull-down de 10 kΩ. |
| Antena | Mantenha a área da antena da PCB livre de cobre, trilhas, componentes e metal; se a antena não puder ultrapassar a borda da placa, reserve uma área livre de pelo menos 15 mm. |
| Fabricação | MSL 3; use o módulo em até 168 horas após abrir a embalagem, a 25 ± 5 °C e 60% RH, ou seque-o em estufa antes de reutilizá-lo. |

</div>

### 3.2 Componentes externos recomendados { #32-recommended-external-components }

<div align="center"><em>Tabela 3.2-1: Componentes externos recomendados</em></div>

<div align="center" markdown>

| Circuito | Componente | Posicionamento / observações |
| :--- | :--- | :--- |
| VDD_3V3 | Capacitor de 4,7 µF | Posicione próximo ao pino de alimentação do módulo. |
| VDD_1V8 | Capacitor de 4,7 µF | Posicione próximo ao pino de alimentação do módulo. |
| VDDIO | Capacitor de 4,7 µF | Posicione próximo ao pino de alimentação do módulo. |
| PB32/PWRKEY | Pull-down de 10 kΩ | Necessário para o reset por pressão prolongada com nível alto ativo. |
| Sinais RGB do LCD | Resistores de 33–100 Ω em série | Instale-os nas linhas de sinal RGB. |
| UART de depuração PA16/PA17 | Resistores de 100 Ω em série | Necessários na interface UART multiplexada usada para download e depuração. |
| Painel de toque / conectores do usuário | Proteção ESD | Reserve dispositivos de proteção ESD em interfaces expostas, como TP. |

</div>

### 3.3 Árvore de alimentação { #33-power-tree }

VDD_3V3 alimenta PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2 e a Flash interna do módulo. A SiFli recomenda um LDO para esse trilho. VDD_1V8 alimenta a memória integrada ao MCU, e VDDIO alimenta as portas de E/S VDDIOA/VDDIOB do MCU.

!!! info "Figura 3.3-1: Diagrama de alimentação do SF32LB56-MOD"
    Consulte a Figura 7-1 da DS5602 V0.3.

### 3.4 Diagrama de blocos do sistema { #34-system-block-diagram }

O diagrama de blocos do módulo mostra o MCU SF32LB56xV, os recursos de memória, o caminho de RF, a opção de antena, as entradas de alimentação e os grupos de interfaces externas.

!!! info "Figura 3.4-1: Diagrama funcional do SF32LB56-MOD"
    Consulte a Figura 2-1 da DS5602 V0.3.

## 4. Fluxo de projeto de hardware { #4-hardware-design-flow }

### 4.1 Sequência de projeto { #41-design-sequence }

1. Selecione a variante de memória conforme o tamanho do firmware, os recursos gráficos, a necessidade de armazenamento externo e o custo-alvo.
2. Escolha a variante com antena na PCB ou antena externa antes de congelar o projeto mecânico.
3. Defina a arquitetura dos trilhos VDD_3V3, VDD_1V8 e VDDIO e confirme que as três tensões sobem simultaneamente.
4. Atribua os pinos de display, armazenamento, USB, áudio, sensores, despertar, depuração e teste de produção.
5. Resolva conflitos de recursos compartilhados, principalmente SDIO versus MPI3 e os pinos PA06–PA11 usados pela Flash interna.
6. Inclua capacitores de desacoplamento, proteção ESD, pull-down de PWRKEY e resistores em série para LCD e UART de depuração.
7. Posicione o módulo respeitando a área livre e a folga necessárias para a antena.
8. Antes da liberação, revise o esquemático e a PCB com o checklist da Seção 7.

### 4.2 Sequência de revisão { #42-review-sequence }

Faça a revisão por etapas: esquemático, multiplexação de pinos, sequência de alimentação, RF/antena, layout, bring-up da primeira unidade, validação de RF, avaliação ambiental e de confiabilidade e teste de produção.

### 4.3 Marcos { #43-milestones }

<div align="center"><em>Tabela 4.3-1: Marcos recomendados de hardware</em></div>

<div align="center" markdown>

| Marco | Evidência necessária |
| :--- | :--- |
| Congelamento do esquemático | Variante selecionada, conflitos de pinos resolvidos, trilhos verificados e checklist concluído. |
| Congelamento do layout | Área de exclusão da antena verificada, capacitores de desacoplamento posicionados e interfaces de alta velocidade revisadas. |
| Bring-up de EVT | Testes iniciais dos trilhos, do modo de inicialização, de UART/SWD, Flash, display, USB, áudio e RF aprovados. |
| DVT | Alcance RF, corrente, comportamento térmico, suspensão/despertar, estratégia ESD e impacto do gabinete validados. |
| Liberação para produção | Programação, pontos de teste, regras de inspeção, requisitos de MSL e soldagem por refusão, e registros de revisão concluídos. |

</div>

## 5. Projeto do esquemático { #5-schematic-design }

### 5.1 Sistema de alimentação { #51-power-system }

#### 5.1.1 Alimentação { #511-power-supply }

<div align="center"><em>Tabela 5.1-1: Trilhos de alimentação</em></div>

<div align="center" markdown>

| Trilho | Faixa de operação recomendada | Finalidade |
| :--- | :--- | :--- |
| VDD_3V3 | 2,97–3,6 V | PVDD do MCU, domínios analógicos de 3,3 V, domínio analógico de RF, VDDIOA2 e Flash interna. |
| VDD_1V8 | 1,7–1,95 V | Alimentação da memória integrada ao encapsulamento do MCU. |
| VDDIO | 1,7–3,6 V | Alimentação de E/S VDDIOA/VDDIOB do MCU. |

</div>

VDD_3V3, VDD_1V8 e VDDIO devem subir simultaneamente. Coloque um capacitor de 4,7 µF próximo a cada pino de alimentação do módulo. Embora VDDIO possa operar de 1,7 V a 3,6 V, o datasheet informa separadamente que PA00–PA11 têm nível fixo de 3,3 V e não acompanham VDDIO.

#### 5.1.2 Modos de operação { #512-operating-modes }

BOOT_MODE seleciona o comportamento de inicialização: nível alto para o modo de download e nível baixo para o modo de usuário. Mantenha a rede BOOT_MODE em um nível estável durante o reset e a programação em produção. PB32/PWRKEY aciona o reset quando PWRKEY permanece em nível alto por 10 s; para isso, é necessário um resistor pull-down de 10 kΩ.

### 5.2 Temporização e RF { #52-timing-and-rf }

#### 5.2.1 Clock { #521-clock }

A plataforma do módulo usa um oscilador a cristal de 48 MHz e oferece osciladores RC de baixo consumo de 1 MHz/48 MHz, um oscilador RC de consumo ultrabaixo de 10 kHz e um oscilador a cristal opcional de 32,768 kHz. Mantenha o layout e o aterramento dos circuitos de clock de acordo com o projeto de referência do módulo e evite processos ultrassônicos que possam submeter o cristal interno a esforço mecânico.

#### 5.2.2 RF { #522-rf }

<div align="center"><em>Tabela 5.2-1: Resumo de RF Bluetooth</em></div>

<div align="center" markdown>

| Parâmetro | Valor |
| :--- | :--- |
| Faixa de frequência Bluetooth | 2402–2480 MHz |
| Potência máxima de transmissão BLE | 19 dBm |
| Faixa de controle de potência RF BLE | -20 a 19 dBm |
| Sensibilidade BLE 1 Mbps | -100 dBm com dirty TX desligado (dirty off), -99,3 dBm com dirty TX ligado (dirty on) |
| Sensibilidade BLE 2 Mbps | -97 dBm com dirty TX desligado (dirty off), -96,5 dBm com dirty TX ligado (dirty on) |
| Potência máxima de transmissão BR | 19 dBm |
| Potência máxima de transmissão EDR | 13 dBm |
| Sensibilidade BR | -96,3 dBm com dirty TX desligado (dirty off), -94 dBm com dirty TX ligado (dirty on) |
| Sensibilidade EDR2 | -95,5 dBm com dirty TX desligado (dirty off), -95 dBm com dirty TX ligado (dirty on) |
| Sensibilidade EDR3 | -88,5 dBm com dirty TX desligado (dirty off), -87 dBm com dirty TX ligado (dirty on) |

</div>

O módulo aceita a antena PCB integrada ou uma antena externa por meio de um conector compatível com IPEX. Valide a distância de comunicação e o desempenho de RF no gabinete final, não apenas em bancada aberta.

### 5.3 Interfaces de usuário { #53-user-interfaces }

#### 5.3.1 Display { #531-display }

O controlador LCD aceita o modo serial DBI SPI, Dual-SPI, Quad-SPI, o modo paralelo 8080, DPI/RGB e JDI. A figura de atribuição de pinos recomendada no datasheet associa os grupos LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper e os grupos no estilo Raspberry Pi aos pinos do módulo.

Adicione resistores em série de 33–100 Ω às linhas de sinal RGB do LCD. Mantenha curtas e consistentes as trilhas dos sinais RGB, da interface SPI do display e do painel de toque; preveja proteção contra ESD nas interfaces expostas do painel de toque e dos conectores.

!!! info "Figura 5.3-1: Atribuição de pinos recomendada para a placa de desenvolvimento"
    Consulte a Figura 7-6 da DS5602 V0.3.

#### 5.3.2 Áudio { #532-audio }

O módulo disponibiliza saídas analógicas do DAC de áudio, MIC_BIAS, MIC_ADC_IN, I2S e pinos compatíveis com PDM. O DAC de áudio é uma saída de 24 bits que aceita taxas de amostragem de 8 kHz a 48 kHz, com SNR e faixa dinâmica de 109 dB. O ADC de áudio é uma entrada Sigma-Delta de 24 bits que aceita taxas de amostragem de 8 kHz a 48 kHz, com SNR e faixa dinâmica de 99 dB.

Afaste as trilhas de áudio analógico dos nós de comutação ruidosos, dos clocks do LCD e das estruturas de feed da antena (ponto e linha de alimentação de RF). Posicione os filtros de MIC_BIAS e MIC_ADC_IN perto do circuito do microfone conectado.

#### 5.3.3 Botões { #533-buttons }

PB32 é a entrada PWRKEY e permite acionar o reset mantendo PWRKEY em nível alto por 10 s. Instale o resistor pull-down de 10 kΩ exigido e evite que o circuito do botão fique flutuante durante o transporte, no Deep Sleep ou nas sequências de alimentação.

#### 5.3.4 Motores e cargas PWM { #534-motor-and-pwm-loads }

Os pinos identificados como GPTIM na figura de atribuição de pinos recomendada do datasheet aceitam saída PWM. Use drivers externos para motores, retroiluminação, buzzers e outras cargas; não acione cargas indutivas ou de corrente elevada diretamente pelos GPIOs do módulo.

### 5.4 Armazenamento e conectividade { #54-storage-and-connectivity }

#### 5.4.1 Armazenamento { #541-storage }

A família de módulos oferece Flash principal conforme a SKU, OPI-PSRAM de 4+8 MB e Flash QSPI-NOR de backup de 1 MB. O MPI3 pode conectar Flash SPI NOR ou SPI NAND externa, mas PA06–PA11 estão conectados por padrão à Flash interna do módulo e não ficam disponíveis externamente. SDIO e MPI3 compartilham recursos de E/S e não podem ser usados simultaneamente.

#### 5.4.2 Sensores { #542-sensors }

O GPADC oferece conversão de 12 bits, taxa de amostragem de até 4 MS/s, faixa de entrada single-ended de 0–3,3 V, faixa diferencial de -2,1 V a +2,1 V, disparo por software ou hardware e DMA. Os pinos identificados como GPADC_CHx aceitam entrada analógica; mantenha as trilhas analógicas curtas, filtradas e afastadas do ruído de comutação do LCD e de RF.

#### 5.4.3 UART/I2C { #543-uarti2c }

A UART aceita operação full-duplex de até 6 Mbps. O I2C oferece os modos Standard de 100 kbps, Fast de 400 kbps, Fast-mode Plus de 1 Mbps e High-speed de 3,4 Mbps. Muitos GPIOs são multiplexados como `PAxx_I2C_UART` ou `PBxx_I2C_UART`; confirme o plano final de multiplexação antes de congelar o esquemático.

UART4_TXD no pino 6 e UART4_RXD no pino 7 formam a porta serial padrão de console e permitem download e depuração do programa. PA16 e PA17 podem ser multiplexados como DBG_UART e requerem resistores em série de 100 Ω quando usados para download e depuração.

#### 5.4.4 USB, SPI, SDIO e I2S { #544-usb-spi-sdio-and-i2s }

USB2.0 FS aceita os modos Host/Device e inclui PHY integrado. O SPI aceita os formatos SSP/SPI e Microwire; o SPI de HPSYS opera até 48 MHz e o de LPSYS até 24 MHz. O SDMMC1 aceita SD 3.0, SDIO 3.0 e eMMC 4.5.1 nos modos SDR e DDR; o SDMMC2 aceita funções SD/SDIO/eMMC nos modos SDR até 48 MHz. O I2S aceita os modos master/slave, full-duplex e os formatos left/right/standard, com largura PCM de até 24 bits.

### 5.5 Fabricação { #55-manufacturing }

#### 5.5.1 Depuração { #551-debug }

SWDIO no pino 79 e SWCLK no pino 80 são os pinos SWD de depuração e download. Mantenha o acesso ao SWD em protótipos iniciais e gabaritos de produção. Disponibilize também a interface padrão de download/depuração UART4, a menos que o produto tenha outro método de programação aprovado.

#### 5.5.2 Produção { #552-production }

Reserve pontos de acesso em produção para alimentação, terra, modo de inicialização, reset/PWRKEY, SWD, download UART e qualquer interface de calibração na placa ou teste de RF. O software de teste final deve cobrir inicialização, Flash, display, painel de toque, áudio, USB, sensores, comunicação RF, comportamento de suspensão/despertar e consumo de corrente.

## 6. Layout da PCB { #6-pcb-layout }

### 6.1 Mecânica e footprint { #61-mechanical-and-footprint }

O módulo mede 18,0 × 32,9 × 3,1 mm. Use o footprint recomendado no datasheet e confirme com a montadora da PCB o padrão de pads, a expansão da máscara de solda, as aberturas do estêncil, a área de exclusão e o limite de ocupação do componente (courtyard).

!!! info "Figura 6.1-1: Dimensões do módulo SF32LB56-MOD"
    Consulte a Figura 8-1 da DS5602 V0.3.

!!! info "Figura 6.1-2: Footprint recomendado para a PCB"
    Consulte a Figura 8-2 da DS5602 V0.3. As dimensões estão em milímetros.

### 6.2 Posicionamento da antena { #62-antenna-placement }

Se o produto usar a antena PCB integrada, mantenha a área da antena livre de componentes e metal. Sempre que possível, posicione o módulo de modo que a área da antena ultrapasse a borda da placa portadora, com o ponto de alimentação próximo à borda da placa.

Se a antena não puder ultrapassar a borda da placa, reserve uma área livre de pelo menos 15 mm. Não coloque cobre, trilhas ou componentes nessa área e, sempre que viável, remova o material da placa portadora sob a antena PCB.

!!! info "Figura 6.2-1: Posicionamento recomendado do módulo"
    Consulte a Figura 8-4 da DS5602 V0.3.

!!! info "Figura 6.2-2: Área livre da antena PCB"
    Consulte a Figura 8-5 da DS5602 V0.3.

### 6.3 Conector para antena externa { #63-external-antenna-connector }

Para projetos com antena externa, o datasheet descreve um conector de antena externa de primeira geração compatível com a série Hirose U.FL, I-PEX MHF I e Amphenol AMC.

!!! info "Figura 6.3-1: Dimensões do conector para antena externa"
    Consulte a Figura 8-3 da DS5602 V0.3.

### 6.4 Checklist de layout { #64-layout-checklist }

<div align="center"><em>Tabela 6.4-1: Checklist de layout da PCB</em></div>

<div align="center" markdown>

| Área | Verificação |
| :--- | :--- |
| Alimentação | Os capacitores de 4,7 µF ficam próximos aos pinos VDD_3V3, VDD_1V8 e VDDIO. |
| Terra | Os pinos de terra do módulo estão conectados a um sistema de baixa impedância, com vias de stitching próximas às trilhas de alta velocidade e RF. |
| Antena | A área de exclusão da antena está livre de cobre, trilhas, componentes, parafusos, blindagens, metal da bateria e metal do gabinete. |
| Display | As linhas LCD RGB/SPI são curtas, consideram a impedância e incluem os resistores em série exigidos. |
| USB | USB DP/DM são roteados como par diferencial casado, com proteção ESD próxima ao conector. |
| Áudio analógico | MIC_BIAS, MIC_ADC_IN e as saídas DAC estão afastados dos reguladores chaveados, clocks do LCD e regiões de feed de RF da antena. |
| Depuração | O acesso a SWD e ao download/depuração UART está disponível nos protótipos e gabaritos de produção. |

</div>

## 7. Validação do hardware { #7-hardware-validation }

### 7.1 Características elétricas { #71-electrical-characteristics }

<div align="center"><em>Tabela 7.1-1: Limites máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Descrição | Mín. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentação de 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentação de 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrada de alimentação de E/S | -0,3 | 3,6 | V |
| Tstore | Temperatura de armazenamento | -40 | 125 | °C |

</div>

<div align="center"><em>Tabela 7.1-2: Condições de operação recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Descrição | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentação de 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentação de 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrada de alimentação de E/S | 1,7 | - | 3,6 | V |
| TA | Temperatura de operação | -40 | - | 85 | °C |

</div>

<div align="center"><em>Tabela 7.1-3: Características elétricas CC a 3,3 V e 25 °C</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitância do pino | 2,5 | 3 | 3,5 | pF |
| VIH | Tensão de entrada em nível alto | 0,7 × VDD | - | VDD | V |
| VIL | Tensão de entrada em nível baixo | VSS | - | 0,3 × VDD | V |
| IIH | Corrente de entrada em nível alto | - | 10 | 40 | nA |
| IIL | Corrente de entrada em nível baixo | - | 10 | 40 | nA |
| VOH | Tensão de saída em nível alto, carga de alta impedância | 0,8 × VDD | - | VDD | V |
| VOL | Tensão de saída em nível baixo, carga de alta impedância | VSS | - | 0,2 × VDD | V |
| IOH | Corrente de acionamento da saída em nível alto | 24 | 30 | 38 | mA |
| IOL | Corrente de acionamento da saída em nível baixo | 24 | 30 | 38 | mA |
| RPU | Pull-up interno | 7 | 10 | 20 | kΩ |
| RPD | Pull-down interno | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tensão para liberar o reset | 0,7 × VDD | - | VDD | V |
| VIL_nRST | Tensão para ativar o reset | VSS | - | 0,3 × VDD | V |

</div>

A alimentação de E/S é VDD. VOH e VOL são medidos com uma carga de alta impedância.

### 7.2 Consumo de corrente { #72-power-consumption }

<div align="center"><em>Tabela 7.2-1: Corrente de Bluetooth e BLE a 3,3 V, potência TX de 0 dBm</em></div>

<div align="center" markdown>

| Modo | Condição | Corrente típica |
| :--- | :--- | :-: |
| BT Sniff | intervalo de 50 ms | 196,0 µA |
| BT Sniff | intervalo de 1 s | 13,8 µA |
| BLE ADV | intervalo de 50 ms | 228,7 µA |
| BLE ADV | intervalo de 1 s | 15,7 µA |
| BLE Connection | intervalo de 50 ms | 172,8 µA |
| BLE Connection | intervalo de 1 s | 11,5 µA |
| Scan | Inquiry Scan ou Page Scan | 36,8 µA |
| Ambos os Scans | Inquiry Scan e Page Scan | 64,0 µA |
| Standby | - | 4,6 µA |

</div>

<div align="center"><em>Tabela 7.2-2: Corrente do processador</em></div>

<div align="center" markdown>

| Carga de trabalho | Domínio | Frequência | Corrente | Eficiência |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9,38 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7,90 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 48 MHz | 0,92 mA | 30,92 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0,55 mA | 15,13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7,54 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6,30 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0,70 mA | 25,75 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0,44 mA | 10,63 µA/MHz |

</div>

### 7.3 Checklist do esquemático { #73-schematic-checklist }

<div align="center"><em>Tabela 7.3-1: Checklist de projeto do esquemático</em></div>

<div align="center" markdown>

| Nº | Verificação |
| :-: | :--- |
| 1 | A faixa de entrada de VDD_3V3 é 2,97–3,6 V; coloque um capacitor de 4,7 µF próximo ao pino do módulo. |
| 2 | A faixa de entrada de VDD_1V8 é 1,7–1,95 V; coloque um capacitor de 4,7 µF próximo ao pino do módulo. |
| 3 | A faixa de entrada de VDDIO é 1,7–3,6 V; coloque um capacitor de 4,7 µF próximo ao pino do módulo. |
| 4 | O nível da interface de E/S do módulo é 3,3 V nos pinos especificados; os níveis dos periféricos conectados devem ser compatíveis. |
| 5 | Se o módulo estiver equipado com Flash interna, PA06, PA07, PA08, PA09, PA10 e PA11 não podem ser usados externamente. |
| 6 | SDIO e MPI3 compartilham recursos de E/S e não podem ser usados simultaneamente. |
| 7 | PA50, PA51, PB32 e PB35 podem receber interrupções enquanto o MCU está em suspensão. |
| 8 | PB32 aciona o reset quando PWRKEY permanece em nível alto por 10 s; adicione um pull-down de 10 kΩ. |
| 9 | Os pinos identificados como GPADC_CHx aceitam entrada analógica de 0–3,3 V. |
| 10 | Os pinos identificados como GPTIM aceitam saída PWM. |
| 11 | Interfaces como TP precisam de dispositivos de proteção contra ESD. |
| 12 | Os sinais LCD RGB precisam de resistores em série de 33–100 Ω. |
| 13 | PA16 e PA17 multiplexados como DBG_UART são pinos de download/depuração do programa e precisam de resistores em série de 100 Ω. |

</div>

### 7.4 Armazenamento, manuseio e montagem { #74-storage-handling-and-assembly }

<div align="center"><em>Tabela 7.4-1: Requisitos de armazenamento, manuseio e montagem</em></div>

<div align="center" markdown>

| Item | Requisito |
| :--- | :--- |
| Armazenamento em embalagem MBB selada | Atmosfera sem condensação, abaixo de 40 °C / 90% RH. |
| Sensibilidade à umidade | MSL 3. |
| Após abrir a embalagem a vácuo | Use em até 168 horas a 25 ± 5 °C / 60% RH ou seque o módulo em estufa antes de reutilizá-lo. |
| ESD HBM | ±2000 V. |
| ESD CDM | ±500 V. |
| Soldagem por refusão (reflow) | A SiFli recomenda realizar apenas um ciclo de soldagem por refusão no módulo. |
| Processo ultrassônico | Evite soldagem ou limpeza ultrassônica; a vibração pode danificar ou degradar os cristais internos. |

</div>

!!! info "Figura 7.4-1: Perfil de temperatura de soldagem por refusão"
    Consulte a Figura 9-1 da DS5602 V0.3.

## 8. Documentos relacionados { #8-related-documents }

<div align="center"><em>Tabela 8-1: Documentos e produtos relacionados</em></div>

<div align="center" markdown>

| Tipo | Item |
| :--- | :--- |
| Datasheet do módulo | [Datasheet DS5602-SF32LB56-MOD V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| Datasheet do chip | Datasheet do chip SF32LB56x |
| Guia da placa de desenvolvimento | Manual do usuário do SF32LB56-DevKit-LCD |
| Família de chips | Série SF32LB56xV |
| Módulo | SF32LB56-MOD |
| Placa de desenvolvimento | SF32LB56-DevKit-LCD |

</div>

## 9. Apêndices { #appendices }

### 9.1. Apêndice A. Referência de planejamento de pinos { #appendix-a-pin-planning-reference }

A DS5602 V0.3 contém a tabela completa de definição dos 89 pinos e a vista superior do pinout. A tabela abaixo destaca os pinos e grupos de sinais que mais afetam o risco do esquemático, o acesso à inicialização/depuração ou o planejamento de recursos compartilhados.

<div align="center"><em>Tabela 9.1-1: Pinos e grupos de sinais críticos</em></div>

<div align="center" markdown>

| Pino / grupo | Função / restrição |
| :--- | :--- |
| Pino 6 PB17 | UART4_TXD, TX da UART padrão de console/download/depuração. |
| Pino 7 PB16 | UART4_RXD, RX da UART padrão de console/download/depuração. |
| Pino 25 BOOT_MODE | Nível alto: modo de download; nível baixo: modo de usuário. |
| Pino 26 VDD_3V3 | Trilho de 3,3 V, faixa de operação de 2,97–3,6 V. |
| Pino 27 VDD_1V8 | Trilho de 1,8 V, faixa de operação de 1,7–1,95 V. |
| Pino 29 VDDIO | Trilho de E/S, faixa de operação de 1,7–3,6 V. |
| Pinos 43/44 | Saídas diferenciais do DAC AU_DACP / AU_DACN. |
| Pino 46 MIC_BIAS | Saída de polarização do microfone. |
| Pino 47 MIC_ADC_IN | Entrada analógica do ADC de microfone. |
| Pinos 67–72 PA06–PA11 | Conectados por padrão à Flash interna; indisponíveis externamente. |
| Pino 79 PB13 | SWDIO para depuração/download. |
| Pino 80 PB15 | SWCLK para depuração/download. |
| PA50, PA51, PB32, PB35 | Pinos capazes de gerar interrupção e despertar durante a suspensão. |
| PA00–PA11 | Nível da interface fixo em 3,3 V, independente de VDDIO. |

</div>

## 10. Histórico de revisões { #appendix-b-revision-history }

### 10.1. Histórico de revisões do guia { #guide-revision-history }

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do guia</em></div>

<div align="center" markdown>

| Versão | Data | Observações |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | Guia inicial de projeto de hardware do módulo SF32LB56-MOD, baseado na DS5602-SF32LB56-MOD V0.3. |

</div>

### 10.2. Histórico de revisões do datasheet de origem { #source-datasheet-revision-history }

<div align="center"><em>Tabela 10.2-1: Histórico de revisões do datasheet de origem</em></div>

<div align="center" markdown>

| Data | Versão | Notas da versão |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | Atualizadas as descrições do ADC e do DAC de áudio no Capítulo 4. |
| 2025-02 | 0.2 | Atualizadas informações sobre os pinos do módulo e itens relacionados. |
| 2025-01 | 0.1 | Versão preliminar. |

</div>
