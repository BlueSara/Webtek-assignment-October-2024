/*made separate files to not get errors on my pages, because 
functions werent used on each site */

const weatherContainer = document.getElementById('weather-body');  

// Array of locations (latitude and longitude) for my 5 cities
const weatherLocations = [
    { city: 'Oslo', latitude: 59.9127, longitude: 10.7461 },
    { city: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
    { city: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { city: 'London', latitude: 51.5074, longitude: -0.1278 },
    { city: 'Sydney', latitude: -33.8688, longitude: 151.2093 }
];

function fetchWeatherUpdates() { 
    // Fetch weather data for all locations in the weatherLocation array
    weatherLocations.forEach(location => {
        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        fetch(apiURL)
        .then(response => {
            if (!response.ok) {             // If no response we get an error
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const weather = data.current_weather;

            /*
            * Creating a table with table row and data elements to display the 
            * weather information. 
            *  - weatherRow is representing every row in the table
            *  - weatherCity is representing the table data (td) for cities
            *  - weatherTemperature is representing the table data (td) for temperature
            *  - weatherWind is representing the table data (td) for the wind
            */
            const weatherRow = document.createElement('tr');
            const weatherCity = document.createElement('td');
            const weatherTemperature = document.createElement('td');
            const weatherWind = document.createElement('td');

            /*
            * In this section I am creating variables that contain the data from each city, 
            * their name, the temperature and their wind speed.
            * Im also adding the °C and m/s for each temperature
            * that is displayed and wind data that is displayed.
            *
            */
            weatherCity.textContent = location.city;
            weatherTemperature.textContent = `${weather.temperature}°C`;
            weatherWind.textContent = `${weather.windspeed} m/s`;

            /*
            * In this section I am appending/adding all the textcontent
            * into the table. 
            */
            weatherRow.appendChild(weatherCity);
            weatherRow.appendChild(weatherTemperature);
            weatherRow.appendChild(weatherWind);
            weatherContainer.appendChild(weatherRow); //I am adding all content into the
                                                      // container that was created in line 4
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
    });
}
// Setting an interval to check every 5 minutes for updated weather data.
setInterval(fetchWeatherUpdates, 5 * 60 * 1000); 

// Calling the function
fetchWeatherUpdates();