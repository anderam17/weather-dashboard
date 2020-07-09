var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=7457011ce05981da5d6a41314151e8a0"

// ! Will need to get day from moment.js 



function buildQuery(){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=7457011ce05981da5d6a41314151e8a0&units=imperial"

var city = $("#city").val().trim();
return queryURL + city + apiKey;
}

// ! Will not append to page 
function updatePage(weatherData) {
    // var i=0;
    var day = weatherData.list[0];
    var location = weatherData.city;

    console.log(weatherData);

    var city = $("#city").val().trim();

 // !This also needs the date from moment js.

    var lat = location.coord.lat;
    var long = location.coord.lon;
  
    var card = $("<div class='card'>")
    var cardBody = $("<div class='card-body'>")
    
    $(cardBody).append(`<h1>${city}<img src='https://openweathermap.org/img/w/${day.weather[0].icon}.png'></img></h1>`);
    $(cardBody).append("<p>Temperature: " + day.main.temp + "F</p>");
    $(cardBody).append("<p>Humidity: " + day.main.humidity + "%</p>");
    $(cardBody).append("<p>Wind Speed: " + day.wind.speed + "MPH</p>");

    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=7457011ce05981da5d6a41314151e8a0"
    
    $.ajax({
        url: uvIndex,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var uv = response.daily[0].uvi;
        $(cardBody).append("<p>UV Index: " + uv + "</p>");
    })
    card.append(cardBody);
    $("#daily-forecast").append(card);
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

// update page: put new data into sections on the page
//clear page
//click event for search button - needs to add buttons below it with city name