---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de projeto do esquemático SF32LB55x: alimentação, inicialização, geração de clock, RF, memória, tela, toque, interfaces de despertar, GPADC e produção."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB55x — Projeto do esquemático { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. Diretrizes de projeto do esquemático { #5-schematic-design-guidelines }

<div align="center"><em>Tabela 5-1: Organização do projeto do esquemático</em></div>

<div align="center" markdown>

| Grupo | Tópicos |
|:---|:---|
| Sistema de alimentação | Trilhos do PMU, demais alimentações, capacitores, POR/BOR/reset e indutor BUCK. |
| Modo de boot | Domínio de tensão do pino Mode, resistor de polarização, download, recuperação e acesso na produção. |
| Geração de clock | Cristais de 48 MHz e 32,768 kHz e revisão dos capacitores de ajuste. |
| RF | Casamento de RF, caminho de antena de 50 Ω, filtragem de AVDD_BRF e área de exclusão de RF. |
| Interfaces de memória | OPI PSRAM, QSPI NOR/NAND/PSRAM e SDIO eMMC/Micro SD. |
| Tela e toque | MIPI DSI, SPI/QSPI, MCU8080, JDI, interrupção de toque, reset, retroiluminação e alimentação do painel. |
| Despertar, GPADC e produção | Fontes e botões de despertar, PWM do motor, divisores GPADC, sensores, áudio Bluetooth, DBG-UART, SWD, gravação em produção e calibração dos cristais. |

</div>

### 5.1. Sistema de alimentação { #51-power-system }

O SF32LB551 em QFN68L não tem os pinos VDD2, BUCK2_VSW, BUCK2_VOUT, LDOVCC2_VOUT nem AVDD_DSI. Aplique as tabelas de alimentação e capacitores apenas aos pinos existentes no encapsulamento escolhido. Os encapsulamentos BGA oferecem duas saídas BUCK; BUCK2 pode operar em modo BUCK ou LDO, com modo BUCK recomendado. QFN68L oferece uma saída BUCK.

<div align="center"><em>Tabela 5.1-1: Pinos de alimentação do PMU</em></div>

<div align="center" markdown>

