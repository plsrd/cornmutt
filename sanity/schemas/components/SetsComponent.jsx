import React from 'react';
import { Stack, TextInput, Text } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { set, useFormValue } from 'sanity';

export const SetsComponent = props => {
  const { path, elementProps, onChange, value, renderDefault } = props;
  const [prevSets, setPrevSets] = useState();
  const [isSupersetMember, setisSupersetMember] = useState(false);
  const parent = useFormValue(path.slice(0, 1));

  useEffect(() => {
    if (parent) {
      const prevIndex =
        parent.findIndex(({ _key }) => _key === path[1]._key) - 1;

      const prev = parent?.[prevIndex];
      const superset = prev?.superset || false;

      if (superset) {
        setisSupersetMember(superset);
        setPrevSets(prev?.info?.sets);
      }
    }
  }, [parent, path]);

  useEffect(() => {
    if (isSupersetMember && prevSets !== value) {
      onChange(set(prevSets));
    }
  });

  const fwdProps = {
    ...props,
    elementProps: {
      ...elementProps,
      readOnly: isSupersetMember,
    },
  };

  return (
    <Stack space={2}>
      {renderDefault(fwdProps)}
      {prevSets && (
        <Text size={0}>
          This exercise is part of a superset. Sets are controlled by the first
          exercise in the superset.
        </Text>
      )}
    </Stack>
  );
};
