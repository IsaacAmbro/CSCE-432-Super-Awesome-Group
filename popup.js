document.addEventListener("DOMContentLoaded", () => {
  // --- Element refs ---
  const filterTypeSelect = document.getElementById("filterType");
  const preview          = document.getElementById("preview");

  const advContrast      = document.getElementById("advContrast");
  const advBrightness    = document.getElementById("advBrightness");
  const advSaturate      = document.getElementById("advSaturate");
  const advContrastValue = document.getElementById("advContrastValue");
  const advBrightnessValue = document.getElementById("advBrightnessValue");
  const advSaturateValue = document.getElementById("advSaturateValue");

  const basicTab    = document.getElementById("tab-basic");
  const advancedTab = document.getElementById("tab-advanced");
  const basicPanel    = document.getElementById("basicSettings");
  const advancedPanel = document.getElementById("advancedSettings");

  // --- Tab switching ---
  basicTab.addEventListener("click", () => {
    basicTab.classList.add("active");
    advancedTab.classList.remove("active");
    basicPanel.style.display = "block";
    advancedPanel.style.display = "none";
  });
  advancedTab.addEventListener("click", () => {
    advancedTab.classList.add("active");
    basicTab.classList.remove("active");
    basicPanel.style.display = "none";
    advancedPanel.style.display = "block";
  });

  // --- Build preview filter string ---
  function updatePreview() {
    const type = filterTypeSelect.value;
    const cOff = parseFloat(advContrast.value);
    const bOff = parseFloat(advBrightness.value);
    const sOff = parseFloat(advSaturate.value);

    // update label displays
    advContrastValue.textContent   = cOff.toFixed(1);
    advBrightnessValue.textContent = bOff.toFixed(1);
    advSaturateValue.textContent   = sOff.toFixed(1);

    let base = "none";
    switch (type) {
      case "protanopia":
        base = "grayscale(0.3) contrast(1.1) brightness(1.1)";
        break;
      case "deuteranopia":
        base = "sepia(0.4) saturate(1.3) contrast(1.1)";
        break;
      case "tritanopia":
        base = "hue-rotate(90deg) contrast(1.1)";
        break;
    }

    // if we have a matrix filter, append our offsets
    if (base !== "none") {
      base += ` contrast(${1 + cOff}) brightness(${1 + bOff}) saturate(${1 + sOff})`;
    }

    preview.style.filter = base;
  }

  // --- Load any saved settings ---
  chrome.storage.sync.get(["filterType", "advanced"], ({ filterType, advanced }) => {
    if (filterType) filterTypeSelect.value = filterType;
    if (advanced) {
      advContrast.value   = advanced.contrast   || 0;
      advBrightness.value = advanced.brightness || 0;
      advSaturate.value   = advanced.saturate   || 0;
    }
    updatePreview();
  });

  // --- Wire up inputs ---
  filterTypeSelect.addEventListener("change", updatePreview);
  advContrast.addEventListener("input", updatePreview);
  advBrightness.addEventListener("input", updatePreview);
  advSaturate.addEventListener("input", updatePreview);

  // --- Apply to chrome.storage & reload page ---
  document.getElementById("apply").addEventListener("click", () => {
    const chosen = filterTypeSelect.value;
    const advSave = {
      contrast:   parseFloat(advContrast.value),
      brightness: parseFloat(advBrightness.value),
      saturate:   parseFloat(advSaturate.value),
    };
    chrome.storage.sync.set(
      { filterType: chosen, advanced: advSave },
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          const tab = tabs[0];
          if (/^https?:\/\//.test(tab.url)) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: () => window.location.reload()
            });
          } else alert("This extension only works on regular web pages.");
        });
      }
    );
  });

});
