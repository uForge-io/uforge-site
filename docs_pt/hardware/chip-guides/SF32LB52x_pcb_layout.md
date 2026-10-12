---
icon: lucide/layers
hide:
    - navigation
description: "Orientações de layout de PCB para o SF32LB52x: padrão de pads, empilhamento de camadas, fanout, roteamento de clock/RF/áudio/USB/SDIO, DC/DC, alimentação e proteção EMI/ESD."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB52x — Layout de PCB { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte do guia de projeto de hardware do SF32LB52x"
    Esta página apresenta a Seção 6, dedicada ao layout de PCB. Volte às [Orientações de projeto do esquemático](SF32LB52x_schematic_design.md) (a primeira de três páginas), continue com o [Checklist de layout de PCB](SF32LB52x_pcb_layout_checklist.md) ou consulte o [Checklist de revisão e referências](SF32LB52x_review_and_reference.md).

## 6. Orientações de layout de PCB { #6-pcb-layout-guidelines }

Use este capítulo junto com a Seção 5 para revisar o layout. Antes de definir o posicionamento final, recomenda-se que o esquemático já especifique a variante, a árvore de alimentação, os componentes de clock, a área reservada para RF, os pinos de display e armazenamento e o acesso aos pontos de teste.

**Objetivo do projeto**

Transformar o esquemático em uma placa PTH de quatro camadas viável para fabricação, evitando problemas de impedância, ruído e retorno de corrente nos circuitos sensíveis de RF, cristais, áudio, alimentação, USB e SDIO.

**Sequência de revisão da PCB**

1. Confira o footprint do encapsulamento, os pads e as aberturas da máscara de pasta.
2. Confirme com o fabricante da PCB o empilhamento de camadas, as larguras e os espaçamentos de trilhas, a furação e as regras de impedância.
3. Posicione o chip, os cristais, o circuito de RF, o DC/DC, o carregador, os conectores de display e armazenamento e os componentes de áudio.
4. Revise o fanout e o roteamento dos sinais sensíveis antes de concluir as trilhas de GPIO menos críticas.
5. Registre capturas do layout como evidência de revisão para RF, cristais, USB, SDIO, áudio, DC/DC, carregador e linhas de alimentação.

### 6.1. Projeto do footprint { #61-pcb-footprint-design }

O encapsulamento QFN68L do SF32LB52x mede 7 mm x 7 mm x 0,85 mm, com 68 pinos e passo de 0,35 mm.

O desenho do encapsulamento especifica altura total nominal de 0,85 mm, com faixa de 0,8–0,9 mm, e distância à placa nominal de 0,02 mm, com máximo de 0,05 mm. Confira as folgas de montagem e da caixa com o desenho detalhado, não apenas com o resumo das dimensões.

![Figura 6.1-1: Dimensões do encapsulamento QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-1: Dimensões do encapsulamento QFN68L</em></div>

![Figura 6.1-2: Forma do encapsulamento QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-2: Forma do encapsulamento QFN68L</em></div>

![Figura 6.1-3: Referência de pads para QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-3: Referência de pads para QFN68L</em></div>

A Figura 6.1-3 especifica pads periféricos de 0,2 mm x 0,55 mm, passo de 0,35 mm, aberturas de máscara de solda de 0,3 mm x 0,65 mm e aberturas de pasta de 0,2 mm x 0,55 mm. São dimensões de referência; confira os requisitos do processo de montagem antes de liberar o footprint.

O desenho do encapsulamento indica um pad exposto nominal de 5,49 mm x 5,49 mm. O exemplo de fanout conecta o pad central ao GND; portanto, trate-o como uma conexão elétrica, não apenas como um elemento mecânico.

### 6.2. Empilhamento de camadas { #62-pcb-stack-up }

O projeto de referência permite montar componentes em uma ou nas duas faces. É possível concentrá-los em uma face ou colocar capacitores e outros passivos na face oposta, sob o chip. Recomenda-se uma PCB de quatro camadas com vias passantes metalizadas (PTH).

![Figura 6.2-1: Empilhamento de referência](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.2-1: Empilhamento de referência</em></div>

A Figura 6.2-1 apresenta um empilhamento de referência de 0,8 mm ±10%, incluindo metalização e máscara de solda. A espessura total calculada é de 0,79553 mm. Confirme a espessura final e a estrutura dielétrica com o fabricante da PCB, sem tratar esse exemplo como um empilhamento universal.

<div align="center"><em>Tabela 6.2-1: Valores do empilhamento de referência</em></div>

<div align="center" markdown>

| Camada | Material | Espessura (mil) | Espessura (mm) | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| Máscara superior | Máscara de solda | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | Cobre + metalização | 1.81 | 0.045974 | — | — |
| Dielétrico L1–L2 | Prepreg 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | Cobre + metalização | 1.4 | 0.03556 | — | — |
| Dielétrico L2–L3 | Núcleo | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | Cobre + metalização | 1.4 | 0.03556 | — | — |
| Dielétrico L3–L4 | Prepreg 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | Cobre + metalização | 1.81 | 0.045974 | — | — |
| Máscara inferior | Máscara de solda | 1 | 0.0254 | 3.5 | 0.8 |

</div>

As linhas de prepreg pressupõem área de cobre de 70%. Dk e Df foram reproduzidos da imagem, incluindo Df de 0,8 para a máscara; não são propriedades universais verificadas. Confirme os dados reais do fabricante para calcular impedância e perdas.

### 6.3. Regras gerais de projeto de PCB { #63-general-pcb-design-rules }

Siga as regras gerais para placas PTH apresentadas no projeto de referência.

![Figura 6.3-1: Regras gerais de projeto de PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-1: Regras gerais de projeto de PCB</em></div>

As regras da Figura 6.3-1 usam largura mínima e recomendada de trilha de 0,1 mm e máxima de 2,54 mm. Distinguem os espaçamentos de 0,1 mm para trilhas, vias e pads das regras de cobre de 0,127 mm (0,15 mm entre regiões de cobre), com afastamento da borda de 0,25 mm. São regras CAD de referência: verifique separadamente os limites de fabricação e o roteamento com impedância controlada.

As regras adicionais da Figura 6.3-1 especificam 0,1 mm entre furos e entre corpos de componentes. Algumas entradas da mesma rede são zero; isso não dispensa os espaçamentos entre redes distintas nem as regras de borda e cobre.

### 6.4. Fanout das trilhas { #64-pcb-trace-fanout }

Faça o fanout de todos os sinais do encapsulamento QFN pela camada superior.

![Figura 6.4-1: Fanout de referência na camada superior](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-1: Fanout de referência na camada superior</em></div>

### 6.5. Roteamento de clock { #65-clock-interface-routing }

Aplique estas regras de roteamento de clock aos dois grupos de projeto:

- Coloque os cristais dentro da blindagem, a mais de 1 mm da borda da PCB e o mais longe possível dos componentes que geram calor, como PA, carregador e circuitos da PMU. O ideal é manter mais de 5 mm de distância para evitar que o aquecimento afete a deriva de frequência.
- Mantenha uma distância de exclusão superior a 0,25 mm ao redor do cristal, sem outros metais ou componentes.
- Roteie o cristal de 48 MHz pela camada superior, com trilhas de 3–10 mm de comprimento e 0,1 mm de largura, com blindagem completa por GND. Mantenha-as afastadas de VBAT/VCC, do DC/DC e dos sinais de alta velocidade. Não passe outras trilhas pela camada superior nem pela camada adjacente sob o circuito do cristal.
- Roteie o cristal de 32,768 kHz pela camada superior, com comprimento ≤10 mm, largura de 0,1 mm e espaçamento ≥0,15 mm entre as trilhas paralelas 32K_XI/32K_XO, com proteção por GND. Não passe outras trilhas pela camada superior nem pela camada adjacente sob esse circuito.

![Figura 6.5-1: Posicionamento dos cristais](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-1: Posicionamento dos cristais</em></div>

![Figura 6.5-2: Esquemático do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-2: Esquemático do cristal de 48 MHz</em></div>

![Figura 6.5-3: Modelo de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-3: Modelo de roteamento do cristal de 48 MHz</em></div>

![Figura 6.5-4: Referência de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-4: Referência de roteamento do cristal de 48 MHz</em></div>

![Figura 6.5-5: Esquemático do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-5: Esquemático do cristal de 32,768 kHz</em></div>

![Figura 6.5-6: Modelo de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-6: Modelo de roteamento do cristal de 32,768 kHz</em></div>

![Figura 6.5-7: Referência de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-7: Referência de roteamento do cristal de 32,768 kHz</em></div>

As Figuras 6.5-3 e 6.5-6 mostram espaçamento ≥0,15 mm entre as trilhas paralelas XI/XO dos dois cristais. A Figura 6.5-2 usa um cristal de 48 MHz com capacitância de carga de 8,8 pF e marca os capacitores externos como NF (não montados). A Figura 6.5-5 usa um cristal de 32,768 kHz e 7 pF em PA22/PA23, pinos também multiplexados com PDM_CLK/PDM_DATA.

!!! important "Tratamento do GND sob o cristal"
    A nota de aplicação das variantes alimentadas por bateria se contradiz sobre o cobre sob o cristal: a seção de clock pede remover o plano GND da L2 diretamente abaixo, enquanto a seção de roteamento de PCB proíbe vazios nos planos e recortes de cobre na camada superior e nas adjacentes, e mostra GND contínuo na L2. O guia separado de layout de PCB repete a proibição de vazios. Não deduza uma regra geral para a L2 nem decida apenas pelo número de camadas; confirme com a SiFli o tratamento adequado ao empilhamento escolhido antes de liberar o projeto. A área de exclusão do cristal e o afastamento dos componentes devem ser verificados separadamente.

### 6.6. Roteamento de RF { #66-rf-interface-routing }

Aplique estas regras de roteamento de RF aos dois grupos de projeto:

- Coloque o circuito de casamento de impedância de RF próximo ao chip, não à antena.
- Coloque o capacitor de filtro de AVDD_BRF próximo ao pino do chip e conecte seu terminal de GND diretamente à massa principal por vias.
- Sempre que possível, roteie RF pela camada superior e evite vias que prejudiquem o desempenho. A fonte recomenda largura superior a 10 mil; confirme que o empilhamento real resulte em 50 Ω. Proteja com GND e evite ângulos agudos ou retos.
- Controle a impedância das trilhas de RF em 50 Ω e distribua vias de GND próximas umas das outras nas duas laterais.

![Figura 6.6-1: Esquemático da rede π e da alimentação](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-1: Esquemático da rede π e da alimentação</em></div>

![Figura 6.6-2: Layout da rede π e da alimentação](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-2: Layout da rede π e da alimentação</em></div>

![Figura 6.6-3: Esquemático do sinal de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-3: Esquemático do sinal de RF</em></div>

![Figura 6.6-4: Roteamento de RF na PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-4: Roteamento de RF na PCB</em></div>

Os exemplos de RF usam um capacitor série de 15 pF/50 V (C0333), deixam C0318/C0319 como NF e mostram filtragem de 0,47 uF em AVDD_BRF. São valores de montagem de exemplo, não uma receita universal de casamento de antena.

### 6.7. Roteamento de áudio { #67-audio-interface-routing }

Aplique estas regras de roteamento de áudio aos dois grupos de projeto:

- Coloque os capacitores de filtro de AVDD33_AUD, MIC_BIAS e AUD_VREF próximos aos respectivos pinos. Conecte seus terminais de GND de forma confiável à massa principal.
- Coloque os componentes da entrada analógica ADCP próximos ao pino do chip, com trilhas curtas, blindagem completa por GND e afastamento de fontes de interferência intensa.
- Coloque os componentes da saída analógica DACP/DACN próximos aos pinos do chip. Roteie o par diferencial com trilhas curtas, capacitância parasita inferior a 10 pF e blindagem completa por GND.

![Figura 6.7-1: Esquemático dos filtros de alimentação de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-1: Esquemático dos filtros de alimentação de áudio</em></div>

![Figura 6.7-2: Roteamento de referência dos filtros de alimentação de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-2: Roteamento de referência dos filtros de alimentação de áudio</em></div>

![Figura 6.7-3: Esquemático da entrada de áudio analógica](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-3: Esquemático da entrada de áudio analógica</em></div>

![Figura 6.7-4: Layout da entrada de áudio analógica](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-4: Layout da entrada de áudio analógica</em></div>

![Figura 6.7-5: Esquemático da saída de áudio analógica](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-5: Esquemático da saída de áudio analógica</em></div>

![Figura 6.7-6: Layout da saída de áudio analógica](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-6: Layout da saída de áudio analógica</em></div>

A Figura 6.7-1 mostra capacitores de filtro de referência de 1 uF/6,3 V para MIC_BIAS, 2,2 uF/10 V para AVDD33_AUD e 1 uF/6,3 V para AUD_VREF. Esses valores explicam o circuito ilustrado; confirme os necessários para o projeto real. Além do roteamento diferencial, mantenha DACP/DACN afastados de fontes de interferência intensa.

As orientações do esquemático da fonte também limitam a menos de 2 cm as trilhas de saída DAC.

### 6.8. Roteamento de USB { #68-usb-interface-routing }

Roteie USB DP (PA35) / DN (PA36) primeiro pelos pinos do dispositivo de proteção ESD e depois até o chip. Conecte o GND da proteção firmemente à massa principal. Controle a impedância diferencial do par em 90 Ω e use blindagem completa por GND.

![Figura 6.8-1: Esquemático dos sinais USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-1: Esquemático dos sinais USB</em></div>

![Figura 6.8-2: Layout dos sinais USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-2: Layout dos sinais USB</em></div>

![Figura 6.8-3: Posicionamento de referência dos componentes USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-3: Posicionamento de referência dos componentes USB</em></div>

![Figura 6.8-4: Modelo de roteamento dos sinais USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-4: Modelo de roteamento dos sinais USB</em></div>

A Figura 6.8-3 compara o roteamento pelos pads de proteção com derivações sem proteção: não crie uma derivação que chegue ao chip sem passar pela conexão de proteção.

### 6.9. Roteamento de SDIO { #69-sdio-interface-routing }

Roteie os sinais SDIO em conjunto, com comprimento total ≤50 mm e diferença de comprimento entre as trilhas do grupo ≤6 mm. Use blindagem completa por GND no clock e blinde também DATA e CMD.

![Figura 6.9-1: Esquemático da interface SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: Esquemático da interface SDIO</em></div>

![Figura 6.9-2: Modelo de roteamento de SDIO na PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: Modelo de roteamento de SDIO na PCB</em></div>

A Figura 6.9-2 também mostra espaçamento ≥0,15 mm entre CMD e a proteção por GND adjacente.

O esquemático SDIO identifica PA11 como MPI2_VDD_EN/SD_VDD_EN. As notas de aplicação e o guia de projeto de esquemático da OpenSiFli, de maior prioridade, indicam PA21 para chavear a alimentação do armazenamento de boot; use PA21 como referência respaldada pelas fontes. A entrada PA11 da planilha de checklist para a Flash externa das variantes com bateria não esclarece se é outro controle. Não substitua por PA11 sem esclarecimento. Antes de liberar o projeto, confirme com a SiFli a rede e a variante específicas; consulte [Armazenamento e fabricação](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control).

### 6.10. Roteamento do DC/DC { #610-dcdc-circuit-routing }

Coloque o indutor de potência e os capacitores de filtro próximos aos pinos do chip. Mantenha BUCK_LX curto e largo e use largura superior a 0,25 mm na trilha de realimentação BUCK_FB. Conecte os terminais de GND de todos os capacitores de filtro da saída DC/DC ao plano de massa principal por várias vias. Não preencha com cobre a camada superior na área do indutor; mantenha um plano de massa de referência contínuo na camada adjacente.

![Figura 6.10-1: Esquemático dos componentes principais do DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-1: Esquemático dos componentes principais do DC/DC</em></div>

![Figura 6.10-2: Layout dos componentes principais do DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-2: Layout dos componentes principais do DC/DC</em></div>

A Figura 6.10-1 usa um indutor de 4,7 uH e um capacitor de saída de 4,7 uF/10 V. PMU_BUCK_VSW e PMU_BUCK_VOUT correspondem aos nós de comutação e saída/realimentação chamados BUCK_LX e BUCK_FB na tabela de pinos da fonte. Não passe outras trilhas pela área do indutor.

### 6.11. Roteamento da alimentação { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (Alimentação por bateria)"

    VCC é o pino de entrada do bloco PMU interno. Coloque seu capacitor próximo ao pino, com largura de trilha de pelo menos 0,4 mm. Posicione os capacitores de filtro de VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD e AVDD_BRF próximos aos respectivos pinos. Dimensione as trilhas para a corrente de entrada necessária.

    ![Figura 6.11-1: Roteamento de VCC (esquemático)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-1: Roteamento de VCC (esquemático)</em></div>

    ![Figura 6.11-2: Roteamento de VCC (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-2: Roteamento de VCC (PCB)</em></div>

    **Roteamento do circuito de carga**

    VBUS e VBAT são os pinos de entrada e saída do bloco de carregamento interno. Coloque seus capacitores de filtro próximos aos pinos. Como o circuito de carga conduz corrente relativamente alta, use trilhas com largura de pelo menos 16 mil (aprox. 0,41 mm) e não passe sinais sensíveis em paralelo. Adote roteamento em estrela para que o caminho de carga não compartilhe trechos de trilha com circuitos sensíveis. A nota de aplicação arredonda esse mínimo para 0,4 mm.

    ![Figura 6.11-3: Roteamento de VBUS e VBAT (esquemático)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-3: Roteamento de VBUS e VBAT (esquemático)</em></div>

    ![Figura 6.11-4: Roteamento de VBUS e VBAT (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-4: Roteamento de VBUS e VBAT (PCB)</em></div>

    !!! note "Esquemático de carga de referência"
        A Figura 6.11-3 mostra 10 uF/10 V em VBUS e 4,7 uF/10 V em VBAT. A faixa de VBUS impressa é 4,3–5,5 V; a Electrical Specification-A3 informa 4,5–5,5 V, e a nota de aplicação das variantes com bateria especifica 4,6–5,5 V para o carregador integrado e exige pelo menos 4,6 V no pino VBUS com a corrente máxima de carga. A figura é uma referência de posicionamento e não valida 4,3 V como limite mínimo de operação. Consulte também a nota sobre divergência de fontes na Seção 5.2.

=== "52B/D/E/G/J (Alimentação externa regulada)"

    PVDD é o pino de entrada do bloco PMU interno. Coloque seu capacitor próximo ao pino, com largura de trilha de pelo menos 0,4 mm. Posicione os capacitores de filtro de AVDD33, VDDIOA, VDD_SIP, AVDD33_AUD e AVDD_BRF próximos aos respectivos pinos. Dimensione as trilhas para a corrente necessária e mantenha-as tão curtas e largas quanto possível, reduzindo o ripple da alimentação e melhorando a estabilidade do sistema.

    ![Figura 6.11-5: Roteamento de PVDD](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 6.11-5: Roteamento de PVDD</em></div>

    !!! info "Não se aplica"
        Esta variante não possui circuito de gerenciamento de carga; portanto, essas regras de roteamento do carregador não se aplicam.

### 6.12. Roteamento das demais interfaces { #612-other-interface-routing }

Use blindagem completa por GND nas trilhas de entrada GPADC e mantenha-as afastadas de outros circuitos que possam causar interferência, incluindo os de medição do nível de bateria e detecção de temperatura.

### 6.13. EMI e ESD { #613-emi-esd }

Aplique estas regras de EMI e ESD aos dois grupos de projeto:

- Não passe pela camada superior as linhas longas de clock e alimentação que gerem interferência fora da blindagem; use camadas internas.
- Coloque as proteções ESD próximas aos pinos do conector e faça os sinais passarem primeiro por elas.
- Conecte os pinos de GND das proteções ESD à massa principal por vias, com trilhas de aterramento curtas e largas para reduzir a impedância e melhorar a proteção.

### 6.14. Outras considerações { #614-other-considerations }

Coloque os pontos de teste da linha de carga USB no lado do conector, antes do ponto de proteção TVS. Posicione o TVS da bateria na entrada da placa, antes das derivações para o MCU e as demais cargas. Passe a trilha pelo ponto de conexão do TVS antes de chegar ao chip; o TVS é conectado em derivação ao GND, não em série com a linha. Mantenha curta sua conexão de GND.

![Figura 6.14-1: Posicionamento de referência do TVS de alimentação](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-1: Posicionamento de referência do TVS de alimentação</em></div>

![Figura 6.14-2: Referência de roteamento do TVS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-2: Referência de roteamento do TVS</em></div>
