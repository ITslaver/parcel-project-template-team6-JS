import Pagination from 'tui-pagination';
import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';

const filmApiTrendFetch = new FilmApiTrendFetch();

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

const submitRef = document.querySelector('#search-form');
const paginateSectionRef = document.querySelector('.pagination-section');

submitRef.addEventListener('submit', onSubmitforPaginate);
let searchQuery = '';

async function onSubmitforPaginate(e) {
  e.preventDefault();
  paginateSectionRef.classList.remove('visually-hidden');
  pagination.reset();
  searchQuery = e.target.elements.searchQuery.value;
  filmApiTrendFetch.query = searchQuery;
  try {
    filmApiTrendFetch.fetchSearchFilms().then(data => {
      if (data.total_results <= 20) {
        paginateSectionRef.classList.add('visually-hidden');
      } else getTotalItems(data);
    });
  } catch (error) {
    console.log(error);
  }
}

pagination.on('afterMove', function (eventData) {
  if (searchQuery === '') {
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch
      .filmsAndGenres()
      .then(data => {
        renderCards(data);
        console.log(data);
      })
      .catch(err => console.log(err));
  } else {
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch.query = searchQuery;
    filmApiTrendFetch
      .searchFilmsAndGenres()
      .then(data => {
        console.log(data.films);
        renderCards(data.films);
      })
      .catch(err => console.log(err));
  }
});

async function getTotalItems(datas) {
  const taceResultbyFetch = await datas.total_results;
  await pagination.setTotalItems(taceResultbyFetch);
}
