const scenes = {
    schneidend: {
        lines: [
            { a: [-1, 1, 2], m: [-3, 0.5, 1], c: "darkgoldenrod", style: "solid" },
            { a: [-1, 1, 2], m: [2, 1, 1], c: "cyan", style: "solid" }
        ],
        intersection: [-1, 1, 2]
    },
    parallel: {
        lines: [
            { a: [3, 2, 1], m: [-1, 2, 2], c: "darkgoldenrod", style: "solid" },
            { a: [1, -2, 2], m: [-1, 2, 2], c: "cyan", style: "solid" }
        ]
    },
    identisch: {
        lines: [
            { a: [-1, 1, 2], m: [2, 1, 1], c: "darkgoldenrod", style: "solid" },
            { a: [-1, 1, 2], m: [2, 1, 1], c: "cyan", style: "dashed" }
        ]
    },
    windschief: {
        lines: [
            { a: [2, 0, 2], m: [1, 2, -1], c: "darkgoldenrod", style: "solid" },
            { a: [-1, 0, -1], m: [2, -1, 0.5], c: "cyan", style: "solid" }
        ]
    }
};

class Scene {
    constructor(svgId, config) {
    this.svg = document.getElementById(svgId);
    this.lines = config.lines;
    this.intersection = config.intersection || null;
    this.angle = 0;
}

    getCamera(angle) {
        const r = 10;
        return [r * Math.cos(angle), r * Math.sin(angle), 10];
    }

    project2(x, y, z, angle) {
        const size = 300, scale = 30;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const xRot = x * cosA - y * sinA;
        const yRot = x * sinA + y * cosA;
        return [size + xRot * scale, size - z * scale - yRot * scale * 0.1];
    }

    render() {
        const angle = this.angle;
        let inner = '';

        // === MARKER ===
        inner += `
            <defs>
                <marker id="arrowGray" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                    <path d="M0,1 L7,3 L0,5 Z" fill="#a7a7a8"/>
                </marker>
            </defs>
        `;

        // === KOORDINATENACHSEN ===
        const axes = [
            { from: [-5, 0, 0], to: [5, 0, 0], color: '#a7a7a8', label: 'x' },
            { from: [0, -5, 0], to: [0, 5, 0], color: '#a7a7a8', label: 'y' },
            { from: [0, 0, -2], to: [0, 0, 6], color: '#a7a7a8', label: 'z' }
        ];

        axes.forEach(a => {
            const [x1, y1] = this.project2(...a.from, angle);
            const [x2, y2] = this.project2(...a.to, angle);
            inner += `
              <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                    stroke="${a.color}" stroke-width="2"
                    marker-end="url(#arrowGray)"/>
            `;
        });

        // === GERADEN ===
        this.lines.forEach(line => {
            const rMin = -2, rMax = 2.5;
            const g1 = [
                line.a[0] + rMin * line.m[0],
                line.a[1] + rMin * line.m[1],
                line.a[2] + rMin * line.m[2]
            ];
            const g2 = [
                line.a[0] + rMax * line.m[0],
                line.a[1] + rMax * line.m[1],
                line.a[2] + rMax * line.m[2]
            ];

            const [x1, y1] = this.project2(...g1, angle);
            const [x2, y2] = this.project2(...g2, angle);

            const dash = (line.style === "dashed") ? `stroke-dasharray="10 10"` : "";

            inner += `
                <line x1="${x1}" y1="${y1}"
                    x2="${x2}" y2="${y2}"
                    stroke="${line.c || 'darkgoldenrod'}"
                    stroke-width="2"
                    ${dash}/>
`;
        });

        // === Schnittpunkt (falls vorhanden) ===
        if (this.intersection) {
            const [px, py] = this.project2(
                this.intersection[0],
                this.intersection[1],
                this.intersection[2],
                this.angle
            );

            inner += `
        <circle cx="${px}" cy="${py}" r="2.5"
                fill="magenta" stroke="magenta" stroke-width="1.5"/>
    `;
        }

        this.svg.innerHTML = inner;
    }

    step() {
        this.angle += 0.01;
        this.render();
    }
}

const sceneObjects = [];

for (const [id, config] of Object.entries(scenes)) {
    sceneObjects.push(new Scene(id, config));
}

function animate() {
    sceneObjects.forEach(scene => scene.step());
    requestAnimationFrame(animate);
}
animate();
