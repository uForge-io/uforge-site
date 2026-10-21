---
icon: lucide/list-checks
hide:
    - navigation
description: "Checklist item a item do esquemático do SF32LB57x: encapsulamento, alimentação, clock, armazenamento, RF, display, áudio, câmera, botões e verificações de fabricação."
tags:
    - Hardware
    - Chip
    - Checklist
---

# Guia de projeto de hardware SF32LB57x — Checklist do esquemático { #sf32lb57x-hardware-design-guide-schematic-checklist }

!!! note "Parte do guia de projeto de hardware SF32LB57x"
    Esta página cobre a seção 5.8, com os itens de verificação do esquemático transcritos das tabelas oficiais de autoverificação de projeto da SiFli. Volte a [Sistema mínimo e alimentação](SF32LB57x_schematic_system_power.md), a primeira das três páginas de diretrizes para o projeto do esquemático.

## 5.8. Checklist do esquemático { #58-schematic-checklist }

Cada tabela corresponde a um bloco funcional do esquemático. A coluna "Aplicável a" indica quando um item se restringe às variantes alimentadas por bateria ou às variantes com alimentação de 3,3 V; nos demais casos, aplica-se a todas as variantes.

### 5.8.1. Encapsulamento { #581-package }

<div align="center"><em>Tabela 5.8.1-1: Verificação do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A biblioteca de símbolos do esquemático está correta | Todas as variantes | |

</div>

### 5.8.2. Alimentação { #582-power-supply }

<div align="center"><em>Tabela 5.8.2-1: Verificação da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A tensão de entrada em `VBUS` deve ser mantida estritamente entre 4,6 V e 5,5 V | Variantes alimentadas por bateria | |
| 2 | A bateria conectada a `VBAT` tem tensão nominal entre 4,2 V e 4,45 V; a corrente de pré-carga é de 40 mA e a corrente máxima de carga é 1C (400 mA) | Variantes alimentadas por bateria | |
| 3 | A faixa nominal de operação de `VCC` é de 3,45 V a 4,7 V; 3,45 V é o limiar de ativação por hardware e 2,7 V, o limiar de desligamento por hardware | Variantes alimentadas por bateria | |
| 4 | `VSYS` é uma alimentação interna dedicada e só pode alimentar `AVDD_BRF` e o circuito de pull-up dos GPIOs; não a use para alimentar outros periféricos externos | Variantes alimentadas por bateria | |
| 5 | A carga de `VDD33_VOUT1` limita-se à memória Flash integrada ao encapsulamento, à memória Flash NOR/NAND externa e a `AVDD33_AUD`; não alimente outros periféricos por essa saída. A corrente da carga durante a partida suave não deve ultrapassar 30 mA; após a ativação completa, a capacidade de carga é de 150 mA. | Variantes alimentadas por bateria | |
| 6 | O limite de corrente durante a partida suave de `VDD33_VOUT2` é 30 mA; após estabilizar em 3,3 V, a capacidade de carga é 150 mA. O limite de partida suave pode ser desativado por software; verifique se a corrente de irrupção do periférico está dentro dos limites recomendados para essa linha de alimentação | Variantes alimentadas por bateria | |
| 7 | `AVDD_BRF` é alimentada pelo domínio `VSYS` | Variantes alimentadas por bateria | |
| 8 | `AVDD33_AUD` é alimentada pelo domínio `VDD33_VOUT1` | Variantes alimentadas por bateria | |
| 9 | A faixa nominal de alimentação de `PVDD` é de 2,93 V a 3,63 V; a tensão típica de operação padrão é 3,3 V | Variantes com alimentação de 3,3 V | |
| 10 | A faixa de medição da tensão da bateria em `VBATS` é de 0 V a 4,5 V; não ultrapasse esse limite | Variantes com alimentação de 3,3 V | |
| 11 | `AVDD_BRF` é alimentada por uma fonte externa de 3,3 V | Variantes com alimentação de 3,3 V | |
| 12 | `AVDD33_AUD` é alimentada por uma fonte externa de 3,3 V | Variantes com alimentação de 3,3 V | |
| 13 | `AVDD33_ANA` é alimentada por uma fonte externa de 3,3 V | Variantes com alimentação de 3,3 V | |
| 14 | A faixa de tensão de entrada de `VDDIOA` depende do número de peça comercial exato; consulte a descrição do número de peça no datasheet | Variantes com alimentação de 3,3 V | |
| 15 | Medição da tensão da bateria: o chip já conecta internamente um canal GPADC a `VBAT`/`VBATS`; não conecte também esse sinal a outro canal GPADC | Todas as variantes | |
| 16 | A conexão de `BUCK_LX`/`BUCK_FB` segue rigorosamente as especificações de projeto de hardware do chip | Todas as variantes | |
| 17 | `VDD18_VOUT` destina-se somente à PSRAM integrada ao encapsulamento; nunca a use para alimentar periféricos externos de 1,8 V | Todas as variantes | |
| 18 | `GPADC_VREF` aceita somente um capacitor externo; nunca aplique uma tensão externa | Todas as variantes | |
| 19 | `AUD_VREF` aceita somente um capacitor externo; nunca aplique uma tensão externa | Todas as variantes | |

