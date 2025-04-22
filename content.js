/* =======================
   content.js - Injects CSS to apply SVG filter based on user selection
   ======================= */
   chrome.storage.sync.get("filterType", ({ filterType }) => {
    const svgFilters = {
      protanopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            1.2,  0.0,  0.0, 0, 0,
            0.0,  1.0,  0.0, 0, 0,
            0.2,  0.2,  1.3, 0, 0,
            0,    0,    0,   1, 0" />
        </filter>
      `,
      deuteranopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            1.3,  0.0,  0.0, 0, 0,
            0.0,  1.0,  0.0, 0, 0,
            0.0,  0.2,  1.2, 0, 0,
            0,    0,    0,   1, 0" />
        </filter>

      `,
      tritanopia: `
        <filter id="colorblindFilter">
          <feColorMatrix type="matrix" values="
            1.0,  0.0,  0.1, 0, 0,
            0.0,  1.1,  0.0, 0, 0,
            0.2,  0.3,  1.2, 0, 0,
            0,    0,    0,   1, 0" />
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
  