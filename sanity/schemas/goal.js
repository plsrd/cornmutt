import { defineType } from 'sanity';

export const goal = defineType({
  title: 'Goal',
  name: 'goal',
  type: 'array',
  of: [{ type: 'string' }],
  validation: Rule =>
    Rule.custom((value, { document }) => {
      const { useBuilderAssistance } = document;
      if (useBuilderAssistance) {
        if (value.includes('hypertrophy') && value.includes('strength'))
          return 'A program cannot be both hypertrophy and strength focused.';
      }

      return true;
    }),
  options: {
    list: [
      { title: 'Hypertrophy', value: 'hypertrophy' },
      { title: 'Strength', value: 'strength' },
      { title: 'Conditioning', value: 'conditioning' },
      { title: 'Mobility', value: 'mobility' },
    ],
  },
});
