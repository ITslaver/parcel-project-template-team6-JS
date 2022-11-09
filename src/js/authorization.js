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

try {
  refs.openAuthModalBtn.addEventListener('click', toggleModal);
  refs.closeAuthModalBtn.addEventListener('click', toggleModal);
} catch {}

const onAuthClick = e => {
  if (e.target === e.currentTarget) {
    refs.authModal.classList.toggle('is-hidden');
  }
};

try {
  refs.authModal.addEventListener('click', onAuthClick);
} catch {}

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


// ____________________________________sign in form_________________________________________________

try {
  refs.openSigInModalBtn.addEventListener('click', toggleSigInModal);
  refs.closeSigInModalBtn.addEventListener('click', toggleSigInModal);
} catch {}

function toggleSigInModal() {
  document.body.classList.toggle('modal-open');
  refs.sigInModal.classList.toggle('is-hidden');
}

const onSigInClick = e => {
  if (e.target === e.currentTarget) {
    toggleSigInModal();
  }
};

try {
  refs.sigInModal.addEventListener('click', onSigInClick);
} catch {}


const onSigInEscClick = e => {
  if (e.key === 'Escape') {
    refs.sigInModal.classList.add('is-hidden');
  }
};

document.addEventListener('keydown', onSigInEscClick);