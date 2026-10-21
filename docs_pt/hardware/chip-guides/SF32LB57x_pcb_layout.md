---
icon: lucide/layers
hide:
    - navigation
description: "Diretrizes de layout de PCB do SF32LB57x: empilhamento, restrições críticas, roteamento de alimentação/cristal/RF/analógico/áudio/alta velocidade, EMI/ESD/EOS."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB57x — diretrizes de layout de PCB { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte do guia de projeto de hardware do SF32LB57x"
    Esta página aborda a Seção 6, diretrizes de layout de PCB. Volte para [Armazenamento e fabricação](SF32LB57x_schematic_storage_mfg.md) ou avance para [Checklist de revisão do projeto e referências](SF32LB57x_review_and_reference.md).

## 6. Diretrizes de layout de PCB { #6-pcb-layout-guidelines }

### 6.1. Empilhamento de camadas { #61-stack-up }

O SF32LB57x está disponível nos encapsulamentos QFN68L (7 x 7 mm, 68 pinos, passo de 0,35 mm) e QFN80L (8 x 8 mm, 80 pinos, passo de 0,35 mm). Em geral, projetos QFN podem usar uma PCB PTH de 4 camadas e permitem componentes em uma ou nas duas faces; alguns componentes, como capacitores, podem ser montados na face inferior da PCB.<!-- BGA-ONLY --> O encapsulamento BGA112 mede 5,4 x 4,4 mm, tem 112 esferas e passo de 0,4 mm. Projetos BGA normalmente exigem pelo menos 4 camadas e, conforme a dificuldade de fanout, podem usar HDI de primeira ordem com vias cegas/enterradas. Os componentes também podem ser montados em uma ou nas duas faces.<!-- /BGA-ONLY -->

Um bom empilhamento oferece:

- Acesso pela camada superior aos componentes críticos e trajetos curtos.
- Um plano interno de terra sólido.
- Distribuição de alimentação com baixa impedância.
- Referência de terra contínua para sinais de alta velocidade, RF, cristal, áudio e sinais analógicos.

Os desenhos de empilhamento de referência especificam os materiais e as faixas de espessura total abaixo. Confirme com o fabricante da PCB o empilhamento final e a tolerância de espessura acabada.

<div align="center"><em>Tabela 6.1-1: Materiais e espessuras dos empilhamentos de referência QFN</em></div>

<div align="center" markdown>

| Empilhamento de referência | Núcleo | Prepreg | Faixa de espessura total |
|:-----|:-----|:-----|:-----|
| QFN, 1,6 mm | Núcleo de cobre H/HOZ de 1,1 mm | 7628 RC49%, indicação do material 8,6 mil; coluna de espessura 8,28 mil (0,2104 mm) | 1,43–1,74 mm |
| QFN, 0,8 mm | Núcleo H/HOZ de 0,25 mm, sem cobre | 7628 RC49%, indicação do material 8,6 mil; coluna de espessura 8,28 mil (0,2104 mm) | 0,67–0,87 mm |

</div>

!!! warning "Conflito na fonte: identificação e espessura do prepreg QFN"
    As figuras de empilhamento QFN 3-1-2-1 e 3-1-2-2 do guia PCB original, transcritas aqui na tabela 6.1-1, identificam o prepreg como `7628 RC49%, 8.6 mil`, enquanto a coluna de espessura informa `8.28 mil (0.2104 mm)`. A fonte não explica a diferença nem qual valor deve controlar a fabricação. Sem confirmação da SiFli, não escolha nenhum dos valores nem substitua um pelo outro em um empilhamento liberado.

<!-- BGA-ONLY -->
<div align="center"><em>Tabela 6.1-2: Materiais e espessuras dos empilhamentos de referência BGA</em></div>

<div align="center" markdown>

| Empilhamento de referência | Núcleo | Prepreg | Faixa de espessura total |
|:-----|:-----|:-----|:-----|
| BGA, 1,6 mm | Núcleo de cobre H/HOZ de 1,3 mm | 1080 RC67%, indicação do material 3,3 mil; coluna de espessura 3,01 mil (0,0764 mm) | 1,37–1,67 mm |
| BGA, 0,8 mm | Núcleo H/H de 0,55 mm, sem cobre | 1080 RC67%, indicação do material 3,3 mil; coluna de espessura 3,01 mil (0,0764 mm) | 0,70–0,90 mm |

</div>

!!! warning "Conflito na fonte: identificação e espessura do prepreg BGA"
    As figuras de empilhamento BGA 3-1-2-3 e 3-1-2-4 do guia PCB original, transcritas aqui na tabela 6.1-2, identificam o prepreg como `1080 RC67%, 3.3 mil`, enquanto a coluna de espessura informa `3.01 mil (0.0764 mm)`. A fonte não explica a diferença nem qual valor deve controlar a fabricação. Sem confirmação da SiFli, não escolha nenhum dos valores nem substitua um pelo outro em um empilhamento liberado.
<!-- /BGA-ONLY -->

Os quatro empilhamentos de referência usam cobre de 1 oz nas camadas L1/L4 (1,38 mil; 0,0350 mm) e cobre de 0,60 mil (0,0152 mm) em cada face das camadas L2/L3.

Em uma PCB QFN de 4 camadas, recomenda-se esta distribuição: Camada 1 (superior) — preenchimento de terra, posicionamento dos componentes e roteamento de sinais; Camada 2 — plano de terra sólido, sem sinais, para preservar a integridade da referência; Camada 3 — plano de alimentação, que pode ser dividido por domínio e também receber sinais; Camada 4 (inferior) — preenchimento de terra e roteamento de sinais.

### 6.2. Referência rápida das restrições críticas de PCB { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>Tabela 6.2-1: Referência rápida das restrições críticas de PCB</em></div>

<div align="center" markdown>

| Item | Restrição / referência da fonte | Observações |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | Largura da trilha >= 0,4 mm (cerca de 16 mil) | Os caminhos do carregador e da bateria conduzem correntes mais altas; mantenha-os curtos e largos, afastados de sinais sensíveis. |
| `VCC` / `PVDD` | Valores conflitantes na fonte: a seção 3.2.1 do guia PCB exige >= 0,4 mm; o item 44 da tabela 4-2-1-1 (variantes alimentadas por bateria) exige `VCC` >= 12 mil, enquanto o item 47 (variantes de 3,3 V) tem o título `PVDD`, mas verifica `VCC` >= 12 mil. | Confirme com a SiFli a linha de alimentação, o escopo da variante e a largura aplicável; não escolha com base apenas nessas referências. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | Largura da trilha >= 10 mil | Somente para variantes alimentadas por bateria; verifique o limite de corrente de soft-start, a corrente de inrush e a carga permitida. |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`: >= 10 mil; `BUCK_FB`: > 0,25 mm | Mantenha `BUCK_LX` curto e largo; consulte a seção 6.3 sobre posicionamento e área sem cobre. |
| `AVDD_BRF` / `AVDD33_AUD` | Largura da trilha >= 8 mil | Mantenha as alimentações analógicas, de RF e de áudio curtas, limpas e com filtragem separada. |
| USB DP/DN | Diferencial de 90 Ω | Passe primeiro pela proteção ESD, evite derivações e mantenha contínua a referência de terra. |
| Trilha da antena RF | 50 Ω não balanceado | Prefira a camada superior, com poucas vias, referência de terra contínua e blindagem por vias de terra. |
| Largura do cobre de terra nos dois lados da trilha RF | >= 60 mil em cada lado | Conecte o cobre dos dois lados ao terra principal por várias vias. |
| Trilhas do cristal de 48 MHz | Cerca de 3 mm a 10 mm | Prefira a camada superior; use blindagem de terra e deixe uma área sem cobre sob o cristal. |
| Trilhas do cristal de 32,768 kHz | <= 10 mm | Mantenha espaçamento entre as trilhas, adicione blindagem e evite fontes de ruído. |
| Posicionamento do cristal | >= 1,5 mm do pino de clock do chip; > 1 mm da borda da placa; >= 5 mm de fontes de calor como PA, carregamento e PMU | Aplica-se aos cristais de 48 MHz e 32,768 kHz. |
| Barramento MPI | Comprimento total <= 20 mm, skew do grupo <= 3 mm | Roteie clock, dados e comando como um grupo, com referência de terra contínua. |
| Barramento SDIO | Comprimento total <= 50 mm, skew do grupo <= 6 mm | Roteie CLK, CMD e DATA como um grupo sobre uma referência de terra contínua. |
| `VDDIOA` | Largura da trilha >= 10 mil | Somente variantes com alimentação de 3,3 V. |

</div>

As figuras de regras PTH e HDI também apresentam valores de fabricação de referência: largura mínima e recomendada de trilha de 0,10 mm para PTH e 0,075 mm para HDI, com máximo de 2,54 mm em ambos. Os exemplos de vias mostram furo de 0,25 mm com pad de 0,45 mm para PTH e furo de 0,10 mm com pad de 0,23 mm para microvia HDI (o exemplo de via passante é 0,25 mm/0,45 mm). São construções de referência; confirme a capacidade e as regras reais do fabricante antes de liberar a placa.

### 6.3. Layout da alimentação { #63-power-layout }

- Mantenha curtos e largos os caminhos de alimentação que conduzem correntes elevadas.
- Mantenha os caminhos de carga afastados das trilhas analógicas sensíveis, de RF e dos cristais.
- Posicione os capacitores de filtro de VCC, PVDD, VBUS e VBAT perto dos pinos do chip. A seção 3.2.1 do guia PCB indica largura mínima de 0,4 mm para `VCC` / `PVDD`, mas o item 47 da tabela de autoverificação 4-2-1-1 traz um valor conflitante de 12 mil (título `PVDD`, detalhe da verificação `VCC`); não defina a largura da trilha de nenhuma das linhas de alimentação até que a SiFli confirme o requisito aplicável. Posicione também perto dos pinos os capacitores de filtro das outras saídas, incluindo VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD e AVDD_BRF. Dimensione essas trilhas conforme a corrente de entrada e mantenha-as curtas e largas para reduzir a ondulação da alimentação e melhorar a estabilidade.
- Se PVDD, AVDD_BRF, AVDD33 ou AVDD33_AUD compartilharem uma fonte, use ramificações em estrela independentes a partir da origem; não compartilhe um trecho de alimentação a montante.
- Roteie VBUS e VBAT como ramificações em estrela independentes, sem trechos compartilhados. Evite que sinais sensíveis corram em paralelo com esses caminhos de carga.
- Posicione o indutor BUCK e os capacitores de filtro perto dos pinos do chip. Mantenha BUCK_LX curto e largo e use largura superior a 0,25 mm para BUCK_FB. Conecte os terminais de terra dos capacitores de saída DC/DC ao plano principal com várias vias de terra. Não aplique cobre na camada superior sob o indutor, mantenha um plano de referência contínuo na camada adjacente e não passe outros sinais pela área do indutor.
- Conecte o terra dos capacitores ao terra principal por vias próximas.
- Nas variantes alimentadas a 3,3 V, use roteamento em estrela para as linhas de alimentação analógicas, de RF e de IO mais importantes.

!!! warning "Conflitos não resolvidos sobre as linhas de alimentação na fonte"
    - **Largura das trilhas e identificação da linha de alimentação:** A seção 3.2.1 do guia original de PCB exige pelo menos 0,4 mm (cerca de 15,7 mil) para `VCC` e `PVDD`. O item 44 da tabela de autoverificação 4-2-1-1, aplicável às variantes alimentadas por bateria, exige pelo menos 12 mil para `VCC`; o item 47, aplicável às variantes de 3,3 V, tem o título `PVDD`, mas seu detalhe de verificação exige pelo menos 12 mil para `VCC`. A fonte não concilia essas larguras nem esclarece se o título ou o detalhe do item 47 identifica a linha de alimentação pretendida. Não infira um valor corrigido nem aplique uma entrada às duas variantes de alimentação; antes de fechar o projeto, confirme com a SiFli a linha de alimentação, o escopo e a largura aplicáveis.
    - **Nomes das saídas:** A seção 3.2.1 do guia PCB original usa `VDD_VOUT1` / `VDD_VOUT2`, enquanto os itens 45/46 da tabela de autoverificação 4-2-1-1 e a tabela de referência rápida da seção 6.2 desta página usam `VDD33_VOUT1` / `VDD33_VOUT2`. O título do item 46 repete `VDD33_VOUT1`, mas o detalhe de verificação indica `VDD33_VOUT2`. A fonte não informa se os nomes são aliases ou redes distintas.
    Sem a confirmação da SiFli, ao fechar o projeto não escolha uma largura, não atribua o item 47 a uma linha de alimentação e não trate as variantes de nome das saídas como equivalentes.

### 6.4. Layout dos cristais { #64-crystal-layout }

- Mantenha uma referência de terra sólida e contínua sob o circuito de RF e o chip principal; não divida nem abra fendas no plano de terra. Para a área do cristal, a fonte também exige uma referência de terra contínua e a remoção de cobre sob o cristal. Consulte o aviso abaixo e não finalize a geometria de cobre dessa área antes de a SiFli confirmar os limites para o empilhamento escolhido.
- Posicione os cristais a pelo menos 1,5 mm do pino de clock do chip, a mais de 1 mm da borda e a pelo menos 5 mm de fontes de calor como PA, carregamento e PMU, para limitar a deriva de frequência causada pela temperatura. A fonte indica pelo menos 0,25 mm de afastamento do cobre da camada superior ao redor do encapsulamento e remete ao projeto de referência para as camadas adjacentes, mas não explica como essa medida se relaciona à área sem cobre sob o encapsulamento. Confirme os limites aplicáveis com a SiFli antes de liberar o layout. Não roteie sinais digitais de alta frequência diretamente sob o cristal; se possível, evite qualquer trilha nessa área. Afaste dos cristais componentes magnéticos, como indutores de potência.
- Roteie XI/XO somente na camada superior, sem mudanças de camada. Mantenha as trilhas curtas e simétricas e faça blindagem tridimensional com vias de terra próximas dos dois lados. Posicione os capacitores de carga em ambos os lados do cristal, perto das extremidades das trilhas junto ao cristal, e conecte cada pad de terra perto do pad de terra do cristal. Mantenha vias de alimentação afastadas das trilhas do cristal.
- Para o cristal de 48 MHz, use trilhas na camada superior com 3 a 10 mm de comprimento e 0,1 mm de largura. Mantenha pelo menos 0,15 mm entre as trilhas paralelas 48M_XI e 48M_XO e faça blindagem tridimensional de terra. Afaste-as de VBAT, DC/DC e sinais de alta velocidade; deixe livres a camada superior e as camadas adjacentes na área do cristal.
- Para o cristal de 32,768 kHz, use trilhas na camada superior com até 10 mm de comprimento e 0,1 mm de largura. O modelo de roteamento especifica pelo menos 0,15 mm entre 32K_XI e 32K_XO em paralelo, enquanto a lista de autoverificação exige mais que o dobro da largura da trilha (>0,2 mm para 0,1 mm de largura). Não fixe a separação final até que a SiFli confirme qual requisito aplicar. Aplique blindagem tridimensional de terra e deixe livres a camada superior e as camadas adjacentes na área do cristal.

!!! warning "Conflitos não resolvidos nas instruções de layout do cristal"
    - **Blindagem de terra e área sem cobre:** A seção 3.3 do guia de PCB exige um plano de referência de terra contínuo na região do cristal e uma área sem cobre na camada TOP ao redor dele. A figura 3-3-1 (reproduzida aqui como figura 6.9-30) indica pelo menos 0,25 mm ao redor do encapsulamento. Já o item 6 da tabela original de autoverificação 4-3-1 exige blindagem GND completa ao redor do cristal e das trilhas do oscilador, enquanto o item 7 determina ausência de cobre sob o cristal somente na TOP em uma PCB PTH de 4 camadas e na TOP e camada 2 em uma HDI de 6 camadas. A fonte não delimita a área blindada em relação à área sem cobre nem explica como aplicar a exigência de terra contínua nas camadas sem cobre previstas para cada empilhamento. Esse conflito de escopo continua sem solução; não deduza o padrão de cobre ou de terra por camada.
    - **Espaçamento das trilhas de 32,768 kHz:** A seção 3.3 do guia de PCB e o modelo de roteamento da figura 3-3-4 (reproduzida aqui como figura 6.9-33) especificam pelo menos 0,15 mm entre as trilhas paralelas `32K_XI` / `32K_XO`. O item 9 da tabela original de autoverificação 4-3-1 exige espaçamento superior ao dobro da largura básica da trilha, isto é, mais de 0,2 mm para a trilha de 0,1 mm indicada no guia. Os requisitos mínimos de espaçamento são conflitantes.
    - **Escopo da folga ao redor do encapsulamento:** A figura 3-3-1 (reproduzida aqui como figura 6.9-30) especifica pelo menos 0,25 mm de afastamento do cobre da camada TOP ao redor do encapsulamento. O item 7 da tabela 4-3-1 define separadamente quais camadas devem ficar sem cobre sob o cristal nos dois empilhamentos, mas a fonte não explica a relação entre a folga periférica de 0,25 mm, as áreas sob o encapsulamento e as restrições de roteamento nas camadas adjacentes.
    Esses conflitos e lacunas de escopo permanecem sem solução na documentação original da SiFli. Antes de liberar o layout, confirme os requisitos para o encapsulamento e o empilhamento reais; não escolha entre os espaçamentos nem deduza os limites de terra ou de área sem cobre por camada.

### 6.5. Layout de RF { #65-rf-layout }

- Posicione a rede de casamento RF perto do chip e afastada da antena. Coloque o capacitor de filtro AVDD_BRF junto ao pino do chip e conecte seu terra diretamente ao plano principal por uma via.
- Mantenha as trilhas RF curtas e use o menor número de vias que seja prático.
- Priorize o roteamento RF na camada superior e evite mudanças de camada. Quando aplicável, recomenda-se uma largura de trilha superior a 10 mil. Preveja blindagem tridimensional de terra, evite ângulos agudos e retos, controle a impedância em 50 Ω conforme o empilhamento da PCB e distribua vias de terra densamente nos dois lados para formar uma cerca contínua.
- Mantenha a área da antena livre conforme os requisitos do fabricante e as restrições de design industrial do produto.
- Diferenças entre a largura do pad de um componente de casamento e a largura da trilha podem causar descontinuidade de impedância. Uma abertura no plano de referência sob os pads, dimensionada conforme os próprios pads, pode ajudar a manter a continuidade.
- Se usar um conector de antena IPEX, remova o cobre de todas as camadas da PCB sob o conector. Simule as antenas de PCB e ajuste-as na placa real; reserve uma rede de casamento CLC e posicione-a o mais perto possível da antena.
- Afaste RF do FPC do LCD, de USB, SDIO, DC/DC, cristais e caminhos de carregamento.

### 6.6. Sinais analógicos e áudio { #66-analog-and-audio }

- Posicione os capacitores de filtro de AVDD33_AUD, MIC_BIAS e AUD_VREF junto aos respectivos pinos do chip e conecte cada terra de forma confiável ao terra principal da PCB.
- Posicione a desacoplagem das alimentações analógicas perto do chip.
- Compatibilize os comprimentos das trilhas diferenciais de áudio e posicione as redes RC perto do chip.
- Posicione os componentes periféricos da entrada ADCP perto dos pinos do chip. Mantenha as trilhas curtas, faça blindagem de terra tridimensional e afaste-as de fontes fortes de interferência.
- Posicione os componentes periféricos das saídas DACP/DACN perto dos pinos do chip. Roteie cada par P/N como diferencial, mantenha-o curto e limite a capacitância parasita a menos de 10 pF. Faça blindagem tridimensional de terra e afaste as trilhas de fontes fortes de interferência.
- Faça blindagem tridimensional de terra nas trilhas GPADC e mantenha-as afastadas de circuitos que possam interferir, como detecção de bateria e temperatura.
- Evite passar retornos de alta corrente pela área de áudio.

### 6.7. Interfaces de alta velocidade { #67-high-speed-interfaces }

- Roteie USB DP/DN como um par diferencial de 90 Ω e faça os sinais passarem primeiro pela proteção ESD.
- Agrupe os sinais de armazenamento MPI: comprimento total ≤20 mm e diferença de comprimento no grupo ≤3 mm. Aplique blindagem tridimensional de terra a clock, dados e comandos e mantenha a referência de terra contínua.
- Agrupe os sinais SDIO: comprimento total ≤50 mm e diferença de comprimento no grupo ≤6 mm. Aplique blindagem tridimensional de terra a clock, comandos e dados.
- Roteie os barramentos paralelos de display, como RGB/DPI, 8080 e EPD, sobre uma referência de terra contínua.
- Faça os sinais USB PA35 (USB_DP) e PA36 (USB_DN) passarem pela proteção ESD antes de chegar ao chip. Use roteamento diferencial de 90 Ω com blindagem tridimensional de terra e conecte o terra do dispositivo ESD de forma confiável ao terra principal.
- Reserve posições para resistores em série nos clocks de alta velocidade, caso seja necessário ajustar EMI.

### 6.8. EMI, ESD e EOS { #68-emi-esd-and-eos }

- Revise a proteção ESD de todas as interfaces externas.
- Evite trechos longos na camada externa, fora da blindagem metálica, para clocks, alimentação e outros sinais ruidosos; roteie-os pelas camadas internas.
- Posicione cada dispositivo de proteção ESD junto ao pino correspondente do conector. O sinal deve passar pela proteção antes de chegar ao circuito seguinte, sem ramificações antes do dispositivo. Conecte seu pino de terra diretamente ao terra principal por vias e use uma ligação curta e larga.
- USB, carregador, conector da bateria, botões, toque, display, sensor de frequência cardíaca e antena são pontos prioritários de proteção.
- Posicione o ponto de teste da linha de carga USB antes do TVS. Coloque o TVS do conector da bateria antes do circuito do chip, de modo que o sinal passe pelo TVS antes de chegar ao chip.
- Considere em conjunto OVP, EOS e ESD na proteção da entrada do carregador.

### 6.9. Figuras de referência de PCB { #69-pcb-reference-figures }

As figuras a seguir mostram dimensões do encapsulamento, padrões de pads da PCB, empilhamento, fanout, roteamento e proteção do SF32LB57x e servem como referências visuais principais para novos projetos.

A referência de pads QFN80L indica 5,90 mm para o pad central exposto; o desenho do encapsulamento indica 5,50 mm nominal (5,40–5,60 mm). Eles descrevem o pad da PCB e o do encapsulamento, respectivamente; não trate essas dimensões como intercambiáveis. Verifique a revisão do encapsulamento e o footprint recomendado pela SiFli antes de criar a biblioteca. As referências de estêncil QFN68L/QFN80L usam espessura de 0,125 mm e cobertura de pasta declarada de 60% no pad exposto; peça ao fabricante do estêncil que confira as dimensões das aberturas em relação a essa cobertura.

<!-- BGA-ONLY -->
A referência de estêncil BGA112 usa espessura de 0,075 mm, 112 aberturas quadradas de 0,18 mm e raios de canto R0,05 mm.
<!-- /BGA-ONLY -->

![Figura 6.9-1: Dimensões do encapsulamento QFN68L (7 × 7 × 0,9 mm)](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-1: Dimensões do encapsulamento QFN68L (7 × 7 × 0,9 mm)</em></div>

![Figura 6.9-2: Dimensões do encapsulamento QFN68L (7 × 7 × 1,1 mm)](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-2: Dimensões do encapsulamento QFN68L (7 × 7 × 1,1 mm)</em></div>

![Figura 6.9-3: Footprint de PCB do QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-3: Footprint de PCB do QFN68L</em></div>

![Figura 6.9-4: Abertura do estêncil do QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-4: Abertura do estêncil do QFN68L</em></div>

![Figura 6.9-5: Dimensões do encapsulamento QFN80L (8 × 8 × 0,9 mm)](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-5: Dimensões do encapsulamento QFN80L (8 × 8 × 0,9 mm)</em></div>

![Figura 6.9-6: Dimensões do encapsulamento QFN80L (8 × 8 × 1,1 mm)](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-6: Dimensões do encapsulamento QFN80L (8 × 8 × 1,1 mm)</em></div>

![Figura 6.9-7: Footprint de PCB do QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-7: Footprint de PCB do QFN80L</em></div>

![Figura 6.9-8: Abertura do estêncil do QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-8: Abertura do estêncil do QFN80L</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-9: Dimensões do encapsulamento BGA112 (5,4 × 4,4 × 0,98 mm)](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-9: Dimensões do encapsulamento BGA112 (5,4 × 4,4 × 0,98 mm)</em></div>

![Figura 6.9-10: Dimensões do encapsulamento BGA112 (5,4 × 4,4 × 1,03 mm)](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-10: Dimensões do encapsulamento BGA112 (5,4 × 4,4 × 1,03 mm)</em></div>

![Figura 6.9-11: Footprint de PCB do BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-11: Footprint de PCB do BGA112</em></div>

![Figura 6.9-12: Abertura do estêncil do BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-12: Abertura do estêncil do BGA112</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-13: Referência de empilhamento de camadas da PCB para QFN (1,6 mm)](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-13: Referência de empilhamento de camadas da PCB para QFN (1,6 mm)</em></div>

![Figura 6.9-14: Referência de empilhamento de camadas da PCB para QFN (0,8 mm)](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-14: Referência de empilhamento de camadas da PCB para QFN (0,8 mm)</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-15: Referência de empilhamento de camadas da PCB para BGA (1,6 mm)](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-15: Referência de empilhamento de camadas da PCB para BGA (1,6 mm)</em></div>

![Figura 6.9-16: Referência de empilhamento de camadas da PCB para BGA (0,8 mm)](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-16: Referência de empilhamento de camadas da PCB para BGA (0,8 mm)</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-17: Regras de projeto de PCB com PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-17: Regras de projeto de PCB com PTH</em></div>

![Figura 6.9-18: Regras de projeto de vias PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-18: Regras de projeto de vias PTH</em></div>

![Figura 6.9-19: Regras de projeto de PCB HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-19: Regras de projeto de PCB HDI</em></div>

![Figura 6.9-20: Regras de projeto de vias HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-20: Regras de projeto de vias HDI</em></div>

![Figura 6.9-21: Referência de fanout na camada superior do QFN68](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-21: Referência de fanout na camada superior do QFN68</em></div>

![Figura 6.9-22: Referência de fanout na camada superior do QFN80](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-22: Referência de fanout na camada superior do QFN80</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-23: Referência de fanout do BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-23: Referência de fanout do BGA112</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-24: Roteamento da alimentação VCC para QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-24: Roteamento da alimentação VCC para QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-25: Roteamento da alimentação VCC para BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-25: Roteamento da alimentação VCC para BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-26: Roteamento de VBUS e VBAT para QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-26: Roteamento de VBUS e VBAT para QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-27: Roteamento de VBUS e VBAT para BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-27: Roteamento de VBUS e VBAT para BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-28: Roteamento do conversor DCDC para QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-28: Roteamento do conversor DCDC para QFN</em></div>

<!-- BGA-ONLY -->
![Figura 6.9-29: Roteamento do conversor DCDC para BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-29: Roteamento do conversor DCDC para BGA</em></div>
<!-- /BGA-ONLY -->

![Figura 6.9-30: Área de exclusão para posicionamento do cristal](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-30: Área de exclusão para posicionamento do cristal</em></div>

![Figura 6.9-31: Modelo de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-31: Modelo de roteamento do cristal de 48 MHz</em></div>

![Figura 6.9-32: Referência de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-32: Referência de roteamento do cristal de 48 MHz</em></div>

![Figura 6.9-33: Modelo de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-33: Modelo de roteamento do cristal de 32,768 kHz</em></div>

![Figura 6.9-34: Referência de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-34: Referência de roteamento do cristal de 32,768 kHz</em></div>

![Figura 6.9-35: Layout da rede de casamento de impedância de RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-35: Layout da rede de casamento de impedância de RF</em></div>

![Figura 6.9-36: Referência de roteamento do sinal de RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-36: Referência de roteamento do sinal de RF</em></div>

![Figura 6.9-37: Layout do filtro da alimentação de áudio](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-37: Layout do filtro da alimentação de áudio</em></div>

![Figura 6.9-38: Layout da entrada de áudio analógico](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-38: Layout da entrada de áudio analógico</em></div>

![Figura 6.9-39: Layout da saída de áudio analógico](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-39: Layout da saída de áudio analógico</em></div>

![Figura 6.9-40: Modelo de roteamento SDIO](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-40: Modelo de roteamento SDIO</em></div>

![Figura 6.9-41: Referência de roteamento SDIO na PCB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-41: Referência de roteamento SDIO na PCB</em></div>

![Figura 6.9-42: Referência de posicionamento dos componentes USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-42: Referência de posicionamento dos componentes USB</em></div>

![Figura 6.9-43: Modelo de roteamento USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-43: Modelo de roteamento USB</em></div>

![Figura 6.9-44: Referência de roteamento USB na PCB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-44: Referência de roteamento USB na PCB</em></div>

![Figura 6.9-45: Referência de posicionamento do TVS de alimentação](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-45: Referência de posicionamento do TVS de alimentação</em></div>

![Figura 6.9-46: Referência de aterramento para EOS/TVS](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 6.9-46: Referência de aterramento para EOS/TVS</em></div>
