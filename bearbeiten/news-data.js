// BEARBEITEN: Zentrale Neuigkeiten fuer die Website.
// Eintraege sind nur sichtbar, wenn das heutige Datum zwischen visibleFrom und visibleUntil liegt.
// Datumsformat: JJJJ-MM-TT

(function () {
  "use strict";

  window.SITE_NEWS = [
    {
      id: "betriebsurlaub-2026",
      title: "Betriebsurlaub",
      dateLabel: "27.07. – 31.08.2026",
      visibleFrom: "2026-01-01",
      visibleUntil: "2026-08-31",
      modal: true,
      modalDismiss: "never",
      showInNews: true,
      image: "assets/betriebsurlaub-2026.png",
      closedFrom: "2026-07-27",
      closedUntil: "2026-08-31",
      reopen: "2026-09-01",
      closureMessage:
        "In diesem Zeitraum haben wir Betriebsurlaub (27.07.–31.08.2026). Ab dem 01.09.2026 sind wir wieder für euch da. Bitte wählen Sie ein anderes Datum.",
      text:
        "Vom 27.07. bis 31.08.2026 machen wir Betriebsurlaub. Kommt nochmal vorbei, bevor wir in den Urlaub starten. Ab dem 01.09.2026 sind wir wieder für euch in gewohnter Frische da."
    },
    {
      title: "Willkommen im Hayat-Jiyan",
      dateLabel: "Aktueller Hinweis",
      text: "Schön, dass Sie da sind. Bei Fragen zu Reservierungen, Allergien oder Feiern sprechen Sie uns gerne an."
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
