---
icon: lucide/list-checks
description: "Checklist de revisão do esquemático do SF32LB52x: encapsulamento, alimentação, clock, RF, armazenamento, display e preparação para fabricação."
hide:
    - navigation
tags:
    - Hardware
    - Chip
    - Checklist
---

# Guia de projeto de hardware do SF32LB52x — checklist do esquemático { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "Parte do guia de projeto de hardware do SF32LB52x"
    Esta página apresenta a seção 5.8, com os pontos de verificação do esquemático. Volte a [Sistema mínimo, alimentação e clock](SF32LB52x_schematic_design.md), a primeira das três páginas de orientações para o projeto do esquemático.

## 5.8. Checklist do esquemático { #58-schematic-checklist }

Cada tabela cobre um bloco funcional do esquemático. A coluna “Aplicável a” indica os modelos ou as revisões de silício específicos quando o item não se aplica a todas as variantes.

“Obrigatório” significa que o item deve ser verificado quando aplicável; não exige instalar todos os periféricos listados. Os itens condicionais só se aplicam quando o circuito ou a função correspondente está presente. Mantenha as categorias Obrigatório/Opcional da fonte e diferencie recomendações de limites obrigatórios.

### 5.8.1. Encapsulamento { #581-package }

<div align="center"><em>Tabela 5.8.1-1: Checklist — Encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O encapsulamento do componente escolhido está correto, incluindo os nomes e números dos pinos | Todas as variantes | Obrigatório |

</div>

### 5.8.2. Alimentação { #582-power-supply }

