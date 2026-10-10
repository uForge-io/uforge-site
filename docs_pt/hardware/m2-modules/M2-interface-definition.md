---
icon: lucide/plug
description: "Atribuições preliminares de contatos M2 e M2xM, além de resumos M2xN/M2xA não verificados e notas sobre sinais multiplexados."
tags:
  - Hardware
  - Módulo
  - Interface
---

# Definição da interface M2 { #m2-interface-definition }

!!! warning "Definição preliminar da interface"
    Esta página registra uma proposta preliminar de M2. O repositório contém uma planilha local da proposta com abas M2 e M2xM, mas ela cita outro arquivo-fonte, `M2E接口定义_0714.xlsx`, que não está disponível; também não foi possível confirmar a versão ou aprovação da proposta. Não foi encontrada fonte primária da SiFli que confirme as atribuições nem a quantidade de contatos. A planilha não tem abas M2xN ou M2xA, portanto os resumos correspondentes desta página não estão verificados. Este não é um padrão de interface publicado pela μForge.io. Trate todas as atribuições como provisórias e valide o módulo, a placa portadora, o conector, os limites elétricos e a multiplexação dos pinos antes de fechar o projeto para produção.

## Escopo { #scope }

As abas M2 e M2xM da planilha local da proposta numeram as posições de 1 a 75, mas omitem as posições 24–31 do mapa de contatos. Assim, cada aba apresenta 67 contatos numerados. Ambas identificam o mapa como referente a um conector M.2 Key-E. A aba M2xM também informa que o mesmo módulo deve incluir a interface base M2. Essas indicações da proposta não comprovam conformidade com a [especificação M.2 da PCI-SIG](https://pcisig.com/specification-overview/pci-express-m2) nem a intercambiabilidade entre módulo e placa portadora. Também não permitem determinar o número ou a disposição dos conectores físicos. Esta página traz ainda resumos M2xN e M2xA, mas não foram encontrados mapas de contatos originais para esses perfis.

- **M2** — conexões de display, áudio, armazenamento, depuração e E/S gerais de sistemas embarcados.
- **M2xM** — proposta de atribuição multimídia para display, câmera e PDM. O resumo também menciona I2S/PCM, mas a aba M2xM disponível não atribui contatos a esses sinais.
- **M2xN** — sinais de rede, USB, CAN e UART.
- **M2xA** — sinais de controle de motores, aquisição analógica, encoder e temporizador.

No rascunho atual, `M2xH` e `M2xP` são nomes reservados sem contatos atribuídos.

!!! info "Relação entre conectores não definida"
    A planilha local da proposta informa que um módulo M2xM também deve incluir a interface base M2, mas não esclarece se os dois mapas correspondem a conectores físicos separados ou compartilhados. Portanto, não é possível inferir a quantidade nem o arranjo dos conectores. A planilha também não contém mapas de contatos M2xN ou M2xA.

## Convenção do conector { #connector-convention }

Na aba M2 da planilha local da proposta, os contatos ímpares aparecem na face superior e os pares na inferior quando vistos pela borda da placa. As posições 24–31 não constam no mapa e são indicadas na proposta como uma região prevista para o entalhe de codificação; esse desenho não comprova a conformidade mecânica com a especificação M.2 E-key.

<div align="center"><em>Tabela: resumo do conector M2 e de suas extensões</em></div>

<div align="center" markdown>

| Item | Definição |
| --- | --- |
| Formato do conector | Mapa proposto de borda de placa numerado de 1 a 75; 67 contatos indicados. Conformidade com M.2 E-key não verificada |
| Posições omitidas na proposta | 24–31 (indicadas como região prevista para o entalhe de codificação) |
| Atribuição base | M2 |
| Atribuição multimídia | M2xM |
| Conteúdo de extensão neste rascunho | Mapa de contatos M2xM; apenas resumos M2xN e M2xA, não verificados |
| Exemplo de declaração | `M2 + M2xM` |

</div>

## Perfil base M2 { #m2-base-profile }

M2 é o perfil base para produtos conectados compactos. A atribuição prevê display QSPI e painel de toque capacitivo, Wi-Fi SDIO, SDIO de 1 bit para cartão TF, áudio analógico, depuração, USB, CAN e barramentos gerais. Vários contatos são multiplexados para que o módulo possa selecionar a função adequada ao SoC e à configuração do produto.

<div align="center"><em>Tabela: atribuição funcional de M2</em></div>

<div align="center" markdown>

| Função | Sinais atribuídos | Finalidade no projeto |
| --- | --- | --- |
| Alimentação | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT` e GND | Rótulos de sinal do mapa proposto; tensão, corrente e sequência de alimentação não são especificadas aqui. |
| Display QSPI | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | Painel QSPI, backlight e seleção de chip secundária opcional. |
| Toque capacitivo | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Controle e interrupção do painel de toque capacitivo. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | Interface SDIO de 4 bits para o dispositivo Wi-Fi complementar. |
| Cartão TF | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | Interface de cartão TF de 1 bit e detecção de presença. |
| Áudio analógico | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Dois pares de entrada analógica, polarização de microfone, dois pares DAC e habilitação do amplificador de potência. |
| Depuração e recuperação | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | UART de depuração, SWD e seleção de inicialização/recuperação. |
| Barramentos seriais gerais | SPI1/SPI2, I2C2–I2C4, UART2/UART3 e linhas GPIO/barramento gerais (`G0–G17`/`BUS0–BUS17`) | Barramentos do produto selecionados pelo multiplexador de pinos do módulo; I2C1 é atribuído ao controlador de toque. Algumas posições SPI2/I2C3/I2C4/UART3 também podem transportar sinais de microfone digital `PDM1`/`PDM2`. |
| Outros controles | `CAN_TX/RX`, sinais USB/host USB, `PWR_KEY` | Barramento de campo, controle da função USB e entrada do botão de alimentação. |

</div>

## Pinagem M2 por cores { #color-coded-m2-pinout-guide }

<div align="center"><em>Figura: legenda dos grupos de sinais M2</em></div>

<div class="m2-visual-guide" role="img" aria-label="Legenda de cores da tabela de pinagem M2 nas duas faces">
<div class="m2-category-band">
<div class="m2-category m2-audio">Áudio</div>
<div class="m2-category m2-display">Display</div>
<div class="m2-category m2-touch">Toque</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Alimentação</div>
<div class="m2-category m2-debug">Dedicados</div>
</div>
</div>

A faixa de cores é a legenda da tabela. A tabela de contatos das duas faces apresenta a pinagem de referência desta proposta M2, incluindo funções alternativas e multiplexação; não é uma especificação de interface publicada.

### Atribuição dos contatos M2 { #m2-contact-assignment }

Esta tabela distingue os pinos da face inferior, os da face superior e a coluna CN1. Funções multiplexadas adicionais atribuídas pela planilha são indicadas na coluna `Alt` (função alternativa). A cor de cada célula de função corresponde à categoria na legenda acima.

<div align="center"><em>Tabela: atribuição dos contatos do perfil base M2</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alt</th><th>Função</th><th>Pino&nbsp;inferior</th><th>CN1</th><th>Pino&nbsp;superior</th><th>Função</th><th>Alt</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Posições 24–31 omitidas (região prevista para o entalhe de codificação)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Posições 24–31 omitidas (região prevista para o entalhe de codificação)</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### Descrição dos pinos M2 { #m2-pin-descriptions }

Os grupos e as cores seguem a tabela de contatos acima. A planilha não define as direções de E/S; esta coluna é uma referência provisória para integração, vista do módulo: I significa entrada, O saída e I/O operação bidirecional. As direções separadas por vírgulas seguem a ordem dos sinais. As linhas SPI e PDM pressupõem que o módulo fornece o clock; as linhas SWD pressupõem um depurador externo. Confirme cada direção e requisito elétrico na documentação do módulo e do SoC selecionados.

Em I2C, I/O descreve as linhas bidirecionais SDA/SCL; não garante todos os modos de controlador/dispositivo alvo nem suporte a clock stretching. Confirme a configuração dos pinos e os resistores de pull-up do módulo real. Consulte a [especificação I2C da NXP](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). A hipótese de saída de clock e entrada de dados PDM segue a conexão entre microfone e host ilustrada na [nota de aplicação PDM da ST](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf); ela não comprova suporte em um módulo específico.

<div align="center"><em>Tabela: sinais M2 e direções provisórias</em></div>

<div align="center" markdown>

| Grupo de sinais | Sinal | I/O | Descrição |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Alimentação</span> | `VBAT/VBATS` | I | Linha de entrada da bateria. |
| <span class="m2-chip m2-power">Alimentação</span> | `3.3V` | I | Linha de alimentação de 3,3 V. |
| <span class="m2-chip m2-power">Alimentação</span> | `CHG_INT` | O | Saída de interrupção/estado do carregador. |
| <span class="m2-chip m2-power">Alimentação</span> | `USB_VIN` | I | Entrada USB/linha de alimentação da rota de carga. |
| <span class="m2-chip m2-power">Alimentação</span> | `USB_DET` | I | Sinal de detecção USB. |
| <span class="m2-chip m2-power">Alimentação</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | Par de dados USB no modo host, separado da porta USB principal. |
| <span class="m2-chip m2-power">Alimentação</span> | `USB_OTG` | I/O | Rótulo da planilha de proposta; a aba indica “não suportado na plataforma atual”. Não deduza suporte a partir do nome do contato. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | Seleção de chip principal e secundária opcional do display QSPI. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CLK` | O | Clock do display QSPI. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | Linhas de dados do display QSPI. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_TE` | I | Entrada de sincronização de tearing effect (TE) do painel. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_RSTB` | O | Reset do painel, ativo em nível baixo. |
| <span class="m2-chip m2-display">Display</span> | `LCD_BL_PWM` | O | Controle PWM do backlight. |
| <span class="m2-chip m2-touch">Toque</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Barramento I²C do controlador de toque capacitivo. |
| <span class="m2-chip m2-touch">Toque</span> | `CTP_INT` | I | Interrupção do controlador de toque. |
| <span class="m2-chip m2-touch">Toque</span> | `CTP_REST` | O | Reset do controlador de toque. A planilha usa a grafia `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Clock e comando SDIO do dispositivo Wi-Fi complementar. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Linhas de dados SDIO de 4 bits do dispositivo Wi-Fi complementar. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Controle de desligamento do módulo Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Interrupção Wi-Fi. Compartilha o pino 65 com `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Sinal de despertar Wi-Fi. Compartilha o pino 67 com `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | Comando, clock e dados SDIO do cartão TF de 1 bit. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | Detecção de presença do cartão TF. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Nomes genéricos dos controladores para as mesmas linhas físicas dos barramentos do cartão TF (SDIO1) e do dispositivo Wi-Fi complementar (SDIO2). Use os nomes específicos de função acima, a menos que o módulo precise de SDIO completo de 4 bits nos dois barramentos. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Interface lógica do transceptor CAN, multiplexada nos pinos 65 e 67 com `WiFi_INT`/`WiFi_WAKE`. A placa portadora ainda precisa de um transceptor CAN e da proteção adequada ao barramento do produto. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | Neste mapa, os contatos Wi-Fi SDIO 74, 72, 70, 68, 66 e 64, além do contato 60 de `PWR_KEY`, têm funções alternativas de ADC. |
| <span class="m2-chip m2-audio">Áudio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Dois pares de entrada diferencial para microfones analógicos. |
| <span class="m2-chip m2-audio">Áudio</span> | `MIC_BIAS` | O | Alimentação de polarização do microfone. |
| <span class="m2-chip m2-audio">Áudio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Dois pares de saída diferencial de áudio. |
| <span class="m2-chip m2-audio">Áudio</span> | `AU_PA_EN` | O | Habilitação do amplificador de potência de áudio. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, multiplexado com a rota do cartão TF. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, multiplexado com I2C3 e UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 usa SDA no contato 35 e SCL no contato 34. Este mapa não confirma o compartilhamento com `MPI/SD` mencionado anteriormente. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, multiplexado com SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, multiplexado com SPI2 e UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 tem posições alternativas nos grupos de cartão TF e SPI2 e nos contatos 39/37. O compartilhamento com `MPI/SD` mencionado anteriormente não foi confirmado; verifique a seleção real do multiplexador do módulo. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 tem posições alternativas no grupo SPI2/I2C4 e nos contatos 38/36. O compartilhamento com `MPI/SD` mencionado anteriormente não foi confirmado; verifique a seleção real do multiplexador do módulo. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Contatos GPIO/barramento gerais, multiplexados com SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2` ou SWD, conforme a posição. |
| <span class="m2-chip m2-audio">Áudio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | Em cada par de sinais de microfone digital, CLK é uma saída do módulo e DATA uma entrada. Essas funções compartilham os contatos 58, 56, 54 e 52 com SPI2/I2C3/I2C4/UART3. |
| <span class="m2-chip m2-debug">Dedicados</span> | `DBG_UART1_TXD/RXD` | O/I | UART de depuração, multiplexado com SWD. |
| <span class="m2-chip m2-debug">Dedicados</span> | `SWDIO`, `SWCLK` | I/O, I | Porta de depuração SWD. Há duas opções de compartilhamento: posições do UART de depuração (pinos 43/41) ou de interrupção/reset do toque (pinos 51/49). Cada módulo deve implementar apenas uma opção. |
| <span class="m2-chip m2-debug">Dedicados</span> | `SWD_SW` | I | Rótulo da planilha de proposta; o comportamento de controle ou seleção do roteamento não está especificado. |
| <span class="m2-chip m2-debug">Dedicados</span> | `BOOT_MODE` | I | Seleção do modo de inicialização/recuperação. |
| <span class="m2-chip m2-debug">Dedicados</span> | `PWR_KEY` | I | Sinal do botão de alimentação. |
| <span class="m2-chip m2-gnd">Terra</span> | `GND` | — | Caminhos de retorno digitais e analógicos distribuídos pelo conector. |

</div>

!!! info "Correção do nome de sinal Wi-Fi SDIO"
    A planilha local da proposta atribui o contato 64 a `WiFi_SD2_D1` e informa que uma revisão anterior repetia ali a identificação D3. Isso registra apenas uma correção interna do rascunho; não confirma o pin mux da SiFli. Os dois barramentos SDIO também têm aliases genéricos de controlador na coluna de funções alternativas: `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` para o barramento Wi-Fi e `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` para o cartão TF, além dos nomes por função.

### Regras de compartilhamento de M2 { #m2-sharing-rules }

- A planilha trata SWD como um recurso multiplexado com duas opções de roteamento: posições do UART de depuração (`SWDIO` no pino 43 e `SWCLK` no pino 41) ou de interrupção/reset do toque (`SWDIO` no pino 51 e `SWCLK` no pino 49). Implemente apenas uma opção por módulo e defina uma estratégia de recuperação antes de reutilizar qualquer um desses contatos.
- SPI1 compartilha a rota do cartão TF de 1 bit. As linhas também usam os nomes genéricos do controlador `SDIO1_D0–D3`/`CMD`/`CLK`; os pinos 65/67 ainda têm as funções `CAN_TX`/`CAN_RX`.
- As linhas de dados Wi-Fi SDIO2 também usam os nomes genéricos do controlador `SDIO2_D0–D3`/`CMD`/`CLK`; vários desses contatos podem funcionar como entradas analógicas `GPADC`.
- SPI2 e I2C3/I2C4 (contatos 58, 56, 54 e 52) podem transportar sinais de microfone digital `PDM1`/`PDM2`, além dos nomes GPIO genéricos `G0–G3`/`BUS0–BUS3`.
- No grupo de seis posições `G11–G16`/`BUS11–BUS16`, UART3 usa os contatos 38/36, UART2 os 39/37 e I2C2 SDA/SCL os 35/34. São pares distintos, não três barramentos compartilhando os mesmos pinos. Cada par compartilha os contatos com os nomes GPIO correspondentes; confirme a operação simultânea no módulo selecionado.
- Os grupos de display QSPI e toque capacitivo são separados no nível de sinais, mas sua alimentação, reset e comportamento de despertar devem ser revisados como um único subsistema de display.
- `CAN_TX` e `CAN_RX` são sinais lógicos multiplexados nos pinos 65/67, não contatos exclusivos. A placa portadora ainda precisa de um transceptor CAN e da proteção adequada ao barramento do produto.

## Perfil multimídia M2xM { #m2xm-multimedia-profile }

M2xM é uma proposta de atribuição multimídia. A planilha local marca DPI e DVP como grupos principais e MIPI DSI e CSI como alternativos, mas não define o controle do mux nem as condições de uso simultâneo. Essas marcações não comprovam suporte em um módulo μForge ou encapsulamento de SoC específico; antes da implementação, confirme os recursos do dispositivo e os requisitos de roteamento na documentação do módulo selecionado.

<div align="center"><em>Tabela: atribuição funcional de M2xM</em></div>

<div align="center" markdown>

| Função | Rótulos na planilha da proposta | Evidências e limitações |
| --- | --- | --- |
| Display RGB / DPI | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC` e rótulos compartilhados de controle do display | DPI está marcado como primário. A planilha não lista atribuições 8080 nem EPD. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, reset, PWM de backlight e rótulos I2C | DSI está marcado como alternativa; seis contatos estão identificados como terra de blindagem (GND). A planilha não atribui sinal TE. |
| Controle de toque | Rótulos genéricos `I2C_SCL`, `I2C_SDA` e `RESET` | A aba M2xM não identifica uma atribuição específica de interrupção/reset do controlador de toque; o suporte ao toque não está verificado. |
| Câmera DVP de 12 bits | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, reset e rótulos I2C | São mostrados 20 contatos; a planilha não identifica o número do controlador I2C. |
| MIPI CSI | Pares diferenciais D0/D1, par de clock, PWDN, reset e rótulos I2C | CSI está marcado como alternativa; quatro contatos estão identificados como terra de blindagem (GND). Os detalhes de mux e uso simultâneo não estão especificados. |
| Microfones digitais | `PDM1_CLK/DATA` e `PDM2_CLK/DATA` | São mostrados quatro sinais PDM. |
| I2S / PCM | A aba M2xM disponível não apresenta sinais nem atribuições de contato I2S/PCM. | A atribuição não está verificada; não considere I2S/PCM parte deste mapa sem uma fonte aprovada. |

</div>


## Perfil de rede M2xN { #m2xn-networking-profile }

M2xN é um resumo não verificado de perfil de rede nesta página, não um mapa de contatos respaldado por fonte. A planilha de proposta disponível não contém uma aba M2xN, e não foi encontrada uma fonte primária da SiFli para essas atribuições. A lista de sinais e as contagens de contatos reservados abaixo não devem ser tratadas como verificadas.

<div align="center"><em>Tabela: atribuição funcional de M2xN</em></div>

<div align="center" markdown>

| Função | Resumo do rascunho (não verificado) |
| --- | --- |
| Ethernet | O texto do rascunho contém rótulos conflitantes: Gigabit Ethernet / RGMII e sinais `RMII_*`. Não há aqui um mapa original de contatos M2xN nem fonte primária da SiFli para resolver a divergência. A interface e a velocidade não estão verificadas; não atribua nenhuma delas a um produto sem confirmação em uma fonte aprovada. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` a `CAN4_TX/RX`, além dos controles `CAN1/2_STB` e `CAN1/2_ERR_N` onde atribuídos |
| UART | `UART1_TX/RX/CTS/RTS` e `UART2_TX/RX/CTS/RTS` |
| Reservados | 15 contatos GPIO e 12 contatos GND |

</div>

## Perfil analógico e de controle de movimento M2xA { #m2xa-analog-and-motion-control-profile }

M2xA é um resumo não verificado de controle de motores e aquisição nesta página, não um mapa de contatos respaldado por fonte. A planilha de proposta disponível não contém uma aba M2xA, e não foi encontrada uma fonte primária da SiFli para essas atribuições. Os nomes, as contagens e as atribuições físicas abaixo não devem ser tratados como verificados.

<div align="center"><em>Tabela: atribuição funcional de M2xA</em></div>

<div align="center" markdown>

| Função | Resumo do rascunho (não verificado) |
| --- | --- |
| Controle BLDC | O rascunho lista `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN` e `DRV_NFAULT`. Há duas identificações analógicas conflitantes de cinco canais (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` e `ADC_IN1–ADC_IN5`); outro resumo M2xA lista `ADC0–ADC2`. Não foi encontrado um mapa original de contatos M2xA nem uma fonte primária da SiFli que confirme os nomes, a contagem ou as atribuições. Trate esses dados como não resolvidos até que haja uma fonte de interface aprovada. |
| Realimentação de posição | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| Temporização geral | `TIM_CH1–TIM_CH6` |
| Reservados | 27 contatos GPIO e 13 contatos GND |

</div>

## Declaração do módulo e checklist de implementação { #module-declaration-and-implementation-checklist }

A declaração do módulo deve identificar a atribuição base e cada mapa de extensão compatível, por exemplo, `M2`, `M2 + M2xM` ou `M2 + M2xN + M2xA`. Também deve informar a quantidade de conectores com formato M2 implementados, suas categorias, as funções opcionais implementadas e os modos mutuamente exclusivos.

Antes de adotar este rascunho, verifique:

- Se o footprint, o contorno da placa, a fixação e a orientação de inserção propostos atendem aos requisitos M.2 aplicáveis.
- A quantidade, a posição e a categoria dos conectores com formato M2 no módulo e na placa portadora.
- Todas as funções multiplexadas selecionadas pelo módulo, incluindo compartilhamentos de SDIO1/SDIO2, PDM, SWD (UART de depuração ou interrupção/reset do toque) e CAN.
- Os requisitos específicos do módulo para tensão e corrente de E/S, reset, inicialização e sequência de alimentação.
- Se as funções MIPI, RGB, DVP, PDM ou I2S declaradas para M2xM podem operar simultaneamente ou apenas como modos alternativos.
- Os requisitos da placa portadora para transceptores CAN, proteção USB, alimentação/detecção de cartão TF, alimentação de display, amplificação de áudio e PHYs externos.
