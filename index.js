
/*

Used for navigation for each page

*/


let home = document.querySelector('#home');
let more = document.querySelector('#more');
let set = document.querySelector('#set');
let about = document.querySelector('#about');
let navColle = [home, more, set, about];

let navCenter = document.querySelector('.nav-center');

let firstPage = document.querySelector('.first-page');
let secondPage = document.querySelector('.second-page');
let thirdPage = document.querySelector('.third-page');
let fourthPage = document.querySelector('.fourth-page');
let specialPage = document.querySelector('.special-page');
pages = [firstPage, secondPage, thirdPage, fourthPage, specialPage];


let navBar = document.querySelector('.navigation-bar');




function toggleNav(elements, element) {
  element.classList.add('active');
  let svgPath = element.children[0].querySelector('path');

  element.style.color = 'white';
  svgPath.style.fill = 'white';


  navBar.style.background = 'white';
  navBar.style.border = '1px solid hsl(0,0%,80%)';

  let svg = document.querySelector('.nav-center > svg').querySelectorAll("path");
  
  svg[0].style.fill = "white";
  svg[1].style.fill = "white";
  
  for(let i = 0; i < elements.length; i++) {
    
    let svgs = elements[i].children[0].querySelector("path");

    if(elements[i] !== element) {
      elements[i].classList.remove("active");
    }
    if(svgs !== svgPath) {
      svgs.style.fill = "black";
      elements[i].style.color = "black";
    }
  }
}

function togglePage(pages, page) {
  page.classList.remove("hidden");

  for(let i = 0; i < pages.length; i++) {
    if(pages[i] !== page) {
      pages[i].classList.add("hidden");
    }
  }
}


for(let i = 0; i < navColle.length; i++) {
  let nav = navColle[i];
  
  nav.addEventListener('click', () => {
    toggleNav(navColle, nav);
    togglePage(pages, pages[i]);
  });
}



navCenter.addEventListener('click', () => {
  let svg = document.querySelector(".nav-center > svg").querySelectorAll("path");
  navBar.style.background = 'black';
  navBar.style.border = '1px solid black';
  svg[0].style.fill = '#B7BAC3';
  svg[1].style.fill = '#7584A1';

  
  for(let i = 0; i < navColle.length; i++) {
    let btn = navColle[i];
    btn.classList.remove("active");
    btn.style.color = "black";  btn.children[0].querySelector("path").style.fill = "black";  
  }
  togglePage(pages, specialPage);
});




/*

Login Page

*/

function title(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
}


let loginInput = document.querySelector('.login-input > #name');
let greetHeader = document.querySelector('.login-input > h2');

document.addEventListener('input', () => {
  let text = `Hello, ${title(loginInput.value)}!`;
  if(loginInput.value === '') {
    text = 'Hello!';
  }
  greetHeader.textContent = text;
});


/*

Second Page

*/

function leadZero(number) {
  return (number < 10 ? '0' : '') + number;
}

