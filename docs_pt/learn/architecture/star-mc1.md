---
icon: lucide/cpu
description: "Introdução à CPU STAR-MC1 da Arm China, baseada em Armv8-M Mainline, sua relação de modelo de software com Cortex-M33 e suas implicações para o firmware SF32."
tags:
    - Arquitetura
---
# STAR-MC1 { #star-mc1 }

## Introdução { #introduction }

**STAR-MC1** é uma IP de CPU desenvolvida pela Arm China com base em **Armv8-M Mainline**, o mesmo perfil de arquitetura usado pelo Cortex-M33. Isso torna familiar o modelo de software Armv8-M, mas não garante que o firmware para Cortex-M33 possa ser reutilizado sem alterações. Extensões arquiteturais opcionais, configuração do núcleo, periféricos do SoC, configuração de inicialização e do linker e suporte do SDK podem variar. Trate o software voltado ao Cortex-M33 como ponto de partida para a portabilidade e valide-o com o dispositivo e o SDK de destino.

Nos dispositivos SF32 que usam STAR-MC1, a documentação da SiFli pode identificar a CPU de aplicação como **Arm Cortex-M33**, **Cortex-M33 STAR-MC1** ou simplesmente **STAR-MC1**, conforme o contexto e o nível de detalhe. Essas denominações, por si só, não confirmam os recursos opcionais do núcleo nem a configuração exata do SoC; antes de escolher um componente, verifique a documentação do dispositivo exato.

Leia este artigo se você já conhece a família Arm Cortex-M e precisa entender o posicionamento do STAR-MC1 para desenvolvimento de software, desempenho ou seleção de componentes. O texto explica o que continua familiar, o que pode variar conforme a implementação do SoC e por que o STAR-MC1 não deve ser visto como um substituto direto do Cortex-M7.

Aqui, compatibilidade significa compartilhar o modelo de software arquitetural Armv8-M, não que uma imagem de firmware possa ser substituída diretamente. Antes de reutilizar firmware, confira os recursos do núcleo, as opções do compilador, o código de inicialização, a distribuição de memória definida pelo linker, a atribuição de interrupções, os drivers de periféricos e a configuração de segurança do SoC e SDK de destino.

## Posicionamento para desenvolvedores { #positioning-for-developers }

O modelo mental mais útil **não** é considerar o STAR-MC1 “um processador fixo entre o Cortex-M33 e o Cortex-M7”. O STAR-MC1 é uma IP de CPU **Armv8-M Mainline**, configurável e compatível com Cortex-M33. Seu valor está em combinar o modelo de software familiar dos MCUs com recursos opcionais de memória e aceleração — como cache, memória fortemente acoplada (TCM), instruções DSP, interface de coprocessador e TrustZone — quando implementados no SoC final.

<div align="center"><em>Tabela: posicionamento do STAR-MC1 na família Cortex-M</em></div>

<div align="center" markdown>

| Se você conhece | O que continua familiar no STAR-MC1 | Diferença prática | Não presuma que |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | Desenvolvimento bare-metal e com RTOS, interrupções, DMA e trabalho com drivers de periféricos. | O STAR-MC1 usa o modelo de software Armv8-M, mais recente, e pode oferecer opções mais avançadas de memória e aceleração. | Binários de Cortex-M4, premissas de Armv7E-M ou os mesmos recursos de depuração e segurança se aplicam sem alterações. |
| Cortex-M33 | Modelo de programação, exceções e ferramentas Armv8-M. | A implementação do SoC pode ampliar a margem do sistema de memória para cargas que usam bastante Flash/PSRAM, interface gráfica, áudio ou conectividade. | Todos os componentes baseados em STAR-MC1 têm cache, TCM, DSP, FPU, CDE ou TrustZone habilitados. |
| Cortex-M7 | A necessidade de gerenciar o posicionamento da memória, o comportamento do cache, a coerência com DMA e a latência em tempo real. | O STAR-MC1 mantém uma base Armv8-M da classe MCU e se destina a projetos IoT flexíveis e com foco em eficiência energética. | Ele é um substituto direto do Cortex-M7 ou tem a mesma taxa de transferência, o mesmo sistema de memória e o mesmo ecossistema de software. |

</div>

Em um projeto SF32, escolha o dispositivo pelas características documentadas de memória, periféricos e suporte do SDK, não apenas pelo rótulo STAR-MC1. O material público do STAR-MC1 descreve Armv8-M e apresenta cache, TCM, DSP, interfaces de coprocessador e TrustZone como recursos possíveis. A documentação do SoC deve confirmar quais deles foram implementados e habilitados no produto.

