const functionSvg = document.getElementById("functionSvg");
const derivativeSvg = document.getElementById("derivativeSvg");

const dt = 0.05;

function f(x) {
    return -3 * Math.pow(4, -Math.pow(x, 2) / 8);
}

// Numerische Ableitung von f(x)
function fPrime(x) {
    const dx = 0.005;
    return (f(x + dx) - f(x)) / dx;
}

function plotFunction(svg, func, color, id) {
    let pathData = `M -10 ${func(-10)}`;
    for (let x = -10 + dt; x <= 10; x += dt) {
        pathData += ` L ${x} ${func(x)}`;
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "0.1");
    path.setAttribute("id", id);
    svg.appendChild(path);
}

// Plot f(x) in DarkGoldenRod and initialize the derivative animation path
plotFunction(functionSvg, f, "darkgoldenrod", "functionPath");

// Derivative path that will animate with the moving point
const derivativePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
derivativePath.setAttribute("fill", "none");
derivativePath.setAttribute("stroke", "magenta");
derivativePath.setAttribute("stroke-width", "0.1");
derivativeSvg.appendChild(derivativePath);

// Moving point, tangent, and slope components (horizontal and vertical) on f(x)
const movingPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
movingPoint.setAttribute("r", "0.15");
movingPoint.setAttribute("fill", "#a7a7a8");

const tangent = document.createElementNS("http://www.w3.org/2000/svg", "line");
tangent.setAttribute("stroke", "#a7a7a8");
tangent.setAttribute("stroke-width", "0.08");

const slopeHorizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
slopeHorizontal.setAttribute("stroke", "#a7a7a8");  // Grau
slopeHorizontal.setAttribute("stroke-width", "0.08");

const slopeVertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
slopeVertical.setAttribute("stroke", "magenta");  // Magenta
slopeVertical.setAttribute("stroke-width", "0.08");

// Animation variables
let x = -10;
let derivativePathData = `M -10 ${fPrime(-10)}`;

// Add elements
function addElements() {
    functionSvg.appendChild(slopeHorizontal);
    functionSvg.appendChild(slopeVertical);
    functionSvg.appendChild(tangent);
    functionSvg.appendChild(movingPoint);
}

// Remove elements
function removeElements() {
    functionSvg.removeChild(slopeHorizontal);
    functionSvg.removeChild(slopeVertical);
    functionSvg.removeChild(tangent);
    functionSvg.removeChild(movingPoint);
}

// Animate function with constant tangent length and sync derivative path
function animate() {
    if (x == -10) addElements();

    x += dt;
    if (x > 10) {
        x = -10;
        derivativePathData = `M -10 ${fPrime(-10)}`;
        removeElements();
        setTimeout(() => requestAnimationFrame(animate), 3000);
        return;
    }

    const y = f(x);
    const slope = fPrime(x);
    const tangentLength = 1.5;  // Fixed length for the tangent line

    movingPoint.setAttribute("cx", x);
    movingPoint.setAttribute("cy", y);

    // Calculate slope triangle components with constant dx for horizontal line
    const dx = 0.75;
    const dy = slope * dx;

    // Position the horizontal line of the slope triangle
    slopeHorizontal.setAttribute("x1", x);
    slopeHorizontal.setAttribute("y1", y);
    slopeHorizontal.setAttribute("x2", x + dx);
    slopeHorizontal.setAttribute("y2", y);

    // Position the vertical line of the slope triangle
    slopeVertical.setAttribute("x1", x + dx);
    slopeVertical.setAttribute("y1", y);
    slopeVertical.setAttribute("x2", x + dx);
    slopeVertical.setAttribute("y2", y + dy);

    // Calculate the direction vector for the tangent with fixed length
    const tangentDx = tangentLength / Math.sqrt(1 + slope * slope);
    const tangentDy = slope * tangentDx;

    tangent.setAttribute("x1", x - tangentDx);
    tangent.setAttribute("y1", y - tangentDy);
    tangent.setAttribute("x2", x + tangentDx);
    tangent.setAttribute("y2", y + tangentDy);

    derivativePathData += ` L ${x} ${fPrime(x)}`;
    derivativePath.setAttribute("d", derivativePathData);

    requestAnimationFrame(animate);
}

animate();