<div align="center"><em>Tabela 5.8.2-1: Checklist — Alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A tensão de alimentação de VBUS está na faixa de <span class="flag-red">4,6 V–5,5 V</span> | Apenas 520/3/5/7 | Obrigatório |
| 2 | Se o produto precisa acender a tela assim que o carregador é conectado, o carregador interno não é recomendado; prefira um CI carregador externo com gerenciamento do caminho de alimentação | Apenas 520/3/5/7 | Obrigatório |
| 3 | O carregador interno só pode ser usado se for aceitável esperar a bateria atingir 3,6 V antes de o software ligar a tela | Apenas 520/3/5/7 | Obrigatório |
| 4 | Recomenda-se um dispositivo OVP com saída LDO integrada, como LP5305AQVF: saída de 4,7–5,4 V, capacidade de carga ≥0,5 A e corrente de atuação da proteção contra sobrecorrente ≥0,7 A | Apenas 520/3/5/7 | Obrigatório |
| 5 | Se o dispositivo OVP tiver OVLO ajustável, os resistores do divisor têm tolerância de 1% e o erro de V_OVLO_TH é inferior a 3%; tanto o mínimo quanto o máximo de V_OVP devem ficar dentro da faixa de 5,15–5,55 V. A fonte identifica 5,15 V como a tensão máxima de entrada do carregador e 5,55 V como o limite superior de entrada do carregador do 52x; consulte a nota sobre a divergência após a tabela | Apenas 520/3/5/7 | Obrigatório |
| 6 | Se o carregador interno não for usado, VBUS pode ficar desconectado e seu capacitor pode ser omitido; nesse caso, VBAT deixa de funcionar como saída e deve ter um capacitor externo de 1 uF | Apenas 520/3/5/7 | Obrigatório |
| 7 | Medição da tensão da bateria: um canal interno do GPADC já está conectado a VBAT ou VBATS; não conecte VBAT também a um pino GPADC externo | Todas as variantes | Obrigatório |
| 8 | <span class="flag-red">A tensão de alimentação dos pinos VCC e VBAT está na faixa de 3,2 V–4,7 V</span> | Apenas 520/3/5/7 | Obrigatório |
| 9 | As conexões de BUCK_LX e BUCK_FB estão corretas | Todas as variantes | Obrigatório |
| 10 | VDD_VOUT1 tem um ponto de teste ou um capacitor de filtro acessível para medir a tensão | Todas as variantes | Obrigatório |
| 11 | VDD_VOUT2 tem um ponto de teste ou um capacitor de filtro acessível para medir a tensão | Todas as variantes | Obrigatório |
| 12 | VDD_RET tem um ponto de teste ou um capacitor de filtro acessível para medir a tensão | Todas as variantes | Obrigatório |
| 13 | VDD_RTC tem um ponto de teste ou um capacitor de filtro acessível para medir a tensão | Todas as variantes | Obrigatório |
| 14 | AVDD_BRF é alimentado por VSYS | Apenas 520/3/5/7 | Obrigatório |
| 15 | AVDD33_AUD é alimentado por LDO2 | Apenas 520/3/5/7 | Obrigatório |
| 16 | VSYS é uma alimentação de uso interno do MCU; não a use para alimentar outros periféricos | Apenas 520/3/5/7 | Obrigatório |
| 17 | Recomenda-se LDO2_OUT para alimentar memórias, sensores e periféricos semelhantes; pode-se inserir uma chave de carga para controlar a alimentação | Apenas 520/3/5/7 | Obrigatório |
| 18 | <span class="flag-red">A soma das correntes de pico dos periféricos alimentados por LDO2 não ultrapassa 150 mA</span> | Apenas 520/3/5/7 | Obrigatório |
| 19 | Recomenda-se LDO3_OUT para alimentar o motor de vibração | Apenas 520/3/5/7 | Obrigatório |
| 20 | <span class="flag-red">A soma das correntes de pico dos periféricos alimentados por LDO3 não ultrapassa 150 mA</span> | Apenas 520/3/5/7 | Obrigatório |
| 21 | O LCD exige um LDO dedicado de baixa corrente quiescente (Iq) | Todas as variantes | Obrigatório |
| 22 | Recomenda-se alimentar o LED do sensor de frequência cardíaca por VBAT | Todas as variantes | Obrigatório |
| 23 | A entrada de carregamento exige um circuito OVP | Todas as variantes | Obrigatório |
| 24 | Se a tensão da bateria for baixa demais e o sistema precisar receber alimentação dos 5 V da entrada do carregador, recomenda-se um CI carregador com gerenciamento do caminho de alimentação; <span class="flag-red">a tensão aplicada a VCC não pode ultrapassar 4,7 V</span> | Apenas 520/3/5/7 | Obrigatório |
| 25 | <span class="flag-red">SF32LB52DUB6: PVDD = 1,8 V</span> | Apenas 52D | Obrigatório |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6: PVDD = 3,3 V</span> | 52B/E/G/J | Obrigatório |
| 27 | <span class="flag-red">SF32LB52BU36 e SF32LB52BU56: VDD_SIP precisa de alimentação externa de 3,3 V</span> | Apenas 52B | Obrigatório |
| 28 | <span class="flag-red">SF32LB52DUB6: VDD_SIP precisa de alimentação externa de 1,8 V</span> | Apenas 52D | Obrigatório |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6: VDD_SIP não precisa de alimentação externa; basta o capacitor externo</span> | 52E/G/J | Obrigatório |
| 30 | VBATS é o sinal de medição da tensão da bateria; a faixa de medição é 0–4,5 V | 52B/D/E/G/J | Obrigatório |

</div>

