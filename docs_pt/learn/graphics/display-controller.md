---
icon: lucide/monitor
description: "Como o controlador de display SF32 transfere pixels preparados ao painel, incluindo a seleção da interface, os caminhos de flush, a atualização parcial e a inicialização do painel."
tags:
  - Gráficos
---

# Controlador de display { #display-controller }

## Visão geral { #overview }

O **controlador de display** (LCDC) envia os pixels já preparados ao painel pela interface selecionada. Nos dispositivos e nas configurações compatíveis, também descompacta o framebuffer TurboPixel durante a saída. O LCDC permite uma mesclagem alfa limitada das camadas de saída sobre um fundo monocromático. A documentação descreve as camadas 0 e 1, mas o SF32LB52x não oferece a camada 1. Esse recurso não substitui a renderização geral da UI nem a composição com ePicasso. A decodificação de recursos eZip continua sendo uma operação separada.

Referência primária: [documentação LCDC HAL da SiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/lcdc.md).

O link acima está fixado em um commit específico do SiFli-SDK. Ele documenta o comportamento do HAL naquela revisão, mas não comprova que todas as interfaces, camadas ou funções estejam disponíveis em todos os dispositivos e encapsulamentos SF32 ou em outras versões do SDK. Confirme a combinação exata de dispositivo, encapsulamento e versão do SDK usada no projeto.

