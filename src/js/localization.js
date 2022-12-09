export default function localization() {
    const refs = {
        // главная
        logIn: document.querySelector(".header__authrization-button"),
        signIn: document.querySelector(".header__sign-in-button"),
        search: document.querySelector('.search-form__input'),
        inTheatres: document.querySelector('.gallery-coming-soon-title'),
        // -----------------
        // Регистрация
        regTitle: document.querySelector('.sign-in-modal__header'),
        regBtn: document.querySelector('.sign-in-modal__button-submit'),
        regLabel: document.querySelectorAll('.sign-in-modal-form__label'),
        regInput: document.querySelectorAll('.form__input'),
        // ------------------
        // Логин
        logTitle: document.querySelector('.authrization-modal__header'),
        logLabel: document.querySelectorAll('.authrization-modal-form__label'),
        logBtnSubmit: document.querySelector('.authrization-modal__button-submit')
    }
    const currentLang = localStorage.getItem('lang');
    console.log(refs.logBtnSubmit.textContent)

    switch (currentLang) {
        case 'en-US':
            // главная
            refs.logIn.textContent = 'Log In';
            refs.signIn.textContent = 'Sign In';
            refs.search.placeholder = 'Search films...';
            refs.inTheatres.textContent = 'Coming soon in theatres';
            // -----------------
            // Регистрация
            refs.regTitle.textContent = "Please enter your sign-in information";
            refs.regBtn.textContent = 'Submit';
            refs.regLabel[0].textContent = "Name";
            refs.regLabel[1].textContent = "E-mail";
            refs.regLabel[2].textContent = "Password";
            refs.regInput[2].placeholder = 'name';
            refs.regInput[4].placeholder = '(6 characters minimum)';
            // ------------------
            // Логин
            refs.logTitle.textContent = 'Please enter authorizing credentials';
            refs.logLabel[0].textContent = 'E-mail';
            refs.logLabel[1].textContent = 'Password';
            refs.regInput[1].placeholder = '(6 characters minimum)';
            refs.logBtnSubmit.textContent = 'Submit';

            break;
        case 'uk-UA':
            // главная
            refs.logIn.textContent = 'Вхід';
            refs.signIn.textContent = 'Реєстрація';
            refs.search.placeholder = 'Пошук фільмів';
            refs.inTheatres.textContent = 'Скоро в кінотеатрах';

            // -----------------
            // Регистрация
            refs.regTitle.textContent = "Будь ласка, введіть свою реєстраційну інформацію";
            refs.regBtn.textContent = 'Надіслати';
            refs.regLabel[0].textContent = "Ім'я";
            refs.regLabel[1].textContent = "Електронна пошта";
            refs.regLabel[2].textContent = "Пароль";
            refs.regInput[2].placeholder = "ім'я";
            refs.regInput[4].placeholder = '(мінімум 6 символів)';
            // ---------------
            //  Логин
            refs.logTitle.textContent = 'Введіть облікові дані авторизації';
            refs.logLabel[0].textContent = 'Електронна пошта';
            refs.logLabel[1].textContent = 'Пароль';
            refs.regInput[1].placeholder = '(мінімум 6 символів)';
            refs.logBtnSubmit.textContent = 'Надіслати';
            break;

    }
}