!!! important "Limiares OVP não são limites de operação de VBUS"
    O item 5 da fonte indica 5,15–5,55 V para selecionar um OVLO ajustável, enquanto o item 1 limita a alimentação VBUS do chip a 4,6–5,5 V. Não interprete 5,55 V como uma tensão contínua permitida em VBUS. A [seção do sistema de alimentação](SF32LB52x_schematic_design.md#52-power-system) explica as diferenças entre as fontes e cita outra faixa de seleção OVP da nota de aplicação. Antes de aprovar o projeto, confirme com a SiFli os limiares e os limites de operação do componente escolhido.

!!! note "Origem e aplicação dos valores de VBUS"
    A seção Electrical Specification-A3 indica uma faixa de alimentação VBUS de 4,5–5,5 V. A nota de aplicação das variantes alimentadas por bateria indica 4,6–5,5 V em sua tabela de alimentação e exige pelo menos 4,6 V no pino VBUS durante a corrente máxima de carga. Esses valores têm contextos diferentes; considere a tolerância da alimentação e a queda de tensão ao verificar a tensão mínima no chip.

### 5.8.3. Capacitores e indutores da alimentação { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabela 5.8.3-1: Checklist — Capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Capacitor de VBUS ≥10 uF | Apenas 520/3/5/7 | Obrigatório |
| 2 | Capacitor de VBAT ≥4,7 uF | Apenas 520/3/5/7 | Obrigatório |
| 3 | No SF32LB523/5/7, o pino 24 é VCC; capacitor externo ≥10 uF | 523/5/7 | Obrigatório |
| 4 | Nas variantes 523/5/7/B/D/E/G/J, <span class="flag-red">o pino 23 é VDD_SIP; capacitor externo ≥2,2 uF</span> | 523/5/7/B/D/E/G/J | Obrigatório |
| 5 | No SF32LB520, o pino 24 é o GPIO PA21 | 520/SS6500 | Obrigatório |
| 6 | No SF32LB520, o pino 23 é VCC; capacitor externo ≥10 uF | 520/SS6500 | Obrigatório |
| 7 | Capacitor de BUCK_FB = 4,7 uF | Todas as variantes | Obrigatório |
| 8 | Capacitor de VDD_VOUT1 = 4,7 uF | Todas as variantes | Obrigatório |
| 9 | Capacitor de VDD_VOUT2 = 4,7 uF | Todas as variantes | Obrigatório |
| 10 | Capacitor de VDD_RET = 0,47 uF | Todas as variantes | Obrigatório |
| 11 | Capacitor de VDD_RTC = 1 uF | Todas as variantes | Obrigatório |
| 12 | <span class="flag-red">Capacitância total de VDD33_VOUT1 ≤9,6 uF</span> | <span class="flag-red">Apenas 520/3/5/7</span> | Obrigatório |
| 13 | <span class="flag-red">Capacitância total de VDD33_VOUT2 ≤9,6 uF</span> | <span class="flag-red">Apenas 520/3/5/7</span> | Obrigatório |
| 14 | <span class="flag-red">Capacitância total de VSYS ≤9,6 uF</span> | <span class="flag-red">Apenas 520/3/5/7</span> | Obrigatório |
| 15 | Capacitor de MIC_BIAS = 1 uF | Todas as variantes | Obrigatório |
| 16 | <span class="flag-red">Capacitor de AVDD_BRF = 4,7 uF</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 17 | <span class="flag-red">Capacitor de AVDD33_AUD = 2,2 uF</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 18 | Capacitor de AUD_VREF = 1 uF | Todas as variantes | Obrigatório |
| 19 | <span class="flag-red flag-yellow">Capacitor de VSYS = 4,7 uF</span> | <span class="flag-red flag-yellow">Apenas 520/3/5/7</span> | Obrigatório |
| 20 | Capacitor de VREFP do GPADC = 4,7 uF | Todas as variantes | Obrigatório |
| 21 | O indutor do BUCK consta na [lista de fornecedores aprovados da SiFli][SiFli Approved Vendor List] (AVL) | Todas as variantes | Obrigatório |
| 22 | Se o indutor do BUCK não constar na AVL, atende a L = 4,7 uH, DCR ≤0,4 Ω e Isat ≥450 mA | Todas as variantes | Obrigatório |
| 23 | <span class="flag-red">Se houver GPS ou outros periféricos sensíveis a interferências, reserve um footprint para um capacitor entre BUCK_LX e terra; determine o valor por meio de testes</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 24 | <span class="flag-red">A corrente quiescente do conversor DCDC escolhido está registrada e atende aos requisitos do projeto</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 25 | <span class="flag-red">A corrente quiescente do LDO escolhido está registrada e atende aos requisitos do projeto</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |

</div>

!!! note "Aplicabilidade do pino 24 na fonte"
    O texto do item 3 sobre capacitores menciona SF32LB520/3/5/7, mas a coluna “Aplicável a” o limita a 523/5/7. Os itens 5 e 6 identificam o pino 24 do SF32LB520 como PA21 e o pino 23 como VCC. Esta tabela segue a aplicabilidade mais restrita do item 3; confirme a pinagem do componente exato antes de aprovar a revisão.

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Tabela 5.8.4-1: Checklist — Clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O cristal principal de 48 MHz consta na AVL | Todas as variantes | Obrigatório |
| 2 | Se o cristal de 48 MHz não constar na AVL, atende a 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), desvio de frequência ≤±10 ppm e ESR ≤30 Ω (22 Ω recomendado) | Todas as variantes | Obrigatório |
| 3 | O cristal RTC de 32,768 kHz consta na AVL | Todas as variantes | Obrigatório |
| 4 | Se o cristal de 32,768 kHz não constar na AVL, atende a CL ≤12,5 pF (7 pF recomendado), desvio de frequência ≤±20 ppm e ESR ≤80 kΩ (38 kΩ recomendado) | Todas as variantes | Obrigatório |
| 5 | No 52x, PA24/25/26/27 podem fornecer o clock xtal32k | Todas as variantes | Obrigatório |

