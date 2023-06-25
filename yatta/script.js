const postContainer = document.querySelector('.post-grid');



for (let i = 0; i < 10; i++) {
  const post = document.createElement('div');
  post.classList.add('post');

  postContainer.appendChild(post);
}
