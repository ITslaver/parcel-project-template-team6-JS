import card from '../templates/card.hbs';

const gallery = document.querySelector('.card-list');

export default function renderCards(arr) {
  const makrup = card(arr);
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', makrup);
}
