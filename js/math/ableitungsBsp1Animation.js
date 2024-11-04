const bsp1Svg = document.getElementById("bsp1Svg");
const bsp1AblSvg = document.getElementById("bsp1AblSvg");

// const dt = 0.025;

function f1(x) {
    return -1.0/50*(x+8)*(x-2)*(x-7)+2;
}

function f1Prime(x) {
    return fPrime(x,f1);
}


// Plot f(x) in DarkGoldenRod and initialize the derivative animation path
plotFunction(bsp1Svg, f1, "darkgoldenrod", "functionPath", true);

// Plot f(x) in DarkGoldenRod and initialize the derivative animation path
plotFunction(bsp1AblSvg, f1Prime, "magenta", "functionPath", true, -10, 10);


// Konstanten für die Markierungen und gestrichelten Linien
const extremaColor = "red";  // Farbe der Markierungen
const dashedLineStyle = "2,2";  // Gestricheltes Linienmuster

// Definition der Extrempunkte
const extrema = [
    { x: -10 },
    { x: -4.07625 },
    { x: 4.74292 },
    { x: 10 }
];
const inflection = [
    { x: -0.33333 }
];

// SVG-Koordinaten und Skalierung
const yOffset = 11; // Offset des unteren Koordinatensystems


// Hoch-/Tiefpunkt verbinden
if (extrema.length > 2) {
    for (i = 1; i< extrema.length-1; ++i) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", extremum[i].x);
    point.setAttribute("cy", f1(extremum[i].x));
    point.setAttribute("r", "0.2");
    point.setAttribute("fill", "cyan");
    bsp1Svg.appendChild(point);

    // Linie zum unteren Koordinatensystem
    const dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dashedLine.setAttribute("x1", extremum[i].x);
    dashedLine.setAttribute("y1", f1(extremum[i].x));
    dashedLine.setAttribute("x2", extremum[i].x);
    dashedLine.setAttribute("y2", yOffset);
    dashedLine.setAttribute("stroke", "cyan");
    dashedLine.setAttribute("stroke-width", "0.08");
    dashedLine.setAttribute("stroke-dasharray", "0.2, 0.2"); // gestrichelte Linie
    bsp1Svg.appendChild(dashedLine);

    // Punkt auf der x-Achse im unteren Koordinatensystem markieren
    const xAxisPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    xAxisPoint.setAttribute("cx", extremum[i].x);
    xAxisPoint.setAttribute("cy", yOffset);
    xAxisPoint.setAttribute("r", "0.2");
    xAxisPoint.setAttribute("fill", "cyan");
    bsp1Svg.appendChild(xAxisPoint);

    }
}




function highlightBackground(svgId, color, startX, endX) {
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
    svg.insertBefore(rect, svg.firstChild);
}

function highlightAreaUnderCurve(svgId, func, color, start, end) {
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
    svg.insertBefore(polygon, svg.firstChild);
}

for (i = 0; i < extrema.length -1; ++i) {
    highlightBackground("bsp1Svg", i % 2 == 0 ? "green" : "red", extrema[i].x, extrema[i+1].x);
    highlightAreaUnderCurve("bsp1AblSvg", f1Prime, i % 2 == 0 ? "green" : "red", extrema[i].x, extrema[i+1].x);
}
