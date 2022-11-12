const modalDialog = document.querySelector('.modal-one-film');
const html = document.querySelector('html');
// const modalContent = document.querySelector('.modal-one-film__content');
const closeButton = document.querySelector('.modal-close-btn');

const closeOnEsc = e => {    
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
};


// async function openModal() {
//   console.log('это Модалка')
//   document.addEventListener('keydown', closeOnEsc);
//   modalDialog.classList.remove('modal-one-film--hidden');
//   html.classList.add('disable-scroll');
// }

async function closeModal() {  
    document.removeEventListener('keydown', closeOnEsc);
    modalDialog.classList.add('modal-one-film--hidden');
    html.classList.remove('disable-scroll-all');   
}

closeButton.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
});

modalDialog.addEventListener('click', e => {
    if (e.target !== modalDialog) {
      return;
    }
    closeModal();
});

