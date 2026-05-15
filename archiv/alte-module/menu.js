import { menuData } from './menu-data.js';
import { priceCatalog } from './prices.js';

const normalizePriceName = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

const getCatalogPrice = (itemName) => {
  const name = String(itemName || "");
  const numberMatch = name.match(/^(\d+)\b/);
  if (numberMatch) {
    return priceCatalog.numbered[numberMatch[1]] || "";
  }
  return priceCatalog.named[normalizePriceName(name)] || "";
};

const applyCatalogPricesToMenu = () => {
  menuData.forEach((category) => {
    (category.sections || []).forEach((section) => {
      (section.items || []).forEach((item) => {
        const mappedPrice = getCatalogPrice(item.name);
        if (mappedPrice) {
          item.price = mappedPrice;
        }
      });
    });
  });
};

const applyCatalogPricesToHighlights = () => {
  const standalonePriceNodes = document.querySelectorAll("[data-price-number], [data-price-name]");
  standalonePriceNodes.forEach((node) => {
    const numberKey = node.getAttribute("data-price-number");
    const nameKey = node.getAttribute("data-price-name");
    let mappedPrice = "";

    if (numberKey) {
      mappedPrice = priceCatalog.numbered[numberKey] || "";
    } else if (nameKey) {
      mappedPrice = priceCatalog.named[normalizePriceName(nameKey)] || "";
    }

    if (mappedPrice) {
      node.textContent = mappedPrice;
    }
  });
};

