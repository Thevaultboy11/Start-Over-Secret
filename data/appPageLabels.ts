export interface AppPageLabels {
  dashboard: {
    loadingAuth: string;
    title: string;
    noUserData: string;
    healingStreak: string;
    averageMood: string;
    mostUsedActivities: string;
    emergencyTitle: string;
    emergencyDescription: string;
    emergencyButton: string;
  };
  addRecordings: {
    loading: string;
    title: string;
    header: string;
    titleLabel: string;
    titlePlaceholder: string;
    moodLabel: string;
    moodScale: string;
    likelihoodLabel: string;
    likelihoodScale: string;
    activitiesLabel: string;
    submitButton: string;
    modalTitle: string;
    modalMessage: string;
  };
  exButton: {
    title: string;
    header: string;
    button: string;
  };
  emotionalGym: {
    title: string;
    loading: string;
    scenarioCount: string;
    loadMore: string;
    submitAnswer: string;
    correct: string;
    incorrect: string;
    previous: string;
    next: string;
  };
  recordings: {
    loadingAuth: string;
    title: string;
    latestReflections: string;
    chartTitle: string;
    chartDescription: string;
    chartMoodLabel: string;
    chartReturnLabel: string;
    recentLogTitle: string;
    recentLogDescription: string;
    noReflections: string;
    viewAllInfo: string;
    dialogReflection: string;
    dialogMood: string;
    dialogReturnLikelihood: string;
    dialogReflectionText: string;
    dialogActivities: string;
  };
}

export const appPageLabelsEN: AppPageLabels = {
  dashboard: {
    loadingAuth: 'Loading Auth...',
    title: 'Dashboard',
    noUserData: 'No user data found.',
    healingStreak: 'Healing Streak',
    averageMood: 'Average Mood',
    mostUsedActivities: 'Most Used Healing Activities',
    emergencyTitle: 'In Case of Emergency',
    emergencyDescription:
      'When you’re on the verge of texting your ex, hit this. It’s your safety net — redirect your energy, not your message.',
    emergencyButton: 'Open Support Tool >',
  },
  addRecordings: {
    loading: 'Loading...',
    title: 'Add Record',
    header: 'Add Reflection',
    titleLabel: 'Title:',
    titlePlaceholder: 'Enter reflection title',
    moodLabel: 'Mood',
    moodScale: '/10:',
    likelihoodLabel: 'Likelihood to text back',
    likelihoodScale: '/5:',
    activitiesLabel: 'Activities Completed',
    submitButton: 'Submit Reflection',
    modalTitle: 'Submission Error',
    modalMessage: "You've already submitted a reflection for today.",
  },
  exButton: {
    title: 'Ex Button',
    header: 'Remember Your Journey',
    button: 'More Strength',
  },
  emotionalGym: {
    title: 'Emotional Gym',
    loading: 'Loading...',
    scenarioCount: 'Scenario {{current}} of {{total}}',
    loadMore: 'Load more',
    submitAnswer: 'Submit Answer',
    correct: 'Correct ✅',
    incorrect: 'Incorrect ❌ — Your answer: “{{answer}}”',
    previous: 'Previous',
    next: 'Next',
  },
  recordings: {
    loadingAuth: 'Loading auth...',
    title: 'Recordings',
    latestReflections: 'Latest Reflections',
    chartTitle: 'Mood & Return Likelihood Over Time',
    chartDescription:
      'This graph shows your recent mood trends and how likely you felt about going back to your ex.',
    chartMoodLabel: 'Mood',
    chartReturnLabel: 'Return Likelihood',
    recentLogTitle: 'Recent Reflection Log',
    recentLogDescription:
      'Below are your latest 5 notes. You can view more details by clicking the view button.',
    noReflections: 'No reflections yet. Start by adding your first!',
    viewAllInfo: 'View all info',
    dialogReflection: 'Reflection -',
    dialogMood: 'Mood:',
    dialogReturnLikelihood: 'Return Likelihood:',
    dialogReflectionText: 'Reflection:',
    dialogActivities: 'Activities:',
  },
};

export const appPageLabelsBS: AppPageLabels = {
  dashboard: {
    loadingAuth: 'Učitavanje autentifikacije...',
    title: 'Kontrolna Tabla',
    noUserData: 'Nema pronađenih korisničkih podataka.',
    healingStreak: 'Niz Iscjeljenja',
    averageMood: 'Prosječno Raspoloženje',
    mostUsedActivities: 'Najčešće Aktivnosti Iscjeljenja',
    emergencyTitle: 'U Hitnom Slučaju',
    emergencyDescription:
      'Kada si na ivici da pošalješ poruku bivšem, pritisni ovo. Ovo je tvoja sigurnosna mreža — preusmjeri energiju, a ne poruku.',
    emergencyButton: 'Otvori Alat za Podršku >',
  },
  addRecordings: {
    loading: 'Učitavanje...',
    title: 'Dodaj Zabilješku',
    header: 'Dodaj Refleksiju',
    titleLabel: 'Naslov:',
    titlePlaceholder: 'Unesite naslov refleksije',
    moodLabel: 'Raspoloženje',
    moodScale: '/10:',
    likelihoodLabel: 'Vjerovatnoća da se javiš bivšem',
    likelihoodScale: '/5:',
    activitiesLabel: 'Završene Aktivnosti',
    submitButton: 'Pošalji Refleksiju',
    modalTitle: 'Greška pri slanju',
    modalMessage: 'Već si unijela refleksiju za danas.',
  },
  exButton: {
    title: 'Dugme za Bivšeg',
    header: 'Sjeti se svog putovanja',
    button: 'Još Snage',
  },
  emotionalGym: {
    title: 'Emocionalna Teretana',
    loading: 'Učitavanje...',
    scenarioCount: 'Scenario {{current}} od {{total}}',
    loadMore: 'Prikaži više',
    submitAnswer: 'Pošalji odgovor',
    correct: 'Tačno ✅',
    incorrect: 'Netačno ❌ — Tvoj odgovor: “{{answer}}”',
    previous: 'Prethodni',
    next: 'Sljedeći',
  },
  recordings: {
    loadingAuth: 'Učitavanje autentifikacije...',
    title: 'Zabilješke',
    latestReflections: 'Najnovije Refleksije',
    chartTitle: 'Raspoloženje i Vjerovatnoća Povratka Tokom Vremena',
    chartDescription:
      'Ovaj grafikon prikazuje trend tvog raspoloženja i koliko si osjećala vjerovatnoću da se vratiš bivšem.',
    chartMoodLabel: 'Raspoloženje',
    chartReturnLabel: 'Vjerovatnoća Povratka',
    recentLogTitle: 'Nedavni Zapisnik Refleksija',
    recentLogDescription:
      'Ispod je posljednjih 5 bilješki. Možeš vidjeti više detalja klikom na dugme za pregled.',
    noReflections: 'Još nema refleksija. Počni dodavanjem svoje prve!',
    viewAllInfo: 'Prikaži sve informacije',
    dialogReflection: 'Refleksija -',
    dialogMood: 'Raspoloženje:',
    dialogReturnLikelihood: 'Vjerovatnoća Povratka:',
    dialogReflectionText: 'Refleksija:',
    dialogActivities: 'Aktivnosti:',
  },
};
