if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Function to fetch weather data based on the user's location
function fetchWeatherData(latitude, longitude) {
  const API_KEY = "e9a9060191e69bfdb2c43a5f34fe3a64";
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      // Display weather information
      const weatherContainer = document.getElementById("weather-container");
      const currentWeather = data.list[0]; // Assuming the current weather is the first entry in the list
      weatherContainer.innerHTML = `
              <h2>${data.city.name}, ${data.city.country}</h2>
              <p>Population: ${data.city.population}</p>
              <p>Time: ${currentWeather.dt_txt}</p>
              <p>Temperature: ${currentWeather.main.temp}°K</p>
              <p>Condition: ${currentWeather.weather[0].description}</p>
          `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to get user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Call the function to fetch weather data with the obtained coordinates
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Call the function to get the user's location and fetch weather data
getLocation();
