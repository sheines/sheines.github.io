document.addEventListener("DOMContentLoaded", function () {


    const def_menge_fill = document.getElementById("def_menge_fill");
    const def_menge_stroke = document.getElementById("def_menge_stroke");
    const def_zahlen = document.getElementById("def_zahlen");
    const def_text = document.getElementById("def_text");

    const zie_menge_fill = document.getElementById("zie_menge_fill");
    const zie_menge_stroke = document.getElementById("zie_menge_stroke");
    const zie_zahlen = document.getElementById("zie_zahlen");
    const zie_text = document.getElementById("zie_text");

    const pfeil1 = document.getElementById("pfeil1");
    const pfeil2 = document.getElementById("pfeil2");
    const pfeil3 = document.getElementById("pfeil3");

    const wer_menge_fill = document.getElementById("wer_menge_fill");
    const wer_menge_stroke = document.getElementById("wer_menge_stroke");
    const wer_text = document.getElementById("wer_text");



    mengenAnimation();



    function mengenAnimation() {

        // 1. Definitionsmenge
        def_menge_stroke.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 2000,
        });
        def_menge_fill.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 2000,
        });
        def_zahlen.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 3000,
        });
        def_text.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 4000,
        });

        // 2. Zielmenge
        zie_menge_stroke.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 6500,
        });
        zie_menge_fill.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 6500,
        });
        zie_zahlen.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 7500,
        });
        zie_text.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 8500,
        });

        // 3. Pfeile
        pfeil1.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 11000,
        });
        pfeil2.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 13000,
        });
        pfeil3.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 14000,
        });

        // 4. Wertemenge
        wer_menge_stroke.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 15500,
        });
        wer_menge_fill.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 15500,
        });
        wer_text.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 2000,
            fill: "forwards",
            delay: 16500,
        });
    }

    // Attach click event listener to the SVG element
const svgElement = document.getElementById('mengen_svg');

svgElement.addEventListener('click', () => {

    // Alle zurücksetzen
    def_menge_stroke.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    def_menge_fill.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    def_zahlen.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    def_text.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    zie_menge_stroke.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    zie_menge_fill.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    zie_zahlen.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    zie_text.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    pfeil1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    pfeil2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    pfeil3.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    wer_menge_stroke.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    wer_menge_fill.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });
    wer_text.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards",
        // delay: 20000,
    });

    // setTimeout(mengenAnimation, 2000);
    mengenAnimation();
});

});