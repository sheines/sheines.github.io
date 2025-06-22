function factorial(k) {
    return k <= 1 ? 1 : k * factorial(k - 1);
}

function binomial(n, k, p) {
    const binomCoeff = factorial(n) / (factorial(k) * factorial(n - k));
    return binomCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function createBinomialSVG(n, p, scaleSetting = 'auto', extraTick, fixedMaxP = null, fixedMaxN = null, showMu = false, showSigma = false, showK = true) {
    const svgNS = "http://www.w3.org/2000/svg";
    const probs = Array.from({ length: Math.floor(n) + 1 }, (_, k) => binomial(n, k, p));
    const trueMaxP = Math.max(...probs);
    const maxP = fixedMaxP !== null ? fixedMaxP : trueMaxP;

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

    const maxN = fixedMaxN !== null ? fixedMaxN : n;


    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `-1.5 -${yScale * maxP + 2} ${maxN + 4} ${yScale * maxP + 3}`);

    const yAxisX = 0.5; // y-Achse durch k = 0



    // Achsenlinien und Pfeile
    svg.innerHTML += `
    <line x1="${yAxisX}" y1="0" x2="${maxN + 1.2}" y2="0" stroke="#a7a7a7" stroke-width="0.05"/>
    <line x1="${yAxisX}" y1="0" x2="${yAxisX}" y2="${-yScale * maxP - 0.5}" stroke="#a7a7a7" stroke-width="0.05"/>
    <polygon points="${maxN + 1.9},0 ${maxN + 1.1},-0.15 ${maxN + 1.1},0.15" fill="#a7a7a7"/>
    <polygon points="${yAxisX},${-yScale * maxP - 1.2} ${yAxisX - 0.15},${-yScale * maxP - 0.5} ${yAxisX + 0.15},${-yScale * maxP - 0.5}" fill="#a7a7a7"/>

    <text x="${(fixedMaxN !== null ? fixedMaxN : n) + 2.1}" y="0.7" font-family="serif" font-size="0.9" font-style="italic" fill="#a8a7a7">k</text>
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

        if (showK) {
            const label = document.createElementNS(svgNS, "text");
            label.setAttribute("x", k + 0.35);
            label.setAttribute("y", "0.75");
            label.setAttribute("font-family", "serif");
            label.setAttribute("font-size", "0.7");
            label.setAttribute("fill", "#a8a7a7");
            label.textContent = k;
            svg.appendChild(label);
        }


        const tick = document.createElementNS(svgNS, "line");
        tick.setAttribute("x1", k + 0.5);
        tick.setAttribute("y1", "0");
        tick.setAttribute("x2", k + 0.5);
        tick.setAttribute("y2", "0.15");
        tick.setAttribute("stroke", "#a7a7a7");
        tick.setAttribute("stroke-width", "0.03");
        svg.appendChild(tick);
    });

    // Erwartungswert und Standardabweichung
    if (showMu || showSigma) {
        const mu = n * p;
        const sigma = Math.sqrt(n * p * (1 - p));

        if (showMu) {
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", mu + 0.5);
            line.setAttribute("y1", "0");
            line.setAttribute("x2", mu + 0.5);
            line.setAttribute("y2", `${-yScale * maxP - 0.3}`);
            line.setAttribute("stroke", "magenta");
            line.setAttribute("stroke-width", "0.05");
            svg.appendChild(line);

            const label = document.createElementNS(svgNS, "text");
            label.setAttribute("x", mu + 0.55);
            label.setAttribute("y", `${-yScale * maxP - 0.6}`);
            label.setAttribute("font-family", "italic");
            label.setAttribute("font-size", "0.7");
            label.setAttribute("fill", "magenta");
            label.textContent = "μ";
            svg.appendChild(label);
        }

        if (showSigma) {
            [mu - sigma, mu + sigma].forEach((val, i) => {
                const line = document.createElementNS(svgNS, "line");
                line.setAttribute("x1", val + 0.5);
                line.setAttribute("y1", `${-yScale * 0.0225}`);
                line.setAttribute("x2", val + 0.5);
                line.setAttribute("y2", `${yScale * 0.0225}`);
                line.setAttribute("stroke", "salmon");
                line.setAttribute("stroke-width", "0.05");
                svg.appendChild(line);

                const label = document.createElementNS(svgNS, "text");
                label.setAttribute("x", val - 0.25);
                label.setAttribute("y", `${yScale * 0.035 + 0.32}`);
                label.setAttribute("font-family", "italic");
                label.setAttribute("font-size", "0.7");
                label.setAttribute("fill", "salmon");
                label.textContent = i === 0 ? "μ − σ" : "μ + σ";
                svg.appendChild(label);
            });
        }
    }

    return svg;
}


function renderAllBinomialCharts() {
    const charts = document.querySelectorAll('.binomial-chart');

    charts.forEach(container => {
        const isAnimated = container.classList.contains('animated');

        if (!isAnimated) {

            const n = parseInt(container.dataset.n);
            const p = parseFloat(container.dataset.p);
            const scale = parseFloat(container.dataset.scale);
            const plus = parseInt(container.dataset.plus);

            const showK = container.dataset.showk == null ? true : container.dataset.showk === "true";
            const showMu = container.dataset.showmu === "true";
            const showSigma = container.dataset.showsigma === "true";

            const svg = createBinomialSVG(n, p, scale * 10, plus, null, null, showMu, showSigma, showK);
            container.innerHTML = '';
            container.appendChild(svg);
        } else {
            const nStart = parseFloat(container.dataset.nstart);
            const nEnd = parseFloat(container.dataset.nend);
            const pStart = parseFloat(container.dataset.pstart);
            const pEnd = parseFloat(container.dataset.pend);
            const duration = parseInt(container.dataset.duration || '5000');
            const scale = parseFloat(container.dataset.scale);
            const plus = parseInt(container.dataset.plus);
            const maxP = parseFloat(container.dataset.maxp);
            const maxK = parseFloat(container.dataset.maxk);

            const showMu = container.dataset.showmu === "true";
            const showSigma = container.dataset.showsigma === "true";

            let t = 0;
            let forward = true;
            const fps = 30;
            const interval = 1000 / fps;

            const svg = createBinomialSVG(nStart, pStart, scale * 10, plus, maxP, maxK, showMu, showSigma);
            container.innerHTML = '';
            container.appendChild(svg);

            const textDisplay = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textDisplay.setAttribute("x", Math.floor(nStart) / 2 - 0.5);
            textDisplay.setAttribute("y", -maxP * 10 - 0.75);
            textDisplay.setAttribute("font-family", "serif");
            textDisplay.setAttribute("font-size", "0.7");
            textDisplay.setAttribute("fill", "#888");
            svg.appendChild(textDisplay);

            setInterval(() => {
                const progress = t / duration;
                const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress); // Cosinus für sanfte Pendelbewegung

                const nCurrent = nStart + (nEnd - nStart) * eased;
                const pCurrent = pStart + (pEnd - pStart) * eased;

                const newSVG = createBinomialSVG(nCurrent, pCurrent, scale * 10, plus, maxP, maxK);
                const updatedText = `n = ${nCurrent.toFixed(0)} ↔ p = ${pCurrent.toFixed(2).replace(".", ",")}`;

                // Ersetze altes SVG
                container.replaceChild(newSVG, container.firstChild);
                newSVG.appendChild(textDisplay);
                textDisplay.textContent = updatedText;
                textDisplay.setAttribute("x", Math.floor(maxK) / 2 - 0.5);
                textDisplay.setAttribute("y", -maxP * 10 - 2.5);

                if (forward) {
                    t += interval;
                    if (t >= duration) {
                        t = duration;
                        forward = false;
                    }
                } else {
                    t -= interval;
                    if (t <= 0) {
                        t = 0;
                        forward = true;
                    }
                }
            }, interval);
        }
    });
}


document.addEventListener("DOMContentLoaded", renderAllBinomialCharts);