Consulte a [Visão geral de gráficos](overview.md#sf32-graphics-flow) para ver o fluxo completo dos recursos até o painel. Este artigo se concentra no controlador, na conexão com o painel e na integração do driver.

Consulte esta página ao escolher a interface do painel, definir o caminho de flush do LVGL ou inicializar um painel novo no hardware. Ela separa o trabalho de saída do controlador da decodificação de recursos e da composição de pixels, ajudando a localizar problemas na camada correta.

## Escolha a interface de display { #select-the-display-interface }

EPD e Memory-in-Pixel descrevem tecnologias de painel ou formas de atualizar pixels, não barramentos intercambiáveis. Um módulo EPD pode usar SPI para se conectar a um controlador externo; o modo de acionamento direto de EPD pelo LCDC também está documentado para o SF32LB57x. JDI oferece modos de interface serial e paralela com sinais diferentes. Confira a interface elétrica e os requisitos de manutenção do painel, não apenas sua categoria.

A escolha do painel afeta a largura de banda, a estratégia de buffers, o uso de pinos, o consumo de energia, a complexidade de inicialização e os riscos para a PCB. Confirme a lista exata de interfaces compatíveis com o dispositivo e o encapsulamento escolhidos.

<div align="center"><em>Opções de interface e tecnologia de painel</em></div>

<div align="center" markdown>

| Interface ou tipo de painel | Uso típico | Observações de projeto |
|:---|:---|:---|
| **SPI de 3/4 fios** | Painéis TFT ou AMOLED pequenos, HMIs simples | Usa poucos pinos e tem roteamento simples, mas a largura de banda é limitada para animações em tela cheia. |
| **Dual-SPI / Quad-SPI** | AMOLED vestível e displays compactos | Oferece mais largura de banda que o SPI básico, mantendo moderado o número de pinos. |
| **Interface MCU 8080** | Painéis de display paralelos | Oferece mais largura de banda que o SPI serial, mas usa mais pinos. |
| **RGB / DPI** | Displays maiores ou com maior taxa de atualização | Fluxo contínuo de pixels, com maior demanda de largura de banda e pinos e requisitos de temporização mais rigorosos. |
| **MIPI DSI** | Painéis AMOLED de alta densidade de pixels ou avançados | Alta largura de banda com poucos pinos, mas maior complexidade de inicialização e integridade de sinal. |
| **Tecnologia de painel EPD** | Papel eletrônico e displays de taxa de atualização muito baixa | A interface do lado do host depende do módulo e do controlador. Conforme o painel, é possível manter uma imagem estática com baixo consumo; as atualizações são lentas e exigem controle específico da forma de onda e da alimentação. |
| **JDI (serial ou paralelo)** | Painéis refletivos de baixo consumo | Os modos JDI usam sinais diferentes; confirme a interface elétrica e os requisitos de manutenção do painel escolhido. |
| **Painel com tecnologia Memory-in-Pixel** | Displays refletivos de baixo consumo, inclusive para UI sempre ativa ou legível sob luz solar | A memória dos pixels é integrada ao painel; o comportamento de atualização difere do TFT/AMOLED. Consulte a folha de dados do painel. |

</div>

Por exemplo, um painel SPI/QSPI pequeno pode favorecer atualizações parciais, enquanto um painel RGB/DPI exige um orçamento de largura de banda para a leitura contínua da tela (scanout). Não escolha a interface apenas pelo throughput teórico: considere o formato de pixel, a resolução, o comportamento de atualização, a GRAM do painel e os demais usuários de PSRAM.

## Matriz de interfaces por dispositivo { #per-device-interface-matrix }

A matriz abaixo auxilia na escolha da família; não é uma tabela de atribuição de pinos. Ela resume as interfaces de display documentadas para cada família SF32 ou variante de silício indicada. Um traço significa que a interface não está documentada para aquela linha; isso não exclui um controlador externo acionado por GPIO nem uma implementação específica da placa. Antes de fechar o esquemático, confirme o código exato do dispositivo, o encapsulamento, a multiplexação dos pinos, a versão do SDK e o driver do painel.

<div align="center"><em>Matriz de interfaces de display SF32</em></div>

<div align="center" markdown>

| Família / variante SF32 | Interfaces de LCD/painel documentadas | Restrição de encapsulamento ou variante | Orientação prática para seleção |
|:---|:---|:---|:---|
| **SF32LB52x** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), JDI serial/paralelo; EPD por controlador SPI; o guia de hardware de 52B/D/E/G/J também documenta uma interface de sinais EPD paralela de 8 bits | Os modelos 52x listados usam QFN68L. O guia de hardware de 52B/D/E/G/J lista os sinais e o controle do PMIC TPS, mas isso não comprova suporte ao modo de acionamento direto de EPD pelo LCDC. Confirme o driver e a variante exata. | Adequado a projetos compactos com SPI/QSPI, 8080 e JDI; para EPD paralelo, verifique a implementação de GPIO, temporização e controle de alimentação TPS da variante escolhida. |
| **SF32LB55x** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI serial/paralelo, MIPI DSI em modo comando | A interface MIPI DSI documentada de 2 vias de dados está disponível nos encapsulamentos BGA145/169; JDI e a operação com dois displays via MIPI DSI + SPI/DSPI só estão documentados para 557VD3A6. O modo comando exige um controlador de painel com SRAM/GRAM interna. | Dispositivos vestíveis e outros dispositivos conectados com tela, usando encapsulamento BGA compatível e painel MIPI em modo comando. |
| **SF32LB56xU** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, JDI serial | As variantes U listadas usam QFN68L; confirme o código exato e a multiplexação dos pinos. | Adequado a projetos compactos com painel serial que priorizem a largura de banda QSPI e um número menor de pinos. |
| **SF32LB56xV** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, JDI serial/paralelo | As variantes V listadas usam WBBGA175 (BGA175 no guia de modelos); confirme os pinos necessários e o roteamento para o código exato. | Adequado a projetos de alta resolução ou alta taxa de atualização que precisem de 8080, DPI/RGB ou JDI paralelo. |
| **SF32LB57x** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, 8080/DBI de 8/16 bits, DPI/RGB, JDI e EPD com acionamento direto | As opções de encapsulamento incluem QFN68L, QFN80L e BGA112; confirme o código exato, os pinos disponíveis e o caminho de controle do painel. | Adequado a projetos com uso intensivo de gráficos e diferentes requisitos de interface, como paralela, serial, JDI ou EPD. |
| **SF32LB58x** | SPI de 3/4 fios, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI serial/paralelo, MIPI DSI de 2 vias de dados nos modos comando e vídeo | Os códigos de pedido listados usam BGA256. O modo comando usa um controlador de painel com SRAM/GRAM interna; o modo vídeo também aceita controladores de painel sem RAM. O guia de modelos também lista operação com dois displays via MIPI DSI + SPI/DSPI/QSPI. Confirme o controlador LCD e a multiplexação dos pinos para o projeto exato. | Adequado a projetos de UI de alta resolução e alta demanda de largura de banda, inclusive configurações com dois displays e painéis MIPI DSI com ou sem RAM no controlador. |

</div>

No **SF32LB56x**, não trate as variantes U e V como intercambiáveis. Para **SF32LB55x** e **SF32LB58x**, só reserve MIPI DSI no esquemático depois de confirmar o encapsulamento exato, os pinos DSI disponíveis e os requisitos de vias de dados e modo do painel. Em particular, o SF32LB55x só oferece modo comando; portanto, não é compatível com um painel sem RAM em modo vídeo. Projetos EPD também exigem planejamento específico para a temporização, a forma de onda e a alimentação do painel; conhecer apenas a interface não basta para concluir o projeto.

