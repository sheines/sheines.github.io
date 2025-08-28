const oktanten = document.getElementById("oktanten");
const size = 300;
const scale = 30;

// Oktanten Labels
const labels = [
    { pos: [2, 2, 2], text: 'I' },
    { pos: [-2, 2, 2], text: 'II' },
    { pos: [-2, -2, 2], text: 'III' },
    { pos: [2, -2, 2], text: 'IV' },
    { pos: [2, 2, -2], text: 'V' }, // klappt nicht
    { pos: [-2, 2, -2], text: 'VI' },
    { pos: [-2, -2, -2], text: 'VII' }, // klappt nicht
    { pos: [2, -2, -2], text: 'VIII' }
];

// Ebenen
const planes = {
    XZ: { coords: [[-4, 0, -4], [4, 0, -4], [4, 0, 4], [-4, 0, 4]] },
    YZ: { coords: [[0, -4, -4], [0, 4, -4], [0, 4, 4], [0, -4, 4]] },
    XY: { coords: [[-4, -4, 0], [4, -4, 0], [4, 4, 0], [-4, 4, 0]] } 
};

// Achsen
const axes = [
    { from: [-5, 0, 0], to: [5, 0, 0], color: 'purple', label: 'x' },
    { from: [0, -5, 0], to: [0, 5, 0], color: 'darkgoldenrod', label: 'y' },
    { from: [0, 0, -5], to: [0, 0, 5], color: 'darkturquoise', label: 'z' }
];

let angle = 0;

// Kamera
function getCamera(angle) {
    const r = 10;
    return [r * Math.cos(angle), r * Math.sin(angle), 10];
}

// Projektion 3D → 2D
function project2(x, y, z, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const xRot = x * cosA - y * sinA;
    const yRot = x * sinA + y * cosA;
    return [size + xRot * scale, size - z * scale - yRot * scale * 0.1];
}

// Vor/Hinter-Berechnung für alle Labels
function checkLabel(label, cam) {
    const [labX, labY, labZ] = label.pos;
    const [camX, camY, camZ] = cam;

    // Richtung von Label → Kamera
    const dir = [camX - labX, camY - labY, camZ - labZ];

    const sign = Math.sign(labX*labY);
    let treshold = labZ > 0 ? 3.8 : 3.5 ;
    if (sign > 0 && labZ > 0)
        treshold *=1.5;

    if (label.text == "V" || label.text == "VII")
        treshold *= 2.05;

    // --- XZ-Ebene (Y=0) ---
    let tXZ = dir[1] !== 0 ? -labY / dir[1] : Infinity;
    let xXZ = labX + tXZ * dir[0];
    let zXZ = labZ + tXZ * dir[2];
    const inPlaneXZ = Math.abs(xXZ) <= treshold && Math.abs(zXZ) <= treshold;
    const inFrontXZ = tXZ * sign > 0 || !inPlaneXZ;


    // --- YZ-Ebene (X=0) ---
    let tYZ = dir[0] !== 0 ? -labX / dir[0] : Infinity;
    let yYZ = labY + tYZ * dir[1];
    let zYZ = labZ + tYZ * dir[2];
    const inPlaneYZ = Math.abs(yYZ) <= treshold && Math.abs(zYZ) <= treshold;
    const inFrontYZ = tYZ * sign > 0 || !inPlaneYZ;

    // Vor beiden Ebenen
    return inFrontXZ && inFrontYZ;
}

function render() {
    const cam = getCamera(angle);
    let inner = '';

    // Ebenen
    Object.values(planes).forEach(p => {
        const proj = p.coords.map(c => project2(...c, angle)).map(p => p.join(',')).join(' ');
        inner += `<polygon points="${proj}" class="plane"/>`;
    });

    // Achsen + Pfeile
    axes.forEach(a => {
        const [x1, y1] = project2(...a.from, angle);
        const [x2, y2] = project2(...a.to, angle);
        inner += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${a.color}" class="axis"/>`;

        // Pfeilspitze: länger, schmaler
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const arrowLength = 12; // länger
        const arrowWidth = 4;   // schmaler
        const perpX = -uy * arrowWidth;
        const perpY = ux * arrowWidth;
        inner += `<polygon points="${x2},${y2} ${x2 - perpX - ux * arrowLength},${y2 - perpY - uy * arrowLength} ${x2 + perpX - ux * arrowLength},${y2 + perpY - uy * arrowLength}" fill="${a.color}"/>`;

        // Achsenlabel
        const [lx, ly] = project2(...a.to.map((v, i) => v * 1.1), angle);
        inner += `<text x="${lx}" y="${ly}" class="axis-label" fill="${a.color}" font-family="Times" font-style="italic" text-anchor="middle" alignment-baseline="middle">${a.label}</text>`;
    });


    // Oktanten-Labels rendern mit korrekter Farbe
    labels.forEach(l => {
        const check = checkLabel(l, cam);
        const [x, y] = project2(...l.pos, angle);

        const color = check ? 'blue' : 'darkblue';
        const opacity = check ? 1 : 0.2;
        inner += `<text x="${x}" y="${y}" class="label" fill="${color}" opacity="${opacity}" font-family="Times" text-anchor="middle" alignment-baseline="middle">${l.text}</text>`;
    });

    oktanten.innerHTML = inner;

}

function animate() {
    angle += 0.0033;
    render();
    requestAnimationFrame(animate);
}

animate();
