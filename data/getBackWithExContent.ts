export interface GetBackWithExContent {
  start: {
    title: string;
    subtitle: string;
    startButton: string;
  };
  afterTest: {
    title: string;
    afterQuizTitle: string;
    afterQuizItems: string[];
    insightsTitle: string;
    insightsItems: string[];
  };
  midCta: {
    title: string;
    body: string;
    button: string;
  };
  quiz: {
    stepTitle: string;
    instructions: string;
    submit: string;
  };
  results: {
    analysisTitle: string;
    lowScoreParagraphs: string[];
    lowScoreListTitle: string;
    lowScoreList: string[];
    highScoreParagraphs: string[];
    highScoreListTitle: string;
    highScoreList: string[];
    consultationBoxTitle: string;
    consultationBoxItems: string[];
    consultationButton: string;
    reuniteIndexLabel: string;
    charts: {
      factorBreakdownTitle: string;
      factorBreakdownSubtitle: string;
      detailedScoresTitle: string;
      detailedScoresSubtitle: string;
      overallGaugeTitle: string;
      overallGaugeSubtitle: string;
      lastContactTitle: string;
      lastContactSubtitle: string;
      retakeQuiz: string;
      factorLegendLabel: string;
      scoreLegendLabel: string;
      radarLabels: string[];
      barLabels: {
        emotionalReadiness: string;
        trustPastIssues: string;
        compatibilityDynamics: string;
        personalGrowth: string;
        externalFactors: string;
      };
    };
  };
}

export const getBackWithExContentEN: GetBackWithExContent = {
  start: {
    title: 'Should I Go Back With My Ex',
    subtitle:
      'Not sure if going back is right? This 25-question quiz breaks it down with emotional charts and healing insight. Fast. Free.',
    startButton: 'Find Your Answer',
  },
  afterTest: {
    title: 'What You’ll Get After the Test',
    afterQuizTitle: '🎯 After the Quiz, You’ll Know:',
    afterQuizItems: [
      'Your current emotional blind spots',
      'How to avoid the cycle of regret or rebound',
      'What actions to take based on your score',
    ],
    insightsTitle: '📊 Detailed Insights:',
    insightsItems: [
      'Trust, growth, and compatibility percentages',
      '4+ interactive graphs built from your answers',
      '“Last Contact” timeline insight',
    ],
  },
  midCta: {
    title: 'Should You Reconnect With Your Ex?',
    body: 'Answer honestly and get clear next steps before making an emotional decision.',
    button: 'Find Your Answer',
  },
  quiz: {
    stepTitle: 'Step 1 · Answer the 25 questions',
    instructions:
      'Choose the option that fits best. Sliders run from 1 = low to 10 = high. Once every question is filled in, the “See Results” button unlocks.',
    submit: 'See Results',
  },
  results: {
    analysisTitle: 'Analysis & What to Look For in the Charts Below',
    lowScoreParagraphs: [
      'Your Reunite Index and factor charts show there is still emotional pain and unmet needs. Going back now would likely bring more hurt than healing.',
      'The charts clearly show which areas—like trust, boundaries, and emotional safety—need your attention first.',
      'If you want guidance on how to improve these areas, I can support you through an initial consultation focused on your next best steps.',
    ],
    lowScoreListTitle: 'Here’s what you get in the initial consultation:',
    lowScoreList: [
      'Personalized guidance for your healing journey',
      'Simple exercises to regain emotional clarity',
      'Professional support from a licensed psychologist',
      'A practical plan tailored to your situation',
    ],
    highScoreParagraphs: [
      'Your score shows potential for reconnecting, but the charts still highlight areas that need work before rebuilding safely.',
      'If you want help interpreting these results and planning your next move, book an initial consultation and we can map your path together.',
      'You’ll get clear advice and practical support so your decision is grounded and intentional.',
    ],
    highScoreListTitle: 'In your initial consultation, you’ll receive:',
    highScoreList: [
      'Direct expert feedback on your specific situation',
      'Exercises to strengthen trust, communication, and boundaries',
      'A focused session with a licensed psychologist',
      'Action steps designed for your relationship goals',
    ],
    consultationBoxTitle: 'Ready to book your initial consultation?',
    consultationBoxItems: [
      'One-on-one conversation focused on your case',
      'Clear next steps you can apply right away',
      'Professional psychological support',
      'A confidential and safe space for your decision-making',
    ],
    consultationButton: 'Book a Call',
    reuniteIndexLabel: 'Your Reunite Index',
    charts: {
      factorBreakdownTitle: 'Factor Breakdown',
      factorBreakdownSubtitle: 'Balance of Readiness, Trust, Compatibility, Growth & Factors.',
      detailedScoresTitle: 'Detailed Scores',
      detailedScoresSubtitle: 'See which factors fall below the healthy 70+ zone.',
      overallGaugeTitle: 'Overall Gauge',
      overallGaugeSubtitle: 'Quick glance at your readiness score.',
      lastContactTitle: 'Last Contact',
      lastContactSubtitle: 'How recent interaction affects emotional readiness.',
      retakeQuiz: 'Retake Quiz',
      factorLegendLabel: 'Factor Scores',
      scoreLegendLabel: 'Scores',
      radarLabels: [
        'Emotional Readiness',
        'Trust & Past Issues',
        'Compatibility & Dynamics',
        'Personal Growth',
        'External Factors',
      ],
      barLabels: {
        emotionalReadiness: 'Emotional Readiness',
        trustPastIssues: 'Trust & Past Issues',
        compatibilityDynamics: 'Compatibility & Dynamics',
        personalGrowth: 'Personal Growth',
        externalFactors: 'External Factors',
      },
    },
  },
};

