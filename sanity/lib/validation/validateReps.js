export const validateReps = (reps, { document }) => {
  if (!reps || reps < 1) return 'You must enter a number of reps';

  const useBuilderAssistance = document?.useBuilderAssistance;
  const goals = document?.goals;

  if (useBuilderAssistance) {
    if (!goals || goals.length < 1)
      return 'Select a goal(s) before setting your exercise reps or turn off Builder Assistance.';
    if (goals.includes('strength')) {
      return reps >= 1 && reps <= 5
        ? true
        : 'Aim for 1-5 reps for strength focused workouts';
    } else if (goals.includes('hypertrophy')) {
      return reps >= 8 && reps <= 15
        ? true
        : 'Aim for 8-15 reps for hypertrophy focused workouts';
    }
  }
  return true;
};
