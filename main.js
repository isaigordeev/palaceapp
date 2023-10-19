const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let fileWindow;


function createMainWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


app.on('ready', createMainWindow);


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
