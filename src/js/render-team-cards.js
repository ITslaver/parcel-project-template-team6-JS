import  footerModalCard  from '../templates/footer-modal-card.hbs';

const teamList = document.querySelector('.footer-modal__team-list');

export default function renderTeamCards(arr) {
    const teamMarkup = footerModalCard(arr);
    teamList.innerHTML = teamMarkup;
}

