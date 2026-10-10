---
icon: lucide/layers
hide:
    - navigation
description: "Diretrizes de layout da PCB do MCU SF32LB58x: footprint do encapsulamento, empilhamento de camadas, fanout e roteamento de clock, RF, áudio, USB, SDIO, DSI e alimentação."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB58x — Diretrizes de layout da PCB { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte do guia de projeto de hardware SF32LB58x"
    Esta página aborda a seção 6, Diretrizes de layout da PCB. Volte às [Diretrizes para o esquemático](SF32LB58x_schematic_design.md), siga para a [Lista de verificação do layout da PCB](SF32LB58x_pcb_layout_checklist.md) ou avance para a [Lista de verificação de revisão do projeto e referências](SF32LB58x_review_and_reference.md).

## 6. Diretrizes de layout da PCB { #6-pcb-layout-guidelines }

### 6.1. Projeto do footprint do encapsulamento { #61-package-footprint-design }

A série SF32LB58x usa um encapsulamento BGA256 de 8,5 mm × 6,5 mm × 0,94 mm, com passo das esferas de 0,4 mm e diâmetro nominal de esfera de 0,25 mm. Consulte a ficha técnica oficial para obter todos os dados de qualificação do encapsulamento.

!!! warning "Valores de altura do encapsulamento divergentes nas fontes"
    O texto do guia da SiFli informa uma altura de 0,94 mm. No desenho do encapsulamento BGA256, a dimensão A é de 0,91 mm nominal, com faixa de 0,84 a 1,04 mm. Os valores são conflitantes. Se a altura afetar a folga mecânica ou o encaixe no gabinete, não escolha um deles sem confirmação da SiFli; use a especificação do encapsulamento confirmada.

![Figura 6.1-1: Dimensões do encapsulamento BGA256](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-1: Dimensões do encapsulamento BGA256</em></div>

![Figura 6.1-2: Formato do footprint do encapsulamento](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-2: Formato do footprint do encapsulamento</em></div>

![Figura 6.1-3: Referência do padrão de pads da PCB](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-3: Referência do padrão de pads da PCB</em></div>

![Figura 6.1-4: Mapa das esferas do encapsulamento](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-4: Mapa das esferas do encapsulamento</em></div>

![Figura 6.1-5: Informações das esferas do substrato do encapsulamento](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.1-5: Informações das esferas do substrato do encapsulamento</em></div>

### 6.2. Empilhamento de camadas da PCB { #62-pcb-stack-up }

A série SF32LB58x permite montagem em uma ou nas duas faces. A PCB deve usar tecnologia HDI; placas PTH não são compatíveis. Recomenda-se o empilhamento 6HDI-2. A estrutura de referência da figura especifica espessura final da placa de 0,8 mm ±10% (cerca de 32 mil nominais).

![Figura 6.2-1: Estrutura de empilhamento de referência](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.2-1: Estrutura de empilhamento de referência</em></div>

### 6.3. Regras gerais de projeto da PCB { #63-general-pcb-design-rules }

Consulte na ficha técnica oficial a figura com as regras gerais de projeto da PCB (dimensões em mm). As regras de referência indicam largura mínima e recomendada de trilha de 0,075 mm e máxima de 2 mm; distância mínima de 0,075 mm entre trilhas, vias, pads, componentes SMD, texto e cobre; afastamento de 0,25 mm da borda da placa; e 0,1 mm entre furos e entre os corpos dos componentes. Confirme as regras finais com o fabricante da PCB.

![Figura 6.3-1: Regras gerais de projeto da PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-1: Regras gerais de projeto da PCB</em></div>

#### 6.3.1. Projeto de vias cegas { #631-blind-via-design }

Consulte na ficha técnica oficial as figuras de projeto das vias cegas entre as camadas 1–2 e 1–3 (dimensões em mm). As vias cegas metalizadas de referência têm 0,23 mm de diâmetro e furo de 0,10 mm.

![Figura 6.3-2: Projeto de via cega entre as camadas 1–2](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-2: Projeto de via cega entre as camadas 1–2</em></div>

![Figura 6.3-3: Projeto de via cega entre as camadas 1–3](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-3: Projeto de via cega entre as camadas 1–3</em></div>

#### 6.3.2. Projeto de vias enterradas { #632-buried-via-design }

Consulte na ficha técnica oficial a figura de projeto da via enterrada entre as camadas 2–5 (dimensões em mm). A via enterrada metalizada de referência tem 0,40 mm de diâmetro e furo de 0,20 mm.

![Figura 6.3-4: Projeto de via enterrada entre as camadas 2–5](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.3-4: Projeto de via enterrada entre as camadas 2–5</em></div>

### 6.4. Fanout das trilhas { #64-trace-fanout }

As duas primeiras fileiras de esferas do BGA são direcionadas pela camada superior; as demais são levadas às camadas internas por meio de vias.

![Figura 6.4-1: Referência de fanout na camada superior](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-1: Referência de fanout na camada superior</em></div>

![Figura 6.4-2: Referência de fanout nas camadas internas](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.4-2: Referência de fanout nas camadas internas</em></div>

### 6.5. Roteamento da interface de clock { #65-clock-interface-routing }

Posicione o cristal dentro da blindagem, a mais de 1 mm da borda da PCB e o mais longe possível de componentes que geram calor, como o PA, o circuito de carga e a PMU. O ideal é manter uma distância superior a 5 mm para não afetar o desvio de frequência do cristal. Mantenha a zona de exclusão do cristal a mais de 0,25 mm de outros metais ou componentes.

Roteie o cristal de 48 MHz na camada superior, com comprimento de 3 a 10 mm e largura de trilha de 0,075 mm, usando blindagem tridimensional completa. Mantenha-o afastado de VBAT, DC/DC e sinais de alta velocidade. Não passe outras trilhas pela camada superior nem pela camada adjacente sob a área do cristal de 48 MHz.

Roteie o cristal de 32,768 kHz na camada superior, com comprimento ≤10 mm e largura de trilha de 0,075 mm. Mantenha um espaçamento ≥0,15 mm entre as trilhas paralelas 32K_XI e 32K_XO e use blindagem tridimensional completa. Não passe outras trilhas pela camada superior nem pela camada adjacente sob a área do cristal.

!!! warning "Confirme com a SiFli as camadas da zona de exclusão do cristal"
    O guia de layout especifica a camada de superfície e a camada adjacente abaixo de cada área de cristal. A planilha de verificação especifica zonas sem cobre nas camadas 1, 2 e 3 de uma PCB de quatro camadas. As fontes divergem quanto à inclusão da camada 3. Não infira o requisito final para essa camada; confirme-o com a SiFli.

![Figura 6.5-1: Posicionamento do cristal](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-1: Posicionamento do cristal</em></div>

![Figura 6.5-2: Esquemático do cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-2: Esquemático do cristal de 48 MHz</em></div>

![Figura 6.5-3: Modelo de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-3: Modelo de roteamento do cristal de 48 MHz</em></div>

![Figura 6.5-4: Referência de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-4: Referência de roteamento do cristal de 48 MHz</em></div>

![Figura 6.5-5: Esquemático do cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-5: Esquemático do cristal de 32,768 kHz</em></div>

![Figura 6.5-6: Modelo de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-6: Modelo de roteamento do cristal de 32,768 kHz</em></div>

![Figura 6.5-7: Referência de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.5-7: Referência de roteamento do cristal de 32,768 kHz</em></div>

### 6.6. Roteamento da interface RF { #66-rf-interface-routing }

Posicione o circuito de casamento RF o mais perto possível do chip, e não junto à antena. Coloque o capacitor de desacoplamento da alimentação RF AVDD_BRF o mais perto possível do pino do chip, com as vias do terminal de terra caindo diretamente no plano de terra principal.

Sempre que possível, roteie as trilhas RF na camada superior para evitar vias que possam prejudicar o desempenho de RF. Recomenda-se largura superior a 10 mil, blindagem tridimensional completa e evitar ângulos agudos ou retos. Acrescente vias de terra para blindagem ao longo dos dois lados da trilha RF e controle sua impedância em 50 Ω. Mantenha DC-DC, VBAT e sinais digitais de alta velocidade — como os do cristal, dos clocks de alta frequência e das interfaces I2C/SPI/SDIO/I2S/UART — fora da área de roteamento RF. AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO e AVSS_BB são pinos de terra do circuito RF e devem ser aterrados corretamente; coloque vias cegas diretamente nos pads e conecte-as ao terra principal.

![Figura 6.6-1: Esquemático da rede π e do circuito de alimentação](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-1: Esquemático da rede π e do circuito de alimentação</em></div>

![Figura 6.6-2: Layout da PCB da rede π e do circuito de alimentação](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-2: Layout da PCB da rede π e do circuito de alimentação</em></div>

![Figura 6.6-3: Esquemático do circuito do sinal RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-3: Esquemático do circuito do sinal RF</em></div>

![Figura 6.6-4: Roteamento do sinal RF na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-4: Roteamento do sinal RF na PCB</em></div>

![Figura 6.6-5: Esquemático do terra do circuito RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-5: Esquemático do terra do circuito RF</em></div>

![Figura 6.6-6: Conexões de terra do circuito RF na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.6-6: Conexões de terra do circuito RF na PCB</em></div>

### 6.7. Roteamento da interface de áudio { #67-audio-interface-routing }

Posicione o capacitor de desacoplamento da alimentação de áudio AVDD33_AUD próximo ao respectivo pino e conecte bem seu terminal de terra ao terra principal. Faça o mesmo com o capacitor de desacoplamento da alimentação do microfone MIC_BIAS. Posicione também o capacitor de desacoplamento de AUD_VREF próximo ao respectivo pino.

AU_ADC1P/AU_ADC1N e AU_ADC2P/AU_ADC2N são os dois pares de entrada analógica. Posicione os componentes associados o mais perto possível dos pinos, roteie cada par P/N como um par diferencial com trilhas tão curtas quanto possível, aplique blindagem tridimensional e mantenha afastados outros sinais com forte interferência.

AU_DAC1P/AU_DAC1N e AU_DAC2P/AU_DAC2N são os dois pares de saída analógica. Posicione os componentes associados o mais perto possível dos pinos e roteie cada par P/N como um par diferencial tão curto quanto possível e com menos de 2 mm. A capacitância parasita das trilhas deve ser inferior a 10 pF, e a largura da trilha diferencial deve ser de 0,075 mm. Aplique blindagem tridimensional ao par e mantenha afastados outros sinais com forte interferência.

!!! warning "Limites de comprimento das trilhas DAC divergentes nas fontes"
    O guia de layout especifica comprimento inferior a 2 mm para as trilhas DAC, enquanto a planilha de verificação especifica comprimento inferior a 2 cm (20 mm). Os limites diferem por um fator de dez. Não escolha nem substitua um limite sem confirmação da SiFli.

![Figura 6.7-1: Esquemático da alimentação de áudio](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-1: Esquemático da alimentação de áudio</em></div>

![Figura 6.7-2: Filtro da alimentação de áudio no layout da PCB](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-2: Filtro da alimentação de áudio no layout da PCB</em></div>

![Figura 6.7-3: Esquemático da entrada de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-3: Esquemático da entrada de áudio analógico</em></div>

![Figura 6.7-4: Layout da PCB da entrada de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-4: Layout da PCB da entrada de áudio analógico</em></div>

![Figura 6.7-5: Esquemático da saída de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-5: Esquemático da saída de áudio analógico</em></div>

![Figura 6.7-6: Layout da PCB da saída de áudio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.7-6: Layout da PCB da saída de áudio analógico</em></div>

### 6.8. Roteamento da interface USB { #68-usb-interface-routing }

Posicione o capacitor de desacoplamento de AVDD33_USB e o resistor de calibração USB2_REXT perto de seus respectivos pinos. Antes de chegar ao chip, as trilhas USB devem passar pelos pinos do componente de proteção ESD; conecte o pino de terra desse componente ao terra principal. Roteie USB DP/DN como par diferencial com impedância diferencial controlada em 90 Ω e aplique blindagem tridimensional.

![Figura 6.8-1: Esquemático dos sinais USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-1: Esquemático dos sinais USB</em></div>

![Figura 6.8-2: Projeto das trilhas USB na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-2: Projeto das trilhas USB na PCB</em></div>

![Figura 6.8-3: Referência de posicionamento dos componentes USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-3: Referência de posicionamento dos componentes USB</em></div>

![Figura 6.8-4: Modelo de roteamento dos sinais USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.8-4: Modelo de roteamento dos sinais USB</em></div>

### 6.9. Roteamento da interface SDIO { #69-sdio-interface-routing }

O SF32LB58x oferece duas interfaces SDIO: SDIO1 e SDIO2. Roteie juntos todos os sinais de cada interface, sem separá-los. O comprimento total das trilhas deve ser ≤50 mm, e a diferença de comprimento entre sinais do mesmo grupo deve ser ≤6 mm. Aplique blindagem tridimensional ao clock SDIO e também blinde os sinais DATA e CMD.

![Figura 6.9-1: Circuito da interface SDIO1](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: Circuito da interface SDIO1</em></div>

![Figura 6.9-2: Modelo de roteamento da interface SDIO1 na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: Modelo de roteamento da interface SDIO1 na PCB</em></div>

### 6.10. Roteamento da interface DSI { #610-dsi-interface-routing }

Posicione o capacitor de desacoplamento de AVDD18_DSI e o resistor de calibração DSI_REXT perto de seus respectivos pinos. Roteie os sinais DSI como pares diferenciais com impedância diferencial controlada em 100 Ω e ajuste os comprimentos de clock e dados: a diferença dentro de cada par deve ser ≤0,5 mm e entre pares, ≤2 mm. Aplique blindagem tridimensional a cada par diferencial.

!!! warning "Limites de casamento entre pares DSI divergentes nas fontes"
    O guia de layout limita a diferença de comprimento entre pares a 2 mm e a diferença dentro de cada par a 0,5 mm. A planilha de verificação exige que cada par de dados acompanhe o par de clock com diferença máxima de 200 mil (5,08 mm). As fontes divergem no limite entre pares. Não escolha um limite sem confirmação da SiFli; mantenha explícitos os dois critérios durante a revisão.

![Figura 6.10-1: Circuito dos sinais DSI](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-1: Circuito dos sinais DSI</em></div>

![Figura 6.10-2: Roteamento dos sinais DSI na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.10-2: Roteamento dos sinais DSI na PCB</em></div>

### 6.11. Roteamento do circuito DC-DC { #611-dc-dc-circuit-routing }

Posicione o indutor de potência e os capacitores de desacoplamento do circuito DC-DC perto dos pinos do chip. Mantenha as trilhas BUCK_LX tão curtas e largas quanto possível para reduzir a indutância do circuito. Adicione vias de terra aos terminais de terra de todos os capacitores de saída DC-DC e conecte-as ao plano de terra principal. A trilha de realimentação BUCK_FB deve ter largura superior a 0,25 mm. Não aplique cobre na camada superior sob o indutor; mantenha a camada adjacente como plano de referência de terra contínuo e não passe outras trilhas pela área do indutor.

![Figura 6.11-1: Circuito dos principais componentes DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.11-1: Circuito dos principais componentes DC-DC</em></div>

![Figura 6.11-2: Layout da PCB dos principais componentes DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.11-2: Layout da PCB dos principais componentes DC-DC</em></div>

### 6.12. Roteamento da alimentação { #612-power-supply-routing }

PVDD1 e PVDD2 são entradas de alimentação do módulo PMU integrado. Posicione os capacitores de desacoplamento perto dos pinos e use trilhas tão largas quanto possível, nunca inferiores a 0,5 mm. PVSS1 e PVSS2 são pinos de terra do módulo PMU e devem ser conectados ao terra principal por vias. Não os deixe desconectados, pois isso prejudica o desempenho geral da PMU.

![Figura 6.12-1: Diagrama do circuito DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.12-1: Diagrama do circuito DC-DC</em></div>

![Figura 6.12-2: Roteamento do circuito DC-DC na PCB](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.12-2: Roteamento do circuito DC-DC na PCB</em></div>

### 6.13. Roteamento das entradas de alimentação de LDO e I/O { #613-ldo-and-io-power-input-routing }

Posicione os capacitores de desacoplamento de todas as saídas LDO e entradas de alimentação de I/O perto dos respectivos pinos. A largura das trilhas deve atender à corrente de entrada exigida; mantenha-as tão curtas e largas quanto possível para reduzir a ondulação da alimentação e melhorar a estabilidade do sistema.

![Figura 6.13-1: Referência de roteamento das entradas de alimentação LDO e I/O](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.13-1: Referência de roteamento das entradas de alimentação LDO e I/O</em></div>

### 6.14. Roteamento de outras interfaces { #614-other-interface-routing }

As redes de sinal dos pinos GPADC exigem blindagem tridimensional completa e devem ficar afastadas de outras fontes de interferência, como os circuitos de medição do nível da bateria e da temperatura.

![Figura 6.14-1: Circuito GPADC](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-1: Circuito GPADC</em></div>

As redes de sinal dos pinos de entrada e saída de clock, como a saída de 32 kHz, também exigem blindagem tridimensional completa e devem ficar afastadas de outras fontes de interferência.

![Figura 6.14-2: Circuito da saída de clock de 32 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.14-2: Circuito da saída de clock de 32 kHz</em></div>

### 6.15. Roteamento de terra sob o chip { #615-chip-ground-routing }

A rede de terra sob a região central do SF32LB58x deve ser interligada por trilhas para formar um plano de terra adequado, conectado ao plano principal por vias cegas ou enterradas.

![Figura 6.15-1: Plano de terra na camada superior sob o chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-1: Plano de terra na camada superior sob o chip</em></div>

![Figura 6.15-2: Plano de terra na segunda camada sob o chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-2: Plano de terra na segunda camada sob o chip</em></div>

![Figura 6.15-3: Plano de terra na terceira camada sob o chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-3: Plano de terra na terceira camada sob o chip</em></div>

![Figura 6.15-4: Plano de terra na quarta camada sob o chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.15-4: Plano de terra na quarta camada sob o chip</em></div>

### 6.16. EMI e ESD { #616-emi-esd }

Fora da blindagem, evite trilhas longas na camada superior. Sinais de clock, alimentação e outros que possam gerar interferência devem ser roteados em camadas internas, não na camada superior. Posicione os dispositivos de proteção ESD perto dos pinos do conector e faça os sinais passarem primeiro por eles, sem derivações antes da proteção. Conecte os pinos de terra dos dispositivos ESD ao terra principal por vias e mantenha curtas e largas as trilhas dos pads de terra para reduzir a impedância e melhorar a proteção ESD.

### 6.17. Outras considerações { #617-other-considerations }

Posicione os pontos de teste da linha de carregamento USB antes do diodo TVS. Na linha do suporte da bateria, posicione o TVS antes da conexão à plataforma e roteie o sinal para que passe pelo TVS antes de chegar ao chip. Mantenha tão curtas quanto possível as trilhas dos pinos de terra do TVS.

!!! note "A fonte não define o ponto de referência para posicionar o TVS"
    A fonte chinesa orienta instalar o TVS do conector da bateria “antes da plataforma” (平台), mas não identifica o nó ou ponto de conexão correspondente. Confirme esse ponto de referência com a SiFli em vez de inferi-lo. A fonte também exige que o caminho passe pelo TVS antes de chegar ao chip e que a trilha de terra do TVS seja curta.

![Figura 6.17-1: Referência de posicionamento do TVS de alimentação](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-1: Referência de posicionamento do TVS de alimentação</em></div>

![Figura 6.17-2: Referência de roteamento do TVS](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-2: Referência de roteamento do TVS</em></div>

Para evitar que a máscara de solda cubra os pads e preservar a confiabilidade das juntas, posicione as vias dos pads BGA no centro das esferas, sem deslocamento. Para melhorar o rendimento de fabricação, consulte as figuras de referência das conexões das esferas BGA.

![Figura 6.17-3: Referência de posicionamento de vias em BGA](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-3: Referência de posicionamento de vias em BGA</em></div>

![Figura 6.17-4: Referência de conexão das esferas BGA 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-4: Referência de conexão das esferas BGA 1</em></div>

![Figura 6.17-5: Referência de conexão das esferas BGA 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.17-5: Referência de conexão das esferas BGA 2</em></div>