O guia de modelos de chips da SiFli lista DPI/RGB entre as interfaces da família SF32LB55x, mas sua tabela por código de pedido não atribui DPI aos SKUs listados. Considere isso apenas uma indicação no nível da família; antes de depender de DPI, confirme o suporte e a disponibilidade dos pinos no código exato. A distinção U/V do SF32LB56x segue os guias de hardware separados, e não a tabela HAL comum à família.

Os dois guias de hardware do SF32LB52x divergem quanto ao JDI: o resumo cita JDI serial, enquanto as seções detalhadas mostram mapeamentos de sinais paralelos. Por isso, a matriz mantém as duas informações documentadas, sem garantir a disponibilidade dos pinos em um código específico. Antes de fechar o projeto, confirme o mapeamento LCDC, o SDK/driver e os sinais do painel para a variante exata.

No SF32LB52x, diferencie a interface de sinais EPD paralela de 8 bits documentada do modo de acionamento direto de EPD pelo LCDC. O guia de hardware do 52B/D/E/G/J lista os sinais EPD paralelos e o controle do PMIC TPS; separadamente, as notas de versão do SiFli-SDK v2.5.1 documentam o acionamento direto de EPD pelo LCDC no SF32LB57x. Não presuma que um projeto 52x possa usar o modo de acionamento direto de EPD pelo LCDC do 57x; confirme o driver e a implementação de temporização para a variante exata.

Fontes das interfaces: [guia de seleção de chips SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), [guia de hardware SF32LB52x com bateria](https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html), [guia de hardware 52B/D/E/G/J](https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html), [SF32LB55x](https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html), [SF32LB56xU](https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html), [SF32LB56xV](https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html), [SF32LB58x](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html) e [notas de suporte do SF32LB57x no SDK](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1).

## Controlador, buffers e caminhos de flush { #controller-buffers-and-flush-paths }

O diagrama de referência do LCDC diferencia a área visível do painel, a janela de atualização e a região do buffer de origem. Aplique os offsets de coluna e linha de forma consistente. A janela de atualização pode se sobrepor apenas parcialmente à região do buffer de origem; os pixels da janela sem dados de origem exibem a cor de fundo. Confira em conjunto as coordenadas, a origem do buffer e o stride, sem presumir que o buffer e a janela são iguais.

O framework de UI produz os pixels alterados; o driver e o controlador de display os enviam ao painel. O caminho adequado depende do painel:

- Um driver SPI/QSPI ou 8080 normalmente define uma janela do painel e transfere apenas a região alterada.
- Um controlador que faz a varredura do framebuffer lê os pixels da memória conforme a temporização do display.
- Um caminho compatível com TurboPixel lê o bitmap final compactado e o descompacta na etapa do controlador de display.

Em um projeto com LVGL, o callback de flush do display marca o limite entre a renderização e a saída. Ele deve considerar a região a atualizar, iniciar a operação correta de DMA ou do controlador e sinalizar a conclusão somente quando o framework puder reutilizar o buffer de desenho com segurança. Defina explicitamente as operações de limpeza (clean) e invalidação (invalidate) de cache sempre que CPU e hardware compartilharem buffers.

A propriedade do buffer deve seguir o caminho real de transferência. Ao transferir para a memória do painel, libere o buffer de desenho somente depois que o hardware terminar de lê-lo. Na varredura contínua, uma interrupção de quadro não basta para liberar o framebuffer ativo: espere a confirmação da troca de buffers, quando o controlador deixar de ler o buffer anterior. O fim da transferência e a atualização visível são eventos diferentes; use o sinal TE ou a temporização de quadro do painel quando necessário para evitar tearing.

Se a memória compartilhada usar cache, limpe o cache dos dados de origem escritos pela CPU antes da leitura pelo hardware. Antes de uma escrita pelo hardware, prepare o destino conforme as regras de manutenção de cache da plataforma, para impedir que linhas modificadas sejam gravadas depois e sobrescrevam o resultado. Após a conclusão da operação de hardware, invalide o destino antes da leitura pela CPU. Respeite o alinhamento e a propriedade das linhas de cache, inclusive para dados vizinhos que compartilhem uma mesma linha.

<div align="center"><em>Decisões para o caminho de display</em></div>

<div align="center" markdown>

| Decisão | O que validar |
|:---|:---|
| Região de flush | Transfira apenas as regiões alteradas quando o painel e o driver oferecerem suporte. |
| Buffers | Escolha buffers parciais ou de quadro completo, simples ou duplos, conforme os requisitos de latência e memória. |
| Sincronização | Libere ou reutilize o buffer somente quando o hardware deixar de lê-lo; confirme a troca de buffers na varredura contínua. |
| Formato de pixel | Compatibilize painel, driver, renderizador e qualquer caminho de aceleração para evitar conversões no caminho crítico. |
| Cache | Limpe (clean) os buffers escritos pela CPU antes de o hardware lê-los; invalide (invalidate) os buffers escritos pelo hardware antes de a CPU lê-los. |

