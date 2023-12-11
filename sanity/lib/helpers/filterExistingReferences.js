export const filterExistingReferences = ({
  parent,
}) => {
  const existingEntries = parent
    .map(existingEntry => existingEntry._ref)
    .filter(Boolean);
  return {
    filter: '!(_id in $existingEntries) && !(_id in path("drafts.**"))',
    params: {
      existingEntries,
    },
  };
}