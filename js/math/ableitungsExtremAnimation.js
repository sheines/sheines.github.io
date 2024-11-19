const ExtrSvg = document.getElementById("ExtrSvg");
const ExtrAblSvg = document.getElementById("ExtrAblSvg");

function f1(x) {
    return -1.0 / 400 * (x + 7) * (x + 1) * (x + 1) * (x + 1) * (x - 5) - 1;
}

function f1Prime(x) {
    return fPrime(x, f1);
}


plotFunction(ExtrSvg, f1, "darkgoldenrod", "functionPath", true);
plotFunction(ExtrAblSvg, f1Prime, "magenta", "functionPath", true, -10, 10);


// Definition der Extrempunkte
const extrema1 = [
    { x: -10 },
    { x: -5.64758 },
    { x: -1 },
    { x: 3.64758 },
    { x: 10 }
];


// SVG-Koordinaten und Skalierung
const yOffset = 11; // Offset des unteren Koordinatensystems

// Hoch-/Tiefpunkt verbinden
if (extrema1.length > 2) {
    for (i = 1; i < extrema1.length - 1; ++i) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", extrema1[i].x);
        point.setAttribute("cy", f1(extrema1[i].x));
        point.setAttribute("r", "0.25");
        point.setAttribute("fill", "cyan");
        ExtrSvg.appendChild(point);

        // Linie zum unteren Koordinatensystem
        const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        dashedLine.setAttribute("x1", extrema1[i].x);
        dashedLine.setAttribute("y1", f1(extrema1[i].x));
        dashedLine.setAttribute("x2", extrema1[i].x);
        dashedLine.setAttribute("y2", yOffset);
        dashedLine.setAttribute("stroke", "cyan");
        dashedLine.setAttribute("stroke-width", "0.08");
        dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
        ExtrSvg.appendChild(dashedLine);

        // Punkt auf der x-Achse im unteren Koordinatensystem markieren
        const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        xAxisPoint.setAttribute("cx", extrema1[i].x);
        xAxisPoint.setAttribute("cy", yOffset);
        xAxisPoint.setAttribute("r", "0.25");
        xAxisPoint.setAttribute("fill", "cyan");
        ExtrSvg.appendChild(xAxisPoint);

    }
}


    