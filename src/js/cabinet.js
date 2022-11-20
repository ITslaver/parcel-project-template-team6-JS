import { initializeApp } from 'firebase/app';
import card from '../templates/card.hbs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { save, load, remove } from './storage';
import Notiflix from 'notiflix';
import { title } from 'process';
import { async } from 'regenerator-runtime';
import './serviceApiFilmTrend';
import { spinnerOff, spinnerOn } from './preloader';
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: 'AIzaSyCBVttcy80wPYz_TQ1cewc4jaBreMn9eR8',
  authDomain: 'my-project-1521664687668.firebaseapp.com',
  databaseURL:
    'https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'my-project-1521664687668',
  storageBucket: 'my-project-1521664687668.appspot.com',
  messagingSenderId: '1077728122567',
  appId: '1:1077728122567:web:a129b85356da4e98c390e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const KEY_ID = 'userId';
let currentLang;
// let currentLang = 'en-US';
const saveLang = localStorage.getItem('lang');
currentLang = saveLang;

export let uid;

getUserId();
authStatus();

//---------------------------- Слушатели --------------------------------
document.getElementById('header').addEventListener('submit', cabinetAction);
document.getElementById('card-div').addEventListener('click', itemAction);
document.querySelector('#exit').addEventListener('click', onSignOut);
try {
  document
    .querySelector('.sign-in-modal')
    .addEventListener('submit', onSignInModalForm);
  document
    .querySelector('.authrization-modal')
    .addEventListener('submit', onAuthrizationModalForm);
} catch {}

//---------------------------Функции кнопок в карточке---------------------------

function itemAction(event) {
  event.preventDefault();
  if (event.target.name === 'addFavorite') {
    delItem(event.target.id, uid, 'watched');
    setList('favorite', uid, event.target.id, event.target.dataset.card);
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent =
        'favorite';
      document.getElementById('list' + event.target.id).classList = 'favorite';
      document.getElementById(event.target.id).dataset.list = 'favorite';
    }
    switch (currentLang) {
      case 'uk-UA':
        document.querySelector('.button-queue').textContent =
          'ВИДАЛИТИ З ЧЕРГИ';
        break;

      case 'en-US':
        document.querySelector('.button-queue').textContent =
          'REMOVE FROM QUEUE';
        break;
    }
    document.querySelector('.button-queue').name = 'delFavorite';
    document.querySelector('.button-queue').classList =
      'button-queue-del active';

    if (document.querySelector('.button-watched-del')) {
      switch (currentLang) {
        case 'uk-UA':
          document.querySelector('.button-watched-del').textContent =
            'ДОДАТИ ДО ПЕРЕГЛЯНУТОГО';
          break;

        case 'en-US':
          document.querySelector('.button-watched-del').textContent =
            'ADD TO WATCHED';
          break;
      }
      document.querySelector('.button-watched-del').name = 'addWatched';
      document.querySelector('.button-watched-del').classList =
        'button-watched';
    }
    switch (currentLang) {
      case 'uk-UA':
        Notiflix.Notify.success('успішно додано до Черги перегляду');
        break;

      case 'en-US':
        Notiflix.Notify.success('success added to QUEUE');
        break;
    }
  } else if (event.target.name === 'addWatched') {
    delItem(event.target.id, uid, 'favorite');
    setList('watched', uid, event.target.id, event.target.dataset.card);
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = 'watched';
      document.getElementById('list' + event.target.id).classList = 'watched';
      document.getElementById(event.target.id).dataset.list = 'watched';
    }
    switch (currentLang) {
      case 'uk-UA':
        document.querySelector('.button-watched').textContent =
          'ВИДАЛИТИ З ПЕРЕГЛЯНУТОГО';
        break;

      case 'en-US':
        document.querySelector('.button-watched').textContent =
          'REMOVE FROM WATCHED';
        break;
    }

    document.querySelector('.button-watched').name = 'delWatched';
    document.querySelector('.button-watched').classList =
      'button-watched-del active';
    if (document.querySelector('.button-queue-del')) {
      switch (currentLang) {
        case 'uk-UA':
          document.querySelector('.button-queue-del').textContent =
            'ДОДАТИ ДО ЧЕРГИ';
          break;

        case 'en-US':
          document.querySelector('.button-queue-del').textContent =
            'ADD TO QUEUE';
          break;
      }
      document.querySelector('.button-queue-del').name = 'addFavorite';
      document.querySelector('.button-queue-del').classList = 'button-queue';
    }
    switch (currentLang) {
      case 'uk-UA':
        Notiflix.Notify.success('успішно додано до Переглянутого');
        break;

      case 'en-US':
        Notiflix.Notify.success('success added to Watched');
        break;
    }
  } else if (event.target.name === 'delFavorite') {
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = '';
      document.getElementById('list' + event.target.id).classList = '';
    }
    switch (currentLang) {
      case 'uk-UA':
        document.querySelector('.button-queue-del').textContent =
          'ДОДАТИ ДО ЧЕРГИ';
        break;

      case 'en-US':
        document.querySelector('.button-queue-del').textContent =
          'ADD TO QUEUE';
        break;
    }
    document.querySelector('.button-queue-del').name = 'addFavorite';
    document.querySelector('.button-queue-del').classList = 'button-queue';
    delItem(event.target.id, uid, 'favorite');
    switch (currentLang) {
      case 'uk-UA':
        Notiflix.Notify.success('успішно видалено з Черги перегляду');
        break;

      case 'en-US':
        Notiflix.Notify.success('success remove from QUEUE');
        break;
    }
  } else if (event.target.name === 'delWatched') {
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = '';
      document.getElementById('list' + event.target.id).classList = '';
    }
    switch (currentLang) {
      case 'uk-UA':
        document.querySelector('.button-watched-del').textContent =
          'ДОДАТИ ДО ПЕРЕГЛЯНУТОГО';
        break;

      case 'en-US':
        document.querySelector('.button-watched-del').textContent =
          'ADD TO WATCHED';
        break;
    }

    document.querySelector('.button-watched-del').name = 'addWatched';
    document.querySelector('.button-watched-del').classList = 'button-watched';
    delItem(event.target.id, uid, 'watched');
    switch (currentLang) {
      case 'uk-UA':
        Notiflix.Notify.success('успішно видалено з Переглянутого');
        break;

      case 'en-US':
        Notiflix.Notify.success('success remove from Watched');
        break;
    }
  }
}

