# Passwort-Gate (jilg2030.at)

Die Website kann per **Passwort** abgesichert werden.

- **`index.html`** – nur **undurchsichtige** Vollbild-Seite (Königsblau `#0d2d6e`) mit Passwortfeld, **kein** sichtbarer Seiteninhalt darunter.
- **`home.html`** – bisherige **Startseite** (Hero, Texte, …). Nach Login wird dorthin (oder zu `?next=…`) weitergeleitet.
- Ohne Cookie: Aufruf von `programm.html`, `unterstuetzer.html`, … leitet sofort auf `index.html?next=…` um – **kein** Durchscheinen des Inhalts.

Nach erfolgreicher Eingabe wird ein **Cookie** gesetzt (Standard: **7 Tage**), damit beim Weiterklicken keine erneute Abfrage erscheint.

## Wichtig (GitHub Pages = statisch)

- Es gibt **keinen Server** – das Passwort wird in die ausgelieferte `js/gate-secret.js` **eingebaut** (per GitHub Actions Secret). Wer die Seite lädt, kann im Netzwerk/Quelltext danach suchen. Das Gate ist also **kein kryptographischer Schutz**, sondern hält nur **nicht eingeweihte Besucher** ab.
- Für **echten** Schutz: z. B. **Cloudflare Access**, **Netlify Password**, oder ein kleines Backend.

## GitHub: Secret anlegen

1. **Wichtig:** **Settings → Pages → Build and deployment → Source** muss **GitHub Actions** sein. Steht dort noch **Deploy from branch**, wird **nie** injiziert – die live Site ist dann die Rohversion ohne Passwort.
2. Repo **mando-uibk/Jilg2030** → **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
   - Name: **`SITE_PASSWORD`** (exakt so)
   - Value: dein Passwort
4. **Environment `github-pages`:** Falls das Secret im Job leer ankommt (Log zeigt `SITE_PASSWORD length: 0`): **Settings → Environments → github-pages** → **Environment secrets** → ebenfalls **`SITE_PASSWORD`** anlegen.
5. Nach dem Anlegen: **Actions → Deploy Pages → Run workflow** – im Log beim Schritt **Build gate-built.js** muss stehen **`SITE_PASSWORD length: <Zahl>`** mit **Zahl > 0**. Bei **0** bleibt das Gate aus.

Ohne gesetztes Secret bleibt `gate-secret.js` leer → **kein Gate** (wie bisher).

### „Online geht es nicht“, obwohl Secret gesetzt ist

| Problem | Lösung |
|--------|--------|
| **Falscher Name** | Es muss exakt **`SITE_PASSWORD`** heißen (Großbuchstaben, Unterstrich). Nicht `site_password`, nicht `SITE PASSWORD`, nicht `SECRET_SITE_PASSWORD`. |
| **Falsche Stelle** | Unter **Settings → Secrets and variables → Actions** als **Repository secret** anlegen (grüner Bereich „Repository secrets“). |
| **Kein neuer Deploy** | Secret wird **erst beim nächsten Workflow-Lauf** in die Datei geschrieben. Nach dem Anlegen: **Actions** → **Deploy Pages** → **Run workflow** ausführen **oder** einen beliebigen Commit pushen. |
| **Prüfen, ob Inject geklappt hat** | Im Workflow-Log beim Schritt **Inject site password** steht die **Dateigröße** von `js/gate-secret.js`. Ist sie nur ~45 Bytes, ist das Passwort **leer** (Secret nicht gefunden). Mit Passwort ist die Datei deutlich länger. |
| **Im Browser prüfen** | Seite öffnen → **F12** → **Netzwerk** → `gate-secret.js` anklicken → **Antwort** muss `window.__JILG_SITE_PASSWORD__="…"` mit **deinem** Passwort enthalten (in Anführungszeichen). Steht da `""`, war das Secret beim Deploy nicht gesetzt. |

## Lokal mit Passwort testen

1. `js/gate-secret.js` anlegen (oder vorhandene Datei bearbeiten):

   ```js
   window.__JILG_SITE_PASSWORD__ = "dein-passwort";
   ```

2. **`js/gate-secret.js` nicht committen**, wenn das Passwort drinsteht – sonst landet es im Repo. Besser: nur lokal testen oder Secret nur in GitHub setzen.

   Optional in `.gitignore` steht bereits nichts Pflichtiges für `gate-secret.js`; die **Standarddatei im Repo** enthält absichtlich `""`, damit Klone ohne Gate laufen. Für lokales Gate die Zeile lokal überschreiben und nicht pushen – oder ein zweites Secret „nur lokal“ nutzen.

## Cookie

- **Name:** `jilg2030_site_access`
- **Wert:** `1`
- **Gültigkeit:** 7 Tage, `path=/`, `SameSite=Lax` (bei HTTPS zusätzlich `Secure`)

Cookie löschen = Passwort wird beim nächsten Besuch wieder verlangt.

## Dateien

| Datei | Rolle |
|-------|--------|
| `js/gate.js` | Logik: Cookie prüfen, Overlay, Vergleich |
| `js/gate-built.js` | **Eine Datei:** Zeile 1 = Passwort (CI), Rest = Gate-Logik (aus `gate.js`). Lokal mit `""` = kein Gate. |
| `js/gate.js` | Quelle für die Logik; Workflow baut daraus `gate-built.js` |
| `.github/workflows/pages.yml` | Schritt „Build gate-built.js“ vor Upload |

Alle Seiten laden nur **`js/gate-built.js`** (kein zweiter Request mehr – vermeidet leere/alte `gate-secret.js` durch Cache oder falschen Deploy).
