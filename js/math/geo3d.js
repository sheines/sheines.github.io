const sqrt2 = Math.sqrt(2);

// === Projektion ===
function project([x, y, z]) {
    return [
        (y - x / 2) * 50,
        (-z + x / 2) * 50
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
        return text + "\u20D7"; // z. B. "v⃗"
}

// === Vektorpfeil in Farbe
function ensureArrowMarker(svg, color) {
    const id = `arrow_${color.replace("#", "")}`;
    if (!document.getElementById(id)) {
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        marker.setAttribute("id", id);
        marker.setAttribute("markerWidth", "10");
        marker.setAttribute("markerHeight", "10");
        marker.setAttribute("refX", "5");
        marker.setAttribute("refY", "3");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M0,0 L0,6 L9,3 z");
        path.setAttribute("fill", color);
        marker.appendChild(path);

        svg.querySelector("defs").appendChild(marker);
    }
    return `url(#${id})`;
}

// === Allgemeine Textfunktion ===
function smartTextStyle(text) {
    const isNumeric = Number.isFinite(Number(text));
    return {
        "font-family": "Times New Roman, serif",
        "font-style": isNumeric ? "normal" : "italic",
        "font-size": "28px"
    };
}

function drawText(svg, x, y, label, color = "#a7a7a8", position = "belowright") {
    // Verschiebungen in Pixel für jede Position
    const offsets = {
        belowright: { dx: 12, dy: 19 },
        belowleft: { dx: -19, dy: 19 },
        aboveright: { dx: 5, dy: -5 },
        aboveleft: { dx: -5, dy: -5 },
        left: { dx: -10, dy: 5 },
        right: { dx: 15, dy: 5 },
        above: { dx: 0, dy: -25 },
        below: { dx: 0, dy: 21 },
        center: { dx: 0, dy: 0 }
    };

    const offset = offsets[position] || offsets.belowright;
    const style = smartTextStyle(label);

    svg.innerHTML += `<text x="${x + offset.dx}" y="${y + offset.dy}" fill="${color}"
    font-family="${style['font-family']}"
    font-style="${style['font-style']}"
    font-size="${style['font-size']}"
    dominant-baseline="middle">${label}</text>`;
}

// === Punkte ===
function drawPoint(svg, pos, label = "", color = "red", position = "belowright") {
    const [x, y] = project(pos);
    svg.innerHTML += `<circle cx="${x}" cy="${y}" r="4" fill="${color}" />`;
    drawText(svg, x, y, label, color, position);
}

// === Vektoren ===
function drawVector(svg, start, dir, label = "", color = "blue", position = "belowright") {
    const [x1, y1] = project(start);
    const [x2, y2] = project([start[0] + dir[0], start[1] + dir[1], start[2] + dir[2]]);

    const markerUrl = ensureArrowMarker(svg, color);

    svg.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
    stroke="${color}" stroke-width="2.5" marker-end="${markerUrl}" />`;

    drawText(svg, x2, y2, vectorLabel(label), color, position);
}

// === Geraden ===
function drawLine(svg, point, dir, label = "", color = "green", position = "belowright") {
    const t = 100;
    const p1 = [point[0] - t * dir[0], point[1] - t * dir[1], point[2] - t * dir[2]];
    const p2 = [point[0] + t * dir[0], point[1] + t * dir[1], point[2] + t * dir[2]];
    const [x1, y1] = project(p1);
    const [x2, y2] = project(p2);
    svg.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                      stroke="${color}" stroke-width="1.5" stroke-dasharray="5,5" />`;
    drawText(svg, x2, y2, label, color, position);
}

// === Ebenen ===
function drawPlane(svg, p0, v1, v2, label = "", color = "orange", position = "belowright") {
    const steps = [-10, 10];
    const corners = [
        [0, 0], [1, 0], [1, 1], [0, 1]
    ].map(([a, b]) =>
        [p0[0] + (a ? steps[1] * v1[0] : steps[0] * v1[0]) + (b ? steps[1] * v2[0] : steps[0] * v2[0]),
        p0[1] + (a ? steps[1] * v1[1] : steps[0] * v1[1]) + (b ? steps[1] * v2[1] : steps[0] * v2[1]),
        p0[2] + (a ? steps[1] * v1[2] : steps[0] * v1[2]) + (b ? steps[1] * v2[2] : steps[0] * v2[2])]
    );
    const projected = corners.map(project).map(([x, y]) => `${x},${y}`).join(' ');
    const [xText, yText] = project(p0);
    svg.innerHTML += `<polygon points="${projected}" 
                      fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="0.5" />`;
    drawText(svg, xText, yText, label, color);
}

// === Koordinatensystem ===
function drawAxes(svg, xMax = 4, yMax = 4, zMax = 4, xColor = "#a7a7a8", yColor = "#a7a7a8", zColor = "#a7a7a8") {
    // Farben für Achsen
    const colors = { x: xColor, y: yColor, z: zColor };

    // 2D vs 3D
    if (isNaN(zMax)){ // 2D
        // x-Achse
        const markerX = ensureArrowMarker(svg, colors.x);
        svg.innerHTML += `<line x1="0" y1="0" x2="${project(plane2space([xMax, 0]))[0]}" y2="${project(plane2space([xMax, 0]))[1]}"
        stroke="${colors.x}" stroke-width="2" marker-end="${markerX}" />`;
        drawText(svg, project(plane2space([xMax, 0]))[0], project(plane2space([xMax, 0]))[1], "x", colors.x, "belowright");

        // y-Achse
        const markerY = ensureArrowMarker(svg, colors.y);
        svg.innerHTML += `<line x1="0" y1="0" x2="${project(plane2space([0, yMax]))[0]}" y2="${project(plane2space([0, yMax]))[1]}"
        stroke="${colors.y}" stroke-width="2" marker-end="${markerY}" />`;
        drawText(svg, project(plane2space([0, yMax]))[0], project(plane2space([0, yMax]))[1], "y", colors.y, "above");
    }
    else { // 3D
        // x-Achse
        const markerX = ensureArrowMarker(svg, colors.x);
        svg.innerHTML += `<line x1="0" y1="0" x2="${project([xMax, 0, 0])[0]}" y2="${project([xMax, 0, 0])[1]}"
        stroke="${colors.x}" stroke-width="2" marker-end="${markerX}" />`;
        drawText(svg, project([xMax, 0, 0])[0], project([xMax, 0, 0])[1], "x", colors.x, "belowleft");

        // y-Achse
        const markerY = ensureArrowMarker(svg, colors.y);
        svg.innerHTML += `<line x1="0" y1="0" x2="${project([0, yMax, 0])[0]}" y2="${project([0, yMax, 0])[1]}"
        stroke="${colors.y}" stroke-width="2" marker-end="${markerY}" />`;
        drawText(svg, project([0, yMax, 0])[0], project([0, yMax, 0])[1], "y", colors.y, "right");

        // z-Achse
        const markerZ = ensureArrowMarker(svg, colors.z);
        svg.innerHTML += `<line x1="0" y1="0" x2="${project([0, 0, zMax])[0]}" y2="${project([0, 0, zMax])[1]}"
        stroke="${colors.z}" stroke-width="2" marker-end="${markerZ}" />`;
        drawText(svg, project([0, 0, zMax])[0], project([0, 0, zMax])[1], "z", colors.z, "above");
    }
}
