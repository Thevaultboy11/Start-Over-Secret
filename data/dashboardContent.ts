import { addRecordingsContentBS, addRecordingsContentEN } from './addRecordingsContent';

export const dashboardActivityLabelsEN = Object.fromEntries(
  addRecordingsContentEN.activities.map((item) => [item.key, item.label])
);

export const dashboardActivityLabelsBS = Object.fromEntries(
  addRecordingsContentBS.activities.map((item) => [item.key, item.label])
);
