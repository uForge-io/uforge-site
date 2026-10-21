---
icon: lucide/microchip
description: "Operadores NNACC do SF32, papéis da CPU e do runtime, limites de memória e avaliação de latência e energia em IA embarcada."
tags:
  - IA
---
# Acelerador de IA { #ai-accelerator }

## Introdução { #introduction }

O **acelerador de IA**, chamado NNACC no SDK, executa em hardware operações de redes neurais compatíveis em determinados dispositivos SF32. Ele permite **IA de borda**, com inferência local sem depender de serviços na nuvem. A eventual redução da latência, da ocupação da CPU ou do consumo de energia depende do modelo, do posicionamento na memória, da implementação do software e da carga completa do produto.

Dispositivos vestíveis, dispositivos de monitoramento da saúde, displays inteligentes, acessórios de voz, sistemas de fusão de sensores e produtos AIoT compactos são aplicações possíveis. Esses equipamentos alimentados por bateria costumam combinar Bluetooth, gráficos, áudio, sensoriamento e interação com o usuário. Transferir operações compatíveis para o hardware pode liberar tempo de CPU para outras tarefas, mas a resposta e a economia de energia precisam ser medidas.

Os recursos de IA disponíveis dependem do dispositivo SF32 específico e do suporte do SDK. Antes de definir a arquitetura do modelo ou o planejamento de memória, consulte o datasheet, o manual de referência e a documentação do SDK do chip escolhido.

As informações a seguir sobre as operações CMSIS-NN e a quantidade de recursos NNACC por dispositivo baseiam-se na documentação do SiFli-SDK v2.5.1. O guia de NNACC dessa versão documenta recursos para SF32LB55x/56x/58x, mas não estabelece a disponibilidade em SF32LB52x nem SF32LB57x; essa omissão não comprova que essas famílias não tenham NNACC. As verificações de janelas de endereço, o comportamento de espera e a configuração do GC032A são observações do código HAL ou do driver dessa versão, não garantias universais para todas as revisões de silício ou versões do SDK. O guia e os exemplos NNACC citados não comprovam a existência de um conversor de modelos ou runtime de grafo completo, fallback automático para a CPU nem compatibilidade de captura de câmera em todos os componentes e placas. Antes de fechar o projeto, verifique a revisão e a configuração exatas do SDK, a revisão do chip, o runtime e a placa.

Leia esta página ao avaliar se um recurso de IA local é adequado ao dispositivo SF32 escolhido ou ao dividir uma pipeline de inferência entre sensores, CPU, memória e acelerador. Para conhecer o fluxo de integração e implantação de modelos, comece pela [Visão geral de IA](overview.md).

## Por que a IA embarcada importa { #why-on-device-ai-matters }

Muitos produtos embarcados precisam oferecer recursos inteligentes sem transmitir continuamente dados brutos para um celular ou serviço na nuvem. A IA embarcada pode trazer vários benefícios:

- Potencialmente, menor latência: a inferência local pode evitar a ida e volta até um celular ou serviço na nuvem, mas meça no produto completo a latência entre a captura pelo sensor e a decisão.
- Mais privacidade, porque dados biométricos, de áudio ou movimento podem permanecer no dispositivo.
- Menos tráfego sem fio, porque basta transmitir eventos ou resumos.
- Melhor funcionamento offline, porque os recursos principais podem operar sem acesso à rede.
- A potência média só pode ser menor se a função completa consumir menos energia durante o mesmo intervalo de uso, com precisão e cobertura de detecção equivalentes. Inclua também a sobrecarga de transferir o processamento para o acelerador.

Para dispositivos vestíveis e AIoT, esses benefícios são concretos. Um relógio pode classificar gestos, detectar níveis de atividade, monitorar sinais de saúde, reconhecer comandos simples por voz ou processar dados de sensores sem comprometer a resposta do display, do Bluetooth e do processador de aplicação.

Esses benefícios têm condições. O processamento local só reduz o tráfego sem fio se o produto deixar de enviar dados brutos. A privacidade ainda exige armazenamento adequado, controles de acesso e proteção dos dados transmitidos. Os casos abaixo são possibilidades de projeto, não uma afirmação de que o SDK forneça todos os modelos.

