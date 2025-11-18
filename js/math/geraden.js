const geraden = document.getElementById("geraden");
const size = 300;
const scale = 30;

const axes = [
    { from: [-5, 0, 0], to: [5, 0, 0], color: '#a7a7a8', label: 'x' },
    { from: [0, -5, 0], to: [0, 5, 0], color: '#a7a7a8', label: 'y' },
    { from: [0, 0, -2], to: [0, 0, 6], color: '#a7a7a8', label: 'z' }
];

let angle = 0;

// Kamera-Position
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

function render() {
    const cam = getCamera(angle);
    let inner = '';

    // Stütz- und Richtungsvektor
    const a = [2, 3, 4];
    const m = [-3, 0.5, -1];

    // Gerade durch a + r*m
    const rMin = -2.0, rMax = 2.5;
    const g1 = [a[0] + rMin*m[0], a[1] + rMin*m[1], a[2] + rMin*m[2]];
    const g2 = [a[0] + rMax*m[0], a[1] + rMax*m[1], a[2] + rMax*m[2]];

    // === Reihenfolge dynamisch ===
    const axisBefore = angle % (2*Math.PI) > Math.PI;
    const drawOrder = axisBefore ? ['z','line'] : ['line','z'];

    // --- Marker-Definitionen ---
    const defs = `
                <defs>
                    <marker id="arrowGray" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                    <path d="M0,1 L7,3 L0,5 Z" fill="#a7a7a8"/>
                    </marker>
                    <marker id="arrowMag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                    <path d="M0,1 L7,3 L0,5 Z" fill="magenta"/>
                    </marker>
                    <marker id="arrowLime" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                    <path d="M0,1 L7,3 L0,5 Z" fill="lime"/>
                    </marker>
                </defs>
                `;

    // --- X/Y-Achsen ---
    axes.slice(0,2).forEach(a => {
        const [x1, y1] = project2(...a.from, angle);
        const [x2, y2] = project2(...a.to, angle);
        inner += `
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke="${a.color}" stroke-width="2"
                marker-end="url(#arrowGray)"/>
        `;
        const [lx, ly] = project2(...a.to.map((v,i)=>v*1.15), angle);
        inner += `<text x="${lx}" y="${ly}" font-family="Times" font-style="italic"
                      font-size="14" fill="${a.color}"
                      text-anchor="middle" alignment-baseline="middle">${a.label}</text>`;
    });

    // --- Gerade ---
    const [gx1, gy1] = project2(...g1, angle);
    const [gx2, gy2] = project2(...g2, angle);
    const lineElement = `<line x1="${gx1}" y1="${gy1}" x2="${gx2}" y2="${gy2}"
                            stroke="darkgoldenrod" stroke-width="2"/>`;

    // --- Z-Achse ---
    const z = axes[2];
    const [zx1, zy1] = project2(...z.from, angle);
    const [zx2, zy2] = project2(...z.to, angle);
    let zAxisElement = `
      <line x1="${zx1}" y1="${zy1}" x2="${zx2}" y2="${zy2}"
            stroke="${z.color}" stroke-width="2"
            marker-end="url(#arrowGray)"/>
    `;
    const [zlx, zly] = project2(...z.to.map((v,i)=>v*1.15), angle);
    zAxisElement += `<text x="${zlx}" y="${zly}" font-family="Times" font-style="italic"
                      font-size="14" fill="${z.color}"
                      text-anchor="middle" alignment-baseline="middle">z</text>`;

    // --- Vektoren ---
    const da = 0.985;
    const [a0x, a0y] = project2(0, 0, 0, angle);
    const [a1x, a1y] = project2(a[0]*da,a[1]*da,a[2]*da, angle);
    const mend = [a[0] + m[0], a[1] + m[1], a[2] + m[2]];
    const [m1x, m1y] = project2(...a, angle);
    const [m2x, m2y] = project2(...mend, angle);

    const vectors = `
      <line x1="${a0x}" y1="${a0y}" x2="${a1x}" y2="${a1y}"
            stroke="magenta" stroke-width="2.5" marker-end="url(#arrowMag)"/>
      <line x1="${m1x}" y1="${m1y}" x2="${m2x}" y2="${m2y}"
            stroke="lime" stroke-width="2.5" marker-end="url(#arrowLime)"/>
      <circle cx="${a1x}" cy="${a1y}" r="2." fill="magenta"/>
      <circle cx="${m2x}" cy="${m2y}" r="2." fill="lime"/>
    `;

    // --- Zusammenbau ---
    if (drawOrder[0] === 'z') inner += zAxisElement + lineElement;
    else inner += lineElement + zAxisElement;
    inner += vectors;

    geraden.innerHTML = defs + inner;
}

function animate() {
    angle += 0.0075;
    render();
    requestAnimationFrame(animate);
}
animate();