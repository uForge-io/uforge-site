---
icon: lucide/list-checks
hide:
    - navigation
description: "Checklist item a item para revisar o layout de PCB do MCU SF32LB52x, com verificações de encapsulamento, roteamento, alimentação e aterramento."
tags:
    - Hardware
    - Chip
    - Checklist
---

# Guia de projeto de hardware SF32LB52x — checklist de layout da PCB { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte do guia de projeto de hardware do SF32LB52x"
    Esta página apresenta a Seção 6.15, com o checklist item a item do layout da PCB. Volte às [Orientações de layout de PCB](SF32LB52x_pcb_layout.md).

## 6.15. Checklist de layout da PCB { #615-pcb-layout-checklist }

O checklist de PCB original não tem uma coluna “Aplica-se a”. Aplique cada verificação apenas quando a variante e o circuito escolhidos incluírem o pino, a alimentação ou a função indicada; marque as funções ausentes como não aplicáveis. Preserve as categorias Obrigatório/Opcional da fonte, mas não interprete Opcional como autorização para omitir um componente exigido pela especificação do dispositivo.

!!! note "Tratamento do cobre sob o cristal na fonte"
    O item 3 de clock do checklist não especifica quais camadas devem ter uma área sem cobre. A nota de aplicação das variantes alimentadas por bateria se contradiz: a seção de clock pede remover o plano GND da L2 sob o cristal, enquanto a seção de roteamento de PCB proíbe vazios nos planos e recortes de cobre na camada superior e nas adjacentes, e mostra GND contínuo na L2. O guia separado de layout de PCB repete essa proibição. Confirme com a SiFli o tratamento do empilhamento escolhido antes de liberar o projeto; não o deduza apenas do texto do checklist.

!!! note "Verificação da largura das trilhas"
    A planilha especifica VCC ≥12 mil, trilhas BUCK ≥10 mil e RF ≥10 mil. A Seção 6 traz orientações mais restritivas para VCC e BUCK e recomenda RF >10 mil. Atenda aos dois conjuntos de requisitos aplicáveis, incluindo a impedância RF de 50 Ω; o mínimo do checklist não substitui as orientações detalhadas de layout.

### 6.15.1. Encapsulamento { #6151-package }

<div align="center"><em>Tabela 6.15.1-1: Checklist do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | O footprint corresponde à especificação do encapsulamento | Obrigatório |

</div>

### 6.15.2. Roteamento da alimentação { #6152-power-supply-routing }

<div align="center"><em>Tabela 6.15.2-1: Checklist de roteamento da alimentação</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | <span class="flag-red">Largura da trilha de alimentação VBUS ≥16 mil</span> | Obrigatório |
| 2 | <span class="flag-red">Largura da trilha de alimentação VBAT ≥16 mil</span> | Obrigatório |
| 3 | <span class="flag-red">Largura da trilha de alimentação VCC ≥12 mil</span> | Obrigatório |
| 4 | Largura da trilha de alimentação LDO2_OUT ≥10 mil | Obrigatório |
| 5 | Largura da trilha de alimentação LDO3_OUT ≥8 mil | Obrigatório |
| 6 | <span class="flag-red">Largura das trilhas PMU_BUCK_VSW e PMU_BUCK_VOUT ≥10 mil</span> | Obrigatório |
| 7 | Largura da trilha de alimentação AVDD_BRF ≥8 mil | Obrigatório |
| 8 | <span class="flag-red">Largura da trilha de alimentação AVDD33_AUD ≥8 mil</span> | Obrigatório |

</div>

### 6.15.3. Posicionamento dos capacitores e indutor da alimentação { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabela 6.15.3-1: Checklist de posicionamento dos capacitores e indutor da alimentação</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | Capacitor VBUS posicionado próximo ao pino | Obrigatório |
| 2 | Capacitor VBAT posicionado próximo ao pino | <span class="flag-red">Opcional</span> |
| 3 | Capacitor VCC posicionado próximo ao pino | Obrigatório |
| 4 | Capacitor LDO2_OUT posicionado próximo ao pino | <span class="flag-red">Opcional</span> |
| 5 | Capacitor LDO3_OUT posicionado próximo ao pino | <span class="flag-red">Opcional</span> |
| 6 | Capacitor VSYS posicionado próximo ao pino | Obrigatório |
| 7 | Indutor BUCK posicionado próximo ao chip | <span class="flag-red">Opcional</span> |
| 8 | Capacitor de desacoplamento BUCK posicionado o mais próximo possível do pino do chip | Obrigatório |
| 9 | Capacitor VDD_HPSYS posicionado próximo ao pino | Obrigatório |
| 10 | Capacitor VDD_LPSYS posicionado próximo ao pino | Obrigatório |
| 11 | Capacitor VDD_RET posicionado próximo ao pino | Obrigatório |
| 12 | Capacitor VDD_RTC posicionado próximo ao pino | Obrigatório |
| 13 | Capacitor AVDD_BRF posicionado próximo ao pino | Obrigatório |
| 14 | Capacitor AVDD<span class="flag-red">33</span>_AUD posicionado próximo ao pino | Obrigatório |

