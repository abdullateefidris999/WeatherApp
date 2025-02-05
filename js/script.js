const API_KEY = 'a93542d2b15461aee01256847647839d';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.querySelector('.weather-card');
const errorMessage = document.getElementById('error-message');

// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        updateUI(data);
    } catch (err) {
        showError();
    }
}

// Update DOM with weather data
function updateUI(data) {
    const { name: city } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed: windSpeed } = data.wind;

    // Update elements
    document.getElementById('city-name').textContent = city;
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('description').textContent = description;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} m/s`;

    // Update weather icon using CSS background
    const iconElement = document.getElementById('weather-icon');
    iconElement.style.backgroundImage = `url(https://openweathermap.org/img/wn/${icon}@4x.png)`;

    // Show card with animation
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.remove('hidden');
    weatherCard.classList.add('active');
    errorMessage.classList.add('hidden');
}

// Show error message
function showError() {
    errorMessage.classList.remove('hidden');
    weatherCard.classList.add('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim()) {
        fetchWeather(cityInput.value.trim());
    }
});

