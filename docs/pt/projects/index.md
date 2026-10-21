---
icon: lucide/folder-kanban
title: "Visão geral dos projetos"
description: "Projetos μForge de ponta a ponta que combinam hardware selecionado, uma base de software, evidências de validação e a transição para produção."
tags:
    - Projetos
---

# Visão geral dos projetos { #projects-overview }

Os projetos são referências baseadas em aplicações que você pode duplicar e adaptar para explorar ideias de produtos baseados em SF32. Em vez de demonstrar cada recurso isoladamente, cada projeto reúne um conjunto específico de capacidades SF32 em algo que alguém poderia realmente construir e usar.

## Para que servem os projetos { #what-projects-are-for }

Cada projeto deve ser:

- **Baseado em uma aplicação.** Começa com um comportamento de produto ou caso de uso reconhecível, não com uma demonstração abstrata de recursos.
- **Completo o bastante para ser acompanhado.** Conecta o hardware selecionado, a base de software, as dependências, os marcos de integração, as evidências de validação e um caminho de adaptação, permitindo percorrer uma parte substancial do fluxo de desenvolvimento.
- **Feito para ser duplicado.** Oferece uma base prática para reproduzir primeiro e modificar depois conforme o seu hardware, modelo de interação ou requisitos de produto.
- **Divertido de fazer.** Um projeto deve incentivar a experimentação e mostrar o que as capacidades SF32 permitem criar; aqui, utilidade e diversão andam juntas.

Use um projeto depois de concluir a base correspondente em [Primeiros passos](../getting-started/index.md). [Projetos de referência](../hardware/reference-designs/reference-designs.md) apresentam bases reutilizáveis e jornadas de validação. A página atual sobre dispositivos vestíveis conectados descreve um fluxo de trabalho, não um pacote de placa publicado. Quando houver uma base concreta e aplicável, o projeto deve apontar para ela; caso contrário, deve identificar e validar sua própria base, sem dar a entender que uma jornada de planejamento é um projeto qualificado.

## Projetos com SiFli-SDK { #sifli-sdk-projects }

!!! info "Responsabilidade por projetos de terceiros"
    O [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) é mantido por Xinyuan-LilyGO/LilyGO, não pela SiFli. Consulte o repositório da LilyGO para suporte de hardware e firmware específico da placa e as fontes da SiFli para informações sobre o dispositivo SF32 e o SiFli-SDK.

<div align="center"><em>Tabela: diretório de projetos</em></div>

<div align="center" markdown>

