---
icon: lucide/list-checks
description: "Lista de verificação esquemática, item a item, do MCU SF32LB58x, cobrindo alimentação, clock, RF, armazenamento, display e fabricação."
tags:
    - Hardware
    - Chip
    - Lista de verificação
hide:
    - navigation
---

# Guia de projeto de hardware do SF32LB58x — Lista de verificação do esquemático { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "Parte do guia de projeto de hardware do SF32LB58x"
    Esta página contém a lista de verificação esquemática, item a item, da Seção 5.8. Volte a [Diretrizes para o esquemático](SF32LB58x_schematic_design.md).

## 5.8. Lista de verificação do esquemático { #58-schematic-checklist }

Cada tabela abaixo cobre um bloco funcional do esquemático. Use as condições indicadas em cada item para determinar quando ele se aplica: verifique os itens obrigatórios quando essas condições forem atendidas e os opcionais quando a função ou opção de projeto correspondente for utilizada.

### 5.8.1. Encapsulamento { #581-package }

<div align="center"><em>Tabela 5.8.1-1: Lista de verificação do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O encapsulamento do código de peça selecionado está correto, incluindo nomes e números dos pinos | Obrigatório |

</div>

### 5.8.2. Alimentação { #582-power-supply }

<div align="center"><em>Tabela 5.8.2-1: Lista de verificação da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A tensão de alimentação de PVDD1 é de 1.8 V a 3.3 V | Obrigatório |
| 2 | A tensão de alimentação de PVDD2 é de 1.8 V a 3.3 V | Obrigatório |
| 3 | As conexões de BUCK1_LX e BUCK1_FB estão corretas | Obrigatório |
| 4 | As conexões de BUCK2_LX e BUCK2_FB estão corretas | Obrigatório |
| 5 | A saída LDO_VOUT1 tem um ponto de teste ou um capacitor de filtragem que facilite a medição da tensão | Obrigatório |
| 6 | A saída VDD_RET tem um ponto de teste ou um capacitor de filtragem que facilite a medição da tensão | Obrigatório |
| 7 | A saída VDD_RTC tem um ponto de teste ou um capacitor de filtragem que facilite a medição da tensão | Obrigatório |
| 8 | A tensão de alimentação de VDDIOA é de 1.8 V a 3.3 V; reserve um resistor série de 0 Ω na primeira revisão da placa | Obrigatório |
| 9 | A tensão de alimentação de VDDIOA2 é de 1.8 V a 3.3 V; reserve um resistor série de 0 Ω na primeira revisão da placa | Obrigatório |
| 10 | A tensão de alimentação de VDDIOB é de 1.8 V a 3.3 V; reserve um resistor série de 0 Ω na primeira revisão da placa | Obrigatório |
| 11 | A tensão de alimentação de VDDIOSA é de 1.8 V e há uma chave de carga para desligá-la | Obrigatório |
| 12 | A tensão de alimentação de VDDIOSB é de 1.8 V e há uma chave de carga para desligá-la | Obrigatório |
| 13 | A tensão de alimentação de VDDIOSC é de 1.8 V e deve permanecer sempre ligada | Obrigatório |
| 14 | A tensão de alimentação de AVDD33_USB é de 3.3 V | Obrigatório |
| 15 | A tensão de alimentação de AVDD33_ANA é de 3.3 V | Obrigatório |
| 16 | A tensão de alimentação de AVDD_BRF é de 1.8 V a 3.3 V e deve corresponder à alimentação de VDD1 | Obrigatório |
| 17 | A tensão de alimentação de AVDD33_AUD é de 3.3 V | Obrigatório |
| 18 | A tensão de alimentação de AVDD18_DSI é de 1.8 V | Obrigatório |
| 19 | Quando o SF30147C fornece alimentação, a interface de controle TWI deve usar pinos PB do MCU, e esses pinos devem ser do tipo PD | Obrigatório |
| 20 | O circuito de carregamento deve ter gerenciamento do caminho de alimentação, para que o sistema seja alimentado pela entrada de 5 V do carregador quando a tensão da bateria estiver baixa demais | Obrigatório |
| 21 | Quando o SF30147C fornece alimentação, use a interface TWI dedicada do chip | Obrigatório |
| 22 | Quando o SF30147C fornece alimentação, os trilhos controlados por EN devem usar PVDD ou AVDD como domínio de alimentação de EN; não controle EN por um GPIO do MCU. Como alternativa, conecte EN ao terra e controle a saída do trilho correspondente por registradores | Obrigatório |
| 23 | Quando o SF30147C fornece alimentação, <span class="flag-red">BUCK e LDO1</span> só podem ser controlados por seus respectivos sinais de habilitação, EN_BUCK e EN_LDO1; não há controle por registrador interno | Obrigatório |
| 24 | Nos modelos 58x, as alimentações PVDD e VDDIOB devem corresponder. Se PVDD for menor que VDDIOB, por exemplo, VDDIOB = 3.3 V e PVDD = 1.8 V, haverá cerca de 15 µA de corrente de fuga em VDDIOB nos modos Standby e Hibernate | Obrigatório |
| 25 | No 58x, o pino B4 é VDD_EXT1 e o pino B5 é VDD_EXT2; eles podem ficar sem conexão no projeto | Obrigatório |

