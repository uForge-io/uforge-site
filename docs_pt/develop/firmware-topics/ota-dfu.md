---
icon: lucide/upload-cloud
description: "Use o middleware DFU v2 do SiFli-SDK para atualizar o firmware por USB-CDC, BLE e Bluetooth PAN, com os pares documentados de exemplos de aplicação e carregador."
tags:
    - Desenvolvimento
    - OTA
    - DFU
---

# OTA e DFU { #ota-and-dfu }

DFU v2 é o middleware do SiFli-SDK para fluxos de atualização de firmware por DFU e OTA. Ele oferece três canais de transporte: USB-CDC, BLE e Bluetooth PAN. Cada canal inclui um aplicativo de usuário e o subprojeto de carregador correspondente.

Comece escolhendo o transporte compatível com o caminho de atualização do produto. Em seguida, use o exemplo de aplicação correspondente; o carregador associado é incluído automaticamente na compilação.

## Estrutura do DFU v2 { #dfu-v2-structure }

<div align="center"><em>Figura: Estrutura dos exemplos DFU v2</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

O aplicativo e o carregador de cada canal foram projetados para funcionar em conjunto. Ao compilar o aplicativo, o SDK usa a lógica `AddDFU_*` de `building.py` para incluir o carregador correspondente como subprojeto; não o compile separadamente. No exemplo BLE, o aplicativo em execução pode atualizar imagens de firmware que não sejam a imagem de firmware do HCPU; para atualizar esta última, é preciso mudar para o carregador.

## Compatibilidade e configuração { #compatibility-and-configuration }

O DFU v2 vem desabilitado por padrão; habilite explicitamente `USING_DFU_V2` na configuração do middleware. Ele está disponível somente na HCPU (`BF0_HCPU`) e não pode ser habilitado junto com as opções legadas de DFU `BSP_USING_DFU` ou `USING_DFU_PAN`. Ao habilitar o DFU v2, a configuração seleciona o FlashDB (`PKG_USING_FLASHDB`) para permitir a retomada de transferências.

USB CDC e BLE usam transporte push e são mutuamente exclusivos; escolha `DFU_V2_USE_CDC_TRANSPORT` ou `DFU_V2_USE_BLE_TRANSPORT`. O Bluetooth PAN usa transporte pull; habilite `DFU_V2_USE_PAN_TRANSPORT` junto com o modo iniciado pelo dispositivo (`DFU_V2_USE_DEVICE_MODE`) e o WebClient. Antes de definir a arquitetura de atualização do produto, confirme as opções disponíveis na versão do SDK de destino.

## Escolher um canal de atualização { #choose-an-update-channel }

<div align="center"><em>Tabela: Seleção do transporte DFU v2</em></div>

<div align="center" markdown>

| Canal | Caminho de atualização documentado | Aplicação típica |
| --- | --- | --- |
| USB-CDC | Um PC atualiza o dispositivo por uma porta serial virtual USB. | Produção, laboratório e manutenção com conexão cabeada. |
| BLE | Um aplicativo BLE no papel de periférico recebe a atualização. | Um aplicativo móvel atualiza um produto conectado. |
| Bluetooth PAN | O dispositivo usa a rede Bluetooth PAN para baixar a atualização de um servidor HTTP. | Produtos conectados que obtêm a própria imagem de atualização. |

</div>

## Revisão da atualização do produto { #product-update-review }

- [ ] O transporte escolhido corresponde às opções de conexão disponíveis no produto.
- [ ] O aplicativo e o carregador correspondente são compilados e testados como um único fluxo de atualização.
- [ ] A compatibilidade com a placa de destino foi confirmada no README do exemplo.
- [ ] Foram definidos o comportamento em caso de interrupção, a recuperação e o procedimento de assistência em fábrica.
- [ ] Para a versão do produto, foram revisadas a autenticidade e a integridade da imagem de firmware, a política de versões e a capacidade das partições.
- [ ] É possível coletar os registros de uma atualização malsucedida sem depender de um aplicativo funcional.

## Compilar um exemplo DFU v2 { #build-a-dfu-v2-example }

No diretório `project/` do exemplo, compile com:

```bash
scons --board=<board-name> -j8
```

O README de cada exemplo lista as placas compatíveis. A configuração do middleware DFU v2 fica em `middleware/dfu_v2` no SiFli-SDK.

## Exemplos DFU v2 do SDK { #dfu-v2-sdk-examples }

<div align="center"><em>Tabela: Exemplos oficiais DFU v2 do SiFli-SDK para SF32LB58x</em></div>

<div align="center" markdown>

| Canal | Aplicativo de usuário | Subprojeto do carregador |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

Para consultar o índice completo do código-fonte e a navegação atual do SDK, acesse os [exemplos DFU v2 do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
