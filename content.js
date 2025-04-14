/* =======================
   content.js - Injects CSS to apply SVG filter based on user selection
   ======================= */
   chrome.storage.sync.get("filterType", ({ filterType }) => {
    const svgFilters = {
      protanopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            0.567, 0.433, 0, 0, 0,
            0.558, 0.442, 0, 0, 0,
            0,     0.242, 0.758, 0, 0,
            0,     0,     0,     1, 0" />
        </filter>
      `,
      deuteranopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            0.625, 0.375, 0, 0, 0,
            0.7,   0.3,   0, 0, 0,
            0,     0.3,   0.7, 0, 0,
            0,     0,     0,   1, 0" />
        </filter>
      `,
      tritanopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            0.95,  0.05,  0,    0, 0,
            0,     0.433, 0.567, 0, 0,
            0,     0.475, 0.525, 0, 0,
            0,     0,     0,     1, 0" />
        </filter>
      `
    };
  
    if (filterType && filterType !== "none" && svgFilters[filterType]) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("style", "position: absolute; height: 0; width: 0;");
      svg.innerHTML = `<defs>${svgFilters[filterType]}</defs>`;
      document.body.appendChild(svg);
  
      const style = document.createElement("style");
      style.textContent = `
        html {
          filter: url(#colorblindFilter);
        }
      `;
      document.head.appendChild(style);
    }
  });
  