document.addEventListener("DOMContentLoaded", function () {
  // Function to get the current date and format it as "5. Dezember 2023"
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return currentDate.toLocaleDateString('de-DE', options);
  }

  // Function to update the last modified date in the footer
  function updateLastModifiedDate() {
    const lastModifiedDateSpan = document.getElementById("lastModifiedDate");
    if (lastModifiedDateSpan) {
      lastModifiedDateSpan.textContent = getCurrentDate();
    }
  }

  // Call the function when the page loads
  updateLastModifiedDate();
});

