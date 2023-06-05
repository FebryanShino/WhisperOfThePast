const loadProjects = (projects) => {
  let projectContainer = document.querySelector('.projects');
  
  for(let i = 0; i < projects.length; i++) {
    let project = projects[i];
    let item = document.createElement('div');
    item.classList.add('project');
    
    let link = document.createElement('a');
    link.href = project[2];
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
