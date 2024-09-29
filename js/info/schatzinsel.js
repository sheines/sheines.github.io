// Popups für A und B
const popup = document.getElementById('popup');
const leftOverlayPRI = document.getElementById('left-overlayPRI');
const rightOverlayPRI = document.getElementById('right-overlayPRI');
const leftOverlaySWB = document.getElementById('left-overlaySWB');
const rightOverlaySWB = document.getElementById('right-overlaySWB');
const leftOverlaySMB = document.getElementById('left-overlaySMB');
const rightOverlaySMB = document.getElementById('right-overlaySMB');
const leftOverlayMTI = document.getElementById('left-overlayMTI');
const rightOverlayMTI = document.getElementById('right-overlayMTI');
const leftOverlayMKH = document.getElementById('left-overlayMKH');
const rightOverlayMKH = document.getElementById('right-overlayMKH');
const leftOverlayTKI = document.getElementById('left-overlayTKI');
const rightOverlayTKI = document.getElementById('right-overlayTKI');
const close = document.getElementById('close');

// Verbindungen herstellen
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const image4 = document.getElementById('image4');
const image5 = document.getElementById('image5');
const image6 = document.getElementById('image6');
const image7 = document.getElementById('image7');
const image8 = document.getElementById('image8');
const svg = document.getElementById('lines');

let previousImage = 4;

// Beim Klicken auf A, Popup anzeigen
leftOverlayPRI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 4) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Schiffswrackbucht</span>!";
        route.innerHTML += "<li>Schiffswrackbucht</li>";
        // drawLine(image4, image1);
        previousImage = 1;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Pirateninsel</span>.";
    }

});
// Beim Klicken auf B, Popup anzeigen
rightOverlayPRI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 4) {
        popText.innerHTML = "Auf zum <span style='font-weight: 700'>Musketenhügel</span>!";
        route.innerHTML += "<li>Musketenhügel</li>";
        // drawLine(image4, image7);
        previousImage = 7;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Pirateninsel</span>.";
    }
});

// Beim Klicken auf A, Popup anzeigen
leftOverlaySWB.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 1) {
        popText.innerHTML = "Auf zum <span style='font-weight: 700'>Musketenhügel!";
        route.innerHTML += "<li>Musketenhügel</li>";
        // drawLine(image1, image7);
        previousImage = 7;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht in der <span style='font-weight: 700'>Schiffswrackbucht</span>.";
    }
});
// Beim Klicken auf B, Popup anzeigen
rightOverlaySWB.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 1) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Totenkopfinsel</span>!";
        route.innerHTML += "<li>Totenkopfinsel</li>";
        //   drawLine(image1, image2);
        previousImage = 2;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht in der <span style='font-weight: 700'>Schiffswrackbucht</span>.";
    }
});

// Beim Klicken auf A, Popup anzeigen
leftOverlaySMB.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 6) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Pirateninsel</span>!";
        route.innerHTML += "<li>Pirateninsel</li>";
        // drawLine(image6, image4);
        previousImage = 4;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht in der <span style='font-weight: 700'>Schmugglerbucht</span>.";
    }
});
// Beim Klicken auf B, Popup anzeigen
rightOverlaySMB.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 6) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Schatzinsel</span>!";
        route.innerHTML += "<li style='background-color: darkgoldenrod;'> <span style='color: var(--bg-header); font-weight: 800;'>Schatzinsel </span></li>";
        //   drawLine(image6, image3);
        previousImage = 3;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht in der <span style='font-weight: 700'>Schmugglerbucht</span>.";
    }
});

// Beim Klicken auf A, Popup anzeigen
leftOverlayMTI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 5) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Schmugglerbucht</span>!";
        route.innerHTML += "<li>Schmugglerbucht</li>";
        // drawLine(image5, image6);
        previousImage = 6;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Meutererinsel</span>.";
    }
});
// Beim Klicken auf B, Popup anzeigen
rightOverlayMTI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 5) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Totenkopfinsel</span>!";
        route.innerHTML += "<li>Totenkopfinsel</li>";
        //   drawLine(image5, image2);
        previousImage = 2;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Meutererinsel</span>.";
    }
});

// Beim Klicken auf A, Popup anzeigen
leftOverlayMKH.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 7) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Pirateninsel</span>!";
        route.innerHTML += "<li>Pirateninsel</li>";
        // drawLine(image7, image4);
        previousImage = 4;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf dem <span style='font-weight: 700'> Musketenhügel</span>.";
    }
});
// Beim Klicken auf B, Popup anzeigen
rightOverlayMKH.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 7) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Meutererinsel</span>!";
        route.innerHTML += "<li>Meutererinsel</li>";
        //   drawLine(image7, image5);
        previousImage = 5;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf dem <span style='font-weight: 700'> Musketenhügel</span>.";
    }
});

// Beim Klicken auf A, Popup anzeigen
leftOverlayTKI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 2) {
        popText.innerHTML = "Auf zum <span style='font-weight: 700'>Musketenhügel</span>!";
        route.innerHTML += "<li>Musketenhügel</li>";
        // drawLine(image2, image7);
        previousImage = 7;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Totenkopfinsel</span>.";
    }
});
// Beim Klicken auf B, Popup anzeigen
rightOverlayTKI.addEventListener('click', () => {
    popup.style.display = 'flex';
    if (previousImage === 2) {
        popText.innerHTML = "Auf zur <span style='font-weight: 700'>Schiffwrackbucht</span>!";
        route.innerHTML += "<li>Schiffswrackbucht</li>";
        //   drawLine(image2, image1);
        previousImage = 1;
    }
    else {
        popText.innerHTML = "Du bist doch gar nicht auf der <span style='font-weight: 700'>Totenkopfinsel</span>.";
    }
});

// Schließen von Popup 
close.addEventListener('click', () => {
    popup.style.display = 'none';
});



// Optional: Klick außerhalb des Popups schließt es
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});


// // Funktion zum Zeichnen einer Linie zwischen zwei Elementen
// function drawLine(fromElement, toElement) {
// const fromRect = fromElement.getBoundingClientRect();
// const toRect = toElement.getBoundingClientRect();

// // Berechnung der Mitte des ersten und zweiten Elements inklusive Scroll-Position
// const fromX = fromRect.left + fromRect.width / 2 + window.scrollX;
// const fromY = fromRect.top + fromRect.height / 2 + window.scrollY;
// const toX = toRect.left + toRect.width / 2 + window.scrollX;
// const toY = toRect.top + toRect.height / 2 + window.scrollY;

// // Erstelle eine Linie und füge sie zu SVG hinzu
// const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
// line.setAttribute('x1', fromX);
// line.setAttribute('y1', fromY);
// line.setAttribute('x2', toX);
// line.setAttribute('y2', toY);
// line.setAttribute('stroke', 'darkgoldenrod');
// line.setAttribute('stroke-width', '4');
// svg.appendChild(line);

// previousImage = image;
// }

image8.addEventListener('click', () => {
svg.innerHTML = '';
route.innerHTML = "<li>Pirateninsel</li>";
previousImage = 4;
});
