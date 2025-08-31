/// Vorlage

//<svg id="mysvg" width="600" height="400" viewBox="-400 -300 800 600">
//          <defs></defs>
//        </svg>
//
//       <!-- JS-Datei mit allen Funktionen -->
//        <script src="/js/math/geo3d.js"></script>
//
//        <script>
//          const svg = document.getElementById("mysvg");
//
//          drawAxes(svg, 4, 4, 4);
//
//          const steps = [
//            { type: "point", args: [[1, 3, 2], "P", "green"] },
//            { type: "vector", args: [[0, 0, 0], [1, 3, 2], "a", "cyan"] },
//            { type: "segment", args: [[1, 3, 2], [1, 1, 0], "AB", "orange", "below"] },
//            { type: "vector", args: [[1, 3, 2], [1, 3, 2], "a", "purple"] },
//            { type: "vector", args: [[1, 3, 2], [0, 1, 0], "a", "pink"] },
//            { type: "plane", args: [[1, 3, 2], [1, 3, 2], [0, 1, 0], "E", "darkgoldenrod"] },
//          ];
//
//          drawSequenceWithPersistence(svg, steps, 10000, 1000);
//
//          ODER: 
        //     drawPoint(svg1, [1, 2, 3], "A", "red");
        //   drawPoint(svg1, [-1, 1, 2], "B", "green");
        //   drawVector(svg1, [0, 0, 0], [2, 0, 0], "1", "darkgoldenrod");
        //   drawVector(svg1, [0, 0, 0], [0, 0, -1], "1", "lime");

        //   drawVector(svg1, [0, 0, 0], [0, 1, 0], "1", "darkgoldenrod", "below");
        //   drawVector(svg1, [0, 1, 0], [0, 1, 0], "2", "lime", "below");

//        </script>

// Variablen
let invertX = false;

// x-Achse invertieren
function invertXaxis(){
    invertX = !invertX;
}

// === Projektion ===
function project([x, y, z]) {

    if ([x, y, z].some(v => isNaN(v))) {
        console.error("project received invalid coords:", x, y, z);
        return [0,0]; // fallback
    }

    if (!invertX)
        return [
            (y - x / 2) * 50,
            (-z + x / 2) * 50
        ];
    else
        return [
            (y + x / 2) * 50,
            (-z - x / 2) * 50
        ];
}

// === Unterstützung für 2D
function plane2space([x, y]) {
    return [0, x, y];
}

// === Hilfsfunktion: Vektorpfeil hinzufügen ===
function vectorLabel(text) {
    if (text === "")
        return "";
    else if (!isNaN(text))
        return text;
    else
        return text + "\u20D7"; // z. B. "v⃗"
}

// === Parent-SVG finden ===
function findSVGRoot(element) {
    while (element && element.tagName !== "svg") {
        element = element.parentNode;
    }
    return element;
}

// === Vektorpfeil in Farbe
// === Hilfsfunktion für Doppelpfeil-Marker
function ensureArrowMarkers(element, color) {
    const svgRoot = findSVGRoot(element);
    const idStart = `arrow_start_${color.replace("#", "")}`;
    const idEnd = `arrow_end_${color.replace("#", "")}`;

    // Pfeil für Endpunkt
    if (!svgRoot.querySelector(`#${idEnd}`)) {
        const markerEnd = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        markerEnd.setAttribute("id", idEnd);
        markerEnd.setAttribute("markerWidth", "10");
        markerEnd.setAttribute("markerHeight", "10");
        markerEnd.setAttribute("refX", "5");
        markerEnd.setAttribute("refY", "3");
        markerEnd.setAttribute("orient", "auto");
        markerEnd.setAttribute("markerUnits", "strokeWidth");

        const pathEnd = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEnd.setAttribute("d", "M0,0 L0,6 L9,3 z");
        pathEnd.setAttribute("fill", color);
        markerEnd.appendChild(pathEnd);

        const defs = svgRoot.querySelector("defs") || svgRoot.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), svgRoot.firstChild);
        defs.appendChild(markerEnd);
    }

    // Pfeil für Startpunkt (gespiegelt)
    if (!svgRoot.querySelector(`#${idStart}`)) {
        const markerStart = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        markerStart.setAttribute("id", idStart);
        markerStart.setAttribute("markerWidth", "10");
        markerStart.setAttribute("markerHeight", "10");
        markerStart.setAttribute("refX", "4");
        markerStart.setAttribute("refY", "3");
        markerStart.setAttribute("orient", "auto");
        markerStart.setAttribute("markerUnits", "strokeWidth");

        const pathStart = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathStart.setAttribute("d", "M9,0 L9,6 L0,3 z"); // gespiegelt
        pathStart.setAttribute("fill", color);
        markerStart.appendChild(pathStart);

        const defs = svgRoot.querySelector("defs") || svgRoot.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), svgRoot.firstChild);
        defs.appendChild(markerStart);
    }

    return {
        start: `url(#${idStart})`,
        end: `url(#${idEnd})`
    };
}
// function ensureArrowMarker(element, color) {
//     const svgRoot = findSVGRoot(element);
//     const id = `arrow_${color.replace("#", "")}`;

