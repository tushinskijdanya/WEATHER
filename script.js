//Блок контроля
const renovate = document.querySelector('.btn_renovate');
const degress = document.querySelector('.temperature_buttons');

const selectBTN = document.querySelector('.btn_language');

let time;
let timer;

let daysNow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let daysNext = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let daysNowRU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let daysNextRU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let showDaysNow;
let showDaysNext1;
let showDaysNext2;
let showDaysNext3;
let showDaysNowRU;
let showDaysNext1RU;
let showDaysNext2RU;
let showDaysNext3RU;
let day;
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
let monthRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'];

let showMonth;
let showMonthRU;

let hour = 0;
let minutes = 0;
let sec = 0;

let s = 0;
let m = 0;
let h = 0;

let temp_c;
let temp_f;
let condition;
let conditionImg;
let feelslike_c;
let feelslike_f;
let wind;
let humidity;

let first_c; 
let first_f;
let second_c;
let second_f;
let third_c;
let third_f;
let first_conditImg;
let second_conditImg;
let third_conditImg;

let place;

let languageEN = true;
const allLang = ['en', 'ru'];

let tempF = false;

let weathLang = 'lang=en';

window.addEventListener('load', () => {
    // getLinkToImage();
    timeBackground();
    getDate(date);
    timer = setInterval(liveTime, 1000);
})

renovate.addEventListener('click', () => {
    getLinkToImage();
})

degress.addEventListener('click', (e) => {
    e.preventDefault();
    switch(e.target.textContent) {
        case '°F':
            languageEN ? getTempF() : getTempFRu ();
            tempF = true;
        break
        case '°С':
            languageEN ? getTempC () : getTempCRu ();
            tempF = false;
        break
    }
    console.log(e.target.textContent)
})

selectBTN.addEventListener ('change', changeLangURL);

function changeLangURL () {
    let lang = selectBTN.value;
    location.href = `${location.pathname}#${lang}`;
    if (lang == 'ru') {
        tempF ? getTempFRu () : getTempCRu ();
        weathLang = 'lang=ru';
        getWeather (place);
        languageEN = false;
        getDate (date);
        mainPage ();
    } else if (lang == 'en') {
        tempF ? getTempF () : getTempC ();
        weathLang = 'lang=en';
        getWeather (place);
        languageEN = true;
        getDate (date);
        mainPage ();
    }

    // location.reload();
}

function changeLang () {
    let hash = location.hash;
    hash = hash.substr(1);
    selectBTN.value = hash;

    if (hash == 'ru') {
        languageEN = false;
        weathLang = 'lang=ru';
    } else if (hash == 'en') {
        languageEN = true;
        weathLang = 'lang=en';
    }
    
    if (!allLang.includes(hash)) {
        location.href = `${location.pathname}#en`;
        weathLang = 'lang=en';
        languageEN = true;
    }
    console.log(hash);
}

changeLang ()

function mainPage () {
    if (languageEN) {
        document.querySelector('title').innerHTML = 'Weather';
        document.querySelector('input').placeholder = 'Search city or ZIP';
        document.querySelector('.btn_search').innerHTML = 'SEARCH';
    } else {
        document.querySelector('title').innerHTML = 'Погода';
        document.querySelector('input').placeholder = 'Поиск города или ZIP';
        document.querySelector('.btn_search').innerHTML = 'ПОИСК';
    }
}

mainPage ()

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

function getPlace () {
    const url = 'https://ipinfo.io/json?token=04b21bb6bb2be7';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        getWeather (data.loc)
        console.log(data)
    })
}


let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let crd = pos.coords;

    let lat = crd.latitude;
    let long = crd.longitude;

    place = `${crd.latitude},${crd.longitude}`;

    getWeather (place)
  };
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);



let date = new Date();

function getDate (date) {
    showDaysNow = daysNow[date.getDay()];
    showDaysNext1 = daysNext[date.getDay() + 1];
    showDaysNext2 = daysNext[date.getDay() + 2];
    showDaysNext3 = daysNext[date.getDay() + 3];
    showDaysNowRU = daysNowRU[date.getDay()];
    showDaysNext1RU = daysNextRU[date.getDay() + 1];
    showDaysNext2RU = daysNextRU[date.getDay() + 2];
    showDaysNext3RU = daysNextRU[date.getDay() + 3];
    day = date.getDate();

    showMonth = month[date.getMonth()];
    showMonthRU = monthRU[date.getMonth()];

    hour = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    sec = date.getSeconds();

    languageEN ? getDateEn () : getDateRu ();
}

