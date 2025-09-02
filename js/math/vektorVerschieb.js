

AnimationV();

function AnimationV() {

    klammer1.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    klammer2.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1500,
        });

    rechx.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 2500,
        });
    rechy.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 5000,
        });
    klammer3.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 7500,
        });

    ergx.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 9000,
        });
    ergy.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 10000,
        });

    

setTimeout(resetV, 14000);
}

function resetV() {

    klammer1.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    klammer2.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });

    rechx.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    rechy.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    klammer3.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });

    ergx.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    ergy.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 1000,
            fill: "forwards",
            delay: 1000,
        });
    
    setTimeout(AnimationV, 2000);
}