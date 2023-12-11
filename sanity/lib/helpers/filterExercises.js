export const filterExercises = ({ document }) => {
  const targets = document?.targets?.map(target => target._ref);

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
