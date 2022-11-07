import  footerModalCard  from '../templates/footer-modal-card.hbs';
// import teamMembers from "./team-members";

const teamList = document.querySelector('.footer-modal__team-list');

// Через hbs --> не прогружаются изображения
export default function renderTeamCards(arr) {
    const teamMarkup = footerModalCard(arr);
    teamList.innerHTML = teamMarkup;
    // console.log(teamMarkup);
}

// Через js --> тоже не прогружаются изображения
// export default function renderTeamCards2(arr) {
//     const teamCardsMarkup = arr
//         .map(member => {
//             const TEAM_MEMBER_MARKUP = `<li class="footer-modal__member-card">
//                 <div class="footer-modal__img-container">
//                 <img 
//                     srcset="./images/footer-modal-posters/${member.poster}.jpg 1x, ./images/footer-modal-posters/${member.poster}@2x.jpg 2x"
//                     src="./images/footer-modal-posters/${member.poster}.jpg" 
//                     alt="${member.name}"
//                     class="footer-modal__image"
//                 />
//                 </div>
//                 <h3 class="footer-modal__card-title">${member.name}</h3>
//                 <h4 class="footer-modal__member-role">${member.role}</h4>
//                 <p class="footer-modal__card-genres">${member.genres}</p>
//                 <span class="footer-modal__card-rating">10.0</span>
//                 </li>`
//             return TEAM_MEMBER_MARKUP;
//         })
//         .join('');
//     teamList.innerHTML = teamCardsMarkup;
// }
