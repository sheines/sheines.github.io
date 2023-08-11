document.addEventListener("DOMContentLoaded", function () {

    // Get the elements
    const xAxis = document.getElementById("xAxis");
    const yAxis = document.getElementById("yAxis");
    const functionPath = document.getElementById("functionPath");
    const zeros = document.getElementById("zeros");
    const minmax = document.getElementById("minmax");
    const tangentPoint = document.getElementById("tangentPoint");
    const greenDot = document.getElementById("greenDot");
    const integralGroup = document.getElementById("integralGroup");
    const area = document.getElementById("area");
    const clipRect = document.getElementById("clipRect");


    // Step 1: Animate the appearance of the x-axis
    xAxis.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards",
    });

    // Step 1: Animate the appearance of the y-axis
    yAxis.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100,
        fill: "forwards",
        delay: 1000,
    });

    // Step 2: Animate the appearance of the function path
    functionPath.style.opacity = 1;
    functionPath.setAttribute("d", getGraphPath());
    const pathLength = functionPath.getTotalLength();
    functionPath.style.strokeDasharray = pathLength;
    functionPath.style.strokeDashoffset = pathLength;
    functionPath.animate([{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }], {
        duration: 2000,
        fill: "forwards",
        delay: 2500,
    });

    // Step 3: Mark the zeros of the function
    zeros.style.opacity = 1;
    let xValues = getZeroValues();
    xValues.forEach((x, index) => {
        setTimeout(() => {
            const y = equation(x);
            const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", "0.25");
            circle.setAttribute("fill", "red");
            zeros.appendChild(circle);
            circle.style.opacity = 0;
            circle.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 750,
                fill: "forwards",
            });
            setTimeout(() => {
                circle.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 750,
                    fill: "forwards",
                });
            }, 2000);
        }, index * 750 + 4500);
    });

    // Step 4: Mark minimum and maximum of the function
    minmax.style.opacity = 1;
    xValues = getMinMaxValues();
    xValues.forEach((x, index) => {
        setTimeout(() => {
            const y = equation(x);
            const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", "0.25");
            circle.setAttribute("fill", "magenta");
            minmax.appendChild(circle);
            circle.style.opacity = 0;
            circle.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 750,
                fill: "forwards",
            });
            setTimeout(() => {
                circle.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 750,
                    fill: "forwards",
                });
            }, 2000);
        }, index * 750 + 8500);
    });

    // Step 5: Animate the motion of the tangentPoint along the graph path
    setTimeout(() => {
        const tangentPoint = document.getElementById("tangentPoint");
        const greenDot = document.getElementById("greenDot");
        tangentPoint.style.opacity = 1;

        // Create the tangent line element
        const tangentLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        tangentLine.setAttribute("x1", -1);
        tangentLine.setAttribute("y1", equation(-1) - 0.5);
        tangentLine.setAttribute("x2", 1);
        tangentLine.setAttribute("y2", equation(1) + 0.5);
        tangentLine.setAttribute("stroke", "limegreen");
        tangentLine.setAttribute("stroke-width", "0.1");
        tangentPoint.insertBefore(tangentLine, greenDot);

        // Create the gradientTriangle element
        const gradientTriangle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
        );
        gradientTriangle.setAttribute("fill", "url(#gradient)");
        gradientTriangle.setAttribute("stroke", "darkgrey");
        gradientTriangle.setAttribute("stroke-width", "0.05");
        tangentPoint.insertBefore(gradientTriangle, tangentLine);

        // Find the length of the graph path
        const graph = document.getElementById("functionPath");
        const pathLength = graph.getTotalLength();

        // Set the initial position of the greenDot, tangentLine, and gradientTriangle to the start of the graph path
        const initialPoint = graph.getPointAtLength(0);
        greenDot.setAttribute("cx", initialPoint.x);
        greenDot.setAttribute("cy", initialPoint.y);
        tangentLine.setAttribute("x1", initialPoint.x - 1);
        tangentLine.setAttribute("y1", initialPoint.y - 1);
        tangentLine.setAttribute("x2", initialPoint.x + 1);
        tangentLine.setAttribute("y2", initialPoint.y + 1);

        // Animate the motion of the greenDot, tangentLine, and gradientTriangle along the graph path
        let currentTime = null;
        const duration = 5000; // Animation duration in milliseconds

        function animateMotion(timestamp) {
            if (!currentTime) currentTime = timestamp;
            const progress = timestamp - currentTime;
            const fraction = progress / duration;
            let distance = fraction * pathLength;

            // Adjust the distance to wrap around the path
            distance %= pathLength;

            // Adjust the distance to stop at
            const stopX = 8; // distance on path since pathstart

            if (distance >= pathLength && distance % pathLength <= stopX) {
                distance = stopX;
            }

            const point = graph.getPointAtLength(distance);
            const pointX = point.x;
            const pointY = point.y;
            const slope = derivative(pointX);

            // Calculate the coordinates of the tangent line endpoint in svg-coordinates
            const tangentEndX = pointX + 1;
            const tangentEndY = pointY + slope;

            // Calculate the distance in svg-coordinates
            let dx = point.x - tangentEndX;
            let dy = point.y - tangentEndY;
            const tangentLength = Math.sqrt(dx * dx + dy * dy);

            // Calculate the new endpoints of the tangent line
            const lineLength = 2.5;
            dx = (dx / tangentLength) * lineLength;
            dy = (dy / tangentLength) * lineLength;

            // Calculate the endpoint coordinates
            const startX = point.x - dx;
            const startY = point.y - dy;
            const endX = point.x + dx;
            const endY = point.y + dy;

            // Set the position of the greenDot, tangentLine, and gradientTriangle
            greenDot.setAttribute("cx", point.x);
            greenDot.setAttribute("cy", point.y);
            tangentLine.setAttribute("x1", startX);
            tangentLine.setAttribute("y1", startY);
            tangentLine.setAttribute("x2", endX);
            tangentLine.setAttribute("y2", endY);
            const trianglePoints = `${point.x},${point.y} ${point.x - dx / 2},${point.y
                } ${point.x - dx / 2},${point.y - dy / 2}`;
            gradientTriangle.setAttribute("points", trianglePoints);
            if (progress < duration || distance < stopX) {
                requestAnimationFrame(animateMotion);
            }
        }

        // Start the animation
        requestAnimationFrame(animateMotion);

    }, 12000); // 5500

    // Step 6: Animate the rectangle and reveal the integral area
    integralGroup.style.opacity = 1;
    area.style.opacity = 1;
    const path = getAreaPath();
    area.setAttribute("d", path);

    clipRect.animate([{ x: -5 }, { x: 0 }], {
        duration: 2500,
        fill: "forwards",
        delay: 20000,
    });




    // Helper functions
    function equation(x) {
        return -(1 / 18) * (x * x * x - 25 * x);
    }
    function derivative(x) {
        return -(1 / 18) * (3 * x * x - 25);
    }

    function getGraphPath() {
        let d = "";
        for (let x = -10; x <= 10; x += 0.1) {
            const y = equation(x);
            if (y >= -5 && y <= 5.5) {
                if (d === "") {
                    d += `M${x},${y}`;
                } else {
                    d += ` L${x},${y}`;
                }
            }
        }
        return d;
    }

    function getZeroValues() {
        const zeros = [];
        for (let x = -9.9; x <= 9.9; x += 0.1) {
            const y1 = equation(x);
            const y2 = equation(x + 0.1);
            if (y1 * y2 < 0) {
                zeros.push(x);
            }
        }
        return zeros;
    }
    function getMinMaxValues() {
        const minmax = [];
        for (let x = -9.9; x <= 9.9; x += 0.1) {
            const y1 = derivative(x);
            const y2 = derivative(x + 0.1);
            if (y1 * y2 < 0) {
                minmax.push(x);
            }
        }
        return minmax;
    }
    function getAreaPath() {
        const startX = 0;
        const endX = 5; // Adjust this value based on where you want the integral area to end
        const step = 0.01;

        let path = `M${startX},${0}`;

        for (let x = startX; x <= endX; x += step) {
            const y = equation(x);
            path += ` L${x},${y}`;
        }

        path += ` L${endX},${0} Z`;
        return path;
    }

});