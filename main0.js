const { app, BrowserWindow, dialog } = require('electron');
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

  // Handle the "Select a File" button click
  mainWindow.webContents.on('did-finish-load', () => {
    const selectFileButton = mainWindow.webContents.document.getElementById('select-file');

    selectFileButton.addEventListener('click', () => {
      openFile();
    });
  });

  // ...rest of your code...
}

// Function to open a file dialog
function openFile() {
  const options = {
    properties: ['openFile'], // Limit to opening a single file
    filters: [
      { name: 'Text Files', extensions: ['txt', 'md'] }, // Allow .txt and .md files
      { name: 'All Files', extensions: ['*'] }, // Allow all file types
    ],
  };

  dialog.showOpenDialog(mainWindow, options).then((result) => {
    if (!result.canceled) {
      const filePath = result.filePaths[0];

      // Use Node.js fs module to read the selected file
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return;
        }

        // Determine the file type based on the file extension
        const fileType = path.extname(filePath);

        // Send the file content to the renderer process
        mainWindow.webContents.send('open-file', { content: data, fileType });
      });
    }
  });
}

// ...rest of your code...

app.whenReady().then(createWindow);


// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create a new window when the app is activated (on macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
