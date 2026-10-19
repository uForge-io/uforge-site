---
icon: lucide/radio-tower
description: "Como o processador Bluetooth dedicado do SF32 retira da CPU de aplicações as tarefas de temporização de rádio e controle do enlace, viabilizando produtos conectados com baixo consumo."
tags:
  - Bluetooth
---
# Processador Bluetooth { #bluetooth-processor }

## Introdução { #introduction }

O **processador Bluetooth** é o subsistema dedicado ao controle sem fio nos dispositivos SF32LB. Ele responde pelas partes da operação Bluetooth que exigem temporização precisa, incluindo o escalonamento de rádio, o controle do enlace, a manutenção de conexões em modo de baixo consumo e a coordenação com o processador principal de aplicações.

Essa arquitetura é útil em produtos conectados alimentados por bateria. Em vez de despertar a CPU principal da aplicação a cada evento sem fio, os dispositivos SF32 usam uma arquitetura heterogênea de múltiplos núcleos: o processador de aplicações cuida da lógica do produto e das funções voltadas ao usuário, enquanto um processador Bluetooth de baixo consumo ou sempre ativo mantém o enlace sem fio.

A capacidade de executar código de aplicação nesse processador de baixo consumo varia conforme a família. Consulte a comparação abaixo e confirme no SDK a distribuição de tarefas compatível com o modelo escolhido.

Consulte esta página para entender onde são executados o controle de temporização Bluetooth e o firmware do controlador, se o núcleo de baixo consumo da família escolhida pode ser programado e como um produto conectado pode manter a CPU de aplicações em repouso. Para projetar serviços e integrar Bluetooth ao produto, consulte a [Visão geral do Bluetooth](overview.md).

## Por que um processador Bluetooth dedicado é importante { #why-a-dedicated-bluetooth-processor-matters }

Bluetooth não é apenas um protocolo de software executado ocasionalmente em segundo plano. Um dispositivo conectado precisa cumprir requisitos rigorosos de temporização de rádio para anúncios, varredura, eventos de conexão, troca de pacotes, transporte de áudio, criptografia e coexistência com outras atividades do sistema.

Um subsistema Bluetooth dedicado separa essas responsabilidades sem fio sensíveis à temporização da carga de trabalho principal da aplicação. Isso traz vantagens práticas:

- Menor consumo médio em espera com a conexão ativa.
- Temporização de rádio mais confiável sob cargas de interface, gráficos, áudio ou IA.
- Atendimento de eventos de rádio no controlador sem despertar a CPU da aplicação a cada evento.
- Separação mais clara entre o firmware da aplicação e o firmware de controle do protocolo.
- Mais facilidade para manter produtos conectados enquanto a CPU principal permanece em repouso.

Essa separação é especialmente valiosa em produtos vestíveis e portáteis. O dispositivo pode passar a maior parte do tempo conectado em um estado de baixo consumo, despertando apenas para interações do usuário, eventos de sensores, atualizações do display, atividade de áudio ou sincronização com o telefone.

Essas são possibilidades da arquitetura, não valores garantidos de consumo ou tempo de despertar. A localização da pilha Host, as interrupções, a partida do clock, a política de repouso e o tráfego da aplicação determinam o resultado medido. Meça a corrente e o tempo de resposta com o firmware e a carga previstos.

## Posição na arquitetura SF32 { #position-in-the-sf32-system }

Uma arquitetura sem fio simplificada do SF32 pode ser representada assim:

<div align="center"><em>Figura: Arquitetura sem fio simplificada do SF32</em></div>

```text
Application Processor
  - product firmware
  - UI and graphics
  - audio application logic
  - user services
        │
        ▼
Bluetooth Host / System Services
        │
        ▼
Bluetooth Processor / Controller Firmware
  - link-layer timing
  - radio scheduling
  - low-power connection events
  - controller-side protocol work
        │
        ▼
Bluetooth Radio and RF Front End
```

A divisão exata entre host, controlador e firmware da aplicação depende do SDK, da configuração da pilha e dos requisitos do produto. Conceitualmente, porém, o processador principal de aplicações não deve ser considerado a única CPU envolvida na operação Bluetooth. O subsistema Bluetooth tem seu próprio contexto de execução e foi projetado para manter o comportamento sem fio determinístico e eficiente em consumo.

## Diferenças entre as famílias de dispositivos { #device-family-differences }

