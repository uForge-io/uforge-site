---
icon: lucide/minimize-2
description: "Como o TurboPixel usa compressão com perdas e taxa de compressão fixa no framebuffer para reduzir o armazenamento do framebuffer e o tráfego de leitura do display nos dispositivos SF32 compatíveis."
tags:
  - Gráficos
---

# Compressão de framebuffer TurboPixel { #turbopixel-framebuffer-compression }

## Visão geral { #overview }

**TurboPixel** é um formato de compressão com perdas e taxa fixa aplicado ao bitmap final renderizado nos dispositivos SF32 compatíveis. Ele faz parte do caminho de exibição: o **extDMA** comprime o bitmap, e o controlador de display descomprime o TurboPixel enquanto transfere os pixels para o painel.

TurboPixel não é um formato para armazenar recursos gráficos e não substitui o [eZip](ezip.md). O eZip comprime os recursos de origem sem perdas antes da leitura do armazenamento; o TurboPixel comprime o bitmap final renderizado para reduzir a capacidade de PSRAM e a largura de banda exigidas pelo tráfego de dados do framebuffer.

Para conhecer o fluxo gráfico completo e a posição do TurboPixel em relação ao eZip, ao ePicasso e ao controlador de display, consulte a [Visão geral de gráficos](overview.md#sf32-graphics-flow). Esta página aborda o comportamento de compressão, as decisões de integração e a disponibilidade do TurboPixel.

Consulte esta página quando a capacidade do framebuffer ou o tráfego de leitura do display for um gargalo em um projeto com SF32LB55x, SF32LB56x ou SF32LB58x. Ela ajuda equipes de produto e firmware a avaliar a economia previsível de PSRAM em relação à perda de qualidade de imagem; não substitui a compressão de recursos feita pelo eZip.

## Taxa de compressão fixa e compressão com perdas { #fixed-ratio-and-lossy-by-design }

O TurboPixel tem duas características fundamentais:

- **Taxa de compressão fixa para cada configuração.** O formato de pixel de entrada e o nível de compressão determinam o fator nominal; ele não muda com os detalhes da imagem. A alocação também depende do alinhamento das linhas e da divisão em blocos. Use as regras de tamanho do chip e SDK escolhidos, não uma taxa copiada de outra configuração.
- **Compressão com perdas.** Não há garantia de que o bitmap descomprimido pelo TurboPixel reproduza todos os valores originais dos pixels. O formato troca parte da fidelidade da imagem por reduções previsíveis no uso e no tráfego de PSRAM.

A compressão com perdas pode ser uma escolha adequada em sistemas embarcados com recursos limitados, mas essa decisão depende do produto. Avalie telas reais na resolução e profundidade de cor do painel de destino, considerando a distância de visualização e o comportamento de atualização; não julgue a qualidade apenas por uma imagem de teste genérica.

## Comparação de compressão de framebuffer (modelo) { #framebuffer-compression-comparison-placeholder }

Use esta seção para registrar resultados medidos do TurboPixel em uma resolução de display e configuração do SDK representativas. Diferentemente da comparação de tamanho de arquivo do eZip, esta é uma comparação de **alocação do framebuffer e tráfego de PSRAM**: o TurboPixel atua após a renderização, e não sobre o arquivo do recurso de origem.

Inclua telas opacas e telas com mesclagem alfa. Essa composição geralmente ocorre antes do TurboPixel, quando o renderizador combina os pixels de primeiro plano e de fundo no framebuffer final. Uma tela com ícones translúcidos, texto, sombras ou camadas ainda pode gerar um framebuffer RGB565 opaco. Registre essa diferença: a presença de um canal alfa nos recursos de origem não significa que o framebuffer comprimido também tenha um canal alfa.

<div align="center"><em>Comparação representativa de framebuffer TurboPixel — modelo</em></div>

<div align="center" markdown>

| Cenário | Alfa da origem/camada | Formato e estado do canal alfa do framebuffer final | Alocação/tráfego sem compressão | Alocação/tráfego com TurboPixel | Percentual em relação ao framebuffer sem compressão | Configuração do teste/resultado visual |
|:---|:---|:---|---:|---:|---:|:---|
| Interface opaca | Nenhum | A definir, opaco | A medir | A medir | A medir | Resolução: a definir; política de atualização: a definir; taxa de compressão/configuração do TurboPixel: a definir |
| Interface com mesclagem alfa antes da saída | Alfa por pixel e/ou global nas camadas de origem | A definir, normalmente opaco após a composição | A medir | A medir | A medir | Registrar o conteúdo composto; verificar artefatos em bordas, sombras, gradientes e texto |
| Caminho de saída que preserva o canal alfa, se compatível | Canal alfa preservado até o buffer final | A definir | A medir | A medir | A medir | Confirmar o chip, o SDK, o formato e o caminho de display exatos antes do teste |

</div>

Para cada caminho TurboPixel compatível, calcule **Percentual em relação ao framebuffer sem compressão** usando `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`: divida o tamanho, em bytes, do framebuffer TurboPixel pelo tamanho do framebuffer sem compressão e multiplique por 100%. A alocação esperada segue a taxa de compressão fixa aplicável, mas a taxa exata, os formatos compatíveis, o alinhamento, a política de atualização e o tráfego de PSRAM medido devem ser confirmados na documentação do chip escolhido, no SDK e em testes com o hardware de destino. Registre a aceitação visual separadamente: uma taxa fixa de alocação não garante artefatos idênticos em conteúdo opaco, com muito texto, gradientes ou mesclagem alfa.

## Por que usar o TurboPixel { #why-use-turbopixel }

### Reduzir o armazenamento do framebuffer { #reduce-psram-capacity }

Um framebuffer completo pode ocupar muita PSRAM em alta resolução ou com vários buffers de desenho. O TurboPixel reduz a alocação do bitmap final comprimido, o que pode liberar memória para recursos de UI, áudio, dados da aplicação ou outras superfícies.

Calcule, porém, o pico de memória ocupada simultaneamente, não apenas esse bitmap. Podem coexistir um buffer de renderização sem compressão, um buffer de display comprimido, a memória de trabalho da compressão e cópias para buffer duplo. Seus tamanhos e tempos de vida determinam se o projeto completo precisa de menos PSRAM.

### Reduzir as leituras do display { #reduce-psram-bandwidth }

O controlador de display lê menos bytes de um framebuffer comprimido antes de descomprimi-lo. Isso reduz as leituras de display e a contenção com CPU, ePicasso, DMA, áudio e comunicação sem fio.

Esse não é o ganho de tráfego total. A renderização ainda grava pixels; a compressão lê sua entrada e grava sua saída. Meça essas transferências e sua sobreposição com as leituras de display. Em telas redesenhadas com frequência, o custo da compressão pode compensar a economia nas leituras; o resultado pode ser diferente quando o mesmo quadro é exibido repetidamente. Meça também a energia do sistema.

### Tornar previsível o orçamento { #make-budgeting-predictable }

Com o mesmo formato de pixel e nível de compressão, mudanças no conteúdo não alteram a taxa nominal de compressão. Aloque buffers pelas regras do SDK para linhas comprimidas e alinhamento e inclua todas as leituras e gravações da renderização, compressão e exibição no orçamento de largura de banda. Conte separadamente os bytes enviados ao painel: o TurboPixel é descomprimido antes dessa saída e não reduz automaticamente seu volume.

## Equilíbrio entre qualidade e integração { #quality-and-integration-trade-offs }

Valide o TurboPixel como parte do projeto completo de display:

- Teste textos, linhas finas, gradientes, ícones, fotografias, animações e elementos de alto contraste da interface para identificar artefatos visíveis.
- Confirme se o dispositivo e o SDK escolhidos são compatíveis com o formato de cor, o alinhamento dos buffers, o caminho extDMA e a configuração do controlador de display.
- Meça o tempo de quadro, a largura de banda de PSRAM, a latência da interface de usuário e o consumo de energia com cargas simultâneas de display, Bluetooth, áudio e IA.
- Mantenha um caminho sem compressão disponível durante o bring-up para isolar problemas de qualidade de imagem e de driver.
- Não apresente o TurboPixel como um formato sem perdas, mesmo que os artefatos não sejam visíveis em uma interface específica.

## Verificações de integração com o SDK { #sdk-integration-checks }

O guia extDMA citado lista dez níveis nominais, enquanto o cálculo de tamanho do SDK citado implementa os níveis 1, 2 e 3. Não pressuponha que sua compilação aceita todos os níveis documentados. Valide o nível escolhido e o cálculo correspondente do tamanho das linhas; um valor não suportado pode acionar outro ajuste em uma função auxiliar.

O guia extDMA lista os formatos de entrada RGB565, RGB888 e ARGB8888. O suporte a esses formatos não garante um caminho de display comprimido que preserve o canal alfa. O ramo LCDC sem o registrador dedicado de descompressão da camada 0 aceita apenas RGB565/RGB888 para camadas comprimidas; confira o ramo usado pelo chip. No driver LCDC citado, `HAL_LCDC_LayerSetCmpr` ativa a compressão na camada 0.

O cabeçalho LCDC atual do OpenSiFli define a macro de suporte a camadas comprimidas somente quando `HAL_EXTDMA_MODULE_ENABLED` está habilitado; a condição de família exclui SF32LB52x e SF32LB57x. O cabeçalho define larguras máximas de 512 pixels para SF32LB55x/SF32LB56x e 1024 pixels para SF32LB58x. São limites de integração da camada comprimida, não limites universais de resolução do painel. Um comentário no código também informa que o caminho LCPU não está habilitado.

O SF32LB55x exige uma ressalva de integração. O cabeçalho LCDC atual do OpenSiFli define a macro de camadas comprimidas quando `HAL_EXTDMA_MODULE_ENABLED` está habilitado, mas seu comentário informa que o caminho LCPU não está habilitado. A tabela publicada de recursos LCDC do SDK marca a descompressão de camadas comprimidas no 55x como não suportada, enquanto o datasheet do SF32LB55x descreve TurboPixel e a descompressão pelo controlador LCD. A existência de uma macro de compilação não comprova que todo o caminho de display tenha sido validado. Considere o suporte ao 55x condicional e verifique a revisão do SDK, o núcleo, a configuração de compilação e o hardware-alvo; não presuma o funcionamento em tempo de execução apenas com base na macro.

Separe a propriedade dos buffers entre o renderizador, o extDMA e o controlador de display. Aguarde o fim da renderização antes de comprimir, o fim da compressão antes de exibir e o fim do uso pelo display antes de reutilizar o buffer. Em memória compartilhada com cache, execute clean nos dados de entrada escritos pela CPU antes da leitura pelo hardware. Prepare as linhas de cache de destino para impedir que linhas sujas sobrescrevam posteriormente o resultado do hardware; após a conclusão, invalide as linhas obsoletas antes da leitura pela CPU. Respeite os limites das linhas de cache e os dados vizinhos. O fim da compressão não é o fim da transferência ao painel.

O endereço de origem, o de destino e o comprimento da transferência extDMA precisam estar alinhados a 4 bytes. Siga as regras do SDK para stride, blocos e tamanho dos buffers; dividir os bytes do quadro sem compressão pela taxa nominal não é suficiente.

## Disponibilidade na família SF32 { #availability-in-the-sf32-family }

Há documentação de TurboPixel para as seguintes famílias SF32:

<div align="center"><em>Disponibilidade documentada do TurboPixel</em></div>

<div align="center" markdown>

| Família SF32 | Status do TurboPixel | Contexto de integração |
|:---|:---|:---|
| **SF32LB52x** | Não disponível | Use um framebuffer sem compressão ou outra estratégia compatível de memória/largura de banda. |
| **SF32LB55x** | Condicional no código atual; funcionamento ponta a ponta não comprovado | O cabeçalho LCDC atual define a capacidade de camadas comprimidas com extDMA, mas informa que o caminho LCPU não está habilitado; a tabela publicada do SDK marca o 55x como não suportado. Verifique o núcleo, a configuração do SDK e o hardware-alvo. |
| **SF32LB56x** | Documentado | O extDMA comprime o framebuffer final com perdas e taxa de compressão fixa; o controlador de display o descomprime. |
| **SF32LB57x** | Não disponível | Use um framebuffer sem compressão ou outra estratégia compatível de memória/largura de banda. |
| **SF32LB58x** | Documentado | O extDMA comprime o framebuffer final com perdas e taxa de compressão fixa; o controlador de display o descomprime. |
| **Outras famílias SF32** | Confirme para cada dispositivo | Não deduza a compatibilidade com TurboPixel a partir do eZip, do ePicasso ou da presença de PSRAM. Consulte o datasheet e o manual de referência do chip exato, a versão do SDK e o driver de display. |

</div>

Esta tabela registra a disponibilidade documentada por família; não garante compatibilidade com todos os encapsulamentos, interfaces de painel, formatos de pixel, versões do SDK ou configurações de placa. Confirme o dispositivo exato antes de definir os compromissos de memória ou largura de banda.

## Principais conclusões { #key-takeaways }

- TurboPixel é um formato de compressão do framebuffer final **com perdas e taxa de compressão fixa**.
- O extDMA gera o TurboPixel a partir do bitmap renderizado; o controlador de display o descomprime no caminho para o painel.
- Seu objetivo principal é reduzir o **armazenamento do framebuffer** e o **tráfego de leitura do display**; confirme a economia considerando todos os buffers e transferências.
- A documentação do produto descreve TurboPixel em SF32LB55x, SF32LB56x e SF32LB58x. No 55x, o cabeçalho atual define a macro de camadas comprimidas com extDMA, mas informa que o caminho LCPU não está habilitado; a tabela publicada do SDK marca o 55x como não suportado. Trate o suporte como condicional e valide todo o caminho de display. O código atual exclui SF32LB52x e SF32LB57x; verifique os demais dispositivos individualmente.
- TurboPixel complementa o eZip: o eZip comprime recursos sem perdas, enquanto o TurboPixel comprime com perdas o bitmap final.

## Referências primárias { #primary-references }

- [Guia extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [Implementação do cálculo de tamanho](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [API extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [Condições de suporte LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [Condição atual de camadas comprimidas no LCDC do OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [Tabela gerada de recursos do LCDC no SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [Implementação das camadas LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- Documentos de produto: [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
