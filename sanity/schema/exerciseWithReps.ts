import { ValidationContext, defineField } from 'sanity';
import { filterExercises } from './helpers/filterExercises';
import { validateSets } from './helpers/validateSets';

export const exerciseWithReps = defineField({
  name: 'exerciseWithReps',
  title: 'Workout Exercise',
  type: 'object',
  fields: [
    {
      name: 'exercise',
      title: 'Exercise',
      description: `Not seeing the exercises you'd like? Try adjusting your target muscle groups and equipment.`,
      type: 'reference',
      to: { type: 'exercise' },
      validation: Rule => Rule.required().error('You must select an exercise'),
      options: {
        filter: filterExercises,
      },
    },
    {
      name: 'info',
      title: 'Sets/Reps',
      type: 'object',
      options: {
        columns: 3,
      },
      fields: [
        {
          name: 'sets',
          title: 'Sets',
          type: 'number',
          validation: Rule => Rule.custom(validateSets),
        },
        {
          name: 'reps',
          title: 'Reps',
          type: 'number',
          validation: Rule =>
            Rule.min(1)
              .error('You must do at least 1 set of an exercise')
              .max(25)
              .warning(
                'That is a lot of reps! Are you sure you want to do that many?'
              ),
        },
        {
          name: 'restTime',
          title: 'Rest',
          type: 'number',
          validation: Rule =>
            Rule.custom((value: number) => {
              return value >= 30
                ? true
                : 'Each exercise should have a rest of at least 30 seconds';
            }),
        },
      ],
    },
    {
      name: 'superSet',
      title: 'Super Set',
      description: 'Superset with next exercise?',
      type: 'boolean',
    },
    {
      name: 'notes',
      title: 'Notes',
      description: '(Optional)',
      type: 'text',
    },
  ],
});
