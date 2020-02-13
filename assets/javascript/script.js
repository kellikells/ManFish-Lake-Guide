
const zipcodeForecastAPIkey = "7c503c0e58d64fcc85af4093549c4a07";
let zipcode = 0;
let apiCall;    // === repeated: delete when merge




// function that returns an object "apiCall" 
// give it a url that incorporates user's input zipcode
//==== repeated : delete when merge 
function getApiCallObj(url) {
    apiCall = {
        url: url,
        method: "GET"
    };
    return apiCall;    // this is the object we give ajax 
}

//                 2 day forecast by zipcode
//=======================================================
function submitForecast() {
    zipcode = parseInt($("#zipCodeInput").val().trim());
    console.log(zipcode);

    let forecastArray;

    let today;
    let description;
    let maxTemp;
    let minTemp;

    let fcDate;
    let fcDescription;
    let fcMaxTemp;
    let fcMinTemp;

    let zipCodeForecastURL = "https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=" + zipcode + "&units=I&days=2&key=" + zipcodeForecastAPIkey;

    getApiCallObj(zipCodeForecastURL);
    console.log(zipCodeForecastURL);

    $.ajax(apiCall).then(function (result) {
        console.log(result);

        forecastArray = result.data;
        console.log(forecastArray);

        // --- TODAY: data for html ---
        today = forecastArray[0].valid_date;
        description = forecastArray[0].weather.description;
        maxTemp = forecastArray[0].app_max_temp;
        minTemp = forecastArray[0].app_min_temp;
        console.log(today, description, maxTemp, minTemp);

        // --- FORECAST (tomorrow): data for html ---
        fcDate = forecastArray[1].valid_date;
        fcDescription = forecastArray[1].weather.description;
        fcMaxTemp = forecastArray[1].app_max_temp;
        fcMinTemp = forecastArray[1].app_min_temp;

        console.log(fcDate, fcDescription, fcMaxTemp, fcMinTemp);

        // --- transfer data to HTML ---
        $("#description").text(description);
        $("#fcDescription").text(fcDescription);
        $("#maxTemp").text(maxTemp);
        $("#fcMaxTemp").text(fcMaxTemp);
        $("#minTemp").text(minTemp);
        $("#fcMinTemp").text(fcMinTemp);
    });
}


// function for submit user input
$("#weatherSubmit").on("click", function (event) {
    event.preventDefault();
    submitForecast();
});


