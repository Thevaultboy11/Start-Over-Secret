export interface IndexPageContent {
  head: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    cta: string;
  };
  formula: {
    title: string;
    description: string;
    strengthTitle: string;
    strengthItems: { primary: string; secondary: string }[];
    drainTitle: string;
    drainItems: { primary: string; secondary: string }[];
    cta: string;
  };
  quiz: {
    title: string;
    description: string;
    getTitle: string;
    getItems: string[];
    notTitle: string;
    notItems: string[];
    cta: string;
  };
  app: {
    title: string;
    description: string;
    previewTitle: string;
    previewAlts: string[];
    openScreenshotLabel: string;
    cta: string;
    screenshotAltPrefix: string;
  };
  finalCta: {
    title: string;
    description: string;
    note: string;
    button: string;
  };
}

export const indexPageContentEN: IndexPageContent = {
  head: {
    title: "Inner Compass – 1:1 Psychotherapy, Quiz and App",
    description:
      "Rebuild your self-worth without repeating old relationship patterns. Psychotherapy, ex-quiz, and healing tracker app — all in one place.",
  },
  hero: {
    title: "Stop Reliving the Same Relationship Patterns",
    description:
      "Let me guess you’re here because you’re tired of watching self-help TikToks. New clothes or another workout won’t fix the deeper pain. You deserve support that actually makes you feel like yourself again.",
    cta: "Start My Session",
  },
  formula: {
    title: "The Inner Compass Formula",
    description:
      "I know how it feels when everything gets blurry and heavy. Self-help books helped, but they weren’t enough on their own. What moved me forward was realizing emotional wellness depends on more than information — it’s shaped by several factors.",
    strengthTitle: "Emotional Strength Factors",
    strengthItems: [
      {
        primary: "Breakup Knowledge",
        secondary: "Understanding what heals and what prolongs pain.",
      },
      {
        primary: "Support System",
        secondary: "Having people who listen and help you stay grounded.",
      },
      {
        primary: "Mental Resilience",
        secondary: "Your ability to stay steady when emotions rise.",
      },
    ],
    drainTitle: "Emotional Drain Factors",
    drainItems: [
      {
        primary: "Physical Exhaustion",
        secondary: "Feeling drained makes emotions harder to manage.",
      },
      {
        primary: "Emotional Turbulence",
        secondary: "Intense, unpredictable feelings cloud your clarity.",
      },
      {
        primary: "Fear of Change",
        secondary: "Worry about the unknown keeps you stuck in place.",
      },
    ],
    cta: "Start My Session",
  },
  quiz: {
    title: "The Ex Quiz: Reality Check, Not Fantasy",
    description:
      "After a relationship ends, our brain replays only the good moments, almost like emotional withdrawal. It’s easy to forget reality. That’s why I made a 25-question quiz to help you understand clearly if going back to your ex is the right choice.",
    getTitle: "What You&apos;ll Get",
    getItems: [
      "See your emotional blind spots clearly.",
      "Avoid getting stuck in regret or rebound cycles.",
      "Get simple next steps based on your score.",
    ],
    notTitle: "This Is Not",
    notItems: [
      "No email funnels and no generic answers.",
      "Your results stay anonymous and are never saved.",
    ],
    cta: "Take the Ex Quiz",
  },
  app: {
    title: "Your Healing, Inside an App",
    description:
      "Because so much of our life happens online, your healing should too. I built an app where you can track your progress, practice handling uncomfortable moments, and stay connected to the little things that make you feel like you again.",
    previewTitle: "A Glimpse Inside the App",
    previewAlts: [
      "Inner Compass dashboard preview",
      "Track progress inside the Inner Compass app",
      "Emergency support feature in the app",
      "Emotional practice scenario in the Inner Compass app",
    ],
    openScreenshotLabel: "Open screenshot",
    cta: "Try the App",
    screenshotAltPrefix: "App screenshot",
  },
  finalCta: {
    title: "Ready to stop doing this alone?",
    description:
      "General advice won’t patch the scars on your soul. In a 1:1 session, we make sense of what you’re going through and decide together what actually makes sense for you.",
    note: "If it turns out this isn’t the right step for you, I’ll tell you honestly — and you’re free to walk away. No pressure, just clarity.",
    button: "Book My Session",
  },
};

