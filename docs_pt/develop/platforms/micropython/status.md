---
icon: lucide/terminal-square
description: "Situação atual do MicroPython no SF32: ainda não foi encontrado um port oficial. A página também apresenta os critérios que precisariam ser atendidos antes de oferecê-lo como um caminho compatível."
tags:
    - Desenvolvimento
    - MicroPython
---

# Situação do MicroPython { #micropython-status }

Na documentação da SiFli e nos repositórios OpenSiFli consultados, não foi encontrado um port oficial do MicroPython para SF32, uma imagem de firmware ou um processo de gravação específico para cada placa.

A consulta abrangeu os [repositórios públicos da OpenSiFli no GitHub](https://github.com/OpenSiFli/) e o [portal de documentação da SiFli](https://docs.sifli.com/).

Isso não prova que não existam experimentos privados ou da comunidade. Significa que o site não deve apresentar o MicroPython como um caminho de desenvolvimento SF32 verificado até que exista um recurso público vinculável, como uma imagem de firmware ou uma árvore de código-fonte.

## Recomendação atual { #current-recommendation }

Por enquanto, não apresente o MicroPython aos usuários finais como um caminho SF32 compatível. Mantenha esta página como referência de estado e roteiro até que exista um artefato público que os desenvolvedores possam gravar e usar para reproduzir o comportamento.

## O que uma página completa precisa incluir { #what-a-real-page-needs }

Antes de transformar esta página em um tutorial propriamente dito, a SiFli deveria publicar:

- Imagens de firmware por placa e configuração de memória.
- Repositório do código-fonte e instruções de compilação.
- Comandos de gravação e recuperação.
- UART usada pelo REPL e respectiva taxa de baud.
- Mensagem de inicialização esperada do MicroPython.
- APIs `machine` compatíveis.
- Comportamento do sistema de arquivos e dos modos de segurança e recuperação.
- Limitações conhecidas de tela, Bluetooth, armazenamento, USB e baixo consumo.

## Primeiro teste rápido sugerido { #suggested-first-smoke-test }

Quando houver firmware, o primeiro teste deve usar somente a interface serial:

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Teste GPIO somente depois que os nomes dos pinos estiverem documentados.

## Critérios mínimos de aceitação { #minimum-acceptance-criteria }

O MicroPython poderá passar de uma página de status para um guia de primeiros passos quando todos estes itens estiverem disponíveis:

- Repositório público ou página de releases.
- Binário específico para a placa de pelo menos um kit de desenvolvimento SF32.
- Comando de gravação documentado.
- Porta do REPL e taxa de baud documentadas.
- Caminho de recuperação para o firmware SiFli-SDK.
- Lista de APIs `machine` compatíveis.
- Pelo menos um exemplo de GPIO testado em hardware real.

## Por que isso importa { #why-this-matters }

Uma instrução vaga como “baixe uma imagem do MicroPython” não permite que o desenvolvedor avance. É necessário indicar a imagem exata, a placa compatível, a ferramenta de gravação, as configurações do REPL e o caminho de recuperação. Sem isso, uma página sobre MicroPython aumenta a carga de suporte em vez de ajudar.