</div>

### 5.8.5. Configuração de bootstrap { #585-bootstrap-configuration }

<div align="center"><em>Tabela 5.8.5-1: Checklist — Configuração de bootstrap</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Se houver memória externa <span class="flag-purple">Flash SPI NOR, PA13 e PA17 não precisam de pull-up</span> | Todas as variantes | Obrigatório |
| 2 | Se houver <span class="flag-red">Flash SPI NAND</span> externa, PA13 não precisa de pull-up; <span class="flag-red">PA17 precisa de um pull-up de 7,5 kΩ</span> para VDD da Flash | Todas as variantes | Obrigatório |
| 3 | Se houver <span class="flag-blue">Flash SD NAND</span> externa, PA17 não precisa de pull-up; <span class="flag-blue">PA13 precisa de um pull-up de 7,5 kΩ</span> para VDD da Flash | Todas as variantes | Obrigatório |
| 4 | Se houver memória externa <span class="flag-green">eMMC, PA13 e PA17 precisam de pull-ups de 7,5 kΩ</span> para VCCQ da eMMC | <span class="flag-red">52D/E/G/J</span> | Obrigatório |

</div>

### 5.8.6. RF { #586-rf }

<div align="center"><em>Tabela 5.8.6-1: Checklist — RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O sinal ANT está identificado com o requisito de impedância característica de 50 Ω, single-ended | Todas as variantes | Obrigatório |
| 2 | Foi reservada uma rede de casamento em Pi no sinal ANT, com capacitor em paralelo NC (não montado) e capacitor de 15 pF em série | Todas as variantes | Obrigatório |
| 3 | Se for necessário filtrar emissões espúrias, foi reservada uma rede de casamento em Pi com indutor de 2,7 nH em série e capacitor de 2 pF em paralelo | Todas as variantes | Opcional |
| 4 | <span class="flag-red">Se for necessário controlar um PA ou LNA externo, PA00 está conectado a RX_EN e PA01 a TX_EN</span> | Todas as variantes | Opcional |

</div>

### 5.8.7. Alocação de recursos de I/O { #587-io-resource-allocation }

<div align="center"><em>Tabela 5.8.7-1: Checklist — Alocação de recursos de I/O</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Foi fornecida uma tabela de alocação de GPIOs correspondente ao esquemático | Todas as variantes | Obrigatório |
| 2 | A alocação de GPIOs na tabela corresponde ao esquemático | Todas as variantes | Obrigatório |
| 3 | A alocação dos GPIOs segue as recomendações da SiFli; consulte o arquivo de configuração de I/O do HDK | Todas as variantes | Obrigatório |

</div>

### 5.8.8. Despertar por hardware { #588-hardware-wake-up }

<div align="center"><em>Tabela 5.8.8-1: Checklist — Despertar por hardware</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">As fontes de interrupção para despertar estão corretas; os pinos disponíveis são PA24–PA27 e PA34–PA44, totalizando 15 pinos</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |

</div>

### 5.8.9. Armazenamento { #589-storage }

