//Блок контроля
const renovate = document.querySelector('.btn_renovate');
const degress = document.querySelector('.temperature_buttons');

const selectBTN = document.querySelector('.btn_language');

const input = document.querySelector('input');

let time;

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

let tempF = 0;

let weathLang = 'lang=en';

let timerId;

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

let date = new Date();

getLinkToImage();
timeBackground();
let timer = setInterval(liveTime, 1000);
getDate(date);
whatDegress ();
getPlaceStart ();
navigator.geolocation.getCurrentPosition(success, error, options);
changeLang ();
mainPage ();

renovate.addEventListener('click', () => {
    getLinkToImage();
})

degress.addEventListener('click', (e) => {
    e.preventDefault();
    switch(e.target.textContent) {
        case '°F':
            languageEN ? getTempF() : getTempFRu ();
            tempF = 1;
            localStorage.setItem("tempF", tempF);
        break
        case '°С':
            languageEN ? getTempC () : getTempCRu ();
            tempF = 0;
            localStorage.setItem("tempF", tempF);
        break
    }
    console.log(e.target.textContent)
})

selectBTN.addEventListener ('change', changeLangURL);

input.addEventListener('change', () => {
    place = input.value;
    getWeather (place);
})

input.addEventListener('mouseover', () => {
    timerId = setTimeout(viewBlock, 1500);
})

input.addEventListener('mouseout', () => {
    clearTimeout(timerId);
    document.querySelector('.title_block').style.display = 'none';
})

function viewBlock () {
    document.querySelector('.title_block').style.display = 'block';
}

function changeLangURL () {
    let lang = selectBTN.value;
    location.href = `${location.pathname}#${lang}`;
    if (lang == 'ru') {
        tempF == 1 ? getTempFRu () : getTempCRu ();
        weathLang = 'lang=ru';
        getWeather (place);
        languageEN = false;
        getDate (date);
        mainPage ();
    } else if (lang == 'en') {
        tempF == 1 ? getTempF () : getTempC ();
        weathLang = 'lang=en';
        getWeather (place);
        languageEN = true;
        getDate (date);
        mainPage ();
    }
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
        selectBTN.value = 'en';
        languageEN = true;
    }
    console.log(hash);
}

function mainPage () {
    if (languageEN) {
        document.querySelector('title').innerHTML = 'Weather';
        document.querySelector('input').placeholder = 'Search city';
        document.querySelector('.btn_search').innerHTML = 'SEARCH';
        document.querySelector('.title_block').innerHTML = 'Enter the name of the city!';
    } else {
        document.querySelector('title').innerHTML = 'Погода';
        document.querySelector('input').placeholder = 'Поиск города';
        document.querySelector('.btn_search').innerHTML = 'ПОИСК';
        document.querySelector('.title_block').innerHTML = 'Введите название города!';
    }
}

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

function getPlaceStart () {
    const url = 'https://ipinfo.io/json?token=04b21bb6bb2be7';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        getWeather (data.loc)
        console.log(data)
    })
}
  
function success(pos) {
let crd = pos.coords;
place = `${crd.latitude},${crd.longitude}`;
getWeather (place);
};
  
function error(err) {
cons.warn(`ERROR(${err.code}): ${err.message}`);
};

// navigator.geolocation.getCurrentPosition((pos) => {
//     let crd = pos.coords;
//     place = `${crd.latitude},${crd.longitude}`;
//     getWeather (place);
// })

function getDate (date) {
    showDaysNow = daysNow[date.getDay()];
    showDaysNowRU = daysNowRU[date.getDay()];

    if (date.getDay() <= 3) {
        showDaysNext1 = daysNext[date.getDay() + 1];
        showDaysNext2 = daysNext[date.getDay() + 2];
        showDaysNext3 = daysNext[date.getDay() + 3];
        showDaysNext1RU = daysNextRU[date.getDay() + 1];
        showDaysNext2RU = daysNextRU[date.getDay() + 2];
        showDaysNext3RU = daysNextRU[date.getDay() + 3];
    } else if (date.getDay() == 4) {
        showDaysNext1 = daysNext[date.getDay() + 1];
        showDaysNext2 = daysNext[date.getDay() + 2];
        showDaysNext3 = daysNext[0];
        showDaysNext1RU = daysNextRU[date.getDay() + 1];
        showDaysNext2RU = daysNextRU[date.getDay() + 2];
        showDaysNext3RU = daysNextRU[0];
    } else if (date.getDay() == 5) {
        showDaysNext1 = daysNext[date.getDay() + 1];
        showDaysNext2 = daysNext[0];
        showDaysNext3 = daysNext[1];
        showDaysNext1RU = daysNextRU[date.getDay() + 1];
        showDaysNext2RU = daysNextRU[0];
        showDaysNext3RU = daysNextRU[1];
    } else if (date.getDay() == 6) {
        showDaysNext1 = daysNext[0];
        showDaysNext2 = daysNext[1];
        showDaysNext3 = daysNext[2];
        showDaysNext1RU = daysNextRU[0];
        showDaysNext2RU = daysNextRU[1];
        showDaysNext3RU = daysNextRU[2];
    }
    
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
        tempF == 1 ? getTempF () : getTempC ();
    } else {
        tempF == 1 ? getTempFRu () : getTempCRu ();
    }
}

function getLocation (data) {
    let city = data.name;
    let country = data.country;
    let lat = data.lat;
    let lon = data.lon;

    showMap (lon, lat)

    console.log(lat, lon);

    let latleg = lat.toString().split('.').map(e=>e.length).concat(0).slice(0,2);
    let lonleg = lon.toString().split('.').map(e=>e.length).concat(0).slice(0,2);

    [a,b] = latleg;
    [c,d] = lonleg;

    if (a < 2 && b < 2) {
        lat = '0' + lat + '0';
    } else if (a < 2 && b == 2) {
        lat = '0' + lat;
    } else if (a == 2 && b < 2) {
        lat = lat + '0';
    } else {
        lat = lat + '';
    }

    if (c < 2 && d < 2) {
        lon = '0' + lon + '0';
    } else if (c < 2 && d == 2) {
        lon = '0' + lon;
    } else if (c == 2 && d < 2) {
        lon = lon + '0';
    } else {
        lon = lon + '';
    }

    let lati = `${lat.slice(0, 2)}°${lat.slice(3)}'`;
    let loni = `${lon.slice(0, 2)}°${lon.slice(3)}'`;
    console.log(lati);
    console.log(loni);


    document.querySelector('.place').textContent = `${city}, ${country}`;

    if (languageEN) {
        document.querySelector('.coordinates').innerHTML = `
        <p>Latitude: ${lati}</p>
        <p>Longitude: ${loni}</p>`
    } else {
        document.querySelector('.coordinates').innerHTML = `
        <p>Широта: ${lati}</p>
        <p>Долгота: ${loni}</p>`
    }
}

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

function whatDegress () {
    tempF = localStorage.getItem("tempF");
    if (tempF == 1) {
        languageEN ? getTempF() : getTempFRu ()
    } else {
        languageEN ? getTempC () : getTempCRu ();
    }
    console.log(typeof(tempF))
}

function showMap (lon, lat) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvd29yZHMiLCJhIjoiY2xodXYzcGRzMDNsczNmcGNnNWN6eTBpcyJ9.9koqRSPP_hm-R6GY6MwnHw';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lon, lat],
    zoom: 8
    });
    const marker1 = new mapboxgl.Marker()
    .setLngLat([lon, lat])
    .addTo(map);
}