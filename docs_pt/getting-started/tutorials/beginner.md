---
icon: lucide/footprints
description: "Tutoriais práticos de periféricos SF32 após hello_world: GPIO, FinSH, ADC, PWM, RTC e um pequeno projeto com uma placa de desenvolvimento."
tags:
    - Tutoriais
---

# Primeiros passos com periféricos { #beginner-tutorials }

Estes tutoriais dão sequência a [Primeiros passos](../index.md). Antes de começar, você já deve ter instalado as ferramentas do SiFli-SDK, gravado o `hello_world` pelo menos uma vez e saber abrir o console serial. Cada tutorial é intencionalmente curto: um conceito, um periférico e um critério de sucesso claro.

Os exemplos pressupõem uma placa da classe SF32LB52-DevKit-LCD, como a `sf32lb52-lcd_n16r8`. Se estiver usando outra placa, substitua o nome da placa no comando de compilação e confirme os nomes dos pinos, as instâncias dos periféricos e a configuração de armazenamento nos arquivos de suporte correspondentes.

Use esta série para desenvolver hábitos de trabalho confiáveis: valide um comportamento na placa, defina um critério de sucesso claro e preserve a configuração funcional antes de passar ao próximo periférico. O conteúdo é prático de propósito para quem está começando com o SDK SF32, mesmo que já conheça C para sistemas embarcados.

## Antes de começar { #before-you-start }

Siga este ciclo básico em todos os tutoriais:

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

Mantenha um terminal serial aberto. Muitos problemas comuns no início ficam mais fáceis de diagnosticar quando você consegue ver a saída de `rt_kprintf()` e o prompt `msh>` do FinSH.

Os exemplos em C são trechos, não arquivos-fonte completos. Inclua os cabeçalhos, as declarações, a inicialização específica da placa, a verificação de valores de retorno e a liberação de recursos necessários ao seu projeto e à versão do SDK.

<div align="center"><em>Tabela: Verificações antes de começar</em></div>

<div align="center" markdown>

| Item | Verificação |
|:-----|:------|
| Nome da placa | Corresponde a uma das configurações de placa compatíveis. |
| Porta serial | Abre normalmente e exibe a saída de inicialização. |
| Ferramenta de gravação | Permite gravar o firmware repetidamente sem trocar os cabos. |
| Esquema ou arquivos da placa | Estão disponíveis antes da escolha de recursos GPIO, ADC, PWM ou RTC. |
| Uma alteração por vez | Compile, grave e valide após cada pequena mudança. |

</div>

## Pisque um LED com GPIO { #blink-an-led-with-gpio }

**Objetivo:** controlar um pino GPIO pelo firmware, o equivalente embarcado a concluir a primeira compilação com sucesso.

**Tempo:** 15 minutos

**Comece por:** `example/hal/gpio` ou `example/rt_device/gpio`

