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

let city = 'Moscow'

function getWeather () {
    const urlf = `https://api.weatherapi.com/v1/forecast.json?key=3e22dd5dd5674b83bdb145823231305&q=${city}&days=4`;
    fetch(urlf)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}



// let date = new Date();
// function getWeekDay(date) {
//     let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
//     console.log(days[date.getDay() + 1]);
//   }
  
//   let timerId = setInterval(() => getWeekDay(date), 2000);

// let now = new Date()
// console.log(now)


// getWeather ()

// let today = new Date;

// console.log(today.getDay())



// function getWeatherToday () {

// }

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
    <span>${showDaysNow} ${day} ${showMonth} <span class="today_time">${hour}:${minutes}:${sec}</span></span>`;

    document.querySelector('.dayfirst').innerHTML = showDaysNext1;
    document.querySelector('.daysecond').innerHTML = showDaysNext2;
    document.querySelector('.daythird').innerHTML = showDaysNext3;
}

function liveTime () {
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

       s = sec < 10 ? "0" + sec : sec;
       m = minutes < 10 ? "0" + minutes : minutes;
       h = hour < 10 ? "0" + hour : hour;

       document.querySelector('.today_time').textContent = `${h}:${m}:${s}`;
       console.log(m)
}