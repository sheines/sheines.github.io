/* Enthält:

Brüche
    - Addition
    - Subtraktion
    - Multiplikation
    - Division



*/

// Zahlen
let a = 0;
let b = 0;
let c = 0;


// Brüche
const bruchadd = document.getElementById("bruchadd");
const bruchaddL = document.getElementById("bruchaddL");
// const natsub = document.getElementById("natsub");
// const natsubL = document.getElementById("natsubL");
// const natmul = document.getElementById("natmul");
// const natmulL = document.getElementById("natmulL");
// const natdiv = document.getElementById("natdiv");
// const natvivL = document.getElementById("natdivL");

bruchadd.addEventListener('click', () => {
    a = randomNumber(0,10);
    b = randomNumber(0,10);

    ba = new Fraction(a,b);
    bb = new Fraction(b,a);

    // c = a+b;

    bruchadd.innerHTML = "\\(" + ba.numerator + " + " + bb.denominator + "=\\)";
    // nataddL.innerHTML = "\\(\\," + c + "\\)";

    
    MathJax.typeset();
});

// natsub.addEventListener('click', () => {
//     a = randomNumber(0,100);
//     b = randomNumber(0,100);

//     while (b > a) {
//         a = randomNumber(0,100);
//         b = randomNumber(0,100);
//     }

//     c = a-b;

//     natsub.innerHTML = "\\(" + a + " - " + b + "=\\)";
//     natsubL.innerHTML = "\\(\\," + c + "\\)";

    
//     MathJax.typeset();
// });

// natmul.addEventListener('click', () => {
//     a = randomNumber(1,10);
//     b = randomNumber(1,10);

//     c = a*b;

//     natmul.innerHTML = "\\(" + a + " \\cdot " + b + "=\\)";
//     natmulL.innerHTML = "\\(\\," + c + "\\)";
  
//     MathJax.typeset();
// });

// natdiv.addEventListener('click', () => {
//     a = randomNumber(0,10);
//     b = randomNumber(0,10);

//     c = a*b;

//     natdiv.innerHTML = "\\(" + c + " : " + b + "=\\)";

//     if (b != 0) 
//         natdivL.innerHTML = "\\(\\," + a + "\\)";
//     else
//         natdivL.innerHTML = " n.L.";
 
//     MathJax.typeset();
// });





// Funktionen
function randomNumber(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// Initialisierung der Felder
bruchadd.click();
// natsub.click();
// natmul.click();
// natdiv.click();









