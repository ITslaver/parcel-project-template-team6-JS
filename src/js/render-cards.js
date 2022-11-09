import card from '../templates/card.hbs';

const gallery = document.querySelector('.card-list');

export default function renderCards(arr) {
  const makrup = card(arr);
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', makrup);
  noPosterCard();
}

function noPosterCard() {
  const noPosterCards = document.querySelectorAll(
    "img[src='https://image.tmdb.org/t/p/w500']"
  );

  for (const card of noPosterCards) {
    card.className = 'visually-hidden';
  }
}
