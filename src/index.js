import './js/cabinet';
import FilmApiTrendFetch from './js/serviceApiFilmTrend';
import './js/authorization';
import card from './templates/upcoming-film-card.hbs';
import './js/pagination';
import onSubmitQuery from './js/on-submit-query';
import { onLoadPreloaderHide } from './js/preloader';
import hbsContainer from './templates/modal-card.hbs';
import './js/modal-film-card';
// import './js/modal-trailer-card';
import SmoothScroll from 'smoothscroll-for-websites';
import { uid } from './js/cabinet';
import { getList } from './js/cabinet';
import { getListById } from './js/cabinet';
import './js/goTop';
// import './js/footer-modal';
import './js/footer-modal';
import './js/notify-init';
import renderCards from './js/render-cards';
import { onErrorEN, onErrorUK } from './js/on-error';
import './js/backButton.js'
import Notiflix from 'notiflix';
import { spinnerOff, spinnerOn } from './js/preloader.js';
import { GENRES_URL, API_KEY, GENRES_ID_URL } from './js/serviceApiFilmTrend';
import { async } from 'regenerator-runtime';
import './js/backButton.js';


const modalCard = document.querySelector('.modal-one-film__content');
const gallery = document.querySelector('.card-list');
const btnEn = document.querySelector('#en');
const btnUk = document.querySelector('#uk');
const searchForm = document.querySelector('#search-form');
const upcomingList = document.querySelector('.coming-soon-list');
let currentLang = 'en-US';

window.addEventListener('load', onLoadPreloaderHide);

const filmApiTrendFetch = new FilmApiTrendFetch();

searchForm.addEventListener('submit', function (evt) {
  onSubmitQuery(evt, filmApiTrendFetch);
});

// --------- При открытии сайта ---------------------

if (document.title === 'Filmoteka') {
  fetchUpcomingFilms();
  fetchApiFilms();
  selectFilmsGenres();
  selectYears()

} else getListById('favorite', uid);