</div>

## Atualização parcial e regiões alteradas { #partial-refresh-and-dirty-regions }

A renderização parcial e a transferência parcial ao painel são otimizações diferentes. Um fluxo contínuo RGB/DPI ou DSI em modo vídeo pode continuar enviando o quadro inteiro mesmo quando apenas uma pequena região da memória muda. Para EPD, confira as formas de onda aceitas, a dependência da temperatura, as imagens residuais e os intervalos de atualização completa. Não presuma que uma região de atualização menor seja sempre válida.

A maioria das UIs embarcadas não precisa redesenhar a tela inteira a cada quadro. O LVGL acompanha as regiões invalidadas, e o driver pode atualizar apenas as áreas alteradas. Isso é especialmente útil com painéis SPI/QSPI, dispositivos vestíveis alimentados por bateria, páginas estáticas com poucos valores que mudam e displays EPD e JDI.

A atualização da tela inteira é adequada para telas com muitas animações, transições ou painéis que naturalmente fazem a varredura a partir de um framebuffer completo. A escolha depende da largura de banda da interface de display, do comportamento do painel e do orçamento de memória, não apenas da configuração do framework de UI.

## Sequência de inicialização do painel { #panel-bring-up-sequence }

Inicialize o painel por etapas antes de depurar widgets ou o comportamento da aplicação:

1. Verifique as linhas de alimentação, a temporização do reset, os pinos de retroiluminação e habilitação e o consumo básico de corrente.
2. Envie a sequência de inicialização do fabricante do painel exatamente como foi fornecida.
3. Exiba cores sólidas para identificar problemas de ordem de bytes, formato de pixel ou cabeamento da interface.
4. Desenhe padrões geométricos simples para verificar stride, endereçamento de janela e coordenadas.
5. Adicione imagens e texto para verificar a conversão de cor, as fontes e a alocação dos recursos.
6. Habilite atualização parcial, DMA, TurboPixel e aceleração gráfica, um recurso por vez.
7. Teste os caminhos de suspensão, display desligado, retomada e reinicialização.

Primeiro valide cores sólidas e padrões com uma configuração mínima da interface prevista. Depois de adicionar DMA, compactação ou aceleração, repita os testes por cada caminho novo antes de testar a UI completa do LVGL.

## Isole falhas no caminho de display { #isolate-display-path-failures }

Trate cada etapa como um limite independente. Isso evita alterar ao mesmo tempo os comandos do painel, o código LVGL, a alocação dos buffers e as configurações de DMA, o que torna uma falha de display mais difícil de reproduzir.

<div align="center"><em>Matriz de diagnóstico do caminho de display</em></div>

<div align="center" markdown>

| Sintoma | Primeiro ponto a verificar | Teste direcionado | Classe provável da causa |
|:---|:---|:---|:---|
| O painel permanece apagado | Alimentação, reset e inicialização do painel | Meça as linhas de alimentação e o reset; execute a sequência de inicialização do fabricante; envie uma cor sólida. | Sequência de alimentação, polaridade do reset, comandos de inicialização ou conexão física da interface. |
| Preenchimentos sólidos funcionam, mas as cores estão erradas | Formato de pixel entre o renderizador e o painel | Exiba barras de teste vermelhas, verdes, azuis, pretas e brancas. | Ordem RGB/BGR, ordem de bytes, configuração de profundidade de cor ou conversão de formato. |
| A imagem fica deslocada, cortada ou apresenta tearing | Endereçamento e sincronização | Desenhe uma grade e, em seguida, teste repetidamente uma região fixa de atualização. | Coordenadas da janela, stride, temporização do painel, reutilização de buffer ou sincronização incompleta de DMA. |
| A UI estática funciona, mas a animação engasga | Limites de renderização, transferência e memória | Meça separadamente o tempo de renderização e o tempo até a conclusão do flush. | Área redesenhada excessiva, contenção de PSRAM, interface lenta ou estratégia de buffers inadequada. |
| Artefatos aparecem somente após suspensão/retomada | Transição de estado de energia | Repita o teste de preenchimento/grade após cada caminho compatível de desligamento e retomada do display. | Estado do painel perdido, reset/inicialização omitidos, sequência dos trilhos ou estado obsoleto de cache/buffer. |
| Um recurso falha somente quando habilitado | Caminho opcional específico | Habilite DMA, atualização parcial, ePicasso ou TurboPixel, um por vez. | Configuração incompatível, regra de alinhamento/cache ou erro de integração do driver. |

