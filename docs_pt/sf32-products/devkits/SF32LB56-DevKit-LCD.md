---
icon: lucide/circuit-board
description: "A placa de desenvolvimento SF32LB56-DevKit-LCD, baseada no módulo SF32LB56xV, permite avaliar display, áudio, armazenamento e periféricos."
tags:
    - Hardware
    - Placa de desenvolvimento
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

A SF32LB56-DevKit-LCD é uma placa de desenvolvimento voltada a aplicações com display, disponível com o módulo SF32LB56-MOD-N16R12N1 ou SF32LB56-MOD-A128R12N1; ambos usam um dispositivo da série SF32LB56xV. A placa permite avaliar interfaces de display, áudio, armazenamento removível e drivers de periféricos antes de projetar uma placa SF32LB56x personalizada.

## Principais aplicações { #what-it-is-best-for }

- Aplicações de display com interfaces MIPI-DPI (RGB), SPI, DSPI, QSPI ou MCU/8080 de 8 bits.
- Integração de painel de toque por I2C.
- Experimentos de áudio com entrada analógica para microfone e saída analógica pelo amplificador de potência Classe D integrado à placa.
- Armazenamento em cartão TF via SDIO e desenvolvimento geral de drivers de periféricos.
- Avaliação de uma arquitetura de produto baseada no módulo SF32LB56 antes de definir o projeto da placa portadora.

## Recursos da placa { #board-resources }

<div align="center"><em>Tabela: Recursos da SF32LB56-DevKit-LCD</em></div>

<div align="center" markdown>

| Recurso | Implementação na placa | Uso prático |
|:---------|:---------------------|:--------------|
| Configuração N16R12N1 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR, 4 + 8 MB OPI-PSRAM e 1 MB QSPI-NOR; para avaliação do módulo e planejamento da placa portadora. |
| Configuração A128R12N1 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND, 4 + 8 MB OPI-PSRAM e 1 MB QSPI-NOR; para avaliação do módulo e planejamento da placa portadora. |
| Dimensões e temperatura | 65 mm × 38 mm; faixa de operação de -40 °C a 85 °C segundo o guia de modelos | Planejamento mecânico e ambiental. |
| Display | MIPI-DPI RGB de 24 bits por conector FPC de 40 pinos, passo de 0,5 mm e pinagem ALIENTEK; header 2 × 20 de 40 pinos expõe SPI/DSPI/QSPI e MCU/8080 de 8 bits | Bring-up do painel e desenvolvimento de drivers de display. |
| Toque | Suporte a painel de toque I2C | Protótipos de displays interativos. |
| Áudio | Uma entrada de microfone MEMS analógico e um canal de amplificador Classe D integrado; saída para alto-falante de até 3 W / 4 Ω segundo o guia de modelos | Gravação e reprodução local; confira a carga do alto-falante e a revisão da placa. |
| Armazenamento | Slot MicroSD via SDIO | Testes de mídia, logs, sistema de arquivos e recursos. |
| USB e alimentação | Dois conectores USB Type-C: um para USB-UART (CH343K segundo o guia de modelos) e outro para USB 2.0 FS; ambos podem alimentar a placa | Logs seriais, gravação/depuração, avaliação de USB e alimentação de bancada. |
| Conversão de alimentação | CIs conversores de 3,3 V e 1,8 V na placa | Confira os requisitos dos trilhos no esquemático antes de adicionar cargas. |
| Depuração e boot | Header SWD de uma fileira, 4 pinos e passo de 2,54 mm; jumper Mode; um botão de alimentação, um de função e um de reset | Gravação de firmware, depuração SWD e seleção do modo de boot. |
| Indicadores | LED RGB, LED controlado por GPIO e LED de alimentação | Verificação do firmware e do estado da alimentação. |
| RF | Antena integrada como padrão; opção de 0 Ω para seleção de IPEX | Avaliação da antena e do gabinete com a configuração do módulo. |

</div>

