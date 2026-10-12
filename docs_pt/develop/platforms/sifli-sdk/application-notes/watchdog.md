---
icon: lucide/timer-reset
title: "Configurar o watchdog"
description: "Ative, alimente e valide os caminhos do watchdog HCPU e LCPU do SF32 com o SiFli-SDK."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Watchdog]
---

# Configurar o watchdog { #configure-the-watchdog }

O SiFli-SDK documenta o watchdog em dois níveis: o hardware acessado pela HAL e o driver RT-Thread usado pelas aplicações. Os nomes das instâncias, o escopo do reset e as opções de clock variam entre as famílias; consulte a comparação abaixo e confirme a configuração do SDK do alvo antes de depender de um comportamento específico.

<div align="center" markdown>

<em>Tabela: Comportamento do watchdog documentado por família</em>

| Família | Comportamento do watchdog segundo a HAL | Clock indicado no guia HAL |
|---|---|
| SF32LB52x | O guia HAL descreve watchdogs dedicados para HCPU e LCPU, capazes de gerar interrupções ou resetar o próprio subsistema, além de um IWDT de sistema que reinicia o chip inteiro. | A descrição do contador usa um clock de 32K; o guia não especifica uma opção de seleção de clock própria do 52x. |
| SF32LB55x | WDT1 do HCPU e WDT2 do LCPU podem gerar interrupções; o reset por hardware fica restrito ao respectivo subsistema. O IWDT de sistema não gera interrupções, mas pode reiniciar o chip inteiro. | Selecionável entre RC10K e 32K LXT. |
| SF32LB56x / SF32LB58x | O guia HAL informa que WDT1/WDT2 também podem reiniciar o chip inteiro. | RC10K; o clock deixou de vir do clock de baixo consumo de 32K. |

</div>

!!! warning "Escopo do guia do watchdog para RT-Thread"
    O [guia de uso do watchdog](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html) é publicado no caminho `sf32lb52x`, mas o texto identifica explicitamente o SF32LB55X. Trate o tempo limite padrão de 30 segundos, a alimentação pela thread IDLE, o comportamento durante o sono e a sequência de reset da aplicação descritos abaixo como orientação para a configuração 55x documentada, e não como garantia válida para toda a família. Confira esses pontos no código-fonte e na configuração gerada para a família do alvo.

## Ativar e configurar o watchdog { #enable-and-configure-the-watchdog }

No diretório do projeto, execute `sdk.py menuconfig` e ative a opção de watchdog na configuração dos drivers de dispositivo do RT-Thread. O nome exato do menu pode variar conforme a versão do SDK; consulte a documentação da família de destino e confira o `rtconfig.h` gerado antes de compilar.

O guia de uso do watchdog indicado acima mostra duas configurações distintas:

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer` ativa o temporizador watchdog de hardware do chip.
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers` ativa o driver do RT-Thread.

Para a configuração 55x descrita no guia indicado, o tempo limite padrão documentado é de 30 segundos. No menu do driver, `(30) Watch Dog timeout (NEW)` permite selecionar outro valor. Confirme o valor padrão da família-alvo em `menuconfig` e mantenha a configuração gerada junto com a imagem do firmware.

As figuras abaixo mostram a localização do menu e o campo de tempo limite no guia indicado. Como o caminho da URL e a família mencionada no texto divergem, use-as apenas como ilustração; confira o caminho e o valor padrão reais na saída de `menuconfig` do projeto.

![Opção do driver de watchdog no menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>Figura: Menu do driver de watchdog mostrado no guia de uso do watchdog indicado.</em></div>

![Opção do temporizador de watchdog no menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>Figura: Configuração do temporizador de watchdog mostrada no guia de uso do watchdog indicado.</em></div>

## Estratégia para alimentar o watchdog { #feeding-policy }

O sistema alimenta o watchdog a partir da thread `IDLE` do RT-Thread. Se nenhuma thread da aplicação permanecer em execução contínua por mais tempo que o tempo limite configurado, não é necessário adicionar código à aplicação.

Se uma thread de alta prioridade precisar executar continuamente por mais tempo que o tempo limite, alimente o watchdog nessa thread com:

```c
rt_hw_watchdog_pet();
```

Não adicione um loop incondicional de alimentação que esconda uma parada do escalonador ou um deadlock. O ponto de alimentação deve indicar que o trabalho supervisionado está avançando normalmente.

## Comportamento em suspensão e reinicialização { #sleep-and-reset-behavior }

- Ao entrar em `Standby` ou `Hibernate`, o watchdog é desativado e volta a ser ativado após o despertar.
- Nos demais modos de suspensão, o watchdog continua em execução; o sistema precisa despertar e alimentá-lo antes que o tempo limite expire.
- O HCPU usa o watchdog do sistema. Quando o tempo limite expira, o chip inteiro é reiniciado.
- O LCPU usa o watchdog do subsistema LCPU. Quando o tempo limite expira, primeiro é gerada uma interrupção; em seguida, o manipulador da interrupção provoca a reinicialização por software do chip inteiro.

## Sequência de validação { #validation-sequence }

1. Registre a família do chip, a revisão do SDK, o tempo limite, quem é responsável por alimentar o watchdog e o modo de suspensão.
2. Confirme que uma carga normal de trabalho chega ao ponto previsto de alimentação.
3. Interrompa deliberadamente o caminho de alimentação e confirme o escopo da reinicialização e o comportamento de inicialização esperados.
4. Repita o teste em cada modo de suspensão compatível, especialmente `Standby` e `Hibernate`.
5. Guarde as observações da reinicialização e as evidências de diagnóstico durante a inicialização junto com o teste de recuperação do produto.

## Fontes oficiais { #official-sources }

- [Guia de uso do watchdog (em inglês; publicado no caminho SF32LB52x, o texto identifica SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [Guia de uso do watchdog (em chinês; mesmo caminho SF32LB52x, o texto identifica SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [Guia HAL WDT do SF32LB52x (em inglês)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [Guia HAL WDT do SF32LB55x (em chinês; inclui notas comparativas de 56x/58x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

Estas rotas de notas de aplicação do watchdog específicas por família não puderam ser verificadas: `sf32lb55x/app_note/watchdog.html`, `sf32lb56x/app_note/watchdog.html` e `sf32lb58x/app_note/watchdog.html`. As buscas e tentativas de acesso direto foram inconclusivas; isso não demonstra que as rotas retornem 404.
