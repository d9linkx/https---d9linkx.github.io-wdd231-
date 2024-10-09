window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    // Fetch and display member spotlights
    fetch('member.json')
        .then(response => response.json())
        .then(data => {
            const goldSilverMembers = data.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
            const selectedMembers = [];

            while (selectedMembers.length < 3 && goldSilverMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
                selectedMembers.push(goldSilverMembers.splice(randomIndex, 1)[0]);
            }

            const spotlightContainer = document.getElementById('spotlight-container');
            selectedMembers.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('spotlight');
                memberDiv.innerHTML = `
                    <img src="${member.logo}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p>${member.phone}</p>
                    <p>${member.address}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p>Membership Level: ${member.membership}</p>
                `;
                spotlightContainer.appendChild(memberDiv);
            });
        });

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
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
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
                        <p>High: ${day.main.temp_max}°C</p>
                        <p>Low: ${day.main.temp_min}°C</p>
                        <p>Weather: ${day.weather[0].description}</p>
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
