import { defineField, defineType } from 'sanity'

export const target = defineType({
  name: 'target',
  title: 'Target',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
});
