---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de projeto esquemático do MCU SF32LB58x: alimentação, geração de sinais de clock, RF, interfaces de usuário, armazenamento, conectividade e fabricação."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB58x — Diretrizes para o esquemático {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "Parte do guia de projeto de hardware SF32LB58x"
    Esta página aborda a seção 5, Diretrizes para o esquemático. Comece pela [visão geral do guia de projeto de hardware SF32LB58x](SF32LB58x_hardware_design_guide.md) para selecionar o dispositivo e consultar o fluxo completo de projeto; depois, consulte o [Checklist do esquemático](SF32LB58x_schematic_checklist.md) ou avance para as [Diretrizes de layout da PCB](SF32LB58x_pcb_layout.md).

## 5. Diretrizes para o Esquemático {#5-schematic-design-guidelines}

Este capítulo segue o fluxo de projeto do esquemático do SF32LB58x: começa pelo sistema mínimo e prossegue com alimentação, geração de clock, RF, interfaces de usuário, armazenamento, conectividade e fabricação. Cada subseção explica a finalidade do projeto, os requisitos do circuito e os riscos mais comuns, além de indicar o que verificar antes da liberação.

<div align="center"><em>Tabela 5-1: Visão geral das seções do esquemático</em></div>

<div align="center" markdown>

| Grupo | Principais decisões | Evidências para liberação |
|:---|:---|:---|
| Projeto do sistema mínimo | Variante e encapsulamento exatos, alimentação e reset, clocks, inicialização e armazenamento, depuração e recuperação | Revisão inicial de bring-up e plano de inicialização/recuperação |
| Sistema de alimentação | PMIC do sistema, trilhos da PMU do chip, indutores BUCK, capacitores dos LDOs, reset e fontes de despertar em baixo consumo | Árvore de alimentação, configuração do PMIC, medições dos trilhos e revisão de POR/BOR/reset |
| Geração de clock | Cristais de 48 MHz e 32,768 kHz | Verificação das especificações dos cristais, plano dos capacitores de casamento e capturas do layout dos cristais |
| RF | Casamento de RF e caminho da antena | Plano de impedância, rede de casamento de RF, área de exclusão da antena e capturas do layout |
| Interfaces de usuário | Display, painel de toque/retroiluminação, áudio, botões, motor e controle PBR | Esquemáticos das interfaces, atribuição dos pinos, sequenciamento de alimentação e revisão analógica/de áudio |
| Armazenamento e conectividade | Modo de inicialização, MPI4, SD1/SD2, eMMC/SD NAND/cartão SD e USB 2.0 HS | Configuração de inicialização, plano de alimentação do armazenamento e evidências do roteamento diferencial/de alta velocidade |
| Fabricação | SWD, saídas de depuração UART, acesso aos testes de produção e checklists do esquemático/PCB | Desenho dos pontos de teste, caminho de recuperação e plano de gravação/calibração em produção |

</div>

### 5.1. Projeto do sistema mínimo {#51-minimum-system-design}

Use o projeto do sistema mínimo como primeiro ponto de controle da revisão do esquemático. Antes de adicionar periféricos específicos do produto, confirme o dispositivo e o encapsulamento exatos, as linhas de alimentação e os clocks necessários, o comportamento do reset, a configuração de inicialização e o armazenamento, além de um caminho prático para depuração e recuperação. Essas decisões determinam se a placa poderá ligar, inicializar e entrar em operação de forma confiável.

<div align="center"><em>Tabela 5.1-1: Verificações do projeto do sistema mínimo</em></div>

<div align="center" markdown>

