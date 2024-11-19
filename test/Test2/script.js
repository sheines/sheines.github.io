let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "10px"; // Reappear
  } else {
    navbar.style.top = "-100px"; // Hide
  }
  prevScrollPos = currentScrollPos;
});

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
