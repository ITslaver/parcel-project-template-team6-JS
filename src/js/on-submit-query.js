import FilmApiTrendFetch from './serviceApiFilmTrend';
import renderCards from './render-cards';
import Notiflix from 'notiflix';

const filmApiQueryFetch = new FilmApiTrendFetch();
const gallery = document.querySelector('.card-list');

filmApiQueryFetch.fetchFilmsGenres();

export default async function onSubmitQuery(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value
    .trim()
    .toLowerCase();
  filmApiQueryFetch.query = searchQuery;
  // console.log(filmApiQueryFetch.query);
  try {
    const data = await searchFilmsAndGenres();
    if (data.films.length === 0) {
      // gallery.innerHTML = '';
      // тимчасово, далі буде перевірка на мову
      return Notiflix.Notify.failure(
        `The films you requested could not be found!`
      );
    }
    // console.log(data.films);
    renderCards(data.films);
    // тимчасово, далі буде перевірка на мову
    Notiflix.Notify.success(`We found ${data.total_results} films.`);
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------

async function searchFilmsAndGenres() {
  try {
    const response = await filmApiQueryFetch.fetchSearchFilms();
    // console.log(response);
    const data = {
      films: filmApiQueryFetch.films,
      total_results: response.total_results,
    };
    // console.log(data.films);
    const genresIdArrFromApi = filmApiQueryFetch.genres;
    // console.log(genresIdArrFromApi);

    for (let film of data.films) {
      film.genre_ids = searchGenres(film.genre_ids);
      // console.log(film.genre_ids);
      // форматуємо рейтинг
      film.vote_average = film.vote_average.toFixed(1);
      // форматуємо дату виходу фільму
      film.release_date = film.release_date.slice(0, 4);
      // форматуємо кількість жанрів фільму
      if (film.genre_ids.length === 0) {
        film.genre_ids[0] = 'no movie genre';
      }
      if (film.genre_ids.length >= 3) {
        film.genre_ids[2] = 'Other';
      }
      film.genre_ids = film.genre_ids.slice(0, 3).join(', ');
    }

    function searchGenres(ids) {
      let genresNamesArr = [];
      let searchId = ids;
      let genreName;

      for (let i = 0; i < ids.length; i += 1) {
        genreName = genresIdArrFromApi.find(
          list => list.id === searchId[i]
        ).name;
        genresNamesArr.push(genreName);
      }
      return genresNamesArr;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