</div>

!!! note "Esclarecimento sobre a fonte"
    O item 19 da lista de verificação de alimentação da planilha determina que a interface de controle TWI use pinos PB do MCU e acrescenta que esses pinos devem ser do tipo “PD”. Separadamente, o item 21 determina o uso da interface TWI dedicada do chip. A planilha não define “PD” nem explica como os dois requisitos se relacionam. A nota de aplicação de hardware da OpenSiFli informa que o SF32LB58x emula sinais TWI com dois GPIOs para controlar o SF30147C. Antes de fechar o esquemático, confirme com a SiFli qual interface e quais pinos devem ser usados.

### 5.8.3. Capacitores e indutores da alimentação { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabela 5.8.3-1: Lista de verificação dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O capacitor bulk de PVDD1 é de pelo menos 10 µF | Obrigatório |
| 2 | O capacitor de PVDD2 é de pelo menos 10 µF | Obrigatório |
| 3 | Capacitor de BUCK1_FB = 4.7 µF | Obrigatório |
| 4 | Capacitor de BUCK2_FB = 4.7 µF | Obrigatório |
| 5 | Capacitor de LDO_VOUT1 = 4.7 µF | Obrigatório |
| 6 | Capacitor de VDD_RET = 0.47 µF | Obrigatório |
| 7 | Capacitor de VDD_RTC = 1 µF | Obrigatório |
| 8 | Capacitor de VDDIOA ≥ 1 µF | Obrigatório |
| 9 | Capacitor de VDDIOA2 ≥ 1 µF | Obrigatório |
| 10 | Capacitor de VDDIOB ≥ 1 µF | Obrigatório |
| 11 | Capacitor de VDDIOSA ≥ 1 µF | Obrigatório |
| 12 | Capacitor de VDDIOSB ≥ 1 µF | Obrigatório |
| 13 | Capacitor de VDDIOSC ≥ 1 µF | Obrigatório |
| 14 | Capacitor de AVDD33_USB ≥ 1 µF | Obrigatório |
| 15 | Capacitor de AVDD33_ANA ≥ 4.7 µF | Obrigatório |
| 16 | Capacitor de AVDD_BRF ≥ 4.7 µF | Obrigatório |
| 17 | Capacitor de AVDD33_AUD ≥ 4.7 µF | Obrigatório |
| 18 | Capacitor de AUD_VREF = 1 µF | Obrigatório |
| 19 | Capacitor de AVDD18_DSI ≥ 4.7 µF | Obrigatório |
| 20 | Capacitor de MIC_BIAS = 1 µF | Obrigatório |
| 21 | Capacitor de GPADC VREFP = 4.7 µF | Obrigatório |
| 22 | <span class="flag-red">As alimentações de PVDD1, PVDD2 e AVDD_BRF, bem como a alimentação do pull-up de RSTN, devem ser iguais</span> | Obrigatório |
| 23 | Os indutores BUCK1 e BUCK2 usam códigos de peça recomendados pela SiFli | Obrigatório |
| 24 | Se o indutor BUCK não for um dos recomendados pela SiFli, ele deve atender a L = 4.7 uH, DCR &lt;= 0.4 ohm e Isat &gt;= 450 mA | Obrigatório |
| 25 | <span class="flag-red">Quando PVDD1 e PVDD2 forem alimentados a 1.8 V a partir de VBAT, use um conversor DCDC para gerar 1.8 V; não use um LDO</span> | Obrigatório |
| 26 | <span class="flag-red">A corrente quiescente do conversor DCDC selecionado foi registrada e atende aos requisitos do projeto</span> | Obrigatório |
| 27 | <span class="flag-red">A corrente quiescente do LDO selecionado foi registrada e atende aos requisitos do projeto</span> | Obrigatório |

