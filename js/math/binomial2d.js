//
// Mathematik
//

// Fakultät
function factorial(n) {
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

// Binomialkoeffizient
function binom(n, k) {
    if (k < 0 || k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Einzelwahrscheinlichkeit
function binomPDF(n, p, k) {
    return binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Kumulierte Wahrscheinlichkeit
function binomCDF(n, p, k) {
    let sum = 0;
    for (let i = 0; i <= k; i++)
        sum += binomPDF(n, p, i);
    return sum;
}

//
// Zeichnen
//

function ensureArrowMarker(svg, color = "#a7a7a8") {

    const id = "arrow_binom";

    if (!svg.querySelector("#" + id)) {

        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");

        marker.setAttribute("id", id);
        marker.setAttribute("markerWidth", "20");
        marker.setAttribute("markerHeight", "20");
        marker.setAttribute("refX", "5");
        marker.setAttribute("refY", "3");
        marker.setAttribute("orient", "auto");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        path.setAttribute("d", "M0,0 L0,6 L20,3 z");
        path.setAttribute("fill", color);

        marker.appendChild(path);

        const defs = svg.querySelector("defs") ||
            svg.insertBefore(
                document.createElementNS("http://www.w3.org/2000/svg", "defs"),
                svg.firstChild
            );

        defs.appendChild(marker);
    }

    return `url(#${id})`;
}

function drawBinomialAxes(
    target,
    n,
    maxProb,
    width = 400,
    height = 250,
    color = "#a7a7a8",
    ticks = true,

) {
    const originX = 40;
    const originY = height - 30;
    const topY = 30;
    const extraX = 20;
    const axisMax = 1.2 * maxProb;

    const arrow = ensureArrowMarker(target, color);

    // x-Achse
    const xLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xLine.setAttribute("x1", originX);
    xLine.setAttribute("y1", originY);
    xLine.setAttribute("x2", width + extraX);
    xLine.setAttribute("y2", originY);
    xLine.setAttribute("stroke", color);
    xLine.setAttribute("stroke-width", "1");
    xLine.setAttribute("marker-end", arrow);
    target.appendChild(xLine);

    // y-Achse
    const yLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yLine.setAttribute("x1", originX);
    yLine.setAttribute("y1", originY);
    yLine.setAttribute("x2", originX);
    yLine.setAttribute("y2", topY);
    yLine.setAttribute("stroke", color);
    yLine.setAttribute("stroke-width", "1");
    yLine.setAttribute("marker-end", arrow);
    target.appendChild(yLine);

    if (ticks) {
        const step = (width - originX) / n;

        // X-Ticks: Interval automatisch
        let interval = 1;
        if (n > 20) interval = Math.ceil(n / 10);  // max 10 Labels
        if (n > 50) interval = Math.ceil(n / 20);  // max 10 Labels

        for (let k = 0; k <= n; k += interval) {
            const x = originX + k * step;

            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", x);
            tick.setAttribute("y1", originY);
            tick.setAttribute("x2", x);
            tick.setAttribute("y2", originY + 5);
            tick.setAttribute("stroke", color);
            tick.setAttribute("stroke-width", "1");
            target.appendChild(tick);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", originY + 18);
            text.setAttribute("font-size", "14");
            text.setAttribute("font-family", "serif");
            text.setAttribute("fill", color);
            text.setAttribute("text-anchor", "middle");
            text.textContent = k;
            target.appendChild(text);
        }

        // Y-Ticks: passende Schrittweite aus Liste wählen
        const possibleSteps = [0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.25, 0.5, 1];

        // Wähle die **größte Schrittweite**, die <= axisMax und max 10 Ticks erzeugt
        let stepY = possibleSteps[0];
        for (let s of possibleSteps) {
            const nTicks = Math.ceil(axisMax / s);
            if (nTicks <= 7) {
                stepY = s;
                break;
            }
        }

        // Anzahl der Ticks
        const nTicks = Math.ceil(axisMax / stepY);

        // Zeichne Y-Ticks
        for (let i = 1; i <= nTicks; i++) {
            const val = i * stepY;
            if (val > axisMax) break; // oberes Limit

            const y = originY - val / axisMax * (originY - topY);

            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", originX - 5);
            tick.setAttribute("y1", y);
            tick.setAttribute("x2", originX);
            tick.setAttribute("y2", y);
            tick.setAttribute("stroke", color);
            tick.setAttribute("stroke-width", "1");
            target.appendChild(tick);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", originX - 10);
            text.setAttribute("y", y + 4);
            text.setAttribute("font-size", "14");
            text.setAttribute("font-family", "serif");
            text.setAttribute("fill", color);
            text.setAttribute("text-anchor", "end");
            text.textContent = val.toFixed(stepY < 0.1 ? 3 : 2).replace(".", ",");
            target.appendChild(text);
        }
    }

    // Achsenbeschriftung
    const xlabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xlabel.setAttribute("x", width + extraX + 20);
    xlabel.setAttribute("y", originY + 5);
    xlabel.setAttribute("font-size", "18");
    xlabel.setAttribute("font-family", "serif");
    xlabel.setAttribute("font-style", "italic");
    xlabel.setAttribute("fill", color);
    xlabel.textContent = "k";
    target.appendChild(xlabel);

    const ylabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    ylabel.setAttribute("x", originX - 20);
    ylabel.setAttribute("y", topY);
    ylabel.setAttribute("font-size", "18");
    ylabel.setAttribute("font-family", "serif");
    ylabel.setAttribute("font-style", "italic");
    ylabel.setAttribute("fill", color);
    ylabel.textContent = "P";
    target.appendChild(ylabel);

    return { originX, originY, width, height, maxProb, n, axisMax, topY };
}

function drawBinomialBar(
    target,
    k,
    prob,
    axes,
    cumulative = false,
    color = "green",
    stroke = "lime"
) {
    const { originX, originY, width, n, axisMax, topY } = axes;

    const step = (width - originX) / n;
    const barWidth = step; // Balkenbreite passend zum Schritt

    // x-Position: Balken mittig über Tick
    const x = originX + (k + 0.5) * step - barWidth;

    // Höhe proportional zur Achse
    const barHeight = prob / axisMax * (originY - topY);
    const y = originY - barHeight;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", cumulative ? "magenta" :  color);
    rect.setAttribute("fill-opacity", "0.5");
    rect.setAttribute("stroke", cumulative ? "magenta" : stroke);
    rect.setAttribute("stroke-width", "1");
    target.appendChild(rect);
}

function drawBinomialDistribution(
    target,
    n,
    p,
    cumulative = false
) {

    let probs = [];

    for (let k = 0; k <= n; k++) {
        probs.push(
            cumulative ?
                binomCDF(n, p, k) :
                binomPDF(n, p, k)
        );
    }

    const maxProb = Math.max(...probs);

    const axes = drawBinomialAxes(target, n, maxProb);

    probs.forEach((prob, k) => {
        drawBinomialBar(target, k, prob, axes, cumulative);
    });
}