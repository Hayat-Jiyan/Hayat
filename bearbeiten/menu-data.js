// BEARBEITEN: Zentrale Menue-Texte fuer die Website.
// Gerichtsnamen, Beschreibungen und Kategorien nur hier pflegen.
// Preise werden zentral in bearbeiten/prices.js gepflegt.
// Stand: Speisekarte September 2026.
// { name: "3 Cacık", description: "Ihr Beschreibungstext" }

(function () {
  "use strict";

  const menuData = [
    {
      id: "vorspeisen",
      title: "Vorspeisen",
      description: "Täglich frisch zubereitete Vorspeisen für den perfekten Start.<br><br>🌱 <strong>Info:</strong> Wir bieten viele vegane Gerichte an und können Speisen oft nach Ihren Wünschen anpassen. Sprechen Sie uns bei Allergien oder besonderen Wünschen einfach darauf an!",
      sections: [
        {
          title: "Kalte Vorspeisen",
          items: [
            { name: "1 Portion Oliven" },
            { name: "2 Portion Peperoni" },
            { name: "3 Cacık", description: "Joghurt-Gurken-Dip mit Knoblauch" },
            { name: "4 Spinat Ezme", description: "Spinat-Joghurt-Paste" },
            { name: "5 Sigara Börek", description: "Mit Salat und Cacık" },
            { name: "6 Havuç Ezme", description: "Karotten-Joghurt-Paste" },
            { name: "7 Muhammara", description: "Paprika-Walnuss-Creme" },
            { name: "8 Haydari", description: "Joghurt-Dip mit Dill und Knoblauch" },
            { name: "9 Gefüllte Weinblätter", description: "Mit Joghurt" },
            { name: "10 Türkischer Teller", description: "Türkische Wurst, Käse, Peperoni, Oliven, Salat" },
            { name: "11 Kalte Platte", description: "Hummus, Spinat Ezme, Oliven, Peperoni, Sigara Börek, gefülltes Weinblatt, gebratenes Gemüse" },
            { name: "12 Auberginen Ezme", description: "Geräucherte Auberginen-Paprikacreme" },
            { name: "13 Gebratenes Gemüse", description: "Mit Joghurt" },
            { name: "14 Antep Ezme", description: "Paprika-Paste mit Zwiebeln, scharf" },
            { name: "15 Hummus", description: "Kichererbsenpüree mit Sesampaste" },
            { name: "16 HAYAT-Vorspeisenteller", description: "Antep-, Havuç- und Spinat Ezme, Muhammara, Haydari, Hummus" }
          ]
        },
        {
          title: "Warme Vorspeisen",
          items: [
            { name: "30 Überbackene Champignons", description: "Mit Joghurt" },
            { name: "33 Überbackener Hirtenkäse" },
            { name: "83 Linsensuppe" }
          ],
          note: "Extra-Portion Brot: 1,00 €"
        }
      ]
    },
    {
      id: "salate",
      title: "Salate",
      description: "Knackig frisch, bunt gemischt und mit Liebe angerichtet.",
      sections: [
        {
          items: [
            { name: "20 Hirse-Cacık-Salat" },
            { name: "21 HAYAT-Salat", description: "Mit Thunfisch und Joghurt" },
            { name: "22 Hirtensalat", description: "Tomaten, Gurken, Zwiebeln" },
            { name: "24 Gemischter Salat mit Hirtenkäse" },
            { name: "28 Hindili Salat", description: "Mit Joghurt und Putenfleisch" },
            { name: "29 Tomaten-Joghurt-Salat" }
          ]
        }
      ]
    },
    {
      id: "pfanne",
      title: "Aus der Pfanne",
      description: "Herzhafte Spezialitäten frisch in der Pfanne zubereitet.",
      sections: [
        {
          items: [
            { name: "36 Zucchinipuffer", description: "Mit Salat und Cacık" },
            { name: "37 Hummus-Spinat-Köfte", description: "Mit Bulgur, Reis und Salat" },
            { name: "38 Teigtaschen mit Gemüse", description: "Mit Hirtenkäse, Salat und Cacık" },
            { name: "43 Falafel", description: "Mit Joghurt und Salat" },
            { name: "44 Putencurry", description: "Mit Bulgur, Reis und Salat" },
            { name: "46 Tirit mit Salat", description: "Geröstetes Brot, Joghurt-Tomaten-Soße" },
            { name: "47 Arnavut Ciğeri", description: "Gebratene Leber mit Bulgur, Reis und Salat" },
            { name: "48 Gemüsepfanne", description: "Mit Bulgur, Reis, Joghurt und Salat" },
            { name: "49 Gemüsepfanne mit Putenfleisch", description: "Mit Bulgur, Reis, Joghurt und Salat" },
            { name: "78 Pfannkuchen gefüllt mit Hackfleisch", description: "Mit Joghurt und Salat" }
          ]
        }
      ]
    },
    {
      id: "ofen",
      title: "Aus dem Ofen",
      description: "Goldbraun gebacken und ofenfrisch serviert.",
      sections: [
        {
          items: [
            { name: "50 Spinatauflauf mit Kartoffeln und Käse" },
            { name: "51 Spinatauflauf mit Bulgur und Hirtenkäse" },
            { name: "52 Brokkoliauflauf mit Kartoffeln" },
            { name: "53 Auberginenauflauf mit Kartoffeln" },
            { name: "55 Nudelauflauf" },
            { name: "56 Gemüseauflauf" }
          ],
          note: "Alle Aufläufe gibt es wahlweise mit oder ohne Fleisch (Hackfleisch) – mit Fleisch + 2,50 €"
        }
      ]
    },
    {
      id: "grill",
      title: "Vom Grill",
      description: "Saftig gegrillte Köstlichkeiten mit vollem Aroma.",
      sections: [
        {
          items: [
            { name: "57 Gegrillte türkische Wurst mit Paprika" },
            { name: "59 Şiş mit Lammfleisch", description: "Lammspieße" },
            { name: "60 Hähnchenspieße" },
            { name: "62 Köfte" },
            { name: "63 Köfte gefüllt mit Hirtenkäse" },
            { name: "64 Adana Şiş", description: "Hackfleischspieß, scharf" },
            { name: "65 Adana Şiş mit Joghurtsauce", description: "Scharf" },
            { name: "66 Tomaten-Kebab", description: "Hackfleischspieß mit Joghurtsauce und Tomatensauce" },
            { name: "67 Pirzola", description: "Lammkoteletts" },
            { name: "68 Fleischplatte", description: "Köfte, Lammspieß, Kotelett" },
            { name: "69 HAYAT-Grillteller", description: "Köfte, Lammspieß, Kotelett, Hähnchenspieß" }
          ],
          note: "Alle Grillgerichte werden mit Reis, Bulgur und Salat als Beilage serviert."
        }
      ]
    },
    {
      id: "doenergerichte",
      title: "Dönergerichte",
      sections: [
        {
          items: [
            { name: "91 Iskender Kebap", description: "Dönerfleisch, geröstetes Brot, Joghurt-Tomatensoße mit Salat" },
            { name: "92 Döner auf Reis", description: "Mit Salat und Joghurt" },
            { name: "93 Fleischteller", description: "Döner, Lammspieß, Köfte, Reis, Bulgur und Salat" }
          ]
        }
      ]
    },
    {
      id: "kinder",
      title: "Für Kinder",
      description: "Leckere Lieblingsgerichte für unsere kleinen Gäste bis 12 Jahre.",
      sections: [
        {
          items: [
            { name: "84 Falafel", description: "2 Stück mit Joghurt und Salat" },
            { name: "85 Hähnchenspieß", description: "1 Hähnchenspieß mit Bulgur, Reis und Salat" },
            { name: "86 Kinderköfte", description: "1 Köfte mit Bulgur, Reis und Salat" }
          ]
        }
      ]
    },
    {
      id: "beilagen",
      title: "Beilagen",
      description: "Die perfekte Ergänzung zu jedem Hauptgericht.",
      sections: [
        {
          items: [
            { name: "74 Reis" },
            { name: "75 Bulgur" },
            { name: "76 Beilagensalat" },
            { name: "77 Beilagenteller", description: "Bulgur, Reis, Salat" }
          ]
        }
      ]
    },
    {
      id: "dessert",
      title: "Dessert",
      sections: [
        {
          items: [
            { name: "87 Baklava", description: "3 Stück, mit Sahne, Walnuss und Zimt" },
            { name: "88 Wechselnde Nachspeise", description: "Auf Nachfrage" }
          ]
        }
      ]
    },
    {
      id: "tagesgerichte",
      title: "Tagesgerichte",
      sections: [
        {
          items: [
            { name: "Täglich wechselnde Gerichte", description: "Mit Reis, Bulgur und Salat – siehe Info-Tafel" },
            { name: "Mittwochs: frische Sardellen mit Salat", description: "Nach Verfügbarkeit" }
          ]
        }
      ]
    },
    {
      id: "biere",
      title: "Biere",
      description: "Preise für 0,3 l / 0,5 l.",
      sections: [
        {
          items: [
            { name: "Früh Kölsch" },
            { name: "Schlösser Alt" },
            { name: "Jever Pils" },
            { name: "Brinkhoffs Nr. 1" },
            { name: "Malz" },
            { name: "Hefeweizen (0,5 l)" },
            { name: "Jever Fun alkoholfrei (&lt;0,5 % vol.)" },
            { name: "Hefeweizen alkoholfrei (0,0 %, 0,5 l)" }
          ]
        }
      ]
    },
    {
      id: "softdrinks",
      title: "Alkoholfreie Getränke",
      description: "Preise für 0,3 l / 0,5 l, sofern nicht anders angegeben.",
      sections: [
        {
          items: [
            { name: "Cola, Cola Zero, Cola Light, Fanta, Sprite", description: "Mit Farbstoff" },
            { name: "Säfte", description: "Apfel, Banane, Schwarze Johannisbeere, Kirsche, Rhabarber, Maracuja, Orange" },
            { name: "Saftschorle" },
            { name: "Bionade (Flasche 0,33 l)" },
            { name: "Fassbrause (Flasche 0,33 l)" },
            { name: "Tonic (0,2 l)", description: "Mit Farbstoff" },
            { name: "Bitter Lemon (0,2 l)", description: "Mit Farbstoff" },
            { name: "Selters Mineralwasser (0,25 l / 0,75 l)", description: "Medium, Classic" }
          ]
        }
      ]
    },
    {
      id: "warme-getraenke",
      title: "Warme Getränke",
      sections: [
        {
          items: [
            { name: "Kaffee" },
            { name: "Espresso" },
            { name: "Doppelter Espresso" },
            { name: "Milchkaffee" },
            { name: "Cappuccino" },
            { name: "Türkischer Tee (klein)" },
            { name: "Frische Minze" },
            { name: "Tee, verschiedene Sorten" },
            { name: "Heiße Zitrone" }
          ]
        }
      ]
    },
    {
      id: "spirituosen",
      title: "Spirituosen",
      description: "Spirituosen, Liköre und Magenbitter (2 cl).",
      sections: [
        {
          items: [
            { name: "Ouzo" },
            { name: "Rum" },
            { name: "103" },
            { name: "Veterano" },
            { name: "Grappa" },
            { name: "Wodka" },
            { name: "Baileys" },
            { name: "Averna" },
            { name: "Sambuca" },
            { name: "Café Oriental" },
            { name: "Fernet Branca" },
            { name: "Jägermeister" }
          ],
          note: "Alle Spirituosen: 3,00 €"
        }
      ]
    },
    {
      id: "weinkarte",
      title: "Weinkarte",
      description: "Preise für 0,1 l / 0,2 l.",
      sections: [
        {
          title: "Weißwein",
          items: [
            {
              name: "Grauburgunder (enthält Sulfite)",
              description: "Volle Frucht und ausgeprägter Geschmack."
            },
            {
              name: "Riesling (enthält Sulfite)",
              description: "Ein edler Freund aus dem Rheingau."
            }
          ]
        },
        {
          title: "Rotwein",
          items: [
            {
              name: "Merlot (enthält Sulfite)",
              description: "Rebsorte Merlot – hat die Frucht, die ihm nachgesagt wird. Passt immer!"
            },
            { name: "Montepulciano d'Abruzzo (enthält Sulfite)" }
          ]
        },
        {
          title: "Weinschorle",
          items: [{ name: "Weißweinschorle (enthält Sulfite)" }]
        }
      ]
    }
  ];

  window.MENU_DATA = menuData;
})();
