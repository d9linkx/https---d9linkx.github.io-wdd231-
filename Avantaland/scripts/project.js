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


document.addEventListener('DOMContentLoaded', () => {
    const membersDirectory = document.getElementById('members-directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Helper function to map membership level to the membership type
    function getMembershipLevel(level) {
        switch (level) {
            case 1:
                return 'Member';
            case 2:
                return 'Silver';
            case 3:
                return 'Gold';
            default:
                return 'Unknown';  // In case there's an unexpected membership value
        }
    }

    // Function to fetch and display members
    async function fetchMembers() {
        try {
            const response = await fetch('data/senderwaitlist.json'); // Ensure this path is correct.
            const members = await response.json();
            displayMembers(members, 'grid');  // Default view: grid
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Function to display members
    function displayMembers(members, viewType) {
        membersDirectory.innerHTML = '';  // Clear the directory content
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card', viewType === 'grid' ? 'grid-item' : 'list-item');

            // Creating the card structure including membership level
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.business}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                </div>
            `;

            membersDirectory.appendChild(memberCard);
        });
    }

    // Toggle view: Grid/List
    gridViewButton.addEventListener('click', () => {
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
        membersDirectory.classList.remove('directory-list');
        membersDirectory.classList.add('directory-grid');
        fetchMembers();
    });

    listViewButton.addEventListener('click', () => {
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
        membersDirectory.classList.remove('directory-grid');
        membersDirectory.classList.add('directory-list');
        fetchMembers();
    });

    // Initial Fetch
    fetchMembers();
});




// Sidebar and Menu interactions
function setupMenu() {
    const menuBtn = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-nav');
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    const sidebarContent = document.querySelector('.sidebar-content');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
    });

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarContent.classList.toggle('active');
    });
}

// ===================== CAROUSEL SETUP =====================

function setupCarousel() {
    document.querySelectorAll('.carousel').forEach((carousel) => {
        const carouselContent = carousel.querySelector('.carousel-content');
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        // Initialize carousel position
        updateCarousel();

        // Event listeners for touch/mouse drag
        let startX, isDragging = false;

        carouselContent.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselContent.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            e.preventDefault();
        });

        carouselContent.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            handleSwipe(e.touches[0].clientX);
        });

        carouselContent.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            handleSwipe(e.clientX);
        });

        carouselContent.addEventListener('touchend', endSwipe);
        carouselContent.addEventListener('mouseup', endSwipe);
        carouselContent.addEventListener('mouseleave', endSwipe);

        function handleSwipe(currentX) {
            const diff = startX - currentX;
            if (diff > 50) moveNext();
            else if (diff < -50) movePrevious();
        }

        function endSwipe() {
            isDragging = false;
        }

        function moveNext() {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }

        function movePrevious() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
        }

        function updateCarousel() {
            carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Carousel buttons
        carousel.querySelector('.next').addEventListener('click', moveNext);
        carousel.querySelector('.prev').addEventListener('click', movePrevious);
    });
}

// ===================== MEMBERS DIRECTORY =====================

async function fetchAndDisplayMembers() {
    const membersDirectory = document.getElementById('members-directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    gridViewButton.addEventListener('click', () => toggleView('grid'));
    listViewButton.addEventListener('click', () => toggleView('list'));

    try {
        const response = await fetch('data/senderwaitlist.json');
        const members = await response.json();
        displayMembers(members, getPreferredView());
    } catch (error) {
        console.error('Error fetching members:', error);
    }

    function displayMembers(members, viewType) {
        membersDirectory.innerHTML = '';  // Clear directory content
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card', viewType === 'grid' ? 'grid-item' : 'list-item');

            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.business}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
                    <button class="details-btn" onclick="openModal('${member.name}', '${member.business}', '${member.address}', '${member.phone}', '${member.membership}')">Details</button>
                </div>
            `;

            membersDirectory.appendChild(memberCard);
        });
    }

    function toggleView(viewType) {
        localStorage.setItem('viewType', viewType);
        displayMembers(members, viewType);
    }

    function getPreferredView() {
        return localStorage.getItem('viewType') || 'grid';
    }
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// ===================== MODAL SETUP =====================

function openModal(name, business, address, phone, membership) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h3>${name}</h3>
            <p><strong>Business:</strong> ${business}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(membership)}</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) document.body.removeChild(modal);
}

