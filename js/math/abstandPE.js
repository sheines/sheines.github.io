

Animation();


function Animation() {
    normalVector.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    rightAngle.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 750,
    });
    line.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 2500,
    });
    normalVector.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });
    rightAngle.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });
    lotPoint.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 5500,
    });
    line.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 7500,
    });
    distance.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
        delay: 10000,
    });
    distance.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 12500,
    });
    lotPoint.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        delay: 12500,
    });

    setTimeout(Animation, 14000);

}