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
   
    chrome.storage.sync.get(["filterType", "advanced"], ({ filterType, advanced }) => {
      if (filterType && filterType !== "none" && svgFilters[filterType]) {
        // inject the SVG filter
        const svgNS = "http://www.w3.org/2000/svg";
        const svg   = document.createElementNS(svgNS, "svg");
        svg.setAttribute("style", "position:absolute;height:0;width:0;");
        svg.innerHTML = `<defs>${svgFilters[filterType]}</defs>`;
        document.body.appendChild(svg);
    
        // pull our offsets (default to zero)
        const cOff = (advanced && advanced.contrast)   || 0;
        const bOff = (advanced && advanced.brightness) || 0;
        const sOff = (advanced && advanced.saturate)   || 0;
    
        // inject CSS that chains url() + our offsets
        const style = document.createElement("style");
        style.textContent = `
          html {
            filter: 
              url(#colorblindFilter)
              contrast(${1 + cOff})
              brightness(${1 + bOff})
              saturate(${1 + sOff});
          }
        `;
        document.head.appendChild(style);
      }
    });
  });