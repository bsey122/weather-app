const weather = (() => {
  const unitToggle = document.querySelector('[data-unit-toggle]');
  const urlData = {
    key: '083483deb322f8a65ee3168ed52fd2f0',
    units: 'metric',
    location: 'London,uk',
    getUrl() {
      return `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.key}&units=${this.units}`;
    },
  };

  function fetchData(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response);
  }

  function getWeatherDataFromFetch(data) {
    const {
      main,
      dt,
      sys,
      name,
      weather: weatherInfo,
      wind,
      clouds,
      visibility,
      timezone,
    } = data;
    return {
      main,
      dt,
      sys,
      name,
      weatherInfo,
      wind,
      clouds,
      visibility,
      timezone,
    };
  }

  async function getCurrentWeatherData() {
    const url = urlData.getUrl();
    const dataFetched = await fetchData(url);
    const data = getWeatherDataFromFetch(dataFetched);
    return data;
  }

  function changeUnits() {
    urlData.units = unitToggle.checked ? 'imperial' : 'metric';
  }

  unitToggle.addEventListener('click', () => {
    changeUnits(urlData);
    getCurrentWeatherData();
  });
  return { getCurrentWeatherData, urlData };
})();

export default weather;
