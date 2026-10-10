/* Interactive SF32 product-selection table (docs/sf32-products/product-selector.md
   and its localized twins). Loads docs/assets/data/product-selector.json (shared
   between languages via tools/link-shared-assets.sh) and renders a
   filterable table client-side -- there's no backend, so filtering,
   rendering, and link construction all happen here.

   Localized trees share this script through file symlinks.
   It detects document.documentElement.lang at runtime. */
(function () {
  "use strict";

  var pageLanguage = document.documentElement.lang.split("-")[0];
  var LANG = ["en", "zh", "ja", "es", "de", "fr", "pt", "ru"].indexOf(pageLanguage) >= 0 ? pageLanguage : "en";

  var STRINGS = {
    en: {
      loading: "Loading part data...",
      loadError: "Could not load product data. Try refreshing the page.",
      clearFilters: "Clear filters",
      filters: {
        tier: "Integration level",
        tierAny: "Any (chip or module)",
        tierChip: "Chip",
        tierModule: "Module",
        wifi: "SDIO for external WiFi",
        camera: "Camera interface (DCMI)",
        ai: "AI / ML accelerator",
        freeIo: "FreeIO flexible GPIO assignment",
        ptm: "PTM (Peripheral Task Machine)",
        psram: "Max PSRAM needed",
        psramAny: "Any",
        gpio: "Max GPIO count needed",
        gpioAny: "Any",
        package: "Package type",
        packageAny: "Any",
        packageQfn68: "QFN68 (7 x 7 mm, 44-48 GPIO)",
        packageQfn80: "QFN80 (8 x 8 mm, up to 58 GPIO)",
        packageBga: "BGA (smaller footprint, more GPIO)",
        power: "Power supply",
        powerAny: "Any",
        powerLiIon: "Li-ion battery powered (direct 3.2-4.7V rail)",
        power3v3: "3.3V supply",
        power1v8: "Down to 1.8V supply",
        display: "Display interface",
        displayAny: "Any",
        displayQspi: "QSPI",
        displayRgb: "RGB",
        displayMipi: "MIPI",
        displayEpd: "EPD",
        displayJdi: "JDI",
        resolution: "Target resolution",
        resolutionAny: "Any",
        sdio: "Min. # of SDIO",
        sdioAny: "Any",
        audioDac: "Min. audio DAC",
        audioDacAny: "Any",
        audioAdc: "Min. audio ADC",
        audioAdcAny: "Any",
        audioPdm: "Min. PDM interfaces",
        audioPdmAny: "Any",
        audioI2s: "Min. I2S interfaces",
        audioI2sAny: "Any",
      },
      table: {
        name: "Part number",
        wifi: "SDIO for ext WiFi",
        camera: "Camera",
        ai: "AI accel",
        freeIo: "FreeIO",
        ptm: "PTM",
        psram: "PSRAM",
        flash: "NOR Flash",
        gpio: "Max GPIO",
        package: "Package",
        power: "Power supply",
        ioVoltage: "I/O voltage",
        display: "Display interfaces",
        resolution: "Max resolution",
        audioDac: "Audio DAC",
        audioAdc: "Audio ADC",
        audioPdm: "PDM interfaces",
        audioI2s: "I2S interfaces",
        uart: "UART",
        i2c: "I2C",
        spi: "SPI",
        can: "CAN",
        gpadcCh: "GPADC Ch",
        usb: "USB2.0",
      },
      yes: "Yes",
      no: "—",
      noMatchReasonPrefix: "Doesn't match:",
      reasons: {
        tier: "integration level",
        wifi: "no external Wi-Fi",
        camera: "no camera interface",
        ai: "no AI accelerator",
        freeIo: "no FreeIO support",
        ptm: "no PTM support",
        psram: "PSRAM capacity too small",
        gpio: "GPIO count too low",
        packageQfn68: "not available in QFN68",
        packageQfn80: "not available in QFN80",
        packageBga: "not available in BGA",
        powerLiIon: "no direct Li-ion rail documented",
        power3v3: "no 3.3V supply documented",
        power1v8: "doesn't go down to 1.8V",
        display: "missing display interface",
        resolution: "resolution below target",
        sdio: "not enough SD/SDIO controllers",
        audioDac: "not enough audio DAC",
        audioAdc: "not enough audio ADC",
        audioPdm: "not enough PDM interfaces",
        audioI2s: "not enough I2S interfaces",
      },
      noResults: "No parts match every filter. Try loosening one of them.",
    },
    zh: {
      loading: "正在加载器件数据...",
      loadError: "无法加载产品数据，请刷新页面重试。",
      clearFilters: "清除筛选条件",
      filters: {
        tier: "集成层级",
        tierAny: "任意（芯片或模组）",
        tierChip: "芯片",
        tierModule: "模组",
        wifi: "外接 WiFi 用 SDIO",
        camera: "摄像头接口（DCMI）",
        ai: "AI / 机器学习加速器",
        freeIo: "FreeIO 灵活 GPIO 分配",
        ptm: "PTM（外设任务机）",
        psram: "所需最大 PSRAM",
        psramAny: "任意",
        gpio: "所需最大 GPIO 数量",
        gpioAny: "任意",
        package: "封装类型",
        packageAny: "任意",
        packageQfn68: "QFN68（7 x 7 mm，44~48 GPIO）",
        packageQfn80: "QFN80（8 x 8 mm，最多 58 GPIO）",
        packageBga: "BGA（更小尺寸，更多 GPIO）",
        power: "供电电压",
        powerAny: "任意",
        powerLiIon: "锂电池供电（直连 3.2~4.7V 电源轨）",
        power3v3: "3.3V 供电",
        power1v8: "支持低至 1.8V 供电",
        display: "显示接口",
        displayAny: "任意",
        displayQspi: "QSPI",
        displayRgb: "RGB",
        displayMipi: "MIPI",
        displayEpd: "EPD",
        displayJdi: "JDI",
        resolution: "目标分辨率",
        resolutionAny: "任意",
        sdio: "最少 SDIO 数量",
        sdioAny: "任意",
        audioDac: "最少音频 DAC 数",
        audioDacAny: "任意",
        audioAdc: "最少音频 ADC 数",
        audioAdcAny: "任意",
        audioPdm: "最少 PDM 接口",
        audioPdmAny: "任意",
        audioI2s: "最少 I2S 接口",
        audioI2sAny: "任意",
      },
      table: {
        name: "器件型号",
        wifi: "外接 WiFi 用 SDIO",
        camera: "摄像头",
        ai: "AI 加速",
        freeIo: "FreeIO",
        ptm: "PTM",
        psram: "PSRAM",
        flash: "NOR Flash",
        gpio: "最大 GPIO",
        package: "封装",
        power: "供电电压",
        ioVoltage: "I/O 电压",
        display: "显示接口",
        resolution: "最大分辨率",
        audioDac: "音频 DAC",
        audioAdc: "音频 ADC",
        audioPdm: "PDM 接口数",
        audioI2s: "I2S 接口数",
        uart: "UART",
        i2c: "I2C",
        spi: "SPI",
        can: "CAN",
        gpadcCh: "GPADC 通道",
        usb: "USB2.0",
      },
      yes: "是",
      no: "—",
      noMatchReasonPrefix: "不符合：",
      reasons: {
        tier: "集成层级",
        wifi: "无外接 Wi-Fi",
        camera: "无摄像头接口",
        ai: "无 AI 加速器",
        freeIo: "不支持 FreeIO",
        ptm: "不支持 PTM",
        psram: "PSRAM 容量不足",
        gpio: "GPIO 数量不足",
        packageQfn68: "无 QFN68 封装可选",
        packageQfn80: "无 QFN80 封装可选",
        packageBga: "无 BGA 封装可选",
        powerLiIon: "未记录直连锂电池电源轨",
        power3v3: "未记录 3.3V 供电",
        power1v8: "无法降至 1.8V 供电",
        display: "缺少所需显示接口",
        resolution: "分辨率低于目标值",
        sdio: "SD/SDIO 控制器数量不足",
        audioDac: "音频 DAC 数量不足",
        audioAdc: "音频 ADC 数量不足",
        audioPdm: "PDM 接口数量不足",
        audioI2s: "I2S 接口数量不足",
      },
      noResults: "没有器件满足全部筛选条件，请适当放宽某一项。",
    },
  };

  STRINGS.ja = {
    loading: "製品データを読み込み中...",
    loadError: "製品データを読み込めませんでした。ページを再読み込みしてください。",
    clearFilters: "絞り込みを解除",
    filters: {
      tier: "実装形態", tierAny: "指定なし（チップまたはモジュール）",
      tierChip: "チップ", tierModule: "モジュール", wifi: "外付け Wi-Fi 用 SDIO",
      camera: "カメラインターフェース（DCMI）", ai: "AI / ML アクセラレータ",
      freeIo: "FreeIO による柔軟な GPIO 割り当て", ptm: "PTM（周辺タスクエンジン）",
      psram: "必要な PSRAM 容量", psramAny: "指定なし",
      gpio: "必要な GPIO 数", gpioAny: "指定なし",
      package: "パッケージ", packageAny: "指定なし",
      packageQfn68: "QFN68（7 x 7 mm、44-48 GPIO）",
      packageQfn80: "QFN80（8 x 8 mm、最大 58 GPIO）",
      packageBga: "BGA（小型、多数の GPIO）",
      power: "電源", powerAny: "指定なし",
      powerLiIon: "リチウムイオン電池から直接給電（3.2～4.7 V）",
      power3v3: "3.3 V 電源", power1v8: "最低 1.8 V の電源に対応",
      display: "表示インターフェース", displayAny: "指定なし",
      displayQspi: "QSPI", displayRgb: "RGB", displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI",
      resolution: "目標解像度", resolutionAny: "指定なし",
      sdio: "SDIO の最小数", sdioAny: "指定なし",
      audioDac: "音声 DAC の最小数", audioDacAny: "指定なし",
      audioAdc: "音声 ADC の最小数", audioAdcAny: "指定なし",
      audioPdm: "PDM インターフェースの最小数", audioPdmAny: "指定なし",
      audioI2s: "I2S インターフェースの最小数", audioI2sAny: "指定なし"
    },
    table: {
      name: "型番", wifi: "外付け Wi-Fi 用 SDIO", camera: "カメラ", ai: "AI アクセラレータ",
      freeIo: "FreeIO", ptm: "PTM", psram: "PSRAM", flash: "NOR Flash", gpio: "最大 GPIO 数",
      package: "パッケージ", power: "電源", ioVoltage: "I/O 電圧", display: "表示インターフェース",
      resolution: "最大解像度", audioDac: "音声 DAC", audioAdc: "音声 ADC", audioPdm: "PDM インターフェース数",
      audioI2s: "I2S インターフェース数", uart: "UART", i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "GPADC チャネル", usb: "USB2.0"
    },
    yes: "対応", no: "—", noMatchReasonPrefix: "条件に不一致：",
    reasons: {
      tier: "実装形態", wifi: "外付け Wi-Fi 非対応", camera: "カメラインターフェースなし",
      ai: "AI アクセラレータなし", freeIo: "FreeIO 非対応", ptm: "PTM 非対応",
      psram: "PSRAM 容量不足", gpio: "GPIO 数不足", packageQfn68: "QFN68 の選択肢なし",
      packageQfn80: "QFN80 の選択肢なし", packageBga: "BGA の選択肢なし",
      powerLiIon: "リチウムイオン電池からの直接給電は未記載", power3v3: "3.3 V 給電は未記載",
      power1v8: "1.8V までの低電圧給電に非対応", display: "必要な表示インターフェースなし",
      resolution: "目標解像度に未達", sdio: "SD/SDIO コントローラ数不足",
      audioDac: "音声 DAC 数不足", audioAdc: "音声 ADC 数不足",
      audioPdm: "PDM インターフェース数が不足", audioI2s: "I2S インターフェース数が不足"
    },
    noResults: "すべての条件を満たす製品がありません。いずれかの条件を緩めてください。"
  };
  STRINGS.es = {
    loading: "Cargando datos de productos...",
    loadError: "No se pudieron cargar los datos. Vuelva a cargar la página.",
    clearFilters: "Borrar filtros",
    filters: {
      tier: "Nivel de integración", tierAny: "Cualquiera (chip o módulo)", tierChip: "Chip", tierModule: "Módulo",
      wifi: "SDIO para Wi-Fi externo", camera: "Interfaz de cámara (DCMI)", ai: "Acelerador de IA / ML",
      freeIo: "Asignación flexible de GPIO con FreeIO", ptm: "PTM (motor de tareas de periféricos)",
      psram: "Máx. de PSRAM requerida", psramAny: "Cualquiera", gpio: "Máx. de GPIO necesarios", gpioAny: "Cualquiera",
      package: "Encapsulado", packageAny: "Cualquiera",
      packageQfn68: "QFN68 (7 x 7 mm, 44-48 GPIO)", packageQfn80: "QFN80 (8 x 8 mm, hasta 58 GPIO)",
      packageBga: "BGA (menor superficie, más GPIO)", power: "Alimentación", powerAny: "Cualquiera",
      powerLiIon: "Batería Li-ion (alimentación directa, 3,2–4,7 V)",
      power3v3: "Alimentación de 3,3 V", power1v8: "Admite una tensión mínima de 1,8 V",
      display: "Interfaz de pantalla", displayAny: "Cualquiera", displayQspi: "QSPI", displayRgb: "RGB",
      displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI", resolution: "Resolución objetivo", resolutionAny: "Cualquiera",
      sdio: "Mín. de SDIO", sdioAny: "Cualquiera", audioDac: "Mín. de DAC de audio", audioDacAny: "Cualquiera",
      audioAdc: "Mín. de ADC de audio", audioAdcAny: "Cualquiera", audioPdm: "Mín. de interfaces PDM", audioPdmAny: "Cualquiera",
      audioI2s: "Mín. de interfaces I2S", audioI2sAny: "Cualquiera"
    },
    table: {
      name: "Referencia", wifi: "SDIO para Wi-Fi ext.", camera: "Cámara", ai: "Acel. IA", freeIo: "FreeIO", ptm: "PTM",
      psram: "PSRAM", flash: "NOR Flash", gpio: "GPIO máx.", package: "Encapsulado", power: "Alimentación",
      ioVoltage: "Tensión de E/S", display: "Interfaces de pantalla", resolution: "Resolución máx.",
      audioDac: "DAC de audio", audioAdc: "ADC de audio", audioPdm: "Interfaces PDM", audioI2s: "Interfaces I2S", uart: "UART",
      i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "Canales GPADC", usb: "USB2.0"
    },
    yes: "Sí", no: "—", noMatchReasonPrefix: "No cumple:",
    reasons: {
      tier: "nivel de integración", wifi: "sin Wi-Fi externo", camera: "sin interfaz de cámara", ai: "sin acelerador de IA",
      freeIo: "sin soporte FreeIO", ptm: "sin soporte PTM", psram: "capacidad PSRAM insuficiente", gpio: "número de GPIO insuficiente",
      packageQfn68: "no disponible en QFN68", packageQfn80: "no disponible en QFN80", packageBga: "no disponible en BGA",
      powerLiIon: "alimentación directa de ion-litio no documentada", power3v3: "alimentación de 3.3V no documentada",
      power1v8: "no admite alimentación desde 1.8V", display: "falta la interfaz de pantalla", resolution: "resolución inferior al objetivo",
      sdio: "controladores SD/SDIO insuficientes", audioDac: "DAC de audio insuficientes", audioAdc: "ADC de audio insuficientes",
      audioPdm: "interfaces PDM insuficientes", audioI2s: "interfaces I2S insuficientes"
    },
    noResults: "Ningún producto cumple todos los filtros. Pruebe a flexibilizar alguno."
  };
  STRINGS.de = {
    loading: "Teiledaten werden geladen...",
    loadError: "Produktdaten konnten nicht geladen werden. Bitte Seite neu laden.",
    clearFilters: "Filter zurücksetzen",
    filters: {
      tier: "Integrationsebene", tierAny: "Beliebig (Chip oder Modul)", tierChip: "Chip", tierModule: "Modul",
      wifi: "SDIO für externes Wi-Fi", camera: "Kameraschnittstelle (DCMI)", ai: "KI-/ML-Beschleuniger",
      freeIo: "Flexible GPIO-Zuweisung mit FreeIO", ptm: "PTM (Peripheral Task Machine)",
      psram: "Benötigte PSRAM-Kapazität (max.)", psramAny: "Beliebig", gpio: "Benötigte GPIO-Anzahl (max.)", gpioAny: "Beliebig",
      package: "Gehäusetyp", packageAny: "Beliebig",
      packageQfn68: "QFN68 (7 x 7 mm, 44-48 GPIO)", packageQfn80: "QFN80 (8 x 8 mm, bis zu 58 GPIO)",
      packageBga: "BGA (kleinere Grundfläche, mehr GPIO)", power: "Stromversorgung", powerAny: "Beliebig",
      powerLiIon: "Li-Ion-Akku (direkte Versorgung mit 3,2–4,7 V)",
      power3v3: "Versorgung mit 3,3 V", power1v8: "Versorgung bis hinunter zu 1,8 V",
      display: "Display-Schnittstelle", displayAny: "Beliebig", displayQspi: "QSPI", displayRgb: "RGB",
      displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI", resolution: "Zielauflösung", resolutionAny: "Beliebig",
      sdio: "Min. Anzahl SDIO", sdioAny: "Beliebig", audioDac: "Min. Audio-DAC", audioDacAny: "Beliebig",
      audioAdc: "Min. Audio-ADC", audioAdcAny: "Beliebig", audioPdm: "Min. PDM-Schnittstellen", audioPdmAny: "Beliebig",
      audioI2s: "Min. I2S-Schnittstellen", audioI2sAny: "Beliebig"
    },
    table: {
      name: "Teilenummer", wifi: "SDIO für ext. Wi-Fi", camera: "Kamera", ai: "KI-Beschl.", freeIo: "FreeIO", ptm: "PTM",
      psram: "PSRAM", flash: "NOR-Flash", gpio: "Max. GPIO", package: "Gehäuse", power: "Stromversorgung",
      ioVoltage: "E/A-Spannung", display: "Display-Schnittstellen", resolution: "Max. Auflösung",
      audioDac: "Audio-DAC", audioAdc: "Audio-ADC", audioPdm: "PDM-Schnittstellen", audioI2s: "I2S-Schnittstellen", uart: "UART",
      i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "GPADC-Kanäle", usb: "USB2.0"
    },
    yes: "Ja", no: "—", noMatchReasonPrefix: "Nicht erfüllt:",
    reasons: {
      tier: "Integrationsebene", wifi: "kein externes Wi-Fi", camera: "keine Kameraschnittstelle", ai: "kein KI-Beschleuniger",
      freeIo: "kein FreeIO-Support", ptm: "kein PTM-Support", psram: "PSRAM-Kapazität zu gering", gpio: "GPIO-Anzahl zu gering",
      packageQfn68: "nicht in QFN68 verfügbar", packageQfn80: "nicht in QFN80 verfügbar", packageBga: "nicht in BGA verfügbar",
      powerLiIon: "keine direkte Li-Ion-Versorgung dokumentiert", power3v3: "keine 3,3V-Versorgung dokumentiert",
      power1v8: "unterstützt keine Versorgung bis hinunter zu 1,8 V", display: "erforderliche Display-Schnittstelle fehlt", resolution: "Auflösung unter Zielwert",
      sdio: "nicht genug SD/SDIO-Controller", audioDac: "nicht genug Audio-DAC", audioAdc: "nicht genug Audio-ADC",
      audioPdm: "zu wenige PDM-Schnittstellen", audioI2s: "zu wenige I2S-Schnittstellen"
    },
    noResults: "Kein Bauteil erfüllt alle Filter. Bitte einen Filter lockern."
  };
  STRINGS.fr = {
    loading: "Chargement des données produit...",
    loadError: "Impossible de charger les données produit. Veuillez actualiser la page.",
    clearFilters: "Effacer les filtres",
    filters: {
      tier: "Niveau d'intégration", tierAny: "Tous (puce ou module)", tierChip: "Puce", tierModule: "Module",
      wifi: "SDIO pour Wi-Fi externe", camera: "Interface caméra (DCMI)", ai: "Accélérateur IA / ML",
      freeIo: "Attribution GPIO flexible avec FreeIO", ptm: "PTM (moteur de tâches périphériques)",
      psram: "PSRAM requise (max.)", psramAny: "Tous", gpio: "GPIO requis (max.)", gpioAny: "Tous",
      package: "Type de boîtier", packageAny: "Tous",
      packageQfn68: "QFN68 (7 x 7 mm, 44-48 GPIO)", packageQfn80: "QFN80 (8 x 8 mm, jusqu'à 58 GPIO)",
      packageBga: "BGA (empreinte plus petite, plus de GPIO)", power: "Alimentation", powerAny: "Tous",
      powerLiIon: "Batterie Li-ion (alimentation directe, 3,2–4,7 V)",
      power3v3: "Alimentation 3,3 V", power1v8: "Tension minimale d'alimentation : 1,8 V",
      display: "Interface d'affichage", displayAny: "Tous", displayQspi: "QSPI", displayRgb: "RGB",
      displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI", resolution: "Résolution cible", resolutionAny: "Tous",
      sdio: "Min. de SDIO", sdioAny: "Tous", audioDac: "Min. DAC audio", audioDacAny: "Tous",
      audioAdc: "Min. ADC audio", audioAdcAny: "Tous", audioPdm: "Min. d'interfaces PDM", audioPdmAny: "Tous",
      audioI2s: "Min. d'interfaces I2S", audioI2sAny: "Tous"
    },
    table: {
      name: "Référence", wifi: "SDIO Wi-Fi ext.", camera: "Caméra", ai: "Accél. IA", freeIo: "FreeIO", ptm: "PTM",
      psram: "PSRAM", flash: "NOR Flash", gpio: "GPIO max.", package: "Boîtier", power: "Alimentation",
      ioVoltage: "Tension E/S", display: "Interfaces d'affichage", resolution: "Résolution max.",
      audioDac: "DAC audio", audioAdc: "ADC audio", audioPdm: "Interfaces PDM", audioI2s: "Interfaces I2S", uart: "UART",
      i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "Canaux GPADC", usb: "USB2.0"
    },
    yes: "Oui", no: "—", noMatchReasonPrefix: "Ne correspond pas :",
    reasons: {
      tier: "niveau d'intégration", wifi: "pas de Wi-Fi externe", camera: "pas d'interface caméra", ai: "pas d'accélérateur IA",
      freeIo: "pas de support FreeIO", ptm: "pas de support PTM", psram: "capacité PSRAM insuffisante", gpio: "nombre de GPIO insuffisant",
      packageQfn68: "non disponible en QFN68", packageQfn80: "non disponible en QFN80", packageBga: "non disponible en BGA",
      powerLiIon: "alimentation directe Li-ion non documentée", power3v3: "alimentation 3,3 V non documentée",
      power1v8: "ne prend pas en charge une alimentation jusqu'à 1,8 V", display: "interface d'affichage requise manquante", resolution: "résolution inférieure à la cible",
      sdio: "contrôleurs SD/SDIO insuffisants", audioDac: "DAC audio insuffisants", audioAdc: "ADC audio insuffisants",
      audioPdm: "interfaces PDM en nombre insuffisant", audioI2s: "interfaces I2S en nombre insuffisant"
    },
    noResults: "Aucun composant ne correspond à tous les filtres. Essayez d'assouplir l'un d'eux."
  };
  STRINGS.pt = {
    loading: "Carregando dados dos componentes...",
    loadError: "Não foi possível carregar os dados dos produtos. Atualize a página.",
    clearFilters: "Limpar filtros",
    filters: {
      tier: "Nível de integração", tierAny: "Qualquer (chip ou módulo)", tierChip: "Chip", tierModule: "Módulo",
      wifi: "SDIO para Wi-Fi externo", camera: "Interface de câmera (DCMI)", ai: "Acelerador de IA / ML",
      freeIo: "Atribuição flexível de GPIO (FreeIO)", ptm: "PTM (Peripheral Task Machine)",
      psram: "Capacidade máxima de PSRAM necessária", psramAny: "Qualquer", gpio: "Máximo de GPIO necessários", gpioAny: "Qualquer",
      package: "Tipo de encapsulamento", packageAny: "Qualquer",
      packageQfn68: "QFN68 (7 x 7 mm, 44–48 GPIO)", packageQfn80: "QFN80 (8 x 8 mm, até 58 GPIO)",
      packageBga: "BGA (menor área, mais GPIO)", power: "Alimentação", powerAny: "Qualquer",
      powerLiIon: "Bateria Li-ion (alimentação direta de 3,2–4,7 V)", power3v3: "Alimentação de 3,3 V",
      power1v8: "Alimentação a partir de 1,8 V", display: "Interface de display", displayAny: "Qualquer",
      displayQspi: "QSPI", displayRgb: "RGB", displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI",
      resolution: "Resolução desejada", resolutionAny: "Qualquer", sdio: "Mínimo de SDIO", sdioAny: "Qualquer",
      audioDac: "Mínimo de DAC de áudio", audioDacAny: "Qualquer", audioAdc: "Mínimo de ADC de áudio", audioAdcAny: "Qualquer",
      audioPdm: "Mínimo de interfaces PDM", audioPdmAny: "Qualquer", audioI2s: "Mínimo de interfaces I2S", audioI2sAny: "Qualquer"
    },
    table: {
      name: "Código do componente", wifi: "SDIO para Wi-Fi externo", camera: "Câmera", ai: "Acelerador de IA",
      freeIo: "FreeIO", ptm: "PTM", psram: "PSRAM", flash: "Flash NOR", gpio: "Máx. de GPIO",
      package: "Encapsulamento", power: "Alimentação", ioVoltage: "Tensão de I/O", display: "Interfaces de display",
      resolution: "Resolução máx.", audioDac: "DAC de áudio", audioAdc: "ADC de áudio", audioPdm: "Interfaces PDM",
      audioI2s: "Interfaces I2S", uart: "UART", i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "Canais GPADC", usb: "USB 2.0"
    },
    yes: "Sim", no: "—", noMatchReasonPrefix: "Não atende:",
    reasons: {
      tier: "nível de integração", wifi: "sem Wi-Fi externo", camera: "sem interface de câmera", ai: "sem acelerador de IA",
      freeIo: "sem suporte a FreeIO", ptm: "sem suporte a PTM", psram: "capacidade de PSRAM insuficiente",
      gpio: "quantidade de GPIO insuficiente", packageQfn68: "indisponível em QFN68", packageQfn80: "indisponível em QFN80",
      packageBga: "indisponível em BGA", powerLiIon: "alimentação direta por Li-ion não documentada",
      power3v3: "alimentação de 3,3 V não documentada", power1v8: "não aceita alimentação de até 1,8 V",
      display: "falta a interface de display necessária", resolution: "resolução abaixo da desejada",
      sdio: "controladores SD/SDIO insuficientes", audioDac: "DACs de áudio insuficientes",
      audioAdc: "ADCs de áudio insuficientes", audioPdm: "interfaces PDM insuficientes", audioI2s: "interfaces I2S insuficientes"
    },
    noResults: "Nenhum componente atende a todos os filtros. Tente flexibilizar algum deles."
  };

  STRINGS.ru = {
    loading: "Загрузка данных о компонентах...",
    loadError: "Не удалось загрузить данные о продуктах. Обновите страницу.",
    clearFilters: "Сбросить фильтры",
    filters: {
      tier: "Уровень интеграции", tierAny: "Любой вариант (микросхема или модуль)", tierChip: "Микросхема", tierModule: "Модуль",
      wifi: "SDIO для внешнего Wi-Fi", camera: "Интерфейс камеры (DCMI)", ai: "Ускоритель AI / ML",
      freeIo: "Гибкое назначение GPIO (FreeIO)", ptm: "PTM (Peripheral Task Machine)",
      psram: "Максимально требуемый объём PSRAM", psramAny: "Любой", gpio: "Максимально требуемое число GPIO", gpioAny: "Любое",
      package: "Тип корпуса", packageAny: "Любой",
      packageQfn68: "QFN68 (7 × 7 мм, 44–48 GPIO)", packageQfn80: "QFN80 (8 × 8 мм, до 58 GPIO)",
      packageBga: "BGA (меньше площадь, больше GPIO)", power: "Питание", powerAny: "Любое",
      powerLiIon: "Питание от аккумулятора Li-ion (прямая шина 3,2–4,7 В)", power3v3: "Питание 3,3 В",
      power1v8: "Питание от 1,8 В", display: "Интерфейс дисплея", displayAny: "Любой",
      displayQspi: "QSPI", displayRgb: "RGB", displayMipi: "MIPI", displayEpd: "EPD", displayJdi: "JDI",
      resolution: "Целевое разрешение", resolutionAny: "Любое", sdio: "Мин. число SDIO", sdioAny: "Любое",
      audioDac: "Мин. число аудио DAC", audioDacAny: "Любое", audioAdc: "Мин. число аудио ADC", audioAdcAny: "Любое",
      audioPdm: "Мин. число интерфейсов PDM", audioPdmAny: "Любое", audioI2s: "Мин. число интерфейсов I2S", audioI2sAny: "Любое"
    },
    table: {
      name: "Номер модели", wifi: "SDIO для внешнего Wi-Fi", camera: "Камера", ai: "AI-ускоритель",
      freeIo: "FreeIO", ptm: "PTM", psram: "PSRAM", flash: "NOR Flash", gpio: "Макс. число GPIO",
      package: "Корпус", power: "Питание", ioVoltage: "Напряжение I/O", display: "Интерфейсы дисплея",
      resolution: "Макс. разрешение", audioDac: "Аудио DAC", audioAdc: "Аудио ADC", audioPdm: "Интерфейсы PDM",
      audioI2s: "Интерфейсы I2S", uart: "UART", i2c: "I2C", spi: "SPI", can: "CAN", gpadcCh: "Каналы GPADC", usb: "USB 2.0"
    },
    yes: "Да", no: "—", noMatchReasonPrefix: "Не соответствует:",
    reasons: {
      tier: "неподходящий уровень интеграции", wifi: "нет SDIO для внешнего Wi-Fi", camera: "нет интерфейса камеры",
      ai: "нет AI-ускорителя", freeIo: "нет поддержки FreeIO", ptm: "нет поддержки PTM",
      psram: "недостаточный объём PSRAM", gpio: "слишком мало GPIO", packageQfn68: "недоступно в корпусе QFN68",
      packageQfn80: "недоступно в корпусе QFN80", packageBga: "недоступно в корпусе BGA",
      powerLiIon: "прямое питание от Li-ion не указано в документации", power3v3: "питание 3,3 В не указано в документации",
      power1v8: "питание при напряжении 1,8 В не поддерживается", display: "нет требуемого интерфейса дисплея",
      resolution: "разрешение ниже целевого", sdio: "недостаточно контроллеров SD/SDIO",
      audioDac: "недостаточно аудио DAC", audioAdc: "недостаточно аудио ADC",
      audioPdm: "недостаточно интерфейсов PDM", audioI2s: "недостаточно интерфейсов I2S"
    },
    noResults: "Ни одна модель не соответствует всем фильтрам. Попробуйте ослабить один из них."
  };

  var t = STRINGS[LANG];

  function mdPathToUrl(relPath) {
    var parts = relPath.split("/");
    var filename = parts.pop();
    var dir = parts.join("/");
    var url;
    if (filename === "index.md") {
      url = "/" + dir;
    } else {
      var stem = filename.replace(/\.md$/, "");
      url = dir ? "/" + dir + "/" + stem : "/" + stem;
    }
    if (LANG !== "en") {
      url = "/" + LANG + url;
    }
    return url.replace(/\/+$/, "") + "/";
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c) node.appendChild(c);
    });
    return node;
  }

  function evaluate(record, state) {
    var reasons = [];
    if (state.tier !== "any" && record.tier !== state.tier) reasons.push(t.reasons.tier);
    if (state.wifi && !record.wifi) reasons.push(t.reasons.wifi);
    if (state.camera && !record.camera) reasons.push(t.reasons.camera);
    if (state.ai && !record.ai_accelerator) reasons.push(t.reasons.ai);
    if (state.free_io && !record.free_io) reasons.push(t.reasons.freeIo);
    if (state.ptm && !record.ptm) reasons.push(t.reasons.ptm);
    if (state.psram !== "any" && record.psram_max_mb < parseInt(state.psram, 10)) reasons.push(t.reasons.psram);
    if (state.gpio !== "any" && record.gpio_max < parseInt(state.gpio, 10)) reasons.push(t.reasons.gpio);

    // Package, power, and display interface are each a single-select
    // dropdown (state holds one value, or "any"), not independent
    // checkboxes -- a part is checked against whichever one value was
    // picked rather than a combination of criteria.
    var packageTypes = record.package_types || [];
    if (state.package !== "any" && packageTypes.indexOf(state.package) === -1) {
      var packageReasonKey =
        state.package === "QFN68" ? "packageQfn68" : state.package === "QFN80" ? "packageQfn80" : "packageBga";
      reasons.push(t.reasons[packageReasonKey]);
    }

    if (state.power === "li_ion" && !record.power_li_ion) reasons.push(t.reasons.powerLiIon);
    if (state.power === "3v3" && !record.power_3v3) reasons.push(t.reasons.power3v3);
    if (state.power === "1v8" && !record.power_1v8) reasons.push(t.reasons.power1v8);

    var displayInterfaces = record.display_interfaces || [];
    if (state.display !== "any" && displayInterfaces.indexOf(state.display) === -1) {
      reasons.push(t.reasons.display + " (" + state.display + ")");
    }

    if (state.resolution !== "any") {
      var wantPx = parseInt(state.resolution, 10);
      if (record.max_resolution_px === null || record.max_resolution_px === undefined || record.max_resolution_px < wantPx) {
        reasons.push(t.reasons.resolution);
      }
    }

    // SDIO and each audio dimension (DAC/ADC/PDM/I2S) are independent
    // minimum-threshold filters, same pattern as PSRAM/GPIO -- each one is
    // its own dropdown rather than one combined "audio profile" preset, so
    // they're evaluated separately instead of as a single bundled check.
    if (state.sdio !== "any" && (record.sdio === null || record.sdio === undefined || record.sdio < parseInt(state.sdio, 10))) {
      reasons.push(t.reasons.sdio);
    }
    if (state.audio_dac !== "any" && record.audio_dac < parseInt(state.audio_dac, 10)) reasons.push(t.reasons.audioDac);
    if (state.audio_adc !== "any" && record.audio_adc < parseInt(state.audio_adc, 10)) reasons.push(t.reasons.audioAdc);
    if (state.audio_pdm !== "any" && record.audio_pdm < parseInt(state.audio_pdm, 10)) reasons.push(t.reasons.audioPdm);
    if (state.audio_i2s !== "any" && record.audio_i2s < parseInt(state.audio_i2s, 10)) reasons.push(t.reasons.audioI2s);

    return { matches: reasons.length === 0, reasons: reasons };
  }

  function boolCell(value) {
    return el("td", { class: value ? "uf-ps-yes" : "uf-ps-no", text: value ? t.yes : t.no });
  }

  // Digital-peripheral counts (uart/i2c/spi/can/gpadc_channels) are integers
  // when documented, or null when no page states an exact count for that
  // family (e.g. SF32LB58x's UART/I2C/SPI, or SF32LB52x/SF32LB58x's GPADC
  // channel count) -- null renders as "n/a" rather than a fabricated 0,
  // same convention as the existing psram/package "n/a" fallbacks.
  function numCell(value) {
    var isNa = value === null || value === undefined;
    return el("td", { class: isNa ? "uf-ps-num uf-ps-no" : "uf-ps-num", text: isNa ? "n/a" : String(value) });
  }

  // Slugifies a family name (e.g. "SF32LB52x") into a CSS-safe class
  // suffix ("sf32lb52x") for per-family part-name text coloring.
  function familySlug(family) {
    return String(family || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  // The frozen table and the body table are two independent <table>
  // elements, each computing its own row heights from its own content --
  // even with identical font-size/padding/line-height CSS, browsers don't
  // guarantee the two tables' Nth rows render at the exact same pixel
  // height (sub-pixel rounding can differ table to table), and any
  // per-row drift accumulates visually the further down the table you go,
  // which is exactly the "rows are so much misaligned" symptom. Rather
  // than trust the two tables to naturally stay in lockstep, this walks
  // matching row pairs after every render and pins both to the taller of
  // the two measured heights, so misalignment is corrected by
  // construction instead of hoped for from matching CSS. rowsA/rowsB must
  // already be in the live document (getBoundingClientRect on a detached
  // element returns all zeros) and contain the same number of rows in the
  // same order.
  function syncRowHeights(rowsA, rowsB) {
    var count = Math.min(rowsA.length, rowsB.length);
    var i;
    // Reset first so a previous sync's inline height doesn't influence
    // this measurement pass (e.g. shrinking column widths on re-render
    // could otherwise make old heights "stick" too tall).
    for (i = 0; i < count; i++) {
      rowsA[i].style.height = "";
      rowsB[i].style.height = "";
    }
    var targets = new Array(count);
    for (i = 0; i < count; i++) {
      targets[i] = Math.max(rowsA[i].getBoundingClientRect().height, rowsB[i].getBoundingClientRect().height);
    }
    for (i = 0; i < count; i++) {
      var px = targets[i] + "px";
      rowsA[i].style.height = px;
      rowsB[i].style.height = px;
    }
  }

  // The table is rendered as two side-by-side <table> elements sharing one
  // row order -- a small, non-scrolling "frozen" table holding just the
  // Part column, and a second table holding every other column inside its
  // own overflow-x: auto wrapper (see the uf-ps-table-dual/-frozen/-scroll
  // CSS). This replaces an earlier single-table position: sticky first
  // column, which went through several rounds of bleed-through/misalignment
  // bugs (opacity cascading into the sticky cell's background, sticky cells
  // sizing themselves independently per row instead of sharing one column
  // width) that never fully resolved across browsers. Two tables can't
  // exhibit either bug class: the frozen table simply never scrolls, so
  // there's nothing to bleed through, and each table computes its own
  // column widths independently of the other. The one thing this approach
  // requires is that both tables render rows of identical height -- every
  // row is single-line content in both tables, but that alone isn't quite
  // enough to guarantee pixel-identical heights (see syncRowHeights
  // above), so this also explicitly syncs every row pair after rendering.
  function renderTable(data, state, frozenTbody, bodyTbody) {
    frozenTbody.innerHTML = "";
    bodyTbody.innerHTML = "";
    var anyVisible = false;
    // Parts that fail the active filters are omitted from the table
    // entirely (previously they were kept as dimmed rows with a
    // "Doesn't match: ..." explanation). visibleIndex counts only the
    // rendered rows so the every-other-row stripe alternates over what's
    // actually on screen -- reusing the data-array index would leave
    // same-shade rows touching wherever a filtered-out part sat between
    // them.
    var visibleIndex = 0;
    data.parts.forEach(function (record) {
      var result = evaluate(record, state);
      if (!result.matches) return;
      anyVisible = true;
      // Family is distinguished by the part-name text color (see
      // uf-ps-family-* classes below), not by which rows share a
      // background shade. The stripe class is applied to both tables'
      // rows identically so the shading lines up across the
      // frozen/scroll split.
      var rowClass = "uf-ps-row-match" + (visibleIndex % 2 === 1 ? " uf-ps-row-stripe" : "");
      visibleIndex++;
      var frozenRow = el("tr", { class: rowClass });
      var row = el("tr", { class: rowClass });

      // Part-name text color is keyed to family (uf-ps-family-<slug>, see
      // CSS) so the different SF32LB5xx families are visually
      // distinguishable at a glance even though row background striping
      // no longer groups by family.
      var nameCell = el("td", { class: "uf-ps-family-" + familySlug(record.family) });
      var productPath = record.links && record.links.product;
      if (productPath) {
        nameCell.appendChild(
          el("a", { href: mdPathToUrl(productPath), class: "uf-ps-name-link" }, [
            document.createTextNode(record.name),
          ])
        );
      } else {
        nameCell.appendChild(document.createTextNode(record.name));
      }
      frozenRow.appendChild(nameCell);
      frozenTbody.appendChild(frozenRow);

      // Table cells favor short, single-line labels over the fuller
      // free-text fields (record.package / record.power_supply) -- long
      // strings caused rows to wrap across several lines and made the
      // table feel cluttered. The full detail is still one hover away
      // via `title`.
      //
      // Column order: PSRAM, NOR Flash, Max GPIO, Package, Power supply,
      // I/O voltage, Display interfaces, Max resolution, Audio, UART, I2C,
      // SPI, CAN, GPADC Ch, USB, external Wi-Fi, AI accelerator, Camera,
      // FreeIO, PTM. The part name itself links to the product introduction
      // page (there is no separate Resources column), and any no-match
      // reason is available as a hover tooltip on the name cell.

      // Dual-channel PSRAM parts (e.g. 2x 16MB) show their per-channel
      // split via psram_label instead of just the summed total, since
      // "32 MB" alone hides that it's two independent 16MB pools rather
      // than one contiguous 32MB pool. Parts with no PSRAM at all
      // (psram_max_mb: null, e.g. SF32LB52BU) show "n/a" instead of the
      // literal string "null MB".
      var psramText =
        record.psram_label || (record.psram_max_mb === null || record.psram_max_mb === undefined
          ? "n/a"
          : record.psram_max_mb + " MB");
      row.appendChild(el("td", { text: psramText }));

      // Flash follows the same dual-channel-label and "n/a" fallback
      // conventions as PSRAM above: flash_label overrides the summed total
      // for parts with two separate Flash dies (e.g. 2x 16MB), and null
      // flash_max_mb renders as "n/a" rather than "null MB".
      var flashText =
        record.flash_label || (record.flash_max_mb === null || record.flash_max_mb === undefined
          ? "n/a"
          : record.flash_max_mb + " MB");
      row.appendChild(el("td", { text: flashText }));

      row.appendChild(el("td", { text: String(record.gpio_max) }));

      // The table cell shows the exact orderable package designator (e.g.
      // "BGA145", "WBBGA175") taken from record.package, not the generic
      // QFN68/QFN80/BGA category used by the Package type filter -- those
      // stay separate on purpose, since the filter is deliberately coarser
      // than the real per-part package variety. Full detail (with die
      // dimensions) is still one hover away via `title`.
      var packageShort = record.package ? record.package.split(" (")[0] : (record.package_types || []).join(" / ");
      row.appendChild(el("td", { text: packageShort, title: record.package }));

      var powerShort = [];
      if (record.power_li_ion) powerShort.push("Li-ion");
      if (record.power_3v3) powerShort.push("3.3V");
      if (record.power_1v8) powerShort.push("1.8V");
      row.appendChild(el("td", { text: powerShort.join(" / "), title: record.power_supply }));

      // I/O voltage (the GPIO/VDDIO supply rail) is a separate field from
      // power_supply above -- power_supply is the main VBAT/PVDD system
      // input, while io_voltage is what actually drives the GPIO pins.
      // null means no VDDIO-style rail is documented for that specific
      // variant (typically a battery-powered part with no separate IO
      // rail spec), rendered as "n/a" rather than a fabricated value.
      row.appendChild(el("td", { text: record.io_voltage || "n/a" }));

      row.appendChild(el("td", { text: (record.display_interfaces || []).join(" / ") }));
      row.appendChild(el("td", { text: record.max_resolution_label || t.no }));

      // Audio I/O used to be one combined "DAC/ADC/PDM/I2S" column, matching
      // the old single filter preset. Now that the filter is 4 independent
      // per-dimension dropdowns (see buildControls), the table column is
      // split the same way -- one numCell per dimension -- so each value is
      // directly comparable to its own filter instead of needing to be
      // parsed out of a combined string.
      row.appendChild(numCell(record.audio_dac));
      row.appendChild(numCell(record.audio_adc));
      row.appendChild(numCell(record.audio_pdm));
      row.appendChild(numCell(record.audio_i2s));

      row.appendChild(numCell(record.uart));
      row.appendChild(numCell(record.i2c));
      row.appendChild(numCell(record.spi));
      row.appendChild(numCell(record.can));
      row.appendChild(numCell(record.gpadc_channels));
      // usb is a speed-qualified label ("FS", "HS", or "FS+HS" for a part
      // with both a Full-Speed and a High-Speed port), not a plain count,
      // so it renders as text rather than through numCell's number-or-n/a
      // logic.
      row.appendChild(el("td", { class: "uf-ps-num", text: record.usb || "n/a" }));

      row.appendChild(boolCell(record.wifi));
      row.appendChild(boolCell(record.ai_accelerator));
      row.appendChild(boolCell(record.camera));
      row.appendChild(boolCell(record.free_io));
      row.appendChild(boolCell(record.ptm));

      bodyTbody.appendChild(row);
    });

    syncRowHeights(frozenTbody.children, bodyTbody.children);

    var noResultsRow = document.getElementById("uf-ps-no-results");
    if (noResultsRow) {
      noResultsRow.style.display = anyVisible ? "none" : "";
    }
  }

  function buildControls(container, data, frozenTbody, bodyTbody) {
    var state = {
      tier: "any",
      wifi: false,
      camera: false,
      ai: false,
      free_io: false,
      ptm: false,
      psram: "any",
      gpio: "any",
      package: "any",
      power: "any",
      display: "any",
      resolution: "any",
      sdio: "any",
      audio_dac: "any",
      audio_adc: "any",
      audio_pdm: "any",
      audio_i2s: "any",
    };
    var selectInputs = [];
    var checkboxInputs = [];
    var controlId = 0;

    function update() {
      renderTable(data, state, frozenTbody, bodyTbody);
    }

    function selectRow(labelText, options, onChange) {
      var group = el("div", { class: "uf-ps-filter" });
      var id = "uf-ps-select-" + controlId++;
      group.appendChild(el("label", { for: id, text: labelText }));
      var select = el("select", { id: id });
      options.forEach(function (opt) {
        var option = el("option", { value: opt.value, text: opt.label });
        select.appendChild(option);
      });
      select.addEventListener("change", function (e) {
        onChange(e.target.value);
        update();
      });
      group.appendChild(select);
      selectInputs.push(select);
      return group;
    }

    function checkboxRow(labelText, onChange) {
      var group = el("div", { class: "uf-ps-filter uf-ps-filter-checkbox" });
      var id = "uf-ps-checkbox-" + controlId++;
      var label = el("label", { for: id });
      var checkbox = el("input", { id: id, type: "checkbox" });
      checkbox.addEventListener("change", function (e) {
        onChange(e.target.checked);
        update();
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + labelText));
      group.appendChild(label);
      checkboxInputs.push(checkbox);
      return group;
    }

    // All the boolean "requires X" checkboxes go in one row, and all the
    // select-style filters (12 of them) go together in a 3-row x 4-column
    // matrix -- keeps the two control types visually distinct instead of
    // interleaved, and gives the selects a tidy grid instead of whatever
    // happened to fit per line.
    var checkboxGroup = el("div", { class: "uf-ps-controls-checkboxes" });
    var selectGroup = el("div", { class: "uf-ps-controls-selects" });

    selectGroup.appendChild(
      selectRow(
        t.filters.tier,
        [
          { value: "any", label: t.filters.tierAny },
          { value: "chip", label: t.filters.tierChip },
          { value: "module", label: t.filters.tierModule },
        ],
        function (v) {
          state.tier = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.psram,
        [
          { value: "any", label: t.filters.psramAny },
          { value: "4", label: "≥ 4 MB" },
          { value: "8", label: "≥ 8 MB" },
          { value: "16", label: "≥ 16 MB" },
          { value: "32", label: "≥ 32 MB" },
          { value: "64", label: "≥ 64 MB" },
        ],
        function (v) {
          state.psram = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.gpio,
        [
          { value: "any", label: t.filters.gpioAny },
          { value: "40", label: "≥ 40" },
          { value: "60", label: "≥ 60" },
          { value: "100", label: "≥ 100" },
          { value: "150", label: "≥ 150" },
        ],
        function (v) {
          state.gpio = v;
        }
      )
    );

    checkboxGroup.appendChild(
      checkboxRow(t.filters.wifi, function (v) {
        state.wifi = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.camera, function (v) {
        state.camera = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.ai, function (v) {
        state.ai = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.freeIo, function (v) {
        state.free_io = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.ptm, function (v) {
        state.ptm = v;
      })
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.package,
        [
          { value: "any", label: t.filters.packageAny },
          { value: "QFN68", label: t.filters.packageQfn68 },
          { value: "QFN80", label: t.filters.packageQfn80 },
          { value: "BGA", label: t.filters.packageBga },
        ],
        function (v) {
          state.package = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.power,
        [
          { value: "any", label: t.filters.powerAny },
          { value: "li_ion", label: t.filters.powerLiIon },
          { value: "3v3", label: t.filters.power3v3 },
          { value: "1v8", label: t.filters.power1v8 },
        ],
        function (v) {
          state.power = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.display,
        [
          { value: "any", label: t.filters.displayAny },
          { value: "QSPI", label: t.filters.displayQspi },
          { value: "RGB", label: t.filters.displayRgb },
          { value: "MIPI", label: t.filters.displayMipi },
          { value: "EPD", label: t.filters.displayEpd },
          { value: "JDI", label: t.filters.displayJdi },
        ],
        function (v) {
          state.display = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.resolution,
        [
          { value: "any", label: t.filters.resolutionAny },
          { value: "262144", label: "≥ 512 x 512" },
          { value: "384000", label: "≥ 800 x 480" },
          { value: "614400", label: "≥ 1024 x 600" },
          { value: "921600", label: "≥ 1280 x 720" },
        ],
        function (v) {
          state.resolution = v;
        }
      )
    );

    // # of SDIO takes the grid slot the combined "Min. audio I/O" preset
    // used to occupy; the audio profile is no longer one bundled
    // dropdown -- it's split into four independent per-dimension
    // dropdowns (DAC/ADC/PDM/I2S) appended right after, which the grid's
    // auto-flow lands on the next row since this is a 4-column layout.
    selectGroup.appendChild(
      selectRow(
        t.filters.sdio,
        [
          { value: "any", label: t.filters.sdioAny },
          { value: "1", label: "≥ 1" },
          { value: "2", label: "≥ 2" },
        ],
        function (v) {
          state.sdio = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.audioDac,
        [
          { value: "any", label: t.filters.audioDacAny },
          { value: "1", label: "≥ 1" },
          { value: "2", label: "≥ 2" },
        ],
        function (v) {
          state.audio_dac = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.audioAdc,
        [
          { value: "any", label: t.filters.audioAdcAny },
          { value: "1", label: "≥ 1" },
          { value: "2", label: "≥ 2" },
        ],
        function (v) {
          state.audio_adc = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.audioPdm,
        [
          { value: "any", label: t.filters.audioPdmAny },
          { value: "1", label: "≥ 1" },
          { value: "2", label: "≥ 2" },
        ],
        function (v) {
          state.audio_pdm = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.audioI2s,
        [
          { value: "any", label: t.filters.audioI2sAny },
          { value: "1", label: "≥ 1" },
          { value: "2", label: "≥ 2" },
          { value: "3", label: "≥ 3" },
        ],
        function (v) {
          state.audio_i2s = v;
        }
      )
    );

    container.appendChild(selectGroup);
    container.appendChild(checkboxGroup);

    var actions = el("div", { class: "uf-ps-actions" });
    var resetButton = el("button", { class: "uf-ps-reset", type: "button", text: t.clearFilters });
    resetButton.addEventListener("click", function () {
      state.tier = "any";
      state.wifi = false;
      state.camera = false;
      state.ai = false;
      state.free_io = false;
      state.ptm = false;
      state.psram = "any";
      state.gpio = "any";
      state.package = "any";
      state.power = "any";
      state.display = "any";
      state.resolution = "any";
      state.sdio = "any";
      state.audio_dac = "any";
      state.audio_adc = "any";
      state.audio_pdm = "any";
      state.audio_i2s = "any";
      selectInputs.forEach(function (select) {
        select.selectedIndex = 0;
      });
      checkboxInputs.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      update();
    });
    actions.appendChild(resetButton);
    container.appendChild(actions);

    update();
  }

  function init() {
    var root = document.getElementById("uf-product-selector");
    if (!root) return;

    root.textContent = "";
    root.appendChild(el("p", { class: "uf-ps-status", text: t.loading }));

    var dataUrl = (LANG === "en" ? "" : "/" + LANG) + "/assets/data/product-selector.json";

    fetch(dataUrl)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.json();
      })
      .then(function (data) {
        root.textContent = "";

        // last_verified/source_note are retained in the JSON as an internal
        // audit trail (dataset provenance, correction history) but are not
        // rendered on the page -- the full source_note has grown into a
        // long paragraph of engineering-detail prose that isn't meant for
        // site visitors.
        var controls = el("div", { class: "uf-ps-controls" });
        root.appendChild(controls);

        // Two tables side by side instead of one table with a sticky first
        // column -- see the comment above renderTable() for why. The
        // frozen table (Part column only) never scrolls; the body table
        // (every other column) scrolls horizontally inside its own wrapper.
        var dualWrap = el("div", { class: "uf-ps-table-dual" });

        var frozenTable = el("table", { class: "uf-ps-table uf-ps-table-frozen" });
        var frozenThead = el("thead", {});
        var frozenHeadRow = el("tr", {});
        frozenHeadRow.appendChild(el("th", { text: t.table.name }));
        frozenThead.appendChild(frozenHeadRow);
        frozenTable.appendChild(frozenThead);
        var frozenTbody = el("tbody", {});
        frozenTable.appendChild(frozenTbody);
        dualWrap.appendChild(frozenTable);

        var scrollWrap = el("div", { class: "uf-ps-table-scroll" });
        var table = el("table", { class: "uf-ps-table uf-ps-table-body" });
        var thead = el("thead", {});
        var headRow = el("tr", {});
        [
          t.table.psram,
          t.table.flash,
          t.table.gpio,
          t.table.package,
          t.table.power,
          t.table.ioVoltage,
          t.table.display,
          t.table.resolution,
          t.table.audioDac,
          t.table.audioAdc,
          t.table.audioPdm,
          t.table.audioI2s,
          t.table.uart,
          t.table.i2c,
          t.table.spi,
          t.table.can,
          t.table.gpadcCh,
          t.table.usb,
          t.table.wifi,
          t.table.ai,
          t.table.camera,
          t.table.freeIo,
          t.table.ptm,
        ].forEach(function (label) {
          headRow.appendChild(el("th", { text: label }));
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        var tbody = el("tbody", {});
        table.appendChild(tbody);
        scrollWrap.appendChild(table);
        dualWrap.appendChild(scrollWrap);
        root.appendChild(dualWrap);

        // Sync the two header rows too, same reasoning as syncRowHeights
        // on the body rows -- "Part number" alone and the full run of data
        // column headers are unlikely to differ, but there's no reason to
        // leave it to chance now that both tables are in the live DOM.
        syncRowHeights([frozenHeadRow], [headRow]);

        var noResults = el("p", { id: "uf-ps-no-results", class: "uf-ps-no-results", text: t.noResults });
        noResults.style.display = "none";
        root.appendChild(noResults);

        buildControls(controls, data, frozenTbody, tbody);
      })
      .catch(function () {
        root.textContent = "";
        root.appendChild(el("p", { class: "uf-ps-status uf-ps-error", text: t.loadError }));
      });
  }

  // Zensical/Material's "navigation.instant" feature (see zensical.toml)
  // swaps page content via XHR instead of a real browser navigation, so
  // DOMContentLoaded only fires once, on whichever page happened to be the
  // first real load of the session. Landing on this page via an internal
  // link -- the common case -- never fires it again, leaving the mount
  // point empty until the visitor forces a hard refresh (the exact
  // "sometimes needs an extra refresh" symptom this fixes). document$ is
  // the instant-navigation-aware observable Material/Zensical exposes
  // globally; it emits on the initial load AND every subsequent virtual
  // page load, so subscribing to it alone covers both cases. Fall back to
  // the old DOMContentLoaded-based init only if document$ isn't present,
  // e.g. instant navigation is ever disabled.
  if (typeof document$ !== "undefined" && document$ && typeof document$.subscribe === "function") {
    document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
