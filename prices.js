// Zentrale Preisliste fuer alle Gerichte und Getraenke.
// Preise nur hier aendern - die Website uebernimmt sie automatisch.

(function () {
  const normalizeName = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  // Nummerierte Gerichte: Nr., Name und Preis in einer Zeile.
  // Beispiel: Nr. 69 - HAYAT-Grillteller
  const numberedItems = [
    { number: "1", name: "Portion Oliven", price: "4,90 €" },
    { number: "2", name: "Portion Peperoni", price: "4,90 €" },
    { number: "3", name: "Cacık (Knoblauch, Gurken, Joghurt)", price: "5,50 €" },
    { number: "4", name: "Spinat Ezme", price: "4,90 €" },
    { number: "5", name: "Sigara Böreği", price: "8,90 €" },
    { number: "6", name: "Havuç Ezme", price: "5,00 €" },
    { number: "7", name: "Muhammara", price: "5,80 €" },
    { number: "8", name: "Haydari Ezme", price: "5,00 €" },
    { number: "9", name: "Gefüllte Weinblätter", price: "8,50 €" },
    { number: "10", name: "Türkischer Teller", price: "9,00 €" },
    { number: "11", name: "Kalte Platte", price: "10,00 €" },
    { number: "12", name: "Auberginen Ezme", price: "5,80 €" },
    { number: "13", name: "Gebratenes Gemüse", price: "8,50 €" },
    { number: "14", name: "Antep-Ezme", price: "5,00 €" },
    { number: "15", name: "Humuz", price: "5,80 €" },
    { number: "16", name: "HAYAT-Vorspeisenteller", price: "11,80 €" },
    { number: "30", name: "Überbackene Champignons", price: "8,90 €" },
    { number: "33", name: "Überbackener Hirtenkäse", price: "8,90 €" },
    { number: "83", name: "Linsensuppe", price: "6,00 €" },
    { number: "20", name: "Hirse-Cacık-Salat", price: "9,50 €" },
    { number: "21", name: "HAYAT-Salat (mit Thunfisch)", price: "9,50 €" },
    { number: "22", name: "Hirtensalat", price: "9,50 €" },
    { number: "24", name: "Gemischter Salat mit Hirtenkäse", price: "9,50 €" },
    { number: "28", name: "Hindili Salat (mit Putenfleisch)", price: "10,50 €" },
    { number: "29", name: "Tomaten-Joghurt-Salat", price: "8,50 €" },
    { number: "91", name: "Iskender Kebap", price: "12,80 €" },
    { number: "92", name: "Döner mit Reis und Joghurt", price: "12,80 €" },
    { number: "93", name: "Fleischteller (Döner, Lamms pieß, Köfte)", price: "16,00 €" },
    { number: "36", name: "Zucchinipuffer", price: "11,50 €" },
    { number: "37", name: "Humuz-Spinat-Köfte (veg.)", price: "11,50 €" },
    { number: "38", name: "Teigtaschen mit Gemüse", price: "11,50 €" },
    { number: "43", name: "Falafel mit Sauce und Salat", price: "11,50 €" },
    { number: "44", name: "Putencurry", price: "13,50 €" },
    { number: "46", name: "Tirit mit Salat", price: "13,80 €" },
    { number: "47", name: "Arnavut Cigeri (gebratene Leber)", price: "12,50 €" },
    { number: "48", name: "Gemüsepfanne", price: "10,00 €" },
    { number: "49", name: "Gemüsepfanne mit Putenfleisch", price: "13,50 €" },
    { number: "78", name: "Pfannkuchen mit Hackfleischfüllung", price: "11,50 €" },
    { number: "50", name: "Spinatauflauf mit Kartoffeln &amp; Käse", price: "10,50 €" },
    { number: "51", name: "Spinatauflauf mit Bulgur &amp; Hirtenkäse", price: "10,50 €" },
    { number: "52", name: "Brokkoliauflauf", price: "10,50 €" },
    { number: "53", name: "Auberginenauflauf", price: "10,50 €" },
    { number: "55", name: "Nudelauflauf", price: "10,50 €" },
    { number: "56", name: "Gemüseauflauf", price: "10,50 €" },
    { number: "57", name: "Türkische Wurst mit Paprika &amp; Salat", price: "12,00 €" },
    { number: "59", name: "Şiş mit Lammfleisch", price: "14,00 €" },
    { number: "60", name: "Hähnchenspieß", price: "13,50 €" },
    { number: "62", name: "Köfte", price: "13,50 €" },
    { number: "63", name: "Köfte mit Hirtenkäsefüllung", price: "15,00 €" },
    { number: "64", name: "Adana Şiş", price: "13,00 €" },
    { number: "65", name: "Adana Şiş mit Joghurtsauce", price: "14,00 €" },
    { number: "66", name: "Tomaten-Kebab", price: "14,50 €" },
    { number: "67", name: "Pirzola (Lammkoteletts)", price: "17,00 €" },
    { number: "68", name: "Fleischplatte", price: "16,50 €" },
    { number: "69", name: "HAYAT-Grillteller", price: "17,90 €" },
    { number: "74", name: "Reis", price: "2,50 €" },
    { number: "75", name: "Bulgur", price: "2,50 €" },
    { number: "76", name: "Beilagensalat", price: "3,50 €" },
    { number: "84", name: "Falafel mit Sauce und Salat", price: "7,50 €" },
    { number: "85", name: "Spieß mit Salat und Reis", price: "8,50 €" },
    { number: "86", name: "Köfte mit Salat und Reis", price: "8,50 €" },
    { number: "87", name: "Baklava (3 Stück, mit Sahne, Zimt und Walnuss)", price: "4,20 €" },
    { number: "103", name: "103", price: "3,00 €" },
  ];

  // Nicht nummerierte Positionen (z. B. Getraenke).
  const namedItems = [
    { name: "Früh Kölsch", price: "3,00 € / 5,00 €" },
    { name: "Schlösser Alt", price: "3,00 € / 5,00 €" },
    { name: "Jever Pils", price: "3,00 € / 5,00 €" },
    { name: "Brinkhoffs Nr. 1", price: "3,00 € / 5,00 €" },
    { name: "Jever Fun (alkoholfrei)", price: "3,00 € / 5,00 €" },
    { name: "Malz", price: "3,00 € / 5,00 €" },
    { name: "Hefeweizen", price: "5,00 €" },
    { name: "Weizen, alkoholfrei", price: "5,00 €" },
    { name: "Fanta / Cola / Sprite", price: "3,00 € / 4,50 €" },
    { name: "Selters Mineralwasser (0,25l / 0,75l)", price: "2,80 € / 5,00 €" },
    { name: "Tonic, Bitter Lemon", price: "3,50 €" },
    { name: "Säfte / Saftschorle", price: "3,50 € / 5,00 €" },
    { name: "Bionade (0,33l)", price: "4,00 €" },
    { name: "Fassbrause (0,33l)", price: "4,00 €" },
    { name: "Kaffee", price: "2,80 €" },
    { name: "Espresso", price: "2,00 €" },
    { name: "Doppelter Espresso", price: "3,50 €" },
    { name: "Milchkaffee", price: "3,20 €" },
    { name: "Cappuccino", price: "3,20 €" },
    { name: "Türkischer Tee (klein)", price: "1,50 €" },
    { name: "Frische Minze", price: "3,00 €" },
    { name: "Tee, verschiedene Sorten", price: "2,50 €" },
    { name: "Heiße Zitrone", price: "3,00 €" },
    { name: "Ouzo", price: "3,00 €" },
    { name: "Rum", price: "3,00 €" },
    { name: "Veterano", price: "3,00 €" },
    { name: "Grappa", price: "3,00 €" },
    { name: "Wodka", price: "3,00 €" },
    { name: "Baileys", price: "3,00 €" },
    { name: "Averna", price: "3,00 €" },
    { name: "Sambuca", price: "3,00 €" },
    { name: "Café Oriental", price: "3,00 €" },
    { name: "Fernet Branca", price: "3,00 €" },
    { name: "Ramazotti", price: "3,00 €" },
    { name: "Jägermeister", price: "3,00 €" },
    { name: "Grauburgunder", price: "4,80 €" },
    { name: "Riesling (enthält Sulfite)", price: "4,80 €" },
    { name: "Montepulciano d'Abruzzo", price: "4,60 €" },
    { name: "Merlot (enthält Sulfite)", price: "4,60 €" },
    { name: "Weißweinschorle (enthält Sulfite)", price: "4,00 €" },
  ];

  // Lesbare Liste fuer Bearbeitung.
  window.PRICE_LIST = {
    numbered: numberedItems,
    named: namedItems
  };

  // Technischer Lookup fuer die bestehende Preislogik in index.html.
  window.PRICE_CATALOG = {
    numbered: Object.fromEntries(numberedItems.map((item) => [String(item.number), item.price])),
    named: Object.fromEntries(namedItems.map((item) => [normalizeName(item.name), item.price]))
  };
})();
