// Step 1: Animate the appearance of the x-axis
const xAxis = document.getElementById('xAxis');
xAxis.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: 'forwards' });

// Step 1: Animate the appearance of the y-axis
const yAxis = document.getElementById('yAxis');
yAxis.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: 'forwards', delay: 1000 });

// Step 2: Plot the graph after y-axis animation
setTimeout(() => {
    const graph = document.getElementById('graph');
    graph.style.opacity = 1;
    graph.setAttribute("d", getGraphPath());
    const pathLength = graph.getTotalLength();
    graph.style.strokeDasharray = pathLength;
    graph.style.strokeDashoffset = pathLength;
    graph.animate([{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }], { duration: 2000, fill: "forwards" });

    // Step 3: Mark the zeros of the function after graph animation
    setTimeout(() => {
    const zeros = document.getElementById('zeros');
    const xValues = getZeroValues();
    xValues.forEach((x, index) => {
        setTimeout(() => {
        const y = equation(x);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", getSvgX(x));
        circle.setAttribute("cy", getSvgY(y));
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", "red");
        zeros.appendChild(circle);
        circle.style.opacity = 0;
        circle.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: "forwards" });
        setTimeout(() => {
            circle.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: "forwards" });
        }, 2000);
        }, index * 500);
    });
    zeros.style.opacity = 1;
    

    // Step 4: Animate the motion of the tangentPoint along the graph path
    setTimeout(() => {
      const tangentPoint = document.getElementById('tangentPoint');
      const greenDot = document.getElementById('greenDot');
      tangentPoint.style.opacity = 1;
    
      // Create the tangent line element
      const tangentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tangentLine.setAttribute("x1", getSvgX(-1));
      tangentLine.setAttribute("y1", getSvgY(equation(-1)) - 1);
      tangentLine.setAttribute("x2", getSvgX(1));
      tangentLine.setAttribute("y2", getSvgY(equation(1)) + 1);
      tangentLine.setAttribute("stroke", "limegreen");
      tangentLine.setAttribute("stroke-width", "2");
      tangentPoint.insertBefore(tangentLine, greenDot);
    
      // Create the gradientTriangle element
      const gradientTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      gradientTriangle.setAttribute("fill", "url(#gradient)");
      gradientTriangle.setAttribute("stroke", "darkgrey");
      tangentPoint.insertBefore(gradientTriangle, tangentLine);
    
      // Find the length of the graph path
      const graph = document.getElementById('graph');
      const pathLength = graph.getTotalLength();
    
      // Set the initial position of the greenDot, tangentLine, and gradientTriangle to the start of the graph path
      const initialPoint = graph.getPointAtLength(0);
      greenDot.setAttribute('cx', initialPoint.x);
      greenDot.setAttribute('cy', initialPoint.y);
      tangentLine.setAttribute('x1', initialPoint.x - 1);
      tangentLine.setAttribute('y1', initialPoint.y - 1);
      tangentLine.setAttribute('x2', initialPoint.x + 1);
      tangentLine.setAttribute('y2', initialPoint.y + 1);
      
      // Animate the motion of the greenDot, tangentLine, and gradientTriangle along the graph path
      let currentTime = null;
      const duration = 4000; // Animation duration in milliseconds
    
      function animateMotion(timestamp) {
        if (!currentTime) currentTime = timestamp;
        const progress = timestamp - currentTime;
        const fraction = progress / duration;
        let distance = fraction * pathLength;
    
        // Adjust the distance to wrap around the path
        distance %= pathLength;
    
        // Adjust the distance to stop at x = -5.5
        const stopX = getSvgX(-5.5); // Convert x-value to coordinate space
    
        if (distance >= pathLength && distance % pathLength <= stopX) {
          distance = stopX;
        }
    
        const point = graph.getPointAtLength(distance);
        const pointX = getFuncX(point.x);
        const pointY = getFuncY(point.y);
        const slope = derivative(pointX);
    
        // Calculate the coordinates of the tangent line endpoint in svg-coordinates
        const tangentEndX = getSvgX(pointX + 1);
        const tangentEndY = getSvgY(pointY + slope);
    
        // Calculate the distance in svg-coordinates
        let dx = point.x - tangentEndX;
        let dy = point.y - tangentEndY;
        const tangentLength = Math.sqrt(dx * dx + dy * dy);
    
        // Calculate the new endpoints of the tangent line
        const lineLength = 50;
        dx = dx / tangentLength * lineLength;
        dy = dy / tangentLength * lineLength;
    
        // Calculate the endpoint coordinates
        const startX = point.x - dx;
        const startY = point.y - dy;
        const endX = point.x + dx;
        const endY = point.y + dy;
    
        // Set the position of the greenDot, tangentLine, and gradientTriangle
        greenDot.setAttribute('cx', point.x);
        greenDot.setAttribute('cy', point.y);
        tangentLine.setAttribute('x1', startX);
        tangentLine.setAttribute('y1', startY);
        tangentLine.setAttribute('x2', endX);
        tangentLine.setAttribute('y2', endY);
        const trianglePoints = `${point.x},${point.y} ${point.x - dx / 2},${point.y} ${point.x - dx / 2},${point.y - dy / 2}`;
        gradientTriangle.setAttribute("points", trianglePoints);
        if (progress < duration || distance < stopX) {
          requestAnimationFrame(animateMotion);
        }
      }
    
      // Start the animation
      requestAnimationFrame(animateMotion);
        
        // Step 5: Animate the rectangle and reveal the integral area
        setTimeout(() => {
            const integralGroup = document.getElementById('integralGroup');
            integralGroup.style.opacity = 1;

            const area = document.getElementById('area');
            area.style.opacity = 1;
            const path = getAreaPath();
            area.setAttribute('d', path);

            const areaOutline = document.getElementById('areaOutline');
            const areaRect = area.getBBox();
            areaOutline.setAttribute('x', areaRect.x);
            areaOutline.setAttribute('y', areaRect.y);
            areaOutline.setAttribute('width', '20%');
            areaOutline.setAttribute('height', areaRect.height);
            areaOutline.style.strokeWidth = '1'; // Set a stroke width to make the rectangle visible


            // Get the background color of the HTML document
            const htmlStyle = window.getComputedStyle(document.body);
            const backgroundColor = htmlStyle.backgroundColor;

            // Set the rectangle's fill to the background color
            areaOutline.style.fill = backgroundColor;

            // Remove the stroke from the rectangle
            areaOutline.setAttribute('stroke', 'none');

            // Reverse the animation using the 'reverseWidth' animation with a duration of 3 seconds
            areaOutline.style.animation = 'animateWidth 3s forwards';
            }, 5500); // 5500
     
      }, 4500); // 4500
    }, 3000); // 3000
}, 2000); // 2000


