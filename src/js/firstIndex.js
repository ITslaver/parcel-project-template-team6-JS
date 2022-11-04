import axios from 'axios';
import card from './markupCard.js';
// console.log("card", card)

const gallery = document.querySelector('.gallery');
const btnEn = document.querySelector('#en');
const btnUk = document.querySelector('#uk');
const mainTitle = document.querySelector('.hero-title');

btnEn.addEventListener('click', onEnClick);
btnUk.addEventListener('click', onUkClick);

function onEnClick() {
  gallery.innerHTML = '';
  fetchApi('en');
  localStorage.setItem('language', 'en');
}
function onUkClick() {
  gallery.innerHTML = '';
  fetchApi('uk');
  localStorage.setItem('language', 'uk');
}

const currentLanguage = localStorage.getItem('language');

fetchApi(currentLanguage);

async function fetchApi(language) {
  const currentLang = language;
  await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=2f44dbe234f7609a16da7327d83f3eb3&page=1&language=${currentLang}`
  )
    .then(res => res.json())
    .then(data => {
      const makrup = card(data);
      gallery.innerHTML = '';
      gallery.insertAdjacentHTML('beforeend', makrup);
    })
    .catch(err => console.log(err));
}
