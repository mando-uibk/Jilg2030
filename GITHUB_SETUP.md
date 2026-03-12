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

1. Repo auf GitHub öffnen → **Settings** → **Pages**
2. **Source:** Branch **main**, Ordner **/** (root)
3. Speichern – nach 1–2 Minuten:  
   `https://DEIN_USERNAME.github.io/Jilg2030/`

## Optional: GitHub CLI (`gh`)

Wenn du `gh` installierst und einloggst:

```powershell
gh auth login
cd "c:\Users\Armando\Desktop\Cursor\Jilg2030"
gh repo create Jilg2030 --public --source=. --remote=origin --push
```

Dann wird das Repo erstellt und sofort gepusht.
