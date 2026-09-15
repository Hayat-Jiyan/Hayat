(function () {
  "use strict";

  // Kein Cookie-Banner: Die Seite setzt keine Cookies. Google Maps wird erst
  // nach Klick auf "Karte laden" eingebunden (siehe technik/main.js).

  function setCurrentYear() {
    var year = String(new Date().getFullYear());
    var yearNodes = document.querySelectorAll("#current-year");
    yearNodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  function initTopLinks() {
    var topLinks = document.querySelectorAll('a[href="#top"]');
    if (!topLinks.length) {
      return;
    }

    topLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        var topTarget = document.getElementById("top");
        if (topTarget && typeof topTarget.scrollIntoView === "function") {
          topTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (window.location.hash !== "#top") {
          history.replaceState(null, "", "#top");
        }
      });
    });
  }

  function initBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) {
      return;
    }

    var updateVisibility = function () {
      btn.classList.toggle("is-visible", window.scrollY > 400);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init() {
    setCurrentYear();
    initTopLinks();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
