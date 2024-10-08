const point1 = { x: -6, y: 2.6 };
const point2 = { x: 4, y: -3.4 }; // Startposition des zweiten Punktes
const point2bak = { x: 4, y: -3.4 };

const svgPoint2 = document.getElementById('point2');
const connectingLine = document.getElementById('connectingLine');

const initialDistance = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
const stepSize = 0.01; // Geschwindigkeit der Bewegung
let step = stepSize;

function movePoint() {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;

    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 0.01) {
        // Animation beenden, wenn der Punkt nahe genug ist
        point2.x = point1.x;
        point2.y = point1.y;
    } else {
        // Punkt entlang der Linie bewegen // letzte distance: 0.005440886304469888
        point2.x += (dx / distance) * step;
        point2.y = getY(point2.x);
    }

    // Punktposition aktualisieren
    svgPoint2.setAttribute('cx', point2.x);
    svgPoint2.setAttribute('cy', point2.y);

    // Linie aktualisieren
    const lineExtension = 2; // 1 LE über beide Punkte hinaus
    const lineLength = distance + 2 * lineExtension;
    const lineDx = (dx / distance) * lineLength;
    const lineDy = (dy / distance) * lineLength;

    connectingLine.setAttribute('x1', point1.x + lineDx * lineExtension / lineLength);
    connectingLine.setAttribute('y1', point1.y + lineDy * lineExtension / lineLength);
    connectingLine.setAttribute('x2', point2.x - lineDx * lineExtension / lineLength);
    connectingLine.setAttribute('y2', point2.y - lineDy * lineExtension / lineLength);

    if (distance <= 0.01) {
      point2.x = point2bak.x;
      point2.y = point2bak.y;

      setTimeout(() => movePoint(), 1000);
    }
    else {
      requestAnimationFrame(movePoint); // Animation fortsetzen
    }
}

movePoint(); // Animation starten


function getY(x) {
  return -0.1*(x+4)*(x+4)+3;
}