</div>

!!! warning "Diferenças na fonte original"
    A tabela de autoverificação original indica limite inferior de 2,93 V para `PVDD` e superior de 4,5 V para `VBATS`, enquanto as tabelas por encapsulamento indicam 2,97 V e 4,7 V, respectivamente. Esta página mantém os valores de autoverificação. Confirme as duas divergências com a SiFli para o código exato da peça; não aprove o projeto com base nas faixas mais amplas.

    O esquemático de referência também indica `VCC` de 3,2 V a 4,7 V e `VDD33_VOUT1` para Flash e sensores, em desacordo com o limite inferior de 3,45 V e a proibição de outros periféricos acima. Mantenha as restrições da tabela; não amplie a faixa de tensão nem as cargas permitidas com base nas indicações do esquemático.

    Em outra parte, o texto do guia informa uma faixa de entrada de `VBUS` de 4,5 V–5,5 V e uma faixa de saída de 4,5 V–5,4 V para dispositivos OVP com LDO integrado. Já a tabela de autoverificação informa, respectivamente, 4,6 V–5,5 V e 4,7 V–5,4 V. Esta página mantém os valores da tabela; confirme os limites aplicáveis para o componente exato e com a SiFli antes de aprovar o projeto.

    O item 25 da tabela original tem como título a verificação do capacitor de `VDD33_VOUT2`, mas o detalhe menciona por engano `VDD33_VOUT1` (também verificado no item 24). Esta página segue o título do item 25; confirme com a SiFli qual é a linha de alimentação pretendida.

