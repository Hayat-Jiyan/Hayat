(function () {
  "use strict";

  var CONSENT_KEY = "cookie_consent";
  var ACCEPTED = "accepted";

  function hasConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === ACCEPTED;
    } catch (error) {
      return false;
    }
  }

  function getBannerNodes() {
    return {
      overlay: document.getElementById("cookie-consent-overlay"),
      banner: document.getElementById("cookie-consent-banner"),
      button: document.getElementById("cookie-consent-btn")
    };
  }

  function showBanner() {
    var nodes = getBannerNodes();
    if (!nodes.banner || !nodes.button) {
      return;
    }
    nodes.banner.removeAttribute("hidden");
    nodes.banner.classList.remove("cookie-banner--hidden");
    if (nodes.overlay) {
      nodes.overlay.removeAttribute("hidden");
      nodes.overlay.classList.remove("cookie-banner--hidden");
    }
  }

  function hideBanner() {
    var nodes = getBannerNodes();
    if (!nodes.banner || !nodes.button) {
      return;
    }
    try {
      localStorage.setItem(CONSENT_KEY, ACCEPTED);
    } catch (error) {
      // Ignore storage failures and still hide UI.
    }
    nodes.banner.setAttribute("hidden", "");
    nodes.banner.classList.add("cookie-banner--hidden");
    if (nodes.overlay) {
      nodes.overlay.setAttribute("hidden", "");
      nodes.overlay.classList.add("cookie-banner--hidden");
    }
    window.dispatchEvent(new CustomEvent("hayat:cookie-consent-accepted"));
  }

  function initCookieBanner() {
    var nodes = getBannerNodes();
    if (!nodes.banner || !nodes.button) {
      return;
    }

    if (!hasConsent()) {
      showBanner();
    }

    if (nodes.overlay) {
      nodes.overlay.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        hideBanner();
      });
      nodes.overlay.addEventListener(
        "touchend",
        function (event) {
          event.preventDefault();
          hideBanner();
        },
        { passive: false }
      );
    }

    nodes.button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      hideBanner();
    });
    nodes.button.addEventListener(
      "touchend",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        hideBanner();
      },
      { passive: false }
    );
  }

  function setCurrentYear() {
    var year = String(new Date().getFullYear());
    var yearNodes = document.querySelectorAll("#current-year");
    yearNodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  function init() {
    setCurrentYear();
    initCookieBanner();
  }

  window.HayatConsent = {
    hasConsent: hasConsent,
    showBanner: showBanner
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