</div>

## Orientações específicas por painel { #panel-specific-guidance }

### AMOLED/TFT SPI e QSPI { #spi-and-qspi-amoledtft }

Priorize atualizações parciais, use RGB565 quando adequado e mantenha pequenas as regiões animadas. Evite redesenhar a tela inteira para pequenas alterações; renderize e componha os pixels antes de atualizar a região alterada.

### Painéis RGB / DPI { #rgb-dpi-panels }

Dimensione a largura de banda contínua de scanout considerando também o tráfego da CPU, do ePicasso, do DMA e dos demais acessos à memória. Escolha uma estratégia de framebuffer compatível com a taxa de atualização necessária, considere buffers duplos quando houver memória suficiente e leve em conta a temporização e a integridade de sinal no projeto da PCB.

### Painéis MIPI DSI { #mipi-dsi-panels }

Escolha o modo do painel antes de fechar a seleção do componente. **O SF32LB55x oferece somente o modo comando MIPI DSI**, portanto o controlador do painel precisa ter SRAM/GRAM interna para armazenar a imagem atualizada. **O SF32LB58x oferece os modos comando e vídeo**: painéis em modo comando precisam de RAM no controlador, enquanto o modo vídeo pode acionar um controlador sem RAM pelo fluxo contínuo de pixels. Valide a inicialização desde o início, teste os estados de baixo consumo e o tempo de retomada e mantenha a taxa de dados necessária abaixo da vazão útil da interface, com margem para a sobrecarga do protocolo, as restrições de temporização e os demais acessos à memória.

### Displays EPD { #epd-displays }

Projete para atualizações pouco frequentes; use modos de atualização parcial apenas quando forem compatíveis e visualmente aceitáveis. Não presuma que haverá animações e planeje os requisitos do PMIC do display, do VCOM e da forma de onda.

### Interfaces JDI e painéis Memory-in-Pixel { #jdi-memory-in-pixel-displays }

Neste artigo, JDI refere-se aos modos de interface serial ou paralela do painel; Memory-in-Pixel é uma tecnologia de painel. Eles podem aparecer juntos em alguns projetos de baixo consumo, mas não são termos intercambiáveis. Em um painel MIP, pequenas regiões de atualização e um layout de UI adequado podem aproveitar a retenção do estado dos pixels enquanto o painel está alimentado. Isso não significa armazenamento não volátil da imagem nem consumo zero do sistema em espera. Siga a folha de dados do painel para inversão COM e outras operações de manutenção; depois meça a atualização, a legibilidade ao ar livre e o consumo nas condições do produto.

## Checklist de entrega para produção { #production-handoff-checklist }

Antes de considerar completo o caminho de display, registre as escolhas que outro engenheiro deverá conseguir reproduzir:

- Dispositivo SF32 e encapsulamento exatos, versão do SDK, revisão da placa, código do painel e revisão do controlador do painel.
- Modo de interface, atribuição de pinos, formato de pixel, ordem de bytes/cores, comportamento de atualização desejado e origem da sequência de inicialização do painel.
- Localização, tamanho e alinhamento do buffer de desenho e do framebuffer, responsável pela manutenção de cache e sinal de conclusão do DMA/controlador.
- Política de atualização parcial, regras das janelas do painel e quaisquer regiões que precisem ser atualizadas em conjunto para evitar artefatos.
- Tempo de renderização e de transferência medidos, tráfego de PSRAM de pico/médio quando relevante e corrente para estados representativos da UI.
- Resultados dos testes de suspensão, display desligado, retomada e recuperação, incluindo o comportamento após uma transferência com falha ou interrompida.

Esse registro transforma uma inicialização pontual do display em uma integração de produto reproduzível. Valide-o novamente sempre que houver mudança no painel, SDK, organização da memória, formato de pixel ou driver de display.

## Principais conclusões { #key-takeaways }

- O controlador de display é responsável pela saída para o painel; ele é independente da composição de pixels do ePicasso e da descompactação de recursos do eZip.
- A escolha da interface determina grande parte da largura de banda, da estratégia de buffers, do consumo, do uso de pinos e do projeto da PCB.
- Trate o caminho de flush, a sincronização, a manutenção de cache e a inicialização do painel como tarefas centrais do firmware.
- Valide o painel com padrões simples antes de habilitar UI de nível superior, DMA, TurboPixel ou recursos de aceleração.
- Diagnostique falhas verificando um limite do caminho de display por vez e preserve a configuração e as medições validadas para a entrega à produção.
