// BEARBEITEN: Zentrale Neuigkeiten fuer die Website.
// Eintraege sind nur sichtbar, wenn das heutige Datum zwischen visibleFrom und visibleUntil liegt.
// Datumsformat: JJJJ-MM-TT

(function () {
  "use strict";

  window.SITE_NEWS = [
    {
      title: "Willkommen im Hayat-Jiyan",
      dateLabel: "Aktueller Hinweis",
      text: "Schön, dass Sie da sind. Bei Fragen zu Reservierungen, Allergien oder Feiern sprechen Sie uns gerne an."
    },
    {
      title: "Fußball-WM Live!",
      dateLabel: "Alle Deutschland-Spiele",
      text: "Wir übertragen alle Spiele der deutschen Nationalmannschaft live bei uns im Restaurant. Kommt vorbei und fiebert mit! Sichert euch am besten frühzeitig einen Tisch."
    },
    {
      title: "Geschlossene Gesellschaft am 16.05.2026",
      dateLabel: "Samstag, 16.05.2026",
      visibleFrom: "2026-05-13",
      visibleUntil: "2026-05-17",
      closedDates: ["2026-05-16"],
      text:
        "Aufgrund einer geschlossenen Gesellschaft bleibt unser Restaurant an diesem Abend geschlossen. Wir bitten um Verständnis und entschuldigen uns für die Unannehmlichkeiten."
    }
  ];
})();