| Projeto | Resultado | Base de hardware e software | Indicado para |
|:--------|:--------|:-------------------------------|:---------|
| [Assistente de voz Xiaozhi para SF32](sf32-xiaozhi.md) | Assistente conectado com voz e display, baseado na implementação de código aberto Xiaozhi SF32. | Placas SF32LB52 compatíveis, código-fonte Xiaozhi SF32, Bluetooth PAN e serviços de nuvem Xiaozhi. | Avaliar um fluxo de produto de interação por voz com IA e adaptar o hardware ou o comportamento da aplicação. |
| [Intercomunicador BLE Talkback para SF32](sf32-ble-talkback.md) | Intercomunicador push-to-talk por BLE entre vários dispositivos, com seleção de função, voz Opus, reconexão dos dispositivos secundários, indicação de estado e operação de baixo consumo. | Duas ou mais placas SF32LB52-DevKit-ULP, versão fixada do código-fonte Talkback, revisão fixada compatível com SiFli-SDK 2.4 e `talk_back/1.2@sifli`. | Qualificar o comportamento de intercomunicação portátil em grupo, acústica, recuperação de RF e consumo antes de desenvolver hardware personalizado. |
| [Leitor de EPUB com e-paper SF32](sf32-epd-reader.md) | Leitor EPUB local com navegação por biblioteca e sumário, entrada por teclas e toque, fontes dinâmicas, atualização total/parcial, armazenamento e estados de baixo consumo. | SF32-OED-EPD V1.1, display e-paper YZC085 V1.05, commits fixados do EPD Reader e do SDK, armazenamento TF, conteúdo e fontes tipográficas qualificados. | Avaliar um terminal de leitura e-paper, limites de EPUB/renderização, formas de onda do painel, recuperação do armazenamento e comportamento de consumo. |
| [Teclado macro multifuncional SuperKey](superkey.md) | Controlador de mesa com três displays, USB HID/CDC, teclas, encoder, sensores, telemetria e aplicativo complementar. | Hardware aberto sf32-keyboard, alvo de firmware `sf32lb52-superkey` e SuperKeyHub. | Avaliar uma HMI de mesa, teclado macro, painel de estado ou superfície de controle conectada a um host. |
| [Radiation Monitor](radiation-monitor.md) | Visualizador portátil de intensidade de sinal em 2,4 GHz com 79 pontos, suavização e reprodução do histórico. | Caminho de teste de RF SF32LB52, display LVGL, controle KEY2 e ambiente controlado para comparação de RF. | Explorar tendências relativas de interferência e decidir se vale desenvolver um caminho com instrumento de RF calibrado. |
| [Console portátil de jogos Pocket Pi SF32](pocket-pi.md) | Console portátil local com emulação de NES, navegador de jogos, entrada, áudio, estados salvos e armazenamento interno/em cartão TF. | Alvo SF32LB52-DevKit-ULP, código-fonte PocketPi/Nofrendo, controles AW9523 e conteúdo NES com uso legal. | Testar cargas de gráficos, entrada, áudio, armazenamento e consumo voltadas a jogos antes de desenvolver hardware personalizado. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | Plataforma de desenvolvimento SF32 de terceiros, centrada no display, com suporte a toque, movimento, armazenamento, áudio, LoRa e gerenciamento de energia. | Hardware LilyGO T-Display-SF32, revisões do repositório da placa e do fork do SDK da LilyGO selecionadas e registradas para a avaliação, e alvo `t-display-sf32_hcpu`. | Avaliar uma base para dispositivos vestíveis, portáteis, terminais de sensores ou HMI mantida pela LilyGO, sem confundi-la com um projeto oficial da SiFli. |

</div>

## Projetos Zephyr { #zephyr-projects }

Este grupo inclui projetos desenvolvidos diretamente sobre o Zephyr ou sobre uma camada derivada do Zephyr documentada, como o ArduinoCore-zephyr da OpenSiFli.

<div align="center"><em>Tabela: diretório de projetos Zephyr</em></div>

<div align="center" markdown>

| Projeto | Resultado | Base de hardware e software | Indicado para |
|:--------|:--------|:-------------------------------|:---------|
| [Port do Arduboy2 para SF32LB52](arduboy2-sifli.md) | Caminho reproduzível para avaliar no SF32LB52 um jogo ou demonstração interativa no estilo Arduboy2. | Código-fonte Arduboy2-SiFli da OpenSiFli, variante ArduinoCore-Zephyr `sf32lb52_devkit_lcd_sf32lb525uc6` e caminho documentado de display, controles e áudio externos. | Testar interação local de jogos, gráficos, entrada, áudio e os limites de uma camada de aplicação portátil orientada ao Arduino. |
| [Firmware de teclado ZMK no SF32](zmk-sf32.md) | Base reproduzível de teclado dividido SF32LB52, com varredura de matriz, camadas, USB HID, links BLE entre metades e host, configurações e ZMK Studio. | OpenSiFli/zmk, variante de placa ZMK SF32LB52-DevKit-LCD e shields `urchin_sf32lb52_left/right` com dependências fixadas no manifesto. | Avaliar teclados sem fio baseados em ZMK, macro pads ou produtos HID personalizados e, ao mesmo tempo, medir a maturidade do port downstream para SF32. |

</div>

## O que cada projeto deve incluir { #what-every-project-includes }

Cada projeto μForge deve documentar o resultado esperado, o público-alvo, as versões de hardware e software compatíveis, os pré-requisitos, o repositório de origem, as etapas de compilação organizadas por marcos, os critérios de validação, as medições e a transição para a adaptação do produto. Um projeto é um ponto de partida para o trabalho de engenharia, não substitui a validação para produção do hardware final, da integração de serviços, da segurança, da privacidade ou dos requisitos regulatórios.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi redigida sem um documento-fonte preexistente. Verifique as afirmações técnicas na documentação oficial da SiFli antes de confiar nelas.
