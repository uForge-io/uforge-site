---
icon: lucide/brain-circuit
title: "Visão geral de IA"
description: "Como desenvolver IA embarcada em dispositivos SF32: seleção do dispositivo, uso do HAL NNACC, planejamento da memória e agendamento de inferências dentro do orçamento de energia."
tags:
  - IA
---

# Visão geral { #ai-overview }

## Visão geral { #overview }

Esta página explica como implementar IA embarcada no SF32: escolher o dispositivo, preparar o modelo para o caminho de execução previsto, planejar a memória e agendar inferências dentro do orçamento de energia do produto. Ela pressupõe que você conhece os fundamentos de hardware apresentados em [Acelerador de IA](accelerator.md). Se quiser conhecer primeiro o papel e os limites do acelerador, leia esse artigo antes.

O SDK expõe operações aceleradas pelo HAL **NNACC** (acelerador de redes neurais), com exemplos separados do [HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/hal/nnacc/README_EN.md) e do [driver RT-Thread](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/rt_device/nnacc/README_EN.md). Esses exemplos validam uma operação individual de convolução depthwise (por canal), não a implantação completa de um modelo treinado. Use-os para confirmar o funcionamento de uma operação isolada; escolha e verifique separadamente o runtime do modelo, as ferramentas de conversão e o mapeamento das camadas.

Os detalhes de implementação citados abaixo são específicos do SDK v2.5.1. Nem esses detalhes nem a disponibilidade de NNACC por família garantem suporte a um componente específico, a um runtime ou conversor de modelos completos, à compatibilidade de operadores, ao fallback automático para a CPU ou à entrada de câmera. Verifique esses pontos com a revisão e a configuração exatas do SDK, a revisão do chip, o runtime e a placa.

Use esta página quando você for responsável pelas decisões de produto e pelo caminho de implantação de um recurso de IA: o que o dispositivo deve decidir localmente, quanta memória e energia pode consumir e como deve se comportar diante de dados reais dos sensores. Ela complementa o artigo sobre o acelerador, que explica os limites do hardware.

## Defina o que o produto precisa decidir localmente { #define-what-the-product-needs-to-decide-locally }

Comece pela decisão que o produto precisa tomar, não pelo modelo:

- O que o dispositivo precisa classificar ou detectar por conta própria, sem depender de uma troca de dados com o celular ou a nuvem?
- Quais sensores fornecem os dados para essa decisão: movimento, áudio, sinais biométricos, câmera ou uma combinação deles?
- Com que frequência a decisão precisa ser calculada e em quanto tempo deve haver uma resposta?
- O que acontece se o modelo embarcado errar? O que custa mais: um falso positivo ou um falso negativo?
- O modelo precisará ser atualizado em campo? Se sim, como?

As respostas orientam todas as decisões seguintes: tamanho do modelo, orçamento de memória, seleção do dispositivo e por quanto tempo o sistema pode permanecer em repouso entre inferências.

## Escolha o dispositivo SF32 adequado { #pick-the-right-sf32-device }

Nem todos os dispositivos SF32 são voltados aos mesmos tipos de carga de trabalho de IA:

<div align="center"><em>Tabela: Escolha do dispositivo SF32</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Requisito | Direção típica para a escolha do dispositivo |
|:------------|:-------------------------|
| Classificação leve e ocasional em um produto com custo otimizado | SF32LB52x: mantenha o modelo pequeno e priorize o processamento pela CPU. |
| Dispositivo vestível BLE com requisitos básicos de fusão de sensores | SF32LB55x |
| Pipeline mais avançada de sensores ou multimídia junto com a interface de usuário | SF32LB56x |
| IA de borda como recurso principal: modelos maiores, entrada de câmera se houver suporte no dispositivo escolhido ou requisitos rigorosos de latência | SF32LB58x |

</div>

