---
icon: lucide/book-a
description: "Glossário de consulta rápida de termos e siglas de sistemas embarcados, conectividade sem fio, gráficos e tecnologias da SiFli usados na documentação SF32 da μForge.io."
tags:
    - Sobre
---

# Glossário { #glossary }

Este glossário reúne siglas e termos usados na documentação da μForge.io: tanto a terminologia geral de sistemas embarcados e comunicação sem fio quanto os nomes próprios da SiFli para a plataforma SF32. Cada item leva à página que explica o assunto em mais detalhes. Use este glossário como referência rápida, não como substituto do contexto completo.

## Arquitetura e processamento { #architecture-and-processing }

* **MCU** — **Microcontroller Unit (microcontrolador).** Circuito integrado que reúne um núcleo de CPU, memória e periféricos programáveis de entrada/saída. É otimizado para executar firmware dedicado com baixa sobrecarga, em vez de um sistema operacional de uso geral.
* **SoC** — **System on Chip (sistema em um chip).** Circuito integrado que reúne em um único chip os circuitos e componentes eletrônicos necessários a um sistema computacional. Neste site, os componentes SF32 são classificados como MCUs porque se destinam a firmware de classe microcontrolador, não ao ambiente completo de sistema operacional de um processador de aplicação.
* **Arm Cortex-M33** — Arquitetura de processador Armv8-M Mainline de 32 bits usada nos núcleos de aplicação e Bluetooth do SF32. Em relação aos núcleos Cortex-M3/M4 anteriores, o Armv8-M Mainline oferece como opção a extensão de segurança TrustZone, que isola por hardware código e dados confiáveis dos não confiáveis. A presença do TrustZone depende da configuração de cada implementação de silício; não é um recurso garantido em todo Cortex-M33 e não está configurado nos componentes SF32LB52x a SF32LB58x atuais. Consulte também STAR-MC1, abaixo, e a [página do chip SF32LB52x](../sf32-products/chips/SF32LB52x.md).
* **STAR-MC1** — IP configurável de CPU embarcada Armv8-M Mainline da Arm China, usado como processador de aplicação de classe Cortex-M33 em dispositivos SF32 compatíveis. As configurações CU, SP e SE diferem em cache, TCM, XIPU e recursos de TrustZone; os recursos disponíveis dependem de cada dispositivo SF32. A documentação da SiFli pode usar “Arm Cortex-M33 STAR-MC1” ou “Arm Cortex-M33”, conforme o contexto. Consulte a [página de arquitetura STAR-MC1](../learn/architecture/star-mc1.md).
* **CDE** — **Custom Datapath Extension (extensão personalizada do caminho de dados).** Mecanismo de instruções personalizadas da Arm para acelerar operações específicas. O material da Arm China sobre STAR-MC1 usa CRC32 como exemplo de CDE; a disponibilidade nos componentes SF32 e o suporte de software devem ser verificados para cada dispositivo.
* **DSP** — **Digital Signal Processor / digital signal processing (processador digital de sinais / processamento digital de sinais).** Extensões incorporadas ao núcleo Cortex-M33 para tarefas com uso intensivo de cálculos, como áudio e fusão de sensores.
* **MPU** — **Memory Protection Unit (unidade de proteção de memória).** Recurso de hardware que restringe as regiões de memória acessíveis ao código, usado para isolamento de falhas e segurança.
* **HAL** — **Hardware Abstraction Layer (camada de abstração de hardware).** Camada do SDK que disponibiliza os periféricos por meio de uma API consistente, independente da variante exata do chip.
* **Acelerador de IA / ML** — Hardware que acelera cargas de trabalho de inteligência artificial ou aprendizado de máquina, como a inferência de uma rede neural compacta. A disponibilidade varia por dispositivo; confirme o componente escolhido no seletor de produtos e no respectivo datasheet.

## Conectividade sem fio { #wireless-connectivity }

