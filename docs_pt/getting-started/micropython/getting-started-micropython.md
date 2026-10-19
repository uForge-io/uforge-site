---
icon: lucide/braces
description: "Ainda não há um procedimento validado para começar a usar MicroPython no SF32. Use o SiFli-SDK para uma primeira execução reproduzível e consulte a página de status do MicroPython para acompanhar o suporte."
tags:
    - Primeiros passos
    - MicroPython
---

# MicroPython { #micropython }

Ainda não há um procedimento de introdução ao MicroPython validado para SF32. As fontes consultadas da SiFli e do OpenSiFli ainda não documentam imagens oficiais de firmware específicas para cada placa, procedimentos de gravação nem configurações do REPL.

Use o [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) para estabelecer uma configuração de referência reproduzível de placa, cabo, porta serial e gravação. Não siga instruções genéricas de instalação do MicroPython nem use uma imagem destinada a outro MCU ou outra placa.

A página de [status do MicroPython](../../develop/platforms/micropython/status.md) acompanha os artefatos públicos e os critérios de aceitação exatos que precisam ser atendidos antes que esta página possa se tornar um tutorial.

!!! warning "Ainda não há um tutorial de MicroPython validado"
    Um guia utilizável de MicroPython para SF32 exige uma imagem de firmware compatível com a placa e sua configuração de memória, comandos de gravação e recuperação, a porta e a velocidade de transmissão (baud rate) do REPL, o comportamento do sistema de arquivos e uma matriz atualizada e fiel do suporte a periféricos. Até que esses materiais estejam disponíveis, esta página não inclui etapas de instalação.

## O que um tutorial validado precisa { #what-sifli-should-publish }

Antes de seguir um futuro tutorial de MicroPython para SF32, confirme se ele especifica uma imagem compatível com a placa, comandos testados de gravação e recuperação, a porta e a velocidade de transmissão (baud rate) do REPL, o comportamento do sistema de arquivos e uma matriz atualizada de suporte aos periféricos. Até que esses detalhes estejam disponíveis na [página de status](../../develop/platforms/micropython/status.md), use o caminho do SiFli-SDK indicado acima para o primeiro bring-up.
