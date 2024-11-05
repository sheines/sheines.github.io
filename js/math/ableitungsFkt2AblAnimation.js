const fkt2Abl = document.getElementById("fkt2Abl");
const fkt2AblAbl = document.getElementById("fkt2AblAbl");

function f3(x) {
    return -4* Math.sin(0.4*x-0.3) -1;
}

function f3Prime(x) {
    return fPrime(x, f3);
}


function getPointOnGraph(x, color, func, oben = true, ablfunc = null, isZero = true){
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", x);
    if (oben)
        point.setAttribute("cy", func(x));
    else {
        if (isZero)
            point.setAttribute("cy", yOffset);
        else
            point.setAttribute("cy", ablfunc(x) + yOffset);
    }

    point.setAttribute("r", "0.225");
    point.setAttribute("fill", color); 
    point.setAttribute("opacity", 0);

    return point;
}
function getLine(x, color, func, ablfunc, isZero = true) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", func(x));
        line.setAttribute("x2", x);
        if (isZero)
            line.setAttribute("y2", yOffset);
        else
            line.setAttribute("y2", ablfunc(x) + yOffset);

        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "0.06");
        line.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
        line.setAttribute("opacity", 0);

    return line;
}


// Plot f1(x) and f1' in DarkGoldenRod and initialize the derivative animation path
plotFunction(fkt2Abl, f3, "darkgoldenrod", "functionPath");

// Ableitungsgraph
const ablPath = plotFunction(fkt2AblAbl, f3Prime, "magenta", "functionPath", false);
const ablPathLength = ablPath.getTotalLength();
fkt2AblAbl.appendChild(ablPath);
ablPath.style.strokeDasharray = ablPathLength;
ablPath.style.strokeDashoffset = ablPathLength;
ablPath.style.opacity = 0;

// Extrem und Wendepunkte  / x≈12.531 - 7.8540 n, n element Z / x≈0.75000 - 7.8540 n, n element Z
 
const e1f = getPointOnGraph(12.531 - 7.8540*2,"cyan", f3);
fkt2Abl.appendChild(e1f);
const el1 = getLine(12.531 - 7.8540*2,"cyan", f3,f3Prime, true)
fkt2Abl.appendChild(el1);
const e1a = getPointOnGraph(12.531 - 7.8540*2, "cyan", f3, false, f3Prime, true);
fkt2Abl.appendChild(e1a);

const e2f = getPointOnGraph(12.531 - 7.8540*1,"cyan", f3);
fkt2Abl.appendChild(e2f);
const el2 = getLine(12.531 - 7.8540*1,"cyan", f3,f3Prime, true)
fkt2Abl.appendChild(el2);
const e2a = getPointOnGraph(12.531 - 7.8540*1, "cyan", f3, false, f3Prime, true);
fkt2Abl.appendChild(e2a);

const w1f = getPointOnGraph(0.75000 - 7.8540*1,"salmon", f3);
fkt2Abl.appendChild(w1f);
const wl1 = getLine(0.75000 - 7.8540*1,"salmon", f3,f3Prime, false)
fkt2Abl.appendChild(wl1);
const w1a = getPointOnGraph(0.75000 - 7.8540*1, "salmon", f3, false, f3Prime, false);
fkt2Abl.appendChild(w1a);

const w2f = getPointOnGraph(0.75000 - 7.8540*0,"salmon", f3);
fkt2Abl.appendChild(w2f);
const wl2 = getLine(0.75000 - 7.8540*0,"salmon", f3,f3Prime, false)
fkt2Abl.appendChild(wl2);
const w2a = getPointOnGraph(0.75000 - 7.8540*0, "salmon", f3, false, f3Prime, false);
fkt2Abl.appendChild(w2a);

const w3f = getPointOnGraph(0.75000 + 7.8540*1,"salmon", f3);
fkt2Abl.appendChild(w3f);
const wl3 = getLine(0.75000 + 7.8540*1,"salmon", f3,f3Prime, false)
fkt2Abl.appendChild(wl3);
const w3a = getPointOnGraph(0.75000 + 7.8540*1, "salmon", f3, false, f3Prime, false);
fkt2Abl.appendChild(w3a);

