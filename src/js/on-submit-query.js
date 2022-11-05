import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';
import Notiflix from 'notiflix';

const filmApiTrendFetch = new FilmApiTrendFetch();
const gallery = document.querySelector('.card-list');

export default function onSubmitQuery(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value
    .trim()
    .toLowerCase();
  filmApiTrendFetch.query = searchQuery;
  filmApiTrendFetch
    .fetchSearchFilms()
    .then(data => {
      if (data.results.length === 0) {
        gallery.innerHTML = '';
        // тимчасово, далі буде перевірка на мову
        return Notiflix.Notify.failure(
          `The films you requested could not be found!`
        );
      }
      renderCards(data.results);
      // тимчасово, далі буде перевірка на мову
      Notiflix.Notify.success(`We found ${data.total_results} films.`);
    })
    .catch(err => console.log(err));
}
