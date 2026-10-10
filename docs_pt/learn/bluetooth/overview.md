---
icon: lucide/bluetooth
title: "Visão geral do Bluetooth"
description: "Como planejar o Bluetooth em produtos SF32: BLE ou modo dual, serviços GATT, parâmetros de conexão, segurança, LE Audio e coexistência."
tags:
  - Bluetooth
---

# Visão geral do Bluetooth { #bluetooth-overview }

## Visão geral { #overview }

Este guia explica como planejar e implementar a conectividade Bluetooth em produtos SF32. O foco está nas decisões práticas que influenciam o projeto: BLE ou Bluetooth de modo dual, serviços GATT, seleção de perfis, ajuste dos parâmetros de conexão, pareamento e segurança, LE Audio e coexistência com tarefas de gráficos, áudio e sensores.

O SF32 separa o processamento da aplicação das tarefas do controlador Bluetooth que exigem temporização rigorosa. O processador de aplicação normalmente executa a lógica do produto e a interface do usuário; um processador Bluetooth ou de baixo consumo cuida da temporização da camada de enlace e do escalonamento do rádio. O núcleo que executa a pilha host e os serviços GATT depende do dispositivo e da configuração do SDK. Não presuma que todos os serviços rodam no processador de aplicação: confira a configuração dos núcleos e a comunicação entre eles no exemplo escolhido.

Para entender melhor o subsistema, consulte [Processador Bluetooth](processor.md).

Use esta página ao definir o comportamento sem fio do produto: quais funções e perfis são necessários, quais níveis de responsividade e autonomia os usuários esperam e como dividir as responsabilidades entre o telefone, o rádio e o firmware da aplicação. Este é um guia de projeto; ele não substitui a validação de interoperabilidade com os telefones e acessórios previstos.

## Defina os requisitos de conectividade do produto { #define-the-products-connectivity-requirements }

Antes de escrever qualquer código GATT, determine o que o produto realmente precisa:

- Somente BLE ou Bluetooth de modo dual (Bluetooth clássico + BLE)?
- O produto precisa de áudio Bluetooth — clássico (A2DP/AVRCP/HFP) ou LE Audio?
- Quais são os requisitos típicos de intervalo de conexão, latência e taxa de transferência (throughput)?
- Com que frequência o processador de aplicação precisa despertar e por quanto tempo pode permanecer em repouso?
- O produto precisa interoperar com serviços existentes no telefone (notificações, controle de mídia e chamadas) ou apenas com um aplicativo complementar próprio?
- Qual é o alcance esperado? Quais são as restrições da antena e do gabinete e as metas de certificação de RF?
- As atualizações de firmware serão entregues por Bluetooth?

Essas respostas orientam quase todas as decisões seguintes: qual dispositivo da família escolher, quais exemplos do SDK usar como ponto de partida e por quanto tempo a CPU principal pode permanecer em repouso.

## Escolha entre BLE, Bluetooth clássico e modo dual { #choose-ble-classic-or-dual-mode }

### Bluetooth Low Energy (BLE) { #bluetooth-low-energy-ble }

BLE é uma boa opção padrão para a maioria dos dispositivos vestíveis e sensores conectados: o tráfego é intermitente e orientado a eventos, o consumo médio é baixo e há amplo suporte nos sistemas operacionais de telefones. Produtos que priorizam BLE incluem pulseiras de atividade, sensores de saúde, beacons e enlaces de configuração ou controle com um aplicativo complementar.

### Bluetooth clássico e modo dual { #classic-bluetooth-and-dual-mode }

Inclua Bluetooth clássico quando o produto precisar de streaming de áudio (A2DP/AVRCP), chamadas em viva-voz (HFP), enlaces de dados seriais (SPP) ou compatibilidade com perfis clássicos existentes. Projetos de modo dual exigem mais do escalonamento do rádio e da coexistência do que projetos apenas com BLE; o processador Bluetooth dedicado ajuda a isolar essas tarefas do restante do sistema.

