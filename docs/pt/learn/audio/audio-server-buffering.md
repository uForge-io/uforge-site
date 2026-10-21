---
icon: lucide/audio-lines
description: "Orientações práticas sobre Audio Server e bufferização por DMA no SF32 para reprodução e gravação sem falhas e coexistência com Bluetooth e gráficos."
tags:
    - Áudio
---

# Audio Server e bufferização { #audio-server-and-buffering }

Consulte esta página depois de escolher a interface de áudio e definir o uso no produto, conforme a [Visão geral de áudio](overview.md). O foco está na divisão de responsabilidades em tempo de execução entre o código da aplicação, as sessões do Audio Server, os buffers DMA e o caminho de áudio do hardware.

**Escopo dos comportamentos específicos do SDK:** Os detalhes de API abaixo estão documentados para SF32LB52x na versão atual do SDK da SiFli. Confirme-os em `audio_server.h`, na implementação e na configuração da família de chips e da versão do SDK escolhidas. As recomendações sobre tamanho de buffers, escalonamento e cache são práticas de engenharia; o Audio Server não garante comportamento nem propriedade dos buffers idênticos em todos os destinos.

## Responsabilidades na sessão { #session-ownership }

Separe as decisões da aplicação dos mecanismos de transmissão do fluxo. A aplicação define quando iniciar ou parar a reprodução e a gravação e como alterar o estado; o Audio Server coordena a sessão; o DMA transfere blocos de amostras; e o driver configura o hardware. Durante um fluxo ativo, evite que a interface de usuário, os callbacks de Bluetooth ou as leituras do sistema de arquivos manipulem diretamente os registradores do codec.

<div align="center"><em>Tabela: Responsabilidade pelos buffers</em></div>

<div align="center" markdown>

| Limite de responsabilidade | Responsável | Pergunta de revisão |
|:---------|:------|:----------------|
| Dados de origem | Aplicação, decodificador ou tarefa de armazenamento | A fila de reprodução recebe dados antes de ficar vazia? |
| Cache de escrita do Audio Server, se configurado | Audio Server; tamanho definido pela configuração da aplicação | `write_cache_size` é válido para este SDK? A aplicação trata todos os retornos de `audio_write()`? |
| Buffer em transferência | DMA/driver de áudio | O buffer permanece estável e coerente com o cache durante toda a transferência? |
| Buffer após a transferência | Aplicação ou tarefa de processamento | Os dados de reprodução são repostos, ou os dados capturados processados, antes de o DMA reutilizar a região? |
| Estado da sessão | Audio Server e política da aplicação | Solicitações repetidas de início, parada, erro e encerramento evitam fechar ou liberar recursos duas vezes? |

</div>

## Escolha uma estratégia de buffer { #choose-a-buffer-strategy }

A bufferização dupla é um ponto de partida prático quando o driver oferece suporte: o DMA transfere uma região enquanto o software prepara os dados de reprodução ou processa os dados capturados em outra. Diferencie a fila PCM da aplicação do buffer DMA do driver; escrever no Audio Server não comprova, por si só, uma transferência DMA sem cópia.

