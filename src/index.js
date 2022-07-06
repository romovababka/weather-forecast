//const axios = require("axios").default;
let form = document.querySelector("form");
form.addEventListener("submit", getTemp);


let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", getTemp)

function getTemp (event) {
    event.preventDefault();
    let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
    let units = "Metric";
    let city = document.querySelector("#search-text-input");
    let cityLower = city.value.toLowerCase();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLower}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response){
    let celsius = document.querySelector("#temperature-number");
    let realCel = response.data.main.temp;
    celsius.innerHTML = `${Math.round(realCel)}`;
    let clickFar = document.querySelector("#farenhait");
    clickFar.addEventListener("click", function (){
        let showFar = document.getElementById("temperature-number");
        showFar.innerHTML = `${Math.round(realCel * 9 / 5 + 32)}`
    });
    let clickCel = document.querySelector("#celsius");
    clickCel.addEventListener("click", function (){
        //let showCel = document.getElementById()
        document.getElementById("temperature-number").innerHTML = `${Math.round(realCel)}`;
    })
    let windNum  = document.querySelector("#wind");
    windNum.innerHTML = `${response.data.wind.speed}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;
    //let weatherText = document.querySelector("#text-weather-descriptoin");
    //weatherText.innerHTML = `${response.data.weather[0].description}`;

    let showCityOnPage = document.getElementById("show-city");
    showCityOnPage.innerHTML = `${response.data.name}, ${response.data.sys.country}`

    let weatherText = document.querySelector("#text-weather-descriptoin");
    weatherText.innerHTML = `${response.data.weather[0].description}`;

    let dateText = document.getElementById("show-date");
    dateText.innerText = "";

    let icon = document.querySelector(".weather-icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}


let geoButton = document.getElementById("location-button");
geoButton.addEventListener("click", getCurrentPosition);



function geolocation(position) {
    let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showTempGeo);
    formatDate(currentTime);
    //let input = document.getElementById ("search-text-input");
    //input.placeholder = "Your geolocation";
}


function showTempGeo(response){
    let celsius = document.querySelector("#temperature-number");
    let realCel = response.data.main.temp;
    celsius.innerHTML = `${Math.round(realCel)}`;
    let clickFar = document.querySelector("#farenhait");
    clickFar.addEventListener("click", function (){
        let showFar = document.getElementById("temperature-number");
        showFar.innerHTML = `${Math.round(realCel * 9 / 5 + 32)}`
    });
    let clickCel = document.querySelector("#celsius");
    clickCel.addEventListener("click", function (){
        //let showCel = document.getElementById()
        document.getElementById("temperature-number").innerHTML = `${Math.round(realCel)}`;
    })
    let windNum  = document.querySelector("#wind");
    windNum.innerHTML = `${response.data.wind.speed}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;

    let showCityOnPage = document.getElementById("show-city");
    showCityOnPage.innerHTML = `${response.data.name}, ${response.data.sys.country}`

    let weatherText = document.querySelector("#text-weather-descriptoin");
    weatherText.innerHTML = `${response.data.weather[0].description}`;

    let input = document.getElementById ("search-text-input");
    input.placeholder = "Your geolocation";

    document.getElementById("search-text-input").value="";
    document.getElementById("search-text-input").placeholder= `${response.data.name}`;

    let icon = document.querySelector(".weather-icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}


function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(geolocation);
}

let currentTime = new Date();

function formatDate() {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentDay = days[currentTime.getDay()];

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let current = document.querySelector("#show-date");
    if (hours < 10 && minutes < 10) {
        current.innerHTML = `${currentDay} 0${hours}:0${minutes}`;
    } else if (hours >= 10 && minutes < 10) {
        current.innerHTML = `${currentDay} ${hours}:0${minutes}`;
    } else if (hours < 10 && minutes >= 10) {
        current.innerHTML = `${currentDay} 0${hours}:${minutes}`;
    } else {
        current.innerHTML = `${currentDay} ${hours}:${minutes}`;
    }

}