//     if (!svgRoot.querySelector(`#${id}`)) {
//         const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
//         marker.setAttribute("id", id);
//         marker.setAttribute("markerWidth", "10");
//         marker.setAttribute("markerHeight", "10");
//         marker.setAttribute("refX", "10");        // <<--- wichtig: 10 statt 5
//         marker.setAttribute("refY", "3");
//         marker.setAttribute("orient", "auto");
//         marker.setAttribute("markerUnits", "strokeWidth");

//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute("d", "M0,0 L0,6 L10,3 z"); // <<--- Pfeilspitze bis refX
//         path.setAttribute("fill", color);
//         marker.appendChild(path);

//         const defs = svgRoot.querySelector("defs") || svgRoot.insertBefore(
//             document.createElementNS("http://www.w3.org/2000/svg", "defs"),
//             svgRoot.firstChild
//         );
//         defs.appendChild(marker);
//     }
//     return `url(#${id})`;
// }

// === Allgemeine Textfunktion ===
function smartTextStyle(text) {
    const isNumeric = Number.isFinite(Number(text));
    return {
        "font-family": "Times New Roman, serif",
        "font-style": isNumeric ? "normal" : "italic",
        "font-size": "28px"
    };
}

function drawText(target, x, y, label, color = "#a7a7a8", position = "belowright") {
    const offsets = {
        belowright: { dx: 12, dy: 19 },
        belowleft: { dx: -19, dy: 19 },
        aboveright: { dx: 5, dy: -15 },
        aboveleft: { dx: -15, dy: -15 },
        left: { dx: -25, dy: 5 },
        right: { dx: 15, dy: 0 },
        above: { dx: 0, dy: -25 },
        below: { dx: 0, dy: 21 },
        center: { dx: 0, dy: 0 }
    };

    const offset = offsets[position] || offsets.belowright;
    const style = smartTextStyle(label);

    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", x + offset.dx);
    textEl.setAttribute("y", y + offset.dy);
    textEl.setAttribute("fill", color);
    textEl.setAttribute("font-family", style["font-family"]);
    textEl.setAttribute("font-style", style["font-style"]);
    textEl.setAttribute("font-size", style["font-size"]);
    textEl.setAttribute("dominant-baseline", "middle");
    textEl.textContent = label;

    target.appendChild(textEl);
}

// === Punkte ===
function drawPoint(target, pos, label = "", color = "red", position = "belowright", radius = 4) {
    const [x, y] = project(pos);
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    target.appendChild(circle);

    drawText(target, x, y, label, color, position);
}

// === Vektoren ===
function drawVector(target, start, dir, label = "", color = "blue", position = "belowright", thickness = 2.5) {

    const [x1, y1] = project(start);
    const [x2, y2] = project([
        start[0] + dir[0],
        start[1] + dir[1],
        start[2] + dir[2]
    ]);

    const svgRoot = findSVGRoot(target);
    const markerUrl = ensureArrowMarker(svgRoot, color);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", thickness);
    line.setAttribute("marker-end", markerUrl);
    target.appendChild(line);


    if (label) {
        // Mittelpunkt für Label
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        drawText(target, mx, my, vectorLabel(label), color, position);
    }

}

// === Doppelpfeil ===
function drawArrow(target, start, dir, label = "", color = "blue", position = "belowright", thickness = 2.5) {
    const [x1, y1] = project(start);
    const [x2, y2] = project([
        start[0] + dir[0],
        start[1] + dir[1],
        start[2] + dir[2]
    ]);

    const svgRoot = findSVGRoot(target);
    const markers = ensureArrowMarkers(svgRoot, color);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", thickness);
    line.setAttribute("marker-start", markers.start);
    line.setAttribute("marker-end", markers.end);
    target.appendChild(line);

    // Label zentriert in der Mitte
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    drawText(target, midX, midY, label, color, position);
}

