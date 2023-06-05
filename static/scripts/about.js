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

about = [
  'Store',
  'Friends',
  'Assignments',
  'Travel Log',
  'Synthesize',
  'Achieved',
  'Messages',
  'Nameless Honor',
  'Warp',
  'Characters',
  'Interastral Guide',
  'Data Bank',
  'Bookshelf',
  'Tutorials'
];

let gridContainer = document.querySelector('.social');


for(let i = 0; i < about.length; i++) {
  let item = document.createElement('a');
  item.textContent = about[i];
  
  item.style.animation = 'fadeIn 500ms ease forwards';
  item.style.animationDelay = i*200 + 'ms';

  gridContainer.appendChild(item);
}


