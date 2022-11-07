const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const SEARCH_FILMS_URL = 'https://api.themoviedb.org/3/search/movie';
const CARD_MOVIE = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '2f44dbe234f7609a16da7327d83f3eb3';
const LOCAL_KEY_GENRES = 'genres';

export default class FilmApiTrendFetch {
  constructor() {
    this.query = '';
    this.page = 1;
    this.currentLang = 'en-US';
    this.genres;
    this.films;
    this.movie_id;
    this.card;
  }

  async fetchFilmsGenres() {
    return await fetch(
      `${GENRES_URL}?api_key=${API_KEY}&language=${this.currentLang}`
    )
      .then(res => res.json())
      .then(data => {
        this.genres = data.genres;
        localStorage.setItem(LOCAL_KEY_GENRES, JSON.stringify(this.genres));

        // return data.genres
      })
      .catch(err => console.log(err));
  }

  async fetchFilmsTrend() {
    return await fetch(
      `${TRENDING_URL}?api_key=${API_KEY}&page=${this.page}&language=${this.currentLang}`
    )
      .then(res => res.json())
      .then(data => {
        this.films = data.results;
        //    return data.results
      })
      .catch(err => console.log(err));
  }

  async filmsAndGenres() {
    try {
      await this.fetchFilmsGenres();
      await this.fetchFilmsTrend();
      const films = this.films;
      const genres = this.genres;

      for (let film of films) {
        film.genre_ids = searchGenres(film.genre_ids);
        // форматуємо рейтинг
        film.vote_average = film.vote_average.toFixed(1);
        // форматуємо дату виходу фільму
        film.release_date = film.release_date.slice(0, 4);
        if (film.genre_ids.length === 0) {
          film.genre_ids[0] = 'no movie genre';
        }
        if (film.genre_ids.length >= 3) {
          film.genre_ids[2] = 'Other';
        }
        film.genre_ids = film.genre_ids.slice(0, 3).join(', ');
      }

      function searchGenres(ids) {
        let genresNamesArr = [];
        let searchId = ids;
        let genreName;

        for (let i = 0; i < ids.length; i += 1) {
          genreName = genres.find(list => list.id === searchId[i]).name;
          genresNamesArr.push(genreName);
        }
        return genresNamesArr;
      }
      return films;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSearchFilms() {
    return await fetch(
      `${SEARCH_FILMS_URL}?api_key=${API_KEY}&language=${this.currentLang}&query=${this.query}`
    )
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        this.films = data.results;
        return data;
      })
      .catch(err => console.log(err));
  }

  async searchFilmsAndGenres() {
    try {
      const response = await this.fetchSearchFilms();
      const data = {
        films: this.films,
        total_results: response.total_results,
      };
      // console.log(data.films);
      const genresIdArrFromApi = this.genres;
      // console.log(genresIdArrFromApi);

      for (let film of data.films) {
        film.genre_ids = searchGenres(film.genre_ids);
        film.vote_average = film.vote_average.toFixed(1);
        // форматуємо дату виходу фільму
        if (!film.release_date) {
          switch (this.currentLang) {
            case 'uk-UA':
              film.release_date = '-----';
              break;

            case 'en-US':
              film.release_date = 'n/f ';
              break;
          }
        }
        film.release_date = film.release_date.slice(0, 4);
        // форматуємо кількість жанрів фільму
        if (film.genre_ids.length === 0) {
          switch (this.currentLang) {
            case 'uk-UA':
              film.genre_ids[0] = 'жанри не вказані';
              break;

            case 'en-US':
              film.genre_ids[0] = 'no movie genre';
              break;
          }
        }
        if (film.genre_ids.length >= 3) {
          switch (this.currentLang) {
            case 'uk-UA':
              film.genre_ids[2] = 'Інші';
              break;

            case 'en-US':
              film.genre_ids[2] = 'Other';
              break;
          }
        }
        film.genre_ids = film.genre_ids.slice(0, 3).join(', ');
      }

      function searchGenres(ids) {
        let genresNamesArr = [];
        let searchId = ids;
        let genreName;

        for (let i = 0; i < ids.length; i += 1) {
          genreName = genresIdArrFromApi.find(
            list => list.id === searchId[i]
          ).name;
          genresNamesArr.push(genreName);
        }
        return genresNamesArr;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilmCard() {
    try {
      return await fetch(
        `${CARD_MOVIE}${this.movie_id}?api_key=${API_KEY}&language=${this.currentLang}`
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          this.card = data;
          return data;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async extendFetchFilmCard() {
    try {
      await this.fetchFilmCard();
      const card = this.card;
      card.title = card.title.toUpperCase();
      card.vote_average = card.vote_average.toFixed(1);
      card.popularity = card.popularity.toFixed(1);
      card.original_title = card.original_title.toUpperCase();

      // processing genres
      card.genres = card.genres.flatMap(genre => genre.name).join(', ');
      return card;
    } catch (error) {
      console.log(error);
    }
  }

  get lang() {
    return this.currentLang;
  }
  set lang(value) {
    this.currentLang = value;
  }

  get currentPage() {
    return this.page;
  }
  set currentPage(value) {
    this.page = value;
  }

  get idFilm() {
    return this.movie_id;
  }
  set idFilm(value) {
    this.movie_id = value;
  }
}
