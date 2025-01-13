// script.js

const apiKey = ''; // Replace with your OpenWeather API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const historyList = document.getElementById('historyList');

searchButton.addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            addToHistory(city);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = data.main.temp;
    condition.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.classList.remove('hidden');
}

document.getElementById('currentLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetchCurrentLocationWeather(lat, lon);
        }, error => {
            alert("Unable to retrieve location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchCurrentLocationWeather(lat, lon) {
    const locationWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(locationWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather for your location');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data); // Reuse the same display function
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(weatherData) {
    const localTime = new Date((weatherData.dt + weatherData.timezone) * 1000)
        .toUTCString()
        .replace('GMT', '');

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
        <p><strong>Local Time:</strong> ${localTime}</p>
        <p><strong>Temperature:</strong> ${Math.round(weatherData.main.temp)}°C</p>
        <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
        <p><strong>Pressure:</strong> ${weatherData.main.pressure} hPa</p>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].description}">
    `;
    weatherResult.classList.remove('hidden');
}


function addToHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        cityInput.value = city;
        fetchWeather();
    });
    historyList.appendChild(listItem);
}
