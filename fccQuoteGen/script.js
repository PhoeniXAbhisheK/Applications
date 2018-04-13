const quote = document.querySelector('.quote em');
const name = document.querySelector('.name');
const newQuoteBut = document.querySelector('.newQuote');
const tweetQuoteBut = document.querySelector('.tweet-quote');

newQuote = () => {

  $.getJSON("http://quotesondesign.com/wp-json/posts?filter[posts_per_page]=30&callback=", function(a) {
    const idx = Math.round(Math.random() * a.length - 1);
    name.innerHTML = a[idx].title;
    quote.innerHTML = a[idx].content;
  });
}

tweetQuote = () => {
  window.open('https://twitter.com/intent/tweet?related=freecodecamp&text=' + encodeURIComponent(quote.textContent + ' - ' + name.textContent) + ' (Source: https://codepen.io/phoenixabhishek/full/xWMqoE/)' + '&via=sudoPhoenix', 'Share', 'width=550, height=400, toolbar=0, scrollbar=0, top=100, left=300,statusbar=0, menubar=0, resizable=0');
}

newQuote();
newQuoteBut.addEventListener('click', newQuote);
tweetQuoteBut.addEventListener('click', tweetQuote);