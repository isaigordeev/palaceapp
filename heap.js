import {ipcRenderer} from "electron";

function popWindowCheck(){
    console.log('requested array from main process');

    ipcRenderer.send('request-array');

    ipcRenderer.on('response-array', (event, array) => {
        console.log('Received array from main process:', array);
    });

    console.log('received array from main process');
}