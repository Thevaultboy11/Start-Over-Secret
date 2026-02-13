type Stage = 'start' | 'quiz' | 'results';
type Factor = 'ER' | 'TPI' | 'CD' | 'PG' | 'EF';

interface QuestionBase<T> {
  id: keyof Responses;
  factor: Factor;
  text: string;
  type: 'radio' | 'slider';
  options?: readonly T[];
}
type Question = QuestionBase<string | never>;

interface Responses {
  q1_loveEx?: string;
  q2_missScale?: number;
  q3_thinkFrequency?: string;
  q4_feelingOnSeeing?: string;
  q5_datingDifficulty?: string;
  q6_issuesResolved?: string;
  q7_ownPart?: string;
  q8_problemsSolvable?: string;
  q9_trustEase?: string;
  q10_abuse?: string;
  q11_argumentFreq?: string;
  q12_toxicity?: string;
  q13_sharedValues?: string;
  q14_bestVersion?: string;
  q15_initiator?: string;
  q16_selfFocus?: string;
  q17_exGrowth?: string;
  q18_betterPartner?: string;
  q19_bothGrown?: string;
  q20_confidenceNoRepeat?: string;
  q21_lastContact?: string;
  q22_socialOpinion?: string;
  q23_pressure?: string;
  q24_externalTies?: string;
  q25_willingEffort?: string;
}

interface Scores {
  emotionalReadiness: number;
  trustPastIssues: number;
  compatibilityDynamics: number;
  personalGrowth: number;
  externalFactors: number;
  reuniteIndex: number;
}

interface GraphData {
  lastContactBucket: string;
  radar: number[];
  bars: Omit<Scores, 'reuniteIndex'>;
  gaugeValue: number;
}

interface ResultPayload {
  userId: string;
  timestamp: string;
  responses: Responses;
  scores: Scores;
  flags: { abuse: boolean; autoReject: boolean };
  graphData: GraphData;
}

