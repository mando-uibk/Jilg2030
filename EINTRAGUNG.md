# Eintragung + Dankes-Mail ohne Formspree

## Voraussetzung

**GitHub Pages kann keine E-Mails senden.**  
Ohne Formspree braucht ihr **PHP-Webspace** (z. B. World4You Hosting), auf dem **`send-thanks.php`** liegt und per **SMTP** mit `buergermeister@jilg2030.at` versendet.

## Ablauf

1. Besucher trägt E-Mail auf **`eintragung.html`** ein → Formular **POST** an eure **`send-thanks.php`**-URL.
2. Skript prüft Adresse, verschickt **Dankes-Mail** (Text aus `world4you-mail/email-body.txt`) per **smtp.world4you.com**.
3. Weiterleitung auf **`danke.html`**.

## Einrichtung

Siehe **`world4you-mail/README.md`** – PHPMailer, `config.php`, Upload, dann in **`eintragung.html`** die **form action** auf die echte URL setzen (z. B. `https://jilg2030.at/mail/send-thanks.php`).

## Ohne PHP-Hosting

Dann ist **kein** automatischer Mailversand ohne Drittanbieter möglich – nur **mailto:** oder weiterhin ein Dienst wie Formspree.
