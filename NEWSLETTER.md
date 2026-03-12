# Newsletter – wie es läuft & Programm per E-Mail

## Was Formspree aktuell macht

1. **Jemand trägt die E-Mail** auf `newsletter.html` ein und klickt auf „Abonnieren“.
2. **Formspree** speichert die Anmeldung und **schickt euch** (als Betreiber) eine Benachrichtigung mit der Adresse.
3. **Weiterleitung** des Besuchers auf **`danke.html`** – dort Dank + sofortiger Zugriff auf das Programm auf der Website.

Formspree **verschickt den Abonnenten standardmäßig kein eigenes Willkommens-Mail** mit Programmtext – dafür braucht es entweder einen **Autoresponder** in Formspree oder einen **anderen Dienst** (siehe unten).

---

## Ziel: Programm als Einstieg **per E-Mail** + Dank

### Option A – Formspree Autoresponder (wenn im Dashboard verfügbar)

Viele Formspree-Pläne bieten **Autoresponder**: eine automatische E-Mail **an die Adresse aus dem Formular** (`name="email"` habt ihr schon).

1. Formspree einloggen → euer Formular **Newsletter** öffnen.
2. Nach **Autoresponder** / **Auto-Response** / **Workflows** suchen (Bezeichnung kann variieren).
3. **Betreff** z. B.: *Danke für Ihre Anmeldung – Ihr Programm-Einstieg (Jilg 2030)*
4. **Text/HTML**: Inhalt aus **`assets/programm-willkommen.txt`** übernehmen und anpassen (Links auf eure finale Domain setzen).
5. Speichern – ab dann bekommt jeder Neueingang automatisch diese Mail.

Hinweis: Ob Autoresponder im Free-Tier dabei ist, steht in eurem Formspree-Account unter Features/Preis.

### Option B – Brevo (ehem. Sendinblue) oder Mailchimp

1. Formspree-Einträge **exportieren** oder per **Zapier/Make** bei jeder neuen Anmeldung einen Kontakt in Brevo/Mailchimp anlegen.
2. **Willkommens-Automation** einrichten: „Bei neuer Anmeldung → sofort E-Mail mit Programmtext senden“.
3. Programmtext wieder aus **`assets/programm-willkommen.txt`** oder als HTML aus `programm.html` bauen.

Mehr Aufwand, aber skalierbar und professionell.

### Option C – Halbautomatisch

1. Ihr bekommt weiterhin die Mail von Formspree mit der Adresse.
2. **Einmal pro Woche** (oder sofort): aus `programm-willkommen.txt` kopieren, an die neue Adresse senden – bis ihr Option A oder B nutzt.

---

## Sofort ohne E-Mail: Danke-Seite = Programm-Einstieg

Die **Danke-Seite** zeigt den Programm-Einstieg **direkt im Browser**, damit niemand warten muss, bis die erste echte Newsletter-Mail kommt. Die gleiche Struktur könnt ihr 1:1 in den Autoresponder kopieren.

---

## Checkliste

| Schritt | Erledigt? |
|--------|-----------|
| Formspree leitet auf `danke.html` um (`_next`) | ✓ |
| Programmtext für E-Mail in `assets/programm-willkommen.txt` | ✓ |
| Formspree Autoresponder einrichten **oder** Brevo/Mailchimp | ☐ |
| Link in Willkommens-Mail auf finale Domain (statt github.io) anpassen | ☐ |

Bei Fragen zum Formspree-Dashboard: https://help.formspree.io/
