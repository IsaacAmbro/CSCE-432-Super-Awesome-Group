# CSCE-432-Super-Awesome-Group
# Color Blind Filter Extension

A Chrome extension that applies customizable color filters to webpages, helping individuals with various types of color blindness better perceive on-screen content.

## 💡 Features

-  Simulates **Protanopia**, **Deuteranopia**, and **Tritanopia**
-  Remembers user preference across sessions
-  Lightweight and easy to use
-  Works on nearly all websites

##  Project Structure
1. manifest.json            # Chrome extension configuration
2. popup.html               # User interface to select color filter
3. popup.js                 # Logic for saving filter selection
4. content.js               # Injects CSS filters into webpages
5. background.js            # Required by Chrome as a background script
6. icons/                   # Folder for extension icons
7. filters/                 # Contains SVG filters for different color blindness types


## How to Use

1. Clone or download the repo.
2. Go to `chrome://extensions` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extension folder.
5. Click the extension icon to choose a color blindness filter.

## 🛠 Customization

You can add more SVG filters in the `filters/` folder and update `content.js` with the new filter mappings.

