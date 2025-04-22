/* =======================
   popup.js - Handles saving filter type and reloading tab
   ======================= */

document.addEventListener("DOMContentLoaded", () => {
  // Tab elements
  const tabBasic = document.getElementById("tab-basic");
  const tabAdv   = document.getElementById("tab-advanced");
  const panelBasic = document.getElementById("panel-basic");
  const panelAdv   = document.getElementById("panel-advanced");

  tabBasic.onclick = () => {
    tabBasic.classList.add("active");
    tabAdv.classList.remove("active");
    panelBasic.classList.add("active");
    panelAdv.classList.remove("active");
  };
  tabAdv.onclick = () => {
    tabAdv.classList.add("active");
    tabBasic.classList.remove("active");
    panelAdv.classList.add("active");
    panelBasic.classList.remove("active");
  };

  const preview = document.getElementById("preview");
  const filterTypeSelect = document.getElementById("filterType");

  // Slider inputs & their display spans
  const sliders = {
    grayscale:    document.getElementById("grayscale"),
    saturate:     document.getElementById("saturate"),
    contrast:     document.getElementById("contrast"),
    brightness:   document.getElementById("brightness"),
    hue:          document.getElementById("hue"),
  };
  const valDisplays = {
    grayscale:  document.getElementById("val-grayscale"),
    saturate:   document.getElementById("val-saturate"),
    contrast:   document.getElementById("val-contrast"),
    brightness: document.getElementById("val-brightness"),
    hue:        document.getElementById("val-hue"),
  };

  // Build CSS filter string
  function buildFilter(type, adv) {
    // base presets
    const presets = {
      none:         { grayscale:0,   saturate:1,   contrast:1,   brightness:1,   hue:0 },
      protanopia:   { grayscale:adv.grayscale||0.3, saturate:adv.saturate||1, contrast:adv.contrast||1, brightness:adv.brightness||1, hue:adv.hue||0 },
      deuteranopia: { grayscale:adv.grayscale||0,   saturate:adv.saturate||1.3, contrast:adv.contrast||1, brightness:adv.brightness||1, hue:adv.hue||0 },
      tritanopia:   { grayscale:adv.grayscale||0,   saturate:adv.saturate||1, contrast:adv.contrast||1,   brightness:adv.brightness||1, hue:adv.hue||90 }
    };
    const s = presets[type] || presets.none;
    return [
      `grayscale(${s.grayscale})`,
      `saturate(${s.saturate})`,
      `contrast(${s.contrast})`,
      `brightness(${s.brightness})`,
      `hue-rotate(${s.hue}deg)`
    ].join(" ");
  }

  // Apply preview filter
  function updatePreview(type, adv) {
    preview.style.filter = buildFilter(type, adv);
  }

  // Load stored settings
  chrome.storage.sync.get(
    ["filterType","advancedSettings"],
    ({ filterType="none", advancedSettings={} }) => {
      // initialize dropdown
      filterTypeSelect.value = filterType;
      // initialize slider labels & positions
      Object.keys(sliders).forEach(key => {
        const val = advancedSettings[key] ?? sliders[key].value;
        sliders[key].value = val;
        valDisplays[key].textContent = val;
      });
      updatePreview(filterType, advancedSettings);
    }
  );

  // Dropdown change updates preview
  filterTypeSelect.addEventListener("change", () => {
    chrome.storage.sync.get("advancedSettings", ({ advancedSettings={} }) => {
      updatePreview(filterTypeSelect.value, advancedSettings);
    });
  });

  // Slider input events: update label & preview
  Object.entries(sliders).forEach(([key, slider]) => {
    slider.addEventListener("input", (e) => {
      const v = e.target.value;
      valDisplays[key].textContent = v;
      chrome.storage.sync.get("filterType", ({ filterType="none" }) => {
        updatePreview(filterType, Object.fromEntries(
          Object.entries(sliders).map(([k, s]) => [k, parseFloat(s.value)])
        ));
      });
    });
  });

  // Apply button: save settings and reload page
  document.getElementById("apply").addEventListener("click", () => {
    const adv = Object.fromEntries(
      Object.entries(sliders).map(([k, s]) => [k, parseFloat(s.value)])
    );
    chrome.storage.sync.set({
      filterType: filterTypeSelect.value,
      advancedSettings: adv
    }, () => {
      chrome.tabs.query({ active:true, currentWindow:true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => window.location.reload()
        });
      });
    });
  });
});

