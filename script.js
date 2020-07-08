

console.log("test")
// ! Will need to get day from moment.js 

// buildQuery: simply get api + key and put their city in it 

//! Come back and check that the city is actually being added
function buildQuery(){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=7457011ce05981da5d6a41314151e8a0"

var city = $("#city").val().trim();
return queryURL + city + apiKey;
}


   
   
var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=7457011ce05981da5d6a41314151e8a0"
function updatePage(weatherData) {
    var i=0;
    var day = weatherData.response.list[i];

    var city = $("#city").val().trim();
 // !This also needs the date from moment js.
    var cityName = $("<h1>").text(city);
    $("#daily-forecast").append(cityName);

    var dailyTemp = 

}

var queryURL = buildQuery()
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })

function clear() {
        $("#weather-section").empty();
      }

$("#submit-city").on("click", function(event) {
       
        event.preventDefault();
      
        clear();
      
        // Build the query URL for the ajax request to the NYT API
        var queryURL = buildQueryURL();
      
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(updatePage);
      });

// update page: put new data into sections on the page
//clear page
//click event for search button - needs to add buttons below it with city name