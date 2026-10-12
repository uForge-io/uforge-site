---
icon: lucide/list-checks
description: "Filtre chips e módulos SF32 com base nas restrições do produto e valide o caminho de implementação no hardware compatível."
tags:
    - Hardware
    - Seleção
hide:
    - toc
---

# Seletor de produtos SF32 { #sf32-product-selector }

Filtre chips e módulos SF32 antes de definir o esquemático. Comece pelas restrições cuja alteração posterior teria alto custo — arquitetura de alimentação, encapsulamento, display, áudio, memória, GPIO, conectividade e caminho de validação do software — e depois compare os candidatos restantes.

Use o seletor interativo na triagem inicial. Ele lista apenas chips e módulos e permite filtrá-los por nível de integração, capacidade de PSRAM e GPIO, encapsulamento, alimentação principal, interface de display e resolução desejada, quantidade de interfaces SDIO, quantidade de interfaces de áudio e recursos de hardware especializados. Cada resultado leva à apresentação do produto correspondente. As placas de desenvolvimento são plataformas de validação separadas e não aparecem no seletor.

## Seletor de produtos { #product-selector }

!!! info "Glossário e contagem de interfaces de áudio"
    Consulte o [glossário](../about/glossary.md) para ver abreviações e definições de interfaces. Cada interface PDM pode conectar até dois microfones digitais; portanto, a quantidade de interfaces PDM não corresponde à quantidade de microfones. O número de entradas de microfone utilizáveis e o roteamento dos pinos dependem do componente; confirme esses detalhes na documentação do componente exato.

Todos os filtros ativos são aplicados em conjunto: cada resultado precisa atender a todos os critérios selecionados. Nível de integração, encapsulamento, alimentação e interface de display são opções únicas. Os valores de PSRAM e GPIO representam os requisitos da aplicação; o componente precisa atendê-los ou superá-los. A expressão “máximo necessário” nos controles se refere à demanda máxima da aplicação, não a um limite máximo do componente. A resolução desejada e os números de interfaces SDIO e de cada tipo de interface de áudio são limites mínimos. As caixas de seleção acrescentam recursos exigidos (Wi-Fi externo via SDIO, interface de câmera DCMI, acelerador de IA/ML, FreeIO ou PTM). O filtro do número de interfaces SDIO é distinto da caixa de Wi-Fi externo.

<div id="uf-product-selector"></div>

<noscript>
Esta ferramenta precisa de JavaScript para filtrar e exibir a tabela de componentes. Se o JavaScript estiver desativado, consulte a [tabela comparativa da família SF32](family/SF32_family.md).
</noscript>

A tabela de resultados mostra o número de peça exato e o encapsulamento, as capacidades de memória, o número máximo de GPIO, os dados de alimentação e tensão de I/O, os recursos de display, a quantidade de interfaces de áudio (DAC/ADC/PDM/I2S), a quantidade de interfaces/canais de periféricos digitais (UART/I2C/SPI/CAN/GPADC), a velocidade USB e os recursos indicados no catálogo. Quando uma quantidade ou valor aparece como `n/a`, significa que o catálogo não o documenta nesse nível de detalhe; não significa zero nem comprova que o componente não oferece o recurso. Um traço em uma coluna de recursos indica que a capacidade não está marcada no registro do catálogo; confirme na documentação do componente. A lista de interfaces de display serve para pré-seleção e não é um inventário completo da multiplexação dos pinos.

## Fatores de seleção { #selection-factors }

Use o seletor para aplicar critérios eliminatórios, não como um sistema de recomendação automática. Comece pela restrição que, se descoberta tarde, exigiria reprojetar a placa ou o esquemático; em seguida, use os demais fatores para distinguir os candidatos viáveis.

### Nível de integração { #integration-level }

Defina o nível de integração antes de comparar especificações detalhadas quando o cronograma, o escopo do trabalho de RF ou a responsabilidade pelo projeto da placa já estiverem definidos. Um chip oferece o máximo de controle, mas também deixa sob sua responsabilidade todo o projeto de alimentação, RF, clock, layout e preparação para produção. Um módulo reduz o trabalho de projeto e integração no nível do módulo, mas você ainda precisa projetar a placa portadora. Uma placa de desenvolvimento é a maneira mais rápida de validar firmware, comportamento dos periféricos e premissas do sistema; isso não a torna automaticamente o hardware adequado para produção.

### Alimentação e encapsulamento { #power-supply-and-package }

Escolha cedo a alimentação e o encapsulamento. O seletor diferencia a alimentação direta por bateria Li-ion (3,2–4,7 V), componentes com opção documentada de alimentação de 3,3 V regulada externamente e componentes cuja alimentação principal pode descer até aproximadamente 1,8 V (algumas especificações definem o limite inferior como 1,71 V). Esses filtros descrevem a alimentação principal, não a tensão de I/O dos GPIO. Os resultados mostram a tensão de I/O separadamente como nível nominal, não como faixa de operação garantida; confira os limites elétricos do componente exato. O encapsulamento também é uma decisão estrutural: define a área ocupada na placa, a dificuldade do fan-out, o caminho térmico e o orçamento de pinos utilizáveis. O filtro de encapsulamento usa categorias gerais; confira a designação exata nos resultados. Um encapsulamento com um máximo de GPIO publicado mais alto ainda pode ser insuficiente depois de reservar pinos para alimentação, clocks, depuração, display, memória e periféricos obrigatórios.

