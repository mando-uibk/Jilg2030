# Jilg 2030 – Kampagnen-Website (GitHub Pages)

Statische Website: **Landing Page** (`index.html`) + **Programm** (`programm.html`).  
Kontakt: **buergermeister@jilg2030.at** (mailto auf der Seite).

## GitHub Pages

1. Repo auf GitHub, **Settings** → **Pages** → Source **GitHub Actions** (Workflow liegt in `.github/workflows/pages.yml`).
2. Domain **jilg2030.at**: siehe **`DOMAIN_SETUP.md`**.

## Hero-Foto

`assets/hero.png` – Plakatfoto des Kandidaten.

## Lokales Testen

```bash
python -m http.server 8080
```

## Unterstützungsliste

**`unterstuetzer.html`** – Besucher tragen Vor-/Nachname ein, Liste aktualisiert **live** (Firebase Firestore).  
Einrichtung: **`UNTERSTUETZER_FIREBASE.md`**

## Inhalt

- Sprache: **Deutsch**
- Farben: Königsblau, Rot, Weiß (Plakat)
- Kein Backend, kein Formular – nur statische Seiten

---

*Kampagne Jilg 2030.*