function getGraphPath() {
  let d = "";
  for (let x = -10; x <= 10; x += 0.1) {
    const y = getSvgY(equation(x));
    if (y >= 50 && y <= 250) {
      if (d === "") {
        d += `M${getSvgX(x)},${y}`;
      } else {
        d += ` L${getSvgX(x)},${y}`;
      }
    }
  }
  return d;
}

function getAreaPath() {
  const startX = 0;
  const endX = 5; // Adjust this value based on where you want the integral area to end
  const step = 0.01;
  
  let path = `M${getSvgX(startX)},${getSvgY(0)}`;
  
  for (let x = startX; x <= endX; x += step) {
    const y = equation(x);
    path += ` L${getSvgX(x)},${getSvgY(y)}`;
  }
  
  path += ` L${getSvgX(endX)},${getSvgY(0)} Z`;
  return path;
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

function markPoint(point, color, parentElement) {
  const { x, y } = point;
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", getSvgX(x));
  circle.setAttribute("cy", getSvgY(y));
  circle.setAttribute("r", "4");
  circle.setAttribute("fill", color);
  parentElement.appendChild(circle);
}
function getSvgX(x) {
    return x * 20 + 250;
}
function getSvgY(y) {
    return 150 - y * 10;
}
function getFuncX(x) {
    return (x - 250) / 20;
}
function getFuncY(y) {
    return (150 - y) / 10;
}
function equation(x) { 
  return (1 / 12) * (Math.pow(x, 3) - 25 * x);
}
function derivative(x) {
    return (1 / 12) * (3 * Math.pow(x, 2) - 25);
  }
function getXValues(startX, endX, stepSize) {
  const xValues = [];
  for (let x = startX; x <= endX; x += stepSize) {
      xValues.push(x);
  }
  return xValues;
}
function getYValues(xValues) {
    const yValues = [];
    for (let i = 0; i < xValues.length; i++) {
        const x = xValues[i];
        const y = equation(x); // Modify this to use your equation function
        yValues.push(y);
    }
    return yValues;
}