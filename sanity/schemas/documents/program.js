import { defineField, defineType } from 'sanity';

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
      name: 'description',
      title: 'Description',
      type: 'content',
    }),
    defineField({
      name: 'length',
      title: 'Program Length in Weeks',
      type: 'number',
    }),
    defineField({
      name: 'days',
      title: 'Workout Days Per Week',
      type: 'number',
    }),
    // defineField({
    //   name: 'plan',
    //   title: 'Plan',
    //   type: 'array',
    //   of: [{ type: 'week' }],
    // }),
  ],
});
