---
icon: lucide/circuit-board
hide:
    - navigation
description: "Orientações de esquemático de RF e interfaces do SF32LB52x: casamento de antena, display, áudio, botões e motor de vibração."
tags:
    - Hardware
    - Microcontrolador
---

# Guia de hardware do SF32LB52x — RF e interfaces de usuário { #sf32lb52x-hardware-design-guide-rf-user-interfaces }

!!! note "Parte do guia de hardware do SF32LB52x"
    Esta página trata das Seções 5.4–5.5 das orientações de esquemático: RF e interfaces de usuário. Volte a [Sistema mínimo, alimentação e clock](SF32LB52x_schematic_design.md), continue em [Armazenamento e fabricação](SF32LB52x_schematic_storage_mfg.md) ou consulte o [Checklist do esquemático](SF32LB52x_schematic_checklist.md) para a revisão item a item.

### 5.4. RF { #54-rf }

#### 5.4.1. Esquemático de RF e caminho da antena { #541-rf-schematic-and-antenna-path }

**Resumo**

- Roteie o caminho da antena com impedância controlada de 50 Ω.
- Reserve uma rede de casamento em π mesmo que a antena escolhida já esteja casada.
- Mantenha o caminho de RF curto, blindado e isolado do ruído dos cristais, DC/DC, display e carregador.

**Objetivo do projeto**

Maximize a sensibilidade Bluetooth e o desempenho radiado, mantendo o controle de impedância, minimizando descontinuidades e reservando flexibilidade suficiente na rede de casamento para o ajuste final da antena.

A impedância característica das trilhas de RF é 50 Ω. Se a antena já estiver casada, não são necessários componentes adicionais de RF, mas ainda se recomenda reservar uma rede de casamento em π para filtragem de emissões espúrias ou ajuste da antena.

