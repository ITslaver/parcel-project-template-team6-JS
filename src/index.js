import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import card from './templates/card.hbs';
import './js/pagination';
import onSubmitQuery from './js/on-submit-query';
import onLoadPreloaderHide from './js/preloader';
import hbsContainer from './templates/modal-card.hbs';
import './js/cabinet';
import './js/modal-film-card';
import SmoothScroll from 'smoothscroll-for-websites';
// import './js/footer-modal';

const modalCard = document.querySelector('.modal-one-film__content');
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
    filmApiTrendFetch.currentLang = 'en-US';
    await fetchApiFilms();
  } catch (error) {
    console.log(error);
  }
}

async function onUkClick() {
  try {
    filmApiTrendFetch.currentLang = 'uk-UA';
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

const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');

async function onCardClick(event) {
  if (event.target.classList.contains('card-list')) {
    return;
  }
  filmApiTrendFetch.idFilm = event.target.getAttribute('data-film');
  console.log('Это data-film:', filmApiTrendFetch.idFilm);
  await fetchModalCard();

  const closeOnEsc = async e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      await closeModal();
    }
  };

  await openModal();

  async function fetchModalCard() {
    try {
      await filmApiTrendFetch.extendFetchFilmCard().then(data => {
        const makrup = hbsContainer(data);
        // console.log(data.overview);
        console.log(data);
        console.log(filmApiTrendFetch.movie_id);
        modalCard.innerHTML = '';
        modalCard.insertAdjacentHTML('beforeend', makrup);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function openModal() {
    console.log('это Модалка');
    document.addEventListener('keydown', closeOnEsc);
    modalDialog.classList.remove('modal-one-film--hidden');
    html.classList.add('disable-scroll-all');    
  }

  async function closeModal() {
    document.removeEventListener('keydown', closeOnEsc);
    modalDialog.classList.add('modal-one-film--hidden');
    html.classList.add('disable-scroll-all');
  } 

  async function closeModal() {
      document.removeEventListener('keydown', closeOnEsc);
      modalDialog.classList.add('modal-one-film--hidden');
      html.classList.remove('disable-scroll-all');
  }
}

// --------- SmoothScroll ---------- //

SmoothScroll({
  stepSize: 175,
  animationTime: 800,
  accelerationDelta: 200,
  accelerationMax: 6,
  keyboardSupport: true,
  arrowScroll: 100,
});

// console.log(query);

// -------- dancing Gif --------- //
