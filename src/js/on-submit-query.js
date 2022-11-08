import renderCards from './render-cards';
import Notiflix from 'notiflix';
import onError from './on-error';
import { spinnerOf, spinnerOn } from './preloader';

export default async function onSubmitQuery(evt, instance) {
  evt.preventDefault();
  spinnerOn();
  const searchQuery = evt.target.elements.searchQuery.value
    .trim()
    .toLowerCase();
  instance.query = searchQuery;
  // console.log(instance.query);
  try {
    const data = await instance.searchFilmsAndGenres();
    if (data.films.length === 0) {
      // gallery.innerHTML = '';
      // тимчасово, далі буде перевірка на мову
      return Notiflix.Notify.failure(
        `The films you requested could not be found!`
      );
    }
    // console.log(data.films);
    spinnerOf();
    renderCards(data.films);

    // тимчасово, далі буде перевірка на мову
    Notiflix.Notify.success(`We found ${data.total_results} films.`);
  } catch (error) {
    console.log(error);
    // onError();
  }
}
