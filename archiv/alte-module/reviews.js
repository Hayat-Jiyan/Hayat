import { siteReviews } from './reviews-data.js';

export function initReviews() {
  const reviewsSection = document.getElementById("reviews");
  const reviewsGrid = document.getElementById("reviews-grid");
  const reviewsMeta = document.getElementById("reviews-meta");
  const reviewsGoogleLink = document.getElementById("reviews-google-link");

  if (!reviewsSection || !reviewsGrid) {
    return;
  }

  const data = siteReviews || {};
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
      if (!textWrap || !toggleEl) return;

      const wasExpanded = card.classList.contains("is-expanded");
      if (wasExpanded) card.classList.remove("is-expanded");

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
      if (!card) return;
      const expanded = card.classList.toggle("is-expanded");
      button.textContent = expanded ? "Weniger anzeigen" : "Mehr ansehen";
      button.setAttribute("aria-expanded", String(expanded));
    });
  });

  reviewsSection.hidden = false;
  window.addEventListener("resize", () => setTimeout(updateReviewExpandState, 120), { passive: true });
  updateReviewExpandState();
}