import { defineField } from 'sanity';
import { AccessDeniedIcon } from '@sanity/icons';
import { filterExercises } from '../lib/filters/filterExercises';
import { validateSets } from '../lib/validation/validateSets';
import { SetsComponent } from './components/SetsComponent';
import { RestComponent } from './components/RestComponent';
import { ExercisePreviewComponent } from './components/ExercisePreviewComponent';
import { validateRest } from '../lib/validation/validateRest';
import { validateExercise } from '../lib/validation/validateExercise';
import { validateReps } from '../lib/validation/validateReps';

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
      validation: Rule => [
        Rule.required().error('You must select an exercise'),
        Rule.custom(validateExercise),
      ],
      options: {
        filter: filterExercises,
      },
    },
    {
      name: 'superset',
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
          validation: Rule => Rule.custom(validateSets),
          components: {
            input: SetsComponent,
          },
        },
        {
          name: 'reps',
          title: 'Reps',
          description: 'Reps per set',
          type: 'number',
          validation: Rule => Rule.custom(validateReps),
        },
        {
          name: 'restTime',
          title: 'Rest',
          description: 'Rest time in seconds',
          type: 'number',
          validation: Rule => Rule.custom(validateRest),
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
      info: 'info',
      superset: 'superset',
      demo: 'exercise.demoImage',
      _key: '_key',
    },
    prepare({ info = {}, exercise, demo, ...restProps }) {
      const { sets, reps } = info;

      const subtitle =
        sets && reps
          ? `${sets} sets of ${reps} reps`
          : 'Exercise configuration not complete';

      return {
        title: exercise ? exercise : 'Exercise not selected',
        subtitle,
        media: exercise ? demo : AccessDeniedIcon,
        ...restProps,
      };
    },
  },
  components: {
    preview: ExercisePreviewComponent,
  },
});
