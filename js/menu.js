document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLinks = document.querySelector('.header-menu');

    hamburgerMenu.addEventListener('click', () => {
    menuLinks.classList.toggle('active-menu');
    });
});