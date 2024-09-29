// Get elements by its id
const polyGraph1 = document.getElementById("polyGraph1");
const polyGraph2 = document.getElementById("polyGraph2");
const polyGraph3 = document.getElementById("polyGraph3");

Animation1();



function Animation1() {

    polyGraph1.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    polyGraph2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2000,
    });
    polyGraph3.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });

    // Zurück
    polyGraph1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 6000,
    });
    polyGraph2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 7500,
    });
    polyGraph3.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 9000,
    });


    setTimeout(Animation1, 10000);
}
