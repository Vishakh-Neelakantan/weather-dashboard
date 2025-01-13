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

function addToHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        cityInput.value = city;
        fetchWeather();
    });
    historyList.appendChild(listItem);
}