//------------------------Функции кнопок в модальном окне ---------------------------

function onSignInModalForm(e) {
  e.preventDefault();
  const email = e.target.querySelector('#email-to-sign-in').value;
  const password = e.target.querySelector('#password-to-sign-in').value;
  const name = e.target.querySelector('#name').value;
  authFormReg(email, password, name);
}

function onAuthrizationModalForm(e) {
  e.preventDefault();
  const email = e.target.querySelector('#email-to-authorize').value;
  const password = e.target.querySelector('#password-to-authorize').value;

  authFormSend(email, password);
}

function onSignOut(e) {
  authOut();
  window.location.href = '../index.html';
}

//------------------------Функции кнопок в кабинете ---------------------------

function cabinetAction(event) {
  event.preventDefault();

  if (event.submitter.id === 'exit') {
    authOut();
  } else if (event.submitter.id === 'favorite') {
    console.log(event.submitter.classList);
    document.getElementById('watched').classList.toggle('active-but');
    getListById('favorite', uid);
    event.submitter.classList.toggle('active-but');
  } else if (event.submitter.id === 'watched') {
    console.log(event.submitter.classList);
    document.getElementById('favorite').classList.toggle('active-but');
    getListById('watched', uid);
    event.submitter.classList.toggle('active-but');
  }
}

//---------------------------Отрисовка фильмов с списка-------------------------
async function fetchFilmCard(id) {
  try {
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2f44dbe234f7609a16da7327d83f3eb3&language=${currentLang}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        return data;
      });
  } catch (error) {
    console.log(error);
  }
}

