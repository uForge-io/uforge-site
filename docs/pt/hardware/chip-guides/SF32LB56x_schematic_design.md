---
icon: lucide/circuit-board
description: "Diretrizes de esquemático do SF32LB56x: alimentação, modos e fontes de despertar, clocks, RF, display/toque/retroiluminação, áudio, armazenamento e produção."
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
| PVDD | 1,7 | 1,8 | 3,6 | 100 | Entrada de alimentação PVDD. |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | A saída BUCK_LX conecta-se ao indutor; a entrada de alimentação interna conecta-se à outra extremidade do indutor e a um capacitor externo. |
| LDO1_VOUT | - | 1,1 | - | 50 | Saída LDO1; requer capacitor externo. |
| LDO2_VOUT | - | 0,9 | - | 20 | Saída LDO2; requer capacitor externo. |
| VDD_RET | - | 0,9 | - | 1 | Saída do LDO RET; requer capacitor externo. |
| VDD_RTC | - | 1,1 | - | 1 | Saída do LDO RTC; requer capacitor externo. |
| MIC_BIAS | 1,4 | - | 2,8 | - | Saída de alimentação do microfone. |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentação analógica e de alimentação do RFPA. |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentação analógica de áudio. |
| VDDIO1 | 1,71 | 1,8 | 1,98 | - | Entrada de alimentação do dispositivo de armazenamento integrado ao encapsulamento do núcleo grande. |
| VDDIO2 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação dos GPIOs PA (exceto PA5~11). |
| VDDIO3 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação de PA5~11. |
| VDDIO4 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação dos GPIOs PB e da Flash integrada ao encapsulamento do núcleo pequeno. |
| GPADC_VREF | - | - | - | - | Entrada de referência de tensão do GPADC; somente um capacitor externo é conectado, sem necessidade de alimentação externa. |
| AUD_VREF | - | - | - | - | Entrada de referência de áudio; somente um capacitor externo é conectado, sem necessidade de alimentação externa. |

</div>

<div align="center"><em>Tabela 5.1-2: Trilhos de alimentação do processador SF32LB56xV</em></div>

<div align="center" markdown>