</div>

!!! note "Divergência na corrente de saturação do indutor BUCK"
    O item 24 da lista de verificação de capacitores e indutores da planilha especifica Isat ≥ 450 mA para um indutor fora da AVL. A nota de aplicação de hardware da OpenSiFli especifica Isat ≥ 500 mA para um indutor BUCK com L = 4,7 µH e DCR ≤ 0,4 Ω. A tabela mantém o valor de 450 mA da planilha; a [orientação de seleção de indutores BUCK no projeto esquemático](SF32LB58x_schematic_design.md#5114-buck-inductor-selection) usa 500 mA. Até que a SiFli esclareça a divergência, use um indutor com Isat de pelo menos 500 mA.

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Tabela 5.8.4-1: Lista de verificação do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O cristal principal de 48 MHz consta na lista AVL | Obrigatório |
| 2 | Se o cristal de 48 MHz não constar na lista AVL, deve atender a 7 pF ≤ CL ≤ 12 pF (8.8 pF recomendado), desvio de frequência dentro de ±10 ppm e ESR ≤30 Ω (22 Ω recomendado) | Obrigatório |
| 3 | O cristal RTC de 32.768 kHz consta na lista AVL | Obrigatório |
| 4 | Se o cristal de 32.768 kHz não constar na lista AVL, deve atender a CL ≤12.5 pF (7 pF recomendado), desvio de frequência dentro de ±20 ppm e ESR ≤80 kΩ (38 kΩ recomendado) | Obrigatório |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Tabela 5.8.5-1: Lista de verificação do reset</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | RSTN está com pull-up ligado à mesma alimentação de PVDD1 | Obrigatório |
| 2 | Há um capacitor de 0.1 uF entre RSTN e terra | Obrigatório |
| 3 | RSTN tem proteção contra ESD | Obrigatório |

</div>

### 5.8.6. Sinais de terra { #586-ground-signals }

<div align="center"><em>Tabela 5.8.6-1: Lista de verificação dos sinais de terra</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Todos os sinais AVSS_*** estão conectados ao GND | Obrigatório |
| 2 | Todos os sinais VSS estão conectados ao GND | Obrigatório |

</div>

### 5.8.7. Modo de inicialização { #587-boot-mode }

<div align="center"><em>Tabela 5.8.7-1: Lista de verificação do modo de inicialização</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | MODE tem um pull-down interno; reserve um pull-up de 10 kΩ para VDDIOA e coloque MODE em nível alto durante a programação | Obrigatório |
| 2 | <span class="flag-red">Reserve um ponto de teste para MODE e leve o sinal até o gabarito de programação da produção</span> | Obrigatório |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabela 5.8.8-1: Lista de verificação de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O sinal ANT está identificado com o requisito de impedância característica de 50 Ω em configuração não balanceada | Obrigatório |
| 2 | Reserve uma rede de casamento tipo π no sinal ANT: um capacitor NC (não montar) em paralelo e um capacitor de 15 pF em série | Obrigatório |
| 3 | Se for necessário filtrar emissões espúrias, reserve uma rede de casamento tipo π com um indutor de 2.7 nH em série e um capacitor de 2 pF em paralelo | Opcional |
| 4 | Se um amplificador de potência RF externo exigir controle de RXEN e TXEN pelo MCU, use somente PB39 para RXEN do PA e PB40 para TXEN do PA | Opcional |
| 5 | <span class="flag-red">Se o chip Wi-Fi oferecer arbitragem de coexistência de antena:<br>(1) Recomenda-se o modo de 3 fios: o chip Wi-Fi controla a chave RF da antena Bluetooth/Wi-Fi e executa a arbitragem. Ele usa BT_ACTIVE e BT_PRIORITY, enviados pelo Bluetooth, para decidir se concede a antena ao Bluetooth; WLAN_ACTIVE pode desativar a transmissão e recepção Bluetooth durante a operação do Wi-Fi.<br>(2) BT_ACTIVE deve usar PB08 ou PB45, WLAN_ACTIVE deve usar PB09 ou PB41, e BT_PRIORITY pode usar qualquer GPIO PB.<br></span> | Opcional |
| 6 | Se o chip Wi-Fi não oferecer arbitragem de coexistência de antena:<br>(1) Recomenda-se o modo de 1 fio: o Bluetooth controla a chave RF da antena Bluetooth/Wi-Fi, arbitra por meio de BT_ACTIVE e notifica o chip Wi-Fi.<br>(2) Se o Wi-Fi puder emitir um sinal de estado operacional, essa configuração pode passar ao modo de 2 fios: conecte a saída do Wi-Fi a WLAN_ACTIVE para que o Bluetooth bloqueie transmissões e recepções de baixa prioridade enquanto o Wi-Fi estiver ativo, sem afetar o Bluetooth quando o Wi-Fi estiver ocioso.<br>(3) BT_ACTIVE deve usar PB08 ou PB45, e WLAN_ACTIVE deve usar PB09 ou PB41 | Opcional |

</div>

### 5.8.9. Alocação de recursos de I/O { #589-io-resource-allocation }

<div align="center"><em>Tabela 5.8.9-1: Lista de verificação da alocação de recursos de I/O</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Foi fornecida uma tabela de alocação de GPIOs correspondente ao esquemático | Obrigatório |
| 2 | A alocação de GPIOs na tabela de recursos corresponde ao esquemático | Obrigatório |
| 3 | A alocação efetiva de GPIOs segue as recomendações da SiFli; consulte o arquivo de configuração de I/O do EVB | Obrigatório |

</div>

### 5.8.10. Despertar por hardware { #5810-hardware-wake-up }

<div align="center"><em>Tabela 5.8.10-1: Lista de verificação do despertar por hardware</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | <span class="flag-red">As fontes de interrupção de despertar do HCPU estão corretas: PA64, PA65, PA66, PA67, PA68 e PA69, seis pinos no total</span> | Obrigatório |
| 2 | <span class="flag-red">As fontes de interrupção de despertar do LCPU estão corretas: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2 e PBR3, dez pinos no total. Após o despertar do MCU, PBR0-PBR3 não podem receber sinais de interrupção</span> | Obrigatório |
| 3 | <span class="flag-red">Os sinais de interrupção e controle de periféricos conectados ao LCPU, como acelerômetro e sensor de frequência cardíaca, devem usar GPIOs PB</span> | Obrigatório |

</div>

### 5.8.11. Armazenamento { #5811-storage }

<div align="center"><em>Tabela 5.8.11-1: Lista de verificação do armazenamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | MPI3 está conectado ao NOR Flash ou SPI NAND Flash conforme previsto | Obrigatório |
| 2 | VDDIOSC permanece sempre ligada | Obrigatório |
| 3 | As alimentações de VDDIOSA e VDDIOSB são habilitadas por PBR0 | Obrigatório |
| 4 | MPI3 ou MPI4 pode ser usado para conectar NOR Flash ou SPI NAND Flash externo | Obrigatório |
| 5 | O pino HOLD# do SPI NAND Flash tem pull-up para sua alimentação por meio de um resistor de 10 kΩ | Obrigatório |
| 6 | Se a produção precisar programar Flash externo em MPI3 ou MPI4, a ferramenta de gravação coloca PA43 em nível alto para habilitar a alimentação de MPI3 | Obrigatório |
| 7 | Se a produção precisar programar eMMC ou SD NAND em SDIO1, a ferramenta de gravação habilita a alimentação correspondente | Obrigatório |
| 8 | <span class="flag-red">As chaves de alimentação controladas por PBR0/PA43 ligam em nível alto e desligam em nível baixo. No modo Hibernate, PBR0 controla a alimentação de VDDIOSA/VDDIOSB, VDDIOSC permanece sempre ligada e PA43 controla a alimentação do Flash externo</span> | Obrigatório |
| 9 | Se a interface SD1 estiver conectada a eMMC ou SD NAND, as conexões de sinal estão corretas | Obrigatório |
| 10 | O nível de I/O da interface eMMC ou SD NAND corresponde a VDDIOA2 | Obrigatório |
| 11 | As conexões de sinal de MPI3 ou MPI4 estão corretas | Obrigatório |
| 12 | O nível lógico de I/O do periférico corresponde ao do chip principal | Obrigatório |
| 13 | <span class="flag-red">O NOR Flash está qualificado no guia de seleção de componentes críticos</span> | Obrigatório |
| 14 | <span class="flag-red">O SPI/SD NAND Flash está qualificado no guia de seleção de componentes críticos</span> | Obrigatório |
| 15 | <span class="flag-red">O eMMC está qualificado no guia de seleção de componentes críticos</span> | Obrigatório |

</div>

<div align="center"><em>Tabela 5.8.11-2: Conexões de referência MPI4 para SPI NAND na EVB da SiFli</em></div>

<div align="center" markdown>

| Sinal SPI NAND | Pino do SF32LB58x | Observação de referência |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | Seleção do chip, ativa em nível baixo |
| SO | PA04 (SD1_D1) | Dados de entrada no chip (IO1) |
| WP# | PA01 (SD1_D2) | Sinal de proteção contra gravação (IO2) |
| SI | PA05 (SD1_D0) | Dados de saída do chip (IO0) |
| SCLK | PA09 (SD1_CLK) | Clock serial |
| HOLD# | PA06 (SD1_D3) | Linha IO3; pull-up para VDD18_MPI4 por meio de um resistor de 10 kΩ |

</div>

No esquema de referência da EVB, VCC da SPI NAND Flash é conectado a VDD18_MPI4; essa alimentação também tem capacitores de 0,1 µF e 1 µF (6,3 V). Essas atribuições de pinos e valores de componentes são específicos da referência da EVB. Antes de usá-los, confira o encapsulamento do chip selecionado, a folha de dados da Flash e a configuração de multiplexação de pinos da placa de destino.

A alimentação de E/S VDDIOA2 da SD1 aceita 1,8 V ou 3,3 V e deve corresponder ao nível de E/S do periférico. A SiFli recomenda uma interface de 1,8 V para SPI NAND Flash e eMMC. Os dispositivos SD NAND aceitam apenas 3,3 V; portanto, ao usar SD NAND, configure VDDIOA2 para 3,3 V.

### 5.8.12. Tela { #5812-display }

<div align="center"><em>Tabela 5.8.12-1: Lista de verificação do display</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O SF32LB58x conecta o display por DSI + LCDC2 conforme previsto | Obrigatório |
| 2 | As conexões dos sinais DSI estão corretas | Obrigatório |
| 3 | <span class="flag-red">Se a tela usar apenas QSPI, recomenda-se a interface QSPI LCDC1 do HCPU para evitar problemas de taxa de quadros e RAM</span> | Obrigatório |
| 4 | DSI_REXT está conectado ao GND por um resistor de 10 kΩ | Obrigatório |
| 5 | A conexão de RSTB do LCDC está correta | Obrigatório |
| 6 | A conexão de TE do LCDC está correta (ao sinal TE ou Fmark do painel) | Obrigatório |
| 7 | Os sinais TP seguem a atribuição de pinos recomendada (consulte o arquivo de configuração de I/O do EVB) | Obrigatório |
| 8 | A interface LCD oferece suporte a MIPI-DSI, SPI de 3/4 fios, SPI de dados dual/quad, DBI 8080, DPI e interfaces JDI paralela/serial | Obrigatório |
| 9 | <span class="flag-red">LCD SPI, modo de 3 fios: CS em PA44 ou PB08, CLK em PA46 ou PB10 e DATA em PA50 ou PB09;<br>modo de 4 fios: CS em PA44 ou PB08, CLK em PA46 ou PB10, DATA em PA50 ou PB09 e DC em PA48 ou PB03</span> | Obrigatório |
| 10 | Confirme se o LCD precisa oferecer suporte a AOD; se precisar, conecte o painel QSPI ao HCPU. O painel JDI pode ser conectado ao LCPU | Obrigatório |
| 11 | O nível lógico de I/O do periférico corresponde ao do chip principal | Obrigatório |
| 12 | Em LCDs DSI, conecte os sinais de dados e clock DSI. Painéis no modo de vídeo DSI comportam-se como painéis RGB e não têm sinal TE; painéis no modo de comando DSI têm sinal TE, e o DSI17801 requer TE. Recomenda-se conectar TE e RST; o uso final depende do LCD selecionado | Obrigatório |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabela 5.8.13-1: Lista de verificação do GPADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A entrada do GPADC está conectada ao pino correspondente | Opcional |
| 2 | A faixa de entrada do GPADC está correta; a tensão máxima não deve exceder AVDD33_ANA | Opcional |
| 3 | Divisor de tensão da bateria recomendado: resistor de 470 kΩ, 1%, no lado da alimentação; resistor de 1 MΩ, 1%, para terra; e capacitor de filtro de 100 nF | Obrigatório |
| 4 | <span class="flag-red">Para cada sinal medido pelo GPADC por meio de um divisor resistivo, use resistores com tolerância de 1%; cada canal GPADC deve ter um capacitor de filtro de 100 nF próximo ao pino do chip</span> | Obrigatório |
| 5 | <span class="flag-red">O ADC pode detectar várias teclas e economizar pinos; por exemplo, se PB32 for usado como tecla ADC, não use a bateria como alimentação do pull-up</span> | Obrigatório |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabela 5.8.14-1: Lista de verificação do SDMADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A entrada do SDMADC está conectada ao pino correspondente | Opcional |
| 2 | A faixa de entrada do SDMADC está correta; recomenda-se que a tensão máxima não exceda AVDD33_ANA | Opcional |
| 3 | As conexões de SDMADC_VREF e SDMADC_VSS_VREF estão corretas | Obrigatório |

</div>

### 5.8.15. Botões { #5815-buttons }

<div align="center"><em>Tabela 5.8.15-1: Lista de verificação dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Confirme com o cliente se o botão precisa permitir o despertar do sistema | Obrigatório |
| 2 | A conexão dos botões comuns está correta (há pull-up, com valor de resistência e domínio de tensão corretos) | Obrigatório |
| 3 | <span class="flag-red">O botão liga/desliga deve usar PB54, ser ativo em nível alto e reiniciar o chip após um pressionamento de 10 segundos; o resistor pull-down de 10 kΩ deve ficar na placa principal</span> | Obrigatório |
| 4 | Todos os sinais dos botões têm proteção contra ESD | Obrigatório |

</div>

### 5.8.16. Proteção contra sobrecarga elétrica (EOS) e descarga eletrostática (ESD) { #5816-eos-and-esd-protection }

<div align="center"><em>Tabela 5.8.16-1: Lista de verificação da proteção EOS e ESD</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A interface de carregamento tem proteção contra sobrecarga elétrica (EOS), descarga eletrostática (ESD) e sobretensão (OVP) | Obrigatório |
| 2 | O sinal de detecção de conexão do carregador tem um dispositivo de proteção ESD | Obrigatório |
| 3 | A interface da bateria tem um dispositivo de proteção ESD | Obrigatório |
| 4 | A interface da antena tem um dispositivo de proteção ESD | Obrigatório |
| 5 | As interfaces de alimentação do LCD e do TP têm dispositivos de proteção ESD | Obrigatório |
| 6 | As linhas I2C, RST e INT do TP têm dispositivos de proteção ESD | Obrigatório |
| 7 | A interface de alimentação e as linhas de sinal do sensor de frequência cardíaca têm dispositivos de proteção ESD | Obrigatório |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabela 5.8.17-1: Lista de verificação do I2C</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A atribuição do I2C considera a divisão entre HCPU e LCPU e se o dispositivo precisa operar em modo de baixo consumo | Obrigatório |
| 2 | O I2C tem pull-ups com o valor de resistência correto; para operação a 400 kHz, recomenda-se 2.2 kΩ. Use o domínio de tensão do periférico e desligue a alimentação dos pull-ups junto com o periférico | Obrigatório |
| 3 | O sinal de interrupção do I2C permite despertar por hardware quando necessário | Obrigatório |
| 4 | Se vários dispositivos compartilharem o mesmo barramento I2C, seus endereços são distintos | Obrigatório |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabela 5.8.18-1: Lista de verificação do I2S</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 aceita somente entrada e opera apenas no modo mestre; o microfone está conectado a I2S1 conforme previsto</span> | Opcional |
| 2 | <span class="flag-red">I2S2 aceita entrada e saída somente no modo mestre e pode ser conectado a dispositivos externos, como codec, DAC e ADC</span> | Opcional |
| 3 | <span class="flag-red">I2S3 aceita entrada e saída somente no modo mestre; é adequado para cenários de baixo consumo nos quais o HCPU dorme e o LCPU recebe/processa áudio por I2S3</span> | Opcional |
| 4 | As conexões dos sinais I2S estão corretas | Opcional |
| 5 | <span class="flag-red">A conexão do microfone digital à interface I2S1 está correta</span> | Opcional |
| 6 | O nível lógico de I/O do periférico corresponde ao do chip principal | Opcional |

</div>

### 5.8.19. PDM e áudio analógico { #5819-pdm-and-analog-audio }

<div align="center"><em>Tabela 5.8.19-1: Lista de verificação de PDM e áudio analógico</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A conexão dos dois microfones PDM está correta | Opcional |
| 2 | O microfone PDM é alimentado por uma fonte digital | Opcional |
| 3 | O nível lógico de I/O do periférico corresponde ao do chip principal | Opcional |
| 4 | A conexão dos dois microfones analógicos está correta | Opcional |
| 5 | O microfone analógico é alimentado pela saída MIC_BIAS | Opcional |
| 6 | Cada uma das duas entradas ADC de áudio tem um capacitor de bloqueio CC de pelo menos 2.2 uF | Opcional |
| 7 | Cada saída DAC, P e N, tem um resistor série de 1 kΩ, com um capacitor de 1.5 nF entre elas | Opcional |
| 8 | AW8155 é o amplificador de áudio recomendado; ao usar essa peça, configure o software para o modo 4 / Class AB | Opcional |
| 9 | <span class="flag-red">Ao realimentar a saída do PA de áudio para o ADC do MCU, adicione um divisor e filtro RC ou uma filtragem digital adicional; a tensão dividida deve permanecer na faixa de entrada do ADC, e a frequência de corte do filtro RC deve ser 20 kHz</span> | Opcional |
| 10 | <span class="flag-red">Se a via ADC de áudio analógico integrada ao chip não for usada, recomenda-se conectar ADC1P/ADC1N e ADC2P/ADC2N ao terra, cada par por meio de um resistor série de 0 Ω</span> | Opcional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabela 5.8.20-1: Lista de verificação do SPI</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A conexão do SPI está correta; SDO e SDI estão cruzados corretamente entre o MCU e o periférico | Opcional |
| 2 | Os requisitos de temporização do periférico SPI foram confirmados e são atendidos | Opcional |
| 3 | O nível lógico de I/O do periférico corresponde ao do chip principal | Opcional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabela 5.8.21-1: Lista de verificação do USART</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | O USART4 foi definido como interface de download e log | Obrigatório |
| 2 | <span class="flag-red">O USART4 tem pontos de teste; recomenda-se colocar um resistor série de 100 Ω em TXD e RXD</span> | Obrigatório |
| 3 | <span class="flag-red">O USART1 tem um ponto de teste</span> | Obrigatório |
| 4 | Os dispositivos que precisam operar no HCPU estão conectados ao USART2 ou USART3 | Opcional |
| 5 | Os dispositivos que precisam operar no LCPU estão conectados ao USART5 ou USART6 | Opcional |
| 6 | Na conexão com um periférico, RXD e TXD estão cruzados corretamente | Obrigatório |
| 7 | O nível lógico de I/O do periférico corresponde ao do chip principal | Obrigatório |
| 8 | Os pontos de teste USART não utilizados foram reservados para uso de reserva | Opcional |
| 9 | <span class="flag-red">Recomenda-se conectar periféricos UART à interface do HCPU, evitando que o software do HCPU use uma interface UART do LCPU</span> | Obrigatório |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabela 5.8.22-1: Lista de verificação do PWM</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A alocação do pino PWM da retroiluminação está correta; use um GPTIMx diferente do PWM do motor, de preferência na interface PB, para evitar que a redução da frequência do HCPU afete a retroiluminação | Obrigatório |
| 2 | A alocação do pino PWM do motor está correta; use um GPTIMx diferente do PWM da retroiluminação, de preferência na interface PB, para evitar que a redução da frequência do HCPU afete a vibração | Obrigatório |
| 3 | Para controlar o motor por PWM, selecione um GPIO desabilitado por padrão, a fim de evitar comportamento anormal durante a gravação do firmware quando for usado um motor SMT | Obrigatório |
| 4 | Os sinais que exigem saída PWM devem usar a interface PB; verifique também se há comportamento anormal na inicialização a frio | Obrigatório |

</div>

### 5.8.23. Depuração { #5823-debug }

<div align="center"><em>Tabela 5.8.23-1: Lista de verificação de depuração</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | As conexões dos sinais SWD estão corretas | Obrigatório |
| 2 | O conector J-Link ou os pontos de teste incluem corretamente a referência da alimentação de I/O | Obrigatório |
| 3 | <span class="flag-yellow">Durante a gravação do programa, as alimentações PVDD, VDDIO, VDDSC e similares devem estar ligadas; AVDD18_DSI (alimentação de CAU2) também deve estar ligada</span> | Obrigatório |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabela 5.8.24-1: Lista de verificação do USB</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | A conexão da interface USB está correta | Opcional |
| 2 | A interface USB tem proteção contra ESD | Opcional |
| 3 | Durante a operação normal, sem suspensão, o computador ou dispositivo consegue detectar a conexão e a remoção enquanto o USB permanecer habilitado;<br>se o MCU entrar em suspensão e ainda precisar detectar conexão e remoção, adicione um divisor resistivo em VBUS. A saída do divisor deve fornecer nível alto compatível com a tensão de I/O e ser conectada a um pino de despertar do MCU. Recomenda-se compartilhar o pino de despertar usado para detectar a conexão do carregador | Opcional |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>Tabela 5.8.25-1: Lista de verificação do PBR</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Durante a inicialização, PBR0 muda de 0 para 1 e pode ser usado para controlar algumas chaves de carga externas; PBR1-PBR5 têm saída baixa por padrão | Obrigatório |
| 2 | PBR0-PBR5 podem ser usados como saídas nos modos Standby e Hibernate | Opcional |
| 3 | PBR0-PBR5 podem gerar sinais LPTIM | Opcional |
| 4 | <span class="flag-red">Para o SF32LB567, recomenda-se o LPTIM3: LPTIM3_OUT e LPTIM3_OUT_BAR geram, nos pinos PBR, sinais de 21 a 25 kHz com ciclos de trabalho diferentes e polaridades opostas</span> | Opcional |
| 5 | <span class="flag-red">Os sinais de 21 a 25 kHz, com ciclos de trabalho diferentes e polaridades opostas, também podem ser gerados pelo ATIM do HCPU. Selecione os sinais ATIMx_CHx e ATIMx_CHxN adequados junto com Pin_Config e considere o efeito da redução da frequência do HCPU</span> | Opcional |
| 6 | PBR0-PBR5 podem gerar um sinal de clock de 32 kHz | Opcional |
| 7 | <span class="flag-red">PBR0-PBR3 podem ser configurados como entradas de despertar. Porém, após o despertar do MCU, PBR0-PBRx não recebem sinais de interrupção e detectam apenas níveis 0/1; use essa configuração com cautela</span> | Opcional |

</div>

!!! note "Aplicabilidade da fonte e verificação"
    O item 4 da lista PBR na [planilha de verificação original](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) menciona o SF32LB567. No entanto, a planilha não confirma que os itens 4 e 5 da lista PBR sejam recomendações para o SF32LB58x; confirme a aplicabilidade com a SiFli antes de adotá-los.

    O item 6 da lista de armazenamento da planilha diz que, durante a gravação em produção, PA43 deve ser levado ao nível alto para habilitar a “alimentação do MPI3”. Já a [nota oficial de aplicação de hardware do SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md) descreve PA43 como o controle de alimentação da Flash externa e orienta levá-lo ao nível alto para alimentar essa Flash. A linha da checklist mantém o texto da planilha. Antes de fechar o procedimento de gravação em produção, confirme com a SiFli qual trilho de alimentação e quais interfaces PA43 realmente controla.

### 5.8.26. Consumo de energia { #5826-power-consumption }

<div align="center"><em>Tabela 5.8.26-1: Lista de verificação do consumo de energia</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Para todos os pinos de habilitação de MOSFET, LDO e DCDC usados na comutação da alimentação, reserve um resistor pull-down de 1 MΩ para GND quando o pino for ativo em nível alto | Obrigatório |
| 2 | O requisito de corrente de referência no modo Hibernate está registrado | Obrigatório |
| 3 | <span class="flag-red">A soma das correntes de referência dos periféricos selecionados no modo Hibernate está registrada e atende aos requisitos do projeto</span> | Obrigatório |
| 4 | O requisito de corrente de referência no modo Standby está registrado | Obrigatório |
| 5 | <span class="flag-red">A soma das correntes de referência dos periféricos selecionados no modo Standby está registrada e atende aos requisitos do projeto</span> | Obrigatório |

</div>

### 5.8.27. Gravação e calibração do cristal { #5827-download-and-crystal-calibration }

<div align="center"><em>Tabela 5.8.27-1: Lista de verificação de gravação e calibração do cristal</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Categoria |
|:---|:---|:---|
| 1 | Para gravação por SWD, reserve pontos de teste para VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA e VDDIOB | Obrigatório |
| 2 | Se for necessária uma placa de gravação offline para programar o firmware, reserve pontos de teste para VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN e VDDIOA | Opcional |
| 3 | Se for necessária a calibração do cristal, reserve um ponto de teste para essa finalidade; recomenda-se PB45 | Opcional |

</div>
