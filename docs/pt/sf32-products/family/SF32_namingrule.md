---
icon: lucide/tags
description: "Como decodificar um código SF32LB5xyZxYx6: categoria do produto, variante de PSRAM, encapsulamento, capacidade de Flash/PSRAM integrada e faixa de temperatura, com exemplos."
tags:
  - Hardware
  - Chip
---

# Convenção de nomenclatura SF32 { #sf32-naming-convention }

## Nomenclatura de chips { #chip-naming }

### Número de peça: ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "Nota sobre a sintaxe"
    * **x** minúsculo representa um algarismo.
    * **Y** ou **Z** maiúsculos representam uma letra.

### Prefixo: *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — série de MCUs de 32 bits da SiFli
- **LB** — identificador da linha de produtos
    - **LB**: série de MCUs Bluetooth de baixo consumo
- **5** — família de processadores
    - **5**: dispositivos baseados em um processador Arm Cortex-M33 STAR-MC1 de 32 bits ou em um processador RISC-V de desempenho comparável
- **x** — categoria do produto
    - **8 / 7**: configurações com dois processadores de aplicação e um processador de baixo consumo; o posicionamento varia conforme a família.
    - **6 / 5**: intermediária (***um*** processador de aplicação e ***um*** processador de baixo consumo)
    - **2**: otimizada para custo (***um*** processador de aplicação e ***um*** controlador Bluetooth dedicado de baixo consumo)
- **y** — variante do dispositivo
    - Seu valor geralmente reflete a capacidade de PSRAM integrada ao encapsulamento; a correspondência exata varia conforme a subfamília do produto.

### Sufixo: *ZxYx6* { #suffix-zxyx6 }

- **Z** — tipo de encapsulamento
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — configuração da memória integrada (Flash QSPI-NOR e PSRAM)
  *(Nota: o mapeamento exato da codificação depende do encapsulamento e da família específica do dispositivo.)*

`ZxYx6` é um padrão geral da família, não um modelo de comprimento fixo para decodificação. A quantidade e a ordem dos códigos de memória variam conforme a família do dispositivo e o encapsulamento: o código numérico de Flash pode ser omitido, e o código alfabético de PSRAM pode se repetir quando há vários dispositivos integrados. Para decodificar um código específico, consulte a tabela de variantes da família correspondente.

<div align="center"><em>Definição dos campos do sufixo do número de peça</em></div>

<div align="center" markdown>

| Campo | Tipo | Opções | Descrição |
| :--- | :--- | :--- | :--- |
| **x** | Numérico | **1** a **6** | Mapeamento genérico de capacidade da Flash QSPI-NOR:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>O SF32LB57x também usa os códigos **7** e **8**; consulte abaixo o mapeamento específico dessa família. |
| **Y** | Alfabético | **A** a **E** | Capacidade e interface da PSRAM integrada:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM |

</div>

- **6** — classe de temperatura de operação
    - **5**: −20 °C a +70 °C (comercial)
    - **6**: −40 °C a +85 °C (industrial)

### Códigos de memória específicos do SF32LB57x { #sf32lb57x-memory-codes }

