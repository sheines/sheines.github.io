const bsp1Svg = document.getElementById("bsp1Svg");
const bsp1AblSvg = document.getElementById("bsp1AblSvg");

const bsp2Svg = document.getElementById("bsp2Svg");
const bsp2AblSvg = document.getElementById("bsp2AblSvg");


function f1(x) {
    return -1.0 / 50 * (x + 8) * (x - 2) * (x - 7) + 2;
}

function f1Prime(x) {
    return fPrime(x, f1);
}

function f2(x) {
    return -6 * Math.pow(4, -Math.pow((x - 1), 2) / 8) + 2.5;
}
function f2Prime(x) {
    return fPrime(x, f2);
}


// Plot f1(x) and f1' in DarkGoldenRod and initialize the derivative animation path
plotFunction(bsp1Svg, f1, "darkgoldenrod", "functionPath", true);
plotFunction(bsp1AblSvg, f1Prime, "magenta", "functionPath", true, -10, 10);


plotFunction(bsp2Svg, f2, "darkgoldenrod", "functionPath", true);
plotFunction(bsp2AblSvg, f2Prime, "magenta", "functionPath", true, -10, 10);




// Definition der Extrempunkte
const extrema1 = [
    { x: -10 },
    { x: -4.07625 },
    { x: 4.74292 },
    { x: 10 }
];

const extrema2 = [
    { x: 1 }
];

const inflection1 = [
    { x: 0.33333 }
];

const inflection2 = [
    { x: -0.69864 },
    { x: 2.69864 }
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
        bsp1Svg.appendChild(point);

        // Linie zum unteren Koordinatensystem
        const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        dashedLine.setAttribute("x1", extrema1[i].x);
        dashedLine.setAttribute("y1", f1(extrema1[i].x));
        dashedLine.setAttribute("x2", extrema1[i].x);
        dashedLine.setAttribute("y2", yOffset);
        dashedLine.setAttribute("stroke", "cyan");
        dashedLine.setAttribute("stroke-width", "0.08");
        dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
        bsp1Svg.appendChild(dashedLine);

        // Punkt auf der x-Achse im unteren Koordinatensystem markieren
        const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        xAxisPoint.setAttribute("cx", extrema1[i].x);
        xAxisPoint.setAttribute("cy", yOffset);
        xAxisPoint.setAttribute("r", "0.25");
        xAxisPoint.setAttribute("fill", "cyan");
        bsp1Svg.appendChild(xAxisPoint);

    }
}

// Hoch-/Tiefpunkt verbinden
for (i = 0; i < extrema2.length; ++i) {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", extrema2[i].x);
    point.setAttribute("cy", f2(extrema2[i].x));
    point.setAttribute("r", "0.25");
    point.setAttribute("fill", "cyan");
    bsp2Svg.appendChild(point);

    // Linie zum unteren Koordinatensystem
    const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dashedLine.setAttribute("x1", extrema2[i].x);
    dashedLine.setAttribute("y1", f2(extrema2[i].x));
    dashedLine.setAttribute("x2", extrema2[i].x);
    dashedLine.setAttribute("y2", yOffset);
    dashedLine.setAttribute("stroke", "cyan");
    dashedLine.setAttribute("stroke-width", "0.08");
    dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
    bsp2Svg.appendChild(dashedLine);

    // Punkt auf der x-Achse im unteren Koordinatensystem markieren
    const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    xAxisPoint.setAttribute("cx", extrema2[i].x);
    xAxisPoint.setAttribute("cy", yOffset);
    xAxisPoint.setAttribute("r", "0.25");
    xAxisPoint.setAttribute("fill", "cyan");
    bsp2Svg.appendChild(xAxisPoint);

}

// Wendepunkte verbinden
if (inflection1.length > 0) {
    for (i = 0; i < inflection1.length; ++i) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", inflection1[i].x);
        point.setAttribute("cy", f1(inflection1[i].x));
        point.setAttribute("r", "0.25");
        point.setAttribute("fill", "salmon");
        bsp1Svg.appendChild(point);

        // Linie zum unteren Koordinatensystem
        const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        dashedLine.setAttribute("x1", inflection1[i].x);
        dashedLine.setAttribute("y1", f1(inflection1[i].x));
        dashedLine.setAttribute("x2", inflection1[i].x);
        dashedLine.setAttribute("y2", yOffset + f1Prime(inflection1[i].x));
        dashedLine.setAttribute("stroke", "salmon");
        dashedLine.setAttribute("stroke-width", "0.08");
        dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
        bsp1Svg.appendChild(dashedLine);

        // Punkt auf der x-Achse im unteren Koordinatensystem markieren
        const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        xAxisPoint.setAttribute("cx", inflection1[i].x);
        xAxisPoint.setAttribute("cy", yOffset + f1Prime(inflection1[i].x));
        xAxisPoint.setAttribute("r", "0.25");
        xAxisPoint.setAttribute("fill", "salmon");
        bsp1Svg.appendChild(xAxisPoint);

    }
}

