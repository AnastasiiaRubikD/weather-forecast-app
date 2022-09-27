function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);

  let newCity = document.querySelector("#real-location");
  if (searchInput.value) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=7b3a77a5c1a8ebaa302785b7cb6888c7`;
    axios.get(apiUrl).then(showWeather);
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
let apiKey = "7b3a77a5c1a8ebaa302785b7cb6888c7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=7b3a77a5c1a8ebaa302785b7cb6888c7`;
axios.get(apiUrl).then(showWeather);

let currentLocationButton = document.querySelector("#device-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
//date and time
let fullDate = document.querySelector("#real-date");
let time = document.querySelector("#real-time");

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

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

fullDate.innerHTML = `${day}, ${date} ${month} ${hours}:${minutes}`;

//city search engine
let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", searchCity);

//change degree signs
let changeSignButton = document.querySelector("#change-degree-sign");
changeSignButton.addEventListener("click", changeSign);
