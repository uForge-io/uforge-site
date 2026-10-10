---
icon: lucide/image-down
title: "Comprimir recursos gráficos com EZIP"
description: "Converta recursos PNG em dados binários EZIP ou PIXEL, arrays C para LVGL e arquivos GZIP que podem ser descomprimidos por hardware com o SiFli-SDK."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, EZIP]
---

# Comprimir recursos gráficos com EZIP { #compress-graphics-assets-with-ezip }

Use o utilitário incluído no ramo do SDK do seu alvo: `$SDK_ROOT/tools/png2ezip/ezip.exe`. Ele pode gerar dados binários EZIP/PIXEL ou arrays em C para LVGL. Antes de converter, confira o cabeçalho binário e o formato de pixel e escolha o comando correspondente. Se o hardware EZIP for descomprimir a imagem, siga o procedimento GZIP e a lista de verificação de integração no fim.

!!! note "Escopo por família"
    Estes são guias separados, específicos de cada família. Para saber quais formatos de entrada e saída são suportados e como a ferramenta se comporta, siga o guia da família do dispositivo-alvo e use a ferramenta incluída no respectivo ramo do SDK. Não infira o suporte de uma família com base no guia de outra.

## Formatos de arquivo { #1-file-formats }

Os quatro primeiros bytes do arquivo binário gerado formam um cabeçalho em ordem little-endian. Os campos de bits são:

<div align="center" markdown>

<em>Tabela: campos do cabeçalho binário EZIP/PIXEL</em>

| Bits | Significado |
|:-----|:--------|
| [31:21] | Altura da imagem |
| [20:10] | Largura da imagem |
| [9:5] | Reservado |
| [4:0] | Formato |

</div>

Os valores de formato são:

<div align="center" markdown>

<em>Tabela: valores dos formatos EZIP e PIXEL</em>

| Valor | Significado |
|:------|:--------|
| 1 | EZIP sem canal alfa |
| 2 | EZIP com canal alfa |
| 4 | PIXEL sem canal alfa |
| 5 | PIXEL com canal alfa |

</div>

PIXEL sem canal alfa aceita RGB565 e RGB888. PIXEL com canal alfa aceita ARGB565 e ARGB888. A ferramenta escolhe a variante com ou sem canal alfa conforme o PNG de origem: uma imagem sem canal alfa gera um formato sem esse canal.

<div align="center" markdown>

<em>Tabela: campos de bits dos formatos de cor PIXEL e ARGB</em>

| Formato | Campos de bits |
|:-------|:-----------|
| RGB565 | [15:11] vermelho, [10:5] verde, [4:0] azul |
| RGB888 | [23:16] vermelho, [15:8] verde, [7:0] azul |
| ARGB565 | [23:16] alfa, [15:11] vermelho, [10:5] verde, [4:0] azul |
| ARGB888 | [31:24] alfa, [23:16] vermelho, [15:8] verde, [7:0] azul |

</div>

Os campos de bits dos formatos de pixel acima são armazenados em ordem little-endian.

## Converter imagens PNG { #2-convert-png-assets }

Substitua `png_filename.png` pelo nome do arquivo de origem. O arquivo gerado é salvo no diretório da ferramenta, a menos que o processo de compilação que a executa altere o diretório de trabalho.

### Binário PIXEL { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

A saída é `png_filename.bin`. Use RGB565 para gerar RGB565/ARGB565 e RGB888 para gerar RGB888/ARGB888; a presença do canal alfa é determinada pelo PNG de entrada.

### Binário EZIP { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

A saída é `png_filename.bin`, com o valor do campo de formato do cabeçalho definido como EZIP.

### Array C do LVGL no formato PIXEL { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

A saída é `png_filename.c`, colocado na seção `.ROM3_IMG.png_filename`. Um array gerado normalmente tem esta estrutura:

```c
#ifndef LV_ATTRIBUTE_MEM_ALIGN
#define LV_ATTRIBUTE_MEM_ALIGN
#endif

#ifndef LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A
#define LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A
#endif
#define LV_COLOR_DEPTH_RGB565A 3
#define LV_COLOR_16_SWAP_RGB565A 0
SECTION(".ROM3_IMG.png_filename")

const LV_ATTRIBUTE_MEM_ALIGN LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A uint8_t png_filename_map[] = {
    ...
};
```

### Array C do LVGL no formato EZIP { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

A saída também é `png_filename.c`, na seção `.ROM3_IMG.png_filename`. O array EZIP gerado é alinhado para descompressão por hardware:

```c
#ifndef LV_ATTRIBUTE_MEM_ALIGN
#define LV_ATTRIBUTE_MEM_ALIGN
#endif

SECTION(".ROM3_IMG.png_filename")

ALIGN(4)
const LV_ATTRIBUTE_MEM_ALIGN uint8_t png_filename_map[] = {
    ...
};
```

## Gerar um binário GZIP para descompressão pelo EZIP de hardware { #3-generate-a-hardware-ezip-gzip-binary }

Para compactar `file.bin` no diretório da ferramenta, use:

```bash
-gzip file.bin -length -noheader
```

A ferramenta cria `file.bin.gz`. Os quatro primeiros bytes armazenam o tamanho dos dados originais. Ao descompactar esse fluxo no exemplo de EZIP por hardware, não inclua esses quatro bytes na entrada comprimida; use o tamanho armazenado para alocar o buffer de saída e passe os dados GZIP restantes ao descompressor de hardware.

Passe todo o conteúdo GZIP após o prefixo de quatro bytes com o tamanho ao descompressor EZIP de hardware em uma única operação. Se um arquivo grande exceder a capacidade dos buffers de entrada ou saída disponíveis, divida o arquivo original em blocos (o guia de origem sugere blocos de 10 KB), compacte cada bloco separadamente e envie os conteúdos ao descompressor na ordem correta.

## Checklist de integração { #integration-checklist }

Para cada recurso gráfico, registre o PNG de origem, a linha de comando, o formato de cor/canal alfa, o arquivo gerado, a seção do linker e a configuração da tela de destino; depois, valide a renderização na placa. Se o recurso ficar em Flash externa, coordene a seção e a posição no sistema de arquivos com [Uso de Flash externa](external-flash.md).

## Fontes oficiais { #official-sources }

- [Uso da ferramenta EZIP no SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [Uso da ferramenta EZIP no SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [Uso da ferramenta EZIP no SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [Uso da ferramenta EZIP no SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
