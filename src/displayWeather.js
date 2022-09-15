const displayWeather = (() => {
  const temperatureElement = document.querySelector('[data-temperature]');
  const locationElement = document.querySelector('[data-location]');
  const dateElement = document.querySelector('[data-date]');
  const iconElement = document.querySelector('[data-icon]');
  const weatherConditionElement = document.querySelector(
    '[data-weather-condition]'
  );
  const windSpeedElement = document.querySelector('[data-wind-speed]');
  const humidityElement = document.querySelector('[data-humidity]');
  const pressureElement = document.querySelector('[data-pressure]');
  const highLowTemperatureElement = document.querySelector(
    '[data-high-low-temperature]'
  );
  const feelsLikeTemperatureElement = document.querySelector(
    '[data-feels-like-temperature]'
  );
  const cloudinessElement = document.querySelector('[data-cloudiness]');
  const visibilityElement = document.querySelector('[data-visibility]');
  const unitToggle = document.querySelector('[data-unit-toggle]');
  const sunriseElement = document.querySelector('[data-sunrise]');
  const sunsetElement = document.querySelector('[data-sunset]');
  const errorElement = document.querySelector('[data-error]');

  function convertDate(timestamp, timezoneOffset) {
    const MILLISECONDS = 1000;
    const SECONDS = 60;
    const localDate = new Date();
    const utc =
      (timestamp + localDate.getTimezoneOffset() * SECONDS) * MILLISECONDS;
    const dateWithOffset = new Date(utc + MILLISECONDS * timezoneOffset);
    return dateWithOffset;
  }

  function convertWeatherData(weatherData) {
    let {
      main: {
        temp,
        feels_like: feelsLike,
        temp_max: tempMax,
        temp_min: tempMin,
      },
      dt,
      sys: { sunrise, sunset },
      visibility,
    } = weatherData;

    const {
      main: { humidity, pressure },
      name: cityName,
      weatherInfo: [{ description, icon }],
      wind: { speed },
      clouds: { all: cloudiness },
      timezone,
    } = weatherData;

    const METERS = 1000;

    temp = Math.round(temp);
    feelsLike = Math.round(feelsLike);
    tempMax = Math.round(tempMax);
    tempMin = Math.round(tempMin);
    visibility = Math.round(visibility / METERS);
    dt = convertDate(dt, timezone);
    sunrise = convertDate(sunrise, timezone);
    sunset = convertDate(sunset, timezone);
    return {
      temp,
      feelsLike,
      humidity,
      pressure,
      tempMax,
      tempMin,
      cityName,
      dt,
      sunrise,
      sunset,
      description,
      icon,
      speed,
      cloudiness,
      visibility,
      timezone,
    };
  }

  function displayWeatherData(weatherData) {
    const {
      temp,
      feelsLike,
      humidity,
      pressure,
      tempMax,
      tempMin,
      cityName,
      dt,
      sunrise,
      sunset,
      description,
      icon,
      speed,
      cloudiness,
      visibility,
    } = weatherData;

    temperatureElement.textContent = unitToggle.checked
      ? `${temp} \u2109`
      : `${temp} \u2103`;
    locationElement.textContent = cityName;
    dateElement.textContent = dt.toLocaleString('default', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;
    weatherConditionElement.textContent = description;
    windSpeedElement.textContent = unitToggle.checked
      ? `${speed} mph`
      : `${speed} m/s`;
    humidityElement.textContent = `${humidity} %`;
    pressureElement.textContent = `${pressure} hPa`;
    highLowTemperatureElement.textContent = `${tempMax}/${tempMin}`;
    feelsLikeTemperatureElement.textContent = unitToggle.checked
      ? `${feelsLike} \u2109`
      : `${feelsLike} \u2103`;
    cloudinessElement.textContent = `${cloudiness} %`;
    visibilityElement.textContent = `${visibility} km`;
    sunriseElement.textContent = sunrise.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    sunsetElement.textContent = sunset.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }

  function displayError(error) {
    errorElement.textContent = error.message;
    errorElement.classList.remove('hidden');
  }
  return { displayWeatherData, convertWeatherData, displayError };
})();

export default displayWeather;
