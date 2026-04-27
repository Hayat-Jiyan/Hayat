// Zentrale Menue-Texte fuer die Website.
// Gerichtsnamen, Beschreibungen und Kategorien nur hier pflegen.
// Preise werden zentral in prices.js gepflegt.
// { name: "3 Cacık (...)", price: "5,50 €", description: "Ihr Beschreibungstext" }

(function () {
  "use strict";

  const menuData = [
    {
      id: "vorspeisen",
      title: "Vorspeisen",
      description: "Täglich frisch zubereitete Vorspeisen für den perfekten Start.",
      sections: [
        {
          title: "Kalte Vorspeisen",
          items: [
            { name: "1 Portion Oliven" },
            { name: "2 Portion Peperoni" },
            { name: "3 Cacık (Knoblauch, Gurken, Joghurt)", description: "Joghurt-Gurken-Dip mit Knoblauch" },
            { name: "4 Spinat Ezme", description: "Spinat-Joghurt-Paste" },
            { name: "5 Sigara Böreği", description: "Knusprige Yufka-Röllchen mit Käse" },
            { name: "6 Havuç Ezme", description: "Karotten-Joghurt-Paste" },
            { name: "7 Muhammara", description: "Paprika-Walnuss-Creme" },
            { name: "8 Haydari Ezme", description: "Cremiger Joghurt-Dip mit Kräutern und Knoblauch" },
            { name: "9 Gefüllte Weinblätter" },
            { name: "10 Türkischer Teller" },
            { name: "11 Kalte Platte" },
            { name: "12 Auberginen Ezme", description: "Geräucherte Auberginen-Paprikacreme" },
            { name: "13 Gebratenes Gemüse" },
            { name: "14 Antep-Ezme", description: "Scharfe Tomaten-Paprika-Paste" },
            { name: "15 Humuz", description: "Kichererbsenpüree mit Tahin" },
            { name: "16 HAYAT-Vorspeisenteller" }
          ]
        },
        {
          title: "Warme Vorspeisen",
          items: [
            { name: "30 Überbackene Champignons" },
            { name: "33 Überbackener Hirtenkäse" },
            { name: "83 Linsensuppe" }
          ]
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
            { name: "21 HAYAT-Salat (mit Thunfisch)" },
            { name: "22 Hirtensalat" },
            { name: "24 Gemischter Salat mit Hirtenkäse" },
            { name: "28 Hindili Salat (mit Putenfleisch)" },
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
            { name: "36 Zucchinipuffer" },
            { name: "37 Humuz-Spinat-Köfte (veg.)", description: "Kichererbsen-Spinat-Bällchen mit Kräutern" },
            { name: "38 Teigtaschen mit Gemüse" },
            { name: "43 Falafel mit Sauce und Salat" },
            { name: "44 Putencurry" },
            { name: "46 Tirit mit Salat", description: "Lammfleisch mit geröstetem Brot, Joghurt und Tomatensauce" },
            { name: "47 Arnavut Cigeri (gebratene Leber)", description: "Gebratene Leber mit Zwiebeln und Tomaten, leicht pikant" },
            { name: "48 Gemüsepfanne" },
            { name: "49 Gemüsepfanne mit Putenfleisch" },
            { name: "78 Pfannkuchen mit Hackfleischfüllung" }
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
            { name: "50 Spinatauflauf mit Kartoffeln & Käse" },
            { name: "51 Spinatauflauf mit Bulgur & Hirtenkäse" },
            { name: "52 Brokkoliauflauf" },
            { name: "53 Auberginenauflauf" },
            { name: "55 Nudelauflauf" },
            { name: "56 Gemüseauflauf" }
          ],
          note: "Alle Aufläufe wahlweise mit oder ohne Fleisch - mit Fleisch + 2,50 €"
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
            { name: "57 Türkische Wurst mit Paprika & Salat" },
            { name: "59 Şiş mit Lammfleisch", description: "Lammspieß vom Grill" },
            { name: "60 Hähnchenspieß", description: "Hähnchenspieß vom Grill" },
            { name: "62 Köfte", description: "Gegrillte Hackfleischbällchen" },
            { name: "63 Köfte mit Hirtenkäsefüllung", description: "Gegrillte Hackbällchen mit Feta-Füllung" },
            { name: "64 Adana Şiş", description: "Scharfer Hackfleischspieß" },
            { name: "65 Adana Şiş mit Joghurtsauce", description: "Scharfer Hackfleischspieß mit Joghurtsauce" },
            { name: "66 Tomaten-Kebab", description: "Scharfer Adana-Spieß mit Joghurt und pikanter Tomatensauce" },
            { name: "67 Pirzola (Lammkoteletts)" },
            { name: "68 Fleischplatte" },
            { name: "69 HAYAT-Grillteller" }
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
            { name: "91 Iskender Kebap", description: "Dönerfleisch mit geröstetem Brot, Joghurt und Tomatensauce" },
            { name: "92 Döner mit Reis und Joghurt" },
            { name: "93 Fleischteller (Döner, Lammspieß, Köfte)" }
          ]
        }
      ]
    },
    {
      id: "kinder",
      title: "Für Kinder",
      description: "Leckere Lieblingsgerichte für unsere kleinen Gäste.",
      sections: [
        {
          items: [
            { name: "84 Falafel mit Sauce und Salat" },
            { name: "85 Spieß mit Salat und Reis", description: "Hähnchenspieß mit Salat und Reis" },
            { name: "86 Köfte mit Salat und Reis", description: "Hackfleischbällchen mit Salat und Reis" }
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
            { name: "76 Beilagensalat" }
          ]
        }
      ]
    },
    {
      id: "dessert",
      title: "Dessert",
      sections: [
        {
          items: [{ name: "87 Baklava (3 Stück, mit Sahne, Zimt und Walnuss)" }]
        }
      ]
    },
    {
      id: "biere",
      title: "Biere",
      sections: [
        {
          items: [
            { name: "Früh Kölsch" },
            { name: "Schlösser Alt" },
            { name: "Jever Pils" },
            { name: "Brinkhoffs Nr. 1" },
            { name: "Jever Fun (alkoholfrei)" },
            { name: "Malz" },
            { name: "Hefeweizen" },
            { name: "Weizen, alkoholfrei" }
          ]
        }
      ]
    },
    {
      id: "softdrinks",
      title: "Alkoholfreie Getränke",
      sections: [
        {
          items: [
            { name: "Fanta / Cola / Sprite" },
            { name: "Selters Mineralwasser (0,25l / 0,75l)" },
            { name: "Tonic, Bitter Lemon" },
            { name: "Säfte / Saftschorle" },
            { name: "Bionade (0,33l)" },
            { name: "Fassbrause (0,33l)" }
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
            { name: "Ramazotti" },
            { name: "Jägermeister" }
          ],
          note: "Alle Spirituosen: 3,00 €"
        }
      ]
    },
    {
      id: "weinkarte",
      title: "Weinkarte",
      sections: [
        {
          title: "Weißwein (0,2l)",
          items: [
            {
              name: "Grauburgunder",
              description: "Volle Frucht und ausgeprägter Geschmack."
            },
            {
              name: "Riesling (enthält Sulfite)",
              description: "Ein edler Freund aus dem Rheingau."
            }
          ]
        },
        {
          title: "Rotwein (0,2l)",
          items: [ // Note: Montepulciano d'Abruzzo and Merlot prices were 4,60 € in menu-data.js, but 4,80 € in Produkte.md. Using 4,80 € from prices.js.
            { name: "Montepulciano d'Abruzzo" },
            {
              name: "Merlot (enthält Sulfite)",
              description: "Rebsorte Merlot - hat die Frucht, die ihm nachgesagt wird. Passt immer!"
            }
          ]
        },
        {
          title: "Weinschorle",
          items: [{ name: "Weißweinschorle (enthält Sulfite)", price: "4,00 €" }]
        }
      ]
    }
  ];

  window.MENU_DATA = menuData;
})();
