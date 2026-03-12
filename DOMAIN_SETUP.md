# jilg2030.at – World4You + GitHub Pages + E-Mail

Domain ist bei **World4You** inkl. E-Mail. Die **Website** läuft weiter auf **GitHub Pages** – E-Mail bleibt bei World4You (MX unverändert).

## Schritt 1: GitHub – Custom Domain eintragen

1. Repo **Jilg2030** auf GitHub öffnen → **Settings** → **Pages**.
2. Unter **Custom domain** eintragen: **`jilg2030.at`** (ohne `https://`).
3. **Save** – GitHub zeigt dir, welche DNS-Einträge fehlen (meist A-Records).
4. Wenn alles passt: **Enforce HTTPS** aktivieren (kann einige Minuten bis Stunden dauern, bis Zertifikat da ist).

Die **CNAME-Datei** im Repo-Root (siehe unten) muss **`jilg2030.at`** enthalten – ist bereits angelegt, nach DNS-Check committen & pushen.

## Schritt 2: DNS bei World4You

Im **World4You Kundenbereich** → Domain **jilg2030.at** → **DNS / Nameserver / Zone**.

### A) Nur Apex-Domain `jilg2030.at` (empfohlen zum Start)

**A-Records** für **`@`** (oder `jilg2030.at` – je nach Panel) auf **alle vier** GitHub-IPs:

| Typ | Host | Wert |
|-----|------|------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

*(Aktuelle IPs: [GitHub Docs – Configuring an apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain))*

### B) Optional: `www.jilg2030.at`

- **CNAME** für **`www`** → **`mando-uibk.github.io`**  
  Oder in GitHub unter Pages nur **www** als Domain eintragen und CNAME entsprechend setzen – dann leitet GitHub oft von Apex auf www um, je nach Einstellung.

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

## Probleme

- **404 auf jilg2030.at:** DNS noch nicht überall da – warten oder mit `nslookup jilg2030.at` prüfen.
- **Certificate error:** HTTPS bei GitHub erst nach erfolgreichem DNS; „Enforce HTTPS“ ggf. später aktivieren.
- **E-Mail geht nicht mehr:** MX versehentlich geändert – bei World4You Support / Doku MX wiederherstellen.
