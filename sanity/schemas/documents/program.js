import { defineArrayMember, defineField, defineType } from 'sanity';

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Name',
      type: 'string',
    }),
    defineField({
      name: 'useBuilderAssistance',
      title: 'Use Program Builder Assistance?',
      description:
        'Add additional fields and validation to help build out your program.',
      type: 'boolean',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'High level description of what to expect from this program.',
      type: 'content',
    }),
    defineField({
      name: 'meta',
      title: 'Program Meta Information',
      description: 'Optional fields for helping build out the program.',
      type: 'object',
      options: {
        collapsible: true,
        columns: 3,
      },
      hidden: ({ document }) => !document?.useBuilderAssistance,
      fields: [
        defineField({
          name: 'goal',
          title: 'Goal',
          type: 'goal',
        }),
        defineField({
          name: 'length',
          title: 'Length',
          description: 'Length of the program in weeks.',
          type: 'number',
        }),
        defineField({
          name: 'daysPerWeek',
          title: 'Days Per Week',
          description: 'Number of workout days per week.',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'equipment' }] }],
    }),
    defineField({
      name: 'weeks',
      title: 'Weekly Programming',
      type: 'array',
      of: [defineArrayMember({ type: 'week' })],
    }),
  ],
});
