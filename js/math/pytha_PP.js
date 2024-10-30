const span = document.getElementById("span");

const xArrow = document.getElementById("xArrow");
const yArrow = document.getElementById("yArrow");

const arrowDeltaX = document.getElementById("arrowDeltaX");
const arrowDeltaY = document.getElementById("arrowDeltaY");

const arrowDxEquation = document.getElementById("arrowDxEquation");
const arrowDyEquation = document.getElementById("arrowDyEquation");

const rightAngle = document.getElementById("rightAngle");

const d = document.getElementById("d");

const pyth1 = document.getElementById("pyth1");
const pyth2 = document.getElementById("pyth2");
const pyth3 = document.getElementById("pyth3");


AnimationPP();


function AnimationPP() {

    
    // Abstand animieren
    span.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    // Dreieck erzeugen
    xArrow.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1500,
    });
    yArrow.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    rightAngle.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2500,
    });

    //Dreieck beschriften
    arrowDeltaX.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3000,
    });
    arrowDeltaY.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });

    // Pythagoras aufstellen
    d.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 4500,
    });
    pyth1.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 4500,
    });

    // Pythagoras ändern I
    pyth1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 6500,
    });
    pyth2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 6500,
    });


    // Pythagoras ändern II
    arrowDeltaX.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 2000,
        fill: "forwards",
        delay: 9500,
    });
    arrowDeltaY.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 2000,
        fill: "forwards",
        delay: 9500,
    });
    pyth2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 9000,
    });
    pyth3.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 9000,
    });
    arrowDxEquation.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 9500,
    });
    arrowDyEquation.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 9500,
    });

    setTimeout(resetPP, 13500);
}


function resetPP() {
    
    // Animation rückwärts

    // Abstand animieren
    span.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Dreieck erzeugen
    xArrow.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    yArrow.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    rightAngle.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    //Dreieck beschriften
    arrowDeltaX.setAttribute("opacity", "0");
    arrowDeltaY.setAttribute("opacity", "0");

    // Pythagoras aufstellen
    d.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    pyth1.setAttribute("opacity", "0");

    // Pythagoras ändern I
    pyth2.setAttribute("opacity", "0");


    // Pythagoras ändern II
    arrowDeltaX.setAttribute("opacity", 0);
    arrowDeltaY.setAttribute("opacity", 0);
    pyth3.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    arrowDxEquation.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    arrowDyEquation.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    
    setTimeout(AnimationPP, 2000);
}