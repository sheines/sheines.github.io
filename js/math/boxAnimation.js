// Funktionen für die Animationen
const boxcontainer = document.querySelector('.boxcontainer');
const background = document.querySelector('.background');
const floor = document.querySelector('.floor');
const side1 = document.querySelector('.side1');
const side2 = document.querySelector('.side2');
const side3 = document.querySelector('.side3');
const side4 = document.querySelector('.side4');

// Funktion für die Animation
function Animation() {

    background.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    side1.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    side2.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    side3.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    side4.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    floor.animate([{ opacity: 0 }, { opacity: 0.5 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });

    background.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 4000,
    });


    // Animation

    boxcontainer.animate([{ transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)" },
    { transform: "rotateX(50deg) rotateY(10deg) rotateZ(50deg)" }], {
        duration: 5000,
        fill: "forwards",
        delay: 6000,
    });

    // Seitenwände werden um 90 Grad nach oben geklappt
    side2.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(-90deg)" }], {
        duration: 3000,
        fill: "forwards",
        delay: 7000, // Beginnt nach dem Hintergrund
    });
    side1.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(90deg)" }], {
        duration: 3000,
        fill: "forwards",
        delay: 7000, // Beginnt nach dem Hintergrund
    });
    side3.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }], {
        duration: 3000,
        fill: "forwards",
        delay: 7000, // Beginnt nach dem Hintergrund
    });
    side4.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }], {
        duration: 3000,
        fill: "forwards",
        delay: 7000, // Beginnt nach dem Hintergrund
    });





    // Zurücksetzen
    side1.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    side2.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    side3.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    side4.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    floor.animate([{ opacity: 0.5 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    boxcontainer.animate([{ transform: "rotateX(50deg)" }, { transform: "rotateX(0deg)" }], {
        duration: 500,
        fill: "forwards",
        delay: 14000,
    });
    side2.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(0deg)" }], {
        duration: 500,
        fill: "forwards",
        delay: 14000,
    });
    side1.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(0deg)" }], {
        duration: 500,
        fill: "forwards",
        delay: 14000,
    });
    side3.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(0deg)" }], {
        duration: 500,
        fill: "forwards",
        delay: 14000,
    });
    side4.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(0deg)" }], {
        duration: 500,
        fill: "forwards",
        delay: 14000,
    });
}

// Starte die Animation beim Laden der Seite
Animation();

// Wiederhole die Animation alle 15 Sekunden
setInterval(Animation, 15000);