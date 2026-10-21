---
icon: lucide/memory-stick
description: "PSRAM em sistemas embarcados: como a RAM pseudoestática amplia a SRAM, em que difere de DRAM, RRAM e MRAM e como distribuir dados pela hierarquia de memória SF32."
tags:
    - Arquitetura
    - Memória
    - Aprendizado
---

# PSRAM em comparação com outros tipos de memória para sistemas embarcados { #psram-vs-other-embedded-memory-types }

A PSRAM, ou **RAM pseudoestática (pseudo-static RAM)**, é, em muitos produtos embarcados, a camada prática de capacidade entre a escassa SRAM interna do chip e o armazenamento não volátil. Use-a para framebuffers, grandes recursos gráficos, buffers de áudio, dados de modelos ou um conjunto de trabalho da aplicação que não caiba na SRAM interna. Em alguns produtos de baixo consumo, como wearables, a PSRAM pode ser mais adequada, do ponto de vista de consumo do sistema, do que um subsistema DRAM discreto; o resultado depende dos dispositivos de memória, do controlador, dos estados de operação e da carga de trabalho. Ainda assim, é uma memória de trabalho volátil: não substitui a Flash e não é automaticamente o lugar certo para dados críticos em latência.

Use este artigo para decidir quais dados devem ficar na SRAM, na PSRAM ou em armazenamento persistente. Em seguida, consulte a [família SF32](../../sf32-products/family/SF32_family.md) e a documentação exata do chip, módulo ou placa para confirmar quais memórias estão presentes no SKU escolhido.

!!! tip "Em uma frase"
    A PSRAM usa internamente células dinâmicas semelhantes às da DRAM, mas gerencia o refresh dentro do próprio dispositivo de memória, permitindo que o host a utilize de forma mais parecida com a SRAM.

As regras práticas são simples: use PSRAM para obter capacidade, reserve SRAM para tarefas determinísticas e de baixa latência e trate a interface de memória externa como um orçamento compartilhado de desempenho e consumo.

## Estática e dinâmica: de onde vem o “pseudo” { #static-vs-dynamic-where-pseudo-comes-from }

Neste contexto, **estática** e **dinâmica** descrevem como uma célula de RAM mantém um bit enquanto permanece energizada. Esses termos **não** indicam se os dados sobrevivem à perda de energia: tanto SRAM quanto DRAM são voláteis.

- Um bit de **SRAM** é mantido em um latch estático. Depois de gravado, permanece válido sem refresh periódico enquanto o dispositivo estiver energizado e operando dentro das especificações. A contrapartida é uma célula de memória maior, que limita a capacidade e aumenta a área de silício e o custo por bit.
- Um bit de **DRAM** é armazenado como carga em um capacitor. Essa carga se dissipa com o tempo; por isso, o bit precisa ser lido e restaurado periodicamente, em uma operação de **refresh**, antes que a carga caia demais. A célula menor dá à DRAM uma vantagem de densidade, mas normalmente exige um controlador compatível com DRAM para programar o refresh e respeitar as regras de temporização.

A PSRAM costuma usar internamente um **arranjo de células dinâmicas semelhante ao da DRAM**. O próprio dispositivo PSRAM executa o refresh e oculta, dentro do encapsulamento, boa parte do controle específico da DRAM. Por isso, seu modelo de acesso pelo host se aproxima mais do da SRAM: o host lê e grava um espaço de memória endereçável sem precisar programar o refresh periódico. Isso não significa que toda PSRAM tenha a mesma interface elétrica ou temporização da SRAM. Ela é **pseudoestática** porque a RAM dinâmica *imita o comportamento externo da RAM estática*, não porque a célula de armazenamento tenha se tornado estática.

A simplificação ocorre na interface; ela não elimina as limitações físicas. A PSRAM ainda tem latência de comando, comportamento de rajada (burst), limites de clock, modos de suspensão, restrições de acesso e consumo específicos do dispositivo. Consulte o datasheet da PSRAM escolhida, em vez de tratar todos os componentes PSRAM como intercambiáveis.

