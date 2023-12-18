// Hier Namen einfügen!


import java.awt.*;
import java.awt.event.*;

public class Zensurenverwaltung {
    // Globale Variablen, sodass von jeder Methode aus zugegriffen werden kann
    TextArea textAreaNotenAusgabe;
    TextField textFieldNotenEingabe, textFieldDurchschnitt, textFieldMaximum; 


    // Oberfläche erzeugen und Events einfügen
    public Zensurenverwaltung() {
        // Oberfläche erzeugen
        Frame fenster = new Frame("Zensurenverwaltung");
        fenster.setSize(450, 300);
        fenster.setLayout(null);

        // Labels
        Label label = new Label("Zensuren im Informatikunterricht");
        label.setBounds(30,45,400,25);
        label.setFont(new Font("Times New Roman", Font.BOLD, 20));
        fenster.add(label);

        label = new Label("Eingabe Punktwert:");
        label.setBounds(30,90,130,25);
        fenster.add(label);

        label = new Label("Übersicht Punktwerte:");
        label.setBounds(30,130,130,25);
        fenster.add(label);

        label = new Label("Punktedurchschnitt:");
        label.setBounds(30,200,130,25);
        fenster.add(label);

        label = new Label("Bester Punktwert:");
        label.setBounds(30,240,130,25);
        fenster.add(label);

        // Textarea
        textAreaNotenAusgabe = new TextArea();
        textAreaNotenAusgabe.setBounds(170,135,250,40);
        textAreaNotenAusgabe.setFocusable(false);
        fenster.add(textAreaNotenAusgabe);
        
        // Textfields
        textFieldNotenEingabe = new TextField();
        textFieldNotenEingabe.setBounds(170,90,30,20);
        textFieldNotenEingabe.requestFocus();
        fenster.add(textFieldNotenEingabe);

        textFieldDurchschnitt = new TextField();
        textFieldDurchschnitt.setBounds(170,200,30,20);
        fenster.add(textFieldDurchschnitt);

        textFieldMaximum = new TextField();
        textFieldMaximum.setBounds(170,240,30,20);
        fenster.add(textFieldMaximum);

        // Fenster sichtbar machen
        fenster.setVisible(true);


        //
        //  Events einfügen
        //
        

        textFieldNotenEingabe.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {


                }
            }
        });

        // Fenster schließbar machen
        fenster.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }




    // Einstiegspunkt -- kann unverändert bleiben!
    public static void main(String[] args) {
        new Zensurenverwaltung();
    }
    

}