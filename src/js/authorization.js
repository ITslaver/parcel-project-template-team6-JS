const refs = {
  body: document.querySelector('body'),

  authModal: document.querySelector('[data-authrization-modal]'),
  openAuthModalBtn: document.querySelector('[data-authrization-modal-open]'),
  closeAuthModalBtn: document.querySelector('[data-authrization-modal-close]'),
  authForm: document.querySelector('.authrization-modal-form'),
  authEmailInput: document.querySelector(
    '.authrization-modal-form__input-email'
  ),
  authPasswordInput: document.querySelector(
    '.authrization-modal-form__input-password'
  ),
  authsubmitBth: document.querySelector('.authrization-modal__button-submit'),

  sigInModal: document.querySelector('[data-sign-in-modal]'),
  openSigInModalBtn: document.querySelector('[data-sign-in-modal-open]'),
  closeSigInModalBtn: document.querySelector('[data-sign-in-modal-close]'),
  sigInForm: document.querySelector('.sign-in-modal-form'),
  sigInNameInput: document.querySelector('.sign-in-modal-form__input-name'),
  sigInEmailInput: document.querySelector('.sign-in-modal-form__input-email'),
  sigInPasswordInput: document.querySelector(
    '.sign-in-modal-form__input-password'
  ),
  sigInsubmitBth: document.querySelector('.sign-in-modal__button-submit'),
};

// const user = {
//   email: '',
//   password: '',
// };

// const newUser = {
//   name: '',
//   email: '',
//   password: '',
// };

refs.openAuthModalBtn.addEventListener('click', toggleModal);
refs.closeAuthModalBtn.addEventListener('click', toggleModal);

const onAuthClick = e => {
  if (e.target === e.currentTarget) {
    refs.authModal.classList.toggle('is-hidden');
  }
};

refs.authModal.addEventListener('click', onAuthClick);

const onEscClick = e => {
  if (e.key === 'Escape') {
    refs.authModal.classList.add('is-hidden');
  }
};

document.addEventListener('keydown', onEscClick);

function toggleModal() {
  document.body.classList.toggle('modal-open');
  refs.authModal.classList.toggle('is-hidden');
}

// refs.authEmailInput.addEventListener('input', onAuthEmailInput);
// refs.authPasswordInput.addEventListener('input', onAuthPasswordInput);

// function onAuthEmailInput(e) {
//   user.email = e.target.value;
//   user.password = refs.authPasswordInput.value;
//   localStorage.setItem('form-state', JSON.stringify(user));
// }

// function onAuthPasswordInput(e) {
//   user.password = e.target.value;
//   user.email = refs.authEmailInput.value;
//   localStorage.setItem('form-state', JSON.stringify(user));
// }

// function checkAuthForm() {
//   if (localStorage.getItem('form-state') === null) {
//     return;
//   } else {
//     const emailData = JSON.parse(localStorage.getItem('form-state')).email;
//     const passwordData = JSON.parse(
//       localStorage.getItem('form-state')
//     ).password;
//     if (emailData !== '') {
//       refs.authEmailInput.value = emailData;
//     }

//     if (passwordData !== '') {
//       refs.authPasswordInput.value = passwordData;
//     }
//   }
// }
// checkAuthForm();

// refs.authForm.addEventListener('submit', onAuthFormSubmit);

// function onAuthFormSubmit(e) {
//   e.preventDefault();
//   console.log(user);
//   localStorage.removeItem('form-state');
//   refs.authEmailInput.value = '';
//   refs.authPasswordInput.value = '';
// }

// ____________________________________sign in form_________________________________________________

refs.openSigInModalBtn.addEventListener('click', toggleSigInModal);
refs.closeSigInModalBtn.addEventListener('click', toggleSigInModal);

function toggleSigInModal() {
  document.body.classList.toggle('modal-open');
  refs.sigInModal.classList.toggle('is-hidden');
}

const onSigInClick = e => {
  if (e.target === e.currentTarget) {
    toggleSigInModal();
  }
};

refs.sigInModal.addEventListener('click', onSigInClick);

// refs.sigInEmailInput.addEventListener('input', onSigInEmailInput);
// refs.sigInPasswordInput.addEventListener('input', onSigInPasswordInput);
// refs.sigInNameInput.addEventListener('input', onsigInNameInput);

// function onSigInEmailInput(e) {
//   newUser.email = e.target.value;
//   newUser.name = refs.sigInNameInput.value;
//   newUser.password = refs.sigInPasswordInput.value;
//   localStorage.setItem('form-state', JSON.stringify(newUser));
// }

// function onSigInPasswordInput(e) {
//   newUser.password = e.target.value;
//   newUser.name = refs.sigInNameInput.value;
//   newUser.email = refs.sigInEmailInput.value;
//   localStorage.setItem('form-state', JSON.stringify(newUser));
// }

// function onsigInNameInput(e) {
//   newUser.name = e.target.value;
//   newUser.email = refs.sigInEmailInput.value;
//   newUser.password = refs.sigInPasswordInput.value;
//   localStorage.setItem('form-state', JSON.stringify(newUser));
// }

// function checkSigInForm() {
//   if (localStorage.getItem('form-state') === null) {
//     return;
//   } else {
//     const newNameData = JSON.parse(localStorage.getItem('form-state')).name;
//     const newEmailData = JSON.parse(localStorage.getItem('form-state')).email;
//     const newPasswordData = JSON.parse(
//       localStorage.getItem('form-state')
//     ).password;

//     if (newNameData !== '') {
//       refs.sigInNameInput.value = newNameData;
//     }

//     if (newEmailData !== '') {
//       refs.sigInEmailInput.value = newEmailData;
//     }

//     if (newPasswordData !== '') {
//       refs.sigInPasswordInput.value = newPasswordData;
//     }
//   }
// }

// checkSigInForm();

// refs.sigInForm.addEventListener('submit', onSigInFormSubmit);

// function onSigInFormSubmit(e) {
//   e.preventDefault();
//   console.log(newUser);
//   localStorage.removeItem('form-state');
//   refs.sigInNameInput.value = '';
//   refs.sigInEmailInput.value = '';
//   refs.sigInPasswordInput.value = '';
// }

const onSigInEscClick = e => {
  if (e.key === 'Escape') {
    refs.sigInModal.classList.add('is-hidden');
  }
};

document.addEventListener('keydown', onSigInEscClick);
