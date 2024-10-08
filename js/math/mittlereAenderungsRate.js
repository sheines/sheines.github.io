document.addEventListener("DOMContentLoaded", function () {
  const graph = document.getElementById('graph');
  let currentStep = 0;
  const totalSteps = 90; // Mehr Schritte für eine längere Morphing-Dauer (5 Sekunden)
  const frameDuration = 33; // Zeit pro Frame in Millisekunden (beibehalten für 30 FPS)
  let animationPhase = 0; // 0 = f(x) stehen, 1 = morphing, 2 = g(x) stehen, 3 = Linien zeichnen

  // Neue Variablen für den vierten Schritt und die Punkte
  let pointA = { x: -6, y: 2.6 };
  let pointB = { x: 4, y: -3.4 };
  let lines = []; // Array zur Speicherung der Linien und Texte
  let stepFourDuration = 5000; // Dauer des vierten Schrittes
  let stepFourDelay = 1000; // Verzögerung zwischen den Linien
  let finalPauseDuration = 4000; // Dauer, um die Linien stehen zu lassen

  function f(x) {
      return -0.1 * Math.pow(x + 4, 2) + 3;
  }

  function g(x) {
      return (-3 / 5) * x - 1;
  }

  function generatePath(f, startX, endX, steps = 100) {
      const pathPoints = [];
      const stepSize = (endX - startX) / steps;
      for (let i = 0; i <= steps; i++) {
          const x = startX + i * stepSize;
          const y = f(x);
          pathPoints.push(`${x},${y}`);
      }
      return `M ${pathPoints.join(' L ')}`;
  }

  function interpolatePaths(f, g, t, startX, endX, steps = 100) {
      const pathPoints = [];
      const stepSize = (endX - startX) / steps;
      for (let i = 0; i <= steps; i++) {
          const x = startX + i * stepSize;
          const y = (1 - t) * f(x) + t * g(x); // Lineare Interpolation
          pathPoints.push(`${x},${y}`);
      }
      return `M ${pathPoints.join(' L ')}`;
  }

  // Funktion zur Interpolation der Farben von Magenta (255, 0, 255) zu Cyan (0, 255, 255)
  function interpolateColor(t) {
      const r = Math.round(255 * (1 - t)); // Rot von 255 zu 0
      const g = Math.round(255 * t);       // Grün von 0 zu 255
      const b = 255;                       // Blau bleibt bei 255
      return `rgb(${r},${g},${b})`;        // Gibt die interpolierte Farbe zurück
  }

  function drawLine(x1, y1, x2, y2, color) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "0.05");
      line.setAttribute("stroke-dasharray", "0.2, 0.1");
      graph.parentNode.appendChild(line);
      return line;
  }

  function drawText(x, y, text, color) {
      const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textElement.setAttribute("x", x);
      textElement.setAttribute("y", y);
      textElement.setAttribute("font-family", "serif");
      textElement.setAttribute("font-size", "0.7");
      textElement.setAttribute("font-style", "italic");
      textElement.setAttribute("fill", color);
      textElement.textContent = text;
      graph.parentNode.appendChild(textElement);
      return textElement;
  }

  function stepFour() {
    // Zeichne Linien und Texte für Punkt A
    const lineA = drawLine(pointA.x, pointA.y, pointA.x, 0, "red");
    lines.push(lineA);
    const textA = drawText(pointA.x - 0.2, -0.25, "a", "red");
    lines.push(textA);
    const lineAF = drawLine(pointA.x, pointA.y, 0, pointA.y, "red");
    lines.push(lineAF);
    const textAF = drawText(0.25, pointA.y + 0.25, `f(a)`, "red");
    lines.push(textAF);
    
    // Nach einer Verzögerung, zeichne Linien und Texte für Punkt B
    setTimeout(() => {
        const lineB = drawLine(pointB.x, pointB.y, pointB.x, 0, "green");
        lines.push(lineB);
        const textB = drawText(pointB.x -0.2, 0.75, "b", "green");
        lines.push(textB);
        const lineBF = drawLine(pointB.x, pointB.y, 0, pointB.y, "green");
        lines.push(lineBF);
        const textBF = drawText(-1.5, pointB.y + 0.2 , `f(b)`, "green");
        lines.push(textBF);
    }, stepFourDelay);

    // Nach der Dauer des vierten Schrittes, entferne die Linien und starte die Animation erneut
    setTimeout(() => {
        lines.forEach(line => line.remove());
        currentStep = 0; // Reset der aktuellen Schritte
        animationPhase = 0; // Setze die Animationsphase zurück
        updateGraph(); // Gehe zurück zu Schritt 1
    }, stepFourDuration + stepFourDelay);
}

  function updateGraph() {
      if (animationPhase === 0) {
          // Zeige f(x) und lasse ihn für 3 Sekunden stehen
          graph.setAttribute('d', generatePath(f, -6, 4));
          graph.setAttribute('stroke', 'magenta'); // Setze Magenta als Startfarbe
          setTimeout(() => {
              animationPhase = 1;
              currentStep = 0; // Starte Morphing
              requestAnimationFrame(animateMorph);
          }, 3000);
      } else if (animationPhase === 2) {
          // Zeige g(x) und lasse ihn für 2 Sekunden stehen
          graph.setAttribute('d', generatePath(g, -6, 4));
          graph.setAttribute('stroke', 'cyan'); // Setze Cyan als Endfarbe
          setTimeout(() => {
              animationPhase = 3; // Wechsel zu Schritt 3
              stepFour(); // Zeichne Linien für den vierten Schritt
          }, 2000);
      }
  }

  function animateMorph() {
      if (currentStep <= totalSteps) {
          const t = currentStep / totalSteps;
          const intermediatePath = interpolatePaths(f, g, t, -6, 4);
          graph.setAttribute('d', intermediatePath);
          
          // Interpoliere die Farbe von Magenta zu Cyan
          const interpolatedColor = interpolateColor(t);
          graph.setAttribute('stroke', interpolatedColor);
          
          currentStep++;
          setTimeout(() => {
              requestAnimationFrame(animateMorph);
          }, frameDuration); // Passe die Frame-Dauer an
      } else {
          // Morphing abgeschlossen, wechsle zu Phase 2
          animationPhase = 2;
          updateGraph();
      }
  }

  // Starte die Animation mit f(x)
  updateGraph();
});
