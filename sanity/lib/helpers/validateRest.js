export const validateRest = (value, context) => {
  const { path, document } = context;
  const [exercises, info] = path || [];
  const superset = document?.[exercises]?.find(
    exercise => exercise?._key == info._key
  ).superset;

  if (superset) return true;

  return value >= 30
    ? true
    : 'Each exercise should have a rest of at least 30 seconds';
};
