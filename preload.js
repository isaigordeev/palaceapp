const { ipcRenderer } = require('electron');


function popWindow(){
    console.log('requested array from main process');

    ipcRenderer.send('request-array');

    ipcRenderer.on('file-list', (event, array) => {
        console.log('Received array from main process:', array);
    });
}

window.onload = () => {
    console.log('Received array from main process');

    const openFileButton = document.getElementById('openFileButton');
    openFileButton.onclick = popWindow;

    // ipcRenderer.on('send-file-list', (event, array) => {
    //     console.log('Received array from main process:', array);
    // });
};