---
icon: lucide/layout-dashboard
title: "Exemplos de LVGL do SDK"
description: "Escolha o exemplo do SiFli-SDK LVGL adequado para validar a interface, os widgets, as ferramentas de design, os recursos compactados, as animações, as mídias e as interfaces para dispositivos vestíveis."
tags:
  - Gráficos
  - LVGL
  - Exemplos
---

# Exemplos de LVGL do SDK { #lvgl-sdk-examples }

Os exemplos de LVGL do SiFli-SDK são pontos de partida para testar o display e a UI, não modelos de produto intercambiáveis. Primeiro confirme o funcionamento básico do painel e da entrada com uma demo da versão adequada. Depois escolha o exemplo que cubra o principal risco de integração do produto, execute-o sem alterações com uma configuração de placa documentada e substitua uma camada por vez. Confira o estado de verificação e as restrições de cada README antes de considerá-lo uma base funcional.

Este guia organiza os exemplos do [índice de LVGL do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) por objetivo de engenharia. Consulte a página oficial para ver as placas atualmente compatíveis, a configuração do SDK, os caminhos do código-fonte, os recursos, os comandos de compilação e as restrições específicas de cada versão.

O índice é um catálogo, não uma matriz de compatibilidade de placas. O suporte é específico de cada exemplo, e o nome de uma família na URL da documentação não comprova que essa família seja compatível. Consulte a seção **Supported Boards** de cada exemplo. Um comando genérico de compilação ou a presença de uma placa na matriz de compilação do repositório, por si só, não comprova validação em tempo de execução. Se as fontes divergirem, mantenha essa distinção explícita e confira a revisão exata do SDK e a placa.

## Comece com a base LVGL adequada { #start-with-the-right-lvgl-baseline }

<div align="center"><em>Tabela: Exemplos de LVGL do SiFli-SDK por tarefa de engenharia</em></div>

<div align="center" markdown>

