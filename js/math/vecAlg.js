
// Addition
const addVecA = document.getElementById("addVecA");
const addVecB = document.getElementById("addVecB");
const addVecA2 = document.getElementById("addVecA2");
const addVecB2 = document.getElementById("addVecB2");
const addVecC = document.getElementById("addVecC");
const addEq = document.getElementById("addEq");

addVecA2.setAttribute("opacity", 0);
addVecB2.setAttribute("opacity", 0);
addVecC.setAttribute("opacity", 0);
addEq.setAttribute("opacity", 0);

animateAdd();

function animateAdd() {

    addVecA2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });
    addVecB2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });

    addVecA.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });
    addVecB2.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });

    addVecC.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 4000,
    });

    addEq.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 5000,
    });

    // ausblenden
    addVecA.animate([{ opacity: 0.2 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });
    addVecA2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });
    addVecB2.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    addVecC.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    addEq.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    setTimeout(animateAdd, 13000);
}

// Subtraktion 
const subVecA = document.getElementById("subVecA");
const subVecB = document.getElementById("subVecB");
const subVecA2 = document.getElementById("subVecA2");
const subVecB2 = document.getElementById("subVecB2");
const subVecC = document.getElementById("subVecC");
const subEq = document.getElementById("subEq");

subVecA2.setAttribute("opacity", 0);
subVecB2.setAttribute("opacity", 0);
subVecC.setAttribute("opacity", 0);
subEq.setAttribute("opacity", 0);

animateSub();

function animateSub() {

    subVecA2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });
    subVecB2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });

    subVecA2.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });
    subVecB2.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });

    subVecC.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 4000,
    });

    subEq.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 5000,
    });

    // ausblenden
    subVecA2.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });
    subVecB2.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    subVecC.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    subEq.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    setTimeout(animateSub, 13000);
}


// Multiplikation 
const mulVecB = document.getElementById("mulVecB");
const mulVecB2 = document.getElementById("mulVecB2");
const mulVecB3 = document.getElementById("mulVecB3");
const mulVecC = document.getElementById("mulVecC");
const mulEq = document.getElementById("mulEq");

mulVecB2.setAttribute("opacity", 0);
mulVecB3.setAttribute("opacity", 0);
mulVecC.setAttribute("opacity", 0);
mulEq.setAttribute("opacity", 0);

animateMul();

function animateMul() {

    mulVecB2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });
    mulVecB3.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });

    mulVecB2.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });
    mulVecB3.animate([{ opacity: 1 }, { opacity: 0.2 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });

    mulVecC.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 4000,
    });

    mulEq.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 5000,
    });

    // ausblenden
    mulVecB2.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });
    mulVecB3.animate([{ opacity: 0.2 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    mulVecC.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    mulEq.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 11000,
    });

    setTimeout(animateMul, 13000);
}
