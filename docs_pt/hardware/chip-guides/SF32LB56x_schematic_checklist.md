---
icon: lucide/list-checks
description: "Checklist detalhado para revisar o esquemático do MCU SF32LB56x, cobrindo alimentação, clock, RF, armazenamento, display e produção."
tags:
    - Hardware
    - Chip
    - Checklist
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56x — checklist do esquemático { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "Parte do guia de projeto de hardware SF32LB56x"
    Esta página cobre a Seção 5.8, com verificações detalhadas do esquemático. Consulte também as [Diretrizes para o esquemático](SF32LB56x_schematic_design.md).

## 5.8. Checklist do esquemático { #58-schematic-checklist }

Cada tabela abaixo cobre um bloco funcional do esquemático. Quando houver uma coluna "Aplica-se a", aplique cada item somente às variantes indicadas nela.

### 5.8.1. Encapsulamento { #581-package }

<div align="center"><em>Tabela 5.8.1-1: Checklist do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O encapsulamento do código de peça selecionado está correto, incluindo nomes e números dos pinos. | Todos os chips | Obrigatório |

</div>

### 5.8.2. Alimentação { #582-power-supply }

<div align="center"><em>Tabela 5.8.2-1: Checklist de alimentação</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A tensão de alimentação de PVDD deve ficar entre 1,8 V e 3,3 V. Recomenda-se 1,8 V para SF32LB56xU/SF32LB56xV e 3,3 V para SS6700A. | Todos os chips | Obrigatório |
| 2 | As conexões BUCK_LX e BUCK_FB estão corretas. | Todos os chips | Obrigatório |
| 3 | A saída LDO_VOUT1 tem um ponto de teste ou um capacitor de filtro que facilite a medição de tensão. | Todos os chips | Obrigatório |
| 4 | A saída LDO_VOUT2 tem um ponto de teste ou um capacitor de filtro que facilite a medição de tensão. | Todos os chips | Obrigatório |
| 5 | A saída VDD_RET tem um ponto de teste ou um capacitor de filtro que facilite a medição de tensão. | Todos os chips | Obrigatório |
| 6 | A saída VDD_RTC tem um ponto de teste ou um capacitor de filtro que facilite a medição de tensão. | Todos os chips | Obrigatório |
| 7 | A tensão de VDDIO1 deve ficar entre 1,8 V e 3,3 V; use 1,8 V no SF32LB56xU e 3,3 V no SS6700A. VDDIO1 pode ser controlado junto com a alimentação da Flash externa por PBR0. Se PBR0 não controlar VDDIO1, mantenha esse trilho alimentado durante o download do programa. Se o controle for feito por GPIO, recomenda-se PB22, e a ferramenta de download deve habilitar o trilho. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 8 | Quando VDDIO1 for alimentado pelo SF30147, recomenda-se usar LVSW1; a ferramenta de download deve habilitar esse trilho. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 9 | A tensão de VDDIO2 deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa; recomenda-se 1,8 V para SF32LB56xU e 3,3 V para SS6700A. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 10 | A tensão de VDDIO3 deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa; recomenda-se 1,8 V para SF32LB56xU e 3,3 V para SS6700A. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 11 | A tensão de VDDIO4 deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa; recomenda-se 1,8 V para SF32LB56xU. O SS6700A não tem esse trilho. | SF32LB560/561/563/56W | Obrigatório |
| 12 | A tensão de VDDIOA deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa. | SF32LB565/567 | Obrigatório |
| 13 | A tensão de VDDIOA2 deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa. | SF32LB565/567 | Obrigatório |
| 14 | A tensão de VDDIOB deve ficar entre 1,8 V e 3,3 V. Reserve um resistor série de 0 Ω na primeira revisão da placa. | SF32LB565/567 | Obrigatório |
| 15 | VDDIOSA deve ser alimentado com 1,8 V e contar com uma chave de carga para controlar sua alimentação. | SF32LB565/567 | Obrigatório |
| 16 | VDDIOSB deve ser alimentado com 1,8 V e contar com uma chave de carga para controlar sua alimentação. | SF32LB565/567 | Obrigatório |
| 17 | VDDIOSC deve ser alimentado com 1,8 V e permanecer sempre ligado. | SF32LB565/567 | Obrigatório |
| 18 | AVDD33_ANA deve ser alimentado com 3,3 V. | Todos os chips | Obrigatório |
| 19 | AVDD33_AUD deve ser alimentado com 3,3 V. | Todos os chips | Obrigatório |
| 20 | Recomenda-se usar no circuito de carga um CI carregador com gerenciamento do caminho de alimentação, para que o sistema possa ligar pela entrada do carregador quando a tensão da bateria estiver abaixo do limite de inicialização. | Todos os chips | Obrigatório |
| 21 | Se for usado um CI carregador sem gerenciamento do caminho de alimentação, a corrente de carga lenta (trickle charge) deve ser de pelo menos 40 mA. | Todos os chips | Obrigatório |
| 22 | Quando aplicável, o projeto da alimentação deve ser compatível em hardware entre SF32LB56xU e SS6700. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 23 | Quando o SF30147 fornecer alimentação, use a interface TWI dedicada do SF32LB56x para controlar os registradores. | Todos os chips | Obrigatório |
| 24 | Se o TWI do SF30147 compartilhar o barramento I2C do acelerômetro, mantenha sempre alimentada a fonte dos pull-ups do I2C do acelerômetro para que o TWI funcione normalmente. | Todos os chips | Obrigatório |
| 25 | Quando o SF30147 fornecer alimentação, podem ser usadas chaves de carga e LDOs controlados por EN. O pino EN deve usar o domínio de alimentação PVDD ou AVDD; não controle a chave por um GPIO do MCU em 1,8 V ou 3,3 V. Como alternativa, conecte EN ao terra e controle por registradores a saída do trilho correspondente. | Todos os chips | Obrigatório |
| 26 | Quando o SF30147 fornecer alimentação, BUCK e LDO1 só podem ser controlados pelos respectivos sinais de habilitação EN_BUCK e EN_LDO1; não há controle por registradores internos. | Todos os chips | Obrigatório |
| 27 | O PVDD da família 56x deve ter a mesma tensão de VDDIO3 no SF32LB56xU ou de VDDIOB no SF32LB56xV. Se PVDD tiver tensão menor — por exemplo, com o trilho de E/S em 3,3 V e PVDD em 1,8 V —, a corrente de fuga no trilho de E/S será de cerca de 15 µA nos modos Standby e Hibernate. | Todos os chips | Obrigatório |

</div>

### 5.8.3. Capacitores e indutores da alimentação { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabela 5.8.3-1: Checklist de capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O capacitor de reserva (bulk) de PVDD deve ter pelo menos 10 µF. | Todos os chips | Obrigatório |
| 2 | O capacitor de BUCK_FB deve ter 4,7 µF. | Todos os chips | Obrigatório |
| 3 | O capacitor de LDO_VOUT1 deve ter 4,7 µF. | Todos os chips | Obrigatório |
| 4 | O capacitor de LDO_VOUT2 deve ter 4,7 µF. | Todos os chips | Obrigatório |
| 5 | O capacitor de VDD_RET deve ter 0,47 µF. | Todos os chips | Obrigatório |
| 6 | O capacitor de VDD_RTC deve ter 1 µF. | Todos os chips | Obrigatório |
| 7 | O capacitor de VDDIO1 deve ter pelo menos 1 µF. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 8 | O capacitor de VDDIO2 deve ter pelo menos 1 µF. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 9 | O capacitor de VDDIO3 deve ter pelo menos 1 µF. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 10 | O capacitor de VDDIO4 deve ter pelo menos 1 µF. | SF32LB560/561/563/56W | Obrigatório |
| 11 | O capacitor de VDDIOA deve ter pelo menos 1 µF. | SF32LB565/567 | Obrigatório |
| 12 | O capacitor de VDDIOA2 deve ter pelo menos 1 µF. | SF32LB565/567 | Obrigatório |
| 13 | O capacitor de VDDIOB deve ter pelo menos 1 µF. | SF32LB565/567 | Obrigatório |
| 14 | O capacitor de VDDIOSA deve ter pelo menos 0,1 µF. | SF32LB565/567 | Obrigatório |
| 15 | O capacitor de VDDIOSB deve ter pelo menos 0,1 µF. | SF32LB565/567 | Obrigatório |
| 16 | O capacitor de VDDIOSC deve ter pelo menos 0,1 µF. | SF32LB565/567 | Obrigatório |
| 17 | O capacitor de MIC_BIAS deve ter 1 µF. | Todos os chips | Obrigatório |
| 18 | O capacitor de AVDD33_ANA deve ter pelo menos 4,7 µF. | Todos os chips | Obrigatório |
| 19 | O capacitor de AVDD33_AUD deve ter pelo menos 4,7 µF. | Todos os chips | Obrigatório |
| 20 | O capacitor de AVDD33_BRF deve ter pelo menos 4,7 µF. | SF32LB565/567 | Obrigatório |
| 21 | O capacitor de AUD_VREF deve ter 1 µF. | Todos os chips | Obrigatório |
| 22 | O capacitor de GPADC VREFP deve ter 4,7 µF. | Todos os chips | Obrigatório |
| 23 | O indutor BUCK é um código de peça listado na [Lista de fornecedores aprovados da SiFli] (AVL). | Todos os chips | Obrigatório |
| 24 | Se o indutor BUCK não for recomendado pela SiFli, ele deve atender a L = 4,7 µH, DCR &lt;= 0,4 Ω e Isat &gt;= 450 mA. | Todos os chips | Obrigatório |
| 25 | A tensão de alimentação de PVDD deve ser 1,8 V. Recomenda-se usar um conversor DCDC de VBAT para 1,8 V. | Todos os chips | Obrigatório |
| 26 | Se houver GPS ou outros periféricos sensíveis a interferência, reserve um footprint para capacitor de derivação para terra em BUCK_LX; o valor depende dos resultados dos testes. | Todos os chips | Obrigatório |
| 27 | A corrente quiescente do conversor DCDC selecionado está registrada e atende aos requisitos do projeto. | Todos os chips | Obrigatório |
| 28 | A corrente quiescente do LDO selecionado está registrada e atende aos requisitos do projeto. | Todos os chips | Obrigatório |

</div>

### 5.8.4. Relógio { #584-clock }

<div align="center"><em>Tabela 5.8.4-1: Checklist de clock</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O cristal principal de 48 MHz tem código de peça listado na AVL. | Todos os chips | Obrigatório |
| 2 | Se o cristal de 48 MHz não estiver na AVL, deve atender a 7 pF ≤ CL ≤ 12 pF (recomendado: 8,8 pF), tolerância de frequência ≤ ±10 ppm e ESR ≤ 30 Ω (recomendado: 22 Ω). | Todos os chips | Obrigatório |
| 3 | O cristal RTC de 32,768 kHz tem código de peça listado na AVL. | Todos os chips | Obrigatório |
| 4 | Se o cristal de 32,768 kHz não estiver na AVL, deve atender a CL ≤ 12,5 pF (recomendado: 7 pF), tolerância de frequência ≤ ±20 ppm e ESR ≤ 80 kΩ (recomendado: 38 kΩ). | Todos os chips | Obrigatório |

</div>

### 5.8.5. Sinais de terra { #585-ground-signals }

<div align="center"><em>Tabela 5.8.5-1: Checklist dos sinais de terra</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Todos os sinais VSS estão conectados ao GND. | Todos os chips | Obrigatório |

</div>

### 5.8.6. Modo de inicialização { #586-boot-mode }

<div align="center"><em>Tabela 5.8.6-1: Checklist do modo de inicialização</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | MODE tem um pull-down interno. Reserve um pull-up de 10 kΩ para VDDIOA e coloque MODE em nível alto durante o download do programa. | Todos os chips | Obrigatório |
| 2 | O sinal MODE tem um ponto de teste reservado e deve ser disponibilizado no dispositivo de programação da produção. | Todos os chips | Obrigatório |

</div>

### 5.8.7. RF { #587-rf }

<div align="center"><em>Tabela 5.8.7-1: Checklist de RF</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O sinal ANT está identificado com o requisito de impedância característica single-ended de 50 Ω. | Todos os chips | Obrigatório |
| 2 | Reserve no sinal ANT uma rede de casamento tipo Pi com um capacitor NC em paralelo (não montar) e um capacitor de 15 pF em série. | Todos os chips | Obrigatório |

</div>

### 5.8.8. Alocação de recursos de E/S { #588-io-resource-allocation }

<div align="center"><em>Tabela 5.8.8-1: Checklist de alocação de recursos de E/S</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | É fornecida uma tabela de alocação de GPIOs compatível com o esquemático. | Todos os chips | Obrigatório |
| 2 | A alocação de GPIOs na tabela de recursos corresponde ao esquemático. | Todos os chips | Obrigatório |
| 3 | No controle de saídas GPIO, considere o estado padrão PU/PD durante a inicialização a frio e, se necessário, habilite previamente os periféricos relacionados. | Todos os chips | Obrigatório |
| 4 | A alocação real de GPIOs segue as recomendações da SiFli; consulte o arquivo de configuração de E/S. | Todos os chips | Obrigatório |

</div>

### 5.8.9. Despertar por hardware { #589-hardware-wake-up }

<div align="center"><em>Tabela 5.8.9-1: Checklist de despertar por hardware</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | As fontes de interrupção para despertar de Hibernate/Standby estão corretas: PA50, PA51, PB32, PB33, PB34, PBR0, PBR1 e PBR2, oito pinos ao todo. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 2 | As fontes de interrupção para despertar de Hibernate/Standby estão corretas: PA50-PA54, PB32-PB36 e PBR0-PBR3, quatorze pinos ao todo. | SF32LB565/567 | Obrigatório |
| 3 | Os pinos de despertar podem despertar o HCPU ou o LCPU conforme a configuração de software. | Todos os chips | Obrigatório |
| 4 | Os sinais de interrupção e controle dos periféricos do lado LCPU, como acelerômetro e sensor de frequência cardíaca, devem ser conectados a GPIOs PB. | Todos os chips | Obrigatório |

</div>

### 5.8.10. Armazenamento { #5810-storage }

<div align="center"><em>Tabela 5.8.10-1: Checklist de armazenamento</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) está conectado à Flash SPI NAND ou SD NAND; na Flash externa do SF32LB56xU, garanta que a tensão de alimentação da Flash corresponda a VDDIO3. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 2 | MPI3 (SD2) está conectado à Flash SPI NAND ou SD NAND, e o nível de E/S da Flash corresponde a VDDIOA2. | SF32LB565/567 | Obrigatório |
| 3 | O pino HOLD# da Flash SPI NAND tem pull-up para a alimentação da Flash SPI NAND por meio de um resistor de 10 kΩ. | Todos os chips | Obrigatório |
| 4 | MPI3 está conectado à Flash NOR (a memória externa do SS6700A deve ser NOR). | Todos os chips | Obrigatório |
| 5 | Se a produção precisar programar a FLASH por MPI3 (SD2), a alimentação da Flash externa está habilitada durante o download do programa. | Todos os chips | Obrigatório |
| 6 | A chave de alimentação controlada por PBR0 ou outro GPIO liga em nível alto e desliga em nível baixo. | Todos os chips | Obrigatório |
| 7 | Se a interface SD2 estiver conectada à SD NAND, as conexões de sinal estão corretas. | Todos os chips | Obrigatório |
| 8 | Recomendam-se resistores em série de 33 Ω nas linhas CLK e de dados da Flash. | Todos os chips | Opcional |
| 9 | O nível de E/S da SD NAND corresponde a VDDIO2. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 10 | As linhas CLK e de dados da Flash têm resistores em série de 33 Ω. | Todos os chips | Obrigatório |
| 11 | O nível lógico de E/S do periférico corresponde ao do chip principal. | Todos os chips | Obrigatório |
| 12 | A Flash NOR integrada ao encapsulamento do LCPU permanece sempre alimentada e, por padrão, PBR0 controla a alimentação da Flash externa.<br>(1) Se houver poucos GPIOs, PBR0 também pode controlar a alimentação da PSRAM integrada ao encapsulamento dos modelos 561/2/3/W (VDDIO1). Se a PSRAM armazenar dados que precisam ser mantidos durante o modo de suspensão, não desligue a PSRAM nem a Flash externa.<br>(2) Se houver GPIOs disponíveis, use PB22 para controlar a chave de alimentação da PSRAM. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 13 | <span class="flag-yellow">As alimentações VDDIOSA e VDDIOSB são controladas por PBR0, VDDIOSC permanece sempre alimentada e a alimentação da Flash externa é controlada por PA03.</span> | SF32LB565/567 | Obrigatório |
| 14 | A Flash NOR está qualificada no guia de seleção de componentes-chave. | Todos os chips | Obrigatório |
| 15 | A Flash SPI/SD NAND está qualificada no guia de seleção de componentes-chave. | Todos os chips | Obrigatório |

