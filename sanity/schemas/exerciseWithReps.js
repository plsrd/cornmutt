import { defineField } from 'sanity';
import { filterExercises } from '../lib/helpers/filterExercises';
import { validateSets } from '../lib/helpers/validateSets';
import { SetsComponent } from './components/SetsComponent';
import { RestComponent } from './components/RestComponent';
import { ExercisePreviewComponent } from './components/ExercisePreviewComponent';

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
      name: 'superSet',
      title: 'Superset with next exercise?',
      description: 'If yes, the next exercise will be performed immediately',
      type: 'boolean',
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
          description: 'Sets per exercise',
          type: 'number',
          validation: Rule => Rule.custom(validateSets).warning(),
          components: {
            input: SetsComponent,
          },
        },
        {
          name: 'reps',
          title: 'Reps',
          description: 'Reps per set',
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
          description: 'Rest time in seconds',
          type: 'number',
          validation: Rule =>
            Rule.custom((value, context) => {
              const { path, document } = context;
              const [exercises, info] = path || [];
              const superSet = document?.[exercises]?.find(
                exercise => exercise?._key == info._key
              ).superSet;

              if (superSet) return true;

              return value >= 30
                ? true
                : 'Each exercise should have a rest of at least 30 seconds';
            }),
          components: {
            input: RestComponent,
          },
        },
      ],
    },
    {
      name: 'notes',
      title: 'Notes',
      description: '(Optional)',
      type: 'text',
    },
  ],
  preview: {
    select: {
      exercise: 'exercise.name',
      sets: 'info.sets',
      reps: 'info.reps',
      rest: 'info.restTime',
      superSet: 'superSet',
      demo: 'exercise.demoImage',
    },
    prepare({ exercise, sets, reps, rest, superSet, demo }) {
      return {
        title: exercise,
        subtitle: `${sets} sets of ${reps} reps ${
          !superSet ? `with ${rest} seconds rest` : ''
        }`,
        media: demo,
      };
    },
  },
  components: {
    preview: ExercisePreviewComponent,
  },
});