</div>

### 6.15.4. Clock { #6154-clock }

<div align="center"><em>Tabela 6.15.4-1: Checklist de clock</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | Cristal posicionado próximo ao chip | Obrigatório |
| 2 | Blindagem de GND ao redor do cristal | Obrigatório |
| 3 | Confirme com a SiFli o tratamento do cobre ao redor do cristal para o empilhamento escolhido; consulte a nota acima sobre divergência entre fontes | Obrigatório |
| 4 | A distância entre a borda de cada trilha do cristal e o cobre GND adjacente deve superar 1,5× a largura da trilha | Obrigatório |
| 5 | Espaçamento ≥0,15 mm entre as trilhas XI/XO paralelas do cristal de 32,768 kHz | Obrigatório |

</div>

### 6.15.5. Botões { #6155-buttons }

<div align="center"><em>Tabela 6.15.5-1: Checklist de botões</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | Dispositivo de proteção ESD do botão posicionado próximo ao botão | Obrigatório |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>Tabela 6.15.6-1: Checklist de RF</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | A trilha RF atende ao requisito de impedância característica de 50 Ω em configuração single-ended | Obrigatório |
| 2 | Largura da trilha RF ≥10 mil | Obrigatório |
| 3 | Pelo menos 60 mil de área de GND em cada lado da trilha RF, com vias de stitching suficientes até o plano principal de GND | Obrigatório |
| 4 | Rede de casamento de antena em π prevista no projeto e posicionada próxima ao lado do chip | Obrigatório |
| 5 | Plano de GND contínuo sob o sinal RF | Obrigatório |
| 6 | Nenhuma trilha de sinal digital de alta velocidade cruza sob o sinal RF | Obrigatório |
| 7 | Nenhuma trilha de alimentação com alto di/dt cruza sob o sinal RF | Obrigatório |

</div>

### 6.15.7. Áudio { #6157-audio }

<div align="center"><em>Tabela 6.15.7-1: Checklist de áudio</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | ADCP possui blindagem tridimensional de GND | Obrigatório |
| 2 | DACP/DACN são roteados como par diferencial com blindagem tridimensional de GND | Obrigatório |
| 3 | Trilhas DACP/DACN suficientemente curtas para manter a capacitância parasita abaixo de 10 pF | Obrigatório |
| 4 | Roteamento da alimentação AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD protegido por GND e afastado de sinais de alta corrente e forte interferência | Obrigatório |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>Tabela 6.15.8-1: Checklist de ADC</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | Nenhum sinal de alta velocidade corre em paralelo ao sinal GPADC sem proteção por GND | Obrigatório |

</div>

### 6.15.9. Pontos de teste { #6159-test-points }

<div align="center"><em>Tabela 6.15.9-1: Checklist de pontos de teste</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | A posição dos pontos de teste permite o contato da ponta de prova ou a soldagem em um gabarito de teste | Obrigatório |
| 2 | Os pontos de teste para download/programação (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34 etc.) atendem aos requisitos de tamanho e posicionamento do gabarito de teste | Obrigatório |

</div>

### 6.15.10. GND { #61510-ground }

<div align="center"><em>Tabela 6.15.10-1: Checklist de GND</em></div>

<div align="center" markdown>

| Nº | Item de verificação | Categoria |
|:---|:---|:---|
| 1 | As camadas adjacentes ao chip principal formam um plano de GND principal contínuo, com vias de aterramento suficientes | Obrigatório |
| 2 | O pad exposto (EPAD) está conectado ao GND principal por meio de vias | Obrigatório |
| 3 | A área sob o chip tem vias de aterramento suficientes conectadas ao plano principal de GND | Obrigatório |
| 4 | <span class="flag-red">Há um anel de vias de aterramento ao redor da borda da placa</span> | Obrigatório |

</div>
