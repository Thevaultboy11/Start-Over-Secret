export interface ActivityOption {
  key: string;
  label: string;
}

export interface AddRecordingsContent {
  activities: ActivityOption[];
}

export const addRecordingsContentEN: AddRecordingsContent = {
  activities: [
    { key: 'exercise', label: 'Exercise' },
    { key: 'therapy', label: 'Therapy' },
    { key: 'socialTime', label: 'Social Time' },
    { key: 'hydration', label: 'Hydration' },
    { key: 'breathing', label: 'Breathing' },
    { key: 'dryBrushing', label: 'Dry Brushing' },
    { key: 'huggedSomeone', label: 'Hugged Someone' },
    { key: 'tookBath', label: 'Took a Bath' },
    { key: 'healthyMeal', label: 'Healthy Meal' },
    { key: 'nap', label: 'Nap' },
    { key: 'spiritualPractice', label: 'Spiritual Practice' },
    { key: 'creativeHobby', label: 'Creative Hobby' },
    { key: 'meditated', label: 'Meditated' },
  ],
};

export const addRecordingsContentBS: AddRecordingsContent = {
  activities: [
    { key: 'exercise', label: 'Vježbanje' },
    { key: 'therapy', label: 'Terapija' },
    { key: 'socialTime', label: 'Druženje' },
    { key: 'hydration', label: 'Hidratacija' },
    { key: 'breathing', label: 'Disanje' },
    { key: 'dryBrushing', label: 'Suho četkanje' },
    { key: 'huggedSomeone', label: 'Zagrlila sam nekoga' },
    { key: 'tookBath', label: 'Kupka' },
    { key: 'healthyMeal', label: 'Zdrav obrok' },
    { key: 'nap', label: 'Kratki odmor' },
    { key: 'spiritualPractice', label: 'Duhovna praksa' },
    { key: 'creativeHobby', label: 'Kreativni hobi' },
    { key: 'meditated', label: 'Meditirala' },
  ],
};
