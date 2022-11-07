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

let uid;
authStatus();

document.getElementById('auth-form').addEventListener('submit', cabinetAction);
document.getElementById('gallery').addEventListener('click', itemAction);

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

function cabinetAction(event) {
  event.preventDefault();
  console.log(event.target.name);
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  if (event.submitter.id === 'sign') {
    authFormSend(email, password);
    event.submitter.disabled = true;
  } else if (event.submitter.id === 'register') {
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

function getList(category, user) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    `https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);
      document.querySelector(`.${category}`).innerHTML = '';
      document
        .querySelector(`.${category}`)
        .insertAdjacentHTML('beforeend', card(result));
    })
    .catch(error => console.log('error', error));
}

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
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  console.log(itemId + ' успешно добавлено в ' + category);
}

function setPage(category, user) {
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
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

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

function authStatus() {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
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
