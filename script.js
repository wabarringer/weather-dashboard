// REMEMBER: use '&units=imperial' to change units

var searchBtn = document.querySelector("#search-submit");
var clearBtn = document.querySelector("#clear-history");
var searchHistory = document.querySelector("#search-history");
var resultDisName = document.querySelector("#city-and-date");
var cardContainer = document.querySelector("#card-container");
var cityArray = [];
var currentDay = dayjs();
var currentDayFormat = currentDay.format("MM/DD/YYYY");
console.log(currentDay);

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  cardContainer.innerHTML = "";
  var city = document.querySelector("#search-input").value;
  var APIKey = "c863bf056289dd1738a1fb73f8b47dd5";
  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dailyResults(data);
      saveHistory(data);
      weatherIconResult(data);
      var lat = data.coord.lat;
      console.log(lat);
      var lon = data.coord.lon;
      var query5DayUrl =
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&cnt=5&appid=" +
        APIKey +
        "&units=imperial";
      fetch(query5DayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          render5Day(data);
        });
    });
});

// This function uses the fetched API data and fills in the city, humidity, wind speed and temp -------------
// TODO: include date
function dailyResults(data) {
  resultDisName.textContent = data.name + " " + currentDayFormat;
  var humidity = document.querySelector("#humidity");
  humidity.textContent = data.main.humidity + "%";
  var wind = document.querySelector("#wind");
  wind.textContent = data.wind.speed + "mph";
  var temp = document.querySelector("#temp");
  temp.textContent = data.main.temp + "°F";
}
// ------------------------------------------------------------------------------------------------------------

// Add weather icon
function weatherIconResult(data) {
  dataIcon = data.weather[0].icon;
  console.log(dataIcon);
  var iconPath = "http://openweathermap.org/img/wn/" + dataIcon + "@2x.png";
  var iconEl = document.createElement("img");
  iconEl.setAttribute("src", iconPath);
  iconEl.setAttribute("height", "50px");
  iconEl.setAttribute("width", "50px");
  iconEl.classList.add("icon");
  resultDisName.append(iconEl);
}

// TODO: Complete 5-day forecast
// This function adds the 5-day forecast data to the page
// TODO: problem with stacking on multiple searches without refreshing; need to do something to clear results at the start of the click event. *FIXED*
function render5Day(data) {
  for (var i = 0; i < 5; i++) {
    // PROBLEM: API lists 5-day data in 8 hour blocks for each day
    var dataDate5Day = currentDay.add(i + 1, "day").format("MM/DD/YYYY");
    var dataTemp5Day = data.list[i].main.temp;
    var dataWind5Day = data.list[i].wind.speed;
    var dataHumid5Day = data.list[i].main.humidity;
    var dataIcon5Day = data.list[i].weather[0].icon;
    var card5Day = document.createElement("div");
    var date5Day = document.createElement("div");
    date5Day.innerText = dataDate5Day;
    card5Day.append(date5Day);
    var iconPath5Day =
      "http://openweathermap.org/img/wn/" + dataIcon5Day + "@2x.png";
    var iconEl5Day = document.createElement("img");
    iconEl5Day.setAttribute("src", iconPath5Day);
    iconEl5Day.setAttribute("height", "50px");
    iconEl5Day.setAttribute("width", "50px");
    iconEl5Day.classList.add("icon-5day");
    card5Day.append(iconEl5Day);
    var temp5Day = document.createElement("div");
    temp5Day.innerHTML = "Temp: " + dataTemp5Day + "°F";
    card5Day.append(temp5Day);
    var wind5Day = document.createElement("div");
    wind5Day.innerHTML = "Wind: " + dataWind5Day + "mph";
    card5Day.append(wind5Day);
    var humid5Day = document.createElement("div");
    humid5Day.innerHTML = "Humidity: " + dataHumid5Day + "%";
    card5Day.append(humid5Day);
    card5Day.setAttribute("class", "five-day-cards");

    cardContainer.append(card5Day);
  }
}

// TODO: Use local storage to save search history-----------------------------------------------------------
// This function pushes data.name to the cityArray and save array to local storage
function saveHistory(data) {
  cityArray.push(data.name);
  console.log(cityArray);
  localStorage.setItem("Search History", JSON.stringify(cityArray));
  var rendHistory = document.createElement("li");
  rendHistory.innerHTML = data.name;
  searchHistory.appendChild(rendHistory);
}
// This function pulls from the array and append to the search history element
function getHistory() {
  for (var i = 0; i < cityArray.length; i++) {
    var rendHistory = document.createElement("li");
    rendHistory.setAttribute("data-index", i);
    rendHistory.innerHTML = cityArray[i];
    searchHistory.appendChild(rendHistory);
  }
}

// TODO: Function for clear history button
// PROBLEM: ClearBtn succesful at removing list once clicked and the list stays removed on reload, however once you click it new entries will no longer populate until you reload the
// FIXED: by copying part of the getHistory function into the saveHistory function, allowing to add directly to list upon searching; I feel like I may making WET code and will check for bugs
clearBtn.addEventListener("click", function (event) {
  event.preventDefault(event);
  localStorage.removeItem("Search History");
  searchHistory.innerHTML = "";
  cityArray = [];
});

// This function renders search history on page load
function init() {
  var storedCities = JSON.parse(localStorage.getItem("Search History"));
  if (storedCities !== null) {
    cityArray = storedCities;
  }
  getHistory();
}
init();
// ------------------------------------------------------------------------------------------------------------
