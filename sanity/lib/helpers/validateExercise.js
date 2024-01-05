export const validateExercise = async (value, { getClient, document }) => {
  const client = getClient({ apiVersion: '2023-12-12' });

  const { targets, equipment, useBuilderAssistance } = document;

  if (useBuilderAssistance && (!targets || !equipment)) {
    return 'You must select at least one target muscle group and one piece of equipment to use the Workout Builder Assistance';
  }

  const exercise = await client.fetch(
    `*[_type == "exercise" && _id == $id][0]{
      "isMatch": target._ref in $targets[]._ref && equipment._ref in $equipment[]._ref,
    }`,
    {
      id: value._ref,
      targets,
      equipment,
    }
  );

  console.log(exercise);

  return true;
};
