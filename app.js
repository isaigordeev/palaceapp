const fs = require('fs');

// Data for the Markdown file
const markdownData = `
# My Markdown File

This is a sample Markdown file created with Node.js.
`;

// File path for the Markdown file
const filePath = 'sample.md';

// Create the Markdown file
fs.writeFile(filePath, markdownData, (err) => {
  if (err) {
    console.error('Error creating the Markdown file:', err);
  } else {
    console.log(`Markdown file '${filePath}' has been created.`);
  }
});

