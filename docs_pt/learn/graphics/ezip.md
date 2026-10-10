---
icon: lucide/file-archive
description: "Como o eZip e o eZip-A da SiFli reduzem o espaço ocupado por recursos de UI, o tráfego de memória e a carga de decodificação da CPU em dispositivos SF32 compatíveis."
tags:
  - Gráficos
---

# Compactação sem perdas e decodificação por hardware com eZip { #ezip-lossless-compression-and-hardware-decoding }

## Introdução { #introduction }

**eZip** é o formato proprietário de compactação sem perdas da SiFli para recursos gráficos. Nos dispositivos SF32 compatíveis com essas funções, o bloco de hardware EZIP decodifica recursos gráficos eZip. O bloco também oferece modos GZIP e LZ4 separados para dados gerais; os dados descompactados são gravados na memória via AHB, e não enviados diretamente ao EPIC. Em vez de armazenar cada recurso de display como um bitmap sem compactação em NOR Flash, PSRAM ou em um sistema de arquivos, o produto pode armazenar os dados eZip e decodificá-los quando a UI precisar deles.

**eZip-A** é o formato correspondente para recursos animados. Os recursos de origem são convertidos durante o build ou na etapa de preparação de recursos; eZip não é um decodificador de imagem de uso geral que aceite arquivos arbitrários em tempo de execução.

