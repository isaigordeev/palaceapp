// const {ipcRenderer} = require('electron')

const folderPath = '/Users/isaigordeev/Desktop/palaceapp'; // Replace with the actual folder path


// const openPanelButton = document.getElementById('openPanelButton');
const closePanelButton = document.getElementById('closePanelButton');
const selectFileButton = document.getElementById('openFileButton');
const panel = document.getElementById('panel');

// openPanelButton.addEventListener('click', () => {
//
//     if(panel.classList.contains("hidden")) {
//         panel.style.right = '0'; // Slide the panel in from the right
//         panel.classList.remove('hidden');
//     } else {
//         panel.style.right = '-300px'; // Slide the panel out to the right
//         panel.classList.add('hidden');
//     }
// });

// function popWindow1(){
//     ipcRenderer.on('send-file-list', (event, array) => {
//         console.log('Received array from main process:', array);
//     });
// }
//
//
// selectFileButton.addEventListener('click', popWindow1);

// closePanelButton.addEventListener('click', () => {
//     panel.style.right = '-300px'; // Slide the panel out to the right
//     panel.classList.add('hidden');
// });


function addLine() {
    const container = document.getElementsByClassName("writable-note-space").item(0);

    const newLine = document.createElement("div");

    newLine.className = "markdown-content-line";
    newLine.contentEditable = true;
    newLine.textContent = "custom text";

    newLine.addEventListener("click", function() {
        if (newLine.classList.contains("markdown-content-line")) {

            if(container.getElementsByClassName("markdown-content-line-active").length !== 0){
                var activeLine = container.getElementsByClassName("markdown-content-line-active").item(0);
                activeLine.classList.remove("markdown-content-line-active");
                activeLine.classList.add("markdown-content-line");
            }

            newLine.classList.remove("markdown-content-line");
            newLine.classList.add("markdown-content-line-active");
        } else {
            newLine.classList.remove("markdown-content-line-active");
            newLine.classList.add("markdown-content-line");
        }
    });
    container.appendChild(newLine);
}

function deleteLine() {
    const container = document.getElementsByClassName("writable-note-space").item(0);
    const lines = container.getElementsByClassName("markdown-content-line");

    if (lines.length > 0) {
        container.removeChild(lines[lines.length - 1]);
    }
}



