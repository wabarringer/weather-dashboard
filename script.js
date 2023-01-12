// REMEMBER: use '&units=imperial' to change units

var searchBtn = document.querySelector("#search-submit");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
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
      var resultDisName = document.querySelector("#city-and-date");
      resultDisName.textContent = data.name;
      var humidity = document.querySelector("#humidity");
      humidity.textContent = data.main.humidity;
      var wind = document.querySelector("#wind");
      wind.textContent = data.wind.speed;
      var temp = document.querySelector("#temp");
      temp.textContent = data.main.temp;
      var searchHistory = document.querySelector("#search-history");
      var rendHistory = document.createElement("li");
      rendHistory.textContent = data.name;
      searchHistory.appendChild(rendHistory);
    });
});

// TODO: Complete 5-day forecast
// TODO: Use local storage to save search history
