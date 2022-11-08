import { initializeApp } from 'firebase/app';
import card from '../templates/card.hbs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
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

export let uid;
if (!uid) {
getAuth()
}

//---------------------------- Слушатели кнопок--------------------------------
document.getElementById('header_btn').addEventListener('submit', cabinetAction);
document.getElementById('card-div').addEventListener('click', itemAction);

//---------------------------Функции кнопок в хедере---------------------------
function itemAction(event) {
  event.preventDefault();
  console.log('нажато ' + event.target.name + event.target.id);
  if (event.target.name === 'addFavorite') {
    console.log('сработало ' + event.target.id, event.target.name);
    delItem(event.target.id, uid, 'watched');
    setList('favorite', uid, event.target.id, event.target.dataset.card);
  } else if (event.target.name === 'addWatched') {
    console.log('сработало ' + event.target.id, event.target.name);
    delItem(event.target.id, uid, 'favorite');
    setList('watched', uid, event.target.id, event.target.dataset.card);
  } else if (event.target.name === 'delFavorite') {
    console.log('сработало ' + event.target.name);
    delItem(event.target.id, uid, 'favorite');
  } else if (event.target.name === 'delWatched') {
    console.log('сработало ' + event.target.name);
    delItem(event.target.id, uid, 'watched');
  }
}


//------------------------Функции кнопок в модальном окне---------------------------

function cabinetAction(event) {
  event.preventDefault();
  console.log(event.target.name);

  if (event.submitter.id === 'sign') {
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    authFormSend(email, password);
    event.submitter.disabled = true;
  } else if (event.submitter.id === 'register') {
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    authFormReg(email, password);
    event.submitter.disabled = true;
  } else if (event.submitter.id === 'exit') {
    authOut();
    event.submitter.disabled = true;
  } else if (event.submitter.id === 'favorite') {
    console.log(uid);
    getList('favorite', uid);
    setPage('favorite', uid);
  } else if (event.submitter.id === 'watched') {
    console.log(uid);
    getList('watched', uid);
    setPage('watched', uid);
  }
}

//---------------------------Получение фильмов с базы---------------------------

export function getList(category, user) {
  console.log(category, user);
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

return fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);
      document
        .getElementById('card-list').innerHTML = '';
      document
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
    .then(result =>  {console.log(result.keys())
    return result
})
    .catch(error => console.log('error', error));
}


//---------------------------Удаление фильмов с базы---------------------------

function delItem(itemId, user, category) {
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
}

//-------------------------Получение данных пользователя ---------------------------

export function authStatus() {
  const auth = getAuth();
 return onAuthStateChanged(auth, user => {
    if (user) {
      uid = user.uid;
      document.querySelector('.username').textContent = user.name;
      console.log('користувач ' + uid);
      return (
        uid, (document.querySelector('.username').textContent = user.email)
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
      document.querySelector('.username').textContent = user.email;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//---------------------------Отправка запроса регистрации---------------------------

function authFormReg(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log('Користувача успішно створено ' + userCredential.user.email);
      document.querySelector('.username').textContent = user.email;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//------------------------------Выход------------------------------

 function authOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      document.querySelector('.username').textContent = user.email;
      console.log('Вихід виконано');
    })
    .catch(error => {
      // An error happened.
    });
}
