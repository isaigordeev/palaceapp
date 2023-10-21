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

function addEditableNote() {
    const customDiv = document.createElement("div");
    customDiv.className = "writable-note-space";

    const h1Element = document.createElement("h1");
    h1Element.textContent = "Note";

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "editor");

    const textarea = document.createElement("textarea");
    textarea.id = "editor";

    const editor = CodeMirror.fromTextArea(textarea, {
        mode: 'text/plain', // Specify the mode you want to use (e.g., 'text/html')
        keyMap: 'vim',      // Enable Vim mode
        lineNumbers: true   // Display line numbers (optional)
    });



    customDiv.appendChild(h1Element);
    customDiv.appendChild(labelElement);
    customDiv.appendChild(textareaElement);

    document.getElementsByClassName("note-space").item(0).appendChild(customDiv);
}

function popWindowFileList(){
    ipcRenderer.send('request-array');

    const container = document.getElementsByClassName("note-space").item(0);

    const fileListContainer = document.createElement('div');
    fileListContainer.className = "file-list-container";

    const startPage = document.getElementsByClassName("start-page").item(0);


    // const editorSpace = document.createElement('div');
    // editorSpace.className = "writable-note-space";
    //
    // const editor = document.createElement('div');
    // editor.className = "writable-note-space";




    fileListContainer.addEventListener("click", function() {
        // const subcontainer_existant = container.getElementsByClassName("subcontainer");
        fileListContainer.parentNode.removeChild(fileListContainer);
        startPage.parentNode.removeChild(startPage);
        addEditableNote()
    });

    container.prepend(fileListContainer);


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
                    // div.contentEditable = true;
                    // newLine.textContent = "New line here.";
                    div.textContent = file;
                    fileListContainer.append(div);
                }

            });
        });
    });

}

window.onload = () => {
    console.log('Received array from main process');

    // const openFileButton = document.getElementById('openFileButton');
    // openFileButton.onclick = popWindowFileList;

    const selectFileButton = document.getElementById('selectFileButton');
    selectFileButton.onclick = popWindowFileList;
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