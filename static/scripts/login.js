const title = (str) => {
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
        alert('Jokes on you! You though it was a portfolio but it was me, Dio!');
        $(".first-page > .header > h5").text(`Hello, ${title(response)}!`);
        $(".login-popup").addClass("hidden");
      }
    });
  });
});
