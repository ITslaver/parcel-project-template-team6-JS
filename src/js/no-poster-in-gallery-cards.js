export default function noPosterCard() {
  const noPosterCards = document.querySelectorAll(
    "img[src='https://image.tmdb.org/t/p/w500']"
  );

  for (const card of noPosterCards) {
    card.className = 'visually-hidden';
  }
}
