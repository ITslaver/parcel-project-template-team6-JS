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
    if (instance.currentLang === 'en-US') {
      return Notiflix.Notify.failure(`Please put some query!`);
    } else {
      return Notiflix.Notify.failure(`Введіть запит!`);
    }
  }
  instance.query = searchQuery;
  // console.log(instance.query);
  try {
    const data = await instance.searchFilmsAndGenres();
    localStorage.setItem('totalResult', data.total_results);
    if (data.films.length === 0) {
      // gallery.innerHTML = '';
      // тимчасово, далі буде перевірка на мову
      spinnerOff();
      if (instance.currentLang === 'en-US') {
        return Notiflix.Notify.failure(
          `The films you requested could not be found!`
        );
      } else {
        return Notiflix.Notify.failure(`За вашим запитом фільмів не знайдено!`);
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
    if (instance.currentLang === 'en-US') {
      return Notiflix.Notify.success(`We found ${data.total_results} films.`);
    } else {
      return Notiflix.Notify.success(
        `Ми знайшли ${data.total_results} фільмів.`
      );
    }
  } catch (error) {
    if (instance.currentLang === 'en-US') {
      onErrorEN();
    } else {
      onErrorUK();
    }
  }
}
