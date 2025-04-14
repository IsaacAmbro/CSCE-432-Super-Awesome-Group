/* =======================
   popup.js - Handles saving filter type and reloading tab
   ======================= */
   document.getElementById("apply").addEventListener("click", () => {
    const filterType = document.getElementById("filterType").value;
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
  