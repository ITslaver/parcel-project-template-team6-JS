import renderCards from './render-cards';
import Notiflix from 'notiflix';
import { onErrorEN, onErrorUK } from './on-error';
import { spinnerOff, spinnerOn } from './preloader';

export default async function onSubmitQuery(evt, instance) {
  evt.preventDefault();
  spinnerOn();
  const searchQuery = evt.target.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (searchQuery === '') {
    spinnerOff();
    if (instance.currentLang === 'uk-UA') {
      return Notiflix.Notify.failure(`Введіть запит!`);
    } else {
      return Notiflix.Notify.failure(`Please put some query!`);
    }
  }
  instance.query = searchQuery;
  // console.log(instance.query);
  try {
    const data = await instance.searchFilmsAndGenres();
    // localStorage.setItem('totalResult', data.total_results);
    if (data.films.length === 0) {
      // gallery.innerHTML = '';
      // тимчасово, далі буде перевірка на мову
      spinnerOff();
      if (instance.currentLang === 'uk-UA') {
        return Notiflix.Notify.failure(`За вашим запитом фільмів не знайдено!`);
      } else {
        return Notiflix.Notify.failure(
          `The films you requested could not be found!`
        );
      }
    }
    // console.log(data.films);
    spinnerOff();
    renderCards(data.films);

    // for (const film of data.films) {
    //   if (film.poster_path === '') {
    //     noPosterCard.classList.add('visually-hidden');
    //   }
    // }
    if (instance.currentLang === 'uk-UA') {
      return Notiflix.Notify.success(
        `Ми знайшли ${data.total_results} фільмів.`
      );
    } else {
      return Notiflix.Notify.success(`We found ${data.total_results} films.`);
    }
  } catch (error) {
    if (instance.currentLang === 'uk-UA') {
      onErrorUK();
    } else {
      onErrorEN();
    }
  }
}
