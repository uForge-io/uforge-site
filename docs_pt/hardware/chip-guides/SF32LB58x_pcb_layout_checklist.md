---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de verificação, item a item, do layout da PCB do MCU SF32LB58x, abrangendo encapsulamento, alimentação, clock, RF, áudio, sinais de alta velocidade e empilhamento."
tags:
    - Hardware
    - Chip
    - Lista de verificação
---

# Guia de projeto de hardware do SF32LB58x — Lista de verificação do layout da PCB { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte do guia de projeto de hardware do SF32LB58x"
    Esta página contém a lista de verificação, item a item, do layout da PCB da Seção 6.18. Volte às [Diretrizes de layout da PCB](SF32LB58x_pcb_layout.md).

## 6.18. Lista de verificação do layout da PCB { #618-pcb-layout-checklist }

Cada tabela abaixo cobre uma área de revisão do layout da PCB. Quando não houver uma coluna "Aplicável a", o item se aplica a todos os projetos de PCB SF32LB58x abrangidos por esta lista.

### 6.18.1. Encapsulamento { #6181-package }

<div align="center"><em>Tabela 6.18.1-1: Lista de verificação do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O footprint da PCB corresponde à especificação do encapsulamento | Obrigatório |

</div>

### 6.18.2. Alimentação { #6182-power-supply }

<div align="center"><em>Tabela 6.18.2-1: Lista de verificação da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A trilha de alimentação de VDD1 tem pelo menos 8 mil de largura | Obrigatório |
| 2 | A trilha de alimentação de VDD2 tem pelo menos 8 mil de largura | Obrigatório |
| 3 | As trilhas BUCK1_VSW e BUCK1_VOUT têm pelo menos 8 mil de largura | Obrigatório |
| 4 | As trilhas BUCK2_VSW e BUCK2_VOUT têm pelo menos 8 mil de largura | Obrigatório |
| 5 | A trilha de alimentação de VDDIOA tem pelo menos 10 mil de largura | Obrigatório |
| 6 | A trilha de alimentação de VDDIOA2 tem pelo menos 10 mil de largura | Obrigatório |
| 7 | A trilha de alimentação de VDDIOB tem pelo menos 10 mil de largura | Obrigatório |
| 8 | A trilha de alimentação de VDDIOSA tem pelo menos 6 mil de largura | Obrigatório |
| 9 | A trilha de alimentação de VDDIOSB tem pelo menos 6 mil de largura | Obrigatório |
| 10 | A trilha de alimentação de VDDIOSC tem pelo menos 6 mil de largura | Obrigatório |
| 11 | A trilha de alimentação de AVDD33_USB tem pelo menos 6 mil de largura | Obrigatório |
| 12 | A trilha de alimentação de AVDD33_ANA tem pelo menos 6 mil de largura | Obrigatório |
| 13 | A trilha de alimentação de AVDD_BRF tem largura ≥8 mil | Obrigatório |
| 14 | A trilha de alimentação de AVDD33_AUD tem pelo menos 6 mil de largura | Obrigatório |
| 15 | A trilha de alimentação de AVDD33_DSI tem pelo menos 8 mil de largura | Obrigatório |

</div>

### 6.18.3. Posicionamento dos capacitores e indutores da alimentação { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabela 6.18.3-1: Lista de verificação do posicionamento dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O capacitor de VDD1 está próximo ao pino | Obrigatório |
| 2 | O capacitor de VDD2 está próximo ao pino | Obrigatório |
| 3 | O indutor BUCK1 está próximo ao chip | Obrigatório |
| 4 | O capacitor de BUCK1 está o mais próximo possível do pino do chip | Obrigatório |
| 5 | O indutor BUCK2 está próximo ao chip | Obrigatório |
| 6 | O capacitor de BUCK2 está o mais próximo possível do pino do chip | Obrigatório |
| 7 | O capacitor de HPSYS_LDO_VOUT está próximo ao pino | Obrigatório |
| 8 | O capacitor de LPMU_VDD07_RET está próximo ao pino | Obrigatório |
| 9 | O capacitor de LPMU_VDD11_RTC está próximo ao pino | Obrigatório |
| 10 | O capacitor de VDDIOA está próximo ao pino | Obrigatório |
| 11 | O capacitor de VDDIOA2 está próximo ao pino | Obrigatório |
| 12 | O capacitor de VDDIOB está próximo ao pino | Obrigatório |
| 13 | O capacitor de VDDIOSA está próximo ao pino | Obrigatório |
| 14 | O capacitor de VDDIOSB está próximo ao pino | Obrigatório |
| 15 | O capacitor de VDDIOSC está próximo ao pino | Obrigatório |
| 16 | O capacitor de AVDD33_USB está próximo ao pino | Obrigatório |
| 17 | O capacitor de AVDD33_ANA está próximo ao pino | Obrigatório |
| 18 | O capacitor de AVDD_BRF está próximo ao pino | Obrigatório |
| 19 | O capacitor de AVDD33_AUD está próximo ao pino | Obrigatório |
| 20 | O capacitor de AVDD33_DSI está próximo ao pino | Obrigatório |

</div>

### 6.18.4. Clock { #6184-clock }

