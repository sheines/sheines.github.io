const graphF = document.getElementById("graphF");
const graphG = document.getElementById("graphG");

const angleF = document.getElementById("angleF");
const angleG = document.getElementById("angleG");

const dashedLineF = document.getElementById("dashedLineF");
const dashedLineG = document.getElementById("dashedLineG");

const angleSide = document.getElementById("angleSide");
const angleRight = document.getElementById("angleRight");

Animation();

function Animation() {

    // Graphen animieren
    graphF.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 500,
    });
    graphG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 1500,
    });

    // Steigungswinkel erscheinen lassen
    angleF.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 3500,
    });
    angleG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 4500,
    });
    dashedLineF.animate([{ opacity: 0 }, { opacity: 0.8 }], {
        duration: 500,
        fill: "forwards",
        delay: 6000,
    });
    dashedLineG.animate([{ opacity: 0 }, { opacity: 0.8 }], {
        duration: 500,
        fill: "forwards",
        delay: 7000,
    });

    // Hilfsachse erscheinen lassen und Winkel bewegen
    // dashedLine.animate([{opacity: 0}, {opacity: 1}], {
    //     duration: 1500,
    //     fill: "forwards",
    //     delay: 6000,
    // });
    angleF.animate([{ transform: "translate(47px,19.5px)" },
    { transform: "translate(0,0)" }], {
        duration: 2000,
        fill: "forwards",
        delay: 6500,
    });
    angleG.animate([{ transform: "translate(-55px,19.5px)" },
    { transform: "translate(0,0)" }], {
        duration: 2000,
        fill: "forwards",
        delay: 7500,
    });
    dashedLineF.animate([{ transform: "translate(47px,19.5px)" },
    { transform: "translate(0,0)" }], {
        duration: 2000,
        fill: "forwards",
        delay: 6500,
    });
    dashedLineG.animate([{ transform: "translate(-55px,19.5px)" },
    { transform: "translate(0,0)" }], {
        duration: 2000,
        fill: "forwards",
        delay: 7500,
    });

    //Zwischenwinkel animieren und Winkel verschwinden lassen
    angleSide.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 10000,
    });
    angleF.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 10500,
    });
    angleG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });
    dashedLineF.animate([{ opacity: 0.8 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 11000,
    });
    dashedLineG.animate([{ opacity: 0.8 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 11000,
    });

    // Richtigen Winkel animieren und Nebenwinkel abblenden
    angleSide.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 1000,
        fill: "forwards",
        delay: 12500,
    });
    angleRight.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 13000,
    });



}

// Attach click event listener to the SVG element
const svgElement = document.getElementById('schnittwinkel_svg');

svgElement.addEventListener('click', () => {

    // Graphen animieren
    graphF.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    graphG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    angleF.animate([{ transform: "translate(0,0)" },
    { transform: "translate(47px,19.5px)" }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    angleG.animate([{ transform: "translate(0,0)" },
    { transform: "translate(-55px,19.5px)" }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    dashedLineF.animate([{ transform: "translate(0,0)" },
    { transform: "translate(47px,19.5px)" }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    dashedLineG.animate([{ transform: "translate(0,0)" },
    { transform: "translate(-55px,19.5px)" }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    

    //Zwischenwinkel animieren und Winkel verschwinden lassen
    angleSide.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    // Richtigen Winkel animieren und Nebenwinkel abblenden
    angleRight.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    setTimeout(Animation, 2500);
});