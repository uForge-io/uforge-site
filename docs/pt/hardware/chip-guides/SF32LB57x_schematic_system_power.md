---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de esquemático do SF32LB57x para sistema mínimo e alimentação: família de alimentação, straps de boot, árvore de energia, carga/OVP, BUCK e trilhos de baixo consumo."
tags:
    - Hardware
    - Chip
---

# Guia de Projeto de Hardware do SF32LB57x — Sistema Mínimo e Alimentação { #sf32lb57x-hardware-design-guide-minimum-system-power }

!!! note "Parte do Guia de Projeto de Hardware do SF32LB57x"
    As diretrizes de projeto do esquemático estão distribuídas em três páginas: esta página (Seções 5.1–5.2: Projeto do Sistema Mínimo e Sistema de Alimentação), [Clock, RF e Interfaces de Usuário](SF32LB57x_schematic_clock_rf_interfaces.md) (Seções 5.3–5.5) e [Armazenamento e Fabricação](SF32LB57x_schematic_storage_mfg.md) (Seções 5.6–5.7). Consulte primeiro a [visão geral do Guia de Projeto de Hardware do SF32LB57x](SF32LB57x_hardware_design_guide.md) para selecionar o dispositivo e conhecer o fluxo completo de projeto.

## 5. Diretrizes de projeto do esquemático { #5-schematic-design-guidelines }

Este capítulo segue a sequência habitual de bring-up da placa. Conclua primeiro o projeto do sistema mínimo; caso contrário, a primeira placa pode não ligar, inicializar pelo dispositivo de armazenamento, permitir o download do firmware ou entrar em modo de depuração. Depois de validar essa base, revise o sistema de alimentação, a geração de clock, o caminho de RF, o display, o áudio, a câmera, os sensores e as demais funções específicas do produto.

<div align="center"><em>Tabela 5-1: Visão geral das seções de projeto do esquemático</em></div>

<div align="center" markdown>

| Grupo | Principais decisões | Evidências para liberação |
|:---|:---|:---|
| Projeto do Sistema Mínimo | Compatibilidade entre encapsulamento e família de alimentação, pinos de bootstrap, mídia de boot e acesso para depuração/download | Esquemático do sistema mínimo correspondente, tabela de boot e pontos de teste para depuração |
| Sistema de Alimentação | Família de alimentação, árvore de alimentação, carregamento/OVP, BUCK, trilhos de baixo consumo, modos de operação e comportamento de despertar | Plano dos trilhos, revisão de OVP/carregamento, medições dos trilhos e plano de corrente de baixo consumo |
| Geração de Clock | Cristal principal de 48 MHz, cristal RTC de 32,768 kHz e premissas de calibração | Verificação das especificações dos cristais, plano de posicionamento e plano de calibração |
| RF | Casamento de impedância de RF e caminho da antena | Plano de impedância de RF e evidências de casamento e layout |
| Interfaces de Usuário | Display, toque/retroiluminação, áudio, câmera, botões e motor | Esquemáticos das interfaces, sequência de alimentação, atribuição de pinos e plano de validação |
| Armazenamento e Conectividade | Armazenamento, boot, GPIO, UART/I2C/SPI/SDIO/USB/CAN/GPADC | Tabela de boot, plano de alimentação do armazenamento, alocação de barramentos e evidências de roteamento de alta velocidade |
| Fabricação | Gravação em produção, calibração, acesso ao gabarito de teste e verificações de confiabilidade | Desenho dos pontos de teste e plano do gabarito e de gravação |

</div>

### 5.1. Projeto do sistema mínimo { #51-minimum-system-design }

#### 5.1.1. Sequência de projeto do sistema mínimo { #511-minimum-system-design-sequence }

Falhas durante o bring-up geralmente estão relacionadas ao sistema mínimo, à família de alimentação, ao modo de boot, aos pull-ups do armazenamento, à seleção dos cristais, aos componentes do BUCK ou à falta de acesso para download. Defina estes itens antes de atribuir os periféricos do produto:

1. Compatibilize o esquemático do sistema mínimo com o encapsulamento e a família de alimentação.
2. Defina o comportamento de boot e depuração de `PA00` / `PA01` e reserve o acesso de recuperação.
3. Selecione a mídia de boot e aplique os pull-ups necessários em `PA13` / `PA15` / `PA17`.
4. Defina a estrutura da árvore de alimentação, o caminho do carregador/OVP, o indutor e os capacitores do BUCK e os estados padrão dos trilhos; depois conclua a revisão detalhada da Seção 5.2.
5. Selecione os cristais de 48 MHz e 32,768 kHz e confirme o plano de calibração na Seção 5.3.
6. Reserve pontos de teste para DBG-UART, SWD, modo de boot, alimentação, GND e gabarito de teste.

#### 5.1.2. Esquemáticos do sistema mínimo { #512-minimum-system-schematics }

O SF32LB57x possui diferentes variantes de esquemático do sistema mínimo. Use a que corresponda ao encapsulamento e à família de alimentação; não misture variantes alimentadas por bateria com variantes de alimentação de 3,3 V.

