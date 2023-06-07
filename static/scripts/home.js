const loadProjects = (projects) => {
  let projectContainer = document.querySelector('.projects');
  
  for(let i = 0; i < projects.length; i++) {
    let project = projects[i];
    let item = document.createElement('div');
    item.classList.add('project');
    
    let link = document.createElement('a');
    link.href = project[2];
    link.setAttribute('target', '_blank');
    item.style.backgroundImage = `url(${project[1]})`;
  
  
    let title = document.createElement('h2');
    let desc = document.createElement('p');
  
    title.textContent = project[0];
    desc.textContent = 'Vae eis simulacrum in solio inanis fixere sapientes necesitas semota corripiet gradum.';
  
    link.appendChild(title);
    link.appendChild(desc);
    item.appendChild(link);
    projectContainer.appendChild(item);
  }
}




const periodicSine = (radians) => {
  let x = radians + Math.PI/2;

  return (Math.sin(x) + 1) / 2;
}


// const profilePic = document.querySelector('.intro > img');

// window.addEventListener('scroll', () => {
  
//   const value = periodicSine(window.scrollY/50);

//   profilePic.style.borderRadius = `${value*50}%`;
// });


const homepageBurger = document.querySelector('.first-burger-container');

homepageBurger.addEventListener('click', () => {
  let active = homepageBurger.getAttribute('data-active');
  let burgerPart = homepageBurger.children;
  let burgerMenu = document.querySelector('.first-page > .burger-menu');

  if(active === 'false') {
    burgerPart[0].style.transform = 'rotate(45deg)';
    burgerPart[1].style.transform = 'rotate(-45deg)';

    burgerMenu.style.transform = 'translateX(0)';

    homepageBurger.setAttribute('data-active', 'true');

    

    
  } else {
    burgerPart[0].style.transform = 'translateY(-150%)';
    burgerPart[1].style.transform = 'translateY(150%)';

    burgerMenu.style.transform = 'translateX(100%)';


    homepageBurger.setAttribute('data-active', 'false');
  }


});


// let switchCounter = 0;

// const switchStyle = () => {
//   const titleText = document.querySelectorAll('.text > h1 > span');
  

//   if(switchCounter === 0) {
//     titleText[0].style.background = 'var(--title)';
//     titleText[1].style.background = 'white';
//     switchCounter = 1;
//   } else {
//     titleText[0].style.background = 'white';
//     titleText[1].style.background = 'var(--title)';
//     switchCounter = 0;
//   }
// }

// setInterval(switchStyle, 1000);


const cardContainer = document.querySelector('.hover-box');


for(let i = 0; i < 10; i++) {
  let card = document.createElement('div');

  card.classList.add('cards');
  cardContainer.appendChild(card);
}




let refreshButton = document.querySelector('.hover-container > .hover-head').lastElementChild;

let images = document.querySelectorAll('.hover-box > div');


for(let i = 0; i < images.length; i++) {
  images[i].style.transition = `opacity 300ms ease ${i*100}ms, transform 300ms ease`;
}

refreshButton.addEventListener('click', () => {
  refreshButton.textContent = 'Loading!';
  
  for(let i = 0; i < images.length; i++) {
    images[i].style.opacity = 0;
  }


  
  fetch(FebryanShino + '/api/danbooru', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags: 'genshin_impact -1boy ratio:<1:1'
    })
  })
    .then(response => response.json())
    .then(data => {
      refreshButton.textContent = 'Refresh';
      
      for(let i = 0; i < images.length; i++) {
        let image = images[i];
        image.style.opacity = 1;

        let url = data.posts[i].large_file_url;
        image.style.backgroundImage = `url(${url}`;
      }
    });
});