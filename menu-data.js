// Zentrale Menue-Texte fuer die Website.
// Gerichtsnamen, Beschreibungen und Kategorien nur hier pflegen.
// Optional pro Gericht:
// { name: "3 Cacık (...)", price: "5,50 €", description: "Ihr Beschreibungstext" }

(function () {
  "use strict";

  const menuData = [
        {
          id: "kalte-vorspeisen",
          title: "Kalte Vorspeisen",
          sections: [
            {
              items: [
                { name: "1 Portion Oliven", price: "4,90 €" },
                { name: "2 Portion Peperoni", price: "4,90 €" },
                { name: "3 Cacık (Knoblauch, Gurken, Joghurt)", price: "5,50 €", description: "Joghurt-Gurken-Dip mit Knoblauch" },
                { name: "4 Spinat Ezme", price: "4,90 €", description: "Spinat-Joghurt-Paste" },
                { name: "5 Sigara Böreği", price: "8,90 €", description: "Knusprige Yufka-Röllchen mit Käse" },
                { name: "6 Havuç Ezme", price: "5,00 €", description: "Karotten-Joghurt-Paste" },
                { name: "7 Muhammara", price: "5,80 €", description: "Paprika-Walnuss-Creme" },
                { name: "8 Haydari Ezme", price: "5,00 €", description: "Cremiger Joghurt-Dip mit Kräutern und Knoblauch" },
                { name: "9 Gefüllte Weinblätter", price: "8,50 €" },
                { name: "10 Türkischer Teller", price: "9,00 €" },
                { name: "11 Kalte Platte", price: "10,00 €" },
                { name: "12 Auberginen Ezme", price: "5,80 €", description: "Geräucherte Auberginencreme" },
                { name: "13 Gebratenes Gemüse", price: "8,50 €" },
                { name: "14 Antep-Ezme", price: "5,00 €", description: "Scharfe Tomaten-Paprika Paste" },
                { name: "15 Humuz", price: "5,80 €", description: "Kichererbsenpüree mit Tahin" },
                { name: "16 HAYAT-Vorspeisenteller", price: "11,80 €" }
              ]
            }
          ]
        },
        {
          id: "warme-vorspeisen",
          title: "Warme Vorspeisen",
          sections: [
            {
              items: [
                { name: "30 Überbackene Champignons", price: "8,90 €" },
                { name: "33 Überbackener Hirtenkäse", price: "8,90 €" },
                { name: "83 Linsensuppe", price: "6,00 €" }
              ],
              note: "Extra-Portion Brot: 1,50 €"
            }
          ]
        },
        {
          id: "salate",
          title: "Salate",
          sections: [
            {
              items: [
                { name: "20 Hirse-Cacık-Salat", price: "9,50 €" },
                { name: "21 HAYAT-Salat (mit Thunfisch)", price: "9,50 €" },
                { name: "22 Hirtensalat", price: "9,50 €" },
                { name: "24 Gemischter Salat mit Hirtenkäse", price: "9,50 €" },
                { name: "28 Hindili Salat (mit Putenfleisch)", price: "10,50 €" },
                { name: "29 Tomaten-Joghurt-Salat", price: "8,50 €" }
              ]
            }
          ]
        },
        {
          id: "doenergerichte",
          title: "Dönergerichte",
          sections: [
            {
              items: [
                { name: "91 Iskender Kebap", price: "12,80 €", description: "Dönerfleisch mit geröstetem Brot mit Joghurt und Tomatensauce" },
                { name: "92 Döner mit Reis und Joghurt", price: "12,80 €" },
                { name: "93 Fleischteller (Döner, Lamms pieß, Köfte)", price: "16,00 €" }
              ]
            }
          ]
        },
        {
          id: "pfanne",
          title: "Aus der Pfanne",
          sections: [
            {
              items: [
                { name: "36 Zucchinipuffer", price: "11,50 €" },
                { name: "37 Humuz-Spinat-Köfte (veg.)", price: "11,50 €", description: "Kichererbsen-Spinat-Bällchen mit Kräutern" },
                { name: "38 Teigtaschen mit Gemüse", price: "11,50 €" },
                { name: "43 Falafel mit Sauce und Salat", price: "11,50 €" },
                { name: "44 Putencurry", price: "13,50 €" },
                { name: "46 Tirit mit Salat", price: "13,80 €", description: "Lammfleisch mit geröstetem Brot mit Joghurt und Tomatensauce" },
                { name: "47 Arnavut Cigeri (gebratene Leber)", price: "12,50 €", description: "Gebratene Leber mit Zwiebeln und Tomaten, leicht pikant" },
                { name: "48 Gemüsepfanne", price: "10,00 €" },
                { name: "49 Gemüsepfanne mit Putenfleisch", price: "13,50 €" },
                { name: "78 Pfannkuchen mit Hackfleischfüllung", price: "11,50 €" }
              ]
            }
          ]
        },
        {
          id: "ofen",
          title: "Aus dem Ofen",
          sections: [
            {
              items: [
                { name: "50 Spinatauflauf mit Kartoffeln &amp; Käse", price: "10,50 €" },
                { name: "51 Spinatauflauf mit Bulgur &amp; Hirtenkäse", price: "10,50 €" },
                { name: "52 Brokkoliauflauf", price: "10,50 €" },
                { name: "53 Auberginenauflauf", price: "10,50 €" },
                { name: "55 Nudelauflauf", price: "10,50 €" },
                { name: "56 Gemüseauflauf", price: "10,50 €" }
              ],
              note: "Alle Aufläufe wahlweise mit oder ohne Fleisch – mit Fleisch + 2,50 €"
            }
          ]
        },
        {
          id: "grill",
          title: "Vom Grill",
          sections: [
            {
              items: [
                { name: "57 Türkische Wurst mit Paprika &amp; Salat", price: "12,00 €" },
                { name: "59 Şiş mit Lammfleisch", price: "14,00 €", description: "Lammspieß vom Grill" },
                { name: "60 Hähnchenspieß", price: "13,50 €", description: "Hähnchenspieß vom Grill" },
                { name: "62 Köfte", price: "13,50 €", description: "Gegrillte Hackfleischbällchen" },
                { name: "63 Köfte mit Hirtenkäsefüllung", price: "15,00 €", description: "GegrillteHackbällchen mit Feta-Füllung" },
                { name: "64 Adana Şiş", price: "13,00 €", description: "Scharfer Hackfleischspieß " },
                { name: "65 Adana Şiş mit Joghurtsauce", price: "14,00 €", description: "Scharfer Hackfleischspieß mit Joghurtsauce" },
                { name: "66 Tomaten-Kebab", price: "14,50 €", description: "Scharfer Adana Sis mit Pikanter Tomatensaue" },
                { name: "67 Pirzola (Lammkoteletts)", price: "17,00 €" },
                { name: "68 Fleischplatte", price: "16,50 €" },
                { name: "69 HAYAT-Grillteller", price: "17,50 €" }
              ]
            }
          ]
        },
        {
          id: "beilagen",
          title: "Beilagen",
          sections: [
            {
              items: [
                { name: "74 Reis", price: "2,50 €" },
                { name: "75 Bulgur", price: "2,50 €" },
                { name: "76 Beilagensalat", price: "3,50 €" }
              ]
            }
          ]
        },
        {
          id: "kinder",
          title: "Für Kinder",
          sections: [
            {
              items: [
                { name: "84 Falafel mit Sauce und Salat", price: "7,50 €" },
                { name: "85 Spieß mit Salat und Reis", price: "8,50 €", description: "Hähnchenspieß mit Salat und Reis" },
                { name: "86 Köfte mit Salat und Reis", price: "8,50 €", description: "Hackfleischbällchen mit Salat und Reis" }
              ]
            }
          ]
        },
        {
          id: "dessert",
          title: "Dessert",
          sections: [
            {
              items: [{ name: "87 Baklava (3 Stück, mit Sahne, Zimt und Walnuss)", price: "4,20 €" }]
            }
          ]
        },
        {
          id: "biere",
          title: "Biere",
          sections: [
            {
              items: [
                { name: "Früh Kölsch", price: "3,00 € / 5,00 €" },
                { name: "Schlösser Alt", price: "3,00 € / 5,00 €" },
                { name: "Jever Pils", price: "3,00 € / 5,00 €" },
                { name: "Brinkhoffs Nr. 1", price: "3,00 € / 5,00 €" },
                { name: "Jever Fun (alkoholfrei)", price: "3,00 € / 5,00 €" },
                { name: "Malz", price: "3,00 € / 5,00 €" },
                { name: "Hefeweizen", price: "5,00 €" },
                { name: "Weizen, alkoholfrei", price: "5,00 €" }
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
                { name: "Fanta / Cola / Sprite", price: "3,00 € / 4,50 €" },
                { name: "Selters Mineralwasser (0,25l / 0,75l)", price: "2,80 € / 5,00 €" },
                { name: "Tonic, Bitter Lemon", price: "3,50 €" },
                { name: "Säfte / Saftschorle", price: "3,50 € / 5,00 €" },
                { name: "Bionade (0,33l)", price: "4,00 €" },
                { name: "Fassbrause (0,33l)", price: "4,00 €" }
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
                { name: "Kaffee", price: "2,80 €" },
                { name: "Espresso", price: "2,00 €" },
                { name: "Doppelter Espresso", price: "3,50 €" },
                { name: "Milchkaffee", price: "3,20 €" },
                { name: "Cappuccino", price: "3,20 €" },
                { name: "Türkischer Tee (klein)", price: "1,50 €" },
                { name: "Frische Minze", price: "3,00 €" },
                { name: "Tee, verschiedene Sorten", price: "2,50 €" },
                { name: "Heiße Zitrone", price: "3,00 €" }
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
                { name: "Ouzo", price: "3,00 €" },
                { name: "Rum", price: "3,00 €" },
                { name: "103", price: "3,00 €" },
                { name: "Veterano", price: "3,00 €" },
                { name: "Grappa", price: "3,00 €" },
                { name: "Wodka", price: "3,00 €" },
                { name: "Baileys", price: "3,00 €" },
                { name: "Averna", price: "3,00 €" },
                { name: "Sambuca", price: "3,00 €" },
                { name: "Café Oriental", price: "3,00 €" },
                { name: "Fernet Branca", price: "3,00 €" },
                { name: "Ramazotti", price: "3,00 €" },
                { name: "Jägermeister", price: "3,00 €" }
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
                  price: "4,80 €",
                  description: "Volle Frucht und ausgeprägter Geschmack."
                },
                {
                  name: "Riesling (enthält Sulfite)",
                  price: "4,80 €",
                  description: "Ein edler Freund aus dem Rheingau."
                }
              ]
            },
            {
              title: "Rotwein (0,2l)",
              items: [
                { name: "Montepulciano d'Abruzzo", price: "4,60 €" },
                {
                  name: "Merlot (enthält Sulfite)",
                  price: "4,60 €",
                  description: "Rebsorte Merlot – hat die Frucht, die ihm nachgesagt wird. Passt immer!"
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

