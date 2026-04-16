// Preis-Katalog wird direkt aus MENU_DATA erzeugt.
// Preise und Namen deshalb nur in menu-data.js pflegen.

(function () {
  "use strict";

  const normalizeName = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  const menuData = Array.isArray(window.MENU_DATA) ? window.MENU_DATA : [];
  const numberedItems = [];
  const namedItems = [];

  menuData.forEach((category) => {
    (category.sections || []).forEach((section) => {
      (section.items || []).forEach((item) => {
        const name = String(item.name || "").trim();
        const price = String(item.price || "").trim();

        if (!name || !price) {
          return;
        }

        namedItems.push({ name, price });

        const numberMatch = name.match(/^(\d+)\b/);
        if (numberMatch) {
          numberedItems.push({
            number: numberMatch[1],
            name: name.replace(/^(\d+)\s*/, "").trim(),
            price
          });
        }
      });
    });
  });

  window.PRICE_LIST = {
    numbered: numberedItems,
    named: namedItems
  };

  window.PRICE_CATALOG = {
    numbered: Object.fromEntries(numberedItems.map((item) => [item.number, item.price])),
    named: Object.fromEntries(namedItems.map((item) => [normalizeName(item.name), item.price]))
  };
})();
