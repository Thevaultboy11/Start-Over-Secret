export const translations = {
  en: {
    /* ───────────── LOGIN PAGE ───────────── */
    loginPage: {
      title: "Log In",
      instructionsLine1: "First time logging in?",
      instructionsLine2: "You must confirm your email before using the app.",

      emailLabel: "Email",
      passwordLabel: "Password",

      didNotCreateAccount: "Did Not Create Account?",
      forgotPassword: "Forgot Password?",

      loginButton: "Log In",

      needEmailVerification:
        "⚠️ You need to confirm your email before logging in. Check your inbox or spam folder.",
      loginSuccess: "🎉 Login successful!",

      errors: {
        wrongPassword: "Incorrect password.",
        userNotFound: "No account found with this email.",
        invalidEmail: "Invalid email address.",
        userDisabled: "This account has been disabled.",
        tooManyRequests: "Too many attempts. Please try again later.",
        unknown: "An unknown error occurred.",
      },
    },

    /* ───────────── SIGNUP PAGE ───────────── */
    signupPage: {
      title: "Create Your Healing Account",

      emailLabel: "Email",
      emailHelper: "We’ll send a confirmation link to this address 💌",

      passwordLabel: "Password",
      passwordHelper: "Password must be at least 6 characters with letters and numbers.",

      createAccountButton: "Create Account",

      quickSignupInfo:
        "Quick signup. No phone verification, no annoying personal questions!",

      successTitle: "✅ Next Step",
      successLine1: "• Go to your email inbox",
      successLine2: "• Check spam/promotions folder",
      successLine3: "• The email comes from",
      successLine4: "• Click the confirmation link",
      successLine5: "• You'll be redirected automatically",
      successThankYou: "Thank you for protecting our community! 💖",
      successTrialInfo:
        "• You can use the Breakup Aid Kit app completely free for the first 7 days—even if you don’t buy the bundle. This first week is my little gift to you. After that the account will be deleted.",

      snackbarSuccess: "✅ Account created! Please check your email.",

      errors: {
        emailInUse: "Email is already in use.",
        invalidEmail: "Invalid email format.",
        signUpDisabled: "Email sign-up is currently disabled.",
        weakPassword: "Password is too weak.",
        tooManyRequests: "Too many attempts. Try again later.",
        unknown: "An unknown error occurred.",
      },
    },

    /* ───────────── FORGOT PASSWORD PAGE ───────────── */
    forgotPasswordPage: {
      title: "Forgot Password",
      heading: "Forgot Your Password?",
      emailLabel: "Email",
      emailHelper: "We'll send you a link to reset it 📩",
      resetButton: "Send Reset Link",
      noSpamText: "We'll never spam you. 💖",

      messages: {
        success: "✅ Password reset email sent! Check your inbox.",
        userNotFound: "No user found with this email.",
        invalidEmail: "Invalid email address format.",
        tooManyRequests: "Too many requests. Please try again later.",
        unknown: "Something went wrong. Please try again.",
      },
    },

    /* ───────────── CONTACT PAGE ───────────── */
    contactPage: {
      title: "Contact Us",

      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone Number (optional)",
        comment: "Comment",
      },

      errors: {
        required: "Please fill in all required fields.",
        invalidEmail: "Please enter a valid email address.",
        submissionFailed: "Submission failed. Please try again later.",
        unknown: "Something went wrong. Please try again.",
      },

      submitButton: "Send Message",
      successMessage: "Message sent successfully!",
    },

    /* ───────────── BOTTOM NAVIGATION ───────────── */
    bottomNav: {
      emotionalGym: "Emotional Gym",
      dashboard: "Dashboard",
    },

    /* ───────────── TOP NAVIGATION ───────────── */
    topNav: {
      brand: "UnutrasnjiKompas",

      links: {
        home: "Home",
        bookingCall: "Book a Session",
        getBackWithEx: "Get Back With Ex?",
        contactUs: "Contact Us",
      },

      auth: {
        signIn: "Sign In",
        signUp: "Sign Up",
        logout: "Logout",
      },

      banner: {
        message: "Ready for 1:1 guidance? Book your consultation with Elma.",
      },
    },
    dashboardPage: {
      loadingAuth: "Loading Auth...",
      title: "Dashboard",
      noUserData: "No user data found.",

      healingStreak: "Healing Streak",
      averageMood: "Average Mood",
      mostUsedActivities: "Most Used Healing Activities",

      emergencyTitle: "In Case of Emergency",
      emergencyDescription:
        "When you're on the verge of texting your ex, hit this. It’s your safety net — redirect your energy, not your message.",
      emergencyButton: "Open Support Tool >",
    },
    recordingsPage: {
      loadingAuth: "Loading auth...",
      title: "Recordings",

      latestReflections: "Latest Reflections",

      chartTitle: "Mood & Return Likelihood Over Time",
      chartDescription:
        "This graph shows your recent mood trends and how likely you felt about going back to your ex.",

      recentLogTitle: "Recent Reflection Log",
      recentLogDescription:
        "Below are your latest 5 notes. You can view more details by clicking the view button.",

      noReflections: "No reflections yet. Start by adding your first!",

      viewAllInfo: "View all info",

      dialog: {
        reflection: "Reflection - ",
        mood: "Mood:",
        returnLikelihood: "Return Likelihood:",
        reflectionText: "Reflection:",
        activities: "Activities:",
      },
    },
    addRecordingsPage: {
      loading: "Loading...",
      title: "Add Record",
      header: "Add Reflection",

      titleLabel: "Title:",
      titlePlaceholder: "Enter reflection title",

      moodLabel: "Mood",
      moodScale: "/10:",

      likelihoodLabel: "Likelihood to text back",
      likelihoodScale: "/5:",

      activitiesLabel: "Activities Completed",

      submitButton: "Submit Reflection",

      modalTitle: "Submission Error",
      modalMessage: "You've already submitted a reflection for today.",

      activities: {
        exercise: "✅ Exercise",
        therapy: "💬 Therapy",
        socialTime: "🧑‍🤝‍🧑 Social Time",
        hydration: "💧 Hydration",
        breathing: "🌬️ Breathing",
        dryBrushing: "🪥 Dry Brushing",
        huggedSomeone: "🤗 Hugged Someone",
        tookBath: "🛁 Took a Bath",
        healthyMeal: "🥗 Ate a Healthy Meal",
        nap: "😴 Took a Nap",
        spiritualPractice: "✨ Spiritual Practice",
        creativeHobby: "🎨 Creative Hobby",
        meditated: "🧘 Meditated"
      }
    },
    common: {
      loading: "Loading..."
    },
    exButtonPage: {
      title: "Ex Button",
      header: "Remember Your Journey",
      button: "More Strength"
    },
    emotionalGymPage: {
      title: "Emotional Gym",
      loading: "Loading...",

      scenarioCount: "Scenario {{current}} of {{total}}",

      loadMore: "Load more",
      submitAnswer: "Submit Answer",

      correct: "Correct ✅",
      incorrect: "Incorrect ❌ — Your answer: “{{answer}}”",

      previous: "Previous",
      next: "Next"
    },
    getBackWithExPage: {
      // Start screen
      title: "Should I Go Back With My Ex",
      subtitle: "Not sure if going back is right? This 25-question quiz breaks it down with emotional charts and healing insight. Fast. Free.",
      findYourAnswer: "Find Your Answer",

      // Start → What You'll Get section
      whatYouGetTitle: "What You’ll Get After the Test",
      afterQuizKnow: "🎯 After the Quiz, You’ll Know:",
      blindSpots: "Your current emotional blind spots",
      avoidCycle: "How to avoid the cycle of regret or rebound",
      actionsToTake: "What actions to take based on your score",

      detailedInsights: "📊 Detailed Insights:",
      trustGrowthCompatibility: "Trust, growth, and compatibility percentages",
      interactiveGraphs: "4+ interactive graphs built from your answers",
      lastContactInsight: "“Last Contact” timeline insight",

      // CTA block
      ctaTitle: "Alice Dautovic Ex Quiz",
      ctaSubtitle: "Reflect on your past relationship with honesty—get the clarity you need to either walk away stronger or rebuild with intention.",

      // Quiz Intro
      quizStepTitle: "Step 1 · Answer the 25 questions",
      quizInstructions: "Choose the option that fits best. Sliders run from 1 = low to 10 = high. Once every question is filled in, the “See Results” button unlocks.",

      questionLabel: "Question",
      ofLabel: "of",

      seeResults: "See Results",

      // Results Page
      analysisTitle: "Analysis & What to Look For in the Charts Below",

      // Low score text trigger label (we won't translate paragraphs yet)
      // High score version is handled in data file later

      // Results → Chart titles
      factorBreakdown: "Factor Breakdown",
      factorBreakdownSubtitle: "Balance of Readiness, Trust, Compatibility, Growth & Factors.",

      detailedScores: "Detailed Scores",
      detailedScoresSubtitle: "See which factors fall below the healthy 70+ zone.",

      overallGauge: "Overall Gauge",
      overallGaugeSubtitle: "Quick glance at your readiness score.",

      lastContact: "Last Contact",
      lastContactSubtitle: "How recent interaction affects emotional readiness.",

      // Gauge center "/ 100"
      slash100: "/ 100",

      // Retake Quiz
      retakeQuiz: "Retake Quiz",
    }
  },

  /* ======================================================================= */
  /* ============================= BOSNIAN ================================= */
  /* ======================================================================= */

  bs: {
    /* ───────────── LOGIN PAGE ───────────── */
    loginPage: {
      title: "Prijava",
      instructionsLine1: "Prvi put se prijavljujete?",
      instructionsLine2:
        "Morate potvrditi svoju email adresu prije korištenja aplikacije.",

      emailLabel: "Email",
      passwordLabel: "Lozinka",

      didNotCreateAccount: "Niste kreirali račun?",
      forgotPassword: "Zaboravili lozinku?",

      loginButton: "Prijavi se",

      needEmailVerification:
        "⚠️ Morate potvrditi email prije prijave. Provjerite inbox ili spam folder.",
      loginSuccess: "🎉 Uspješna prijava!",

      errors: {
        wrongPassword: "Pogrešna lozinka.",
        userNotFound: "Nema naloga sa ovom email adresom.",
        invalidEmail: "Neispravna email adresa.",
        userDisabled: "Ovaj nalog je deaktiviran.",
        tooManyRequests: "Previše pokušaja. Pokušajte kasnije.",
        unknown: "Došlo je do greške.",
      },
    },

    /* ───────────── SIGNUP PAGE ───────────── */
    signupPage: {
      title: "Kreirajte Svoj Healing Račun",

      emailLabel: "Email",
      emailHelper: "Poslat ćemo vam link za potvrdu na ovu adresu 💌",

      passwordLabel: "Lozinka",
      passwordHelper:
        "Lozinka mora imati najmanje 6 karaktera i kombinaciju slova i brojeva.",

      createAccountButton: "Kreiraj račun",

      quickSignupInfo:
        "Brza registracija. Bez verifikacije telefona, bez ličnih pitanja!",

      successTitle: "✅ Sljedeći Korak",
      successLine1: "• Idite u svoj email inbox",
      successLine2: "• Provjerite spam/promotions folder",
      successLine3: "• Email dolazi sa adrese",
      successLine4: "• Kliknite na link za potvrdu",
      successLine5: "• Bit ćete automatski preusmjereni",
      successThankYou: "Hvala vam što štitite našu zajednicu! 💖",
      successTrialInfo:
        "• Breakup Aid Kit aplikaciju možete koristiti potpuno besplatno prvih 7 dana — čak i ako ne kupite paket. Ova sedmica je moj mali poklon vama. Nakon toga, račun će biti obrisan.",

      snackbarSuccess: "✅ Račun kreiran! Provjerite svoj email.",

      errors: {
        emailInUse: "Email je već u upotrebi.",
        invalidEmail: "Neispravan format email adrese.",
        signUpDisabled: "Registracija putem emaila je trenutno onemogućena.",
        weakPassword: "Lozinka je preslaba.",
        tooManyRequests: "Previše pokušaja. Pokušajte ponovo kasnije.",
        unknown: "Došlo je do greške.",
      },
    },

    /* ───────────── FORGOT PASSWORD PAGE ───────────── */
    forgotPasswordPage: {
      title: "Zaboravljena Lozinka",
      heading: "Zaboravili ste lozinku?",
      emailLabel: "Email",
      emailHelper: "Poslat ćemo vam link za resetiranje lozinke 📩",
      resetButton: "Pošalji link za reset",
      noSpamText: "Nikada vas nećemo spamati. 💖",

      messages: {
        success: "✅ Email za reset lozinke je poslan! Provjerite inbox.",
        userNotFound: "Nije pronađen korisnik sa ovom email adresom.",
        invalidEmail: "Neispravan format email adrese.",
        tooManyRequests: "Previše pokušaja. Pokušajte kasnije.",
        unknown: "Došlo je do greške. Pokušajte ponovo.",
      },
    },

    /* ───────────── CONTACT PAGE ───────────── */
    contactPage: {
      title: "Kontaktirajte Nas",

      fields: {
        name: "Ime",
        email: "Email",
        phone: "Broj telefona (opcionalno)",
        comment: "Komentar",
      },

      errors: {
        required: "Molimo popunite sva obavezna polja.",
        invalidEmail: "Unesite ispravnu email adresu.",
        submissionFailed: "Slanje nije uspjelo. Pokušajte ponovo kasnije.",
        unknown: "Došlo je do greške. Pokušajte ponovo.",
      },

      submitButton: "Pošalji Poruku",
      successMessage: "Poruka uspješno poslata!",
    },

    /* ───────────── BOTTOM NAVIGATION ───────────── */
    bottomNav: {
      emotionalGym: "Emocionalna Teretana",
      dashboard: "Kontrolna Tabla",
    },

    /* ───────────── TOP NAVIGATION ───────────── */
    topNav: {
      brand: "UnutrasnjiKompas",

      links: {
        home: "Početna",
        bookingCall: "Zakaži sastanak",
        getBackWithEx: "Vratiti se s bivšim?",
        contactUs: "Kontaktirajte Nas",
      },

      auth: {
        signIn: "Prijava",
        signUp: "Registracija",
        logout: "Odjava",
      },

      banner: {
        message: "Spremna za 1:1 podršku? Zakaži konsultacije sa Elmom.",
      },
    },
  },
  dashboardPage: {
    loadingAuth: "Učitavanje autentifikacije...",
    title: "Kontrolna Tabla",
    noUserData: "Nema pronađenih korisničkih podataka.",

    healingStreak: "Niz Iscjeljenja",
    averageMood: "Prosječno Raspoloženje",
    mostUsedActivities: "Najčešće Aktivnosti Iscjeljenja",

    emergencyTitle: "U Hitnom Slučaju",
    emergencyDescription:
      "Kada ste na ivici da pošaljete poruku bivšem, pritisnite ovo. Ovo je vaša sigurnosna mreža — preusmjerite energiju, a ne poruku.",
    emergencyButton: "Otvori Alat za Podršku >",
  },
  recordingsPage: {
      loadingAuth: "Učitavanje autentifikacije...",
      title: "Zabilješke",

      latestReflections: "Najnovije Refleksije",

      chartTitle: "Raspoloženje i Vjerovatnoća Povratka Tokom Vremena",
      chartDescription:
        "Ovaj grafikon prikazuje trend vašeg raspoloženja i koliko ste osjećali vjerovatnoću da se vratite bivšem.",

      recentLogTitle: "Nedavni Zapisnik Refleksija",
      recentLogDescription:
        "Ispod su vaših posljednjih 5 bilješki. Možete vidjeti više detalja klikom na dugme za pregled.",

      noReflections: "Još nema refleksija. Počnite dodavanjem svoje prve!",

      viewAllInfo: "Prikaži sve informacije",

      dialog: {
        reflection: "Refleksija - ",
        mood: "Raspoloženje:",
        returnLikelihood: "Vjerovatnoća Povratka:",
        reflectionText: "Refleksija:",
        activities: "Aktivnosti:",
      },
    },
    addRecordingsPage: {
    loading: "Učitavanje...",
    title: "Dodaj Zabilješku",
    header: "Dodaj Refleksiju",

    titleLabel: "Naslov:",
    titlePlaceholder: "Unesite naslov refleksije",

    moodLabel: "Raspoloženje",
    moodScale: "/10:",

    likelihoodLabel: "Vjerovatnoća da se javite bivšem",
    likelihoodScale: "/5:",

    activitiesLabel: "Završene Aktivnosti",

    submitButton: "Pošalji Refleksiju",

    modalTitle: "Greška pri slanju",
    modalMessage: "Već ste unijeli refleksiju za danas.",

    activities: {
      exercise: "✅ Vježba",
      therapy: "💬 Terapija",
      socialTime: "🧑‍🤝‍🧑 Druženje",
      hydration: "💧 Hidratacija",
      breathing: "🌬️ Disanje",
      dryBrushing: "🪥 Suho četkanje",
      huggedSomeone: "🤗 Zagrlili nekoga",
      tookBath: "🛁 Kupanje",
      healthyMeal: "🥗 Zdrav obrok",
      nap: "😴 Dremka",
      spiritualPractice: "✨ Duhovna praksa",
      creativeHobby: "🎨 Kreativni hobi",
      meditated: "🧘 Meditacija"
    }
  },
  common: {
    loading: "Učitavanje..."
  },

  exButtonPage: {
    title: "Dugme za Bivšeg",
    header: "Sjeti Se Svojeg Putovanja",
    button: "Još Snage"
  },
  emotionalGymPage: {
    title: "Emocionalna Teretana",
    loading: "Učitavanje...",

    scenarioCount: "Scenario {{current}} od {{total}}",

    loadMore: "Prikaži više",
    submitAnswer: "Pošalji odgovor",

    correct: "Tačno ✅",
    incorrect: "Netačno ❌ — Tvoj odgovor: “{{answer}}”",

    previous: "Prethodni",
    next: "Sljedeći"
  },
  getBackWithExPage: {
    // Start screen
    title: "Da li da se vratim bivšem?",
    subtitle: "Nisi sigurna je li povratak ispravan? Ovaj kviz od 25 pitanja ti daje jasnu sliku kroz emocionalne grafikone i uvide. Brzo. Besplatno.",
    findYourAnswer: "Pronađi svoj odgovor",

    // Start → What You'll Get
    whatYouGetTitle: "Šta dobijaš nakon testa",
    afterQuizKnow: "🎯 Nakon kviza saznat ćeš:",
    blindSpots: "Tvoje trenutne emocionalne slijepe tačke",
    avoidCycle: "Kako izbjeći ciklus kajanja ili rebound veze",
    actionsToTake: "Koje korake da preduzmeš prema svom rezultatu",

    detailedInsights: "📊 Detaljni uvidi:",
    trustGrowthCompatibility: "Procente povjerenja, rasta i kompatibilnosti",
    interactiveGraphs: "4+ interaktivna grafikona zasnovana na tvojim odgovorima",
    lastContactInsight: "Uvid u vremensku liniju 'Zadnjeg kontakta'",

    // CTA
    ctaTitle: "Kviz: Da li da se vratim bivšem?",
    ctaSubtitle: "Sagledaj bivšu vezu iskreno—dobij jasnu sliku da li da odeš jača ili da obnoviš s namjerom.",

    // Quiz Intro
    quizStepTitle: "Korak 1 · Odgovori na 25 pitanja",
    quizInstructions: "Izaberi opciju koja te najbolje opisuje. Klizači idu od 1 = nisko do 10 = visoko. Kada odgovoriš na sva pitanja, dugme 'Vidi rezultate' se otključava.",

    questionLabel: "Pitanje",
    ofLabel: "od",

    seeResults: "Vidi rezultate",

    // Results page
    analysisTitle: "Analiza i šta da gledaš na grafikonu ispod",

    // Charts
    factorBreakdown: "Pregled faktora",
    factorBreakdownSubtitle: "Ravnoteža emocionalne spremnosti, povjerenja, kompatibilnosti, rasta i vanjskih faktora.",

    detailedScores: "Detaljni rezultati",
    detailedScoresSubtitle: "Pogledaj koji faktori padaju ispod zdravih 70+.",

    overallGauge: "Opći pokazatelj",
    overallGaugeSubtitle: "Brzi pregled tvoje ukupne spremnosti.",

    lastContact: "Zadnji kontakt",
    lastContactSubtitle: "Kako nedavna komunikacija utiče na emocionalnu spremnost.",

    slash100: "/ 100",

    // Retake
    retakeQuiz: "Ponovi kviz",
  }
};