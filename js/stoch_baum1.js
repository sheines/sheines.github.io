const defStufe1 = document.getElementById("defStufe1");
const defStufe2 = document.getElementById("defStufe2");
const defStufe3 = document.getElementById("defStufe3");



Animation1();


function Animation1() {
        
    defStufe1.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        fill: "forwards",
        delay: 500,
    });
    defStufe2.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2500,
        fill: "forwards",
        delay: 3000,
    });
    defStufe3.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 3500,
        fill: "forwards",
        delay: 5500,
    });

    defStufe1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 11000,
    });
    defStufe2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 11000,
    });
    defStufe3.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards",
        delay: 11000,
    });

    Animation1();



}
