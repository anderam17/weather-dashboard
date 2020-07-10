
//builds the API key URL's based on the city entered by the user
function buildQuery(city){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=7457011ce05981da5d6a41314151e8a0&units=imperial"
return queryURL + city + apiKey;
}

//takes in weather data for the chosen city and appends daily weather and weekly forecast.
function updatePage(weatherData) {
    //variables of the day's weather data, the city name, and locations
    var day = weatherData.list[0];
    var city = $("#city").val().trim();
    var location = weatherData.city;

    var card = $("<div class='card'>")
    var cardBody = $("<div class='card-body'>")
    var currentDay = new moment().format('M/D/YYYY');
      
    $(cardBody).append(`<h1>${city} ${currentDay}<img src='https://openweathermap.org/img/w/${day.weather[0].icon}.png'></img></h1>`);
    $(cardBody).append("<p>Temperature: " + day.main.temp + "F</p>");
    $(cardBody).append("<p>Humidity: " + day.main.humidity + "%</p>");
    $(cardBody).append("<p>Wind Speed: " + day.wind.speed + "MPH</p>");
    
    card.append(cardBody);
    $("#daily-forecast").append(card);
    
    var lat = location.coord.lat;
    var long = location.coord.lon;
    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=7457011ce05981da5d6a41314151e8a0"
    
    $.ajax({
        url: uvIndex,
        method: "GET"
    }).then(function(response){
        var uv = response.daily[0].uvi;
        $(cardBody).append("<p>UV Index: " + uv + "</p>");
    })

    weeklyForecast(weatherData);
}

function weeklyForecast(weatherData){
    
  for(var i=1; i<=5; i++){

    var day = weatherData.list[i];
  
      var card2 = $("<div class='card' id='weekly'>")
      var cardBody2 = $("<div class='card-body'>")
      var DaysForward = new moment().add(i, 'day');
      
      $(cardBody2).append("<strong>" + DaysForward.format('M/D/YYYY') + "</strong>");
      $(cardBody2).append(`<img src='https://openweathermap.org/img/w/${day.weather[0].icon}.png'></img>`)
      $(cardBody2).append("<p>Temperature: " + day.main.temp + "F</p>");
      $(cardBody2).append("<p>Humidity: " + day.main.humidity + "%</p>");
  
    card2.append(cardBody2);
    $("#weekly-forecast").append(card2)
  }
  
}

function clear() {
        $("#daily-forecast").empty();
        $("#weekly-forecast").empty();
      }

$("#submit-city").on("click", function(event) {
       
        event.preventDefault();
      
        clear();
        var city = $("#city").val().trim();

        var previousCity = $("<li class='list-group-item' id='old-city'>").text(city);
        $("#previous-searches").prepend(previousCity);

        // Build the query URL for the ajax request to the NYT API
        var queryURL = buildQuery(city);
      
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(updatePage)
        ;
      });
