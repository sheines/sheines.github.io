const boote1 = document.getElementById("boote1");
const boote2 = document.getElementById("boote2");

const text1 = document.getElementById("text1");

Animation();

function Animation() {

    boote2.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: "translate(-141.733px,-28.346px)" }
        ],
        {
            duration: 10,
            fill: "forwards",
            delay: 0,
        });

    boote2.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });

    boote2.animate(
        [
            { transform: "translate(-141.733px,-28.346px)" },
            { transform: "translate(0,0)" }
        ],
        {
            duration: 5000,
            fill: "forwards",
            delay: 3000,
        });

    boote1.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 10000,
        });

    pfeile.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 13000,
        });

    bootbeschriftung1.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 15000,
        });
    bootbeschriftung2.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 16000,
        });
    pfeilbeschriftung.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 18000,
        });

setTimeout(reset, 24000);
}

function reset() {

    boote2.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });

    boote1.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });

    pfeile.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });

    bootbeschriftung1.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });
    bootbeschriftung2.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });
    pfeilbeschriftung.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 0,
        });
    
    setTimeout(Animation, 2000);
}