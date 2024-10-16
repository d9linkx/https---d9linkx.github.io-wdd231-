document.addEventListener("DOMContentLoaded", function () {
    // Animate membership cards on load
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });

    // Modal functionality
    const openModalLinks = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close');

    openModalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = link.getAttribute('href').substring(1); // Get the modal ID from href
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.style.display = 'block';  // Show modal if found
            } else {
                console.error('Modal not found for ID:', modalId);  // Error if modal is null
            }
        });
    });

    // Close modals when clicking the close button

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';  // Hide modal
            }
        });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';  // Hide modal if clicked outside of modal content
            }
        });
    });
});

window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}