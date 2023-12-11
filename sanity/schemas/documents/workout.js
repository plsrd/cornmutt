// import workoutTimeCalculator from '../components/workoutTimeCalculator';
import { filterExistingReferences } from '../../lib/helpers/filterExistingReferences';
import { defineType, defineField } from 'sanity';
import { setAuthorInitialValue } from '../../lib/helpers/setAuthorInitialValue';

export const workout = defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      initialValue: setAuthorInitialValue,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'useBuilderAssistance',
      title: 'Use Workout Builder Assistance?',
      description:
        'If you are unsure of how to build a workout that fits your intended focus, toggle this to enable validation on your fields.',
      type: 'boolean',
    }),
    defineField({
      name: 'goal',
      title: 'Goal',
      type: 'goal',
    }),
    defineField({
      name: 'targets',
      title: 'Target Muscle Group(s)',
      description:
        'Select the target muscle group(s) for this workout. If no muscle groups are selected, all exercises will be available.',
      type: 'array',
      hidden: ({ document }) => document?.focus == 'conditioning',
      of: [
        {
          type: 'reference',
          to: [{ type: 'target' }],
          options: {
            filter: filterExistingReferences,
          },
        },
      ],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment',
      description:
        'Select equipment to limit the exercises in this workout. If no equipment is selected, all exercises will be available.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'equipment' }],
          options: {
            filter: filterExistingReferences,
          },
        },
      ],
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [{ type: 'exerciseWithReps' }],
    }),
  ],
});