!!! note "O que a PSRAM não é"
    PSRAM não é armazenamento não volátil, não garante a latência da SRAM interna nem garante largura de banda suficiente para o sistema. Ela resolve um problema de capacidade; o dispositivo e a carga de trabalho escolhidos determinam os custos de latência, consumo e largura de banda.

## Comparação entre tipos de memória { #memory-type-comparison }

<div align="center"><em>Tabela: Comparação entre tipos de memória embarcada</em></div>

<div align="center" markdown>

| Tipo de memória | Mantém os dados sem alimentação? | Característica principal | Vantagem típica | Principal contrapartida de projeto | Uso típico em sistemas embarcados |
|:----------------|:-------------------------------:|:------------------------|:----------------|:----------------------------------|:---------------------------------|
| **SRAM** | Não | Latch estático; não requer refresh | A SRAM interna costuma oferecer latência baixa e previsível; a temporização real depende do caminho de memória do SoC e dos acessos concorrentes | Baixa eficiência de área, o que limita a capacidade on-chip; a corrente de fuga importa em projetos que permanecem sempre ativos | Pilhas, código e dados de acesso frequente, descritores DMA, buffers sensíveis a interrupções e memórias fortemente acopladas |
| **DRAM** | Não | Armazenamento em capacitores, com refresh gerenciado externamente e controlador DRAM | Alta densidade e baixo custo por bit em grandes capacidades | Refresh, complexidade do controlador, temporização de linhas e bancos e gestão de energia | Memória principal em sistemas com processador de aplicação e em sistemas embarcados de alta capacidade |
| **PSRAM** | Não | Armazenamento semelhante ao da DRAM, com refresh e controle internos ao dispositivo de memória e modelo de acesso pelo host semelhante ao da SRAM | Amplia a capacidade de trabalho além da SRAM interna; em alguns projetos de largura de banda baixa a moderada, pode simplificar a integração e reduzir o consumo do sistema em relação a um subsistema DRAM discreto | Latência mais alta e menos previsível que a SRAM interna; largura de banda finita e compartilhada com outros usuários | Framebuffers, buffers grandes de interface gráfica/áudio/IA, recursos descompactados e conjuntos de trabalho da aplicação |
| **RRAM / ReRAM** | Sim | Os dados são representados pela alteração da resistência de uma célula | Memória embarcada não volátil potencialmente compacta e baixo consumo em espera | Escrita, durabilidade, retenção, variabilidade e disponibilidade dependem muito do processo e do produto | Configurações não voláteis, armazenamento de código/dados ou usos especializados de memória embarcada, quando a tecnologia estiver disponível |
| **MRAM** | Sim | Os dados são representados pelo estado magnético | Acesso não volátil rápido, alta durabilidade e ausência de refresh | Custo, densidade, energia de escrita e capacidade disponível variam conforme a geração e o produto MRAM | Estado persistente, armazenamento de código/dados ou dados de trabalho não voláteis e rápidos em dispositivos compatíveis |

</div>

A tabela é qualitativa. “Mais rápido”, “mais denso” e “menor consumo” indicam tendências úteis, não determinam a escolha de um componente. Nó de processo, interface, temperatura, padrão de acesso, modo de espera, encapsulamento e configuração do controlador podem inverter uma comparação que parecia óbvia.

### Por que a PSRAM é adequada a produtos de baixo consumo { #why-psram-fits-low-power-products }

A PSRAM costuma atender a um ponto de operação diferente do da DRAM discreta convencional: capacidade e largura de banda moderadas, uma interface mais simples, menor sobrecarga do controlador e estados de baixo consumo no próprio dispositivo. Em alguns wearables, produtos portáteis e dispositivos alimentados por bateria que não exigem largura de banda de nível DRAM, essa combinação pode reduzir o consumo do sistema. Não é uma garantia geral: compare as memórias, o controlador, os estados de operação e uma carga representativa no sistema de destino.

Isso não é uma promessa universal de consumo por byte ou por acesso. Uma interface PSRAM operando com clock elevado, um framebuffer em varredura contínua ou tráfego intenso de display, áudio ou IA ainda pode dominar o orçamento de energia da memória. Compare as correntes de operação, espera, retenção e retomada dos dispositivos escolhidos com o clock, a tensão, a temperatura e o padrão de acesso reais. Use modos como Half-Sleep quando forem compatíveis e trouxerem benefício.

