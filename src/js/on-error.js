import errorBannerWhite from '../images/404.jpg';

export function onErrorEN() {
  document.body.innerHTML = '';

  document.body.insertAdjacentHTML(
    'beforeend',
    `<p class='error-text'><a href="./index.html" class='return-hp-link'>Return to our Homepage</a></p><img src=${errorBannerWhite} alt="404" class=''error-img>`
  );
}

export function onErrorUK() {
  document.body.innerHTML = '';

  document.body.insertAdjacentHTML(
    'beforeend',
    `<p class='error-text'><a href="./index.html" class='return-hp-link'>Повернутись на Головну сторінку</a></p><img src=${errorBannerWhite} alt="404" class=''error-img>`
  );
}