</div>

### 5.8.11. Display { #5811-display }

<div align="center"><em>Tabela 5.8.11-1: Checklist do display</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O SF32LB56xU ou o SS6700A está conectado a um painel QSPI. | Todos os chips | Obrigatório |
| 2 | O SF32LB56xU ou o SS6700A está conectado a um painel JDI serial. | Todos os chips | Obrigatório |
| 3 | As conexões de sinal QSPI do LCDC1 estão corretas; recomendam-se resistores série de 100 Ω nas linhas CLK e de dados. | Todos os chips | Obrigatório |
| 4 | As conexões de sinal JDI serial do LCDC1 estão corretas. | Todos os chips | Obrigatório |
| 5 | A conexão LCDC RSTB está correta. | Todos os chips | Obrigatório |
| 6 | A conexão LCDC TE está correta (conectada ao sinal TE ou Fmark do painel). | Todos os chips | Obrigatório |
| 7 | Os sinais TP seguem a atribuição de pinos recomendada (consulte o arquivo de configuração de E/S da EVB). | Todos os chips | Obrigatório |
| 8 | A interface LCD suporta modos como SPI de 3/4 fios, SPI com duas/quatro linhas de dados, JDI serial e modos semelhantes. | Todos os chips | Opcional |
| 9 | LCD SPI em modo de 3 fios: CS em PA36, CLK em PA37 e DATA em PA38; em modo de 4 fios: CS em PA36, CLK em PA37, DATA em PA38 e DC em PA39. | Todos os chips | Opcional |
| 10 | O nível lógico de E/S do periférico corresponde ao do chip principal. | Todos os chips | Obrigatório |
| 11 | Se o AOD do LCD for necessário, mantenha VDDIO3, que alimenta LCD_RST (PA05), sempre ligada. Não conecte VDDIO3 à alimentação da Flash externa: desligá-la durante a suspensão também pode cortar a alimentação de VDDIO3 e LCD_RST e causar anomalias no AOD. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 12 | Para LCDs DSI, conecte os sinais de dados e clock DSI. Painéis DSI em modo de vídeo funcionam como painéis RGB e não têm sinal TE; os painéis DSI em modo de comando têm TE, e o DSI17801 requer TE. Recomenda-se conectar TE e RST; o uso final depende do LCD selecionado. | SF32LB565/567 | Obrigatório |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>Tabela 5.8.12-1: Checklist do GPADC</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A entrada do GPADC está conectada ao pino correspondente. | Todos os chips | Opcional |
| 2 | A faixa de entrada do GPADC está correta; a tensão máxima de entrada não deve exceder AVDD33_AVA (3,3 V). | Todos os chips | Opcional |
| 3 | Divisor recomendado para medir a tensão da bateria: resistor de 470 kΩ com tolerância de 1% no lado da alimentação, resistor de 1 MΩ com tolerância de 1% para o terra e capacitor de filtro de 100 nF. | Todos os chips | Obrigatório |
| 4 | Para cada sinal medido pelo GPADC por meio de divisor resistivo, use resistores com tolerância de 1%; cada canal GPADC deve ter um capacitor de filtro de 100 nF próximo ao pino do chip. | Todos os chips | Obrigatório |
| 5 | O ADC pode detectar vários botões e economizar pinos; por exemplo, quando PB32 for usado como botão ADC, não use a bateria como alimentação do pull-up. | Todos os chips | Obrigatório |

