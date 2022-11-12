import Pagination from 'tui-pagination';
import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';
import { spinnerOff, spinnerOn } from './preloader';

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
console.log(curentPage);

submitRef.addEventListener('submit', onSubmitforPaginate);
let searchQuery = '';
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

pagination.on('afterMove', function (eventData) {
  if (searchQuery === '') {
    spinnerOn();
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch
      .filmsAndGenres()
      .then(data => {
        renderCards(data);
        spinnerOff();
      })
      .catch(err => console.log(err));
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