### 5.8.3. Capacitores e indutores da alimentação { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabela 5.8.3-1: Verificação dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Capacitor de `VBUS` ≥ 10 µF/10 V, instalado próximo ao pino | Variantes alimentadas por bateria | |
| 2 | Capacitor de `VBAT` ≥ 4,7 µF/10 V, instalado próximo ao pino | Variantes alimentadas por bateria | |
| 3 | Capacitor de `VCC` ≥ 10 µF/10 V, instalado próximo ao pino | Variantes alimentadas por bateria | |
| 4 | Capacitor de `VSYS` = 2,2 µF/6,3 V; capacitância total neste domínio ≤ 9,6 µF; instalar próximo ao pino | Variantes alimentadas por bateria | |
| 5 | Capacitor de `VDD33_VOUT1` = 2,2 µF/6,3 V; capacitância total neste domínio ≤ 9,6 µF; instalar próximo ao pino | Variantes alimentadas por bateria | |
| 6 | Capacitor de `VDD33_VOUT2` = 2,2 µF/6,3 V; capacitância total neste domínio ≤ 9,6 µF; instalar próximo ao pino | Variantes alimentadas por bateria | |
| 7 | Capacitor de `PVDD` ≥ 10 µF/6,3 V, instalado próximo ao pino | Variantes com alimentação de 3,3 V | |
| 8 | Capacitor de desacoplamento de `VBATS` = 0,1 µF/10 V, instalado próximo ao pino | Variantes com alimentação de 3,3 V | |
| 9 | Capacitor de `VDDIOA` = 4,7 µF/6,3 V, instalado próximo ao pino | Variantes com alimentação de 3,3 V | |
| 10 | Capacitor de `AVDD33_ANA` = 1 µF/6,3 V, instalado próximo ao pino | Variantes com alimentação de 3,3 V | |
| 11 | Capacitor de `BUCK_FB` = 4,7 µF, instalado entre o indutor e o pino do chip | Todas as variantes | |
| 12 | Capacitor de `VDD_VOUT1` = 4,7 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 13 | Capacitor de `VDD_VOUT2` = 4,7 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 14 | Capacitor de `VDD_RET` = 0,47 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 15 | Capacitor de `VDD_RTC` = 1 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 16 | Capacitor de `MIC_BIAS` = 1 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 17 | Capacitor de `AVDD_BRF` = 4,7 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 18 | Capacitor de `AVDD33_AUD` = 2,2 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 19 | Capacitor de `AUD_VREF` = 1 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 20 | Capacitor de `GPADC_VREF` = 4,7 µF/6,3 V, instalado próximo ao pino | Todas as variantes | |
| 21 | Dê preferência a um indutor BUCK incluído na [lista de fornecedores aprovados da SiFli](../cad-components/sifli-approved-vendor-list.md); se usar outro componente, ele deve atender a L = 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 450 mA | Todas as variantes | |
| 22 | Para produtos com GPS ou outros periféricos sensíveis a interferências, reserve no `BUCK_LX` uma área para montagem de um capacitor em derivação para terra, com valor inferior a 100 pF; determine o valor final nos testes EMC do produto completo | Todas as variantes | |

</div>

### 5.8.4. Carregamento e OVP { #584-charging-and-ovp }

<div align="center"><em>Tabela 5.8.4-1: Verificação de carga e OVP</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A entrada de carregamento inclui um circuito de proteção contra sobretensão (OVP) | Variantes alimentadas por bateria | |
| 2 | Se o produto precisar acender o display imediatamente após a conexão do carregador, não use o carregador integrado; use um CI de carga externo com gerenciamento do caminho de alimentação (power-path management) | Variantes alimentadas por bateria | |
| 3 | Use o carregador integrado somente se for aceitável ligar o display por software após a bateria atingir 3,6 V | Variantes alimentadas por bateria | |
| 4 | Recomenda-se um dispositivo OVP com saída LDO integrada (por exemplo, `LP5305AQVF`): saída LDO de 4,7 V–5,4 V, capacidade de corrente de carga ≥ 0,5 A e limiar de sobrecorrente ≥ 0,7 A | Variantes alimentadas por bateria | |
| 5 | Se usar um dispositivo OVP com OVLO ajustável, os resistores do divisor devem ter tolerância de 1%, o erro do limiar OVLO deve ser inferior a 3% e a faixa de ajuste deve ser de 5,15 V–5,55 V | Variantes alimentadas por bateria | |
| 6 | Se o carregador integrado não for usado, `VBUS` pode ficar sem conexão e o capacitor externo pode ser omitido; nesse caso, `VBAT` não pode fornecer energia externamente | Variantes alimentadas por bateria | |

</div>

### 5.8.5. Consumo de energia { #585-power-consumption }

