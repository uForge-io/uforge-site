---
icon: lucide/layers
hide:
    - navigation
description: "Diretrizes de layout de PCB para o MCU SF32LB55x: footprint, stack-up, regras gerais, roteamento de interfaces e checklist detalhado de revisão."
tags:
    - Hardware
    - Microcontroladores
---

# Guia de projeto de hardware SF32LB55x — Diretrizes de layout da PCB { #sf32lb55x-hardware-design-guide-pcb-layout-guidelines }

## 6. Diretrizes de layout da PCB { #6-pcb-layout-guidelines }

### 6.1. Footprint e stack-up { #61-footprint-and-stack-up }

Consulte o desenho do encapsulamento, os requisitos do padrão de pads e a capacidade de montagem correspondentes ao QFN ou BGA selecionado. Em encapsulamentos BGA, confirme com antecedência o escape das esferas (fan-out), a estratégia de vias, as regras da máscara de solda e os limites de fabricação.

#### 6.1.1. Referência de stack-up e fabricação { #611-stack-up-and-fabrication }

A SiFli recomenda processo PTH convencional e placa de quatro camadas para QFN68L e BGA145. Para BGA169, a referência recomenda HDI de um estágio com vias cegas/enterradas. Os stack-ups ilustrados de quatro e seis camadas têm espessura final de 0,7 mm ±10%. São estruturas de referência, não limites universais; confirme o desenho do encapsulamento, a espessura final e a capacidade do processo com o fabricante da PCB.

<div align="center"><em>Tabela 6.1-1: Stack-up de referência PTH de quatro camadas</em></div>

<div align="center" markdown>

