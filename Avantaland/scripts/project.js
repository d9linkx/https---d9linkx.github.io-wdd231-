window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    const sidebarContent = document.querySelector('.sidebar-content');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebarContent.classList.toggle('active');
    });
});


// carouselSwipe.js

// Select all carousels in the document
document.querySelectorAll('.carousel').forEach((carousel) => {
    const carouselContent = carousel.querySelector('.carousel-content');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;  // Tracks the current visible item

    // Set initial position
    updateCarousel();

    // Add touch and mouse event listeners
    let startX, isDragging = false;

    carouselContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carouselContent.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();  // Prevents text selection on drag
    });

    carouselContent.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        handleSwipe(currentX);
    });

    carouselContent.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        handleSwipe(currentX);
    });

    carouselContent.addEventListener('touchend', () => endSwipe());
    carouselContent.addEventListener('mouseup', () => endSwipe());
    carouselContent.addEventListener('mouseleave', () => endSwipe());

    function handleSwipe(currentX) {
        const diff = startX - currentX;

        // Swipe left to move to the next item
        if (diff > 50) {
            moveNext();
            isDragging = false;
        }
        // Swipe right to move to the previous item
        else if (diff < -50) {
            movePrevious();
            isDragging = false;
        }
    }

    function endSwipe() {
        isDragging = false;
    }

    function moveNext() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;  // Loop back to the start
        }
        updateCarousel();
    }

    function movePrevious() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;  // Loop back to the end
        }
        updateCarousel();
    }

    function updateCarousel() {
        carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Button controls
    carousel.querySelector('.next').addEventListener('click', moveNext);
    carousel.querySelector('.prev').addEventListener('click', movePrevious);
});


function toggleCarousel(carouselClass) {
    const carousel = document.querySelector(`.${carouselClass} .carousel-content`);
    if (carousel.classList.contains('carousel-hidden')) {
        carousel.classList.remove('carousel-hidden');
        carousel.classList.add('carousel-visible');
    } else {
        carousel.classList.remove('carousel-visible');
        carousel.classList.add('carousel-hidden');
    }
}


document.querySelectorAll('.carousel').forEach((carousel) => {
    const carouselContent = carousel.querySelector('.carousel-content');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;  // Tracks the current visible item

    // Set initial position
    updateCarousel();

    // Lazy load images for the current and adjacent items
    loadImages();

    // Add touch and mouse event listeners
    let startX, isDragging = false;

    carouselContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carouselContent.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();  // Prevents text selection on drag
    });

    carouselContent.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        handleSwipe(currentX);
    });

    carouselContent.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        handleSwipe(currentX);
    });

    carouselContent.addEventListener('touchend', () => endSwipe());
    carouselContent.addEventListener('mouseup', () => endSwipe());
    carouselContent.addEventListener('mouseleave', () => endSwipe());

    function handleSwipe(currentX) {
        const diff = startX - currentX;

        // Swipe left to move to the next item
        if (diff > 50) {
            moveNext();
            isDragging = false;
        }
        // Swipe right to move to the previous item
        else if (diff < -50) {
            movePrevious();
            isDragging = false;
        }
    }

    function endSwipe() {
        isDragging = false;
    }

    function moveNext() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;  // Loop back to the start
        }
        updateCarousel();
        loadImages(); // Load images when moving to a new item
    }

    function movePrevious() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;  // Loop back to the end
        }
        updateCarousel();
        loadImages(); // Load images when moving to a new item
    }

    function updateCarousel() {
        carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function loadImages() {
        items.forEach((item, index) => {
            const img = item.querySelector('img.lazy');
            if (img) {
                const rect = img.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Check if the image is in the viewport or adjacent to the current index
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src; // Set the actual image source
                        img.classList.remove('lazy');
                        img.removeAttribute('data-src'); // Clean up
                    }
                }
            }
        });
    }

    // Button controls
    carousel.querySelector('.next').addEventListener('click', moveNext);
    carousel.querySelector('.prev').addEventListener('click', movePrevious);
});
