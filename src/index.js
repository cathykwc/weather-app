function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp); 
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "145ee08408729673b53d671c97d81b6d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
 searchCity(city);
}

function searchLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let units = "metric";
  let apiKey = "145ee08408729673b53d671c97d81b6d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);  
}

//function convertToCelsius(event) {
  //event.preventDefault();
  //let temperatureElement = document.querySelector("#current-temperature");
  //temperatureElement.innerHTML = 9;
//}
//function convertToFarhenheit(event) {
 // event.preventDefault();
  //let temperatureElement = document.querySelector("#current-temperature");
  //temperatureElement.innerHTML = 48;
//}

let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Vancouver"); //searches Vancouver on load 
//let celsiusLink = document.querySelector("#c-link");
//celsiusLink.addEventListener("click", convertToCelsius);
//let fahrenheitLink = document.querySelector("#f-link");
//fahrenheitLink.addEventListener("click", convertToFarhenheit);



