---
icon: lucide/blocks
description: "Visão geral de tópicos de firmware do SF32 comuns a várias plataformas: tabelas de partição, OTA/DFU, USB, gerenciamento de energia, logs e análise de falhas."
tags:
    - Desenvolvimento
    - Firmware
---

# Tópicos de firmware { #firmware-topics }

Estes tópicos se aplicam a diferentes plataformas e abordam decisões de firmware necessárias para transformar exemplos em produtos: estrutura de inicialização, partições, OTA, USB, gerenciamento de energia, logs e análise de falhas.

Leia estas páginas antes de alterar a organização do firmware, o comportamento das atualizações ou a política de baixo consumo. Erros nessas áreas podem não impedir uma compilação bem-sucedida, mas podem dificultar a recuperação, a depuração e o lançamento do produto.

## Tópicos { #topics }

<div align="center"><em>Tabela: Tópicos de firmware</em></div>

<div align="center" markdown>

| Tópico | Por que é importante |
|:------|:---------------|
| [Tabelas de partições](partition-tables.md) | Define a organização do firmware, do sistema de arquivos, do OTA e do armazenamento. |
| [OTA e DFU](ota-dfu.md) | São necessários para atualizações em campo e planos de recuperação. |
| [USB e CherryUSB](usb-cherryusb.md) | Apresenta recursos USB nos modos dispositivo e host, além do que uma simples indicação na ficha técnica revela. |
| [Gerenciamento de energia](power-management.md) | Transforma uma demonstração funcional em um produto pronto para operar com bateria. |
| [Logs e análise de falhas](logging-crash-analysis.md) | Permitem diagnosticar as falhas. |

</div>

## Regra prática { #practical-rule }

Antes de alterar o comportamento da inicialização, do OTA, do sistema de arquivos ou do armazenamento, entenda a tabela de partições e verifique o procedimento de recuperação. Uma falha da aplicação é inconveniente; um layout incorreto de inicialização ou atualização pode dificultar a recuperação da placa.

## Lista de verificação de prontidão do produto { #product-readiness-checklist }

- [ ] Há um comando testado para gravar o dispositivo inteiro, independente do fluxo normal de OTA.
- [ ] O layout das partições está documentado no repositório do produto.
- [ ] O comportamento em caso de falha de OTA/DFU foi testado.
- [ ] Se houver USB, os descritores USB e a responsabilidade pelo VID/PID estão documentados.
- [ ] Os modos de baixo consumo foram medidos em hardware real.
- [ ] Os logs de falha podem ser decodificados a partir do binário da versão lançada.
- [ ] Os procedimentos de gravação para a fábrica e para o desenvolvimento são distintos.
