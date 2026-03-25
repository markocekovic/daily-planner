const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDataDiv = document.getElementById('weatherData');

getWeatherBtn.addEventListener('click', getWeather);

// Allow pressing "Enter" to search too!
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

function getWeather() {
    const cityName = cityInput.value.trim();
    
    // 1. IMPORTANT: Replace the text below with your actual key from OpenWeatherMap
    const apiKey = 'your_api_key_here43e90f38d94540de92e0bf2eccf49ce2'; 

    if (cityName === '') {
        alert('Please enter a city name');
        return;
    }

    // This URL matches the "Base URL + Parameters" logic you mentioned
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    // Show a "Loading..." message so the user knows something is happening
    weatherDataDiv.innerHTML = '<p>Fetching weather...</p>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
            weatherDataDiv.innerHTML = 'Network error. Please check your connection.';
        });
}

function displayWeather(data) {
    // Check for "City Not Found"
    if (data.cod === '404') {
        weatherDataDiv.innerHTML = 'City not found. Please try again.';
        return;
    }
    
    // Check for "Invalid API Key" 
    if (data.cod === 401) {
        weatherDataDiv.innerHTML = 'API Key Error. Make sure your key is active.';
        return;
    }

    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherDataDiv.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}