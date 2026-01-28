GeoSave – Location-basiertes Notfall- und Verwaltungs-Tool

GeoSave ist eine moderne Webanwendung, die es Benutzern ermöglicht, Standorte zu melden, Anfragen zu verwalten und Daten übersichtlich über Dashboards darzustellen. Das Projekt kombiniert Next.js, TypeScript, PostgreSQL, JWT-Authentifizierung, Leaflet-Karten und modulares CSS für eine saubere und wartbare Gestaltung.

Features:
Backend & Datenmanagement:

Vollständig implementierte Datenbanktabellen für Anfragen mit Anbindung an das Backend.
Benutzerverwaltung inklusive Registrierung und Rollen (User / Admin).
Optimierte Datenbankabfragen und Datenanzeige für schnelle und effiziente Nutzung.
Fehlerbehandlung mit try/catch in allen API-Requests.

Authentifizierung & Sicherheit:
JWT-basierte Authentifizierung für sichere Anmeldung.
Benutzer- und Adminzugriffe korrekt gesteuert.
Logout-Funktion implementiert, um Sitzungen sicher zu beenden.
Frontend & UI/UX
Titel- und Landingpage professionell gestaltet.

Admin-Dashboard: Alle Anfragen übersichtlich dargestellt, inklusive von Benutzern gemeldeter Standorte.

Benutzerseite: Zentrale Buttons für schnelle Aktionen.
Formulare vollständig stilisiert mit modularem CSS für sauberes Styling.
Popups zur Bestätigung nach Standortmeldungen.
Responsive Design für Desktop und mobile Endgeräte.
Leaflet-Karten zur visuellen Darstellung von Standorten.

Intelligente Analyse:
Auf Grundlage der Koordinaten und Zeitstempel jeder gemeldeten Position versucht der Dienst mithilfe von Google Gemini AI, eine realistische Einschätzung zu erstellen, was an diesem Ort zu dieser Zeit passiert sein könnte.
Das Ergebnis wird zusammen mit der Meldung gespeichert und auf der Adminseite angezeigt.
Priorisierung von möglichen Ereignissen basierend auf Umgebung, Tageszeit und Wochentag.

Dashboards & Datenvisualisierung
Individuelle Dashboards für Benutzer und Admins.
Effiziente Darstellung von Anfragen.
Alle wichtigen Funktionalitäten mobil zugänglich, inklusive zentraler Buttons auf der Benutzerseite.

Nutzung:
Registrierung und Login über die Benutzeroberfläche.
Standort melden → Popup-Bestätigung erscheint.
Admins haben Zugriff auf alle Anfragen, inklusive der durch Gemini analysierten Ereignisse.
Dashboards zeigen individuelle Daten abhängig von der Rolle.

Tech Stack
Frontend: Next.js, TypeScript, modulares CSS, Leaflet
Backend: Next.js API-Routen, Node.js, TypeScript
Datenbank: PostgreSQL
Authentifizierung: JWT
KI-Integration: Google Gemini AI (für Ereignisvorhersage)

Lizenz
Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.
