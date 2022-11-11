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
    }
    document.querySelector('.button-queue').textContent = 'DEL QUEYUE';
    document.querySelector('.button-queue').name = 'delFavorite';
    document.querySelector('.button-queue').classList =
      'button-queue-del active';

    if (document.querySelector('.button-watched-del')) {
      document.querySelector('.button-watched-del').textContent =
        'ADD TO WATCHED';
      document.querySelector('.button-watched-del').name = 'addWatched';
      document.querySelector('.button-watched-del').classList =
        'button-watched';
    }
  } else if (event.target.name === 'addWatched') {
    delItem(event.target.id, uid, 'favorite');
    setList('watched', uid, event.target.id, event.target.dataset.card);
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = 'watched';
      document.getElementById('list' + event.target.id).classList = 'watched';
    }
    document.querySelector('.button-watched').textContent = 'DEL WATCHED';
    document.querySelector('.button-watched').name = 'delWatched';
    document.querySelector('.button-watched').classList =
      'button-watched-del active';
    if (document.querySelector('.button-queue-del')) {
      document.querySelector('.button-queue-del').textContent = 'ADD TO QUEYUE';
      document.querySelector('.button-queue-del').name = 'addFavorite';
      document.querySelector('.button-queue-del').classList = 'button-queue';
    }
  } else if (event.target.name === 'delFavorite') {
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = '';
      document.getElementById('list' + event.target.id).classList = '';
    }
    document.querySelector('.button-queue-del').textContent = 'ADD TO QUEYUE';
    document.querySelector('.button-queue-del').name = 'addFavorite';
    document.querySelector('.button-queue-del').classList = 'button-queue';
    delItem(event.target.id, uid, 'favorite');
  } else if (event.target.name === 'delWatched') {
    if (document.title === 'Filmoteka') {
      document.getElementById('list' + event.target.id).textContent = '';
      document.getElementById('list' + event.target.id).classList = '';
    }
    document.querySelector('.button-watched-del').textContent =
      'ADD TO WATCHED';
    document.querySelector('.button-watched-del').name = 'addWatched';
    document.querySelector('.button-watched-del').classList = 'button-watched';
    delItem(event.target.id, uid, 'watched');
  }
}

//------------------------Функции кнопок в модальном окне---------------------------

function onSignInModalForm(e) {
  e.preventDefault();
  const email = e.target.querySelector('#email-to-sign-in').value;
  const password = e.target.querySelector('#password-to-sign-in').value;
  authFormReg(email, password);
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

function cabinetAction(event) {
  event.preventDefault();
  // console.log(event.target.name);

  // if (event.submitter.id === 'sign') {
  //   const email = event.target.querySelector('#email').value;
  //   const password = event.target.querySelector('#password').value;
  //   authFormSend(email, password);
  //   // event.submitter.disabled = true;
  // } else if (event.submitter.id === 'register') {
  //   const email = event.target.querySelector('#email').value;
  //   const password = event.target.querySelector('#password').value;
  //   authFormReg(email, password);
  //   // event.submitter.disabled = true;
  // } else
  if (event.submitter.id === 'exit') {
    authOut();
    // event.submitter.disabled = true;
  } else if (event.submitter.id === 'favorite') {
    // console.log(uid);
    getList('favorite', uid);
    setPage('favorite', uid);
  } else if (event.submitter.id === 'watched') {
    // console.log(uid);
    getList('watched', uid);
    setPage('watched', uid);
  }
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
      console.log('отрисовка ' + category, result);
      document.getElementById('card-list').innerHTML = '';
      return document
        .getElementById('card-list')
        .insertAdjacentHTML('beforeend', card(result));
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
  console.log(itemId + ' успешно удалено');

  if (document.title === 'Library') {
    getList(category, user);
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
      console.log('Вхід успішний ' + userCredential.user.email);
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

async function authFormReg(email, password) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password, name)
    .then(userCredential => {
      // Signed in
      console.log('User', userCredential.user);
      console.log('User', userCredential.displayName);
      console.log(
        'Користувача успішно створено ' +
          userCredential.user.email +
          userCredential.user.displayName
      );
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
    displayName: 'GoITstudents',
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
  }
}

function renderSingIn() {
  document.querySelector('.nav__list').style.display = 'flex';
  if (document.querySelector('.header__authrization-button')) {
    document.querySelector('.header__authrization-button').remove();
  }
  if (document.querySelector('.header__sign-in-button')) {
    document.querySelector('.header__sign-in-button').remove();
  }
}
