---
icon: lucide/layers-3
description: "Como o motor gráfico 2D/2.5D ePicasso da SiFli acelera a renderização de interfaces embarcadas no SF32 e se integra ao LVGL, à memória e ao controlador de display."
tags:
  - Gráficos
---

# Motor gráfico ePicasso 2D/2.5D { #epicasso-2d-25d-graphics-engine }

## Introdução { #introduction }

**ePicasso** é o acelerador gráfico 2D/2.5D da SiFli para a família de microcontroladores SF32. Ele executa em hardware as operações repetitivas sobre pixels que suporta e que seriam feitas pela CPU da aplicação, permitindo que interfaces embarcadas ofereçam efeitos fluidos, resposta rápida e atualização eficiente do display dentro do orçamento de energia de um MCU.

No fluxo gráfico do SF32, o ePicasso atua depois que os recursos estão disponíveis para o renderizador e antes de o bitmap final chegar ao controlador de display. Ele acelera operações de pixel como cópia de imagens, mesclagem, redimensionamento, rotação e composição de camadas. A descompressão dos recursos fica a cargo do eZip, que pode encaminhar os dados de imagem decodificados ao ePicasso; o controlador de display transfere os pixels preparados para o painel. Consulte a [Visão geral de gráficos](overview.md#sf32-graphics-flow) para ver o caminho completo dos recursos até o painel.

Em geral, as aplicações não programam diretamente cada operação do ePicasso. Um framework gráfico como **LVGL**, ou uma biblioteca gráfica do fornecedor, monta comandos para as tarefas comuns da interface. O driver gráfico do SF32 encaminha ao ePicasso as operações suportadas e recorre à renderização pela CPU quando uma operação não é compatível.

Consulte esta página quando a análise de desempenho da interface indicar que operações de cópia, preenchimento, mesclagem alfa, redimensionamento, rotação ou composição estão limitando a capacidade de resposta ou aumentando o consumo de energia. Ela ajuda engenheiros de firmware a decidir quais operações podem ser aceleradas e em quais casos é necessário manter um caminho de fallback correto por software.

## Por que a aceleração gráfica por hardware é importante { #why-hardware-graphics-acceleration-matters }

O desempenho de uma interface embarcada costuma ser limitado pelo movimento de dados na memória, e não pela capacidade de processamento da CPU. Até um ícone semitransparente simples pode exigir, para cada pixel afetado, a leitura da origem e do framebuffer, a mesclagem dos pixels e a gravação do resultado no framebuffer.

O ePicasso melhora esse cenário acelerando operações de pixel repetitivas que aparecem ao longo da interface:

- Cópia de blocos de imagem e regiões do framebuffer.
- Preenchimento de retângulos e fundos da interface.
- Mesclagem alfa de ícones, máscaras de texto, sombras e sobreposições.
- Redimensionamento de bitmaps para layouts responsivos e animações.
- Rotação ou transformação de regiões de imagem.
- Composição de várias camadas em um buffer final de display.
- Conversão entre formatos de pixel comuns, quando compatível com o dispositivo e o driver.

O benefício não se limita à taxa de quadros: a aceleração por hardware pode reduzir o uso da CPU, melhorar a resposta ao toque e aumentar a oportunidade de entrar em estados de menor consumo entre as atualizações do display.

Reduzir o trabalho da CPU não garante menor consumo total de energia. Os clocks do acelerador, o tráfego de memória, a sincronização e a sobrecarga do driver podem compensar a economia na CPU. Compare no hardware real a energia por atualização de tela concluída, incluindo o display e o intervalo ocioso, em vez de avaliar a eficiência apenas pelo uso da CPU.

## Conceitos fundamentais de renderização { #core-rendering-concepts }

### Superfícies e framebuffers { #surfaces-and-framebuffers }

Uma **superfície** é uma área retangular de memória de pixels. Pode representar um framebuffer de tela inteira, um buffer parcial de desenho, um recurso de imagem, um canvas ou uma camada intermediária. Em geral, as operações do ePicasso leem pixels de uma ou mais superfícies de origem e gravam o resultado em uma superfície de destino.

Posicione as superfícies na memória de acordo com o padrão de acesso:

- Buffers de desenho atualizados com frequência podem se beneficiar da SRAM interna rápida, quando houver espaço suficiente.
- Imagens, fontes e recursos grandes podem ficar na Flash ou na PSRAM.
- Framebuffers de tela inteira para displays de resolução mais alta podem exigir PSRAM.
- Buffers acessíveis por DMA devem seguir as regras de memória e coerência de cache do SDK.

### Mesclagem de pixels (alpha blending) { #blending }

A mesclagem combina pixels de origem com os pixels de destino. Ela é essencial para elementos modernos de interface, como cartões translúcidos, sombras suaves, glifos com antialiasing, sobreposições e animações de fade.

Casos comuns de mesclagem:

- Mesclagem com alfa constante para fazer uma camada inteira aparecer ou desaparecer gradualmente.
- Mesclagem por pixel com alfa para imagens no estilo PNG e ícones com antialiasing.
- Mesclagem baseada em máscara para texto, formas ou recursos monocromáticos.

Quando o ePicasso executa a mesclagem em hardware, a CPU deixa de fazer a mesma operação aritmética para cada pixel da região afetada.

### Redimensionamento e rotação { #scaling-and-rotation }

Redimensionamento e rotação são comuns em interfaces animadas e layouts responsivos. O redimensionamento por hardware pode ser usado em efeitos de zoom, miniaturas de pré-visualização, ícones em diferentes tamanhos ou adaptação de recursos a diferentes densidades de tela. A rotação é útil para mudar a orientação do display, girar indicadores, elementos de mostradores de relógio e alguns efeitos de transição.

Essas operações dependem da largura de banda. O benefício varia conforme os formatos de origem e destino, o posicionamento de memória e a capacidade do driver gráfico de expressar a operação de forma compatível com o hardware.

### Composição de camadas { #layer-composition }

Muitas telas são formadas por várias camadas visuais: plano de fundo, imagens, texto, indicadores de estado, janelas pop-up e sobreposições animadas. A composição reúne esses elementos no resultado visível.

O ePicasso foi projetado para acelerar esse tipo de composição 2D. Em vez de redesenhar a tela inteira por software, um framework de interface pode atualizar apenas as regiões invalidadas e usar o acelerador para compor os pixels alterados com eficiência.

## Gráficos 2D e 2.5D { #2d-and-25d-graphics }

Em geral, **gráficos 2D** são operações realizadas em imagens planas e retangulares: copiar, preencher, mesclar, redimensionar, girar e compor.

O termo **gráficos 2.5D** descreve efeitos que ainda são renderizados em um framebuffer 2D, mas acrescentam transformações ou um comportamento que lembra perspectiva. Em interfaces embarcadas, isso pode incluir regiões de imagem transformadas, transições mais elaboradas ou efeitos que dão sensação de profundidade sem exigir um pipeline completo de renderização 3D.

Na documentação SF32, o ePicasso deve ser entendido principalmente como um **acelerador 2D/2.5D para interfaces**, não como uma GPU 3D programável de classe desktop. Seu objetivo é tornar interfaces embarcadas mais fluidas e eficientes em energia, especialmente em displays de dispositivos vestíveis, controles inteligentes, dispositivos portáteis e painéis compactos.

## Comparação das implementações do ePicasso { #epicasso-generation-comparison }

Compare a implementação de cada família, não apenas o nome do motor gráfico. Resolução do display, quantidade de camadas, formatos suportados, recursos eZip, largura de banda da memória externa e suporte do driver também dependem do dispositivo SF32, do encapsulamento, do SDK e do projeto da placa. O [resumo de produto SF32LB52x da SiFli](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf) chama o motor de ePicasso 2.0. O [datasheet do SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) especifica quatro camadas de primeiro plano, uma camada de máscara dedicada e uma camada de fundo monocromática; o TurboPixel é descrito separadamente como recurso de compressão de framebuffer do controlador LCD. O [datasheet SF32LB58x](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf) documenta o ePicasso 2.0 e um motor vetorial independente, o Vivante GCNanoUltraV.

<div align="center"><em>Comparação das implementações do ePicasso</em></div>

<div align="center" markdown>

| Motor documentado | Família SF32 representativa | Escopo gráfico | Diferenciais documentados | Aplicação típica |
|:---|:---|:---|:---|:---|
| **ePicasso** | SF32LB55x | Aceleração de interface 2.5D | Rotação, redimensionamento e espelhamento horizontal por hardware, além de mesclagem alfa; espelhamento vertical não é suportado; fluxo de recursos sem perdas com eZip | Dispositivos vestíveis com BLE e HMIs compactas que precisam de uma interface mais rica do que a encontrada em projetos básicos |
| **ePicasso 2.0** | SF32LB52x | Aceleração de interface 2D/2.5D | Descompressão de recursos eZip 2.0 em uma configuração gráfica otimizada em termos de custo | Dispositivos vestíveis de entrada, produtos Bluetooth, papel eletrônico e HMIs compactas |
| **ePicasso 2.0** | SF32LB56x | Aceleração de interface 2D/2.5D | Quatro camadas de primeiro plano com mesclagem alfa, uma camada de máscara dedicada e uma camada de fundo monocromática; rotação, redimensionamento e espelhamento horizontal por hardware (espelhamento vertical não suportado); conversão de formato; eZip 2.0; compressão de framebuffer TurboPixel separada | Displays de maior resolução e interfaces LVGL mais completas; confirme as operações suportadas pelo dispositivo e pelo SDK |
| **ePicasso 2.0** | SF32LB58x | Aceleração de interface 2D/2.5D | Inclui ePicasso 2.0 e o motor vetorial independente Vivante GCNanoUltraV; confirme separadamente as funções de cada motor | Produtos gráficos de alta resolução; confirme quais funções cada motor oferece no SDK utilizado |
| **ePicasso (EPIC)** | SF32LB57x | Aceleração de interface 2D/2.5D | Rotação, redimensionamento, transformações matriciais, espelhamento horizontal e vertical, mesclagem alfa e composição de várias camadas; o EZIP envia recursos eZip/eZip-A descomprimidos ao EPIC. A tabela de formatos de entrada do EPIC também lista JPEG no SF32LB57x; o SDK também fornece um decodificador HAL JPEGD independente, que é um caminho distinto. | Produtos conectados com gráficos avançados, câmera e recursos multimídia |

</div>

Esta tabela não é uma classificação de desempenho. Para cada projeto, confirme os formatos de pixel, os limites de camadas e resolução, os recursos eZip, a memória disponível para framebuffer, a largura de banda da interface do display e o suporte do driver no SDK do chip escolhido.

A tabela de recursos do EPIC no SDK documenta espelhamento horizontal em todas as famílias listadas, mas espelhamento vertical apenas no SF32LB52x e no SF32LB57x. Não interprete uma menção genérica a “espelhamento” como suporte às duas direções. A mesma tabela exclui EZIP, JPEG e YUV da rotação e das transformações matriciais.

A saída direta do EZIP para o EPIC evita armazenar toda a imagem de origem descomprimida em um framebuffer intermediário; ainda são necessários a memória de trabalho do decodificador e o buffer final de renderização. A decodificação JPEG não é uma função do EZIP. O SDK lista JPEG como formato de entrada do EPIC no SF32LB57x e fornece, separadamente, um [exemplo HAL de JPEGD](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/hal/jpegd/README.html) que decodifica uma imagem JPEG com HAL_JPEGD. São caminhos documentados distintos; confirme qual deles a aplicação realmente usa.

Esse exemplo de imagem JPEG estática não demonstra que o JPEGD decodifique fluxos MJPEG. O SDK documenta MJPEG separadamente no [guia do middleware de vídeo FFmpeg](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/video.html), cuja nota de configuração informa que a decodificação de MJPEG por hardware só está disponível no SF32LB58x.

Verifique também as restrições específicas de cada formato e as diferenças entre famílias antes de escolher um caminho acelerado. Consulte a [tabela de recursos do EPIC no repositório original](https://github.com/OpenSiFli/SiFli-SDK/blob/main/docs/source/zh_CN/hal/epic.md) e a [interface JPEGD](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h).

## ePicasso na família SF32 { #epicasso-across-the-sf32-family }

Os dispositivos SF32 integram configurações diferentes do ePicasso. Use o datasheet e o manual de referência do chip escolhido como fonte definitiva para confirmar os recursos.

<div align="center"><em>Tabela: ePicasso na família SF32</em></div>

<div align="center" markdown>

| Família de dispositivos | Acelerador gráfico | Posicionamento típico |
|:---|:---|:---|
| **SF32LB52x** | Acelerador 2D/2.5D ePicasso 2.0 | Dispositivos vestíveis, produtos Bluetooth e HMIs compactas com foco em custo. |
| **SF32LB55x** | Acelerador 2.5D ePicasso | Dispositivos vestíveis com BLE e dispositivos com sensores que também precisam de display. |
| **SF32LB56x** | Acelerador 2D/2.5D ePicasso 2.0 | Produtos com display de resolução mais alta e interfaces mais completas no estilo LVGL. |
| **SF32LB57x** | Acelerador 2D/2.5D ePicasso (EPIC) | Produtos conectados com gráficos avançados, câmera e recursos multimídia. |
| **SF32LB58x** | ePicasso 2.0 e o motor vetorial independente Vivante GCNanoUltraV | Gráficos de alto nível, interfaces de alta resolução e aplicações visuais avançadas. |

</div>

Essa evolução permite manter um modelo de software gráfico semelhante entre dispositivos SF32 e, ao mesmo tempo, selecionar o chip adequado à resolução do display, à memória, à complexidade gráfica, à quantidade de GPIOs e ao orçamento de energia.

## Integração com LVGL e frameworks de interface { #integration-with-lvgl-and-ui-frameworks }

**LVGL** é uma opção comum para interfaces gráficas embarcadas em SF32. A aplicação monta as telas com widgets, estilos, imagens, fontes e animações. O LVGL identifica as regiões a redesenhar; seu renderizador por software ou backend de desenho por hardware produz os pixels. O caminho de flush do driver de display transfere esses pixels ao painel e sinaliza a conclusão. Diferencie o término da renderização do término da transferência para o display.

O ePicasso pode melhorar o desempenho do LVGL quando a adaptação do LVGL para SF32 encaminha operações de desenho compatíveis ao hardware. Os pontos de aceleração mais úteis costumam ser:

- Blit de imagens.
- Preenchimento com cores.
- Mesclagem alfa.
- Redimensionamento de imagens.
- Rotação ou transformação de regiões de imagem compatíveis.
- Composição em um buffer de desenho ou framebuffer.

Uma integração robusta do LVGL mantém caminhos alternativos pela CPU. Nem todo recurso do LVGL, formato de pixel, efeito de estilo ou organização de imagem corresponde a uma operação de hardware. Acelere operações frequentes e de alto volume; deixe os casos incomuns ou complexos para o software.

## Considerações sobre memória e largura de banda { #memory-and-bandwidth-considerations }

A aceleração gráfica não elimina a necessidade de projetar cuidadosamente a memória. Em muitos sistemas embarcados com display, o barramento de memória é o gargalo: ePicasso, CPU, controlador de display, mecanismos DMA, Flash, PSRAM, áudio e subsistemas sem fio podem disputar o acesso.

O bom desempenho gráfico depende de várias escolhas de projeto:

- Use resolução e profundidade de cor compatíveis com os requisitos do produto.
- Mantenha os recursos gráficos usados com frequência em posições de memória com latência de acesso adequada.
- Prefira renderização parcial ou atualização de regiões alteradas quando não for preciso atualizar a tela inteira.
- Evite conversões de formato desnecessárias no caminho crítico.
- Alinhe buffers de desenho e framebuffers conforme as recomendações do SDK.
- Siga as regras de DMA e coerência de cache quando CPU, ePicasso e controlador de display compartilharem buffers.

Para buffers cacheáveis compartilhados pela CPU e pelo ePicasso, siga as regras do SDK para cache e propriedade. Execute uma operação de clean de cache nos dados de origem escritos pela CPU antes que o hardware os leia. Antes de o hardware gravar em um buffer de destino, prepare-o conforme as regras do SDK para impedir que linhas de cache modificadas pela CPU sobrescrevam o resultado depois; após o término do hardware, invalide as linhas desatualizadas antes da leitura pela CPU. Respeite o alinhamento e os dados vizinhos; não altere buffers sob controle do hardware. Consulte o fluxo de buffers compartilhados na [Visão geral de gráficos](overview.md#memory-placement-strategy).

A divisão de funções apresentada na [Visão geral de gráficos](overview.md#sf32-graphics-flow) é fundamental para diagnosticar o desempenho da interface. Uma atualização lenta pode ser causada pelo tempo de renderização, pela largura de banda da memória, pela velocidade de transferência ao painel, pela configuração da interface de display ou pela sincronização. O ePicasso ajuda mais quando a renderização é o gargalo; se o limite for a transferência ao painel, atualização parcial, menor profundidade de cor, outra estratégia de buffers ou uma interface mais rápida podem ter maior efeito.

## Casos de uso típicos { #typical-use-cases }

O ePicasso é mais útil em produtos com muitos elementos visuais cuja interface ainda precisa respeitar o orçamento de energia de um microcontrolador.

Casos típicos:

- Mostradores e telas de aplicativos de smartwatches.
- Monitores de atividade física e telas para dispositivos vestíveis de monitoramento da saúde.
- Interfaces de áudio Bluetooth.
- Painéis compactos para bicicletas elétricas (e-bikes), patinetes elétricos (e-scooters) e outros veículos.
- Controles de casa inteligente e pequenos painéis de toque.
- Instrumentos médicos ou industriais portáteis.
- Impressoras de etiquetas, crachás inteligentes e etiquetas eletrônicas de prateleira.
- HMIs baseadas em LVGL com ícones, transparência e animações.

## Orientações práticas de projeto { #practical-design-guidance }

Comece pelos requisitos do display e da experiência do usuário e, a partir deles, defina a arquitetura gráfica.

Perguntas importantes:

- Qual é a resolução e a profundidade de cor do display?
- O painel é atualizado por SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD ou JDI?
- O produto precisa de animação em tela inteira ou principalmente de atualizações parciais?
- Os recursos da interface ficam na SRAM interna, na Flash ou na PSRAM?
- Quanta memória está disponível para buffers de desenho ou framebuffers?
- Quais operações o driver gráfico pode acelerar pelo ePicasso?
- Os buffers compartilhados pela CPU, ePicasso e controlador de display são coerentes em relação ao cache?

Em muitos produtos, o melhor resultado combina várias técnicas: desenho acelerado por hardware, atualização parcial, recursos compactados ou otimizados, posicionamento cuidadoso dos buffers e uma interface que evita redesenhos desnecessários da tela inteira.

## Principais conclusões { #key-takeaways }

- ePicasso é o acelerador gráfico 2D/2.5D da SiFli para microcontroladores SF32.
- Ele transfere da CPU operações comuns de pixel, como preenchimento, cópia, mesclagem, redimensionamento, rotação e composição de camadas.
- Ele trabalha junto ao controlador de display: ePicasso prepara os pixels, enquanto o controlador os envia ao painel.
- Seu benefício é maior em interfaces com muito conteúdo visual, nas quais a movimentação de memória, a mesclagem e o processamento repetido de pixels consumiriam muito tempo de CPU.
- LVGL e outros frameworks podem aproveitar o ePicasso quando o driver gráfico SF32 encaminha ao hardware as operações de desenho compatíveis.
- O desempenho real depende da resolução do display, do posicionamento de memória, dos formatos de pixel, da estratégia de buffers, do cache e da largura de banda da interface do painel.
