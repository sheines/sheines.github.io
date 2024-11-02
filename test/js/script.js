document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const asideToggle = document.getElementById('asideToggle');
    const asideContent = document.getElementById('asideContent');
    let lastScrollTop = 0;

    // Toggle mobile navigation menu
    menuToggle.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    // Toggle aside content in mobile view
    asideToggle.addEventListener('click', () => {
        asideContent.style.display = asideContent.style.display === 'block' ? 'none' : 'block';
    });

    // Header scroll behavior
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)'; // Versteckt den Header
        } else {
            header.style.transform = 'translateY(0)'; // Zeigt den Header
        }
        lastScrollTop = scrollTop;
    });
});
