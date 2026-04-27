// Zentrale Preisliste für die Website.
// Alle Preise sollten nur hier gepflegt werden, um Konsistenz zu gewährleisten.
// Die Website liest die Preise aus diesem Katalog und wendet sie auf das Menü und Highlights an.

(function () {
  "use strict";

  const priceCatalog = {
    numbered: {}, // Preise für Gerichte mit Nummern (z.B. "91 Iskender Kebap")
    named: {}     // Preise für Gerichte ohne Nummern oder zur alternativen Benennung
  };

  // Hilfsfunktion zum Normalisieren von Namen für den Lookup
  const normalizeName = (name) =>
    String(name || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss");

  // Funktion zum Hinzufügen eines Preises zum Katalog
  const addPrice = (rawName, price, number = null) => {
    const cleanedName = normalizeName(rawName);
    if (number) {
      priceCatalog.numbered[String(number)] = price;
    }
    priceCatalog.named[cleanedName] = price;
  };

  // --- Weinkarte ---
  addPrice("Grauburgunder", "4,80 €");
  addPrice("Riesling (enthält Sulfite)", "4,80 €");
  addPrice("Montepulciano d’Abruzzo", "4,80 €"); // Korrigiert von 4,60 €
  addPrice("Merlot (enthält Sulfite)", "4,80 €"); // Korrigiert von 4,60 €
  addPrice("Weißweinschorle (enthält Sulfite)", "4,00 €");

  // --- Dönergerichte ---
  addPrice("Iskender Kebap", "12,90 €", 91);
  addPrice("Döner mit Reis und Joghurt", "12,90 €", 92);
  addPrice("Fleischteller (Döner, Lammspieß, Köfte)", "15,90 €", 93);

  // --- Beilagen ---
  addPrice("Reis", "2,50 €", 74);
  addPrice("Bulgur", "2,50 €", 75);
  addPrice("Beilagensalat", "3,50 €", 76);

  // --- Für Kinder ---
  addPrice("Falafel mit Sauce und Salat", "7,50 €", 84);
  addPrice("Spieß mit Salat und Reis", "8,50 €", 85);
  addPrice("Köfte mit Salat und Reis", "8,50 €", 86);

  // --- Dessert ---
  addPrice("Baklava (3 Stück, mit Sahne, Zimt und Walnuss)", "5,50 €", 87); // Korrigiert von 4,20 €

  // --- Kalte Vorspeisen ---
  addPrice("Portion Oliven", "4,90 €", 1);
  addPrice("Portion Peperoni", "4,90 €", 2);
  addPrice("Cacık (Knoblauch, Gurken, Joghurt)", "5,50 €", 3);
  addPrice("Spinat Ezme", "4,90 €", 4);
  addPrice("Sigara Böreği", "8,90 €", 5);
  addPrice("Havuç Ezme", "5,00 €", 6);
  addPrice("Muhammara", "5,90 €", 7);
  addPrice("Haydari Ezme", "5,80 €", 8);
  addPrice("Gefüllte Weinblätter", "7,60 €", 9);
  addPrice("Türkischer Teller", "9,50 €", 10);
  addPrice("Kalte Platte", "10,90 €", 11);
  addPrice("Auberginen Ezme", "5,80 €", 12);
  addPrice("Gebratenes Gemüse", "8,50 €", 13);
  addPrice("Antep-Ezme", "5,50 €", 14);
  addPrice("Humuz", "5,90 €", 15);
  addPrice("HAYAT-Vorspeisenteller", "11,90 €", 16);

  // --- Salate ---
  addPrice("Hirse-Cacık-Salat", "9,50 €", 20);
  addPrice("HAYAT-Salat (mit Thunfisch)", "9,50 €", 21);
  addPrice("Hirtensalat", "9,50 €", 22);
  addPrice("Gemischter Salat mit Hirtenkäse", "9,50 €", 24);
  addPrice("Hindili Salat (mit Putenfleisch)", "10,50 €", 28);
  addPrice("Tomaten-Joghurt-Salat", "8,50 €", 29);

  // --- Warme Vorspeisen ---
  addPrice("Überbackene Champignons", "8,90 €", 30);
  addPrice("Überbackener Hirtenkäse", "8,90 €", 33);
  addPrice("Linsensuppe", "6,00 €", 83);
  addPrice("Extra-Portion Brot", "1,50 €");

  // --- Aus der Pfanne ---
  addPrice("Zucchinipuffer", "11,50 €", 36);
  addPrice("Humuz-Spinat-Köfte (veg.)", "11,50 €", 37);
  addPrice("Teigtaschen mit Gemüse", "11,90 €", 38);
  addPrice("Falafel mit Sauce und Salat", "11,50 €", 43);
  addPrice("Putencurry", "13,50 €", 44);
  addPrice("Tirit mit Salat", "13,80 €", 46);
  addPrice("Arnavut Cigeri (gebratene Leber)", "12,50 €", 47);
  addPrice("Gemüsepfanne", "10,50 €", 48);
  addPrice("Gemüsepfanne mit Putenfleisch", "13,50 €", 49);
  addPrice("Pfannkuchen mit Hackfleischfüllung", "11,50 €", 78);

  // --- Aus dem Ofen ---
  addPrice("Spinatauflauf mit Kartoffeln & Käse", "10,50 €", 50);
  addPrice("Spinatauflauf mit Bulgur & Hirtenkäse", "10,50 €", 51);
  addPrice("Brokkoliauflauf", "10,50 €", 52);
  addPrice("Auberginenauflauf", "10,50 €", 53);
  addPrice("Nudelauflauf", "10,50 €", 55);
  addPrice("Gemüseauflauf", "10,50 €", 56);
  addPrice("Fleischzuschlag Auflauf", "2,50 €");

  // --- Vom Grill ---
  addPrice("Türkische Wurst mit Paprika & Salat", "11,90 €", 57);
  addPrice("Şiş mit Lammfleisch", "13,90 €", 59);
  addPrice("Hähnchenspieß", "13,50 €", 60);
  addPrice("Köfte", "13,50 €", 62);
  addPrice("Köfte mit Hirtenkäsefüllung", "14,90 €", 63);
  addPrice("Adana Şiş", "13,50 €", 64);
  addPrice("Adana Şiş mit Joghurtsauce", "14,00 €", 65);
  addPrice("Tomaten-Kebab", "14,50 €", 66);
  addPrice("Pirzola (Lammkoteletts)", "16,90 €", 67);
  addPrice("Fleischplatte", "16,90 €", 68);
  addPrice("HAYAT-Grillteller", "17,90 €", 69);

  // --- Biere ---
  addPrice("Früh Kölsch (0,3l)", "3,00 €");
  addPrice("Früh Kölsch (0,5l)", "5,00 €");
  addPrice("Schlösser Alt (0,3l)", "3,00 €");
  addPrice("Schlösser Alt (0,5l)", "5,00 €");
  addPrice("Jever Pils (0,3l)", "3,00 €");
  addPrice("Jever Pils (0,5l)", "5,00 €");
  addPrice("Brinkhoffs Nr. 1 (0,3l)", "3,00 €");
  addPrice("Brinkhoffs Nr. 1 (0,5l)", "5,00 €");
  addPrice("Jever Fun (alkoholfrei) (0,3l)", "3,00 €");
  addPrice("Jever Fun (alkoholfrei) (0,5l)", "5,00 €");
  addPrice("Malz (0,3l)", "3,00 €");
  addPrice("Malz (0,5l)", "5,00 €");
  addPrice("Hefeweizen", "5,00 €");
  addPrice("Weizen, alkoholfrei", "5,00 €");

  // --- Alkoholfreie Getränke ---
  addPrice("Fanta / Cola / Sprite (klein)", "3,00 €");
  addPrice("Fanta / Cola / Sprite (groß)", "4,50 €");
  addPrice("Selters Mineralwasser (0,25l)", "2,80 €");
  addPrice("Selters Mineralwasser (0,75l)", "5,00 €");
  addPrice("Tonic, Bitter Lemon", "3,50 €");
  addPrice("Säfte / Saftschorle (klein)", "3,50 €");
  addPrice("Säfte / Saftschorle (groß)", "5,00 €");
  addPrice("Bionade (0,33l)", "4,00 €");
  addPrice("Fassbrause (0,33l)", "4,00 €");

  // --- Warme Getränke ---
  addPrice("Kaffee", "2,80 €");
  addPrice("Espresso", "2,00 €");
  addPrice("Doppelter Espresso", "3,50 €");
  addPrice("Milchkaffee", "3,20 €");
  addPrice("Cappuccino", "3,20 €");
  addPrice("Türkischer Tee (klein)", "1,50 €"); // Korrigiert von 1,20 €
  addPrice("Frische Minze", "3,00 €"); // Korrigiert von 3,20 €
  addPrice("Tee, verschiedene Sorten", "2,50 €");
  addPrice("Heiße Zitrone", "3,00 €");

  // --- Spirituosen ---
  const spirits = [
    "Ouzo", "Rum", "103", "Veterano", "Grappa", "Wodka", "Baileys",
    "Averna", "Sambuca", "Café Oriental", "Fernet Branca", "Ramazotti", "Jägermeister"
  ];
  spirits.forEach(spirit => addPrice(spirit, "3,00 €"));

  window.PRICE_CATALOG = priceCatalog;
})();