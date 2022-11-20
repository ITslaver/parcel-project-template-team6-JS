import Pagination from 'tui-pagination';
import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';
import { spinnerOff, spinnerOn } from './preloader';

import { async } from 'regenerator-runtime';
import { removeAllListeners } from 'process';

const GENRES_ID_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = '2f44dbe234f7609a16da7327d83f3eb3';

const filmApiTrendFetch = new FilmApiTrendFetch();

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  // centerAlign: true,
});

const submitRef = document.querySelector('#search-form');
const paginateSectionRef = document.querySelector('.pagination-section');
const curentPage = document.querySelector('title');
const chooseGenreRef = document.querySelector('#genres');

submitRef.addEventListener('submit', onSubmitforPaginate);

try {
  chooseGenreRef.addEventListener('change', onSelectGenres);
} catch {}

// submitRef.addEventListener('submit', onSubmitforPaginate);
// chooseGenreRef.addEventListener('change', onSelectGenres);

let searchQuery = '';
let searchGenres = '';

if (curentPage.text !== 'Filmoteka') {
  paginateSectionRef.classList.add('visually-hidden');
}

async function onSubmitforPaginate(e) {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value;
  filmApiTrendFetch.query = searchQuery;
  paginateSectionRef.classList.remove('visually-hidden');
  if (searchQuery === '') {
    return;
  }
  pagination.reset();

  try {
    filmApiTrendFetch.fetchSearchFilms().then(data => {
      if (data.total_results <= 20) {
        paginateSectionRef.classList.add('visually-hidden');
      }
      getTotalItems(data);
    });
  } catch (error) {
    console.log(error);
  }
}

async function onSelectGenres() {
  searchGenres = chooseGenreRef.value;
  await pagination.setTotalItems(await fetchWithGenresBypaginate(searchGenres));
  pagination.reset();
}

pagination.on('afterMove', function (eventData) {
  // 
  const saveLang = localStorage.getItem('lang');
  console.log('saveLang', saveLang);
  filmApiTrendFetch.currentLang = saveLang;
  // 
  if (searchQuery === '' && searchGenres === '') {
    spinnerOn();
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch
      .filmsAndGenres()
      .then(data => {
        renderCards(data);
      })
      .catch(err => console.log(err));
    spinnerOff();
  } else if (searchGenres !== '') {
    spinnerOn();
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch.curentGenre = searchGenres;
    filmApiTrendFetch
      .filmsAndGenresAndForGenre()
      .then(data => {
        renderCards(data);
      })
      .catch(err => console.log(err));
    spinnerOff();
    // fetchWithGenres(searchGenres).then(data => {
    //   renderCards(data);
    //   spinnerOff();
    // });
  } else {
    spinnerOn();
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch.query = searchQuery;
    filmApiTrendFetch
      .searchFilmsAndGenres()
      .then(data => {
        renderCards(data.films);
        spinnerOff();
      })
      .catch(err => console.log(err));
  }
});

async function getTotalItems(datas) {
  const taceResultbyFetch = await datas.total_results;
  await pagination.setTotalItems(taceResultbyFetch);
  pagination.reset();
}

async function fetchWithGenresBypaginate(searchGenres) {
  return await fetch(
    `${GENRES_ID_URL}?api_key=${API_KEY}&with_genres=${searchGenres}`
  )
    .then(response => response.json())
    .then(results => {
      let data = results.total_pages;
      return data;
    })
    .catch(err => console.log(err));
}
