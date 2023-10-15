const openPanelButton = document.getElementById('openPanelButton');
const closePanelButton = document.getElementById('closePanelButton');
const panel = document.getElementById('panel');

openPanelButton.addEventListener('click', () => {
    panel.style.right = '0'; // Slide the panel in from the right
    panel.classList.remove('hidden');
});

closePanelButton.addEventListener('click', () => {
    panel.style.right = '-300px'; // Slide the panel out to the right
    panel.classList.add('hidden');
});