| Objetivo de engenharia | Comece por | O que o exemplo ajuda a validar | Avance quando |
|:-----------------|:-----------|:----------------------------|:-------------|
| Colocar em funcionamento uma aplicação LVGL padrão | **[Demos LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[Exemplos oficiais LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[Demo LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)** ou **[Exemplos oficiais LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | A versão de LVGL escolhida, o driver de display da placa, o loop de renderização e os widgets básicos | O caminho de atualização do display (flush) e o dispositivo de entrada estiverem estáveis no painel real |
| Avaliar um fluxo de trabalho de design de UI | Exemplos de **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)** ou **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** | Como integrar o código de UI gerado a um projeto do SDK | O código gerado compilar sem erros e usar a mesma versão de LVGL do projeto |
| Prototipar um comportamento específico de UI | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)** ou **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | Um padrão específico de interação, widget, organização de elementos ou animação | O produto precisar de uma tela composta, e não apenas de um elemento visual isolado |
| Validar recursos, animações ou mídias | **[Carregamento dinâmico de eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Reprodução de vídeo local](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)** ou **[Streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | O caminho de armazenamento, decodificação, renderização e atualização para conteúdo mais rico | O tamanho dos recursos, sua alocação na memória, a taxa de atualização e o consumo de energia forem medidos no hardware de destino e atenderem aos limites do produto |
| Criar uma UI completa e representativa | **[Bússola eletrônica](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Índice de jogos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([README do Campo Minado](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)) ou **[Interface de relógio v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | O fluxo entre telas, as interações e uma carga gráfica com vários recursos | Os dados específicos do produto, o comportamento ao longo do ciclo de vida e os limites de desempenho estiverem prontos para substituir o conteúdo da demonstração |

</div>

As listas de placas variam conforme o exemplo. O README de v8 Demos lista `eh-lb563` e as séries LCD SF32LB52x, SF32LB56x e SF32LB58x. O README de v8 Official Examples lista `sf32lb52-lchspi-ulp` e essas três séries LCD. O README de v9 Demo lista as três séries LCD; as instruções genéricas de compilação também mostram `eh-lb563`, que não consta na lista explícita **Supported Development Boards**. O README de v9 Official Examples lista `sf32lb52-lchspi-ulp` e as três séries LCD. Considere a lista explícita de cada README como o escopo documentado; não acrescente uma placa com base apenas em um exemplo genérico de compilação.

## Delimite primeiro o escopo da integração { #confirm-the-integration-boundary-first }

Antes de adaptar um exemplo de LVGL, identifique quais camadas ele já valida e quais ainda precisam ser desenvolvidas e verificadas para o produto:

<div align="center"><em>Tabela: Limites de integração dos exemplos de LVGL</em></div>

<div align="center" markdown>

| Área | O que o exemplo valida | O que ainda precisa ser validado no produto |
|:---------|:--------------------------|:--------------------------------|
| Placa e painel | Uma configuração de placa do SDK conhecida e o caminho de exibição correspondente | O painel exato, o controlador de toque, a sequência de alimentação, a multiplexação dos pinos, a temporização do reset e o processo de teste de produção |
| LVGL | A inicialização específica da versão e o comportamento da UI de exemplo | A arquitetura de telas do produto, a responsabilidade pelos eventos, os limites de memória e a política de atualização |
| Recursos | Um caminho compatível para carregar os recursos de exemplo | O formato dos recursos, o espaço de armazenamento, o tempo de carregamento, a política de cache, o licenciamento e o tratamento de falhas |
| Renderização | Um loop funcional de desenho e atualização (flush) | A estratégia para regiões alteradas, a quantidade de buffers, o formato de cor, o tratamento de DMA/cache e a capacidade de resposta da UI sob carga |
| Aplicação | O comportamento visível da demonstração | Sensores, Bluetooth, armazenamento, controle de tempo, transições de baixo consumo, recuperação de falhas e dados do usuário |

</div>

Comece verificando o display físico, sua interface com o painel e o caminho básico de atualização (flush). Consulte também a [Visão geral de gráficos](overview.md) e o [Controlador de display](display-controller.md); uma demonstração de LVGL, por si só, não comprova que a arquitetura gráfica final está pronta.

## Escolha a versão de LVGL deliberadamente { #choose-the-lvgl-version-deliberately }

O índice oficial inclui exemplos de LVGL v8 e LVGL v9. Mantenha o projeto de UI gerado, o exemplo usado como base e a configuração do SDK na mesma versão principal do LVGL. Não migre uma tela gerada ou um widget personalizado de uma versão principal para outra sem revisar explicitamente as adaptações necessárias.

Na primeira inicialização da placa, use a demonstração ou o exemplo oficial que corresponda à versão de LVGL selecionada na configuração da placa do SDK. Assim, será possível validar o painel, os buffers, a entrada e o agendamento de tarefas antes de começar o desenvolvimento específico da aplicação.

!!! warning "Faça backup do cartão antes de usar o exemplo SJPG do LVGL v8"
    No projeto v8 Official Examples, o caminho opcional que carrega SJPG do cartão TF chama `dfs_mkfs()` na região raiz do cartão se a montagem falhar, o que pode apagar dados. Faça backup antes de habilitar e executar esse caminho e confira o código da revisão do SDK em uso. Não generalize este aviso para todos os exemplos de LVGL v8 ou v9: verifique o comportamento de montagem e formatação de cada projeto.

## Geração de UI: gui_guider, SquareLine e EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

Use um exemplo de ferramenta de design de UI quando a equipe precisar de um editor visual para criar a hierarquia das telas, os estilos e os recursos. O índice inclui exemplos de **gui_guider**, **SquareLine** e **EEZ Studio**.

Antes de integrar ao produto o código gerado, confira sua versão, a resolução da tela, a profundidade de cor, os caminhos dos recursos e quem é responsável pelos callbacks.

Os exemplos oficiais de gui_guider e EEZ Studio especificam LVGL v8. SquareLine também exige o tema padrão usado pelo código gerado. Inclua os subdiretórios gerados na compilação e siga os passos documentados da conversão opcional com eZip; copiar arquivos não é suficiente.

O código gerado acelera a construção da UI, mas não substitui o driver de display, o planejamento de buffers, os drivers de entrada, a política de baixo consumo nem os testes de integração. Mantenha os arquivos gerados separados da lógica da aplicação escrita manualmente para evitar que uma nova exportação sobrescreva alterações do produto sem aviso.

## Padrões de widgets e interação { #widget-and-interaction-patterns }

Use os exemplos específicos de LVGL v8 para investigar um comportamento da UI. O escopo varia: Multlist é uma demo completa do framework de aplicações, não um teste mínimo de widget.

- **Basechart** desenha séries de dados; **Baselabel** associa fontes de dados a textos atualizados periodicamente.
- **Follow** demonstra um menu de ícones guiado pela gravidade; **Select**, estados de seleção; **Sector**, uma região angular da imagem definida por um valor.
- **Imgarray** monta leituras numéricas com glifos em imagens; **Imgbar** recorta uma imagem de primeiro plano para mostrar progresso.
- **Mulroller** é um seletor de rolagem personalizável por callbacks; **Multroller**, uma opção mais simples para itens de texto.
- **Multlist** cobre listas, paginação, transições, cache de recursos e ciclo de vida das páginas; **Multslider** exibe um valor ou rótulo curto no botão do controle deslizante.
- **Multanim** demonstra transições, algumas dependentes do suporte a GPU/VGLite; **Timeline** coordena animações em um eixo de tempo comum.

O suporte a placas não é uniforme entre esses exemplos. Por exemplo, as listas explícitas **Supported Boards** de Multanim e Multlist incluem `sf32lb52-lcd_n16r8` e `sf32lb52-lchspi-ulp`, enquanto instruções genéricas posteriores mencionam alvos mais amplos das séries 52x/56x/58x e usam `eh-lb563` como exemplo de compilação. Essas informações não têm o mesmo escopo. Confira o README específico e a configuração atual do projeto; não deduza compatibilidade dos outros widgets com base no índice ou na URL.

Use um desses exemplos quando um controle específico representar um risco para o produto. Mantenha pequena a primeira adaptação: execute o controle original, substitua os dados pelos do produto e meça o custo de redesenho e o uso de memória antes de adicioná-lo a uma tela maior. Mesmo vários controles visualmente simples podem exigir mais do framebuffer, da largura de banda de leitura dos recursos e do escalonamento dos eventos de entrada.

## Cargas de trabalho de recursos, animações e mídia { #asset-animation-and-media-workloads }

Os exemplos de carregamento dinâmico de eZip estão disponíveis para LVGL v8 e LVGL v9. Use a versão correspondente à aplicação para validar o carregamento dinâmico de recursos compactados antes de adotá-lo amplamente. O artigo sobre [eZip](ezip.md) explica o papel da compactação de recursos no pipeline gráfico.

Para recursos animados em GIF/APNG, a SiFli também oferece os exemplos [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) e [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html), na categoria **Multimedia > AGIF**. Ambos os READMEs listam `eh-lb525`; a [matriz de compilação GCC](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) atual também registra os dois caminhos de projeto em `devkit_lcd_boards`. O registro na matriz indica um alvo de compilação, não validação em tempo de execução para todas as placas desse grupo. Confirme o alvo exato e a revisão do SDK antes de usar qualquer um dos exemplos como base do produto.

Os exemplos de eZip dinâmico comparam o acesso por caminho de arquivo ao pré-carregamento em SRAM ou PSRAM. O pré-carregamento usa memória adicional e pode reduzir leituras repetidas. Gere os recursos para a versão correspondente de LVGL v8/v9. Diferentemente de v8, o caminho documentado de v9 exige um prefixo de unidade, como `A:/`. Confira o armazenamento real e a configuração da letra da unidade. O README v9 lista explicitamente `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi` e `sf32lb58-lcd_n16r32n1_qspi`; não aplique essa lista a v8 nem deduza suporte a outras placas. Apenas para SF32LB57, a documentação de eZip exige a opção de conversão `-winsize 2048`.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [reprodução de vídeo local](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html) e [reprodução por streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html) testam caminhos de conteúdo diferentes, não níveis fixos de complexidade. O README do Lottie marca o exemplo como **não verificado**, lista `eh-lb563` e as séries SF32LB52x/SF32LB56x, e a entrada do projeto está comentada na matriz de compilação GCC atual. Trate essa lista de placas como documentação não verificada, não como um conjunto de alvos validados. O README de vídeo local lista explicitamente `eh-lb523` e `sf32lb52-lcd_n16r8`, mas também contém instruções genéricas mais abrangentes; sua entrada está comentada na matriz de compilação GCC atual. Confira a revisão exata do SDK antes de confiar nessas informações para outro alvo. O exemplo reproduz vídeo H.264 em `disk/video_example.mp4`; se o cartão TF for montado com sucesso, o arquivo `video_example.mp4` na raiz do cartão tem prioridade. O README de streaming lista apenas `sf32lb52-lchspi-ulp`; ele acessa a rede pela conexão Bluetooth PAN compartilhada de um telefone e usa FFmpeg. Não é um exemplo de streaming de vídeo por BLE.

Avalie cada exemplo como uma carga do sistema. Com Bluetooth, sensores e a interface de display do produto ativos, meça o armazenamento dos recursos ou do fluxo, o tempo de decodificação, a frequência de atualização dos quadros, o uso de PSRAM/SRAM, a largura de banda do display e o consumo de corrente. O custo real depende do conteúdo, da resolução, da configuração do decodificador e dos buffers.

Uma demonstração curta e fluida não comprova que o caminho consegue sustentar uma animação prolongada. Valide o produto com conteúdo de duração realista e a política de atualização efetivamente prevista para o painel.

## Fontes tipográficas e troca de idioma em tempo de execução { #fonts-and-runtime-language-switching }

O [exemplo de FreeType](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html) carrega fontes TrueType do sistema de arquivos e permite trocar a fonte e o tamanho em tempo de execução. O README informa que ele foi validado em `sf32lb52-lchspi-ulp`; outras placas precisam de uma partição `FS_REGION` e heap de sistema suficiente, portanto não são consideradas validadas por esse exemplo. Ele demonstra o uso de uma fonte interna quando o carregamento falha, verificações de heap e liberação da fonte anterior na troca. Confira a cobertura de caracteres e o uso de heap com os idiomas e tamanhos reais; reduza fontes CJK grandes aos caracteres necessários. O caminho documentado exige contornos TrueType, não fontes OpenType com contornos CFF. Não libere uma fonte ainda referenciada por um widget ou estilo; faça as alterações na thread do LVGL. Ao mudar fontes incluídas no projeto, gere novamente e grave a imagem do sistema de arquivos `fs_root.bin`. Atualizar apenas a aplicação não substitui esses arquivos.

Os exemplos multilíngues para [LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html) e [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html) cobrem idiomas incluídos no firmware, instalação de pacotes externos, troca em execução, nova varredura do diretório de instalação e persistência da seleção por `share_prefs`. O README v8 lista `sf32lb52-lchspi-ulp`; confira separadamente a lista de alvos do README v9, em vez de atribuir essa placa a ele por suposição. Entradas JSON ou XLSX geram recursos compilados para idiomas incluídos no firmware ou pacotes binários externos. Use as mesmas chaves de tradução em todos os idiomas e confira a cobertura das fontes. Teste a troca, a persistência após reiniciar, recursos ausentes e a atualização do sistema de arquivos. Siga os caminhos e a configuração documentados para cada versão; não presuma que sejam idênticos apenas porque os exemplos têm nomes de recursos parecidos.

## Bússola, jogos e interfaces de relógio { #compass-games-and-watch-interfaces }

Os exemplos de bússola eletrônica e interface de relógio combinam exibição e funções da aplicação. Eles permitem avaliar telas, temporização da entrada e das animações e cargas gráficas mais amplas. O índice de jogos leva a um exemplo de Campo Minado. O README lista `eh-lb563` e as séries SF32LB52x/56x, mas não 58x; antes de usá-lo em 58x, confirme o suporte na versão atual do SDK.

O exemplo documentado de bússola usa um magnetômetro de três eixos MMC56x3 por I2C na `sf32lb52-lchspi-ulp`. Confira o driver, a fiação e a calibração para o produto real; exibir a direção não comprova, por si só, a precisão da medição.

Os exemplos de jogos e interface de relógio ajudam a planejar o fluxo entre telas, mas o produto ainda precisa definir a gestão dos dados, o comportamento em baixo consumo, a política de ativação do display, as notificações e a recuperação de falhas.

O README do relógio v8 lista as séries LCD SF32LB52x, SF32LB56x e SF32LB58x, além de `sf32lb52-lchspi-ulp`; o README v9 lista as três séries LCD. Ambos excluem `520-hdk` e informam que a demo de rotação 3D não está disponível no SF32LB55x. Confira as partições de recursos ao adicionar fontes; o exemplo v8 pode ultrapassar a região reservada.

## Adapte o exemplo sem perder as evidências { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabela: Verificações para adaptar exemplos de LVGL ao produto</em></div>

<div align="center" markdown>

| Etapa | Evidências a manter | Por que isso importa |
|:-----|:-----------------|:---------------|
| Compilar o original | Revisão do SDK, nome da placa, configuração e log de compilação | Mantém uma base funcional conhecida |
| Executar no hardware | Foto/vídeo, log serial e comportamento do painel e do toque | Confirma o caminho real de exibição e entrada |
| Adicionar um elemento do produto | Registro de alterações e medições da taxa de quadros e do comportamento de atualização | Permite associar regressões às mudanças correspondentes |
| Exercitar a carga do produto | Capacidade de resposta da UI com Bluetooth, sensores, armazenamento e transições de baixo consumo | Revela limites de integração que uma demonstração isolada não mostra |
| Registrar os limites finais | Uso de buffers, alocação de memória, taxa de quadros, consumo e falhas conhecidas | Transforma o exemplo em evidência técnica útil para manutenção |

</div>

## Recursos relacionados { #related-resources }

- [Visão geral de gráficos](overview.md) para escolher o display, planejar o framebuffer, integrar o LVGL e avaliar as compensações do sistema.
- [Controlador de display](display-controller.md) para consultar o controlador, os buffers e o caminho de atualização (flush).
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md) e [TurboPixel](turbopixel.md) para conhecer os recursos de aceleração e compactação gráfica do SF32.
- [Exemplos](../../develop/examples/index.md) para acessar o catálogo de exemplos do SDK de diferentes domínios.
- [Índice de exemplos LVGL do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) para consultar a lista oficial atual e os detalhes de configuração.