<div align="center"><em>Tabela 5.8.9-1: Checklist — Armazenamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Se MPI2 (SD1) estiver conectado a uma Flash SPI NOR: <span class="flag-red">PA13 (MPI D1) e PA17 (MPI D3) não precisam de pull-up</span> | Todas as variantes | Obrigatório |
| 2 | Se MPI2 (SD1) estiver conectado a uma Flash SPI NAND: <span class="flag-red">PA13 (MPI D1) não precisa de pull-up; PA17 (MPI D3) precisa de um pull-up de 7,5 kΩ</span> | Todas as variantes | Obrigatório |
| 3 | Se MPI2 (SD1) estiver conectado a uma Flash SD NAND: <span class="flag-red">PA13 (SD D3) precisa de um pull-up de 7,5 kΩ; PA17 (SD D1) não precisa de pull-up; PA15 (SD CMD) precisa de um pull-up de 7,5 kΩ</span> | Todas as variantes | Obrigatório |
| 4 | Se MPI2 (SD1) estiver conectado a uma eMMC: <span class="flag-red">PA13 (SD D3) e PA17 (SD D1) precisam de pull-ups de 7,5 kΩ; PA15 (SD CMD) precisa de um pull-up de 7,5 kΩ</span> | <span class="flag-red">52D/E/G/J</span> | Obrigatório |
| 5 | O armazenamento externo do SF32LB520 e do SF32LB52B deve ser Flash SPI NOR | 520/B | Obrigatório |
| 6 | Se houver requisitos de consumo no desligamento, <span class="flag-red">a alimentação da Flash externa deve ser chaveada por PA11</span>, com nível alto para ligar e baixo para desligar | Apenas 520/3/5/7 | Obrigatório |
| 7 | Se houver requisitos de consumo no desligamento, <span class="flag-red">a alimentação da Flash externa deve ser chaveada por PA21</span>, com nível alto para ligar e baixo para desligar | <span class="flag-red">52B/D/E/G/J</span> | Obrigatório |
| 8 | Se houver requisitos de consumo no desligamento, <span class="flag-red">a alimentação de VDD_SIP deve ser chaveada por PA21</span>, com nível alto para ligar e baixo para desligar | <span class="flag-red">52B/D/E/G/J</span> | Obrigatório |
| 9 | <span class="flag-red">Se MPI estiver conectado a uma Flash NOR de 32 MB ou mais, PA21 deve controlar sua alimentação para permitir o desligamento</span> | <span class="flag-red">52B/D/E/G/J</span> | Obrigatório |
| 10 | Se SD1 estiver conectado a uma Flash SD NAND, as conexões dos sinais estão corretas | Todas as variantes | Obrigatório |
| 11 | <span class="flag-red">As linhas CLK e de dados da Flash têm resistores de 33 Ω em série</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 12 | <span class="flag-red">Se houver duas Flash NOR externas, CLK/D0–D3 são compartilhados; CS da primeira usa PA12 e CS da segunda usa PA26, um pino com pull-up interno adequado a CS ativo em nível baixo, pois no reset permanece alto e mantém a memória não selecionada</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 13 | <span class="flag-red">Se houver duas Flash NOR externas, a primeira deve ter 16 MB; a segunda pode ter 8 MB ou 16 MB</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 14 | O nível lógico de I/O do periférico corresponde ao do MCU | Todas as variantes | Obrigatório |
| 15 | <span class="flag-red">A Flash NOR selecionada consta como qualificada no guia de seleção de componentes críticos; caso contrário, a ROM pode não reconhecê-la e o sistema pode não iniciar</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 16 | <span class="flag-red">A Flash SPI/SD NAND selecionada consta como qualificada no guia de seleção de componentes críticos; caso contrário, a ROM pode não reconhecê-la e o sistema pode não iniciar</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |

</div>

### 5.8.10. Display { #5810-display }