## Onde cada tipo de memória se encaixa no sistema { #where-each-memory-fits-in-a-system }

Considere por quanto tempo os dados precisam existir e com que urgência serão acessados:

1. Mantenha em SRAM interna ou em outra memória documentada de baixa latência o código e os dados **sensíveis a interrupções, acessados com frequência e críticos em latência**.
2. Coloque **grandes conjuntos de trabalho ativos** na PSRAM quando o ganho de capacidade compensar os custos de latência e largura de banda.
3. Armazene em uma tecnologia não volátil os **dados que precisam sobreviver à perda de energia**: normalmente NOR Flash, NAND Flash ou eMMC; em sistemas que ofereçam essas opções, RRAM ou MRAM.
4. Mantenha os **recursos pouco usados** em armazenamento não volátil e transfira ou decodifique apenas a parte necessária para a operação atual.

Uma organização comum em sistemas embarcados é:

<div align="center"><em>Diagrama: organização típica da memória em um sistema embarcado</em></div>

```text
Persistent firmware image, assets, settings -> Non-volatile storage
Active large buffers and framebuffers -> PSRAM
Hot stacks, control state, DMA data  -> Internal SRAM
```

Essa é uma política de alocação, não uma regra que todo buffer precise seguir. Uma imagem pequena reutilizada com frequência pode ficar na SRAM; um modelo grande pode permanecer na Flash ou na PSRAM; e um sistema de exibição pode precisar de PSRAM simplesmente porque um framebuffer completo não cabe na memória interna.

## A largura de banda da interface limita o desempenho da PSRAM { #psram-performance-is-an-interface-budget }

Ter capacidade de PSRAM não significa dispor de largura de banda ilimitada. Nas configurações SF32 compatíveis, o host acessa a memória por uma interface como OPI ou HPI. Esse caminho pode ser compartilhado por acessos da CPU, cache, DMA, gráficos, leitura contínua do display, áudio, comunicação sem fio e armazenamento. Mesmo com capacidade de PSRAM suficiente, o produto pode apresentar engasgos ou falta de dados nos buffers se vários clientes exigirem a interface ao mesmo tempo.

### Largura da interface e taxa de transferência { #interface-width-and-transfer-rate }

A taxa bruta de carga útil depende da quantidade de linhas de dados, do número de transferências por clock e do clock da interface:

`payload rate (MB/s) = data lines × transfers per clock × interface clock (MHz) ÷ 8`

As linhas DTR/DDR abaixo pressupõem duas transferências por clock, e as linhas de canal duplo pressupõem que ambos os canais operem simultaneamente na frequência indicada. São premissas de cálculo, não uma confirmação de que todo chip, encapsulamento, dispositivo de memória ou configuração do SDK oferece suporte aos modos ou frequências indicados.

<div align="center"><em>Tabela: Taxa teórica de carga útil da memória serial</em></div>

<div align="center" markdown>

| Interface e modo de transferência | Linhas de dados úteis | Transferências por clock | Taxa útil por MHz | Clock de referência para comparação | Taxa útil teórica |
|:----------------------------------|:--------------------:|:------------------------:|:-----------------:|:-----------------------------------:|:----------------:|
| QSPI / STR | 4 | 1 | 0,5 MB/s | 72 MHz | 36 MB/s |
| QSPI / DTR | 4 | 2 | 1 MB/s | 72 MHz | 72 MB/s |
| OPI / DDR | 8 | 2 | 2 MB/s | 144 MHz | 288 MB/s |
| OPI / DDR de canal duplo | 2 × 8 = 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR | 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR de canal duplo | 2 × 16 = 32 | 2 | 8 MB/s | 144 MHz | 1.152 MB/s |

</div>

