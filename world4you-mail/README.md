# Dankes-Mail ohne Formspree (World4You SMTP)

Die **statische Site** auf GitHub Pages kann **keine** E-Mails versenden.  
Statt Formspree nutzt ihr **euer World4You-Postfach** (`buergermeister@jilg2030.at`) per **SMTP** – dafür braucht ihr **PHP-Webspace** (z. B. kleines Paket bei World4You oder ein Unterordner auf bestehendem Hosting).

## Was ihr braucht

1. **Webspace mit PHP** (World4You Webhosting oder anderes, Domain zeigt darauf **oder** nur ein Unterordner per URL erreichbar).
2. **PHPMailer** (einmalig hochladen).
3. **`config.php`** mit SMTP-Zugang (Passwort vom Postfach – **nie** öffentlich committen).

## World4You SMTP (laut Panel)

| Einstellung | Wert |
|-------------|------|
| Server | `smtp.world4you.com` |
| Port | **587** |
| Verschlüsselung | **STARTTLS** |
| Benutzer | `buergermeister@jilg2030.at` |
| Passwort | Postfach-Passwort |

## Schritt 1: PHPMailer

- ZIP von https://github.com/PHPMailer/PHPMailer/releases laden  
- Entpacken, den Ordner **`src`** nach **`world4you-mail/PHPMailer/src`** legen  
  (also `send-thanks.php` und `PHPMailer/src/PHPMailer.php` liegen im gleichen Webroot-Unterordner).

Alternativ per SSH/Composer im Upload-Ordner:

```bash
composer require phpmailer/phpmailer
```

Dann in `send-thanks.php` ist der `vendor/autoload.php`-Zweig aktiv.

## Schritt 2: config.php

```bash
cp config.example.php config.php
```

`config.php` bearbeiten: **`smtp_pass`** = Passwort von `buergermeister@jilg2030.at`.  
**`config.php` nicht ins Git** – steht in `.gitignore` im Repo-Root falls ihr den Ordner mitversioniert.

## Schritt 3: Upload

Per **FTP/SFTP** den Ordnerinhalt nach z. B.:

- `https://jilg2030.at/mail/send-thanks.php`  
  oder  
- `https://mail.jilg2030.at/send-thanks.php` (wenn ihr einen VHost/Subdomain mit PHP habt)

Wichtig: **URL muss per HTTPS erreichbar sein**, damit das Formular nicht blockiert wird.

## Schritt 4: Formular auf der Website

In **`eintragung.html`** (GitHub Pages):

```html
<form action="https://jilg2030.at/mail/send-thanks.php" method="POST">
  <label for="email">E-Mail-Adresse</label>
  <input type="email" id="email" name="email" required ... />
  <!-- Honeypot: per CSS verstecken -->
  <input type="text" name="website" value="" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />
  <button type="submit">Programm zuschicken</button>
</form>
```

Die **action-URL** muss exakt auf eure hochgeladene **`send-thanks.php`** zeigen.

## Sicherheit

- **Honeypot** `website` ist im Skript eingebaut – leer lassen im HTML (Bots ausfüllen → still redirect).
- Optional: **Rate-Limit** (z. B. pro IP nur X Mails/Tag) später nachrüsten.
- **config.php** mit `.htaccess` schützen oder außerhalb von `public_html` legen, wenn der Hoster das erlaubt.

## Kein PHP-Hosting?

Dann bleibt nur: **mailto:**-Link oder Weiterleitung auf ein anderes Backend. Ohne Server **kein** zuverlässiger automatischer Versand ohne Drittanbieter wie Formspree.
