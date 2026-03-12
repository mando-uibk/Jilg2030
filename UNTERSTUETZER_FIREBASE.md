# Unterstützungsliste – Firebase Firestore

Die Seite **`unterstuetzer.html`** ist statisch (GitHub Pages). **Live-Liste + Eintragen** funktioniert über **Firebase Firestore** (Google, kostenloser Spark-Plan reicht).

## 1. Firebase-Projekt anlegen

1. https://console.firebase.google.com → **Projekt hinzufügen**
2. Name z. B. `jilg2030` → Projekt erstellen

## 2. Web-App registrieren

1. Projekt öffnen → Zahnrad → **Projekteinstellungen**
2. Runter zu **Meine Apps** → **Web** (`</>`) wählen
3. Spitzname z. B. `jilg2030-web` → **App registrieren**
4. **`firebaseConfig`** kopieren (apiKey, authDomain, projectId, …)

## 3. Firestore aktivieren

1. Linke Menüleiste → **Firestore Database** → **Datenbank erstellen**
2. Modus **Testmodus** nur zum Testen – für Live **Produktionsmodus** und Regeln wie unten
3. Region wählen (z. B. `europe-west3`)

## 4. Sicherheitsregeln (wichtig)

**Firestore** → **Regeln**:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /supporters/{docId} {
      // Jeder darf die Liste lesen (öffentliche Unterstützerwand)
      allow read: if true;
      // Nur neues Dokument anlegen, keine Updates/Löschung durch Clients
      allow create: if request.resource.data.vorname is string
        && request.resource.data.nachname is string
        && request.resource.data.vorname.size() > 0
        && request.resource.data.vorname.size() < 100
        && request.resource.data.nachname.size() > 0
        && request.resource.data.nachname.size() < 100;
      allow update, delete: if false;
    }
  }
}
```

**Veröffentlichen** klicken.

## 5. Config in die Seite eintragen

In **`unterstuetzer.html`** im `<script>`-Block **`firebaseConfig`** ersetzen:

```js
var firebaseConfig = {
  apiKey: "…",
  authDomain: "….firebaseapp.com",
  projectId: "…",
  // … rest aus der Firebase Console
};
```

Dann committen und pushen.

**Hinweis:** `apiKey` bei Firebase ist für Web-Apps gedacht und durch Regeln geschützt – trotzdem keine Admin-Rechte in den Regeln geben.

## 6. Index für `createdAt`

Beim ersten Aufruf kann Firestore einen **Index** verlangen. Link in der Fehlermeldung öffnen → Index erstellen.  
Oder: Firestore → **Indexe** → zusammengesetzter Index für Collection `supporters`, Feld `createdAt` absteigend.

## Alternative ohne Firebase

- **Google Sheet + Apps Script** (doPost/doGet) – mehr Bastelarbeit
- **Nur manuell:** Namen in einer JSON-Datei im Repo pflegen – nicht „live“ durch Besucher

## Datenschutz

Öffentliche Liste mit Namen – kurz im Impressum/Datenschutz erwähnen, dass der Name öffentlich erscheint.