export const getBackWithExContentBS: GetBackWithExContent = {
  start: {
    title: 'Da li da se vratim bivšem?',
    subtitle:
      'Nisi sigurna da li je povratak prava odluka? Ovaj kviz sa 25 pitanja daje ti jasniju sliku kroz emocionalne grafikone i uvide za iscjeljenje. Brzo i besplatno.',
    startButton: 'Saznaj svoj odgovor',
  },
  afterTest: {
    title: 'Šta dobijaš nakon testa',
    afterQuizTitle: '🎯 Nakon kviza ćeš znati:',
    afterQuizItems: [
      'Koje su tvoje trenutne emocionalne slijepe tačke',
      'Kako izbjeći krug kajanja i povratka na staro',
      'Koje korake da poduzmeš na osnovu rezultata',
    ],
    insightsTitle: '📊 Detaljni uvidi:',
    insightsItems: [
      'Procente povjerenja, rasta i kompatibilnosti',
      '4+ interaktivna grafikona kreirana iz tvojih odgovora',
      'Uvid kroz vremensku liniju “Posljednji kontakt”',
    ],
  },
  midCta: {
    title: 'Da li se trebate ponovo povezati?',
    body: 'Odgovori iskreno i dobij jasne naredne korake prije nego doneseš emotivnu odluku.',
    button: 'Saznaj svoj odgovor',
  },
  quiz: {
    stepTitle: 'Korak 1 · Odgovori na 25 pitanja',
    instructions:
      'Izaberi opciju koja te najbolje opisuje. Klizači idu od 1 = nisko do 10 = visoko. Kada odgovoriš na sva pitanja, dugme “Vidi rezultate” se otključava.',
    submit: 'Vidi rezultate',
  },
  results: {
    analysisTitle: 'Analiza i šta da gledaš na grafikonima ispod',
    lowScoreParagraphs: [
      'Tvoj Reunite Index i faktorski grafikoni pokazuju da još postoji mnogo emocionalne boli i nezadovoljenih potreba. Povratak sada bi vjerovatno donio više boli nego iscjeljenja.',
      'Grafikoni jasno pokazuju koja područja—poput povjerenja, granica i emocionalne sigurnosti—prvo trebaju pažnju.',
      'Ako želiš smjernice kako da poboljšaš ova područja, mogu ti pomoći kroz inicijalnu konsultaciju usmjerenu na tvoje naredne korake.',
    ],
    lowScoreListTitle: 'Evo šta dobijaš kroz inicijalnu konsultaciju:',
    lowScoreList: [
      'Personalizovane smjernice za tvoj put iscjeljenja',
      'Jednostavne vježbe za vraćanje emocionalne jasnoće',
      'Stručnu podršku licenciranog psihologa',
      'Praktičan plan prilagođen tvojoj situaciji',
    ],
    highScoreParagraphs: [
      'Tvoj rezultat pokazuje potencijal za ponovno povezivanje, ali grafikoni i dalje ističu oblasti koje treba urediti prije sigurnog obnavljanja odnosa.',
      'Ako želiš pomoć da pravilno protumačiš rezultate i isplaniraš naredni korak, zakaži inicijalnu konsultaciju i zajedno ćemo postaviti pravac.',
      'Dobit ćeš jasne savjete i praktičnu podršku da tvoja odluka bude stabilna i promišljena.',
    ],
    highScoreListTitle: 'Na inicijalnoj konsultaciji dobijaš:',
    highScoreList: [
      'Direktan stručni feedback za tvoju konkretnu situaciju',
      'Vježbe za jačanje povjerenja, komunikacije i granica',
      'Fokusiran razgovor sa licenciranim psihologom',
      'Korake prilagođene tvojim ciljevima u odnosu',
    ],
    consultationBoxTitle: 'Spremna da zakažeš inicijalnu konsultaciju?',
    consultationBoxItems: [
      'Razgovor 1-na-1 fokusiran na tvoj slučaj',
      'Jasni naredni koraci koje možeš odmah primijeniti',
      'Profesionalna psihološka podrška',
      'Povjerljiv i siguran prostor za donošenje odluke',
    ],
    consultationButton: 'Zakaži poziv',
    reuniteIndexLabel: 'Tvoj Reunite Index',
    charts: {
      factorBreakdownTitle: 'Pregled faktora',
      factorBreakdownSubtitle: 'Balans spremnosti, povjerenja, kompatibilnosti, rasta i vanjskih faktora.',
      detailedScoresTitle: 'Detaljni rezultati',
      detailedScoresSubtitle: 'Provjeri koji faktori su ispod zdrave zone od 70+.',
      overallGaugeTitle: 'Ukupni pokazatelj',
      overallGaugeSubtitle: 'Brzi pregled tvoje spremnosti.',
      lastContactTitle: 'Posljednji kontakt',
      lastContactSubtitle: 'Kako recentnost kontakta utiče na emocionalnu spremnost.',
      retakeQuiz: 'Uradi kviz ponovo',
      factorLegendLabel: 'Rezultati faktora',
      scoreLegendLabel: 'Rezultati',
      radarLabels: [
        'Emocionalna spremnost',
        'Povjerenje i stari problemi',
        'Kompatibilnost i dinamika',
        'Lični rast',
        'Vanjski faktori',
      ],
      barLabels: {
        emotionalReadiness: 'Emocionalna spremnost',
        trustPastIssues: 'Povjerenje i stari problemi',
        compatibilityDynamics: 'Kompatibilnost i dinamika',
        personalGrowth: 'Lični rast',
        externalFactors: 'Vanjski faktori',
      },
    },
  },
};
