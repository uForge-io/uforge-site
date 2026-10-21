---
icon: lucide/usb
description: "Como usar o hardware USB do SF32 com CherryUSB: aplicações CDC, HID, MSC, áudio e MTP, verificação de descritores e testes de enumeração em diferentes sistemas operacionais."
tags:
    - Desenvolvimento
    - USB
---

# USB e CherryUSB { #usb-and-cherryusb }

Para dispositivos SF32 e placas com hardware USB compatível, a documentação e os exemplos do SiFli-SDK mostram a integração com CherryUSB. Confirme quais papéis e classes USB são compatíveis com o chip, a placa e a versão do SDK específicos, e trate o USB como uma pilha de software completa, não apenas como um recurso de hardware.

O desenvolvimento USB envolve firmware, descritores, sistemas operacionais host, comportamento da alimentação e ferramentas de produção. Um dispositivo que enumera uma vez no notebook de desenvolvimento ainda não está concluído.

## Aplicações { #use-cases }

- Porta serial USB CDC.
- Dispositivos HID.
- Armazenamento MSC.
- Microfone/alto-falante USB Audio.
- MTP.
- Suporte, como host USB, a periféricos CDC, HID, MSC, UVC e UAC, conforme o suporte do SDK e da placa.

## Fluxo de trabalho { #practical-workflow }

1. Confirme se a placa oferece o conector USB e o caminho de alimentação necessários.
2. Comece pelo exemplo USB do SDK mais próximo da aplicação desejada.
3. Teste a enumeração no Windows, macOS e Linux.
4. Verifique a suspensão e a retomada, além do comportamento ao reconectar o cabo.
5. Registre VID/PID, descritores e requisitos dos drivers host.

## O que testar { #what-to-test }

- Conecte o dispositivo antes de ligá-lo; depois, teste a conexão e a desconexão durante o funcionamento.
- Reset com o dispositivo conectado.
- Suspensão e retomada do host.
- Desconexão do cabo durante uma transferência.
- Enumeração no Windows, macOS e Linux.
- Comportamento do dispositivo composto quando várias classes estão habilitadas.
- Informe aos usuários que cabos USB somente para carga não permitem comunicação de dados.

## Checklist dos descritores { #descriptor-checklist }

- A titularidade do VID/PID está definida.
- A string do produto está finalizada ou versionada.
- O comportamento do número de série está definido.
- Os valores de classe/subclasse/protocolo correspondem ao driver do sistema host previsto.
- As interfaces compostas permanecem estáveis entre versões do firmware.

## Exemplos do SDK { #sdk-examples }

O [índice oficial de exemplos CherryUSB do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) organiza separadamente os exemplos de USB Device e USB Host. Comece pelo exemplo correspondente ao papel USB e à classe desejada; aplique à implementação do produto as verificações de descritores, alimentação e compatibilidade com o host.

<div align="center"><em>Tabela: Exemplos CherryUSB do SiFli-SDK para SF32LB58x</em></div>
<div align="center" markdown>

| Papel USB | Exemplo | Ponto de partida |
| --- | --- | --- |
| Dispositivo | [Microfone USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | Microfone USB Audio Class 1 |
| Dispositivo | [Microfone e alto-falante USB](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | Áudio bidirecional USB Audio Class 1 |
| Dispositivo | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | Dispositivo de comunicação USB |
| Dispositivo | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | Ponte USB-UART |
| Dispositivo | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Dispositivo USB composto |
| Dispositivo | [Mouse HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | Dispositivo apontador USB HID |
| Dispositivo | [MSC com memória NOR Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Armazenamento em massa com NOR Flash |
| Dispositivo | [MSC com disco RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Armazenamento em massa com RAM |
| Dispositivo | [MSC com dois discos RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Duas unidades lógicas armazenadas em RAM |
| Dispositivo | [MSC com SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Armazenamento em massa com cartão SD ou eMMC |
| Dispositivo | [MTP com DFS e disco RAM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Dispositivo MTP |
| Host | [Host CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Comunicação com um periférico CDC ACM |
| Host | [Host HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | Conexão e leitura de um periférico HID |
| Host | [Host MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | Conexão de um periférico de armazenamento em massa USB |
| Host | [Host UVC + UAC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | Periféricos USB de vídeo e áudio |

</div>
