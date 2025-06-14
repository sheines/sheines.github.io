function factorial(k) {
    return k <= 1 ? 1 : k * factorial(k - 1);
}

function binomial(n, k, p) {
    const binomCoeff = factorial(n) / (factorial(k) * factorial(n - k));
    return binomCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function createBinomialSVG(n, p, scaleSetting = 'auto', extraTick) {
    const svgNS = "http://www.w3.org/2000/svg";
    const probs = Array.from({ length: n + 1 }, (_, k) => binomial(n, k, p));
    const maxP = Math.max(...probs);

    // dynamische Skalierung abhängig vom maxP oder manuell gesetzt
    let yScale;
    if (scaleSetting === 'auto') {
        yScale = 10;
        if (maxP < 0.1) {
            yScale = 40;
        } else if (maxP < 0.2) {
            yScale = 20;
        }
    } else {
        yScale = parseInt(scaleSetting, 10);
    }

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `-1.5 -${yScale * maxP + 2} ${n + 4} ${yScale * maxP + 3}`);

    const yAxisX = 0.5; // y-Achse durch k = 0

    // Achsenlinien und Pfeile
    svg.innerHTML += `
    <line x1="${yAxisX}" y1="0" x2="${n + 1.2}" y2="0" stroke="#a7a7a7" stroke-width="0.05"/>
    <line x1="${yAxisX}" y1="0" x2="${yAxisX}" y2="${-yScale * maxP - 0.5}" stroke="#a7a7a7" stroke-width="0.05"/>
    <polygon points="${n + 1.9},0 ${n + 1.1},-0.15 ${n + 1.1},0.15" fill="#a7a7a7"/>
    <polygon points="${yAxisX},${-yScale * maxP - 1.2} ${yAxisX - 0.15},${-yScale * maxP - 0.5} ${yAxisX + 0.15},${-yScale * maxP - 0.5}" fill="#a7a7a7"/>

    <text x="${n + 2.1}" y="0.7" font-family="serif" font-size="0.9" font-style="italic" fill="#a8a7a7">k</text>
    <text x="${yAxisX - 0.8}" y="${-yScale * maxP - 1.4}" font-family="serif" font-size="0.9" font-style="italic" fill="#a8a7a7">P</text>
  `;

    // y-Achse: Beschriftung in 0.1er-Schritten (1 LE = 0.1)
    for (let i = 0.1; i <= maxP + (extraTick ? 0.101 : 0); i += 0.1) {
        const y = -yScale * i;
        svg.innerHTML += `
      <line x1="${yAxisX - 0.15}" y1="${y}" x2="${yAxisX}" y2="${y}" stroke="#a7a7a7" stroke-width="0.03"/>
      <text x="${yAxisX - 1.2}" y="${y + 0.25}" font-family="serif" font-size="0.7" fill="#a8a7a7">${i.toFixed(1).replace(".", ",")}</text>
    `;
    }

    if (extraTick) {
        // zusätzlicher Strich über dem letzten
        const overY = -yScale * (Math.floor(maxP * 10 + 1) / 10);
        svg.innerHTML += `
    <line x1="${yAxisX - 0.15}" y1="${overY}" x2="${yAxisX}" y2="${overY}" stroke="#a7a7a7" stroke-width="0.03"/>
  `;
    }

    // Balken + x-Achsenbeschriftung mit Strich
    probs.forEach((prob, k) => {
        const height = -yScale * prob;

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", k);                   // direkt bei k starten
        rect.setAttribute("y", height);
        rect.setAttribute("width", "1.0");
        rect.setAttribute("height", -height);
        rect.setAttribute("fill", "green");
        rect.setAttribute("fill-opacity", "0.6");
        rect.setAttribute("stroke", "lime");
        rect.setAttribute("stroke-width", "0.03");
        svg.appendChild(rect);

        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", k + 0.35);
        label.setAttribute("y", "0.75");
        label.setAttribute("font-family", "serif");
        label.setAttribute("font-size", "0.7");
        label.setAttribute("fill", "#a8a7a7");
        label.textContent = k;
        svg.appendChild(label);

        const tick = document.createElementNS(svgNS, "line");
        tick.setAttribute("x1", k + 0.5);
        tick.setAttribute("y1", "0");
        tick.setAttribute("x2", k + 0.5);
        tick.setAttribute("y2", "0.15");
        tick.setAttribute("stroke", "#a7a7a7");
        tick.setAttribute("stroke-width", "0.03");
        svg.appendChild(tick);
    });

    return svg;
}





function renderAllBinomialCharts() {
    document.querySelectorAll('.binomial-chart').forEach(container => {
        const n = parseInt(container.dataset.n);
        const p = parseFloat(container.dataset.p);
        const scale = parseFloat(container.dataset.scale);
        const plus = parseInt(container.dataset.plus);

        const svg = createBinomialSVG(n, p, scale * 10, plus);
        const wrapper = document.createElement("div");
        wrapper.classList.add("chart-container");
        wrapper.appendChild(svg);

        container.appendChild(wrapper);
    });
}

document.addEventListener("DOMContentLoaded", renderAllBinomialCharts);