| Pino de alimentação da PMU | Tensão mínima (V) | Tensão típica (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,71 | 1,8 | 3,6 | 100 | Entrada de alimentação PVDD. |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | A saída BUCK_LX conecta-se ao indutor; a entrada de alimentação interna conecta-se à outra extremidade do indutor e a um capacitor externo. |
| LDO1_VOUT | - | 1,1 | - | 50 | Saída LDO1 conectada a um capacitor externo. |
| LDO2_VOUT | - | 0,9 | - | 20 | Saída LDO2 conectada a um capacitor externo. |
| VDD_RET | - | 0,9 | - | 1 | Saída do LDO RET conectada a um capacitor externo. |
| VDD_RTC | - | 1,1 | - | 1 | Saída do LDO RTC conectada a um capacitor externo. |
| MIC_BIAS | 1,4 | - | 2,8 | - | Saída de alimentação do microfone. |
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | Entrada de alimentação de RF. |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentação analógica e de alimentação do RFPA. |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentação analógica de áudio. |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação de E/S de PA12-PA78. |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação de E/S de PA0-PA11. |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | Entrada de alimentação de E/S de PB. |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | Entrada de alimentação de SIPA. |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | Entrada de alimentação de SIPB. |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | Entrada de alimentação de SIPC. |
| GPADC_VREF | - | - | - | - | Entrada de referência de tensão do GPADC; somente um capacitor externo é conectado, sem necessidade de alimentação externa. |
| AUD_VREF | - | - | - | - | Entrada de referência de áudio; somente um capacitor externo é conectado, sem necessidade de alimentação externa. |

</div>

<div align="center"><em>Tabela 5.1-3: Capacitores de alimentação necessários para SF32LB56xU</em></div>

<div align="center" markdown>

| Pino de alimentação | Capacitor | Descrição detalhada |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Coloque pelo menos dois capacitores, de 10 µF e 0,1 µF, próximos ao pino. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Coloque pelo menos dois capacitores, de 4,7 µF e 0,1 µF, próximos ao pino. |
| LDO1_VOUT | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| LDO2_VOUT | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| VDD_RET | 0,47 µF | Coloque pelo menos um capacitor de 0,47 µF próximo ao pino. |
| VDD_RTC | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| AVDD33_ANA | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| GPADC_VREF | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| AVDD33_AUD | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| AUD_VREF | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| MIC_BIAS | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIO1 | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIO2 | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIO3 | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIO4 | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |

</div>

<div align="center"><em>Tabela 5.1-4: Capacitores de alimentação necessários para SF32LB56xV</em></div>

<div align="center" markdown>

| Pino de alimentação | Capacitor | Descrição detalhada |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Coloque pelo menos dois capacitores, de 10 µF e 0,1 µF, próximos ao pino. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Coloque pelo menos dois capacitores, de 4,7 µF e 0,1 µF, próximos ao pino. |
| LDO1_VOUT | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| LDO2_VOUT | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| VDD_RET | 0,47 µF | Coloque pelo menos um capacitor de 0,47 µF próximo ao pino. |
| VDD_RTC | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| AVDD_BRF | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| AVDD33_ANA | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| GPADC_VREFP | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| AVDD33_AUD | 4,7 µF | Coloque pelo menos um capacitor de 4,7 µF próximo ao pino. |
| AUD_VREF | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| MIC_BIAS | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIOA | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIOA2 | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIOB | 1 µF | Coloque pelo menos um capacitor de 1 µF próximo ao pino. |
| VDDIOSA | 0,1 µF | Coloque pelo menos um capacitor de 0,1 µF próximo ao pino. |
| VDDIOSB | 0,1 µF | Coloque pelo menos um capacitor de 0,1 µF próximo ao pino. |
| VDDIOSC | 0,1 µF | Coloque pelo menos um capacitor de 0,1 µF próximo ao pino. |

</div>

<div align="center"><em>Tabela 5.1-5: Valores nominais de saída do PMIC SF30147C (exemplo da variante U)</em></div>

<div align="center" markdown>

| Pino de alimentação do SF30147C | Tensão mínima (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Saída de 1,8 V; não deduza desta linha a atribuição aos pinos de alimentação do SF32LB56xU. |
| LVSW1 | 1,8 | 1,8 | 100 | Saída de alimentação de 1,8 V. |
| LVSW2 | 1,8 | 1,8 | 100 | Entrada de alimentação de 1,8 V do acelerômetro. |
| LVSW3 | 1,8 | 1,8 | 150 | Entrada de alimentação de 1,8 V do sensor de frequência cardíaca. |
| LVSW4 | 1,8 | 1,8 | 150 | Entrada de alimentação de 1,8 V do LCD. |
| LVSW5 | 1,8 | 1,8 | 150 | Saída de alimentação de 1,8 V. |
| LDO1 | 2,8 | 3,3 | 100 | Saída de 2,8 a 3,3 V; não deduza desta linha a atribuição aos pinos de alimentação do SF32LB56xU. |
| LDO2 | 2,8 | 3,3 | 100 | Entrada de alimentação do motor. |
| LDO3 | 2,8 | 3,3 | 100 | Entrada de alimentação de 3,3 V do LCD. |
| LDO4 | 2,8 | 3,3 | 100 | Entrada de alimentação de 3,3 V do sensor de frequência cardíaca. |
| HVSW1 | 2,8 | 5 | 150 | Entrada de alimentação do PA analógico Classe K. |
| HVSW2 | 2,8 | 5 | 150 | Entrada de alimentação do GPS. |

</div>

!!! warning "Verifique a atribuição dos trilhos do PMIC para a variante U"
    A tabela original da SiFli para a distribuição de alimentação da variante U lista VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C e AVDD_BRF, em conflito com a tabela de alimentação do processador U no mesmo guia. A tabela acima mantém apenas os limites de tensão e corrente das saídas do PMIC. Não a use para inferir as conexões aos pinos de alimentação do chip U; confirme o mapeamento na revisão correspondente do esquemático e no datasheet do SF30147C antes de liberar o layout.

<div align="center"><em>Tabela 5.1-6: Exemplo de distribuição de alimentação do PMIC SF30147C para V</em></div>

<div align="center" markdown>

| Pino de alimentação do SF30147C | Tensão mínima (V) | Tensão máxima (V) | Corrente máxima (mA) | Descrição detalhada |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Entrada de alimentação de 1,8 V para PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC, AVDD_BRF etc. do SF32LB56xV. |
| LVSW1 | 1,8 | 1,8 | 100 | Entrada de alimentação lógica do PA Classe K I2S. |
| LVSW2 | 1,8 | 1,8 | 100 | Entrada de alimentação de 1,8 V do acelerômetro. |
| LVSW3 | 1,8 | 1,8 | 150 | Entrada de alimentação de 1,8 V do sensor de frequência cardíaca. |
| LVSW4 | 1,8 | 1,8 | 150 | Entrada de alimentação de 1,8 V do LCD. |
| LVSW5 | 1,8 | 1,8 | 150 | Entrada de alimentação do núcleo eMMC. |
| LDO1 | 2,8 | 3,3 | 100 | Entrada de alimentação de 3,3 V para AVDD33_ANA, AVDD33_AUD, VDDIOA2 etc. do SF32LB56xV. |
| LDO2 | 2,8 | 3,3 | 100 | Entrada de alimentação de eMMC ou SD NAND. |
| LDO3 | 2,8 | 3,3 | 100 | Entrada de alimentação de 3,3 V do LCD. |
| LDO4 | 2,8 | 3,3 | 100 | Entrada de alimentação de 3,3 V do sensor de frequência cardíaca. |
| HVSW1 | 2,8 | 5 | 150 | Entrada de alimentação do PA analógico Classe K. |
| HVSW2 | 2,8 | 5 | 150 | Entrada de alimentação do GPS. |

</div>

![Figura 5.1-1: Temporização POR/BOR do SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Temporização POR/BOR do SF32LB56xU</em></div>

![Figura 5.1-2: Temporização POR/BOR do SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Temporização POR/BOR do SF32LB56xV</em></div>

![Figura 5.1-3: Circuito de referência BUCK do SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Circuito de referência BUCK do SF32LB56xU</em></div>

![Figura 5.1-4: Circuito de referência BUCK do SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Circuito de referência BUCK do SF32LB56xV</em></div>

![Figura 5.1-5: Circuito de referência LDO do SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Circuito de referência LDO do SF32LB56xU</em></div>

![Figura 5.1-6: Circuito de referência LDO do SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-6: Circuito de referência LDO do SF32LB56xV</em></div>

![Figura 5.1-7: Circuito de referência de carga do SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-7: Circuito de referência de carga do SF32LB56xU</em></div>

![Figura 5.1-8: Circuito de referência de carga do SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-8: Circuito de referência de carga do SF32LB56xV</em></div>

Sem gerenciamento do caminho de alimentação, o sistema fica ligado diretamente à bateria em VBAT. Essa solução custa menos, mas os circuitos a jusante não podem ser totalmente isolados da bateria; com isso, aumenta a corrente de fuga e não se atinge a meta de baixo consumo do Shipping Mode. Se a bateria estiver excessivamente descarregada, a corrente de carga lenta (trickle charge) do carregador deve superar a soma da corrente do sistema e das fugas (i1+i2 no diagrama de origem). Durante a operação do sistema, a corrente de carga na fase de corrente constante também deve superar i1+i2; caso contrário, parte dela alimentará a carga do sistema, e a bateria talvez não carregue completamente. Um carregador com gerenciamento do caminho de alimentação separa a alimentação do sistema em VSYS do carregamento da bateria em VBAT, oferece suporte ao Shipping Mode e pode alimentar o sistema por VSYS mesmo quando a bateria está excessivamente descarregada.

Na variante U, escolha entre três topologias de alimentação conforme a tensão de I/O dos periféricos e a meta de consumo do sistema. Nas três, AVDD33_ANA e AVDD33_AUD são alimentados com 3,3 V. A topologia de menor consumo alimenta PVDD e VDDIO1–VDDIO4 com 1,8 V e usa periféricos com I/O de 1,8 V. A topologia intermediária mantém PVDD e VDDIO1 em 1,8 V, enquanto VDDIO2–VDDIO4 e o I/O dos periféricos usam 3,3 V. Na topologia de maior consumo, somente VDDIO1, que alimenta a PSRAM integrada ao encapsulamento, permanece em 1,8 V; PVDD, VDDIO2–VDDIO4 e o I/O dos periféricos usam 3,3 V. Use chaves de carga para controlar dinamicamente a alimentação dos módulos externos e mantenha-as desligadas por padrão quando não estiverem em uso. Para os módulos que precisam permanecer ligados, escolha componentes com baixa corrente quiescente. O nível lógico padrão do GPIO de controle deve corresponder à polaridade de habilitação da chave, para mantê-la desligada durante a inicialização. A SiFli recomenda um resistor pull-up ou pull-down de 1 MΩ na entrada de habilitação.

A PMU da variante U conclui o reset de energização quando PVDD chega a 1,5 V. Se PVDD cair, ocorre reset por brownout no limite BOR configurado, ajustável de 1,5 V a 2,5 V.

### 5.2. Modos de operação e fontes de despertar { #52-operating-modes-and-wake-sources }

Revise em conjunto as decisões sobre modo de operação, fonte de despertar, alimentação dos resistores de pull-up e corrente de fuga. Use pinos compatíveis com despertar para botões, painel de toque, interrupções de sensores, eventos do carregador e outros sinais de despertar em baixo consumo.

<div align="center"><em>Tabela 5.2-1: Modos de operação do SF32LB56xU</em></div>

<div align="center" markdown>

| Modo de operação | CPU | Periférico | SRAM | E/S | LPTIM | Fonte de despertar | Tempo de despertar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ativo | Em execução | Em execução | Acessível | Comutável | Em execução |  |  |
| WFI/WFE | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 0,5 µs |
| DEEPWFI | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 5 µs |
| Light Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC, GPIO, LPTIM, interrupção entre sistemas, Bluetooth, comparador | < 100 µs |
| Deep Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução |  | < 300 µs |
| Standby | Reset | Reset | Inacessível; LP totalmente retida e HP retém apenas 160 KB | Nível mantido | Em execução | RTC, botões, LPTIM, interrupção entre sistemas, Bluetooth | 1,5 ms + recuperação |
| Hibernate RTC | Reset | Reset | Dados não retidos | Alta impedância | Reset | RTC, botões | > 2 ms |
| Hibernate pin | Reset | Reset | Dados não retidos | Alta impedância | Reset | Botões | > 2 ms |

</div>

<div align="center"><em>Tabela 5.2-2: Modos de operação do SF32LB56xV</em></div>

<div align="center" markdown>

| Modo de operação | CPU | Periférico | SRAM | E/S | LPTIM | Fonte de despertar | Tempo de despertar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ativo | Em execução | Em execução | Acessível | Comutável | Em execução |  |  |
| WFI/WFE | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 0,5 µs |
| DEEPWFI | Parado | Em execução | Acessível | Comutável | Em execução | Qualquer interrupção | < 5 µs |
| Light Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC/GPIO/LPTIM/LPCOMP/interrupção entre sistemas/Bluetooth | < 100 µs |
| Deep Sleep | Parado | Parado | Inacessível, totalmente retida | Nível mantido | Em execução | RTC/GPIO/LPTIM/LPCOMP/interrupção entre sistemas/Bluetooth | < 300 µs |
| Standby | Reset | Reset | Inacessível; LP totalmente retida e HP retém apenas 160 KB | Nível mantido | Em execução | RTC/botões/LPTIM/interrupção entre sistemas/Bluetooth | 1,5 ms + recuperação |
| Hibernate RTC | Reset | Reset | Dados não retidos | Alta impedância | Reset | RTC/botões | > 2 ms |
| Hibernate pin | Reset | Reset | Dados não retidos | Alta impedância | Reset | Botões | > 2 ms |

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

Considere a alimentação de I/O da memória ao projetar os modos de baixo consumo. Na variante U, os níveis GPIO são mantidos em Standby e VDDIO1 pode continuar alimentado; coloque as memórias conectadas a MPI1/MPI2 em modo de baixo consumo. Em Hibernate, os níveis GPIO não são mantidos; desligue VDDIO1 para evitar corrente de fuga pelo I/O da memória integrada. Na variante V, mantenha alimentado o I/O da memória integrada durante Standby. Antes de entrar em Hibernate, desligue VDDIOSA e VDDIOSB por meio de PBR0 e coloque a Flash NOR em Deep Power-Down. VDDIOSC deve permanecer alimentado.

### 5.3. Geração de clock { #53-clock-generation }

<div align="center"><em>Tabela 5.3-1: Requisitos dos cristais</em></div>

<div align="center" markdown>

| Cristal | Requisitos da especificação do cristal | Descrição detalhada |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (valor recomendado: 8,8 pF); ΔF/F0 ≤ ±10 ppm; ESR ≤ 30 Ω (valor recomendado: 22 Ω) | O consumo do oscilador a cristal depende de CL e ESR. Quanto menores forem CL e ESR, menor será o consumo. Para obter o melhor desempenho energético, recomenda-se usar componentes com valores de CL e ESR relativamente baixos dentro da faixa especificada. Reserve posições para capacitores de casamento em paralelo, próximos ao cristal. Se CL < 12 pF, não é necessário montar capacitores. |
| 32,768 kHz | CL ≤ 12,5 pF (valor recomendado: 7 pF); ΔF/F0 ≤ ±20 ppm; ESR ≤ 80 kΩ (valor recomendado: 38 kΩ) | O consumo do cristal depende de CL e ESR. Quanto menores forem CL e ESR, menor será o consumo. Para otimizar o consumo, recomenda-se usar componentes com valores de CL e ESR relativamente baixos dentro da faixa especificada. Reserve posições para capacitores de casamento em paralelo, próximos ao cristal. Se CL < 12,5 pF, não é necessário soldar capacitores. |

</div>

<div align="center"><em>Tabela 5.3-2: Modelos de cristal recomendados</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Parâmetros |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz; ΔF/F0 = −6 a 8 ppm; CL = 8,8 pF; ESR = 22 Ω máx.; TOPR = −30 a 85 °C; encapsulamento métrico 2016 |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz; ΔF/F0 = −20 a 20 ppm; CL = 7 pF; ESR = 70 kΩ máx.; TOPR = −40 a 85 °C; encapsulamento métrico 3215 |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz; ΔF/F0 = −10 a 10 ppm; CL = 8,8 pF; ESR = 40 Ω máx.; TOPR = −20 a 75 °C; encapsulamento métrico 2016 |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz; ΔF/F0 = −20 a 20 ppm; CL = 7 pF; ESR = 70 kΩ máx.; TOPR = −40 a 85 °C; encapsulamento métrico 3215 |

</div>

Posicione os cristais de 48 MHz e 32,768 kHz próximos ao chip, reserve posições para os capacitores de casamento e proteja as trilhas contra ruído do BUCK, RF, display, motor e carregador.

### 5.4. RF { #54-rf }

Nos projetos SF32LB56xU e SF32LB56xV, roteie o caminho RF como uma trilha com impedância controlada de 50 Ω. Se a antena selecionada já estiver casada, normalmente não serão necessários componentes RF adicionais. Ainda assim, reserve uma rede de casamento tipo π para filtrar emissões espúrias e fazer o ajuste final da antena.

Posicione a rede de casamento RF perto do chip, não da antena. Mantenha o filtro de AVDD_BRF próximo ao pino do chip e conecte o GND dos capacitores diretamente ao plano de GND principal. Sempre que viável, roteie RF na camada superficial; evite vias e cantos agudos. Adicione vias de blindagem de GND em alta densidade nos dois lados da trilha RF e mantenha os sinais DC-DC, VBAT, cristal, clock de alta velocidade, I2C, SPI, SDIO, I2S e UART fora da área RF.

### 5.5. Interfaces de display, toque e retroiluminação { #55-display-touch-and-backlight-interfaces }

A escolha da interface de display depende do encapsulamento. A documentação da variante U descreve as opções SPI/QSPI e JDI; a da variante V também inclui MCU8080 e DPI. Ao atribuir as linhas de interrupção e reset do painel de toque e o controle da retroiluminação, considere os requisitos de despertar e o acesso durante a produção.

<div align="center"><em>Tabela 5.5-1: Exemplos de controladores de display</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Resolução | Tipo | Interface |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368 × 448 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MIPI-DSI |
| RM69330 | Raydium | 454 × 454 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MCU de 8 bits da série 8080, MIPI-DSI |
| ILI8688E | ILITEK | 368 × 448 | AMOLED | SPI com quatro linhas de dados, MIPI-DSI |
| SH8601A | Shine World Technology | 454 × 454 | AMOLED | SPI de 3 linhas, SPI de 4 linhas, SPI com duas linhas de dados, SPI com quatro linhas de dados, MCU de 8 bits da série 8080, MIPI-DSI |
| SPD2012 | Solomon | 356 × 400 | TFT | SPI com quatro linhas de dados |
| GC9C01 | Galaxycore | 360 × 360 | TFT | SPI com quatro linhas de dados |
| ST77903 | Sitronix | 400 × 400 | TFT | SPI com quatro linhas de dados |

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
| TE | PA33 | PA33 | Sinal de tearing effect (TE) de sincronização de quadros para o MCU. |

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
| Interrupção | PA50 | Sinal de interrupção do estado do painel de toque (permite despertar). |
| I2C1_SCL | PA48 | Sinal de clock I2C do painel de toque. |
| I2C1_SDA | PA49 | Sinal de dados I2C do painel de toque. |
| BL_PWM | PA31 | Sinal de controle PWM da retroiluminação. |
| Reset | PB18 | Sinal de reset do painel de toque. |

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
| TE | PA33 | Sinal de tearing effect (TE) de sincronização de quadros para o MCU. |

</div>

<div align="center"><em>Tabela 5.5-6: Interface de display MCU8080 do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal MCU8080 | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| CSX | PA36 | Seleção do chip. |
| WRX | PA37 | Sinal de strobe de escrita dos dados. |
| DCX | PA39 | Seleção de dados/comando do display. |
| RDX | PA38 | Sinal de strobe de leitura para gravar dados. |
| D[0] | PA40 | Bit de dados 0. |
| D[1] | PA41 | Bit de dados 1. |
| D[2] | PA28 | Bit de dados 2. |
| D[3] | PA29 | Bit de dados 3. |
| D[4] | PA30 | Bit de dados 4. |
| D[5] | PA31 | Bit de dados 5. |
| D[6] | PA32 | Bit de dados 6. |
| D[7] | PA34 | Bit de dados 7. |
| REST | PA43 | Reset. |
| TE | PA33 | Sinal de tearing effect (TE) de sincronização de quadros para o MCU. |

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
| Interrupção | PA50 | Sinal de interrupção do estado do painel de toque (permite despertar). |
| I2C1_SCL | PA48 | Sinal de clock I2C do painel de toque. |
| I2C1_SDA | PA49 | Sinal de dados I2C do painel de toque. |
| BL_PWM | PA35 | Sinal de controle PWM da retroiluminação. |
| Reset | PA44 | Sinal de reset do painel de toque. |

</div>

### 5.6. Armazenamento, sensores, áudio e conectividade { #56-storage-sensors-audio-and-connectivity }

Os barramentos de armazenamento e display não devem ser atribuídos de forma independente, pois ambos consomem grupos de GPIOs importantes e podem determinar a estrutura de camadas da PCB. Antes de congelar o esquemático, confirme o tipo de armazenamento de inicialização, os pull-ups, o domínio de tensão, o comportamento das chaves de alimentação e o acesso pelo gabarito de teste.

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
| SD2_D1 | PA11 | Bit de dados 1. |
| SD2_D0 | PA10 | Bit de dados 0. |
| SD2_CLK | PA08 | Sinal de clock. |
| SD2_D2 | PA06 | Bit de dados 2. |
| SD2_D3 | PA07 | Bit de dados 3. |

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
| SD2_D1 | PA11 | Bit de dados 1. |
| SD2_D0 | PA10 | Bit de dados 0. |
| SD2_CLK | PA08 | Sinal de clock. |
| SD2_D2 | PA06 | Bit de dados 2. |
| SD2_D3 | PA07 | Bit de dados 3. |

</div>

<div align="center"><em>Tabela 5.6-5: Interface eMMC do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal eMMC | Sinal de E/S | Descrição detalhada |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | Sinal de comando. |
| SD1_CLK | PA26 | Sinal de clock. |
| SD1_D0 | PA22 | Bit de dados 0. |
| SD1_D1 | PA15 | Bit de dados 1. |
| SD1_D2 | PA12 | Bit de dados 6. |
| SD1_D3 | PA20 | Bit de dados 3. |
| SD1_D4 | PA21 | Bit de dados 4. |
| SD1_D5 | PA19 | Bit de dados 5. |
| SD1_D6 | PA13 | Bit de dados 6. |
| SD1_D7 | PA14 | Bit de dados 7. |

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
| AU_ADC1P | ADCP | Entrada P de microfone analógico diferencial ou entrada single-ended. |
| AU_ADC1N | ADCN | Entrada N do microfone analógico diferencial ou GND. |
| AU_DAC1P | DACP | Saída analógica diferencial P. |
| AU_DAC1N | DACN | Saída analógica diferencial N. |

</div>

<div align="center"><em>Tabela 5.6-8: Interface de áudio do SF32LB56xV</em></div>

<div align="center" markdown>

| Sinal de áudio | E/S | Descrição detalhada |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrada P de microfone analógico diferencial ou entrada single-ended. |
| AU_ADC1N | ADCN | Entrada N do microfone analógico diferencial ou GND. |
| AU_DAC1P | DACP | Saída analógica diferencial P. |
| AU_DAC1N | DACN | Saída analógica diferencial N. |
| I2S1_LRCK | PA71 | Clock de quadro do I2S2. |
| I2S1_SDI | PA69 | Entrada de dados do I2S2. |
| I2S1_SDO | PA64 | Saída de dados do I2S2. |
| I2S1_BCK | PA73 | Clock de bits do I2S2. |

</div>

!!! warning "Verifique a instância I2S da variante V"
    A tabela de pinos e os nomes de rede do esquemático da SiFli identificam esses pinos como I2S1_LRCK/SDI/SDO/BCK, mas as descrições da tabela os apresentam como sinais I2S2. A instância do periférico não está clara; confirme-a na documentação de pin-mux publicada antes de atribuir os pinos.

Para um microfone analógico diferencial externo, coloque capacitores de bloqueio de corrente contínua (CC) de pelo menos 2,2 µF nas entradas do ADC e alimente o microfone por MIC_BIAS. No circuito de referência da variante U para microfone MEMS, MIC_BIAS é alimentado por meio de um resistor de 1 kΩ e há um capacitor de bypass de 4,7 µF; a saída do microfone também tem um capacitor de acoplamento de 0,01 µF. O circuito de referência da variante U para PA analógico usa capacitores de acoplamento de 33 nF nas entradas e posiciona o filtro passa-baixa diferencial perto do chip. Roteie as saídas analógicas do DAC como um par diferencial com proteção de GND; mantenha a capacitância parasita abaixo de 10 pF e o comprimento das trilhas abaixo de 2 cm. A variante V também oferece I2S, e o amplificador I2S de referência é configurado por I2C3. Coloque os capacitores de alimentação e de referência de áudio perto dos respectivos pinos e mantenha o áudio analógico afastado dos conversores chaveados e dos sinais digitais de alta velocidade.

Ambas as variantes oferecem PWM para motores de vibração. O motor pode ser alimentado diretamente por VBAT se a corrente de partida não desestabilizar o sistema. Quando `BSP_PM_FREQ_SCALING` é definido como `1`, o escalonamento da frequência do HCPU também altera a frequência PWM nos pinos PA. Nesse caso, use um pino PB. PB32 é uma entrada de botão de alimentação/reset, ativa em nível alto; manter o botão pressionado por pelo menos 10 s aciona o reset. No circuito de referência da variante U, o botão é conectado a VDDIOB por meio de um resistor de 1 kΩ, e há também um pull-down de 10 kΩ e um capacitor de 0,1 µF para GND. O circuito de referência da variante V usa um resistor série de 1 kΩ a partir de VDD_1V8 e um pull-down de 10 kΩ. Os demais botões e encoders rotativos precisam de pull-ups. Se um encoder mecânico não voltar ao estado desligado após a rotação, a alimentação do pull-up deve poder ser desligada durante Standby para evitar corrente de fuga.

A variante U oferece PBR0–PBR2; a V, PBR0–PBR3. Na inicialização, PBR0 passa de nível baixo para alto e pode controlar uma chave de carga externa; os demais pinos PBR iniciam em nível baixo. Os pinos PBR podem atuar como saídas durante Standby e Hibernate e transportar sinais LPTIM. Todos, exceto PBR0, podem emitir clock de 32 kHz. Eles também podem ser configurados como entradas de despertar, mas não geram uma interrupção para o MCU após o despertar. Prefira pinos PB do LCPU para I2C, SPI, sinais de controle e interrupções de despertar dos sensores. Quando necessário, a alimentação dos sensores pode ser comutada por uma saída LVSW ou LDO do SF30147C.

Todos os pinos PA de U/V podem ser multiplexados como UART, I2C ou GPTIM. Na variante U, PB32/PB33/PB34 e PBR0/PBR1/PBR2 são exceções; na V, as exceções são PB32–PB36 e PBR0–PBR3. Revise essas restrições junto com as atribuições de despertar, botões e PBR.

### 5.7. Produção { #57-manufacturing }

Reserve acesso à depuração/gravação, modo de gravação em produção, acesso à calibração do cristal, pontos de medição de alimentação, acesso ao teste RF e visibilidade do controle do PMIC. Verifique se o gabarito de teste consegue alimentar a placa, forçar o modo de inicialização/download, comunicar-se com o chip e coletar dados de calibração.

No mínimo, reserve pontos de teste para VBAT, GND, VDDIO2 na variante U (VDDIOB na V), Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD e um dos pinos PB20/PB21/PB25. Ao conectar um J-Link, configure a alimentação do depurador como entrada externa, para que ele seja alimentado pela placa-alvo. O gabarito de gravação e calibração do cristal usado na produção deve ter acesso a esses pontos.

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
