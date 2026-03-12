# Jilg 2030 – Kampagnen-Website (GitHub Pages)

Statische Website für die Bürgermeisterwahl Innsbruck 2030 – **minimaler Aufwand**, hostbar direkt auf GitHub.

## Schnellstart (GitHub Pages)

1. **Repository anlegen** auf GitHub und diesen Ordner hochladen (oder `git init` + push).
2. **Pages aktivieren:** Repository → *Settings* → *Pages* → *Source*: Branch **main** (oder **master**), Ordner **/** (root).
3. Nach 1–2 Minuten ist die Site unter  
   `https://<dein-username>.github.io/<repo-name>/` erreichbar.

### Eigene Domain (jilg2030.at)

**World4You + GitHub Pages:** siehe **`DOMAIN_SETUP.md`** (DNS A-Records, CNAME-Datei, E-Mail MX nicht anfassen).

Kurz: GitHub Repo → Settings → Pages → Custom domain `jilg2030.at` → bei World4You **A-Records** auf die vier GitHub-IPs → warten → HTTPS aktivieren.

---

### Eigene Domain (allgemein)

Wenn die Domain steht:

- Bei deinem DNS-Anbieter **CNAME** auf `<username>.github.io` setzen **oder** A-Records laut [GitHub-Doku](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
- Im Repo: *Settings* → *Pages* → *Custom domain* eintragen; optional „Enforce HTTPS“ aktivieren.

## Hero-Foto

Das Plakatfoto soll **sehr prominent** auf der Startseite erscheinen:

1. Bild als **`assets/hero.png`** ablegen (oder `assets/hero.webp` zusätzlich für schnellere Ladezeit).
2. Wenn der Dateiname anders ist: in `index.html` im `<img src="...">` anpassen.

Ohne Bild bleibt der blaue Hero-Bereich mit Text erhalten; das Bild wird empfohlen.

## Programm per E-Mail (Eintragung)

GitHub Pages hat kein Backend. **Eintragung** läuft über **Formspree** auf `eintragung.html`.

- Wer sich einträgt, soll **sofort eine E-Mail** mit Programm-Einstieg bekommen → dafür in Formspree einen **Autoresponder** einrichten; Textvorlage: **`assets/programm-willkommen.txt`**.
- Details: **`EINTRAGUNG.md`**
- Alte Seite `newsletter.html` leitet nur noch auf `eintragung.html` um.

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