Nem todos os dispositivos SF32 oferecem Bluetooth de modo dual. Antes de definir o número de peça, consulte a tabela de dispositivos em [Processador Bluetooth](processor.md#device-family-differences).

## Escolha o dispositivo SF32 adequado { #pick-the-right-sf32-device }

Escolha o dispositivo com base nos recursos de conectividade exigidos pelo produto, não apenas na frequência de clock.

<div align="center"><em>Tabela: escolha do dispositivo SF32 adequado</em></div>

<div align="center" markdown>

| Requisito | Direção típica de dispositivo |
|:------------|:-------------------------|
| Dispositivo vestível ou sensor somente BLE | SF32LB55x |
| Bluetooth de modo dual com custo otimizado (acessório de áudio ou módulo) | SF32LB52x |
| Bluetooth de modo dual com display/interface mais avançados | SF32LB56x |
| Bluetooth de modo dual com dois núcleos de aplicação para gráficos e áudio local | SF32LB57x |
| Produto topo de linha que exige Bluetooth, gráficos, IA e mais memória | SF32LB58x |
| O núcleo de baixo consumo dedicado apenas ao controlador Bluetooth é suficiente | SF32LB52x |
| É necessário executar no núcleo de baixo consumo tarefas adicionais, sempre ativas e programáveis pelo usuário | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Se o produto também exigir recursos de display, memória ou IA, compare-os nas páginas [Visão geral de gráficos](../graphics/overview.md) e [Acelerador de IA](../ai/accelerator.md).

## Serviços GATT e o framework Sibles { #gatt-services-and-the-sibles-framework }

O SiFli-SDK oferece o framework **Sibles** para registrar e usar serviços GATT. O GATT define a hierarquia de serviços e características, além do acesso aos atributos; o GAP trata da publicidade, descoberta de dispositivos, estabelecimento de conexões e dos papéis correspondentes. São responsabilidades complementares, não uma camada GATT construída sobre o GAP. Comece pelo exemplo do SDK mais próximo, em vez de criar um banco de dados GATT do zero.

O SDK inclui exemplos de implementação de vários perfis padrão e específicos do fornecedor:

<div align="center"><em>Tabela: serviços GATT e o framework Sibles</em></div>

<div align="center" markdown>

| Perfil/serviço | Uso típico |
|:-------------------|:------------|
| **HRPC** (cliente que coleta medições de frequência cardíaca) | Recebe medições de um sensor externo como cliente GATT; útil em produtos de atividade física e monitoramento de saúde. |
| **DISS** (Device Information Service) | Fornece ao telefone o fabricante, o modelo e a versão do firmware. |
| **CTS** (Current Time Service) | Sincroniza a hora do telefone com o dispositivo. |
| **BASC** / **CSCPC** / **CPPC** | Perfis coletores de bateria, velocidade/cadência de ciclismo e potência de ciclismo. |
| **HID over GATT** | Emulação de teclados, controles remotos e outros dispositivos de entrada. |
| Cliente **ANCS** (Apple Notification Center Service) | Lê notificações do iOS no dispositivo. |
| Cliente **AMS** (Apple Media Service) | Controla a reprodução de mídia do iOS pelo dispositivo. |
| Perfil de transferência serial | Transporte de dados bidirecional personalizado por BLE, semelhante ao SPP, mas baseado em GATT. |

</div>

Reutilize o registro, o tratamento de eventos e as verificações de segurança do exemplo mais próximo. Ao implementar um perfil padrão, preserve seus UUIDs e comportamento; se o modelo de dados do produto exigir, crie um serviço e UUIDs próprios. O objetivo é reutilizar código de suporte testado, não forçar todos os protocolos do aplicativo a caber em um perfil padrão.

## Perfis de Bluetooth clássico { #classic-bluetooth-profiles }

Para produtos de modo dual, o SDK oferece exemplos de implementação dos seguintes perfis:

- **SPP** — comunicação serial bidirecional simples, útil para aplicativos complementares legados ou que não usam GATT.
- **A2DP** (receptor e transmissor) — streaming de áudio Bluetooth.
- **AVRCP** — controle de reprodução (reproduzir/pausar/faixa/volume) junto com um enlace A2DP.
- **HFP** — chamadas em viva-voz, com os papéis HF (dispositivo de viva-voz) e AG (gateway de áudio). O [exemplo HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) documentado implementa HF; confira separadamente o suporte a AG na configuração do SDK escolhida.
- **PAN** — rede sobre Bluetooth, incluindo um exemplo de atualização OTA via PAN.

Perfis de áudio e perfis legados tendem a impor requisitos mais rigorosos de temporização e taxa de transferência do que enlaces BLE simples. Reserve tempo para testar a coexistência (consulte [Coexistência com outras cargas de trabalho](#coexistence-with-other-workloads)).

## Áudio Bluetooth e LE Audio { #bluetooth-audio-and-le-audio }

Há dois caminhos, conforme a abordagem de áudio:

- **Áudio Bluetooth clássico** — A2DP para streaming, AVRCP para controle de reprodução e HFP para chamadas. É maduro e amplamente compatível com telefones e fones de ouvido existentes.
- **LE Audio** — usa o [Perfil Básico de Áudio (Basic Audio Profile, BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/), que define procedimentos para gerenciar fluxos LE Audio unicast e broadcast. O SDK inclui exemplos de fonte e receptor de difusão, além de um exemplo que combina uma fonte de difusão LE Audio com Bluetooth clássico para produtos que precisam oferecer suporte às duas tecnologias durante uma transição.

Os dois caminhos exigem temporização estável, buffers e transferência confiável de amostras de áudio, normalmente por DMA. Avalie SF32LB52x/56x/58x conforme os papéis de áudio Bluetooth e as configurações do SDK necessários ao produto. O SF32LB55x oferece apenas BLE e não pode fornecer áudio Bluetooth clássico; isso não significa ausência de recursos de áudio local. Para DMA e buffers, consulte [Visão geral de áudio](../audio/overview.md) e [Processador Bluetooth](processor.md#bluetooth-audio-and-le-audio).

## Padrão de implementação para serviços Sibles { #implementation-pattern-for-sibles-services }

Um serviço BLE fácil de manter costuma seguir este padrão:

<div align="center"><em>Tabela: padrão de implementação para serviços Sibles</em></div>

<div align="center" markdown>

| Etapa | Responsabilidade do firmware | Ponto de revisão |
|:-----|:------------------------|:-------------|
| Definir a interface do serviço | UUIDs, características, permissões e comportamento das notificações. | Compatibilidade com o aplicativo complementar e os requisitos de segurança. |
| Registrar o serviço | Usar o caminho do framework Sibles/GATT adotado pelo exemplo mais próximo. | Evitar uma implementação de serviço isolada. |
| Anunciar de forma intencional | Incluir apenas os dados necessários à descoberta e à reconexão. | Manter os dados dos anúncios pequenos e estáveis. |
| Validar as gravações | Conferir tamanho, estado, permissões e sequência de comandos. | Impedir que dados malformados do aplicativo desestabilizem o firmware. |
| Enviar notificações com critério | Enviar alterações ou dados agrupados, sem repetir estados desnecessariamente. | Reduzir o tempo de rádio ativo e o consumo em repouso. |
| Preservar o estado | Armazene com segurança as chaves de pareamento e as configurações do produto. Mantenha as assinaturas CCCD por cliente: preserve-as entre conexões para clientes vinculados e restaure o valor padrão para os não vinculados. | Verifique a recuperação após reinicialização e OTA; trate alterações no banco GATT sem restaurar cegamente handles antigos. |

</div>

Esse padrão mantém alinhados a definição do serviço, a interface com o aplicativo do telefone, a política de segurança e o comportamento de consumo de energia.

## Parâmetros dos anúncios e de conexão { #advertising-and-connection-parameters }

Os parâmetros dos anúncios e de conexão são as principais alavancas para equilibrar latência, taxa de transferência e consumo de energia.

Esses parâmetros descrevem enlaces BLE ACL, não todos os transportes de áudio Bluetooth. O áudio clássico usa a temporização BR/EDR; o LE Audio usa a temporização isócrona de CIS ou BIS. Não aplique diretamente um intervalo de conexão GATT BLE a essas rotas de áudio. A [introdução ao LE do Bluetooth SIG](https://www.bluetooth.com/bluetooth-le-primer/) explica as diferenças entre os transportes.

<div align="center"><em>Tabela: parâmetros dos anúncios e de conexão</em></div>

<div align="center" markdown>

| Parâmetro | Efeito | Orientação |
|:----------|:-------|:---------|
| Intervalo dos anúncios | Velocidade de descoberta versus consumo dos anúncios | Use um intervalo curto durante uma janela limitada de descoberta rápida e depois aumente-o enquanto aguarda conexão ou reconexão. Uma conexão estabelecida não exige, por si só, a continuidade dos anúncios. |
| Intervalo de conexão | Tempo de resposta BLE ACL versus consumo | Intervalos maiores podem reduzir o consumo médio em enlaces com pouco tráfego; menores podem melhorar a resposta às interações. Valide os parâmetros negociados, a taxa de transferência e a corrente com o telefone de destino. |
| Latência do periférico (slave latency em SDKs anteriores) | Permite que o periférico pule eventos de conexão | Aumenta a autonomia em enlaces quase sempre ociosos; use 0 quando a baixa latência for mais importante que a economia de energia. |
| Tempo limite de supervisão | Tempo máximo sem receber um pacote de dados válido da camada de enlace antes de considerar a conexão perdida | Um valor curto demais causa quedas em enlaces RF marginais; um valor longo demais atrasa a reconexão após uma perda real. |
| Potência de TX | Alcance versus consumo de energia e coexistência | Comece pelo menor ajuste que atenda ao alcance necessário. Meça a energia total, as retransmissões e a coexistência no gabinete final: um ajuste menor pode não ser mais econômico se causar retransmissões frequentes. |

</div>

Produtos do tipo beacon (com anúncios compatíveis com iBeacon) e casos de uso com anúncios periódicos — incluindo a sincronização com esses anúncios para transmissões unidirecionais ou em grande escala — são atendidos por exemplos específicos do SDK e não exigem uma conexão GATT completa.

O intervalo de conexão, a latência do periférico e o tempo limite de supervisão devem formar uma combinação válida aceita pelo controlador e pelo outro dispositivo. Solicitar uma atualização não prova que ela foi aplicada: registre os valores negociados e teste o telefone ou acessório real, incluindo solicitações recusadas e a volta aos ajustes de repouso.

## Predefinições de parâmetros por fase do produto { #parameter-presets-by-product-phase }

Defina parâmetros Bluetooth para cada fase do produto, em vez de tentar usar uma única configuração que sirva para todas:

<div align="center"><em>Tabela: predefinições de parâmetros por fase do produto</em></div>

<div align="center" markdown>

| Fase | Objetivo típico | Direção dos parâmetros |
|:------|:-------------|:--------------------|
| Primeira descoberta | Experiência rápida | Intervalo dos anúncios curto, identidade clara do dispositivo e duração limitada. |
| Reconexão | Menor consumo médio | Aumentar o intervalo dos anúncios após o timeout; usar comportamento direcionado ou filtrado quando apropriado. |
| Controle interativo | Baixa latência | Intervalo de conexão menor e latência do periférico baixa ou igual a zero. |
| Conectado em repouso | Autonomia | Intervalo de conexão maior, latência do periférico diferente de zero e o mínimo de notificações. |
| Transferência OTA por BLE | Taxa de transferência e confiabilidade | Intervalo curto, sem latência do periférico e timeout de supervisão conservador. |
| Áudio | Temporização estável | Parâmetros definidos conforme a temporização dos quadros do codec e a profundidade dos buffers. |

</div>

Documente as transições entre as fases. Muitos problemas aparentemente “aleatórios” de consumo ou latência Bluetooth são, na verdade, causados pelo produto permanecer na fase errada após uma mudança de estado.

## Pareamento, vínculos e segurança { #pairing-bonding-and-security }

O BLE pode estabelecer uma conexão sem pareamento. O pareamento gera chaves de segurança; o bonding as armazena para conexões posteriores. Defina quais serviços exigem criptografia, autenticação e armazenamento persistente das chaves, em vez de exigir bonding em todos os produtos:

- Decida desde o início entre Just Works, inserção de um código de pareamento (Passkey Entry) e comparação numérica. Just Works não protege contra ataques de intermediário (MITM): uma conexão criptografada não é necessariamente autenticada. Escolha o método conforme as capacidades de E/S dos dois dispositivos e os requisitos de segurança do produto; consulte os [requisitos de segurança do Bluetooth GAP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-60/out/en/host/generic-access-profile.html).
- No [ANCS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html), a autorização no telefone é diferente da criptografia do enlace e da vinculação; trate a recusa ou revogação dessa autorização. Tanto ANCS quanto [AMS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleMediaService_Reference/Specification/Specification.html) podem aparecer ou desaparecer durante uma conexão. Monitore Service Changed e refaça a descoberta do serviço, sem presumir que o pareamento garante sua disponibilidade permanente.
- Armazene as informações de vínculo segundo a abordagem de armazenamento/particionamento recomendada pelo SDK, para que os vínculos sobrevivam a reinicializações e atualizações OTA.
- Defina um fluxo para parear novamente e para “esquecer o dispositivo”, tanto na interface do produto quanto no telefone.
- Trate a política de segurança (requisitos de criptografia, capacidade de E/S e tamanho da chave) como uma decisão do produto, não como uma configuração padrão a deixar sem revisão.

## Múltiplas conexões e funções { #multi-connection-and-roles }

O SDK demonstra **operação simultânea como central e periférico** e **várias conexões concorrentes**. Um produto pode conectar-se ao telefone como periférico BLE e a um sensor como central, ou manter várias conexões com dispositivos complementares. Verifique a combinação de papéis e o limite de conexões para o dispositivo, firmware do controlador, configuração do SDK, buffers e carga total de rádio escolhidos; um exemplo não garante a mesma capacidade em toda a família.

Se o produto precisar operar perto do limite de taxa de transferência do enlace, use o exemplo de taxa de transferência do SDK como referência antes de atribuir uma limitação ao código da aplicação.

## Atualizações de firmware OTA por Bluetooth { #ota-firmware-updates-over-bluetooth }

Há dois caminhos comuns para distribuir atualizações:

- **Atualizações no estilo DFU por BLE**, integradas a uma conexão periférica. O exemplo `peripheral_with_ota` mostra como conectar os pontos de OTA a uma função GATT periférica normal.
- **OTA por PAN**, que distribui o firmware por uma conexão de rede Bluetooth PAN em produtos de modo dual que já usam PAN para dados.

Nos dois casos, planeje e teste o particionamento, a recuperação de falhas e o rollback antes do lançamento. Para OTA por BLE, avalie um intervalo de conexão menor e latência do periférico igual a zero durante a transferência; depois, restaure os ajustes normais de economia de energia. PAN OTA usa Bluetooth clássico: ajuste sua taxa de transferência e recuperação separadamente, sem aplicar os parâmetros de conexão de BLE.

## Coexistência com outras cargas de trabalho { #coexistence-with-other-workloads }

O Bluetooth raramente funciona sozinho no SF32: ele compartilha o sistema com gráficos, áudio, sensores e, às vezes, Wi-Fi externo. O processador Bluetooth dedicado cuida da maior parte do processamento do enlace que exige temporização rigorosa, mas a coexistência no nível da aplicação ainda requer atenção:

- Seções críticas longas ou interrupções desabilitadas no processador de aplicação podem atrasar o tratamento Bluetooth no host.
- O tráfego do display e da PSRAM disputa largura de banda de memória com os buffers de áudio Bluetooth.
- Interrupções de sensores que acordam o processador de aplicação com frequência excessiva podem anular a economia de energia obtida ao mantê-lo em repouso enquanto o processador Bluetooth cuida do enlace.

Para uma visão do sistema, consulte [Coexistência com outras cargas de trabalho](processor.md#coexistence-with-other-workloads). Teste combinações realistas de pior caso — por exemplo, display ativo, áudio e um enlace BLE ocupado — em vez de validar cada subsistema isoladamente.

## RF, interoperabilidade e preparação para certificação { #rf-interoperability-and-certification-readiness }

Valide o firmware Bluetooth com o mesmo rigor aplicado ao hardware de RF:

- Teste com telefones de diferentes fabricantes, versões de sistema operacional e cenários de reconexão, não apenas com um telefone de desenvolvimento.
- Verifique o comportamento após vínculos obsoletos, após esquecer o dispositivo no telefone, após a restauração de fábrica no dispositivo e após atualizações OTA.
- Valide o alcance e a estabilidade dos pacotes no gabinete final, considerando bateria, display, carregador e posições de uso ou manuseio.
- Mantenha disponíveis os modos de teste de RF, o acesso à calibração e os logs necessários à produção e à certificação.
- Para produtos com muitos perfis, reserve tempo para testes de qualificação e de perfil. Uma demonstração funcional não comprova interoperabilidade.

## Diagnóstico de problemas Bluetooth { #debugging-bluetooth-issues }

<div align="center"><em>Tabela: diagnóstico de problemas Bluetooth</em></div>

<div align="center" markdown>

| Sintoma | Área provável para verificar |
|:--------|:----------------------|
| Descoberta lenta ou pouco confiável | Intervalo/tipo dos anúncios, layout de RF e casamento da antena. |
| Desconexões frequentes apesar de um enlace RF aparentemente bom | Timeout de supervisão curto demais, incompatibilidade no intervalo de conexão ou interferência de coexistência. |
| Consumo elevado mesmo com a conexão “ociosa” | Latência do periférico desativada, processador de aplicação acordando com frequência excessiva ou tráfego GATT desnecessário. |
| Falhas ou interrupções no áudio | Esgotamento do buffer DMA (underrun), disputa por recursos com o tráfego de display/PSRAM ou problemas de temporização e configuração específicos do transporte (BR/EDR para áudio clássico; CIS/BIS para LE Audio). |
| Falhas intermitentes de pareamento | Problemas no armazenamento dos vínculos, incompatibilidade de capacidade de E/S ou vínculo obsoleto em um dos lados. |
| Bom alcance na bancada, mas ruim dentro do gabinete | Dessintonia da antena causada por gabinete/bateria/PCB, configuração de potência de TX ou rede de casamento de RF. |

</div>

## Erros comuns { #common-mistakes }

- Escolher hardware somente BLE quando o produto já precisa de áudio clássico.
- Reimplementar desnecessariamente o código de suporte dos serviços ou forçar um modelo de dados próprio em um perfil padrão inadequado.
- Manter a latência do periférico em 0 em enlaces que passam a maior parte do tempo ociosos.
- Adiar os testes de coexistência até a integração final, quando display, áudio e Bluetooth são combinados pela primeira vez.
- Tratar pareamento e vínculo como detalhes secundários, em vez de projetar o fluxo de uso.
- Deixar a validação inicial de RF (antena, rede de casamento e precisão do cristal) para as revisões finais da PCB.
- Presumir que ajustes apenas no firmware compensarão um layout de RF inadequado.

## Lista de verificação para a validação inicial { #bring-up-checklist }

- [ ] Confirme se o produto exige apenas BLE ou Bluetooth de modo dual e escolha o dispositivo SF32 correspondente.
- [ ] Identifique os exemplos de serviço/perfil do SDK mais próximos do caso de uso.
- [ ] Defina metas dos anúncios e de parâmetros de conexão para descoberta, uso ativo e ociosidade.
- [ ] Projete o fluxo de pareamento, vínculo e “esquecer o dispositivo”.
- [ ] Valide o layout de RF, o casamento da antena e a precisão do cristal no hardware real.
- [ ] Valide os perfis escolhidos (serviços GATT, A2DP/AVRCP/HFP ou transmissão LE Audio) com um telefone ou host de referência.
- [ ] Teste a coexistência com display, áudio e sensores sob carga combinada realista.
- [ ] Planeje e teste o caminho de atualização OTA, se o firmware for distribuído por Bluetooth.
- [ ] Meça o consumo de energia com a conexão ociosa e confirme que o processador de aplicação entra em repouso como esperado.

## Principais conclusões { #key-takeaways }

- Decida primeiro entre BLE e Bluetooth de modo dual: essa escolha determina o dispositivo e grande parte do caminho de desenvolvimento no SDK.
- Comece pelos exemplos existentes de serviços GATT e perfis clássicos do SDK (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP, PAN), em vez de criar uma implementação do zero.
- Intervalo de conexão, latência do periférico, timeout de supervisão e potência de TX são as principais alavancas para equilibrar latência, taxa de transferência e consumo de energia.
- Para áudio Bluetooth, confirme o papel Classic ou LE Audio necessário no dispositivo e na configuração do SDK escolhidos; depois projete e teste os buffers e a coexistência. Uma afirmação sobre toda a família não substitui essa verificação.
- Bluetooth é uma questão de sistema: layout de RF, clocks, experiência de pareamento e coexistência com gráficos, áudio e sensores são tão importantes quanto o código GATT.

Para um mapa de tarefas dos projetos atuais do SDK para Bluetooth clássico, BLE e LE Audio, consulte [Exemplos do SDK Bluetooth](bluetooth-sdk-examples.md).

Para um método prático de determinar o consumo real de energia Bluetooth de um dispositivo, consulte [Medição e análise do consumo de energia em Bluetooth](bluetooth-low-power-profiling.md).
