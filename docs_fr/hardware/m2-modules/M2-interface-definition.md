---
icon: lucide/plug
description: "Répartition provisoire des contacts M2 et M2xM, avec résumés M2xN/M2xA non vérifiés et notes sur le partage des signaux."
tags:
  - Matériel
  - Module
  - Interface
---

# Définition de l'interface M2 { #m2-interface-definition }

!!! warning "Définition d'interface provisoire"
    Cette page consigne une proposition M2 provisoire. Un classeur local de proposition contient des feuilles M2 et M2xM, mais il cite un autre fichier, `M2E接口定义_0714.xlsx`, qui est absent ; la version et l'approbation de la proposition n'ont pas pu être établies. Aucune source primaire SiFli confirmant les affectations ou le nombre de contacts n'a été trouvée. Le classeur ne contient pas de feuilles M2xN ni M2xA ; les résumés correspondants ci-dessous ne sont donc pas vérifiés. Il ne s'agit pas d'une norme d'interface publiée par μForge.io. Considérez toutes les affectations comme provisoires et vérifiez le module, la carte porteuse, le connecteur, les limites électriques et le multiplexage des broches avant toute mise en production.

## Champ d'application { #scope }

Les feuilles M2 et M2xM du classeur local numérotent les positions de 1 à 75. Les positions 24–31 sont omises du plan de contacts ; chaque feuille présente donc 67 contacts numérotés. Les deux feuilles identifient ce plan comme celui d'un connecteur M.2 Key-E. La feuille M2xM précise en outre que le même module doit également intégrer l'interface de base M2. Ces indications de la proposition ne prouvent ni la conformité à la [spécification M.2 de PCI-SIG](https://pcisig.com/specification-overview/pci-express-m2) ni l'interchangeabilité entre module et carte porteuse. Elles ne permettent pas non plus de déduire le nombre ou la disposition des connecteurs physiques. Cet article contient aussi des résumés M2xN et M2xA, mais aucun plan de contacts d'origine n'a été trouvé pour ces profils.

- **M2** — connexions pour l'affichage, l'audio, le stockage, le débogage et les E/S embarquées générales.
- **M2xM** — proposition d'affectation multimédia pour l'affichage, la caméra et le PDM. Le résumé mentionne aussi I2S/PCM, mais la feuille M2xM disponible ne lui attribue aucun contact.
- **M2xN** — réseau, USB, CAN et signaux UART.
- **M2xA** — commande moteur, acquisition analogique, codeur et signaux de minuterie.

Dans le brouillon actuel, `M2xH` et `M2xP` sont des noms réservés auxquels aucun contact n'est affecté.

!!! info "Relation entre les connecteurs non définie"
    Le classeur local indique qu'un module M2xM doit également intégrer l'interface de base M2, sans préciser si les deux plans correspondent à des connecteurs physiques distincts ou partagés. Le nombre et la disposition des connecteurs ne peuvent donc pas être déduits. Le classeur ne contient pas non plus de plans de contacts M2xN ou M2xA.

## Convention de connecteur { #connector-convention }

Dans la feuille M2 du classeur local, les contacts impairs sont représentés sur la face supérieure et les pairs sur la face inférieure, vus depuis le bord de la carte. Les positions 24–31 ne figurent pas dans le plan et sont indiquées dans le projet comme une zone de détrompage proposée ; ce dessin ne prouve pas la conformité mécanique à la spécification M.2 E-key.

<div align="center"><em>Tableau : résumé du connecteur M2 et des extensions</em></div>

<div align="center" markdown>

| Élément | Définition |
| --- | --- |
| Format du connecteur | Plan provisoire de bord de carte numéroté de 1 à 75 ; 67 contacts représentés. Conformité M.2 E-key non vérifiée |
| Positions omises dans la proposition | 24–31 (indiquées comme zone de détrompage proposée) |
| Allocation de base | M2 |
| Allocation multimédia | M2xM |
| Contenu d'extension de ce projet | Plan de contacts M2xM ; résumés M2xN et M2xA uniquement, non vérifiés |
| Exemple de déclaration | `M2 + M2xM` |

</div>

## Profil de base M2 { #m2-base-profile }

M2 est le profil de base pour les produits connectés compacts. Son allocation est conçue pour couvrir un afficheur QSPI et une dalle tactile capacitive, le Wi-Fi SDIO, une carte TF SDIO 1 bit, l'audio analogique, le débogage, l'USB, le CAN et les bus généraux. Plusieurs contacts sont intentionnellement multiplexés afin qu'un même module puisse sélectionner la fonction adaptée à son SoC et à sa configuration produit.

<div align="center"><em>Tableau : allocation fonctionnelle M2</em></div>

<div align="center" markdown>

| Fonction | Signaux alloués | Intention de conception |
| --- | --- | --- |
| Alimentation | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT` et GND | Noms de signaux du plan proposé ; tension, courant et séquence d'alimentation ne sont pas spécifiés ici. |
| Afficheur QSPI | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | Panneau d'affichage QSPI, rétroéclairage et sélection de puce secondaire optionnelle. |
| Tactile capacitif | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Commande et interruption du tactile capacitif. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | Interface compagnon Wi-Fi SDIO 4 bits. |
| Carte TF | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | Interface carte TF 1 bit et détection de présence de carte. |
| Audio analogique | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Deux paires d'entrée analogique, polarisation de microphone, deux paires de DAC et activation du PA. |
| Débogage et récupération | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | UART de débogage, SWD et sélection du mode démarrage/récupération. |
| Bus série généraux | SPI1/SPI2, I2C2–I2C4, UART2/UART3, et lignes GPIO/bus générales (`G0–G17`/`BUS0–BUS17`) | Bus spécifiques au produit sélectionnés via le multiplexeur de broches du module ; I2C1 est alloué au contrôleur tactile. Plusieurs positions SPI2/I2C3/I2C4/UART3 peuvent alternativement porter les signaux de microphone numérique `PDM1`/`PDM2`. |
| Autres commandes | `CAN_TX/RX`, signaux USB/hôte USB, `PWR_KEY` | Bus de terrain, contrôle de rôle USB et entrée de touche d'alimentation. |

</div>

## Brochage M2 codé par couleur { #color-coded-m2-pinout-guide }

<div align="center"><em>Figure : légende des groupes de signaux M2</em></div>

<div class="m2-visual-guide" role="img" aria-label="Légende des couleurs du tableau de brochage M2 sur les deux faces">
<div class="m2-category-band">
<div class="m2-category m2-audio">Audio</div>
<div class="m2-category m2-display">Affichage</div>
<div class="m2-category m2-touch">Tactile</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Alimentation</div>
<div class="m2-category m2-debug">Dédié</div>
</div>
</div>

La barre colorée sert de légende. Le tableau ci-dessous présente les contacts des deux faces de la carte et le brochage de référence de ce projet M2, y compris les fonctions alternatives et le multiplexage ; il ne s'agit pas d'une spécification d'interface publiée.

### Attribution des contacts M2 { #m2-contact-assignment }

Ce tableau distingue les broches de la face inférieure, celles de la face supérieure et le connecteur CN1. Toute fonction multiplexée supplémentaire attribuée dans le classeur figure dans la colonne `Alt` (« fonction alternative »). La couleur de chaque cellule renvoie à la légende ci-dessus.

<div align="center"><em>Tableau : attribution des contacts de base M2</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alternative</th><th>Fonction</th><th>Broche&nbsp;inf.</th><th>CN1</th><th>Broche&nbsp;sup.</th><th>Fonction</th><th>Alternative</th></tr>
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
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Positions 24–31 omises (zone de détrompage proposée)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Positions 24–31 omises (zone de détrompage proposée)</td><td class="m2-blank"></td></tr>
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

### Descriptions des broches M2 { #m2-pin-descriptions }

Les groupes et les couleurs correspondent au tableau de contacts ci-dessus. Le classeur ne définit pas les directions d'E/S : cette colonne constitue donc une aide provisoire à l'intégration, du point de vue du module. I désigne une entrée, O une sortie et I/O un fonctionnement bidirectionnel. Les directions séparées par des virgules suivent l'ordre des signaux. Les lignes SPI et PDM supposent que le module fournit l'horloge ; les lignes SWD supposent un débogueur externe. Confirmez chaque direction et chaque exigence électrique dans la documentation du module et du SoC retenus.

Pour I2C, I/O décrit les lignes bidirectionnelles SDA/SCL ; cela ne garantit ni tous les modes contrôleur/cible ni la prise en charge de l'étirement d'horloge. Confirmez la configuration des broches et les résistances de rappel du module réel. Consultez la [spécification I2C de NXP](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). L'hypothèse d'une sortie d'horloge et d'une entrée de données PDM suit le raccordement microphone-hôte illustré dans la [note d'application PDM de ST](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf) ; elle ne prouve pas la disponibilité de cette fonction sur un module donné.

<div align="center"><em>Tableau : signaux M2 et directions provisoires</em></div>

<div align="center" markdown>

| Groupe de signaux | Signal | E/S | Description |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Alimentation</span> | `VBAT/VBATS` | I | Rail d'entrée batterie. |
| <span class="m2-chip m2-power">Alimentation</span> | `3.3V` | I | Rail d'alimentation 3,3 V. |
| <span class="m2-chip m2-power">Alimentation</span> | `CHG_INT` | O | Sortie d'interruption/état du chargeur. |
| <span class="m2-chip m2-power">Alimentation</span> | `USB_VIN` | I | Rail d'entrée USB / chemin de charge. |
| <span class="m2-chip m2-power">Alimentation</span> | `USB_DET` | I | Signal de détection USB. |
| <span class="m2-chip m2-power">Alimentation</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | Paire de données en mode hôte USB, distincte du port USB principal. |
| <span class="m2-chip m2-power">Alimentation</span> | `USB_OTG` | I/O | Nom de signal du classeur local ; la feuille indique « non pris en charge sur la plateforme actuelle ». Ne déduisez pas la prise en charge du nom du contact. |
| <span class="m2-chip m2-display">Affichage</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | Sélection de puce principale et secondaire optionnelle de l'afficheur QSPI. |
| <span class="m2-chip m2-display">Affichage</span> | `LCDC1_SPI_CLK` | O | Horloge de l'afficheur QSPI. |
| <span class="m2-chip m2-display">Affichage</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | Lignes de données de l'afficheur QSPI. |
| <span class="m2-chip m2-display">Affichage</span> | `LCDC1_SPI_TE` | I | Entrée de synchronisation tearing-effect depuis le panneau. |
| <span class="m2-chip m2-display">Affichage</span> | `LCDC1_SPI_RSTB` | O | Reset du panneau d'affichage, actif bas. |
| <span class="m2-chip m2-display">Affichage</span> | `LCD_BL_PWM` | O | Commande PWM du rétroéclairage. |
| <span class="m2-chip m2-touch">Tactile</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Bus I²C du contrôleur tactile capacitif. |
| <span class="m2-chip m2-touch">Tactile</span> | `CTP_INT` | I | Interruption du contrôleur tactile. |
| <span class="m2-chip m2-touch">Tactile</span> | `CTP_REST` | O | Reset du contrôleur tactile. Le classeur orthographie ce signal `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Horloge et commande SDIO du compagnon Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Lignes de données SDIO du compagnon Wi-Fi (4 bits). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Commande de mise hors tension du module Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Interruption Wi-Fi. Partage la broche 65 avec `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Signal de réveil Wi-Fi. Partage la broche 67 avec `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | Commande, horloge et données SDIO de la carte TF 1 bit. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | Détection de présence de la carte TF. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Alias génériques au niveau contrôleur pour les mêmes lignes physiques que les bus carte TF (SDIO1) et compagnon Wi-Fi (SDIO2) ; utilisez les noms spécifiques au rôle ci-dessus sauf si le module a besoin d'un SDIO 4 bits complet des deux côtés. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Signaux logiques pour un émetteur-récepteur CAN, multiplexés sur les broches 65 et 67 avec `WiFi_INT`/`WiFi_WAKE`. La carte porteuse doit également comporter un émetteur-récepteur CAN et une protection adaptés au bus du produit. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | Ce brochage attribue des fonctions ADC alternatives aux contacts Wi-Fi SDIO 74, 72, 70, 68, 66 et 64, ainsi qu'au contact 60 de `PWR_KEY`. |
| <span class="m2-chip m2-audio">Audio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Deux paires d'entrée différentielle pour microphone analogique. |
| <span class="m2-chip m2-audio">Audio</span> | `MIC_BIAS` | O | Alimentation de polarisation du microphone. |
| <span class="m2-chip m2-audio">Audio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Deux paires de sortie audio différentielle. |
| <span class="m2-chip m2-audio">Audio</span> | `AU_PA_EN` | O | Activation de l'amplificateur de puissance audio. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, multiplexé avec le chemin de la carte TF. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, multiplexé avec I2C3 et UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 utilise le contact 35 pour SDA et le contact 34 pour SCL. Ce plan de contacts ne confirme pas le partage avec `MPI/SD` indiqué précédemment. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, multiplexé avec SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, multiplexé avec SPI2 et UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 dispose de positions alternatives dans les groupes carte TF et SPI2, ainsi que sur les contacts 39/37. Le partage avec `MPI/SD` indiqué précédemment n'est pas confirmé ; vérifiez la sélection réelle du multiplexeur du module. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 dispose de positions alternatives dans le groupe SPI2/I2C4 et sur les contacts 38/36. Le partage avec `MPI/SD` indiqué précédemment n'est pas confirmé ; vérifiez la sélection réelle du multiplexeur du module. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Contacts GPIO/bus génériques, multiplexés avec SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2`, ou SWD selon la position. |
| <span class="m2-chip m2-audio">Audio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | Pour chaque paire de signaux de microphone numérique, CLK est une sortie du module et DATA une entrée. Ces fonctions partagent les contacts 58, 56, 54 et 52 avec SPI2/I2C3/I2C4/UART3. |
| <span class="m2-chip m2-debug">Dédié</span> | `DBG_UART1_TXD/RXD` | O/I | UART de débogage, multiplexé avec SWD. |
| <span class="m2-chip m2-debug">Dédié</span> | `SWDIO`, `SWCLK` | I/O, I | Port de débogage SWD. Deux options de partage alternatives : les positions UART de débogage (broches 43/41) ou les positions d'interruption/reset tactile (broches 51/49). Une seule option doit être implémentée par module. |
| <span class="m2-chip m2-debug">Dédié</span> | `SWD_SW` | I | Nom de signal du classeur local ; la commande ou la sélection du routage n'est pas définie. |
| <span class="m2-chip m2-debug">Dédié</span> | `BOOT_MODE` | I | Sélection du mode démarrage / récupération. |
| <span class="m2-chip m2-debug">Dédié</span> | `PWR_KEY` | I | Signal de touche d'alimentation. |
| <span class="m2-chip m2-gnd">Masse</span> | `GND` | — | Chemins de retour numériques et analogiques, répartis sur le connecteur. |

</div>

!!! info "Correction d'étiquetage des données SDIO Wi-Fi"
    Le classeur local affecte le contact 64 à `WiFi_SD2_D1` et indique qu'une révision antérieure y répétait par erreur l'étiquette D3. Cela documente uniquement une correction dans le brouillon ; ce n'est pas une confirmation du multiplexage des broches SiFli. Les deux bus SDIO comportent aussi des alias génériques de contrôleur dans la colonne « Alternative » : `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` pour le bus Wi-Fi et `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` pour le bus de la carte TF, en plus de leurs noms fonctionnels.

### Règles de partage M2 { #m2-sharing-rules }

- Le classeur marque le SWD comme une ressource multiplexée avec deux options de routage alternatives : les positions UART de débogage (`SWDIO` sur la broche 43, `SWCLK` sur la broche 41) ou les positions d'interruption/reset tactile (`SWDIO` sur la broche 51, `SWCLK` sur la broche 49). N'implémentez qu'une seule option par module et prévoyez une stratégie de récupération avant de réutiliser l'un de ces contacts.
- SPI1 est partagé avec le chemin de la carte TF 1 bit ; les deux sont également exposés en tant que bus contrôleur générique `SDIO1_D0–D3`/`CMD`/`CLK`, et les broches 65/67 portent en plus `CAN_TX`/`CAN_RX`.
- Les lignes de données SDIO2 Wi-Fi sont également exposées en tant que bus contrôleur générique `SDIO2_D0–D3`/`CMD`/`CLK` ; plusieurs des mêmes contacts font aussi office d'entrées analogiques `GPADC`.
- SPI2 et I2C3/I2C4 (contacts 58, 56, 54 et 52) peuvent alternativement porter les signaux de microphone numérique `PDM1`/`PDM2`, ainsi que des alias GPIO génériques `G0–G3`/`BUS0–BUS3`.
- Dans le groupe de six positions `G11–G16`/`BUS11–BUS16`, UART3 utilise les contacts 38/36, UART2 les contacts 39/37 et I2C2 SDA/SCL les contacts 35/34. Il s'agit de paires distinctes, pas de trois bus partageant les mêmes broches. Chaque paire partage ses contacts avec les alias GPIO correspondants ; confirmez le fonctionnement simultané sur le module retenu.
- Les groupes afficheur QSPI et tactile capacitif sont séparés au niveau du signal, mais leur alimentation, leur reset et leur comportement de réveil doivent être vérifiés comme un seul sous-système d'affichage.
- `CAN_TX` et `CAN_RX` sont des signaux logiques multiplexés sur les broches 65/67, et non des contacts distincts. La carte porteuse doit toujours comporter un émetteur-récepteur CAN et une protection adaptés au bus du produit.

## Profil multimédia M2xM { #m2xm-multimedia-profile }

M2xM est une proposition d'affectation multimédia. Le classeur local indique DPI/DVP comme groupes principaux et MIPI DSI/CSI comme groupes alternatifs, sans définir la commande du multiplexage ni les conditions d'utilisation simultanée. Ces mentions ne prouvent pas la prise en charge par un module μForge ou un boîtier SoC particulier ; vérifiez les capacités et les exigences de routage dans la documentation du module sélectionné avant l'implémentation.

<div align="center"><em>Tableau : allocation fonctionnelle M2xM</em></div>

<div align="center" markdown>

| Fonction | Noms de signaux dans le classeur local | Éléments établis et limites |
| --- | --- | --- |
| Affichage RGB / DPI | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC` et commandes d'affichage partagées | DPI est indiqué comme principal. Le classeur ne répertorie pas d'affectation 8080 ou EPD. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, reset, PWM de rétroéclairage et signaux I2C | DSI est indiqué comme alternative ; six contacts sont désignés comme masse de blindage (GND). Le classeur n'affecte aucun signal TE. |
| Commande tactile | Noms génériques `I2C_SCL`, `I2C_SDA` et `RESET` | La feuille M2xM ne définit pas d'affectation d'interruption/reset propre au tactile ; la prise en charge d'un contrôleur tactile n'est pas établie. |
| Caméra DVP 12 bits | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, reset et signaux I2C | 20 contacts sont représentés ; le numéro du contrôleur I2C n'est pas indiqué. |
| MIPI CSI | Voies différentielles D0/D1, paire d'horloge, PWDN, reset et signaux I2C | CSI est indiqué comme alternative ; quatre contacts sont désignés comme masse de blindage (GND). Le multiplexage et l'usage simultané ne sont pas spécifiés. |
| Microphones numériques | `PDM1_CLK/DATA` et `PDM2_CLK/DATA` | Quatre signaux PDM sont représentés. |
| I2S / PCM | La feuille M2xM disponible ne contient aucun signal ni affectation de contacts I2S/PCM. | L'affectation n'est pas vérifiée ; ne considérez pas I2S/PCM comme faisant partie de ce plan sans source approuvée. |

</div>


## Profil réseau M2xN { #m2xn-networking-profile }

M2xN est un résumé de profil réseau non vérifié dans cet article, pas un plan de contacts étayé par une source. Le classeur local disponible ne contient pas de feuille M2xN et aucune source primaire SiFli correspondante n'a été trouvée. La liste de signaux et le nombre de contacts réservés ci-dessous ne sont pas vérifiés.

<div align="center"><em>Tableau : allocation fonctionnelle M2xN</em></div>

<div align="center" markdown>

| Fonction | Résumé du projet (non vérifié) |
| --- | --- |
| Ethernet | Le texte du projet comporte des désignations contradictoires : Gigabit Ethernet / RGMII et signaux `RMII_*`. Aucun plan de contacts d'origine M2xN ni document primaire SiFli n'est disponible ici pour trancher. Le type d'interface et le débit ne sont pas vérifiés ; ne revendiquez aucune de ces capacités avant confirmation par une source approuvée. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` à `CAN4_TX/RX`, plus les commandes `CAN1/2_STB` et `CAN1/2_ERR_N` lorsqu'elles sont assignées |
| UART | `UART1_TX/RX/CTS/RTS` et `UART2_TX/RX/CTS/RTS` |
| Réservé | 15 contacts GPIO et 12 contacts GND |

</div>

## Profil analogique et commande de moteurs M2xA { #m2xa-analog-and-motion-control-profile }

M2xA est un résumé non vérifié de commande moteur et d'acquisition dans cet article, pas un plan de contacts étayé par une source. Le classeur local disponible ne contient pas de feuille M2xA et aucune source primaire SiFli correspondante n'a été trouvée. Les noms, nombres et affectations de signaux ci-dessous ne sont pas vérifiés.

<div align="center"><em>Tableau : allocation fonctionnelle M2xA</em></div>

<div align="center" markdown>

| Fonction | Résumé du projet (non vérifié) |
| --- | --- |
| Commande BLDC | Le projet répertorie `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN` et `DRV_NFAULT`. Deux désignations analogiques contradictoires à cinq voies apparaissent (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` et `ADC_IN1–ADC_IN5`) ; un autre résumé M2xA indique `ADC0–ADC2`. Aucun plan de contacts d'origine M2xA ni document primaire SiFli ne permet de vérifier les noms, le nombre ou l'affectation. Ces éléments restent à résoudre jusqu'à disponibilité d'une source approuvée. |
| Retour de position | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| Minuterie générale | `TIM_CH1–TIM_CH6` |
| Réservé | 27 contacts GPIO et 13 contacts GND |

</div>

## Déclaration du module et liste de vérification { #module-declaration-and-implementation-checklist }

Une déclaration de module doit indiquer son brochage de base et chaque profil d'extension pris en charge, par exemple `M2`, `M2 + M2xM` ou `M2 + M2xN + M2xA`. Elle doit préciser le nombre de connecteurs au format M2, leur catégorie, les fonctions optionnelles implémentées et les modes mutuellement exclusifs.

Avant d'adopter ce projet, vérifiez :

- La conformité éventuelle de l'empreinte proposée, du contour de la carte, de la fixation et de l'orientation d'insertion aux exigences M.2 applicables.
- Le nombre, l'emplacement et la catégorie des connecteurs de forme M2 sur le module et la carte porteuse.
- Toutes les fonctions multiplexées sélectionnées par le module, y compris tout routage partagé SDIO1/SDIO2, PDM, SWD (UART de débogage vs interruption/reset tactile), ou CAN.
- Les exigences de tension d'E/S, de courant, de reset, de démarrage et de séquencement d'alimentation spécifiques au module.
- Si une fonction M2xM MIPI, RGB, DVP, PDM ou I2S revendiquée est prise en charge simultanément ou seulement en mode alternatif.
- Les composants nécessaires sur la carte porteuse : émetteurs-récepteurs CAN, protection USB, alimentation et détection de la carte TF, alimentation de l'affichage, amplification audio et PHY externes.
