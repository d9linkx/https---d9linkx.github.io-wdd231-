// Select elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const closeBtn = document.querySelector('.close-btn');

// Check if elements exist before adding event listeners
if (hamburger && navMenu && closeBtn) {

    // Toggle menu visibility
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        closeBtn.classList.toggle('visible'); // Toggle visibility via class
    });

    // Close menu
    closeBtn.addEventListener('click', () => {
        navMenu.classList.remove('show');
        closeBtn.classList.remove('visible');
    });
}

// Toggle view logic for buttons
const buttons = document.querySelectorAll('.toggle-view button');
if (buttons.length > 0) {
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Add logic here to toggle views
            // e.g., document.querySelector('.view').classList.toggle('visible');
        });
    });
}