## Posição no sistema SF32 { #position-in-the-sf32-system }

Uma pipeline simplificada de IA de borda no SF32 pode ser representada assim:

<div align="center"><em>Diagrama: Etapas de processamento e inferência controlada pelo firmware</em></div>

```text
Sensors / Audio / Camera
        │
        ▼
Pre-processing
  - filtering
  - framing
  - normalization
  - feature extraction
        │
        ▼
Firmware / Inference Runtime
  - model graph orchestration
  - supported operations on NNACC
  - other operations on CPU, if implemented
        │
        ▼
Post-processing
  - thresholding
  - smoothing
  - event detection
  - application decisions
        │
        ▼
Application, UI, Bluetooth, or Storage
```

O acelerador é apenas uma etapa da pipeline completa de IA. Produtos reais ainda precisam capturar e armazenar dados em buffers, fazer pré-processamento, escalonar inferências, executar o pós-processamento e aplicar a lógica de decisão da aplicação. Em geral, o melhor desempenho vem de projetar toda a pipeline considerando a hierarquia de memória e os aceleradores disponíveis, em vez de tratar a inferência como uma chamada de função isolada.

## O que o acelerador de IA faz { #what-the-ai-accelerator-does }

Os aceleradores de IA são úteis porque muitas cargas de trabalho de redes neurais repetem os mesmos padrões matemáticos milhares ou milhões de vezes. Entre eles estão convoluções, multiplicações de matrizes, operações vetoriais, funções de ativação, pooling e outros cálculos de ponto fixo. O hardware dedicado pode executar algumas dessas operações com mais eficiência energética do que uma CPU de uso geral.

Esses são exemplos de cálculos usados em redes neurais, não uma lista de operações compatíveis com o NNACC do SF32. O [guia de NNACC do SDK SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) documenta a aceleração NNACC de três funções de convolução q7 do CMSIS-NN, incluindo convolução por canal (depthwise convolution), e informa que a implementação CMSIS-NN com NNACC é 8 vezes mais rápida que a implementação ARM DSP do CMSIS-NN. O guia não informa as condições de teste desse valor; considere-o uma comparação divulgada pelo fornecedor, não uma garantia de melhoria na latência ou no consumo de energia do modelo completo. Confira cada operador do modelo e seu formato numérico com a implementação escolhida; não presuma que multiplicação de matrizes, ativação ou pooling tenham aceleração independente. O SDK também oferece APIs HAL para controle direto do acelerador, mas não presuma que qualquer uma dessas interfaces inclua um conversor de modelos completo ou um runtime de grafo. O firmware ou um runtime de inferência separado precisa orquestrar as camadas e gerenciar os buffers; o fallback para CPU também requer uma implementação dos operadores não compatíveis.

Os dispositivos SF32 têm limites de memória e largura de banda, por isso comece com um modelo embarcado compacto. Verifique a disponibilidade do NNACC e o suporte aos operadores para o componente exato; depois meça memória, latência e energia da pipeline completa. Não deduza o suporte apenas pelo nome da família.

Entre as cargas de trabalho comuns de IA estão:

- Detecção de palavras-chave ou de eventos simples de voz.
- Reconhecimento de gestos com base em dados do acelerômetro e do giroscópio.
- Classificação de atividades e detecção de estados de movimento.
- Fusão de sensores em dispositivos vestíveis e de saúde.
- Análise de sinais biométricos, conforme o suporte dos sensores e algoritmos.
- Classificação simples de imagens ou baseada em câmera, em dispositivos com entrada de câmera.
- Detecção de anomalias e filtragem local de eventos.

## Papéis da CPU, do acelerador e da memória { #cpu-accelerator-and-memory-roles }

Uma forma útil de entender a arquitetura é pensar que a CPU controla o fluxo de trabalho, enquanto o acelerador executa determinadas operações de maior custo computacional.