| Pinos de alimentação do PMU | Tensão mínima (V) | Tensão típica (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VDD1 | 1,71 | 1,8 | 3,6 | 50 | Entrada de alimentação VDD1 |
| VDD2 | 1,71 | 1,8 | 3,6 | 50 | Entrada de alimentação VDD2 |
| BUCK1_VSW BUCK1_VOUT | - | 1,25 | - | 50 | Saída BUCK1_VSW conectada ao indutor; entrada de alimentação interna 1 conectada à outra extremidade do indutor e ao capacitor externo |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0,9 | - | 50 | Saída BUCK2_VSW conectada ao indutor; entrada de alimentação interna 2 conectada à outra extremidade do indutor e ao capacitor externo |
| LDO_VOUT1 | - | 1,1 | - | 50 | Saída LDO 1; conecte um capacitor externo |
| LDO_VOUT2 | - | 0,9 | - | 20 | Saída LDO 2; conecte um capacitor externo |
| VDD_RET | - | 0,9 | - | 1 | Saída do LDO RET; conecte um capacitor externo |
| VDD_RTC | - | 1,1 | - | 1 | Saída do LDO RTC; conecte um capacitor externo |

</div>

<div align="center"><em>Tabela 5.1-2: Outros pinos de alimentação</em></div>

<div align="center" markdown>

| Outros pinos de alimentação | Tensão mínima (V) | Tensão típica (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AVDD_BRF | 1,71 | 1,8 | 3,63 | 30 | Entrada de alimentação RF |
| AVDD_DSI | 1,71 | 1,8 | 2,75 | 20 | Entrada de alimentação MIPI DSI; alimentação obrigatória |
| VDD_SIP | 1,71 | 1,8 | 1,98 | 30 | Entrada de alimentação da memória integrada ao encapsulamento |
| AVDD33 | 3,15 | 3,3 | 3,63 | 50 | Entrada de alimentação |
| VDDIOA | 1,71 | 1,8 | 3,63 | - | Entrada de alimentação dos I/Os PA |
| VDDIOB | 1,71 | 1,8 | 3,63 | - | Entrada de alimentação dos I/Os PB |

</div>

<div align="center"><em>Tabela 5.1-3: Capacitores de alimentação necessários</em></div>

<div align="center" markdown>

| Pinos de alimentação | Capacitor | Descrição detalhada |
| :--- | :--- | :--- |
| VDD1 VDD2 | 0,1 µF + 10 µF | Interligue VDD1 e VDD2. Coloque pelo menos um capacitor de 10 µF e um de 0,1 µF próximos aos pinos |
| BUCK1_VSW BUCK1_VOUT | 0,1 µF + 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF e um de 0,1 µF próximos aos pinos |
| BUCK2_VSW BUCK2_VOUT | 0,1 µF + 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF e um de 0,1 µF próximos aos pinos |
| LDOVCC2_VOUT | 0,1 µF + 4,7 µF | Se BUCK2 estiver configurado no modo BUCK, deixe este pino desconectado. Se BUCK2 estiver configurado no modo LDO, deixe BUCK2_VSW desconectado, interligue LDOVCC2_VOUT e BUCK2_VOUT e coloque pelo menos um capacitor de 4,7 µF e um de 0,1 µF próximos aos pinos |
| LDO_VOUT1 | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino |
| LDO_VOUT2 | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino |
| VDD_RET | 0,47 µF | Coloque pelo menos um capacitor de 0,47 µF próximo ao pino |
| VDD_RTC | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino |
| VDD_SIP | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino |
| SDMADC_VREF | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino |
| AVDD_DSI | 0,1 µF + 10 µF | Coloque pelo menos um capacitor de 10 µF e um de 0,1 µF próximos aos pinos |
| AVDD33 | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino |
| AVDD_BRF | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino |
| VDDIOA VDDIOB | 2 × 0,1 µF + 2 × 1 µF | Coloque pelo menos um capacitor de 1 µF e um de 0,1 µF próximos a cada pino |

</div>

Coloque os capacitores necessários perto dos respectivos pinos, mantenha os laços de corrente BUCK compactos e confirme o modo BUCK/LDO antes do layout. Verifique o circuito de reset e os tempos de POR/BOR no hardware real.

As fontes divergem: a tabela 3-3 do [guia de aplicação de hardware em chinês da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) e o item 9 da [lista de verificação de esquemático V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) especificam 1 µF para VDD_RTC, enquanto [C0313 no esquema de referência do guia](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) está marcado como 0,1 µF. As fontes não explicam quando cada valor se aplica. Confirme com a SiFli o valor exigido para o dispositivo específico antes de liberar o projeto; não resolva a divergência por suposição.

Alimente VDD1 e VDD2 simultaneamente; o SF32LB551 não tem VDD2. Faça o pull-up de RSTN para o domínio da tensão de entrada de VDD1 e conecte um capacitor de 0,1 µF ao GND. O esquema de referência identifica a alimentação do pull-up como 1,8 V/3,3 V e usa um resistor de 10 kΩ; escolha o nível correspondente ao domínio VDD1 do projeto. A Figura 5.1-1 mostra POR em 1,50 V, BOR configurável de 2,5 V a 1,5 V e uma marca RSTN de 0,7 V. A medida da Figura 5.1-3 apresenta cerca de 700 µs entre a subida da alimentação e a liberação do reset nesse exemplo; não é um atraso garantido para todos os projetos.

![Figura 5.1-1: Sequência de energização e desligamento](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Sequência de energização e desligamento</em></div>

![Figura 5.1-2: Circuito de reset](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Circuito de reset</em></div>

![Figura 5.1-3: Medição da energização e do reset](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Medição da energização e do reset</em></div>

![Figura 5.1-4: Circuito DC-DC de referência para BGA](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Circuito DC-DC de referência para BGA</em></div>

![Figura 5.1-5: Circuito DC-DC de referência para QFN](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Circuito DC-DC de referência para QFN</em></div>

Conforme a nota de aplicação de hardware da SiFli, selecione um indutor BUCK de 4,7 µH com resistência em corrente contínua DCR ≤ 0,4 Ω e corrente de saturação Isat ≥ 450 mA.

### 5.2. Modo de boot { #52-boot-mode }

<div align="center"><em>Tabela 5.2-1: Configuração do modo de boot</em></div>

<div align="center" markdown>

| Configuração do modo | Descrição detalhada |
| :--- | :--- |
| Alto | Após a energização, o chip inicia no modo de download |
| Baixo | Após a energização, o chip inicia a execução na área do programa do usuário |

</div>

Mode em nível alto seleciona o download após a energização; em nível baixo, inicia o programa do usuário. Garanta que a bancada de produção possa definir o estado de boot e que o gabinete ou as restrições de teste não impeçam o acesso aos pinos envolvidos.

O pino Mode compartilha o domínio de tensão de VDDIOA. Use um resistor externo de 10 kΩ para a alimentação correspondente ou GND, mantendo o nível estável; não deixe o pino flutuante nem sujeito a comutações involuntárias. As placas de produção devem ter um ponto de teste Mode para gravação do firmware e calibração do cristal; não é necessário um jumper. Nas placas de teste, reserve um jumper para que seja possível recuperar uma aplicação travada iniciando no modo de download.

### 5.3. Geração de clock { #53-clock-generation }

<div align="center"><em>Tabela 5.3-1: Requisitos dos cristais</em></div>

<div align="center" markdown>

| Cristal | Requisitos do cristal | Descrição detalhada |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≦ CL ≦ 12 pF (valor recomendado: 8,8 pF), △F/F0 ≦ ±10 ppm, ESR ≦ 30 Ω (valor recomendado: 22 Ω) | O consumo do oscilador depende de CL e ESR. Dentro dos limites especificados, valores menores de CL e ESR reduzem o consumo. Reserve posições para capacitores de ajuste em paralelo junto ao cristal. Quando CL < 12 pF, não é necessário montar esses capacitores. |
| 32,768 kHz | CL ≦ 12,5 pF (valor recomendado: 7 pF), △F/F0 ≦ ±20 ppm, ESR ≦ 80 kΩ (valor recomendado: 38 kΩ) | O consumo depende de CL e ESR. Dentro dos limites especificados, prefira valores menores de CL e ESR para reduzir o consumo. Reserve posições para capacitores de ajuste em paralelo junto ao cristal. Quando CL < 12,5 pF, não é necessário montar esses capacitores. |

</div>

Posicione os dois cristais perto do chip, com trilhas curtas e simétricas e espaço para os capacitores de ajuste. Mantenha essas redes afastadas das fontes de ruído de RF, BUCK, display e motor.

### 5.4. RF { #54-rf }

O circuito de RF do SF32LB55x integra uma rede de casamento e filtragem de banda larga. Dimensione a trilha de RF para impedância característica de 50 Ω e reserve uma rede π para filtrar emissões espúrias e ajustar o casamento da antena. Defina os valores finais por testes com a antena e a PCB reais. Se a antena escolhida já estiver casada, normalmente não será necessário montar componentes adicionais na rede reservada.

Mantenha um plano de referência GND contínuo sob a trilha de RF. Posicione a rede de casamento perto do chip e o filtro de AVDD_BRF perto do pino. Afaste da área de RF as trilhas de DC-DC, VBAT, cristais, clocks de alta frequência, SPI, SDIO, I2S e UART.

O circuito RF de referência coloca C0323 (15 pF/50 V) em série com ANT e deixa as duas posições para GND, C0318 e C0319, sem montagem (NF). São valores de exemplo, não valores universais de casamento de antena.

![Figura 5.4-1: Circuito de referência de casamento de RF](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Circuito de referência de casamento de RF</em></div>

### 5.5. Interfaces de memória e armazenamento { #55-storage-interfaces }

O SF32LB55x oferece OPI PSRAM, NOR/NAND Flash e PSRAM por QSPI, além de eMMC ou Micro SD por SDIO. O encapsulamento determina os pinos e interfaces disponíveis. Escolha as memórias antes de finalizar a atribuição dos pinos e revisar o empilhamento da PCB.

BGA145 oferece um canal de OPI PSRAM externa; BGA169 oferece dois. As tabelas 5.5-1 a 5.5-3 descrevem a configuração BGA145 e as duas memórias BGA169, não três canais em um mesmo encapsulamento. As tabelas QSPI correspondem a QSPI2, QSPI3 e QSPI4. As tabelas SDIO abrangem SDIO1 nos modos de 4/8 bits e SDIO2 no modo de 4 bits.

Prefira QSPI2 para PSRAM QSPI externa. Se um GPIO do HCPU controlar a alimentação de uma PSRAM OPI/QSPI externa, use um pino HCPU do tipo PU, com nível alto para ligar e baixo para desligar. Para chavear VDD_SIP da Flash interna, use PA58 com a mesma polaridade. Peça ao FAE da SiFli uma avaliação do espaço Flash para os algoritmos de acelerômetro e frequência cardíaca do LCPU antes de decidir se adiciona NOR Flash em QSPI4.

As tabelas originais usam indicações de direção inconsistentes. No [esquema de referência BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png), nos [esquemas de referência BGA169 para a memória 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png) e [para a memória 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png), os pinos PA37/PA20 e PA07/PA08 do MCU, respectivamente, controlam CS# e CLK da PSRAM externa. Por isso, as tabelas abaixo descrevem CS# e CLK pelo ponto de vista do MCU: saída do MCU e entrada da PSRAM. Os esquemas não definem uma direção fixa para DQS/DM; consulte a função e a direção no datasheet da PSRAM selecionada.

Cada PSRAM ilustrada usa 1,8 V, três capacitores de 0,1 µF e um de 1 µF/6,3 V. RESET# e NC/CLK# sem conexão são específicos da memória mostrada; confira o datasheet da peça escolhida.

![Figura 5.5-1: Circuito OPI PSRAM BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito OPI PSRAM BGA145</em></div>

<div align="center"><em>Tabela 5.5-1: OPI PSRAM em BGA145</em></div>

<div align="center" markdown>

| Sinal PSRAM | Pino do MCU | Descrição detalhada |
| :--- | :--- | :--- |
| CS# | PA37 | Saída do MCU; entrada da PSRAM |
| CLK | PA20 | Saída do MCU; entrada da PSRAM |
| DQS | PA35 | DQS/DM; consulte a função e a direção no datasheet da PSRAM selecionada |
| DQ0 | PA28 | Entrada/saída de dados 0 |
| DQ1 | PA29 | Entrada/saída de dados 1 |
| DQ2 | PA30 | Entrada/saída de dados 2 |
| DQ3 | PA31 | Entrada/saída de dados 3 |
| DQ4 | PA34 | Entrada/saída de dados 4 |
| DQ5 | PA36 | Entrada/saída de dados 5 |
| DQ6 | PA38 | Entrada/saída de dados 6 |
| DQ7 | PA42 | Entrada/saída de dados 7 |

</div>

![Figura 5.5-2: Circuito OPI PSRAM BGA169, memória 1](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito OPI PSRAM BGA169, memória 1</em></div>

<div align="center"><em>Tabela 5.5-2: OPI PSRAM em BGA169, memória 1</em></div>

<div align="center" markdown>

| Sinal PSRAM | Pino do MCU | Descrição detalhada |
| :--- | :--- | :--- |
| CS# | PA07 | Saída do MCU; entrada da PSRAM |
| CLK | PA08 | Saída do MCU; entrada da PSRAM |
| DQS | PA15 | DQS/DM; consulte a função e a direção no datasheet da PSRAM selecionada |
| DQ0 | PA02 | Entrada/saída de dados 0 |
| DQ1 | PA04 | Entrada/saída de dados 1 |
| DQ2 | PA05 | Entrada/saída de dados 2 |
| DQ3 | PA06 | Entrada/saída de dados 3 |
| DQ4 | PA09 | Entrada/saída de dados 4 |
| DQ5 | PA11 | Entrada/saída de dados 5 |
| DQ6 | PA12 | Entrada/saída de dados 6 |
| DQ7 | PA13 | Entrada/saída de dados 7 |

</div>

![Figura 5.5-3: Circuito OPI PSRAM BGA169, memória 2](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito OPI PSRAM BGA169, memória 2</em></div>

<div align="center"><em>Tabela 5.5-3: OPI PSRAM em BGA169, memória 2</em></div>

<div align="center" markdown>

| Sinal PSRAM | Pino do MCU | Descrição detalhada |
| :--- | :--- | :--- |
| CS# | PA07 | Saída do MCU; entrada da PSRAM |
| CLK | PA08 | Saída do MCU; entrada da PSRAM |
| DQS | PA26 | DQS/DM; consulte a função e a direção no datasheet da PSRAM selecionada |
| DQ0 | PA18 | Entrada/saída de dados 0 |
| DQ1 | PA22 | Entrada/saída de dados 1 |
| DQ2 | PA24 | Entrada/saída de dados 2 |
| DQ3 | PA32 | Entrada/saída de dados 3 |
| DQ4 | PA33 | Entrada/saída de dados 4 |
| DQ5 | PA59 | Entrada/saída de dados 5 |
| DQ6 | PA62 | Entrada/saída de dados 6 |
| DQ7 | PA64 | Entrada/saída de dados 7 |

</div>

<div align="center"><em>Tabela 5.5-4: QSPI2: NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CS# | GPIO9 | PA61 | Seleção do chip, ativo em nível baixo |
| SO | GPIO7 | PA65 | Entrada de dados (linha de entrada/saída 1) |
| WP# | GPIO6 | PA66 | Saída de proteção contra gravação (linha de entrada/saída 2) |
| SI | GPIO8 | PA63 | Saída de dados (linha de entrada/saída 0) |
| SCLK | GPIO10 | PA60 | Saída de clock serial |
| Hold# | GPIO5 | PA68 | Saída de dados (linha de entrada/saída 3) |

</div>

<div align="center"><em>Tabela 5.5-5: QSPI3: NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CS# | GPIO16 | PA45 | Seleção do chip, ativo em nível baixo |
| SO | GPIO14 | PA49 | Entrada de dados (linha de entrada/saída 1) |
| WP# | GPIO13 | PA51 | Saída de proteção contra gravação (linha de entrada/saída 2) |
| SI | GPIO15 | PA47 | Saída de dados (linha de entrada/saída 0) |
| SCLK | GPIO17 | PA44 | Saída de clock serial |
| Hold# | GPIO12 | PA55 | Saída de dados (linha de entrada/saída 3) |

</div>

<div align="center"><em>Tabela 5.5-6: QSPI4: NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CS# | - | PB33 | Seleção do chip, ativo em nível baixo |
| SO | - | PB36 | Entrada de dados (linha de entrada/saída 1) |
| WP# | - | PB37 | Saída de proteção contra gravação (linha de entrada/saída 2) |
| SI | - | PB35 | Saída de dados (linha de entrada/saída 0) |
| SCLK | - | PB32 | Saída de clock serial |
| Hold# | - | PB07 | Saída de dados (linha de entrada/saída 3) |

</div>

<div align="center"><em>Tabela 5.5-7: SDIO1: eMMC/Micro SD de 4 bits</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Entrada de clock |
| CMD | GPIO9 | PA36 | Entrada de comando |
| DATA0 | GPIO8 | PA28 | Dado 0 |
| DATA1 | GPIO7 | PA29 | Dado 1 |
| DATA2 | GPIO6 | PA30 | Dado 2 |
| DATA3 | GPIO5 | PA31 | Dado 3 |

</div>

<div align="center"><em>Tabela 5.5-8: SDIO1: eMMC de 8 bits</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Entrada de clock |
| CMD | GPIO9 | PA36 | Entrada de comando |
| DATA0 | GPIO8 | PA28 | Dado 0 |
| DATA1 | GPIO7 | PA29 | Dado 1 |
| DATA2 | GPIO6 | PA30 | Dado 2 |
| DATA3 | GPIO5 | PA31 | Dado 3 |
| DATA4 | GPIO15 | PA47 | Dado 4 |
| DATA5 | GPIO14 | PA49 | Dado 5 |
| DATA6 | GPIO13 | PA51 | Dado 6 |
| DATA7 | GPIO12 | PA55 | Dado 7 |

</div>

<div align="center"><em>Tabela 5.5-9: SDIO2: eMMC/Micro SD de 4 bits</em></div>

<div align="center" markdown>

| Sinal da interface | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CLK | GPIO17 | PA44 | Entrada de clock |
| CMD | GPIO16 | PA45 | Entrada de comando |
| DATA0 | GPIO15 | PA47 | Dado 0 |
| DATA1 | GPIO14 | PA49 | Dado 1 |
| DATA2 | GPIO13 | PA51 | Dado 2 |
| DATA3 | GPIO12 | PA55 | Dado 3 |

</div>


### 5.6. Interfaces de display e toque { #56-display-and-touch-interfaces }

As opções de display incluem MIPI DSI, SPI/QSPI, MCU8080 e JDI. Escolha o painel antes de atribuir os pinos e rotear a PCB, para avaliar em conjunto a largura da interface, o clock, o controle de alimentação, a interrupção da tela sensível ao toque e a estratégia de retroiluminação.

As interfaces JDI paralela e serial podem usar os grupos de sinais multiplexados do lado PA (LCDC1) ou do lado PB (LCDC2). As tabelas a seguir mostram apenas as atribuições PA/LCDC1. A SiFli recomenda a interface PB/LCDC2. O guia-fonte não fornece uma tabela de atribuição pino a pino para LCDC2; confirme a atribuição efetiva na tabela de funções multiplexadas do chip, sem inferi-la pelas tabelas LCDC1.

<div align="center"><em>Tabela 5.6-1: Interface de display MIPI DSI</em></div>

<div align="center" markdown>

| Sinal MIPI DSI | Pino BGA145/169 | Descrição |
| :--- | :--- | :--- |
| CLKP | DSI_CLKP | Sinal de clock MIPI + |
| CLKN | DSI_CLKN | Sinal de clock MIPI - |
| D0P | DSI_D0P | Linha de dados MIPI 0+ |
| D0N | DSI_D0N | Linha de dados MIPI 0- |
| D1P | DSI_D1P | Linha de dados MIPI 1+ |
| D1N | DSI_D1N | Linha de dados MIPI 1- |
| - | AVDD18_DSI | Entrada de alimentação MIPI |
| - | DSI_REXT | Conecte um resistor externo de 10K à terra |
| - | AVSS_DSI | Terra |
| TE | PA77 | Sinal TE de sincronização dos quadros do MCU |
| RESET | PB17 | Sinal de reset do painel de display |

</div>

Notas de atribuição dos pinos do display:

- TE também pode usar outro GPIO do grupo PA.
- Se o painel aceitar o sinal TE pelo DSI, não é necessário um pino TE separado.
- RESET também pode usar outro GPIO do grupo PB.

<div align="center"><em>Tabela 5.6-2: Interface de display SPI/QSPI</em></div>

<div align="center" markdown>

| Sinal SPI | GPIO QFN68 | Pino BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | PB33 | Sinal de habilitação |
| WRX_SCL | GPIO23 | PB32 | Sinal de clock |
| DCX | GPIO20 | PB36 | Sinal de dados/comando no modo SPI de 4 fios; dado 1 no modo Quad-SPI |
| SDI_RDX | GPIO21 | PB35 | Sinal de entrada de dados no modo SPI de 3/4 fios; dado 0 no modo Quad-SPI |
| SDO | GPIO21 | PB35 | Sinal de saída de dados no modo SPI de 3/4 fios; conecte-o ao SDI_RDX |
| D[0] | GPIO19 | PB37 | Linha de dados 2 no modo Quad-SPI |
| D[1] | GPIO18 | PB07 | Linha de dados 3 no modo Quad-SPI |
| RESET | GPIO2 | PB17 | Sinal de reset do painel de display |
| TE | GPIO3 | PB77 | Sinal TE de sincronização dos quadros do MCU |

</div>

Notas de atribuição dos pinos do display:

- TE pode usar PA77 ou outro GPIO do grupo PA configurado para simular esse sinal.
- RESET pode usar qualquer GPIO. Para uma tela sempre ativa (AOD), a SiFli recomenda um GPIO do grupo PB.

<div align="center"><em>Tabela 5.6-3: Interface de display MCU8080</em></div>

<div align="center" markdown>

| Sinal MCU8080 | GPIO QFN68 | Pino BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | - | Seleção do chip |
| WRX | GPIO23 | - | Sinal de strobe de escrita de dados |
| DCX | GPIO20 | - | Seleção entre dados e comando do display |
| RDX | GPIO21 | - | Sinal de strobe para operações de leitura do controlador do display |
| D[0] | GPIO19 | - | Linha de dados 0 |
| D[1] | GPIO18 | - | Linha de dados 1 |
| D[2] | GPIO17 | - | Linha de dados 2 |
| D[3] | GPIO16 | - | Linha de dados 3 |
| D[4] | GPIO15 | - | Linha de dados 4 |
| D[5] | GPIO14 | - | Linha de dados 5 |
| D[6] | GPIO13 | - | Linha de dados 6 |
| D[7] | GPIO12 | - | Linha de dados 7 |
| RESET | GPIO2 | - | Reset |
| TE | GPIO3 | - | Sinal TE de sincronização dos quadros do MCU |

</div>

Notas de atribuição dos pinos do display:

- TE pode usar PA77 ou outro GPIO do grupo PA configurado para simular esse sinal.
- RESET pode usar qualquer GPIO. Para uma tela sempre ativa (AOD), a SiFli recomenda um GPIO do grupo PB.

O [guia de aplicação de hardware da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) identifica RDX como um strobe de leitura, mas termina a descrição com “para escrever dados”. Isso contradiz o nome RDX e o sinal WRX de strobe de escrita associado; aqui, a frase é tratada como um erro de redação da fonte. O suporte à leitura e seus tempos dependem do controlador de display escolhido; confirme-os no datasheet desse controlador.

<div align="center"><em>Tabela 5.6-4: Interface paralela de display JDI</em></div>

<div align="center" markdown>

| Sinal JDI | Pino do MCU (LCDC1) | Descrição detalhada |
| :--- | :--- | :--- |
| JDI_VCK | PA20 | Clock de deslocamento do driver vertical |
| JDI_VST | PA31 | Sinal de início do driver vertical |
| JDI_XRST | PA34 | Sinal de reset dos drivers horizontal e vertical |
| JDI_HCK | PA36 | Clock de deslocamento do driver horizontal |
| JDI_HST | PA38 | Sinal de início do driver horizontal |
| JDI_ENB | PA42 | Habilitação de escrita da memória de pixels |
| JDI_R1 | PA49 | Dados vermelhos da imagem (pixels ímpares) |
| JDI_R2 | PA51 | Dados vermelhos da imagem (pixels pares) |
| JDI_G1 | PA55 | Dados verdes da imagem (pixels ímpares) |
| JDI_G2 | PA77 | Dados verdes da imagem (pixels pares) |
| JDI_B1 | PA78 | Dados azuis da imagem (pixels ímpares) |
| JDI_B2 | PA79 | Dados azuis da imagem (pixels pares) |
| JDI_XFRP | PA45 | Sinal de acionamento do cristal líquido (pixel “ligado”) |
| JDI_VCOM/FRP | PA47 | Sinal do eletrodo comum / sinal de acionamento do cristal líquido (pixel “desligado”) |

</div>

<div align="center"><em>Tabela 5.6-5: Interface serial de display JDI</em></div>

<div align="center" markdown>

| Sinal JDI | Pino do MCU (LCDC1) | Descrição detalhada |
| :--- | :--- | :--- |
| JDI_SCS | PA31 | Sinal de seleção do chip |
| JDI_SCLK | PA20 | Sinal de clock serial |
| JDI_SO | PA34 | Sinal de saída de dados serial |
| JDI_DISP | PA36 | Sinal de comutação do display (ligado/desligado) |
| JDI_EXTCOMIN | PA38 | Entrada de polaridade de inversão COM |

</div>

<div align="center"><em>Tabela 5.6-6: Interfaces de toque e retroiluminação</em></div>

<div align="center" markdown>

| Sinais de toque e retroiluminação | GPIO QFN68 | Pino BGA145 | Pino BGA169 | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- |
| Interrupção | GPIO1 | PA79 | PA79 | Interrupção de status da tela sensível ao toque (pode despertar o sistema) |
| I2C1_SCL | GPIO25 | PA10 | PA10 | Clock I2C da tela sensível ao toque |
| I2C1_SDA | GPIO24 | PA14 | PA14 | Dados I2C da tela sensível ao toque |
| BL_PWM | GPIO0 | - | - | Controle PWM da retroiluminação |
| Reset | GPIO16 | PA00 | PA00 | Sinal de reset da tela sensível ao toque |
| Habilitação da alimentação | GPIO26 | PA06 | PA03 | Habilitação da alimentação da tela sensível ao toque |

</div>

Para BL_PWM, use um GPIO com a função GPTIM1_CHx e configure um estado adequado de pull-up ou pull-down para evitar que a retroiluminação seja ligada inesperadamente durante a partida a frio.

### 5.7. Interfaces de despertar, GPADC e produção { #57-wake-gpadc-and-manufacturing-interfaces }

Planeje o acesso aos sinais de despertar, analógicos, de depuração e de produção considerando o gabinete e o gabarito de teste. Os pinos de despertar precisam de níveis de repouso definidos e proteção ESD; os divisores do GPADC devem equilibrar o tempo de acomodação e a corrente de fuga; e o acesso para depuração e gravação deve permanecer disponível nas etapas EVT e de produção.

O SF32LB55x oferece quatro fontes de despertar do HCPU (WKUP_A0–WKUP_A3) e seis do LCPU (WKUP_B0–WKUP_B5). Cada uma desperta seu respectivo CPU; apenas as seis fontes do LCPU permitem sair de Hibernate. Nenhuma das dez entradas pode ficar flutuante: adicione pull-up ou pull-down externo conforme a função para evitar fuga durante o repouso.

No circuito de referência, KEY1 conecta-se a PB48 com pull-up de 10 kΩ para VDD_1V8, proteção ESD e um capacitor. A rede KEY2 mostra pull-ups de 10 kΩ, proteção ESD e conexões selecionáveis por jumper para PA08, PA77 ou PA78; C0004 está marcado como NF (não montado). São exemplos de circuito, não uma lista de pinos capazes de despertar o sistema: PA08 não consta na tabela 5.7-1. Selecione nessa tabela a entrada compatível que será usada e mantenha cada entrada em um nível de repouso definido.

![Figura 5.7-1: Circuito de referência do botão de despertar](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-1: Circuito de referência do botão de despertar</em></div>

Use um GPIO com GPTIM1_CHx para o PWM do motor. Selecione o comportamento PU/PD adequado para evitar acionamento indevido na partida a frio. O circuito usa GPIO17 (PA44), um transistor no lado de GND e um pull-down de 1 MΩ no gate, com 3 V para o motor e uma alimentação separada de 3,3 V para o MCU.

![Figura 5.7-2: Circuito de referência do driver do motor](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-2: Circuito de referência do driver do motor</em></div>

<div align="center"><em>Tabela 5.7-1: Fontes de interrupção de despertar</em></div>

<div align="center" markdown>

| Fonte de interrupção | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| WKUP_A0 | GPIO3 | PA77 | Sinal de interrupção 0 do HCPU |
| WKUP_A1 | GPIO2 | PA78 | Sinal de interrupção 1 do HCPU |
| WKUP_A2 | GPIO1 | PA79 | Sinal de interrupção 2 do HCPU |
| WKUP_A3 | GPIO0 | PA80 | Sinal de interrupção 3 do HCPU |
| WKUP_B0 | GPIO43 | PB43 | Sinal de interrupção 0 do LCPU |
| WKUP_B1 | GPIO44 | PB44 | Sinal de interrupção 1 do LCPU |
| WKUP_B2 | GPIO45 | PB45 | Sinal de interrupção 2 do LCPU |
| WKUP_B3 | GPIO46 | PB46 | Sinal de interrupção 3 do LCPU |
| WKUP_B4 | GPIO47 | PB47 | Sinal de interrupção 4 do LCPU |
| WKUP_B5 | GPIO48 | PB48 | Sinal de interrupção 5 do LCPU |

</div>

O guia de aplicação de hardware da SiFli descreve um GPADC de cinco canais e 10 bits, com entrada de 0–0,9 V. Para um projeto conservador, conecte VIN diretamente somente se estiver abaixo de 0,9 V; tensões maiores exigem um divisor que mantenha VADC abaixo de 0,9 V. Para a bateria, a fonte sugere uma relação R1:R2 próxima de 5:1 e resistores na faixa de MΩ: reduzir a corrente aumenta o tempo de acomodação. O circuito adiciona um capacitor de 0,1 µF entre VADC e GND. Use `VADC = VIN × R2 / (R1 + R2)` e confira a tensão máxima da bateria e as tolerâncias; as correntes da tabela 5.7-2 se referem a VIN = 4,2 V, não a qualquer condição.

Discrepância entre fontes: o [guia de aplicação de hardware OpenSiFli, de maior prioridade](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) descreve um GPADC de 10 bits e cinco canais, com faixa de entrada de 0–0,9 V. O item 2 da [lista de verificação de esquemático V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) define o máximo de 1,0 V, mas não informa o número de canais. O [datasheet SF32LB55x V1.7.2, seção 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) especifica oito entradas não diferenciais (single-ended) ou quatro pares diferenciais, com faixas de 0–1,1 V e −0,7 a 0,7 V, respectivamente; a tabela de pinos lista GPADC_CH0–CH7. O [guia ADC atual do SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) também mapeia oito canais (0–7) e informa 1,1 V como tensão máxima de amostragem. A SiFli não explicou as diferenças no número de canais nem nos limites de tensão. Até obter esclarecimento por escrito, este guia mantém como base de projeto o critério da fonte de maior prioridade: cinco canais e faixa de entrada de 0–0,9 V. Mantenha VADC abaixo de 0,9 V; não trate 1,0 V ou 1,1 V como limites de projeto aprovados e confirme com a SiFli quais canais estão disponíveis para o número de peça e o encapsulamento escolhidos.

![Figura 5.7-3: Entrada GPADC e divisor de referência](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-3: Entrada GPADC e divisor de referência</em></div>

<div align="center"><em>Tabela 5.7-2: Exemplos de divisores do GPADC</em></div>

<div align="center" markdown>

| Combinação de resistores | R1 (kΩ) ±1% | R2 (kΩ) ±1% | Tempo de estabilização da tensão (ms) | Iq (µA) (VIN = 4,2 V) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1000 | 220 | 138 | 3,44 |
| 2 | 2000 | 430 | 250 | 1,73 |
| 3 | 3000 | 680 | 302 | 1,14 |
| 4 | 4300 | 910 | - | 0,81 |
| 5 | 5100 | 1100 | 420 | 0,68 |

</div>

Conecte ao LCPU as interfaces I2C/SPI, os sinais de controle e as interrupções de despertar dos sensores de frequência cardíaca e aceleração. Use DC-DC, LDO ou chaves de carga de baixo Iq para ligar e desligar suas alimentações conforme necessário.

O áudio Bluetooth externo usa UART1 do HCPU. Compatibilize os níveis ou adicione um conversor; ao cortar a alimentação do módulo, corte simultaneamente a do conversor para evitar fuga. Se o módulo continuar alimentado em Standby e seu enable for ativo em nível baixo, use um GPIO do LCPU com comportamento PD padrão.

<div align="center"><em>Tabela 5.7-3: Interface de depuração e gravação</em></div>

<div align="center" markdown>

| Sinal UART | QFN68 | BGA145/169 | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| TXD1 | GPIO13 | PA19 | Sinal UART1 RXD |
| RXD1 | GPIO14 | PA17 | Sinal UART1 TXD |
| TXD2 | - | PA07 | Sinal UART2 RXD |
| RXD2 | - | PA05 | Sinal UART2 TXD |
| TXD3 | GPIO46 | PB46 | Sinal UART3 RXD, porta padrão de registro do sistema |
| RXD3 | GPIO45 | PB45 | Sinal UART3 TXD, porta padrão de registro do sistema |
| TXD4 | - | PB14 | Sinal UART4 RXD |
| RXD4 | - | PB12 | Sinal UART4 TXD |
| TXD5 | - | PB11 | Sinal UART5 RXD |
| RXD5 | - | PB06 | Sinal UART5 TXD |
| SWCLK | GPIO41 | PB31 | Sinal de clock SWD |
| SWDIO | GPIO42 | PB34 | Sinal de dados SWD |

</div>

Não deixe UART RXD flutuante; habilite o pull-up interno na inicialização do firmware. UART3 é a porta de registro padrão. A SiFli oferece um gravador autônomo para gravação em produção e calibração dos cristais. Reserve ao menos VBAT, GND, VDDIOA, VDDIOB, RSTN, Mode, SWDIO, SWCLK, RXD1, TXD1, RXD3 e TXD3 como pontos de teste. O subconjunto de produção é VBAT, GND, boot_mode, VDDIOB, RXD3 e TXD3. VBAT e boot_mode são nomes usados no gabarito de teste da fonte; identifique a alimentação real da placa e a conexão Mode antes de ligar os cabos.

O desenho original conecta VDD_1V8 ao pino 1 (VTref). SWDIO e SWCLK são conectados aos pinos 7 e 9, respectivamente, cada um por um resistor em série de 22 Ω. O [J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector) padrão também usa o pino 1 para [VTref](https://kb.segger.com/VTref), a entrada de referência da tensão-alvo, e não uma saída de alimentação do probe. Verifique a orientação do conector e a compatibilidade com 1,8 V antes de conectar um cabo padrão.

![Figura 5.7-4: Conector SWD original: verificar o adaptador](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-4: Conector SWD original: verificar o adaptador</em></div>
