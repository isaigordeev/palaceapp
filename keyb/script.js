// Select all the editable divs
const editableDivs = document.querySelectorAll('.editable');

// Add an event listener to each editable div for keyboard navigation
editableDivs.forEach((div, index) => {
    div.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // If Enter is pressed without Shift, move focus to the next div (if available)
            event.preventDefault();
            const nextDiv = editableDivs[index + 1];
            if (nextDiv) {
                nextDiv.focus();
            }
        } else if (event.key === 'Enter' && event.shiftKey) {
            // If Shift+Enter is pressed, move focus to the previous div (if available)
            event.preventDefault();
            const prevDiv = editableDivs[index - 1];
            if (prevDiv) {
                prevDiv.focus();
            }
        }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const editor = ace.edit('editor');
//
//     // Enable Vim mode
//     editor.setKeyboardHandler('ace/keyboard/vim');
// });

document.addEventListener('DOMContentLoaded', () => {
    // Get the textarea element
    const textarea = document.getElementById('editor');

    // Initialize CodeMirror with Vim mode
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: 'text/plain', // Specify the mode you want to use (e.g., 'text/html')
        keyMap: 'vim',      // Enable Vim mode
        lineNumbers: true   // Display line numbers (optional)
    });
});