O diagrama de numeração de peças no [guia de projeto de hardware do SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md#33-packages) mostra três códigos de posição de memória após o código do encapsulamento, na ordem MPI1, MPI2 e MPI3; o código de temperatura vem depois. Os códigos específicos dessa família para cada posição MPI são:

<div align="center"><em>Tabela: códigos de memória do SF32LB57x por posição MPI</em></div>

<div align="center" markdown>

| Código | Significado na posição MPI correspondente do SF32LB57x |
|:-----|:--------------------------------------------------------|
| `N` | Nenhuma memória integrada ao encapsulamento |
| `B` | PSRAM de 32 Mb |
| `C` | PSRAM de 64 Mb |
| `D` | PSRAM de 128 Mb |
| `E` | PSRAM de 256 Mb |
| `2` | NOR Flash de 4 Mb |
| `3` | NOR Flash de 8 Mb |
| `4` | NOR Flash de 16 Mb |
| `5` | NOR Flash de 32 Mb |
| `6` | NOR Flash de 64 Mb |
| `7` | NOR Flash de 128 Mb |
| `8` | NOR Flash de 256 Mb |

</div>

Esse mapeamento é específico do SF32LB57x. Confirme o código completo na tabela exata de variantes; nem todas as combinações possíveis correspondem a SKUs disponíveis para pedido.

### Exemplos de números de peça { #part-number-examples }

#### Exemplo 1: SF32LB527UD6 { #example-1-sf32lb527ud6 }

**Configuração de MCU otimizada para custo da série SF32LB52:**

* **Configuração dos processadores:** um processador de aplicação e um processador dedicado ao controle Bluetooth de baixo consumo (baseado em Arm Cortex-M33 STAR-MC1).
* **Tipo de encapsulamento:** QFN68 (**U**).
* **Configuração de memória:** 128 Mb de OPI-PSRAM integrada (**D**).
* **Temperatura de operação:** −40 °C a +85 °C (**6**, classe industrial).

#### Exemplo 2: SF32LB587VEE56 { #example-2-sf32lb587vee56 }

**Configuração de MCU topo de linha da série SF32LB58:**

* **Configuração dos processadores:** dois processadores de aplicação e um processador de baixo consumo (baseados em Arm Cortex-M33 STAR-MC1).
* **Tipo de encapsulamento:** BGA256 (**V**).
* **Configuração de memória:** duas unidades de HPI-PSRAM de 256 Mb cada (**E**) e uma Flash QSPI-NOR de 32 Mb (**5**).
* **Temperatura de operação:** −40 °C a +85 °C (**6**, classe industrial).

#### Exemplo 3: SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

A tabela de variantes do SF32LB57x lista este código como BGA112. Seus três códigos de posição de memória são `D/7/7`: MPI1 contém PSRAM de 128 Mb, e MPI2 e MPI3 contêm NOR Flash de 128 Mb cada. O `6` final indica a classe de temperatura industrial. Portanto, o segundo `7` de `776` identifica a NOR Flash em MPI3. Consulte a [visão geral da família SF32](SF32_family.md) para entender a implicação desse código para os GPIOs no BGA112.

#### Exemplo 4: SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

A tabela de variantes do SF32LB57x também lista este código como BGA112. Seus códigos de posição de memória são `N/7/N`: MPI1 não tem memória integrada ao encapsulamento, MPI2 contém NOR Flash de 128 Mb e MPI3 não tem memória integrada. O `6` final indica a classe de temperatura industrial. A visão geral da família explica por que `58 + 6` não significa 64 GPIOs de atribuição livre.

### Exceções de sufixo legado da família 55x { #legacy-55x-suffix-exceptions }

A família SF32LB55x foi definida antes da convenção de nomenclatura atual, por isso alguns códigos mantêm formatos de sufixo legados. Estes três códigos não podem ser decodificados por completo pelo padrão `SF32LB5xyZxYx6` descrito acima: `SF32LB551U4O5`, `SF32LB555V4O6` e `SF32LB555V436`. Confirme o encapsulamento e a configuração de memória na tabela de variantes 55x e no datasheet de cada código; não deduza os campos a partir do padrão genérico. `SF32LB557VD3A6` segue a convenção atual e não é uma exceção legada.

## Nomenclatura de módulos { #module-naming }

### Número de peça: ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "Nota sobre a sintaxe"
    * No sufixo genérico, `A`, `B` e `C` identificam as posições dos três campos de armazenamento; não são caracteres literais presentes em todos os nomes de módulo.
    * O primeiro caractere de cada campo preenchido identifica o tipo de armazenamento. Os algarismos seguintes indicam a capacidade ou configuração.
    * O campo de subtipo `-y` é usado atualmente apenas pela família de módulos SF32LB52. Os nomes publicados de SF32LB56-MOD e SF32LB58-MOD não usam esse campo.

### Prefixo: *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — família de módulos MCU
    - **SF32**, **LB** e **5** têm os mesmos significados de série, linha de produtos e família de processadores descritos acima para a nomenclatura de chips.
    - **x** identifica a categoria do produto: **8 / 7** indica dois processadores de aplicação e um de baixo consumo, com posicionamento variável conforme a família; **6 / 5** é intermediária e **2** é otimizada para custo.
- **MOD** — produto da família de módulos da SiFli.
- **y** — subtipo do módulo, quando definido para a família
    - **1**: operação direta com bateria Li-ion para dispositivos SF32LB520/3/5/7. A faixa de alimentação do chip é 3,2–4,7 V; a configuração padrão usa SF32LB525UC6 com 8 MB de OPI-PSRAM.
    - **A**: operação padrão em 3,3 V para a família SF32LB52B. Não aceita alimentação direta de bateria Li-ion; a faixa de alimentação do chip é 2,97–3,63 V. A configuração padrão usa SF32LB52BU36 com 1 MB de Flash QSPI-NOR integrada.
    - **B**: operação padrão em 3,3 V para a família 52E/52G/52J. Não aceita alimentação direta de bateria Li-ion; a faixa de alimentação do chip é 2,97–3,63 V. A configuração padrão usa SF32LB52EUB6 com 4 MB de OPI-PSRAM integrada.

O módulo `-A` não inclui uma Flash NOR externa. É possível conectar uma Flash NOR externa ou periféricos SDIO, incluindo Wi-Fi, SD-NAND e eMMC em modo de 4 bits.

### Sufixo: *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>Definição dos campos do sufixo do número de peça do módulo</em></div>

<div align="center" markdown>

| Campo | Código do tipo de armazenamento | Capacidade, configuração e sufixo |
| :--- | :--- | :--- |
| `Aaaa`<br>Flash variável | `N`: Flash QSPI-NOR<br>`A`: Flash NAND (a interface depende da família do módulo)<br>`D`: Flash SD-NAND<br>`E`: eMMC | `N16`: Flash QSPI-NOR de 16 MB<br>`A128`: SPI-NAND de 128 MB no SF32LB52-MOD-1; QSPI-NAND de 128 MB no SF32LB56-MOD e SF32LB58-MOD<br>`D128`: SD-NAND de 128 MB no SF32LB56-MOD<br>`E4`: eMMC de 4 GB no SF32LB58-MOD |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: OPI-PSRAM de 4 MB<br>`R8`: OPI-PSRAM de 8 MB<br>`R12`: OPI-PSRAM de 4 MB + 8 MB<br>`R16`: OPI/HPI-PSRAM de 16 MB<br>`R32`: HPI-PSRAM de 16 MB + 16 MB<br>`R64`: HPI-PSRAM de 32 MB + 32 MB |
| `Cccc`<br>Flash padrão | `N`: Flash QSPI-NOR | `N1`: Flash QSPI-NOR de 1 MB<br>`N4`: Flash QSPI-NOR de 4 MB |

</div>

Os três campos do sufixo são concatenados sem separadores. `Aaaa` indica a opção de Flash variável, `Bbbb` a opção de PSRAM e `Cccc` a opção de Flash padrão. A documentação da SiFli define as combinações de tipo e capacidade listadas; não presuma que qualquer código de tipo possa ser combinado com qualquer código de capacidade. Um campo só aparece quando é usado na configuração documentada do módulo.

### Exemplos de números de peça { #part-number-examples_1 }

#### Exemplo 1: SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**Configuração de módulo SF32LB52 alimentado por bateria de lítio:**

* **Subtipo do módulo:** `-1` permite alimentação direta por bateria Li-ion, com tensão de alimentação do chip de 3,2–4,7 V.
* **Flash variável:** `N16` indica 16 MB de Flash QSPI-NOR.
* **PSRAM:** `R8` indica 8 MB de OPI-PSRAM.

#### Exemplo 2: SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**Configuração de módulo topo de linha SF32LB58:**

* **Subtipo do módulo:** os nomes publicados de SF32LB58-MOD não usam o subtipo `-y`.
* **Flash variável:** nesta configuração SF32LB58-MOD, `A128` indica 128 MB de Flash QSPI-NAND.
* **PSRAM:** `R32` indica 16 MB + 16 MB de HPI-PSRAM.
* **Flash padrão:** `N1` indica 1 MB de Flash QSPI-NOR.

O padrão de nomenclatura descreve uma configuração, mas não garante que todas as combinações de códigos sejam SKUs lançados. O guia da SiFli identifica SF32LB566VCB36 e SF32LB586VDD36 como configurações MCU padrão das famílias SF32LB56-MOD e SF32LB58-MOD, respectivamente; outras configurações de módulo podem ser personalizadas. Confirme disponibilidade, MCU instalado, pinagem e especificações elétricas na documentação do módulo correspondente.

[Guia de modelos de chips da SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [Guia de modelos de módulos da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
