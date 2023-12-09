import { SanityDocument, Workout } from '@/types/schema';
import { ValidationContext } from 'sanity';

export const validateSets = (sets: number, context: ValidationContext) => {
  const document = context.document as Workout & SanityDocument;
  if (document?.useBuilderAssistance) {
    if (document?.focus?.includes('strength')) {
      return sets > 0 && sets <= 6
        ? true
        : 'Aim for 1-6 sets for strength focused workouts';
    } else if (document?.focus?.includes('hypertrophy')) {
      return sets >= 2 && sets <= 4
        ? true
        : 'Aim for 2-4 sets for hypertrophy focused workouts';
    }

    return true;
  }

  return true;
};