<div align="center"><em>Tabela 5.8.5-1: Verificação do consumo de energia</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Os CIs de alimentação LDO/DCDC usam um pino EN ativo em nível alto; quando a saída deve permanecer desligada por padrão, o EN recebe um pull-down de 1 MΩ–5,1 MΩ, dimensionado conforme a meta de baixo consumo do produto completo | Todas as variantes | |
| 2 | As chaves de alimentação com MOSFET usam a topologia PMOS+NMOS; o pino de controle fica em nível alto para ligar e baixo para desligar, com pull-down fixo de 1 MΩ para terra | Todas as variantes | |
| 3 | A chave de alimentação da mídia externa de boot é controlada exclusivamente por `PA21` | Todas as variantes | |
| 4 | Se `VSYS` for usado como linha de pull-up dos GPIOs, avalie por completo a corrente estática contínua e confirme que a meta de baixo consumo do produto é atendida | Variantes alimentadas por bateria | |
| 5 | Se LDO2 ou LDO3 for usado para alimentar os pull-ups dos GPIOs, avalie o cenário de desligamento para confirmar que não há corrente de fuga nem nível lógico de I/O fora do esperado | Variantes alimentadas por bateria | |
| 6 | A alimentação dos pull-ups de I2C liga e desliga junto com a alimentação do domínio de I/O do periférico correspondente, evitando corrente de fuga durante o sono | Todas as variantes | |
| 7 | O limite máximo de corrente estática do produto completo no modo Deep Sleep está confirmado em relação à especificação do projeto | Todas as variantes | |
| 8 | A soma das correntes estáticas de todos os periféricos no modo Deep Sleep está registrada e atende à meta de consumo do projeto | Todas as variantes | |
| 9 | O limite máximo de corrente estática do produto completo no modo Standby está confirmado em relação à especificação do projeto | Todas as variantes | |
| 10 | A soma das correntes estáticas de todos os periféricos no modo Standby está registrada e atende à meta de consumo do projeto | Todas as variantes | |

</div>

### 5.8.6. Clock { #586-clock }

<div align="center"><em>Tabela 5.8.6-1: Verificação do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | O cristal principal de 48 MHz consta da [lista de fornecedores aprovados da SiFli](../cad-components/sifli-approved-vendor-list.md) (AVL) | Todas as variantes | |
| 2 | Se o cristal de 48 MHz não constar da AVL, deve atender a 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), tolerância de frequência ≤ ±10 ppm e ESR ≤ 30 Ω (22 Ω recomendado) | Todas as variantes | |
| 3 | O cristal RTC de 32,768 kHz consta da AVL | Todas as variantes | |
| 4 | Se o cristal de 32,768 kHz não constar da AVL, deve atender a CL = 7 pF ou 11,5 pF (7 pF recomendado), tolerância de frequência ≤ ±20 ppm e ESR ≤ 80 kΩ (38 kΩ recomendado) | Todas as variantes | |

</div>

### 5.8.7. Armazenamento e boot { #587-storage-and-boot }

<div align="center"><em>Tabela 5.8.7-1: Verificação do armazenamento e do boot</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Para memória SPI NOR externa em MPI3, `PA13` (MPI D1) e `PA17` (MPI D3) não precisam de pull-up | Todas as variantes | |
| 2 | Para memória SPI NAND externa em MPI3, `PA13` (MPI D1) não precisa de pull-up; `PA17` (MPI D3) requer pull-up de 7,5 kΩ | Todas as variantes | |
| 3 | Para memória SD NAND externa em MPI3, `PA13` (SD D3) e `PA15` (SD CMD) requerem pull-ups de 7,5 kΩ; `PA17` (SD D1) não precisa de pull-up | Todas as variantes | |
| 4 | Para eMMC externa em MPI3, `PA13` (SD D3), `PA17` (SD D1) e `PA15` (SD CMD) requerem pull-ups de 7,5 kΩ | Todas as variantes | |
| 5 | Se a memória integrada ao encapsulamento já ocupar MPI3, o uso externo de MPI3 limita-se a SD NAND/eMMC; não conecte memória SPI NOR/SPI NAND externa | Todas as variantes | |
| 6 | Controle da alimentação de armazenamento externo em MPI3: a memória SPI NOR pode permanecer sempre alimentada; SPI NAND, SD NAND e eMMC exigem uma chave de alimentação. Para inicializar por mídia externa, a alimentação do armazenamento deve iniciar ligada | Todas as variantes | |
| 7 | O código da peça de armazenamento externo selecionada consta da AVL do projeto | Todas as variantes | |
| 8 | A faixa de tensão de operação da memória corresponde ao nível de alimentação de IO do chip principal | Todas as variantes | |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabela 5.8.8-1: Verificação de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A trilha de sinal ANT indica explicitamente uma impedância característica de 50 Ω em configuração não balanceada (single-ended) | Todas as variantes | |
| 2 | A cadeia de sinal prevê uma rede de casamento π, com capacitores não montados (NC) nas posições em derivação e um capacitor de 15 pF em série; os valores finais são ajustados durante os testes de hardware | Todas as variantes | |

