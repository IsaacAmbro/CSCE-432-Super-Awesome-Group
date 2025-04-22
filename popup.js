/* =======================
   popup.js - Handles saving filter type and reloading tab
   ======================= */

   const svgFilters = {
    protanopia: `
      <filter id="popupFilter">
        <feColorMatrix type="matrix" values="
          1.2,  0.0,  0.0, 0, 0,
          0.0,  1.0,  0.0, 0, 0,
          0.2,  0.2,  1.3, 0, 0,
          0,    0,    0,   1, 0" />
      </filter>
    `,
    deuteranopia: `
      <filter id="popupFilter">
        <feColorMatrix type="matrix" values="
          1.3,  0.0,  0.0, 0, 0,
          0.0,  1.0,  0.0, 0, 0,
          0.0,  0.2,  1.2, 0, 0,
          0,    0,    0,   1, 0" />
      </filter>
    `,
    tritanopia: `
      <filter id="popupFilter">
        <feColorMatrix type="matrix" values="
          1.0,  0.0,  0.1, 0, 0,
          0.0,  1.1,  0.0, 0, 0,
          0.2,  0.3,  1.2, 0, 0,
          0,    0,    0,   1, 0" />
      </filter>
    `
  };
  

   document.addEventListener("DOMContentLoaded", () => {
    const filterTypeSelect = document.getElementById("filterType");
  
    const preview = document.getElementById("preview");
    const svgWrapper = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgWrapper.setAttribute("style", "position: absolute; width: 0; height: 0;");
    document.body.appendChild(svgWrapper);

    function applyPopupSVGFilter(type) {
      svgWrapper.innerHTML = `<defs>${svgFilters[type] || ""}</defs>`;
      preview.style.filter = type !== "none" ? "url(#popupFilter)" : "none";
    }

    filterTypeSelect.addEventListener("change", () => {
      const selectedType = filterTypeSelect.value;
      applyPopupSVGFilter(selectedType);
    });

  
    // Apply the filter to the webpage
    document.getElementById("apply").addEventListener("click", () => {
      const filterType = filterTypeSelect.value;
  
      chrome.storage.sync.set({ filterType });
  
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
  
        if (url.startsWith("http://") || url.startsWith("https://")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.location.reload()
          });
        } else {
          alert("This extension only works on regular web pages.");
        }
      });
    });
  });
  