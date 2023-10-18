package Karten; // GGF anpassen!

public class Programm {
    public static void main(String[] args) {
        
        // Kartendeck erstellen



    }

    public static Karte[] erstelleDeck() {
        Karte[] karten = new Karte[40]; // 10 Zahlen mal 4 Farben

        // Deck mit Karten füllen
        int index = 0;
        for (int f = 0; f < 4; ++f) { // 4 Farben
            for (int z = 1; z <= 10; ++z) { // Zahlen von 1 bis 10
                
                // Farbe auswählen
                String farbe = "";
                switch(f) {   // Schaue, ob f (Farbe) ...
                    case 0: farbe = ""; break; // rot
                    case 1: farbe = ""; break; // grün
                    case 2: farbe = ""; break; // blau
                    case 3: farbe = ""; break; // orange
                }
                
                // Neue Karte erstellen
                Karte karte = new Karte(/* farbe und zahl (z) übergeben */);
                
                // Karte dem Deck hinzufügen
                karten[index] = karte;

                // index erhöhen
                ++index;

                // index könnte auch mit index = 10 * f + z; berechnet werden
            }
        }

        // Kartendeck zurückgeben
        return karten;
    }
    
}