<div align="center"><em>Tabela: Papéis da CPU, do acelerador e da memória</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Componente | Papel típico |
|:----------|:-------------|
| **CPU de aplicação** | Executa a lógica da aplicação, escalona inferências, gerencia buffers e cuida da interface do usuário, do Bluetooth, do armazenamento e das políticas do sistema. |
| **Processador de baixo consumo** | Pode executar tarefas de sensoriamento contínuo ou em segundo plano nos dispositivos em que é programável pelo usuário. |
| **Acelerador de IA** | Executa operações compatíveis com NNACC; compare o tempo de CPU e a energia da pipeline completa com a implementação de referência em software. |
| **DMA / sistema de memória** | Fornece acesso à memória e transferências configuradas; nem toda entrada ou saída do NNACC exige uma cópia DMA separada. |
| **Outros aceleradores** | Blocos de áudio, gráficos, criptografia ou processamento de sensores podem dar suporte à pipeline completa do produto. |

</div>

O acelerador não substitui a CPU nem executa sozinho qualquer modelo. O firmware continua preparando entradas, configurando operações compatíveis, aguardando a conclusão, processando resultados e controlando a aplicação. Uma operação não compatível só pode rodar na CPU se o runtime ou a aplicação fornecer essa implementação; caso contrário, a implantação pode falhar. A presença do hardware não garante fallback automático para a CPU.

## Posicionamento das famílias de dispositivos { #device-family-positioning }

Escolha o dispositivo pelos operadores, pelo orçamento de memória e pela carga do produto completo, não por uma classificação geral de desempenho entre famílias. O guia do SDK v2.5.1 documenta um NNACC no subsistema HCPU do SF32LB55x e outro no do SF32LB56x, além de um em cada subsistema HCPU e LCPU do SF32LB58x. Esses recursos ajudam na seleção, mas não garantem que o modelo completo rode mais rápido ou consuma menos energia. Verifique a disponibilidade, a memória acessível e o suporte de software para o número de peça e a configuração exatos.

<div align="center"><em>Tabela: Posicionamento das famílias de dispositivos</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Família de dispositivos | Perfil para IA |
|:--------------|:---------------|
| **SF32LB52x** | Considere para Bluetooth, áudio e HMI básica com custo otimizado; use uma implementação leve na CPU como referência, salvo quando houver aceleração específica verificada. |
| **SF32LB55x** | Adequado a dispositivos vestíveis BLE e produtos com muitos sensores; indicado para sensoriamento de baixo consumo e algoritmos compactos. |
| **SF32LB56x** | Considere para UI mais completas, HMI conectada e pipelines de sensores ou multimídia; confira a configuração escolhida e os operadores do NNACC da HCPU. |
| **SF32LB57x** | O guia citado não estabelece a disponibilidade de NNACC nessa família; verifique o componente, a placa e o suporte do SDK a operadores, runtime e memória antes de escolhê-lo para IA. |
| **SF32LB58x** | Considere para cargas que combinam IA, gráficos e áudio quando a memória e os recursos HCPU/LCPU do número de peça escolhido atenderem aos requisitos do produto; verifique operadores, custos de integração e energia medida. |

</div>

Esta tabela orienta a seleção do produto, mas não substitui o datasheet. Confirme para o número de peça escolhido a disponibilidade do acelerador, os operadores compatíveis, os limites de memória e as ferramentas do SDK.

## Fluxo de desenvolvimento do modelo { #model-development-flow }

Um fluxo típico de desenvolvimento de IA embarcada tem várias etapas:

1. Treine ou selecione um modelo em uma estação de trabalho usando dados representativos.
2. Ajuste o modelo às restrições embarcadas por meio de seleção, poda, quantização ou alterações na arquitetura.
3. Escolha ou implemente o runtime de inferência e a representação do modelo; depois confira a cobertura de operadores e a compatibilidade numérica com os kernels do SDK escolhidos. Não presuma que a HAL do NNACC inclua um conversor de modelos completos.
4. Valide a precisão numérica após a conversão e a quantização.
5. Integre o pré-processamento, a inferência e o pós-processamento ao firmware.
6. Avalie latência, uso de memória, consumo de energia e precisão no hardware real.
7. Teste cargas reais com Bluetooth, display, áudio e sensores em paralelo, incluindo as transições de entrada e saída dos estados de baixo consumo previstos.

O erro mais comum é otimizar apenas a rede neural e ignorar o restante da pipeline. Em muitos produtos embarcados, pré-processamento, movimentação de dados na memória, temporização dos sensores e pós-processamento podem ser tão importantes quanto o próprio acelerador.

