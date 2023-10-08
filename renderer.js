const fs = require('fs');
const { dialog } = require('electron').remote;

document.getElementById('saveButton').addEventListener('click', () => {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;

    dialog.showSaveDialog((filePath) => {
        if (filePath) {
            const noteData = JSON.stringify({ title: noteTitle, content: noteContent });

            fs.writeFile(filePath, noteData, (err) => {
                if (err) {
                    console.error('Error saving note:', err);
                } else {
                    console.log('Note saved successfully.');
                }
            });
        }
    });
});

document.getElementById('loadButton').addEventListener('click', () => {
    dialog.showOpenDialog((filePaths) => {
        if (filePaths && filePaths.length > 0) {
            const filePath = filePaths[0];

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error loading note:', err);
                } else {
                    const note = JSON.parse(data);
                    document.getElementById('noteTitle').value = note.title;
                    document.getElementById('noteContent').value = note.content;
                    console.log('Note loaded successfully.');
                }
            });
        }
    });
});
