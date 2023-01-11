//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var APIKey = "8ad70e74572f664ca155cb48d464c8e4";

// var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

var queryUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=ad70e74572f664ca155cb48d464c8e4";

var city = document.querySelector("#search-input").value;

fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
