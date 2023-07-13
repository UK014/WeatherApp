const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', searchWeather);

searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchWeather();
  }
});

function searchWeather() {
  const cityName = searchInput.value;
  if (cityName) {
    fetchWeatherData(cityName);
  }
}

function fetchWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

function displayWeatherData(data) {
  cityElement.textContent = data.name + ', ' + data.sys.country;
  const currentDate = new Date();
  dateElement.textContent = currentDate.toDateString();
  temperatureElement.textContent = Math.round(data.main.temp) + '°C';
  descriptionElement.textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
  weatherIconElement.style.backgroundImage = `url('${iconURL}')`;
}

const defaultCity = 'London';
fetchWeatherData(defaultCity);
