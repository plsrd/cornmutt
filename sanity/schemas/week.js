import { defineType, defineField } from 'sanity';

export const week = defineType({
  name: 'week',
  title: 'Week',
  type: 'object',
  fieldsets: [
    {
      name: 'notes',
      title: 'Notes',
      description: "Optional notes about the week's programming.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      name: 'days',
      title: 'Days',
      description: "Add days to build out a week's worth of programming.",
      type: 'array',
      of: [
        {
          name: 'day',
          title: 'Day',
          type: 'day',
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'content',
      fieldset: 'notes',
    }),
  ],
});
