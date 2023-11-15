const red = document.getElementById("red");
const viereck = document.getElementById("viereck");
const redViereck = document.getElementById("redViereck");

const rest = document.getElementById("rest");

const gesamtMenge = document.getElementById('gesamtMenge');
const viereckMenge = document.getElementById('viereckMenge');
const redMenge = document.getElementById('redMenge');
const schnittMenge = document.getElementById('schnittMenge');
const vereinigungsMenge = document.getElementById('vereinigungsMenge');

// Animation();


function Animation() {
    gesamtMenge.style.filter = 'brightness(1)';
    redMenge.style.filter = 'brightness(0.5)';
    viereckMenge.style.filter = 'brightness(0.5)';
    schnittMenge.style.filter = 'brightness(0.5)';
    vereinigungsMenge.style.filter = 'brightness(0.5)';

    // Reset
    red.setAttribute("opacity", "1");
    viereck.setAttribute("opacity", "1");
    redViereck.setAttribute("opacity", "1");
    rest.setAttribute("opacity", "1");

    // Menge der Vierecke
    rest.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 1000,
    });
    red.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 1000,
    });
    gesamtMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 1000
    });
    viereckMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 1000
    });

    // Reset
    rest.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });
    red.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 4000,
    });
    gesamtMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 4000
    });
    viereckMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 4000
    });

    // Menge der roten Figuren
    rest.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 5500,
    });
    viereck.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 5500,
    });
    gesamtMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 5500
    });
    redMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 5500
    });

    // Reset
    rest.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 8500,
    });
    viereck.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 8500,
    });
    gesamtMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 8500
    });
    redMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 8500,
    });

    // Schnittmenge
    rest.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 10000,
    });
    viereck.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 10000,
    });
    red.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 10000,
    });
    gesamtMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 10000
    });
    schnittMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 10000
    });

    // Reset
    rest.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 13000,
    });
    viereck.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 13000,
    });
    red.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 13000,
    });
    gesamtMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 13000
    });
    schnittMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 13000,
    });

    // Vereinigungsmenge
    rest.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1500,
        fill: "forwards",
        delay: 14500,
    });
    gesamtMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 14500
    });
    vereinigungsMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 1500, 
      fill: 'forwards',
      delay: 14500
    });
    

    // Reset
    rest.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards",
        delay: 17500,
    });
    gesamtMenge.animate([{ filter: 'brightness(50%)' }, { filter: 'brightness(100%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 17500
    });
    vereinigungsMenge.animate([{ filter: 'brightness(100%)' }, { filter: 'brightness(50%)' }],
    {
      duration: 500, 
      fill: 'forwards',
      delay: 17500,
    });


}


// Attach click event listener to the SVG element
const svgElement = document.getElementById('mengen_svg');

svgElement.addEventListener('click', () => {

    Animation();
});

gesamtMenge.addEventListener('click', () => {
    red.setAttribute("opacity", "1");
    viereck.setAttribute("opacity", "1");
    redViereck.setAttribute("opacity", "1");
    rest.setAttribute("opacity", "1");
    
    gesamtMenge.style.filter = "brightness(1)";
    redMenge.style.filter = "brightness(0.5)";
    viereckMenge.style.filter = "brightness(0.5)";
    schnittMenge.style.filter = "brightness(0.5)";
    vereinigungsMenge.style.filter = "brightness(0.5)";
});



viereckMenge.addEventListener('click', () => {
    red.setAttribute("opacity", "0");
    viereck.setAttribute("opacity", "1");
    redViereck.setAttribute("opacity", "0");
    rest.setAttribute("opacity", "0");

    gesamtMenge.style.filter = "brightness(0.5)";
    redMenge.style.filter = "brightness(0.5)";
    viereckMenge.style.filter = "brightness(1)";
    schnittMenge.style.filter = "brightness(0.5)";
    vereinigungsMenge.style.filter = "brightness(0.5)";
});



redMenge.addEventListener('click', () => {
    red.setAttribute("opacity", "1");
    viereck.setAttribute("opacity", "0");
    redViereck.setAttribute("opacity", "0");
    rest.setAttribute("opacity", "0");

    gesamtMenge.style.filter = "brightness(0.5)";
    redMenge.style.filter = "brightness(1)";
    viereckMenge.style.filter = "brightness(0.5)";
    schnittMenge.style.filter = "brightness(0.5)";
    vereinigungsMenge.style.filter = "brightness(0.5)";
});



schnittMenge.addEventListener('click', () => {
    red.setAttribute("opacity", "0");
    viereck.setAttribute("opacity", "0");
    redViereck.setAttribute("opacity", "1");
    rest.setAttribute("opacity", "0");

    gesamtMenge.style.filter = "brightness(0.5)";
    redMenge.style.filter = "brightness(0.5)";
    viereckMenge.style.filter = "brightness(0.5)";
    schnittMenge.style.filter = "brightness(1)";
    vereinigungsMenge.style.filter = "brightness(0.5)";
});



vereinigungsMenge.addEventListener('click', () => {
    red.setAttribute("opacity", "1");
    viereck.setAttribute("opacity", "1");
    redViereck.setAttribute("opacity", "0");
    rest.setAttribute("opacity", "0");

    gesamtMenge.style.filter = "brightness(0.5)";
    redMenge.style.filter = "brightness(0.5)";
    viereckMenge.style.filter = "brightness(0.5)";
    schnittMenge.style.filter = "brightness(0.5)";
    vereinigungsMenge.style.filter = "brightness(1)";
});

