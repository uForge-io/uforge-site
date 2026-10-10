---
icon: lucide/network
description: "Bluetooth PAN no SF32: transporte BNEP, papéis NAP/GN/PANU, vantagens e limites do compartilhamento pelo telefone, configuração do SiFli-SDK e validação OTA."
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## Visão geral { #overview }

**Bluetooth PAN** (Personal Area Networking, rede de área pessoal) permite que um dispositivo SF32 acesse uma rede IP por um link Bluetooth clássico; para acessar a internet, normalmente usa o serviço de compartilhamento de conexão do telefone. Assim, pode-se evitar um rádio Wi-Fi dedicado. PAN é um dos perfis de Bluetooth clássico listados em [Visão geral do Bluetooth](overview.md#classic-bluetooth-profiles) e uma das opções de transporte OTA abordadas em [OTA e DFU](../../develop/firmware-topics/ota-dfu.md).

Considere PAN para tráfego IP ocasional ou moderado, como consultas de clima, sincronização de horário, chamadas a APIs na nuvem, tráfego de um assistente de voz e downloads de firmware. O PAN pode dispensar um subsistema Wi-Fi dedicado quando os benefícios não compensarem o custo, o espaço na placa, o esforço de integração e o consumo. Avalie os requisitos de conformidade de RF aplicáveis ao hardware escolhido e ao produto final.

## Como funciona o Bluetooth PAN { #how-bluetooth-pan-works }

A Bluetooth SIG define PAN como um perfil de Bluetooth clássico (BR/EDR). Ele transporta pacotes no estilo Ethernet por um link ACL do Bluetooth, usando **BNEP** (Bluetooth Network Encapsulation Protocol), que opera sobre L2CAP, e não sobre RFCOMM. PAN exige BR/EDR e uma implementação PAN compatível, mas não exige suporte a BLE. Portanto, também pode ser implementado em hardware que ofereça apenas Bluetooth clássico.

PAN não opera sobre BLE. Porém, o perfil separado [Internet Protocol Support Profile (IPSP)](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/) permite transmitir IPv6 por BLE. Essa capacidade do protocolo não comprova que o SiFli-SDK ou o serviço de compartilhamento de internet do telefone implemente IPSP. A comparação de BLE abaixo trata de um aplicativo que retransmite dados GATT, não de IPSP.

O perfil define três papéis:

<div align="center"><em>Tabela: papéis do Bluetooth PAN</em></div>

<div align="center" markdown>

| Papel | Função |
|:------|:-------|
| **NAP** (Network Access Point) | Conecta dispositivos Bluetooth a uma rede externa e encaminha pacotes entre a piconet Bluetooth e essa rede. Normalmente, essa função é exercida pelo telefone quando o compartilhamento de internet ou o Acesso Pessoal está ativado. |
| **PANU** (PAN User) | Papel de cliente. Conecta-se a um dispositivo NAP (ou GN) e usa o acesso à rede fornecido por ele. É o papel dos dispositivos SF32. |
| **GN** (Group Ad-hoc Network) | Encaminha pacotes entre dispositivos PANU conectados, sem fornecer acesso a uma rede externa. É usado em redes locais ad hoc entre dispositivos, não para acesso à internet. |

</div>

O PANU pode localizar dispositivos próximos por inquiry e identificar o serviço PAN e o papel por SDP. A indicação Networking em Class of Device é uma pista para a descoberta, não uma prova de que existe um serviço NAP utilizável. Após estabelecer ACL e BNEP sobre L2CAP, o NAP encaminha o tráfego à rede externa por ponte ou roteamento, conforme sua implementação. Ele pode ser um telefone ou um gateway LAN, como descreve a [especificação PAN](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/). Qualquer lado pode encerrar a conexão; no projeto com compartilhamento de internet do telefone descrito aqui, mudar o estado desse serviço pode exigir reconexão.

## Por que usar PAN em vez de Wi-Fi { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>Tabela: PAN, Wi-Fi e BLE para acesso à rede</em></div>

<div align="center" markdown>

| Opção | Indicada quando | Contrapartidas |
|:------|:---------------|:------------|
| Bluetooth PAN | O produto já usa Bluetooth de modo dual, precisa de tráfego IP ocasional ou moderado e normalmente tem um telefone próximo. | A taxa de transferência e o alcance dependem de BR/EDR e da conexão do NAP com a rede externa. Um projeto que usa o compartilhamento de internet do telefone depende desse telefone; outras arquiteturas podem usar um gateway NAP independente. |
| Rádio Wi-Fi dedicado | O produto precisa de alta taxa de transferência contínua ou conectividade sem depender de um telefone. | Acrescenta rádio, antena, trabalho de integração e orçamento de consumo. Avalie os requisitos de conformidade de RF aplicáveis ao rádio ou módulo escolhido e ao produto final. |
| BLE GATT → aplicativo complementar → internet | O produto troca poucos dados e o aplicativo pode encaminhá-los à nuvem. | Essa retransmissão personalizada não oferece uma conexão IP direta ao dispositivo. BLE IPSP é outra opção, cujo suporte deve ser verificado na pilha do dispositivo e no gateway; não é PAN. |

</div>

Em produtos que já precisam de Bluetooth de modo dual para áudio, serviços GATT ou perfis clássicos, PAN costuma ser a forma de menor custo incremental para adicionar acesso à internet sem um segundo subsistema de rádio — desde que o caso de uso aceite depender de um telefone próximo com o compartilhamento de internet ativado.

## Transporte de dados no iOS: retransmissão por BLE, Bluetooth clássico e PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

É importante distinguir três arquiteturas de conectividade para iPhone. A afirmação “Bluetooth clássico exige MFi”, sem ressalvas, é ampla demais: o iOS oferece suporte a perfis Bluetooth padronizados, e o Acesso Pessoal também pode usar Bluetooth. A restrição se aplica quando um aplicativo iOS precisa de um **canal de dados próprio** para um acessório Bluetooth clássico por meio do caminho External Accessory/iAP da Apple. A Apple documenta que o External Accessory se comunica por Bluetooth com acessórios MFi; em sua [pergunta e resposta técnica](https://developer.apple.com/library/archive/qa/qa1657/_index.html), esclarece que acessórios BLE usam Core Bluetooth e não precisam ser compatíveis com MFi.

<div align="center"><em>Tabela: opções de conexão entre acessório e internet no iOS</em></div>

<div align="center" markdown>

| Arquitetura | Caminho entre dispositivo e telefone | Implicação para o produto iOS | Taxa de transferência e contrapartidas de projeto |
|:------------|:-------------------------------------|:------------------------------|:----------------------------------------------|
| BLE → aplicativo → internet | Protocolo GATT próprio; o aplicativo iOS recebe os dados do dispositivo e os encaminha à nuvem. | BLE pode usar Core Bluetooth sem o caminho MFi do External Accessory. O aplicativo precisa gerenciar pareamento, enquadramento de dados, novas tentativas, execução em segundo plano e retransmissão à nuvem. | A capacidade de carga útil e o agendamento do BLE são limitados pelos parâmetros de conexão e pelo comportamento do iOS e do aplicativo. Essa opção costuma atender a pequenos volumes de dados intermitentes, mas não oferece conectividade IP geral e pode se tornar um gargalo para tráfego contínuo ou intenso. |
| Bluetooth clássico personalizado → aplicativo | Canal de dados personalizado entre um acessório Bluetooth clássico e um aplicativo iOS. | O framework [External Accessory](https://developer.apple.com/documentation/externalaccessory) destina-se a acessórios MFi; a Apple informa que ele é limitado a hardware MFi. Perfis padronizados compatíveis são um caso diferente. | Esse caminho exige um acessório MFi e o protocolo de acessório compatível, além da integração do aplicativo e da validação do produto. Por si só, não fornece conectividade IP direta ao dispositivo. |
| Bluetooth PAN → ponto de acesso do telefone → internet | Rede padrão PANU–NAP; o SF32 usa o serviço de compartilhamento de internet por Bluetooth ou o Acesso Pessoal do telefone. | O dispositivo usa o serviço de compartilhamento do telefone, e não um transporte próprio entre aplicativo e acessório. Ainda é preciso qualificar o telefone, a operadora e o comportamento desse serviço. | O SF32 executa seu próprio cliente IP sem retransmissão por um aplicativo. Isso não comprova uma vantagem de velocidade ou consumo de energia em relação ao BLE. Compare a taxa útil de transferência, o tempo de atualização e a energia consumida nos telefones previstos, usando os mesmos dados e servidor. Os resultados dependem do enlace Bluetooth, das políticas do telefone, da rede de saída e do servidor de destino. |

</div>

Para um assistente de voz, cliente OTA ou outro produto que precise de streaming contínuo ou tráfego HTTP/WebSocket direto, PAN pode evitar a retransmissão por um aplicativo BLE, mas considere-o um candidato de caminho de rede no iOS somente depois de testar o iPhone e a configuração do SDK de destino. O exemplo SiFli v2.5.1 também habilita A2DP para contornar o problema documentado de conexão somente PAN no iOS; A2DP não é uma exigência do protocolo PAN. PAN **não** substitui o aplicativo quando o produto precisa de interface de configuração, autenticação do usuário, notificações ou controle local; ele apenas evita que o plano de dados da aplicação fique limitado por essa retransmissão do aplicativo. O [Assistente de voz Xiaozhi para SF32](../../projects/sf32-xiaozhi.md) é um exemplo funcional dessa arquitetura.

## Compatibilidade de dispositivos SF32 { #device-support-on-sf32 }

Para SF32, escolha uma família com Bluetooth clássico e verifique a pilha PAN, a versão do SDK e a configuração da placa de destino. As famílias compatíveis com PAN da tabela usam Bluetooth de modo dual; isso é uma característica desses dispositivos SF32, não uma exigência do protocolo PAN.

<div align="center"><em>Tabela: suporte a PAN nas famílias SF32</em></div>

<div align="center" markdown>

| Família | Capacidade Bluetooth | Suporte a PAN |
|:--------|:---------------------|:--------------|
| SF32LB52x | Bluetooth de modo dual | Sim |
| SF32LB55x | Somente BLE | Não — PAN requer Bluetooth clássico |
| SF32LB56x | Bluetooth de modo dual | Sim |
| SF32LB57x | Bluetooth de modo dual | Verifique a pilha PAN e a placa de destino; a família não consta no exemplo PAN da versão de referência v2.5.1 |
| SF32LB58x | Bluetooth de modo dual | Sim |

</div>

Consulte [Visão geral do Bluetooth](overview.md#choose-ble-classic-or-dual-mode) para orientações mais amplas sobre a escolha entre BLE e dispositivos de modo dual.

## Exemplo PAN do SiFli-SDK { #sifli-sdks-pan-example }

O SiFli-SDK inclui uma implementação funcional do papel PANU em `example/bt/pan`, compatível com `eh-lb52x`, `eh-lb56x`, `eh-lb58x` e com as séries de placas `sf32lb52/56/58-lcd`. O exemplo se conecta ao serviço PAN (NAP) do telefone e usa comandos do shell Finsh para demonstrar o uso real da rede — inclusive o comando `weather`, que consulta as condições atuais pelo enlace PAN estabelecido. A captura do README mostra os campos da resposta do serviço de clima: `id`, `name`, `country`, `path`, `timezone`, `timezone_offset`, `txt`, `code`, `temperature` e `last_update`. O exemplo retorna Chongqing (CN), Asia/Shanghai (+08:00), `多云` (em chinês, “nublado”; código `4`), temperatura `10` e atualização em `2025-01-13T15:54:09+08:00`. São dados da aplicação, não campos PAN/BNEP, e os valores podem variar.

Na inicialização, o exemplo ativa inquiry e page scan do Bluetooth para que o telefone possa localizar e parear com o dispositivo, cujo nome Bluetooth padrão é `sifli_pan`.

Para HTTPS, configure os certificados conforme o [README de PAN da v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md). Os certificados CA padrão ficam em `external/mbedtls_228/certs/default`; coloque os certificados CA adicionais necessários em `external/mbedtls_228/certs`. Eles devem estar em PEM, não DER: confira se o conteúdo inclui `-----BEGIN CERTIFICATE-----`, sem confiar apenas na extensão. Ao habilitar `PKG_USING_MBEDTLS_USER_CERTS` em `proj.conf`, a compilação reúne os arquivos desse diretório em `ports/src/tls_certificate.c`. Revise as âncoras de confiança necessárias para o servidor real. Uma conexão PAN bem-sucedida não comprova a validação do certificado TLS; verifique a identidade do servidor e a hora do dispositivo quando a verificação do período de validade depender dela.

O README chama o diretório de `mbedtls_288`, mas as capturas e o [código de geração de certificados da v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript) usam `mbedtls_228`. Os caminhos acima seguem a implementação. O script só aceita certificados cuja primeira linha comece com `-----BEGIN CERTIFICATE`; mantenha esse formato e confira os avisos de compilação para identificar arquivos ignorados.

<div align="center"><em>Tabela: comandos Finsh do exemplo PAN</em></div>

<div align="center" markdown>

| Comando | Efeito |
|:--------|:-------|
| `pan_cmd conn_pan` | Conecta ao PAN depois que o compartilhamento de rede do telefone estiver ativado. |
| `pan_cmd ota_pan` | Baixa e instala, pelo enlace PAN, a imagem de firmware especificada em `main.c`. |
| `pan_cmd set_retry_flag 1` / `0` | Ativa ou desativa a reconexão automática ao PAN. |
| `pan_cmd set_retry_time N` | Define o número máximo de tentativas de reconexão automática. |
| `pan_cmd autoconnect` | Inicia manualmente uma tentativa de reconexão depois que o telefone desativa e reativa o compartilhamento. |

</div>

Antes de executar o exemplo, confira estas opções no README da versão indicada e na plataforma de destino:

- Habilite `CONFIG_BLUETOOTH`, `CONFIG_BT_PROFILE_CUSTOMIZE`, `CONFIG_CFG_PAN` e `CONFIG_BSP_BT_CONNECTION_MANAGER`. O exemplo também habilita A2DP para contornar o problema documentado do iOS ao conectar somente PAN; A2DP não é uma exigência do protocolo PAN.
- `CONFIG_BT_FINSH` habilita os comandos opcionais de controle Bluetooth. Mantenha as funções do shell necessárias aos comandos que serão testados.
- Configure `CONFIG_BSP_BLE_NVDS_SYNC` conforme o processador que executa Bluetooth: o README o habilita para HCPU e o desabilita para LCPU. Não copie sem alterações uma configuração com outra distribuição entre processadores.
- Para reconectar ao último dispositivo, confira `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE` e `CONFIG_PKG_USING_FLASHDB`. Valide a persistência das configurações após reiniciar e limite as tentativas com os controles de reconexão da tabela acima, em vez de tentar indefinidamente.

## Suporte e qualificação por sistema operacional móvel { #mobile-phone-os-support-and-qualification }

O telefone é o **NAP** do PAN e faz parte do caminho de rede do produto; não é apenas uma ferramenta de provisionamento. Considere o sistema operacional, o modelo do aparelho, o plano da operadora e as regras de compartilhamento de internet como parte da configuração compatível do produto. Parear por Bluetooth não basta: o telefone precisa disponibilizar um serviço PAN de compartilhamento de internet por Bluetooth e encaminhar o tráfego depois que o PANU se conectar.

<div align="center"><em>Tabela: suporte a Bluetooth PAN por sistema operacional móvel</em></div>

<div align="center" markdown>

| Sistema operacional móvel | O que a documentação da plataforma informa | Orientação para iniciar no SF32 | Limite de qualificação do produto |
|:--------------------------|:--------------------------------------------|:-------------------------------|:---------------------------------|
| **iOS / iPadOS com serviço celular** | A [documentação do Acesso Pessoal da Apple](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27) lista o Bluetooth como método de conexão e informa que o Acesso Pessoal compartilha a conexão celular do telefone. | Siga o [procedimento iOS do Xiaozhi da SiFli](https://docs.sifli.com/projects/xiaozhi/get-started/): use um telefone com serviço celular ativo, ative o Acesso Pessoal antes do pareamento, mantenha o Bluetooth ligado e pareie/conecte o dispositivo SF32. Se `sifli-pan` não aparecer, o guia da SiFli observa que reiniciar o telefone pode ajudar. | A disponibilidade do Acesso Pessoal, os limites de dados e o número de dispositivos conectados dependem da operadora e do modelo do iPhone. Teste cada versão de iOS/iPadOS, classe de aparelho e plano de operadora compatíveis; não deduza suporte apenas porque o ponto de acesso Wi-Fi funciona. |
| **Android** | A [Ajuda do Android](https://support.google.com/android/answer/9059108) informa que a maioria dos telefones Android pode compartilhar dados móveis por Bluetooth: primeiro pareie, configure a conexão de rede Bluetooth no outro dispositivo e então ative o **compartilhamento de internet por Bluetooth**. | Ative o compartilhamento de internet por Bluetooth antes de executar `pan_cmd conn_pan`. Os nomes das opções e os menus variam conforme o fabricante, a versão do Android e as políticas empresariais; registre o caminho exato para cada telefone qualificado. | O Google informa que isso está disponível na *maioria*, não em todos os telefones Android. Operadoras podem limitar o compartilhamento de internet ou cobrar por ele, e fabricantes podem ocultar ou alterar o controle. Teste as combinações de aparelho, sistema e operadora que serão comercializadas; não presuma suporte apenas com base na versão do Android. |
| **HarmonyOS e outros sistemas móveis derivados do Android** | Este guia não afirma que há suporte a PAN em toda a plataforma. As implementações de Bluetooth e compartilhamento de internet podem derivar do Android, mas variar por modelo, mercado, versão, configuração da operadora ou política de gerenciamento do dispositivo. | Procure a opção de compartilhamento de internet por Bluetooth, pareie o telefone com o SF32 e confirme o tráfego IP real usando o exemplo PAN. | Considere cada combinação exata de aparelho, versão do sistema, região e operadora como **pendente de qualificação** até passar pelo mesmo registro de validação usado para Android. Não anuncie suporte apenas com base na marca ou no pareamento Bluetooth. |

</div>

### Configuração no telefone { #phone-side-setup }

<div align="center"><em>Figura: locais ilustrativos dos controles Acesso Pessoal do iOS e compartilhamento de internet por Bluetooth do Android</em></div>

![Configurações ilustrativas do Acesso Pessoal no iOS e do compartilhamento de internet por Bluetooth no Android](assets/mobile-hotspot-switches-illustrative.png)

Esta figura é uma referência ilustrativa das configurações, não uma captura literal da tela do sistema operacional. Os rótulos e a localização dos menus variam conforme a versão do iOS/iPadOS, o fabricante do Android e as políticas de gerenciamento do telefone; procure **Allow Others to Join** (permitir que outras pessoas se conectem) no iOS/iPadOS ou a opção de compartilhamento de internet por Bluetooth no Android. A [captura do iOS do SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md) também mostra **Maximize Compatibility** ativado. Esse é um ajuste de exemplo, não um requisito do PAN; verifique se é necessário em cada telefone-alvo.

Siga esta sequência para cada telefone testado:

1. Verifique se o telefone consegue acessar a internet. O Acesso Pessoal da Apple compartilha dados móveis; confirme que a operadora permite esse uso. Alguns telefones Android também podem compartilhar uma conexão Wi-Fi, mas é necessário verificar essa capacidade no modelo e na versão exata do sistema.
2. Ative o compartilhamento de internet por Bluetooth ou o Acesso Pessoal do telefone **antes** de solicitar PAN pelo dispositivo SF32.
3. Pareie o telefone e o dispositivo; mantenha o telefone detectável se o sistema operacional exigir.
4. Execute `pan_cmd conn_pan` e verifique uma comunicação IP real, por exemplo com o comando `weather`. Uma conexão Bluetooth bem-sucedida não basta.
5. Desative o compartilhamento, coloque o telefone em repouso e reative-o, e afaste-o do alcance; confirme que a reconexão se comporta como o produto exige.

Se o compartilhamento só for ativado depois que a conexão Bluetooth já estiver estabelecida, reconecte o PAN explicitamente com `pan_cmd conn_pan`.

### Defina a matriz de telefones compatíveis com o produto { #define-a-shipping-phone-support-matrix }

Para um produto de consumo, publique as combinações compatíveis de **modelo do telefone + versão do sistema operacional + operadora/região**, e não apenas “iOS” ou “Android”. Para cada aparelho candidato, registre pelo menos: modelo, versão do sistema, operadora, serviço celular ativo e estado do SIM/eSIM, nome da opção de compartilhamento de internet, tempo até a primeira conexão, comportamento de reconexão após bloqueio de tela e perda do link de rádio, resultado com tráfego contínuo e qualquer ação do usuário necessária para restaurar o serviço. Repita essa matriz sempre que o aplicativo, o firmware PAN, o sistema do telefone ou o perfil da operadora mudar.

## Atualização OTA via PAN { #pan-based-ota-delivery }

A atualização OTA está habilitada por padrão no exemplo PAN: `pan_cmd ota_pan` baixa e instala, pelo mesmo link Bluetooth PAN usado para o tráfego de rede, uma imagem de firmware usando o fluxo OTA DFU_PAN documentado junto ao serviço de atualização de firmware do SiFli-SDK. É uma opção adequada para produtos que já usam PAN para transferir dados e não precisam de um segundo transporte OTA. Consulte [OTA e DFU](../../develop/firmware-topics/ota-dfu.md) para comparar PAN com BLE e outros transportes de atualização; planeje a reversão e a recuperação independentemente do transporte.

O README também descreve uma falha de compilação quando o destino selecionado não tem um `ptab.json` adequado para OTA. As capturas mostram como desabilitar o subprojeto DFU e o suporte de atualização do middleware para testar o exemplo sem OTA. Esse diagnóstico remove OTA; não é uma solução para lançar um produto que precise de atualizações. Forneça e valide o mapa de partições e a configuração de atualização corretos antes de habilitar esse caminho.

PAN oferece transporte, não uma garantia de autenticidade do firmware ou de recuperação. Antes do lançamento, valide a autenticação do servidor, a autenticidade e a integridade da imagem, a compatibilidade de destino e versão e a recuperação após interrupções. Teste perdas de conexão e cortes de alimentação e verifique a recuperação ou reversão real do bootloader; não presuma que o comando de download forneça essas proteções.

## Um produto SF32 real usando PAN { #a-real-sf32-product-using-pan }

O projeto [Assistente de voz Xiaozhi para SF32](../../projects/sf32-xiaozhi.md) é um exemplo concreto e funcional de PAN no SF32: ele usa Bluetooth PAN para acessar a internet por meio de um telefone pareado e transmite a interação por voz a um serviço na nuvem por essa conexão. É uma referência útil de como um produto completo integra a rede PAN, o tráfego de aplicação WebSocket/HTTP e a dependência do compartilhamento de internet do telefone de ponta a ponta.

## Solução de problemas { #troubleshooting }

O README também recomenda verificar a atribuição do endereço Bluetooth. Consulte o endereço com `nvds get_mac`. Use apenas um OUI atribuído à sua organização ou autorizado para o produto e atribua endereços únicos; não copie de um exemplo o OUI de outro fabricante. Em `nvds update addr 6 xxxxxxYYYYYY`, `YYYYYY` é o OUI com a ordem dos bytes invertida e `xxxxxx` representa os outros três bytes. Respeite a ordem de bytes do comando, em vez de colar sem alterações um endereço MAC exibido na tela.

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS` pode sobrescrever uma alteração manual. Se um endereço de teste autorizado não for preservado, o README recomenda desabilitar a opção, recompilar e regravar o firmware e depois definir o endereço novamente. Isso é um diagnóstico de teste, não uma política de atribuição para produção: valide, inclusive após reiniciar, a política automática ou de programação em fábrica pretendida antes do lançamento.

<div align="center"><em>Tabela: solução de problemas do Bluetooth PAN</em></div>

<div align="center" markdown>

| Sintoma | Verificações e ações |
|:--------|:---------------|
| A conexão PAN é estabelecida, mas os comandos de rede (por exemplo, `weather`) falham | Verifique o estabelecimento de BNEP, o endereço IP atribuído, a rota, o DNS, a disponibilidade do servidor e os erros de TLS, quando aplicável. O README também recomenda conferir o OUI do endereço MAC Bluetooth com `nvds get_mac`; altere-o com `nvds update addr 6 ...` apenas conforme uma política de atribuição autorizada. Um OUI inválido não é a única causa possível. |
| O telefone não detecta o dispositivo ou não consegue se conectar a ele | Confirme que o compartilhamento de internet do telefone está ativado *antes* da conexão e que o dispositivo está detectável (inquiry/page scan ativos). |
| O telefone pareia, mas `weather` ou outra operação IP falha | O pareamento não comprova um serviço PAN NAP. Verifique o compartilhamento por Bluetooth ou o Acesso Pessoal e confirme que o telefone consegue acessar a internet. Para dados móveis, confirme a permissão da operadora; para compartilhar Wi-Fi no Android, verifique o modelo e o sistema específicos. Confira a combinação testada na matriz de compatibilidade. |
| O PAN cai após uma mudança no estado de rede do telefone | Isso pode ocorrer; valide o comportamento em cada telefone compatível. Reconecte com `pan_cmd conn_pan` ou ative `pan_cmd set_retry_flag 1`, usando o limite de tentativas descrito acima para limitar a reconexão automática. |
| A OTA por PAN falha durante a transferência | Trate-a como qualquer outro transporte OTA: verifique a URL da imagem, o mapa de partições e o comportamento de reversão conforme [OTA e DFU](../../develop/firmware-topics/ota-dfu.md), em vez de presumir que a falha é do PAN. |

</div>

## Lista de verificação de inicialização { #bring-up-checklist }

- [ ] Verifique o hardware Bluetooth clássico e a pilha/configuração PAN para o SDK e a placa específicos. O exemplo de referência lista SF32LB52x/56x/58x; valide SF32LB57x separadamente. SF32LB55x oferece somente BLE.
- [ ] Decida se a dependência do compartilhamento de internet do telefone atende ao modelo de conectividade do produto ou se é necessário um rádio Wi-Fi dedicado.
- [ ] Inicie `example/bt/pan` na placa-alvo e confirme a configuração de compartilhamento de internet no telefone (Acesso Pessoal no iOS/iPadOS ou compartilhamento por Bluetooth no Android).
- [ ] Valide uma conexão PAN real e pelo menos uma operação de rede ponta a ponta (por exemplo, o comando `weather` do exemplo).
- [ ] Qualifique cada modelo de telefone, versão do sistema, região/plano de operadora e caminho da configuração de compartilhamento previstos; não publique uma declaração genérica de suporte a “iOS/Android”.
- [ ] Verifique se o OUI do endereço MAC Bluetooth do dispositivo é válido antes de depender das funções de rede.
- [ ] Se usar PAN para OTA, teste todo o fluxo `pan_cmd ota_pan`, incluindo a reversão, antes do lançamento.
- [ ] Defina o comportamento de reconexão/conexão automática (`set_retry_flag`, `set_retry_time`) de acordo com a frequência com que o telefone deverá estar ao alcance.

## Principais conclusões { #key-takeaways }

- O Bluetooth PAN transporta tráfego IP no estilo Ethernet por BR/EDR, usando BNEP sobre L2CAP. Não exige suporte a BLE. IPv6 por BLE usa o perfil separado IPSP, não PAN, e requer suporte verificado na pilha e no gateway.
- Os dispositivos SF32 usam o papel cliente **PANU** e normalmente se conectam a um telefone que atua como **NAP** por meio do compartilhamento de internet ou do Acesso Pessoal.
- No iOS, acessórios BLE podem usar Core Bluetooth sem MFi; já um canal próprio entre aplicativo e acessório Bluetooth clássico via External Accessory/iAP requer MFi. Com PAN, o dispositivo SF32 usa o serviço de compartilhamento de internet do telefone e seu próprio cliente IP, sem depender da retransmissão por um aplicativo BLE.
- O exemplo PAN de referência lista os alvos SF32LB52x/56x/58x. SF32LB57x tem hardware de modo dual, mas exige validação separada da pilha PAN e da placa; SF32LB55x oferece apenas BLE e não pode usar PAN.
- `example/bt/pan` do SiFli-SDK é uma implementação de referência funcional, com comandos Finsh para conexão, reconexão e entrega de OTA via PAN.
- PAN com compartilhamento pelo telefone é adequado para tráfego IP ocasional ou moderado quando normalmente há um telefone por perto. Para alta taxa contínua ou operação independente do telefone, avalie Wi-Fi dedicado ou outra conexão de rede independente; um gateway NAP que não seja um telefone também é possível.
