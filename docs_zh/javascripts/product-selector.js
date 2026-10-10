/* Interactive SF32 product-selection table (docs/sf32-products/product-selector.md
   and its Chinese twin). Loads docs/assets/data/product-selector.json (shared
   between both languages via tools/link-shared-assets.sh) and renders a
   filterable table client-side -- there's no backend, so filtering,
   rendering, and link construction all happen here.

   This file is identical in docs/javascripts/ and docs_zh/javascripts/ on
   purpose (same convention as offline.js): it detects the page language from
   document.documentElement.lang at runtime instead of shipping two
   near-duplicate scripts. */
(function () {
  "use strict";

  var LANG = document.documentElement.lang === "zh" ? "zh" : "en";

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
        audioPdm: "Min. audio PDM",
        audioPdmAny: "Any",
        audioI2s: "Min. audio I2S",
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
        audioPdm: "PDM 接口数",
        audioI2s: "I2S 接口数",
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
        audioPdm: "not enough audio PDM",
        audioI2s: "not enough audio I2S",
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
        wifi: "外接 Wi-Fi（SDIO）",
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
        packageQfn68: "QFN68（7 × 7 mm，44–48 GPIO）",
        packageQfn80: "QFN80（8 × 8 mm，最多 58 GPIO）",
        packageBga: "BGA（更小尺寸，更多 GPIO）",
        power: "供电电压",
        powerAny: "任意",
        powerLiIon: "锂离子电池直供（3.2–4.7 V）",
        power3v3: "3.3 V 供电",
        power1v8: "支持最低 1.8 V 供电",
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
        audioPdm: "最少 PDM 接口数",
        audioPdmAny: "任意",
        audioI2s: "最少 I2S 接口数",
        audioI2sAny: "任意",
      },
      table: {
        name: "器件型号",
        wifi: "外接 Wi-Fi（SDIO）",
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
        audioPdm: "PDM",
        audioI2s: "I2S",
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
        power3v3: "未记录 3.3 V 供电",
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
    if (LANG === "zh") {
      url = "/zh" + url;
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

    var dataUrl = (LANG === "zh" ? "/zh" : "") + "/assets/data/product-selector.json";

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