</div>

### 5.8.13. Botões { #5813-buttons }

<div align="center"><em>Tabela 5.8.13-1: Checklist de botões</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Confirme com o cliente se o botão precisa permitir o despertar do sistema. | Todos os chips | Obrigatório |
| 2 | A conexão dos botões comuns está correta (há pull-up, o valor do resistor está correto e o domínio de tensão do pull-up é adequado). | Todos os chips | Obrigatório |
| 3 | O botão de alimentação deve usar PB32, ativo em nível alto, com reset após pressionamento longo de 10 s; o resistor pull-down de 10 kΩ deve ficar na placa principal. | Todos os chips | Obrigatório |
| 4 | Todos os sinais dos botões têm proteção contra ESD. | Todos os chips | Obrigatório |

</div>

### 5.8.14. Proteção EOS e ESD { #5814-eos-and-esd-protection }

<div align="center"><em>Tabela 5.8.14-1: Checklist de proteção EOS e ESD</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A interface de carga tem projeto de proteção contra EOS, ESD e OVP. | Todos os chips | Obrigatório |
| 2 | O sinal de detecção de conexão do carregador tem um dispositivo de proteção contra ESD. | Todos os chips | Obrigatório |
| 3 | A interface da bateria tem um dispositivo de proteção contra ESD. | Todos os chips | Obrigatório |
| 4 | A interface da antena tem um dispositivo de proteção contra ESD. | Todos os chips | Obrigatório |
| 5 | As interfaces de alimentação do LCD e do painel de toque (TP) têm dispositivos de proteção contra ESD. | Todos os chips | Obrigatório |
| 6 | As linhas I2C, RST e INT do TP têm dispositivos de proteção contra ESD. | Todos os chips | Obrigatório |
| 7 | A interface de alimentação e as linhas de sinal do sensor de frequência cardíaca têm dispositivos de proteção contra ESD. | Todos os chips | Obrigatório |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>Tabela 5.8.15-1: Checklist de I2C</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A atribuição do I2C considera a divisão entre HCPU/LCPU e se o dispositivo precisa operar em modo de baixo consumo. | Todos os chips | Obrigatório |
| 2 | O I2C tem pull-ups com o valor de resistência correto; para operar a 400 kHz, recomenda-se usar resistores de pull-up de 2,2 kΩ. Use o domínio de tensão do lado do periférico e desligue a alimentação dos resistores de pull-up junto com o periférico. | Todos os chips | Obrigatório |
| 3 | O sinal de interrupção do I2C permite despertar por hardware quando necessário. | Todos os chips | Obrigatório |
| 4 | Se vários dispositivos compartilharem um barramento I2C, seus endereços são distintos. | Todos os chips | Obrigatório |
| 5 | A linha da fonte SiFli sobre o PMIC SF30147C diz: “I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C”. A redação não esclarece a relação entre os sinais nem o que significa “normal”. Antes da liberação, confirme a atribuição de PB23, a alimentação do pull-up e o funcionamento de TWI DAT com o SF30147C, consultando o esquemático e a documentação oficiais. | SF32LB560/561/563/56W e SS6700A | Obrigatório |