| Camada / material | Área de cobre presumida | Tipo de material | Dk | DF | Espessura teórica (mil) | Espessura teórica (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Máscara de solda superior | - | - | 3,5 | 0,8 | 1 | 0,0254 |
| Cobre + metalização L1 | - | Cobre + metalização | - | - | 0,048 | 0,001219 |
| Prepreg | 70% | 2116 | 4,2 | 0,015 | 4,2 | 0,10668 |
| Cobre L2 | - | Cobre | - | - | 0,07 | 0,001778 |
| Núcleo | 70% | Não especificado na figura-fonte | 4 | 0,017 | 16,1 | 0,408941 |
| Cobre L3 | - | Cobre | - | - | 0,07 | 0,001778 |
| Prepreg | 70% | 2116 | 4,2 | 0,015 | 4,2 | 0,10668 |
| Cobre + metalização L4 | - | Cobre + metalização | - | - | 0,048 | 0,001219 |
| Máscara de solda inferior | - | - | 3,5 | 0,8 | 1 | 0,0254 |
| Total teórico | - | - | - | - | 26,736 | 0,679096 |

</div>

A figura original especifica espessura final da placa de 0,7 mm ±10%, incluindo metalização e máscara de solda. Ela informa 0,048 mil (0,001219 mm) para a espessura de cobre + metalização de L1/L4 e 0,07 mil (0,001778 mm) para o cobre de L2/L3. Esses valores diferem bastante da notação usual de espessura de cobre para PCB. Foram transcritos como aparecem e não devem ser usados como especificações de fabricação; solicite confirmação por escrito à SiFli e ao fabricante da PCB.

<div align="center"><em>Tabela 6.1-2: Stack-up de referência HDI de seis camadas</em></div>

<div align="center" markdown>

| Camada / material | Área de cobre presumida | Tipo de material | Dk | DF | Espessura teórica (mil) | Espessura teórica (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Máscara de solda superior | - | - | 3,5 | 0,8 | 0,4 | 0,01016 |
| Cobre + metalização L1 | - | Cobre + metalização | - | - | 1,2 | 0,03048 |
| Prepreg | 70% | 1080 | 4,14 | 0,02 | 2,6 | 0,06604 |
| Cobre L2 | - | Cobre | - | - | 0,7 | 0,01778 |
| Prepreg | 70% | 2116 | 4,14 | 0,02 | 4,8 | 0,12192 |
| Cobre L3 | - | Cobre | - | - | 0,7 | 0,01778 |
| Núcleo | 70% | FR-4 CORE | 4,43 | 0,017 | 4 | 0,1016 |
| Cobre L4 | - | Cobre | - | - | 0,7 | 0,01778 |
| Prepreg | 70% | 2116 | 4,14 | 0,02 | 4,8 | 0,12192 |
| Cobre L5 | - | Cobre | - | - | 0,7 | 0,01778 |
| Prepreg | 70% | 1080 | 4,14 | 0,02 | 2,6 | 0,06604 |
| Cobre + metalização L6 | - | Cobre + metalização | - | - | 1,2 | 0,03048 |
| Máscara de solda inferior | - | - | 3,5 | 0,8 | 0,4 | 0,01016 |
| Total teórico | - | - | - | - | 24,8 | 0,629921 |

</div>

A figura original especifica espessura final de 0,7 mm ±10% para a placa HDI de seis camadas, incluindo metalização e máscara de solda. O stack-up, os parâmetros dielétricos e a espessura teórica são referências; peça ao fabricante que os verifique com base nos materiais, nas espessuras de cobre e nos requisitos de impedância reais.

#### 6.1.2. Dimensões do padrão de pads { #612-land-pattern-dimensions }

- BGA145/BGA169: bolas de 0,25 mm de diâmetro e passo de 0,5 mm; o padrão de referência indica abertura de máscara de solda de 0,33 mm e abertura de pasta de 0,25 mm.
- QFN68L: pads periféricos de 0,2 × 0,55 mm com passo de 0,35 mm; a referência indica abertura de máscara de 0,3 × 0,65 mm e abertura de pasta de 0,2 × 0,55 mm. O pad exposto tem dimensão nominal de 5,49 mm × 5,49 mm, com faixa de 5,39–5,59 mm.

Antes de liberar o footprint, confira o desenho do encapsulamento e as regras de estêncil e máscara de solda da montadora.

### 6.2. Regras gerais de PCB { #62-general-pcb-rules }

- Mantenha curtas e largas as malhas BUCK e faça a corrente de retorno passar perto da malha de comutação.
- Afaste as regiões de RF, cristal, GPADC e áudio das fontes chaveadas, dos clocks do display, dos motores e dos carregadores.
- Roteie as interfaces de memória de alta velocidade e do display sobre um plano de referência GND contínuo.
- Coloque a proteção ESD perto dos conectores e faça os sinais passarem primeiro pelo dispositivo de proteção.
- Preveja pontos de teste suficientes para alimentação, boot, depuração, RF e calibração de produção.

#### 6.2.1. Afastamentos de fabricação de referência { #621-fabrication-clearances }

Os valores a seguir foram transcritos dos diagramas de regras de referência PTH e HDI de seis camadas da SiFli. Eles não substituem as regras atuais do fabricante para o stack-up selecionado.

<div align="center"><em>Tabela 6.2-1: Afastamentos de referência PTH e HDI de seis camadas</em></div>

<div align="center" markdown>

| Regra / afastamento | PTH de quatro camadas (mm) | HDI de seis camadas (mm) |
|:---|---:|---:|
| Largura da trilha: mínima / recomendada | 0,10 / 0,10 | 0,075 / 0,075 |
| Largura da trilha: máxima | 2,54 | 2,54 |
| Trilha-trilha, trilha-via, via-via | 0,10 | 0,075 |
| Pad/SMD-trilha ou via | 0,10 | 0,075 |
| Pad-pad ou SMD-pad | 0,10 | 0,10 |
| Cobre-trilha, furo, pad ou SMD | 0,127 | 0,10 |
| Cobre-cobre | 0,15 | 0,15 |
| Borda da placa-trilha, furo, pad, SMD ou cobre | 0,25 | 0,20 |
| Furo-trilha ou via | 0,10 | 0,075 |
| Furo-pad, SMD ou cobre | 0,10 | 0,10 |
| Furo-furo; corpo de componente-corpo de componente | 0,10 | 0,10 |

</div>

Na matriz de afastamento entre elementos da mesma rede das figuras-fonte, apenas algumas células estão marcadas como 0 mm; as células em branco não estão especificadas. Não presuma que combinações não indicadas também permitem 0 mm. Confirme todas as regras com o fabricante antes de liberar o layout.

#### 6.2.2. Layout de alimentação e terra { #622-power-and-ground-layout }

- Posicione os indutores e capacitores DC-DC perto dos pinos. Mantenha BUCK_VSW curto e largo, reduza a área do laço, conecte o terra dos capacitores de saída ao plano por várias vias e use largura superior a 0,25 mm na trilha de feedback BUCK_VOUT. Não coloque cobre na camada externa nem trilhas sem relação sob o indutor; use um plano de terra contínuo na camada adjacente.
- Posicione os capacitores de PVDD_PMU1 (pino 67) perto do pino e use trilha com pelo menos 0,3 mm de largura. Coloque os capacitores LDO/IO perto dos pinos correspondentes; dimensione as trilhas conforme a corrente de carga e mantenha-as curtas e largas nos trechos em que o ripple ou a estabilidade sejam críticos.
- Conecte o pad exposto do QFN diretamente ao terra principal por várias vias, sobretudo perto das regiões de RF e PMU. Nos encapsulamentos BGA145 e BGA169, as bolas de terra RF são C12, C13, D12 e E13; conecte-as ao terra principal conforme o [mapa de bolas do BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-Ballmap.svg), os [mapas do BGA169 para o dispositivo 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg) e [para o dispositivo 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg). D2 e B3 são bolas de terra do PMU no BGA169; no BGA145, D2 é PA79 e B3 é BUCK2_VOUT. Não conecte bolas de terra distintas entre si usando cobre na camada externa.

**Esclarecimento com base na figura original:** O texto original repete E13 na lista das bolas de terra RF. Já a [figura de terra RF](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-RF-VSS-PCB.png) identifica AVSS_TRF em C13, AVSS_RRF em E13, AVSS_BB em C12 e AVSS_VCO em D12. As coordenadas acima seguem os rótulos da figura; confira-as no mapa de bolas do encapsulamento escolhido antes de rotear.

#### 6.2.3. EMI, ESD e proteção { #623-emi-esd-and-protection }

Quando possível, roteie clocks e trilhas de alimentação ruidosas nas camadas internas. Coloque os dispositivos ESD junto ao conector para que cada sinal passe pela proteção antes de entrar na placa, sem ramificações; use uma trilha de aterramento curta e larga, com via direta para o plano. Para carregamento USB, coloque o ponto de teste no lado do conector em relação ao TVS. Na entrada da bateria, coloque o TVS entre o conector e a carga da placa, de modo que o caminho até o chip passe primeiro pelo TVS, e mantenha curta sua conexão de terra.

### 6.3. Roteamento das interfaces { #63-interface-routing }

As trilhas de clock devem ser curtas, blindadas e afastadas de sinais digitais rápidos. Controle a impedância da trilha de RF em 50 Ω e mantenha compacta a rede de casamento. Controle o comprimento das trilhas de memória e do display conforme a velocidade e agrupe-as por barramento. Os sinais de áudio e GPADC devem ter blindagem e ficar afastados das correntes de comutação.

#### 6.3.1. Posicionamento e roteamento dos cristais { #631-crystal-placement-and-routing }

- Posicione cada cristal dentro da área blindada, a mais de 1 mm da borda da placa e a mais de 5 mm de fontes de calor como PA, carregador e PMU. Mantenha pelo menos 0,25 mm de afastamento ao redor do cristal.
- Roteie as trilhas do cristal de 48 MHz na camada superior, com 3–10 mm de comprimento e 0,1 mm de largura. Mantenha pelo menos 0,15 mm entre 48M_XI e 48M_XO, conforme o [modelo original de roteamento](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png), e faça blindagem de terra tridimensional. Afaste as trilhas de VBAT, DC-DC e sinais de alta velocidade. O texto original pede uma área sem cobre nas camadas superior e adjacente sob a região do cristal e proíbe a passagem de trilhas sem relação por essa região.
- Roteie as trilhas do cristal de 32,768 kHz na camada superior, com no máximo 10 mm de comprimento e 0,1 mm de largura. Mantenha pelo menos 0,15 mm entre XI e XO e faça blindagem de terra tridimensional. O texto original pede uma área sem cobre nas camadas superior e adjacente sob a região do cristal e proíbe a passagem de trilhas sem relação por essa região.

#### 6.3.2. RF e interfaces de alta velocidade { #632-rf-and-high-speed-interfaces }

Posicione a rede de casamento RF perto do chip, não da antena. Coloque o capacitor AVDD_BRF junto ao pino e conecte seu terra diretamente ao terra principal. Roteie RF na camada superior, sem mudança de camada, e controle a impedância em 50 Ω. O texto original recomenda largura superior a 10 mil, enquanto o checklist classifica ≥10 mil como obrigatório. Preserve a diferença entre recomendação e mínimo da lista e determine a largura final para obter 50 Ω no stack-up escolhido. Use blindagem de terra tridimensional e vias de costura nos dois lados; evite cantos agudos e mantenha DC-DC, VBAT, clocks e sinais I2C/SPI/SDIO/I2S/UART de alta velocidade longe da região RF.

Roteie MIPI_DSI como pares diferenciais de 100 Ω e ajuste o comprimento dos pares de dados em relação ao par de clock. Ajuste também os comprimentos dos barramentos OPI PSRAM e LCDC SPI/QSPI. Quando viável, proteja com terra as trilhas de clock e I2C e evite trechos longos em paralelo com sinais sem relação.

#### 6.3.3. Roteamento analógico { #633-analog-routing }

Faça blindagem de terra tridimensional nas trilhas GPADC e mantenha-as afastadas dos caminhos ruidosos de medição de tensão da bateria e temperatura. Confira a impedância do divisor e a corrente de fuga diante do tempo de acomodação necessário.

### 6.4. Checklist do layout da PCB { #64-pcb-layout-checklist }

Cada tabela abaixo corresponde a uma área de revisão do layout da PCB. Quando não houver a coluna “Aplica-se a”, a linha vale para todas as variantes abrangidas pela planilha.

#### 6.4.1. Encapsulamento { #641-package }

<div align="center"><em>Tabela 6.4-1: checklist do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O footprint corresponde à especificação do encapsulamento | Todas as variantes | Obrigatório |

</div>

#### 6.4.2. Alimentação { #642-power-supply }

<div align="center"><em>Tabela 6.4-2: checklist da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A trilha de alimentação VDD1 tem largura mínima de 8 mil | Todas as variantes | Obrigatório |
| 2 | A trilha de alimentação VDD2 tem largura mínima de 8 mil | Somente 555 | Obrigatório |
| 3 | As trilhas BUCK1_VSW e BUCK1_VOUT têm largura mínima de 8 mil | Todas as variantes | Obrigatório |
| 4 | As trilhas BUCK2_VSW e BUCK2_VOUT têm largura mínima de 8 mil | Somente 555 | Obrigatório |
| 5 | A trilha LDOVCC2_VOUT tem largura mínima de 8 mil | Somente 555 | Opcional |
| 6 | A trilha de alimentação AVDD_DSI tem largura mínima de 8 mil | Somente 555 | Obrigatório |
| 7 | A trilha de alimentação VDD_SIP tem largura mínima de 6 mil | Todas as variantes | Obrigatório |
| 8 | A trilha de alimentação VDDIOA tem largura mínima de 10 mil | Todas as variantes | Obrigatório |
| 9 | A trilha de alimentação VDDIOB tem largura mínima de 10 mil | Todas as variantes | Obrigatório |

</div>

#### 6.4.3. Posicionamento de capacitores e indutores da alimentação { #643-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabela 6.4-3: checklist do posicionamento dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O capacitor de VDD1 está posicionado perto do pino | Todas as variantes | Obrigatório |
| 2 | O capacitor de VDD2 está posicionado perto do pino | Somente 555 | Obrigatório |
| 3 | O indutor BUCK1 está posicionado perto do chip | Todas as variantes | Obrigatório |
| 4 | O capacitor de BUCK1 está posicionado o mais perto possível do pino do chip | Todas as variantes | Obrigatório |
| 5 | O indutor BUCK2 está posicionado perto do chip | Somente 555 | Obrigatório |
| 6 | O capacitor de 0,1 µF de AVDD_DSI está posicionado perto do pino | Somente 555 | Obrigatório |
| 7 | O capacitor de LDO_VOUT1 está posicionado perto do pino | Todas as variantes | Obrigatório |
| 8 | O capacitor de LDO_VOUT2 está posicionado perto do pino | Todas as variantes | Obrigatório |
| 9 | O capacitor de VDD_RET está posicionado perto do pino | Todas as variantes | Obrigatório |
| 10 | O capacitor de VDD_RTC está posicionado perto do pino | Todas as variantes | Obrigatório |
| 11 | O capacitor de VDD_SIP está posicionado perto do pino | Todas as variantes | Obrigatório |
| 12 | O capacitor de AVDD33 está posicionado perto do pino | Todas as variantes | Obrigatório |
| 13 | O capacitor de AVDD_BRF está posicionado perto do pino | Todas as variantes | Obrigatório |
| 14 | O capacitor de VDDIOA está posicionado perto do pino | Todas as variantes | Obrigatório |
| 15 | O capacitor de VDDIOB está posicionado perto do pino | Todas as variantes | Obrigatório |

</div>

#### 6.4.4. Clock { #644-clock }

<div align="center"><em>Tabela 6.4-4: checklist do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O cristal está posicionado perto do chip | Todas as variantes | Obrigatório |
| 2 | A blindagem de GND está aplicada ao redor do cristal | Todas as variantes | Obrigatório |
| 3 | O checklist pede uma área sem cobre sob o cristal: na camada superior de uma PCB de 4 camadas e também nas camadas 2 e 3 quando necessário | Todas as variantes | Obrigatório |
| 4 | O afastamento entre as trilhas do cristal e o cobre de proteção GND deve ser maior que 3× a largura da trilha | Todas as variantes | Obrigatório |
| 5 | Não roteie o sinal do cristal de 32 kHz em paralelo ao BUCK1; mantenha GND entre eles | Todas as variantes | Obrigatório |

</div>

**Esclarecimento sobre a fonte:** O texto original pede uma área sem cobre nas camadas superior e adjacente sob a região do cristal; o checklist cita a camada superior em uma PCB de 4 camadas e as camadas 2 e 3 quando necessário. No entanto, os [modelos originais de roteamento de 48 MHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) e de [32,768 kHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-32K-M-PCB.png) mostram um plano de terra L2 sob as trilhas XI/XO. A documentação da SiFli não esclarece se a área sem cobre se aplica apenas sob o encapsulamento do cristal ou também à área das trilhas, nem como os requisitos de camada se relacionam. Confirme com a SiFli a área sem cobre necessária antes de liberar o layout; não faça suposições.

#### 6.4.5. Botões { #645-buttons }

<div align="center"><em>Tabela 6.4-5: checklist dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O dispositivo de proteção ESD do botão está posicionado perto dele | Todas as variantes | Obrigatório |

</div>

#### 6.4.6. RF { #646-rf }

<div align="center"><em>Tabela 6.4-6: checklist de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A trilha de RF atende ao requisito de impedância característica de 50 Ω em linha não balanceada | Todas as variantes | Obrigatório |
| 2 | A trilha de RF tem largura ≥10 mil | Todas as variantes | Obrigatório |
| 3 | Reserve uma faixa de cobre GND com pelo menos 60 mil de largura em cada lado da trilha de RF e conecte essas áreas ao plano GND principal com vias de costura suficientes | Todas as variantes | Obrigatório |
| 4 | Reserve espaço para uma rede de casamento de antena em pi e posicione-a perto do chip | Todas as variantes | Obrigatório |
| 5 | Há um plano GND contínuo sob o sinal de RF | Todas as variantes | Obrigatório |
| 6 | Não passe trilhas de sinais digitais de alta velocidade sob o sinal de RF | Todas as variantes | Obrigatório |
| 7 | Não passe trilhas de alimentação com alto di/dt sob o sinal de RF | Todas as variantes | Obrigatório |

</div>

#### 6.4.7. Sinais de alta velocidade { #647-high-speed-signals }

<div align="center"><em>Tabela 6.4-7: checklist dos sinais de alta velocidade</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Os sinais diferenciais DSI atendem ao requisito de impedância diferencial de 100 Ω | Somente 555 | Obrigatório |
| 2 | O comprimento dos pares diferenciais de dados DSI é compatível com o par diferencial de clock, com diferença máxima de 200 mil | Somente 555 | Obrigatório |
| 3 | Os sinais DSI são roteados na mesma camada sempre que possível | Somente 555 | Obrigatório |
| 4 | A diferença de comprimento das trilhas de sinal da PSRAM OPI é controlada para não ultrapassar 200 mil | Somente 555 | Opcional |

</div>

#### 6.4.8. ADC { #648-adc }

<div align="center"><em>Tabela 6.4-8: checklist do ADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Não passe sinais de comutação rápida em paralelo ao sinal GPADC sem proteção adequada por GND | Todas as variantes | Obrigatório |
| 2 | Os resistores do divisor de tensão da bateria estão posicionados perto do pino de entrada do chip | Todas as variantes | Obrigatório |
| 3 | O sinal de medição da tensão da bateria deve sair do conector da bateria e ter proteção por trilha de guarda ligada ao terra | Todas as variantes | Obrigatório |
| 4 | Não passe sinais de comutação rápida em paralelo ao sinal SDMADC sem proteção adequada por GND | Somente 555 | Opcional |

</div>

#### 6.4.9. Pontos de teste { #649-test-points }

<div align="center"><em>Tabela 6.4-9: checklist dos pontos de teste</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | As posições dos pontos de teste são adequadas para o uso de ponta de prova ou para a soldagem de um gabarito de teste | Todas as variantes | Obrigatório |
| 2 | Os pontos de teste para gravação e calibração do cristal (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD etc.) devem ter diâmetro mínimo de 0,8 mm, ficar separados por 2 mm e manter ao redor uma área livre de componentes de 2 mm | Todas as variantes | Obrigatório |

</div>

#### 6.4.10. GND { #6410-ground }

<div align="center"><em>Tabela 6.4-10: checklist do GND</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | As camadas adjacentes ao chip principal formam um plano GND contínuo e têm vias de aterramento suficientes | Todas as variantes | Obrigatório |
| 2 | O pad exposto (EPAD) está conectado ao GND principal por meio de vias | Todas as variantes | Obrigatório |
| 3 | Instale vias de aterramento suficientes sob o chip e conecte-as ao plano GND principal | Todas as variantes | Obrigatório |
| 4 | Distribua vias de aterramento em anel ao longo da borda da placa | Todas as variantes | Obrigatório |

</div>
