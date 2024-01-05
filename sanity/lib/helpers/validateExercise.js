import { groq } from 'next-sanity';

export const validateExercise = async (value, { getClient, document }) => {
  const client = getClient({ apiVersion: '2023-12-12' });

  const { targets = [], equipment = [], useBuilderAssistance } = document;

  if (useBuilderAssistance && (!targets.length > 0 || !equipment.length > 0)) {
    return 'You must select at least one target muscle group and one piece of equipment to use the Workout Builder Assistance';
  }
  if (useBuilderAssistance) {
    const isMatch = await client.fetch(
      groq`*[_type == "exercise" && _id == $id][0]{
        "isMatch": target._ref in $targets[]._ref && equipment._ref in $equipment[]._ref,
      }`,
      {
        id: value._ref,
        targets,
        equipment,
      }
    ).isMatch;

    return isMatch
      ? true
      : 'This exercise does not match your target muscle groups and/or equipment';
  }

  return true;
};