async function extendFetchFilmCard(id) {
  try {
    const card = await fetchFilmCard(id);
    card.title = card.title.toUpperCase();
    card.vote_average = card.vote_average.toFixed(1);
    card.popularity = card.popularity.toFixed(1);
    card.original_title = card.original_title.toUpperCase();

    if (!card.release_date) {
      card.release_date = '-----';
    } else card.release_date = card.release_date.slice(0, 4);

    let genre_ids = [];
    for (const item of card.genres) {
      genre_ids.push(item.name);
    }

    // форматуємо кількість жанрів фільму
    if (genre_ids.length === 0) {
      switch (currentLang) {
        case 'uk-UA':
          genre_ids[0] = 'Жанри не вказані';
          break;

        case 'en-US':
          genre_ids[0] = 'No movie genre';
          break;
      }
    }
    if (genre_ids.length >= 3) {
      switch (currentLang) {
        case 'uk-UA':
          genre_ids[2] = 'Інші';
          break;

        case 'en-US':
          genre_ids[2] = 'Other';
          break;
      }
    }

    card.genre_ids = genre_ids.slice(0, 3).join(', ');
    return card;
  } catch (error) {
    console.log(error);
  }
}

export async function getListById(category, user) {
  const list = Object.keys(await getList(category, user));
  console.log(list.length);
  const listItems = [];
  spinnerOn();
  for (const item of list) {
    // console.log(item);
    const film = await extendFetchFilmCard(item);
    film.list = category;
    listItems.push(film);
  }
  spinnerOff();
  console.log(listItems);
  document.getElementById('card-list').length = 0;
  return document
    .getElementById('card-list')
    .insertAdjacentHTML('beforeend', card(listItems));
}

//---------------------------Получение фильмов с базы---------------------------

export async function getList(category, user) {
  console.log(category, user);
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
      console.log('в ' + category, result);
      document.getElementById('card-list').innerHTML = '';
      if (result === null && category === 'watched') {
        switch (currentLang) {
          case 'uk-UA':
            document.getElementById(
              'card-list'
            ).innerHTML = `<li><p>Нажаль ви не ще не передивилися жодного фільму, тож мерщій хапайте попкорн та переходьте до списку запланованого перегляду</p></li>`;
            document.querySelector('.footer').classList.add('drop-down');
            break;

          case 'en-US':
            document.getElementById(
              'card-list'
            ).innerHTML = `<li><p>Oops! It looks like you haven't watched anything yet.</p></li>`;
            document.querySelector('.footer').classList.add('drop-down');
            break;
        }

        console.log(
          'Нажаль ви не ще не передивилися жодного фільму, тож мерщій хапайте попкорн та переходьте до списку запланованого перегляду'
        );
        return 0;
      }
      if (result === null && category === 'favorite') {
        switch (currentLang) {
          case 'uk-UA':
            document.getElementById(
              'card-list'
            ).innerHTML = `<li><p>Нажаль ви не ще не обрали жодного фільму, тож мерщій переходьте до списку популярних фільмів та додавайте їх до списку запланованого перегляду</p></li>`;
            document.querySelector('.footer').classList.add('drop-down');
            break;

          case 'en-US':
            document.getElementById(
              'card-list'
            ).innerHTML = `<li><p>Oops! It looks like you haven't selected anything yet! Add more movies to your queue and enjoy :)</p></li>`;
            document.querySelector('.footer').classList.add('drop-down');
            break;
        }
        console.log(
          'Нажаль ви не ще не обрали жодного фільму, тож мерщій переходьте до списку популярних фільмів та додавайте їх до списку запланованого перегляду'
        );
        return 0;
      } else 
      document.querySelector('.footer').classList.remove('drop-down');
      return result;
      //  .getElementById('card-list')
      //  .insertAdjacentHTML('beforeend', card(result));
    })
    .catch(error => console.log('error', error));
}

//---------------------------Запись фильмов в базу---------------------------

