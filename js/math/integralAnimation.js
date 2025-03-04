const functionSvg = document.getElementById("functionSvg");
const riemann1Svg = document.getElementById("riemann1Svg");
const riemann2Svg = document.getElementById("riemann2Svg");
const riemann3Svg = document.getElementById("riemann3Svg");
const riemann4Svg = document.getElementById("riemann4Svg");
const riemann5Svg = document.getElementById("riemann5Svg");
const riemann6Svg = document.getElementById("riemann6Svg");
const riemann7Svg = document.getElementById("riemann7Svg");

const oberLabel = document.getElementById("oberLabel");
const unterLabel = document.getElementById("unterLabel");

const oberArea = document.getElementById("oberArea");
const unterArea = document.getElementById("unterArea");

const dt = 0.025;

function f(x) {
    x *= 0.6;
    x += 0.6;
    return 1 / 2 * (x * x * x - 10 * x * x + 30 * x - 20);
}

function p(x) {
    x *= 0.25;
    return 4. * x * x + 0.01;
}

function a1(x) {
    x*=0.25;
    return 1.75*(2 - x*x);
}

function a2(x) {
    x*=0.25;
    return 2*((x-1)*(x-1)*(x-1)+1) + 0.01;
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


function shadeIntegralAreaAnimated(xStart, xEnd) {

    let pathData = `M ${xStart},0 L`;

    for (let x = xStart; x <= xEnd; x += dt) {
        let y = f(x);
        pathData += ` ${x},${-y}`;
    }

    pathData += ` L ${xEnd},0 Z`;

    // Definiere den Clip-Pfad (Maske für die Sichtbarkeit)
    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("id", "clipArea");
    functionSvg.appendChild(clipPath);

    let clipRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    clipRect.setAttribute("x", xStart);
    clipRect.setAttribute("y", "-5");
    clipRect.setAttribute("width", "0"); // Startbreite = 0
    clipRect.setAttribute("height", "10");
    clipRect.setAttribute("fill", "white"); // Muss gefüllt sein
    clipPath.appendChild(clipRect);

    // Fläche unter der Kurve mit Clip-Pfad
    let shadedArea = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shadedArea.setAttribute("d", pathData);
    shadedArea.setAttribute("fill", "lime");
    shadedArea.setAttribute("opacity", "0.25");
    shadedArea.setAttribute("clip-path", "url(#clipArea)");

    functionSvg.appendChild(shadedArea);

    // Breiten-Animation (Vorhang-Effekt)
    let animWidth = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animWidth.setAttribute("attributeName", "width");
    animWidth.setAttribute("values", `0; ${xEnd - xStart}; ${xEnd - xStart}; 0; 0`);
    animWidth.setAttribute("keyTimes", "0; 0.375; 0.875; 0.975; 1");
    animWidth.setAttribute("dur", "8s");
    animWidth.setAttribute("repeatCount", "indefinite");

    // Opazitäts-Animation für das Ausfaden
    let animOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animOpacity.setAttribute("attributeName", "opacity");
    animOpacity.setAttribute("values", "0.5; 0.5; 0; 0; 0.5");
    animOpacity.setAttribute("keyTimes", "0; 0.75; 0.875; 1; 1");
    animOpacity.setAttribute("dur", "8s");
    animOpacity.setAttribute("repeatCount", "indefinite");

    // Animationen anhängen
    clipRect.appendChild(animWidth);
    shadedArea.appendChild(animOpacity);
}

function plotRiemannSum(func, graph, fillColor, strokeColor, xStart, xEnd, numRectangles, method = "midpoint", showBorder = true) {
    const rectWidth = (xEnd - xStart) / numRectangles;

    for (let i = 0; i < numRectangles; i++) {
        let xLeft = xStart + i * rectWidth;
        let xSample;

        // Auswahl der Methode: "left", "right" oder "midpoint"
        if (method === "left") {
            xSample = xLeft;
        } else if (method === "right") {
            xSample = xLeft + rectWidth;
        } else {
            xSample = xLeft + rectWidth / 2;
        }

        let height = func(xSample);

        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", xLeft);
        rect.setAttribute("y", -Math.max(0, height)); // SVG-Koordinaten invertiert
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", Math.abs(height));
        rect.setAttribute("fill", fillColor);
        rect.setAttribute("opacity", "0.35"); // Leicht transparent

        // Rahmenfarbe und Sichtbarkeit
        if (showBorder) {
            rect.setAttribute("stroke", strokeColor);
            rect.setAttribute("stroke-width", "0.035");
        } else {
            rect.setAttribute("stroke", "none");
        }

        graph.appendChild(rect);
    }
}

function calculateArea(rectCount, method) {
    const dx = 1.0 / rectCount;
    if (method == "left") {
        let A = 0.0;
        for (i = 0; i < rectCount; ++i)
            A += dx * (i / rectCount) * (i / rectCount);

        return A;
    }
    else if (method == "right") {
        let A = 0.0;
        for (i = 1; i<=rectCount; ++i) 
            A+= dx * (i / rectCount) * (i / rectCount);

        return A;
    } 
    else {
        return 0;
    }
}

function animateRiemannSum(func, graph, fillColor, strokeColor, xStart, xEnd, rectCountArray, method = "midpoint", showBorder = true, duration = 3) {
    let rectWidth = (xEnd - xStart) / rectCountArray[0]; // Initiale Breite der Rechtecke
    let index = 0; // Startindex für das Array
    const dt = 0.025; // Schrittweite für die Animation

    // Funktion, die Rechtecke zeichnet
    function plotRectangles(numRectangles) {
        const existingRects = graph.querySelectorAll("rect"); // Behalte alle bereits gezeichneten Rechtecke

        // Leere nur die Rechtecke, nicht das gesamte SVG
        existingRects.forEach(rect => rect.remove());

        rectWidth = (xEnd - xStart) / numRectangles;

        if (method === "left") {
            unterLabel.innerHTML = `${numRectangles}`;
            unterArea.textContent = `${calculateArea(numRectangles, method).toFixed(3).replace(".",",")} FE`;
        } else if (method === "right") {
            oberLabel.innerHTML = `${numRectangles}`;
            oberArea.textContent = `${calculateArea(numRectangles, method).toFixed(3).replace(".",",")} FE`;
        } else {

        }

        for (let i = 0; i < numRectangles; i++) {
            let xLeft = xStart + i * rectWidth;
            let xSample;

            if (method === "left") {
                xSample = xLeft;
            } else if (method === "right") {
                xSample = xLeft + rectWidth;
            } else {
                xSample = xLeft + rectWidth / 2;
            }


            let height = func(xSample);

            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", xLeft);
            rect.setAttribute("y", -Math.max(0, height)); // SVG-Koordinaten invertiert
            rect.setAttribute("width", rectWidth);
            rect.setAttribute("height", Math.abs(height));
            rect.setAttribute("fill", fillColor);
            rect.setAttribute("opacity", "0.35"); // Leicht transparent

            // Rahmenfarbe und Sichtbarkeit
            if (showBorder) {
                rect.setAttribute("stroke", strokeColor);
                rect.setAttribute("stroke-width", "0.035");
            } else {
                rect.setAttribute("stroke", "none");
            }

            graph.appendChild(rect);
        }
    }

    // Start der Animation
    function animate() {
        if (index < rectCountArray.length) {
            plotRectangles(rectCountArray[index]);
            index++;

            // Die Animation wird durch setTimeout gesteuert, mit einer Pause zwischen den Änderungen
            setTimeout(animate, duration * 1000);
        } else {
            // Animation zurücksetzen
            index = 0;
            setTimeout(animate, 1000); // Animation neu starten nach einer kurzen Pause
        }
    }

    animate();
}

// Vorschaubild
shadeIntegralAreaAnimated(1.5, 7.5);
plotFunction(f, functionSvg, "Darkgoldenrod", 0.25, 8.2);

// Integral
shadeIntegralArea(p, riemann1Svg, "lime", 0, 4);
plotFunction(p, riemann1Svg, "Aqua", 0, 4.25);

plotRiemannSum(p, riemann2Svg, "Darkgoldenrod", "Yellow", 0, 4, 4, "left", true);
plotFunction(p, riemann2Svg, "Aqua", 0, 4.25);

plotRiemannSum(p, riemann3Svg, "Blue", "Lightblue", 0, 4, 4, "right", true);
plotFunction(p, riemann3Svg, "Aqua", 0, 4.25);


plotRiemannSum(p, riemann4Svg, "Blue", "Lightblue", 0, 4, 4, "right", true);
plotRiemannSum(p, riemann4Svg, "Darkgoldenrod", "Yellow", 0, 4, 4, "left", true);
plotFunction(p, riemann4Svg, "Aqua", 0, 4.25);

const rectCountArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 150, 200];
animateRiemannSum(p, riemann5Svg, "Darkgoldenrod", "Yellow", 0, 4, rectCountArray, "left", true, 0.20);
plotFunction(p, riemann5Svg, "Aqua", 0, 4.25);

animateRiemannSum(p, riemann6Svg, "Blue", "Lightblue", 0, 4, rectCountArray, "right", true, 0.20);
plotFunction(p, riemann6Svg, "Aqua", 0, 4.25);

plotRiemannSum(a1, riemann7Svg, "Darkgoldenrod", "Yellow", 0, 4, 5, "right", true);
plotFunction(a1, riemann7Svg, "Gray", 0, 5.75);
plotFunction(a1, riemann7Svg, "Aqua", 0, 4);

plotRiemannSum(a1, riemann8Svg, "Blue", "Lightblue", 0, 4, 5, "left", true);
plotFunction(a1, riemann8Svg, "Gray", 0, 5.75);
plotFunction(a1, riemann8Svg, "Aqua", 0, 4);


plotRiemannSum(a2, riemann9Svg, "Darkgoldenrod", "Yellow", 0, 8, 4, "left", true);
plotFunction(a2, riemann9Svg, "Aqua", 0, 8);

plotRiemannSum(a2, riemann10Svg,  "Blue", "Lightblue", 0, 8, 4, "right", true);
plotFunction(a2, riemann10Svg, "Aqua", 0, 8);