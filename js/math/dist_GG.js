const pointGG = document.getElementById("pointGG");

const lineFG = document.getElementById("lineFG");
const lineGG = document.getElementById("lineGG");

const orthoGG = document.getElementById("orthoGG");
const rightAngleGG = document.getElementById("rightAngleGG");

const lotPointGG = document.getElementById("lotPointGG");

const arrowGG = document.getElementById("arrowGG");



AnimationGG();


function AnimationGG() {
    
    // Punkt/Gerade animieren
    
    lineFG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    lineGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });

    pointGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    lineFG.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2500,
    });

    // Orthogonale animieren 
    orthoGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 4000,
    });
    rightAngleGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 4500,
    });

    // Lotfußpunkt animieren
    lotPointGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 6000,
    });
    rightAngleGG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 6500,
    });

    // Abstand animieren
    lineGG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 8000,
    });
    orthoGG.animate([{ opacity: 1 }, { opacity: 0.25 }], {
        duration: 500,
        fill: "forwards",
        delay: 8000,
    });
    arrowGG.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 9000,
    });

    setTimeout(resetGG, 13000);
}



// // Attach click event listener to the SVG element
// const svgElementGG = document.getElementById('abstandGeradeGerade_svg');

// svgElementGG.addEventListener('click', () => {

function resetGG() {
    
    // Animation rückwärts

    // Punkt/Gerade animieren
    pointGG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    lineGG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    lineFG.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Orthogonale animieren 
    orthoGG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    rightAngleGG.animate([{ opacity: 0.25 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Lotfußpunkt animieren
    lotPointGG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Abstand animieren
    arrowGG.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    
    setTimeout(AnimationGG, 2000);
// });
}