<div align="center"><em>Tabela 5.8.10-1: Checklist — Display</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Se houver um display QSPI, as conexões dos sinais estão corretas | Todas as variantes | Obrigatório |
| 2 | Se houver um display com interface 8080, as conexões dos sinais estão corretas | Todas as variantes | Obrigatório |
| 3 | Se houver um display JDI, as conexões dos sinais estão corretas | Todas as variantes | Obrigatório |
| 4 | As conexões QSPI do LCD estão corretas; <span class="flag-red">as linhas CLK e de dados têm resistores de 100 Ω em série</span> | Todas as variantes | Obrigatório |
| 5 | A conexão de RSTB do LCD está correta; recomenda-se PA0 | Todas as variantes | Obrigatório |
| 6 | A conexão de TE do LCDC está correta; conecta-se ao sinal TE ou Fmark do painel | Todas as variantes | Obrigatório |
| 7 | Os sinais do painel de toque (TP) seguem a atribuição de pinos recomendada; consulte o arquivo de configuração de I/O da EVB | Todas as variantes | Obrigatório |
| 8 | Foi definido se o produto precisa de display sempre ligado | Todas as variantes | Obrigatório |
| 9 | O display é alimentado por um LDO de baixa corrente quiescente; <span class="flag-red">recomenda-se PA30 para controlar o enable do LDO</span> | Todas as variantes | Obrigatório |
| 10 | Foi definido se TP e LCD precisam de controle de alimentação independente ou compartilhado | Todas as variantes | Obrigatório |
| 11 | Se o LCD integrar um sensor de luz, esse sensor também recebe alimentação | Todas as variantes | Obrigatório |
| 12 | Para o backlight de um LCD TFT, use um GPIO com pull-down (PD) se o controle for ativo em nível alto e um GPIO com pull-up (PU) se for ativo em nível baixo | Todas as variantes | Obrigatório |
| 13 | <span class="flag-red">LCD SPI: modo de 3 fios — CS em PA03, CLK em PA04 e DATA em PA05; modo de 4 fios — CS em PA03, CLK em PA04, DATA em PA05 e DC em PA06</span> | Todas as variantes | Obrigatório |
| 14 | O display Sharp Memory/JDI conectado à interface JDI do MCU deve ter: VCOM e VB em PA24; VA em PA25; R0/G0/B0 do display em R1/G1/B1 do MCU; R1/G1/B1 do display em R2/G2/B2 do MCU; GSP em VST; BSP em HST; GCK em VCK; BCK em HCK; GEN em ENB; INTB em XRST | Todas as variantes | Obrigatório |
| 15 | O nível lógico de I/O do periférico corresponde ao do MCU | Todas as variantes | Obrigatório |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>Tabela 5.8.11-1: Checklist — GPADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A entrada GPADC está conectada ao pino correspondente <span class="flag-red">(PA28–PA34: 7 GPIOs podem ser multiplexados como GPADC)</span> | Todas as variantes | Opcional |
| 2 | A tensão de entrada do GPADC permanece na faixa de 0–3,3 V | Todas as variantes | Opcional |
| 3 | Se a entrada medida pelo GPADC usar um divisor resistivo, ambos os resistores têm tolerância de 1%; <span class="flag-red">cada canal GPADC tem um capacitor de filtro de 100 nF próximo ao pino do chip</span> | Todas as variantes | Obrigatório |

</div>

### 5.8.12. Botões { #5812-buttons }

<div align="center"><em>Tabela 5.8.12-1: Checklist — Botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Foi definido se os botões precisam despertar o MCU | Todas as variantes | Obrigatório |
| 2 | As conexões dos botões comuns estão corretas, incluindo presença do pull-up, valor do resistor e domínio de tensão | Todas as variantes | Obrigatório |
| 3 | O botão de ligar/desligar usa PA34, é ativo em nível alto e provoca reset após 10 segundos pressionado; <span class="flag-red">o resistor de pull-down de 10 kΩ deve ficar na placa principal</span> | Todas as variantes | Obrigatório |
| 4 | Todos os sinais dos botões têm proteção ESD | Todas as variantes | Obrigatório |

</div>

### 5.8.13. Proteção EOS e ESD { #5813-eos-and-esd-protection }

<div align="center"><em>Tabela 5.8.13-1: Checklist — Proteção EOS e ESD</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A interface de carregamento tem proteção EOS, ESD e OVP | Todas as variantes | Obrigatório |
| 2 | A interface da bateria tem um dispositivo de proteção ESD | Todas as variantes | Obrigatório |
| 3 | A interface da antena tem um dispositivo de proteção ESD | Todas as variantes | Obrigatório |
| 4 | As interfaces de alimentação do LCD e do TP têm dispositivos de proteção ESD | Todas as variantes | Obrigatório |
| 5 | As linhas I2C, RST e INT do TP têm dispositivos de proteção ESD | Todas as variantes | Obrigatório |
| 6 | A interface de alimentação e as linhas de sinal do sensor de frequência cardíaca têm dispositivos de proteção ESD | Todas as variantes | Obrigatório |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabela 5.8.14-1: Checklist — I2C</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O I2C tem pull-ups com valores adequados; para 400 kHz, recomendam-se 2,2 kΩ; a tensão de pull-up pertence ao domínio do periférico e é desligada junto com ele | Todas as variantes | Obrigatório |
| 2 | O sinal de interrupção associado ao periférico I2C permite despertar por hardware, quando necessário | Todas as variantes | Obrigatório |
| 3 | Os periféricos I2C, como acelerômetro, sensor de frequência cardíaca e magnetômetro, permitem ler todos os dados em uma única transferência em rajada | Todas as variantes | Obrigatório |
| 4 | Os dispositivos que compartilham um barramento I2C têm endereços distintos | Todas as variantes | Obrigatório |

