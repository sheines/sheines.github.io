// Get the line element by its id
const graphLine = document.getElementById("graph");
const graphText = document.getElementById("graphText");
const equation = document.getElementById("equation");
const ycircle = document.getElementById("ycircle");
const absglied = document.getElementById("absglied");
const absgliedText = document.getElementById("absGliedText");


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
const redZeroEnd = 0;
const greenZeroEnd = 0;
const blueZeroEnd = 255;

// Set animation duration in milliseconds
const animateZeroGliedDuration = 4000;




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
}



// Attach click event listener to the SVG element
const svgElement = document.getElementById('linfkt_svg');

svgElement.addEventListener('click', () => {
    // reset all parameters
    graphLine.setAttribute("x2","-6");
    graphLine.setAttribute("y2","5");

    equation.setAttribute("opacity", "0");
    textColor = 'rgb(' + redTextStart + ', ' + greenTextStart + ',' + blueTextStart + ')';
    graphText.style.color(textColor);
    absgliedText.style.color(textColor);

    opacityEquation = 0;

//     const graphText = document.getElementById("graphText");
// const ycircle = document.getElementById("ycircle");
// const absglied = document.getElementById("absglied");
// const absgliedText = document.getElementById("absGliedText");


  // Restart the animation when the SVG is clicked
  startTime = null;
  waiting = true;
  requestAnimationFrame(animateLine);
});