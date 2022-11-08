import teamMembers from "./team-members";
import renderTeamCards from './render-team-cards';

// console.log(teamMembers);

const footerModal = document.querySelector('.js-footer-modal');
const footerModalOpenBtn = document.querySelector('.js-footer-modal-open');
const footerModalCloseBtn = document.querySelector('.js-footer-modal-close');

footerModalOpenBtn.addEventListener('click', onFooterModalOpen);
footerModalCloseBtn.addEventListener('click', onFooterModalClose);

function onFooterModalOpen(e) {
    renderTeamCards(teamMembers);

    footerModal.classList.remove('is-hidden');
    document.body.classList.add('footer-modal-opened');

    footerModal.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscape);
}

function onFooterModalClose(e) {
    footerModal.classList.add('is-hidden');
    document.body.classList.remove('footer-modal-opened');

    footerModal.removeEventListener('click', onBackdropClick);
    window.removeEventListener('keydown', onEscape);
}

function onBackdropClick(e) {
    if (e.target !== e.currentTarget) {
        return;
    }
    onFooterModalClose();
}

function onEscape(e) {
    const ESCAPE_KEY_CODE = 'Escape';
    if (e.code === ESCAPE_KEY_CODE) {
        onFooterModalClose();
    }
}
