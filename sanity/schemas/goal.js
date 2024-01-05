import { defineType } from 'sanity';

export const goal = defineType({
  title: 'Goal',
  name: 'goal',
  type: 'array',
  of: [{ type: 'string' }],
  validation: Rule =>
    Rule.custom((goal, { document }) => {
      const { useBuilderAssistance } = document;
      if (!goal || goal.length < 1) return 'You must select a goal.';

      if (useBuilderAssistance) {
        if (goal.includes('hypertrophy') && goal.includes('strength'))
          return 'A workout cannot be both hypertrophy and strength focused.';
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
