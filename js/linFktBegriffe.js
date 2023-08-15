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
const gradientX = document.getElementById("gradientX");
const gradientXText = document.getElementById("gradientXText");
const steigungX = document.getElementById("steigungNenner");
const steigText1 = document.getElementById("steigText1");
const gradientY = document.getElementById("gradientY");
const gradientYText = document.getElementById("gradientYText");
const steigungY = document.getElementById("steigungZaehler");
const steigText2 = document.getElementById("steigText2");


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

// Expected Colors
const redXEnd = 10;
const greenXEnd = 200;
const blueXEnd = 100;

const redYEnd = 100;
const greenYEnd = 200;
const blueYEnd = 10;

// Set animation duration in milliseconds
const animateGradientDuration = 2000; // mal 2!
const animateGradientMoveDuration = 2000; // mal 4!



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
        const newFormColor = 'rgb(' + newRed + ', ' + newGreen + ', ' + newBlue + ')';

        zeronenner.setAttribute("fill", newTextColor);
        zeronenner.setAttribute("stroke", newTextColor);

        steigung.setAttribute("fill", newFormColor);
        steigung.setAttribute("stroke", newFormColor);
        steigungX.setAttribute("stroke", newFormColor);
        steigungX.setAttribute("fill", newFormColor);
        steigungY.setAttribute("stroke", newFormColor);
        steigungY.setAttribute("fill", newFormColor);
    }


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateZero);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradientX);
    }
}

function animateGradientX(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Etwas warten
    if (waiting && timestamp - startTime < 1000) {
        requestAnimationFrame(animateGradientX);
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

    // Calculate line Color
    const newLineR = Math.round(redTextStart * 1.0 + (redXEnd - redTextStart) * progress);
    const newLineG = Math.round(greenTextStart * 1.0 + (greenXEnd - greenTextStart) * progress);
    const newLineB = Math.round(blueTextStart * 1.0 + (blueXEnd - blueTextStart) * progress);

    // Calculate Color of nenner
    const newFracR = Math.round(redFracEnd * 1.0 + (redXEnd - redFracEnd) * progress);
    const newFracG = Math.round(greenFracEnd * 1.0 + (greenXEnd - greenFracEnd) * progress);
    const newFracB = Math.round(blueFracEnd * 1.0 + (blueXEnd - blueFracEnd) * progress);

    
    const newLineColor = 'rgb(' + newLineR + ', ' + newLineG + ', ' + newLineB + ')';
    const newFracColor = 'rgb(' + newFracR + ', ' + newFracG + ', ' + newFracB + ')';

    gradientX.setAttribute("stroke", newLineColor);
    gradientXText.setAttribute("opacity", progress);
    gradientXText.setAttribute("fill", newLineColor);
    steigungX.setAttribute("stroke", newFracColor);
    steigungX.setAttribute("fill", newFracColor);
    steigText1.style.color = newLineColor;

    // Draw x-line
    const x2 = progress * 4.0;

    gradientX.setAttribute("x2", x2);

    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateGradientX);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradientY);
    }
}
function animateGradientY(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateGradientDuration, 1);

    // Calculate line Color
    const newLineR = Math.round(redTextStart * 1.0 + (redYEnd - redTextStart) * progress);
    const newLineG = Math.round(greenTextStart * 1.0 + (greenYEnd - greenTextStart) * progress);
    const newLineB = Math.round(blueTextStart * 1.0 + (blueYEnd - blueTextStart) * progress);

    // Calculate Color of nenner
    const newFracR = Math.round(redFracEnd * 1.0 + (redYEnd - redFracEnd) * progress);
    const newFracG = Math.round(greenFracEnd * 1.0 + (greenYEnd - greenFracEnd) * progress);
    const newFracB = Math.round(blueFracEnd * 1.0 + (blueYEnd - blueFracEnd) * progress);

    
    const newLineColor = 'rgb(' + newLineR + ', ' + newLineG + ', ' + newLineB + ')';
    const newFracColor = 'rgb(' + newFracR + ', ' + newFracG + ', ' + newFracB + ')';

    gradientY.setAttribute("stroke", newLineColor);
    gradientYText.setAttribute("opacity", progress);
    gradientYText.setAttribute("fill", newLineColor);
    steigungY.setAttribute("stroke", newFracColor);
    steigungY.setAttribute("fill", newFracColor);
    steigText2.style.color = newLineColor;

    // Draw y-line
    const y2 = 2 - progress * 2.0;

    gradientY.setAttribute("y2", y2);

    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateGradientY);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradientMove1);
    }
}

function animateGradientMove1(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateGradientMoveDuration, 1);

    const xx1 = 0.0 + 2.5*progress*2;
    const xy1 = 2.0 - 2.5*progress;
    const xx2 = 4.0 + 2.5*progress*2;
    const xy2 = 2.0 - 2.5*progress;

    const xtx = 1.9 + 2.5*progress*2;
    const xty = 2.75 - 2.5*progress;

    gradientX.setAttribute("x1", xx1);
    gradientX.setAttribute("y1", xy1);
    gradientX.setAttribute("x2", xx2);
    gradientX.setAttribute("y2", xy2);

    gradientXText.setAttribute("x", xtx);
    gradientXText.setAttribute("y", xty);

    const yx1 = 4.0 + 2.5*progress*2;
    const yy1 = 2.0 - 2.5*progress;
    const yx2 = 4.0 + 2.5*progress*2;
    const yy2 = 0.0 - 2.5*progress;

    const ytx = 4.25 + 2.5*progress*2;
    const yty = 1.25 - 2.5*progress;

    gradientY.setAttribute("x1", yx1);
    gradientY.setAttribute("y1", yy1);
    gradientY.setAttribute("x2", yx2);
    gradientY.setAttribute("y2", yy2);

    gradientYText.setAttribute("x", ytx);
    gradientYText.setAttribute("y", yty);


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateGradientMove1);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradientMove2);
    }
}