// Wendepunkte verbinden
if (inflection2.length > 0) {
    for (i = 0; i < inflection2.length; ++i) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", inflection2[i].x);
        point.setAttribute("cy", f2(inflection2[i].x));
        point.setAttribute("r", "0.25");
        point.setAttribute("fill", "salmon");
        bsp2Svg.appendChild(point);

        // Linie zum unteren Koordinatensystem
        const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        dashedLine.setAttribute("x1", inflection2[i].x);
        dashedLine.setAttribute("y1", f2(inflection2[i].x));
        dashedLine.setAttribute("x2", inflection2[i].x);
        dashedLine.setAttribute("y2", yOffset + f2Prime(inflection2[i].x));
        dashedLine.setAttribute("stroke", "salmon");
        dashedLine.setAttribute("stroke-width", "0.08");
        dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
        bsp2Svg.appendChild(dashedLine);

        // Punkt auf der x-Achse im unteren Koordinatensystem markieren
        const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        xAxisPoint.setAttribute("cx", inflection2[i].x);
        xAxisPoint.setAttribute("cy", yOffset + f2Prime(inflection2[i].x));
        xAxisPoint.setAttribute("r", "0.25");
        xAxisPoint.setAttribute("fill", "salmon");
        bsp2Svg.appendChild(xAxisPoint);

    }
}



function highlightBackground(svgId, color, startX, endX, add = true) {
    // Hole das SVG-Element
    const svg = document.getElementById(svgId);

    // Berechne die Breite des Rechtecks basierend auf den x-Werten
    const width = endX - startX;

    // Erstelle ein Rechteck und setze dessen Eigenschaften
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", startX);
    rect.setAttribute("y", -6); // Setze y-Position, um es zu zeigen
    rect.setAttribute("width", width);
    rect.setAttribute("height", 12); // Höhe des Rechtecks
    rect.setAttribute("fill", color);
    rect.setAttribute("opacity", "0.25"); // optional: transparenter Hintergrund
    rect.setAttribute("clip-path", "url(#clip-area)");

    // Füge das Rechteck in das SVG ein
    if (add)
        svg.insertBefore(rect, svg.firstChild);
    
    return rect;
}

function highlightAreaUnderCurve(svgId, func, color, start, end, add = true) {
    const svg = document.getElementById(svgId);

    // Berechne die y-Werte für die Funktion
    const points = [];
    for (let x = start; x <= end; x += 0.05) {
        const y = func(x); // Berechne den y-Wert der Funktion
        points.push(`${x},${y}`); // Füge den Punkt zum Array hinzu
    }

    // Erstelle die Punkte für das Polygon
    const polygonPoints = points.join(" ");

    // Erstelle ein neues Polygon und setze seine Eigenschaften
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", polygonPoints + ` ${end},0 ${start},0`); // Schließe die Achse ein
    polygon.setAttribute("fill", color);
    polygon.setAttribute("opacity", "0.25"); // optional: transparenter Hintergrund

    // Füge das Polygon als erstes Kind des SVGs hinzu
    if (add)
        svg.insertBefore(polygon, svg.firstChild);

    return polygon;
}

for (i = 0; i < extrema1.length - 1; ++i) {
    highlightBackground("bsp1Svg", i % 2 == 0 ? "green" : "red", extrema1[i].x, extrema1[i + 1].x);
    highlightAreaUnderCurve("bsp1AblSvg", f1Prime, i % 2 == 0 ? "green" : "red", extrema1[i].x, extrema1[i + 1].x);
}

// Funktion 2:
highlightBackground("bsp2Svg", "blue", -10, -5);
highlightAreaUnderCurve("bsp2AblSvg", f2Prime, "blue", -10, -5);
highlightBackground("bsp2Svg", "green", -5, 1);
highlightAreaUnderCurve("bsp2AblSvg", f2Prime, "green", -5, 1);
highlightBackground("bsp2Svg", "red", 1, 7);
highlightAreaUnderCurve("bsp2AblSvg", f2Prime, "red", 1, 7);
highlightBackground("bsp2Svg", "blue", 7, 10);
highlightAreaUnderCurve("bsp2AblSvg", f2Prime, "blue", 7, 10);


    