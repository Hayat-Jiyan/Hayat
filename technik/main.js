(function () {
  "use strict";

  const menuData = Array.isArray(window.MENU_DATA) ? window.MENU_DATA : [];
  const priceCatalog = window.PRICE_CATALOG || { numbered: {}, named: {} };
  const siteNews = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS : [];

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

  const renderManualReviews = () => {
    const reviewsSection = document.getElementById("reviews");
    const reviewsGrid = document.getElementById("reviews-grid");
    const reviewsMeta = document.getElementById("reviews-meta");
    const reviewsGoogleLink = document.getElementById("reviews-google-link");

    if (!reviewsSection || !reviewsGrid) {
      return;
    }

    const data = window.SITE_REVIEWS || {};
    const items = Array.isArray(data.items)
      ? data.items.filter((item) => item && String(item.text || "").trim())
      : [];

    if (reviewsGoogleLink && typeof data.googleMapsUrl === "string" && data.googleMapsUrl.trim()) {
      reviewsGoogleLink.href = data.googleMapsUrl.trim();
    }

    if (!items.length) {
      reviewsSection.hidden = true;
      return;
    }

    if (reviewsMeta) {
      reviewsMeta.textContent = "Ausgewählte Stimmen von unseren Gästen.";
    }

    reviewsGrid.textContent = "";
    const fragment = document.createDocumentFragment();
    items.slice(0, 3).forEach((item) => {
      const ratingValue = Math.max(0, Math.min(5, Number(item.rating) || 0));
      const filledStars = Math.round(ratingValue);
      const stars = "★".repeat(filledStars) + "☆".repeat(5 - filledStars);
      const author = String(item.author || "Gast").trim();
      const date = String(item.date || "").trim();

      const card = document.createElement("article");
      card.className = "review-card";

      const starsEl = document.createElement("p");
      starsEl.className = "review-stars";
      starsEl.setAttribute("aria-label", `${ratingValue.toFixed(1)} von 5 Sternen`);
      starsEl.textContent = stars;
      card.appendChild(starsEl);

      const textWrap = document.createElement("div");
      textWrap.className = "review-text-wrap";

      const textEl = document.createElement("p");
      textEl.className = "review-text";
      textEl.textContent = `“${String(item.text).trim()}”`;
      textWrap.appendChild(textEl);
      card.appendChild(textWrap);

      const toggleEl = document.createElement("button");
      toggleEl.type = "button";
      toggleEl.className = "review-toggle";
      toggleEl.textContent = "Mehr ansehen";
      toggleEl.hidden = true;
      toggleEl.setAttribute("aria-expanded", "false");
      card.appendChild(toggleEl);

      const metaEl = document.createElement("p");
      metaEl.className = "review-meta";
      metaEl.textContent = date ? `${author} • ${date}` : author;
      card.appendChild(metaEl);

      fragment.appendChild(card);
    });

    reviewsGrid.appendChild(fragment);

    const updateReviewExpandState = () => {
      reviewsGrid.querySelectorAll(".review-card").forEach((card) => {
        const textWrap = card.querySelector(".review-text-wrap");
        const toggleEl = card.querySelector(".review-toggle");

        if (!textWrap || !toggleEl) {
          return;
        }

        const wasExpanded = card.classList.contains("is-expanded");
        if (wasExpanded) {
          card.classList.remove("is-expanded");
        }

        const needsToggle = textWrap.scrollHeight > textWrap.clientHeight + 2;
        toggleEl.hidden = !needsToggle;
        card.classList.toggle("has-overflow", needsToggle);

        if (needsToggle && wasExpanded) {
          card.classList.add("is-expanded");
          toggleEl.textContent = "Weniger anzeigen";
          toggleEl.setAttribute("aria-expanded", "true");
        } else {
          toggleEl.textContent = "Mehr ansehen";
          toggleEl.setAttribute("aria-expanded", "false");
        }
      });
    };

    reviewsGrid.querySelectorAll(".review-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".review-card");
        if (!card) {
          return;
        }

        const expanded = card.classList.toggle("is-expanded");
        button.textContent = expanded ? "Weniger anzeigen" : "Mehr ansehen";
        button.setAttribute("aria-expanded", String(expanded));
      });
    });

    reviewsSection.hidden = false;
    updateReviewExpandState();

    if (window.__reviewsResizeHandler) {
      window.removeEventListener("resize", window.__reviewsResizeHandler);
    }

    let resizeTimer = 0;
    window.__reviewsResizeHandler = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateReviewExpandState, 120);
    };
    window.addEventListener("resize", window.__reviewsResizeHandler, { passive: true });

  };

  const getTodayKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isNewsVisible = (item, todayKey) => {
    const visibleFrom = String(item.visibleFrom || "").trim();
    const visibleUntil = String(item.visibleUntil || "").trim();

    if (visibleFrom && todayKey < visibleFrom) {
      return false;
    }

    if (visibleUntil && todayKey > visibleUntil) {
      return false;
    }

    return true;
  };

  const isDateInClosedRange = (dateKey, item) => {
    if (!dateKey || !item) {
      return false;
    }

    const closedDates = Array.isArray(item.closedDates) ? item.closedDates : [];
    if (closedDates.includes(dateKey)) {
      return true;
    }

    const closedFrom = String(item.closedFrom || "").trim();
    const closedUntil = String(item.closedUntil || "").trim();
    if (!closedFrom && !closedUntil) {
      return false;
    }

    if (closedFrom && dateKey < closedFrom) {
      return false;
    }

    if (closedUntil && dateKey > closedUntil) {
      return false;
    }

    return true;
  };

  const formatGermanDate = (dateKey) => {
    const parts = String(dateKey || "").split("-");
    if (parts.length !== 3) {
      return "";
    }
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  const getClosureMessage = (item) => {
    const customMessage = String(item && item.closureMessage ? item.closureMessage : "").trim();
    if (customMessage) {
      return customMessage;
    }

    if (item && (item.closedFrom || item.closedUntil)) {
      return `${item.title || "In diesem Zeitraum sind keine Reservierungen möglich."}`;
    }

    return `${item && item.title ? item.title : "An diesem Tag sind keine Reservierungen möglich."} Wir haben an diesem Tag eine geschlossene Gesellschaft.`;
  };

  const getReservationClosureForDate = (dateKey) => {
    if (!dateKey) {
      return null;
    }

    return siteNews.find((item) => isDateInClosedRange(dateKey, item)) || null;
  };

  const getActiveClosureNotices = (todayKey) => {
    return siteNews.filter((item) => {
      if (!item || (!item.closedFrom && !item.closedUntil && !Array.isArray(item.closedDates))) {
        return false;
      }
      return isNewsVisible(item, todayKey);
    });
  };

  const renderReservationClosureNotice = () => {
    let notice = document.getElementById("reservation-closure-notice");
    if (!notice) {
      const container = document.getElementById("reservation-form-container");
      if (!container) {
        return;
      }
      notice = document.createElement("p");
      notice.id = "reservation-closure-notice";
      notice.className = "reservation-closure-notice";
      notice.hidden = true;
      container.insertBefore(notice, container.firstChild);
    }

    const todayKey = getTodayKey();
    const notices = getActiveClosureNotices(todayKey).filter(
      (item) => item.closedFrom || item.closedUntil
    );

    if (!notices.length) {
      notice.hidden = true;
      notice.textContent = "";
      return;
    }

    const primary = notices[0];
    const fromLabel = formatGermanDate(primary.closedFrom);
    const untilLabel = formatGermanDate(primary.closedUntil);
    const reopenLabel = formatGermanDate(primary.reopen);
    const reopenText = reopenLabel
      ? ` Ab dem ${reopenLabel} sind wir wieder für euch da.`
      : "";
    notice.textContent = `Vom ${fromLabel} bis ${untilLabel} haben wir Betriebsurlaub. In diesem Zeitraum sind keine Reservierungen möglich.${reopenText}`;
    notice.hidden = false;
  };

  const ensureClosureModalElements = () => {
    let overlay = document.getElementById("closure-overlay");
    let modal = document.getElementById("closure-modal");
    const needsRebuild = modal && !document.getElementById("closure-image");

    if (needsRebuild) {
      overlay?.remove();
      modal.remove();
      overlay = null;
      modal = null;
    }

    if (overlay && modal) {
      return {
        overlay: overlay,
        modal: modal,
        eyebrow: document.getElementById("closure-eyebrow"),
        title: document.getElementById("closure-title"),
        text: document.getElementById("closure-text"),
        image: document.getElementById("closure-image"),
        textWrap: document.getElementById("closure-text-wrap"),
        closeBtn: document.getElementById("closure-close"),
        okBtn: document.getElementById("closure-ok")
      };
    }

    overlay = document.createElement("div");
    overlay.id = "closure-overlay";
    overlay.className = "closure-overlay";
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");

    modal = document.createElement("div");
    modal.id = "closure-modal";
    modal.className = "closure-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "closure-title");
    modal.hidden = true;
    modal.innerHTML =
      '<button type="button" id="closure-close" class="closure-close" aria-label="Schließen">×</button>' +
      '<img id="closure-image" class="closure-poster" alt="" hidden />' +
      '<div id="closure-text-wrap" class="closure-text-wrap">' +
      '<p class="closure-eyebrow" id="closure-eyebrow"></p>' +
      '<h2 id="closure-title"></h2>' +
      '<p class="closure-text" id="closure-text"></p>' +
      "</div>" +
      '<button type="button" id="closure-ok" class="primary-button">Verstanden</button>';

    const cookieOverlay = document.getElementById("cookie-consent-overlay");
    if (cookieOverlay && cookieOverlay.parentNode) {
      cookieOverlay.parentNode.insertBefore(overlay, cookieOverlay);
      cookieOverlay.parentNode.insertBefore(modal, cookieOverlay);
    } else {
      document.body.appendChild(overlay);
      document.body.appendChild(modal);
    }

    return {
      overlay: overlay,
      modal: modal,
      eyebrow: document.getElementById("closure-eyebrow"),
      title: document.getElementById("closure-title"),
      text: document.getElementById("closure-text"),
      image: document.getElementById("closure-image"),
      textWrap: document.getElementById("closure-text-wrap"),
      closeBtn: document.getElementById("closure-close"),
      okBtn: document.getElementById("closure-ok")
    };
  };

  const renderClosureModal = () => {
    const nodes = ensureClosureModalElements();
    const overlay = nodes.overlay;
    const modal = nodes.modal;
    const eyebrow = nodes.eyebrow;
    const title = nodes.title;
    const text = nodes.text;
    const image = nodes.image;
    const textWrap = nodes.textWrap;
    const closeBtn = nodes.closeBtn;
    const okBtn = nodes.okBtn;

    if (!overlay || !modal) {
      return;
    }

    const todayKey = getTodayKey();
    const modalItem = siteNews.find((item) => {
      return item && item.modal === true && isNewsVisible(item, todayKey);
    });

    if (!modalItem) {
      overlay.hidden = true;
      modal.hidden = true;
      return;
    }

    const dismissKey = `hayat_modal_dismissed_${String(modalItem.id || modalItem.title || "news").trim()}_v2`;
    const persistDismiss = modalItem.modalDismiss === "session" || modalItem.modalDismiss === "local";

    if (persistDismiss) {
      const storage = modalItem.modalDismiss === "local" ? localStorage : sessionStorage;
      try {
        if (storage.getItem(dismissKey) === "1") {
          overlay.hidden = true;
          modal.hidden = true;
          return;
        }
      } catch (error) {
        // Ignore storage failures.
      }
    }

    const imageSrc = String(modalItem.image || "").trim();
    const hasPoster = Boolean(imageSrc);

    modal.classList.toggle("closure-modal--poster", hasPoster);

    if (image) {
      if (hasPoster) {
        image.src = imageSrc;
        image.alt = String(modalItem.title || "Betriebsurlaub").trim();
        image.hidden = false;
      } else {
        image.hidden = true;
        image.removeAttribute("src");
      }
    }

    if (textWrap) {
      textWrap.hidden = hasPoster;
    }

    if (!hasPoster) {
      if (eyebrow) {
        eyebrow.textContent = String(modalItem.dateLabel || "").trim();
        eyebrow.hidden = !String(modalItem.dateLabel || "").trim();
      }
      if (title) {
        title.textContent = String(modalItem.title || "Hinweis").trim();
      }
      if (text) {
        text.textContent = String(modalItem.text || "").trim();
      }
    }

    if (okBtn) {
      okBtn.textContent = "Verstanden";
      okBtn.hidden = hasPoster;
    }

    const hideModal = () => {
      overlay.hidden = true;
      modal.hidden = true;
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("closure-open");
      if (persistDismiss) {
        const storage = modalItem.modalDismiss === "local" ? localStorage : sessionStorage;
        try {
          storage.setItem(dismissKey, "1");
        } catch (error) {
          // Ignore storage failures.
        }
      }
    };

    modal.onclick = (event) => {
      event.stopPropagation();
    };

    overlay.hidden = false;
    modal.hidden = false;
    modal.removeAttribute("hidden");
    overlay.removeAttribute("hidden");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("closure-open");

    if (closeBtn) {
      closeBtn.onclick = hideModal;
      if (hasPoster) {
        closeBtn.focus();
      }
    }
    if (okBtn && !hasPoster) {
      okBtn.onclick = hideModal;
      okBtn.focus();
    }
    overlay.onclick = hideModal;

    document.addEventListener(
      "keydown",
      function onEscape(event) {
        if (event.key === "Escape" && !modal.hidden) {
          hideModal();
          document.removeEventListener("keydown", onEscape);
        }
      }
    );
  };

  const renderSiteNews = () => {
    const newsPopup = document.getElementById("news-popup");
    const newsList = document.getElementById("news-popup-list");
    const newsClose = document.getElementById("news-popup-close");
    const newsProgress = document.getElementById("news-popup-progress");

    if (!newsPopup || !newsList) {
      return;
    }

    const todayKey = getTodayKey();
    const visibleItems = siteNews.filter((item) => {
      return (
        item &&
        (!item.modal || item.showInNews) &&
        String(item.title || "").trim() &&
        isNewsVisible(item, todayKey)
      );
    });

    if (!visibleItems.length) {
      newsPopup.hidden = true;
      newsList.textContent = "";
      return;
    }

    newsList.textContent = "";
    const fragment = document.createDocumentFragment();

    const newsCards = [];

    visibleItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "news-popup-card";
      card.style.display = "none";
      card.style.opacity = "0";
      // Startposition für den Swipe (rechts außerhalb)
      card.style.transform = "translateX(100%)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

      const meta = document.createElement("p");
      meta.className = "news-popup-meta";
      meta.textContent = String(item.dateLabel || "Aktuelles").trim();
      card.appendChild(meta);

      const title = document.createElement("h3");
      title.textContent = String(item.title).trim();
      card.appendChild(title);

      if (String(item.text || "").trim()) {
        const text = document.createElement("p");
        text.className = "news-popup-text";
        text.textContent = String(item.text).trim();
        card.appendChild(text);
      }

      newsCards.push(card);
      fragment.appendChild(card);
    });

    // Verhindert, dass die Karten während der Animation über den Rand ragen
    newsList.style.overflowX = "hidden";

    let intervalId;

    if (newsCards.length > 0) {
      newsCards[0].style.display = "block";
      newsCards[0].offsetHeight; // Reflow erzwingen, damit die Transition greift
      newsCards[0].style.opacity = "1";
      newsCards[0].style.transform = "translateX(0)";
      
      if (newsProgress) {
        newsProgress.hidden = false;
        newsProgress.classList.add("is-running");
      }
      
      let currentNewsIndex = 0;
      intervalId = setInterval(() => {
        const currentCard = newsCards[currentNewsIndex];
        
        // Aktuelle Karte nach links raus-swipen
        currentCard.style.opacity = "0";
        currentCard.style.transform = "translateX(-100%)";

        setTimeout(() => {
          currentCard.style.display = "none";
          // Karte im Hintergrund wieder nach rechts schieben
          currentCard.style.transform = "translateX(100%)";

          currentNewsIndex++;
          
          // Wenn alle Nachrichten durch sind -> schließen
          if (currentNewsIndex >= newsCards.length) {
            clearInterval(intervalId);
            newsPopup.style.transition = "opacity 0.4s ease";
            newsPopup.style.opacity = "0";
            setTimeout(() => {
              newsPopup.hidden = true;
              newsPopup.style.transition = "";
              newsPopup.style.opacity = "";
            }, 400);
            return;
          }

          const nextCard = newsCards[currentNewsIndex];

          nextCard.style.display = "block";
          nextCard.offsetHeight; // Reflow erzwingen
          
          // Nächste Karte von rechts in die Mitte swipen
          nextCard.style.opacity = "1";
          nextCard.style.transform = "translateX(0)";
        }, 600); // Wartezeit entspricht der CSS Transition-Dauer (0.6s)
      }, 15000); // Alle 15 Sekunden wechseln
    }

    newsList.appendChild(fragment);
    newsPopup.hidden = false;

    if (newsClose) {
      newsClose.addEventListener("click", () => {
        newsPopup.hidden = true;
        if (intervalId) clearInterval(intervalId);
      }, { once: true });
    }
  };

  const initQuickScrollReveal = () => {
    if (!document.body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const revealSelectors = [
      ".hero-text",
      ".hero-visual",
      "#about .about-panel",
      "#menu .section-heading",
      "#menu .menu-layout",
      "#highlights .section-heading",
      "#highlights .highlight-card",
      "#services .section-heading",
      "#services .service-card",
      "#reviews .section-heading",
      "#reviews .review-card",
      "#reviews .reviews-cta",
      "#gallery .section-heading",
      "#gallery .gallery-card",
      "#contact .visit-info",
      "#contact .map-wrapper",
      ".footer"
    ];

    const nodeSet = new Set();
    revealSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((node) => nodeSet.add(node));
    });

    const revealNodes = Array.from(nodeSet);
    if (!revealNodes.length) {
      return;
    }

    document.body.classList.add("motion-reveal-enabled");

    revealNodes.forEach((node) => {
      node.setAttribute("data-reveal", "");
    });

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    // Show above-the-fold elements immediately.
    requestAnimationFrame(() => {
      const fold = window.innerHeight * 0.9;
      revealNodes.forEach((node) => {
        if (node.getBoundingClientRect().top <= fold) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      });
    });
  };

  const initGalleryLightbox = () => {
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("gallery-lightbox-image");
    const lightboxCaption = document.getElementById("gallery-lightbox-caption");
    const lightboxClose = document.getElementById("gallery-lightbox-close");
    const triggers = Array.from(document.querySelectorAll(".gallery-trigger"));

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose || !triggers.length) {
      return;
    }

    let previousOverflow = "";
    let activeTrigger = null;

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove("has-open-lightbox");
      document.body.style.overflow = previousOverflow;
      if (activeTrigger) {
        activeTrigger.focus();
      }
      activeTrigger = null;
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const image = trigger.querySelector("img");
        const figure = trigger.closest(".gallery-card");
        const caption = figure ? figure.querySelector("figcaption") : null;

        if (!image) {
          return;
        }

        const rect = trigger.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const originX = `${Math.max(10, Math.min(90, (centerX / window.innerWidth) * 100))}%`;
        const originY = `${Math.max(12, Math.min(88, ((rect.top + rect.height / 2) / window.innerHeight) * 100))}%`;
        const shiftX = centerX < window.innerWidth * 0.42 ? "-42px" : centerX > window.innerWidth * 0.58 ? "42px" : "0px";

        lightbox.style.setProperty("--lightbox-origin-x", originX);
        lightbox.style.setProperty("--lightbox-origin-y", originY);
        lightbox.style.setProperty("--lightbox-shift-x", shiftX);

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "";
        lightboxImage.width = image.naturalWidth || image.width || 0;
        lightboxImage.height = image.naturalHeight || image.height || 0;
        lightboxCaption.textContent = caption ? caption.textContent.trim() : "";

        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.body.classList.add("has-open-lightbox");
        lightbox.hidden = false;
        activeTrigger = trigger;
        lightboxClose.focus();
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    });
  };

  const initIntroSequence = () => {
    if (!document.body) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const introSteps = [
      { selector: '[data-intro="hero"]', delay: 0 },
      { selector: '[data-intro="nav"]', delay: 430 },
      { selector: '[data-intro="about"]', delay: 700 },
      { selector: '[data-intro="menu"]', delay: 920 } 
    ];

    introSteps.forEach(({ selector, delay }) => {
      document.querySelectorAll(selector).forEach((node) => {
        window.setTimeout(() => {
          node.classList.add("is-intro-visible");
        }, delay);
      });
    });

    window.setTimeout(() => {
      document.body.classList.remove("intro-sequence");
    }, 2200);
  };

  const initNavScrollState = () => {
    const nav = document.querySelector(".site-nav");
    if (!nav) {
      return;
    }

    const updateNavState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
  };

  applyCatalogPricesToMenu();

  document.addEventListener("DOMContentLoaded", () => {
    initIntroSequence();
    initNavScrollState();
    applyCatalogPricesToHighlights();
    renderClosureModal();
    renderReservationClosureNotice();
    renderSiteNews();
    renderManualReviews();
    initGalleryLightbox();
    // Batch DOM operations to avoid forced reflows
    requestAnimationFrame(() => {
      const yearSpan = document.getElementById("current-year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });

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

      const sectionTitle = section.title
        ? `<h4>${section.title}</h4>`
        : "";
      const sectionNote = section.note
        ? `<p class="menu-note">${section.note}</p>`
        : "";

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
      if (!spread) {
        return;
      }

      const [leftCategory, rightCategory] = spread;
      const visibleCategoryIds = new Set(
        spread
          .map((entry) => entry && entry.id)
          .filter(Boolean)
      );

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
      if (!category) {
        return;
      }

      activeCategoryId = categoryId;
      const matchingPageIndex = categoryPageStartMap.get(categoryId) ?? 0;
      currentSpreadIndex = Math.floor(matchingPageIndex / 2);
      renderSpread(currentSpreadIndex);
    };

    const focusButtonByIndex = (index) => {
      const target = buttons[index];
      if (target) {
        // Defer focus to avoid forced reflow
        requestAnimationFrame(() => {
          target.focus();
          setActiveCategory(target.dataset.category);
        });
      }
    };

    // Batch button creation to avoid multiple reflows
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
      button.addEventListener("keydown", (event) => {
        const currentIndex = buttons.indexOf(button);
        if (currentIndex === -1) {
          return;
        }

        switch (event.key) {
          case "ArrowDown":
          case "ArrowRight":
            event.preventDefault();
            focusButtonByIndex((currentIndex + 1) % buttons.length);
            break;
          case "ArrowUp":
          case "ArrowLeft":
            event.preventDefault();
            focusButtonByIndex((currentIndex - 1 + buttons.length) % buttons.length);
            break;
          case "Home":
            event.preventDefault();
            focusButtonByIndex(0);
            break;
          case "End":
            event.preventDefault();
            focusButtonByIndex(buttons.length - 1);
            break;
          default:
            break;
        }
      });

      fragment.appendChild(button);
      buttons.push(button);
    });

    categoryList.appendChild(fragment);

    requestAnimationFrame(() => {
      setActiveCategory(activeCategoryId);
    });

    menuPrev.addEventListener("click", () => {
      if (currentSpreadIndex <= 0) {
        return;
      }
      currentSpreadIndex -= 1;
      activeCategoryId = spreads[currentSpreadIndex][0].id;
      renderSpread(currentSpreadIndex);
    });

    menuNext.addEventListener("click", () => {
      if (currentSpreadIndex >= spreads.length - 1) {
        return;
      }
      currentSpreadIndex += 1;
      activeCategoryId = spreads[currentSpreadIndex][0].id;
      renderSpread(currentSpreadIndex);
    });

    // Lazy load Google Maps to reduce unused JavaScript
    const mapPlaceholder = document.getElementById('map-placeholder');
    const loadMapBtn = document.getElementById('load-map-btn');
    const googleMap = document.getElementById('google-map');

    if (loadMapBtn && googleMap) {
      loadMapBtn.addEventListener('click', () => {
        // Load the map only when user clicks
        googleMap.src = googleMap.dataset.src;
        googleMap.style.display = 'block';
        mapPlaceholder.style.display = 'none';
      });

      // Also load on scroll into view (Intersection Observer)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !googleMap.src) {
            googleMap.src = googleMap.dataset.src;
            googleMap.style.display = 'block';
            mapPlaceholder.style.display = 'none';
            observer.disconnect();
          }
        });
      }, { rootMargin: '50px' });

      observer.observe(mapPlaceholder);
    }

    // Reservierungsformular: per fetch an Formspree senden, Bestätigung anzeigen
    const reservationForm = document.getElementById('reservation-form');
    const formContainer = document.getElementById('reservation-form-container');
    const successMessage = document.getElementById('reservation-success');
    const errorMessage = document.getElementById('reservation-form-error');
    const reservationDateInput = document.getElementById('res-date');
    const reservationTimeNativeInput = document.getElementById('res-time');
    let reservationTimeInput = reservationTimeNativeInput;
    const reservationPhoneInput = document.getElementById('res-phone');

    // Zeit-Feld in anklickbare Blöcke umwandeln
    if (false && reservationTimeInput && reservationTimeInput.tagName.toLowerCase() === 'input') {
      const timeContainer = document.createElement('div');
      timeContainer.className = 'time-grid-container';
      timeContainer.style.display = 'grid';
      timeContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(70px, 1fr))';
      timeContainer.style.gap = '10px';
      timeContainer.style.marginTop = '8px';
      timeContainer.style.marginBottom = '8px';
      const timeRadios = [];

      for (let h = 18; h <= 20; h++) {
        for (let m = 0; m < 60; m += 5) { // 5 Min Takt für saubere Blöcke
          if (h === 20 && m > 0) continue; // Letzte Zeit 20:00
          
          const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
          
          const label = document.createElement('label');
          label.style.display = 'block';
          label.style.cursor = 'pointer';
          label.style.position = 'relative';

          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = reservationTimeInput.name;
          radio.value = timeStr;
          radio.required = true;
          radio.style.position = 'absolute';
          radio.style.opacity = '0';
          
          const span = document.createElement('span');
          span.textContent = timeStr;
          span.style.display = 'block';
          span.style.textAlign = 'center';
          span.style.padding = '10px 4px';
          span.style.border = '1px solid var(--border)';
          span.style.borderRadius = 'var(--radius-sm)';
          span.style.background = 'var(--card)';
          span.style.color = 'var(--text)';
          span.style.fontSize = '0.95rem';
          span.style.transition = 'all 0.2s ease';

          radio.addEventListener('change', () => {
            timeContainer.querySelectorAll('span').forEach(s => {
              s.style.background = 'var(--card)';
              s.style.color = 'var(--text)';
              s.style.borderColor = 'var(--border)';
              s.style.fontWeight = 'normal';
            });
            if (radio.checked) {
              span.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-strong))';
              span.style.color = '#fff';
              span.style.borderColor = 'transparent';
              span.style.fontWeight = '600';
            }
            updateReservationValidationMessage();
          });

          radio.addEventListener('focus', () => {
            span.style.boxShadow = '0 0 0 2px var(--bg), 0 0 0 4px var(--accent)';
          });
          radio.addEventListener('blur', () => {
            span.style.boxShadow = 'none';
          });

          label.appendChild(radio);
          label.appendChild(span);
          timeContainer.appendChild(label);
          timeRadios.push(radio);
        }
      }

      reservationTimeInput.parentNode.replaceChild(timeContainer, reservationTimeInput);
      
      reservationTimeInput = {
        get value() {
          const checked = timeRadios.find(r => r.checked);
          return checked ? checked.value : '';
        },
        setCustomValidity: (msg) => {
          if (timeRadios.length > 0) timeRadios[0].setCustomValidity(msg);
        },
        get validationMessage() {
          return timeRadios.length > 0 ? timeRadios[0].validationMessage : '';
        },
        focus: () => {
          if (timeRadios.length > 0) timeRadios[0].focus();
        },
        radios: timeRadios,
        tagName: 'radiogroup',
        addEventListener: (event, handler) => {
          timeRadios.forEach(r => r.addEventListener(event, handler));
        }
      };
    }

    const enhanceReservationTimePicker = () => {
      if (!reservationTimeNativeInput || !reservationTimeNativeInput.parentNode) {
        return;
      }

      const slotTimes = [];
      for (let totalMinutes = 18 * 60; totalMinutes <= 20 * 60; totalMinutes += 5) {
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
        const minutes = String(totalMinutes % 60).padStart(2, "0");
        slotTimes.push(`${hours}:${minutes}`);
      }
      const fieldset = document.createElement("fieldset");
      fieldset.className = "reservation-time-grid";

      const legend = document.createElement("legend");
      legend.textContent = "Uhrzeit auswählen";
      fieldset.appendChild(legend);

      const radios = slotTimes.map((time) => {
        const label = document.createElement("label");
        label.className = "reservation-time-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = reservationTimeNativeInput.name || "time";
        radio.value = time;
        radio.required = true;

        const text = document.createElement("span");
        text.textContent = time;

        radio.addEventListener("change", () => updateReservationValidationMessage());

        label.appendChild(radio);
        label.appendChild(text);
        fieldset.appendChild(label);
        return radio;
      });

      reservationTimeNativeInput.classList.add("reservation-time-native", "is-enhanced");
      reservationTimeNativeInput.required = false;
      reservationTimeNativeInput.disabled = true;
      reservationTimeNativeInput.removeAttribute("name");
      reservationTimeNativeInput.insertAdjacentElement("afterend", fieldset);

      reservationTimeInput = {
        get value() {
          const checked = radios.find((radio) => radio.checked);
          return checked ? checked.value : "";
        },
        setCustomValidity(message) {
          radios.forEach((radio) => radio.setCustomValidity(message));
        },
        get validationMessage() {
          const invalidRadio = radios.find((radio) => radio.validationMessage);
          return invalidRadio ? invalidRadio.validationMessage : "";
        },
        focus() {
          const focusTarget = radios.find((radio) => !radio.disabled) || radios[0];
          if (focusTarget) {
            focusTarget.focus();
          }
        },
        addEventListener(event, handler) {
          radios.forEach((radio) => radio.addEventListener(event, handler));
        },
        radios,
        isSlotPicker: true
      };
    };

    enhanceReservationTimePicker();

    const formatDateForInput = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formatTimeForInput = (date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const getReservationFieldLabel = (field) => {
      const fieldNames = {
        name: 'Name',
        email: 'E-Mail',
        phone: 'Telefon',
        guests: 'Anzahl Gaeste',
        date: 'Datum',
        time: 'Uhrzeit'
      };
      return fieldNames[field.name] || field.getAttribute('aria-label') || field.name || 'dieses Feld';
    };

    const isProbablyPhoneNumber = (value) => {
      const trimmed = String(value || '').trim();
      const digits = trimmed.replace(/\D/g, '');

      if (!trimmed || digits.length < 7 || digits.length > 15) {
        return false;
      }

      if (!/^[+\d][\d\s()./-]*$/.test(trimmed)) {
        return false;
      }

      const plusCount = (trimmed.match(/\+/g) || []).length;
      if (plusCount > 1 || (plusCount === 1 && !trimmed.startsWith('+'))) {
        return false;
      }

      if (/^(\d)\1+$/.test(digits)) {
        return false;
      }

      if (/^(0123456|1234567|9876543)/.test(digits)) {
        return false;
      }

      return true;
    };

    const validateReservationPhone = () => {
      if (!reservationPhoneInput) {
        return true;
      }

      const value = reservationPhoneInput.value.trim();
      reservationPhoneInput.setCustomValidity('');

      if (!value) {
        reservationPhoneInput.setCustomValidity('Bitte geben Sie eine Telefonnummer an.');
        return false;
      }

      if (!isProbablyPhoneNumber(value)) {
        reservationPhoneInput.setCustomValidity(
          'Bitte geben Sie eine erreichbare Telefonnummer mit mindestens 7 und maximal 15 Ziffern ein, z. B. 0202 123456 oder +49 202 123456.'
        );
        return false;
      }

      return true;
    };

    const validateReservationDateTime = () => {
      if (!reservationDateInput || !reservationTimeInput) {
        return true;
      }

      const selectedDate = reservationDateInput.value;
      const selectedTime = reservationTimeInput.value;
      reservationDateInput.setCustomValidity('');
      const closure = getReservationClosureForDate(selectedDate);
      if (closure) {
        const message = getClosureMessage(closure);
        reservationDateInput.setCustomValidity(message);
        reservationTimeInput.setCustomValidity('');
        return false;
      }

      if (!selectedDate || !selectedTime) {
        reservationTimeInput.setCustomValidity(selectedDate ? 'Bitte wählen Sie eine Uhrzeit.' : '');
        return !selectedDate;
      }

      const now = new Date();
      const currentDate = formatDateForInput(now);
      if (selectedDate < currentDate) {
        reservationDateInput.setCustomValidity('Vergangene Tage können nicht reserviert werden.');
        return false;
      }
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      if (Number.isNaN(selectedDateTime.getTime())) {
        reservationTimeInput.setCustomValidity('Bitte wählen Sie eine gültige Uhrzeit.');
        return false;
      }

      if (selectedDate === currentDate && selectedDateTime < now) {
        reservationTimeInput.setCustomValidity('Für heute können nur zukünftige Uhrzeiten gewählt werden.');
        return false;
      }

      reservationTimeInput.setCustomValidity('');
      return true;
    };

    const updateReservationConstraints = () => {
      if (!reservationDateInput || !reservationTimeInput) {
        return;
      }

      const now = new Date();
      const currentDate = formatDateForInput(now);
      const currentHour = now.getHours();

      // Wenn es nach 16 Uhr ist, kann heute nicht mehr reserviert werden
      if (currentHour >= 16) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        reservationDateInput.min = formatDateForInput(tomorrow);
      } else {
        reservationDateInput.min = currentDate;
      }

      // Vergangene Uhrzeiten für heute in den Blöcken deaktivieren
      if (reservationTimeInput.isSlotPicker) {
        const isToday = (reservationDateInput.value === currentDate);
        const currentTotalMins = currentHour * 60 + now.getMinutes();

        reservationTimeInput.radios.forEach(radio => {
          if (isToday) {
            const [optH, optM] = radio.value.split(':').map(Number);
            const optTotalMins = optH * 60 + optM;
            const isDisabled = optTotalMins <= currentTotalMins;
            
            radio.disabled = isDisabled;
            
            if (isDisabled && radio.checked) {
               radio.checked = false;
            }
          } else {
            radio.disabled = false;
          }
        });
      }

      validateReservationDateTime();
    };

    const updateReservationValidationMessage = () => {
      if (!errorMessage) {
        return;
      }

      const isValid = validateReservationDateTime();
      if (!isValid) {
        errorMessage.textContent = reservationDateInput.validationMessage || reservationTimeInput.validationMessage;
        errorMessage.hidden = false;
        return;
      }

      errorMessage.textContent = '';
      errorMessage.hidden = true;
    };

    if (reservationDateInput && reservationTimeInput) {
      updateReservationConstraints();
      reservationDateInput.addEventListener('input', () => {
        updateReservationConstraints();
        updateReservationValidationMessage();
      });
      reservationDateInput.addEventListener('change', () => {
        updateReservationConstraints();
        updateReservationValidationMessage();
      });
      reservationTimeInput.addEventListener('input', updateReservationValidationMessage);
    }

    if (reservationPhoneInput) {
      reservationPhoneInput.addEventListener('input', () => {
        validateReservationPhone();
        if (!errorMessage) {
          return;
        }
        if (reservationPhoneInput.validationMessage) {
          errorMessage.textContent = reservationPhoneInput.validationMessage;
          errorMessage.hidden = false;
          return;
        }
        if (errorMessage.textContent.includes('Telefonnummer')) {
          errorMessage.textContent = '';
          errorMessage.hidden = true;
        }
      });
    }

    if (reservationForm && formContainer && successMessage) {
      reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.hidden = true;
        errorMessage.textContent = '';
        const requiredFields = Array.from(reservationForm.querySelectorAll('[required]')).filter(
          (field) => field.type !== 'hidden' && !field.disabled
        );

        requiredFields.forEach((field) => {
          if (field.matches('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
            field.value = field.value.trim();
          }
        });
        const firstMissing = requiredFields.find((field) => {
          if (field.type === 'checkbox') {
            return !field.checked;
          }
          if (field.type === 'radio') {
            const group = reservationForm.querySelectorAll(`input[name="${field.name}"]`);
            return !Array.from(group).some(r => r.checked);
          }
          return !field.value || !field.value.trim();
        });
        if (firstMissing) {
          errorMessage.textContent = `Bitte fuellen Sie das Feld "${getReservationFieldLabel(firstMissing)}" aus.`;
          errorMessage.hidden = false;
          firstMissing.focus();
          return;
        }
        if (!validateReservationPhone()) {
          errorMessage.textContent = reservationPhoneInput.validationMessage;
          errorMessage.hidden = false;
          reservationPhoneInput.focus();
          return;
        }
        updateReservationConstraints();
        if (!validateReservationDateTime()) {
          errorMessage.textContent = reservationDateInput.validationMessage || reservationTimeInput.validationMessage;
          errorMessage.hidden = false;
          if (reservationDateInput.validationMessage) {
            reservationDateInput.focus();
          } else {
            reservationTimeInput.focus();
          }
          return;
        }
        const firstInvalid = requiredFields.find((field) => !field.checkValidity());
        if (firstInvalid) {
          errorMessage.textContent = firstInvalid.validationMessage || `Bitte pruefen Sie das Feld "${getReservationFieldLabel(firstInvalid)}".`;
          errorMessage.hidden = false;
          firstInvalid.focus();
          return;
        }
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Wird gesendet…';
        }
        const formData = new FormData(reservationForm);
        const action = reservationForm.getAttribute('action');
        if (!action || action.includes('DEINE_FORM_ID')) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Anfrage absenden';
          }
          errorMessage.textContent = 'Bitte tragen Sie Ihre Formspree-Form-ID in der action-URL ein.';
          errorMessage.hidden = false;
          return;
        }
        try {
          const response = await fetch(action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });
          const rawBody = await response.text();
          let data = {};
          try {
            data = rawBody ? JSON.parse(rawBody) : {};
          } catch (parseError) {
            data = {};
          }
          if (response.ok && (data.ok === true || response.status === 200)) {
            formContainer.hidden = true;
            successMessage.hidden = false;
          } else {
            const listErrors = Array.isArray(data.errors)
              ? data.errors.map((entry) => entry && entry.message).filter(Boolean)
              : [];
            const apiMessage = data.error || listErrors.join(' ');
            throw new Error(apiMessage || `Formspree-Fehler (HTTP ${response.status})`);
          }
        } catch (err) {
          const detail = err && err.message ? ` (${err.message})` : '';
          errorMessage.textContent = `Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.${detail}`;
          console.error('Reservation form submit failed:', err);
          errorMessage.hidden = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Anfrage absenden';
          }
        }
      });
    }

    // --- INQUIRY WIDGET LOGIC ---
    const inquiryBtn = document.getElementById("inquiry-btn");
    const inquiryPopup = document.getElementById("inquiry-popup");
    const inquiryClose = document.getElementById("inquiry-popup-close");
    const inquiryForm = document.getElementById("inquiry-form");
    const inquirySuccess = document.getElementById("inquiry-success");
    const inquiryError = document.getElementById("inquiry-form-error");
    const newsPopupRef = document.getElementById("news-popup");
    
    if (inquiryBtn && inquiryPopup && inquiryClose) {
      inquiryBtn.addEventListener("click", () => {
        const isHidden = inquiryPopup.hidden;
        inquiryPopup.hidden = !isHidden;
        
        if (!isHidden) {
           // Wenn das Anfragefenster geöffnet wird, News-Popup ausblenden falls offen
           if (newsPopupRef && !newsPopupRef.hidden) {
             newsPopupRef.hidden = true;
           }
           // Formular-Zustand zurücksetzen, falls es vorher erfolgreich gesendet wurde
           if (inquirySuccess && !inquirySuccess.hidden) {
             inquirySuccess.hidden = true;
             inquiryForm.style.display = "block";
             inquiryForm.reset();
             const submitBtn = inquiryForm.querySelector('button[type="submit"]');
             if (submitBtn) {
               submitBtn.disabled = false;
               submitBtn.textContent = "Nachricht senden";
             }
           }
        }
      });

      inquiryClose.addEventListener("click", () => {
        inquiryPopup.hidden = true;
      });
    }

    if (inquiryForm) {
      inquiryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (inquiryError) {
          inquiryError.hidden = true;
          inquiryError.textContent = "";
        }
        
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Wird gesendet…";
        }

        const formData = new FormData(inquiryForm);
        const action = inquiryForm.getAttribute("action");

        try {
          const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" }
          });
          
          if (response.ok) {
            inquiryForm.style.display = "none";
            if (inquirySuccess) inquirySuccess.hidden = false;
          } else {
            throw new Error("Fehler beim Senden");
          }
        } catch (err) {
          if (inquiryError) {
            inquiryError.textContent = "Etwas ist schiefgelaufen. Bitte später erneut versuchen.";
            inquiryError.hidden = false;
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Nachricht senden";
          }
        }
      });
    }

    initQuickScrollReveal();
    initSectionNav();
  });

  const initSectionNav = () => {
    const nav = document.querySelector(".site-nav");
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!nav || !navLinks.length) {
      return;
    }

    const linkMap = navLinks
      .map((link) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) {
          return null;
        }
        return { link, target };
      })
      .filter(Boolean);

    if (!linkMap.length) {
      return;
    }

    const setCurrentLink = (activeLink) => {
      navLinks.forEach((link) => {
        const isCurrent = link === activeLink;
        link.classList.toggle("is-current", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const updateCurrentLink = () => {
      // Der scroll-margin-top in CSS ist 124px. Wir nutzen diesen Wert als Schwelle.
      // Ein kleiner Puffer von 5px macht die Erkennung etwas flexibler.
      const activeThreshold = 124 + 5; 
      let active = null;

      // Iteriere die Links in umgekehrter Reihenfolge, um den untersten (aktuellsten)
      // Abschnitt zu finden, dessen oberer Rand die Schwelle überschritten hat.
      for (let i = linkMap.length - 1; i >= 0; i--) {
        const { link, target } = linkMap[i];
        const rect = target.getBoundingClientRect();
        if (rect.top <= activeThreshold) {
          active = link;
          break; // Den ersten gefundenen aktiven Link nehmen und Schleife beenden
        }
      }
      setCurrentLink(active);
    };

    updateCurrentLink();
    window.addEventListener("scroll", updateCurrentLink, { passive: true });
    window.addEventListener("resize", updateCurrentLink, { passive: true });
  };
})();