* **BLE** — **Bluetooth Low Energy (Bluetooth de baixa energia).** Modo de rádio Bluetooth de baixo consumo usado pela maioria dos produtos SF32 para wearables e IoT.
* **Wi-Fi** — Tecnologia de rede local sem fio. Quando a documentação de um produto SF32 especifica suporte a Wi-Fi externo, a conexão é feita pela interface SDIO. Antes de fechar o projeto, confirme o componente exato, o roteamento na placa, a alimentação e o suporte de software.
* **Bluetooth de modo dual** — Suporte a BLE e Bluetooth Clássico (BR/EDR) pelo mesmo rádio, usado quando o produto precisa dos dois, por exemplo, para transmitir áudio (Bluetooth Clássico ou LE Audio) e manter um canal de controle de baixo consumo. Compatível com SF32LB52x/56x/57x/58x; o SF32LB55x oferece apenas BLE.
* **GAP** — **Generic Access Profile (perfil genérico de acesso).** Camada Bluetooth que define os papéis dos dispositivos, o advertising e o estabelecimento de conexões; é a base de toda aplicação BLE.
* **GATT** — **Generic Attribute Profile (perfil genérico de atributos).** Camada Bluetooth que define a estrutura de serviços e características e como os dados disponibilizados por um dispositivo BLE são organizados e trocados.
* **Sibles** — Estrutura de serviços GATT do SiFli-SDK, construída sobre a camada GAP padrão. A maioria dos produtos Bluetooth SF32 parte de um exemplo existente baseado em Sibles, em vez de criar um banco de dados GATT do zero. Consulte a [visão geral do Bluetooth](../learn/bluetooth/overview.md).
* **LE Audio** — Padrão mais recente de áudio Bluetooth Low Energy, que inclui o codec LC3 e os modos de áudio por transmissão Auracast, em contraste com os perfis de áudio Bluetooth Clássico. Compatível com SF32LB52x/56x/57x/58x; não compatível com SF32LB55x. Consulte [Áudio Bluetooth e LE Audio](../learn/bluetooth/processor.md).
* **OTA** — **Over-The-Air (atualização de firmware sem fio).** Atualização do firmware do dispositivo por uma conexão sem fio, normalmente BLE, em vez de uma conexão cabeada.
* **DFU** — **Device Firmware Update (atualização de firmware do dispositivo).** Categoria geral de mecanismos e protocolos de atualização de firmware; atualizações OTA por Bluetooth normalmente implementam um mecanismo DFU.

## Gráficos e telas { #graphics-and-display }

* **ePicasso** — Mecanismo próprio de aceleração gráfica 2D/2.5D da SiFli para a família SF32. Ele transfere da CPU de aplicação operações de pixel como cópia, combinação, redimensionamento, rotação e composição de camadas. Consulte a [página de arquitetura do ePicasso](../learn/graphics/epicasso-gpu.md).
* **eZip** — Formato próprio da SiFli para compressão sem perdas de gráficos e dados de uso geral, com decodificação por hardware nos dispositivos SF32 compatíveis. Para gráficos, a SiFli descreve a taxa de compressão como ligeiramente superior à do PNG; para dados de uso geral, o resultado depende do conteúdo original. Como os recursos comprimidos passam pelo barramento antes da decodificação, o eZip pode reduzir a largura de banda externa usada pela PSRAM e pela NOR Flash.
* **TurboPixel** — Formato com perdas e taxa de compressão fixa para o framebuffer final, disponível nos componentes SF32 compatíveis. O extDMA comprime o bitmap renderizado em TurboPixel e o controlador de display o descomprime, reduzindo a largura de banda e a capacidade de PSRAM necessárias. Consulte a [página de compressão de framebuffer TurboPixel](../learn/graphics/turbopixel.md).
* **LVGL** — **Light and Versatile Graphics Library (biblioteca gráfica leve e versátil).** Framework de interface de usuário embarcada e de código aberto usado pela maioria dos produtos SF32, com renderização acelerada pelo ePicasso.
* **HMI** — **Human-Machine Interface (interface homem-máquina).** Termo que designa a interface de usuário no dispositivo — tela, toque e botões — como categoria de projeto.
* **Interface de display RGB / DPI** — Interface paralela que envia diretamente os componentes de cor dos pixels a um painel ou controlador de display compatível. Seu nome formal é **DPI (Display Pixel Interface)**; “interface RGB” é a abreviação comum no projeto de placas. Normalmente usa clock de pixel, sinais de sincronização horizontal e vertical e várias linhas paralelas de dados de cor. Em comparação com uma interface serial, a DPI usa mais GPIOs e exige mais cuidado no roteamento paralelo. Confirme o orçamento de pinos do encapsulamento e os requisitos de temporização do painel.
* **Interface de display MIPI** — Interface definida pelos padrões da MIPI Alliance e usada por painéis compatíveis que exigem maior largura de banda.
* **EPD** — **Electronic Paper Display (display de papel eletrônico).** Tecnologia de tela reflexiva, normalmente usada em displays de baixo consumo.
* **Interface de display JDI** — Suporte a displays JDI / Sharp Memory-in-Pixel compatíveis, quando documentado para o dispositivo SF32 selecionado.

