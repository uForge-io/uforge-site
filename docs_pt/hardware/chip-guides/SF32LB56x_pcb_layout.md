---
icon: lucide/layers
description: "Diretrizes de layout de PCB para o MCU SF32LB56x: footprint, stack-up, roteamento crítico e checklist de revisão item a item."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56x — Diretrizes de layout da PCB { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte do guia de projeto de hardware SF32LB56x"
    Esta página cobre a Seção 6, dedicada ao layout da PCB. Volte às [diretrizes para o esquemático](SF32LB56x_schematic_design.md) ou continue para o [checklist de revisão do projeto e referências](SF32LB56x_review_and_reference.md).

## 6. Diretrizes de layout da PCB { #6-pcb-layout-guidelines }

### 6.1. Footprint e stack-up { #61-footprint-and-stack-up }

A variante U usa um encapsulamento QFN68L de 68 pinos, com 7 × 7 × 0,75 mm e passo de pinos de 0,35 mm. O QFN aceita PTH; a SiFli recomenda uma estrutura de quatro camadas com PTH e fan-out de todos os pinos na camada superior. A variante V usa um encapsulamento WBBGA de 175 esferas, com 6,5 × 6,1 × 0,94 mm, passo de 0,4 mm e esferas de 0,25 mm de diâmetro. Ela não aceita PTH e exige HDI. Faça o fan-out das duas fileiras externas de esferas na camada superior e das demais esferas nas camadas internas. Antes de liberar o layout, confirme que o fabricante da PCB aceita a estrutura de camadas, a máscara de solda e a estratégia de fan-out escolhidas.

### 6.2. Roteamento crítico { #62-critical-routing }

#### 6.2.1. Roteamento dos clocks { #621-clock-routing }

Coloque os cristais dentro da blindagem metálica, a mais de 1 mm da borda da placa e, de preferência, a pelo menos 5 mm de componentes que geram calor, como PA, carregador e PMU. Mantenha outros metais e componentes a pelo menos 0,25 mm do circuito do cristal. Quando possível, roteie o cristal de 48 MHz na camada superior; mantenha as trilhas com 3–10 mm de comprimento e 0,075 mm de largura, com blindagem tridimensional de GND. Afaste-as de VBAT, DC-DC e sinais de alta velocidade. Roteie o cristal de 32,768 kHz na camada superior, com comprimento máximo de 10 mm, largura de 0,075 mm e espaçamento mínimo de 0,15 mm entre 32K_XI e 32K_XO. Mantenha livres a camada superior e as camadas adjacentes sob as duas áreas de cristal; nenhuma outra trilha deve cruzá-las.

#### 6.2.2. Roteamento de RF { #622-rf-routing }

Roteie RF como uma trilha single-ended de 50 Ω com impedância controlada, de preferência com mais de 10 mil de largura e na camada superior; evite vias e cantos agudos. Posicione a rede de casamento perto do chip, não da antena. Coloque o capacitor de filtragem de AVDD_BRF perto do pino do chip e conecte seu GND diretamente ao GND principal por uma via. Faça blindagem contínua de GND e vias de stitching nos dois lados da trilha RF. Mantenha fora da área RF e de suas camadas inferiores as fontes de alimentação de alto di/dt, clocks de alta velocidade e sinais I2C, SPI, SDIO, I2S e UART. Conecte de modo confiável ao GND principal AVSS_RF1/2/3 na variante U e AVSS_RRF, AVSS_TRF, AVSS_TRF2 e AVSS_BB na variante V.

#### 6.2.3. Alimentação e GND { #623-power-and-ground }

Coloque o indutor BUCK e os capacitores de filtro perto dos pinos do chip. Mantenha BUCK_LX curta e larga; BUCK_FB deve ter pelo menos 0,25 mm de largura. Não crie uma região de cobre na camada superior sob o indutor; mantenha um plano de GND contínuo na camada adjacente e não passe outras trilhas pela área do indutor. Conecte os GND dos capacitores de saída BUCK ao plano principal com várias vias. Coloque o capacitor PVDD perto do pino e roteie PVDD de forma curta e larga; conecte PVSS ao GND principal por vias. Coloque os capacitores de desacoplamento de LDO e I/O perto dos pinos correspondentes e dimensione as trilhas de alimentação conforme a corrente da carga.

!!! warning "Limites divergentes para a largura da trilha PVDD"
    O guia de aplicação de hardware do SF32LB56xU/V especifica largura mínima de 0,5 mm para a trilha PVDD, enquanto o checklist de PCB correspondente especifica 8 mil. Como os valores divergem, confirme com a SiFli ou com o responsável pelo projeto da PCB qual requisito se aplica antes de congelar o layout.

#### 6.2.4. Áudio e sinais analógicos { #624-audio-and-analog-signals }

Alimente AVDD33_ANA e AVDD33_AUD por redes em estrela independentes, proteja as trilhas com GND e mantenha-as afastadas de fontes de ruído de alta corrente. Coloque os capacitores de filtragem de AVDD33_AUD, MIC_BIAS e AUD_VREF perto dos respectivos pinos e conecte seus GND diretamente ao GND principal. Roteie ADCP/ADCN como um par diferencial curto, protegido por GND, com os componentes associados perto do chip. Roteie DACP/DACN como par diferencial, com capacitância parasita abaixo de 10 pF e comprimento inferior a 2 cm, afastado de interferências fortes. Proteja as trilhas GPADC com GND e mantenha-as afastadas do ruído dos circuitos de medição da tensão da bateria e da temperatura.

#### 6.2.5. USB e SDIO { #625-usb-and-sdio }

Roteie USB D+/D− (PA17/PA18) como par diferencial de 90 Ω, protegido por GND. Coloque os dispositivos ESD perto do conector e faça os sinais passarem por eles antes de chegar ao chip; não faça derivações antes do dispositivo de proteção. Conecte o GND do dispositivo ao GND principal por trilhas curtas e largas e vias. A variante U tem uma interface SDIO; a variante V tem SDIO1 e SDIO2. Roteie os sinais SDIO em grupo, com comprimento total máximo de 50 mm e diferença de comprimento dentro do grupo de no máximo 6 mm. Faça blindagem de GND no clock e proteção de GND também nos sinais DATA e CMD.

#### 6.2.6. EMI, ESD e pontos de teste { #626-emi-esd-and-test-points }

Evite percursos longos na camada superficial, fora da blindagem, para sinais ruidosos de clock e alimentação; use camadas internas quando possível. Coloque dispositivos TVS/ESD perto do conector correspondente. Roteie cada sinal primeiro pelo dispositivo de proteção e conecte o pad de GND do dispositivo ao GND principal com trilhas curtas e largas e vias. Coloque o ponto de teste do cabo de carga USB antes da TVS; coloque a TVS do conector da bateria antes da plataforma da bateria, para que os cabos externos passem pela TVS antes de chegar ao chip. Conecte adequadamente a malha de GND sob o chip ao plano de GND principal usando vias cegas/enterradas.

### 6.3. Checklist do layout da PCB { #63-pcb-layout-checklist }

Cada tabela abaixo corresponde a uma área de revisão do layout da PCB. Quando não houver a coluna “Aplica-se a”, a linha vale para todas as variantes abrangidas pela planilha de origem.

#### 6.3.1. Encapsulamento { #631-package }

<div align="center"><em>Tabela 6.3-1: checklist do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O footprint corresponde à especificação do encapsulamento | Obrigatório |

</div>

#### 6.3.2. Alimentação { #632-power-supply }

<div align="center"><em>Tabela 6.3-2: checklist da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A trilha de alimentação PVDD tem largura mínima de 8 mil | Obrigatório |
| 2 | As trilhas BUCK_LX e BUCK_FB têm largura mínima de 8 mil | Obrigatório |
| 3 | A trilha de alimentação VDDIO1 tem largura mínima de 5 mil | Obrigatório |
| 4 | A trilha de alimentação VDDIO2 tem largura mínima de 8 mil | Obrigatório |
| 5 | A trilha de alimentação VDDIO3 tem largura mínima de 5 mil | Obrigatório |
| 6 | A trilha de alimentação VDDIO4 tem largura mínima de 6 mil | Obrigatório |
| 7 | A trilha de alimentação VDDIOSC tem largura mínima de 6 mil | Obrigatório |
| 8 | A trilha de alimentação AVDD33_ANA tem largura mínima de 6 mil | Obrigatório |
| 9 | A trilha de alimentação AVDD33_AUD tem largura mínima de 5 mil | Obrigatório |

</div>

#### 6.3.3. Posicionamento de capacitores e indutores da alimentação { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabela 6.3-3: checklist do posicionamento dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O capacitor de PVDD está posicionado perto do pino | Obrigatório |
| 2 | O indutor BUCK está posicionado perto do chip | Obrigatório |
| 3 | O capacitor de desacoplamento BUCK está posicionado o mais perto possível do pino do chip | Obrigatório |
| 4 | O capacitor de LDO1_VOUT está posicionado perto do pino | Obrigatório |
| 5 | O capacitor de LDO2_VOUT está posicionado perto do pino | Obrigatório |
| 6 | O capacitor de VDD_RET está posicionado perto do pino | Obrigatório |
| 7 | O capacitor de VDD_RTC está posicionado perto do pino | Obrigatório |
| 8 | O capacitor de VDDIO1 está posicionado perto do pino | Obrigatório |
| 9 | O capacitor de VDDIO2 está posicionado perto do pino | Obrigatório |
| 10 | O capacitor de VDDIO3 está posicionado perto do pino | Obrigatório |
| 11 | O capacitor de VDDIO4 está posicionado perto do pino | Obrigatório |
| 12 | O capacitor de AVDD33_ANA está posicionado perto do pino | Obrigatório |
| 13 | O capacitor de AVDD33_AUD está posicionado perto do pino | Obrigatório |

</div>

#### 6.3.4. Clock { #634-clock }

<div align="center"><em>Tabela 6.3-4: checklist do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O cristal está posicionado perto do chip | Obrigatório |
| 2 | A blindagem de GND está aplicada ao redor do cristal | Obrigatório |
| 3 | Há uma área sem cobre sob o cristal (placa PTH de 4 camadas: camada superior; placa HDI de 6 camadas: camada superior e camada 2) | Obrigatório |
| 4 | A distância entre o preenchimento de GND e as trilhas do cristal deve ser maior que 1,5× a largura da trilha | Obrigatório |
| 5 | No cristal de 32 kHz, o espaçamento entre as duas trilhas paralelas deve ser maior que 2× o espaçamento entre trilhas | Obrigatório |

</div>

#### 6.3.5. Botões { #635-buttons }

<div align="center"><em>Tabela 6.3-5: checklist dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O dispositivo de proteção ESD do botão está posicionado perto dele | Obrigatório |

</div>

#### 6.3.6. RF { #636-rf }

<div align="center"><em>Tabela 6.3-6: checklist de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A trilha de RF atende ao requisito de impedância característica de 50 Ω em linha não balanceada | Obrigatório |
| 2 | A trilha de RF tem largura ≥10 mil | Obrigatório |
| 3 | Há pelo menos 60 mil de GND de cada lado da trilha de RF, com vias de costura suficientes até o GND principal | Obrigatório |
| 4 | A rede de casamento de antena em pi está reservada e posicionada perto do lado do chip | Obrigatório |
| 5 | Há um plano GND contínuo sob o sinal de RF | Obrigatório |
| 6 | Não passe trilhas de sinais digitais de alta velocidade sob o sinal de RF | Obrigatório |
| 7 | Não passe trilhas de alimentação com alto di/dt sob o sinal de RF | Obrigatório |
| 8 | O aterramento de AVSS_RF1, AVSS_RF2 e AVSS_RF3 está reforçado, e esses pinos estão conectados ao plano GND principal | Obrigatório |

</div>

#### 6.3.7. Áudio { #637-audio }

<div align="center"><em>Tabela 6.3-7: checklist de áudio</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN são roteados como trilhas diferenciais com guarda de GND | Obrigatório |
| 2 | AU_DACP/AU_DACN são roteados como trilhas diferenciais com guarda de GND | Obrigatório |
| 3 | As trilhas AU_DACP/AU_DACN são curtas o suficiente para que a capacitância parasita fique abaixo de 10 pF | Obrigatório |
| 4 | As trilhas de alimentação AVDD33_ANA e AVDD33_AUD usam guarda de GND, ficam afastadas de sinais ruidosos de alta corrente, usam roteamento em estrela, e cada trilha tem pelo menos 5 mm de comprimento | Obrigatório |
| 5 | AVSS está conectado por vias ao plano GND principal | Obrigatório |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>Tabela 6.3-8: checklist do ADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Não passe sinais de alta velocidade em paralelo ao sinal GPADC sem guarda de GND | Obrigatório |
| 2 | Os resistores do divisor de tensão da bateria estão posicionados perto do pino de entrada do chip | Obrigatório |

</div>

#### 6.3.9. Pontos de teste { #639-test-points }

<div align="center"><em>Tabela 6.3-9: checklist dos pontos de teste</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | As posições dos pontos de teste permitem o uso de pontas de prova ou a soldagem em um gabarito de teste | Obrigatório |
| 2 | Os pontos de teste de download e calibração do cristal incluem VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD e um dos pinos PB20/PB21/PB25; incluem também VDDIO2 e VDDIO3 ou VDDIO4 para U, ou VDDIOA e VDDIOB para V, e atendem aos requisitos de tamanho e posicionamento do gabarito de teste | Obrigatório |

</div>

#### 6.3.10. GND { #6310-ground }

<div align="center"><em>Tabela 6.3-10: checklist do GND</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | As camadas adjacentes ao chip principal formam um plano GND contínuo e têm vias de aterramento suficientes | Obrigatório |
| 2 | PVSS está conectado por vias ao GND principal | Obrigatório |
| 3 | Instale vias de aterramento suficientes sob o chip e conecte-as ao plano GND principal | Obrigatório |
| 4 | Distribua vias de aterramento em anel ao longo da borda da placa | Obrigatório |

</div>
