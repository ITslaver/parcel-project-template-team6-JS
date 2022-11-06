import teamMembers from "./team-members";
import renderTeamCards from './render-team-cards';

const modalOpenBtn = document.querySelector('.footer__button');

modalOpenBtn.addEventListener('click', onModalOpenBtnClick);

function onModalOpenBtnClick(e) {
    renderTeamCards(teamMembers);
}

console.log(teamMembers);