**Nota sobre as fontes — confirme a revisão da placa:** O guia detalhado da SiFli identifica a placa descrita como equipada com o módulo `SF32LB56-MOD-A128R12N1`, com 4 MB + 8 MB de OPI-PSRAM no encapsulamento e 1 Gb de QSPI-NAND; também informa que esses dados de memória podem mudar antes do lançamento oficial. O guia atual de modelos lista as configurações N16R12N1 e A128R12N1, ambas com 4 + 8 MB de OPI-PSRAM e 1 MB de QSPI-NOR padrão. Para a A128R12N1, os 128 MB de QSPI-NAND no guia de modelos equivalem em capacidade ao 1 Gb do guia detalhado. Portanto, essas capacidades são consistentes para a A128R12N1. No entanto, o guia detalhado não menciona a QSPI-NOR padrão de 1 MB nem determina qual SKU está montado em cada placa ou revisão. O guia de modelos informa que o CH343K oferece dois canais de depuração USB-UART, mas o guia detalhado apenas atribui as funções USB-UART e USB 2.0 FS aos conectores Type-C, sem indicar como os canais UART são distribuídos entre eles. Antes de depender de um canal UART específico, consulte o esquemático/BOM da revisão correspondente. Antes de usar uma unidade específica como referência de produto, confira a identificação do módulo e o esquemático/BOM correspondente.

**Divergência na identificação da ponte USB-UART — confirme o componente montado:** O diagrama de blocos do guia detalhado identifica a ponte como CH342K, enquanto o guia de modelos informa CH343K. Confira o componente real no esquemático/BOM da revisão correspondente.

**Divergência entre foto e texto sobre o SKU — confirme o módulo instalado:** O texto do guia detalhado identifica a placa descrita com o módulo `SF32LB56-MOD-A128R12N1`, mas a foto frontal anotada identifica o módulo como `SF32LB56-MOD-N16R12N1`. A SiFli não esclarece se a foto mostra outra variante ou revisão. Confira a marcação do módulo e a BOM da unidade; não deduza o SKU apenas pelo texto ou pela foto.

## Gravação e depuração { #programming-and-debug }

Para entrar no modo de gravação, instale o jumper Mode antes de ligar ou reiniciar a placa; remova-o para iniciar a aplicação normalmente e obter logs seriais. Conecte o host à porta USB-UART Type-C usando um cabo com suporte a dados. A outra porta USB 2.0 FS Type-C pode ser usada para testar USB nativo. A placa também oferece um header SWD de uma fileira, 4 pinos e passo de 2,54 mm para um depurador compatível. Ambos os conectores Type-C podem alimentar a placa; siga a configuração de alimentação indicada no guia da placa e no esquemático.

## Alvos de compilação do SDK { #sdk-build-targets }

Ao compilar com o SiFli-SDK, use `scons --board=<board_name>` com um destes nomes exatos de alvo:

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

Esses nomes identificam alvos de compilação do SDK e não necessariamente correspondem ao nome do produto impresso na placa ou no módulo. O índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) e o [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) do SDK podem listar conjuntos diferentes; confirme o alvo para a revisão do SDK em uso.

## Primeiro roteiro de validação { #first-validation-path }

1. Conecte um display MIPI-DPI de 24 bits compatível ao FPC de 40 pinos e use a porta USB-UART com um cabo USB que permita transferência de dados.
2. Siga [Primeiros passos](../../getting-started/index.md) para estabelecer uma configuração funcional de build, gravação e logs seriais.
3. Exiba padrões de cor sólida antes de depurar um framework de UI; consulte a [visão geral de gráficos](../../learn/graphics/overview.md).
4. Adicione toque, armazenamento, áudio ou conectividade sem fio um subsistema por vez; depois, teste a coexistência e o comportamento de consumo.
5. Antes de um projeto personalizado, consulte [SF32LB56-MOD](../modules/SF32LB56-MOD.md) e [Projeto para produção](../../hardware/design-for-production.md).

## Referência { #reference }

O [guia de modelos de placas de desenvolvimento](https://wiki.sifli.com/en/board/devkit_guide.html) da SiFli lista os códigos disponíveis para as placas e seus módulos. O [guia detalhado da SF32LB56-DevKit-LCD](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html) descreve a atribuição de GPIO, os headers e as interfaces, a alimentação e os procedimentos de gravação e depuração.
