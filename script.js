//Блок контроля
const renovate = document.querySelector('.btn_renovate');


let time;
let timer;
let hip = '2';

let hour = 0;
let minutes = 0;
let sec = 0;

let s = 0;
let m = 0;
let h = 0;

// let first_c 
//     let first_f
//     let second_c
//     let second_f
//     let third_c
//     let third_f
//     let first_condit
//     let second_condit
//     let third_condit

window.addEventListener('load', () => {
    // getLinkToImage();
    timeBackground();
    getDateEN(date);
    timer = setInterval(liveTime, 1000);
})

renovate.addEventListener('click', () => {
    getLinkToImage();
})

function getLinkToImage () {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=kEMMOHYjWKMGEGObyhH1PWLb_Qmg-27Nfm_Dxnlo5lE';
    fetch(url)
   .then(res => res.json())
   .then(data => {
    changeBackground(data.urls.regular)
    console.log(data)
   });
}

function changeBackground(data) {
    document.querySelector('body').style.backgroundImage = `url(${data})`;
}

function timeBackground () {
    time = setInterval(getLinkToImage, 3600000);
}

// function getWeather () {
//     const url = 'https://ipinfo.io/json?token=04b21bb6bb2be7';
//     fetch(url)
//     .then(res => {
//         console.log(res)
//     })
// }

// getWeather ()



// var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };
  
//   function success(pos) {
//     var crd = pos.coords;
  
//     console.log('Ваше текущее местоположение:');
//     console.log(`Широта: ${crd.latitude}`);
//     console.log(`Долгота: ${crd.longitude}`);
//     console.log(`Плюс-минус ${crd.accuracy} метров.`);
//   };
  
//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   };
  
//   navigator.geolocation.getCurrentPosition(success, error, options);



let date = new Date();

function getDateEN (date) {
    let daysNow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let daysNext = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let showDaysNow = daysNow[date.getDay()];
    let showDaysNext1 = daysNext[date.getDay() + 1];
    let showDaysNext2 = daysNext[date.getDay() + 2];
    let showDaysNext3 = daysNext[date.getDay() + 3];
    let day = date.getDate();
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
    let showMonth = month[date.getMonth()];

    hour = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    sec = date.getSeconds();

    document.querySelector('.today').innerHTML = `
    <span>${showDaysNow} ${day} ${showMonth} <span class="today_time">${hour}:${minutes}</span></span>`;

    document.querySelector('.dayfirst').innerHTML = showDaysNext1;
    document.querySelector('.daysecond').innerHTML = showDaysNext2;
    document.querySelector('.daythird').innerHTML = showDaysNext3;
}

function liveTime () {
    hour = hour - 0;
    minutes = minutes - 0;
    sec++
    if (sec > 59) {
        minutes++;
        sec = 0;
    }
    if (minutes > 59) {
        hour++;
        minutes = 0;
    }

    //    s = sec < 10 ? "0" + sec : sec;
       m = minutes < 10 ? "0" + minutes : minutes;
       h = hour < 10 ? "0" + hour : hour;

       document.querySelector('.today_time').textContent = `${h}:${m}`;
}

let city = 'Minsk';

function getWeather () {
    const urlf = `https://api.weatherapi.com/v1/forecast.json?key=3e22dd5dd5674b83bdb145823231305&q=${city}&days=4`;
    fetch(urlf)
    .then(res => res.json())
    .then(data => {
        getWeatherToday (data.forecast.forecastday[0]);
        getWeatherNext (data.forecast.forecastday);
        // getLocation (data.location)
        // console.log(data.forecast.forecastday[0]);
    })
}

function getWeatherToday (data) {
    hour = hour - 0;
    let temp_c = data.hour[hour].temp_c;
    let temp_f = data.hour[hour].temp_f;
    let condition = data.hour[hour].condition.text;
    let feelslike_c = data.hour[hour].feelslike_c;
    let feelslike_f = data.hour[hour].feelslike_f;
    let wind = data.hour[hour].wind_kph;
    let humidity = data.hour[hour].humidity;

    document.querySelector('.weather_today_degrees').textContent = temp_c;
    document.querySelector('.weather_today_details').innerHTML = `
    <p>${condition}</p>
    <p>Feels like: ${feelslike_c}°</p>
    <p>Wind: ${wind} <span>km/s</span></p>
    <p>Humidity: ${humidity}%</p>`;
    console.log(hour);
}

function getWeatherNext (data) {
    let first_c = data[1].day.avgtemp_c;
    let first_f = data[1].day.avgtemp_f;
    let second_c = data[2].day.avgtemp_c;
    let second_f = data[2].day.avgtemp_f;
    let third_c = data[3].day.avgtemp_c;
    let third_f = data[3].day.avgtemp_f;
    let first_condit = data[1].day.condition.text;
    let second_condit = data[2].day.condition.text;
    let third_condit = data[3].day.condition.text;

    document.getElementById('dayfirst').innerHTML = `
    <span>${first_c}°</span>
    <img src="./image/Group1.svg" alt="weather">`;
    document.getElementById('daysecond').innerHTML = `
    <span>${second_c}°</span>
    <img src="./image/Group2.svg" alt="weather">`;
    document.getElementById('daythird').innerHTML = `
    <span>${third_c}°</span>
    <img src="./image/Group3.svg" alt="weather">`;
}

function getLocation (data) {
    let city = data.name;
    let country = data.country;
    let lat = data.lat;
    let lon = data.lon;
}

getWeather ()