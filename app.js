const apiKey = "b09f19893a914134b6e114730202012";
var currCityName;

let main3 = document.querySelector(".main3");

let main = document.querySelector(".main");

var pattern = "/^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]+){0,1}$/";

function isNumeric(string) {
    for (let i = 0; i < pattern.length; i++) {
        if (string.indexOf(pattern[i]) > -1)
            return true;
    }
    return false;
}


var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
function checkForSpecialChar(string) {
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true;
        }
    }
    return false;
}

let userinput = document.getElementById('userinput');

let submitInput = document.querySelector('.submitfirst');

submitInput.addEventListener('click', submitCity);

function submitCity() {

    let val = userinput.value;

    if(val == "") alert(`City name can not be empty!!`);
    else if (isNumeric(val) || checkForSpecialChar(val)) {
        alert(`${val} is invalid city name!!`);
    } else {
        main3.style.display = "none";
        main.style.display = "block";
        apiCall(val);
    }
}





let apiUsingCity = document.querySelector('.apiUsingCity');
apiUsingCity.innerText = currCityName;

let weather = document.querySelector('.weather');

let temperature = document.querySelector('.temperature');

let humidity = document.getElementById('humidity');

let windSpeed = document.getElementById('windSpeed');

let detail2 = document.querySelector('.detail2');

let detail3 = document.querySelector('.detail3');

let nextDate = document.querySelector('.nw');

let nextnextDate = document.querySelector('.nw1');

let weatherReqImg = document.getElementById('weatherReqImg');

let weatherReqImg1 = document.getElementById('weatherReqImg1');

let weatherReqImg3 = document.getElementById('weatherReqImg3');

let inputcityName = document.getElementById('cityName');

let search1 = document.getElementById('search1');

let sunrisedata = document.getElementById('sunrisedata');

let sunsetdata = document.getElementById('sunsetdata');

let in1 = document.querySelector(".in1");

var Regex = /^[^a-zA-Z]*$/;

search1.addEventListener('click', searchWeather1);

function searchWeather1() {

    let cityName = in1.value;

    console.log(cityName);

    if (cityName === "") {
        alert("City name can not be empty!!");
    } else {
        apiCall(cityName);
    }
}

// console.log(cityName);

function apiCall(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14`).then((jsonData) => {
        console.log(jsonData);
        return jsonData.json();
    }).then((actualData) => {
        console.log(actualData);
        let humid = actualData.current.humidity;
        let windspeed = actualData.current.wind_kph;
        let temp = actualData.current.temp_c;
        humidity.innerText = `${humid}%`;
        windSpeed.innerText = `${windspeed}kmp`;
        temperature.innerText = `${temp}°C`;

        sunrisedata.innerText = actualData.forecast.forecastday[0].astro.sunrise;
        sunsetdata.innerText = actualData.forecast.forecastday[0].astro.sunset;

        apiUsingCity.innerText = city;
        for (let i = 0; i < 24; i++) {
            let detail = actualData.forecast.forecastday[0].hour[i];
            let h = `0${i}:00`;
            if (i > 9) h = `${i}:00`;
            document.getElementById(`day${i + 1}`).innerHTML = h;

            let temp = detail.temp_c;

            document.getElementById(`det${i + 1}`).innerHTML = `${temp}°C`;

            let condition = detail.condition.icon;

            document.getElementById(`imgwea${i + 1}`).src = condition;

            let imgWeather = actualData.current.condition.text;


            let imgLink;

            if (imgWeather == "Clear") imgLink = `img/Clear.png`;
            else if (imgWeather == "Cloudy") imgLink = `img/Cloudy.png`;
            else if (imgWeather == "Rain") imgLink = `img/Rain.png`;
            else if (imgWeather == "Storm") imgLink = `img/Storm.png`;
            else if (imgWeather == "Sunny") imgLink = `img/Sunny.png`;
            else if (imgWeather == "Mist") imgLink = `img/Mist.png`;
            else if (imgWeather == "Fog") imgLink = `img/Fog.png`;
            else if (imgWeather == "Partly cloudy") imgLink = `img/Partly cloudy.png`;
            else imgLink = `img/unknown.png`;


            weatherReqImg.src = imgLink;
            weatherReqImg1.src = imgLink;
            weatherReqImg3.src = imgLink;

            let nextDay = actualData.forecast.forecastday[1].hour[i];

            let imgData = nextDay.condition.text;

            let k;
            if (imgData == "Clear") {
                k = `img/6.png`;
            } else if (imgData == "Partly cloudy") {
                k = `img/5.png`;
            } else if (imgData == "Cloudy") {
                k = `img/5.png`;
            } else if (imgData == "Rain") {
                k = `img/5.png`;
            } else if (imgData == "Sunny") {
                k = `img/3.png`;
            } else {
                k = `img/1.png`;
            }



            let nextDATE = nextDay.time;

            nextDATE = nextDATE.substring(0, nextDATE.indexOf(" "));

            nextDate.innerText = nextDATE;



            detail2.innerHTML += `<div class="nextweek day8">
            <p class="day">${nextDay.humidity}%</p>
            <p class="maxtemp">${nextDay.temp_c}°C</p>
            <p class="mintemp">${nextDay.wind_kph}kmph</p>
            <p class="weathertype"><img src="${k}" alt=""></p>
            </div>`;



            let nextnextDay = actualData.forecast.forecastday[2].hour[i];

            let imgData1 = nextDay.condition.text;
            let k1;
            if (imgData1 == "Clear") {
                k1 = `img/1.png`;
            } else if (imgData1 == "Partly Cloudy") {
                k1 = `img/2.png`;
            } else if (imgData1 == "Cloudy") {
                k1 = `img/3.png`;
            } else if (imgData1 == "Rain") {
                k1 = `img/4.png`;
            } else if (imgData1 == "Sunny") {
                k1 = `img/5.png`;
            } else {
                k1 = `img/6.png`;
            }

            let nextnextDATE = nextnextDay.time;

            nextnextDATE = nextnextDATE.substring(0, nextnextDATE.indexOf(" "));

            nextnextDate.innerText = nextnextDATE;

            detail3.innerHTML += `<div class="nextweek day8">
            <p class="day">${nextnextDay.humidity}%</p>
            <p class="maxtemp">${nextnextDay.temp_c}°C</p>
            <p class="mintemp">${nextnextDay.wind_kph}kmph</p>
            <p class="weathertype"><img src="${k1}" alt=""></p>
            </div>`;

        }
    }).catch((err) => {
        console.log(err);
        alert("Please enter a valid City Name");
        // location.reload();
    });
}


nextDate.addEventListener('click', () => {
    detail3.style.display = "none";
    detail2.style.display = "block";
    nextDate.style.borderBottom = "1px solid white";
    nextnextDate.style.borderBottom = "none";
})


nextnextDate.addEventListener('click', () => {
    detail2.style.display = "none";
    detail3.style.display = "block";
    nextnextDate.style.borderBottom = "1px solid white";
    nextDate.style.borderBottom = "none";
})