/* =======================
   content.js - Injects CSS to apply SVG filter based on user selection
   ======================= */
   // content.js
chrome.storage.sync.get(
  ["filterType","advancedSettings"],
  ({ filterType, advancedSettings }) => {
    if (!filterType || filterType === "none") return;

    // Build the same filter string as popup
    const buildFilter = (type, adv) => {
      const presets = {
        protanopia:  { grayscale: adv.grayscale||0.3, saturate: adv.saturate||1, contrast:adv.contrast||1, brightness:adv.brightness||1, hue: adv.hue||0 },
        deuteranopia:{ grayscale: adv.grayscale||0, saturate: adv.saturate||1.3, contrast:adv.contrast||1, brightness:adv.brightness||1, hue: adv.hue||0 },
        tritanopia:  { grayscale: adv.grayscale||0, saturate: adv.saturate||1, contrast:adv.contrast||1, brightness:adv.brightness||1, hue: adv.hue||90 }
      };
      const s = presets[type] || {};
      return [
        `grayscale(${s.grayscale})`,
        `saturate(${s.saturate})`,
        `contrast(${s.contrast})`,
        `brightness(${s.brightness})`,
        `hue-rotate(${s.hue}deg)`
      ].join(" ");
    };

    const cssFilter = buildFilter(filterType, advancedSettings||{});
    const style = document.createElement("style");
    style.textContent = `html { filter: ${cssFilter} !important; }`;
    document.head.appendChild(style);
  }
);
