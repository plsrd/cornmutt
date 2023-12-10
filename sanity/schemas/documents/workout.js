// import workoutTimeCalculator from '../components/workoutTimeCalculator';
import {filterExistingReferences} from '../helpers/filterExistingReferences'
import {defineType, defineField} from 'sanity'

export const workout = defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'useBuilderAssistance',
      title: 'Use Workout Builder Assistance?',
      description:
        'If you are unsure of how to build a workout that fits your intended focus, toggle this to enable validation on your fields.',
      type: 'boolean',
    }),
    defineField({
      title: 'Focus',
      name: 'focus',
      description: 'Select the training focus for this workout.',
      type: 'array',
      validation: (Rule) =>
        Rule.custom((value, {document}) =>
          document?.useBuilderAssistance &&
          value?.includes('hypertrophy') &&
          value?.includes('strength')
            ? 'Bruh you cannot focus on strength and hypertrophy at the same time. Pick one.'
            : true,
        ),
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Hypertrophy', value: 'hypertrophy'},
          {title: 'Strength', value: 'strength'},
          {title: 'Conditioning', value: 'conditioning'},
          {title: 'Mobility', value: 'mobility'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'target',
      title: 'Target Muscle Group(s)',
      description:
        'Select the target muscle group(s) for this workout. If no muscle groups are selected, all exercises will be available.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'target'}],
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
          to: [{type: 'equipment'}],
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
      of: [{type: 'exerciseWithReps'}],
    }),
  ],
})
