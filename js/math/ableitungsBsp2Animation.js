const bsp2Svg = document.getElementById("bsp2Svg");
const bsp2AblSvg = document.getElementById("bsp2AblSvg");

// const dt = 0.025;

function f2(x) {
    return -1.0/50*(x+8)*(x-2)*(x-7)+2;
}


// Plot f(x) in DarkGoldenRod and initialize the derivative animation path
plotFunction(bsp2AblSvg, f2, "darkgoldenrod", "functionPath", true);

