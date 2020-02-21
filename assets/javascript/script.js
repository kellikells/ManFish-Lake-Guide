
const zipcodeForecastAPIkey = "7c503c0e58d64fcc85af4093549c4a07";
let zipcode = 0;
let apiCall;


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

//=======================================================
//            2 day forecast by zipcode
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
        $('.current-temperature__icon').attr('src', "https://www.weatherbit.io/static/img/icons/" + forecastArray[0].weather.icon + ".png");
        $('.tomorrow-temperature__icon').attr('src', "https://www.weatherbit.io/static/img/icons/" + forecastArray[0].weather.icon + ".png");
    });
}

// function for submit user input
$("#weatherSubmit").on("click", function (event) {
    event.preventDefault();
    submitForecast();
});


// ======================================================================
//                      image weather:
// ======================================================================

const zipcodeAPIkey = "4d6325b46142f4a1f02bbd88590a9736";
let imageZipcode = 0;
let clickedImage;

$(".lake").on("click", function () {

    // ---- put selected lake: lake name to DOM --------
    clickedImage = $("#lakeName").text(this.name);
    console.log(clickedImage);

    // getting the value from html 
    imageZipcode = parseInt(this.value);
    console.log(imageZipcode);

    // putting zipcode into url for function getApiCallObj();
    // parameter units=imperial (F) | =metric (C) | default returns Kelvin
    let zipCodeURL =
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
        imageZipcode +
        ",us&units=imperial&appid=" +
        zipcodeAPIkey;

    getApiCallObj(zipCodeURL);

    $.ajax(apiCall).then(function (response) {
        console.log(response);

        // -----  attaching response data to HTML --------
        let temperature = $("#zipCodeTemperature").text(response.main.temp);
        let description = $("#zipCodeDescription").text(
            response.weather[0].main);
        // $('.lake-temperature__icon').attr('src', "https://www.weatherbit.io/static/img/icons/" + $(this).response.data.weather[0].icon + ".png");
        console.log(temperature);
        console.log(description);
    });
});