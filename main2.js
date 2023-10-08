const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Create a reference to the main window
let mainWindow;

// Create a new browser window function
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  mainWindow.loadFile('index0.html');

  // Open the DevTools if needed
  // mainWindow.webContents.openDevTools();

  // Handle opening .md and .txt files
  app.on('open-file', (event, filePath) => {
    event.preventDefault();

    if (mainWindow) {
      mainWindow.webContents.send('open-file', filePath);
    } else {
      // If the main window is not yet ready, store the file path for later
      queuedFilePath = filePath;
    }
  });

  // ...rest of your code...
}

// ...rest of your code...
