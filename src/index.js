import weather from './weather';
import displayWeather from './displayWeather';
import './styles.css';

(() => {
  const searchForm = document.querySelector('[data-search-form]');
  const searchLocation = document.querySelector('[data-search-location]');
  const unitToggle = document.querySelector('[data-unit-toggle]');

  function getLocation() {
    if (searchLocation.value !== '') {
      weather.urlData.location = searchLocation.value;
    }
  }

  function changeUnits() {
    weather.urlData.units = unitToggle.checked ? 'imperial' : 'metric';
  }

  async function getWeather() {
    try {
      const data = await weather.getCurrentWeatherData();
      const convertedData = displayWeather.convertWeatherData(data);
      displayWeather.displayWeatherData(convertedData);
    } catch (error) {
      displayWeather.displayError(error);
    }
  }

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getLocation();
    getWeather();
    searchLocation.value = '';
  });

  unitToggle.addEventListener('click', () => {
    changeUnits(weather.urlData);
    getWeather();
  });

  getWeather();
})();