A coluna de linhas de dados conta apenas os sinais da carga útil; não inclui clock, seleção do chip nem outros sinais de controle. Essas frequências são exemplos documentados, não limites para toda a família. O [guia do SF32LB52-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md) especifica OPI-PSRAM a 144 MHz e QSPI-NOR a 72 MHz em modo STR; o [guia do SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb58x/SF32LB58-DevKit-LCD.md) especifica HPI-PSRAM a 144 MHz e variantes da placa com Flash externa a 72 MHz. A linha QSPI/DTR usa 72 MHz apenas para isolar o efeito da transferência em taxa dupla. As linhas de canal duplo pressupõem que os dois canais possam operar simultaneamente; mostram a largura agregada do barramento, mas não garantem que um único fluxo da CPU obtenha o dobro da taxa efetiva. Esses valores são **limites teóricos da carga útil do barramento**, não resultados medidos de uma aplicação. Ciclos de comando e endereço, ciclos dummy, refresh, alternância entre leitura e escrita, limites do controlador, faltas de cache, arbitragem de DMA, integridade do sinal na PCB e clientes simultâneos reduzem a taxa utilizável. A configuração válida depende do chip, encapsulamento, dispositivo de memória e SDK escolhidos.

O [guia de modelos de chip da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) lista configurações de canal duplo como exemplos: **SF32LB566VCB36** tem 8 MB de OPI-PSRAM em MPI1 e 4 MB em MPI2; **SF32LB586VDD36** tem 16 MB de HPI-PSRAM em cada interface; e **SF32LB587VEE56** tem 32 MB de HPI-PSRAM em cada interface. Esses códigos de peça ilustram a topologia de memória, mas não garantem que um único cliente alcance a carga útil agregada da tabela. Antes de dimensionar um projeto sensível à largura de banda, confirme o número de peça comercial exato e o mapa de memória do SDK; outro encapsulamento ou SKU da mesma família pode usar uma organização diferente.

### Por que dois canais de memória fazem diferença { #why-two-memory-channels-matter }

O principal benefício de uma configuração de canal duplo não é apenas um número agregado maior. Quando o mapa de memória SF32 e a configuração do display/controlador permitem alocação independente, um canal pode ser dedicado a uma carga crítica em largura de banda e o outro atender ao restante do sistema.

Um display RGB/DPI é um exemplo comum. O controlador precisa ler continuamente o framebuffer na frequência do pixel clock; uma leitura atrasada pode causar falta de dados, artefatos visuais ou instabilidade na atualização da imagem. Colocar o framebuffer na memória atendida por um canal PSRAM e os recursos da interface, buffers de áudio e outros dados de trabalho acessados pela CPU, pelo ePicasso ou pelo DMA na memória do outro canal pode reduzir a contenção desnecessária no caminho de leitura do display.

Use essa abordagem como estratégia de distribuição de largura de banda, não como garantia automática. Confirme se o dispositivo escolhido oferece o mapeamento de canais necessário, se o endereço-base do framebuffer está no canal pretendido e se o controlador de display e os demais mestres do barramento podem usar os canais de forma independente. Meça a estabilidade da leitura contínua, o tempo de quadro e a carga simultânea de áudio, Bluetooth e CPU. O intercalamento de endereços, uma interconexão compartilhada ou uma disposição inadequada dos buffers podem reduzir o benefício esperado.

### Cache e execução a partir da memória externa { #caches-and-external-memory-execution }

Quando código ou dados ficam na DRAM/PSRAM externa, o **I-cache** e o **D-cache** podem reduzir significativamente os acessos lentos repetidos nos dispositivos SF32 que implementem e habilitem esses caches e mapeiem as regiões em questão como cacheáveis:

- O **I-cache** mantém próximas da CPU as linhas de instruções buscadas recentemente. Código com localidade — como laços, funções reutilizadas, caminhos do RTOS ou código da interface gráfica — pode evitar novas leituras da PSRAM ou da NOR depois que o cache for preenchido.
- O **D-cache** mantém próximas da CPU as linhas de dados lidas recentemente. Ele ajuda em leituras repetidas de tabelas, recursos e dados de trabalho, mas não elimina a largura de banda consumida por um fluxo de passagem única.
- **DMA não coerente exige controle da posse do buffer e manutenção do cache.** Para um buffer cacheável sem garantia de coerência por hardware, limpe (clean) os dados gravados pela CPU antes que o DMA ou um periférico os leia. Antes de uma gravação pelo DMA, siga o procedimento da plataforma para preparar o buffer de recepção, evitando que linhas sujas sejam gravadas de volta mais tarde e sobrescrevam os dados recebidos. Após a conclusão da transferência, invalide as linhas desatualizadas antes de a CPU ler o resultado. A CPU não deve acessar o buffer enquanto ele estiver sob controle do DMA.