</div>

### 5.8.16. Áudio analógico { #5816-analog-audio }

<div align="center"><em>Tabela 5.8.16-1: Checklist de áudio analógico</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão do microfone MEMS está correta. | Todos os chips | Obrigatório |
| 2 | O microfone MEMS é alimentado por MIC_BIAS. | Todos os chips | Obrigatório |
| 3 | A conexão do microfone ECM analógico com saída single-ended está correta. | Todos os chips | Obrigatório |
| 4 | O microfone ECM analógico com saída single-ended é alimentado por MIC_BIAS. | Todos os chips | Obrigatório |
| 5 | A conexão do microfone analógico ECM diferencial está correta. | Todos os chips | Obrigatório |
| 6 | O microfone analógico ECM diferencial é alimentado por MIC_BIAS. | Todos os chips | Obrigatório |
| 7 | Todas as entradas do ADC de áudio têm um capacitor de bloqueio CC de pelo menos 2,2 µF. | Todos os chips | Obrigatório |
| 8 | Cada saída do DAC de áudio (DACP e DACN) tem um resistor de 1 kΩ em série, próximo ao chip; entre DACP e DACN, há um capacitor de 1,5 nF em paralelo. | Todos os chips | Obrigatório |
| 9 | O AW8155 é o amplificador de áudio recomendado; ao usar esse componente, configure-o por software para Mode 4 / Class AB. | Todos os chips | Obrigatório |
| 10 | Ao realimentar a saída do PA de áudio para o ADC do MCU, adicione um divisor e filtro RC ou filtragem digital adicional; a tensão dividida deve permanecer dentro da faixa de entrada do ADC e a frequência de corte do filtro RC deve ser 20 kHz. | Todos os chips | Obrigatório |
| 11 | Se o caminho ADC analógico de áudio integrado ao chip não for usado, recomenda-se conectar ADCP e ADCN ao terra, cada um por meio de um resistor série de 0 Ω. | Todos os chips | Obrigatório |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>Tabela 5.8.17-1: Checklist de SPI</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão SPI está correta; SDO e SDI estão cruzados corretamente entre o MCU e o periférico. | Todos os chips | Opcional |
| 2 | Os requisitos de temporização do periférico SPI foram confirmados e são compatíveis. | Todos os chips | Opcional |
| 3 | O nível lógico de E/S do periférico corresponde ao do chip principal. | Todos os chips | Opcional |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>Tabela 5.8.18-1: Checklist de USART</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | USART4 é a interface de download/depuração do programa; reserve pontos de teste e adicione o resistor série recomendado de 100 Ω, ajustável conforme o projeto. | Todos os chips | Obrigatório |
| 2 | <span class="flag-yellow">No SF32LB56xU, PA17/PA18 são multiplexados como USART1 para testes de certificação RF; reserve pontos de teste.</span> | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 3 | <span class="flag-yellow">No SF32LB56xV, PA30/PA34 são multiplexados como USART1 para testes de certificação RF; reserve pontos de teste.</span> | SF32LB565/567 | Obrigatório |
| 4 | Na conexão a um periférico, RXD do lado do MCU conecta-se a TXD do periférico e TXD do lado do MCU conecta-se a RXD do periférico. | Todos os chips | Obrigatório |
| 5 | Quando PA17/PA18 forem multiplexados como UART para periféricos, durante o reset do MCU assegure que os periféricos conectados estejam desligados ou que o software mantenha os dois pinos em nível baixo. | Todos os chips | Obrigatório |
| 6 | O nível lógico de E/S do periférico corresponde ao do chip principal. | Todos os chips | Obrigatório |
| 7 | Reserve os pontos de teste das USARTs não utilizadas para uma eventual necessidade. | Todos os chips | Opcional |
| 8 | Recomenda-se conectar os periféricos UART à interface do HCPU, para evitar que o software do HCPU precise usar uma interface UART do LCPU. | Todas as variantes | Obrigatório |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>Tabela 5.8.19-1: Checklist de PWM</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A alocação do pino PWM da retroiluminação está correta; o controle da retroiluminação do LCD deve usar GPIOs PB com função PWM. | Todos os chips | Opcional |
| 2 | A alocação do pino PWM do motor está correta; o controle da vibração do motor deve usar GPIOs PB com função PWM. | Todos os chips | Opcional |
| 3 | Para o controle PWM do motor, selecione um GPIO desabilitado por padrão para evitar comportamento anormal durante a gravação do firmware quando for usado um motor SMT. | Todos os chips | Opcional |
| 4 | As demais saídas PWM, além das da retroiluminação e do motor, também devem usar pinos PB. Verifique seu comportamento na inicialização a frio. | Todos os chips | Opcional |

