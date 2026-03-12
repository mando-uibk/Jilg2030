# jilg2030.at – World4You + GitHub Pages + E-Mail

Domain ist bei **World4You** inkl. E-Mail. Die **Website** läuft weiter auf **GitHub Pages** – E-Mail bleibt bei World4You (MX unverändert).

## Schritt 1: GitHub – Custom Domain eintragen

1. Repo **Jilg2030** auf GitHub öffnen → **Settings** → **Pages**.
2. Unter **Custom domain** eintragen: **`jilg2030.at`** (ohne `https://`).
3. **Save** – GitHub zeigt dir, welche DNS-Einträge fehlen (meist A-Records).
4. Wenn alles passt: **Enforce HTTPS** aktivieren (kann einige Minuten bis Stunden dauern, bis Zertifikat da ist).

Die **CNAME-Datei** im Repo-Root (siehe unten) muss **`jilg2030.at`** enthalten – ist bereits angelegt, nach DNS-Check committen & pushen.

## Schritt 2: DNS bei World4You

Im **World4You Kundenbereich** → **Domains → DNS** (oder DNS-Verwaltung für **jilg2030.at**).  
„Neuen DNS-Eintrag hinzufügen“ / ähnlich.

### Unter welchem Namen die A-Records anlegen?

Für die **nackte Domain** `jilg2030.at` (ohne www) braucht ihr **A-Records für die Root-Zone**. Bei World4You ist das fast immer:

| Was im Feld „Hostname“ / „Name“ steht | Bedeutung |
|--------------------------------------|-----------|
| **`@`** | Root-Domain = **jilg2030.at** ← **das wollt ihr für die 4 A-Records** |
| **leer** | Manche Panels behandeln leer wie `@` – wenn es `@` nicht gibt, probieren |
| **`www`** | Nur Subdomain www – **nicht** für Apex verwenden |

**Nicht** `jilg2030.at` als Hostname doppelt eintragen, wenn das Panel sonst `jilg2030.at.jilg2030.at` erzeugt – bei World4You reicht **`@`**.

Ihr legt **vier separate A-Einträge** an, **alle mit demselben Hostnamen `@`**, jeweils **eine** der IPs:

| Typ | Hostname (World4You) | Ziel / Wert |
|-----|----------------------|-------------|
| A | **`@`** | `185.199.108.153` |
| A | **`@`** | `185.199.109.153` |
| A | **`@`** | `185.199.110.153` |
| A | **`@`** | `185.199.111.153` |

*(IPs laut [GitHub – Apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)).*

### „Alternate name“ / www – Pflicht für GitHub-Meldung

Wenn GitHub meldet **„jilg2030.at and its alternate name are improperly configured“**, fehlt meist noch **`www`**:

| Typ | Hostname | Ziel (wichtig: **ohne** `/Jilg2030`) |
|-----|----------|----------------------------------------|
| **CNAME** | **`www`** | **`mando-uibk.github.io`** |

Genau **so**: CNAME von `www` auf **`mando-uibk.github.io`** (User-Pages-Host – auch bei **Project Site** laut GitHub so; Repo-Name **nicht** anhängen).

Ohne diese CNAME-Eintrag kann GitHub `www.jilg2030.at` nicht auflösen → **InvalidDNSError**.

### E-Mail nicht anfassen

- **MX-Records** und ggf. **SPF/DKIM** von World4You **nicht löschen** – sonst funktioniert E-Mail nicht mehr.
- Nur **zusätzlich** die A- (und optional CNAME-)Einträge für die Website setzen.

DNS-Propagierung: oft **15 Min – 48 h**. Danach `https://jilg2030.at` testen.

## Schritt 3: Repo nachziehen (URLs)

Nach dem Umzug:

- **Formspree `_next`** muss auf **`https://jilg2030.at/danke.html`** zeigen (in `eintragung.html` bereits angepasst nach Push).
- **programm-willkommen.txt** – Link auf Programmseite auf **jilg2030.at** stellen.
- Alte **github.io**-Links können als Redirect weiter funktionieren; für Besucher ist die **Haupt-URL jilg2030.at**.

## Schritt 4: Checkliste

| Task | Wo |
|------|-----|
| Custom domain in GitHub Pages | Repo → Settings → Pages |
| CNAME-Datei im Repo | `CNAME` mit Inhalt `jilg2030.at` |
| A-Records @ → 4× GitHub-IP | World4You DNS |
| MX für Mail unverändert | World4You |
| HTTPS erzwingen | GitHub Pages, nach grünem DNS-Check |
| Formspree Redirect | `eintragung.html` → danke auf jilg2030.at |

## InvalidDNSError – „DNS record could not be retrieved“

GitHub kann die Zone **öffentlich** nicht so abfragen, wie es erwartet. Häufige Ursachen:

1. **A-Records fehlen oder stehen nicht auf `@`** – siehe Tabelle oben, **4× A** mit Host **`@`**.
2. **`www` fehlt** – **CNAME** `www` → `mando-uibk.github.io` anlegen (siehe oben).
3. **Nameserver** – Domain muss die **World4You-Nameserver** nutzen, in deren Panel ihr die Einträge setzt. Wenn die Domain extern auf andere NS zeigt, müsst ihr die Records **dort** setzen.
4. **Noch nicht propagiert** – nach dem Speichern **15 Min bis 24 h** warten, dann in GitHub **Save** am Custom domain nochmal klicken.
5. **Prüfen von Windows aus:**  
   `nslookup jilg2030.at`  
   `nslookup www.jilg2030.at`  
   Erwartung: A-Records der vier GitHub-IPs bzw. CNAME auf `mando-uibk.github.io`.

[GitHub Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## Weitere Probleme

- **404 auf jilg2030.at:** DNS noch nicht überall da – warten oder `nslookup` prüfen.
- **Certificate error:** HTTPS bei GitHub erst nach erfolgreichem DNS; „Enforce HTTPS“ ggf. später aktivieren.
- **E-Mail geht nicht mehr:** MX versehentlich geändert – bei World4You MX wiederherstellen.
