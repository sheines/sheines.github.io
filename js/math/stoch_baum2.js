const bsp1blau = document.getElementById("bsp1blau");
const bsp1rot = document.getElementById("bsp1rot");
const bsp1grau1 = document.getElementById("bsp1grau1");
const bsp1grau2 = document.getElementById("bsp1grau2");

const bsp2blau = document.getElementById("bsp2blau");
const bsp2rot = document.getElementById("bsp2rot");
const bsp2grau1 = document.getElementById("bsp2grau1");
const bsp2grau2 = document.getElementById("bsp2grau2");


Animation2();

setTimeout(Animation3, 3000);




function Animation2() { 
        
    bsp1blau.animate([{ fill: 'rgb(0, 118, 136)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp1rot.animate([{ fill: 'rgb(255, 0, 0)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp1grau1.animate([{ stroke: 'rgb(168,167,167)' }, { stroke: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });
    bsp1grau2.animate([{ fill: 'rgb(168,167,167)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });
    bsp1grau2.animate([{ stroke: 'rgb(168,167,167)' }, { stroke: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp1blau.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(0, 118, 136)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });

    bsp1rot.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(255, 0, 0)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });

    bsp1grau1.animate([{ stroke: 'rgb(50,50,50)' }, { stroke: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    bsp1grau2.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    bsp1grau2.animate([{ stroke: 'rgb(50,50,50)' }, { stroke: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    
    setTimeout(Animation2, 10000);

}

function Animation3() { 
        
    bsp2blau.animate([{ fill: 'rgb(0, 118, 136)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp2rot.animate([{ fill: 'rgb(255, 0, 0)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp2grau1.animate([{ stroke: 'rgb(168,167,167)' }, { stroke: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });
    bsp2grau2.animate([{ fill: 'rgb(168,167,167)' }, { fill: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });
    bsp2grau2.animate([{ stroke: 'rgb(168,167,167)' }, { stroke: 'rgb(50,50,50)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 2000,
    });

    bsp2blau.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(0, 118, 136)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });

    bsp2rot.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(255, 0, 0)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });

    bsp2grau1.animate([{ stroke: 'rgb(50,50,50)' }, { stroke: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    bsp2grau2.animate([{ fill: 'rgb(50,50,50)' }, { fill: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    bsp2grau2.animate([{ stroke: 'rgb(50,50,50)' }, { stroke: 'rgb(168,167,167)' }], {
        duration: 2000,
        fill: "forwards",
        delay: 8000,
    });
    

    setTimeout(Animation3, 10000);

}
