---
icon: lucide/microchip
description: "SF32LB57x: família de MCUs AIoT multicore de ultrabaixo consumo com Bluetooth dual-mode, dois núcleos de 240 MHz, gráficos ePicasso 3.0, eZip 3.0 e encapsulamentos QFN/BGA."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Visão geral { #overview }

A série SF32LB57x reúne MCUs AIoT de ultrabaixo consumo para wearables, dispositivos inteligentes portáteis, casas inteligentes e produtos compactos com display. É indicada quando o produto precisa de mais recursos gráficos, áudio Bluetooth, entrada de câmera, armazenamento externo e operação sempre ativa do que um MCU Bluetooth básico oferece, sem assumir os compromissos de consumo, custo e integração de uma plataforma da classe de processador de aplicação. Como oferta da SiFli para 2026, o SF32LB57x representa uma evolução das famílias SF32LB52x e SF32LB56x, mantendo o foco na competitividade de custo. Oferece mais desempenho de CPU e de gráficos, mais GPIOs em encapsulamentos QFN compactos adequados à montagem de menor custo, além de combinações mais flexíveis de memória integrada ao encapsulamento. O [guia de projeto de hardware](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html) da SiFli informa um limite de tela de 1024 × 1024, enquanto o [FAQ de LCD](https://docs.sifli.com/projects/solution/7.FAQ/lcd/index.html) lista 1024 × 600 e 720 × 720 entre projetos RGB/DPI comuns ou validados e esclarece que essas referências não representam o limite físico absoluto do silício. A [matriz de interfaces](../../learn/graphics/display-controller.md#per-device-interface-matrix) atual da μForge registra 1024 × 600 RGB888 via DPI/RGB. Trate esses valores como referências, não como modos de painel garantidos; valide a referência e o encapsulamento exatos, a interface, os tempos do painel, a taxa de atualização, o pinmux e a largura de banda do framebuffer/PSRAM.

A família usa uma arquitetura de três núcleos Arm Cortex-M33 STAR-MC1[^1]: dois núcleos de alto desempenho (HCPU e ACPU) operando a até 240 MHz, com pontuação conjunta de 1.968 CoreMark / 740 DMIPS, e um núcleo LCPU de baixo consumo a 24 MHz. O [guia de uso da ACPU da SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) descreve explicitamente o SF32LB57x como um sistema de três núcleos: a ACPU processa áudio e gráficos, enquanto a LCPU executa tarefas sensíveis ao consumo, como BLE e processamento de dados de sensores. Confirme a configuração do SDK e a distribuição de tarefas para a carga de trabalho do produto. A plataforma inclui 592 KB de SRAM de retenção, gráficos ePicasso 3.0, descompressão eZip 3.0, controladores LCD e de câmera DCMI, Bluetooth de modo duplo, ADC/DAC de áudio, interfaces para memória SiP e externa, aceleração de segurança e atribuição de pinos via FreeIO. Seu principal diferencial é o PTM (Parallel Task Machine), um pequeno processador paralelo de tarefas que assume funções como o sequenciamento de periféricos sensível a ciclos, protocolos de E/S personalizados, aquisição de sensores, temporização semelhante a PWM e tratamento de eventos, liberando as CPUs principais desse trabalho.

Defina a referência comercial exata antes de reutilizar esquemáticos ou iniciar o layout da PCB. O SF32LB57x está disponível nos encapsulamentos QFN68, QFN80 e BGA112, com versões alimentadas por bateria e versões para alimentação externa regulada de 3,3 V, conforme a família do componente. Essa escolha define a árvore de alimentação, a quantidade de GPIOs, o fanout do encapsulamento, o roteamento do display e da memória, o acesso para depuração e a estratégia de bring-up.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita a reutilização de firmware, middleware, portas de RTOS e ferramentas existentes para Cortex-M33, sujeita ao trabalho normal de integração específico do dispositivo. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

[^2]: **Somente para BGA112.** SF32LB57x integra MPI1, MPI2 e MPI3. As posições da memória interna associadas a cada interface estão definidas na [convenção de nomenclatura dos componentes SF32](../family/SF32_namingrule.md). Em qualquer uma destas duas configurações de memória integrada ao encapsulamento, os pinos MPI2 e MPI3 não ficam acessíveis fora do encapsulamento; por isso, ficam disponíveis apenas 58 GPIOs: (1) um dispositivo PSRAM em MPI2, sozinho ou junto com outro dispositivo PSRAM em MPI1; ou (2) uma Flash NOR em MPI3. `SF32LB57GVD776` corresponde ao caso (2): o segundo `7` indica que o componente interno usa MPI3; portanto, ficam disponíveis apenas 58 GPIOs. Nas demais configurações, as seis E/S do BGA112 associadas a MPI3 podem ser usadas para MPI3 ou configuradas como saídas estáticas de uso geral (GP) por meio de pull-up ou pull-down; não são GPIOs de uso irrestrito. Assim, o valor `58 + 6` de `SF32LB57ZVN7N6` significa 58 GPIOs utilizáveis mais 6 pinos que podem ser usados para MPI3 ou como saídas estáticas, e não 64 GPIOs livremente atribuíveis. Essa limitação não se aplica aos encapsulamentos QFN68 e QFN80, que oferecem apenas a quantidade nominal de GPIOs, sem opções adicionais de MPI3 ou saídas estáticas.

[^3]: As dimensões e a espessura do encapsulamento seguem as tabelas de pedidos e os desenhos de encapsulamento dos datasheets do SF32LB57x da SiFli (DS5701 e DS5702): QFN68 (7 × 7 mm, desenhos de 0,9 mm ou 1,1 mm), QFN80 (8 × 8 mm, desenhos de 0,9 mm ou 1,1 mm) e BGA112 (5,4 × 4,4 mm, 0,98 mm). As referências com três dies de memória (uma PSRAM mais QSPI-NOR de dois dies) usam a opção de encapsulamento mais espessa: 1,1 mm para QFN68 e 1,03 mm para BGA112, conforme o guia de aplicação de hardware da SiFli. As tabelas de pedidos dos datasheets não listam SF32LB57ZVN7N6, portanto sua espessura de BGA112 foi tomada do único desenho de BGA112 dos datasheets (0,98 mm). O diagrama de nomenclatura específico do SF32LB57x associa U a QFN68, Y a QFN80 e V a BGA112; não presuma que o mapeamento de Y também se aplica a outras famílias SF32. Confirme com a SiFli a espessura e o desenho do encapsulamento da referência exata.

[^4]: Para a série alimentada por bateria, o datasheet do SF32LB57x da SiFli (DS5701) especifica VBAT e VCC de 3,0 a 4,7 V, com tensão de ativação de 3,5 V ±10 %. O guia de projeto de hardware da SiFli indica uma entrada mais estreita, de 3,45 a 4,7 V (QFN68, tabela 2-1-1; QFN80, tabela 2-1-3; BGA112, tabela 2-1-5); como os dois documentos divergem, confirme no datasheet da referência exata qual pino de entrada e limites se aplicam.
[^5]: A linha de tensão de E/S resume os domínios de alimentação de E/S suportados; não significa que cada pino possa usar qualquer uma das duas tensões. VDDIOA, quando alimentada separadamente, fornece energia aos GPIOs. VDDIOSB, quando presente, é a alimentação de E/S da memória SiP; o guia da SiFli especifica 1,8 V para PSRAM integrada e 3,3 V para Flash NOR. Para a série QFN68 de 3,3 V, a tabela 2-1-2 especifica apenas 3,3 V para VDDIOA. Verifique cada pino/domínio no guia do encapsulamento e no datasheet da referência exata.
[^6]: Dois dies: os dois dies são dispositivos de memória independentes, conectados a interfaces MPI separadas, e podem ser acessados separadamente.

## Aplicações { #applications }

**SF32LB57x é indicado para** produtos conectados compactos que combinam gráficos de interface, áudio Bluetooth, entrada de câmera, armazenamento externo ou sensoriamento sempre ativo em uma plataforma MCU de baixo consumo, como:

- Smartwatches, pulseiras fitness e dispositivos médicos vestíveis
- Dispositivos inteligentes com interface homem-máquina, terminais centrados em display e painéis de controle
- Dispositivos inteligentes com papel eletrônico e porta-retratos digitais
- Eletrodomésticos inteligentes de pequeno e médio porte e fechaduras inteligentes
- Produtos portáteis de gravação, áudio e walkie-talkies ou intercomunicadores Bluetooth
- Dispositivos vestíveis ou portáteis com câmera
- Produtos industriais de exibição, sensoriamento, monitoramento e instrumentação
- Controladores de console central automotivo, chaves automotivas sem fio e controles remotos para veículos
- Redes Bluetooth Mesh e redes de concentradores de sensores de baixo consumo

Consulte [Características e especificações](#features-and-specs) para ver os recursos de gráficos, câmera, áudio, armazenamento e PTM que sustentam esses usos. O valor Bluetooth 6.3 segue os datasheets do SF32LB57x; os resumos de produto ainda mostram uma versão anterior. Confirme os recursos opcionais na documentação SiFli atual correspondente ao código exato da peça a ser encomendada.

## Recursos de desenvolvimento { #development-resources }

[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Repositório do código-fonte do SiFli SDK]: https://github.com/OpenSiFli/SiFli-SDK
[Datasheet para bateria]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[Datasheet para 3,3 V]: https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[Manual do usuário]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf
[Guia de projeto original]: https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __Resumo do produto ([bateria](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3,3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __Datasheet ([bateria / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3,3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[Manual do usuário (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-brands-github: __[Repositório do código-fonte do SiFli SDK]__
- :fontawesome-solid-file-lines: __[Guia de projeto original (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[Guia da placa de desenvolvimento (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli][SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- Dois núcleos de alto desempenho Arm Cortex-M33 STAR-MC1 de até 240 MHz, com FPU e MPU (1.968 CoreMark / 740 DMIPS combinados)
- Núcleo de baixo consumo Arm Cortex-M33 STAR-MC1 a 24 MHz
- Cache de instruções de 32 KB + cache de dados de 16 KB (HCPU)
- 592 KB de SRAM de retenção (512 KB HPSYS + 80 KB LPSYS), incluindo 128 KB de D-TCM sem ciclos de espera
- Memória integrada ao encapsulamento, conforme a variante: até 48 MB de PSRAM e 32 MB de Flash NOR

### Aceleração de IA { #ai-acceleration }

O [guia de hardware do SF32LB57x](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html) da SiFli lista um acelerador integrado de rede neural para IA. No entanto, o [guia NNACC do SiFli SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) cita as famílias 55x, 56x e 58x, mas não a 57x. Antes de depender dessa aceleração, confirme com a SiFli o suporte de driver, operadores e toolchain para a referência 57x exata.

### PTM (Parallel Task Machine) { #ptm-peripheral-task-machine }

- PTM de 4 núcleos para tarefas periféricas personalizadas, com execução temporizada por hardware em vez de atendimento contínuo da CPU
- Temporização ciclo a ciclo para sequências de E/S determinísticas
- Até 16 canais de E/S por núcleo, com suporte a FIFO/DMA
- Acesso à memória AHB e aos registradores dos periféricos, interrupções para a CPU e eventos entre núcleos

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth 6.3 de modo duplo (Bluetooth Classic e BLE), com BLE Audio e LE Long Range
- Potência máxima de transmissão:
    - 17 dBm para BLE/BR
    - 13 dBm para EDR2 e EDR3
- Sensibilidade: −100 dBm em BLE a 1 Mbps

### Gráficos, display e câmera { #graphics-display-and-camera }

A matriz de interfaces atual da μForge registra 1024 × 600 RGB888 via DPI/RGB; as ressalvas sobre as fontes e a validação de modos estão na [Visão geral](#overview). Confirme as interfaces e os pinos disponíveis para a referência e o encapsulamento exatos na [Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix).

- Acelerador gráfico 2D/2.5D ePicasso 3.0, de até 2048 × 2048
- Decodificador de hardware eZip 3.0 para eZip/eZip-A sem perdas, além de JPEG e MJPEG
- Controlador LCD dedicado compatível com 8080, SPI/DSPI/QSPI, DPI/RGB, JDI e EPD de 8/16 bits
- Controlador de câmera DCMI compatível com DVP e SPI/DSPI/QSPI

### Áudio e analógico { #audio-and-analog }

- 1 DAC de áudio de 24 bits com SNR de 109 dB
- 2 ADCs de áudio de 24 bits com SNR de 97 dB
- 1 ADC de uso geral de 12 bits (12 canais)
- Sensor de temperatura

### Armazenamento e segurança { #storage-and-security }

- 3 MPI (QSPI) para NOR, NAND e QPI-PSRAM, com XIP
- 2 SD 3.0/SDIO 3.0/eMMC
- Aceleradores de hardware AES/HASH/CRC
- TRNG
- Descriptografia de Flash em tempo real (on-the-fly) e arquitetura de segurança eShield
- PSA Certified Level 1

### Periféricos e E/S { #peripherals-and-ios }

- 3 UART
- 4 I2C
- 2 SPI
- 2 I2S
- 2 interfaces PDM (até dois microfones digitais cada)
- 1 USB 2.0 FS
- 2 CAN
- RTC, watchdog e temporizadores de uso geral (GPTIM, BTIM, ATIM, LPTIM) com PWM
- Até 58 GPIOs, conforme o encapsulamento e a referência comercial, com atribuição flexível via FreeIO

### Gerenciamento de energia { #power-management }

- Conversor Buck integrado e LDOs de baixo consumo; duas saídas externas de 3,3 V, com até 150 mA cada
- Corrente em Hibernate: 2,8 µA a 3,8 V (configuração alimentada por bateria) ou 1 µA a 3,3 V (configuração com alimentação externa)
- Carregador de íons de lítio de até 400 mA (4,2 V a 4,45 V) na configuração alimentada por bateria
- Faixa de entrada da bateria/sistema[^4]: 3,0 V a 4,7 V
- Faixa de VBUS: 4,5 V a 5,5 V
- Faixa de temperatura de operação: −40 °C a +85 °C

## Variantes da família { #family-variants }

SF32LB57x inclui variantes alimentadas por bateria e variantes para alimentação externa regulada de 3,3 V. Defina a referência comercial exata antes de criar o esquemático, pois o desenho do encapsulamento, os pinos de alimentação, a quantidade de GPIOs, a memória integrada e as restrições da placa variam entre os componentes.

As referências abaixo vêm das tabelas de pedidos dos datasheets do SF32LB57x da SiFli (DS5701 e DS5702, ambos rascunhos preliminares), exceto `SF32LB57ZVN7N6`, que essas tabelas não listam. Confirme o código de pedido exato, a configuração de memória integrada ao encapsulamento, os limites elétricos e o desenho do encapsulamento na documentação atual da SiFli específica para cada componente antes de adotá-lo no projeto.

Para a seleção inicial, considere estes grupos:

- **`SF32LB57xU`**: QFN68, grupo alimentado por bateria de íons de lítio (nível indicado por dígito, por exemplo, `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, grupo padrão para alimentação externa de 3,3 V (nível indicado por letra, por exemplo, `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, grupo para alimentação externa de 3,3 V.

O datasheet da série alimentada por bateria (DS5701) também lista um QFN80 alimentado por bateria (8 × 8 mm, 58 GPIOs) e um BGA112 alimentado por bateria (até 58 GPIOs mais 6 E/S GPO ou de interface MPI). No entanto, sua tabela de pedidos não contém nenhuma referência de QFN80 ou BGA112 alimentado por bateria; por isso, confirme o SKU que pode ser encomendado com a SiFli antes de projetar em torno de qualquer um deles.

<div align="center"><em>Variantes SF32LB57x em QFN68 (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Encapsulamento | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Dimensões em planta[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Espessura[^3] | 0,9 mm | 1,1 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Passo | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| PSRAM integrada ao encapsulamento | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | Nenhuma |
| Flash NOR integrada ao encapsulamento | 16 MB QSPI-NOR | 16 MB + 8 MB QSPI-NOR (dois dies)[^6] | 2 × 16 MB QSPI-NOR (dois dies)[^6] | Nenhuma | Nenhuma | 1 MB QSPI-NOR |
| Alimentação[^4] | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | **3,3 V** |
| Tensão de E/S[^5] | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V |
| Temperatura | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

<div align="center"><em>Variantes SF32LB57x em QFN80 / BGA112 (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Encapsulamento | QFN80 | QFN80 | BGA112 | BGA112 |
| Dimensões em planta[^3] | 8 × 8 mm | 8 × 8 mm | 5,4 × 4,4 mm | 5,4 × 4,4 mm |
| Espessura[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 1,03 mm |
| Passo | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 ou saídas estáticas)[^2] | 58[^2] |
| PSRAM integrada ao encapsulamento | 8 MB (2 × 4 MB, dois dies) OPI-PSRAM[^6] | 16 MB OPI-PSRAM | Nenhuma | 16 MB OPI-PSRAM |
| Flash NOR integrada ao encapsulamento | Nenhuma | 16 MB QSPI-NOR | 16 MB QSPI-NOR | 32 MB (2 × 16 MB, dois dies) QSPI-NOR[^6] |
| Alimentação | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tensão de E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

Para SF32LB57x, a escolha do encapsulamento não é apenas uma questão de custo da PCB. Ela afeta as interfaces de display disponíveis, o roteamento da memória externa, o orçamento de GPIOs, a reserva de pinos de depuração e gravação e a dificuldade do fanout. Fixe o encapsulamento junto com a arquitetura de alimentação. Use a referência comercial completa, e não apenas o nome do encapsulamento, como base para a lista de materiais e o esquemático: o sufixo de memória altera a configuração de armazenamento SiP e pode afetar as premissas sobre mídia de inicialização, sequência de alimentação e necessidade de memória externa.

## Caminho de integração { #integration-path }

Siga esta sequência para transformar uma lista inicial de opções SF32LB57x em um projeto validado:

1. **Valide o caminho do firmware.** Comece pelo [guia de introdução ao SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para validar os recursos de gráficos, áudio, câmera, Bluetooth e armazenamento previstos para o produto.
2. **Planeje o hardware de avaliação.** Use a [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) para avaliar o display, a câmera, o áudio e a conectividade. Antes de usá-la como referência para um produto 57x, confirme a configuração de memória do módulo, a revisão da placa e a configuração dos pinos compartilhados.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, siga o [guia de projeto de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), incluindo a [autoverificação do projeto pelo cliente](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), e o processo de revisão de [projeto para produção](../../hardware/design-for-production.md). Aplique também os checklists de [esquemático](../../hardware/chip-guides/SF32LB57x_schematic_checklist.md) e de [layout de PCB](../../hardware/chip-guides/SF32LB57x_pcb_layout_checklist.md).
4. **Consulte as fontes oficiais.** Confirme a referência comercial e o encapsulamento exatos no [datasheet para bateria] ou no [datasheet para 3,3 V], no [manual do usuário] e no [guia de projeto original] da SiFli. Para selecionar componentes críticos da lista de materiais, consulte também a [lista de fornecedores aprovados da SiFli].

<!-- uf-faq:start -->
## Perguntas frequentes { #frequently-asked-questions }

**Quais são as principais especificações do SF32LB57x?**
O SF32LB57x oferece processamento de aplicações (2× Cortex-M33 @240 MHz) e um núcleo de baixo consumo (Cortex-M33 @24 MHz, controlador Bluetooth dedicado). Integra 592 KB de SRAM interna e oferece Bluetooth dual-mode (BT clássico + BLE). Gráficos: ePicasso 3.0 + eZip 3.0. Encapsulamento: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5,4 × 4,4 mm (BGA112)). USB 2.0 FS.

O guia de hardware lista um acelerador de redes neurais integrado, mas o guia NNACC do SDK v2.5.1 não comprova suporte de driver ou operadores para o 57x. Confirme o caminho de software do alvo exato; veja [aceleração de IA](#ai-acceleration).

**Quais interfaces de display o SF32LB57x suporta?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. ([Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix)) Esta lista abrange toda a família, não garante todas as interfaces em cada código de componente ou encapsulamento; confira a matriz de interfaces vinculada.

**Qual é a resolução máxima de display do SF32LB57x?**
O guia de hardware estabelece um limite de 1024 × 1024; a FAQ de LCD da SiFli cita projetos RGB/DPI comuns ou validados de 1024 × 600 e 720 × 720. A matriz de interfaces atual lista 1024 × 600 RGB888. Esses valores não são garantias intercambiáveis. Confira o componente e o encapsulamento exatos, a interface, o timing do painel, a taxa de atualização, o multiplexamento de pinos e a largura de banda do framebuffer/PSRAM; veja as [condições de display](#overview). ([Matriz de interfaces por dispositivo](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**Quanta memória no encapsulamento o SF32LB57x oferece?**
Até 48 MB de PSRAM e até 32 MB de Flash NOR no encapsulamento.

**Qual tensão de alimentação o SF32LB57x precisa?**
Variantes com bateria: o DS5701 informa 3,0–4,7 V, enquanto o guia de hardware informa 3,45–4,7 V para QFN68/QFN80/BGA112. O DS5701 também especifica tensão na energização de 3,5 V ±10%. Variantes com regulador externo: 2,97–3,63 V. Esclareça a divergência para o componente e o pino de entrada exatos; veja as [condições de alimentação](#power-management).

**Por onde começar um projeto de hardware com o SF32LB57x?**
Comece pelo [guia de projeto de hardware do SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) para esquemático, alimentação, clock/RF e layout de PCB, e use os checklists de esquemático e layout antes de liberar a placa.
<!-- uf-faq:end -->

## Produtos relacionados { #related-products }

### Linha de base do projeto de hardware { #hardware-design-baseline }

Use o [guia de projeto de hardware (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), a nota oficial de aplicação de hardware, o datasheet e a lista de fornecedores aprovados como linha de base do projeto. Antes de liberar o esquemático ou a PCB, confirme a arquitetura de alimentação, o fanout do encapsulamento e o plano de display, armazenamento, áudio, câmera, RF e acesso para depuração/gravação.

### Kits de desenvolvimento { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) é a placa de avaliação para displays RGB, câmeras DVP, dois microfones PDM, saída de alto-falante, Wi-Fi SDIO e USB. Ela usa um módulo SF32LB57-MOD-WD. O guia da placa da SiFli o descreve como um módulo SF32LB57X de 3,3 V com Wi-Fi/Bluetooth integrado e Flash QSPI de boot; a presença de OPI-PSRAM depende do SKU do módulo. Antes de usar a placa como base para produção, confirme com a SiFli a configuração exata do módulo e seu status de certificação de RF.

Use os esquemáticos de referência oficiais, as orientações de projeto do sistema mínimo e os materiais de checklist para planejar alimentação, clocks, RF, display, armazenamento, áudio, câmera e acesso para produção.

### Produtos de referência { #reference-products }

Entre os produtos típicos baseados em SF32LB57x estão smartwatches e pulseiras, dispositivos HMI inteligentes, produtos com display de papel eletrônico, eletrodomésticos inteligentes de pequeno e médio porte, equipamentos portáteis de gravação e áudio, painéis para casas inteligentes, terminais compactos com display e produtos Bluetooth com câmera.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi compilada/redigida sem um documento-fonte existente. Verifique as afirmações técnicas na documentação oficial da SiFli antes de usá-las como referência.