// Start und Ende
const leftStartArea = highlightBackground(fkt2Abl, "red", -10, -9, false);
leftStartArea.setAttribute("opacity", 0);
fkt2Abl.insertBefore(leftStartArea,fkt2Abl.firstChild)
const leftStartPoint = getPointOnGraph(-10, "red", f3, false, f3Prime, false);
fkt2Abl.appendChild(leftStartPoint);

const rightEndArea = highlightBackground(fkt2Abl, "red", 9, 10, false);
rightEndArea.setAttribute("opacity", 0);
fkt2Abl.insertBefore(rightEndArea,fkt2Abl.firstChild)
const rightEndPoint = getPointOnGraph(10, "red", f3, false, f3Prime, false);
fkt2Abl.appendChild(rightEndPoint);

function animateFkt2Abl() {

    // Graph zurückzurücksetzen
    ablPath.animate(
        [
            { strokeDashoffset: 0 },
            { strokeDashoffset: ablPathLength }
        ],
        {
            duration: 1000, // Dauer der Verlauf-Animation in Millisekunden
            fill: "forwards",
            delay: 0,
        }
    );
    ablPath.animate([{opacity: 0}, {opacity: 1}], {
        duration: 500,
        fill: "forwards",
        delay: 1500,
    });

    // Hoch und Teifpunkte
    e1f.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
    });
    e2f.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 1500,
    });
    el1.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 3000,
    });
    el2.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });
    e1a.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 3500,
    });
    e2a.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 4000,
    });

    // Wendepunkte
    w1f.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 7000,
    });
    wl1.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 9000,
    });
    w1a.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 9000,
    });
    w2f.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 7500,
    });
    wl2.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 9500,
    });
    w2a.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 9500,
    });
    w3f.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 8000,
    });
    wl3.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 10000,
    });
    w3a.animate([{opacity: 0}, {opacity: 1}], {
        duration: 1000,
        fill: "forwards",
        delay: 10000,
    });

    // Start und Endbereich
    leftStartArea.animate([{opacity: 0}, {opacity: 0.3}], {
        duration: 1000,
        fill: "forwards",
        delay: 12000,
    });
    leftStartPoint.animate([{opacity: 0}, {opacity: 0.6}], {
        duration: 1000,
        fill: "forwards",
        delay: 13000,
    });
    rightEndArea.animate([{opacity: 0}, {opacity: 0.3}], {
        duration: 1000,
        fill: "forwards",
        delay: 15000,
    });
    rightEndPoint.animate([{opacity: 0}, {opacity: 0.6}], {
        duration: 1000,
        fill: "forwards",
        delay: 16000,
    });
    ablPath.animate(
        [
            { strokeDashoffset: ablPathLength },
            { strokeDashoffset: 0 }
        ],
        {
            duration: 4000, // Dauer der Verlauf-Animation in Millisekunden
            fill: "forwards",
            delay: 18000,
        }
    );
    setTimeout(resetAbl, 25000);
}

function resetAbl() {
    // Hoch und Teifpunkte
    e1f.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    e2f.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    el1.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    el2.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    e1a.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    e2a.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Wendepunkte
    w1f.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    wl1.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    w1a.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    w2f.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    wl2.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    w2a.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    w3f.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    wl3.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    w3a.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });

    // Start und Endbereich
    leftStartArea.animate([{opacity: 0.3}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    leftStartPoint.animate([{opacity: 0.6}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    rightEndArea.animate([{opacity: 0.3}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    rightEndPoint.animate([{opacity: 0.6}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    ablPath.animate([{opacity: 1}, {opacity: 0}], {
        duration: 500,
        fill: "forwards",
        delay: 500,
    });
    
    setTimeout(animateFkt2Abl, 1000);
}


animateFkt2Abl();

