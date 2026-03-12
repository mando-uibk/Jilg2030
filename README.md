# Jilg 2030 – Kampagnen-Website (GitHub Pages)

Statische Website für die Bürgermeisterwahl Innsbruck 2030 – **minimaler Aufwand**, hostbar direkt auf GitHub.

## Schnellstart (GitHub Pages)

1. **Repository anlegen** auf GitHub und diesen Ordner hochladen (oder `git init` + push).
2. **Pages aktivieren:** Repository → *Settings* → *Pages* → *Source*: Branch **main** (oder **master**), Ordner **/** (root).
3. Nach 1–2 Minuten ist die Site unter  
   `https://<dein-username>.github.io/<repo-name>/` erreichbar.

### Eigene Domain (später)

Wenn die Domain steht (z. B. jilg2030.at):

- Bei deinem DNS-Anbieter **CNAME** auf `<username>.github.io` setzen **oder** A-Records laut [GitHub-Doku](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
- Im Repo: *Settings* → *Pages* → *Custom domain* eintragen; optional „Enforce HTTPS“ aktivieren.

## Hero-Foto

Das Plakatfoto soll **sehr prominent** auf der Startseite erscheinen:

1. Bild als **`assets/hero.png`** ablegen (oder `assets/hero.webp` zusätzlich für schnellere Ladezeit).
2. Wenn der Dateiname anders ist: in `index.html` im `<img src="...">` anpassen.

Ohne Bild bleibt der blaue Hero-Bereich mit Text erhalten; das Bild wird empfohlen.

## Newsletter-Formular

GitHub Pages liefert nur **statische** Dateien – kein PHP/Backend.

**Option A – Formspree (einfach):**

1. Auf [formspree.io](https://formspree.io) registrieren, neues Formular anlegen.
2. In `newsletter.html` die `action="https://formspree.io/f/YOUR_FORM_ID"` durch deine Formspree-URL ersetzen.

**Option B – Google Form:**

Google Formular erstellen und per `<iframe>` auf `newsletter.html` einbetten (Embed-Code von Google kopieren).

**Option C – Mailchimp / anderer Anbieter:**

Dort generierten Einbettungs- oder Signup-Link/Button einbauen.

## Lokales Testen

Einfach `index.html` im Browser öffnen oder lokalen Server:

```bash
# Python 3
python -m http.server 8080
```

Dann `http://localhost:8080` aufrufen.

## Inhalt

- Alles **Deutsch**.
- Farben orientieren am Plakat: **Königsblau, Rot, Weiß**.
- Programm inkl. SVG-„Render“ Mischgebäude (Gewerbe unten, Sozialwohnungen oben) auf `programm.html`.

---

*Privates Projekt / Satire – kein offizielles Wahlwerbematerial.*