function selectYears() {
  for (let i = new Date().getFullYear(); i >= 1900; i -= 1) {
    if (document.getElementById('years')) {
    document.getElementById('years').insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`)
    }
    }
  }
  

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
    onErrorUK();
  }
}

async function fetchApiFilms() {
  try {
    await filmApiTrendFetch.filmsAndGenres().then(data => {
      renderCards(data);
    });
  } catch (error) {
    onErrorEN();
  }
}
//---------------Selected---------------

async function getListId(category, user) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  return await fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      if (result === null) {
        return 0;
      } else return result;
    })
    .catch(error => console.log('error', error));
}

async function selectFilmsGenres() {
  await fetchFilmsGenres().then(genres => {
    document
      .getElementById('genres')
      .insertAdjacentHTML(
        'beforeend',
        genres
          .flatMap(
            genres => `<option value="${genres.id}">${genres.name}</option>`
          )
          .join('')
      );
  });
}

async function fetchFilmsGenres() {
  return await fetch(`${GENRES_URL}?api_key=${API_KEY}&language=${currentLang}`)
    .then(res => res.json())
    .then(data => {
      let genres = data.genres;
      return genres;
    })
    .catch(err => console.log(err));
}

async function filmsAndGenres(data) {
  try {
    const films = data;
    const watched = Object.keys(await getListId('watched', uid));
    const favorite = Object.keys(await getListId('favorite', uid));
    for (let film of films) {
      film.genre_ids = await searchGenres(film.genre_ids);
      film.list = searchList(film.id, 'favorite', 'watched');

      // форматуємо рейтинг
      film.vote_average = film.vote_average.toFixed(1);
      // форматуємо дату виходу фільму
      film.release_date = film.release_date.slice(0, 4);
      if (film.genre_ids.length === 0) {
        switch (currentLang) {
          case 'uk-UA':
            film.genre_ids[0] = 'Жанри не вказані';
            break;

          case 'en-US':
            film.genre_ids[0] = 'No movie genre';
            break;
        }
      }
      if (film.genre_ids.length >= 3) {
        switch (currentLang) {
          case 'uk-UA':
            film.genre_ids[2] = 'Інші';
            break;

          case 'en-US':
            film.genre_ids[2] = 'Other';
            break;
        }
      }
      film.genre_ids = film.genre_ids.slice(0, 3).join(', ');
    }

    function searchList(filmId, fav, watch) {
      let list;

      fav = favorite;
      watch = watched;

      if (fav.includes(filmId.toString())) {
        list = 'favorite';
      } else if (watch.includes(filmId.toString())) {
        list = 'watched';
      }

      return list;
    }

    async function searchGenres(ids) {
      let genresNamesArr = [];
      let searchId = ids;
      let genreName;
      let genres = await fetchFilmsGenres();

      for (let i = 0; i < searchId.length; i += 1) {
        genreName = genres.find(list => list.id === searchId[i]).name;
        genresNamesArr.push(genreName);
      }
      return genresNamesArr;
    }
    return films;
  } catch (error) {
    console.log(error);
  }
}

async function fetchWithGenres(id) {
  return await fetch(
    `${GENRES_ID_URL}?api_key=${API_KEY}&language=${currentLang}&with_genres=${id}`
  )
    .then(response => response.json())
    .then(results => {
      let data = results.results;
      return data;
    })
    .catch(err => console.log(err));
}

async function fetchWithYers(year) {
  return await fetch(
    `${GENRES_ID_URL}?api_key=${API_KEY}&language=${currentLang}&&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`
  )
    .then(response => response.json())
    .then(results => {
      console.log(results)
      let data = results.results;
      return data;
    })
    .catch(err => console.log(err));
}

if (document.getElementById('years')) {
  const year = document.getElementById('years');
    year.addEventListener(
    'change',
    (event = () => {
      console.log(year.value)
      renderYear(year.value);
    })
  );
}

if (document.getElementById('genres')) {
  const genre = document.getElementById('genres');
  genres.addEventListener(
    'change',
    (event = () => {
      renderGenre(genres.value);
    })
  );
}

async function renderGenre(genre) {
 // films = await fetchWithGenres(genre);
  renderCards(await filmsAndGenres(await fetchWithGenres(genre)));
}

async function renderYear(year) {
 // films = await fetchWithYers(year);
  renderCards(await filmsAndGenres(await fetchWithYers(year)));
}

async function fetchUpcomingFilms() {
  try {
    await filmApiTrendFetch.fetchUpcomingFilms().then(data => {
      const makrup = data;
      upcomingList.innerHTML = '';
      upcomingList.insertAdjacentHTML('beforeend', card(makrup));
    });
  } catch (error) {
    onErrorEN();
  }
}

// ------------Модальное окно----------------

// const listFilms = document.querySelector(".card-list")
gallery.addEventListener('click', onCardClick);
const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');
// const trailerCard = document.querySelector('.modal-one-film__window');
const trailerCard = document.querySelector('.modal-one-film__content');

async function onCardClick(event) {
  spinnerOn();
  if (event.target.classList.contains('card-list')) {
    spinnerOff();
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
        console.log(data);
        console.log(filmApiTrendFetch.movie_id);
        modalCard.innerHTML = '';
        modalCard.insertAdjacentHTML('beforeend', markup);
        spinnerOff();
        if (uid === "guest") {
          document.querySelector('.button-queue').disabled = "true";
          document.querySelector('.button-watched').disabled = "true";
        }
          else if (list === 'favorite') {
            switch (currentLang) {
              case 'uk-UA':
                document.querySelector('.button-queue').textContent = 'ВИДАЛИТИ З ЧЕРГИ';
                break;
        
              case 'en-US':
                document.querySelector('.button-queue').textContent = 'REMOVE FROM QUEUE';
                break;
            }
          document.querySelector('.button-queue').name = "delFavorite";
          document.querySelector('.button-queue').classList = "button-queue-del active-but";

        

        } else if (list === 'watched') {
          switch (currentLang) {
            case 'uk-UA':
              document.querySelector('.button-watched').textContent =
                'ВИДАЛИТИ З ПЕРЕГЛЯНУТОГО';
              break;

            case 'en-US':
              document.querySelector('.button-watched').textContent =
                'REMOVE FROM WATCHED';
              break;
          }

          document.querySelector('.button-watched').name = 'delWatched';
          document.querySelector('.button-watched').classList =
            'button-watched-del active-but';
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const videoTrailer = document.querySelector('.card-div');
  videoTrailer.addEventListener('click', onPosterClick);

  const trailerBox = document.querySelector('.trailer__box');
  const trailerWindow = document.querySelector('.trailer__window');
  const closeTrailerBtn = document.querySelector('.trailer__close-btn');

  function closeTrailerModal() {
    trailerWindow.innerHTML = '';
    trailerBox.classList.add('trailer__box--hidden');
    html.classList.remove('disable-scroll-all');
  }

async function onPosterClick() { 
    console.log("Это постер");

    closeTrailerBtn.addEventListener('click', evt => {
      evt.preventDefault();
      closeTrailerModal();
    });

    try {  spinnerOn();
      await filmApiTrendFetch.fetchTrailerMovie().then(data => {
        // const markup = hbsTest(data);
        console.log('Это трейлер:', data.results);

        
        console.log(filmApiTrendFetch.movie_id);
        const res = data.results;
        console.log('Это res:', res[0].key);
        // const mark = res.map(item =>
        //   `<li><iframe id="player" width="640" height="360" src="https://www.youtube.com/embed/${item.key}" title="YouTube video player" controls frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`)

        
        //   console.log(mark);
        trailerWindow.innerHTML = `<iframe
        id="player"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${res[0].key}?autoplay=1"          
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe>`;

      spinnerOff();
      
        
      const player = document.querySelector('#player');

      trailerBox.addEventListener('click', evt => {
        if (evt.target !== trailerBox) {
          spinnerOff();
          // Notiflix.Notify.failure('Sorry, trailer not found 😢');
          return;
        }
        spinnerOff();
        closeTrailerModal();
      });
      trailerBox.classList.remove('trailer__box--hidden');
      html.classList.add('disable-scroll-all');
   


        //  return trailerWindow.insertAdjacentHTML('beforebegin', mark);
        // trailerWindow.innerHTML = result;
        return trailerWindow.innerHTML;
      });
    } catch (error) {
      Notiflix.Notify.failure('Sorry, trailer not found 😢');
      console.log(error);
    }

    // trailerBox.classList.remove('.trailer__box--hidden');
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