O SDK do SF32, baseado no RT-Thread, disponibiliza GPIO pela API padrão **PIN device** do RT-Thread. Um loop mínimo para piscar o LED é:

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(1, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. Copie para o diretório do seu projeto o exemplo de GPIO mais próximo, ou edite o próprio exemplo enquanto aprende.
2. Localize o pino do LED no esquema ou nos arquivos de suporte da placa. Não tente adivinhar a identificação da porta nem do pino.
3. Compile e grave o firmware usando o mesmo nome de placa empregado no `hello_world`.
4. Confirme se o LED pisca na frequência esperada.
5. Altere o atraso para 100 ms, compile novamente e confirme se a frequência visível do piscar mudou.

**Critério de sucesso:** o LED alterna repetidamente, o console serial continua exibindo a saída normal de inicialização e a alteração do atraso muda a frequência do piscar.

**Se não funcionar:** confira a polaridade ativa, se o LED está conectado por meio de um transistor, se o pino já está sendo usado por outra função e se o nome de placa corresponde ao hardware em mãos.

**O que você aprendeu:** a abstração PIN device, as definições de pinos específicas da placa e o ciclo básico de editar, compilar, gravar e validar.

## Leia um botão usando uma entrada GPIO { #read-a-button-with-gpio-input }

**Objetivo:** ler uma entrada digital e reagir ao pressionamento de um botão.

**Tempo:** 20 minutos

**Comece por:** `example/rt_device/gpio`

Para ler um botão, use a mesma API PIN no modo de entrada. Comece com uma leitura simples para confirmar a ligação e o nível lógico:

No SDK SiFli, a API PIN device do RT-Thread não configura o pull-up ou pull-down do pad por meio de `rt_pin_mode()`. Para um botão ativo em nível baixo, confirme que a placa tem um resistor pull-up ou configure-o pelo pinmux específico da placa com `HAL_PIN_Set(...)`. O pad, a função e o domínio da CPU variam conforme a placa; não copie uma atribuição de pino sem verificá-la.

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

Para aplicações que vão além de um teste rápido, use uma interrupção em vez de manter um loop ocupado consultando o pino continuamente. Assim, o firmware pode reagir a uma borda de entrada sem reler o pino repetidamente; se o restante do projeto permitir que a CPU entre em repouso entre eventos, isso também pode reduzir o consumo:

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. Identifique um botão disponível ou um pino de entrada na sua placa.
2. Comece lendo o pino por polling e imprima o valor bruto enquanto pressiona e solta o botão.
3. Confirme se o botão é ativo em nível alto ou baixo.
4. Quando a leitura básica estiver funcionando, passe a usar um tratador de interrupção.
5. Alterne o estado do LED do Tutorial 1 a cada pressionamento do botão.
6. Adicione uma estratégia simples de debounce: ignore eventos por um curto intervalo ou valide o nível após um pequeno atraso.

**Critério de sucesso:** cada pressionamento físico provoca uma única ação prevista no firmware, sem disparos repetidos causados pelo repique do botão.

**Se não funcionar:** confirme que a placa fornece o resistor pull-up ou pull-down necessário ou que ele foi configurado pelo pinmux. Em seguida, verifique a polaridade do botão, a borda selecionada para a interrupção e se o pino também é usado pelo modo de inicialização, pela depuração ou por outro periférico.

**O que você aprendeu:** configuração de entradas digitais, lógica ativa em nível alto ou baixo, leitura por interrupção e por que o polling contínuo pode desperdiçar energia. Consulte a [Visão geral de baixo consumo](../../learn/low-power/overview.md#sleep-aware-firmware-design) para entender o motivo em nível de sistema.

## Use o shell e imprima mensagens de depuração { #use-the-shell-and-print-debug-output }

**Objetivo:** familiarize-se com o console FinSH e `rt_kprintf()` antes que a depuração fique mais difícil.

**Tempo:** 15 minutos

**Comece por:** `example/system/finsh`

O shell **FinSH** do RT-Thread oferece um prompt interativo `msh>` pela mesma UART usada para os logs de inicialização. Adote desde cedo estes hábitos:

- Use `rt_kprintf()` para gerar logs de depuração leves, em vez de escrever diretamente na UART.
- Use comandos integrados do shell, como `list_thread`, `list_device` e comandos de memória e estado, para inspecionar o sistema em execução.
- Mantenha os logs curtos e informativos; o excesso de mensagens pode alterar o timing e o consumo de energia.

1. Grave um dos exemplos anteriores e abra novamente o terminal serial.
2. Pressione Enter para obter o prompt `msh>`.
3. Execute `list_thread` e `list_device`.
4. Adicione chamadas a `rt_kprintf()` no tratador do botão do Tutorial 2.
5. Confirme se as mensagens aparecem quando você pressiona o botão.

**Critério de sucesso:** você consegue inspecionar threads e dispositivos pelo shell e relacionar suas mensagens de log com eventos físicos.

**Se não funcionar:** confira a taxa de transmissão serial, a porta selecionada, se o componente de shell está habilitado e se outro programa está mantendo a porta serial aberta.

**O que você aprendeu:** como inspecionar um sistema em execução sem conectar um depurador e usar logs simples sem transformar cada problema em uma tentativa às cegas de alterar o firmware.

## Leia um sensor analógico com o ADC { #read-an-analog-sensor-with-adc }

**Objetivo:** amostrar uma tensão analógica de um potenciômetro, sensor simples ou entrada de medição da bateria.

**Tempo:** 20 minutos

**Comece por:** `example/rt_device/adc/channel`

Para este exemplo RT-Thread, habilite `BSP_USING_ADC`, `BSP_USING_ADC1` e `RT_USING_ADC`; caso contrário, o SDK não registrará `bat1`. No SF32LB52, o canal 7 é conectado internamente a VBAT e não serve como entrada genérica para um sensor externo. Escolha um canal ADC e configure o pinmux de acordo com o chip e a placa específicos. No exemplo documentado para SF32LB52, o canal 0 usa PA28. No exemplo atual do SDK SiFli, `rt_adc_read()` retorna um valor de tensão escalado em unidades de 0,1 mV, não contagens ADC brutas; confirme a unidade e a conversão para o chip específico e a versão do driver que você usa.

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("bat1");
rt_adc_enable(adc, channel);
rt_uint32_t voltage_0p1mV = rt_adc_read(adc, channel);
```

1. Identifique na placa um pino compatível com ADC e o respectivo canal.
2. Confirme a faixa de tensão de entrada e se há um divisor de tensão ou circuito de condicionamento analógico.
3. Localize o dispositivo ADC registrado, habilite o canal e leia seu valor.
4. Aplique a conversão documentada para esse driver. No exemplo atual do SF32LB52, divida o valor retornado por 10 para obter milivolts; não aplique novamente uma fórmula baseada em contagens brutas e tensão de referência. Se houver um divisor externo, considere sua relação ao calcular a tensão antes do divisor.
5. Imprima o resultado pelo shell do Tutorial 3.
6. Varie a entrada lentamente e confirme se a leitura muda de forma contínua.

**Critério de sucesso:** o valor informado varia na direção esperada e corresponde a uma tensão de entrada plausível após aplicar a escala documentada e a relação de qualquer divisor da placa.

**Se não funcionar:** verifique o multiplexador de pinos, o número do canal, a escala e a calibração documentadas pelo driver, a faixa de entrada, se a entrada está flutuando e se o sensor precisa de alimentação ou de tempo para estabilizar antes da amostragem.

**O que você aprendeu:** o padrão `rt_device_find()` usado nos drivers de dispositivos do RT-Thread. Você poderá reutilizá-lo com I2C, SPI, PWM, armazenamento e drivers personalizados.

## Acione uma saída PWM { #drive-a-pwm-output }

**Objetivo:** gerar um sinal PWM para controlar o brilho de um LED ou acionar um buzzer simples.

**Tempo:** 20 minutos

**Comece por:** `example/rt_device/pwm`

O nome do dispositivo PWM depende do driver de timer habilitado na placa. O SDK usa nomes como `pwm3`, `pwmlp1` e `pwma1`; `pwm3` no exemplo abaixo é apenas ilustrativo, não um nome universal. Confirme o nome do dispositivo registrado e o multiplexador de pinos na configuração da placa.

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm3");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. Escolha um canal compatível com PWM e confirme o multiplexador de pinos.
2. Escolha um período adequado ao periférico: alto o bastante para evitar cintilação visível no LED ou dentro da faixa audível para um buzzer.
3. Varie o ciclo de trabalho para aumentar e reduzir gradualmente o brilho do LED.
4. Experimente alguns tons fixos no buzzer, alterando o período.
5. Desabilite o PWM e confirme se a saída retorna a um estado de repouso seguro.

**Critério de sucesso:** alterar o ciclo de trabalho muda o brilho ou alterar o período muda o tom; ao desabilitar o PWM, a saída permanece no estado esperado.

**Se não funcionar:** verifique se o pino está conectado à instância PWM, se o número do canal está correto, se o período e a largura do pulso estão em nanossegundos e se a carga externa precisa de um transistor de acionamento.

**O que você aprendeu:** a configurar o período e o ciclo de trabalho e a reutilizar, em outra classe de periférico, o padrão de driver de dispositivo visto no Tutorial 4.

## Mantenha a hora com o RTC { #keep-time-with-the-rtc }

**Objetivo:** consultar e ajustar a hora usando o RTC integrado ao chip.

**Tempo:** 15 minutos

**Comece por:** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d\n",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. Ajuste o horário do RTC uma vez usando um mecanismo compatível, como um comando do shell.
2. Imprima a hora atual periodicamente.
3. Desligue e ligue novamente a placa e confirme se a hora foi mantida.
4. Se a hora não for mantida, verifique o circuito de alimentação de backup da placa antes de alterar o firmware.

Ao testar a retenção, não redefina o RTC incondicionalmente a cada inicialização; isso ocultaria se o horário anterior foi mantido.

**Critério de sucesso:** a hora avança normalmente enquanto a placa está alimentada, e o comportamento de retenção corresponde ao hardware da placa.

**Se não funcionar:** confira se o componente RTC está habilitado, a fonte de clock, a alimentação de backup e se a placa reinicializa o estado do RTC durante a inicialização.

**O que você aprendeu:** a API padrão de tempo da linguagem C sobre o dispositivo RTC do RT-Thread e um exemplo de como o comportamento do firmware depende do projeto de hardware.

## Miniprojeto: registrador de sensor controlado por botão { #mini-project-button-controlled-sensor-logger }

Depois de concluir os seis tutoriais curtos, combine-os em um pequeno projeto:

1. Faça o LED piscar na inicialização.
2. Use o botão para iniciar ou parar a amostragem.
3. Enquanto a amostragem estiver ativa, leia um valor do ADC por segundo.
4. Imprima leituras com marca de tempo pelo FinSH.
5. Use o brilho controlado por PWM ou o tom do buzzer para indicar se a amostragem está ativa.

**Critério de aprovação:** o projeto funciona por vários minutos sem disparos repetidos do botão, logs descontrolados ou reinicializações inesperadas.

## Checklist de bring-up dos primeiros periféricos { #beginner-bring-up-checklist }

- [ ] Nome da placa, porta serial e processo de gravação foram validados.
- [ ] A saída GPIO funciona com um LED real ou em um pino medido.
- [ ] A entrada GPIO funciona com polaridade e debounce confirmados.
- [ ] O shell FinSH está disponível, e `list_thread` / `list_device` funcionam.
- [ ] As leituras do ADC são plausíveis e foram convertidas para unidades de engenharia.
- [ ] As configurações de período e ciclo de trabalho do PWM produzem a saída física esperada.
- [ ] O comportamento do RTC é conhecido, inclusive suas limitações de retenção.

## Próximos passos { #where-to-go-next }

Quando estiver familiarizado com esses recursos, passe para [Integração de subsistemas](intermediate.md). A próxima etapa combina periféricos e middleware: sensores I2C, LVGL, BLE, reprodução de áudio, armazenamento e testes planejados de coexistência.