## Áudio { #audio }

* **ADC / DAC** — **Analog-to-Digital / Digital-to-Analog Converter (conversor analógico-digital / digital-analógico).** Caminhos de entrada e saída de áudio nos componentes SF32 com recursos de áudio integrados. ADC/DAC de áudio dedicados estão disponíveis em SF32LB52x/56x/57x/58x; o SF32LB55x não dispõe de ADC/DAC de áudio dedicado.
* **PDM** — **Pulse-Density Modulation (modulação por densidade de pulsos).** Formato comum de interface para microfones digitais, compatível, junto com I2S, nos componentes SF32 com recursos de áudio. Uma interface PDM não equivale a um microfone: normalmente, uma interface pode conectar até dois microfones digitais, que compartilham o clock e usam bordas opostas dele para identificar os canais esquerdo e direito. Especifique e compare a quantidade de interfaces PDM, não a quantidade de microfones.
* **I2S** — **Inter-IC Sound.** Interface de áudio digital padrão para conectar codecs, DACs e outros periféricos de áudio.

## Energia e confiabilidade { #power-and-reliability }

* **PMU** — **Power Management Unit (unidade de gerenciamento de energia).** Bloco integrado aos chips SF32 que regula as tensões e fornece saídas BUCK/LDO. Alguns projetos o combinam com um PMIC externo da SiFli, como o SF30147C, para obter trilhos de alimentação adicionais.
* **PMIC** — **Power Management IC (circuito integrado de gerenciamento de energia).** Chip externo dedicado que fornece trilhos regulados adicionais além dos fornecidos pela PMU interna do MCU.
* **LDO** — **Low-Dropout regulator (regulador linear de baixa queda de tensão).** Tipo de regulador linear e um dos estágios de saída internos da PMU nos componentes SF32.
* **BUCK** — Topologia de regulador chaveado (não linear), mais eficiente que um LDO em correntes mais altas e também integrada à PMU SF32.
* **TRNG** — **True Random Number Generator (gerador de números verdadeiramente aleatórios).** Fonte de entropia por hardware baseada em ruído térmico físico, usada para gerar chaves criptográficas e habilitar funções de segurança.
* **PSA** — **Platform Security Architecture (arquitetura de segurança de plataforma).** Framework de segurança e programa de certificação da Arm. As páginas de alguns chips SF32 informam **PSA Certified Level 1**; confirme o status e o nível de certificação do modelo exato na documentação oficial, sem presumir que essa informação vale para toda a família.

## Armazenamento e memória { #storage-and-memory }

* **SRAM** — **Static RAM (RAM estática).** Memória de trabalho rápida no chip, usada para executar código e armazenar dados da aplicação.
* **PSRAM** — **Pseudo-Static RAM (RAM pseudoestática).** Memória externa de maior capacidade (frequentemente integrada aos módulos SF32 em System-in-Package) que complementa a SRAM no chip para buffers gráficos e aplicações maiores.
* **NOR / NAND Flash** — Dois tipos de memória flash não volátil usados para armazenar firmware e recursos. A NOR permite leituras aleatórias rápidas e é comum para execução direta de código (XiP, Execute-in-Place); NAND/SD-NAND troca velocidade de acesso aleatório por maior densidade, sendo adequada ao armazenamento em massa de imagens, fontes e logs.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (ou Serial Peripheral) Interface (interface periférica octal/quad ou serial).** Classe de quantidade de pinos e largura de banda da interface de Flash ou PSRAM: Quad usa 4 linhas de dados e Octal usa 8. Essa classe afeta a largura de banda de memória alcançável.
* **eMMC** — **Embedded MultiMediaCard (cartão multimídia embarcado).** Interface de armazenamento baseada em NAND gerenciada, usada em projetos SF32 que exigem maior capacidade.

## Periféricos e interfaces { #peripherals-and-interfaces }