Alinhe o endereço inicial e o tamanho alocado dos buffers DMA a linhas inteiras de cache, sem compartilhar linhas com dados não relacionados. Invalidar uma linha suja compartilhada pode descartar alterações de outra variável; limpá-la após uma gravação pelo DMA pode sobrescrever os novos dados. Use as APIs do SDK ou RTOS escolhido e respeite o tamanho da linha, as verificações de conclusão e as barreiras de memória exigidas pela plataforma. Não copie sem verificar as APIs ou os valores de alinhamento de outro processador. Buffers não cacheáveis ou coerentes por hardware seguem as regras de sincronização da própria plataforma.

Portanto, o cache é uma otimização de localidade, não substitui o orçamento de largura de banda. A leitura contínua de um framebuffer ou uma transferência de buffer feita uma única vez ainda pode consumir a interface PSRAM perto da taxa de dados necessária.

### Cópia para PSRAM durante a inicialização (não XIP) { #boot-copy-and-execute-in-place-from-psram }

Os guias de inicialização da SiFli para SF32LB52x e SF32LB58x documentam configurações em que a aplicação armazenada em NAND Flash externa é copiada para a PSRAM para execução; ambos também descrevem uma opção com Flash SD externa via SDIO. A SiFli chama esse modo de **não XIP**: no XIP, o código é executado diretamente de um endereço da NOR Flash, portanto os endereços de armazenamento e execução coincidem; no não XIP, o código é copiado da Flash para a RAM e os endereços são diferentes. Consulte o [guia de inicialização do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_development/startup_flow.html) e o [guia de inicialização do SF32LB58x (em chinês)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_development/startup_flow.html). São configurações documentadas, não uma garantia para todos os SKUs ou placas. Confirme a mídia de boot suportada, o mapa de memória, a configuração do linker/partições e o SDK do dispositivo escolhido. Executar código selecionado na PSRAM pode liberar a SRAM interna, que é limitada, para outros usos, mas não garante execução mais rápida; meça cargas representativas com o cache e a contenção de memória reais.

Em configurações SiFli representativas, a NOR QSPI/STR a 72 MHz tem limite bruto de carga útil de 36 MB/s, enquanto a PSRAM OPI/DDR e HPI/DDR a 144 MHz chega a 288 MB/s e 576 MB/s, respectivamente. As variantes de canal duplo chegam a 576 MB/s e 1.152 MB/s de forma agregada. Esses números são limites de carga útil das interfaces, não resultados de desempenho de aplicações. Em uma configuração compatível, a maior largura de banda da PSRAM pode oferecer mais margem para a leitura de instruções, mas não comprova, por si só, que executar código nela será mais rápido. O resultado depende da latência do dispositivo de memória, da localidade do código, da configuração do cache, da contenção na PSRAM e de a aplicação estar limitada pela CPU, pelo cache ou pela largura de banda. Meça o tempo de boot, o comportamento das faltas de cache e cargas de trabalho representativas; não deduza o desempenho da aplicação apenas pela proporção entre taxas brutas do barramento.

Em um projeto que usa muita PSRAM, valide estas questões no hardware-alvo:

- Quais elementos leem e gravam na PSRAM ao mesmo tempo durante o cenário de pico de uso?
- A CPU acessa o buffer de forma sequencial, em rajadas, aleatória ou repetida?
- O comportamento do cache reduz os acessos repetidos? As operações de manutenção do cache em torno do DMA estão corretas?
- É possível usar atualizações parciais, buffers de desenho menores ou compressão no framebuffer, em vez de alocar um framebuffer completo maior?
- O que acontece quando a atualização do display, o áudio Bluetooth e o processamento da aplicação ocorrem simultaneamente?
- O comportamento de espera ou suspensão da PSRAM escolhida atende aos requisitos de retenção de dados e duração da bateria?

