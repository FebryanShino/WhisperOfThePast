let burgerButton = document.querySelector('.burger-btn');
let burgerContainer = document.querySelector('.burger-container');
let burgerList = document.querySelector('.burger-list');

burgerButton.addEventListener('click', () => {
  burgerContainer.classList.remove('hidden');
});

burgerContainer.addEventListener('click', (event) => {
  let isClicked = burgerList.contains(event.target);
  if(!isClicked) {
    burgerContainer.classList.add('hidden');
  }
});






const loadAboutPage = (items) => {
  let gridContainer = document.querySelector('.social');
  
  for(let i = 0; i < items.length; i++) {
    let item = document.createElement('a');
    item.textContent = items[i];
    
    item.style.animation = 'fadeIn 400ms ease forwards';
    item.style.animationDelay = i*180 + 'ms';
  
    gridContainer.appendChild(item);
  }
}