Amplie a capacidade da fila somente quando a latência do armazenamento, o tempo de decodificação, a variação do transporte Bluetooth ou do escalonamento exigirem. A capacidade ocupa memória; a quantidade de áudio realmente enfileirado determina o tempo de espera. Apenas alocar mais buffers não aumenta automaticamente a latência. Use os cálculos por quadros de amostras da [Visão geral de áudio](overview.md#buffer-and-latency-budget), considerando o número de canais e os bytes armazenados por amostra.

Meça a duração do bloco, o pior tempo de preparação ou processamento e a latência de ponta a ponta aceitável. Determine cada prazo com base nas notificações do driver de destino sobre a reposição do buffer e a conclusão da transferência, além da sequência de reutilização dos buffers. Se o driver oferecer callbacks de meia transferência e de transferência completa, programe o processamento em torno dessas transições; não considere o fim da transferência atual como o único prazo. Os dados de reprodução devem estar prontos antes de o DMA precisar deles; os dados gravados devem ser processados ou copiados antes de o DMA sobrescrevê-los. Reserve margem para o escalonamento e investigue até mesmo underruns (esvaziamento do buffer) ou overruns (sobrescrita do buffer) ocasionais.

Para a memória entregue diretamente ao DMA pela aplicação ou pelo driver, siga as regras de cache e de propriedade do destino: faça o clean dos dados de reprodução escritos pela CPU antes que o DMA os leia, prepare os buffers de recepção conforme necessário e invalide o cache dos dados capturados antes do acesso pela CPU quando o destino exigir. Essas operações dependem do SoC, da região de memória e da API do driver. Não faça manutenção manual do cache em buffers pertencentes ao Audio Server ou ao driver, a menos que a API exija isso. Não modifique, libere nem reutilize uma região enquanto ela estiver sob controle do DMA.

O [documento do Audio Server para SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/multimedia.html) informa que os callbacks são executados na thread do Audio Server e que um callback de `audio_open()` não deve chamar `audio_close()`, pois isso pode causar deadlock. Mantenha os callbacks curtos e encaminhe operações de armazenamento ou processamento que possam bloquear para uma thread de trabalho. O callback de captura recebe um ponteiro e o tamanho de um frame de áudio; a documentação citada não define por quanto tempo o ponteiro permanece válido depois do callback. Copie os dados antes de retornar, a menos que o SDK do destino garanta explicitamente uma validade maior.

O mesmo documento do SF32LB52x especifica estes retornos de `audio_write()`:

<div align="center"><em>Tabela: Retornos documentados de audio_write() (SF32LB52x)</em></div>

<div align="center" markdown>

| Valor de retorno | Significado documentado |
|:----------------|:------------------------|
| `> 0` | O valor é igual a `data_len`; os dados foram aceitos no cache de escrita. |
| `0` | O cache de escrita está cheio. Uma solicitação maior que a capacidade configurada também é rejeitada com `0`. |
| `-1` | O cliente está pausado ou suspenso; os dados enviados são descartados. |
| `-2` | Parâmetro inválido. |

</div>

Nessa API, `write_cache_size` é limitado a `0x7FFF` bytes, e o guia recomenda uma capacidade de pelo menos o dobro dos dados de uma chamada a `audio_write()` para seu padrão de escrita ping-pong. Esse é o cache de software do Audio Server, não uma garantia sobre o layout físico dos buffers DMA do driver. Confirme esses limites para o SDK do destino. A prioridade dos clientes, a mixagem e as rotas de áudio disponíveis também dependem da configuração; abrir uma sessão não garante que todas as interfaces do chip sejam expostas pelo Audio Server.

## Valide sob a carga do produto { #validate-under-product-load }

Teste a sessão com as cargas simultâneas do produto: atualização do display, notificações ou áudio por Bluetooth, leituras e gravações no armazenamento, logs e transições para estados de baixo consumo. Registre o esvaziamento do buffer de reprodução, o estouro do buffer de gravação, a ocupação da fila, o atraso entre o callback e a execução da thread de trabalho, falhas de áudio, reconexões e transições de suspensão e retomada. Teste interrupções por prioridade, suspensão e retomada, falhas de inicialização e solicitações repetidas de parada. Confira a recuperação prevista, em vez de deixar perdas de dados passarem despercebidas.

No encerramento, confirme que o driver parou as transferências e que callbacks pendentes não podem acessar buffers liberados. Verifique se as solicitações de gerenciamento de energia do áudio são liberadas e os componentes externos desativados conforme a sequência do hardware. Consulte a [Visão geral de baixo consumo](../low-power/overview.md) para validar o consumo do sistema e a [Visão geral do Bluetooth](../bluetooth/overview.md) para a coexistência sem fio.