Meça o tempo de quadro, a falta de dados nos buffers, os ciclos de espera da CPU, a corrente e o comportamento de recuperação. Não deduza o desempenho do sistema apenas da capacidade ou da largura da interface PSRAM.

## Half-Sleep em PSRAMs AP Memory compatíveis { #half-sleep-on-applicable-ap-memory-psram }

Algumas PSRAMs da AP Memory oferecem o modo **Half-Sleep**, um estado de consumo ultrabaixo que retém os dados armazenados. Ele é útil quando um buffer grande precisa permanecer válido enquanto o sistema pausa a atividade da PSRAM, mas o produto não pode recarregar o buffer a partir da Flash nem recalculá-lo depois de cada intervalo ocioso.

Half-Sleep é um **modo de energia específico do dispositivo**, não um recurso genérico da PSRAM. O [datasheet da PSRAM AP Memory APS6408L-OBMx DDR OPI Xccela](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) documenta uma implementação desse modo. O tempo de entrada e saída, a codificação do registrador de modo, o comportamento permitido do clock, a corrente, os limites de temperatura e as garantias de retenção **não podem ser generalizados** entre famílias ou revisões de PSRAM. Consulte o datasheet exato e confirme o suporte do SDK para a peça montada.

### Economia relativa de energia { #relative-power-saving }

As comparações abaixo usam o datasheet da AP Memory Rev. 3.7, disponível no [site do fabricante](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf). Confirme a revisão e a peça montada antes de aplicar seus limites.

Para o mesmo componente de referência APS6408L-OBMx com **retenção de toda a matriz**, a AP Memory publica as seguintes correntes médias típicas em espera padrão e Half-Sleep. Com a mesma tensão de alimentação, a redução relativa da corrente também corresponde à redução relativa da potência consumida pela PSRAM.

<div align="center"><em>Tabela: Economia com Half-Sleep na APS6408L-OBMx com retenção de toda a matriz</em></div>

<div align="center" markdown>

| Temperatura | Corrente em espera padrão | Corrente em Half-Sleep | Redução relativa |
|:------------|:-------------------------:|:---------------------:|:----------------:|
| 25 °C | 66 µA | 20 µA | cerca de 70% |
| 85 °C | 190 µA | 120 µA | cerca de 37% |

</div>

Assim, a 25 °C, o Half-Sleep consome aproximadamente **30% da corrente em espera padrão do componente de referência**, mantendo toda a matriz. A economia é menor a 85 °C porque a corrente de retenção aumenta com a temperatura. Esses valores comparam dois estados ociosos/de retenção — não o Half-Sleep com a corrente de leitura/gravação ativa — e são valores típicos, não garantias de projeto. Configurações de refresh parcial da matriz podem alterar ainda mais a corrente, mas talvez não retenham todas as regiões de memória; use-as apenas quando a política de retenção de dados permitir.

### Regras de projeto para Half-Sleep { #design-rules-for-half-sleep }

Não confunda os 150 ms da condição de garantia da corrente com os 150 µs de duração mínima de Half-Sleep e os 150 µs de temporização de saída indicados na Tabela 30 desta revisão. Uma corrente média baixa ainda pode incluir picos de refresh; verifique a resposta do regulador e do desacoplamento. Diferentemente de Half-Sleep, Deep Power Down perde o conteúdo da memória e restaura os valores padrão dos registradores de modo ao sair.

As notas das tabelas de corrente da datasheet de referência especificam um dispositivo de 64 Mb sem alternância do clock; os valores de refresh lento a 25 °C exigem habilitar Slow Refresh Frequency. A faixa especificada para VDD e VDDQ é de 1,62 a 1,98 V. A corrente especificada de Half-Sleep só é garantida após 150 ms nesse modo, o que não transforma os valores típicos da tabela em limites garantidos. Para intervalos ociosos mais curtos, meça toda a forma de onda de entrada, retenção e saída, em vez de aplicar a corrente estabilizada ao intervalo inteiro.

