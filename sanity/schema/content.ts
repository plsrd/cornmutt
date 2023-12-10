import { defineArrayMember, defineField } from 'sanity';

export const content = defineField({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
});
