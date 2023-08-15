// Get the line element by its id
const graphLine = document.getElementById("graph");
const graphText = document.getElementById("graphText");
const equation = document.getElementById("equation");
const ycircle = document.getElementById("ycircle");
const absglied = document.getElementById("absglied");
const absgliedText = document.getElementById("absGliedText");
const yaxisnumber = document.getElementById("yaxisnumber");
const xcircle = document.getElementById("xcircle");
const zeroformula = document.getElementById("zeroCalculation");
const zerozaehler = document.getElementById("zeroZaehler")
const zeronenner = document.getElementById("zeroNenner");
const steigung = document.getElementById("steigung");
const zeroText = document.getElementById("zeroText");
const zeroTextForumla = document.getElementById("zeroTextFormula");
const xaxisnumber = document.getElementById("xaxisnumber");


// Get rgb-value of current textcolor
const textColor = getComputedStyle(graphText).color;
const rgbTextComponents = textColor.match(/\d+/g);
const redTextStart = parseInt(rgbTextComponents[0], 10);
const greenTextStart = parseInt(rgbTextComponents[1], 10);
const blueTextStart = parseInt(rgbTextComponents[2], 10);

// Get rgb-value of current graph and equation color
const computedStyle = window.getComputedStyle(graphLine);
const fillColor = computedStyle.getPropertyValue('stroke');
const rgbComponents = fillColor.match(/\d+/g);
const redStart = rgbComponents[0];
const greenStart = rgbComponents[1];
const blueStart = rgbComponents[2];

// Wartevariable
let waiting = true;


//
// Show Line and Equation
//

// Set the initial and target x2 values
const initialX2 = -6;
const targetX2 = 10;
// Set the initial and target y2 values
const initialY2 = 5;
const targetY2 = -3;

// Set the animation duration in milliseconds
const animateLineDuration = 2000; // 2 seconds

// Get the start time of the animation
let startTime = null;
let opacityEquation = 0;

// Start the animation
requestAnimationFrame(animateLine);


//
// Show y-axis Point an change color in equation
//

// Expected Color
const redAbsEnd = 255;
const greenAbsEnd = 0;
const blueAbsEnd = 0;

// Set animation duration in milliseconds
const animateAbsGliedDuration = 2000;

//
//  Show zero point, change equation color and show calculation
//

// Expected Color
const redFracEnd = 0;
const greenFracEnd = 255;
const blueFracEnd = 0;

const redZeroEnd = 0;
const greenZeroEnd = 0;
const blueZeroEnd = 255;

// Set animation duration in milliseconds
const animateZeroDuration = 4000;
let opacityFormula = 0;

//
//  show and move gradient
//

// Set animation duration in milliseconds
const animateGradientDuration = 4000;



// Helper functions

function animateLine(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new x2 value based on the progress of the animation
    const progress = Math.min(elapsedTime / animateLineDuration, 1);
    const newX2 = initialX2 + (targetX2 - initialX2) * progress;
    const newY2 = initialY2 + (targetY2 - initialY2) * progress;

    // Calculate textcolor
    const newTextR = Math.round(redTextStart * 1.0 + (redStart - redTextStart) * progress);
    const newTextG = Math.round(greenTextStart * 1.0 + (greenStart - greenTextStart) * progress);
    const newTextB = Math.round(blueTextStart * 1.0 + (blueStart - blueTextStart) * progress);

    const newTextColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';

    // Calculate opacity of equation
    if (opacityEquation < 1) {
        opacityEquation = 2 * progress;
    }
    if (opacityEquation > 1) {
        opacityEquation = 1;
    }

    // Update the x2 and y2 attribute of the line
    graphLine.setAttribute("x2", newX2);
    graphLine.setAttribute("y2", newY2);

    // Update opacity of equation
    equation.setAttribute("opacity", opacityEquation);

    // Set Textcolor
    graphText.style.color = newTextColor;

    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateLine);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateAbsGlied);
    }
}

function animateAbsGlied(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Etwas warten
    if (waiting && timestamp - startTime < 1000) {
        requestAnimationFrame(animateAbsGlied);
        return;
    }
    else {
        if (waiting) {
            startTime = timestamp;
            waiting = false;
        }
    }

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateAbsGliedDuration, 1);

    const newRed = Math.round(redStart * 1.0 + (redAbsEnd - redStart) * progress);
    const newGreen = Math.round(greenStart * 1.0 + (greenAbsEnd - greenStart) * progress);
    const newBlue = Math.round(blueStart * 1.0 + (blueAbsEnd - blueStart) * progress);

    // Build the RGB string
    const newFillColor = 'rgb(' + newRed + ', ' + newGreen + ', ' + newBlue + ')';

    // Calculate textcolor
    const newTextR = Math.round(redTextStart * 1.0 + (redAbsEnd - redTextStart) * progress);
    const newTextG = Math.round(greenTextStart * 1.0 + (greenAbsEnd - greenTextStart) * progress);
    const newTextB = Math.round(blueTextStart * 1.0 + (blueAbsEnd - blueTextStart) * progress);

    const newTextColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';

    absglied.setAttribute("fill", newFillColor);
    absglied.setAttribute("stroke", newFillColor);
    absgliedText.style.color = newTextColor;
    yaxisnumber.style.fill = newTextColor;

    // absgliedMove.setAttribute("transform", "translate(20, 20)");


    ycircle.setAttribute("opacity", progress);


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateAbsGlied);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateZero);
    }
}

