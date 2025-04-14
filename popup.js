document.getElementById("apply").addEventListener("click", () => {
    const filterType = document.getElementById("filterType").value;
    chrome.storage.sync.set({ filterType });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => window.location.reload()
      });
    });
  });