# CSCE-432-Super-Awesome-Group
# 🧿 Color Blind Filter Extension

A Chrome extension that applies customizable color filters to webpages, helping individuals with various types of color blindness better perceive on-screen content.

## 💡 Features

- 🌈 Simulates **Protanopia**, **Deuteranopia**, and **Tritanopia**
- 🧠 Remembers user preference across sessions
- ⚡ Lightweight and easy to use
- 🔧 Works on nearly all websites

## 📁 Project Structure
color-blind-extension/
├── manifest.json            # Chrome extension configuration
├── popup.html               # User interface to select color filter
├── popup.js                 # Logic for saving filter selection
├── content.js               # Injects CSS filters into webpages
├── background.js            # Required by Chrome as a background script
├── icons/                   # Folder for extension icons
└── filters/                 # Contains SVG filters for different color blindness types
    ├── protanopia.svg
    ├── deuteranopia.svg
    └── tritanopia.svg

## 🚀 How to Use

1. Clone or download the repo.
2. Go to `chrome://extensions` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extension folder.
5. Click the extension icon to choose a color blindness filter.

## 🛠 Customization

You can add more SVG filters in the `filters/` folder and update `content.js` with the new filter mappings.

## 📣 Credits

Developed by **Super Awesome Group**  
- Isaac Ambro – [isaacambro@tamu.edu](mailto:isaacambro@tamu.edu)  
- Andy Corrales – [andycorrales@tamu.edu](mailto:andycorrales@tamu.edu)

---

Feel free to copy this into a file named `README.md` and include it in the root of your GitHub repo.

Let me know if you want a GitHub Actions CI setup or a logo too!