<div align="center"><em>Tabela 6.18.4-1: Lista de verificação do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O cristal está próximo ao chip | Obrigatório |
| 2 | Há uma blindagem de GND ao redor do cristal | Obrigatório |
| 3 | Mantenha a área sob o cristal sem cobre. Em uma PCB de 4 camadas, a área de exclusão deve abranger pelo menos as camadas 1 (superior), 2 e 3 | Obrigatório |
| 4 | A distância entre a trilha do cristal e a guarda de cobre ligada ao GND é maior que 3 vezes a largura da trilha | Obrigatório |

</div>

!!! warning "Confirme com a SiFli as camadas da zona de exclusão do cristal"
    A planilha especifica zonas sem cobre nas camadas 1, 2 e 3 de uma PCB de quatro camadas. O [guia de layout da PCB](SF32LB58x_pcb_layout.md#65-clock-interface-routing) especifica a camada de superfície e a camada adjacente abaixo da área de cada cristal. As fontes divergem quanto à inclusão da camada 3; não infira o requisito final sem confirmação da SiFli.

### 6.18.5. Botões { #6185-buttons }

<div align="center"><em>Tabela 6.18.5-1: Lista de verificação dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O dispositivo de proteção ESD do botão está próximo a ele | Obrigatório |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>Tabela 6.18.6-1: Lista de verificação de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A trilha RF atende ao requisito de impedância característica de 50 Ω em modo single-ended | Obrigatório |
| 2 | A largura da trilha RF é ≥10 mil | Obrigatório |
| 3 | Há espaço reservado para a rede π de casamento da antena, próxima ao chip | Obrigatório |
| 4 | Há um plano GND contínuo sob o sinal RF | Obrigatório |
| 5 | Não há trilhas de sinais digitais de alta velocidade sob o sinal RF | Obrigatório |
| 6 | Não há trilhas de alimentação com alto di/dt sob o sinal RF | Obrigatório |

</div>

### 6.18.7. Áudio { #6187-audio }

<div align="center"><em>Tabela 6.18.7-1: Lista de verificação de áudio</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | As trilhas paralelas AU_ADC1P e AU_ADC1N usam uma guarda de terra | Obrigatório |
| 2 | As trilhas paralelas AU_ADC2P e AU_ADC2N usam uma guarda de terra | Obrigatório |
| 3 | As trilhas paralelas AU_DAC1P e AU_DAC1N usam uma guarda de terra | Obrigatório |
| 4 | As trilhas paralelas AU_DAC2P e AU_DAC2N usam uma guarda de terra | Obrigatório |
| 5 | A capacitância das trilhas AU_DAC1P, AU_DAC1N, AU_DAC2P e AU_DAC2N é &lt; 10 pF; o comprimento é &lt; 2 cm | Obrigatório |

</div>

!!! warning "Limites de comprimento das trilhas DAC divergentes nas fontes"
    Esta planilha especifica comprimento inferior a 2 cm (20 mm), enquanto o [guia de layout da PCB](SF32LB58x_pcb_layout.md#67-audio-interface-routing) especifica comprimento inferior a 2 mm. Os limites diferem por um fator de dez. Não escolha um limite sem confirmação da SiFli.

### 6.18.8. Sinais de alta velocidade { #6188-high-speed-signals }

<div align="center"><em>Tabela 6.18.8-1: Lista de verificação dos sinais de alta velocidade</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Os sinais diferenciais DSI atendem ao requisito de impedância diferencial de 100 Ω | Obrigatório |
| 2 | Os pares diferenciais de dados DSI têm comprimento casado com o par diferencial de clock, com diferença máxima de 200 mil | Obrigatório |
| 3 | Sempre que possível, os sinais DSI são roteados na mesma camada | Obrigatório |

</div>

!!! warning "Limites de casamento entre pares DSI divergentes nas fontes"
    Esta planilha exige que cada par de dados DSI acompanhe o par de clock com diferença máxima de 200 mil (5,08 mm). O [guia de layout da PCB](SF32LB58x_pcb_layout.md#610-dsi-interface-routing) limita a diferença entre pares a 2 mm e, dentro de cada par, a 0,5 mm. As fontes divergem no limite entre pares; não escolha um limite sem confirmação da SiFli.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>Tabela 6.18.9-1: Lista de verificação do ADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Evite rotear sinais de comutação rápida em paralelo com o sinal GPADC; se isso não puder ser evitado, use uma guarda de terra adequada | Obrigatório |
| 2 | Os resistores do divisor de tensão da bateria estão próximos ao pino de entrada do chip | Obrigatório |
| 3 | Evite rotear sinais de comutação rápida em paralelo com o sinal SDMADC; se isso não puder ser evitado, use uma guarda de terra adequada | Opcional |

</div>

### 6.18.10. Pontos de teste { #61810-test-points }

<div align="center"><em>Tabela 6.18.10-1: Lista de verificação dos pontos de teste</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Os pontos de teste estão posicionados para permitir medições com sonda ou soldagem em um gabarito de teste | Obrigatório |
| 2 | Os pontos de teste para gravação do programa e calibração do cristal (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD etc.) atendem aos requisitos de tamanho e posicionamento do gabarito de teste | Obrigatório |

</div>

### 6.18.11. Empilhamento da PCB { #61811-pcb-stack-up }

<div align="center"><em>Tabela 6.18.11-1: Lista de verificação do empilhamento da PCB</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A camada adjacente ao chip principal deve ser um plano de terra principal contínuo | Obrigatório |

</div>
