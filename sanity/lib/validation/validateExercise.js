import { groq } from 'next-sanity';

export const validateExercise = async (exercise, { getClient, document }) => {
  const client = getClient({ apiVersion: '2023-12-12' });

  const { targets, equipment, useBuilderAssistance } = document;

  if (!useBuilderAssistance) return true;

  if (!targets || targets.length < 1)
    return 'Select target muscle group(s) before adding exercises or turn off Builder Assistance.';

  if (!equipment || equipment.length < 1)
    return 'Select equipment before adding exercises or turn off Builder Assistance.';

  const { isTargetMatch, isEquipmentMatch } = await client.fetch(
    groq`*[_type == "exercise" && _id == $id][0]{
        "isTargetMatch": target._ref in $targets[]._ref,
        "isEquipmentMatch": equipment._ref in $equipment[]._ref,
      }`,
    {
      id: exercise._ref,
      targets,
      equipment,
    }
  );

  const targetErrorMessage = 'Exercise does not match target muscle group(s).';
  const equipmentErrorMessage = 'Exercise does not match equipment.';

  return isTargetMatch && isEquipmentMatch
    ? true
    : `${!isTargetMatch ? targetErrorMessage : ''} ${
        !isEquipmentMatch ? equipmentErrorMessage : ''
      }`;
};
