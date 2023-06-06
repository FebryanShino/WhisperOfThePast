


let playerBack = document.querySelector('.container > .player-back');
let player = document.querySelector('.player');
let downloadAudio = document.querySelector('.player-btn > .download');
let playButton = document.querySelector('.player-btn > .play');
let rewindButton = document.querySelector('.player-btn > .rewind');
let icons = playButton.children;
let audio = document.querySelector('.player > audio');
let defaultAudio = document.querySelector('.yippie');

let timestamp = document.querySelector('.timestamp');




const loadTracks = (tracks) => {
  let trackContainer = document.querySelector('.song-list');
  let showTitle = document.querySelector('.player > h4');
  let showArtist = document.querySelector('.player > h6');
  
  for(let i = 0; i < tracks.length; i++) {
    let info = tracks[i];
  
    let item = document.createElement('div');
    let title = document.createElement('h4');
    let artist = document.createElement('h6');
    trackContainer.appendChild(item);

    if(info[3] !== '') {
      item.classList.add(info[3]);
      item.addEventListener('click', () => {
        playerBack.style.backgroundImage = 'var(--img)';
        audioFileUrl = '/static/audio.mp3';

      });
    }

    title.textContent = info[0];
    artist.textContent = info[1];

    item.appendChild(title);
    item.appendChild(artist);


    item.addEventListener('click', () => {
      showTitle.textContent = info[0];
      showArtist.textContent = info[1];
      playerBack.style.backgroundImage = `url(${info[2]})`;
    });
  }
}






let counter = 0;

const toggleIcon = (index) => {
  icons[index].classList.remove("hidden");

  for(let i = 0; i < icons.length; i++) {
    if(icons[i] !== icons[index]) {
      icons[i].classList.add("hidden");
    }
  }
}





downloadAudio.addEventListener('click', () => {
  window.open(audioFileUrl, target='_blank');
});



playButton.addEventListener('click', () => {

  if(counter === 0) {
    let loadAudio = false;
    if(audio.src.includes(audioFileUrl)) {
      loadAudio = true;
    }
    toggleIcon(1);
    
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



let musicForm = document.querySelector('.music-search');

musicForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let videoUrl = document.querySelector('.music-search > input');
  let button = document.querySelector('.music-search > button');
  let musicTitle = document.querySelector('.player > h4');
  let musicArtist = document.querySelector('.player > h6');
  let playerBack = document.querySelector('.player-back');

  button.textContent = 'Loading';

  fetch(FebryanShino + '/api/youtube', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: videoUrl.value
    })
  })
    .then(response => response.json())
    .then(output => {
      let data = output.data;
      let thumbnail = data.thumbnail;
      audioFileUrl = data.audio_url;

      musicTitle.textContent = data.title;
      musicArtist.textContent = data.author;
      playerBack.style.backgroundImage = `url(${thumbnail})`;
        
      if('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: data.title,
          artist: data.author,
          artwork: [
            {
              src: thumbnail,
              type: "image/png",
            }
          ]
        });
      }
      button.style.background = data.dominant_color;
      button.textContent = 'Search';
      videoUrl.style.border = `1px solid ${data.dominant_color}`;
      timestamp.style.backgroundColor = data.dominant_color;
    });
});


/*
$(() => {
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
            artist: data.author,
            artwork: [
              {
                src: thumbnail,
                type: "image/png",
              }
            ]
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
*/