---
icon: lucide/puzzle
description: "Primeiros passos com o ArduinoCore-zephyr beta do OpenSiFli no SF32LB52 DevKit LCD: instale o pacote da placa, grave um teste serial e execute o Blink."
tags:
    - Primeiros passos
    - Arduino
---

# Arduino { #arduino }

O OpenSiFli oferece um core Arduino beta para SF32 baseado no Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). O projeto publica o pacote Arduino `sifli:sf32lb52`, exibido no Boards Manager como **SiFli Serial Boards**, e atualmente tem como alvo a placa **SiFli SF32LB52 DevKit LCD**.

Este core é uma boa opção para testar sketches, verificar rapidamente periféricos, fazer demonstrações e desenvolver protótipos iniciais. Para firmware de produção, ajuste da pilha Bluetooth, aplicações com muitos recursos gráficos, otimização de baixo consumo ou inicialização de uma placa personalizada, use o [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Core beta"
    O OpenSiFli identifica este core Arduino como **BETA** e recomenda seu uso apenas para testes. Funcionalidades, APIs, comportamento do loader, conteúdo do pacote e processo de lançamento podem mudar. Não o considere pronto para produção.

## O que você vai precisar { #what-youll-need }

**Hardware**

- SiFli SF32LB52 DevKit LCD.
- Um cabo de dados USB Type-C conectado à interface USB-to-UART da placa.
- Um computador com Windows, macOS ou Linux.

**Software**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) ou [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- O pacote Arduino `sifli:sf32lb52` do OpenSiFli.
- Um monitor serial.

## Instale o pacote da placa { #install-the-board-package }

Abra **Arduino IDE > Settings** e adicione este URL a **Additional Boards Manager URLs**:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Usuários na China continental podem usar o índice de pacotes espelhado:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Em seguida, abra **Boards Manager**, pesquise **SiFli Serial Boards** e instale a plataforma `sifli:sf32lb52`.

Com o Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Para usar o espelho da China:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Selecione a placa { #select-the-board }

No Arduino IDE, selecione:

```text
SiFli SF32LB52 DevKit LCD
```

O FQBN da placa é:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

A definição de placa do OpenSiFli mapeia essa placa Arduino para o alvo Zephyr `sf32lb52_devkit_lcd` e para a variante `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Escolha as opções de compilação { #choose-build-options }

O core oferece dois menus importantes:

<div align="center"><em>Opções de compilação</em></div>

<div align="center" markdown>

| Menu | Opção | Significado |
|:-----|:-------|:--------|
| **Mode** | `Standard` | O sketch inicia automaticamente após ser carregado. |
| **Mode** | `Debug` | O shell do Zephyr aguarda o comando `sketch`. |
| **Link mode** | `Dynamic` | O sketch é empacotado para o loader do Zephyr. |
| **Link mode** | `Static` | O sketch é vinculado a um binário pronto para gravação. |

</div>

Use **Dynamic** no fluxo com o loader do Zephyr. Use **Static** quando precisar que o sketch seja vinculado a uma imagem de firmware gravável.

## Coloque a placa no modo de download serial { #put-the-board-in-serial-download-mode }

Segundo a documentação do OpenSiFli, na primeira utilização a placa precisa estar no modo de download serial. Siga a sequência de boot/reset do SF32LB52 DevKit LCD e, em seguida, faça a gravação pelo Arduino IDE ou CLI.

A ferramenta de gravação é `sftool`.

## Grave um teste serial básico { #upload-a-serial-smoke-test }

Comece verificando a saída serial. Ela confirma a gravação, a reinicialização, a inicialização do ambiente de execução e o roteamento da saída para o console, sem depender da polaridade do LED:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Faça a gravação pelo Arduino IDE ou use o Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Substitua `/dev/cu.usbserial-XXXX` pela porta serial da sua placa. No Windows, use a porta `COM` correspondente. No Linux, use a porta `/dev/ttyUSB*` ou `/dev/ttyACM*` correspondente.

Abra o Serial Monitor com a taxa de `115200` baud. No modo de compilação **Standard**, o sketch deverá imprimir uma linha por segundo. No modo **Debug**, abra o shell do Zephyr e execute:

```text
sketch
```

## Grave o Blink { #upload-blink }

Verifique se a variante instalada do SF32LB52 DevKit LCD define `LED_BUILTIN`; não presuma que os números dos pinos Arduino sejam universais. Se a macro estiver definida e a variante a mapear para o LED integrado, experimente o Blink depois que o teste serial básico funcionar. Caso contrário, consulte a documentação da placa para confirmar a conexão e a polaridade do LED antes de escolher um GPIO.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Solução de problemas { #troubleshooting }

<div align="center"><em>Tabela: solução de problemas</em></div>

<div align="center" markdown>

| Sintoma | Verificação |
|:--------|:------|
| O pacote não aparece | Confirme o URL do índice de pacotes e use o Arduino IDE 2.x. |
| A gravação falha | Coloque a placa no modo de download serial e verifique se nenhum monitor serial está ocupando a porta. |
| O sketch não inicia | Confira **Mode**. Em `Debug`, execute `sketch` no shell do Zephyr. |
| Símbolo do Zephyr não definido | O README do core informa que talvez seja necessário exportar as funções ausentes do Zephyr em `loader/llext_exports.c` e recompilar o loader. |
| Subsistema do Zephyr ausente | Ative a opção `CONFIG_` necessária no arquivo `.conf` da placa, recompile o loader e grave-o. |
| Memória insuficiente | O shell do Zephyr e o carregamento dinâmico de sketches consomem RAM; reduza o uso da pilha ou troque o modo de compilação, conforme necessário. |

</div>

## Escopo atual { #what-sifli-team-should-finish }

O pacote publicado atualmente tem como alvo a SF32LB52 DevKit LCD e continua em versão beta para testes. Antes de experimentar outra placa ou depender de uma API, consulte o [repositório upstream](https://github.com/OpenSiFli/ArduinoCore-zephyr) e as notas da versão exata do pacote. O suporte no Zephyr ou no SiFli-SDK não comprova, por si só, que este pacote Arduino ofereça o mesmo suporte.