* **GPIO** — **General-Purpose Input/Output (entrada/saída de uso geral).** Pinos digitais configuráveis para sinais simples, botões, LEDs e interfaces implementadas por bit-banging em software.
* **I/O** — **Input/Output (entrada/saída).** Termo geral para pinos e sinais periféricos usados pelo dispositivo para trocar dados ou sinais de controle com o restante do sistema.
* **UART** — **Universal Asynchronous Receiver/Transmitter (transmissor/receptor assíncrono universal).** Interface serial padrão para console, depuração e comunicação ponto a ponto simples.
* **SPI** — **Serial Peripheral Interface (interface serial de periféricos).** Barramento serial síncrono usado para displays, Flash, sensores e outros periféricos de alta velocidade.
* **I2C** — **Inter-Integrated Circuit (circuito entre integrados).** Barramento serial síncrono multiponto, usado com frequência para sensores e configuração de periféricos de baixa velocidade.
* **SDIO** — **Secure Digital Input Output (entrada/saída Secure Digital).** Interface host usada em projetos SF32 documentados para conectar um dispositivo Wi-Fi externo.
* **DCMI** — **Digital Camera Module Interface (interface de módulo de câmera digital).** Interface paralela para conectar um sensor de imagem compatível.
* **FreeIO** — Recurso flexível da SiFli para atribuição de GPIOs, que permite mapear sinais compatíveis a GPIOs adequados dentro das restrições documentadas do dispositivo.
* **PTM** — **Peripheral Task Machine (máquina de tarefas de periféricos).** Recurso de hardware da SiFli para o processamento determinístico de tarefas periféricas nos dispositivos compatíveis.
* **RTC** — **Real-Time Clock (relógio de tempo real).** Periférico de temporização que pode continuar funcionando ou despertar o sistema de forma independente dos domínios de clock principais da aplicação.

## Hardware e fabricação { #hardware-and-manufacturing }

* **QFN** — **Quad Flat No-lead package (encapsulamento plano quadrado sem terminais).** Tipo de encapsulamento usado nos componentes SF32, identificado pelo número de pinos e pelas dimensões do corpo, por exemplo, QFN68.
* **BGA** — **Ball Grid Array package (encapsulamento em matriz de esferas).** Encapsulamento com esferas de solda na parte inferior do componente. Permite formato compacto e maior quantidade de pinos, mas exige roteamento de escape de PCB e montagem compatíveis com BGA.
* **BOM** — **Bill of Materials (lista de materiais).** Relação formal e detalhada de componentes, passivos e peças mecânicas necessários para fabricar uma placa de circuito impresso montada (PCBA). Reduzir a complexidade da BOM é um dos motivos importantes para preferir componentes e módulos recomendados pela SiFli.
* **EDA** — **Electronic Design Automation (automação de projeto eletrônico).** Categoria de software para captura de esquemáticos, simulação SPICE e layout de PCB. Consulte a [página de bibliotecas de ferramentas EDA](../hardware/cad-components/eda-tool-libraries.md) para footprints e símbolos específicos do SF32.
* **AVL** — **Approved Vendor List (lista de fornecedores aprovados).** Lista da SiFli de componentes qualificados de segunda fonte (cristais, reguladores, Flash etc.), verificados em relação às tolerâncias elétricas dos projetos de hardware SF32. Consulte a [página da lista de fornecedores aprovados](../hardware/cad-components/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board (placa de avaliação).** Placa de referência ou desenvolvimento SF32 fornecida pela SiFli para colocar o projeto em funcionamento e validá-lo antes de haver hardware personalizado.
* **FAE** — **Field Application Engineer (engenheiro de aplicações de campo).** Contato de suporte técnico da SiFli para dúvidas de projeto de hardware que vão além do que a documentação pública cobre.

## Software e ferramentas { #software-and-tools }

* **SiFli-SDK** — Kit principal de desenvolvimento de firmware da SiFli para componentes SF32 e SDK de referência/do fornecedor usado como base para a maioria dos firmwares de produção.
* **SiFli CodeKit** — Extensão do VS Code para desenvolvimento com SiFli-SDK. Orienta a criação e configuração de projetos, compilação, gravação e monitoramento sem exigir o uso direto da toolchain de linha de comando.
* **RTOS** — **Real-Time Operating System (sistema operacional de tempo real).** Categoria de sistema operacional com escalonamento determinístico e baixa sobrecarga, usada normalmente pelo firmware SF32 por meio da integração RTOS do SiFli-SDK ou do Zephyr.
* **sftool** — Utilitário de linha de comando da SiFli para gravação e recuperação de placas SF32, inclusive a recuperação de placas que não inicializam.
