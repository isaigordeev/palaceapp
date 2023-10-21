const popOutDiv = document.getElementById('popOutDiv');
const triggerDiv = document.getElementById('childDiv1'); // Change this to the appropriate trigger div

triggerDiv.addEventListener('click', () => {
    popOutDiv.style.display = 'block';
});

// Add event listeners to close the pop-out div when needed
// Example: Add a close button within the pop-out div to hide it when clicked.
const closeButton = document.getElementById('closeButton'); // Assuming you have a close button in the pop-out div
closeButton.addEventListener('click', () => {
    popOutDiv.style.display = 'none';
});
