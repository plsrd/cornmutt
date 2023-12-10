import { defineField, defineType } from 'sanity';

export const exercise = defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'target',
      title: 'Main Target Muscle',
      description: 'Select the muscle this exercise targets',
      type: 'reference',
      to: { type: 'target' },
    }),
    defineField({
      name: 'equipment',
      title: 'Main Equipment',
      description:
        'Select the main piece of equipment needed for this exercise',
      type: 'reference',
      to: [{ type: 'equipment' }],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      description: 'Enter the instructions for this exercise',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      description: 'Enter the URL for a video of this exercise',
      type: 'url',
    }),
    defineField({
      name: 'demoImage',
      title: 'Demo Image',
      description: 'Upload images for this exercise',
      type: 'image',
    }),
  ],
});
