# Programm per E-Mail – Eintragung

## Idee

**Kein Newsletter.** Wer sich einträgt, soll **direkt etwas auf die eingetragene E-Mail** bekommen – einmalig den Programm-Einstieg + Dank.

## Ablauf

1. Besucher öffnet **`eintragung.html`** (Nav: „Programm per E-Mail“).
2. E-Mail eintragen → Absenden → **Formspree** nimmt die Adresse entgegen.
3. **Sofort-Mail an den Besucher:** nur wenn in Formspree ein **Autoresponder** aktiv ist – Inhalt aus **`assets/programm-willkommen.txt`**.
4. **Danke-Seite** (`danke.html`): Fallback mit gleichem Programmtext im Browser, falls keine Autoresponder-Mail ankommt.

Alte URL **`newsletter.html`** leitet auf **`eintragung.html`** weiter.

## Formspree einrichten

1. Formular (bestehendes Endpoint) im Dashboard öffnen.
2. **Autoresponder** aktivieren – Empfänger ist automatisch das Feld `email`.
3. Betreff + Text aus `programm-willkommen.txt` einfügen (Links auf finale Domain anpassen).
4. Optional: In Formspree nur „einmal pro Adresse“ oder Spam-Schutz prüfen.

Ohne Autoresponder: ihr bekommt nur die Benachrichtigung mit der Adresse; der Besucher sieht nach Absenden die Danke-Seite mit Programmtext – aber **keine** Mail von euch automatisch.

## Technik

- Formular: `eintragung.html` → `action` = eure Formspree-URL.
- `_subject`: z. B. `Programm per E-Mail – Jilg 2030`.
- `_next`: `danke.html` (absolute URL bei GitHub Pages).
