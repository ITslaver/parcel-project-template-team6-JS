import  footerModalCard  from '../templates/footer-modal-card.hbs';
// import teamMembers from "./team-members";

const teamList = document.querySelector('.footer-modal__team-list');

export default function renderTeamCards(arr) {
    const teamMarkup = footerModalCard(arr);
    teamList.innerHTML = teamMarkup;
    console.log(teamMarkup);
}

// function testMarkup(arr) {
//     let result = arr.map(member => {
//         const img = member.poster;
//         const alt = member.name;

//         const IMG_MARKUP = `<img srcset="./images/footer-modal-posters/${img}.jpg 1x, ./images/footer-modal-posters/${img}@2x.jpg 2x" src="./images/footer-modal-posters/${img}.jpg" alt="${alt}" class="footer-modal__image" />`
//         return IMG_MARKUP;
//     });
//     console.log(result);
//     return result;
// }

// const shalala = testMarkup(teamMembers);

// const cardImageContainer = document.querySelectorAll('.footer-modal__img-container');
//         console.log(cardImageContainer);
//         function testttt(item) {
//             cardImageContainer.map(container => {
//                 container.innerHTML = item;
//             })
//         }

// function test2(arr) {
//     let result = arr.map(item => {
//         testttt(item);
//         console.log(result);
//         } 
//     )
//     return result;
// }

// test2(shalala);

// for each????
