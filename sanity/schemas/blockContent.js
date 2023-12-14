import { defineArrayMember, defineField } from 'sanity';

export const blockContent = defineField({
  name: 'blockContent',
  type: 'array',
  title: 'Block Content',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
});