</div>

### 5.8.9. Display { #589-display }

<div align="center"><em>Tabela 5.8.9-1: Verificação do display</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Para displays com interface QSPI, prefira os pinos dedicados da Função 1 do grupo `PA00`–`PA08` | Todas as variantes | |
| 2 | Em taxas de sinal normais, o display RGB pode usar qualquer GPIO; acima de 30 MHz, use somente `PA22`–`PA50` e `PA52`–`PA54` (apenas `B1`–`B6`) | Todas as variantes | |
| 3 | O display com interface MCU 8080 segue a mesma regra de atribuição de pinos do RGB; em alta velocidade, limita-se a `PA22`–`PA50` e `PA52`–`PA54` | Todas as variantes | |
| 4 | O display de papel eletrônico EPD segue a mesma regra de atribuição de pinos do RGB; em alta velocidade, limita-se a `PA22`–`PA50` e `PA52`–`PA54` | Todas as variantes | |
| 5 | Como o display e a luz de fundo consomem bastante energia, inclua uma chave de controle da alimentação; exceto em projetos com display sempre ativo, as alimentações do display e da luz de fundo devem iniciar desligadas | Todas as variantes | |
| 6 | As faixas de tensão de operação do display e do painel de toque correspondem ao nível de alimentação do domínio de E/S do chip principal | Todas as variantes | |

</div>

### 5.8.10. Áudio { #5810-audio }

<div align="center"><em>Tabela 5.8.10-1: Verificação do áudio</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A ligação dos sinais, da polarização e dos demais pinos do microfone MEMS está de acordo com as especificações de hardware | Todas as variantes | |
| 2 | O microfone MEMS usa `MIC_BIAS` do chip como alimentação de polarização | Todas as variantes | |
| 3 | A ligação dos sinais, da polarização e dos demais pinos do microfone ECM analógico não balanceado (single-ended) está de acordo com as especificações de hardware | Todas as variantes | |
| 4 | O microfone ECM analógico não balanceado (single-ended) usa `MIC_BIAS` do chip como alimentação de polarização | Todas as variantes | |
| 5 | Cada canal de entrada do ADC de áudio tem um capacitor de bloqueio de CC em série de pelo menos 2,2 µF | Todas as variantes | |
| 6 | Cada uma das linhas `DACP` e `DACN` deve ter um resistor de 1 kΩ em série próximo ao chip; ligue um capacitor de 1,5 nF em paralelo entre as duas linhas | Todas as variantes | |
| 7 | O pino `PA55`, compartilhado com `ADC1P`, está configurado como entrada de alta impedância quando `ADC1P` é habilitado, para evitar conflito de funções ou problemas no sinal | Todas as variantes | |
| 8 | O pino `PA10`, compartilhado com `ADC2P`, está configurado como entrada de alta impedância quando `ADC2P` é habilitado, para evitar conflito de funções ou problemas no sinal | Todas as variantes | |
| 9 | O pino `PA56`, compartilhado com `MICBIAS`, está configurado como entrada de alta impedância quando `MICBIAS` é habilitado, para evitar conflitos de função que possam causar fuga de corrente ou falhas no circuito | Todas as variantes | |

</div>

### 5.8.11. Câmera { #5811-camera }

<div align="center"><em>Tabela 5.8.11-1: Verificação da câmera</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A ligação dos sinais, da alimentação e dos demais pinos da câmera está de acordo com as especificações de hardware | Todas as variantes | |
| 2 | A alimentação do núcleo de cada modelo de câmera atende aos requisitos do respectivo datasheet | Todas as variantes | |

