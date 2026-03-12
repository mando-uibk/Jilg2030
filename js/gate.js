/**
 * Einfaches Passwort-Gate für statische Sites (GitHub Pages).
 * Passwort wird per Build/Workflow in js/gate-secret.js gesetzt (nicht im Repo als Klartext nötig).
 * Hinweis: Ohne echten Server ist das nur Zugangsbeschränkung per „Verstecken“ – wer das JS lädt, kann das Passwort sehen.
 */
(function () {
  var COOKIE_NAME = "jilg2030_site_access";
  var COOKIE_MAX_AGE_DAYS = 7;
  var PASSWORD = typeof window.__JILG_SITE_PASSWORD__ === "string" ? window.__JILG_SITE_PASSWORD__ : "";

  if (!PASSWORD) {
    return;
  }

  function getCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + days * 24 * 60 * 60 + "; SameSite=Lax" + secure;
  }

  if (getCookie(COOKIE_NAME) === "1") {
    return;
  }

  function showGate() {
    var overlay = document.createElement("div");
    overlay.id = "jilg-gate-overlay";
    overlay.innerHTML =
      '<div class="jilg-gate-box">' +
      '<h2 class="jilg-gate-title">Zugang</h2>' +
      '<p class="jilg-gate-text">Diese Seite ist passwortgeschützt.</p>' +
      '<form class="jilg-gate-form" id="jilg-gate-form">' +
      '<label class="jilg-gate-label" for="jilg-gate-pw">Passwort</label>' +
      '<input type="password" id="jilg-gate-pw" class="jilg-gate-input" autocomplete="current-password" required />' +
      '<button type="submit" class="jilg-gate-btn">Anmelden</button>' +
      '<p class="jilg-gate-err" id="jilg-gate-err" role="alert" hidden>Falsches Passwort.</p>' +
      "</form></div>";

    var style = document.createElement("style");
    style.textContent =
      "#jilg-gate-overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(13,45,110,.97);display:flex;align-items:center;justify-content:center;padding:1rem;font-family:system-ui,sans-serif}" +
      ".jilg-gate-box{background:#fff;padding:2rem;border-radius:12px;max-width:360px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.2)}" +
      ".jilg-gate-title{margin:0 0 .5rem;font-size:1.5rem;color:#0d2d6e}" +
      ".jilg-gate-text{margin:0 0 1.25rem;color:#444;font-size:.95rem}" +
      ".jilg-gate-label{display:block;font-weight:600;color:#0d2d6e;margin-bottom:.35rem}" +
      ".jilg-gate-input{width:100%;padding:.65rem .85rem;border:2px solid #ccc;border-radius:6px;font-size:1rem;box-sizing:border-box;margin-bottom:1rem}" +
      ".jilg-gate-input:focus{outline:none;border-color:#0d2d6e}" +
      ".jilg-gate-btn{width:100%;padding:.75rem;background:#b91c2c;color:#fff;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer}" +
      ".jilg-gate-btn:hover{filter:brightness(1.05)}" +
      ".jilg-gate-err{color:#b91c2c;font-size:.9rem;margin:.75rem 0 0}";

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (document.body.firstChild) {
      document.body.insertBefore(style, document.body.firstChild);
      document.body.insertBefore(overlay, document.body.firstChild);
    } else {
      document.body.appendChild(style);
      document.body.appendChild(overlay);
    }

    var form = document.getElementById("jilg-gate-form");
    var input = document.getElementById("jilg-gate-pw");
    var err = document.getElementById("jilg-gate-err");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;
      if (input.value === PASSWORD) {
        setCookie(COOKIE_NAME, "1", COOKIE_MAX_AGE_DAYS);
        location.reload();
      } else {
        err.hidden = false;
        input.value = "";
        input.focus();
      }
    });

    input.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGate);
  } else {
    showGate();
  }
})();
