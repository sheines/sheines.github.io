// Get elements by its id
const nsLabel = document.getElementById("nsLabel");
const hpLabel = document.getElementById("hpLabel");
const tpLabel = document.getElementById("tpLabel");
const wpLabel = document.getElementById("wpLabel");

const ns1 = document.getElementById("ns1");
const ns2 = document.getElementById("ns2");
const ns3 = document.getElementById("ns3");
const ns4 = document.getElementById("ns4");

const hp = document.getElementById("hp");

const tp1 = document.getElementById("tp1");
const tp2 = document.getElementById("tp2");

const wp1 = document.getElementById("wp1");
const wp2 = document.getElementById("wp2");

Animation2();



function Animation2() {

    // Nullstellen
    nsLabel.animate([{color: "darkgoldenrod"}, {color: "red"}],{
        duration: 1000,
        fill: "forwards",
        delay: 500,
    });
    ns1.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 500,
    });
    ns2.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 1500,
    });
    ns3.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 2500,
    });
    ns4.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 3500,
    });

    // Hochpunkte
    hpLabel.animate([{color: "darkgoldenrod"}, {color: "cyan"}],{
        duration: 1000,
        fill: "forwards",
        delay: 6500,
    });
    hp.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 6500,
    });

    // Tiefpunkte
    tpLabel.animate([{color: "darkgoldenrod"}, {color: "lime"}],{
        duration: 1000,
        fill: "forwards",
        delay: 9500,
    });
    tp1.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 9500,
    });
    tp2.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 10500,
    });

    // Wendepunkte
    wpLabel.animate([{color: "darkgoldenrod"}, {color: "orange"}],{
        duration: 1000,
        fill: "forwards",
        delay: 13500,
    });
    wp1.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 13500,
    });
    wp2.animate([{opacity: 0 }, {opacity: 1}],{
        duration: 2000,
        fill: "forwards",
        delay: 14500,
    });

    

    // Zurück
    // Nullstellen
    nsLabel.animate([{color: "red"}, {color: "darkgoldenrod"}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    ns1.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    ns2.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    ns3.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    ns4.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });

    // Hochpunkte
    hpLabel.animate([{color: "cyan"}, {color: "darkgoldenrod"}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    hp.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });

    // Tiefpunkte
    tpLabel.animate([{color: "lime"}, {color: "darkgoldenrod"}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    tp1.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    tp2.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });

    // Wendepunkte
    wpLabel.animate([{color: "orange"}, {color: "darkgoldenrod"}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    wp1.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });
    wp2.animate([{opacity: 1 }, {opacity: 0}],{
        duration: 1000,
        fill: "forwards",
        delay: 20000,
    });


    setTimeout(Animation2, 22000);
}
