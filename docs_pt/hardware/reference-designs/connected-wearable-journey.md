---
icon: lucide/waypoints
description: "Um roteiro prático de projeto de referência SF32, da validação com a placa de desenvolvimento SF32LB52 ao planejamento de hardware e firmware personalizados para um dispositivo vestível conectado."
tags:
    - Hardware
    - Projeto de referência
---

# Roteiro de projeto de referência para um dispositivo vestível conectado { #connected-wearable-reference-design-journey }

Este roteiro descreve a validação de um produto conectado compacto, alimentado por bateria, com tela, BLE e entrada de sensor. Não é um esquemático publicado, uma BOM nem um pacote de placa de referência validado. Use-o para estabelecer e testar sua própria configuração de hardware e software antes de projetar o hardware personalizado.

1. **Selecione e estabeleça uma configuração de referência.** Consulte a [Família SF32](../../sf32-products/family/SF32_family.md) e o [Seletor de produtos SF32](../../sf32-products/product-selector.md) para reduzir a lista de candidatos. Execute `hello_world` do SiFli-SDK em uma [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) ou em uma placa disponível que atenda às restrições de hardware e ofereça as interfaces necessárias. Registre a revisão da placa, a versão ou o commit do SDK, os comandos de compilação e gravação e o log da interface serial.
2. **Valide as funções do produto.** Siga os [Tutoriais](../../getting-started/tutorials/overview.md) para verificar o tratamento de entradas e sensores, o BLE, uma interface de usuário simples, o armazenamento, se necessário, e o procedimento de recuperação pela interface serial.
3. **Valide as interações do sistema.** Use [Gráficos](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md) e [Baixo consumo](../../learn/low-power/overview.md) para testar em conjunto a atualização da tela, a atividade sem fio e a suspensão/retomada.
4. **Prepare o hardware personalizado.** Use o guia de projeto e a lista de verificação do chip selecionado, disponíveis em [Projeto para produção](../design-for-production.md). Confirme os requisitos e as premissas referentes à tela, ao armazenamento, à bateria, à antena/RF e à programação e aos testes.
5. **Prepare as evidências para a liberação.** Preserve o nome e a revisão da placa, a versão ou o commit do SDK, uma imagem de firmware validada, os logs, o consumo medido em cada cenário e suas condições, o comportamento de recuperação/OTA, as escolhas de BOM e as conclusões da lista de verificação.

Uma demonstração bem-sucedida, por si só, não conclui este roteiro. Os procedimentos de compilação, gravação e recuperação devem ser reproduzíveis, com medições que comprovem o funcionamento conjunto dos principais subsistemas em hardware representativo. Registre o cenário de operação, a tensão de alimentação e as condições de medição junto de cada resultado de consumo, para que outro engenheiro possa reproduzir a comparação.
