import { Workout } from '@/types/schema';

export const filterExercises = ({ document }: { document: Workout }) => {
  const targets = document?.target?.map(target => target._ref);

  const equipment = document?.equipment?.map(equipment => equipment._ref);

  const filter = `${targets ? 'target._ref in $targets' : ''}${
    targets && equipment ? ' && ' : ''
  }${equipment ? 'equipment._ref in $equipment' : ''}`;

  return {
    filter,
    params: {
      ...(targets && { targets }),
      ...(equipment && { equipment }),
    },
  };
};
