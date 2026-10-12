---
icon: lucide/palette
title: "Visão geral de gráficos"
description: "Como projetar interfaces gráficas para SF32: escolha do display, estratégia de framebuffer, integração com LVGL, aceleração ePicasso e posicionamento de memória."
tags:
  - Gráficos
---

# Visão geral { #graphics-overview }

## Planeje a arquitetura gráfica { #overview }

Este guia apresenta como criar interfaces gráficas responsivas em dispositivos SF32. O foco está nas decisões práticas que afetam produtos reais: escolha do display, estratégia de framebuffer, integração com LVGL, aceleração por hardware do ePicasso, posicionamento de memória e atualização do display.

Os dispositivos SF32 são voltados a produtos compactos de AIoT e wearables, nos quais a interface precisa ser fluida sem ultrapassar limites rigorosos de consumo de energia, memória e área de PCB. O fluxo gráfico separa o tratamento de recursos, a composição de pixels, a compressão opcional do framebuffer e a saída para o painel. Distinguir essas funções é essencial para escolher a otimização adequada.

Use esta página para tomar decisões de arquitetura de interface que são difíceis de reverter mais tarde: painel e interface, estratégia de framebuffer, profundidade de cor, transparência, localização dos recursos e política de atualização. Os artigos de gráficos relacionados detalham cada etapa.

## Fluxo gráfico SF32 { #sf32-graphics-flow }

O caminho típico dos recursos até o display é:

<div align="center"><em>Diagrama: fluxo dos recursos gráficos até o display</em></div>

```text
Source images, fonts, and animations
        │
        ▼
GraphicsTool converts supported resources to eZip or eZip-A
        │
        ▼
Compressed assets in NOR Flash, PSRAM, NAND, or file storage
        │
        ▼
eZip hardware decoder expands an asset when required
        │
        ▼
LVGL or another UI framework + graphics/display driver
        │
        ├── CPU fallback rendering
        │
        └── ePicasso pixel acceleration
        │
        ▼
Final rendered bitmap in a draw buffer or framebuffer
        │
        ├── Uncompressed display path
        │
        └── Optional: extDMA compresses it into TurboPixel
                    │
                    ▼
             TurboPixel framebuffer in PSRAM
        │
        ▼
Display controller transfers pixels to the panel
        │
        ▼
SPI / QSPI / 8080 / RGB / MIPI DSI / EPD / JDI panel
```

