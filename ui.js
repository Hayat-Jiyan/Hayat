export function initUI() {
  const initQuickScrollReveal = () => {
    if (!document.body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const revealSelectors = [
      ".hero-text", ".hero-visual", "#about .about-panel", "#menu .section-heading",
      "#menu .menu-layout", "#highlights .section-heading", "#highlights .highlight-card",
      "#services .section-heading", "#services .service-card", "#reviews .section-heading",
      "#reviews .review-card", "#reviews .reviews-cta", "#gallery .section-heading",
      "#gallery .gallery-card", "#contact .visit-info", "#contact .map-wrapper", ".footer"
    ];

    const revealNodes = Array.from(document.querySelectorAll(revealSelectors.join(",")));
    if (!revealNodes.length) return;

    document.body.classList.add("motion-reveal-enabled");
    revealNodes.forEach((node) => node.setAttribute("data-reveal", ""));

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    revealNodes.forEach((node) => observer.observe(node));
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

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose || !triggers.length) return;

    let previousOverflow = "";
    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove("has-open-lightbox");
      document.body.style.overflow = previousOverflow;
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const image = trigger.querySelector("img");
        const caption = trigger.closest(".gallery-card")?.querySelector("figcaption");
        if (!image) return;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "";
        lightboxCaption.textContent = caption ? caption.textContent.trim() : "";

        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.body.classList.add("has-open-lightbox");
        lightbox.hidden = false;
        lightboxClose.focus();
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
  };

  const initIntroSequence = () => {
    if (!document.body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const introSteps = [
      { selector: '[data-intro="hero"]', delay: 0 },
      { selector: '[data-intro="nav"]', delay: 430 },
      { selector: '[data-intro="about"]', delay: 700 },
      { selector: '[data-intro="menu"]', delay: 920 }
    ];
    introSteps.forEach(({ selector, delay }) => {
      document.querySelectorAll(selector).forEach((node) => {
        window.setTimeout(() => node.classList.add("is-intro-visible"), delay);
      });
    });
    window.setTimeout(() => document.body.classList.remove("intro-sequence"), 2200);
  };

  const initNav = () => {
    const nav = document.querySelector(".site-nav");
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!nav) return;

    const updateNav = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
      let active = null;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const target = document.querySelector(navLinks[i].getAttribute("href"));
        if (target && target.getBoundingClientRect().top <= 129) {
          active = navLinks[i];
          break;
        }
      }
      navLinks.forEach((link) => {
        link.classList.toggle("is-current", link === active);
      });
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  };

  const initMaps = () => {
    const mapPlaceholder = document.getElementById('map-placeholder');
    const googleMap = document.getElementById('google-map');
    if (!mapPlaceholder || !googleMap) return;

    const loadMap = () => {
      googleMap.src = googleMap.dataset.src;
      googleMap.style.display = 'block';
      mapPlaceholder.style.display = 'none';
    };

    document.getElementById('load-map-btn')?.addEventListener('click', loadMap);
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !googleMap.src) {
        loadMap();
        observer.disconnect();
      }
    }, { rootMargin: '50px' });
    observer.observe(mapPlaceholder);
  };

  initIntroSequence();
  initNav();
  initGalleryLightbox();
  initQuickScrollReveal();
  initMaps();
  requestAnimationFrame(() => { document.getElementById("current-year").textContent = new Date().getFullYear(); });
}