## Quantização e tamanho do modelo { #quantization-and-model-size }

Em microcontroladores, a IA normalmente depende de modelos compactos e formatos numéricos eficientes. Em comparação com modelos de ponto flutuante, modelos quantizados — muitas vezes com dados inteiros de 8 bits — podem reduzir o uso de memória, a largura de banda necessária e o custo computacional.

Um modelo de 8 bits não é automaticamente compatível com NNACC. A [configuração da HAL do SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) usa buffers `int8_t` e os campos `bias_shift` / `out_shift`. Isso não comprova suporte a pontos zero arbitrários, escalas por canal ou todos os operadores int8 atuais. Confira o layout dos tensores, o tratamento do sinal, os deslocamentos e a representação do bias na implementação específica do kernel; depois compare as saídas com uma referência em software usando entradas representativas e valores limite.

A quantização envolve algumas compensações:

- Pode aumentar significativamente a eficiência.
- Pode reduzir o tamanho do modelo e a memória ocupada pelos tensores.
- Pode reduzir a precisão se o modelo não for treinado ou calibrado com cuidado.
- Alguns operadores podem não ser mapeados adequadamente para o acelerador ou o runtime.

Para uso em produção, meça a precisão e o desempenho do sistema após a conversão. Um modelo que funciona bem no ambiente de treinamento em um computador pode se comportar de outra forma após a quantização, diante de ruídos reais dos sensores e com o pré-processamento embarcado.

## Considerações sobre memória e largura de banda { #memory-and-bandwidth-considerations }

As cargas de trabalho de IA podem exigir muita memória, mesmo quando o modelo parece pequeno. O sistema talvez precise de espaço para:

- Pesos do modelo.
- Tensores de entrada.
- Buffers de ativações intermediárias.
- Tensores de saída.
- Quadros de áudio, janelas de dados dos sensores ou quadros de câmera.
- Buffers de pré e pós-processamento.
- Dados da interface, do Bluetooth e da aplicação em execução simultânea.

Conforme a configuração de SRAM interna, Flash, PSRAM e cache do dispositivo escolhido, coloque tensores acessados com frequência e buffers intermediários onde CPU e acelerador consigam acessá-los com eficiência. Planeje armazenamento externo, buffers de trabalho e cópias em conjunto, em vez de otimizar apenas o tamanho do modelo.

Primeiro confirme que o NNACC escolhido consegue acessar cada buffer; dados em Flash ou PSRAM externas podem precisar de cópias para buffers de trabalho. Inclua tempo de cópia, RAM de trabalho e energia no orçamento. A [implementação da HAL do SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) arredonda os tamanhos verificados para múltiplos de 4 bytes e rejeita um buffer quando seu início e seu fim verificado ficam em janelas de endereços diferentes de 1 MiB (1.048.576 bytes). Entrada e bias também precisam compartilhar a mesma janela. Um fim exatamente no limite da próxima janela também falha nessa verificação. Planeje as alocações conforme essas regras e trate os erros retornados antes de iniciar a próxima operação.

Quando a CPU compartilhar buffers com DMA ou NNACC, atribua acesso exclusivo durante cada transferência ou operação. Faça o clean das entradas escritas pela CPU antes que o hardware as leia. Prepare as linhas de cache do destino conforme o SDK antes da escrita pelo hardware, para impedir que linhas sujas da CPU sobrescrevam o resultado depois. Após confirmar a conclusão do hardware, invalide as cópias antigas da CPU antes de ler a saída. Alinhe os intervalos de manutenção a linhas de cache completas e evite compartilhá-las com outros dados em uso. Fazer clean de uma cópia antiga da saída após a escrita pelo hardware pode destruir o resultado; clean e invalidate não são intercambiáveis.

## Pipelines de áudio, sensores e câmera { #audio-sensor-and-camera-pipelines }

A aceleração de IA raramente funciona isoladamente. Em geral, ela faz parte de uma pipeline de sensores, áudio ou câmera.

### Áudio e voz { #audio-and-voice }

