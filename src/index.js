import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import card from './templates/card.hbs';
import './js/pagination';
import onSubmitQuery from './js/on-submit-query';
import onLoadPreloaderHide from './js/preloader';
import hbsContainer from './templates/modal-card.hbs';
import './js/cabinet';

const modalCard = document.querySelector('.modalCard');
const gallery = document.querySelector('.card-list');
const btnEn = document.querySelector('#en');
const btnUk = document.querySelector('#uk');
const searchForm = document.querySelector('#search-form');

window.addEventListener('load', onLoadPreloaderHide);

const filmApiTrendFetch = new FilmApiTrendFetch();

searchForm.addEventListener('submit', function (evt) {
  onSubmitQuery(evt, filmApiTrendFetch);
});

// --------- При открытии сайта ---------------------

fetchApiFilms();

// ------------Переключение языка--------------
btnEn.addEventListener('click', onEnClick);
btnUk.addEventListener('click', onUkClick);

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
      console.log(data);
      const makrup = card(data);
      gallery.innerHTML = '';
      gallery.insertAdjacentHTML('beforeend', makrup);
    });
  } catch (error) {
    console.log(error);
  }
}

// ------------Модальное окно----------------

// const listFilms = document.querySelector(".card-list")

gallery.addEventListener('click', onCardClick);

async function onCardClick(event) {
  if (event.target.classList.contains('card-list')) {
    return;
  }
  filmApiTrendFetch.idFilm = event.target.getAttribute('id');
  console.log(filmApiTrendFetch.idFilm);
  await fetchModalCard();
}

async function onCardClick(event) {
  if (event.target.classList.contains('card-list')) {
    return;
  }
  filmApiTrendFetch.idFilm = event.target.getAttribute('id');
  console.log(filmApiTrendFetch.idFilm);
  await fetchModalCard();
}

async function fetchModalCard() {
  try {
    await filmApiTrendFetch.extendFetchFilmCard().then(data => {
      const makrup = hbsContainer(data);
      console.log(data.overview);
      console.log(data);
      console.log(filmApiTrendFetch.movie_id);
      modalCard.innerHTML = '';
      modalCard.insertAdjacentHTML('beforeend', makrup);
    });
  } catch (error) {
    console.log(error);
  }
}
