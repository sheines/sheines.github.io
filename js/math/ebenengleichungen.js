const paraform = document.getElementById("paraform");
const normform = document.getElementById("normform");
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

    // === Ebene: Stütz- und Richtungsvektoren ===
    const a = [2, 3, 1.5];
    const u = [3, -1, 0.5];
    const v = [-1, -2, 1.5];
    const n = [0.125,1.25,1.75]

    // Parameterbereich der Ebene (kleines Rechteck)
    const sMin = -1.2, sMax = 1.2;
    const tMin = -1.2, tMax = 1.2;

    // 4 Eckpunkte des Ebenen-Parallelogramms
    const P = [
        [a[0] + sMin * u[0] + tMin * v[0],
         a[1] + sMin * u[1] + tMin * v[1],
         a[2] + sMin * u[2] + tMin * v[2]],

        [a[0] + sMax * u[0] + tMin * v[0],
         a[1] + sMax * u[1] + tMin * v[1],
         a[2] + sMax * u[2] + tMin * v[2]],

        [a[0] + sMax * u[0] + tMax * v[0],
         a[1] + sMax * u[1] + tMax * v[1],
         a[2] + sMax * u[2] + tMax * v[2]],

        [a[0] + sMin * u[0] + tMax * v[0],
         a[1] + sMin * u[1] + tMax * v[1],
         a[2] + sMin * u[2] + tMax * v[2]]
    ];

    // === Defs ===
    const defs = `
        <defs>
            <marker id="arrowMag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="magenta"/>
            </marker>
            <marker id="arrowOra" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="orange"/>
            </marker>
            <marker id="arrowLime" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="lime"/>
            </marker>
            <marker id="arrowGray" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="#a7a7a8"/>
            </marker>
            <marker id="arrowCyan" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="cyan"/>
            </marker>
        </defs>
    `;

    // === XY-Achsen zeichnen wie gehabt ===
    axes.slice(0,2).forEach(ax => {
        const [x1,y1] = project2(...ax.from, angle);
        const [x2,y2] = project2(...ax.to, angle);
        inner += `
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                  stroke="${ax.color}" stroke-width="2"
                  marker-end="url(#arrowGray)"/>
        `;
        const [lx,ly] = project2(...ax.to.map((v,i)=>v*1.15), angle);
        inner += `<text x="${lx}" y="${ly}" font-family="Times" font-style="italic"
                    font-size="14" fill="${ax.color}"
                    text-anchor="middle">${ax.label}</text>`;
    });

    // === Ebene als Polygon ===
    const projected = P.map(p => project2(...p, angle));
    const polygonPoints = projected.map(p => p.join(',')).join(' ');

    const planeElement = `
        <polygon points="${polygonPoints}"
                 fill="darkgoldenrod"
                 fill-opacity="0.35"
                 stroke="darkgoldenrod"
                 stroke-width="1.5"/>
    `;

    // === Z-Achse ===
    const z = axes[2];
    const [zx1,zy1] = project2(...z.from, angle);
    const [zx2,zy2] = project2(...z.to, angle);

    let zAxisElement = `
        <line x1="${zx1}" y1="${zy1}" x2="${zx2}" y2="${zy2}"
              stroke="${z.color}" stroke-width="2"
              marker-end="url(#arrowGray)"/>
    `;
    const [zlx,zly] = project2(...z.to.map((v,i)=>v*1.15), angle);
    zAxisElement += `<text x="${zlx}" y="${zly}" font-family="Times"
                      font-style="italic" font-size="14"
                      fill="${z.color}">z</text>`;

    // === Vektoren zur Ebene ===
    // Stützvektor: cyan vom Ursprung zum Punkt a
    const [oX, oY] = project2(0,0,0, angle);
    const [ax,ay] = project2(...a, angle);
    const [uEndx, uEndy] = project2(a[0]+u[0], a[1]+u[1], a[2]+u[2], angle);
    const [vEndx, vEndy] = project2(a[0]+v[0], a[1]+v[1], a[2]+v[2], angle);
    const [nEndx, nEndy] = project2(a[0]+n[0], a[1]+n[1], a[2]+n[2], angle);

    const vectorsP = `
        <!-- Stützvektor (cyan) -->
        <line x1="${oX}" y1="${oY}" x2="${ax}" y2="${ay}"
              stroke="cyan" stroke-width="2.5" marker-end="url(#arrowCyan)"/>
        <circle cx="${ax}" cy="${ay}" r="3" fill="cyan" stroke="black" stroke-width="0.6"/>

        <!-- Richtungsvektoren -->
        <line x1="${ax}" y1="${ay}" x2="${uEndx}" y2="${uEndy}"
              stroke="magenta" stroke-width="2.5" marker-end="url(#arrowMag)"/>
        <line x1="${ax}" y1="${ay}" x2="${vEndx}" y2="${vEndy}"
              stroke="lime" stroke-width="2.5" marker-end="url(#arrowLime)"/>
    `;
    const vectorsN = `
        <!-- Stützvektor (cyan) -->
        <line x1="${oX}" y1="${oY}" x2="${ax}" y2="${ay}"
              stroke="cyan" stroke-width="2.5" marker-end="url(#arrowCyan)"/>
        <circle cx="${ax}" cy="${ay}" r="3" fill="cyan" stroke="black" stroke-width="0.6"/>

        <!-- Normalenvektor -->
        <line x1="${ax}" y1="${ay}" x2="${nEndx}" y2="${nEndy}"
              stroke="orange" stroke-width="2.5" marker-end="url(#arrowOra)"/>
    `;

    // === Reihenfolge: Ebene kann vor oder hinter z liegen ===
    const axisBefore = angle % (2*Math.PI) > Math.PI;
    if (axisBefore) inner += zAxisElement + planeElement;
    else inner += planeElement + zAxisElement;

    innerP = inner + vectorsP;
    innerN = inner + vectorsN;

    paraform.innerHTML = defs + innerP;
    normform.innerHTML = defs + innerN;
}

function animate() {
    angle += 0.0075;
    render();
    requestAnimationFrame(animate);
}
animate();

function depthOfPoint(x,y,z, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const xRot = x * cosA - y * sinA;
    const yRot = x * sinA + y * cosA;
    // wie beim project2, aber OHNE 2D-Projektion — wir geben die Tiefe zurück
    return z + yRot * 0.1;
}



// === Defs ===
    const defs = `
        <defs>
            <marker id="arrowMag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="magenta"/>
            </marker>
            <marker id="arrowLime" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="lime"/>
            </marker>
            <marker id="arrowGray" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="#a7a7a8"/>
            </marker>
            <marker id="arrowCyan" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,1 L7,3 L0,5 Z" fill="cyan"/>
            </marker>
        </defs>
    `;