</div>

### 5.8.20. Depuração { #5820-debug }

<div align="center"><em>Tabela 5.8.20-1: Checklist de depuração</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Recomenda-se usar UART4_TXD/UART4_RXD para depuração; reserve pontos de teste e adicione o resistor série recomendado de 100 Ω. | Todos os chips | Obrigatório |
| 2 | As conexões dos sinais SWD estão corretas. | Todos os chips | Obrigatório |
| 3 | O conector J-Link ou os pontos de teste reservam corretamente a referência da alimentação de E/S. | Todos os chips | Obrigatório |
| 4 | Durante o download em produção, mantenha alimentados PVDD, VDDIO2 no SF32LB56xU ou VDDIOA no SF32LB56xV, VDDIO3 no SF32LB56xU ou VDDIOA2 no SF32LB56xV, e VDDIO4 no SF32LB56xU ou VDDIOB no SF32LB56xV. VDDIO1 nos modelos 561/563/56W ou VDDIOSB nos modelos 565/567 também deve estar alimentado. | Todos os chips | Obrigatório |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>Tabela 5.8.21-1: Checklist de USB</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão da interface USB está correta. | Todos os chips | Opcional |
| 2 | A interface USB tem proteção contra ESD. | Todos os chips | Opcional |
| 3 | Durante a operação normal, fora do modo de suspensão, o lado do PC/dispositivo consegue detectar conexão e remoção enquanto o USB permanece habilitado.<br>Se o MCU também precisar detectar conexão e remoção durante a suspensão, adicione um divisor resistivo em VBUS. A saída do divisor deve atingir um nível lógico alto compatível com a tensão de E/S e ser conectada a um pino de despertar do MCU. Recomenda-se compartilhar esse pino com a entrada de despertar usada para detectar a conexão do carregador. | Todos os chips | Opcional |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>Tabela 5.8.22-1: Checklist de PBR</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | PBR0 muda de 0 para 1 durante a inicialização e pode controlar algumas chaves de carga externas; PBR1-PBR2 têm saída baixa por padrão. | Todos os chips | Obrigatório |
| 2 | PBR0-PBRx podem ser usados como saídas nos modos Standby e Hibernate. | Todos os chips | Opcional |
| 3 | PBR0-PBRx podem emitir sinais LPTIM. | Todos os chips | Opcional |
| 4 | Para o modelo 567, recomenda-se usar LPTIM3: LPTIM3_OUT e LPTIM3_OUT_BAR emitem pelos pinos PBR sinais de 21–25 kHz, com ciclos de trabalho diferentes e polaridades opostas. | Todos os chips | Opcional |
| 5 | O ATIM do HCPU também pode emitir sinais de 21–25 kHz com ciclos de trabalho diferentes e polaridades opostas. Selecione os sinais ATIMx_CHx e ATIMx_CHxN adequados junto com Pin_Config e considere o efeito da redução da frequência do HCPU. | Todos os chips | Opcional |
| 6 | PBR1-PBRx podem emitir um sinal de clock de 32 kHz. | Todos os chips | Opcional |
| 7 | PBR0-PBRx podem ser configurados como entradas para sinais de despertar. | Todos os chips | Opcional |
| 8 | Quando PBR for usado como pino de despertar, o software deve consultá-lo após o despertar do MCU. Ele atende a níveis que mudam lentamente, como os de botões e detecção do carregador; pulsos rápidos, como interrupções de frequência cardíaca, devem usar um GPIO comum compatível com despertar, não PBR. | Todos os chips | Opcional |

