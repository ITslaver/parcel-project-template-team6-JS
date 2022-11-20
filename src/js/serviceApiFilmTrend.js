import { uid } from './cabinet';

export const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const SEARCH_FILMS_URL = 'https://api.themoviedb.org/3/search/movie';
const CARD_MOVIE = 'https://api.themoviedb.org/3/movie/';
const TRAILER_MOVIE = 'https://api.themoviedb.org/3/movie/';
export const API_KEY = '2f44dbe234f7609a16da7327d83f3eb3';
const UPCOMING_URL = 'https://api.themoviedb.org/3/movie/upcoming';

const LOCAL_KEY_GENRES = 'genres';
export const GENRES_ID_URL = 'https://api.themoviedb.org/3/discover/movie';
const saveLang = localStorage.getItem('lang');
let currentLang;
currentLang = saveLang;

export default class FilmApiTrendFetch {
  constructor() {
    this.query = '';
    this.page = 1;
    this.currentLang;
    this.genres;
    this.films;
    this.movie_id;
    this.card;
    this.curentGenre;
  }

  async fetchFilmsGenres() {
    // console.log("фильмы конструктор:",this.currentLang);
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
  async fetchWithGenres() {
    // console.log("жанры конструктор:",this.currentLang);
    // console.log("query конструктор:",this.query);
    return await fetch(
      `${GENRES_ID_URL}?api_key=${API_KEY}&with_genres=${this.curentGenre}&page=${this.page}`
    )
      .then(response => response.json())
      .then(results => {
        this.curentGenre = results.results;
        let data = results.results;
        return data;
      })
      .catch(err => console.log(err));
  }

  async fetchFilmsTrend() {
    // console.log(localStorage);
    return await fetch(
      `${TRENDING_URL}?api_key=${API_KEY}&page=${this.page}&language=${this.currentLang}`
    )
      .then(res => res.json())
      .then(data => {
        this.films = data.results;
        return data.results;
      })
      .catch(err => console.log(err));
  }

  async getListId(category, user) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    return await fetch(
      `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        if (result === null) {
          return 0;
        } else return result;
      })
      .catch(error => console.log('error', error));
  }
  async filmsAndGenresAndForGenre() {
    try {
      await this.fetchWithGenres();
      await this.fetchFilmsGenres();
      const films = this.curentGenre;
      const genres = this.genres;
      const watched = Object.keys(await this.getListId('watched', uid));
      const favorite = Object.keys(await this.getListId('favorite', uid));

      for (let film of films) {
        film.genre_ids = searchGenres(film.genre_ids);
        film.list = searchList(film.id, 'favorite', 'watched');

        // форматуємо рейтинг
        film.vote_average = film.vote_average.toFixed(1);
        // форматуємо дату виходу фільму
        film.release_date = film.release_date.slice(0, 4);
        if (film.genre_ids.length === 0) {
          switch (this.currentLang) {
            case 'uk-UA':
              film.genre_ids[0] = 'Жанри не вказані';
              break;

            case 'en-US':
              film.genre_ids[0] = 'No movie genre';
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

      function searchList(filmId, fav, watch) {
        let list;

        fav = favorite;
        watch = watched;

        if (fav.includes(filmId.toString())) {
          list = 'favorite';
        } else if (watch.includes(filmId.toString())) {
          list = 'watched';
        }

        return list;
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

  async filmsAndGenres() {
    try {
      await this.fetchFilmsGenres();
      await this.fetchFilmsTrend();
      const films = this.films;
      const genres = this.genres;
      const watched = Object.keys(await this.getListId('watched', uid));
      const favorite = Object.keys(await this.getListId('favorite', uid));

      for (let film of films) {
        film.genre_ids = searchGenres(film.genre_ids);
        film.list = searchList(film.id, 'favorite', 'watched');

        // форматуємо рейтинг
        film.vote_average = film.vote_average.toFixed(1);
        // форматуємо дату виходу фільму
        film.release_date = film.release_date.slice(0, 4);
        if (film.genre_ids.length === 0) {
          switch (this.currentLang) {
            case 'uk-UA':
              film.genre_ids[0] = 'Жанри не вказані';
              break;

            case 'en-US':
              film.genre_ids[0] = 'No movie genre';
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

      function searchList(filmId, fav, watch) {
        let list;

        fav = favorite;
        watch = watched;

        if (fav.includes(filmId.toString())) {
          list = 'favorite';
        } else if (watch.includes(filmId.toString())) {
          list = 'watched';
        }

        return list;
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
      `${SEARCH_FILMS_URL}?api_key=${API_KEY}&page=${this.page}&language=${this.currentLang}&query=${this.query}`
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
      await this.fetchFilmsGenres();
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
          film.release_date = '-----';
        }
        film.release_date = film.release_date.slice(0, 4);
        // форматуємо кількість жанрів фільму
        if (film.genre_ids.length === 0) {
          if (this.currentLang === 'uk-UA') {
            film.genre_ids[0] = 'Жанри не вказані';
          } else {
            film.genre_ids[0] = 'No movie genre';
          }
        }
        if (film.genre_ids.length >= 3) {
          if (this.currentLang === 'uk-UA') {
            film.genre_ids[2] = 'Інші';
          } else {
            film.genre_ids[2] = 'Other';
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

  async fetchTrailerMovie() {
    try {
      return await fetch(
        `${TRAILER_MOVIE}${this.movie_id}/videos?api_key=${API_KEY}&language=${this.currentLang}`
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);

          this.trailer = data;
          return data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUpcomingFilms() {
    try {
      return await fetch(
        `${UPCOMING_URL}?api_key=${API_KEY}&language=${this.currentLang}`
      )
        .then(res => res.json())
        .then(data => {
          return data.results
          // let currentPosters = [];
          // for (let i = 0; i <= 7; i += 1) {
          //   currentPosters.push(data.results[i]);
          // }
          // return currentPosters;
        });
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