function animateGradientMove2(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / (animateGradientMoveDuration * 2), 1);

    const xx1 = 5.0 - 5*progress*2;
    const xy1 = -0.5 + 5*progress;
    const xx2 = 9.0 - 5*progress*2;
    const xy2 = -0.5 + 5*progress;

    const xtx = 6.9 - 5*progress*2;
    const xty = 0.25 + 5*progress;

    gradientX.setAttribute("x1", xx1);
    gradientX.setAttribute("y1", xy1);
    gradientX.setAttribute("x2", xx2);
    gradientX.setAttribute("y2", xy2);

    gradientXText.setAttribute("x", xtx);
    gradientXText.setAttribute("y", xty);

    const yx1 = 9.0 - 5*progress*2;
    const yy1 = -0.5 + 5*progress;
    const yx2 = 9.0 - 5*progress*2;
    const yy2 = -2.5 + 5*progress;

    const ytx = 9.25 - 5*progress*2;
    const yty = -1.25 + 5*progress;

    gradientY.setAttribute("x1", yx1);
    gradientY.setAttribute("y1", yy1);
    gradientY.setAttribute("x2", yx2);
    gradientY.setAttribute("y2", yy2);

    gradientYText.setAttribute("x", ytx);
    gradientYText.setAttribute("y", yty);


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateGradientMove2);
    }
    else {
        startTime = null;
        waiting = true;
        requestAnimationFrame(animateGradientMove3);
    }
}
function animateGradientMove3(timestamp) {
    // Initialize the start time if it's null
    if (!startTime) startTime = timestamp;

    // Calculate the elapsed time since the animation started
    const elapsedTime = timestamp - startTime;

    // Calculate the new rgb values based on the progress of the animation
    const progress = Math.min(elapsedTime / animateGradientMoveDuration, 1);

    const xx1 = -5.0 + 2.5*progress*2;
    const xy1 = 4.5 - 2.5*progress;
    const xx2 = -1.0 + 2.5*progress*2;
    const xy2 = 4.5 - 2.5*progress;

    const xtx = -3.1 + 2.5*progress*2;
    const xty = 5.25 - 2.5*progress;

    gradientX.setAttribute("x1", xx1);
    gradientX.setAttribute("y1", xy1);
    gradientX.setAttribute("x2", xx2);
    gradientX.setAttribute("y2", xy2);

    gradientXText.setAttribute("x", xtx);
    gradientXText.setAttribute("y", xty);

    const yx1 = -1.0 + 2.5*progress*2;
    const yy1 = 4.5 - 2.5*progress;
    const yx2 = -1.0 + 2.5*progress*2;
    const yy2 = 2.5 - 2.5*progress;

    const ytx = -0.75 + 2.5*progress*2;
    const yty = 3.75 - 2.5*progress;

    gradientY.setAttribute("x1", yx1);
    gradientY.setAttribute("y1", yy1);
    gradientY.setAttribute("x2", yx2);
    gradientY.setAttribute("y2", yy2);

    gradientYText.setAttribute("x", ytx);
    gradientYText.setAttribute("y", yty);


    // Continue the animation if not finished
    if (progress < 1) {
        requestAnimationFrame(animateGradientMove3);
    }
    else {
        startTime = null;
        waiting = true;
        // requestAnimationFrame(animateGradientMove3);
    }
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

    gradientX.setAttribute("stroke", oldTextColor);
    gradientXText.setAttribute("opacity", 0);
    gradientXText.setAttribute("fill", oldTextColor);
    steigungX.setAttribute("stroke", oldGraphColor);
    steigungX.setAttribute("fill", oldGraphColor);
    steigText1.style.color = oldTextColor;

    gradientX.setAttribute("x2", 0);

    gradientY.setAttribute("stroke", oldTextColor);
    gradientYText.setAttribute("opacity", 0);
    gradientYText.setAttribute("fill", oldTextColor);
    steigungY.setAttribute("stroke", oldGraphColor);
    steigungY.setAttribute("fill", oldGraphColor);
    steigText2.style.color = oldTextColor;


    gradientY.setAttribute("y2", 2);

    gradientX.setAttribute("x1", 0);
    gradientX.setAttribute("y1", 2);
    gradientX.setAttribute("x2", 0);
    gradientX.setAttribute("y2", 2);

    gradientXText.setAttribute("x", 1.9);
    gradientXText.setAttribute("y", 2.75);

    gradientY.setAttribute("x1", 4);
    gradientY.setAttribute("y1", 2);
    gradientY.setAttribute("x2", 4);
    gradientY.setAttribute("y2", 2);

    gradientYText.setAttribute("x", 4.25);
    gradientYText.setAttribute("y", 1.25);



    ycircle.setAttribute("opacity", "0");
    xcircle.setAttribute("opacity", "0");

    opacityEquation = 0;
    opacityFormula = 0;


    // Restart the animation when the SVG is clicked
    startTime = null;
    requestAnimationFrame(animateLine);
});