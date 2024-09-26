/* Enthält:

Bruch Klasse



*/

class Fraction {
    constructor(numerator, denominator = 1) {
        this.numerator = numerator;
        this.denominator = denominator;
    }
    describe() {
        return `\\frac{${this.numerator} }{${this.denominator}}`;
    }


}








