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

submitRef.addEventListener('submit', onSubmit);
let searchQuery = '';

function onSubmit(e) {
  e.preventDefault();
  console.log(e.target.elements.searchQuery.value);
  searchQuery = e.target.elements.searchQuery.value;
}

pagination.on('afterMove', function (eventData) {
  if (searchQuery === '') {
    filmApiTrendFetch.page = eventData.page;
    filmApiTrendFetch
      .filmsAndGenres()
      .then(data => {
        console.log(data);
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
