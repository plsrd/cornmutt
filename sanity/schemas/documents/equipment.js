import { defineType, defineField } from 'sanity';

export const equipment = defineType({
  name: 'equipment',
  title: 'Equipment',
  type: 'document',
  liveEdit: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
});
