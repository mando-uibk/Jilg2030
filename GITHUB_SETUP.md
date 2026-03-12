# Repo auf GitHub anlegen und pushen

Ich kann **kein Repository direkt in deinem Account anlegen** – dafür braucht es deine Anmeldung bei GitHub. Lokal ist bereits alles vorbereitet: **Git ist initialisiert**, erster **Commit** ist erledigt, Branch **`main`**.

## Schritt 1: Leeres Repo auf GitHub erstellen

1. Im Browser: **https://github.com/new**
2. **Repository name:** z. B. `Jilg2030` (oder `jilg2030`)
3. **Public** wählen (GitHub Pages kostenlos öffentlich).
4. **Wichtig:** **KEIN** Häkchen bei „Add a README“ / „Add .gitignore“ – Repo soll **leer** bleiben.
5. Auf **Create repository** klicken.

## Schritt 2: Remote hinzufügen und pushen

Auf der nächsten Seite zeigt GitHub die Befehle – oder du führst in **PowerShell** im Projektordner aus (USERNAME und REPO anpassen):

```powershell
cd "c:\Users\Armando\Desktop\Cursor\Jilg2030"

git remote add origin https://github.com/DEIN_USERNAME/Jilg2030.git
git push -u origin main
```

Falls `main` bei dir noch `master` heißt:

```powershell
git branch -M main
git push -u origin main
```

Beim ersten Push fragt Git nach Login – am einfachsten **GitHub-Anmeldung im Browser** oder **Personal Access Token** statt Passwort.

## Schritt 3: GitHub Pages einschalten

### Variante A – Über Actions (empfohlen, Repo enthält `.github/workflows/pages.yml`)

1. Repo auf GitHub öffnen → **Settings** → **Pages**
2. Unter **Build and deployment** → **Source:** **GitHub Actions** wählen (nicht „Deploy from branch“).
3. Einmal **Push** auf `main` auslösen – unter **Actions** sollte „Deploy Pages“ grün werden.
4. URL (nach 1–3 Minuten):  
   `https://DEIN_USERNAME.github.io/Jilg2030/`

### Variante B – Direkt vom Branch

1. **Settings** → **Pages**
2. **Source:** Branch **main**, Ordner **/** (root)
3. Speichern – warten, dann dieselbe URL testen.

### Wenn die Seite „noch nicht verfügbar“ ist (404)

| Prüfen | Wo |
|--------|-----|
| Repo **öffentlich**? | Private Repos brauchen für Pages ggf. andere Einstellungen / Pro. |
| **Pages** wirklich aktiviert? | Settings → Pages – muss grüner Hinweis mit URL erscheinen. |
| **Actions** durchgelaufen? | Tab **Actions** – letzter Lauf muss grün sein; bei Rot: Logs ansehen. |
| Richtige URL? | `https://USERNAME.github.io/RepoName/` – Repo-Name **groß/klein** wie auf GitHub. |
| 5–10 Min warten | Erster Deploy kann verzögert starten. |

Nach dem Hinzufügen des Workflows **unbedingt pushen**:

```powershell
cd "c:\Users\Armando\Desktop\Cursor\Jilg2030"
git add .github/workflows/pages.yml
git commit -m "Add GitHub Actions Pages deploy"
git push origin main
```

## Optional: GitHub CLI (`gh`)

Wenn du `gh` installierst und einloggst:

```powershell
gh auth login
cd "c:\Users\Armando\Desktop\Cursor\Jilg2030"
gh repo create Jilg2030 --public --source=. --remote=origin --push
```

Dann wird das Repo erstellt und sofort gepusht.
