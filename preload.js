const { ipcRenderer } = require('electron');
const fs = require("fs");
const path = require("path");



function popWindowCheck(){
    console.log('requested array from main process');

    ipcRenderer.send('request-array');

    ipcRenderer.on('response-array', (event, array) => {
        console.log('Received array from main process:', array);
    });

    console.log('received array from main process');
}

function popWindowFileList(){
    ipcRenderer.send('request-array');

    const container = document.getElementsByClassName("writable-note-space").item(0);

    const subcontainer = document.createElement('div');
    subcontainer.className = "subcontainer";

    subcontainer.addEventListener("click", function() {
        // const subcontainer_existant = container.getElementsByClassName("subcontainer");
        subcontainer.parentNode.removeChild(subcontainer);
    });

    container.append(subcontainer);


    const folderPath = '/Users/isaigordeev/Desktop/palaceapp';

    ipcRenderer.on('response-array', (event, array) => {
        array.forEach((file) => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile()) {
                    const div = document.createElement('div');
                    div.className = "markdown-content-line";
                    div.contentEditable = true;
                    // newLine.textContent = "New line here.";
                    div.textContent = file;
                    subcontainer.append(div);
                }

            });
        });
    });

}

window.onload = () => {
    console.log('Received array from main process');

    const openFileButton = document.getElementById('openFileButton');
    openFileButton.onclick = popWindowFileList;
};

function popWindow() {
    const container = document.getElementsByClassName("note-space").item(0);


    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile()) {

                }

            });
        });
    });
}