</div>

### 5.8.15. Áudio analógico { #5815-analog-audio }

<div align="center"><em>Tabela 5.8.15-1: Checklist — Áudio analógico</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | As conexões do microfone MEMS estão corretas | Todas as variantes | Opcional |
| 2 | O microfone MEMS é alimentado por MIC_BIAS | Todas as variantes | Opcional |
| 3 | As conexões do microfone ECM analógico single-ended estão corretas | Todas as variantes | Opcional |
| 4 | O microfone ECM analógico single-ended é alimentado por MIC_BIAS | Todas as variantes | Opcional |
| 5 | Todas as entradas do ADC de áudio têm capacitor de bloqueio DC de pelo menos 2,2 uF | Todas as variantes | Opcional |
| 6 | As saídas DACP e DACN do DAC de áudio têm, cada uma, um resistor de 1 kΩ em série próximo ao chip; há um capacitor de 1,5 nF entre DACP e DACN | Todas as variantes | Opcional |
| 7 | <span class="flag-red">Recomenda-se AW8155B como amplificador de potência de áudio, configurado por software em modo Classe A/B; outros componentes precisam de validação por testes</span> | Todas as variantes | Opcional |
| 8 | <span class="flag-red">Se o caminho integrado do ADC de áudio analógico não for usado, recomenda-se conectar ADCP ao terra por um resistor de 0 Ω</span> | Todas as variantes | Opcional |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>Tabela 5.8.16-1: Checklist — SPI</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | As conexões SPI estão corretas: SDO do MCU em SDI do periférico e SDI do MCU em SDO do periférico | Todas as variantes | Opcional |
| 2 | Os requisitos de temporização do periférico SPI são atendidos | Todas as variantes | Opcional |
| 3 | O nível lógico de I/O do periférico corresponde ao do MCU | Todas as variantes | Opcional |

</div>

### 5.8.17. USART e interface de depuração { #5817-usart-and-debug-interface }

<div align="center"><em>Tabela 5.8.17-1: Checklist — USART e interface de depuração</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | PA18/PA19, multiplexados como DBG_UART, são a interface de gravação e depuração; há pontos de teste <span class="flag-red">e resistor de 100 Ω em série</span> | Todas as variantes | Obrigatório |
| 2 | As conexões UART estão corretas: RXD do MCU em TXD do periférico e TXD do MCU em RXD do periférico | Todas as variantes | Obrigatório |
| 3 | Se PA35/PA36 forem usados como UART de um periférico, esse periférico está sem alimentação no reset do MCU, ou o software mantém os dois pinos em nível baixo | Todas as variantes | Obrigatório |
| 4 | O nível lógico de I/O do periférico corresponde ao do MCU | Todas as variantes | Obrigatório |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>Tabela 5.8.18-1: Checklist — PWM</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Recomenda-se PA1 para controlar o backlight do LCD | Todas as variantes | Opcional |
| 2 | O PWM do motor de vibração usa PA20 | Todas as variantes | Obrigatório |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>Tabela 5.8.19-1: Checklist — USB</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | As conexões da interface USB estão corretas | Todas as variantes | Opcional |
| 2 | A interface USB tem proteção ESD | Todas as variantes | Opcional |
| 3 | Com USB habilitado durante a operação normal, sem suspensão, o host detecta conexão e desconexão. Se essa detecção for necessária enquanto o MCU dorme, há um divisor de VBUS que fornece um nível compatível com a tensão de I/O a um pino de despertar do MCU; recomenda-se compartilhar esse pino com a detecção de conexão do carregador | Todas as variantes | Opcional |

</div>

### 5.8.20. Consumo de energia { #5820-power-consumption }

