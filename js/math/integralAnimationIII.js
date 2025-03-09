
const integralSvg = document.getElementById("integralSvg");


const dt = 0.025;

function p(x) {
    x *= 0.25;
    return 4. * x * x + 0.01;
}


// Funktion zeichnen
function plotFunction(func, graph, color, xStart, xEnd) {
    let pathData = "M"; // M für 'move to' im SVG-Pfad
    for (let x = xStart; x <= xEnd; x += dt) {
        let y = func(x);
        pathData += ` ${x},${-y}`;  // Negatives y, weil SVG-Koordinaten von oben nach unten laufen
    }

    // Erstellen und zum SVG hinzufügen
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", color); // Deine bevorzugte Farbe
    path.setAttribute("stroke-width", "0.075");
    path.setAttribute("fill", "none");

    graph.appendChild(path);
}

function shadeIntegralArea(func, graph, color, xStart, xEnd) {
    let pathData = `M ${xStart},0 L`; // Startpunkt auf der x-Achse

    for (let x = xStart; x <= xEnd; x += dt) {
        let y = func(x);
        pathData += ` ${x},${-y}`;  // Punkte entlang der Funktion
    }

    pathData += ` L ${xEnd},0 Z`; // Zurück zur x-Achse und Fläche schließen

    let shadedArea = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shadedArea.setAttribute("d", pathData);
    shadedArea.setAttribute("fill", color);
    shadedArea.setAttribute("opacity", "0.35"); // Transparenz

    graph.appendChild(shadedArea);
}


function shadeIntegralAreaAnimated(func, graph, color, xStart, xEnd) {
    const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const movingX = document.createElementNS("http://www.w3.org/2000/svg", "text");
    movingX.setAttribute("font-family", "serif");
    movingX.setAttribute("font-size", "0.35");
    movingX.setAttribute("font-style", "italic");
    movingX.setAttribute("fill", color);
    movingX.textContent = "x";
    graph.appendChild(area);
    graph.appendChild(movingX);

    function updatePath(t) {
        let pathData = `M 0,0`;
        for (let x = 0; x <= t; x += dt) {
            let y = func(x);
            pathData += ` L ${x},${-y}`;
        }
        pathData += ` L ${t},0 Z`;
        area.setAttribute("d", pathData);
        area.setAttribute("fill", color);
        area.setAttribute("opacity", "0.5");
        movingX.setAttribute("x", t - 0.1);
        movingX.setAttribute("y", "0.5");
    }

    function animate(t) {
        let direction = 1;
        function step() {
            updatePath(t);
            t += direction * dt * 0.25;
            if (t >= xEnd || t <= xStart) direction *= -1;
            requestAnimationFrame(step);
        }
        step();
    }

    animate(2);
}

shadeIntegralAreaAnimated(p, integralSvg, "Lime", 2, 4);

plotFunction(p, integralSvg, "Darkgoldenrod", 0, 4.25);


