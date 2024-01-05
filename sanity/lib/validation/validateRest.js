export const validateRest = (value, { path, document }) => {
  const [exercises, info] = path || [];
  const goals = document?.goals;
  const superset = document?.[exercises]?.find(
    exercise => exercise?._key == info._key
  ).superset;

  if (superset || !goals) return true;

  if (goals.includes('strength')) {
    return value >= 120 && value <= 300
      ? true
      : 'Each exercise should have a rest period between 2 and 5 minutes when training for strength';
  } else if (goals.includes('hypertrophy')) {
    return value >= 30 && value <= 90
      ? true
      : 'Each exercise should have a rest period between 30 and 90 seconds when training for hypertrophy';
  }

  return true;
};
