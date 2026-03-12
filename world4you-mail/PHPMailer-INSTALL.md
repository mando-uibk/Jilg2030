# PHPMailer installieren (falls der Ordner `PHPMailer/src` fehlt)

## Option A – ZIP (ohne Composer)

1. Im Browser öffnen:  
   https://github.com/PHPMailer/PHPMailer/releases  
2. Neueste **6.x** Version → **Source code (zip)** laden.
3. ZIP entpacken.
4. Aus dem entpackten Ordner den Unterordner **`src`** komplett kopieren nach:
   ```
   world4you-mail/PHPMailer/src/
   ```
   Also z. B. diese Dateien müssen liegen:
   - `PHPMailer/src/PHPMailer.php`
   - `PHPMailer/src/SMTP.php`
   - `PHPMailer/src/Exception.php`
   - … (weitere Dateien im gleichen Ordner)

5. Struktur muss so aussehen:
   ```
   world4you-mail/
     send-thanks.php
     PHPMailer/
       src/
         PHPMailer.php
         SMTP.php
         Exception.php
         ...
   ```

## Option B – PowerShell (einmalig)

Im Ordner `world4you-mail` ausführen:

```powershell
$zip = "$env:TEMP\PHPMailer.zip"
Invoke-WebRequest -Uri "https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.3.zip" -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\pm" -Force
$root = Get-ChildItem "$env:TEMP\pm" -Directory | Select-Object -First 1
New-Item -ItemType Directory -Path "PHPMailer\src" -Force
Copy-Item -Path "$($root.FullName)\src\*" -Destination "PHPMailer\src" -Recurse -Force
```

## Option C – Composer (auf dem Server oder lokal)

```bash
cd world4you-mail
composer require phpmailer/phpmailer
```

Dann nutzt `send-thanks.php` automatisch `vendor/autoload.php` – der Ordner `PHPMailer/src` ist dann nicht nötig.

## Prüfen

Wenn `send-thanks.php` ohne „PHPMailer fehlt“ läuft (oder lokal testen):

```bash
php -r "require 'PHPMailer/src/PHPMailer.php'; echo 'OK';"
```