| Bloco | Verificação de projeto para SF32LB58x | Orientação detalhada |
|:---|:---|:---|
| Dispositivo e encapsulamento | Confirme o número de peça exato e o encapsulamento; verifique se a pinagem e a configuração de memória integrada atendem às interfaces planejadas. | [Variantes e encapsulamentos](SF32LB58x_hardware_design_guide.md#32-variants) |
| Alimentação | Inclua as linhas necessárias do PMU e externas, os componentes BUCK e o desacoplamento local. | [Sistema de alimentação](#51-power-system) |
| Clocks | Inclua o cristal principal de 48 MHz e o cristal RTC de 32,768 kHz, respeitando os requisitos especificados de carga e posicionamento. | [Geração de clock](#52-clock-generation) |
| Reset | Implemente o circuito RC externo de `RSTN` referenciado ao domínio de alimentação `PVDD1`. | [Sequência de alimentação e reset](#5115-power-up-sequencing-and-reset) |
| Modo de inicialização | Mantenha o pino `Mode` em nível estável com um resistor de 10 kΩ; reserve acesso para teste de produção e um jumper de recuperação nas placas de teste. | [Configuração de inicialização](#551-boot-configuration) |
| Armazenamento de inicialização | Selecione uma interface de armazenamento compatível e confira a pinagem, a tensão de I/O e a alimentação para o dispositivo escolhido. | [Armazenamento](#552-storage) |
| Acesso para bring-up | Reserve acesso na placa a SWD e aos sinais UART de depuração necessários, além das referências de alimentação e terra para a sonda. | [Interface de depuração e download](#561-debug-and-download-interface) |
| Comportamento em baixo consumo | Confirme as fontes de despertar e o controle da alimentação externa exigidos pelos modos de suspensão previstos. | [Modos de operação e fontes de despertar](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. Sistema de alimentação {#51-power-system}

#### 5.2.1. Alimentação {#511-power-supply}
A série SF32LB58x integra uma unidade de alimentação PMU com duas saídas BUCK, que requerem um indutor e um capacitor externos conectados de volta à entrada interna de alimentação, além de três saídas LDO que exigem capacitores externos. Em projetos de relógios inteligentes, o SF32LB58x pode ser combinado com o PMIC SF30147C da SiFli para alimentar o chip e os periféricos associados.

##### 5.2.1.1. Distribuição de alimentação do PMIC SiFli {#5111-sifli-pmic-power-distribution}

O SF30147C é um PMIC altamente integrado e de alta eficiência, desenvolvido para produtos vestíveis de consumo ultrabaixo. Ele reúne quatro LDOs, cada um com ampla faixa de tensões de entrada e saída e corrente de carga de até 100 mA. O SF30147C também oferece sete chaves de carga com baixa corrente de fuga e baixa resistência de condução (RDS(on)): duas chaves de alta tensão para periféricos alimentados diretamente pela bateria, como um amplificador de potência (PA) de áudio, e cinco chaves de baixa tensão para periféricos alimentados em 1,8 V. O SF32LB58x usa dois GPIOs para emular um sinal TWI e controlar o SF30147C.

<div align="center"><em>Tabela 5.2-1: Distribuição de alimentação do SF30147C</em></div>

<div align="center" markdown>

| Pino de alimentação do SF30147C | Tensão mín. (V) | Tensão máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|
| VBUCK | 1.8 | 1.8 | 500 | Alimenta PVDD1, PVDD2, VDDIOA, VDDIOA2, VDDIOB, AVDD_BRF, AVDD18_DSI e outros trilhos de 1,8 V do SF32LB58x |
| LVSW1 | 1.8 | 1.8 | 100 | Alimentação lógica do PA Classe K com I2S |
| LVSW2 | 1.8 | 1.8 | 100 | Alimentação de 1,8 V do acelerômetro |
| LVSW3 | 1.8 | 1.8 | 150 | Alimentação de 1,8 V do sensor de frequência cardíaca |
| LVSW4 | 1.8 | 1.8 | 150 | Alimentação de 1,8 V do LCD |
| LVSW5 | 1.8 | 1.8 | 150 | Alimentação do núcleo do eMMC |
| LDO1 | 2.8 | 3.3 | 100 | Alimenta AVDD33_USB, AVDD33_ANA, AVDD33_AUD, AVDDIOA2 e outros trilhos de 3,3 V do SF32LB58x |
| LDO2 | 2.8 | 3.3 | 100 | Alimentação do eMMC ou SD NAND |
| LDO3 | 2.8 | 3.3 | 100 | Alimentação de 3,3 V do LCD |
| LDO4 | 2.8 | 3.3 | 100 | Alimentação de 3,3 V do sensor de frequência cardíaca |
| HVSW1 | 2.8 | 5 | 150 | Alimentação do PA analógico Classe K |
| HVSW2 | 2.8 | 5 | 150 | Alimentação do GPS |

</div>

Consulte o datasheet do SF30147C para obter todos os detalhes.

##### 5.2.1.2. Requisitos de alimentação do SF32LB58x {#5112-sf32lb58x-power-requirements}

As especificações de alimentação da PMU integradas à série SF32LB58x são as seguintes.

<div align="center"><em>Tabela 5.2-2: Especificações de alimentação da PMU</em></div>

<div align="center" markdown>

| Pino de alimentação da PMU | Tensão mín. (V) | Tensão típica (V) | Tensão máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1.71 | 1.8 | 3.6 | 100 | Entrada de alimentação PVDD1 |
| PVDD2 | 1.71 | 1.8 | 3.6 | 50 | Entrada de alimentação PVDD2 |
| BUCK1_LX / BUCK1_FB | - | 1.25 | - | 100 | A saída BUCK1_LX conecta-se ao indutor e à entrada interna de alimentação 1; a outra extremidade do indutor conecta-se a um capacitor externo |
| BUCK2_LX / BUCK2_FB | - | 0.9 | - | 50 | A saída BUCK2_LX conecta-se ao indutor e à entrada interna de alimentação 2; a outra extremidade do indutor conecta-se a um capacitor externo |
| LDO_VOUT1 | - | 1.1 | - | 100 | Saída do LDO; requer capacitor externo |
| VDD_RET | - | 0.9 | - | 1 | Saída do LDO RET; requer capacitor externo |
| VDD_RTC | - | 1.1 | - | 1 | Saída do LDO RTC; requer capacitor externo |
| MIC_BIAS | 1.4 | - | 2.8 | - | Saída de alimentação do microfone |

</div>

Os demais pinos de alimentação que exigem uma fonte externa estão especificados a seguir.

<div align="center"><em>Tabela 5.2-3: Especificações das demais alimentações</em></div>

<div align="center" markdown>

| Outros pinos de alimentação | Tensão mín. (V) | Tensão típica (V) | Tensão máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | Entrada de alimentação de RF |
| AVDD18_DSI | 1.71 | 1.8 | 2.5 | 20 | Entrada de alimentação MIPI DSI; deixe sem conexão se não for usada |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | Entrada de alimentação analógica e do PA de RF |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | Entrada de alimentação de áudio analógico |
| AVDD33_USB | 3.15 | 3.3 | 3.45 | 50 | Entrada de alimentação USB |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de I/O para PA12–PA93 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de I/O para PA0–PA11 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de I/O para PB |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPA |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPB |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPC |
| GPADC_VREFP | - | - | - | - | Entrada da tensão de referência do GPADC; exige apenas um capacitor, sem alimentação externa |
| AUD_VREF | - | - | - | - | Entrada da tensão de referência de áudio; exige apenas um capacitor, sem alimentação externa |

</div>

##### 5.2.1.3. Valores recomendados dos capacitores {#5113-recommended-capacitor-values}

<div align="center"><em>Tabela 5.2-4: Capacitores de desacoplamento recomendados</em></div>

<div align="center" markdown>

| Pino de alimentação | Capacitor | Descrição |
|:---|:---|:---|
| PVDD1 | 0.1 uF + 10 uF | Coloque pelo menos um capacitor de 10 uF e outro de 0,1 uF (dois no total) próximos ao pino |
| PVDD2 | 0.1 uF + 10 uF | Coloque pelo menos um capacitor de 10 uF e outro de 0,1 uF (dois no total) próximos ao pino |
| BUCK1_LX / BUCK1_FB | 0.1 uF + 4.7 uF | Coloque pelo menos um capacitor de 4,7 uF e outro de 0,1 uF (dois no total) próximos ao pino |
| BUCK2_LX / BUCK2_FB | 0.1 uF + 4.7 uF | Coloque pelo menos um capacitor de 4,7 uF e outro de 0,1 uF (dois no total) próximos ao pino |
| LDO_VOUT1 | 4.7 uF | Coloque pelo menos um capacitor de 4,7 uF próximo ao pino |
| VDD_RET | 0.47 uF | Coloque pelo menos um capacitor de 0,47 uF próximo ao pino |
| VDD_RTC | 0.1 uF | Coloque pelo menos um capacitor de 0,1 uF próximo ao pino |
| AVDD_BRF | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |
| AVDD18_DSI | 4.7 uF | Coloque pelo menos um capacitor de 4,7 uF próximo ao pino |
| AVDD33_ANA | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |
| AVDD33_AUD | 4.7 uF | Coloque pelo menos um capacitor de 4,7 uF próximo ao pino |
| AVDD33_USB | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |
| MIC_BIAS | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |
| VDDIOA / VDDIOA2 / VDDIOB | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 uF | Coloque pelo menos um capacitor de 1 uF próximo ao pino |

</div>

##### 5.2.1.4. Seleção do indutor BUCK {#5114-buck-inductor-selection}

!!! important "Parâmetros principais do indutor de alimentação"
    L (indutância) = 4,7 uH, DCR (resistência em corrente contínua) ≤ 0,4 Ω, Isat (corrente de saturação) ≥ 500 mA

##### 5.2.1.5. Sequência de inicialização e reset {#5115-power-up-sequencing-and-reset}

A série SF32LB58x integra circuitos de POR (Power-On Reset, reset na energização) e BOR (Brownout Reset, reset por subtensão), além de aceitar o sinal externo de reset por hardware RSTN.

Recomenda-se ligar o sinal de reset RSTN com pull-up ao domínio de tensão de entrada PVDD1, com um capacitor de 0,1 uF para o terra formando o atraso RC do reset.

![Figura 5.2-1: Sequência de energização e desligamento](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-1: Sequência de energização e desligamento</em></div>

![Figura 5.2-2: Circuito de reset](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-2: Circuito de reset</em></div>

##### 5.2.1.6. Circuito típico de alimentação {#5116-typical-power-circuit}

A série SF32LB58x pode usar o PMIC SF30147C da SiFli para alimentar seus trilhos; consulte a Tabela 5.2-1 para ver a distribuição. O chip também integra duas saídas BUCK e três saídas LDO.

![Figura 5.2-3: Diagrama de alimentação com o SF30147C](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-3: Diagrama de alimentação com o SF30147C</em></div>

![Figura 5.2-4: Circuito DC-DC (BUCK) integrado](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-4: Circuito DC-DC (BUCK) integrado</em></div>

![Figura 5.2-5: Circuito LDO integrado](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-5: Circuito LDO integrado</em></div>

##### 5.2.1.7. Checklist do projeto de alimentação {#5117-power-design-checklist}

- [ ] Confirme se a faixa de alimentação PVDD1/PVDD2 do modelo selecionado (1,71 V–3,6 V) é compatível com o esquema de alimentação real.
- [ ] O indutor BUCK atende a L = 4,7 uH, DCR ≤ 0,4 Ω e Isat ≥ 500 mA.
- [ ] Os capacitores de desacoplamento de PVDD1/PVDD2, BUCK1/2_LX/FB, LDO_VOUT1, VDD_RET e VDD_RTC usam os valores recomendados nesta seção.
- [ ] Se o SF30147C for usado, a distribuição de tensão/corrente das sete chaves de carga atende aos requisitos dos periféricos.
- [ ] O atraso RC do circuito de reset RSTN atende aos requisitos de temporização do dispositivo.

#### 5.2.2. Modos de operação e fontes de despertar {#512-operating-modes-and-wake-sources}

Recomenda-se analisar a estratégia de baixo consumo em conjunto com as funções PBR, as interrupções capazes de despertar o chip, as chaves de alimentação do armazenamento, as fontes dos sensores e as chaves de carga do PMIC externo.

A série SF32LB58x oferece seis interfaces PBR, com as seguintes características principais:

1. Na energização, PBR0 muda de 0 para 1 e pode controlar determinadas chaves de carga externas (LSW); PBR1–PBR5 têm nível de saída padrão 0.
2. PBR0–PBR5 podem funcionar como saídas nos modos Standby e Hibernate.
3. PBR0–PBR5 podem emitir o sinal LPTIM.
4. PBR0–PBR5 podem emitir um sinal de clock de 32 kHz.
5. PBR0–PBR3 podem ser configurados como entradas de sinais de despertar. Enquanto o MCU está ativo, esses pinos não geram uma interrupção.

Todos os GPIOs da série SF32LB58x podem despertar o chip nos modos Light Sleep e Deep Sleep. Nos modos Standby e Hibernate, há 16 fontes de interrupção capazes de despertar o chip: seis em PA e dez em PB.

<div align="center"><em>Tabela 5.2-5: Conexões das fontes de interrupção</em></div>

<div align="center" markdown>

| Fonte de interrupção | I/O | Descrição |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | Sinal de interrupção 0 |
| WKUP_PIN1 | PB55 | Sinal de interrupção 1 |
| WKUP_PIN2 | PB56 | Sinal de interrupção 2 |
| WKUP_PIN3 | PB57 | Sinal de interrupção 3 |
| WKUP_PIN4 | PB58 | Sinal de interrupção 4 |
| WKUP_PIN5 | PB59 | Sinal de interrupção 5 |
| WKUP_PIN6 | PA64 | Sinal de interrupção 6 |
| WKUP_PIN7 | PA65 | Sinal de interrupção 7 |
| WKUP_PIN8 | PA66 | Sinal de interrupção 8 |
| WKUP_PIN9 | PA67 | Sinal de interrupção 9 |
| WKUP_PIN10 | PA68 | Sinal de interrupção 10 |
| WKUP_PIN11 | PA69 | Sinal de interrupção 11 |
| WKUP_PIN12 | PBR0 | Sinal de interrupção 12 |
| WKUP_PIN13 | PBR1 | Sinal de interrupção 13 |
| WKUP_PIN14 | PBR2 | Sinal de interrupção 14 |
| WKUP_PIN15 | PBR3 | Sinal de interrupção 15 |

</div>

!!! note "Contagem das fontes de despertar a confirmar"
    O texto da fonte afirma que existem 16 fontes de interrupção capazes de ativar o chip: 6 em PA e 10 em PB. No entanto, a tabela lista 6 pinos PB, 6 pinos PA e 4 pinos PBR. A fonte não esclarece se PBR está incluído na contagem de PB. Confirme com a SiFli como esses pinos são agrupados antes de usar os totais de PA/PB no projeto.

### 5.3. Geração de clock {#52-clock-generation}
A série SF32LB58x requer duas fontes externas de clock: um cristal principal de 48 MHz e um cristal de 32,768 kHz para o RTC.

<div align="center"><em>Tabela 5.3-1: Requisitos de especificação dos cristais</em></div>

<div align="center" markdown>

| Cristal | Especificação | Descrição |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (recomendado: 8.8 pF), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (recomendado: 22 Ω) | O consumo do cristal depende de CL e ESR: valores menores reduzem o consumo. Reserve espaço para capacitores de casamento em paralelo, próximos ao cristal; eles não são necessários quando CL < 12 pF. |
| 32.768 kHz | CL ≤ 12.5 pF (recomendado: 7 pF), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (recomendado: 38 kΩ) | O consumo do cristal depende de CL e ESR: valores menores reduzem o consumo. Reserve espaço para capacitores de casamento em paralelo, próximos ao cristal; eles não são necessários quando CL < 12,5 pF. |

</div>

<div align="center"><em>Tabela 5.3-2: Modelos de cristal listados na AVL da SiFli</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Parâmetros |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz, ΔF/F0 = -6 ~ 8 ppm, CL = 8.8 pF, ESR ≤ 22 Ω máx., TOPR = -30 ~ 85°C, encapsulamento 2016 (métrico) |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ máx., TOPR = -40 ~ 85°C, encapsulamento 3215 (métrico) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz, ΔF/F0 = -10 ~ 10 ppm, CL = 8.8 pF, ESR ≤ 40 Ω máx., TOPR = -20 ~ 75°C, encapsulamento 2016 (métrico) |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ máx., TOPR = -40 ~ 85°C, encapsulamento 3215 (métrico) |

</div>

!!! note
    A recomendação geral para o cristal de 48 MHz limita o ESR a ≤ 30 Ω (22 Ω recomendado), enquanto o modelo listado SX20Y048000B31T-8.8 especifica ESR ≤ 40 Ω. A fonte apresenta os dois valores, mas não explica a diferença; confirme com a SiFli se o modelo é adequado antes de usá-lo. O ESR mais alto também pode aumentar o consumo estático. No layout da PCB, remova o cobre de GND da camada 2 diretamente sob o cristal para reduzir a capacitância de carga parasita do sinal de clock.

Para obter detalhes sobre os componentes listados, consulte a [Lista de fornecedores aprovados pela SiFli][SiFli Approved Vendor List (AVL)].

### 5.4. RF {#53-rf}

O front-end de RF do SF32LB58x usa tecnologia integrada de filtro de casamento de banda larga. Portanto, basta prever na PCB uma trilha de RF com impedância controlada de 50 Ω. Recomenda-se também reservar no projeto uma rede de casamento π para filtragem de espúrios e casamento da antena.

![Figura 5.4-1: Diagrama do circuito de RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Diagrama do circuito de RF</em></div>

!!! note "Observação"
    Os valores dos componentes da rede de casamento devem ser determinados por meio de testes com a antena e o layout reais da PCB.

### 5.5. Interfaces de usuário {#54-user-interfaces}

#### 5.5.1. Display {#541-display}
##### 5.5.1.1. Interface MIPI-DSI para display {#5411-mipi-dsi-display-interface}

A série SF32LB58x oferece uma interface MIPI-DSI de 2 lanes.

<div align="center"><em>Tabela 5.5-1: Conexões dos sinais MIPI DSI</em></div>

<div align="center" markdown>

| Sinal MIPI DSI | I/O | Descrição |
|:---|:---|:---|
| CLKP | DSI_CLKP | Sinal positivo do clock MIPI |
| CLKN | DSI_CLKN | Sinal negativo do clock MIPI |
| D0P | DSI_D0P | Lane de dados MIPI 0, positiva |
| D0N | DSI_D0N | Lane de dados MIPI 0, negativa |
| D1P | DSI_D1P | Lane de dados MIPI 1, positiva |
| D1N | DSI_D1N | Lane de dados MIPI 1, negativa |
| - | AVDD18_DSI | Entrada de alimentação MIPI |
| - | DSI_REXT | Resistor externo de 10 kΩ conectado ao terra |
| - | AVSS_DSI | Terra |
| TE | PB2 | Sinal de tearing effect para sincronização de quadros do MCU |
| RESET | PB5 | Sinal de reset do display |

</div>

##### 5.5.1.2. Interface SPI/QSPI para display {#5412-spiqspi-display-interface}

A série SF32LB58x oferece interfaces SPI de 3 ou 4 fios e Quad-SPI para conexão de um painel LCD. O HCPU usa o LCDC1 em PA; o LCPU, o LCDC2 em PB.

<div align="center"><em>Tabela 5.5-2: Conexões dos sinais SPI/QSPI</em></div>

<div align="center" markdown>

| Sinal SPI | I/O (LCDC1) | I/O (LCDC2) | Descrição |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | Habilitação do chip |
| WRX_SCL | PA46 | PB10 | Sinal de clock |
| DCX | PA48 | PB03 | Sinal de dados/comando no modo SPI de 4 fios; dado 1 no modo Quad-SPI |
| SDI_RDX | PA50 | PB09 | Entrada de dados nos modos SPI de 3/4 fios; dado 0 no modo Quad-SPI |
| SDO | PA50 | PB09 | Saída de dados nos modos SPI de 3/4 fios; conecte junto com SDI_RDX |
| D[0] | PA47 | PB04 | Dado 2 no modo Quad-SPI |
| D[1] | PA45 | PB06 | Dado 3 no modo Quad-SPI |
| REST | PA74 | PB05 | Sinal de reset do display |
| TE | PA43 | PB02 | Sinal de tearing effect para sincronização de quadros do MCU |

</div>

##### 5.5.1.3. Interface MCU8080 para display {#5413-mcu8080-display-interface}

A série SF32LB58x oferece uma interface MCU8080 para conexão de um painel LCD.

<div align="center"><em>Tabela 5.5-3: Conexões dos sinais MCU8080</em></div>

<div align="center" markdown>

| Sinal MCU8080 | I/O | Descrição |
|:---|:---|:---|
| CSX | PA44 | Seleção do chip |
| WRX | PA46 | Sinal de escrita dos dados |
| DCX | PA48 | Seleção entre dados e comandos do display |
| RDX | PA50 | Sinal de estrobo de leitura |
| D[0] | PA47 | Dado 0 |
| D[1] | PA45 | Dado 1 |
| D[2] | PA26 | Dado 2 |
| D[3] | PA27 | Dado 3 |
| D[4] | PA42 | Dado 4 |
| D[5] | PA51 | Dado 5 |
| D[6] | PA52 | Dado 6 |
| D[7] | PA58 | Dado 7 |
| REST | PA24 | Reset |
| TE | PA43 | Sinal de tearing effect para sincronização de quadros do MCU |

</div>

!!! note "Descrição do sinal RDX"
    A fonte descreve RDX como “sinal de estrobo de leitura para dados de escrita”, o que é contraditório. A tabela o apresenta como sinal de estrobo de leitura; confirme com a SiFli a função pretendida antes da publicação.

##### 5.5.1.4. Interface DPI para display {#5414-dpi-display-interface}

A série SF32LB58x oferece uma interface DPI para conexão de um painel LCD.

<div align="center"><em>Tabela 5.5-4: Conexões dos sinais DPI</em></div>

<div align="center" markdown>

| Sinal DPI | I/O | Descrição |
|:---|:---|:---|
| CLK | PA12 | Sinal de clock |
| DE | PA13 | Habilitação de dados |
| HSYNC | PA14 | Sincronismo horizontal |
| VSYNC | PA15 | Sincronismo vertical |
| SD | PA18 | Controle de desligamento do display |
| CM | PA19 | Alterna entre os modos Normal Color e Reduced Color |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | Dados de pixel (vermelho R0-R7) |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | Dados de pixel (verde G0-G7) |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | Dados de pixel (azul B0-B7) |

</div>

##### 5.5.1.5. Interface JDI para display {#5415-jdi-display-interface}

A série SF32LB58x oferece interfaces JDI paralela e serial para conexão de um painel LCD, multiplexadas nos sinais do LCDC1 (PA) ou do LCDC2 (PB). Recomenda-se usar o LCDC2 (PB).

<div align="center"><em>Tabela 5.5-5: Conexões dos sinais JDI paralelos</em></div>

<div align="center" markdown>

| Sinal JDI | I/O (LCDC1) | I/O (LCDC2) | Descrição |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | Clock de deslocamento do driver vertical |
| JDI_VST | PA22 | PB19 | Sinal de início do driver vertical |
| JDI_XRST | PA25 | PB16 | Reset dos drivers horizontal e vertical |
| JDI_HCK | PA43 | PB05 | Clock de deslocamento do driver horizontal |
| JDI_HST | PA44 | PB10 | Sinal de início do driver horizontal |
| JDI_ENB | PA45 | PB12 | Habilitação de escrita na memória de pixels |
| JDI_R1 | PA46 | PB09 | Dados vermelhos da imagem (pixels ímpares) |
| JDI_R2 | PA47 | PB06 | Dados vermelhos da imagem (pixels pares) |
| JDI_G1 | PA48 | PB08 | Dados verdes da imagem (pixels ímpares) |
| JDI_G2 | PA50 | PB04 | Dados verdes da imagem (pixels pares) |
| JDI_B1 | PA65 | PB02 | Dados azuis da imagem (pixels ímpares) |
| JDI_B2 | PA67 | PB03 | Dados azuis da imagem (pixels pares) |
| JDI_XFRP | PBR1 | PBR1 | Sinal de acionamento do cristal líquido (pixel "ligado") |
| JDI_VCOM/FRP | PBR2 | PBR2 | Sinal do eletrodo comum / sinal de acionamento do cristal líquido (pixel "desligado") |

</div>

<div align="center"><em>Tabela 5.5-6: Conexões dos sinais JDI seriais</em></div>

<div align="center" markdown>

| Sinal JDI | I/O (LCDC1) | I/O (LCDC2) | Descrição |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | Sinal de seleção do chip |
| JDI_SCLK | PA84 | PB02 | Clock serial |
| JDI_SO | PA86 | PB06 | Saída de dados serial |
| JDI_DISP | PA90 | PB04 | Sinal de controle liga/desliga do display |
| JDI_EXTCOMIN | PA91 | PB05 | Entrada de polaridade de inversão COM |

</div>

#### 5.5.2. Painel sensível ao toque e retroiluminação {#542-touch-and-backlight}

A série SF32LB58x oferece uma interface I2C para o controlador do painel de toque, com uma entrada de interrupção de status, além de um sinal PWM para habilitar o driver da retroiluminação e controlar seu brilho.

<div align="center"><em>Tabela 5.5-7: Conexões do painel de toque e da retroiluminação</em></div>

<div align="center" markdown>

| Sinal do painel de toque/retroiluminação | I/O | Descrição |
|:---|:---|:---|
| Interrupção | PA69 | Interrupção de status do painel de toque (pode despertar o chip) |
| I2C1_SCL | PA17 | Sinal de clock I2C do painel de toque |
| I2C1_SDA | PA16 | Sinal de dados I2C do painel de toque |
| BL_PWM | PB44 | Sinal PWM de controle da retroiluminação |
| Reset | PA15 | Sinal de reset do painel de toque |
| Habilitação da alimentação | PA12 | Habilitação da alimentação do painel de toque |

</div>

#### 5.5.3. Áudio {#543-audio}

A série SF32LB58x oferece diversas interfaces de áudio, com as seguintes características:

1. A série SF32LB58x oferece três interfaces I2S. O I2S1 aceita apenas entrada; I2S2 e I2S3 aceitam entrada e saída. As três operam somente no modo mestre; o modo escravo não é compatível.
2. Recomenda-se usar o I2S1 para entrada de microfone I2S.
3. Recomenda-se usar o I2S2 para um DAC de áudio.
4. Recomenda-se usar o I2S3 para um codec de áudio.
5. Há duas interfaces de entrada PDM para microfones digitais. Cada interface PDM pode conectar até dois microfones digitais; portanto, a quantidade de interfaces não corresponde à quantidade de microfones.
6. Há duas entradas para microfone analógico; cada uma requer um capacitor de acoplamento em série de pelo menos 2,2 uF para bloquear a componente contínua. A alimentação dos microfones analógicos vem do MIC_BIAS do SF32LB58x.
7. É possível conectar um amplificador de potência de áudio analógico externo. As trilhas P/N de cada canal DAC devem ser roteadas como um par diferencial, com blindagem adequada conectada ao terra, e a capacitância parasita deve ficar abaixo de 10 pF. A fonte apresenta limites conflitantes para o comprimento das trilhas; consulte a nota abaixo.
8. É possível conectar fones de ouvido analógicos estéreo.

!!! note "Divergência no comprimento das trilhas DAC na fonte"
    A nota de aplicação de hardware da SiFli apresenta dois limites diferentes para o comprimento das trilhas DAC: o resumo de áudio indica `<2 cm`, enquanto a seção detalhada de roteamento de PCB para DAC indica `<2 mm`. A fonte não explica a diferença. Confirme com a SiFli qual limite se aplica antes de finalizar a PCB; não presuma que um valor substitui o outro.

![Figura 5.5-1: Circuito de entrada de áudio analógico diferencial](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de entrada de áudio analógico diferencial</em></div>

![Figura 5.5-2: Circuito não balanceado de entrada de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito não balanceado de entrada de áudio analógico</em></div>

![Figura 5.5-3: Circuito de saída de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito de saída de áudio analógico</em></div>

![Figura 5.5-4: Circuito do microfone analógico](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito do microfone analógico</em></div>

![Figura 5.5-5: Circuito de fones de ouvido estéreo](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-5: Circuito de fones de ouvido estéreo</em></div>

![Figura 5.5-6: Circuito do PA de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-6: Circuito do PA de áudio analógico</em></div>

![Figura 5.5-7: Circuito do PA de áudio I2S](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-7: Circuito do PA de áudio I2S</em></div>

<div align="center"><em>Tabela 5.5-8: Conexões dos sinais de áudio</em></div>

<div align="center" markdown>

| Sinal de áudio | I/O | Descrição |
|:---|:---|:---|
| I2S1_LRCK | PA14 | Clock de quadros do I2S1 |
| I2S1_SDI | PA18 | Entrada de dados do I2S1 |
| I2S1_BCK | PA23 | Clock de bits do I2S1 |
| I2S2_LRCK | PA84 | Clock de quadros do I2S2 |
| I2S2_SDI | PA86 | Entrada de dados do I2S2 |
| I2S2_SDO | PA82 | Saída de dados do I2S2 |
| I2S2_BCK | PA91 | Clock de bits do I2S2 |
| I2S3_LRCK | PB31 | Clock de quadros do I2S3 |
| I2S3_SDI | PB27 | Entrada de dados do I2S3 |
| I2S3_SDO | PB24 | Saída de dados do I2S3 |
| I2S3_BCK | PB30 | Clock de bits do I2S3 |
| I2S3_MCLK | PB34 | Clock mestre do I2S3 |
| PDM1_CLK | PA23 | Clock do PDM1 |
| PDM1_DATA | PA18 | Dados do PDM1 |
| PDM2_CLK | PA25 | Clock do PDM2 |
| PDM2_DATA | PA22 | Dados do PDM2 |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | Entrada analógica 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | Entrada analógica 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | Saída analógica 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | Saída analógica 2P/2N |

</div>

!!! note "Observação sobre multiplexação de pinos"
    I2S1_SDI compartilha PA18 com PDM1_DATA, e I2S1_BCK compartilha PA23 com PDM1_CLK. I2S1_LRCK usa PA14, enquanto PDM2_DATA usa PA22. Confirme a função de áudio ativa na configuração das interfaces de software antes de finalizar o esquemático.

A entrada de microfone analógico do SF32LB58x aceita os modos não balanceado e diferencial; ambos exigem um capacitor em série de 2,2 uF. AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N conectam-se ao lado do SF32LB58x. Na saída analógica, AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N são saídas do SF32LB58x que podem acionar a entrada de um amplificador para fones estéreo ou de um amplificador de áudio analógico externo. Tanto o amplificador de áudio analógico quanto o amplificador de áudio I2S são configurados por I2C3.

#### 5.5.4. Botões {#544-buttons}

##### 5.5.4.1. Botão de alimentação e reset por pressionamento longo {#5441-power-and-long-press-reset-button}

PB54 é o sinal recomendado para o botão liga/desliga da série SF32LB58x. Um único botão combina a função de ligar/desligar por pressionamento curto com a função de reset por pressionamento longo. O circuito é ativo em nível alto; manter o botão pressionado por mais de 10 segundos provoca o reset automático do chip.

![Figura 5.5-8: Circuito do botão de alimentação/reset](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-8: Circuito do botão de alimentação/reset</em></div>

##### 5.5.4.2. Botão de função ou encoder rotativo {#5442-function-button-or-rotary-encoder}

A série SF32LB58x aceita entradas para botão de função e encoder rotativo; ambas precisam de resistores de pull-up. Também aceita um sensor óptico de rastreamento, recomendado por meio da interface I2C4.

![Figura 5.5-9: Circuito do botão de função/encoder rotativo](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-9: Circuito do botão de função/encoder rotativo</em></div>

<div align="center"><em>Tabela 5.5-9: Sinais do sensor óptico de rastreamento</em></div>

<div align="center" markdown>

| Sinal I2C | I/O | Descrição |
|:---|:---|:---|
| INT | PA58 | Entrada de interrupção do sensor óptico de rastreamento |
| SDA | PA59 | Dados I2C do sensor óptico de rastreamento |
| SCL | PA60 | Clock I2C do sensor óptico de rastreamento |

</div>

#### 5.5.5. Motor de vibração {#545-vibration-motor}

A série SF32LB58x oferece várias saídas PWM que podem acionar um motor de vibração.

!!! important
    Se o software habilitar a macro de escalonamento de frequência do HCPU `#define BSP_PM_FREQ_SCALING 1`, a frequência do clock do HCPU diminui ao entrar na thread ociosa, alterando também a frequência PWM nos pinos PA correspondentes. Por isso, recomenda-se gerar o sinal PWM em um pino PB.

![Figura 5.5-10: Circuito do motor de vibração](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-10: Circuito do motor de vibração</em></div>

### 5.6. Armazenamento e conectividade {#55-storage-and-connectivity}

#### 5.6.1. Configuração de inicialização {#551-boot-configuration}
A série SF32LB58x oferece um pino `Mode` para configurar o modo de inicialização.

<div align="center"><em>Tabela 5.6-1: Configuração do pino Mode</em></div>

<div align="center" markdown>

| Nível do pino `Mode` | Descrição |
|:---|:---|
| Alto | Entra no modo de download após a energização |
| Baixo | Inicia o programa da área do usuário após a energização |

</div>

!!! note "Observações"
    1. O domínio de tensão do pino `Mode` é o mesmo de VDDIOA.
    2. Conecte `Mode` à alimentação ou ao GND por meio de um resistor de 10 kΩ para manter o nível estável; o pino não deve ficar flutuante nem alternar de nível.
    3. Reserve um ponto de teste para o pino `Mode` nas placas de produção, para permitir o download do firmware e a calibração do cristal; não é necessário incluir um jumper.
    4. Em placas de teste, recomenda-se reservar um jumper para o pino `Mode`, permitindo iniciar a placa no modo de download se o firmware travar.

#### 5.6.2. Armazenamento {#552-storage}

A série SF32LB58x oferece interfaces MPI3 ou MPI4 para memórias NOR Flash e SPI NAND Flash externas, além da interface SD1 para SD NAND e eMMC externos.

##### 5.6.2.1. Interface QSPI NAND Flash {#5521-qspi-nand-flash-interface}

A placa de referência EVB do SF32LB58x usa MPI4 por padrão para conectar uma memória SPI NAND Flash externa.

![Figura 5.6-1: Circuito de referência para SPI NAND Flash](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-1: Circuito de referência para SPI NAND Flash</em></div>

<div align="center"><em>Tabela 5.6-2: Conexões dos sinais MPI4</em></div>

<div align="center" markdown>

| Sinal da memória Flash | Sinal de I/O (MPI4) | Descrição |
|:---|:---|:---|
| CS# | PA10 | Seleção do chip, ativa em nível baixo |
| SO | PA04 | Entrada de dados (linha bidirecional de dados 1) |
| WP# | PA01 | Saída de proteção contra gravação (linha bidirecional de dados 2) |
| SI | PA05 | Saída de dados (linha bidirecional de dados 0) |
| SCLK | PA09 | Saída de clock serial |
| Hold# | PA06 | Saída de dados (linha bidirecional de dados 3) |

</div>

!!! note "Observações"
    1. Se a linha de produção precisar gravar o firmware na memória Flash externa, o software da ferramenta de download deverá colocar em nível alto o pino PA43 de controle da alimentação da Flash externa para habilitá-la.
    2. O pino Hold# da SPI NAND Flash deve ter um pull-up para a alimentação da própria memória por meio de um resistor de 10 kΩ.

##### 5.6.2.2. Interface SDIO para eMMC/cartão microSD {#5522-sdio-emmc-micro-sd-interface}

A série SF32LB58x oferece duas interfaces SDIO. Na EVB, SD1 conecta-se por padrão a eMMC ou SD NAND, enquanto SD2 conecta-se a um cartão SD ou a um chip Wi-Fi.

A SD1 usa 12 GPIOs (PA00–PA11), alimentados pelo domínio VDDIOA2, que pode operar em 1,8 V ou 3,3 V conforme o nível da interface do periférico. Recomenda-se operar SPI NAND Flash e eMMC em 1,8 V. Os chips SD NAND Flash aceitam somente nível de interface de 3,3 V; portanto, ao usar SD NAND, ajuste VDDIOA2 para 3,3 V.

![Figura 5.6-2: Circuito de referência para eMMC](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-2: Circuito de referência para eMMC</em></div>

![Figura 5.6-3: Circuito de referência para SD NAND](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-3: Circuito de referência para SD NAND</em></div>

![Figura 5.6-4: Circuito de referência para cartão SD](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-4: Circuito de referência para cartão SD</em></div>

<div align="center"><em>Tabela 5.6-3: Conexões dos sinais SD1</em></div>

<div align="center" markdown>

| Sinal SD1 | Sinal de I/O | Descrição |
|:---|:---|:---|
| SD1_D7 | PA00 | Dado 7 |
| SD1_D2 | PA01 | Dado 6 |
| SD1_D5 | PA03 | Dado 5 |
| SD1_D1 | PA04 | Dado 1 |
| SD1_D0 | PA05 | Dado 0 |
| SD1_D3 | PA06 | Dado 3 |
| SD1_D4 | PA07 | Dado 4 |
| SD1_D6 | PA08 | Dado 6 |
| SD1_CLK | PA09 | Sinal de clock |
| SD1_CMD | PA10 | Sinal de comando |

</div>

!!! note "Verificação dos rótulos SD1"
    A fonte informa que SD1 usa 12 GPIOs (PA00–PA11), mas sua tabela de sinais lista apenas 10 sinais (SD1_D[7:0], CLK e CMD). Além disso, a tabela descreve SD1_D2 e SD1_D6 como "Data 6". A fonte não informa a função dos dois GPIOs não listados nem esclarece a descrição duplicada. Antes de finalizar o esquemático, confirme o mapeamento completo dos pinos SD1 no datasheet do chip.

<div align="center"><em>Tabela 5.6-4: Conexões dos sinais SD2</em></div>

<div align="center" markdown>

| Sinal SD2 | Sinal de I/O | Descrição |
|:---|:---|:---|
| SD2_CMD | PA70 | Sinal de comando |
| SD2_D1 | PA75 | Dado 1 |
| SD2_D0 | PA76 | Dado 0 |
| SD2_CLK | PA77 | Sinal de clock |
| SD2_D2 | PA79 | Dado 2 |
| SD2_D3 | PA81 | Dado 3 |

</div>

#### 5.6.3. USB {#553-usb}

O USB da série SF32LB58x oferece USB 2.0 HS nos modos Host e Device. Forneça proteção TVS de USB DP e de DM para o terra; a capacitância de junção do TVS deve ser inferior a 5 pF. Roteie as trilhas DP/DM da PCB como um par diferencial com impedância de 90 Ω.

![Figura 5.6-5: Circuito da interface USB](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-5: Circuito da interface USB</em></div>

### 5.7. Fabricação {#56-manufacturing}

#### 5.7.1. Interface de depuração e download {#561-debug-and-download-interface}
A série SF32LB58x oferece a interface de depuração SWD padrão Arm® para conexão a ferramentas EDA e depuração passo a passo. Ao conectar uma sonda SEGGER® J-Link®, configure sua alimentação para usar uma fonte externa, fornecida pela própria placa com SF32LB58x.

![Figura 5.7-1: Circuito da interface de depuração SWD](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-1: Circuito da interface de depuração SWD</em></div>

O SF32LB58x oferece uma interface SWD e seis interfaces UART selecionáveis para saída de depuração.

<div align="center"><em>Tabela 5.7-1: Conexões das portas de depuração</em></div>

<div align="center" markdown>

| Sinal UART | I/O | Descrição |
|:---|:---|:---|
| TXD1 | PA31 | RXD da UART1; porta de impressão padrão do HCPU |
| RXD1 | PA32 | TXD da UART1; porta de impressão padrão do HCPU |
| TXD2 | PA28 | RXD da UART2 |
| RXD2 | PA29 | TXD da UART2 |
| TXD3 | PA21 | RXD da UART3 |
| RXD3 | PA20 | TXD da UART3 |
| TXD4 | PB37 | RXD da UART4; porta de impressão padrão do LCPU |
| RXD4 | PB36 | TXD da UART4; porta de impressão padrão do LCPU |
| TXD5 | PB18 | RXD da UART5 |
| RXD5 | PB17 | TXD da UART5 |
| TXD6 | PB14 | RXD da UART6 |
| RXD6 | PB13 | TXD da UART6 |
| SWCLK | PB07 | Sinal de clock do J-Link |
| SWDIO | PB11 | Sinal de dados do J-Link |

</div>

!!! note "Observação"
    Os sinais UARTx RXD não podem ficar flutuantes; habilite um pull-up interno durante a inicialização do software.

#### 5.7.2. Gravação em produção e acesso ao hardware {#562-production-flashing-and-hardware-access}

Planeje os pontos de acesso para gravação em produção, recuperação e calibração antes de congelar o projeto do gabinete e do gabarito de teste. Mantenha, no mínimo, pontos de acesso à alimentação e ao terra, ao SWD, às saídas UART de depuração necessárias, aos pinos de boot/configuração e a quaisquer sinais de reset ou controle do PMIC necessários para recuperar a placa caso o firmware não inicialize.

#### 5.7.3. Checklists do esquemático e dos desenhos da PCB {#563-schematic-and-pcb-drawing-checklists}

- [ ] O esquema de alimentação (PMU integrada ou PMIC SF30147C) atende ao orçamento de energia do sistema.
- [ ] O pino Mode de configuração de boot tem um resistor externo de 10 kΩ e um ponto de teste reservado nas placas de produção.
- [ ] As especificações dos cristais de 48 MHz/32,768 kHz atendem às recomendações, e o cobre GND da camada 2 foi removido sob o cristal.
- [ ] A interface de armazenamento (MPI4/SD1/SD2) corresponde à configuração de boot, e o pino PA43 de controle da alimentação da Flash externa está confirmado.
- [ ] A interface de display (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) corresponde à atribuição de pinos LCDC1/LCDC2.
- [ ] Os pinos da porta de depuração (SWD + 6 UARTs) estão atribuídos conforme necessário, com o pull-up interno dos sinais UART RXD habilitado.
- [ ] A multiplexação entre as interfaces de áudio I2S/PDM e áudio analógico foi verificada, e o orçamento das trilhas diferenciais é atendido.
- [ ] USB DP e DM têm proteção TVS ligada ao terra, com capacitância de junção < 5 pF.

[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
