public class Bruch {
    
    int zaehler;
    int nenner; 

    public void kuerzen() {
        int h = groessterGemeinsamerTeiler(zaehler, nenner);
    }
    private int groessterGemeinsamerTeiler(int a, int b) {
            
            if (a == 0) return Math.abs(b);
            if (b == 0) return Math.abs(a);

            int h;
            do
            {
                h = a % b;
                a = b;
                b = h;
            } while (b != 0);

            return Math.abs(a);
    }

    public void div(Bruch a) {
        zaehler *= a.nenner;
        nenner *= a.zaehler;

        kuerzen();        
    }

}