export const indexPageContentBS: IndexPageContent = {
  head: {
    title: "Unutrašnji Kompas – 1:1 Psihoterapija, Kviz i Aplikacija",
    description:
      "Vrati svoje samopoštovanje bez ponavljanja starih šablona u vezama. Psihoterapija, kviz o bivšem i aplikacija za praćenje iscjeljenja — na jednom mjestu.",
  },
  hero: {
    title: "Prestani ponavljati iste obrasce u vezama",
    description:
      "Pretpostavljam da si ovdje jer si umorna od beskonačnih self-help savjeta. Nova odjeća ili još jedan trening ne liječe dublju bol. Zaslužuješ podršku koja će ti stvarno pomoći da se ponovo osjetiš kao svoja.",
    cta: "Započni svoju sesiju",
  },
  formula: {
    title: "Formula Unutrašnjeg Kompasa",
    description:
      "Znam kako je kada sve postane mutno i teško. Self-help knjige mogu pomoći, ali često nisu dovoljne same po sebi. Napredak dolazi kada shvatiš da emocionalno iscjeljenje zavisi od više faktora, ne samo od informacija.",
    strengthTitle: "Faktori emocionalne snage",
    strengthItems: [
      {
        primary: "Znanje o prekidu",
        secondary: "Razumijevanje šta liječi, a šta produžava bol.",
      },
      {
        primary: "Sistem podrške",
        secondary: "Ljudi koji te slušaju i pomažu da ostaneš stabilna.",
      },
      {
        primary: "Mentalna otpornost",
        secondary: "Sposobnost da ostaneš smirena kad emocije porastu.",
      },
    ],
    drainTitle: "Faktori emocionalnog iscrpljivanja",
    drainItems: [
      {
        primary: "Fizička iscrpljenost",
        secondary: "Kad si iscrpljena, emocije je teže regulisati.",
      },
      {
        primary: "Emocionalna turbulencija",
        secondary: "Intenzivna i nepredvidiva osjećanja zamagljuju jasnoću.",
      },
      {
        primary: "Strah od promjene",
        secondary: "Briga o nepoznatom te drži zaglavljenom na mjestu.",
      },
    ],
    cta: "Započni svoju sesiju",
  },
  quiz: {
    title: "Kviz o bivšem: Realnost, ne fantazija",
    description:
      "Nakon prekida, mozak često vraća samo lijepe trenutke, skoro kao emocionalnu apstinenciju. Lako je izgubiti kontakt sa realnošću. Zato sam napravila kviz od 25 pitanja koji ti pomaže da jasno procijeniš da li je povratak bivšem dobra odluka.",
    getTitle: "Šta dobijaš",
    getItems: [
      "Jasnije vidiš svoje emocionalne slijepe tačke.",
      "Izbjegavaš krug kajanja i povratka iz usamljenosti.",
      "Dobijaš jednostavne naredne korake prema svom rezultatu.",
    ],
    notTitle: "Šta ovo nije",
    notItems: [
      "Nema email zamki ni generičkih odgovora.",
      "Rezultati su anonimni i nigdje se ne pohranjuju.",
    ],
    cta: "Uradi kviz o bivšem",
  },
  app: {
    title: "Tvoje iscjeljenje, unutar aplikacije",
    description:
      "Pošto se veliki dio života odvija online, i tvoje iscjeljenje može biti tamo. Napravila sam aplikaciju u kojoj pratiš svoj napredak, vježbaš kako da se nosiš s teškim trenucima i ostaješ povezana sa stvarima koje te vraćaju sebi.",
    previewTitle: "Pogled unutar aplikacije",
    previewAlts: [
      "Pregled početne stranice Unutrašnji Kompas aplikacije",
      "Praćenje napretka u aplikaciji Unutrašnji Kompas",
      "Funkcija hitne podrške u aplikaciji",
      "Scenarij emocionalne vježbe u aplikaciji",
    ],
    openScreenshotLabel: "Otvori screenshot",
    cta: "Isprobaj aplikaciju",
    screenshotAltPrefix: "Screenshot aplikacije",
  },
  finalCta: {
    title: "Spremna da prestaneš prolaziti kroz ovo sama?",
    description:
      "Opšti savjeti ne mogu zaliječiti ožiljke na duši. U 1:1 sesiji zajedno razumijemo kroz šta prolaziš i biramo ono što zaista ima smisla za tebe.",
    note: "Ako se ispostavi da ovo nije pravi korak za tebe, reći ću ti iskreno — i slobodna si da odeš. Bez pritiska, samo jasnoća.",
    button: "Rezerviši svoju sesiju",
  },
};