function setList(category, user, itemId, card) {
  console.log(card);
  const raw = `{"${itemId}" : {${card}}}`;
  //
  const requestOptions = {
    method: 'PATCH',
    body: raw,
    redirect: 'follow',
  };

  fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  console.log(itemId + ' успешно добавлено в ' + category);
  if (document.title === 'Library') {
    if (category === 'favorite') {
      getList('watched', user);
    } else getList('favorite', user);
  }
}

//---------------------Запись страници на которой пользователь-----------------------

export function setPage(category, user) {
  const raw = `{"page" : "${category}"}`;
  //
  const requestOptions = {
    method: 'PATCH',
    body: raw,
    redirect: 'follow',
  };

  fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//---------------------Получение страници на которой пользователь-----------------------

export function getPage(user) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/page.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      console.log(result.keys());
      return result;
    })
    .catch(error => console.log('error', error));
}

//---------------------------Удаление фильмов с базы---------------------------

async function delItem(itemId, user, category) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };

  fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}/${itemId}.json`,
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  if (document.title === 'Library') {
    if (document.querySelector(`[data-film="${itemId}"]`)) {
      document.querySelector(`[data-film="${itemId}"]`).style.display = 'none';
    }
    console.log('оновлено ' + category);
  }
}

//-------------------------Получение данных пользователя ---------------------------

export function authStatus() {
  const auth = getAuth();
  return onAuthStateChanged(auth, user => {
    if (user) {
      uid = user.uid;
      document.querySelector('.username').textContent = user.name;
      console.log('користувач ' + uid + user.displayName);
      return (
        uid,
        (document.querySelector('.username').textContent = user.displayName)
      );
    } else {
      console.log('вхід не виконано');
      // ...
    }
  });
}

//---------------------------Авторизация---------------------------

function authFormSend(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      switch (currentLang) {
        case 'uk-UA':
          Notiflix.Notify.success(
            'Вхід успішний ' + userCredential.user.displayName
          );
          break;

        case 'en-US':
          Notiflix.Notify.success(
            'Login success ' + userCredential.user.displayName
          );
          break;
      }

      // document.querySelector('.username').textContent = user.email;
      save(KEY_ID, userCredential.user.uid);
      document
        .querySelector('[data-authrization-modal]')
        .classList.add('is-hidden');
      renderSingIn();
    })
    .catch(error => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      Notiflix.Notify.failure(error.message);
    });
}

//---------------------------Отправка запроса регистрации---------------------------

async function authFormReg(email, password, name) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password, name)
    .then(userCredential => {
      // Signed in
      console.log('User', userCredential.user);
      console.log('User', userCredential.displayName);
      switch (currentLang) {
        case 'uk-UA':
          Notiflix.Notify.success(
            'Користувача успішно створено ' +
              userCredential.user.email +
              userCredential.user.displayName
          );
          break;

        case 'en-US':
          Notiflix.Notify.success(
            'User success create ' +
              userCredential.user.email +
              userCredential.user.displayName
          );
          break;
      }
      // document.querySelector('.username').textContent = user.email;
      save(KEY_ID, userCredential.user.uid);
      document.querySelector('[data-sign-in-modal]').classList.add('is-hidden');
      renderSingIn();
    })
    .catch(error => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      Notiflix.Notify.failure(error.message);
      // ..
    });
  await updateProfile(auth.currentUser, {
    displayName: name,
  });
}

//------------------------------Выход------------------------------

function authOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // document.querySelector('.username').textContent = user.email;

      remove(KEY_ID);
      console.log('Вихід виконано');
    })
    .catch(error => {
      // An error happened.
    });
}

//------------------------------Sign In Logic------------------------------

function getUserId() {
  if (load(KEY_ID)) {
    uid = load(KEY_ID);
    renderSingIn();
  } else uid = 'guest';
}

function renderSingIn() {
  if (document.querySelector('.nav__list')) {
    document.querySelector('.nav__list').style.display = 'flex';
  }
  if (document.querySelector('.header__authrization-button')) {
    document.querySelector('.header__authrization-button').remove();
  }
  if (document.querySelector('.header__sign-in-button')) {
    document.querySelector('.header__sign-in-button').remove();
  }
}