## Por que o STAR-MC1 é importante { #why-star-mc1-matters }

Os MCUs Cortex-M33 tradicionais são excelentes para controle embarcado seguro e de baixo consumo, mas os produtos conectados modernos muitas vezes precisam de mais do que lógica de controle. Dispositivos vestíveis, displays inteligentes, produtos de áudio Bluetooth e dispositivos de IA de borda também podem precisar de interfaces de usuário responsivas, mais memória externa, processamento de sinais e movimentação frequente de dados gráficos ou de áudio.

O STAR-MC1 pode atender a essas cargas com caches, TCM e instruções personalizadas opcionais, quando o SoC implementa esses recursos e o software os utiliza com eficiência. Eles podem reduzir as esperas por memória ou acelerar operações específicas, preservando o modelo de desenvolvimento de MCU. Confirme os ganhos de desempenho e energia no dispositivo final com cargas representativas; o nome do núcleo, por si só, não garante nenhum desses ganhos.

## Comparação da família Cortex-M { #cortex-m-family-comparison }

A tabela a seguir resume o posicionamento do STAR-MC1 entre os processadores Cortex-M mais comuns. Os recursos exatos dependem da implementação final do SoC, mas esse posicionamento ajuda na escolha da arquitetura de um produto.

Para manter a tabela compacta, usamos `CM3`, `CM4`, `CM33`, `CM55` e `CM7` para designar os respectivos processadores Cortex-M.

<div align="center"><em>Tabela: comparação da família Cortex-M</em></div>

<div align="center" markdown>

| Recurso | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Arquitetura Arm | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| Pipeline | 3 estágios, execução em ordem | 3 estágios, execução em ordem | 3 estágios, execução em ordem | Execução em ordem; número de estágios não especificado no TRM público | 4 estágios, execução em ordem; 5 com Helium | 6 estágios, superscalar |
| Interface principal do barramento do sistema | 3 × AMBA AHB-Lite (Harvard) | 3 × AMBA AHB-Lite (Harvard) | 2 interfaces AMBA 5 AHB5: C-AHB + S-AHB | 2 interfaces AMBA 5 AHB5: C-AHB + S-AHB | AMBA 5 AXI5 de 64 bits; interface AHB de 32 bits para periféricos; interface escrava AHB de 64 bits para TCM | AMBA 4 AXI de 64 bits; interface AHB de 32 bits para periféricos; interface escrava AHB de 32 bits para TCM |
| Suporte a TrustZone | Não | Não | Opcional; depende do SoC | Opcional; depende do SoC | Opcional; depende do SoC | Não |
| Instruções DSP | Sem extensão DSP dedicada | Extensão DSP nativa | Extensão DSP opcional | Extensão DSP opcional | Extensão DSP nativa; Helium (MVE) opcional | Extensão DSP nativa |
| Arm Helium (MVE) | Não suportado | Não suportado | Não suportado | Não suportado | Opcional; MVE para inteiros ou ponto flutuante, conforme a configuração | Não suportado |
| Unidade de ponto flutuante | Sem recurso nativo na IP | Precisão simples opcional | Precisão simples opcional | Precisão simples opcional | FP16/FP32/FP64 escalar opcional; FP16/FP32 vetorial opcional | Precisão simples/dupla opcional |
| I-cache / D-cache | Não incluídos na IP do processador; o SoC pode incluir cache fora dessa IP | Não incluídos na IP do processador; o SoC pode incluir cache fora dessa IP | Não incluídos na IP do processador; o SoC pode incluir cache fora dessa IP | Opcionais na IP; presença e configuração dependem da implementação | Opcionais na IP; presença e configuração dependem da implementação | Opcionais na IP; presença e configuração dependem da implementação |
| Instruções personalizadas Arm / CDE | Sem recurso nativo na IP | Sem recurso nativo na IP | Arm define a codificação CDE; o SoC define operações e caminhos de dados personalizados; CDE inteiro opcional, CDE de ponto flutuante depende da FPU/configuração | O TRM do STAR-MC1 descreve os módulos GPR CDE e FPCDE; implementação e disponibilidade no produto dependem da configuração do SoC | Arm define a codificação CDE; o SoC define operações e caminhos de dados personalizados; opcional a partir de r1, indisponível em r0 | Sem recurso nativo na IP |
| Compatibilidade de software | Base | Compatível com CM3 | Modelo de software Armv8-M; requer ferramentas Armv8-M | Compatível com CM33 | Compatível com CM33; Helium requer suporte da cadeia de ferramentas Armv8.1-M | Compatível com CM4 (mesma família Armv7E-M) |
| Valores de referência de CoreMark/MHz* | 3,34 | 3,42 | 4,02 | 4,02† | 4,20 | 5,01 |
| Demanda de potência relativa (qualitativa)‡ | Muito baixa | Baixa | Baixa | Baixa | Média | Alta |
| Perfil de computação (qualitativo) | Controle escalar de baixo consumo | DSP escalar em tempo real | MCU escalar seguro e configurável | CPU escalar compatível com CM33; cache, TCM e instruções personalizadas implementados pelo SoC podem melhorar o desempenho no nível do sistema | DSP/ML vetorial quando Helium está habilitado | Alta taxa de processamento escalar e largura de banda de memória |
| Aplicações típicas sugeridas | Controle de baixa complexidade e nós de sensores simples | Controle de motores, DSP de áudio e processamento de sensores | Dispositivos conectados seguros e controle IoT | Dispositivos vestíveis com interface gráfica rica, áudio Bluetooth e produtos IoT baseados em Flash/PSRAM | Fusão de sensores com ML, voz/áudio, visão e DSP | HMI responsiva, controle de alta taxa de processamento e redes |

