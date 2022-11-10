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
import renderCards from './js/render-cards';
import { onErrorEN, onErrorUK } from './js/on-error';

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
    onErrorEN();
  }
}

async function onUkClick() {
  try {
    filmApiTrendFetch.currentLang = 'uk-UA';
    await fetchApiFilms();
  } catch (error) {
    onErrorUK()
  }
}

// ------------------------------------

async function fetchApiFilms() {
  try {
    await filmApiTrendFetch.filmsAndGenres().then(data => {
      renderCards(data)
    });
  } catch (error) {
    onErrorEN()
  }
}

// ------------Модальное окно----------------

// const listFilms = document.querySelector(".card-list")
gallery.addEventListener('click', onCardClick);
const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');
const trailerCard = document.querySelector('.modal-one-film__window');

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
        console.log('в лист ' + list);
        const markup = hbsContainer(data);
        // console.log(data.overview);
        //console.log(data.list);
        console.log(filmApiTrendFetch.movie_id);
        modalCard.innerHTML = '';
        modalCard.insertAdjacentHTML('beforeend', markup);

        if (list === 'favorite') {
          document.querySelector('.button-queue').textContent = "DEL QUEYUE";
          document.querySelector('.button-queue').name = "delFavorite";
          document.querySelector('.button-queue').classList = "button-queue-del active";
        } else if (list === 'watched') {
          document.querySelector('.button-watched').textContent = "DEL WATCHED";
          document.querySelector('.button-watched').name = "delWatched";
          document.querySelector('.button-watched').classList = "button-watched-del active";
        }
      });
    } catch (error) {
      console.log(error);
    }
    await filmApiTrendFetch.fetchTrailerMovie();
    // await onPosterClick();     
  }

  const videoTrailer = document.querySelector('.movie-poster');
  videoTrailer.addEventListener('click', onPosterClick);
  await filmApiTrendFetch.fetchTrailerMovie()
  // console.log(trailerCard);
  // await onPosterClick(); 


  async function openModal() {
    console.log('это Модалка');
    document.addEventListener('keydown', closeOnEsc);
    modalDialog.classList.remove('modal-one-film--hidden');
    html.classList.add('disable-scroll-all');
  }

  async function closeModal() {

    document.removeEventListener('keydown', closeOnEsc);
    modalDialog.classList.add('modal-one-film--hidden');
    html.classList.remove('disable-scroll-all');
    // trailerCard.innerHTML = '';   
  }

  async function onPosterClick() {
    console.log("Это постер");
    try {
      await filmApiTrendFetch.fetchTrailerMovie().then(data => {
        // const markup = hbsTest(data);
        console.log("Это трейлер:", data);

        console.log(filmApiTrendFetch.movie_id);
        result = data.results.map(item =>
          `<li><iframe width="640" height="360" src="https://www.youtube.com/embed/L8yPTJ3asO8" title="YouTube video player" controls frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`)
          // `<li><iframe width="640" height="360" src="https://www.youtube.com/embed/${item.key}" title="YouTube video player" controls frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`)
          console.log(result);
        // trailerCard.innerHTML = '';
        trailerCard.insertAdjacentHTML('beforebegin', result);
        // trailerCard.innerHTML = result;
      });
    } catch (error) {
      console.log(error);
    }

    // setTimeout(trailerCard.innerHTML = '', 10000);
    // filmApiTrendFetch.idFilm = event.target.getAttribute('data-film');
    console.log('Это data-film:', filmApiTrendFetch.idFilm);
    // await fetchModalCard();    
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
