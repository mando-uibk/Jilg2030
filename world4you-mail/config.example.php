<?php
/**
 * Kopieren nach config.php und ausfüllen.
 * config.php NICHT ins öffentliche Git-Repo committen (Passwort!).
 */

return [
    'smtp_host'     => 'smtp.world4you.com',
    'smtp_port'     => 587,
    'smtp_secure'   => 'tls', // STARTTLS
    'smtp_user'     => 'buergermeister@jilg2030.at',
    'smtp_pass'     => 'HIER_POSTFACH_PASSWORT',
    'from_email'    => 'buergermeister@jilg2030.at',
    'from_name'     => 'Jilg 2030',
    'subject'       => 'Danke – Ihr Programm-Einstieg (Jilg 2030)',
    // Nach erfolgreichem Versand:
    'redirect_ok'   => 'https://jilg2030.at/danke.html',
    // Bei Fehler (optional eigene Seite):
    'redirect_err'  => 'https://jilg2030.at/eintragung.html?fehler=1',
];
