import Pagination from 'tui-pagination';
import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

const filmApiTrendFetch = new FilmApiTrendFetch();
const submitRef = document.querySelector('#search-form');

submitRef.addEventListener('submit', onSubmitforPaginate);
let searchQuery = '';

async function onSubmitforPaginate(e) {
  e.preventDefault();
  pagination.reset();
  searchQuery = e.target.elements.searchQuery.value;
  try {
    const totalFilmsForPaginate = await localStorage.getItem('totalResult');
    await pagination.setTotalItems(Number(totalFilmsForPaginate));
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
      })
      .catch(err => console.log(err));
  } else {
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch.query = searchQuery;
    filmApiTrendFetch
      .searchFilmsAndGenres()
      .then(data => {
        // console.log(data);
        renderCards(data.films);
      })
      .catch(err => console.log(err));
  }
});