### Margem de memória e GPIO { #memory-and-gpio-headroom }

Use os filtros de PSRAM e GPIO como requisitos mínimos e, depois, examine a organização da memória e a alocação de pinos da variante selecionada. A capacidade de PSRAM afeta os buffers gráficos e de áudio, os modelos de ML e o espaço de trabalho da aplicação, mas a capacidade total, por si só, não garante um bloco de memória contíguo. A margem de GPIO deve contemplar testes de produção, depuração, interrupções, sensores futuros e sinais de controle da placa, não apenas as interfaces do primeiro protótipo.

### Display e gráficos { #display-and-graphics }

Filtre pela interface de display exigida pelo painel e use a resolução desejada como uma primeira verificação de capacidade. Os valores de largura por altura são limites de pixels totais; não verificam a proporção nem a temporização exatas do painel. Os valores de resolução exibidos servem como referência para a pré-seleção no catálogo: não garantem um modo específico de painel nem representam necessariamente o máximo oficial de cada componente. Confirme o componente e os requisitos do painel na documentação da SiFli. O seletor usa RGB, a denominação comum no projeto de placas, para a interface de display paralela; seu nome formal é DPI (Display Pixel Interface). A lista de interfaces não é um inventário completo da multiplexação de pinos. Confirme na documentação do componente o modo exato da interface, o orçamento de memória, o roteamento de pinos, a sequência de alimentação do painel e o suporte do driver de software.

### Interfaces de áudio { #audio-interfaces }

O seletor oferece filtros independentes de quantidade mínima para DACs de áudio, ADCs, interfaces PDM e interfaces I2S. Cada valor é um limite mínimo, não um perfil de áudio combinado. Em seguida, verifique o compartilhamento de recursos com outros periféricos e o projeto analógico da placa.

### Conectividade e hardware especializado { #connectivity-and-specialist-hardware }

Use os filtros de Wi-Fi, câmera, acelerador de IA, FreeIO e PTM somente quando o recurso correspondente for um requisito do produto. A caixa de Wi-Fi externo indica um caminho SDIO documentado; ela não significa que o Wi-Fi esteja integrado ao chip. O filtro separado verifica a quantidade de interfaces SDIO documentada no catálogo. O Wi-Fi externo também exige alimentação, roteamento e suporte de software adequados na placa. Os requisitos de câmera e IA precisam de uma análise de ponta a ponta da interface, da largura de banda da memória, da carga de processamento e da pilha de software. FreeIO e PTM são úteis quando a atribuição flexível de sinais ou o tratamento determinístico de tarefas de periféricos são centrais ao projeto; esses recursos não devem ter prioridade sobre as restrições mais básicas de alimentação, memória e encapsulamento.

### Evidências de validação { #validation-evidence }

Antes de fechar a seleção, siga o link do resultado até a apresentação do produto e confirme o número de peça exato, o encapsulamento, os limites elétricos, o projeto de referência e a disponibilidade de guia de projeto ou checklist. Sempre que possível, valide o fluxo de firmware previsto na placa de desenvolvimento compatível cuja configuração de hardware seja mais próxima da do componente escolhido. O seletor serve para criar uma lista inicial; a documentação da SiFli para o componente escolhido continua sendo a referência de projeto.

## Escolha um nível de integração { #choose-an-integration-level }

O catálogo interativo lista apenas chips e módulos. As placas de desenvolvimento da tabela abaixo são uma opção separada para validar o software e as premissas do sistema.

<div align="center"><em>Ponto de partida para o hardware</em></div>

<div align="center" markdown>

| Ponto de partida | Escolha quando | Próxima etapa |
|:---------------|:---------------|:----------|
| Chip | Você precisa de uma PCB personalizada e de controle direto sobre as interfaces e o projeto de alimentação. | Escolha uma família e consulte o guia de projeto para produção antes de iniciar o esquemático. |
| Módulo | Você quer reduzir o trabalho de RF e de integração do módulo, mantendo uma placa portadora personalizada. | Consulte a apresentação do módulo, a definição de interfaces e o guia de projeto do módulo. |
| Placa de desenvolvimento | Você precisa validar rapidamente o software, os periféricos ou um conceito de produto. | Comece pela placa cuja configuração de hardware melhor corresponda ao produto pretendido, execute um exemplo verificado e use o esquemático como referência, não como projeto de produção. |

</div>

## Confirme a lista de candidatos { #confirm-the-shortlist }

1. **Inspecione o componente exato.** Use a [visão geral da família SF32](family/SF32_family.md), a página de apresentação do produto selecionado e as [regras de nomenclatura](family/SF32_namingrule.md) para confirmar o número de peça comercial, o encapsulamento, a topologia de alimentação, a organização da memória, a atribuição das interfaces e o hardware de referência. Não escolha o componente com base em um único recurso em destaque: confirme que os requisitos de display, áudio, armazenamento, sensores, Bluetooth e baixo consumo podem coexistir no encapsulamento e no projeto da placa escolhidos.
2. **Valide o caminho de software.** Antes de finalizar o hardware, siga [Primeiros passos](../getting-started/index.md), os [Tutoriais](../getting-started/tutorials/overview.md) e a seção [Desenvolvimento](../develop/index.md) na placa disponível cuja configuração de hardware melhor corresponda ao projeto pretendido.
3. **Verifique as restrições de produção.** Consulte [Projeto para produção](../hardware/design-for-production.md) antes de congelar o esquemático, o layout, a BOM ou as escolhas de display e armazenamento.
