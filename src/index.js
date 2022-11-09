import './js/cabinet';
import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import './js/authorization';
import card from './templates/card.hbs';
import './js/pagination';
import onSubmitQuery from './js/on-submit-query';
import { onLoadPreloaderHide } from './js/preloader';
import hbsContainer from './templates/modal-card.hbs';
import './js/modal-film-card';
import SmoothScroll from 'smoothscroll-for-websites';
import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import { uid } from './js/cabinet';
import { getList } from './js/cabinet';
import './js/goTop';
// import './js/footer-modal';
import './js/goTop';
import './js/footer-modal';
import './js/notify-init';

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

if (document.title === 'Filmoteka') {
  fetchApiFilms();
} else getList('favorite', uid);

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
  const list = document.getElementById(filmApiTrendFetch.idFilm).dataset.list;
  console.log('Это data-film:', filmApiTrendFetch.idFilm, list);
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
        data.list = list;
        const markup = hbsContainer(data);
        // console.log(data.overview);
        console.log(data);
        console.log(filmApiTrendFetch.movie_id);
        modalCard.innerHTML = '';
        modalCard.insertAdjacentHTML('beforeend', markup);

        if (list === 'favorite') {
          document.querySelector('.button-queue').hidden = true;
          document.querySelector('.button-queue-del').hidden = true;
        } else if (list === 'watched') {
          document.querySelector('.button-watched').hidden = true;
          document.querySelector('.button-queue-del').hidden = true;
        } else if (list.length < 1) {
          document.querySelector('.button-queue-del').hidden = true;
          document.querySelector('.button-queue-del').hidden = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
    await filmApiTrendFetch.fetchTrailerMovie();
  }

  // const videoTrailer = document.querySelector('.movie-poster');
  // videoTrailer.addEventListener('click', onPosterClick);
  // trailerCard = document.querySelector('.modal-one-film__window');
  // console.log(trailerCard);

  // async function onPosterClick(event) {
  //   console.log("Это постер");
  //   try {
  //     await filmApiTrendFetch.fetchTrailerMovie().then(data => {
  //       // const markup = hbsContainer(data);
  //       // console.log(data.overview);
  //       console.log("Это трейлер:", data);

  //       console.log(filmApiTrendFetch.movie_id);
  //       result = data.results.map(item =>
  //         `<li><iframe width="560" height="315" src="https://www.youtube.com/embed/${item.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`)
  //       // trailerCard.innerHTML = '';
  //       trailerCard.insertAdjacentHTML('beforeend', result);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // filmApiTrendFetch.idFilm = event.target.getAttribute('data-film');
  //   console.log('Это data-film:', filmApiTrendFetch.idFilm);
  //   await fetchModalCard();}

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
