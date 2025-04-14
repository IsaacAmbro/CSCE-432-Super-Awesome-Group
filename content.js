
chrome.storage.sync.get("filterType", ({ filterType }) => {
    const filterMap = {
      protanopia: "url('filters/protanopia.svg#protanopia')",
      deuteranopia: "url('filters/deuteranopia.svg#deuteranopia')",
      tritanopia: "url('filters/tritanopia.svg#tritanopia')",
    };
  
    if (filterType && filterType !== "none") {
      const style = document.createElement("style");
      style.innerHTML = `
        html {
          filter: ${filterMap[filterType] || "none"};
        }
      `;
      document.head.appendChild(style);
    }
  });