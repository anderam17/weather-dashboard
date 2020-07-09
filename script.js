var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=7457011ce05981da5d6a41314151e8a0"


function buildQuery(){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=7457011ce05981da5d6a41314151e8a0&units=imperial"

var city = $("#city").val().trim();
return queryURL + city + apiKey;
}

function updatePage(weatherData) {
    var day = weatherData.list[0];
    var city = $("#city").val().trim();
    var location = weatherData.city;
    console.log(weatherData);
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
      
      $(cardBody2).append(DaysForward.format('M/D/YYYY'));
      $(cardBody2).append(`<img src='https://openweathermap.org/img/w/${day.weather[0].icon}.png'></img>`)
      $(cardBody2).append("<p>Temperature: " + day.main.temp + "F</p>");
      $(cardBody2).append("<p>Humidity: " + day.main.humidity + "%</p>");
  
    card2.append(cardBody2);
    $("#weekly-forecast").append(card2)
  }
  
}



function clear() {
        $("#weather-section").empty();
      }

//! Also need to save what you did 
$("#submit-city").on("click", function(event) {
       
        event.preventDefault();
      
        clear();
      
        // Build the query URL for the ajax request to the NYT API
        var queryURL = buildQuery();
      
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(updatePage)
        ;
      });


//! Need to have list of recently searched cities
//! Need to build out weekly forecast
//! Need to make sure that previous city goes away
// update page: put new data into sections on the page
//clear page
//click event for search button - needs to add buttons below it with city name