<div align="center"><em>Tabela 5.8.20-1: Checklist — Consumo de energia</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Os LDOs e conversores DCDC têm enable ativo em nível alto; se a saída deve permanecer desligada por padrão, há um resistor de pull-down de 1 M–5,1 MΩ entre EN e terra, dimensionado conforme os requisitos de consumo | Todas as variantes | Obrigatório |
| 2 | O chaveamento de alimentação por MOSFET usa uma combinação PMOS+NMOS, controle em nível alto para ligar e baixo para desligar, com pull-down de 1 MΩ entre o pino de controle e terra | Todas as variantes | Obrigatório |
| 3 | A chave de alimentação da Flash externa é controlada por PA11 | Apenas 520/3/5/7 | Obrigatório |
| 4 | <span class="flag-red">As chaves de alimentação da Flash externa e de VDD_SIP são ambas controladas por PA21</span> | <span class="flag-red">52A/D</span>[^52a-note] | Não especificado na fonte[^52a-category-note] |
| 5 | Se VSYS alimentar pull-ups de GPIO, sua alimentação permanece ligada; foi confirmado que isso atende aos requisitos de consumo | Apenas 520/3/5/7 | Obrigatório |
| 6 | Se LDO2 ou LDO3 alimentar pull-ups de GPIO, foram verificados os requisitos do projeto nas situações em que esses LDOs são desligados | Apenas 520/3/5/7 | Obrigatório |
| 7 | A alimentação dos pull-ups de I2C é chaveada junto com a alimentação de I/O do periférico, para evitar corrente de fuga | Todas as variantes | Obrigatório |
| 8 | Uso de PA09: nível alto para habilitar a tela quando ligada e nível baixo durante a suspensão | Revisão A2 do silício e anteriores | Obrigatório |
| 9 | O requisito de corrente de repouso em Deep Sleep foi definido e registrado | Todas as variantes | Obrigatório |
| 10 | <span class="flag-red">A soma das correntes de repouso de todos os periféricos selecionados em Deep Sleep está registrada e atende aos requisitos do projeto</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |
| 11 | O requisito de corrente de repouso em Standby foi definido e registrado | Todas as variantes | Obrigatório |
| 12 | <span class="flag-red">A soma das correntes de repouso de todos os periféricos selecionados em Standby está registrada e atende aos requisitos do projeto</span> | <span class="flag-red">Todas as variantes</span> | Obrigatório |

[^52a-note]: A planilha de origem indica “52A/52D”. As variantes descritas no [guia de projeto de hardware do SF32LB52x][SF32LB52x Hardware Design Guide - Dev] são SF32LB52B/D/E/G/J; a indicação “52A” da planilha não identifica uma dessas variantes. Confirme o modelo exato e seu datasheet antes de aplicar este item; não substitua automaticamente “52A” por outro modelo.
[^52a-category-note]: A planilha de origem deixa a categoria desta linha em branco. A indicação “Não especificado na fonte” preserva essa omissão, sem classificar o item como obrigatório ou opcional. Confirme a aplicabilidade e o critério de aprovação para o componente escolhido.

!!! important "Divergência entre as fontes sobre o pino da chave de alimentação do armazenamento"
    Esta tabela preserva a entrada PA11 da planilha de checklist para o chaveamento da Flash externa no SF32LB520/3/5/7. Pela prioridade de fontes deste projeto, prevalecem as notas de aplicação e o guia de projeto de esquemático da OpenSiFli, de maior prioridade, que indicam PA21 para chavear a alimentação do armazenamento de boot. Use PA21 como referência respaldada pelas fontes e não adote PA11 com base apenas na planilha de menor prioridade. Ela não esclarece se PA11 é outro sinal de habilitação na placa ou uma divergência de atribuição. Confirme com a SiFli a rede e a variante exatas antes de liberar o esquemático.

</div>

### 5.8.21. Pontos de teste para gravação e depuração { #5821-download-and-debug-test-points }

<div align="center"><em>Tabela 5.8.21-1: Checklist — Pontos de teste para gravação e depuração</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Foram reservados pontos de teste para gravação e depuração: VBAT, GND, PA18 (DBG_UART_RXD), PA19 (DBG_UART_TXD), VSYS, PA34 e outros sinais necessários | Todas as variantes | Obrigatório |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
