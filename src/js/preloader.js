const preloaderMask = document.querySelector('.preloader-mask');
const preloader = document.querySelector('.preloader');

export default function onLoad() {
  preloaderMask.classList.add('visually-hidden');
  preloader.classList.add('visually-hidden');
  preloaderMask.classList.add('preloader-hide');
  preloader.classList.add('preloader-hide');
}