function animateZero(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Etwas warten
    if (waiting && timestamp - startTime < 1000) {
        requestAnimationFrame(animateZero);
        return;
    }
    else {
        if (waiting) {
            startTime = timestamp;
            waiting = false;
        }
    }

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateZeroDuration, 1);

    xcircle.setAttribute("opacity", progress);

    // Calculate opacity of equation
    if (opacityFormula < 1) {
        opacityFormula = 2 * progress;
    }
    if (opacityFormula > 1) {
        opacityFormula = 1;
    }

    zeroformula.setAttribute("opacity", opacityFormula);

    if (progress > 0) {
        // Calculate textcolor
        const newTextR = Math.round(redTextStart * 1.0 + (redZeroEnd - redTextStart) * progress);
        const newTextG = Math.round(greenTextStart * 1.0 + (greenZeroEnd - greenTextStart) * progress);
        const newTextB = Math.round(blueTextStart * 1.0 + (blueZeroEnd - blueTextStart) * progress);

        const newTextColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';

        zeroText.style.color = newTextColor;
        zeroTextForumla.style.color = newTextColor;

        xaxisnumber.style.fill = newTextColor;

    }

    if (progress > 0.5) {
        let colorprogress = progress * 2 - 1;
        if (colorprogress > 1) colorprogress = 1;
        // Calculate textcolor
        const newTextR = Math.round(redTextStart * 1.0 + (redAbsEnd - redTextStart) * colorprogress);
        const newTextG = Math.round(greenTextStart * 1.0 + (greenAbsEnd - greenTextStart) * colorprogress);
        const newTextB = Math.round(blueTextStart * 1.0 + (blueAbsEnd - blueTextStart) * colorprogress);

        const newTextColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';

        zerozaehler.setAttribute("fill", newTextColor);
        zerozaehler.setAttribute("stroke", newTextColor);
        zerozaehler.setAttribute("color", newTextColor);
    }
    if (progress > 0.75) {
        let colorprogress = progress * 4 - 3;
        if (colorprogress > 1) colorprogress = 1;
        // Calculate textcolor
        const newTextR = Math.round(redTextStart * 1.0 + (redFracEnd - redTextStart) * colorprogress);
        const newTextG = Math.round(greenTextStart * 1.0 + (greenFracEnd - greenTextStart) * colorprogress);
        const newTextB = Math.round(blueTextStart * 1.0 + (blueFracEnd - blueTextStart) * colorprogress);

        const newRed = Math.round(redStart * 1.0 + (redFracEnd - redStart) * colorprogress);
        const newGreen = Math.round(greenStart * 1.0 + (greenFracEnd - greenStart) * colorprogress);
        const newBlue = Math.round(blueStart * 1.0 + (blueFracEnd - blueStart) * colorprogress);

        const newTextColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';
        const newFormColor = 'rgb(' + newTextR + ', ' + newTextG + ', ' + newTextB + ')';

        zeronenner.setAttribute("fill", newTextColor);
        zeronenner.setAttribute("stroke", newTextColor);

        steigung.setAttribute("fill", newFormColor);
        steigung.setAttribute("stroke", newFormColor);
    }


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateZero);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradient);
    }
}

function animateGradient(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Etwas warten
    if (waiting && timestamp - startTime < 1000) {
        requestAnimationFrame(animateGradient);
        return;
    }
    else {
        if (waiting) {
            startTime = timestamp;
            waiting = false;
        }
    }

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateGradientDuration, 1);
}



// Attach click event listener to the SVG element
const svgElement = document.getElementById('linfkt_svg');

svgElement.addEventListener('click', () => {

    // reset all parameters
    graphLine.setAttribute("x2", "-6");
    graphLine.setAttribute("y2", "5");

    equation.setAttribute("opacity", "0");
    const oldTextColor = 'rgb(' + redTextStart + ', ' + greenTextStart + ',' + blueTextStart + ')';
    const oldGraphColor = 'rgb(' + redStart + ', ' + greenStart + ',' + blueStart + ')';
    graphText.style.color = oldTextColor;
    absglied.setAttribute("fill", oldGraphColor);
    absglied.setAttribute("stroke", oldGraphColor);
    absgliedText.style.color = oldTextColor;
    yaxisnumber.style.fill = oldTextColor;

    zeroformula.setAttribute("opacity", "0");
    zerozaehler.setAttribute("fill", oldTextColor);
    zerozaehler.setAttribute("stroke", oldTextColor);
    zerozaehler.setAttribute("color", oldTextColor);
    zeronenner.setAttribute("fill", oldTextColor);
    zeronenner.setAttribute("stroke", oldTextColor);

    steigung.setAttribute("fill", oldGraphColor);
    steigung.setAttribute("stroke", oldGraphColor);

    zeroText.style.color = oldTextColor;
    zeroTextForumla.style.color = oldTextColor;

    xaxisnumber.style.fill = oldTextColor;



    ycircle.setAttribute("opacity", "0");
    xcircle.setAttribute("opacity", "0");

    opacityEquation = 0;
    opacityFormula = 0;


    // Restart the animation when the SVG is clicked
    startTime = null;
    requestAnimationFrame(animateLine);
});