![Figura 5.4-1: Esquemático de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Esquemático de RF</em></div>

A figura 5.4-1 mostra um capacitor em série de 15 pF e 50 V (C0323); as posições em derivação C0318 e C0319 estão marcadas como NF (não montadas). Esses valores são do circuito de referência, não uma adaptação válida para qualquer antena. Posicione a rede perto do pino de RF do chip e defina sua montagem final com base em medições do produto montado.

#### 5.4.2. Revisão e ajuste de RF { #542-rf-review-and-tuning }

**Erros frequentes: RF**

- Posicionar a rede de casamento perto da antena, em vez de próxima do pino de RF do chip.
- Rotear RF com vias desnecessárias ou curvas fechadas.
- Compartilhar retornos de terra ruidosos com DC/DC, display, USB ou circuitos de carregamento.
- Não reservar a rede de casamento e deixar de prever um meio viável de ajustar a antena.

**Checklist de RF**

- [ ] A impedância-alvo das trilhas de RF foi definida com o fabricante da PCB.
- [ ] A rede de casamento em π foi reservada e posicionada perto do chip.
- [ ] A cerca de vias de terra e a área de exclusão de RF foram revisadas.
- [ ] Preveja o acesso para ajuste da antena e testes de certificação antes de finalizar o projeto do gabinete.

### 5.5. Interfaces de usuário { #55-user-interfaces }

#### 5.5.1. Display { #551-display }

**Resumo**

- As interfaces incluem SPI, Dual-SPI, Quad-SPI e JDI serial. EPD está disponível nos modelos compatíveis com alimentação externa regulada.
- A resolução máxima documentada do display é 512 x 512.
- Recomenda-se revisar em conjunto reset, TE, PWM do backlight, I2C de toque, interrupção de toque e sequenciamento da alimentação do display.

**Objetivo do projeto**

Escolha uma interface de display que atenda às metas de largura de banda e consumo, preservando o comportamento de despertar, reset, backlight e toque durante a operação normal e nos estados de baixo consumo.

O chip oferece interfaces SPI de 3 e 4 linhas, SPI com duas ou quatro linhas de dados e JDI serial. Os modos de profundidade de cor são 16,7 milhões de cores (RGB888), 262 mil cores (RGB666), 65 mil cores (RGB565) e 8 cores (RGB111), com resolução de até 512x512.

Modelos de controlador LCD suportados:

<div align="center"><em>Tabela 5.5-1: Controladores LCD suportados</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Resolução | Tipo | Interface |
|:---|:---|:---|:---|:---|
| RM69090 | Raydium | 368x448 | AMOLED | SPI de 3/4 linhas, SPI com duas/quatro linhas de dados, MIPI-DSI |
| RM69330 | Raydium | 454x454 | AMOLED | SPI de 3/4 linhas, SPI com duas/quatro linhas de dados, barramento MCU 8080 de 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368x448 | AMOLED | SPI com quatro linhas de dados, MIPI-DSI |
| SH8601A | Shine World Technology | 454x454 | AMOLED | SPI de 3/4 linhas, SPI com duas/quatro linhas de dados, barramento MCU 8080 de 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356x400 | TFT | SPI com quatro linhas de dados |
| GC9C01 | Galaxycore | 360x360 | TFT | SPI com quatro linhas de dados |
| GC9B71 | Galaxycore | 320x380 | TFT | SPI com quatro linhas de dados |
| ST77903 | Sitronix | 400x400 | TFT | SPI com quatro linhas de dados |
| ICNA3311 | Chipone | 454x454 | AMOLED | SPI com quatro linhas de dados |
| FT2308 | FocalTech | 410x494 | AMOLED | SPI com quatro linhas de dados |

</div>

!!! note "As interfaces do controlador não são as capacidades do MCU"
    A Tabela 5.5-1 lista as interfaces oferecidas pelos CIs controladores de LCD, não interfaces necessariamente disponíveis no SF32LB52x. Uma entrada com MIPI-DSI ou barramento MCU 8080 de 8 bits não comprova que o MCU ofereça essa interface. Escolha uma interface compatível tanto com o modelo exato do MCU quanto com o controlador.

##### 5.5.1.1. Interface de display SPI/QSPI { #5511-spiqspi-display-interface }

<div align="center"><em>Tabela 5.5-2: Conexões dos sinais SPI/QSPI</em></div>

<div align="center" markdown>

| Sinal SPI | Pino | Descrição |
|:---|:---|:---|
| CSx | PA03 | Seleção do chip |
| WRx_SCL | PA04 | Clock |
| DCx | PA06 | Dados/comando em SPI de 4 fios; dado 1 em Quad-SPI |
| SDI_RDx | PA05 | Entrada de dados em SPI de 3/4 fios; dado 0 em Quad-SPI |
| SDO | PA05 | Saída de dados em SPI de 3/4 fios; conectar diretamente a SDI_RDx |
| D[0] | PA07 | Dado 2 em Quad-SPI |
| D[1] | PA08 | Dado 3 em Quad-SPI |
| RESET | PA00 | Reset do display |
| TE | PA02 | Sinal de sincronismo para evitar rasgo de imagem (tearing effect), enviado ao MCU |

</div>

##### 5.5.1.2. Interface de display JDI { #5512-jdi-display-interface }

!!! important "Terminologia JDI na fonte"
    As notas de aplicação originais descrevem JDI serial no resumo de recursos, mas identificam a tabela de pinos abaixo como JDI paralelo. As atribuições da fonte são mantidas aqui. Antes de finalizar o esquemático, confirme o modo JDI pretendido, os requisitos do painel e o suporte do modelo exato do MCU. Não trate as interfaces serial e paralela como intercambiáveis.

<div align="center"><em>Tabela 5.5-3: Conexões dos sinais JDI paralelo</em></div>

<div align="center" markdown>

| Sinal JDI | I/O | Descrição |
|:---|:---|:---|
| JDI_VCK | PA39 | Clock de deslocamento do driver vertical |
| JDI_VST | PA08 | Sinal de início do driver vertical |
| JDI_XRST | PA40 | Sinal de reset dos drivers horizontal e vertical |
| JDI_HCK | PA41 | Clock de deslocamento do driver horizontal |
| JDI_HST | PA06 | Sinal de início do driver horizontal |
| JDI_ENB | PA07 | Sinal de habilitação de escrita da memória de pixels |
| JDI_R1 | PA05 | Dados de imagem vermelhos (pixels ímpares) |
| JDI_R2 | PA42 | Dados de imagem vermelhos (pixels pares) |
| JDI_G1 | PA04 | Dados de imagem verdes (pixels ímpares) |
| JDI_G2 | PA43 | Dados de imagem verdes (pixels pares) |
| JDI_B1 | PA03 | Dados de imagem azuis (pixels ímpares) |
| JDI_B2 | PA02 | Dados de imagem azuis (pixels pares) |

</div>

##### 5.5.1.3. Interface de display EPD { #5513-epd-display-interface }

=== "52B/D/E/G/J (alimentação externa regulada)"

    O chip oferece uma interface EPD paralela de 8 bits:

    <div align="center"><em>Tabela 5.5-4: Conexões dos sinais EPD</em></div>

    <div align="center" markdown>

    | Sinal EPD | I/O | Descrição |
    |:---|:---|:---|
    | CLK | PA04 | Clock do driver de colunas |
    | CKV/CPV | GPIO | Clock do driver de linhas |
    | SPH | PA06 | Pulso de início do driver de colunas |
    | SPV/STV | GPIO | Pulso de início do driver de linhas |
    | LE | GPIO | Habilitação de latch do driver de colunas |
    | OE | GPIO | Habilitação de saída do driver de colunas |
    | D0–D7 | PA07/PA08/PA37/PA39/PA40/PA41/PA42/PA43 | Dados do driver de colunas, bits 0–7 |
    | GMODE | GPIO | Seleção do modo de saída do driver de linhas |
    | VPOS/VNEG | TPS | Alimentações positiva/negativa do driver de colunas |
    | VGH/VGL | TPS | Alimentações positiva/negativa do driver de linhas |
    | VCOM | TPS | Conexão comum |
    | TPS_WAKEUP/TPS_PWRUP | GPIO | Controle de despertar / inicialização do PMIC TPS |
    | TPS_SDA/TPS_SCL | I2C | Interface I2C do PMIC TPS |
    | TPS_PWRCOM | GPIO | VCOM_CTRL do PMIC TPS, habilitação de VCOM |
    | TPS_GOOD | GPIO | Saída power-good do PMIC TPS |

    </div>

    !!! note
        Os sinais marcados como "PA**" devem usar a atribuição fixa de I/O indicada. Os sinais marcados como GPIO podem ser atribuídos a qualquer I/O. Os sinais marcados como TPS são saídas do PMIC do display (TPS) para o painel. Os sinais marcados como I2C exigem um I/O com capacidade I2C.

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    !!! info "Não se aplica"
        A nota de aplicação oficial da SiFli para SF32LB520/3/5/7 não inclui um projeto de referência para a interface EPD paralela. Se o produto precisar de suporte a display EPD, consulte a documentação de 52B/D/E/G/J e confirme diretamente com o suporte FAE da SiFli a viabilidade para o modelo alimentado por bateria.

##### 5.5.1.4. Interface de toque e backlight { #5514-touch-and-backlight-interface }

O SF32LB52x oferece uma interface I2C para o controlador de toque, com entrada de interrupção de estado do toque, além de um sinal PWM para habilitar o backlight e controlar seu brilho.

<div align="center"><em>Tabela 5.5-5: Conexões de toque e backlight</em></div>

<div align="center" markdown>

| Sinal de toque/backlight | Pino | Descrição |
|:---|:---|:---|
| Interrupt | PA43 | Interrupção de estado do toque (capaz de despertar o sistema) |
| I2C1_SCL | PA42 | Clock I2C de toque |
| I2C1_SDA | PA41 | Dados I2C de toque |
| BL_PWM | PA01 | Controle PWM do backlight |
| Reset | PA44 | Reset do controlador de toque |

</div>

**Erros frequentes: display**

- Esquecer os pinos de reset, TE, PWM do backlight ou interrupção de toque na atribuição dos pinos.
- Pressupor suporte a EPD no modelo alimentado por bateria sem confirmar o dispositivo exato e o projeto de referência original.
- Alimentar o display por um LDO interno, em vez de uma alimentação externa corretamente dimensionada.
- Rotear clocks e dados do display junto a cristais, RF, áudio ou nós analógicos de alta impedância.

**Checklist de display**

- [ ] A interface, profundidade de cor, resolução e largura de banda atendem ao painel escolhido.
- [ ] Reset, TE, PWM do backlight, I2C de toque e interrupção de toque foram atribuídos e documentados.
- [ ] A alimentação e o sequenciamento do display são compatíveis com standby e despertar.
- [ ] O plano de bring-up cobre reset, leitura de ID/dados do painel quando disponível, backlight, interrupção de toque e primeira imagem.

#### 5.5.2. Interface de áudio { #552-audio-interface }

**Resumo**

- A entrada de microfone analógico é não diferencial (single-ended) e requer um capacitor de bloqueio de DC.
- A saída DAC é diferencial; recomenda-se roteá-la como um par diferencial curto e blindado.
- A filtragem da alimentação de áudio e o posicionamento de MIC_BIAS influenciam significativamente o ruído.

**Objetivo do projeto**

Preserve a qualidade do sinal analógico, mantendo os caminhos do microfone, DAC, polarização e alimentação de áudio curtos, filtrados, blindados e afastados de fontes de ruído digital e de chaveamento.

A interface de áudio oferece:

1. Uma entrada ADC não diferencial para microfone analógico, com capacitor de bloqueio de DC de pelo menos 2,2 uF em série; o microfone recebe alimentação da saída MIC_BIAS do chip.
2. Uma saída DAC diferencial para um amplificador de potência (PA) de áudio externo: roteie como par diferencial com blindagem de terra adequada e mantenha a capacitância das trilhas < 10 pF e o comprimento < 2 cm.

<div align="center"><em>Tabela 5.5-6: Conexões dos sinais de áudio</em></div>

<div align="center" markdown>

| Sinal de áudio | Pino | Descrição |
|:---|:---|:---|
| BIAS | MIC_BIAS | Alimentação do microfone |
| AU_ADC1P | ADCP | Entrada não diferencial de microfone analógico |
| AU_DAC1P | DACP | Saída analógica diferencial, positiva |
| AU_DAC1N | DACN | Saída analógica diferencial, negativa |

</div>

![Figura 5.5-1: Circuito de entrada de microfone MEMS analógico não diferencial](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de entrada de microfone MEMS analógico não diferencial</em></div>

![Figura 5.5-2: Circuito de entrada de microfone ECM analógico não diferencial](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito de entrada de microfone ECM analógico não diferencial</em></div>

Os circuitos de referência dos microfones filtram MIC_BIAS com um resistor em série de 1 kΩ e um capacitor para o terra de 1 uF e 6,3 V. O circuito ECM também usa um resistor de polarização do microfone de 4,7 kΩ. Ambos mostram um capacitor de entrada de 0,01 uF para o terra: ele é um filtro em derivação, não o capacitor de acoplamento em série exigido no caminho do sinal. Preserve essa distinção ao adaptar os circuitos.

![Figura 5.5-3: Circuito do amplificador de potência de áudio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito do amplificador de potência de áudio analógico</em></div>

**Erros frequentes: áudio**

- Rotear trilhas do microfone ou DAC perto de clocks do display, DC/DC, RF, USB ou SDIO.
- Posicionar os capacitores de filtro de MIC_BIAS ou AVDD33_AUD longe dos pinos do chip.
- Tratar DACP/DACN como sinais independentes não diferenciais, em vez de um par diferencial.
- Permitir capacitância parasita elevada ou trilhas longas na saída analógica.

**Checklist de áudio**

- [ ] O posicionamento dos componentes de MIC_BIAS, ADCP, DACP e DACN foi revisado com base nos exemplos de layout.
- [ ] DACP/DACN estão roteados como um par diferencial curto e blindado.
- [ ] Os capacitores de filtro de áudio estão próximos dos pinos, com conexões de terra de baixo ruído.
- [ ] O plano de bring-up cobre a polarização do microfone, o piso de ruído do ADC, a saída DAC, a habilitação do PA e o ruído audível.

!!! important "Complete os caminhos do microfone e do DAC"
    A fonte conecta MEMS_MIC_ADC_IN e ECM_MIC_ADC_IN a ADCP. Inclua em série o capacitor de bloqueio de DC de pelo menos 2,2 uF exigido acima; o capacitor de 0,01 uF ligado ao terra nos circuitos de microfone não o substitui. Posicione o filtro passa-baixas diferencial no quadro tracejado da Figura 5.5-3 perto do MCU, mantendo a capacitância das trilhas de saída do DAC abaixo de 10 pF e o comprimento abaixo de 2 cm.

#### 5.5.3. Botões { #553-buttons }

**Resumo**

- `PA34` oferece suporte ao botão de alimentação, liga/desliga e reset por pressão longa.
- O botão com encoder rotativo deve seguir o circuito de referência e ser revisado em conjunto com os requisitos de despertar, debounce e ESD.

**Objetivo do projeto**

Garanta entradas de usuário e reset confiáveis, evitando eventos de despertar indevidos, estados de reset permanentes e corrente de fuga elevada em standby pelas redes de pull-up/pull-down.

##### 5.5.3.1. Botão de alimentação { #5531-power-button }

PA34 oferece reset por pressão longa e pode ser usado em um botão que combine liga/desliga e reset por pressão longa. Como o reset é ativo em nível alto, recomenda-se manter o estado padrão em nível baixo com pull-down e levá-lo a nível alto quando o botão for pressionado.

![Figura 5.5-4: Circuito do botão de alimentação/reset por pressão longa](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito do botão de alimentação/reset por pressão longa</em></div>

O circuito de referência usa R0703 (5,1 kΩ) entre VSYS_3V3 e o botão, R0702 (100 kΩ) para manter PA34 em nível baixo e C0720 (0,1 uF) conectado ao terra. Há também um componente de proteção ESD. Esses valores descrevem o projeto ilustrado; ao adaptá-lo, verifique os limiares de entrada, a eliminação de repiques, as fugas e os tempos de reset.

##### 5.5.3.2. Botão com encoder rotativo mecânico { #5532-mechanical-rotary-encoder-button }

Use o projeto de referência como base para o circuito do botão com encoder rotativo.

![Figura 5.5-5: Circuito do botão com encoder rotativo mecânico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-5: Circuito do botão com encoder rotativo mecânico</em></div>

Os sinais A e B do encoder se conectam a PA35 e PA36 por resistores de 0 Ω. Cada sinal tem um pull-up de 200 kΩ para VDD33_LDO2_VOUT e proteção ESD; C0703 e C0706 estão marcados como NF (não montados). Os nomes dos sinais também indicam funções USB/UART multiplexadas. Verifique conflitos de pinos antes de adotar essa atribuição.

**Erros frequentes: botões**

- Deixar `PA34` flutuante ou com polarização padrão incorreta.
- Esquecer que os circuitos de botões podem precisar de despertar, proteção ESD, debounce e acesso para testes de produção.
- Compartilhar conexões de botões com funções ruidosas ou de alta carga sem verificar a confiabilidade do despertar.

**Checklist de botões**

- [ ] O nível padrão do botão de alimentação/reset por pressão longa está correto.
- [ ] O comportamento de despertar foi verificado nos estados de baixo consumo pretendidos.
- [ ] Os requisitos de proteção ESD e debounce mecânico foram revisados.
- [ ] O plano de bring-up inclui pressão curta, pressão longa, despertar e reset.

#### 5.5.4. Motor de vibração { #554-vibration-motor }

**Resumo**

- Use uma saída PWM para controlar o motor de vibração por meio de um estágio de acionamento externo.
- Alimente o motor por uma linha com chave de alimentação quando a corrente em standby for relevante.

**Objetivo do projeto**

Garanta feedback háptico repetível, sem que os picos de corrente do motor, o ruído de chaveamento ou as fugas em standby afetem alimentações sensíveis e circuitos de despertar.

O SF32LB52x oferece uma saída PWM para controlar o motor de vibração por meio de um estágio de acionamento externo.

![Figura 5.5-6: Circuito de acionamento do motor de vibração (referência SF32LB520/3/5/7; funcionalmente equivalente no modelo com alimentação externa regulada)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-6: Circuito de acionamento do motor de vibração (referência SF32LB520/3/5/7; funcionalmente equivalente no modelo com alimentação externa regulada)</em></div>

![Figura 5.5-7: Circuito de acionamento do motor de vibração (referência 52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-7: Circuito de acionamento do motor de vibração (referência 52B/D/E/G/J)</em></div>

Os dois circuitos de motor usam PA20 para controlar um MOSFET de lado baixo, com um pull-down de 1 MΩ no gate. A figura 5.5-6 alimenta o motor pela saída VDD33_VOUT2 de 3,3 V do chip. A figura 5.5-7 usa LDOs externos separados de 3,3 V para o motor e PVDD, alimentados por VSYS/VBAT. A função de controle é equivalente, mas as conexões de alimentação não são intercambiáveis.

**Checklist do motor**

- [ ] O driver do motor, a proteção contra flyback/ESD e a capacidade de corrente da alimentação foram revisados.
- [ ] A alimentação do motor fica desligada por padrão em standby e no modo de envio.
- [ ] A atribuição do pino PWM não conflita com display, armazenamento ou depuração.
- [ ] O plano de bring-up cobre a varredura do duty cycle PWM, a corrente de partida, o ruído audível e as fugas em standby.