</div>

### 5.8.12. Botões { #5812-buttons }

<div align="center"><em>Tabela 5.8.12-1: Verificação dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Com base no plano do produto, confirme se algum botão precisa despertar o MCU por hardware e conclua o projeto do circuito e a configuração de software correspondentes | Todas as variantes | |
| 2 | No circuito de pull-up dos botões comuns, selecione corretamente o valor do resistor e use um domínio de tensão de pull-up compatível com o domínio de alimentação de IO | Todas as variantes | |
| 3 | A tecla de ligar/reset usa `PA34`, configurado como ativo em nível alto; permite reset por hardware após pressionamento contínuo de 10 s; o resistor de pull-down de 10 kΩ fica na placa principal | Todas as variantes | |
| 4 | Cada sinal de entrada de botão tem um dispositivo de proteção ESD correspondente, colocado próximo ao botão | Todas as variantes | |

</div>

### 5.8.13. UART { #5813-uart }

<div align="center"><em>Tabela 5.8.13-1: Verificação da UART</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A UART segue a ligação cruzada: RXD do MCU ao TXD do periférico e TXD do MCU ao RXD do periférico | Todas as variantes | |
| 2 | Durante o reset do MCU, o periférico externo conectado a `PA35`/`PA36` (multiplexados com UART) fica desligado ou o software mantém `PA35`/`PA36` em nível baixo para evitar que níveis anormais acionem o periférico indevidamente | Todas as variantes | |
| 3 | A faixa de tensão de operação de I/O do dispositivo UART conectado corresponde ao domínio de I/O do chip principal | Todas as variantes | |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabela 5.8.14-1: Verificação do I2C</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | SDA e SCL têm resistores de pull-up (recomenda-se 2,2 kΩ a 400 kHz); os pull-ups são alimentados pelo domínio do periférico, que é desligado junto com ele | Todas as variantes | |
| 2 | Confirme se o pino de interrupção associado ao I2C precisa despertar o MCU por hardware e configure-o de acordo | Todas as variantes | |
| 3 | Sensores I2C, como acelerômetros, sensores de frequência cardíaca e magnetômetros, permitem ler todos os registradores em uma única operação de leitura contínua (burst read) | Todas as variantes | |
| 4 | Cada dispositivo conectado ao mesmo barramento I2C tem um endereço de escravo exclusivo, sem conflitos | Todas as variantes | |

</div>

### 5.8.15. SPI { #5815-spi }

<div align="center"><em>Tabela 5.8.15-1: Verificação do SPI</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | O SPI segue a ligação cruzada: SDO do controlador ao SDI do periférico e SDI do controlador ao SDO do periférico; CLK e CS são ligados diretamente | Todas as variantes | |
| 2 | A frequência, a fase e a polaridade do clock configuradas no controlador correspondem integralmente às especificações do periférico | Todas as variantes | |
| 3 | A faixa de tensão de operação de I/O do periférico corresponde ao domínio de I/O do chip principal | Todas as variantes | |

</div>

### 5.8.16. GPADC { #5816-gpadc }

<div align="center"><em>Tabela 5.8.16-1: Verificação do GPADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Os sinais de entrada do GPADC usam somente os 11 pinos compatíveis com GPADC, de `PA28` a `PA38` | Todas as variantes | |
| 2 | A tensão analógica em cada canal GPADC permanece dentro da faixa nominal de 0 V a 3,3 V | Todas as variantes | |
| 3 | Os canais de amostragem com divisor usam resistores de 1% de tolerância; cada entrada GPADC tem um capacitor de filtro de 100 nF próximo ao pino do chip | Todas as variantes | |

</div>

### 5.8.17. USB { #5817-usb }

