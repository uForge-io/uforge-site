---
icon: lucide/circuit-board
description: "Diretrizes de projeto do esquemático do MCU SF32LB56x: alimentação, modos de operação e fontes de despertar, geração de clock, RF, interfaces de display/toque/retroiluminação, armazenamento/sensores/áudio/conectividade e produção."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56x — diretrizes para o esquemático { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "Parte do guia de projeto de hardware SF32LB56x"
    Esta página cobre a Seção 5, diretrizes para o projeto do esquemático. Comece pela [visão geral do guia de projeto de hardware SF32LB56x](SF32LB56x_hardware_design_guide.md) para selecionar o dispositivo e conhecer o fluxo completo; depois consulte o [checklist do esquemático](SF32LB56x_schematic_checklist.md) ou avance para as [diretrizes de layout da PCB](SF32LB56x_pcb_layout.md).

## 5. Diretrizes para o projeto do esquemático { #5-schematic-design-guidelines }

### 5.1. Sistema de alimentação { #51-power-system }

Revise em conjunto os trilhos de alimentação do processador, os capacitores locais necessários, a atribuição das saídas do PMIC, a temporização do reset e as conexões do carregador. As variantes U e V seguem o mesmo método de projeto da alimentação, mas diferem nos nomes dos pinos de alimentação e na atribuição das cargas.

<div align="center"><em>Tabela 5.1-1: Trilhos de alimentação do processador SF32LB56xU</em></div>

<div align="center" markdown>

| Pino de alimentação da PMU | Tensão mínima (V) | Tensão típica (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.7 | 1.8 | 3.6 | 100 | Entrada de alimentação PVDD. |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | A saída BUCK_LX conecta-se ao indutor; a entrada de alimentação interna conecta-se à outra extremidade do indutor e a um capacitor externo. |
| LDO1_VOUT | - | 1.1 | - | 50 | Saída LDO1; requer capacitor externo. |
| LDO2_VOUT | - | 0.9 | - | 20 | Saída LDO2; requer capacitor externo. |
| VDD_RET | - | 0.9 | - | 1 | Saída do LDO RET; requer capacitor externo. |
| VDD_RTC | - | 1.1 | - | 1 | Saída do LDO RTC; requer capacitor externo. |
| MIC_BIAS | 1.4 | - | 2.8 | - | Saída de alimentação do microfone. |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | Entrada de alimentação analógica e de alimentação do RFPA. |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | Alimentação analógica de áudio. |
| VDDIO1 | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação do dispositivo de armazenamento integrado ao encapsulamento do núcleo grande. |
| VDDIO2 | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação dos GPIOs PA (exceto PA5~11). |
| VDDIO3 | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de PA5~11. |
| VDDIO4 | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação dos GPIOs PB e da Flash integrada ao encapsulamento do núcleo pequeno. |
| GPADC_VREF | - | - | - | - | Entrada de referência de tensão do GPADC; conecte somente um capacitor externo, sem necessidade de alimentação externa. |
| AUD_VREF | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor externo, sem necessidade de alimentação externa. |

</div>

<div align="center"><em>Tabela 5.1-2: Trilhos de alimentação do processador SF32LB56xV</em></div>

<div align="center" markdown>

| Pino de alimentação da PMU | Tensão mínima (V) | Tensão típica (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.71 | 1.8 | 3.6 | 100 | Entrada de alimentação PVDD. |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | A saída BUCK_LX conecta-se ao indutor; a entrada de alimentação interna conecta-se à outra extremidade do indutor e a um capacitor externo. |
| LDO1_VOUT | - | 1.1 | - | 50 | Saída LDO1 conectada a um capacitor externo. |
| LDO2_VOUT | - | 0.9 | - | 20 | Saída LDO2 conectada a um capacitor externo. |
| VDD_RET | - | 0.9 | - | 1 | Saída do LDO RET conectada a um capacitor externo. |
| VDD_RTC | - | 1.1 | - | 1 | Saída do LDO RTC conectada a um capacitor externo. |
| MIC_BIAS | 1.4 | - | 2.8 | - | Saída de alimentação do microfone. |
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | Entrada de alimentação de RF. |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | Entrada de alimentação analógica e de alimentação do RFPA. |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | Alimentação analógica de áudio. |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de E/S de PA12-PA78. |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de E/S de PA0-PA11. |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | Entrada de alimentação de E/S de PB. |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPA. |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPB. |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | Entrada de alimentação de SIPC. |
| GPADC_VREF | - | - | - | - | Entrada de referência de tensão do GPADC; conecte somente um capacitor externo, sem necessidade de alimentação externa. |
| AUD_VREF | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor externo, sem necessidade de alimentação externa. |

</div>

<div align="center"><em>Tabela 5.1-3: Capacitores de alimentação necessários para SF32LB56xU</em></div>

<div align="center" markdown>

| Pino de alimentação | Capacitor | Descrição detalhada |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | Coloque pelo menos dois capacitores, de 10uF e 0.1uF, próximos ao pino. |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | Coloque pelo menos dois capacitores, de 4.7uF e 0.1uF, próximos ao pino. |
| LDO1_VOUT | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| LDO2_VOUT | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| VDD_RET | 0.47uF | Coloque pelo menos um capacitor de 0.47uF próximo ao pino. |
| VDD_RTC | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| AVDD33_ANA | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| GPADC_VREF | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| AVDD33_AUD | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| AUD_VREF | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| MIC_BIAS | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIO1 | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIO2 | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIO3 | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIO4 | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |

</div>

<div align="center"><em>Tabela 5.1-4: Capacitores de alimentação necessários para SF32LB56xV</em></div>

<div align="center" markdown>

| Pino de alimentação | Capacitor | Descrição detalhada |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | Coloque pelo menos dois capacitores, de 10uF e 0.1uF, próximos ao pino. |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | Coloque pelo menos dois capacitores, de 4.7uF e 0.1uF, próximos ao pino. |
| LDO1_VOUT | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| LDO2_VOUT | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| VDD_RET | 0.47uF | Coloque pelo menos um capacitor de 0.47uF próximo ao pino. |
| VDD_RTC | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| AVDD_BRF | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| AVDD33_ANA | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| GPADC_VREFP | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| AVDD33_AUD | 4.7uF | Coloque pelo menos um capacitor de 4.7uF próximo ao pino. |
| AUD_VREF | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| MIC_BIAS | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIOA | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIOA2 | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIOB | 1uF | Coloque pelo menos um capacitor de 1uF próximo ao pino. |
| VDDIOSA | 0.1uF | Coloque pelo menos um capacitor de 0.1uF próximo ao pino. |
| VDDIOSB | 0.1uF | Coloque pelo menos um capacitor de 0.1uF próximo ao pino. |
| VDDIOSC | 0.1uF | Coloque pelo menos um capacitor de 0.1uF próximo ao pino. |

</div>

<div align="center"><em>Tabela 5.1-5: Valores nominais de saída do PMIC SF30147C (exemplo da variante U)</em></div>

<div align="center" markdown>

| Pino de alimentação do SF30147C | Tensão mínima (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | Saída de 1,8 V; não deduza desta linha a atribuição aos pinos de alimentação do SF32LB56xU |
| LVSW1 | 1.8 | 1.8 | 100 | Saída de alimentação de 1.8V. |
| LVSW2 | 1.8 | 1.8 | 100 | Entrada de alimentação de 1.8V do sensor G. |
| LVSW3 | 1.8 | 1.8 | 150 | Entrada de alimentação de 1.8V do sensor de frequência cardíaca. |
| LVSW4 | 1.8 | 1.8 | 150 | Entrada de alimentação de 1.8V do LCD. |
| LVSW5 | 1.8 | 1.8 | 150 | Saída de alimentação de 1.8V. |
| LDO1 | 2.8 | 3.3 | 100 | Saída de 2,8 a 3,3 V; não deduza desta linha a atribuição aos pinos de alimentação do SF32LB56xU |
| LDO2 | 2.8 | 3.3 | 100 | Entrada de alimentação do motor. |
| LDO3 | 2.8 | 3.3 | 100 | Entrada de alimentação de 3.3V do LCD. |
| LDO4 | 2.8 | 3.3 | 100 | Entrada de alimentação de 3.3V do sensor de frequência cardíaca. |
| HVSW1 | 2.8 | 5 | 150 | Entrada de alimentação do PA analógico Classe K. |
| HVSW2 | 2.8 | 5 | 150 | Entrada de alimentação do GPS. |

</div>

!!! warning "Verifique a atribuição dos trilhos do PMIC para a variante U"
    A tabela original da SiFli para a distribuição de alimentação da variante U lista VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C e AVDD_BRF, em conflito com a tabela de alimentação do processador U no mesmo guia. A tabela acima mantém apenas os limites de tensão e corrente das saídas do PMIC. Não a use para inferir as conexões aos pinos de alimentação do chip U; confirme o mapeamento na revisão correspondente do esquemático e na folha de dados do SF30147C antes de liberar o layout.

<div align="center"><em>Tabela 5.1-6: Exemplo de distribuição de alimentação do PMIC SF30147C para V</em></div>

<div align="center" markdown>

| Pino de alimentação do SF30147C | Tensão mínima (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | Entrada de alimentação de 1.8V para PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC, AVDD_BRF etc. do SF32LB56xV. |
| LVSW1 | 1.8 | 1.8 | 100 | Entrada de alimentação lógica do PA Classe K I2S. |
| LVSW2 | 1.8 | 1.8 | 100 | Entrada de alimentação de 1.8V do sensor G. |
| LVSW3 | 1.8 | 1.8 | 150 | Entrada de alimentação de 1.8V do sensor de frequência cardíaca. |
| LVSW4 | 1.8 | 1.8 | 150 | Entrada de alimentação de 1.8V do LCD. |
| LVSW5 | 1.8 | 1.8 | 150 | Entrada de alimentação do núcleo eMMC. |
| LDO1 | 2.8 | 3.3 | 100 | Entrada de alimentação de 3.3V para AVDD33_ANA, AVDD33_AUD, VDDIOA2 etc. do SF32LB56xV. |
| LDO2 | 2.8 | 3.3 | 100 | Entrada de alimentação de eMMC ou SD NAND. |
| LDO3 | 2.8 | 3.3 | 100 | Entrada de alimentação de 3.3V do LCD. |
| LDO4 | 2.8 | 3.3 | 100 | Entrada de alimentação de 3.3V do sensor de frequência cardíaca. |
| HVSW1 | 2.8 | 5 | 150 | Entrada de alimentação do PA analógico Classe K. |
| HVSW2 | 2.8 | 5 | 150 | Entrada de alimentação do GPS. |

</div>

![Figure 5.1-1: SF32LB56xU POR/BOR Timing](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Temporização POR/BOR do SF32LB56xU</em></div>

![Figure 5.1-2: SF32LB56xV POR/BOR Timing](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Temporização POR/BOR do SF32LB56xV</em></div>

![Figure 5.1-3: SF32LB56xU BUCK Reference Circuit](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Circuito de referência BUCK do SF32LB56xU</em></div>

![Figure 5.1-4: SF32LB56xV BUCK Reference Circuit](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Circuito de referência BUCK do SF32LB56xV</em></div>

![Figure 5.1-5: SF32LB56xU LDO Reference Circuit](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Circuito de referência LDO do SF32LB56xU</em></div>

![Figure 5.1-6: SF32LB56xV LDO Reference Circuit](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-6: Circuito de referência LDO do SF32LB56xV</em></div>

![Figure 5.1-7: SF32LB56xU Charging Reference Circuit](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-7: Circuito de referência de carga do SF32LB56xU</em></div>

![Figure 5.1-8: SF32LB56xV Charging Reference Circuit](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-8: Circuito de referência de carga do SF32LB56xV</em></div>

Sem gerenciamento do caminho de alimentação, o sistema fica conectado diretamente à VBAT junto com a bateria. A solução custa menos, mas os circuitos a jusante não podem ser totalmente isolados da bateria: a corrente de fuga aumenta e o requisito de baixo consumo do Shipping Mode não é atendido. Com a bateria sobredescarregada, a corrente de carga lenta (trickle) do carregador deve superar a soma da corrente do sistema e das fugas (i1+i2 no diagrama de origem). Com o sistema em funcionamento, a corrente de carga constante também deve superar i1+i2; caso contrário, a carga do sistema consome parte da corrente de carga e a bateria pode não carregar por completo. Um carregador com gerenciamento do caminho de alimentação separa a alimentação do sistema em VSYS da carga da bateria em VBAT, oferece suporte ao Shipping Mode e pode alimentar o sistema por VSYS mesmo com a bateria sobredescarregada.

Na variante U, escolha entre três topologias de alimentação conforme a tensão de I/O dos periféricos e a meta de consumo do sistema. Nas três, AVDD33_ANA e AVDD33_AUD são alimentados com 3,3 V. A topologia de menor consumo alimenta PVDD e VDDIO1–VDDIO4 com 1,8 V e usa periféricos com I/O de 1,8 V. A topologia intermediária mantém PVDD e VDDIO1 em 1,8 V, enquanto VDDIO2–VDDIO4 e o I/O dos periféricos usam 3,3 V. Na topologia de maior consumo, somente VDDIO1, que alimenta a PSRAM integrada, permanece em 1,8 V; PVDD, VDDIO2–VDDIO4 e o I/O dos periféricos usam 3,3 V. Use chaves de carga para gerenciar dinamicamente a alimentação dos módulos externos e mantenha-os desligados por padrão quando não estiverem em uso. Para módulos que precisam permanecer ligados, escolha componentes com baixa corrente quiescente. O nível padrão de hardware do GPIO de controle deve corresponder à polaridade de habilitação da chave para mantê-la desligada na inicialização. A SiFli recomenda um resistor pull-up ou pull-down de 1 MΩ na entrada de habilitação.

A PMU da variante U conclui o reset de energização quando PVDD chega a 1,5 V. Se PVDD cair, ocorre reset por brownout no limite BOR configurado, ajustável de 1,5 V a 2,5 V.

### 5.2. Modos de operação e fontes de despertar { #52-operating-modes-and-wake-sources }

Revise em conjunto as decisões sobre modo de operação, fonte de despertar, alimentação dos resistores de pull-up e corrente de fuga. Use pinos compatíveis com despertar para botões, tela tátil, interrupções de sensores, eventos do carregador e outros sinais de despertar em baixo consumo.

<div align="center"><em>Tabela 5.2-1: Modos de operação do SF32LB56xU</em></div>

<div align="center" markdown>

| Modo de operação | CPU | Periférico | SRAM | E/S | LPTIM | Fonte de despertar | Tempo de despertar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ativo | Em execução | Em execução | Acessível | Comutável | Em execução |  |  |
| WFI/WFE | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 0.5us |
| DEEPWFI | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 5us |
| Light Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC, GPIO, LPTIM, interrupção entre sistemas, Bluetooth, comparador | < 100us |
| Deep Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução |  | < 300us |
| Standby | Reset | Reset | Inacessível; LP totalmente retida e HP retém apenas 160KB | Nível mantido | Em execução | RTC, botões, LPTIM, interrupção entre sistemas, Bluetooth | 1.5ms+recuperação |
| Hibernate RTC | Reset | Reset | Dados não retidos | Alta impedância | Reset | RTC, botões | > 2ms |
| Hibernate pin | Reset | Reset | Dados não retidos | Alta impedância | Reset | Botões | > 2ms |

</div>

<div align="center"><em>Tabela 5.2-2: Modos de operação do SF32LB56xV</em></div>

<div align="center" markdown>

| Modo de operação | CPU | Periférico | SRAM | E/S | LPTIM | Fonte de despertar | Tempo de despertar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ativo | Em execução | Em execução | Acessível | Comutável | Em execução |  |  |
| WFI/WFE | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 0.5us |
| DEEPWFI | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 5us |
| Light Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC/GPIO/LPTIM/LPCOMP/interrupção entre sistemas/Bluetooth | < 100us |
| Deep Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC/GPIO/LPTIM/LPCOMP/interrupção entre sistemas/Bluetooth | < 300us |
| Standby | Reset | Reset | Inacessível; LP totalmente retida e HP retém apenas 160KB | Nível mantido | Em execução | RTC/botões/LPTIM/interrupção entre sistemas/Bluetooth | 1.5ms + recuperação |
| Hibernate RTC | Reset | Reset | Dados não retidos | Alta impedância | Reset | RTC/botões | > 2ms |
| Hibernate pin | Reset | Reset | Dados não retidos | Alta impedância | Reset | Botões | > 2ms |

</div>

<div align="center"><em>Tabela 5.2-3: Fontes de interrupção de despertar do SF32LB56xU</em></div>

<div align="center" markdown>

| Fonte da interrupção | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Sinal de interrupção 0. |
| WKUP_PIN1 | PB33 | Sinal de interrupção 1. |
| WKUP_PIN2 | PB34 | Sinal de interrupção 2. |
| WKUP_PIN5 | PA50 | Sinal de interrupção 5. |
| WKUP_PIN6 | PA51 | Sinal de interrupção 6. |
| WKUP_PIN10 | PBR0 | Sinal de interrupção 10. |
| WKUP_PIN11 | PBR1 | Sinal de interrupção 11. |
| WKUP_PIN12 | PBR2 | Sinal de interrupção 12. |

</div>

<div align="center"><em>Tabela 5.2-4: Fontes de interrupção de despertar do SF32LB56xV</em></div>

<div align="center" markdown>

| Fonte da interrupção | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Sinal de interrupção 0. |
| WKUP_PIN1 | PB33 | Sinal de interrupção 1. |
| WKUP_PIN2 | PB34 | Sinal de interrupção 2. |
| WKUP_PIN3 | PB35 | Sinal de interrupção 3. |
| WKUP_PIN4 | PB36 | Sinal de interrupção 4. |
| WKUP_PIN5 | PA50 | Sinal de interrupção 5. |
| WKUP_PIN6 | PA51 | Sinal de interrupção 6. |
| WKUP_PIN7 | PA52 | Sinal de interrupção 7. |
| WKUP_PIN8 | PA53 | Sinal de interrupção 8. |
| WKUP_PIN9 | PA54 | Sinal de interrupção 9. |
| WKUP_PIN10 | PBR0 | Sinal de interrupção 10. |
| WKUP_PIN11 | PBR1 | Sinal de interrupção 11. |
| WKUP_PIN12 | PBR2 | Sinal de interrupção 12. |
| WKUP_PIN13 | PBR3 | Sinal de interrupção 13. |

</div>

BOOT_MODE seleciona o comportamento de inicialização: nível alto entra no modo de download; em nível baixo, a ROM procura um programa do usuário, inicia-o se existir e, caso contrário, entra no modo de download. O pino Mode da variante U tem pull-down interno, pode ficar flutuante quando não utilizado e pertence ao domínio VDDIO2. O pino Mode da variante V pertence ao domínio VDDIOA e deve ficar estável com pull-up ou pull-down de 10 kΩ; não o deixe flutuante nem permita que interferências alterem seu nível. Reserve um ponto de teste Mode nas placas de produção; um jumper de recuperação é útil em placas de desenvolvimento.

Considere a alimentação de I/O da memória nos desligamentos de baixo consumo. Em Standby na variante U, os níveis GPIO são mantidos e VDDIO1 pode continuar alimentado; coloque as memórias ligadas a MPI1/MPI2 em modo de baixo consumo. Em Hibernate, os níveis GPIO não são mantidos; desligue VDDIO1 para evitar fuga pela I/O da memória integrada. Na variante V, mantenha alimentada a I/O da memória integrada durante Standby. Antes de Hibernate, desligue VDDIOSA e VDDIOSB por meio de PBR0 e coloque a Flash NOR em Deep Power-Down. VDDIOSC deve permanecer alimentado.

### 5.3. Geração de clock { #53-clock-generation }

<div align="center"><em>Tabela 5.3-1: Requisitos dos cristais</em></div>

<div align="center" markdown>

| Cristal | Requisitos da especificação do cristal | Descrição detalhada |
| :--- | :--- | :--- |
| 48MHz | 7pF≦CL≦12pF (valor recomendado: 8.8pF) △F/F0≦±10ppm ESR≦30 ohms (valor recomendado: 22ohms) | O consumo do oscilador a cristal depende de CL e ESR. Quanto menores CL e ESR, menor o consumo. Para obter o melhor desempenho energético, recomenda-se usar componentes com valores relativamente baixos de CL e ESR dentro da faixa exigida. Reserve capacitores de casamento em paralelo próximos ao cristal. Quando CL<12pF, não é necessário montar capacitores. |
| 32.768KHz | CL≦12.5pF (valor recomendado: 7pF) △F/F0≦±20ppm ESR≦80k ohms (valor recomendado: 38Kohms) | O consumo do cristal depende de CL e ESR. Quanto menores CL e ESR, menor o consumo. Para otimizar o consumo, recomenda-se usar componentes com valores relativamente baixos de CL e ESR dentro da faixa exigida. Reserve capacitores de casamento em paralelo próximos ao cristal. Quando CL<12.5pF, não é necessário soldar capacitores. |

</div>

<div align="center"><em>Tabela 5.3-2: Modelos de cristal recomendados</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Parâmetros |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48.000000MHz, △F/F0 = -6 ~ 8 ppm, CL = 8.8 pF, ESR = 22 ohms máx., TOPR = -30 ~ 85℃, encapsulamento = (2016 métrico) |
| ETST00327000LE | Hosonic | F0 = 32.768KHz, △F/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR = 70K ohms máx., TOPR = -40 ~ 85℃, encapsulamento = (3215 métrico) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000MHz, △F/F0 = -10 ~ 10 ppm, CL = 8.8 pF, ESR = 40 ohms máx., TOPR = -20 ~ 75℃, encapsulamento = (2016 métrico) |
| SF32K32768D71T01 | TKD | F0 = 32.768KHz, △F/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR = 70K ohms máx., TOPR = -40 ~ 85℃, encapsulamento = (3215 métrico) |

</div>

Posicione os cristais de 48 MHz e 32.768 kHz próximos ao chip, reserve capacitores de casamento e proteja suas trilhas contra ruído do BUCK, RF, display, motor e carregador.

### 5.4. RF { #54-rf }

Nos projetos SF32LB56xU e SF32LB56xV, roteie o caminho RF como uma trilha de impedância controlada de 50 ohms. Se a antena selecionada já estiver casada, normalmente não serão necessários componentes RF adicionais, mas o projeto ainda deve reservar uma rede de casamento tipo π para filtragem de emissões espúrias e ajuste final da antena.

Posicione a rede de casamento RF próxima ao chip, não à antena. Mantenha a filtragem de AVDD_BRF próxima ao pino do chip, conecte diretamente ao terra principal os terras dos capacitores, roteie RF na camada superficial sempre que viável, evite vias e curvas fechadas, adicione vias de blindagem de terra em alta densidade nos dois lados da trilha RF e mantenha fora da área RF os sinais DC-DC, VBAT, cristal, clock de alta velocidade, I2C, SPI, SDIO, I2S e UART.

### 5.5. Interfaces de display, toque e retroiluminação { #55-display-touch-and-backlight-interfaces }

A escolha da interface do display depende do encapsulamento. A documentação da variante U descreve opções de display SPI/QSPI e JDI; a da variante V também descreve opções MCU8080 e DPI. Atribua as linhas de interrupção e reset do toque e o controle da retroiluminação considerando o despertar e o acesso durante a produção.

<div align="center"><em>Tabela 5.5-1: Exemplos de controladores de display</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Resolução | Tipo | Interface |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MCU de 8 bits da série 8080, MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | SPI com quatro linhas de dados, MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MCU de 8 bits da série 8080, MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | SPI com quatro linhas de dados |
| GC9C01 | Galaxycore | 360*360 | TFT | SPI com quatro linhas de dados |
| ST77903 | Sitronix | 400*400 | TFT | SPI com quatro linhas de dados |

</div>

<div align="center"><em>Tabela 5.5-2: Interface de display SPI/QSPI do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal SPI | Pino SF32LB56xU | Pino SS6700A | Descrição detalhada |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | Sinal de habilitação. |
| WRX_SCL | PA37 | PA37 | Sinal de clock. |
| DCX | PA39 | PA39 | Sinal de dados/comando no modo SPI de 4 fios; linha de dados 1 no modo Quad-SPI. |
| SDI_RDX | PA38 | PA38 | Entrada de dados no modo SPI de 3/4 fios; linha de dados 0 no modo Quad-SPI. |
| SDO | PA38 | PA38 | Saída de dados no modo SPI de 3/4 fios; conecte em curto com SDI_RDX. |
| D0 | PA40 | PA40 | Linha de dados 2 no modo Quad-SPI. |
| D1 | PA41 | PA41 | Linha de dados 3 no modo Quad-SPI. |
| REST | PA05 | PB04 | Sinal de reset do painel do display. |
| TE | PA33 | PA33 | Sinal de efeito de rasgamento de quadro para o MCU. |

</div>

<div align="center"><em>Tabela 5.5-3: Interface de display JDI do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal JDI | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Sinal de seleção do chip. |
| JDI_SCLK | PA41 | Sinal de clock serial. |
| JDI_SO | PA40 | Sinal serial de saída de dados. |
| JDI_DISP | PA36 | Sinal de alternância do display entre ligado e desligado. |
| JDI_EXTCOMIN | PA38 | Entrada de polaridade de inversão COM. |

</div>

<div align="center"><em>Tabela 5.5-4: Interfaces de toque e retroiluminação do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal de toque e retroiluminação | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| Interrupção | PA50 | Sinal de interrupção do estado do painel tátil (permite despertar). |
| I2C1_SCL | PA48 | Sinal de clock I2C do painel tátil. |
| I2C1_SDA | PA49 | Sinal de dados I2C do painel tátil. |
| BL_PWM | PA31 | Sinal de controle PWM da retroiluminação. |
| Reset | PB18 | Sinal de reset do painel tátil. |

</div>

<div align="center"><em>Tabela 5.5-5: Interface de display SPI/QSPI do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal SPI | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CSX | PA36 | Sinal de habilitação. |
| WRX_SCL | PA37 | Sinal de clock. |
| DCX | PA39 | Sinal de dados/comando no modo SPI de 4 fios; linha de dados 1 no modo Quad-SPI. |
| SDI_RDX | PA38 | Entrada de dados no modo SPI de 3/4 fios; linha de dados 0 no modo Quad-SPI. |
| SDO | PA38 | Saída de dados no modo SPI de 3/4 fios; conecte em curto com SDI_RDX. |
| D[0] | PA40 | Linha de dados 2 no modo Quad-SPI. |
| D[1] | PA41 | Linha de dados 3 no modo Quad-SPI. |
| REST | PA43 | Sinal de reset do display. |
| TE | PA33 | Sinal de efeito de rasgamento de quadro para o MCU. |

</div>

<div align="center"><em>Tabela 5.5-6: Interface de display MCU8080 do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal MCU8080 | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CSX | PA36 | Seleção do chip. |
| WRX | PA37 | Sinal de strobe de escrita dos dados. |
| DCX | PA39 | Seleção de dados/comando do display. |
| RDX | PA38 | Sinal de strobe de leitura dos dados. |
| D[0] | PA40 | Dado 0. |
| D[1] | PA41 | Dado 1. |
| D[2] | PA28 | Dado 2. |
| D[3] | PA29 | Dado 3. |
| D[4] | PA30 | Dado 4. |
| D[5] | PA31 | Dado 5. |
| D[6] | PA32 | Dado 6. |
| D[7] | PA34 | Dado 7. |
| REST | PA43 | Reset. |
| TE | PA33 | Sinal de efeito de rasgamento de quadro para o MCU. |

</div>

<div align="center"><em>Tabela 5.5-7: Interface de display DPI do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal DPI | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CLK | PA45 | Sinal de clock. |
| DE | PA47 | Sinal de habilitação de dados. |
| HSYNC | PA44 | Sinal de sincronização horizontal. |
| VSYNC | PA42 | Sinal de sincronização vertical. |
| SD | PA50 | Controla o desligamento do display. |
| CM | PA51 | Alterna entre os modos de cor normal e cor reduzida. |
| R0 | PA14 | Sinal de pixel. |
| R1 | PA13 | Sinal de pixel. |
| R2 | PA16 | Sinal de pixel. |
| R3 | PA24 | Sinal de pixel. |
| R4 | PA19 | Sinal de pixel. |
| R5 | PA21 | Sinal de pixel. |
| R6 | PA23 | Sinal de pixel. |
| R7 | PA25 | Sinal de pixel. |
| G0 | PA28 | Sinal de pixel. |
| G1 | PA30 | Sinal de pixel. |
| G2 | PA32 | Sinal de pixel. |
| G3 | PA33 | Sinal de pixel. |
| G4 | PA34 | Sinal de pixel. |
| G5 | PA29 | Sinal de pixel. |
| G6 | PA31 | Sinal de pixel. |
| G7 | PA35 | Sinal de pixel. |
| B0 | PA36 | Sinal de pixel. |
| B1 | PA37 | Sinal de pixel. |
| B2 | PA38 | Sinal de pixel. |
| B3 | PA43 | Sinal de pixel. |
| B4 | PA41 | Sinal de pixel. |
| B5 | PA39 | Sinal de pixel. |
| B6 | PA40 | Sinal de pixel. |
| B7 | PA46 | Sinal de pixel. |

</div>

<div align="center"><em>Tabela 5.5-8: Interface de display paralelo JDI do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal JDI | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | Clock de deslocamento do driver vertical. |
| JDI_VST | PA40 | Sinal de início do driver vertical. |
| JDI_XRST | PA39 | Sinal de reset dos drivers horizontal e vertical. |
| JDI_HCK | PA36 | Clock de deslocamento do driver horizontal. |
| JDI_HST | PA38 | Sinal de início do driver horizontal. |
| JDI_ENB | PA43 | Habilitação de escrita da memória de pixels. |
| JDI_R1 | PA29 | Dados da imagem vermelha (pixels ímpares). |
| JDI_R2 | PA31 | Dados da imagem vermelha (pixels pares). |
| JDI_G1 | PA34 | Dados da imagem verde (pixels ímpares). |
| JDI_G2 | PA32 | Dados da imagem verde (pixels pares). |
| JDI_B1 | PA30 | Dados da imagem azul (pixels ímpares). |
| JDI_B2 | PA28 | Dados da imagem azul (pixels pares). |
| JDI_XFRP | PBR1 | Sinal de acionamento do cristal líquido (pixel “ligado”). |
| JDI_VCOM/FRP | PBR2 | Sinal de acionamento do eletrodo comum/sinal de acionamento do cristal líquido (pixel “desligado”). |

</div>

<div align="center"><em>Tabela 5.5-9: Interface de display serial JDI do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal JDI | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Sinal de seleção do chip. |
| JDI_SCLK | PA41 | Sinal de clock serial. |
| JDI_SO | PA40 | Sinal serial de saída de dados. |
| JDI_DISP | PA36 | Sinal de alternância do display entre ligado e desligado. |
| JDI_EXTCOMIN | PA38 | Entrada de polaridade de inversão COM. |

</div>

<div align="center"><em>Tabela 5.5-10: Interfaces de toque e retroiluminação do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal de toque e retroiluminação | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| Interrupção | PA50 | Sinal de interrupção do estado do painel tátil (permite despertar). |
| I2C1_SCL | PA48 | Sinal de clock I2C do painel tátil. |
| I2C1_SDA | PA49 | Sinal de dados I2C do painel tátil. |
| BL_PWM | PA35 | Sinal de controle PWM da retroiluminação. |
| Reset | PA44 | Sinal de reset do painel tátil. |

</div>

### 5.6. Armazenamento, sensores, áudio e conectividade { #56-storage-sensors-audio-and-connectivity }

Os barramentos de armazenamento e display não devem ser atribuídos de forma independente, pois ambos consomem grupos de GPIOs importantes e podem determinar a estrutura de camadas da PCB. Antes de congelar o esquemático, confirme o tipo de armazenamento de inicialização, os pull-ups, o domínio de tensão, o comportamento das chaves de alimentação e o acesso aos dispositivos de teste.

<div align="center"><em>Tabela 5.6-1: Interface Flash QSPI do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal da Flash | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CS# | PA06 | Seleção do chip, ativa em nível baixo. |
| SO | PA07 | Entrada de dados (Data Input Output 1). |
| WP# | PA08 | Saída de proteção contra gravação (Data Input Output 2). |
| SI | PA09 | Saída de dados (Data Input Output 0). |
| SCLK | PA10 | Saída de clock serial. |
| Hold# | PA11 | Saída de dados (Data Input Output 3). |

</div>

<div align="center"><em>Tabela 5.6-2: Interface Flash SDIO do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal da Flash | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Sinal de comando. |
| SD2_D1 | PA11 | Dado 1. |
| SD2_D0 | PA10 | Dado 0. |
| SD2_CLK | PA08 | Sinal de clock. |
| SD2_D2 | PA06 | Dado 2. |
| SD2_D3 | PA07 | Dado 3. |

</div>

<div align="center"><em>Tabela 5.6-3: Interface Flash QSPI do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal da Flash | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CS# | PA06 | Seleção do chip, ativa em nível baixo. |
| SO | PA07 | Entrada de dados (Data Input Output 1). |
| WP# | PA08 | Saída de proteção contra gravação (Data Input Output 2). |
| SI | PA09 | Saída de dados (Data Input Output 0). |
| SCLK | PA10 | Saída de clock serial. |
| Hold# | PA11 | Saída de dados (Data Input Output 3). |

</div>

<div align="center"><em>Tabela 5.6-4: Interface Flash SDIO do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal da Flash | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Sinal de comando. |
| SD2_D1 | PA11 | Dado 1. |
| SD2_D0 | PA10 | Dado 0. |
| SD2_CLK | PA08 | Sinal de clock. |
| SD2_D2 | PA06 | Dado 2. |
| SD2_D3 | PA07 | Dado 3. |

</div>

<div align="center"><em>Tabela 5.6-5: Interface eMMC do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal eMMC | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | Sinal de comando. |
| SD1_CLK | PA26 | Sinal de clock. |
| SD1_D0 | PA22 | Dado 0. |
| SD1_D1 | PA15 | Dado 1. |
| SD1_D2 | PA12 | Dado 6. |
| SD1_D3 | PA20 | Dado 3. |
| SD1_D4 | PA21 | Dado 4. |
| SD1_D5 | PA19 | Dado 5. |
| SD1_D6 | PA13 | Dado 6. |
| SD1_D7 | PA14 | Dado 7. |

</div>

!!! warning "Verifique o mapeamento das linhas de dados SD1 do SF32LB56xV"
    A fonte da SiFli identifica PA12 como SD1_D2, mas descreve o sinal como `Data 6`; também identifica SD1_D6 como `Data 6` e não inclui uma linha `Data 2`. Antes de rotear, confirme a atribuição correta na documentação de pin-mux publicada. A tabela mantém as entradas publicadas pela SiFli.

<div align="center"><em>Tabela 5.6-6: Interface I2C dos sensores</em></div>

<div align="center" markdown>

| Sinal I2C | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| SDA | PA18 | Sinal de dados I2C dos sensores de rastreamento de luz. |
| SCL | PA17 | Sinal de clock I2C dos sensores de rastreamento de luz. |

</div>

Ajuste a alimentação de E/S da memória ao nível lógico da memória conectada: a variante U usa VDDIO3 e a variante V usa VDDIOA2. Conecte o pino Hold# da Flash SPI NAND à alimentação da Flash com um pull-up de 10 kΩ. SD1/eMMC está disponível apenas na variante V; não aplique à variante U a tabela de pinos SD1/eMMC da V, pois U usa a interface de armazenamento SD2.

<div align="center"><em>Tabela 5.6-7: Interface de áudio do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal de áudio | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrada analógica de microfone diferencial P ou single-ended. |
| AU_ADC1N | ADCN | Entrada analógica de microfone diferencial N ou GND. |
| AU_DAC1P | DACP | Saída analógica diferencial P. |
| AU_DAC1N | DACN | Saída analógica diferencial N. |

</div>

<div align="center"><em>Tabela 5.6-8: Interface de áudio do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal de áudio | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrada analógica de microfone diferencial P ou single-ended. |
| AU_ADC1N | ADCN | Entrada analógica de microfone diferencial N ou GND. |
| AU_DAC1P | DACP | Saída analógica diferencial P. |
| AU_DAC1N | DACN | Saída analógica diferencial N. |
| I2S1_LRCK | PA71 | Clock de quadro I2S2. |
| I2S1_SDI | PA69 | Entrada de dados I2S2. |
| I2S1_SDO | PA64 | Saída de dados I2S2. |
| I2S1_BCK | PA73 | Clock de bits I2S2. |

</div>

!!! warning "Verifique a instância I2S da variante V"
    A tabela de pinos e os nomes de rede do esquemático da SiFli identificam esses pinos como I2S1_LRCK/SDI/SDO/BCK, mas as descrições da tabela os apresentam como sinais I2S2. A instância do periférico não está clara; confirme-a na documentação de pin-mux publicada antes de atribuir os pinos.

Para um microfone analógico diferencial externo, coloque capacitores de bloqueio DC de pelo menos 2,2 µF nas entradas ADC e alimente o microfone por MIC_BIAS. O circuito de referência U para microfone MEMS alimenta MIC_BIAS por 1 kΩ e inclui um capacitor de bypass de 4,7 µF; a saída do microfone também mostra um capacitor de acoplamento de 0,01 µF. O circuito de referência U para PA analógico usa capacitores de acoplamento de entrada de 33 nF e coloca o filtro passa-baixa diferencial perto do chip. Roteie as saídas DAC analógicas como um par diferencial protegido por GND; mantenha a capacitância parasita abaixo de 10 pF e o comprimento abaixo de 2 cm. A variante V também oferece I2S; o amplificador I2S de referência é configurado via I2C3. Coloque os capacitores de alimentação e referência de áudio perto dos pinos e afaste o áudio analógico dos conversores chaveados e dos sinais digitais de alta velocidade.

Ambas as variantes oferecem PWM para motores de vibração. O motor pode ser alimentado diretamente por VBAT se sua corrente de partida não desestabilizar o sistema. Quando `BSP_PM_FREQ_SCALING` é definido como `1`, o ajuste da frequência do HCPU também altera a frequência PWM nos pinos PA. Nesse caso, use um pino PB. PB32 é uma entrada de alimentação/reset ativa em nível alto; manter o botão pressionado por pelo menos 10 s aciona o reset. A referência U conecta a tecla a VDDIOB por 1 kΩ e acrescenta pull-down de 10 kΩ e capacitor de 0,1 µF para GND. A referência V usa um resistor série de 1 kΩ desde VDD_1V8 e pull-down de 10 kΩ. Os demais botões e encoders rotativos precisam de pull-ups; se um encoder mecânico não voltar ao estado desligado depois de girar, sua alimentação de pull-up deve poder ser desligada durante Standby para evitar fuga.

A variante U oferece PBR0–PBR2 e a V, PBR0–PBR3. Na inicialização, PBR0 muda de nível baixo para alto e pode controlar uma chave de carga externa; os outros pinos PBR iniciam em nível baixo. Pinos PBR podem atuar como saídas durante Standby e Hibernate e transportar LPTIM; todos, exceto PBR0, podem emitir clock de 32 kHz. Também podem ser configurados como entradas de despertar, mas o MCU não recebe uma interrupção dessa entrada depois de acordar. Prefira pinos PB do LCPU para I2C, SPI, controle e interrupções de despertar dos sensores. A alimentação dos sensores pode ser comutada, conforme necessário, por uma saída LVSW ou LDO do SF30147C.

Todos os pinos PA de U/V podem ser multiplexados como UART, I2C ou GPTIM. Na variante U, PB32/PB33/PB34 e PBR0/PBR1/PBR2 são exceções; na V, as exceções são PB32–PB36 e PBR0–PBR3. Revise essas restrições junto com as atribuições de despertar, botões e PBR.

### 5.7. Produção { #57-manufacturing }

Reserve acesso à depuração/gravação, modo de gravação em produção, acesso à calibração do cristal, pontos de medição de alimentação, acesso ao teste RF e visibilidade do controle do PMIC. Verifique se o dispositivo de teste consegue alimentar a placa, forçar o modo de inicialização/download, comunicar-se com o chip e coletar dados de calibração.

No mínimo, reserve pontos de teste de produção para VBAT, GND, VDDIO2 na variante U (VDDIOB na V), Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD e um dos pinos PB20/PB21/PB25. Ao conectar um J-Link, configure a alimentação do depurador como entrada externa para que a placa-alvo o alimente. O dispositivo de download de produção e calibração do cristal deve acessar esses pontos.

<div align="center"><em>Tabela 5.7-1: Interface de depuração e gravação do SF32LB56xU</em></div>

<div align="center" markdown>

| Sinal | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| SWCLK | PB15 | Sinal de clock J-Link da interface de depuração. |
| SWDIO | PB13 | Sinal de dados J-Link da interface de depuração. |
| UART4_RXD | PB16 | Sinal de recepção UART; interface de download e saída de logs. |
| UART4_TXD | PB17 | Sinal de transmissão UART; interface de download e saída de logs. |

</div>

<div align="center"><em>Tabela 5.7-2: Interface de depuração e gravação do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal | Pino | Descrição detalhada |
| :--- | :--- | :--- |
| SWCLK | PB15 | Sinal de clock J-Link da interface de depuração. |
| SWDIO | PB13 | Sinal de dados J-Link da interface de depuração. |
| UART4_RXD | PB16 | Sinal de recepção UART; interface de download e saída de logs. |
| UART4_TXD | PB17 | Sinal de transmissão UART; interface de download e saída de logs. |

</div>
