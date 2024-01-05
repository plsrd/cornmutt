export const validateSets = (sets, { document }) => {
  if (!sets || sets < 1) return 'You must do at least 1 set of an exercise';

  if (document?.useBuilderAssistance) {
    if (document?.goal?.includes('strength')) {
      return sets > 0 && sets <= 5
        ? true
        : 'Aim for 1-5 sets for strength focused workouts';
    } else if (document?.goal?.includes('hypertrophy')) {
      return sets >= 3 && sets <= 5
        ? true
        : 'Aim for 3-5 sets for hypertrophy focused workouts';
    }
  }

  return true;
};
