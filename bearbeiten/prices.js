// BEARBEITEN: Zentrale Preisliste fuer die Website.
// Alle Preise sollten nur hier gepflegt werden, um Konsistenz zu gewährleisten.
// Die Website liest die Preise aus diesem Katalog und wendet sie auf das Menü und Highlights an.
// Stand: Speisekarte September 2026.
// Gerichte mit Nummer werden ueber die Nummer zugeordnet, alle anderen ueber den
// Namen - der Name muss dann genau so geschrieben sein wie in menu-data.js.

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

  // --- Kalte Vorspeisen ---
  addPrice("Portion Oliven", "4,90 €", 1);
  addPrice("Portion Peperoni", "4,90 €", 2);
  addPrice("Cacık", "5,80 €", 3);
  addPrice("Spinat Ezme", "5,50 €", 4);
  addPrice("Sigara Börek", "10,80 €", 5);
  addPrice("Havuç Ezme", "5,50 €", 6);
  addPrice("Muhammara", "5,90 €", 7);
  addPrice("Haydari", "5,90 €", 8);
  addPrice("Gefüllte Weinblätter", "8,50 €", 9);
  addPrice("Türkischer Teller", "10,50 €", 10);
  addPrice("Kalte Platte", "11,50 €", 11);
  addPrice("Auberginen Ezme", "5,80 €", 12);
  addPrice("Gebratenes Gemüse", "8,50 €", 13);
  addPrice("Antep Ezme", "5,50 €", 14);
  addPrice("Hummus", "5,90 €", 15);
  addPrice("HAYAT-Vorspeisenteller", "11,90 €", 16);

  // --- Salate ---
  addPrice("Hirse-Cacık-Salat", "9,80 €", 20);
  addPrice("HAYAT-Salat", "9,80 €", 21);
  addPrice("Hirtensalat", "9,50 €", 22);
  addPrice("Gemischter Salat mit Hirtenkäse", "9,50 €", 24);
  addPrice("Hindili Salat", "10,80 €", 28);
  addPrice("Tomaten-Joghurt-Salat", "9,50 €", 29);

  // --- Warme Vorspeisen ---
  addPrice("Überbackene Champignons", "9,50 €", 30);
  addPrice("Überbackener Hirtenkäse", "9,50 €", 33);
  addPrice("Linsensuppe", "6,50 €", 83);
  addPrice("Extra-Portion Brot", "1,00 €");

  // --- Aus der Pfanne ---
  addPrice("Zucchinipuffer", "11,90 €", 36);
  addPrice("Humus-Spinat-Köfte", "11,90 €", 37);
  addPrice("Teigtaschen mit Gemüse", "12,50 €", 38);
  addPrice("Falafel", "11,90 €", 43);
  addPrice("Putencurry", "13,90 €", 44);
  addPrice("Tirit mit Salat", "14,00 €", 46);
  addPrice("Arnavut Ciğeri", "12,90 €", 47);
  addPrice("Gemüsepfanne", "11,50 €", 48);
  addPrice("Gemüsepfanne mit Putenfleisch", "13,50 €", 49);
  addPrice("Pfannkuchen gefüllt mit Hackfleisch", "11,90 €", 78);

  // --- Aus dem Ofen ---
  addPrice("Spinatauflauf mit Kartoffeln und Käse", "10,90 €", 50);
  addPrice("Spinatauflauf mit Bulgur und Hirtenkäse", "10,90 €", 51);
  addPrice("Brokkoliauflauf mit Kartoffeln", "10,90 €", 52);
  addPrice("Auberginenauflauf mit Kartoffeln", "10,90 €", 53);
  addPrice("Nudelauflauf", "10,90 €", 55);
  addPrice("Gemüseauflauf", "10,90 €", 56);
  addPrice("Fleischzuschlag Auflauf", "2,50 €");

  // --- Vom Grill ---
  addPrice("Gegrillte türkische Wurst mit Paprika", "12,50 €", 57);
  addPrice("Şiş mit Lammfleisch", "14,50 €", 59);
  addPrice("Hähnchenspieße", "14,00 €", 60);
  addPrice("Köfte", "14,00 €", 62);
  addPrice("Köfte gefüllt mit Hirtenkäse", "14,90 €", 63);
  addPrice("Adana Şiş", "14,00 €", 64);
  addPrice("Adana Şiş mit Joghurtsauce", "14,50 €", 65);
  addPrice("Tomaten-Kebab", "14,90 €", 66);
  addPrice("Pirzola", "16,90 €", 67);
  addPrice("Fleischplatte", "16,90 €", 68);
  addPrice("HAYAT-Grillteller", "17,90 €", 69);

  // --- Dönergerichte ---
  addPrice("Iskender Kebap", "12,90 €", 91);
  addPrice("Döner auf Reis", "12,90 €", 92);
  addPrice("Fleischteller", "16,50 €", 93);

  // --- Beilagen ---
  addPrice("Reis", "2,50 €", 74);
  addPrice("Bulgur", "2,50 €", 75);
  addPrice("Beilagensalat", "3,00 €", 76);
  addPrice("Beilagenteller", "3,50 €", 77);

  // --- Für Kinder ---
  addPrice("Falafel (Kinder)", "7,50 €", 84);
  addPrice("Hähnchenspieß (Kinder)", "8,50 €", 85);
  addPrice("Kinderköfte", "8,50 €", 86);

  // --- Dessert ---
  addPrice("Baklava", "5,50 €", 87);
  // 88 Wechselnde Nachspeise: kein Preis (auf Nachfrage)

  // --- Biere (0,3 l / 0,5 l) ---
  addPrice("Früh Kölsch", "3,00 € / 5,00 €");
  addPrice("Schlösser Alt", "3,00 € / 5,00 €");
  addPrice("Jever Pils", "3,00 € / 5,00 €");
  addPrice("Brinkhoffs Nr. 1", "3,00 € / 5,00 €");
  addPrice("Malz", "3,00 € / 5,00 €");
  addPrice("Hefeweizen (0,5 l)", "5,00 €");
  addPrice("Jever Fun alkoholfrei (&lt;0,5 % vol.)", "3,00 € / 5,00 €");
  addPrice("Hefeweizen alkoholfrei (0,0 %, 0,5 l)", "5,00 €");

  // --- Alkoholfreie Getränke (0,3 l / 0,5 l) ---
  addPrice("Cola, Cola Zero, Cola Light, Fanta, Sprite", "3,20 € / 4,90 €");
  addPrice("Säfte", "3,50 € / 5,00 €");
  addPrice("Saftschorle", "3,00 € / 4,50 €");
  addPrice("Bionade (Flasche 0,33 l)", "4,00 €");
  addPrice("Fassbrause (Flasche 0,33 l)", "4,00 €");
  addPrice("Tonic (0,2 l)", "3,50 €");
  addPrice("Bitter Lemon (0,2 l)", "3,50 €");
  addPrice("Selters Mineralwasser (0,25 l / 0,75 l)", "2,80 € / 5,00 €");

  // --- Warme Getränke ---
  addPrice("Kaffee", "3,00 €");
  addPrice("Espresso", "2,50 €");
  addPrice("Doppelter Espresso", "3,50 €");
  addPrice("Milchkaffee", "3,50 €");
  addPrice("Cappuccino", "3,50 €");
  addPrice("Türkischer Tee (klein)", "1,50 €");
  addPrice("Frische Minze", "3,00 €");
  addPrice("Tee, verschiedene Sorten", "2,50 €");
  addPrice("Heiße Zitrone", "3,00 €");

  // --- Spirituosen (2 cl) ---
  const spirits = [
    "Ouzo", "Rum", "103", "Veterano", "Grappa", "Wodka", "Baileys",
    "Averna", "Sambuca", "Café Oriental", "Fernet Branca", "Jägermeister"
  ];
  spirits.forEach(spirit => addPrice(spirit, "3,00 €"));
  // "103" beginnt mit einer Zahl und wird deshalb wie eine Gerichtsnummer nachgeschlagen.
  addPrice("103", "3,00 €", 103);

  // --- Weinkarte (0,1 l / 0,2 l) ---
  addPrice("Grauburgunder", "2,50 € / 4,90 €");
  addPrice("Riesling (enthält Sulfite)", "2,50 € / 4,90 €");
  addPrice("Merlot (enthält Sulfite)", "2,50 € / 4,90 €");
  addPrice("Montepulciano d'Abruzzo", "2,50 € / 4,90 €");
  addPrice("Weißweinschorle (enthält Sulfite)", "4,00 €");

  window.PRICE_CATALOG = priceCatalog;
})();
