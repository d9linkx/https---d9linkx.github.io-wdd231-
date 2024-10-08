// Get elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.getElementById('close-btn');

// Open menu
hamburger.addEventListener('click', () => {
    navLinks.classList.add('nav-open');
});

// Close menu
closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
});
