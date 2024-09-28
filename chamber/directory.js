document.addEventListener('DOMContentLoaded', () => {
    const membersDirectory = document.getElementById('members-directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Function to fetch and display members
    async function fetchMembers() {
        try {
            const response = await fetch('data/member.json'); // Ensure this path is correct.
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

            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>${member.business}</p>
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
