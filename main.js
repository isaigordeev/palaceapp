const { app, BrowserWindow, dialog, ipcMain, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let fileWindow;


function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    console.log(__dirname);

    mainWindow.loadFile('interface.html')
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}



function listFilesAndDirs(directoryPath) {
    try {
        const contents = fs.readdirSync(directoryPath);

        const files = [];
        const directories = [];

        contents.forEach((item) => {
            const itemPath = path.join(directoryPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isFile()) {
                files.push(item);
            } else if (stats.isDirectory()) {
                directories.push(item);
            }
        });

        return {
            files,
            directories,
        };

    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return null;
    }
}

app.on('ready',
    () => {
        createMainWindow();

        const directoryPath = '/Users/isaigordeev/Desktop/2023/palaceapp';
        const result = listFilesAndDirs(directoryPath);
        console.log(result.files);

        // mainWindow.webContents.once('dom-ready', () => {
        //     // Send the array to the renderer process when it's ready
        //     mainWindow.webContents.send('response-array', result.files);
        // });

        ipcMain.on('request-array', (event) => {
            // Send the array to the renderer process
            event.sender.send('response-array', result.files);
        });
    });


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});