As diferentes classes de dispositivos da família SF32LB usam configurações distintas de processador de baixo consumo. Consulte sempre o datasheet e a documentação do SDK do dispositivo exato que será utilizado.

<div align="center"><em>Tabela: diferenças entre as famílias de dispositivos</em></div>

<div align="center" markdown>

| Família de dispositivos | Recursos Bluetooth | Função do processador de baixo consumo | Posicionamento típico |
|:--------------|:---------------------|:-------------------------|:--------------------|
| **SF32LB52x** | Bluetooth de modo dual: BT Classic + BLE | O LCPU executa a pilha Bluetooth; não fica disponível para o código de aplicação | Módulos Bluetooth otimizados em custo, acessórios de áudio, dispositivos vestíveis de nível básico e HMIs compactas. |
| **SF32LB55x** | BLE | O LCPU pode executar tarefas de aplicação suportadas pelo SDK | Vestíveis BLE e produtos de baixo consumo com muitos sensores. |
| **SF32LB56x** | Bluetooth de modo dual: BT Classic + BLE | O LCPU pode executar tarefas de aplicação suportadas pelo SDK | Produtos com displays mais avançados, HMIs conectadas e dispositivos vestíveis. |
| **SF32LB57x** | Bluetooth de modo dual: BT Classic + BLE | O LCPU gerencia Bluetooth e outras tarefas sujeitas a restrições de consumo de energia; confirme quais são suportadas pelo SDK | Produtos que combinam gráficos e áudio local na HCPU/ACPU. |
| **SF32LB58x** | Bluetooth de modo dual: BT Classic + BLE | O LCPU pode executar tarefas de aplicação suportadas pelo SDK | Produtos avançados com gráficos, áudio, IA e requisitos complexos de conectividade. |

</div>

