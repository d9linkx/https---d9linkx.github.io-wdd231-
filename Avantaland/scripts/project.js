// ===================== MENU SETUP =====================

window.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupCarousel();
    fetchAndDisplayMembers();
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
