document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    slides[currentIndex].classList.add("active"); // Startbild setzen
    setInterval(showNextSlide, 4000); // Alle 3 Sekunden wechseln
});