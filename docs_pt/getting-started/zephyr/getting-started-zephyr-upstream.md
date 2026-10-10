---
icon: lucide/layers
description: "Compile e grave o alvo upstream SF32LB52 DevKit LCD do Zephyr e confira o console e os recursos documentados."
tags:
    - Primeiros passos
    - Zephyr
---

# Zephyr upstream { #zephyr-upstream }

Desde o Zephyr v4.3.0, o projeto upstream do Zephyr mantém suporte para a placa `sf32lb52_devkit_lcd`. Consulte as [notas da versão v4.3.0](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html) e a [documentação da placa SF32LB52 DevKit LCD](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html). Este guia cria um workspace v4.3.0, compila um primeiro exemplo e grava o firmware na placa. Para obter o conjunto mais amplo de recursos oficiais de SF32, use o [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! note "Confira os recursos da placa"
    A existência de uma definição upstream da placa não confirma, por si só, que todos os periféricos ou modos de operação estejam habilitados ou validados para um produto. Consulte a tabela de recursos compatíveis na documentação da placa e verifique o comportamento necessário na revisão exata da sua placa.

## Pré-requisitos { #what-youll-need }

**Hardware**

- SF32LB52 DevKit LCD, baseada no módulo SF32LB52x-MOD-N16R8 com SF32LB525UC6, 8 MB de OPI-PSRAM e 128 Mb de QSPI-NOR.
- Cabo de dados USB Type-C conectado à interface USB-UART da placa.

**Software**

- Um sistema host compatível com o Zephyr v4.3.0, configurado conforme o [guia de primeiros passos](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html).
- As dependências de host do Zephyr e o Zephyr SDK para o alvo ARM Cortex-M, instalados conforme esse guia.
- Git, Python 3 e `pip`.

## Preparar as ferramentas { #prepare-the-tooling }

Primeiro, instale as dependências de host e o Zephyr SDK seguindo o [guia de primeiros passos do Zephyr v4.3.0](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html). Em seguida, crie um ambiente Python e inicialize um workspace na tag correspondente do Zephyr:

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

Mantenha esse ambiente Python ativo durante as etapas de compilação e gravação abaixo.

## Confirmar a placa { #confirm-the-board }

Confira se o alvo está no workspace:

```bash
west boards
```

O nome esperado da placa é:

```text
sf32lb52_devkit_lcd
```

## Compilar Hello World { #build-hello-world }

Compile o exemplo padrão Hello World do Zephyr:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

Uma compilação bem-sucedida confirma que o alvo da placa e a toolchain estão disponíveis no workspace. Ela não valida todos os periféricos da placa.

## Gravar a placa { #flash-the-board }

A placa upstream define o `sftool` como ferramenta de gravação padrão. Instale o [OpenSiFli sftool](https://github.com/OpenSiFli/sftool), confirme que ele está no `PATH` e coloque a placa no modo de download serial conforme o procedimento documentado. Em seguida, execute:

```bash
west flash
```

Se a gravação falhar, confira a seleção da porta serial, o modo de download e as instruções da ferramenta na [documentação da placa](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html).

## Abrir o console serial { #open-the-serial-console }

A configuração upstream da placa direciona o console do Zephyr para `usart1` a `1000000` baud. Abra essa UART em um terminal serial e confira a saída:

```text
Hello World! sf32lb52_devkit_lcd
```

## Escolher o próximo exemplo { #choose-a-next-sample }

Use a tabela de recursos compatíveis da documentação upstream da placa e o [catálogo de exemplos do Zephyr](https://docs.zephyrproject.org/4.3.0/samples/index.html) para escolher a próxima API ou o próximo periférico a avaliar. Confirme que o recurso está listado para esta placa e que a configuração necessária está habilitada antes de considerar um exemplo como evidência de prontidão para produção.

## Solução de problemas { #troubleshooting }

<div align="center"><em>Tabela: Solução de problemas</em></div>

<div align="center" markdown>

| Sintoma | Verificação |
|:--------|:------------|
| `west boards` não mostra o alvo SF32 | Confirme que o workspace foi inicializado com o Zephyr upstream v4.3.0 ou posterior e que `west update` foi concluído. |
| A compilação falha antes de compilar | Confirme que o ambiente Python está ativo, que o Zephyr SDK para ARM Cortex-M está instalado e que os requisitos do v4.3.0 foram instalados. |
| A placa compila, mas não grava | Confirme que `sftool` está instalado e no `PATH`, que a porta serial selecionada está correta e que a placa está no modo de download serial. |
| Não há saída serial | Confira `usart1`, `1000000` baud, a conexão USB-UART e se outro terminal está usando a porta. |
| Um exemplo de periférico falha | Consulte a tabela de recursos compatíveis e a configuração do exemplo; o alvo básico da placa não habilita necessariamente todos os periféricos. |

</div>

## Antes da integração ao produto { #before-product-integration }

- Confira a tabela de recursos compatíveis da placa upstream e a configuração do exemplo que pretende usar.
- Valide as interfaces, o desempenho, o uso de memória e o consumo de energia necessários na placa-alvo com a configuração do produto. Uma compilação correta do Hello World é apenas um teste básico da toolchain.
- Compare o escopo de recursos do alvo upstream com o [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) se o projeto depender de um recurso não listado ou não validado para esse alvo Zephyr.
