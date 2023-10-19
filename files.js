const fs = require('fs');
const path = require('path');

const folderPath = '/Users/isaigordeev/Desktop/palaceapp'; // Replace with the actual folder path

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
                console.log(file); // Print the file name
            }
        });
    });
});