</div>

### 5.8.23. Consumo de energia { #5823-power-consumption }

<div align="center"><em>Tabela 5.8.23-1: Checklist de consumo de energia</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Para todos os pinos de habilitação de MOSFET, LDO e DCDC usados na comutação da alimentação, reserve um pull-down de 1 MΩ para o terra quando a habilitação for ativa em nível alto; ajuste o valor se necessário para o projeto. | Todos os chips | Obrigatório |
| 2 | Alimente o PVDD do SF32LB56x com 1,8 V usando um conversor DCDC de baixa corrente quiescente e mantenha-o sempre ligado. | Todos os chips | Obrigatório |
| 3 | Para SF32LB56xU e SS6700, VDDIO1 requer controle por chave de carga. Use PBR0 como sinal de controle; se houver GPIOs disponíveis, PB22 pode controlar a alimentação. A ferramenta de download deve habilitar VDDIO1. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 4 | Para SF32LB56xU e SS6700, a alimentação da Flash externa requer uma chave de carga controlada por PBR0. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 5 | <span class="flag-yellow">Nos modos Hibernate-off ou Standby-off, VDDIOSA e VDDIOSB do SF32LB56xV requerem controle por chave de carga via PBR0; VDDIOSC deve permanecer sempre alimentada.</span> | SF32LB565/567 | Obrigatório |
| 6 | <span class="flag-yellow">A alimentação da Flash MPI3 do SF32LB56xV requer uma chave de carga controlada por PA03; habilite a alimentação da Flash MPI3 durante o download.</span> | SF32LB565/567 | Obrigatório |
| 7 | O requisito de corrente de base em Deep Sleep está registrado. A corrente em Deep Sleep é maior que em Standby, e esse modo é adequado para despertares frequentes, com intervalos inferiores a 200 ms. Todos os pinos PB permitem despertar, e a corrente de base é 90 µA. | Todos os chips | Obrigatório |
| 8 | A soma das correntes de base de todos os periféricos selecionados no modo Deep Sleep está registrada e atende aos requisitos do projeto. | Todos os chips | Obrigatório |
| 9 | O requisito de corrente de base em Standby está registrado. Esse modo é adequado para despertares menos frequentes, com intervalos superiores a 200 ms. Somente PA50, PA51, PB33 e PB34 permitem despertar, e a corrente de base é de 4–5 µA. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 10 | O requisito de corrente de base em Standby está registrado. Esse modo é adequado para despertares menos frequentes, com intervalos superiores a 200 ms. Somente PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35 e PB36 permitem despertar, e a corrente de base é de 4–5 µA. | SF32LB565/567 | Obrigatório |
| 11 | A corrente dos periféricos selecionados no modo Standby está registrada e atende aos requisitos do projeto. | Todos os chips | Obrigatório |

</div>

### 5.8.24. Download { #5824-download }

<div align="center"><em>Tabela 5.8.24-1: Checklist de download</em></div>

<div align="center" markdown>

| Nº | Verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | SF32LB56xU: reserve pontos de teste de download para VBAT, GND, VDDIO2, VDDIO3 ou VDDIO4, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD e um dos pinos PB20/PB21/PB25. | SF32LB560/561/563/56W e SS6700A | Obrigatório |
| 2 | SF32LB56xV: reserve pontos de teste de download para VBAT, GND, VDDIOA, VDDIOB, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD e um dos pinos PB20/PB21/PB25. | SF32LB565/567 | Obrigatório |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
