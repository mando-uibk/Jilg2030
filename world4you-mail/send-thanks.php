<?php
/**
 * Dankes-Mail nach Eintragung – ohne Formspree.
 * Läuft nur auf Webspace mit PHP (z. B. World4You), nicht auf GitHub Pages.
 *
 * Voraussetzung: PHPMailer im Ordner PHPMailer/ (siehe README)
 * oder: composer require phpmailer/phpmailer und Autoload anpassen.
 */

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: https://jilg2030.at/eintragung.html', true, 302);
    exit;
}

// Honeypot (Bots füllen oft versteckte Felder)
if (!empty($_POST['website'] ?? '')) {
    header('Location: https://jilg2030.at/danke.html', true, 302);
    exit;
}

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
if (!$email) {
    header('Location: https://jilg2030.at/eintragung.html?fehler=1', true, 302);
    exit;
}

$configFile = __DIR__ . '/config.php';
if (!is_readable($configFile)) {
    http_response_code(500);
    echo 'Konfiguration fehlt. Siehe world4you-mail/README.md';
    exit;
}
$config = require $configFile;

$bodyFile = __DIR__ . '/email-body.txt';
$body = is_readable($bodyFile) ? file_get_contents($bodyFile) : 'Vielen Dank für Ihre Eintragung.';

// PHPMailer laden (manuell installiert)
$phpmailerSrc = __DIR__ . '/PHPMailer/src';
if (is_dir($phpmailerSrc)) {
    require_once $phpmailerSrc . '/Exception.php';
    require_once $phpmailerSrc . '/PHPMailer.php';
    require_once $phpmailerSrc . '/SMTP.php';
} else {
    // Composer
    $autoload = __DIR__ . '/vendor/autoload.php';
    if (is_readable($autoload)) {
        require_once $autoload;
    } else {
        http_response_code(500);
        echo 'PHPMailer fehlt. Siehe world4you-mail/README.md';
        exit;
    }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int) $config['smtp_port'];

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($email);
    $mail->addReplyTo($config['from_email'], $config['from_name']);
    $mail->Subject = $config['subject'];
    $mail->Body    = $body;
    $mail->isHTML(false);

    $mail->send();
} catch (Exception $e) {
    error_log('send-thanks.php: ' . $mail->ErrorInfo);
    header('Location: ' . ($config['redirect_err'] ?? 'https://jilg2030.at/eintragung.html?fehler=1'), true, 302);
    exit;
}

header('Location: ' . ($config['redirect_ok'] ?? 'https://jilg2030.at/danke.html'), true, 302);
exit;
