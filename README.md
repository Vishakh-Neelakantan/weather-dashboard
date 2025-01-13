Weather Dashboard Project

Overview

This Weather Dashboard is a web application that allows users to fetch and view real-time weather information for any city using the OpenWeather API. The application supports additional features such as using the user's current location to fetch weather, displaying detailed weather information, maintaining a search history, and toggling between Celsius and Fahrenheit units.

Features Implemented

1. Search Weather by City

Users can enter a city name in the search bar and fetch the weather information.

Displays:

City name and country.

Current temperature.

Weather condition.

Humidity, wind speed, and pressure.

Weather icon based on the condition.

2. Use Current Location

Users can click the "Use My Location" button to fetch weather information based on their geographical coordinates.

Utilizes the browser's Geolocation API to retrieve latitude and longitude.

3. Display Additional Weather Details

Shows extra weather parameters:

Humidity percentage.

Wind speed in meters per second (m/s).

Atmospheric pressure in hPa.

4. Unit Toggle (Celsius/Fahrenheit)

A toggle button to switch temperature units between Celsius and Fahrenheit.

Automatically updates the weather display based on the selected unit.

5. Search History

Maintains a history of searched cities.

Allows users to click on any city in the history list to fetch its weather again.

6. Local Time Display

Displays the local time of the searched city using the timezone offset provided by the API.

Technologies Used

1. Frontend

HTML5: For structuring the application.

CSS3: For styling and creating a responsive layout.

JavaScript: For handling API calls, DOM manipulation, and implementing features.

2. API

OpenWeather API: Provides current weather data.

How to Run

Prerequisites

-A browser that supports JavaScript.

-An active internet connection.

-A free API key from OpenWeather.

Steps to Run

-Clone the repository or download the project files.

-Place the files in a project folder.

-Open the index.html file in a web browser.

-Replace YOUR_API_KEY in the JavaScript file with your free API key.