/* ------------------------------------------------------------------ */
/*  Question list                                                     */
/* ------------------------------------------------------------------ */
export const questionsEN: Question[] = [
  { id: 'q1_loveEx', factor: 'ER', text: 'Do you still love your ex?', type: 'radio', options: ['Yes', 'Some', 'Unsure', 'No'] },
  { id: 'q2_missScale', factor: 'ER', text: 'On a scale of 1‑10, how much do you miss them?', type: 'slider' },
  { id: 'q3_thinkFrequency', factor: 'ER', text: 'How often do you think about your ex?', type: 'radio', options: ['Never', 'Occasionally', 'A lot', 'Constantly'] },
  { id: 'q4_feelingOnSeeing', factor: 'ER', text: 'How do you feel when you see (or imagine) them?', type: 'radio', options: ['Happy', 'Sad', 'Angry', 'Neutral'] },
  { id: 'q5_datingDifficulty', factor: 'ER', text: 'How difficult is it to date someone new?', type: 'radio', options: ['Not difficult', 'Challenging', "Haven’t tried"] },
  { id: 'q6_issuesResolved', factor: 'TPI', text: 'Have the breakup issues been resolved?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q7_ownPart', factor: 'TPI', text: 'Do you both own your part in what went wrong?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q8_problemsSolvable', factor: 'TPI', text: 'Can the old problems be solved now?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q9_trustEase', factor: 'TPI', text: 'How easy would it be to trust your ex again?', type: 'radio', options: ['Can trust', 'Tough', 'Unsure'] },
  { id: 'q10_abuse', factor: 'TPI', text: 'Was there any abuse in the past?', type: 'radio', options: ['No', 'Isolated incident', 'Yes'] },
  { id: 'q11_argumentFreq', factor: 'CD', text: 'How often did you argue?', type: 'radio', options: ['Rarely', 'Sometimes', 'Often', 'Constantly'] },
  { id: 'q12_toxicity', factor: 'CD', text: 'Toxic behaviours or red flags?', type: 'radio', options: ['No', 'Some', 'Yes'] },
  { id: 'q13_sharedValues', factor: 'CD', text: 'Shared values & long‑term goals?', type: 'radio', options: ['Yes', 'Partly', 'No'] },
  { id: 'q14_bestVersion', factor: 'CD', text: 'Did the relationship bring out the best in you?', type: 'radio', options: ['Yes', 'Neutral', 'No'] },
  { id: 'q15_initiator', factor: 'CD', text: 'Who ended the relationship?', type: 'radio', options: ['I did', 'Mutual', 'My ex'] },
  { id: 'q16_selfFocus', factor: 'PG', text: 'Your focus since the breakup?', type: 'radio', options: ['Self‑growth', 'Distraction', 'No change'] },
  { id: 'q17_exGrowth', factor: 'PG', text: 'Has your ex shown personal growth?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q18_betterPartner', factor: 'PG', text: 'Would you be a better partner now?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q19_bothGrown', factor: 'PG', text: 'Have both of you grown emotionally?', type: 'radio', options: ['Yes', 'Partly', 'Not really'] },
  { id: 'q20_confidenceNoRepeat', factor: 'PG', text: 'Confidence the same mistakes won’t repeat?', type: 'radio', options: ['Yes', 'Not sure', 'No'] },
  { id: 'q21_lastContact', factor: 'EF', text: 'Time since last contact with your ex?', type: 'radio', options: ['< 1 week', '1‑4 wks', '1‑3 mths', '> 3 mths'] },
  { id: 'q22_socialOpinion', factor: 'EF', text: 'Friends & family opinion of reconciling?', type: 'radio', options: ['Supportive', 'Mixed', 'Against'] },
  { id: 'q23_pressure', factor: 'EF', text: 'Do you feel pressured to reconcile?', type: 'radio', options: ['No', 'A little', 'Yes'] },
  { id: 'q24_externalTies', factor: 'EF', text: 'External circumstances tying you together?', type: 'radio', options: ['Yes', 'Some', 'No'] },
  { id: 'q25_willingEffort', factor: 'EF', text: 'Are you willing to invest the effort to rebuild?', type: 'radio', options: ['Yes', 'I’ll try', 'Unsure'] },
];
export const questionsBS: Question[] = [
  { id: 'q1_loveEx', factor: 'ER', text: 'Da li još uvijek voliš svog bivšeg?', type: 'radio', options: ['Da', 'Djelimično', 'Nisam sigurna', 'Ne'] },

  { id: 'q2_missScale', factor: 'ER', text: 'Na skali od 1 do 10, koliko ti nedostaje?', type: 'slider' },
  
  { id: 'q3_thinkFrequency', factor: 'ER', text: 'Koliko često misliš na svog bivšeg?', type: 'radio', options: ['Nikada', 'Povremeno', 'Mnogo', 'Stalno'] },
  
  { id: 'q4_feelingOnSeeing', factor: 'ER', text: 'Kako se osjećaš kada ga vidiš (ili zamisliš)?', type: 'radio', options: ['Sretno', 'Tužno', 'Ljuto', 'Neutralno'] },
  
  { id: 'q5_datingDifficulty', factor: 'ER', text: 'Koliko ti je teško izlaziti sa nekim novim?', type: 'radio', options: ['Nije teško', 'Izazovno', 'Nisam pokušala'] },
  
  { id: 'q6_issuesResolved', factor: 'TPI', text: 'Jesu li problemi zbog kojih ste prekinuli sada riješeni?', type: 'radio', options: ['Da', 'Djelimično', 'Ne'] },
  
  { id: 'q7_ownPart', factor: 'TPI', text: 'Da li oboje priznajete svoj dio odgovornosti za ono što je pošlo po zlu?', type: 'radio', options: ['Da', 'Djelimično', 'Ne'] },
  
  { id: 'q8_problemsSolvable', factor: 'TPI', text: 'Mogu li se stari problemi sada riješiti?', type: 'radio', options: ['Da', 'Možda', 'Ne'] },
  
  { id: 'q9_trustEase', factor: 'TPI', text: 'Koliko bi ti bilo lako ponovo vjerovati svom bivšem?', type: 'radio', options: ['Mogla bih vjerovati', 'Teško', 'Nisam sigurna'] },
  
  { id: 'q10_abuse', factor: 'TPI', text: 'Da li je bilo ikakvog oblika zlostavljanja u prošlosti?', type: 'radio', options: ['Ne', 'Izolovan slučaj', 'Da'] },
  
  { id: 'q11_argumentFreq', factor: 'CD', text: 'Koliko često ste se svađali?', type: 'radio', options: ['Rijetko', 'Povremeno', 'Često', 'Stalno'] },
  
  { id: 'q12_toxicity', factor: 'CD', text: 'Toksična ponašanja ili crvene zastavice?', type: 'radio', options: ['Ne', 'Nekoliko', 'Da'] },
  
  { id: 'q13_sharedValues', factor: 'CD', text: 'Zajedničke vrijednosti i dugoročni ciljevi?', type: 'radio', options: ['Da', 'Djelimično', 'Ne'] },
  
  { id: 'q14_bestVersion', factor: 'CD', text: 'Da li je odnos iz tebe izvlačio tvoju najbolju verziju?', type: 'radio', options: ['Da', 'Neutralno', 'Ne'] },
  
  { id: 'q15_initiator', factor: 'CD', text: 'Ko je okončao vezu?', type: 'radio', options: ['Ja', 'Zajednički', 'Moj bivši'] },
  
  { id: 'q16_selfFocus', factor: 'PG', text: 'Na šta si se fokusirala nakon prekida?', type: 'radio', options: ['Lični rast', 'Distrakcija', 'Bez promjene'] },
  
  { id: 'q17_exGrowth', factor: 'PG', text: 'Da li je tvoj bivši pokazao lični napredak?', type: 'radio', options: ['Da', 'Možda', 'Ne'] },
  
  { id: 'q18_betterPartner', factor: 'PG', text: 'Da li bi danas bila bolja partnerica?', type: 'radio', options: ['Da', 'Možda', 'Ne'] },
  
  { id: 'q19_bothGrown', factor: 'PG', text: 'Da li ste oboje emocionalno napredovali?', type: 'radio', options: ['Da', 'Djelimično', 'Ne baš'] },
  
  { id: 'q20_confidenceNoRepeat', factor: 'PG', text: 'Koliko si sigurna da se isti problemi ne bi ponovili?', type: 'radio', options: ['Da', 'Nisam sigurna', 'Ne'] },
  
  { id: 'q21_lastContact', factor: 'EF', text: 'Koliko je prošlo od zadnjeg kontakta s bivšim?', type: 'radio', options: ['< 1 sedmica', '1-4 sedmice', '1-3 mjeseca', '> 3 mjeseca'] },
  
  { id: 'q22_socialOpinion', factor: 'EF', text: 'Stav prijatelja i porodice o pomirenju?', type: 'radio', options: ['Podržavaju', 'Mješovito', 'Protive se'] },
  
  { id: 'q23_pressure', factor: 'EF', text: 'Da li osjećaš pritisak da se pomiriš?', type: 'radio', options: ['Ne', 'Malo', 'Da'] },
  
  { id: 'q24_externalTies', factor: 'EF', text: 'Postoje li spoljne okolnosti koje vas i dalje povezuju?', type: 'radio', options: ['Da', 'Nekoliko', 'Ne'] },
  
  { id: 'q25_willingEffort', factor: 'EF', text: 'Da li si spremna uložiti trud da ponovo izgradite odnos?', type: 'radio', options: ['Da', 'Pokušat ću', 'Nisam sigurna'] },
];
