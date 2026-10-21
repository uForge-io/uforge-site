---
icon: lucide/infinity
description: "ArduinoCore-zephyr na SF32LB52 DevKit LCD: adequação da plataforma, identificação da placa, loader e modos de compilação, limites de integração e escalonamento."
tags:
    - Desenvolvimento
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) é um core Arduino baseado em Zephyr para SF32. É uma opção útil para sketches, experimentos com periféricos, demonstrações e protótipos iniciais na **SiFli SF32LB52 DevKit LCD**.

!!! warning "Core beta"
    A OpenSiFli classifica este core como **BETA**. Recursos, APIs, conteúdo do pacote, comportamento do loader e versões podem mudar. Antes de adotar esse caminho para um produto, confirme o comportamento atual no README e em Releases do projeto.

Para a instalação inicial do IDE, a seleção da placa e da porta, a instalação do bootloader e a verificação do Blink, consulte [Primeiros passos com Arduino](../../../getting-started/arduino/getting-started-arduino.md). Esta página ajuda a decidir se Arduino é adequado e a manter um projeto baseado em Arduino depois da primeira execução.

## Quando escolher Arduino { #where-arduino-fits }

Escolha Arduino quando a iteração rápida e o modelo familiar de sketch forem mais importantes do que o acesso completo aos recursos específicos do SF32. É uma boa opção para provas de conceito, validação simples de periféricos, projetos educacionais ou de demonstração e equipes que já mantêm uma base de código Arduino.

Passe para o [SiFli-SDK](../sifli-sdk/overview.md) quando o produto depender de uma base de firmware para produção, ajustes na pilha Bluetooth, aplicações com uso intensivo de gráficos, otimização de baixo consumo, bring-up da placa ou middleware do fornecedor. Use o [Zephyr](../zephyr/overview.md) quando precisar controlar diretamente o devicetree, o Kconfig e a estrutura de aplicações nativa do Zephyr.

<div align="center"><em>Tabela: adequação da plataforma Arduino</em></div>

<div align="center" markdown>

| Escolha Arduino para | Prefira outro caminho para |
|:-------------------|:------------------------|
| Sketches curtos e experimentos rápidos com periféricos. | Um produto que exija um conjunto amplo e validado de recursos SF32. |
| Equipes que já trabalham com Arduino IDE ou Arduino CLI. | Bring-up de uma placa personalizada ou controle aprofundado de Flash, alimentação e middleware. |
| Demonstrações e protótipos iniciais de viabilidade. | Configuração, drivers e estrutura RTOS nativas do Zephyr. |

</div>

## Identificação da placa { #board-identity }

O pacote público atual tem como alvo a SF32LB52 DevKit LCD. Registre estes valores no projeto e nos relatos de problemas: eles determinam como o sketch é compilado, carregado e associado à placa.

<div align="center"><em>Tabela: identificação da placa Arduino</em></div>

<div align="center" markdown>

| Item | Valor |
|:-----|:------|
| Nome no Boards Manager | **SiFli Serial Boards** |
| Plataforma Arduino | `sifli:sf32lb52` |
| Placa | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Alvo do Zephyr | `sf32lb52_devkit_lcd` |
| Variante | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Ferramenta de gravação | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

Um identificador de placa SiFli ou Zephyr com nome semelhante não é intercambiável com este FQBN. A seleção da placa define os parâmetros de compilação e gravação.

## Modelo de compilação e loader { #build-and-loader-model }

O ArduinoCore-zephyr combina uma API Arduino voltada a sketches com um loader Zephyr e uma configuração específica da placa. Os dois menus de opções afetam o comportamento de inicialização e de linkedição, não apenas as opções do compilador.

<div align="center"><em>Tabela: opções de compilação e loader</em></div>

<div align="center" markdown>

| Opção | Comportamento | Implicação de engenharia |
|:-------|:---------|:------------------------|
| Modo de compilação `Standard` | Inicia o sketch depois de carregá-lo. | Use para a execução normal do sketch. |
| Modo de compilação `Debug` | Mantém o shell do Zephyr aguardando o comando `sketch`. | Só é útil quando o shell faz parte do fluxo de depuração. |
| Modo de linkedição `Dynamic` | Empacota o sketch para o fluxo normal baseado no loader. | Inclui o loader no orçamento de execução e de memória. |
| Modo de linkedição `Static` | Usa uma imagem com linkedição estática. | Use para investigar o loader ou quando os compromissos envolvidos forem explicitamente compreendidos. |

</div>

Comece com **Standard** e **Dynamic**. No modo Debug, o sketch carregado só começa a executar depois que você chama `sketch` no shell do Zephyr. Esse é um motivo comum para um carregamento aparentemente bem-sucedido não resultar em atividade da aplicação.

O loader é um artefato separado, específico da placa. Burn Bootloader normalmente é uma operação de primeiro uso, atualização ou recuperação, não uma etapa necessária em todo carregamento de sketch. Registre juntos a versão do pacote Arduino e qualquer atualização do loader; premissas incompatíveis são difíceis de diagnosticar depois.

## Limites de integração { #integration-boundaries }

Trate o core Arduino como uma camada de integração, não como substituto da plataforma Zephyr subjacente. Um sketch pode exigir símbolos ou subsistemas Zephyr que o loader não expõe ou habilita. Os sintomas típicos incluem símbolo Zephyr indefinido, subsistema ausente ou pressão de memória causada pelo carregamento dinâmico e pelo shell.

Antes de adicionar uma biblioteca ou um recurso ao protótipo do produto, confirme todos estes pontos:

- Versão exata do pacote, FQBN, modo de compilação e modo de linkedição.
- Revisão da placa de destino e procedimento de download serial e recuperação.
- Exemplo testado para o periférico ou a biblioteca necessários.
- Orçamento mensurável de RAM e Flash com a configuração de loader prevista.
- Caminho de recuperação pelo loader Arduino ou pelo firmware SiFli-SDK.

Não conclua que uma biblioteca é compatível apenas porque existe uma API Arduino ou um driver Zephyr com nome semelhante. Valide no hardware de destino a combinação completa de sketch, loader, placa e pacote.

## Diagnóstico e encaminhamento { #diagnose-and-escalate }

Se a placa não for detectada, não puder ser gravada ou não executar o Blink, comece pelo guia de primeira execução. Depois de confirmar esse funcionamento básico, use a tabela a seguir para delimitar a investigação.

<div align="center"><em>Tabela: diagnóstico inicial de problemas Arduino</em></div>

<div align="center" markdown>

| Sintoma após o funcionamento básico | Primeira verificação |
|:-------------------------------------------|:--------------------|
| O sketch só inicia depois de executar `sketch`. | Confirme se o modo Debug foi escolhido intencionalmente. |
| Falta uma função ou um subsistema do Zephyr. | Confira o README do core e as exportações/configurações do loader. |
| Falha de memória ou instabilidade. | Meça o orçamento do sketch, considere o carregamento dinâmico e o shell do Zephyr e avalie Static somente com um plano de recuperação. |
| A biblioteca compila, mas o hardware não funciona. | Confirme as premissas sobre os pinos da placa e teste com um exemplo mínimo específico para ela. |
| A gravação ou a recuperação falha. | Restabeleça a base Arduino documentada e, se necessário, use o caminho de recuperação SiFli-SDK da placa. |

</div>

Para relatar um problema com informações úteis, inclua a versão do pacote, a versão do IDE ou da CLI, o sistema operacional, o FQBN, os modos de compilação e de linkedição, a revisão da placa, a saída completa da gravação e o log serial.

## Páginas relacionadas { #related-pages }

- [Primeiros passos com Arduino](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