A detecção de voz ou eventos de áudio pode incluir entrada do microfone, buffers DMA, divisão em quadros, filtragem, extração de características, inferência e suavização dos resultados. O NNACC executa operações neurais compatíveis; o firmware ou runtime escolhido processa o restante do grafo, enquanto a CPU ou o subsistema de áudio gerencia amostras e características. O modelo e uma implementação de software validada continuam necessários.

Exemplos típicos:

- Detecção de palavras-chave.
- Gatilhos por palavra de ativação, conforme o suporte do software.
- Classificação de cenas ou eventos de áudio.
- Detecção de atividade de voz.

### Movimento e fusão de sensores { #motion-and-sensor-fusion }

Em produtos vestíveis, os dados podem vir de acelerômetros, giroscópios, sensores de frequência cardíaca, sensores de SpO2, front-ends de ECG ou outros periféricos. A IA pode classificar estados de movimento, gestos, padrões de atividade ou características de sinais relacionados à saúde.

Agrupe amostras e use interrupções quando a cobertura de detecção e a latência exigidas permitirem. Transferir tarefas de fundo adequadas para um processador de baixo consumo programável pelo usuário pode reduzir os despertares da CPU de aplicação. Porém, inclua a atividade desse processador, a amostragem e os custos de despertar na comparação. Não desligue a aquisição necessária para detectar o evento.

### Câmera e entrada de imagem { #camera-and-image-input }

A entrada de câmera depende do chip, encapsulamento, placa e driver de captura específicos. O [driver do sensor GC032A do SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/customer/peripherals/camera/gc032a/drv_gc032a.c) configura saída DVP de 8 bits ou SPI de dois bits; isso não comprova que ambas as rotas de captura funcionem em todos os dispositivos SF32. Antes de escolher a câmera, confira pinos, suporte de captura por periféricos ou PTM, temporização do sensor e driver. Imagens geralmente exigem buffers e largura de banda maiores que áudio ou movimento, mas compare as resoluções e taxas reais.

Considere quadros menores, regiões de interesse, taxas de quadros menores ou um modelo voltado a sistemas embarcados. Recortar no firmware após a captura reduz a entrada do modelo, mas não necessariamente o tráfego da câmera ou o buffer de captura; para reduzir esses custos, pode ser necessário recortar no sensor ou adquirir menos dados.

## Escalonamento e gerenciamento de energia { #scheduling-and-power-management }

As tarefas de IA devem ser escalonadas considerando o restante do sistema. Um produto vestível pode precisar manter a conexão Bluetooth, atualizar o display, capturar áudio, ler sensores e executar inferências sem ultrapassar as metas de consumo de energia ou latência.

Boas práticas de escalonamento:

- Escolha inferência periódica ou acionada por eventos conforme a cobertura de detecção, o risco de perder eventos e os requisitos de latência.
- Evite loops de polling quando interrupções ou eventos puderem acionar o processamento.
- Agrupe amostras dos sensores quando os requisitos de latência permitirem.
- Limite a latência da entrada até a decisão sem encurtar a janela necessária para uma detecção confiável.
- Coordene as cargas de trabalho de IA com a atividade do display e do Bluetooth.
- Retorne a CPU e o acelerador aos estados de baixo consumo permitidos após confirmar a conclusão, transferir os buffers e liberar os bloqueios de gerenciamento de energia; mantenha ativos o sensoriamento necessário e outros trabalhos pendentes.

Meça a energia do recurso completo integrando, ao longo do tempo, a potência de alimentação medida (tensão de alimentação × corrente); não considere apenas a latência de inferência. Inclua aquisição, pré-processamento, cópias, aceleração, fallback para a CPU, pós-processamento e intervalos ociosos. Executar mais rápido pode reduzir a energia ativa sem antecipar o repouso; a economia depende das demais cargas do sistema. Compare cobertura de detecção e precisão equivalentes antes de reduzir a frequência de inferência.

No SDK v2.5.1, a chamada de início bloqueante da HAL espera a conclusão por polling, sem um timeout explícito próprio. O modo por interrupção exige um handler IRQ funcional e notificação de conclusão. Confira os erros de início, limite a espera na aplicação e defina a recuperação antes de reutilizar buffers ou liberar bloqueios de gerenciamento de energia.

