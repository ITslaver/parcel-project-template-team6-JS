import teamMembers from "./team-members";
import renderTeamCards from './render-team-cards';
// import renderTeamCards2 from './render-team-cards';


const footerModal = document.querySelector('.js-footer-modal');
const footerModalOpenBtn = document.querySelector('.js-footer-modal-open');
const footerModalCloseBtn = document.querySelector('.js-footer-modal-close');

footerModalOpenBtn.addEventListener('click', onModalOpenBtnClick);
footerModalCloseBtn.addEventListener('click', onModalCloseBtnClick);

function onModalOpenBtnClick(e) {
    renderTeamCards(teamMembers);
    // renderTeamCards2(teamMembers);
    footerModal.classList.remove('is-hidden');
    document.body.classList.add('footer-modal-opened');
}

function onModalCloseBtnClick(e) {
    footerModal.classList.add('is-hidden');
    document.body.classList.remove('footer-modal-opened');
}

// console.log(teamMembers);
