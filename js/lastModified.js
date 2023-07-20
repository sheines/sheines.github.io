document.addEventListener("DOMContentLoaded", function () {
    // Function to get the last modified date of the current page
    function getLastModifiedDate() {
        const lastModified = new Date(document.lastModified);
        return lastModified.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    // Function to update the footer element with the last modified date
    function updateLastModifiedDate() {
        const lastModifiedFooter = document.getElementById("lastModifiedFooter");
        if (lastModifiedFooter) {
        lastModifiedFooter.innerText = "Last modified: " + getLastModifiedDate();
        }
    }

    // Call the function once the page is loaded
    updateLastModifiedDate();
    });