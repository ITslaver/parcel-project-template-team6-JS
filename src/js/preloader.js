const preloaderMask = document.querySelector('.preloader-mask');
const preloader = document.querySelector('.preloader');

export function onLoadPreloaderHide() {
  preloaderMask.classList.add('visually-hidden', 'preloader-hide');
  preloader.classList.add('visually-hidden', 'preloader-hide');
}

export function spinnerOn() {
  const main = document.querySelector('main');
  main.insertAdjacentHTML(
    'afterbegin',
    `<div class="spinner-mask"><div class="spinner"></div></div>`
  );
}
export function spinnerOff() {
  const maskSpinner = document.querySelector('.spinner-mask');
  maskSpinner.remove();
}
