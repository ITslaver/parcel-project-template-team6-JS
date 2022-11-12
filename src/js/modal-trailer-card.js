// import Notiflix from 'notiflix';
// import FilmApiTrendFetch from './serviceApiFilmTrend.js';

// const filmApiTrendFetch = new FilmApiTrendFetch();

// const trailerBox = document.querySelector('.trailer__box');
// const trailerCard = document.querySelector('.trailer__window');
// const closeTrailerBtn = document.querySelector('.trailer__close-btn');
// const html = document.querySelector('html');



// function closeTrailerModal() {
//     trailerCard.innerHTML = '';
//     trailerBox.classList.add('trailer__box--hidden');
//     html.classList.remove('disable-scroll-all');
//   }

// export async function onPosterClick() {
//     console.log("Это постер");

//     closeTrailerBtn.addEventListener('click', evt =>{
//       evt.preventDefault();
//       closeTrailerModal();
//   })

//     try {
//       await filmApiTrendFetch.fetchTrailerMovie().then(data => {
//         // const markup = hbsTest(data);
//         console.log("Это трейлер:", data.results);

//         console.log(filmApiTrendFetch.movie_id);
//         const res = data.results;
//         console.log('Это res:', res[0].key);
//         // const mark = res.map(item =>          
//         //   `<li><iframe id="player" width="640" height="360" src="https://www.youtube.com/embed/${item.key}" title="YouTube video player" controls frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`)

//         //   console.log(mark);
//            trailerCard.innerHTML = `<iframe
//         id="player"
//         width="640"
//         height="360"
//         src="https://www.youtube.com/embed/${res[0].key}?autoplay=1"          
//         frameborder="0"
//         allow="autoplay"
//         allowfullscreen
//       ></iframe>`;
        
//       const player = document.querySelector('#player');

//       trailerBox.addEventListener('click', evt => {
//         if (evt.target !== trailerBox) {
//           return;
//         }
//         closeTrailerModal();
//       });
//       trailerBox.classList.remove('trailer__box--hidden');

//         //  return trailerCard.insertAdjacentHTML('beforebegin', mark);
//         // trailerCard.innerHTML = result;
//         return trailerCard.innerHTML;
//       });
//     } catch (error) {
//       Notiflix.Notify.failure('Sorry, trailer not found 😢');
//       console.log(error);
//     }

//     trailerBox.classList.remove('.trailer__box--hidden');

//   }