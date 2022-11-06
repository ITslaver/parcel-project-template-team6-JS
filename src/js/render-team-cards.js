import  footerModalCard  from '../templates/footer-modal-card.hbs';
// import teamMembers from "./team-members";

const teamList = document.querySelector('.footer-modal__team-list');

export default function renderTeamCards(arr) {
    const teamMarkup = footerModalCard(arr);
    teamList.innerHTML = teamMarkup;
    console.log(teamMarkup);

    // const cardImageContainer = document.querySelectorAll('.footer-modal__img-container');
    // console.log(cardImageContainer);
    // const result = cardImageContainer.map(container => {
    //     container.innerHTML = teamMembers.poster;
    // })
    // console.log(result);
}