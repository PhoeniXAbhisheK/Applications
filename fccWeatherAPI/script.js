const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const place = document.querySelector('.place');



const getDate = () => {
  const date = new Date();
  return `${date.getHours() }:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
}

getWeather = () => {
  // console.log('inside getWeather', getDate());
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((data) => {

      console.log('inside getCurrentPosition', getDate());
      const latitude = data.coords.latitude,
        longitude = data.coords.longitude,
        url = "http://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

      $.getJSON(url, function(data) {

        place.textContent = `${data.name}, ${data.sys.country}`;
        weather.textContent = `${data.main.temp} with ${data.weather[0].main}`;
        weatherIcon.innerHTML = `<img src="${data.weather[0].icon}" alt="${data.weather[0].description}"/>`;
      });
    });

  } else {
    weather.textContent = 'You need to give access to location for this to work';
  }
}
getWeather();