## Equilíbrio entre precisão, latência e consumo de energia { #accuracy-latency-and-power-tradeoffs }

O projeto de IA embarcada exige equilibrar três objetivos: precisão, latência e consumo de energia.

<div align="center"><em>Tabela: Equilíbrio entre precisão, latência e consumo de energia</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Objetivo | Impacto típico no projeto |
|:-----|:------------------------|
| Maior precisão | Pode exigir modelo maior, mais características ou janela de entrada mais longa; valide o ganho real de precisão e o custo de memória. |
| Menor latência | Reduza atrasos de aquisição, espera e cálculo. Janelas menores podem prejudicar a precisão; uma taxa de inferência maior pode aumentar a energia. |
| Menor consumo | Use modelos compactos e posicionamento eficiente; reduza a frequência apenas se a cobertura de detecção permitir e confira as políticas de aquisição e repouso. |

</div>

O equilíbrio ideal depende do produto. Um detector de gestos pode tolerar um pequeno atraso se isso economizar energia. Um gatilho por voz pode exigir resposta rápida, mas deve evitar falsos despertares. Já um algoritmo de monitoramento da saúde pode priorizar robustez e longa autonomia da bateria em vez de classificação imediata.

## Orientações práticas de projeto { #practical-design-guidance }

Ao planejar um produto de IA com SF32, comece pelo comportamento esperado do produto, não pelo modelo:

- Que decisão o dispositivo precisa tomar localmente?
- Quais sensores fornecem os dados de entrada?
- Com que frequência a inferência precisa ser executada?
- Qual latência é aceitável?
- Qual é o orçamento máximo de memória para os pesos e tensores do modelo?
- É possível quantizar o modelo sem perder precisão demais?
- Quais operações são aceleradas pelo chip e pelo SDK escolhidos?
- O que acontece quando Bluetooth, display, áudio e inferência estão ativos ao mesmo tempo?
- Como a precisão do modelo será validada com dados reais do produto?
- Se necessário, como o firmware atualizará ou substituirá o modelo em campo?

Um produto de IA embarcada bem-sucedido geralmente combina um modelo compacto, coleta cuidadosa de dados, posicionamento de memória adequado ao hardware, medições de desempenho com cargas de trabalho representativas e uma política de energia que evita despertares desnecessários.

## Casos de uso típicos { #typical-use-cases }

Considere a aceleração de IA do SF32 para inferência local compacta em produtos conectados e alimentados por bateria quando os operadores compatíveis e o orçamento medido do sistema forem adequados:

- Reconhecimento de gestos em relógios, pulseiras e dispositivos portáteis.
- Classificação de atividades em produtos de fitness e saúde.
- Detecção de eventos de voz ou palavras-chave em acessórios de áudio.
- Algoritmos de fusão de sensores em dispositivos vestíveis.
- Análise de sinais biométricos quando houver suporte dos sensores e do software.
- Detecção local de anomalias em dispositivos inteligentes.
- Classificação simples de imagens ou eventos acionados pela câmera em dispositivos com entrada de câmera.
- Comportamento inteligente de HMI que se adapta ao contexto do usuário.

## Principais conclusões { #key-takeaways }

- O NNACC pode assumir operações compatíveis e reduzir a ocupação da CPU; as vantagens de latência e energia precisam ser verificadas para a função completa.
- Ele faz parte de uma pipeline completa, que também inclui sensores, entrada de áudio ou câmera, pré-processamento, movimentação de dados na memória, pós-processamento e lógica da aplicação.
- O SDK v2.5.1 documenta recursos NNACC no SF32LB55x, SF32LB56x e SF32LB58x, mas não estabelece a disponibilidade no SF32LB52x ou SF32LB57x; verifique o componente e a carga concretos, sem inferir presença ou ausência pelo nome da família.
- O desempenho real depende do tamanho e da quantização do modelo, dos operadores compatíveis, do posicionamento na memória, do tratamento de cache, do comportamento do DMA e do suporte do runtime do SDK.
- A inferência local é útil quando atende às metas de resposta, operação offline, privacidade ou tráfego sem fio do produto; o hardware acelerador sozinho não garante esses benefícios.