function ordinalNumber(number) {
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


function datetime() {
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
  'Anow',
  'Atmosphere'
]
let atmosphericWeather = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']

function toggleWeather(weather) {
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

function weatherAPI(city = null, callback) {
  if(city === null) {
    city = 'Tokyo, Japan';
  }
  fetch('api/weather', {
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

/*

Third Page (Music Player)

*/

let playerBack = document.querySelector('.container > .player-back');
let player = document.querySelector('.player');
let downloadAudio = document.querySelector('.player-btn > .download');
let playButton = document.querySelector('.player-btn > .play');
let rewindButton = document.querySelector('.player-btn > .rewind');
let icons = playButton.children;
let audio = document.querySelector('.player > audio');
let defaultAudio = document.querySelector('.yippie');
let timestamp = document.querySelector('.timestamp');

let counter = 0;

function toggleIcon(index) {
  icons[index].classList.remove("hidden");

  for(let i = 0; i < icons.length; i++) {
    if(icons[i] !== icons[index]) {
      icons[i].classList.add("hidden");
    }
  }
}


let songList = document.querySelector('.song-list').children;
let showTitle = document.querySelector('.player > h4');
let showArtist = document.querySelector('.player > h6');




for(let i = 0; i < songList.length; i++) {
  let song = songList[i];
  let songName = song.children[0].textContent;
  let songArtist = song.children[1].textContent;
  let songArtwork = song.getAttribute('data-artwork');

  song.addEventListener('click', () => {
    showTitle.textContent = songName;
    showArtist.textContent = songArtist;
    playerBack.style.backgroundImage = `url(${songArtwork})`;
  });
}


defaultAudio.addEventListener('click', () => {
  playerBack.style.backgroundImage = 'var(--img)';
  audioFileUrl = '/static/audio.mp3';
});


downloadAudio.addEventListener('click', () => {
  window.open(audioFileUrl, '_blank');
});



playButton.addEventListener('click', () => {

  if(counter === 0) {
    let loadAudio = false;
    if(audio.src.includes(audioFileUrl)) {
      loadAudio = true;
    }
    toggleIcon(1);
    console.log(loadAudio);
    
    if(loadAudio === false) {
      audio.src = audioFileUrl;
      audio.load();
    }
    audio.play();
    counter = 1;
  } else {
    toggleIcon(0);
    audio.pause();
    counter = 0;
  }
});

audio.addEventListener("timeupdate", () => {
  let duration = audio.duration;
  let current = audio.currentTime;
  let ratio = current/duration;
  timestamp.style.transform = `scaleX(${ratio})`;

  playerBack.style.backgroundPosition = `center ${ratio*100}%`;


  if(current === duration) {
    toggleIcon(2);;
    audio.pause();
    counter = 0;
  }
});


rewindButton.addEventListener('click', () => {
  audio.currentTime = 0;
});







/*

Fourth Page (About)

*/


let burgerButton = document.querySelector('.burger-btn');
let burgerContainer = document.querySelector('.burger-container');
let burgerList = document.querySelector(".burger-list");

burgerButton.addEventListener('click', () => {
  burgerContainer.classList.remove("hidden");
});

burgerContainer.addEventListener('click', (event) => {
  let isClicked = burgerList.contains(event.target);
  if(!isClicked) {
    burgerContainer.classList.add("hidden");
  }
});




/*

Special Page

*/

let imgContainer = document.querySelector('.img-container');
let imgChildren = imgContainer.children;
let redirectButton = document.querySelector('.img-info > a');
let redirectIcon = document.querySelector('.img-info > a > svg path');
let artistDesc = document.querySelector('.artist-string > h6');
let tagDesc = document.querySelector('.tag-string > h6');

let imgPreview = document.querySelector('.img-preview');



function toggleBlur(element, value) {
  for(let i = 0; i < imgChildren.length; i++) {
    if (imgChildren[i] !== element) {
      imgChildren[i].style.filter = `blur(${value}px)`;
    }
  }
}


for(let i = 0; i < imgChildren.length; i++) {

  let image = imgChildren[i];
  
  image.addEventListener('click', () => {
    redirectButton.style.background = 'black';
    redirectButton.style.color = 'white';
    redirectIcon.style.fill = 'white';


    redirectButton.href = image.getAttribute('data-file');
    artistDesc.textContent = image.getAttribute('data-artist');
    tagDesc.textContent = image.getAttribute('data-tags');

    imgPreview.src = image.getAttribute('data-sample');
    
  });

  image.addEventListener("mouseenter", () => {
    toggleBlur(image, 5);
  });

  image.addEventListener("mouseleave", ()=> {
    toggleBlur(image, 0);
  });
}




/*

jQuery used for AJAX

*/

                         

$(() => {

  $(".login-input").submit((event) => {
    let name = $("#name").val();
    let message = $("#message").val();
    
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        name: name,
        message: message
      },
      success: (response) => {
        $(".first-page > .header > h5").text(`Hello, ${title(response)}!`);
        $(".login-popup").addClass("hidden");
      }
    });
  });

  
  $(".text-input").submit((event) => {
    let tags = $(".text-input input");
    let button = $(".text-input > button");
    let images = imgChildren;

    for(let i = 0; i < images.length; i++) {
      images[i].style.opacity = 0;
    }

    button.css('background', 'none');
    tags.css('width', '11.5%');

    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/danbooru",
      data: tags.serialize(),
      success: (data) => {

        for(let i = 0; i < images.length; i++) {
          let image = images[i];
          let post = data.posts[i];
          image.src = post.large_file_url;
          image.setAttribute('data-file', post.file_url);
          image.setAttribute('data-artist', post.tag_string_artist);
          image.setAttribute('data-tags', post.tag_update);
          image.setAttribute('data-sample', post.large_file_url);

          image.addEventListener('load', () => {
            image.style.opacity = 1;
          });
        }
      },
      complete: () => {
        tags.css('width', '100%');
        button.css('background', '#8BA2B4');
      }
    });

  });


  $('.music-search').submit((event) => {
    event.preventDefault();

    let videoUrl = $('.music-search > input');
    let button = $('.music-search > button');
    let musicTitle = $('.player > h4');
    let musicArtist = $('.player > h6');
    let playerBack = $('.player-back');

    button.text('Loading');


    $.ajax({
      type: 'POST',
      url: '/ytdl',
      data: videoUrl.serialize(),
      success: (response) => {
        let data = response.data;
        let thumbnail = data.thumbnail;
        audioFileUrl = data.audio_url;
        
        musicTitle.text(data.title);
        musicArtist.text(data.author);
        playerBack.css('background-image', `url(${thumbnail})`);
        
        if('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: data.title,
            artist: data.author
          });
        }

        button.css('background', data.dominant_color);
        button.text('Search');
        videoUrl.css('border', `1px solid ${data.dominant_color}`);
        timestamp.style.backgroundColor = data.dominant_color;
      }
    });
  });
});