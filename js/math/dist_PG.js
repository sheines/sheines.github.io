const pointPG = document.getElementById("pointPG");
const linePG = document.getElementById("linePG");

const orthoPG = document.getElementById("orthoPG");
const rightAnglePG = document.getElementById("rightAnglePG");

const lotPoint = document.getElementById("lotPoint");

const arrowPG = document.getElementById("arrowPG");



AnimationPG();


function AnimationPG() {
    
    // Punkt/Gerade animieren
    pointPG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });

    linePG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });

    // Orthogonale animieren 
    orthoPG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 3000,
    });
    rightAnglePG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });

    // Lotfußpunkt animieren
    lotPoint.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 5000,
    });
    rightAnglePG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 5500,
    });

    // Abstand animieren
    linePG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 7000,
    });
    orthoPG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 7000,
    });
    arrowPG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 8000,
    });

}



// Attach click event listener to the SVG element
const svgElementPG = document.getElementById('abstandPunktGerade_svg');

svgElementPG.addEventListener('click', () => {

    // Animation rückwärts

    // Punkt/Gerade animieren
    pointPG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    linePG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Orthogonale animieren 
    orthoPG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    rightAnglePG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Lotfußpunkt animieren
    lotPoint.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Abstand animieren
    arrowPG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    
    setTimeout(AnimationPG, 2000);
});