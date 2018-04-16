const newSearch = document.querySelector('.new-search');
const randomSearch = document.querySelector('.random-search');
const resultSection = document.querySelector('.result-section');


const getRandom = () => {
  window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
}

const getSearch = () => {
  const searchQuery = document.querySelector('.search-bar').value;
  if (searchQuery != "" || searchQuery.trim() != "") {
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=100&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}&origin=*`;
    let resultData = "";
    resultSection.innerHTML = "";
    $.getJSON(url, function(data) {
      // console.log(data);
      if(data.query){
      const pages = data.query.pages;
      for (i in pages) {
      	if(pages[i].extract){
        resultData += `<div class="result"><a href="https://en.wikipedia.org/?curid=${pages[i].pageid}" target="_blank"><p class="title">${pages[i].title}</p>
                <p><em>${pages[i].extract}</em></p></a></div>`;
                }
      }}else{
      	resultData = `Enter an appropriate search value`;
      }
      resultSection.innerHTML = resultData;
    });
  } else {
    resultSection.innerHTML = `Enter some Value to search`;
  }
  resultSection.classList.remove('hidden');
  window.scrollTo(0, window.innerHeight);
}


$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});

newSearch.addEventListener('click', getSearch);
randomSearch.addEventListener('click', getRandom);