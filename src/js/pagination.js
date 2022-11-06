import Pagination from 'tui-pagination';
import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
});

const filmApiTrendFetch = new FilmApiTrendFetch();

pagination.on('afterMove', function (eventData) {
  filmApiTrendFetch.page = eventData.page;
  filmApiTrendFetch
    .filmsAndGenres()
    .then(data => {
      renderCards(data);
    })
    .catch(err => console.log(err));
});