O [guia HAL do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/index.html) da SiFli informa que o LCPU executa a pilha de protocolos Bluetooth e não está disponível para aplicações. Os guias HAL do [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/index.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/index.html) e [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/hal/index.html) descrevem o uso do LCPU para tarefas de baixo consumo, como BLE e processamento de sensores. Para o **SF32LB57x**, o [guia ACPU do SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifica uma arquitetura HCPU/ACPU/LCPU e atribui ao LCPU tarefas como BLE e processamento de sensores, mas não especifica se outras tarefas de usuário são permitidas nem em que medida. Não generalize a programabilidade do LCPU entre famílias. Para o componente exato, confirme a configuração dos núcleos no datasheet e verifique se a versão do SDK e a configuração da placa escolhidas permitem executar a tarefa de aplicação pretendida no LCPU. Se essa combinação não estiver documentada, marque a atribuição como não verificada; antes de adotá-la, confirme também a memória disponível e os limites de escalonamento.

O mesmo guia ACPU também distingue as funções dos núcleos de aplicação: o SF32LB57x usa o ACPU para processamento de áudio e gráficos, enquanto o SF32LB58x o destina ao processamento DSP de áudio. Essas funções são distintas das responsabilidades do controlador Bluetooth; confirme a distribuição de tarefas disponível para a placa e o SDK escolhidos.

As capacidades Bluetooth da tabela resumem a documentação de cada família; elas não garantem suporte a todos os perfis em cada variante ou compilação do SDK. Os datasheets da SiFli para [SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/DS0001-SF32LB55x-Datasheet%20V1p6.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) e [SF32LB58x](https://downloads.sifli.com/silicon/DS0058-SF32LB58x-Datasheet%20V1p6.pdf) especificam as capacidades BLE ou de modo dual indicadas. O [guia de testes de sinalização Bluetooth do SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/bt_signaling_test_guide.html) aborda testes BR/EDR e BLE e inclui o SF32LB57x. Confirme o suporte a perfis, funções e configurações para o componente e a versão do SDK exatos.

### Programabilidade da aplicação e firmware do controlador { #controller-firmware-programmability }

O fato de o LCPU executar tarefas de aplicação não implica acesso ao código-fonte do controlador Bluetooth nem a possibilidade de substituir a pilha de rádio. As atualizações de firmware e os mecanismos de patch suportados, os orçamentos de memória e os limites de escalonamento dependem do dispositivo e do SDK.

- **Desenvolvimento de aplicações de baixo consumo.** Transfira aquisição de sensores, processamento leve e gerenciamento do sistema para o LCPU quando houver suporte. Planeje a memória da pilha, o tempo de execução e a comunicação com o HCPU.
- **Manutenção e personalização do controlador.** Use as atualizações de firmware e os mecanismos de patch suportados pelo fabricante para o dispositivo e SDK escolhidos. Um núcleo de aplicação programável não comprova a disponibilidade do código-fonte proprietário do controlador nem de uma pilha de rádio alternativa. Confirme essas possibilidades separadamente com a SiFli.

Uma configuração exclusiva do controlador também pode receber atualizações do fabricante; sua imagem não é necessariamente imutável. Valide as mudanças quanto à qualificação Bluetooth, interoperabilidade, compatibilidade entre host e controlador e recuperação de OTA. Diferencie o rollback para recuperar o produto da política de segurança que impede instalar versões antigas vulneráveis.

## BLE e Bluetooth de modo dual { #ble-and-dual-mode-bluetooth }

Dependendo do modelo, os dispositivos SF32 podem oferecer apenas **Bluetooth Low Energy (BLE)** ou **Bluetooth de modo dual**, com **Bluetooth Classic** e **BLE**.

### Bluetooth Low Energy { #bluetooth-low-energy }

O BLE é otimizado para troca de dados com baixo consumo. É usado com frequência em:

- Pulseiras de atividade e smartwatches.
- Sensores de saúde e dispositivos vestíveis.
- Notificações do telefone e aplicativos complementares.
- Sincronização de sensores.
- Beacons e dispositivos com recursos de localização.
- Canais de controle e configuração de baixo consumo.

As conexões BLE costumam ser intermitentes e orientadas a eventos, o que as torna adequadas para um processador Bluetooth de baixo consumo.

### Bluetooth Classic e projetos de modo dual { #bluetooth-classic-and-dual-mode-designs }

O Bluetooth de modo dual acrescenta suporte aos casos de uso do Bluetooth Classic além do BLE. Isso é útil em produtos como:

- Acessórios de áudio Bluetooth.
- Adaptadores e módulos sem fio.
- Dispositivos que precisam ser compatíveis com perfis Bluetooth Classic existentes.
- Produtos que combinam o controle por BLE com áudio ou transferência de dados por Bluetooth Classic.

A operação em modo dual pode exigir mais do que uma implementação somente BLE, pois áudio e perfis legados podem impor requisitos mais rigorosos de taxa de transferência (throughput), latência ou coexistência. Um subsistema Bluetooth dedicado ajuda a isolar essas exigências dos picos de carga da CPU principal.

## Áudio Bluetooth e LE Audio { #bluetooth-audio-and-le-audio }

Produtos de áudio Bluetooth impõem requisitos adicionais à arquitetura do sistema. As cargas de áudio envolvem temporização de rádio, bufferização, processamento de codecs, sincronização de clock e, às vezes, atualizações simultâneas da interface do usuário.

Um sistema de áudio Bluetooth bem projetado com SF32 normalmente divide as responsabilidades desta forma:

- O processador Bluetooth cuida da temporização de rádio e do enlace no lado do controlador.
- O processador de aplicações cuida da lógica do produto, da interface do usuário e das funções de áudio de nível mais alto.
- Interfaces de áudio como I2S, PDM, ADC ou DAC transportam amostras entre o restante do sistema e o subsistema de áudio.
- DMA e bufferização reduzem a sobrecarga da CPU durante a transmissão contínua de áudio.

Em LE Audio e em outros usos modernos de áudio Bluetooth, o resultado final também depende da arquitetura do firmware, do suporte da pilha, da escolha do codec, da largura de banda da memória e da política de gerenciamento de energia. Os datasheets da SiFli para SF32LB56x e SF32LB58x listam explicitamente suporte a BLE Audio; o suporte a BLE ou ao modo dual, por si só, não implica suporte a LE Audio. A disponibilidade de perfis, codecs e caminhos de implementação no SDK ainda depende do componente e da versão usados. Verifique esses pontos antes de escolher LE Audio. O processador Bluetooth fornece a base de temporização, mas o comportamento completo do produto depende do SDK e do projeto da aplicação.

## Operação de baixo consumo { #low-power-operation }

O subsistema Bluetooth é mais valioso quando o processador principal de aplicações pode entrar em repouso enquanto o enlace sem fio permanece ativo. Durante a espera conectada, talvez seja necessário despertar esse processador apenas para eventos relevantes, como:

- Recebimento de uma notificação ou comando.
- Alteração do estado da conexão.
- Uma tarefa de sincronização agendada.
- Início ou encerramento de um fluxo de áudio.
- Um evento de sensor ou uma interação do usuário.
- Uma atualização de firmware ou operação de provisionamento.

Esse modelo mantém a CPU principal fora do estado ativo pelo maior tempo possível. O processador Bluetooth e o rádio despertam nos eventos de conexão programados, executam o processamento de protocolo necessário e então permitem que o sistema retorne a um estado de menor consumo.

O perfil de consumo real depende do intervalo de conexão, da potência de transmissão, do comportamento dos anúncios, do modo de repouso, da configuração do cristal, do layout de RF, da política do firmware e da frequência com que o processador de aplicações é despertado.

## Limites entre host, controlador e aplicação { #host-controller-and-application-boundaries }

O software Bluetooth costuma ser descrito em duas camadas principais:

<div align="center"><em>Tabela: limites entre host, controlador e aplicação</em></div>

<div align="center" markdown>

| Camada | Responsabilidade principal |
|:------|:--------------------|
| **Host** | Perfis, serviços, política de pareamento, APIs voltadas à aplicação e comportamento de protocolo de nível mais alto. |
| **Controlador** | Camada de enlace, escalonamento de rádio, temporização de pacotes, suporte à criptografia e procedimentos Bluetooth de baixo nível. |

</div>

Em um sistema SF32, as responsabilidades do lado do controlador estão estreitamente ligadas ao processador Bluetooth e ao subsistema de rádio. O lado do host pode ser executado no processador de aplicações, no firmware do sistema ou em componentes fornecidos pelo SDK, conforme a arquitetura da pilha.

Para quem desenvolve aplicações, o principal é entender que o funcionamento do Bluetooth atravessa fronteiras entre CPUs. Memória compartilhada, mensagens entre processadores, eventos e APIs do SDK fazem parte da arquitetura do produto. Trate o Bluetooth como um subsistema, não apenas como uma biblioteca vinculada à aplicação principal.

## Interação com o processador de aplicações { #interaction-with-the-application-processor }

O processador de aplicações normalmente controla o comportamento do produto:

- Iniciar e interromper os anúncios.
- Criar ou aceitar conexões.
- Gerenciar serviços e características GATT.
- Tratar pareamento, bonding e políticas de segurança.
- Trocar dados da aplicação com um telefone ou gateway.
- Atualizar o estado da interface do usuário quando o estado do Bluetooth mudar.
- Coordenar fluxos de áudio, sensores e modos de energia.

O processador Bluetooth cuida do trabalho de nível mais baixo necessário para manter a conexão. A comunicação entre os dois lados normalmente é abstraída por APIs do SDK, eventos, filas ou mecanismos de comunicação entre processadores.

Um bom projeto de aplicação evita despertar a CPU principal para tarefas desnecessárias. Agrupe eventos quando possível, escolha parâmetros de conexão adequados e evite o polling frequente na aplicação quando houver callbacks orientados a eventos.

## Considerações sobre RF e clock { #rf-and-clock-considerations }

O processador Bluetooth, sozinho, não garante bom desempenho sem fio; o projeto do hardware ao redor também importa. O layout de RF, o ajuste da antena, a precisão do clock, a integridade da alimentação e a calibração em produção afetam o alcance, a sensibilidade, a potência de transmissão e a estabilidade da conexão.

Entre os principais cuidados de hardware estão:

- Use a rede de casamento de RF e o layout de antena recomendados.
- Mantenha a trilha de RF curta, com impedância controlada e bem isolada de sinais ruidosos.
- Siga os requisitos do cristal indicados no guia de projeto de hardware.
- Forneça linhas de alimentação limpas e desacoplamento local para os circuitos de RF e clock.
- Mantenha pontos de acesso para teste em produção, calibração de RF e gravação do firmware.
- Evite passar trilhas de alta velocidade do display, do armazenamento ou da fonte chaveada perto de caminhos sensíveis de RF.

As equipes de software e hardware devem tratar o desempenho Bluetooth como uma característica do sistema. Parâmetros de firmware não compensam totalmente um layout de RF inadequado ou clocks instáveis.

## Coexistência com outras cargas de trabalho { #coexistence-with-other-workloads }

Os dispositivos SF32 costumam executar Bluetooth em conjunto com gráficos, áudio, sensores, armazenamento e, às vezes, Wi-Fi externo. Esses subsistemas compartilham alimentação, clocks, largura de banda da memória, pinos e tempo de CPU.

Entre os problemas comuns de coexistência estão:

- Atualização do display ou tráfego de PSRAM que reduzem a largura de banda de memória disponível.
- DMA de áudio e buffers de áudio Bluetooth que exigem temporização estável.
- Interrupções de sensores que despertam o processador de aplicações com frequência excessiva.
- Wi-Fi externo ou outras fontes de RF que afetam o desempenho Bluetooth.
- Seções críticas longas ou interrupções desabilitadas que atrasam o tratamento do Bluetooth no lado do host.

O processador Bluetooth reduz o risco de atrasos de temporização, mas não elimina todos os gargalos de recursos compartilhados. Produtos com áudio, interface avançada ou conectividade sem fio externa devem ser testados sob cargas máximas realistas.

## Casos de uso típicos { #typical-use-cases }

O processador Bluetooth é essencial em várias categorias de produtos SF32:

- Módulos Bluetooth e adaptadores seriais.
- Smartwatches e pulseiras de atividade de nível básico.
- Sensores de saúde BLE e dispositivos vestíveis.
- Acessórios de áudio Bluetooth.
- Crachás inteligentes e etiquetas eletrônicas de prateleira.
- Painéis conectados ao telefone e dispositivos HMI.
- Controles para casas inteligentes e produtos com aplicativo complementar.
- Dispositivos de sincronização de sensores e registro de dados.

A melhor opção da família SF32 depende de o produto precisar apenas de BLE ou de Bluetooth de modo dual, além dos requisitos de áudio, display, capacidade de memória e processamento de baixo consumo programável pelo usuário.

## Recomendações práticas de projeto { #practical-design-guidance }

Ao projetar o firmware Bluetooth para SF32, comece definindo o comportamento de conectividade do produto:

- O produto precisa apenas de BLE ou de Bluetooth de modo dual?
- Há necessidade de áudio Bluetooth?
- Quais são os requisitos de intervalo de conexão, latência e taxa de transferência?
- Com que frequência o processador principal de aplicações deve despertar?
- Quais eventos precisam despertar o sistema do deep sleep ou do standby?
- As tarefas dos sensores ou da interface do usuário competem com a temporização Bluetooth?
- Quais são as metas de alcance de RF e potência de transmissão?
- Como serão feitos a gravação do firmware e a calibração de RF durante a produção?

Um projeto robusto costuma combinar o processador Bluetooth com a escolha criteriosa dos parâmetros de conexão, código de aplicação orientado a eventos, planejamento dos estados de baixo consumo e um bom layout de RF.

## Principais pontos { #key-takeaways }

- Os dispositivos SF32LB usam um subsistema dedicado de processamento Bluetooth ou de baixo consumo para manter a temporização sem fio confiável e reduzir o consumo de energia.
- No SF32LB52x, o LCPU é dedicado ao controlador Bluetooth. Nos SF32LB55x, SF32LB56x e SF32LB58x, o LCPU pode executar tarefas de aplicação definidas pelo SDK em configurações documentadas. O SF32LB57x usa o LCPU para Bluetooth e tarefas sensíveis ao consumo de energia, mas confirme o suporte a cada tarefa de usuário prevista no SDK e na placa de destino.
- Um LCPU programável permite tarefas da aplicação dentro dos limites do SDK; o acesso ao código do controlador e sua personalização exigem confirmação separada. Use as atualizações suportadas pelo fabricante e valide as mudanças.
- O BLE é otimizado para produtos conectados de baixo consumo; o Bluetooth de modo dual também atende a casos de uso do Bluetooth Classic, como áudio e suporte a perfis legados.
- O processador Bluetooth ajuda a manter a CPU principal de aplicações em repouso enquanto conexões, anúncios e eventos de rádio programados continuam ativos.
- O bom desempenho Bluetooth depende tanto da arquitetura do firmware quanto do projeto de hardware, incluindo layout de RF, clocks, alimentação, ajuste da antena e calibração.
- Trate Bluetooth como um subsistema com limites entre host e controlador, comunicação entre processadores, decisões de política de energia e restrições de recursos compartilhados.
