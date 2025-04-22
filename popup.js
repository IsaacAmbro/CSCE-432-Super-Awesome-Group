/* =======================
   popup.js - Handles saving filter type and reloading tab
   ======================= */
   document.addEventListener("DOMContentLoaded", () => {
    const filterTypeSelect = document.getElementById("filterType");
    const preview = document.getElementById("preview");
  
    const updatePreviewFilter = (type) => {
      switch (type) {
        case "protanopia":
          preview.style.filter = "grayscale(0.3) contrast(1.1) brightness(1.1)";
          break;
        case "deuteranopia":
          preview.style.filter = "sepia(0.4) saturate(1.3) contrast(1.1)";
          break;
        case "tritanopia":
          preview.style.filter = "hue-rotate(90deg) contrast(1.1)";
          break;
        default:
          preview.style.filter = "none";
          break;
      }
    };
  
    // Load stored filter preference on popup open
    chrome.storage.sync.get("filterType", ({ filterType }) => {
      if (filterType) {
        filterTypeSelect.value = filterType;
        updatePreviewFilter(filterType);
      }
    });
  
    // Change preview when dropdown changes
    filterTypeSelect.addEventListener("change", () => {
      const selected = filterTypeSelect.value;
      updatePreviewFilter(selected);
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
  