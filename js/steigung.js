const graph = document.getElementById("graph");

const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
const point1axes = document.getElementById("point1axes");
const point2axes = document.getElementById("point2axes");

const deltaXsign = document.getElementById("deltaXsign");
const deltaXline = document.getElementById("deltaXline");
const deltaXequation = document.getElementById("deltaXequation");
const deltaYsign = document.getElementById("deltaYsign");
const deltaYline = document.getElementById("deltaYline");
const deltaYequation = document.getElementById("deltaYequation");

const x1 = document.getElementById("x1");
const y1 = document.getElementById("y1");
const x2 = document.getElementById("x2");
const y2 = document.getElementById("y2");

Animation();


function Animation() {

    

    // Punkte animieren
    point1.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    point2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1500,
    });

    // Gerade animieren
    graph.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 3000,
    });

    // Koordinaten animieren
    point1axes.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 5000,
    });
    point2axes.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 6500,
    });

    // Pfeile animieren
    deltaXline.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    deltaXsign.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 9000,
    });
    deltaYline.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 10000,
    });
    deltaYsign.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    // Gleichung animieren
    deltaXsign.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 12000,
    });
    deltaXequation.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 12000,
    });
    deltaYsign.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 14000,
    });
    deltaYequation.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: "forwards",
        delay: 14000,
    });


    // xy farbig machen
    x1.animate([{fill: "#a7a7a8"}, {fill: "red" }], {
        duration: 1500,
        fill: "forwards",
        delay: 16000,
    });
    y1.animate([{fill: "#a7a7a8"}, {fill: "green" }], {
        duration: 1500,
        fill: "forwards",
        delay: 16000,
    });
    x2.animate([{fill: "#a7a7a8"}, {fill: "cyan" }], {
        duration: 1500,
        fill: "forwards",
        delay: 16000,
    });
    y2.animate([{fill: "#a7a7a8"}, {fill: "orange" }], {
        duration: 1500,
        fill: "forwards",
        delay: 16000,
    });


}





// Attach click event listener to the SVG element
const svgElement = document.getElementById('steigung_svg');

svgElement.addEventListener('click', () => {

    // Animation rückwärts

    // Punkte animieren
    point1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });
    point2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });

    // Gerade animieren
    graph.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });

    // Koordinaten animieren
    point1axes.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });
    point2axes.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });

    // Pfeile animieren
    deltaXline.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });

    deltaYline.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });

    // Gleichung animieren
    deltaXequation.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });
    deltaYequation.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
    });


    // xy farbig machen
    x1.animate([{fill: "red"}, {fill: "#a7a7a8" }], {
        duration: 1000,
        fill: "forwards",
    });
    y1.animate([{fill: "green"}, {fill: "#a7a7a8" }], {
        duration: 1000,
        fill: "forwards",
    });
    x2.animate([{fill: "cyan"}, {fill: "#a7a7a8" }], {
        duration: 1000,
        fill: "forwards",
    });
    y2.animate([{fill: "orange"}, {fill: "#a7a7a8" }], {
        duration: 1000,
        fill: "forwards",
    });
    
    setTimeout(Animation, 2000);
});