// Zentrale Bewertungen fuer die Website.
// Nur hier pflegen; die Karten auf der Startseite aktualisieren sich automatisch.
// Beispiel:
// {
//   author: "M. Yilmaz",
//   rating: 5,
//   date: "vor 2 Wochen",
//   text: "Sehr freundlicher Service und top Essen."
// }

(function () {
  "use strict";

  window.SITE_REVIEWS = {
    averageRating: "",
    totalRatings: "",
    googleMapsUrl:
      "https://www.google.com/maps/place/Hayat-Jiyan+Restaurant/@51.2605482,7.1380626,17z/data=!4m8!3m7!1s0x47b8d7ac00cb9a29:0xdf5761f218b776e9!8m2!3d51.2605482!4d7.1380626!9m1!1b1!16s%2Fg%2F1td9pmbs?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
    items: [
      {
        author: "daniel r",
        rating: 5,
        date: "vor 7 Monaten",
        text:
          "Ein echtes Juwel mit Seele und Geschichte! Wer ehrliche Kueche, authentisches Flair und ein warmes Willkommen sucht, ist hier genau richtig! Das ist keine 08/15-Gaststaette, sondern ein Ort mit Charakter - irgendwo zwischen rheinischer Kneipe, Wohnzimmer und kulturellem Treffpunkt. Die Tagesgerichte sind kreativ und hausgemacht - dazu ein frisch gezapftes Bier einfach top. Auch die vegetarischen Gerichte sind liebevoll zubereitet. Innen ein nostalgischer Mix aus alten Telefonen, historischen Fotos, Kunst und Kneipenkultur - man merkt: Hier steckt Geschichte und Herzblut drin. Der Service ist freundlich, das Publikum angenehm bunt - von Stammgaesten ueber Familien bis hin zu Kulturfans. Besonders schoen: die kleinen Details ueberall, die Waende erzaehlen ihre eigenen Geschichten. Ich komme definitiv wieder - mit Freunden, Hunger und Lust auf Atmosphaere. Grosse Empfehlung!"
      },
      {
        author: "M J",
        rating: 5,
        date: "vor 8 Jahren",
        text:
          "Immer wieder ein Highlight! Super leckeres Essen, Bier und Wein zu sehr fairen Preisen. Mehmet und seine Familie sind sehr freundliche Gastgeber und man fuehlt sich wohl."
      },
      {
        author: "Phil St.",
        rating: 5,
        date: "vor 5 Monaten",
        text:
          "Das Hayat ist eines dieser Restaurants in Wuppertal, welches man unbedingt einmal ausprobiert haben sollte. Von aussen eher unscheinbar und innen eher rustikal, ueberzeugt es aber durch ein tolles Personal und ein super leckeres Essen zu einem wirklich guenstigen Preis! Wir waren uebrigens mit 8 Leuten dort und mein Eindruck wurde von den Anderen bestaetigt. Fazit: klare Empfehlung!"
      }
    ]
  };
})();
