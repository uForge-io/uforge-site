---
icon: lucide/rss
description: "O SF32LB57x já está documentado: cerca do dobro da capacidade de CPU de aplicação do SF32LB56x, gráficos ePicasso 3.0 e estrutura de custos competitiva."
---

# Outubro: apresentamos o SF32LB57x [2026-10-28] { #october-sf32lb57x-2026-10-28 }

Neste mês, a μForge.io incluiu a família SF32LB57x. Ela é a evolução aprimorada do SF32LB52x e do SF32LB56x, com bem mais poder de processamento de CPU e capacidade gráfica, mantendo uma estrutura de custos muito competitiva.

### Mais poder de processamento de CPU { #more-cpu-power }

SF32LB52x e SF32LB56x combinam, cada um, um núcleo de aplicação Cortex-M33 de 240 MHz com um núcleo de baixo consumo. O SF32LB57x usa dois núcleos de alto desempenho Cortex-M33 STAR-MC1 de 240 MHz, mais um núcleo de baixo consumo de 24 MHz que atua como controlador Bluetooth dedicado. Os dois núcleos de alto desempenho somam 1968 CoreMark / 740 DMIPS, cerca do dobro dos 984 CoreMark / 370 DMIPS do núcleo de aplicação do SF32LB56x. Essa folga permite executar a renderização da interface, a lógica da aplicação e o processamento de áudio ou multimídia em núcleos separados, em vez de disputarem um só, enquanto Bluetooth e sensores permanecem no caminho de baixo consumo.

### Mais capacidade gráfica { #more-graphics-capability }

Os gráficos sobem para ePicasso 3.0 com descompressão por hardware eZip 3.0, contra ePicasso 2.0 Lite no SF32LB52x e ePicasso 2.0 no SF32LB56x. O ePicasso 3.0 acelera rotação, escala, projeção, espelhamento e mistura alfa em tempo real, e o eZip 3.0 descomprime recursos eZip, JPEG e MJPEG sem uma decodificação pesada para a CPU. Além dos núcleos, a família traz entrada de câmera DCMI, até 48 MB de PSRAM e 32 MB de NOR Flash no encapsulamento em peças selecionadas, dois ADCs de áudio, duas interfaces CAN e o PTM, uma máquina de tarefas paralelas que descarrega trabalho de periféricos sensível à temporização.

### Uma estrutura de custos competitiva { #competitive-cost-structure }

Esse salto não coloca o SF32LB57x em outra faixa de custo. Na nossa avaliação, ele mantém uma estrutura de custos muito competitiva para o poder de processamento e os gráficos que oferece, e os encapsulamentos compactos QFN68 (7 × 7 mm), QFN80 (8 × 8 mm) e BGA112 (5,4 × 4,4 mm) ajudam a conter o tamanho e a complexidade da placa. É um candidato natural para produtos que superaram o SF32LB52x ou o SF32LB56x, como interfaces de smartwatch mais ricas, dispositivos portáteis com câmera e terminais compactos centrados em display, sem migrar para uma plataforma de topo.

### Documentação e por onde começar { #documentation-and-where-to-start }

A [página do chip SF32LB57x](../../sf32-products/chips/SF32LB57x.md) traz a visão geral completa e os registros das peças estão no [seletor de produtos](../../sf32-products/product-selector.md). O [guia de projeto de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) segue a mesma estrutura de esquemático, layout de PCB, checklist e revisão das outras famílias. Escolha a peça exata para pedido antes de reutilizar um esquemático, pois o encapsulamento e a base de alimentação definem detalhes como quantos GPIOs podem ser usados, e confirme os valores finais nos datasheets da SiFli.

### Também neste mês { #also-this-month }

O coreano entrou como nono idioma e as traduções descritas na [publicação anterior](2026-10-07-multi-language-translation.md) já estão publicadas. Continuam sendo traduções assistidas por máquina e podem não soar naturais para falantes nativos; se alguma página precisar de melhorias, [fale conosco](../../about/contact.md).