![Figura 5.1-1: Sistema mínimo QFN68L alimentado por bateria](../../sf32-products/chips/assets/57x/SF32LB57-UH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Sistema mínimo QFN68L alimentado por bateria</em></div>

![Figura 5.1-2: Sistema mínimo QFN68L com alimentação de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-UL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Sistema mínimo QFN68L com alimentação de 3,3 V</em></div>

![Figura 5.1-3: Sistema mínimo QFN80L alimentado por bateria](../../sf32-products/chips/assets/57x/SF32LB57-YH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Sistema mínimo QFN80L alimentado por bateria</em></div>

![Figura 5.1-4: Sistema mínimo QFN80L com alimentação de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-YL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Sistema mínimo QFN80L com alimentação de 3,3 V</em></div>

<!-- BGA-ONLY -->
![Figura 5.1-5: Sistema mínimo BGA112 alimentado por bateria](../../sf32-products/chips/assets/57x/SF32LB57-VH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Sistema mínimo BGA112 alimentado por bateria</em></div>

![Figura 5.1-6: Sistema mínimo BGA112 com alimentação de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-VL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-6: Sistema mínimo BGA112 com alimentação de 3,3 V</em></div>
<!-- /BGA-ONLY -->

#### 5.1.3. Configuração de boot, armazenamento e pinos de bootstrap { #513-boot-storage-and-strap-configuration }

Selecione a mídia de boot antes de congelar o esquemático. A memória integrada ao encapsulamento pode já ocupar um canal MPI, e cada mídia externa tem requisitos próprios de pull-up e controle de alimentação.

<div align="center"><em>Tabela 5.1-1: Seleção da mídia de boot externa</em></div>

<div align="center" markdown>

| `Bootstrap[1]` (`PA13`) | `Bootstrap[0]` (`PA17`) | Mídia de boot externa |
|:------------------------|:------------------------|:--------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

<div align="center"><em>Tabela 5.1-2: Requisitos de pull-up da mídia de boot externa</em></div>

<div align="center" markdown>

| Mídia de boot | Requisito de pull-up |
|:-----------|:--------------------|
| SPI NOR Flash | Não é necessário pull-up externo em `PA13` / `PA17`. |
| SPI NAND Flash | `PA17` requer pull-up de 7,5 kΩ; `PA13` não requer pull-up. |
| SD NAND Flash | `PA13` e `PA15` requerem pull-ups de 7,5 kΩ; `PA17` não requer pull-up. |
| eMMC | `PA13`, `PA15` e `PA17` requerem pull-ups de 7,5 kΩ. |

</div>

![Figura 5.1-7: Circuito recomendado para os pinos de bootstrap](../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-7: Circuito recomendado para os pinos de bootstrap</em></div>

Projete a alimentação da mídia de boot conforme o tipo de mídia e a família de alimentação. Nas variantes alimentadas por bateria, a Flash NOR externa é alimentada por `VDD33_VOUT1`; a Flash SPI NAND externa requer uma chave de carga depois de `VDD33_VOUT1`; e a Flash SD NAND externa e a eMMC usam um LDO externo. Nas variantes de 3,3 V, use um LDO externo para alimentar todas as mídias de boot externas. A SiFli recomenda `PA21` como habilitação da chave da mídia externa: nível alto liga o trilho e nível baixo o desliga. Se uma variante alimentada por bateria não expuser `PA21`, o guia original permite usar, em seu lugar, um GPIO com pull-up padrão. Garanta que o trilho da mídia esteja disponível durante o boot. Se o armazenamento integrado ao encapsulamento já ocupar MPI3, o uso externo de MPI3 fica limitado a SD NAND ou eMMC; não conecte Flash SPI NOR/SPI NAND externas a esse canal.

#### 5.1.4. Acesso para depuração e download { #514-debug-and-download-access }

Reserve o acesso para depuração e recuperação antes de atribuir os pinos de E/S do produto. Falhas na primeira placa ficam muito mais difíceis de resolver quando o DBG-UART padrão, os pinos de bootstrap ou o caminho SWD não estão acessíveis.

<div align="center"><em>Tabela 5.1-3: Pontos de teste recomendados para depuração e download</em></div>

<div align="center" markdown>

| Ponto de teste | Recomendação | Finalidade |
|:-----------|:---------------|:--------|
| Entrada de alimentação | `VBAT` ou 3,3 V; reserve também `VSYS` / `VDD33_VOUT1` quando necessário | Alimentação pelo gabarito, medição de corrente e validação de baixo consumo. |
| GND | Vários pontos de teste de terra | Retorno para download, depuração, calibração e medição de corrente. |
| DBG-UART | `PA18` / `PA19`, correspondentes a `DBG_UART_RXD` / `DBG_UART_TXD` | Download padrão, logs e gravação em produção. |
| SWD | `PA43` / `PA44` ou os pinos SWDIO/SWCLK definidos pelo número da peça | Depuração e análise de falhas. |
| Modo de boot | `PA00` ou o pino de seleção de boot definido pelo número da peça | Entrar no modo de download ou recuperação. |
| Chave SWD | `PA01` ou o pino de configuração correspondente | Usada quando é necessário alternar a posição dos pinos SWD. |
| Botão de energia / despertar | `PA34` ou o pino correspondente | Teste de acionamento, reset ou despertar usando o gabarito. |

</div>

<div align="center"><em>Tabela 5.1-4: Conexões padrão da interface de depuração</em></div>

<div align="center" markdown>

| Sinal de depuração | Pino | Nome da rede |
|:-------------|:----|:---------|
| `DBG_UART_RXD` | `PA18` | `USART1_RXD` |
| `DBG_UART_TXD` | `PA19` | `USART1_TXD` |
| `SWD_CLK` | `PA43` | `SWCLK` |
| `SWD_DIO` | `PA44` | `SWDIO` |

</div>

!!! warning
    Os pontos de teste de produção devem incluir `DBG_UART_RXD` e `DBG_UART_TXD`. Evite reservar o sinal RXD duas vezes.

`PA18`/`PA19` são os pinos DBG-UART padrão e `PA43`/`PA44` são os pinos SWD padrão; o SWD também pode ser transferido para `PA18`/`PA19`. O chip oferece quatro interfaces de download: DBG-UART, SWD, UART padrão e USB. A inicialização normal oferece apenas DBG-UART e SWD; o modo BOOT pode habilitar as quatro. O modo BOOT e a troca dos pinos SWD dependem de `PA00`, do registrador BOOT, de `PA01` e da chave BOOT do host. Ao projetar a programação de produção e a recuperação, consulte a tabela completa de modos da fonte; não deduza a interface de download com base em um único estado de pino.

### 5.2. Sistema de alimentação { #52-power-system }

#### 5.2.1. Planejamento da árvore de alimentação { #521-power-tree-planning }

Desenhe a árvore de alimentação antes de iniciar o esquemático e identifique, em cada trilho, a fonte, o estado padrão, a carga máxima, o estado durante o repouso e o GPIO de controle.

<div align="center"><em>Tabela 5.2-1: Referência rápida para o planejamento dos trilhos de alimentação</em></div>

<div align="center" markdown>

| Categoria do trilho | Ponto de atenção no planejamento |
|:--------------|:---------------|
| Trilhos sempre ligados | Mantenha apenas RTC, circuitos necessários para despertar, detecção necessária e circuitos de retenção do Bluetooth. Calcule a corrente estática de cada bloco. |
| Trilhos comutáveis para periféricos | Prefira chaves de carga ou LDOs comutáveis para display, retroiluminação, sensores, motor, armazenamento externo e câmera. |
| Trilhos analógicos, RF e de áudio | Filtre-os separadamente, mantenha curtos os laços de corrente e afaste-os das áreas digitais de alta corrente e alta velocidade. |
| Trilho da mídia de boot | O estado padrão deve permitir o boot; durante o repouso, evite alimentação reversa e correntes de fuga. |
| Trilhos dos pull-ups | Planeje em conjunto os pull-ups de I2C, botões, interrupções dos sensores e demais sinais, considerando a política de alimentação de cada periférico. |

</div>

#### 5.2.2. Variantes alimentadas por bateria { #522-battery-powered-variants }

As variantes alimentadas por bateria normalmente utilizam `VBUS`, `VBAT`, `VCC`, `VSYS`, `BUCK_LX`, `BUCK_FB`, saídas dos LDOs internos e pinos de alimentação de áudio e RF.

Requisitos principais:

- Mantenha `VBUS` dentro da faixa de entrada permitida e inclua proteção OVP.
- Conecte `VBAT` à bateria e use esse pino para medir a tensão da bateria.
- Trate `VCC` como a entrada principal do sistema. Dimensione adequadamente as trilhas e posicione os capacitores de desacoplamento perto do chip.
- Use `VSYS` somente para as cargas internas especificadas, `AVDD_BRF` e os circuitos de pull-up dos GPIOs; não o use para alimentar periféricos externos.
- Use `VDD33_VOUT1`, `VDD33_VOUT2` e as demais saídas dos reguladores internos apenas para as cargas expressamente permitidas. Há uma divergência nas fontes da SiFli: o texto e o diagrama de baixo consumo mostram sensores externos em `VDD33_VOUT1`, enquanto o checklist de alimentação restringe essa saída à Flash NOR/NAND integrada ou externa e a `AVDD33_AUD`, proibindo outros periféricos. Até que a SiFli esclareça a divergência, não conecte sensores a `VDD33_VOUT1`.
- Alimente `AVDD_BRF` e `AVDD33_AUD` pelos trilhos recomendados e use filtragem local.

#### 5.2.3. Variantes com alimentação de 3,3 V { #523-33-v-supply-variants }

As variantes de 3,3 V normalmente usam um trilho externo de 3,3 V para `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD`, `VDDIOA` e domínios relacionados.

Requisitos principais:

- Use distribuição em estrela para os principais domínios de 3,3 V.
- Filtre as alimentações analógica, RF e de áudio separadamente dos caminhos digitais de alta corrente ou alta velocidade.
- Se `VBATS` for usado para medir a bateria, verifique a faixa de entrada e a filtragem.
- Nas variantes com alimentação de 3,3 V, alimente todas as mídias de boot externas por um LDO externo; `PA21` é o sinal de habilitação recomendado.
- Conecte as referências internas e as saídas dos LDOs internos somente aos capacitores externos especificados. Não aplique tensão externa nesses pinos.

#### 5.2.4. Referência rápida de capacitores e usos { #524-power-capacitor-and-usage-quick-reference }

Use esta tabela na revisão preliminar do esquemático. Confirme os valores finais no datasheet e no projeto de referência.

<div align="center"><em>Tabela 5.2-2: Referência rápida de capacitores e usos</em></div>

<div align="center" markdown>

| Trilho / pino | Capacitor externo típico | Uso principal | Observações de projeto |
|:-----------|:---------------------------|:---------|:-------------|
| `VBUS` | >= 10 µF | Entrada USB / carregador | Somente nas variantes alimentadas por bateria; inclua proteção OVP/ESD/EOS. |
| `VBAT` | >= 4,7 µF | Conexão da bateria e medição de tensão | Mantenha o caminho da bateria curto e largo; evite roteá-lo em paralelo com sinais sensíveis. |
| `VCC` / `PVDD` | >= 10 µF | Entrada principal do PMU / sistema | Posicione o desacoplamento perto do chip e dimensione a trilha para a corrente. |
| `VSYS` | Cerca de 2,2 µF | Alimentação interna ou analógica/RF especificada | Não use como alimentação geral de periféricos; controle a carga e a capacitância totais. |
| `VDD33_VOUT1` | 2,2 µF / 6,3 V | Somente Flash integrada, Flash NOR/NAND externa e `AVDD33_AUD` | Não use para sensores de frequência cardíaca nem outros periféricos comuns; a carga durante o soft-start deve respeitar o limite da fonte. |
| `VDD33_VOUT2` | Cerca de 2,2 µF | Display, motor ou cargas comutáveis especificadas | O estado padrão e a corrente de irrupção devem corresponder à configuração do firmware. |
| `VDD18_VOUT` | Conforme o esquemático do sistema mínimo selecionado | Alimentação interna de 1,8 V relacionada à PSRAM integrada | Não use como alimentação de periféricos externos de 1,8 V. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 µF / 6,3 V cada | Saídas dos LDOs internos | Exclusivas para alimentação interna; não alimente periféricos externos. |
| `VDD_RET` / `VDD_RTC` | 0,47 µF / 6,3 V para `VDD_RET`; 1 µF / 6,3 V para `VDD_RTC` | Alimentação interna de retenção e RTC | Posicione os capacitores perto dos pinos. |
| `AVDD_BRF` | Cerca de 4,7 µF | Alimentação analógica de RF | Posicione o capacitor perto do chip e use conexões curtas ao terra com múltiplas vias. |
| `AVDD33_AUD` | Cerca de 2,2 µF | Alimentação analógica de áudio | Afaste-a de DC/DC, RF, USB, SDIO e clocks do display. |
| `MIC_BIAS` | 1 µF / 6,3 V | Polarização do microfone | Use somente para polarização do microfone. |
| `AUD_VREF` / `GPADC_VREF` | 1 µF para `AUD_VREF`; 4,7 µF para `GPADC_VREF` | Referências internas | Conecte somente capacitores; nunca aplique tensão externa. |

</div>

#### 5.2.5. Indutor e realimentação do BUCK { #525-buck-inductor-and-feedback }

Parâmetros recomendados para o indutor do BUCK:

<div align="center"><em>Tabela 5.2-3: Parâmetros recomendados para o indutor do BUCK</em></div>

<div align="center" markdown>

| Parâmetro | Valor recomendado |
|:----------|:------------------|
| Indutância | 4,7 µH ±20% |
| DCR | <= 0,4 Ω |
| Corrente de saturação | >= 450 mA |

</div>

Requisitos de layout da PCB:

- Posicione o indutor, o capacitor de saída e o capacitor de realimentação perto do chip.
- Mantenha curto e largo o laço de `BUCK_LX`. Evite planos de cobre e sinais sensíveis nessa região.
- Use uma largura adequada para a trilha de `BUCK_FB`; recomenda-se pelo menos 0,25 mm.
- Mantenha um plano de referência de terra contínuo perto do indutor e evite acoplar ruído às trilhas dos cristais, RF, áudio e GPADC.
- Se o produto incluir blocos sensíveis, como GPS, sensor de frequência cardíaca, ECG ou microfones analógicos, reserve footprints opcionais para ajuste de EMI perto de BUCK_LX. Defina os valores finais durante a validação de EMC do sistema.

#### 5.2.6. Carregamento e OVP { #526-charging-and-ovp }

Produtos alimentados por bateria podem usar um carregador externo ou o bloco de carregamento integrado.

<div align="center"><em>Tabela 5.2-4: Comparação das opções de carregamento</em></div>

<div align="center" markdown>

| Opção | Caminho de alimentação | Observações |
|:-------|:---------|:------|
| Carregador externo sem PPM | A bateria alimenta diretamente os pinos `VBAT` e `VCC` do chip. | O canal GPADC do chip em `VBAT` mede a tensão da bateria com precisão de amostragem de ±30 mV. |
| Carregador externo com PPM | `VSYS` do carregador alimenta `VCC` do chip; `VBAT` do carregador conecta-se à bateria e ao pino `VBAT` do chip. | O canal GPADC do chip em `VBAT` mede a tensão da bateria com precisão de amostragem de ±30 mV. |
| Carregador integrado | Usa o bloco integrado de gerenciamento de carregamento do chip. | Se a bateria estiver muito descarregada e tiver desligado o sistema, ela precisa atingir a tensão de boot antes que o sistema possa iniciar e exibir a tela de carregamento. O checklist da fonte especifica que o software liga o display quando a bateria chega a cerca de 3,6 V. |

</div>

Recomendações para OVP:

- `VBUS` nunca deve ultrapassar a faixa de entrada permitida.
- Para OVP com OVLO ajustável, a SiFli cita o AW32905FCR como referência. O texto da aplicação indica 5,2–5,5 V, enquanto o checklist indica 5,15–5,55 V. Até que a SiFli esclareça a diferença, projete para a interseção das faixas: 5,2–5,5 V. Inclua as tolerâncias do dispositivo e do divisor em `V_IN_OVLO = ((R1 + R2) / R2) × V_OVLO_TH`; mantenha o erro de `V_OVLO_TH` dentro de 3% e use resistores R1/R2 com tolerância de 1%.
- Para OVP com saída regulada, a SiFli cita SGM4064YDE8G e LP5305AQVF. O texto da aplicação indica 4,5–5,4 V, enquanto o checklist indica 4,7–5,4 V. Até que a SiFli esclareça a diferença, use a faixa mais estreita de 4,7–5,4 V, capacidade de carga de pelo menos 0,5 A e limiar de sobrecorrente de pelo menos 0,7 A.
- Faça a entrada do carregador passar pela proteção TVS/OVP antes de chegar ao chip.

!!! warning "Divergência na faixa de VBUS"
    A tabela de pinos de alimentação e o checklist especificam entrada `VBUS` de 4,6–5,5 V, enquanto o texto de seleção de OVP indica 4,5–5,5 V. Até que a SiFli esclareça a diferença, use 4,6 V como tensão mínima de operação.

#### 5.2.7. Estratégia de alimentação de baixo consumo { #527-low-power-supply-strategy }

O comportamento de baixo consumo deve ser considerado desde o projeto do esquemático.

Recomendações:

- Use chaves de carga ou LDOs comutáveis para display, retroiluminação, sensores, motor e armazenamento externo.
- Escolha componentes de gerenciamento de alimentação com EN ativo em nível alto. Se a saída precisar permanecer desligada por padrão, conecte EN ao terra por um resistor pull-down de 1 MΩ a 5,1 MΩ; escolha o valor conforme a meta de baixo consumo do produto.
- Para a chave de alimentação com MOSFET, use a topologia recomendada na fonte, PMOS mais NMOS: nível alto no controle liga a alimentação e nível baixo a desliga. Instale um resistor pull-down fixo de 1 MΩ entre o controle e o terra.
- Alimente os pull-ups de I2C pelo mesmo trilho do periférico correspondente para evitar corrente de fuga durante o repouso.
- Escolha componentes com baixo Iq e baixa corrente no modo desligado para os circuitos sempre ligados.
- Se `VSYS` ou um LDO sempre ligado for usado para alimentar os pull-ups dos GPIOs, inclua essa corrente de fuga no orçamento de corrente durante o repouso.

#### 5.2.8. Figuras de referência de alimentação e carregamento { #528-power-and-charging-reference-figures }

Os esquemáticos e exemplos de layout do SF32LB57x mostram a árvore de alimentação, a temporização de POR, o caminho de carregamento, a seleção da proteção OVP e a estratégia de chaves de carga para baixo consumo. Nas variantes alimentadas por bateria, escolha entre LDO integrado, chave de carga a jusante ou LDO externo conforme o tipo de mídia de boot; nas variantes de 3,3 V, use um LDO externo para todas as mídias de boot externas. Siga os circuitos de referência para proteção EOS/ESD e OVP em VBUS e para a conexão do NTC de temperatura da bateria. Revise separadamente os exemplos de bateria e de alimentação de 3,3 V para não misturar as duas famílias.

A rampa de alimentação também deve respeitar a faixa de tempo de subida de VDD indicada nas figuras de referência: `1 < tVR < 500000 μs/V`. Nas variantes de alimentação de 3,3 V, siga a relação ilustrada entre as rampas de PVDD e VDDIO; VDDIO pode subir ao mesmo tempo que PVDD.

Figuras de referência para variantes alimentadas por bateria:

![Figura 5.2-1: Temporização de inicialização da variante alimentada por bateria](../../sf32-products/chips/assets/57x/SF32LB57x-POR-VBAT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-1: Temporização de inicialização da variante alimentada por bateria</em></div>

![Figura 5.2-2: Estrutura de alimentação do sistema alimentado por bateria](../../sf32-products/chips/assets/57x/SF32LB57x-H-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-2: Estrutura de alimentação do sistema alimentado por bateria</em></div>

Figuras de referência para alimentação de 3,3 V:

![Figura 5.2-3: Temporização de inicialização da variante com alimentação de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-POR-3V3.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-3: Temporização de inicialização da variante com alimentação de 3,3 V</em></div>

![Figura 5.2-4: Estrutura de alimentação do sistema com alimentação de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-L-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-4: Estrutura de alimentação do sistema com alimentação de 3,3 V</em></div>

Figuras de referência para carregamento e OVP:

![Figura 5.2-5: Carregador externo sem PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-NPPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-5: Carregador externo sem PPM</em></div>

![Figura 5.2-6: Carregador externo com PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-PPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-6: Carregador externo com PPM</em></div>

![Figura 5.2-7: Circuito de referência do carregador integrado](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-INNER.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-7: Circuito de referência do carregador integrado</em></div>

![Figura 5.2-8: Aplicação OVP com OVLO ajustável](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-OVLO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-8: Aplicação OVP com OVLO ajustável</em></div>

![Figura 5.2-9: Aplicação OVP com saída regulada](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-REGU.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-9: Aplicação OVP com saída regulada</em></div>

#### 5.2.9. Restrições elétricas por encapsulamento e família de alimentação { #529-package-and-power-family-electrical-constraints }

Os requisitos de alimentação do SF32LB57x variam conforme o encapsulamento e a família de alimentação. As principais diferenças que precisam ser verificadas estão resumidas abaixo; ainda assim, confira o esquemático final com o datasheet e o esquemático do sistema mínimo do encapsulamento selecionado.

<div align="center"><em>Tabela 5.2-5: Principais diferenças entre as famílias de alimentação</em></div>

<div align="center" markdown>

| Item de projeto | Variantes alimentadas por bateria | Variantes com alimentação de 3,3 V |
|:------------|:-------------------------|:----------------------|
| Entrada principal de alimentação | A tabela de pinos e o checklist especificam `VBUS` de 4,6–5,5 V. A faixa de `VBAT` é 3,45–4,7 V; o checklist especifica baterias com tensão nominal de 4,2–4,45 V. A faixa de operação de `VCC` é 3,45–4,7 V, com limiar de boot por hardware de 3,45 V e limiar de desligamento de 2,7 V. O limiar padrão de bateria baixa por software é 3,48 V; para uma fonte de bancada de tensão constante, use 3,6–4,7 V, com 3,8 V recomendado. | `PVDD` / `PVDD_PMU`: 2,97–3,63 V; `VBATS` serve somente para medir a tensão da bateria. |
| Alimentações analógica e RF | `AVDD_BRF` recebe alimentação de `VSYS`; `AVDD33_AUD`, de `VDD33_VOUT1`. | `AVDD33` / `AVDD33_ANA`, `AVDD_BRF`, `AVDD33_AUD` e `VDDIOA` recebem alimentação externa de 3,3 V e devem usar distribuição em estrela. |
| Saídas dos LDOs internos | `VDD_VOUT1`, `VDD_VOUT2`, `VDD_RET`, `VDD_RTC` e `VDD18_VOUT` são alimentações internas e não devem alimentar periféricos externos comuns. | Igual; `VDD18_VOUT` destina-se somente a circuitos internos ou à alimentação relacionada à PSRAM integrada, não a periféricos externos de 1,8 V. |
| `VDD33_VOUT1` | 3,3 V, 150 mA após a partida, habilitado por padrão; a carga durante o soft-start não deve exceder 30 mA, ou o LDO pode não iniciar. O checklist de alimentação permite somente Flash NOR/NAND integrada ou externa e `AVDD33_AUD`, e proíbe outros periféricos. | Não se aplica. |
| `VDD33_VOUT2` | 3,3 V, 150 mA, desabilitado por padrão e habilitado por software; a carga durante o soft-start não deve exceder 30 mA. O checklist da fonte informa que o software pode desabilitar esse limite de corrente de soft-start; se isso for feito, verifique se a corrente de irrupção do periférico é compatível com as condições de alimentação recomendadas. | Não se aplica. |
| `VDDIOSB` / `VDDIOSA` | QFN80L<!-- BGA-ONLY --> expõe `VDDIOSB`, cuja tensão depende do dispositivo MPI integrado: 1,8 V para PSRAM ou 3,3 V para Flash NOR. BGA112<!-- /BGA-ONLY --> também expõe `VDDIOSA`, fixo em 1,8 V e alimentado por `VDD18_VOUT`; a tensão de `VDDIOSB` depende do dispositivo integrado (1,8 V para PSRAM ou 3,3 V para Flash NOR). Confirme o número exato da peça. | Igual; confirme o número exato da peça a ser encomendada. |

</div>

!!! warning "Divergência na documentação sobre as cargas de VDD33_VOUT1"
    O diagrama da árvore de alimentação do guia da SiFli associa alguns sensores a `VDD33_VOUT1`, mas o checklist de alimentação do mesmo guia reserva explicitamente essa saída para Flash NOR/NAND e `AVDD33_AUD`, proibindo outros periféricos. Até que a SiFli esclareça a divergência, siga o checklist, que é mais restritivo, e não alimente sensores nem outros periféricos por esse trilho.

!!! warning "Divergência na tensão mínima de PVDD na documentação"
    O checklist do esquemático indica a faixa de `PVDD` como 2,93–3,63 V, enquanto a tabela de referência das famílias de alimentação acima indica 2,97–3,63 V. A documentação de origem não esclarece essa diferença. Até que a SiFli a esclareça, use 2,97 V como limite inferior provisório mais restritivo para a revisão do projeto e confirme as especificações elétricas do número de peça exato.

!!! warning "Divergência na faixa de entrada de VBATS"
    As tabelas de pinos dos encapsulamentos para as variantes com alimentação de 3,3 V indicam `VBATS` de 0 a 4,7 V, enquanto o checklist limita a medição da tensão da bateria a 0–4,5 V. Até que a SiFli esclareça a diferença, não aplique mais de 4,5 V a `VBATS` nessas variantes.

<div align="center"><em>Tabela 5.2-6: Capacitores principais e limites de carga</em></div>

<div align="center" markdown>

| Trilho / pino | Requisito da fonte |
|:-----------|:------------------------|
| `VBUS` | Nas variantes alimentadas por bateria, use pelo menos 10 µF / 10 V quando o carregador integrado estiver em uso. |
| `VBAT` | Pelo menos 4,7 µF / 10 V; um canal GPADC interno mede a tensão da bateria. |
| `VCC` / `PVDD` | `VCC` requer pelo menos 10 µF / 10 V; `PVDD`, pelo menos 10 µF / 6,3 V. |
| `BUCK_FB` | 4,7 µF, posicionado entre o indutor e o pino do chip. |
| `VSYS` | 2,2 µF / 6,3 V; a capacitância total deste domínio não deve ultrapassar 9,6 µF e o trilho deve alimentar somente as cargas internas/analógicas/RF especificadas. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 2,2 µF / 6,3 V em cada um; a capacitância total de cada domínio não deve ultrapassar 9,6 µF. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 µF / 6,3 V em cada um. |
| `VDD_RET` / `VDD_RTC` | `VDD_RET`: 0,47 µF / 6,3 V; `VDD_RTC`: 1 µF / 6,3 V. |
| `AVDD_BRF` / `AVDD33_AUD` | `AVDD_BRF`: 4,7 µF / 6,3 V; `AVDD33_AUD`: 2,2 µF / 6,3 V. |
| `VDDIOA` / `VBATS` / `AVDD33_ANA` | Somente nas variantes de 3,3 V: `VDDIOA` usa 4,7 µF / 6,3 V, `VBATS` usa 0,1 µF / 10 V e `AVDD33_ANA` usa 1 µF / 6,3 V. |
| `AUD_VREF` / `GPADC_VREF` | Somente capacitores; não aplique tensão externa. Valores típicos: 1 µF para `AUD_VREF` e 4,7 µF para `GPADC_VREF`. |
| `MIC_BIAS` | 1 µF / 6,3 V; use somente para polarização do microfone. |

</div>

<div align="center"><em>Tabela 5.2-7: Verificações obrigatórias de carregamento e OVP</em></div>

<div align="center" markdown>

| Item | Requisito |
|:-----|:------------|
| Uso do carregador integrado | Use somente se o produto puder esperar até a bateria chegar a cerca de 3,6 V antes de o firmware ligar o display. |
| Necessidade de ligar o display imediatamente | Se o display precisar ligar logo após conectar o carregador, use um carregador externo com gerenciamento PPM do caminho de alimentação. |
| Especificação da bateria | O carregamento por `VBAT` aceita baterias com tensão nominal de 4,2–4,45 V; a pré-carga é de cerca de 40 mA e a corrente máxima de carga é 1C, até 400 mA. |
| OVP com OVLO ajustável | O texto de projeto especifica 5,2–5,5 V, enquanto o checklist indica 5,15–5,55 V; a interseção é 5,2–5,5 V. Use resistores divisores de 1% e mantenha o erro do limiar OVLO abaixo de 3%. Até que a SiFli esclareça a diferença, projete para a interseção. |
| OVP com saída regulada | Recomenda-se OVP com saída LDO; a saída deve ser de 4,7–5,4 V, a capacidade de carga de pelo menos 0,5 A e o limiar OCP de pelo menos 0,7 A. |
| Carregador integrado não utilizado | `VBUS` pode permanecer em aberto e seu capacitor pode ser omitido; nesse caso, `VBAT` não fornece energia à saída. |

</div>


#### 5.2.10. Modos de operação e fontes de despertar { #5210-operating-modes-and-wake-sources }

Os modos de operação e as fontes de despertar fazem parte da revisão do sistema de alimentação, pois determinam quais trilhos, pull-ups, cargas externas e GPIOs capazes de gerar o despertar permanecem ativos em cada estado de baixo consumo.

#### 5.2.11. Modos de energia { #5211-power-modes }

A família SF32LB57x oferece dez fontes de interrupção capazes de despertar o dispositivo dos modos Standby e Hibernate; o mapeamento é apresentado na tabela a seguir.

<div align="center"><em>Tabela 5.2-8: Comparação dos modos de energia</em></div>

<div align="center" markdown>

| Modo | CPU | Periféricos | SRAM | E/S | LPTIM | Fontes típicas de despertar | Tempo típico para despertar |
|:-----|:----|:------------|:-----|:---|:------|:---------------------|:------------------|
| Active | Em execução | Em execução | Acessível | Alterna | Em execução | - | - |
| Sleep | Parada | Em execução | Acessível | Alterna | Em execução | Qualquer interrupção | <0,5 µs |
| DeepSleep | Parada | Parados | Retida, inacessível | Nível mantido | Em execução | RTC, E/S de despertar, GPIO, LPTIM, Bluetooth | ~250 µs |
| Standby | Reset | Reset | Retida, inacessível | Nível mantido | Em execução | RTC, E/S de despertar, LPTIM, Bluetooth | ~1 ms |
| Hibernate | Reset | Reset | Não retida | High-Z | Reset | RTC, E/S de despertar | >2 ms |

</div>

#### 5.2.12. Projeto do despertar { #5212-wake-design }

- Conecte botões, interrupções do painel de toque e interrupções de sensores que precisem despertar o sistema a GPIOs compatíveis com essa função.
- Planeje os sinais externos de despertar por hardware preferencialmente entre `PA33` e `PA42` e identifique a função no esquemático.
- Revise retenção de E/S, High-Z, pull-up, pull-down e estado da alimentação dos periféricos durante Standby e Hibernate.
- Para despertar ao conectar USB, use um divisor de VBUS ligado a um GPIO compatível com a função de despertar e com a tensão de E/S.
- Revise em conjunto o despertar por Bluetooth, RTC e sinais externos com a política de baixo consumo do firmware.

#### 5.2.13. Validação de baixo consumo { #5213-low-power-validation }

Durante EVT, meça pelo menos os seguintes estados:

<div align="center"><em>Tabela 5.2-9: Estados e objetivos de validação de baixo consumo</em></div>

<div align="center" markdown>

| Estado | Objetivo da medição |
|:------|:-----------------|
| Desligado / modo de transporte | Meça a corrente de fuga do sistema durante o armazenamento prolongado e verifique se há alimentação reversa pelos periféricos. |
| Hibernate | Verifique a corrente mínima do sistema quando a SRAM não é retida. |
| Standby | Verifique a retenção de E/S, as fontes de RTC e de despertar e a política de despertar do Bluetooth. |
| DeepSleep | Verifique a corrente de base em cenários comuns de espera conectada. |
| Repouso com display ligado | Verifique a corrente combinada do display, da retroiluminação, do painel de toque, dos sensores e do Bluetooth. |
| Carregamento | Verifique VBUS, VBAT, comportamento térmico, OVP e caminho de alimentação do sistema. |

</div>

<div align="center"><em>Tabela 5.2-10: Pinos externos de despertar em Standby/Hibernate</em></div>

<div align="center" markdown>

| Fonte de despertar | Pino |
|:------------|:----|
| `WKUP_PIN0` | `PA33` |
| `WKUP_PIN1` | `PA34` |
| `WKUP_PIN2` | `PA35` |
| `WKUP_PIN3` | `PA36` |
| `WKUP_PIN4` | `PA37` |
| `WKUP_PIN5` | `PA38` |
| `WKUP_PIN6` | `PA39` |
| `WKUP_PIN7` | `PA40` |
| `WKUP_PIN8` | `PA41` |
| `WKUP_PIN9` | `PA42` |

</div>

Em cada medição, registre a versão do firmware, a tensão de alimentação, o ajuste do simulador de bateria, o estado de conexão dos periféricos e do Bluetooth e a temperatura ambiente.

#### 5.2.14. Referência completa dos pinos de alimentação { #5214-full-power-supply-pin-reference }

Use estas tabelas na revisão do esquemático pino a pino. Cada tabela apresenta as tensões mínima, típica e máxima e a corrente máxima dos pinos de alimentação para uma combinação específica de encapsulamento e família de alimentação. Selecione a tabela correspondente ao número exato da peça a ser encomendada; não misture linhas de encapsulamentos ou famílias diferentes.

<div align="center"><em>Tabela 5.2-11: Referência dos pinos de alimentação do QFN68L alimentado por bateria</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrada VBUS; alimenta o bloco de carregamento integrado. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Conexão da bateria; um canal GPADC interno também mede a tensão da bateria neste pino. |
| `VSYS` | - | 3,0 | - | 150 | Saída interna de 3,0 V; conecte um capacitor externo ao terra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna; não alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna; não alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna; não alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna; não alimente periféricos externos. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada principal do sistema; conecte à bateria. O limiar de boot por hardware é 3,45 V e o de desligamento por hardware é 2,7 V. O limiar padrão de bateria baixa por software é 3,48 V. Para alimentação de bancada com tensão constante, use 3,6–4,7 V; recomenda-se 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; exclusiva para alimentação interna, conecte um capacitor ao terra e não alimente periféricos externos. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Saída 1 do LDO de 3,3 V; conecte um capacitor ao terra. Capacidade de carga de 150 mA após a partida; habilitada por padrão. A carga durante o soft-start não deve exceder 30 mA, ou o LDO pode não iniciar. Alimenta Flash integrada/externa e `AVDD33_AUD`. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Saída 2 do LDO de 3,3 V; desabilitada por padrão e habilitada por software. Limite a carga durante o soft-start a 30 mA; após a partida, a capacidade de carga é 150 mA. Alimenta o motor ou o painel LCD. |
| `GPADC_VREF` | - | - | - | - | Entrada de referência GPADC; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

<div align="center"><em>Tabela 5.2-12: Referência dos pinos de alimentação do QFN68L com alimentação de 3,3 V</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação GPIO; esta tabela de referência mostra a configuração de 3,3 V. Confirme a tensão de I/O para o número de peça exato. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada para medição da tensão da bateria; um canal GPADC interno mede essa tensão neste pino. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentação do PMU; conecte a uma fonte externa de 3,3 V. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; uso interno, não alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; uso interno, não alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; uso interno, não alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; uso interno, não alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentação analógica; conecte a uma fonte externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; uso interno, não alimente periféricos externos. |
| `GPADC_VREF` | - | - | - | - | Entrada de referência GPADC; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a uma fonte externa de 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a uma fonte externa de 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

!!! warning "Configuração de VDDIOA do SF32LB57ZUN3N6"
    O `VDDIOA` do `SF32LB57ZUN3N6` aceita 1,8 V ou 3,3 V. A faixa de 2,97 V a 3,63 V da tabela genérica QFN68L para alimentação de 3,3 V não se aplica à operação em 1,8 V; consulte os limites elétricos do número de peça comercial antes de escolher a alimentação de 1,8 V.

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` e `VDDIOA` conectam-se ao mesmo trilho externo de 3,3 V. Use distribuição em estrela: leve a trilha de cada pino separadamente desde a fonte, sem compartilhar um segmento comum a montante.

<div align="center"><em>Tabela 5.2-13: Referência dos pinos de alimentação do QFN80L alimentado por bateria</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação GPIO; conecte a uma fonte externa de 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medição da tensão da bateria; um canal GPADC interno mede a tensão da bateria neste pino. |
| `VSYS` | - | 3,0 | - | 150 | Saída interna de alimentação de 3,0 V; conecte um capacitor externo ao terra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentação analógica; conecte a uma fonte externa de 3,3 V. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada principal de alimentação do sistema; conecte à bateria. O limiar de boot por hardware é 3,45 V e o de desligamento por hardware é 2,7 V; o limiar padrão de bateria baixa por software é 3,48 V. Para uma fonte de bancada de tensão constante, use 3,6–4,7 V; recomenda-se 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentação de I/O do SIP SB; a tensão depende do número de peça exato. Se houver PSRAM co-encapsulada em MPI2 ou MPI3, conecte este pino a `VDD18_VOUT` de 1,8 V; se houver Flash NOR co-encapsulada, alimente-o externamente com 3,3 V. |
| `GPADC_VREF` | - | - | - | - | Entrada de referência GPADC; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

!!! warning "Inconsistência da fonte na tabela de alimentação do QFN80L"
    O diagrama de pinagem QFN80L da variante alimentada por bateria, mostrado na visão geral, identifica um pino como `VDD33_VOUT1`, enquanto a tabela de alimentação QFN80L da SiFli lista `VDDIOSB` e não explica a correspondência entre essas identificações. Além disso, essa tabela não lista `VDD33_VOUT1` nem `VDD33_VOUT2`, embora o diagrama geral de alimentação mostre ambos os trilhos e a mesma tabela indique que `AVDD33_AUD` é alimentado por `VDD33_VOUT1`. A fonte não esclarece se essas saídas são acessíveis externamente nesse encapsulamento. Antes de atribuir esses trilhos ou pinos, verifique a pinagem do número exato da peça e o esquemático de referência oficial.

<div align="center"><em>Tabela 5.2-14: Referência dos pinos de alimentação do QFN80L com alimentação de 3,3 V</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação GPIO; conecte a uma fonte externa de 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medição da tensão da bateria; um canal GPADC interno mede a tensão da bateria neste pino. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentação analógica; conecte a uma fonte externa de 3,3 V. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentação do PMU; conecte a uma fonte externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; exclusiva para alimentação interna. Não alimente periféricos externos. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentação de I/O do SIP SB; a tensão depende do número de peça exato. Se houver PSRAM integrada em MPI2/MPI3, conecte a `VDD18_VOUT` de 1,8 V; se houver Flash NOR integrada, alimente este pino externamente com 3,3 V. |
| `GPADC_VREF` | - | - | - | - | Entrada de referência GPADC; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a uma fonte externa de 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; conecte somente um capacitor ao terra, sem acionamento externo. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a uma fonte externa de 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` e `VDDIOA` conectam-se ao mesmo trilho externo de 3,3 V. Use distribuição em estrela: leve a trilha de cada pino separadamente desde a fonte, sem compartilhar um segmento comum a montante.

<!-- BGA-ONLY -->
<div align="center"><em>Tabela 5.2-15: Referência dos pinos de alimentação do BGA112 alimentado por bateria</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrada de alimentação VBUS; alimenta o bloco de carregamento integrado. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Conexão da bateria; um canal GPADC interno também mede a tensão da bateria neste pino. |
| `VSYS` | - | 3,0 | - | 150 | Saída interna de alimentação de 3,0 V; conecte um capacitor externo ao terra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação de saída do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada principal de alimentação do sistema; conecte à bateria. O limiar padrão de bateria baixa por software é 3,48 V; para uma fonte de tensão constante, use 3,6–4,7 V; recomenda-se 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; exclusiva para alimentação interna. Conecte um capacitor ao terra. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Saída 1 do LDO de 3,3 V; habilitada por padrão. Limite a carga durante o soft-start a 30 mA; após a partida, suporta 150 mA. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Saída 2 do LDO de 3,3 V; desabilitada por padrão e habilitada por software. Limite a carga durante o soft-start a 30 mA; após a partida, suporta 150 mA. |
| `PVSS_PMU` | - | - | - | - | Terra de alimentação do PMU. |
| `AVSS_PMU` | - | - | - | - | Terra analógico do PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrada de alimentação GPIO; conecte a 1,8 V ou 3,3 V, conforme definido pelo número de peça exato. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrada de alimentação de I/O da memória integrada; conecte a `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentação de I/O da memória integrada; a tensão depende do número de peça exato. Para PSRAM co-encapsulada, conecte a `VDD18_VOUT` (1,8 V); para NOR Flash co-encapsulada, conecte a `VDD33_VOUT1` (3,3 V). |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentação analógica; conecte a 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Terra analógico. |
| `GPADC_VREFP` | - | - | - | - | Entrada positiva de referência GPADC; use somente capacitor, sem acionamento externo. |
| `GPADC_VREFN` | - | - | - | - | Referência negativa GPADC; conecte ao terra. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a `VSYS`. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Terras RF. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; use somente capacitor, sem acionamento externo. |
| `AUD_VREF_GND` | - | - | - | - | Terra de áudio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a `VDD33_VOUT1`. |
| `AVSS33_AUD` | - | - | - | - | Terra de áudio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

<div align="center"><em>Tabela 5.2-16: Referência dos pinos de alimentação do BGA112 com alimentação de 3,3 V</em></div>

<div align="center" markdown>

| Pino de alimentação | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máx. (mA) | Descrição |
|:---|:---|:---|:---|:---|:---|
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medição da tensão da bateria; um canal GPADC interno mede a tensão da bateria neste pino. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nó de comutação do indutor BUCK; conecte aqui uma extremidade do indutor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentação de saída do BUCK; conecte aqui a outra extremidade do indutor e um capacitor ao terra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_RET` | - | 0,9 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `VDD_RTC` | - | 1,1 | - | 1 | Saída do LDO interno; conecte um capacitor externo. Exclusiva para alimentação interna. |
| `PVDD_PMU` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentação do PMU; conecte a uma fonte externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Saída LDO de 1,8 V; exclusiva para alimentação interna. Conecte um capacitor ao terra. |
| `PVSS_PMU` | - | - | - | - | Terra de alimentação do PMU. |
| `AVSS_PMU` | - | - | - | - | Terra analógico do PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrada de alimentação GPIO; conecte a 1,8 V ou 3,3 V, conforme definido pelo número de peça exato. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrada de alimentação de I/O da memória integrada; conecte a `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentação de I/O da memória integrada; a tensão depende do número de peça exato. Para PSRAM co-encapsulada, conecte a `VDD18_VOUT` (1,8 V); para NOR Flash co-encapsulada, alimente este pino externamente com 3,3 V. |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentação analógica; conecte a 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Terra analógico. |
| `GPADC_VREFP` | - | - | - | - | Entrada positiva de referência GPADC; use somente capacitor, sem acionamento externo. |
| `GPADC_VREFN` | - | - | - | - | Referência negativa GPADC; conecte ao terra. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentação RF; conecte a uma fonte externa de 3,3 V. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Terras RF. |
| `AUD_VREF` | - | - | - | - | Entrada de referência de áudio; use somente capacitor, sem acionamento externo. |
| `AUD_VREF_GND` | - | - | - | - | Terra de áudio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentação de áudio; conecte a uma fonte externa de 3,3 V. |
| `AVSS33_AUD` | - | - | - | - | Terra de áudio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Saída de polarização do microfone; conecte à alimentação do microfone. |

</div>

!!! warning "Faixa de tensão de VDDIOA no BGA112"
    A tabela original da SiFli indica para `VDDIOA` tensão mínima de 2,97 V, valor típico de 1,8 V / 3,3 V e tensão máxima de 3,63 V. A opção de 1,8 V não é compatível com o mínimo informado. Confirme a especificação elétrica do número de peça comercial; não aplique os limites de 2,97–3,63 V a uma configuração de 1,8 V sem confirmação.

<!-- /BGA-ONLY -->

Continue para [Clock, RF e Interfaces de Usuário](SF32LB57x_schematic_clock_rf_interfaces.md).
