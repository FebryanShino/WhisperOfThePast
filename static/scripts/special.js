
let tagInput = document.querySelector('.inputs > .search-bar > input');
let options = document.querySelector('.inputs > .pop');

let orientations = document.querySelectorAll('.orientation > h6');

let searchButton = document.querySelector('.inputs > .search-bar > .icon');


let imgContainer = document.querySelector('.img-container');


for(let i = 0; i < 10; i++) {
  let image = document.createElement('img');

  image.setAttribute('data-file', 'https://youtu.be/dQw4w9WgXcQ');
  image.setAttribute('data-tags', 'Undifined');
  image.setAttribute('data-artist', 'Undifined');
  image.setAttribute('data-sample', 'https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg');
  image.src = 'https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg';

  imgContainer.appendChild(image);
  
}


let imgChildren = imgContainer.children;


const toggleOrientation = (element) => {
  element.style.background = 'hsl(0,0%,60%)';

  for(let i = 0; i < orientations.length; i++) {
    let option = orientations[i];
    if(option !== element) {
      option.style.background = 'none';
    }

  }
}

for(let i = 0; i < orientations.length; i++) {
  let option = orientations[i];

  option.addEventListener('click', () => {
    tagInput.setAttribute('data-orientation', option.textContent);
    toggleOrientation(option);
  });
}

const searchIcons = document.querySelectorAll('.search-bar > .icon > svg');

searchButton.addEventListener('click', () => {
  let input = tagInput.value;
  let attr = tagInput.getAttribute('data-orientation');
  let images = imgChildren;

  tagInput.setAttribute('data-input', input);
  searchIcons[0].classList.add('hidden');
    searchIcons[1].classList.remove('hidden');
  

  for(let i = 0; i < images.length; i++) {
    images[i].style.opacity = 0;
  }

  
  if(attr === 'Landscape') {
    input += ' ratio:>1:1';
  } else if(attr === 'Portrait') {
    input += ' ratio:<1:1';
  }

  fetch(FebryanShino + '/api/danbooru', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags: input
    })
  })
    .then(response => response.json())
    .then(data => {
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
    });   
});

let searchIconPath = document.querySelector('.inputs > .icon > svg path');


tagInput.addEventListener('input', () => {
  let inputValue = tagInput.getAttribute('data-input');

  if(tagInput.value === inputValue) {
    searchIcons[1].classList.remove('hidden');
    searchIcons[0].classList.add('hidden');
  } else {
    searchIcons[1].classList.add('hidden');
    searchIcons[0].classList.remove('hidden');
  }

});


tagInput.addEventListener('focus', () => {
  options.style.transform = 'translateY(75%)';
  options.style.height = 'calc(100% + 1rem)';
  tagInput.style.color = 'white';
  searchIconPath.style.stroke = 'white';

});

tagInput.addEventListener('blur', () => {
  options.style.transform = 'translateY(0)';
  options.style.height = '100%';
  tagInput.style.color = 'hsl(0,0%,50%)';
  searchIconPath.style.stroke = 'hsl(0,0%,50%)';
});



let redirectButton = document.querySelector('.img-info > a');
let redirectIcon = document.querySelector('.img-info > a > svg path');
let artistDesc = document.querySelector('.artist-string > h6');
let tagDesc = document.querySelector('.tag-string > h6');

let imgPreview = document.querySelector('.img-preview');



const toggleBlur = (element, value) => {
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