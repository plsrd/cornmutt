import { defineArrayMember, defineType, defineField } from 'sanity';
import { DayWrapper, WorkoutTitleComponent } from './components/DayWrapper';

export const day = defineType({
  name: 'day',
  title: 'Day',
  type: 'object',
  components: {
    input: DayWrapper,
  },
  fieldsets: [
    {
      name: 'notes',
      title: 'Notes',
      description: "Optional notes about the day's programming.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      name: 'workouts',
      title: 'Workouts',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'workout',
          title: 'Workout',
          type: 'reference',
          to: [{ type: 'workout' }],
          options: {
            filter: ({ document }) => {
              const { useBuilderAssistance } = document;
              if (useBuilderAssistance) {
                const { meta, equipment } = document;

                const goal = meta?.goal;

                const filter = `${goal ? 'goal == $goal' : ''}${
                  goal && equipment
                    ? ' && length(equipment) == length($equipment) && '
                    : ''
                }${
                  equipment
                    ? `count(
                  (equipment[]._ref)[@ in $equipment]) == length($equipment)`
                    : ''
                }`;

                const params = {
                  ...(goal && { goal }),
                  ...(equipment && {
                    equipment: equipment.map(({ _ref }) => _ref),
                  }),
                };

                return {
                  filter,
                  params,
                };
              }

              return {};
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
      fieldset: 'notes',
    }),
  ],
});