function getDateRu () {
    document.querySelector('.today').innerHTML = `
    <span>${showDaysNowRU} ${day} ${showMonthRU} <span class="today_time">${hour}:${minutes}</span></span>`;

    document.querySelector('.dayfirst').innerHTML = showDaysNext1RU;
    document.querySelector('.daysecond').innerHTML = showDaysNext2RU;
    document.querySelector('.daythird').innerHTML = showDaysNext3RU;
}

function getDateEn () {
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

// let place = 'Gomel';

function getWeather (place) {
    const urlf = `https://api.weatherapi.com/v1/forecast.json?key=3e22dd5dd5674b83bdb145823231305&q=${place}&days=4&${weathLang}`;
    fetch(urlf)
    .then(res => res.json())
    .then(data => {
        getWeatherToday (data.forecast.forecastday[0]);
        getWeatherNext (data.forecast.forecastday);
        getLocation (data.location);
        console.log(data);
    })
    console.log(place)
}

function getWeatherToday (data) {
    hour = hour - 0;
    temp_c = data.hour[hour].temp_c;
    temp_f = data.hour[hour].temp_f;
    condition = data.hour[hour].condition.text;
    conditionImg = data.hour[hour].condition.icon;
    feelslike_c = data.hour[hour].feelslike_c;
    feelslike_f = data.hour[hour].feelslike_f;
    wind = data.hour[hour].wind_kph;
    humidity = data.hour[hour].humidity;

    document.querySelector('.weather_today_degrees_elements').innerHTML = `
    <img src="https:${conditionImg}" alt="weather">
    <p>°</p>`;
}

function getWeatherNext (data) {
    first_c = data[1].day.avgtemp_c;
    first_f = data[1].day.avgtemp_f;
    second_c = data[2].day.avgtemp_c;
    second_f = data[2].day.avgtemp_f;
    third_c = data[3].day.avgtemp_c;
    third_f = data[3].day.avgtemp_f;
    first_conditImg = data[1].day.condition.icon;
    second_conditImg = data[2].day.condition.icon;
    third_conditImg = data[3].day.condition.icon;

    document.getElementById('dayfirst').innerHTML = `
    <span>${first_c}°</span>
    <img src="https:${first_conditImg}">`;
    document.getElementById('daysecond').innerHTML = `
    <span>${second_c}°</span>
    <img src="https:${second_conditImg}">`;
    document.getElementById('daythird').innerHTML = `
    <span>${third_c}°</span>
    <img src="https:${third_conditImg}">`;
    getWeatherENorRU ()
}

function getWeatherENorRU () {
    if (languageEN) {
        tempF ? getTempF () : getTempC ();
    } else {
        tempF ? getTempFRu () : getTempCRu ();
    }
}

function getLocation (data) {
    let city = data.name;
    let country = data.country;
    let lat = data.lat;
    let lon = data.lon;

    document.querySelector('.place').textContent = `${city}, ${country}`;
}

getPlace ()
// getWeather (place)
console.log(hour)

function getTempF () {
    document.querySelector('.btn_far').classList.add('active');
    document.querySelector('.btn_cel').classList.remove('active');

    //today
    document.querySelector('.weather_today_degrees').textContent = temp_f;
    document.querySelector('.weather_today_details').innerHTML = `
    <p>${condition}</p>
    <p>Feels like: ${feelslike_f}°</p>
    <p>Wind: ${wind} <span>km/s</span></p>
    <p>Humidity: ${humidity}%</p>`;
}

function getTempC () {
    document.querySelector('.btn_far').classList.remove('active');
    document.querySelector('.btn_cel').classList.add('active');

    //today
    document.querySelector('.weather_today_degrees').textContent = temp_c;
    document.querySelector('.weather_today_details').innerHTML = `
    <p>${condition}</p>
    <p>Feels like: ${feelslike_c}°</p>
    <p>Wind: ${wind} <span>km/s</span></p>
    <p>Humidity: ${humidity}%</p>`;
}

function getTempFRu () {
    document.querySelector('.btn_far').classList.add('active');
    document.querySelector('.btn_cel').classList.remove('active');

    //today
    document.querySelector('.weather_today_degrees').textContent = temp_f;
    document.querySelector('.weather_today_details').innerHTML = `
    <p>${condition}</p>
    <p>Ощущается: ${feelslike_f}°</p>
    <p>Ветер: ${wind} <span>км/с</span></p>
    <p>Влажность: ${humidity}%</p>`;
}

function getTempCRu () {
    document.querySelector('.btn_far').classList.remove('active');
    document.querySelector('.btn_cel').classList.add('active');

    //today
    document.querySelector('.weather_today_degrees').textContent = temp_c;
    document.querySelector('.weather_today_details').innerHTML = `
    <p>${condition}</p>
    <p>Ощущается: ${feelslike_c}°</p>
    <p>Ветер: ${wind} <span>км/с</span></p>
    <p>Влажность: ${humidity}%</p>`;
}