// === Strecke ===
function drawSegment(target, p1, p2, label = "", color = "green", position = "above", thickness = 1.5, dashed = false) {
    // Projektion der Punkte ins 2D
    const [x1, y1] = project(p1);
    const [x2, y2] = project(p2);

    // Linie zeichnen
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", thickness);
    if (dashed)
        line.setAttribute("stroke-dasharray", "5,5");
    target.appendChild(line);

    // Mittelpunkt für Label
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    // Label setzen
    if (label) {
        drawText(target, mx, my, label, color, position);
    }
}

// === Geraden ===
function drawLine(target, point, dir, label = "", color = "green", position = "belowright", thickness = 1.5) {
    const t = 100;
    const p1 = [point[0] - t * dir[0], point[1] - t * dir[1], point[2] - t * dir[2]];
    const p2 = [point[0] + t * dir[0], point[1] + t * dir[1], point[2] + t * dir[2]];
    const [x1, y1] = project(p1);
    const [x2, y2] = project(p2);

    // Linie zeichnen
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", thickness);
    line.setAttribute("stroke-dasharray", "5,5");
    target.appendChild(line);

    // Beschriftung am Stützvektor
    const [px, py] = project(point);
    drawText(target, px, py, label, color, position);
}


// === Ebenen ===
function drawPlane(target, p0, v1, v2, label = "", color = "orange", position = "belowright") {
    const steps = [-1.5, 1.5];
    const corners = [
        [0, 0], [1, 0], [1, 1], [0, 1]
    ].map(([a, b]) =>
        [p0[0] + (a ? steps[1] * v1[0] : steps[0] * v1[0]) + (b ? steps[1] * v2[0] : steps[0] * v2[0]),
        p0[1] + (a ? steps[1] * v1[1] : steps[0] * v1[1]) + (b ? steps[1] * v2[1] : steps[0] * v2[1]),
        p0[2] + (a ? steps[1] * v1[2] : steps[0] * v1[2]) + (b ? steps[1] * v2[2] : steps[0] * v2[2])]
    );

    const projected = corners.map(project).map(([x, y]) => `${x},${y}`).join(" ");
    const [xText, yText] = project(p0);

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", projected);
    poly.setAttribute("fill", color);
    poly.setAttribute("fill-opacity", "0.25");
    poly.setAttribute("stroke", color);
    poly.setAttribute("stroke-width", "0.5");
    target.appendChild(poly);

    drawText(target, xText, yText, label, color, position);
}

// === Polygone ===
function drawPolygon(
    target,
    points3D,
    label = "",
    fillColor = "lightblue",
    strokeColor = "cyan",
    position = "center",
    thickness = 1.5,
    opacity = 0.6
) {
    if (!points3D || points3D.length < 3) {
        console.error("drawPolygon benötigt mindestens 3 Punkte.");
        return;
    }

    // Projektion aller Punkte
    const projected = points3D.map(project);
    const pointStr = projected.map(([x, y]) => `${x},${y}`).join(" ");

    // Polygon zeichnen
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", pointStr);
    poly.setAttribute("fill", fillColor);
    poly.setAttribute("fill-opacity", opacity);
    poly.setAttribute("stroke", strokeColor);
    poly.setAttribute("stroke-width", thickness);
    target.appendChild(poly);

    // Beschriftung in der Mitte
    if (label) {
        const [mx, my] = projected.reduce(
            (acc, [x, y]) => [acc[0] + x, acc[1] + y],
            [0, 0]
        ).map(sum => sum / projected.length);

        drawText(target, mx, my, label, strokeColor, position);
    }
}