<div align="center"><em>Tabela 5.8.17-1: Verificação do USB</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A ligação dos sinais diferenciais, da alimentação e do terra do USB segue as especificações de hardware, sem inversões nem curtos-circuitos | Todas as variantes | |
| 2 | As linhas de dados USB, `VBUS` e outros pinos importantes têm dispositivos de proteção ESD que atendem aos requisitos do produto completo | Todas as variantes | |
| 3 | Enquanto o MCU não estiver em modo de suspensão, mantenha o USB habilitado para que o protocolo reconheça normalmente a conexão e a remoção do dispositivo | Todas as variantes | |
| 4 | Se for necessário reconhecer a conexão USB enquanto o MCU está em suspensão, use um divisor em `VBUS` para aplicar a um pino capaz de despertar o MCU por hardware uma tensão compatível com E/S; de preferência, compartilhe esse pino com a detecção da conexão do carregador | Todas as variantes | |
| 5 | Configure como entrada de alta impedância o pino `PA35`, compartilhado com `USB_DP`, quando `USB_DP` estiver habilitado | Todas as variantes | |
| 6 | Configure como entrada de alta impedância o pino `PA36`, compartilhado com `USB_DM`, quando `USB_DM` estiver habilitado | Todas as variantes | |

</div>

### 5.8.18. Despertar externo por hardware { #5818-external-hardware-wake }

<div align="center"><em>Tabela 5.8.18-1: Verificação do despertar externo por hardware</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | As interrupções externas de despertar por hardware usam somente os 10 GPIOs da faixa `PA33`–`PA42` | Todas as variantes | |

</div>

### 5.8.19. Depuração e gravação { #5819-debug-and-download }

<div align="center"><em>Tabela 5.8.19-1: Verificação da depuração e da gravação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | `PA18` (RXD) e `PA19` (TXD) são a interface padrão DBG-UART para gravação e depuração; confirme a ligação correta de TXD e RXD | Todas as variantes | |
| 2 | `PA43`/`PA44`, pinos padrão de SWD para gravação e depuração, contam com pontos de teste acessíveis à soldagem | Todas as variantes | |
| 3 | `PA00`, o pino de seleção do modo de boot, tem um resistor de pull-up reservado e um ponto de teste correspondente | Todas as variantes | |
| 4 | `PA01`, que define a posição dos pinos SWD, tem um resistor de pull-up e um ponto de teste reservados conforme necessário para o produto | Todas as variantes | |

</div>

### 5.8.20. EOS e ESD { #5820-eos-and-esd }

<div align="center"><em>Tabela 5.8.20-1: Verificação de EOS e ESD</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | A interface de carregamento tem dispositivos de proteção contra EOS, ESD e sobretensão (OVP) | Todas as variantes | |
| 2 | Os pinos de alimentação e sinal da interface da bateria têm dispositivos de proteção ESD | Todas as variantes | |
| 3 | O pino de sinal da antena RF tem um dispositivo de proteção ESD dedicado | Todas as variantes | |
| 4 | Os pinos de alimentação do LCD e do painel de toque têm dispositivos de proteção ESD | Todas as variantes | |
| 5 | Todas as linhas do barramento I2C e os sinais `RST` e `INT` do painel de toque têm dispositivos de proteção ESD | Todas as variantes | |
| 6 | O pino de alimentação e todos os pinos de sinal do módulo de frequência cardíaca têm dispositivos de proteção ESD | Todas as variantes | |

</div>

### 5.8.21. Linha de produção { #5821-production-line }

<div align="center"><em>Tabela 5.8.21-1: Verificação da linha de produção</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Confirmação (Sim/Não) |
|:---|:---|:---|:---|
| 1 | Os pontos de teste destinados à gravação e à depuração incluem `VBAT` ou 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (não aplicável às variantes com alimentação de 3,3 V) e `PA34` | Variantes alimentadas por bateria | |
| 2 | Disponha os pontos de teste de modo a permitir o uso manual de sondas e a soldagem, sem obstruções nem excesso de componentes ou trilhas | Todas as variantes | |
| 3 | As dimensões, o espaçamento e a orientação dos pads dos pontos de teste usados no gabarito de produção (`VBAT` ou 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` quando aplicável, `PA00`, `PA01` e `PA34`) atendem às especificações das sondas | Todas as variantes | |

</div>