</div>

\* Esses valores de referência vêm da [tabela comparativa Cortex-M da Arm, versão 2020](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431). Não são pontuações atuais universais nem uma classificação direta dos SoCs finais: o compilador, o sistema de memória, a configuração do cache e a configuração do benchmark influenciam o resultado.

† Como o STAR-MC1 é compatível com CM33, usamos aqui o valor de referência do CM33. Trata-se de uma base de comparação, não de um resultado do STAR-MC1 publicado pela Arm ou medido.

‡ Este é um guia qualitativo de posicionamento arquitetural, não uma medição de silício. O consumo real depende do processo de fabricação, da tensão, da frequência, da arquitetura de memória, dos recursos habilitados, dos periféricos, do ciclo de atividade do firmware e da implementação final do SoC.

As linhas de pipeline e barramento resumem o pipeline principal de execução e a interface de memória do sistema de cada IP. CM33 e STAR-MC1 compartilham a configuração de barramento C-AHB/S-AHB; cache e outros recursos opcionais de memória são independentes dessa interface, e sua disponibilidade depende da configuração e da implementação do SoC. Isso não significa que essas interfaces estejam habilitadas em todos os SoCs finais. Portas opcionais de depuração, trace, coprocessador e outros recursos não estão listadas.

Referências das IPs de processador: documentação Arm para [CM3](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14), [CM4](https://support.arm.com/compute-ip/cortex-m4), [CM33](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954), [CM55](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5) e [CM7](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf), além do [manual técnico do STAR-MC1](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).

## Aprimoramentos arquiteturais { #architectural-enhancements }

O STAR-MC1 evolui a partir do Cortex-M33, não o substitui. Os principais acréscimos são melhorias de implementação que ajudam o núcleo a passar menos tempo esperando pela memória e mais tempo executando trabalho útil.

### Caches de instruções e de dados { #instruction-and-data-caches }

A disponibilidade e a configuração do cache de instruções (**I-cache**) e do cache de dados (**D-cache**) dependem da implementação do SoC. Quando implementados e habilitados, esses caches são especialmente úteis em sistemas que executam código de Flash externa, acessam PSRAM ou executam pilhas maiores de interface de usuário e middleware.

Os principais benefícios são:

- Busca mais rápida de instruções em memórias que não sejam SRAM.
- Menor latência média de acesso aos dados.
- Melhor desempenho em gráficos, áudio, pilhas de protocolos e frameworks de interface de usuário.
- Menor pressão sobre o barramento de memória quando o mesmo código ou dados são reutilizados.

Para buffers cacheáveis sem garantia de coerência por hardware, os drivers que compartilham memória com DMA, controladores de display, interfaces de áudio ou outros mestres do barramento devem seguir as regras do SDK ou RTOS. Faça o clean dos dados escritos pela CPU antes que um periférico os leia. Prepare os buffers de recepção antes de uma gravação por DMA e invalide as linhas desatualizadas após a conclusão da transferência, antes de a CPU ler o resultado. A CPU não deve acessar um buffer enquanto ele estiver sob controle do DMA. Reserve linhas de cache completas, sem compartilhá-las com dados não relacionados, e respeite as verificações de conclusão e as barreiras de memória da plataforma. Buffers não cacheáveis ou coerentes por hardware também precisam seguir suas próprias regras de sincronização. Veja [PSRAM em comparação com outros tipos de memória para sistemas embarcados](psram-and-memory-types.md#caches-and-external-memory-execution) para os detalhes de controle do buffer e riscos das linhas sujas.

### Extensão de caminho de dados personalizado Armv8-M { #armv8-m-custom-datapath-extension }

No nível da IP, Arm define a codificação das instruções CDE, e o projetista do SoC define as operações e os caminhos de dados personalizados. CM33 oferece CDE inteiro opcional; o CDE de ponto flutuante depende da FPU e da configuração. O TRM do STAR-MC1 descreve os módulos GPR CDE e FPCDE, mas essa descrição da IP não confirma que o CDE esteja disponível em um dispositivo SF32 ou SDK específico. As notas da versão [v2.5.1 do SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1) registram a correção de uma habilitação acidental de CDE no SF32LB57x; confirme o suporte no dispositivo e SDK exatos antes de depender desse recurso. CM55 oferece CDE opcional a partir de r1, mas não em r0. CP0–CP7 são espaços de codificação atribuídos a coprocessadores ou ao CDE; não representam oito instruções personalizadas nem oito aceleradores adicionais. Confirme também a revisão do núcleo, os módulos implementados e o suporte do compilador e do SDK. Consulte a [folha de dados do CM33](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf), as [notas sobre revisões de CDE do CM55](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips) e os capítulos B7/B8 do TRM do STAR-MC1.

Isso pode ser útil em cargas de trabalho como:

- Processamento digital de sinais.
- Criptografia.
- Primitivas de visão computacional.
- Kernels de aprendizado de máquina.
- Cálculos de fusão de sensores.

O CDE não acelera automaticamente todas as aplicações. O software precisa usar o suporte do compilador, bibliotecas ou componentes do SDK do fornecedor que emitam as instruções personalizadas pertinentes. Quando há suporte do SoC e da pilha de software, porém, o CDE oferece um caminho direto para aceleração específica da aplicação, sem transferir a carga para um processador de aplicação separado.

### Otimização do sistema de memória { #memory-system-optimization }

Muitas cargas de trabalho modernas de MCU são limitadas não apenas pela frequência da CPU, mas também pela latência e pela largura de banda da memória. Por isso, o projeto do sistema de memória do STAR-MC1 e os recursos de cache implementados e habilitados pelo SoC são importantes para dispositivos da classe SF32, cujas aplicações podem combinar SRAM interna, Flash no mesmo encapsulamento, PSRAM, buffers de display e DMA de periféricos.

Os maiores ganhos costumam ocorrer quando:

- O código é executado de Flash ou memória externa, em vez de SRAM fortemente acoplada.
- Frameworks de interface de usuário acessam repetidamente dados de imagens, fontes ou layouts.
- Tarefas de áudio, Bluetooth, gráficos e aplicação são executadas ao mesmo tempo.
- O conjunto de trabalho cabe bem no cache.

Laços limitados apenas pela CPU e já executados em SRAM rápida podem apresentar ganhos menores.

## Características de desempenho { #performance-characteristics }

Não se deve afirmar que o STAR-MC1 melhora automaticamente métricas de benchmarks sintéticos pequenos de CPU, como **CoreMark/MHz** ou **DMIPS/MHz**. Esses benchmarks medem principalmente cargas compactas de operações inteiras e muitas vezes são pequenos o suficiente para executar em memória local rápida. Nessa situação, os caches de instruções e de dados podem trazer pouca ou nenhuma melhoria visível em comparação com uma implementação padrão da classe Cortex-M33.

O STAR-MC1 é um núcleo compatível com Cortex-M33, com um subsistema de memória configurável e aceleração opcional para cargas específicas. Esses recursos podem ajudar quando a aplicação é limitada por acessos à memória, latência da Flash ou PSRAM externa, recursos gráficos, pilhas de protocolos ou acessos repetidos a conjuntos grandes de código e dados. O benefício depende dos recursos implementados e de como a aplicação os utiliza.

<div align="center"><em>Tabela: características de desempenho</em></div>

<div align="center" markdown>

| Tipo de carga de trabalho | Benefício esperado do STAR-MC1 | Motivo |
|:--------------|:--------------------------|:----|
| Laços pequenos do tipo CoreMark/DMIPS | Geralmente limitado | O conjunto de trabalho é pequeno e pode já caber na memória rápida. |
| Código executado de Flash ou PSRAM | Costuma melhorar | Quando implementado e habilitado, o I-cache pode reduzir as esperas na busca de instruções. |
| Interface gráfica, gráficos e middleware com uso intenso de dados | Costuma melhorar | Quando implementado e habilitado, o D-cache pode reduzir a latência de acessos repetidos aos dados. |
| Cargas de periféricos com uso intenso de DMA | Depende do projeto de software | Buffers cacheáveis sem coerência por hardware exigem manutenção do cache; todos precisam de controle de posse e sincronização. |
| Rotinas de cálculo que usam CDE | Possível melhoria | Instruções personalizadas podem acelerar operações selecionadas. |

</div>

## O que isso significa para quem desenvolve com SF32 { #what-this-means-for-sf32-developers }

No desenvolvimento de firmware SF32, trate o STAR-MC1 como um processador de aplicação compatível com Cortex-M33. Avalie os recursos de memória e aceleração implementados conforme os requisitos de código, dados e temporização da aplicação.

Na prática:

- Trate o firmware para Cortex-M33 como ponto de partida para portar o código-fonte, não como uma imagem diretamente intercambiável; confirme a configuração do dispositivo e o suporte do SDK antes de reutilizá-lo.
- Os conceitos de RTOS, interrupções, privilégios, TrustZone e depuração continuam familiares para quem desenvolve com Cortex-M.
- Aplicações sensíveis ao desempenho devem posicionar cuidadosamente o código e os dados críticos e usar as APIs de cache e memória do SDK.
- Buffers DMA cacheáveis exigem manutenção explícita do cache quando o hardware não garante a coerência; todos os buffers DMA precisam de controle seguro de posse e sincronização.
- Cargas de trabalho de gráficos, áudio, IA e conectividade se beneficiam mais quando a pilha de software usa com eficiência os aceleradores de hardware e a hierarquia de memória do SoC.

O núcleo não foi projetado para substituir todos os casos de uso do Cortex-M7. Se a aplicação exige a máxima taxa de processamento de um único núcleo e aceita maior consumo, dispositivos da classe Cortex-M7 ainda podem ser adequados. Para produtos conectados alimentados por bateria, no entanto, o STAR-MC1 oferece um equilíbrio útil entre compatibilidade, desempenho e eficiência energética.

## Aplicações adequadas { #good-application-fits }

Dispositivos baseados em STAR-MC1 são candidatos para produtos que precisam acelerar acessos à memória ou operações específicas sem ultrapassar as restrições de consumo e integração de um MCU. Vale avaliá-los especialmente quando a latência de memória importa mais do que a pontuação de um benchmark compacto como CoreMark/DMIPS. Escolha o SoC pelos recursos implementados e pelo desempenho medido com a carga de trabalho desejada, não por uma suposta vantagem sobre qualquer Cortex-M33 convencional.

Exemplos típicos:

- Smartwatches e rastreadores de atividade física.
- Dispositivos de áudio Bluetooth.
- Produtos médicos vestíveis e de monitoramento da saúde.
- Displays inteligentes e sistemas HMI compactos.
- Dispositivos de sensores com IA de borda.
- Produtos que usam LVGL ou outros frameworks de interface de usuário embarcada.
- Dispositivos que executam código de memórias Flash ou PSRAM de grande capacidade.

## Principais conclusões { #key-takeaways }

- O STAR-MC1 é compatível com Cortex-M33 e preserva o modelo de software embarcado Armv8-M familiar.
- Quando o SoC habilita os caches de instruções e de dados, eles podem melhorar o desempenho em aplicações reais, especialmente quando o código e os dados estão fora da SRAM interna rápida.
- O CDE oferece um caminho para aceleração por instruções personalizadas quando há suporte do SoC e da pilha de software.
- O STAR-MC1 combina um modelo de software compatível com CM33 com recursos configuráveis de memória e aceleração; compare os SoCs concretos e as cargas medidas, não apenas os nomes dos núcleos.
- Nos dispositivos SF32 que usam STAR-MC1, o núcleo e os recursos implementados com ele no SoC podem viabilizar aplicações mais avançadas de gráficos, áudio, AIoT e produtos vestíveis, mantendo o modelo de desenvolvimento de MCU.

---

Veja também: [Família SF32](../../sf32-products/family/SF32_family.md) para entender como o STAR-MC1 se posiciona na linha mais ampla de chips SF32LB5x.

Referência principal: [Arm China STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).
