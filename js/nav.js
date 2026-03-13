// Kleine mobile Navigation für alle Seiten mit .site-header
(function () {
  function initHeader(header) {
    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = header.classList.contains("nav-open");
      setOpen(!isOpen);
    });

    // Schließen beim Navigieren (Tap auf Link)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        setOpen(false);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll(".site-header").forEach(initHeader);
    });
  } else {
    document.querySelectorAll(".site-header").forEach(initHeader);
  }
})();

