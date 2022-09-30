function formatDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7b3a77a5c1a8ebaa302785b7cb6888c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7b3a77a5c1a8ebaa302785b7cb6888c7`;
  axios.get(apiUrl).then(showWeather);
}
function searchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let newCity = document.querySelector("#real-location");
  if (searchInput.value) {
    searchCity(searchInput.value);
  } else {
    newCity.innnerHTML = null;
    alert("Please type a city");
  }
  searchInput.value = "";
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentDegree = document.querySelector("#weather-number");
  currentDegree.innerHTML = temperature;
  let realLocation = document.querySelector("#real-location");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `humidity ${response.data.main.humidity}%`;
  realLocation.innerHTML = response.data.name;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `wind ${Math.round(response.data.wind.speed)}km/h`;
  let fullDate = document.querySelector("#real-date");
  fullDate.innerHTML = formatDate(response.data.dt * 1000);
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  let degreeSign = document.querySelector("#current-degree-sign");
  let degreeButton = document.querySelector("#change-degree-sign");
  degreeSign.innerHTML = "°C";
  degreeButton.innerHTML = "|°F";
}
function displayForecast() {
  let forecast = document.querySelector("#dayly-forecast");
  let forecastHTML = `<div class = "row">
  <div class="col-1"></div>`;
  let weekdays = ["Thur", "Fri", "Sat", "Sun", "Mon"];
  weekdays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <span class="week">${day}</span>
                <div class="day-forecast">
                  <img
                    src="http://openweathermap.org/img/wn/04n@2x.png"
                    alt=""
                  />
                  <span class="forecast-temp-min-max"> 15° 26°</span>
                </div>
              </div>`;
  });
  forecastHTML =
    forecastHTML +
    `<div class="col-1"></div>
              </div>`;
  forecast.innerHTML = forecastHTML;
}
//current location button
function currentWeather(position) {
  console.log(position.coords.latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=7b3a77a5c1a8ebaa302785b7cb6888c7`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentWeather);
}

function changeSign() {
  let previousSign = document.querySelector("#current-degree-sign");
  let newSign = document.querySelector("#change-degree-sign");
  let weatherNumber = document.querySelector("#weather-number");
  if (previousSign.innerHTML === "°C") {
    previousSign.innerHTML = "°F";
    weatherNumber.innerHTML = Math.round(
      (weatherNumber.innerHTML * 9) / 5 + 32
    );
    newSign.innerHTML = "|°C";
  } else {
    previousSign.innerHTML = "°C";
    weatherNumber.innerHTML = Math.round(
      ((weatherNumber.innerHTML - 32) * 5) / 9
    );
    newSign.innerHTML = "|°F";
  }
}

searchCity("New York");
displayForecast();
let currentLocationButton = document.querySelector("#device-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

//city search engine
let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", searchButton);

//change degree signs
let changeSignButton = document.querySelector("#change-degree-sign");
changeSignButton.addEventListener("click", changeSign);