Esse fluxo é configurável: um produto pode não usar eZip, ePicasso, TurboPixel ou um framebuffer completo. A disponibilidade e as conexões dependem do dispositivo escolhido, do SDK, da interface de display, do painel e da configuração do driver. O cabeçalho LCDC atual do OpenSiFli define `LCDC_SUPPORTED_COMPRESSED_LAYER` somente quando `HAL_EXTDMA_MODULE_ENABLED` está habilitado e a condição da família permite; SF32LB52x e SF32LB57x são excluídos. Um comentário no código também informa que o caminho LCPU não está habilitado. A tabela publicada de recursos LCDC do SDK marca a descompressão de camadas comprimidas como não suportada no SF32LB55x. Portanto, considere o SF32LB55x condicional, e não como uma implementação validada de ponta a ponta. Verifique a revisão exata do SDK, o núcleo, a configuração de build e o hardware-alvo; consulte [TurboPixel](turbopixel.md#availability-in-the-sf32-family).

<div align="center"><em>Funções de cada etapa do fluxo gráfico SF32</em></div>

<div align="center" markdown>

| Bloco | Etapa do fluxo | Responsabilidade principal | O que não substitui |
|:---|:---|:---|:---|
| **eZip / eZip-A** | Antes da renderização, durante a leitura dos recursos armazenados | Descompacta sem perdas os recursos gráficos eZip compatíveis, incluindo imagens estáticas e animações. | O renderizador, o framebuffer final ou o controlador de display. |
| **ePicasso** | Durante a renderização e a composição | Acelera operações compatíveis de cópia, preenchimento, mesclagem, transformação e composição de pixels na memória. | A compressão de recursos ou a transferência para o painel. |
| **TurboPixel** | Depois da renderização e antes da saída para o painel, em dispositivos compatíveis | Usa extDMA para comprimir o bitmap final com perdas e taxa fixa, reduzindo a capacidade de PSRAM necessária e o tráfego de leitura do display. O cabeçalho atual define a capacidade de camadas comprimidas para SF32LB55x, SF32LB56x e SF32LB58x quando o extDMA está habilitado, e exclui SF32LB52x e SF32LB57x; um comentário informa que o caminho LCPU não está habilitado. A tabela publicada marca o 55x como não suportado. Antes de depender desse recurso, verifique o núcleo, a configuração do SDK e o caminho no hardware-alvo. | A compressão sem perdas de recursos ou a renderização de pixels. |
| **Controlador de display** | Etapa final de saída | Descomprime TurboPixel quando esse caminho está habilitado e transfere os pixels preparados pela interface do painel. | A descompressão de recursos eZip ou a composição gráfica. |

</div>

O código da aplicação define o estado e o comportamento da interface. O framework gerencia widgets, regiões a redesenhar e desenho. O driver do subsistema gráfico seleciona o processamento por CPU ou ePicasso e coordena os buffers; o controlador de display cuida da transferência para o painel. Para detalhes de implementação, consulte [ePicasso](epicasso-gpu.md), [eZip](ezip.md) e [TurboPixel](turbopixel.md).

## Escolha primeiro o display { #choose-the-display-first }

A escolha do display afeta quase todas as decisões gráficas. Antes de otimizar o código, defina claramente os requisitos do painel:

- Resolução.
- Profundidade de cor.
- Taxa de atualização.
- Tipo de interface.
- Requisitos do controlador de toque.
- Retroiluminação (backlight) ou linhas de alimentação do display.
- Suporte a atualização parcial.
- Presença de GRAM interno no painel.
- Necessidade de operação always-on de baixo consumo.

Um AMOLED pequeno com SPI ou QSPI se comporta de forma muito diferente de um painel RGB, MIPI DSI, JDI de memória ou EPD. O mesmo framework de interface pode atender a vários tipos de display, mas a estratégia de buffers e atualização precisa mudar conforme o painel.

Para escolher a interface, projetar o caminho de flush e inicializar o painel, consulte [Controlador de display](display-controller.md).

## Comece por um exemplo LVGL validado { #start-from-a-verified-lvgl-example }

Antes de montar as telas, escolha um exemplo do SDK que já valide o limite gráfico de maior risco para o produto. O artigo [Exemplos de LVGL do SDK](lvgl-sdk-examples.md) organiza os exemplos oficiais de referência, ferramentas de design, widgets, recursos compactados, animação e mídia, bússola, jogos e interface de relógio pela tarefa de engenharia que cada um demonstra e indica quais premissas de placa, versão, display, memória e desempenho precisam ser revalidadas ao adaptar o exemplo ao produto.

## Escolha o dispositivo SF32 adequado { #pick-the-right-sf32-device }

Escolha o chip considerando o display e a carga gráfica, não apenas a frequência da CPU.

<div align="center"><em>Tabela: Escolha do dispositivo SF32</em></div>

<div align="center" markdown>

| Requisito | Direção típica de dispositivo |
|:---|:---|
| Produto Bluetooth básico com interface pequena | SF32LB52x |
| Smartwatch de entrada, badge, etiqueta ou HMI simples | SF32LB52x |
| Wearable BLE com interface rica em informações de sensores | SF32LB55x |
| Display RGB ou interface LVGL mais completa | SF32LB56x |
| Cargas de áudio/gráficos adequadas para delegação à ACPU | SF32LB57x; confirme o suporte do SDK e a atribuição das tarefas |
| Display de alta resolução ou gráficos avançados | SF32LB56x ou SF32LB58x |
| Display MIPI DSI | SF32LB55x ou SF32LB58x, conforme o painel e a categoria do produto |
| Interface premium com gráficos, áudio, IA e memória ampla | SF32LB58x |

</div>

As restrições mais importantes são a interface e a resolução do display, a capacidade de memória, a geração do acelerador gráfico, os pinos disponíveis e o orçamento de energia.

## Calcule framebuffer e largura de banda { #framebuffer-and-bandwidth-calculator }

Estime o custo de memória e transferência antes de escolher o painel ou o estilo de animação:

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Exemplos:

<div align="center"><em>Tabela: Capacidade do framebuffer e tráfego de imagem</em></div>

<div align="center" markdown>

| Painel | Formato | Um buffer completo | Tráfego de imagem completa a 30 fps |
|:---|:---|---:|---:|
| 240 x 240 | RGB565 | ~113 KiB | ~3,46 MB/s |
| 390 x 390 | RGB565 | ~297 KiB | ~9,13 MB/s |
| 454 x 454 | RGB565 | ~403 KiB | ~12,37 MB/s |
| 480 x 480 | RGB888 | ~675 KiB | ~20,74 MB/s |

</div>

As capacidades dos buffers são expressas em KiB (1.024 bytes), e a largura de banda, em MB/s decimais (1.000.000 bytes/s). Os valores consideram apenas os pixels brutos: não incluem overhead de comandos, alinhamento, manutenção de cache, leitura de recursos, blending nem outros fluxos de dados do sistema. Se o produto também executar áudio Bluetooth ou IA, ou acessar PSRAM externa, reserve margem adicional.

## Entenda os buffers { #understand-your-buffers }

No fim, uma interface gráfica é representada por pixels na memória. Os principais tipos de buffer são:

<div align="center"><em>Tabela: Tipos de buffer gráfico</em></div>

<div align="center" markdown>

| Tipo de buffer | Finalidade |
|:---|:---|
| **Buffer de desenho** | Área temporária usada pelo LVGL ou pelo driver gráfico para renderizar as regiões alteradas. |
| **Framebuffer** | Memória de pixels da tela inteira, usada como fonte para o display. |
| **Framebuffer parcial** | Buffer de uma região menor, usado quando reservar a tela inteira custa caro demais. |
| **Buffer de recursos** | Dados de imagens, fontes, ícones ou recursos já decodificados. |
| **Camada intermediária** | Superfície temporária para blending, animação ou composição. |

</div>

Um framebuffer de tela inteira é prático, mas pode consumir SRAM demais em painéis maiores. Um buffer RGB565 de 454 x 454 contém 412.232 bytes (cerca de 412 kB ou 403 KiB); dois buffers precisam do dobro dessa capacidade. Resoluções e profundidades de cor maiores aumentam rapidamente esse custo.

Quando a memória é limitada, use buffers de desenho parciais e atualize apenas as regiões alteradas. Se a animação for importante e houver memória suficiente, um framebuffer completo ou uma estratégia com dois buffers pode deixar a interface mais fluida.

## Escolha a profundidade de cor com cuidado { #choose-color-depth-carefully }

A profundidade de cor afeta a qualidade visual, o uso de memória e a largura de banda do barramento.

<div align="center"><em>Tabela: Formatos e profundidade de cor</em></div>

<div align="center" markdown>

| Formato | Bytes por pixel | Observações |
|:---|---:|:---|
| **RGB565** | 2 | Equilíbrio comum para interfaces embarcadas, com boa eficiência de memória e largura de banda. |
| **RGB666** | 3 ou compactado | Mais precisão de cor, com maior uso de largura de banda. |
| **RGB888** | 3 | Maior qualidade, com custo mais alto de memória e transferência. |
| **RGB111 / formatos monocromáticos** | Depende do dispositivo | Úteis para displays simples ou de consumo ultrabaixo, como EPD/JDI. |

</div>

Para a maioria dos wearables e HMIs compactas, RGB565 é um bom padrão inicial, a menos que o painel, a meta de qualidade visual ou os requisitos do produto exijam outro formato.

## Transparência, alpha e composição de camadas { #transparency-alpha-and-layer-composition }

A transparência é representada pelo fator **alpha**, que indica quanto um pixel de primeiro plano contribui quando é desenhado sobre o fundo. Alpha é independente dos canais RGB. Um pixel opaco tem alpha 1 (ou 255 em um canal alpha de 8 bits); um pixel totalmente transparente tem alpha 0.

Na composição source-over sobre um **fundo opaco**, com cores do primeiro plano **não pré-multiplicadas pelo alpha** e alpha normalizado entre 0 e 1, cada canal RGB do resultado é calculado assim. Esta fórmula simplificada não calcula o alpha de saída de um destino transparente:

```text
output = foreground × alpha + background × (1 − alpha)
```

Por exemplo, um pixel de ícone com 50% de alpha contribui com metade da própria cor e deixa metade do fundo visível. Repetida em sequência, essa operação forma as camadas da interface: fundo, imagens, texto, controles translúcidos, sombras e animações. O bitmap composto segue então para as etapas de framebuffer e controlador de display mostradas acima.

<div align="center"><em>Tabela: Modos alpha e suas aplicações</em></div>

<div align="center" markdown>

| Modo alpha | Significado | Uso típico | Consideração de integração |
|:---|:---|:---|:---|
| **Alpha por pixel** | Cada pixel tem seu próprio valor alpha. | Ícones e texto com antialiasing, bordas suaves, sombras e recursos no estilo PNG. | Preserva transparências detalhadas, mas aumenta o tamanho dos dados de origem e o trabalho de blending. |
| **Alpha global** | Um único valor alpha se aplica a todo o objeto ou camada. | Fade de tela, diálogo ou imagem. | Eficiente para fades uniformes; não representa bordas suaves dentro do objeto. |
| **Alpha binário** | Cada pixel está totalmente visível ou totalmente transparente. | Máscaras e glifos simples. | Tem menor complexidade, mas as bordas podem ficar serrilhadas sem antialiasing. |

</div>

RGB565 não tem canal alpha e, por isso, costuma ser usado em destinos de desenho opacos e framebuffers finais. Recursos de origem ou camadas intermediárias que precisam de transparência normalmente usam um formato com canal alpha, como ARGB8888, ou uma imagem colorida com uma máscara alpha separada. O driver deve usar formatos realmente suportados pelo SDK, pelo caminho de display e pelo acelerador escolhido.

Há duas representações comuns de alpha. Com **alpha direto (straight alpha)**, o RGB descreve a cor original e o alpha é aplicado durante o blending. Com **alpha pré-multiplicado (premultiplied alpha)**, o RGB já foi multiplicado pelo alpha; a equação source-over passa a ser `output = premultiplied_foreground + background × (1 − alpha)`. Não misture as representações: interpretar dados com alpha direto como pré-multiplicados, ou o contrário, cria halos claros ou escuros nas bordas.

O blending alpha lê os pixels do primeiro plano e do destino e depois grava o resultado. Portanto, aumenta o tráfego de memória em relação a uma cópia ou preenchimento opaco simples. Use ePicasso quando o driver oferecer suporte à operação de blending e aos formatos escolhidos; caso contrário, mantenha um caminho de fallback em software. Limite camadas translúcidas em tela inteira, atualize apenas as regiões invalidadas e evite superfícies intermediárias desnecessárias quando a largura de banda da PSRAM ou o consumo de energia forem restrições.

## Integre o LVGL { #integrating-lvgl }

O LVGL é uma opção prática para interfaces em dispositivos SF32 porque oferece widgets, estilos, gerenciamento de entrada, animação, invalidação e pontos de integração com o driver de display.

Uma integração típica do LVGL precisa de:

- Um callback de flush do driver de display.
- Um ou mais buffers de desenho.
- Uma fonte de tick para o tempo do LVGL.
- Drivers de entrada para toque, botões, encoders ou gestos.
- Gerenciamento de recursos gráficos, como imagens e fontes.
- Hooks opcionais de aceleração por hardware para ePicasso.

O callback de flush do display marca o limite entre renderização e saída. O comportamento do controlador e do DMA é explicado em [Controlador de display](display-controller.md#controller-buffers-and-flush-paths).

## Decisões para portar o LVGL { #lvgl-porting-decisions }

Fixe estes detalhes de integração antes de aperfeiçoar as telas:

<div align="center"><em>Tabela: Decisões para portar o LVGL</em></div>

<div align="center" markdown>

| Decisão | Direção recomendada |
|:---|:---|
| Fonte de tick | Tick de sistema estável que continue correto entre a suspensão e a retomada. |
| Callback de flush | Caminho de transferência por região, com sinalização de conclusão pelo DMA/driver de display. |
| Número de buffers de desenho | Um ou dois, conforme a latência e o orçamento de memória. |
| Política de regiões invalidadas | Mescle regiões pequenas somente quando isso reduzir o custo total de transferência. |
| Dispositivos de entrada | Integre toque, botões e encoder pelos drivers de entrada do LVGL, e não por loops de polling na aplicação. |
| Aceleração por hardware | Habilite apenas as operações suportadas pelo SDK/driver e mantenha um caminho de fallback em software. |
| Gerenciamento de cache | Execute clean e invalidate nos buffers compartilhados na fronteira entre framework e driver. |

</div>

Uma boa integração do LVGL mantém o código das telas declarativo, enquanto o driver controla a transferência, a sincronização, a aceleração e o cache.

## Use a aceleração ePicasso { #using-epicasso-acceleration }

O ePicasso é útil quando a interface executa operações que, de outro modo, exigiriam muitos cálculos repetidos por pixel. Alguns exemplos:

- Preenchimento de retângulos.
- Cópia e blit de imagens.
- Alpha blending.
- Redimensionamento de imagens.
- Rotação ou transformação das regiões de imagem compatíveis.
- Composição de camadas.
- Conversão de formato de pixel, quando suportada pelo driver.

Uma boa adaptação do LVGL acelera as operações frequentes e de alto volume, mas mantém caminhos alternativos pela CPU para os casos não suportados. Não presuma que todo efeito de estilo do LVGL ou widget será executado em hardware. Meça as telas que realmente importam para o produto.

### Quando a aceleração mais ajuda { #when-acceleration-helps-most }

O ePicasso tende a trazer mais benefício quando:

- Grandes regiões precisam ser preenchidas, copiadas, mescladas, redimensionadas ou transformadas.
- A interface usa ícones transparentes, máscaras de texto, sombras, sobreposições ou transições animadas.
- Sem aceleração, a CPU gastaria uma parte significativa de cada quadro em loops de pixels.
- O posicionamento de memória e os formatos de pixel são adequados ao acelerador.

### Quando a aceleração pode ajudar pouco { #when-acceleration-may-not-help-much }

A aceleração por hardware pode trazer pouco benefício quando:

- A região atualizada é muito pequena.
- O gargalo é a largura de banda de transferência do painel, e não a renderização.
- Os recursos estão em formatos não suportados ou exigem conversão onerosa.
- Os buffers estão em memória lenta e sem largura de banda suficiente.
- O custo de manutenção de cache domina a operação.

## Estratégia de posicionamento de memória { #memory-placement-strategy }

O desempenho gráfico costuma ser limitado pelo tráfego de memória. Posicione os buffers deliberadamente:

- Sempre que possível, mantenha os buffers de desenho mais usados na SRAM rápida.
- Use PSRAM para framebuffers grandes somente quando a SRAM não for suficiente.
- Armazene imagens e fontes grandes em Flash ou PSRAM, considerando a latência de acesso.
- Evite converter recursos repetidamente durante a execução.
- Alinhe os buffers acessados por DMA conforme as orientações do SDK.
- Use recursos compactados ou indexados quando isso reduzir o tráfego total e o custo de decodificação.

Quando a CPU e o hardware gráfico ou de display compartilharem buffers, siga as regras do SDK para cache e propriedade dos buffers. Antes de o hardware ler dados escritos pela CPU, execute clean nas linhas de cache correspondentes e conclua a sincronização necessária. Antes de o hardware gravar no buffer, prepare-o para impedir que linhas sujas do cache da CPU sejam gravadas posteriormente na memória e sobrescrevam o resultado. Aguarde o término da transferência e invalide as linhas desatualizadas antes de a CPU ler o resultado. Respeite o alinhamento das linhas de cache e os dados vizinhos; não altere um buffer enquanto ele estiver sob controle do hardware. Use as rotinas compatíveis do SDK: clean e invalidate não são intercambiáveis.

Para atualização parcial, comportamento específico do painel e sequência de inicialização, consulte [Controlador de display](display-controller.md).

## Prepare os recursos gráficos { #asset-preparation }

Uma boa preparação dos recursos pode acelerar a interface antes mesmo da otimização do código.

Regras práticas:

- Use imagens com as dimensões reais em que serão exibidas.
- Evite redimensionar imagens grandes a cada quadro.
- Quando possível, pré-renderize sombras, gradientes ou fundos complexos.
- Use alpha somente onde a transparência for necessária.
- Prefira conjuntos compartilhados de ícones e subconjuntos de fontes.
- Remova dos arquivos de fonte os glifos que não serão usados.
- Prefira formatos de recurso processados com eficiência pelo caminho gráfico.

Em produtos multilíngues, a memória das fontes pode consumir grande parte do orçamento da interface. Planeje cedo a seleção de fontes alternativas, os subconjuntos de glifos e a composição do texto.

## Estratégia de animação { #animation-strategy }

Animações fluidas dependem do orçamento por quadro, da largura de banda do painel, do custo de renderização e do consumo de energia.

Uma abordagem prática:

- Anime somente o que o usuário percebe.
- Mantenha pequenas as regiões animadas.
- Prefira transformações ou alterações de opacidade que aproveitem bem a aceleração.
- Evite blur, sombra ou transparência em tela inteira a cada quadro.
- Reduza a taxa de quadros de efeitos não críticos.
- Interrompa as animações quando a tela estiver escurecida, coberta ou inativa.

Uma interface vestível não precisa de animações como as de um desktop em todos os elementos. Poucas transições rápidas e claras costumam funcionar melhor do que muitos efeitos que consomem energia ou derrubam a taxa de quadros.

## Matriz de validação gráfica { #graphics-validation-matrix }

Use telas de teste reproduzíveis em vez de avaliar apenas se a interface parece “fluida o suficiente”:

<div align="center"><em>Tabela: Matriz de validação gráfica</em></div>

<div align="center" markdown>

| Tela de teste | O que ela exercita |
|:---|:---|
| Preenchimento sólido e barras de cor | Formato de pixel, ordem dos bytes e caminho de flush. |
| Tela com muito texto | Memória de fontes, cache de glifos e atualização parcial. |
| Grade de ícones com alpha | Blending, largura de banda de recursos e caminho ePicasso. |
| Lista rolável | Regiões invalidadas, largura de banda de transferência e latência de entrada. |
| Transição em tela inteira | Orçamento por quadro, uso de dois buffers e largura de banda do painel. |
| Tela escurecida/em espera | Política de parada de animação, retroiluminação e solicitações de gerenciamento de energia (PM vote). |
| Pior caso de coexistência | Bluetooth, áudio ou IA ativos enquanto a interface é atualizada. |

</div>

Registre o tempo de renderização e de flush, a carga da CPU e o consumo de energia de cada tela. Medir apenas o tempo total do quadro dificulta identificar se o gargalo está no LVGL, ePicasso, memória ou interface do painel.

## Diagnóstico do desempenho gráfico { #debugging-graphics-performance }

Quando a interface ficar lenta, identifique o gargalo antes de alterar o projeto.

<div align="center"><em>Tabela: Diagnóstico do desempenho gráfico</em></div>

<div align="center" markdown>

| Sintoma | Área provável para verificar |
|:---|:---|
| Alto uso da CPU durante o desenho | Falta de aceleração por hardware, excesso de operações de pixel por software ou widgets complexos. |
| A renderização termina, mas o display atualiza lentamente | Largura de banda da interface do painel, tamanho do flush ou caminho de transferência do driver. |
| Tearing ou cintilação | Estratégia de buffers, sincronização ou temporização da atualização parcial. |
| Artefatos aleatórios | Coerência de cache, vida útil do buffer ou incompatibilidade de stride/formato de pixel. |
| Telas simples funcionam bem, mas animações não | Redesenho da tela inteira, blends alpha grandes, redimensionamento de recursos ou largura de banda do painel. |
| Consumo de energia elevado com a interface inativa | Redesenhos, timers e animações desnecessários ou política do display/retroiluminação. |

</div>

Meça separadamente:

- Tempo de renderização do LVGL.
- Tempo das operações ePicasso.
- Tempo de flush do display.
- Carga da CPU.
- Pressão sobre a largura de banda da memória.
- Consumo de energia nos estados ativo, ocioso e de suspensão.

## Erros comuns { #common-mistakes }

Evite estes erros: corrigi-los no fim do projeto costuma ser caro.

- Escolher a interface do painel sem estimar a largura de banda.
- Redesenhar a tela inteira para pequenas alterações na interface.
- Armazenar todos os recursos em memória lenta sem medir o desempenho.
- Usar RGB888 quando RGB565 atende aos requisitos.
- Redimensionar imagens grandes a cada quadro.
- Esquecer a manutenção de cache em buffers compartilhados com hardware.
- Presumir que ePicasso acelera automaticamente todas as operações da interface.
- Usar timers ou animações em excesso e manter a CPU ativa.
- Ignorar a latência do toque enquanto se otimiza apenas a taxa de quadros.
- Esperar o bring-up da PCB para validar a inicialização do painel.

## Checklist de bring-up { #bring-up-checklist }

Use este checklist ao iniciar um projeto gráfico com SF32:

- [ ] Confirme a resolução, a profundidade de cor, a interface e o circuito integrado controlador do painel.
- [ ] Confirme se o dispositivo SF32 escolhido suporta a interface de display necessária.
- [ ] Estime a memória exigida pelos framebuffers e buffers de desenho.
- [ ] Defina uma estratégia de buffer completo ou parcial, com buffer simples ou duplo.
- [ ] Faça o bring-up do reset do painel, das linhas de alimentação, da retroiluminação e da sequência de inicialização.
- [ ] Implemente o tick do LVGL, o flush do display e os drivers de entrada.
- [ ] Verifique preenchimentos, imagens, texto e toque.
- [ ] Habilite a aceleração ePicasso quando o SDK e o driver oferecerem suporte.
- [ ] Valide a limpeza/invalidação de cache para buffers compartilhados.
- [ ] Meça o tempo de renderização e flush, a carga da CPU e o consumo de energia.
- [ ] Teste telas de pior caso, animações, atividade Bluetooth e transições entre suspensão e retomada.

## Principais conclusões { #key-takeaways }

- Comece pelo tipo de interface do display, resolução, profundidade de cor e requisitos de atualização.
- Use LVGL ou um framework semelhante para gerenciar widgets, invalidação, desenho e entrada.
- Use ePicasso para acelerar operações de pixels compatíveis, mantendo caminhos de fallback em software.
- Otimize o posicionamento de memória e a estratégia de buffers com o mesmo cuidado dedicado ao código de renderização.
- Prefira atualização parcial em painéis limitados pela largura de banda e em telas vestíveis estáticas.
- Trate o desempenho gráfico como um problema de sistema: CPU, ePicasso, memória, controlador de display, interface do painel, toque e política de energia.
