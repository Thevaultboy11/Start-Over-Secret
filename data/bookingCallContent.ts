export interface BookingCallContent {
  hero: {
    title: string;
    body: string;
    button: string;
  };
  whyConsultations: {
    title: string;
    paragraphs: string[];
    button: string;
  };
  trust: {
    title: string;
    name: string;
    bullets: string[];
  };
}

export const bookingCallContentEN: BookingCallContent = {
  hero: {
    title: "Have you found your authentic self?",
    body: "Do you feel like you can't get out of bed? Your friends notice that \"you're not the same as before.\" Do you look at old photos and say, \"I was only happy back then.\" This was me one year ago!",
    button: "Book Meeting",
  },
  whyConsultations: {
    title: "Why Consultations?",
    paragraphs: [
      "After 15 years of working with people, you’d think I’d have lost faith in humanity.",
      "(Although — very true at times! 😊)",
      "Hearing my clients laugh after seeing their hopeless faces reminds me why I chose psychology.",
      "From personal experience, I’ve learned that no motivational book or video can help when life feels unbearable.",
      "Healing begins when we choose to face our pain. For me, that journey began in therapy. I went from crying every day to finding joy again — laughing with my kids, living life like I was in my teens again.",
      "So that is the only way I can help you move from a bad place, or even better get from a good place to an even better one!",
    ],
    button: "Reserve on Calendly",
  },
  trust: {
    title: "Why Would You Trust Me?",
    name: "Elma Dzananovic",
    bullets: [
      "Over 15 years of experience in HR, education, and psychology",
      "Certified Gestalt Psychologist, Gestalt Center \"Mind & Body\"",
      "Certified \"Points of You\" Explorer & Trainer (Alphabet Group, 2023)",
      "10+ satisfied therapy and coaching clients",
    ],
  },
};

export const bookingCallContentBS: BookingCallContent = {
  hero: {
    title: "Da li si pronašla svog autentičnog sebe?",
    body: "Da li se osjećaš da ne možeš izaći iz kreveta? Tvoji prijatelji primijete da \"nisi ista kao prije\". Da li gledaš stare slike i kažeš: \"Samo tada sam bila sretna.\" Ovo sam ja bila prije godinu dana!",
    button: "Zakaži sastanak",
  },
  whyConsultations: {
    title: "Zašto konsultacije?",
    paragraphs: [
      "Nakon 15 godina rada s ljudima, pomislila bi da sam izgubila vjeru u čovječanstvo.",
      "(Iako — ponekad je to zaista tačno! 😊)",
      "Kad čujem klijente kako se ponovo smiju nakon lica bez nade, sjetim se zašto sam izabrala psihologiju.",
      "Iz ličnog iskustva sam naučila da nijedna motivaciona knjiga ili video ne može pomoći kada život postane nepodnošljiv.",
      "Iscjeljenje počinje kada odlučimo da se suočimo sa svojom boli. Za mene je taj put počeo terapijom. Od svakodnevnog plakanja došla sam do toga da opet osjećam radost — smijem se sa svojom djecom i živim kao u tinejdžerskim danima.",
      "To je jedini način na koji ti mogu pomoći da pređeš iz lošeg stanja, ili još bolje — iz dobrog u još bolje!",
    ],
    button: "Rezerviši termin na Calendly",
  },
  trust: {
    title: "Zašto bi mi vjerovala?",
    name: "Elma Džananović",
    bullets: [
      "Više od 15 godina iskustva u HR-u, obrazovanju i psihologiji",
      "Certificirani Gestalt psiholog, Gestalt centar \"Mind & Body\"",
      "Certificirani \"Points of You\" Explorer & Trainer (Alphabet Group, 2023)",
      "10+ zadovoljnih klijenata u terapiji i coachingu",
    ],
  },
};

export const calendlyBookingLink = "https://calendly.com/dzananovicelma83/30min";