// === Koordinatensystem ===
function drawAxes(target, xMax = 4, yMax = 4, zMax = 4, xColor = "#a7a7a8", yColor = "#a7a7a8", zColor = "#a7a7a8") {
    const colors = { x: xColor, y: yColor, z: zColor };

    if (isNaN(zMax)) { // 2D
        const markerX = ensureArrowMarker(target, colors.x);
        const [xX, yX] = project(plane2space([xMax, 0]));
        const lineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineX.setAttribute("x1", 0);
        lineX.setAttribute("y1", 0);
        lineX.setAttribute("x2", xX);
        lineX.setAttribute("y2", yX);
        lineX.setAttribute("stroke", colors.x);
        lineX.setAttribute("stroke-width", "2");
        lineX.setAttribute("marker-end", markerX);
        target.appendChild(lineX);
        drawText(target, xX, yX, "x", colors.x, "belowright");

        const markerY = ensureArrowMarker(target, colors.y);
        const [xY, yY] = project(plane2space([0, yMax]));
        const lineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineY.setAttribute("x1", 0);
        lineY.setAttribute("y1", 0);
        lineY.setAttribute("x2", xY);
        lineY.setAttribute("y2", yY);
        lineY.setAttribute("stroke", colors.y);
        lineY.setAttribute("stroke-width", "2");
        lineY.setAttribute("marker-end", markerY);
        target.appendChild(lineY);
        drawText(target, xY, yY, "y", colors.y, "above");
    } else { // 3D
        const markerX = ensureArrowMarker(target, colors.x);
        const [xX, yX] = project([xMax, 0, 0]);
        const lineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineX.setAttribute("x1", 0);
        lineX.setAttribute("y1", 0);
        lineX.setAttribute("x2", xX);
        lineX.setAttribute("y2", yX);
        lineX.setAttribute("stroke", colors.x);
        lineX.setAttribute("stroke-width", "2");
        lineX.setAttribute("marker-end", markerX);
        target.appendChild(lineX);
        drawText(target, xX, yX, "x", colors.x, "belowleft");

        const markerY = ensureArrowMarker(target, colors.y);
        const [xY, yY] = project([0, yMax, 0]);
        const lineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineY.setAttribute("x1", 0);
        lineY.setAttribute("y1", 0);
        lineY.setAttribute("x2", xY);
        lineY.setAttribute("y2", yY);
        lineY.setAttribute("stroke", colors.y);
        lineY.setAttribute("stroke-width", "2");
        lineY.setAttribute("marker-end", markerY);
        target.appendChild(lineY);
        drawText(target, xY, yY, "y", colors.y, "right");

        const markerZ = ensureArrowMarker(target, colors.z);
        const [xZ, yZ] = project([0, 0, zMax]);
        const lineZ = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineZ.setAttribute("x1", 0);
        lineZ.setAttribute("y1", 0);
        lineZ.setAttribute("x2", xZ);
        lineZ.setAttribute("y2", yZ);
        lineZ.setAttribute("stroke", colors.z);
        lineZ.setAttribute("stroke-width", "2");
        lineZ.setAttribute("marker-end", markerZ);
        target.appendChild(lineZ);
        drawText(target, xZ, yZ, "z", colors.z, "above");
    }
}

// === Mit Animation ===
function drawSequenceWithPersistence(svg, steps, duration = 10000, interval = 1000) {
    let persistent = svg.querySelector("#persistentGroup");
    if (!persistent) {
        persistent = document.createElementNS("http://www.w3.org/2000/svg", "g");
        persistent.setAttribute("id", "persistentGroup");
        svg.appendChild(persistent);
    }

    let animated = svg.querySelector("#animatedGroup");
    if (!animated) {
        animated = document.createElementNS("http://www.w3.org/2000/svg", "g");
        animated.setAttribute("id", "animatedGroup");
        svg.appendChild(animated);
    }

    function clearAnimated() {
        animated.innerHTML = "";
    }

    function drawWithFade(target, fn) {
        fn(target);
        const last = target.lastElementChild;
        if (last) last.classList.add("fade-in");
    }

    function run() {
        clearAnimated();
        steps.forEach((step, i) => {
            setTimeout(() => {
                const target = step.persistent ? persistent : animated;
                drawWithFade(target, g => {
                    if (step.type === "vector") drawVector(g, ...step.args);
                    else if (step.type === "point") drawPoint(g, ...step.args);
                    else if (step.type === "segment") drawSegment(g, ...step.args);
                    else if (step.type === "line") drawLine(g, ...step.args);
                    else if (step.type === "plane") drawPlane(g, ...step.args);
                    else if (step.type === "polygon") drawPolygon(g, ...step.args);
                });
            }, interval * i + interval);
        });

        setTimeout(run, duration);
    }

    run();
}