- Só entre em Half-Sleep depois que todos os clientes — CPU, DMA, display, áudio, comunicação sem fio e armazenamento — tiverem parado de acessar a região PSRAM. Uma transação durante a entrada ou a suspensão pode corromper a transferência ou despertar o dispositivo inesperadamente.
- Considere a saída do modo como um custo de retomada programado. O firmware deve aguardar o tempo de saída especificado antes que o código, o DMA ou um controlador de periférico volte a acessar a PSRAM.
- Mantenha a alimentação da PSRAM e os sinais exigidos pelo componente escolhido dentro das especificações de retenção. O Half-Sleep só mantém os dados enquanto as condições de alimentação documentadas forem atendidas; não substitui o armazenamento não volátil.
- Meça o estado completo do sistema, não apenas a corrente da PSRAM. A economia pode desaparecer se a CPU, o display, o clock da interface ou outro subsistema continuar ativo.

Em intervalos ociosos curtos, o custo de entrar e sair do modo pode superar a economia. Em pausas mais longas, manter um framebuffer, um recurso decodificado ou um buffer de modelo em Half-Sleep pode evitar recarga ou reconstrução custosas. Meça na placa-alvo a energia consumida em operação, Half-Sleep e retomada para determinar a duração mínima de inatividade que produz uma economia líquida.

## PSRAM em projetos SF32 { #psram-in-sf32-designs }

As configurações de memória SF32 dependem do SKU, do encapsulamento e do módulo. A documentação dos módulos SiFli lista opções OPI-PSRAM e HPI-PSRAM em toda a linha de módulos SF32LB5x e mostra que a capacidade e a topologia variam conforme o código do módulo. Algumas configurações encapsulam a PSRAM junto ao chip; outros produtos disponibilizam uma interface de memória externa. Nem o nome de uma família SF32 nem a presença de uma interface de memória externa comprovam que todas as variantes incluam PSRAM.

Consulte a página do produto e o guia de projeto exatos para confirmar capacidade, interface, restrições do encapsulamento, requisitos de roteamento e limitações de periféricos simultâneos. Para o projeto da aplicação, os usos práticos são consistentes:

- **Gráficos:** use PSRAM para framebuffers grandes, buffers de desenho, imagens ou fontes quando a SRAM não for suficiente. A [visão geral de gráficos](../graphics/overview.md) explica o fluxo entre renderização e display e as implicações da largura de banda PSRAM.
- **Áudio e Bluetooth:** use PSRAM para filas ou recursos maiores somente depois de testar o tráfego simultâneo; estruturas de controle sensíveis à latência devem permanecer em uma região de memória adequada e de baixa latência.
- **IA:** use-a quando necessário para pesos de modelos ou tensores grandes, mantendo buffers acessados com frequência ou críticos em latência na região de memória mais adequada, conforme a documentação.
- **Compressão:** [eZip](../graphics/ezip.md) pode reduzir o tamanho dos recursos armazenados e o tráfego antes da decodificação. Nos dispositivos SF32LB55x, SF32LB56x e SF32LB58x compatíveis, [TurboPixel](../graphics/turbopixel.md) reduz a capacidade de PSRAM necessária e os requisitos de largura de banda do framebuffer final, usando uma taxa fixa de compressão com perdas; não é um formato de armazenamento de recursos.

## Regras práticas de seleção { #practical-selection-rules }

Escolha PSRAM quando o problema for capacidade e a carga de trabalho tolerar os limites de latência e largura de banda do caminho de memória escolhido. Prefira mais SRAM interna — ou reformule o uso de buffers — quando o problema for latência determinística, acessos aleatórios pequenos e frequentes ou um caminho de DMA/controle crítico em tempo. Escolha memória não volátil quando os dados precisarem sobreviver à perda de energia. Use RRAM ou MRAM somente quando a documentação do SoC ou do produto de memória exato confirmar a disponibilidade e os limites de operação.

A arquitetura mais robusta combina deliberadamente vários níveis: armazenamento não volátil para dados persistentes, PSRAM para grandes volumes de dados ativos e SRAM para o trabalho que precisa ser executado de forma rápida e previsível.
