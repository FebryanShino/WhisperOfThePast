const leadZero = (number) => {
  return (number < 10 ? '0' : '') + number;
}

const ordinalNumber = (number) => {
  let value = number.toString().charAt(number.length-1);
  
  if(value == 1) {
    return number + 'st';
  } else if(value == 2) {
    return number + 'nd';
  } else if(value == 3) {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let timeContainer = document.querySelector('.time > div > h2');
let dateContainer = document.querySelector('.date');


const datetime = () => {
  const currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let date = ordinalNumber(currentTime.getDate());
  let day = days[currentTime.getDay()];
  let month = months[currentTime.getMonth()];
  
  hours = leadZero(hours);
  minutes = leadZero(minutes);

  timeContainer.textContent = `${hours}:${minutes}`;

  
  dateContainer.lastElementChild.textContent = `${month} ${date}`;
  dateContainer.firstElementChild.textContent = day;
}



datetime();
setInterval(datetime, 1000 * 60);

timeContainer.addEventListener('click', () => {
  let audio = document.querySelector('.time > audio');

  timeContainer.style.animation = 'fade 2000ms ease infinite';
  
  fetch(FebryanShino + '/api/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time: timeContainer.textContent
    })
  })
    .then(response => response.json())
    .then(data => {
      timeContainer.style.animation = 'none';
      audio.src = data.voice;
      audio.load();
      audio.play();
    });
  
});



let cityInput = document.querySelector('.time > input');
let inputButton = document.querySelector('.date-container > button');

cityInput.addEventListener('focus', () => {
  inputButton.style.transform = 'translateY(-.5rem)';
});


cityInput.addEventListener('blur', () => {
  inputButton.style.transform = 'translateY(-100%)';
});



let weatherInfo = document.querySelector('.weather > .info');
let weatherIcons = document.querySelector('.weather-icon').children;
let weatherList = [
  'Clear',
  'Clouds',
  'Rain',
  'Thunderstorm',
  'Snow',
  'Atmosphere'
]
let atmosphericWeather = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']


const toggleWeather = (weather) => {
  if(atmosphericWeather.some(substr => weather.includes(substr))) {
    weather = 'Atmosphere';
  }
  let index = weatherList.indexOf(weather)
  let weatherNow = weatherIcons[index];
  weatherNow.classList.remove('hidden');

  for(let i = 0; i < weatherIcons.length; i++) {
    let weatherIcon = weatherIcons[i];
    if(weatherIcon !== weatherNow) {
      weatherIcon.classList.add('hidden');
    }
  }
}


let weatherIconContainer = document.querySelector('.weather');

const weatherAPI = (city=null, callback) => {
  if(city === null) {
    city = 'Tokyo, Japan';
  }
  fetch(FebryanShino + 'api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({city: city})
  })
    .then(response => response.json())
    .then(data => {
      weatherInfo.firstElementChild.textContent = data.temp + '°C';
      weatherInfo.lastElementChild.textContent = data.status;
      weatherInfo.setAttribute('data-location', data.location);
      toggleWeather(data.status);
      callback();
    })
}


inputButton.addEventListener('click', () => {

  weatherIconContainer.style.opacity = 0;
  weatherAPI(cityInput.value, function() {
    weatherIconContainer.style.opacity = 1;
  });
});

weatherAPI(null, function() {});


weatherIconContainer.addEventListener('click', () => {
  let temp = weatherInfo.firstElementChild.textContent;
  let status = weatherInfo.lastElementChild.textContent;
  let audio = document.querySelector('.weather > audio');
  let location = weatherInfo.getAttribute('data-location');

  weatherIconContainer.style.animation = 'fade 2000ms ease infinite';
  
  fetch(FebryanShino + '/api/voice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: status,
      temperature: temp.slice(0, -2),
      location: location
    })
  })
    .then(response => response.json())
    .then(data => {
      weatherIconContainer.style.animation = 'none';
      audio.src = data.voice;
      audio.load();
      audio.play();
    });
});

