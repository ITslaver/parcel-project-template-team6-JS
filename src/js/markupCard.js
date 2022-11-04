export default function card(data) {
  return data.results
    .map(
      item => ` <li class='card'>
    <div class='front'>
      <img
        src='https://image.tmdb.org/t/p/w342${item.poster_path}'
        alt=''
        width='340'
      />
      <div class='card-box'>
        <h3 class='card-title'>${item.title}</h3>
        <p class='text'>${item.genre_ids}| ${item.release_date}</p>
      </div>
      <div class='rating'>
        <span class='rating-value'>${item.vote_average.toFixed(1)}</span>
      </div>
    </div>
    <div class='back'>
      <p class='back-text'>${item.overview}</p>
      <button type='button' id='${item.id}'>Add to libriary</button>
    </div>
  </li>`
    )
    .join('');
}