Para dados que não sejam gráficos, como uma imagem OTA, o produto precisa definir e validar todo o fluxo de atualização, incluindo armazenamento, verificação de integridade, compatibilidade e o caminho de descompactação previsto. O [fluxo gráfico](overview.md#sf32-graphics-flow) aplica-se aos recursos de display, não ao fluxo de atualização específico da aplicação.

Em um produto com interface gráfica, o objetivo é transferir menos bytes do armazenamento e evitar que a CPU da aplicação descompacte repetidamente os mesmos recursos. Isso pode reduzir o espaço de armazenamento e o tráfego de memória externa, deixando mais capacidade disponível para a UI, Bluetooth, áudio e outras tarefas da aplicação.

Para entender a posição do eZip em relação ao ePicasso, ao TurboPixel e ao controlador de display, consulte a [Visão geral de gráficos](overview.md#sf32-graphics-flow). Esta página se concentra na preparação dos recursos eZip, no comportamento da compactação e na decodificação.

Consulte esta página quando os recursos de UI ocuparem muito espaço em Flash, consumirem largura de banda excessiva da memória externa ou exigirem um fluxo de conversão reproduzível. Ela diferencia a compactação sem perdas dos recursos de origem da compactação do framebuffer final, abordada no artigo sobre [TurboPixel](turbopixel.md).

## Recursos e limitações { #capabilities-and-boundaries }

O eZip foi projetado para um fluxo de produção de recursos, não para manipulação pontual de arquivos:

- **Compactação gráfica sem perdas.** O formato preserva os dados da imagem e oferece suporte à transparência. A SiFli descreve qualitativamente a taxa típica de compactação gráfica como *um pouco superior à do PNG*; não publica um valor numérico fixo.
- **Recursos estáticos e animados.** O GraphicsTool pode converter imagens PNG, GIF e APNG em recursos estáticos eZip ou animações eZip-A.
- **Decodificação assistida por hardware em dispositivos compatíveis.** Ela pode reduzir o trabalho de decodificação da CPU da aplicação, conforme o chip, o SDK, o formato de origem e o caminho do driver selecionados.
- **Fluxo de trabalho com ferramentas gráficas.** O GraphicsTool da SiFli processa formatos de origem comuns, redimensiona e converte imagens, permite o processamento em lote e gera recursos eZip/eZip-A.
- **Integração com o ePicasso em dispositivos compatíveis.** A saída direta pode dispensar um buffer para a imagem de origem completamente decodificada, reduzindo a capacidade de memória necessária e o tráfego.

“Sem perdas” descreve a compactação dos pixels entregues ao codificador, não todas as conversões anteriores. Redimensionar, converter RGB888 para RGB565 ou descartar alpha pode causar perda de informação antes da compactação. Compare os pixels descompactados com a entrada do codificador de mesmo tamanho e formato; preserve alpha quando a transparência for necessária.

## Taxa de compactação e uso geral { #compression-ratio-and-general-purpose-use }

Para recursos gráficos, use PNG como referência prática: a SiFli descreve a taxa de compactação do eZip como um pouco superior à do PNG, mantendo os dados da imagem sem perdas e preservando a transparência. A redução real do tamanho do arquivo ainda depende das dimensões da imagem, do formato de pixel, da transparência, do uso de paleta e do nível de detalhe. Meça recursos representativos com o perfil de conversão aprovado; não dimensione o armazenamento com base em um único percentual.

O utilitário EZIP da SiFli também compacta arquivos de uso geral nos modos GZIP ou LZ4. Esse processo é diferente da conversão de recursos gráficos para eZip. A taxa de compactação de dados gerais depende do conteúdo de origem: dados repetitivos ou estruturados podem ser bem compactados, enquanto arquivos que já usam compactação — como imagens JPEG, vídeos MP4, arquivos ZIP ou dados criptografados — podem diminuir pouco ou nada. Antes de usar esse caminho com dados que não sejam gráficos, valide o tamanho resultante e o modo de descompactação compatível com o dispositivo de destino.

O HAL do EZIP distingue os modos de trabalho eZip gráfico, GZIP e LZ4. A descompactação de dados gerais GZIP/LZ4 usa a saída para memória via AHB, não a saída direta para o EPIC. Um arquivo OTA precisa respeitar o enquadramento (framing) e os limites de tamanho aceitos pelo modo escolhido; um arquivo gráfico `.ezip` não é intercambiável com qualquer pacote de atualização compactado.

## Comparação do tamanho de imagens representativas (modelo) { #representative-image-size-comparison-placeholder }

Use esta seção para registrar medições equivalentes de imagens de UI representativas **opacas** e **com canal alfa**. Substitua os valores provisórios depois de converter cada imagem de origem com versões e configurações aprovadas das ferramentas. Registre também as dimensões da imagem, o formato de cor, o tratamento do canal alfa e a qualidade JPEG. eZip e PNG preservam a transparência da origem; JPEG não armazena canal alfa. Portanto, a comparação de imagens transparentes em JPEG precisa usar um fundo composto previamente e documentado. Não apresente esse resultado como equivalente à preservação do canal alfa.

<div align="center"><em>Comparação do tamanho de arquivo de imagens representativas — modelo</em></div>

<div align="center" markdown>

| Cenário | Formato | Codificação | Tamanho do arquivo | Em relação ao BMP | Configurações de teste / observações |
|:---|:---|:---|---:|---:|:---|
| Imagem de UI opaca | BMP | Referência sem compactação | A definir | 100% | Imagem de origem: a definir; dimensões: a definir; formato de pixel: a definir |
| Imagem de UI opaca | eZip | Sem perdas | A definir | A definir | Versão do GraphicsTool e perfil de conversão: a definir |
| Imagem de UI opaca | PNG | Sem perdas | A definir | A definir | Codificador e configurações: a definir |
| Imagem de UI opaca | JPEG | Com perdas | A definir | A definir | Codificador e configuração de qualidade: a definir |
| Imagem de UI com canal alfa por pixel | BMP | Referência sem compactação | A definir | 100% | Indique a variante exata do BMP ou o tratamento do canal alfa: a definir |
| Imagem de UI com canal alfa por pixel | eZip | Sem perdas com alfa | A definir | A definir | Versão do GraphicsTool e perfil de conversão; verifique as bordas transparentes: a definir |
| Imagem de UI com canal alfa por pixel | PNG | Sem perdas com alfa | A definir | A definir | Codificador e configurações: a definir |
| Imagem de UI com canal alfa por pixel | JPEG | Com perdas, sem alfa | A definir | A definir | Registre o fundo composto previamente e a configuração de qualidade; não preserva o canal alfa |

</div>

Calcule **Em relação ao BMP** como `file size ÷ BMP file size × 100%` dentro do mesmo cenário: divida o tamanho do arquivo pelo tamanho do BMP e multiplique o resultado por 100%. Não compare diretamente as linhas de imagens opacas com as que têm canal alfa, nem use esta tabela como uma afirmação geral sobre a taxa de compactação. Ela é um modelo de medição; os resultados variam conforme a imagem escolhida, a cobertura do canal alfa e as configurações de conversão.

## Por que usar eZip { #why-use-ezip }

### Reduzir o espaço de armazenamento dos recursos { #reduce-asset-storage }

Recursos compactados podem ocupar menos espaço em NOR Flash, PSRAM, NAND ou armazenamento removível do que buffers de pixels sem compactação. Isso é especialmente útil para mostradores de relógio, pacotes de fontes multilíngues, conjuntos de ícones, temas de UI e interfaces com muitas animações.

### Reduzir o tráfego no barramento de memória { #reduce-memory-bus-traffic }

Quando os recursos ficam em NOR Flash externa ou PSRAM, bitmaps sem compactação podem consumir muita largura de banda do barramento antes mesmo de o desenho começar. Transferir o recurso compactado e decodificá-lo próximo ao caminho gráfico pode reduzir esse tráfego. O ganho real depende da taxa de compactação, do formato de origem, do padrão de atualização do display e da velocidade da interface de armazenamento.

### Liberar tempo de CPU { #preserve-cpu-time }

Em um caminho de decodificação por hardware compatível, a CPU da aplicação não precisa descompactar cada recurso por software. A capacidade liberada pode melhorar a resposta da UI ou ser usada por tarefas de comunicação sem fio, áudio, sensores e gerenciamento de baixo consumo.

### Tornar a entrega de recursos reproduzível { #make-asset-delivery-repeatable }

O uso de uma ferramenta de conversão e de um formato de recurso controlado torna as entregas reproduzíveis: os arquivos-fonte dos recursos visuais, as configurações de conversão, os recursos gerados e os perfis de resolução de destino podem ser versionados em conjunto. Isso é mais confiável do que converter arquivos manualmente ou depender de que os desenvolvedores de UI reproduzam as mesmas configurações de imagem.

## Comparação das implementações de eZip { #ezip-version-comparison }

A tabela usa nomes respaldados pelos documentos de produto e pelo SDK. Um número de versão não garante um conjunto universal de recursos: confira o chip escolhido, a versão do SDK, o formato dos recursos e a configuração de memória da placa.

<div align="center"><em>Implementações de eZip e suporte independente a JPEG</em></div>

<div align="center" markdown>

| Implementação | Famílias SF32 representativas | Recursos documentados | Implicações para o projeto |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | Descompressão gráfica sem perdas e conexão direta com o ePicasso; o SDK exclui essa família do suporte nativo a eZip-A. | Use recursos eZip estáticos; não pressuponha suporte nativo a animações eZip-A. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Descompressão gráfica sem perdas e animações eZip-A nativas. O SF32LB58x também possui um codec JPEG separado. | Valide os requisitos de animação e memória; trate JPEG/MJPEG como um caminho de processamento de mídia separado. |
| **EZIP** | SF32LB57x | Decodificação eZip/eZip-A e saída direta para EPIC. JPEGD é um decodificador JPEG independente; não pressuponha que use o mesmo caminho de saída direta para o EPIC. | Gere os recursos com uma janela de compressão de 2048 bytes. Esses fatos não estabelecem um caminho completo de reprodução MJPEG; confirme o suporte do middleware e do decodificador para o dispositivo exato. |

</div>

A saída direta para o EPIC dispensa o armazenamento de uma imagem de origem completamente decodificada antes da renderização. Ela não elimina a memória de trabalho do decodificador nem o buffer final de renderização, e não torna a decodificação JPEG uma função do EZIP. Para o caminho independente do JPEGD, siga o fluxo de drivers documentado para a família de destino.

## Preparação dos recursos { #preparing-assets }

Mantenha os arquivos de origem editáveis sob controle de versão e gere a saída eZip como artefato de build:

1. Defina a resolução do display, o formato de pixel e os requisitos de animação para o dispositivo escolhido.
2. Prepare imagens ou animações de origem nas dimensões previstas; evite usar redimensionamento em tempo de execução para compensar recursos com tamanho inadequado.
3. Use o SiFli GraphicsTool para converter e redimensionar os arquivos e gerar a saída eZip ou eZip-A.
4. Registre no projeto a versão da ferramenta e o perfil de conversão; em seguida, valide os recursos gerados no hardware de destino.
5. Coloque a saída no armazenamento previsto e teste a inicialização a frio, o uso repetido da UI, o comportamento com pouca memória e as atualizações do display enquanto Bluetooth ou áudio também estiverem ativos.

O GraphicsTool oferece suporte a formatos de imagem comuns, como PNG, JPEG, WebP e AVIF, e pode processar GIF, PNG e APNG para gerar recursos eZip/eZip-A. Um recurso convertido só pode ser usado quando o dispositivo de destino e o SDK oferecem suporte ao caminho de decodificação configurado.

Para outros formatos de imagens estáticas, o fluxo documentado é redimensionar e converter primeiro para PNG e, depois, codificar em eZip. Ajuste o formato de cor, o tratamento de alpha e a versão do LVGL ao destino. O exemplo de linha de comando do SDK exige `-winsize 2048` para o SF32LB57x; as outras famílias da tabela não precisam dessa opção. Use `sdk/tools/png2ezip/ezip.exe` e registre os argumentos exatos junto com os recursos gerados.

## Ferramentas de integração { #integration-tools }

Além do fluxo de trabalho de desktop com o GraphicsTool, a SiFli oferece:

- **Ferramentas de desenvolvimento de linha de comando**, que permitem integrar a conversão eZip a fluxos de recursos automatizados por scripts e reproduzíveis. Use-as em scripts de build locais ou em tarefas de integração contínua para manter a rastreabilidade entre os arquivos-fonte dos recursos visuais versionados e a saída eZip gerada.
- **SDKs para Android e iOS**, que permitem integrar o eZip a aplicativos móveis. Eles são úteis quando um aplicativo complementar precisa preparar, gerenciar, transferir ou processar recursos eZip como parte do fluxo de trabalho do dispositivo.

Mantenha sob controle de versão os perfis de conversão, as versões das ferramentas ou dos SDKs, os checksums dos arquivos gerados e os requisitos de compatibilidade com o dispositivo de destino. As integrações móveis e de linha de comando devem usar o mesmo perfil de recursos aprovado para o produto embarcado; não presuma que um arquivo gerado para determinado chip ou configuração do SDK funcionará sem alterações em todos os dispositivos SF32.

## Orientações de projeto e depuração { #design-and-debugging-guidance }

- **Use eZip para recursos.** Eles podem ficar em NOR Flash, PSRAM, NAND ou um sistema de arquivos, mas o decodificador não interpreta caminhos de arquivo. O driver de armazenamento precisa fornecer ou carregar os dados por um caminho de acesso suportado pelo hardware. O HAL exige alinhamento de 4 bytes para os buffers de entrada e saída AHB. eZip não comprime o framebuffer final.
- **Dimensione a largura de banda de transferência dos recursos.** O eZip pode reduzir o tráfego de transferência, mas os pixels decodificados ainda precisam percorrer o caminho de renderização e exibição descrito na [Visão geral de gráficos](overview.md#sf32-graphics-flow).
- **Mantenha caminhos de fallback em software.** Nem todos os tipos de recursos, formatos de pixel ou operações de UI são compatíveis com a decodificação por hardware ou com o caminho gráfico.
- **Valide a alocação de memória.** Teste os recursos e os buffers de desenho em SRAM interna, NOR Flash, PSRAM ou armazenamento removível; cada escolha altera a latência e a contenção do barramento.
- **Teste a carga de trabalho real.** Meça o tempo de carregamento a frio, a cadência das animações, a latência da UI e o consumo enquanto Bluetooth, áudio, sensores e atualização do display estiverem ativos em conjunto.
- **Congele as configurações de conversão antes do lançamento.** Mudanças na versão da ferramenta ou nos parâmetros podem afetar a compatibilidade da saída, a qualidade, o espaço de armazenamento e o desempenho de decodificação.

## Principais conclusões { #key-takeaways }

- eZip é o formato de compactação sem perdas de recursos de display da SiFli e oferece um caminho de decodificação assistida por hardware em dispositivos SF32 compatíveis.
- Use eZip para recursos gráficos e os modos GZIP/LZ4 do utilitário para dados gerais; a taxa de compactação destes depende dos dados de origem e precisa ser medida.
- eZip-A é destinado a recursos animados; o GraphicsTool prepara recursos eZip/eZip-A a partir de arquivos de arte comuns.
- A SiFli também oferece ferramentas de linha de comando e SDKs para Android/iOS para integrar eZip a fluxos automatizados e a aplicativos móveis complementares.
- eZip pode reduzir o espaço ocupado pelos recursos, o tráfego de memória externa e o trabalho de decodificação da CPU da aplicação, mas não substitui o ePicasso nem o controlador de display.
- Escolha a implementação e o caminho de saída documentados, não uma suposta hierarquia de versões. Separe JPEGD de EZIP e use a janela de compactação exigida para o SF32LB57x.
- Um projeto eZip bem-sucedido depende de um fluxo de recursos controlado: arquivos-fonte dos recursos visuais, configurações de conversão, local de armazenamento, integração gráfica e testes no hardware de destino.

## Referências primárias { #primary-references }

- [GraphicsTool e preparação de recursos](https://wiki.sifli.com/tools/图形转换工具.html)
- [Modos, saídas, alinhamento e suporte a animações do HAL EZIP](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [Documentação do utilitário EZIP](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [Modos, alinhamento e animações no HAL do EZIP](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [Exemplo LVGL eZip e parâmetros de conversão](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [Documentação do SDK móvel eZip](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- Documentos de produto: [SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [Interface independente de JPEGD](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