Use a tabela como ponto de partida para a avaliação, não como garantia de que o modelo caberá na memória ou executará com eficiência. Confira a memória, as interfaces dos sensores, a instância do acelerador e o suporte do SDK do componente escolhido para a carga completa. O [guia NNACC do SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) indica um acelerador na HCPU dos SF32LB55x/56x e aceleradores separados na HCPU e na LCPU do SF32LB58x. O guia não estabelece a disponibilidade de NNACC no SF32LB52x nem no SF32LB57x; trate essas famílias como não documentadas aqui, e não como prova de que não têm NNACC. A quantidade de instâncias não comprova compatibilidade do modelo nem eficiência energética. Consulte [Posicionamento das famílias de dispositivos](accelerator.md#device-family-positioning) para o contexto de seleção.

## Fluxo de desenvolvimento do modelo { #the-model-development-workflow }

Na prática, levar um modelo ao hardware SF32 segue etapas semelhantes, independentemente do caso de uso:

1. **Treine ou selecione um modelo** em uma estação de trabalho, usando dados que representem o que o sensor realmente encontrará em campo. Dados limpos de laboratório muitas vezes se comportam de forma bem diferente de sinais ruidosos coletados em situações reais.
2. **Reduza o modelo para atender às restrições de sistemas embarcados**, escolhendo a arquitetura, aplicando poda ou quantização, antes de se preocupar com a conversão específica do acelerador.
3. **Exporte o modelo e mapeie as operações** para o runtime de inferência escolhido e para os operadores, layouts e formatos numéricos realmente aceitos pelo SDK de destino. O HAL NNACC, por si só, não fornece um conversor de modelos completos nem um runtime de grafos.
4. **Valide numericamente** o modelo após a conversão e a quantização; não presuma que a precisão obtida no computador será mantida sem alterações.
5. **Integre** o pré-processamento, a inferência e o pós-processamento ao firmware. O modelo é apenas uma chamada de função dentro de uma pipeline maior.
6. **Avalie** latência, memória, consumo de energia e precisão em hardware real, não apenas em simulação.
7. **Teste sob uma carga combinada realista**: Bluetooth, display e sensores ativos ao mesmo tempo que a inferência, em vez de testar cada um isoladamente.

Um erro comum de integração é otimizar o modelo sem medir o pré-processamento, os buffers e o pós-processamento. Essas etapas podem custar tanto quanto a inferência acelerada; por isso, avalie o caminho completo.

## Defina o contrato de execução { #define-the-runtime-contract }

Antes de converter o modelo, documente os requisitos exatos que o firmware precisa cumprir durante a execução:

<div align="center"><em>Tabela: Contrato de execução do modelo</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Item do contrato | Decisão a ser definida |
|:--------------|:----------------------|
| Formato da entrada | Janela de amostragem, tamanho da imagem, número de canais e layout dos tensores. |
| Formato numérico | Largura dos inteiros, tratamento da escala e do zero-point, conjunto de dados para calibração. |
| Conjunto de operadores | Camadas que precisam executar no NNACC e camadas que podem recorrer à CPU. |
| Meta de latência | Latência de ponta a ponta da pipeline, não apenas o tempo gasto no acelerador. |
| Limite de memória | Pesos, ativações, tensores de entrada/saída e buffers de pré/pós-processamento. |
| Política de atualização | Se o modelo pode ser atualizado por OTA e como a atualização será validada. |

</div>

Esse contrato deve ser revisado pelos responsáveis por machine learning e firmware. Se a forma dos tensores, o formato ou o conjunto de operadores do modelo mudar sem que o firmware seja atualizado, o problema pode aparecer como baixa precisão ou latência instável, em vez de um erro claro durante a compilação.

## Revise os operadores e as alternativas de execução { #operator-and-fallback-review }

Antes de escolher o modelo, revise cada operador, seus parâmetros e o caminho real de execução. Uma implementação pela CPU ou uma alternativa automática precisa ser explicitamente fornecida pelo runtime escolhido; uma operação incompatível também pode impedir a implantação. Mesmo um modelo pequeno pode ser lento se executar camadas frequentes na CPU ou exigir conversões repetidas de layout.

<div align="center"><em>Tabela: Revisão dos operadores e alternativas de execução</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Classe | Significado | Ação |
|:------|:--------|:-------|
| Acelerado | Compatível diretamente com o caminho NNACC do dispositivo escolhido. | Priorize para camadas executadas com frequência. |
| Alternativa pela CPU | O runtime escolhido ou o firmware fornece uma implementação pela CPU já verificada. | Meça o custo; aceite somente se a pipeline completa cumprir suas metas. |
| Requer conversão | Exige conversão de layout, tipo ou formato. | Inclua o custo da conversão no orçamento de latência e energia. |
| Não compatível | Indisponível no runtime de destino. | Substitua a camada ou altere a arquitetura do modelo. |

</div>

O critério de aprovação não é “o modelo executa”. É “a pipeline completa atende às metas de precisão, latência, memória e energia usando a mesma distribuição de dados que o produto encontrará em campo”.

## Quantização e orçamento de memória { #quantization-and-memory-budgeting }

Modelos compactos e quantizados são comuns em IA para microcontroladores, muitas vezes com inteiros de 8 bits em vez de ponto flutuante. Escolha o formato numérico aceito pelo caminho real de execução. Antes de definir a arquitetura, planeje memória para todos os itens a seguir, não apenas para os pesos:

<div align="center"><em>Tabela: Quantização e orçamento de memória</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Consumidor de memória | Observações |
|:------------------|:------|
| Pesos do modelo | A quantização os reduz significativamente, mas eles ainda compõem a memória básica necessária. |
| Tensores de entrada | Dimensionados pela janela do sensor, resolução da imagem ou duração do quadro de áudio. |
| Ativações intermediárias | Fáceis de subestimar; em algumas arquiteturas, podem ocupar mais memória que os pesos. |
| Tensores de saída | Geralmente pequenos, mas também devem entrar no orçamento. |
| Buffers de pré/pós-processamento | Filtragem, organização em quadros, extração de características e aplicação de limiares exigem memória de trabalho. |
| Memória do sistema usada simultaneamente | Os buffers da interface, do Bluetooth e do áudio disputam a mesma SRAM/PSRAM ao mesmo tempo. |

</div>

A quantização pode reduzir o custo de memória e processamento, mas confira novamente a precisão após a conversão com dados representativos dos sensores. O guia do SDK v2.5.1 documenta aceleração para `arm_convolve_1x1_HWC_q7_fast_nonsquare`, `arm_convolve_HWC_q7_basic_nonsquare` e `arm_depthwise_separable_conv_HWC_q7_nonsquare`. A [configuração do HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) usa buffers de 8 bits e deslocamentos para bias e saída; isso não comprova compatibilidade direta com os zero-points e as escalas por canal de qualquer modelo int8 moderno. Verifique a equivalência numérica e defina, para cada camada incompatível, uma implementação pela CPU, uma conversão ou a rejeição da implantação.

## Posicionamento de buffers e hierarquia de memória { #buffer-placement-and-the-memory-hierarchy }

A largura de banda da memória pode limitar o desempenho da IA mesmo quando há capacidade de processamento disponível. Em dispositivos SF32 com SRAM, Flash, PSRAM e caches de instruções/dados do STAR-MC1, verifique a acessibilidade da memória e o custo de posicionar os buffers:

- Coloque tensores e buffers intermediários usados com frequência em memória acessível à CPU e à instância escolhida do acelerador, respeitando alinhamento e layout.
- Mantenha pesos grandes ou recursos pouco usados em memória externa somente se o caminho de execução aceitar essa localização. Inclua eventuais cópias para memória acessível ao acelerador nos orçamentos de memória, latência e energia.
- Durante uma transferência, apenas a CPU ou o acelerador/DMA deve controlar o buffer compartilhado. Antes do acesso pelo hardware, prepare todo o intervalo alinhado às linhas de cache: limpe as linhas de cache que contêm dados de entrada gravados pela CPU e trate as linhas modificadas do buffer de saída conforme as regras do SDK para escritas de dispositivos. Aguarde a conclusão antes de invalidar a saída e devolver o controle à CPU. Não altere o buffer nem outros dados que compartilhem suas linhas de cache enquanto o hardware o utiliza.

A [implementação do HAL v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) verifica se os buffers atravessam limites de janelas de endereços de 1 MiB (1.048.576 bytes) e exige que entrada e bias estejam na mesma janela. Confira os endereços realmente alocados, não apenas o total de memória livre. O início bloqueante espera a conclusão por polling; o caminho por interrupção exige tratamento correto da IRQ e notificação de conclusão. Verifique os valores de retorno e defina recuperação de falhas e esperas limitadas na aplicação, sem presumir que o runtime do modelo forneça um timeout.

Consulte [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization) para ver considerações sobre cache e sistema de memória nesse tipo de padrão de acesso misto.

## Planilha de dimensionamento da memória { #memory-sizing-worksheet }

Antes de integrar o firmware, preencha uma planilha de dimensionamento da memória com valores de pior caso, não com estimativas médias:

<div align="center"><em>Tabela: Planilha de dimensionamento da memória</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Buffer | Fator que determina o tamanho | Posicionamento recomendado |
|:-------|:------------|:---------------------|
| Janela de entrada bruta | Taxa de amostragem × canais × duração da janela × bytes por amostra, mais preenchimento do layout | Memória acessível por DMA se um periférico fizer a captura. |
| Área de trabalho do pré-processamento | Filtros, FFT/MFCC, normalização, redimensionamento/recorte | SRAM rápida, se reutilizada em todas as inferências. |
| Pesos do modelo | Tamanho do modelo quantizado | Flash/PSRAM, se houver suporte; reserve a SRAM para as partes mais acessadas. |
| Ativações | Maiores tensores intermediários | Memória rápida acessível ao acelerador. |
| Saída/pós-processamento | Classes, caixas, pontuações e estado de suavização | SRAM; geralmente ocupa pouco, mas é sensível à latência. |
| Buffers de coexistência | Áudio, display, Bluetooth e logs | Planeje o uso simultâneo; não deixe para calcular depois que a IA “couber”. |

</div>

Reserve espaço também para stack, heap, objetos do RTOS, logs e OTA. Um modelo que só cabe quando todos os outros subsistemas estão desativados ainda não está pronto para um produto.

## Monte a pipeline completa { #building-the-full-pipeline }

O acelerador é uma etapa da pipeline que vai do sensor à decisão. A seguir são descritos três caminhos de entrada comuns.

### Áudio e voz { #audio-and-voice }

Detecção de palavras-chave, gatilhos por palavra de ativação e classificação de eventos de áudio precisam de captura pelo microfone, organização em quadros e extração de características antes mesmo do início da inferência. Consulte a [Visão geral de áudio](../audio/overview.md) para entender a captura e o uso de buffers nessa pipeline. O acelerador só ajuda se o áudio que recebe for capturado e armazenado em buffer com eficiência.

### Movimento e fusão de sensores { #motion-and-sensor-fusion }

Reconhecimento de gestos, classificação de atividades e análise biométrica normalmente usam dados do acelerômetro, giroscópio ou outros sensores. Meça separadamente o funcionamento dos sensores, a captura, o pré-processamento e a inferência antes de decidir o que domina o consumo. Agrupar amostras e capturar por interrupções pode reduzir despertares se a latência e a cobertura dos sinais permitirem; o benefício não supera necessariamente o custo do modelo. Consulte a [Visão geral de baixo consumo](../low-power/overview.md#ai-and-sensor-power-tuning).

### Câmera e entrada de imagem { #camera-and-image-input }

A entrada de câmera pode impor custos elevados de captura, buffers, largura de banda e inferência. A carga real depende da resolução, taxa de quadros, funcionamento do sensor e arquitetura do modelo. Se a precisão permitir, reduza a imagem ou processe uma região de interesse. Escolha um modelo para restrições embarcadas, sem presumir que um modelo de visão para computadores possa ser implantado sem alterações.

## Agendamento de inferências com foco no consumo de energia { #power-aware-inference-scheduling }

Escolha o agendamento para cumprir a cobertura de detecção e o tempo de resposta exigidos. A inferência periódica é válida quando o produto precisa de decisões regulares; condicionar a execução a eventos só é útil se isso não deixar passar sinais necessários.

- Quando adequado, inicie a inferência com dados novos e úteis, como um limiar de sensor ou um quadro completo de áudio. Mantenha o processamento periódico quando necessário e verifique falsos negativos e o pior tempo de resposta após mudar o gatilho.
- Agrupe amostras quando os requisitos de latência permitirem, em vez de executar muitas inferências pequenas.
- Se o dispositivo e o SDK oferecerem suporte, transfira a detecção leve e contínua para o processador de baixo consumo, evitando despertar a CPU principal da aplicação a cada amostra.
- Meça a **energia por inferência** integrando a potência de alimentação medida (tensão de alimentação × corrente) durante um intervalo definido. Inclua captura, pré/pós-processamento e transições entre atividade e repouso no orçamento do recurso. Processar mais rápido pode reduzir a energia ativa ou permitir repouso antecipado, mas o benefício depende da corrente, do tráfego de memória e do restante do sistema.

As orientações completas sobre consumo de energia do sistema estão na [Visão geral de baixo consumo](../low-power/overview.md). Consulte esse artigo como complemento ao projetar um recurso de IA que precise funcionar continuamente ou quase continuamente.

## Equilíbrio entre precisão, latência e consumo de energia { #the-accuracy-latency-power-tradeoff }

Os itens abaixo descrevem impactos comuns no projeto, não relações fixas. Meça a precisão real do modelo e a energia da pipeline completa ao fazer essas escolhas:

<div align="center"><em>Tabela: Equilíbrio entre precisão, latência e consumo de energia</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Prioridade | Impacto típico no projeto |
|:---------|:--------------------------|
| Maior precisão | Modelo maior, mais características de entrada, janela mais longa e mais memória. |
| Menor latência | Janelas de captura mais curtas, execução mais rápida ou decisões mais frequentes; verifique os efeitos sobre precisão e energia. |
| Menor consumo | Inferências menos frequentes, modelo compacto, posicionamento eficiente na memória e períodos mais longos de repouso entre execuções. |

</div>

Antes de fazer ajustes, decida qual objetivo o produto realmente precisa priorizar. Um detector de gestos muitas vezes pode aceitar um pequeno aumento na latência para prolongar a autonomia da bateria; já um gatilho por voz costuma exigir resposta rápida e também precisa evitar falsos despertares que desperdiçam energia.

## Atualização do modelo e validação em campo { #model-update-and-field-validation }

Se o recurso de IA puder ser aprimorado após o lançamento, planeje desde cedo o suporte à atualização do modelo:

- Quando possível, versione o modelo separadamente do firmware e registre no pacote do modelo os requisitos esperados para os dados de entrada.
- Verifique autenticidade, integridade e compatibilidade do pacote com o runtime e a entrada antes da ativação. A ativação deve tolerar atualizações interrompidas e permitir voltar a uma versão comprovadamente funcional se a validação de inicialização falhar.
- Armazene dados de calibração, limiares e constantes de pós-processamento junto com a versão do modelo que depende deles.
- Registre estatísticas de campo suficientes para diagnosticar desvios, sem armazenar desnecessariamente dados brutos e privados dos sensores.
- Repita os testes de energia e coexistência após cada atualização do modelo. Um ganho de precisão ainda pode representar uma regressão do produto se fizer o sistema despertar com mais frequência.

## Depuração do desempenho e da precisão de IA { #debugging-ai-performance-and-accuracy }

<div align="center"><em>Tabela: Depuração do desempenho e da precisão de IA</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Sintoma | Possível causa a verificar |
|:--------|:----------------------|
| O modelo executa, mas a precisão cai em relação aos resultados no computador | Incompatibilidade na quantização ou calibração, ou dados de treinamento que não representam o ruído real dos sensores. |
| A inferência é mais lenta que o esperado | Execução real de camadas na CPU, conversão de layout, largura de banda de memória ou disputa no agendamento. |
| O sistema nunca alcança o nível de repouso esperado | Despertares desnecessários, drivers/clocks ativos, bloqueios de gerenciamento de energia ou uma operação do acelerador ainda não concluída. |
| O recurso funciona isoladamente, mas falha no produto completo | Não foi testado sob carga combinada, com Bluetooth, display e sensores ativos ao mesmo tempo. |
| Consumo elevado apesar de o modelo ser “rápido” | Mede-se a latência em vez da energia por inferência; o caminho do codec ou do sensor permanece ativo entre execuções. |
| Saída incorreta e intermitente em buffers compartilhados | Preparação das linhas de cache, linhas modificadas, reutilização prematura, falta de conclusão ou acesso simultâneo pela CPU e pelo hardware. |

</div>

## Erros comuns { #common-mistakes }

- Escolher a arquitetura do modelo antes de verificar quais operadores são realmente acelerados pelo runtime de destino.
- Portar um modelo dimensionado para desktop em vez de projetar desde o início para as restrições de sistemas embarcados.
- Ignorar o custo de memória das ativações intermediárias e planejar espaço apenas para os pesos do modelo.
- Executar inferências sem conferir se a frequência e o gatilho cumprem a cobertura de entrada e o tempo de resposta necessários.
- Validar a precisão apenas com dados limpos de laboratório, sem testar ruídos realistas de campo e dos sensores.
- Testar o recurso de IA isoladamente e só descobrir os problemas de coexistência depois da integração completa do produto.
- Otimizar a latência do modelo e ignorar as etapas de pré e pós-processamento ao redor da inferência.

## Checklist de integração inicial { #bring-up-checklist }

- [ ] Defina a decisão local que o produto precisa tomar e o equilíbrio aceitável entre latência, precisão e consumo de energia.
- [ ] Selecione o dispositivo SF32 com base no tamanho do modelo e na memória necessária, não apenas na meta de custo.
- [ ] Construa e valide a pipeline completa (captura -> pré-processamento -> inferência -> pós-processamento), primeiro com um modelo mínimo de teste e depois com o modelo de produção.
- [ ] Converta e quantize o modelo real; em seguida, valide a precisão com dados realistas dos sensores.
- [ ] Planeje em conjunto a memória para pesos, tensores de entrada/saída e ativações intermediárias.
- [ ] Valide o tratamento da coerência de cache em todos os buffers compartilhados entre CPU e acelerador.
- [ ] Valide o agendamento periódico ou por eventos em relação à cobertura de detecção, à pior latência e ao orçamento de energia medido.
- [ ] Avalie a energia por inferência sob carga combinada do sistema, com Bluetooth, display e sensores ativos.
- [ ] Revalide a precisão e o consumo de energia após qualquer mudança na quantização, no modelo ou no agendamento.

## Principais conclusões { #key-takeaways }

- Comece pela decisão que o produto precisa tomar e pelos dados dos sensores, não pela arquitetura do modelo: ele é apenas uma etapa de uma pipeline maior.
- Use o posicionamento das famílias para a seleção inicial e depois verifique o componente, SDK, mapeamento dos operadores, alocação de memória e carga simultânea.
- Planeje a memória para a pipeline completa — pesos, tensores, ativações e buffers de pré/pós-processamento — e não apenas para o tamanho do arquivo do modelo.
- Escolha inferência periódica ou por eventos sem perder a cobertura necessária e meça a energia do recurso completo, sem tratar a velocidade do modelo como um resultado de consumo.
- Valide a precisão com dados realistas de campo e teste o recurso completo sob carga combinada do sistema, não isoladamente.