export function initMenu() {
  applyCatalogPricesToMenu();
  applyCatalogPricesToHighlights();

  const categoryList = document.querySelector(".menu-categories");
  const menuContent = document.getElementById("menu-panel");
  const menuPrev = document.getElementById("menu-prev");
  const menuNext = document.getElementById("menu-next");
  const menuPageIndicator = document.getElementById("menu-page-indicator");

  if (!categoryList || !menuContent || !menuPrev || !menuNext || !menuPageIndicator || menuData.length === 0) {
    return;
  }

  let activeCategoryId = menuData[0].id;
  let currentSpreadIndex = 0;
  const buttons = [];
  const categoryPageStartMap = new Map();
  const pagedCategories = [];

  const renderMenuSection = (section) => {
    const itemsHtml = (section.items || [])
      .map((item) => {
        const priceHtml = item.price
          ? `<span class="menu-item-price">${item.price}</span>`
          : "";
        const descriptionHtml = item.description
          ? `<p class="menu-item-description">${item.description}</p>`
          : "";
        return `
          <li class="menu-item">
            <div class="menu-item-header">
              <span class="menu-item-name">${item.name}</span>
              ${priceHtml}
            </div>
            ${descriptionHtml}
          </li>
        `;
      })
      .join("");

    const sectionTitle = section.title ? `<h4>${section.title}</h4>` : "";
    const sectionNote = section.note ? `<p class="menu-note">${section.note}</p>` : "";

    return `
      <div class="menu-section">
        ${sectionTitle}
        <ul class="menu-items">
          ${itemsHtml}
        </ul>
        ${sectionNote}
      </div>
    `;
  };

  const LONG_CATEGORY_IDS = new Set(["vorspeisen", "biere", "softdrinks", "warme-getraenke", "spirituosen", "weinkarte"]);
  const MAX_ITEMS_PER_LONG_PAGE = 10;

  const splitCategoryIntoPages = (category) => {
    const sections = Array.isArray(category.sections) ? category.sections : [];
    const totalItems = sections.reduce((sum, section) => sum + ((section.items || []).length || 0), 0);

    if (!LONG_CATEGORY_IDS.has(category.id)) {
      return [{
        ...category,
        continuation: false,
        pageNumber: 1,
        pageCount: 1
      }];
    }

    const pages = [];
    let currentSections = [];
    let currentItemCount = 0;

    const pushPage = () => {
      if (!currentSections.length) {
        return;
      }

      pages.push({
        id: category.id,
        title: category.title,
        description: pages.length === 0 ? category.description : "",
        continuation: pages.length > 0,
        pageNumber: pages.length + 1,
        pageCount: 0,
        sections: currentSections
      });

      currentSections = [];
      currentItemCount = 0;
    };

    sections.forEach((section) => {
      const items = Array.isArray(section.items) ? section.items : [];

      if (!items.length) {
        currentSections.push(section);
        return;
      }

      let itemIndex = 0;
      while (itemIndex < items.length) {
        const remainingSlots = Math.max(1, MAX_ITEMS_PER_LONG_PAGE - currentItemCount);
        const chunkItems = items.slice(itemIndex, itemIndex + remainingSlots);
        const isChunkEnd = itemIndex + chunkItems.length >= items.length;

        currentSections.push({
          ...section,
          note: isChunkEnd ? section.note : "",
          items: chunkItems
        });

        currentItemCount += chunkItems.length;
        itemIndex += chunkItems.length;

        if (currentItemCount >= MAX_ITEMS_PER_LONG_PAGE) {
          pushPage();
        }
      }
    });

    pushPage();

    return pages.map((page, index) => ({
      ...page,
      pageNumber: index + 1,
      pageCount: pages.length
    }));
  };

  menuData.forEach((category) => {
    categoryPageStartMap.set(category.id, pagedCategories.length);
    pagedCategories.push(...splitCategoryIntoPages(category));
  });

  const spreads = [];
  for (let index = 0; index < pagedCategories.length; index += 2) {
    spreads.push(pagedCategories.slice(index, index + 2));
  }

  const renderBookPage = (category, side) => {
    if (!category) {
      return `<article class="menu-book-page menu-book-page-${side} is-empty" aria-hidden="true"></article>`;
    }

    const totalItems = (category.sections || []).reduce(
      (sum, section) => sum + ((section.items || []).length || 0),
      0
    );
    const isDenseCategory = totalItems >= 10 || LONG_CATEGORY_IDS.has(category.id);
    const sectionsHtml = (category.sections || [])
      .map((section) => renderMenuSection(section))
      .join("");
    const descriptionHtml = category.description
      ? `<p class="menu-category-description">${category.description}</p>`
      : "";

    return `
      <article class="menu-book-page menu-book-page-${side} ${isDenseCategory ? "menu-book-page-dense" : ""}" data-category-page="${category.id}">
        <div class="menu-content-header">
          <p class="menu-book-page-label">${side === "left" ? "Linke Seite" : "Rechte Seite"}</p>
          <h3>${category.title}</h3>
          ${category.continuation ? `<p class="menu-book-page-meta">Fortsetzung · Seite ${category.pageNumber} von ${category.pageCount}</p>` : category.pageCount > 1 ? `<p class="menu-book-page-meta">Seite ${category.pageNumber} von ${category.pageCount}</p>` : ""}
          ${descriptionHtml}
        </div>
        ${sectionsHtml}
      </article>
    `;
  };

  const renderSpread = (spreadIndex) => {
    const spread = spreads[spreadIndex];
    if (!spread) return;

    const [leftCategory, rightCategory] = spread;
    const visibleCategoryIds = new Set(spread.map((entry) => entry && entry.id).filter(Boolean));

    requestAnimationFrame(() => {
      buttons.forEach((btn) => {
        const isVisible = visibleCategoryIds.has(btn.dataset.category);
        const isActive = btn.dataset.category === activeCategoryId;
        btn.classList.toggle("is-visible", isVisible);
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
        if (isActive) {
          menuContent.setAttribute("aria-labelledby", btn.id);
        }
      });

      menuContent.innerHTML = `
        <div class="menu-book-spread">
          ${renderBookPage(leftCategory, "left")}
          ${renderBookPage(rightCategory, "right")}
        </div>
      `;

      menuPageIndicator.textContent = `Speisekarte · Seite ${spreadIndex + 1} von ${spreads.length}`;
      menuPrev.disabled = spreadIndex === 0;
      menuNext.disabled = spreadIndex === spreads.length - 1;

      requestAnimationFrame(() => {
        menuContent.scrollTop = 0;
      });
    });
  };

  const setActiveCategory = (categoryId) => {
    const category = menuData.find((entry) => entry.id === categoryId);
    if (!category) return;
    activeCategoryId = categoryId;
    const matchingPageIndex = categoryPageStartMap.get(categoryId) ?? 0;
    currentSpreadIndex = Math.floor(matchingPageIndex / 2);
    renderSpread(currentSpreadIndex);
  };

  const fragment = document.createDocumentFragment();
  menuData.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-category-button";
    button.dataset.category = category.id;
    button.id = `menu-tab-${category.id}`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.setAttribute("tabindex", index === 0 ? "0" : "-1");
    button.textContent = category.title;
    button.addEventListener("click", () => setActiveCategory(category.id));
    fragment.appendChild(button);
    buttons.push(button);
  });
  categoryList.appendChild(fragment);

  requestAnimationFrame(() => setActiveCategory(activeCategoryId));

  menuPrev.addEventListener("click", () => {
    if (currentSpreadIndex <= 0) return;
    currentSpreadIndex -= 1;
    activeCategoryId = spreads[currentSpreadIndex][0].id;
    renderSpread(currentSpreadIndex);
  });

  menuNext.addEventListener("click", () => {
    if (currentSpreadIndex >= spreads.length - 1) return;
    currentSpreadIndex += 1;
    activeCategoryId = spreads[currentSpreadIndex][0].id;
    renderSpread(currentSpreadIndex);
  });
}