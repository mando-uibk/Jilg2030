window.__JILG_SITE_PASSWORD__="";
/**
 * Passwort-Gate: index.html = undurchsichtige Vollbild-Seite nur mit Login.
 * Alle anderen Seiten: ohne Cookie → Redirect auf index.html?next=...
 * Online: gesamte Datei wird in CI überschrieben – Passwort in Zeile 1 (Secret SITE_PASSWORD).
 */
(function () {
  var COOKIE_NAME = "jilg2030_site_access";
  var COOKIE_MAX_AGE_DAYS = 7;
  var HOME_PAGE = "home.html";
  var PASSWORD = typeof window.__JILG_SITE_PASSWORD__ === "string" ? window.__JILG_SITE_PASSWORD__ : "";

  function getCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + days * 24 * 60 * 60 + "; SameSite=Lax" + secure;
  }

  function isGatePage() {
    if (document.body && document.body.getAttribute("data-jilg-gate") === "1") return true;
    var path = location.pathname;
    var last = path.split("/").filter(Boolean).pop() || "";
    if (last === "index.html") return true;
    return false;
  }

  function redirectToGate() {
    var next = location.pathname + location.search;
    if (next.indexOf("index.html") !== -1 && !location.search) next = HOME_PAGE;
    var url = "index.html?next=" + encodeURIComponent(next || HOME_PAGE);
    location.replace(url);
  }

  function getNextUrl() {
    var params = new URLSearchParams(location.search);
    var next = params.get("next");
    if (!next || next.indexOf("..") !== -1 || next.indexOf("//") !== -1) return HOME_PAGE;
    return next;
  }

  // Kein Passwort konfiguriert → kein Gate; von index zur Startseite
  if (!PASSWORD) {
    if (isGatePage() && document.body && document.body.children.length <= 2) {
      location.replace(HOME_PAGE);
    }
    return;
  }

  // Cookie gesetzt → weiter (außer wir sitzen auf index ohne next, dann direkt home)
  if (getCookie(COOKIE_NAME) === "1") {
    if (isGatePage()) {
      var next = getNextUrl();
      if (next !== location.pathname.split("/").pop()) location.replace(next);
    }
    return;
  }

  // Nicht Gate-Seite → sofort umleiten (nichts vom Inhalt zeigen)
  if (!isGatePage()) {
    redirectToGate();
    return;
  }

  // Gate-Seite: undurchsichtiger Vollbild-Hintergrund, nur Formular
  function showFullPageGate() {
    document.documentElement.style.background = "#0d2d6e";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "#0d2d6e";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
    document.body.style.padding = "1rem";
    document.body.style.fontFamily = "system-ui, sans-serif";

    document.body.innerHTML =
      '<div class="jilg-gate-box" style="background:#fff;padding:2rem;border-radius:12px;max-width:360px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.25)">' +
      '<h2 style="margin:0 0 .5rem;font-size:1.5rem;color:#0d2d6e">Zugang</h2>' +
      '<p style="margin:0 0 1.25rem;color:#444;font-size:.95rem">Diese Seite ist passwortgeschützt.</p>' +
      '<form id="jilg-gate-form">' +
      '<label for="jilg-gate-pw" style="display:block;font-weight:600;color:#0d2d6e;margin-bottom:.35rem">Passwort</label>' +
      '<input type="password" id="jilg-gate-pw" autocomplete="current-password" required ' +
      'style="width:100%;padding:.65rem .85rem;border:2px solid #ccc;border-radius:6px;font-size:1rem;box-sizing:border-box;margin-bottom:1rem" />' +
      '<button type="submit" style="width:100%;padding:.75rem;background:#b91c2c;color:#fff;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer">Anmelden</button>' +
      '<p id="jilg-gate-err" style="color:#b91c2c;font-size:.9rem;margin:.75rem 0 0" hidden>Falsches Passwort.</p>' +
      "</form></div>";

    var form = document.getElementById("jilg-gate-form");
    var input = document.getElementById("jilg-gate-pw");
    var err = document.getElementById("jilg-gate-err");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;
      if (input.value === PASSWORD) {
        setCookie(COOKIE_NAME, "1", COOKIE_MAX_AGE_DAYS);
        location.replace(getNextUrl());
      } else {
        err.hidden = false;
        input.value = "";
        input.focus();
      }
    });

    input.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showFullPageGate);
  } else {
    showFullPageGate();
  }
})();
