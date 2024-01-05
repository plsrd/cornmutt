import { defineArrayMember, defineField, defineType } from 'sanity';
import { setAuthorInitialValue } from '../../lib/utils/setAuthorInitialValue';
import { filterExistingReferences } from '@/sanity/lib/filters/filterExistingReferences';

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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      initialValue: setAuthorInitialValue,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'High level description of what to expect from this program.',
      type: 'blockContent',
    }),
    defineField({
      name: 'useBuilderAssistance',
      title: 'Use Program Builder Assistance?',
      description:
        'Add additional fields and validation to help build out your program.',
      type: 'boolean',
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
          name: 'goals',
          title: 'Goals',
          type: 'goals',
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
      of: [
        {
          type: 'reference',
          to: [{ type: 'equipment' }],
          options: { filter: filterExistingReferences },
        },
      ],
    }),
    defineField({
      name: 'weeks',
      title: 'Weekly Programming',
      type: 'array',
      of: [defineArrayMember({ type: 'week' })],
    }),
  ],
});
