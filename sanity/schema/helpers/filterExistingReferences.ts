export type ParentProps = {
  _key: string;
  _type: string;
  _ref?: string;
};

export const filterExistingReferences = ({
  parent,
}: {
  parent: ParentProps[];
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
};
