import errorBannerWhite from '../images/404.jpg';

export default function onError() {
  document.body.innerHTML = '';

  document.body.insertAdjacentHTML(
    'beforeend',
    `<p class='error-text'><a href="./index.html" class='return-hp-link'>Return to our Homepage</a></p><img src=${errorBannerWhite} alt="404" class=''error-img>`
  );
}
