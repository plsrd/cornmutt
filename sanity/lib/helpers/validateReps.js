export const validateReps = (reps, { document }) => {
  if (!reps || reps < 1) return 'You must enter a number of reps';
  const useBuilderAssistance = document?.useBuilderAssistance;
  if (!useBuilderAssistance) return true;

  const goal = document?.goal;
  if (!goal) return true;

  if (goal.includes('strength')) {
    return reps >= 1 && reps <= 5
      ? true
      : 'Aim for 1-5 reps for strength focused workouts';
  } else if (goal.includes('hypertrophy')) {
    return reps >= 8 && reps <= 15
      ? true
      : 'Aim for 8-15 reps for hypertrophy focused workouts';
  }
};
