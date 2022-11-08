import renderCards from './render-cards';
import Notiflix from 'notiflix';
import { onErrorEN, onErrorUK} from './on-error';
import { spinnerOff, spinnerOn } from './preloader';

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
    localStorage.setItem('totalResult', data.total_results);
    if (data.films.length === 0) {
      // gallery.innerHTML = '';
      // тимчасово, далі буде перевірка на мову
      spinnerOff();
      return Notiflix.Notify.failure(
        `The films you requested could not be found!`
      );
    }
    // console.log(data.films);
    spinnerOff();
    renderCards(data.films);

    // тимчасово, далі буде перевірка на мову
    Notiflix.Notify.success(`We found ${data.total_results} films.`);
  } catch (error) {
    if (instance.currentLang === 'en-US') {
      onErrorEN();
    } else {
      onErrorUK();
    }
  }
}
