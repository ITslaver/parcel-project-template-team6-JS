import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import card from './templates/card.hbs';

const gallery = document.querySelector('.card-list');
// const btnEn = document.querySelector('#en');
// const btnUk = document.querySelector('#uk');


const filmApiTrendFetch = new FilmApiTrendFetch();
// --------- При открытии сайта ---------------------

fetchApiFilms();

// ------------Переключение языка--------------
// btnEn.addEventListener('click', onEnClick);
// btnUk.addEventListener('click', onUkClick);

async function onEnClick() {
  try {
    filmApiTrendFetch.lang = 'en';
    await fetchApiFilms();
  } catch (error) {
    console.log(error);
  }
}

async function onUkClick() {
  try {
    filmApiTrendFetch.lang = 'uk';
    await fetchApiFilms();
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------

async function fetchApiFilms() {
  try {
    await filmApiTrendFetch.filmsAndGenres().then(data => {
      const makrup = card(data);
      console.log(data);
      gallery.innerHTML = '';
      gallery.insertAdjacentHTML('beforeend', makrup);
    });
  } catch (error) {
    console.log(error);
  }
}
