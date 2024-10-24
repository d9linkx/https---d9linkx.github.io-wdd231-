window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });





    



    // Fetch the JSON data
    fetch('data/member.json')
    .then(response => response.json())
    .then(data => {
        // Filter out Gold and Silver members
        const qualifiedMembers = data.filter(member => member.membership === 1 || member.membership === 2);

        // Shuffle the array to get random members
        shuffleArray(qualifiedMembers);

        // Pick 2 or 3 random members (depending on how many are available)
        const selectedMembers = qualifiedMembers.slice(0, 3);

        // Inject the selected members into the HTML
        for (let i = 0; i < selectedMembers.length; i++) {
            const member = selectedMembers[i];
            const memberDiv = document.getElementById(`member-${i+1}`);

            if (memberDiv) {
                document.getElementById(`member-${i+1}-image`).src = `images/${member.image}`;
                document.getElementById(`member-${i+1}-name`).textContent = member.name;
                document.getElementById(`member-${i+1}-business`).textContent = member.business;
                document.getElementById(`member-${i+1}-address`).textContent = member.address;
                document.getElementById(`member-${i+1}-phone`).textContent = member.phone;
                document.getElementById(`member-${i+1}-website`).href = member.website;
                document.getElementById(`member-${i+1}-website`).textContent = "Visit Website";

                const membershipLevel = member.membership === 1 ? "Gold Member" : "Silver Member";
                document.getElementById(`member-${i+1}-membership`).textContent = membershipLevel;
            }
        }
    })
    .catch(error => console.error('Error fetching member data:', error));

    // Function to shuffle the array (Fisher-Yates Shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to capitalize each word
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Function to format temperature to zero decimal points
    function formatTemperature(temp) {
        return Math.round(temp);
    }

    // Fetch and display weather information
    const apiKey = '589084e95b90fbcb3ff92daebaa0d47b';
    const city = 'Lagos';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=4&appid=${apiKey}`;

    async function getWeather() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            document.getElementById('current-weather').innerHTML = `
                <p>Temperature: ${formatTemperature(data.main.temp)}°C</p>
                <p>Weather: ${capitalizeWords(data.weather[0].description)}</p>
            `;
        } catch (error) {
            console.error('Error fetching current weather:', error);
        }
    }

    async function getForecast() {
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = '';
            for (let i = 1; i < data.list.length; i++) {
                const day = data.list[i];
                forecastElement.innerHTML += `
                    <div class="forecast-day">
                        <p>Day ${i}:</p>
                        <p>High: ${formatTemperature(day.main.temp_max)}°C</p>
                        <p>Low: ${formatTemperature(day.main.temp_min)}°C</p>
                        <p>Weather: ${capitalizeWords(day.weather[0].description)}</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    }

    getWeather();
    getForecast();
}


// Check for the last visit date in localStorage
const lastVisitKey = 'lastVisit';
const visitMessageElement = document.getElementById('visit-message');

// Function to calculate days between two dates
function calculateDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((date2 - date1) / oneDay));
}

// Function to display visit message
function displayVisitMessage() {
    const lastVisit = localStorage.getItem(lastVisitKey);
    const currentTime = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit, 10));
        const daysSinceLastVisit = calculateDaysBetween(lastVisitDate, new Date());

        if (daysSinceLastVisit < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    
    // Store the current visit date
    localStorage.setItem(lastVisitKey, currentTime);
}

// Lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('.lazy');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Set the src to the data-src attribute
                img.onload = () => {
                    img.classList.remove('lazy'); // Remove lazy class after loading
                };
                observer.unobserve(img); // Stop observing this image
            }
        });
    }, options);

    images.forEach(img => {
        imageObserver.observe(img); // Start observing each image
    });
}

// Initialize functions on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    lazyLoadImages();
});


